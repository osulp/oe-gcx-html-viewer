var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModule = (function (_super) {
            __extends(SageGrouseDevSitingModule, _super);
            function SageGrouseDevSitingModule(app, lib) {
                _super.call(this, app, lib);
            }
            SageGrouseDevSitingModule.prototype.initialize = function (config) {
                //alert(this.app.getResource(this.libraryId, "hello-world-initialized"));
            };
            return SageGrouseDevSitingModule;
        }(geocortex.framework.application.ModuleBase));
        SageGrouseDevSiting.SageGrouseDevSitingModule = SageGrouseDevSitingModule;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var myWorkflowContext;
var myApp;
var myLibID;
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModuleView = (function (_super) {
            __extends(SageGrouseDevSitingModuleView, _super);
            function SageGrouseDevSitingModuleView(app, lib) {
                _super.call(this, app, lib);
                this.downloadShapefiles = function (event, element, context) {
                    //combine graphics into one layer
                    var buffereredGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("IndirectArea", false, this.app);
                    var projectGL = geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer("DirectArea", false, this.app);
                    buffereredGL.graphics.forEach(function (graphic) {
                        graphic.setAttributes({
                            "areaType": "indirect buffered area", "buffered": myWorkflowContext.getValue('bufferDist') + " km"
                        });
                    });
                    projectGL.graphics.forEach(function (graphic) {
                        graphic.setAttributes({ "areaType": "direct project area", "buffered": "0" });
                        buffereredGL.add(graphic);
                    });
                    var exportArgs = {
                        format: "shp",
                        graphicLayer: buffereredGL
                    };
                    this.app.commandRegistry.command("ExportGraphicsLayer").execute(exportArgs);
                };
                this.getPDF = function (event, element, context) {
                    var reportUrl = myWorkflowContext.getValue('reportURL');
                    window.open(reportUrl, "_blank");
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
                this.cancelForm = function (event, element, context) {
                    myWorkflowContext.setValue("finalFormBtn", 'Close');
                    myWorkflowContext.completeActivity();
                    this.app.commandRegistry.command("DeactivateView").execute("SageGrouseDevSitingModuleView");
                    return true;
                };
            }
            return SageGrouseDevSitingModuleView;
        }(geocortex.framework.ui.ViewBase));
        SageGrouseDevSiting.SageGrouseDevSitingModuleView = SageGrouseDevSitingModuleView;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModuleViewModel = (function (_super) {
            __extends(SageGrouseDevSitingModuleViewModel, _super);
            function SageGrouseDevSitingModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.projectName = new Observable("");
                this.devType = new Observable("");
                this.compensatoryMitigation = new Observable("");
                this.reportURL = new Observable("");
                this.chartURL = new Observable("");
                this.directArea = new Observable("");
                this.indirectArea = new Observable("");
                this.bufferDist = new Observable("");
                this.nonHabArea = new Observable("");
                this.habDesig = new Observable("");
                this.isLek = new Observable("");
                this.landManagement = new Observable("");
                this.countyContacts = new Observable("");
                this.blmContacts = new Observable("");
            }
            SageGrouseDevSitingModuleViewModel.prototype.initialize = function (config) {
                myApp = this.app;
                myLibID = this.libraryId;
                var thisViewModel = this;
                this.app.registerActivityIdHandler("devSitingForm", function CustomEventHandler(workflowContext, contextFunctions) {
                    myWorkflowContext = $.extend({}, workflowContext);
                    myApp.commandRegistry.command("ActivateView").execute("SageGrouseDevSitingModuleView");
                    thisViewModel.projectName.set(myWorkflowContext.getValue("projectName"));
                    thisViewModel.devType.set(myWorkflowContext.getValue("devType"));
                    thisViewModel.compensatoryMitigation.set(myWorkflowContext.getValue("compensatoryMitigation"));
                    thisViewModel.reportURL.set(myWorkflowContext.getValue("reportURL"));
                    thisViewModel.chartURL.set(myWorkflowContext.getValue("chartURL"));
                    thisViewModel.directArea.set(myWorkflowContext.getValue("directArea"));
                    thisViewModel.indirectArea.set(myWorkflowContext.getValue("indirectArea") + " Acres");
                    thisViewModel.bufferDist.set(myWorkflowContext.getValue("bufferDist") + " km");
                    thisViewModel.nonHabArea.set(myWorkflowContext.getValue("nonHabArea") + " Acres");
                    thisViewModel.habDesig.set(myWorkflowContext.getValue("habDesig"));
                    thisViewModel.isLek.set(myWorkflowContext.getValue("isLek"));
                    thisViewModel.landManagement.set(myWorkflowContext.getValue("landManagement"));
                    thisViewModel.countyContacts.set(myWorkflowContext.getValue("countyContacts"));
                    thisViewModel.blmContacts.set(myWorkflowContext.getValue("blmContacts"));
                });
            };
            return SageGrouseDevSitingModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        SageGrouseDevSiting.SageGrouseDevSitingModuleViewModel = SageGrouseDevSitingModuleViewModel;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
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
