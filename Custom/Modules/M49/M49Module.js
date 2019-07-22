/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var M49;
    (function (M49) {
        var M49Module = (function (_super) {
            __extends(M49Module, _super);
            function M49Module(app, lib) {
                _super.call(this, app, lib);
            }
            M49Module.prototype.initialize = function (config) {
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
            M49Module.prototype._onSiteInitialized = function (site) {
                var _this = this;
                window["_calcAreas"] = [];
                // Register an implementation of custom commands.
                this.app.commandRegistry.command("addCalcAreas").register(this, function (calcAreas) {
                    //calcArea for each AOI
                    //Allows for adding/deleting dynamically in the UI
                    //Example of the json object the receive:
                    //{
                    //    "aoi_id": {id},
                    //    "TotalArea": { TotArea }, 
                    //    "HVFarmSoil_IntersectedArea":{ dblHVFarmSoil },
                    //    "HVFarmDairy_IntersectedArea": { dblHVFarmDairy },
                    //    "HVForest1_IntersectedArea": { dblHVForest1 },
                    //    "HVForest3_IntersectedArea": { dblHVForest3 }
                    //}                
                    window["_calcAreas"].push(JSON.parse(calcAreas));
                });
                this.app.commandRegistry.command("removeCalcAreas").register(this, function (index) {
                    window["_calcAreas"].splice(index, 1);
                });
            };
            return M49Module;
        }(geocortex.framework.application.ModuleBase));
        M49.M49Module = M49Module;
    })(M49 = oe.M49 || (oe.M49 = {}));
})(oe || (oe = {}));
//# sourceMappingURL=M49Module.js.map