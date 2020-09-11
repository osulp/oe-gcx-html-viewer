
// Module 'OE_SageGrouseDevRegistry'
        (function () {
var markup1 = '<div id=\'all-pac-reports-wrapper\'>    <fieldset>        <legend>Date Range</legend>        <div id=\'time-slider-wrapper\'>            <div id=\'preset-data-range-wrapper\'>                <center>                    <label for=\'date_range_selector\'>Choose pre-set date range</label>                    <select id=\'date_range_selector\' data-binding=\'{@source: preset_date_ranges}{@value: selected_preset_date_range}\'>                        <option data-binding=\'{@template-for: preset_date_ranges}{value: val}{@text: label}\' />                    </select>                </center>            </div>            <div class=\'container\'>                <div class=\'container-child\'>                    <h4>Start date:</h4>                    <input id=\'startDate\' style=\'width: 100%;\' />                </div>                <div class=\'container-child\'>                    <h4>End date:</h4>                    <input id=\'endDate\' style=\'width: 100%;\' />                </div>            </div>                    </div>    </fieldset>    <fieldset>        <legend>PAC Reports</legend>        <div class=\'report-type-wrapper\'>            <div><label for=\'report_type_selector\'>Report Type:</label></div>            <div>                <select id=\'report_type_selector\' data-binding=\'{@source: report_types}{@value: selected_report_type}\'>                    <option data-binding=\'{@template-for: report_types}{value: val}{@text: label}\' />                </select>            </div>        </div>        <div class=\'container\' data-binding=\'{@source: all_pac_summary}\'>            <div class=\'container-child pac_summary\' data-binding=\'{@template-for: all_pac_summary}{@event-onclick:showPACReport}\' title=\'Click to view details\'>                <div class=\'container\'>                    <div class=\'pac_title_summary\'>                        <span data-binding=\'{@text:pac_name}\'></span>                    </div>                    <div class=\'total_dev\'>                        <div>ALL</div>                        <div class=\'all_pac_percent\' data-binding=\'{@text:total_dev_percent}\'></div>                    </div>                    <div class=\'decade_dev\'>                        <div>DECADE</div>                        <div class=\'all_pac_percent\' data-binding=\'{@text:decade_dev_percent}\'></div>                    </div>                    <!--<div>                        <span>PAC Area:</span>                        <span data-binding=\'{@text:pac_area}\'></span>                    </div>                    <div>                        <span>Baseline area:</span>                        <span data-binding=\'{@text:pac_area_baseline_area}\'></span>                    </div>-->                </div>                <div data-binding=\'{@visible:show_date_range}\' class=\'selected_date_dev\'>                    <div>Selected Dates</div>                    <div class=\'all_pac_percent\' data-binding=\'{@text:filtered_date_percent}\'></div>                </div>            </div>        </div>    </fieldset></div>';
var markup2 = '<a href=\'#\'></a><div class=\'module workflow-form\' dir=\'ltr\'>    <!--<div id=\'report-date\' data-binding=\'{@text:reportDate}\'></div>-->    <form id=\'customForm\' title=\'Project Impact Report\'>        <div data-binding=\'{@visible:pac_intersect}\' class=\'form-container\'>            <div class=\'report_header\'>                <div class=\'pac_title\'>                    <!--<span>Report for:</span>-->                    <h2 data-binding=\'{@text: report_title}\'></h2>                    <!--<h4 data-binding=\'{@visible:has_proj_name}\'>(Includes developments in <span data-binding=\'{@text:dev_name}\'></span>)</h4>-->                    <h4>(Includes approved projects in any intersected PACs and only the selected project/development)</h4>                    <!--<h5 data-biding=\'{@visible:is_updated_development_area}\'>Showing updated area potential impact.</h5>-->                </div>                <div>                    <span>Total area of project/development: </span><span data-binding=\'{@text:proj_dev_area}\'></span><br />                    <span>Number of developments: </span><span data-binding=\'{@text:dev_num}\'></span><br />                    <span>Part of PAC(s): </span><span data-binding=\'{@text:pac_name_list}\'></span>                </div>                <!--<div class=\'project_wrapper\'>                    <span>Project area: </span><b data-binding=\'{@text:proj_dev_area}\'></b>                </div>-->            </div>            <div data-binding=\'{@source: proj_pac_report_data}\'>                <div class=\'summary-wrapper\' data-binding=\'{@template-for: proj_pac_report_data}\'>                    <h3>Summary of PAC Development</h3>                    <h3 data-binding=\'{@text:pac_name}\'></h3>                    <div data-biding=\'{@visible:is_updated_development_area}\' class=\'pac_sum_desc\'>(Includes approved and as-built projects in the PAC and only the selected project/development; no other in-review projects in are included)</div>                    <br />                    <div class=\'pac_area_wrapper\'>                        <span>Total area of PAC: </span>                        <b data-binding=\'{@text: pac_area}\'></b>                    </div>                    <div class=\'baseline_pac_wrapper\'>                        <span>Baseline developed area: <b data-binding=\'{@text:baseline_area}\'></b>, <b data-binding=\'{@text:baseline_percent}\'></b></span>                    </div>                    <br />                    <b data-binding=\'{@text: report_title}\'></b><b> Impact on PAC</b>                    <div class=\'project-impact-wrapper\'>                        <div>                            <span>Project Area in PAC:</span><br />                            <b data-binding=\'{@text:input_area_pac_area}\'></b>                        </div>                        <div>                            <span>Percent area of PAC:</span><br />                            <b data-binding=\'{@text:input_area_pac_percent}\'></b>                        </div>                    </div>                    <br />                    <div>                        <span><b>Total developed area: </b></span>                        <span data-binding=\'{@text: overall_area_val}\'></span>                        <span><b data-binding=\'{@text: overall_cap_val}\'></b></span>                    </div>                    <div class=\'notes\'>The total developed area is not allowed to exceed 3%.</div>                    <div>                        <span><b>New developed area in decade: </b></span>                        <span data-binding=\'{@text: decade_area_val}\'></span>                        <span><b data-binding=\'{@text: decade_cap_val}\'></b></span>                    </div>                    <div class=\'notes\'>The total developed area is not allowed to exceed 1% per decade.</div>                    <br />                </div>            </div>        </div>        <div data-binding=\'{@visible:no_pac_intersect}\' class=\'form-container\'>            <div class=\'report_header\'>                <div class=\'pac_title\'>                    <h2 data-binding=\'{@text: report_title}\'></h2>                    <h4>(This project/development does not intersect any of the PACs)</h4>                </div>            </div>            <h3>Project/Development Info</h3>            <div class=\'project-impact-wrapper\'>                <div>                    <span>Project Area:</span>                    <h2 data-binding=\'{@text:proj_dev_area}\'></h2>                </div>            </div>        </div>        <div>            <div style=\'text-align:right; width:100%; display:inline-block;\' class=\'form-btns\'>                <!--<button id=\'okBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:runNewReport}\'><< New Report</button>                <button id=\'okBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:getPDF}\'>Continue >></button>-->                <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>            </div>        </div>    </form></div>';
var markup3 = '<a href=\'#\'></a><div class=\'module workflow-form\' dir=\'ltr\'>    <div id=\'report-date\' data-binding=\'{@text:reportDate}\'></div>        <form data-binding=\'{@visible: has_projected}\' id=\'customForm\' title=\'Estimated Development Impact Report\'>        <div class=\'form-container\'>            <div class=\'report_header\'>                <div class=\'pac_title\'>                                        <h2 data-binding=\'{@text: pac_title_projected}\'></h2>                    <h4>(Includes permits in review)</h4>                </div>                <div class=\'pac_area_wrapper\'>                    <span>Total area of PAC: </span>                    <b data-binding=\'{@text: pac_area}\'></b>                </div>                <div class=\'baseline_pac_wrapper\'>                    <span>Baseline developed area: <b data-binding=\'{@text:baseline_area}\'></b>, <b data-binding=\'{@text:baseline_percent}\'></b></span>                </div>            </div>            <div class=\'summary-wrapper\'>                <h3>Summary of PAC Development</h3>                <h4>(Includes Permits In-Review)</h4>                <div>                    <span><b>Total developed area: </b></span>                    <span data-binding=\'{@text: overall_projected_area_val}\'></span>                    <span><b data-binding=\'{@text: overall_projected_cap_val}\'></b></span>                </div>                <div class=\'notes\'>The total developed area is not allowed to exceed 3%.</div>                <div>                    <span><b>New developed area in decade: </b></span>                    <span data-binding=\'{@text: decade_projected_area_val}\'></span>                    <span><b data-binding=\'{@text: decade_projected_cap_val}\'></b></span>                </div>                <div class=\'notes\'>The total developed area is not allowed to exceed 1% per decade.</div>                <div data-binding=\'{@visible:show_custom_date_range_data}\'>                    <span><b>Developed area between: </b><small><em data-binding=\'{@text:filtered_report_date_range}\'></em></small></span>                    <br />                    <div class=\'notes\'>                        <span data-binding=\'{@text: filtered_date_proj_area}\'></span>                        <span><b data-binding=\'{@text: filtered_proj_percent_val}\'></b></span>                    </div>                </div>            </div>            <div class=\'details\'>                <div class=\'notes\'>                    <em>NOTE: Values include development that is in-review, approved, and as-built.</em>                </div>                <hr />                <h3>Total developed area</h3>                <h4>(including permits in review)</h4>                <table>                    <thead>                        <tr>                            <th align=\'center\'>Development Type</th>                            <th align=\'center\'>Acres</th>                            <th align=\'center\'>Percent</th>                        </tr>                    </thead>                    <tbody data-binding=\'{@source: overall_projected_tbl}\'>                        <tr data-binding=\'{@template-for: overall_projected_tbl}\'>                            <td>                                <span data-binding=\'{@text:category}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:area_formatted}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:percent}\'></span>                            </td>                        </tr>                    </tbody>                </table>                <br />                <div class=\'cap_val\'>                    <span>Percent of total developed area <b>including permits in review</b> (limited to 3%)</span>                    <h2 data-binding=\'{@text:overall_projected_cap_val}\'></h2>                </div>                <br />                <hr />                <h3>New developed area in decade</h3>                <h4>(including permits in review)</h4>                <table data-binding=\'{@visible: show_decade_tbl_projected}\'>                    <thead>                        <tr>                            <th align=\'center\'>Development Type</th>                            <th align=\'center\'>Acres</th>                            <th align=\'center\'>Percent</th>                        </tr>                    </thead>                    <tbody data-binding=\'{@source: decade_projected_tbl}\'>                        <tr data-binding=\'{@template-for: decade_projected_tbl}\'>                            <td>                                <span data-binding=\'{@text:category}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:area_formatted}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:percent}\'></span>                            </td>                        </tr>                    </tbody>                </table>                <br />                <div class=\'cap_val\'>                    <span>Percent of new developed area in decade, <b>including permits in review</b> (limited to 1%)</span>                    <h2 data-binding=\'{@text:decade_projected_cap_val}\'></h2>                </div>                <div class=\'notes\'>                    <em>NOTE: Decadal time period is August 13, 2015 through August 12, 2025</em>                </div>                   <div data-binding=\'{@visible:show_custom_date_range_data}\'>                    <br />                    <hr />                    <h3>New development: <small><em data-binding=\'{@text:filtered_report_date_range}\'></em></small></h3>                    <table data-binding=\'{@visible: show_filtered_date_tbl}\'>                        <thead>                            <tr>                                <th align=\'center\'>Development Type</th>                                <th align=\'center\'>Acres</th>                                <th align=\'center\'>Percent</th>                            </tr>                        </thead>                        <tbody data-binding=\'{@source: filtered_date_proj_tbl}\'>                            <tr data-binding=\'{@template-for: filtered_date_proj_tbl}\'>                                <td>                                    <span data-binding=\'{@text:category}\'></span>                                </td>                                <td>                                    <span data-binding=\'{@text:area_formatted}\'></span>                                </td>                                <td>                                    <span data-binding=\'{@text:percent}\'></span>                                </td>                            </tr>                        </tbody>                    </table>                    <br />                    <div class=\'cap_val\'>                        <span>Percent of new developed area between <em data-binding=\'{@text:filtered_report_date_range}\'></em></span>                        <h2 data-binding=\'{@text:filtered_proj_percent_val}\'></h2>                    </div>                </div>            </div>            <div style=\'text-align:right; width:100%; display:inline-block;\' class=\'form-btns\'>                                <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>            </div>        </div>    </form>    <form data-binding=\'{@visible: has_current}\' id=\'customForm\' title=\'PAC Development Report\'>        <div data-binding=\'{@visible: show_all_pac_links}\'>            Yep!        </div>         <div class=\'form-container\'>            <div class=\'report_header\'>                <div class=\'pac_title\'>                                        <h2 data-binding=\'{@text: pac_title}\'></h2>                </div>                <div class=\'pac_area_wrapper\'>                    <span>Total area of PAC: </span>                    <b data-binding=\'{@text: pac_area}\'></b>                </div>                <div class=\'baseline_pac_wrapper\'>                    <span>Baseline developed area: <b data-binding=\'{@text:baseline_area}\'></b>, <b data-binding=\'{@text:baseline_percent}\'></b></span>                </div>            </div>            <div class=\'summary-wrapper\'>                <h2>Summary of PAC Development</h2>                <div>                    <span><b>Total developed area: </b></span>                    <span data-binding=\'{@text: overall_area_val}\'></span>                    <span><b data-binding=\'{@text: overall_cap_val}\'></b></span>                </div>                <div class=\'notes\'>The total developed area is not allowed to exceed 3%.</div>                <div>                    <span><b>New developed area in decade: </b></span>                    <span data-binding=\'{@text: decade_area_val}\'></span>                    <span><b data-binding=\'{@text: decade_cap_val}\'></b></span>                </div>                <div class=\'notes\'>The total developed area is not allowed to exceed 1% per decade.</div>                <div data-binding=\'{@visible:show_custom_date_range_data}\'>                    <span><b>Developed area between: </b><small><em data-binding=\'{@text:filtered_report_date_range}\'></em></small></span>                    <br />                    <div class=\'notes\'>                        <span data-binding=\'{@text: filtered_date_area}\'></span>                        <span><b data-binding=\'{@text: filtered_percent_val}\'></b></span>                    </div>                                    </div>            </div>                        <hr />            <div class=\'details\'>                <h3>Total developed area</h3>                <table>                    <thead>                        <tr>                            <th align=\'center\'>Development Type</th>                            <th align=\'center\'>Acres</th>                            <th align=\'center\'>Percent</th>                        </tr>                    </thead>                    <tbody data-binding=\'{@source: overall_tbl}\'>                        <tr data-binding=\'{@template-for: overall_tbl}\'>                            <td>                                <span data-binding=\'{@text:category}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:area_formatted}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:percent}\'></span>                            </td>                        </tr>                    </tbody>                </table>                <br />                <div class=\'cap_val\'>                    <span>Percent of total developed area (limited to 3%)</span>                    <h2 data-binding=\'{@text:overall_cap_val}\'></h2>                </div>                <br />                <hr />                <h3>New developed area in decade</h3>                <table data-binding=\'{@visible: show_decade_tbl_current}\'>                    <thead>                        <tr>                            <th align=\'center\'>Development Type</th>                            <th align=\'center\'>Acres</th>                            <th align=\'center\'>Percent</th>                        </tr>                    </thead>                    <tbody data-binding=\'{@source: decade_tbl}\'>                        <tr data-binding=\'{@template-for: decade_tbl}\'>                            <td>                                <span data-binding=\'{@text:category}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:area_formatted}\'></span>                            </td>                            <td>                                <span data-binding=\'{@text:percent}\'></span>                            </td>                        </tr>                    </tbody>                </table>                <br />                <div class=\'cap_val\'>                    <span>Percent of new developed area in decade (limited to 1%)</span>                    <h2 data-binding=\'{@text:decade_cap_val}\'></h2>                </div>                <div class=\'notes\'>                    <em>NOTE: Decadal time period is August 13, 2015 through August 12, 2025</em>                </div>                  <div data-binding=\'{@visible:show_custom_date_range_data}\'>                    <br />                    <hr />                    <h3>New development: <small><em data-binding=\'{@text:filtered_report_date_range}\'></em></small></h3>                    <table data-binding=\'{@visible: show_filtered_date_tbl}\'>                        <thead>                            <tr>                                <th align=\'center\'>Development Type</th>                                <th align=\'center\'>Acres</th>                                <th align=\'center\'>Percent</th>                            </tr>                        </thead>                        <tbody data-binding=\'{@source: filtered_date_tbl}\'>                            <tr data-binding=\'{@template-for: filtered_date_tbl}\'>                                <td>                                    <span data-binding=\'{@text:category}\'></span>                                </td>                                <td>                                    <span data-binding=\'{@text:area_formatted}\'></span>                                </td>                                <td>                                    <span data-binding=\'{@text:percent}\'></span>                                </td>                            </tr>                        </tbody>                    </table>                    <br />                    <div class=\'cap_val\'>                        <span>Percent of new developed area between <em data-binding=\'{@text:filtered_report_date_range}\'></em></span>                        <h2 data-binding=\'{@text:filtered_percent_val}\'></h2>                    </div>                </div>            </div>            <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>                <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>            </div>        </div>    </form></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryAllPacsReport": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myWorkflowContext;
    var OE_SageGrouseDevRegistryAllPacsReport = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryAllPacsReport, _super);
        function OE_SageGrouseDevRegistryAllPacsReport(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.cancelForm = function (event, element, context) {
                myWorkflowContext.setValue("finalFormBtn", 'Close');
                myWorkflowContext.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryAllPacsReport");
                return true;
            };
            return _this;
        }
        OE_SageGrouseDevRegistryAllPacsReport.prototype.activated = function () {
            var _this = this;
            var thisScope = this;
            function startChange() {
                var startDate = thisScope.startDateElem.value(), endDate = thisScope.endDateElem.value();
                if (startDate) {
                    startDate = new Date(startDate);
                    startDate.setDate(startDate.getDate());
                    thisScope.endDateElem.min(startDate);
                }
                else if (endDate) {
                    thisScope.startDateElem.max(new Date(endDate));
                }
                else {
                    endDate = new Date();
                    thisScope.startDateElem.max(endDate);
                    thisScope.endDateElem.min(endDate);
                }
                thisScope.viewModel.selected_preset_date_range.set('custom');
                thisScope.viewModel.date_filter.set({
                    min: thisScope.startDateElem.value(),
                    max: thisScope.endDateElem.value()
                });
            }
            function endChange() {
                var endDate = thisScope.endDateElem.value(), startDate = thisScope.startDateElem.value();
                if (endDate) {
                    endDate = new Date(endDate);
                    endDate.setDate(endDate.getDate());
                    thisScope.startDateElem.max(endDate);
                }
                else if (startDate) {
                    thisScope.endDateElem.min(new Date(startDate));
                }
                else {
                    endDate = new Date();
                    thisScope.startDateElem.max(endDate);
                    thisScope.endDateElem.min(endDate);
                }
                thisScope.viewModel.selected_preset_date_range.set('custom');
                thisScope.viewModel.date_filter.set({
                    min: thisScope.startDateElem.value(),
                    max: thisScope.endDateElem.value()
                });
            }
            this.startDateElem = $("#startDate").kendoDatePicker({
                change: startChange,
                value: new Date(2015, 7, 13)
            }).data("kendoDatePicker");
            this.endDateElem = $("#endDate").kendoDatePicker({
                change: endChange,
                value: new Date()
            }).data("kendoDatePicker");
            this.startDateElem.max(this.endDateElem.value());
            this.endDateElem.min(this.startDateElem.value());
            this.viewModel.selected_preset_date_range.bind(this.viewModel, function (selectedDateRange) {
                var minDate;
                var maxDate;
                _this.viewModel.show_custom_date_range_data.set(true);
                if (selectedDateRange !== 'custom') {
                    switch (selectedDateRange) {
                        case 'thisYear':
                            minDate = new Date(new Date().getFullYear(), 0, 1);
                            maxDate = new Date();
                            break;
                        case 'previousYear':
                            minDate = new Date((new Date().getFullYear() - 1), 0, 1);
                            maxDate = new Date(new Date().getFullYear() - 1, 11, 31);
                            break;
                        case 'decade':
                        default:
                            minDate = new Date(2015, 7, 13);
                            maxDate = new Date();
                            _this.viewModel.show_custom_date_range_data.set(false);
                            break;
                    }
                    thisScope.viewModel.date_filter.set({
                        min: minDate,
                        max: maxDate
                    });
                }
            });
            this.viewModel.date_filter.bind(this.viewModel, function (dateFilter) {
                _this.startDateElem.value(dateFilter.min);
                _this.endDateElem.value(dateFilter.max);
            });
            this.viewModel.selected_report_type.bind(this.viewModel, function (selectedReportType) {
                _this.viewModel.processPACSummaries();
            });
        };
        OE_SageGrouseDevRegistryAllPacsReport.prototype.showPACReport = function (evt, el, ctx) {
            this.viewModel.processPACReport(ctx.pac_name, ctx.pac_area_dbl, ctx.pac_baseline_area_dbl, ctx.pac_data, this.viewModel.selected_report_type.get(), true, true, this.viewModel.show_custom_date_range_data.get());
        };
        return OE_SageGrouseDevRegistryAllPacsReport;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseDevRegistryAllPacsReport = OE_SageGrouseDevRegistryAllPacsReport;
});

},
"geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase", "geocortex/infrastructure/GraphicUtils"], function (require, exports, ModuleBase_1, GraphicUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SageGrouseDevRegistryModule = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryModule, _super);
        function OE_SageGrouseDevRegistryModule(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this._projNameUpdated = false;
            _this.devSubTypesTable = {};
            // When the layer list initializes we can grab a reference to the layer list object and save it for later.
            // We'll need this to add our custom layer to the layer list.
            _this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(_this, function (sender) {
                // look for tables
                _this.layerList = sender;
                if (_this.app.site.principal.isAuthenticated) {
                    _this._getDevSubTypes();
                }
            });
            return _this;
        }
        OE_SageGrouseDevRegistryModule.prototype.initialize = function (config) {
            var _this = this;
            //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            this._layerFilters = config.layerFilters;
            this._adminGroupID = config.adminGroupID;
            this._lineBufferCategories = config.lineBufferCategories;
            this._lineBufferSubCategories = config.lineBufferSubCats;
            this._adminHomePanelContent = config.adminHomePanelContent;
            this._productionAgolUrl = config.productionAgolUrl;
            this._devAgolUrl = config.devAgolUrl;
            this._publicViewerTitle = config.publicViewerTitle || "Sage-Grouse Development Registry Viewer";
            this._editorViewerTitle = config.editorViewerTitle || "Sage-Grouse Development Registry Editor";
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args);
                });
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._getDevSubTypes = function () {
            var _this = this;
            var devTypeTableURL;
            var devSubTypeTableURL;
            this.layerList.mapInfo.serviceLayers.forEach(function (sl) {
                if (sl.displayName === "Development Types") {
                    devTypeTableURL = sl.serviceLayer.url;
                    _this.devRegTablesUrl = sl.gcxMapService.serviceUrl;
                }
                if (sl.displayName === "Development Subtypes") {
                    devSubTypeTableURL = sl.serviceLayer.url;
                }
                if (sl.displayName === "All developments") {
                    _this.devRegSrvcUrl = sl.gcxMapService.serviceUrl;
                    _this.devRegToken = sl.gcxMapService.serviceToken;
                    _this.devRegAgolSrvcUrl = _this.app.site.url.match('dev_reg_dev')
                        ? 'dev' // this._devAgolUrl
                        : 'prod'; // this._productionAgolUrl;
                    _this.devRegUnbuffLineSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/1");
                    _this.devRegVersionSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/2");
                    _this.devRegProjectsSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/3");
                }
            });
            // add query parameters to base urls
            //let query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
            var query_params = '/query?where=1%3D1&outFields=*&f=json&token=';
            var devTypeTableURL_query = devTypeTableURL.split('?token=')[0]
                + query_params
                + devTypeTableURL.split('?token=')[1];
            var devSubTypeTableURL_query = devSubTypeTableURL.split('?token=')[0]
                + query_params
                + devSubTypeTableURL.split('?token=')[1];
            $.when($.ajax(devTypeTableURL_query), $.ajax(devSubTypeTableURL_query))
                .done(function (dtt, dstt) {
                var devTypes = [];
                var devSubTypes = [];
                if (dtt.length) {
                    devTypes = JSON.parse(dtt[0]).features
                        ? JSON.parse(dtt[0]).features
                        : [];
                }
                if (dstt.length) {
                    devSubTypes = JSON.parse(dstt[0]).features
                        ? JSON.parse(dstt[0]).features
                        : [];
                }
                devTypes.forEach(function (dt) {
                    _this.devSubTypesTable[dt.attributes["Development_Type"]] = {
                        id: dt.attributes["Development_Type_ID"],
                        subtypes: devSubTypes
                            .filter(function (dst) {
                            return dst.attributes["Development_Type_ID"] === dt.attributes["Development_Type_ID"];
                        })
                            .map(function (dstm) {
                            return dstm.attributes["Development_Subtype"];
                        })
                    };
                });
            }).fail(function (err) {
                console.log('fail', err);
            });
        };
        OE_SageGrouseDevRegistryModule.prototype._handleDevTypeChange = function (args) {
            if (args) {
                var editForm = this.app.viewManager.getViewById("FeatureEditingContainerView").childRegions[0].views.filter(function (v) { return v.id === 'EditorView'; });
                if (editForm.length > 0) {
                    var all_fields = editForm[0].viewModel.form.value["all_fields"]
                        ? editForm[0].viewModel.form.value["all_fields"]
                        : editForm[0].viewModel.form.value.fields.getItems();
                    var filtered_attr = this._processAttributeFilter(all_fields).sort();
                    try {
                        editForm[0].viewModel.form.value.fields.set(filtered_attr);
                    }
                    catch (ex) {
                        console.log(ex.message);
                    }
                }
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._handleSubCatChange = function (args) {
            if (args) {
                //if (this._lineBufferCategories.indexOf(this._activeFeature.attributes.dst_cat) !== -1) {
                this._tempSubCat = args;
                if (this._lineBufferSubCategories.indexOf(args) !== -1) {
                    var workflowArgs = {};
                    workflowArgs["development_sub_category"] = args;
                    workflowArgs["development_voltage"] = this._activeFeature.attributes.vltg;
                    this._runRebufferWorkflow(workflowArgs);
                }
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._handleVoltageChange = function (args) {
            var subcat = this._tempSubCat ? this._tempSubCat : this._activeFeature.attributes.subcat;
            if (args && this._lineBufferSubCategories.indexOf(subcat) !== -1) {
                var workflowArgs = {};
                workflowArgs["development_sub_category"] = this._activeFeature.attributes.subcat;
                workflowArgs["development_voltage"] = args;
                this._runRebufferWorkflow(workflowArgs);
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._handleProjNameChange = function (args) {
            console.log('proj name changed', args);
            this._projNameUpdated = true;
        };
        OE_SageGrouseDevRegistryModule.prototype._runRebufferWorkflow = function (workflowArgs) {
            //get token to unsubscribe from GeometryEditInvokedEvent since it causes the draw/upload request.
            var subscription_token = this["eventSubscriptions"].filter(function (sub) { return sub.event.name === "GeometryEditInvokedEvent"; }).length > 0
                ? this["eventSubscriptions"].filter(function (sub) { return sub.event.name === "GeometryEditInvokedEvent"; })[0].token
                : '';
            if (subscription_token !== '') {
                this.app.eventRegistry.event("GeometryEditInvokedEvent").unsubscribe(subscription_token);
            }
            workflowArgs["workflowId"] = "rebuffer_feature";
            workflowArgs["development_category"] = this._activeFeature.attributes.dst_cat;
            workflowArgs["or_dev_reg_id"] = this._activeFeature.attributes.or_dev_reg_id;
            workflowArgs["dev_reg_srvc_url"] = this.devRegUnbuffLineSrvcUrl;
            workflowArgs["dev_reg_srvc_token"] = this.devRegToken;
            this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
            this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, this._handleGeometryEditInvokeEvent);
        };
        OE_SageGrouseDevRegistryModule.prototype._subscribeToValueChange = function (f, handlerFunction) {
            if (!f.value.bindingEvent.isPublishing) {
                var isSubscribed = false;
                for (var subscription in f.value.bindingEvent.subscriptions) {
                    isSubscribed = f.value.bindingEvent.subscriptions[subscription].scope.id
                        ? f.value.bindingEvent.subscriptions[subscription].scope.id === "module-Custom-DevelopmentRegistry"
                            ? true
                            : isSubscribed
                        : isSubscribed;
                }
                if (!isSubscribed) {
                    f.value.bindingEvent.subscribe(this, handlerFunction);
                }
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._processAttributeFilter = function (attributes) {
            var _this = this;
            var layerFilters = this._layerFilters;
            if (attributes.length > 0) {
                var devType_1 = attributes.filter(function (f) { return f.name.value === 'dst_cat'; }).length > 0 ? attributes.filter(function (f) { return f.name.value === 'dst_cat'; })[0].value.value : '';
                if (devType_1 !== '') {
                    var filteredFields = attributes.filter(function (f) {
                        if (f.name.value === 'dst_cat' && f.valueOptions) {
                            //f.value.bindingEvent.publish();
                            if (!f.value.bindingEvent.isPublishing) {
                                f.value.bindingEvent.subscribe(_this, _this._handleDevTypeChange);
                            }
                            //function compare(a, b) {
                            //    if (a.name < b.name)
                            //        return -1;
                            //    if (a.name > b.name)
                            //        return 1;
                            //    return 0;
                            //}
                            f.valueOptions.value.sort(function (a, b) {
                                if (a.name < b.name)
                                    return -1;
                                if (a.name > b.name)
                                    return 1;
                                return 0;
                            });
                        }
                        if (f.name.value === 'subcat' && f.valueOptions) {
                            if (_this.devSubTypesTable) {
                                var filteredCodedValues_1 = [];
                                f.domain.codedValues.forEach(function (cv) {
                                    if (devType_1) {
                                        if (_this.devSubTypesTable[devType_1].subtypes.indexOf(cv.name) !== -1) {
                                            filteredCodedValues_1.push(cv);
                                        }
                                    }
                                    else {
                                        filteredCodedValues_1.push(cv);
                                    }
                                });
                                f.valueOptions.value = filteredCodedValues_1;
                            }
                            _this._subscribeToValueChange(f, _this._handleSubCatChange);
                        }
                        if (f.name.value === 'or_dev_reg_proj_id') {
                            //if (f.readOnly) {
                            //    f.readOnly.set(true);
                            //}
                            _this._subscribeToValueChange(f, _this._handleProjNameChange);
                        }
                        if (f.name.value === 'vltg' && f.valueOptions) {
                            f.displayName.set("Voltage *");
                            f.required.set(true);
                            _this._subscribeToValueChange(f, _this._handleVoltageChange);
                        }
                        //get default plus and devType specific attributes for display
                        var _filteredAttr = layerFilters['Default'] ? layerFilters['Default'] : [];
                        if (layerFilters[devType_1]) {
                            _filteredAttr = _filteredAttr.concat(layerFilters[devType_1]);
                        }
                        return _filteredAttr.indexOf(f.name.value) !== -1;
                        //return layerFilters[devType] ? layerFilters[devType].indexOf(f.name.value) !== -1 : true;
                    });
                    return filteredFields;
                }
            }
            else {
                return [];
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._handleGeometryEditInvokeEvent = function (args) {
            //close map tip
            this.app.commandRegistry.commands["HideMapTips"].execute();
            //this.app.commandRegistry.commands["EnableMapTips"].execute();
            var thisScope = this;
            //check if linear feature and if so send to workflow for digitize, else can digitize on map in context
            var isLinear = this._lineBufferCategories.indexOf(args.attributes["dst_cat"]) !== -1;
            //this.app.commandRegistry.commands["MeasureArea"].execute(args.geometry);
            this.app.commandRegistry.commands["Confirm"].execute("Would you like to upload a shapefile(zipped) or use the map to modify the shape of this development?", "Upload Shapefile or use map?", function (result) {
                if (result || isLinear) {
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "add_edit_dev_features";
                    workflowArgs["srvc_url"] = thisScope.devRegSrvcUrl;
                    workflowArgs["srvc_token"] = thisScope.devRegToken;
                    workflowArgs["workflow_action"] = isLinear
                        ? result
                            ? "Upload"
                            : "Digitize"
                        : "Upload";
                    workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                    thisScope.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    //$('.button:contains("Save Geometry")').click();
                    thisScope.app.commandRegistry.commands["saveAndCloseFeatureEditing"].execute();
                    //$('.button:contains("Save")').click();
                    args.hide();
                }
            });
            $(".confirm .button:contains('OK')").html("Upload New Shape");
            $(".confirm .button:contains('Cancel')").html("Use Map");
            //var isUpload = false;
        };
        OE_SageGrouseDevRegistryModule.prototype._handleDisplayModifications = function (isAuthenticated) {
            $(".banner-title").html(isAuthenticated ? this._editorViewerTitle : this._publicViewerTitle);
            if ($(window).width() < 1200) {
                //$(".banner-title").css("fontSize","1.5em");
            }
            $(".panel-filter-widget").css("display", "none");
            $(".layer-list").css("top", "0.5em");
            $(".sign-in button").html("Editor Sign-in");
        };
        OE_SageGrouseDevRegistryModule.prototype._handleMeasureArea = function () {
            var clonedGraphics = GraphicUtils_1.getGraphicsLayer("editor_clone_layer", false, this.app);
            var editingLayer = GraphicUtils_1.getGraphicsLayer("editing_layer", false, this.app);
            clonedGraphics = editingLayer || clonedGraphics;
            //hide the scale and resize svg since the measuring overaly does not sync with those events...
            //$("#map_graphics_layer path").text("");
            if (clonedGraphics.graphics.length > 0) {
                if (this._tempCloneEditGeometry) {
                    this.app.commandRegistry.commands["DeleteMeasurement"].execute(this._tempCloneEditGeometry);
                    $("#Drawings_measurement_layer").text("");
                }
                this._tempCloneEditGeometry = clonedGraphics.graphics[0].geometry;
                this.app.commandRegistry.commands["MeasureArea"].execute(clonedGraphics.graphics[0]);
            }
        };
        OE_SageGrouseDevRegistryModule.prototype.onQueryResult = function (features, fieldName) {
            if (features.length > 0) {
                this.app.commandRegistry.command("StartEditingFeature").execute(features[0]);
            }
        };
        OE_SageGrouseDevRegistryModule.prototype._injectScript = function () {
            var thisContext = this;
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
        };
        OE_SageGrouseDevRegistryModule.prototype._onSiteInitialized = function (site) {
            var _this = this;
            //this._injectScript();
            var thisModel = this;
            var isAuthenticated = this.app.site.principal.isAuthenticated;
            this._handleDisplayModifications(isAuthenticated);
            var isAdmin = this.app.site.principal.identities.length > 0
                ? this.app.site.principal.identities[0].claims.filter(function (c) { return c.value === _this._adminGroupID; }).length > 0
                : false;
            this.app.commandRegistry.command("oe_assign_lg_scale").register(this, function () {
                var workflowArgs = {};
                workflowArgs["workflowId"] = "assignLgScaleSdartt";
                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
            }, function () {
                return isAdmin;
            });
            this.app.commandRegistry.command("oe_get_all_pac_reports_admin").register(this, function () {
                var workflowArgs = {};
                workflowArgs["workflowId"] = "get_all_pac_reports";
                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
            }, function () {
                return isAdmin;
            });
            this.app.commandRegistry.command("oe_dev_reg_user_guide").register(this, function (url) {
                _this.app.commandRegistry.commands["OpenWebPage"].execute(url);
            }, function () {
                return isAuthenticated;
            });
            this.app.commandRegistry.commands["SetMeasurementUnits"].execute("feet", "acre");
            if (isAuthenticated) {
                //set home panel content
                try {
                    //this.app.viewManager.getViewById("InfoView").viewModel.content.set(decodeURIComponent(this._adminHomePanelContent));
                    this.app.commandRegistry.commands["ShowHomePanel"].execute();
                    //Add command to show the edit form for a newly added/edit requested feature in add_edit_dev_features workflow
                    this.app.commandRegistry.command("showFeatureEditForm").register(this, function (objectid) {
                        var collection = this.app.featureSetManager.getCollectionById("add_feature");
                        if (collection) {
                            var feature = null;
                            if (collection.featureSets.length() > 0) {
                                collection.featureSets.value.forEach(function (fs) {
                                    fs.features.value.forEach(function (f) {
                                        var objid = f.attributes.value.filter(function (a) {
                                            return a.name.value === "OBJECTID";
                                        });
                                        feature = objid[0].value.value.toString() === objectid ? f : feature;
                                    });
                                });
                                if (!feature && collection.featureSets.getAt(0).features.length() > 0) {
                                    feature = collection.featureSets.getAt(0).features.getAt(0);
                                }
                                this.app.commandRegistry.command("StartEditingFeature").execute(feature);
                            }
                        }
                    });
                    this.app.commandRegistry.command("showFeatureEditFormSDARTT").register(this, function (objectid) {
                        var collection = this.app.featureSetManager.getCollectionById("selected_sdartt");
                        if (collection) {
                            var feature = null;
                            if (collection.featureSets.length() > 0) {
                                collection.featureSets.value.forEach(function (fs) {
                                    fs.features.value.forEach(function (f) {
                                        var objid = f.attributes.value.filter(function (a) {
                                            return a.name.value === "report_id";
                                        });
                                        feature = objid[0].value.value.toString() === objectid ? f : feature;
                                    });
                                });
                                if (!feature && collection.featureSets.getAt(0).features.length() > 0) {
                                    feature = collection.featureSets.getAt(0).features.getAt(0);
                                }
                                this.app.commandRegistry.command("StartEditingFeature").execute(feature);
                            }
                        }
                    });
                    //Add project impact report to map tip links if Oregon Development Projects
                    this.app.commandRegistry.command("oe_project_report").register(this, function (graphic) {
                        var dev_reg_id = "";
                        graphic.attributes.value.forEach(function (attr) {
                            if (attr.displayName.value === "or_dev_reg_id") {
                                dev_reg_id = attr.value.value;
                            }
                        });
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "map_tip_project_impact_report";
                        workflowArgs["_devRegSrvc"] = _this.devRegSrvcUrl;
                        workflowArgs["_devRegToken"] = _this.devRegToken;
                        workflowArgs["_devRegAgolSrvc"] = _this.devRegAgolSrvcUrl;
                        workflowArgs["_or_dev_reg_id"] = dev_reg_id;
                        //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                        _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    }, function (graphic) {
                        //can execute?
                        return graphic.layer.displayName === "Oregon Development Projects";
                    });
                    //Add Delete Measurement to map tip only for Oregon Development Projects features
                    this.app.commandRegistry.command("oe_delete_measurement").register(this, function (graphic) {
                        _this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.esriFeature.value);
                        var measureGraphic = GraphicUtils_1.getGraphicsLayer("Drawings_measurement", false, _this.app);
                        if (measureGraphic) {
                            if (measureGraphic.graphics.length > 0) {
                                _this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureGraphic.graphics[0].geometry);
                            }
                        }
                        $("#Drawings_measurement_layer").text("");
                        _this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                    }, function (graphic) {
                        //can execute?
                        var canShow = false;
                        var measureLayer = GraphicUtils_1.getGraphicsLayer("Drawings_measurement", false, _this.app);
                        if (measureLayer) {
                            canShow = measureLayer.graphics.length > 0;
                        }
                        return graphic.layer.displayName === "Oregon Development Projects" && canShow;
                    });
                    //Add Measure Area to map tip only for Oregon Development Projects features
                    this.app.commandRegistry.command("oe_measurement_area").register(this, function (graphic) {
                        //var thisScope = this;
                        //window.setTimeout(() => {
                        //    thisScope.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);
                        //}, 1000);
                        //$(".list-menu-button:contains('Delete Measurement')").css("display", "block");
                        _this.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);
                    }, function (graphic) {
                        //can execute?
                        return graphic.layer.displayName === "Oregon Development Projects";
                    });
                    //Runs workflow add_edit_dev_features to walk through adding or editing a develoment
                    this.app.commandRegistry.command("runAddEditDevFeatures").register(this, function () {
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "add_edit_dev_features";
                        workflowArgs["site_uri"] = this.app.site.originalUrl + '/map?f=json';
                        workflowArgs["srvc_url"] = this.devRegSrvcUrl;
                        workflowArgs["srvc_token"] = this.devRegToken;
                        workflowArgs["srvc_tables_url"] = this.devRegTablesUrl;
                        workflowArgs["dev_reg_agol_srvc"] = this.devRegAgolSrvcUrl;
                        //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                    });
                    this.app.commandRegistry.command("saveAndCloseFeatureEditing").register(this, function () {
                        try {
                            $('.button:contains("Save")').click();
                        }
                        catch (ex) {
                            console.log(ex.message);
                        }
                    });
                    //EVENTS SUBSCRIPTIONS///
                    this.app.eventRegistry.event("MeasurementMarkupAdded").subscribe(this, function (sender) {
                        _this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                    });
                    this.app.eventRegistry.event("GraphicVertexAddedEvent").subscribe(this, function (sender, a, b, c) {
                        console.log('graphic vertex added event', sender);
                    });
                    this.app.eventRegistry.event("GraphicDrawCompletedEvent").subscribe(this, function (sender) {
                        if (!_this.app.toolRegistry.getActiveTool()) {
                            _this.app.commandRegistry.commands[["polyline", "line"].indexOf(sender.type) !== -1 ? "MeasureDistance" : "MeasureArea"].execute(sender);
                            console.log('graphic drawn', sender);
                        }
                    });
                    this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, function (sender) {
                        if (!_this.app.toolRegistry.getActiveTool()) {
                            var measureLayer = GraphicUtils_1.getGraphicsLayer("Drawings_measurement", false, _this.app);
                            if (measureLayer) {
                                if (measureLayer.graphics.length > 0) {
                                    _this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureLayer.graphics[0].geometry);
                                }
                            }
                        }
                    });
                    this.app.eventRegistry.event("GeometryChangedEvent").subscribe(this, function (sender) {
                        if (sender.graphic.getLayer().id === "editing_layer") {
                            _this._handleMeasureArea();
                        }
                        //this._handleMeasureArea();
                    });
                    this.app.eventRegistry.event("LayerRemovedEvent").subscribe(this, function (sender) {
                        console.log('layer removed', sender);
                        if (sender.id === "editing_layer") {
                            _this.app.commandRegistry.commands["DeleteMeasurement"].execute(_this._tempCloneEditGeometry);
                            $("#Drawings_measurement_layer").text("");
                        }
                    });
                    this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                        var _this = this;
                        if (args.id === "FeatureEditingContainerView" || (args.app.shellName === "Handheld" && args.id === "ResultsViewContainerView")) {
                            //close map tip
                            this.app.commandRegistry.commands["HideMapTips"].execute();
                            this.app.commandRegistry.commands["EnableMapTips"].execute();
                            args.childRegions.forEach(function (cr) {
                                var editView = cr.views.filter(function (v) { return v.id === "EditorView"; });
                                if (editView.length > 0) {
                                    _this._activeFeature = editView[0].viewModel.currentFeatureEsri;
                                    if (_this._activeFeature) {
                                        if (_this._activeFeature.getLayer()._name === "All Developments") {
                                            var attr = editView[0].viewModel.form.value.fields.getItems();
                                            if (attr.length > 0) {
                                                if (!editView[0].viewModel.form.value["all_fields"]) {
                                                    editView[0].viewModel.form.value["all_fields"] = [];
                                                    editView[0].viewModel.form.value.fields.value.forEach(function (f) {
                                                        editView[0].viewModel.form.value["all_fields"].push(f);
                                                    });
                                                }
                                                var filteredFields = _this._processAttributeFilter(attr);
                                                if (filteredFields.length > 0) {
                                                    editView[0].viewModel.form.value.fields.set(filteredFields);
                                                }
                                            }
                                        }
                                    }
                                }
                                //hide delete button if not in appropriate group
                                //let isAdmin = this.app.site.principal.identities.length > 0
                                //? this.app.site.principal.identities[0].claims.filter((c: any) => c.value === this._adminGroupID).length > 0
                                //: false;
                                if (!isAdmin) {
                                    $('.button:contains("Delete")').hide();
                                }
                            });
                        }
                        if (args.id === "DataFrameViewContainer") {
                            //add pop-up for large scale description
                            $('label:contains("Large Scale")').append('<a href="javascript:void()">?</a>');
                        }
                    });
                    this.app.eventRegistry.event("FeatureDetailsInvokedEvent").subscribe(this, function (args) {
                        //let filteredAttributes = this._processAttributeFilter(this.devAttributes ? this.devAttributes : args.attributes.getItems());
                        var filteredAttributes = this._processAttributeFilter(args.attributes.getItems());
                        if (filteredAttributes) {
                            var filteredAttrNames_1 = filteredAttributes.map(function (fa) { return fa.name.value; });
                            args.attributes.getItems().forEach(function (attr) {
                                if (filteredAttrNames_1.indexOf(attr.name.value) === -1) {
                                    attr.visible.set(false);
                                }
                            });
                        }
                    });
                    this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, this._handleGeometryEditInvokeEvent);
                    this.app.event("WorkflowCompletedEvent").subscribe(this, function (workflow) {
                        if (workflow.id !== "edit_geometry") {
                            return;
                        }
                    });
                    this.app.eventRegistry.event("FeatureEditedEvent").subscribe(this, function (feature) {
                        //check if any changes beside edit time
                        if (feature.editedFeature.getLayer()._name === "All Developments") {
                            var hasUpdate = JSON.stringify(feature.editedFeature.toJson()) !== JSON.stringify(feature.originalFeature.toJson());
                            if (_this._projNameUpdated) {
                                //look up and add new name if necessary
                                var workflowArgs = {};
                                workflowArgs["workflowId"] = "update_proj_name";
                                workflowArgs["projName"] = feature.editedFeature.attributes["or_dev_reg_proj_id"];
                                workflowArgs["srvc_url"] = _this.devRegProjectsSrvcUrl;
                                workflowArgs["srvc_token"] = _this.devRegToken;
                                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                            }
                            _this._projNameUpdated = false;
                            //this.app.commandRegistry.commands["MeasureArea"].execute(feature.editedFeature);
                            if (hasUpdate) {
                                var workflowArgs = {};
                                workflowArgs["workflowId"] = "add_feature_version";
                                workflowArgs["featureGraphic"] = feature.editedFeature;
                                workflowArgs["srvc_url"] = _this.devRegVersionSrvcUrl;
                                workflowArgs["srvc_token"] = _this.devRegToken;
                                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                            }
                        }
                        else {
                            //this.app.featureSetManager.getCollectionById("selected_sdartt").clear();
                            //return true;
                        }
                    });
                    //workaround to get the authenticated layer list to process svg formatting event
                    var thisScope = this;
                    window.setTimeout(function () {
                        thisScope.app.commandRegistry.commands["SwitchToLayerView"].execute();
                    }, 50);
                }
                catch (ex) {
                    alert(ex.message);
                }
            }
            else {
                var workflowArgs = {};
                workflowArgs["workflowId"] = "disclaimer";
                workflowArgs["shellName"] = this.app.shellName;
                this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
            }
            this.app.eventRegistry.event("FeatureDeletedEvent").subscribe(this, function (graphic) {
                _this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.Geometry);
            });
            this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                if (args.id === "LayerDataContainerView") {
                    var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerListView"; });
                    if (layerListView.length > 0) {
                        layerListView[0].viewModel.layerListItems.value.forEach(function (group) {
                            var layers = group.children.value.forEach(function (layer) {
                                var uniqueCategories = [];
                                var legendItems = layer.legendItems.getItems().filter(function (category) {
                                    if (category.swatchElement.match("<svg ")) {
                                        category.swatchElement = category.swatchElement
                                            .replace('width="32"', 'width="24"')
                                            .replace('height="32"', 'height="24"')
                                            .replace('M-10-10L 10 0L 10 10L-10 10L-10-10Z', 'M 8-8L 8 0L 8 8L-8 8L-8-8Z')
                                            .replace('d="M -10 -10 L 10 0 L 10 10 L -10 10 L -10 -10 Z" path="M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"', 'd="M 8 -8 L 8 0 L 8 8 L -8 8 L -8 -8 Z" path="M -8,-8 L 8,0 L 8,8 L -8,8 L -8,-8 Z"');
                                    }
                                    if (uniqueCategories.indexOf(category.label.value) === -1) {
                                        uniqueCategories.push(category.label.value);
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                });
                                layer.legendItems.set(legendItems);
                                $(".legend-swatch svg").css("paddingLeft", ".5em");
                            });
                        });
                    }
                }
            });
        };
        return OE_SageGrouseDevRegistryModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_SageGrouseDevRegistryModule = OE_SageGrouseDevRegistryModule;
});

},
"geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryProjectReportView": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myWorkflowContext;
    var myApp;
    //var myLibID;
    var OE_SageGrouseDevRegistryProjectReportView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryProjectReportView, _super);
        function OE_SageGrouseDevRegistryProjectReportView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.cancelForm = function (event, element, context) {
                myWorkflowContext.setValue("finalFormBtn", 'Close');
                myWorkflowContext.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryProjectReportView");
                //$(".panel-header-button.right.close-16.bound-visible").show();
                return true;
            };
            return _this;
        }
        return OE_SageGrouseDevRegistryProjectReportView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseDevRegistryProjectReportView = OE_SageGrouseDevRegistryProjectReportView;
});

},
"geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryProjectReportViewModel": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SageGrouseDevRegistryProjectReportViewModel = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryProjectReportViewModel, _super);
        function OE_SageGrouseDevRegistryProjectReportViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.report_title = new observables_1.Observable("");
            _this.proj_name = new observables_1.Observable("");
            _this.dev_name = new observables_1.Observable("");
            _this.proj_dev_area = new observables_1.Observable("");
            _this.proj_pac_report_data = new observables_1.ObservableCollection([]);
            _this.pac_intersect = new observables_1.Observable(true);
            _this.no_pac_intersect = new observables_1.Observable(false);
            _this.pac_name_list = new observables_1.Observable("");
            _this.dev_num = new observables_1.Observable("");
            return _this;
        }
        OE_SageGrouseDevRegistryProjectReportViewModel.prototype.initialize = function (config) {
            var myApp = this.app;
            var myLibID = this.libraryId;
            var thisViewModel = this;
            this.app.registerActivityIdHandler("display_form_dev_reg_proj_report", function CustomEventHandler(workflowContext) {
                //let cat_area_rows = [];
                thisViewModel.pac_intersect.set(true);
                thisViewModel.no_pac_intersect.set(false);
                var dev_area_row = [];
                var baseline_row = [];
                var decade_area_row = [];
                var has_proj_name = false;
                var is_updated_development_area = false;
                var _pac_name_list = [];
                var myWorkflowContext = $.extend({}, workflowContext);
                myApp.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevRegistryProjectReportView");
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
                myApp.viewManager.getViewById("OE_SageGrouseDevRegistryProjectReportView").title.set(_report_title + " Impact Report");
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
            });
        };
        OE_SageGrouseDevRegistryProjectReportViewModel.prototype.addCommas = function (nStr) {
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
        return OE_SageGrouseDevRegistryProjectReportViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_SageGrouseDevRegistryProjectReportViewModel = OE_SageGrouseDevRegistryProjectReportViewModel;
});

},
"geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryView": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myWorkflowContext;
    //var myApp;
    //var myLibID;
    var OE_SageGrouseDevRegistryView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryView, _super);
        function OE_SageGrouseDevRegistryView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.toggleLayer = function (event, element, context) {
                var workflowArgs = {};
                workflowArgs.workflowId = "toggleLayer";
                workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
                workflowArgs.LayerName = element.getAttribute("data-attr-layer");
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            };
            _this.showInfo = function (event, element, context) {
                var workflowArgs = {};
                workflowArgs.workflowId = "constraintPopUps";
                workflowArgs.constraint = element.getAttribute("data-attr-constraint");
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            };
            _this.zoomTo = function (event, element, context) {
                var featureExtent = myWorkflowContext.getValue('uda_extent');
                this.app.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
            };
            _this.clearTitle = function (event, element, context) {
                element.value = "";
            };
            _this.cancelForm = function (event, element, context) {
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryView");
                return true;
            };
            return _this;
        }
        return OE_SageGrouseDevRegistryView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseDevRegistryView = OE_SageGrouseDevRegistryView;
});

},
"geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryViewModel": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.oeSageGrouseDevSitingReports = [];
    var OE_SageGrouseDevRegistryViewModel = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevRegistryViewModel, _super);
        function OE_SageGrouseDevRegistryViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.pac_title = new observables_1.Observable("");
            _this.pac_title_projected = new observables_1.Observable("");
            _this.pac_area = new observables_1.Observable("");
            _this.baseline_area = new observables_1.Observable("");
            _this.baseline_percent = new observables_1.Observable("");
            _this.dev_area = new observables_1.Observable("");
            _this.decade_tbl = new observables_1.ObservableCollection([]);
            _this.overall_tbl = new observables_1.ObservableCollection([]);
            _this.decade_projected_tbl = new observables_1.ObservableCollection([]);
            _this.overall_projected_tbl = new observables_1.ObservableCollection([]);
            _this.filtered_date_tbl = new observables_1.ObservableCollection([]);
            _this.filtered_date_proj_tbl = new observables_1.ObservableCollection([]);
            _this.filtered_date_area = new observables_1.Observable("");
            _this.filtered_percent_val = new observables_1.Observable("");
            _this.filtered_date_proj_area = new observables_1.Observable("");
            _this.filtered_proj_percent_val = new observables_1.Observable("");
            _this.decade_cap_val = new observables_1.Observable("");
            _this.overall_cap_val = new observables_1.Observable("");
            _this.decade_projected_cap_val = new observables_1.Observable("");
            _this.overall_projected_cap_val = new observables_1.Observable("");
            _this.decade_area_val = new observables_1.Observable("");
            _this.overall_area_val = new observables_1.Observable("");
            _this.decade_projected_area_val = new observables_1.Observable("");
            _this.overall_projected_area_val = new observables_1.Observable("");
            _this.has_current = new observables_1.Observable(false);
            _this.has_projected = new observables_1.Observable(false);
            _this.has_all = new observables_1.Observable(false);
            _this.show_decade_tbl_current = new observables_1.Observable(false);
            _this.show_decade_tbl_projected = new observables_1.Observable(false);
            _this.show_filtered_date_tbl = new observables_1.Observable(false);
            _this.isCached = new observables_1.Observable(false);
            _this.exceedsCurrentDecade = new observables_1.Observable(false);
            _this.exceedsCurrentMax = new observables_1.Observable(false);
            _this.exceedsProjectedDecade = new observables_1.Observable(false);
            _this.exceedsProjectedMax = new observables_1.Observable(false);
            _this.reportDate = new observables_1.Observable("");
            _this.show_all_pac_links = new observables_1.Observable(false);
            _this.all_pac_area_baseline_area = [{}];
            _this.all_pac_development_data = [{}];
            _this.all_pac_summary = new observables_1.ObservableCollection([]);
            _this.selected_preset_date_range = new observables_1.Observable('');
            _this.selected_report_type = new observables_1.Observable('');
            _this.show_custom_date_range_data = new observables_1.Observable(false);
            _this.filtered_report_date_range = new observables_1.Observable('');
            _this.date_filter = new observables_1.Observable({
                min: new Date(2015, 7, 13),
                max: Date.now()
            });
            _this.preset_date_ranges = new observables_1.ObservableCollection([
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
            _this.report_types = new observables_1.ObservableCollection([
                {
                    label: 'Current',
                    val: 'Current'
                },
                {
                    label: 'Estimated',
                    val: 'Projected'
                }
            ]);
            return _this;
        }
        OE_SageGrouseDevRegistryViewModel.prototype.initialize = function (config) {
            var _this = this;
            var myApp = this.app;
            var myLibID = this.libraryId;
            var site = this.app.site;
            var thisViewModel = this;
            this.selected_report_type.set('Current');
            this.date_filter.bind(thisViewModel, function (obj) {
                //console.log('date_filter value changed!', obj);
                _this.processPACSummaries();
            });
            this.app.registerActivityIdHandler("displayAdminAllPacsReport", function (wc) {
                //create the object array for summary data
                _this.all_pac_area_baseline_area = wc.getValue("pacAreaBaselineArea");
                _this.all_pac_development_data = wc.getValue("developmentData");
                _this.processPACSummaries();
                _this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevRegistryAllPacsReport");
            });
            this.app.registerActivityIdHandler("displaycustomform_devReg", function CustomEventHandler(wc) {
                var selected_pac = wc.getValue("selected_pac");
                var pac_area = wc.getValue("pac_area");
                var baseline_area = wc.getValue("baseline_area");
                var pac_data = wc.getValue("report_final").features;
                var report_type = wc.getValue("report_type");
                var is_public = wc.getValue("public");
                var cached = wc.getValue("cached");
                thisViewModel.processPACReport(selected_pac, pac_area, baseline_area, pac_data, report_type, is_public, cached);
            });
        };
        OE_SageGrouseDevRegistryViewModel.prototype.processPACSummaries = function () {
            var _this = this;
            var thisViewModel = this;
            var all_pacs = this.all_pac_area_baseline_area.features.map(function (feature) {
                "baseline_data_area_acres,pac_area_acres,PAC_name";
                return {
                    pac_name: feature.attributes["PAC_name"],
                    pac_area_baseline: feature.attributes['baseline_data_area_acres'],
                    pac_area: feature.attributes['pac_area_acres']
                };
            });
            var _all_pacs_summary = [];
            all_pacs.forEach(function (pac) {
                //get total stats from cache
                var pac_data = _this.all_pac_development_data.features.filter(function (feature) {
                    return pac.pac_name === feature.attributes["PAC_name"];
                });
                var all_pac_dev_area = 0;
                var all_pac_proj_dev_area = 0;
                var all_decade_dev_area = 0;
                var all_proj_decade_dev_area = 0;
                var filtered_dates_dev_area = 0;
                var filtered_dates_proj_dev_area = 0;
                pac_data.forEach(function (pd) {
                    switch (pd.attributes.stat) {
                        case 'all':
                            all_pac_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            break;
                        case 'projected_all':
                            all_pac_proj_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            break;
                        case 'decade':
                            all_decade_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            if (pd.attributes.clctn_dt >= _this.date_filter.get()['min'] && pd.attributes.clctn_dt <= _this.date_filter.get()['max']) {
                                filtered_dates_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            }
                            break;
                        case 'projected_decade':
                            all_proj_decade_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            if (pd.attributes.clctn_dt >= _this.date_filter.get()['min'] && pd.attributes.clctn_dt <= _this.date_filter.get()['max']) {
                                filtered_dates_proj_dev_area += pd.attributes.SUM_POLY_AREA || pd.attributes.SUM_POLY_A;
                            }
                            break;
                        default:
                            break;
                    }
                });
                var isCurrentReport = thisViewModel.selected_report_type.get() === 'Current';
                var _all_pac_dev_area = isCurrentReport ? all_pac_dev_area : all_pac_proj_dev_area;
                var _decade_pac_dev_area = isCurrentReport ? all_decade_dev_area : all_proj_decade_dev_area;
                var _filtered_data_dev_area = isCurrentReport ? filtered_dates_dev_area : filtered_dates_proj_dev_area;
                var pac_obj = {
                    pac_name: pac.pac_name,
                    pac_data: pac_data,
                    pac_area_dbl: pac.pac_area,
                    pac_area: thisViewModel.addCommas(pac.pac_area.toFixed(0)) + " acres",
                    pac_baseline_area_dbl: pac.pac_area_baseline,
                    show_date_range: thisViewModel.show_custom_date_range_data.get(),
                    pac_area_baseline_area: thisViewModel.addCommas(pac.pac_area_baseline.toFixed(0)) + " acres",
                    total_dev_percent: _all_pac_dev_area ? (_all_pac_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "N/A",
                    decade_dev_percent: _decade_pac_dev_area ? (_decade_pac_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "0%",
                    filtered_date_percent: _filtered_data_dev_area ? (_filtered_data_dev_area / pac.pac_area * 100).toFixed(1) + "%" : "0%",
                };
                _all_pacs_summary.push(pac_obj);
            });
            thisViewModel.all_pac_summary.set(_all_pacs_summary);
        };
        OE_SageGrouseDevRegistryViewModel.prototype.updateTableRow = function (table, stat_obj, pac_area_dbl) {
            var _this = this;
            var needToAdd = table.length === 0;
            if (table.length > 0) {
                //check if already added entry for category
                table.forEach(function (car) {
                    if (car.category === stat_obj.category) {
                        var combinedArea = car.area + stat_obj.area;
                        car.area = combinedArea;
                        car.area_formatted = _this.addCommas(car.area.toFixed(0));
                        car.percent = combinedArea ? (car.area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                    }
                    else {
                        needToAdd = true;
                    }
                });
            }
            if (needToAdd) {
                table.push(stat_obj);
            }
        };
        OE_SageGrouseDevRegistryViewModel.prototype.processPACReport = function (selected_pac, pac_area, baseline_area, pac_data, report_type, isPublic, cached, date_range) {
            var _this = this;
            var thisViewModel = this;
            var cat_area_rows = [];
            var dev_area_row = [];
            var baseline_row = [];
            var decade_area_row = [];
            var decade_cat_area_row = [];
            var proj_all_area_row = [];
            var proj_decade_area_row = [];
            var proj_decade_cat_area_row = [];
            var proj_cat_area_rows = [];
            var filtered_date_area_row = [];
            var filtered_date_cat_area_row = [];
            var filtered_date_proj_area_row = [];
            var filtered_date_proj_cat_area_row = [];
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevRegistryView");
            var pac_area_dbl = pac_area;
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
            pac_data.forEach(function (_stat) {
                var stat = _stat;
                var stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                var stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                var stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                var stat_date = stat.attributes.clctn_dt;
                //let isStatCategory = false;
                var category = '';
                if (statCategoryLables.indexOf(stat.attributes.stat) !== -1) {
                    if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                        //isStatCategory = true;
                        category = stat.attributes.category_merged || stat.attributes.category_m;
                    }
                }
                else {
                    //isStatCategory = false;
                    category = 'Total';
                }
                if (category !== '') {
                    var stat_obj = {
                        category: category,
                        area: stat_area,
                        area_formatted: stat_area_formatted,
                        percent: stat_percent
                    };
                    var stat_obj_date = {
                        category: category,
                        area: stat_area,
                        area_formatted: stat_area_formatted,
                        percent: stat_percent
                    };
                    var statLabel = stat.attributes.stat;
                    var tableRows = statLabel === 'all'
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
                    _this.updateTableRow(tableRows, stat_obj, pac_area_dbl);
                    if (['decade_categories', 'decade'].indexOf(statLabel) !== -1) {
                        if (stat_date >= _this.date_filter.get()['min']
                            && stat_date <= _this.date_filter.get()['max']) {
                            _this.updateTableRow(statLabel === 'decade_categories'
                                ? filtered_date_cat_area_row
                                : filtered_date_area_row, stat_obj_date, pac_area_dbl);
                        }
                    }
                    if (['projected_decade_categories', 'projected_decade'].indexOf(statLabel) !== -1) {
                        if (stat_date >= _this.date_filter.get()['min']
                            && stat_date <= _this.date_filter.get()['max']) {
                            _this.updateTableRow(statLabel === 'projected_decade_categories'
                                ? filtered_date_proj_cat_area_row
                                : filtered_date_proj_area_row, stat_obj_date, pac_area_dbl);
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
            var cap_one_percent_tbl = decade_cat_area_row.concat(decade_area_row);
            thisViewModel.decade_tbl.set(cap_one_percent_tbl);
            thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);
            var filtered_date_tbl = filtered_date_cat_area_row.concat(filtered_date_area_row);
            thisViewModel.filtered_date_tbl.set(filtered_date_tbl);
            thisViewModel.show_filtered_date_tbl.set(filtered_date_tbl.length > 0 ? true : false);
            var filtered_date_proj_tbl = filtered_date_proj_cat_area_row.concat(filtered_date_proj_area_row);
            thisViewModel.filtered_date_proj_tbl.set(filtered_date_proj_tbl);
            thisViewModel.show_filtered_date_tbl.set(filtered_date_proj_tbl.length > 0 ? true : false);
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
        };
        OE_SageGrouseDevRegistryViewModel.prototype.setExceedanceMsgs = function () {
            this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
            this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
            this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
            this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
        };
        OE_SageGrouseDevRegistryViewModel.prototype.addCommas = function (nStr) {
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
        return OE_SageGrouseDevRegistryViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_SageGrouseDevRegistryViewModel = OE_SageGrouseDevRegistryViewModel;
});

},
"url:/geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryAllPacsReport.html": markup1,
"url:/geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryProjectReportView.html": markup2,
"url:/geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryView.html": markup3,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/CSS/daterangepicker.css", "css", "LmRhdGVyYW5nZXBpY2tlciB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGNvbG9yOiBpbmhlcml0Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7DQogICAgd2lkdGg6IDI3OHB4Ow0KICAgIG1heC13aWR0aDogbm9uZTsNCiAgICBwYWRkaW5nOiAwOw0KICAgIG1hcmdpbi10b3A6IDdweDsNCiAgICB0b3A6IDEwMHB4Ow0KICAgIGxlZnQ6IDIwcHg7DQogICAgei1pbmRleDogMzAwMTsNCiAgICBkaXNwbGF5OiBub25lOw0KICAgIGZvbnQtZmFtaWx5OiBhcmlhbDsNCiAgICBmb250LXNpemU6IDE1cHg7DQogICAgbGluZS1oZWlnaHQ6IDFlbTsNCn0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXI6YmVmb3JlLCAuZGF0ZXJhbmdlcGlja2VyOmFmdGVyIHsNCiAgICAgICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTsNCiAgICAgICAgY29udGVudDogJyc7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlcjpiZWZvcmUgew0KICAgICAgICB0b3A6IC03cHg7DQogICAgICAgIGJvcmRlci1yaWdodDogN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICAgICAgICBib3JkZXItbGVmdDogN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICAgICAgICBib3JkZXItYm90dG9tOiA3cHggc29saWQgI2NjYzsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyOmFmdGVyIHsNCiAgICAgICAgdG9wOiAtNnB4Ow0KICAgICAgICBib3JkZXItcmlnaHQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDsNCiAgICAgICAgYm9yZGVyLWJvdHRvbTogNnB4IHNvbGlkICNmZmY7DQogICAgICAgIGJvcmRlci1sZWZ0OiA2cHggc29saWQgdHJhbnNwYXJlbnQ7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5vcGVuc2xlZnQ6YmVmb3JlIHsNCiAgICAgICAgcmlnaHQ6IDlweDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyLm9wZW5zbGVmdDphZnRlciB7DQogICAgICAgIHJpZ2h0OiAxMHB4Ow0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIub3BlbnNjZW50ZXI6YmVmb3JlIHsNCiAgICAgICAgbGVmdDogMDsNCiAgICAgICAgcmlnaHQ6IDA7DQogICAgICAgIHdpZHRoOiAwOw0KICAgICAgICBtYXJnaW4tbGVmdDogYXV0bzsNCiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIub3BlbnNjZW50ZXI6YWZ0ZXIgew0KICAgICAgICBsZWZ0OiAwOw0KICAgICAgICByaWdodDogMDsNCiAgICAgICAgd2lkdGg6IDA7DQogICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvOw0KICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5vcGVuc3JpZ2h0OmJlZm9yZSB7DQogICAgICAgIGxlZnQ6IDlweDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyLm9wZW5zcmlnaHQ6YWZ0ZXIgew0KICAgICAgICBsZWZ0OiAxMHB4Ow0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIuZHJvcC11cCB7DQogICAgICAgIG1hcmdpbi10b3A6IC03cHg7DQogICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIuZHJvcC11cDpiZWZvcmUgew0KICAgICAgICAgICAgdG9wOiBpbml0aWFsOw0KICAgICAgICAgICAgYm90dG9tOiAtN3B4Ow0KICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogaW5pdGlhbDsNCiAgICAgICAgICAgIGJvcmRlci10b3A6IDdweCBzb2xpZCAjY2NjOw0KICAgICAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlci5kcm9wLXVwOmFmdGVyIHsNCiAgICAgICAgICAgIHRvcDogaW5pdGlhbDsNCiAgICAgICAgICAgIGJvdHRvbTogLTZweDsNCiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IGluaXRpYWw7DQogICAgICAgICAgICBib3JkZXItdG9wOiA2cHggc29saWQgI2ZmZjsNCiAgICAgICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5zaW5nbGUgLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzLCAuZGF0ZXJhbmdlcGlja2VyLnNpbmdsZSAuZHJwLWNhbGVuZGFyIHsNCiAgICAgICAgZmxvYXQ6IG5vbmU7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5zaW5nbGUgLmRycC1zZWxlY3RlZCB7DQogICAgICAgIGRpc3BsYXk6IG5vbmU7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5zaG93LWNhbGVuZGFyIC5kcnAtY2FsZW5kYXIgew0KICAgICAgICBkaXNwbGF5OiBibG9jazsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyLnNob3ctY2FsZW5kYXIgLmRycC1idXR0b25zIHsNCiAgICAgICAgZGlzcGxheTogYmxvY2s7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5hdXRvLWFwcGx5IC5kcnAtYnV0dG9ucyB7DQogICAgICAgIGRpc3BsYXk6IG5vbmU7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLWNhbGVuZGFyIHsNCiAgICAgICAgZGlzcGxheTogbm9uZTsNCiAgICAgICAgbWF4LXdpZHRoOiAyNzBweDsNCiAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLWNhbGVuZGFyLmxlZnQgew0KICAgICAgICAgICAgcGFkZGluZzogOHB4IDAgOHB4IDhweDsNCiAgICAgICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIgLmRycC1jYWxlbmRhci5yaWdodCB7DQogICAgICAgICAgICBwYWRkaW5nOiA4cHg7DQogICAgICAgIH0NCg0KICAgICAgICAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtY2FsZW5kYXIuc2luZ2xlIC5jYWxlbmRhci10YWJsZSB7DQogICAgICAgICAgICBib3JkZXI6IG5vbmU7DQogICAgICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgLmNhbGVuZGFyLXRhYmxlIC5uZXh0IHNwYW4sIC5kYXRlcmFuZ2VwaWNrZXIgLmNhbGVuZGFyLXRhYmxlIC5wcmV2IHNwYW4gew0KICAgICAgICBjb2xvcjogI2ZmZjsNCiAgICAgICAgYm9yZGVyOiBzb2xpZCBibGFjazsNCiAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMDsNCiAgICAgICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOw0KICAgICAgICBwYWRkaW5nOiAzcHg7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciAuY2FsZW5kYXItdGFibGUgLm5leHQgc3BhbiB7DQogICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7DQogICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5jYWxlbmRhci10YWJsZSAucHJldiBzcGFuIHsNCiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTsNCiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgLmNhbGVuZGFyLXRhYmxlIHRoLCAuZGF0ZXJhbmdlcGlja2VyIC5jYWxlbmRhci10YWJsZSB0ZCB7DQogICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7DQogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgICAgICAgbWluLXdpZHRoOiAzMnB4Ow0KICAgICAgICB3aWR0aDogMzJweDsNCiAgICAgICAgaGVpZ2h0OiAyNHB4Ow0KICAgICAgICBsaW5lLWhlaWdodDogMjRweDsNCiAgICAgICAgZm9udC1zaXplOiAxMnB4Ow0KICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7DQogICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOw0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciAuY2FsZW5kYXItdGFibGUgew0KICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmOw0KICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7DQogICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIgLmNhbGVuZGFyLXRhYmxlIHRhYmxlIHsNCiAgICAgICAgICAgIHdpZHRoOiAxMDAlOw0KICAgICAgICAgICAgbWFyZ2luOiAwOw0KICAgICAgICAgICAgYm9yZGVyLXNwYWNpbmc6IDA7DQogICAgICAgICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOw0KICAgICAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIHRkLmF2YWlsYWJsZTpob3ZlciwgLmRhdGVyYW5nZXBpY2tlciB0aC5hdmFpbGFibGU6aG92ZXIgew0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlOw0KICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50Ow0KICAgICAgICBjb2xvcjogaW5oZXJpdDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIHRkLndlZWssIC5kYXRlcmFuZ2VwaWNrZXIgdGgud2VlayB7DQogICAgICAgIGZvbnQtc2l6ZTogODAlOw0KICAgICAgICBjb2xvcjogI2NjYzsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIHRkLm9mZiwgLmRhdGVyYW5nZXBpY2tlciB0ZC5vZmYuaW4tcmFuZ2UsIC5kYXRlcmFuZ2VwaWNrZXIgdGQub2ZmLnN0YXJ0LWRhdGUsIC5kYXRlcmFuZ2VwaWNrZXIgdGQub2ZmLmVuZC1kYXRlIHsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsNCiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDsNCiAgICAgICAgY29sb3I6ICM5OTk7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciB0ZC5pbi1yYW5nZSB7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmY0Zjg7DQogICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7DQogICAgICAgIGNvbG9yOiAjMDAwOw0KICAgICAgICBib3JkZXItcmFkaXVzOiAwOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgdGQuc3RhcnQtZGF0ZSB7DQogICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4Ow0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgdGQuZW5kLWRhdGUgew0KICAgICAgICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIHRkLnN0YXJ0LWRhdGUuZW5kLWRhdGUgew0KICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciB0ZC5hY3RpdmUsIC5kYXRlcmFuZ2VwaWNrZXIgdGQuYWN0aXZlOmhvdmVyIHsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzM1N2ViZDsNCiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDsNCiAgICAgICAgY29sb3I6ICNmZmY7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciB0aC5tb250aCB7DQogICAgICAgIHdpZHRoOiBhdXRvOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgdGQuZGlzYWJsZWQsIC5kYXRlcmFuZ2VwaWNrZXIgb3B0aW9uLmRpc2FibGVkIHsNCiAgICAgICAgY29sb3I6ICM5OTk7DQogICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7DQogICAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgc2VsZWN0Lm1vbnRoc2VsZWN0LCAuZGF0ZXJhbmdlcGlja2VyIHNlbGVjdC55ZWFyc2VsZWN0IHsNCiAgICAgICAgZm9udC1zaXplOiAxMnB4Ow0KICAgICAgICBwYWRkaW5nOiAxcHg7DQogICAgICAgIGhlaWdodDogYXV0bzsNCiAgICAgICAgbWFyZ2luOiAwOw0KICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciBzZWxlY3QubW9udGhzZWxlY3Qgew0KICAgICAgICBtYXJnaW4tcmlnaHQ6IDIlOw0KICAgICAgICB3aWR0aDogNTYlOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgc2VsZWN0LnllYXJzZWxlY3Qgew0KICAgICAgICB3aWR0aDogNDAlOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgc2VsZWN0LmhvdXJzZWxlY3QsIC5kYXRlcmFuZ2VwaWNrZXIgc2VsZWN0Lm1pbnV0ZXNlbGVjdCwgLmRhdGVyYW5nZXBpY2tlciBzZWxlY3Quc2Vjb25kc2VsZWN0LCAuZGF0ZXJhbmdlcGlja2VyIHNlbGVjdC5hbXBtc2VsZWN0IHsNCiAgICAgICAgd2lkdGg6IDUwcHg7DQogICAgICAgIG1hcmdpbjogMCBhdXRvOw0KICAgICAgICBiYWNrZ3JvdW5kOiAjZWVlOw0KICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlOw0KICAgICAgICBwYWRkaW5nOiAycHg7DQogICAgICAgIG91dGxpbmU6IDA7DQogICAgICAgIGZvbnQtc2l6ZTogMTJweDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5jYWxlbmRhci10aW1lIHsNCiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgICAgICBtYXJnaW46IDRweCBhdXRvIDAgYXV0bzsNCiAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7DQogICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAuY2FsZW5kYXItdGltZSBzZWxlY3QuZGlzYWJsZWQgew0KICAgICAgICAgICAgY29sb3I6ICNjY2M7DQogICAgICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkOw0KICAgICAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtYnV0dG9ucyB7DQogICAgICAgIGNsZWFyOiBib3RoOw0KICAgICAgICB0ZXh0LWFsaWduOiByaWdodDsNCiAgICAgICAgcGFkZGluZzogOHB4Ow0KICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDsNCiAgICAgICAgZGlzcGxheTogbm9uZTsNCiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7DQogICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLXNlbGVjdGVkIHsNCiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOw0KICAgICAgICBmb250LXNpemU6IDEycHg7DQogICAgICAgIHBhZGRpbmctcmlnaHQ6IDhweDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtYnV0dG9ucyAuYnRuIHsNCiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDsNCiAgICAgICAgZm9udC1zaXplOiAxMnB4Ow0KICAgICAgICBmb250LXdlaWdodDogYm9sZDsNCiAgICAgICAgcGFkZGluZzogNHB4IDhweDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyLnNob3ctcmFuZ2VzLnNpbmdsZS5ydGwgLmRycC1jYWxlbmRhci5sZWZ0IHsNCiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyLnNob3ctcmFuZ2VzLnNpbmdsZS5sdHIgLmRycC1jYWxlbmRhci5sZWZ0IHsNCiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGRkOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIuc2hvdy1yYW5nZXMucnRsIC5kcnAtY2FsZW5kYXIucmlnaHQgew0KICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIuc2hvdy1yYW5nZXMubHRyIC5kcnAtY2FsZW5kYXIubGVmdCB7DQogICAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RkZDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgew0KICAgICAgICBmbG9hdDogbm9uZTsNCiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICAgICAgbWFyZ2luOiAwOw0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIuc2hvdy1jYWxlbmRhciAucmFuZ2VzIHsNCiAgICAgICAgbWFyZ2luLXRvcDogOHB4Ow0KICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyB1bCB7DQogICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7DQogICAgICAgIG1hcmdpbjogMCBhdXRvOw0KICAgICAgICBwYWRkaW5nOiAwOw0KICAgICAgICB3aWR0aDogMTAwJTsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGkgew0KICAgICAgICBmb250LXNpemU6IDEycHg7DQogICAgICAgIHBhZGRpbmc6IDhweCAxMnB4Ow0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaTpob3ZlciB7DQogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlOw0KICAgICAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpLmFjdGl2ZSB7DQogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDhjOw0KICAgICAgICAgICAgY29sb3I6ICNmZmY7DQogICAgICAgIH0NCg0KLyogIExhcmdlciBTY3JlZW4gU3R5bGluZyAqLw0KQG1lZGlhIChtaW4td2lkdGg6IDU2NHB4KSB7DQogICAgLmRhdGVyYW5nZXBpY2tlciB7DQogICAgICAgIHdpZHRoOiBhdXRvOw0KICAgIH0NCg0KICAgICAgICAuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgdWwgew0KICAgICAgICAgICAgd2lkdGg6IDE0MHB4Ow0KICAgICAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlci5zaW5nbGUgLnJhbmdlcyB1bCB7DQogICAgICAgICAgICB3aWR0aDogMTAwJTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIuc2luZ2xlIC5kcnAtY2FsZW5kYXIubGVmdCB7DQogICAgICAgICAgICBjbGVhcjogbm9uZTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIuc2luZ2xlIC5yYW5nZXMsIC5kYXRlcmFuZ2VwaWNrZXIuc2luZ2xlIC5kcnAtY2FsZW5kYXIgew0KICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7DQogICAgICAgIH0NCg0KICAgIC5kYXRlcmFuZ2VwaWNrZXIgew0KICAgICAgICBkaXJlY3Rpb246IGx0cjsNCiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLWNhbGVuZGFyLmxlZnQgew0KICAgICAgICAgICAgY2xlYXI6IGxlZnQ7DQogICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLWNhbGVuZGFyLmxlZnQgLmNhbGVuZGFyLXRhYmxlIHsNCiAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7DQogICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7DQogICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7DQogICAgICAgICAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAuZHJwLWNhbGVuZGFyLnJpZ2h0IHsNCiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwOw0KICAgICAgICB9DQoNCiAgICAgICAgICAgIC5kYXRlcmFuZ2VwaWNrZXIgLmRycC1jYWxlbmRhci5yaWdodCAuY2FsZW5kYXItdGFibGUgew0KICAgICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiBub25lOw0KICAgICAgICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7DQogICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDsNCiAgICAgICAgICAgIH0NCg0KICAgICAgICAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtY2FsZW5kYXIubGVmdCAuY2FsZW5kYXItdGFibGUgew0KICAgICAgICAgICAgcGFkZGluZy1yaWdodDogOHB4Ow0KICAgICAgICB9DQoNCiAgICAgICAgLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzLCAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtY2FsZW5kYXIgew0KICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7DQogICAgICAgIH0NCn0NCg0KQG1lZGlhIChtaW4td2lkdGg6IDczMHB4KSB7DQogICAgLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIHsNCiAgICAgICAgd2lkdGg6IGF1dG87DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIHsNCiAgICAgICAgZmxvYXQ6IGxlZnQ7DQogICAgfQ0KDQogICAgLmRhdGVyYW5nZXBpY2tlci5ydGwgLnJhbmdlcyB7DQogICAgICAgIGZsb2F0OiByaWdodDsNCiAgICB9DQoNCiAgICAuZGF0ZXJhbmdlcGlja2VyIC5kcnAtY2FsZW5kYXIubGVmdCB7DQogICAgICAgIGNsZWFyOiBub25lICFpbXBvcnRhbnQ7DQogICAgfQ0KfQ0K");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/CSS/iThing-min.css", "css", "LnVpLXJhbmdlU2xpZGVye2hlaWdodDozMHB4O3BhZGRpbmctdG9wOjQwcHh9LnVpLXJhbmdlU2xpZGVyLC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItY29udGFpbmVyey13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveDstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveH0udWktcmFuZ2VTbGlkZXItd2l0aEFycm93cyAudWktcmFuZ2VTbGlkZXItY29udGFpbmVye21hcmdpbjowIDE1cHh9LnVpLXJhbmdlU2xpZGVyLWFycm93LC51aS1yYW5nZVNsaWRlci1ub0Fycm93IC51aS1yYW5nZVNsaWRlci1jb250YWluZXIsLnVpLXJhbmdlU2xpZGVyLXdpdGhBcnJvd3MgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcnstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCA0cHggNnB4IC0ycHggUkdCQSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjUpO2JveC1zaGFkb3c6aW5zZXQgMCA0cHggNnB4IC0ycHggUkdCQSgwLDAsMCwuNSl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQudWktcmFuZ2VTbGlkZXItbm9BcnJvdyAudWktcmFuZ2VTbGlkZXItY29udGFpbmVyLC51aS1yYW5nZVNsaWRlci1kaXNhYmxlZC51aS1yYW5nZVNsaWRlci13aXRoQXJyb3dzIC51aS1yYW5nZVNsaWRlci1jb250YWluZXJ7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjMpOy1tb3otYm94LXNoYWRvdzppbnNldCAwIDRweCA2cHggLTJweCBSR0JBKDAsMCwwLC4zKTtib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjMpfS51aS1yYW5nZVNsaWRlci1ub0Fycm93IC51aS1yYW5nZVNsaWRlci1jb250YWluZXJ7LW1vei1ib3JkZXItcmFkaXVzOjRweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItbGVmdDpzb2xpZCAxcHggIzUxNTg2Mjtib3JkZXItcmlnaHQ6c29saWQgMXB4ICM1MTU4NjJ9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkLnVpLXJhbmdlU2xpZGVyLW5vQXJyb3cgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntib3JkZXItY29sb3I6Izg0OTBhM30udWktcmFuZ2VTbGlkZXItYXJyb3csLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntoZWlnaHQ6MzBweDtib3JkZXItdG9wOnNvbGlkIDFweCAjMjMyYTMyO2JvcmRlci1ib3R0b206c29saWQgMXB4ICM2YTcxNzl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntib3JkZXItdG9wLWNvbG9yOiM0OTU3NmI7Ym9yZGVyLWJvdHRvbS1jb2xvcjojOWNhN2IzfS51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItY29udGFpbmVyLC51aS1yYW5nZVNsaWRlci1sYWJlbHtiYWNrZ3JvdW5kOiM2NzcwN0Y7YmFja2dyb3VuZDotbW96LWxpbmVhci1ncmFkaWVudCh0b3AsIzY3NzA3RiAwLCM4ODhEQTAgMTAwJSk7YmFja2dyb3VuZDotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxjb2xvci1zdG9wKDAlLCM2NzcwN0YpLGNvbG9yLXN0b3AoMTAwJSwjODg4REEwKSl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lciwudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWxhYmVse2JhY2tncm91bmQ6Izk1YTRiZDtiYWNrZ3JvdW5kOi1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwjOTVhNGJkIDAsI2IyYmJkOCAxMDAlKTtiYWNrZ3JvdW5kOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yLXN0b3AoMCUsIzk1YTRiZCksY29sb3Itc3RvcCgxMDAlLCNiMmJiZDgpKX0udWktcmFuZ2VTbGlkZXItYXJyb3d7d2lkdGg6MTRweDtjdXJzb3I6cG9pbnRlcn0udWktcmFuZ2VTbGlkZXItbGVmdEFycm93e2JvcmRlci1yYWRpdXM6NHB4IDAgMCA0cHg7Ym9yZGVyLWxlZnQ6c29saWQgMXB4ICM1MTU4NjJ9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3d7Ym9yZGVyLWxlZnQtY29sb3I6Izg3OTJhMn0udWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvd3tib3JkZXItcmFkaXVzOjAgNHB4IDRweCAwO2JvcmRlci1yaWdodDpzb2xpZCAxcHggIzUxNTg2Mn0udWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLXJpZ2h0QXJyb3d7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM4NzkyYTJ9LnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7Ym9yZGVyOjEwcHggc29saWQgdHJhbnNwYXJlbnQ7d2lkdGg6MDtoZWlnaHQ6MDttYXJnaW4tdG9wOi0xMHB4fS51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3cgLnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye2JvcmRlci1yaWdodDoxMHB4IHNvbGlkICNhNGE4Yjc7bGVmdDowO21hcmdpbi1sZWZ0Oi04cHh9LnVpLXJhbmdlU2xpZGVyLWxlZnRBcnJvdzpob3ZlciAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXJ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgI2IzYjZjMn0udWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWxlZnRBcnJvdyAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXIsLnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3c6aG92ZXIgLnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye2JvcmRlci1yaWdodC1jb2xvcjojYmJjMGNmfS51aS1yYW5nZVNsaWRlci1yaWdodEFycm93IC51aS1yYW5nZVNsaWRlci1hcnJvdy1pbm5lcntib3JkZXItbGVmdDoxMHB4IHNvbGlkICNhNGE4Yjc7cmlnaHQ6MDttYXJnaW4tcmlnaHQ6LThweH0udWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvdzpob3ZlciAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXJ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCAjYjNiNmMyfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvdyAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXIsLnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1yaWdodEFycm93OmhvdmVyIC51aS1yYW5nZVNsaWRlci1hcnJvdy1pbm5lcntib3JkZXItbGVmdC1jb2xvcjojYmJjMGNmfS51aS1yYW5nZVNsaWRlci1pbm5lckJhcnt3aWR0aDoxMTAlO2hlaWdodDoxMDAlO2xlZnQ6LTEwcHg7b3ZlcmZsb3c6aGlkZGVufS51aS1yYW5nZVNsaWRlci1iYXJ7YmFja2dyb3VuZDojNjhhMWQ2O2hlaWdodDoyOXB4O21hcmdpbjoxcHggMDstbW96LWJvcmRlci1yYWRpdXM6NHB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjptb3ZlO2N1cnNvcjpncmFiO2N1cnNvcjotbW96LWdyYWI7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMnB4IDZweCBSR0JBKDAsMCwwLC41KTstbW96LWJveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjUpO2JveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjUpfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItYmFye2JhY2tncm91bmQ6IzkzYWVjYTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjMpOy1tb3otYm94LXNoYWRvdzppbnNldCAwIDJweCA2cHggUkdCQSgwLDAsMCwuMyk7Ym94LXNoYWRvdzppbnNldCAwIDJweCA2cHggUkdCQSgwLDAsMCwuMyl9LnVpLXJhbmdlU2xpZGVyLWhhbmRsZXt3aWR0aDoxMHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQ6MCAwO2N1cnNvcjpjb2wtcmVzaXplfS51aS1yYW5nZVNsaWRlci1sYWJlbHtwYWRkaW5nOjVweCAxMHB4O2JvdHRvbTo0MHB4Oy1tb3otYm9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLXJhZGl1czo0cHg7LXdlYmtpdC1ib3gtc2hhZG93OjAgMXB4IDAgI2MyYzVkNjstbW96LWJveC1zaGFkb3c6MCAxcHggMCAjYzJjNWQ2O2JveC1zaGFkb3c6MCAxcHggMCAjYzJjNWQ2O2NvbG9yOiNmZmY7Zm9udC1zaXplOjE1cHg7Y3Vyc29yOmNvbC1yZXNpemV9LnVpLXJhbmdlU2xpZGVyLWxhYmVsLWlubmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6NTAlO2Rpc3BsYXk6YmxvY2s7ei1pbmRleDo5OTtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O21hcmdpbi1sZWZ0Oi0xMHB4O2JvcmRlci10b3A6MTBweCBzb2xpZCAjODg4REEwfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItbGFiZWwtaW5uZXJ7Ym9yZGVyLXRvcC1jb2xvcjojYjJiYmQ4fS51aS1lZGl0UmFuZ2VTbGlkZXItaW5wdXRWYWx1ZXt3aWR0aDoyZW07dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE1cHh9LnVpLXJhbmdlU2xpZGVyIC51aS1ydWxlci1zY2FsZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXRpY2t7ZmxvYXQ6bGVmdH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXNjYWxlMCAudWktcnVsZXItdGljay1pbm5lcntjb2xvcjojZmZmO21hcmdpbi10b3A6MXB4O2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZmZmO2hlaWdodDoyOXB4O3BhZGRpbmctbGVmdDoycHg7cG9zaXRpb246cmVsYXRpdmV9LnVpLXJhbmdlU2xpZGVyIC51aS1ydWxlci1zY2FsZTAgLnVpLXJ1bGVyLXRpY2stbGFiZWx7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjZweH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXNjYWxlMSAudWktcnVsZXItdGljay1pbm5lcntib3JkZXItbGVmdDoxcHggc29saWQgI2ZmZjttYXJnaW4tdG9wOjI1cHg7aGVpZ2h0OjVweH0=");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/CSS/OE_SageGrouseDevRegistry.css", "css", "DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA1MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQogICAgbWFyZ2luLXRvcDogNDZweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg0KICAgIC5tYWluRm9ybSBpbnB1dFt0eXBlPSJ0ZXh0Il0sIC5tYWluRm9ybSB0ZXh0YXJlYSwgLm1haW5Gb3JtIHNlbGVjdCB7DQogICAgICAgIC8qd2lkdGg6IDY1JTsqLw0KICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgfQ0KDQogICAgLm1haW5Gb3JtIGlucHV0W3R5cGU9ImRhdGUiXSB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIH0NCg0KLnRleHRCb3ggew0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUFBQUFBOw0KfQ0KDQouZXJyb3Igew0KICAgIC8qd2lkdGg6IDEwMCU7Ki8NCiAgICBwYWRkaW5nOiAwOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAvKmZvbnQtc2l6ZTogODAlOyovDQogICAgY29sb3I6IHJlZDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICM5MDA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsNCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCn0NCg0KLm15TGFiZWwgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7DQogICAgZGlzcGxheTogaW5saW5lLWZsZXg7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsNCn0NCg0KI2N1c3RvbUZvcm0gZmllbGRzZXR7DQogICAgYm9yZGVyOnNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6MC4yNWVtOw0KICAgIG1hcmdpbjoxLjVlbSBhdXRvOw0KfQ0KDQojY3VzdG9tRm9ybXsNCiAgICBmb250LXNpemU6LjllbTsNCn0NCg0KI2N1c3RvbUZvcm0gdGFibGV7DQogICAgd2lkdGg6MTAwJTsNCn0NCg0KI2N1c3RvbUZvcm0gdHI6bnRoLWNoaWxkKG9kZCkge2JhY2tncm91bmQ6IHJnYmEoMjA0LCAyMDQsIDIwNCwgMC41MCl9DQojY3VzdG9tRm9ybSB0cjpudGgtY2hpbGQoZXZlbikge2JhY2tncm91bmQ6ICNGRkZ9DQojY3VzdG9tRm9ybSB0aGVhZCB0ciB7YmFja2dyb3VuZDojZmZmICFpbXBvcnRhbnR9DQoNCg0KI2RlY2FkZV90YmwgdHI6bnRoLWNoaWxkKG9kZCkge2JhY2tncm91bmQ6IHJnYmEoMjA0LCAyMDQsIDIwNCwgMC41MCl9DQojZGVjYWRlX3RibCB0cjpudGgtY2hpbGQoZXZlbikge2JhY2tncm91bmQ6ICNGRkZ9DQojZGVjYWRlX3RibCB0aGVhZCB0ciB7YmFja2dyb3VuZDojZmZmICFpbXBvcnRhbnR9DQoNCiNjdXN0b21Gb3JtIHRhYmxlIHRkIHsNCiAgICBwYWRkaW5nOi4zZW0gMS4zZW07DQp9DQoNCiNjdXN0b21Gb3JtIHRhYmxlIHRyOmxhc3QtY2hpbGR7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCi5jYXBfdmFsew0KICAgIC8qZmxvYXQ6cmlnaHQ7Ki8NCiAgICB3aWR0aDoxMDAlOw0KICAgIGJvcmRlcjoxcHggc29saWQgI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBwYWRkaW5nOi41ZW07DQp9DQouY2FwX3ZhbCBoMnsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQoubm90ZXN7DQogICAgLypmbG9hdDpyaWdodDsqLw0KICAgIGZvbnQtc2l6ZTouOGVtOw0KICAgIG1hcmdpbi1sZWZ0OjFlbTsNCiAgICAvKm1hcmdpbi10b3A6MWVtOyovDQp9DQoNCi5wcm9qZWN0LWltcGFjdC13cmFwcGVyIHsNCiAgICBwYWRkaW5nOiAuNWVtOw0KICAgIG1pbi1oZWlnaHQ6NjVweDsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCn0NCg0KLnByb2plY3QtaW1wYWN0LXdyYXBwZXIgZGl2IHsNCiAgICB3aWR0aDo0NSU7DQogICAgYm9yZGVyOjFweCBzb2xpZCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6NHB4Ow0KICAgIHBhZGRpbmc6LjVlbTsNCiAgICBtYXJnaW46LjVlbTsNCiAgICBmbG9hdDpsZWZ0Ow0KICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7DQp9DQoNCi5wYWNfc3VtX2Rlc2Mgew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIGNvbG9yOiMzMzM7DQogICAgZm9udC1zdHlsZTppdGFsaWM7DQp9DQoNCiAgIC5jbGVhcnsNCiAgICAgICBjbGVhcjpib3RoOw0KICAgICAgIGZsb2F0Om5vbmU7DQogICB9DQoNCiNyZXBvcnQtZGF0ZXsNCiAgICB3aWR0aDoxMDAlOw0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBjb2xvcjojMzMzOw0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIGZvbnQtc3R5bGU6aXRhbGljOw0KfQ0KDQouc3VtbWFyeS13cmFwcGVyew0KICAgIGJvcmRlcjoxcHggc29saWQgI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBwYWRkaW5nOi41ZW07DQogICAgbWFyZ2luOjEuNWVtIC41ZW0gYXV0bzsNCiAgICBmb250LXNpemU6MS4xZW07DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIwNCwgMjA0LCAyMDQsIDAuNTApOw0KfQ0KDQouc3VtbWFyeS13cmFwcGVyIGgyew0KICAgIG1hcmdpbi1ib3R0b206MTBweDsNCn0NCi5kZXRhaWxzIGgzew0KICAgIGZvbnQtc2l6ZToxLjVlbTsNCn0NCg0KLmRldGFpbHN7DQogICAgcGFkZGluZzoxZW07DQp9DQoNCiNjdXN0b21Gb3JtIGg0ew0KICAgIG1hcmdpbjphdXRvIGF1dG8gLjVlbSAuNWVtOw0KICAgIGNvbG9yOiMzMzM7DQp9DQoNCi5jb250YWluZXIgew0KICAgIHBhZGRpbmc6IDA7DQogICAgbWFyZ2luOiAwOw0KICAgIGxpc3Qtc3R5bGU6IG5vbmU7DQogICAgZGlzcGxheTogLXdlYmtpdC1ib3g7DQogICAgZGlzcGxheTogLW1vei1ib3g7DQogICAgZGlzcGxheTogLW1zLWZsZXhib3g7DQogICAgZGlzcGxheTogLXdlYmtpdC1mbGV4Ow0KICAgIGRpc3BsYXk6IGZsZXg7DQogICAgLXdlYmtpdC1mbGV4LWZsb3c6IHJvdyB3cmFwOw0KICAgIGZsZXgtZmxvdzogcm93IHdyYXA7DQogICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7DQp9DQoNCi5jb250YWluZXItY2hpbGQgeyAgICAgICANCiAgICBib3JkZXI6MXB4IHNvbGlkICNhN2E3YTc7DQogICAgYm9yZGVyLXJhZGl1czo0cHg7DQogICAgcGFkZGluZzogMTBweDsNCiAgICB3aWR0aDogMTAwcHg7DQogICAgbWluLXdpZHRoOjEwMHB4OyAgIA0KICAgIG1hcmdpbi10b3A6IDEwcHg7ICAgICAgICANCiAgICBmb250LXdlaWdodDogYm9sZDsNCiAgICBmb250LXNpemU6IC44NWVtOyAgICANCn0NCi5wYWNfdGl0bGVfc3VtbWFyeSB7DQogICAgLyp0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ki8NCiAgICBmb250LXNpemU6IDEuMWVtOw0KICAgIHdpZHRoOiAxMTAlOw0KICAgIGhlaWdodDogMzBweDsNCiAgICBsaW5lLWhlaWdodDogMzBweDsNCiAgICBtYXJnaW46IC0xMHB4IC0xMHB4IDEwcHg7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNCwgMjA0LCAyMDQsIDAuNTApDQp9DQoucGFjX3RpdGxlX3N1bW1hcnkgc3BhbnsNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7DQogICAgbGluZS1oZWlnaHQ6bm9ybWFsOw0KfQ0KLnRvdGFsX2RldiwgLmRlY2FkZV9kZXYgew0KICAgIHdpZHRoOiA0NiU7ICAgIA0KICAgIGZvbnQtc2l6ZTogLjllbTsgICAgDQogICAgdGV4dC1hbGlnbjpjZW50ZXI7DQp9DQoNCi50b3RhbF9kZXZ7DQogICAgYm9yZGVyLXJpZ2h0OnNvbGlkIDJweCAjYTdhN2E3Ow0KfQ0KLmFsbF9wYWNfcGVyY2VudHsNCiAgICBmb250LXNpemU6MS40ZW07DQp9DQojdGltZS1zbGlkZXItd3JhcHBlcnsNCiAgICB3aWR0aDo3NSU7DQogICAgbWFyZ2luOmF1dG87DQp9DQojYWxsLXBhYy1yZXBvcnRzLXdyYXBwZXJ7DQogICAgcGFkZGluZzoxMHB4Ow0KfQ0KDQoudWktcmFuZ2VTbGlkZXItYXJyb3csIC51aS1yYW5nZVNsaWRlci1jb250YWluZXIsIC51aS1yYW5nZVNsaWRlci1iYXIgew0KICAgIGhlaWdodDogMjBweDsNCn0NCg0KLnVpLXJhbmdlU2xpZGVyLWxhYmVsIHsNCiAgICBmb250LXNpemU6IDEycHg7DQp9DQouc2VsZWN0ZWRfZGF0ZV9kZXZ7DQogICAgdGV4dC1hbGlnbjpjZW50ZXI7DQogICAgYm9yZGVyLXRvcDpzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBtYXJnaW4tdG9wOjNweDsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KLnBhY19zdW1tYXJ5OmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIGJhY2tncm91bmQ6I2U0ZTNlMzsNCn0NCg0KLnJlcG9ydC10eXBlLXdyYXBwZXIgZGl2ew0KICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KICAgIG1hcmdpbjogNXB4IDVweCAxMHB4IDEwcHg7DQp9DQoNCmZpZWxkc2V0ew0KICAgIGJvcmRlcjpzb2xpZCAxcHggI2E3YTdhNyAhaW1wb3J0YW50Ow0KICAgIGJvcmRlci1yYWRpdXM6NHB4ICFpbXBvcnRhbnQ7DQogICAgbWFyZ2luOjVweCAwICFpbXBvcnRhbnQ7DQp9DQoNCmxlZ2VuZCB7DQogICAgcGFkZGluZzowIC41ZW0gIWltcG9ydGFudDsNCiAgICBmb250LXdlaWdodDo2MDAgIWltcG9ydGFudDsNCiAgICBtYXJnaW46MCAhaW1wb3J0YW50Ow0KfQ0KDQo=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryAllPacsReport.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryProjectReportView.html", "html", markup2);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevRegistry/OE_SageGrouseDevRegistryView.html", "html", markup3);
});

})();
