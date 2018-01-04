/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_HyperlinkBannerModule extends ModuleBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        var linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";
        var site = (<any>this).app.site;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, linkUri);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args,linkUri);
            });
        }

    }

    _onSiteInitialized(site, linkUri: string) {
        //wrap banner image with a link anchor
        $(".banner-left-img").wrap('<a href="' + linkUri + '" target="_blank"></a>');
        if ($(".banner-subtitle").html() === '') {
            $(".banner-text h1").css("margin-top", "0.59em");
        }
    }

}