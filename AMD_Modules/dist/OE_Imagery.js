
// Module 'OE_Imagery'
        (function () {
var markup1 = '<div>    <span>Compare Imagery:</span>    <span>Overlay:</span>    <select data-binding=\'{@source: imageryLayers}{@value: selectedImagery1}\'>        <option data-binding=\'{@template-for: imageryLayers}{value: displayName}{@text: displayName}\' />    </select>    <span>by Swiping over: </span>    <select data-binding=\'{@source: imageryLayers}{@value: selectedImagery2}\'>        <option data-binding=\'{@template-for: imageryLayers}{value: displayName}{@text: displayName}\' />    </select></div>';
var markup2 = '<div class=\'template-module-view\'>	<b><span data-binding=\'{@text: greeting}\'></span></b></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Imagery/OE_ImageryModule": function () {
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
    var ImageryModule = /** @class */ (function (_super) {
        __extends(ImageryModule, _super);
        function ImageryModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        ImageryModule.prototype.initialize = function (config) {
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    //this._onSiteInitialized(args);
                });
            }
        };
        ImageryModule.prototype._onSiteInitialized = function (site) {
            //alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));
        };
        ImageryModule.prototype._onSiteInitializationFailed = function (args) {
            console.log('failed', args);
        };
        return ImageryModule;
    }(ModuleBase_1.ModuleBase));
    exports.ImageryModule = ImageryModule;
});

},
"geocortex/oe_amd/OE_Imagery/OE_ImageryViewCompare": function () {
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
    var ImageryView = /** @class */ (function (_super) {
        __extends(ImageryView, _super);
        function ImageryView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return ImageryView;
    }(ViewBase_1.ViewBase));
    exports.ImageryView = ImageryView;
});

},
"geocortex/oe_amd/OE_Imagery/OE_ImageryViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/essentials/Site"], function (require, exports, ViewModelBase_1, observables_1, Site_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { SiteServiceDiscoveryProvider } from "geocortex/essentials/serviceDiscovery/SiteServiceDiscoveryProvider";
    var ImageryViewModel = /** @class */ (function (_super) {
        __extends(ImageryViewModel, _super);
        function ImageryViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            //ssdp: SiteServiceDiscoveryProvider;
            _this.imageryLayers = new observables_1.ObservableCollection([]);
            _this.selectedImagery1 = new observables_1.Observable('');
            _this.selectedImagery2 = new observables_1.Observable('');
            _this.prevSelectedImagery1 = new observables_1.Observable('');
            _this.prevSelectedImagery2 = new observables_1.Observable('');
            return _this;
        }
        ImageryViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            //add dummy map to attach site 
            $('body').append('<div id="tempmap"></div>');
            var thisScope = this;
            var thisViewModel = this;
            this.app.registerActivityIdHandler("runCompareImagery", function (wc) {
                if (_this.imageryLayers.get().length === 0) {
                    var thisScope_1 = _this;
                    _this.esriMap = _this.app.site.essentialsMap.getMap();
                    var essentialsSite = new Site_1.Site("https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/sites/lc_imagery", _this.esriMap);
                    dojo.connect(essentialsSite, "onInitialized", function (s) {
                        var imageryServiceList = [];
                        s.essentialsMap.mapServices.forEach(function (ms) {
                            var service = {
                                "displayName": ms.displayName,
                                "serviceUrl": ms.serviceUrl,
                                "imageLayer": new esri.layers.ArcGISTiledMapServiceLayer(ms.serviceUrl, {
                                    visible: true,
                                    id: ms.displayName
                                })
                            };
                            imageryServiceList.push(service);
                        });
                        thisScope_1.imageryLayers.set(imageryServiceList);
                        thisScope_1.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare");
                        thisScope_1.selectedImagery1.set(imageryServiceList[0].displayName);
                        thisScope_1.selectedImagery2.set(imageryServiceList[1].displayName);
                    });
                    essentialsSite.initialize();
                }
                else {
                    _this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare");
                }
            });
            this.app.registerActivityIdHandler("runIdentifyDownloadImagery", function (wc) {
                _this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewResults");
            });
            this.selectedImagery1.bind(this, function (val) {
                _this.updateSwipeTool();
            });
            this.selectedImagery2.bind(this, function (val) {
                _this.updateSwipeTool();
            });
        };
        ImageryViewModel.prototype.updateSwipeTool = function () {
            var _this = this;
            var thisScope = this;
            //get selectedLayers
            var swipeLayer1;
            var swipeLayer2;
            var prevSwipeLayer1;
            var prevSwipeLayer2;
            var swiperLeft = 600;
            this.imageryLayers.get().forEach(function (l) {
                if (_this.selectedImagery1.get() === l.displayName) {
                    swipeLayer1 = l;
                }
                if (_this.selectedImagery2.get() === l.displayName) {
                    swipeLayer2 = l;
                }
                if (_this.prevSelectedImagery1.get() === l.displayName) {
                    prevSwipeLayer1 = l;
                }
                if (_this.prevSelectedImagery2.get() === l.displayName) {
                    prevSwipeLayer2 = l;
                }
            });
            //update map display
            if (prevSwipeLayer1) {
                if (this.esriMap.getLayer(prevSwipeLayer1.imageLayer.id)) {
                    this.esriMap.removeLayer(prevSwipeLayer1.imageLayer.id);
                    //this.esriMap.getLayer(prevSwipeLayer1.imageLayer.id).hide();
                }
            }
            if (prevSwipeLayer2) {
                if (this.esriMap.getLayer(prevSwipeLayer2.imageLayer.id)) {
                    this.esriMap.removeLayer(prevSwipeLayer2.imageLayer.id);
                    //this.esriMap.getLayer(prevSwipeLayer2.imageLayer.id).hide();
                }
            }
            if (swipeLayer1) {
                if (this.esriMap.getLayer(swipeLayer1.imageLayer.id)) {
                    this.esriMap.getLayer(swipeLayer1.imageLayer.id).show();
                }
                else {
                    this.esriMap.addLayer(swipeLayer1.imageLayer, 10000);
                }
                this.prevSelectedImagery1.set(swipeLayer1.displayName);
            }
            if (swipeLayer2) {
                if (this.esriMap.getLayer(swipeLayer2.imageLayer.id)) {
                    this.esriMap.getLayer(swipeLayer2.imageLayer.id).show();
                }
                else {
                    this.esriMap.addLayer(swipeLayer2.imageLayer, 9999);
                }
                this.prevSelectedImagery2.set(swipeLayer2.displayName);
            }
            if (!this.swipeWidget) {
                $("#map").append('<div id="swipeDiv"></div>');
                //var swipeContainer = document.getElementById("swipeContainer");
                //if (!swipeContainer) {
                //    swipeContainer = document.createElement("div");
                //    swipeContainer.id = "swipeContainer";
                //    var swipeDiv = document.getElementById("swipeDiv");
                //    swipeDiv.appendChild(swipeContainer);
                //}
            }
            else {
                swiperLeft = this.swipeWidget.left;
                this.swipeWidget.destroy();
                $("#map").append('<div id="swipeDiv"></div>');
            }
            if (this.prevSelectedImagery2.get() !== "") {
                this.swipeWidget = new esri.dijit.LayerSwipe({
                    type: "vertical",
                    map: this.esriMap,
                    left: swiperLeft,
                    layers: [swipeLayer1.imageLayer]
                }, "swipeDiv");
                this.swipeWidget.startup();
                window.setTimeout(function () {
                    if ($(".vertical").length > 0) {
                        var observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutationRecord) {
                                if (mutationRecord.target["style"].top.indexOf('-') === -1) {
                                    $(".vertical").css("top", "-" + $(".vertical")[0].clientHeight + "px");
                                }
                            });
                        });
                        var target = document.getElementsByClassName('vertical')[0];
                        observer.observe(target, { attributes: true, attributeFilter: ['style'] });
                        $(".vertical").css("top", "-" + $(".vertical")[0].clientHeight + "px");
                    }
                }, 500);
            }
        };
        return ImageryViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.ImageryViewModel = ImageryViewModel;
});

},
"geocortex/oe_amd/OE_Imagery/OE_ImageryViewResults": function () {
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
    var ImageryView = /** @class */ (function (_super) {
        __extends(ImageryView, _super);
        function ImageryView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return ImageryView;
    }(ViewBase_1.ViewBase));
    exports.ImageryView = ImageryView;
});

},
"url:/geocortex/oe_amd/OE_Imagery/OE_ImageryViewCompare.html": markup1,
"url:/geocortex/oe_amd/OE_Imagery/OE_ImageryViewResults.html": markup2,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Imagery/CSS/OE_ImageryModule.css", "css", "LnZpZXcuT0VfSW1hZ2VyeVZpZXdDb21wYXJlew0KICAgIG1heC13aWR0aDo2MCU7DQogICAgbWFyZ2luOmF1dG87DQogICAgcGFkZGluZzoyMHB4Ow0KICAgIGJhY2tncm91bmQ6d2hpdGU7DQp9DQoNCi5tYXAtdG9wLWNlbnRlcnsNCiAgICB0b3A6MTVweCAhaW1wb3J0YW50Ow0KICAgIHBvc2l0aW9uOmFic29sdXRlICFpbXBvcnRhbnQ7DQogICAgbGVmdDoyMCUgIWltcG9ydGFudDsNCiAgICByaWdodDoyMCUgIWltcG9ydGFudDsNCn0=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Imagery/OE_ImageryViewCompare.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Imagery/OE_ImageryViewResults.html", "html", markup2);
});

})();
