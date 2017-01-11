/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.wildfireRiskPopup {

    export class WildfireRiskPopupModuleView extends geocortex.framework.ui.ViewBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

    }
}