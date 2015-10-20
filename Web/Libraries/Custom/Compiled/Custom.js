
/* Begin Script: C:/Users/rempelma/Documents/Visual Studio 2015/Projects/oe-gcx-html-viewer/custom_ts_out.js ------------------------- */ 
/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var oe;
(function (oe) {
    var elevation;
    (function (elevation) {
        var ElevationModule = (function (_super) {
            __extends(ElevationModule, _super);
            function ElevationModule(app, lib) {
                _super.call(this, app, lib);
            }
            ElevationModule.prototype.initialize = function (config) {
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
                this.app.map.on("mouse-move", handleMouseMoveClick);
                this.app.map.on("click", handleMouseMoveClick);
                function handleMouseMoveClick(evt) {
                    if (elevCounter === 0 || shellName !== "Desktop") {
                        elevCounter++;
                        if (this.extent !== undefined) {
                            var extent = this.extent;
                            var mapHeight = this.height;
                            var mapWidth = this.width;
                            //check to see if the result window is open, if so need to add to width or else values are wrong
                            var clientX = evt.clientX - $(".DataFrameResultsContainerView").width();
                            var screenPoint = new esri.geometry.ScreenPoint(clientX, evt.clientY);
                            var mapGeometry = esri.geometry.toMapPoint(extent, mapWidth, mapHeight, screenPoint);
                            var geographicPoint = esri.geometry.webMercatorToGeographic(mapGeometry);
                            var mapPoint = new esri.geometry.Point(geographicPoint);
                            var url = googleURL + mapPoint.y + "," + mapPoint.x;
                            //var proxyUrl = window.location.href.replace(window.location.href.split("/")[window.location.href.split("/").length - 1], "") + "Proxy.ashx?" + url;
                            var siteUrl = window.location.href.split("?")[0];
                            siteUrl = siteUrl.replace(siteUrl.split("/")[siteUrl.split("/").length - 1], "");
                            //alert(siteUrl);
                            var proxyUrl = siteUrl + "Proxy.ashx?" + url;
                            //var proxyUrl = window.location.href.replace(window.location.pathname, "/Proxy.ashx?" + url);
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
                                        $("#elevation").html(elevation);
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    var error = thrownError;
                                    alert(error);
                                }
                            });
                        }
                    }
                    else {
                        elevCounter = elevCounter === (elevCounterMax - 1) ? 0 : (elevCounter + 1);
                    }
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
                $('.banner').click(function (e) {
                    if (e.pageX < 350) {
                        window.open(linkUri, '_blank');
                    }
                });
                //if ($('.banner-subtitle').html() === "") {
                //    $('.banner-title').addClass("no-subtitle");
                //}          
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
                    metadataLink = metadataLink.length > 1 ? "http" + metadataLink[1].split(" ")[0].replace("Download", "").replace("download", "") : "";
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

/* End Script: C:/Users/rempelma/Documents/Visual Studio 2015/Projects/oe-gcx-html-viewer/custom_ts_out.js ------------------------- */ 

geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModuleView.html","html","PGRpdiBjbGFzcz0iZWxldmF0aW9uLW1vZHVsZS12aWV3Ij4NCglFTEVWQVRJT046IDxiPjxzcGFuIGlkPSJlbGV2YXRpb24iPjwvc3Bhbj48L2I+ICAgDQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Template/TemplateModuleView.html","html","PGRpdiBjbGFzcz0idGVtcGxhdGUtbW9kdWxlLXZpZXciPg0KCTxiPjxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBncmVldGluZ30iPjwvc3Bhbj48L2I+DQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Elevation/ElevationModule.css","css","DQovKi5yZWdpb24gLnZpZXcuVGVtcGxhdGVNb2R1bGVWaWV3LmFjdGl2ZSB7DQogICAgbWFyZ2luOiAwOw0KfSovDQoNCi5lbGV2YXRpb24tbW9kdWxlLXZpZXcNCnsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbGVmdDozMjVweDsNCiAgICB0b3A6MDsNCiAgICBmbG9hdDpyaWdodDsNCiAgICAvKnotaW5kZXg6IDEwMDsqLw0KICAgIGZvbnQtc2l6ZTouODVlbTsNCiAgICB3aWR0aDogMTc1cHg7ICAgDQogICAgaGVpZ2h0OjIwcHg7DQogICAgLypyaWdodDogMDsqLw0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgY29sb3I6ICMzMzM7DQogICAgLypwYWRkaW5nOiA2cHg7Ki8NCiAgICBib3JkZXI6IG5vbmU7DQogICAgbWFyZ2luLXRvcDogMTBweDsgICAgDQp9DQoNCg==");
geocortex.resourceManager.register("Custom","inv","Modules/Template/TemplateModule.css","css","DQoucmVnaW9uIC52aWV3LlRlbXBsYXRlTW9kdWxlVmlldy5hY3RpdmUgew0KICAgIG1hcmdpbjogMDsNCn0NCg0KLnRlbXBsYXRlLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHotaW5kZXg6IDEwMDsNCiAgICB3aWR0aDogMjAwcHg7DQogICAgcmlnaHQ6IDA7DQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHBhZGRpbmc6IDZweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzOw0KICAgIG1hcmdpbi10b3A6IDQ2cHg7DQogICAgbWFyZ2luLXJpZ2h0OiAycHg7DQp9DQo=");
geocortex.resourceManager.register("Custom","inv","Invariant","json","eyJoZWxsby13b3JsZC1pbml0aWFsaXplZCI6IkhlbGxvIHdvcmxkISBUZW1wbGF0ZSBtb2R1bGUgaW5pdGlhbGl6ZWQuIiwiaGVsbG8td29ybGQtZ3JlZXRpbmciOiJIZWxsbywgd29ybGQuIn0=");

geocortex.framework.notifyLibraryDownload("Custom");
