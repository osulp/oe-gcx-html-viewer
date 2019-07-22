/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var initial_extent;
    (function (initial_extent) {
        var InitialExtentModule = (function (_super) {
            __extends(InitialExtentModule, _super);
            function InitialExtentModule(app, lib) {
                _super.call(this, app, lib);
            }
            InitialExtentModule.prototype.initialize = function (config) {
                var _this = this;
                var site = this.app.site;
                if (site && site.isInitialized) {
                    this._onSiteInitialized(site);
                }
                else {
                    this.app.eventRegistry.event("MapLoadedEvent").subscribe(this, function (args) {
                        _this._onMapLoaded(args);
                    });
                    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                        _this._onSiteInitialized(args);
                    });
                }
            };
            InitialExtentModule.prototype._onMapLoaded = function (site) {
                this.app.command("ZoomToInitialExtent").execute();
            };
            InitialExtentModule.prototype._onSiteInitialized = function (site) {
                this.app.command("ZoomToInitialExtent").execute();
            };
            return InitialExtentModule;
        }(geocortex.framework.application.ModuleBase));
        initial_extent.InitialExtentModule = InitialExtentModule;
    })(initial_extent = oe.initial_extent || (oe.initial_extent = {}));
})(oe || (oe = {}));
//# sourceMappingURL=InitialExtentModule.js.map