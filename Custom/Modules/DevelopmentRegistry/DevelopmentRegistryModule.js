/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModule = (function (_super) {
            __extends(DevelopmentRegistryModule, _super);
            function DevelopmentRegistryModule(app, lib) {
                var _this = this;
                _super.call(this, app, lib);
                this._projNameUpdated = false;
                this.devSubTypesTable = {};
                // When the layer list initializes we can grab a reference to the layer list object and save it for later.
                // We'll need this to add our custom layer to the layer list.
                this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, function (sender) {
                    // look for tables
                    _this.layerList = sender;
                    if (_this.app.site.principal.isAuthenticated) {
                        _this._getDevSubTypes();
                    }
                });
            }
            DevelopmentRegistryModule.prototype.initialize = function (config) {
                var _this = this;
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
                var site = this.app.site;
                if (site && site.isInitialized) {
                    this._onSiteInitialized(site);
                }
                else {
                    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                        _this._onSiteInitialized(args);
                    });
                }
            };
            DevelopmentRegistryModule.prototype._getDevSubTypes = function () {
                var _this = this;
                var devTypeTableURL;
                var devSubTypeTableURL;
                this.layerList.mapInfo.serviceLayers.forEach(function (sl) {
                    if (sl.displayName === "Development Types") {
                        devTypeTableURL = sl.serviceLayer.url;
                        _this.devRegTablesUrl = sl.gcxMapService.serviceUrl;
                    }
                    if (sl.displayName === "Development Subtypes") {
                        devSubTypeTableURL = sl.serviceLayer.url;
                    }
                    if (sl.displayName === "All developments") {
                        _this.devRegSrvcUrl = sl.gcxMapService.serviceUrl;
                        _this.devRegToken = sl.gcxMapService.serviceToken;
                        _this.devRegAgolSrvcUrl = _this.app.site.url.match('dev_reg_dev')
                            ? 'dev' // this._devAgolUrl
                            : 'prod'; // this._productionAgolUrl;
                        _this.devRegUnbuffLineSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/1");
                        _this.devRegVersionSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/2");
                        _this.devRegProjectsSrvcUrl = sl.gcxMapService.serviceUrl.replace("/0", "/3");
                    }
                });
                // add query parameters to base urls
                //let query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
                var query_params = '/query?where=1%3D1&outFields=*&f=json&token=';
                var devTypeTableURL_query = devTypeTableURL.split('?token=')[0]
                    + query_params
                    + devTypeTableURL.split('?token=')[1];
                var devSubTypeTableURL_query = devSubTypeTableURL.split('?token=')[0]
                    + query_params
                    + devSubTypeTableURL.split('?token=')[1];
                $.when($.ajax(devTypeTableURL_query), $.ajax(devSubTypeTableURL_query))
                    .done(function (dtt, dstt) {
                    var devTypes = [];
                    var devSubTypes = [];
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
                    devTypes.forEach(function (dt) {
                        _this.devSubTypesTable[dt.attributes["Development_Type"]] = {
                            id: dt.attributes["Development_Type_ID"],
                            subtypes: devSubTypes
                                .filter(function (dst) {
                                return dst.attributes["Development_Type_ID"] === dt.attributes["Development_Type_ID"];
                            })
                                .map(function (dstm) {
                                return dstm.attributes["Development_Subtype"];
                            })
                        };
                    });
                }).fail(function (err) {
                    console.log('fail', err);
                });
            };
            DevelopmentRegistryModule.prototype._handleDevTypeChange = function (args) {
                if (args) {
                    var editForm = this.app.viewManager.getViewById("FeatureEditingContainerView").childRegions[0].views.filter(function (v) { return v.id === 'EditorView'; });
                    if (editForm.length > 0) {
                        var all_fields = editForm[0].viewModel.form.value["all_fields"]
                            ? editForm[0].viewModel.form.value["all_fields"]
                            : editForm[0].viewModel.form.value.fields.getItems();
                        var filtered_attr = this._processAttributeFilter(all_fields).sort();
                        try {
                            editForm[0].viewModel.form.value.fields.set(filtered_attr);
                        }
                        catch (ex) {
                            console.log(ex.message);
                        }
                    }
                }
            };
            DevelopmentRegistryModule.prototype._handleSubCatChange = function (args) {
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
            };
            DevelopmentRegistryModule.prototype._handleVoltageChange = function (args) {
                var subcat = this._tempSubCat ? this._tempSubCat : this._activeFeature.attributes.subcat;
                if (args && this._lineBufferSubCategories.indexOf(subcat) !== -1) {
                    var workflowArgs = {};
                    workflowArgs["development_sub_category"] = this._activeFeature.attributes.subcat;
                    workflowArgs["development_voltage"] = args;
                    this._runRebufferWorkflow(workflowArgs);
                }
            };
            DevelopmentRegistryModule.prototype._handleProjNameChange = function (args) {
                console.log('proj name changed', args);
                this._projNameUpdated = true;
            };
            DevelopmentRegistryModule.prototype._runRebufferWorkflow = function (workflowArgs) {
                //get token to unsubscribe from GeometryEditInvokedEvent since it causes the draw/upload request.
                var subscription_token = this["eventSubscriptions"].filter(function (sub) { return sub.event.name === "GeometryEditInvokedEvent"; }).length > 0
                    ? this["eventSubscriptions"].filter(function (sub) { return sub.event.name === "GeometryEditInvokedEvent"; })[0].token
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
            };
            DevelopmentRegistryModule.prototype._subscribeToValueChange = function (f, handlerFunction) {
                if (!f.value.bindingEvent.isPublishing) {
                    var isSubscribed = false;
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
            };
            DevelopmentRegistryModule.prototype._processAttributeFilter = function (attributes) {
                var _this = this;
                var layerFilters = this._layerFilters;
                if (attributes.length > 0) {
                    var devType_1 = attributes.filter(function (f) { return f.name.value === 'dst_cat'; }).length > 0 ? attributes.filter(function (f) { return f.name.value === 'dst_cat'; })[0].value.value : '';
                    if (devType_1 !== '') {
                        var filteredFields = attributes.filter(function (f) {
                            if (f.name.value === 'dst_cat' && f.valueOptions) {
                                //f.value.bindingEvent.publish();
                                if (!f.value.bindingEvent.isPublishing) {
                                    f.value.bindingEvent.subscribe(_this, _this._handleDevTypeChange);
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
                                if (_this.devSubTypesTable) {
                                    var filteredCodedValues_1 = [];
                                    f.domain.codedValues.forEach(function (cv) {
                                        if (devType_1) {
                                            if (_this.devSubTypesTable[devType_1].subtypes.indexOf(cv.name) !== -1) {
                                                filteredCodedValues_1.push(cv);
                                            }
                                        }
                                        else {
                                            filteredCodedValues_1.push(cv);
                                        }
                                    });
                                    f.valueOptions.value = filteredCodedValues_1;
                                }
                                _this._subscribeToValueChange(f, _this._handleSubCatChange);
                            }
                            if (f.name.value === 'or_dev_reg_proj_id') {
                                //if (f.readOnly) {
                                //    f.readOnly.set(true);
                                //}
                                _this._subscribeToValueChange(f, _this._handleProjNameChange);
                            }
                            if (f.name.value === 'vltg' && f.valueOptions) {
                                f.displayName.set("Voltage *");
                                f.required.set(true);
                                _this._subscribeToValueChange(f, _this._handleVoltageChange);
                            }
                            //get default plus and devType specific attributes for display
                            var _filteredAttr = layerFilters['Default'] ? layerFilters['Default'] : [];
                            if (layerFilters[devType_1]) {
                                _filteredAttr = _filteredAttr.concat(layerFilters[devType_1]);
                            }
                            return _filteredAttr.indexOf(f.name.value) !== -1;
                            //return layerFilters[devType] ? layerFilters[devType].indexOf(f.name.value) !== -1 : true;
                        });
                        return filteredFields;
                    }
                }
                else {
                    return [];
                }
            };
            DevelopmentRegistryModule.prototype._handleGeometryEditInvokeEvent = function (args) {
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
            };
            DevelopmentRegistryModule.prototype._handleDisplayModifications = function (isAuthenticated) {
                $(".banner-title").html(isAuthenticated ? this._editorViewerTitle : this._publicViewerTitle);
                if ($(window).width() < 1200) {
                }
                $(".panel-filter-widget").css("display", "none");
                $(".layer-list").css("top", "0.5em");
                $(".sign-in button").html("Editor Sign-in");
            };
            DevelopmentRegistryModule.prototype._handleMeasureArea = function () {
                var clonedGraphics = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("editor_clone_layer", false, this.app);
                var editingLayer = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("editing_layer", false, this.app);
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
            };
            DevelopmentRegistryModule.prototype.onQueryResult = function (features, fieldName) {
                if (features.length > 0) {
                    this.app.commandRegistry.command("StartEditingFeature").execute(features[0]);
                }
            };
            DevelopmentRegistryModule.prototype._onSiteInitialized = function (site) {
                var _this = this;
                var thisModel = this;
                var isAuthenticated = this.app.site.principal.isAuthenticated;
                this._handleDisplayModifications(isAuthenticated);
                var isAdmin = this.app.site.principal.identities.length > 0
                    ? this.app.site.principal.identities[0].claims.filter(function (c) { return c.value === _this._adminGroupID; }).length > 0
                    : false;
                this.app.commandRegistry.command("oe_assign_lg_scale").register(this, function () {
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "assignLgScaleSdartt";
                    _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                }, function () {
                    return isAdmin;
                });
                this.app.commandRegistry.command("oe_dev_reg_user_guide").register(this, function (url) {
                    _this.app.commandRegistry.commands["OpenWebPage"].execute(url);
                }, function () {
                    return isAuthenticated;
                });
                this.app.commandRegistry.commands["SetMeasurementUnits"].execute("feet", "acre");
                if (isAuthenticated) {
                    //set home panel content
                    try {
                        //this.app.viewManager.getViewById("InfoView").viewModel.content.set(decodeURIComponent(this._adminHomePanelContent));
                        this.app.commandRegistry.commands["ShowHomePanel"].execute();
                        //Add command to show the edit form for a newly added/edit requested feature in add_edit_dev_features workflow
                        this.app.commandRegistry.command("showFeatureEditForm").register(this, function (objectid) {
                            var collection = this.app.featureSetManager.getCollectionById("add_feature");
                            if (collection) {
                                var feature = null;
                                if (collection.featureSets.length() > 0) {
                                    collection.featureSets.value.forEach(function (fs) {
                                        fs.features.value.forEach(function (f) {
                                            var objid = f.attributes.value.filter(function (a) {
                                                return a.name.value === "OBJECTID";
                                            });
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
                        this.app.commandRegistry.command("oe_project_report").register(this, function (graphic) {
                            var dev_reg_id = "";
                            graphic.attributes.value.forEach(function (attr) {
                                if (attr.displayName.value === "or_dev_reg_id") {
                                    dev_reg_id = attr.value.value;
                                }
                            });
                            var workflowArgs = {};
                            workflowArgs["workflowId"] = "map_tip_project_impact_report";
                            workflowArgs["_devRegSrvc"] = _this.devRegSrvcUrl;
                            workflowArgs["_devRegToken"] = _this.devRegToken;
                            workflowArgs["_devRegAgolSrvc"] = _this.devRegAgolSrvcUrl;
                            workflowArgs["_or_dev_reg_id"] = dev_reg_id;
                            //workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                            _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                        }, function (graphic) {
                            //can execute?
                            return graphic.layer.displayName === "Oregon Development Projects";
                        });
                        //Add Delete Measurement to map tip only for Oregon Development Projects features
                        this.app.commandRegistry.command("oe_delete_measurement").register(this, function (graphic) {
                            _this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.esriFeature.value);
                            var measureGraphic = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("Drawings_measurement", false, _this.app);
                            if (measureGraphic) {
                                if (measureGraphic.graphics.length > 0) {
                                    _this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureGraphic.graphics[0].geometry);
                                }
                            }
                            $("#Drawings_measurement_layer").text("");
                            _this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                        }, function (graphic) {
                            //can execute?
                            var canShow = false;
                            var measureLayer = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("Drawings_measurement", false, _this.app);
                            if (measureLayer) {
                                canShow = measureLayer.graphics.length > 0;
                            }
                            return graphic.layer.displayName === "Oregon Development Projects" && canShow;
                        });
                        //Add Measure Area to map tip only for Oregon Development Projects features
                        this.app.commandRegistry.command("oe_measurement_area").register(this, function (graphic) {
                            //var thisScope = this;
                            //window.setTimeout(() => {
                            //    thisScope.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);
                            //}, 1000);
                            //$(".list-menu-button:contains('Delete Measurement')").css("display", "block");
                            _this.app.commandRegistry.commands["MeasureArea"].execute(graphic.esriFeature.value);
                        }, function (graphic) {
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
                            }
                            catch (ex) {
                                console.log(ex.message);
                            }
                        });
                        //EVENTS SUBSCRIPTIONS///
                        this.app.eventRegistry.event("MeasurementMarkupAdded").subscribe(this, function (sender) {
                            _this.app.commandRegistry.commands["oe_delete_measurement"].raiseCanExecuteChanged();
                        });
                        this.app.eventRegistry.event("GraphicVertexAddedEvent").subscribe(this, function (sender, a, b, c) {
                            console.log('graphic vertex added event', sender);
                        });
                        this.app.eventRegistry.event("GraphicDrawCompletedEvent").subscribe(this, function (sender) {
                            if (!_this.app.toolRegistry.getActiveTool()) {
                                _this.app.commandRegistry.commands[["polyline", "line"].indexOf(sender.type) !== -1 ? "MeasureDistance" : "MeasureArea"].execute(sender);
                                console.log('graphic drawn', sender);
                            }
                        });
                        this.app.eventRegistry.event("GraphicDrawActivatedEvent").subscribe(this, function (sender) {
                            if (!_this.app.toolRegistry.getActiveTool()) {
                                var measureLayer = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("Drawings_measurement", false, _this.app);
                                if (measureLayer) {
                                    if (measureLayer.graphics.length > 0) {
                                        _this.app.commandRegistry.commands["DeleteMeasurement"].execute(measureLayer.graphics[0].geometry);
                                    }
                                }
                            }
                        });
                        this.app.eventRegistry.event("GeometryChangedEvent").subscribe(this, function (sender) {
                            if (sender.graphic.getLayer().id === "editing_layer") {
                                _this._handleMeasureArea();
                            }
                            //this._handleMeasureArea();
                        });
                        this.app.eventRegistry.event("LayerRemovedEvent").subscribe(this, function (sender) {
                            console.log('layer removed', sender);
                            if (sender.id === "editing_layer") {
                                _this.app.commandRegistry.commands["DeleteMeasurement"].execute(_this._tempCloneEditGeometry);
                                $("#Drawings_measurement_layer").text("");
                            }
                        });
                        this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                            var _this = this;
                            if (args.id === "FeatureEditingContainerView" || (args.app.shellName === "Handheld" && args.id === "ResultsViewContainerView")) {
                                //close map tip
                                this.app.commandRegistry.commands["HideMapTips"].execute();
                                this.app.commandRegistry.commands["EnableMapTips"].execute();
                                args.childRegions.forEach(function (cr) {
                                    var editView = cr.views.filter(function (v) { return v.id === "EditorView"; });
                                    if (editView.length > 0) {
                                        _this._activeFeature = editView[0].viewModel.currentFeatureEsri;
                                        if (_this._activeFeature) {
                                            var attr = editView[0].viewModel.form.value.fields.getItems();
                                            if (attr.length > 0) {
                                                if (!editView[0].viewModel.form.value["all_fields"]) {
                                                    editView[0].viewModel.form.value["all_fields"] = [];
                                                    editView[0].viewModel.form.value.fields.value.forEach(function (f) {
                                                        editView[0].viewModel.form.value["all_fields"].push(f);
                                                    });
                                                }
                                                var filteredFields = _this._processAttributeFilter(attr);
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
                            var filteredAttributes = this._processAttributeFilter(args.attributes.getItems());
                            if (filteredAttributes) {
                                var filteredAttrNames_1 = filteredAttributes.map(function (fa) { return fa.name.value; });
                                args.attributes.getItems().forEach(function (attr) {
                                    if (filteredAttrNames_1.indexOf(attr.name.value) === -1) {
                                        attr.visible.set(false);
                                    }
                                });
                            }
                        });
                        this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, this._handleGeometryEditInvokeEvent);
                        this.app.event("WorkflowCompletedEvent").subscribe(this, function (workflow, workflowOutputs) {
                            if (workflow.id !== "edit_geometry") {
                                return;
                            }
                        });
                        this.app.eventRegistry.event("FeatureEditedEvent").subscribe(this, function (feature) {
                            //check if any changes beside edit time
                            var hasUpdate = JSON.stringify(feature.editedFeature.toJson()) !== JSON.stringify(feature.originalFeature.toJson());
                            if (_this._projNameUpdated) {
                                //look up and add new name if necessary
                                var workflowArgs = {};
                                workflowArgs["workflowId"] = "update_proj_name";
                                workflowArgs["projName"] = feature.editedFeature.attributes["or_dev_reg_proj_id"];
                                workflowArgs["srvc_url"] = _this.devRegProjectsSrvcUrl;
                                workflowArgs["srvc_token"] = _this.devRegToken;
                                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                            }
                            _this._projNameUpdated = false;
                            //this.app.commandRegistry.commands["MeasureArea"].execute(feature.editedFeature);
                            if (hasUpdate) {
                                var workflowArgs = {};
                                workflowArgs["workflowId"] = "add_feature_version";
                                workflowArgs["featureGraphic"] = feature.editedFeature;
                                workflowArgs["srvc_url"] = _this.devRegVersionSrvcUrl;
                                workflowArgs["srvc_token"] = _this.devRegToken;
                                _this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                            }
                        });
                        //workaround to get the authenticated layer list to process svg formatting event
                        var thisScope = this;
                        window.setTimeout(function () {
                            thisScope.app.commandRegistry.commands["SwitchToLayerView"].execute();
                        }, 50);
                    }
                    catch (ex) {
                        alert(ex.message);
                    }
                }
                else {
                    var workflowArgs = {};
                    workflowArgs["workflowId"] = "disclaimer";
                    workflowArgs["shellName"] = this.app.shellName;
                    this.app.commandRegistry.commands["RunWorkflowWithArguments"].execute(workflowArgs);
                }
                this.app.eventRegistry.event("FeatureDeletedEvent").subscribe(this, function (graphic) {
                    _this.app.commandRegistry.commands["DeleteMeasurement"].execute(graphic.Geometry);
                });
                this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                    if (args.id === "LayerDataContainerView") {
                        var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerListView"; });
                        if (layerListView.length > 0) {
                            layerListView[0].viewModel.layerListItems.value.forEach(function (group) {
                                var layers = group.children.value.forEach(function (layer) {
                                    var uniqueCategories = [];
                                    var legendItems = layer.legendItems.getItems().filter(function (category) {
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
                                        }
                                        else {
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
            };
            return DevelopmentRegistryModule;
        }(geocortex.framework.application.ModuleBase));
        dev_registry.DevelopmentRegistryModule = DevelopmentRegistryModule;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
//# sourceMappingURL=DevelopmentRegistryModule.js.map