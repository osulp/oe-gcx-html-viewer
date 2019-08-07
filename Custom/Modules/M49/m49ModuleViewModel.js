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
        var M49ModuleViewModel = (function (_super) {
            __extends(M49ModuleViewModel, _super);
            function M49ModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.greeting = new Observable();
            }
            M49ModuleViewModel.prototype.initialize = function (config) {
                //if (config) {
                //    this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
                //}
            };
            return M49ModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        M49.M49ModuleViewModel = M49ModuleViewModel;
    })(M49 = oe.M49 || (oe.M49 = {}));
})(oe || (oe = {}));
//# sourceMappingURL=m49ModuleViewModel.js.map