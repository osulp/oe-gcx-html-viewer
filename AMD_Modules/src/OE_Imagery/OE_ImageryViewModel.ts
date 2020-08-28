/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";

export class ImageryViewModel extends ViewModelBase {

    app: ViewerApplication;
    greeting: Observable<string> = new Observable<string>();

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        var site: Site = (<any>this).app.site;

        var thisViewModel = this;        

        this.app.registerActivityIdHandler("runCompareImagery", (wc) => {
            console.log('whatup?!');
            this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare1");
            this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare2");
        });

        this.app.registerActivityIdHandler("runIdentifyDownloadImagery", (wc) => {
            this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewResults");
        });

    }
}