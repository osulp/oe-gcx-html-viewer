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
    }
}