
// Module 'OE_ShowHideMeasurementLabels'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_ShowHideMeasurementLabels/OE_ShowHideMeasurementLabelsModule": function () {
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
define(["require", "exports", "geocortex/framework/application/ModuleBase", "geocortex/infrastructure/GraphicUtils"], function (require, exports, ModuleBase_1, GraphicUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_ShowHideMeasurementLabelsModule = /** @class */ (function (_super) {
        __extends(OE_ShowHideMeasurementLabelsModule, _super);
        function OE_ShowHideMeasurementLabelsModule(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this._markupLayerName = "Drawings_measurement";
            return _this;
        }
        OE_ShowHideMeasurementLabelsModule.prototype.initialize = function (config) {
            this.app.commandRegistry.command("ChangeTheDisplay").register(this, this.changeTheDisplay);
        };
        OE_ShowHideMeasurementLabelsModule.prototype.changeTheDisplay = function (theCommand) {
            var theGraphic = GraphicUtils_1.getGraphicsLayer(this._markupLayerName, false, this.app);
            if (theCommand == "show") {
                theGraphic.setVisibility(true);
            }
            else {
                theGraphic.setVisibility(false);
            }
        };
        return OE_ShowHideMeasurementLabelsModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_ShowHideMeasurementLabelsModule = OE_ShowHideMeasurementLabelsModule;
});

},

    }
});


})();
