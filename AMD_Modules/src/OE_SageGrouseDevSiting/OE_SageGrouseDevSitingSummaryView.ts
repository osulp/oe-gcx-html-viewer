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

export class OE_SageGrouseDevSitingSummaryView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevSitingViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    downloadShapefiles = function (event, element, context) {
        this.viewModel.downloadShapefiles(event, element, context);       
    };

    downloadKML(event, element, context) {
        this.viewModel.downloadKml(event, element, context);
    };    

    getPDF = function (event, element, context) {
        let reportUrl = context.report_url;
        window.open(reportUrl, "_blank");
    };
    

    cancelForm = function (event, element, context) {
        //context.myWorkflowContext.setValue("cancelBtn", 'Close');
        //context.myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingSummaryView");
        return true;
    };

}


