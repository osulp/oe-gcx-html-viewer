
// Module 'OtherTemplate'
        (function () {
var markup1 = '<div>    <span>This is another template</span></div>';

require({
    cache: {
        "geocortex/oe_amd/OtherTemplate/OtherTemplateModule": function () {
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
    var OtherTemplateModule = /** @class */ (function (_super) {
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
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OtherTemplateView = /** @class */ (function (_super) {
        __extends(OtherTemplateView, _super);
        function OtherTemplateView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OtherTemplateView;
    }(ViewBase_1.ViewBase));
    exports.OtherTemplateView = OtherTemplateView;
});

},
"geocortex/oe_amd/OtherTemplate/OtherTemplateViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase"], function (require, exports, ViewModelBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OtherTemplateViewModel = /** @class */ (function (_super) {
        __extends(OtherTemplateViewModel, _super);
        function OtherTemplateViewModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OtherTemplateViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OtherTemplateViewModel = OtherTemplateViewModel;
});

},
"url:/geocortex/oe_amd/OtherTemplate/OtherTemplateView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OtherTemplate/OtherTemplateView.html", "html", markup1);
});

})();
