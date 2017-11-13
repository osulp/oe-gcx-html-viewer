
/* Begin Script: C:/Users/schoepft.LIBRARY/Source/Repos/oe-gcx-html-viewer/custom_ts_out.js ------------------------- */ 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
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
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModuleProjectReportView = (function (_super) {
            __extends(DevelopmentRegistryModuleProjectReportView, _super);
            function DevelopmentRegistryModuleProjectReportView(app, lib) {
                _super.call(this, app, lib);
                //toggleLayer = function (event, element, context) {
                //    let workflowArgs: any = {};
                //    workflowArgs.workflowId = "toggleLayer";
                //    workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
                //    workflowArgs.LayerName = element.getAttribute("data-attr-layer");
                //    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                //};
                //showInfo = function (event, element, context) {
                //    let workflowArgs: any = {};
                //    workflowArgs.workflowId = "constraintPopUps";
                //    workflowArgs.constraint = element.getAttribute("data-attr-constraint");
                //    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                //};
                //zoomTo = function (event, element, context) {
                //    let featureExtent: any = myWorkflowContext.getValue('uda_extent');
                //    myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
                //};
                //clearTitle = function (event, element, context) {
                //    element.value = "";
                //};
                //runNewReport = function (event, element, context) {
                //    myWorkflowContext.setValue("finalFormBtn", 'New');
                //    myWorkflowContext.completeActivity();
                //    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                //    return true;
                //};
                //getPDF = function (event, element, context) {
                //    myWorkflowContext.setValue("finalFormBtn", 'PDF');
                //    myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
                //    let includedMap = document.getElementById("includeMap")["checked"];
                //    myWorkflowContext.setValue("includeMap", includedMap);
                //    myWorkflowContext.completeActivity();
                //    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                //    return true;
                //};
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("DevelopmentRegistryModuleProjectReportView");
                    //$(".panel-header-button.right.close-16.bound-visible").show();
                    return true;
                };
            }
            return DevelopmentRegistryModuleProjectReportView;
        }(geocortex.framework.ui.ViewBase));
        dev_registry.DevelopmentRegistryModuleProjectReportView = DevelopmentRegistryModuleProjectReportView;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModuleView = (function (_super) {
            __extends(DevelopmentRegistryModuleView, _super);
            function DevelopmentRegistryModuleView(app, lib) {
                _super.call(this, app, lib);
                this.toggleLayer = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "toggleLayer";
                    workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
                    workflowArgs.LayerName = element.getAttribute("data-attr-layer");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.showInfo = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "constraintPopUps";
                    workflowArgs.constraint = element.getAttribute("data-attr-constraint");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.zoomTo = function (event, element, context) {
                    var featureExtent = myWorkflowContext.getValue('uda_extent');
                    myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
                };
                this.clearTitle = function (event, element, context) {
                    element.value = "";
                };
                this.runNewReport = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'New');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.getPDF = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'PDF');
                    myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
                    var includedMap = document.getElementById("includeMap")["checked"];
                    myWorkflowContext.setValue("includeMap", includedMap);
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("DevelopmentRegistryModuleView");
                    //$(".panel-header-button.right.close-16.bound-visible").show();
                    return true;
                };
            }
            return DevelopmentRegistryModuleView;
        }(geocortex.framework.ui.ViewBase));
        dev_registry.DevelopmentRegistryModuleView = DevelopmentRegistryModuleView;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModuleProjectReportViewModel = (function (_super) {
            __extends(DevelopmentRegistryModuleProjectReportViewModel, _super);
            function DevelopmentRegistryModuleProjectReportViewModel(app, lib) {
                _super.call(this, app, lib);
                this.report_title = new Observable("");
                this.proj_name = new Observable("");
                this.dev_name = new Observable("");
                this.proj_dev_area = new Observable("");
                this.proj_pac_report_data = new ObservableCollection([]);
                this.pac_intersect = new Observable(true);
                this.no_pac_intersect = new Observable(false);
                this.pac_name_list = new Observable("");
                this.dev_num = new Observable("");
            }
            DevelopmentRegistryModuleProjectReportViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                var thisViewModel = this;
                this.app.registerActivityIdHandler("display_form_dev_reg_proj_report", function CustomEventHandler(workflowContext, contextFunctions) {
                    //let cat_area_rows = [];
                    thisViewModel.pac_intersect.set(true);
                    thisViewModel.no_pac_intersect.set(false);
                    var dev_area_row = [];
                    var baseline_row = [];
                    var decade_area_row = [];
                    var has_proj_name = false;
                    var is_updated_development_area = false;
                    var _pac_name_list = [];
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleProjectReportView");
                    //thisViewModel.reportDate.set("Data current as of " + new Date().toLocaleString());
                    thisViewModel.dev_num.set(myWorkflowContext.getValue("dev_num"));
                    var proj_dev_area = myWorkflowContext.getValue("development_area");
                    thisViewModel.proj_dev_area.set(thisViewModel.addCommas(proj_dev_area.toFixed(0)) + " acres");
                    thisViewModel.proj_name.set(myWorkflowContext.getValue("project_name"));
                    thisViewModel.dev_name.set(myWorkflowContext.getValue("development_name"));
                    has_proj_name = myWorkflowContext.getValue("project_name") !== null && myWorkflowContext.getValue("project_name") !== "";
                    var _report_title = has_proj_name
                        ? myWorkflowContext.getValue("project_name")
                        : myWorkflowContext.getValue("development_name");
                    thisViewModel.report_title.set(_report_title);
                    myApp.viewManager.getViewById("DevelopmentRegistryModuleProjectReportView").title.set(_report_title + " Impact Report");
                    var pac_baseline_area_fs = myWorkflowContext.getValue("pac_baseline_area");
                    var reportFinalFS = myWorkflowContext.getValue("final_report");
                    reportFinalFS.features.forEach(function (feature) {
                        if (_pac_name_list.indexOf(feature.attributes.PAC_name) === -1) {
                            _pac_name_list.push(feature.attributes.PAC_name);
                        }
                    });
                    if (myWorkflowContext.getValue("pac_name")) {
                        _pac_name_list = _pac_name_list.length > 0
                            ? _pac_name_list
                            : myWorkflowContext.getValue("pac_name").replace(/\','/g, ",");
                        thisViewModel.pac_name_list.set(_pac_name_list.toString());
                        //let pacs = _pac_name_list.split(',');
                        var pac_proj_array_1 = [];
                        _pac_name_list.forEach(function (pac) {
                            var proj_pac_obj = {};
                            proj_pac_obj['pac_name'] = pac + " PAC";
                            proj_pac_obj['report_title'] = _report_title;
                            var pac_area_stats = pac_baseline_area_fs.features.filter(function (pba) {
                                return pba.attributes.PAC_name === pac;
                            });
                            var pac_area_dbl = pac_area_stats.length > 0
                                ? pac_area_stats[0].attributes.pac_area_acres
                                : pac_baseline_area_fs.features.length > 0
                                    ? pac_baseline_area_fs.features[0].attributes.pac_area_acres
                                    : 0;
                            proj_pac_obj['pac_area'] = thisViewModel.addCommas((pac_area_dbl.toFixed(0)) + " acres");
                            var baseline_area = pac_area_stats.length > 0
                                ? pac_area_stats[0].attributes.baseline_data_area_acres
                                : pac_baseline_area_fs.features.length > 0
                                    ? pac_baseline_area_fs.features[0].attributes.baseline_data_area_acres
                                    : 0;
                            proj_pac_obj['baseline_area'] = baseline_area !== 0
                                ? thisViewModel.addCommas(baseline_area.toFixed(0)) + " acres"
                                : "not available";
                            proj_pac_obj['baseline_percent'] = (baseline_area / pac_area_dbl * 100).toFixed(2) + "%";
                            var report_final_stats = reportFinalFS.features.filter(function (rf) {
                                return rf.attributes.PAC_name == pac;
                            });
                            report_final_stats = report_final_stats.length < 1
                                ? reportFinalFS.features
                                : report_final_stats;
                            if (report_final_stats.length > 0) {
                                report_final_stats.forEach(function (stat) {
                                    var is_gp_processed = stat.attributes.SUM_POLY_AREA !== undefined;
                                    is_updated_development_area = is_gp_processed
                                        ? is_gp_processed
                                        : is_updated_development_area;
                                    var stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                                    stat_area = is_gp_processed
                                        ? stat_area
                                        : (stat_area + proj_dev_area);
                                    var stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                                    var stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                                    switch (stat.attributes.stat) {
                                        case 'all':
                                            proj_pac_obj['overall_cap_val'] = stat_percent;
                                            proj_pac_obj['overall_area_val'] = stat_area_formatted + ' acres';
                                            break;
                                        case 'decade':
                                            proj_pac_obj['decade_cap_val'] = stat_percent;
                                            proj_pac_obj['decade_area_val'] = stat_area_formatted + ' acres';
                                            break;
                                        case 'input_area':
                                            proj_pac_obj['input_area_pac_percent'] = stat_percent;
                                            proj_pac_obj['input_area_pac_area'] = stat_area_formatted + ' acres';
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            }
                            if (!proj_pac_obj['decade_cap_val']) {
                                // no developments added yet so no stat entry caught above, so add this temporary project
                                var stat_area_formatted = thisViewModel.addCommas(proj_dev_area.toFixed(0));
                                var stat_percent = (proj_dev_area / pac_area_dbl * 100).toFixed(2) + "%";
                                proj_pac_obj['decade_cap_val'] = stat_percent;
                                proj_pac_obj['decade_area_val'] = stat_area_formatted + ' acres';
                                proj_pac_obj['input_area_pac_percent'] = stat_percent;
                                proj_pac_obj['input_area_pac_area'] = stat_area_formatted + ' acres';
                            }
                            pac_proj_array_1.push(proj_pac_obj);
                        });
                        thisViewModel.proj_pac_report_data.set(pac_proj_array_1);
                    }
                    else {
                        thisViewModel.pac_intersect.set(false);
                        thisViewModel.no_pac_intersect.set(true);
                    }
                    //thisViewModel.has_all.set(thisViewModel.has_current.get() && thisViewModel.has_projected.get());
                    //myApp.viewManager.getViewById("DevelopmentRegistryModuleProjectReportView").title.set("Project Impact Report");
                    //baseline_row.push({
                    //    category: 'Baseline developments',
                    //    area: thisViewModel.addCommas(myWorkflowContext.getValue("baseline_area").toFixed(0)),
                    //    percent: (myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%"
                    //});
                    //thisViewModel.pac_title.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    //thisViewModel.pac_title_projected.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    //thisViewModel.baseline_area.set(baseline_row[0].area + " acres");
                    //thisViewModel.baseline_percent.set((myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%");
                    //let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
                    //thisViewModel.decade_tbl.set(cap_one_percent_tbl);
                    //thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);
                    //let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
                    //thisViewModel.overall_tbl.set(overall_cap_tbl);
                    //let cap_one_percent_projected_tbl = proj_cat_area_rows.concat(proj_decade_area_row);
                    //thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
                    //thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);
                    //let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
                    //thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);
                });
            };
            //setExceedanceMsgs() {
            //    this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
            //    this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
            //    this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
            //    this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
            //}
            DevelopmentRegistryModuleProjectReportViewModel.prototype.addCommas = function (nStr) {
                nStr += '';
                var x = nStr.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            };
            return DevelopmentRegistryModuleProjectReportViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        dev_registry.DevelopmentRegistryModuleProjectReportViewModel = DevelopmentRegistryModuleProjectReportViewModel;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var oe;
(function (oe) {
    var dev_registry;
    (function (dev_registry) {
        var DevelopmentRegistryModuleViewModel = (function (_super) {
            __extends(DevelopmentRegistryModuleViewModel, _super);
            function DevelopmentRegistryModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.pac_title = new Observable("");
                this.pac_title_projected = new Observable("");
                this.pac_area = new Observable("");
                this.baseline_area = new Observable("");
                this.baseline_percent = new Observable("");
                this.dev_area = new Observable("");
                this.decade_tbl = new ObservableCollection([]);
                this.overall_tbl = new ObservableCollection([]);
                this.decade_projected_tbl = new ObservableCollection([]);
                this.overall_projected_tbl = new ObservableCollection([]);
                this.decade_cap_val = new Observable("");
                this.overall_cap_val = new Observable("");
                this.decade_projected_cap_val = new Observable("");
                this.overall_projected_cap_val = new Observable("");
                this.decade_area_val = new Observable("");
                this.overall_area_val = new Observable("");
                this.decade_projected_area_val = new Observable("");
                this.overall_projected_area_val = new Observable("");
                this.has_current = new Observable(false);
                this.has_projected = new Observable(false);
                this.has_all = new Observable(false);
                this.show_decade_tbl_current = new Observable(false);
                this.show_decade_tbl_projected = new Observable(false);
                this.isCached = new Observable(false);
                this.exceedsCurrentDecade = new Observable(false);
                this.exceedsCurrentMax = new Observable(false);
                this.exceedsProjectedDecade = new Observable(false);
                this.exceedsProjectedMax = new Observable(false);
                this.reportDate = new Observable("");
            }
            DevelopmentRegistryModuleViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                var thisViewModel = this;
                this.app.registerActivityIdHandler("displaycustomform_devReg", function CustomEventHandler(workflowContext, contextFunctions) {
                    var cat_area_rows = [];
                    var dev_area_row = [];
                    var baseline_row = [];
                    var decade_area_row = [];
                    var decade_cat_area_row = [];
                    var proj_all_area_row = [];
                    var proj_decade_area_row = [];
                    var proj_decade_cat_area_row = [];
                    var proj_cat_area_rows = [];
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("DevelopmentRegistryModuleView");
                    var pac_area_dbl = myWorkflowContext.getValue("pac_area");
                    thisViewModel.pac_area.set(thisViewModel.addCommas(pac_area_dbl.toFixed(0)) + " acres");
                    var reportFinalFS = myWorkflowContext.getValue("report_final");
                    var reportType = myWorkflowContext.getValue("report_type");
                    var isPublic = myWorkflowContext.getValue("public");
                    thisViewModel.isCached.set(myWorkflowContext.getValue("cached"));
                    thisViewModel.decade_cap_val.set("0%");
                    thisViewModel.overall_cap_val.set("0%");
                    thisViewModel.decade_projected_cap_val.set("0%");
                    thisViewModel.overall_projected_cap_val.set("0%");
                    thisViewModel.has_current.set(false);
                    thisViewModel.has_projected.set(false);
                    //if cached and current, then means public view of cached results so midnight time
                    //else current time
                    thisViewModel.reportDate.set("Data current as of "
                        + (thisViewModel.isCached.get() && reportType === "Current" && isPublic
                            ? new Date().toLocaleDateString() + " 12:00 AM"
                            : new Date().toLocaleString()));
                    reportFinalFS.features.forEach(function (stat) {
                        var stat_area = stat.attributes.SUM_POLY_AREA || stat.attributes.SUM_POLY_A;
                        var stat_area_formatted = thisViewModel.addCommas(stat_area.toFixed(0));
                        var stat_percent = stat_area ? (stat_area / pac_area_dbl * 100).toFixed(2) + "%" : "N/A";
                        switch (stat.attributes.stat) {
                            case 'all':
                                thisViewModel.has_current.set(true);
                                dev_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.overall_cap_val.set(stat_percent);
                                thisViewModel.overall_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'decade':
                                decade_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.decade_cap_val.set(stat_percent);
                                thisViewModel.decade_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'categories':
                            case 'decade_categories':
                            case 'projected_categories':
                            case 'projected_decade_categories':
                                if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                                    var stat_obj = {
                                        category: stat.attributes.category_merged || stat.attributes.category_m,
                                        area: stat_area_formatted,
                                        percent: stat_percent
                                    };
                                    switch (stat.attributes.stat) {
                                        case 'categories':
                                            cat_area_rows.push(stat_obj);
                                            break;
                                        case 'decade_categories':
                                            decade_cat_area_row.push(stat_obj);
                                            break;
                                        case 'projected_categories':
                                            proj_cat_area_rows.push(stat_obj);
                                            break;
                                        case 'projected_decade_categories':
                                            proj_decade_cat_area_row.push(stat_obj);
                                            break;
                                    }
                                }
                                break;
                            case 'projected_all':
                                thisViewModel.has_projected.set(true);
                                proj_all_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.overall_projected_cap_val.set(stat_percent);
                                thisViewModel.overall_projected_area_val.set(stat_area_formatted + ' acres');
                                break;
                            case 'projected_decade':
                                proj_decade_area_row.push({
                                    category: 'Total',
                                    area: stat_area_formatted,
                                    percent: stat_percent
                                });
                                thisViewModel.decade_projected_cap_val.set(stat_percent);
                                thisViewModel.decade_projected_area_val.set(stat_area_formatted + ' acres');
                                break;
                            //case 'projected_categories':
                            //    if (["", " ", "NULL", "null"].indexOf(stat.attributes.category_merged || stat.attributes.category_m) === -1) {
                            //        proj_cat_area_rows.push({
                            //            category: stat.attributes.category_merged || stat.attributes.category_m,
                            //            area: stat_area_formatted,
                            //            percent: stat_percent
                            //        });
                            //    }
                            //    break;
                            default:
                                break;
                        }
                    });
                    thisViewModel.has_all.set(thisViewModel.has_current.get() && thisViewModel.has_projected.get());
                    myApp.viewManager.getViewById("DevelopmentRegistryModuleView").title.set(thisViewModel.has_projected.get() ? "Estimated Development Impact Report" : "PAC Development Impact Report");
                    baseline_row.push({
                        category: 'Baseline developments',
                        area: thisViewModel.addCommas(myWorkflowContext.getValue("baseline_area").toFixed(0)),
                        percent: (myWorkflowContext.getValue("baseline_area") / pac_area_dbl * 100).toFixed(2) + "%"
                    });
                    thisViewModel.pac_title.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    thisViewModel.pac_title_projected.set(myWorkflowContext.getValue("selected_pac") + " PAC");
                    thisViewModel.baseline_area.set(baseline_row[0].area + " acres");
                    thisViewModel.baseline_percent.set(baseline_row[0].percent);
                    //let cap_one_percent_tbl = cat_area_rows.concat(decade_area_row);
                    var cap_one_percent_tbl = decade_cat_area_row.concat(decade_area_row);
                    thisViewModel.decade_tbl.set(cap_one_percent_tbl);
                    thisViewModel.show_decade_tbl_current.set(cap_one_percent_tbl.length > 0 ? true : false);
                    //let overall_cap_tbl = baseline_row.concat(cat_area_rows, dev_area_row);
                    var overall_cap_tbl = cat_area_rows.concat(dev_area_row);
                    thisViewModel.overall_tbl.set(overall_cap_tbl);
                    //let cap_one_percent_projected_tbl = proj_cat_area_rows.concat                    (proj_decade_area_row);
                    var cap_one_percent_projected_tbl = proj_decade_cat_area_row.concat(proj_decade_area_row);
                    thisViewModel.decade_projected_tbl.set(cap_one_percent_projected_tbl);
                    thisViewModel.show_decade_tbl_projected.set(cap_one_percent_projected_tbl.length > 0 ? true : false);
                    //let overall_cap_projected_tbl = baseline_row.concat(proj_cat_area_rows, proj_all_area_row);
                    var overall_cap_projected_tbl = proj_cat_area_rows.concat(proj_all_area_row);
                    thisViewModel.overall_projected_tbl.set(overall_cap_projected_tbl);
                });
            };
            DevelopmentRegistryModuleViewModel.prototype.setExceedanceMsgs = function () {
                this.exceedsCurrentDecade.set(Number(this.decade_cap_val.get()) > 1);
                this.exceedsCurrentMax.set(Number(this.overall_cap_val.get()) > 3);
                this.exceedsProjectedDecade.set(Number(this.decade_projected_cap_val.get()) > 1);
                this.exceedsProjectedMax.set(Number(this.overall_projected_cap_val.get()) > 3);
            };
            DevelopmentRegistryModuleViewModel.prototype.addCommas = function (nStr) {
                nStr += '';
                var x = nStr.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            };
            return DevelopmentRegistryModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        dev_registry.DevelopmentRegistryModuleViewModel = DevelopmentRegistryModuleViewModel;
    })(dev_registry = oe.dev_registry || (oe.dev_registry = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomFormM49Module = (function (_super) {
            __extends(CustomFormM49Module, _super);
            function CustomFormM49Module(app, lib) {
                _super.call(this, app, lib);
            }
            CustomFormM49Module.prototype.initialize = function (config) {
                //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            };
            return CustomFormM49Module;
        }(geocortex.framework.application.ModuleBase));
        customform49.CustomFormM49Module = CustomFormM49Module;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomForm49ModuleView = (function (_super) {
            __extends(CustomForm49ModuleView, _super);
            function CustomForm49ModuleView(app, lib) {
                _super.call(this, app, lib);
                this.toggleLayer = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "toggleLayer";
                    workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
                    workflowArgs.LayerName = element.getAttribute("data-attr-layer");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.showInfo = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "constraintPopUps";
                    workflowArgs.constraint = element.getAttribute("data-attr-constraint");
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.zoomTo = function (event, element, context) {
                    var featureExtent = myWorkflowContext.getValue('uda_extent');
                    myApp.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
                };
                this.clearTitle = function (event, element, context) {
                    element.value = "";
                };
                this.runNewReport = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'New');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.getPDF = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'PDF');
                    myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
                    var includedMap = document.getElementById("includeMap")["checked"];
                    myWorkflowContext.setValue("includeMap", includedMap);
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
                    return true;
                };
            }
            return CustomForm49ModuleView;
        }(geocortex.framework.ui.ViewBase));
        customform49.CustomForm49ModuleView = CustomForm49ModuleView;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var oe;
(function (oe) {
    var customform49;
    (function (customform49) {
        var CustomFormM49ModuleViewModel = (function (_super) {
            __extends(CustomFormM49ModuleViewModel, _super);
            //hvfl_soil: Observable<string> = new Observable<string>();
            function CustomFormM49ModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            CustomFormM49ModuleViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                this.app.registerActivityIdHandler("displaycustomform_m49", function CustomEventHandler(workflowContext, contextFunctions) {
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("CustomForm49ModuleView");
                    document.getElementById("hvfl_soil").innerHTML = myWorkflowContext.getValue("hvfl_soil");
                    document.getElementById("hvf").innerHTML = myWorkflowContext.getValue("hvfl_forest");
                    document.getElementById("hvfl_dairy").innerHTML = myWorkflowContext.getValue("hvfl_dairy");
                    document.getElementById("hvf_likely").innerHTML = myWorkflowContext.getValue("likely_hvf");
                    //document.getElementById("uda").value = myWorkflowContext.getValue("uda");
                });
            };
            return CustomFormM49ModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        customform49.CustomFormM49ModuleViewModel = CustomFormM49ModuleViewModel;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation) {
        /* var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
         var identifyParams = new esri.tasks.IdentifyParameters();
         var elevCounter = 0;
         var elevCounterMax;
         var shellName;*/
        var ElevationModule = (function (_super) {
            __extends(ElevationModule, _super);
            function ElevationModule(app, lib) {
                _super.call(this, app, lib);
            }
            ElevationModule.prototype.initialize = function (config) {
            };
            return ElevationModule;
        }(geocortex.framework.application.ModuleBase));
        elevation.ElevationModule = ElevationModule;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation) {
        var ElevationModuleView = (function (_super) {
            __extends(ElevationModuleView, _super);
            function ElevationModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return ElevationModuleView;
        }(geocortex.framework.ui.ViewBase));
        elevation.ElevationModuleView = ElevationModuleView;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var elevation;
    (function (elevation_1) {
        var demURL = "http://sampleserver5.arcgisonline.com/arcgis/rest/services/Elevation/WorldElevations/MapServer";
        var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
        var identify = new esri.tasks.IdentifyTask(demURL);
        var identifyParams = new esri.tasks.IdentifyParameters();
        var elevCounter = 0;
        var elevCounterMax;
        var shellName;
        var ElevationModuleViewModel = (function (_super) {
            __extends(ElevationModuleViewModel, _super);
            //elevation: Observable<string> = new Observable<string>();
            function ElevationModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            ElevationModuleViewModel.prototype.initialize = function (config) {
                var _this = this;
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
            ElevationModuleViewModel.prototype._onSiteInitialized = function (site) {
                elevCounterMax = 10;
                shellName = this.app.shellName;
                buildElevationHTML();
                //this.app.eventRegistry.event("ContextMenuActivated").subscribe(null, handleMouseClick);              
                this.app.eventRegistry.event("MapContextMenuPointUpdatedEvent").subscribe(null, handleMouseClick);
                function buildElevationHTML() {
                    //make sure the menu exists
                    var menuCoords = $(".map-menu-coordinates");
                    if (menuCoords == undefined || menuCoords == null)
                        return;
                    //add a div to the end of the coordinates element in the menu to hold our elevation data
                    menuCoords.append('<div><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');
                }
                function handleMouseClick(pointIn, appIn) {
                    //make sure our html element exists
                    var menuCoords = $("#GoogleElevationValue");
                    if (menuCoords == undefined && menuCoords == null)
                        return;
                    $("#GoogleElevationValue").html("Loading...");
                    //Grab the current application
                    appIn = geocortex.framework.applications[0];
                    if (appIn == undefined || appIn == null) {
                        $("#GoogleElevationValue").html("App not found");
                        return;
                    }
                    if (pointIn == undefined || pointIn == null) {
                        $("#GoogleElevationValue").html("No point supplied");
                        return;
                    }
                    //The coordinates manager hold a prevCoord which is acutally the current context menu point.
                    //var defaultX = appIn.coordinatesManager._prevCoord.x;
                    //var defaultY = appIn.coordinatesManager._prevCoord.y;
                    var defaultX = pointIn.x;
                    var defaultY = pointIn.y;
                    //The default spatial reference is 102100, change it to web mercator
                    var xyPoint = new esri.geometry.Point(defaultX, defaultY, new esri.SpatialReference({ wkid: 102100 }));
                    var geographicPoint = esri.geometry.webMercatorToGeographic(xyPoint);
                    var mapPoint = new esri.geometry.Point(geographicPoint);
                    //toss the point at google
                    var url = googleURL + mapPoint.y + "," + mapPoint.x;
                    var siteUrl = window.location.href.split("?")[0];
                    siteUrl = siteUrl.replace(siteUrl.split("/")[siteUrl.split("/").length - 1], "");
                    var proxyUrl = siteUrl + "Proxy.ashx?" + url;
                    var contentType = "application/x-www-form-urlencoded; charset=utf-8";
                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        url: proxyUrl,
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (result.results.length > 0) {
                                var elevation = result.results[0].elevation;
                                elevation = Math.round(parseFloat(elevation) * 3.28084).toString() + " ft";
                                $("#GoogleElevationValue").html(elevation);
                            }
                            else if (result.status == "OVER_QUERY_LIMIT") {
                                $("#GoogleElevationValue").html("Query Limit.  Wait a moment and try again.");
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            var error = thrownError;
                            $("#GoogleElevationValue").html("Load failed");
                            //alert(error);
                        },
                        complete: function (xhr, status) {
                            if (status != "success" && status != "error")
                                $("#GoogleElevationValue").html(status);
                        }
                    });
                }
            };
            return ElevationModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        elevation_1.ElevationModuleViewModel = ElevationModuleViewModel;
    })(elevation = oe.elevation || (oe.elevation = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var hyperlink_banner;
    (function (hyperlink_banner) {
        var linkUri;
        var HyperlinkBannerModule = (function (_super) {
            __extends(HyperlinkBannerModule, _super);
            function HyperlinkBannerModule(app, lib) {
                _super.call(this, app, lib);
            }
            HyperlinkBannerModule.prototype.initialize = function (config) {
                var _this = this;
                linkUri = config.linkUri !== undefined ? config.linkUri : "http://oregonexplorer.info";
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
            HyperlinkBannerModule.prototype._onSiteInitialized = function (site) {
                //wrap banner image with a link anchor
                $(".banner-left-img").wrap('<a href="' + linkUri + '" target="_blank"></a>');
                /*$('.banner').click(function (e) {
                    if (e.pageX < 350) {
                        window.open(linkUri, '_blank');
                    }
                });
                //adds support for sponsor logo image to be next to the OE banner image before the banner text.
                try {
                   // $('.banner-text').css("left", (/\.(gif|jpg|jpeg|tiff|png)$/i).test($('.banner-right-img')[0]["src"]) ? $('.banner-right-img').width() + 370 + "px" : "370px");
                }
                catch (ex)
                { };*/
            };
            return HyperlinkBannerModule;
        }(geocortex.framework.application.ModuleBase));
        hyperlink_banner.HyperlinkBannerModule = HyperlinkBannerModule;
    })(hyperlink_banner = oe.hyperlink_banner || (oe.hyperlink_banner = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var initial_extent;
    (function (initial_extent) {
        var InitialExtentModule = (function (_super) {
            __extends(InitialExtentModule, _super);
            function InitialExtentModule(app, lib) {
                _super.call(this, app, lib);
            }
            InitialExtentModule.prototype.initialize = function (config) {
                var _this = this;
                var site = this.app.site;
                if (site && site.isInitialized) {
                    this._onSiteInitialized(site);
                }
                else {
                    this.app.eventRegistry.event("MapLoadedEvent").subscribe(this, function (args) {
                        _this._onMapLoaded(args);
                    });
                    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                        _this._onSiteInitialized(args);
                    });
                }
            };
            InitialExtentModule.prototype._onMapLoaded = function (site) {
                this.app.command("ZoomToInitialExtent").execute();
            };
            InitialExtentModule.prototype._onSiteInitialized = function (site) {
                this.app.command("ZoomToInitialExtent").execute();
            };
            return InitialExtentModule;
        }(geocortex.framework.application.ModuleBase));
        initial_extent.InitialExtentModule = InitialExtentModule;
    })(initial_extent = oe.initial_extent || (oe.initial_extent = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtension = (function (_super) {
            __extends(LayerActionsExtension, _super);
            function LayerActionsExtension(app, lib) {
                _super.call(this, app, lib);
                this.metadataHyperlinkURI = "";
                this.downloadLinkURI = "";
            }
            LayerActionsExtension.prototype.initialize = function (config) {
                var _this = this;
                this.showLayerDescription = config.showLayerDescription !== undefined ? config.showLayerDescription : false;
                this.allowAllLayerTypes = config.allowAllLayerTypes !== undefined ? config.allowAllLayerTypes : false;
                this.metadataHyperlinkOverride = config.metadataHyperlinkOverride !== undefined ? config.metadataHyperlinkOverride : false;
                this.expandLayerTreeOnVisible = config.expandLayerTreeOnVisible !== undefined ? config.expandLayerTreeOnVisible : false;
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
            LayerActionsExtension.prototype.registerOnclickLayerDesc = function () {
                var _this = this;
                $("#oe_layer_desc_toggle_more").click(function () {
                    if ($("#oe_layer_desc_toggle_more").html() === "show more") {
                        var show_all = _this["layer_desc_full"] + '<div id="oe_layer_desc_toggle_more">show less</div>';
                        $("#oe_layer_desc").html(show_all);
                    }
                    else {
                        var show_less = _this["layer_desc_full"].substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>';
                        $("#oe_layer_desc").html(show_less);
                    }
                    _this.registerOnclickLayerDesc();
                });
            };
            LayerActionsExtension.prototype.handleFolderClickEvent = function (context) {
                if (context.isVisible.get() == true)
                    context.isExpanded.set(true);
            };
            LayerActionsExtension.prototype._onSiteInitialized = function (site) {
                var _this = this;
                //add listener if layer trees will expand when enabled
                if (this.expandLayerTreeOnVisible) {
                    this.app.eventRegistry.event("FolderClickedEvent").subscribe(this, function (args) {
                        _this.handleFolderClickEvent(args);
                    });
                }
                //metadata override
                if (this.metadataHyperlinkOverride) {
                    this.app.command("ShowLayerActions").preExecute.subscribe(this, function (args) {
                        //clear old values!
                        this.metadataHyperlinkURI = "";
                        this.downloadLinkURI = "";
                        //before layer actions are show!
                        if (!args.layerHyperlinks || args.layerHyperlinks.length < 1)
                            return;
                        for (var i = 0; i < args.layerHyperlinks.length; i++) {
                            //check for metadata override
                            if (args.layerHyperlinks[i].text.toLowerCase().indexOf("metadata") > -1) {
                                //$(aLink).css("display", "none");
                                this.metadataHyperlinkURI = args.layerHyperlinks[i].uri;
                            }
                            else if (args.layerHyperlinks[i].text.toLowerCase().indexOf("download") > -1) {
                                //$(aLink).css("display", "none");
                                this.downloadLinkURI = args.layerHyperlinks[i].uri;
                            }
                        }
                    });
                    this.app.command("ShowLayerActions").postExecute.subscribe(this, function (args) {
                        //try to hide metadata link and grab its URI
                        var layerHyperLinksArray = $(".LayerActionsView ul.list-menu a");
                        if (layerHyperLinksArray === undefined || !layerHyperLinksArray)
                            return;
                        var aLink;
                        for (var i = 0; i < layerHyperLinksArray.length; i++) {
                            aLink = layerHyperLinksArray[i];
                            //check for metadata override
                            if (aLink.innerText.toLowerCase().indexOf("metadata") > -1) {
                                $(aLink).css("display", "none");
                            }
                            else if (aLink.innerText.toLowerCase().indexOf("download") > -1) {
                                $(aLink).css("display", "none");
                            }
                        }
                    });
                }
                //show in list descriptions
                if (this.showLayerDescription) {
                    //var _this = this;
                    // Register an implementation for the "showMetadata" and "showDownload" commands.
                    this.app.eventRegistry.event("ViewContainerActivatedEvent").subscribe(this, function (args) {
                        if (args.id === "LayerDataContainerView") {
                            // check to see if div id already added, else create a new one
                            if (args.childRegions[0].activeViews.length > 1) {
                                var layerListView = args.childRegions[0].activeViews.filter(function (av) { return av.id === "LayerActionsView"; });
                                if (layerListView.length > 0) {
                                    _this.layer_desc_full = layerListView[0].viewModel.menuContext.value.description.split("Metadata:")[0];
                                    _this.layer_desc_full = _this.layer_desc_full.split('Abstract:').length > 1
                                        ? _this.layer_desc_full.split('Abstract:')[1]
                                        : _this.layer_desc_full;
                                    var showMore = _this.layer_desc_full.length > 500;
                                    var layer_desc = showMore ? _this.layer_desc_full.substring(0, 500) + '...<div id="oe_layer_desc_toggle_more">show more</div>' : _this.layer_desc_full;
                                    if ($("#oe_layer_desc").length > 0) {
                                        $("#oe_layer_desc").html(layer_desc);
                                    }
                                    else {
                                        $(".LayerActionsView.active").prepend('<div id="oe_layer_desc">' + layer_desc + '</div>');
                                    }
                                    _this.registerOnclickLayerDesc();
                                }
                            }
                        }
                    });
                }
                this["registerOnClickForLayerDesc"] = function () {
                };
                this.app.commandRegistry.command("showMetadata").register(this, function (layer) {
                    //override metadata link
                    if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                        window.open(this.metadataHyperlinkURI, "_blank");
                        return;
                    }
                    // Show the text that was passed into the command.
                    // Metadata links are the first link in the description so split and send to first url.
                    var metadataLink = layer.description.split("http");
                    var metadataLinkSpaceCount = 0;
                    if (metadataLink.length > 1) {
                        var metadataLinkArray = metadataLink[1].split(" ");
                        metadataLinkSpaceCount = metadataLinkArray.length;
                        metadataLink = "http" + metadataLinkArray[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "");
                    }
                    else {
                        metadataLink = "";
                    }
                    //metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "") : "";
                    //remove invalid last characters
                    var invalidTerminatingChars = [".", ",", "?", "!", ")", "\""];
                    while (invalidTerminatingChars.indexOf(metadataLink.slice(-1)) > -1)
                        metadataLink = metadataLink.slice(0, -1);
                    //check for typos
                    var urlArray = metadataLink.split("/");
                    if (urlArray.length > 0) {
                        var lastStringArray = urlArray[urlArray.length - 1].split(".");
                        if (lastStringArray.length > 2 && metadataLinkSpaceCount > 0) {
                            lastStringArray.splice(lastStringArray.length - 1, 1);
                            urlArray[urlArray.length - 1] = lastStringArray.join(".");
                            metadataLink = urlArray.join("/");
                        }
                    }
                    if (metadataLink !== "") {
                        window.open(metadataLink, "_blank");
                    }
                    else {
                        alert(layer.description);
                    }
                }, function (context) {
                    if (this.metadataHyperlinkOverride && this.metadataHyperlinkURI != "") {
                        return true;
                    }
                    //canExecute
                    if (context == null)
                        return false;
                    //there is a description show this button
                    var isOEService = context.mapService.serviceUrl.match("lib-arcgis") !== -1 ? true : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1 ? true : false;
                    if (isOEService && context.description !== "")
                        return true;
                    return false;
                });
                // view LayerActionsView active
                this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                    window.open(layer.getLayerUrl(), "_blank");
                });
                this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                    //override metadata link
                    if (this.metadataHyperlinkOverride && this.downloadLinkURI != "") {
                        window.open(this.downloadLinkURI, "_blank");
                        return;
                    }
                    // Show the text that was passed into the command.
                    // Download links are the second link in the description so split and send to second url.
                    var downloadLink = layer.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "") {
                        //console.log("Opening download link...");
                        window.open(downloadLink, "_blank");
                    }
                    else {
                        //check for workflow array
                        if (this.app.site.workflows == undefined) {
                            console.error("showDownload: Workflow is missing from site.");
                            alert("Workflow for this operation is missing.");
                            return;
                        }
                        //check for workflow by id
                        var i = 0;
                        var workflowFound = null;
                        for (i = 0; i < this.app.site.workflows.length; i++) {
                            if (this.app.site.workflows[i].id.toUpperCase().indexOf("EXTRACT_LAYER") > -1) {
                                workflowFound = this.app.site.workflows[i].id;
                                break;
                            }
                        }
                        if (workflowFound == null) {
                            console.error("showDownload: Workflow is missing from site.");
                            alert("Workflow for this operation is missing.");
                            return;
                        }
                        var GESiteUri = this.app.site.url;
                        var workflowArgs = {};
                        //console.log("Starting Extract Workflow...");
                        workflowArgs["workflowId"] = workflowFound; //"Extract_Layer"; //This is the ID of the workflow.
                        workflowArgs["SiteUri"] = GESiteUri;
                        workflowArgs["Layers"] = layer.displayName;
                        workflowArgs["LayerUrl"] = layer.getLayerUrl();
                        workflowArgs["LayerToken"] = layer.mapService.serviceToken;
                        //workflowArgs["LayerUser"] = layer.properties.user !== undefined ? layer.properties.user : "";
                        //workflowArgs["LayerPwd"] = layer.properties.pwd !== undefined ? layer.properties.pwd : "";
                        //workflowArgs["LayerTokenUrl"] = layer.getLayerUrl().toUpperCase().split("/REST/")[0] + "/tokens";
                        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                    }
                }, function (context) {
                    if (this.metadataHyperlinkOverride && this.downloadLinkURI != "") {
                        return true;
                    }
                    if (context === null)
                        return false;
                    //hide
                    if (context.properties.hideDownload != undefined && context.properties.hideDownload === "False")
                        return false;
                    //download links always show
                    var downloadLink = context.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "")
                        return true;
                    //is this a type that can be exported?
                    if (!this.allowAllLayerTypes && context.type != geocortex.essentials.LayerType.FEATURE_LAYER)
                        return false;
                    //is the map service there?
                    if (context.mapService == null || context.mapService == "")
                        return false;
                    if (context.mapService.serviceUrl == null || context.mapService.serviceUrl == "")
                        return false;
                    return true;
                    //return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
                });
            };
            return LayerActionsExtension;
        }(geocortex.framework.application.ModuleBase));
        layer_actions_extension.LayerActionsExtension = LayerActionsExtension;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtensionModuleView = (function (_super) {
            __extends(LayerActionsExtensionModuleView, _super);
            function LayerActionsExtensionModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return LayerActionsExtensionModuleView;
        }(geocortex.framework.ui.ViewBase));
        layer_actions_extension.LayerActionsExtensionModuleView = LayerActionsExtensionModuleView;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var layer_actions_extension;
    (function (layer_actions_extension) {
        var LayerActionsExtensionModuleViewModel = (function (_super) {
            __extends(LayerActionsExtensionModuleViewModel, _super);
            function LayerActionsExtensionModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.greeting = new Observable();
            }
            LayerActionsExtensionModuleViewModel.prototype.initialize = function (config) {
                //if (config) {
                //    this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
                //}
            };
            return LayerActionsExtensionModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        layer_actions_extension.LayerActionsExtensionModuleViewModel = LayerActionsExtensionModuleViewModel;
    })(layer_actions_extension = oe.layer_actions_extension || (oe.layer_actions_extension = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var M49;
    (function (M49) {
        var M49Module = (function (_super) {
            __extends(M49Module, _super);
            function M49Module(app, lib) {
                _super.call(this, app, lib);
            }
            M49Module.prototype.initialize = function (config) {
                var _this = this;
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
            M49Module.prototype._onSiteInitialized = function (site) {
                var _this = this;
                window["_calcAreas"] = [];
                // Register an implementation of custom commands.
                this.app.commandRegistry.command("addCalcAreas").register(this, function (calcAreas) {
                    //calcArea for each AOI
                    //Allows for adding/deleting dynamically in the UI
                    //Example of the json object the receive:
                    //{
                    //    "aoi_id": {id},
                    //    "TotalArea": { TotArea }, 
                    //    "HVFarmSoil_IntersectedArea":{ dblHVFarmSoil },
                    //    "HVFarmDairy_IntersectedArea": { dblHVFarmDairy },
                    //    "HVForest1_IntersectedArea": { dblHVForest1 },
                    //    "HVForest3_IntersectedArea": { dblHVForest3 }
                    //}                
                    window["_calcAreas"].push(JSON.parse(calcAreas));
                });
                this.app.commandRegistry.command("removeCalcAreas").register(this, function (index) {
                    window["_calcAreas"].splice(index, 1);
                });
            };
            return M49Module;
        }(geocortex.framework.application.ModuleBase));
        M49.M49Module = M49Module;
    })(M49 = oe.M49 || (oe.M49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var M9;
    (function (M9) {
        var M49ModuleView = (function (_super) {
            __extends(M49ModuleView, _super);
            function M49ModuleView(app, lib) {
                _super.call(this, app, lib);
            }
            return M49ModuleView;
        }(geocortex.framework.ui.ViewBase));
        M9.M49ModuleView = M49ModuleView;
    })(M9 = oe.M9 || (oe.M9 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var M49;
    (function (M49) {
        var M49ModuleViewModel = (function (_super) {
            __extends(M49ModuleViewModel, _super);
            function M49ModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.greeting = new Observable();
            }
            M49ModuleViewModel.prototype.initialize = function (config) {
                //if (config) {
                //    this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "hello-world-greeting"));
                //}
            };
            return M49ModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        M49.M49ModuleViewModel = M49ModuleViewModel;
    })(M49 = oe.M49 || (oe.M49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var raster_functions;
    (function (raster_functions) {
        var RasterFunctionsModule = (function (_super) {
            __extends(RasterFunctionsModule, _super);
            function RasterFunctionsModule(app, lib) {
                _super.call(this, app, lib);
            }
            RasterFunctionsModule.prototype.initialize = function (config) {
                var _this = this;
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
            RasterFunctionsModule.prototype._onSiteInitialized = function (site) {
                var _this = this;
                _this.app.commandRegistry.command("processRasterFunctions").register(this, function () {
                    var imageServicesArray = [];
                    //find Image services
                    for (var x = 0; x < site.essentialsMap.mapServices.length; x++) {
                        if (site.essentialsMap.mapServices[x].mapServiceType === "Image") {
                            var service = {};
                            service.id = site.essentialsMap.mapServices[x].id;
                            service.name = site.essentialsMap.mapServices[x].displayName;
                            imageServicesArray[0] = JSON.stringify(service);
                            var workflowArgs = {};
                            workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                            workflowArgs["mapServiceIDs"] = imageServicesArray;
                            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                        }
                    }
                    //var workflowArgs = {};
                    //workflowArgs["workflowId"] = "rasterFunction"; //This is the ID of the workflow.      
                    //workflowArgs["mapServiceIDs"] = imageServicesArray;
                    //this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                });
                _this.app.commandRegistry.command("processRasterFunctions").execute();
            };
            return RasterFunctionsModule;
        }(geocortex.framework.application.ModuleBase));
        raster_functions.RasterFunctionsModule = RasterFunctionsModule;
    })(raster_functions = oe.raster_functions || (oe.raster_functions = {}));
})(oe || (oe = {}));
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        var WildfireRiskPopupModule = (function (_super) {
            __extends(WildfireRiskPopupModule, _super);
            //pointFeatureSet: Observable<esri.tasks.FeatureSet> = new Observable<esri.tasks.FeatureSet>();
            function WildfireRiskPopupModule(app, lib) {
                _super.call(this, app, lib);
            }
            WildfireRiskPopupModule.prototype.initialize = function (config) {
                var _this = this;
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
            WildfireRiskPopupModule.prototype._onSiteInitialized = function (site) {
                //setup a command to toggle popup on left click
                /* new this.app.registerActivityIdHandler("ToggleFireRiskPopup", function CustomEventHandler(workflowContext, contextFunctions) {
     
                     if (fireRiskPopupEnabled) {
                         fireRiskPopupEnabled = false;
                         this.app.command("EnableMapTips").execute();
                     }
                     else {
                         fireRiskPopupEnabled = true;
                         this.app.command("DisableMapTips").execute();
                     }
                 })*/
                //disable normal map tips
                //this.app.command("DisableMapTips").execute();
            };
            return WildfireRiskPopupModule;
        }(geocortex.framework.application.ModuleBase));
        wildfireRiskPopup.WildfireRiskPopupModule = WildfireRiskPopupModule;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myApp;
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        var WildfireRiskPopupModuleView = (function (_super) {
            __extends(WildfireRiskPopupModuleView, _super);
            function WildfireRiskPopupModuleView(app, lib) {
                _super.call(this, app, lib);
                this.buildWildfireRiskWorkflowRequest = function (isQuickReport) {
                    if (isQuickReport === void 0) { isQuickReport = false; }
                    var workflowArgs = {};
                    workflowArgs.workflowId = "Wildfire_Risk_Report";
                    workflowArgs.risk_value = $("#WildfireRisk_value").text();
                    workflowArgs.risk_percent = oe.wildfireRiskPopup.riskPercentOut; //$("#WildfireRisk_riskdatapercent").text();
                    workflowArgs.wfpd = $("#WildfireRisk_forest_protection_district").text();
                    workflowArgs.wspd = $("#WildfireRisk_structural_projection_district").text();
                    workflowArgs.wrpa = $("#WildfireRisk_rangeland_protection_assoc").text();
                    workflowArgs.city = $("#WildfireRisk_city").text();
                    workflowArgs.ugb = $("#WildfireRisk_urban_growth_boundary").text();
                    workflowArgs.cwpp = $("#WildfireRisk_cwpp_area").text();
                    workflowArgs.sb360 = $("#WildfireRisk_senatebill_360").text();
                    workflowArgs.firewiseComm = $("#WildfireRisk_firewise_community").text();
                    workflowArgs.flame_min = $("#WildfireRisk_flame_min").text();
                    workflowArgs.flame_max = $("#WildfireRisk_flame_max").text();
                    workflowArgs.flame_ave = $("#WildfireRisk_flame_ave").text();
                    workflowArgs.geometryElementsJsonString = oe.wildfireRiskPopup.geometryElementsJsonString;
                    workflowArgs.reportImageFeatureCollectionJSON = oe.wildfireRiskPopup.reportImageFeatureCollectionJSON;
                    workflowArgs.reportImageExtent = oe.wildfireRiskPopup.reportImageExtent;
                    workflowArgs.pointLatLong = wildfireRiskPopup.pointLatLong;
                    workflowArgs.quickReportIn = (isQuickReport) ? true : null;
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
                };
                this.openWildfireRiskQuickRepoort = function (event, element, context) {
                    this.buildWildfireRiskWorkflowRequest(true);
                };
                this.openWildfireRiskWorkflow = function (event, element, context, isQuickReport) {
                    this.buildWildfireRiskWorkflowRequest();
                };
            }
            return WildfireRiskPopupModuleView;
        }(geocortex.framework.ui.ViewBase));
        wildfireRiskPopup.WildfireRiskPopupModuleView = WildfireRiskPopupModuleView;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var wildfireRiskPopup;
    (function (wildfireRiskPopup) {
        //popup toggle and default state
        wildfireRiskPopup.fireRiskPopupEnabled = true;
        var WildfireRiskPopupModuleViewModel = (function (_super) {
            __extends(WildfireRiskPopupModuleViewModel, _super);
            function WildfireRiskPopupModuleViewModel(app, lib) {
                _super.call(this, app, lib);
            }
            WildfireRiskPopupModuleViewModel.prototype.initialize = function (config) {
                var _this = this;
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
            WildfireRiskPopupModuleViewModel.prototype._onSiteInitialized = function (site) {
                var gsvc = null;
                //var gsvcURL = "http://tools.oregonexplorer.info/arcgis/rest/services/Geometry/GeometryServer"            
                var gsvcURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/Utilities/Geometry/GeometryServer";
                var fireRiskURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireRisk_ImageService/ImageServer/";
                var fireIntensityURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireIntensity_ImageService/ImageServer/";
                var fireSiteURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/";
                var oreallSiteURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_admin/MapServer/";
                var oreallHazardsURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_hazards/MapServer/";
                var loadingDiv = null;
                var contentDiv = null;
                var riskValueDiv = null;
                var linkDiv = null;
                var requestsToComplete = 10;
                var requestsCompleted = 0;
                var workingPointGeometry = null;
                var geometryBuffered = null;
                var geometryBufferedJsonString = null;
                var bufferArea = 0;
                var serviceInfoJson = null;
                var workingFeatureCollection = null;
                var workingApp = geocortex.framework.applications[0];
                /*
                    This module is added to the NavigationMapRegion region.
                    Geocortex adds this module above the "I want to" button.
                    Move this module to the bottom of the navigation map region
    
                    map-navigation-region
                    WildfireRiskPopupModuleView
                */
                $(".WildfireRiskPopupModuleView").appendTo(".map-navigation-region");
                //add a command button
                this.app.commandRegistry.command("toggle_firerisk_mode").register(this, toggleFireRiskMode);
                //run popup by coordinates
                this.app.commandRegistry.command("OpenFireriskPopup").register(this, openFireriskPopup);
                //grab the geocortex map event
                this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);
                //check for current mode
                if (wildfireRiskPopup.fireRiskPopupEnabled)
                    enableFireRiskMode();
                else
                    disableFireRiskMode();
                function toggleFireRiskMode() {
                    if (wildfireRiskPopup.fireRiskPopupEnabled)
                        disableFireRiskMode();
                    else
                        enableFireRiskMode();
                }
                function enableFireRiskMode() {
                    //hide map tips
                    workingApp.commandRegistry.command("HideAllMapTips").execute();
                    //disable identify for mobile?
                    workingApp.commandRegistry.command("DisableAllLayersForIdentify").execute();
                    //enable fire risk
                    workingApp.command("DisableMapTips").execute();
                    wildfireRiskPopup.fireRiskPopupEnabled = true;
                }
                function disableFireRiskMode() {
                    //clear markup
                    workingApp.command("ClearMarkupQuiet").execute();
                    //enable identify
                    workingApp.commandRegistry.command("EnableAllLayersForIdentify").execute();
                    //load the html view
                    workingApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");
                    wildfireRiskPopup.fireRiskPopupEnabled = false;
                    workingApp.command("EnableMapTips").execute();
                }
                function formateLatLong(numberIn, isLat) {
                    var dirSuffix;
                    if (isLat) {
                        if (numberIn >= 0)
                            dirSuffix = "N";
                        else
                            dirSuffix = "S";
                    }
                    else {
                        if (numberIn >= 0)
                            dirSuffix = "E";
                        else
                            dirSuffix = "W";
                    }
                    var workingString = String(Math.abs(numberIn));
                    var workingSplit = workingString.split(".");
                    return workingSplit[0] + "." + workingSplit[1].substring(0, 3) + " " + dirSuffix;
                }
                function processMapPoint(mapPointIn) {
                    if (!wildfireRiskPopup.fireRiskPopupEnabled)
                        return;
                    //store the point
                    workingPointGeometry = mapPointIn;
                    //convert to a lat long version                
                    var latLongPoint = esri.geometry.webMercatorToGeographic(workingPointGeometry);
                    var latOut = formateLatLong(latLongPoint.y, true);
                    var lonOut = formateLatLong(latLongPoint.x, false);
                    wildfireRiskPopup.pointLatLong = latOut + "," + lonOut;
                    //create a feature set that includes just this point
                    //This will be passed to the workflow to be used with a geoprocess tool
                    var pointGraphic = new esri.Graphic(workingPointGeometry);
                    //load the html view
                    workingApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");
                    requestsCompleted = 0;
                    //clear fields
                    ClearFields();
                    //risk value 
                    riskValueDiv = $("#WildfireRisk_value");
                    //loading div
                    loadingDiv = $("#WildfireRisk_loading");
                    loadingDiv.css("display", "block");
                    //swap blocks
                    $(".WildfireRiskPopupContent").css("display", "block");
                    //link div
                    linkDiv = $(".WildfireRisk_link");
                    linkDiv.css("display", "none");
                    //content div
                    contentDiv = $("#WildfireRisk_content");
                    contentDiv.css("display", "none");
                    //create an event for the close button
                    $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);
                    //show the point on map
                    workingApp.command("ClearMarkupQuiet").execute();
                    workingApp.command("AddMarkupGeometry").execute(workingPointGeometry);
                    $(".WildfireRiskPopupHeaderText").text("Your Location");
                    //get all the other data
                    requestRemainingData();
                    //create the feature collection
                    workingFeatureCollection = {
                        "id": "Drawings",
                        "opacity": 0.99,
                        "minScale": 0,
                        "maxScale": 0,
                        "featureCollection": {
                            "layers": []
                        }
                    };
                    var pointGraphic = new esri.Graphic(workingPointGeometry, geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultMarkerSymbol());
                    wildfireRiskPopup.geometryElementsJsonString = JSON.stringify(pointGraphic.toJson());
                    var layerJSON = CreateLayerJSON("userPoint", "esriGeometryPoint", [pointGraphic]);
                    //add layer JSON
                    workingFeatureCollection.featureCollection.layers.push(layerJSON);
                    //start the risk calcuation 
                    createBuffer();
                }
                function openFireriskPopup(geometryIn, appIn) {
                    if (!wildfireRiskPopup.fireRiskPopupEnabled)
                        return;
                    var jsonIn = jQuery.parseJSON(geometryIn);
                    var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));
                    processMapPoint(newPoint);
                }
                function handleMouseClick(pointIn, appIn) {
                    if (!wildfireRiskPopup.fireRiskPopupEnabled)
                        return;
                    //store the point
                    //workingPointGeometry = pointIn.mapPoint;
                    processMapPoint(pointIn.mapPoint);
                }
                function CreateLayerJSON(layerName, esriGeometryType, graphicsIn) {
                    var layerDef = {
                        "name": layerName,
                        "geometryType": esriGeometryType,
                        "fields": []
                    };
                    var featureCollection = {
                        "layerDefinition": layerDef,
                        "featureSet": null
                    };
                    var fLayer = new esri.layers.FeatureLayer(featureCollection);
                    fLayer.graphics = graphicsIn;
                    return fLayer.toJson();
                }
                function ClearFields() {
                    $("#WildfireRisk_value").text("Calculating...");
                    //$("#WildfireRisk_riskdatapercent").text("Calculating...");
                    $("#WildfireRisk_forest_protection_district").text("Searching...");
                    $("#WildfireRisk_structural_projection_district").text("Searching...");
                    $("#WildfireRisk_rangeland_protection_assoc").text("Searching...");
                    $("#WildfireRisk_city").text("Searching...");
                    $("#WildfireRisk_urban_growth_boundary").text("Searching...");
                    $("#WildfireRisk_cwpp_area").text("Searching...");
                    $("#WildfireRisk_senatebill_360").text("Searching...");
                    //warning block
                    //$("#WildfireRisk_warning").text("");
                    $("#WildfireRisk_warning").css("display", "none");
                    //hidden
                    $("#WildfireRisk_flame_min").text("Searching...");
                    $("#WildfireRisk_flame_max").text("Searching...");
                    $("#WildfireRisk_flame_ave").text("Searching...");
                }
                function AddRequestComplete(val) {
                    if (val === void 0) { val = 1; }
                    requestsCompleted += val;
                    loadingDiv.text("Processing... (" + requestsCompleted + " of " + requestsToComplete + ")");
                    if (requestsCompleted >= requestsToComplete) {
                        loadingDiv.css("display", "none");
                        contentDiv.css("display", "block");
                        linkDiv.css("display", "block");
                    }
                }
                function SetRiskValue(val) {
                    riskValueDiv.text(val);
                    AddRequestComplete();
                }
                function SetRiskError(val) {
                    riskValueDiv.text(val);
                    //add 2 because these processes are needed for two different results.
                    AddRequestComplete(2);
                }
                function createBuffer() {
                    //loadingDiv.html("Creating buffer...");
                    loadingDiv.text("Creating buffer...");
                    gsvc = new esri.tasks.GeometryService(gsvcURL);
                    var params = new esri.tasks.BufferParameters();
                    params.geometries = [workingPointGeometry];
                    params.distances = [0.25];
                    //params.bufferSpatialReference = workingPointGeometry.spatialReference;
                    params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                    params.outSpatialReference = workingPointGeometry.spatialReference;
                    gsvc.buffer(params, bufferResult, bufferError);
                    //add some other buffers
                    AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, [30, 100], AddBufferSuccess, AddBufferError);
                }
                function AddBuffer(workingPoints, unitOfMeasure, distances, successCallback, failCallback) {
                    loadingDiv.text("Creating buffer...");
                    gsvc = new esri.tasks.GeometryService(gsvcURL);
                    var params = new esri.tasks.BufferParameters();
                    params.geometries = workingPoints;
                    params.distances = distances;
                    params.unit = unitOfMeasure;
                    params.geodesic = true;
                    params.outSpatialReference = workingPointGeometry.spatialReference;
                    gsvc.buffer(params, successCallback, bufferError);
                }
                function AddBufferSuccess(geometries) {
                    if (geometries == null || geometries.length < 1) {
                        console.log("Error: ", "Add buffer error");
                        return;
                    }
                    //create string
                    wildfireRiskPopup.reportImageFeatureCollectionJSON = JSON.stringify(workingFeatureCollection);
                    //set the report image extent to the geometry
                    wildfireRiskPopup.reportImageExtent = geometries[0].getExtent();
                    AddRequestComplete(1);
                }
                function AddBufferError() {
                    console.log("Error: ", "Add buffer error");
                    AddRequestComplete(1);
                }
                function bufferError(error) {
                    console.log("Error: ", error.message);
                    SetRiskError("Error: Buffer creation");
                }
                function bufferResult(geometries) {
                    if (geometries == null || geometries.length < 1) {
                        console.log("Error: ", "No buffer returned");
                        riskValueDiv.text("Error: No buffer returned");
                        return;
                    }
                    loadingDiv.text("Calculating...");
                    //grab the geometry
                    geometryBuffered = geometries[0];
                    geometryBufferedJsonString = JSON.stringify(geometryBuffered.toJson());
                    //show the buffer for now
                    workingApp.command("AddMarkupGeometry").execute(geometryBuffered);
                    //simplify the selection first
                    gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);
                }
                function simplifyError(error) {
                    console.log("Error: ", error.message);
                    SetRiskError("Error: Simplify Failed");
                }
                function simplifyComplete(simplifiedGeometries) {
                    var alparams = new esri.tasks.AreasAndLengthsParameters();
                    alparams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                    alparams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                    alparams.calculationType = "preserveShape";
                    alparams.polygons = simplifiedGeometries;
                    //var str = JSON.stringify(geometryBuffered.toJson());
                    loadingDiv.text("Calculating area...");
                    gsvc.areasAndLengths(alparams, requestAreaResult, requestAreaError);
                }
                function requestAreaError(error) {
                    console.log("Error: ", error.message);
                    //riskValueDiv.text("Error: Area calculation failed.");
                    SetRiskError("Error: Area calculation failed.");
                }
                function requestAreaResult(result) {
                    bufferArea = result.areas[0];
                    requestMapServiceInfo();
                }
                function requestMapServiceInfo() {
                    var requestObj = esri.request({
                        url: fireRiskURL,
                        handleAs: "json",
                        content: {
                            f: "json"
                        }
                    });
                    requestObj.then(requestInfoComplete, requestInfoError);
                }
                function requestInfoError(error) {
                    console.log("Error: ", error.message);
                    //riskValueDiv.text("Error: Service information failed.");
                    SetRiskError("Error: Service information failed.");
                }
                function requestInfoComplete(jsonData) {
                    //set the pixel size
                    serviceInfoJson = jsonData; //alert(data);
                    //request histogram
                    requestHistogram(JSON.stringify(geometryBuffered.toJson()));
                }
                function requestHistogram(geoStringIn) {
                    var requestObj = esri.request({
                        url: fireRiskURL + "computeHistograms",
                        handleAs: "json",
                        content: {
                            f: "json",
                            geometryType: "esriGeometryPolygon ",
                            geometry: geoStringIn,
                            mosaicRule: "",
                            renderingRule: "",
                            pixelSize: ""
                        }
                    });
                    //fire risk histogram
                    requestObj.then(requestHistogram_success, requestHistogram_fail);
                }
                function requestHistogram_success(data) {
                    var counts = null;
                    var countTotal = 0;
                    var valueTotal = 0;
                    var averageFirerisk = 0;
                    //process histogram data
                    if (data.histograms.length > 0) {
                        counts = data.histograms[0].counts;
                        //loop over the counts
                        var i = 0;
                        for (i = 0; i < counts.length; i++) {
                            countTotal += counts[i];
                            valueTotal += counts[i] * i;
                        }
                        averageFirerisk = Math.round((valueTotal / countTotal) * 100) / 100;
                    }
                    var riskName = "No Data";
                    if (averageFirerisk >= 16) {
                        riskName = "High";
                    }
                    else if (averageFirerisk >= 5) {
                        riskName = "Moderate";
                    }
                    else if (averageFirerisk > 0) {
                        riskName = "Low";
                    }
                    //bufferArea = Math.round(bufferArea * 100) / 100;              
                    var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                    var maxPixels = bufferArea / pixelArea;
                    var dataPercent = Math.round((countTotal / maxPixels) * 100);
                    //$("#WildfireRisk_riskdatapercent").text(dataPercent + "%");
                    wildfireRiskPopup.riskPercentOut = dataPercent;
                    //show warning if data percent is low
                    if (dataPercent < 25) {
                        //$("#WildfireRisk_warning").text("Warning! Incomplete data coverage in your area.");
                        $("#WildfireRisk_warning").css("display", "block");
                    }
                    SetRiskValue(riskName);
                    getFireIntensity();
                }
                function requestHistogram_fail(error) {
                    console.log("Error: ", error.message);
                    //riskValueDiv.text("Error: Histogram creation failed.");                
                    SetRiskError("Error: Histogram creation failed.");
                }
                function getFireIntensity() {
                    var requestIntensity = esri.request({
                        url: fireIntensityURL + "computeHistograms",
                        handleAs: "json",
                        content: {
                            f: "json",
                            geometryType: "esriGeometryPolygon ",
                            geometry: geometryBufferedJsonString,
                            mosaicRule: "",
                            renderingRule: "",
                            pixelSize: ""
                        }
                    });
                    //fire intensity histogram
                    requestIntensity.then(intensity_success, intensity_fail);
                }
                function intensity_success(data) {
                    //flame categories
                    //1 = 0
                    //2 = 0-4
                    //3 = 4-8
                    //4 = 8-11
                    //5 = >11
                    //average values for a given histogram array index
                    var categories = [
                        { "min": -1, "max": -1, "rangeMid": -1 },
                        { "min": 0, "max": 0, "rangeMid": 0 },
                        { "min": 0, "max": 4, "rangeMid": 2 },
                        { "min": 4, "max": 8, "rangeMid": 6 },
                        { "min": 8, "max": 11, "rangeMid": 9.5 },
                        { "min": "> 11", "max": "> 11", "rangeMid": "> 11" }
                    ];
                    var counts = null;
                    var flameLow = 300;
                    var flameHigh = 0;
                    var flameAverage = 0;
                    var flameAveStr = "0";
                    var totalPixelCount = 0;
                    var totalPixelCategoryValue = 0;
                    //var countTotal = 0;
                    //var valueTotal = 0;
                    //var iVal = 0;
                    var str = "";
                    var i = 0;
                    if (data.histograms.length > 0) {
                        counts = data.histograms[0].counts;
                        //get total for all categories                    
                        for (i = 0; i < counts.length; i++) {
                            totalPixelCount += counts[i];
                            totalPixelCategoryValue += counts[i] * i;
                            //set flameLow
                            if (counts[i] > 0 && i < flameLow) {
                                flameLow = i;
                            }
                            //set flameHigh
                            if (counts[i] > 0 && i > flameHigh) {
                                flameHigh = i;
                            }
                        }
                        if (flameLow == 300)
                            flameLow = 1;
                        flameAverage = Math.round(totalPixelCategoryValue / totalPixelCount);
                        if (flameAverage > -1 && flameAverage < categories.length)
                            $("#WildfireRisk_flame_ave").text(categories[flameAverage].rangeMid);
                        else
                            $("#WildfireRisk_flame_ave").text("No Data");
                        if (flameLow > -1 && flameLow < categories.length)
                            $("#WildfireRisk_flame_min").text(categories[flameLow].min);
                        else
                            $("#WildfireRisk_flame_min").text("No Data");
                        if (flameHigh > -1 && flameHigh < categories.length)
                            $("#WildfireRisk_flame_max").text(categories[flameHigh].max);
                        else
                            $("#WildfireRisk_flame_max").text("No Data");
                    }
                    AddRequestComplete();
                }
                function intensity_fail(error) {
                    console.log("Error: ", error.message);
                    //SetRiskValue("Error: Histogram creation failed.");
                    AddRequestComplete();
                }
                function sendQueryRequest(url, layerID, fieldName, divElement, resultCallback, errorCallBack, returnGeometry) {
                    if (returnGeometry === void 0) { returnGeometry = false; }
                    var queryTask = new esri.tasks.QueryTask(url + layerID);
                    //build query filter
                    var query = new esri.tasks.Query();
                    //query.geometry = geometryBuffered;
                    query.geometry = workingPointGeometry;
                    query.returnGeometry = returnGeometry;
                    query.outFields = [fieldName];
                    queryTask.execute(query, function (result) {
                        AddRequestComplete();
                        resultCallback(result.features, fieldName, divElement);
                    }, function (error) {
                        AddRequestComplete();
                        errorCallBack(error, divElement);
                    });
                }
                function resultRemainingData(features, attributeName, divElement) {
                    if (features.length < 1) {
                        divElement.text("None");
                        return;
                    }
                    var i = 0;
                    var str = "";
                    var strItem = "";
                    for (i = 0; i < features.length; i++) {
                        strItem = features[i].attributes[attributeName];
                        strItem = strItem.trim();
                        if (strItem === "")
                            strItem = "None";
                        str += strItem;
                    }
                    divElement.html(str);
                }
                function errorRemainingData(error, divElement) {
                    //console.log("Error: ", error.message);
                    divElement.text("No data");
                }
                function requestRemainingData() {
                    //Wildfire Forest Projection District
                    sendQueryRequest(fireSiteURL, "65", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                    //Structural Fire Protection District
                    sendQueryRequest(fireSiteURL, "67", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);
                    //Rangeland Protection Associations
                    sendQueryRequest(fireSiteURL, "66", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);
                    //city or town
                    sendQueryRequest(fireSiteURL, "59", "name", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);
                    //urban growth boundary
                    sendQueryRequest(fireSiteURL, "69", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);
                    //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                    sendQueryRequest(fireSiteURL, "72", "cwpp", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);
                    //Firewise community
                    sendQueryRequest(fireSiteURL, "71", "name", $("#WildfireRisk_firewise_community"), resultRemainingData, errorRemainingData);
                    //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                    sendQueryRequest(fireSiteURL, "80", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);
                }
                function UGB_result(features, attributeName, divElement) {
                    if (features.length < 1) {
                        divElement.text("Outside Urban Growth Boundary");
                        return;
                    }
                    var i = 0;
                    var str = "";
                    for (i = 0; i < features.length; i++) {
                        str += features[i].attributes[attributeName] + ", ";
                    }
                    str = str.slice(0, -2);
                    divElement.html("Within " + str);
                }
                function UGB_error(error, divElement) {
                    divElement.text("Outside Urban Growth Boundary");
                }
                function SB360_result(features, attributeName, divElement) {
                    if (features.length < 1) {
                        divElement.text("No");
                        return;
                    }
                    divElement.text("Yes");
                }
                function SB360_error(error, divElement) {
                    divElement.text("No");
                }
                function closeWildfireRiskPopup() {
                    workingApp.command("ClearMarkupQuiet").execute();
                    //deactivate view
                    workingApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");
                }
            };
            return WildfireRiskPopupModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        wildfireRiskPopup.WildfireRiskPopupModuleViewModel = WildfireRiskPopupModuleViewModel;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));

/* End Script: C:/Users/schoepft.LIBRARY/Source/Repos/oe-gcx-html-viewer/custom_ts_out.js ------------------------- */ 

geocortex.resourceManager.register("Custom","inv","Modules/CustomFormM49/CustomFormM49ModuleView.html","html","DQoNCjxkaXYgY2xhc3M9Im1vZHVsZSB3b3JrZmxvdy1mb3JtIiBkaXI9Imx0ciI+DQogICAgPGZvcm0gaWQ9ImN1c3RvbUZvcm0iIHRpdGxlPSJNZWFzdXJlIDQ5IEVzdGltYXRlZCBDb25zdHJhaW50cyI+DQogICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgIDxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICA8bGVnZW5kPlNlbGVjdGVkIEFyZWEocyk8L2xlZ2VuZD4NCiAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DdXN0b20gRHJhd24gQXJlYTwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnpvb21Ub30iPlpvb20gVG88L3NwYW4+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgPGZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxsZWdlbmQ+RXN0aW1hdGVkIENvbnN0cmFpbnRzPC9sZWdlbmQ+DQogICAgICAgICAgICAgICAgPHRhYmxlIGlkPSJjb25zdHJhaW50cy10YWJsZSI+DQogICAgICAgICAgICAgICAgICAgIDx0aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+Q29uc3RyYWludHM8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BcmVhKCUpPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+DQogICAgICAgICAgICAgICAgICAgIDx0Ym9keT4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz0iYWx0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9ImNvbnN0cmFpbnQtY2VsbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SGlnaC12YWx1ZSBmYXJtbGFuZCBzb2lsIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb25zdHJhaW50LWxheWVyLWNvbnRyb2xzIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazp0b2dnbGVMYXllcn0iIGRhdGEtYXR0ci1sYXllcj0iSGlnaC12YWx1ZSBGYXJtIFNvaWxzIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2dnbGUgbGF5ZXINCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpzaG93SW5mb30iIGRhdGEtYXR0ci1jb25zdHJhaW50PSJIVkZMIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50IEluZm8NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Imh2Zmxfc29pbCI+PC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkhpZ2gtdmFsdWUgZmFybWxhbmQgZGFpcnkgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJIaWdoLXZhbHVlIEZhcm0gRGFpcnkgU29pbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlIGxheWVyDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGluayIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6c2hvd0luZm99IiBkYXRhLWF0dHItY29uc3RyYWludD0iSFZGRCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludCBJbmZvDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJodmZsX2RhaXJ5Ij48L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz0iYWx0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SGlnaC12YWx1ZSBmb3Jlc3RsYW5kPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJIaWdoLXZhbHVlIEZvcmVzdCBsYW5kIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2dnbGUgbGF5ZXINCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsaW5rIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpzaG93SW5mb30iIGRhdGEtYXR0ci1jb25zdHJhaW50PSJIVkZvcmVzdCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludCBJbmZvDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJodmYiPjwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5MaWtlbHkgaGlnaC12YWx1ZSBmb3Jlc3RsYW5kPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnRvZ2dsZUxheWVyfSIgZGF0YS1hdHRyLWxheWVyPSJMaWtlbHkgaGlnaC12YWx1ZSBmb3Jlc3RsYW5kIHdlc3Qgb2YgdGhlIENhc2NhZGVzIFBvc3NpYmxlIGFyZWFzIG9mIGhpZ2gtdmFsdWUgZm9yZXN0bGFuZCBlYXN0IG9mIHRoZSBDYXNjYWRlcyI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlIGxheWVyDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGluayIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6c2hvd0luZm99IiBkYXRhLWF0dHItY29uc3RyYWludD0iTEhWRm9yZXN0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50IEluZm8NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9Imh2Zl9saWtlbHkiPjwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICA8L3Rib2R5Pg0KICAgICAgICAgICAgICAgIDwvdGFibGU+DQogICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgPGZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxsZWdlbmQ+UERGIFJlcG9ydCBTZXR0aW5nczwvbGVnZW5kPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybSBsYWJlbC1sZWZ0IiBpZD0iY3VzdG9tRm9ybUJvZHkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0icmVwb3J0VGl0bGUiIGNsYXNzPSJmb3JtLWxhYmVsIG15TGFiZWwiPlRpdGxlPC9sYWJlbD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udHJvbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPSJyZXBvcnRUaXRsZSIgdHlwZT0idGV4dCIgcGxhY2Vob2xkZXI9IlJlcG9ydCBUaXRsZSIgdmFsdWU9IlJlcG9ydCBUaXRsZSIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2xlYXJUaXRsZX0iLz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0idXNlck5hbWUiIGlkPSJ1c2VyTmFtZWxibCIgY2xhc3M9ImZvcm0tbGFiZWwgbXlMYWJlbCI+SW5jbHVkZSBtYXA8L2xhYmVsPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jb250cm9sIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9ImluY2x1ZGVNYXAiIHR5cGU9ImNoZWNrYm94IiBjaGVja2VkIC8+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDwvZmllbGRzZXQ+DQoNCiAgICAgICAgICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQ7IHdpZHRoOjEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiIGNsYXNzPSJmb3JtLWJ0bnMiPg0KICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9Im9rQnRuIiBjbGFzcz0iYnV0dG9uIiB0eXBlPSJidXR0b24iIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOnJ1bk5ld1JlcG9ydH0iPjw8IE5ldyBSZXBvcnQ8L2J1dHRvbj4NCiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSJva0J0biIgY2xhc3M9ImJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpnZXRQREZ9Ij5Db250aW51ZSA+PjwvYnV0dG9uPg0KICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9ImNhbmNlbEJ0biIgY2xhc3M9ImJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpjYW5jZWxGb3JtfSI+Q2xvc2U8L2J1dHRvbj4NCiAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICA8L2Rpdj4NCiAgICA8L2Zvcm0+DQogICAgPGRpdiBpZD0iYW5pbWF0aW9uIj48L2Rpdj4NCg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/DevelopmentRegistry/DevelopmentRegistryModuleProjectReportView.html","html","PGEgaHJlZj0iIyI+PC9hPg0KPGRpdiBjbGFzcz0ibW9kdWxlIHdvcmtmbG93LWZvcm0iIGRpcj0ibHRyIj4NCiAgICA8IS0tPGRpdiBpZD0icmVwb3J0LWRhdGUiIGRhdGEtYmluZGluZz0ie0B0ZXh0OnJlcG9ydERhdGV9Ij48L2Rpdj4tLT4NCiAgICA8Zm9ybSBpZD0iY3VzdG9tRm9ybSIgdGl0bGU9IlByb2plY3QgSW1wYWN0IFJlcG9ydCI+DQogICAgICAgIDxkaXYgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6cGFjX2ludGVyc2VjdH0iIGNsYXNzPSJmb3JtLWNvbnRhaW5lciI+DQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJyZXBvcnRfaGVhZGVyIj4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJwYWNfdGl0bGUiPg0KICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4+UmVwb3J0IGZvcjo8L3NwYW4+LS0+DQogICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLWJpbmRpbmc9IntAdGV4dDogcmVwb3J0X3RpdGxlfSI+PC9oMj4NCiAgICAgICAgICAgICAgICAgICAgPCEtLTxoNCBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTpoYXNfcHJval9uYW1lfSI+KEluY2x1ZGVzIGRldmVsb3BtZW50cyBpbiA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZXZfbmFtZX0iPjwvc3Bhbj4pPC9oND4tLT4NCiAgICAgICAgICAgICAgICAgICAgPGg0PihJbmNsdWRlcyBhcHByb3ZlZCBwcm9qZWN0cyBpbiBhbnkgaW50ZXJzZWN0ZWQgUEFDcyBhbmQgb25seSB0aGUgc2VsZWN0ZWQgcHJvamVjdC9kZXZlbG9wbWVudCk8L2g0Pg0KICAgICAgICAgICAgICAgICAgICA8IS0tPGg1IGRhdGEtYmlkaW5nPSJ7QHZpc2libGU6aXNfdXBkYXRlZF9kZXZlbG9wbWVudF9hcmVhfSI+U2hvd2luZyB1cGRhdGVkIGFyZWEgcG90ZW50aWFsIGltcGFjdC48L2g1Pi0tPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuPlRvdGFsIGFyZWEgb2YgcHJvamVjdC9kZXZlbG9wbWVudDogPC9zcGFuPjxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OnByb2pfZGV2X2FyZWF9Ij48L3NwYW4+PGJyIC8+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuPk51bWJlciBvZiBkZXZlbG9wbWVudHM6IDwvc3Bhbj48c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZXZfbnVtfSI+PC9zcGFuPjxiciAvPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXJ0IG9mIFBBQyhzKTogPC9zcGFuPjxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OnBhY19uYW1lX2xpc3R9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgPC9kaXY+DQoNCiAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz0icHJvamVjdF93cmFwcGVyIj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJvamVjdCBhcmVhOiA8L3NwYW4+PGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6cHJval9kZXZfYXJlYX0iPjwvYj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4tLT4NCiAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmRpbmc9IntAc291cmNlOiBwcm9qX3BhY19yZXBvcnRfZGF0YX0iPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InN1bW1hcnktd3JhcHBlciIgZGF0YS1iaW5kaW5nPSJ7QHRlbXBsYXRlLWZvcjogcHJval9wYWNfcmVwb3J0X2RhdGF9Ij4NCiAgICAgICAgICAgICAgICAgICAgPGgzPlN1bW1hcnkgb2YgUEFDIERldmVsb3BtZW50PC9oMz4NCiAgICAgICAgICAgICAgICAgICAgPGgzIGRhdGEtYmluZGluZz0ie0B0ZXh0OnBhY19uYW1lfSI+PC9oMz4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpZGluZz0ie0B2aXNpYmxlOmlzX3VwZGF0ZWRfZGV2ZWxvcG1lbnRfYXJlYX0iIGNsYXNzPSJwYWNfc3VtX2Rlc2MiPihJbmNsdWRlcyBhcHByb3ZlZCBhbmQgYXMtYnVpbHQgcHJvamVjdHMgaW4gdGhlIFBBQyBhbmQgb25seSB0aGUgc2VsZWN0ZWQgcHJvamVjdC9kZXZlbG9wbWVudDsgbm8gb3RoZXIgaW4tcmV2aWV3IHByb2plY3RzIGluIGFyZSBpbmNsdWRlZCk8L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBhY19hcmVhX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VG90YWwgYXJlYSBvZiBQQUM6IDwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBwYWNfYXJlYX0iPjwvYj4NCiAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImJhc2VsaW5lX3BhY193cmFwcGVyIj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkJhc2VsaW5lIGRldmVsb3BlZCBhcmVhOiA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDpiYXNlbGluZV9hcmVhfSI+PC9iPiwgPGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YmFzZWxpbmVfcGVyY2VudH0iPjwvYj48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8YnIgLz4NCiAgICAgICAgICAgICAgICAgICAgPGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IHJlcG9ydF90aXRsZX0iPjwvYj48Yj4gSW1wYWN0IG9uIFBBQzwvYj4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icHJvamVjdC1pbXBhY3Qtd3JhcHBlciI+DQogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlByb2plY3QgQXJlYSBpbiBQQUM6PC9zcGFuPjxiciAvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OmlucHV0X2FyZWFfcGFjX2FyZWF9Ij48L2I+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBhcmVhIG9mIFBBQzo8L3NwYW4+PGJyIC8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6aW5wdXRfYXJlYV9wYWNfcGVyY2VudH0iPjwvYj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48Yj5Ub3RhbCBkZXZlbG9wZWQgYXJlYTogPC9iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBvdmVyYWxsX2FyZWFfdmFsfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IG92ZXJhbGxfY2FwX3ZhbH0iPjwvYj48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJub3RlcyI+VGhlIHRvdGFsIGRldmVsb3BlZCBhcmVhIGlzIG5vdCBhbGxvd2VkIHRvIGV4Y2VlZCAzJS48L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgPGRpdj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxiPk5ldyBkZXZlbG9wZWQgYXJlYSBpbiBkZWNhZGU6IDwvYj48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDogZGVjYWRlX2FyZWFfdmFsfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IGRlY2FkZV9jYXBfdmFsfSI+PC9iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im5vdGVzIj5UaGUgdG90YWwgZGV2ZWxvcGVkIGFyZWEgaXMgbm90IGFsbG93ZWQgdG8gZXhjZWVkIDElIHBlciBkZWNhZGUuPC9kaXY+DQogICAgICAgICAgICAgICAgICAgIDxiciAvPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgIDwvZGl2Pg0KICAgICAgICA8ZGl2IGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOm5vX3BhY19pbnRlcnNlY3R9IiBjbGFzcz0iZm9ybS1jb250YWluZXIiPg0KICAgICAgICAgICAgPGRpdiBjbGFzcz0icmVwb3J0X2hlYWRlciI+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icGFjX3RpdGxlIj4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0OiByZXBvcnRfdGl0bGV9Ij48L2gyPg0KICAgICAgICAgICAgICAgICAgICA8aDQ+KFRoaXMgcHJvamVjdC9kZXZlbG9wbWVudCBkb2VzIG5vdCBpbnRlcnNlY3QgYW55IG9mIHRoZSBQQUNzKTwvaDQ+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDxoMz5Qcm9qZWN0L0RldmVsb3BtZW50IEluZm88L2gzPg0KICAgICAgICAgICAgPGRpdiBjbGFzcz0icHJvamVjdC1pbXBhY3Qtd3JhcHBlciI+DQogICAgICAgICAgICAgICAgPGRpdj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJvamVjdCBBcmVhOjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0OnByb2pfZGV2X2FyZWF9Ij48L2gyPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgIDwvZGl2Pg0KICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgPGRpdiBzdHlsZT0idGV4dC1hbGlnbjpyaWdodDsgd2lkdGg6MTAwJTsgZGlzcGxheTppbmxpbmUtYmxvY2s7IiBjbGFzcz0iZm9ybS1idG5zIj4NCiAgICAgICAgICAgICAgICA8IS0tPGJ1dHRvbiBpZD0ib2tCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6cnVuTmV3UmVwb3J0fSI+PDwgTmV3IFJlcG9ydDwvYnV0dG9uPg0KICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9Im9rQnRuIiBjbGFzcz0iYnV0dG9uIiB0eXBlPSJidXR0b24iIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOmdldFBERn0iPkNvbnRpbnVlID4+PC9idXR0b24+LS0+DQogICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0iY2FuY2VsQnRuIiBjbGFzcz0iYnV0dG9uIiB0eXBlPSJidXR0b24iIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOmNhbmNlbEZvcm19Ij5DbG9zZTwvYnV0dG9uPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgIDwvZGl2Pg0KICAgIDwvZm9ybT4NCjwvZGl2Pg0KDQo=");
geocortex.resourceManager.register("Custom","inv","Modules/DevelopmentRegistry/DevelopmentRegistryModuleView.html","html","PGEgaHJlZj0iIyI+PC9hPg0KPGRpdiBjbGFzcz0ibW9kdWxlIHdvcmtmbG93LWZvcm0iIGRpcj0ibHRyIj4NCiAgICA8ZGl2IGlkPSJyZXBvcnQtZGF0ZSIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6cmVwb3J0RGF0ZX0iPjwvZGl2Pg0KICAgIDxmb3JtIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBoYXNfcHJvamVjdGVkfSIgaWQ9ImN1c3RvbUZvcm0iIHRpdGxlPSJFc3RpbWF0ZWQgRGV2ZWxvcG1lbnQgSW1wYWN0IFJlcG9ydCI+DQogICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgIDxkaXYgY2xhc3M9InJlcG9ydF9oZWFkZXIiPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBhY190aXRsZSI+DQogICAgICAgICAgICAgICAgICAgIDwhLS08c3Bhbj5SZXBvcnQgZm9yOjwvc3Bhbj4tLT4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBwYWNfdGl0bGVfcHJvamVjdGVkfSI+PC9oMj4NCiAgICAgICAgICAgICAgICAgICAgPGg0PihJbmNsdWRlcyBwZXJtaXRzIGluIHJldmlldyk8L2g0Pg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBhY19hcmVhX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Ub3RhbCBhcmVhIG9mIFBBQzogPC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDogcGFjX2FyZWF9Ij48L2I+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iYmFzZWxpbmVfcGFjX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CYXNlbGluZSBkZXZlbG9wZWQgYXJlYTogPGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YmFzZWxpbmVfYXJlYX0iPjwvYj4sIDxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OmJhc2VsaW5lX3BlcmNlbnR9Ij48L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJzdW1tYXJ5LXdyYXBwZXIiPg0KICAgICAgICAgICAgICAgIDxoMz5TdW1tYXJ5IG9mIFBBQyBEZXZlbG9wbWVudDwvaDM+DQogICAgICAgICAgICAgICAgPGg0PihJbmNsdWRlcyBQZXJtaXRzIEluLVJldmlldyk8L2g0Pg0KICAgICAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuPjxiPlRvdGFsIGRldmVsb3BlZCBhcmVhOiA8L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDogb3ZlcmFsbF9wcm9qZWN0ZWRfYXJlYV92YWx9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuPjxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBvdmVyYWxsX3Byb2plY3RlZF9jYXBfdmFsfSI+PC9iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJub3RlcyI+VGhlIHRvdGFsIGRldmVsb3BlZCBhcmVhIGlzIG5vdCBhbGxvd2VkIHRvIGV4Y2VlZCAzJS48L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj48Yj5OZXcgZGV2ZWxvcGVkIGFyZWEgaW4gZGVjYWRlOiA8L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDogZGVjYWRlX3Byb2plY3RlZF9hcmVhX3ZhbH0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IGRlY2FkZV9wcm9qZWN0ZWRfY2FwX3ZhbH0iPjwvYj48L3NwYW4+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ibm90ZXMiPlRoZSB0b3RhbCBkZXZlbG9wZWQgYXJlYSBpcyBub3QgYWxsb3dlZCB0byBleGNlZWQgMSUgcGVyIGRlY2FkZS48L2Rpdj4NCiAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlscyI+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ibm90ZXMiPg0KICAgICAgICAgICAgICAgICAgICA8ZW0+Tk9URTogVmFsdWVzIGluY2x1ZGUgZGV2ZWxvcG1lbnQgdGhhdCBpcyBpbi1yZXZpZXcsIGFwcHJvdmVkLCBhbmQgYXMtYnVpbHQuPC9lbT4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8aHIgLz4NCiAgICAgICAgICAgICAgICA8aDM+VG90YWwgZGV2ZWxvcGVkIGFyZWE8L2gzPg0KICAgICAgICAgICAgICAgIDxoND4oaW5jbHVkaW5nIHBlcm1pdHMgaW4gcmV2aWV3KTwvaDQ+DQogICAgICAgICAgICAgICAgPHRhYmxlPg0KICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPkRldmVsb3BtZW50IFR5cGU8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BY3JlczwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPlBlcmNlbnQ8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZGluZz0ie0Bzb3VyY2U6IG92ZXJhbGxfcHJvamVjdGVkX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IG92ZXJhbGxfcHJvamVjdGVkX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6Y2F0ZWdvcnl9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmFyZWF9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OnBlcmNlbnR9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+DQogICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICA8YnIgLz4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjYXBfdmFsIj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBvZiB0b3RhbCBkZXZlbG9wZWQgYXJlYSA8Yj5pbmNsdWRpbmcgcGVybWl0cyBpbiByZXZpZXc8L2I+IChsaW1pdGVkIHRvIDMlKTwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0Om92ZXJhbGxfcHJvamVjdGVkX2NhcF92YWx9Ij48L2gyPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxiciAvPg0KICAgICAgICAgICAgICAgIDxociAvPg0KICAgICAgICAgICAgICAgIDxoMz5OZXcgZGV2ZWxvcGVkIGFyZWEgaW4gZGVjYWRlPC9oMz4NCiAgICAgICAgICAgICAgICA8aDQ+KGluY2x1ZGluZyBwZXJtaXRzIGluIHJldmlldyk8L2g0Pg0KICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd19kZWNhZGVfdGJsX3Byb2plY3RlZH0iPg0KICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPkRldmVsb3BtZW50IFR5cGU8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BY3JlczwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPlBlcmNlbnQ8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZGluZz0ie0Bzb3VyY2U6IGRlY2FkZV9wcm9qZWN0ZWRfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHIgZGF0YS1iaW5kaW5nPSJ7QHRlbXBsYXRlLWZvcjogZGVjYWRlX3Byb2plY3RlZF90Ymx9Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmNhdGVnb3J5fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDphcmVhfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpwZXJjZW50fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICA8L3Rib2R5Pg0KICAgICAgICAgICAgICAgIDwvdGFibGU+DQogICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY2FwX3ZhbCI+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuPlBlcmNlbnQgb2YgbmV3IGRldmVsb3BlZCBhcmVhIGluIGRlY2FkZSwgPGI+aW5jbHVkaW5nIHBlcm1pdHMgaW4gcmV2aWV3PC9iPiAobGltaXRlZCB0byAxJSk8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZWNhZGVfcHJvamVjdGVkX2NhcF92YWx9Ij48L2gyPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im5vdGVzIj4NCiAgICAgICAgICAgICAgICAgICAgPGVtPk5PVEU6IERlY2FkYWwgdGltZSBwZXJpb2QgaXMgQXVndXN0IDEzLCAyMDE1IHRocm91Z2ggQXVndXN0IDEyLCAyMDI1PC9lbT4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCg0KICAgICAgICAgICAgICAgIDwhLS08ZmllbGRzZXQ+DQogICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+U3VtbWFyeTwvbGVnZW5kPg0KICAgICAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBvZiBQQUMgZGV2ZWxvcGVkIHRoaXMgZGVjYWRlOjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OmRlY2FkZV9wcm9qZWN0ZWRfY2FwX3ZhbH0iPjwvYj4NCiAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4zJSBtYXhpbXVtIGRldmVsb3BtZW50IHRocmVzaG9sZDo8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDpvdmVyYWxsX3Byb2plY3RlZF9jYXBfdmFsfSI+PC9iPg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5EZXZlbG9wbWVudCBDYXAgU3RhdHVzICgxJS9kZWNhZGUpPC9sZWdlbmQ+DQogICAgICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd19kZWNhZGVfdGJsX3Byb2plY3RlZH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPlNvdXJjZTwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BY3JlczwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj4lIG9mIFRvdGFsPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmRpbmc9IntAc291cmNlOiBkZWNhZGVfcHJvamVjdGVkX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBkYXRhLWJpbmRpbmc9IntAdGVtcGxhdGUtZm9yOiBkZWNhZGVfcHJvamVjdGVkX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpjYXRlZ29yeX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YXJlYX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6cGVyY2VudH0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT4NCiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNhcF92YWwiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBvZiBQQUMgZGV2ZWxvcGVkIHRoaXMgZGVjYWRlOjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZWNhZGVfcHJvamVjdGVkX2NhcF92YWx9Ij48L2gyPg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ibm90ZXMiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGVtPk5PVEU6IERlY2FkYWwgdGltZSBwZXJpb2QgaXMgQXVndXN0IDEzLCAyMDE1IHRocm91Z2ggQXVndXN0IDEyLCAyMDI1PC9lbT4NCiAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPC9maWVsZHNldD4NCiAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+DQogICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+MyUgbWF4aW11bSBkZXZlbG9wbWVudCB0aHJlc2hvbGQ8L2xlZ2VuZD4NCiAgICAgICAgICAgICAgICAgICAgPHRhYmxlPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPlNvdXJjZTwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5BY3JlczwvdGg+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj4lIG9mIFRvdGFsPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmRpbmc9IntAc291cmNlOiBvdmVyYWxsX3Byb2plY3RlZF90Ymx9Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgZGF0YS1iaW5kaW5nPSJ7QHRlbXBsYXRlLWZvcjogb3ZlcmFsbF9wcm9qZWN0ZWRfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmNhdGVnb3J5fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDphcmVhfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpwZXJjZW50fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5Pg0KICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPg0KICAgICAgICAgICAgICAgICAgICA8YnIgLz4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY2FwX3ZhbCI+DQogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QZXJjZW50IG9mIFBBQyBkZXZlbG9wZWQgb3ZlcmFsbDo8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICA8aDIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6b3ZlcmFsbF9wcm9qZWN0ZWRfY2FwX3ZhbH0iPjwvaDI+DQogICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+LS0+DQogICAgICAgICAgICAgICAgPCEtLTxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5QREYgUmVwb3J0IFNldHRpbmdzPC9sZWdlbmQ+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0gbGFiZWwtbGVmdCIgaWQ9ImN1c3RvbUZvcm1Cb2R5Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPSJyZXBvcnRUaXRsZSIgY2xhc3M9ImZvcm0tbGFiZWwgbXlMYWJlbCI+VGl0bGU8L2xhYmVsPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udHJvbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0icmVwb3J0VGl0bGUiIHR5cGU9InRleHQiIHBsYWNlaG9sZGVyPSJSZXBvcnQgVGl0bGUiIHZhbHVlPSJSZXBvcnQgVGl0bGUiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOmNsZWFyVGl0bGV9IiAvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9InVzZXJOYW1lIiBpZD0idXNlck5hbWVsYmwiIGNsYXNzPSJmb3JtLWxhYmVsIG15TGFiZWwiPkluY2x1ZGUgbWFwPC9sYWJlbD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWNvbnRyb2wiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9ImluY2x1ZGVNYXAiIHR5cGU9ImNoZWNrYm94IiBjaGVja2VkIC8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQoNCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0Pi0tPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOnJpZ2h0OyB3aWR0aDoxMDAlOyBkaXNwbGF5OmlubGluZS1ibG9jazsiIGNsYXNzPSJmb3JtLWJ0bnMiPg0KICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uIGlkPSJva0J0biIgY2xhc3M9ImJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpydW5OZXdSZXBvcnR9Ij48PCBOZXcgUmVwb3J0PC9idXR0b24+DQogICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ib2tCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Z2V0UERGfSI+Q29udGludWUgPj48L2J1dHRvbj4tLT4NCiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSJjYW5jZWxCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2FuY2VsRm9ybX0iPkNsb3NlPC9idXR0b24+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgPC9kaXY+DQogICAgPC9mb3JtPg0KICAgIDxmb3JtIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBoYXNfY3VycmVudH0iIGlkPSJjdXN0b21Gb3JtIiB0aXRsZT0iUEFDIERldmVsb3BtZW50IFJlcG9ydCI+DQogICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udGFpbmVyIj4NCiAgICAgICAgICAgIDxkaXYgY2xhc3M9InJlcG9ydF9oZWFkZXIiPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBhY190aXRsZSI+DQogICAgICAgICAgICAgICAgICAgIDwhLS08c3Bhbj5SZXBvcnQgZm9yOjwvc3Bhbj4tLT4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBwYWNfdGl0bGV9Ij48L2gyPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBhY19hcmVhX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Ub3RhbCBhcmVhIG9mIFBBQzogPC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDogcGFjX2FyZWF9Ij48L2I+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iYmFzZWxpbmVfcGFjX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CYXNlbGluZSBkZXZlbG9wZWQgYXJlYTogPGIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YmFzZWxpbmVfYXJlYX0iPjwvYj4sIDxiIGRhdGEtYmluZGluZz0ie0B0ZXh0OmJhc2VsaW5lX3BlcmNlbnR9Ij48L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJzdW1tYXJ5LXdyYXBwZXIiPg0KICAgICAgICAgICAgICAgIDxoMj5TdW1tYXJ5IG9mIFBBQyBEZXZlbG9wbWVudDwvaDI+DQogICAgICAgICAgICAgICAgPGRpdj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGI+VG90YWwgZGV2ZWxvcGVkIGFyZWE6IDwvYj48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBvdmVyYWxsX2FyZWFfdmFsfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj48YiBkYXRhLWJpbmRpbmc9IntAdGV4dDogb3ZlcmFsbF9jYXBfdmFsfSI+PC9iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJub3RlcyI+VGhlIHRvdGFsIGRldmVsb3BlZCBhcmVhIGlzIG5vdCBhbGxvd2VkIHRvIGV4Y2VlZCAzJS48L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj48Yj5OZXcgZGV2ZWxvcGVkIGFyZWEgaW4gZGVjYWRlOiA8L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDogZGVjYWRlX2FyZWFfdmFsfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj48YiBkYXRhLWJpbmRpbmc9IntAdGV4dDogZGVjYWRlX2NhcF92YWx9Ij48L2I+PC9zcGFuPg0KICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im5vdGVzIj5UaGUgdG90YWwgZGV2ZWxvcGVkIGFyZWEgaXMgbm90IGFsbG93ZWQgdG8gZXhjZWVkIDElIHBlciBkZWNhZGUuPC9kaXY+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDwhLS08ZmllbGRzZXQ+DQogICAgICAgICAgICAgICAgPGxlZ2VuZD5TdW1tYXJ5PC9sZWdlbmQ+DQogICAgICAgICAgICAgICAgPGRpdj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+MSUvZGVjYWRlIGNhcCBzdGF0dXM6PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZWNhZGVfY2FwX3ZhbH0iPjwvYj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj4zJSBvdmVyYWxsIGNhcCBzdGF0dXM6PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICA8YiBkYXRhLWJpbmRpbmc9IntAdGV4dDpvdmVyYWxsX2NhcF92YWx9Ij48L2I+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iYmFzZWxpbmVfcGFjX3dyYXBwZXIiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CYXNlbGluZSBkZXZlbG9wZWQgYXJlYTo8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmJhc2VsaW5lX2FyZWF9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmJhc2VsaW5lX3BlcmNlbnR9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8L2ZpZWxkc2V0Pi0tPg0KICAgICAgICAgICAgPGhyIC8+DQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJkZXRhaWxzIj4NCiAgICAgICAgICAgICAgICA8aDM+VG90YWwgZGV2ZWxvcGVkIGFyZWE8L2gzPg0KICAgICAgICAgICAgICAgIDx0YWJsZT4NCiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5EZXZlbG9wbWVudCBUeXBlPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+QWNyZXM8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5QZXJjZW50PC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+DQogICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmRpbmc9IntAc291cmNlOiBvdmVyYWxsX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IG92ZXJhbGxfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpjYXRlZ29yeX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YXJlYX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6cGVyY2VudH0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT4NCiAgICAgICAgICAgICAgICA8L3RhYmxlPg0KICAgICAgICAgICAgICAgIDxiciAvPg0KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNhcF92YWwiPg0KICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QZXJjZW50IG9mIHRvdGFsIGRldmVsb3BlZCBhcmVhIChsaW1pdGVkIHRvIDMlKTwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0Om92ZXJhbGxfY2FwX3ZhbH0iPjwvaDI+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgPGhyIC8+DQogICAgICAgICAgICAgICAgPGgzPk5ldyBkZXZlbG9wZWQgYXJlYSBpbiBkZWNhZGU8L2gzPg0KICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd19kZWNhZGVfdGJsX2N1cnJlbnR9Ij4NCiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5EZXZlbG9wbWVudCBUeXBlPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+QWNyZXM8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBhbGlnbj0iY2VudGVyIj5QZXJjZW50PC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+DQogICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmRpbmc9IntAc291cmNlOiBkZWNhZGVfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICA8dHIgZGF0YS1iaW5kaW5nPSJ7QHRlbXBsYXRlLWZvcjogZGVjYWRlX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6Y2F0ZWdvcnl9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmFyZWF9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OnBlcmNlbnR9Ij48L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+DQogICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICA8YnIgLz4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjYXBfdmFsIj4NCiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBvZiBuZXcgZGV2ZWxvcGVkIGFyZWEgaW4gZGVjYWRlIChsaW1pdGVkIHRvIDElKTwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgPGgyIGRhdGEtYmluZGluZz0ie0B0ZXh0OmRlY2FkZV9jYXBfdmFsfSI+PC9oMj4NCiAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJub3RlcyI+DQogICAgICAgICAgICAgICAgICAgIDxlbT5OT1RFOiBEZWNhZGFsIHRpbWUgcGVyaW9kIGlzIEF1Z3VzdCAxMywgMjAxNSB0aHJvdWdoIEF1Z3VzdCAxMiwgMjAyNTwvZW0+DQogICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPCEtLTxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD4xJSBkZWNhZGFsIGRldmVsb3BtZW50IHRocmVzaG9sZDwvbGVnZW5kPg0KICAgICAgICAgICAgICAgICAgICA8dGFibGUgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHNob3dfZGVjYWRlX3RibF9jdXJyZW50fSI+DQogICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+U291cmNlPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPkFjcmVzPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPiUgb2YgVG90YWw8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZGluZz0ie0Bzb3VyY2U6IGRlY2FkZV90Ymx9Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgZGF0YS1iaW5kaW5nPSJ7QHRlbXBsYXRlLWZvcjogZGVjYWRlX3RibH0iPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpjYXRlZ29yeX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6YXJlYX0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6cGVyY2VudH0iPjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT4NCiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICAgICAgPGJyIC8+DQogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNhcF92YWwiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGVyY2VudCBvZiBQQUMgZGV2ZWxvcGVkIHRoaXMgZGVjYWRlOjwvc3Bhbj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLWJpbmRpbmc9IntAdGV4dDpkZWNhZGVfY2FwX3ZhbH0iPjwvaDI+DQogICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJub3RlcyI+DQogICAgICAgICAgICAgICAgICAgICAgICA8ZW0+Tk9URTogRGVjYWRhbCB0aW1lIHBlcmlvZCBpcyBBdWd1c3QgMTMsIDIwMTUgdGhyb3VnaCBBdWd1c3QgMTIsIDIwMjU8L2VtPg0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgIDxmaWVsZHNldD4NCiAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD4zJSBtYXhpbXVtIGRldmVsb3BtZW50IHRocmVzaG9sZDwvbGVnZW5kPg0KICAgICAgICAgICAgICAgICAgICA8dGFibGU+DQogICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggYWxpZ249ImNlbnRlciI+U291cmNlPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPkFjcmVzPC90aD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGFsaWduPSJjZW50ZXIiPiUgb2YgVG90YWw8L3RoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZGluZz0ie0Bzb3VyY2U6IG92ZXJhbGxfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IG92ZXJhbGxfdGJsfSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OmNhdGVnb3J5fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDphcmVhfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmRpbmc9IntAdGV4dDpwZXJjZW50fSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+DQogICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5Pg0KICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPg0KICAgICAgICAgICAgICAgICAgICA8YnIgLz4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY2FwX3ZhbCI+DQogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QZXJjZW50IG9mIFBBQyBkZXZlbG9wZWQgb3ZlcmFsbDo8L3NwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICA8aDIgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6b3ZlcmFsbF9jYXBfdmFsfSI+PC9oMj4NCiAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgPC9maWVsZHNldD4tLT4NCiAgICAgICAgICAgICAgICA8IS0tPGZpZWxkc2V0Pg0KICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlBERiBSZXBvcnQgU2V0dGluZ3M8L2xlZ2VuZD4NCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jb250YWluZXIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybSBsYWJlbC1sZWZ0IiBpZD0iY3VzdG9tRm9ybUJvZHkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9InJlcG9ydFRpdGxlIiBjbGFzcz0iZm9ybS1sYWJlbCBteUxhYmVsIj5UaXRsZTwvbGFiZWw+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jb250cm9sIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPSJyZXBvcnRUaXRsZSIgdHlwZT0idGV4dCIgcGxhY2Vob2xkZXI9IlJlcG9ydCBUaXRsZSIgdmFsdWU9IlJlcG9ydCBUaXRsZSIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2xlYXJUaXRsZX0iIC8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0idXNlck5hbWUiIGlkPSJ1c2VyTmFtZWxibCIgY2xhc3M9ImZvcm0tbGFiZWwgbXlMYWJlbCI+SW5jbHVkZSBtYXA8L2xhYmVsPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY29udHJvbCI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0iaW5jbHVkZU1hcCIgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQgLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4NCg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+LS0+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQ7IHdpZHRoOjEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiIGNsYXNzPSJmb3JtLWJ0bnMiPg0KICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uIGlkPSJva0J0biIgY2xhc3M9ImJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpydW5OZXdSZXBvcnR9Ij48PCBOZXcgUmVwb3J0PC9idXR0b24+DQogICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ib2tCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Z2V0UERGfSI+Q29udGludWUgPj48L2J1dHRvbj4tLT4NCiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSJjYW5jZWxCdG4iIGNsYXNzPSJidXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6Y2FuY2VsRm9ybX0iPkNsb3NlPC9idXR0b24+DQogICAgICAgICAgICA8L2Rpdj4NCg0KICAgICAgICA8L2Rpdj4NCiAgICA8L2Zvcm0+DQoNCjwvZGl2Pg0K");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModuleView.html","html","PGRpdiBjbGFzcz0iZWxldmF0aW9uLW1vZHVsZS12aWV3Ij4NCglFTEVWQVRJT046IDxiPjxzcGFuIGlkPSJlbGV2YXRpb24iPjwvc3Bhbj48L2I+ICAgDQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Custom","inv","Modules/WildfireRiskPopup/WildfireRiskPopupModuleView.html","html","ICA8IS0tPGRpdiBpZD0iV2lsZGZpcmVSaXNrUG9wdXAiIGNsYXNzPSJtb2R1bGUgdmlldyBtYXAtdGlwLXZpZXciIHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTsgdG9wOjQwcHg7IHotaW5kZXg6MjAwOyI+IC0tPg0KPGRpdiBpZD0iV2lsZGZpcmVSaXNrUG9wdXAiPg0KICAgIDxkaXYgY2xhc3M9IldpbGRmaXJlUmlza1BvcHVwSGVhZGVyIj4NCiAgICAgICAgPGRpdiBjbGFzcz0iV2lsZGZpcmVSaXNrUG9wdXBIZWFkZXJUZXh0Ij5Zb3VyIExvY2F0aW9uPC9kaXY+DQogICAgICAgIDxidXR0b24gY2xhc3M9InBhbmVsLWhlYWRlci1idXR0b24gV2lsZGZpcmVSaXNrUG9wdXBDbG9zZUJ1dHRvbiBjbG9zZS0xNiIgdGl0bGU9IkNsb3NlIEZpcmUgUmlzayI+PC9idXR0b24+DQogICAgPC9kaXY+DQogICAgPCEtLTxkaXYgY2xhc3M9IldpbGRmaXJlUmlza1BvcHVwR3VpZGUiPg0KICAgICAgICA8ZGl2IGlkPSJXaWxkZmlyZVJpc2tfZ3VpZGUiPg0KICAgICAgICAgICAgTGVmdCBjbGljayBvbiB0aGUgbWFwIHRvIHZpZXcgZmlyZSByaXNrIGluZm9ybWF0aW9uLiAgVG8gZGlzYWJsZS9lbmFibGUgZmlyZSByaXNrIG1vZGUgdXNlICJUb2dnbGUgRmlyZSBSaXNrIE1vZGUiIGZyb20gdGhlICJJIHdhbnQgVG8iIGJ1dHRvbi4NCiAgICAgICAgPC9kaXY+DQogICAgPC9kaXY+LS0+DQogICAgPGRpdiBjbGFzcz0iV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50IiBzdHlsZT0iZGlzcGxheTpub25lOyBjbGVhcjpib3RoOyI+DQogICAgICAgIDxkaXYgaWQ9IldpbGRmaXJlUmlza19sb2FkaW5nIj5Mb2FkaW5nLi4uPC9kaXY+DQogICAgICAgIDxkaXYgaWQ9IldpbGRmaXJlUmlza19jb250ZW50IiBzdHlsZT0iZGlzcGxheTpub25lIj4NCiAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgPGgxPkF2ZXJhZ2UgV2lsZGZpcmUgUmlzayAod2l0aGluIMK8IG1pbGUpPC9oMT48cCBpZD0iV2lsZGZpcmVSaXNrX3ZhbHVlIj5DYWxjdWxhdGluZy4uLjwvcD4NCiAgICAgICAgICAgICAgICA8cCBpZD0iV2lsZGZpcmVSaXNrX3dhcm5pbmciIHN0eWxlPSJkaXNwbGF5Om5vbmU7Ij48c3Bhbj5XYXJuaW5nITwvc3Bhbj4gSW5jb21wbGV0ZSBkYXRhIGNvdmVyYWdlIGluIHlvdXIgYXJlYS48L3A+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDwhLS08ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5EYXRhIGNvdmVyYWdlIGluIHNlbGVjdGlvbjwvaDE+PHAgaWQ9IldpbGRmaXJlUmlza19yaXNrZGF0YXBlcmNlbnQiPkNhbGN1bGF0aW5nLi4uPC9wPg0KICAgICAgICAgICAgPC9kaXY+LS0+DQogICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5PREYgRm9yZXN0IFByb3RlY3Rpb24gRGlzdHJpY3Q8L2gxPjxwIGlkPSJXaWxkZmlyZVJpc2tfZm9yZXN0X3Byb3RlY3Rpb25fZGlzdHJpY3QiPk5vIGRhdGE8L3A+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgPGgxPlN0cnVjdHVyYWwgRmlyZSBQcm90ZWN0aW9uIERpc3RyaWN0PC9oMT48cCBpZD0iV2lsZGZpcmVSaXNrX3N0cnVjdHVyYWxfcHJvamVjdGlvbl9kaXN0cmljdCI+Tm8gZGF0YTwvcD4NCiAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPGRpdj4NCiAgICAgICAgICAgICAgICA8aDE+UmFuZ2VsYW5kIFByb3RlY3Rpb24gQXNzb2NpYXRpb248L2gxPjxwIGlkPSJXaWxkZmlyZVJpc2tfcmFuZ2VsYW5kX3Byb3RlY3Rpb25fYXNzb2MiPk5vIGRhdGE8L3A+DQogICAgICAgICAgICA8L2Rpdj4NCiAgICAgICAgICAgIDxkaXY+DQogICAgICAgICAgICAgICAgPGgxPkNpdHkgb3IgdG93bjwvaDE+PHAgaWQ9IldpbGRmaXJlUmlza19jaXR5Ij5ObyBkYXRhPC9wPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5VcmJhbiBHcm93dGggQm91bmRhcnk8L2gxPjxwIGlkPSJXaWxkZmlyZVJpc2tfdXJiYW5fZ3Jvd3RoX2JvdW5kYXJ5Ij5ObyBkYXRhPC9wPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5Db21tdW5pdHkgV2lsZGZpcmUgUHJvdGVjdGlvbiBQbGFuIEFyZWE8L2gxPjxwIGlkPSJXaWxkZmlyZVJpc2tfY3dwcF9hcmVhIj5ObyBkYXRhPC9wPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5GaXJld2lzZSBDb21tdW5pdHk8L2gxPjxwIGlkPSJXaWxkZmlyZVJpc2tfZmlyZXdpc2VfY29tbXVuaXR5Ij5ObyBkYXRhPC9wPg0KICAgICAgICAgICAgPC9kaXY+DQogICAgICAgICAgICA8ZGl2Pg0KICAgICAgICAgICAgICAgIDxoMT5TZW5hdGUgQmlsbCAzNjAgYXJlYTwvaDE+PHAgaWQ9IldpbGRmaXJlUmlza19zZW5hdGViaWxsXzM2MCI+Tm8gZGF0YTwvcD4NCiAgICAgICAgICAgIDwvZGl2Pg0KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpub25lOyIgaWQ9IldpbGRmaXJlUmlza19mbGFtZV9taW4iPk5vIERhdGE8L2Rpdj4NCiAgICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6bm9uZTsiIGlkPSJXaWxkZmlyZVJpc2tfZmxhbWVfbWF4Ij5ObyBEYXRhPC9kaXY+DQogICAgICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5Om5vbmU7IiBpZD0iV2lsZGZpcmVSaXNrX2ZsYW1lX2F2ZSI+Tm8gRGF0YTwvZGl2Pg0KICAgICAgICA8L2Rpdj4NCiAgICAgICAgPGRpdiBjbGFzcz0iV2lsZGZpcmVSaXNrX2xpbmsiPg0KICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iV2lsZGZpcmVSaXNrUG9wdXBNb2R1bGVWaWV3QnV0dG9uIiBkYXRhLWJpbmRpbmc9IntAZXZlbnQtb25jbGljazpvcGVuV2lsZGZpcmVSaXNrUXVpY2tSZXBvb3J0fSI+R2V0IFJlcG9ydDwvYnV0dG9uPiZuYnNwOyZuYnNwOw0KICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxpbmsiIGRhdGEtYmluZGluZz0ie0BldmVudC1vbmNsaWNrOm9wZW5XaWxkZmlyZVJpc2tXb3JrZmxvd30iPkNsaWNrIGhlcmUgZm9yIG1vcmUgaW5mb3JtYXRpb248L3NwYW4+DQogICAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/CustomFormM49/CustomFormM49Module.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA1MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQogICAgbWFyZ2luLXRvcDogNDZweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg0KICAgIC5tYWluRm9ybSBpbnB1dFt0eXBlPSJ0ZXh0Il0sIC5tYWluRm9ybSB0ZXh0YXJlYSwgLm1haW5Gb3JtIHNlbGVjdCB7DQogICAgICAgIC8qd2lkdGg6IDY1JTsqLw0KICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgfQ0KDQogICAgLm1haW5Gb3JtIGlucHV0W3R5cGU9ImRhdGUiXSB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIH0NCg0KLnRleHRCb3ggew0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUFBQUFBOw0KfQ0KDQouZXJyb3Igew0KICAgIC8qd2lkdGg6IDEwMCU7Ki8NCiAgICBwYWRkaW5nOiAwOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAvKmZvbnQtc2l6ZTogODAlOyovDQogICAgY29sb3I6IHJlZDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICM5MDA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsNCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCn0NCg0KLm15TGFiZWwgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7DQogICAgZGlzcGxheTogaW5saW5lLWZsZXg7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsNCn0NCg0KI2N1c3RvbUZvcm0gZmllbGRzZXR7DQogICAgYm9yZGVyOnNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6MC4yNXJlbTsNCiAgICBtYXJnaW46MmVtIGF1dG87ICAgIA0KfQ0KDQoubGluayB7DQogICAgY29sb3I6IzFBNzJDNDsNCn0NCi5saW5rOmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ciB0ZHsNCiAgICBwYWRkaW5nOi42ZW07DQp9DQoNCiNjb25zdHJhaW50cy10YWJsZSB0ci5hbHR7DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjQwLDI0MCwyNDApOw0KfQ0KLmNvbnN0cmFpbnQtbGF5ZXItY29udHJvbHN7DQogICAgbWFyZ2luLWxlZnQ6MWVtOw0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIHBhZGRpbmctdG9wOjNweDsNCn0NCi5jb25zdHJhaW50LWxheWVyLWNvbnRyb2xzIHNwYW46Zmlyc3QtY2hpbGR7DQogICAgcGFkZGluZy1yaWdodDoxMHB4Ow0KfQ0KLmNvbnN0cmFpbnQtY2VsbHsNCiAgICBtaW4td2lkdGg6MjQwcHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/DevelopmentRegistry/DevelopmentRegistry.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3IHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA1MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQogICAgbWFyZ2luLXRvcDogNDZweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg0KICAgIC5tYWluRm9ybSBpbnB1dFt0eXBlPSJ0ZXh0Il0sIC5tYWluRm9ybSB0ZXh0YXJlYSwgLm1haW5Gb3JtIHNlbGVjdCB7DQogICAgICAgIC8qd2lkdGg6IDY1JTsqLw0KICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgfQ0KDQogICAgLm1haW5Gb3JtIGlucHV0W3R5cGU9ImRhdGUiXSB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIH0NCg0KLnRleHRCb3ggew0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUFBQUFBOw0KfQ0KDQouZXJyb3Igew0KICAgIC8qd2lkdGg6IDEwMCU7Ki8NCiAgICBwYWRkaW5nOiAwOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAvKmZvbnQtc2l6ZTogODAlOyovDQogICAgY29sb3I6IHJlZDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICM5MDA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsNCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCn0NCg0KLm15TGFiZWwgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7DQogICAgZGlzcGxheTogaW5saW5lLWZsZXg7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsNCn0NCg0KI2N1c3RvbUZvcm0gZmllbGRzZXR7DQogICAgYm9yZGVyOnNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6MC4yNWVtOw0KICAgIG1hcmdpbjoxLjVlbSBhdXRvOw0KfQ0KDQojY3VzdG9tRm9ybXsNCiAgICBmb250LXNpemU6LjllbTsNCn0NCg0KI2N1c3RvbUZvcm0gdGFibGV7DQogICAgd2lkdGg6MTAwJTsNCn0NCg0KI2N1c3RvbUZvcm0gdHI6bnRoLWNoaWxkKG9kZCkge2JhY2tncm91bmQ6IHJnYmEoMjA0LCAyMDQsIDIwNCwgMC41MCl9DQojY3VzdG9tRm9ybSB0cjpudGgtY2hpbGQoZXZlbikge2JhY2tncm91bmQ6ICNGRkZ9DQojY3VzdG9tRm9ybSB0aGVhZCB0ciB7YmFja2dyb3VuZDojZmZmICFpbXBvcnRhbnR9DQoNCg0KI2RlY2FkZV90YmwgdHI6bnRoLWNoaWxkKG9kZCkge2JhY2tncm91bmQ6IHJnYmEoMjA0LCAyMDQsIDIwNCwgMC41MCl9DQojZGVjYWRlX3RibCB0cjpudGgtY2hpbGQoZXZlbikge2JhY2tncm91bmQ6ICNGRkZ9DQojZGVjYWRlX3RibCB0aGVhZCB0ciB7YmFja2dyb3VuZDojZmZmICFpbXBvcnRhbnR9DQoNCiNjdXN0b21Gb3JtIHRhYmxlIHRkIHsNCiAgICBwYWRkaW5nOi4zZW0gMS4zZW07DQp9DQoNCiNjdXN0b21Gb3JtIHRhYmxlIHRyOmxhc3QtY2hpbGR7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCi5jYXBfdmFsew0KICAgIC8qZmxvYXQ6cmlnaHQ7Ki8NCiAgICB3aWR0aDoxMDAlOw0KICAgIGJvcmRlcjoxcHggc29saWQgI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBwYWRkaW5nOi41ZW07DQp9DQouY2FwX3ZhbCBoMnsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQoubm90ZXN7DQogICAgLypmbG9hdDpyaWdodDsqLw0KICAgIGZvbnQtc2l6ZTouOGVtOw0KICAgIG1hcmdpbi1sZWZ0OjFlbTsNCiAgICAvKm1hcmdpbi10b3A6MWVtOyovDQp9DQoNCi5wcm9qZWN0LWltcGFjdC13cmFwcGVyIHsNCiAgICBwYWRkaW5nOiAuNWVtOw0KICAgIG1pbi1oZWlnaHQ6NjVweDsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCn0NCg0KLnByb2plY3QtaW1wYWN0LXdyYXBwZXIgZGl2IHsNCiAgICB3aWR0aDo0NSU7DQogICAgYm9yZGVyOjFweCBzb2xpZCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6NHB4Ow0KICAgIHBhZGRpbmc6LjVlbTsNCiAgICBtYXJnaW46LjVlbTsNCiAgICBmbG9hdDpsZWZ0Ow0KICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7DQp9DQoNCi5wYWNfc3VtX2Rlc2Mgew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIGNvbG9yOiMzMzM7DQogICAgZm9udC1zdHlsZTppdGFsaWM7DQp9DQoNCiAgIC5jbGVhcnsNCiAgICAgICBjbGVhcjpib3RoOw0KICAgICAgIGZsb2F0Om5vbmU7DQogICB9DQoNCiNyZXBvcnQtZGF0ZXsNCiAgICB3aWR0aDoxMDAlOw0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBjb2xvcjojMzMzOw0KICAgIGZvbnQtc2l6ZTouOWVtOw0KICAgIGZvbnQtc3R5bGU6aXRhbGljOw0KfQ0KDQouc3VtbWFyeS13cmFwcGVyew0KICAgIGJvcmRlcjoxcHggc29saWQgI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBwYWRkaW5nOi41ZW07DQogICAgbWFyZ2luOjEuNWVtIC41ZW0gYXV0bzsNCiAgICBmb250LXNpemU6MS4xZW07DQogICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIwNCwgMjA0LCAyMDQsIDAuNTApOw0KfQ0KDQouc3VtbWFyeS13cmFwcGVyIGgyew0KICAgIG1hcmdpbi1ib3R0b206MTBweDsNCn0NCi5kZXRhaWxzIGgzew0KICAgIGZvbnQtc2l6ZToxLjVlbTsNCn0NCg0KLmRldGFpbHN7DQogICAgcGFkZGluZzoxZW07DQp9DQoNCiNjdXN0b21Gb3JtIGg0ew0KICAgIG1hcmdpbjphdXRvIGF1dG8gLjVlbSAuNWVtOw0KICAgIGNvbG9yOiMzMzM7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModule.css","css","DQovKi5yZWdpb24gLnZpZXcuVGVtcGxhdGVNb2R1bGVWaWV3LmFjdGl2ZSB7DQogICAgbWFyZ2luOiAwOw0KfSovDQoNCi5lbGV2YXRpb24tbW9kdWxlLXZpZXcNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbGVmdDozMjVweDsNCiAgICB0b3A6MDsNCiAgICBmbG9hdDpyaWdodDsNCiAgICAvKnotaW5kZXg6IDEwMDsqLw0KICAgIGZvbnQtc2l6ZTouODVlbTsNCiAgICB3aWR0aDogMTc1cHg7ICAgDQogICAgaGVpZ2h0OjIwcHg7DQogICAgLypyaWdodDogMDsqLw0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgY29sb3I6ICMzMzM7DQogICAgLypwYWRkaW5nOiA2cHg7Ki8NCiAgICBib3JkZXI6IG5vbmU7DQogICAgbWFyZ2luLXRvcDogMTBweDsgICAgDQp9DQoNCg==");
geocortex.resourceManager.register("Custom","inv","Modules/WildfireRiskPopup/WildfireRiskPopupModule.css","css","LyoubWFwLXRvcC1sZWZ0DQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9Ki8NCg0KLyoubWFwLW5hdmlnYXRpb24tcmVnaW9uDQp7DQogICAgbWF4LWhlaWdodDoxMDAlOw0KfSovDQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b24gew0KICAgIHBhZGRpbmc6IC41ZW07DQogICAgb3V0bGluZTogbm9uZTsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7DQogICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTsNCiAgICBmb250LXdlaWdodDogNjAwOw0KICAgIGNvbG9yOiAjMUE3MkM0Ow0KICAgIGJveC1zaGFkb3c6IDA7DQogICAgY3Vyc29yOnBvaW50ZXI7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXdCdXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxQTcyQzQ7DQogICAgY29sb3I6ICNmZmZmZmY7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cE1vZHVsZVZpZXcgDQp7DQogICAgaGVpZ2h0OjEwMCU7DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgcG9zaXRpb246YWJzb2x1dGU7ICAgIA0KICAgIG92ZXJmbG93LXk6YXV0bzsNCiAgICB6LWluZGV4OjIyMDsgICANCiAgICB3aWR0aDogMjgwcHg7DQogICAgcGFkZGluZzo0cHggMTBweCA0cHggMTBweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQTFCOEUxOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsgICAgDQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQovKiBTY3JvbGxiYXIgaXMgY29udHJvbGxlZCBieSBtZWRpYSBxdWVyaWVzICovDQpAbWVkaWEgYWxsIGFuZCAoIG1pbi1oZWlnaHQ6IDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiAzMDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDEyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA0MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDIyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA1MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDMyMHB4Ow0KICAgIH0NCn0NCg0KQG1lZGlhIGFsbCBhbmQgKCBtaW4taGVpZ2h0OiA2MDBweCkgew0KICAgICNXaWxkZmlyZVJpc2tQb3B1cCB7DQogICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4Ow0KICAgIH0NCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwSGVhZGVyIHsgIA0KICAgIGZsb2F0OmxlZnQ7DQogICAgd2lkdGg6MTAwJTsNCiAgICBmb250LXNpemU6MS4yZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBwYWRkaW5nLXRvcDowLjNlbTsNCiAgICBwYWRkaW5nLWJvdHRvbTowLjVlbTsNCiAgICBjb2xvcjpyZ2JhKDEwNSwgMTA1LCAxMDUsIDEpOw0KfQ0KDQouV2lsZGZpcmVSaXNrUG9wdXBDb250ZW50IHsgIA0KICAgIGZvbnQtc2l6ZToxZW07DQp9DQoNCi8qLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXIgeyAgDQogICAgd2lkdGg6MTJweDsNCn0NCg0KLldpbGRmaXJlUmlza1BvcHVwQ29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgIHsgIA0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuMyk7IA0KICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsNCiAgICBib3JkZXItcmFkaXVzOiAxMHB4Ow0KICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuNSk7IA0KfSovDQoNCi5XaWxkZmlyZVJpc2tfbGluayB7ICAgIA0KICAgIHBhZGRpbmc6OHB4IDBweCA4cHggMHB4Ow0KfQ0KDQouV2lsZGZpcmVSaXNrX2xpbmsgYSB7DQogICAgZm9udC1zaXplOjEuMmVtOw0KICAgIGNvbG9yOiMwMDAwMDA7DQp9DQoNCi5XaWxkZmlyZVJpc2tQb3B1cENsb3NlQnV0dG9uIHsgIA0KICAgIHBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjBlbTsNCiAgICB0b3A6MGVtOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgaDEgew0KICAgIGZvbnQtc2l6ZToxLjFlbTsNCiAgICBmb250LXdlaWdodDpub3JtYWw7DQogICAgY29sb3I6IzAwMDAwMDsgDQogICAgcGFkZGluZy1sZWZ0OjRweDsgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IGRpdiB7DQogICAgcGFkZGluZzogMXB4OyAgICAgICANCn0NCg0KI1dpbGRmaXJlUmlza19jb250ZW50IHAgew0KICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDEycHg7DQogICAgbWFyZ2luOiAwcHg7DQogICAgY29sb3I6cmdiYSg4MiwgODIsIDgyLCAxKTsgDQp9DQoNCiNXaWxkZmlyZVJpc2tfY29udGVudCBkaXY6bnRoLWNoaWxkKG9kZCkgeyAgICANCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNFN0U3RTc7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyBzcGFuIHsNCiAgICBjb2xvcjojMDAwMDAwOw0KfQ0KDQojV2lsZGZpcmVSaXNrX3ZhbHVlIHsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQojV2lsZGZpcmVSaXNrX2NvbnRlbnQgZGl2IGRpdiB7DQogICAgcGFkZGluZzowcHg7DQp9DQoNCiNXaWxkZmlyZVJpc2tfd2FybmluZyB7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCiAgICBmb250LXNpemU6MC45ZW07DQp9DQoNCiNXaWxkZmlyZVJpc2tQb3B1cDo6LXdlYmtpdC1zY3JvbGxiYXIgew0KICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjp2ZXJ0aWNhbCB7DQogICAgd2lkdGg6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhcjpob3Jpem9udGFsIHsNCiAgICBoZWlnaHQ6MTJweDsNCn0NCg0KI1dpbGRmaXJlUmlza1BvcHVwOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7DQogICAgYm9yZGVyLXJhZGl1czogOHB4Ow0KICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlOyAvKiBzaG91bGQgbWF0Y2ggYmFja2dyb3VuZCwgY2FuJ3QgYmUgdHJhbnNwYXJlbnQgKi8NCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KTsNCn0NCg==");
geocortex.resourceManager.register("Custom","inv","Invariant","json","eyJoZWxsby13b3JsZC1pbml0aWFsaXplZCI6IkhlbGxvIHdvcmxkISBUZW1wbGF0ZSBtb2R1bGUgaW5pdGlhbGl6ZWQuIiwiaGVsbG8td29ybGQtZ3JlZXRpbmciOiJIZWxsbywgd29ybGQuIn0=");

geocortex.framework.notifyLibraryDownload("Custom");
