/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getGraphicsLayer  } from "geocortex/infrastructure/GraphicUtils";
import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";
import { OE_SageGrouseDevSitingViewModel } from './OE_SageGrouseDevSitingViewModel';


export class OE_SageGrouseDevSitingDashboardView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevSitingViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    viewReport = function (event, element, context) {
        this.viewModel.setReportValues(context, this.viewModel);
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingSummaryView");
    };

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

    zoomTo = function (event, element, context) {
        console.log('zoom to this mofo', context);
        //get project layers and hide/show
        let gls = this.viewModel.getGraphicsLayers(context.name);

        gls.forEach((gl) => {
            if (gl.visible) {
                gl.hide();
            } else {
                gl.show();
                this.app.commandRegistry.commands.ZoomToExtent.execute(context.buffered_area_fs.features[0].geometry.getExtent());
            }
        });
        return true;
    };

    viewFullReport = function (event, element, context) {
        let reportUrl = context.report_url;
        window.open(reportUrl, "_blank");
    };

    compareProjectReports = function (event, element, context) {
        console.log('compare reports', event, element, context);
        //this.viewModel.compareReports(context, this.viewModel);
        context.selected_reports.value.reverse();
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingCompareSummaryView");
    };

    toggleExpand(event, element, context) {
        console.log('toggle expand!', event, element, context);
        context.expanded.set(!context.expanded.get());
    };

    toggleDownloadOpts(event, element, context) {
        context.view_download_opts.set(!context.view_download_opts.get());
    };

    deleteProjectReport = function (event, element, context) {
        this.viewModel.removeReport(context, this.viewModel);
        //this.viewModel.oeSageGrouseDevSitingReports = this.viewModel.oeSageGrouseDevSitingReports.filter((report: any) => report.name !== context.name);
    };

    clearTitle = function (event, element, context) {
        element.value = "";
    };

    addNewProject = function (event, element, context) {
        //this.viewModel.myWorkflowContext.setValue("dashboardContinue", true);
        //myWorkflowContext.setValue("dashboardContinue", true);
        //myWorkflowContext.completeActivity();
        try {
            context.wfContext.completeActivity();
        } catch (ex) {
            this.viewModel.wfContext.completeActivity();
            //context.myWorkflowContext.data.completeActivity();
        }
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingDashboardView");
        return true;
    };
    cancelForm = function (event, element, context) {
        //context.myWorkflowContext.setValue("cancelBtn", 'Close');
        //context.myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingDashboardView");
        return true;
    };

}