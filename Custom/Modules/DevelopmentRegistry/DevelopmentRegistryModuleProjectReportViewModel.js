/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModuleProjectReportViewModel = (function (_super) {
            __extends(DevelopmentRegistryModuleProjectReportViewModel, _super);
            function DevelopmentRegistryModuleProjectReportViewModel(app, lib) {
                _super.call(this, app, lib);
                this.report_title = new Observable("");
                this.proj_name = new Observable("");
                this.dev_name = new Observable("");
                this.proj_dev_area = new Observable("");
                this.proj_pac_report_data = new ObservableCollection([]);
                this.pac_intersect = new Observable(true);
                this.no_pac_intersect = new Observable(false);
                this.pac_name_list = new Observable("");
                this.dev_num = new Observable("");
            }
            DevelopmentRegistryModuleProjectReportViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                var thisViewModel = this;
                this.app.registerActivityIdHandler("display_form_dev_reg_proj_report", function CustomEventHandler(workflowContext, contextFunctions) {
                    //let cat_area_rows = [];
                    thisViewModel.pac_intersect.set(true);
                    thisViewModel.no_pac_intersect.set(false);
                    var dev_area_row = [];
                    var baseline_row = [];
                    var decade_area_row = [];
                    var has_proj_name = false;
                    var is_updated_development_area = false;
                    var _pac_name_list = [];
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleProjectReportView");
                    //thisViewModel.reportDate.set("Data current as of " + new Date().toLocaleString());
                    thisViewModel.dev_num.set(myWorkflowContext.getValue("dev_num"));
                    var proj_dev_area = myWorkflowContext.getValue("development_area");
                    thisViewModel.proj_dev_area.set(thisViewModel.addCommas(proj_dev_area.toFixed(0)) + " acres");
                    thisViewModel.proj_name.set(myWorkflowContext.getValue("project_name"));
                    thisViewModel.dev_name.set(myWorkflowContext.getValue("development_name"));
                    has_proj_name = myWorkflowContext.getValue("project_name") !== null && myWorkflowContext.getValue("project_name") !== "";
                    var _report_title = has_proj_name
                        ? myWorkflowContext.getValue("project_name")
                        : myWorkflowContext.getValue("development_name");
                    thisViewModel.report_title.set(_report_title);
                    myApp.viewManager.getViewById("DevelopmentRegistryModuleProjectReportView").title.set(_report_title + " Impact Report");
                    var pac_baseline_area_fs = myWorkflowContext.getValue("pac_baseline_area");
                    var reportFinalFS = myWorkflowContext.getValue("final_report");
                    reportFinalFS.features.forEach(function (feature) {
                        if (_pac_name_list.indexOf(feature.attributes.PAC_name) === -1) {
                            _pac_name_list.push(feature.attributes.PAC_name);
                        }
                    });
                    if (myWorkflowContext.getValue("pac_name")) {
                        _pac_name_list = _pac_name_list.length > 0
                            ? _pac_name_list
                            : myWorkflowContext.getValue("pac_name").replace(/\','/g, ",");
                        thisViewModel.pac_name_list.set(_pac_name_list.toString());
                        //let pacs = _pac_name_list.split(',');
                        var pac_proj_array_1 = [];
                        _pac_name_list.forEach(function (pac) {
                            var proj_pac_obj = {};
                            proj_pac_obj['pac_name'] = pac + " PAC";
                            proj_pac_obj['report_title'] = _report_title;
                            var pac_area_stats = pac_baseline_area_fs.features.filter(function (pba) {
                                return pba.attributes.PAC_name === pac;
                            });
                            var pac_area_dbl = pac_area_stats.length > 0
                                ? pac_area_stats[0].attributes.pac_area_acres
                                : pac_baseline_area_fs.features.length > 0
                                    ? pac_baseline_area_fs.features[0].attributes.pac_area_acres
                                    : 0;
                            proj_pac_obj['pac_area'] = thisViewModel.addCommas((pac_area_dbl.toFixed(0)) + " acres");
                            var baseline_area = pac_area_stats.length > 0
                                ? pac_area_stats[0].attributes.baseline_data_area_acres
                                : pac_baseline_area_fs.features.length > 0
                                    ? pac_baseline_area_fs.features[0].attributes.baseline_data_area_acres
                                    : 0;
                            proj_pac_obj['baseline_area'] = baseline_area !== 0
                                ? thisViewModel.addCommas(baseline_area.toFixed(0)) + " acres"
                                : "not available";
                            proj_pac_obj['baseline_percent'] = (baseline_area / pac_area_dbl * 100).toFixed(2) + "%";
                            var report_final_stats = reportFinalFS.features.filter(function (rf) {
                                return rf.attributes.PAC_name == pac;
                            });
                            report_final_stats = report_final_stats.length < 1
                                ? reportFinalFS.features
                                : report_final_stats;
                            if (report_final_stats.length > 0) {
                                report_final_stats.forEach(function (stat) {
                                    var is_gp_processed = stat.attributes.SUM_POLY_AREA !== undefined;
                                    is_updated_development_area = is_gp_processed
                                        ? is_gp_processed
                                        : is_updated_development_area;
                                    var stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                                    stat_area = is_gp_processed
                                        ? stat_area
                                        : (stat_area + proj_dev_area);
                                    var stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                                    var stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                                    switch (stat.attributes.stat) {
                                        case 'all':
                                            proj_pac_obj['overall_cap_val'] = stat_percent;
                                            proj_pac_obj['overall_area_val'] = stat_area_formatted + ' acres';
                                            break;
                                        case 'decade':
                                            proj_pac_obj['decade_cap_val'] = stat_percent;
                                            proj_pac_obj['decade_area_val'] = stat_area_formatted + ' acres';
                                            break;
                                        case 'input_area':
                                            proj_pac_obj['input_area_pac_percent'] = stat_percent;
                                            proj_pac_obj['input_area_pac_area'] = stat_area_formatted + ' acres';
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            }
                            if (!proj_pac_obj['decade_cap_val']) {
                                // no developments added yet so no stat entry caught above, so add this temporary project
                                var stat_area_formatted = thisViewModel.addCommas(proj_dev_area.toFixed(0));
                                var stat_percent = (proj_dev_area / pac_area_dbl * 100).toFixed(2) + "%";
                                proj_pac_obj['decade_cap_val'] = stat_percent;
                                proj_pac_obj['decade_area_val'] = stat_area_formatted + ' acres';
                                proj_pac_obj['input_area_pac_percent'] = stat_percent;
                                proj_pac_obj['input_area_pac_area'] = stat_area_formatted + ' acres';
                            }
                            pac_proj_array_1.push(proj_pac_obj);
                        });
                        thisViewModel.proj_pac_report_data.set(pac_proj_array_1);
                    }
                    else {
                        thisViewModel.pac_intersect.set(false);
                        thisViewModel.no_pac_intersect.set(true);
                    }
                    //thisViewModel.has_all.set(thisViewModel.has_current.get() && thisViewModel.has_projected.get());
                    //myApp.viewManager.getViewById("DevelopmentRegistryModuleProjectReportView").title.set("Project Impact Report");
                    //baseline_row.push({
                    //    category: 'Baseline developments',
                    //    area: thisViewModel.addCommas(myWorkflowContext.getValue("baseline_area").toFixed(0)),
                    //    percent: (myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%"
                    //});
                    //thisViewModel.pac_title.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    //thisViewModel.pac_title_projected.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    //thisViewModel.baseline_area.set(baseline_row[0].area + " acres");
                    //thisViewModel.baseline_percent.set((myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%");
                    //let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
                    //thisViewModel.decade_tbl.set(cap_one_percent_tbl);
                    //thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);
                    //let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
                    //thisViewModel.overall_tbl.set(overall_cap_tbl);
                    //let cap_one_percent_projected_tbl = proj_cat_area_rows.concat(proj_decade_area_row);
                    //thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
                    //thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);
                    //let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
                    //thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);
                });
            };
            //setExceedanceMsgs() {
            //    this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
            //    this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
            //    this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
            //    this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
            //}
            DevelopmentRegistryModuleProjectReportViewModel.prototype.addCommas = function (nStr) {
                nStr += '';
                var x = nStr.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            };
            return DevelopmentRegistryModuleProjectReportViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        dev_registry.DevelopmentRegistryModuleProjectReportViewModel = DevelopmentRegistryModuleProjectReportViewModel;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
//# sourceMappingURL=DevelopmentRegistryModuleProjectReportViewModel.js.map