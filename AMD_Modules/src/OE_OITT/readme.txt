-------------------------------------
Module Include
-------------------------------------

{
    "moduleName": "OE_OITT",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_OITT/OE_OITTModule",
    "configuration": {         
    },
	"views": [
    {
        "id": "OE_OITTView",
        "require": "geocortex/oe_amd/OE_OITT/OE_OITTView",
        "markup": "geocortex/oe_amd/OE_OITT/OE_OITTView.html",        
        "viewModelId": "OE_OITTViewModel",
        "title": "OITT Project Report",
        "visible": false,        
        "region": "ModalWindowRegion",
        "configuration": {}
    }],
	"viewModels": [
    {
        "id": "OE_OITTViewModel",      
        "require": "geocortex/oe_amd/OE_OITT/OE_OITTViewModel",      
        "configuration": {
			"reportMapServiceName": "OITT_2016"
		}
    }]
}

-------------------------------------
Required library
-------------------------------------

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



-------------------------------------
Chart Module Changes
-------------------------------------

The default mouse events cause OWRT charts to throw errors because the data is not linked to data from the map.
Events that would selecte the data on the map or show the map need to be removed.  The behaviors below should throw no errors.

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
                "OE_commands_removed": "HighlightChartFeatureSet",
                "commands": [
                    "ClearChartHighlights"                                
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
}











-------------------------------------
Workflow Example
-------------------------------------
N/A