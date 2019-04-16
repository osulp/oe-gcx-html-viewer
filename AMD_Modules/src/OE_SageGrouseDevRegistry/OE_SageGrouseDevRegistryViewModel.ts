/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { _activeAnimations } from "geocortex/framework-ui/animation/AnimationSequence";

export var oeSageGrouseDevSitingReports: any[] = [];

export class OE_SageGrouseDevRegistryViewModel extends ViewModelBase {
    app: ViewerApplication;

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
    filtered_date_tbl: ObservableCollection<string> = new ObservableCollection([]);
    filtered_date_proj_tbl: ObservableCollection<string> = new ObservableCollection([]);
    filtered_date_area: Observable<string> = new Observable("");
    filtered_percent_val: Observable<string> = new Observable("");
    filtered_date_proj_area: Observable<string> = new Observable("");
    filtered_proj_percent_val: Observable<string> = new Observable("");
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
    show_filtered_date_tbl: Observable<boolean> = new Observable(false);
    isCached: Observable<boolean> = new Observable(false);
    exceedsCurrentDecade: Observable<boolean> = new Observable(false);
    exceedsCurrentMax: Observable<boolean> = new Observable(false);
    exceedsProjectedDecade: Observable<boolean> = new Observable(false);
    exceedsProjectedMax: Observable<boolean> = new Observable(false);
    reportDate: Observable<string> = new Observable("");
    show_all_pac_links: Observable<boolean> = new Observable(false);
    all_pac_area_baseline_area: any = [{}];
    all_pac_development_data: any = [{}];
    all_pac_summary: ObservableCollection<string> = new ObservableCollection([]);   
    preset_date_ranges: ObservableCollection<any>;
    report_types: ObservableCollection<any>;
    selected_preset_date_range: Observable<string> = new Observable('');  
    selected_report_type: Observable<string> = new Observable(''); 
    show_custom_date_range_data: Observable<boolean> = new Observable(false);
    filtered_report_date_range: Observable<string> = new Observable('');

