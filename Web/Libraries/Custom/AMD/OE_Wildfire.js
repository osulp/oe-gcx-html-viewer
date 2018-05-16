
// Module 'OE_Wildfire'
        (function () {
var markup1 = '<a href=\'#\'></a><div class=\'module workflow-form wildfire_dynamicform\' dir=\'ltr\'>        <div data-binding=\'{innerHTML:mainContent}\'></div>        <div data-binding=\'{innerHTML:homeOwnerReportContent}\'></div>    <div class=\'btn-row\'>        <div class=\'btn-cell\'>            <div data-binding=\'{@event-onclick:homeReport}\'>Homeowner\'s Report</div>        </div>    </div>        <h3>Your Location</h3>    <div class=\'your_location\'>                        <div>Watershed  (5<sup>th</sup> level)</div>        <div class=\'btn-row\'>            <div class=\'btn-cell\'>                <div data-binding=\'{@event-onclick:watershedReport}\'><span data-binding=\'{@text:aoiWatershedName}\'></span></div>            </div>        </div>        <div>County</div>        <div class=\'btn-row\'>            <div class=\'btn-cell\'>                <div data-binding=\'{@event-onclick:countyReport}\'><span data-binding=\'{@text:aoiCountyName}\'></span></div>            </div>        </div>        <div>ODF Forest Protection District</div>        <div class=\'data-content\' data-binding=\'{@text:aoiOFPD}\'></div>        <div>Structural Fire Protection District</div>        <div class=\'data-content\' data-binding=\'{@text:aoiSFPDName}\'></div>        <div>City or Town</div>        <div class=\'data-content\' data-binding=\'{@text:aoiCityTown}\'></div>        <div>Urban Growth Boundary</div>        <div class=\'data-content\' data-binding=\'{@text:aoiUGB}\'></div>        <div>Community Wildfire Protection Plan Area</div>        <div class=\'data-content\' data-binding=\'{@text:aoiCWPPA}\'></div>        <div>Firewise Community</div>        <div class=\'data-content\' data-binding=\'{@text:aoiFirewiseCom}\'></div>        <div>Oregon Defensible Space Law</div>        <div class=\'data-content\' data-binding=\'{@text:aoiSB360}\'></div>       </div>    <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>        <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>    </div></div>';
var markup2 = '  <!--<div id=\'WildfireRiskPopup\' class=\'module view map-tip-view\' style=\'position:absolute; top:40px; z-index:200;\'> --><div id=\'WildfireRiskPopup\'>    <div class=\'WildfireRiskPopupHeader\'>        <div class=\'WildfireRiskPopupHeaderText\'>Input detected</div>        <button class=\'panel-header-button WildfireRiskPopupCloseButton close-16\' title=\'Close Fire Risk\'></button>    </div>    <!--<div class=\'WildfireRiskPopupGuide\'>        <div id=\'WildfireRisk_guide\'>            Left click on the map to view fire risk information.  To disable/enable fire risk mode use \'Toggle Fire Risk Mode\' from the \'I want To\' button.        </div>    </div>-->    <div class=\'WildfireRiskPopupContent\' style=\'display:none; clear:both;\'>        <div id=\'WildfireRisk_loading\'>Loading...</div>        <div id=\'WildfireRisk_content\' style=\'display:none\'>            <div>                <h1>Average Wildfire Risk (within ¼ mile)</h1><p id=\'WildfireRisk_value\'>Calculating...</p>                <p id=\'WildfireRisk_warning\' style=\'display:none;\'><span>Warning!</span> Incomplete data coverage in your area.</p>            </div>            <!--<div>                <h1>Data coverage in selection</h1><p id=\'WildfireRisk_riskdatapercent\'>Calculating...</p>            </div>-->            <div>                <h1>ODF Forest Protection District</h1><p id=\'WildfireRisk_forest_protection_district\'>No data</p>            </div>            <div>                <h1>Structural Fire Protection District</h1><p id=\'WildfireRisk_structural_projection_district\'>No data</p>            </div>            <div>                <h1>Rangeland Protection Association</h1><p id=\'WildfireRisk_rangeland_protection_assoc\'>No data</p>            </div>            <div>                <h1>City or town</h1><p id=\'WildfireRisk_city\'>No data</p>            </div>            <div>                <h1>Urban Growth Boundary</h1><p id=\'WildfireRisk_urban_growth_boundary\'>No data</p>            </div>            <div>                <h1>Community Wildfire Protection Plan Area</h1><p id=\'WildfireRisk_cwpp_area\'>No data</p>            </div>            <div>                <h1>Firewise Community</h1><p id=\'WildfireRisk_firewise_community\'>No data</p>            </div>            <div>                <h1>Senate Bill 360 area</h1><p id=\'WildfireRisk_senatebill_360\'>No data</p>            </div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_min\'>0</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_max\'>0</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_ave\'>0</div>        </div>        <div class=\'WildfireRisk_link\'>            <button class=\'WildfireRiskPopupModuleViewButton\' data-binding=\'{@event-onclick:openWildfireRiskWorkflow}\'>Click here for more information</button>        </div>    </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Wildfire/OE_WildfireModule": function () {
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
    var OE_WildfireModule = (function (_super) {
        __extends(OE_WildfireModule, _super);
        function OE_WildfireModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_WildfireModule.prototype.initialize = function (config) {
            var site = this.app.site;
            /*if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }*/
        };
        return OE_WildfireModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_WildfireModule = OE_WildfireModule;
});

},
"geocortex/oe_amd/OE_Wildfire/OE_WildfireView": function () {
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
    var OE_WildfireView = (function (_super) {
        __extends(OE_WildfireView, _super);
        function OE_WildfireView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.buildWildfireRiskWorkflowRequest = function (isQuickReport, contextIn) {
                if (isQuickReport === void 0) { isQuickReport = false; }
                var workflowArgs = {};
                workflowArgs.workflowId = "Summary_Standalone";
                workflowArgs.mapPointIn = contextIn.mapPointIn;
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            };
            _this.openWildfireRiskQuickRepoort = function (event, element, context) {
                this.buildWildfireRiskWorkflowRequest(true, context);
            };
            _this.openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {
                this.buildWildfireRiskWorkflowRequest(isQuickReport, context);
            };
            return _this;
        }
        return OE_WildfireView;
    }(ViewBase_1.ViewBase));
    exports.OE_WildfireView = OE_WildfireView;
});

},
"geocortex/oe_amd/OE_Wildfire/OE_WildfireViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //popup toggle and default state
    exports.fireRiskPopupEnabled = true;
    var OE_WildfireViewModel = (function (_super) {
        __extends(OE_WildfireViewModel, _super);
        function OE_WildfireViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.mapPointIn = new observables_1.Observable();
            return _this;
        }
        OE_WildfireViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            exports.fireRiskPopupEnabled = config.mapClickEnabled || false;
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
        OE_WildfireViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            var workingApp = geocortex["framework"].applications[0];
            /*
                This module is added to the NavigationMapRegion region.
                Geocortex adds this module above the "I want to" button.
                Move this module to the bottom of the navigation map region
    
                map-navigation-region
                WildfireRiskPopupModuleView
            */
            $(".WildfireRiskPopupModuleView").appendTo(".map-navigation-region");
            //add a command button
            this.app.commandRegistry.command("EnableFireriskPopup").register(this, enableFireriskPopup);
            this.app.commandRegistry.command("DisableFireriskPopup").register(this, disableFireriskPopup);
            //run popup by coordinates
            this.app.commandRegistry.command("OpenFireriskPopup").register(this, openFireriskPopup);
            //grab the geocortex map event
            //if (this.mapClickEnabled)
            this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
            function loadWorkflow(pointIn) {
                //if (!fireRiskPopupEnabled)
                //    return;
                //loading div
                /*var loadingDiv = $("#WildfireRisk_loading");
                loadingDiv.css("display", "block");
    
                //swap blocks
                $(".WildfireRiskPopupContent").css("display", "block");
    
                //link div
                var linkDiv = $(".WildfireRisk_link");
                linkDiv.css("display", "none");
    
                //content div
                var contentDiv = $("#WildfireRisk_content");
                contentDiv.css("display", "none");
    
                loadingDiv.text("Launching summary...");*/
                //load the html view
                //workingApp.commandRegistry.command("ActivateView").execute("OE_WildfireView");
                //workingPointGeometry = pointIn.mapPoint;
                var view = thisViewModel.app.viewManager.getViewById("OE_WildfireView");
                thisViewModel.mapPointIn = pointIn;
                view.buildWildfireRiskWorkflowRequest(false, thisViewModel);
                //remove view after delay                    
                //setTimeout(CloseView, 1800);
            }
            function enableFireriskPopup() {
                exports.fireRiskPopupEnabled = true;
            }
            function disableFireriskPopup() {
                exports.fireRiskPopupEnabled = false;
            }
            function openFireriskPopup(geometryIn, appIn) {
                //if (!fireRiskPopupEnabled)
                //  return;
                var jsonIn = jQuery.parseJSON(geometryIn);
                var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));
                //processMapPoint(newPoint);
                loadWorkflow(newPoint);
            }
            function handleMouseClick(pointIn, appIn) {
                if (!exports.fireRiskPopupEnabled)
                    return;
                loadWorkflow(pointIn.mapPoint);
            }
            function CloseView() {
                workingApp.commandRegistry.command("DeactivateView").execute("OE_WildfireView");
            }
        };
        return OE_WildfireViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_WildfireViewModel = OE_WildfireViewModel;
});

},
"geocortex/oe_amd/OE_Wildfire/OE_Wildfire_DynamicFormView": function () {
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
    var OE_Wildfire_DynamicFormView = (function (_super) {
        __extends(OE_Wildfire_DynamicFormView, _super);
        function OE_Wildfire_DynamicFormView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            /*getPDF = function (event, element, context) {
                let reportUrl = context.getValue('reportURL');
                window.open(reportUrl, "_blank");
            };
        
            zoomTo = function (event, element, context) {
                let featureExtent: any = context.getValue('uda_extent');
                this.app.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
            };
        
            clearTitle = function (event, element, context) {
                element.value = "";
            };*/
            /*runNewReport = function (event, element, context) {
                context.setValue("finalFormBtn", 'New');
                context.completeActivity();
                this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                return true;
            };*/
            _this.countyReport = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'county');
                context.myWorkflowContext.completeActivity();
                //this.app.commandRegistry.command("DeactivateView").execute("OE_Wildfire_DynamicFormView");
                context.myModel.closeView();
                return true;
            };
            _this.watershedReport = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'watershed');
                context.myWorkflowContext.completeActivity();
                context.myModel.closeView();
                return true;
            };
            _this.basinReport = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'basin');
                context.myWorkflowContext.completeActivity();
                context.myModel.closeView();
                return true;
            };
            _this.sfpdReport = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'sfpd');
                context.myWorkflowContext.completeActivity();
                context.myModel.closeView();
                return true;
            };
            _this.homeReport = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'homeReport');
                context.myWorkflowContext.completeActivity();
                context.myModel.closeView();
                return true;
            };
            _this.cancelForm = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'close');
                context.myWorkflowContext.completeActivity();
                context.myModel.closeView();
                return true;
            };
            return _this;
        }
        return OE_Wildfire_DynamicFormView;
    }(ViewBase_1.ViewBase));
    exports.OE_Wildfire_DynamicFormView = OE_Wildfire_DynamicFormView;
});

},
"geocortex/oe_amd/OE_Wildfire/OE_Wildfire_DynamicFormViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { defaultMarkerSymbol } from "geocortex/infrastructure/SymbolUtils";
    //export var reportImageFeatureCollectionJSON;
    //export var reportImageExtent;
    //export var pointLatLong;
    //export var geometryElementsJsonString;
    //export var riskPercentOut;
    //popup toggle and default state
    //export var fireRiskPopupEnabled = <boolean>true;
    var OE_Wildfire_DynamicFormViewModel = (function (_super) {
        __extends(OE_Wildfire_DynamicFormViewModel, _super);
        function OE_Wildfire_DynamicFormViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            //myWorkflowContext: any;
            //input
            _this.mainContent = new observables_1.Observable("");
            _this.homeOwnerReportContent = new observables_1.Observable("");
            _this.aoiReportContent = new observables_1.Observable("");
            _this.aoiCountyName = new observables_1.Observable("");
            _this.aoiWatershedName = new observables_1.Observable("");
            _this.aoiBasinName = new observables_1.Observable("");
            _this.aoiSFPDName = new observables_1.Observable("");
            _this.aoiOFPD = new observables_1.Observable("");
            _this.aoiCityTown = new observables_1.Observable("");
            _this.aoiUGB = new observables_1.Observable("");
            _this.aoiCWPPA = new observables_1.Observable("");
            _this.aoiFirewiseCom = new observables_1.Observable("");
            _this.aoiSB360 = new observables_1.Observable("");
            //sitePath: Observable<string> = new Observable<string>("");
            //viewerImagePath: Observable<string> = new Observable<string>("");
            //output
            _this.customFormResult = new observables_1.Observable("");
            //workflow ref
            _this.myWorkflowContext = new observables_1.Observable(null);
            _this.myModel = new observables_1.Observable(null);
            return _this;
        }
        OE_Wildfire_DynamicFormViewModel.prototype.initialize = function (config) {
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
        OE_Wildfire_DynamicFormViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            //dynamic external workflow form
            this.app.registerActivityIdHandler("displayWildfirePointResults", function CustomEventHandler(workflowContext, contextFunctions) {
                //let myWorkflowContext: any;
                //myWorkflowContext = $.extend({}, workflowContext);
                thisViewModel.myModel = thisViewModel;
                thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");
                thisViewModel.mainContent.set(thisViewModel.myWorkflowContext.getValue("mainContent"));
                thisViewModel.homeOwnerReportContent.set(thisViewModel.myWorkflowContext.getValue("homeOwnerReportContent"));
                thisViewModel.aoiReportContent.set(thisViewModel.myWorkflowContext.getValue("aoiReportContent"));
                thisViewModel.aoiCountyName.set(thisViewModel.myWorkflowContext.getValue("aoiCountyName") + " Report");
                thisViewModel.aoiWatershedName.set(thisViewModel.myWorkflowContext.getValue("aoiWatershedName") + " Report");
                thisViewModel.aoiBasinName.set(thisViewModel.myWorkflowContext.getValue("aoiBasinName"));
                thisViewModel.aoiOFPD.set(thisViewModel.myWorkflowContext.getValue("aoiOFPD"));
                thisViewModel.aoiCityTown.set(thisViewModel.myWorkflowContext.getValue("aoiCityTown"));
                thisViewModel.aoiUGB.set(thisViewModel.myWorkflowContext.getValue("aoiUGB"));
                thisViewModel.aoiCWPPA.set(thisViewModel.myWorkflowContext.getValue("aoiCWPPA"));
                thisViewModel.aoiFirewiseCom.set(thisViewModel.myWorkflowContext.getValue("aoiFirewiseCom"));
                thisViewModel.aoiSB360.set(thisViewModel.myWorkflowContext.getValue("aoiSB360"));
                thisViewModel.aoiSFPDName.set(thisViewModel.myWorkflowContext.getValue("aoiSFPDName"));
                /*if (thisViewModel.myWorkflowContext.getValue("isSFPD")) {
                    $(".wildfire_sfpd_content").css("display", "block");
                }
                else
                {
                    $(".wildfire_sfpd_content").css("display", "none");
                }*/
            });
        };
        OE_Wildfire_DynamicFormViewModel.prototype.closeView = function () {
            this.app.commandRegistry.command("DeactivateView").execute("OE_Wildfire_DynamicFormView");
        };
        return OE_Wildfire_DynamicFormViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_Wildfire_DynamicFormViewModel = OE_Wildfire_DynamicFormViewModel;
});

},
"url:/geocortex/oe_amd/OE_Wildfire/OE_Wildfire_DynamicFormView.html": markup1,
"url:/geocortex/oe_amd/OE_Wildfire/OE_WildfireView.html": markup2,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/CSS/OE_WildfireModule.css", "css", "LyoubWFwLXRvcC1sZWZ0DQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9Ki8NCg0KLyoubWFwLW5hdmlnYXRpb24tcmVnaW9uDQp7DQogICAgbWF4LWhlaWdodDoxMDAlOw0KfSovDQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b24gew0KICAgIHBhZGRpbmc6IC41ZW07DQogICAgb3V0bGluZTogbm9uZTsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7DQogICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTsNCiAgICBmb250LXdlaWdodDogNjAwOw0KICAgIGNvbG9yOiAjMUE3MkM0Ow0KICAgIGJveC1zaGFkb3c6IDA7DQogICAgY3Vyc29yOnBvaW50ZXI7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxQTcyQzQ7DQogICAgY29sb3I6ICNmZmZmZmY7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXcgDQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgcG9zaXRpb246YWJzb2x1dGU7ICAgIA0KICAgIHRvcDo0NHB4Ow0KICAgIG92ZXJmbG93LXk6YXV0bzsNCiAgICB6LWluZGV4OjIyMDsgICANCiAgICB3aWR0aDogMjgwcHg7DQogICAgcGFkZGluZzo0cHggMTBweCA0cHggMTBweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQTFCOEUxOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsgICAgDQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQovKiBTY3JvbGxiYXIgaXMgY29udHJvbGxlZCBieSBtZWRpYSBxdWVyaWVzICovDQpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiAzMDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA0MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDIyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA1MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDMyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA2MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4Ow0KICAgIH0NCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwSGVhZGVyIHsgIA0KICAgIGZsb2F0OmxlZnQ7DQogICAgd2lkdGg6MTAwJTsNCiAgICBmb250LXNpemU6MS4yZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBwYWRkaW5nLXRvcDowLjNlbTsNCiAgICBwYWRkaW5nLWJvdHRvbTowLjVlbTsNCiAgICBjb2xvcjpyZ2JhKDEwNSwgMTA1LCAxMDUsIDEpOw0KfQ0KDQouV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50IHsgIA0KICAgIGZvbnQtc2l6ZToxZW07DQp9DQoNCi8qLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXIgeyAgDQogICAgd2lkdGg6MTJweDsNCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgIHsgIA0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuMyk7IA0KICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsNCiAgICBib3JkZXItcmFkaXVzOiAxMHB4Ow0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuNSk7IA0KfSovDQoNCi5XaWxkZmlyZVJpc2tfbGluayB7ICAgIA0KICAgIHBhZGRpbmc6OHB4IDBweCA4cHggMHB4Ow0KfQ0KDQouV2lsZGZpcmVSaXNrX2xpbmsgYSB7DQogICAgZm9udC1zaXplOjEuMmVtOw0KICAgIGNvbG9yOiMwMDAwMDA7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENsb3NlQnV0dG9uIHsgIA0KICAgIHBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjBlbTsNCiAgICB0b3A6MGVtOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgaDEgew0KICAgIGZvbnQtc2l6ZToxLjFlbTsNCiAgICBmb250LXdlaWdodDpub3JtYWw7DQogICAgY29sb3I6IzAwMDAwMDsgDQogICAgcGFkZGluZy1sZWZ0OjRweDsgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IGRpdiB7DQogICAgcGFkZGluZzogMXB4OyAgICAgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IHAgew0KICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDEycHg7DQogICAgbWFyZ2luOiAwcHg7DQogICAgY29sb3I6cmdiYSg4MiwgODIsIDgyLCAxKTsgDQp9DQoNCiNXaWxkZmlyZVJpc2tfY29udGVudCBkaXY6bnRoLWNoaWxkKG9kZCkgeyAgICANCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNFN0U3RTc7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyBzcGFuIHsNCiAgICBjb2xvcjojMDAwMDAwOw0KfQ0KDQojV2lsZGZpcmVSaXNrX3ZhbHVlIHsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgZGl2IGRpdiB7DQogICAgcGFkZGluZzowcHg7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyB7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBmb250LXNpemU6MC45ZW07DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cDo6LXdlYmtpdC1zY3JvbGxiYXIgew0KICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjp2ZXJ0aWNhbCB7DQogICAgd2lkdGg6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjpob3Jpem9udGFsIHsNCiAgICBoZWlnaHQ6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7DQogICAgYm9yZGVyLXJhZGl1czogOHB4Ow0KICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlOyAvKiBzaG91bGQgbWF0Y2ggYmFja2dyb3VuZCwgY2FuJ3QgYmUgdHJhbnNwYXJlbnQgKi8NCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KTsNCn0NCg0KDQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSBmaWVsZHNldHsNCiAgICBib3JkZXI6c29saWQgMXB4ICNhN2E3YTc7DQogICAgYm9yZGVyLXJhZGl1czo0cHg7DQogICAgbWFyZ2luOjVweCAwOw0KfQ0KDQoud2lsZGZpcmVfZHluYW1pY2Zvcm0gcC5vcmFuZ2VUZXh0IHNwYW57DQogICAgY29sb3I6I2U2OTUwMDsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQoud2lsZGZpcmVfZHluYW1pY2Zvcm0gaDJ7DQogICAgY29sb3I6Izk5OTk5OTsNCn0NCg0KLndpbGRmaXJlX2R5bmFtaWNmb3JtIC55b3VyX2xvY2F0aW9uIHsNCiAgICBwYWRkaW5nOjEycHggMHB4IDBweCA0cHg7DQp9DQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSAuZGF0YS1jb250ZW50IHsNCiAgICBwYWRkaW5nLWxlZnQ6OHB4Ow0KICAgIGNvbG9yOiM2NjY2NjY7DQp9DQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSAuYnRuLXJvd3sNCiAgICBkaXNwbGF5OnRhYmxlOw0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSAuYnRuLWNlbGx7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOw0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KfQ0KDQoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmJ0bi1jZWxsIGRpdjpmaXJzdC1jaGlsZHsNCiAgICB3aWR0aDogODAlOw0KICAgIHBhZGRpbmc6OHB4Ow0KICAgIGNvbG9yOiMxYTcyYzQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0NSwgMjQ1LCAyNDUsIDEpOw0KICAgIGJvcmRlci1yYWRpdXM6NHB4Ow0KICAgIG1hcmdpbjoxMHB4Ow0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCg0KLndpbGRmaXJlX2R5bmFtaWNmb3JtIC5idG4tY2VsbCBkaXY6aG92ZXJ7DQogICAgY3Vyc29yOnBvaW50ZXI7DQogICAgY29sb3I6ICNmZmZmZmY7DQogICAgYmFja2dyb3VuZC1jb2xvcjojMWE3MmM0Ow0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQp9DQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSAuYnRuLWNlbGwtZG93bmxvYWQ6aG92ZXJ7DQogICAgY3Vyc29yOnBvaW50ZXI7DQogICAgdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsNCn0NCg0KLndpbGRmaXJlX2R5bmFtaWNmb3JtIC5kYXRhLWxhYmVsew0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi53aWxkZmlyZV9keW5hbWljZm9ybSAuY29udGVudEJyZWFrSW1hZ2Ugew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIG1hcmdpbi1sZWZ0OiBhdXRvOw0KICAgIG1hcmdpbi1yaWdodDogYXV0bzsNCiAgICBwYWRkaW5nOjEwcHggMHB4Ow0KfQ==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/OE_Wildfire_DynamicFormView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/OE_WildfireView.html", "html", markup2);
});

})();
