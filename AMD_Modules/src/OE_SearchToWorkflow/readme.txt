
 {
    "moduleName": "OE_SearchToWorkflow",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowModule",
    "configuration": {},
    "views": [
        {
            "id": "OE_SearchToWorkflowView",
            "require": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowView",
            "markup": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowView.html",
            "viewModelId": "OE_SearchToWorkflowViewModel",
            "title": "OE Search To Workflow",
            "visible": true,
            "region": "BannerContentRegion",
            "configuration": {}
        },
		{
            "id": "OE_SearchToWorkflowSuggestView",
            "require": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestView",
            "markup": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowSuggestView.html",
            "viewModelId": "OE_SearchToWorkflowViewModel",
            "title": "OE Search Suggestion",
            "visible": true,
            "region": "BannerContentRegion",
            "configuration": {}
        }
		],
    "viewModels": [
        {
            "id": "OE_SearchToWorkflowViewModel",
            "require": "geocortex/oe_amd/OE_SearchToWorkflow/OE_SearchToWorkflowViewModel",
            "configuration": {
                "searchWorkflowID": "Geocoder_Search",
                "searchArgumentName": "searchIn",
                "workflowSearchText": "Search for location",
                "defaultSearchOption": "workflow",
				"suggestionSearchDelayMS":250
            }
        }
		]
},

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
Workflow Example
-------------------------------------

