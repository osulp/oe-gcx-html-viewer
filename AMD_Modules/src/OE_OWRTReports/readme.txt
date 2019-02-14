-------------------------------------
Module Include
-------------------------------------

{
    "moduleName": "OE_OWRTReports",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsModule",
    "configuration": {
        
    },
	"views": [
    {
        "id": "OE_OWRTReportsView",
        "require": "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsView",
        "markup": "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsView.html",        
        "viewModelId": "OE_OWRTReportsViewModel",
        "title": "OWRT Project Report",        
        "visible": false,        
        "region": "NavigationMapRegion",
        "configuration": {}
    }],
	"viewModels": [
    {
        "id": "OE_OWRTReportsViewModel",      
        "require": "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsViewModel",      
        "configuration": {}
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
Workflow Example
-------------------------------------
N/A