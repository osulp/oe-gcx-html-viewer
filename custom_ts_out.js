/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        })(geocortex.framework.application.ModuleBase);
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
        })(geocortex.framework.ui.ViewBase);
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
        })(geocortex.framework.ui.ViewModelBase);
        customform49.CustomFormM49ModuleViewModel = CustomFormM49ModuleViewModel;
    })(customform49 = oe.customform49 || (oe.customform49 = {}));
})(oe || (oe = {}));
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
// module to fire off the StartEditingFeature command since it requires use of the HtmlViewer context not available in workflow.
var oe;
(function (oe) {
    var development_registry;
    (function (development_registry) {
        var DevelopmentRegistryModule = (function (_super) {
            __extends(DevelopmentRegistryModule, _super);
            function DevelopmentRegistryModule(app, lib) {
                _super.call(this, app, lib);
            }
            DevelopmentRegistryModule.prototype.initialize = function (config) {
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
            DevelopmentRegistryModule.prototype._onSiteInitialized = function (site) {
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
            };
            return DevelopmentRegistryModule;
        })(geocortex.framework.application.ModuleBase);
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
                /*var site: geocortex.essentials.Site = (<any>this).app.site;
                if (site && site.isInitialized) {
                    this._onSiteInitialized(site);
                }
                else {
                    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                        this._onSiteInitialized(args);
                    });
                }*/
            };
            return ElevationModule;
        })(geocortex.framework.application.ModuleBase);
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
        })(geocortex.framework.ui.ViewBase);
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
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            var error = thrownError;
                            $("#GoogleElevationValue").html("Load failed");
                            //alert(error);
                        }
                    });
                }
            };
            return ElevationModuleViewModel;
        })(geocortex.framework.ui.ViewModelBase);
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
        })(geocortex.framework.application.ModuleBase);
        hyperlink_banner.HyperlinkBannerModule = HyperlinkBannerModule;
    })(hyperlink_banner = oe.hyperlink_banner || (oe.hyperlink_banner = {}));
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
            LayerActionsExtension.prototype._onSiteInitialized = function (site) {
                var _this = this;
                // Register an implementation for the "showMetadata" and "showDownload" commands.
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
        })(geocortex.framework.application.ModuleBase);
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
        })(geocortex.framework.ui.ViewBase);
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
        })(geocortex.framework.ui.ViewModelBase);
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
        })(geocortex.framework.application.ModuleBase);
        M49.M49Module = M49Module;
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
        })(geocortex.framework.application.ModuleBase);
        raster_functions.RasterFunctionsModule = RasterFunctionsModule;
    })(raster_functions = oe.raster_functions || (oe.raster_functions = {}));
})(oe || (oe = {}));
