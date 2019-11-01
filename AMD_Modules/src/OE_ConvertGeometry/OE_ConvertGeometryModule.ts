/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { LayerType } from "geocortex/essentials/LayerType";
import { Site } from "geocortex/essentials/Site";


class DownloadOverrideWorkflow {
    workflowID: string;
    argNames: string[];
    argValues: string[];
}

export class OE_ConvertGeometryModule extends ModuleBase {

    app: ViewerApplication;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    
    initialize(config: any): void {
      
        var site: Site = (<any>this).app.site;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args);
            });
        }
    }
    
    _onSiteInitialized(site:Site) {
                     
        this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
            window.open(layer.getLayerUrl(), "_blank");
        });        

    }

}