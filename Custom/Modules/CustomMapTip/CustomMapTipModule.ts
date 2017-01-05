/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.custom_map_tip {

    //var linkUri: string;

    var pup = null;             // This is the popup box, represented by a div    
    var identifier = "CustomMapTipPopup";      // Name of ID and class of the popup box
    var contentDiv = null;
    var gsvc = null; // geo service, load later
        
    export class CustomMapTipModule extends geocortex.framework.application.ModuleBase {
        
        app: geocortex.essentialsHtmlViewer.ViewerApplication;
                                
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {                                    
            //linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";      
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
                     }

                     params.renderingRule = rasterF;

                     var imageServiceLayer = new esri.layers.ArcGISImageServiceLayer("http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/1",
                         { imageServiceParameters: params });

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
                                    
        }
    }
}