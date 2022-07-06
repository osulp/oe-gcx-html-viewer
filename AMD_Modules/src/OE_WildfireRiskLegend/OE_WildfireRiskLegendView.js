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
exports.OE_WildfireRiskLegendView = void 0;
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
var ViewBase_1 = require("geocortex/framework/ui/ViewBase");
var OE_WildfireRiskLegendView = /** @class */ (function (_super) {
    __extends(OE_WildfireRiskLegendView, _super);
    function OE_WildfireRiskLegendView(app, lib) {
        return _super.call(this, app, lib) || this;
    }
    return OE_WildfireRiskLegendView;
}(ViewBase_1.ViewBase));
exports.OE_WildfireRiskLegendView = OE_WildfireRiskLegendView;
//# sourceMappingURL=OE_WildfireRiskLegendView.js.map