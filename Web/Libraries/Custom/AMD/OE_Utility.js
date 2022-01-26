
// Module 'OE_Utility'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_Utility/OE_UtilityModule": function () {
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
    var OE_UtilityModule = /** @class */ (function (_super) {
        __extends(OE_UtilityModule, _super);
        function OE_UtilityModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_UtilityModule.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, this);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, _this);
                });
            }
        };
        OE_UtilityModule.prototype._onSiteInitialized = function (site, myModule) {
            var _this = this;
            this.app.registerActivityIdHandler("OE_Utility_IsViewActive", function CustomEventHandler(workflowContext) {
                //check for view from passed in view name (id)  "BannerView" for example
                var checkView = myModule.app.viewManager.getViewById(workflowContext.getValue("viewName"));
                //set the workflow out variable "isViewActive"
                if (checkView)
                    workflowContext.setValue("isViewActive", checkView.isActive);
                else
                    workflowContext.setValue("isViewActive", false);
                //move the workflow to the next activity
                workflowContext.completeActivity();
            });
            this.app.eventRegistry.event("ResultsTableFeatureClickedEvent").subscribe(this, function (args) {
                //console.log('resulttable feature clicked!', args);
                _this.app.commandRegistry.command("PanToFeature").execute(args);
                $('.toggle-filter-button > button').click();
                var thisScope = _this;
                window.setTimeout(function () {
                    //thisScope.app.commandRegistry.command("StepZoomOut").execute();
                    //thisScope.app.commandRegistry.command("StepZoomOut").execute();
                    thisScope.app.commandRegistry.command("ZoomToScale").execute(36112);
                    //console.log('zoom time?');
                }, 1500);
            });
            this.app.commandRegistry.command("ResultsTableDownloadToCSV").register(this, function (args) {
                //console.log('resulttable feature clicked!', args);
                //this.app.commandRegistry.command("PanToFeature").execute(args);
                console.log("Try results download");
                var eArray = $('.ResultsRegionViewContainerView .list-menu-details');
                console.log(eArray);
                for (var _i = 0, eArray_1 = eArray; _i < eArray_1.length; _i++) {
                    var listItem = eArray_1[_i];
                    console.log(listItem);
                    if (listItem.innerHTML.indexOf("CSV<") > -1) {
                        listItem.click();
                        break;
                    }
                }
                //$('.toggle-filter-button > button').click();            
            });
        };
        return OE_UtilityModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_UtilityModule = OE_UtilityModule;
});

},

    }
});


})();
