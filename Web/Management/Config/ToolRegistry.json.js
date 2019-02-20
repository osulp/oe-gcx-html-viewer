geocortex.essentialsHtmlViewer.management.modules.toolbar.tools = [
        {
            "id": "FileGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-global-tasks",
            "items": [
               {
                   "id": "OpenButton",
                   "type": "button",
                   "iconUri": "Resources/Images/Icons/open-24.png",
                   "command": "ShowProjects",
                   "hideOnDisable": false,
                   "name": "@language-toolbar-menu-global-open",
                   "tooltip": "@language-toolbar-menu-global-open-desc"
               },
               {
                   "id": "SaveButton",
                   "type": "button",
                   "iconUri": "Resources/Images/Icons/save-24.png",
                   "command": "SaveProject",
                   "hideOnDisable": false,
                   "name": "@language-toolbar-menu-global-save",
                   "tooltip": "@language-toolbar-menu-global-save-desc"
               },
               {
                   "id": "SaveAsButton",
                   "type": "button",
                   "iconUri": "Resources/Images/Icons/save-as-24.png",
                   "command": "SaveAsProject",
                   "commandParameter": null,
                   "hideOnDisable": false,
                   "name": "@language-toolbar-menu-global-save-as",
                   "tooltip": "@language-toolbar-menu-global-save-as-desc"
               }
            ]
        },
        {
            "id": "HomeGroup",
            "name": "@language-toolbar-group-home",
            "type": "toolbarGroup",
            "items": [
                {
                    "id": "HomeButton",
                    "type": "button",
                    "name": "@language-toolbar-home-sub",
                    "tooltip": "@language-toolbar-home-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                    "command": "ActivateHomePanel"
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
                    "id": "IdentifyToolControlRegion",
                    "type": "region",
                    "regionName": "IdentifyToolControlRegion"
                }
            ]
        },
        {
            "id": "NavigationGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-navigation",
            "items": [
                {
                    "id": "PanButton",
                    "type": "button",
                    "name": "@language-toolbar-navigation-pan",
                    "tooltip": "@language-toolbar-navigation-pan-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                    "command": "ClearActiveTool"
                },
                {
                    "id": "ZoomInTool",
                    "type": "tool",
                    "name": "@language-toolbar-navigation-zoom-in",
                    "tooltip": "@language-toolbar-navigation-zoom-in-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-in-24.png",
                    "drawMode": "EXTENT",
                    "isSticky": false,
                    "command": "ZoomToExtent",
                    "statusText": "@language-toolbar-navigation-zoom-in-desc"
                },
                {
                    "id": "ZoomOutTool",
                    "type": "tool",
                    "name": "@language-toolbar-navigation-zoom-out",
                    "tooltip": "@language-toolbar-navigation-zoom-out-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-out-24.png",
                    "drawMode": "EXTENT",
                    "isSticky": false,
                    "command": "ZoomOutToExtent",
                    "statusText": "@language-toolbar-navigation-zoom-out-desc"
                },
                {
                    "id": "InitialExtentButton",
                    "type": "button",
                    "name": "@language-toolbar-navigation-initial-extent",
                    "tooltip": "@language-toolbar-navigation-initial-extent-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
                    "command": "ZoomToInitialExtent",
                    "commandParameter": null,
                    "hideOnDisable": false
                },
                {
                    "id": "FullExtentButton",
                    "type": "button",
                    "name": "@language-toolbar-navigation-full-extent",
                    "tooltip": "@language-toolbar-navigation-full-extent-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-full-24.png",
                    "command": "ZoomToFullExtent"
                },
                {
                    "id": "PreviousExtentButton",
                    "type": "button",
                    "name": "@language-toolbar-navigation-previous-extent",
                    "tooltip": "@language-toolbar-navigation-previous-extent-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-previous-32.png",
                    "command": "ZoomToPreviousExtent"
                },
                {
                    "id": "NextExtentButton",
                    "type": "button",
                    "name": "@language-toolbar-navigation-next-extent",
                    "tooltip": "@language-toolbar-navigation-next-extent-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/zoom-next-32.png",
                    "command": "ZoomToNextExtent"
                },
                {
                    "id": "BookmarksButton",
                    "type": "button",
                    "name": "@language-toolbar-bookmark",
                    "tooltip": "@language-toolbar-bookmark-open",
                    "iconUri": "Resources/Images/Icons/bookmark-24.png",
                    "command": "ShowBookmarks"
                }
            ]
        },
        {
            "id": "TaskGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-tasks",
            "items": [
                {
                    "id": "PrintMapButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-print-map",
                    "tooltip": "@language-toolbar-tasks-print-map-tooltip",
                    "command": "PrintMap",
                    "iconUri": "Resources/Images/Icons/Toolbar/print-24.png"
                },
                {
                    "id": "ExportMapButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-export-map",
                    "tooltip": "@language-toolbar-tasks-export-map-tooltip",
                    "command": "ShowExportMapDialog",
                    "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png"
                },
                {
                    "id": "ShareButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-share",
                    "tooltip": "@language-toolbar-tasks-share-tooltip",
                    "command": "ShowShareView",
                    "iconUri": "Resources/Images/Icons/Toolbar/share-24.png"
                },
                {
                    "id": "UploadDataButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-upload-data",
                    "tooltip": "@language-toolbar-tasks-upload-data-tooltip",
                    "command": "UploadData",
                    "iconUri": "Resources/Images/Icons/Toolbar/upload-24.png"
                },
                {
                    "id": "AddLayersButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-add-layers",
                    "tooltip": "@language-toolbar-tasks-add-layers-tooltip",
                    "command": "AddMapLayerInteractive",
                    "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png"
                },
                {
                    "id": "LayerCatalogButton",
                    "type": "button",
                    "name": "@language-toolbar-tasks-layer-catalog",
                    "tooltip": "@language-toolbar-tasks-layer-catalog-tooltip",
                    "command": "ShowLayerCatalog",
                    "iconUri": "Resources/Images/Icons/Toolbar/layer-catalog-24.png"
                }
            ]
        },
        {
            "id": "DrawingTools",
            "type": "toolbarGroup",
            "name": "@language-toolbar-markup-drawing-tools",
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
                            "statusText": "@language-toolbar-markup-point-desc",
                            "keyboardStatusText": "@language-toolbar-markup-point-desc-keyboard"
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
                            "statusText": "@language-toolbar-markup-polyline-desc",
                            "keyboardStatusText": "@language-toolbar-markup-polyline-desc-keyboard"
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
                            "statusText": "@language-toolbar-markup-polygon-desc",
                            "keyboardStatusText": "@language-toolbar-markup-polygon-desc-keyboard"
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
                    ]
                },
                {
                    "id": "MarkupEditRegion",
                    "type": "region",
                    "regionName": "MarkupEditRegion"
                }
            ]
        },
        {
            "id": "EditGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-editing",
            "items": [
                {
                    "id": "EditingFlyout",
                    "type": "flyout",
                    "name": "@language-toolbar-group-editing",
                    "items": [
                        {
                            "id": "EditMarkupTool",
                            "type": "tool",
                            "name": "@language-toolbar-markup-edit",
                            "tooltip": "@language-toolbar-markup-edit-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/draw-edit-24.png",
                            "drawMode": "POINT",
                            "isSticky": true,
                            "command": "EditMarkup",
                            "statusText": "@language-toolbar-markup-edit-desc",
                            "keyboardStatusText": "@language-toolbar-markup-edit-desc-keyboard"
                        },
                       {
                           "id": "DeleteMarkupTool",
                           "type": "tool",
                           "name": "@language-toolbar-markup-delete",
                           "tooltip": "@language-toolbar-markup-delete-tooltip",
                           "iconUri": "Resources/Images/Icons/Toolbar/erase-24.png",
                           "drawMode": "POINT",
                           "isSticky": true,
                           "command": "DeleteMarkup",
                           "statusText": "@language-toolbar-markup-delete-desc",
                           "keyboardStatusText": "@language-toolbar-markup-delete-desc-keyboard"
                       },
                       {
                           "id": "ClearMarkup",
                           "type": "button",
                           "name": "@language-toolbar-markup-clear",
                           "tooltip": "@language-toolbar-markup-clear-tooltip",
                           "command": "ClearMarkup",
                           "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png"
                       }
                    ]
                },
                {
                    "id": "EditControlRegion",
                    "type": "region",
                    "regionName": "EditControlRegion"
                },
                 {
                     "id": "ExportMarkup",
                     "type": "button",
                     "name": "@language-toolbar-markup-export",
                     "tooltip": "@language-toolbar-markup-export-tooltip",
                     "iconUri": "Resources/Images/Icons/Toolbar/draw-extract-24.png",
                     "visible": true,
                     "command": "ExportMarkupLayer",
                     "hideOnDisable": false
                 }
            ]
        },
        {
            "id": "FindDataGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-find-data",
            "items": [
                {
                    "id": "FindDataFlyout",
                    "type": "flyout",
                    "name": "@language-toolbar-group-find-data",
                    "items": [
                        {
                            "id": "PointIdentifyTool-Analysis",
                            "type": "tool",
                            "name": "@language-toolbar-identify-point",
                            "tooltip": "@language-toolbar-identify-point-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                            "drawMode": "POINT",
                            "command": "Identify",
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-point-desc",
                            "keyboardStatusText": "@language-toolbar-identify-point-desc-keyboard"
                        },
                        {
                            "id": "FreehandIdentifyTool",
                            "type": "tool",
                            "name": "@language-toolbar-identify-freehand",
                            "tooltip": "@language-toolbar-identify-freehand-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-freehand-24.png",
                            "drawMode": "FREEHAND_POLYLINE",
                            "command": "Identify",
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-freehand-desc"
                        },
                        {
                            "id": "PolylineIdentifyTool",
                            "type": "tool",
                            "name": "@language-toolbar-identify-polyline",
                            "tooltip": "@language-toolbar-identify-polyline-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polyline-24.png",
                            "drawMode": "POLYLINE",
                            "command": "Identify",
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-polyline-desc",
                            "keyboardStatusText": "@language-toolbar-identify-polyline-desc-keyboard"
                        },
                        {
                            "id": "PolygonIdentifyTool",
                            "type": "tool",
                            "name": "@language-toolbar-identify-polygon",
                            "tooltip": "@language-toolbar-identify-polygon-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polygon-24.png",
                            "drawMode": "POLYGON",
                            "command": "Identify",
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-polygon-desc",
                            "keyboardStatusText": "@language-toolbar-identify-polygon-desc-keyboard"
                        },
                        {
                            "id": "RectangleIdentifyTool",
                            "type": "tool",
                            "name": "@language-toolbar-identify-rectangle",
                            "tooltip": "@language-toolbar-identify-rectangle-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-rectangle-24.png",
                            "drawMode": "RECTANGLE",
                            "command": "Identify",
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-rectangle-desc"
                        }
                    ]
                },
                {
                    "id": "FindDataControlRegion",
                    "type": "region",
                    "regionName": "FindDataControlRegion"
                },
                {
                    "id": "ShowSimpleQueryBuilderButton",
                    "type": "button",
                    "name": "@language-querybuilder-simple-title",
                    "tooltip": "@language-querybuilder-simple-tooltip",
                    "iconUri": "Resources/Images/Icons/query-24.png",
                    "command": "ActivateView",
                    "commandParameter": "SimpleQueryBuilderView"
                },
                {
                    "id": "ShowSimpleFilterBuilderButton",
                    "type": "button",
                    "name": "@language-querybuilder-simple-filter-title",
                    "tooltip": "@language-querybuilder-simple-filter-tooltip",
                    "iconUri": "Resources/Images/Icons/filter-24.png",
                    "command": "ActivateView",
                    "commandParameter": "SimpleFilterBuilderView"
                }
            ]
        },
        {
            "id": "MeasurementGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-measurement",
            "items": [
                {
                    "id": "MeasurementTools",
                    "type": "flyout",
                    "name": "@language-toolbar-group-measurement-tools",
                    "items": [
                        {
                            "id": "MeasureDistanceTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-distance-tool-name",
                            "tooltip": "@language-measurement-measure-distance-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-distance-24.png",
                            "drawMode": "POLYLINE",
                            "command": "MeasureDistance",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-distance-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-distance-tool-status-keyboard"
                        },
                        {
                            "id": "MeasureAreaTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-area-tool-name",
                            "tooltip": "@language-measurement-measure-area-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-area-24.png",
                            "drawMode": "POLYGON",
                            "command": "MeasureArea",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-area-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-area-tool-status-keyboard"
                        }
                    ]
                },
                {
                    "id": "MeasurementToolControlRegion",
                    "type": "region",
                    "regionName": "MeasurementToolControlRegion"
                }
            ]
        },
        {
            "id": "AdvancedMeasurementGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-advanced-measurement",
            "items": [
                {
                    "id": "AdvancedMeasurementTools",
                    "type": "flyout",
                    "name": "@language-toolbar-group-measurement-tools",
                    "items": [
                        {
                            "id": "MeasureLineTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-line-tool-name",
                            "tooltip": "@language-measurement-measure-line-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-polyline-24.png",
                            "drawMode": "POLYLINE",
                            "command": "MeasureDistance",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-line-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-distance-tool-status-keyboard"
                        },
                        {
                            "id": "MeasureFreehandLineTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-freehand-line-tool-name",
                            "tooltip": "@language-measurement-measure-freehand-line-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-freehand-24.png",
                            "drawMode": "FREEHAND_POLYLINE",
                            "command": "MeasureDistance",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-freehand-line-tool-status"
                        },
                        {
                            "id": "MeasureFreehandPolygonTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-freehand-polygon-tool-name",
                            "tooltip": "@language-measurement-measure-freehand-polygon-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-polygon-freehand-24.png",
                            "drawMode": "FREEHAND_POLYGON",
                            "command": "MeasureArea",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-freehand-polygon-tool-status"
                        },
                        {
                            "id": "MeasureEllipseTool",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-ellipse-24.png",
                            "command": "MeasureArea",
                            "drawMode": "ELLIPSE",
                            "name": "@language-measurement-measure-ellipse-tool-name",
                            "tooltip": "@language-measurement-measure-ellipse-tool-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-ellipse-tool-status"
                        },
                        {
                            "id": "MeasureCircleTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-circle-tool-name",
                            "tooltip": "@language-measurement-measure-circle-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-circle-24.png",
                            "drawMode": "CIRCLE",
                            "command": "MeasureArea",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-circle-tool-status"
                        },
                        {
                            "id": "MeasurePolygonTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-polygon-tool-name",
                            "tooltip": "@language-measurement-measure-polygon-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-polygon-24.png",
                            "drawMode": "POLYGON",
                            "command": "MeasureArea",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-polygon-tool-status",
                            "keyboardStatusText": "@language-measurement-measure-area-tool-status-keyboard"
                        },
                        {
                            "id": "MeasureRectangleTool",
                            "type": "tool",
                            "name": "@language-measurement-measure-rectangle-tool-name",
                            "tooltip": "@language-measurement-measure-rectangle-tool-tooltip",
                            "iconUri": "Resources/Images/Icons/Toolbar/measure-rectangle-24.png",
                            "drawMode": "RECTANGLE",
                            "command": "MeasureArea",
                            "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                            "isSticky": true,
                            "statusText": "@language-measurement-measure-rectangle-tool-status"
                        }
                    ]
                },
                {
                    "id": "AdvancedMeasurementToolControlRegion",
                    "type": "region",
                    "regionName": "MeasurementToolControlRegion"
                }
            ]
        },
        {
            "id": "PlotCoordinatesGroup",
            "name": "@language-toolbar-group-plotcoordinates",
            "type": "toolbarGroup",
            "items": [
                {
                    "id": "PlotCoordinatesToggleButton",
                    "type": "toggleButton",
                    "name": "@language-plotcoordinates-tool-name",
                    "tooltip": "@language-plotcoordinates-tool-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
                    "hideOnDisable": false,
                    "toggleStateName": "PlotCoordinatesState",
                    "toggleOn": {
                        "command": "SetActiveTool",
                        "commandParameter": "PlotCoordinatesTool"
                    },
                    "toggleOff": {
                        "command": "ClearActiveTool",
                        "commandParameter": null
                    }
                },
                {
                    "id": "PlotCoordinatesToolControlRegion",
                    "type": "region",
                    "regionName": "PlotCoordinatesToolControlRegion"
                }
            ]
        },
        {
            "id": "AnalysisGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-analysis",
            "items": [
                {
                    "id": "ShowChartingViewButton",
                    "type": "button",
                    "name": "@language-toolbar-charting-show-charts",
                    "tooltip": "@language-toolbar-charting-show-charts-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
                    "command": "ShowChartingView"
                },
                {
                    "id": "ShowTimeSliderButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/settings-24.png",
                    "command": "ActivateTimeSlider",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-timeslider-showtimeslider",
                    "tooltip": "@language-toolbar-timeslider-showtimeslider-tooltip"

                }
            ]
        },
        {
            "id": "3rdPartyMapsGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-3rd-party-maps",
            "items": [
                {
                    "id": "ShowExternalComponentViewButton",
                    "type": "button",
                    "name": "@language-toolbar-3rd-party-maps-show-maps",
                    "tooltip": "@language-toolbar-3rd-party-maps-show-maps-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/map-3rd-party-24.png",
                    "command": "ShowExternalComponentView"
                }
            ]
        },
        {
            "id": "EditFeatureGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-edit-features",
            "items": [
                {
                    "id": "CreateNewFeatureButton",
                    "type": "toggleButton",
                    "name": "@language-toolbar-editing-create-new-feature",
                    "tooltip": "@language-toolbar-editing-create-new-feature-tooltip",
                    "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                    "hideOnDisable": false,
                    "toggleStateName": "FeaturePlacementState",
                    "toggleOn": {
                        "command": "ShowFeatureTemplatePicker",
                        "commandParameter": null
                    },
                    "toggleOff": {
                        "command": "StopFeaturePlacementState",
                        "commandParameter": null
                    }
                },
                {
                    "id": "CreateNewFeatureControlRegion",
                    "type": "region",
                    "regionName": "CreateNewFeatureControlRegion"
                }
            ]
        },
        {
            "id": "ArcGISGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-arcgis",
            "items": [
                {
                    "id": "ExportWebMapButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/Toolbar/arcgis-save-24.png",
                    "command": "ShowExportWebMapDialog",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-arcgis-export-web-map",
                    "tooltip": "@language-toolbar-arcgis-export-web-map-tooltip"
                },
                {
                    "id": "OpenArcGisMyContentButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/Toolbar/arcgis-shortcut-24.png",
                    "command": "OpenPortalMyContentWindow",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-arcgis-view-my-content",
                    "tooltip": "@language-toolbar-arcgis-view-my-content-tooltip"
                }
            ]
        },
        {
            "id": "NativeGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-native",
            "items": [
                {
                    "id": "ShowOfflineMapsButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/cloud-download-24.png",
                    "command": "ActivateView",
                    "commandParameter": "OfflineMapsContainerView",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-native-showofflinemaps",
                    "tooltip": "@language-toolbar-native-showofflinemaps-tooltip"

                }
            ]
        },
        {
            "id": "CollaborationGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-collaboration",
            "items": [
                {
                    "id": "OpenCollaboration",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/collaboration-24.png",
                    "command": "OpenCollaboration",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-open-collaboration",
                    "tooltip": "@language-toolbar-open-collaboration-tooltip"

                },
                {
                    "id": "OpenAfterActionPlayback",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/after-action-playback-24.png",
                    "command": "OpenAfterActionPlayback",
                    "hideOnDisable": false,
                    "name": "@language-toolbar-open-after-action",
                    "tooltip": "@language-toolbar-open-after-action-tooltip"

                }
            ]
        }
];

