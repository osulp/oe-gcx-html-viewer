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
                        
            //wrap banner image with a link anchor
            $(".banner-left-img").wrap('<a href="'+linkUri+'" target="_blank"></a>');
            if ($(".banner-subtitle").html() === '') {
                $(".banner-text h1").css("margin-top", "0.59em");
            }
            /*$('.banner').click(function (e) {
                if (e.pageX < 350) {
                    window.open(linkUri, '_blank');                    
                }
            });
            //adds support for sponsor logo image to be next to the OE banner image before the banner text.
            try {
               // $('.banner-text').css("left", (/\.(gif|jpg|jpeg|tiff|png)$/i).test($('.banner-right-img')[0]["src"]) ? $('.banner-right-img').width() + 370 + "px" : "370px");
            }
            catch (ex)
            { };*/
            
        }
    }
}