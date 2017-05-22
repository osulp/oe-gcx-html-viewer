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

            //setup a command to toggle popup on left click

           /* new this.app.registerActivityIdHandler("ToggleFireRiskPopup", function CustomEventHandler(workflowContext, contextFunctions) {

                if (fireRiskPopupEnabled) {                    
                    fireRiskPopupEnabled = false;
                    this.app.command("EnableMapTips").execute();
                }
                else {
                    fireRiskPopupEnabled = true;
                    this.app.command("DisableMapTips").execute();
                }
            })*/

            //disable normal map tips
            //this.app.command("DisableMapTips").execute();
        }
    }
}