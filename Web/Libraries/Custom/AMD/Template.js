
// Module 'Template'
        (function () {
var markup1 = '<div class=\'template-module-view\'>	<b><span data-binding=\'{@text: greeting}\'></span></b></div>';

require({
    cache: {
        "geocortex/oe_amd/Template/TemplateModule": function () {
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
    var TemplateModule = /** @class */ (function (_super) {
        __extends(TemplateModule, _super);
        function TemplateModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        TemplateModule.prototype.initialize = function (config) {
            alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));
        };
        return TemplateModule;
    }(ModuleBase_1.ModuleBase));
    exports.TemplateModule = TemplateModule;
});

},
"geocortex/oe_amd/Template/TemplateView": function () {
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
    var TemplateView = /** @class */ (function (_super) {
        __extends(TemplateView, _super);
        function TemplateView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return TemplateView;
    }(ViewBase_1.ViewBase));
    exports.TemplateView = TemplateView;
});

},
"geocortex/oe_amd/Template/TemplateViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TemplateViewModel = /** @class */ (function (_super) {
        __extends(TemplateViewModel, _super);
        function TemplateViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.greeting = new observables_1.Observable();
            return _this;
        }
        TemplateViewModel.prototype.initialize = function (config) {
            if (config) {
                this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "language-hello-world-greeting"));
            }
        };
        return TemplateViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.TemplateViewModel = TemplateViewModel;
});

},
"url:/geocortex/oe_amd/Template/TemplateView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/Template/CSS/TemplateModule.css", "css", "DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHotaW5kZXg6IDEwMDsNCiAgICB3aWR0aDogMjAwcHg7DQogICAgcmlnaHQ6IDA7DQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHBhZGRpbmc6IDZweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzOw0KICAgIG1hcmdpbi10b3A6IDc1cHg7DQogICAgbWFyZ2luLXJpZ2h0OiAycHg7DQp9");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/Template/TemplateView.html", "html", markup1);
});

})();
