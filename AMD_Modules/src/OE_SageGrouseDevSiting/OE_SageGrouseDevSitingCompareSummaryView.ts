/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getGraphicsLayer  } from "geocortex/infrastructure/GraphicUtils";
import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";


var myWorkflowContext;
//var myApp;
//var myLibID;

export class SageGrouseDevSitingCompareSummaryView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    downloadShapefiles = function (event, element, context) {
        //combine graphics into one layer

        let projectFS = context.project_area_fs;

        let buffereredGL = getGraphicsLayer("IndirectArea", false, this.app);
        let projectGL = getGraphicsLayer("DirectArea", false, this.app);


        buffereredGL.graphics.forEach((graphic) => {
            graphic.setAttributes({
                "areaType": "indirect buffered area", "buffered": context.myWorkflowContext.getValue('bufferDist') + " km"
            });
        });

        projectGL.graphics.forEach((graphic) => {
            graphic.setAttributes({ "areaType": "direct project area", "buffered": "0" })
            buffereredGL.add(graphic);
        });

        let exportArgs: ExportGraphicsLayerArgs = {
            format: "shp",
            graphicLayer: buffereredGL
        };
        this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
    };

    getPDF = function (event, element, context) {
        let reportUrl = context.report_url;
        window.open(reportUrl, "_blank");
    };

    zoomTo = function (event, element, context) {
        let featureExtent: any = context.myWorkflowContext.getValue('uda_extent');
        context.myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
    };

    clearTitle = function (event, element, context) {
        element.value = "";
    };

    cancelForm = function (event, element, context) {
        //context.myWorkflowContext.setValue("cancelBtn", 'Close');
        //context.myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingView");
        return true;
    };

    print(event, element, context) {
        var divToPrint = document.getElementById('printarea');
        var htmlToPrint = '' +
            '<style type="text/css">' +
            'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.siting_compare_col { width: 46%; position: relative; float: left; padding: 0 25px; border - right:2px solid #808080;} .siting_compare_col: last-child{border - right:none;} fieldset{border: solid 1px #a7a7a7; border-radius:4px; margin: 5px 0;} legend{ font-size:1.2em; padding: 10px;} </style>';
        htmlToPrint += divToPrint.outerHTML;
        let newWin = window.open("");
        newWin.document.write(htmlToPrint);
        //newWin.print();
        //newWin.close();
    }

}