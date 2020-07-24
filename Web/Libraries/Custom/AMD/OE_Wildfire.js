
// Module 'OE_Wildfire'
        (function () {
var markup1 = '<a href=\'#\'></a><div class=\'module workflow-form wildfire_dynamicform\' dir=\'ltr\'>        <div data-binding=\'{innerHTML:mainContent}\'></div>        <div data-binding=\'{innerHTML:homeOwnerReportContent}\'></div>    <div class=\'btn-row\'>        <div class=\'btn-cell\'>            <div data-binding=\'{@event-onclick:homeReport}\'>Homeowner\'s Report</div>        </div>    </div>        <h3>Your Location</h3>    <div class=\'your_location\'>        <div>Watershed  (5<sup>th</sup> level)</div>        <div class=\'btn-row\'>            <div class=\'btn-cell\'>                <div data-binding=\'{@event-onclick:watershedReport}\'><span data-binding=\'{@text:aoiWatershedName}\'></span></div>            </div>        </div>        <div>County</div>        <div class=\'btn-row\'>            <div class=\'btn-cell\'>                <div data-binding=\'{@event-onclick:countyReport}\'><span data-binding=\'{@text:aoiCountyName}\'></span></div>            </div>        </div>        <div>ODF Forest Protection District</div>        <div class=\'data-content\' data-binding=\'{@text:aoiOFPD}\'></div>        <div>Structural Fire Protection District</div>        <div class=\'data-content\' data-binding=\'{@text:aoiSFPDName}\'></div>        <div>City or Town</div>        <div class=\'data-content\' data-binding=\'{@text:aoiCityTown}\'></div>        <div>Urban Growth Boundary</div>        <div class=\'data-content\' data-binding=\'{@text:aoiUGB}\'></div>        <div>Community Wildfire Protection Plan</div>        <div class=\'data-content\' data-binding=\'{@text:aoiCWPPA}\'></div>        <div>Wildland Urban Interface</div>        <div class=\'data-content\' data-binding=\'{@text:aoiWUI}\'></div>        <div><a href=\'https://www.oregon.gov/odf/Fire/Pages/UrbanInterface.aspx\' target=\'_blank\'>Oregon Defensible Space Law</a></div>        <div><a href=\'https://www.nfpa.org/Public-Education/Fire-causes-and-risks/Wildfire/Firewise-USA\' target=\'_blank\'>Firewise Sites</a></div>    </div>    <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>        <button id=\'cancelBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:cancelForm}\'>Close</button>    </div></div>';
var markup2 = '  <!--<div id=\'WildfireRiskPopup\' class=\'module view map-tip-view\' style=\'position:absolute; top:40px; z-index:200;\'> --><div id=\'WildfireRiskPopup\'>    <div class=\'WildfireRiskPopupHeader\'>        <div class=\'WildfireRiskPopupHeaderText\'>Input detected</div>        <button class=\'panel-header-button WildfireRiskPopupCloseButton close-16\' title=\'Close Fire Risk\'></button>    </div>    <!--<div class=\'WildfireRiskPopupGuide\'>        <div id=\'WildfireRisk_guide\'>            Left click on the map to view fire risk information.  To disable/enable fire risk mode use \'Toggle Fire Risk Mode\' from the \'I want To\' button.        </div>    </div>-->    <div class=\'WildfireRiskPopupContent\' style=\'display:none; clear:both;\'>        <div id=\'WildfireRisk_loading\'>Loading...</div>        <div id=\'WildfireRisk_content\' style=\'display:none\'>            <div>                <h1>Average Wildfire Risk (within ¼ mile)</h1><p id=\'WildfireRisk_value\'>Calculating...</p>                <p id=\'WildfireRisk_warning\' style=\'display:none;\'><span>Warning!</span> Incomplete data coverage in your area.</p>            </div>            <!--<div>                <h1>Data coverage in selection</h1><p id=\'WildfireRisk_riskdatapercent\'>Calculating...</p>            </div>-->            <div>                <h1>ODF Forest Protection District</h1><p id=\'WildfireRisk_forest_protection_district\'>No data</p>            </div>            <div>                <h1>Structural Fire Protection District</h1><p id=\'WildfireRisk_structural_projection_district\'>No data</p>            </div>            <div>                <h1>Rangeland Protection Association</h1><p id=\'WildfireRisk_rangeland_protection_assoc\'>No data</p>            </div>            <div>                <h1>City or town</h1><p id=\'WildfireRisk_city\'>No data</p>            </div>            <div>                <h1>Urban Growth Boundary</h1><p id=\'WildfireRisk_urban_growth_boundary\'>No data</p>            </div>            <div>                <h1>Community Wildfire Protection Plan</h1><p id=\'WildfireRisk_cwpp_area\'>No data</p>            </div>            <div>                <h1>Firewise Community</h1><p id=\'WildfireRisk_firewise_community\'>No data</p>            </div>            <div>                <h1>Senate Bill 360 area</h1><p id=\'WildfireRisk_senatebill_360\'>No data</p>            </div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_min\'>0</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_max\'>0</div>            <div style=\'display:none;\' id=\'WildfireRisk_flame_ave\'>0</div>        </div>        <div class=\'WildfireRisk_link\'>            <button class=\'WildfireRiskPopupModuleViewButton\' data-binding=\'{@event-onclick:openWildfireRiskWorkflow}\'>Click here for more information</button>        </div>    </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Wildfire/OE_WildfireModule": function () {
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
    var OE_WildfireModule = /** @class */ (function (_super) {
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
    var OE_WildfireView = /** @class */ (function (_super) {
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
    //popup toggle and default state
    exports.fireRiskPopupEnabled = true;
    var OE_WildfireViewModel = /** @class */ (function (_super) {
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
            ///////////////////////
            // Remove drawings from identify results
            ///////////////////////
            this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
                var _this = this;
                //Check if activated view is the ResultsListView
                if (args.id === "ResultsListView") {
                    //Check if already subscribed to avoid adding duplicate subscriptions
                    var isSubscribed = false;
                    for (var subscription in args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions) {
                        isSubscribed = args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions[subscription].scope.id
                            ? args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscriptions[subscription].scope.id === "OE_Wildfire_DynamicFormViewModel"
                                ? true
                                : isSubscribed
                            : isSubscribed;
                    }
                    if (!isSubscribed) {
                        //Add new subscription to featureSetCollections featureSets.  They are observed by the app to generate the result list dynamically.
                        args.viewModel.featureSetCollection.value.featureSets.bindingEvent.subscribe(this, function (args) {
                            var idxToRemove = null;
                            //Iterate through the featuresets to check if they are drawings and if so grab the array index for deletion.
                            _this.app.viewManager.getViewById("ResultsListView").viewModel.featureSetCollection.value.featureSets.value.forEach(function (fs, idx) {
                                idxToRemove = fs.id === "Drawings" ? idx : idxToRemove;
                            });
                            if (idxToRemove !== null) {
                                _this.app.viewManager.getViewById("ResultsListView").viewModel.featureSetCollection.value.featureSets.value.splice(idxToRemove);
                            }
                        });
                    }
                }
            });
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
                var view = thisViewModel.app.viewManager.getViewById("OE_WildfireView");
                thisViewModel.mapPointIn = pointIn;
                view.buildWildfireRiskWorkflowRequest(false, thisViewModel);
            }
            function enableFireriskPopup() {
                exports.fireRiskPopupEnabled = true;
            }
            function disableFireriskPopup() {
                exports.fireRiskPopupEnabled = false;
            }
            function openFireriskPopup(geometryIn, appIn) {
                var jsonIn = jQuery.parseJSON(geometryIn);
                var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));
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
    var OE_Wildfire_DynamicFormView = /** @class */ (function (_super) {
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
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
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
    //import { } from "geocortex/framework/ui/ViewBase"
    //import { defaultMarkerSymbol } from "geocortex/infrastructure/SymbolUtils";
    //export var reportImageFeatureCollectionJSON;
    //export var reportImageExtent;
    //export var pointLatLong;
    //export var geometryElementsJsonString;
    //export var riskPercentOut;
    //popup toggle and default state
    //export var fireRiskPopupEnabled = <boolean>true;
    var OE_Wildfire_DynamicFormViewModel = /** @class */ (function (_super) {
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
            _this.aoiWUI = new observables_1.Observable("");
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
            /*this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
                //Check if activated view is the ResultsListView
                if (args.id === "ResultsListView") {
                }
            )};*/
            var _this = this;
            this.app.eventRegistry.event("ViewContainerViewClosedEvent").subscribe(this, function (args) {
                console.log('view container closing', args);
                if (args.viewId === "OE_Wildfire_DynamicFormView") {
                    _this.cleanOnClose();
                }
            });
            //dynamic external workflow form
            this.app.registerActivityIdHandler("displayWildfirePointResults", function CustomEventHandler(workflowContext) {
                //let myWorkflowContext: any;
                //myWorkflowContext = $.extend({}, workflowContext);
                thisViewModel.myModel = thisViewModel;
                thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");
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
                thisViewModel.aoiWUI.set(thisViewModel.myWorkflowContext.getValue("aoiWUI"));
                /*if (thisViewModel.myWorkflowContext.getValue("isSFPD")) {
                    $(".wildfire_sfpd_content").css("display", "block");
                }
                else
                {
                    $(".wildfire_sfpd_content").css("display", "none");
                }*/
            });
        };
        OE_Wildfire_DynamicFormViewModel.prototype.cleanOnClose = function () {
            this.app.commandRegistry.command("ClearMarkupQuiet").execute();
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
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/CSS/OE_WildfireModule.css", "css", "LyoubWFwLXRvcC1sZWZ0CnsKICAgIGhlaWdodDoxMDAlOwp9Ki8KCi8qLm1hcC1uYXZpZ2F0aW9uLXJlZ2lvbgp7CiAgICBtYXgtaGVpZ2h0OjEwMCU7Cn0qLwoKLldpbGRmaXJlUmlza1BvcHVwTW9kdWxlVmlld0J1dHRvbiB7CiAgICBwYWRkaW5nOiAuNWVtOwogICAgb3V0bGluZTogbm9uZTsKICAgIGJhY2tncm91bmQ6ICNGNUY1RjU7CiAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0NDQ0NDOwogICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTsKICAgIGZvbnQtd2VpZ2h0OiA2MDA7CiAgICBjb2xvcjogIzFBNzJDNDsKICAgIGJveC1zaGFkb3c6IDA7CiAgICBjdXJzb3I6cG9pbnRlcjsKfQoKLldpbGRmaXJlUmlza1BvcHVwTW9kdWxlVmlld0J1dHRvbjpob3ZlciB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUE3MkM0OwogICAgY29sb3I6ICNmZmZmZmY7Cn0KCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXcgCnsKICAgIGhlaWdodDoxMDAlOwp9CgojV2lsZGZpcmVSaXNrUG9wdXAgewogICAgcG9zaXRpb246YWJzb2x1dGU7ICAgIAogICAgdG9wOjQ0cHg7CiAgICBvdmVyZmxvdy15OmF1dG87CiAgICB6LWluZGV4OjIyMDsgICAKICAgIHdpZHRoOiAyODBweDsKICAgIHBhZGRpbmc6NHB4IDEwcHggNHB4IDEwcHg7CiAgICBib3JkZXI6IDFweCBzb2xpZCAjQTFCOEUxOwogICAgYm9yZGVyLXJhZGl1czogMnB4OyAgICAKICAgIGJhY2tncm91bmQtY29sb3I6I2ZmZmZmZjsKICAgIGNvbG9yOiAjMDAwMDAwOwp9CgovKiBTY3JvbGxiYXIgaXMgY29udHJvbGxlZCBieSBtZWRpYSBxdWVyaWVzICovCkBtZWRpYSBhbGwgYW5kICggbWluLWhlaWdodDogMHB4KSB7CiAgICAjV2lsZGZpcmVSaXNrUG9wdXAgewogICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4OwogICAgfQp9CgpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDMwMHB4KSB7CiAgICAjV2lsZGZpcmVSaXNrUG9wdXAgewogICAgICAgIG1heC1oZWlnaHQ6IDEyMHB4OwogICAgfQp9CgpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDQwMHB4KSB7CiAgICAjV2lsZGZpcmVSaXNrUG9wdXAgewogICAgICAgIG1heC1oZWlnaHQ6IDIyMHB4OwogICAgfQp9CgpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDUwMHB4KSB7CiAgICAjV2lsZGZpcmVSaXNrUG9wdXAgewogICAgICAgIG1heC1oZWlnaHQ6IDMyMHB4OwogICAgfQp9CgpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDYwMHB4KSB7CiAgICAjV2lsZGZpcmVSaXNrUG9wdXAgewogICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4OwogICAgfQp9CgouV2lsZGZpcmVSaXNrUG9wdXBIZWFkZXIgeyAgCiAgICBmbG9hdDpsZWZ0OwogICAgd2lkdGg6MTAwJTsKICAgIGZvbnQtc2l6ZToxLjJlbTsKICAgIGZvbnQtd2VpZ2h0OmJvbGQ7CiAgICBwYWRkaW5nLXRvcDowLjNlbTsKICAgIHBhZGRpbmctYm90dG9tOjAuNWVtOwogICAgY29sb3I6cmdiYSgxMDUsIDEwNSwgMTA1LCAxKTsKfQoKLldpbGRmaXJlUmlza1BvcHVwQ29udGVudCB7ICAKICAgIGZvbnQtc2l6ZToxZW07Cn0KCi8qLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXIgeyAgCiAgICB3aWR0aDoxMnB4Owp9CgouV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayAgeyAgCiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjMpOyAKICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7Cn0KCi5XaWxkZmlyZVJpc2tQb3B1cENvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsKICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjUpOyAKfSovCgouV2lsZGZpcmVSaXNrX2xpbmsgeyAgICAKICAgIHBhZGRpbmc6OHB4IDBweCA4cHggMHB4Owp9CgouV2lsZGZpcmVSaXNrX2xpbmsgYSB7CiAgICBmb250LXNpemU6MS4yZW07CiAgICBjb2xvcjojMDAwMDAwOwp9CgouV2lsZGZpcmVSaXNrUG9wdXBDbG9zZUJ1dHRvbiB7ICAKICAgIHBvc2l0aW9uOmFic29sdXRlOwogICAgcmlnaHQ6MGVtOwogICAgdG9wOjBlbTsKfQoKI1dpbGRmaXJlUmlza19jb250ZW50IGgxIHsKICAgIGZvbnQtc2l6ZToxLjFlbTsKICAgIGZvbnQtd2VpZ2h0Om5vcm1hbDsKICAgIGNvbG9yOiMwMDAwMDA7IAogICAgcGFkZGluZy1sZWZ0OjRweDsgICAKfQoKI1dpbGRmaXJlUmlza19jb250ZW50IGRpdiB7CiAgICBwYWRkaW5nOiAxcHg7ICAgICAgIAp9CgojV2lsZGZpcmVSaXNrX2NvbnRlbnQgcCB7CiAgICBwYWRkaW5nOiAwcHggMHB4IDBweCAxMnB4OwogICAgbWFyZ2luOiAwcHg7CiAgICBjb2xvcjpyZ2JhKDgyLCA4MiwgODIsIDEpOyAKfQoKI1dpbGRmaXJlUmlza19jb250ZW50IGRpdjpudGgtY2hpbGQob2RkKSB7ICAgIAogICAgYmFja2dyb3VuZC1jb2xvcjojRTdFN0U3Owp9CgojV2lsZGZpcmVSaXNrX3dhcm5pbmcgc3BhbiB7CiAgICBjb2xvcjojMDAwMDAwOwp9CgojV2lsZGZpcmVSaXNrX3ZhbHVlIHsKICAgIGZvbnQtd2VpZ2h0OmJvbGQ7Cn0KCiNXaWxkZmlyZVJpc2tfY29udGVudCBkaXYgZGl2IHsKICAgIHBhZGRpbmc6MHB4Owp9CgojV2lsZGZpcmVSaXNrX3dhcm5pbmcgewogICAgZm9udC13ZWlnaHQ6Ym9sZDsKICAgIGZvbnQtc2l6ZTowLjllbTsKfQoKI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhciB7CiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7Cn0KCiNXaWxkZmlyZVJpc2tQb3B1cDo6LXdlYmtpdC1zY3JvbGxiYXI6dmVydGljYWwgewogICAgd2lkdGg6MTJweDsKfQoKI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjpob3Jpem9udGFsIHsKICAgIGhlaWdodDoxMnB4Owp9CgojV2lsZGZpcmVSaXNrUG9wdXA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsKICAgIGJvcmRlci1yYWRpdXM6IDhweDsKICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlOyAvKiBzaG91bGQgbWF0Y2ggYmFja2dyb3VuZCwgY2FuJ3QgYmUgdHJhbnNwYXJlbnQgKi8KICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgLjUpOwp9CgoKCi53aWxkZmlyZV9keW5hbWljZm9ybSBmaWVsZHNldHsKICAgIGJvcmRlcjpzb2xpZCAxcHggI2E3YTdhNzsKICAgIGJvcmRlci1yYWRpdXM6NHB4OwogICAgbWFyZ2luOjVweCAwOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gcC5vcmFuZ2VUZXh0IHNwYW57CiAgICBjb2xvcjojZTY5NTAwOwogICAgZm9udC13ZWlnaHQ6Ym9sZDsKfQoKLndpbGRmaXJlX2R5bmFtaWNmb3JtIGgyewogICAgY29sb3I6Izk5OTk5OTsKfQoKLndpbGRmaXJlX2R5bmFtaWNmb3JtIC55b3VyX2xvY2F0aW9uIHsKICAgIHBhZGRpbmc6MTJweCAwcHggMHB4IDRweDsKfQoKLndpbGRmaXJlX2R5bmFtaWNmb3JtIC5kYXRhLWNvbnRlbnQgewogICAgcGFkZGluZy1sZWZ0OjhweDsKICAgIGNvbG9yOiM2NjY2NjY7Cn0KCi53aWxkZmlyZV9keW5hbWljZm9ybSAuYnRuLXJvd3sKICAgIGRpc3BsYXk6dGFibGU7CiAgICB3aWR0aDoxMDAlOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmJ0bi1jZWxsewogICAgZGlzcGxheTp0YWJsZS1jZWxsOwogICAgdGV4dC1hbGlnbjpjZW50ZXI7Cn0KCi53aWxkZmlyZV9keW5hbWljZm9ybSAuYnRuLWNlbGwgZGl2OmZpcnN0LWNoaWxkewogICAgd2lkdGg6IDgwJTsKICAgIHBhZGRpbmc6OHB4OwogICAgY29sb3I6IzFhNzJjNDsKICAgIGJhY2tncm91bmQtY29sb3I6cmdiYSgyNDUsIDI0NSwgMjQ1LCAxKTsKICAgIGJvcmRlci1yYWRpdXM6NHB4OwogICAgbWFyZ2luOjEwcHg7CiAgICB0ZXh0LWFsaWduOmNlbnRlcjsKICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7CiAgICBmb250LXdlaWdodDpib2xkOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmJ0bi1jZWxsIGRpdjpob3ZlcnsKICAgIGN1cnNvcjpwb2ludGVyOwogICAgY29sb3I6ICNmZmZmZmY7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiMxYTcyYzQ7CiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmJ0bi1jZWxsLWRvd25sb2FkOmhvdmVyewogICAgY3Vyc29yOnBvaW50ZXI7CiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmRhdGEtbGFiZWx7CiAgICBmb250LXdlaWdodDpib2xkOwp9Cgoud2lsZGZpcmVfZHluYW1pY2Zvcm0gLmNvbnRlbnRCcmVha0ltYWdlIHsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgbWFyZ2luLWxlZnQ6IGF1dG87CiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87CiAgICBwYWRkaW5nOjEwcHggMHB4Owp9");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/OE_Wildfire_DynamicFormView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Wildfire/OE_WildfireView.html", "html", markup2);
});

})();
