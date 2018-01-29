 
 
 {
    "moduleName": "OE_Search",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_Search/OE_SearchModule",
    "configuration": {},
    "views": [{
        "id": "OE_SearchBar",
        "require": "geocortex/framework/ui/ViewBase",
        "markup": "geocortex/oe_amd/OE_Search/OE_Search.html",
        "region": "BannerContentRegion",
        "visible": true
    }],
    "viewModels": []
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