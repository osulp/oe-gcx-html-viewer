/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.elevation {
    //var demURL = "http://sampleserver5.arcgisonline.com/arcgis/rest/services/Elevation/WorldElevations/MapServer";
    //var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
    var usgsURL = "https://nationalmap.gov/epqs/pqs.php?";//x=47&y=-123&units=Feet&output=json"
    //var identify = new esri.tasks.IdentifyTask(demURL);
    //var identifyParams = new esri.tasks.IdentifyParameters();
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
                var defaultX = pointIn.x;
                var defaultY = pointIn.y;

                //The default spatial reference is 102100, change it to web mercator
                var xyPoint = new esri.geometry.Point(defaultX,defaultY,new esri.SpatialReference({ wkid: 102100 }));
                var geographicPoint = esri.geometry.webMercatorToGeographic(xyPoint);
                var mapPoint = new esri.geometry.Point(geographicPoint);

                //toss point at usgs
                var url = usgsURL + "x=" + mapPoint.x + "&y=" + mapPoint.y + "&units=feet&output=json";
                                                
                $.get(url, "", null, "json")
                    .done(function (result) {

                        var elevation = result.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation;
                        if (elevation > -10000) {
                            elevation = Math.round(parseFloat(elevation)).toString() + " ft";
                            $("#GoogleElevationValue").html(elevation);
                        }
                        else {
                            $("#GoogleElevationValue").html("No data");
                        }
                    })
                    .fail(function (xhr, ajaxOptions, thrownError) {
                        $("#GoogleElevationValue").html("Load failed");
                    });
            }            
        }        
    }
}