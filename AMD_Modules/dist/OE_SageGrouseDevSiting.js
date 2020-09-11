
// Module 'OE_SageGrouseDevSiting'
        (function () {
var markup1 = '<a href=\'#\'></a><div class=\'report_area\' dir=\'ltr\'>    <div data-binding=\'{@hidden:canCompare}\'>        In order to compare, please select two existing reports.    </div>    <div data-binding=\'{@visible:canCompare}\'>        <div class=\'print\' data-binding=\'{@event-onclick:print}\'><img src=\'Resources/Images/Icons/print-24.png\' /></div>        <div id=\'printarea\' class=\'report_area compare\' data-binding=\'{@source: selected_reports}{@value: selected_reports}\'>            <div class=\'siting_compare_col\' data-binding=\'{@template-for: selected_reports}{value: @context}\'>                <hr />                <div>                    <span class=\'data-label\'>Project Name:</span>                    <span class=\'data\' data-binding=\'{@text:name}\'></span>                </div>                <div>                    <span class=\'data-label\'>Development Type:</span>                    <span class=\'data\' data-binding=\'{@text:dev_type}\'></span>                </div>                <div class=\'dev-type-details\' data-binding=\'{@visible:show_dev_type_details}\'>                    <!--<span>(</span>-->                    <span class=\'data\' data-binding=\'{@text:dev_type_details}\'></span>                    <!--<span>)</span>-->                </div>                <hr>                <span class=\'print-remove\'>This is a summary report. <b>Click the button below for a full report</b></span><br />                <div class=\'print-remove\' id=\'btn-row-compare\'>                    <div class=\'cell\' data-binding=\'{@event-onclick:getPDF}\'>Full Report</div>                                                                        <div class=\'cell\' data-binding=\'{@event-onclick:downloadShapefiles}\' title=\'Download project areas as a zipped shapefile.\'>                        Shapefile                    </div>                    <div class=\'cell\' data-binding=\'{@event-onclick:downloadKml}\' title=\'Download project areas as a KMZ file.\'>                                              KML/KMZ                                                     </div>                </div>                <hr />                <fieldset>                    <legend>Project Area</legend>                    <div class=\'sub-section-header\'>Direct Footprint</div>                    <div class=\'sub-section-wrapper\'>                        <div>                            <span class=\'data\'>Total Direct Footprint:</span>                            <span class=\'data\' data-binding=\'{@text:proj_area}\'></span>                        </div>                        <div>                            <span class=\'data\'>Direct Footprint in Significant Sage-Grouse Habitat:</span>                            <span class=\'data\' data-binding=\'{@text:direct_hab_area}\'></span>                        </div>                        <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:has_all_hab_direct}\'>                            <span class=\'hab-area all-hab-area\'>All of the direct project footprint is in significant sage-grouse habitat.</span>                        </div>                        <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:show_no_direct_hab_area}\'>                            <span class=\'hab-area no-hab-area\'>Project footprint is outside of mapped significant sage-grouse habitat and your project is <b>unlikely to require mitigation</b> for sage-grouse unless a state-level permit is necessary.</span>                        </div>                        <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:has_part_hab_direct}\'>                            <span class=\'hab-area no-hab-area\'>Part, but not all, of the direct project footprint is in significant sage-grouse habitat.</span>                        </div>                        <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:dev_rule_no_direct_hab_but_state}\'>                            <span class=\'hab-area no-hab-area\'>Project footprint is outside of mapped significant sage-grouse habitat, and mitigation will only be assessed for indirect impacts within sage-grouse habitat.</span>                        </div>                        <div>                            <span class=\'data\'>Direct Footprint in Close Proximity to a Lek: </span>                            <span class=\'data\' data-binding=\'{@text:is_lek}\'></span>                        </div>                    </div>                    <div class=\'sub-section-header\'>Indirect Impact Area</div>                    <div class=\'sub-section-wrapper\'>                        <div>                            <span class=\'data\'>Total Indirect Impact Area:</span>                            <span class=\'data\' data-binding=\'{@text:indirect_area}\'></span>                        </div>                        <div>                            <span class=\'data\'>Estimated Indirect Impact in Sage-Grouse Habitat:</span>                            <span class=\'data\' data-binding=\'{@text:indirect_hab_area}\'></span>                        </div>                        <div>                            <span class=\'data\'>Habitat Designation(s): </span>                            <span class=\'data\' data-binding=\'{@text:hab_desig}\'></span>                        </div>                    </div>                    <div class=\'sub-section-header\'>Land Management/Ownership</div>                    <div class=\'sub-section-wrapper\'>                        <div>                            <span class=\'data\' data-binding=\'{@text:land_mngt}\'></span>                        </div>                    </div>                    <div data-binding=\'{@visible:has_dev_rule_type}\'>                        <span class=\'data-label\'>Permitting Entity:</span>                        <span class=\'data\' data-binding=\'{@text:dev_rule_type}\'></span>                    </div>                </fieldset>                <fieldset>                    <legend>                        Mitigation Hierarchy                    </legend>                    <div>                        <span class=\'data-label\'>Avoidance:</span><span> Avoidance </span>                        <span class=\'data-label\' data-binding=\'{@text:avoidance}\'></span>                        <span> apply in your identified area.</span>                    </div>                    <div>                        <span class=\'data-label\'>Minimization:</span>                        <span class=\'data\'>See full report for list of potential minimization measures.</span>                    </div>                    <!--<div>                        <span class=\'data-label\'>Minimization:</span>                        <span> Minimization measures for </span>                        <span data-binding=\'{@text:dev_type}\'></span>                        <span> may include:</span>                        <ul data-binding=\'{@source: minimizations}\'>                            <li data-binding=\'{@template-for: minimizations}\'>                                <span data-binding=\'{@text:minimization}\'></span>                            </li>                        </ul>                    </div>-->                    <div>                        <span class=\'data-label\'>Compensatory Mitigation</span>                        <span data-binding=\'{@text:compensatory_mitigation}\'></span>                        <span> out of 100</span>                    </div>                    <div id=\'chart-wrapper\'>                        <img width=\'225\' data-binding=\'{src: chart_url}\'>                    </div>                </fieldset>                <fieldset>                    <legend>Contact Information</legend>                    <div data-binding=\'{@visible:is_odoe}{innerHTML:odoe_contact}\'></div>                    <div data-binding=\'{@visible:is_dogami}{innerHTML:dogami_contact}\'></div>                    <div data-binding=\'{innerHTML:cnty_contacts}\'></div>                    <div data-binding=\'{innerHTML:blm_contacts}\'></div>                </fieldset>            </div>            <div class=\'oe_clear\'></div>        </div>    </div></div>';
var markup2 = '<a href=\'#\'></a><div class=\'dashboard-view module workflow-form\' dir=\'ltr\'>    <h3>Add new development siting project </h3>    <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>        <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:addNewProject}\'>Add New Development Site >></button>    </div>    <hr />    <h3>View project reports</h3>    <div data-binding=\'{@visible:report_list.getLength() > 1}\'>        <div>Select two reports to view a side-by-side comparison</div>    </div>    <div data-binding=\'{@visible:canCompare}\'>        <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>            <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:compareProjectReports}\'>Compare selected</button>        </div>    </div>    <div data-binding=\'{@hidden:canCompare}\'>        <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>            <button title=\'Select two reports to enable compare reports\' type=\'button\' disabled>Compare selected</button>        </div>    </div>    <ul data-binding=\'{@source: report_list}\'>        <li data-binding=\'{@template-for: report_list}\'>            <div>                <div class=\'project-title-wrapper\'>                    <div class=\'project-checkbox-wrapper\'>                        <label class=\'container\'>                            <span class=\'data-label\' data-binding=\'{@text:name}\'></span>                            <input type=\'checkbox\' data-binding=\'{@value:selected}{@event-onclick:zoomTo}\'>                            <span class=\'checkmark\'></span>                        </label>                    </div>                    <div class=\'toggle-wrapper\' data-binding=\'{@event-onclick:toggleExpand}\'>                        <div class=\'show-hide-wrapper\' data-binding=\'{@visible:expanded}\'>                            <div>                                <img src=\'Resources/Images/Icons/chevron-down-24.png\' />                            </div>                            <div class=\'show-hide\'>hide details</div>                            <div class=\'oe_clear\'></div>                        </div>                        <div class=\'show-hide-wrapper\' data-binding=\'{@hidden:expanded}\'>                            <div>                                <img src=\'Resources/Images/Icons/chevron-up-24.png\' />                            </div>                            <div class=\'show-hide\'>show details</div>                            <div class=\'oe_clear\'></div>                        </div>                    </div>                    <div class=\'oe_clear\'>&nbsp;</div>                </div>                <div class=\'report_action_link_wrapper\'>                    <div class=\'report_action_link\' data-binding=\'{@event-onclick:viewFullReport}\' title=\'Download a pdf full report for this development.\'>                        <span><img src=\'Resources/Images/Icons/Toolbar/reports-24.png\' /></span>                        <span>Full Report (pdf)</span>                    </div>                    <div class=\'report_action_link\' data-binding=\'{@event-onclick:viewReport}\' title=\'View a pop-up summary of this development.\'>                        <span><img src=\'Resources/Images/Icons/link-external-24.png\' /></span>                        <span>Summary</span>                    </div>                    <div class=\'report_action_link\' data-binding=\'{@event-onclick:toggleDownloadOpts}\' title=\'Download project areas as shapefile or kml\'>                        <span><img src=\'Resources/Images/Icons/download-24.png\' /></span>                        <span></span>                        <div class=\'download_option_wrapper\' data-binding=\'{@visible:view_download_opts}\'>                            <ul>                                <li class=\'download_option\' data-binding=\'{@event-onclick:downloadShapefiles}\' title=\'Download project areas as a zipped shapefile.\'>                                    Shapefile                                </li>                                <li class=\'download_option\' data-binding=\'{@event-onclick:downloadKml}\' title=\'Download project areas as a KMZ file.\'>                                    KML/KMZ                                </li>                            </ul>                        </div>                    </div>                    <div class=\'report_action_link\' data-binding=\'{@event-onclick:deleteProjectReport}\' title=\'Remove this development from recent projects.\'>                        <span><img src=\'Resources/Images/Icons/delete-16.png\' /></span>                        <span></span>                    </div>                    <div class=\'oe_clear\'></div>                    <div class=\'project-highlights\' data-binding=\'{@visible:expanded}\'>                        <div>                            <span class=\'data-label\'>Project Name:</span>                            <span class=\'data\' data-binding=\'{@text:name}\'></span>                        </div>                        <div>                            <span class=\'data-label\'>Development Type:</span>                            <span class=\'data\' data-binding=\'{@text:dev_type}\'></span>                        </div>                        <div>                            <span class=\'data-label\'>Direct Footprint:</span>                            <span class=\'data\' data-binding=\'{@text:proj_area}\'></span>                        </div>                        <!--<div>        <span class=\'data-label\'>Indirect Impact Area:</span>        <span class=\'data\' data-binding=\'{@text:indirect_area}\'></span>    </div>-->                        <div>                            <span class=\'data-label\'>Compensatory Mitigation: </span>                            <!--<br />-->                            <!--<img width=\'50\' class=\'img_chart\' data-binding=\'{src: chart_simple_url}\'>-->                            <span data-binding=\'{@text:compensatory_mitigation}\'></span>                            <span> out of 100</span>                        </div>                    </div>                </div>                <div class=\'oe_clear\'></div>            </div>        </li>    </ul>    <hr /></div>';
var markup3 = '<a href=\'#\'></a><div class=\'report_area module workflow-form\' dir=\'ltr\'>    <h2>Estimated Mitigation Report</h2>    <h4>Summary</h4>    <hr />    <div>        <span class=\'data-label\'>Project Name:</span>        <span class=\'data\' data-binding=\'{@text:projectName}\'></span>    </div>    <div>        <span class=\'data-label\'>Development Type:</span>        <span class=\'data\' data-binding=\'{@text:devType}\'></span>            </div>    <div class=\'dev-type-details\' data-binding=\'{@visible:showDevTypeDetails}\'>        <!--<span>(</span>-->        <span class=\'data\' data-binding=\'{@text:devTypeDetails}\'></span>        <!--<span>)</span>-->    </div>    <hr>    <span>This is a summary report. <b>Click the button below for a full report</b></span><br />    <div id=\'btn-row\'>        <div class=\'btn btn-cell\'>            <div data-binding=\'{@event-onclick:getPDF}\'>View Full Report</div>        </div>        <div class=\'btn btn-cell-download\'>            <div data-binding=\'{@event-onclick:downloadShapefiles}\'><img width=\'16\' src=\'Resources/Images/Icons/download-24.png\' /> Shapefiles</div>            <div data-binding=\'{@event-onclick:downloadKML}\'><img width=\'16\' src=\'Resources/Images/Icons/download-24.png\' /> KML/KMZ</div>            <div class=\'oe_clear\'></div>        </div>    </div>    <hr />    <fieldset>        <legend>Project Area</legend>        <div class=\'sub-section-header\'>Direct Footprint</div>        <div class=\'sub-section-wrapper\'>            <div>                <span class=\'data\'>Total Direct Footprint:</span>                <span class=\'data\' data-binding=\'{@text:directArea}\'></span>            </div>            <div>                <span class=\'data\'>Direct Footprint in Significant Sage-Grouse Habitat:</span>                <span class=\'data\' data-binding=\'{@text:directHabArea}\'></span>                <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:hasAllHabDirect}\'>                    <span class=\'hab-area all-hab-area\'>All of the direct project footprint is in significant sage-grouse habitat.</span>                </div>                <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:showNoDirectHabArea}\'>                    <span class=\'hab-area no-hab-area\'>Project footprint is outside of mapped significant sage-grouse habitat and your project is <b>unlikely to require mitigation</b> for sage-grouse unless a state-level permit is necessary.</span>                </div>                <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:showPartHabMsg}\'>                    <span class=\'hab-area no-hab-area\'>Part, but not all, of the direct project footprint is in significant sage-grouse habitat.</span>                </div>                <div class=\'trigger-msg-wrapper\' data-binding=\'{@visible:devRuleNoDirectHabButState}\'>                    <span class=\'hab-area no-hab-area\'>Project footprint is outside of mapped significant sage-grouse habitat, and mitigation will only be assessed for indirect impacts within sage-grouse habitat.</span>                </div>            </div>            <div>                <span class=\'data\'>Direct Footprint in Close Proximity to a Lek: </span>                <span class=\'data\' data-binding=\'{@text:isLek}\'></span>            </div>            <!--<div>                <span class=\'data-label\'>Direct Footprint within Sage-Grouse Habitat:</span>                <span class=\'data\' data-binding=\'{@text:directHabArea}\'></span>            </div>-->        </div>        <div class=\'sub-section-header\'>Indirect Impact Area</div>        <div class=\'sub-section-wrapper\'>            <div>                <span class=\'data\'>Total Indirect Impact Area:</span>                <span class=\'data\' data-binding=\'{@text:indirectArea}\'></span>            </div>            <div>                <span class=\'data\'>Estimated Indirect Impact in Sage-Grouse Habitat:</span>                <span class=\'data\' data-binding=\'{@text:indirectHabArea}\'></span>                <!--<span class=\'hab-area all-hab-area\' data-binding=\'{@visible:hasAllHabIndirect}\'>(All of the indirect project area is in Sage-Grouse habitat)</span>                <span class=\'hab-area\' data-binding=\'{@visible:!hasAllHabIndirect}{@text:indirectHabArea}\'></span>-->            </div>            <div>                <span class=\'data\'>Habitat Designation(s): </span>                <span class=\'data\' data-binding=\'{@text:habDesig}\'></span>            </div>            <!--<div>                <span class=\'data-label\'>Buffer distance: </span>                <span class=\'data\' data-binding=\'{@text:bufferDist}\'></span>            </div>            <div>                <span class=\'data-label\'>Estimated Non-Habitat in Indirect Impact Area:</span>                <span class=\'data\' data-binding=\'{@text:nonHabArea}\'></span>            </div>-->        </div>        <div class=\'sub-section-header\'>Land Management/Ownership</div>        <div class=\'sub-section-wrapper\'>            <div>                <span class=\'data\' data-binding=\'{@text:landManagement}\'></span>            </div>        </div>        <div data-binding=\'{@visible:hasDevRuleType}\'>            <span class=\'data-label\'>Permitting Entity:</span>            <span class=\'data\' data-binding=\'{@text:devRuleType}\'></span>        </div>    </fieldset>    <!--<fieldset>        <legend>Permitting Process</legend>        <div data-binding=\'{@visible:hasDevRuleType}\'>            <span class=\'data-label\'>Your Development Triggered:</span>            <span class=\'data\' data-binding=\'{@text:devRuleType}\'></span>            <div data-binding=\'{@visible:hasRulesTriggersMsg}\' class=\'trigger-msg-wrapper\'>                <span class=\'dev-rule\' data-binding=\'{@text:rulesTriggersMsg}\'></span>            </div>        </div>        <div class=\'placement-msg\'>            <b>TIP:  </b>Project impacts that occur outside significant sage-grouse habitat are assumed to have a low effect on sage-grouse habitat.  Mitigation will not be required for project impacts that occur outside significant sage-grouse habitat. It is best to site as much of your proposed development project outside significant sage-grouse habitat to reduce habitat degradation and reduce the amount of required mitigation for development impacts to sage-grouse habitat.        </div>    </fieldset>-->    <!--<fieldset>        <legend>Habitat</legend>-->    <!--<div>        <span class=\'data-label\'>Significant Habitat: </span>        <span>The direct and indirect impact areas </span>        <span class=\'data-label\' data-binding=\'{@text:significant}\'></span>        <span> within known significant sage-grouse habitat.</span>        <span data-binding=\'{@text:significantMsg}\'></span>    </div>-->    <!--<div>        <span class=\'data-label\'>Habitat Designation(s) for Indirect Impact Area: </span>        <span class=\'data\' data-binding=\'{@text:habDesig}\'></span>    </div>-->    <!--<div>        <span class=\'data-label\'>Within 3.1 miles of a Lek? </span>        <span class=\'data\' data-binding=\'{@text:isLek}\'></span>    </div>-->    <!--</fieldset>-->    <!--<fieldset>        <legend>Land management/ownership</legend>        <div data-binding=\'{@text:landManagement}\'></div>    </fieldset>-->    <fieldset>        <legend>            Mitigation Hierarchy        </legend>        <div>            <span class=\'data-label\'>Avoidance:</span><span> Avoidance </span>            <span class=\'data-label\' data-binding=\'{@text:avoidance}\'></span>            <span> apply in your identified area.</span>        </div>        <div>            <span class=\'data-label\'>Minimization:</span>            <span class=\'data\'>See full report for list of potential minimization measures.</span>        </div>        <!--<div>            <span class=\'data-label\'>Minimization:</span>            <span> Minimization measures for </span>            <span data-binding=\'{@text:devType}\'></span>            <span> may include:</span>            <ul data-binding=\'{@source: minimization_list}\'>                <li data-binding=\'{@template-for: minimization_list}\'>                    <span data-binding=\'{@text:minimization}\'></span>                </li>            </ul>        </div>-->        <div>            <span class=\'data-label\'>Compensatory Mitigation: </span>            <span data-binding=\'{@text:compensatoryMitigation}\'></span>            <span> out of 100</span>        </div>        <!--<div>            <span class=\'data-label\'>Compensatory Mitigation for Direct Footprint</span>            <span data-binding=\'{@text:compensatoryMitigationDirect}\'></span>            <span> out of 100</span>        </div>-->        <div id=\'chart-wrapper\'>            <img width=\'225\' data-binding=\'{src: chartURL}\'>        </div>    </fieldset>    <fieldset>        <legend>Contact Information</legend>        <div data-binding=\'{@visible:isODOE}{innerHTML:odoeContact}\'></div>        <div data-binding=\'{@visible:isDOGAMI}{innerHTML:dogamiContact}\'></div>        <div data-binding=\'{innerHTML:countyContacts}\'></div>        <div data-binding=\'{innerHTML:blmContacts}\'></div>    </fieldset>    <!--<fieldset>        <legend>Disclaimer</legend>        <div class=\'disclaimer\'>            The State of Oregon, Oregon State University, Oregon State University Libraries, or any of the data providers cannot accept any responsibility for, or claims attributable to, errors, omissions, misuse, misinterpretation, or positional accuracy in the digital data or underlying information. In no event shall these institutions be liable for direct, indirect, spatial, incidental or consequential loss or damage of any nature caused to any person, party or entity as a result of use of the information set forth herein. Note, the output from this tool is not suitable for legal, engineering, or final project impact assessment and is not a substitute for coordinating with the county and state on project development and acquisition of permits, or Oregon Department of Fish & Wildlife on avoidance, minimization, and mitigation of development impacts to sage-grouse habitat. For questions about sage-grouse mitigation requirements in Oregon contact the Oregon Department of Fish & Wildlife Sage-Grouse Mitigation Coordinator at 503-947-6074.        </div>    </fieldset>-->    <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>        <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>    </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingCompareSummaryView": function () {
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
    var SageGrouseDevSitingCompareSummaryView = /** @class */ (function (_super) {
        __extends(SageGrouseDevSitingCompareSummaryView, _super);
        function SageGrouseDevSitingCompareSummaryView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.downloadShapefiles = function (event, element, context) {
                //got to view model function to process request. put code execution in one place since requested from multiple views.
                this.viewModel.downloadShapefiles(event, element, context);
            };
            _this.getPDF = function (event, element, context) {
                var reportUrl = context.report_url;
                window.open(reportUrl, "_blank");
            };
            _this.clearTitle = function (event, element, context) {
                element.value = "";
            };
            _this.cancelForm = function (event, element, context) {
                //context.myWorkflowContext.setValue("cancelBtn", 'Close');
                //context.myWorkflowContext.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingView");
                return true;
            };
            return _this;
        }
        SageGrouseDevSitingCompareSummaryView.prototype.downloadKml = function (event, element, context) {
            //got to view model function to process request. put code execution in one place since requested from multiple views.
            this.viewModel.downloadKml(event, element, context);
        };
        ;
        SageGrouseDevSitingCompareSummaryView.prototype.toggleDownloadOpts = function (event, element, context) {
            context.view_download_opts.set(!context.view_download_opts.get());
        };
        ;
        SageGrouseDevSitingCompareSummaryView.prototype.print = function (event, element, context) {
            var divToPrint = document.getElementById('printarea');
            var htmlToPrint = '' +
                '<style type="text/css">' +
                'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.siting_compare_col { width: 42%; position: relative; float: left; padding: 0 25px; border - right:2px solid #808080;} .siting_compare_col: last-child{border - right:none;} fieldset{border: solid 1px #a7a7a7; border-radius:4px; margin: 5px 0;} legend{ font-size:1.2em; padding: 10px;}.bound-invisible{display:none}.trigger-msg-wrapper { background-color: #eeece5;width: 95%;padding: 5px;border-radius: 4px;}.dev-rule {text-indent: each-line 10px;font-size: .9em;color: #282727;display: inline-block; font-style: italic; margin-left: 10px;}.hab - area{font-size: .9em;font-style: italic;}.hab-area.no-hab-area{color: #295810; font-weight: bold;}.hab-area.all-hab-area{color: #710f0f;font-weight: bold;}.sub-section-wrapper{margin-left: 15px;}.sub-section-header{font-weight: bolder;}.dev-type-details{margin-left: 120px;font-size: .9em;color: #302f2f;} .print-remove{display: none;} </style>';
            htmlToPrint += divToPrint.outerHTML;
            var newWin = window.open("");
            newWin.document.write(htmlToPrint);
            //newWin.print();
            //newWin.close();
        };
        return SageGrouseDevSitingCompareSummaryView;
    }(ViewBase_1.ViewBase));
    exports.SageGrouseDevSitingCompareSummaryView = SageGrouseDevSitingCompareSummaryView;
});

},
"geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingDashboardView": function () {
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
    var OE_SageGrouseDevSitingDashboardView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevSitingDashboardView, _super);
        function OE_SageGrouseDevSitingDashboardView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.viewReport = function (event, element, context) {
                this.viewModel.setReportValues(context, this.viewModel);
                this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingSummaryView");
            };
            _this.downloadShapefiles = function (event, element, context) {
                //got to view model function to process request. put code execution in one place since requested from multiple views.
                this.viewModel.downloadShapefiles(event, element, context);
            };
            _this.getPDF = function (event, element, context) {
                var reportUrl = context.report_url;
                window.open(reportUrl, "_blank");
            };
            _this.zoomTo = function (event, element, context) {
                var _this = this;
                console.log('zoom to this mofo', context);
                //get project layers and hide/show
                var gls = this.viewModel.getGraphicsLayers(context.name);
                gls.forEach(function (gl) {
                    if (gl.visible) {
                        gl.hide();
                    }
                    else {
                        gl.show();
                        _this.app.commandRegistry.commands.ZoomToExtent.execute(context.buffered_area_fs.features[0].geometry.getExtent());
                    }
                });
                return true;
            };
            _this.viewFullReport = function (event, element, context) {
                var reportUrl = context.report_url;
                window.open(reportUrl, "_blank");
            };
            _this.compareProjectReports = function (event, element, context) {
                console.log('compare reports', event, element, context);
                //this.viewModel.compareReports(context, this.viewModel);
                context.selected_reports.value.reverse();
                this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingCompareSummaryView");
            };
            _this.deleteProjectReport = function (event, element, context) {
                this.viewModel.removeReport(context, this.viewModel);
                //this.viewModel.oeSageGrouseDevSitingReports = this.viewModel.oeSageGrouseDevSitingReports.filter((report: any) => report.name !== context.name);
            };
            _this.clearTitle = function (event, element, context) {
                element.value = "";
            };
            _this.addNewProject = function (event, element, context) {
                //this.viewModel.myWorkflowContext.setValue("dashboardContinue", true);
                //myWorkflowContext.setValue("dashboardContinue", true);
                //myWorkflowContext.completeActivity();
                try {
                    context.wfContext.completeActivity();
                }
                catch (ex) {
                    this.viewModel.wfContext.completeActivity();
                    //context.myWorkflowContext.data.completeActivity();
                }
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingDashboardView");
                return true;
            };
            _this.cancelForm = function (event, element, context) {
                //context.myWorkflowContext.setValue("cancelBtn", 'Close');
                //context.myWorkflowContext.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingDashboardView");
                return true;
            };
            return _this;
        }
        OE_SageGrouseDevSitingDashboardView.prototype.downloadKml = function (event, element, context) {
            //got to view model function to process request. put code execution in one place since requested from multiple views.
            this.viewModel.downloadKml(event, element, context);
        };
        ;
        OE_SageGrouseDevSitingDashboardView.prototype.toggleExpand = function (event, element, context) {
            console.log('toggle expand!', event, element, context);
            context.expanded.set(!context.expanded.get());
        };
        ;
        OE_SageGrouseDevSitingDashboardView.prototype.toggleDownloadOpts = function (event, element, context) {
            context.view_download_opts.set(!context.view_download_opts.get());
        };
        ;
        return OE_SageGrouseDevSitingDashboardView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseDevSitingDashboardView = OE_SageGrouseDevSitingDashboardView;
});

},
"geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingModule": function () {
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
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SageGrouseDevSitingModule = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevSitingModule, _super);
        function OE_SageGrouseDevSitingModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SageGrouseDevSitingModule.prototype.initialize = function (config) {
            var _this = this;
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
        OE_SageGrouseDevSitingModule.prototype._onSiteInitialized = function (site) {
            //add selector to highlight the toolbar button
            var myEles = document.getElementsByTagName('p');
            for (var i = 0; i < myEles.length; i++) {
                if (myEles[i].innerHTML == 'Get Siting Information') {
                    myEles[i].setAttribute('class', "promoted-btn");
                }
            }
            this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, function (sender) {
                console.log('graphic drawing event!', sender);
                var lineSymbol = sender.sender.lineSymbol;
                lineSymbol.color.r = 0;
                lineSymbol.color.b = 255;
                lineSymbol.color.g = 255;
                var fillSymbolOutline = sender.sender.fillSymbol.outline;
                fillSymbolOutline.color.r = 0;
                fillSymbolOutline.color.b = 255;
                fillSymbolOutline.color.g = 255;
            });
        };
        return OE_SageGrouseDevSitingModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_SageGrouseDevSitingModule = OE_SageGrouseDevSitingModule;
});

},
"geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingSummaryView": function () {
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
    var OE_SageGrouseDevSitingSummaryView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevSitingSummaryView, _super);
        function OE_SageGrouseDevSitingSummaryView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.downloadShapefiles = function (event, element, context) {
                this.viewModel.downloadShapefiles(event, element, context);
            };
            _this.getPDF = function (event, element, context) {
                var reportUrl = context.reportURL.value;
                window.open(reportUrl, "_blank");
            };
            _this.cancelForm = function (event, element, context) {
                //context.myWorkflowContext.setValue("cancelBtn", 'Close');
                //context.myWorkflowContext.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevSitingSummaryView");
                return true;
            };
            return _this;
        }
        OE_SageGrouseDevSitingSummaryView.prototype.downloadKML = function (event, element, context) {
            this.viewModel.downloadKml(event, element, context);
        };
        ;
        return OE_SageGrouseDevSitingSummaryView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseDevSitingSummaryView = OE_SageGrouseDevSitingSummaryView;
});

},
"geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/infrastructure/GraphicUtils"], function (require, exports, ViewModelBase_1, observables_1, GraphicUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.oeSageGrouseDevSitingReports = [];
    var OE_SageGrouseDevSitingViewModel = /** @class */ (function (_super) {
        __extends(OE_SageGrouseDevSitingViewModel, _super);
        //myModel: Observable<OE_SageGrouseDevSitingViewModel> = new Observable<OE_SageGrouseDevSitingViewModel>(null);
        function OE_SageGrouseDevSitingViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            //inputs for report
            _this.projectName = new observables_1.Observable("");
            _this.devType = new observables_1.Observable("");
            _this.devTypeDetails = new observables_1.Observable("");
            _this.showDevTypeDetails = new observables_1.Observable(false);
            _this.compensatoryMitigation = new observables_1.Observable("");
            _this.compensatoryMitigationDirect = new observables_1.Observable("");
            _this.reportURL = new observables_1.Observable("");
            _this.chartURL = new observables_1.Observable("");
            _this.chartSimpleURL = new observables_1.Observable("");
            _this.directArea = new observables_1.Observable("");
            _this.indirectArea = new observables_1.Observable("");
            _this.bufferDist = new observables_1.Observable("");
            _this.indirectHabArea = new observables_1.Observable("");
            _this.directHabArea = new observables_1.Observable("");
            _this.habDesig = new observables_1.Observable("");
            _this.isLek = new observables_1.Observable("");
            _this.landManagement = new observables_1.Observable("");
            _this.countyContacts = new observables_1.Observable("");
            _this.blmContacts = new observables_1.Observable("");
            _this.odoeContact = new observables_1.Observable("");
            _this.dogamiContact = new observables_1.Observable("");
            _this.avoidance = new observables_1.Observable("");
            //minimization: Observable<string> = new Observable<string>("");
            _this.significant = new observables_1.Observable("");
            _this.significantMsg = new observables_1.Observable("");
            _this.minimization_list = new observables_1.ObservableCollection([]);
            _this.rulesTriggersMsg = new observables_1.Observable("");
            _this.devRuleType = new observables_1.Observable("");
            _this.devRuleTypeState = new observables_1.Observable("");
            _this.devRuleTypeCounty = new observables_1.Observable("");
            _this.devRuleNoDirectHabButState = new observables_1.Observable(false);
            _this.hasRulesTriggersMsg = new observables_1.Observable(false);
            _this.hasDevRuleType = new observables_1.Observable(false);
            _this.hasNoHabDirect = new observables_1.Observable(false);
            _this.hasAllHabDirect = new observables_1.Observable(false);
            _this.hasAllHabIndirect = new observables_1.Observable(false);
            _this.showHabAreaDirect = new observables_1.Observable(false);
            _this.showNoDirectHabArea = new observables_1.Observable(false);
            _this.showPartHabMsg = new observables_1.Observable(false);
            _this.isODOE = new observables_1.Observable(false);
            _this.isDOGAMI = new observables_1.Observable(false);
            _this.canCompare = new observables_1.Observable(false);
            _this.report_list = new observables_1.ObservableCollection([{}]);
            _this.selected_reports = new observables_1.ObservableCollection([{}]);
            //this.report_list.bind(this, (report) => {
            //    console.log('what the ?', this, report);
            //    return false;
            //});
            _this.report_list.bind(_this, function () {
                try {
                    _this.selected_reports.set(_this.report_list.getItems().filter(function (rl) { return rl.selected.get(); }));
                    _this.canCompare.set(_this.selected_reports.getLength() === 2);
                }
                catch (ex) {
                    //no values yet
                    console.log('initiated without data yet');
                }
            });
            return _this;
        }
        OE_SageGrouseDevSitingViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            var thisViewModel = this;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel);
                });
            }
        };
        OE_SageGrouseDevSitingViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            thisViewModel.myModel = thisViewModel;
            this.app.registerActivityIdHandler("devSitingDashboard", function (wfContext) {
                var _this = this;
                thisViewModel.myWorkflowContext = $.extend({}, wfContext);
                thisViewModel.wfContext = $.extend({}, wfContext);
                var selectedReport = thisViewModel.myWorkflowContext.getValue("selectedReport");
                var addData = thisViewModel.myWorkflowContext.getValue("projectName") ? true : false;
                if (addData) {
                    thisViewModel.setReportValues(thisViewModel.myWorkflowContext, null, true);
                }
                if (exports.oeSageGrouseDevSitingReports.length > 0) {
                    thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingDashboardView");
                    exports.oeSageGrouseDevSitingReports.forEach(function (report) {
                        report.selected = new observables_1.Observable(report.name === selectedReport);
                        report.selected.bind(_this, function () {
                            thisViewModel.selected_reports.set(thisViewModel.report_list.getItems()
                                .filter(function (rl) { return rl.selected.get(); }));
                            thisViewModel.canCompare.set(thisViewModel.selected_reports.getLength() === 2);
                        });
                        report.expanded = new observables_1.Observable(true);
                        report.view_download_opts = new observables_1.Observable(false);
                        //report.selected = report.name === selectedReport;
                    });
                    thisViewModel.report_list.set(exports.oeSageGrouseDevSitingReports);
                    if (selectedReport) {
                        var reportData = exports.oeSageGrouseDevSitingReports.filter(function (reports) { return reports.selected; });
                        thisViewModel.setReportValues(reportData[0], thisViewModel, false);
                        thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingSummaryView");
                    }
                    thisViewModel.setGraphicsVisibilty();
                }
                else {
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
        };
        OE_SageGrouseDevSitingViewModel.prototype.setGraphicsVisibilty = function () {
            var _this = this;
            this.report_list.getItems().forEach(function (report) {
                var gls = _this.getGraphicsLayers(report.name);
                if (report.selected.get()) {
                    gls.forEach(function (gl) {
                        gl.show();
                    });
                }
                else {
                    gls.forEach(function (gl) {
                        gl.hide();
                    });
                }
            });
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.getGraphicsLayers = function (reportName) {
            return [
                GraphicUtils_1.getGraphicsLayer("DirectArea" + reportName, false, this.app),
                GraphicUtils_1.getGraphicsLayer("IndirectArea" + reportName, false, this.app),
                GraphicUtils_1.getGraphicsLayer("DirectAreaMarker" + reportName, false, this.app),
                GraphicUtils_1.getGraphicsLayer("DirectAreaLabelBackground" + reportName, false, this.app),
            ];
        };
        OE_SageGrouseDevSitingViewModel.prototype.removeReport = function (wc, vm) {
            var _this = this;
            exports.oeSageGrouseDevSitingReports = exports.oeSageGrouseDevSitingReports.filter(function (report) {
                if (report.name === wc.name) {
                    //removeGraphics
                    var gls = _this.getGraphicsLayers(report.name);
                    gls.forEach(function (gl) {
                        gl.clear();
                    });
                    _this.report_list.removeItem(report);
                }
                return report.name !== wc.name;
            });
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.compareReports = function (wc, vm) {
            //let compReports = this.report_list.getItems().filter((rl: any) => rl.selected.get());
            //this.canCompare.set(compReports.length < 2 || compReports.length > 2);
            //this.selected_reports.set(compReports);
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseDevSitingCompareSummaryView");
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.downloadShapefiles = function (event, element, context) {
            //get the graphics layers
            //since they may have the most recent graphics, delete and add the requested ones to the layer
            //then combine graphics into one layer
            context = context.myWorkflowContext ? context.myWorkflowContext : context;
            var buffereredGL = GraphicUtils_1.getGraphicsLayer("IndirectArea" + context.name, false, this.app);
            var projectGL = GraphicUtils_1.getGraphicsLayer("DirectArea" + context.name, false, this.app);
            buffereredGL.clear();
            projectGL.clear();
            var featAttrProj = this.setFeatAttr(context, 'project area');
            var featAttrIndirect = this.setFeatAttr(context, 'indirect project area');
            context.buffered_area_fs.features.forEach(function (feature) {
                feature.setAttributes(featAttrIndirect);
                projectGL.add(feature);
            });
            context.project_area_fs.features.forEach(function (feature) {
                feature.setAttributes(featAttrProj);
                projectGL.add(feature);
            });
            var exportArgs = {
                format: "shp",
                graphicLayer: projectGL
            };
            this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.downloadKml = function (event, element, context) {
            var projectFeatures = new esri.tasks.FeatureSet();
            context = context.myWorkflowContext ? context.myWorkflowContext : context;
            var featAttrProj = this.setFeatAttr(context, 'project area');
            var featAttrIndirect = this.setFeatAttr(context, 'indirect project area');
            context.buffered_area_fs.features.forEach(function (feature) {
                feature.setAttributes(featAttrIndirect);
                projectFeatures.features.push(feature);
            });
            context.project_area_fs.features.forEach(function (feature) {
                feature.setAttributes(featAttrProj);
                projectFeatures.features.push(feature);
            });
            var gpUrl = "https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/toKML/GPServer/toKML";
            //let gpUrl = "https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/toKML/GPServer/toKML_no_attr"
            var gp = new esri.tasks.Geoprocessor(gpUrl);
            var gpParams = {
                "Input_Features": projectFeatures
            };
            //check if chrome
            var a = window.document.createElement('a');
            if (window["chrome"]) {
                var kmlWindow = window.open('', '_blank');
                kmlWindow.document.body.innerHTML = "<div style='width:50%;height:50%;margin:auto'>Generating your KMZ file to download.  Check your pop-up blocker if you do not see the download.</div>";
            }
            else {
                a.href = "";
                a.download = context.name;
                a.target = '_blank';
                document.body.appendChild(a);
            }
            gp.submitJob(gpParams, function (results, messages) {
                console.log('results!', results, messages);
                if (results.jobStatus === 'esriJobSucceeded') {
                    var url = gpUrl + '/jobs/' + results.jobId + '/inputs/Input_Features?f=kmz';
                    if (window["chrome"]) {
                        kmlWindow.location.href = url;
                        window.setTimeout(function () { return kmlWindow.close(); }, 500);
                    }
                    else {
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
            }, function (status) {
                console.log('status', status);
            }, function (error) {
                console.log('error :(', error);
            });
            context.view_download_opts.set(false);
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.setFeatAttr = function (context, areaType) {
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
            };
        };
        ;
        OE_SageGrouseDevSitingViewModel.prototype.setReportValues = function (workflowContext, thisViewModel, addReport) {
            try {
                //thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                this.myWorkflowContext = $.extend({}, workflowContext);
                if (this.myWorkflowContext || workflowContext) {
                    //this.myWorkflowContext = $.extend({}, workflowContext);
                    //thisViewModel = this.myModel;
                    //thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                    var minimizations_1 = [];
                    if (addReport) {
                        this.myWorkflowContext.getValue("minimizations").split(';').forEach(function (min) {
                            var minimization = { minimization: min };
                            minimizations_1.push(minimization);
                        });
                    }
                    var reportMetaInfo = {
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
                        minimizations: addReport ? minimizations_1 : workflowContext.minimizations,
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
                        exports.oeSageGrouseDevSitingReports.splice(0, 0, reportMetaInfo);
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
        ;
        return OE_SageGrouseDevSitingViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_SageGrouseDevSitingViewModel = OE_SageGrouseDevSitingViewModel;
});

},
"url:/geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingCompareSummaryView.html": markup1,
"url:/geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingDashboardView.html": markup2,
"url:/geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingSummaryView.html": markup3,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingModule.css", "css", "ZmllbGRzZXQgew0KICAgIGJvcmRlcjogc29saWQgMXB4ICNhN2E3YTc7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIG1hcmdpbjogNXB4IDA7DQogICAgcGFkZGluZzogMC4xMGVtIDAuNzVlbSAwLjZlbSAwLjc1ZW0gIWltcG9ydGFudDsNCn0NCg0KLmZvcm0taXRlbSB7DQogICAgcGFkZGluZzogLjFlbSAwLjFlbSAwLjFlbSAwOw0KfQ0KDQpsZWdlbmQgew0KICAgIGZvbnQtc2l6ZTogMS4yZW07DQogICAgcGFkZGluZzogMTBweDsNCn0NCg0KI2J0bi1yb3d7DQogICAgZGlzcGxheTp0YWJsZTsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KI2J0bi1yb3ctY29tcGFyZXsNCiAgICBkaXNwbGF5OnRhYmxlOw0KICAgIHdpZHRoOjEwMCU7DQogICAgbWFyZ2luLXRvcDo1cHg7DQp9DQojYnRuLXJvdy1jb21wYXJlIC5jZWxsew0KICAgIGRpc3BsYXk6dGFibGUtY2VsbDsNCiAgICBwYWRkaW5nOjZweDsNCn0NCg0KICAgIC5idG4tY2VsbCB7DQogICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7DQogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICB9DQogICAgLmJ0bi1jZWxsIGRpdjpmaXJzdC1jaGlsZCwgI2J0bi1yb3ctY29tcGFyZSBkaXY6Zmlyc3QtY2hpbGQgew0KICAgICAgICB3aWR0aDogODAlOw0KICAgICAgICBwYWRkaW5nOiAxMHB4Ow0KICAgICAgICBjb2xvcjogd2hpdGU7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjYsIDExNCwgMTk2LCAxKTsNCiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgICAgICBtYXJnaW46IDEwcHg7DQogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICB9DQoNCiAgICAgICAgLmJ0bi1jZWxsIGRpdjpob3ZlciwgI2J0bi1yb3ctY29tcGFyZSAuY2VsbDpob3ZlciB7DQogICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5idG4tY2VsbCBkaXY6aG92ZXIgew0KICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExLCA1MCwgODcpOw0KICAgICAgICB9DQoNCi5kYXNoYm9hcmQtdmlldyBidXR0b246ZGlzYWJsZWR7DQogICAgcGFkZGluZzogLjVlbTsNCiAgICBvdXRsaW5lOiBub25lOw0KICAgIGJhY2tncm91bmQ6ICNGNUY1RjU7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0NDQ0NDQzsNCiAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtOw0KICAgIGZvbnQtd2VpZ2h0OiA2MDA7DQogICAgY29sb3I6ICNDQ0NDQ0M7DQogICAgYm94LXNoYWRvdzogMDsNCn0NCi5idG4tY2VsbC1kb3dubG9hZCB7DQogICAgd2lkdGg6MTAwJSAhaW1wb3J0YW50Ow0KfQ0KDQouYnRuLWNlbGwtZG93bmxvYWQ6aG92ZXJ7DQogICAgY3Vyc29yOnBvaW50ZXI7DQogICAgdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsNCn0NCg0KLmJ0bi1jZWxsLWRvd25sb2FkIGRpdnsNCiAgICBmbG9hdDpsZWZ0Ow0KICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzgwODA4MDsNCiAgICBwYWRkaW5nLWxlZnQ6MTNweDsNCn0NCiAgIA0KDQouYnRuLWNlbGwtZG93bmxvYWQgZGl2OmZpcnN0LWNoaWxkew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBwYWRkaW5nLXJpZ2h0OjIwcHg7DQp9DQogICANCg0KI2NoYXJ0LXdyYXBwZXJ7DQogICAgd2lkdGg6MTAwJTsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCn0NCg0KLmRhdGEtbGFiZWx7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCg0KLmRhc2hib2FyZC12aWV3IHVsIGxpew0KICAgIGxpc3Qtc3R5bGU6bm9uZTsNCiAgICBtYXJnaW4tYm90dG9tOjEwcHg7DQogICAgYm9yZGVyLXRvcDpkYXNoZWQgMXB4ICM4MDgwODA7DQogICAgcGFkZGluZy1ib3R0b206MTBweDsNCn0NCg0KLmRhc2hib2FyZC12aWV3IHVsIGxpOmZpcnN0LWNoaWxkew0KICAgIGJvcmRlci10b3A6bm9uZTsNCn0NCg0KLyogVGhlIGNvbnRhaW5lciAqLw0KLmNvbnRhaW5lciB7DQogICAgZGlzcGxheTogYmxvY2s7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIHBhZGRpbmctbGVmdDogMzVweDsNCiAgICAvKm1hcmdpbi1ib3R0b206IDEycHg7Ki8NCiAgICBtYXJnaW4tbGVmdDotMzVweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgZm9udC1zaXplOiAxOHB4Ow0KICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7DQogICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsNCiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7DQogICAgdXNlci1zZWxlY3Q6IG5vbmU7DQp9DQoNCi8qIEhpZGUgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGNoZWNrYm94ICovDQouY29udGFpbmVyIGlucHV0IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgb3BhY2l0eTogMDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi8qIENyZWF0ZSBhIGN1c3RvbSBjaGVja2JveCAqLw0KLmNoZWNrbWFyayB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHRvcDogMDsNCiAgICBsZWZ0OiAwOw0KICAgIGhlaWdodDogMjBweDsNCiAgICB3aWR0aDogMjBweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlOw0KICAgIGJvcmRlcjpzb2xpZCAzcHggIzgwODA4MDsNCn0NCg0KLyogT24gbW91c2Utb3ZlciwgYWRkIGEgZ3JleSBiYWNrZ3JvdW5kIGNvbG9yICovDQouY29udGFpbmVyOmhvdmVyIGlucHV0IH4gLmNoZWNrbWFyayB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYzsNCn0NCg0KLyogV2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZCwgYWRkIGEgYmx1ZSBiYWNrZ3JvdW5kICovDQouY29udGFpbmVyIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWE3MmM0Ow0KfQ0KDQovKiBDcmVhdGUgdGhlIGNoZWNrbWFyay9pbmRpY2F0b3IgKGhpZGRlbiB3aGVuIG5vdCBjaGVja2VkKSAqLw0KLmNoZWNrbWFyazphZnRlciB7DQogICAgY29udGVudDogIiI7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi8qIFNob3cgdGhlIGNoZWNrbWFyayB3aGVuIGNoZWNrZWQgKi8NCi5jb250YWluZXIgaW5wdXQ6Y2hlY2tlZCB+IC5jaGVja21hcms6YWZ0ZXIgew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KfQ0KDQovKiBTdHlsZSB0aGUgY2hlY2ttYXJrL2luZGljYXRvciAqLw0KLmNvbnRhaW5lciAuY2hlY2ttYXJrOmFmdGVyIHsNCiAgICAvKmxlZnQ6IDlweDsNCiAgICB0b3A6IDVweDsqLw0KICAgIGxlZnQ6IDdweDsNCiAgICB0b3A6IDJweDsNCiAgICB3aWR0aDogNXB4Ow0KICAgIGhlaWdodDogMTBweDsNCiAgICBib3JkZXI6IHNvbGlkIHdoaXRlOw0KICAgIGJvcmRlci13aWR0aDogMCAzcHggM3B4IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7DQogICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTsNCiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7DQp9DQoNCg0KDQogICAgLnNob3ctaGlkZS13cmFwcGVyew0KICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB9DQogICAgLnNob3ctaGlkZS13cmFwcGVyIGRpdnsNCiAgICAgICAgZmxvYXQ6bGVmdDsNCiAgICB9DQoNCi5zaG93LWhpZGV7DQogICAgcGFkZGluZy10b3A6NHB4Ow0KICAgIGZvbnQtc2l6ZTouOGVtOw0KICAgIGNvbG9yOiM4MDgwODA7DQp9DQogICAgLnNob3ctaGlkZTpob3ZlciB7DQogICAgICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIH0NCg0KLnByb2plY3QtdGl0bGUtd3JhcHBlcnsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB3aWR0aDoxMDAlOw0KDQp9DQoNCi5wcm9qZWN0LWNoZWNrYm94LXdyYXBwZXJ7DQogICAgZmxvYXQ6bGVmdDsNCn0NCg0KLnRvZ2dsZS13cmFwcGVyew0KICAgIGZsb2F0OmxlZnQ7DQogICAgbWFyZ2luLWxlZnQ6MTBweDsNCiAgICBtYXJnaW4tdG9wOjNweDsNCn0NCi5vZV9jbGVhcnsNCiAgICBmbG9hdDpub25lOw0KICAgIGNsZWFyOmJvdGg7DQogICAgaGVpZ2h0OjBweDsNCn0NCg0KLnByb2plY3QtaGlnaGxpZ2h0c3sNCiAgICBjb2xvcjojODA4MDgwOw0KICAgIG1hcmdpbi10b3A6MTBweDsNCiAgICBmb250LXNpemU6LjllbTsNCn0NCg0KLmltZ19jaGFydHsNCiAgICBtYXJnaW4tYm90dG9tOiAtOHB4Ow0KfQ0KDQoucm93ew0KICAgIHdpZHRoOjEwMCU7DQogICAgcG9zaXRpb246cmVsYXRpdmU7DQp9DQouc2l0aW5nX2NvbXBhcmVfY29sew0KICAgIHdpZHRoOjQxJTsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICBmbG9hdDpsZWZ0Ow0KICAgIHBhZGRpbmc6MCAyNXB4Ow0KICAgIGJvcmRlci1yaWdodDoycHggc29saWQgIzgwODA4MDsNCn0NCg0KLnNpdGluZ19jb21wYXJlX2NvbDpsYXN0LWNoaWxkew0KICAgIGJvcmRlci1yaWdodDpub25lOw0KfQ0KDQoNCi5yZXBvcnRfYXJlYXsNCiAgICBtYXgtd2lkdGg6NjAwcHg7DQp9DQoNCi5yZXBvcnRfYXJlYSAuY29tcGFyZXsNCiAgICAvKm1heC13aWR0aDo4MDBweDsqLw0KfQ0KDQoucHJpbnR7DQogICB0ZXh0LWFsaWduOnJpZ2h0Ow0KICAgcGFkZGluZzoxMHB4IDIwcHg7DQp9DQoNCi5wcmludDpob3ZlcnsNCiAgICBjdXJzb3I6cG9pbnRlcjsNCiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KfQ0KDQoucmVwb3J0X2FjdGlvbl9saW5rX3dyYXBwZXJ7DQogICAgZmxvYXQ6bGVmdDsNCiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCAjYTdhN2E3Ow0KICAgIHBhZGRpbmc6IDVweCAwOw0KfQ0KDQoucmVwb3J0X2FjdGlvbl9saW5rew0KICAgIGZsb2F0OmxlZnQ7DQogICAgcGFkZGluZzowIDEwcHg7DQogICAgYm9yZGVyLWxlZnQ6c29saWQgMXB4ICNhN2E3YTc7DQogICAgZm9udC1zaXplOi45ZW07DQp9DQoNCiAgICAucmVwb3J0X2FjdGlvbl9saW5rOmZpcnN0LWNoaWxkIHsNCiAgICAgICAgcGFkZGluZy1sZWZ0OjBweDsNCiAgICAgICAgYm9yZGVyLWxlZnQ6bm9uZTsNCiAgICB9DQoNCg0KLnJlcG9ydF9hY3Rpb25fbGluazpob3ZlcnsNCiAgICBjdXJzb3I6cG9pbnRlcjsNCiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KfQ0KDQoucmVwb3J0X2FjdGlvbl9saW5rIGltZ3sNCiAgICB3aWR0aDogMTZweDsNCn0NCg0KLmRvd25sb2FkX29wdGlvbl93cmFwcGVyew0KICAgIGJhY2tncm91bmQtY29sb3I6I2NjYzsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBwb3NpdGlvbjphYnNvbHV0ZTsNCn0NCg0KLmRvd25sb2FkX29wdGlvbl93cmFwcGVyIHVsIGxpew0KICAgIGxpc3Qtc3R5bGU6c3F1YXJlOw0KICAgIHBhZGRpbmc6MnB4Ow0KICAgIG1hcmdpbjozcHg7DQp9DQoNCi5kaXNjbGFpbWVyew0KICAgIGZvbnQtc2l6ZTouOGVtOw0KfQ0KDQoNCi50cmlnZ2VyLW1zZy13cmFwcGVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlY2U1Ow0KICAgIHdpZHRoOiA5NSU7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDRweDsNCn0NCi5kZXYtcnVsZSB7DQogICAgdGV4dC1pbmRlbnQ6IGVhY2gtbGluZSAxMHB4Ow0KICAgIGZvbnQtc2l6ZTogLjllbTsNCiAgICBjb2xvcjogIzI4MjcyNzsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgZm9udC1zdHlsZTogaXRhbGljOw0KICAgIG1hcmdpbi1sZWZ0OiAxMHB4Ow0KICAgIC8qbGluZS1oZWlnaHQ6IC45ZW07Ki8NCn0NCg0KLmhhYi1hcmVhew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIGZvbnQtc3R5bGU6IGl0YWxpYzsNCn0NCg0KLmhhYi1hcmVhLm5vLWhhYi1hcmVhew0KICAgIGNvbG9yOiMyOTU4MTA7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCg0KLmhhYi1hcmVhLmFsbC1oYWItYXJlYXsNCiAgICBjb2xvcjojNzEwZjBmOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi5wbGFjZW1lbnQtbXNnew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIHBhZGRpbmc6LjVlbTsNCn0NCg0KLnByb21vdGVkLWJ0bnsNCiAgICBmb250LXdlaWdodDpib2xkZXI7ICAgIA0KfQ0KDQouc3ViLXNlY3Rpb24td3JhcHBlcnsNCiAgICBtYXJnaW4tbGVmdDoxNXB4Ow0KfQ0KLnN1Yi1zZWN0aW9uLWhlYWRlcnsNCiAgICBmb250LXdlaWdodDpib2xkZXI7ICAgIA0KfQ0KDQouZGV2LXR5cGUtZGV0YWlsc3sNCiAgICBtYXJnaW4tbGVmdDogMTIwcHg7DQogICAgZm9udC1zaXplOi45ZW07DQogICAgY29sb3I6IzMwMmYyZjsNCn0=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingCompareSummaryView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingDashboardView.html", "html", markup2);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseDevSiting/OE_SageGrouseDevSitingSummaryView.html", "html", markup3);
});

})();
