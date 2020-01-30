/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";


export class OE_AddLayerToLayerListModule extends ModuleBase {

    app: ViewerApplication;
    menuItems: [{}];

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        var thisViewModel = this;
        var site: Site = (<any>this).app.site;
        this.menuItems = config.menuItems ? config.menuItems : [];
        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {
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

        this.app.commandRegistry.command("OESearchPortalLayers").register(this, this.OESearchPortalLayers);
    }

    OESearchPortalLayers(site: Site, thisViewModel): void {

        //?q=wildfire+%2B+%22map+service%22&bbox=&sortField=&sortOrder=

        $.get("https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search", { "q": "wildfire+\"map service\"", "f": "json" }, null, "json")
            .done(function (result) {

                if (result.num < 1) {
                    console.log("No hits for search term.");
                }
                else {
                    console.log("Results: " + result.results.length);

                    for (var i = 0; i < result.results; i++) {
                        console.log("Urls: " + result.results[i].url);
                    }
                }
            })
            .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Portal Search Failed.");
            });


    }


}