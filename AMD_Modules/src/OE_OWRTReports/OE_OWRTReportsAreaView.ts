/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_OWRTReportsAreaViewModel } from "../OE_OWRTReports/OE_OWRTReportsAreaViewModel"

export class OE_OWRTReportsAreaView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_OWRTReportsAreaView;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    toggleElement(event, element, context) {        
        context.visible.set(!context.visible.get());
        context.collapseImgVisisble.set(!context.collapseImgVisisble.get());
        context.expandImgVisisble.set(!context.expandImgVisisble.get());
    };

    toggleReportOptionPanel(event, element, context) {        
        let val = context.reportOptionsPanelVisible.get();
        context.reportOptionsPanelVisible.set(!val);
        (<OE_OWRTReportsAreaViewModel>context).ToggleOptionsArrow(val);
    }

    geoTypeChanged(event, element, context) {        
        (<OE_OWRTReportsAreaViewModel>context).OptionsGeoTypeChanged(element.value, element.options[element.selectedIndex].text);
    }

    areaOptionChanged(event, element, context) {        
        (<OE_OWRTReportsAreaViewModel>context).OptionsAreaChanged(element.value, element.options[element.selectedIndex].text);
    }
    
    reportOptionsSubmission(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ReportOptionsSubmission();
    }
        
    toggleTabOverview(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).LoadOverviewTab();
    }

    toggleTabProjects(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).LoadProjectsTab();
    }

    toggleTabFunding(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).LoadFundingTab();
    }

    toggleTabResults(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).LoadResultsTab();
    }

    toggleProjectsChartYear(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("projects","year");
    }

    toggleProjectsChartActivity(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("projects", "activity");
    }

    toggleFundingChartTotal(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("funding", "total");
    }

    toggleFundingChartYear(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("funding", "year");
    }

    toggleFundingChartActivity(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("funding", "activity");
    }

    toggleFundingChartActivityYear(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("funding", "activityYear");
    }

    toggleFundingChartSource(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ShowChart("funding", "source");
    }

    toggleResultsChart(event, element, context) {
        var vm:any = this.viewModel;
        (<OE_OWRTReportsAreaViewModel>vm).ShowChart("results", context.chart, context.name);
    }

    toggleChartDataAsTable(event, element, context) {
        (<OE_OWRTReportsAreaViewModel>context).ToggleChartTableView();
    }
    
    loadAreaReport(event, element, context) {
        console.log("Load Area Report");
        //context._oeReportQueries(element.value);
    }
    
}