
// Module 'OE_HyperlinkBanner'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_HyperlinkBanner/OE_HyperlinkBannerModule": function () {
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
    var OE_HyperlinkBannerModule = /** @class */ (function (_super) {
        __extends(OE_HyperlinkBannerModule, _super);
        function OE_HyperlinkBannerModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_HyperlinkBannerModule.prototype.initialize = function (config) {
            var _this = this;
            var linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, linkUri);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, linkUri);
                });
            }
        };
        OE_HyperlinkBannerModule.prototype._onSiteInitialized = function (site, linkUri) {
            //wrap banner image with a link anchor
            $(".banner-left-img").wrap('<a href="' + linkUri + '" target="_blank"></a>');
            if ($(".banner-subtitle").html() === '') {
                $(".banner-text h1").css("margin-top", "0.59em");
            }
        };
        return OE_HyperlinkBannerModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_HyperlinkBannerModule = OE_HyperlinkBannerModule;
});

},

    }
});


})();
