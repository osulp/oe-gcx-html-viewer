
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
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_PickerListItemRenderer/CSS/OE_PickerListItemRenderer.css", "css", "LmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1tZW51IC5zZWxlY3RlZAp7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKfQoKLmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1idXR0b246aG92ZXIKewogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7Cn0KCi5kaXNwbGF5LXJlc3VsdC1waWNrZXItbGlzdCAuZ2N4LWxpc3QtYnV0dG9uCnsKICAgIGN1cnNvcjogZGVmYXVsdDsKfQoKLmRpc3BsYXktcmVzdWx0LXBpY2tlci1saXN0IC5nY3gtbGlzdC1idXR0b24gLmdjeC1saXN0LWxhYmVsCnsKICAgIHBhZGRpbmctbGVmdDoxZW07Cn0KCi5kaXNwbGF5LXJlc3VsdC1waWNrZXItbGlzdCAuZ2N4LWxpc3QtaXRlbSAuZ2N4LWxpc3QtZGVzYwp7CiAgICBkaXNwbGF5OmJsb2NrICFpbXBvcnRhbnQ7CiAgICBwYWRkaW5nLWxlZnQ6MmVtOwp9CgouZGlzcGxheS1yZXN1bHQtcGlja2VyLWxpc3QgLmZlYXR1cmUtZGVzY3JpcHRpb24gZGl2CnsKICAgIHBhZGRpbmc6MCAhaW1wb3J0YW50Owp9CgouZGlzcGxheS1yZXN1bHQtcGlja2VyLWxpc3QgLmZlYXR1cmUtZGVzY3JpcHRpb24gaW1hZ2UKewogICAgbWFyZ2luLXRvcDowICFpbXBvcnRhbnQ7ICAgIAp9");

});

})();
