/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_PickerListItemRendererModule extends ModuleBase {

    app: ViewerApplication;
    targetClass: string;
    moveClass: string;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }

    initialize(config: any): void {

        this.targetClass = config.targetClass !== undefined ? config.targetClass : "";
        this.moveClass = config.moveClass !== undefined ? config.moveClass : "";
        var site = (<any>this).app.site;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args);
            });                        
        }
    }
    
    _onSiteInitialized(site) {

        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
            this._oe_renderItems(args);
        });
    }

    _oe_renderItems(args)
    {
        if (args.markupResource !== "Mapping/infrastructure/ui/components/FeatureSelector/FeatureSelectorView.html")
            return;

        $(this.targetClass).each(function () {
            var pElement = $(this).parent();
            var mElement = $(this).find(this.moveClass);
            pElement.append(mElement);            
        });
    }

}