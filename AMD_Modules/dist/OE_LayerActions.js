
// Module 'OE_LayerActions'
        (function () {
var markup1 = '<div class=\'template-module-view\'>	<b><span data-binding=\'{@text: greeting}\'></span></b></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_LayerActions/OE_LayerActionsModule": function () {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DownloadOverrideWorkflow = /** @class */ (function () {
        function DownloadOverrideWorkflow() {
        }
        return DownloadOverrideWorkflow;
    }());
    var OE_LayerActionsModule = /** @class */ (function (_super) {
        __extends(OE_LayerActionsModule, _super);
        function OE_LayerActionsModule(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.metadataHyperlinkURI = "";
            _this.downloadLinkURI = "";
            return _this;
        }
        OE_LayerActionsModule.prototype.initialize = function (config) {
            var _this = this;
            this.showLayerDescription = config.showLayerDescription !== undefined ? config.showLayerDescription : false;
            this.showLayerDescViewHide = config.showLayerDescViewHide !== undefined ? config.showLayerDescViewHide : true;
            this.allowAllLayerTypes = config.allowAllLayerTypes !== undefined ? config.allowAllLayerTypes : false;
            this.metadataHyperlinkOverride = config.metadataHyperlinkOverride !== undefined ? config.metadataHyperlinkOverride : false;
            this.downloadHyperlinkOverride = config.downloadHyperlinkOverride !== undefined ? config.downloadHyperlinkOverride : false;
            this.expandLayerTreeOnVisible = config.expandLayerTreeOnVisible !== undefined ? config.expandLayerTreeOnVisible : false;
            this.downloadWorkflowEnabled = config.downloadWorkflowEnabled !== undefined ? config.downloadWorkflowEnabled : true;
            this.downloadWorkflowOverride = config.downloadWorkflowOverride !== undefined ? config.downloadWorkflowOverride : "";
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
        OE_LayerActionsModule.prototype.registerOnclickLayerDesc = function () {
            var _this = this;
            $("#oe_layer_desc_toggle_more").click(function () {
                if ($("#oe_layer_desc_toggle_more").html() === "show more") {
                    var show_all = _this["layer_desc_full"] + '<div id="oe_layer_desc_toggle_more">show less</div>';
                    $("#oe_layer_desc").html(show_all);
                }
                else {
                    var show_less = _this["layer_desc_full"].substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>';
                    $("#oe_layer_desc").html(show_less);
                }
                _this.registerOnclickLayerDesc();
            });
        };
        OE_LayerActionsModule.prototype.handleFolderClickEvent = function (context) {
            if (context.isVisible.get() == true)
                context.isExpanded.set(true);
        };
        OE_LayerActionsModule.prototype.getServiceLayerDescription = function (layerURL) {
            return __awaiter(this, void 0, void 0, function () {
                var result, ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, $.ajax({
                                    url: layerURL,
                                    crossDomain: true,
                                    dataType: "json",
                                    type: 'POST'
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            ex_1 = _a.sent();
                            console.error(ex_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OE_LayerActionsModule.prototype.getLinkUrl = function (layer, type) {
            return __awaiter(this, void 0, void 0, function () {
                var returnLink, linkArray, serviceLayerDesc, isFTP;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            returnLink = '';
                            linkArray = [];
                            return [4 /*yield*/, this.getServiceLayerDescription(layer.getLayerUrl() + "?f=json")];
                        case 1:
                            serviceLayerDesc = _a.sent();
                            isFTP = false;
                            if (serviceLayerDesc.description) {
                                isFTP = type === 'download' && serviceLayerDesc.description.split("ftp://").length > 1;
                                linkArray = serviceLayerDesc.description.match(isFTP ? /\bftp?:\/\/\S+/gi : /\bhttps?:\/\/\S+/gi); //.split(isFTP ? "ftp" : "http");
                            }
                            //else {
                            //    if (layer != null && layer != "undefined" && layer.description != null && layer.description != "undefined")
                            //        linkArray = layer.description.match(isFTP ? /\bftp?:\/\/\S+/gi : /\bhttps?:\/\/\S+/gi);//.split("http");
                            //}
                            if (linkArray) {
                                if (linkArray.length > 0) {
                                    if (type === 'metadata') {
                                        returnLink = linkArray[0];
                                    }
                                    else { //download
                                        if (linkArray.length > 1 || isFTP) {
                                            returnLink = linkArray[linkArray.length - 1];
                                        }
                                        else {
                                            returnLink = '';
                                        }
                                        returnLink = returnLink.indexOf(".zip") !== -1 ? returnLink : '';
                                    }
                                }
                            }
                            else {
                                returnLink = '';
                            }
                            return [2 /*return*/, returnLink];
                    }
                });
            });
        };
        OE_LayerActionsModule.prototype._onSiteInitialized = function (site) {
            var _this = this;
            //add listener if layer trees will expand when enabled
            if (this.expandLayerTreeOnVisible) {
                this.app.eventRegistry.event("FolderClickedEvent").subscribe(this, function (args) {
                    _this.handleFolderClickEvent(args);
                });
            }
            //metadata override
            if (this.metadataHyperlinkOverride || this.downloadHyperlinkOverride) {
                this.app.command("ShowLayerActions").preExecute.subscribe(this, function (args) {
                    //clear old values!
                    this.metadataHyperlinkURI = "";
                    this.downloadLinkURI = "";
                    //before layer actions are show!
                    if (!args.layerHyperlinks || args.layerHyperlinks.length < 1)
                        return;
                    for (var i = 0; i < args.layerHyperlinks.length; i++) {
                        //check for metadata override
                        //if (this.metadataHyperlinkOverride && args.layerHyperlinks[i].text.toLowerCase().indexOf("metadata") > -1) {
                        if (this.metadataHyperlinkOverride && args.layerHyperlinks[i].text.trim().toLowerCase() == "metadata") {
                            //$(aLink).css("display", "none");
                            this.metadataHyperlinkURI = args.layerHyperlinks[i].uri;
                        }
                        //else if (this.downloadHyperlinkOverride && args.layerHyperlinks[i].text.toLowerCase().indexOf("download") > -1) {
                        else if (this.downloadHyperlinkOverride && args.layerHyperlinks[i].text.trim().toLowerCase() == "download") {
                            //$(aLink).css("display", "none");
                            this.downloadLinkURI = args.layerHyperlinks[i].uri;
                        }
                    }
                });
                this.app.command("ShowLayerActions").postExecute.subscribe(this, function (args) {
                    //try to hide metadata link and grab its URI
                    var layerHyperLinksArray = $(".LayerActionsView ul.list-menu a");
                    if (layerHyperLinksArray === undefined || !layerHyperLinksArray)
                        return;
                    var aLink;
                    for (var i = 0; i < layerHyperLinksArray.length; i++) {
                        aLink = layerHyperLinksArray[i];
                        //check for metadata override
                        if (this.metadataHyperlinkOverride && aLink.innerText.trim().toLowerCase() == "metadata") {
                            $(aLink).css("display", "none");
                        }
                        else if (this.downloadHyperlinkOverride && aLink.innerText.trim().toLowerCase() == "download") {
                            $(aLink).css("display", "none");
                        }
                    }
                });
            }
            //show in list descriptions
            if (this.showLayerDescription) {
                //var _this = this;
                // Register an implementation for the "showMetadata" and "showDownload" commands.
                this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                    if (args.id === "LayerDataContainerView") {
                        // check to see if div id already added, else create a new one
                        if (args.childRegions[0].activeViews.length > 1) {
                            var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerActionsView"; });
                            if (layerListView.length > 0) {
                                _this.layer_desc_full = layerListView[0].viewModel.menuContext.value.description.split("Metadata:")[0];
                                _this.layer_desc_full = _this.layer_desc_full.split('Abstract:').length > 1
                                    ? _this.layer_desc_full.split('Abstract:')[1]
                                    : _this.layer_desc_full;
                                var showMore = _this.layer_desc_full.length > 500;
                                var layer_desc = showMore && _this.showLayerDescViewHide ? _this.layer_desc_full.substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>' : _this.layer_desc_full;
                                if ($("#oe_layer_desc").length > 0) {
                                    $("#oe_layer_desc").html(layer_desc);
                                }
                                else {
                                    $(".LayerActionsView.active").prepend('<div id="oe_layer_desc">' + layer_desc + '</div>');
                                }
                                _this.registerOnclickLayerDesc();
                            }
                        }
                    }
                });
            }
            this.app.commandRegistry.command("showMetadata").register(this, function (layer) {
                return __awaiter(this, void 0, void 0, function () {
                    var metadataLink;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //override metadata link
                                if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                                    window.open(this.metadataHyperlinkURI, "_blank");
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.getLinkUrl(layer, 'metadata')];
                            case 1:
                                metadataLink = _a.sent();
                                if (metadataLink !== "") {
                                    window.open(metadataLink, "_blank");
                                }
                                else {
                                    alert(layer.description);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }, function (context) {
                if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                    return true;
                }
                //canExecute
                if (context == null)
                    return false;
                if (context.mapService.serviceUrl == null || context.mapService.serviceUrl == "undefined")
                    return false;
                if (context.description == null || context.description == "undefined")
                    return false;
                //there is a description show this button
                var isOEService = context.mapService.serviceUrl.match("lib-gis") !== -1
                    ? true
                    : context.mapService.serviceUrl.match("lib-gis") !== -1
                        ? true
                        : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1
                            ? true
                            : false;
                if (isOEService && context.description !== "")
                    return true;
                return false;
            });
            // view LayerActionsView active
            this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                window.open(layer.getLayerUrl(), "_blank");
            });
            this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                return __awaiter(this, void 0, void 0, function () {
                    var downloadLink, i, workflowFound, workflowTargetID, GESiteUri, workflowArgs, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //override download link
                                if (this.downloadHyperlinkOverride && this.downloadLinkURI != "") {
                                    window.open(this.downloadLinkURI, "_blank");
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.getLinkUrl(layer, 'download')];
                            case 1:
                                downloadLink = _a.sent();
                                if (downloadLink !== "") {
                                    window.open(downloadLink, "_blank");
                                    return [2 /*return*/];
                                }
                                else {
                                    //exit if workflows are disabled.  This is enabled by default.
                                    if (!this.downloadWorkflowEnabled)
                                        return [2 /*return*/];
                                    //check for workflow array
                                    if (this.app.site.workflows == undefined) {
                                        console.error("showDownload: Workflow is missing from site.");
                                        alert("Workflow for this operation is missing.");
                                        return [2 /*return*/];
                                    }
                                    i = 0;
                                    workflowFound = null;
                                    workflowTargetID = "EXTRACT_LAYER";
                                    //custom workflow
                                    if (this.downloadWorkflowOverride != "") {
                                        workflowTargetID = this.downloadWorkflowOverride.workflowID;
                                    }
                                    for (i = 0; i < this.app.site.workflows.length; i++) {
                                        if (this.app.site.workflows[i].id.toUpperCase().indexOf(workflowTargetID.toUpperCase()) > -1) {
                                            workflowFound = this.app.site.workflows[i].id;
                                            break;
                                        }
                                    }
                                    if (workflowFound == null) {
                                        console.error("showDownload: Workflow is missing from site.");
                                        alert("Workflow for this operation is missing.");
                                        return [2 /*return*/];
                                    }
                                    GESiteUri = this.app.site.url;
                                    workflowArgs = {};
                                    //console.log("Starting Extract Workflow...");
                                    workflowArgs["workflowId"] = workflowFound; //"Extract_Layer"; //This is the ID of the workflow.
                                    workflowArgs["SiteUri"] = GESiteUri;
                                    workflowArgs["Layers"] = layer.displayName;
                                    workflowArgs["arcgisLayerName"] = layer.name;
                                    workflowArgs["LayerUrl"] = layer.getLayerUrl();
                                    workflowArgs["LayerToken"] = layer.mapService.serviceToken;
                                    //workflowArgs["LayerUser"] = layer.properties.user !== undefined ? layer.properties.user : "";
                                    //workflowArgs["LayerPwd"] = layer.properties.pwd !== undefined ? layer.properties.pwd : "";
                                    //workflowArgs["LayerTokenUrl"] = layer.getLayerUrl().toUpperCase().split("/REST/")[0] + "/tokens";
                                    //custom workflow arguments
                                    if (this.downloadWorkflowOverride != "") {
                                        if (this.downloadWorkflowOverride.argNames !== undefined && this.downloadWorkflowOverride.argValues !== undefined) {
                                            for (i = 0; i < this.downloadWorkflowOverride.argNames.length; i++) {
                                                if (i < this.downloadWorkflowOverride.argValues.length)
                                                    workflowArgs[this.downloadWorkflowOverride.argNames[i]] = this.downloadWorkflowOverride.argValues[i];
                                            }
                                        }
                                    }
                                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }, function (context) {
                function canExecute(context) {
                    if (context === null) {
                        return false;
                    }
                    //hide if the layer property "hideDownload" has a value
                    if (context.properties.hideDownload !== undefined) {
                        //if (["FALSE","TRUE"].indexOf(context.properties.hideDownload.toUpperCase()) !== -1) {
                        if (context.properties.hideDownload.length !== -1) {
                            return false;
                        }
                    }
                    //is the map service there?
                    if (context.mapService == null || context.mapService == "")
                        return false;
                    if (context.mapService.serviceUrl == null || context.mapService.serviceUrl == "")
                        return false;
                    return true;
                }
                var showDownload = canExecute(context);
                if (showDownload) {
                    return true;
                }
                else {
                    return false;
                }
                //return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
            });
        };
        return OE_LayerActionsModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_LayerActionsModule = OE_LayerActionsModule;
});

},
"geocortex/oe_amd/OE_LayerActions/OE_LayerActionsView": function () {
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
    var OE_LayerActionsView = /** @class */ (function (_super) {
        __extends(OE_LayerActionsView, _super);
        function OE_LayerActionsView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return OE_LayerActionsView;
    }(ViewBase_1.ViewBase));
    exports.OE_LayerActionsView = OE_LayerActionsView;
});

},
"geocortex/oe_amd/OE_LayerActions/OE_LayerActionsViewModel": function () {
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
    var OE_LayerActionsViewModel = /** @class */ (function (_super) {
        __extends(OE_LayerActionsViewModel, _super);
        //greeting: Observable<string> = new Observable<string>();
        function OE_LayerActionsViewModel(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_LayerActionsViewModel.prototype.initialize = function (config) {
        };
        return OE_LayerActionsViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_LayerActionsViewModel = OE_LayerActionsViewModel;
});

},
"url:/geocortex/oe_amd/OE_LayerActions/OE_LayerActionsView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_LayerActions/CSS/OE_LayerActionsModule.css", "css", "I29lX2xheWVyX2Rlc2Mgew0KICAgIHBhZGRpbmc6IDIwcHg7DQogICAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDsNCn0NCg0KLmxheWVyLWludmlzaWJsZTphZnRlciB7DQogICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Ow0KfQ==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_LayerActions/OE_LayerActionsView.html", "html", markup1);
});

})();
