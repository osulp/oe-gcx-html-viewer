/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.hyperlink_banner {
    var linkUri: string;
    export class HyperlinkBannerModule extends geocortex.framework.application.ModuleBase {
        
        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {                                    
            linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";      
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
            $('.banner').click(function (e) {
                if (e.pageX < 350) {
                    window.open(linkUri, '_blank');                    
                }
            });
            //if ($('.banner-subtitle').html() === "") {
            //    $('.banner-title').addClass("no-subtitle");
            //}          
            
        }
    }
}