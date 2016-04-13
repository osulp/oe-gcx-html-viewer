/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.M49 {

    export class M49Module extends geocortex.framework.application.ModuleBase {

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
            var _this = this;                                  
            window["_calcAreas"] = [];
            // Register an implementation of custom commands.
            this.app.commandRegistry.command("addCalcAreas").register(this, function (calcAreas) {
                //calcArea for each AOI
                //Allows for adding/deleting dynamically in the UI
                //Example of the json object the receive:
                //{
                //    "aoi_id": {id},
                //    "TotalArea": { TotArea }, 
                //    "HVFarmSoil_IntersectedArea":{ dblHVFarmSoil },
                //    "HVFarmDairy_IntersectedArea": { dblHVFarmDairy },
                //    "HVForest1_IntersectedArea": { dblHVForest1 },
                //    "HVForest3_IntersectedArea": { dblHVForest3 }
                //}                
                window["_calcAreas"].push(JSON.parse(calcAreas));                               
            });
            this.app.commandRegistry.command("removeCalcAreas").register(this, function (index) {
                window["_calcAreas"].splice(index, 1);
            });
        }
    }
}