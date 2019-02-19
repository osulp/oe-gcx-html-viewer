/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getGraphicsLayer  } from "geocortex/infrastructure/GraphicUtils";
import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";
import { OE_SageGrouseDevSitingViewModel } from './OE_SageGrouseDevSitingViewModel';


var myWorkflowContext;
//var myApp;
//var myLibID;

export class SageGrouseDevSitingCompareSummaryView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevSitingViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    downloadShapefiles = function (event, element, context) {
        //got to view model function to process request. put code execution in one place since requested from multiple views.
        this.viewModel.downloadShapefiles(event, element, context);
    };

    downloadKml(event, element, context) {
        //got to view model function to process request. put code execution in one place since requested from multiple views.
        this.viewModel.downloadKml(event, element, context);
    };

    getPDF = function (event, element, context) {
        let reportUrl = context.report_url;
        window.open(reportUrl, "_blank");
    };

    toggleDownloadOpts(event, element, context) {
        context.view_download_opts.set(!context.view_download_opts.get());
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
            'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.siting_compare_col { width: 42%; position: relative; float: left; padding: 0 25px; border - right:2px solid #808080;} .siting_compare_col: last-child{border - right:none;} fieldset{border: solid 1px #a7a7a7; border-radius:4px; margin: 5px 0;} legend{ font-size:1.2em; padding: 10px;}.bound-invisible{display:none}.trigger-msg-wrapper { background-color: #eeece5;width: 95%;padding: 5px;border-radius: 4px;}.dev-rule {text-indent: each-line 10px;font-size: .9em;color: #282727;display: inline-block; font-style: italic; margin-left: 10px;}.hab - area{font-size: .9em;font-style: italic;}.hab-area.no-hab-area{color: #295810; font-weight: bold;}.hab-area.all-hab-area{color: #710f0f;font-weight: bold;}.sub-section-wrapper{margin-left: 15px;}.sub-section-header{font-weight: bolder;}.dev-type-details{margin-left: 120px;font-size: .9em;color: #302f2f;} .print-remove{display: none;} </style>';
        htmlToPrint += divToPrint.outerHTML;
        let newWin = window.open("");
        newWin.document.write(htmlToPrint);
        //newWin.print();
        //newWin.close();
    }

}