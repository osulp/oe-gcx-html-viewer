/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module quickStart.template {

    export class TemplateModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        greeting: Observable<string> = new Observable<string>();

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            if (config) {
                this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
            }

        }

    }
}