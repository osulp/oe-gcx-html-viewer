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
    
    //input
    mainContent: Observable<string> = new Observable<string>("");
    fieldZoning: Observable<string> = new Observable<string>("");
    fieldLandOwnership: Observable<string> = new Observable<string>("");
    fieldCounty: Observable<string> = new Observable<string>("");
    fieldCityOrTown: Observable<string> = new Observable<string>("");

    fieldFloodplain100: Observable<string> = new Observable<string>("");

    reportLink: Observable<string> = new Observable<string>("");

    financialWorkflowID: Observable<string> = new Observable();
    mapPointIn: Observable<esri.geometry.Point> = new Observable();
        
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
                        
        //dynamic external workflow form
        this.app.registerActivityIdHandler("displayAquacultureForm", function CustomEventHandler(workflowContext) {        
                        
            thisViewModel.myModel = thisViewModel;

            thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
            

            var wf: ActivityContext;
                                                
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_AquacultureDynamicFormView");            

            thisViewModel.mainContent.set(thisViewModel.myWorkflowContext.getValue("mainContent"));
            
            thisViewModel.fieldZoning.set(thisViewModel.myWorkflowContext.getValue("fieldZoning"));
            thisViewModel.fieldLandOwnership.set(thisViewModel.myWorkflowContext.getValue("fieldLandOwnership"));
            thisViewModel.fieldCounty.set(thisViewModel.myWorkflowContext.getValue("fieldCounty"));
            thisViewModel.fieldCityOrTown.set(thisViewModel.myWorkflowContext.getValue("fieldCityOrTown"));
            
            thisViewModel.fieldFloodplain100.set(thisViewModel.myWorkflowContext.getValue("fieldFloodplain100"));

            thisViewModel.reportLink.set(thisViewModel.myWorkflowContext.getValue("reportLink"));

            thisViewModel.financialWorkflowID.set(thisViewModel.myWorkflowContext.getValue("financialWorkflowID"));
            thisViewModel.mapPointIn.set(thisViewModel.myWorkflowContext.getValue("mapPointIn"));            
        });
    }

    cleanOnClose() {
        //this.app.commandRegistry.command("ClearMarkupQuiet").execute();
    }

    closeView() {
        //this.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureDynamicFormView");
    }

    RunFinancialTool() {                        
        let workflowArgs: any = {};
        workflowArgs.workflowId = this.financialWorkflowID.get(); //cStep["runWorkflowById"];
        workflowArgs.inputPoint = this.mapPointIn.get();
        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
    }
}