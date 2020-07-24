/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { getGraphicsLayer  } from "geocortex/infrastructure/GraphicUtils";
import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";

export var oeSageGrouseDevSitingReports: any[] = [];

export class OE_SageGrouseDevSitingViewModel extends ViewModelBase {
    app: ViewerApplication;

    //inputs for report
    projectName: Observable<string> = new Observable<string>("");
    devType: Observable<string> = new Observable<string>("");
    devTypeDetails: Observable<string> = new Observable<string>("");
    showDevTypeDetails: Observable<boolean> = new Observable<boolean>(false);
    compensatoryMitigation: Observable<string> = new Observable<string>("");
    compensatoryMitigationDirect: Observable<string> = new Observable<string>("");
    reportURL: Observable<string> = new Observable<string>("");
    chartURL: Observable<string> = new Observable<string>("");
    chartSimpleURL: Observable<string> = new Observable<string>("");
    directArea: Observable<string> = new Observable<string>("");
    indirectArea: Observable<string> = new Observable<string>("");
    bufferDist: Observable<string> = new Observable<string>("");
    indirectHabArea: Observable<string> = new Observable<string>("");
    directHabArea: Observable<string> = new Observable<string>("");
    habDesig: Observable<string> = new Observable<string>("");
    isLek: Observable<string> = new Observable<string>("");
    landManagement: Observable<string> = new Observable<string>("");
    countyContacts: Observable<string> = new Observable<string>("");
    blmContacts: Observable<string> = new Observable<string>("");
    odoeContact: Observable<string> = new Observable<string>("");
    dogamiContact: Observable<string> = new Observable<string>("");
    avoidance: Observable<string> = new Observable<string>("");
    //minimization: Observable<string> = new Observable<string>("");
    significant: Observable<string> = new Observable<string>("");
    significantMsg: Observable<string> = new Observable<string>("");
    minimization_list: ObservableCollection<string> = new ObservableCollection([]);
    rulesTriggersMsg: Observable<string> = new Observable<string>("");
    devRuleType: Observable<string> = new Observable<string>("");
    devRuleTypeState: Observable<string> = new Observable<string>("");
    devRuleTypeCounty: Observable<string> = new Observable<string>("");
    devRuleNoDirectHabButState: Observable<boolean> = new Observable<boolean>(false);
    hasRulesTriggersMsg: Observable<boolean> = new Observable<boolean>(false);
    hasDevRuleType: Observable<boolean> = new Observable<boolean>(false);
    hasNoHabDirect: Observable<boolean> = new Observable<boolean>(false);
    hasAllHabDirect: Observable<boolean> = new Observable<boolean>(false);
    hasAllHabIndirect: Observable<boolean> = new Observable<boolean>(false);
    showHabAreaDirect: Observable<boolean> = new Observable<boolean>(false);
    showNoDirectHabArea: Observable<boolean> = new Observable<boolean>(false);
    showPartHabMsg: Observable<boolean> = new Observable<boolean>(false);
    isODOE: Observable<boolean> = new Observable<boolean>(false);
    isDOGAMI: Observable<boolean> = new Observable<boolean>(false);
    //projectAreaFS: Observable<esri.tasks.FeatureSet> = new Observable<esri.tasks.FeatureSet>();

    //inputs for dashboard
    report_list: ObservableCollection<any>; //= new ObservableCollection([]);
    selected_reports: ObservableCollection<any>;
    canCompare: Observable<boolean> = new Observable(false);

