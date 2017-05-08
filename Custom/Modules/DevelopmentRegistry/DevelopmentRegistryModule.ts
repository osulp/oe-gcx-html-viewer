/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

// module to fire off the StartEditingFeature command since it requires use of the HtmlViewer context not available in workflow.


module oe.development_registry {

    export class DevelopmentRegistryModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        private _layerFilters: any;
        layerList: any;
        devRegToken: any;
        devRegSrvcUrl: any;
        devSubTypesTable: any = {};
        devRegTablesUrl: any;
        // devAttributes: any;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);

            // When the layer list initializes we can grab a reference to the layer list object and save it for later.
            // We'll need this to add our custom layer to the layer list.
            this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, (sender: RestLayerList) => {
                // look for tables
                this.layerList = sender;
                this._getDevSubTypes();
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
            let devTypeTableURL;
            let devSubTypeTableURL;
            this.layerList.mapInfo.serviceLayers.forEach(sl => {
                if (sl.displayName === "Development Types") {
                    devTypeTableURL = sl.serviceLayer.url;
                    this.devRegTablesUrl = sl.gcxMapService.serviceUrl;
                }
                if (sl.displayName === "Development Subtypes") {
                    devSubTypeTableURL = sl.serviceLayer.url;
                }
                if (sl.displayName === "All developments") {
                    this.devRegSrvcUrl = sl.gcxMapService.serviceUrl;
                    this.devRegToken = sl.gcxMapService.serviceToken;
                }
            });

            // add query parameters to base urls
            let query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
            let devTypeTableURL_query = devTypeTableURL.split('?token=')[0]
                + query_params
                + devTypeTableURL.split('?token=')[1];
            let devSubTypeTableURL_query = devSubTypeTableURL.split('?token=')[0]
                + query_params
                + devSubTypeTableURL.split('?token=')[1];
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

        _handleDevTypeChange(args) {
            if (args) {
                let editForm: any = this.app.viewManager.getViewById("FeatureEditingContainerView").childRegions[0].views.filter(v => v.id === 'EditorView');
                if (editForm.length > 0) {
                    let all_fields = editForm[0].viewModel.form.value["all_fields"]
                        ? editForm[0].viewModel.form.value["all_fields"]
                        : editForm[0].viewModel.form.value.fields.getItems();
                    let filtered_attr = this._processAttributeFilter(all_fields);
                    try {
                        editForm[0].viewModel.form.value.fields.set(filtered_attr);
                    } catch (ex) {
                        console.log(ex.message)
                    }
                }
            }
        }

        _processAttributeFilter(attributes: any[]): any[] {
            let layerFilters = this._layerFilters;
            if (attributes.length > 0) {
                let devType = attributes.filter(f => f.name.value === 'dst_cat').length > 0 ? attributes.filter(f => f.name.value === 'dst_cat')[0].value.value : '';
                if (devType !== '') {
                    let filteredFields = attributes.filter((f: any) => {
                        if (f.name.value === 'dst_cat' && f.valueOptions) {
                            //f.value.bindingEvent.publish();
                            if (!f.value.bindingEvent.isPublishing) {
                                f.value.bindingEvent.subscribe(this, this._handleDevTypeChange);
                            }
                        }
                        if (f.name.value === 'subcat') {
                            if (this.devSubTypesTable && f.valueOptions) {
                                let filteredCodedValues = [];
                                f.domain.codedValues.forEach(cv => {
                                    if (this.devSubTypesTable[devType].subtypes.indexOf(cv.name) !== -1) {
                                        filteredCodedValues.push(cv);
                                    }
                                });
                                //let filteredCodedValues = f.domain.codedValues.filter(cd => {
                                //    return this.devSubTypesTable[devType].subtypes.indexOf(cd.name) !== -1
                                //});
                                f.valueOptions.value = filteredCodedValues;
                            }
                        }
                        if (f.name.value === 'or_dev_reg_proj_id') {
                            if (f.readOnly) {
                                f.readOnly.set(true);
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

            this.app.commandRegistry.command("runAddEditDevFeatures").register(this, function () {
                var workflowArgs = {};
                workflowArgs["workflowId"] = "add_edit_dev_features";
                workflowArgs["site_uri"] = this.app.site.originalUrl + '/map?f=json';
                workflowArgs["srvc_url"] = this.devRegSrvcUrl;
                workflowArgs["srvc_token"] = this.devRegToken;
                workflowArgs["srvc_tables_url"] = this.devRegTablesUrl;
                //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            });

            this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                if (args.id === "FeatureEditingContainerView" && !args.isActive) {
                    if (args.childRegions.length > 0) {
                        if (args.childRegions[0].views.length > 1) {
                            let editView = args.childRegions[0].views.filter(v => v.id === "EditorView");
                            if (editView.length > 0) {
                                const attr = editView[0].viewModel.form.value.fields.getItems();
                                if (attr.length > 0) {
                                    if (!editView[0].viewModel.form.value["all_fields"]) {
                                        editView[0].viewModel.form.value["all_fields"] = [];
                                        editView[0].viewModel.form.value.fields.value.forEach(f => {
                                            editView[0].viewModel.form.value["all_fields"].push(f);
                                        });
                                    }
                                    let filteredFields = this._processAttributeFilter(attr);
                                    if (filteredFields.length > 0) {
                                        editView[0].viewModel.form.value.fields.set(filteredFields);
                                    }
                                }
                            }
                        }
                    }
                }
            });

            this.app.eventRegistry.event("FeatureDetailsInvokedEvent").subscribe(this, function (args) {
                //let filteredAttributes = this._processAttributeFilter(this.devAttributes ? this.devAttributes : args.attributes.getItems());
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

            this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, function (args, test) {
                this.app.commandRegistry.commands.Confirm.execute("Would you like to upload a shapefile(zipped) or use the map to modify the shape of this development?", "Upload Shapefile or use map?", (result) => {
                    console.log('user selection', result);
                    if (result) {
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "add_edit_dev_features";
                        workflowArgs["srvc_url"] = this.devRegSrvcUrl;
                        workflowArgs["srvc_token"] = this.devRegToken;
                        workflowArgs["workflow_action"] = "Edit";
                        workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                        //call
                        //this.openFileDialog(".zip", (file) => {
                        //    console.log('file', file);
                        //});
                        $('.button:contains("Save Geometry")').click();
                        $('.button:contains("Save")').click();

                    }
                    //else {
                    //    args.draw();
                    //}
                });
                $(".confirm .button:contains('OK')").html("Upload New Shape");
                $(".confirm .button:contains('Cancel')").html("Use Map");
                //var isUpload = false;

            });

            this.app.event("WorkflowCompletedEvent").subscribe(this, (workflow: geocortex.essentials.Workflow, workflowOutputs: geocortex.workflow.ArgumentInfo[]): void => {
                if (workflow.id !== "edit_geometry") {
                    return;
                }
            });


        }
    }
}
