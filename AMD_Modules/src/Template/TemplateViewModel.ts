/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";

export class TemplateViewModel extends ViewModelBase {

    app: ViewerApplication;
    greeting: Observable<string> = new Observable<string>();

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        if (config) {
            this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "language-hello-world-greeting"));
        }
    }
}