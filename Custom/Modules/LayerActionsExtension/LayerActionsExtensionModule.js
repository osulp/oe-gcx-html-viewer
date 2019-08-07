/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var DownloadOverrideWorkflow = (function () {
            function DownloadOverrideWorkflow() {
            }
            return DownloadOverrideWorkflow;
        }());
        var LayerActionsExtension = (function (_super) {
            __extends(LayerActionsExtension, _super);
            function LayerActionsExtension(app, lib) {
                _super.call(this, app, lib);
                this.metadataHyperlinkURI = "";
                this.downloadLinkURI = "";
            }
            LayerActionsExtension.prototype.initialize = function (config) {
                var _this = this;
                this.showLayerDescription = config.showLayerDescription !== undefined ? config.showLayerDescription : false;
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
            LayerActionsExtension.prototype.registerOnclickLayerDesc = function () {
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
            LayerActionsExtension.prototype.handleFolderClickEvent = function (context) {
                if (context.isVisible.get() == true)
                    context.isExpanded.set(true);
            };
            LayerActionsExtension.prototype._onSiteInitialized = function (site) {
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
                            if (this.metadataHyperlinkOverride && args.layerHyperlinks[i].text.toLowerCase().indexOf("metadata") > -1) {
                                //$(aLink).css("display", "none");
                                this.metadataHyperlinkURI = args.layerHyperlinks[i].uri;
                            }
                            else if (this.downloadHyperlinkOverride && args.layerHyperlinks[i].text.toLowerCase().indexOf("download") > -1) {
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
                            if (this.metadataHyperlinkOverride && aLink.innerText.toLowerCase().indexOf("metadata") > -1) {
                                $(aLink).css("display", "none");
                            }
                            else if (this.downloadHyperlinkOverride && aLink.innerText.toLowerCase().indexOf("download") > -1) {
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
                                if (layerListView.length > 0 &&
                                    typeof layerListView[0].viewModel.menuContext.value.description != "undefined" &&
                                    layerListView[0].viewModel.menuContext.value.description != null) {
                                    _this.layer_desc_full = layerListView[0].viewModel.menuContext.value.description.split("Metadata:")[0];
                                    _this.layer_desc_full = _this.layer_desc_full.split('Abstract:').length > 1
                                        ? _this.layer_desc_full.split('Abstract:')[1]
                                        : _this.layer_desc_full;
                                    var showMore = _this.layer_desc_full.length > 500;
                                    var layer_desc = showMore ? _this.layer_desc_full.substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>' : _this.layer_desc_full;
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
                this["registerOnClickForLayerDesc"] = function () {
                };
                this.app.commandRegistry.command("showMetadata").register(this, function (layer) {
                    //override metadata link
                    if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                        window.open(this.metadataHyperlinkURI, "_blank");
                        return;
                    }
                    // Show the text that was passed into the command.
                    // Metadata links are the first link in the description so split and send to first url.
                    var metadataLink = "";
                    if (layer != null && layer != "undefined" && layer.description != null && layer.description != "undefined")
                        metadataLink = layer.description.split("http");
                    var metadataLinkSpaceCount = 0;
                    if (metadataLink.length > 1) {
                        var metadataLinkArray = metadataLink[1].split(" ");
                        metadataLinkSpaceCount = metadataLinkArray.length;
                        metadataLink = "http" + metadataLinkArray[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "");
                    }
                    else {
                        metadataLink = "";
                    }
                    //metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "") : "";
                    //remove invalid last characters
                    var invalidTerminatingChars = [".", ",", "?", "!", ")", "\""];
                    while (invalidTerminatingChars.indexOf(metadataLink.slice(-1)) > -1)
                        metadataLink = metadataLink.slice(0, -1);
                    //check for typos
                    var urlArray = metadataLink.split("/");
                    if (urlArray.length > 0) {
                        var lastStringArray = urlArray[urlArray.length - 1].split(".");
                        if (lastStringArray.length > 2 && metadataLinkSpaceCount > 0) {
                            lastStringArray.splice(lastStringArray.length - 1, 1);
                            urlArray[urlArray.length - 1] = lastStringArray.join(".");
                            metadataLink = urlArray.join("/");
                        }
                    }
                    if (metadataLink !== "") {
                        window.open(metadataLink, "_blank");
                    }
                    else {
                        alert(layer.description);
                    }
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
                    var isOEService = context.mapService.serviceUrl.match("lib-arcgis") !== -1 ? true : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1 ? true : false;
                    if (isOEService && context.description !== "")
                        return true;
                    return false;
                });
                // view LayerActionsView active
                this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                    window.open(layer.getLayerUrl(), "_blank");
                });
                this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                    //override download link
                    if (this.downloadHyperlinkOverride && this.downloadLinkURI != "") {
                        window.open(this.downloadLinkURI, "_blank");
                        return;
                    }
                    // Show the text that was passed into the command.
                    // Download links are the second link in the description so split and send to second url.
                    var downloadLink = "";
                    if (layer.description != null && layer.description != "undefined")
                        downloadLink = layer.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "") {
                        //console.log("Opening download link...");
                        window.open(downloadLink, "_blank");
                    }
                    else {
                        //exit if workflows are disabled.  This is enabled by default.
                        if (!this.downloadWorkflowEnabled)
                            return;
                        //check for workflow array
                        if (this.app.site.workflows == undefined) {
                            console.error("showDownload: Workflow is missing from site.");
                            alert("Workflow for this operation is missing.");
                            return;
                        }
                        //check for workflow by id
                        var i = 0;
                        var workflowFound = null;
                        var workflowTargetID = "EXTRACT_LAYER";
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
                            return;
                        }
                        var GESiteUri = this.app.site.url;
                        var workflowArgs = {};
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
                                for (var i = 0; i < this.downloadWorkflowOverride.argNames.length; i++) {
                                    if (i < this.downloadWorkflowOverride.argValues.length)
                                        workflowArgs[this.downloadWorkflowOverride.argNames[i]] = this.downloadWorkflowOverride.argValues[i];
                                }
                            }
                        }
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                    }
                }, function (context) {
                    if (this.downloadHyperlinkOverride && this.downloadLinkURI != "") {
                        return true;
                    }
                    if (context === null)
                        return false;
                    //hide
                    if (context.properties.hideDownload != undefined && context.properties.hideDownload === "False")
                        return false;
                    //hide if download link override and workflow is disabled
                    if (this.downloadHyperlinkOverride && this.downloadLinkURI == "" && !this.downloadWorkflowEnabled) {
                        return false;
                    }
                    //download links always show
                    var downloadLink = "";
                    if (context.description != null && context.description != "undefined")
                        downloadLink = context.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "")
                        return true;
                    //is this a type that can be exported?
                    if (!this.allowAllLayerTypes && context.type != geocortex.essentials.LayerType.FEATURE_LAYER)
                        return false;
                    //is the map service there?
                    if (context.mapService == null || context.mapService == "")
                        return false;
                    if (context.mapService.serviceUrl == null || context.mapService.serviceUrl == "")
                        return false;
                    return true;
                    //return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
                });
            };
            return LayerActionsExtension;
        }(geocortex.framework.application.ModuleBase));
        layer_actions_extension.LayerActionsExtension = LayerActionsExtension;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
//# sourceMappingURL=LayerActionsExtensionModule.js.map