/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_OITTViewModel } from "../OE_OITT/OE_OITTViewModel"

export class OE_OITTView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    toggleReportOptionPanel(event, element, context) {
        let val = context.reportOptionsPanelVisible.get();
        context.reportOptionsPanelVisible.set(!val);
        (<OE_OITTViewModel>context).ToggleOptionsArrow(val);
    }

    geoTypeChanged(event, element, context) {
        (<OE_OITTViewModel>context).OptionsGeoTypeChanged(element.value, element.selectedOptions[0].label);
    }

    areaOptionChanged(event, element, context) {
        (<OE_OITTViewModel>context).OptionsAreaChanged(element.value, element.selectedOptions[0].label);
    }
        
    toggleChartDataAsTable(event, element, context) {
        (<OE_OITTViewModel>context).ToggleChartTableView();
    }

    reportOptionsSubmission(event, element, context) {
        (<OE_OITTViewModel>context).ReportOptionsSubmission();
    }

    toggleTabOverview(event, element, context) {
        (<OE_OITTViewModel>context).LoadOverviewTab();
    }

    toggleTabProjects(event, element, context) {
        (<OE_OITTViewModel>context).LoadProjectsTab();
    }

    toggleTabFunding(event, element, context) {
        (<OE_OITTViewModel>context).LoadFundingTab();
    }

    toggleProjectsChartYear(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("projects", "year");
    }

    toggleProjectsChartActivity(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("projects", "type");
    }

    toggleFundingChartTotal(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("funding", "total");
    }

    toggleFundingChartYear(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("funding", "year");
    }

    toggleFundingChartType(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("funding", "type");
    }

    toggleFundingChartTypeYear(event, element, context) {
        (<OE_OITTViewModel>context).ShowChart("funding", "typeYear");
    }
}