/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_AquacultureDynamicFormView extends ViewBase {

    app: ViewerApplication;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    runFinancialTool = function (event, element, context) {
        context.myModel.RunFinancialTool();
        return true;
    };
        
    cancelForm = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'close');
        context.myWorkflowContext.completeActivity();
        //context.myModel.closeView();
        return true;
    };

    backForm = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'back');
        context.myWorkflowContext.completeActivity();
        //context.myModel.closeView();
        return true;
    };

    listForm = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'list');
        context.myWorkflowContext.completeActivity();
        //context.myModel.closeView();
        return true;
    };

    reportForm = function (event, element, context) {
        context.myWorkflowContext.setValue("customFormResult", 'report');
        context.myWorkflowContext.completeActivity();        
        //context.myModel.closeView();
        return true;
    };
}