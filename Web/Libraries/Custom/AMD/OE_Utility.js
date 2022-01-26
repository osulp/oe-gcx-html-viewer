
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
            console.log('module config!', config);
            this.resultTableConfig = config.reportTableOptions !== undefined ? config.reportTableOptions : {};
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
            //RESULT TABLE CONFIGS
            if (this.resultTableConfig !== undefined) {
                // For result table row click zoom to point based feature and set  scale
                if (this.resultTableConfig.zoomToResultFeature !== undefined ? this.resultTableConfig.zoomToResultFeature : false) {
                    console.log('result table zoom to result feature');
                    this.app.eventRegistry.event("ResultsTableFeatureClickedEvent").subscribe(this, function (args) {
                        _this.app.commandRegistry.command("PanToFeature").execute(args);
                        var thisScope = _this;
                        window.setTimeout(function () {
                            //thisScope.app.commandRegistry.command("StepZoomOut").execute();
                            thisScope.app.commandRegistry.command("ZoomToScale").execute(36112);
                        }, 1500);
                    });
                }
                // For result table show filter by default
                if (this.resultTableConfig.showResultTableFilter !== undefined ? this.resultTableConfig.showResultTableFilter : false) {
                    this.app.eventRegistry.event("FSMCollectionAddedEvent").subscribe(this, function (args) {
                        if (_this.resultTableConfig.featureSetID !== undefined ? _this.resultTableConfig.featureSetID === args.featureSetCollectionId : false) {
                            //$('.filter-off-16')[0].click();
                            window.setTimeout(function () {
                                console.log('Ready to toggle...', $('.filter-off-16'));
                                $('.toggle-filter-button > button').click();
                            }, 2000);
                        }
                    });
                }
            }
        };
        return OE_UtilityModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_UtilityModule = OE_UtilityModule;
});

},

    }
});


})();
