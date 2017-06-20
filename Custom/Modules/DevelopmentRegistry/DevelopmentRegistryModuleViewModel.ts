/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

module oe.dev_registry {

    export class DevelopmentRegistryModuleViewModel extends geocortex.framework.ui.ViewModelBase {


        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        pac_title: Observable<string> = new Observable("");
        pac_title_projected: Observable<string> = new Observable("");
        pac_area: Observable<string> = new Observable("");
        baseline_area: Observable<string> = new Observable("");
        baseline_percent: Observable<string> = new Observable("");
        dev_area: Observable<string> = new Observable("");
        decade_tbl: ObservableCollection<string> = new ObservableCollection([]);
        overall_tbl: ObservableCollection<string> = new ObservableCollection([]);
        decade_projected_tbl: ObservableCollection<string> = new ObservableCollection([]);
        overall_projected_tbl: ObservableCollection<string> = new ObservableCollection([]);
        decade_cap_val: Observable<string> = new Observable("");
        overall_cap_val: Observable<string> = new Observable("");
        decade_projected_cap_val: Observable<string> = new Observable("");
        overall_projected_cap_val: Observable<string> = new Observable("");
        decade_area_val: Observable<string> = new Observable("");
        overall_area_val: Observable<string> = new Observable("");
        decade_projected_area_val: Observable<string> = new Observable("");
        overall_projected_area_val: Observable<string> = new Observable("");
        has_current: Observable<boolean> = new Observable(false);
        has_projected: Observable<boolean> = new Observable(false);
        has_all: Observable<boolean> = new Observable(false);
        show_decade_tbl_current: Observable<boolean> = new Observable(false);
        show_decade_tbl_projected: Observable<boolean> = new Observable(false);
        isCached: Observable<boolean> = new Observable(false);
        exceedsCurrentDecade: Observable<boolean> = new Observable(false);
        exceedsCurrentMax: Observable<boolean> = new Observable(false);
        exceedsProjectedDecade: Observable<boolean> = new Observable(false);
        exceedsProjectedMax: Observable<boolean> = new Observable(false);
        reportDate: Observable<string> = new Observable("");

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            myApp = this.app;
            myLibID = this.libraryId;
            var thisViewModel = this;

            this.app.registerActivityIdHandler("displaycustomform_devReg", function CustomEventHandler(workflowContext, contextFunctions) {
                let cat_area_rows = [];
                let dev_area_row = [];
                let baseline_row = [];
                let decade_area_row = [];
                let proj_all_area_row = [];
                let proj_decade_area_row = [];
                let proj_cat_area_rows = [];

                myWorkflowContext = $.extend({}, workflowContext);
                myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleView");

                let pac_area_dbl = myWorkflowContext.getValue("pac_area");
                thisViewModel.pac_area.set(thisViewModel.addCommas(pac_area_dbl.toFixed(0)) + " acres");

                let reportFinalFS: esri.tasks.FeatureSet = myWorkflowContext.getValue("report_final");
                let reportType = myWorkflowContext.getValue("report_type");

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
                    + (thisViewModel.isCached.get() && reportType === "Current"
                        ? new Date().toLocaleDateString() + " 12:00 AM"
                        : new Date().toLocaleString()));

                reportFinalFS.features.forEach((stat: any) => {
                    let stat_area = stat.attributes.SUM_AREA_GEO || stat.attributes.SUM_AREA_G;
                    let stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                    let stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
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
                            if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                                cat_area_rows.push({
                                    category: stat.attributes.category_merged || stat.attributes.category_m,
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
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
                        case 'projected_categories':
                            if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                                proj_cat_area_rows.push({
                                    category: stat.attributes.category_merged || stat.attributes.category_m,
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                            }
                            break;
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

                let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
                thisViewModel.decade_tbl.set(cap_one_percent_tbl);
                thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);

                let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
                thisViewModel.overall_tbl.set(overall_cap_tbl);

                let cap_one_percent_projected_tbl = proj_cat_area_rows.concat(proj_decade_area_row);
                thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
                thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);

                let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
                thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);



            });
        }

        setExceedanceMsgs() {
            this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
            this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
            this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
            this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
        }

        addCommas(nStr) {
            nStr += '';
            let x = nStr.split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    }
}