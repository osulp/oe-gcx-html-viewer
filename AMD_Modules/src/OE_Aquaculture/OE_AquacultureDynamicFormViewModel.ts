/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";

export class OE_AquacultureDynamicFormViewModel extends ViewModelBase {

    app: ViewerApplication;

    //myWorkflowContext: any;

    //input
    mainContent: Observable<string> = new Observable<string>("");
    fieldZoning: Observable<string> = new Observable<string>("");
    fieldLandOwnership: Observable<string> = new Observable<string>("");
    fieldCounty: Observable<string> = new Observable<string>("");
    fieldCityOrTown: Observable<string> = new Observable<string>("");

    fieldClosestWaterRightDistance: Observable<string> = new Observable<string>("");
    fieldClosestWaterRightType: Observable<string> = new Observable<string>("");
    fieldClosestWaterRightUseCodeDesc: Observable<string> = new Observable<string>("");
    fieldClosestWaterRightVolumeMaxRate: Observable<string> = new Observable<string>("");

    fieldDistanceToElectricalService: Observable<string> = new Observable<string>("");

    fieldFloodplain100: Observable<string> = new Observable<string>("");
    fieldFloodplain500: Observable<string> = new Observable<string>("");

    fieldSalmonidHabitat: Observable<string> = new Observable<string>("");
    fieldSalmonidHabitatMiles: Observable<string> = new Observable<string>("");
    fieldWaterQualityLimitedStream: Observable<string> = new Observable<string>("");
    fieldWaterQualityLimitedStreamMiles: Observable<string> = new Observable<string>("");
        
    //output
    customFormResult: Observable<string> = new Observable<string>("");

    //workflow ref
    myWorkflowContext: Observable<ActivityContext> = new Observable<ActivityContext>(null);

    myModel: Observable<OE_AquacultureDynamicFormViewModel> = new Observable<OE_AquacultureDynamicFormViewModel>(null);

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
            if (args.viewId === "OE_AquacultureDynamicFormView") {
                this.cleanOnClose();
            }
        });
                
        //dynamic external workflow form
        this.app.registerActivityIdHandler("displayAquacultureForm", function CustomEventHandler(workflowContext, contextFunctions) {

            thisViewModel.myModel = thisViewModel;

            thisViewModel.myWorkflowContext = $.extend({}, workflowContext);

            var wf: ActivityContext;
                                                
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_AquacultureDynamicFormView");            

            thisViewModel.mainContent.set(thisViewModel.myWorkflowContext.getValue("mainContent"));
            
            thisViewModel.fieldZoning.set(thisViewModel.myWorkflowContext.getValue("fieldZoning"));
            thisViewModel.fieldLandOwnership.set(thisViewModel.myWorkflowContext.getValue("fieldLandOwnership"));
            thisViewModel.fieldCounty.set(thisViewModel.myWorkflowContext.getValue("fieldCounty"));
            thisViewModel.fieldCityOrTown.set(thisViewModel.myWorkflowContext.getValue("fieldCityOrTown"));

            thisViewModel.fieldClosestWaterRightDistance.set(thisViewModel.myWorkflowContext.getValue("fieldClosestWaterRightDistance"));
            thisViewModel.fieldClosestWaterRightType.set(thisViewModel.myWorkflowContext.getValue("fieldClosestWaterRightType"));
            thisViewModel.fieldClosestWaterRightUseCodeDesc.set(thisViewModel.myWorkflowContext.getValue("fieldClosestWaterRightUseCodeDesc"));
            thisViewModel.fieldClosestWaterRightVolumeMaxRate.set(thisViewModel.myWorkflowContext.getValue("fieldClosestWaterRightVolumeMaxRate"));

            thisViewModel.fieldDistanceToElectricalService.set(thisViewModel.myWorkflowContext.getValue("fieldDistanceToElectricalService"));
            
            thisViewModel.fieldFloodplain100.set(thisViewModel.myWorkflowContext.getValue("fieldFloodplain100"));
            thisViewModel.fieldFloodplain500.set(thisViewModel.myWorkflowContext.getValue("fieldFloodplain500"));

            thisViewModel.fieldSalmonidHabitat.set(thisViewModel.myWorkflowContext.getValue("fieldSalmonidHabitat"));
            thisViewModel.fieldSalmonidHabitatMiles.set(thisViewModel.myWorkflowContext.getValue("fieldSalmonidHabitatMiles"));
            thisViewModel.fieldWaterQualityLimitedStream.set(thisViewModel.myWorkflowContext.getValue("fieldWaterQualityLimitedStream"));
            thisViewModel.fieldWaterQualityLimitedStreamMiles.set(thisViewModel.myWorkflowContext.getValue("fieldWaterQualityLimitedStreamMiles"));

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
        this.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureDynamicFormView");
    }
}