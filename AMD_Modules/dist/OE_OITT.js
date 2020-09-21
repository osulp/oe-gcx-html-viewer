
// Module 'OE_OITT'
        (function () {
var markup1 = '<div class=\'oe_owrtAreaReport-module-view\'>    <div class=\'oeOWRTReportLoading\' data-binding=\'{@visible: loaderVisible}\'>        <img data-binding=\'{@visible: loaderSpinner}\' src=\'Resources/Images/Custom/project_loader.gif\' />        <img data-binding=\'{@visible: loaderWarnIcon}\' src=\'Resources/Images/Custom/warning.png\' />        <div class=\'oeOWRTwarningMessage\' data-binding=\'{@text: loaderMessage}\'>Loading report...</div>        <div data-binding=\'{@visible: inputBlockOnError}\' class=\'oeOWRTerrorInput\'>            <div>Try again?  If this error persists please contact the site admin.</div>            <button data-binding=\'{@event-onclick: reportOptionsSubmission}\'>Get Report</button>        </div>    </div>    <div class=\'oeOWRTOptions\'>        <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleReportOptionPanel}\'>            <img data-binding=\'{src: optionsImageSrc}\' src=\'Resources/Images/Icons/arrow-right-small-24.png\' />            <span>Options</span>        </a>    </div>    <div class=\'oeOWRTOptionsPanel\' data-binding=\'{@visible: reportOptionsPanelVisible}\'>        <table class=\'oeOWRTOptionsTable\'>            <tr>                <td>                    <h1>Select Geography Type</h1>                    <select data-binding=\'{@source: geoTypeList}{@event-onchange: geoTypeChanged}{@value: geoTypeValue}\'>                        <option data-binding=\'{@template-for: geoTypeList}{value: value}{@text: name}\'></option>                    </select>                </td>                <td>                    <h1>Select Report Area</h1>                    <h2 data-binding=\'{@text:geoTypeName}\'>Geo Type</h2>                    <select data-binding=\'{@source: reportAreaList}{@visible: reportAreaListVisible}{@event-onchange: areaOptionChanged}{@value: areaNameSelected}\'>                        <option data-binding=\'{@template-for: reportAreaList}{value: value}{@text: name}\'></option>                    </select>                </td>                <td>                    <h1>Select Year(s)</h1>                    <div>                        Year Range: <span input data-binding=\'{@text:startYear}\'></span> - <span data-binding=\'{@text:endYear}\'></span>                        <div class=\'owrtYearSlider\'>                            <input value=\'2014\' />                            <input value=\'2019\' />                        </div>                    </div>                </td>                <td>                    <h1>Generate New Report</h1>                    <button data-binding=\'{@event-onclick: reportOptionsSubmission}\'>Get Report</button>                </td>            </tr>        </table>    </div>    <div class=\'oeOWRTAreaQueryInfo\'>        <div data-binding=\'{@text: geoTypeName}\'></div>        <div data-binding=\'{@text: areaName}{@visible: areaNameVisisble}\'></div>        <div data-binding=\'{@text: yearRangeString}\'></div>    </div>    <div class=\'oeOWRTAreaTabs\'>        <div data-binding=\'{className: tabOverviewClass}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabOverview}\'>Overview</a></div>        <div data-binding=\'{className: tabProjectsClass}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabProjects}\'>Projects</a></div>        <div data-binding=\'{className: tabFundingClass}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabFunding}\'>Funding</a></div>    </div>    <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelOverview\' data-binding=\'{@visible: areaPanelOverviewVisisble}\'>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <fieldset>                <legend>Total Number of Projects</legend>                <h1 data-binding=\'{@text:areaTotalProjects}\'>0</h1>                            </fieldset>            <fieldset>                <legend>Total Investment</legend>                <h1 data-binding=\'{@text:areaTotalInvestment}\'>0</h1>                            </fieldset>                    </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text: areaMapLegend}\'>Map</legend>                <div id=\'oeOWRTAreaMap\'></div>            </fieldset>        </div>    </div>    <div class=\'owrtChartsTableContainer\' data-binding=\'{@visible: oittChartsTableContainerVisible}\'>        <table class=\'owrtChartTableShared owrtChartTables\' data-binding=\'{@visible: oittChartsTableSharedVisible}\'>            <thead>                <tr>                    <th class=\'owrtChartsTableProjectsName\' data-binding=\'{@text: oittTableHdrName}\'></th>                    <th class=\'owrtChartsTableProjectsValue\' data-binding=\'{@text: oittTableHdrValue}\'></th>                </tr>            </thead>            <tbody data-binding=\'{@source: oittTableData}\'>                <tr data-binding=\'{@template-for: oittTableData}\'>                    <td data-binding=\'{@text: name}\'></td>                    <td data-binding=\'{@text: value}{data-sort-value: data-sort-value}\'></td>                </tr>            </tbody>        </table>        <table class=\'owrtChartTableFundInvestByYear owrtChartTables\' data-binding=\'{@visible: oittChartsTableFundYearVisible}\'>            <thead>                <tr>                    <th class=\'owrtChartsTableProjectsName\'>Year</th>                    <th class=\'owrtChartsTableProjectsValue\'>Funding</th>                    <th class=\'owrtChartsTableProjectsValue\'>Federal</th>                    <th class=\'owrtChartsTableProjectsValue\'>Total</th>                </tr>            </thead>            <tbody data-binding=\'{@source: oittTableDataFundInvestByYear}\'>                <tr data-binding=\'{@template-for: oittTableDataFundInvestByYear}\'>                    <td data-binding=\'{@text: year}\'></td>                    <td data-binding=\'{@text: cash}{data-sort-value: cashForSort}\'></td>                    <td data-binding=\'{@text: inkind}{data-sort-value: inkindForSort}\'></td>                    <td data-binding=\'{@text: total}{data-sort-value: totalForSort}\'></td>                </tr>            </tbody>        </table>        <table class=\'owrtChartTableFundInvestByActByYear owrtChartTables\' data-binding=\'{@visible: oittChartsTableFundTypeYearVisible}\'>            <thead>                <tr data-binding=\'{@source: oittTableDataFundInvestByTypeByYearHeaders}\'>                    <th data-binding=\'{@template-for: oittTableDataFundInvestByTypeByYearHeaders}{@text: n}\'></th>                </tr>            </thead>            <tbody data-binding=\'{@source: oittTableDataFundInvestByTypeByYear}\'>                <tr data-binding=\'{@template-for: oittTableDataFundInvestByTypeByYear}\'>                    <td data-binding=\'{@text: year}\'></td>                    <td data-binding=\'{@text: Acquisition}{data-sort-value: AcquisitionSort}\'></td>                    <td data-binding=\'{@text: Assessment}{data-sort-value: AssessmentSort}\'></td>                    <td data-binding=\'{@text: Council Support}{data-sort-value: Council SupportSort}\'></td>                    <td data-binding=\'{@text: Education}{data-sort-value: EducationSort}\'></td>                    <td data-binding=\'{@text: Effectiveness Monitoring}{data-sort-value: Effectiveness MonitoringSort}\'></td>                    <td data-binding=\'{@text: Monitoring}{data-sort-value: MonitoringSort}\'></td>                    <td data-binding=\'{@text: Outreach}{data-sort-value: OutreachSort}\'></td>                    <td data-binding=\'{@text: OWEB Administration}{data-sort-value: OWEB AdministrationSort}\'></td>                    <td data-binding=\'{@text: Research}{data-sort-value: ResearchSort}\'></td>                    <td data-binding=\'{@text: Restoration}{data-sort-value: RestorationSort}\'></td>                    <td data-binding=\'{@text: Stakeholder Engagement}{data-sort-value: Stakeholder EngagementSort}\'></td>                    <td data-binding=\'{@text: SWCD}{data-sort-value: SWCDSort}\'></td>                    <td data-binding=\'{@text: Technical Assistance}{data-sort-value: Technical AssistanceSort}\'></td>                    <td data-binding=\'{@text: Water Acquisition}{data-sort-value: Water AcquisitionSort}\'></td>                </tr>            </tbody>        </table>            </div>    <div class=\'owrtChartTableToggleLink\' data-binding=\'{@visible: oittChartTableLinkVisible}\'>        <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleChartDataAsTable}\'>            <img data-binding=\'{src: oittTableLinkImg}\' src=\'Resources/Images/Icons/charting-24.png\' /><span data-binding=\'{@text:oittTableLinkText}\'>View Table</span>        </a>    </div>    <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelProjects\' data-binding=\'{@visible: areaPanelProjectsVisisble}\'>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <div class=\'oeOWRTAreaChartSelectBox\'>                <div data-binding=\'{className: oittProjChartYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleProjectsChartYear}\'># of Projects By Year</a>                </div>                <div data-binding=\'{className: oittProjChartTypeClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleProjectsChartActivity}\'># of Projects By Type</a>                </div>            </div>        </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text:projectChartLegendText}\' data-content=\'\'>Title of Current Chart</legend>                <div class=\'oeOWRTAreaProjectChart\' data-region-name=\'oeOWRTAreaProjectsChart\'></div>            </fieldset>        </div>    </div>    <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelFunding\' data-binding=\'{@visible: areaPanelFundingVisisble}\'>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <div class=\'oeOWRTAreaChartSelectBox\'>                <div data-binding=\'{className: oittFundingChartTotalClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartTotal}\'>Total Investment in Projects</a>                </div>                <div data-binding=\'{className: oittFundingChartYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartYear}\'>Investments By Year</a>                </div>                <div data-binding=\'{className: oittFundingChartTypeClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartType}\'>Investments By Type</a>                </div>                <div data-binding=\'{className: oittFundingChartTypeYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartTypeYear}\'>Investments By Type By Year</a>                </div>                            </div>        </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text:fundingChartLegendText}\' data-content=\'\'>Title of Current Chart</legend>                <div class=\'oeOWRTAreaFundingChart\' data-region-name=\'oeOWRTAreaFundingChart\'></div>            </fieldset>        </div>    </div>    </div>';

require({
    cache: {
        "geocortex/oe_amd/OE_OITT/OE_JsonAdapter": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.Infrastructure.AMD.d.ts"/>
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
define(["require", "exports", "geocortex/charting/infrastructure/ChartPointAdapterBase", "geocortex/charting/infrastructure/Enums", "geocortex/charting/infrastructure/ChartUtils", "geocortex/charting/infrastructure/ChartPointCollection"], function (require, exports, ChartPointAdapterBase_1, Enums_1, ChartUtils_1, ChartPointCollection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_ChartPointJsonAdapter = /** @class */ (function (_super) {
        __extends(OE_ChartPointJsonAdapter, _super);
        function OE_ChartPointJsonAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Gets the value that corresponds to the supplied field in the data source.
        */
        OE_ChartPointJsonAdapter.prototype.getFieldValue = function (fieldDefinition, sourceItem, userState) {
            // Ensure we are dealing with the correct source type.
            if (!fieldDefinition || fieldDefinition.sourceType != Enums_1.ChartFieldSourceType.Json) {
                return null;
            }
            // Lookup the value in the supplied JSON object.  For example, if the field name is "year", return the value of sourceItem.year.
            if (sourceItem && sourceItem.hasOwnProperty(fieldDefinition.name)) {
                return sourceItem[fieldDefinition.name];
            }
            // No value found
            return null;
        };
        /**
         * Creates a ChartPoint instance from the provided source data item.
         */
        OE_ChartPointJsonAdapter.prototype.createChartPoint = function (sourceItem, options, userState) {
            if (!options || !options.chartCategory || !options.chartSeries) {
                return null;
            }
            if (options.chartType == null || typeof options.chartType === "undefined") {
                options.chartType = Enums_1.ChartType.Linear;
            }
            var seriesFieldValue = this.getFieldValue(options.chartSeries.field, sourceItem, userState);
            var categoryFieldValue = null;
            // If a category has been set, then try and grab the field value. Pie charts have no category (x-axis).
            if (options.chartType == Enums_1.ChartType.Linear) {
                categoryFieldValue = ChartUtils_1.ChartUtils.tryGetFieldValue(options.chartCategory.field, sourceItem, userState);
            }
            // Call base class helper method to create a chart point. Pass in the values for the series (y-axis) and category (x-axis).
            return this.createChartPointCore(sourceItem, options.chartSeries.title, seriesFieldValue, categoryFieldValue, options, userState);
        };
        /**
         * Adds ChartPoint items to the collection to match those in the data source.
         */
        OE_ChartPointJsonAdapter.prototype.fill = function (collection, source, options) {
            if (!options || !options.chartCategory || !options.chartSeries) {
                return;
            }
            if (!source || !(source instanceof Array)) {
                return;
            }
            var sourceArray = source;
            // Initialize with an empty collection if needed.
            if (!collection) {
                collection = new ChartPointCollection_1.ChartPointCollection();
            }
            for (var _i = 0, sourceArray_1 = sourceArray; _i < sourceArray_1.length; _i++) {
                var item = sourceArray_1[_i];
                // Convert raw source data into ChartPoints that can be plotted on a chart.
                var chartPoint = this.createChartPoint(item, options);
                if (chartPoint) {
                    collection.items.push(chartPoint);
                }
            }
        };
        return OE_ChartPointJsonAdapter;
    }(ChartPointAdapterBase_1.ChartPointAdapterBase));
    exports.OE_ChartPointJsonAdapter = OE_ChartPointJsonAdapter;
    geocortex.charting.ChartFieldSourceType[100] = "Json";
    geocortex.charting.ChartFieldSourceType["Json"] = 100;
});

},
"geocortex/oe_amd/OE_OITT/OE_OITTModule": function () {
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
    var OE_OITTModule = /** @class */ (function (_super) {
        __extends(OE_OITTModule, _super);
        function OE_OITTModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_OITTModule.prototype.initialize = function (config) {
        };
        return OE_OITTModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_OITTModule = OE_OITTModule;
});

},
"geocortex/oe_amd/OE_OITT/OE_OITTView": function () {
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
    var OE_OITTView = /** @class */ (function (_super) {
        __extends(OE_OITTView, _super);
        function OE_OITTView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_OITTView.prototype.toggleReportOptionPanel = function (event, element, context) {
            var val = context.reportOptionsPanelVisible.get();
            context.reportOptionsPanelVisible.set(!val);
            context.ToggleOptionsArrow(val);
        };
        OE_OITTView.prototype.geoTypeChanged = function (event, element, context) {
            context.OptionsGeoTypeChanged(element.value, element.selectedOptions[0].label);
        };
        OE_OITTView.prototype.areaOptionChanged = function (event, element, context) {
            context.OptionsAreaChanged(element.value, element.selectedOptions[0].label);
        };
        OE_OITTView.prototype.toggleChartDataAsTable = function (event, element, context) {
            context.ToggleChartTableView();
        };
        OE_OITTView.prototype.reportOptionsSubmission = function (event, element, context) {
            context.ReportOptionsSubmission();
        };
        OE_OITTView.prototype.toggleTabOverview = function (event, element, context) {
            context.LoadOverviewTab();
        };
        OE_OITTView.prototype.toggleTabProjects = function (event, element, context) {
            context.LoadProjectsTab();
        };
        OE_OITTView.prototype.toggleTabFunding = function (event, element, context) {
            context.LoadFundingTab();
        };
        OE_OITTView.prototype.toggleProjectsChartYear = function (event, element, context) {
            context.ShowChart("projects", "year");
        };
        OE_OITTView.prototype.toggleProjectsChartActivity = function (event, element, context) {
            context.ShowChart("projects", "type");
        };
        OE_OITTView.prototype.toggleFundingChartTotal = function (event, element, context) {
            context.ShowChart("funding", "total");
        };
        OE_OITTView.prototype.toggleFundingChartYear = function (event, element, context) {
            context.ShowChart("funding", "year");
        };
        OE_OITTView.prototype.toggleFundingChartType = function (event, element, context) {
            context.ShowChart("funding", "type");
        };
        OE_OITTView.prototype.toggleFundingChartTypeYear = function (event, element, context) {
            context.ShowChart("funding", "typeYear");
        };
        return OE_OITTView;
    }(ViewBase_1.ViewBase));
    exports.OE_OITTView = OE_OITTView;
});

},
"geocortex/oe_amd/OE_OITT/OE_OITTViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework/observables", "geocortex/charting/Chart", "geocortex/charting/infrastructure/Enums"], function (require, exports, ViewModelBase_1, observables_1, observables_2, Chart_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_QuerySequenceTask = /** @class */ (function () {
        function OE_QuerySequenceTask(qt, queryIn, listenersIn, relationshipQuery, isIDQueryIn, isCountQueryIn, largeRequestIn, isDistinctIn) {
            if (relationshipQuery === void 0) { relationshipQuery = false; }
            if (isIDQueryIn === void 0) { isIDQueryIn = false; }
            if (isCountQueryIn === void 0) { isCountQueryIn = false; }
            if (largeRequestIn === void 0) { largeRequestIn = null; }
            if (isDistinctIn === void 0) { isDistinctIn = false; }
            this.queryTask = qt;
            this.query = queryIn;
            this.isRelationshipsQuery = relationshipQuery;
            this.isIDQuery = isIDQueryIn;
            this.largeRequest = largeRequestIn;
            this.listeners = listenersIn;
            this.isCountQuery = isCountQueryIn;
            this.isDistinct = isDistinctIn;
        }
        return OE_QuerySequenceTask;
    }());
    exports.OE_QuerySequenceTask = OE_QuerySequenceTask;
    var OE_LargeRecordRequest = /** @class */ (function () {
        function OE_LargeRecordRequest() {
            this.maxRecordCount = 0;
            this.totalRecords = 0;
            this.isDistinct = false;
            this.queryGeometry = null;
            this.workingOffset = 0;
        }
        OE_LargeRecordRequest.prototype.SetupRequest = function (urlIn, whereIn, queryGeometryIn, fieldNamesIn, logNameIn, onCompleteIn, modelRefIn, targetFeatureSetIn, isDistinctIn) {
            if (isDistinctIn === void 0) { isDistinctIn = false; }
            this.url = urlIn;
            this.fieldnames = fieldNamesIn;
            this.where = whereIn;
            this.queryGeometry = queryGeometryIn;
            this.allFeatures = null;
            this.logName = logNameIn;
            this.workingOffset = 0;
            this.isDistinct = isDistinctIn;
            this.errors = "";
            this.onComplete = onCompleteIn;
            this.modelRef = modelRefIn;
            this.targetFeatureSet = targetFeatureSetIn;
        };
        OE_LargeRecordRequest.prototype.StartRequest = function () {
            this._GetMaxeRecordCount(this.url);
        };
        OE_LargeRecordRequest.prototype._GetMaxeRecordCount = function (queryUrl) {
            //MaxRecordCount (get from config)
            var esriRequest = esri.request({
                url: queryUrl,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback"
            });
            var thisRef = this;
            esriRequest.then(function (response) {
                //console.log("MaxRecordCount Request: " + response);
                thisRef.maxRecordCount = response.maxRecordCount;
                thisRef._GetTotalRecords(thisRef.url);
            }, function (error) {
                console.log(error);
                thisRef.modelRef.StopOnErrorMessage("Max query size failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + error);
            });
        };
        OE_LargeRecordRequest.prototype._GetTotalRecords = function (queryUrl) {
            var query = new esri.tasks.Query();
            if (this.queryGeometry != null)
                query.geometry = this.queryGeometry;
            query.where = this.where;
            query.returnGeometry = false;
            var queryTask = new esri.tasks.QueryTask(this.url);
            var thisRef = this;
            queryTask.on("execute-for-count-complete", function (event) {
                if (event.count > 0) {
                    thisRef.totalRecords = event.count;
                    thisRef._DoQueryLoop(thisRef.url);
                }
                else {
                    console.log("Count is zero or null.");
                    thisRef.totalRecords = 0;
                    thisRef._DoQueryLoop(thisRef.url);
                }
            });
            queryTask.on("error", function (event) {
                console.log(event.target.url);
                console.log(event.error);
                thisRef.modelRef.StopOnErrorMessage("Count failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
            });
            queryTask.executeForCount(query);
        };
        OE_LargeRecordRequest.prototype._DoQueryLoop = function (queryUrl) {
            var query = new esri.tasks.Query();
            if (this.queryGeometry != null) {
                query.geometry = this.queryGeometry;
                //query.geometryPrecision
                //query.maxAllowableOffset
            }
            query.where = this.where;
            query.returnGeometry = false;
            query.outFields = this.fieldnames;
            query.start = this.workingOffset;
            query.num = this.maxRecordCount;
            query.returnDistinctValues = this.isDistinct;
            var queryTask = new esri.tasks.QueryTask(this.url);
            var thisRef = this;
            var onSuccess = queryTask.on("complete", function (event) {
                if (typeof event != "undefined" && typeof event.featureSet != "undefined") {
                    //thisRef.allFeatureSets.push(response);
                    if (thisRef.allFeatures == null)
                        thisRef.allFeatures = event.featureSet.features;
                    else
                        thisRef.allFeatures = thisRef.allFeatures.concat(event.featureSet.features);
                    thisRef._CheckIfLoopIsDone();
                }
                else {
                    console.log("Query failed.");
                    console.log(event.target.url);
                    thisRef.modelRef.StopOnErrorMessage("Query loop failed: no event or featureset.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet);
                }
            });
            var onError = queryTask.on("error", function (event) {
                console.log(event.target.url);
                console.log(event.error);
                thisRef.modelRef.StopOnErrorMessage("Query loop failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
            });
            this.listeners = [onSuccess, onError];
            queryTask.execute(query);
        };
        OE_LargeRecordRequest.prototype._CheckIfLoopIsDone = function () {
            this.workingOffset += this.maxRecordCount;
            //request more records
            if (this.workingOffset < this.totalRecords) {
                //clear previous listeners
                if (typeof this.listeners !== "undefined" && this.listeners != null) {
                    for (var i = 0; i < this.listeners.length; i++)
                        this.listeners[i].remove();
                }
                this._DoQueryLoop(this.url);
            }
            else //done
             {
                this._AllFinished();
            }
        };
        OE_LargeRecordRequest.prototype._AllFinished = function () {
            //console.log("Total Features: " + this.allFeatures.length);
            if (typeof this.targetFeatureSet !== "undefined" && this.targetFeatureSet != null && this.targetFeatureSet != "")
                this.modelRef[this.targetFeatureSet] = this.allFeatures;
            if (this.onComplete)
                this.onComplete();
        };
        return OE_LargeRecordRequest;
    }());
    exports.OE_LargeRecordRequest = OE_LargeRecordRequest;
    var OE_OITTViewModel = /** @class */ (function (_super) {
        __extends(OE_OITTViewModel, _super);
        function OE_OITTViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.esriPointsLayer = null;
            _this.areaMapLegend = new observables_1.Observable("Map");
            _this.owrtActivitySymbols = [];
            _this.fsSelectedAreaGeometry = null;
            _this.selectedAreaGeometry = null;
            _this.sequenceTasks = [];
            _this.sequenceErrors = "";
            _this.sequenceOnComplete = null;
            _this.sequenceLastTask = null;
            _this.fsBasins = null;
            _this.fsHUC8 = null;
            _this.fsCounty = null;
            _this.fsWSC = null;
            _this.fsSWCD = null;
            _this.fsProjectTypes = null;
            _this.projectsGraphicsArray = null;
            _this.primaryQueryString = new observables_1.Observable("1=1");
            _this.loaderVisible = new observables_1.Observable(true);
            _this.loaderMessage = new observables_1.Observable("Loading Report...");
            _this.loaderSpinner = new observables_1.Observable(true);
            _this.loaderWarnIcon = new observables_1.Observable(false);
            _this.inputBlockOnError = new observables_1.Observable(false);
            _this.requiredFeaturesLoaded = new observables_1.Observable(false);
            _this.toggleReportOptionPanel = new observables_1.Observable(false);
            _this.optionsImageSrc = new observables_1.Observable("Resources/Images/Icons/arrow-right-small-24.png");
            _this.reportOptionsPanelVisible = new observables_1.Observable(false);
            _this.reportAreaListVisible = new observables_1.Observable(false);
            _this.reportAreaList = new observables_2.ObservableCollection(null);
            _this.minYear = 1999;
            _this.maxYear = 2019;
            _this.startYearDefault = 2014;
            _this.endYearDefault = 2019;
            _this.startYear = new observables_1.Observable(_this.startYearDefault.toString());
            _this.endYear = new observables_1.Observable(_this.endYearDefault.toString());
            _this.yearRangeString = new observables_1.Observable("");
            _this.geoTypeList = new observables_2.ObservableCollection([]);
            _this.geoTypeName = new observables_1.Observable("State");
            _this.geoTypeValue = new observables_1.Observable("state");
            _this.geoTypeGeometryLayerDef = new observables_1.Observable("");
            _this.areaNameVisisble = new observables_1.Observable(false);
            _this.areaName = new observables_1.Observable("");
            _this.areaNameSelected = new observables_1.Observable("");
            _this.areaNamePointsQueryString = new observables_1.Observable("1=1");
            _this.areaNamePolyQueryString = new observables_1.Observable("");
            //tabs
            _this.tabOverviewClass = new observables_1.Observable("oittAreaTabEnabled");
            _this.tabProjectsClass = new observables_1.Observable("");
            _this.tabFundingClass = new observables_1.Observable("");
            _this.oittProjChartYearClass = new observables_1.Observable("oittChartSelectionBoxSelected");
            _this.oittProjChartTypeClass = new observables_1.Observable("");
            _this.oittFundingChartTotalClass = new observables_1.Observable("oittChartSelectionBoxSelected");
            _this.oittFundingChartYearClass = new observables_1.Observable("");
            _this.oittFundingChartTypeClass = new observables_1.Observable("");
            _this.oittFundingChartTypeYearClass = new observables_1.Observable("");
            //table view
            _this.oittTableLinkText = new observables_1.Observable("Table View");
            _this.oittTableLinkImg = new observables_1.Observable("Resources/Images/Icons/paging-control-table-24.png");
            _this.oittChartTableLinkVisible = new observables_1.Observable(false);
            _this.oittChartsTableContainerVisible = new observables_1.Observable(false);
            _this.oittChartsTableSharedVisible = new observables_1.Observable(false);
            _this.oittChartsTableFundYearVisible = new observables_1.Observable(false);
            _this.oittChartsTableFundTypeYearVisible = new observables_1.Observable(false);
            //shared table
            _this.oittTableHdrName = new observables_1.Observable("");
            _this.oittTableHdrValue = new observables_1.Observable("");
            _this.oittTableData = new observables_2.ObservableCollection(null); //{"name:"","value":0}    
            //funding invest by year table
            _this.oittTableDataFundInvestByYear = new observables_2.ObservableCollection(null); //{"year:0,"fund":0,"fed":0}    
            //funding invest by act by year table
            _this.oittTableDataFundInvestByTypeByYearHeaders = new observables_2.ObservableCollection(null); //{"n":"Header Name"}
            _this.oittTableDataFundInvestByTypeByYear = new observables_2.ObservableCollection(null); //{"year:0,"river":0,"upland":0,"instream":0.....etc}    
            //panels
            _this.areaPanelOverviewVisisble = new observables_1.Observable(true);
            _this.areaPanelProjectsVisisble = new observables_1.Observable(false);
            _this.areaPanelFundingVisisble = new observables_1.Observable(false);
            //area totals
            _this.areaTotalProjects = new observables_1.Observable("0");
            _this.areaTotalInvestment = new observables_1.Observable("0");
            _this.projectChartLegendText = new observables_1.Observable("");
            _this.fundingChartLegendText = new observables_1.Observable("");
            return _this;
        }
        OE_OITTViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            this.reportMapServiceName = config.reportMapServiceName || "OITT_2016";
            if (site && site.isInitialized) {
                this._onSiteInitialized();
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized();
                });
            }
        };
        OE_OITTViewModel.prototype._onSiteInitialized = function () {
            var _this = this;
            //register tagging command
            this.app.commandRegistry.command("oeOITTAreaReport").register(this, this.OpenAreaReport);
            Chart_1.Chart.prototype.initialize();
            //set default year selection
            var dateTmp = new Date();
            var workingYear = dateTmp.getFullYear();
            if (workingYear > this.endYearDefault)
                workingYear = this.endYearDefault;
            this.startYearDefault = workingYear - 5;
            //this._SetupJQueryTableSort();
            this._injectScript();
            // Register our custom JSON data adapter with the charting infrastructure.
            //let jsonDataAdapter = new OE_ChartPointJsonAdapter();
            //let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
            //ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);
            //let mService = this._GetServiceByName("OWRT");
            //let mService = this._GetServiceByName("OITT_2016");
            var mService = this._GetServiceByName(this.reportMapServiceName);
            this.urlMainMapService = mService.serviceUrl;
            this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "Projects_Cluster_Scales").id);
            this.queryURLProjects = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Projects_Cluster_Scales").id;
            this.queryUrlCounty = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Counties").id;
            this.queryUrlBasins = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Plan Basins").id;
            this.queryUrlHUC8 = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "8-Digit Hydrologic Unit Code").id;
            this.queryUrlWSC = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Watershed Councils").id;
            mService = this._GetServiceByName("Soil and Water Conservation District Boundaries (WM)");
            //this.urlSWCDMapService = mService.serviceUrl;
            this.queryUrlSWCD = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Soil and Water Conservation District Boundaries (WM)").id;
            //create the map symbol
            this.esriMapSymbolFill = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0]), 2), new esri.Color([255, 0, 0, 0.35]));
            //geotype selection list
            this.geoTypeList.clear();
            this.geoTypeList.addItems([
                { "name": "State", "value": "state" },
                { "name": "OWEB Reporting Basin", "value": "basin" },
                { "name": "Subbasin", "value": "subbasin" },
                { "name": "County", "value": "county" },
                { "name": "Watershed Council", "value": "wsc" },
                { "name": "Soil & Water Conservation District", "value": "swcd" }
            ]);
            //get the OWRT drawing color data
            var requestHandle = esri.request({
                "url": this.queryURLProjects + "?f=json",
                handleAs: "json",
                callbackParamName: "callback"
            });
            requestHandle.then(function (response, io) {
                //console.log(response);
                if (response && response.drawingInfo && response.drawingInfo.renderer && response.drawingInfo.renderer.uniqueValueInfos) {
                    _this.owrtActivitySymbols = response.drawingInfo.renderer.uniqueValueInfos;
                }
            }, function (error, io) {
                console.log("OITT symbol request error: " + error);
                _this.owrtActivitySymbols = [];
            });
        };
        OE_OITTViewModel.prototype.deactivated = function () {
            this._destroyAllCharts();
            //remove all map layers
            if (!this._IsNullOrEmpty(this.esriMap))
                this.esriMap.removeAllLayers();
        };
        OE_OITTViewModel.prototype._injectScript = function () {
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/jqueryTableSort.js",
                dataType: "script",
                success: function () {
                    //console.log('success!');
                },
                error: function (err) {
                    //console.log('fail', err);
                }
            });
        };
        OE_OITTViewModel.prototype._GetReportGeometry = function () {
            //clear tasks
            this.sequenceTasks = [];
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._GetReportGeometryDone;
            this._sequenceQuery(this.selectedAreaQueryUrl, this.geoTypeGeometryLayerDef.get(), ["OBJECTID"], "fsSelectedAreaGeometry", "", "Geometry Query", true);
            this._MoveCurrentSequenceProgress();
        };
        OE_OITTViewModel.prototype._GetReportGeometryDone = function () {
            this._GetReportFeatureSets(this.reportWorkingQuery);
        };
        OE_OITTViewModel.prototype._GetRequredFeatureSets = function () {
            //clear tasks
            this.sequenceTasks = [];
            //setup a new sequence        
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._RequiredFeatureSetsDone; //when the follow sequence of queries are done build the relationships
            this._sequenceQuery(this.queryUrlBasins, "1=1", ["oweb_name"], "fsBasins", "", "Basins");
            this._sequenceQuery(this.queryUrlHUC8, "1=1", ["name"], "fsHUC8", "", "HUC8");
            this._sequenceQuery(this.queryUrlCounty, "1=1", ["name10"], "fsCounty", "", "Counties");
            this._sequenceQuery(this.queryUrlWSC, "1=1", ["instname"], "fsWSC", "", "WSC");
            this._sequenceQuery(this.queryUrlSWCD, "1=1", ["SWCD_Name"], "fsSWCD", "", "SWCD");
            //types
            this._sequenceQuery(this.queryURLProjects, "1=1", ["ProjectType"], "fsProjectTypes", "", "Project Types", false, true, ["ProjectType"]);
            this._MoveCurrentSequenceProgress();
        };
        OE_OITTViewModel.prototype._RequiredFeatureSetsDone = function () {
            this.requiredFeaturesLoaded.set(true);
            if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
                this._LoadReportFromURLParams();
            else
                this.ReportOptionsSubmission();
        };
        OE_OITTViewModel.prototype.OpenAreaReport = function (pipeParamsIn) {
            this.app.commandRegistry.command("ActivateView").execute("OE_OITTView");
            this._LoaderStateSet(true, "Loading Report...");
            $(".owrtChartTableShared").tablesort();
            $(".owrtChartTableFundInvestByYear").tablesort();
            //$(".owrtChartTableFundInvestByActByYear").tablesort();
            //reset variables
            this.primaryQueryString.set("1=1");
            this.geoTypeGeometryLayerDef.set("");
            this.geoTypeValue.set("state");
            this.areaNameVisisble.set(false);
            this.reportAreaListVisible.set(false);
            this.startYear.set(this.startYearDefault.toString());
            this.endYear.set(this.endYearDefault.toString());
            this.OptionsGeoTypeChanged("state", "State");
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            var thisView = this;
            if (this._IsNullOrEmpty(this.yearRangeSlider)) {
                this.yearRangeSlider = new kendo.ui.RangeSlider(document.getElementsByClassName("owrtYearSlider")[0], {
                    orientation: "horizontal",
                    min: this.minYear,
                    max: this.maxYear,
                    smallStep: 1,
                    largeStep: 5,
                    leftDragHandleTitle: "Start Year",
                    rightDragHandleTitle: "End Year",
                    tooltip: { format: "{0:0}" },
                    change: function () {
                        thisView._YearSliderChanged();
                    }
                });
            }
            else {
                this._YearSliderChange(this.startYear.get(), this.endYear.get());
            }
            //check for url paramemters, use these later to load this report
            if (!this._IsNullOrEmpty(pipeParamsIn))
                this.pipeParamsFromURL = pipeParamsIn;
            if (this.requiredFeaturesLoaded.get()) {
                //check for pipe params for load
                if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
                    this._LoadReportFromURLParams();
                else {
                    this.ReportOptionsSubmission();
                }
            }
            else
                this._GetRequredFeatureSets();
        };
        OE_OITTViewModel.prototype._BuildReportQuery = function (queryString) {
            if (this._IsNullOrEmpty(queryString) || queryString.length < 1)
                this.reportWorkingQuery = "1=1";
            else
                this.reportWorkingQuery = queryString;
        };
        OE_OITTViewModel.prototype.ReportOptionsSubmission = function () {
            this.reportOptionsPanelVisible.set(false);
            this._LoaderStateSet(true, "Loading report...");
            //clear all active charts
            this._destroyAllCharts();
            this.projectChart = null;
            this.fundingChart = null;
            this.lastFundingTabChartName = null;
            this.lastProjectTabChartName = null;
            this.activeTabChartName = "";
            this.projectChartString = null;
            this.fundingChartString = null;
            this._BuildReportQuery(this.primaryQueryString.get());
            //this.reportWorkingQuery = whereIn;
            this.fsSelectedAreaGeometry = null;
            //geometry is needed to query the main records set (basin, county, wsc, swcd)
            if (this.geoTypeGeometryLayerDef.get() != "") {
                this._GetReportGeometry();
            }
            else {
                this._GetReportFeatureSets(this.reportWorkingQuery);
            }
        };
        OE_OITTViewModel.prototype._destroyAllCharts = function () {
            if (this.projectChart)
                this.app.command("DestroyView").execute(this.projectChart.id);
            this.projectChart = null;
            if (this.fundingChart)
                this.app.command("DestroyView").execute(this.fundingChart.id);
            this.fundingChart = null;
        };
        OE_OITTViewModel.prototype._GetReportFeatureSets = function (queryIn) {
            this._NewSequence(this._GetReportFeatureSetsDone);
            this.selectedAreaGeometry = null;
            var queryGeometry = null;
            if (this.fsSelectedAreaGeometry != null) {
                queryGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
                this.selectedAreaGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
            }
            this._sequenceQueryLarge(this.queryURLProjects, queryIn, queryGeometry, ["OBJECTID", "ApplicationNbr", "ProjectType", "FundedAmount", "FederalFunds", "STATUS", "YearEnd"], "projectsGraphicsArray", "Projects", false);
            this._MoveCurrentSequenceProgress();
        };
        OE_OITTViewModel.prototype._GetReportFeatureSetsDone = function () {
            console.log("Projects: " + this.projectsGraphicsArray.length);
            this._loadEsirMap(this);
            this.areaTotalProjects.set("0");
            this.areaTotalInvestment.set("$0");
            var totalInvestment = 0;
            this.areaTotalFunds = 0;
            this.areaTotalFed = 0;
            var projectTypeCounts = {};
            //build project types map
            for (var i = 0; i < this.fsProjectTypes.features.length; i++) {
                projectTypeCounts[this.fsProjectTypes.features[i].attributes.ProjectType] = 0;
            }
            //project year counts
            var sYearNum = Number(this.startYear.get());
            var eYearNum = Number(this.endYear.get());
            var keyProjectYearCount = {};
            this.chartProjectYearCount = [];
            for (var year = sYearNum; year <= eYearNum; year++) {
                keyProjectYearCount[year] = this.chartProjectYearCount.length;
                this.chartProjectYearCount.push({ "y": year, "c": 0 }); //new object
            }
            //project type counts
            sYearNum = Number(this.startYear.get());
            eYearNum = Number(this.endYear.get());
            var keyProjectTypeCount = {};
            this.chartProjectTypeCount = [];
            for (var i = 0; i < this.fsProjectTypes.features.length; i++) {
                var pType = this.fsProjectTypes.features[i].attributes.ProjectType;
                keyProjectTypeCount[pType] = this.chartProjectTypeCount.length;
                this.chartProjectTypeCount.push({ "t": pType, "c": 0 }); //new object
            }
            //funding by year
            this.chartFundingYear = [];
            var keyFundingYear = {};
            sYearNum = Number(this.startYear.get());
            eYearNum = Number(this.endYear.get());
            for (var year = sYearNum; year <= eYearNum; year++) {
                keyFundingYear[year] = this.chartFundingYear.length;
                this.chartFundingYear.push({ "y": year, "fund": 0, "fed": 0 }); //new object
            }
            //funding by activity
            this.chartFundingType = [];
            var keyFundingType = {};
            for (var i = 0; i < this.fsProjectTypes.features.length; i++) {
                var atts = this.fsProjectTypes.features[i].attributes;
                keyFundingType[atts.ProjectType] = this.chartFundingType.length;
                this.chartFundingType.push({ "t": atts.ProjectType, "s": 0 }); //new object
            }
            //let lowestTypeFunding = 1000000;
            //funding by activity by year
            this.chartFundingTypeYear = [];
            var keyFundingTypeYear = {};
            sYearNum = Number(this.startYear.get());
            eYearNum = Number(this.endYear.get());
            for (var year = sYearNum; year <= eYearNum; year++) {
                keyFundingTypeYear[year] = this.chartFundingTypeYear.length;
                var yearActFAB = { "year": year };
                //add all activity types
                for (var aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                    yearActFAB[this.fsProjectTypes.features[aIndex].attributes.ProjectType] = 0;
                }
                this.chartFundingTypeYear.push(yearActFAB);
            }
            //loop over projects
            if (this.projectsGraphicsArray.length > 0) {
                this.areaTotalProjects.set(this.projectsGraphicsArray.length.toLocaleString('en'));
                for (var i = 0; i < this.projectsGraphicsArray.length; i++) {
                    var atts = this.projectsGraphicsArray[i].attributes;
                    //investment
                    totalInvestment += Number(atts.FundedAmount);
                    this.areaTotalFunds += Number(atts.FundedAmount);
                    //any federal funds?
                    if (!this._IsNullOrEmpty(atts.FederalFunds) && atts.FederalFunds.toString() != "null") {
                        //totalInvestment += Number(atts.FederalFunds);
                        this.areaTotalFed += Number(atts.FederalFunds);
                    }
                    //funding by year
                    if (!this._IsNullOrEmpty(keyFundingYear[atts.YearEnd])) {
                        this.chartFundingYear[keyFundingYear[atts.YearEnd]].fund += atts.FundedAmount;
                        this.chartFundingYear[keyFundingYear[atts.YearEnd]].fed += atts.FederalFunds;
                    }
                    //funding by ProjectType
                    if (!this._IsNullOrEmpty(keyFundingType[atts.ProjectType])) {
                        this.chartFundingType[keyFundingType[atts.ProjectType]].s += (atts.FundedAmount + atts.FederalFunds);
                        //if (lowestTypeFunding < (<any>this.chartFundingType[keyFundingType[atts.ProjectType]]).s)
                        //  lowestTypeFunding = (<any>this.chartFundingType[keyFundingType[atts.ProjectType]]).s;
                    }
                    //project counts
                    if (!this._IsNullOrEmpty(projectTypeCounts[atts.ProjectType]))
                        projectTypeCounts[atts.ProjectType] += 1;
                    //project year counts
                    if (!this._IsNullOrEmpty(keyProjectYearCount[Number(atts.YearEnd)]))
                        this.chartProjectYearCount[keyProjectYearCount[Number(atts.YearEnd)]].c += 1;
                    //project type counts
                    if (!this._IsNullOrEmpty(keyProjectTypeCount[atts.ProjectType]))
                        this.chartProjectTypeCount[keyProjectTypeCount[atts.ProjectType]].c += 1;
                    //funding by type by year
                    //key is year
                    var actYearKey = atts.YearEnd.toString();
                    var numYear = parseInt(atts.YearEnd);
                    //get complete year for matching project number                
                    if (isNaN(numYear) || this._IsNullOrEmpty(keyFundingTypeYear[numYear]) || numYear == 0)
                        continue;
                    //check for new key year
                    if (this._IsNullOrEmpty(keyFundingTypeYear[actYearKey])) {
                        keyFundingTypeYear[actYearKey] = this.chartFundingTypeYear.length;
                        var yearActFAB = { "year": actYearKey };
                        //add all activity types
                        for (var aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                            yearActFAB[this.fsProjectTypes.features[aIndex].attributes.ProjectType] = 0;
                        }
                        yearActFAB[atts.ProjectType] = atts.FundedAmount + atts.FederalFunds;
                        this.chartFundingTypeYear.push(yearActFAB); //new object                
                    }
                    else {
                        this.chartFundingTypeYear[keyFundingTypeYear[actYearKey]][atts.ProjectType] += atts.FundedAmount + atts.FederalFunds; //sum
                    }
                }
                //funding by ProjectType divider
                /*if (lowestTypeFunding > 100,000) {
                    for (let i = 0; i < this.chartFundingType.length; i++)
                    {
                        (<any>this.chartFundingType[i]).s = (<any>this.chartFundingType[i]).s / lowestTypeFunding;
                    }
                }*/
                this.areaTotalInvestment.set("$" + totalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
            }
            //build chart definitions
            this.ChartProjectYearCount("", true);
            this.ChartProjectTypeCount("", true);
            this.ChartFundingTotal("", true);
            this.ChartFundingByProjectType("", true);
            this.ChartFundingByYear("", true);
            this.ChartFundingByTypeByYear("", true);
            //change to overview tab
            this.LoadOverviewTab();
            this._LoaderStateSet(false);
        };
        OE_OITTViewModel.prototype._LoadReportFromURLParams = function () {
            //check for url paramemters
            if (!this._IsNullOrEmpty(this.pipeParamsFromURL)) {
                //decode
                this.pipeParamsFromURL = decodeURIComponent(this.pipeParamsFromURL);
                //geoType | areaType | years
                var paramStrings = this.pipeParamsFromURL.split("|");
                this.pipeParamsFromURL = null;
                //set years first
                if (!this._IsNullOrEmpty(paramStrings[2], 0)) {
                    var years = paramStrings[2].split(",");
                    if (years.length > 1) {
                        this._YearSliderChange(years[0], years[years.length - 1]);
                        //this.OptionsYearStartChanged(years[0]);
                        //this.OptionsYearEndChanged(years[years.length - 1]);
                    }
                }
                else {
                    this._YearSliderChange(this.minYear.toString(), this.maxYear.toString());
                }
                //set geotype and areaselection
                if (!this._IsNullOrEmpty(paramStrings[0], 0) && !this._IsNullOrEmpty(paramStrings[1], 0)) {
                    this.geoTypeValue.set(paramStrings[0]);
                    this.OptionsGeoTypeChanged(paramStrings[0], paramStrings[0], paramStrings[1]);
                }
                this.ReportOptionsSubmission();
            }
        };
        OE_OITTViewModel.prototype._YearSliderChanged = function () {
            var val = this.yearRangeSlider.value();
            this.startYear.set(val[0].toString());
            this.endYear.set(val[1].toString());
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        };
        OE_OITTViewModel.prototype._YearSliderChange = function (minVal, maxVal) {
            this.startYear.set(minVal);
            this.endYear.set(maxVal);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
        };
        OE_OITTViewModel.prototype._GetGeoTypeNameByValue = function (valueIn) {
            for (var i = 0; i < this.geoTypeList.getLength(); i++) {
                if (this.geoTypeList.getAt(i).value.toLowerCase() == valueIn.toLowerCase())
                    return this.geoTypeList.getAt(i).name;
            }
            return valueIn;
        };
        OE_OITTViewModel.prototype.OptionsGeoTypeChanged = function (geoTypeValueIn, geoTypeName, forceAreaSelection) {
            //console.log(geoTypeSelected);
            if (forceAreaSelection === void 0) { forceAreaSelection = null; }
            //force the geotype name if there is a matching value
            this.geoTypeName.set(this._GetGeoTypeNameByValue(geoTypeValueIn));
            this.geoTypeValue.set(geoTypeValueIn);
            this.reportAreaListVisible.set(true);
            this.areaNameVisisble.set(true);
            switch (geoTypeValueIn) {
                case "basin":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(oweb_name) =");
                    this._BuildAreaList(this.fsBasins, "oweb_name", "oweb_name", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlBasins;
                    break;
                case "subbasin":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(name) =");
                    this._BuildAreaList(this.fsHUC8, "name", "name", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlHUC8;
                    break;
                case "county":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(name10) =");
                    this._BuildAreaList(this.fsCounty, "name10", "name10", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlCounty;
                    break;
                case "wsc":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(instname) =");
                    this._BuildAreaList(this.fsWSC, "instname", "instname", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlWSC;
                    break;
                case "swcd":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(SWCD_Name) =");
                    this._BuildAreaList(this.fsSWCD, "SWCD_Name", "SWCD_Name", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlSWCD;
                    break;
                case "state":
                default:
                    //this.geoTypeValue.set("1=1");
                    this.areaNameVisisble.set(false);
                    this.areaNamePolyQueryString.set("");
                    this.geoTypeGeometryLayerDef.set("");
                    this.areaNameSelected.set("");
                    //this.esriLayerDefintionString.set("1=1");
                    this.areaNamePointsQueryString.set("1=1");
                    this.BuildOptionsQuery();
                    //this.OptionsAreaChanged("1=1");
                    this.reportAreaList.clear();
                    this.reportAreaListVisible.set(false);
                    break;
            }
        };
        OE_OITTViewModel.prototype._BuildAreaList = function (fsIn, nameField, valueField, setValue) {
            if (setValue === void 0) { setValue = null; }
            this.reportAreaList.clear();
            //sort by field
            fsIn.features.sort(function (a, b) {
                if (a.attributes[nameField] < b.attributes[nameField])
                    return -1;
                if (a.attributes[nameField] > b.attributes[nameField])
                    return 1;
                return 0;
            });
            for (var i = 0; i < fsIn.features.length; i++) {
                var workingAttributes = fsIn.features[i].attributes;
                var workingObject = new Object;
                workingObject["name"] = workingAttributes[nameField];
                workingObject["value"] = workingAttributes[valueField];
                //set the first value
                if (this.reportAreaList.length() < 1)
                    this.OptionsAreaChanged(workingObject["value"], workingObject["name"]);
                this.reportAreaList.addItem(workingObject);
            }
            //force a selection
            if (!this._IsNullOrEmpty(setValue, 0))
                this.OptionsAreaChanged(setValue, setValue);
        };
        /*public OptionsYearStartChanged(value: string) {
            this.startYear.set(value);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        }
    
        public OptionsYearEndChanged(value: string) {
            this.endYear.set(value);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        }*/
        OE_OITTViewModel.prototype.OptionsAreaChanged = function (areaValue, areaNameIn) {
            this.areaName.set(areaNameIn);
            this.areaNameSelected.set(areaValue);
            var searchValue = this.areaNameSelected.get().toUpperCase();
            this.geoTypeGeometryLayerDef.set(this.areaNamePolyQueryString.get() + " '" + searchValue + "'");
            this.BuildOptionsQuery();
        };
        OE_OITTViewModel.prototype.BuildOptionsQuery = function () {
            //area name will be used to select geometry outline
            var searchValue = this.areaNameSelected.get().toUpperCase();
            //query for projects (points)
            var queryString = this.areaNamePointsQueryString.get();
            //add area search
            if (typeof searchValue !== "undefined" && searchValue != null && searchValue.length > 0) {
                queryString += " '" + searchValue + "'";
                //This basin name is different between the basin layer and the projects layer.  Projects layer has spaces in it....
                queryString = queryString.replace("Owyhee-Malheur".toUpperCase(), "Owyhee - Malheur".toUpperCase());
            }
            //wsc and swcd are selected by geometry only, set query to 1=1
            //if (this.geoTypeValue.get() == "wsc" || this.geoTypeValue.get() == "swcd")
            //all queries are selected by state or geometry
            queryString = "1=1";
            queryString += " AND YearStart BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();
            this.primaryQueryString.set(queryString);
        };
        OE_OITTViewModel.prototype._LoaderStateSet = function (showLoader, messageIn, isError) {
            if (messageIn === void 0) { messageIn = ""; }
            if (isError === void 0) { isError = false; }
            this.loaderVisible.set(showLoader);
            this.loaderMessage.set(messageIn);
            this.loaderSpinner.set(!isError);
            this.loaderWarnIcon.set(isError);
            this.inputBlockOnError.set(isError);
        };
        OE_OITTViewModel.prototype.ResetAllTabs = function () {
            this.tabOverviewClass.set("");
            this.tabProjectsClass.set("");
            this.tabFundingClass.set("");
            this.areaPanelOverviewVisisble.set(false);
            this.areaPanelProjectsVisisble.set(false);
            this.areaPanelFundingVisisble.set(false);
        };
        OE_OITTViewModel.prototype.LoadOverviewTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.oittChartTableLinkVisible.set(false);
            this.tabOverviewClass.set("oittAreaTabEnabled");
            this.areaPanelOverviewVisisble.set(true);
            this._LoaderStateSet(false);
        };
        OE_OITTViewModel.prototype.LoadProjectsTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.oittChartTableLinkVisible.set(true);
            this.tabProjectsClass.set("oittAreaTabEnabled");
            this.areaPanelProjectsVisisble.set(true);
            this._LoaderStateSet(false);
            if (!this.projectChart)
                this.ShowChart("projects", "year");
            else if (!this._IsNullOrEmpty(this.lastProjectTabChartName) && this.lastProjectTabChartName != "") {
                this.activeTabChartName = this.lastProjectTabChartName;
            }
            else {
                this.activeTabChartName = this.projectChartString;
            }
        };
        OE_OITTViewModel.prototype.LoadFundingTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.oittChartTableLinkVisible.set(true);
            this.tabFundingClass.set("oeOWRTAreaTabEnabled");
            this.areaPanelFundingVisisble.set(true);
            this._LoaderStateSet(false);
            if (!this.fundingChart)
                this.ShowChart("funding", "total");
            else if (!this._IsNullOrEmpty(this.lastFundingTabChartName) && this.lastFundingTabChartName != "") {
                this.activeTabChartName = this.lastFundingTabChartName;
            }
            else {
                this.activeTabChartName = this.fundingChartString;
            }
        };
        OE_OITTViewModel.prototype.CloseChartTableView = function () {
            this.oittChartsTableContainerVisible.set(false);
            this.oittTableLinkText.set("Table View");
            this.oittTableLinkImg.set("Resources/Images/Icons/paging-control-table-24.png");
            this.HideAllTableViews();
        };
        OE_OITTViewModel.prototype.HideAllTableViews = function () {
            this.oittChartsTableSharedVisible.set(false);
            this.oittChartsTableFundYearVisible.set(false);
            this.oittChartsTableFundTypeYearVisible.set(false);
        };
        OE_OITTViewModel.prototype.ToggleOptionsArrow = function (val) {
            if (val)
                this.optionsImageSrc.set("Resources/Images/Icons/arrow-right-small-24.png");
            else
                this.optionsImageSrc.set("Resources/Images/Icons/arrow-down-small-16.png");
        };
        OE_OITTViewModel.prototype._loadEsirMap = function (thisView) {
            if (typeof this.esriMap == "undefined" || this.esriMap == null) {
                this.esriMap = new esri.Map("oeOWRTAreaMap", {
                    //center: [44.17432483, -120.5859375],
                    center: new esri.geometry.Point(-120.58, 44.17),
                    zoom: 6,
                    basemap: "streets",
                    minZoom: 6,
                    slider: true
                });
                var viewThis = this;
                this.esriMap.on("load", function (event) {
                    var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/27");
                    event.map.addLayer(featureLayer);
                    var modelRef = viewThis;
                    //area layer                
                    viewThis._GeoTypeLayerToDisplay(viewThis);
                    //only zoom to map extent if no area layer is present
                    if (viewThis.esriAreaLayer == null) {
                        viewThis.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);
                    }
                    //load all the layers
                    viewThis._LoadMapLayers();
                });
            }
            else {
                //area layer
                this._GeoTypeLayerToDisplay(this);
                if (this.esriAreaLayer == null)
                    this.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);
                //load all the layers
                this._LoadMapLayers();
            }
        };
        OE_OITTViewModel.prototype._LoadMapLayers = function () {
            //remove old layers
            if (!this._IsNullOrEmpty(this.esirMapPointLayers)) {
                for (var i = 0; i < this.esirMapPointLayers.length; i++) {
                    this.esriMap.removeLayer(this.esirMapPointLayers[i]);
                }
            }
            //this.esriMapLayerDefs = [];
            var mapQuery = "";
            //load all points on a single layer?
            if (this.geoTypeValue.get().toLowerCase() == "state") {
                mapQuery = "1=1 AND YearEnd BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();
                //this.esriMapLayerDefs.push(stateQuery);
            }
            else {
                var objectids = "";
                for (var i = 0; i < this.projectsGraphicsArray.length; i++) {
                    if (objectids != "")
                        objectids += ",";
                    objectids += this.projectsGraphicsArray[i].attributes["OBJECTID"];
                }
                objectids = "OBJECTID IN (" + objectids + ")";
                mapQuery = objectids;
            }
            if (this._IsNullOrEmpty(mapQuery) || mapQuery.length < 1) {
                this.areaMapLegend.set("Map");
                return;
            }
            console.log("Map query: " + mapQuery);
            var defsIn = [];
            defsIn[this.layerIDProjectPoints] = mapQuery;
            if (this._IsNullOrEmpty(this.esriPointsLayer)) {
                var imageParams = new esri.layers.ImageParameters();
                imageParams.layerIds = [this.layerIDProjectPoints];
                imageParams.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
                imageParams.transparent = true;
                imageParams.layerDefinitions = defsIn;
                this.esriPointsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(this.urlMainMapService, { "id": "oittPoints", "imageParameters": imageParams });
                this.esriPointsLayer.setDisableClientCaching(true);
                this.esriPointsLayer.id = "oittPoints";
                this.esriMap.reorderLayer(this.esriPointsLayer, 10);
                this.esriMap.addLayer(this.esriPointsLayer);
            }
            else if (!this._IsNullOrEmpty(this.esriPointsLayer)) {
                this.esriMap.getLayer("oittPoints").setLayerDefinitions(defsIn);
            }
        };
        OE_OITTViewModel.prototype._GeoTypeLayerToDisplay = function (viewRef) {
            var viewMap = viewRef.esriMap;
            //always remove this layer first
            if (typeof viewRef.esriAreaLayer != "undefined" && viewRef.esriAreaLayer != null)
                viewMap.removeLayer(viewRef.esriAreaLayer);
            switch (this.geoTypeValue.get()) {
                case "basin":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlBasins);
                    break;
                case "subbasin":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlHUC8);
                    break;
                case "county":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlCounty);
                    break;
                case "wsc":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlWSC);
                    viewRef.esriAreaLayer.setOpacity(.50);
                    break;
                case "swcd":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlSWCD);
                    break;
                case "state":
                default:
                    viewRef.esriAreaLayer = null;
                    break;
            }
            if (viewRef.esriAreaLayer != null) {
                viewRef.esriAreaLayer.setDefinitionExpression(viewRef.geoTypeGeometryLayerDef.get());
                viewMap.addLayer(viewRef.esriAreaLayer);
                this.esriMap.reorderLayer(viewRef.esriAreaLayer, 1);
                viewRef.esriAreaLayer.on("load", function (event) {
                    //use the selected geometry to set extent
                    viewRef.esriMap.setExtent(viewRef.selectedAreaGeometry.getExtent().expand(1.4));
                });
            }
        };
        OE_OITTViewModel.prototype.ToggleChartTableView = function () {
            //hide all views first
            this.HideAllTableViews();
            if (!this.oittChartsTableContainerVisible.get()) {
                this.oittTableLinkText.set("Chart View");
                this.oittTableLinkImg.set("Resources/Images/Icons/charting-24.png");
                if (this.activeTabChartName == "projectsyear") {
                    this.oittTableHdrName.set("Year");
                    this.oittTableHdrValue.set("Number of Projects");
                    this.oittChartsTableSharedVisible.set(true);
                    this.oittTableData.clear();
                    for (var i = 0; i < this.chartProjectYearCount.length; i++) {
                        this.oittTableData.addItem({
                            "name": this.chartProjectYearCount[i].y,
                            "value": this.chartProjectYearCount[i].c,
                            "data-sort-value": parseInt(this.chartProjectYearCount[i].c)
                        });
                    }
                }
                else if (this.activeTabChartName == "projectstype") {
                    this.oittTableHdrName.set("Project Types");
                    this.oittTableHdrValue.set("Number of Projects");
                    this.oittChartsTableSharedVisible.set(true);
                    this.oittTableData.clear();
                    for (var i = 0; i < this.chartProjectTypeCount.length; i++) {
                        this.oittTableData.addItem({
                            "name": this.chartProjectTypeCount[i].t,
                            "value": this.chartProjectTypeCount[i].c,
                            "data-sort-value": parseInt(this.chartProjectTypeCount[i].c)
                        });
                    }
                }
                else if (this.activeTabChartName == "fundingtotal") {
                    this.oittTableHdrName.set("Contribution Types");
                    this.oittTableHdrValue.set("Total Investment");
                    this.oittChartsTableSharedVisible.set(true);
                    //(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    //Number(someNumber.toFixed(1)).toLocaleString()
                    this.oittTableData.clear();
                    this.oittTableData.addItem({
                        "name": "Funds",
                        "value": "$" + this.areaTotalFunds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": this.areaTotalFunds
                    });
                    this.oittTableData.addItem({
                        "name": "Fed",
                        "value": "$" + this.areaTotalFed.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": this.areaTotalFed
                    });
                }
                else if (this.activeTabChartName == "fundingtype") {
                    this.oittTableHdrName.set("Project Types");
                    this.oittTableHdrValue.set("Total Funding");
                    this.oittChartsTableSharedVisible.set(true);
                    this.oittTableData.clear();
                    for (var i = 0; i < this.chartFundingType.length; i++) {
                        this.oittTableData.addItem({
                            "name": this.chartFundingType[i].t,
                            "value": "$" + Number(this.chartFundingType[i].s).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "data-sort-value": parseInt(this.chartFundingType[i].s)
                        });
                    }
                }
                else if (this.activeTabChartName == "fundingyear") {
                    this.oittChartsTableFundYearVisible.set(true);
                    this.oittTableDataFundInvestByYear.clear();
                    for (var i = 0; i < this.chartFundingYear.length; i++) {
                        var total = this.chartFundingYear[i].fund + this.chartFundingYear[i].fed;
                        this.oittTableDataFundInvestByYear.addItem({
                            "year": this.chartFundingYear[i].y,
                            "cash": "$" + Number(this.chartFundingYear[i].fund).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "inkind": "$" + Number(this.chartFundingYear[i].fed).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "total": "$" + Number(total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "cashForSort": parseInt(this.chartFundingYear[i].fund),
                            "inkindForSort": parseInt(this.chartFundingYear[i].fed),
                            "totalForSort": parseInt(total)
                        });
                    }
                }
                else if (this.activeTabChartName == "fundingtypeYear") {
                    this.oittChartsTableFundTypeYearVisible.set(true);
                    //table headers
                    this.oittTableDataFundInvestByTypeByYearHeaders.clear();
                    var newObject = { "n": "Year" };
                    this.oittTableDataFundInvestByTypeByYearHeaders.addItem(newObject);
                    for (var i = 0; i < this.fsProjectTypes.features.length; i++) {
                        var newObject_1 = { "n": this.fsProjectTypes.features[i].attributes.ProjectType };
                        this.oittTableDataFundInvestByTypeByYearHeaders.addItem(newObject_1);
                    }
                    //table values
                    this.oittTableDataFundInvestByTypeByYear.clear();
                    for (var i = 0; i < this.chartFundingTypeYear.length; i++) {
                        var workingObject = this.chartFundingTypeYear[i];
                        var newObject_2 = { "year": workingObject["year"] };
                        //add display and sort values to new object
                        for (var aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                            var workingAtt = this.fsProjectTypes.features[aIndex].attributes.ProjectType;
                            var sortAtt = workingAtt + "Sort";
                            newObject_2[sortAtt] = workingObject[workingAtt]; //copy raw value into new attribute
                            newObject_2[workingAtt] = "$" + workingObject[workingAtt].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                        }
                        this.oittTableDataFundInvestByTypeByYear.addItem(newObject_2);
                    }
                    $(".owrtChartTableFundInvestByActByYear").tablesort();
                }
                //show container
                this.oittChartsTableContainerVisible.set(true);
            }
            else {
                this.CloseChartTableView();
            }
        };
        OE_OITTViewModel.prototype.ChartFundingByTypeByYear = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingTypeYear)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this._destoryActiveChart();
                    var colorsToUse = this._generateRGBArrayFromCount(this.chartFundingTypeYear.length, true);
                    var catValues = [];
                    var seriesSet = [];
                    var seriesObj = { "name": "", "color": "", "data": [] };
                    var seriesIndexs = {};
                    var colorIndex = 0;
                    var workingObj = void 0;
                    for (var index in this.chartFundingTypeYear) {
                        workingObj = this.chartFundingTypeYear[index];
                        catValues.push(workingObj.year);
                        colorIndex = 0;
                        for (var propIndex in workingObj) {
                            if (propIndex == "year") //skip year property
                                continue;
                            //create index for this activity type
                            if (this._IsNullOrEmpty(seriesIndexs[propIndex])) {
                                seriesIndexs[propIndex] = seriesSet.length;
                                seriesObj = {
                                    "name": propIndex,
                                    "color": colorsToUse[colorIndex],
                                    "data": [parseInt(workingObj[propIndex])]
                                };
                                seriesSet.push(seriesObj);
                            }
                            else {
                                seriesSet[seriesIndexs[propIndex]].data.push(parseInt(workingObj[propIndex]));
                            }
                            colorIndex++;
                        }
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 8)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "line"
                        },
                        series: seriesSet,
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Year" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #= series.name #: #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
            /*if (setupOnly)
            {
    
                var chartCategoryDefs: RestChartCategoryDefinition = {
                    field: {
                        displayName: "Year",
                        name: "year",
                        sourceType: (<any>ChartFieldSourceType).Json
                    },
                    axis: {
                        title: "",
                        visible: true,
                        showLabels: true
                    }
                }
    
                var areaDef: RestChartAreaDefinition = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: true,
                    showVerticalGridLines: false,
                    showHorizontalGridLines: true,
                    showVerticalStrips: false,
                    showHorizontalStrips: false
                }
    
                //let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
                let colorsToUse: any = this._generateRGBArrayFromCount(this.fsProjectTypes.features.length);
                this.chartDefsFundingTypeYear = this._BuildRestChartDefinition("activeChart", "Investments By Type By Year", "Linear", true, false, chartCategoryDefs, areaDef);
    
                //create a series for each activity type
                for (let i = 0; i < this.fsProjectTypes.features.length; i++) {
                    let workingAtt: string = this.fsProjectTypes.features[i].attributes.ProjectType;
    
                    let axisIn: RestChartAxisDefinition = {
                        visible: false,
                        showLabels: true,
                        showTicks: true,
                        title: "Funding",
                        minimum: 0
                    }
    
                    //only show the first axis
                    if (i == 0)
                        axisIn.visible = true;
                    else
                        axisIn.visible = false;
    
                    this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTypeYear, (workingAtt.charAt(0).toUpperCase() + workingAtt.slice(1)), workingAtt, colorsToUse, "C0", "Line", axisIn);
                }
    
            }
            else
            {
                //render the chart!
                if (!this.fundingChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this.BuildChart("fundingChart", this.chartDefsFundingTypeYear, this.chartFundingTypeYear, "oeOWRTAreaFundingChart", 550);
                }
            }*/
        };
        OE_OITTViewModel.prototype.ChartFundingByYear = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingYear)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValuesCash = [];
                    var dataValuesInkind = [];
                    for (var index in this.chartFundingYear) {
                        catValues.push(this.chartFundingYear[index].y);
                        dataValuesCash.push(this.chartFundingYear[index].fund);
                        dataValuesInkind.push(this.chartFundingYear[index].fed);
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 8)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "column"
                        },
                        series: [{
                                name: "Funding",
                                color: "#4684EE",
                                data: dataValuesCash
                            },
                            {
                                name: "Federal",
                                color: "#ee6f44",
                                data: dataValuesInkind
                            }
                        ],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Year" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #=series.name#:  #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
            /*if (setupOnly) {
    
                var chartCategoryDefs: RestChartCategoryDefinition = {
                    field: {
                        displayName: "Year",
                        name: "y",
                        sourceType: (<any>ChartFieldSourceType).Json
                    },
                    axis: {
                        title: "Year",
                        visible: true,
                        showLabels: true
                    }
                }
    
                var axisIn: RestChartAxisDefinition = {
                    visible: true,
                    showLabels: true,
                    showTicks: true,
                    title: ""
                }
    
                var areaDef: RestChartAreaDefinition = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: true,
                    showHorizontalGridLines: true
                }
    
                let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
                this.chartDefsFundingYear = this._BuildRestChartDefinition("activeChart", "Investments By Year", "Linear", true, false, chartCategoryDefs, areaDef);
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingYear, "Funding", "fund", colorsToUse, "C0", "Bar", axisIn);
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingYear, "Federal", "fed", colorsToUse, "C0");
    
            }
            else
            {
                //render the chart!
                if (!this.fundingChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this.BuildChart("fundingChart", this.chartDefsFundingYear, this.chartFundingYear, "oeOWRTAreaFundingChart", 550);
                }
            }*/
        };
        OE_OITTViewModel.prototype.ChartFundingByProjectType = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingType)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.chartFundingType) {
                        catValues.push(this.chartFundingType[index].t);
                        dataValues.push(this.chartFundingType[index].s);
                    }
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        series: [{
                                name: "Activity",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Activity" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Activity: #= category # <br /> Total Investment: #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
            /*let useDivider = this._GetDivider(this.chartFundingType, "s");
            let xAxisTitle = "Total";
            xAxisTitle += (useDivider > 0) ? " (" + useDivider.toString() + "s) " : "";
    
            if (setupOnly) {
    
                var chartCategoryDefs: RestChartCategoryDefinition = {
                    field: {
                        displayName: "Type",
                        name: "t",
                        sourceType: (<any>ChartFieldSourceType).Json
                    },
                    axis: {
                        title: "",
                        visible: true,
                        showLabels: true,
                        reverseValues: true,
                        axisLabelMode: 0
                    }
                }
    
                var axisIn: RestChartAxisDefinition = {
                    visible: true,
                    showLabels: true,
                    showTicks: true,
                    title: xAxisTitle,
                    axisLabelMode: 1
                }
    
                var areaDef: RestChartAreaDefinition = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: true,
                    showVerticalGridLines: false,
                    showHorizontalGridLines: true,
                    showVerticalStrips: false,
                    showHorizontalStrips: false
                }
    
                let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
                this.chartDefsFundingType = this._BuildRestChartDefinition("activeChart", "Investments By Type", "Linear", true, true, chartCategoryDefs, areaDef);
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingType, "Total", "s", colorsToUse, "C0", "Bar", axisIn);
                //#,##0,,M
    
            }
            else {
                //render the chart!
                if (!this.fundingChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this.BuildChart("fundingChart", this.chartDefsFundingType, this.chartFundingType, "oeOWRTAreaFundingChart", 550, useDivider);
                }
            }*/
        };
        OE_OITTViewModel.prototype._GetDivider = function (records, targetField) {
            var bigNumber = 0;
            for (var i = 0; i < records.length; i++) {
                if (records[i][targetField] > bigNumber)
                    bigNumber = records[i][targetField];
            }
            if (bigNumber > 1000000)
                return 100000;
            if (bigNumber > 100000)
                return 1000;
            return 0;
        };
        OE_OITTViewModel.prototype.ChartProjectYearCount = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.chartProjectYearCount)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartString != activeChartString) {
                    this.projectChartString = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.chartProjectYearCount) {
                        catValues.push(this.chartProjectYearCount[index].y);
                        dataValues.push(this.chartProjectYearCount[index].c);
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 10)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "column"
                        },
                        series: [{
                                name: "Projects",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                title: { text: "Projects" },
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:n0}"
                                }
                            }],
                        categoryAxis: [{
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #= series.name #: #= kendo.toString(value,"n0") #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
                }
            }
            /*
            if (setupOnly)
            {
                var chartCategoryDefs: RestChartCategoryDefinition = {
                    field: {
                        displayName: "Year",
                        name: "y",
                        sourceType: (<any>ChartFieldSourceType).Json
                    },
                    axis: {
                        title: "Year",
                        visible: true,
                        showLabels: true
                    }
                }
    
                var axisIn: RestChartAxisDefinition = {
                    visible: true,
                    showLabels: true,
                    showTicks: true,
                    title: "Projects"
                }
    
                var areaDef: RestChartAreaDefinition = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: true,
                    showHorizontalGridLines: true
                }
    
                let colorsToUse: any = [[70, 132, 238]];
                this.chartDefsProjectYearCount = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Linear", true, false, chartCategoryDefs, areaDef);
    
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsProjectYearCount, "Projects", "c", colorsToUse, "N0", "Bar", axisIn);
            }
            else
            {
                //render the chart!
                if (!this.projectChart || this.projectChartString != activeChartString) {
                    this.projectChartString = activeChartString;
                    this.BuildChart("projectChart", this.chartDefsProjectYearCount, this.chartProjectYearCount, "oeOWRTAreaProjectsChart", 550);
                }
            }        */
        };
        OE_OITTViewModel.prototype.ChartProjectTypeCount = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.chartProjectTypeCount)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartString != activeChartString) {
                    this.projectChartString = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.chartProjectTypeCount) {
                        catValues.push(this.chartProjectTypeCount[index].t);
                        dataValues.push(this.chartProjectTypeCount[index].c);
                    }
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        series: [{
                                name: "Activity",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:n0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Activity" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Activity: #= category # <br /> Projects: #= kendo.toString(value,"n0") #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
                }
            }
            /*
            if (setupOnly) {
    
                var chartCategoryDefs: RestChartCategoryDefinition = {
                    field: {
                        displayName: "Type",
                        name: "t",
                        sourceType: (<any>ChartFieldSourceType).Json
                    },
                    axis: {
                        title: "Project Type",
                        visible: true,
                        showLabels: true,
                        reverseValues: true
                    }
                }
    
                var axisIn: RestChartAxisDefinition = {
                    visible: true,
                    showLabels: true,
                    showTicks: true,
                    title: "Projects"
                }
    
                var areaDef: RestChartAreaDefinition = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: true,
                    showHorizontalGridLines: true
                }
    
                let colorsToUse: any = [[70, 132, 238]];
                this.chartDefsProjectTypeCount = this._BuildRestChartDefinition("activeChart", "Number of Projects by Type", "Linear", true, true, chartCategoryDefs, areaDef);
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsProjectTypeCount, "Number of Projects", "c", colorsToUse, "N0", "Bar", axisIn);
            }
            else {
                //render the chart!
                if (!this.projectChart || this.projectChartString != activeChartString) {
                    this.projectChartString = activeChartString;
                    this.BuildChart("projectChart", this.chartDefsProjectTypeCount, this.chartProjectTypeCount, "oeOWRTAreaProjectsChart", 550);
                }
            }*/
        };
        OE_OITTViewModel.prototype.ChartFundingTotal = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            this.chartFundingTotal = [{ "funds": this.areaTotalFunds, "fed": this.areaTotalFed }];
            if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingTotal)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this._destoryActiveChart();
                    var total = this.chartFundingTotal[0].funds + this.chartFundingTotal[0].fed;
                    var cash = this.chartFundingTotal[0].funds;
                    var inkind = this.chartFundingTotal[0].fed;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        dataSource: {
                            data: [
                                { "name": "Funds", "val": cash, "p": cash / total, color: "#4684EE" },
                                { "name": "Federal Funds", "val": inkind, "p": inkind / total, color: "#ee6f44" }
                            ]
                        },
                        seriesDefaults: {
                            type: "pie",
                            labels: {
                                visible: true,
                                format: "{0:P}",
                                template: '#= category #: #= kendo.format("{0:P0}",value)#'
                            }
                        },
                        series: [{
                                type: "pie",
                                color: "#4684EE",
                                field: "p",
                                categoryField: "name"
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "" },
                                categories: [],
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            format: "{0:C0}",
                            template: '#= category #: #= kendo.format("{0:P0}",value)# <br /> #= kendo.format("{0:C0}",dataItem.val) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
            /*
            if (setupOnly) {
                let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
                //let colorsToUse: any = this._generateRGBArrayFromCount(2);
                this.chartDefsFundingTotal = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Pie", true, false, null, null);
    
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTotal, "Funds", "funds", colorsToUse, "C0");
                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTotal, "Federal Funds", "fed", colorsToUse, "C0");
    
                this.chartFundingTotal = [{ "funds": this.areaTotalFunds, "fed": this.areaTotalFed }];
            }
            else
            {
                //only draw the chart if it is null
                if (!this.fundingChart || this.fundingChartString != activeChartString) {
                    this.fundingChartString = activeChartString;
                    this.BuildChart("fundingChart", this.chartDefsFundingTotal, this.chartFundingTotal, "oeOWRTAreaFundingChart", 550);
                }
            } */
        };
        OE_OITTViewModel.prototype._ClearFundingClasses = function () {
            this.oittFundingChartTotalClass.set("");
            this.oittFundingChartYearClass.set("");
            this.oittFundingChartTypeClass.set("");
            this.oittFundingChartTypeYearClass.set("");
        };
        OE_OITTViewModel.prototype.ShowChart = function (workingTab, workingChart, legendName) {
            if (legendName === void 0) { legendName = ""; }
            this.CloseChartTableView();
            this.activeTabChartName = workingTab + workingChart;
            if (workingTab == "projects") {
                if (workingChart == "year") {
                    this.oittProjChartYearClass.set("oittChartSelectionBoxSelected");
                    this.projectChartLegendText.set("Number of Projects by Year");
                    this.oittProjChartTypeClass.set("");
                    this.ChartProjectYearCount(workingChart);
                    this.lastProjectTabChartName = this.activeTabChartName;
                }
                else if (workingChart == "type") {
                    this.oittProjChartTypeClass.set("oittChartSelectionBoxSelected");
                    this.projectChartLegendText.set("Number of Projects by Project Type");
                    this.oittProjChartYearClass.set("");
                    this.ChartProjectTypeCount(workingChart);
                    this.lastProjectTabChartName = this.activeTabChartName;
                }
            }
            else if (workingTab == "funding") {
                if (workingChart == "total") {
                    this._ClearFundingClasses();
                    this.oittFundingChartTotalClass.set("oittChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Total Investment in Projects");
                    this.ChartFundingTotal(workingChart);
                    this.lastFundingTabChartName = this.activeTabChartName;
                }
                else if (workingChart == "year") {
                    this._ClearFundingClasses();
                    this.oittFundingChartYearClass.set("oittChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Year");
                    this.ChartFundingByYear(workingChart);
                    this.lastFundingTabChartName = this.activeTabChartName;
                }
                else if (workingChart == "type") {
                    this._ClearFundingClasses();
                    this.oittFundingChartTypeClass.set("oittChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Type");
                    this.ChartFundingByProjectType(workingChart);
                    this.lastFundingTabChartName = this.activeTabChartName;
                }
                else if (workingChart == "typeYear") {
                    this._ClearFundingClasses();
                    this.oittFundingChartTypeYearClass.set("oittChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Type By Year");
                    this.ChartFundingByTypeByYear(workingChart);
                    this.lastFundingTabChartName = this.activeTabChartName;
                }
            }
        };
        OE_OITTViewModel.prototype._destoryActiveChart = function (targetName) {
            if (targetName === void 0) { targetName = ""; }
            try {
                this.kChartActive.destroy();
            }
            catch (e) { }
            if (this[targetName]) {
                this.app.command("DestroyView").execute(this[targetName].id);
            }
            this[targetName] = null;
        };
        OE_OITTViewModel.prototype._NewSequence = function (onComplete) {
            //clear tasks
            this.sequenceTasks = [];
            this.sequenceErrors = "";
            this.sequenceOnComplete = onComplete;
        };
        OE_OITTViewModel.prototype._MoveCurrentSequenceProgress = function () {
            var workingThis = this;
            if (typeof workingThis["modelRef"] !== "undefined" && workingThis["modelRef"] != null)
                workingThis = workingThis["modelRef"];
            //remove any events to the last query task
            if (typeof this.sequenceLastTask != "undefined" && this.sequenceLastTask != null) {
                if (typeof this.sequenceLastTask.listeners != "undefined" && this.sequenceLastTask.listeners != null) {
                    for (var i = 0; i < this.sequenceLastTask.listeners.length; i++)
                        this.sequenceLastTask.listeners[i].remove();
                }
            }
            if (workingThis.sequenceTasks.length > 0) {
                var sTask = workingThis.sequenceTasks.pop();
                this.sequenceLastTask = sTask;
                if (sTask.largeRequest != null)
                    sTask.largeRequest.StartRequest();
                else if (sTask.isRelationshipsQuery)
                    sTask.queryTask.executeRelationshipQuery(sTask.query);
                else if (sTask.isIDQuery)
                    sTask.queryTask.executeForIds(sTask.query);
                else if (sTask.isCountQuery)
                    sTask.queryTask.executeForCount(sTask.query);
                else
                    sTask.queryTask.execute(sTask.query);
            }
            else {
                if (workingThis.sequenceOnComplete) {
                    workingThis.sequenceOnComplete();
                }
            }
        };
        OE_OITTViewModel.prototype._sequenceQueryLarge = function (queryURL, where, queryGeometry, outFields, targetFeatureSet, logName, getGeometry, isDistinct) {
            if (getGeometry === void 0) { getGeometry = false; }
            if (isDistinct === void 0) { isDistinct = false; }
            var largeRequest = new OE_LargeRecordRequest();
            largeRequest.SetupRequest(queryURL, where, queryGeometry, outFields, logName, this._MoveCurrentSequenceProgress, this, targetFeatureSet, isDistinct);
            this.sequenceTasks.push(new OE_QuerySequenceTask(null, null, [], false, false, false, largeRequest));
        };
        OE_OITTViewModel.prototype._sequenceQuery = function (queryString, where, outFields, targetString, attString, logName, getGeometry, returnDistinctValues, orderByFields, outStats, returnIDsOnly, isCountQuery, addToFeatureSet, statsGroup) {
            var _this = this;
            if (getGeometry === void 0) { getGeometry = false; }
            if (returnDistinctValues === void 0) { returnDistinctValues = false; }
            if (orderByFields === void 0) { orderByFields = null; }
            if (outStats === void 0) { outStats = null; }
            if (returnIDsOnly === void 0) { returnIDsOnly = false; }
            if (isCountQuery === void 0) { isCountQuery = false; }
            if (addToFeatureSet === void 0) { addToFeatureSet = false; }
            if (statsGroup === void 0) { statsGroup = null; }
            var myModel = this;
            var query = new esri.tasks.Query();
            query.where = where;
            query.outFields = outFields;
            query.returnGeometry = getGeometry;
            query.returnDistinctValues = returnDistinctValues;
            if (orderByFields != null)
                query.orderByFields = orderByFields;
            if (outStats != null)
                query.outStatistics = outStats;
            if (statsGroup != null)
                query.groupByFieldsForStatistics = statsGroup;
            //console.log("Queuing: " + queryString);
            //console.log("Where: " + where);
            var queryTask = new esri.tasks.QueryTask(queryString);
            var onSuccess;
            if (isCountQuery) {
                onSuccess = queryTask.on("execute-for-count-complete", function (results) {
                    if (!myModel._IsNullOrEmpty(results.count))
                        myModel[targetString][attString] = results.count;
                    else
                        myModel[targetString][attString] = 0;
                    _this._MoveCurrentSequenceProgress();
                });
            }
            else {
                onSuccess = queryTask.on("complete", function (results) {
                    if (results && results.featureSet && results.featureSet.features.length > 0) {
                        if ($.isArray(myModel[targetString]))
                            myModel[targetString].push(results.featureSet);
                        if (!_this._IsNullOrEmpty(attString) && attString != "")
                            myModel[targetString][attString] = results.featureSet;
                        else {
                            if (results.featureSet.features.length == 1000) {
                                console.log("Possible query limit hit! " + queryString + " :: " + where);
                            }
                            if (addToFeatureSet)
                                myModel[targetString].features = myModel[targetString].features.concat(results.featureSet.features);
                            else
                                myModel[targetString] = results.featureSet;
                        }
                    }
                    else {
                        _this.sequenceErrors += logName + " Complete: Empty object or no results.";
                    }
                    _this._MoveCurrentSequenceProgress();
                });
            }
            var onError = queryTask.on("error", function (results) {
                _this.sequenceErrors += logName + " Error: " + results.error;
                _this._MoveCurrentSequenceProgress();
            });
            this.sequenceTasks.push(new OE_QuerySequenceTask(queryTask, query, [onSuccess, onError], false, returnIDsOnly, isCountQuery));
        };
        OE_OITTViewModel.prototype._IsNullOrEmpty = function (testValue, testLength) {
            if (testLength === void 0) { testLength = -1; }
            if (typeof testValue === "undefined" || testValue == null)
                return true;
            if (testLength > -1)
                return !(testValue.length > testLength);
            return false;
        };
        OE_OITTViewModel.prototype.StopOnErrorMessage = function (message) {
            this._LoaderStateSet(true, message, true);
            this.reportOptionsPanelVisible.set(false);
        };
        OE_OITTViewModel.prototype._SetupJQueryTableSort = function () {
            ///*
            //     A simple, lightweight jQuery plugin for creating sortable tables.
            //     https://github.com/kylefox/jquery-tablesort
            //     Version 0.0.11
            // */
            //!function (t) { t.tablesort = function (e, s) { var i = this; this.$table = e, this.$thead = this.$table.find("thead"), this.settings = t.extend({}, t.tablesort.defaults, s), this.$sortCells = this.$thead.length > 0 ? this.$thead.find("th:not(.no-sort)") : this.$table.find("th:not(.no-sort)"), this.$sortCells.on("click.tablesort", function () { i.sort(t(this)) }), this.index = null, this.$th = null, this.direction = null }, t.tablesort.prototype = { sort: function (e, s) { var i = new Date, n = this, o = this.$table, l = o.find("tbody").length > 0 ? o.find("tbody") : o, a = l.find("tr").has("td, th"), r = a.find(":nth-child(" + (e.index() + 1) + ")").filter("td, th"), d = e.data().sortBy, h = [], c = r.map(function (s, i) { return d ? "function" == typeof d ? d(t(e), t(i), n) : d : null != t(this).data().sortValue ? t(this).data().sortValue : t(this).text() }); 0 !== c.length && (this.index !== e.index() ? (this.direction = "asc", this.index = e.index()) : "asc" !== s && "desc" !== s ? this.direction = "asc" === this.direction ? "desc" : "asc" : this.direction = s, s = "asc" == this.direction ? 1 : -1, n.$table.trigger("tablesort:start", [n]), n.log("Sorting by " + this.index + " " + this.direction), n.$table.css("display"), setTimeout(function () { n.$sortCells.removeClass(n.settings.asc + " " + n.settings.desc); for (var o = 0, d = c.length; o < d; o++)h.push({ index: o, cell: r[o], row: a[o], value: c[o] }); h.sort(function (t, e) { return n.settings.compare(t.value, e.value) * s }), t.each(h, function (t, e) { l.append(e.row) }), e.addClass(n.settings[n.direction]), n.log("Sort finished in " + ((new Date).getTime() - i.getTime()) + "ms"), n.$table.trigger("tablesort:complete", [n]), n.$table.css("display") }, c.length > 2e3 ? 200 : 10)) }, log: function (e) { (t.tablesort.DEBUG || this.settings.debug) && console && console.log && console.log("[tablesort] " + e) }, destroy: function () { return this.$sortCells.off("click.tablesort"), this.$table.data("tablesort", null), null } }, t.tablesort.DEBUG = !1, t.tablesort.defaults = { debug: t.tablesort.DEBUG, asc: "sorted ascending", desc: "sorted descending", compare: function (t, e) { return t > e ? 1 : t < e ? -1 : 0 } }, t.fn.tablesort = function (e) { var s, i; return this.each(function () { s = t(this), i = s.data("tablesort"), i && i.destroy(), s.data("tablesort", new t.tablesort(s, e)) }) } }((<any>window).Zepto || (<any>window).jQuery);
        };
        OE_OITTViewModel.prototype._GetServiceByName = function (name) {
            var mService = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName == name; }).length > 0 ?
                this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === name; })[0] : null;
            return mService;
        };
        OE_OITTViewModel.prototype._GetLayerIDByName = function (mService, name) {
            var workLayer = mService.layers.filter(function (ly) { return ly.name == name; }).length > 0 ?
                mService.layers.filter(function (ly) { return ly.name === name; })[0] : null;
            return workLayer;
        };
        OE_OITTViewModel.prototype._GetTableIDByName = function (mService, name) {
            var workLayer = mService.tables.filter(function (ly) { return ly.name == name; }).length > 0 ?
                mService.tables.filter(function (ly) { return ly.name === name; })[0] : null;
            return workLayer;
        };
        OE_OITTViewModel.prototype._GetFieldByTypeID = function (featureSet, idFieldName, idTarget, valueFieldName) {
            for (var i = 0; i < featureSet.features.length; i++) {
                if (featureSet.features[i].attributes[idFieldName] &&
                    featureSet.features[i].attributes[valueFieldName] &&
                    featureSet.features[i].attributes[idFieldName] == idTarget)
                    return featureSet.features[i].attributes[valueFieldName];
            }
            return;
        };
        OE_OITTViewModel.prototype._BuildRestChartDefinition = function (idIn, displayName, chartType, enableCommonSeriesRange, flipChart, catDefs, areaDef) {
            //chartType = Pie, Linear
            //enableCommonSeriesRange = true for linear types?
            //category is the horizontal axis for a bar chart
            if (areaDef == null) {
                areaDef = {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: Enums_1.ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false,
                    enableCommonSeriesRange: enableCommonSeriesRange
                };
            }
            var json = {
                id: idIn,
                displayName: displayName,
                visible: true,
                flipChart: flipChart,
                chartType: chartType,
                area: areaDef,
                legend: {
                    position: "Bottom"
                },
                category: catDefs,
                series: []
            };
            return json;
        };
        OE_OITTViewModel.prototype._BuildRestChartDefinitionSeriesItem = function (chartDef, title, fieldName, colorsToUse, valueFormat, seriesType, axisIn, displayFormatIn) {
            //valueFormat = microsoft style field format values?  C0, F2
            if (seriesType === void 0) { seriesType = "Bar"; }
            if (axisIn === void 0) { axisIn = null; }
            if (displayFormatIn === void 0) { displayFormatIn = ""; }
            if (axisIn == null) {
                axisIn = {};
                axisIn.visible = false;
                axisIn.showLabels = true;
                axisIn.showTicks = true;
                axisIn.axisLabelMode = 1;
            }
            var obj = {
                id: chartDef.series.length.toString(),
                title: title,
                seriesType: seriesType,
                valueFormat: valueFormat,
                color: colorsToUse[chartDef.series.length],
                field: {
                    name: fieldName,
                    displayFormat: displayFormatIn,
                    sortingFormat: "000000000000000.###############",
                    sourceType: Enums_1.ChartFieldSourceType.Json
                },
                axis: axisIn
            };
            chartDef.series.push(obj);
        };
        OE_OITTViewModel.prototype._FindActivitySymbolColor = function (activityType, cssType, toHex) {
            if (cssType === void 0) { cssType = true; }
            if (toHex === void 0) { toHex = false; }
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            for (var i = 0; i < this.owrtActivitySymbols.length; i++) {
                var valueString = this.owrtActivitySymbols[i].value;
                if (valueString.toLowerCase() == activityType.toLowerCase()) {
                    if (cssType) {
                        var colorOut = "background-color: rgb(";
                        //drop off the alpha value for IE support                    
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        for (var c = 0; c < colorArray.length; c++) {
                            colorOut += colorArray[c];
                            if (c < colorArray.length - 1)
                                colorOut += ",";
                        }
                        colorOut += ")";
                        return colorOut;
                    }
                    else {
                        //drop off the alpha value for IE support
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        if (toHex)
                            return rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
                        else
                            return colorArray;
                    }
                }
            }
            //default color
            if (cssType)
                return "background-color: rgb(255, 99, 71)";
            else {
                if (toHex)
                    return rgbToHex(255, 99, 71);
                else
                    return "rgb(255, 99, 71)";
            }
        };
        OE_OITTViewModel.prototype._generateRGBArrayFromCount = function (maxColors, asHex) {
            if (asHex === void 0) { asHex = false; }
            /**
                 * HSV to RGB color conversion
                 *
                 * H runs from 0 to 360 degrees
                 * S and V run from 0 to 100
                 *
                 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
                 * http://www.cs.rit.edu/~ncs/color/t_convert.html
                 */
            function hsvToRgb(h, s, v) {
                var r, g, b;
                var i;
                var f, p, q, t;
                // Make sure our arguments stay in-range
                h = Math.max(0, Math.min(360, h));
                s = Math.max(0, Math.min(100, s));
                v = Math.max(0, Math.min(100, v));
                // We accept saturation and value arguments from 0 to 100 because that's
                // how Photoshop represents those values. Internally, however, the
                // saturation and value are calculated from a range of 0 to 1. We make
                // That conversion here.
                s /= 100;
                v /= 100;
                if (s == 0) {
                    // Achromatic (grey)
                    r = g = b = v;
                    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                }
                h /= 60; // sector 0 to 5
                i = Math.floor(h);
                f = h - i; // factorial part of h
                p = v * (1 - s);
                q = v * (1 - s * f);
                t = v * (1 - s * (1 - f));
                switch (i) {
                    case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;
                    case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;
                    case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;
                    case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;
                    case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;
                    default: // case 5:
                        r = v;
                        g = p;
                        b = q;
                }
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
            ;
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            var colorsOut = [];
            //return a single color
            if (maxColors == 1) {
                if (asHex) {
                    colorsOut.push(rgbToHex(224, 100, 50));
                }
                else {
                    colorsOut.push([224, 100, 50]);
                }
                return colorsOut;
            }
            // distribute the colors evenly on
            // the hue range (the 'H' in HSV)
            var i = 360 / (maxColors - 1);
            // hold the generated colors        
            var sv = 70;
            var workingRGB;
            for (var x = 0; x < maxColors; x++) {
                // alternate the s, v for more
                // contrast between the colors.
                sv = sv > 90 ? 70 : sv + 10;
                if (asHex) {
                    workingRGB = hsvToRgb(i * x, sv, sv);
                    colorsOut.push(rgbToHex(workingRGB[0], workingRGB[1], workingRGB[2]));
                }
                else {
                    colorsOut.push(hsvToRgb(i * x, sv, sv));
                }
            }
            return colorsOut;
        };
        return OE_OITTViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_OITTViewModel = OE_OITTViewModel;
});

},
"url:/geocortex/oe_amd/OE_OITT/OE_OITTView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OITT/CSS/OE_OITTModule.css", "css", "Lm9lT1dSVFJlcG9ydExvYWRpbmcNCnsNCiAgICBwb3NpdGlvbjphYnNvbHV0ZTsNCiAgICB0b3A6M2VtOw0KICAgIGxlZnQ6MDsNCiAgICB3aWR0aDoxMDAlOw0KICAgIGhlaWdodDoxMDAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6I2ZmZmZmZjsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICBwYWRkaW5nLXRvcDo1MHB4Ow0KICAgIHotaW5kZXg6MTAwMDsNCn0NCg0KLm9lT1dSVHdhcm5pbmdNZXNzYWdlew0KICAgIHBhZGRpbmctdG9wOjEwcHg7DQogICAgZm9udC1zaXplOjEuNGVtOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi5vZU9XUlRlcnJvcklucHV0IHsNCiAgICBwYWRkaW5nLXRvcDoxMnB4Ow0KfQ0KDQoub2VPV1JUZXJyb3JJbnB1dCBkaXYgew0KICAgIGZvbnQtc2l6ZToxLjJlbTsNCiAgICBwYWRkaW5nLWJvdHRvbToxNnB4Ow0KfQ0KDQoub2Vfb3dydFBSLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGluaGVyaXQ7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA5MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBtYXJnaW4tdG9wOiAxMnB4Ow0KICAgIG1hcmdpbi1yaWdodDogMnB4Ow0KDQogICAgZm9udDogMTJweCBNeXJpYWQsSGVsdmV0aWNhLFRhaG9tYSxBcmlhbCxjbGVhbixzYW5zLXNlcmlmOw0KICAgIGZvbnQtc2l6ZTogLjllbTsNCn0NCg0KLm9lX293cnRQUi1jb2x1bW4gew0KICBmbG9hdDogbGVmdDsNCiAgd2lkdGg6IDMyLjMlOw0KICBwYWRkaW5nLXJpZ2h0OiAuNSU7DQogIHBhZGRpbmctbGVmdDogLjUlOw0KfQ0KDQovKiBDbGVhciBmbG9hdHMgYWZ0ZXIgdGhlIGNvbHVtbnMgKi8NCi5vZV9vd3J0UFItcm93OmFmdGVyIHsNCiAgY29udGVudDogIiI7DQogIGRpc3BsYXk6IHRhYmxlOw0KICBjbGVhcjogYm90aDsNCn0NCg0KLm9lUGFydGljaXBhbnREaXZUYWJsZQ0Kew0KICAgIGRpc3BsYXk6IHRhYmxlOw0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCi5vZVRhYmxlUm93SGVhZGVyIHsNCiAgICBkaXNwbGF5OiB0YWJsZS1yb3c7DQogICAgd2lkdGg6MTAwJTsgICAgDQogICAgd2hpdGUtc3BhY2U6bm93cmFwOw0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjojRThFOERDOw0KfQ0KDQoub2VUYWJsZVJvd0hlYWRlciBkaXY6Zmlyc3QtY2hpbGQgew0KICAgIHRleHQtYWxpZ246bGVmdDsNCn0NCg0KLm9lVGFibGVSb3dIZWFkZXIgZGl2DQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyANCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIHBhZGRpbmc6IDRweCAwcHg7DQp9DQoNCi5vZVRhYmxlUm93c0NvbnRhaW5lcnsNCiAgICB3aWR0aDoxMDAlOw0KICAgIG1hcmdpbjowOw0KICAgIHBhZGRpbmc6MDsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdy1ncm91cDsNCn0NCg0KLm9lVGFibGVSb3cNCnsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdzsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQoub2VUYWJsZVJvdzpsYXN0LWNoaWxkIC5vZVBhcnRDZWxsDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOyAgICANCiAgICBib3JkZXItcmlnaHQ6MDsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQoub2VUYWJsZVJvdzpsYXN0LWNoaWxkIC5vZVBhcnRDZWxsRnVuZFZhbHVlDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICAgIGJvcmRlci10b3A6c29saWQgMXB4ICNhN2E3YTc7DQogICAgYm9yZGVyLXJpZ2h0OjA7DQp9DQoNCi5vZVBhcnRDZWxsDQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyAgICANCiAgICBwYWRkaW5nOiA2cHggMnB4Ow0KfQ0KDQoub2VQYXJ0Q2VsbFBhcnRpY2lwYW50DQp7DQogICAgd2lkdGg6MTgwcHg7DQogICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggI2E3YTdhNzsNCn0NCg0KLm9lUGFydENlbGxQYXJ0aWNpcGFudCBhew0KICAgIGZvbnQtc2l6ZTogMS4xZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQoub2VQYXJ0Q2VsbEZ1bmRWYWx1ZSB7DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIHRleHQtYWxpZ246IHJpZ2h0OyAgICANCiAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCAjYTdhN2E3Ow0KfQ0KDQoub2VUYWJsZVJvd0FsdENvbG9yczpudGgtY2hpbGQob2RkKSB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCn0NCg0KLm9lVGFibGVSb3dBbHRDb2xvcnM6bnRoLWNoaWxkKGV2ZW4pIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1Ow0KfQ0KDQoub2Vfb3dydFBSLUluZm8NCnsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyAgICANCiAgICBwYWRkaW5nOiAwIC41ZW0gMWVtIC41ZW07DQogICAgbWFyZ2luLWJvdHRvbTogMS41ZW07DQogICAgYmFja2dyb3VuZC1jb2xvcjogV2hpdGU7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxDZWxsIGZpZWxkc2V0IHsNCiAgICBib3JkZXI6IHNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6IDRweDsNCiAgICBtYXJnaW46IDVweCAwOw0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsQ2VsbCBsZWdlbmQgew0KICAgIGZvbnQtc2l6ZTogMS4yZW07DQp9DQoNCi5vZV9vd3J0UFItSW5mbyBsZWdlbmQsIC5vZU9XUlRBcmVhUGFuZWxDZWxsIGxlZ2VuZCB7DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgZm9udC1zaXplOiAxLjNlbTsNCiAgICBjb2xvcjogI2FhNGUzYzsNCiAgICBwYWRkaW5nLWxlZnQ6IC41ZW07DQp9DQoNCi5vZV9vd3J0UFItSW5mbyBoMQ0Kew0KICAgIG1hcmdpbjowOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFOEU4REM7DQogICAgcGFkZGluZy10b3A6IC4yZW07DQogICAgcGFkZGluZy1ib3R0b206IC4yZW07ICAgIA0KICAgIHBhZGRpbmctbGVmdDogLjVlbTsNCiAgICBmb250LXNpemU6IDFlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsNCn0NCg0KLm9lX293cnRQUi1JbmZvIGRpdg0Kew0KICAgIGZvbnQtc2l6ZTogMWVtOw0KICAgIHBhZGRpbmc6IC4yZW0gLjJlbSAuMmVtIC44ZW07DQp9DQoNCi5vZV9vd3J0UFItQWN0aXZpdGllcw0Kew0KICAgIGZvbnQtc2l6ZTogMmVtOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICM2MTYzNUI7DQogICAgY29sb3I6IFdoaXRlOw0KICAgIHBhZGRpbmc6IC41ZW07DQp9DQoNCi5vZV9vd3J0UFItTG9jDQp7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgICAgDQogICAgcGFkZGluZzogMCAuNWVtIDFlbSAuNWVtOw0KICAgIG1hcmdpbi1ib3R0b206IDEuNWVtOw0KICAgIGJhY2tncm91bmQtY29sb3I6IFdoaXRlOw0KfQ0KDQojb2Vfb3dydFBSX2Rpdk1hcA0Kew0KICAgIGJvcmRlcjogMC4zZW0gc29saWQgIzczNEYzRDsNCiAgICBwYWRkaW5nOjBweCAxcHggMHB4IDBweDsgLyplc3JpIG1hcCBvdmVybGFwcyBib2FyZGVyIG9uIHRoZSByaWdodCBieSAxcHguICBUaGlzIG1ha2VzIHRoZSBib3JkZXIgbG9vayB1bmlmb3JtKi8NCiAgICBtYXJnaW46NHB4IDBweCA4cHggMHB4Ow0KfQ0KDQoub2Vfb3dydFBSLUxvYyBsZWdlbmQNCnsNCiAgICBmb250LXdlaWdodDogYm9sZDsNCiAgICBmb250LXNpemU6IDEuM2VtOw0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KICAgIHBhZGRpbmctbGVmdDogLjVlbTsNCn0NCg0KLm9lT1dSVGxvY2F0aW9uRGF0YSBoMQ0Kew0KICAgIG1hcmdpbjowOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFOEU4REM7DQogICAgcGFkZGluZy10b3A6IC4yZW07DQogICAgcGFkZGluZy1ib3R0b206IC4yZW07ICAgIA0KICAgIHBhZGRpbmctbGVmdDogLjVlbTsNCiAgICBmb250LXNpemU6IDFlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsNCn0NCg0KLm9lT1dSVGxvY2F0aW9uRGF0YSBkaXYNCnsNCiAgICBmb250LXNpemU6IDFlbTsNCiAgICBwYWRkaW5nOiAuMmVtIC4yZW0gLjJlbSAuOGVtOw0KfQ0KDQoub2VDaGFydHNGaWVsZFNldCB7DQogICAgd2lkdGg6IDI3MHB4Ow0KICAgIG1pbi1oZWlnaHQ6IDQ3MHB4Ow0KICAgIG1hcmdpbjogNXB4IDE1cHggNXB4IDEwcHg7DQogICAgYm9yZGVyOiBzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOiA0cHg7DQp9DQoNCi5vZUNoYXJ0c0ZpZWxkU2V0IGxlZ2VuZA0Kew0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KfQ0KDQoub2VDaGFydHNGaWVsZFNldCBoMQ0Kew0KICAgIGZvbnQtc2l6ZTogMWVtOw0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KICAgIG1hcmdpbi10b3A6MTZweDsNCn0NCg0KDQoub2VDaGFydHNMaW5rcyB7DQogICAgdGV4dC1hbGlnbjpjZW50ZXI7DQogICAgbWFyZ2luLXRvcDo0cHg7DQp9DQoNCi5vZUNoYXJ0c0xpbmtzIGEgew0KICAgIHBhZGRpbmc6IDAgMWVtIDAgMWVtOw0KICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCAjYTdhN2E3Ow0KfQ0KDQoub2VPd3J0UFJwYXJ0aWNpcGFudHMgbGVnZW5kIHsNCiAgICBjb2xvcjogI2FhNGUzYzsNCn0NCg0KLk9FX3BpZUNoYXJ0RnVuZGluZywgT0VfcGllQ2hhcnRBY3Rpdml0eQ0Kew0KICAgIHdpZHRoOjI1MHB4Ow0KfQ0KDQoucGFydGljaXBhbnREaXYNCnsNCiAgICBwYWRkaW5nOjAgMDsNCn0NCg0KLnBhcnRpY2lwYW50RGl2IHNwYW4NCnsNCiAgICBkaXNwbGF5OmJsb2NrOw0KICAgIHBhZGRpbmc6LjVlbSAwIC41ZW0gMWVtOw0KICAgIG1hcmdpbjowOw0KfQ0KDQoucGFydGljaXBhbnREaXYgaDEsIC5wYXJ0aWNpcGFudERpdiBoMg0Kew0KICAgIG1hcmdpbjowOw0KICAgIHBhZGRpbmc6IDAgMCAwIDFlbTsNCiAgICBmb250LXNpemU6IDFlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsNCn0NCg0KLnBhcnRpY2lwYW50RGl2IHVsIHsNCiAgICBtYXJnaW46MCAwIDAgM2VtOw0KICAgIHBhZGRpbmc6MDsNCg0KICAgIGxpc3Qtc3R5bGUtaW1hZ2U6IHVybCgiUmVzb3VyY2VzL0ltYWdlcy9DdXN0b20vbGlzdGljb24uZ2lmIik7DQp9DQoNCi5wYXJ0aWNpcGFudERpdiB1bCBsaXsgICAgDQogICAgbWFyZ2luOjA7DQogICAgcGFkZGluZzowOw0KICAgIHRleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7DQp9DQoNCi5vZU93cnRBY3Rpdml0eU92ZXJ2aWV3IGxlZ2VuZA0Kew0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KfQ0KDQoub2VBY3Rpdml0eUJ5RnVuZGluZ1RhYmxlIHsNCiAgICBkaXNwbGF5OnRhYmxlOw0KICAgIHdpZHRoOiA5OCU7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICBtYXJnaW4tbGVmdDowLjZlbTsNCn0NCg0KLm9lQWN0aXZpdHlCeUZ1bmRpbmdIZWFkZXIgew0KICAgIGRpc3BsYXk6IHRhYmxlLXJvdzsNCiAgICB3aWR0aDoxMDAlOyAgICANCiAgICB3aGl0ZS1zcGFjZTpub3dyYXA7DQogICAgdGV4dC1hbGlnbjpyaWdodDsgICAgDQp9DQoNCi5vZUFjdGl2aXR5QnlGdW5kaW5nSGVhZGVyIGRpdiB7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyANCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIHBhZGRpbmc6IDRweCAwcHg7DQp9DQoNCi5vZUFjdGl2aXR5QnlGdW5kaW5nSGVhZGVyIGRpdjpmaXJzdC1jaGlsZCB7DQogICAgdGV4dC1hbGlnbjpsZWZ0Ow0KfQ0KDQoub2VBY3Rpdml0eUJ5RnVuZGluZ1JvdyB7DQogICAgZGlzcGxheTp0YWJsZS1yb3c7DQogICAgd2lkdGg6MTAwJTsNCiAgICB0ZXh0LWFsaWduOiByaWdodDsgICAgDQp9DQoNCi5vZUFjdGl2aXR5QnlGdW5kaW5nUm93IGRpdiB7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOw0KICAgIHBhZGRpbmctYm90dG9tOjJweDsNCn0NCg0KLm9lQWN0aXZpdHlCeUZ1bmRpbmdSb3cgZGl2OmZpcnN0LWNoaWxkIHsgICAgDQogICAgdGV4dC1hbGlnbjogbGVmdDsgICAgDQp9DQoNCi5vZU93cnRBY3Rpdml0eU92ZXJ2aWV3IGgxDQp7DQogICAgbWFyZ2luOjA7DQogICAgcGFkZGluZzogMC42ZW0gMCAwLjZlbSAwOw0KICAgIGZvbnQtc2l6ZTogMS4xZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi5vZU9XUlRhY3Rpdml0eUJveGVzIHsNCiAgICBwYWRkaW5nOjAuNWVtIDA7DQogICAgdGV4dC1hbGlnbjpyaWdodDsNCn0NCg0KLm9lT1dSVGFjdGl2aXR5Qm94ZXMgZGl2ew0KICAgIGRpc3BsYXk6aW5saW5lOw0KfQ0KDQoub2VBY3RSZXN1bHRzVGFibGUgew0KICAgIGRpc3BsYXk6dGFibGU7DQogICAgd2lkdGg6OTglOyAgICANCiAgICB0ZXh0LWFsaWduOmxlZnQ7DQogICAgbWFyZ2luLWxlZnQ6IDAuNmVtOw0KfQ0KDQoub2VBY1Jlc3VsdHNIZWFkZXIgew0KICAgIGRpc3BsYXk6IHRhYmxlLXJvdzsNCiAgICB3aWR0aDoxMDAlOyAgICAgICAgDQogICAgdGV4dC1hbGlnbjpsZWZ0Ow0KfQ0KDQoub2VBY1Jlc3VsdHNIZWFkZXIgZGl2DQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyANCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIHBhZGRpbmctbGVmdDo4cHg7DQogICAgcGFkZGluZy1ib3R0b206NHB4Ow0KfQ0KDQoub2VBY1Jlc3VsdHNIZWFkZXIgZGl2OmZpcnN0LWNoaWxkIHsgICAgDQogICAgcGFkZGluZy1sZWZ0OjBweDsNCn0NCg0KLm9lQWN0UmVzdWx0c1Jvdw0Kew0KICAgIGRpc3BsYXk6dGFibGUtcm93Ow0KICAgIHdpZHRoOjEwMCU7DQogICAgdGV4dC1hbGlnbjogbGVmdDsgICAgDQp9DQoNCi5vZUFjdFJlc3VsdHNSb3cgZGl2IHsNCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7DQogICAgcGFkZGluZy1sZWZ0OjhweDsNCiAgICBwYWRkaW5nLWJvdHRvbTo0cHg7DQp9DQoNCi5vZUFjdFJlc3VsdHNSb3cgZGl2OmZpcnN0LWNoaWxkIHsgDQogICAgcGFkZGluZy1sZWZ0OjBweDsNCn0NCg0KLm9lT1dSVGFjdGl2aXR5R29hbHMNCnsgICAgDQogICAgcGFkZGluZzowIDAgMCAwOw0KICAgIG1hcmdpbjogMCAwIDAgMDsNCn0NCg0KLm9lT1dSVGFjdGl2aXR5R29hbHMNCnsNCiAgICBtYXJnaW46MCAwIDAgMS43ZW07DQogICAgcGFkZGluZzowOw0KICAgIGxpc3Qtc3R5bGUtaW1hZ2U6IHVybCgiUmVzb3VyY2VzL0ltYWdlcy9DdXN0b20vbGlzdGljb24uZ2lmIik7DQp9DQoNCi5vZU9XUlRhY3Rpdml0eUdvYWxzIGxpDQp7DQogICAgcGFkZGluZzowIDAgMnB4IDA7DQogICAgbWFyZ2luOiAwIDAgMCAwOw0KICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplOw0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljcyBsZWdlbmQNCnsNCiAgICBjb2xvcjogI2FhNGUzYzsNCn0NCg0KLm9lT3dydFRyZWF0bWVudE1ldHJpY3MgdWwNCnsNCiAgICBtYXJnaW46MCAwIDAgMmVtOw0KICAgIHBhZGRpbmc6MDsNCiAgICBsaXN0LXN0eWxlLWltYWdlOiB1cmwoIlJlc291cmNlcy9JbWFnZXMvQ3VzdG9tL2xpc3RpY29uLmdpZiIpOw0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljcyB1bCBsaQ0Kew0KICAgIHBhZGRpbmc6MCAwIDRweCAwOw0KICAgIG1hcmdpbjogMCAwIDAgMDsgICAgDQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzIGEgew0KICAgIGZvbnQtc3R5bGU6aXRhbGljOw0KICAgIGZvbnQtc2l6ZTowLjllbTsNCiAgICBjb2xvcjpncmF5Ow0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljcyBkaXYNCnsNCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIHBhZGRpbmctYm90dG9tOjRweDsNCn0NCg0KLm9lTWV0cmljVG9nZ2xlDQp7DQogICAgdGV4dC1hbGlnbjogcmlnaHQ7DQogICAgcGFkZGluZy1ib3R0b206NHB4Ow0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljcyB0YWJsZQ0Kew0KICAgIG1hcmdpbjowIDAgMCAwLjRlbTsNCiAgICB3aWR0aDoyMjBweDsNCn0NCg0KLm9lT3dydFRyZWF0bWVudE1ldHJpY3NEZXNjcmlwdGlvbkNvbHVtbg0Kew0KICAgIHdpZHRoOiA1MCU7DQogICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7DQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzVmFsdWVDb2x1bW4NCnsNCiAgICB3aWR0aDogNTAlOw0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQp9DQoNCg0KDQoNCi8qIEFyZWEgUmVwb3J0ICovDQoNCi5vZV9vd3J0QXJlYVJlcG9ydC1tb2R1bGUtdmlldw0Kew0KICAgIHBvc2l0aW9uOiBpbmhlcml0Ow0KICAgIHotaW5kZXg6IDEwMDsNCiAgICB3aWR0aDogOTAwcHg7DQogICAgcmlnaHQ6IDA7DQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHBhZGRpbmc6IDZweDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgbWFyZ2luLXRvcDogMTJweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCiAgICBtaW4taGVpZ2h0OjU3MHB4Ow0KDQogICAgZm9udDogMTJweCBNeXJpYWQsSGVsdmV0aWNhLFRhaG9tYSxBcmlhbCxjbGVhbixzYW5zLXNlcmlmOw0KICAgIGZvbnQtc2l6ZTogLjllbTsNCn0NCg0KLm9lT1dSVE9wdGlvbnMNCnsNCiAgICB3aWR0aDogOTAycHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYzsNCiAgICBwYWRkaW5nOiA0cHggMHB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7DQp9DQoNCi5vZU9XUlRPcHRpb25zIGltZ3sNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCiAgICB3aWR0aDoxMnB4Ow0KICAgIGhlaWdodDoxMnB4Ow0KfQ0KDQoub2VPV1JUT3B0aW9ucyBzcGFuew0KICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KICAgIHBhZGRpbmctbGVmdDo1cHg7DQp9DQoNCi5rLXNsaWRlci1zZWxlY3Rpb24NCnsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMkE3RUE7DQp9DQoNCi5vZU9XUlRPcHRpb25zUGFuZWwNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbWFyZ2luLWxlZnQ6IGF1dG87DQogICAgbWFyZ2luLXJpZ2h0OiBhdXRvOw0KICAgIHRvcDogNzhweDsNCiAgICB3aWR0aDogOTAycHg7DQogICAgei1pbmRleDogNTAwMDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2JiYjsNCiAgICBoZWlnaHQ6MTIwcHg7DQp9DQoNCi5vZU9XUlRPcHRpb25zVGFibGUNCnsNCiAgICBtYXJnaW46MTBweDsNCn0NCg0KLm9lT1dSVE9wdGlvbnNUYWJsZSBidXR0b24sIC5vZU9XUlRlcnJvcklucHV0IGJ1dHRvbiB7DQogICAgcGFkZGluZzogLjVlbSAxZW07DQogICAgYmFja2dyb3VuZDogI0Y1RjVGNTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0NDQ0NDOw0KICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07DQogICAgZm9udC13ZWlnaHQ6IDYwMDsNCiAgICBjb2xvcjogIzFBNzJDNDsNCiAgICBib3gtc2hhZG93OiAwOw0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIGJ1dHRvbjpob3ZlciwgLm9lT1dSVGVycm9ySW5wdXQgYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUE3MkM0Ow0KICAgIGNvbG9yOiAjZmZmZmZmOw0KICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsNCn0NCg0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIGgxew0KICAgIGZvbnQtc2l6ZToxZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggYmxhY2s7DQogICAgd2lkdGg6MTAwJTsNCiAgICBtYXJnaW4tYm90dG9tOjAuNmVtOw0KICAgIHBhZGRpbmc6MC4yZW0gMDsNCn0NCg0KLm9lT1dSVE9wdGlvbnNUYWJsZSB0ZA0Kew0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXItbGVmdDogZGFzaGVkIDFweCAjYTdhN2E3Ow0KICAgIHdpZHRoOjI1JTsNCiAgICBwYWRkaW5nOjAgNHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOnRvcDsNCn0NCg0KLm9lT1dSVE9wdGlvbnNUYWJsZSB0ZDpmaXJzdC1jaGlsZA0Kew0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXItbGVmdDogbm9uZSAxcHggI2E3YTdhNzsNCn0NCg0KLm9lT1dSVE9wdGlvbnNUYWJsZSBoMnsNCiAgICBmb250LXNpemU6MC45ZW07DQogICAgZm9udC13ZWlnaHQ6bm9ybWFsOw0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIGlucHV0ew0KICAgIGRpc3BsYXk6aW5saW5lOw0KICAgIHdpZHRoOjQwcHg7DQp9DQoNCi5vZU9XUlRPcHRpb25zIGENCnsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB3aWR0aDogMTAwJTsNCiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQogICAgcGFkZGluZy1sZWZ0OiA4cHg7DQp9DQoNCi5vZU9XUlRBcmVhVGFicw0Kew0KICAgIG1hcmdpbi1sZWZ0OjRweDsNCiAgICBwYWRkaW5nLXRvcDoyNHB4Ow0KfQ0KDQoub2VPV1JUQXJlYVRhYnMgZGl2DQp7DQogICAgZmxvYXQ6bGVmdDsNCiAgICBib3JkZXI6MXB4IHNvbGlkICNjY2M7DQogICAgYm9yZGVyLWJvdHRvbTowOw0KICAgIG1pbi1oZWlnaHQ6MTZweDsNCiAgICBwYWRkaW5nOjRweCA4cHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZTJlMmUyOw0KICAgIG1hcmdpbi1yaWdodDo0cHg7DQogICAgd2lkdGg6NjBweDsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCn0NCg0KLm9lT1dSVEFyZWFUYWJzIGRpdiBhDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICB0ZXh0LWRlY29yYXRpb246bm9uZTsNCiAgICBmb250LXNpemU6MWVtOw0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCmRpdi5vaXR0QXJlYVRhYkVuYWJsZWQNCnsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7DQogICAgZm9udC1zaXplOjEuMWVtOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWx7DQogICAgZGlzcGxheTp0YWJsZTsNCiAgICBjbGVhcjpib3RoOw0KICAgIHdpZHRoOjk4JTsNCiAgICBtaW4taGVpZ2h0OjQ2MHB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7DQogICAgcGFkZGluZzoxMHB4Ow0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsIGxlZ2VuZA0Kew0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsIGgxDQp7DQogICAgZm9udC1zaXplOiAxLjJlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsgICAgICAgIA0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsT3ZlcnZpZXdMZWZ0DQp7DQogICAgd2lkdGg6IDI2MHB4Ow0KICAgIHBhZGRpbmctbGVmdDo4cHg7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxPdmVydmlld0xlZnQgZmllbGRzZXQNCnsNCiAgICBtYXJnaW4tcmlnaHQ6OHB4Ow0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsT3ZlcnZpZXdMZWZ0IGZpZWxkc2V0IGgxDQp7ICAgIA0KICAgIGZsb2F0OmxlZnQ7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxDZWxsDQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsICANCn0NCg0KLm9lT1dSVEZsb2F0UmlnaHQNCnsNCiAgICBmbG9hdDpyaWdodDsNCn0NCg0KLm9lT1dSVEFyZWFQYW5lbE92ZXJ2aWV3UmlnaHQNCnsNCiAgICANCn0NCg0KLm9lT1dSVEFyZWFQYW5lbE92ZXJ2aWV3UmlnaHQgZmllbGRzZXQNCnsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCn0NCg0KLm9lT1dSVEFyZWFRdWVyeUluZm8NCnsgICAgDQogICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgcmlnaHQ6MTBweDsNCiAgICB0b3A6IDkwcHg7DQp9DQoNCi5vZU9XUlRBcmVhUXVlcnlJbmZvIGRpdg0Kew0KICAgIGZvbnQtc2l6ZTowLjllbTsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQojb2VPV1JUQXJlYU1hcHsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB3aWR0aDogNjAwcHg7DQogICAgaGVpZ2h0OiA0MjBweDsNCiAgICBvdXRsaW5lOiBub25lOw0KfQ0KDQoub2VPV1JUQXJlYUNoYXJ0U2VsZWN0Qm94DQp7DQogICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgY29sb3I6ICMyOTI5Mjk7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0JBQkFCQTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThFOEU4Ow0KICAgIG1hcmdpbi1sZWZ0OiAxZW07DQogICAgbWFyZ2luLXJpZ2h0OiAxZW07DQogICAgZm9udC1zaXplOiAxZW07ICAgIA0KICAgIHdpZHRoOiAyMDBweDsNCiAgICBtYXJnaW4tdG9wOiAxZW07DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KfQ0KDQoub2VPV1JUQXJlYUNoYXJ0U2VsZWN0Qm94IGRpdg0Kew0KICAgIHBhZGRpbmc6IC41ZW07DQogICAgZm9udC1zaXplOiAxZW07DQogICAgd2lkdGg6IDEwMCU7DQogICAgY29sb3I6IEJsdWU7DQp9DQoNCi5vZU9XUlRBcmVhQ2hhcnRTZWxlY3RCb3ggZGl2IGEgDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICB3aWR0aDoxMDAlOw0KICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg0KLm9lT1dSVEFyZWFDaGFydFNlbGVjdEJveCBkaXYgYTpob3Zlcg0Kew0KICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCmRpdi5vaXR0Q2hhcnRTZWxlY3Rpb25Cb3hTZWxlY3RlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzhDOEM4QzsNCiAgICBjb2xvcjogV2hpdGU7DQp9DQoNCmRpdi5vaXR0Q2hhcnRTZWxlY3Rpb25Cb3hTZWxlY3RlZCBheyAgICANCiAgICBjb2xvcjogV2hpdGU7DQp9DQoNCi5vZU9XUlRBcmVhUHJvamVjdENoYXJ0LCAub2VPV1JUQXJlYUZ1bmRpbmdDaGFydCwgLm9lT1dSVEFyZWFSZXN1bHRzQ2hhcnQNCnsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB3aWR0aDo1NTBweDsNCiAgICBtaW4taGVpZ2h0OjQwMHB4Ow0KICAgIHBhZGRpbmctdG9wOjE2cHg7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxSZXN1bHRzDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICBwYWRkaW5nOjEwcHg7DQogICAgaGVpZ2h0OjQ0M3B4Ow0KICAgIG92ZXJmbG93LXk6c2Nyb2xsOw0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsUmVzdWx0cyBmaWVsZHNldA0Kew0KICAgIHdpZHRoOjYwMHB4Ow0KICAgIG1hcmdpbjoyMHB4IGF1dG8gMTBweCBhdXRvOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZQ0Kew0KICAgIHdpZHRoOiAxMDAlOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ZCwgLm93cnRSZXN1bHRzVGFibGUgdGgNCnsNCiAgICBwYWRkaW5nOiAycHggMXB4Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0aA0Kew0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDIzNCwyMzgsMjQ3LDApLCByZ2JhKDIzNCwyMzgsMjQ3LDEpKTsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHIgdGQsIC5vd3J0UmVzdWx0c1RhYmxlIHRyIHRoDQp7DQogICAgcGFkZGluZzoycHggNHB4Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0ZA0Kew0KICAgIGJvcmRlcjogc29saWQgI2VlZTsNCiAgICBib3JkZXItd2lkdGg6IDAgMXB4IDFweCAwOw0KfQ0KDQp0aC5zb3J0ZWQuYXNjZW5kaW5nOmFmdGVyIHsNCgljb250ZW50OiAiICBcMjE5MSI7DQogICAgZm9udC1zaXplOjE0cHg7DQp9DQoNCnRoLnNvcnRlZC5kZXNjZW5kaW5nOmFmdGVyIHsNCgljb250ZW50OiAiIFwyMTkzIjsNCiAgICBmb250LXNpemU6MTRweDsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHIgdGg6bnRoLWNoaWxkKDIpLCAub3dydFJlc3VsdHNUYWJsZSB0ciB0ZDpudGgtY2hpbGQoMikNCnsNCiAgICB3aWR0aDoxMDBweDsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0aDpudGgtY2hpbGQoMyksLm93cnRSZXN1bHRzVGFibGUgdHIgdGQ6bnRoLWNoaWxkKDMpDQp7DQogICAgd2lkdGg6IDE2MHB4Ow0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHI6bnRoLWNoaWxkKDJuKzEpDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmFmYWZhOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0cjpob3Zlcg0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6I2U3ZTlmOTsNCn0NCg0KLm93cnRDaGFydFRhYmxlVG9nZ2xlTGluaw0Kew0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQogICAgcGFkZGluZy1yaWdodDoxMHB4Ow0KfQ0KDQoub3dydENoYXJ0VGFibGVUb2dnbGVMaW5rIGltZw0Kew0KICAgIHdpZHRoOiAxNnB4Ow0KICAgIGhlaWdodDogMTZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHBhZGRpbmctcmlnaHQ6IDhweDsNCn0NCg0KLm93cnRDaGFydHNUYWJsZUNvbnRhaW5lcg0Kew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB0b3A6IDE4MnB4Ow0KICAgIGxlZnQ6IDI5NXB4Ow0KICAgIGhlaWdodDogNDA1cHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgd2lkdGg6IDYwMHB4Ow0KICAgIG92ZXJmbG93LXg6YXV0bzsgICAgDQogICAgb3ZlcmZsb3cteTpoaWRkZW47DQogICAgei1pbmRleDogMzA7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZVRvZ2dsZUxpbmsNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgZGlzcGxheTogYmxvY2s7DQogICAgdG9wOiAxNjJweDsNCiAgICBsZWZ0OiA4MDBweDsNCiAgICB6LWluZGV4OiA0MDsNCn0NCg0KLm93cnRDaGFydFRhYmxlcw0Kew0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMgdGJvZHkNCnsNCiAgICBkaXNwbGF5OmJsb2NrOw0KICAgIGhlaWdodDozNjBweDsNCiAgICBvdmVyZmxvdy15OnNjcm9sbDsNCn0NCg0KLm93cnRDaGFydFRhYmxlcyB0aGVhZA0Kew0KICAgIGRpc3BsYXk6YmxvY2s7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMgdHIgdGgNCnsgICAgDQogICAgdGV4dC1hbGlnbjpsZWZ0Ow0KICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjM0LDIzOCwyNDcsMCksIHJnYmEoMjM0LDIzOCwyNDcsMSkpOyAgICANCiAgICBwYWRkaW5nOjJweCA0cHg7DQogICAgYm9yZGVyOiBzb2xpZCAjZWVlOw0KICAgIGJvcmRlci13aWR0aDogMCAxcHggMXB4IDA7ICAgIA0KfQ0KDQoub3dydENoYXJ0VGFibGVTaGFyZWQgdHIgdGgsIC5vd3J0Q2hhcnRUYWJsZVNoYXJlZCB0ciB0ZCwgLm93cnRDaGFydFRhYmxlRnVuZEludmVzdEJ5WWVhciB0ciB0aCwgLm93cnRDaGFydFRhYmxlRnVuZEludmVzdEJ5WWVhciB0ciB0ZA0Kew0KICAgIHdpZHRoOjMwMHB4Ow0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRyIHRkDQp7DQogICAgYm9yZGVyOiBzb2xpZCAjZWVlOw0KICAgIGJvcmRlci13aWR0aDogMCAxcHggMXB4IDA7ICAgIA0KICAgIHBhZGRpbmc6MnB4IDRweDsgICAgDQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMgdHIgdGQ6bnRoLWNoaWxkKDFuKzIpDQp7ICAgIA0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMgdHI6bnRoLWNoaWxkKDJuKzEpDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmFmYWZhOw0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRyOmhvdmVyDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZTdlOWY5Ow0KfQ0KDQoub3dydENoYXJ0VGFibGVGdW5kSW52ZXN0QnlBY3RCeVllYXIgew0KICAgIHdpZHRoOiAyNTAwcHg7DQogICAgdGFibGUtbGF5b3V0OmZpeGVkOw0KfQ0KDQoub3dydENoYXJ0VGFibGVGdW5kSW52ZXN0QnlBY3RCeVllYXIgdHIgdGQsIC5vd3J0Q2hhcnRUYWJsZUZ1bmRJbnZlc3RCeUFjdEJ5WWVhciB0ciB0aCB7DQogICAgd2lkdGg6IDE1MHB4Ow0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOw0KfQ==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OITT/OE_OITTView.html", "html", markup1);
});

})();
