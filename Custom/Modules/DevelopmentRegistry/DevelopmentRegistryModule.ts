/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

// module to fire off the StartEditingFeature command since it requires use of the HtmlViewer context not available in workflow.


module oe.development_registry {

    export class DevelopmentRegistryModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        private _layerFilters: any;
        layerList: any;
        devTypeTableURL: string;
        devSubTypeTableURL: string;
        devSubTypesTable: any = {};

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);

            // When the layer list initializes we can grab a reference to the layer list object and save it for later.
            // We'll need this to add our custom layer to the layer list.
            this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, (sender: RestLayerList) => {
                // look for tables
                // sender.mapInfo.serviceLayers[0].serviceLayer.url
                this.layerList = sender;
                //let devTypeTableURL = '';
                //let devSubTypeTableURL = '';
                this.layerList.mapInfo.serviceLayers.forEach(sl => {
                    if (sl.displayName === "Development Types") {
                        this.devTypeTableURL = sl.serviceLayer.url;
                    }
                    if (sl.displayName === "Development Subtypes") {
                        this.devSubTypeTableURL = sl.serviceLayer.url;
                    }
                });
                this._getDevSubTypes();
                // add query parameters to base urls
                //let query_params = 'query?where=1%3D1&f=json&token=';
                //devTypeTableURL = devTypeTableURL.split('?token=')[0] + query_params + devTypeTableURL.split('?token=')[1];
                //devSubTypeTableURL = devSubTypeTableURL.split('?token=')[0] + query_params + devSubTypeTableURL.split('?token=')[1];
                //$.when($.ajax(devTypeTableURL), $.ajax(devSubTypeTableURL))
                //    .done((dtt, dstt) => {
                //        console.log('done getting results from tables', dtt, dstt);
                //    });
            });
        }

        initialize(config: any): void {
            this._layerFilters = config.layerFilters;
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

        _getDevSubTypes(): any {
            // add query parameters to base urls
            let query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
            let devTypeTableURL_query = this.devTypeTableURL.split('?token=')[0]
                + query_params
                + this.devTypeTableURL.split('?token=')[1];
            let devSubTypeTableURL_query = this.devSubTypeTableURL.split('?token=')[0]
                + query_params
                + this.devSubTypeTableURL.split('?token=')[1];
            $.when($.ajax(devTypeTableURL_query), $.ajax(devSubTypeTableURL_query))
                .done((dtt, dstt) => {
                    let devTypes: any[] = [];
                    let devSubTypes: any[] = [];
                    if (dtt.length) {
                        devTypes = JSON.parse(dtt[0]).features
                            ? JSON.parse(dtt[0]).features
                            : [];
                    }
                    if (dstt.length) {
                        devSubTypes = JSON.parse(dstt[0]).features
                            ? JSON.parse(dstt[0]).features
                            : [];
                    }
                    devTypes.forEach(dt => {
                        this.devSubTypesTable[dt.attributes["Development_Type"]] = {
                            id: dt.attributes["Development_Type_ID"],
                            subtypes: devSubTypes
                                .filter((dst: any) => {
                                    return dst.attributes["Development_Type_ID"] === dt.attributes["Development_Type_ID"]
                                })
                                .map((dstm: any) => {
                                    return dstm.attributes["Development_Subtype"];
                                })
                        }
                    });
                });
        }

        _processAttributeFilter(attributes: any[]): any[] {
            let layerFilters = this._layerFilters;
            if (attributes.length > 0) {
                let devType = attributes.filter(f => f.name.value === 'dst_cat').length > 0 ? attributes.filter(f => f.name.value === 'dst_cat')[0].value.value : '';
                if (devType !== '') {
                    let filteredFields = attributes.filter((f: any) => {
                        if (f.name.value === 'subcat') {
                            if (this.devSubTypesTable && f.valueOptions) {
                                let filteredCodedValues = f.domain.codedValues.filter(cd => {
                                    return this.devSubTypesTable[devType].subtypes.indexOf(cd.name) !== -1
                                });
                                f.valueOptions.value = filteredCodedValues;
                                f.domain.codedValues = filteredCodedValues;
                            }
                        }
                        return layerFilters[devType] ? layerFilters[devType].indexOf(f.name.value) !== -1 : true;
                    });
                    return filteredFields;
                }
            } else {
                return [];
            }
        }

        _onSiteInitialized(site: geocortex.essentials.Site) {
            this.app.commandRegistry.command("showFeatureEditForm").register(this, function () {
                var collection = this.app.featureSetManager.getCollectionById("add_feature");
                var feature = null;
                if (collection.featureSets.length() > 0) {
                    if (collection.featureSets.getAt(0).features.length() > 0) {
                        feature = collection.featureSets.getAt(0).features.getAt(0);
                        this.app.commandRegistry.command("StartEditingFeature").execute(feature);
                    }
                }
            });

            this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                if (args.id === "FeatureEditingContainerView") {
                    if (args.childRegions.length > 0) {
                        if (args.childRegions[0].views.length > 1) {
                            let fields = args.childRegions[0].views[1].viewModel.form.value.fields.getItems();
                            if (fields.length > 0) {
                                let filteredFields = this._processAttributeFilter(fields);
                                if (filteredFields.length > 0) {
                                    args.childRegions[0].views[1].viewModel.form.value.fields.set(filteredFields);
                                }
                            }
                        }
                    }
                }
            });

            this.app.eventRegistry.event("FeatureDetailsInvokedEvent").subscribe(this, function (args) {
                let filteredAttributes = this._processAttributeFilter(args.attributes.getItems());
                if (filteredAttributes) {
                    let filteredAttrNames = filteredAttributes.map(fa => fa.name.value);
                    args.attributes.getItems().forEach(attr => {
                        if (filteredAttrNames.indexOf(attr.name.value) === -1) {
                            attr.visible.set(false);
                        }
                    });
                }
            });
        }
    }
}