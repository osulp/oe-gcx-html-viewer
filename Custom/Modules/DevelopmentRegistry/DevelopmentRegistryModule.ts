/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

// module to fire off the StartEditingFeature command since it requires use of the HtmlViewer context not available in workflow.


module oe.development_registry {

    export class DevelopmentRegistryModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            var site: geocortex.essentials.Site = (<any>this).app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }
        }

        _onSiteInitialized(site: geocortex.essentials.Site) {
            var _this = this;
            this.app.commandRegistry.command("showFeatureEditForm").register(this, function () {
                var collection = this.app.featureSetManager.getCollectionById("add_feature");
                var feature = null;
                if (collection.featureSets.length() > 0) {
                    if (collection.featureSets.getAt(0).features.length() > 0) {
                        feature = collection.featureSets.getAt(0).features.getAt(0);
                        _this.app.commandRegistry.command("StartEditingFeature").execute(feature);
                    }
                }

            });

        }
    }
}