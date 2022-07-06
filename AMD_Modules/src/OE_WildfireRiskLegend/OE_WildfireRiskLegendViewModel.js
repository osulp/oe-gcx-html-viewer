"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OE_WildfireRiskLegendViewModel = void 0;
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
var ViewModelBase_1 = require("geocortex/framework/ui/ViewModelBase");
var observables_1 = require("geocortex/framework/observables");
var OE_WildfireRiskLegendViewModel = /** @class */ (function (_super) {
    __extends(OE_WildfireRiskLegendViewModel, _super);
    function OE_WildfireRiskLegendViewModel(app, lib) {
        var _this = _super.call(this, app, lib) || this;
        _this.greeting = new observables_1.Observable();
        return _this;
    }
    OE_WildfireRiskLegendViewModel.prototype.initialize = function (config) {
        if (config) {
            this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "language-hello-world-greeting"));
        }
    };
    return OE_WildfireRiskLegendViewModel;
}(ViewModelBase_1.ViewModelBase));
exports.OE_WildfireRiskLegendViewModel = OE_WildfireRiskLegendViewModel;
//# sourceMappingURL=OE_WildfireRiskLegendViewModel.js.map