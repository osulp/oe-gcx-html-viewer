/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { LayerType } from "geocortex/essentials/LayerType";
import { Site } from "geocortex/essentials/Site";


class DownloadOverrideWorkflow {
    workflowID: string;
    argNames: string[];
    argValues: string[];
}

export class OE_LayerActionsModule extends ModuleBase {

    app: ViewerApplication;
    showLayerDescription: boolean;
    showLayerDescViewHide: boolean;
    allowAllLayerTypes: boolean;
    metadataHyperlinkOverride: boolean;
    downloadHyperlinkOverride: boolean;
    expandLayerTreeOnVisible: boolean;
    layer_desc_full: any;

    metadataHyperlinkURI: string = "";
    downloadLinkURI: string = "";

    downloadWorkflowEnabled: boolean; // by default this is true, workflow is an opt out
    downloadWorkflowOverride: DownloadOverrideWorkflow; //override default workflow ID - This is an object with a workflow id, argument names, and argument values    

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    
    initialize(config: any): void {
        this.showLayerDescription = config.showLayerDescription !== undefined ? config.showLayerDescription : false;
        this.showLayerDescViewHide = config.showLayerDescViewHide !== undefined ? config.showLayerDescViewHide : true;
        this.allowAllLayerTypes = config.allowAllLayerTypes !== undefined ? config.allowAllLayerTypes : false;
        this.metadataHyperlinkOverride = config.metadataHyperlinkOverride !== undefined ? config.metadataHyperlinkOverride : false;
        this.downloadHyperlinkOverride = config.downloadHyperlinkOverride !== undefined ? config.downloadHyperlinkOverride : false;
        this.expandLayerTreeOnVisible = config.expandLayerTreeOnVisible !== undefined ? config.expandLayerTreeOnVisible : false;

        this.downloadWorkflowEnabled = config.downloadWorkflowEnabled !== undefined ? config.downloadWorkflowEnabled : true;
        this.downloadWorkflowOverride = config.downloadWorkflowOverride !== undefined ? config.downloadWorkflowOverride : "";

        var site: Site = (<any>this).app.site;

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

    handleFolderClickEvent(context) {
        if (context.isVisible.get() == true)
            context.isExpanded.set(true);
    }

    async getServiceLayerDescription(layerURL) {
        let result;
        try {
            result = await $.ajax({
                url: layerURL,
                crossDomain: true,
                dataType: "json",
                type: 'POST'
            });
            return result;
        } catch (ex) {
            console.error(ex);
        }
    }

    async getLinkUrl(layer: any, type: string) {
        let returnLink = '';
        let linkArray = []
        //get service layer description: 
        let serviceLayerDesc = await this.getServiceLayerDescription(layer.getLayerUrl() + "?f=json");
        let isFTP = false;

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
                } else { //download
                    if (linkArray.length > 1 || isFTP) {
                        returnLink = linkArray[linkArray.length - 1];
                    } else {
                        returnLink = '';
                    }
                    returnLink = returnLink.indexOf(".zip") !== -1 ? returnLink : '';
                }
            }
        } else {
            returnLink = '';
        }
        return returnLink;
    }

    _onSiteInitialized(site:Site) {

        //add listener if layer trees will expand when enabled
        if (this.expandLayerTreeOnVisible) {
            this.app.eventRegistry.event("FolderClickedEvent").subscribe(this, (args) => {
                this.handleFolderClickEvent(args);
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
                            let layer_desc = showMore && this.showLayerDescViewHide ? this.layer_desc_full.substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>' : this.layer_desc_full;
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

        }
        
        this.app.commandRegistry.command("showMetadata").register(this, async function (layer) {

            //override metadata link
            if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                window.open(this.metadataHyperlinkURI, "_blank");
                return;
            }

            var metadataLink = await this.getLinkUrl(layer,'metadata');

            if (metadataLink !== "") {
                window.open(metadataLink, "_blank");
            }
            else {
                alert(layer.description)
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
        this.app.commandRegistry.command("showDownload").register(this, async function (layer) {

            //override download link
            if (this.downloadHyperlinkOverride && this.downloadLinkURI != "") {
                window.open(this.downloadLinkURI, "_blank");
                return;
            }

            let downloadLink = await this.getLinkUrl(layer, 'download');
           
            if (downloadLink !== "") {                
                window.open(downloadLink, "_blank");
                return;
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
        }, function (context):boolean {
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
                let showDownload = canExecute(context);
                if (showDownload) {
                    return true;
                } else {
                    return false;
                }               

            //return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
        });

    }

}