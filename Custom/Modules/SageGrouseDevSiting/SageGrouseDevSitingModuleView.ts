/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;

module oe.SageGrouseDevSiting {

    export class SageGrouseDevSitingModuleView extends geocortex.framework.ui.ViewBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        downloadShapefiles = function (event, element, context) {
            //combine graphics into one layer

            let buffereredGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("IndirectArea", false, this.app);
            let projectGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("DirectArea", false, this.app);


            buffereredGL.graphics.forEach((graphic) => {
                graphic.setAttributes({
                    "areaType": "indirect buffered area", "buffered": myWorkflowContext.getValue('bufferDist') + " km"
                });
            });

            projectGL.graphics.forEach((graphic) => {
                graphic.setAttributes({ "areaType": "direct project area", "buffered": "0" })
                buffereredGL.add(graphic);
            });

            let exportArgs: geocortex.essentialsHtmlViewer.mapping.infrastructure.commandArgs.ExportGraphicsLayerArgs = {
                format: "shp",
                graphicLayer: buffereredGL
            };
            this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
        };

        getPDF = function (event, element, context) {
            let reportUrl = myWorkflowContext.getValue('reportURL');
            window.open(reportUrl, "_blank");
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

        cancelForm = function (event, element, context) {
            myWorkflowContext.setValue("finalFormBtn", 'Close');
            myWorkflowContext.completeActivity();
            this.app.commandRegistry.command("DeactivateView").execute("SageGrouseDevSitingModuleView");
            return true;
        };
    }
}