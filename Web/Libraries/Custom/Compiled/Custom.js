var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Framework.UI.d.ts" />
var dijitPopup;
require(["dijit/popup", "dojo/domReady!", "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask"], function (_dijitPopup) { dijitPopup = _dijitPopup; });
var oe;
(function (oe) {
    var add_community_data;
    (function (add_community_data) {
        var layer, attribute, attributeLabel, year, geography, includeMOE, hoverLabel, fillStyle, geographyField, failedCounter = 0, popup, pendingMapTip = false;
        var AddCommunityDataModule = (function (_super) {
            __extends(AddCommunityDataModule, _super);
            function AddCommunityDataModule(app, lib) {
                _super.call(this, app, lib);
            }
            AddCommunityDataModule.prototype.initialize = function (config) {
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
            AddCommunityDataModule.prototype._onSiteInitialized = function (site) {
                var _this = this;
                this.app.registerActivityIdHandler("AddDemographicOverlay", function (context) {
                    if (context.getInputNames().length > 0) {
                        //get input values   
                        layer = context.getValue("layer");
                        attribute = context.getValue("attribute");
                        year = context.getValue("year");
                        geography = context.getValue("geography");
                        var color = context.getValue("color");
                        var breaks = context.getValue("breaks");
                        var method = context.getValue("method");
                        hoverLabel = context.getValue("hoverlabel") === "true" ? true : false;
                        fillStyle = context.getValue("fillStyle");
                        attributeLabel = context.getValue("attributeLabel");
                        includeMOE = context.getValue("incldeMOE");
                        var generateRendererTask = new esri.tasks.GenerateRendererTask(layer);
                        var generateRendererTaskMOE = new esri.tasks.GenerateRendererTask(layer);
                        var classDef = new esri.tasks.ClassBreaksDefinition();
                        pendingMapTip = hoverLabel ? true : false;
                        switch (method) {
                            case "esriClassifyNaturalBreaks":
                                classDef.classificationMethod = "natural-breaks";
                                break;
                            case "esriClassifyQuantile":
                                classDef.classificationMethod = "quantile";
                                break;
                            case "esriClassifyEqualInterval":
                            default:
                                classDef.classificationMethod = "equal-interval";
                                break;
                        }
                        if (method.indexOf("Deviation") !== -1) {
                            classDef.classificationMethod = "standard-deviation";
                            switch (method) {
                                case "esriClassifyStandardDeviation.5":
                                    classDef.standardDeviationInterval = .5;
                                    break;
                                case "esriClassifyStandardDeviation.33":
                                    classDef.standardDeviationInterval = .33;
                                    break;
                                case "esriClassifyStandardDeviation.25":
                                    classDef.standardDeviationInterval = .25;
                                    break;
                                default:
                                case "esriClassifyStandardDeviation1":
                                    classDef.standardDeviationInterval = 1;
                                    break;
                            }
                        }
                        classDef.classificationField = attribute;
                        classDef.breakCount = parseInt(breaks);
                        var colorRamp = new esri.tasks.AlgorithmicColorRamp();
                        colorRamp.algorithm = "hsv";
                        colorRamp.fromColor = esri.Color.fromHex('#FFFFFF');
                        var toColor = 'rgba(147, 35, 32, .5)';
                        switch (color) {
                            case "Blue":
                                toColor = 'rgba(9, 51, 103, .5)';
                                break;
                            case "Orange":
                                toColor = 'rgba(157, 60, 0, .5)';
                                break;
                            case "Purple":
                                toColor = 'rgba(83, 55, 117, .5)';
                                break;
                            case "Black":
                                toColor = 'rgba(12, 12, 12, .5)';
                                break;
                            default:
                            case "Red":
                                toColor = 'rgba(147, 35, 32, .5)';
                                break;
                        }
                        colorRamp.toColor = esri.Color.fromRgb(toColor);
                        classDef.colorRamp = colorRamp;
                        classDef.baseSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 0, 0]), 0.4), null);
                        var params = new esri.tasks.GenerateRendererParameters();
                        params.classificationDefinition = classDef;
                        params.precision = 2;
                        params.unitLabel = attributeLabel.indexOf('ercent') !== -1 ? "%" : "";
                        //params.where = "1=1";
                        generateRendererTask.execute(params, handleRendererResponse, function error(er) {
                            if (failedCounter < 5) {
                                failedCounter++;
                                generateRendererTask.execute(params, handleRendererResponse);
                            }
                            else {
                                failedCounter = 0;
                                alert("Sorry, that attribute is not available for display for your selected geography and year.");
                            }
                        });
                        function handleRendererResponse(renderer) {
                            var title = attributeLabel + " " + year + " by " + geography;
                            var isMOE = false;
                            if (renderer.attributeField.indexOf("_M") !== -1) {
                                isMOE = true;
                                title = attributeLabel + " MOE " + year + " by " + geography;
                            }
                            //Find the map service and layer from input 
                            var mapserviceId = 0;
                            var layerId = 0;
                            for (var x = 0; x < site.essentialsMap.mapServices.length; x++) {
                                if (layer.indexOf(site.essentialsMap.mapServices[x].serviceUrl) !== -1) {
                                    mapserviceId = x;
                                    for (var y = 0; y < site.essentialsMap.mapServices[x].layers.length; y++) {
                                        if (layer.endsWith("/" + site.essentialsMap.mapServices[x].layers[y].id)) {
                                            layerId = y;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            //if (layerId === undefined) { alert("map layer not loaded"); } else { }
                            //selectedAttributeList.Add(mapserviceId, layerId, _layer, true, attribute, attribute_label, year, includMOE, geography);
                            if (layerId === undefined) {
                                //layer not loaded, need to add to root
                                var mapservice = new esri.layers.ArcGISDynamicMapServiceLayer(layer);
                            }
                            else {
                                //var gcx_layer = site.essentialsMap.mapServices[mapserviceId].layers[layerId];
                                //site.essentialsMap.mapServices[mapserviceId].isExpanded = true;
                                //gcx_layer.setVisibility(true, true);
                                //gcx_layer.includeInLayerList = true;
                                //gcx_layer.identifiable = true;
                                var isDiv100 = false;
                                //format break display
                                //for (var z = 0; z < renderer.infos.length; z++) {
                                //    var salabel = renderer.infos[z].label.split("-");
                                //    var labelMin = parseFloat(salabel[0]);
                                //    var labelMax = salabel.length > 1 ? parseFloat(salabel[1]) : labelMin;
                                //    isDiv100 = labelMax > 1 ? true : false;
                                //    var formatter = attributeLabel.indexOf("opulation") !== -1 ? "N0" : attributeLabel.indexOf("ercent") !== -1 ? "P" : "N1";
                                //    if (attributeLabel.indexOf("ercent") !== -1 && labelMax > 1) {
                                //        labelMax = labelMax / 100;
                                //        labelMin = labelMin / 100;
                                //    }       
                                //    renderer.infos[z].label = labelMin.toString() + " - " + labelMax.toString();   
                                //    //fillstyle options esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical 
                                //    renderer.infos[z].symbol.style = fillStyle === "CrossHatch" || isMOE ? "esriSFSCross" : "";  
                                //}                                      
                                //var gcx_featurelayer = new geocortex.essentials.FeatureLayerService(layer);
                                //var gcx_layer = new geocortex.essentials.Layer(layer);
                                //var allLayer = site.essentialsMap.allLayers();
                                //allLayer.push(gcx_layer);
                                var featureLayer = new esri.layers.FeatureLayer(layer, {
                                    mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                                    outFields: ["Name", attribute, attribute + "_M"]
                                });
                                featureLayer.setRenderer(renderer);
                                _this.app.map.infoWindow.resize(245, 125);
                                var dialog = new dijit.TooltipDialog();
                                dialog.id = "tooltipDialog";
                                dialog.style = "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100";
                                dialog.startup();
                                var highlightSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0]), 3), new esri.Color([125, 125, 125, 0.35]));
                                //close the dialog when the mouse leaves the highlight graphic
                                _this.app.map.graphics.enableMouseEvents();
                                _this.app.map.graphics.on("mouse-out", closeDialog);
                                //listen for when the onMouseOver event fires on the countiesGraphicsLayer
                                //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
                                featureLayer.on("mouse-over", function (evt) {
                                    var attr = evt.graphic.attributes;
                                    //var t = "<b>{Name} " + geography + "</b><hr><b>{" + attribute + "}" + (evt.graphic.attributes[attribute + "_M"] !== undefined ? "+/- {" + attribute + "_M}" : "") + "</b><hr>";
                                    var t = "<b>" + attr.Name + " " + geography + "</b><hr><b>" + attr[attribute] + (attr[attribute + "_M"] !== undefined ? "+/- " + attr[attribute + "_M"] : "") + "</b><hr>";
                                    //var content = esri.lang.substitute(evt.graphic.attributes, t);
                                    var highlightGraphic = new esri.Graphic(evt.graphic.geometry, highlightSymbol);
                                    _this.app.map.graphics.add(highlightGraphic);
                                    dialog.setContent(t);
                                    dialog.startup();
                                    dijitPopup.open({
                                        popup: dialog,
                                        x: evt.pageX,
                                        y: evt.pageY
                                    });
                                });
                                function closeDialog() {
                                    _this.app.map.graphics.clear();
                                    dijitPopup.close(dialog);
                                }
                                _this.app.map.addLayer(featureLayer, 2);
                                site.essentialsMap.addServiceLayers([featureLayer], "Operational");
                                //get item from layerListItems, copy it and modify to match new layer and add back
                                var newLayer = _this.app.viewManager.getViewById("LayerListView").viewModel.layerListItems[0];
                                //var newLayer = new geocortex.essentials.Layer(layer);
                                //newLayer.displayName = "TEST";                            
                                _this.app.viewManager.getViewById("LayerListView").viewModel.layerListItems.addItem();
                                var essentialMapServices = site.essentialsMap.mapServices;
                                for (var l = 0; l < essentialMapServices.length; l++) {
                                    if (layer.indexOf(essentialMapServices[l].serviceUrl) !== -1) {
                                        essentialMapServices[l].setVisibility(true);
                                        essentialMapServices[l].add(new geocortex.essentials.Layer(layer));
                                        essentialMapServices[l].layers[0].setVisibility(true);
                                        break;
                                    }
                                }
                            }
                            //SetConfigXaml(isDiv100); //dynamic map tips     
                            //var obj = RendererDetails;
                            //var ms = new MemoryStream();
                            //dataContractJson.WriteObject(ms, RendererDetails);
                            //ms.Position = 0;
                            //var sr = new StreamReader(ms);
                            //var newJson = sr.ReadToEnd();
                            //renderer = Renderer.FromJson(newJson);
                            //System.Action < Geocortex.Essentials.Client.Layer, Exception > duplicateLayerAction = null;
                            //duplicateLayerAction = duplicateLayerCallback;
                            //layer.DuplicateLayer(false, renderer, title, title, duplicateLayerAction);
                        }
                    }
                    context.completeActivity();
                });
            };
            return AddCommunityDataModule;
        }(geocortex.framework.application.ModuleBase));
        add_community_data.AddCommunityDataModule = AddCommunityDataModule;
    })(add_community_data = oe.add_community_data || (oe.add_community_data = {}));
})(oe || (oe = {}));
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
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var custom_map_tip;
    (function (custom_map_tip) {
        //var linkUri: string;
        var pup = null; // This is the popup box, represented by a div    
        var identifier = "CustomMapTipPopup"; // Name of ID and class of the popup box
        var contentDiv = null;
        var gsvc = null; // geo service, load later
        var CustomMapTipModule = (function (_super) {
            __extends(CustomMapTipModule, _super);
            function CustomMapTipModule(app, lib) {
                _super.call(this, app, lib);
            }
            CustomMapTipModule.prototype.initialize = function (config) {
                var _this = this;
                //linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";      
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
            CustomMapTipModule.prototype._onSiteInitialized = function (site) {
                //disable normal map tips
                this.app.command("DisableMapTips").execute();
                //try to inject the html into the naivgation region
                var navRegion = $(".map-navigation-region");
                if (navRegion == undefined || navRegion == null)
                    return;
                //start the service, used to buffer the point
                gsvc = new esri.tasks.GeometryService("http://lib-arcgis2.library.oregonstate.edu/arcgis/rest/services/Geometry/GeometryServer");
                //add a div to the end of the coordinates element in the menu to hold our elevation data
                var tipBox = '<div id="' + identifier +
                    '" class="' + identifier + ' view MapTipView" ' +
                    'style="position:abolute; display:none; z-index:200;"> ' +
                    '<div class="CustomMapTipHeader">' +
                    '<div class="CustomMapTipHeaderText">Header 123</div>' +
                    '<button class="panel-header-button CustomMapTipCloseButton close-16" title= "Close Map Tip" ></button>' +
                    '</div>' +
                    '<div class="CustomMapTipContent">' +
                    'Loading...' +
                    '</div>' +
                    '</div>';
                //add popup to nav region
                navRegion.append(tipBox);
                //create an event for the close button
                $(".CustomMapTipCloseButton").click(closeCustomMapTip);
                //save a reference to the popup element
                pup = $('#' + identifier);
                contentDiv = $(".CustomMapTipContent");
                //grab the geocortex map event
                this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
                function handleMouseClick(pointIn, appIn) {
                    //Grab the current application
                    appIn = geocortex.framework.applications[0];
                    //load content first
                    /*var newSymbol = this.esri.symbol.SimpleMarkerSymbol({
                        style: "square",
                        color: "blue",
                        size: "32px",  // pixels
                        outline: {  // autocasts as esri/symbols/SimpleLineSymbol
                            color: [255, 255, 0],
                            width: 3  // points
                        }
                    });*/
                    contentDiv.html("Loading...");
                    //show the point on map
                    appIn.command("ClearTemporaryMarkup").execute();
                    appIn.command("AddTemporaryMarkupGeometry").execute(pointIn.mapPoint);
                    //var buffArgs = appIn.command("BufferGeometryArgs").execute();
                    //var geoBuffed = appIn.command("BufferGeometry").execute(buffArgs);
                    var params = new esri.tasks.BufferParameters();
                    params.geometries = [pointIn.mapPoint];
                    params.distances = [0.25];
                    params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                    params.outSpatialReference = pointIn.mapPoint.spatialReference;
                    //show the popup
                    pup.css("display", "block");
                    gsvc.buffer(params, bufferResult);
                }
                function bufferResult(geometries) {
                    if (geometries == null || geometries.length < 1) {
                        contentDiv.html("Buffer failed.  Close the window and try again.");
                        return;
                    }
                    //Grab the current application
                    var appIn = geocortex.framework.applications[0];
                    contentDiv.html("Loading... data. Buffer Complete.");
                    /*var symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(
                            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([0, 0, 255, 0.65]), 2
                        ),
                        new dojo.Color([0, 0, 255, 0.35])
                    );*/
                    //var graphic = new esri.Graphic(geometries[0], symbol);
                    //show the buffer for now
                    appIn.command("AddTemporaryMarkupGeometry").execute(geometries[0]);
                    require(["esri/layers/ImageServiceParameters"], function (ImageServiceParameters) {
                        var params = new ImageServiceParameters();
                        var rasterF = new esri.layers.RasterFunction();
                        rasterF.functionName = "Clip";
                        rasterF.functionArguments = {
                            "ClippingGeometry": geometries[0],
                            "ClippingType": 1,
                            "variableName": "Raster"
                        };
                        params.renderingRule = rasterF;
                        var imageServiceLayer = new esri.layers.ArcGISImageServiceLayer("http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/1", { imageServiceParameters: params });
                        imageServiceLayer.on("load", rasterClipLoaded);
                        function rasterClipLoaded(layer) {
                            alert(layer);
                            //try some statistics
                            /*var rasterF = new esri.layers.RasterFunction();
   
                            rasterF.functionName = "Statistics";
                            rasterF.functionArguments = {
                                "Type": "Max",
                                "KernelColumns": 1,
                                "KernelRows": 1,
                                "Raster": layer.layer.raster
                            }
                            rasterF.variableName = "rValue"*/
                        }
                    });
                }
                function closeCustomMapTip() {
                    //Grab the current application
                    var appIn = geocortex.framework.applications[0];
                    appIn.command("ClearTemporaryMarkup").execute();
                    pup.css("display", "none");
                }
            };
            return CustomMapTipModule;
        }(geocortex.framework.application.ModuleBase));
        custom_map_tip.CustomMapTipModule = CustomMapTipModule;
    })(custom_map_tip = oe.custom_map_tip || (oe.custom_map_tip = {}));
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
geocortex.resourceManager.register("Custom","inv","Modules/CustomFormM49/CustomFormM49Module.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA1MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQogICAgbWFyZ2luLXRvcDogNDZweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg0KICAgIC5tYWluRm9ybSBpbnB1dFt0eXBlPSJ0ZXh0Il0sIC5tYWluRm9ybSB0ZXh0YXJlYSwgLm1haW5Gb3JtIHNlbGVjdCB7DQogICAgICAgIC8qd2lkdGg6IDY1JTsqLw0KICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgfQ0KDQogICAgLm1haW5Gb3JtIGlucHV0W3R5cGU9ImRhdGUiXSB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIH0NCg0KLnRleHRCb3ggew0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUFBQUFBOw0KfQ0KDQouZXJyb3Igew0KICAgIC8qd2lkdGg6IDEwMCU7Ki8NCiAgICBwYWRkaW5nOiAwOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAvKmZvbnQtc2l6ZTogODAlOyovDQogICAgY29sb3I6IHJlZDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICM5MDA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsNCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCn0NCg0KLm15TGFiZWwgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7DQogICAgZGlzcGxheTogaW5saW5lLWZsZXg7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsNCn0NCg0KI2N1c3RvbUZvcm0gZmllbGRzZXR7DQogICAgYm9yZGVyOnNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6MC4yNXJlbTsNCiAgICBtYXJnaW46MmVtIGF1dG87DQp9DQoubGluayB7DQogICAgY29sb3I6IzFBNzJDNDsNCn0NCi5saW5rOmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ciB0ZHsNCiAgICBwYWRkaW5nOi42ZW07DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ci5hbHR7DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjQwLDI0MCwyNDApOw0KfQ0KLmNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHN7DQogICAgbWFyZ2luLWxlZnQ6MWVtOw0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIHBhZGRpbmctdG9wOjNweDsNCn0NCi5jb25zdHJhaW50LWxheWVyLWNvbnRyb2xzIHNwYW46Zmlyc3QtY2hpbGR7DQogICAgcGFkZGluZy1yaWdodDoxMHB4Ow0KfQ0KLmNvbnN0cmFpbnQtY2VsbHsNCiAgICBtaW4td2lkdGg6MjUwcHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModule.css","css","DQovKi5yZWdpb24gLnZpZXcuVGVtcGxhdGVNb2R1bGVWaWV3LmFjdGl2ZSB7DQogICAgbWFyZ2luOiAwOw0KfSovDQoNCi5lbGV2YXRpb24tbW9kdWxlLXZpZXcNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbGVmdDozMjVweDsNCiAgICB0b3A6MDsNCiAgICBmbG9hdDpyaWdodDsNCiAgICAvKnotaW5kZXg6IDEwMDsqLw0KICAgIGZvbnQtc2l6ZTouODVlbTsNCiAgICB3aWR0aDogMTc1cHg7ICAgDQogICAgaGVpZ2h0OjIwcHg7DQogICAgLypyaWdodDogMDsqLw0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgY29sb3I6ICMzMzM7DQogICAgLypwYWRkaW5nOiA2cHg7Ki8NCiAgICBib3JkZXI6IG5vbmU7DQogICAgbWFyZ2luLXRvcDogMTBweDsgICAgDQp9DQoNCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Template/TemplateModule.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHotaW5kZXg6IDEwMDsNCiAgICB3aWR0aDogMjAwcHg7DQogICAgcmlnaHQ6IDA7DQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHBhZGRpbmc6IDZweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzOw0KICAgIG1hcmdpbi10b3A6IDQ2cHg7DQogICAgbWFyZ2luLXJpZ2h0OiAycHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Invariant","json","eyJoZWxsby13b3JsZC1pbml0aWFsaXplZCI6IkhlbGxvIHdvcmxkISBUZW1wbGF0ZSBtb2R1bGUgaW5pdGlhbGl6ZWQuIiwiaGVsbG8td29ybGQtZ3JlZXRpbmciOiJIZWxsbywgd29ybGQuIn0=");

geocortex.framework.notifyLibraryDownload("Custom");
