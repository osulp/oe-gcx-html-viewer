/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { defaultMarkerSymbol } from "geocortex/infrastructure/SymbolUtils";

//popup toggle and default state
export var fireRiskPopupEnabled = <boolean>true;

export class OE_WildfireViewModel extends ViewModelBase {
       
    app: ViewerApplication;

    mapPointIn: Observable<esri.geometry.Point> = new Observable();

    //mapClickEnabled: boolean = true;
        
    myWorkflowContext: any;
                
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        var site: Site = (<any>this).app.site;

        fireRiskPopupEnabled = config.mapClickEnabled || false;

        var thisViewModel = this;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
        }
       
    }

    _onSiteInitialized(site: Site, thisViewModel) {

        ///////////////////////
        // Remove drawings from identify results
        ///////////////////////
        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
            //Check if activated view is the ResultsListView
            if (args.id === "ResultsListView") {
                //Check if already subscribed to avoid adding duplicate subscriptions
                let isSubscribed = false;
                for (var subscription in args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions) {
                    isSubscribed = args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions[subscription].scope.id
                        ? args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions[subscription].scope.id === "OE_Wildfire_DynamicFormViewModel"
                            ? true
                            : isSubscribed
                        : isSubscribed;
                }
                if (!isSubscribed) {
                    //Add new subscription to featureSetCollections featureSets.  They are observed by the app to generate the result list dynamically.
                    args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscribe(this, (args: any) => {
                        let idxToRemove = null;
                        //Iterate through the featuresets to check if they are drawings and if so grab the array index for deletion.
                        this.app.viewManager.getViewById("ResultsListView").viewModel.featureSetCollection.value.featureSets.value.forEach((fs: any, idx: number) => {
                            idxToRemove = fs.id === "Drawings" ? idx : idxToRemove;
                        });
                        if (idxToRemove !== null) {
                            this.app.viewManager.getViewById("ResultsListView").viewModel.featureSetCollection.value.featureSets.value.splice(idxToRemove);
                        }
                    });
                }
            }
        });

        var workingApp = <any>geocortex["framework"].applications[0];
        
        /*
            This module is added to the NavigationMapRegion region.
            Geocortex adds this module above the "I want to" button.
            Move this module to the bottom of the navigation map region

            map-navigation-region
            WildfireRiskPopupModuleView
        */
        $(".WildfireRiskPopupModuleView").appendTo(".map-navigation-region");

        //add a command button
        this.app.commandRegistry.command("EnableFireriskPopup").register(this, enableFireriskPopup);
        this.app.commandRegistry.command("DisableFireriskPopup").register(this, disableFireriskPopup);

        //run popup by coordinates
        this.app.commandRegistry.command("OpenFireriskPopup").register(this, openFireriskPopup);

        //grab the geocortex map event
        //if (this.mapClickEnabled)
        this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
                        
        function loadWorkflow(pointIn) {

            //if (!fireRiskPopupEnabled)
            //    return;

            //loading div
            /*var loadingDiv = $("#WildfireRisk_loading");
            loadingDiv.css("display", "block");

            //swap blocks
            $(".WildfireRiskPopupContent").css("display", "block");

            //link div
            var linkDiv = $(".WildfireRisk_link");
            linkDiv.css("display", "none");

            //content div
            var contentDiv = $("#WildfireRisk_content");
            contentDiv.css("display", "none");

            loadingDiv.text("Launching summary...");*/

            //load the html view
            //workingApp.commandRegistry.command("ActivateView").execute("OE_WildfireView");

            //workingPointGeometry = pointIn.mapPoint;

            var view: any = thisViewModel.app.viewManager.getViewById("OE_WildfireView");
            thisViewModel.mapPointIn = pointIn;
            view.buildWildfireRiskWorkflowRequest(false, thisViewModel);

            //remove view after delay                    
            //setTimeout(CloseView, 1800);
        }

        function enableFireriskPopup()
        {
            fireRiskPopupEnabled = true;
        }

        function disableFireriskPopup() {
            fireRiskPopupEnabled = false;
        }

        function openFireriskPopup(geometryIn, appIn) {
                        
            //if (!fireRiskPopupEnabled)
              //  return;

            var jsonIn = jQuery.parseJSON(geometryIn);
            var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));

            //processMapPoint(newPoint);

            loadWorkflow(newPoint);
        }

        function handleMouseClick(pointIn, appIn) {

            if (!fireRiskPopupEnabled)
                return;

            loadWorkflow(pointIn.mapPoint);            
        }

        function CloseView() {
            (<ViewerApplication>workingApp).commandRegistry.command("DeactivateView").execute("OE_WildfireView");
            
        }               
    }
}