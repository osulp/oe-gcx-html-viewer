/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.dev_registry {

    export class DevelopmentRegistryModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        private _layerFilters: any;
        private _adminGroupID: any;
        private _lineBufferCategories: any;
        private _adminHomePanleContent: any;
        private _activeFeature: any;
        layerList: any;
        devRegToken: any;
        devRegSrvcUrl: any;
        devRegUnbuffLineSrvcUrl: any;
        devRegVersionSrvcUrl: any;
        devSubTypesTable: any = {};
        devRegTablesUrl: any;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);

            // When the layer list initializes we can grab a reference to the layer list object and save it for later.
            // We'll need this to add our custom layer to the layer list.
            this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, (sender: RestLayerList) => {
                // look for tables
                this.layerList = sender;
                if (this.app.site.principal.isAuthenticated) {
                    this._getDevSubTypes();
                }
            });
        }

        initialize(config: any): void {
            //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            this._layerFilters = config.layerFilters;
            this._adminGroupID = config.adminGroupID;
            this._lineBufferCategories = config.lineBufferCategories;
            this._adminHomePanleContent = config.adminHomePanleContent;
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
                    this.devRegUnbuffLineSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/1");
                    this.devRegVersionSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/2");
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
                }).fail((err: any) => {
                    console.log('fail', err);
                });
        }
        _handleDevTypeChange(args) {
            if (args) {
                let editForm: any = this.app.viewManager.getViewById("FeatureEditingContainerView").childRegions[0].views.filter(v => v.id === 'EditorView');
                if (editForm.length > 0) {
                    let all_fields = editForm[0].viewModel.form.value["all_fields"]
                        ? editForm[0].viewModel.form.value["all_fields"]
                        : editForm[0].viewModel.form.value.fields.getItems();
                    let filtered_attr = this._processAttributeFilter(all_fields).sort();
                    try {
                        editForm[0].viewModel.form.value.fields.set(filtered_attr);
                    } catch (ex) {
                        console.log(ex.message)
                    }
                }
            }
        }

        _handleSubCatChange(args) {
            if (args) {
                if (this._lineBufferCategories.indexOf(this._activeFeature.attributes.dst_cat) !== -1) {
                    var workflowArgs = {};
                    workflowArgs["development_sub_category"] = args;
                    workflowArgs["development_voltage"] = this._activeFeature.attributes.vltg;
                    this._runRebufferWorkflow(workflowArgs);
                }
            }
        }
        _handleVoltageChange(args) {
            if (args) {
                var workflowArgs = {};
                workflowArgs["development_sub_category"] = this._activeFeature.attributes.subcat;
                workflowArgs["development_voltage"] = args;
                this._runRebufferWorkflow(workflowArgs);
            }
        }


        _runRebufferWorkflow(workflowArgs) {
            //get token to unsubscribe from GeometryEditInvokedEvent since it causes the draw/upload request.
            let subscription_token = this["eventSubscriptions"].filter(sub => sub.event.name === "GeometryEditInvokedEvent").length > 0
                ? this["eventSubscriptions"].filter(sub => sub.event.name === "GeometryEditInvokedEvent")[0].token
                : '';
            if (subscription_token !== '') {
                this.app.eventRegistry.event("GeometryEditInvokedEvent").unsubscribe(subscription_token);
            }
            workflowArgs["workflowId"] = "rebuffer_feature";
            workflowArgs["development_category"] = this._activeFeature.attributes.dst_cat;
            workflowArgs["or_dev_reg_id"] = this._activeFeature.attributes.or_dev_reg_id;
            workflowArgs["dev_reg_srvc_url"] = this.devRegUnbuffLineSrvcUrl;
            workflowArgs["dev_reg_srvc_token"] = this.devRegToken;
            this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
            this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, this._handleGeometryEditInvokeEvent);
        }

        _subscribeToValueChange(f,handlerFunction) {
            if (!f.value.bindingEvent.isPublishing) {
                let isSubscribed = false;
                for (var subscription in f.value.bindingEvent.subscriptions) {
                    isSubscribed = f.value.bindingEvent.subscriptions[subscription].scope.id
                        ? f.value.bindingEvent.subscriptions[subscription].scope.id === "module-Custom-DevelopmentRegistry"
                            ? true
                            : isSubscribed
                        : isSubscribed;
                }
                if (!isSubscribed) {
                    f.value.bindingEvent.subscribe(this, handlerFunction);
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
                            function compare(a, b) {
                                if (a.name < b.name)
                                    return -1;
                                if (a.name > b.name)
                                    return 1;
                                return 0;
                            }

                            f.valueOptions.value.sort(compare);
                        }
                        if (f.name.value === 'subcat' && f.valueOptions) {
                            if (this.devSubTypesTable) {
                                let filteredCodedValues = [];
                                f.domain.codedValues.forEach(cv => {
                                    if (devType) {
                                        if (this.devSubTypesTable[devType].subtypes.indexOf(cv.name) !== -1) {
                                            filteredCodedValues.push(cv);
                                        }
                                    } else {
                                        filteredCodedValues.push(cv);
                                    }
                                });
                                f.valueOptions.value = filteredCodedValues;
                            }
                            this._subscribeToValueChange(f, this._handleSubCatChange);
                        }
                        if (f.name.value === 'or_dev_reg_proj_id') {
                            if (f.readOnly) {
                                f.readOnly.set(true);
                            }
                        }
                        if (f.name.value === 'vltg' && f.valueOptions) {
                            f.displayName.set("Voltage *");
                            f.required.set(true);
                            this._subscribeToValueChange(f, this._handleVoltageChange);
                        }
                        //get default plus and devType specific attributes for display
                        let _filteredAttr = layerFilters['Default'] ? layerFilters['Default'] : [];
                        if (layerFilters[devType]) {
                            _filteredAttr = _filteredAttr.concat(layerFilters[devType]);
                        }
                        return _filteredAttr.indexOf(f.name.value) !== -1;
                        //return layerFilters[devType] ? layerFilters[devType].indexOf(f.name.value) !== -1 : true;
                    });
                    return filteredFields;
                }
            } else {
                return [];
            }
        }


        _handleGeometryEditInvokeEvent(args) {
            var thisScope = this;
            //check if linear feature and if so send to workflow for digitize, else can digitize on map in context
            var isLinear = this._lineBufferCategories.indexOf(args.attributes["dst_cat"]) !== -1;
            this.app.commandRegistry.commands["Confirm"].execute("Would you like to upload a shapefile(zipped) or use the map to modify the shape of this development?", "Upload Shapefile or use map?", function (result) {
                if (result || isLinear) {
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "add_edit_dev_features";
                    workflowArgs["srvc_url"] = thisScope.devRegSrvcUrl;
                    workflowArgs["srvc_token"] = thisScope.devRegToken;
                    workflowArgs["workflow_action"] = isLinear
                        ? result
                            ? "Upload"
                            : "Digitize"
                        : "Upload";
                    workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                    thisScope.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    //$('.button:contains("Save Geometry")').click();
                    thisScope.app.commandRegistry.commands["saveAndCloseFeatureEditing"].execute();
                    //$('.button:contains("Save")').click();
                    args.hide();
                }
            });
            $(".confirm .button:contains('OK')").html("Upload New Shape");
            $(".confirm .button:contains('Cancel')").html("Use Map");
            //var isUpload = false;
        }



        _onSiteInitialized(site: geocortex.essentials.Site) {
            let thisModel = this;

            if (this.app.site.principal.isAuthenticated) {
                //set home panel content
                this.app.viewManager.getViewById("HomePanelContainerView").viewModel.currentView.viewModel.content.set(decodeURIComponent(this._adminHomePanleContent));

                //Add command to show the edit form for a newly added/edit requested feature in add_edit_dev_features workflow
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

                this.app.commandRegistry.command("saveAndCloseFeatureEditing").register(this, function () {
                    $('.button:contains("Save")').click();
                });

                this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                    if (args.id === "FeatureEditingContainerView") {
                        if (args.childRegions.length > 0) {
                            if (args.childRegions[0].views.length > 1) {
                                let editView = args.childRegions[0].views.filter(v => v.id === "EditorView");
                                if (editView.length > 0) {
                                    this._activeFeature = editView[0].viewModel.currentFeatureEsri;
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
                                //hide delete button if not in appropriate group
                                let isAdmin = this.app.site.principal.identities.length > 0
                                    ? this.app.site.principal.identities[0].claims.filter((c: any) => c.value === this._adminGroupID).length > 0
                                    : false;
                                if (!isAdmin) {
                                    $('.button:contains("Delete")').hide();
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

                this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, this._handleGeometryEditInvokeEvent);

                this.app.event("WorkflowCompletedEvent").subscribe(this, (workflow: geocortex.essentials.Workflow, workflowOutputs: geocortex.workflow.ArgumentInfo[]): void => {
                    if (workflow.id !== "edit_geometry") {
                        return;
                    }
                });

                this.app.eventRegistry.event("FeatureEditedEvent").subscribe(this, (feature) => {
                    //check if any changes beside edit time
                    let hasUpdate = JSON.stringify(feature.editedFeature.toJson()) !== JSON.stringify(feature.originalFeature.toJson())

                    if (hasUpdate) {
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "add_feature_version";
                        workflowArgs["featureGraphic"] = feature.editedFeature;
                        workflowArgs["srvc_url"] = this.devRegVersionSrvcUrl;
                        workflowArgs["srvc_token"] = this.devRegToken;
                        this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    }

                });
            }

            this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                if (args.id === "LayerDataContainerView") {
                    var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerListView"; });
                    layerListView[0].viewModel.layerListItems.value.forEach((group: any) => {
                        var layers = group.children.value.forEach((layer) => {
                            var uniqueCategories = [];
                            var legendItems = layer.legendItems.getItems().filter((category) => {
                                if (uniqueCategories.indexOf(category.label.value) === -1) {
                                    uniqueCategories.push(category.label.value);
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            layer.legendItems.set(legendItems);
                        });
                    });
                }
            });

        }
    }
}