/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_WildfireView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    buildWildfireRiskWorkflowRequest = function (isQuickReport: boolean = false, contextIn) {

        let workflowArgs: any = {};
        workflowArgs.workflowId = "Wildfire_Risk_Report";
                        
        workflowArgs.risk_value = $("#WildfireRisk_value").text();
        workflowArgs.risk_percent = "0";//contextIn.riskPercentOut;
        workflowArgs.wfpd = $("#WildfireRisk_forest_protection_district").text();
        workflowArgs.wspd = $("#WildfireRisk_structural_projection_district").text();
        workflowArgs.wrpa = $("#WildfireRisk_rangeland_protection_assoc").text();
        workflowArgs.city = $("#WildfireRisk_city").text();
        workflowArgs.ugb = $("#WildfireRisk_urban_growth_boundary").text();
        workflowArgs.cwpp = $("#WildfireRisk_cwpp_area").text();
        workflowArgs.sb360 = $("#WildfireRisk_senatebill_360").text();

        workflowArgs.firewiseComm = $("#WildfireRisk_firewise_community").text();

        workflowArgs.flame_min = $("#WildfireRisk_flame_min").text();
        workflowArgs.flame_max = $("#WildfireRisk_flame_max").text();
        workflowArgs.flame_ave = $("#WildfireRisk_flame_ave").text();

        workflowArgs.useDevReport = false;
        if (window.location.href.indexOf("devReport") > -1) {
            workflowArgs.useDevReport = true;
        }

        workflowArgs.burnProbabilityRating = contextIn.burnPropName;
        workflowArgs.hazardToStructuresRating = contextIn.hazardStructureName;

        workflowArgs.geometryElementsJsonString = contextIn.geometryElementsJsonString;
        workflowArgs.reportImageFeatureCollectionJSON = contextIn.reportImageFeatureCollectionJSON;

        workflowArgs.reportImageExtent = contextIn.reportImageExtent;
        workflowArgs.pointLatLong = contextIn.pointLatLong;

        workflowArgs.quickReportIn = (isQuickReport) ? true : null;

        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);

    }

    openWildfireRiskQuickRepoort = function (event, element, context) {

        this.buildWildfireRiskWorkflowRequest(true, context);
    };

    openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {

        this.buildWildfireRiskWorkflowRequest(isQuickReport,context);
    };

}

//var myApp;

/*module oe.wildfireRiskPopup {
    
    export class WildfireRiskPopupModuleView extends geocortex.framework.ui.ViewBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        buildWildfireRiskWorkflowRequest = function (isQuickReport: boolean = false) {

            let workflowArgs: any = {};
            workflowArgs.workflowId = "Wildfire_Risk_Report";

            workflowArgs.risk_value = $("#WildfireRisk_value").text();
            workflowArgs.risk_percent = oe.wildfireRiskPopup.riskPercentOut;//$("#WildfireRisk_riskdatapercent").text();
            workflowArgs.wfpd = $("#WildfireRisk_forest_protection_district").text();
            workflowArgs.wspd = $("#WildfireRisk_structural_projection_district").text();
            workflowArgs.wrpa = $("#WildfireRisk_rangeland_protection_assoc").text();
            workflowArgs.city = $("#WildfireRisk_city").text();
            workflowArgs.ugb = $("#WildfireRisk_urban_growth_boundary").text();
            workflowArgs.cwpp = $("#WildfireRisk_cwpp_area").text();
            workflowArgs.sb360 = $("#WildfireRisk_senatebill_360").text();

            workflowArgs.firewiseComm = $("#WildfireRisk_firewise_community").text();

            workflowArgs.flame_min = $("#WildfireRisk_flame_min").text();
            workflowArgs.flame_max = $("#WildfireRisk_flame_max").text();
            workflowArgs.flame_ave = $("#WildfireRisk_flame_ave").text();

            workflowArgs.geometryElementsJsonString = oe.wildfireRiskPopup.geometryElementsJsonString;
            workflowArgs.reportImageFeatureCollectionJSON = oe.wildfireRiskPopup.reportImageFeatureCollectionJSON;

            workflowArgs.reportImageExtent = oe.wildfireRiskPopup.reportImageExtent;
            workflowArgs.pointLatLong = pointLatLong;

            workflowArgs.quickReportIn = (isQuickReport) ? true : null;

            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);

        }
                                
        openWildfireRiskQuickRepoort = function (event, element, context) {

            this.buildWildfireRiskWorkflowRequest(true);
        };

        openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {

            this.buildWildfireRiskWorkflowRequest();            
        };
                
    }
}*/