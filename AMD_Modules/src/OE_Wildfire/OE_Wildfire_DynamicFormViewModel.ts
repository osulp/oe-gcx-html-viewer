/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
//import { } from "geocortex/framework/ui/ViewBase"

//import { defaultMarkerSymbol } from "geocortex/infrastructure/SymbolUtils";

//export var reportImageFeatureCollectionJSON;
//export var reportImageExtent;
//export var pointLatLong;
//export var geometryElementsJsonString;
//export var riskPercentOut;

//popup toggle and default state
//export var fireRiskPopupEnabled = <boolean>true;

export class OE_Wildfire_DynamicFormViewModel extends ViewModelBase {

    app: ViewerApplication;

    //myWorkflowContext: any;

    //input
    mainContent: Observable<string> = new Observable<string>("");
    homeOwnerReportContent: Observable<string> = new Observable<string>("");
    aoiReportContent: Observable<string> = new Observable<string>("");
    aoiCountyName: Observable<string> = new Observable<string>("");
    aoiWatershedName: Observable<string> = new Observable<string>("");
    aoiBasinName: Observable<string> = new Observable<string>("");
    aoiSFPDName: Observable<string> = new Observable<string>("");

    aoiOFPD: Observable<string> = new Observable<string>("");
    aoiCityTown: Observable<string> = new Observable<string>("");
    aoiUGB: Observable<string> = new Observable<string>("");
    aoiCWPPA: Observable<string> = new Observable<string>("");
    aoiFirewiseCom: Observable<string> = new Observable<string>("");
    aoiSB360: Observable<string> = new Observable<string>("");
    aoiWUI: Observable<string> = new Observable<string>("");

    //sitePath: Observable<string> = new Observable<string>("");
    //viewerImagePath: Observable<string> = new Observable<string>("");

    //output
    customFormResult: Observable<string> = new Observable<string>("");

    //workflow ref
    myWorkflowContext: Observable<ActivityContext> = new Observable<ActivityContext>(null);

    myModel: Observable<OE_Wildfire_DynamicFormViewModel> = new Observable<OE_Wildfire_DynamicFormViewModel>(null);

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        var site: Site = (<any>this).app.site;

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

        /*this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
            //Check if activated view is the ResultsListView
            if (args.id === "ResultsListView") {
            }
        )};*/

        this.app.eventRegistry.event("ViewContainerViewClosedEvent").subscribe(this, (args) => {
            console.log('view container closing', args);
            if (args.viewId === "OE_Wildfire_DynamicFormView") {
                this.cleanOnClose();
            }
        });
                
        //dynamic external workflow form
        this.app.registerActivityIdHandler("displayWildfirePointResults", function CustomEventHandler(workflowContext, contextFunctions) {

            //let myWorkflowContext: any;
            //myWorkflowContext = $.extend({}, workflowContext);
            thisViewModel.myModel = thisViewModel;

            thisViewModel.myWorkflowContext = $.extend({}, workflowContext);

            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");            

            thisViewModel.mainContent.set(thisViewModel.myWorkflowContext.getValue("mainContent"));
            thisViewModel.homeOwnerReportContent.set(thisViewModel.myWorkflowContext.getValue("homeOwnerReportContent"));
            thisViewModel.aoiReportContent.set(thisViewModel.myWorkflowContext.getValue("aoiReportContent"));

            thisViewModel.aoiCountyName.set(thisViewModel.myWorkflowContext.getValue("aoiCountyName")+" Report");
            thisViewModel.aoiWatershedName.set(thisViewModel.myWorkflowContext.getValue("aoiWatershedName")+" Report");
            thisViewModel.aoiBasinName.set(thisViewModel.myWorkflowContext.getValue("aoiBasinName"));

            thisViewModel.aoiOFPD.set(thisViewModel.myWorkflowContext.getValue("aoiOFPD"));
            thisViewModel.aoiCityTown.set(thisViewModel.myWorkflowContext.getValue("aoiCityTown"));
            thisViewModel.aoiUGB.set(thisViewModel.myWorkflowContext.getValue("aoiUGB"));
            thisViewModel.aoiCWPPA.set(thisViewModel.myWorkflowContext.getValue("aoiCWPPA"));
            thisViewModel.aoiFirewiseCom.set(thisViewModel.myWorkflowContext.getValue("aoiFirewiseCom"));
            thisViewModel.aoiSB360.set(thisViewModel.myWorkflowContext.getValue("aoiSB360"));
            thisViewModel.aoiSFPDName.set(thisViewModel.myWorkflowContext.getValue("aoiSFPDName"));

            thisViewModel.aoiWUI.set(thisViewModel.myWorkflowContext.getValue("aoiWUI"));

            /*if (thisViewModel.myWorkflowContext.getValue("isSFPD")) {
                $(".wildfire_sfpd_content").css("display", "block");
            }
            else
            {
                $(".wildfire_sfpd_content").css("display", "none");
            }*/
        });
    }

    cleanOnClose() {
        this.app.commandRegistry.command("ClearMarkupQuiet").execute();
    }

    closeView() {
        this.app.commandRegistry.command("DeactivateView").execute("OE_Wildfire_DynamicFormView");
    }
}