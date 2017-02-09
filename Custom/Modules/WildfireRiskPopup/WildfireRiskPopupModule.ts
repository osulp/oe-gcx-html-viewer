module oe.wildfireRiskPopup {
                        
    export class WildfireRiskPopupModule extends geocortex.framework.application.ModuleBase {
        
        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        //pointFeatureSet: Observable<esri.tasks.FeatureSet> = new Observable<esri.tasks.FeatureSet>();
                                
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

            //disable normal map tips
            this.app.command("DisableMapTips").execute();
        }
    }
}