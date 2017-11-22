/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.SageGrouseDevSiting {

    export class SageGrouseDevSitingModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

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

        _onSiteInitialized(site: geocortex.essentials.Site) {
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
}