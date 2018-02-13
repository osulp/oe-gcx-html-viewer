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

    //thisModule: Observable<OE_PickerListItemRendererModule> = new Observable(null);

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.targetClass = config.targetClass !== undefined ? config.targetClass : "";
        this.moveClass = config.moveClass !== undefined ? config.moveClass : "";
        var site = (<any>this).app.site;

        //this.thisModule = this;
                                        
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
        //let thisModel = this;
        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
            this._oe_renderItems(args, this.targetClass, this.moveClass);
        });
    }

    _oe_renderItems(args, targetClassString, moveClassString)
    {
        if (args.markupResource !== "Mapping/infrastructure/ui/components/FeatureSelector/FeatureSelectorView.html")
            return;

        $(targetClassString).each(function () {
            var pElement = $(this).parent();
            var mElement = $(this).find(moveClassString);
            pElement.append(mElement);            
        });
    }

}