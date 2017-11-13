/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

var myApp;

module oe.wildfireRiskPopup {
    
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
}