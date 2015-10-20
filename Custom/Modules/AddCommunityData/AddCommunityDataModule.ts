/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Framework.UI.d.ts" />
var dijitPopup;
require(["dijit/popup", "dojo/domReady!", "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask"], function (_dijitPopup) { dijitPopup = _dijitPopup });

module oe.add_community_data {
    var layer,
        attribute,
        attributeLabel,
        year,
        geography,
        includeMOE,
        hoverLabel,
        fillStyle,
        geographyField,
        failedCounter = 0,
        popup: dijit.popup.open,
        pendingMapTip = false;     

    export class AddCommunityDataModule extends geocortex.framework.application.ModuleBase {        

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {                                    
                          
            var site: geocortex.essentials.Site = (<any>this).app.site;      
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }

        }

        _onSiteInitialized(site: geocortex.essentials.Site) {
            var _this = this;
            this.app.registerActivityIdHandler("AddDemographicOverlay", function (context:geocortex.workflow.ActivityContext) {
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

                    switch (method) {//natural-breaks | equal-interval | quantile | standard-deviation | geometrical-interval
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
                        switch (method) {                            case "esriClassifyStandardDeviation.5":
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
                    classDef.baseSymbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(
                            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new esri.Color([0, 0, 0]),
                            0.4
                            ),
                        null
                        );
                    var params = new esri.tasks.GenerateRendererParameters();
                    params.classificationDefinition = classDef;
                    params.precision = 2;
                    params.unitLabel = attributeLabel.indexOf('ercent') !== -1 ? "%" : "";                    
                    //params.where = "1=1";
                    generateRendererTask.execute(params, handleRendererResponse,
                        function error(er) {
                            if (failedCounter < 5) {
                                failedCounter++;
                                generateRendererTask.execute(params, handleRendererResponse);
                            }
                            else {
                                failedCounter = 0;
                                alert("Sorry, that attribute is not available for display for your selected geography and year.");
                            }
                        }
                        );
                    function handleRendererResponse(renderer: esri.renderer.ClassBreaksRenderer) {
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
                                outFields: ["Name",attribute, attribute + "_M"]
                            });
                            featureLayer.setRenderer(renderer);


                            _this.app.map.infoWindow.resize(245, 125);

                            var dialog = new dijit.TooltipDialog();
                            dialog.id = "tooltipDialog";
                            dialog.style = "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100";                            
                            dialog.startup();

                            var highlightSymbol = new esri.symbol.SimpleFillSymbol(
                                esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                new esri.symbol.SimpleLineSymbol(
                                    esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                    new esri.Color([255, 0, 0]), 3
                                    ),
                                new esri.Color([125, 125, 125, 0.35])
                                );

                            //close the dialog when the mouse leaves the highlight graphic
                            _this.app.map.graphics.enableMouseEvents();
                            _this.app.map.graphics.on("mouse-out", closeDialog);
                                            
                            //listen for when the onMouseOver event fires on the countiesGraphicsLayer
                            //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
                            featureLayer.on("mouse-over", function (evt) {
                                var attr = evt.graphic.attributes;
                                //var t = "<b>{Name} " + geography + "</b><hr><b>{" + attribute + "}" + (evt.graphic.attributes[attribute + "_M"] !== undefined ? "+/- {" + attribute + "_M}" : "") + "</b><hr>";
                                var t = "<b>" + attr.Name  + " " + geography + "</b><hr><b>" + attr[attribute] + (attr[attribute + "_M"] !== undefined ? "+/- " + attr[attribute + "_M"] : "") + "</b><hr>";
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
                            //site.essentialsMap.loadServiceLayersInMap(site.essentialsMap.getMap());                         
                            //site.essentialsMap.(                          
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
        }
    }
}