
// Module 'OE_ConvertGeometry'
        (function () {
var markup1 = '<div class=\'template-module-view\'>	<b><span data-binding=\'{@text: greeting}\'></span></b></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryModule": function () {
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
    var DownloadOverrideWorkflow = /** @class */ (function () {
        function DownloadOverrideWorkflow() {
        }
        return DownloadOverrideWorkflow;
    }());
    var OE_ConvertGeometryModule = /** @class */ (function (_super) {
        __extends(OE_ConvertGeometryModule, _super);
        function OE_ConvertGeometryModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_ConvertGeometryModule.prototype.initialize = function (config) {
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
        OE_ConvertGeometryModule.prototype._onSiteInitialized = function (site) {
            this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                window.open(layer.getLayerUrl(), "_blank");
            });
        };
        return OE_ConvertGeometryModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_ConvertGeometryModule = OE_ConvertGeometryModule;
});

},
"geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryView": function () {
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
    var OE_ConvertGeometryView = /** @class */ (function (_super) {
        __extends(OE_ConvertGeometryView, _super);
        function OE_ConvertGeometryView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return OE_ConvertGeometryView;
    }(ViewBase_1.ViewBase));
    exports.OE_ConvertGeometryView = OE_ConvertGeometryView;
});

},
"geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1, observables_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_ConvertGeometryViewModel = /** @class */ (function (_super) {
        __extends(OE_ConvertGeometryViewModel, _super);
        function OE_ConvertGeometryViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.googlePolylineIn = new observables_1.Observable("");
            _this.coordinatesStringOut = new observables_1.Observable("");
            _this.coordinatesCollection = new observables_2.ObservableCollection();
            //workflow ref
            _this.myWorkflowContext = new observables_1.Observable(null);
            _this.myModel = new observables_1.Observable(null);
            /**
            * Decodes to a [latitude, longitude] coordinates array.
            *
            * This is adapted from the implementation in Project-OSRM.
            *
            * @param {String} str
            * @param {Number} precision
            * @returns {Array}
            *
            * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
            */
            _this.googlePolylineDecode = function (str, precision) {
                var index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, latitude_change, longitude_change, factor = Math.pow(10, (Math.round(precision) == precision) ? precision : 5);
                // Coordinates have variable length when encoded, so just keep
                // track of whether we've hit the end of the string. In each
                // loop iteration, a single coordinate is decoded.
                while (index < str.length) {
                    // Reset shift, result, and byte
                    byte = null;
                    shift = 0;
                    result = 0;
                    do {
                        byte = str.charCodeAt(index++) - 63;
                        result |= (byte & 0x1f) << shift;
                        shift += 5;
                    } while (byte >= 0x20);
                    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
                    shift = result = 0;
                    do {
                        byte = str.charCodeAt(index++) - 63;
                        result |= (byte & 0x1f) << shift;
                        shift += 5;
                    } while (byte >= 0x20);
                    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
                    lat += latitude_change;
                    lng += longitude_change;
                    coordinates.push([lat / factor, lng / factor]);
                }
                return coordinates;
            };
            return _this;
        }
        OE_ConvertGeometryViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            var thisViewModel = this;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel);
                });
            }
        };
        OE_ConvertGeometryViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            //dynamic external workflow form
            this.app.registerActivityIdHandler("googlePolylineDecode", function CustomEventHandler(workflowContext) {
                //let myWorkflowContext: any;
                //myWorkflowContext = $.extend({}, workflowContext);
                thisViewModel.myModel = thisViewModel;
                thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");
                thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_ConvertGeometryView");
                thisViewModel.googlePolylineIn.set(thisViewModel.myWorkflowContext.getValue("googlePolylineIn"));
                var coordinates = thisViewModel.googlePolylineDecode(thisViewModel.myWorkflowContext.getValue("googlePolylineIn"), 5);
                thisViewModel.coordinatesCollection.addItems(coordinates);
                thisViewModel.myWorkflowContext.setValue("coordinatesCollection", coordinates);
                thisViewModel.myWorkflowContext.setValue("coordinatesStringOut", "test");
                thisViewModel.myWorkflowContext.completeActivity();
                thisViewModel.app.commandRegistry.command("DeactivateView").execute("OE_ConvertGeometryView");
                //context.myWorkflowContext.setValue("customFormResult", 'homeReport');
                //context.myWorkflowContext.completeActivity();
                //context.myModel.closeView();
                /*if (thisViewModel.myWorkflowContext.getValue("isSFPD")) {
                    $(".wildfire_sfpd_content").css("display", "block");
                }
                else
                {
                    $(".wildfire_sfpd_content").css("display", "none");
                }*/
            });
        };
        return OE_ConvertGeometryViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_ConvertGeometryViewModel = OE_ConvertGeometryViewModel;
});

},
"url:/geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_ConvertGeometry/CSS/OE_ConvertGeometryModule.css", "css", "I29lX2xheWVyX2Rlc2Mgew0KICAgIHBhZGRpbmc6IDIwcHg7DQogICAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDsNCn0NCg0KLmxheWVyLWludmlzaWJsZTphZnRlciB7DQogICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Ow0KfQ==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryView.html", "html", markup1);
});

})();
