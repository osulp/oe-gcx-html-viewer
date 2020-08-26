/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class ImageryModule extends ModuleBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        var site = (<any>this).app.site;   
        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                //this._onSiteInitialized(args);
            });
        }
    }

    _onSiteInitialized(site) {
        //alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));
        $("#map").append('<div id="swipeDiv"></div>');
        //swipe
        let map = site.essentialsMap.getMap();
        let swipeLayer = site.essentialsMap.getMap().layerIds[0]
        //swipe       
        var swipeWidget = new esri.dijit.LayerSwipe({
            type: "vertical",  //Try switching to "scope" or "horizontal"
            map: map,
            top: 500,
            layers: [swipeLayer]
        }, "swipeDiv");
        swipeWidget.startup();

        window.setTimeout(() => {
            $(".vertical").css("top", "-" + $(".vertical")[0].clientHeight + "px");
        }, 4000);
        $(".vertical").on("dragstop dragstart click dblclick pointerdown selectstart ", (arg) => {
            window.setTimeout(function () {
                $(".vertical").css("top", "-" + $(".vertical").css("top"));
            }, 1500);
        });
    }
    _onSiteInitializationFailed(args) {
        console.log('failed', args);
    }
}