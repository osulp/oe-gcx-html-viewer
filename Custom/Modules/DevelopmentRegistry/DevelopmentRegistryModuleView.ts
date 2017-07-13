/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;

module oe.dev_registry {

    export class DevelopmentRegistryModuleView extends geocortex.framework.ui.ViewBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        toggleLayer = function (event, element, context) {
            let workflowArgs: any = {};
            workflowArgs.workflowId = "toggleLayer";
            workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
            workflowArgs.LayerName = element.getAttribute("data-attr-layer");
            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
        };
        showInfo = function (event, element, context) {
            let workflowArgs: any = {};
            workflowArgs.workflowId = "constraintPopUps";
            workflowArgs.constraint = element.getAttribute("data-attr-constraint");
            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
        };

        zoomTo = function (event, element, context) {
            let featureExtent: any = myWorkflowContext.getValue('uda_extent');
            myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
        };

        clearTitle = function (event, element, context) {
            element.value = "";
        };

        runNewReport = function (event, element, context) {
            myWorkflowContext.setValue("finalFormBtn", 'New');
            myWorkflowContext.completeActivity();
            this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
            return true;
        };

        getPDF = function (event, element, context) {
            myWorkflowContext.setValue("finalFormBtn", 'PDF');
            myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
            let includedMap = document.getElementById("includeMap")["checked"];
            myWorkflowContext.setValue("includeMap", includedMap);
            myWorkflowContext.completeActivity();
            this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
            return true;
        };

        cancelForm = function (event, element, context) {
            myWorkflowContext.setValue("finalFormBtn", 'Close');
            myWorkflowContext.completeActivity();
            this.app.commandRegistry.command("DeactivateView").execute("DevelopmentRegistryModuleView");
            //$(".panel-header-button.right.close-16.bound-visible").show();
            return true;
        };
    }
}