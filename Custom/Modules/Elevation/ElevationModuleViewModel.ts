/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.elevation {    
    var usgsURL = "https://nationalmap.gov/epqs/pqs.php?";//x=47&y=-123&units=Feet&output=json"
    var elevCounter = 0;
    var elevCounterMax;
    var shellName;

    export class ElevationModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        pointIn: Observable<esri.geometry.Point> = new Observable<esri.geometry.Point>();

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
            
            //buildElevationHTML();
            this.app.eventRegistry.event("ContextMenuActivated").subscribe(null, contextMenuActiviated);             
            this.app.eventRegistry.event("MapContextMenuPointUpdatedEvent").subscribe(null, handleMouseClick);              
                        
            function buildElevationHTML() {

                //make sure the menu exists
                if (!$(".map-menu-coordinates").length)
                    return;
                
                //create div if needed
                if (!$(".oeCustomElevationDiv").length)
                    $(".map-menu-coordinates").append('<div class="oeCustomElevationDiv"><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');               
            }

            function contextMenuActiviated() {
                buildElevationHTML();
                buildElevationRequest(this.pointIn);
            }

            function handleMouseClick(pointIn, appIn) {
                this.pointIn = pointIn;
            }

            function buildElevationRequest(pointIn) {
                
                $("#GoogleElevationValue").html("Loading...");

                //Grab the current application
                var appIn = geocortex.framework.applications[0];

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