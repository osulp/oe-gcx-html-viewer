
// Module 'OtherTemplate'
        (function () {
var markup1 = '<div>    <span>This is another template</span></div>';

require({
    cache: {
        "geocortex/oe_amd/OtherTemplate/OtherTemplateModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OtherTemplateModule = (function (_super) {
        __extends(OtherTemplateModule, _super);
        function OtherTemplateModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OtherTemplateModule.prototype.initialize = function (config) {
            alert(this.app.getResource(this.libraryId, "language-test"));
        };
        return OtherTemplateModule;
    }(ModuleBase_1.ModuleBase));
    exports.OtherTemplateModule = OtherTemplateModule;
});

},
"geocortex/oe_amd/OtherTemplate/OtherTemplateView": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OtherTemplateView = (function (_super) {
        __extends(OtherTemplateView, _super);
        function OtherTemplateView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OtherTemplateView;
    }(ViewBase_1.ViewBase));
    exports.OtherTemplateView = OtherTemplateView;
});

},
"url:/geocortex/oe_amd/OtherTemplate/OtherTemplateView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OtherTemplate/OtherTemplateView.html", "html", markup1);
});

})();