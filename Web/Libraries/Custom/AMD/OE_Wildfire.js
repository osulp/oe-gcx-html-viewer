
// Module 'OE_Wildfire'
        (function () {
var markup1 = '  <!--<div id=\'WildfireRiskPopup\' class=\'module view map-tip-view\' style=\'position:absolute; top:40px; z-index:200;\'> --><div id=\'WildfireRiskPopup\'>    <div class=\'WildfireRiskPopupHeader\'>        <div class=\'WildfireRiskPopupHeaderText\'>Your Location</div>        <button class=\'panel-header-button WildfireRiskPopupCloseButton close-16\' title=\'Close Fire Risk\'></button>    </div>    <!--<div class=\'WildfireRiskPopupGuide\'>        <div id=\'WildfireRisk_guide\'>            Left click on the map to view fire risk information.  To disable/enable fire risk mode use \'Toggle Fire Risk Mode\' from the \'I want To\' button.        </div>    </div>-->    <div class=\'WildfireRiskPopupContent\' style=\'display:none; clear:both;\'>        <div id=\'WildfireRisk_loading\'>Loading...</div>        <div id=\'WildfireRisk_content\' style=\'display:none\'>            <div>                <h1>Average Wildfire Risk (within ¼ mile)</h1><p id=\'WildfireRisk_value\'>Calculating...</p>                <p id=\'WildfireRisk_warning\' style=\'display:none;\'><span>Warning!</span> Incomplete data coverage in your area.</p>            </div>            <!--<div>                <h1>Data coverage in selection</h1><p id=\'WildfireRisk_riskdatapercent\'>Calculating...</p>            </div>-->            <div>                <h1>ODF Forest Protection District</h1><p id=\'WildfireRisk_forest_protection_district\'>No data</p>            </div>            <div>                <h1>Structural Fire Protection District</h1><p id=\'WildfireRisk_structural_projection_district\'>No data</p>            </div>            <div>                <h1>Rangeland Protection Association</h1><p id=\'WildfireRisk_rangeland_protection_assoc\'>No data</p>            </div>            <div>                <h1>City or town</h1><p id=\'WildfireRisk_city\'>No data</p>            </div>            <div>                <h1>Urban Growth Boundary</h1><p id=\'WildfireRisk_urban_growth_boundary\'>No data</p>            </div>            <div>                <h1>Community Wildfire Protection Plan Area</h1><p id=\'WildfireRisk_cwpp_area\'>No data</p>            </div>            <div>                <h1>Firewise Community</h1><p id=\'WildfireRisk_firewise_community\'>No data</p>            </div>            <div>                <h1>Senate Bill 360 area</h1><p id=\'WildfireRisk_senatebill_360\'>No data</p>            </div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_min\'>No Data</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_max\'>No Data</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_ave\'>No Data</div>        </div>        <div class=\'WildfireRisk_link\'>            <button class=\'WildfireRiskPopupModuleViewButton\' data-binding=\'{@event-onclick:openWildfireRiskQuickRepoort}\'>Get Report</button>&nbsp;&nbsp;            <span class=\'link\' data-binding=\'{@event-onclick:openWildfireRiskWorkflow}\'>Click here for more information</span>        </div>    </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Wildfire/OE_WildfireModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_WildfireModule = (function (_super) {
        __extends(OE_WildfireModule, _super);
        function OE_WildfireModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_WildfireModule.prototype.initialize = function (config) {
            var site = this.app.site;
            /*if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }*/
        };
        return OE_WildfireModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_WildfireModule = OE_WildfireModule;
});

},
"geocortex/oe_amd/OE_Wildfire/OE_WildfireView": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_WildfireView = (function (_super) {
        __extends(OE_WildfireView, _super);
        function OE_WildfireView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.buildWildfireRiskWorkflowRequest = function (isQuickReport, contextIn) {
                if (isQuickReport === void 0) { isQuickReport = false; }
                var workflowArgs = {};
                workflowArgs.workflowId = "Wildfire_Risk_Report";
                workflowArgs.risk_value = $("#WildfireRisk_value").text();
                workflowArgs.risk_percent = "0"; //contextIn.riskPercentOut;
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
                workflowArgs.useDevReport = false;
                if (window.location.href.indexOf("devReport") > -1) {
                    workflowArgs.useDevReport = true;
                }
                workflowArgs.burnProbabilityRating = contextIn.burnPropName;
                workflowArgs.hazardToStructuresRating = contextIn.hazardStructureName;
                workflowArgs.geometryElementsJsonString = contextIn.geometryElementsJsonString;
                workflowArgs.reportImageFeatureCollectionJSON = contextIn.reportImageFeatureCollectionJSON;
                workflowArgs.reportImageExtent = contextIn.reportImageExtent;
                workflowArgs.pointLatLong = contextIn.pointLatLong;
                workflowArgs.quickReportIn = (isQuickReport) ? true : null;
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            };
            _this.openWildfireRiskQuickRepoort = function (event, element, context) {
                this.buildWildfireRiskWorkflowRequest(true, context);
            };
            _this.openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {
                this.buildWildfireRiskWorkflowRequest(isQuickReport, context);
            };
            return _this;
        }
        return OE_WildfireView;
    }(ViewBase_1.ViewBase));
    exports.OE_WildfireView = OE_WildfireView;
});
//var myApp;
/*module oe.wildfireRiskPopup {
    
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
}*/ 

},
"geocortex/oe_amd/OE_Wildfire/OE_WildfireViewModel": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/infrastructure/SymbolUtils"], function (require, exports, ViewModelBase_1, observables_1, SymbolUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //export var reportImageFeatureCollectionJSON;
    //export var reportImageExtent;
    //export var pointLatLong;
    //export var geometryElementsJsonString;
    //export var riskPercentOut;
    //popup toggle and default state
    exports.fireRiskPopupEnabled = true;
    var OE_WildfireViewModel = (function (_super) {
        __extends(OE_WildfireViewModel, _super);
        function OE_WildfireViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.pointLatLong = new observables_1.Observable("");
            _this.geometryElementsJsonString = new observables_1.Observable("");
            _this.reportImageFeatureCollectionJSON = new observables_1.Observable("");
            _this.reportImageExtent = new observables_1.Observable();
            _this.riskPercentOut = new observables_1.Observable();
            _this.burnPropName = new observables_1.Observable();
            _this.hazardStructureName = new observables_1.Observable();
            return _this;
        }
        OE_WildfireViewModel.prototype.initialize = function (config) {
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
        OE_WildfireViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            var gsvc = null;
            //var gsvcURL = "http://tools.oregonexplorer.info/arcgis/rest/services/Geometry/GeometryServer"            
            var gsvcURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/Utilities/Geometry/GeometryServer";
            var fireRiskURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireRisk_ImageService/ImageServer/";
            var fireIntensityURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireIntensity_ImageService/ImageServer/";
            var fireSiteURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/";
            var oreallSiteURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_admin/MapServer/";
            var oreallHazardsURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_hazards/MapServer/";
            var burnProbabilityURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/BurnProbability/ImageServer/";
            var conditionalHazardContextURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/Conditional_Hazard_in_Context/ImageServer/";
            var loadingDiv = null;
            var contentDiv = null;
            var riskValueDiv = null;
            var linkDiv = null;
            var requestsToComplete = 10;
            var requestsCompleted = 0;
            var workingPointGeometry = null;
            var geometryBuffered = null;
            var geometryBufferedJsonString = null;
            var geometryJsonForHistograms = null;
            var bufferArea = 0;
            var serviceInfoJson = null;
            var workingFeatureCollection = null;
            var burnProbNameInt = 0;
            var structureNameInt = 0;
            //var workingApp = <geocortex.framework.application.Application>geocortex.framework.applications[0];
            var workingApp = geocortex["framework"].applications[0];
            /*
                This module is added to the NavigationMapRegion region.
                Geocortex adds this module above the "I want to" button.
                Move this module to the bottom of the navigation map region
    
                map-navigation-region
                WildfireRiskPopupModuleView
            */
            $(".WildfireRiskPopupModuleView").appendTo(".map-navigation-region");
            //add a command button
            this.app.commandRegistry.command("toggle_firerisk_mode").register(this, toggleFireRiskMode);
            //run popup by coordinates
            this.app.commandRegistry.command("OpenFireriskPopup").register(this, openFireriskPopup);
            //grab the geocortex map event
            this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
            //check for current mode
            if (exports.fireRiskPopupEnabled)
                enableFireRiskMode();
            else
                disableFireRiskMode();
            function toggleFireRiskMode() {
                if (exports.fireRiskPopupEnabled)
                    disableFireRiskMode();
                else
                    enableFireRiskMode();
            }
            function enableFireRiskMode() {
                //hide map tips
                workingApp.commandRegistry.command("HideAllMapTips").execute();
                //disable identify for mobile?
                workingApp.commandRegistry.command("DisableAllLayersForIdentify").execute();
                //enable fire risk
                workingApp.command("DisableMapTips").execute();
                exports.fireRiskPopupEnabled = true;
            }
            function disableFireRiskMode() {
                //clear markup
                workingApp.command("ClearMarkupQuiet").execute();
                //enable identify
                workingApp.commandRegistry.command("EnableAllLayersForIdentify").execute();
                //load the html view
                workingApp.commandRegistry.command("DeactivateView").execute("OE_WildfireView");
                exports.fireRiskPopupEnabled = false;
                workingApp.command("EnableMapTips").execute();
            }
            function formateLatLong(numberIn, isLat) {
                var dirSuffix;
                if (isLat) {
                    if (numberIn >= 0)
                        dirSuffix = "N";
                    else
                        dirSuffix = "S";
                }
                else {
                    if (numberIn >= 0)
                        dirSuffix = "E";
                    else
                        dirSuffix = "W";
                }
                var workingString = String(Math.abs(numberIn));
                var workingSplit = workingString.split(".");
                return workingSplit[0] + "." + workingSplit[1].substring(0, 3) + " " + dirSuffix;
            }
            function processMapPoint(mapPointIn) {
                if (!exports.fireRiskPopupEnabled)
                    return;
                //store the point
                workingPointGeometry = mapPointIn;
                //convert to a lat long version                
                var latLongPoint = esri.geometry.webMercatorToGeographic(workingPointGeometry);
                var latOut = formateLatLong(latLongPoint.y, true);
                var lonOut = formateLatLong(latLongPoint.x, false);
                thisViewModel.pointLatLong = latOut + "," + lonOut;
                //create a feature set that includes just this point
                //This will be passed to the workflow to be used with a geoprocess tool
                var pointGraphic = new esri.Graphic(workingPointGeometry);
                //load the html view
                workingApp.commandRegistry.command("ActivateView").execute("OE_WildfireView");
                requestsCompleted = 0;
                //clear fields
                ClearFields();
                //risk value 
                riskValueDiv = $("#WildfireRisk_value");
                //loading div
                loadingDiv = $("#WildfireRisk_loading");
                loadingDiv.css("display", "block");
                //swap blocks
                $(".WildfireRiskPopupContent").css("display", "block");
                //link div
                linkDiv = $(".WildfireRisk_link");
                linkDiv.css("display", "none");
                //content div
                contentDiv = $("#WildfireRisk_content");
                contentDiv.css("display", "none");
                //create an event for the close button
                $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);
                //show the point on map
                workingApp.command("ClearMarkupQuiet").execute();
                workingApp.command("AddMarkupGeometry").execute(workingPointGeometry);
                $(".WildfireRiskPopupHeaderText").text("Your Location");
                //get all the other data
                requestRemainingData();
                //create the feature collection
                workingFeatureCollection = {
                    "id": "Drawings",
                    "opacity": 0.99,
                    "minScale": 0,
                    "maxScale": 0,
                    "featureCollection": {
                        "layers": []
                    }
                };
                var pointGraphic = new esri.Graphic(workingPointGeometry, SymbolUtils_1.defaultMarkerSymbol());
                thisViewModel.geometryElementsJsonString = JSON.stringify(pointGraphic.toJson());
                var layerJSON = CreateLayerJSON("userPoint", "esriGeometryPoint", [pointGraphic]);
                //add layer JSON
                workingFeatureCollection.featureCollection.layers.push(layerJSON);
                //start the risk calcuation 
                createBuffer();
            }
            function openFireriskPopup(geometryIn, appIn) {
                if (!exports.fireRiskPopupEnabled)
                    return;
                var jsonIn = jQuery.parseJSON(geometryIn);
                var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));
                processMapPoint(newPoint);
            }
            function handleMouseClick(pointIn, appIn) {
                if (!exports.fireRiskPopupEnabled)
                    return;
                //store the point
                //workingPointGeometry = pointIn.mapPoint;
                processMapPoint(pointIn.mapPoint);
            }
            function CreateLayerJSON(layerName, esriGeometryType, graphicsIn) {
                var layerDef = {
                    "name": layerName,
                    "geometryType": esriGeometryType,
                    "fields": []
                };
                var featureCollection = {
                    "layerDefinition": layerDef,
                    "featureSet": null
                };
                var fLayer = new esri.layers.FeatureLayer(featureCollection);
                fLayer.graphics = graphicsIn;
                return fLayer.toJson();
            }
            function ClearFields() {
                $("#WildfireRisk_value").text("Calculating...");
                //$("#WildfireRisk_riskdatapercent").text("Calculating...");
                $("#WildfireRisk_forest_protection_district").text("Searching...");
                $("#WildfireRisk_structural_projection_district").text("Searching...");
                $("#WildfireRisk_rangeland_protection_assoc").text("Searching...");
                $("#WildfireRisk_city").text("Searching...");
                $("#WildfireRisk_urban_growth_boundary").text("Searching...");
                $("#WildfireRisk_cwpp_area").text("Searching...");
                $("#WildfireRisk_senatebill_360").text("Searching...");
                //warning block
                //$("#WildfireRisk_warning").text("");
                $("#WildfireRisk_warning").css("display", "none");
                //hidden
                $("#WildfireRisk_flame_min").text("Searching...");
                $("#WildfireRisk_flame_max").text("Searching...");
                $("#WildfireRisk_flame_ave").text("Searching...");
            }
            function AddRequestComplete(val) {
                if (val === void 0) { val = 1; }
                requestsCompleted += val;
                loadingDiv.text("Processing... (" + requestsCompleted + " of " + requestsToComplete + ")");
                if (requestsCompleted >= requestsToComplete) {
                    loadingDiv.css("display", "none");
                    contentDiv.css("display", "block");
                    linkDiv.css("display", "block");
                }
            }
            function SetRiskValue(val) {
                riskValueDiv.text(val);
                AddRequestComplete();
            }
            function SetRiskError(val) {
                riskValueDiv.text(val);
                //add 2 because these processes are needed for two different results.
                AddRequestComplete(2);
            }
            function createBuffer() {
                //loadingDiv.html("Creating buffer...");
                loadingDiv.text("Creating buffer...");
                gsvc = new esri.tasks.GeometryService(gsvcURL);
                var params = new esri.tasks.BufferParameters();
                params.geometries = [workingPointGeometry];
                params.distances = [0.25];
                //params.bufferSpatialReference = workingPointGeometry.spatialReference;
                params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                params.outSpatialReference = workingPointGeometry.spatialReference;
                gsvc.buffer(params, bufferResult, bufferError);
                //add some other buffers
                AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, [30, 100], AddBufferSuccess, AddBufferError);
            }
            function AddBuffer(workingPoints, unitOfMeasure, distances, successCallback, failCallback) {
                loadingDiv.text("Creating buffer...");
                gsvc = new esri.tasks.GeometryService(gsvcURL);
                var params = new esri.tasks.BufferParameters();
                params.geometries = workingPoints;
                params.distances = distances;
                params.unit = unitOfMeasure;
                params.geodesic = true;
                params.outSpatialReference = workingPointGeometry.spatialReference;
                gsvc.buffer(params, successCallback, bufferError);
            }
            function AddBufferSuccess(geometries) {
                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "Add buffer error");
                    return;
                }
                //create string
                thisViewModel.reportImageFeatureCollectionJSON = JSON.stringify(workingFeatureCollection);
                //set the report image extent to the geometry
                thisViewModel.reportImageExtent = geometries[0].getExtent();
                AddRequestComplete(1);
            }
            function AddBufferError() {
                console.log("Error: ", "Add buffer error");
                AddRequestComplete(1);
            }
            function bufferError(error) {
                console.log("Error: ", error.message);
                SetRiskError("Error: Buffer creation");
            }
            function bufferResult(geometries) {
                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "No buffer returned");
                    riskValueDiv.text("Error: No buffer returned");
                    return;
                }
                loadingDiv.text("Calculating...");
                //grab the geometry
                geometryBuffered = geometries[0];
                geometryBufferedJsonString = JSON.stringify(geometryBuffered.toJson());
                //show the buffer for now
                workingApp.command("AddMarkupGeometry").execute(geometryBuffered);
                //simplify the selection first
                gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);
            }
            function simplifyError(error) {
                console.log("Error: ", error.message);
                SetRiskError("Error: Simplify Failed");
            }
            function simplifyComplete(simplifiedGeometries) {
                var alparams = new esri.tasks.AreasAndLengthsParameters();
                alparams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                alparams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                alparams.calculationType = "preserveShape";
                alparams.polygons = simplifiedGeometries;
                //var str = JSON.stringify(geometryBuffered.toJson());
                loadingDiv.text("Calculating area...");
                gsvc.areasAndLengths(alparams, requestAreaResult, requestAreaError);
            }
            function requestAreaError(error) {
                console.log("Error: ", error.message);
                //riskValueDiv.text("Error: Area calculation failed.");
                SetRiskError("Error: Area calculation failed.");
            }
            function requestAreaResult(result) {
                bufferArea = result.areas[0];
                requestMapServiceInfo();
            }
            function requestMapServiceInfo() {
                var requestObj = esri.request({
                    url: fireRiskURL,
                    handleAs: "json",
                    content: {
                        f: "json"
                    }
                });
                requestObj.then(requestInfoComplete, requestInfoError);
            }
            function requestInfoError(error) {
                console.log("Error: ", error.message);
                //riskValueDiv.text("Error: Service information failed.");
                SetRiskError("Error: Service information failed.");
            }
            function requestInfoComplete(jsonData) {
                //set the pixel size
                serviceInfoJson = jsonData; //alert(data);
                //request histograms
                //requestHistogram(JSON.stringify(geometryBuffered.toJson()));
                //requestHistogram(fireRiskURL + "computeHistograms", JSON.stringify(geometryBuffered.toJson()), requestHistogram_success, requestHistogram_fail);
                geometryJsonForHistograms = JSON.stringify(geometryBuffered.toJson());
                //console.log("Burn request");
                requestHistogram(burnProbabilityURL, geometryJsonForHistograms, BurnProabilityCalc, requestHistogram_fail);
                //requestHistogram(conditionalHazardContextURL + "computeHistograms", JSON.stringify(geometryBuffered.toJson()), ConditionalHazardCalc, aaa);
            }
            function requestHistogram(serviceURL, geometryIn, successFunc, failFunc) {
                var requestObj = esri.request({
                    url: serviceURL + "computeHistograms",
                    handleAs: "json",
                    content: {
                        f: "json",
                        geometryType: "esriGeometryPolygon ",
                        geometry: geometryIn,
                        mosaicRule: "",
                        renderingRule: "",
                        pixelSize: ""
                    }
                });
                console.log("Geo: " + geometryIn);
                //fire risk histogram
                requestObj.then(successFunc, failFunc);
            }
            function AverageHistogramValue(data) {
                var counts = null;
                var countTotal = 0;
                var valueTotal = 0;
                var averageValue = 0;
                var positionVal = "";
                //process histogram data
                if (data.histograms.length > 0) {
                    counts = data.histograms[0].counts;
                    //loop over the counts
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {
                        countTotal += counts[i];
                        valueTotal += counts[i] * i;
                        //if (counts[i] > 0)
                        //  positionVal += i + "=" + counts[i] + ",";
                    }
                    //console.log("Position Values: "+positionVal);
                    //averageValue = Math.round((valueTotal / countTotal) * 100) / 100;
                    averageValue = valueTotal / countTotal;
                }
                return averageValue;
            }
            function BurnProabilityCalc(data) {
                //var averageValue = AverageHistogramValue(data);
                var counts = null;
                var countTotal = 0;
                var valueTotal = 0;
                var averageValue = 0;
                var startVal = 0; //0.03957299888134003;
                //var startSlot = -1;
                //var endSlot = -1;
                //var valPerSlot = 0.0001545820268802344921875;
                //process histogram data
                if (data.histograms.length > 0) {
                    counts = data.histograms[0].counts;
                    //loop over the counts
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {
                        /*if (counts[i] > 0) {
                            if (startSlot === -1)
                                startSlot = i;
    
                            endSlot = i;
                        }*/
                        countTotal += counts[i];
                        valueTotal += counts[i] * startVal;
                        startVal++;
                    }
                    averageValue = valueTotal / countTotal;
                }
                thisViewModel.burnPropName = "No Data";
                burnProbNameInt = 0;
                if (averageValue > 60) {
                    burnProbNameInt = 2;
                    thisViewModel.burnPropName = "High";
                }
                else if (averageValue >= 6) {
                    burnProbNameInt = 1;
                    thisViewModel.burnPropName = "Moderate";
                }
                else {
                    burnProbNameInt = 0;
                    thisViewModel.burnPropName = "Low";
                }
                //thisViewModel.burnPropName += " (" + averageValue + ")";
                //console.log("Burn: " + averageValue + " :: " + thisViewModel.burnPropName );
                requestHistogram(conditionalHazardContextURL, geometryJsonForHistograms, ConditionalHazardCalc, requestHistogram_fail);
            }
            function ConditionalHazardCalc(data) {
                //var averageValue = AverageHistogramValue(data);
                var counts = null;
                var countTotal = 0;
                var valueTotal = 0;
                var averageValue = 0;
                var startVal = 100;
                //var startSlot = -1;
                //var endSlot = -1;
                //process histogram data
                if (data.histograms.length > 0) {
                    counts = data.histograms[0].counts;
                    //loop over the counts
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {
                        if (i > 27 && i < 129) {
                            //if (startSlot === -1)
                            //  startSlot = i;
                            //endSlot = i;
                            countTotal += counts[i];
                            valueTotal += counts[i] * startVal;
                            startVal--;
                        }
                    }
                    averageValue = valueTotal / countTotal;
                }
                thisViewModel.hazardStructureName = "No Data";
                structureNameInt = 0;
                if (averageValue > 60) {
                    structureNameInt = 5;
                    thisViewModel.hazardStructureName = "High";
                }
                else if (averageValue >= 30) {
                    structureNameInt = 2;
                    thisViewModel.hazardStructureName = "Moderate";
                }
                else {
                    structureNameInt = 0;
                    thisViewModel.hazardStructureName = "Low";
                }
                DetermineFireRiskName();
                getFireIntensity();
            }
            function DetermineFireRiskName() {
                var totalRiskVal = structureNameInt + burnProbNameInt;
                var riskName = "No Data";
                if (totalRiskVal >= 4)
                    riskName = "High";
                else if (totalRiskVal > 0)
                    riskName = "Moderate";
                else
                    riskName = "Low";
                //riskName = thisViewModel.burnPropName + " :: " + thisViewModel.hazardStructureName + " == " + riskName;
                riskName = riskName;
                SetRiskValue(riskName);
            }
            /*function requestHistogram(geoStringIn) {
    
                var requestObj = esri.request({
                    url: fireRiskURL + "computeHistograms",
                    handleAs: "json",
                    content: {
                        f: "json",
                        geometryType: "esriGeometryPolygon ",
                        geometry: geoStringIn,
                        mosaicRule: "",
                        renderingRule: "",
                        pixelSize: ""
                    }
                });
    
                //fire risk histogram
                requestObj.then(requestHistogram_success, requestHistogram_fail);
    
            }*/
            /*function requestHistogram_success(data) {
    
                var counts = null;
                var countTotal = 0;
                var valueTotal = 0;
                var averageFirerisk = 0;
    
                //process histogram data
                if (data.histograms.length > 0) {
    
                    counts = data.histograms[0].counts;
    
                    //loop over the counts
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {
    
                        countTotal += counts[i];
                        valueTotal += counts[i] * i;
                    }
    
                    averageFirerisk = Math.round((valueTotal / countTotal) * 100) / 100;
                }
    
                var riskName = "No Data";
    
                if (averageFirerisk >= 16) {
                    riskName = "High";
                }
                else if (averageFirerisk >= 5) {
                    riskName = "Moderate";
                }
                else if (averageFirerisk > 0) {
                    riskName = "Low";
                }
    
    
                //bufferArea = Math.round(bufferArea * 100) / 100;
                var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                var maxPixels = bufferArea / pixelArea;
                var dataPercent = Math.round((countTotal / maxPixels) * 100);
    
                //$("#WildfireRisk_riskdatapercent").text(dataPercent + "%");
                thisViewModel.riskPercentOut = dataPercent;
    
                //show warning if data percent is low
                if (dataPercent < 25) {
                    //$("#WildfireRisk_warning").text("Warning! Incomplete data coverage in your area.");
                    $("#WildfireRisk_warning").css("display", "block");
                }
    
                SetRiskValue(riskName);
    
                getFireIntensity();
            }*/
            function requestHistogram_fail(error) {
                console.log("Error: ", error.message);
                //riskValueDiv.text("Error: Histogram creation failed.");                
                SetRiskError("Error: Histogram creation failed.");
            }
            function getFireIntensity() {
                var requestIntensity = esri.request({
                    url: fireIntensityURL + "computeHistograms",
                    handleAs: "json",
                    content: {
                        f: "json",
                        geometryType: "esriGeometryPolygon ",
                        geometry: geometryBufferedJsonString,
                        mosaicRule: "",
                        renderingRule: "",
                        pixelSize: ""
                    }
                });
                //fire intensity histogram
                requestIntensity.then(intensity_success, intensity_fail);
            }
            function intensity_success(data) {
                //flame categories
                //1 = 0
                //2 = 0-4
                //3 = 4-8
                //4 = 8-11
                //5 = >11
                //average values for a given histogram array index
                var categories = [
                    { "min": -1, "max": -1, "rangeMid": -1 },
                    { "min": 0, "max": 0, "rangeMid": 0 },
                    { "min": 0, "max": 4, "rangeMid": 2 },
                    { "min": 4, "max": 8, "rangeMid": 6 },
                    { "min": 8, "max": 11, "rangeMid": 9.5 },
                    { "min": "> 11", "max": "> 11", "rangeMid": "> 11" }
                ];
                var counts = null;
                var flameLow = 300;
                var flameHigh = 0;
                var flameAverage = 0;
                var flameAveStr = "0";
                var totalPixelCount = 0;
                var totalPixelCategoryValue = 0;
                //var countTotal = 0;
                //var valueTotal = 0;
                //var iVal = 0;
                var str = "";
                var i = 0;
                if (data.histograms.length > 0) {
                    counts = data.histograms[0].counts;
                    //get total for all categories                    
                    for (i = 0; i < counts.length; i++) {
                        totalPixelCount += counts[i];
                        totalPixelCategoryValue += counts[i] * i;
                        //set flameLow
                        if (counts[i] > 0 && i < flameLow) {
                            flameLow = i;
                        }
                        //set flameHigh
                        if (counts[i] > 0 && i > flameHigh) {
                            flameHigh = i;
                        }
                    }
                    if (flameLow == 300)
                        flameLow = 1;
                    flameAverage = Math.round(totalPixelCategoryValue / totalPixelCount);
                    if (flameAverage > -1 && flameAverage < categories.length)
                        $("#WildfireRisk_flame_ave").text(categories[flameAverage].rangeMid);
                    else
                        $("#WildfireRisk_flame_ave").text("No Data");
                    if (flameLow > -1 && flameLow < categories.length)
                        $("#WildfireRisk_flame_min").text(categories[flameLow].min);
                    else
                        $("#WildfireRisk_flame_min").text("No Data");
                    if (flameHigh > -1 && flameHigh < categories.length)
                        $("#WildfireRisk_flame_max").text(categories[flameHigh].max);
                    else
                        $("#WildfireRisk_flame_max").text("No Data");
                    //alert("Ave: " + categories[flameAverage].rangeMid + "    Low: " + categories[flameLow].min + "    High: " + categories[flameHigh].max);                    
                }
                AddRequestComplete();
            }
            function intensity_fail(error) {
                console.log("Error: ", error.message);
                //SetRiskValue("Error: Histogram creation failed.");
                AddRequestComplete();
            }
            function sendQueryRequest(url, layerID, fieldName, divElement, resultCallback, errorCallBack, returnGeometry) {
                if (returnGeometry === void 0) { returnGeometry = false; }
                var queryTask = new esri.tasks.QueryTask(url + layerID);
                //build query filter
                var query = new esri.tasks.Query();
                //query.geometry = geometryBuffered;
                query.geometry = workingPointGeometry;
                query.returnGeometry = returnGeometry;
                query.outFields = [fieldName];
                queryTask.execute(query, function (result) {
                    AddRequestComplete();
                    resultCallback(result.features, fieldName, divElement);
                }, function (error) {
                    AddRequestComplete();
                    errorCallBack(error, divElement);
                });
            }
            function resultRemainingData(features, attributeName, divElement) {
                if (features.length < 1) {
                    divElement.text("None");
                    return;
                }
                var i = 0;
                var str = "";
                var strItem = "";
                for (i = 0; i < features.length; i++) {
                    strItem = features[i].attributes[attributeName];
                    strItem = strItem.trim();
                    if (strItem === "")
                        strItem = "None";
                    str += strItem;
                }
                divElement.html(str);
            }
            function errorRemainingData(error, divElement) {
                //console.log("Error: ", error.message);
                divElement.text("No data");
            }
            function requestRemainingData() {
                //Wildfire Forest Projection District
                sendQueryRequest(fireSiteURL, "5", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                //Structural Fire Protection District
                sendQueryRequest(fireSiteURL, "7", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);
                //Rangeland Protection Associations
                sendQueryRequest(fireSiteURL, "6", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);
                //city or town
                sendQueryRequest(fireSiteURL, "4", "name", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);
                //urban growth boundary
                sendQueryRequest(fireSiteURL, "8", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);
                //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                sendQueryRequest(fireSiteURL, "11", "cwpp", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);
                //Firewise community
                sendQueryRequest(fireSiteURL, "10", "name", $("#WildfireRisk_firewise_community"), resultRemainingData, errorRemainingData);
                //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                sendQueryRequest(fireSiteURL, "19", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);
            }
            function UGB_result(features, attributeName, divElement) {
                if (features.length < 1) {
                    divElement.text("Outside Urban Growth Boundary");
                    return;
                }
                var i = 0;
                var str = "";
                for (i = 0; i < features.length; i++) {
                    str += features[i].attributes[attributeName] + ", ";
                }
                str = str.slice(0, -2);
                divElement.html("Within " + str);
            }
            function UGB_error(error, divElement) {
                divElement.text("Outside Urban Growth Boundary");
            }
            function SB360_result(features, attributeName, divElement) {
                if (features.length < 1) {
                    divElement.text("No");
                    return;
                }
                divElement.text("Yes");
            }
            function SB360_error(error, divElement) {
                divElement.text("No");
            }
            function closeWildfireRiskPopup() {
                workingApp.command("ClearMarkupQuiet").execute();
                //deactivate view
                workingApp.commandRegistry.command("DeactivateView").execute("OE_WildfireView");
            }
        };
        return OE_WildfireViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_WildfireViewModel = OE_WildfireViewModel;
});

},
"url:/geocortex/oe_amd/OE_Wildfire/OE_WildfireView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/CSS/OE_WildfireModule.css", "css", "LyoubWFwLXRvcC1sZWZ0DQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9Ki8NCg0KLyoubWFwLW5hdmlnYXRpb24tcmVnaW9uDQp7DQogICAgbWF4LWhlaWdodDoxMDAlOw0KfSovDQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b24gew0KICAgIHBhZGRpbmc6IC41ZW07DQogICAgb3V0bGluZTogbm9uZTsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7DQogICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTsNCiAgICBmb250LXdlaWdodDogNjAwOw0KICAgIGNvbG9yOiAjMUE3MkM0Ow0KICAgIGJveC1zaGFkb3c6IDA7DQogICAgY3Vyc29yOnBvaW50ZXI7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxQTcyQzQ7DQogICAgY29sb3I6ICNmZmZmZmY7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXcgDQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgcG9zaXRpb246YWJzb2x1dGU7ICAgIA0KICAgIHRvcDo0NHB4Ow0KICAgIG92ZXJmbG93LXk6YXV0bzsNCiAgICB6LWluZGV4OjIyMDsgICANCiAgICB3aWR0aDogMjgwcHg7DQogICAgcGFkZGluZzo0cHggMTBweCA0cHggMTBweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQTFCOEUxOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsgICAgDQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQovKiBTY3JvbGxiYXIgaXMgY29udHJvbGxlZCBieSBtZWRpYSBxdWVyaWVzICovDQpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiAzMDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA0MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDIyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA1MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDMyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA2MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4Ow0KICAgIH0NCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwSGVhZGVyIHsgIA0KICAgIGZsb2F0OmxlZnQ7DQogICAgd2lkdGg6MTAwJTsNCiAgICBmb250LXNpemU6MS4yZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBwYWRkaW5nLXRvcDowLjNlbTsNCiAgICBwYWRkaW5nLWJvdHRvbTowLjVlbTsNCiAgICBjb2xvcjpyZ2JhKDEwNSwgMTA1LCAxMDUsIDEpOw0KfQ0KDQouV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50IHsgIA0KICAgIGZvbnQtc2l6ZToxZW07DQp9DQoNCi8qLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXIgeyAgDQogICAgd2lkdGg6MTJweDsNCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgIHsgIA0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuMyk7IA0KICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsNCiAgICBib3JkZXItcmFkaXVzOiAxMHB4Ow0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuNSk7IA0KfSovDQoNCi5XaWxkZmlyZVJpc2tfbGluayB7ICAgIA0KICAgIHBhZGRpbmc6OHB4IDBweCA4cHggMHB4Ow0KfQ0KDQouV2lsZGZpcmVSaXNrX2xpbmsgYSB7DQogICAgZm9udC1zaXplOjEuMmVtOw0KICAgIGNvbG9yOiMwMDAwMDA7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENsb3NlQnV0dG9uIHsgIA0KICAgIHBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjBlbTsNCiAgICB0b3A6MGVtOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgaDEgew0KICAgIGZvbnQtc2l6ZToxLjFlbTsNCiAgICBmb250LXdlaWdodDpub3JtYWw7DQogICAgY29sb3I6IzAwMDAwMDsgDQogICAgcGFkZGluZy1sZWZ0OjRweDsgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IGRpdiB7DQogICAgcGFkZGluZzogMXB4OyAgICAgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IHAgew0KICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDEycHg7DQogICAgbWFyZ2luOiAwcHg7DQogICAgY29sb3I6cmdiYSg4MiwgODIsIDgyLCAxKTsgDQp9DQoNCiNXaWxkZmlyZVJpc2tfY29udGVudCBkaXY6bnRoLWNoaWxkKG9kZCkgeyAgICANCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNFN0U3RTc7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyBzcGFuIHsNCiAgICBjb2xvcjojMDAwMDAwOw0KfQ0KDQojV2lsZGZpcmVSaXNrX3ZhbHVlIHsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgZGl2IGRpdiB7DQogICAgcGFkZGluZzowcHg7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyB7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBmb250LXNpemU6MC45ZW07DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cDo6LXdlYmtpdC1zY3JvbGxiYXIgew0KICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjp2ZXJ0aWNhbCB7DQogICAgd2lkdGg6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjpob3Jpem9udGFsIHsNCiAgICBoZWlnaHQ6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7DQogICAgYm9yZGVyLXJhZGl1czogOHB4Ow0KICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlOyAvKiBzaG91bGQgbWF0Y2ggYmFja2dyb3VuZCwgY2FuJ3QgYmUgdHJhbnNwYXJlbnQgKi8NCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KTsNCn0=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/OE_WildfireView.html", "html", markup1);
});

})();
