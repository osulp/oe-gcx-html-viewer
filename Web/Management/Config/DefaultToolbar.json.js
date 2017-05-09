geocortex.essentialsHtmlViewer.management.modules.toolbar.defaultToolbar = [
                        {
                            "id": "ToolsTab",
                            "type": "toolbarGroup",
                            "name": "@language-toolbar-group-tools",
                            "items": [
                                {
                                    "id": "HomeGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-group-home",
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
                                            "id": "IdentifyToolControlRegion",
                                            "type": "region",
                                            "regionName": "IdentifyToolControlRegion"
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
                        }
];

geocortex.essentialsHtmlViewer.management.modules.toolbar.defaultCompactToolbar = [
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
                "name": "@language-toolbar-navigation-initial-extent",
                "tooltip": "@language-toolbar-navigation-initial-extent-tooltip",
                "hideOnDisable": false,
                "isSticky": false,
                "statusText": null
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
];
