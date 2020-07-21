geocortex.essentialsHtmlViewer.management.modules.toolbar.fullToolbar = [

    {
        "id": "FileTab",
        "type": "toolbarGroup",
        "name": "@language-toolbar-tab-file",
        "items": [
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
                      "hideOnDisable": false,
                      "name": "@language-toolbar-menu-global-save-as",
                      "tooltip": "@language-toolbar-menu-global-save-as-desc"
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
                  }
               ],
               "layout": "Large"
           }
        ],
        "layout": "Large"
    },
    {
        "id": "MainTab",
        "type": "toolbarGroup",
        "name": "@language-toolbar-tab-home",
        "isDefault": true,
        "layout": "Large",
        "items": [
           {
               "id": "NavigationGroup",
               "type": "toolbarGroup",
               "name": "@language-toolbar-group-navigation",
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
                      "id": "BookmarksButton",
                      "type": "button",
                      "iconUri": "Resources/Images/Icons/bookmark-24.png",
                      "command": "ShowBookmarks",
                      "commandParameter": null,
                      "hideOnDisable": false,
                      "name": "@language-toolbar-bookmark",
                      "tooltip": "@language-toolbar-bookmark-open"
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
                  }
               ],
               "layout": "Large"
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
           },
           {
               "id": "TasksGroup",
               "type": "toolbarGroup",
               "name": "@language-toolbar-group-tasks",
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
               "layout": "Large"
           }
        ]
    },
   {
       "id": "MapTab",
       "type": "toolbarGroup",
       "name": "@language-toolbar-tab-map",
       "items": [
          {
              "id": "LayersGroup",
              "type": "toolbarGroup",
              "name": "@language-toolbar-group-layers",
              "items": [
                 {
                     "id": "ShowLayerListButton",
                     "type": "button",
                     "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
                     "command": "ShowLayerList",
                     "commandParameter": null,
                     "hideOnDisable": false,
                     "name": "@language-toolbar-show-layerlist",
                     "tooltip": "@language-toolbar-show-layerlist-desc"
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
                     "id": "UploadDataButton",
                     "type": "button",
                     "iconUri": "Resources/Images/Icons/Toolbar/upload-24.png",
                     "command": "UploadData",
                     "commandParameter": null,
                     "hideOnDisable": false,
                     "name": "@language-toolbar-tasks-upload-data",
                     "tooltip": "@language-toolbar-tasks-upload-data-tooltip"
                 },
                 {
                     "id": "AddLayersButton",
                     "type": "button",
                     "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png",
                     "command": "AddMapLayerInteractive",
                     "commandParameter": null,
                     "hideOnDisable": false,
                     "name": "@language-toolbar-tasks-add-layers",
                     "tooltip": "@language-toolbar-tasks-add-layers-tooltip"
                 },
                 {
                     "id": "LayerCatalogButton",
                     "type": "button",
                     "iconUri": "Resources/Images/Icons/Toolbar/layer-catalog-24.png",
                     "command": "ShowLayerCatalog",
                     "commandParameter": null,
                     "hideOnDisable": false,
                     "name": "@language-toolbar-tasks-layer-catalog",
                     "tooltip": "@language-toolbar-tasks-layer-catalog-tooltip"
                 }
              ],
              "layout": "Large"
          },
          {
            "id": "ArcGISGroup",
            "type": "toolbarGroup",
            "name": "@language-toolbar-group-arcgis",
            "layout": "Large",
            "items": [
                {
                    "id": "ExportWebMapButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/Toolbar/arcgis-save-24.png",
                    "command": "ShowExportWebMapDialog",
                    "commandParameter": null,
                    "hideOnDisable": false,
                    "name": "@language-toolbar-arcgis-export-web-map",
                    "tooltip": "@language-toolbar-arcgis-export-web-map-tooltip"
                },
                {
                    "id": "OpenArcGisMyContentButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/Toolbar/arcgis-shortcut-24.png",
                    "command": "OpenPortalMyContentWindow",
                    "commandParameter": null,
                    "hideOnDisable": false,
                    "name": "@language-toolbar-arcgis-view-my-content",
                    "tooltip": "@language-toolbar-arcgis-view-my-content-tooltip"
                }
            ]
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
          },
          {
              "id": "TimeSliderGroup",
              "type": "toolbarGroup",
              "name": "@language-toolbar-group-time-slider",
              "layout": "Large",
              "items": [
                  {
                      "id": "iQwMSDXQ",
                      "type": "toggleButton",
                      "name": "@language-toolbar-timeslider-showtimeslider",
                      "tooltip": "@language-toolbar-timeslider-showtimeslider-tooltip",
                      "iconUri": "Resources/Images/Icons/settings-24.png",
                      "hideOnDisable": false,
                      "toggleOn": {
                          "command": "ActivateTimeSlider",
                            "commandParameter": null
                      },
                      "toggleOff": {
                          "command": "DeactivateTimeSlider",
                          "commandParameter": null
                      }
                  }
              ]
          }
       ],
       "layout": "Large"
   },
   {
       "id": "ToolsTab",
       "type": "toolbarGroup",
       "name": "@language-toolbar-tab-tools",
       "items": [
          {
              "id": "FindDataGroup-Tools",
              "type": "toolbarGroup",
              "name": "@language-toolbar-group-find-data",
              "items": [
                 {
                     "id": "FindDataFlyout",
                     "type": "flyout",
                     "name": "@language-toolbar-tasks-identify",
                     "items": [
                        {
                            "id": "PointIdentifyTool-FindData",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                            "command": "Identify",
                            "drawMode": "POINT",
                            "name": "@language-toolbar-identify-point",
                            "tooltip": "@language-toolbar-identify-point-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-point-desc"
                        },
                        {
                            "id": "FreehandIdentifyTool",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-freehand-24.png",
                            "command": "Identify",
                            "drawMode": "FREEHAND_POLYLINE",
                            "name": "@language-toolbar-identify-freehand",
                            "tooltip": "@language-toolbar-identify-freehand-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-freehand-desc"
                        },
                        {
                            "id": "PolylineIdentifyTool",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polyline-24.png",
                            "command": "Identify",
                            "drawMode": "POLYLINE",
                            "name": "@language-toolbar-identify-polyline",
                            "tooltip": "@language-toolbar-identify-polyline-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-polyline-desc"
                        },
                        {
                            "id": "PolygonIdentifyTool",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-polygon-24.png",
                            "command": "Identify",
                            "drawMode": "POLYGON",
                            "name": "@language-toolbar-identify-polygon",
                            "tooltip": "@language-toolbar-identify-polygon-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-polygon-desc"
                        },
                        {
                            "id": "RectangleIdentifyTool",
                            "type": "tool",
                            "iconUri": "Resources/Images/Icons/Toolbar/identify-rectangle-24.png",
                            "command": "Identify",
                            "drawMode": "RECTANGLE",
                            "name": "@language-toolbar-identify-rectangle",
                            "tooltip": "@language-toolbar-identify-rectangle-tooltip",
                            "hideOnDisable": false,
                            "isSticky": true,
                            "statusText": "@language-toolbar-identify-rectangle-desc"
                        }
                     ],
                     "layout": "Large"
                 },
                 {
                     "id": "FindDataControlRegion",
                     "type": "region",
                     "regionName": "FindDataControlRegion"
                 },
                 {
                     "id": "QueryButton",
                     "type": "button",
                     "iconUri": "Resources/Images/Icons/Toolbar/query-24.png",
                     "command": "ActivateView",
                     "commandParameter": "SimpleQueryBuilderView",
                     "hideOnDisable": false,
                     "name": "@language-querybuilder-simple-title",
                     "tooltip": "@language-querybuilder-simple-tooltip"
                 },
                 {
                    "id": "ShowSelectionButton",
                    "type": "button",
                    "iconUri": "Resources/Images/Icons/Toolbar/star-show-24.png",
                    "command": "ShowSelection",
                    "commandParameter": null,
                    "hideOnDisable": true,
                    "name": "@language-menu-view-selection",
                    "tooltip": "@language-menu-view-selection-desc"
                }
              ],
              "layout": "Large"
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
              ],
              "layout": "Large"
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
              ],
              "layout": "Large"
          },
          {
              "id": "EditGroup",
              "type": "toolbarGroup",
              "name": "@language-toolbar-group-edit",
              "items": [
                 {
                     "id": "CreateNewFeatureButton",
                     "type": "toggleButton",
                     "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                     "command": "ShowFeatureTemplatePicker",
                     "commandParameter": null,
                     "hideOnDisable": false,
                     "name": "@language-toolbar-editing-create-new-feature",
                     "tooltip": "@language-toolbar-editing-create-new-feature-tooltip",
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
              ],
              "layout": "Large"
          }
       ],
       "layout": "Large"
   },
   {
       "id": "CollaborationTab",
       "type": "toolbarGroup",
       "name": "@language-toolbar-tab-collaboration",
       "items": [
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
               ],
               "layout": "Large"
           }
       ],
       "layout": "Large"
   }
];