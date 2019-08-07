var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModuleView = (function (_super) {
            __extends(SageGrouseDevSitingModuleView, _super);
            function SageGrouseDevSitingModuleView(app, lib) {
                _super.call(this, app, lib);
                this.downloadShapefiles = function (event, element, context) {
                    //combine graphics into one layer
                    var buffereredGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("IndirectArea", false, this.app);
                    var projectGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("DirectArea", false, this.app);
                    buffereredGL.graphics.forEach(function (graphic) {
                        graphic.setAttributes({
                            "areaType": "indirect buffered area", "buffered": myWorkflowContext.getValue('bufferDist') + " km"
                        });
                    });
                    projectGL.graphics.forEach(function (graphic) {
                        graphic.setAttributes({ "areaType": "direct project area", "buffered": "0" });
                        buffereredGL.add(graphic);
                    });
                    var exportArgs = {
                        format: "shp",
                        graphicLayer: buffereredGL
                    };
                    this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
                };
                this.getPDF = function (event, element, context) {
                    var reportUrl = myWorkflowContext.getValue('reportURL');
                    window.open(reportUrl, "_blank");
                };
                this.zoomTo = function (event, element, context) {
                    var featureExtent = myWorkflowContext.getValue('uda_extent');
                    myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
                };
                this.clearTitle = function (event, element, context) {
                    element.value = "";
                };
                this.runNewReport = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'New');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("SageGrouseDevSitingModuleView");
                    return true;
                };
            }
            return SageGrouseDevSitingModuleView;
        }(geocortex.framework.ui.ViewBase));
        SageGrouseDevSiting.SageGrouseDevSitingModuleView = SageGrouseDevSitingModuleView;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
//# sourceMappingURL=SageGrouseDevSitingModuleView.js.map