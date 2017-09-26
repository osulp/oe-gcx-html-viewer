/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

module oe.dev_registry {

    export class DevelopmentRegistryModuleProjectReportViewModel extends geocortex.framework.ui.ViewModelBase {


        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        report_title: Observable<string> = new Observable("");
        proj_name: Observable<string> = new Observable("");
        dev_name: Observable<string> = new Observable("");
        proj_dev_area: Observable<string> = new Observable("");
        proj_pac_report_data: ObservableCollection<Object> = new ObservableCollection([]);
        pac_intersect: Observable<boolean> = new Observable(true);
        no_pac_intersect: Observable<boolean> = new Observable(false);
        pac_name_list: Observable<string> = new Observable("");
        dev_num: Observable<string> = new Observable("");

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            myApp = this.app;
            myLibID = this.libraryId;
            var thisViewModel = this;

            this.app.registerActivityIdHandler("display_form_dev_reg_proj_report", function CustomEventHandler(workflowContext, contextFunctions) {
                //let cat_area_rows = [];
                thisViewModel.pac_intersect.set(true);
                thisViewModel.no_pac_intersect.set(false);
                let dev_area_row = [];
                let baseline_row = [];
                let decade_area_row = [];
                let has_proj_name = false;
                let is_updated_development_area = false;
                let _pac_name_list = [];

                myWorkflowContext = $.extend({}, workflowContext);
                myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleProjectReportView");

                //thisViewModel.reportDate.set("Data current as of " + new Date().toLocaleString());

                thisViewModel.dev_num.set(myWorkflowContext.getValue("dev_num"));

                let proj_dev_area = myWorkflowContext.getValue("development_area");
                thisViewModel.proj_dev_area.set(thisViewModel.addCommas(proj_dev_area.toFixed(0)) + " acres");

                thisViewModel.proj_name.set(myWorkflowContext.getValue("project_name"));
                thisViewModel.dev_name.set(myWorkflowContext.getValue("development_name"));

                has_proj_name = myWorkflowContext.getValue("project_name") !== null && myWorkflowContext.getValue("project_name") !== "";

                let _report_title = has_proj_name
                    ? myWorkflowContext.getValue("project_name")
                    : myWorkflowContext.getValue("development_name")
                thisViewModel.report_title.set(_report_title);

                myApp.viewManager.getViewById("DevelopmentRegistryModuleProjectReportView").title.set(_report_title + " Impact Report");

                let pac_baseline_area_fs: esri.tasks.FeatureSet = myWorkflowContext.getValue("pac_baseline_area");

                let reportFinalFS: esri.tasks.FeatureSet = myWorkflowContext.getValue("final_report");

                reportFinalFS.features.forEach((feature) => {
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
                    let pac_proj_array = [];
                    _pac_name_list.forEach((pac) => {
                        let proj_pac_obj = {};
                        proj_pac_obj['pac_name'] = pac + " PAC";
                        proj_pac_obj['report_title'] = _report_title;

                        let pac_area_stats = pac_baseline_area_fs.features.filter((pba: any) => {
                            return pba.attributes.PAC_name === pac;
                        });

                        let pac_area_dbl = pac_area_stats.length > 0
                            ? pac_area_stats[0].attributes.pac_area_acres
                            : pac_baseline_area_fs.features.length > 0
                                ? pac_baseline_area_fs.features[0].attributes.pac_area_acres
                                : 0;

                        proj_pac_obj['pac_area'] = thisViewModel.addCommas((pac_area_dbl.toFixed(0)) + " acres");

                        let baseline_area = pac_area_stats.length > 0
                            ? pac_area_stats[0].attributes.baseline_data_area_acres
                            : pac_baseline_area_fs.features.length > 0
                                ? pac_baseline_area_fs.features[0].attributes.baseline_data_area_acres
                                : 0;

                        proj_pac_obj['baseline_area'] = baseline_area !== 0
                            ? thisViewModel.addCommas(baseline_area.toFixed(0)) + " acres"
                            : "not available";

                        proj_pac_obj['baseline_percent'] = (baseline_area / pac_area_dbl * 100).toFixed(2) + "%";

                        let report_final_stats = reportFinalFS.features.filter((rf) => {
                            return rf.attributes.PAC_name == pac;
                        });

                        report_final_stats = report_final_stats.length < 1
                            ? reportFinalFS.features
                            : report_final_stats;

                        if (report_final_stats.length > 0) {
                            report_final_stats.forEach((stat: any) => {
                                let is_gp_processed = stat.attributes.SUM_POLY_AREA !== undefined;
                                is_updated_development_area = is_gp_processed
                                    ? is_gp_processed
                                    : is_updated_development_area;
                                let stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                                stat_area = is_gp_processed
                                    ? stat_area
                                    : (stat_area + proj_dev_area);
                                let stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                                let stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
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
                            let stat_area_formatted = thisViewModel.addCommas(proj_dev_area.toFixed(0));
                            let stat_percent = (proj_dev_area / pac_area_dbl * 100).toFixed(2) + "%";
                            proj_pac_obj['decade_cap_val'] = stat_percent;
                            proj_pac_obj['decade_area_val'] = stat_area_formatted + ' acres';
                            proj_pac_obj['input_area_pac_percent'] = stat_percent;
                            proj_pac_obj['input_area_pac_area'] = stat_area_formatted + ' acres';
                        }

                        pac_proj_array.push(proj_pac_obj);
                    });

                    thisViewModel.proj_pac_report_data.set(pac_proj_array);


                } else {
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
        }

        //setExceedanceMsgs() {
        //    this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
        //    this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
        //    this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
        //    this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
        //}

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