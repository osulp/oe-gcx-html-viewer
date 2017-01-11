var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomFormM49Module = (function (_super) {
            __extends(CustomFormM49Module, _super);
            function CustomFormM49Module(app, lib) {
                _super.call(this, app, lib);
            }
            CustomFormM49Module.prototype.initialize = function (config) {
                //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            };
            return CustomFormM49Module;
        }(geocortex.framework.application.ModuleBase));
        customform49.CustomFormM49Module = CustomFormM49Module;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomForm49ModuleView = (function (_super) {
            __extends(CustomForm49ModuleView, _super);
            function CustomForm49ModuleView(app, lib) {
                _super.call(this, app, lib);
                this.toggleLayer = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "toggleLayer";
                    workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
                    workflowArgs.LayerName = element.getAttribute("data-attr-layer");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.showInfo = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "constraintPopUps";
                    workflowArgs.constraint = element.getAttribute("data-attr-constraint");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.zoomTo = function (event, element, context) {
                    var featureExtent = myWorkflowContext.getValue('uda_extent');
                    myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
                };
                this.clearTitle = function (event, element, context) {
                    element.value = "";
                };
                this.runNewReport = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'New');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.getPDF = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'PDF');
                    myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
                    var includedMap = document.getElementById("includeMap")["checked"];
                    myWorkflowContext.setValue("includeMap", includedMap);
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
            }
            return CustomForm49ModuleView;
        }(geocortex.framework.ui.ViewBase));
        customform49.CustomForm49ModuleView = CustomForm49ModuleView;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomFormM49ModuleViewModel = (function (_super) {
            __extends(CustomFormM49ModuleViewModel, _super);
            function CustomFormM49ModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            CustomFormM49ModuleViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                this.app.registerActivityIdHandler("displaycustomform_m49", function CustomEventHandler(workflowContext, contextFunctions) {
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("CustomForm49ModuleView");
                    document.getElementById("hvfl_soil").innerHTML = myWorkflowContext.getValue("hvfl_soil");
                    document.getElementById("hvf").innerHTML = myWorkflowContext.getValue("hvfl_forest");
                    document.getElementById("hvfl_dairy").innerHTML = myWorkflowContext.getValue("hvfl_dairy");
                    document.getElementById("hvf_likely").innerHTML = myWorkflowContext.getValue("likely_hvf");
                });
            };
            return CustomFormM49ModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        customform49.CustomFormM49ModuleViewModel = CustomFormM49ModuleViewModel;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        var WildfireRiskPopupModule = (function (_super) {
            __extends(WildfireRiskPopupModule, _super);
            function WildfireRiskPopupModule(app, lib) {
                _super.call(this, app, lib);
            }
            WildfireRiskPopupModule.prototype.initialize = function (config) {
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
            WildfireRiskPopupModule.prototype._onSiteInitialized = function (site) {
                //disable normal map tips
                this.app.command("DisableMapTips").execute();
            };
            return WildfireRiskPopupModule;
        }(geocortex.framework.application.ModuleBase));
        wildfireRiskPopup.WildfireRiskPopupModule = WildfireRiskPopupModule;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        var WildfireRiskPopupModuleView = (function (_super) {
            __extends(WildfireRiskPopupModuleView, _super);
            function WildfireRiskPopupModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return WildfireRiskPopupModuleView;
        }(geocortex.framework.ui.ViewBase));
        wildfireRiskPopup.WildfireRiskPopupModuleView = WildfireRiskPopupModuleView;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        var WildfireRiskPopupModuleViewModel = (function (_super) {
            __extends(WildfireRiskPopupModuleViewModel, _super);
            function WildfireRiskPopupModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            WildfireRiskPopupModuleViewModel.prototype.initialize = function (config) {
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
            WildfireRiskPopupModuleViewModel.prototype._onSiteInitialized = function (site) {
                var gsvc = null;
                var gsvcURL = "http://lib-arcgis2.library.oregonstate.edu/arcgis/rest/services/Geometry/GeometryServer/";
                var imageServerURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireRisk_ImageService/ImageServer/";
                var fireSiteURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/";
                var oreallSiteURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_admin/MapServer/";
                var oreallHazardsURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_hazards/MapServer/";
                //var loadingDiv = null;
                var contentDiv = null;
                var riskValueDiv = null;
                var geometryBuffered = null;
                var geometryBufferedJsonString = null;
                var bufferArea = 0;
                var serviceInfoJson = null;
                //grab the geocortex map event
                this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
                function handleMouseClick(pointIn, appIn) {
                    //Grab the current application
                    appIn = geocortex.framework.applications[0];
                    //load the html view
                    myApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");
                    //clear fields
                    ClearFields();
                    //loading div
                    //loadingDiv = $("#WildfireRisk_loading");
                    //loadingDiv.css("display", "block");
                    riskValueDiv = $("#WildfireRisk_value");
                    //content div
                    contentDiv = $("#WildfireRisk_content");
                    contentDiv.css("display", "block");
                    //create an event for the close button
                    $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);
                    //show the point on map
                    appIn.command("ClearTemporaryMarkup").execute();
                    appIn.command("AddTemporaryMarkupGeometry").execute(pointIn.mapPoint);
                    //start up the service                
                    createBuffer(pointIn);
                }
                /*function ShowError(msg) {
    
                    contentDiv.css("display", "none");
                    loadingDiv.css("display", "block");
    
                    loadingDiv.text = msg;
                }*/
                function ClearFields() {
                    $("#WildfireRisk_value").text("Calculating...");
                    $("#WildfireRisk_riskdatapercent").text("Calculating...");
                    $("#WildfireRisk_forest_protection_district").text("Searching...");
                    $("#WildfireRisk_structural_projection_district").text("Searching...");
                    $("#WildfireRisk_rangeland_protection_assoc").text("Searching...");
                    $("#WildfireRisk_city").text("Searching...");
                    $("#WildfireRisk_urban_growth_boundary").text("Searching...");
                    $("#WildfireRisk_cwpp_area").text("Searching...");
                    $("#WildfireRisk_senatebill_360").text("Searching...");
                }
                function createBuffer(pointIn) {
                    //loadingDiv.html("Creating buffer...");
                    riskValueDiv.text("Creating buffer...");
                    gsvc = new esri.tasks.GeometryService(gsvcURL);
                    var params = new esri.tasks.BufferParameters();
                    params.geometries = [pointIn.mapPoint];
                    params.distances = [0.25];
                    params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                    params.outSpatialReference = pointIn.mapPoint.spatialReference;
                    gsvc.buffer(params, bufferResult, bufferError);
                }
                function bufferError(error) {
                    console.log("Error: ", error.message);
                    riskValueDiv.text("Error: Buffer creation");
                }
                function bufferResult(geometries) {
                    if (geometries == null || geometries.length < 1) {
                        console.log("Error: ", "No buffer returned");
                        riskValueDiv.text("Error: No buffer returned");
                        //ShowError("Error. No buffer.");
                        return;
                    }
                    //Grab the current application
                    var appIn = geocortex.framework.applications[0];
                    //loadingDiv.html("Calculating fire risk...");
                    riskValueDiv.text("Calculating...");
                    /*var symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(
                            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([0, 0, 255, 0.65]), 2
                        ),
                        new dojo.Color([0, 0, 255, 0.35])
                    );*/
                    //var graphic = new esri.Graphic(geometries[0], symbol);
                    //grab the geometry
                    geometryBuffered = geometries[0];
                    geometryBufferedJsonString = JSON.stringify(geometryBuffered.toJson());
                    //show the buffer for now
                    appIn.command("AddTemporaryMarkupGeometry").execute(geometryBuffered);
                    //simplify the selection first
                    gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);
                }
                function simplifyError(error) {
                    console.log("Error: ", error.message);
                    //ShowError("Simplify Error");
                    riskValueDiv.text("Error: Simplify Failed");
                }
                function simplifyComplete(simplifiedGeometries) {
                    var alparams = new esri.tasks.AreasAndLengthsParameters();
                    alparams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                    alparams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                    alparams.calculationType = "preserveShape";
                    alparams.polygons = simplifiedGeometries;
                    var str = JSON.stringify(geometryBuffered.toJson());
                    riskValueDiv.text("Calculating area...");
                    //gsvc.on("areas-and-lengths-complete", requestAreaResult);
                    //gsvc.areasAndLengths(alparams);
                    gsvc.areasAndLengths(alparams, requestAreaResult, requestAreaError);
                    /*var requestObj = esri.request({
                          url: "http://lib-arcgis2.library.oregonstate.edu/arcgis/rest/services/Geometry/GeometryServer/areasAndLengths",
                          handleAs: "json",
                          content: {
                              f: "json",
                              calculationType: "preserveShape",
                              polygons: simplifiedGeometries,
                              sr: geometryBuffered.spatialReference.wkid,
                              lengthUnit: esri.tasks.GeometryService.UNIT_METER,
                              areaUnit: JSON.stringify({ "areaUnit": esri.tasks.GeometryService.UNIT_SQUARE_METERS })
                          }
                      });
  
                      requestObj.then(requestAreaResult, requestAreaError);*/
                }
                function requestAreaError(error) {
                    console.log("Error: ", error.message);
                    riskValueDiv.text("Error: Area calculation failed.");
                }
                function requestAreaResult(result) {
                    bufferArea = result.areas[0];
                    requestMapServiceInfo();
                }
                function requestMapServiceInfo() {
                    var requestObj = esri.request({
                        url: imageServerURL,
                        handleAs: "json",
                        content: {
                            f: "json"
                        }
                    });
                    requestObj.then(requestInfoComplete, requestInfoError);
                }
                function requestInfoError(error) {
                    console.log("Error: ", error.message);
                    //ShowError("Service Info Error");
                    riskValueDiv.text("Error: Service information failed.");
                }
                function requestInfoComplete(jsonData) {
                    //set the pixel size
                    serviceInfoJson = jsonData; //alert(data);
                    //request histogram
                    requestHistogram(JSON.stringify(geometryBuffered.toJson()));
                }
                function requestHistogram(geoStringIn) {
                    var requestObj = esri.request({
                        url: imageServerURL + "computeHistograms",
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
                    requestObj.then(requestHistogram_success, requestHistogram_fail);
                }
                function requestHistogram_success(data) {
                    //console.log("Data: ", JSON.stringify(data)); // print the data to browser's console
                    //alert(JSON.stringify(data));
                    /*if (data.histograms.length < 1) {
    
                        loadingDiv.text("No data in selection");
                        ShowError("Simplify Error");
                        return;
                    }*/
                    riskValueDiv.text("Building Histogram...");
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
                    else if (averageFirerisk >= 4) {
                        riskName = "Moderate";
                    }
                    else if (averageFirerisk > 0) {
                        riskName = "Low";
                    }
                    $("#WildfireRisk_value").text(riskName);
                    //bufferArea = Math.round(bufferArea * 100) / 100;              
                    var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                    var maxPixels = bufferArea / pixelArea;
                    var dataPercent = Math.round((countTotal / maxPixels) * 100);
                    $("#WildfireRisk_riskdatapercent").text(dataPercent + "%");
                    requestRemainingData();
                    //loadingDiv.css("display", "none");
                    //contentDiv.css("display", "block");                                
                }
                function requestHistogram_fail(error) {
                    console.log("Error: ", error.message);
                    //ShowError("Calculation Error");
                    riskValueDiv.text("Error: Histogram creation failed.");
                }
                function queryRemainingData(url, layerID, fieldName, divElement, resultCallback, errorCallBack) {
                    var queryTask = new esri.tasks.QueryTask(url + layerID);
                    //build query filter
                    var query = new esri.tasks.Query();
                    query.geometry = geometryBuffered;
                    query.returnGeometry = false;
                    query.outFields = [fieldName];
                    queryTask.execute(query, function (result) {
                        resultCallback(result.features, fieldName, divElement);
                    }, function (error) {
                        errorCallBack(error, divElement);
                    });
                }
                function resultRemainingData(features, attributeName, divElement) {
                    if (features.length < 1) {
                        divElement.text("No Results");
                        return;
                    }
                    var i = 0;
                    var str = "";
                    for (i = 0; i < features.length; i++) {
                        str += "<div>" + features[i].attributes[attributeName] + "</div>";
                    }
                    divElement.html(str);
                }
                function errorRemainingData(error, divElement) {
                    //console.log("Error: ", error.message);
                    divElement.text("No data");
                }
                function requestRemainingData() {
                    //Wildfire Forest Projection District
                    queryRemainingData(oreallSiteURL, "40", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                    //Structural Fire Protection District
                    queryRemainingData(oreallSiteURL, "42", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);
                    //Rangeland Protection Associations
                    queryRemainingData(oreallSiteURL, "41", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);
                    //city or town
                    queryRemainingData(fireSiteURL, "55", "name10", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);
                    //urban growth boundary
                    queryRemainingData(oreallSiteURL, "17", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);
                    //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                    queryRemainingData(oreallHazardsURL, "28", "wui_name", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);
                    //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                    queryRemainingData(oreallHazardsURL, "52", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);
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
                    // divElement.text("Within " + features[0].attributes[attributeName]);
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
                    myApp.command("ClearTemporaryMarkup").execute();
                    //deactivate view
                    myApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");
                }
            };
            return WildfireRiskPopupModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        wildfireRiskPopup.WildfireRiskPopupModuleViewModel = WildfireRiskPopupModuleViewModel;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation) {
        /* var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
         var identifyParams = new esri.tasks.IdentifyParameters();
         var elevCounter = 0;
         var elevCounterMax;
         var shellName;*/
        var ElevationModule = (function (_super) {
            __extends(ElevationModule, _super);
            function ElevationModule(app, lib) {
                _super.call(this, app, lib);
            }
            ElevationModule.prototype.initialize = function (config) {
                /*var site: geocortex.essentials.Site = (<any>this).app.site;
                if (site && site.isInitialized) {
                    this._onSiteInitialized(site);
                }
                else {
                    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                        this._onSiteInitialized(args);
                    });
                }*/
            };
            return ElevationModule;
        }(geocortex.framework.application.ModuleBase));
        elevation.ElevationModule = ElevationModule;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation) {
        var ElevationModuleView = (function (_super) {
            __extends(ElevationModuleView, _super);
            function ElevationModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return ElevationModuleView;
        }(geocortex.framework.ui.ViewBase));
        elevation.ElevationModuleView = ElevationModuleView;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation_1) {
        var demURL = "http://sampleserver5.arcgisonline.com/arcgis/rest/services/Elevation/WorldElevations/MapServer";
        var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
        var identify = new esri.tasks.IdentifyTask(demURL);
        var identifyParams = new esri.tasks.IdentifyParameters();
        var elevCounter = 0;
        var elevCounterMax;
        var shellName;
        var ElevationModuleViewModel = (function (_super) {
            __extends(ElevationModuleViewModel, _super);
            //elevation: Observable<string> = new Observable<string>();
            function ElevationModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            ElevationModuleViewModel.prototype.initialize = function (config) {
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
            ElevationModuleViewModel.prototype._onSiteInitialized = function (site) {
                elevCounterMax = 10;
                shellName = this.app.shellName;
                buildElevationHTML();
                //this.app.eventRegistry.event("ContextMenuActivated").subscribe(null, handleMouseClick);              
                this.app.eventRegistry.event("MapContextMenuPointUpdatedEvent").subscribe(null, handleMouseClick);
                function buildElevationHTML() {
                    //make sure the menu exists
                    var menuCoords = $(".map-menu-coordinates");
                    if (menuCoords == undefined || menuCoords == null)
                        return;
                    //add a div to the end of the coordinates element in the menu to hold our elevation data
                    menuCoords.append('<div><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');
                }
                function handleMouseClick(pointIn, appIn) {
                    //make sure our html element exists
                    var menuCoords = $("#GoogleElevationValue");
                    if (menuCoords == undefined && menuCoords == null)
                        return;
                    $("#GoogleElevationValue").html("Loading...");
                    //Grab the current application
                    appIn = geocortex.framework.applications[0];
                    if (appIn == undefined || appIn == null) {
                        $("#GoogleElevationValue").html("App not found");
                        return;
                    }
                    if (pointIn == undefined || pointIn == null) {
                        $("#GoogleElevationValue").html("No point supplied");
                        return;
                    }
                    //The coordinates manager hold a prevCoord which is acutally the current context menu point.
                    //var defaultX = appIn.coordinatesManager._prevCoord.x;
                    //var defaultY = appIn.coordinatesManager._prevCoord.y;
                    var defaultX = pointIn.x;
                    var defaultY = pointIn.y;
                    //The default spatial reference is 102100, change it to web mercator
                    var xyPoint = new esri.geometry.Point(defaultX, defaultY, new esri.SpatialReference({ wkid: 102100 }));
                    var geographicPoint = esri.geometry.webMercatorToGeographic(xyPoint);
                    var mapPoint = new esri.geometry.Point(geographicPoint);
                    //toss the point at google
                    var url = googleURL + mapPoint.y + "," + mapPoint.x;
                    var siteUrl = window.location.href.split("?")[0];
                    siteUrl = siteUrl.replace(siteUrl.split("/")[siteUrl.split("/").length - 1], "");
                    var proxyUrl = siteUrl + "Proxy.ashx?" + url;
                    var contentType = "application/x-www-form-urlencoded; charset=utf-8";
                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        url: proxyUrl,
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (result.results.length > 0) {
                                var elevation = result.results[0].elevation;
                                elevation = Math.round(parseFloat(elevation) * 3.28084).toString() + " ft";
                                $("#GoogleElevationValue").html(elevation);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            var error = thrownError;
                            $("#GoogleElevationValue").html("Load failed");
                            //alert(error);
                        }
                    });
                }
            };
            return ElevationModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        elevation_1.ElevationModuleViewModel = ElevationModuleViewModel;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var hyperlink_banner;
    (function (hyperlink_banner) {
        var linkUri;
        var HyperlinkBannerModule = (function (_super) {
            __extends(HyperlinkBannerModule, _super);
            function HyperlinkBannerModule(app, lib) {
                _super.call(this, app, lib);
            }
            HyperlinkBannerModule.prototype.initialize = function (config) {
                var _this = this;
                linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";
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
            HyperlinkBannerModule.prototype._onSiteInitialized = function (site) {
                //wrap banner image with a link anchor
                $(".banner-left-img").wrap('<a href="' + linkUri + '" target="_blank"></a>');
                /*$('.banner').click(function (e) {
                    if (e.pageX < 350) {
                        window.open(linkUri, '_blank');
                    }
                });
                //adds support for sponsor logo image to be next to the OE banner image before the banner text.
                try {
                   // $('.banner-text').css("left", (/\.(gif|jpg|jpeg|tiff|png)$/i).test($('.banner-right-img')[0]["src"]) ? $('.banner-right-img').width() + 370 + "px" : "370px");
                }
                catch (ex)
                { };*/
            };
            return HyperlinkBannerModule;
        }(geocortex.framework.application.ModuleBase));
        hyperlink_banner.HyperlinkBannerModule = HyperlinkBannerModule;
    })(hyperlink_banner = oe.hyperlink_banner || (oe.hyperlink_banner = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtension = (function (_super) {
            __extends(LayerActionsExtension, _super);
            function LayerActionsExtension(app, lib) {
                _super.call(this, app, lib);
            }
            LayerActionsExtension.prototype.initialize = function (config) {
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
            LayerActionsExtension.prototype._onSiteInitialized = function (site) {
                var _this = this;
                //var _layerHyperlink = null;
                // Register an implementation for the "showMetadata" and "showDownload" commands.
                this.app.commandRegistry.command("showMetadata").register(this, function (layer) {
                    // Show the text that was passed into the command.
                    // Metadata links are the first link in the description so split and send to first url.
                    /*var metadataLink = layer.description.split("http");
                    metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download:", "").replace("download:", "").replace("Download","").replace("download","") : "";
                    if (metadataLink !== "") {
                        window.open(metadataLink, "_blank");
                    }
                    else {
                        alert(layer.description)
                        }*/
                    //Is there a meta data layer hyperlink with the name metadata?  If direct to that url.  Otherwise show the layer description.
                    /*if (layer.layerHyperlinks.length > 0) {
    
                        //loop over the hyperlinks and check for Metadata
                        for (var i = 0; i < layer.layerHyperlinks.length; i++) {
    
                            if (layer.layerHyperlinks[i].text == "Metadata") {
                                window.open(layer.layerHyperlinks[i].uri, layer.layerHyperlinks[i].target);
                                return;
                            }
                        }
                    }*/
                    //Is there a meta data layer hyperlink with the name metadata?  If direct to that url.  Otherwise show the layer description.
                    /*if (layer.layerHyperlinks.length > 0) {
    
                        //loop over the hyperlinks and check for Metadata
                        for (var i = 0; i < layer.layerHyperlinks.length; i++) {
    
                            if (layer.layerHyperlinks[i].text == "Metadata") {
                                window.open(layer.layerHyperlinks[i].uri, layer.layerHyperlinks[i].target);
                                return true;
                            }
                        }
                    }
    
                    if (layer.description == undefined || layer.description == null || layer.description == "")
                        return false;*/
                    alert(layer.description);
                }, function (context) {
                    //canExecute
                    if (context == null)
                        return false;
                    //var returnVal = false;
                    //show this module if there are no custom links
                    //if (context.layerHyperlinks.length < 1)
                    //    returnVal = true;
                    //loop over the hyperlinks and check for Metadata                    
                    for (var i = 0; i < context.layerHyperlinks.length; i++) {
                        if (context.layerHyperlinks[i].text == "Metadata") {
                            //window.open(context.layerHyperlinks[i].uri, context.layerHyperlinks[i].target);
                            return false;
                        }
                    }
                    // returnVal = true;
                    if (context.description == null || context.description == "")
                        return false;
                    return true;
                    /*if (context !== null) {
                        //alert(JSON.stringify(context));
                        var isOEService = context.mapService.serviceUrl.match("lib-arcgis") !== -1 ? true : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1 ? true : false;
                        if (isOEService) {
                            return context.description !== "" ? true : false;
                        }
                        else {
                        return false
                            }
                    }
                    else {
                        return true;
                    }*/
                });
                this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                    window.open(layer.getLayerUrl(), "_blank");
                });
                this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                    // Show the text that was passed into the command.
                    // Download links are the second link in the description so split and send to second url.
                    /*var downloadLink = layer.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "") {
                        window.open(downloadLink, "_blank");
                    }
                    else {
                        var GESiteUri = this.app.site.url;
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "Extract_Layer"; //This is the ID of the workflow.
                        workflowArgs["SiteUri"] = GESiteUri;
                        workflowArgs["Layers"] = layer.displayName;
                        workflowArgs["LayerUrl"] = layer.getLayerUrl();
                        workflowArgs["LayerToken"] = layer.mapService.serviceToken;
                        //workflowArgs["LayerUser"] = layer.properties.user !== undefined ? layer.properties.user : "";
                        //workflowArgs["LayerPwd"] = layer.properties.pwd !== undefined ? layer.properties.pwd : "";
                        //workflowArgs["LayerTokenUrl"] = layer.getLayerUrl().toUpperCase().split("/REST/")[0] + "/tokens";
                        
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                    }*/
                    //Is there a meta data layer hyperlink with the name metadata?  If direct to that url.  Otherwise show the layer description.
                    if (layer.layerHyperlinks.length > 0) {
                        //loop over the hyperlinks and check for Metadata
                        for (var i = 0; i < layer.layerHyperlinks.length; i++) {
                            if (layer.layerHyperlinks[i].text == "Download") {
                                window.open(layer.layerHyperlinks[i].uri, layer.layerHyperlinks[i].target);
                                return;
                            }
                        }
                    }
                    var GESiteUri = this.app.site.url;
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "Extract_Layer"; //This is the ID of the workflow.
                    workflowArgs["SiteUri"] = GESiteUri;
                    workflowArgs["Layers"] = layer.displayName;
                    workflowArgs["LayerUrl"] = layer.getLayerUrl();
                    workflowArgs["LayerToken"] = layer.mapService.serviceToken;
                    //workflowArgs["LayerUser"] = layer.properties.user !== undefined ? layer.properties.user : "";
                    //workflowArgs["LayerPwd"] = layer.properties.pwd !== undefined ? layer.properties.pwd : "";
                    //workflowArgs["LayerTokenUrl"] = layer.getLayerUrl().toUpperCase().split("/REST/")[0] + "/tokens";                
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                }, function (context) {
                    //return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));                
                    if (context == null)
                        return false;
                    //do not show if specifically told to hide
                    if (context.properties.hideDownload !== undefined && context.properties.hideDownload.toLowerCase() == "true")
                        return false;
                    //show this module if there are no custom links
                    if (context.layerHyperlinks.length < 1)
                        return true;
                    //loop over the hyperlinks and check for Metadata
                    for (var i = 0; i < context.layerHyperlinks.length; i++) {
                        if (context.layerHyperlinks[i].text == "Download") {
                            //window.open(context.layerHyperlinks[i].uri, context.layerHyperlinks[i].target);
                            return false;
                        }
                    }
                    return true;
                });
            };
            return LayerActionsExtension;
        }(geocortex.framework.application.ModuleBase));
        layer_actions_extension.LayerActionsExtension = LayerActionsExtension;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtensionModuleView = (function (_super) {
            __extends(LayerActionsExtensionModuleView, _super);
            function LayerActionsExtensionModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return LayerActionsExtensionModuleView;
        }(geocortex.framework.ui.ViewBase));
        layer_actions_extension.LayerActionsExtensionModuleView = LayerActionsExtensionModuleView;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtensionModuleViewModel = (function (_super) {
            __extends(LayerActionsExtensionModuleViewModel, _super);
            function LayerActionsExtensionModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.greeting = new Observable();
            }
            LayerActionsExtensionModuleViewModel.prototype.initialize = function (config) {
                //if (config) {
                //    this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
                //}
            };
            return LayerActionsExtensionModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        layer_actions_extension.LayerActionsExtensionModuleViewModel = LayerActionsExtensionModuleViewModel;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var M49;
    (function (M49) {
        var M49Module = (function (_super) {
            __extends(M49Module, _super);
            function M49Module(app, lib) {
                _super.call(this, app, lib);
            }
            M49Module.prototype.initialize = function (config) {
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
            M49Module.prototype._onSiteInitialized = function (site) {
                var _this = this;
                window["_calcAreas"] = [];
                // Register an implementation of custom commands.
                this.app.commandRegistry.command("addCalcAreas").register(this, function (calcAreas) {
                    //calcArea for each AOI
                    //Allows for adding/deleting dynamically in the UI
                    //Example of the json object the receive:
                    //{
                    //    "aoi_id": {id},
                    //    "TotalArea": { TotArea }, 
                    //    "HVFarmSoil_IntersectedArea":{ dblHVFarmSoil },
                    //    "HVFarmDairy_IntersectedArea": { dblHVFarmDairy },
                    //    "HVForest1_IntersectedArea": { dblHVForest1 },
                    //    "HVForest3_IntersectedArea": { dblHVForest3 }
                    //}                
                    window["_calcAreas"].push(JSON.parse(calcAreas));
                });
                this.app.commandRegistry.command("removeCalcAreas").register(this, function (index) {
                    window["_calcAreas"].splice(index, 1);
                });
            };
            return M49Module;
        }(geocortex.framework.application.ModuleBase));
        M49.M49Module = M49Module;
    })(M49 = oe.M49 || (oe.M49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var raster_functions;
    (function (raster_functions) {
        var RasterFunctionsModule = (function (_super) {
            __extends(RasterFunctionsModule, _super);
            function RasterFunctionsModule(app, lib) {
                _super.call(this, app, lib);
            }
            RasterFunctionsModule.prototype.initialize = function (config) {
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
            RasterFunctionsModule.prototype._onSiteInitialized = function (site) {
                var _this = this;
                _this.app.commandRegistry.command("processRasterFunctions").register(this, function () {
                    var imageServicesArray = [];
                    //find Image services
                    for (var x = 0; x < site.essentialsMap.mapServices.length; x++) {
                        if (site.essentialsMap.mapServices[x].mapServiceType === "Image") {
                            var service = {};
                            service.id = site.essentialsMap.mapServices[x].id;
                            service.name = site.essentialsMap.mapServices[x].displayName;
                            imageServicesArray[0] = JSON.stringify(service);
                            var workflowArgs = {};
                            workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                            workflowArgs["mapServiceIDs"] = imageServicesArray;
                            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                        }
                    }
                    //var workflowArgs = {};
                    //workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                    //workflowArgs["mapServiceIDs"] = imageServicesArray;
                    //this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                });
                _this.app.commandRegistry.command("processRasterFunctions").execute();
            };
            return RasterFunctionsModule;
        }(geocortex.framework.application.ModuleBase));
        raster_functions.RasterFunctionsModule = RasterFunctionsModule;
    })(raster_functions = oe.raster_functions || (oe.raster_functions = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var quickStart;
(function (quickStart) {
    var template;
    (function (template) {
        var TemplateModule = (function (_super) {
            __extends(TemplateModule, _super);
            function TemplateModule(app, lib) {
                _super.call(this, app, lib);
            }
            TemplateModule.prototype.initialize = function (config) {
                alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            };
            return TemplateModule;
        }(geocortex.framework.application.ModuleBase));
        template.TemplateModule = TemplateModule;
    })(template = quickStart.template || (quickStart.template = {}));
})(quickStart || (quickStart = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var quickStart;
(function (quickStart) {
    var template;
    (function (template) {
        var TemplateModuleView = (function (_super) {
            __extends(TemplateModuleView, _super);
            function TemplateModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return TemplateModuleView;
        }(geocortex.framework.ui.ViewBase));
        template.TemplateModuleView = TemplateModuleView;
    })(template = quickStart.template || (quickStart.template = {}));
})(quickStart || (quickStart = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var quickStart;
(function (quickStart) {
    var template;
    (function (template) {
        var TemplateModuleViewModel = (function (_super) {
            __extends(TemplateModuleViewModel, _super);
            function TemplateModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.greeting = new Observable();
            }
            TemplateModuleViewModel.prototype.initialize = function (config) {
                if (config) {
                    this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
                }
            };
            return TemplateModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        template.TemplateModuleViewModel = TemplateModuleViewModel;
    })(template = quickStart.template || (quickStart.template = {}));
})(quickStart || (quickStart = {}));
//# sourceMappingURL=custom_ts_out.js.map
geocortex.resourceManager.register("Custom","inv","Modules/CustomFormM49/CustomFormM49ModuleView.html","html","DQoNCjxkaXYgY2xhc3M9Im1vZHVsZSB3b3JrZmxvdy1mb3JtIiBkaXI9Imx0ciI+DQogICAgPGZvcm0gaWQ9ImN1c3RvbUZvcm0iIHRpdGxlPSJNZWFzdXJlIDQ5IEVzdGltYXRlZCBDb25zdHJhaW50cyI+DQogICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgIDxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICA8bGVnZW5kPlNlbGVjdGVkIEFyZWEocyk8L2xlZ2VuZD4NCiAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DdXN0b20gRHJhd24gQXJlYTwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnpvb21Ub30iPlpvb20gVG88L3NwYW4+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgPGZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxsZWdlbmQ+RXN0aW1hdGVkIENvbnN0cmFpbnRzPC9sZWdlbmQ+DQogICAgICAgICAgICAgICAgPHRhYmxlIGlkPSJjb25zdHJhaW50cy10YWJsZSI+DQogICAgICAgICAgICAgICAgICAgIDx0aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+Q29uc3RyYWludHM8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BcmVhKCUpPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+DQogICAgICAgICAgICAgICAgICAgIDx0Ym9keT4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz0iYWx0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9ImNvbnN0cmFpbnQtY2VsbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SGlnaC12YWx1ZSBmYXJtbGFuZCBzb2lsIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb25zdHJhaW50LWxheWVyLWNvbnRyb2xzIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazp0b2dnbGVMYXllcn0iIGRhdGEtYXR0ci1sYXllcj0iSGlnaC12YWx1ZSBGYXJtIFNvaWxzIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2dnbGUgbGF5ZXINCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpzaG93SW5mb30iIGRhdGEtYXR0ci1jb25zdHJhaW50PSJIVkZMIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50IEluZm8NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Imh2Zmxfc29pbCI+PC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkhpZ2gtdmFsdWUgZmFybWxhbmQgZGFpcnkgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJIaWdoLXZhbHVlIEZhcm0gRGFpcnkgU29pbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlIGxheWVyDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGluayIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6c2hvd0luZm99IiBkYXRhLWF0dHItY29uc3RyYWludD0iSFZGRCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludCBJbmZvDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJodmZsX2RhaXJ5Ij48L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz0iYWx0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SGlnaC12YWx1ZSBmb3Jlc3RsYW5kPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJIaWdoLXZhbHVlIEZvcmVzdCBsYW5kIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2dnbGUgbGF5ZXINCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpzaG93SW5mb30iIGRhdGEtYXR0ci1jb25zdHJhaW50PSJIVkZvcmVzdCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludCBJbmZvDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJodmYiPjwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5MaWtlbHkgaGlnaC12YWx1ZSBmb3Jlc3RsYW5kPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJMaWtlbHkgaGlnaC12YWx1ZSBmb3Jlc3RsYW5kIHdlc3Qgb2YgdGhlIENhc2NhZGVzIFBvc3NpYmxlIGFyZWFzIG9mIGhpZ2gtdmFsdWUgZm9yZXN0bGFuZCBlYXN0IG9mIHRoZSBDYXNjYWRlcyI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlIGxheWVyDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGluayIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6c2hvd0luZm99IiBkYXRhLWF0dHItY29uc3RyYWludD0iTEhWRm9yZXN0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50IEluZm8NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Imh2Zl9saWtlbHkiPjwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICA8L3Rib2R5Pg0KICAgICAgICAgICAgICAgIDwvdGFibGU+DQogICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgPGZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxsZWdlbmQ+UERGIFJlcG9ydCBTZXR0aW5nczwvbGVnZW5kPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybSBsYWJlbC1sZWZ0IiBpZD0iY3VzdG9tRm9ybUJvZHkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0icmVwb3J0VGl0bGUiIGNsYXNzPSJmb3JtLWxhYmVsIG15TGFiZWwiPlRpdGxlPC9sYWJlbD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udHJvbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPSJyZXBvcnRUaXRsZSIgdHlwZT0idGV4dCIgcGxhY2Vob2xkZXI9IlJlcG9ydCBUaXRsZSIgdmFsdWU9IlJlcG9ydCBUaXRsZSIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2xlYXJUaXRsZX0iLz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0idXNlck5hbWUiIGlkPSJ1c2VyTmFtZWxibCIgY2xhc3M9ImZvcm0tbGFiZWwgbXlMYWJlbCI+SW5jbHVkZSBtYXA8L2xhYmVsPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jb250cm9sIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9ImluY2x1ZGVNYXAiIHR5cGU9ImNoZWNrYm94IiBjaGVja2VkIC8+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDwvZmllbGRzZXQ+DQoNCiAgICAgICAgICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQ7IHdpZHRoOjEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiIGNsYXNzPSJmb3JtLWJ0bnMiPg0KICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9Im9rQnRuIiBjbGFzcz0iYnV0dG9uIiB0eXBlPSJidXR0b24iIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnJ1bk5ld1JlcG9ydH0iPjw8IE5ldyBSZXBvcnQ8L2J1dHRvbj4NCiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSJva0J0biIgY2xhc3M9ImJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpnZXRQREZ9Ij5Eb3dubG9hZCBQREY8L2J1dHRvbj4NCiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSJjYW5jZWxCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2FuY2VsRm9ybX0iPkNsb3NlPC9idXR0b24+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgPC9kaXY+DQogICAgPC9mb3JtPg0KICAgIDxkaXYgaWQ9ImFuaW1hdGlvbiI+PC9kaXY+DQoNCjwvZGl2Pg0K");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModuleView.html","html","PGRpdiBjbGFzcz0iZWxldmF0aW9uLW1vZHVsZS12aWV3Ij4NCglFTEVWQVRJT046IDxiPjxzcGFuIGlkPSJlbGV2YXRpb24iPjwvc3Bhbj48L2I+ICAgDQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Template/TemplateModuleView.html","html","PGRpdiBjbGFzcz0idGVtcGxhdGUtbW9kdWxlLXZpZXciPg0KCTxiPjxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBncmVldGluZ30iPjwvc3Bhbj48L2I+DQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Custom","inv","Modules/WildfireRiskPopup/WildfireRiskPopupModuleView.html","html","ICA8ZGl2IGlkPSJXaWxkZmlyZVJpc2tQb3B1cCIgY2xhc3M9Im1vZHVsZSB2aWV3IG1hcC10aXAtdmlldyIgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlOyB0b3A6NDBweDsgei1pbmRleDoyMDA7Ij4gDQogICAgPGRpdiBjbGFzcz0iV2lsZGZpcmVSaXNrUG9wdXBIZWFkZXIiPg0KICAgICAgICA8ZGl2IGNsYXNzPSJXaWxkZmlyZVJpc2tQb3B1cEhlYWRlclRleHQiPllvdXIgTG9jYXRpb248L2Rpdj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0icGFuZWwtaGVhZGVyLWJ1dHRvbiBXaWxkZmlyZVJpc2tQb3B1cENsb3NlQnV0dG9uIGNsb3NlLTE2IiB0aXRsZT0gIkNsb3NlIE1hcCBUaXAiID48L2J1dHRvbj4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJXaWxkZmlyZVJpc2tQb3B1cENvbnRlbnQiPg0KICAgICAgICA8IS0tPGRpdiBpZD0iV2lsZGZpcmVSaXNrX2xvYWRpbmciPkxvYWRpbmcuLi48L2Rpdj4tLT4NCiAgICAgICAgPGRpdiBpZD0iV2lsZGZpcmVSaXNrX2NvbnRlbnQiIHN0eWxlPSJkaXNwbGF5Om5vbmUiPg0KICAgICAgICAgICAgPGgxPkF2ZXJhZ2UgV2lsZGZpcmUgUmlzayAod2l0aGluIMK8IG1pbGUpPC9oMT48ZGl2IGlkPSJXaWxkZmlyZVJpc2tfdmFsdWUiPkNhbGN1bGF0aW5nLi4uPC9kaXY+DQogICAgICAgICAgICA8aDE+RGF0YSBjb3ZlcmFnZSBpbiBzZWxlY3Rpb248L2gxPjxkaXYgaWQ9IldpbGRmaXJlUmlza19yaXNrZGF0YXBlcmNlbnQiPkNhbGN1bGF0aW5nLi4uPC9kaXY+DQogICAgICAgICAgICA8aDE+T0RGIEZvcmVzdCBQcm90ZWN0aW9uIERpc3RyaWN0PC9oMT48ZGl2IGlkPSJXaWxkZmlyZVJpc2tfZm9yZXN0X3Byb3RlY3Rpb25fZGlzdHJpY3QiPk5vIGRhdGE8L2Rpdj4NCiAgICAgICAgICAgIDxoMT5TdHJ1Y3R1cmFsIEZpcmUgUHJvdGVjdGlvbiBEaXN0cmljdDwvaDE+PGRpdiBpZD0iV2lsZGZpcmVSaXNrX3N0cnVjdHVyYWxfcHJvamVjdGlvbl9kaXN0cmljdCI+Tm8gZGF0YTwvZGl2Pg0KICAgICAgICAgICAgPGgxPlJhbmdlbGFuZCBQcm90ZWN0aW9uIEFzc29jaWF0aW9uPC9oMT48ZGl2IGlkPSJXaWxkZmlyZVJpc2tfcmFuZ2VsYW5kX3Byb3RlY3Rpb25fYXNzb2MiPk5vIGRhdGE8L2Rpdj4NCiAgICAgICAgICAgIDxoMT5DaXR5IG9yIHRvd248L2gxPjxkaXYgaWQ9IldpbGRmaXJlUmlza19jaXR5Ij5ObyBkYXRhPC9kaXY+DQogICAgICAgICAgICA8aDE+VXJiYW4gR3Jvd3RoIEJvdW5kYXJ5PC9oMT48ZGl2IGlkPSJXaWxkZmlyZVJpc2tfdXJiYW5fZ3Jvd3RoX2JvdW5kYXJ5Ij5ObyBkYXRhPC9kaXY+DQogICAgICAgICAgICA8aDE+Q1dQUCBhcmVhPC9oMT48ZGl2IGlkPSJXaWxkZmlyZVJpc2tfY3dwcF9hcmVhIj5ObyBkYXRhPC9kaXY+DQogICAgICAgICAgICA8aDE+U2VuYXRlIEJpbGwgMzYwIGFyZWE8L2gxPjxkaXYgaWQ9IldpbGRmaXJlUmlza19zZW5hdGViaWxsXzM2MCI+Tm8gZGF0YTwvZGl2Pg0KICAgICAgICA8L2Rpdj4NCiAgICAgICAgPGRpdiBjbGFzcz0iV2lsZGZpcmVSaXNrX2xpbmsiPg0KICAgICAgICAgICAgPGEgaHJlZj0iY29tbWFuZDpSdW5Xb3JrZmxvd1dpdGhBcmd1bWVudHM/d29ya2Zsb3dJZD1SdW5XaWxkZmlyZVJpc2tSZXBvcnQiPkNsaWNrIGhlcmUgZm9yIG1vcmUgaW5mb3JtYXRpb248L2E+DQogICAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/CustomFormM49/CustomFormM49Module.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA1MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQogICAgbWFyZ2luLXRvcDogNDZweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg0KICAgIC5tYWluRm9ybSBpbnB1dFt0eXBlPSJ0ZXh0Il0sIC5tYWluRm9ybSB0ZXh0YXJlYSwgLm1haW5Gb3JtIHNlbGVjdCB7DQogICAgICAgIC8qd2lkdGg6IDY1JTsqLw0KICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgfQ0KDQogICAgLm1haW5Gb3JtIGlucHV0W3R5cGU9ImRhdGUiXSB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIH0NCg0KLnRleHRCb3ggew0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUFBQUFBOw0KfQ0KDQouZXJyb3Igew0KICAgIC8qd2lkdGg6IDEwMCU7Ki8NCiAgICBwYWRkaW5nOiAwOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAvKmZvbnQtc2l6ZTogODAlOyovDQogICAgY29sb3I6IHJlZDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICM5MDA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsNCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCn0NCg0KLm15TGFiZWwgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7DQogICAgZGlzcGxheTogaW5saW5lLWZsZXg7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsNCn0NCg0KI2N1c3RvbUZvcm0gZmllbGRzZXR7DQogICAgYm9yZGVyOnNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6MC4yNXJlbTsNCiAgICBtYXJnaW46MmVtIGF1dG87DQp9DQoubGluayB7DQogICAgY29sb3I6IzFBNzJDNDsNCn0NCi5saW5rOmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ciB0ZHsNCiAgICBwYWRkaW5nOi42ZW07DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ci5hbHR7DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjQwLDI0MCwyNDApOw0KfQ0KLmNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHN7DQogICAgbWFyZ2luLWxlZnQ6MWVtOw0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIHBhZGRpbmctdG9wOjNweDsNCn0NCi5jb25zdHJhaW50LWxheWVyLWNvbnRyb2xzIHNwYW46Zmlyc3QtY2hpbGR7DQogICAgcGFkZGluZy1yaWdodDoxMHB4Ow0KfQ0KLmNvbnN0cmFpbnQtY2VsbHsNCiAgICBtaW4td2lkdGg6MjUwcHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModule.css","css","DQovKi5yZWdpb24gLnZpZXcuVGVtcGxhdGVNb2R1bGVWaWV3LmFjdGl2ZSB7DQogICAgbWFyZ2luOiAwOw0KfSovDQoNCi5lbGV2YXRpb24tbW9kdWxlLXZpZXcNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbGVmdDozMjVweDsNCiAgICB0b3A6MDsNCiAgICBmbG9hdDpyaWdodDsNCiAgICAvKnotaW5kZXg6IDEwMDsqLw0KICAgIGZvbnQtc2l6ZTouODVlbTsNCiAgICB3aWR0aDogMTc1cHg7ICAgDQogICAgaGVpZ2h0OjIwcHg7DQogICAgLypyaWdodDogMDsqLw0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgY29sb3I6ICMzMzM7DQogICAgLypwYWRkaW5nOiA2cHg7Ki8NCiAgICBib3JkZXI6IG5vbmU7DQogICAgbWFyZ2luLXRvcDogMTBweDsgICAgDQp9DQoNCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Template/TemplateModule.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHotaW5kZXg6IDEwMDsNCiAgICB3aWR0aDogMjAwcHg7DQogICAgcmlnaHQ6IDA7DQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHBhZGRpbmc6IDZweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzOw0KICAgIG1hcmdpbi10b3A6IDQ2cHg7DQogICAgbWFyZ2luLXJpZ2h0OiAycHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/WildfireRiskPopup/WildfireRiskPopupModule.css","css","I1dpbGRmaXJlUmlza1BvcHVwIHsgIA0KICB6LWluZGV4OjIyMDsgICANCiAgd2lkdGg6IDI1MHB4Ow0KICAvKmhlaWdodDogMTUwcHg7Ki8NCiAgcGFkZGluZzo0cHggMTBweCA0cHggMTBweDsNCiAgYm9yZGVyOiAxcHggc29saWQgI0ExQjhFMTsNCiAgYm9yZGVyLXJhZGl1czogMnB4OyAgICANCiAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICBjb2xvcjogIzAwMDAwMDsNCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwSGVhZGVyIHsgIA0KICAgIGZsb2F0OmxlZnQ7DQogICAgd2lkdGg6MTAwJTsNCiAgICBmb250LXNpemU6MS4yZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBwYWRkaW5nLXRvcDowLjNlbTsNCiAgICBwYWRkaW5nLWJvdHRvbTowLjVlbTsNCiAgICBjb2xvcjpyZ2JhKDEwNSwgMTA1LCAxMDUsIDEpOw0KfQ0KDQouV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50IHsgIA0KICAgIGZvbnQtc2l6ZToxZW07DQp9DQoNCi5XaWxkZmlyZVJpc2tfbGluayB7ICAgIA0KICAgIHBhZGRpbmc6OHB4IDBweCA4cHggMHB4Ow0KfQ0KDQouV2lsZGZpcmVSaXNrX2xpbmsgYSB7DQogICAgZm9udC1zaXplOjEuMmVtOw0KICAgIGNvbG9yOiMwMDAwMDA7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENsb3NlQnV0dG9uIHsgIA0KICAgIHBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjBlbTsNCiAgICB0b3A6Mi41ZW07DQp9DQoNCiNXaWxkZmlyZVJpc2tfY29udGVudCBoMSB7DQogICAgZm9udC1zaXplOjFlbTsNCiAgICBmb250LXdlaWdodDpub3JtYWw7DQogICAgY29sb3I6cmdiYSg3MCwgMTMyLCAxODAsIDEpOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgZGl2IHsNCiAgICBwYWRkaW5nLWxlZnQ6IDZweDsNCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IGRpdiBkaXYgew0KICAgIHBhZGRpbmc6MHB4Ow0KfQ0K");
geocortex.resourceManager.register("Custom","inv","Invariant","json","eyJoZWxsby13b3JsZC1pbml0aWFsaXplZCI6IkhlbGxvIHdvcmxkISBUZW1wbGF0ZSBtb2R1bGUgaW5pdGlhbGl6ZWQuIiwiaGVsbG8td29ybGQtZ3JlZXRpbmciOiJIZWxsbywgd29ybGQuIn0=");

geocortex.framework.notifyLibraryDownload("Custom");