geocortex.essentialsHtmlViewer.management.modules.toolbar.simpleTools = [

    {
        "id": "FileGroup",
        "type": "flyout",
        "name": "@language-toolbar-menu-global-save-save-as",
        "items": [
           {
               "id": "SaveButton",
               "type": "button",
               "iconUri": "Resources/Images/Icons/save-24.png",
               "command": "SaveProject",
               "hideOnDisable": false,
               "isSticky": false,
               "name": "@language-toolbar-menu-global-save",
               "tooltip": "@language-toolbar-menu-global-save-desc"
           },
           {
               "id": "SaveAsButton",
               "type": "button",
               "iconUri": "Resources/Images/Icons/save-as-24.png",
               "command": "SaveAsProject",
               "hideOnDisable": false,
               "isSticky": false,
               "name": "@language-toolbar-menu-global-save-as",
               "tooltip": "@language-toolbar-menu-global-save-as-desc"
           }
        ]
    },
    {
        "id": "HomeButton",
        "type": "button",
        "name": "@language-toolbar-home-sub",
        "tooltip": "@language-toolbar-home-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
        "command": "ActivateHomePanel"
    },
    {
        "id": "ZoomInTool",
        "type": "tool",
        "name": "@language-toolbar-navigation-zoom-in",
        "tooltip": "@language-toolbar-navigation-zoom-in-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-in-24.png",
        "drawMode": "EXTENT",
        "isSticky": false,
        "command": "ZoomToExtent",
        "statusText": "@language-toolbar-navigation-zoom-in-desc"
    },
    {
        "id": "PlotCoordinatesToggleButton",
        "type": "toggleButton",
        "name": "@language-plotcoordinates-tool-name",
        "tooltip": "@language-plotcoordinates-tool-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
        "hideOnDisable": false,
        "toggleStateName": "PlotCoordinatesState",
        "toggleOn": {
            "command": "SetActiveTool",
            "commandParameter": "PlotCoordinatesTool"
        },
        "toggleOff": {
            "command": "ClearActiveTool",
            "commandParameter": null
        }
    },
    {
        "id": "ZoomOutTool",
        "type": "tool",
        "name": "@language-toolbar-navigation-zoom-out",
        "tooltip": "@language-toolbar-navigation-zoom-out-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-out-24.png",
        "drawMode": "EXTENT",
        "isSticky": false,
        "command": "ZoomOutToExtent",
        "statusText": "@language-toolbar-navigation-zoom-out-desc"
    },
    {
        "id": "InitialExtentButton",
        "type": "button",
        "name": "@language-toolbar-navigation-initial-extent",
        "tooltip": "@language-toolbar-navigation-initial-extent-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-initial-24.png",
        "command": "ZoomToInitialExtent",
        "commandParameter": null,
        "hideOnDisable": false
    },
    {
        "id": "FullExtentButton",
        "type": "button",
        "name": "@language-toolbar-navigation-full-extent",
        "tooltip": "@language-toolbar-navigation-full-extent-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-full-24.png",
        "command": "ZoomToFullExtent"
    },
    {
        "id": "PreviousExtentButton",
        "type": "button",
        "name": "@language-toolbar-navigation-previous-extent",
        "tooltip": "@language-toolbar-navigation-previous-extent-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-previous-32.png",
        "command": "ZoomToPreviousExtent"
    },
    {
        "id": "NextExtentButton",
        "type": "button",
        "name": "@language-toolbar-navigation-next-extent",
        "tooltip": "@language-toolbar-navigation-next-extent-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/zoom-next-32.png",
        "command": "ZoomToNextExtent"
    },
    {
        "id": "BookmarksButton",
        "type": "button",
        "name": "@language-toolbar-bookmark",
        "tooltip": "@language-toolbar-bookmark-open",
        "iconUri": "Resources/Images/Icons/bookmark-24.png",
        "command": "ShowBookmarks"
    },
    {
        "id": "PrintMapButton",
        "type": "button",
        "name": "@language-toolbar-tasks-print-map",
        "tooltip": "@language-toolbar-tasks-print-map-tooltip",
        "command": "PrintMap",
        "iconUri": "Resources/Images/Icons/Toolbar/print-24.png"
    },
    {
        "id": "ExportMapButton",
        "type": "button",
        "name": "@language-toolbar-tasks-export-map",
        "tooltip": "@language-toolbar-tasks-export-map-tooltip",
        "command": "ShowExportMapDialog",
        "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png"
    },
    {
        "id": "ShareButton",
        "type": "button",
        "name": "@language-toolbar-tasks-share",
        "tooltip": "@language-toolbar-tasks-share-tooltip",
        "command": "ShowShareView",
        "iconUri": "Resources/Images/Icons/Toolbar/share-24.png"
    },
    {
        "id": "UploadDataButton",
        "type": "button",
        "name": "@language-toolbar-tasks-upload-data",
        "tooltip": "@language-toolbar-tasks-upload-data-tooltip",
        "command": "UploadData",
        "iconUri": "Resources/Images/Icons/Toolbar/upload-24.png"
    },
    {
        "id": "AddLayersButton",
        "type": "button",
        "name": "@language-toolbar-tasks-add-layers",
        "tooltip": "@language-toolbar-tasks-add-layers-tooltip",
        "command": "AddMapLayerInteractive",
        "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png"
    },
    {
        "id": "LayerCatalogButton",
        "type": "button",
        "name": "@language-toolbar-tasks-layer-catalog",
        "tooltip": "@language-toolbar-tasks-layer-catalog-tooltip",
        "command": "ShowLayerCatalog",
        "iconUri": "Resources/Images/Icons/Toolbar/layer-catalog-24.png"
    },
    {
        "id": "ExportWebMapButton",
        "type": "button",
        "name": "@language-toolbar-arcgis-export-web-map",
        "tooltip": "@language-toolbar-arcgis-export-web-map-tooltip",
        "command": "ShowExportWebMapDialog",
        "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png"
    },
    {
        "id": "OpenArcGisMyContentButton",
        "type": "button",
        "name": "@language-toolbar-arcgis-view-my-content",
        "tooltip": "@language-toolbar-arcgis-view-my-content-tooltip",
        "command": "OpenPortalMyContentWindow",
        "iconUri": "Resources/Images/Icons/Toolbar/share-map-24.png"
    },
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
                "statusText": "@language-toolbar-markup-point-desc",
                "keyboardStatusText": "@language-toolbar-markup-point-desc-keyboard"
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
                "statusText": "@language-toolbar-markup-polyline-desc",
                "keyboardStatusText": "@language-toolbar-markup-polyline-desc-keyboard"
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
                "statusText": "@language-toolbar-markup-polygon-desc",
                "keyboardStatusText": "@language-toolbar-markup-polygon-desc-keyboard"
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
        ]
    },
    {
        "id": "EditingFlyout",
        "type": "flyout",
        "name": "@language-toolbar-group-editing",
        "items": [
            {
                "id": "EditMarkupTool",
                "type": "tool",
                "name": "@language-toolbar-markup-edit",
                "tooltip": "@language-toolbar-markup-edit-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/draw-edit-24.png",
                "drawMode": "POINT",
                "isSticky": true,
                "command": "EditMarkup",
                "statusText": "@language-toolbar-markup-edit-desc",
                "keyboardStatusText": "@language-toolbar-markup-edit-desc-keyboard"
            },
            {
                "id": "DeleteMarkupTool",
                "type": "tool",
                "name": "@language-toolbar-markup-delete",
                "tooltip": "@language-toolbar-markup-delete-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/erase-24.png",
                "drawMode": "POINT",
                "isSticky": true,
                "command": "DeleteMarkup",
                "statusText": "@language-toolbar-markup-delete-desc",
                "keyboardStatusText": "@language-toolbar-markup-delete-desc-keyboard"
            },
            {
                "id": "ClearMarkup",
                "type": "button",
                "name": "@language-toolbar-markup-clear",
                "tooltip": "@language-toolbar-markup-clear-tooltip",
                "command": "ClearMarkup",
                "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png"
            }
        ]
    },
    {
        "id": "ExportMarkup",
        "type": "button",
        "name": "@language-toolbar-markup-export",
        "tooltip": "@language-toolbar-markup-export-tooltip",
        "command": "ExportMarkupLayer",
        "iconUri": "Resources/Images/Icons/Toolbar/draw-extract-24.png",
        "visible": true,
        "hideOnDisable": false
    },
    {
        "id": "FindDataTools",
        "type": "flyout",
        "name": "@language-toolbar-group-find-data-tools",
        "items": [
            {
                "id": "PointIdentifyTool-Analysis",
                "type": "tool",
                "name": "@language-toolbar-identify-point",
                "tooltip": "@language-toolbar-identify-point-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                "drawMode": "POINT",
                "command": "Identify",
                "isSticky": false,
                "statusText": "@language-toolbar-identify-point-desc",
                "keyboardStatusText": "@language-toolbar-identify-point-desc-keyboard"
            },
            {
                "id": "FreehandIdentifyTool",
                "type": "tool",
                "name": "@language-toolbar-identify-freehand",
                "tooltip": "@language-toolbar-identify-freehand-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/identify-freehand-24.png",
                "drawMode": "FREEHAND_POLYLINE",
                "command": "Identify",
                "isSticky": false,
                "statusText": "@language-toolbar-identify-freehand-desc"
            },
            {
                "id": "PolylineIdentifyTool",
                "type": "tool",
                "name": "@language-toolbar-identify-polyline",
                "tooltip": "@language-toolbar-identify-polyline-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/identify-polyline-24.png",
                "drawMode": "POLYLINE",
                "command": "Identify",
                "isSticky": false,
                "statusText": "@language-toolbar-identify-polyline-desc",
                "keyboardStatusText": "@language-toolbar-identify-polyline-desc-keyboard"
            },
            {
                "id": "PolygonIdentifyTool",
                "type": "tool",
                "name": "@language-toolbar-identify-polygon",
                "tooltip": "@language-toolbar-identify-polygon-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/identify-polygon-24.png",
                "drawMode": "POLYGON",
                "command": "Identify",
                "isSticky": false,
                "statusText": "@language-toolbar-identify-polygon-desc",
                "keyboardStatusText": "@language-toolbar-identify-polygon-desc-keyboard"
            },
            {
                "id": "RectangleIdentifyTool",
                "type": "tool",
                "name": "@language-toolbar-identify-rectangle",
                "tooltip": "@language-toolbar-identify-rectangle-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/identify-rectangle-24.png",
                "drawMode": "RECTANGLE",
                "command": "Identify",
                "isSticky": false,
                "statusText": "@language-toolbar-identify-rectangle-desc"
            }
        ]
    },
    {
        "id": "ShowSimpleQueryBuilderButton",
        "type": "button",
        "name": "@language-querybuilder-simple-title",
        "tooltip": "@language-querybuilder-simple-tooltip",
        "iconUri": "Resources/Images/Icons/query-24.png",
        "command": "ActivateView",
        "commandParameter": "SimpleQueryBuilderView"
    },
    {
        "id": "ShowSimpleFilterBuilderButton",
        "type": "button",
        "name": "@language-querybuilder-simple-filter-title",
        "tooltip": "@language-querybuilder-simple-filter-tooltip",
        "iconUri": "Resources/Images/Icons/filter-24.png",
        "command": "ActivateView",
        "commandParameter": "SimpleFilterBuilderView"
    },
    {
        "id": "MeasurementTools",
        "type": "flyout",
        "name": "@language-toolbar-group-measurement-tools",
        "items": [
            {
                "id": "MeasureDistanceTool",
                "type": "tool",
                "name": "@language-measurement-measure-distance-tool-name",
                "tooltip": "@language-measurement-measure-distance-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-distance-24.png",
                "drawMode": "POLYLINE",
                "command": "MeasureDistance",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-distance-tool-status",
                "keyboardStatusText": "@language-measurement-measure-distance-tool-status-keyboard"
            },
            {
                "id": "MeasureAreaTool",
                "type": "tool",
                "name": "@language-measurement-measure-area-tool-name",
                "tooltip": "@language-measurement-measure-area-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-area-24.png",
                "drawMode": "POLYGON",
                "command": "MeasureArea",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-area-tool-status",
                "keyboardStatusText": "@language-measurement-measure-area-tool-status-keyboard"
            }
        ]
    },
    {
        "id": "AdvancedMeasurementGroup",
        "type": "flyout",
        "name": "@language-toolbar-group-advanced-measurement",
        "items": [
            {
                "id": "MeasureLineTool",
                "type": "tool",
                "name": "@language-measurement-measure-line-tool-name",
                "tooltip": "@language-measurement-measure-line-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-polyline-24.png",
                "drawMode": "POLYLINE",
                "command": "MeasureDistance",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-line-tool-status",
                "keyboardStatusText": "@language-measurement-measure-distance-tool-status-keyboard"
            },
            {
                "id": "MeasureFreehandLineTool",
                "type": "tool",
                "name": "@language-measurement-measure-freehand-line-tool-name",
                "tooltip": "@language-measurement-measure-freehand-line-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-freehand-24.png",
                "drawMode": "FREEHAND_POLYLINE",
                "command": "MeasureDistance",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-freehand-line-tool-status"
            },
            {
                "id": "MeasurePolygonTool",
                "type": "tool",
                "name": "@language-measurement-measure-polygon-tool-name",
                "tooltip": "@language-measurement-measure-polygon-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-polygon-24.png",
                "drawMode": "POLYGON",
                "command": "MeasureArea",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-polygon-tool-status",
                "keyboardStatusText": "@language-measurement-measure-area-tool-status-keyboard"
            },
            {
                "id": "MeasureFreehandPolygonTool",
                "type": "tool",
                "name": "@language-measurement-measure-freehand-polygon-tool-name",
                "tooltip": "@language-measurement-measure-freehand-polygon-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-polygon-freehand-24.png",
                "drawMode": "FREEHAND_POLYGON",
                "command": "MeasureArea",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-freehand-polygon-tool-status"
            },
            {
                "id": "MeasureEllipseTool",
                "type": "tool",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-ellipse-24.png",
                "command": "MeasureArea",
                "drawMode": "ELLIPSE",
                "name": "@language-measurement-measure-ellipse-tool-name",
                "tooltip": "@language-measurement-measure-ellipse-tool-tooltip",
                "hideOnDisable": false,
                "isSticky": true,
                "statusText": "@language-measurement-measure-ellipse-tool-status"
            },
            {
                "id": "MeasureCircleTool",
                "type": "tool",
                "name": "@language-measurement-measure-circle-tool-name",
                "tooltip": "@language-measurement-measure-circle-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-circle-24.png",
                "drawMode": "CIRCLE",
                "command": "MeasureArea",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-circle-tool-status"
            },
            {
                "id": "MeasureRectangleTool",
                "type": "tool",
                "name": "@language-measurement-measure-rectangle-tool-name",
                "tooltip": "@language-measurement-measure-rectangle-tool-tooltip",
                "iconUri": "Resources/Images/Icons/Toolbar/measure-rectangle-24.png",
                "drawMode": "RECTANGLE",
                "command": "MeasureArea",
                "typeName": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementTool",
                "isSticky": true,
                "statusText": "@language-measurement-measure-rectangle-tool-status"
            }
        ]
    },
    {
        "id": "ShowChartingViewButton",
        "type": "button",
        "name": "@language-toolbar-charting-show-charts",
        "tooltip": "@language-toolbar-charting-show-charts-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
        "command": "ShowChartingView"
    },
    {
        "id": "CreateNewFeatureButton",
        "type": "toggleButton",
        "name": "@language-toolbar-editing-create-new-feature",
        "tooltip": "@language-toolbar-editing-create-new-feature-tooltip",
        "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
        "hideOnDisable": false,
        "toggleStateName": "FeaturePlacementState",
        "toggleOn": {
            "command": "ShowFeatureTemplatePicker",
            "commandParameter": null
        },
        "toggleOff": {
            "command": "StopFeaturePlacementState"
        }
    },
    {
        "id": "ShowOfflineMapsButton",
        "type": "button",
        "iconUri": "Resources/Images/Icons/cloud-download-24.png",
        "command": "ActivateView",
        "commandParameter": "OfflineMapsContainerView",
        "hideOnDisable": false,
        "name": "@language-toolbar-native-showofflinemaps",
        "tooltip": "@language-toolbar-native-showofflinemaps-tooltip"
    },
    {
        "id": "ShowTimeSliderButton",
        "type": "button",
        "iconUri": "Resources/Images/Icons/settings-24.png",
        "command": "ActivateTimeSlider",
        "hideOnDisable": false,
        "name": "@language-toolbar-timeslider-showtimeslider",
        "tooltip": "@language-toolbar-timeslider-showtimeslider-tooltip"
    },
    {
        "id": "OpenCollaboration",
        "type": "button",
        "iconUri": "Resources/Images/Icons/collaboration-24.png",
        "command": "OpenCollaboration",
        "hideOnDisable": false,
        "name": "@language-toolbar-open-collaboration",
        "tooltip": "@language-toolbar-open-collaboration-tooltip"

    }
];
