/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />


module oe.raster_functions {    

    export class RasterFunctionsModule extends geocortex.framework.application.ModuleBase {        

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
            _this.app.commandRegistry.command("processRasterFunctions").register(this, function () {
                var imageServicesArray = [];
                //find Image services
                for (var x = 0; x < site.essentialsMap.mapServices.length; x++) {
                    if (site.essentialsMap.mapServices[x].mapServiceType === "Image") {
                        var service:any = {};
                        service.id = site.essentialsMap.mapServices[x].id;
                        service.name = site.essentialsMap.mapServices[x].displayName;
                        imageServicesArray[0] = JSON.stringify(service);
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                        workflowArgs["mapServiceIDs"] = imageServicesArray;
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                    }
                }
                //var workflowArgs = {};
                //workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                //workflowArgs["mapServiceIDs"] = imageServicesArray;
                //this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            });
            _this.app.commandRegistry.command("processRasterFunctions").execute();

        }
    }
}