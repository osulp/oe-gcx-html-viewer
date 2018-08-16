/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_SageGrouseDevSitingModule extends ModuleBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        var site = (<any>this).app.site;
        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args);
            });
        }
    }

    _onSiteInitialized(site) {
        this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, (sender) => {
            console.log('graphic drawing event!', sender);
            let lineSymbol = sender.sender.lineSymbol;
            lineSymbol.color.r = 0;
            lineSymbol.color.b = 255;
            lineSymbol.color.g = 255;
            let fillSymbolOutline = sender.sender.fillSymbol.outline;
            fillSymbolOutline.color.r = 0;
            fillSymbolOutline.color.b = 255;
            fillSymbolOutline.color.g = 255;
        });
    }



}