    //myWorkflowContext: Observable<ActivityContext> = new Observable<ActivityContext>(null);
    myWorkflowContext: any;
    myModel: any;
    //myModel: Observable<OE_SageGrouseDevSitingViewModel> = new Observable<OE_SageGrouseDevSitingViewModel>(null);


    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);

        this.report_list = new ObservableCollection([{}]);
        this.selected_reports = new ObservableCollection([{}]);

        //this.report_list.bind(this, (report) => {
        //    console.log('what the ?', this, report);
        //    return false;
        //});
        this.report_list.bind(this, () => {
            try {
                this.selected_reports.set(this.report_list.getItems().filter((rl: any) => rl.selected.get()));
                this.canCompare.set(this.selected_reports.getLength() === 2);
            } catch (ex) {
                //no values yet
                console.log('initiated without data yet');
            }
        });
    }

    initialize(config: any): void {
        var site: Site = (<any>this).app.site;

        var thisViewModel = this;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {

        thisViewModel.myModel = thisViewModel;
        this.app.registerActivityIdHandler("devSitingDashboard", function (wfContext) {
            thisViewModel.myWorkflowContext = $.extend({}, wfContext);
            thisViewModel.wfContext = $.extend({}, wfContext);
            let selectedReport = thisViewModel.myWorkflowContext.getValue("selectedReport");
            let addData = thisViewModel.myWorkflowContext.getValue("projectName") ? true : false;
            if (addData) {
                thisViewModel.setReportValues(thisViewModel.myWorkflowContext, null, true);
            }
            if (oeSageGrouseDevSitingReports.length > 0) {
                thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingDashboardView");
                oeSageGrouseDevSitingReports.forEach((report: any) => {
                    report.selected = new Observable<boolean>(report.name === selectedReport);
                    report.selected.bind(this, () => {
                        thisViewModel.selected_reports.set(thisViewModel.report_list.getItems()
                            .filter((rl: any) => rl.selected.get()));
                        thisViewModel.canCompare.set(thisViewModel.selected_reports.getLength() === 2);
                    });
                    report.expanded = new Observable<boolean>(true);
                    report.view_download_opts = new Observable<boolean>(false);
                    //report.selected = report.name === selectedReport;
                });
                thisViewModel.report_list.set(oeSageGrouseDevSitingReports);
                if (selectedReport) {
                    let reportData = oeSageGrouseDevSitingReports.filter((reports: any) => reports.selected);
                    thisViewModel.setReportValues(reportData[0], thisViewModel, false);
                    thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingSummaryView");
                }
                thisViewModel.setGraphicsVisibilty();
            } else {
                thisViewModel.myWorkflowContext.completeActivity();
            }
        });


        this.app.registerActivityIdHandler("devSitingForm", function CustomEventHandler(workflowContext) {
            thisViewModel.setReportValues(workflowContext, thisViewModel, true);
            //thisViewModel.app.commandRegistry.command
            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingReportView");
            workflowContext.completeActivity();
            //thisViewModel.myModel = thisViewModel;
        });

        this.app.registerActivityIdHandler("handleKmlLink", function (wfContext) {
            console.log('link result', wfContext);
        });

    }

    setGraphicsVisibilty() {
        this.report_list.getItems().forEach((report) => {
            let gls = this.getGraphicsLayers(report.name);
            if (report.selected.get()) {
                gls.forEach((gl) => {
                    gl.show();
                });
            } else {
                gls.forEach((gl) => {
                    gl.hide();
                });
            }
        })
    };

    getGraphicsLayers(reportName) {
        return [
            getGraphicsLayer("DirectArea" + reportName, false, this.app),
            getGraphicsLayer("IndirectArea" + reportName, false, this.app),
            getGraphicsLayer("DirectAreaMarker" + reportName, false, this.app),
            getGraphicsLayer("DirectAreaLabelBackground" + reportName, false, this.app),
            //getGraphicsLayer("DirectAreaLabel" + reportName, false, this.app)
        ];
    }

    removeReport(wc, vm) {
        oeSageGrouseDevSitingReports = oeSageGrouseDevSitingReports.filter((report: any) => {
            if (report.name === wc.name) {
                //removeGraphics
                let gls = this.getGraphicsLayers(report.name);
                gls.forEach((gl) => {
                    gl.clear();
                });
                this.report_list.removeItem(report);
            }
            return report.name !== wc.name
        });
    };

    compareReports(wc, vm) {
        //let compReports = this.report_list.getItems().filter((rl: any) => rl.selected.get());
        //this.canCompare.set(compReports.length < 2 || compReports.length > 2);
        //this.selected_reports.set(compReports);
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingCompareSummaryView");
    };

    downloadShapefiles(event, element, context) {
        //get the graphics layers
        //since they may have the most recent graphics, delete and add the requested ones to the layer
        //then combine graphics into one layer

        context = context.myWorkflowContext ? context.myWorkflowContext : context;

        let buffereredGL = getGraphicsLayer("IndirectArea" + context.name, false, this.app);
        let projectGL = getGraphicsLayer("DirectArea" + context.name, false, this.app);

        buffereredGL.clear();
        projectGL.clear();


        var featAttrProj = this.setFeatAttr(context, 'project area');
        var featAttrIndirect = this.setFeatAttr(context, 'indirect project area');

        context.buffered_area_fs.features.forEach((feature) => {
            feature.setAttributes(featAttrIndirect);
            projectGL.add(feature);
        });

        context.project_area_fs.features.forEach((feature) => {
            feature.setAttributes(featAttrProj);
            projectGL.add(feature);
        });

        let exportArgs: ExportGraphicsLayerArgs = {
            format: "shp",
            graphicLayer: projectGL
        };
        this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
    };


    downloadKml(event, element, context) {

        var projectFeatures: esri.tasks.FeatureSet = new esri.tasks.FeatureSet();

        context = context.myWorkflowContext ? context.myWorkflowContext : context;

        var featAttrProj = this.setFeatAttr(context, 'project area');
        var featAttrIndirect = this.setFeatAttr(context, 'indirect project area');

        context.buffered_area_fs.features.forEach((feature) => {
            feature.setAttributes(featAttrIndirect);
            projectFeatures.features.push(feature);
        });
        context.project_area_fs.features.forEach((feature) => {
            feature.setAttributes(featAttrProj);
            projectFeatures.features.push(feature);
        });

        let gpUrl = "https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/toKML/GPServer/toKML";
        //let gpUrl = "https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/toKML/GPServer/toKML_no_attr"

        let gp = new esri.tasks.Geoprocessor(gpUrl);

        let gpParams = {
            "Input_Features": projectFeatures
        }
        //check if chrome
        const a = window.document.createElement('a');

        if (window["chrome"]) {
            var kmlWindow = window.open('', '_blank');
            kmlWindow.document.body.innerHTML = "<div style='width:50%;height:50%;margin:auto'>Generating your KMZ file to download.  Check your pop-up blocker if you do not see the download.</div>";
        } else {            
            a.href = "";
            a.download = context.name;
            a.target = '_blank';
            document.body.appendChild(a);
        }
        
        

        gp.submitJob(gpParams, (results, messages) => {
            console.log('results!', results, messages);
            if (results.jobStatus === 'esriJobSucceeded') {
                let url = gpUrl + '/jobs/' + results.jobId + '/inputs/Input_Features?f=kmz';
                if (window["chrome"]) {
                    kmlWindow.location.href = url;
                    window.setTimeout(() => kmlWindow.close(), 500);
                } else {
                    a.href = url;
                    a.download = context.name;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    // IE: "Access is denied"; 
                    // see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                    a.click();
                    document.body.removeChild(a);
                }
            }
        }, (status) => {
            console.log('status', status);
        },
            (error) => {
                console.log('error :(', error);
            });

        context.view_download_opts.set(false);
    };

    setFeatAttr(context, areaType) {
        return {
            "projectNam": context.name + ' ' + areaType,
            "projectTyp": context.dev_type,
            "areaType": areaType,
            "bufferDist": context.buffer_dist,
            "projArea": context.proj_area,
            "indirectAr": context.indirect_area,
            "nonHabArea": context.non_hab_area,
            "isLek": context.is_lek,
            "landMngt": context.land_mngt,
            //"cnt_contacts": context.cnty_contacts,
            //"blm_contacts": context.blm_contacts,
            //"avoidance": context.avoidance,
            //"significant": context.significant_msg,
            "date_gener": "fish"
        }
    };


    setReportValues(workflowContext, thisViewModel, addReport?: boolean) {
        try {
            //thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
            this.myWorkflowContext = $.extend({}, workflowContext);

            if (this.myWorkflowContext || workflowContext) {
                //this.myWorkflowContext = $.extend({}, workflowContext);
                //thisViewModel = this.myModel;
                //thisViewModel.myWorkflowContext = $.extend({}, workflowContext);

                let minimizations = [];
                if (addReport) {
                    this.myWorkflowContext.getValue("minimizations").split(';').forEach((min) => {
                        let minimization = { minimization: min };
                        minimizations.push(minimization);
                    });
                }

                let reportMetaInfo = {
                    name: addReport ? this.myWorkflowContext.getValue("projectName") : workflowContext.name,
                    dev_type: addReport ? this.myWorkflowContext.getValue("devType") : workflowContext.dev_type,
                    dev_type_details: addReport ? this.myWorkflowContext.getValue("devTypeDetails") : workflowContext.dev_type_details,
                    show_dev_type_details: addReport ? this.myWorkflowContext.getValue("devTypeDetails") !== "" : workflowContext.show_dev_type_details,
                    compensatory_mitigation: addReport ? this.myWorkflowContext.getValue("compensatoryMitigation") : workflowContext.compensatory_mitigation,
                    compensatory_mitigation_direct: addReport ? this.myWorkflowContext.getValue("compensatoryMitigationDirect") : workflowContext.compensatory_mitigation_direct,
                    report_url: addReport ? this.myWorkflowContext.getValue("reportURL") : workflowContext.report_url,
                    chart_url: addReport ? this.myWorkflowContext.getValue("chartURL") : workflowContext.chart_url,
                    chart_simple_url: addReport ? this.myWorkflowContext.getValue("chartSimpleURL") : workflowContext.chart_simple_url,
                    proj_area: addReport ? this.myWorkflowContext.getValue("directArea") : workflowContext.proj_area,
                    indirect_area: addReport ? this.myWorkflowContext.getValue("indirectArea") + " Acres" : workflowContext.indirect_area,
                    buffer_dist: addReport ? this.myWorkflowContext.getValue("bufferDist") + " km" : workflowContext.buffer_dist,
                    indirect_hab_area: addReport ? this.myWorkflowContext.getValue("indirectHabArea") + ' Acres' : workflowContext.indirect_hab_area,
                    direct_hab_area: addReport
                        ? this.myWorkflowContext.getValue("directHabArea")
                        + (this.myWorkflowContext.getValue("directArea").indexOf("Miles") !== -1
                            ? " Miles"
                            : " Acres")
                        : workflowContext.direct_hab_area,
                    hab_desig: addReport ? this.myWorkflowContext.getValue("habDesig") : workflowContext.hab_desig,
                    is_lek: addReport ? (this.myWorkflowContext.getValue("isLek") === 'True' ? 'Yes' : 'No') : workflowContext.is_lek,
                    land_mngt: addReport ? this.myWorkflowContext.getValue("landManagement") : workflowContext.land_mngt,
                    cnty_contacts: addReport ? this.myWorkflowContext.getValue("countyContacts") : workflowContext.cnty_contacts,
                    blm_contacts: addReport ? this.myWorkflowContext.getValue("blmContacts") : workflowContext.blm_contacts,
                    dogami_contact: addReport ? this.myWorkflowContext.getValue("dogamiContact") : workflowContext.dogami_contact,
                    odoe_contact: addReport ? this.myWorkflowContext.getValue("odoeContact") : workflowContext.odoe_contact,
                    avoidance: addReport ? this.myWorkflowContext.getValue("avoidance") === "True" ? 'may' : 'will not' : workflowContext.avoidance,
                    minimizations: addReport ? minimizations : workflowContext.minimizations,
                    significant: addReport ? this.myWorkflowContext.getValue("significant") ? 'are' : 'are not' : workflowContext.significant,
                    significant_msg: addReport ? this.myWorkflowContext.getValue("significantMsg") : workflowContext.significant_msg,
                    project_area_fs: addReport ? this.myWorkflowContext.getValue("projAreaFS") : workflowContext.project_area_fs,
                    buffered_area_fs: addReport ? this.myWorkflowContext.getValue("bufferedFS") : workflowContext.buffered_area_fs,
                    dev_rule_type: addReport ? this.myWorkflowContext.getValue("devRuleType") : workflowContext.dev_rule_type,
                    is_odoe: addReport ? this.myWorkflowContext.getValue("isODOE") === "True" : workflowContext.is_odoe,
                    is_dogami: addReport ? this.myWorkflowContext.getValue("isDOGAMI") === "True" : workflowContext.is_dogami,
                    dev_rule_type_state: addReport
                        ? this.myWorkflowContext.getValue("isODOE") === "True" || this.myWorkflowContext.getValue("isDOGAMI") === "True"
                        : workflowContext.dev_rule_type_state,
                    dev_rule_type_county: addReport
                        ? this.myWorkflowContext.getValue("devRuleType")
                            ? this.myWorkflowContext.getValue("devRuleType").indexOf('County') !== -1
                            : false
                        : workflowContext.dev_rule_type_county,
                    dev_rule_no_direct_hab_but_state: addReport
                        ? this.myWorkflowContext.getValue("devRuleType")
                            ? (this.myWorkflowContext.getValue("isODOE") === "True"
                                || this.myWorkflowContext.getValue("isDOGAMI") === "True")
                            && this.myWorkflowContext.getValue("directHabArea")
                                .split(" Acres")[0]
                                .split(" Miles")[0]
                            === "0"
                            : false
                        : workflowContext.dev_rule_no_direct_hab_but_state,
                    rules_triggers_msg: addReport ? this.myWorkflowContext.getValue("ruleTriggersMsg") : workflowContext.rules_triggers_msg,
                    has_dev_rule_type: addReport ? this.myWorkflowContext.getValue("devRuleType") !== null && this.myWorkflowContext.getValue("devRuleType") !== "" : workflowContext.has_dev_rule_type,
                    has_rules_triggers_msg: addReport ? this.myWorkflowContext.getValue("ruleTriggersMsg") !== '' : workflowContext.has_rules_triggers_msg,
                    has_no_hab_direct: addReport
                        ? this.myWorkflowContext.getValue("directHabArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        === "0"
                        : workflowContext.has_no_hab_direct,
                    has_all_hab_direct: addReport
                        ? this.myWorkflowContext.getValue("directArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        === this.myWorkflowContext.getValue("directHabArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        : workflowContext.has_all_hab_direct,
                    has_all_hab_indirect: addReport
                        ? this.myWorkflowContext.getValue("indirectArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        === this.myWorkflowContext.getValue("indirectHabArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        : workflowContext.has_all_hab_indirect,
                    has_part_hab_direct: addReport
                        ? this.myWorkflowContext.getValue("directHabArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0] !== "0"
                        && this.myWorkflowContext.getValue("directArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        !== this.myWorkflowContext.getValue("directHabArea")
                            .split(" Acres")[0]
                            .split(" Miles")[0]
                        : workflowContext.has_part_hab_direct
                };

                //add depedent attributes
                reportMetaInfo["show_no_direct_hab_area"] = reportMetaInfo.has_no_hab_direct && !reportMetaInfo.dev_rule_no_direct_hab_but_state;

                reportMetaInfo["show_hab_area_direct"] = reportMetaInfo.has_all_hab_direct && !reportMetaInfo.has_no_hab_direct;               

                if (addReport) {
                    oeSageGrouseDevSitingReports.splice(0, 0, reportMetaInfo);

                }

                //attach data to model for display in view
                this.myModel.projectName.set(reportMetaInfo.name);
                this.myModel.devType.set(reportMetaInfo.dev_type);
                this.myModel.devTypeDetails.set(reportMetaInfo.dev_type_details);
                this.myModel.showDevTypeDetails.set(reportMetaInfo.show_dev_type_details);
                this.myModel.compensatoryMitigation.set(reportMetaInfo.compensatory_mitigation);
                this.myModel.compensatoryMitigationDirect.set(reportMetaInfo.compensatory_mitigation_direct);
                this.myModel.reportURL.set(reportMetaInfo.report_url);
                this.myModel.chartURL.set(reportMetaInfo.chart_url);
                this.myModel.chartSimpleURL.set(reportMetaInfo.chart_simple_url);
                this.myModel.directArea.set(reportMetaInfo.proj_area);
                this.myModel.indirectArea.set(reportMetaInfo.indirect_area);
                this.myModel.bufferDist.set(reportMetaInfo.buffer_dist);
                this.myModel.indirectHabArea.set(reportMetaInfo.indirect_hab_area);
                this.myModel.directHabArea.set(reportMetaInfo.direct_hab_area);
                this.myModel.habDesig.set(reportMetaInfo.hab_desig);
                this.myModel.isLek.set(reportMetaInfo.is_lek);
                this.myModel.landManagement.set(reportMetaInfo.land_mngt);
                this.myModel.countyContacts.set(reportMetaInfo.cnty_contacts);
                this.myModel.blmContacts.set(reportMetaInfo.blm_contacts);
                this.myModel.odoeContact.set(reportMetaInfo.odoe_contact);
                this.myModel.dogamiContact.set(reportMetaInfo.dogami_contact);
                this.myModel.avoidance.set(reportMetaInfo.avoidance);
                this.myModel.minimization_list.set(reportMetaInfo.minimizations);
                this.myModel.significant.set(reportMetaInfo.significant);
                this.myModel.significantMsg.set(reportMetaInfo.significant_msg);
                this.myModel.devRuleTypeState.set(reportMetaInfo.dev_rule_type_state);
                this.myModel.devRuleTypeCounty.set(reportMetaInfo.dev_rule_type_county);
                this.myModel.devRuleNoDirectHabButState.set(reportMetaInfo.dev_rule_no_direct_hab_but_state);
                this.myModel.devRuleType.set(reportMetaInfo.dev_rule_type);
                this.myModel.rulesTriggersMsg.set(reportMetaInfo.rules_triggers_msg);
                this.myModel.hasDevRuleType.set(reportMetaInfo.has_dev_rule_type);
                this.myModel.hasRulesTriggersMsg.set(reportMetaInfo.has_rules_triggers_msg);
                this.myModel.hasNoHabDirect.set(reportMetaInfo.has_no_hab_direct);
                this.myModel.hasAllHabDirect.set(reportMetaInfo.has_all_hab_direct);
                this.myModel.hasAllHabIndirect.set(reportMetaInfo.has_all_hab_indirect);
                this.myModel.showHabAreaDirect.set(reportMetaInfo["show_hab_area_direct"]);
                this.myModel.showNoDirectHabArea.set(reportMetaInfo["show_no_direct_hab_area"]);
                this.myModel.showPartHabMsg.set(reportMetaInfo.has_part_hab_direct);
                this.myModel.isODOE.set(reportMetaInfo.is_odoe);
                this.myModel.isDOGAMI.set(reportMetaInfo.is_dogami);
            }
        }
        catch (ex) {
            console.log('error loading report_data');
        }
    };

}