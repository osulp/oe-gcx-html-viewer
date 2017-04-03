{
    "configuration": {
        "version": "2.4",
        "application": {
            "proxyUri": "proxy.ashx?",
            "allowUnsafeContent": true,
            "offlineStorageSpaceMb": "50",
            "geometryServiceUrl": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"
        },
        "defaultLibraryId": "Mapping",
        "libraries": [
            {
                "id": "Framework.UI",
                "uri": "Resources/Compiled/Framework.UI.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Framework.UI.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Mapping.Infrastructure",
                "uri": "Resources/Compiled/Mapping.Infrastructure.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Mapping.Infrastructure.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Mapping",
                "uri": "Resources/Compiled/Mapping.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Mapping.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Charting",
                "uri": "Resources/Compiled/Charting.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Charting.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Mapping.Charting",
                "uri": "Resources/Compiled/Mapping.Charting.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Mapping.Charting.en-US.json.js"
                    }
                ]
            },
            {
                "id": "RightClickMenu",
                "uri": "Resources/Scripts/rightClickMenu.js"
            },
            {
                "id":"Custom",
                "uri":"Libraries/Custom/Compiled/Custom.js",
                "locales":[
                    {
                        "locale":"en-US",
                        "uri":"Resources/Locales/Custom.en-US.json.js"
                    }
                ]
            }
        ],
        "modules": [
            {
                "moduleName": "Log",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogModule",
                "views": [
                    {
                        "id": "LogView",
                        "viewModelId": "LogViewModel",
                        "visible": false,
                        "markup": "Mapping/modules/Log/LogView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogView",
                        "region": "ApplicationRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "LogViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "LayerActionsExtension",
                "moduleType": "oe.layer_actions_extension.LayerActionsExtension",
                "libraryId": "Custom",
                "configuration": {}
            },
            {
                "moduleName": "M49",
                "moduleType": "oe.M49.M49Module",
                "libraryId": "Custom",
                "configuration": {}
            },
            {
                "moduleName": "HyperlinkBanner",
                "moduleType": "oe.hyperlink_banner.HyperlinkBannerModule",
                "libraryId": "Custom",
                "configuration": {
                    "linkUri": "http://oregonexplorer.info"
                }
            },
            {
                "moduleName": "Elevation",
                "moduleType": "oe.elevation.ElevationModule",
                "libraryId": "Custom",
                "configuration": {

                },
                "views": [
                   {
                       "id": "ElevationModuleView",
                       "viewModelId": "ElevationModuleViewModel",
                       "visible": true,
                       "markup": "Modules/Elevation/ElevationModuleView.html",
                       "type": "oe.elevation.ElevationModuleView",
                       "region": "LeftFooterRegion",
                       "configuration": {

                       }
                   }
                ],
                "viewModels": [
                   {
                       "id": "ElevationModuleViewModel",
                       "type": "oe.elevation.ElevationModuleViewModel",
                       "configuration": {
                       }
                   }
                ]
            },
            {
                "moduleName": "RasterFunctions",
                "moduleType": "oe.raster_functions.RasterFunctionsModule",
                "libraryId": "Custom",
                "configuration": {
                }
            },
            {
                "moduleName": "Accessibility",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityModule",
                "configuration": {
                    "keyboardFocusIndicatorEnabled": true,
                    "expandedMapKeyboardAccessibility": true,
                    "providers": [
                        {
                            "id": "MapTextProvider",
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.MapTextProvider",
                            "decimalPrecision": 4,
                            "readAttributionInformation": false,
                            "isEnabled": true
                        }
                    ]
                },
                "views": [
                    {
                        "id": "AccessibilityView",
                        "viewModelId": "AccessibilityViewModel",
                        "visible": true,
                        "type": "geocortex.framework.ui.ViewBase",
                        "markup": "Mapping/modules/Accessibility/AccessibilityView.html",
                        "region": "AccessibilityRegion"
                    }
                ],
                "viewModels": [
                    {
                        "id": "AccessibilityViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Alert",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.alert.AlertModule",
                "configuration": {
                    "alertRegion": "ModalWindowRegion",
                    "overrideNativeAlert": true
                }
            },
            {
                "moduleName": "Authentication",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.authentication.AuthenticationModule",
                "configuration": {
                    "region": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "Banner",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerModule",
                "configuration": {},
                "views": [
                    {
                        "id": "BannerView",
                        "viewModelId": "BannerViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Banner/BannerView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerView",
                        "region": "HeaderRegion",
                        "configuration": {}
                    },
                    {
                        "id": "UserInfoView",
                        "viewModelId": "UserInfoViewModel",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.User.UserInfoView",
                        "markup": "Mapping/modules/User/UserInfoView.html",
                        "region": "BannerContentRegion"
                    },
                    {
                        "id": "SignInView",
                        "viewModelId": "SignInViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/User/SignInView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.User.SignInView",
                        "region": "BannerContentRegion",
                        "configuration": {}
                    },
                    {
                        "id": "SearchView",
                        "viewModelId": "SearchViewModel",
                        "visible": true,
                        "title": "@language-search-title",
                        "iconUri": "Resources/Images/Icons/Toolbar/search-32.png",
                        "markup": "Mapping/modules/Search/SearchView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchView",
                        "region": "BannerContentRegion",
                        "configuration": {}
                    },
                    {
                        "id": "SearchHintsView",
                        "viewModelId": "SearchViewModel",
                        "visible": false,
                        "markup": "Mapping/modules/Search/SearchHintsView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchHintsView",
                        "region": "SearchHintsRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "BannerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerViewModel",
                        "configuration": {
                            "applicationTitle": "Map Viewer",
                            "applicationSubtitle": "Search, identify, analyze and share!",
                            "titleColor": "#615042",
                            "subtitleColor": "#959398",
                            "backgroundColor": "#FFFFFF",
                            "backgroundImage": "Resources/Images/Banners/default-banner-bg.png",
                            "leftImage": "Resources/Images/Custom/oe-default-banner.png",
                            "rightImage": "",
                            "height": 60
                        }
                    }
                ]
            },
            {
                "moduleName": "Basemap",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapModule",
                "configuration": {},
                "views": [
                    {
                        "id": "BasemapView",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapView",
                        "markup": "Mapping/modules/Basemap/BasemapView.html",
                        "region": "BottomLeftMapRegion",
                        "visible": true,
                        "configuration": {}
                    },
                    {
                        "id": "BasemapSwitcherButtonView",
                        "viewModelId": "BasemapSwitcherViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSwitcherButtonView",
                        "markup": "Mapping/modules/Basemap/BasemapSwitcherButtonView.html",
                        "region": "BasemapRegion",
                        "visible": true,
                        "configuration": {
                            "hideIfNoBasemapsAvailable": true
                        }
                    },
                    {
                        "id": "BasemapSliderView",
                        "viewModelId": "BasemapSwitcherViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSliderView",
                        "markup": "Mapping/modules/Basemap/BasemapSliderView.html",
                        "region": "BasemapRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "BasemapSwitcherViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSwitcherViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Bookmarks",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksModule",
                "configuration": {},
                "views": [
                    {
                        "id": "BookmarksView",
                        "viewModelId": "BookmarksViewModel",
                        "markup": "Mapping/modules/Bookmarks/BookmarksView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksView",
                        "region": "ModalWindowRegion",
                        "title": "@language-toolbar-bookmark",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "BookmarksViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksViewModel",
                        "configuration": {
                            "bookmarksEnabled": true,
                            "showBookmarksButton": false
                        }
                    }
                ]
            },
            {
                "moduleName": "Browser",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.browser.BrowserModule",
                "configuration": {
                    "title": "@language-browser-title"
                }
            },
            {
                "moduleName": "Charting",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartingModule",
                "libraryId": "Mapping.Charting",
                "configuration": {
                    "infrastructureLibraryId": "Charting",
                    "adapters": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.FeatureChartPointAdapter",
                            "source": "Field",
                            "configuration": {}
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.DataLinkChartPointAdapter",
                            "source": "DataLink",
                            "configuration": {}
                        }
                    ],
                    "eventMappings": {
                        "ChartPointMouseHoverBeginEvent": [
                            "ClearChartHighlights",
                            "HighlightChartFeatureSet"
                        ],
                        "ChartPointMouseHoverEndEvent": [
                            "ClearChartHighlights"
                        ],
                        "ChartPointMouseDownEvent": [
                            "RunChartFeatureActions"
                        ]
                    }
                },
                "views": [
                    {
                        "id": "ChartingView",
                        "viewModelId": "ChartingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartingView",
                        "markup": "Mapping.Charting/modules/Charting/ChartingView.html",
                        "libraryId": "Mapping.Charting",
                        "region": "BottomPanelRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ChartingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartingViewModel",
                        "libraryId": "Mapping.Charting",
                        "configuration": {
                            "chartingEnabled": true,
                            "chartConfiguration": {
                                "animationsEnabled": true,
                                "gradientsEnabled": false,
                                "interactiveLegendEnabled": false,
                                "pieStartAngle": 180,
                                "renderAs": "svg"
                            },
                            "infrastructureLibraryId": "Charting",
                            "containerRegionName": "ChartingRegion",
                            "containerRegionType": "geocortex.framework.ui.DivStackRegionAdapter",
                            "showXButton": true,
                            "defaultViewIcon": "Resources/Images/Icons/Toolbar/search-24.png",
                            "headerIsVisible": true,
                            "showHeaderForStandaloneViews": false,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": true,
                            "showMaximizeButton": true,
                            "showHostedViews": false,
                            "resizeY": true,
                            "ordering": {}
                        }
                    }
                ]
            },
            {
                "moduleName": "CompactToolbar",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarModule",
                "configuration": {
                    "isEnabled": false,
                    "transientElements": [
                        {
                            "tools": [
                                "MeasureDistanceTool",
                                "MeasureAreaTool",
                                "MeasureLineTool",
                                "MeasureFreehandLineTool",
                                "MeasurePolygonTool",
                                "MeasureFreehandPolygonTool",
                                "MeasureCircleTool",
                                "MeasureRectangleTool"
                            ],
                            "widgetId": "MeasurementToolTransientToolbar",
                            "worksWith": [
                                "DeleteMeasurementTool"
                            ],
                            "region": "CompactToolbarTransientRegion"
                        },
                        {
                            "tools": [
                                "PointMarkupTool",
                                "FreehandMarkupTool",
                                "PolylineMarkupTool",
                                "PolygonMarkupTool",
                                "RectangleMarkupTool",
                                "CircleMarkupTool",
                                "EllipseMarkupTool",
                                "TextMarkupTool"
                            ],
                            "widgetId": "DrawingToolTransientToolbar",
                            "worksWith": [
                                "EditMarkupTool",
                                "DeleteMarkupTool"
                            ],
                            "region": "CompactToolbarTransientRegion"
                        }
                    ],
                    "toolbarGroups": [
                        {
                            "id": "compactToolbar",
                            "type": "toolbarGroup",
                            "name": "Compact Toolbar",
                            "items": [
                                {
                                    "id": "HomeButton",
                                    "type": "button",
                                    "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                                    "command": "ActivateHomePanel",
                                    "commandParameter": null,
                                    "hideOnDisable": false,
                                    "name": "@language-toolbar-home-sub",
                                    "tooltip": "@language-toolbar-navigation-home-tooltip"
                                },
                                {
                                    "id": "InitialExtentButton",
                                    "type": "button",
                                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
                                    "command": "ZoomToInitialExtent",
                                    "commandParameter": null,
                                    "hideOnDisable": false,
                                    "name": "@language-toolbar-navigation-initial-extent",
                                    "tooltip": "@language-toolbar-navigation-initial-extent-tooltip"
                                },
                                {
                                    "id": "PointIdentifyTool-Navigation",
                                    "type": "tool",
                                    "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                                    "command": "Identify",
                                    "drawMode": "RECTANGLE",
                                    "name": "@language-toolbar-tasks-identify",
                                    "tooltip": "@language-toolbar-identify-point-tooltip",
                                    "hideOnDisable": false,
                                    "isSticky": false,
                                    "statusText": "@language-toolbar-identify-point-desc"
                                },
                                {
                                    "id": "PrintMapButton",
                                    "type": "button",
                                    "iconUri": "Resources/Images/Icons/Toolbar/print-24.png",
                                    "command": "PrintMap",
                                    "commandParameter": null,
                                    "hideOnDisable": false,
                                    "name": "@language-toolbar-tasks-print-map",
                                    "tooltip": "@language-toolbar-tasks-print-map-tooltip"
                                },
                                {
                                    "id": "ExportMapButton",
                                    "type": "button",
                                    "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png",
                                    "command": "ShowExportMapDialog",
                                    "commandParameter": null,
                                    "hideOnDisable": false,
                                    "name": "@language-toolbar-tasks-export-map",
                                    "tooltip": "@language-toolbar-tasks-export-map-tooltip"
                                }
                            ]
                        }
                    ]
                },
                "viewModels": [
                    {
                        "id": "CompactToolbarViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarViewModel",
                        "configuration": {
                            "toolbarVisibleTools": 4,
                            "toolbarOpenByDefault": false,
                            "toolbarGroupRefs": [
                                "compactToolbar"
                            ]
                        }
                    }
                ],
                "views": [
                    {
                        "id": "CompactToolbarView",
                        "viewModelId": "CompactToolbarViewModel",
                        "visible": true,
                        "title": "@language-compact-toolbar-name",
                        "region": "TopRightMapRegion",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarView",
                        "markup": "Mapping/modules/Toolbar/CompactToolbar/CompactToolbarView.html",
                        "configuration": {}
                    },
                    {
                        "id": "CompactToolbarFlyoutView",
                        "viewModelId": "CompactToolbarViewModel",
                        "visible": true,
                        "title": "@language-toolbar-multi-tool",
                        "region": "CompactToolbarFlyoutDropdown",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarFlyoutView",
                        "markup": "Mapping/modules/Toolbar/Templates/ToolbarFlyoutDropdownTemplate.html",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Confirm",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.confirm.ConfirmModule",
                "configuration": {
                    "confirmRegion": "ModalWindowRegion"
                }
            },
            {
                "moduleName" : "Coordinates",
                "moduleType" : "geocortex.essentialsHtmlViewer.mapping.modules.coordinates.CoordinatesModule",
                "configuration" : {},
                "views" : [{
                    "id" : "CoordinatesView",
                    "viewModelId" : "CoordinatesViewModel",
                    "markup" : "Mapping/modules/Coordinates/CoordinatesView.html",
                    "type" : "geocortex.essentialsHtmlViewer.mapping.modules.coordinates.CoordinatesView",
                    "region" : "LeftFooterRegion",
                    "visible" : true,
                    "configuration" : {}

                }
                ],
                "viewModels" : [{
                    "id" : "CoordinatesViewModel",
                    "type" : "geocortex.essentialsHtmlViewer.mapping.modules.coordinates.CoordinatesViewModel",
                    "configuration" : {
                        "isEnabled" : true,
                        "openByDefault" : true,
                        "useBasemapCoordinates" : false,
                        "numDigits" : 3,
                        "coordinateSystems" : [{
                            "displayName" : "Lat/Long",
                            "wkid" : 4326,
                            "output" : "latLon"
                        },
                        {
                            "displayName" : "Degree Minute Second",
                            "wkid" : 4326,
                            "output" : "dms"
                        },
                        {
                            "displayName" : "Degree Decimal Minutes",
                            "wkid" : 4326,
                            "output" : "ddm"
                        },
                        {
                            "displayName" : "Oregon State Plane",
                            "wkid" : 2292,
                            "output": "xy"
                        }
                        ]
                    }
                }
                ]
            },
            {
                "moduleName": "Editing",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditingModule",
                "configuration": {},
                "views": [
                    {
                        "id": "MapDataMenuView",
                        "viewModelId": "EditingMapDataMenuViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup": "Mapping/infrastructure/menus/MenuView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-feature-offline-tools",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {
                            "menuId": "MapDataMenu"
                        }
                    },
                    {
                        "id": "TemplatePickerView",
                        "viewModelId": "TemplatePickerViewModel",
                        "iconUri": "Resources/Images/Icons/Toolbar/file-add-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerView",
                        "markup": "Mapping/modules/Editing/TemplatePicker/TemplatePickerView.html",
                        "region": "FeatureEditingContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-template-picker",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {}
                    },
                    {
                        "id": "EditorView",
                        "viewModelId": "EditorViewModel",
                        "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditorView",
                        "markup": "Mapping/modules/Editing/Editor/EditorView.html",
                        "region": "FeatureEditingContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-editing",
                        "description": "@language-common-feature-editing-desc",
                        "configuration": {
                            "showXButton": false
                        }
                    },
                    {
                        "id": "EditLogView",
                        "viewModelId": "EditLogViewModel",
                        "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.EditLogView",
                        "markup": "Mapping/modules/FeatureLayer/EditLogView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-feature-layer-edits-and-sync",
                        "description": "@language-common-feature-editlog-desc",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "TemplatePickerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "EditLogViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.EditLogViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "EditorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditorViewModel",
                        "configuration": {
                            "editGeometry": true,
                            "validateGeometry": true,
                            "tools": [
                                {
                                    "name": "EditingPointTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POINT",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                                    "statusText": "@language-feature-editing-dsk-point-tool",
                                    "keyboardStatusText": "@language-feature-editing-dsk-point-tool-keyboard"
                                },
                                {
                                    "name": "EditingLineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "LINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-polyline-24.png",
                                    "statusText": "@language-feature-editing-dsk-line-tool"
                                },
                                {
                                    "name": "EditingPolylineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POLYLINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-polyline-24.png",
                                    "statusText": "@language-feature-editing-dsk-polyline-tool",
                                    "keyboardStatusText": "@language-feature-editing-dsk-polyline-tool-keyboard"
                                },
                                {
                                    "name": "EditingFreehandPolylineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "FREEHAND_POLYLINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-freehand-24.png",
                                    "statusText": "@language-feature-editing-dsk-freehand-polyline-tool"
                                },
                                {
                                    "name": "EditingPolygonTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POLYGON",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-24.png",
                                    "statusText": "@language-feature-editing-dsk-polygon-tool",
                                    "keyboardStatusText": "@language-feature-editing-dsk-polygon-tool-keyboard"
                                },
                                {
                                    "name": "EditingFreehandPolygonTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "FREEHAND_POLYGON",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-freehand-24.png",
                                    "statusText": "@language-feature-editing-dsk-freehand-polygon-tool"
                                },
                                {
                                    "name": "EditingCircleTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "CIRCLE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-circle-24.png",
                                    "statusText": "@language-feature-editing-circle-tool"
                                },
                                {
                                    "name": "EditingEllipseTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "ELLIPSE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-ellipse-24.png",
                                    "statusText": "@language-feature-editing-ellipse-tool"
                                },
                                {
                                    "name": "EditingRectangleTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "EXTENT",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-rectangle-24.png",
                                    "statusText": "@language-feature-editing-rectangle-tool"
                                }
                            ]
                        }
                    },
                    {
                        "id": "EditingMapDataMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "ExportMap",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapModule",
                "configuration": {},
                "views": [
                    {
                        "id": "ExportMapView",
                        "viewModelId": "ExportMapViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapView",
                        "markup": "Mapping/modules/ExportMap/ExportMapView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/Toolbar/share-map-image-24.png",
                        "title": "@language-export-map-description",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ExportMapViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "FeatureDetails",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsModule",
                "configuration": {
                    "defaultViewMode": "compact",
                    "viewModes": {
                        "compact": {
                            "viewId": "FeatureDetailsCompactView",
                            "defaultProviderTargetRegion": "FeatureDetailsCompactViewRegion"
                        },
                        "expanded": {
                            "viewId": "FeatureDetailsExpandedView",
                            "defaultProviderTargetRegion": "FeatureDetailsBottomRegion"
                        }
                    },
                    "providers": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DescriptionViewModel",
                            "viewId": "FeatureDescriptionProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DescriptionView",
                            "title": "@language-feature-description",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/DescriptionView.html",
                            "config": {
                                "longDescription": true
                            },
                            "enabled": true
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.HyperlinksViewModel",
                            "viewId": "FeatureHyperlinksProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.HyperlinksView",
                            "iconUri": "Resources/Images/Icons/Toolbar/attach-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/HyperlinksView.html",
                            "title": "@language-feature-hyperlinks"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesViewModel",
                            "viewId": "FeatureAttributesProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesView",
                            "iconUri": "Resources/Images/Icons/Toolbar/details-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/MultiColumnAttributesView.html",
                            "title": "@language-feature-attributes"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.SingleFeatureChartViewModel",
                            "viewId": "FeatureChartsProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.charting.SingleFeatureChartView",
                            "libraryId": "Mapping.Charting",
                            "iconUri": "Resources/Images/Icons/charting-24.png",
                            "markup": "Mapping.Charting/modules/Charting/SingleFeatureChartView.html",
                            "title": "@language-feature-charts",
                            "config": {
                                "infrastructureLibraryId": "Charting",
                                "containerRegionName": "SingleFeatureChartsRegion",
                                "chartConfiguration": {
                                    "animationsEnabled": true,
                                    "gradientsEnabled": false,
                                    "interactiveLegendEnabled": false,
                                    "pieStartAngle": 180,
                                    "renderAs": "svg"
                                }
                            }
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttachmentsViewModel",
                            "viewId": "FeatureAttachmentsProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttachmentsView",
                            "iconUri": "Resources/Images/Icons/Toolbar/attach-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/AttachmentsView.html",
                            "title": "@language-feature-attachments"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.RelatedFeaturesViewModel",
                            "viewId": "FeatureRelationsProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.RelatedFeaturesView",
                            "iconUri": "Resources/Images/Icons/Toolbar/file-multi-24.png",
                            "markup": {
                                "compact": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/RelatedFeaturesView.html",
                                "expanded": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/RelatedFeaturesTableView.html"
                            },
                            "title": "@language-feature-related-features"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksViewModel",
                            "viewId": "FeatureDataLinksProviderView",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksView",
                            "iconUri": "Resources/Images/Icons/Toolbar/details-24.png",
                            "markup": {
                                "compact": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/DataLinksView.html",
                                "expanded": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/DataLinksTableView.html"
                            },
                            "title": "@language-feature-datalinks"
                        }
                    ]
                },
                "views": [
                    {
                        "id": "FeatureDetailsExpandedView",
                        "viewModelId": "FeatureDetailsExpandedViewModel",
                        "visible": false,
                        "title": "@language-feature-details-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsView",
                        "libraryId": "Mapping",
                        "markup": "Mapping/modules/FeatureDetails/FeatureDetailsView.html",
                        "region": "ResultsRegion",
                        "configuration": {
                            "onDeactivated": [
                                "ClearDefaultHighlights"
                            ]
                        }
                    },
                    {
                        "id": "FeatureDetailsCompactView",
                        "viewModelId": "FeatureDetailsCompactViewModel",
                        "visible": false,
                        "title": "@language-feature-details-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsView",
                        "libraryId": "Mapping",
                        "markup": "Mapping/modules/FeatureDetails/FeatureDetailsView.html",
                        "region": "DataFrameResultsContainerRegion",
                        "configuration": {
                            "onDeactivated": [
                                "ClearDefaultHighlights"
                            ]
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "FeatureDetailsExpandedViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsViewModel",
                        "configuration": {
                            "defaultTabViewForLayer": {
                                "FeatureAttributesProviderView": "default"
                            },
                            "regions": [
                                {
                                    "regionName": "FeatureDetailsTopLeftRegion",
                                    "regionCss": "feature-details-top-left-region"
                                },
                                {
                                    "regionName": "FeatureDetailsTopRightRegion",
                                    "regionCss": "feature-details-top-right-region"
                                },
                                {
                                    "regionName": "FeatureDetailsBottomRegion",
                                    "regionCss": "feature-details-bottom-region"
                                }
                            ]
                        }
                    },
                    {
                        "id": "FeatureDetailsCompactViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsViewModel",
                        "configuration": {
                            "regions": [
                                {
                                    "regionName": "FeatureDetailsCompactViewRegion",
                                    "regionType": "geocortex.framework.ui.DivStackRegionAdapter",
                                    "regionCss": "feature-region"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "moduleName": "FeatureLayer",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerModule",
                "configuration": {},
                "views": [
                    {
                        "id": "FeatureLayerDetailsView",
                        "viewModelId": "FeatureLayerViewModel",
                        "iconUri": "Resources/Images/Icons/Toolbar/layers-extract-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerDetailsView",
                        "markup": "Mapping/modules/FeatureLayer/FeatureLayerDetailsView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-layer-details",
                        "description": "@language-common-feature-layer-details-desc",
                        "configuration": {}
                    },
                    {
                        "id": "FeatureLayerListView",
                        "viewModelId": "FeatureLayerViewModel",
                        "iconUri": "Resources/Images/Icons/Toolbar/layer-list-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerListView",
                        "markup": "Mapping/modules/FeatureLayer/FeatureLayerListView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-sync-settings",
                        "description": "@language-common-feature-sync-settings-desc",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "FeatureLayerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerViewModel",
                        "configuration": {
                            "showWhereClause": false
                        }
                    }
                ]
            },
            {
                "moduleName": "Footer",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.footer.FooterModule",
                "configuration" : {
                    "menus" : [{
                        "id" : "FooterMenu",
                        "description" : "@language-menu-footer-menu-desc",
                        "moduleId" : "Footer",
                        "items" : [{
                            "text" : "Oregon Explorer",
                            "description" : "Tool of the Oregon Explorer.  Click to go to web site.",
                            "command" : "OpenWebPage",
                            "commandParameter" : "http://oregonexplorer.info"
                        },{
                            "text": "Feedback",
                            "command": "OpenWebPage",
                            "commandParameter": "mailto:virtualoregon.support@oregonstate.edu?Subject=Map Viewer Feedback"
                        }
                        ]
                    }, {
                        "id" : "SocialLinks",
                        "description" : "@language-menu-social-links-menu-desc",
                        "moduleId" : "Footer",
                        "items" : [{
                            "iconUri" : "Resources/Images/Icons/Custom/twitter-grey-16.png",
                            "command" : "ShareOn",
                            "commandParameter" : "twitter"
                        }, {
                            "iconUri" : "Resources/Images/Icons/Custom/facebook-grey-16.png",
                            "command" : "ShareOn",
                            "commandParameter" : "facebook"
                        }, {
                            "iconUri" : "Resources/Images/Icons/Custom/linkedin-grey-16.png",
                            "command" : "ShareOn",
                            "commandParameter" : "linkedin"
                        }, {
                            "iconUri" : "Resources/Images/Icons/Custom/google-plus-grey-16.png",
                            "command" : "ShareOn",
                            "commandParameter" : "googleplus"
                        }, {
                            "iconUri" : "Resources/Images/Icons/Custom/contact-16.png",
                            "command" : "ShareOn",
                            "commandParameter" : "email"
                        }
                        ]
                    }
                    ]
                },
                "views": [
                    {
                        "id": "FooterView",
                        "viewModelId": "FooterViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Footer/FooterView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.footer.FooterView",
                        "region": "FooterRegion",
                        "configuration": {}
                    },
                    {
                        "id" : "FooterSocialView",
                        "viewModelId" : "FooterSocialViewModel",
                        "libraryId" : "Mapping.Infrastructure",
                        "type" : "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup" : "Mapping/infrastructure/menus/MenuView.html",
                        "region" : "RightFooterRegion",
                        "visible" : true,
                        "configuration" : {
                            "menuId" : "SocialLinks"
                        }
                    },
                    {
                        "id": "FooterMenuView",
                        "viewModelId": "FooterMenuViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup": "Mapping/infrastructure/menus/MenuHyperlinkView.html",
                        "region": "RightFooterRegion",
                        "visible": true,
                        "configuration": {
                            "menuId": "FooterMenu"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "FooterViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.footer.FooterViewModel",
                        "configuration": {
                            "backgroundColor": "#EEEEEE",
                            "height": 20
                        }
                    },
                    {
                        "id": "FooterMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
                        "configuration": {}
                    },
                     {
                         "id" : "FooterSocialViewModel",
                         "type" : "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
                         "configuration" : {}
                     }
                ]
            },
            {
                "moduleName": "Geolocate",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateModule",
                "configuration": {},
                "views": [
                    {
                        "id": "GeolocateView",
                        "title": "@language-geolocate-title",
                        "viewModelId": "GeolocateViewModel",
                        "markup": "Mapping/modules/Geolocate/GeolocateView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateView",
                        "region": "GeolocateMenuRegion",
                        "visible": false,
                        "configuration": {}
                    },
                    {
                        "id": "GeolocateStatusView",
                        "viewModelId": "GeolocateStatusViewModel",
                        "markup": "Mapping/modules/Geolocate/GeolocateStatusView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateStatusView",
                        "region": "BottomCenterMapRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "GeolocateViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateViewModel",
                        "configuration": {
                            "geolocateEnabled": false,
                            "trackingEnabled": false,
                            "followingEnabled": false,
                            "enableHighAccuracy": true,
                            "geolocateAccuracyCircleEnabled": true,
                            "adjustExtentZoomOnGeolocate": true,
                            "geolocateExtentZoomLevel": 50000,
                            "geolocationIndicator": "Resources/Images/Icons/geolocate-position-32.png"
                        }
                    },
                    {
                        "id": "GeolocateStatusViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateStatusViewModel",
                        "configuration": {
                            "showGeolocateCoordinates": false,
                            "showTrackingCoordinates": true,
                            "showFollowingCoordinates": true,
                            "coordinateFormat": "dd",
                            "coordinateWkid": null,
                            "coordinateFractionalDigits": 4,
                            "geolocateIcon": "Resources/Images/Icons/geolocate-24.png",
                            "busyIcon": "Resources/Images/loader-small.gif"
                        }
                    }
                ]
            },
            {
                "moduleName": "Highlight",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Highlight.HighlightModule",
                "configuration": {
                    "fillColor": "#99ECEC3A",
                    "borderColor": "#FFCCCC33"
                }
            },
            {
                "moduleName": "Identify",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyModule",
                "configuration": {
                    "resultsDisplayName": "@language-identify-results-header",
                    "identifyProviders": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.identify.MapIdentifyTaskIdentifyProvider",
                            "enabled": true,
                            "configuration": {
                                "topMostLayerOnly": false,
                                "pixelTolerance": 5,
                                "polygonPixelTolerance": 0,
                                "returnGeometry": true
                            }
                        }
                    ],
                    "tools": [
                        {
                            "name": "IdentifyPointTool",
                            "command": "Identify",
                            "drawMode": "POINT",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                            "statusText": "@language-dsk-identify-point-tool",
                            "keyboardStatusText": "@language-toolbar-identify-point-desc-keyboard"
                        },
                        {
                            "name": "IdentifyRectangleTool",
                            "command": "Identify",
                            "drawMode": "RECTANGLE",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-rectangle-24.png",
                            "statusText": "@language-identify-rectangle-tool"
                        },
                        {
                            "name": "IdentifyPolylineTool",
                            "command": "Identify",
                            "drawMode": "POLYLINE",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polyline-24.png",
                            "statusText": "@language-dsk-identify-polyline-tool",
                            "keyboardStatusText": "@language-toolbar-identify-polyline-desc-keyboard"
                        },
                        {
                            "name": "IdentifyPolygonTool",
                            "command": "Identify",
                            "drawMode": "POLYGON",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polygon-24.png",
                            "statusText": "@language-identify-polygon-tool",
                            "keyboardStatusText": "@language-toolbar-identify-polygon-desc-keyboard"
                        },
                        {
                            "name": "IdentifyFreehandPolygonTool",
                            "command": "Identify",
                            "drawMode": "FREEHAND_POLYGON",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-freehand-24.png",
                            "statusText": "@language-identify-freehand-polygon-tool"
                        }
                    ]
                }
            },
            {
                "moduleName": "Info",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoModule",
                "configuration": {},
                "views": [
                    {
                        "id": "InfoView",
                        "viewModelId": "InfoViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoView",
                        "markup": "Mapping/modules/Info/InfoView.html",
                        "region": "HomePanelContainerRegion",
                        "title": "@language-common-welcome",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "InfoViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoViewModel",
                        "configuration": {
                            "content": "%3Cspan%20style%3D%22font-family%3A%20Segoe%20UI%2C%20Arial%3B%20font-size%3A%2012px%3B%20color%3A%20%23555555%3B%22%3E%0A%3Cp%20style%3D%22color%3A%20%23000000%3B%20%20font-size%3A%2018px%3B%20font-family%3A%20Segoe%20UI%20Light%2C%20Segoe%20UI%2C%20Arial%22%3EWelcome%20to%20the%20Oregon%20Explorer%0A%3Cbr%3E%20Map%20Viewer!%3C%2Fp%3E%0A%20%3Cbr%3E%0A%0A%20%3Cp%3EWith%20hundreds%20of%20map%20layers%20available%20to%20draw%20from%2C%20you%20can%20use%20the%20Oregon%20Explorer%20Map%20Viewer%20to%20make%20your%20own%20custom%20map%20and%20share%20it%20with%20others.%20%20Use%20the%20filter%20box%20at%20the%20bottom%20of%20the%20list%20of%20layers%20to%20find%20the%20layers%20you%20need.%20%20You%20can%20also%20select%20from%20pre-defined%20layer%20categories%2C%20such%20as%20restoration%20or%20land%20use.%20%20If%20you%20need%20more%20guidance%2C%20%3Cspan%20style%3D%22font-weight%3A%20bold%22%3E%3Ca%20href%3D%22http%3A%2F%2Foregonexplorer.info%2FOregonExplorerTutorials%22%3Ewatch%20tutorials%3C%2Fa%3E%3C%2Fspan%3E%20on%20how%20to%20use%20the%20Oregon%20Explorer%20Map%20Viewer%20or%20use%20the%20%3Cspan%20style%3D%22font-weight%3A%20bold%22%3E%3Ca%20href%3D%22command%3AInvokeClickHelp%22%3Einteractive%20help%3C%2Fa%3E%3C%2Fspan%3E%3C%2Fp%3E%0A%20%3Cbr%3E%0A%0A%20%3Cp%3EClick%20button%20below%20to%20directly%20access%20the%20map%20layers%20or%20click%20on%20the%20%E2%80%9Clayers%E2%80%9D%20icon%20in%20the%20bottom%20left%20hand%20corner%20of%20this%20window.%20%20The%20home%20button%20gets%20you%20back%20to%20this%20introduction.%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3Cbr%3E%0A%20%20%20%20%20%20%20%20%3Cp%20style%3D%22text-align%3Acenter%22%3E%3Ca%20href%3D%22command%3ASwitchToLayerView%22%3E%3Cimg%20src%3D%22%2FResources%2FImages%2FCustom%2FGotoLayers.png%22%3E%3C%2Fa%3E%3C%2Fp%3E%0A%20%3Cbr%3E%0A%20%3Ctable%20width%3D%22300px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctbody%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AActivateTool%3FMarkupFreehand%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Fdraw-freehand-24.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22100px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AActivateTool%3FMarkupFreehand%22%3EDraw%20on%20map%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FAnalysis%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AActivateTool%3FMeasureArea%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Fmeasure-area-32.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22160px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FAnalysis%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AActivateTool%3FMeasureArea%22%3EMeasure%20area%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AAddMapLayerInteractive%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Flayers-add-32.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3AAddMapLayerInteractive%22%3EAdd%20Layer(s)%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ARunWorkflowById%3FextractEmailLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Flayers-email-32.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ARunWorkflowById%3FextractEmailLayers%22%3EExtract%20and%20Email%20Data%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3APrintMap%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Fprint-32.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3APrintMap%22%3EPrint%20map%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ARunWorkflow%3Fmap_it%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Fcommunity_data_32.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FLayers%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ARunWorkflow%3Fmap_it%22%3EOverlay%20Community%20Data%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ACaptureViewerState%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20src%3D%22%2FResources%2FImages%2FIcons%2FToolbar%2Fshare-map-24.png%22%20width%3D%2220px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22command%3ASetCurrentTab%3FCreate%20%26amp%3B%20Share%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%3Ca%20href%3D%22command%3ACaptureViewerState%22%3EShare%20map%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0A%20%20%20%20%20%20%20%20%3C%2Ftbody%3E%3C%2Ftable%3E%20%0A%20%3Cbr%3E%0A%20%3Cp%3E%0A%20%20%20%20%20%20%20%20We%20hope%20you%20enjoy%20using%20the%20tool.%26nbsp%3B%20Send%20questions%20or%20feedback%20to%3A%20%3Ca%20href%3D%22mailto%3Avirtualoregon.support%40oregonstate.edu%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20virtualoregon.support%40oregonstate.edu%3C%2Fa%3E%3C%2Fp%3E%0A%20%20%20%20%3Cbr%3E%3Cbr%3E%0A%20%20%20%20%3Cp%20style%3D%22text-align%3Acenter%22%3E%3Ca%20href%3D%22http%3A%2F%2Foregonexplorer.info%22%20target%3D%22_blank%22%3E%0A%20%20%20%20%20%20%20%20%3Cimg%20style%3D%22width%3A%20294px%3B%20height%3A%20167px%3B%22%20src%3D%22http%3A%2F%2Foregonexplorer.info%2Fportal_images%2Fcommon%2Fexplorer_logo_mirror.png%22%3E%3C%2Fa%3E%3C%2Fp%3E%0A%20%20%3C%2Fspan%3E%0A%20",
                            "included": true,
                            "title": "@language-common-welcome"
                        }
                    }
                ]
            },
            {
                "moduleName": "Integration",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.integration.IntegrationModule",
                "configuration": {
                    "allowedOrigins": []
                },
                "views": [
                    {
                        "id": "ExternalComponentView",
                        "viewModelId": "ExternalComponentViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.integration.ExternalComponentView",
                        "markup": "Mapping/modules/Integration/ExternalComponentView.html",
                        "region": "BottomPanelRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ExternalComponentViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.integration.ExternalComponentViewModel",
                        "configuration": {
                            "containerRegionName": "ExternalComponentRegion",
                            "containerRegionType": "geocortex.framework.ui.DivStackRegionAdapter",
                            "headerIsVisible": true,
                            "showXButton": true,
                            "showMaximizeButton": true,
                            "resizeY": true,
                            "selectorIconUri": "Resources/Images/Icons/Toolbar/map-24.png",
                            "selectorText": "@language-integration-selector-text",
                            "statusText": "@language-integration-viewpoint-indicator-desc",
                            "defaultComponents": [],
                            "externalComponents": []
                        }
                    }
                ]
            },
            {
                "moduleName": "IWantToMenu",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuModule",
                "configuration": {
                    "menus": [
                        {
                            "id": "Iwantto",
                            "description": "@language-menu-menus-description",
                            "defaultIconUri": "Resources/Images/Icons/check-24.png",
                            "items": [
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                                    "text": "@language-menu-home-panel",
                                    "description": "@language-menu-home-panel-desc",
                                    "command": "ShowHomePanel"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                                    "text": "@language-menu-identify",
                                    "description": "@language-menu-identify-desc",
                                    "command": "SetActiveTool",
                                    "commandParameter": "IdentifyRectangleTool"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
                                    "text": "@language-menu-map-layers",
                                    "description": "@language-menu-map-layers-desc",
                                    "command": "ShowLayerList"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
                                    "text": "@language-menu-zoom-initial-extent",
                                    "description": "@language-menu-zoom-initial-extent-desc",
                                    "command": "ZoomToInitialExtent"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/bookmark-24.png",
                                    "text": "@language-menu-bookmark-add",
                                    "description": "@language-menu-bookmark-add-desc",
                                    "command": "ShowAddBookmark",
                                    "hideOnDisable": true
                                }
                            ]
                        }
                    ]
                },
                "views": [
                    {
                        "id": "IWantToMenuButtonView",
                        "visible": true,
                        "viewModelId": "IWantToMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuButtonView",
                        "markup": "Mapping/modules/IWantToMenu/IWantToMenuButtonView.html",
                        "region": "NavigationMapRegion",
                        "title": "@language-menu-title",
                        "configuration": {}
                    },
                    {
                        "id": "IWantToMenuView",
                        "viewModelId": "IWantToMenuViewModel",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuView",
                        "markup": "Mapping/modules/IWantToMenu/IWantToMenuView.html",
                        "region": "IWantToMenuRegion",
                        "configuration": {
                            "menuId": "Iwantto"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "IWantToMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuViewModel",
                        "configuration": {
                            "showMenu": true,
                            "menuTitle": "@language-menu-title"
                        }
                    }
                ]
            },
            {
                "moduleName": "LayerList",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerListModule",
                "configuration": {
                    "enableLegendIntegration": true,
                    "autoActivateAncestorVisibilities": false,
                    "enableLayerIcons": false
                },
                "views": [
                    {
                        "id": "LayerListView",
                        "viewModelId": "LayerListViewModel",
                        "title": "@language-layerlist-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerListView",
                        "markup": "Mapping/modules/LayerList/LayerListView.html",
                        "region": "LayerDataContainerRegion",
                        "isManaged": false,
                        "visible": false,
                        "configuration": {}
                    },
                    {
                        "id": "LayerActionsView",
                        "viewModelId": "LayerActionsViewModel",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/Toolbar/layers-menu-24.png",
                        "markup": "Mapping/modules/LayerList/LayerActions/LayerActionsView.html",
                        "title": "@language-layer-actions-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerActionsView",
                        "region": "LayerDataContainerRegion",
                        "configuration": {
                            "menuId": "LayerActions"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "LayerListViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerListViewModel",
                        "configuration": {
                            "showTransparencySlider": true,
                            "autoExpandLegendSwatches": false
                        }
                    },
                    {
                        "id": "LayerActionsViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerActionsViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "LayerThemes",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerThemes.LayerThemesModule",
                "configuration": {},
                "views": [],
                "viewModels": []
            },
            {
                "moduleName": "Legend",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendModule",
                "configuration": {},
                "views": [
                    {
                        "id": "LegendView",
                        "viewModelId": "LegendViewModel",
                        "title": "@language-legend-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendView",
                        "markup": "Mapping/modules/Legend/LegendView.html",
                        "region": "LayerDataContainerRegion",
                        "isManaged": false,
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "LegendViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Map",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapModule",
                "configuration": {
                    "panDuration": 350,
                    "panRate": 50,
                    "zoomDuration": 500,
                    "zoomRate": 50,
                    "longClickMilliseconds": 500,
                    "maxExtentLogSize": 100,
                    "onClick": [
                        "InvokeMapTip",
                        "ClearDefaultHighlights"
                    ],
                    "onLongClick": [],
                    "onFeatureClick": [
                        "ShowMapTip"
                    ],
                    "showLoadingStatus": true,
                    "loadingMessageTiming": [
                        1000,
                        3000,
                        3000
                    ],
                    "defaultPointFeatureZoomScales": [],
                    "tools": [
                        {
                            "name": "CenterMapTool",
                            "command": "PanToPoint",
                            "drawMode": "POINT",
                            "isSticky": true,
                            "statusText": "@language-dsk-map-center"
                        },
                        {
                            "name": "ZoomInTool",
                            "command": "ZoomToExtent",
                            "drawMode": "EXTENT",
                            "isSticky": true,
                            "statusText": "@language-map-zoom-in"
                        },
                        {
                            "name": "ZoomOutTool",
                            "command": "ZoomOutToExtent",
                            "drawMode": "EXTENT",
                            "isSticky": true,
                            "statusText": "@language-map-zoom-out"
                        }
                    ]
                },
                "views": [
                    {
                        "id": "MapView",
                        "viewModelId": "MapViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Map/MapView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapView",
                        "region": "MapRegion",
                        "configuration": {
                            "wrapAround180": false,
                            "extentBroadcastFrequency": 20,
                            "fitTiledMapsToExtent": false,
                            "showAttribution": true
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "MapViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapViewModel",
                        "configuration": {
                            "stepZoomFactor": 0.5
                        }
                    }
                ]
            },
            {
                "moduleName": "MapTips",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipsModule",
                "configuration": {
                    "allowMultiple": false,
                    "contentField": "longDescription",
                    "onClose": [
                        "ClearDefaultHighlights"
                    ],
                    "onCurrentFeatureChange": [
                        "PanToFeatureIfOutsideMapExtent"
                    ],
                    "webMapFeaturePresenter": {
                        "force": false,
                        "featurePropertyName": "currentFeature",
                        "view": {
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/AttributesView.html",
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesView",
                            "libraryId": "Mapping"
                        },
                        "viewModel": {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesViewModel",
                            "libraryId": "Mapping"
                        }
                    }
                },
                "views": [
                    {
                        "id": "MapTipView",
                        "viewModelId": "MapTipViewModel",
                        "markup": "Mapping/modules/MapTips/MapTipView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipView",
                        "region": "NavigationMapRegion",
                        "visible": false,
                        "configuration": {}
                    },
                    {
                        "id": "MapTipHeaderView",
                        "viewModelId": "MapTipViewModel",
                        "markup": "Mapping/modules/MapTips/MapTipHeaderView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipHeaderView",
                        "region": "MapTipHeaderRegion",
                        "visible": true,
                        "configuration": {}
                    },
                    {
                        "id": "MapTipContentView",
                        "viewModelId": "MapTipViewModel",
                        "markup": "Mapping/modules/MapTips/MapTipContent.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipContent",
                        "region": "MapTipContentRegion",
                        "visible": true,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "MapTipViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipContentViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Markup",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupModule",
                "viewModels": [
                    {
                        "id": "MarkupViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupViewModel",
                        "configuration": {
                            "markupLayerName": "Drawings",
                            "defaultPointMarkup": {
                                "pointStyle": "Circle",
                                "pointSize": 16,
                                "pointColor": "#FF4CA0D8"
                            },
                            "defaultLineMarkup": {
                                "lineStyle": "Dash",
                                "lineWidth": 3,
                                "lineColor": "#FF4CA0D8"
                            },
                            "defaultPolygonMarkup": {
                                "polygonBorderStyle": "Solid",
                                "polygonFillStyle": "Solid",
                                "polygonBorderWidth": 3,
                                "polygonFillColor": "#4D4CA0D8",
                                "polygonBorderColor": "#FF4CA0D8"
                            },
                            "defaultTextMarkup": {
                                "textStyle": "Normal",
                                "textStyleWeight": "Normal",
                                "textSize": "12pt",
                                "textColor": "#FF000000",
                                "textFamily": "Arial"
                            },
                            "customMarkupTools": {
                                "point": [],
                                "polyline": [],
                                "polygon": [],
                                "text": []
                            }
                        }
                    },
                    {
                        "id": "StyleSelectorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.styleSelector.StyleSelectorViewModel",
                        "configuration": {
                            "customPointStyles": [],
                            "customLineStyles": [],
                            "customPolygonStyles": [],
                            "customTextStyles": []
                        }
                    },
                    {
                        "id": "TransientMarkupPaletteViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteViewModel",
                        "configuration": {}
                    }
                ],
                "views": [
                    {
                        "id": "MarkupEditView",
                        "viewModelId": "TransientMarkupPaletteViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Markup/ToolPalettes/EditPaletteLarge.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteView",
                        "region": "MarkupEditRegion",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Measurement",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementModule",
                "configuration": {
                    "tools": [
                        {
                            "name": "MeasureDistanceTool",
                            "command": "MeasureDistance",
                            "drawMode": "POLYLINE",
                            "isSticky": true,
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-distance-24.png",
                            "statusText": "@language-measurement-measure-distance-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-distance-tool-status-keyboard"
                        },
                        {
                            "name": "MeasureAreaTool",
                            "command": "MeasureArea",
                            "drawMode": "POLYGON",
                            "isSticky": true,
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-area-24.png",
                            "statusText": "@language-measurement-measure-area-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-area-tool-status-keyboard"
                        },
                        {
                            "name": "DeleteMeasurementTool",
                            "command": "DeleteMeasurement",
                            "drawMode": "POINT",
                            "isSticky": true,
                            "iconUri": "Resources/Images/Icons/Toolbar/Erase-24.png",
                            "statusText": "@language-measurement-erase-status",
                            "keyboardStatusText": "@language-measurement-erase-status-keyboard"
                        }
                    ],
                    "measurementProjectionWkid": "",
                    "measurementLengthUnits": "meter",
                    "measurementAreaUnits": "sqMeter",
                    "coordinateFractionalDigits": 4,
                    "degreeFormat": "dd",
                    "angleDirectionSystem": "polar",
                    "measurementResultTypes": [
                        "LINE",
                        "POLYGON",
                        "POLYLINE",
                        "RECTANGLE",
                        "TRIANGLE"
                    ],
                    "enablePrediction": true,
                    "calculationType": "preserveShape"
                },
                "views": [
                    {
                        "id": "MeasurementView",
                        "viewModelId": "MeasurementViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Measurement/MeasurementView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementView",
                        "region": "MeasurementToolControlRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "MeasurementViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementViewModel",
                        "configuration": {
                            "markupLayerName": "Drawings",
                            "lineColor": "#0000FF",
                            "fillColor": "#6495ED",
                            "textColor": "#000000",
                            "textOffset": "5",
                            "textSize": "12px",
                            "addMarkupToMapByDefault": true
                        }
                    }
                ]
            },
            {
                "moduleName": "Menu",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule",
                "configuration": {
                    "menus": [
                        {
                            "id": "MapDataMenu",
                            "description": "@language-menu-open-offline-tools-menu",
                            "defaultIconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                            "items": [
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/sync-manage-24.png",
                                    "text": "@language-menu-manage-sync-settings",
                                    "description": "@language-menu-manage-sync-settings-desc",
                                    "command": "ActivateView",
                                    "commandParameter": "FeatureLayerListView"
                                },
                                {
                                    "text": "@language-menu-view-edit-log",
                                    "description": "@language-menu-view-edit-log-desc",
                                    "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                                    "command": "ActivateView",
                                    "commandParameter": "EditLogView"
                                },
                                {
                                    "text": "@language-clear-storage",
                                    "description": "@language-menu-clear-offline-data-desc",
                                    "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                                    "command": "ActivateView",
                                    "commandParameter": "ClearDataView"
                                }
                            ]
                        },
                        {
                            "id": "LayerActions",
                            "description": "@language-layer-actions-desc",
                            "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                            "items": [
                                {
                                    "text": "@language-menu-add-a-feature",
                                    "description": "@language-menu-add-a-feature-desc",
                                    "iconUri": "Resources/Images/Icons/add-24.png",
                                    "command": "ShowFeatureTemplatePicker",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom-to-layer",
                                    "description": "@language-menu-zoom-to-layer-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToLayerExtent",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom-to-visible-scale",
                                    "description": "@language-menu-zoom-to-visible-scale-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToLayerVisibleScale",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "View metadata",
                                    "description": "View the layer's metadata",
                                    "iconUri": "Resources/Images/Icons/details-24.png",
                                    "command": "showMetadata",
                                    "commandParameter": "{{context}}",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "Download layer",
                                    "description": "Download the layer",
                                    "iconUri": "Resources/Images/Icons/download-24.png",
                                    "command": "showDownload",
                                    "commandParameter": "{{context}}",
                                    "hideOnDisable": true
                                }
                            ]
                        },
                        {
                            "id": "LayerListActions",
                            "description": "@language-layerlist-actions-desc",
                            "items": [
                                {
                                    "text": "@language-menu-switch-to-legend",
                                    "description": "@language-menu-switch-to-legend-desc",
                                    "iconUri": "Resources/Images/Icons/legend-16.png",
                                    "command": "SwitchToLegendView"
                                }
                            ]
                        },
                        {
                            "id": "LegendActions",
                            "description": "@language-layerlist-actions-desc",
                            "items": [
                                {
                                    "text": "@language-menu-switch-to-layerlist",
                                    "description": "@language-menu-switch-to-layerlist-desc",
                                    "iconUri": "Resources/Images/Icons/layerlist-16.png",
                                    "command": "SwitchToLayerView"
                                }
                            ]
                        },
                        {
                            "id": "FeatureActions",
                            "description": "@language-feature-actions-description",
                            "defaultIconUri": "Resources/Images/Icons/check-24.png",
                            "items": [
                                {
                                    "text": "@language-feature-details-expanded",
                                    "description": "@language-feature-details-expanded-desc",
                                    "iconUri": "Resources/Images/Icons/paging-control-table-24.png",
                                    "batch": [
                                        {
                                            "command": "ShowFeatureDetailsExpanded",
                                            "commandParameter": "{{context}}",
                                            "abortBatchOnFailure": true
                                        },
                                        {
                                            "command": "CloseDataFrame"
                                        }
                                    ],
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-feature-details-compact",
                                    "description": "@language-feature-details-compact-desc",
                                    "iconUri": "Resources/Images/Icons/list-24.png",
                                    "command": "ShowFeatureDetailsCompact",
                                    "commandParameter": "{{context}}",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-feature-layer-edit",
                                    "description": "@language-feature-layer-edit-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "StartEditingFeature",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-native-attach-file",
                                    "description": "@language-native-file-from-browser",
                                    "iconUri": "Resources/Images/Icons/Toolbar/attach-file-photo-24.png",
                                    "command": "AttachFileToFeature",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom",
                                    "description": "@language-menu-zoom-description",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToFeature",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-common-pan",
                                    "description": "@language-common-pan-description",
                                    "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                                    "command": "PanToFeature",
                                    "hideOnDisable": true
                                }
                            ]
                        },
                        {
                            "id": "MapTipActions",
                            "description": "@language-menu-maptip-actions-desc",
                            "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                            "items": [
                                {
                                    "text": "@language-menu-maptip-actions-view-details",
                                    "description": "@language-menu-maptip-actions-view-details-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "batch": [
                                        {
                                            "command": "ShowFeatureDetails"
                                        },
                                        {
                                            "command": "DeactivateView",
                                            "commandParameter": "MapTipView"
                                        }
                                    ],
                                    "hideOnDisable": false
                                },
                                {
                                    "text": "@language-feature-layer-edit",
                                    "description": "@language-feature-layer-edit-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "StartEditingFeature",
                                    "hideOnDisable": false
                                }
                            ]
                        },
                        {
                            "id": "ResultsListActions",
                            "description": "@language-menu-results-list-actions-desc",
                            "items": [
                                {
                                    "text": "@language-results-toggle-table-view",
                                    "description": "@language-results-toggle-table-view-desc",
                                    "libraryId": "Mapping.Infrastructure",
                                    "hideOnDisable": true,
                                    "batch": [
                                        {
                                            "command": "ShowResultsTable",
                                            "commandParameter": "{{context}}",
                                            "abortBatchOnFailure": true
                                        },
                                        {
                                            "command": "CloseDataFrame"
                                        }
                                    ]
                                },
                                {
                                    "text": "@language-menu-show-charting-view",
                                    "description": "@language-menu-show-charting-view-desc",
                                    "hideOnDisable": true,
                                    "command": "ShowChartingView"
                                },
                                {
                                    "text": "@language-menu-export-results-to-csv",
                                    "description": "@language-menu-export-results-to-csv-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "csv",
                                        "fsc": "{{context}}"
                                    }
                                },
                                {
                                    "text": "@language-menu-export-results-to-xlsx",
                                    "description": "@language-menu-export-results-to-xlsx-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "xlsx",
                                        "fsc": "{{context}}"
                                    }
                                },
                                {
                                    "text": "@language-menu-export-results-to-shp",
                                    "description": "@language-menu-export-results-to-shp-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "shp",
                                        "fsc": "{{context}}"
                                    }
                                }
                            ]
                        },
                        {
                            "id": "ResultsTableActions",
                            "description": "@language-menu-results-table-actions-desc",
                            "items": [
                                {
                                    "text": "@language-results-toggle-list-view",
                                    "description": "@language-results-toggle-list-view-desc",
                                    "libraryId": "Mapping.Infrastructure",
                                    "hideOnDisable": true,
                                    "command": "ShowResultsList",
                                    "commandParameter": "{{context}}"
                                },
                                {
                                    "text": "@language-menu-show-charting-view",
                                    "description": "@language-menu-show-charting-view-desc",
                                    "hideOnDisable": true,
                                    "command": "ShowChartingView"
                                },
                                {
                                    "text": "@language-menu-export-results-to-csv",
                                    "description": "@language-menu-export-results-to-csv-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "csv",
                                        "fsc": "{{context}}"
                                    }
                                },
                                {
                                    "text": "@language-menu-export-results-to-xlsx",
                                    "description": "@language-menu-export-results-to-xlsx-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "xlsx",
                                        "fsc": "{{context}}"
                                    }
                                },
                                {
                                    "text": "@language-menu-export-results-to-shp",
                                    "description": "@language-menu-export-results-to-shp-desc",
                                    "hideOnDisable": true,
                                    "command": "ExportResultsTo",
                                    "commandParameter": {
                                        "format": "shp",
                                        "fsc": "{{context}}"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "moduleName": "NativeIntegration",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.NativeIntegrationModule",
                "configuration": {},
                "views": [
                    {
                        "id": "AttachFileView",
                        "viewModelId": "AttachFileViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-native-attach-file",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.AttachFileView",
                        "markup": "Mapping/modules/Native/AttachFileView.html",
                        "region": "FeatureEditingContainerRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "AttachFileViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.AttachFileViewModel",
                        "configuration": {
                            "attachFileViewId": "AttachFileView"
                        }
                    }
                ]
            },
            {
                "moduleName": "Navigation",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.navigation.NavigationModule",
                "configuration": {},
                "views": [
                    {
                        "id": "DataFrameButtonView",
                        "viewModelId": "DataFrameViewContainerViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.DataFrameButtonView",
                        "markup": "Mapping/modules/Shells/Components/DataFrameButtonView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "GeolocateButtonView",
                        "viewModelId": "GeolocateViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateView",
                        "markup": "Mapping/modules/Geolocate/GeolocateButtonView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ZoomInView",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomInView",
                        "markup": "Mapping/modules/ZoomControl/ZoomInView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ZoomOutView",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomOutView",
                        "markup": "Mapping/modules/ZoomControl/ZoomOutView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "BookmarksButtonView",
                        "viewModelId": "BookmarksViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksView",
                        "markup": "Mapping/modules/Bookmarks/BookmarksButtonView.html",
                        "region": "TopLeftMapRegion",
                        "visible": true
                    }
                ],
                "viewModels": []
            },
            {
                "moduleName": "Offline",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.offline.OfflineModule",
                "configuration": {
                    "catalogUri": "{ViewerConfigUri}../../Bundled/catalog.json.js"
                },
                "views": [
                    {
                        "id": "MapDataMenuView",
                        "viewModelId": "OfflineMapDataMenuViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup": "Mapping/infrastructure/menus/MenuView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-feature-offline-tools",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {
                            "menuId": "MapDataMenu"
                        }
                    },
                    {
                        "id": "ConnectionStatusIndicatorView",
                        "viewModelId": "ConnectionStatusIndicatorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.indicator.ConnectionStatusIndicatorView",
                        "markup": "Mapping/modules/Offline/ConnectionStatusIndicator/ConnectionStatusIndicatorView.html",
                        "region": "BottomLeftMapRegion",
                        "visible": false,
                        "configuration": {}
                    },
                    {
                        "id": "ClearDataView",
                        "title": "@language-clear-storage",
                        "viewModelId": "ClearDataViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.ClearDataView",
                        "markup": "Mapping/modules/Offline/ClearDataView/ClearDataView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ConnectionStatusIndicatorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.indicator.ConnectionStatusIndicatorViewModel",
                        "configuration": {
                            "enabled": false
                        }
                    },
                    {
                        "id": "ClearDataViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.ClearDataViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "OfflineMapDataMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "OptimizerIntegration",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.optimizerIntegration.OptimizerIntegrationModule",
                "configuration": {
                    "enabled": false,
                    "userName": "DefaultUser",
                    "dataRelayUri": "http://localhost/Geocortex/Optimizer/Rest/DataRelay/LogData.ashx?f=json"
                }
            },
            {
                "moduleName": "OverviewMap",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.overviewMap.OverviewMapModule",
                "configuration": {},
                "views": [
                    {
                        "id": "OverviewMapView",
                        "viewModelId": "OverviewMapViewModel",
                        "markup": "Mapping/modules/OverviewMap/OverviewMapView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.overviewMap.OverviewMapView",
                        "region": "BottomRightMapRegion",
                        "visible": true,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "OverviewMapViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.overviewMap.OverviewMapViewModel",
                        "configuration": {
                            "isEnabled": true,
                            "openByDefault": false,
                            "extentScaleFactor": 2,
                            "visibleExtentColour": "#00FFFF"
                        }
                    }
                ]
            },
            {
                "moduleName": "Printing",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingModule",
                "configuration": {},
                "views": [
                    {
                        "id": "PrintingView",
                        "viewModelId": "PrintingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingView",
                        "markup": "Mapping/modules/Printing/PrintingView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/Toolbar/print-24.png",
                        "title": "@language-print-map",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "PrintingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Prompt",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.prompt.PromptModule",
                "configuration": {
                    "promptRegion": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "Pushpins",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.pushpins.PushpinsModule",
                "configuration": {
                    "pushpinsEnabled": true,
                    "pushpinMarkerUri": "Resources/Images/Pushpins/map-marker-red-32.png",
                    "pushpinMarkerWidth": 32,
                    "pushpinMarkerHeight": 32,
                    "offsetX": 0,
                    "offsetY": 16,
                    "eventMappings": {
                        "PushpinClickedEvent": [
                            "ShowMapTip",
                            "HighlightFeatureDefault"
                        ],
                        "PushpinMouseLeftButtonDownEvent": [],
                        "PushpinMouseLeftButtonUpEvent": [],
                        "PushpinMouseRightButtonDownEvent": [],
                        "PushpinMouseRightButtonUpEvent": [],
                        "PushpinMouseEnterEvent": [],
                        "PushpinMouseLeaveEvent": []
                    }
                }
            },
            {
                "moduleName": "QueryBuilder",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.QueryBuilderModule",
                "configuration": {},
                "views": [
                    {
                        "id": "SimpleQueryBuilderView",
                        "viewModelId": "SimpleQueryBuilderViewModel",
                        "iconUri": "Resources/Images/Icons/query-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderView",
                        "markup": "Mapping/modules/QueryBuilder/SimpleQueryBuilderView.html",
                        "region": "SimpleQueryBuilderContainerRegion",
                        "visible": false,
                        "title": "@language-querybuilder-simple-title",
                        "configuration": {
                            "wildcard": "%",
                            "dateQueryFormat": "DATE '{0:yyyy-MM-dd}'",
                            "textComparisonQueryFormat": "LOWER({0}) LIKE LOWER({1})",
                            "numberToTextComparisonQueryFormat": "CAST({0} AS VARCHAR(50)) LIKE '{1}'",
                            "doesNotContainQueryFormat": "LOWER({0}) NOT LIKE LOWER({1})",
                            "allowDrawingsAsSpatialFilter": true,
                            "queryProviderSupportsTimeOfDay": false,
                            "mode": "query"
                        }
                    },
                    {
                        "id": "SimpleFilterBuilderView",
                        "viewModelId": "SimpleFilterBuilderViewModel",
                        "iconUri": "Resources/Images/Icons/filter-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderView",
                        "markup": "Mapping/modules/QueryBuilder/SimpleQueryBuilderView.html",
                        "region": "SimpleFilterBuilderContainerRegion",
                        "visible": false,
                        "title": "@language-querybuilder-simple-filter-title",
                        "configuration": {
                            "wildcard": "%",
                            "dateQueryFormat": "DATE '{0:yyyy-MM-dd}'",
                            "textComparisonQueryFormat": "LOWER({0}) LIKE LOWER({1})",
                            "numberToTextComparisonQueryFormat": "CAST({0} AS VARCHAR(50)) LIKE '{1}'",
                            "doesNotContainQueryFormat": "LOWER({0}) NOT LIKE LOWER({1})",
                            "allowDrawingsAsSpatialFilter": true,
                            "queryProviderSupportsTimeOfDay": false,
                            "mode": "filter"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "SimpleQueryBuilderViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "SimpleFilterBuilderViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Results",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsModule",
                "libraryId": "Mapping.Infrastructure",
                "configuration": {
                    "resultMappings": {
                        "Identify": [
                            "AddPushpins",
                            "ShowResultsList",
                            "SetCollectionOfInterest"
                        ],
                        "MapTip": [
                            "ShowMapTipResults"
                        ],
                        "Measurement": [],
                        "Workflow": [
                            "AddPushpins",
                            "ShowResultsList",
                            "SetCollectionOfInterest"
                        ],
                        "Search": [
                            "AddPushpins",
                            "ShowResultsList",
                            "SetCollectionOfInterest"
                        ],
                        "QueryBuilder": [
                            "AddPushpins",
                            "ShowResultsList",
                            "SetCollectionOfInterest"
                        ]
                    },
                    "eventMappings": {
                        "ResultsListFeatureClickedEvent": [
                            "ShowFeatureDetails",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsListFeaturePressedEvent": [
                            "ShowFeatureDetails",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsTableFeatureClickedEvent": [
                            "ShowMapTip",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsTableFeaturePressedEvent": [
                            "ShowMapTip",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ]
                    },
                    "customSearchSuggestions": {
                        "Identify": "",
                        "MapTip": "",
                        "Workflow": "",
                        "Search": "",
                        "QueryBuilder": ""
                    }
                },
                "views": [
                    {
                        "id": "ResultsListView",
                        "viewModelId": "ResultsListViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "iconUri": "Resources/Images/Icons/Toolbar/search-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsListView",
                        "markup": "Mapping/infrastructure/results/ResultsListView.html",
                        "region": "DataFrameResultsContainerRegion",
                        "visible": false,
                        "title": "@language-common-results",
                        "description": "@language-common-query-results",
                        "configuration": {
                            "contentField": "longDescription",
                            "isPaged": true,
                            "pageSize": 50
                        }
                    },
                    {
                        "id": "ResultsTableView",
                        "viewModelId": "ResultsTableViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "iconUri": "Resources/Images/Icons/Toolbar/search-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsTableView",
                        "markup": "Mapping/infrastructure/results/ResultsTableView.html",
                        "region": "ResultsRegion",
                        "visible": false,
                        "configuration": {
                            "isPaged": true,
                            "pageSize": 50
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "ResultsListViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FlatResultsViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "ResultsTableViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.TabbedResultsViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "libraryId": "RightClickMenu",
                "moduleName": "RightClickMenu",
                "moduleType": "geocortex.demos.RightClickMenu",
                "configuration": {
                    "showIcons": true,
                    "menus": [
                        {
                            "id": "rightClickMenu",
                            "description": "Appears when you right click on the map",
                            "defaultIconUri": "Resources/Images/Icons/check-24.png",
                            "items": [
                                {
                                    "iconUri": "{ViewerConfigUri}../../../Resources/Images/Custom/identify-24.png",
                                    "text": "What's Here?",
                                    "command": "Identify",
                                    "commandParameter": "{{context}}"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                                    "text": "Draw a Point",
                                    "command": "AddMarkup",
                                    "commandParameter": "{{context}}"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/center-map-24.png",
                                    "text": "Center the Map Here",
                                    "command": "PanToPoint",
                                    "commandParameter": "{{context}}"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/Toolbar/draw-text-24.png",
                                    "text": "Add Some Text",
                                    "command": "AddTextMarkup",
                                    "commandParameter": "{{context}}"
                                },
                                {
                                    "iconUri": "{ViewerConfigUri}../../../Resources/Images/Custom/drivetimes-24.png",
                                    "text": "Add Community Data",
                                    "command": "RunWorkflowWithArguments",
                                    "commandParameter": {
                                        "workflowId": "AddCommunityData"
                                    }
                                },
                                {
                                    "iconUri": "{ViewerConfigUri}../../../Resources/Images/Custom/road-closure-24.png",
                                    "text": "Create a Road Closure Here",
                                    "command": "RunWorkflowWithArguments",
                                    "commandParameter": {
                                        "workflowId": "RoadClosures",
                                        "Geometry": "{{context}}"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "moduleName": "Scalebar",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarModule",
                "configuration": {},
                "views": [
                    {
                        "id": "ScalebarView",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarView",
                        "markup": "Mapping/modules/Scalebar/ScalebarView.html",
                        "region": "LeftFooterRegion",
                        "configuration": {
                            "scalebarStyle": "ruler",
                            "scalebarUnit": "english",
                            "showBackground": true
                        },
                        "viewModelId": "ScalebarViewModel"
                    }
                ],
                "viewModels": [
                    {
                        "id": "ScalebarViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Search",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchModule",
                "configuration": {
                    "autoLoadSiteGeocoders": true,
                    "searchProviders": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.LayerQuerySearchProvider",
                            "enable": true
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.InstantSearchProvider",
                            "name": "@language-search-instant-provider-name",
                            "description": "@language-search-instant-provider-description",
                            "enable": true,
                            "configuration": {
                                "maxResults": 50,
                                "maxHints": 5,
                                "precedenceToNearbyResults": true,
                                "enableSearchHints": true
                            }
                        }
                    ]
                },
                "views": [],
                "viewModels": [
                    {
                        "id": "SearchViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchViewModel",
                        "configuration": {
                            "enableSearchRefinement": true,
                            "minimumPopulateDelay": 300,
                            "minimumPrefixLength": 3
                        }
                    }
                ]
            },
            {
                "moduleName": "Share",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.share.ShareModule",
                "configuration": {
                    "shareOptions": [
                        {
                            "id": "facebook",
                            "displayName": "Facebook",
                            "url": "https://www.facebook.com/sharer/sharer.php?u={ViewerUrl}",
                            "iconUri": "Resources/Images/Icons/facebook-24.png"
                        },
                        {
                            "id": "twitter",
                            "displayName": "Twitter",
                            "url": "https://twitter.com/intent/tweet?text={ViewerUrl}",
                            "iconUri": "Resources/Images/Icons/twitter-24.png"
                        },
                        {
                            "id": "linkedin",
                            "displayName": "Linkedin",
                            "url": "https://www.linkedin.com/shareArticle?ro=false&mini=true&url={ViewerUrl}",
                            "iconUri": "Resources/Images/Icons/linkedin-24.png"
                        },
                        {
                            "id": "googleplus",
                            "displayName": "Google+",
                            "url": "https://plus.google.com/up/?continue=https://plus.google.com/share?url={ViewerUrl}",
                            "iconUri": "Resources/Images/Icons/google-plus-24.png"
                        },
                        {
                            "id": "email",
                            "displayName": "Email",
                            "url": "mailto:?body={ViewerUrl}",
                            "iconUri": "Resources/Images/Icons/Toolbar/contact-24.png"
                        }
                    ]
                },
                "views": [
                    {
                        "id": "ShareView",
                        "viewModelId": "ShareViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.share.ShareView",
                        "markup": "Mapping/modules/Share/ShareView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/Toolbar/share-24.png",
                        "title": "@language-common-share",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ShareViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.share.ShareViewModel",
                        "configuration": {
                            "shareOptionIds": []
                        }
                    }
                ]
            },
            {
                "moduleName": "SharingLink",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.sharingLink.SharingLinkModule",
                "configuration": {
                    "sharingLinkProviders": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerThemes.LayerThemeSharingLinkProvider"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayersSharingLinkProvider"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.ExtentSharingLinkProvider",
                            "generate": false
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.CenterSharingLinkProvider"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.ScaleSharingLinkProvider"
                        }
                    ]
                }
            },
            {
                "moduleName": "Shells",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.shells.ShellModule",
                "configuration": {
                    "css": [
                        "Resources/Styles/Desktop.css",
                        "{ViewerConfigUri}../../Styles/Custom/Desktop.css"
                    ],
                    "homePanelVisible": false
                },
                "views": [
                    {
                        "id": "ShellView",
                        "viewModelId": "ShellViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.LargeShellView",
                        "markup": "Mapping/modules/Shells/DesktopShellView.html",
                        "region": "ApplicationRegion",
                        "configuration": {}
                    },
                    {
                        "id": "DataFrameViewContainer",
                        "viewModelId": "DataFrameViewContainerViewModel",
                        "visible": false,
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "LeftPanelRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ModalViewContainerView",
                        "viewModelId": "ModalViewContainerViewModel",
                        "visible": false,
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "ModalWindowPlaceholderRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ResultsRegionViewContainerView",
                        "viewModelId": "ResultsRegionViewContainerViewModel",
                        "visible": false,
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "BottomPanelRegion",
                        "configuration": {
                            "resizableParentRegion": "BottomPanelRegion",
                            "resizeY": true
                        }
                    },
                    {
                        "id": "FeatureEditingContainerView",
                        "viewModelId": "FeatureEditingContainerViewModel",
                        "visible": false,
                        "isManaged": true,
                        "title": "@language-common-layer-data",
                        "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "libraryId": "Mapping.Infrastructure",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    },
                    {
                        "id": "LayerDataContainerView",
                        "viewModelId": "LayerDataContainerViewModel",
                        "visible": true,
                        "isManaged": true,
                        "title": "@language-common-layer-data",
                        "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    },
                    {
                        "id": "HomePanelContainerView",
                        "viewModelId": "HomePanelContainerViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-welcome",
                        "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    },
                    {
                        "id": "DataFrameResultsContainerView",
                        "viewModelId": "DataFrameResultsContainerViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-results",
                        "iconUri": "Resources/Images/Icons/search-results-24.png",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    },
                    {
                        "id": "SimpleQueryBuilderContainerView",
                        "viewModelId": "SimpleQueryBuilderViewContainerViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-querybuilder-simple-title",
                        "iconUri": "Resources/Images/Icons/query-24.png",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    },
                    {
                        "id": "SimpleFilterBuilderContainerView",
                        "viewModelId": "SimpleFilterBuilderViewContainerViewModel",
                        "visible": false,
                        "isManaged": true,
                        "title": "@language-querybuilder-simple-filter-title",
                        "iconUri": "Resources/Images/Icons/filter-24.png",
                        "libraryId": "Mapping.Infrastructure",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
                        "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
                        "region": "DataRegion",
                        "configuration": {
                            "resizableParentRegion": "LeftPanelRegion",
                            "resizeX": true
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "ShellViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.LargeShellViewModel",
                        "configuration": {
                            "minWidth": 200,
                            "maxWidth": 500,
                            "dataFrameWidth": 350,
                            "dataFrameOpenByDefault": false,
                            "bottomRegionHeight": 400
                        }
                    },
                    {
                        "id": "DataFrameViewContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "defaultViewIcon": "Resources/Images/Icons/Toolbar/search-results-24.png",
                            "containerRegionName": "DataRegion",
                            "headerIsVisible": false,
                            "showHeaderForStandaloneViews": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": true,
                            "showHostedViews": false,
                            "resizeX": true,
                            "footerInsertMarkup": "Framework.UI/geocortex/framework/ui/ViewContainer/ButtonTabStripView.html",
                            "footerInsertType": "geocortex.framework.ui.ViewContainer.ButtonTabStripView",
                            "ordering": {
                                "DataFrameResultsContainerView": 0
                            }
                        }
                    },
                    {
                        "id": "DataFrameResultsContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "DataFrameResultsContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "ResultsListView": 0
                            }
                        }
                    },
                    {
                        "id": "LayerDataContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "LayerDataContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "LayerListView": 0,
                                "LayerActionsView": 1,
                                "LegendView": 2,
                                "MapDataMenuView": 3,
                                "FeatureLayerListView": 4,
                                "FeatureLayerDetailsView": 5,
                                "EditLogView": 6
                            }
                        }
                    },
                    {
                        "id": "HomePanelContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "HomePanelContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "InfoView": 0
                            }
                        }
                    },
                    {
                        "id": "FeatureEditingContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "FeatureEditingContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": false,
                            "ordering": {
                                "TemplatePickerView": 0,
                                "AttributeEditorView": 1
                            }
                        }
                    },
                    {
                        "id": "ModalViewContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "libraryId": "Framework.UI",
                        "configuration": {
                            "containerRegionName": "ModalWindowRegion",
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": true,
                            "closeOnEscape": true
                        }
                    },
                    {
                        "id": "ResultsRegionViewContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "ResultsRegion",
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": true,
                            "showMaximizeButton": true,
                            "resizeY": true,
                            "ordering": {
                                "ResultsTableView": 0
                            }
                        }
                    },
                    {
                        "id": "SimpleQueryBuilderViewContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "SimpleQueryBuilderContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": true,
                            "showHostedViews": true,
                            "ordering": {}
                        }
                    },
                    {
                        "id": "SimpleFilterBuilderViewContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
                        "libraryId": "Mapping.Infrastructure",
                        "configuration": {
                            "containerRegionName": "SimpleFilterBuilderContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": true,
                            "showHostedViews": true,
                            "ordering": {}
                        }
                    }
                ]
            },
            {
                "moduleName": "Site",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.site.SiteModule",
                "configuration": {
                    "siteUri": "http://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/sites/_planners_map_viewer"
                },
                "views": [
                    {
                        "id": "ServiceLayersFailureView",
                        "viewModelId": "ServiceLayersFailureViewModel",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.ServiceLayersFailureView",
                        "markup": "Mapping/modules/Site/ServiceLayersFailureView.html",
                        "region": "ModalWindowRegion",
                        "configuration": {}
                    },
                    {
                        "id": "SignInErrorView",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.SignInErrorView",
                        "markup": "Mapping/modules/Site/SignInErrorView.html",
                        "region": "ModalWindowRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ServiceLayersFailureViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.ServiceLayersFailureViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Status",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.status.StatusModule",
                "configuration": {
                    "busyIcon": "Resources/Images/loader-small.gif"
                },
                "views": [
                    {
                        "id": "StatusIndicatorView",
                        "viewModelId": null,
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.status.StatusIndicatorView",
                        "markup": "Mapping/modules/Status/StatusIndicatorView.html",
                        "region": "BottomCenterMapRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": []
            },
            {
                "moduleName": "TabbedToolbar",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarModule",
                "configuration": {
                    "isEnabled": true,
                    "transientElements": [
                      {
                          "stateName": "MeasureState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "MeasurementToolControlRegion",
                          "items": [
                            {
                                "id": "MeasureSnappingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                                "toggleStateName": "SnappingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-snapping-enable",
                                    "command": "ActivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-snapping-disable",
                                    "command": "DeactivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-disable"
                                }
                            },
                            {
                                "id": "MeasureSelectSnappingLayersButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                                "command": "ActivateSelectLayersForSnapping",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-snapping-select-layers",
                                "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                            }
                          ]
                      },
                      {
                          "stateName": "MeasureState",
                          "widgetId": "MeasurementToolTransientToolbar",
                          "region": "MeasurementToolControlRegion"
                      },
                      {
                          "stateName": "DrawMarkupState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "MarkupEditRegion",
                          "items": [
                            {
                                "id": "MarkupSnappingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                                "toggleStateName": "SnappingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-snapping-enable",
                                    "command": "ActivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-snapping-disable",
                                    "command": "DeactivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-disable"
                                }
                            },
                            {
                                "id": "MarkupSnappingLayersButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                                "command": "ActivateSelectLayersForSnapping",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-snapping-select-layers",
                                "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                            },
                            {
                                "id": "ChangeMarkupStyle",
                                "type": "button",
                                "name": "@language-toolbar-markup-change-markup-style",
                                "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                                "command": "CreateMarkupStyleView",
                                "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png"
                            }
                          ]
                      },
                      {
                          "stateName": "EditingMarkupState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "EditControlRegion",
                          "items": [
                            {
                                "id": "EditingSnappingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                                "toggleStateName": "SnappingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-snapping-enable",
                                    "command": "ActivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-snapping-disable",
                                    "command": "DeactivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-disable"
                                }
                            },
                            {
                                "id": "EditingSnappingLayersButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                                "command": "ActivateSelectLayersForSnapping",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-snapping-select-layers",
                                "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                            },
                            {
                                "id": "ChangeMarkupStyle",
                                "type": "button",
                                "name": "@language-toolbar-markup-change-markup-style",
                                "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                                "command": "CreateMarkupStyleView",
                                "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png"
                            }
                          ]
                      },
                      {
                          "stateName": "EditingMeasurementMarkupState",
                          "widgetId": "MeasurementToolTransientToolbar",
                          "region": "EditControlRegion"
                      },
                      {
                          "stateName": "IdentifyState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "IdentifyToolControlRegion",
                          "items": [
                            {
                                "id": "IdentifyBufferingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/buffer-identify-24.png",
                                "toggleStateName": "IdentifyBufferingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-buffering-enable",
                                    "command": "ActivateBufferingAndDisplayOptions",
                                    "commandParameter": "Identify",
                                    "tooltip": "@language-toolbar-buffering-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-buffering-disable",
                                    "command": "DeactivateBufferingAndDismissOptions",
                                    "commandParameter": "Identify",
                                    "tooltip": "@language-toolbar-buffering-alt-disable"
                                }
                            },
                            {
                                "id": "ChangeIdentifiableLayers",
                                "type": "button",
                                "name": "@language-toolbar-identify-layers-change",
                                "tooltip": "@language-toolbar-identify-layers-change-tooltip",
                                "command": "ActivateSelectLayersForIdentify",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-filtered-24.png"
                            }
                          ]
                      },
                      {
                          "stateName": "FindDataState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "FindDataControlRegion",
                          "items": [
                            {
                                "id": "FindDataBufferingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/buffer-identify-24.png",
                                "toggleStateName": "FindDataBufferingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-buffering-enable",
                                    "command": "ActivateBufferingAndDisplayOptions",
                                    "commandParameter": "Identify",
                                    "tooltip": "@language-toolbar-buffering-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-buffering-disable",
                                    "command": "DeactivateBufferingAndDismissOptions",
                                    "commandParameter": "Identify",
                                    "tooltip": "@language-toolbar-buffering-alt-disable"
                                }
                            },
                            {
                                "id": "FindDataSnappingToggle",
                                "type": "toggleButton",
                                "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                                "toggleStateName": "SnappingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-snapping-enable",
                                    "command": "ActivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-snapping-disable",
                                    "command": "DeactivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-disable"
                                }
                            },
                            {
                                "id": "FindDataSnappingLayersButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                                "command": "ActivateSelectLayersForSnapping",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-snapping-select-layers",
                                "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                            },
                            {
                                "id": "ChangeIdentifiableLayers",
                                "type": "button",
                                "name": "@language-toolbar-identify-layers-change",
                                "tooltip": "@language-toolbar-identify-layers-change-tooltip",
                                "command": "ActivateSelectLayersForIdentify",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-filtered-24.png"
                            }
                          ]
                      },
                      {
                          "stateName": "FeaturePlacementPointGraphicState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "CreateNewFeatureControlRegion",
                          "items": [
                            {
                                "id": "CreateFeatureWithGeolocation",
                                "type": "button",
                                "name": "@language-toolbar-editing-create-new-feature-geolocation",
                                "tooltip": "@language-toolbar-editing-create-new-feature-geolocation-tooltip",
                                "command": "Geolocate",
                                "commandParameter": {
                                    "toolFriendly": true
                                },
                                "iconUri": "Resources/Images/Icons/Toolbar/geolocate.png"
                            }
                          ]
                      },
                      {
                          "stateName": "FeaturePlacementGraphicState",
                          "widgetId": "TabbedToolbarTransientBase",
                          "region": "CreateNewFeatureControlRegion",
                          "items": [
                            {
                                "id": "FeatureEditingSnappingToggle",
                                "type": "toggleButton",
                                "tooltip": "@language-toolbar-identify-snapping-tooltip",
                                "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                                "toggleStateName": "SnappingState",
                                "toggleOn": {
                                    "name": "@language-toolbar-snapping-enable",
                                    "command": "ActivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-enable"
                                },
                                "toggleOff": {
                                    "name": "@language-toolbar-snapping-disable",
                                    "command": "DeactivateSnapping",
                                    "tooltip": "@language-toolbar-snapping-alt-disable"
                                }
                            },
                            {
                                "id": "FeatureEditingSnappingLayersButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                                "command": "ActivateSelectLayersForSnapping",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-snapping-select-layers",
                                "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                            }
                          ]
                      }
                    ],
                    "toolbarGroups": [
                      {
                          "id": "MainTab",
                          "type": "flyout",
                          "name": "Find",
                          "items": [
                            {
                                "id": "HomeButton",
                                "type": "button",
                                "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                                "command": "ActivateHomePanel",
                                "commandParameter": null,
                                "hideOnDisable": false,
                                "name": "@language-toolbar-home-sub",
                                "tooltip": "@language-toolbar-navigation-home-tooltip"
                            },
                            {
                                "id": "NavigationGroup",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-navigation",
                                "items": [
                                  {
                                      "id": "ZoomInTool",
                                      "type": "tool",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-in-24.png",
                                      "command": "ZoomToExtent",
                                      "drawMode": "EXTENT",
                                      "name": "@language-toolbar-navigation-zoom-in",
                                      "tooltip": "@language-toolbar-navigation-zoom-in-tooltip",
                                      "hideOnDisable": false,
                                      "isSticky": false,
                                      "statusText": "@language-toolbar-navigation-zoom-in-desc"
                                  },
                                  {
                                      "id": "ZoomOutTool",
                                      "type": "tool",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-out-24.png",
                                      "command": "ZoomOutToExtent",
                                      "drawMode": "EXTENT",
                                      "name": "@language-toolbar-navigation-zoom-out",
                                      "tooltip": "@language-toolbar-navigation-zoom-out-tooltip",
                                      "hideOnDisable": false,
                                      "isSticky": false,
                                      "statusText": "@language-toolbar-navigation-zoom-out-desc"
                                  },
                                  {
                                      "id": "InitialExtentButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
                                      "command": "ZoomToInitialExtent",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-navigation-initial-extent",
                                      "tooltip": "@language-toolbar-navigation-initial-extent-tooltip"
                                  },
                                  {
                                      "id": "FullExtentButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-full-24.png",
                                      "command": "ZoomToFullExtent",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-navigation-full-extent",
                                      "tooltip": "@language-toolbar-navigation-full-extent-tooltip"
                                  },
                                  {
                                      "id": "PreviousExtentButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-previous-32.png",
                                      "command": "ZoomToPreviousExtent",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-navigation-previous-extent",
                                      "tooltip": "@language-toolbar-navigation-previous-extent-tooltip"
                                  },
                                  {
                                      "id": "NextExtentButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/zoom-next-32.png",
                                      "command": "ZoomToNextExtent",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-navigation-next-extent",
                                      "tooltip": "@language-toolbar-navigation-next-extent-tooltip"
                                  },
                                  {
                                      "id": "BookmarksButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/bookmark-24.png",
                                      "command": "ShowBookmarks",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-bookmark",
                                      "tooltip": "@language-toolbar-bookmark-open"
                                  }
                                ],
                                "layout": "Small"
                            },
                            {
                                "id": "FindDataGroup-Home",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-find-data",
                                "items": [
                                  {
                                      "id": "PointIdentifyTool-Navigation",
                                      "type": "tool",
                                      "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                                      "command": "Identify",
                                      "drawMode": "RECTANGLE",
                                      "name": "@language-toolbar-tasks-identify",
                                      "tooltip": "@language-toolbar-identify-point-tooltip",
                                      "hideOnDisable": false,
                                      "isSticky": false,
                                      "statusText": "@language-toolbar-identify-point-desc"
                                  },
                                  {
                                      "id": "IdentifyToolControlRegion",
                                      "type": "region",
                                      "regionName": "IdentifyToolControlRegion"
                                  }
                                ],
                                "layout": "Large"
                            }
                          ]
                      },
                      {
                          "id": "MapTab",
                          "type": "toolbarGroup",
                          "name": "Layers",
                          "items": [
                            {
                                "id": "LayersGroup",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-layers",
                                "items": [
                                  {
                                      "id": "ShowLayerListButton",
                                      "type": "button",
                                      "iconUri": "Resources\\Images\\Icons\\Toolbar\\layers-24.png",
                                      "command": "ShowLayerList",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-show-layerlist",
                                      "tooltip": "@language-toolbar-show-layerlist-desc"
                                  },
                                  {
                                      "id": "ShowSimpleFilterBuilderButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/filter-24.png",
                                      "command": "ActivateView",
                                      "commandParameter": "SimpleFilterBuilderView",
                                      "hideOnDisable": false,
                                      "name": "@language-querybuilder-simple-filter-title",
                                      "tooltip": "@language-querybuilder-simple-filter-tooltip"
                                  },
                                  {
                                      "id": "ShowSimpleQueryBuilderButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/query-24.png",
                                      "command": "ActivateView",
                                      "commandParameter": "SimpleQueryBuilderView",
                                      "hideOnDisable": false,
                                      "name": "@language-querybuilder-simple-title",
                                      "tooltip": "@language-querybuilder-simple-tooltip"
                                  }
                                ],
                                "layout": "Large"
                            },
                            {
                                "id": "ExternalMapsGroup",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-3rd-party-maps",
                                "items": [
                                  {
                                      "id": "ShowExternalComponentViewButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/map-3rd-party-24.png",
                                      "command": "ShowExternalComponentView",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-3rd-party-maps-show-maps",
                                      "tooltip": "@language-toolbar-3rd-party-maps-show-maps-tooltip"
                                  }
                                ],
                                "layout": "Large"
                            }
                          ]
                      },
                      {
                          "id": "ToolsTab",
                          "type": "toolbarGroup",
                          "name": "Create & Share",
                          "items": [
                            {
                                "id": "TasksGroup",
                                "type": "toolbarGroup",
                                "name": "Print & Share",
                                "items": [
                                  {
                                      "id": "PrintMapButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/print-24.png",
                                      "command": "PrintMap",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-tasks-print-map",
                                      "tooltip": "@language-toolbar-tasks-print-map-tooltip"
                                  },
                                  {
                                      "id": "ExportMapButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png",
                                      "command": "ShowExportMapDialog",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-tasks-export-map",
                                      "tooltip": "@language-toolbar-tasks-export-map-tooltip"
                                  },
                                  {
                                      "id": "ShareButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/share-24.png",
                                      "command": "ShowShareView",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-tasks-share",
                                      "tooltip": "@language-toolbar-tasks-share-tooltip"
                                  }
                                ],
                                "layout": "Small"
                            },
                            {
                                "id": "DrawingGroup",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-draw",
                                "items": [
                                  {
                                      "id": "DrawingTools",
                                      "type": "flyout",
                                      "name": "@language-toolbar-markup-drawing-tools",
                                      "items": [
                                        {
                                            "id": "PointMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "POINT",
                                            "name": "@language-toolbar-markup-point",
                                            "tooltip": "@language-toolbar-markup-point-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-point-desc"
                                        },
                                        {
                                            "id": "TextMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-text-24.png",
                                            "command": "AddTextMarkup",
                                            "drawMode": "POINT",
                                            "name": "@language-toolbar-markup-text",
                                            "tooltip": "@language-toolbar-markup-text-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-text-desc"
                                        },
                                        {
                                            "id": "PolylineMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-polyline-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "POLYLINE",
                                            "name": "@language-toolbar-markup-polyline",
                                            "tooltip": "@language-toolbar-markup-polyline-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-polyline-desc"
                                        },
                                        {
                                            "id": "FreehandMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-freehand-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "FREEHAND_POLYLINE",
                                            "name": "@language-toolbar-markup-freehand",
                                            "tooltip": "@language-toolbar-markup-freehand-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-freehand-desc"
                                        },
                                        {
                                            "id": "FreehandMarkupPolygonTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "FREEHAND_POLYGON",
                                            "name": "@language-toolbar-markup-freehand-polygon",
                                            "tooltip": "@language-toolbar-markup-freehand-polygon-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-freehand-polygon-desc"
                                        },
                                        {
                                            "id": "EllipseMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-ellipse-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "ELLIPSE",
                                            "name": "@language-toolbar-markup-ellipse",
                                            "tooltip": "@language-toolbar-markup-ellipse-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-ellipse-desc"
                                        },
                                        {
                                            "id": "CircleMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-circle-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "CIRCLE",
                                            "name": "@language-toolbar-markup-circle",
                                            "tooltip": "@language-toolbar-markup-circle-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-circle-desc"
                                        },
                                        {
                                            "id": "PolygonMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "POLYGON",
                                            "name": "@language-toolbar-markup-polygon",
                                            "tooltip": "@language-toolbar-markup-polygon-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-polygon-desc"
                                        },
                                        {
                                            "id": "RectangleMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-rectangle-24.png",
                                            "command": "AddMarkup",
                                            "drawMode": "RECTANGLE",
                                            "name": "@language-toolbar-markup-rectangle",
                                            "tooltip": "@language-toolbar-markup-rectangle-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-rectangle-desc"
                                        }
                                      ],
                                      "layout": "Large"
                                  },
                                  {
                                      "id": "MarkupEditRegion",
                                      "type": "region",
                                      "regionName": "MarkupEditRegion"
                                  },
                                  {
                                      "id": "EditFlyout",
                                      "type": "flyout",
                                      "name": "@language-toolbar-markup-edit",
                                      "items": [
                                        {
                                            "id": "EditMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/draw-edit-24.png",
                                            "command": "EditMarkup",
                                            "drawMode": "POINT",
                                            "name": "@language-toolbar-markup-edit",
                                            "tooltip": "@language-toolbar-markup-edit-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-edit-desc"
                                        },
                                        {
                                            "id": "EraseMarkupTool",
                                            "type": "tool",
                                            "iconUri": "Resources/Images/Icons/Toolbar/erase-24.png",
                                            "command": "DeleteMarkup",
                                            "drawMode": "POINT",
                                            "name": "@language-toolbar-markup-delete",
                                            "tooltip": "@language-toolbar-markup-delete-tooltip",
                                            "hideOnDisable": false,
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-markup-delete-desc"
                                        },
                                        {
                                            "id": "ClearAllTool",
                                            "type": "button",
                                            "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png",
                                            "command": "ClearMarkup",
                                            "commandParameter": null,
                                            "hideOnDisable": false,
                                            "name": "@language-toolbar-markup-clear",
                                            "tooltip": "@language-toolbar-markup-clear-tooltip"
                                        }
                                      ],
                                      "layout": "Large"
                                  },
                                  {
                                      "id": "EditControlRegion",
                                      "type": "region",
                                      "regionName": "EditControlRegion"
                                  }
                                ],
                                "layout": "Large"
                            }
                          ]
                      },
                      {
                          "id": "cuN7A3pv",
                          "type": "toolbarGroup",
                          "name": "Tools",
                          "items": [
                            {
                                "id": "MeasurementTools",
                                "type": "flyout",
                                "name": "@language-toolbar-group-measurement-tools",
                                "items": [
                                  {
                                      "id": "MeasureDistanceTool",
                                      "type": "tool",
                                      "iconUri": "Resources/Images/Icons/Toolbar/measure-distance-24.png",
                                      "command": "MeasureDistance",
                                      "drawMode": "POLYLINE",
                                      "name": "@language-measurement-measure-distance-tool-name",
                                      "tooltip": "@language-measurement-measure-distance-tool-tooltip",
                                      "hideOnDisable": false,
                                      "isSticky": true,
                                      "statusText": "@language-measurement-measure-distance-tool-status"
                                  },
                                  {
                                      "id": "MeasureAreaTool",
                                      "type": "tool",
                                      "iconUri": "Resources/Images/Icons/Toolbar/measure-area-24.png",
                                      "command": "MeasureArea",
                                      "drawMode": "POLYGON",
                                      "name": "@language-measurement-measure-area-tool-name",
                                      "tooltip": "@language-measurement-measure-area-tool-tooltip",
                                      "hideOnDisable": false,
                                      "isSticky": true,
                                      "statusText": "@language-measurement-measure-area-tool-status"
                                  }
                                ],
                                "layout": "Large"
                            },
                            {
                                "id": "MeasurementToolControlRegion",
                                "type": "region",
                                "regionName": "MeasurementToolControlRegion"
                            },
                            {
                                "id": "AnalysisGroup",
                                "type": "toolbarGroup",
                                "name": "@language-toolbar-group-analysis",
                                "items": [
                                  {
                                      "id": "ShowChartingViewButton",
                                      "type": "button",
                                      "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
                                      "command": "ShowChartingView",
                                      "commandParameter": null,
                                      "hideOnDisable": false,
                                      "name": "@language-toolbar-charting-show-charts",
                                      "tooltip": "@language-toolbar-charting-show-charts-tooltip"
                                  }
                                ],
                                "layout": "Large"
                            }
                          ]
                      },
                      {
                          "id": "ru5HEVZv",
                          "type": "toolbarGroup",
                          "name": "Reports",
                          "items": []
                      }
                    ]
                },
                "viewModels": [
                  {
                      "id": "TabbedToolbarViewModel",
                      "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarViewModel",
                      "configuration": {
                          "toolbarGroupRefs": [
                            "MainTab",
                            "MapTab",
                            "ToolsTab",
                            "cuN7A3pv",
                            "ru5HEVZv"
                          ],
                          "toolbarOpenByDefault": true
                      }
                  },
                  {
                      "id": "TabbedToolbarTransientViewModel",
                      "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.transients.TransientViewModel",
                      "configuration": {}
                  }
                ],
                "views": [
                  {
                      "id": "TabbedToolbarView",
                      "viewModelId": "TabbedToolbarViewModel",
                      "visible": false,
                      "title": "@language-toolbar-name",
                      "region": "ToolbarRegion",
                      "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarView",
                      "markup": "Mapping/modules/Toolbar/LargeToolbarView.html",
                      "configuration": {}
                  },
                  {
                      "id": "TabbedToolbarButtonView",
                      "viewModelId": "TabbedToolbarViewModel",
                      "visible": true,
                      "region": "TopRightMapRegion",
                      "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarButtonView",
                      "markup": "Mapping/modules/Toolbar/ToolbarButtonView.html"
                  },
                  {
                      "id": "ToolbarFlyoutView",
                      "viewModelId": "TabbedToolbarViewModel",
                      "visible": true,
                      "title": "@language-toolbar-multi-tool",
                      "region": "ToolbarFlyoutDropdown",
                      "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarFlyoutView",
                      "markup": "Mapping/modules/Toolbar/Templates/ToolbarFlyoutDropdownTemplate.html",
                      "configuration": {}
                  }
                ]
            }, {
                "moduleName" : "CompactToolbar",
                "moduleType" : "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarModule",
                "configuration" : {
                    "isEnabled" : true,
                    "transientElements" : [{
                        "tools" : ["MeasureDistanceTool", "MeasureAreaTool"],
                        "widgetId" : "MeasurementToolTransientToolbar",
                        "worksWith" : ["DeleteMeasurementTool"],
                        "region" : "CompactToolbarTransientRegion"
                    }, {
                        "tools" : ["PointMarkupTool", "FreehandMarkupTool", "PolylineMarkupTool", "PolygonMarkupTool", "RectangleMarkupTool", "CircleMarkupTool", "EllipseMarkupTool", "TextMarkupTool"],
                        "widgetId" : "DrawingToolTransientToolbar",
                        "worksWith" : ["EditMarkupTool", "DeleteMarkupTool"],
                        "region" : "CompactToolbarTransientRegion"
                    }
                    ],
                    "toolbarGroups" : [{
                        "id" : "compactToolbar",
                        "type" : "toolbarGroup",
                        "name" : "Compact Toolbar",
                        "items" : [{
                            "id" : "HomeButton",
                            "type" : "button",
                            "iconUri" : "Resources/Images/Icons/Toolbar/home-24.png",
                            "command" : "ActivateHomePanel",
                            "commandParameter" : null,
                            "hideOnDisable" : false,
                            "name" : "@language-toolbar-home-sub",
                            "tooltip" : "@language-toolbar-navigation-home-tooltip"
                        }, {
                            "id" : "InitialExtentButton",
                            "type" : "button",
                            "iconUri" : "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
                            "command" : "ZoomToInitialExtent",
                            "commandParameter" : null,
                            "hideOnDisable" : false,
                            "name" : "@language-toolbar-navigation-initial-extent",
                            "tooltip" : "@language-toolbar-navigation-initial-extent-tooltip"
                        }, {
                            "id" : "PointIdentifyTool-Navigation",
                            "type" : "tool",
                            "iconUri" : "Resources/Images/Icons/Toolbar/identify-24.png",
                            "command" : "Identify",
                            "drawMode" : "RECTANGLE",
                            "name" : "@language-toolbar-tasks-identify",
                            "tooltip" : "@language-toolbar-identify-point-tooltip",
                            "hideOnDisable" : false,
                            "isSticky" : false,
                            "statusText" : "@language-toolbar-identify-point-desc"
                        }, {
                            "id" : "PrintMapButton",
                            "type" : "button",
                            "iconUri" : "Resources/Images/Icons/Toolbar/print-24.png",
                            "command" : "PrintMap",
                            "commandParameter" : null,
                            "hideOnDisable" : false,
                            "name" : "@language-toolbar-tasks-print-map",
                            "tooltip" : "@language-toolbar-tasks-print-map-tooltip"
                        }, {
                            "id" : "ExportMapButton",
                            "type" : "button",
                            "iconUri" : "Resources/Images/Icons/Toolbar/share-map-24.png",
                            "command" : "ShowExportMapDialog",
                            "commandParameter" : null,
                            "hideOnDisable" : false,
                            "name" : "@language-toolbar-tasks-export-map",
                            "tooltip" : "@language-toolbar-tasks-export-map-tooltip"
                        }
                        ]
                    }
                    ]
                },
                "viewModels" : [{
                    "id" : "CompactToolbarViewModel",
                    "type" : "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarViewModel",
                    "configuration" : {
                        "toolbarVisibleTools" : 4,
                        "toolbarOpenByDefault" : false,
                        "toolbarGroupRefs" : ["compactToolbar"]
                    }
                }
                ],
                "views" : [{
                    "id" : "CompactToolbarView",
                    "viewModelId" : "CompactToolbarViewModel",
                    "visible" : true,
                    "title" : "@language-compact-toolbar-name",
                    "region" : "TopRightMapRegion",
                    "type" : "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarView",
                    "markup" : "Mapping/modules/Toolbar/CompactToolbar/CompactToolbarView.html",
                    "configuration" : {}

                }, {
                    "id" : "CompactToolbarFlyoutView",
                    "viewModelId" : "CompactToolbarViewModel",
                    "visible" : true,
                    "title" : "@language-toolbar-multi-tool",
                    "region" : "CompactToolbarFlyoutDropdown",
                    "type" : "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarFlyoutView",
                    "markup" : "Mapping/modules/Toolbar/Templates/ToolbarFlyoutDropdownTemplate.html",
                    "configuration" : {}

                }
                ]
            }, {
                "moduleName" : "Tools",
                "moduleType" : "geocortex.essentialsHtmlViewer.mapping.modules.tools.ToolsModule",
                "configuration" : {
                    "showStatusMessages" : true,
                    "tools" : [{
                        "name" : "EditMarkupTool",
                        "command" : "EditMarkup",
                        "drawMode" : "POINT",
                        "isSticky" : true,
                        "iconUri" : "Resources/Images/Icons/edit-markup-24.png",
                        "statusText" : "@language-toolbar-markup-edit-desc",
                        "keyboardStatusText" : "@language-toolbar-markup-edit-desc-keyboard"
                    }, {
                        "name" : "DeleteMarkupTool",
                        "command" : "DeleteMarkup",
                        "drawMode" : "POINT",
                        "isSticky" : true,
                        "iconUri" : "Resources/Images/Icons/Toolbar/Erase-24.png",
                        "statusText" : "@language-toolbar-markup-delete-desc",
                        "keyboardStatusText" : "@language-toolbar-markup-delete-desc-keyboard"
                    }
                    ]
                }
            },
            {
                "moduleName": "User",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.User.UserModule",
                "configuration": {},
                "views": [],
                "viewModels": [
                    {
                        "id": "SignInViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.User.SignInViewModel",
                        "configuration": {
                            "linkColor": "#1B7DBF"
                        }
                    },
                    {
                        "id": "UserInfoViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.User.UserInfoViewModel",
                        "configuration": {
                            "linkColor": "#1B7DBF",
                            "textColor": "#333333",
                            "backgroundColor": "#FFFFFF"
                        }
                    }
                ]
            },
            {
                "moduleName": "Workflow",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowModule",
                "configuration": {
                    "showTitleInFormBody": false,
                    "defaultContainerRegionName": "DataRegion",
                    "defaultContainerTitle": "@language-workflow-title",
                    "defaultContainerIconUri": "Resources/Images/Icons/Toolbar/workflow-24.png",
                    "showCaptureStatusMessages": true,
                    "displayResultPickerTemplateComplexity": "complex",
                    "startupWorkflows": [],
                    "formItems": {},
                    "icons": {
                        "Resources/Images/ParcelByID.png": "Resources/Images/Icons/Toolbar/house-number-24.png",
                        "Resources/Images/ParcelByOwner.png": "Resources/Images/Icons/Toolbar/house-owner-24.png",
                        "Resources/Images/ParcelByValue.png": "Resources/Images/Icons/Toolbar/house-value-24.png",
                        "Resources/Images/SearchSchools.png": "Resources/Images/Icons/Toolbar/school-24.png"
                    },
                    "containers": [
                        {
                            "name": "Default",
                            "title": "@language-workflow-title",
                            "regionName": "DataRegion"
                        },
                        {
                            "name": "DefaultNoCloseButton",
                            "title": "@language-workflow-title",
                            "regionName": "DataRegion",
                            "allowClose": false
                        },
                        {
                            "name": "Extract",
                            "title": "@language-common-extract-data",
                            "regionName": "DataRegion",
                            "iconUri": "Resources/Images/Icons/Toolbar/layers-extract-24.png"
                        },
                        {
                            "name": "ModalWindow",
                            "title": "@language-workflow-title",
                            "regionName": "ModalWindowRegion"
                        },
                        {
                            "name": "ModalWindowNoCloseButton",
                            "title": "@language-workflow-title",
                            "regionName": "ModalWindowRegion",
                            "allowClose": false
                        }
                    ]
                },
                "views": [
                    {
                        "id": "WorkflowListView",
                        "viewModelId": "WorkflowViewModel",
                        "title": "@language-workflow-workflows",
                        "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                        "description": "@language-workflow-site-workflows",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowListView",
                        "markup": "Mapping/modules/Workflow/WorkflowListView.html",
                        "region": "DataRegion",
                        "showBackButtonAsX": true,
                        "visible": false,
                        "configuration": {
                            "hideOnClickWorkflow": false
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "WorkflowViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "ZoomControl",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomControlModule",
                "configuration": {},
                "views": [],
                "viewModels": []
            }
        ],
        "widgets": [
            {
                "id": "AutoCompleteBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.AutoCompleteBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/AutoCompleteBoxFormItemView.html"
            },
            {
                "id": "CheckBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.CheckBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/CheckBoxFormItemView.html"
            },
            {
                "id": "ComboBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ListBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ComboBoxFormItemView.html"
            },
            {
                "id": "ContainerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ContainerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ContainerFormItemView.html",
                "configuration": {
                    "allowHorizontal": true
                }
            },
            {
                "id": "DatePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.DatePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/DatePickerFormItemView.html"
            },
            {
                "id": "FilePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FilePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/FilePickerFormItemView.html"
            },
            {
                "id": "GroupBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.GroupBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/GroupBoxFormItemView.html",
                "configuration": {
                    "allowHorizontal": true
                }
            },
            {
                "id": "HyperlinkFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.HyperlinkFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/HyperlinkFormItemView.html"
            },
            {
                "id": "ImageFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FormItemViewBase",
                "markup": "Mapping/modules/Workflow/Forms/Items/ImageFormItemView.html"
            },
            {
                "id": "LabelFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FormItemViewBase",
                "markup": "Mapping/modules/Workflow/Forms/Items/LabelFormItem.html"
            },
            {
                "id": "ListBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ListBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ListBoxFormItemView.html"
            },
            {
                "id": "MarkdownFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.MarkdownFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/MarkdownFormItemView.html"
            },
            {
                "id": "RadioButtonFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.RadioButtonFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/RadioButtonFormItemView.html"
            },
            {
                "id": "TextAreaFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TextEntryFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TextAreaFormItemView.html"
            },
            {
                "id": "TextBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TextEntryFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TextBoxFormItemView.html"
            },
            {
                "id": "TimePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TimePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TimePickerFormItemView.html"
            },
            {
                "id": "MeasurementToolTransientToolbar",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementView",
                "markup": "Mapping/modules/Measurement/MeasurementView.html",
                "viewModelId": "MeasurementViewModel"
            },
            {
                "id": "DrawingToolTransientToolbar",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteView",
                "markup": "Mapping/modules/Markup/ToolPalettes/EditPaletteLarge.html",
                "viewModelId": "TransientMarkupPaletteViewModel"
            },
            {
                "id": "BasemapsListController",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSwitcherViewControllerView",
                "markup": "Mapping/modules/Basemap/BasemapSwitcherViewControllerView.html",
                "configuration": {
                    "grid": {
                        "numberOfRows": 1,
                        "numberOfColumns": 4
                    }
                }
            }
        ]
    }
}