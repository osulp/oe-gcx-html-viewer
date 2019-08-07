/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var elevation;
    (function (elevation_1) {
        var usgsURL = "https://nationalmap.gov/epqs/pqs.php?"; //x=47&y=-123&units=Feet&output=json"
        var elevCounter = 0;
        var elevCounterMax;
        var shellName;
        var ElevationModuleViewModel = (function (_super) {
            __extends(ElevationModuleViewModel, _super);
            function ElevationModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.pointIn = new Observable();
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
                    var xyPoint = new esri.geometry.Point(defaultX, defaultY, new esri.SpatialReference({ wkid: 102100 }));
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
            };
            return ElevationModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        elevation_1.ElevationModuleViewModel = ElevationModuleViewModel;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
//# sourceMappingURL=ElevationModuleViewModel.js.map