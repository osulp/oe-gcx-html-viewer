/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";
import { MapService } from "geocortex/essentials/MapService";
import { FeatureLayerService } from "geocortex/essentials/FeatureLayerService";
import { StreamLayerService } from "geocortex/essentials/StreamLayerService";
import { Layer } from "geocortex/essentials/Layer";
import { MapServiceType } from "geocortex/essentials/MapServiceConstants";
import { MapServiceFunction } from "geocortex/essentials/MapServiceConstants";


export class OE_HopscotchModule extends ModuleBase {

    app: ViewerApplication;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        var thisViewModel = this;
        var site: Site = (<any>this).app.site;
        
        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {
        
    }    

}