 
 
 {
                        "moduleName": "OE_Imagery",
                        "libraryId": "OE_AMD",
                        "require": "geocortex/oe_amd/OE_Imagery/OE_ImageryModule",
                        "configuration": {},
                        "views": [{
                            "id": "OE_ImageryView",
                            "require": "geocortex/oe_amd/OE_Imagery/OE_ImageryView",
                            "markup": "geocortex/oe_amd/OE_Imagery/OE_ImageryView.html",
                            "viewModelId": "OE_ImageryViewModel",
                            "title": "Imagery: Compare and Download",
                            "visible": false,
                            "region": "DataRegion",
                            "configuration": {
                            }
                        }],
                        "viewModels": [
                            {
                                "id": "OE_ImageryViewModel",
                                "require": "geocortex/oe_amd/OE_Imagery/OE_ImageryViewModel",
                                "configuration": {}
                            }]
                    }



//"region": "TopRightMapRegion",




Required library

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