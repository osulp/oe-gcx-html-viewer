{
    "configuration": {
        "defaultLibraryId": "Management",
        "libraries": [
            {
                "id": "Framework.UI",
                "uri": "Resources/Legacy/Framework.UI.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Framework.UI.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Management.Infrastructure",
                "uri": "Management/Legacy/Management.Infrastructure.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Management/Locales/Management.Infrastructure.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Management",
                "uri": "Management/Compiled/Management.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Management/Locales/Management.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Mapping",
                "uri": "Resources/Legacy/Mapping.js",
                "omitStyles": true,
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Mapping.en-US.json.js"
                    }
                ]
            }
        ],

        "widgets":
        [
            {
                "id": "LanguageResourceWidget",
                "markup": "Management/modules/Shared/LanguageResourceWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.LanguageResourceWidget",
                "configuration": { }
            },
            {
                "id": "MenuEditorWidget",
                "markup": "Management/modules/Shared/MenuEditorWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.MenuEditorWidget",
                "configuration": { }
            },
            {
                "id": "CommandAutoCompleteWidget",
                "markup": "Management/modules/Shared/CommandAutoCompleteWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.CommandAutoCompleteWidget",
                "configuration": { }
            },
            {
                "id": "CommandParameterWidget",
                "markup": "Management/modules/Shared/CommandParameterWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.CommandParameterWidget",
                "configuration": { }
            },
            {
                "id": "ColorPickerWidget",
                "markup": "Management/modules/Shared/ColorPickerWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.ColorPickerWidget",
                "configuration": { }
            },
            {
                "id": "StateResourceWidget",
                "markup": "Management/modules/Shared/StateResourceWidget.html",
                "type": "geocortex.essentialsHtmlViewer.management.modules.shared.StateResourceWidget",
                "configuration": { }
            }
        ],

        "modules": [
            {
                "moduleName": "Accessibility",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.Accessibility.AccessibilityModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Application",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.application.ApplicationModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "BreadCrumbs",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.breadcrumbs.BreadCrumbsModule",
                "configuration": { },
                "views": [
                    {
                        "id": "BreadCrumbsView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.breadcrumbs.BreadCrumbsView",
                        "viewModelId": "BreadCrumbsViewModel",
                        "markup": "Management/modules/BreadCrumbs/BreadCrumbsView.html",
                        "region": "BreadCrumbsRegion",
                        "visible": true
                    }
                ],
                "viewModels": [
                    {
                        "id": "BreadCrumbsViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.breadcrumbs.BreadCrumbsViewModel",
                        "configuration": { 
                            "rootViewId": "ViewerInfoView"
                        }
                    }
                ]
            },
            {
                "moduleName": "Confirm",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.confirm.ConfirmModule",
                "libraryId": "Mapping",
                "configuration": {
                    "confirmRegion": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "ContextMenus",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenusModule",
                "configuration": { },
                "views": [
                    {
                        "id": "ContextMenusView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.menumanager.MenuView",
                        "viewModelId": "ContextMenusViewModel",
                        "markup": "Management/modules/MenuManager/MenuView.html",
                        "region": "MenuContentRegion",
                        "title": "@language-context-menus-section-title",
                        "visible": false
                    }
                ],
                "viewModels": [
                    {
                        "id": "ContextMenusViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.menumanager.MenuViewModel",
                        "configuration": {
                            "items": [
                                {
                                    "viewId": "CoordinateActionsSectionView",
                                    "text": "@language-coordinate-actions-section-title"
                                },
                                {
                                    "viewId": "CoordinatesListActionsSectionView",
                                    "text": "@language-coordinates-list-actions-section-title"
                                },
                                {
                                    "viewId": "FeatureActionsSectionView",
                                    "text": "@language-feature-actions-section-title"
                                },
                                {
                                    "viewId": "FilterBuilderActionsSectionView",
                                    "text": "@language-filter-builder-actions-section-title"
                                },
                                {
                                    "viewId": "FilterActionsSectionView",
                                    "text": "@language-filter-actions-section-title"
                                }, 
                                {
                                    "viewId": "GlobalMenuConfigSectionView",
                                    "text": "@language-global-menu-config-section-title"
                                },
                                {
                                    "viewId": "LayerActionsSectionView",
                                    "text": "@language-layer-actions-section-title"
                                },
                                {
                                    "viewId": "LayerListActionsSectionView",
                                    "text": "@language-layer-list-actions-section-title"
                                },
                                {
                                    "viewId": "LegendActionsSectionView",
                                    "text": "@language-legend-actions-section-title"
                                },
                                {
                                    "viewId": "MapContextMenuSectionView",
                                    "text": "@language-map-context-menu-section-title"
                                },
                                {
                                    "viewId": "MapServiceActionsSectionView",
                                    "text": "@language-map-service-actions-section-title"
                                },
                                {
                                    "viewId": "MapTipActionsSectionView",
                                    "text": "@language-maptip-actions-section-title"
                                },
                                {
                                    "viewId": "ProjectActionsSectionView",
                                    "text": "@language-project-actions-section-title"
                                },
                                {
                                    "viewId": "ProjectsActionsSectionView",
                                    "text": "@language-projects-actions-section-title"
                                },
                                {
                                    "viewId": "QueryBuilderActionsSectionView",
                                    "text": "@language-query-builder-actions-section-title"
                                },
                                {
                                    "viewId": "QueryActionsSectionView",
                                    "text": "@language-query-actions-section-title"
                                },
                                {
                                    "viewId": "ResultsListCollectionActionsSectionView",
                                    "text": "@language-results-list-collection-actions-section-title"
                                },
                                {
                                    "viewId": "ResultsListCollectionElementActionsSectionView",
                                    "text": "@language-results-list-collection-element-actions-section-title"
                                },
                                {
                                    "viewId": "ResultsListSetActionsSectionView",
                                    "text": "@language-results-list-set-actions-section-title"
                                },
                                {
                                    "viewId": "ResultsListSetElementActionsSectionView",
                                    "text": "@language-results-list-set-element-actions-section-title"
                                },
                                {
                                    "viewId": "ResultsTableActionsSectionView",
                                    "text": "@language-results-table-actions-section-title"
                                },
                                {
                                    "viewId": "SelectionActionsSectionView",
                                    "text": "@language-selection-actions-section-title"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "moduleName": "IWantToMenu",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.IWantToMenu.IWantToMenuModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "LookAndFeel",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.lookandfeel.LookAndFeelModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Measurement",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.measurement.MeasurementModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Collaboration",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.collaboration.CollaborationModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Geolocate",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.Geolocate.GeolocateModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "HomePanel",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.HomePanel.HomePanelModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "MapContextMenu",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.MapContextMenu.MapContextMenuModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Offline",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.offline.OfflineModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "Navigation",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.navigation.NavigationModule",
                "configuration": { },
                "views": [
                    {
                        "id": "NavigationView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.navigation.NavigationView",
                        "viewModelId": "NavigationViewModel",
                        "markup": "Management/modules/Navigation/NavigationView.html",
                        "region": "NavigationRegion",
                        "visible": true
                    }
                ],
                "viewModels": [
                    {
                        "id": "NavigationViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.navigation.NavigationViewModel",
                        "configuration": {
                            "items": [
                                {
                                    "viewId": "ViewerInfoView",
                                    "text": "@language-external-content-viewer-info",
                                    "iconUri": "someimage.png",
                                    "cssClass": "icon-info"
                                },
                                {
                                    "viewId": "ApplicationSectionView",
                                    "text": "@language-application-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-application"
                                },
                                {
                                    "viewId": "AccessibilitySectionView",
                                    "text": "@language-accessibility-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-accessibility"
                                },
                                {
                                    "viewId": "LookAndFeelSectionView",
                                    "text": "@language-look-and-feel-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-look-and-feel"
                                },
                                {
                                    "viewId": "IWantToMenuSectionView",
                                    "text": "@language-menu-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-i-want-to-menu"
                                },
                                {
                                    "viewId": "ContextMenusView",
                                    "text": "@language-context-menus-section-title",
                                    "itemType": "menu",
                                    "iconUri": "",
                                    "cssClass": "icon-context-menus"
                                },
                                {
                                    "viewId": "MeasurementSectionView",
                                    "text": "@language-measurement-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-measurement"
                                },
                                {
                                    "viewId": "MapSectionView",
                                    "text": "@language-map-title",
                                    "iconUri": "",
                                    "cssClass": "icon-map"
                                },
                                {
                                    "viewId": "MapWidgetsSectionView",
                                    "text": "@language-mapwidgets-title",
                                    "iconUri": "",
                                    "cssClass": "icon-map-widgets"
                                },
                                {
                                    "viewId": "OfflineSectionView",
                                    "text": "@language-offline-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-disconnect"
                                },
                                {
                                    "viewId": "GeolocateSectionView",
                                    "text": "@language-geolocate-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-geolocate-panel"
                                },
                                {
                                    "viewId": "HomePanelSectionView",
                                    "text": "@language-home-panel-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-home-panel"
                                },
                                {
                                    "viewId": "InstantSearchSectionView",
                                    "text": "@language-instant-search-title",
                                    "iconUri": "",
                                    "cssClass": "icon-instant-search"
                                },
                                {
                                    "viewId": "LayerListSectionView",
                                    "text": "@language-layerlist-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-layer-list"
                                },
                                {
                                    "viewId": "PushpinsSectionView",
                                    "text": "@language-pushpins-title",
                                    "iconUri": "",
                                    "cssClass": "icon-pushpins"
                                },
                                {
                                    "viewId": "ToolbarSectionView",
                                    "text": "@language-toolbar-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-toolbar"
                                },
                                {
                                    "viewId": "ToolBehaviorSectionView",
                                    "text": "@language-toolbehavior-section-title",
                                    "iconUri": "",
                                    "cssClass": "icon-tool-behavior"
                                },
                                {
                                    "viewId": "OptimizerIntegrationSectionView",
                                    "text": "@language-optimizer-integration-title",
                                    "iconUri": "",
                                    "cssClass": "icon-optimizer"
                                },
                                {
                                    "viewId": "InsightIntegrationSectionView",
                                    "text": "@language-insight-integration-title",
                                    "iconUri": "",
                                    "cssClass": "icon-insight"
                                },
                                {
                                    "viewId": "CollaborationSectionView",
                                    "text": "@language-collaboration-title",
                                    "iconUri": "",
                                    "cssClass": "icon-collaboration"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "moduleName": "Preview",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.preview.PreviewModule",
                "configuration": { },
                "views": [
                    {
                        "id": "PreviewLauncherView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.preview.PreviewLauncherView",
                        "viewModelId": "PreviewLauncherViewModel",
                        "markup": "Management/modules/Preview/PreviewLauncherView.html",
                        "region": "PreviewLauncherRegion",
                        "visible": true
                    },
                    {
                        "id": "PreviewContainerView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.preview.PreviewContainerView",
                        "viewModelId": "PreviewContainerViewModel",
                        "markup": "Management/modules/Preview/PreviewContainerView.html",
                        "region": "ModalWindowPlaceholderRegion",
                        "visible": false
                    }
                ],
                "viewModels": [
                    {
                        "id": "PreviewLauncherViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.preview.PreviewLauncherViewModel",
                        "configuration": { }
                    },
                    {
                        "id": "PreviewContainerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.preview.PreviewContainerViewModel",
                        "configuration": { }
                    }
                ]
            },
            {
                "moduleName": "SectionManager",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionManagerModule",
                "configuration": { },
                "views": [
                    {
                        "id": "CoalescePromptView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.CoalescePromptView",
                        "viewModelId": "CoalescePromptViewModel",
                        "markup": "Management/modules/SectionManager/CoalescePromptView.html",
                        "region": "ModalWindowRegion",
                        "title": "@language-section-manager-coalesce-title",
                        "visible": false
                    },
                    {
                        "id": "AccessibilitySectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "AccessibilitySectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-accessibility-section-title",
                        "visible": false
                    },
                    {
                        "id": "ApplicationSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ApplicationSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-application-section-title",
                        "visible": false
                    },
                    {
                        "id": "IWantToMenuSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "IWantToMenuSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-menu-section-title",
                        "visible": false
                    },
                    {
                        "id": "LookAndFeelSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "LookAndFeelSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-look-and-feel-section-title",
                        "visible": false
                    },
                    {
                        "id": "MeasurementSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MeasurementSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-measurement-section-title",
                        "visible": false
                    },
                    {
                        "id": "MapSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MapSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-map-title",
                        "visible": false
                    },
                    {
                        "id": "MapContextMenuSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MapContextMenuSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-map-context-menu-section-title",
                        "visible": false
                    },
                    {
                        "id": "MapWidgetsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MapWidgetsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-mapwidgets-title",
                        "visible": false
                    },
                    {
                        "id": "ToolBehaviorSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ToolBehaviorSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-toolbehavior-section-title",
                        "visible": false
                    },
                    {
                        "id": "OfflineSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.offline.OfflineView",
                        "viewModelId": "OfflineSectionViewModel",
                        "markup": "Management/modules/Offline/OfflineView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-offline-section-title",
                        "visible": false
                    },
                    {
                        "id": "ToolbarSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ToolbarSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-toolbar-section-title",
                        "visible": false
                    },
                    {
                        "id": "GeolocateSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "GeolocateSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-geolocate-section-title",
                        "visible": false
                    },
                    {
                        "id": "HomePanelSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "HomePanelSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-home-panel-section-title",
                        "visible": false
                    },
                    {
                        "id": "InstantSearchSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "InstantSearchSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-instant-search-title",
                        "visible": false
                    },
                    {
                        "id": "LayerListSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "LayerListSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-layerlist-section-title",
                        "visible": false
                    },
                    {
                        "id": "PushpinsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "PushpinsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-pushpins-title",
                        "visible": false
                    },
                    {
                        "id": "OptimizerIntegrationSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "OptimizerIntegrationSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-optimizer-integration-title",
                        "visible": false
                    },
                    {
                        "id": "InsightIntegrationSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "InsightIntegrationSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-insight-integration-title",
                        "visible": false
                    },
                    {
                        "id": "CoordinateActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "parentView": "ContextMenusView",
                        "viewModelId": "CoordinateActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-coordinate-actions-title",
                        "visible": false
                    },
                    {
                        "id": "CoordinatesListActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "CoordinatesListActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-coordinates-list-actions-title",
                        "visible": false
                    },
                    {
                        "id": "FilterBuilderActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "FilterBuilderActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-filter-builder-actions-title",
                        "visible": false
                    },
                    {
                        "id": "FilterActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "FilterActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-filter-actions-title",
                        "visible": false
                    },
                    {
                        "id": "LayerActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "LayerActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-layer-actions-title",
                        "visible": false
                    },
                    {
                        "id": "LayerListActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "LayerListActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-layer-list-actions-title",
                        "visible": false
                    },
                    {
                        "id": "LegendActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "LegendActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-legend-actions-title",
                        "visible": false
                    },
                    {
                        "id": "FeatureActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "FeatureActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-feature-actions-title",
                        "visible": false
                    },
                    {
                        "id": "MapServiceActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MapServiceActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-map-service-actions-title",
                        "visible": false
                    },
                    {
                        "id": "MapTipActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "MapTipActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-maptip-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ProjectActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ProjectActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-project-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ProjectsActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ProjectsActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-projects-actions-title",
                        "visible": false
                    },
                    {
                        "id": "QueryBuilderActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "QueryBuilderActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-query-builder-actions-title",
                        "visible": false
                    },
                    {
                        "id": "QueryActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "QueryActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-query-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ResultsListCollectionActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ResultsListCollectionActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-results-list-collection-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ResultsListCollectionElementActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ResultsListCollectionElementActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-results-list-collection-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ResultsListSetActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ResultsListSetActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-results-list-collection-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ResultsListSetElementActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ResultsListSetElementActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-results-list-collection-actions-title",
                        "visible": false
                    },
                    {
                        "id": "ResultsTableActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "ResultsTableActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-results-table-actions-title",
                        "visible": false
                    },
                    {
                        "id": "GlobalMenuConfigSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "GlobalMenuConfigSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-global-menu-config-title",
                        "visible": false
                    },
                    {
                        "id": "SelectionActionsSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "SelectionActionsSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-selection-actions-title",
                        "visible": false
                    },
                    {
                        "id": "CollaborationSectionView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionView",
                        "viewModelId": "CollaborationSectionViewModel",
                        "markup": "Management/modules/SectionManager/SectionView.html",
                        "region": "ManagementContentRegion",
                        "title": "@language-collaboration-title",
                        "visible": false
                    }
                ],
                "viewModels": [
                    {
                        "id": "CoalescePromptViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.CoalescePromptViewModel",
                        "configuration": { }
                    },
                    {
                        "id": "ApplicationSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.application.ApplicationView",
                                "markup": "Management/modules/Application/ApplicationView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.application.ApplicationViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "AccessibilitySectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Accessibility.AccessibilityView",
                                "markup": "Management/modules/Accessibility/AccessibilityView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Accessibility.AccessibilityViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "IWantToMenuSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.IWantToMenu.IWantToMenuView",
                                "markup": "Management/modules/IWantToMenu/IWantToMenuView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.IWantToMenu.IWantToMenuViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "LookAndFeelSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.lookandfeel.LookAndFeelView",
                                "markup": "Management/modules/LookAndFeel/LookAndFeelView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.lookandfeel.LookAndFeelViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "MeasurementSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.measurement.MeasurementView",
                                "markup": "Management/modules/Measurement/MeasurementView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.measurement.MeasurementViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "MapSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Map.MapView",
                                "markup": "Management/modules/Map/MapView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Map.MapViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "MapWidgetsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.mapwidgets.MapWidgetsView",
                                "markup": "Management/modules/MapWidgets/MapWidgetsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.mapwidgets.MapWidgetsViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "OfflineSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.offline.OfflineViewModel",
                        "configuration": { }
                    },
                    {
                        "id": "ToolbarSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.toolbar.ToolbarEditorView",
                                "markup": "Management/modules/Toolbar/ToolbarEditorView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.toolbar.ToolbarEditorViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "ToolBehaviorSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.toolBehavior.ToolBehaviorView",
                                "markup": "Management/modules/ToolBehavior/ToolBehaviorView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.toolBehavior.ToolBehaviorViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "GeolocateSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Geolocate.GeolocateView",
                                "markup": "Management/modules/Geolocate/GeolocateView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Geolocate.GeolocateViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "HomePanelSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.HomePanel.HomePanelView",
                                "markup": "Management/modules/HomePanel/HomePanelView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.HomePanel.HomePanelViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "InstantSearchSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.InstantSearch.InstantSearchView",
                                "markup": "Management/modules/InstantSearch/InstantSearchView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.InstantSearch.InstantSearchViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "LayerListSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.layerList.LayerListView",
                                "markup": "Management/modules/LayerList/LayerListView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.layerList.LayerListViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "PushpinsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Pushpins.PushpinsView",
                                "markup": "Management/modules/Pushpins/PushpinsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.Pushpins.PushpinsViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "OptimizerIntegrationSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.OptimizerIntegration.OptimizerIntegrationView",
                                "markup": "Management/modules/OptimizerIntegration/OptimizerIntegrationView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.OptimizerIntegration.OptimizerIntegrationViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "InsightIntegrationSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.InsightIntegration.InsightIntegrationView",
                                "markup": "Management/modules/InsightIntegration/InsightIntegrationView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.InsightIntegration.InsightIntegrationViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "CoordinateActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "CoordinateActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "CoordinatesListActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "CoordinatesListActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "FeatureActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": {
                                    "menuId": "FeatureActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "FilterBuilderActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FilterBuilderActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "FilterActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FilterActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "LayerActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "LayerActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "LayerListActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "LayerListActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "LegendActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": {
                                    "menuId": "LegendActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "MapContextMenuSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": { 
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.MapContextMenu.MapContextMenuView",
                                "markup": "Management/modules/MapContextMenu/MapContextMenuView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.MapContextMenu.MapContextMenuViewModel",
                                "configuration": { }
                            }
                        }
                    },
                    {
                        "id": "MapServiceActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": {
                                    "menuId": "MapServiceActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "MapTipActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": {
                                    "menuId": "MapTipActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ProjectActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "ProjectActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ProjectsActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "ProjectsActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "QueryBuilderActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "QueryBuilderActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "QueryActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "QueryActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ResultsListCollectionActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FeatureSetCollectionResultsActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ResultsListCollectionElementActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FeatureSetCollectionResultsFeatureSetActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ResultsListSetActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FeatureSetResultsActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ResultsListSetElementActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "FeatureSetResultsFeatureActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "ResultsTableActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "ResultsTableActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "GlobalMenuConfigSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "GlobalMenuConfig",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuModule",
                                    "userMessage": "@language-global-actions-user-message"
                                }
                            }
                        }
                    },
                    {
                        "id": "SelectionActionsSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsView",
                                "markup": "Management/modules/ContextMenus/ContextMenuActionsView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.ContextMenus.ContextMenuActionsViewModel",
                                "configuration": { 
                                    "menuId": "CombineResultsActions",
                                    "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.selection.SelectionModule"
                                }
                            }
                        }
                    },
                    {
                        "id": "CollaborationSectionViewModel",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.sectionmanager.SectionViewModel",
                        "configuration": {
                            "allowConfigureIndividually": false,
                            "viewTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.collaboration.CollaborationView",
                                "markup": "Management/modules/Collaboration/CollaborationView.html"
                            },
                            "viewModelTemplate": {
                                "type": "geocortex.essentialsHtmlViewer.management.modules.collaboration.CollaborationViewModel",
                                "configuration": { }
                            }
                        }
                    }
                ]
            },
            {
                "moduleName": "Shells",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.shells.ShellsModule",
                "configuration": { },
                "views": [
                    {
                        "id": "SimpleShellView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.shells.SimpleShellView",
                        "markup": "Management/modules/Shells/SimpleShellView.html",
                        "region": "ManagementApplicationRegion",
                        "visible": true
                    },
                    {
                        "id": "SimpleMenuShellView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.shells.SimpleMenuShellView",
                        "markup": "Management/modules/Shells/SimpleMenuShellView.html",
                        "region": "ManagementApplicationRegion",
                        "visible": true
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
                    }
                ],
                "viewModels": [
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
                    }
                ]
            },
            {
                "moduleName": "LayerList",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.layerList.LayerListModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "ToolBehavior",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.toolBehavior.ToolBehaviorModule",
                "configuration": { },
                "views": [
                ],
                "viewModels": [
                ]
            },
            {
                "moduleName": "ViewerInfo",
                "moduleType": "geocortex.essentialsHtmlViewer.management.modules.externalcontent.ExternalContentModule",
                "configuration": { },
                "views": [
                    {
                        "id": "ViewerInfoView",
                        "type": "geocortex.essentialsHtmlViewer.management.modules.externalcontent.ExternalContentView",
                        "markup": "Management/modules/ExternalContent/ExternalContentView.html",
                        "region": "ManagementContentRegion",
                        "visible": false,
                        "title": "@language-external-content-viewer-info",
                        "configuration": {
                            "externalContentId": "ViewerDetails"
                        }
                    }
                ],
                "viewModels": [
                ]
            }
        ]
    }
}