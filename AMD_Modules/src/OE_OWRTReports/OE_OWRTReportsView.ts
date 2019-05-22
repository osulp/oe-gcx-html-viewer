/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_OWRTReportsViewModel } from "../OE_OWRTReports/OE_OWRTReportsViewModel"

export class OE_OWRTReportsView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_OWRTReportsView;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    
    toggleElement(event, element, context) {        
        context.visible.set(!context.visible.get());
        context.collapseImgVisisble.set(!context.collapseImgVisisble.get());
        context.expandImgVisisble.set(!context.expandImgVisisble.get());
    };

    toggleTabMain(event, element, context) {
        (<OE_OWRTReportsViewModel>context).ToggleTabMain();
    }

    toggleTabCharts(event, element, context) {
        (<OE_OWRTReportsViewModel>context).ToggleTabCharts();
    }
        
    /*toggleChartActivity(event, element, context) {
        (<OE_OWRTReportsViewModel>context).BuildChartActivity();
    }

    toggleChartPart(event, element, context) {        
        (<OE_OWRTReportsViewModel>context).BuildChartParticipant();
    }*/

    loadProjectNbr(event, element, context) {
        console.log("Change event");
        context._oeReportQueries(element.value);
    }
    
    printReport(event, element, context) {
        (<OE_OWRTReportsViewModel>context).PrintReport();
    }
    
}