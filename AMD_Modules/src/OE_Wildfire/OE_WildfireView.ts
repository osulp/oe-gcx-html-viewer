/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_WildfireView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    buildWildfireRiskWorkflowRequest = function (isQuickReport: boolean = false, contextIn) {

        let workflowArgs: any = {};
        workflowArgs.workflowId = "Summary_Standalone";
        workflowArgs.mapPointIn = contextIn.mapPointIn;
        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);        
    }

    openWildfireRiskQuickRepoort = function (event, element, context) {

        this.buildWildfireRiskWorkflowRequest(true, context);
    };

    openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {

        this.buildWildfireRiskWorkflowRequest(isQuickReport,context);
    };

}