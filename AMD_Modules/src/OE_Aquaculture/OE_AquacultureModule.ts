/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";
import { Chart } from "geocortex/charting/Chart";

export class OE_AquacultureModule extends ModuleBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        
        var site = (<any>this).app.site;       
        Chart.prototype.initialize();
        //var map = new esri.Map("tempmap");
        //var essentialsSite = new Site("https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/sites/__root_oreall", map);
        
        //dojo.connect(essentialsSite, "onInitialized", this._onSiteInitialized);
        //dojo.connect(essentialsSite, "onInitializationFailed", this._onSiteInitializationFailed);
        //essentialsSite.initialize();
    }

    _onSiteInitialized(site) {
        console.log('site?', site);
    }
    _onSiteInitializationFailed(args) {
        console.log('failed', args);
    }
}