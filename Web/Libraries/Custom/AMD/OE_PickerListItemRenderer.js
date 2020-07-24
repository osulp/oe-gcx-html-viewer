
// Module 'OE_PickerListItemRenderer'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_PickerListItemRenderer/OE_PickerListItemRendererModule": function () {
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
    var OE_PickerListItemRendererModule = /** @class */ (function (_super) {
        __extends(OE_PickerListItemRendererModule, _super);
        //thisModule: Observable<OE_PickerListItemRendererModule> = new Observable(null);
        function OE_PickerListItemRendererModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_PickerListItemRendererModule.prototype.initialize = function (config) {
            var _this = this;
            this.targetClass = config.targetClass !== undefined ? config.targetClass : "";
            this.moveClass = config.moveClass !== undefined ? config.moveClass : "";
            var site = this.app.site;
            //this.thisModule = this;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args);
                });
            }
        };
        OE_PickerListItemRendererModule.prototype._onSiteInitialized = function (site) {
            var _this = this;
            //let thisModel = this;
            this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
                _this._oe_renderItems(args, _this.targetClass, _this.moveClass);
            });
        };
        OE_PickerListItemRendererModule.prototype._oe_renderItems = function (args, targetClassString, moveClassString) {
            if (args.markupResource !== "Mapping/infrastructure/ui/components/FeatureSelector/FeatureSelectorView.html")
                return;
            $(targetClassString).each(function () {
                var pElement = $(this).parent();
                var mElement = $(this).find(moveClassString);
                pElement.append(mElement);
            });
        };
        return OE_PickerListItemRendererModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_PickerListItemRendererModule = OE_PickerListItemRendererModule;
});

},

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_PickerListItemRenderer/CSS/OE_PickerListItemRenderer.css", "css", "LmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1tZW51IC5zZWxlY3RlZA0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KfQ0KDQouZGlzcGxheS1yZXN1bHQtcGlja2VyLWxpc3QgLmdjeC1saXN0LWJ1dHRvbjpob3Zlcg0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KfQ0KDQouZGlzcGxheS1yZXN1bHQtcGlja2VyLWxpc3QgLmdjeC1saXN0LWJ1dHRvbg0Kew0KICAgIGN1cnNvcjogZGVmYXVsdDsNCn0NCg0KLmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1idXR0b24gLmdjeC1saXN0LWxhYmVsDQp7DQogICAgcGFkZGluZy1sZWZ0OjFlbTsNCn0NCg0KLmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1pdGVtIC5nY3gtbGlzdC1kZXNjDQp7DQogICAgZGlzcGxheTpibG9jayAhaW1wb3J0YW50Ow0KICAgIHBhZGRpbmctbGVmdDoyZW07DQp9DQoNCi5kaXNwbGF5LXJlc3VsdC1waWNrZXItbGlzdCAuZmVhdHVyZS1kZXNjcmlwdGlvbiBkaXYNCnsNCiAgICBwYWRkaW5nOjAgIWltcG9ydGFudDsNCn0NCg0KLmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5mZWF0dXJlLWRlc2NyaXB0aW9uIGltYWdlDQp7DQogICAgbWFyZ2luLXRvcDowICFpbXBvcnRhbnQ7ICAgIA0KfQ==");

});

})();
