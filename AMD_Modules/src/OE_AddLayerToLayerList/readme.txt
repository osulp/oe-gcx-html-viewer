{
        "moduleName": "OE_AddLayerToLayerList",
        "libraryId": "OE_AMD",
        "require": "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListModule",
        "configuration": {
          "menuItems": [
            {
              "text": "Add Layers",
              "description": "Add layers from OE Layer Catalog",
              "iconUri": "Resources/Images/Icons/Toolbar/layers-add-24.png",
              "command": "AddMapLayerInteractive"
            },
            {
              "text": "Upload",
              "description": "Upload your own layers.",
              "iconUri": "Resources/Images/Icons/Toolbar/upload-24.png",
              "command": "UploadData"
            },
            {
              "text": "Re-Order",
              "description": "Change the layer drawing order",
              "iconUri": "Resources/Images/Icons/Toolbar/layers-reorder-24.png",
              "command": "OpenLayerDrawingOrderGroups"
            },
            {
              "text": "Show Legend",
              "description": "View the Legend",
              "iconUri": "Resources/Images/Icons/legend-16.png",
              "command": "SwitchToLegendView"
            },
            {
              "text": "Show Layers",
              "description": "View the Layer List",
              "iconUri": "Resources/Images/Icons/Toolbar/layers-24.png",
              "command": "ShowLayerList"
            }
          ]
        },
		"views": [
                        {
                            "id": "OE_AddLayerToLayerListView",
                            "require": "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListView",
                            "markup": "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListView.html",
                            "viewModelId": "OE_AddLayerToLayerListViewModel",
                            "title": "Layer Search",
                            "visible": false,
                            "region": "ModalWindowRegion",                            
                            "configuration": {                           
                            }
                        }
					],
		"viewModels": [
                        {
                            "id": "OE_AddLayerToLayerListViewModel",
                            "require": "geocortex/oe_amd/OE_AddLayerToLayerList/OE_AddLayerToLayerListViewModel",
                            "configuration": {
								"remoteServiceURLs":[
									"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall"
								]
							}
                        }
		]
}