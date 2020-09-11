
// Module 'OE_AddLayerToLayerList'
        (function () {
var markup1 = '<div class=\'oeLayerSearch-module-view\'>    <div class=\'oeLayerSearchLoading\' data-binding=\'{@visible: loaderVisible}\'>        <img data-binding=\'{@visible: loaderSpinner}\' src=\'Resources/Images/Custom/loader-activity12.gif\' />        <img data-binding=\'{@visible: loaderWarnIcon}\' src=\'Resources/Images/Custom/warning.png\' />        <div class=\'oeLayerSearchWarningMessage\' data-binding=\'{@text: loaderMessage}\'>Searching layers...</div>        <div data-binding=\'{@visible: inputBlockOnError}\' class=\'oeLayerSearchErrorInput\'>            <div>If this error persists please contact the site admin.</div>                    </div>        <div data-binding=\'{@visible: resultButtonVisible}\'>                        <button data-binding=\'{@event-onclick: buttonCloseError} {@text: resultButtonText}\'> New Search </button>        </div>    </div>            <div class=\'layer-catalog\'>        <div class=\'lc-filter\'>            <div class=\'lc-search\'>                <input data-binding=\'{@event-keyup: inputDoSearch} {value: searchFieldText}\' class=\'search-field ui-autocomplete-input\' type=\'text\' id=\'oeLayerSearchInput\' placeholder=\'Search Oregon Explorer Layers\' autocomplete=\'off\'>                <span role=\'status\' aria-live=\'polite\' class=\'ui-helper-hidden-accessible\'>1 result is available, use up and down arrow keys to navigate.</span>                <button class=\'clear-button\' title=\'Clear search input\' data-binding=\'{@event-onclick: buttonClearSearch}\'></button>                <button class=\'search-button\' title=\'Perform search\' data-binding=\'{@event-onclick: buttonDoSearch}\'></button>            </div>            <div class=\'oeSearchLayerRightButtons\'>                                <button title=\'Options\' data-binding=\'{@event-onclick: OptionsToggle}\'><img src=\'Resources/Images/Icons/vertical-ellipsis.png\' /></button>            </div>            <div class=\'oeSearchLayerOptions bound-invisible\' data-binding=\'{@visible: oeSearchLayerOptionsVisible}\'>                <div><button title=\'Search Portal\' data-binding=\'{@event-onclick: SearchPortal}\'><img src=\'Resources/Images/Icons/map-24.png\' />Portal Search</button></div>                <div><button title=\'Reload Services\' data-binding=\'{@event-onclick: buttonReloadServices}\'><img src=\'Resources/Images/Icons/Toolbar/sync-manage-24.png\' />Reload Services</button></div>                <div><button title=\'Reload Services\' data-binding=\'{@event-onclick: buttonTestLayer}\'><img src=\'Resources/Images/Icons/Toolbar/sync-manage-24.png\' />Add Test Layer</button></div>            </div>        </div>        <div class=\'oeLayerSearchToggleTrees\'>            <div><span data-binding=\'{@text: currentFilteredCount}\'></span> layer(s)</div>            <div><button class=\'button-text-link\' data-binding=\'{@event-onclick: buttonCollapseAll}\'>Collapse All</button></div>            <div><button class=\'button-text-link\' data-binding=\'{@event-onclick: buttonExpandAll}\'>Expand All</button></div>            <div><button class=\'button-text-link\' data-binding=\'{@text: toggleSelectedText}{@event-onclick: ToggledSelected}\'>Show Selected</button></div>            <hr />        </div>        <div class=\'lc-content\'>            <div class=\'lc-status lc-loader bound-invisible\'>                <img src=\'Resources/Images/loader-small.gif\' alt=\'Loading\' width=\'24\' height=\'24\'>            </div>            <div class=\'oe-lc-entries bound-visible\'>                <span class=\'oeLayerSearchAboveTreeMessage bound-invisible\' data-binding=\'{@visible: textSelectedLayersVisible}\'>No Layers Currently Selected</span>                <span class=\'oeLayerSearchAboveTreeMessage bound-invisible\' data-binding=\'{@visible: noResultsVisible}\'>No results for: <span data-binding=\'{@text: searchFieldText}\'></span></span>                <ul class=\'layer-catalog-items\' role=\'tree\' data-binding=\'{@source: resultsObject}\'>                    <li class=\'lc-tree\' role=\'treeitem\' data-binding=\'{@template-for: resultsObject}{@visible: oeServiceVisible}\'>                        <!-- Map services -->                        <div id=\'folderItem-GUID\' class=\'folder-item bound-visible\'>                            <div class=\'folder-item-name\'>                                <button class=\'catalog-item-button\' data-binding=\'{@event-onclick: TreeToggle}\'>                                    <span class=\'catalog-item-control\'>                                        <!-- Chrome Vox: Announces when folder is open or closed -->                                        <span data-binding=\'{@visible: oeTreeExpand}\' class=\'expander-button folder-closed bound-visible\' aria-label=\'Layer Catalog group expanded\'></span>                                        <span data-binding=\'{@visible: oeTreeCollapse}\' class=\'expander-button folder-open bound-invisible\' aria-label=\'Layer Catalog group collapsed\'></span>                                    </span>                                    <span data-binding=\'{@text: displayName}\'><img src=\'Resources/Images/Icons/connection-24.png\' /> PLACE HOLDER SERVICE NAME</span> <span data-binding=\'{@text: oeResultCountString}\'></span>                                    <span class=\'selected-indicator bound-invisible\'>(Some Selected)</span>                                    <span class=\'selected-indicator bound-invisible\'>(All Selected)</span>                                                                    </button>                                <button title=\'Remove Service\' data-binding=\'{@event-onclick: buttonRemoveService}\'><img data-binding=\'{@visible: removeCustomServiceVisible}\' src=\'Resources/Images/Icons/status-error-16.png\' /></button>                                <div class=\'catalog-folder-select bound-visible\'>                                    <label class=\'catalog-item-label bound-invisible\'>                                        <span class=\'catalog-item-control\'>                                            <input type=\'checkbox\'>                                        </span>                                        <span class=\'layer-item\'>                                            <span class=\'layer-item-name\'>Select All</span>                                        </span>                                    </label>                                </div>                            </div>                            <ul class=\'layer-catalog-items bound-visible\' aria-labelledby=\'folderItem-GUID\' data-binding=\'{@visible: oeTreeVisible} {@source: layers}\'>                                <!-- Layers in map service -->                                <li class=\'lc-tree\' data-binding=\'{@template-for: layers}{@visible: oeLayerVisible}{alt: nameGroupSort}\'>                                    <div class=\'catalog-layer-item\' data-binding=\'{style: oeIndentLevel}{class: oeHasParentLayer}\'>                                        <label class=\'catalog-item-label\'>                                            <span class=\'catalog-item-control\'>                                                <input type=\'checkbox\' data-binding=\'{@value: layerCheckbox}{@event-onchange: CheckboxChanged}\'>                                            </span>                                            <span class=\'layer-item\'>                                                <span class=\'layer-item-name\' data-binding=\'{class: oeSearchLayerGroup}{@text: displayName}\'></span>                                            </span>                                        </label>                                        <button class=\'lc-details bound-invisible\'><img alt=\'\' src=\'\' title=\'\'></button>                                    </div>                                </li>                            </ul>                        </div>                    </li>                </ul>            </div>        </div>        <div class=\'lc-actions\'>            <button class=\'button\' data-binding=\'{@event-onclick: buttonOK}\'>OK</button>            <button class=\'button\' data-binding=\'{@event-onclick: buttonCancel}\'>Cancel</button>        </div>    </div>    <div id=\'oeLayerSearchJunkMap\' style=\'display:none\'></div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListModule": function () {
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
    var OE_AddLayerToLayerListModule = /** @class */ (function (_super) {
        __extends(OE_AddLayerToLayerListModule, _super);
        function OE_AddLayerToLayerListModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_AddLayerToLayerListModule.prototype.initialize = function (config) {
            var _this = this;
            var thisViewModel = this;
            var site = this.app.site;
            this.menuItems = config.menuItems ? config.menuItems : [];
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel);
                });
            }
        };
        OE_AddLayerToLayerListModule.prototype._onSiteInitialized = function (site, thisViewModel) {
            /*
            let thisScope = thisViewModel;
            this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
                console.log('ViewActivatedEvent args: ', args);
                if (args.id === "LayerListView" && args.hostView) {
                    //this.app.commandRegistry.command("ActivateView").execute("OE_AddLayerToLayerListView");
                    if ($(".oe_add_layer_wrapper").length === 0 && this.menuItems.length > 0) {
                        let menuHMTL = "";
                        this.menuItems.forEach(menu => {
                            let menuItemHTML = "<button onclick =\"geocortex.framework.applications[0].commandRegistry.commands." + menu["command"] + ".execute()\" class=\"toolbar-item tool\" title=\"Add layers to the map\"><img alt=\"" + menu["description"] + "\" src=\"" + menu["iconUri"] + "\" class=\"bound-visible-inline\"><p>" + menu["text"] + "</p></button>";
                            menuHMTL += menuItemHTML;
                        })
                        //let layerAddHTML = "<button onclick=\"geocortex.framework.applications[0].commandRegistry.commands.AddMapLayerInteractive.execute()\" class=\"toolbar-item tool\" title=\"Add layers to the map\"><img alt=\"Add layers to map\" src=\"Resources/Images/Icons/Toolbar/layers-add-24.png\" class=\"bound-visible-inline\"><p>Add Layers</p></button>";
                        ////if layer Catalog
                        //if (this.app.site.layerCatalogs.length > 0) {
                        //    layerAddHTML += "<button onclick=\"geocortex.framework.applications[0].commandRegistry.commands.ShowLayerCatalog.execute()\"  class=\"toolbar-item tool\" tabindex=\"-1\" title=\"Add layers to the map from a layer catalog\"><img alt=\" \" src=\"Resources/Images/Icons/Toolbar/layer-catalog-24.png\" class=\"bound-visible-inline\"><p>Layer Catalog</p></button>";
                        //}
                        $('.layer-list-wrapper').prepend("<div class=\"oe_add_layer_wrapper\">" + menuHMTL + "</div>");
                        $('.LegendView').prepend("<div class=\"oe_add_layer_wrapper\">" + menuHMTL + "</div>");
                        $('.layer-list').css("position", "relative !important");
                        $('.layer-list').css("top", "unset !important");
                    }
                }
            });
            */
            /*this.app.commandRegistry.command("OESearchPortalLayers").register(this, this.OESearchPortalLayers);
            this.app.commandRegistry.command("OEAddMapService").register(this, (args) => {
                this.OEAddMapService(args, thisViewModel);
            });  //this.OEAddMapService(site, thisScope));*/
        };
        return OE_AddLayerToLayerListModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_AddLayerToLayerListModule = OE_AddLayerToLayerListModule;
});

},
"geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListView": function () {
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
    var OE_AddLayerToLayerListView = /** @class */ (function (_super) {
        __extends(OE_AddLayerToLayerListView, _super);
        function OE_AddLayerToLayerListView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_AddLayerToLayerListView.prototype.buttonCloseError = function (event, element, context) {
            context.CloseError();
        };
        OE_AddLayerToLayerListView.prototype.buttonCancel = function (event, element, context) {
            context.CancelClicked();
        };
        OE_AddLayerToLayerListView.prototype.buttonOK = function (event, element, context) {
            context.OkClicked();
            for (var prop in context.checkedBoxMap) {
                //skip missing properties
                if (!context.checkedBoxMap.hasOwnProperty(prop))
                    continue;
                //console.log(this.checkedBoxMap[prop]);
                context.checkedBoxMap[prop]["customID"] = prop;
                context.CheckToken(context.checkedBoxMap[prop]);
            }
            context.CancelClicked();
        };
        OE_AddLayerToLayerListView.prototype.OptionsToggle = function (event, element, context) {
            var newVal = !context.oeSearchLayerOptionsVisible.get();
            context.oeSearchLayerOptionsVisible.set(newVal);
        };
        OE_AddLayerToLayerListView.prototype.SearchPortal = function (event, element, context) {
            context.OESearchPortalLayers();
        };
        OE_AddLayerToLayerListView.prototype.TreeToggle = function (event, element, context) {
            var newVal = !context.oeTreeVisible.get();
            context.oeTreeVisible.set(newVal);
            if (newVal) {
                context.oeTreeExpand.set(false);
                context.oeTreeCollapse.set(true);
            }
            else {
                context.oeTreeExpand.set(true);
                context.oeTreeCollapse.set(false);
            }
        };
        OE_AddLayerToLayerListView.prototype.ToggledSelected = function (event, element, context) {
            var newVal = !context.toggleSelectedValue.get();
            context.toggleSelectedValue.set(newVal);
            if (newVal) {
                context.toggleSelectedText.set("Show All");
                this.ShowAllOrSelected(false);
            }
            else {
                context.toggleSelectedText.set("Show Selected");
                this.ShowAllOrSelected(true);
            }
        };
        OE_AddLayerToLayerListView.prototype.ShowAllOrSelected = function (showAll) {
            var showAllFilter = (this.viewModel.searchFieldText.get().length > 2) ? false : true;
            if (showAll) {
                this.viewModel.OESearchLayers(showAllFilter, false);
            }
            else {
                this.viewModel.OESearchLayers(false, true);
            }
        };
        OE_AddLayerToLayerListView.prototype.CheckboxChanged = function (event, element, context) {
            //var workingService: any = this.viewModel.resultsObject.getAt(context.mapServiceIndex);
            var mapKey = context.mapServiceConnectionString.replace("url=", "") + "/" + context.id;
            console.log(mapKey);
            if (element.checked) {
                this.viewModel.checkedBoxMap[mapKey] = context;
            }
            else {
                if (this.viewModel.checkedBoxMap.hasOwnProperty(mapKey)) {
                    delete this.viewModel.checkedBoxMap[mapKey];
                }
            }
            //context.serviceURL;        
        };
        OE_AddLayerToLayerListView.prototype.buttonClearSearch = function (event, element, context) {
            context.ClearSearchInput();
        };
        OE_AddLayerToLayerListView.prototype.inputDoSearch = function (event, element, context) {
            if (event.code == "Enter") {
                context.searchFieldText.set(element.value);
                context.DoSearch();
            }
            else if (element.value.toLowerCase().indexOf("http") > -1) {
                context.searchFieldText.set(element.value);
                context.ShowDirectServiceURL();
            }
            else if (element.value.length > 2) {
                context.searchFieldText.set(element.value);
                context.DoSearch();
            }
            else if (element.value.length < 1) {
                context.ClearSearchInput();
            }
        };
        OE_AddLayerToLayerListView.prototype.buttonReloadServices = function (event, element, context) {
            //force services reload
            context.LoadRemoteServiceSources(true);
        };
        OE_AddLayerToLayerListView.prototype.buttonDoSearch = function (event, element, context) {
            context.searchFieldText.set($("#oeLayerSearchInput").val().toString());
            context.DoSearch();
        };
        OE_AddLayerToLayerListView.prototype.buttonToggleSelected = function (event, element, context) {
            context.ToggleSelected();
        };
        OE_AddLayerToLayerListView.prototype.buttonCollapseAll = function (event, element, context) {
            context.ExpandAllTrees(false);
        };
        OE_AddLayerToLayerListView.prototype.buttonExpandAll = function (event, element, context) {
            context.ExpandAllTrees(true);
        };
        OE_AddLayerToLayerListView.prototype.buttonTestLayer = function (event, element, context) {
            context.ResolveLayerTest();
        };
        OE_AddLayerToLayerListView.prototype.buttonRemoveService = function (event, element, context) {
            this.viewModel.RemoveService(context);
        };
        return OE_AddLayerToLayerListView;
    }(ViewBase_1.ViewBase));
    exports.OE_AddLayerToLayerListView = OE_AddLayerToLayerListView;
});

},
"geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListViewModel": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework/observables", "geocortex/essentials/RestHelperHTTPService", "geocortex/infrastructure/commandArgs/AddStatusArgs", "geocortex/essentials/serviceDiscovery/SiteServiceDiscoveryProvider", "geocortex/essentials/ServiceHelper", "geocortex/essentials/Site"], function (require, exports, ViewModelBase_1, observables_1, observables_2, RestHelperHTTPService_1, AddStatusArgs_1, SiteServiceDiscoveryProvider_1, ServiceHelper_1, Site_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_AddLayerToLayerListViewModel = /** @class */ (function (_super) {
        __extends(OE_AddLayerToLayerListViewModel, _super);
        function OE_AddLayerToLayerListViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.loaderVisible = new observables_1.Observable(true);
            _this.loaderMessage = new observables_1.Observable("Loading content...");
            _this.loaderSpinner = new observables_1.Observable(false);
            _this.loaderWarnIcon = new observables_1.Observable(false);
            _this.inputBlockOnError = new observables_1.Observable(false);
            _this.resultButtonVisible = new observables_1.Observable(false);
            _this.resultButtonText = new observables_1.Observable("New Search");
            _this.searchFieldText = new observables_1.Observable("");
            _this.noResultsVisible = new observables_1.Observable(false);
            _this.toggleSelectedValue = new observables_1.Observable(false);
            _this.toggleSelectedText = new observables_1.Observable("Show Selected");
            _this.textSelectedLayersVisible = new observables_1.Observable(false);
            _this.resultsArrayForSort = [];
            _this.resultsObject = new observables_2.ObservableCollection(null);
            _this.currentFilteredCount = new observables_1.Observable();
            _this.usedURLs = [];
            _this.remoteServiceURLs = [];
            _this.remoteServiceURLcurrent = 0;
            _this.remoteGCXSites = {};
            _this.parentServiceLayerIDShown = [];
            _this.oeSearchLayerOptionsVisible = new observables_1.Observable(false);
            return _this;
        }
        OE_AddLayerToLayerListViewModel.prototype.initialize = function (config) {
            var _this = this;
            this.site = this.app.site;
            this.thisViewModel = this;
            this.remoteServiceURLs = config.remoteServiceURLs;
            this.checkedBoxMap = {};
            if (this.site && this.site.isInitialized) {
                this._onSiteInitialized();
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized();
                });
            }
        };
        OE_AddLayerToLayerListViewModel.prototype._onSiteInitialized = function () {
            //register tagging command
            this.app.commandRegistry.command("oeLayerSearch").register(this, this.OpenSearchWindow);
            this.ssdp = new SiteServiceDiscoveryProvider_1.SiteServiceDiscoveryProvider();
            this.ssdp.initialize(this.app.site);
        };
        OE_AddLayerToLayerListViewModel.prototype.OpenSearchWindow = function () {
            this.app.commandRegistry.command("ActivateView").execute("OE_AddLayerToLayerListView");
            this.CheckSSDPState();
        };
        OE_AddLayerToLayerListViewModel.prototype.ShowLoader = function (loaderMessage, showLoader, showSpinner, showWarning, showError, showResetButton) {
            this.loaderMessage.set(loaderMessage);
            this.loaderWarnIcon.set(showWarning);
            this.loaderSpinner.set(showSpinner);
            this.resultButtonVisible.set(showResetButton);
            this.inputBlockOnError.set(showError);
            this.loaderVisible.set(showLoader);
        };
        OE_AddLayerToLayerListViewModel.prototype.HideLoader = function () {
            this.ShowLoader("", false, false, false, false, false);
        };
        OE_AddLayerToLayerListViewModel.prototype.CheckSSDPState = function () {
            if (!this.ssdp.initialized) {
                this.ShowLoader("Initializing...", true, true, false, false, false);
                setTimeout(function () { this.CheckSSDPState(); }, 500);
            }
            else {
                this.HideLoader();
                this.LoadRemoteServiceSources(false);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.LoadRemoteServiceSources = function (forceLoad) {
            //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
            //"/map/mapservices?f=json"
            this.oeSearchLayerOptionsVisible.set(false);
            if (!forceLoad && this.resultsObject.length() > 0) {
                //clear checkbox data           
                this.ClearLayerCheckboxes();
                this.checkedBoxMap = {};
                this.searchFieldText.set("");
                this.HideLoader();
                return;
            }
            this.ShowLoader("Loading remote services.  This may take a moment...", true, true, false, false, false);
            this.checkedBoxMap = {};
            this.resultsArrayForSort = [];
            this.resultsObject.clear();
            this.usedURLs = [];
            this.searchFieldText.set("");
            this.noResultsVisible.set(false);
            this.remoteServiceURLcurrent = 0;
            if (this.remoteServiceURLs != null && this.remoteServiceURLs.length > 0) {
                this.RequestSearchSources(this.remoteServiceURLs[this.remoteServiceURLcurrent]);
            }
            else {
                //no service urls!
                this.ShowLoader("Error: No remote service urls.  No search can be performed.", true, false, true, true, true);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.RemoteServiceLoadedCheck = function (isError) {
            this.remoteServiceURLcurrent++;
            if (this.remoteServiceURLcurrent < this.remoteServiceURLs.length) {
                //load next
                this.RequestSearchSources(this.remoteServiceURLs[this.remoteServiceURLcurrent]);
            }
            else {
                //done
                this.SourcesDone();
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.SourcesDone = function () {
            if (this.resultsArrayForSort.length < 1) {
                this.ShowLoader("Error. No remote services loaded.", true, false, true, false, true);
            }
            else {
                //sort
                this.resultsArrayForSort.sort(function (a, b) {
                    if (a.displayName < b.displayName)
                        return -1;
                    if (a.displayName > b.displayName)
                        return 1;
                    return 0;
                });
                this.resultsObject.addItems(this.resultsArrayForSort);
                this.resultsArrayForSort = [];
                this.HideLoader();
                //show all results
                this.OESearchLayers(true, false);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.ClearSearchInput = function () {
            console.log("Clear search");
            this.searchFieldText.set("");
            //show all results
            this.OESearchLayers(true, false);
        };
        OE_AddLayerToLayerListViewModel.prototype.DoSearch = function () {
            console.log("Do search: " + this.searchFieldText.get());
            this.OESearchLayers(false, false);
        };
        OE_AddLayerToLayerListViewModel.prototype.ToggleSelected = function () {
            console.log("Toggle selected");
        };
        OE_AddLayerToLayerListViewModel.prototype.OkClicked = function () {
            console.log("Ok clicked");
        };
        OE_AddLayerToLayerListViewModel.prototype.CancelClicked = function () {
            this.HideLoader();
            this.app.commandRegistry.command("DeactivateView").execute("OE_AddLayerToLayerListView");
        };
        OE_AddLayerToLayerListViewModel.prototype.CloseError = function () {
            this.HideLoader();
        };
        OE_AddLayerToLayerListViewModel.prototype.CleanURL = function (val) {
            //remove url=
            //val = val.replace("url=", "");
            //url is the first item only use it
            /*if (val.indexOf(";") > -1) {
                //url
                val = val.split(";")[0];
            }*/
            //some connection strings have the layer id in them.... why?
            if (val.indexOf("/MapServer/") > -1) {
                var searchVal = "/MapServer/";
                var selectTo = val.indexOf(searchVal) + searchVal.length - 1;
                val = val.substring(0, selectTo);
            }
            if (val.indexOf("/FeatureServer/") > -1) {
                var searchVal = "/FeatureServer/";
                var selectTo = val.indexOf(searchVal) + searchVal.length - 1;
                val = val.substring(0, selectTo);
            }
            return val;
        };
        OE_AddLayerToLayerListViewModel.prototype.GetURLPart = function (val, searchName) {
            var token = "";
            //url is the first item only use it
            if (val.indexOf(";") > -1) {
                var valArray = val.split(";");
                if (val.indexOf(searchName + "=") > -1) {
                    for (var i = 0; i < valArray.length; i++) {
                        if (valArray[i].indexOf(searchName + "=") > -1) {
                            token = valArray[i].replace(searchName + "=", "");
                            break;
                        }
                    }
                }
            }
            return token;
        };
        OE_AddLayerToLayerListViewModel.prototype.IsDefined = function (testObject, testProperty) {
            if (!testObject.hasOwnProperty(testProperty) || testObject[testProperty] == 'undefined' || testObject[testProperty] == null)
                return false;
            return true;
        };
        OE_AddLayerToLayerListViewModel.prototype.RequestSearchSources = function (urlToLoad) {
            var thisRef = this;
            this.ShowLoader("Loading sources...", true, true, false, false, false);
            //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
            var siteURL = urlToLoad;
            urlToLoad += "/map/mapservices?f=json";
            var aSettings = {
                url: urlToLoad,
                dataType: "jsonp",
                success: function (data) {
                    var workingService;
                    var tmpCollection;
                    var parentIdMap = {};
                    var sortIndentObject;
                    for (var i = 0; i < data.mapServices.length; i++) {
                        workingService = data.mapServices[i];
                        //no layers
                        if (!thisRef.IsDefined(workingService, "layers") || workingService.layers.length < 1)
                            continue;
                        workingService["tipURL"] = thisRef.CleanURL(workingService.connectionString);
                        workingService["oeServiceVisible"] = new observables_1.Observable(true);
                        workingService["oeTreeVisible"] = new observables_1.Observable(true);
                        workingService["oeTreeExpand"] = new observables_1.Observable(false);
                        workingService["oeTreeCollapse"] = new observables_1.Observable(true);
                        workingService["oeResultCountString"] = new observables_1.Observable("0");
                        workingService["oeResultCount"] = 0;
                        workingService["removeCustomServiceVisible"] = new observables_1.Observable(false);
                        workingService["oeCanRemove"] = false;
                        //layers need custom properties here
                        for (var lyr = 0; lyr < workingService.layers.length; lyr++) {
                            //setup a map for sorting by group name and then layer name
                            if (workingService.layers[lyr]["subLayerIds"].length > 0 &&
                                !thisRef.IsDefined(parentIdMap, workingService.layers[lyr]["id"])) {
                                parentIdMap["k" + workingService.layers[lyr]["id"]] = workingService.layers[lyr];
                            }
                            workingService.layers[lyr]["siteURL"] = siteURL;
                            workingService.layers[lyr]["mapServiceConnectionString"] = workingService.connectionString;
                            workingService.layers[lyr]["mapServiceID"] = workingService.id;
                            workingService.layers[lyr]["layerCheckbox"] = new observables_1.Observable(false);
                            workingService.layers[lyr]["oeLayerVisible"] = new observables_1.Observable(true);
                            workingService.layers[lyr]["nameAlt"] = thisRef.CleanURL(workingService.connectionString);
                            //sort by displayName by default
                            workingService.layers[lyr]["nameGroupSort"] = workingService.layers[lyr]["displayName"];
                            //layer group?
                            workingService.layers[lyr]["oeSearchLayerGroup"] = new observables_1.Observable("layer-item-name");
                            if (workingService.layers[lyr].type.toLowerCase() == "grouplayer") {
                                workingService.layers[lyr]["oeSearchLayerGroup"].set("layer-item-name oeLayerSearchLayerGroup");
                            }
                        }
                        for (var lyr = 0; lyr < workingService.layers.length; lyr++) {
                            workingService.layers[lyr]["oeIndentLevel"] = new observables_1.Observable("");
                            sortIndentObject = thisRef.IndentLevel(parentIdMap, workingService.layers[lyr]);
                            workingService.layers[lyr]["nameGroupSort"] = sortIndentObject.sort;
                            if (sortIndentObject.indent != "") {
                                workingService.layers[lyr]["oeIndentLevel"].set("padding-left:" + sortIndentObject.indent + "px");
                            }
                        }
                        //layers needs to be an observable collection
                        tmpCollection = new observables_2.ObservableCollection();
                        workingService.layers.sort(function (a, b) {
                            if (a.nameGroupSort < b.nameGroupSort)
                                return -1;
                            if (a.nameGroupSort > b.nameGroupSort)
                                return 1;
                            return 0;
                        });
                        tmpCollection.addItems(workingService.layers);
                        workingService.layers = tmpCollection;
                        thisRef.resultsArrayForSort.push(workingService);
                    }
                    thisRef.RemoteServiceLoadedCheck(false);
                }
            };
            $.ajax(aSettings)
                .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Sources request failed.");
                thisRef.RemoteServiceLoadedCheck(true);
            });
        };
        OE_AddLayerToLayerListViewModel.prototype.IndentLevel = function (parentIdMap, workingLayer) {
            var indentOut = 0;
            var workingParentID = workingLayer.parentLayerId;
            var workingKey;
            var outProp = { "sort": workingLayer.displayName, "indent": "" };
            while (workingParentID != null) {
                //indent now
                indentOut++;
                //get the next parent
                workingKey = "k" + workingParentID;
                //parent in map?
                if (!this.IsDefined(parentIdMap, workingKey)) {
                    break;
                }
                //update sort string
                outProp.sort = parentIdMap[workingKey].displayName + outProp.sort;
                //does the parent have a parent id?
                if (!this.IsDefined(parentIdMap[workingKey], "parentLayerId")) {
                    break;
                }
                //possible next parent
                workingParentID = parentIdMap[workingKey].parentLayerId;
            }
            if (indentOut > 0) {
                outProp.indent = (indentOut * 24).toString();
            }
            return outProp;
        };
        OE_AddLayerToLayerListViewModel.prototype.RemoveService = function (workingService) {
            var target = -1;
            for (var i = 0; i < this.resultsObject.getLength(); i++) {
                var record = this.resultsObject.getAt(i);
                if (record.connectionString == workingService.connectionString && record.oeCanRemove) {
                    target = i;
                    break;
                }
            }
            if (target > -1) {
                this.resultsObject.removeAt(target);
            }
            this.OESearchLayers(true, false);
        };
        OE_AddLayerToLayerListViewModel.prototype.ShowDirectServiceURL = function () {
            this.oeSearchLayerOptionsVisible.set(false);
            var thisRef = this;
            //load map service
            var workingURL = this.searchFieldText.get();
            this.searchFieldText.set("");
            var urlArray = workingURL.split("/");
            var workingServiceURL;
            var workingLayerID = null;
            //url has a layer id on the end
            if (urlArray[urlArray.length - 1].toLowerCase().indexOf("server") < 0) {
                workingLayerID = urlArray[urlArray.length - 1];
                workingServiceURL = "";
                for (var i = 0; i < urlArray.length - 1; i++) {
                    workingServiceURL += urlArray[i] + "/";
                }
            }
            else {
                workingServiceURL = workingURL;
            }
            console.log("Working url: " + workingServiceURL);
            //load the service information
            var urlToLoad = workingServiceURL + "?f=json";
            var aSettings = {
                url: urlToLoad,
                dataType: "jsonp",
                success: function (data) {
                    var workingService;
                    var tmpCollection;
                    var parentIdMap = {};
                    var sortIndentObject;
                    workingService = {};
                    if (!thisRef.IsDefined(data, "documentInfo"))
                        workingService["displayName"] = workingServiceURL;
                    else if (data.documentInfo.Title != "")
                        workingService["displayName"] = data.documentInfo.Title;
                    else if (data.documentInfo.Subject != "")
                        workingService["displayName"] = data.documentInfo.Subject;
                    else
                        workingService["displayName"] = workingServiceURL;
                    workingService["tipURL"] = workingServiceURL;
                    workingService["connectionString"] = workingServiceURL;
                    workingService["oeServiceVisible"] = new observables_1.Observable(true);
                    workingService["oeTreeVisible"] = new observables_1.Observable(true);
                    workingService["oeTreeExpand"] = new observables_1.Observable(false);
                    workingService["oeTreeCollapse"] = new observables_1.Observable(true);
                    workingService["oeResultCountString"] = new observables_1.Observable("0");
                    workingService["oeResultCount"] = 0;
                    workingService["removeCustomServiceVisible"] = new observables_1.Observable(true);
                    workingService["oeCanRemove"] = true;
                    if (workingLayerID != null) {
                        //only add one layer
                        workingService["layers"] = [];
                        for (var i = 0; i < data.layers.length; i++) {
                            if (workingLayerID == data.layers[i].id) {
                                workingService["layers"].push(data.layers[i]);
                            }
                            else if (data.layers[i].subLayerIds != null && data.layers[i].subLayerIds.indexOf(Number(workingLayerID)) > -1) {
                                workingService["layers"].push(data.layers[i]);
                            }
                        }
                    }
                    else {
                        //all layers
                        workingService["layers"] = data.layers;
                    }
                    for (var i = 0; i < workingService.layers.length; i++) {
                        if (workingService.layers[i].parentLayerId == -1)
                            workingService.layers[i].parentLayerId = null;
                        workingService.layers[i]["name"] = workingService.layers[i].name;
                        workingService.layers[i]["displayName"] = workingService.layers[i].name;
                        //setup a map for sorting by group name and then layer name
                        if (workingService.layers[i]["subLayerIds"] != null &&
                            !thisRef.IsDefined(parentIdMap, workingService.layers[i]["id"])) {
                            parentIdMap["k" + workingService.layers[i]["id"]] = workingService.layers[i];
                        }
                        workingService.layers[i]["mapServiceConnectionString"] = "url=" + workingServiceURL;
                        workingService.layers[i]["mapServiceID"] = null;
                        workingService.layers[i]["layerCheckbox"] = new observables_1.Observable(false);
                        workingService.layers[i]["oeLayerVisible"] = new observables_1.Observable(true);
                        workingService.layers[i]["nameAlt"] = workingServiceURL;
                        //sort by displayName by default
                        workingService.layers[i]["nameGroupSort"] = workingService.layers[i].name;
                        //layer group?
                        workingService.layers[i]["oeSearchLayerGroup"] = new observables_1.Observable("layer-item-name");
                        if (workingService.layers[i]["subLayerIds"] != null) {
                            workingService.layers[i]["oeSearchLayerGroup"].set("layer-item-name oeLayerSearchLayerGroup");
                        }
                    }
                    for (var i = 0; i < workingService.layers.length; i++) {
                        workingService.layers[i]["oeIndentLevel"] = new observables_1.Observable("");
                        sortIndentObject = thisRef.IndentLevel(parentIdMap, workingService.layers[i]);
                        workingService.layers[i]["nameGroupSort"] = sortIndentObject.sort;
                        if (sortIndentObject.indent != "") {
                            workingService.layers[i]["oeIndentLevel"].set("padding-left:" + sortIndentObject.indent + "px");
                        }
                    }
                    //layers needs to be an observable collection
                    tmpCollection = new observables_2.ObservableCollection();
                    workingService.layers.sort(function (a, b) {
                        if (a.nameGroupSort < b.nameGroupSort)
                            return -1;
                        if (a.nameGroupSort > b.nameGroupSort)
                            return 1;
                        return 0;
                    });
                    tmpCollection.addItems(workingService.layers);
                    workingService.layers = tmpCollection;
                    //thisRef.resultsArrayForSort.push(workingService);                
                    //thisRef.RemoteServiceLoadedCheck(false);
                    //thisRef.SourcesDone();
                    //insert service to list
                    thisRef.resultsObject.insertItem(0, workingService);
                    thisRef.HideLoader();
                    thisRef.OESearchLayers(true, false);
                }
            };
            $.ajax(aSettings)
                .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Sources request failed.");
                thisRef.HideLoader();
                //thisRef.RemoteServiceLoadedCheck(true);
            });
        };
        OE_AddLayerToLayerListViewModel.prototype.ClearLayerCheckboxes = function () {
            for (var i = 0; i < this.resultsObject.length(); i++) {
                if (!this.IsDefined(this.resultsObject.getAt(i), "layers"))
                    continue;
                for (var lptr = 0; lptr < this.resultsObject.getAt(i).layers.length(); lptr++) {
                    if (!this.IsDefined(this.resultsObject.getAt(i).layers.getAt(lptr), "layerCheckbox"))
                        continue;
                    this.resultsObject.getAt(i).layers.getAt(lptr).layerCheckbox.set(false);
                }
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.ExpandAllTrees = function (val) {
            this.oeSearchLayerOptionsVisible.set(false);
            for (var i = 0; i < this.resultsObject.length(); i++) {
                this.resultsObject.getAt(i).oeTreeVisible.set(val);
                if (val) {
                    this.resultsObject.getAt(i).oeTreeExpand.set(false);
                    this.resultsObject.getAt(i).oeTreeCollapse.set(true);
                }
                else {
                    this.resultsObject.getAt(i).oeTreeExpand.set(true);
                    this.resultsObject.getAt(i).oeTreeCollapse.set(false);
                }
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.OESearchLayers = function (showAllFilter, onlySelected) {
            this.oeSearchLayerOptionsVisible.set(false);
            if (!onlySelected) {
                this.toggleSelectedValue.set(false);
                this.toggleSelectedText.set("Show Selected");
            }
            if (this.resultsObject.length() < 1) {
                this.ShowLoader("Error: No layers to search.", true, false, false, true, true);
                return;
            }
            this.ShowLoader("Searching...", true, true, false, false, false);
            var searchText = this.searchFieldText.get().toLowerCase();
            var foundItem = showAllFilter;
            var foundCount = 0;
            var childCount = 0;
            var showLayersForServiceHit = false;
            var serviceLayerKey;
            this.parentServiceLayerIDShown = [];
            //services
            for (var i = 0; i < this.resultsObject.length(); i++) {
                if (!this.IsDefined(this.resultsObject.getAt(i), "layers"))
                    continue;
                this.resultsObject.getAt(i).oeServiceVisible.set(showAllFilter);
                showLayersForServiceHit = false;
                //service name, show all layer?
                if (this.resultsObject.getAt(i).displayName.toLowerCase().indexOf(searchText) > -1) {
                    showLayersForServiceHit = true;
                }
                this.resultsObject.getAt(i).oeResultCount = 0;
                //layers
                for (var lptr = 0; lptr < this.resultsObject.getAt(i).layers.length(); lptr++) {
                    serviceLayerKey = i + this.resultsObject.getAt(i).layers.getAt(lptr).id;
                    //layer already handled, skip
                    if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1)
                        continue;
                    if (showAllFilter) {
                        this.resultsObject.getAt(i).layers.getAt(lptr).oeLayerVisible.set(showAllFilter);
                        foundCount++;
                    }
                    else {
                        if (onlySelected) {
                            //layer is selected
                            if (this.resultsObject.getAt(i).layers.getAt(lptr).layerCheckbox.get()) {
                                //show service tree if a layer is on
                                this.resultsObject.getAt(i).oeServiceVisible.set(true);
                                //show layer
                                this.resultsObject.getAt(i).layers.getAt(lptr).oeLayerVisible.set(true);
                                this.parentServiceLayerIDShown.push(serviceLayerKey);
                                foundItem = true;
                                foundCount++;
                                //if this is a group layer show children
                                if (this.resultsObject.getAt(i).layers.getAt(lptr).subLayerIds.length > 0) {
                                    childCount = this.ShowImmediateChildren(i, this.resultsObject.getAt(i).layers.getAt(lptr).subLayerIds);
                                    foundCount += childCount;
                                }
                                //enable all parents
                                if (this.resultsObject.getAt(i).layers.getAt(lptr).parentLayerId != null) {
                                    this.ShowParents(i, this.resultsObject.getAt(i).layers.getAt(lptr).parentLayerId);
                                }
                            }
                            else if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1) {
                                //layer is already toggled on, do nothing
                                console.log("do nothing");
                            }
                            else {
                                //hide layer
                                this.resultsObject.getAt(i).layers.getAt(lptr).oeLayerVisible.set(false);
                            }
                        }
                        else {
                            if (showLayersForServiceHit || this.resultsObject.getAt(i).layers.getAt(lptr).name.toLowerCase().indexOf(searchText) > -1 ||
                                this.resultsObject.getAt(i).layers.getAt(lptr).displayName.toLowerCase().indexOf(searchText) > -1) {
                                foundItem = true;
                                foundCount++;
                                if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) < 0)
                                    this.resultsObject.getAt(i).oeResultCount++;
                                this.resultsObject.getAt(i).oeServiceVisible.set(true);
                                this.resultsObject.getAt(i).layers.getAt(lptr).oeLayerVisible.set(true);
                                this.parentServiceLayerIDShown.push(serviceLayerKey);
                                childCount = 0;
                                //if this is a group layer show children
                                if (this.resultsObject.getAt(i).layers.getAt(lptr).subLayerIds != null && this.resultsObject.getAt(i).layers.getAt(lptr).subLayerIds.length > 0) {
                                    childCount = this.ShowImmediateChildren(i, this.resultsObject.getAt(i).layers.getAt(lptr).subLayerIds);
                                    foundCount += childCount;
                                }
                                this.resultsObject.getAt(i).oeResultCount += childCount;
                                //enable all parents
                                if (this.resultsObject.getAt(i).layers.getAt(lptr).parentLayerId != null) {
                                    this.ShowParents(i, this.resultsObject.getAt(i).layers.getAt(lptr).parentLayerId);
                                }
                            }
                            else if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1) {
                                //layer is already toggled on, do nothing
                                console.log("do nothing");
                            }
                            else {
                                this.resultsObject.getAt(i).layers.getAt(lptr).oeLayerVisible.set(false);
                            }
                        }
                    }
                }
                //end layers
                if (showAllFilter || onlySelected)
                    this.resultsObject.getAt(i).oeResultCountString.set("");
                else
                    this.resultsObject.getAt(i).oeResultCountString.set("(" + this.resultsObject.getAt(i).oeResultCount.toString() + ")");
            }
            //end services
            this.noResultsVisible.set(false);
            this.textSelectedLayersVisible.set(false);
            this.currentFilteredCount.set(foundCount.toString());
            this.HideLoader();
            if (onlySelected && foundItem) {
                //this.HideLoader();
            }
            else if (onlySelected && !foundItem) {
                this.textSelectedLayersVisible.set(true);
                //this.HideLoader();            
            }
            else if (foundItem) {
                //this.HideLoader();            
            }
            else {
                //this.ShowLoader("No results for: " + this.searchFieldText.get(), true, false, true, false, true);            
                this.noResultsVisible.set(true);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.ShowParents = function (serviceIndex, parentID) {
            var valOut = 0;
            var continueLoop = true;
            while (continueLoop) {
                continueLoop = false;
                for (var i = 0; i < this.resultsObject.getAt(serviceIndex).layers.getLength(); i++) {
                    if (parentID == this.resultsObject.getAt(serviceIndex).layers.getAt(i).id) {
                        this.resultsObject.getAt(serviceIndex).layers.getAt(i).oeLayerVisible.set(true);
                        this.parentServiceLayerIDShown.push(serviceIndex + this.resultsObject.getAt(serviceIndex).layers.getAt(i).id);
                        parentID = this.resultsObject.getAt(serviceIndex).layers.getAt(i).parentLayerId;
                        continueLoop = true;
                    }
                }
            }
            return valOut;
        };
        OE_AddLayerToLayerListViewModel.prototype.ShowImmediateChildren = function (serviceIndex, subLayersArray) {
            var valOut = 0;
            //let serviceIndex: number;
            for (var i = 0; i < subLayersArray.length; i++) {
                for (var j = 0; j < this.resultsObject.getAt(serviceIndex).layers.getLength(); j++) {
                    if (this.parentServiceLayerIDShown.indexOf(serviceIndex + subLayersArray[i]) > -1)
                        continue;
                    if (subLayersArray[i] == this.resultsObject.getAt(serviceIndex).layers.getAt(j).id) {
                        this.resultsObject.getAt(serviceIndex).layers.getAt(j).oeLayerVisible.set(true);
                        this.parentServiceLayerIDShown.push(serviceIndex + subLayersArray[i]);
                        valOut++;
                    }
                }
            }
            return valOut;
        };
        OE_AddLayerToLayerListViewModel.prototype.ResolveLayerTest = function () {
            var customLayer = {};
            //customLayer.mapServiceConnectionString = "https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer";
            //customLayer.mapServiceConnectionString = "https://chetco-new.dsl.state.or.us/arcgis/rest/services/Maps/ESH_State_15/MapServer";
            customLayer.mapServiceConnectionString = "https://gis.dogami.oregon.gov/arcgis/rest/services/secured/StatewideEQ_gen2/MapServer?tokenUrl=https://gis.dogami.oregon.gov/arcgis/tokens/generateToken&layerMask=Active Faults";
            customLayer.mapServiceID = null;
            customLayer.description = "This is a custom description.";
            customLayer.displayName = "Custom Layer A";
            customLayer.id = "0";
            //layerMask=Active Faults;tokenUrl=https://gis.dogami.oregon.gov/arcgis/tokens/generateToken
            //this.OEAddMapServiceFromGecortexLayer(customLayer);
            this.CheckToken(customLayer);
        };
        OE_AddLayerToLayerListViewModel.prototype.CheckToken = function (gcxLayer) {
            if (gcxLayer.mapServiceConnectionString.indexOf(";token=") > -1) {
                this.LoadGCXSiteForSecureRequest(gcxLayer);
                //this.OEAddMapServiceFromGecortexLayer(gcxLayer);
            }
            else {
                this.OEAddMapServiceFromGecortexLayer(gcxLayer);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.OEAddMapServiceFromGecortexLayer = function (gcxLayer) {
            //MapUtilities
            //createMapServiceFromJson
            var thisRef = this;
            //let url: string = this.CleanURL(gcxLayer.mapServiceConnectionString);//"https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/restoration/OITT/MapServer";
            var url = ServiceHelper_1.ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
            url = this.CleanURL(url);
            var TMPItem = /** @class */ (function () {
                function TMPItem() {
                }
                return TMPItem;
            }());
            var rItem = new TMPItem();
            rItem.connection = { id: null }; //{ id: (gcxLayer.mapServiceID != null) ? gcxLayer.mapServiceID.toString() : null }
            rItem.description = gcxLayer.description;
            rItem.discoveryProviderName = "ArcGisServerDiscoveryProvider";
            rItem.displayName = gcxLayer.displayName;
            rItem.serviceProviderName = "Geocortex.Gis.Services.ArcGisServer.Rest";
            rItem.serviceType = ["None", "FeatureLayer", "ServiceLayer", "MapService"];
            var tokenUrl = this.GetURLPart(gcxLayer.mapServiceConnectionString, "tokenUrl");
            var layerMask = this.GetURLPart(gcxLayer.mapServiceConnectionString, "layerMask");
            var tokenVal = this.GetURLPart(gcxLayer.mapServiceConnectionString, "token");
            rItem["serviceToken"] = tokenVal;
            //rItem["connectionString"] = gcxLayer.mapServiceConnectionString;
            //rItem.url = url + "/" + gcxLayer.id + "?token=" + tokenVal;
            url = url + "/" + gcxLayer.id;
            if (tokenVal != "")
                url = RestHelperHTTPService_1.RestHelperHTTPService.appendTokenToUrl(url, tokenVal);
            rItem.url = url;
            console.log("Realize Map Service: " + rItem.displayName);
            console.log("Realize Map Service: " + rItem.url);
            //RestHelperHTTPService.setDefaultToken(urlToken, url);        
            //RestHelperHTTPService.
            //RestHelperHTTPService.setDefaultToken
            //RestHelperHTTPService.setDefaultToken()
            /*if (RestHelperHTTPService.urlHasToken(rItem.url)) {
                console.log("Url has token");
            }*/
            this.AddServiceItem(rItem);
        };
        /*CreateMapService(gcxLayer: any) {
            //try map service method
    
            let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
            url = this.CleanURL(url);
    
            //class TMPClass implements ResultItem { }
    
            //MapServiceInfo
    
            let workingService: MapService = new MapService(url);
            
            workingService.serviceToken = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'token');
            workingService.drawingBehavior = "MapService";
    
            //let layerOptions = { "id": gcxLayer.id, "opacity": 1, "showAttribution": false };
            //let dLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, layerOptions);
            //dLayer.setVisibleLayers([layerName]);
            //dLayer.setVisibleLayers([7]);
    
            //workingService.serviceLayer = dLayer;
            workingService.mapServiceType = MapServiceType.DYNAMIC;
            workingService.isUserCreated = true;
            workingService.userLayerType = "LayerAddition";
            workingService.includeInLayerList = true;
            //workingService.essentialsMap = this.app.site.essentialsMap;
            workingService.displayName = gcxLayer.name;
            //newMapService.disableClientCaching = true;
            workingService.mapServiceFunction = MapServiceFunction.OPERATIONAL;
            workingService.opacity = 1;
    
            //workingService._configureObject()
        }*/
        OE_AddLayerToLayerListViewModel.prototype.AddServiceItem = function (serviceItem) {
            var thisRef = this;
            thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Requesting service: ' + serviceItem.displayName, null, null, serviceItem.url, 10000, true));
            Promise.resolve(this.ssdp.realizeMapService(serviceItem, this.app.map.spatialReference.wkid.toString()))
                .then(function (e) {
                thisRef.app.commandRegistry.command("RemoveStatus").execute(e.serviceLayer.url);
                thisRef.app.command("AddMapService").execute(e);
                console.log("Adding Map Service: " + e.displayName);
                console.log("Adding Map Service: " + e.serviceLayer.url);
            }).catch(function (e) {
                thisRef.app.commandRegistry.command("RemoveStatus").execute(serviceItem.url);
                thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Service unavailable: ' + serviceItem.displayName, { uri: "Resources/Images/Custom/warning.png", altText: "", class: "" }, null, null, 0, false));
                console.log("RealizeMapService catch: " + e);
                console.log("RealizeMapService catch: " + e.message);
                console.log("RealizeMapService catch: " + e.status);
            }).error(function (e) {
                thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Service unavailable (e): ' + serviceItem.displayName, { uri: "Resources/Images/Custom/warning.png", altText: "", class: "" }, null, null, 0, false));
                console.log("RealizeMapService Error: " + e);
            });
        };
        OE_AddLayerToLayerListViewModel.prototype.LoadGCXSiteForSecureRequest = function (gcxLayer) {
            var thisRef = this;
            if (!this.IsDefined(this.remoteGCXSites, gcxLayer.siteURL)) {
                var map = new esri.Map("oeLayerSearchJunkMap");
                var essentialsSite = new Site_1.Site(gcxLayer.siteURL, map);
                essentialsSite.onInitialized = function (args) {
                    thisRef.remoteGCXSites[gcxLayer.siteURL] = args;
                    console.log("Site ready");
                    console.log(args);
                    //let url: string = thisRef.CleanURL(gcxLayer.mapServiceConnectionString);
                    var url = ServiceHelper_1.ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
                    url = thisRef.CleanURL(url);
                    //url += "/" + gcxLayer.id;
                    args.essentialsMap.mapServices.forEach(function (s1) {
                        if (s1.serviceUrl == url) {
                            if (s1.layers != null) {
                                s1.layers.forEach(function (l1) {
                                    if (gcxLayer.id == l1.id) {
                                        //add layer directly without reslove?
                                        //thisRef.OEAddMapServiceFromGecortexLayer(gcxLayer);
                                        //thisRef.AddServiceItem(s1);
                                        thisRef.app.command("AddMapService").execute(s1);
                                        return;
                                    }
                                });
                            }
                        }
                    });
                    /*this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, (sender: RestLayerList) => {
                        // look for tables
                        this.layerList = sender;
                        if (this.app.site.principal.isAuthenticated) {
                            this._getDevSubTypes();
                        }
                    });*/
                };
                essentialsSite.onInitializationFailed = function (args) {
                    console.log("Site failed");
                    console.log(args);
                };
                this.remoteGCXSites[this.remoteServiceURLs[this.remoteServiceURLcurrent]] = essentialsSite;
                this.remoteGCXSites[this.remoteServiceURLs[this.remoteServiceURLcurrent]].initialize();
            }
            else {
                //site already loaded, try adding layer
                this.OEAddMapServiceFromGecortexLayer(gcxLayer);
            }
        };
        OE_AddLayerToLayerListViewModel.prototype.OESearchPortalLayers = function () {
            //?q=wildfire+%2B+%22map+service%22&bbox=&sortField=&sortOrder=
            this.resultsObject.clear();
            var thisRef = this;
            var recordsToProcess = 0;
            var workingTitle = "";
            var workingURL = "";
            var workingMapService;
            var workingLayer;
            var usedURLs = [];
            this.portalServices = [];
            var urlToLoad = "https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search";
            var aSettings = {
                url: urlToLoad,
                type: "GET",
                dataType: "jsonp",
                data: { "q": this.searchFieldText.get(), "start": 1, "num": 100, f: "json" },
                success: function (data) {
                    if (data.results.length < 1) {
                        console.log("No hits for search term.");
                    }
                    else {
                        console.log("Results: " + data.results.length);
                        recordsToProcess = data.results.length;
                        for (var i = 0; i < data.results.length; i++) {
                            //check each result for a map service and load the layers from that service                                                            
                            if (data.results[i].type == "Map Service" && data.results[i].url.length > 0) {
                                console.log("Title: " + data.results[i].title);
                                console.log("Map service url: " + data.results[i].url);
                                workingTitle = data.results[i].title;
                                workingURL = data.results[i].url;
                                //usedURLs.push(workingURL);
                                thisRef.ssdp.findServices(workingURL).then(function (e) {
                                    console.log("Find Service");
                                    console.log(workingURL);
                                    console.log(e);
                                });
                                /*workingMapService = new MapService(workingURL +"?f=json");
                                workingMapService.onInitialized = function (args) {
                                    console.log("service up!");
    
                                    console.log(workingURL);
                                    console.log(args);
                                };
                                workingMapService.onInitializationFailed = function (args) {
                                    console.log("service failed!");
                                    console.log(workingURL);
                                    console.log(args);
                                }
                                workingMapService.initialize();*/
                                recordsToProcess--;
                                thisRef.IsSearchDone(recordsToProcess);
                                /*$.get(workingURL + "?f=json", null, null, "json")
                                    .done(function (serviceUrlResult) {
    
                                        console.log(serviceUrlResult);
                                                                            
                                        //only add layers with no subLayerIds
                                        for (var layerIndex = 0; layerIndex < serviceUrlResult.layers.length; layerIndex++) {
    
                                            if (serviceUrlResult.layers[layerIndex].subLayerIds == null &&
                                                serviceUrlResult.layers[layerIndex].name.toLowerCase().indexOf(thisRef.searchFieldText.get().toString().toLowerCase()) > -1) {
                                                
                                                serviceUrlResult.layers[layerIndex].serviceTitle = workingTitle;
                                                serviceUrlResult.layers[layerIndex].serviceURL = workingURL;
                                                serviceUrlResult.layers[layerIndex].nameLong = serviceUrlResult.layers[layerIndex].name + " (" + workingURL + ")";
                                                serviceUrlResult.layers[layerIndex].displayName = serviceUrlResult.layers[layerIndex].name;
    
                                                //thisRef.portalLayers.push(serviceUrlResult.layers[layerIndex]);
                                            }
                                        }
    
                                        serviceUrlResult.layers.sort((a: any, b: any) => {
                                            if (a.name < b.name) return -1;
                                            if (a.name > b.name) return 1;
                                            return 0;
                                        });
    
                                        thisRef.portalServices.push(serviceUrlResult);
    
                                        //thisRef.resultsObject.addItem(workingResultAndLayers);
                                        recordsToProcess--;
                                        thisRef.IsSearchDone(recordsToProcess);
                                    })
                                    .fail(function (xhr, ajaxOptions, thrownError) {
                                        recordsToProcess--;
                                        console.log("Failed to load map service layers: " + data.results[i].url);
                                        thisRef.IsSearchDone(recordsToProcess);
                                    });*/
                            }
                            else {
                                recordsToProcess--;
                                thisRef.IsSearchDone(recordsToProcess);
                            }
                        }
                    }
                }
            };
            $.ajax(aSettings)
                .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Portal sources request failed.");
                thisRef.RemoteServiceLoadedCheck(true);
            });
            /*$.get("https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search", { "q": this.searchFieldText.get(), "start":1,"num":100, "f": "json" }, null, "json")
                .done(function (result) {
    
                    if (result.num < 1) {
                        console.log("No hits for search term.");
                    }
                    else {
    
                        console.log("Results: " + result.results.length);
                        recordsToProcess = result.results.length;
                         
                        for (var i = 0; i < result.results.length; i++) {
    
                            //check each result for a map service and load the layers from that service
                            if (usedURLs.indexOf(result.results[i].url)<0 && result.results[i].type == "Map Service" && result.results[i].url.length > 0) {
    
                                console.log("Title: " + result.results[i].title);
                                console.log("Map service url: " + result.results[i].url);
                                workingTitle = result.results[i].title;
                                workingURL = result.results[i].url;
                                usedURLs.push(workingURL);
                                //let workingLayers: any = { "title": result.results[i].title, "layers": [] };
    
                                $.get(result.results[i].url + "?f=json", null, null, "json")
                                    .done(function (serviceUrlResult) {
    
                                        console.log(serviceUrlResult);
    
                                        //only add layers with no subLayerIds
                                        for (var layerIndex = 0; layerIndex < serviceUrlResult.layers.length; layerIndex++) {
                                            
                                            if (serviceUrlResult.layers[layerIndex].subLayerIds == null &&
                                                serviceUrlResult.layers[layerIndex].name.toLowerCase().indexOf(thisRef.searchFieldText.get().toString().toLowerCase()) > -1) {
                                                //workingResultAndLayers.layers.push(serviceUrlResult.layers[layerIndex]);
                                                serviceUrlResult.layers[layerIndex].serviceTitle = workingTitle;
                                                serviceUrlResult.layers[layerIndex].serviceURL = workingURL;
                                                serviceUrlResult.layers[layerIndex].nameLong = serviceUrlResult.layers[layerIndex].name + " (" +workingURL+")";
                                                //thisRef.resultsObject.addItem(serviceUrlResult.layers[layerIndex]);
                                                thisRef.portalLayers.push(serviceUrlResult.layers[layerIndex]);
                                            }
                                        }
                                                                            
                                        //thisRef.resultsObject.addItem(workingResultAndLayers);
                                        recordsToProcess--;
                                        thisRef.IsSearchDone(recordsToProcess);
                                    })
                                    .fail(function (xhr, ajaxOptions, thrownError) {
                                        recordsToProcess--;
                                        console.log("Failed to load map service layers: " + result.results[i].url);
                                        thisRef.IsSearchDone(recordsToProcess);
                                    });
                            }
                            else {
                                recordsToProcess--;
                                thisRef.IsSearchDone(recordsToProcess);
                            }
                        }
                    }
                })
                .fail(function (xhr, ajaxOptions, thrownError) {
                    console.log("Portal Search Failed.");
                });*/
        };
        OE_AddLayerToLayerListViewModel.prototype.IsSearchDone = function (recordsToProcess) {
            console.log("Records to process: " + recordsToProcess);
            if (recordsToProcess > 0)
                return;
            /*this.portalLayers.sort((a: any, b: any) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });*/
            console.log("Results: " + this.portalServices.length);
            console.log("Results: " + this.portalServices);
            //this.resultsObject.addItems(this.portalLayers);   
            //console.log("Results Object Count: " + this.resultsObject.length());
            //console.log("Results Object: " + this.resultsObject);
        };
        return OE_AddLayerToLayerListViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_AddLayerToLayerListViewModel = OE_AddLayerToLayerListViewModel;
});

},
"url:/geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_AddLayerToLayerList/CSS/OE_AddLayerToLayerListModule.css", "css", "Lm9lTGF5ZXJTZWFyY2gtbW9kdWxlLXZpZXcgew0KICAgIHBvc2l0aW9uOiBpbmhlcml0Ow0KICAgIHotaW5kZXg6IDEwMDsNCiAgICAvKndpZHRoOiA5MDBweDsNCiAgICBwYWRkaW5nOiA2cHg7DQogICAgbWFyZ2luLXRvcDogMTJweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCiAgICBtaW4taGVpZ2h0OiA1NzBweDsNCiAgICBmb250OiAxMnB4IE15cmlhZCxIZWx2ZXRpY2EsVGFob21hLEFyaWFsLGNsZWFuLHNhbnMtc2VyaWY7DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIHJpZ2h0OiAwOyovDQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIGJvcmRlcjogbm9uZTsNCn0NCg0KLm9lTGF5ZXJTZWFyY2hMb2FkaW5nIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAzZW07DQogICAgbGVmdDogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgLypwYWRkaW5nLXRvcDogNTBweDsqLw0KICAgIHotaW5kZXg6IDEwMDA7DQp9DQoNCi5vZUxheWVyU2VhcmNoTG9hZGluZyBidXR0b24gew0KICAgIG1hcmdpbi10b3A6IDEycHg7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzFBNzJDNDsNCiAgICBib3JkZXItcmFkaXVzOiA1cHg7DQogICAgY29sb3I6ICMxQTcyQzQ7DQogICAgcGFkZGluZzogOHB4Ow0KfQ0KDQoub2VMYXllclNlYXJjaFdhcm5pbmdNZXNzYWdlIHsNCiAgICBwYWRkaW5nLXRvcDogMTBweDsNCiAgICBmb250LXNpemU6IDEuNGVtOw0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KfQ0KDQoub2VMYXllclNlYXJjaEVycm9ySW5wdXQgew0KICAgIHBhZGRpbmctdG9wOiAxMnB4Ow0KfQ0KDQoub2VMYXllclNlYXJjaEVycm9ySW5wdXQgZGl2IHsNCiAgICBmb250LXNpemU6IDEuMmVtOw0KICAgIHBhZGRpbmctYm90dG9tOiAxNnB4Ow0KfQ0KDQoub2VfYWRkX2xheWVyX3dyYXBwZXINCnsNCiAgICBoZWlnaHQ6NDhweDsNCn0NCg0KLm9lTGF5ZXJTZWFyY2hUb2dnbGVUcmVlcyB7DQogICAgcGFkZGluZzogOHB4IDBweDsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQoNCi5vZUxheWVyU2VhcmNoVG9nZ2xlVHJlZXMgZGl2IHsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgd2lkdGg6IDIyJTsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQoNCi5vZVNlYXJjaExheWVyT3B0aW9ucyB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIHJpZ2h0OiAwcHg7ICAgICAgICANCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsNCiAgICBwYWRkaW5nOjRweDsNCiAgICB3aWR0aDoxNTBweDsNCiAgICB6LWluZGV4OiAyOw0KfQ0KDQoub2UtbGMtZW50cmllcyB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHRvcDogN2VtOw0KICAgIHJpZ2h0OiAwOw0KICAgIGJvdHRvbTogNGVtOw0KICAgIGxlZnQ6IDA7DQogICAgb3ZlcmZsb3cteTogYXV0bzsNCn0NCg0KLm9lTGF5ZXJTZWFyY2hUb2dnbGVUcmVlcyBocg0Kew0KICAgIHdpZHRoOiA5OCU7DQogICAgaGVpZ2h0OiAxcHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2NlY2RjZDsNCiAgICBib3JkZXI6IG5vbmU7DQp9DQoNCmRpdi5vZUhhc1BhcmVudExheWVyDQp7DQogICAgcGFkZGluZy1sZWZ0OjI0cHg7DQp9DQoNCi5vZUxheWVyU2VhcmNoQWJvdmVUcmVlTWVzc2FnZQ0Kew0KICAgIHBhZGRpbmctbGVmdDoxMnB4Ow0KfQ0KDQoub2VMYXllclNlYXJjaC1tb2R1bGUtdmlldyAubGF5ZXItaXRlbSBpbWcgew0KICAgIGhlaWdodDogMTZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wOw0KICAgIHBhZGRpbmctcmlnaHQ6IDhweDsNCn0NCg0Kc3Bhbi5vZUxheWVyU2VhcmNoTGF5ZXJHcm91cCB7DQogICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFJlc291cmNlcy9JbWFnZXMvSWNvbnMvVG9vbGJhci9sYXllcnMtMjQucG5nKTsNCiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0Ow0KICAgIGJhY2tncm91bmQtc2l6ZTogMTZweDsNCiAgICBwYWRkaW5nLWxlZnQ6IDI0cHg7DQp9DQoNCi5vZVNlYXJjaExheWVyUmlnaHRCdXR0b25zDQp7DQogICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgcmlnaHQ6MjBweDsNCiAgICB0b3A6MTZweDsgICAgDQp9DQovKg0KLm9lU0xTVG9vbFRpcCB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkIGJsYWNrOw0KICAgIGJvcmRlci10b3A6IDFweCBkb3R0ZWQgYmxhY2s7DQp9DQoNCi5vZVNMU1Rvb2xUaXAgLm9lU0xTVG9vbFRpcFRleHQgew0KICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47DQogICAgICAgIHdpZHRoOiA1MDBweDsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsNCiAgICAgICAgY29sb3I6ICNmZmY7DQogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICAgICAgcGFkZGluZzogNXB4IDA7DQogICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDsNCiAgICAgICAgDQogICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICAgICAgei1pbmRleDogMTsNCiAgICAgICAgdG9wOiAxMzUlOw0KICAgICAgICANCiAgICAgICAgbWFyZ2luLWxlZnQ6IC0yMHB4Ow0KICAgICAgICANCiAgICAgICAgb3BhY2l0eTogMDsNCiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzOw0KfQ0KDQoub2VTTFNUb29sVGlwIC5vZVNMU1Rvb2xUaXBUZXh0OjphZnRlciB7DQogICAgY29udGVudDogIiI7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGJvdHRvbTogMTAwJTsNCiAgICBsZWZ0OiA1MCU7DQogICAgbWFyZ2luLWxlZnQ6IC01cHg7DQogICAgYm9yZGVyLXdpZHRoOiA1cHg7DQogICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsNCiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICM1NTUgdHJhbnNwYXJlbnQ7DQp9DQoNCi5vZVNMU1Rvb2xUaXA6aG92ZXIgLm9lU0xTVG9vbFRpcFRleHQgew0KICAgIHZpc2liaWxpdHk6IHZpc2libGU7DQogICAgb3BhY2l0eTogMTsNCn0qLw==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListView.html", "html", markup1);
});

})();
