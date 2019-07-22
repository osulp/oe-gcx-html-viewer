/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModule = (function (_super) {
            __extends(SageGrouseDevSitingModule, _super);
            function SageGrouseDevSitingModule(app, lib) {
                _super.call(this, app, lib);
            }
            SageGrouseDevSitingModule.prototype.initialize = function (config) {
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
            SageGrouseDevSitingModule.prototype._onSiteInitialized = function (site) {
                this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, function (sender) {
                    console.log('graphic drawing event!', sender);
                    var lineSymbol = sender.sender.lineSymbol;
                    lineSymbol.color.r = 0;
                    lineSymbol.color.b = 255;
                    lineSymbol.color.g = 255;
                    var fillSymbolOutline = sender.sender.fillSymbol.outline;
                    fillSymbolOutline.color.r = 0;
                    fillSymbolOutline.color.b = 255;
                    fillSymbolOutline.color.g = 255;
                });
            };
            return SageGrouseDevSitingModule;
        }(geocortex.framework.application.ModuleBase));
        SageGrouseDevSiting.SageGrouseDevSitingModule = SageGrouseDevSitingModule;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
//# sourceMappingURL=SageGrouseDevSitingModule.js.map