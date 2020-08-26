{
  "configuration": {
    "version": "2.12",
    "application": {
      "proxyUri": "proxy.ashx?",
      "allowUnsafeContent": true,
      "offlineStorageSpaceMb": "50",
      "geometryServiceUrl": "https:/lib-gis3.library.oregonstate.edu/arcgis/rest/services/Utilities/Geometry/GeometryServer",
      "deferredModuleLoading": true,
      "mobileMode": true
    },
    "defaultLibraryId": "Mapping",
    "libraries": [
      {
        "id": "Framework.UI",
        "locales": [
          {
            "locale": "en-US",
            "uri": "Resources/Locales/Framework.UI.en-US.json.js"
          },
          {
            "locale": "inv",
            "uri": "Resources/Locales/Framework.UI.en-US.json.js"
          }
        ]
      },
      {
        "id": "Mapping.Infrastructure",
        "locales": [
          {
            "locale": "en-US",
            "uri": "Resources/Locales/Mapping.Infrastructure.en-US.json.js"
          },
          {
            "locale": "inv",
            "uri": "Resources/Locales/Mapping.Infrastructure.en-US.json.js"
          }
        ]
      },
      {
        "id": "Mapping",
        "async": true,
        "location": "Resources/Compiled",
        "locales": [
          {
            "locale": "en-US",
            "uri": "Resources/Locales/Mapping.en-US.json.js"
          },
          {
            "locale": "inv",
            "uri": "Resources/Locales/Mapping.en-US.json.js"
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
          },
          {
            "locale": "inv",
            "uri": "Resources/Locales/Mapping.Charting.en-US.json.js"
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
          },
          {
            "locale": "inv",
            "uri": "Resources/Locales/Charting.en-US.json.js"
          }
        ]
      },
      {
        "id": "https://apps.geocortex.com/workflow/latest/dist/hosts/gvh/loader.js!",
        "async": true
      },
      {
        "id": "OE_AMD",
        "async": true,
        "location": "Libraries/Custom/AMD",
        "locales": [
          {
            "locale": "inv",
            "uri": "Libraries/Custom/AMD/OE_AMD-Language.json"
          }
        ]
      }
    ],
    "modules": [
      {
        "moduleName": "OE_HyperlinkBanner",
        "libraryId": "OE_AMD",
        "require": "geocortex/oe_amd/OE_HyperlinkBanner/OE_HyperlinkBannerModule",
        "configuration": {
          "linkUri": "http://oregonexplorer.info"
        }
      },
      {
        "moduleName": "OE_Elevation",
        "libraryId": "OE_AMD",
        "require": "geocortex/oe_amd/OE_Elevation/OE_ElevationModule",
        "configuration": {}
      },
      {
        "moduleName": "OE_LayerActions",
        "libraryId": "OE_AMD",
        "require": "geocortex/oe_amd/OE_LayerActions/OE_LayerActionsModule",
        "configuration": {
          "showLayerDescription": true,
          "showLayerDescViewHide": true,
          "allowAllLayerTypes:": false,
          "metadataHyperlinkOverride": true,
          "expandLayerTreeOnVisible": true,
          "downloadWorkflowEnabled": false,
          "downloadWorkflowOverride_DISABLE": {
            "workflowID": "WildfireDataExtract"
          }
        }
      },
      {
        "moduleName": "Menu",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule",
        "configuration": {
          "menus": [
            {
              "id": "CoordinateActions",
              "description": "@language-plotcoordinates-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
              "items": [
                {
                  "text": "@language-plotcoordinates-show-coordinate",
                  "description": "@language-plotcoordinates-show-coordinate-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/check-24.png",
                  "command": "ShowCoordinates",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-plotcoordinates-hide-coordinate",
                  "description": "@language-plotcoordinates-hide-coordinate-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png",
                  "command": "HideCoordinates",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-plotcoordinates-edit-coordinate",
                  "description": "@language-plotcoordinates-edit-coordinate-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/data-edit-24.png",
                  "command": "EditCoordinate",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-plotcoordinates-delete-coordinate",
                  "description": "@language-plotcoordinates-delete-coordinate-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "command": "DeleteCoordinates",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "CoordinatesListActions",
              "description": "@language-plotcoordinates-list-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
              "items": [
                {
                  "text": "@language-plotcoordinates-show-all-coordinates",
                  "description": "@language-plotcoordinates-show-all-coordinates-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/coordinates-show-24.png",
                  "command": "ShowAllCoordinates",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-plotcoordinates-hide-all-coordinates",
                  "description": "@language-plotcoordinates-hide-all-coordinates-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/coordinates-hide-24.png",
                  "command": "HideAllCoordinates",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-plotcoordinates-delete-all-coordinates",
                  "description": "@language-plotcoordinates-delete-all-coordinates-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "command": "DeleteAllCoordinates",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "MobileSettingsMenu",
              "description": "@language-menu-settings-description",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                  "text": "@language-menu-home-panel",
                  "description": "@language-menu-home-panel-desc",
                  "command": "ShowHomePanel"
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                  "text": "@language-menu-show-log",
                  "description": "@language-menu-show-log-desc",
                  "command": "ShowLog"
                }
              ]
            },
            {
              "id": "LayerActions",
              "description": "@language-layer-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/details-24.png",
                  "text": "View metadata",
                  "description": "View the layer's metadata",
                  "command": "showMetadata",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/download-24.png",
                  "text": "Download layer",
                  "description": "Download the layer",
                  "command": "showDownload",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/window-new-24.png",
                  "text": "View Service Info",
                  "description": "View the layer web service information",
                  "command": "showServiceInfo",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-extent-24.png",
                  "text": "@language-menu-zoom-to-layer",
                  "description": "@language-menu-zoom-to-layer-desc",
                  "command": "ZoomToLayerExtent",
                  "commandParameter": null,
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-visible-extent-24.png",
                  "text": "@language-menu-zoom-to-visible-scale",
                  "description": "@language-menu-zoom-to-visible-scale-desc",
                  "command": "ZoomToLayerVisibleScale",
                  "commandParameter": null,
                  "hideOnDisable": true
                }
              ]
            },
            {
              "id": "LayerListActions",
              "description": "@language-layerlist-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
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
              "id": "EventActions",
              "description": "@language-collaboration-event-menu-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-collaboration-erase",
                  "description": "@language-collaboration-erase-desc",
                  "iconUri": "Resources/Images/Icons/trashcan-24.png",
                  "command": "EraseMarkupEvent",
                  "commandParameter": "{{event}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-collaboration-copy-event",
                  "description": "@language-collaboration-copy-event-desc",
                  "iconUri": "Resources/Images/Icons/copy-24.png",
                  "command": "ShowCopyDialogForEvent",
                  "commandParameter": "{{event}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-collaboration-edit-event-message",
                  "description": "@language-collaboration-edit-event-message-desc",
                  "iconUri": "Resources/Images/Icons/edit-24.png",
                  "command": "ShowEditCollaborationMessageView",
                  "commandParameter": "{{event}}",
                  "hideOnDisable": true
                }
              ]
            },
            {
              "id": "LegendActions",
              "description": "@language-layerlist-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-menu-switch-to-layerlist",
                  "description": "@language-menu-switch-to-layerlist-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
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
                  "text": "@language-feature-editing-edit",
                  "description": "@language-feature-editing-edit-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/feature-edit-24.png",
                  "command": "StartEditingAttributesAndGeometryFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-feature-editing-cut-text",
                  "description": "@language-feature-editing-cut-desc",
                  "iconUri": "Resources/Images/Icons/polygon-cut-24.png",
                  "hideOnDisable": true,
                  "command": "CutFeatureInteractive",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-native-attach-file",
                  "description": "@language-native-attach-photo",
                  "iconUri": "Resources/Images/Icons/Toolbar/attach-file-photo-24.png",
                  "command": "AttachFileToFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-zoom",
                  "description": "@language-menu-zoom-description",
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-feature-24.png",
                  "command": "ZoomToFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-common-pan",
                  "description": "@language-common-pan-description",
                  "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                  "command": "PanToFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-buffer-identify-feature",
                  "description": "@language-menu-buffer-identify-feature-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/buffer-identify-24.png",
                  "command": "IdentifyBufferedFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-results-add-feature",
                  "description": "@language-menu-results-add-feature-desc",
                  "iconUri": "Resources/Images/Icons/add-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureDetails"
                    },
                    {
                      "command": "AddFeatureToResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    },
                    {
                      "command": "ShowResults"
                    }
                  ]
                },
                {
                  "text": "@language-menu-results-remove-feature",
                  "description": "@language-menu-results-remove-feature-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureDetails"
                    },
                    {
                      "command": "RemoveFeatureFromResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    }
                  ]
                },
                {
                  "text": "@language-menu-copy-to-drawings",
                  "description": "@language-menu-copy-to-drawings-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/add-to-draw-layer-24.png",
                  "command": "AddMarkupFeature",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                }
              ]
            },
            {
              "id": "MapServiceActions",
              "description": "@language-mapservice-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
              "items": [
                {
                  "text": "@language-menu-remove-user-added-mapservice",
                  "description": "@language-menu-remove-user-added-mapservice-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/layer-remove-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "RemoveMapService",
                      "commandParameter": "{{context}}"
                    },
                    {
                      "command": "HideMapServiceActions"
                    }
                  ]
                }
              ]
            },
            {
              "id": "MapTipActions",
              "description": "@language-menu-maptip-actions",
              "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
              "items": [
                {
                  "text": "@language-menu-results-remove-feature",
                  "description": "@language-menu-results-remove-feature-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureDetails"
                    },
                    {
                      "command": "RemoveFeatureFromResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    },
                    {
                      "command": "RestoreAllMapTips"
                    }
                  ]
                },
                {
                  "text": "@language-menu-results-add-feature",
                  "description": "@language-menu-results-add-feature-desc",
                  "iconUri": "Resources/Images/Icons/add-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureDetails"
                    },
                    {
                      "command": "HideAllMapTips"
                    },
                    {
                      "command": "AddFeatureToResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    },
                    {
                      "command": "ShowResults"
                    }
                  ]
                },
                {
                  "text": "@language-menu-maptip-actions-view-details",
                  "description": "@language-menu-maptip-actions-view-details-desc",
                  "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                  "command": "ShowFeatureDetailsFromMaptip",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-feature-editing-edit",
                  "description": "@language-feature-editing-edit-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/feature-edit-24.png",
                  "command": "StartEditingAttributesAndGeometryFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-toolbar-markup-change-markup-style",
                  "description": "@language-toolbar-markup-change-markup-style-tooltip",
                  "command": "CreateMarkupStyleView",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-common-edit",
                  "description": "@language-common-edit",
                  "command": "EditClickableFeature",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-common-delete",
                  "description": "@language-common-delete",
                  "command": "DeleteClickableFeature",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-collaboration-edit-event-message",
                  "description": "@language-collaboration-edit-event-message-desc",
                  "command": "ShowEditCollaborationGraphicMessageView",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-collaboration-open-event-image",
                  "description": "@language-collaboration-open-event-image-desc",
                  "command": "OpenEventFeatureImage",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                }
              ]
            },
            {
              "id": "FeatureSetCollectionResultsActions",
              "description": "@language-menu-grouped-results-list-actions",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-menu-zoom-to-all",
                  "description": "@language-menu-zoom-to-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-extent-24.png",
                  "hideOnDisable": true,
                  "command": "ZoomToFeatureSetCollection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-show-charting-view",
                  "description": "@language-menu-show-charting-view-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
                  "hideOnDisable": true,
                  "command": "ShowChartingView"
                },
                {
                  "text": "@language-menu-identify-buffered-feature-set-collection",
                  "description": "@language-menu-identify-buffered-feature-set-collection-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/buffer-shape-24.png",
                  "hideOnDisable": true,
                  "command": "IdentifyBufferedFeatureSetCollection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-export-results-to-csv",
                  "description": "@language-menu-export-results-to-csv-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/csv-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/xlsx-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/shapefile-export-24.png",
                  "hideOnDisable": true,
                  "command": "ExportResultsTo",
                  "commandParameter": {
                    "format": "shp",
                    "fsc": "{{context}}"
                  }
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-browse-saved-results",
                  "description": "@language-menu-browse-saved-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/open-24.png",
                  "command": "ListSelections",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-save-results",
                  "description": "@language-menu-save-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/save-24.png",
                  "command": "ShowSaveSelectionDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-combine-results",
                  "description": "@language-menu-combine-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-results-24.png",
                  "command": "ShowSearchOptions",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "ProjectActions",
              "description": "@language-menu-project-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-common-share",
                  "description": "@language-menu-project-share-project-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/share-24.png",
                  "command": "ShowShareProject",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-project-actions-edit",
                  "description": "@language-menu-project-edit-project-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                  "command": "ShowProjectEditor",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-common-delete",
                  "description": "@language-menu-project-delete-project-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "command": "DeleteProject",
                  "hideOnDisable": true
                }
              ]
            },
            {
              "id": "ProjectsActions",
              "description": "@language-menu-projects-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-common-refresh",
                  "description": "@language-menu-projects-actions-refresh-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                  "command": "RefreshProjectsList"
                }
              ]
            },
            {
              "id": "QueryBuilderActions",
              "description": "@language-menu-query-builder-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/open-24.png",
                  "text": "@language-menu-browse-saved-queries",
                  "description": "@language-menu-browse-saved-queries-desc",
                  "command": "ListQueries",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/save-24.png",
                  "text": "@language-menu-save-query",
                  "description": "@language-menu-save-query-desc",
                  "command": "ShowSaveQueryDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/save-as-24.png",
                  "text": "@language-menu-save-as-query",
                  "description": "@language-menu-save-as-query-desc",
                  "command": "ShowSaveAsQueryDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "QueryActions",
              "description": "@language-menu-query-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                  "text": "@language-menu-edit-query",
                  "id": "OPENQUERY",
                  "description": "@language-menu-edit-query-desc",
                  "command": "DisplayQuery",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/search-24.png",
                  "text": "@language-menu-run-saved-query",
                  "id": "RUNQUERY",
                  "description": "@language-menu-run-saved-query-desc",
                  "command": "RunQuery",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                  "id": "RENAMEQUERY",
                  "text": "@language-menu-rename-query",
                  "description": "@language-menu-rename-query-desc",
                  "command": "RenameSavedQuery",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-common-delete",
                  "description": "@language-menu-query-delete-query-desc",
                  "id": "DELETEQUERY",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "command": "RemoveSavedQuery",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "FilterBuilderActions",
              "description": "@language-menu-filter-builder-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/open-24.png",
                  "text": "@language-menu-browse-saved-filters",
                  "description": "@language-menu-browse-saved-filters-desc",
                  "command": "ListFilters",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/save-24.png",
                  "text": "@language-menu-save-filter",
                  "description": "@language-menu-save-filter-desc",
                  "command": "ShowSaveFilterDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/save-as-24.png",
                  "text": "@language-menu-save-as-filter",
                  "description": "@language-menu-save-as-filter-desc",
                  "command": "ShowSaveAsFilterDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "FilterActions",
              "description": "@language-menu-filter-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                  "text": "@language-menu-edit-filter",
                  "id": "OPENFILTER",
                  "description": "@language-menu-edit-filter-desc",
                  "command": "DisplayFilter",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/search-24.png",
                  "text": "@language-menu-run-saved-filter",
                  "id": "RUNFILTER",
                  "description": "@language-menu-run-saved-filter-desc",
                  "command": "RunFilter",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                  "text": "@language-menu-rename-filter",
                  "id": "RENAMEFILTER",
                  "description": "@language-menu-rename-filter-desc",
                  "command": "RenameSavedFilter",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-common-delete",
                  "description": "@language-menu-query-delete-filter-desc",
                  "id": "DELETEFILTER",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "command": "RemoveSavedFilter",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                }
              ]
            },
            {
              "id": "FeatureSetCollectionResultsFeatureSetActions",
              "description": "@language-menu-filter-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-menu-zoom-to-all",
                  "description": "@language-menu-zoom-to-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-extent-24.png",
                  "hideOnDisable": true,
                  "command": "ZoomToFeatures",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-feature-editing-union-text",
                  "description": "@language-feature-editing-union-desc",
                  "iconUri": "Resources/Images/Icons/polygon-add-24.png",
                  "hideOnDisable": true,
                  "command": "UnionFeaturesInteractive",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-identify-buffered-feature-set-collection",
                  "description": "@language-menu-identify-buffered-feature-set-collection-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/buffer-shape-24.png",
                  "hideOnDisable": true,
                  "command": "IdentifyBufferedFeatureSet",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-select-all",
                  "description": "@language-menu-select-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/star-add-all-24.png",
                  "hideOnDisable": true,
                  "command": "AddFeatureSetToStarredSelection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-deselect-all",
                  "description": "@language-menu-deselect-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/star-remove-all-24.png",
                  "hideOnDisable": true,
                  "command": "RemoveFeatureSetFromStarredSelection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-show-charting-view",
                  "description": "@language-menu-show-charting-view-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
                  "hideOnDisable": true,
                  "command": "ShowChartingView"
                },
                {
                  "text": "@language-menu-export-results-to-csv",
                  "description": "@language-menu-export-results-to-csv-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/csv-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/xlsx-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/shapefile-export-24.png",
                  "hideOnDisable": true,
                  "command": "ExportResultsTo",
                  "commandParameter": {
                    "format": "shp",
                    "fsc": "{{context}}"
                  }
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-browse-saved-results",
                  "description": "@language-menu-browse-saved-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/open-24.png",
                  "command": "ListSelections",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-save-results",
                  "description": "@language-menu-save-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/save-24.png",
                  "command": "ShowSaveSelectionDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-combine-results",
                  "description": "@language-menu-combine-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-results-24.png",
                  "command": "ShowSearchOptions",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-results-remove-feature-set",
                  "description": "@language-menu-results-remove-feature-set-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "hideOnDisable": true,
                  "command": "RemoveFeatureSetFromResults",
                  "commandParameter": "{{context}}"
                }
              ]
            },
            {
              "id": "FeatureSetResultsActions",
              "description": "@language-menu-feature-set-results-actions-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "libraryId": "Mapping.Infrastructure",
              "items": [
                {
                  "text": "@language-menu-zoom-to-all",
                  "description": "@language-menu-zoom-to-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-extent-24.png",
                  "hideOnDisable": true,
                  "command": "ZoomToFeatures",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-feature-editing-union-text",
                  "description": "@language-feature-editing-union-desc",
                  "iconUri": "Resources/Images/Icons/polygon-add-24.png",
                  "hideOnDisable": true,
                  "command": "UnionFeaturesInteractive",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-identify-buffered-feature-set-collection",
                  "description": "@language-menu-identify-buffered-feature-set-collection-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/buffer-shape-24.png",
                  "hideOnDisable": true,
                  "command": "IdentifyBufferedFeatureSet",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-select-all",
                  "description": "@language-menu-select-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/star-add-all-24.png",
                  "hideOnDisable": true,
                  "command": "AddFeatureSetToStarredSelection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-deselect-all",
                  "description": "@language-menu-deselect-all-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/star-remove-all-24.png",
                  "hideOnDisable": true,
                  "command": "RemoveFeatureSetFromStarredSelection",
                  "commandParameter": "{{context}}"
                },
                {
                  "text": "@language-menu-show-charting-view",
                  "description": "@language-menu-show-charting-view-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/charting-24.png",
                  "hideOnDisable": true,
                  "command": "ShowChartingView"
                },
                {
                  "text": "@language-menu-export-results-to-csv",
                  "description": "@language-menu-export-results-to-csv-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/csv-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/xlsx-export-24.png",
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
                  "iconUri": "Resources/Images/Icons/Toolbar/shapefile-export-24.png",
                  "hideOnDisable": true,
                  "command": "ExportResultsTo",
                  "commandParameter": {
                    "format": "shp",
                    "fsc": "{{context}}"
                  }
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-browse-saved-results",
                  "description": "@language-menu-browse-saved-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/open-24.png",
                  "command": "ListSelections",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-save-results",
                  "description": "@language-menu-save-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/save-24.png",
                  "command": "ShowSaveSelectionDialog",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-combine-results",
                  "description": "@language-menu-combine-results-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-results-24.png",
                  "command": "ShowSearchOptions",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": false
                },
                {
                  "text": "@language-menu-results-remove-feature-set",
                  "description": "@language-menu-results-remove-feature-set-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureSetResultsView"
                    },
                    {
                      "command": "RemoveFeatureSetFromResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    }
                  ]
                }
              ]
            },
            {
              "id": "FeatureSetResultsFeatureActions",
              "description": "@language-feature-actions-description",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "text": "@language-menu-buffer-identify-feature",
                  "description": "@language-menu-buffer-identify-feature-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/buffer-identify-24.png",
                  "command": "IdentifyBufferedFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-feature-editing-edit",
                  "description": "@language-feature-editing-edit-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/feature-edit-24.png",
                  "command": "StartEditingAttributesAndGeometryFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-feature-editing-cut-text",
                  "description": "@language-feature-editing-cut-desc",
                  "iconUri": "Resources/Images/Icons/polygon-cut-24.png",
                  "hideOnDisable": true,
                  "command": "CutFeatureInteractive",
                  "commandParameter": "{{context}}"
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
                  "iconUri": "Resources/Images/Icons/Toolbar/zoom-feature-24.png",
                  "command": "ZoomToFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-common-pan",
                  "description": "@language-common-pan-description",
                  "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                  "command": "PanToFeature",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-run-report",
                  "description": "@language-menu-run-report-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
                  "command": "ListReports",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                },
                {
                  "text": "@language-menu-results-remove-feature",
                  "description": "@language-menu-results-remove-feature-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/trash-24.png",
                  "hideOnDisable": true,
                  "batch": [
                    {
                      "command": "HideFeatureDetails"
                    },
                    {
                      "command": "RemoveFeatureFromResults",
                      "commandParameter": "{{context}}",
                      "abortBatchOnFailure": true
                    }
                  ]
                },
                {
                  "text": "@language-menu-copy-to-drawings",
                  "description": "@language-menu-copy-to-drawings-desc",
                  "iconUri": "Resources/Images/Icons/Toolbar/add-to-draw-layer-24.png",
                  "command": "AddMarkupFeature",
                  "commandParameter": "{{context}}",
                  "hideOnDisable": true
                }
              ]
            }
          ]
        }
      },
      {
        "moduleName": "Map",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapModule",
        "moduleDependencies": [
          "LayerList",
          "IWantToMenu",
          "Shells"
        ],
        "configuration": {
          "panDuration": 0,
          "panRate": 50,
          "zoomDuration": 500,
          "zoomRate": 50,
          "longClickMilliseconds": 500,
          "maxExtentLogSize": 50,
          "showLoadingStatus": true,
          "loadingMessageTiming": [
            1000,
            3000,
            3000
          ],
          "defaultPointFeatureZoomScales": [],
          "behaviors": [
            {
              "name": "MapOnClickBehavior",
              "commands": [
                "InvokeMapTip"
              ]
            },
            {
              "name": "MapOnContextMenuBehavior",
              "commands": [
                "ActivateMapContextMenu"
              ]
            },
            {
              "name": "MapOnLongClickBehavior",
              "commands": [
                "ActivateMapContextMenu"
              ]
            },
            {
              "name": "MapOnFeatureClickBehavior",
              "commands": [
                "ShowMapTip"
              ]
            },
            {
              "name": "MapTimeExtentChangedBehavior",
              "event": "MapTimeExtentChangedEvent",
              "commands": []
            }
          ],
          "menus": [
            {
              "id": "MapContextMenu",
              "defaultIconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
                  "text": "@language-menu-identify",
                  "command": "Identify",
                  "commandParameter": "{{context}}"
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                  "text": "@language-menu-draw-point",
                  "command": "AddMarkup",
                  "commandParameter": "{{context}}"
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
                  "text": "@language-menu-plot-coordinate",
                  "command": "PlotCoordinates",
                  "commandParameter": "{{context}}"
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-text-24.png",
                  "text": "@language-menu-add-text",
                  "command": "AddTextMarkup",
                  "commandParameter": "{{context}}"
                },
                {
                  "iconUri": "Resources/Images/Icons/center-map-24.png",
                  "text": "@language-menu-center-map",
                  "command": "PanToPoint",
                  "commandParameter": "{{context}}"
                }
              ]
            }
          ],
          "tools": [
            {
              "name": "CenterMapTool",
              "command": "PanToPoint",
              "drawMode": "POINT",
              "isSticky": true,
              "statusText": "@language-mbl-map-center"
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
            "isManaged": false,
            "title": "@language-map-title",
            "iconUri": "Resources/Images/Icons/Toolbar/map-24.png",
            "description": "@language-map-surface",
            "markup": "Mapping/modules/Map/MapView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapView",
            "region": "ScreenRegion",
            "configuration": {
              "wrapAround180": false,
              "disableMapKeyboardNavigation": false,
              "extentBroadcastFrequency": 20,
              "fitTiledMapsToExtent": false,
              "showAttribution": true
            }
          },
          {
            "id": "MapContextMenuView",
            "viewModelId": "MapContextMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapContextMenuView",
            "require": "Mapping/modules/Map/MapContextMenu/MapContextMenuView",
            "markup": "Mapping/modules/Map/MapContextMenu/MapContextMenuView.html",
            "region": "MiscViewContainerRegion",
            "title": "@language-map-context-menu-title",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "ContextMenuReverseGeocodeView",
            "viewModelId": "ContextMenuReverseGeocodeViewModel",
            "visible": true,
            "markup": "Mapping/modules/Map/MapContextMenu/Views/ReverseGeocode/ReverseGeocodeView.html",
            "type": "geocortex.framework.ui.ViewBase",
            "require": "geocortex/framework/ui/ViewBase",
            "region": "MapContextMenuContentRegion",
            "configuration": {}
          },
          {
            "id": "ContextMenuCoordinatesView",
            "viewModelId": "ContextMenuCoordinatesViewModel",
            "visible": true,
            "markup": "Mapping/modules/Map/MapContextMenu/Views/Coordinates/CoordinatesView.html",
            "type": "geocortex.framework.ui.ViewBase",
            "require": "geocortex/framework/ui/ViewBase",
            "region": "MapContextMenuContentRegion",
            "configuration": {}
          },
          {
            "id": "ContextMenuMapMenuView",
            "viewModelId": "ContextMenuMapMenuViewModel",
            "visible": true,
            "markup": "Mapping/modules/Map/MapContextMenu/Views/Menu/MapMenuView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapMenuView",
            "require": "Mapping/modules/Map/MapContextMenu/Views/Menu/MapMenuView",
            "region": "MapContextMenuContentRegion",
            "configuration": {
              "menuId": "MapContextMenu"
            }
          }
        ],
        "viewModels": [
          {
            "id": "MapViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapViewModel",
            "configuration": {
              "stepZoomFactor": 0.5,
              "panStep": 0.333
            }
          },
          {
            "id": "MapContextMenuViewModel",
            "type": "geocortex.framework.ui.ViewModelBase",
            "require": "geocortex/framework/ui/ViewModelBase",
            "configuration": {}
          },
          {
            "id": "ContextMenuReverseGeocodeViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.ReverseGeocodeViewModel",
            "require": "Mapping/modules/Map/MapContextMenu/Views/ReverseGeocode/ReverseGeocodeViewModel",
            "configuration": {
              "showReverseGeocoder": true
            }
          },
          {
            "id": "ContextMenuCoordinatesViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.CoordinatesViewModel",
            "require": "Mapping/modules/Map/MapContextMenu/Views/Coordinates/CoordinatesViewModel",
            "configuration": {
              "showCoordinates": true
            }
          },
          {
            "id": "ContextMenuMapMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapMenuViewModel",
            "require": "Mapping/modules/Map/MapContextMenu/Views/Menu/MapMenuViewModel",
            "configuration": {
              "showMenu": true
            }
          },
          {
            "id": "MapCoordinatesModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinatesModel",
            "require": "geocortex/infrastructure/coordinates/CoordinatesModel",
            "configuration": {
              "defaultCoordinateDisplayTypes": [
                "dd",
                "ddm",
                "dms",
                "xy"
              ],
              "customCoordinateSystems": [],
              "fractionalDigits": 5,
              "defaultGcsWkid": "4326",
              "disableMouseLocationMonitoring": true
            }
          }
        ]
      },
      {
        "moduleName": "Accessibility",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityModule",
        "configuration": {
          "keyboardFocusIndicatorEnabled": true,
          "keyboardFocusIndicatorColor": "#550055",
          "expandedMapKeyboardAccessibility": true,
          "automaticElementFocusing": true,
          "includeProviders": true,
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
            "require": "geocortex/framework/ui/ViewBase",
            "markup": "Mapping/modules/Accessibility/AccessibilityView.html",
            "region": "AccessibilityRegion"
          },
          {
            "id": "AccessibilityIconView",
            "viewModelId": "AccessibilityIconViewModel",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityIconView",
            "markup": "Mapping/modules/Accessibility/AccessibilityIconView.html",
            "region": "ModalWindowRegion"
          }
        ],
        "viewModels": [
          {
            "id": "AccessibilityViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityViewModel",
            "configuration": {}
          },
          {
            "id": "AccessibilityIconViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.accessibility.AccessibilityIconViewModel",
            "configuration": {
              "included": true,
              "content": "%3Cp%3EThis%20application%20provides%20enhanced%20access%20to%20end-users%20with%20disabilities%3A%20it%20enables%20full%20keyboard%20control%2C%20is%20screen%20reader%20friendly%2C%20and%20contains%20other%20features%20to%20make%20mapping%20technology%20more%20accessible%20to%20the%20largest%20possible%20audience%20of%20potential%20users%2C%20regardless%20of%20their%20level%20of%20ability.%3C%2Fp%3E%3Cp%3EGeocortex%20Viewer%20for%20HTML5%20conforms%20to%20%3Ca%20href%3D%22http%3A%2F%2Fwww.w3.org%2FTR%2FWCAG20%2F%22%20target%3D%22_blank%22%20%3EWCAG%202.0%3C%2Fa%3E%20level%20AA%20(international%20%26amp%3B%20United%20States)%2C%20as%20part%20of%20Latitude%20Geographics'%20Geocortex%20Essentials%20technology%20for%20Esri's%20ArcGIS%20platform.%3C%2Fp%3E%3Cp%3E%3Cbr%3E%3C%2Fp%3E",
              "title": "@language-accessibility-map-title"
            }
          }
        ]
      },
      {
        "moduleName": "Alert",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.alert.AlertModule",
        "deferLoading": true,
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
        "moduleName": "BarcodeScanner",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.barcodescanner.BarcodeScannerModule",
        "deferLoading": true,
        "configuration": {
          "htmlScannerView": "BarcodeScannerView"
        },
        "views": [
          {
            "id": "BarcodeScannerView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.barcodescanner.BarcodeScannerView",
            "viewModelId": "BarcodeScannerViewModel",
            "visible": false,
            "markup": "Mapping/modules/BarcodeScanner/BarcodeScannerView.html",
            "region": "ApplicationRegion",
            "configuration": {
              "jsqrcodeSource": "Resources/Scripts/jsqrcode.min.js",
              "jobDecoderWorkerSource": "Resources/Scripts/JobDecoderWorker.min.js"
            }
          }
        ],
        "viewModels": [
          {
            "id": "BarcodeScannerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.barcodescanner.BarcodeScannerViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Basemap",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapModule",
        "configuration": {},
        "views": [
          {
            "id": "BasemapSwitcherView",
            "viewModelId": "BasemapSwitcherViewModel",
            "title": "@language-basemap-switcher-view-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSwitcherView",
            "markup": "Mapping/modules/Basemap/BasemapSwitcherView.html",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "BasemapSliderView",
            "viewModelId": "BasemapSwitcherViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSliderView",
            "markup": "Mapping/modules/Basemap/BasemapSliderView.html",
            "region": "TopRightMapRegion",
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
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "BookmarksView",
            "viewModelId": "BookmarksViewModel",
            "markup": "Mapping/modules/Bookmarks/BookmarksView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksView",
            "region": "MiscViewContainerRegion",
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
          "title": "Oregon Aquaculture Map Viewer"
        }
      },
      {
        "moduleName": "Buffer",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.buffer.BufferModule",
        "deferLoading": true,
        "configuration": {
          "bufferProjectionWkid": "",
          "behaviors": [
            {
              "name": "BufferOptionsDismissedBehavior",
              "event": "BufferOptionsDismissedEvent",
              "commands": [
                "CloseDataFrame"
              ]
            },
            {
              "name": "BufferingErrorBehavior",
              "event": "BufferingErrorEvent",
              "commands": [
                "OpenDataFrame"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "BufferOptionsView",
            "viewModelId": "BufferOptionsViewModel",
            "markup": "Mapping/modules/Buffer/BufferOptionsView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.buffer.BufferOptionsView",
            "region": "MiscViewContainerRegion",
            "title": "@language-buffer-options-view",
            "visible": false,
            "configuration": {
              "targetCommands": [
                "Identify",
                "IdentifyBufferedGeometry",
                "IdentifyBufferedFeature",
                "IdentifyBufferedFeatureSetCollection",
                "IdentifyBufferedFeatureSet"
              ]
            }
          }
        ],
        "viewModels": [
          {
            "id": "BufferOptionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.buffer.BufferOptionsViewModel",
            "configuration": {
              "bufferUnits": [
                "feet",
                "yard",
                "meter",
                "kilometer",
                "mile",
                "nauticalmile"
              ],
              "defaultBufferUnit": "kilometer",
              "defaultBufferDistance": 0,
              "addBufferToMarkupLayerByDefault": false
            }
          }
        ]
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
          "behaviors": [
            {
              "name": "ChartPointMouseHoverBeginBehavior",
              "event": "ChartPointMouseHoverBeginEvent",
              "commands": [
                "ClearChartHighlights",
                "HighlightChartFeatureSet"
              ]
            },
            {
              "name": "ChartPointMouseHoverEndBehavior",
              "event": "ChartPointMouseHoverEndEvent",
              "commands": [
                "ClearChartHighlights"
              ]
            },
            {
              "name": "ChartPointMouseDownBehavior",
              "event": "ChartPointMouseDownEvent",
              "commands": [
                "ShowMap",
                "RunChartFeatureActions"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "ChartingView",
            "viewModelId": "ChartingViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartingView",
            "markup": "Mapping.Charting/modules/Charting/ChartingView.html",
            "libraryId": "Mapping.Charting",
            "region": "MiscViewContainerRegion",
            "title": "@language-feature-charts",
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
                "animationsEnabled": false,
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
              "backButtonOnRootView": true,
              "showBackButtonAsX": true,
              "showHostedViews": false,
              "ordering": {}
            }
          }
        ]
      },
      {
        "moduleName": "ClusterLayers",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.clusterLayers.ClusterLayerModule",
        "require": "Mapping/modules/ClusterLayers/ClusterLayerModule",
        "configuration": {
          "hideClusters": "none"
        },
        "views": [
          {
            "id": "ClusterLayerView",
            "viewModelId": "ClusterLayerViewModel",
            "markup": "Mapping/modules/ClusterLayers/ClusterLayerView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.clusterLayers.ClusterLayerView",
            "require": "Mapping/modules/ClusterLayers/ClusterLayerView",
            "region": "LayerVisualizationRegion",
            "visible": false,
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ClusterLayerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.clusterLayers.ClusterLayerViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Collaboration",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CollaborationModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "CollaborationView",
            "viewModelId": "CollaborationViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CollaborationView",
            "markup": "Mapping/modules/Collaboration/Views/Collaboration/CollaborationView.html",
            "require": "Mapping/modules/Collaboration/Views/Collaboration/CollaborationView",
            "region": "CollaborationContainerRegion",
            "title": "@language-collaboration",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "CollaborationMarkupStyleSelectorView",
            "markup": "Mapping/modules/Collaboration/Views/Collaboration/CollaborationMarkupStyleSelectorView.html",
            "viewModelId": "CollaborationViewModel",
            "title": "@language-collaboration-symbology-title",
            "region": "CollaborationContainerRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CollaborationMarkupStyleSelectorView",
            "require": "Mapping/modules/Collaboration/Views/Collaboration/CollaborationMarkupStyleSelectorView",
            "visible": false
          },
          {
            "id": "EventCopyView",
            "markup": "Mapping/modules/Collaboration/Events/EventCopyView.html",
            "viewModelId": "CollaborationViewModel",
            "title": "@language-collaboration-copy-event-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.events.EventCopyView",
            "require": "Mapping/modules/Collaboration/Events/EventCopyView",
            "visible": false
          },
          {
            "id": "EventEditView",
            "markup": "Mapping/modules/Collaboration/Events/EventEditView.html",
            "viewModelId": "EventEditViewModel",
            "title": "@language-collaboration-edit-event-message-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.events.EventEditView",
            "require": "Mapping/modules/Collaboration/Events/EventEditView",
            "visible": false
          }
        ],
        "viewModels": [
          {
            "id": "EventEditViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.events.EventEditViewModel",
            "require": "Mapping/modules/Collaboration/Events/EventEditViewModel",
            "configuration": {
              "characterLimit": 1000,
              "editableTypes": [
                "ShareMarkupEvent",
                "ShareImageEvent"
              ]
            }
          },
          {
            "id": "CollaborationViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CollaborationViewModel",
            "require": "Mapping/modules/Collaboration/Views/Collaboration/CollaborationViewModel",
            "configuration": {
              "characterLimit": 1000,
              "numEventsToFetch": 25,
              "initialRooms": [],
              "previewViewSize": {
                "height": 50,
                "width": 50
              },
              "thumbnailViewSize": {
                "height": 200,
                "width": 200
              },
              "icons": {
                "photoIcon": {
                  "iconUrl": "Resources/Images/Pushpins/map-marker-image-24.png",
                  "width": 24,
                  "height": 24,
                  "offsetY": 0,
                  "offsetX": 0
                },
                "unpostedPhotoIcon": {
                  "iconUrl": "Resources/Images/Pushpins/map-marker-image-24.png",
                  "width": 24,
                  "height": 24,
                  "offsetY": 0,
                  "offsetX": 0
                }
              },
              "tools": [
                {
                  "name": "SetCollaborationImageLocation",
                  "displayName": "@language-toolbar-markup-point",
                  "tooltip": "@language-toolbar-markup-point-tooltip",
                  "command": "SetCollaborationImageLocation",
                  "drawMode": "POINT",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                  "statusText": "@language-collaboration-chat-image-manually-locate-status"
                }
              ],
              "markupTools": [
                {
                  "name": "CollaborationPointDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-point",
                  "tooltip": "@language-toolbar-markup-point-tooltip",
                  "drawMode": "POINT",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-point-24.png",
                  "statusText": "@language-collaboration-draw-point"
                },
                {
                  "name": "CollaborationLineDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-polyline",
                  "tooltip": "@language-toolbar-markup-polyline-tooltip",
                  "drawMode": "POLYLINE",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-polyline-24.png",
                  "statusText": "@language-collaboration-polyline-line"
                },
                {
                  "name": "CollaborationFreehandDraw",
                  "displayName": "@language-toolbar-markup-freehand",
                  "tooltip": "@language-toolbar-markup-freehand-tooltip",
                  "command": "CollaborationDraw",
                  "drawMode": "FREEHAND_POLYLINE",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-freehand-24.png",
                  "statusText": "@language-collaboration-draw-freehand",
                  "default": true
                },
                {
                  "name": "CollaborationCircleDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-circle",
                  "tooltip": "@language-toolbar-markup-circle-tooltip",
                  "drawMode": "CIRCLE",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-circle-24.png",
                  "statusText": "@language-collaboration-draw-circle"
                },
                {
                  "name": "CollaborationEllipseDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-ellipse",
                  "tooltip": "@language-toolbar-markup-ellipse-tooltip",
                  "drawMode": "ELLIPSE",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-ellipse-24.png",
                  "statusText": "@language-collaboration-draw-ellipse"
                },
                {
                  "name": "CollaborationRectangleDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-rectangle",
                  "tooltip": "@language-toolbar-markup-rectangle-tooltip",
                  "drawMode": "RECTANGLE",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-rectangle-24.png",
                  "statusText": "@language-collaboration-draw-rectangle"
                },
                {
                  "name": "CollaborationPolygonDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-polygon",
                  "tooltip": "@language-toolbar-markup-polygon-tooltip",
                  "drawMode": "POLYGON",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-24.png",
                  "statusText": "@language-collaboration-draw-polygon"
                },
                {
                  "name": "CollaborationFreehandPolygonDraw",
                  "command": "CollaborationDraw",
                  "displayName": "@language-toolbar-markup-freehand-polygon",
                  "tooltip": "@language-toolbar-markup-freehand-polygon-tooltip",
                  "drawMode": "FREEHAND_POLYGON",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png",
                  "statusText": "@language-collaboration-draw-freehand-polygon"
                },
                {
                  "name": "CollaborationTextDraw",
                  "command": "CollaborationDrawText",
                  "displayName": "@language-toolbar-markup-text",
                  "tooltip": "@language-toolbar-markup-text-tooltip",
                  "drawMode": "POINT",
                  "isSticky": true,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-text-24.png",
                  "statusText": "@language-collaboration-draw-text"
                }
              ],
              "eventTypes": [
                {
                  "name": "MessageEvent",
                  "widgetId": "MessageEventWidget",
                  "visible": true,
                  "automatic": false
                },
                {
                  "name": "ShareMarkupEvent",
                  "widgetId": "ShareMarkupEventWidget",
                  "visible": true,
                  "automatic": false
                },
                {
                  "name": "ClearEvent",
                  "widgetId": "CardEventWidget",
                  "visible": true,
                  "automatic": false
                },
                {
                  "name": "CardEvent",
                  "widgetId": "CardEventWidget",
                  "visible": false,
                  "default": true,
                  "automatic": false
                },
                {
                  "name": "ShareImageEvent",
                  "widgetId": "ShareImageEventWidget",
                  "visible": true,
                  "automatic": false
                },
                {
                  "name": "UserLeftEvent",
                  "widgetId": "UserLeftEventWidget",
                  "visible": true,
                  "automatic": true
                },
                {
                  "name": "UserJoinedEvent",
                  "widgetId": "UserJoinedEventWidget",
                  "visible": true,
                  "automatic": true
                },
                {
                  "name": "DeleteMarkupEvent",
                  "widgetId": "DeleteMarkupEventWidget",
                  "visible": true,
                  "automatic": false
                }
              ],
              "eventWidgets": [
                {
                  "id": "MessageEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.MessageEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.MessageEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/CardEvent/CardEventView.html",
                  "libraryId": "Mapping"
                },
                {
                  "id": "ShareMarkupEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.ShareMarkupEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.ShareMarkupEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/CardEvent/CardEventView.html",
                  "libraryId": "Mapping",
                  "configuration": {
                    "canEdit": true,
                    "icons": {
                      "active": "Resources/Images/Icons/edit-markup-inactive-24.png",
                      "deleted": "Resources/Images/Icons/close-24.png"
                    }
                  }
                },
                {
                  "id": "CardEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CardEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.CardEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/CardEvent/CardEventView.html",
                  "libraryId": "Mapping"
                },
                {
                  "id": "ShareImageEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.ImageEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.ImageEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/CardEvent/CardEventView.html",
                  "libraryId": "Mapping",
                  "configuration": {
                    "canEdit": true
                  }
                },
                {
                  "id": "UserLeftEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.UserLeftEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.UserLeftEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/BannerEvent/BannerEventView.html",
                  "libraryId": "Mapping"
                },
                {
                  "id": "UserJoinedEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.UserJoinedEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.UserJoinedEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/BannerEvent/BannerEventView.html",
                  "libraryId": "Mapping"
                },
                {
                  "id": "DeleteMarkupEventWidget",
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.DeleteMarkupEventView",
                  "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.collaboration.DeleteMarkupEventViewModel",
                  "markup": "Mapping/modules/Collaboration/Events/BannerEvent/BannerEventView.html",
                  "libraryId": "Mapping"
                }
              ],
              "enabled": false
            }
          }
        ]
      },
      {
        "moduleName": "CompactToolbar",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarModule",
        "require": "Mapping/modules/Toolbar/CompactToolbarModule",
        "configuration": {
          "isEnabled": true,
          "transientElements": [
            {
              "stateName": "MeasureState",
              "widgetId": "CompactToolbarTransientBase",
              "region": "CompactToolbarTransientRegion",
              "items": []
            },
            {
              "stateName": "MeasureState",
              "widgetId": "MeasurementToolTransientToolbar",
              "region": "CompactToolbarTransientRegion"
            },
            {
              "stateName": "DrawMarkupState",
              "widgetId": "CompactToolbarTransientBase",
              "region": "CompactToolbarTransientRegion",
              "items": [
                {
                  "id": "ChangeMarkupStyle",
                  "type": "toggleButton",
                  "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png",
                  "toggleStateName": "MarkupStyleToggleState",
                  "toggleOn": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  },
                  "toggleOff": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  }
                }
              ]
            },
            {
              "stateName": "EditingMarkupState",
              "widgetId": "CompactToolbarTransientBase",
              "region": "CompactToolbarTransientRegion",
              "items": [
                {
                  "id": "ChangeMarkupStyle",
                  "type": "toggleButton",
                  "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png",
                  "toggleStateName": "MarkupStyleToggleState",
                  "toggleOn": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  },
                  "toggleOff": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  }
                }
              ]
            },
            {
              "stateName": "EditingMeasurementMarkupState",
              "widgetId": "MeasurementToolTransientToolbar",
              "region": "CompactToolbarTransientRegion"
            },
            {
              "stateName": "FindDataState",
              "widgetId": "CompactToolbarTransientBase",
              "region": "CompactToolbarTransientRegion",
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
              "widgetId": "CompactToolbarTransientBase",
              "region": "CompactToolbarTransientRegion",
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
            }
          ],
          "toolbarGroups": [
            {
              "id": "compactToolbar",
              "type": "toolbarGroup",
              "name": "Compact Toolbar",
              "isDefault": false,
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
            "require": "Mapping/modules/Toolbar/CompactToolbar/CompactToolbarViewModel",
            "configuration": {
              "toggleCommandDisablesView": true,
              "toolbarVisibleTools": 4,
              "toolbarOpenByDefault": false,
              "toolbarGroupRefs": [
                "compactToolbar"
              ]
            }
          },
          {
            "id": "CompactToolbarTransientViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.transients.TransientViewModel",
            "require": "Mapping/modules/Toolbar/Transients/TransientViewModel",
            "configuration": {}
          },
          {
            "id": "NavButtonViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavButtonViewModel",
            "require": "Mapping/modules/Shells/Components/Navigation/NavButtonViewModel",
            "configuration": {}
          }
        ],
        "views": [
          {
            "id": "IWantToMenuButtonView",
            "visible": true,
            "viewModelId": "IWantToMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuButtonView",
            "require": "Mapping/modules/IWantToMenu/IWantToMenuButtonView",
            "markup": "Mapping/modules/IWantToMenu/IWantToMenuButtonView.html",
            "region": "HeaderRegion",
            "configuration": {}
          },
          {
            "id": "SearchView",
            "viewModelId": "SearchViewModel",
            "visible": true,
            "isManaged": false,
            "title": "@language-search-title",
            "iconUri": "Resources/Images/Icons/Toolbar/search-results-24.png",
            "markup": "Mapping/modules/Search/SearchView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchView",
            "require": "Mapping/modules/Search/SearchView",
            "region": "HeaderRegion",
            "configuration": {}
          },
          {
            "id": "CompactToolbarView",
            "viewModelId": "CompactToolbarViewModel",
            "visible": false,
            "title": "@language-compact-toolbar-name",
            "region": "TopRightShellRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.CompactToolbarView",
            "require": "Mapping/modules/Toolbar/CompactToolbar/CompactToolbarView",
            "markup": "Mapping/modules/Toolbar/CompactToolbar/CompactToolbarView.html",
            "configuration": {}
          },
          {
            "id": "CompactToolbarFlyoutView",
            "viewModelId": "CompactToolbarViewModel",
            "visible": false,
            "isManaged": false,
            "title": "@language-toolbar-multi-tool",
            "region": "MiscViewContainerRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarFlyoutView",
            "require": "Mapping/modules/Toolbar/ToolbarFlyoutView",
            "markup": "Mapping/modules/Toolbar/Templates/ToolbarFlyoutDropdownTemplate.html",
            "configuration": {
              "showXButton": true
            }
          },
          {
            "id": "CompactToolbarButtonView",
            "viewModelId": "CompactToolbarViewModel",
            "visible": true,
            "region": "HeaderRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarButtonView",
            "require": "Mapping/modules/Toolbar/ToolbarButtonView",
            "markup": "Mapping/modules/Toolbar/ToolbarButtonView.html"
          },
          {
            "id": "NavBarSmallView",
            "viewModelId": "BottomPanelViewContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavBarSmallView",
            "markup": "Mapping/modules/Shells/Components/NavBarSmallView.html",
            "require": "Mapping/modules/Shells/Components/NavBarSmallView",
            "region": "SmallNavigationRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "NavButtonView",
            "viewModelId": "NavButtonViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavButtonView",
            "markup": "Mapping/modules/Shells/Components/Navigation/NavButtonView.html",
            "require": "Mapping/modules/Shells/Components/Navigation/NavButtonView",
            "region": "BottomRightMapRegion",
            "visible": true,
            "configuration": {}
          }
        ],
        "isEnabled": false
      },
      {
        "moduleName": "Confirm",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.confirm.ConfirmModule",
        "deferLoading": true,
        "configuration": {
          "confirmRegion": "ModalWindowRegion",
          "overrideNativeConfirm": true
        }
      },
      {
        "moduleName": "Editing",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditingModule",
        "deferLoading": true,
        "configuration": {
          "behaviors": [
            {
              "name": "EditorFeatureSelectedBehavior",
              "commands": [
                "ZoomToFeature"
              ]
            },
            {
              "name": "EditorRemoveFeatureSelectedBehavior",
              "commands": []
            },
            {
              "name": "CutFeatureToolActivatedBehavior",
              "event": "CutFeatureToolActivatedEvent",
              "commands": [
                "CloseDataFrame"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "TemplatePickerView",
            "viewModelId": "TemplatePickerViewModel",
            "iconUri": "Resources/Images/Icons/Toolbar/file-add-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerView",
            "markup": "Mapping/modules/Editing/TemplatePicker/TemplatePickerView.html",
            "require": "Mapping/modules/Editing/TemplatePicker/TemplatePickerView",
            "region": "ResultsViewContainerRegion",
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
            "require": "Mapping/modules/Editing/Editor/EditorView",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-common-feature-editing",
            "description": "@language-common-feature-editing-desc",
            "configuration": {
              "showXButton": false
            }
          },
          {
            "id": "CreateOrEditView",
            "viewModelId": "CreateOrEditViewModel",
            "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.CreateOrEditView",
            "markup": "Mapping/modules/Editing/CreateOrEdit/CreateOrEditView.html",
            "require": "Mapping/modules/Editing/CreateOrEdit/CreateOrEditView",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "title": "@language-feature-editing-create-edit",
            "description": "@language-feature-editing-create-edit-description",
            "configuration": {}
          },
          {
            "id": "MultiFeatureSelectorView",
            "viewModelId": "MultiFeatureSelectorViewModel",
            "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.FeatureSelector.FeatureSelectorView",
            "require": "geocortex/infrastructure/ui/components/FeatureSelector/FeatureSelectorView",
            "markup": "Mapping/infrastructure/ui/components/FeatureSelector/FeatureSelectorView.html",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "title": "@language-feature-editing-multi-feature-selector",
            "description": "@language-feature-editing-multi-feature-selector-description",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "TemplatePickerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerViewModel",
            "require": "Mapping/modules/Editing/TemplatePicker/TemplatePickerViewModel",
            "configuration": {}
          },
          {
            "id": "CreateOrEditViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.CreateOrEditViewModel",
            "require": "Mapping/modules/Editing/CreateOrEdit/CreateOrEditViewModel",
            "configuration": {
              "searchRadiusMeters": 100,
              "tools": [
                {
                  "name": "SelectFeaturesForEditingTool",
                  "command": "SelectFeatureForEditing",
                  "drawMode": "RECTANGLE",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/identify-rectangle-24.png",
                  "statusText": "@language-feature-editing-mbl-rectangle-tool"
                }
              ]
            }
          },
          {
            "id": "MultiFeatureSelectorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.MultiFeatureSelectorViewModel",
            "require": "Mapping/modules/Editing/MultiFeatureSelector/MultiFeatureSelectorViewModel",
            "configuration": {
              "displayResultPickerTemplateComplexity": "complex"
            }
          },
          {
            "id": "EditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditorViewModel",
            "require": "Mapping/modules/Editing/Editor/EditorViewModel",
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
          }
        ]
      },
      {
        "moduleName": "ExportMap",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "ExportMapView",
            "viewModelId": "ExportMapViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapView",
            "markup": "Mapping/modules/ExportMap/ExportMapView.html",
            "region": "MiscViewContainerRegion",
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
        "moduleName": "ExportWebMap",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.exportWebMap.ExportWebMapModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "ExportWebMapView",
            "viewModelId": "ExportWebMapViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.exportWebMap.ExportWebMapView",
            "markup": "Mapping/modules/ExportWebMap/ExportWebMapView.html",
            "region": "ModalWindowRegion",
            "visible": false,
            "title": "@language-export-web-map-description",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ExportWebMapViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.exportWebMap.ExportWebMapViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "FeatureDetails",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsModule",
        "deferLoading": true,
        "configuration": {
          "defaultViewMode": "compact",
          "viewModes": {
            "compact": {
              "viewId": "FeatureDetailsCompactView",
              "defaultProviderTargetRegion": "FeatureRegion"
            }
          },
          "behaviors": [
            {
              "name": "FeatureDetailsOpenedBehavior",
              "commands": [
                "ZoomToFeature",
                "FocusFeature"
              ]
            },
            {
              "name": "FeatureDetailsClosedBehavior",
              "commands": [
                "ClearFeatureFocus"
              ]
            }
          ],
          "providers": [
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.FeatureActionsViewModel",
              "viewId": "FeatureActionsProviderView",
              "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.FeatureActionsView",
              "title": "@language-feature-actions",
              "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/FeatureActionsView.html",
              "viewConfig": {
                "menuId": "FeatureActions"
              }
            },
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
              "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/RelatedFeaturesView.html",
              "title": "@language-feature-related-features"
            },
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.SearchTablesRelatedFeaturesViewModel",
              "viewId": "SearchTablesFeatureRelationsProviderView",
              "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.RelatedFeaturesView",
              "iconUri": "Resources/Images/Icons/Toolbar/file-multi-24.png",
              "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/RelatedFeaturesView.html",
              "title": "@language-feature-related-features"
            },
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksViewModel",
              "viewId": "FeatureDataLinksProviderView",
              "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksView",
              "iconUri": "Resources/Images/Icons/Toolbar/details-24.png",
              "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/DataLinksView.html",
              "title": "@language-feature-datalinks",
              "config": {
                "dataLinkDetailsView": "ResultsViewContainerRegion"
              }
            }
          ]
        },
        "views": [
          {
            "id": "FeatureDetailsCompactView",
            "viewModelId": "FeatureDetailsCompactViewModel",
            "visible": false,
            "title": "@language-feature-details-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsView",
            "require": "Mapping/modules/FeatureDetails/FeatureDetailsView",
            "libraryId": "Framework.UI",
            "markup": "Framework.UI/geocortex/framework/ui/MultiRegion/MultiRegionView.html",
            "region": "ResultsViewContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "FeatureDetailsCompactViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsViewModel",
            "require": "Mapping/modules/FeatureDetails/FeatureDetailsViewModel",
            "configuration": {
              "regions": [
                {
                  "regionName": "FeatureRegion",
                  "regionType": "geocortex.framework.ui.DivStackRegionAdapter",
                  "regionCss": "feature-region"
                }
              ]
            }
          }
        ]
      },
      {
        "moduleName": "ContextMenu",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.ContextMenu.ContextMenuModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "ContextMenuView",
            "viewModelId": "ContextMenuViewModel",
            "iconUri": "Resources/Images/Icons/Toolbar/layers-extract-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.ContextMenu.ContextMenuView",
            "markup": "Mapping/modules/ContextMenu/ContextMenuView.html",
            "region": "ContextMenuRegion",
            "visible": false,
            "title": "@language-common-feature-layer-details",
            "description": "@language-common-feature-layer-details-desc",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ContextMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.ContextMenu.ContextMenuViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Geolocate",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "GeolocateView",
            "title": "@language-geolocate-title",
            "viewModelId": "GeolocateViewModel",
            "markup": "Mapping/modules/Geolocate/GeolocateView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateView",
            "region": "MiscViewContainerRegion",
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
              "geolocateEnabled": true,
              "trackingEnabled": true,
              "followingEnabled": true,
              "enableHighAccuracy": true,
              "singleGeolocationProfiles": {
                "default": {
                  "accuracyThreshold": 10,
                  "timeLimit": 30000
                },
                "coarse": {
                  "accuracyThreshold": 250,
                  "timeLimit": 10000
                },
                "fine": {
                  "accuracyThreshold": 3,
                  "timeLimit": 60000
                }
              },
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
        "moduleName": "GlobalMenu",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuModule",
        "configuration": {
          "menus": [
            {
              "id": "GlobalMenuConfig",
              "description": "@language-menu-menus-description",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": []
            }
          ]
        },
        "views": [
          {
            "id": "GlobalMenuView",
            "visible": true,
            "viewModelId": "GlobalMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuView",
            "markup": "Mapping/modules/GlobalMenu/GlobalMenuView.html",
            "region": "GlobalMenuRegion",
            "configuration": {
              "menuId": "GlobalMenuConfig"
            }
          }
        ],
        "viewModels": [
          {
            "id": "GlobalMenuViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuViewModel"
          }
        ]
      },
      {
        "moduleName": "HeatMaps",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.heatMaps.HeatMapsModule",
        "configuration": {
          "intensity": 30,
          "gradientOptions": {
            "outermostColor": "#00FFFFFF",
            "outerColor": "#FF0000FF",
            "innerColor": "#FFFF0000",
            "innermostColor": "#FFFFFF00"
          }
        },
        "views": [
          {
            "id": "HeatMapsView",
            "viewModelId": "HeatMapsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.heatMaps.HeatMapsView",
            "markup": "Mapping/modules/HeatMaps/HeatMapsView.html",
            "region": "LayerVisualizationRegion",
            "visible": false,
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "HeatMapsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.heatMaps.HeatMapsViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Highlight",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Highlight.HighlightModule",
        "configuration": {
          "fillColor": "RGBA(236,236,58,0.1)",
          "outerBorderColor": "RGBA(200,200,0,1)",
          "borderColor": "RGBA(255,255,151,1)",
          "focusedFillColor": "RGBA(0,255,255,0.4)",
          "focusedBorderColor": "RGBA(0,255,255,1)",
          "focusedOuterBorderColor": "RGBA(87,170,255,1)",
          "selectionFillColor": "RGBA(0,255,255,0.1)",
          "outerBorderWidth": 6,
          "borderWidth": 3,
          "focusScale": 1.67,
          "useFeatureColorForHighlight": false,
          "useFeatureColorForSelection": true,
          "highlightLineOpacity": 0.75,
          "maxHighlightableGeometryVertices": 5000,
          "geometryGeneralization": {
            "geometryGeneralizationEnabled": true,
            "thresholdVertices": 10000,
            "maxDeviationInMeters": 250
          }
        }
      },
      {
        "moduleName": "Identify",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyModule",
        "configuration": {
          "resultsDisplayName": "@language-identify-results-header",
          "topMostLayerOnly": false,
          "visibleLayersOnly": true,
          "layersInVisibleScaleRangeOnly": true,
          "pixelTolerance": 10,
          "polygonPixelTolerance": 5,
          "returnGeometry": true,
          "restrictRasterIdentifyToPoint": true,
          "identifyProviders": [
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.GraphicsLayerIdentifyProvider",
              "enabled": true,
              "configuration": {}
            },
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.MapIdentifyTaskIdentifyProvider",
              "enabled": true,
              "configuration": {}
            },
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.RasterIdentifyTaskIdentifyProvider",
              "enabled": true,
              "configuration": {}
            }
          ],
          "tools": [
            {
              "name": "IdentifyPointTool",
              "command": "Identify",
              "drawMode": "POINT",
              "isSticky": false,
              "iconUri": "Resources/Images/Icons/Toolbar/identify-24.png",
              "statusText": "@language-mbl-identify-point-tool",
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
              "statusText": "@language-mbl-identify-polyline-tool",
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
          ],
          "behaviors": [
            {
              "name": "SelectLayersForIdentifyActivatedBehavior",
              "event": "SelectLayersForIdentifyActivatedEvent",
              "commands": [
                "OpenDataFrame"
              ]
            },
            {
              "name": "SelectLayersForIdentifyDeactivatedBehavior",
              "event": "SelectLayersForIdentifyDeactivatedEvent",
              "commands": [
                "CloseDataFrame"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "IdentifyLayerSelectorView",
            "viewModelId": "IdentifyLayerSelectorViewModel",
            "title": "@language-layer-selector-identify-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyLayerSelectorView",
            "markup": "Mapping/modules/LayerSelector/LayerSelectorView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/layers-filtered-24.png",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "isManaged": false,
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "IdentifyOptionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyOptionsViewModel",
            "configuration": {}
          },
          {
            "id": "IdentifyLayerSelectorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyLayerSelectorViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Info",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoModule",
        "configuration": {},
        "views": [
          {
            "id": "InfoView",
            "viewModelId": "InfoViewModel",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoView",
            "markup": "Mapping/modules/Info/InfoView.html",
            "region": "MiscViewContainerRegion",
            "title": "@language-common-welcome",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "InfoViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoViewModel",
            "configuration": {
              "content": "%3Cdiv%20style%3D%22font-family%3ASegoe%20UI%20Light%2C%20Segoe%20UI%2C%20Arial%3B%20padding%3A20px%22%3E%20%3Cp%20style%3D%22color%3A%20%23000000%3B%20%20font-size%3A%2018px%3B%22%3E%0A%20%20%20%20%20%20%20%20Welcome%20to%20the%20Oregon%20Aquaculture%0A%20%20%20%20%20%20%20%20Map%20Viewer%20%3Cspan%20style%3D%22color%3A%20rgb(255%2C%200%2C%200)%3B%22%3E(BETA)%3C%2Fspan%3E!%20%3Cbr%3E%3C%2Fp%3E%3Cp%20style%3D%22color%3A%20%23000000%3B%20%20font-size%3A%2018px%3B%22%3E%3Cbr%3E%3C%2Fp%3E%3Cp%20style%3D%22color%3A%20%23000000%3B%20%20font-size%3A%2018px%3B%22%3E%3Cspan%20style%3D%22color%3A%20rgb(255%2C%200%2C%200)%3B%22%3EFor%20internal%20use%20only%20during%20development.%3C%2Fspan%3E%3Cbr%3E%3C%2Fp%3E%3Cbr%3E%0A%0A%20%20%20%20%3Cp%3E%0ANavigate%20to%20your%20site%20by%20searching%20an%20address%2C%20place%20name%2C%20or%20latitude%2Flongitude%20coordinates%20in%20the%20box%20below%3A%0A%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22position%3A%20relative%3B%20width%3A220px%3B%20margin%3A0%20auto%3B%22%3E%0A%3Cinput%20id%3D%22homePanelGeocoderSearchInput%22%20tabindex%3D%220%22%20placeholder%3D%22Search...%22%20title%3D%22Type%20your%20search%20terms%22%20style%3D%22height%3A%2024px%3B%20width%3A%20200px%3B%20font-size%3A13px%3B%22%20onkeypress%3D%22if(event.keyCode%3D%3D13)%7Bdocument.getElementById('homePanelGeocoderSearchInputButton').click()%7D%22%20type%3D%22text%22%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20id%3D%22homePanelGeocoderSearchInputButton%22%20onclick%3D%22geocortex.framework.applications%5B0%5D.commandRegistry.command('RunWorkflowWithArguments').execute(%7B'workflowId'%3A'Geocoder_Search'%2C'searchIn'%3Adocument.getElementById('homePanelGeocoderSearchInput').value%7D)%3B%20document.getElementById('homePanelGeocoderSearchInput').value%20%3D%20''%3B%22%20tabindex%3D%220%22%20style%3D%22position%3Aabsolute%3B%20top%3A%201px%3B%20left%3A%20210px%3B%20height%3A%2024px%3B%20width%3A%2024px%3B%20border%3A%200%3B%0A%20%20%20%20box-shadow%3A%20none%3B%20margin%3A0%3B%20padding%3A0%3B%20cursor%3Apointer%3B%20overflow%3Ahidden%3B%20background%3A%20url(Resources%2FImages%2FIcons%2FToolbar%2Fsearch-24.png)%20center%20center%20no-repeat%3B%22%3E%3C%2Fbutton%3E%0A%09%0A%3C%2Fp%3E%0A%0A%20%20%20%20%3Cp%3E%3Cbr%3E%3C%2Fp%3E%3Cp%3EClick%20button%20below%20to%20directly%20access%20the%20map%20layers%20or%20click%20on%20the%20%E2%80%9Clayers%E2%80%9D%20icon%20in%20the%20bottom%20left%20hand%20corner%20of%20this%20window.%20%20The%20home%20button%20gets%20you%20back%20to%20this%20introduction.%3C%2Fp%3E%3Cbr%3E%0A%20%20%20%20%3Cp%20style%3D%22text-align%3Acenter%22%3E%3Ca%20href%3D%22command%3ASwitchToLayerView%22%3E%3Cimg%20src%3D%22Resources%2FImages%2FCustom%2FGotoLayers.png%22%3E%3C%2Fa%3E%3C%2Fp%3E%0A%20%20%20%20%0A%20%20%20%20%3C%2Fdiv%3E%3Cdiv%20style%3D%22font-family%3ASegoe%20UI%20Light%2C%20Segoe%20UI%2C%20Arial%3B%20padding%3A20px%22%3E%3Cbr%3E%0A%20%20%20%20%3Cp%20style%3D%22text-align%3A%20center%3B%22%3E%26nbsp%3B%0A%20%20%20%20%20%20%20%20Send%20questions%20or%20feedback%20to%3A%20%3Ca%20href%3D%22mailto%3Avirtualoregon.support%40oregonstate.edu%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20virtualoregon.support%40oregonstate.edu%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%3Cbr%3E%3C%2Fdiv%3E",
              "included": true,
              "title": "@language-common-welcome"
            }
          }
        ]
      },
      {
        "moduleName": "InsightIntegration",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.insightIntegration.InsightIntegrationModule",
        "isEnabled": false,
        "configuration": {
          "dataRelayUri": "http://localhost/Geocortex/Analytics/ClientRelay",
          "dataRelayIntervalInSeconds": 30
        }
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
                  "iconUri": "Resources/Images/Icons/accessibility-24.png",
                  "text": "@language-menu-accessibility-panel",
                  "description": "@language-menu-accessibility-panel-desc",
                  "command": "ShowAccessibilityView",
                  "hideOnDisable": true
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
                  "iconUri": "Resources/Images/Icons/Toolbar/layers-reorder-24.png",
                  "text": "@language-layerDrawingOrder-button-title",
                  "description": "@language-layerDrawingOrder-button-desc",
                  "command": "OpenLayerDrawingOrderGroups"
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
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/star-show-24.png",
                  "text": "@language-menu-view-selection",
                  "description": "@language-menu-view-selection-desc",
                  "command": "ShowSelection",
                  "commandParameter": null,
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/basemap-24.png",
                  "text": "@language-basemap-switcher-view-name",
                  "description": "@language-basemap-switcher-view-description",
                  "command": "ActivateView",
                  "commandParameter": "BasemapSwitcherView"
                },
                {
                  "iconUri": "Resources/Images/Icons/lock-24.png",
                  "text": "@language-user-sign-in",
                  "description": "@language-user-sign-in-desc",
                  "command": "SignIn",
                  "hideOnDisable": true
                },
                {
                  "iconUri": "Resources/Images/Icons/lock-24.png",
                  "text": "@language-user-sign-out",
                  "description": "@language-user-sign-out-desc",
                  "command": "SignOut",
                  "hideOnDisable": true
                }
              ]
            }
          ]
        },
        "views": [
          {
            "id": "IWantToMenuView",
            "viewModelId": "IWantToMenuViewModel",
            "visible": false,
            "isManaged": true,
            "iconUri": "Resources/Images/Icons/arrow-down-small-16.png",
            "description": "@language-menu-description",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuView",
            "markup": "Mapping/modules/IWantToMenu/IWantToMenuView.html",
            "region": "LeftPanelRegion",
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
              "showGlobalMenu": true,
              "menuTitle": "@language-menu-title",
              "primaryButtonColor": "#1A72C4"
            }
          }
        ]
      },
      {
        "moduleName": "LabelOptions",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.labelOptions.LabelOptionsModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "LabelOptionsView",
            "title": "@language-labelOptions-title",
            "visible": false,
            "viewModelId": "LabelOptionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.labelOptions.LabelOptionsView",
            "markup": "Mapping/modules/LabelOptions/LabelOptionsView.html",
            "region": "LayerDataContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "LabelOptionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.labelOptions.LabelOptionsViewModel",
            "configuration": {
              "showLabels": true,
              "fontSize": {
                "min": 6,
                "max": 32,
                "value": 12,
                "step": 1
              },
              "fontColor": "#000000",
              "fontFamilies": [
                "Arial",
                "Cambria",
                "Georgia",
                "Times New Roman",
                "Verdana"
              ],
              "fontIsBold": false,
              "fontIsItalic": false,
              "fontIsUnderline": false,
              "haloSize": 0,
              "haloColor": "#000000",
              "showLabelsIsVisible": true,
              "fieldIsVisible": true,
              "fontSizeIsVisible": true,
              "fontColorIsVisible": true,
              "labelPlacementIsVisible": true,
              "fontFamiliesIsVisible": false,
              "fontStyleIsVisible": false,
              "haloSizeIsVisible": false,
              "haloColorIsVisible": false
            }
          }
        ]
      },
      {
        "moduleName": "LayerAddition",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.LayerAddition",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "AddLayerDialogView",
            "viewModelId": "LayerAdditionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.AddLayerDialogView",
            "require": "Mapping/modules/LayerAddition/Dialogs/AddLayerDialogView",
            "markup": "Mapping/modules/LayerAddition/Dialogs/AddLayerDialogView.html",
            "title": "@language-layer-addition-search-title",
            "region": "LayerAdditionContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "ServiceConnectionsDialogView",
            "viewModelId": "LayerAdditionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.ServiceConnectionsDialogView",
            "require": "Mapping/modules/LayerAddition/Dialogs/ServiceConnectionsDialogView",
            "markup": "Mapping/modules/LayerAddition/Dialogs/ServiceConnectionsDialogView.html",
            "title": "@language-layer-addition-service-connections-title",
            "region": "LayerAdditionContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "MapServicesDialogView",
            "viewModelId": "LayerAdditionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.MapServicesDialogView",
            "require": "Mapping/modules/LayerAddition/Dialogs/MapServicesDialogView",
            "markup": "Mapping/modules/LayerAddition/Dialogs/MapServicesDialogView.html",
            "title": "@language-layer-addition-map-services-title",
            "region": "LayerAdditionContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "SubLayersDialogView",
            "viewModelId": "LayerAdditionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.SubLayersDialogView",
            "require": "Mapping/modules/LayerAddition/Dialogs/SubLayersDialogView",
            "markup": "Mapping/modules/LayerAddition/Dialogs/SubLayersDialogView.html",
            "title": "@language-layer-addition-sub-layers-title",
            "region": "LayerAdditionContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "LayerPropertiesView",
            "title": "@language-layer-addition-layer-properties",
            "visible": false,
            "viewModelId": "LayerPropertiesViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.LayerPropertiesView",
            "markup": "Mapping/modules/LayerAddition/LayerPropertiesView.html",
            "region": "LayerDataContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "LayerAdditionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.LayerAdditionViewModel",
            "configuration": {
              "zoomToUserAddedLayers": true,
              "layerDefaults": {
                "searchable": true,
                "identifiable": true,
                "queryable": true,
                "showMapTips": true
              }
            }
          },
          {
            "id": "LayerPropertiesViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerAddition.LayerPropertiesViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "LayerCatalog",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerCatalog.LayerCatalogModule",
        "deferLoading": true,
        "configuration": {
          "layerCatalogProviders": [
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerCatalog.EssentialsSiteProvider",
              "enabled": true
            },
            {
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerCatalog.AssemblyProvider",
              "enabled": false
            }
          ]
        },
        "views": [
          {
            "id": "LayerCatalogView",
            "viewModelId": "PagedLayerCatalogViewModel",
            "visible": false,
            "title": "@language-layer-catalog-layercatalogview-title",
            "region": "ApplicationRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerCatalog.PagedLayerCatalogView",
            "markup": "Mapping/modules/LayerCatalog/PagedLayerCatalogView.html",
            "require": "Mapping/modules/LayerCatalog/PagedLayerCatalogView",
            "configuration": {
              "autocompleteEnabled": true,
              "minFilterLength": 3
            }
          }
        ],
        "viewModels": [
          {
            "id": "PagedLayerCatalogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerCatalog.PagedLayerCatalogViewModel",
            "configuration": {
              "infoLink": {
                "enabled": false,
                "command": "",
                "iconUri": "Resources/Images/Icons/info-12.png",
                "tooltip": "",
                "text": ""
              }
            }
          }
        ]
      },
      {
        "moduleName": "LayerDrawingOrder",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerDrawingOrder.LayerDrawingOrderModule",
        "configuration": {},
        "views": [
          {
            "id": "LayerGroupsDialogView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerDrawingOrder.LayerGroupsDialogView",
            "require": "Mapping/modules/LayerDrawingOrder/Dialogs/LayerGroupsDialogView",
            "markup": "Mapping/modules/LayerDrawingOrder/Dialogs/LayerGroupsDialogView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
            "viewModelId": "LayerDrawingOrderViewModel",
            "region": "DrawingOrderContainerRegion",
            "title": "@language-layerDrawingOrder-groups-title",
            "visible": false
          },
          {
            "id": "OrderServicesDialogView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerDrawingOrder.OrderServicesDialogView",
            "require": "Mapping/modules/LayerDrawingOrder/Dialogs/OrderServicesDialogView",
            "markup": "Mapping/modules/LayerDrawingOrder/Dialogs/OrderServicesDialogView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
            "viewModelId": "LayerDrawingOrderViewModel",
            "region": "DrawingOrderContainerRegion",
            "title": "@language-layerDrawingOrder-services-title",
            "visible": false
          },
          {
            "id": "OrderLayersDialogView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerDrawingOrder.OrderLayersDialogView",
            "require": "Mapping/modules/LayerDrawingOrder/Dialogs/OrderLayersDialogView",
            "markup": "Mapping/modules/LayerDrawingOrder/Dialogs/OrderLayersDialogView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
            "viewModelId": "LayerDrawingOrderViewModel",
            "region": "DrawingOrderContainerRegion",
            "title": "@language-layerDrawingOrder-layers-title",
            "visible": false
          }
        ],
        "viewModels": [
          {
            "id": "LayerDrawingOrderViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerDrawingOrder.LayerDrawingOrderViewModel"
          }
        ]
      },
      {
        "moduleName": "LayerList",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerListModule",
        "configuration": {
          "enableLegendIntegration": true,
          "onlyShowSwatchesOnVisibleLayers": false,
          "autoActivateAncestorVisibilities": true,
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
            "visible": true,
            "configuration": {
              "showStatusMessages": true
            }
          },
          {
            "id": "LayerActionsView",
            "viewModelId": "LayerActionsViewModel",
            "visible": false,
            "iconUri": "Resources/Images/Icons/Toolbar/layers-menu-24.png",
            "markup": "Mapping/modules/LayerList/LayerActions/LayerActionsView.html",
            "title": "@language-layer-actions-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.LayerActionsView",
            "require": "Mapping/modules/LayerList/LayerActions/LayerActionsView",
            "region": "LayerDataContainerRegion",
            "configuration": {
              "menuId": "LayerActions"
            }
          },
          {
            "id": "MapServiceActionsView",
            "viewModelId": "MapServiceActionsViewModel",
            "visible": false,
            "iconUri": "Resources/Images/Icons/Toolbar/layers-menu-24.png",
            "markup": "Mapping/modules/LayerList/MapServiceActions/MapServiceActionsView.html",
            "title": "@language-mapservice-actions-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerList.MapServiceActionsView",
            "require": "Mapping/modules/LayerList/MapServiceActions/MapServiceActionsView",
            "region": "LayerDataContainerRegion",
            "configuration": {
              "menuId": "MapServiceActions"
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
            "require": "Mapping/modules/LayerList/LayerActions/LayerActionsViewModel",
            "configuration": {}
          },
          {
            "id": "MapServiceActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
            "require": "geocortex/infrastructure/menus/MenuViewModel",
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
        "moduleName": "LayerSelector",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerSelector.LayerSelectorModule",
        "deferLoading": true,
        "configuration": {}
      },
      {
        "moduleName": "LayerStyles",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.layerStyles.LayerStylesModule",
        "configuration": {},
        "views": [
          {
            "id": "LayerStyleSelectorView",
            "markup": "Mapping/modules/LayerStyles/LayerStyleSelectorView.html",
            "viewModelId": "LayerStyleSelectorViewModel",
            "title": "@language-layerstyles-name",
            "region": "LayerVisualizationRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerStyles.LayerStyleSelectorView",
            "visible": false
          }
        ],
        "viewModels": [
          {
            "id": "LayerStyleSelectorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerStyles.LayerStyleSelectorViewModel",
            "configuration": {
              "showImageSelector": true
            }
          }
        ]
      },
      {
        "moduleName": "Legend",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendModule",
        "deferLoading": true,
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
        "moduleName": "Log",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogModule",
        "deferLoading": true,
        "views": [
          {
            "id": "LogView",
            "viewModelId": "LogViewModel",
            "visible": false,
            "isManaged": false,
            "title": "@language-common-view-log",
            "iconUri": "Resources/Images/Icons/log.png",
            "description": "@language-log-app-log",
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
        "moduleName": "MapTips",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipsModule",
        "deferLoading": true,
        "configuration": {
          "allowMultiple": false,
          "showNoResultMapTips": false,
          "contentField": "longDescription",
          "behaviors": [
            {
              "name": "MapTipOnCloseBehavior",
              "event": "MapTipClosedEvent",
              "commands": [
                "StopEditingClickableFeature"
              ]
            },
            {
              "name": "MapCalloutClosedBehavior",
              "event": "MapCalloutClosedEvent",
              "commands": [
                "StopEditingClickableFeature"
              ]
            },
            {
              "name": "MapTipFeatureChangedBehavior",
              "commands": [
                "PanToFeatureIfOutsideMapExtent",
                "StopAndAutoEditClickableFeature"
              ]
            }
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
          },
          "nullGeometryStatusMessageEnabled": true,
          "nullGeometryStatusMessageArgs": {
            "imageUri": "@language-map-tip-null-geometry-status-message-uri",
            "timeoutMS": 5000
          }
        },
        "views": [
          {
            "id": "MapTipView",
            "viewModelId": "MapTipViewModel",
            "markup": "Mapping/modules/MapTips/MapTipView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipView",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "configuration": {
              "openMinimized": true,
              "showXButton": false
            }
          },
          {
            "id": "MapTipContentView",
            "viewModelId": "MapTipViewModel",
            "markup": "Mapping/modules/MapTips/MapTipContent.html",
            "require": "Mapping/modules/MapTips/MapTipContent",
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
            "require": "Mapping/modules/MapTips/MapTipContentViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Markers",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.markers.MarkersModule",
        "deferLoading": true,
        "configuration": {
          "markers": []
        }
      },
      {
        "moduleName": "Markup",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupModule",
        "deferLoading": true,
        "viewModels": [
          {
            "id": "MarkupViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupViewModel",
            "configuration": {
              "markupLayerName": "Drawings",
              "styleSelectorRegion": "LayerDataContainerRegion",
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
                "textStyleWeight": "Bold",
                "textSize": "14pt",
                "textColor": "#FF000000",
                "textFamily": "Calibri",
                "textHaloColor": "#FFFFFFFF",
                "textHaloSize": 1
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
            "id": "MarkupTemplateSelectorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupTemplateSelectorViewModel",
            "require": "Mapping/modules/Markup/MarkupStyles/MarkupTemplateSelector/MarkupTemplateSelectorViewModel",
            "configuration": {
              "pointLibraries": [
                "Solid",
                "Hollow",
                "Black Outline"
              ],
              "lineLibraries": [
                "Thin",
                "Thick",
                "Thickest"
              ],
              "polygonLibraries": [
                "Transparent Fill",
                "Solid Fill",
                "Outline"
              ],
              "textLibraries": [
                "Sans-Serif",
                "Serif"
              ]
            }
          },
          {
            "id": "MarkupSymbolSelectorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupSymbolSelectorViewModel",
            "require": "Mapping/modules/Markup/MarkupStyles/MarkupSymbolSelector/MarkupSymbolSelectorViewModel",
            "configuration": {
              "symbologyConfig": {
                "userSelectedOutlineColor": true
              },
              "textSymbologyConfig": {}
            }
          },
          {
            "id": "MarkupStyleViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupStyleViewModel",
            "require": "Mapping/modules/Markup/MarkupStyles/MarkupStyleViewModel",
            "configuration": {
              "containerRegionName": "MarkupStyleSelectorRegion",
              "defaultDisplayName": "@language-markup-select-style",
              "containerTitle": "@language-markup-select-style",
              "enableImageSelector": true,
              "enableTemplateSelector": true,
              "enableSymbolSelector": true
            }
          },
          {
            "id": "TransientMarkupPaletteViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteViewModel",
            "require": "Mapping/modules/Markup/ToolPalettes/TransientMarkupPaletteViewModel",
            "configuration": {}
          }
        ],
        "views": [
          {
            "id": "MarkupStyleView",
            "viewModelId": "MarkupStyleViewModel",
            "require": "Mapping/modules/Markup/MarkupStyles/MarkupStyleView",
            "markup": "Mapping/modules/Markup/MarkupStyles/MarkupStyleView.html",
            "region": "LayerDataContainerRegion",
            "visible": false,
            "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png",
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
          "measurementFractionalDigits": 2,
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
            "id": "MeasurementUnitSwitcherView",
            "viewModelId": "MeasurementViewModel",
            "markup": "Mapping/modules/Measurement/MeasurementView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementView",
            "require": "Mapping/modules/Measurement/MeasurementView",
            "region": "MiscViewContainerRegion",
            "visible": false,
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
              "textSize": "12px",
              "highlightColor": "#FFFFFF",
              "outlineColor": "#000000",
              "outlineWidth": "1",
              "totalMeasurementTextColor": "#FFFFFF",
              "totalMeasurementHighlightColor": "#000000",
              "totalMeasurementOutlineColor": "#FFFFFF",
              "totalMeasurementOutlineWidth": "2",
              "highlightRadius": "5",
              "addMarkupToMapByDefault": true
            }
          }
        ]
      },
      {
        "moduleName": "Native",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.NativeIntegrationModule",
        "require": "Mapping/modules/Native/NativeModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "AttachFileView",
            "viewModelId": "AttachFileViewModel",
            "visible": false,
            "isManaged": false,
            "title": "@language-native-attach-file",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.AttachFileView",
            "require": "Mapping/modules/Native/AttachFileView",
            "markup": "Mapping/modules/Native/AttachFileView.html",
            "region": "ResultsViewContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "AttachFileViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.nativeIntegration.AttachFileViewModel",
            "require": "Mapping/modules/Native/AttachFileViewModel",
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
            "id": "GeolocateButtonView",
            "viewModelId": "GeolocateViewModel",
            "visible": true,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.geolocate.GeolocateView",
            "require": "Mapping/modules/Geolocate/GeolocateView",
            "markup": "Mapping/modules/Geolocate/GeolocateButtonView.html",
            "region": "BottomLeftMapRegion",
            "configuration": {}
          },
          {
            "id": "ZoomInView",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomInView",
            "require": "Mapping/modules/ZoomControl/ZoomInView",
            "markup": "Mapping/modules/ZoomControl/ZoomInView.html",
            "region": "NavigationMapRegion",
            "configuration": {}
          },
          {
            "id": "ZoomOutView",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomOutView",
            "require": "Mapping/modules/ZoomControl/ZoomOutView",
            "markup": "Mapping/modules/ZoomControl/ZoomOutView.html",
            "region": "NavigationMapRegion",
            "configuration": {}
          },
          {
            "id": "BookmarksButtonView",
            "viewModelId": "BookmarksViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksView",
            "require": "Mapping/modules/Bookmarks/BookmarksView",
            "markup": "Mapping/modules/Bookmarks/BookmarksButtonView.html",
            "region": "NavigationMapRegion",
            "visible": true
          }
        ],
        "viewModels": []
      },
      {
        "moduleName": "Notifications",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.notifications.NotificationsModule",
        "deferLoading": true,
        "configuration": {
          "region": "TopMapRegion"
        },
        "views": [],
        "viewModels": []
      },
      {
        "moduleName": "Offline",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.offline.OfflineModule",
        "deferLoading": true,
        "configuration": {},
        "views": [],
        "viewModels": []
      },
      {
        "moduleName": "OfflineMaps",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.OfflineMapsModule",
        "deferLoading": true,
        "configuration": {
          "aoiMask": {
            "enabled": false,
            "fillColor": null,
            "boundaryColor": "black",
            "boundaryWidth": 2,
            "boundaryStyle": "solid",
            "layerId": "OfflineMapsAOIMask",
            "matchMapBackground": false
          }
        },
        "views": [
          {
            "id": "ListOfflineMapsView",
            "title": "@language-offline-maps-list-title",
            "viewModelId": "OfflineMapsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.ListOfflineMapsView",
            "markup": "Mapping/modules/OfflineMaps/ListOfflineMapsView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {
              "sync": {
                "command": "StartOfflineSyncAndShowProgress",
                "commandParameter": {
                  "offlineMap": "{{offlineMap}}"
                }
              },
              "download": {
                "command": "StartOfflineDownloadAndShowProgress",
                "commandParameter": {
                  "offlineMap": "{{offlineMap}}"
                }
              }
            }
          },
          {
            "id": "ManageOfflineMapsView",
            "title": "@language-offline-maps-manage-title",
            "viewModelId": "OfflineMapsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.ManageOfflineMapsView",
            "markup": "Mapping/modules/OfflineMaps/ManageOfflineMapsView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {
              "newOfflineMap": {
                "command": "ShowOfflineMapEditor",
                "commandParameter": {}
              },
              "editOfflineMap": {
                "command": "ShowOfflineMapEditor",
                "commandParameter": {
                  "existingOfflineMap": "{{offlineMap}}"
                }
              }
            }
          },
          {
            "id": "OfflineMapEditorView",
            "title": "",
            "viewModelId": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.OfflineMapEditorView",
            "require": "Mapping/modules/OfflineMaps/Editor/OfflineMapEditorView",
            "markup": "Mapping/modules/OfflineMaps/Editor/OfflineMapEditorView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {
              "title": {
                "forNew": "@language-offlinemapeditor-new-title",
                "forExisting": "@language-offlinemapeditor-title"
              },
              "showLayersEditor": {
                "command": "ActivateView",
                "commandParameter": "OfflineMapEditorLayersView"
              },
              "showGeometryEditor": {
                "command": "ActivateView",
                "commandParameter": "OfflineMapEditorGeometryView"
              },
              "showBasemapsEditor": {
                "command": "ActivateView",
                "commandParameter": "OfflineMapEditorBasemapsView"
              },
              "showSharingEditor": {
                "command": "ActivateView",
                "commandParameter": "OfflineMapEditorSharingView"
              }
            }
          },
          {
            "id": "OfflineMapEditorLayersView",
            "title": "@language-offlinemapeditor-layers-title",
            "viewModelId": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.layers.OfflineMapEditorLayersView",
            "require": "Mapping/modules/OfflineMaps/Editor/Layers/OfflineMapEditorLayersView",
            "markup": "Mapping/modules/OfflineMaps/Editor/Layers/OfflineMapEditorLayersView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "OfflineMapEditorGeometryView",
            "title": "@language-offlinemapeditor-geometry-title",
            "viewModelId": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.geometry.OfflineMapEditorGeometryView",
            "require": "Mapping/modules/OfflineMaps/Editor/Geometry/OfflineMapEditorGeometryView",
            "markup": "Mapping/modules/OfflineMaps/Editor/Geometry/OfflineMapEditorGeometryView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {
              "geometrylayerId": "OfflineMapEditorGeometry",
              "fillColor": "rgba(200, 0, 0, 0.3)",
              "outlineColor": "rgba(200, 0, 0, 0.7)",
              "outlineWidth": 1,
              "offViewOpacity": 0.5
            }
          },
          {
            "id": "OfflineMapEditorBasemapsView",
            "title": "@language-offlinemapeditor-basemaps-title",
            "viewModelId": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.basemap.OfflineMapEditorBasemapsView",
            "require": "Mapping/modules/OfflineMaps/Editor/Basemap/OfflineMapEditorBasemapsView",
            "markup": "Mapping/modules/OfflineMaps/Editor/Basemap/OfflineMapEditorBasemapsView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {
              "showBasemapsLevelEditorView": {
                "command": "ShowOfflineMapEditorBasemapLevels",
                "commandParameter": {
                  "basemap": "{{basemap}}"
                }
              }
            }
          },
          {
            "id": "OfflineMapEditorBasemapLevelsView",
            "title": "@language-offlinemapeditor-basemaps-levels-title",
            "viewModelId": "OfflineMapEditorBasemapLevelsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.basemap.OfflineMapEditorBasemapLevelsView",
            "require": "Mapping/modules/OfflineMaps/Editor/Basemap/OfflineMapEditorBasemapLevelsView",
            "markup": "Mapping/modules/OfflineMaps/Editor/Basemap/OfflineMapEditorBasemapLevelsView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "OfflineMapEditorSharingView",
            "title": "@language-offlinemapeditor-sharing-title",
            "viewModelId": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.sharing.OfflineMapEditorSharingView",
            "require": "Mapping/modules/OfflineMaps/Editor/Sharing/OfflineMapEditorSharingView",
            "markup": "Mapping/modules/OfflineMaps/Editor/Sharing/OfflineMapEditorSharingView.html",
            "region": "OfflineMapsContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "SyncStatusView",
            "title": "@language-offline-maps-sync-title",
            "viewModelId": "SyncStatusViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.sync.SyncStatusView",
            "require": "Mapping/modules/OfflineMaps/Sync/SyncStatusView",
            "markup": "Mapping/modules/OfflineMaps/Sync/SyncStatusView.html",
            "region": "ModalWindowRegion",
            "visible": false,
            "configuration": {
              "showXButton": false
            }
          }
        ],
        "viewModels": [
          {
            "id": "OfflineMapsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.OfflineMapsViewModel",
            "configuration": {
              "saveOfflineMaps": true,
              "defaultThumbnail": "Resources/Images/Icons/map-no-preview-70x50.png",
              "menus": [
                {
                  "id": "ListOfflineMapsActions",
                  "description": "@language-menu-list-offline-maps-actions-desc",
                  "items": [
                    {
                      "text": "@language-menu-list-offline-maps-actions-refresh",
                      "description": "@language-menu-list-offline-maps-actions-refresh-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                      "command": "RefreshOfflineMapsList",
                      "commandParameter": null
                    },
                    {
                      "text": "@language-offline-maps-manage-button",
                      "description": "@language-offline-maps-manage-button-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/edit-24.png",
                      "command": "ActivateView",
                      "commandParameter": "ManageOfflineMapsView"
                    }
                  ]
                },
                {
                  "id": "ManageOfflineMapsActions",
                  "description": "@language-menu-list-offline-maps-actions-desc",
                  "items": [
                    {
                      "text": "@language-menu-list-offline-maps-actions-refresh",
                      "description": "@language-menu-list-offline-maps-actions-refresh-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/sync-24.png",
                      "command": "RefreshOfflineMapsList",
                      "commandParameter": null
                    }
                  ]
                }
              ]
            }
          },
          {
            "id": "OfflineMapEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.OfflineMapEditorViewModel",
            "require": "Mapping/modules/OfflineMaps/Editor/OfflineMapEditorViewModel",
            "configuration": {
              "thumbnail": {
                "width": 70,
                "height": 50,
                "dpi": 20
              },
              "onEditingStarted": [
                {
                  "command": "DeactivateView",
                  "commandParameter": "LayerDataContainerView"
                }
              ],
              "onEditingFinished": [
                {
                  "command": "ActivateView",
                  "commandParameter": "LayerDataContainerView"
                },
                {
                  "command": "ActivateView",
                  "commandParameter": "ManageOfflineMapsView"
                }
              ],
              "tools": [
                {
                  "name": "OfflineMapEditorCurrentExtentTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "CURRENT_EXTENT",
                  "isSticky": false
                },
                {
                  "name": "OfflineMapEditorPolygonTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "POLYGON",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-24.png",
                  "statusText": "@language-feature-editing-dsk-polygon-tool",
                  "keyboardStatusText": "@language-feature-editing-dsk-polygon-tool-keyboard"
                },
                {
                  "name": "OfflineMapEditorFreehandPolygonTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "FREEHAND_POLYGON",
                  "isSticky": false,
                  "statusText": "@language-feature-editing-dsk-freehand-polygon-tool"
                },
                {
                  "name": "OfflineMapEditorCircleTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "CIRCLE",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-circle-24.png",
                  "statusText": "@language-feature-editing-circle-tool"
                },
                {
                  "name": "OfflineMapEditorEllipseTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "ELLIPSE",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-ellipse-24.png",
                  "statusText": "@language-feature-editing-ellipse-tool"
                },
                {
                  "name": "OfflineMapEditorRectangleTool",
                  "command": "SetOfflineMapEditorGeometry",
                  "drawMode": "EXTENT",
                  "isSticky": false,
                  "iconUri": "Resources/Images/Icons/Toolbar/draw-rectangle-24.png",
                  "statusText": "@language-feature-editing-rectangle-tool"
                }
              ],
              "menus": [
                {
                  "id": "OfflineMapEditorGeometryActions",
                  "description": "@language-menu-offline-map-editor-geometry-actions-desc",
                  "items": [
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-clear",
                      "description": "@language-menu-offline-map-editor-geometry-actions-clear-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png",
                      "command": "SetOfflineMapEditorGeometry",
                      "commandParameter": null
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-currentextent",
                      "description": "@language-menu-offline-map-editor-geometry-actions-currentextent-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-extent-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorCurrentExtentTool"
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-polygon",
                      "description": "@language-menu-offline-map-editor-geometry-actions-polygon-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-polygon-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorPolygonTool"
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-freehandpolygon",
                      "description": "@language-menu-offline-map-editor-geometry-actions-freehandpolygon-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-freehand-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorFreehandPolygonTool"
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-circle",
                      "description": "@language-menu-offline-map-editor-geometry-actions-circle-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-circle-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorCircleTool"
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-ellipse",
                      "description": "@language-menu-offline-map-editor-geometry-actions-ellipse-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-ellipse-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorEllipseTool"
                    },
                    {
                      "text": "@language-menu-offline-map-editor-geometry-actions-rectangle",
                      "description": "@language-menu-offline-map-editor-geometry-actions-rectangle-desc",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-rectangle-24.png",
                      "command": "SetActiveTool",
                      "commandParameter": "OfflineMapEditorRectangleTool"
                    }
                  ]
                }
              ]
            }
          },
          {
            "id": "OfflineMapEditorBasemapLevelsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.editor.basemap.OfflineMapEditorBasemapLevelsViewModel",
            "require": "Mapping/modules/OfflineMaps/Editor/Basemap/OfflineMapEditorBasemapLevelsViewModel",
            "configuration": {}
          },
          {
            "id": "SyncStatusViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.offlineMaps.sync.SyncStatusViewModel",
            "require": "Mapping/modules/OfflineMaps/Sync/SyncStatusViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "PlotCoordinates",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.plotCoordinates.PlotCoordinatesModule",
        "configuration": {
          "behaviors": [
            {
              "name": "CoordinateListItemClickedBehavior",
              "commands": [
                "ClearDefaultHighlights",
                "PanToFeature",
                "HighlightFeatureDefault"
              ]
            },
            {
              "name": "CoordinateEditingStartedBehavior",
              "commands": [
                "HideCoordinateActions",
                "CloseDataFrame"
              ]
            },
            {
              "name": "CancelEditCoordinateBehavior",
              "commands": [
                "ClearActiveTool"
              ]
            },
            {
              "name": "CoordinateEditedBehavior",
              "event": "CoordinateEditedEvent",
              "commands": [
                "ClearDefaultHighlights",
                "ActivatePlotCoordinatesView",
                "OpenDataFrame"
              ]
            },
            {
              "name": "CoordinateDeletedBehavior",
              "event": "CoordinateDeletedEvent",
              "commands": [
                "ClearDefaultHighlights"
              ]
            },
            {
              "name": "CoordinateAddedBehavior",
              "event": "CoordinateAddedEvent",
              "commands": [
                "ClearDefaultHighlights",
                "ActivatePlotCoordinatesView",
                "OpenDataFrame"
              ]
            }
          ],
          "tools": [
            {
              "name": "PlotCoordinatesTool",
              "iconUri": "Resources/Images/Icons/Toolbar/coordinates-add-24.png",
              "command": "PlotCoordinates",
              "drawMode": "POINT",
              "tooltip": "@language-plotcoordinates-tool-tooltip",
              "hideOnDisable": false,
              "isSticky": false,
              "statusText": "@language-plotcoordinates-tool-status"
            }
          ]
        },
        "views": [
          {
            "id": "PlotCoordinatesView",
            "viewModelId": "PlotCoordinatesViewModel",
            "title": "@language-plotcoordinates-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.plotCoordinates.PlotCoordinatesView",
            "markup": "Mapping/modules/PlotCoordinates/PlotCoordinatesView.html",
            "region": "MiscViewContainerRegion",
            "iconUri": "Resources/Images/Icons/Toolbar/coordinates-map-tip-24.png",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "CoordinateActionsView",
            "viewModelId": "CoordinateActionsViewModel",
            "visible": false,
            "iconUri": "Resources/Images/Icons/menu-24.png",
            "markup": "Mapping/modules/PlotCoordinates/CoordinateActions/CoordinateActionsView.html",
            "title": "@language-plotcoordinates-coordinate-actions-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.plotCoordinates.CoordinateActionsView",
            "require": "Mapping/modules/PlotCoordinates/CoordinateActions/CoordinateActionsView",
            "region": "MiscViewContainerRegion",
            "configuration": {
              "menuId": "CoordinateActions"
            }
          }
        ],
        "viewModels": [
          {
            "id": "PlotCoordinatesViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.plotCoordinates.PlotCoordinatesViewModel",
            "configuration": {
              "isEnabled": true,
              "coordinatesModel": "MapCoordinatesModel"
            }
          },
          {
            "id": "CoordinateActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.plotCoordinates.CoordinateActionsViewModel",
            "require": "Mapping/modules/PlotCoordinates/CoordinateActions/CoordinateActionsViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Printing",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "PrintingView",
            "viewModelId": "PrintingViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingView",
            "markup": "Mapping/modules/Printing/PrintingView.html",
            "region": "MiscViewContainerRegion",
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
        "moduleName": "Project",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "ProjectActionsView",
            "viewModelId": "ProjectActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectActionsView",
            "markup": "Mapping/modules/Project/ProjectActionsView.html",
            "title": "@language-project-actions-title",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "configuration": {
              "menuId": "ProjectActions"
            }
          },
          {
            "id": "ProjectEditorView",
            "viewModelId": "ProjectEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectEditorView",
            "markup": "Mapping/modules/Project/ProjectEditorView.html",
            "title": "@language-project-editor-title",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "ProjectStatusView",
            "viewModelId": "ProjectStatusViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectStatusView",
            "markup": "Mapping/modules/Project/ProjectStatusView.html",
            "title": "@language-project-status-title",
            "region": "ModalWindowRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "ProjectsView",
            "viewModelId": "ProjectsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectsView",
            "markup": "Mapping/modules/Project/ProjectsView.html",
            "title": "@language-project-projects-title",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "ShareProjectView",
            "viewModelId": "ShareProjectViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ShareProjectView",
            "markup": "Mapping/modules/Project/ShareProjectView.html",
            "title": "@language-project-share-title",
            "region": "MiscViewContainerRegion",
            "visible": false,
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ProjectActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel",
            "require": "geocortex/infrastructure/menus/MenuViewModel",
            "configuration": {}
          },
          {
            "id": "ProjectEditorViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectEditorViewModel",
            "configuration": {}
          },
          {
            "id": "ProjectStatusViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectStatusViewModel",
            "configuration": {
              "showUrlOnSave": true
            }
          },
          {
            "id": "ProjectsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ProjectsViewModel",
            "configuration": {
              "defaultThumbnail": "Resources/Images/Icons/map-no-preview-70x50.png",
              "minimumFilterDelay": 300
            }
          },
          {
            "id": "ShareProjectViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.project.ShareProjectViewModel",
            "configuration": {
              "confirmSharedPublicly": true,
              "showGuestLinks": true
            }
          }
        ]
      },
      {
        "moduleName": "Prompt",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.prompt.PromptModule",
        "deferLoading": true,
        "configuration": {
          "promptRegion": "ModalWindowRegion"
        }
      },
      {
        "moduleName": "QueryBuilder",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.QueryBuilderModule",
        "deferLoading": true,
        "configuration": {
          "queryStatusRegion": "ResultsStatusRegion",
          "filterStatusRegion": "ResultsStatusRegion"
        },
        "views": [
          {
            "id": "SimpleQueryBuilderView",
            "viewModelId": "SimpleQueryBuilderViewModel",
            "iconUri": "Resources/Images/Icons/query-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderView",
            "markup": "Mapping/modules/QueryBuilder/SimpleQueryBuilderView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "isManaged": false,
            "title": "@language-querybuilder-simple-title",
            "configuration": {
              "wildcard": "%",
              "dateQueryFormat": "DATE '{0:yyyy-MM-dd HH:mm:ss}'",
              "textComparisonQueryFormat": "LOWER({0}) LIKE LOWER({1})",
              "numberToTextComparisonQueryFormat": "CAST({0} AS VARCHAR(50)) LIKE '{1}'",
              "doesNotContainQueryFormat": "LOWER({0}) NOT LIKE LOWER({1})",
              "allowDrawingsAsSpatialFilter": true,
              "queryProviderSupportsTimeOfDay": false,
              "mode": "query",
              "numberOfSuggestions": 10,
              "defaultLogicalOperator": "and"
            }
          },
          {
            "id": "SimpleFilterBuilderView",
            "viewModelId": "SimpleFilterBuilderViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderView",
            "require": "Mapping/modules/QueryBuilder/SimpleQueryBuilderView",
            "markup": "Mapping/modules/QueryBuilder/SimpleQueryBuilderView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "isManaged": false,
            "title": "@language-querybuilder-simple-filter-title",
            "configuration": {
              "wildcard": "%",
              "dateQueryFormat": "DATE '{0:yyyy-MM-dd HH:mm:ss}'",
              "textComparisonQueryFormat": "LOWER({0}) LIKE LOWER({1})",
              "numberToTextComparisonQueryFormat": "CAST({0} AS VARCHAR(50)) LIKE '{1}'",
              "doesNotContainQueryFormat": "LOWER({0}) NOT LIKE LOWER({1})",
              "allowDrawingsAsSpatialFilter": true,
              "queryProviderSupportsTimeOfDay": false,
              "mode": "filter",
              "numberOfSuggestions": 10,
              "defaultLogicalOperator": "and"
            }
          },
          {
            "id": "ListQueriesView",
            "viewModelId": "ListQueriesViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.ListQueriesView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-queries-title",
            "configuration": {}
          },
          {
            "id": "ListFiltersView",
            "viewModelId": "ListFiltersViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.ListQueriesView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-filters-title",
            "configuration": {}
          },
          {
            "id": "SaveQueryView",
            "viewModelId": "SaveQueryViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.SaveQueryView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-queries-title",
            "configuration": {}
          },
          {
            "id": "SaveFilterView",
            "viewModelId": "SaveFilterViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.SaveQueryView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-filters-title",
            "configuration": {}
          },
          {
            "id": "QueryActionsView",
            "viewModelId": "QueryActionsViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.QueryActionsView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-queries-title",
            "configuration": {
              "menuId": "QueryActions"
            }
          },
          {
            "id": "FilterActionsView",
            "viewModelId": "FilterActionsViewModel",
            "iconUri": "Resources/Images/Icons/filter-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.QueryActionsView",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsView",
            "markup": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-querybuilder-saved-queries-title",
            "configuration": {
              "menuId": "FilterActions"
            }
          }
        ],
        "viewModels": [
          {
            "id": "SimpleQueryBuilderViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderViewModel",
            "require": "Mapping/modules/QueryBuilder/SimpleQueryBuilderViewModel",
            "configuration": {}
          },
          {
            "id": "SimpleFilterBuilderViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SimpleQueryBuilderViewModel",
            "require": "Mapping/modules/QueryBuilder/SimpleQueryBuilderViewModel",
            "configuration": {}
          },
          {
            "id": "ListQueriesViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.ListQueriesViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesViewModel",
            "configuration": {
              "mode": "query"
            }
          },
          {
            "id": "ListFiltersViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.ListQueriesViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/ListQueriesViewModel",
            "configuration": {
              "mode": "filter"
            }
          },
          {
            "id": "SaveQueryViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.SaveQueryViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryViewModel",
            "configuration": {
              "mode": "query"
            }
          },
          {
            "id": "SaveFilterViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.SaveQueryViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/SaveQueryViewModel",
            "configuration": {
              "mode": "filter"
            }
          },
          {
            "id": "QueryActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.QueryActionsViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsViewModel",
            "configuration": {
              "mode": "query"
            }
          },
          {
            "id": "FilterActionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.queryBuilder.SavedQueries.QueryActionsViewModel",
            "require": "Mapping/modules/QueryBuilder/SavedQueries/QueryActionsViewModel",
            "configuration": {
              "mode": "filter"
            }
          }
        ]
      },
      {
        "moduleName": "Reporting",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.reporting.ReportingModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "ListReportsView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.reporting.ListReportsView",
            "markup": "Mapping/modules/Reporting/ListReportsView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
            "viewModelId": "ListReportsViewModel",
            "region": "MiscViewContainerRegion",
            "title": "@language-list-reports-title",
            "visible": false
          },
          {
            "id": "RunReportView",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.reporting.RunReportView",
            "markup": "Mapping/modules/Reporting/RunReportView.html",
            "iconUri": "Resources/Images/Icons/Toolbar/reports-24.png",
            "viewModelId": "RunReportViewModel",
            "region": "MiscViewContainerRegion",
            "title": "@language-run-report-title",
            "visible": false
          }
        ],
        "viewModels": [
          {
            "id": "ListReportsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.reporting.ListReportsViewModel"
          },
          {
            "id": "RunReportViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.reporting.RunReportViewModel"
          }
        ]
      },
      {
        "moduleName": "Results",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsModule",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "showInvisibleAttributesOnExport": false,
          "includeDataLinksOnExport": true,
          "enableDataLinkObjectIdFieldOnExport": true,
          "gcxObjectIdFieldNameOnExport": "GCX_OID",
          "resultMappings": {
            "Identify": [
              "ShowResultsList",
              "SetCollectionOfInterest"
            ],
            "MapTip": [
              "ShowMapTip"
            ],
            "Measurement": [],
            "Coordinates": [],
            "Workflow": [
              "ShowResultsList",
              "SetCollectionOfInterest"
            ],
            "Search": [
              "ShowResultsList",
              "SetCollectionOfInterest"
            ],
            "QueryBuilder": [
              "ShowResultsList",
              "SetCollectionOfInterest"
            ],
            "ClusterFeatures": [
              "ShowMapTipResults",
              "SetCollectionOfInterest"
            ],
            "Selection": [
              "ShowResultsList",
              "SetCollectionOfInterest"
            ]
          },
          "behaviors": [
            {
              "name": "ResultsListFeatureClickedBehavior",
              "event": "ResultsListFeatureClickedEvent",
              "commands": [
                "ShowFeatureDetails"
              ]
            },
            {
              "name": "FeatureSetClickedEventBehavior",
              "event": "FeatureSetClickedEvent",
              "commands": [
                "ShowFeatureSetResultsView"
              ]
            },
            {
              "name": "ResultsListFeaturePressedBehavior",
              "event": "ResultsListFeaturePressedEvent",
              "commands": [
                "ShowFeatureDetails"
              ]
            },
            {
              "name": "ResultsViewClosedBehavior",
              "event": "ResultsViewClosedEvent",
              "commands": []
            },
            {
              "name": "ResultsViewCollapsedBehavior",
              "event": "ResultsViewCollapsedEvent",
              "commands": []
            },
            {
              "name": "ResultsPageChangedBehavior",
              "commands": [
                "ClearAndHighlightFeatures"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "ResultsListView",
            "viewModelId": "ResultsListViewModel",
            "libraryId": "Mapping.Infrastructure",
            "isManaged": false,
            "visible": false,
            "title": "@language-common-results",
            "iconUri": "Resources/Images/Icons/results.png",
            "description": "@language-common-query-results",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsView",
            "markup": "Mapping/infrastructure/results/FeatureSetCollectionResultsView.html",
            "region": "ResultsViewContainerRegion",
            "configuration": {
              "contentField": "longDescription",
              "isPaged": true,
              "pageSize": 10,
              "automaticDrillInDelay": 300
            }
          },
          {
            "id": "FeatureSetResultsView",
            "viewModelId": "FeatureSetResultsViewModel",
            "libraryId": "Mapping.Infrastructure",
            "isManaged": false,
            "visible": false,
            "title": "@language-common-results",
            "iconUri": "Resources/Images/Icons/Toolbar/results.png",
            "description": "@language-common-query-results",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetResultsView",
            "markup": "Mapping/infrastructure/results/FeatureSetResultsView.html",
            "region": "ResultsViewContainerRegion",
            "configuration": {
              "contentField": "longDescription",
              "isPaged": true,
              "pageSize": 10,
              "showBackButton": true,
              "highlightMode": "default"
            }
          },
          {
            "id": "ResultsFeatureActionsView",
            "viewModelId": "FeatureSetResultsViewModel",
            "libraryId": "Mapping.Infrastructure",
            "isManaged": false,
            "visible": false,
            "title": "@language-common-results",
            "description": "@language-common-query-results",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsFeatureActionsView",
            "markup": "Mapping/infrastructure/results/ResultsFeatureActionsView.html",
            "region": "ResultsViewContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ResultsListViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsViewModel",
            "configuration": {}
          },
          {
            "id": "FeatureSetResultsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetResultsViewModel",
            "configuration": {}
          }
        ]
      },
      {
        "moduleName": "Scalebar",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarModule",
        "configuration": {},
        "views": [
          {
            "id": "ScalebarView",
            "visible": false,
            "title": "@language-scale-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarView",
            "markup": "Mapping/modules/Scalebar/ScalebarView.html",
            "region": "BottomLeftMapRegion",
            "configuration": {
              "scalebarStyle": "ruler",
              "scalebarUnit": "metric",
              "showBackground": true
            },
            "viewModelId": "ScalebarViewModel"
          },
          {
            "id": "ScaleInputBoxView",
            "visible": false,
            "title": "@language-scale-title",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScaleInputBoxView",
            "markup": "Mapping/modules/Scalebar/ScaleInputBoxView.html",
            "region": "MiscViewContainerRegion",
            "viewModelId": "ScalebarViewModel"
          }
        ],
        "viewModels": [
          {
            "id": "ScalebarViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.scalebar.ScalebarViewModel",
            "configuration": {
              "scaleInputBox": {
                "isEnabled": true,
                "openByDefault": false
              }
            }
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
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchTableSearchProvider",
              "enable": true
            },
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
        "views": [
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
            "id": "SearchViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchViewModel",
            "configuration": {
              "enableSearchRefinement": true,
              "delayConsecutiveSearches": false,
              "minimumPopulateDelay": 300,
              "minimumPrefixLength": 3
            }
          }
        ]
      },
      {
        "moduleName": "Selection",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.selection.SelectionModule",
        "deferLoading": true,
        "configuration": {
          "resultsListStatusRegion": "ResultsStatusRegion",
          "menus": [
            {
              "id": "CombineResultsActions",
              "description": "@language-menu-combine-results-desc",
              "defaultIconUri": "Resources/Images/Icons/check-24.png",
              "items": [
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-add-24.png",
                  "text": "@language-menu-combine-results-union",
                  "description": "@language-menu-combine-results-union-desc",
                  "command": "CombineResultsInteractive",
                  "commandParameter": {
                    "mode": "union",
                    "currentResults": "{{context}}"
                  }
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-subtract-24.png",
                  "text": "@language-menu-combine-results-subtract",
                  "description": "@language-menu-combine-results-subtract-desc",
                  "command": "CombineResultsInteractive",
                  "commandParameter": {
                    "mode": "subtract",
                    "currentResults": "{{context}}"
                  }
                },
                {
                  "iconUri": "Resources/Images/Icons/Toolbar/refine-intersect-24.png",
                  "text": "@language-menu-combine-results-intersect",
                  "description": "@language-menu-combine-results-intersect-desc",
                  "command": "CombineResultsInteractive",
                  "commandParameter": {
                    "mode": "intersect",
                    "currentResults": "{{context}}"
                  }
                }
              ]
            }
          ]
        },
        "views": [
          {
            "id": "SaveSelectionView",
            "viewModelId": "SaveSelectionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.SaveSelectionView",
            "markup": "Mapping/modules/Selection/SaveSelectionView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-saved-results-save-title",
            "configuration": {}
          },
          {
            "id": "ListSelectionsView",
            "viewModelId": "ListSelectionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.ListSelectionsView",
            "markup": "Mapping/modules/Selection/ListSelectionsView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-saved-results-browse-title",
            "configuration": {}
          },
          {
            "id": "CombineResultsView",
            "viewModelId": "CombineResultsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.CombineResultsView",
            "markup": "Mapping/modules/Selection/CombineResultsView.html",
            "region": "ResultsViewContainerRegion",
            "visible": false,
            "title": "@language-saved-results-combine-title",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "SaveSelectionViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.SaveSelectionViewModel",
            "configuration": {}
          },
          {
            "id": "ListSelectionsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.ListSelectionsViewModel",
            "configuration": {
              "isPaged": true,
              "pageSize": 5
            }
          },
          {
            "id": "CombineResultsViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.selection.CombineResultsViewModel",
            "configuration": {
              "isPaged": true,
              "pageSize": 5
            }
          }
        ]
      },
      {
        "moduleName": "Share",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.share.ShareModule",
        "deferLoading": true,
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
            "region": "MiscViewContainerRegion",
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
              "type": "geocortex.essentialsHtmlViewer.mapping.modules.basemap.BasemapSharingLinkProvider"
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
        "require": "Mapping/modules/Shells/ShellModule",
        "configuration": {
          "css": [
            "Resources/Styles/Custom/common.css",
            "Resources/Styles/Custom/Handheld.css",
            "Resources/Styles/SmallShell.css",
            "Resources/Styles/Custom/sites.css",
            "Resources/Styles/Custom/sites_handheld.css",
            "{ViewerConfigUri}../../Styles/Custom/common.css",
            "{ViewerConfigUri}../../Styles/Custom/Handheld_OE.css"
          ],
          "homePanelVisible": true
        },
        "views": [
          {
            "id": "BottomPanelViewContainerView",
            "viewModelId": "BottomPanelViewContainerViewModel",
            "visible": true,
            "isManaged": false,
            "iconUri": "Resources/Images/Icons/Toolbar/search-results-24.png",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.ShellPanelView",
            "require": "Mapping/modules/Shells/Components/Panels/ShellPanelView",
            "markup": "Mapping/modules/Shells/Components/Panels/ShellPanelView.html",
            "region": "BottomPanelRegion",
            "configuration": {}
          },
          {
            "id": "LayerDataContainerView",
            "viewModelId": "LayerDataContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "@language-common-layer-data",
            "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "CollaborationContainerView",
            "viewModelId": "CollaborationContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "@language-collaboration",
            "iconUri": "Resources/Images/Icons/collaboration-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "ResultsViewContainerView",
            "viewModelId": "ResultsViewContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "@language-common-results",
            "iconUri": "Resources/Images/Icons/Toolbar/search-results-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "OfflineMapsContainerView",
            "viewModelId": "OfflineMapsContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "@language-offline-maps-list-title",
            "iconUri": "Resources/Images/Icons/map-offline-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "MiscContainerView",
            "viewModelId": "MiscContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "Misc",
            "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "ModalContainerView",
            "viewModelId": "ModalContainerViewModel",
            "visible": false,
            "isManaged": false,
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "ApplicationRegion",
            "configuration": {}
          },
          {
            "id": "ShellView",
            "viewModelId": "ShellViewModel",
            "visible": true,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.SmallShellView",
            "markup": "Mapping/modules/Shells/Small/SmallShellView.html",
            "require": "Mapping/modules/Shells/Small/SmallShellView",
            "region": "ApplicationRegion",
            "configuration": {
              "resizeShell": true
            }
          },
          {
            "id": "LayerAdditionContainerView",
            "viewModelId": "LayerAdditionContainerViewModel",
            "visible": false,
            "isManaged": true,
            "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelView",
            "require": "geocortex/infrastructure/ui/components/WizardPanel/WizardPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "DrawingOrderContainerView",
            "viewModelId": "DrawingOrderContainerViewModel",
            "visible": false,
            "isManaged": true,
            "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelView",
            "require": "geocortex/infrastructure/ui/components/WizardPanel/WizardPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          },
          {
            "id": "WorkflowContainerView",
            "viewModelId": "WorkflowContainerViewModel",
            "visible": false,
            "isManaged": true,
            "title": "Workflow",
            "iconUri": "Resources/Images/Icons/Toolbar/workflow-24.png",
            "libraryId": "Mapping.Infrastructure",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
            "markup": "Mapping/infrastructure/ui/components/SmartPanel/SmartPanelView.html",
            "region": "BottomPanelViewContainerRegion",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "ShellViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.SmallShellViewModel",
            "require": "Mapping/modules/Shells/Small/SmallShellViewModel",
            "configuration": {
              "openToMaximum": false,
              "bottomPanelHeightPercent": 75
            }
          },
          {
            "id": "BottomPanelViewContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.ShellPanelViewModel",
            "require": "Mapping/modules/Shells/Components/Panels/ShellPanelViewModel",
            "configuration": {
              "containerRegionName": "BottomPanelViewContainerRegion",
              "menuRegion": "MiscViewContainerRegion",
              "headerIsVisible": true,
              "showHeaderForStandaloneViews": false,
              "backButtonOnRootView": false,
              "showBackButtonAsX": true,
              "showHostedViews": false,
              "ordering": {
                "LayerDataContainerView": 0,
                "ResultsViewContainerView": 1,
                "CollaborationContainerView": 2,
                "MiscContainerView": 3
              }
            }
          },
          {
            "id": "ResultsViewContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerManagedTitle": "@language-common-results",
              "containerRegionName": "ResultsViewContainerRegion",
              "statusRegionName": "ResultsStatusRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false,
              "ordering": {
                "SearchView": 0,
                "ResultsListView": 1,
                "ResultsFeatureActionsView": 2,
                "FeatureDetailsView": 3,
                "EditorView": 4
              }
            }
          },
          {
            "id": "LayerDataContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerTitle": "@language-layerlist-title",
              "containerRegionName": "LayerDataContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false,
              "ordering": {
                "LayerListView": 0,
                "MapServiceActionsView": 1,
                "LayerActionsView": 2,
                "LegendView": 3,
                "ServiceLayersFailureView": 4
              }
            }
          },
          {
            "id": "CollaborationContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerTitle": "@language-collaboration",
              "containerRegionName": "CollaborationContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false,
              "ordering": {
                "CollaborationView": 0
              }
            }
          },
          {
            "id": "MiscContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "MiscViewContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false,
              "ordering": {
                "InfoView": 0,
                "ToolbarFlyoutView": 1,
                "CompactToolbarFlyoutView": 2
              }
            }
          },
          {
            "id": "ModalContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "ModalWindowRegion",
              "backButtonOnRootView": true,
              "showBackButtonAsX": true
            }
          },
          {
            "id": "OfflineMapsContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "OfflineMapsContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false,
              "showBackButtonAsX": false,
              "showHostedViews": true,
              "ordering": {
                "ListOfflineMapsView": 0
              }
            }
          },
          {
            "id": "LayerAdditionContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/WizardPanel/WizardPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "LayerAdditionContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": true,
              "showBackButtonAsX": true,
              "showHostedViews": false,
              "ordering": {
                "AddLayerDialogView": 0,
                "ServiceConnectionsDialogView": 1,
                "MapServicesDialogView": 2,
                "SubLayersDialogView": 3
              }
            }
          },
          {
            "id": "DrawingOrderContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/WizardPanel/WizardPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "DrawingOrderContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": true,
              "showBackButtonAsX": true,
              "showHostedViews": false,
              "ordering": {
                "LayerGroupsDialogView": 0,
                "OrderServicesDialogView": 1,
                "OrderLayersDialogView": 2
              }
            }
          },
          {
            "id": "WorkflowContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel",
            "require": "geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
            "libraryId": "Mapping.Infrastructure",
            "configuration": {
              "containerRegionName": "WorkflowContainerRegion",
              "headerIsVisible": false,
              "backButtonOnRootView": false
            }
          }
        ]
      },
      {
        "moduleName": "Site",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.site.SiteModule",
        "configuration": {
            "siteUri": "https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/sites/Aquaculture"
        },
        "views": [
          {
            "id": "ServiceLayersFailureView",
            "viewModelId": "ServiceLayersFailureViewModel",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.ServiceLayersFailureView",
            "markup": "Mapping/modules/Site/ServiceLayersFailureView.html",
            "region": "LayerDataViewContainerRegion",
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
        "deferLoading": true,
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
        "require": "Mapping/modules/Toolbar/TabbedToolbarModule",
        "configuration": {
          "isEnabled": false,
          "transientElements": [
            {
              "stateName": "MeasureState",
              "widgetId": "TabbedToolbarTransientBase",
              "region": "TopRightShellRegion",
              "items": []
            },
            {
              "stateName": "MeasureState",
              "widgetId": "MeasurementToolTransientToolbar",
              "region": "TopRightShellRegion"
            },
            {
              "stateName": "DrawMarkupState",
              "widgetId": "TabbedToolbarTransientBase",
              "region": "TopRightShellRegion",
              "items": [
                {
                  "id": "ChangeMarkupStyle",
                  "type": "toggleButton",
                  "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png",
                  "toggleStateName": "MarkupStyleToggleState",
                  "toggleOn": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  },
                  "toggleOff": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "HideMarkupStyleView"
                  }
                }
              ]
            },
            {
              "stateName": "EditingMarkupState",
              "widgetId": "TabbedToolbarTransientBase",
              "region": "TopRightShellRegion",
              "items": [
                {
                  "id": "ChangeMarkupStyle",
                  "type": "toggleButton",
                  "iconUri": "Resources/Images/Icons/Toolbar/styles-24.png",
                  "toggleStateName": "MarkupStyleToggleState",
                  "toggleOn": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "CreateMarkupStyleView"
                  },
                  "toggleOff": {
                    "name": "@language-toolbar-markup-change-markup-style",
                    "tooltip": "@language-toolbar-markup-change-markup-style-tooltip",
                    "command": "HideMarkupStyleView"
                  }
                }
              ]
            },
            {
              "stateName": "EditingMeasurementMarkupState",
              "widgetId": "MeasurementToolTransientToolbar",
              "region": "TopRightShellRegion"
            },
            {
              "stateName": "FindDataState",
              "widgetId": "TabbedToolbarTransientBase",
              "region": "TopRightShellRegion",
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
              "region": "TopRightShellRegion",
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
            }
          ],
          "toolbarGroups": [
            {
              "id": "mUa7UpiS",
              "type": "toolbarGroup",
              "name": "Find",
              "isDefault": true,
              "items": [
                {
                  "id": "HomeButton",
                  "type": "button",
                  "iconUri": "Resources/Images/Icons/Toolbar/home-24.png",
                  "command": "ActivateHomePanel",
                  "commandParameter": null,
                  "hideOnDisable": false,
                  "name": "@language-toolbar-home-sub",
                  "tooltip": "@language-toolbar-home-tooltip"
                },
                {
                  "id": "8wef38jd",
                  "type": "toolbarGroup",
                  "name": "Navigation",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "NavigationGroup",
                      "type": "flyout",
                      "name": "@language-toolbar-group-navigation",
                      "layout": "Large",
                      "items": [
                        {
                          "id": "PanButton",
                          "type": "button",
                          "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                          "command": "ClearActiveTool",
                          "commandParameter": null,
                          "hideOnDisable": false,
                          "name": "@language-toolbar-navigation-pan",
                          "tooltip": "@language-toolbar-navigation-pan-tooltip"
                        },
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
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "TIPLIQoE",
                  "type": "toolbarGroup",
                  "name": "Find",
                  "layout": "Large",
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
                    }
                  ]
                }
              ]
            },
            {
              "id": "Wf0IiSCa",
              "type": "toolbarGroup",
              "name": "Layer",
              "isDefault": false,
              "items": [
                {
                  "id": "9adfei3h",
                  "type": "toolbarGroup",
                  "name": "Navigation",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "NavigationGroup",
                      "type": "flyout",
                      "name": "@language-toolbar-group-navigation",
                      "layout": "Large",
                      "items": [
                        {
                          "id": "PanButton",
                          "type": "button",
                          "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                          "command": "ClearActiveTool",
                          "commandParameter": null,
                          "hideOnDisable": false,
                          "name": "@language-toolbar-navigation-pan",
                          "tooltip": "@language-toolbar-navigation-pan-tooltip"
                        },
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
                      ]
                    }
                  ]
                },
                {
                  "id": "15IeHye2",
                  "type": "toolbarGroup",
                  "name": "Layers",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "ShowSimpleFilterBuilderButton",
                      "type": "button",
                      "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
                      "command": "ShowLayerList",
                      "commandParameter": null,
                      "hideOnDisable": false,
                      "name": "Layer List",
                      "tooltip": "Show layer list"
                    }
                  ]
                },
                {
                  "id": "Sgaefp5Z",
                  "type": "toolbarGroup",
                  "name": "Search",
                  "layout": "Large",
                  "items": [
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
                  ]
                },
                {
                  "id": "A73oiA9N",
                  "type": "toolbarGroup",
                  "name": "Add Layer(s)",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "UploadDataButton",
                      "type": "button",
                      "iconUri": "Resources/Images/Icons/Toolbar/upload-24.png",
                      "command": "UploadData",
                      "commandParameter": null,
                      "hideOnDisable": false,
                      "name": "@language-toolbar-tasks-upload-data",
                      "tooltip": "@language-toolbar-tasks-upload-data-tooltip"
                    }
                  ]
                },
                {
                  "id": "Q4iAJTaD",
                  "type": "toolbarGroup",
                  "name": "Links",
                  "layout": "Large",
                  "items": []
                }
              ]
            },
            {
              "id": "g3nDhty4",
              "type": "toolbarGroup",
              "name": "Create & Share",
              "isDefault": false,
              "items": [
                {
                  "id": "3jijdfad",
                  "type": "toolbarGroup",
                  "name": "Navigation",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "NavigationGroup",
                      "type": "flyout",
                      "name": "@language-toolbar-group-navigation",
                      "layout": "Large",
                      "items": [
                        {
                          "id": "PanButton",
                          "type": "button",
                          "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                          "command": "ClearActiveTool",
                          "commandParameter": null,
                          "hideOnDisable": false,
                          "name": "@language-toolbar-navigation-pan",
                          "tooltip": "@language-toolbar-navigation-pan-tooltip"
                        },
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
                      ]
                    }
                  ]
                },
                {
                  "id": "VytV4olt",
                  "type": "toolbarGroup",
                  "name": "Draw",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "DrawingTools",
                      "type": "flyout",
                      "name": "@language-toolbar-markup-drawing-tools",
                      "layout": "Large",
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
                      ]
                    }
                  ]
                },
                {
                  "id": "0tBcEhAN",
                  "type": "toolbarGroup",
                  "name": "Edit",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "EditingFlyout",
                      "type": "flyout",
                      "name": "@language-toolbar-group-editing",
                      "layout": "Large",
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
                          "id": "DeleteMarkupTool",
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
                          "id": "ClearMarkup",
                          "type": "button",
                          "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png",
                          "command": "ClearMarkup",
                          "commandParameter": null,
                          "hideOnDisable": false,
                          "name": "@language-toolbar-markup-clear",
                          "tooltip": "@language-toolbar-markup-clear-tooltip"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "g2Ec7T7R",
                  "type": "toolbarGroup",
                  "name": "Share",
                  "layout": "Large",
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
                      "id": "ExportMarkup",
                      "type": "button",
                      "iconUri": "Resources/Images/Icons/Toolbar/draw-extract-24.png",
                      "command": "ExportMarkupLayer",
                      "commandParameter": null,
                      "hideOnDisable": false,
                      "name": "@language-toolbar-markup-export",
                      "tooltip": "@language-toolbar-markup-export-tooltip"
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
                  ]
                }
              ]
            },
            {
              "id": "VsFdt8zF",
              "type": "toolbarGroup",
              "name": "Analysis",
              "isDefault": false,
              "items": [
                {
                  "id": "4lseind59a",
                  "type": "toolbarGroup",
                  "name": "Navigation",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "NavigationGroup",
                      "type": "flyout",
                      "name": "@language-toolbar-group-navigation",
                      "layout": "Large",
                      "items": [
                        {
                          "id": "PanButton",
                          "type": "button",
                          "iconUri": "Resources/Images/Icons/Toolbar/pan-24.png",
                          "command": "ClearActiveTool",
                          "commandParameter": null,
                          "hideOnDisable": false,
                          "name": "@language-toolbar-navigation-pan",
                          "tooltip": "@language-toolbar-navigation-pan-tooltip"
                        },
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
                      ]
                    }
                  ]
                },
                {
                  "id": "9HImRpyR",
                  "type": "toolbarGroup",
                  "name": "Measure",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "MeasurementTools",
                      "type": "flyout",
                      "name": "@language-toolbar-group-measurement-tools",
                      "layout": "Large",
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
                      ]
                    }
                  ]
                },
                {
                  "id": "MeasurementToolControlRegion",
                  "type": "region",
                  "regionName": "MeasurementToolControlRegion"
                },
                {
                  "id": "rlezqUoA",
                  "type": "toolbarGroup",
                  "name": "Edit Measurement",
                  "layout": "Large",
                  "items": [
                    {
                      "id": "DeleteMarkupTool",
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
                      "id": "ClearMarkup",
                      "type": "button",
                      "iconUri": "Resources/Images/Icons/Toolbar/clear-24.png",
                      "command": "ClearMarkup",
                      "commandParameter": null,
                      "hideOnDisable": false,
                      "name": "@language-toolbar-markup-clear",
                      "tooltip": "@language-toolbar-markup-clear-tooltip"
                    },
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
                    }
                  ]
                },
                {
                  "id": "EditControlRegion",
                  "type": "region",
                  "regionName": "EditControlRegion"
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
            "require": "Mapping/modules/IWantToMenu/IWantToMenuButtonView",
            "markup": "Mapping/modules/IWantToMenu/IWantToMenuButtonView.html",
            "region": "HeaderRegion",
            "configuration": {}
          },
          {
            "id": "SearchView",
            "viewModelId": "SearchViewModel",
            "visible": true,
            "isManaged": false,
            "title": "@language-search-title",
            "iconUri": "Resources/Images/Icons/Toolbar/search-results-24.png",
            "markup": "Mapping/modules/Search/SearchView.html",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchView",
            "require": "Mapping/modules/Search/SearchView",
            "region": "HeaderRegion",
            "configuration": {}
          },
          {
            "id": "TabbedToolbarButtonView",
            "viewModelId": "TabbedToolbarViewModel",
            "visible": true,
            "region": "HeaderRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarButtonView",
            "require": "Mapping/modules/Toolbar/ToolbarButtonView",
            "markup": "Mapping/modules/Toolbar/ToolbarButtonView.html"
          },
          {
            "id": "TabbedToolbarView",
            "viewModelId": "TabbedToolbarViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarView",
            "require": "Mapping/modules/Toolbar/TabbedToolbarView",
            "markup": "Mapping/modules/Toolbar/SmallToolbarView.html",
            "isManaged": true,
            "visible": false,
            "title": "@language-toolbar-name",
            "iconUri": "Resources/Images/Icons/Toolbar/tools-32.png",
            "region": "MiscViewContainerRegion",
            "configuration": {
              "showXButton": true
            }
          },
          {
            "id": "NavBarSmallView",
            "viewModelId": "BottomPanelViewContainerViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavBarSmallView",
            "markup": "Mapping/modules/Shells/Components/NavBarSmallView.html",
            "require": "Mapping/modules/Shells/Components/NavBarSmallView",
            "region": "SmallNavigationRegion",
            "visible": false,
            "configuration": {}
          },
          {
            "id": "NavButtonView",
            "viewModelId": "NavButtonViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavButtonView",
            "markup": "Mapping/modules/Shells/Components/Navigation/NavButtonView.html",
            "require": "Mapping/modules/Shells/Components/Navigation/NavButtonView",
            "region": "BottomRightMapRegion",
            "visible": true,
            "configuration": {}
          },
          {
            "id": "ToolbarFlyoutView",
            "viewModelId": "TabbedToolbarViewModel",
            "visible": false,
            "isManaged": false,
            "title": "@language-toolbar-multi-tool",
            "region": "MiscViewContainerRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarFlyoutView",
            "require": "Mapping/modules/Toolbar/ToolbarFlyoutView",
            "markup": "Mapping/modules/Toolbar/Templates/ToolbarFlyoutDropdownTemplate.html",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "TabbedToolbarViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarViewModel",
            "require": "Mapping/modules/Toolbar/TabbedToolbarViewModel",
            "configuration": {
              "toolbarGroupRefs": [
                "mUa7UpiS",
                "Wf0IiSCa",
                "g3nDhty4",
                "VsFdt8zF"
              ],
              "toolbarOpenByDefault": false,
              "tabbedToolbarLabels": true
            }
          },
          {
            "id": "NavButtonViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.components.NavButtonViewModel",
            "require": "Mapping/modules/Shells/Components/Navigation/NavButtonViewModel",
            "configuration": {}
          },
          {
            "id": "TabbedToolbarTransientViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.transients.TransientViewModel",
            "require": "Mapping/modules/Toolbar/Transients/TransientViewModel",
            "configuration": {}
          }
        ],
        "isEnabled": true
      },
      {
        "moduleName": "TimeSlider",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.timeSlider.TimeSliderModule",
        "configuration": {
          "behaviors": [
            {
              "name": "TimeSliderCloseTimelineActionInvokedBehavior",
              "commands": [
                "HideTimeSliderSettings",
                "HideTimeSlider"
              ]
            },
            {
              "name": "TimeSliderMoreSettingsActionInvokedBehavior",
              "commands": [
                "ToggleTimeSliderActions",
                "ShowTimeSliderSettings"
              ]
            }
          ]
        },
        "views": [
          {
            "id": "TimeSliderView",
            "viewModelId": "TimeSliderViewModel",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.timeSlider.TimeSliderView",
            "markup": "Mapping/modules/TimeSlider/TimeSliderView.html",
            "region": "HeaderRegion",
            "configuration": {}
          },
          {
            "id": "TimeSliderSettingsView",
            "viewModelId": "TimeSliderViewModel",
            "visible": false,
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.timeSlider.TimeSliderSettingsView",
            "markup": "Mapping/modules/TimeSlider/TimeSliderSettingsView.html",
            "require": "Mapping/modules/TimeSlider/TimeSliderSettingsView",
            "region": "MiscViewContainerRegion",
            "title": "@language-timeslider-settings-view-heading",
            "iconUri": "Resources/Images/Icons/Toolbar/hourglass-24.png",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "TimeSliderViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.timeSlider.TimeSliderViewModel",
            "configuration": {
              "enabled": true,
              "animateSlider": true,
              "activateOnStartup": true,
              "maxTimeExtentDisplayUnits": 3,
              "noOfflineSupportStatusMsgTimeoutSecs": 10
            }
          }
        ]
      },
      {
        "moduleName": "Tools",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.tools.ToolsModule",
        "configuration": {
          "showStatusMessages": true,
          "tools": [
            {
              "name": "EditMarkupTool",
              "command": "EditMarkup",
              "drawMode": "POINT",
              "isSticky": true,
              "iconUri": "Resources/Images/Icons/Toolbar/draw-edit-24.png",
              "statusText": "@language-toolbar-markup-edit-desc",
              "keyboardStatusText": "@language-toolbar-markup-edit-desc-keyboard"
            },
            {
              "name": "DeleteMarkupTool",
              "command": "DeleteMarkup",
              "drawMode": "POINT",
              "isSticky": true,
              "iconUri": "Resources/Images/Icons/Toolbar/Erase-24.png",
              "statusText": "@language-toolbar-markup-delete-desc",
              "keyboardStatusText": "@language-toolbar-markup-delete-desc-keyboard"
            }
          ]
        }
      },
      {
        "moduleName": "UploadData",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.UploadDataModule",
        "deferLoading": true,
        "configuration": {
          "checkJobStatusPeriod": 4000,
          "warnOnFeatureCount": 10000,
          "heatMap": {
            "enabled": false,
            "userCanToggle": true,
            "respectScaleRange": true,
            "gradient": [
              [
                255,
                255,
                255,
                0
              ],
              [
                0,
                0,
                255,
                98
              ],
              [
                255,
                0,
                0,
                139
              ],
              [
                255,
                255,
                0,
                181
              ]
            ],
            "offset": [
              0,
              0.5,
              0.75,
              1
            ],
            "intensity": 25,
            "includeInLegend": true
          },
          "cluster": {
            "enabled": false,
            "userCanToggle": true,
            "radius": 50,
            "maximumFeatures": 100,
            "backgroundColor": [
              0,
              0,
              255
            ],
            "labelColor": [
              255,
              255,
              255
            ]
          }
        },
        "views": [
          {
            "id": "UploadDialogView",
            "markup": "Mapping/modules/UploadData/Dialogs/UploadDialogView.html",
            "viewModelId": "UploadDialogViewModel",
            "title": "@language-upload-dialog-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.UploadDialogView",
            "require": "Mapping/modules/UploadData/Dialogs/UploadDialogView",
            "visible": false
          },
          {
            "id": "TableMappingDialogView",
            "markup": "Mapping/modules/UploadData/Dialogs/TableMappingDialogView.html",
            "viewModelId": "TableMappingDialogViewModel",
            "title": "@language-table-mapping-dialog-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.TableMappingDialogView",
            "require": "Mapping/modules/UploadData/Dialogs/TableMappingDialogView",
            "visible": false
          },
          {
            "id": "LayerDetailsDialogView",
            "markup": "Mapping/modules/UploadData/Dialogs/LayerDetailsDialogView.html",
            "viewModelId": "LayerDetailsDialogViewModel",
            "title": "@language-layer-details-dialog-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.LayerDetailsDialogView",
            "require": "Mapping/modules/UploadData/Dialogs/LayerDetailsDialogView",
            "visible": false
          },
          {
            "id": "TableRecordResultsDialogView",
            "markup": "Mapping/modules/UploadData/Dialogs/TableRecordResultsDialogView.html",
            "viewModelId": "TableRecordResultsDialogViewModel",
            "title": "@language-table-record-results-dialog-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.TableRecordResultsDialogView",
            "require": "Mapping/modules/UploadData/Dialogs/TableRecordResultsDialogView",
            "visible": false
          },
          {
            "id": "SymbolDialogView",
            "markup": "Mapping/modules/UploadData/Dialogs/SymbolDialogView.html",
            "viewModelId": "SymbolDialogViewModel",
            "title": "@language-symbol-dialog-title",
            "region": "ModalWindowRegion",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.SymbolDialogView",
            "require": "Mapping/modules/UploadData/Dialogs/SymbolDialogView",
            "visible": false
          }
        ],
        "viewModels": [
          {
            "id": "UploadDialogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.UploadDialogViewModel",
            "require": "Mapping/modules/UploadData/Dialogs/UploadDialogViewModel"
          },
          {
            "id": "TableMappingDialogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.TableMappingDialogViewModel",
            "require": "Mapping/modules/UploadData/Dialogs/TableMappingDialogViewModel",
            "configuration": {
              "autoDetectionTerms": {
                "xAxis": [
                  "longitude",
                  "long",
                  "lon",
                  "x"
                ],
                "yAxis": [
                  "latitude",
                  "lat",
                  "y"
                ],
                "zAxis": [
                  "altitude",
                  "alt",
                  "z"
                ],
                "featureLabel": [
                  "name",
                  "label",
                  "title"
                ],
                "Address": [
                  "address",
                  "street"
                ],
                "Neighborhood": [
                  "neighborhood"
                ],
                "City": [
                  "city"
                ],
                "Subregion": [
                  "subregion"
                ],
                "Region": [
                  "region",
                  "state",
                  "province"
                ],
                "Postal": [
                  "postal",
                  "zip"
                ],
                "PostalExt": [
                  "postalext",
                  "postal_ext"
                ],
                "CountryCode": [
                  "countrycode",
                  "country_code",
                  "cc"
                ],
                "SearchExtent": [
                  "searchextent",
                  "search_extent"
                ]
              },
              "sourceSpatialReferences": [
                {
                  "label": "WGS 1984 (WKID 4326)",
                  "spatialReference": {
                    "wkid": 4326
                  },
                  "preselected": true
                },
                {
                  "label": "Web Mercator (WKID 102100)",
                  "spatialReference": {
                    "wkid": 102100
                  }
                },
                {
                  "label": "@language-table-mapping-source-spatial-reference-map",
                  "map": true
                },
                {
                  "label": "@language-table-mapping-source-spatial-reference-custom",
                  "custom": true
                }
              ]
            }
          },
          {
            "id": "LayerDetailsDialogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.LayerDetailsDialogViewModel",
            "require": "Mapping/modules/UploadData/Dialogs/LayerDetailsDialogViewModel"
          },
          {
            "id": "TableRecordResultsDialogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.TableRecordResultsDialogViewModel",
            "require": "Mapping/modules/UploadData/Dialogs/TableRecordResultsDialogViewModel"
          },
          {
            "id": "SymbolDialogViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.SymbolDialogViewModel",
            "require": "Mapping/modules/UploadData/Dialogs/SymbolDialogViewModel"
          }
        ]
      },
      {
        "moduleName": "User",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.User.UserModule",
        "configuration": {},
        "views": [],
        "viewModels": []
      },
      {
        "moduleName": "Visualization",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.visualization.VisualizationModule",
        "deferLoading": true,
        "configuration": {},
        "views": [
          {
            "id": "VisualizationView",
            "viewModelId": "VisualizationViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.visualization.VisualizationView",
            "markup": "Mapping/modules/Visualization/VisualizationView.html",
            "region": "LayerDataContainerRegion",
            "visible": false,
            "iconUri": "Resources/Images/Icons/Toolbar/visualizations-24.png",
            "configuration": {}
          }
        ],
        "viewModels": [
          {
            "id": "VisualizationViewModel",
            "type": "geocortex.essentialsHtmlViewer.mapping.modules.visualization.VisualizationViewModel",
            "configuration": {
              "containerRegionName": "LayerVisualizationRegion",
              "defaultDisplayName": "@language-visualization-none",
              "containerTitle": "@language-visualization-title",
              "visualizationProviders": [
                {
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerStyles.CustomLayerStylesVisualizationProvider",
                  "viewId": "LayerStyleSelectorView",
                  "displayName": "@language-layerstyles-name"
                },
                {
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.layerStyles.LayerStylesVisualizationProvider",
                  "displayName": "@language-layerstyles-custom-name"
                },
                {
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.heatMaps.HeatMapVisualizationProvider",
                  "viewId": "HeatMapsView",
                  "displayName": "@language-heat-maps-name"
                },
                {
                  "type": "geocortex.essentialsHtmlViewer.mapping.modules.clusterLayers.ClusterLayerVisualizationProvider",
                  "viewId": "ClusterLayerView",
                  "displayName": "@language-clustering-name"
                }
              ]
            }
          }
        ]
      },
      {
        "moduleName": "Workflow",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowModule",
        "deferLoading": true,
        "configuration": {
          "showTitleInFormBody": false,
          "defaultContainerRegionName": "ModalWindowRegion",
          "defaultContainerTitle": "@language-workflow-title",
          "defaultContainerIconUri": "Resources/Images/Icons/Toolbar/workflow-24.png",
          "showCaptureStatusMessages": true,
          "displayResultPickerTemplateComplexity": "simple",
          "startupWorkflows": [],
          "formItems": {
            "geocortex.forms.items.DatePickerFormItemView": {
              "markup": "Mapping/infrastructure/ui/components/Forms/DatePickerFormItemView.html",
              "codebehind": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.DatePickerFormItemView"
            }
          },
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
              "regionName": "WorkflowContainerRegion",
              "isManaged": true,
              "displayHeader": false,
              "iconUri": "Resources/Images/Icons/Toolbar/workflow-24.png"
            },
            {
              "name": "DefaultNoCloseButton",
              "title": "@language-workflow-title",
              "regionName": "WorkflowContainerRegion",
              "isManaged": true,
              "displayHeader": false,
              "iconUri": "Resources/Images/Icons/Toolbar/workflow-24.png",
              "allowClose": false
            },
            {
              "name": "Extract",
              "title": "@language-common-extract-data",
              "regionName": "WorkflowContainerRegion",
              "isManaged": true,
              "displayHeader": false,
              "iconUri": "Resources/Images/Icons/Toolbar/layers-extract-24.png"
            },
            {
              "name": "ModalWindow",
              "title": "@language-workflow-title",
              "regionName": "ModalWindowRegion",
              "isManaged": false,
              "iconUri": "Resources/Images/Icons/Toolbar/workflow-24.png"
            },
            {
              "name": "ModalWindowNoCloseButton",
              "title": "@language-workflow-title",
              "regionName": "ModalWindowRegion",
              "isManaged": false,
              "allowClose": false,
              "iconUri": "Resources/Images/Icons/Toolbar/workflow-24.png"
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
            "region": "WorkflowContainerRegion",
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
        "moduleName": "WorkflowHost",
        "libraryId": "https://apps.geocortex.com/workflow/latest/dist/hosts/gvh/loader.js!",
        "deferLoading": true
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
        "id": "MarkupPaletteSmall",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteView",
        "markup": "Mapping/modules/Markup/ToolPalettes/MarkupPaletteSmall.html",
        "viewModelId": "TransientMarkupPaletteViewModel"
      },
      {
        "id": "MarkupEditToolPaletteSmall",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteView",
        "markup": "Mapping/modules/Markup/ToolPalettes/EditPaletteSmall.html",
        "viewModelId": "TransientMarkupPaletteViewModel"
      },
      {
        "id": "MarkupDeleteToolPaletteSmall",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.toolPalettes.TransientMarkupPaletteView",
        "markup": "Mapping/modules/Markup/ToolPalettes/DeletePaletteSmall.html",
        "viewModelId": "TransientMarkupPaletteViewModel"
      },
      {
        "id": "AttributeSymbologySettings",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.AttributeSymbologySettingsView",
        "markup": "Mapping/infrastructure/symbology/AttributeSymbologySettingsView.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.AttributeSymbologySettingsViewModel",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "maxRenderClasses": 12,
          "maxSamples": 1000,
          "defaultPointColor": [
            150,
            150,
            150,
            0.8
          ],
          "defaultPointSize": 12,
          "defaultLineColor": [
            75,
            75,
            75,
            1
          ],
          "defaultLineWidth": 2,
          "defaultFillColor": [
            150,
            150,
            150,
            0.3
          ],
          "transparency": {
            "min": 0,
            "max": 90,
            "value": 10,
            "step": 5
          },
          "classSymbolizationConfig": {
            "enableImageSelector": false,
            "symbologyConfig": {
              "userSelectedOutlineColor": false,
              "adaptOutlineToFill": false,
              "markerSize": {
                "min": 12,
                "max": 64,
                "value": 16,
                "step": 1
              }
            }
          }
        }
      },
      {
        "id": "ColorPickerWidget",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.ColorPickerWidget",
        "markup": "Mapping/infrastructure/ui/components/ColorPicker/ColorPickerWidget.html",
        "configuration": {
          "provider": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.KendoColorPickerProvider"
        }
      },
      {
        "id": "NumericInputWidget",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.NumericInputWidget",
        "markup": "Mapping/infrastructure/ui/components/NumericInput/NumericInputWidget.html",
        "configuration": {
          "provider": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.KendoSliderProvider"
        }
      },
      {
        "id": "AutoCompleteBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.AutoCompleteBoxFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/AutoCompleteBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "CheckBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.CheckBoxFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/CheckBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "ComboBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.ListBoxFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/ComboBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "ContainerFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.ContainerFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/ContainerFormItemView.html",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "allowHorizontal": false
        }
      },
      {
        "id": "DatePickerFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.DatePickerFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/DatePickerFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "FilePickerFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.FilePickerFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/FilePickerFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "GroupBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.GroupBoxFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/GroupBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "allowHorizontal": false
        }
      },
      {
        "id": "HyperlinkFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.HyperlinkFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/HyperlinkFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "IdentifyOptionsTransientToolbar",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyOptionsView",
        "markup": "Mapping/modules/Identify/Widgets/IdentifyOptionsTransientView.html",
        "viewModelId": "IdentifyOptionsViewModel"
      },
      {
        "id": "ImageFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.FormItemViewBase",
        "markup": "Mapping/infrastructure/ui/components/Forms/ImageFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "LabelFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.FormItemViewBase",
        "markup": "Mapping/infrastructure/ui/components/Forms/LabelFormItem.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "ListBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.ListBoxFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/ListBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "MeasurementToolTransientToolbar",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.measurement.MeasurementView",
        "markup": "Mapping/modules/Measurement/MeasurementView.html",
        "viewModelId": "MeasurementViewModel"
      },
      {
        "id": "MarkdownFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.MarkdownFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/MarkdownFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "RadioButtonFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.RadioButtonFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/RadioButtonFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "SelectionStar",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SelectionStar.SelectionStar",
        "markup": "Mapping/infrastructure/ui/components/SelectionStar/SelectionStar.html",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "enabled": true,
          "persistHighlights": true
        }
      },
      {
        "id": "SymbologySettings",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbologySettingsView",
        "markup": "Mapping/infrastructure/symbology/SymbologySettingsView.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbologySettingsViewModel",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "enableImageSelector": true
        }
      },
      {
        "id": "SimpleSymbolWidget",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SimpleSymbolWidget",
        "markup": "Mapping/infrastructure/symbology/widgets/SimpleSymbolWidget.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SimpleSymbolWidgetViewModel",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "userSelectedOutlineColor": true,
          "lineWidth": {
            "min": 0,
            "max": 12,
            "value": 2,
            "step": 1
          },
          "markerSize": {
            "min": 1,
            "max": 64,
            "value": 16,
            "step": 1
          }
        }
      },
      {
        "id": "PictureSymbolWidget",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.PictureSymbolWidget",
        "markup": "Mapping/infrastructure/symbology/widgets/PictureSymbolWidget.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.PictureSymbolWidgetViewModel",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "imageLibraries": [
            "Shapes",
            "Arrows",
            "A-Z",
            "Basic",
            "Business",
            "Cartographic",
            "Damage",
            "Disasters",
            "Emergency Management",
            "Firefly",
            "General Infrastructure",
            "Local Government",
            "National Park Service",
            "Numbers",
            "Outdoor Recreation",
            "People Places",
            "Points Of Interest",
            "Safety Health",
            "State Government",
            "Transportation"
          ],
          "imageSize": {
            "min": 16,
            "max": 64,
            "value": 32,
            "step": 1
          }
        }
      },
      {
        "id": "TextAreaFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.TextEntryFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/TextAreaFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "TextBoxFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.TextEntryFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/TextBoxFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "TextSymbolWidget",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.TextSymbolWidget",
        "markup": "Mapping/infrastructure/symbology/widgets/TextSymbolWidget.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.TextSymbolWidgetViewModel",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {
          "fontFamilies": [
            "Arial",
            "Calibri",
            "Cambria",
            "Century Gothic",
            "Consolas",
            "Courier",
            "Georgia",
            "Impact",
            "Tahoma",
            "Times New Roman",
            "Verdana"
          ],
          "fontSize": {
            "min": 10,
            "max": 72,
            "value": 16,
            "step": 1
          },
          "haloSize": {
            "min": 0,
            "max": 5,
            "value": 2,
            "step": 1
          }
        }
      },
      {
        "id": "TimePickerFormItem",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.TimePickerFormItemView",
        "markup": "Mapping/infrastructure/ui/components/Forms/TimePickerFormItemView.html",
        "libraryId": "Mapping.Infrastructure"
      },
      {
        "id": "Uploader",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.widgets.uploader.UploaderView",
        "markup": "Mapping/modules/UploadData/Widgets/Uploader/UploaderView.html",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.modules.uploadData.widgets.uploader.UploaderViewModel",
        "libraryId": "Mapping",
        "configuration": {}
      },
      {
        "id": "CompactToolbarTransientBase",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.transients.TransientView",
        "markup": "Mapping/modules/Toolbar/Templates/TransientItems.html",
        "viewModelId": "CompactToolbarTransientViewModel"
      },
      {
        "id": "TabbedToolbarTransientBase",
        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.transients.TransientView",
        "markup": "Mapping/modules/Toolbar/Templates/TransientItems.html",
        "viewModelId": "TabbedToolbarTransientViewModel"
      },
      {
        "id": "SymbolEditor",
        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbolEditorView",
        "viewModelType": "geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbolEditorViewModel",
        "markup": "Mapping/infrastructure/symbology/SymbolEditorView.html",
        "libraryId": "Mapping.Infrastructure",
        "configuration": {}
      }
    ],
    "viewerId": "Aquaculture"
  }
}