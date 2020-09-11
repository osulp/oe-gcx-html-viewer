
// Module 'OE_Elevation'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_Elevation/OE_ElevationModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_ElevationModule = /** @class */ (function (_super) {
        __extends(OE_ElevationModule, _super);
        function OE_ElevationModule(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.pointIn = null;
            _this.usgsURL = "https://nationalmap.gov/epqs/pqs.php?";
            return _this;
        }
        OE_ElevationModule.prototype.initialize = function (config) {
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
        OE_ElevationModule.prototype._onSiteInitialized = function (site) {
            //buildElevationHTML();
            //this.app.eventRegistry.event("ContextMenuActivated").subscribe(this, this.contextMenuActiviated);
            this.app.eventRegistry.event("MapContextMenuPointUpdatedEvent").subscribe(this, this.handleMouseClick);
            this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, this.checkActivatedView);
        };
        OE_ElevationModule.prototype.checkActivatedView = function (args) {
            //MapContextMenuView
            //console.log(args);
            //console.log(args.id);
            if (args.id == "MapContextMenuView") {
                this.buildElevationHTML();
                this.buildElevationRequest(this.pointIn);
            }
            //MapContextMenuView
        };
        OE_ElevationModule.prototype.buildElevationHTML = function () {
            //make sure the menu exists
            if (!$(".map-menu-coordinates").length)
                return;
            //create div if needed
            if (!$(".oeCustomElevationDiv").length)
                $(".map-menu-coordinates").append('<div class="oeCustomElevationDiv"><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');
        };
        OE_ElevationModule.prototype.contextMenuActiviated = function () {
            //this.buildElevationHTML();
            //this.buildElevationRequest(this.pointIn);
        };
        OE_ElevationModule.prototype.handleMouseClick = function (pointIn, appIn) {
            this.pointIn = pointIn;
        };
        OE_ElevationModule.prototype.buildElevationRequest = function (pointIn) {
            $("#GoogleElevationValue").html("Loading...");
            //Grab the current application
            var appIn = this.app; //geocortex.framework.applications[0];
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
            var url = this.usgsURL + "x=" + mapPoint.x + "&y=" + mapPoint.y + "&units=feet&output=json";
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
        };
        return OE_ElevationModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_ElevationModule = OE_ElevationModule;
});

},

    }
});


})();
