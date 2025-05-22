
-------------------------------------
Viewer JSON
-------------------------------------

NOTE! This module should be loaded after the signin module or the options dropdown/clear search button will be out of place.
It works well if place it after:  "moduleName": "Tools"

Portal workflow support added. The "searchWorkflowID" property in the view model config can be an id for the workflow in essentials, OR it can be a url of a portal workflow. t


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
				"targetInputBoxID": "#gcx_search",
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
The suggestion result or search submission sends the resulting address string to a workflow.  The example above sends it to Geocoder_Search.
The geocoder search workflow makes a request to look up service:

"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleline="+addressEncoded+"&sourceCountry=USA&region=Oregon&outFields=*&outSR=102100&forStorage=false&f=json"

OR

"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+lngOut.ToString()+"%2C"+latOut.ToString()

The results are returned and each item is displayed in a results picker.  Links to various commands are then created in the results picker description text, which allows for some html.  From here we can launch other workflows.


"<div style=""padding-top:4px;""><a href=""command:RunWorkflowWithArguments?workflowId=ZoomToLocation&amp;jsonIn={jsonGeometry}&amp;scaleIn=9028""><img style=""margin:0 .5em 0 0; vertical-align:middle;"" height=""16px"" alt=""Zoom to address"" src=""Resources/Images/Icons/Toolbar/zoom-feature-24.png""> Zoom to location </a><br /><a href=""command:RunWorkflowWithArguments?workflowId=Aquaculture_Site_Report&amp;jsonIn={jsonGeometry}&amp;onlyReportURL=false&amp;selectedAddressIn={address}&amp;searchIn={match_address}""><img style=""margin:0 .5em 0 0; vertical-align:middle;"" height=""16px"" alt=""Zoom to address"" src=""Resources/Images/Icons/Toolbar/reports-24.png""> Run Site Report </a><br /><a href=""command:RunWorkflowWithArguments?workflowId=Financial_Planning&amp;mapPointString={jsonGeometry}""><img style=""margin:0 .5em 0 0; vertical-align:middle;"" height=""16px"" alt=""Zoom to address"" src=""Resources/Images/Icons/charting-24.png""> Run Financial Planning </a></div>"