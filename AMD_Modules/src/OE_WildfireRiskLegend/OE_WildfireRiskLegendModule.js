"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
var ModuleBase_1 = require("geocortex/framework/application/ModuleBase");
var OE_WildfireRiskLegendModule = /** @class */ (function (_super) {
    __extends(OE_WildfireRiskLegendModule, _super);
    function OE_WildfireRiskLegendModule(app, lib) {
        return _super.call(this, app, lib) || this;
    }
    OE_WildfireRiskLegendModule.prototype.initialize = function (config) {
        alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));
    };
    return OE_WildfireRiskLegendModule;
}(ModuleBase_1.ModuleBase));
exports.OE_WildfireRiskLegendModule = OE_WildfireRiskLegendModule;