    date_filter: Observable<{}> = new Observable(
        {
            min: new Date(2015, 7, 13),
            max: Date.now()
        }
    );
    

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);

        this.preset_date_ranges = new ObservableCollection([
            {
                label: 'Decadal Range (Since 8/13/15)',
                val: 'decade'
            },
            {
                label: 'This Year',
                val: 'thisYear'
            },
            {
                label: 'Previous Year',
                val: 'previousYear'
            },
            {
                label: 'Custom range',
                val: 'custom'
            }
        ]);
        this.report_types = new ObservableCollection([
            {
                label: 'Current',
                val: 'Current'
            },
            {
                label: 'Estimated',
                val: 'Projected'
            }
        ]);
    }

    initialize(config: any): void {
        var myApp = this.app;
        var myLibID = this.libraryId;
        var thisViewModel = this;

        this.selected_report_type.set('Current');

        this.date_filter.bind(thisViewModel, (obj) => {
            //console.log('date_filter value changed!', obj);
            this.processPACSummaries();
        })

        this.app.registerActivityIdHandler("displayAdminAllPacsReport", (wc, cf) => {
            //create the object array for summary data
            this.all_pac_area_baseline_area = wc.getValue("pacAreaBaselineArea");
            this.all_pac_development_data = wc.getValue("developmentData");
            this.processPACSummaries();
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevRegistryAllPacsReport");
        });

        this.app.registerActivityIdHandler("displaycustomform_devReg", function CustomEventHandler(wc) {

            let selected_pac = wc.getValue("selected_pac");
            let pac_area = wc.getValue("pac_area");
            let baseline_area = wc.getValue("baseline_area");
            let pac_data = wc.getValue("report_final").features;
            let report_type = wc.getValue("report_type");
            let is_public = wc.getValue("public");
            let cached = wc.getValue("cached");

            thisViewModel.processPACReport(selected_pac, pac_area, baseline_area, pac_data, report_type, is_public, cached);
        });
            

        this._injectScript();
    }

    processPACSummaries(): void {
        let thisViewModel = this;
        let all_pacs = this.all_pac_area_baseline_area.features.map((feature) => {
            "baseline_data_area_acres,pac_area_acres,PAC_name"
            return {
                pac_name: feature.attributes["PAC_name"],
                pac_area_baseline: feature.attributes['baseline_data_area_acres'],
                pac_area: feature.attributes['pac_area_acres']
            }
        });

        let _all_pacs_summary = [];
        all_pacs.forEach((pac) => {
            //get total stats from cache
            let pac_data = this.all_pac_development_data.features.filter((feature) => {
                return pac.pac_name === feature.attributes["PAC_name"];
            });
            let all_pac_dev_area = 0;
            let all_pac_proj_dev_area = 0;
            let all_decade_dev_area = 0;
            let all_proj_decade_dev_area = 0;
            let filtered_dates_dev_area = 0;
            let filtered_dates_proj_dev_area = 0;
            pac_data.forEach((pd) => {
                switch (pd.attributes.stat) {
                    case 'all':
                        all_pac_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        break;
                    case 'projected_all':
                        all_pac_proj_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        break;
                    case 'decade':
                        all_decade_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        if (pd.attributes.clctn_dt >= this.date_filter.get()['min'] && pd.attributes.clctn_dt <= this.date_filter.get()['max']) {
                            filtered_dates_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        }
                        break;
                    case 'projected_decade':
                        all_proj_decade_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        if (pd.attributes.clctn_dt >= this.date_filter.get()['min'] && pd.attributes.clctn_dt <= this.date_filter.get()['max']) {
                            filtered_dates_proj_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                        }
                        break;
                    default:
                        break;
                }
            });
            let isCurrentReport = thisViewModel.selected_report_type.get() === 'Current';
            let _all_pac_dev_area = isCurrentReport ? all_pac_dev_area : all_pac_proj_dev_area;
            let _decade_pac_dev_area = isCurrentReport ? all_decade_dev_area : all_proj_decade_dev_area;
            let _filtered_data_dev_area = isCurrentReport ? filtered_dates_dev_area : filtered_dates_proj_dev_area;
            let pac_obj = {
                pac_name: pac.pac_name,
                pac_data: pac_data,
                pac_area_dbl: pac.pac_area,
                pac_area: thisViewModel.addCommas(pac.pac_area.toFixed(0)) + " acres",
                pac_baseline_area_dbl: pac.pac_area_baseline,
                show_date_range: thisViewModel.show_custom_date_range_data.get(),
                pac_area_baseline_area: thisViewModel.addCommas(pac.pac_area_baseline.toFixed(0)) + " acres",
                total_dev_percent: all_pac_dev_area ? (_all_pac_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "N/A",
                decade_dev_percent: all_decade_dev_area ? (_decade_pac_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "0%",
                filtered_date_percent: _filtered_data_dev_area ? (_filtered_data_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "0%",
            };
            _all_pacs_summary.push(pac_obj);
        });
        thisViewModel.all_pac_summary.set(_all_pacs_summary);
    }

    updateTableRow(table, stat_obj, pac_area_dbl) {
        let needToAdd = table.length === 0;
        if (table.length > 0) {
            //check if already added entry for category
            table.forEach((car) => {
                if (car.category === stat_obj.category) {
                    let combinedArea = car.area + stat_obj.area;
                    car.area = combinedArea;
                    car.area_formatted = this.addCommas(car.area.toFixed(0));
                    car.percent = combinedArea ? (car.area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                } else {
                    needToAdd = true;
                }
            });
        }
        if (needToAdd) {            
            table.push(stat_obj);
        }        
    }

    processPACReport(selected_pac, pac_area, baseline_area, pac_data, report_type, isPublic, cached, date_range?): void {
        let thisViewModel = this;

        let cat_area_rows = [];
        let dev_area_row = [];
        let baseline_row = [];
        let decade_area_row = [];
        let decade_cat_area_row = [];
        let proj_all_area_row = [];
        let proj_decade_area_row = [];
        let proj_decade_cat_area_row = [];
        let proj_cat_area_rows = [];
        let filtered_date_area_row = [];  
        let filtered_date_cat_area_row = []; 
        let filtered_date_proj_area_row = [];
        let filtered_date_proj_cat_area_row = []; 

        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevRegistryView");

        let pac_area_dbl = pac_area;
        thisViewModel.pac_area.set(thisViewModel.addCommas(pac_area_dbl.toFixed(0)) + " acres");
        
        thisViewModel.isCached.set(cached);
        // overall values
        thisViewModel.overall_cap_val.set("0%");
        thisViewModel.overall_projected_cap_val.set("0%");
        thisViewModel.overall_area_val.set("");
        // decade values
        thisViewModel.decade_cap_val.set("0%");
        thisViewModel.decade_projected_cap_val.set("0%");
        thisViewModel.decade_area_val.set("");
        // filtered data values
        thisViewModel.filtered_percent_val.set("0%");
        thisViewModel.filtered_date_area.set("None");
        thisViewModel.filtered_proj_percent_val.set("0%");
        thisViewModel.filtered_date_proj_area.set("None");        
        
        thisViewModel.has_current.set(false);
        thisViewModel.has_projected.set(false);
        //if cached and current, then means public view of cached results so midnight time
        //else current time
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
        thisViewModel.reportDate.set("Data current as of "
            + (thisViewModel.isCached.get() && report_type === "Current" && isPublic
                ? lastSunday.toLocaleDateString()
                : new Date().toLocaleString()));

        if (date_range) {
            thisViewModel.show_custom_date_range_data.set(true);
            thisViewModel.filtered_report_date_range.set(new Date(thisViewModel.date_filter.get()['min']).toLocaleDateString() + ' - ' + new Date(thisViewModel.date_filter.get()['max']).toLocaleDateString());
        }

        var statCategoryLables = ['categories', 'decade_categories', 'projected_categories', 'projected_decade_categories'];

        pac_data.forEach((_stat: any) => {
            let stat = _stat;
            let stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
            let stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
            let stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
            let stat_date = stat.attributes.clctn_dt;
            //let isStatCategory = false;
            let category = '';
            if (statCategoryLables.indexOf(stat.attributes.stat) !== -1) {
                if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                    //isStatCategory = true;
                    category = stat.attributes.category_merged || stat.attributes.category_m
                }
            } else {
                //isStatCategory = false;
                category = 'Total'
            }
            if (category !== '') {                
                let stat_obj = {                    
                    category: category,
                    area: stat_area,
                    area_formatted: stat_area_formatted,
                    percent: stat_percent
                };
                let stat_obj_date = {
                    category: category,
                    area: stat_area,
                    area_formatted: stat_area_formatted,
                    percent: stat_percent
                }
                let statLabel = stat.attributes.stat;
                let tableRows = statLabel === 'all'
                    ? dev_area_row
                    : statLabel === 'decade'
                        ? decade_area_row
                        : statLabel === 'categories'
                            ? cat_area_rows
                            : statLabel === 'decade_categories'
                                ? decade_cat_area_row
                                : statLabel === 'projected_categories'
                                    ? proj_cat_area_rows
                                    : statLabel === 'projected_decade_categories'
                                        ? proj_decade_area_row
                                        : statLabel === 'projected_all'
                                            ? proj_all_area_row
                                            : statLabel === 'projected_decade'
                                                ? proj_decade_area_row
                                                : [];                
                this.updateTableRow(tableRows, stat_obj, pac_area_dbl);
                if (['decade_categories', 'decade'].indexOf(statLabel) !== -1) {
                    if (stat_date >= this.date_filter.get()['min']
                        && stat_date <= this.date_filter.get()['max']) {
                        this.updateTableRow(statLabel === 'decade_categories'
                            ? filtered_date_cat_area_row
                            : filtered_date_area_row
                            , stat_obj_date, pac_area_dbl);
                    }                    
                } 
                if (['projected_decade_categories', 'projected_decade'].indexOf(statLabel) !== -1) {
                    if (stat_date >= this.date_filter.get()['min']
                        && stat_date <= this.date_filter.get()['max']) {
                        this.updateTableRow(statLabel === 'projected_decade_categories'
                            ? filtered_date_proj_cat_area_row
                            : filtered_date_proj_area_row
                            , stat_obj_date, pac_area_dbl);
                    }
                } 
            }            
        });

        if (dev_area_row.length > 0) {
            thisViewModel.has_current.set(report_type === 'Current');
            thisViewModel.overall_cap_val.set(dev_area_row[0].percent);
            thisViewModel.overall_area_val.set(dev_area_row[0].area_formatted + ' acres');
        }
        if (decade_area_row.length > 0) {
            thisViewModel.decade_cap_val.set(decade_area_row[0].percent);
            thisViewModel.decade_area_val.set(decade_area_row[0].area_formatted + ' acres');
        }
        if (filtered_date_area_row.length > 0) {
            thisViewModel.filtered_percent_val.set(filtered_date_area_row[0].percent);
            thisViewModel.filtered_date_area.set(filtered_date_area_row[0].area_formatted + ' acres');
        }
        if (proj_all_area_row.length > 0) {
            thisViewModel.has_projected.set(report_type === 'Projected');
            thisViewModel.overall_projected_cap_val.set(proj_all_area_row[0].percent);
            thisViewModel.overall_projected_area_val.set(proj_all_area_row[0].area_formatted + ' acres');
        }
        if (proj_decade_area_row.length > 0) {
            thisViewModel.has_projected.set(report_type === 'Projected');
            thisViewModel.decade_projected_cap_val.set(proj_decade_area_row[0].percent);
            thisViewModel.decade_projected_area_val.set(proj_decade_area_row[0].area_formatted + ' acres');
        }
        if (filtered_date_proj_area_row.length > 0) {
            thisViewModel.filtered_proj_percent_val.set(filtered_date_proj_area_row[0].percent);
            thisViewModel.filtered_date_proj_area.set(filtered_date_proj_area_row[0].area_formatted + ' acres');
        }

        thisViewModel.has_all.set(thisViewModel.has_current.get() && thisViewModel.has_projected.get());

        this.app.viewManager.getViewById("OE_SageGrouseDevRegistryView").title.set(thisViewModel.has_projected.get() ? "Estimated Development Impact Report" : "PAC Development Impact Report");

        baseline_row.push({
            category: 'Baseline developments',
            area: thisViewModel.addCommas(baseline_area.toFixed(0)),
            percent: (baseline_area / pac_area_dbl * 100).toFixed(2) + "%"
        });

        thisViewModel.pac_title.set(selected_pac + " PAC");
        thisViewModel.pac_title_projected.set(selected_pac + " PAC");
        thisViewModel.baseline_area.set(baseline_row[0].area + " acres");
        thisViewModel.baseline_percent.set(baseline_row[0].percent);

        //let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
        let cap_one_percent_tbl = decade_cat_area_row.concat(decade_area_row);
        thisViewModel.decade_tbl.set(cap_one_percent_tbl);
        thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);

        let filtered_date_tbl = filtered_date_cat_area_row.concat(filtered_date_area_row);
        thisViewModel.filtered_date_tbl.set(filtered_date_tbl);
        thisViewModel.show_filtered_date_tbl.set(filtered_date_tbl.length > 0 ? true : false);

        let filtered_date_proj_tbl = filtered_date_proj_cat_area_row.concat(filtered_date_proj_area_row);
        thisViewModel.filtered_date_proj_tbl.set(filtered_date_proj_tbl);
        thisViewModel.show_filtered_date_tbl.set(filtered_date_proj_tbl.length > 0 ? true : false);

        //let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
        let overall_cap_tbl = cat_area_rows.concat(dev_area_row);
        thisViewModel.overall_tbl.set(overall_cap_tbl);

        //let cap_one_percent_projected_tbl = proj_cat_area_rows.concat                    (proj_decade_area_row);
        let cap_one_percent_projected_tbl = proj_decade_cat_area_row.concat(proj_decade_area_row);
        thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
        thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);

        //let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
        let overall_cap_projected_tbl = proj_cat_area_rows.concat(proj_all_area_row);
        thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);
    }

    private _injectScript() {       
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/jQAllRangeSliders-min.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
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