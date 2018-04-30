/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_Wildfire_DynamicFormView extends ViewBase {

    app: ViewerApplication;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    /*getPDF = function (event, element, context) {
        let reportUrl = context.getValue('reportURL');
        window.open(reportUrl, "_blank");
    };

    zoomTo = function (event, element, context) {
        let featureExtent: any = context.getValue('uda_extent');
        this.app.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
    };

    clearTitle = function (event, element, context) {
        element.value = "";
    };*/

    /*runNewReport = function (event, element, context) {
        context.setValue("finalFormBtn", 'New');
        context.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
        return true;
    };*/
                
    countyReport = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'county');
        context.myWorkflowContext.completeActivity();
        //this.app.commandRegistry.command("DeactivateView").execute("OE_Wildfire_DynamicFormView");
        context.myModel.closeView();
        return true;
    };

    watershedReport = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'watershed');
        context.myWorkflowContext.completeActivity();
        context.myModel.closeView();
        return true;
    };

    basinReport = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'basin');
        context.myWorkflowContext.completeActivity();
        context.myModel.closeView();
        return true;
    };

    sfpdReport = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'sfpd');
        context.myWorkflowContext.completeActivity();
        context.myModel.closeView();
        return true;
    };

    homeReport = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'homeReport');
        context.myWorkflowContext.completeActivity();
        context.myModel.closeView();
        return true;
    };

    cancelForm = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'close');
        context.myWorkflowContext.completeActivity();
        context.myModel.closeView();
        return true;
    };
}