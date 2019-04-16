/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { Workflow } from "geocortex/essentials/Workflow";

export class OE_SageGrouseDevRegistryModule extends ModuleBase {

    app: ViewerApplication;    
    private _layerFilters: any;
    private _adminGroupID: any;
    private _lineBufferCategories: any;
    private _lineBufferSubCategories: any;
    private _publicViewerTitle: any;
    private _editorViewerTitle: any;
    private _adminHomePanelContent: any;
    private _activeFeature: any;
    private _tempSubCat: any;
    private _tempCloneEditGeometry: any;
    private _projNameUpdated: boolean = false;
    private _productionAgolUrl: any;
    private _devAgolUrl: any;
    layerList: any;
    devRegToken: any;
    devRegSrvcUrl: any;
    devRegUnbuffLineSrvcUrl: any;
    devRegVersionSrvcUrl: any;
    devRegProjectsSrvcUrl: any;
    devSubTypesTable: any = {};
    devRegTablesUrl: any;
    devRegAgolSrvcUrl: any;

    constructor(app: ViewerApplication, lib: string) {
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
        this._lineBufferSubCategories = config.lineBufferSubCats;
        this._adminHomePanelContent = config.adminHomePanelContent;
        this._productionAgolUrl = config.productionAgolUrl;
        this._devAgolUrl = config.devAgolUrl;
        this._publicViewerTitle = config.publicViewerTitle || "Sage-Grouse Development Registry Viewer";
        this._editorViewerTitle = config.editorViewerTitle || "Sage-Grouse Development Registry Editor";
        var site: Site = (<any>this).app.site;
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
                this.devRegAgolSrvcUrl = this.app.site.url.match('dev_reg_dev')
                    ? 'dev'  // this._devAgolUrl
                    : 'prod'; // this._productionAgolUrl;
                this.devRegUnbuffLineSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/1");
                this.devRegVersionSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/2");
                this.devRegProjectsSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/3");
            }
        });

        // add query parameters to base urls
        //let query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
        let query_params = '/query?where=1%3D1&outFields=*&f=json&token=';
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
            //if (this._lineBufferCategories.indexOf(this._activeFeature.attributes.dst_cat) !== -1) {
            this._tempSubCat = args;
            if (this._lineBufferSubCategories.indexOf(args) !== -1) {
                var workflowArgs = {};
                workflowArgs["development_sub_category"] = args;
                workflowArgs["development_voltage"] = this._activeFeature.attributes.vltg;
                this._runRebufferWorkflow(workflowArgs);
            }
        }
    }
    _handleVoltageChange(args) {
        let subcat = this._tempSubCat ? this._tempSubCat : this._activeFeature.attributes.subcat;
        if (args && this._lineBufferSubCategories.indexOf(subcat) !== -1) {
            var workflowArgs = {};
            workflowArgs["development_sub_category"] = this._activeFeature.attributes.subcat;
            workflowArgs["development_voltage"] = args;
            this._runRebufferWorkflow(workflowArgs);
        }
    }

    _handleProjNameChange(args) {
        console.log('proj name changed', args);
        this._projNameUpdated = true;
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

    _subscribeToValueChange(f, handlerFunction) {
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
                        //function compare(a, b) {
                        //    if (a.name < b.name)
                        //        return -1;
                        //    if (a.name > b.name)
                        //        return 1;
                        //    return 0;
                        //}

                        f.valueOptions.value.sort((a, b) => {
                            if (a.name < b.name)
                                return -1;
                            if (a.name > b.name)
                                return 1;
                            return 0;
                        });
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
                        //if (f.readOnly) {
                        //    f.readOnly.set(true);
                        //}
                        this._subscribeToValueChange(f, this._handleProjNameChange);
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
        //close map tip
        this.app.commandRegistry.commands["HideMapTips"].execute();
        //this.app.commandRegistry.commands["EnableMapTips"].execute();
        var thisScope = this;
        //check if linear feature and if so send to workflow for digitize, else can digitize on map in context
        var isLinear = this._lineBufferCategories.indexOf(args.attributes["dst_cat"]) !== -1;
        //this.app.commandRegistry.commands["MeasureArea"].execute(args.geometry);
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

    _handleDisplayModifications(isAuthenticated) {
        $(".banner-title").html(isAuthenticated ? this._editorViewerTitle : this._publicViewerTitle);
        if ($(window).width() < 1200) {
            //$(".banner-title").css("fontSize","1.5em");
        }
        $(".panel-filter-widget").css("display", "none");
        $(".layer-list").css("top", "0.5em");
        $(".sign-in button").html("Editor Sign-in");

    }

    _handleMeasureArea() {
        let clonedGraphics = getGraphicsLayer("editor_clone_layer", false, this.app);
        let editingLayer = getGraphicsLayer("editing_layer", false, this.app);
        clonedGraphics = editingLayer || clonedGraphics;
        //hide the scale and resize svg since the measuring overaly does not sync with those events...
        //$("#map_graphics_layer path").text("");
        if (clonedGraphics.graphics.length > 0) {
            if (this._tempCloneEditGeometry) {
                this.app.commandRegistry.commands["DeleteMeasurement"].execute(this._tempCloneEditGeometry);
                $("#Drawings_measurement_layer").text("");

            }
            this._tempCloneEditGeometry = clonedGraphics.graphics[0].geometry;
            this.app.commandRegistry.commands["MeasureArea"].execute(clonedGraphics.graphics[0]);

        }
    }

    onQueryResult(features, fieldName) {
        if (features.length > 0) {
            this.app.commandRegistry.command("StartEditingFeature").execute(features[0]);
        }

    }

    _onSiteInitialized(site: Site) {
        let thisModel = this;
        let isAuthenticated = this.app.site.principal.isAuthenticated;
        this._handleDisplayModifications(isAuthenticated);
        let isAdmin = this.app.site.principal.identities.length > 0
            ? this.app.site.principal.identities[0].claims.filter((c: any) => c.value === this._adminGroupID).length > 0
            : false;
        this.app.commandRegistry.command("oe_assign_lg_scale").register(this, () => {
            var workflowArgs = {};
            workflowArgs["workflowId"] = "assignLgScaleSdartt";
            this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
        }, () => {
            return isAdmin;
        });
        this.app.commandRegistry.command("oe_dev_reg_user_guide").register(this, (url: string) => {
            this.app.commandRegistry.commands["OpenWebPage"].execute(url);
        }, () => {
            return isAuthenticated;
        });
        this.app.commandRegistry.commands["SetMeasurementUnits"].execute("feet", "acre");
        if (isAuthenticated) {
            //set home panel content
            try {
                //this.app.viewManager.getViewById("InfoView").viewModel.content.set(decodeURIComponent(this._adminHomePanelContent));
                this.app.commandRegistry.commands["ShowHomePanel"].execute();

                //Add command to show the edit form for a newly added/edit requested feature in add_edit_dev_features workflow
                this.app.commandRegistry.command("showFeatureEditForm").register(this, function (objectid?: any) {
                    var collection = this.app.featureSetManager.getCollectionById("add_feature");
                    if (collection) {
                        var feature = null;
                        if (collection.featureSets.length() > 0) {
                            collection.featureSets.value.forEach((fs: any) => {
                                fs.features.value.forEach((f: any) => {
                                    let objid = f.attributes.value.filter((a: any) =>
                                        a.name.value === "OBJECTID");
                                    feature = objid[0].value.value.toString() === objectid ? f : feature;

                                });
                            });
                            if (!feature && collection.featureSets.getAt(0).features.length() > 0) {
                                feature = collection.featureSets.getAt(0).features.getAt(0);
                            }
                            this.app.commandRegistry.command("StartEditingFeature").execute(feature);
                        }
                    }
                });

                //Add project impact report to map tip links if Oregon Development Projects
                this.app.commandRegistry.command("oe_project_report").register(this, (graphic) => {
                    let dev_reg_id = "";
                    graphic.attributes.value.forEach((attr) => {
                        if (attr.displayName.value === "or_dev_reg_id") {
                            dev_reg_id = attr.value.value;
                        }
                    });
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "map_tip_project_impact_report";
                    workflowArgs["_devRegSrvc"] = this.devRegSrvcUrl;
                    workflowArgs["_devRegToken"] = this.devRegToken;
                    workflowArgs["_devRegAgolSrvc"] = this.devRegAgolSrvcUrl;
                    workflowArgs["_or_dev_reg_id"] = dev_reg_id;
                    //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                    this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);

                }, (graphic) => {
                    //can execute?
                    return graphic.layer.displayName === "Oregon Development Projects";
                });

                //Add Delete Measurement to map tip only for Oregon Development Projects features
                this.app.commandRegistry.command("oe_delete_measurement").register(this, (graphic) => {
                    this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.esriFeature.value);
                    let measureGraphic = getGraphicsLayer("Drawings_measurement", false, this.app);
                    if (measureGraphic) {
                        if (measureGraphic.graphics.length > 0) {
                            this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureGraphic.graphics[0].geometry);
                        }
                    }
                    $("#Drawings_measurement_layer").text("");
                    this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                }, (graphic) => {
                    //can execute?
                    let canShow = false;
                    let measureLayer = getGraphicsLayer("Drawings_measurement", false, this.app);
                    if (measureLayer) {
                        canShow = measureLayer.graphics.length > 0;
                    }
                    return graphic.layer.displayName === "Oregon Development Projects" && canShow;
                });

                //Add Measure Area to map tip only for Oregon Development Projects features
                this.app.commandRegistry.command("oe_measurement_area").register(this, (graphic) => {
                    //var thisScope = this;
                    //window.setTimeout(() => {
                    //    thisScope.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);
                    //}, 1000);
                    //$(".list-menu-button:contains('Delete Measurement')").css("display", "block");
                    this.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);

                }, (graphic) => {
                    //can execute?
                    return graphic.layer.displayName === "Oregon Development Projects";
                });

                //Runs workflow add_edit_dev_features to walk through adding or editing a develoment
                this.app.commandRegistry.command("runAddEditDevFeatures").register(this, function () {
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "add_edit_dev_features";
                    workflowArgs["site_uri"] = this.app.site.originalUrl + '/map?f=json';
                    workflowArgs["srvc_url"] = this.devRegSrvcUrl;
                    workflowArgs["srvc_token"] = this.devRegToken;
                    workflowArgs["srvc_tables_url"] = this.devRegTablesUrl;
                    workflowArgs["dev_reg_agol_srvc"] = this.devRegAgolSrvcUrl;
                    //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                });

                this.app.commandRegistry.command("saveAndCloseFeatureEditing").register(this, function () {
                    try {
                        $('.button:contains("Save")').click();
                    } catch (ex) {
                        console.log(ex.message);
                    }
                });

                //EVENTS SUBSCRIPTIONS///
                this.app.eventRegistry.event("MeasurementMarkupAdded").subscribe(this, (sender) => {
                    this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                });

                this.app.eventRegistry.event("GraphicVertexAddedEvent").subscribe(this, (sender, a, b, c) => {
                    console.log('graphic vertex added event', sender);
                });

                this.app.eventRegistry.event("GraphicDrawCompletedEvent").subscribe(this, (sender) => {
                    if (!this.app.toolRegistry.getActiveTool()) {
                        this.app.commandRegistry.commands[["polyline", "line"].indexOf(sender.type) !== -1 ? "MeasureDistance" : "MeasureArea"].execute(sender);
                        console.log('graphic drawn', sender);
                    }
                });

                this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, (sender) => {
                    if (!this.app.toolRegistry.getActiveTool()) {
                        let measureLayer = getGraphicsLayer("Drawings_measurement", false, this.app);
                        if (measureLayer) {
                            if (measureLayer.graphics.length > 0) {
                                this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureLayer.graphics[0].geometry);
                            }
                        }
                    }
                });


                this.app.eventRegistry.event("GeometryChangedEvent").subscribe(this, (sender) => {
                    if (sender.graphic.getLayer().id === "editing_layer") {
                        this._handleMeasureArea();
                    }
                    //this._handleMeasureArea();
                });

                this.app.eventRegistry.event("LayerRemovedEvent").subscribe(this, (sender) => {
                    console.log('layer removed', sender);
                    if (sender.id === "editing_layer") {
                        this.app.commandRegistry.commands["DeleteMeasurement"].execute(this._tempCloneEditGeometry);
                        $("#Drawings_measurement_layer").text("");
                    }
                });

                this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                    if (args.id === "FeatureEditingContainerView" || (args.app.shellName === "Handheld" && args.id === "ResultsViewContainerView")) {
                        //close map tip
                        this.app.commandRegistry.commands["HideMapTips"].execute();
                        this.app.commandRegistry.commands["EnableMapTips"].execute();
                        args.childRegions.forEach((cr: any) => {
                            let editView = cr.views.filter(v => v.id === "EditorView");
                            if (editView.length > 0) {
                                this._activeFeature = editView[0].viewModel.currentFeatureEsri;
                                if (this._activeFeature) {
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
                            //hide delete button if not in appropriate group
                            //let isAdmin = this.app.site.principal.identities.length > 0
                            //? this.app.site.principal.identities[0].claims.filter((c: any) => c.value === this._adminGroupID).length > 0
                            //: false;
                            if (!isAdmin) {
                                $('.button:contains("Delete")').hide();
                            }
                        });
                    }
                    if (args.id === "DataFrameViewContainer") {
                        //add pop-up for large scale description
                        $('label:contains("Large Scale")').append('<a href="javascript:void()">?</a>');
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

                this.app.event("WorkflowCompletedEvent").subscribe(this, (workflow: Workflow): void => {
                    if (workflow.id !== "edit_geometry") {
                        return;
                    }
                });

                this.app.eventRegistry.event("FeatureEditedEvent").subscribe(this, (feature) => {
                    //check if any changes beside edit time
                    let hasUpdate = JSON.stringify(feature.editedFeature.toJson()) !== JSON.stringify(feature.originalFeature.toJson());
                    if (this._projNameUpdated) {
                        //look up and add new name if necessary
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "update_proj_name";
                        workflowArgs["projName"] = feature.editedFeature.attributes["or_dev_reg_proj_id"];
                        workflowArgs["srvc_url"] = this.devRegProjectsSrvcUrl;
                        workflowArgs["srvc_token"] = this.devRegToken;
                        this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    }
                    this._projNameUpdated = false;
                    //this.app.commandRegistry.commands["MeasureArea"].execute(feature.editedFeature);
                    if (hasUpdate) {
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "add_feature_version";
                        workflowArgs["featureGraphic"] = feature.editedFeature;
                        workflowArgs["srvc_url"] = this.devRegVersionSrvcUrl;
                        workflowArgs["srvc_token"] = this.devRegToken;
                        this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                    }

                });
                //workaround to get the authenticated layer list to process svg formatting event
                var thisScope = this;
                window.setTimeout(() => {
                    thisScope.app.commandRegistry.commands["SwitchToLayerView"].execute();
                }, 50);
            } catch (ex) {
                alert(ex.message);
            }
        }
        else {
            var workflowArgs = {};
            workflowArgs["workflowId"] = "disclaimer";
            workflowArgs["shellName"] = this.app.shellName;
            this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
        }

        this.app.eventRegistry.event("FeatureDeletedEvent").subscribe(this, (graphic) => {
            this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.Geometry);
        });

        this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
            if (args.id === "LayerDataContainerView") {
                var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerListView"; });
                if (layerListView.length > 0) {
                    layerListView[0].viewModel.layerListItems.value.forEach((group: any) => {
                        var layers = group.children.value.forEach((layer) => {
                            var uniqueCategories = [];
                            var legendItems = layer.legendItems.getItems().filter((category) => {
                                if (category.swatchElement.match("<svg ")) {
                                    category.swatchElement = category.swatchElement
                                        .replace('width="32"', 'width="24"')
                                        .replace('height="32"', 'height="24"')
                                        .replace('M-10-10L 10 0L 10 10L-10 10L-10-10Z', 'M 8-8L 8 0L 8 8L-8 8L-8-8Z')
                                        .replace('d="M -10 -10 L 10 0 L 10 10 L -10 10 L -10 -10 Z" path="M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"', 'd="M 8 -8 L 8 0 L 8 8 L -8 8 L -8 -8 Z" path="M -8,-8 L 8,0 L 8,8 L -8,8 L -8,-8 Z"');
                                }
                                if (uniqueCategories.indexOf(category.label.value) === -1) {
                                    uniqueCategories.push(category.label.value);
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            layer.legendItems.set(legendItems);
                            $(".legend-swatch svg").css("paddingLeft", ".5em");
                        });
                    });
                }
            }
        });
    }
}