
// Module 'OE_SearchToWorkflow'
        (function () {
var markup1 = '<div class=\'oeSearchToWorkflowSuggest-module-view\' data-binding=\'{@source: suggestions}{@visible: suggestionsVisible}\'>        <a href=\'javascript:void(0)\' data-binding=\'{@template-for: suggestions}{@text: text}{className: oeSearchToWorkflowDefault} {@event-onclick: searchThisItem}\'></a>    </div>';
var markup2 = '<div class=\'oeSearchToWorkflow-module-view\'>    <button title=\'Search Options\' data-binding=\'{@event-onclick: toggleSearchOptions}\'><img src=\'Resources/Images/Icons/arrow-down-small-24.png\' /></button>    <div data-binding=\'{@visible: searchOptionsVisible}\'>        <a href=\'javascript:void(0)\' data-binding=\'{className: oeSearchToWorkflowDefault} {@event-onclick: searchToDefault}\'>Search Site Layers &amp; Geocoder</a>        <a href=\'javascript:void(0)\' data-binding=\'{@text:workflowSearchText} {className: oeSearchToWorkflowWorkflow} {@event-onclick: searchToWorkflow}\'>Custom Search</a>    </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowModule": function () {
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
    var OE_SearchToWorkflowModule = /** @class */ (function (_super) {
        __extends(OE_SearchToWorkflowModule, _super);
        function OE_SearchToWorkflowModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SearchToWorkflowModule.prototype.initialize = function (config) {
        };
        return OE_SearchToWorkflowModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_SearchToWorkflowModule = OE_SearchToWorkflowModule;
});

},
"geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestView": function () {
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
    var OE_SearchToWorkflowSuggestView = /** @class */ (function (_super) {
        __extends(OE_SearchToWorkflowSuggestView, _super);
        function OE_SearchToWorkflowSuggestView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SearchToWorkflowSuggestView.prototype.searchThisItem = function (event, element, context) {
            this.viewModel.suggestionClicked(context);
        };
        return OE_SearchToWorkflowSuggestView;
    }(ViewBase_1.ViewBase));
    exports.OE_SearchToWorkflowSuggestView = OE_SearchToWorkflowSuggestView;
});

},
"geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestViewModel": function () {
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
    var OE_SearchToWorkflowSuggestViewModel = /** @class */ (function (_super) {
        __extends(OE_SearchToWorkflowSuggestViewModel, _super);
        function OE_SearchToWorkflowSuggestViewModel(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return OE_SearchToWorkflowSuggestViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_SearchToWorkflowSuggestViewModel = OE_SearchToWorkflowSuggestViewModel;
});

},
"geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowView": function () {
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
    var OE_SearchToWorkflowView = /** @class */ (function (_super) {
        __extends(OE_SearchToWorkflowView, _super);
        function OE_SearchToWorkflowView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SearchToWorkflowView.prototype.toggleSearchOptions = function (event, element, context) {
            this.viewModel.toggleSearchOptions(!this.viewModel.searchOptionsVisible.get());
        };
        OE_SearchToWorkflowView.prototype.searchToDefault = function (event, element, context) {
            this.viewModel.searchToDefault();
        };
        OE_SearchToWorkflowView.prototype.searchToWorkflow = function (event, element, context) {
            this.viewModel.searchToWorkflow();
        };
        return OE_SearchToWorkflowView;
    }(ViewBase_1.ViewBase));
    exports.OE_SearchToWorkflowView = OE_SearchToWorkflowView;
});

},
"geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowViewModel": function () {
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
    var OE_SearchToWorkflowViewModel = /** @class */ (function (_super) {
        __extends(OE_SearchToWorkflowViewModel, _super);
        function OE_SearchToWorkflowViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.eventCount = 0;
            _this.workflowSearchText = new observables_1.Observable("Address Search");
            _this.searchType = new observables_1.Observable("default");
            _this.searchOptionsVisible = new observables_1.Observable(false);
            _this.oeSearchToWorkflowDefault = new observables_1.Observable("oeSearchToWorkflowSelected");
            _this.oeSearchToWorkflowWorkflow = new observables_1.Observable("");
            _this.suggestionsVisible = new observables_1.Observable(false);
            _this.suggestions = new observables_1.ObservableCollection();
            return _this;
        }
        OE_SearchToWorkflowViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            this.searchWorkflowID = config.searchWorkflowID;
            this.searchArgumentName = config.searchArgumentName;
            this.defaultSearchOption = config.defaultSearchOption || "site";
            this.suggestionSearchDelayMS = config.suggestionSearchDelayMS || 250;
            this.minLengthToSearch = config.minLengthToSearch || 3;
            var tmpText = config.workflowSearchText || "Address Search";
            this.workflowSearchText.set(tmpText);
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args);
                });
            }
        };
        OE_SearchToWorkflowViewModel.prototype._onSiteInitialized = function (site) {
            var _this = this;
            this.app.eventRegistry.event("SearchProgressEvent").subscribe(this, function (args) {
                _this.searchProgressEvent(args);
            });
            //add search view combo box, SearchView
            var thisScope = this;
            window.setTimeout(function () {
                thisScope.app.commandRegistry.command("ActivateView").execute("OE_SearchToWorkflowView");
                //set default selected option
                if (thisScope.defaultSearchOption == "workflow")
                    thisScope.searchToWorkflow();
                else
                    thisScope.searchToDefault();
                //listen for input
                $("#gcx_search").keyup(function (event) {
                    thisScope.searchKeyUp(event);
                });
                //disable search input auto complete
                $("#gcx_search").attr("autocomplete", "off");
            }, 1000);
        };
        OE_SearchToWorkflowViewModel.prototype.searchToDefault = function () {
            this.searchType.set("default");
            this.toggleSearchOptions(false);
            this.oeSearchToWorkflowDefault.set("oeSearchToWorkflowSelected");
            this.oeSearchToWorkflowWorkflow.set("");
        };
        OE_SearchToWorkflowViewModel.prototype.searchToWorkflow = function () {
            this.searchType.set("workflow");
            this.toggleSearchOptions(false);
            this.oeSearchToWorkflowDefault.set("");
            this.oeSearchToWorkflowWorkflow.set("oeSearchToWorkflowSelected");
        };
        OE_SearchToWorkflowViewModel.prototype.toggleSearchOptions = function (val) {
            this.searchOptionsVisible.set(val);
            this.suggestionsVisible.set(false);
        };
        OE_SearchToWorkflowViewModel.prototype.searchProgressEvent = function (args) {
            //first event is searching, second is idle, third is idle
            this.eventCount++;
            if (this.searchType && this.searchType.get() == "workflow") {
                //prevent default search results
                this.app.commandRegistry.command("DeactivateView").execute("DataFrameResultsContainerView");
                if (this.eventCount >= 4) {
                    this.eventCount = 0;
                    var workflowArgs = {};
                    workflowArgs.workflowId = this.searchWorkflowID;
                    workflowArgs[this.searchArgumentName] = args.query;
                    this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                }
            }
            if (this.eventCount >= 4) {
                this.eventCount = 0;
            }
        };
        OE_SearchToWorkflowViewModel.prototype.searchKeyUp = function (event) {
            console.log(event.keyCode);
            if (event.keyCode == 13) {
                if (this.suggestTimeout)
                    clearTimeout(this.suggestTimeout);
                this.suggestionsVisible.set(false);
                return;
            }
            if ($("#gcx_search").val().toString().length < this.minLengthToSearch) {
                if (this.suggestTimeout)
                    clearTimeout(this.suggestTimeout);
                this.suggestionsVisible.set(false);
                return;
            }
            //event.keyCode == 8 || event.keyCode == 46 ||
            if (event.keyCode == 8 || (event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 111)) {
                this.searchSuggestStartTimeout();
            }
        };
        OE_SearchToWorkflowViewModel.prototype.searchSuggestStartTimeout = function () {
            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout);
            var thisScope = this;
            this.suggestTimeout = window.setTimeout(function () {
                thisScope.searchSuggestRequest();
            }, this.suggestionSearchDelayMS);
        };
        OE_SearchToWorkflowViewModel.prototype.searchSuggestRequest = function () {
            var searchString = encodeURI($("#gcx_search").val().toString());
            var requestURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=" + searchString + "&category=&searchExtent=-124.83,41.85,-116.37,46.36&location=&f=json";
            var thisScope = this;
            var jqxhr = $.getJSON(requestURL, function (data) {
                console.log("success");
                thisScope.suggestionResults(data);
            })
                .fail(function () {
                console.log("suggest request error");
            });
        };
        OE_SearchToWorkflowViewModel.prototype.suggestionResultError = function () {
            this.suggestionsVisible.set(true);
        };
        OE_SearchToWorkflowViewModel.prototype.suggestionResults = function (data) {
            console.log(data);
            this.suggestions.clear();
            if (data.suggestions && data.suggestions.length > 0) {
                this.suggestions.addItems(data.suggestions);
                this.suggestionsVisible.set(true);
            }
            else {
                //this.suggestions.addItems();
                this.suggestionsVisible.set(false);
            }
        };
        OE_SearchToWorkflowViewModel.prototype.suggestionClicked = function (val) {
            this.suggestionsVisible.set(false);
            var searchText = val.text;
            $("#gcx_search").val(searchText);
            //$("#gcx_search").submit();
            $(".search-button").click();
        };
        return OE_SearchToWorkflowViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_SearchToWorkflowViewModel = OE_SearchToWorkflowViewModel;
});

},
"url:/geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestView.html": markup1,
"url:/geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowView.html": markup2,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SearchToWorkflow/CSS/OE_SearchToWorkflow.css", "css", "Lypjc3MqLw0KICAgIC5PRV9TZWFyY2hUb1dvcmtmbG93VmlldyB7DQogICAgICAgIGZsb2F0OnJpZ2h0Ow0KICAgIH0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgew0KICAgIA0KICAgIH0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgYnV0dG9uIHsNCiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI0Q5RDlEOTsNCiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsNCiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7DQogICAgICAgIHBhZGRpbmc6IC40ZW07DQogICAgICAgIG1hcmdpbi1yaWdodDogMnB4Ow0KICAgIH0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgZGl2IHsNCiAgICAgICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgICAgICBkaXNwbGF5OiBibG9jazsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNEOUQ5RDk7DQogICAgfQ0KDQoub2VTZWFyY2hUb1dvcmtmbG93U3VnZ2VzdC1tb2R1bGUtdmlldyB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNEOUQ5RDk7DQogICAgcmlnaHQ6IDEwcHg7DQogICAgbWFyZ2luLXRvcDogMzdweDsNCn0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgZGl2IGEsIC5vZVNlYXJjaFRvV29ya2Zsb3dTdWdnZXN0LW1vZHVsZS12aWV3IGEgew0KICAgICAgICBwYWRkaW5nOiA4cHg7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOw0KICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0Ow0KICAgICAgICBjb2xvcjogIzAwMDsNCiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KICAgIH0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgZGl2IGE6aG92ZXIsIC5vZVNlYXJjaFRvV29ya2Zsb3dTdWdnZXN0LW1vZHVsZS12aWV3IGE6aG92ZXIgew0KICAgICAgICBjb2xvcjogI2ZmZjsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRDNEM0QzsNCiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KICAgIH0NCg0KICAgIC5vZVNlYXJjaFRvV29ya2Zsb3ctbW9kdWxlLXZpZXcgZGl2IGEub2VTZWFyY2hUb1dvcmtmbG93U2VsZWN0ZWQsIC5vZVNlYXJjaFRvV29ya2Zsb3dTdWdnZXN0LW1vZHVsZS12aWV3IGE6aG92ZXIgew0KICAgICAgICBjb2xvcjogI2ZmZjsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRDNEM0QzsNCiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KICAgIH0NCg==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowView.html", "html", markup2);
});

})();
