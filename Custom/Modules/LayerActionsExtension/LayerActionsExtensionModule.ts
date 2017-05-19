/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.layer_actions_extension {

    export class LayerActionsExtension extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        layer_desc_full: any;

        initialize(config: any): void {

            var site: geocortex.essentials.Site = (<any>this).app.site;

            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }
        }
        registerOnclickLayerDesc(): void {
            $("#oe_layer_desc_toggle_more").click(() => {
                if ($("#oe_layer_desc_toggle_more").html() === "show more") {
                    let show_all = this["layer_desc_full"] + '<div id="oe_layer_desc_toggle_more">show less</div>'
                    $("#oe_layer_desc").html(show_all);
                } else {
                    let show_less = this["layer_desc_full"].substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>'
                    $("#oe_layer_desc").html(show_less);
                }
                this.registerOnclickLayerDesc();
            });
        }

        _onSiteInitialized(site: geocortex.essentials.Site) {
            //var _this = this;
            // Register an implementation for the "showMetadata" and "showDownload" commands.
            this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, (args) => {
                if (args.id === "LayerDataContainerView") {
                    // check to see if div id already added, else create a new one
                    if (args.childRegions[0].activeViews.length > 1) {
                        let layerListView = args.childRegions[0].activeViews.filter((av: any) => av.id === "LayerActionsView");
                        if (layerListView.length > 0) {
                            this.layer_desc_full = layerListView[0].viewModel.menuContext.value.description.split("Metadata:")[0];
                            this.layer_desc_full = this.layer_desc_full.split('Abstract:').length > 1
                                ? this.layer_desc_full.split('Abstract:')[1]
                                : this.layer_desc_full;
                            let showMore = this.layer_desc_full.length > 500;
                            let layer_desc = showMore ? this.layer_desc_full.substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>' : this.layer_desc_full;
                            if ($("#oe_layer_desc").length > 0) {
                                $("#oe_layer_desc").html(layer_desc);
                            } else {
                                $(".LayerActionsView.active").prepend('<div id="oe_layer_desc">' + layer_desc + '</div>');
                            }
                            this.registerOnclickLayerDesc();
                        }
                    }
                }
            });

            this["registerOnClickForLayerDesc"] = function () {

            }
            this.app.commandRegistry.command("showMetadata").register(this, function (layer) {
                // Show the text that was passed into the command.
                // Metadata links are the first link in the description so split and send to first url.
                var metadataLink = layer.description.split("http");
                metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "") : "";
                if (metadataLink !== "") {
                    window.open(metadataLink, "_blank");
                }
                else {
                    alert(layer.description)
                }
            }, function (context) {
                //canExecute
                if (context !== null) {
                    //alert(JSON.stringify(context));
                    var isOEService = context.mapService.serviceUrl.match("lib-arcgis") !== -1 ? true : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1 ? true : false;
                    if (isOEService) {
                        return context.description !== "" ? true : false;
                    }
                    else {
                        return false
                    }
                }
                else {
                    return true;
                }
            });
            // view LayerActionsView active

            this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                window.open(layer.getLayerUrl(), "_blank");
            });
            this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                // Show the text that was passed into the command.
                // Download links are the second link in the description so split and send to second url.
                var downloadLink = layer.description.split("http");
                downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                if (downloadLink !== "") {
                    window.open(downloadLink, "_blank");
                }
                else {
                    var GESiteUri = this.app.site.url;
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "Extract_Layer"; //This is the ID of the workflow.
                    workflowArgs["SiteUri"] = GESiteUri;
                    workflowArgs["Layers"] = layer.displayName;
                    workflowArgs["LayerUrl"] = layer.getLayerUrl();
                    workflowArgs["LayerToken"] = layer.mapService.serviceToken;
                    //workflowArgs["LayerUser"] = layer.properties.user !== undefined ? layer.properties.user : "";
                    //workflowArgs["LayerPwd"] = layer.properties.pwd !== undefined ? layer.properties.pwd : "";
                    //workflowArgs["LayerTokenUrl"] = layer.getLayerUrl().toUpperCase().split("/REST/")[0] + "/tokens";

                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                }
            }, function (context) {
                return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
            });

        }
    }
}