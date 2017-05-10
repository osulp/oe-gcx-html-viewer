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
                        else if (result.status == "OVER_QUERY_LIMIT") {
                            $("#GoogleElevationValue").html("Query Limit.  Wait a moment and try again.");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        var error = thrownError;
                        $("#GoogleElevationValue").html("Load failed");
                       //alert(error);
                    },
                    complete: function (xhr, status) {
                        if (status != "success" && status != "error" )
                            $("#GoogleElevationValue").html(status);
                    }
                });
                

            }                       
        }        
    }
}