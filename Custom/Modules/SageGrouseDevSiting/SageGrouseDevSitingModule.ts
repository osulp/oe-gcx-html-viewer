/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.SageGrouseDevSiting {   

    export class SageGrouseDevSitingModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {
            //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
        }
    }
}