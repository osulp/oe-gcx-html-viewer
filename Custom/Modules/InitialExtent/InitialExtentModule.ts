/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.initial_extent {
    
    export class InitialExtentModule extends geocortex.framework.application.ModuleBase {
        
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

                this.app.eventRegistry.event("MapLoadedEvent").subscribe(this, (args) => {
                    this._onMapLoaded(args);
                });

                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }
            
        }

        _onMapLoaded(site: geocortex.essentials.Site) {           
            this.app.command("ZoomToInitialExtent").execute();
        }

        _onSiteInitialized(site: geocortex.essentials.Site) {            
            this.app.command("ZoomToInitialExtent").execute();
        }
    }
}