/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.elevation {
    var demURL = "http://sampleserver5.arcgisonline.com/arcgis/rest/services/Elevation/WorldElevations/MapServer";
    var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
    var identify = new esri.tasks.IdentifyTask(demURL);
    var identifyParams = new esri.tasks.IdentifyParameters();
    var elevCounter = 0;
    var elevCounterMax;
    var shellName;

    export class ElevationModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        //elevation: Observable<string> = new Observable<string>();

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
            elevCounterMax = 10;
            shellName = this.app.shellName;
            //this.app.map.on("mouse-move", handleMouseMoveClick);      
            //this.app.map.on("click", handleMouseMoveClick);

            buildElevationHTML();
            this.app.eventRegistry.event("ContextMenuActivated").subscribe(null, handleMouseClick);              
            
            function buildElevationHTML() {

                //make sure the menu exists
                var menuCoords = $(".map-menu-coordinates");
                if (menuCoords == undefined || menuCoords == null)
                    return;
                                
               //add a div to the end of the coordinates element in the menu to hold our elevation data
               menuCoords.append('<div><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');
            }

            function handleMouseClick(appIn) {

                //make sure our html element exists
                var menuCoords = $("#GoogleElevationValue");
                if (menuCoords == undefined && menuCoords == null)
                    return;

                $("#GoogleElevationValue").html("Loading...");

                //Grab the current application
                appIn = geocortex.framework.applications[0];

                //The coordinates manager hold a prevCoord which is acutally the current context menu point.
                var defaultX = appIn.coordinatesManager._prevCoord.x;
                var defaultY = appIn.coordinatesManager._prevCoord.y;

                //The default spatial reference is 102100, change it to web mercator
                var xyPoint = new esri.geometry.Point(defaultX,defaultY,new esri.SpatialReference({ wkid: 102100 }));
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

            function handleMouseMoveClick(evt) {
                              
                if (elevCounter === 0 || shellName !== "Desktop") {
                    elevCounter++;
                    if (this.extent !== undefined) {
                        var extent = this.extent;
                        var mapHeight = this.height;
                        var mapWidth = this.width;
                                               
                        //check to see if the result window is open, if so need to add to width or else values are wrong
                        var clientX = evt.clientX - $(".DataFrameResultsContainerView").width();
                        var screenPoint = new esri.geometry.ScreenPoint(clientX, evt.clientY);
                        var mapGeometry = esri.geometry.toMapPoint(extent, mapWidth, mapHeight, screenPoint);
                        var geographicPoint = esri.geometry.webMercatorToGeographic(mapGeometry);
                        var mapPoint = new esri.geometry.Point(geographicPoint);

                        var url = googleURL + mapPoint.y + "," + mapPoint.x;
                        //var proxyUrl = window.location.href.replace(window.location.href.split("/")[window.location.href.split("/").length - 1], "") + "Proxy.ashx?" + url;
                        var siteUrl = window.location.href.split("?")[0];
                        siteUrl = siteUrl.replace(siteUrl.split("/")[siteUrl.split("/").length - 1], "");
                        //alert(siteUrl);
                        var proxyUrl = siteUrl + "Proxy.ashx?" + url;
                        //var proxyUrl = window.location.href.replace(window.location.pathname, "/Proxy.ashx?" + url);
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
                                    $("#elevation").html(elevation);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                var error = thrownError;
                                alert(error);
                            }
                        });
                    }
                }
                else {
                    elevCounter = elevCounter === (elevCounterMax - 1) ? 0 : (elevCounter + 1);
                }
            }   
        }        
    }
}