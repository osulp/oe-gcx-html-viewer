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
        var DevelopmentRegistryModuleViewModel = (function (_super) {
            __extends(DevelopmentRegistryModuleViewModel, _super);
            function DevelopmentRegistryModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.pac_title = new Observable("");
                this.pac_title_projected = new Observable("");
                this.pac_area = new Observable("");
                this.baseline_area = new Observable("");
                this.baseline_percent = new Observable("");
                this.dev_area = new Observable("");
                this.decade_tbl = new ObservableCollection([]);
                this.overall_tbl = new ObservableCollection([]);
                this.decade_projected_tbl = new ObservableCollection([]);
                this.overall_projected_tbl = new ObservableCollection([]);
                this.decade_cap_val = new Observable("");
                this.overall_cap_val = new Observable("");
                this.decade_projected_cap_val = new Observable("");
                this.overall_projected_cap_val = new Observable("");
                this.decade_area_val = new Observable("");
                this.overall_area_val = new Observable("");
                this.decade_projected_area_val = new Observable("");
                this.overall_projected_area_val = new Observable("");
                this.has_current = new Observable(false);
                this.has_projected = new Observable(false);
                this.has_all = new Observable(false);
                this.show_decade_tbl_current = new Observable(false);
                this.show_decade_tbl_projected = new Observable(false);
                this.isCached = new Observable(false);
                this.exceedsCurrentDecade = new Observable(false);
                this.exceedsCurrentMax = new Observable(false);
                this.exceedsProjectedDecade = new Observable(false);
                this.exceedsProjectedMax = new Observable(false);
                this.reportDate = new Observable("");
            }
            DevelopmentRegistryModuleViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                var thisViewModel = this;
                this.app.registerActivityIdHandler("displaycustomform_devReg", function CustomEventHandler(workflowContext, contextFunctions) {
                    var cat_area_rows = [];
                    var dev_area_row = [];
                    var baseline_row = [];
                    var decade_area_row = [];
                    var decade_cat_area_row = [];
                    var proj_all_area_row = [];
                    var proj_decade_area_row = [];
                    var proj_decade_cat_area_row = [];
                    var proj_cat_area_rows = [];
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleView");
                    var pac_area_dbl = myWorkflowContext.getValue("pac_area");
                    thisViewModel.pac_area.set(thisViewModel.addCommas(pac_area_dbl.toFixed(0)) + " acres");
                    var reportFinalFS = myWorkflowContext.getValue("report_final");
                    var reportType = myWorkflowContext.getValue("report_type");
                    var isPublic = myWorkflowContext.getValue("public");
                    thisViewModel.isCached.set(myWorkflowContext.getValue("cached"));
                    thisViewModel.decade_cap_val.set("0%");
                    thisViewModel.overall_cap_val.set("0%");
                    thisViewModel.decade_projected_cap_val.set("0%");
                    thisViewModel.overall_projected_cap_val.set("0%");
                    thisViewModel.has_current.set(false);
                    thisViewModel.has_projected.set(false);
                    //if cached and current, then means public view of cached results so midnight time
                    //else current time
                    thisViewModel.reportDate.set("Data current as of "
                        + (thisViewModel.isCached.get() && reportType === "Current" && isPublic
                            ? new Date().toLocaleDateString() + " 12:00 AM"
                            : new Date().toLocaleString()));
                    reportFinalFS.features.forEach(function (stat) {
                        var stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                        var stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                        var stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                        switch (stat.attributes.stat) {
                            case 'all':
                                thisViewModel.has_current.set(true);
                                dev_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.overall_cap_val.set(stat_percent);
                                thisViewModel.overall_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'decade':
                                decade_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.decade_cap_val.set(stat_percent);
                                thisViewModel.decade_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'categories':
                            case 'decade_categories':
                            case 'projected_categories':
                            case 'projected_decade_categories':
                                if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                                    var stat_obj = {
                                        category: stat.attributes.category_merged || stat.attributes.category_m,
                                        area: stat_area_formatted,
                                        percent: stat_percent
                                    };
                                    switch (stat.attributes.stat) {
                                        case 'categories':
                                            cat_area_rows.push(stat_obj);
                                            break;
                                        case 'decade_categories':
                                            decade_cat_area_row.push(stat_obj);
                                            break;
                                        case 'projected_categories':
                                            proj_cat_area_rows.push(stat_obj);
                                            break;
                                        case 'projected_decade_categories':
                                            proj_decade_cat_area_row.push(stat_obj);
                                            break;
                                    }
                                }
                                break;
                            case 'projected_all':
                                thisViewModel.has_projected.set(true);
                                proj_all_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.overall_projected_cap_val.set(stat_percent);
                                thisViewModel.overall_projected_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'projected_decade':
                                proj_decade_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.decade_projected_cap_val.set(stat_percent);
                                thisViewModel.decade_projected_area_val.set(stat_area_formatted + ' acres');
                                break;
                            //case 'projected_categories':
                            //    if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                            //        proj_cat_area_rows.push({
                            //            category: stat.attributes.category_merged || stat.attributes.category_m,
                            //            area: stat_area_formatted,
                            //            percent: stat_percent
                            //        });
                            //    }
                            //    break;
                            default:
                                break;
                        }
                    });
                    thisViewModel.has_all.set(thisViewModel.has_current.get() && thisViewModel.has_projected.get());
                    myApp.viewManager.getViewById("DevelopmentRegistryModuleView").title.set(thisViewModel.has_projected.get() ? "Estimated Development Impact Report" : "PAC Development Impact Report");
                    baseline_row.push({
                        category: 'Baseline developments',
                        area: thisViewModel.addCommas(myWorkflowContext.getValue("baseline_area").toFixed(0)),
                        percent: (myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%"
                    });
                    thisViewModel.pac_title.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    thisViewModel.pac_title_projected.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    thisViewModel.baseline_area.set(baseline_row[0].area + " acres");
                    thisViewModel.baseline_percent.set(baseline_row[0].percent);
                    //let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
                    var cap_one_percent_tbl = decade_cat_area_row.concat(decade_area_row);
                    thisViewModel.decade_tbl.set(cap_one_percent_tbl);
                    thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);
                    //let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
                    var overall_cap_tbl = cat_area_rows.concat(dev_area_row);
                    thisViewModel.overall_tbl.set(overall_cap_tbl);
                    //let cap_one_percent_projected_tbl = proj_cat_area_rows.concat                    (proj_decade_area_row);
                    var cap_one_percent_projected_tbl = proj_decade_cat_area_row.concat(proj_decade_area_row);
                    thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
                    thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);
                    //let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
                    var overall_cap_projected_tbl = proj_cat_area_rows.concat(proj_all_area_row);
                    thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);
                });
            };
            DevelopmentRegistryModuleViewModel.prototype.setExceedanceMsgs = function () {
                this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
                this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
                this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
                this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
            };
            DevelopmentRegistryModuleViewModel.prototype.addCommas = function (nStr) {
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
            return DevelopmentRegistryModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        dev_registry.DevelopmentRegistryModuleViewModel = DevelopmentRegistryModuleViewModel;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
//# sourceMappingURL=DevelopmentRegistryModuleViewModel.js.map