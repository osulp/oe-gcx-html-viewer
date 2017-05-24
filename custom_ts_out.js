var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
// module to fire off the StartEditingFeature command since it requires use of the HtmlViewer context not available in workflow.
var oe;
(function (oe) {
    var development_registry;
    (function (development_registry) {
        var DevelopmentRegistryModule = (function (_super) {
            __extends(DevelopmentRegistryModule, _super);
            // devAttributes: any;
            function DevelopmentRegistryModule(app, lib) {
                var _this = this;
                _super.call(this, app, lib);
                this.devSubTypesTable = {};
                // When the layer list initializes we can grab a reference to the layer list object and save it for later.
                // We'll need this to add our custom layer to the layer list.
                this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, function (sender) {
                    // look for tables
                    _this.layerList = sender;
                    _this._getDevSubTypes();
                });
            }
            DevelopmentRegistryModule.prototype.initialize = function (config) {
                var _this = this;
                this._layerFilters = config.layerFilters;
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
                    }
                });
                // add query parameters to base urls
                var query_params = '/query?where=1%3D1&outFields=Development_Type_ID,Development_Type,Development_SubType&f=json&token=';
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
                });
            };
            DevelopmentRegistryModule.prototype._handleDevTypeChange = function (args) {
                if (args) {
                    var editForm = this.app.viewManager.getViewById("FeatureEditingContainerView").childRegions[0].views.filter(function (v) { return v.id === 'EditorView'; });
                    if (editForm.length > 0) {
                        var all_fields = editForm[0].viewModel.form.value["all_fields"]
                            ? editForm[0].viewModel.form.value["all_fields"]
                            : editForm[0].viewModel.form.value.fields.getItems();
                        var filtered_attr = this._processAttributeFilter(all_fields);
                        try {
                            editForm[0].viewModel.form.value.fields.set(filtered_attr);
                        }
                        catch (ex) {
                            console.log(ex.message);
                        }
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
                            }
                            if (f.name.value === 'subcat') {
                                if (_this.devSubTypesTable && f.valueOptions) {
                                    var filteredCodedValues_1 = [];
                                    f.domain.codedValues.forEach(function (cv) {
                                        if (_this.devSubTypesTable[devType_1].subtypes.indexOf(cv.name) !== -1) {
                                            filteredCodedValues_1.push(cv);
                                        }
                                    });
                                    //let filteredCodedValues = f.domain.codedValues.filter(cd => {
                                    //    return this.devSubTypesTable[devType].subtypes.indexOf(cd.name) !== -1
                                    //});
                                    f.valueOptions.value = filteredCodedValues_1;
                                }
                            }
                            if (f.name.value === 'or_dev_reg_proj_id') {
                                if (f.readOnly) {
                                    f.readOnly.set(true);
                                }
                            }
                            return layerFilters[devType_1] ? layerFilters[devType_1].indexOf(f.name.value) !== -1 : true;
                        });
                        return filteredFields;
                    }
                }
                else {
                    return [];
                }
            };
            DevelopmentRegistryModule.prototype._onSiteInitialized = function (site) {
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
                                var editView_1 = args.childRegions[0].views.filter(function (v) { return v.id === "EditorView"; });
                                if (editView_1.length > 0) {
                                    var attr = editView_1[0].viewModel.form.value.fields.getItems();
                                    if (attr.length > 0) {
                                        if (!editView_1[0].viewModel.form.value["all_fields"]) {
                                            editView_1[0].viewModel.form.value["all_fields"] = [];
                                            editView_1[0].viewModel.form.value.fields.value.forEach(function (f) {
                                                editView_1[0].viewModel.form.value["all_fields"].push(f);
                                            });
                                        }
                                        var filteredFields = this._processAttributeFilter(attr);
                                        if (filteredFields.length > 0) {
                                            editView_1[0].viewModel.form.value.fields.set(filteredFields);
                                        }
                                    }
                                }
                            }
                        }
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
                this.app.eventRegistry.event("GeometryEditInvokedEvent").subscribe(this, function (args, test) {
                    var _this = this;
                    this.app.commandRegistry.commands.Confirm.execute("Would you like to upload a shapefile(zipped) or use the map to modify the shape of this development?", "Upload Shapefile or use map?", function (result) {
                        console.log('user selection', result);
                        if (result) {
                            var workflowArgs = {};
                            workflowArgs["workflowId"] = "add_edit_dev_features";
                            workflowArgs["srvc_url"] = _this.devRegSrvcUrl;
                            workflowArgs["srvc_token"] = _this.devRegToken;
                            workflowArgs["workflow_action"] = "Edit";
                            workflowArgs["or_dev_reg_id"] = args.attributes["or_dev_reg_id"];
                            _this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
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
                this.app.event("WorkflowCompletedEvent").subscribe(this, function (workflow, workflowOutputs) {
                    if (workflow.id !== "edit_geometry") {
                        return;
                    }
                });
            };
            return DevelopmentRegistryModule;
        }(geocortex.framework.application.ModuleBase));
        development_registry.DevelopmentRegistryModule = DevelopmentRegistryModule;
    })(development_registry = oe.development_registry || (oe.development_registry = {}));
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
            }
            LayerActionsExtension.prototype.initialize = function (config) {
                var _this = this;
                this.showLayerDescription = config.showLayerDescription !== undefined ? config.showLayerDescription : false;
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
            LayerActionsExtension.prototype._onSiteInitialized = function (site) {
                var _this = this;
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
                    // Show the text that was passed into the command.
                    // Metadata links are the first link in the description so split and send to first url.
                    var metadataLink = layer.description.split("http");
                    metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download:", "").replace("download:", "").replace("Download", "").replace("download", "") : "";
                    if (metadataLink !== "") {
                        window.open(metadataLink, "_blank");
                    }
                    else {
                        alert(layer.description);
                    }
                }, function (context) {
                    //canExecute
                    if (context !== null) {
                        //alert(JSON.stringify(context));
                        var isOEService = context.mapService.serviceUrl.match("lib-arcgis") !== -1 ? true : context.mapService.serviceUrl.match("arcgis.oregonexplorer.info") !== -1 ? true : false;
                        if (isOEService) {
                            return context.description !== "" ? true : false;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }
                });
                // view LayerActionsView active
                this.app.commandRegistry.command("showServiceInfo").register(this, function (layer) {
                    window.open(layer.getLayerUrl(), "_blank");
                });
                this.app.commandRegistry.command("showDownload").register(this, function (layer) {
                    // Show the text that was passed into the command.
                    // Download links are the second link in the description so split and send to second url.
                    var downloadLink = layer.description.split("http");
                    downloadLink = downloadLink.length > 2 ? "http" + downloadLink[2] : "";
                    if (downloadLink !== "") {
                        window.open(downloadLink, "_blank");
                    }
                    else {
                        var GESiteUri = this.app.site.url;
                        var workflowArgs = {};
                        workflowArgs["workflowId"] = "Extract_Layer"; //This is the ID of the workflow.
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
                    return (context === null ? false : (context.properties.hideDownload === undefined ? true : context.properties.hideDownload === "False" ? false : false));
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
                this.openWildfireRiskWorkflow = function (event, element, context) {
                    var workflowArgs = {};
                    workflowArgs.workflowId = "Wildfire_Risk_Report";
                    workflowArgs.risk_value = $("#WildfireRisk_value").text();
                    workflowArgs.risk_percent = $("#WildfireRisk_riskdatapercent").text();
                    workflowArgs.wfpd = $("#WildfireRisk_forest_protection_district").text();
                    workflowArgs.wspd = $("#WildfireRisk_structural_projection_district").text();
                    workflowArgs.wrpa = $("#WildfireRisk_rangeland_protection_assoc").text();
                    workflowArgs.city = $("#WildfireRisk_city").text();
                    workflowArgs.ugb = $("#WildfireRisk_urban_growth_boundary").text();
                    workflowArgs.cwpp = $("#WildfireRisk_cwpp_area").text();
                    workflowArgs.sb360 = $("#WildfireRisk_senatebill_360").text();
                    workflowArgs.flame_min = $("#WildfireRisk_flame_min").text();
                    workflowArgs.flame_max = $("#WildfireRisk_flame_max").text();
                    workflowArgs.flame_ave = $("#WildfireRisk_flame_ave").text();
                    workflowArgs.geometryElementsJsonString = oe.wildfireRiskPopup.geometryElementsJsonString;
                    workflowArgs.reportImageFeatureCollectionJSON = oe.wildfireRiskPopup.reportImageFeatureCollectionJSON;
                    workflowArgs.reportImageExtent = oe.wildfireRiskPopup.reportImageExtent;
                    workflowArgs.pointLatLong = wildfireRiskPopup.pointLatLong;
                    this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
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
                var gsvcURL = "http://tools.oregonexplorer.info/arcgis/rest/services/Geometry/GeometryServer";
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
                    //$(".WildfireRiskPopupHeaderText").text("Fire Risk Mode Active");    
                    wildfireRiskPopup.fireRiskPopupEnabled = true;
                    //workingApp.command("RunWorkflowWithArguments").execute({ "workflowId": "myworkflow", "param1":"value1" });
                    //load the html view
                    //workingApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");
                    //create an event for the close button
                    //$(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);
                    //$(".WildfireRiskPopupContent").css("display", "none");
                    //$(".WildfireRiskPopupGuide").css("display", "block");
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
                function handleMouseClick(pointIn, appIn) {
                    if (!wildfireRiskPopup.fireRiskPopupEnabled)
                        return;
                    //store the point
                    workingPointGeometry = pointIn.mapPoint;
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
                    //$(".WildfireRiskPopupGuide").css("display", "none");
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
                    //getNearOffice();
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
                    /*var esriLine = esri.symbol.SimpleLineSymbol;
                    var esriFill = esri.symbol.SimpleFillSymbol;
                    var esriColor = esri.Color;
                                                   
                    var symbolOuter = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_NULL,
                        new esriLine(esriLine.STYLE_SOLID, new esriColor([236, 181, 9, 1]), 2),
                        null
                    );
                    
                    var symbolInner = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_NULL,
                        new esriLine(esriLine.STYLE_SOLID, new esriColor([222, 86, 27, 1]), 2),
                        null
                    );
                                    
                    var symbolCurrent;
                    var newGraphic = <esri.Graphic> null;
                    var newGraphics = [];
                    //var jsonGraphicsString = "";
                    var i = 0;
                    for (i = 0; i < geometries.length; i++) {
    
                        if (i == 0)
                            symbolCurrent = symbolInner;
                        else
                            symbolCurrent = symbolOuter;
    
                        newGraphics.push(new esri.Graphic(geometries[i], symbolCurrent));
    
                        newGraphic = new esri.Graphic(geometries[i], symbolCurrent);
    
                        geometryElementsJsonString += "," + JSON.stringify(newGraphic.toJson());
                    }
    
                    var layerJSON = CreateLayerJSON("imageMapBuffer", "esriGeometryPolygon", newGraphics);
                    
                    //add layer JSON
                    workingFeatureCollection.featureCollection.layers.push(layerJSON);*/
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
                    //show warning if data percent is low
                    if (dataPercent < 50) {
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
                    //process histogram data
                    /*if (data.histograms.length > 0) {
    
                        counts = data.histograms[0].counts;
                        
                        var i = 0;
                        for (i = 0; i < counts.length; i++) {
    
                            //iVal = i * data.histograms[0].max / data.histograms[0].size;
    
                            countTotal += counts[i];
                            //valueTotal += counts[i] * iVal;
                            valueTotal += counts[i] * i;
    
                            //set flameLow
                            if (counts[i] > 0 && iVal < flameLow) {
                                flameLow = iVal;
    
                                //if (flameLow > 11)
                                  //  flameLow = 11;
                            }
    
                            //set flameHigh
                            if (counts[i] > 0 && iVal > flameHigh) {
                                flameHigh = iVal;
                            }
                        }
    
                        //flameAverage = Math.round((valueTotal / countTotal) * 10) / 10;
                        flameAverage = Math.round(valueTotal / countTotal);
    
                        if (flameAverage < 1)
                            flameAverage = 0;
                        else if (flameAverage == 1)
                            flameAverage = 0;
                        else if (flameAverage == 2)
                            flameAverage = 2;
                        else if (flameAverage == 3)
                            flameAverage = 4;
                        else if (flameAverage == 4)
                            flameAverage = 9.5;
                        else if (flameAverage > 4)
                            flameAverage = 11;
                    }
    
                    if (flameLow == 300)
                        flameLow = 0;
    
                    flameLow = Math.round(flameLow * 10) / 10;
                    flameHigh = Math.round(flameHigh * 10) / 10;*/
                    //$("#WildfireRisk_flame_ave").text(flameAverage);                
                    //$("#WildfireRisk_flame_min").text(flameLow);                
                    //$("#WildfireRisk_flame_max").text(flameHigh);                
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
                    sendQueryRequest(oreallSiteURL, "42", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                    //Structural Fire Protection District
                    sendQueryRequest(oreallSiteURL, "44", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);
                    //Rangeland Protection Associations
                    sendQueryRequest(oreallSiteURL, "43", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);
                    //city or town
                    sendQueryRequest(fireSiteURL, "59", "name", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);
                    //urban growth boundary
                    sendQueryRequest(oreallSiteURL, "18", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);
                    //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                    sendQueryRequest(oreallHazardsURL, "54", "cwpp", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);
                    //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                    sendQueryRequest(oreallHazardsURL, "52", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);
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
                    //disableFireRiskMode();
                }
            };
            return WildfireRiskPopupModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        wildfireRiskPopup.WildfireRiskPopupModuleViewModel = WildfireRiskPopupModuleViewModel;
    })(wildfireRiskPopup = oe.wildfireRiskPopup || (oe.wildfireRiskPopup = {}));
})(oe || (oe = {}));
