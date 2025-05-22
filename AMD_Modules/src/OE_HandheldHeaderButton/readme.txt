-------------------------------------
Viewer JSON
-------------------------------------

This needs to be loaded after the IWT and before the header tools button.


 {
    "moduleName": "OE_HandheldHeaderButton",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_HandheldHeaderButton/OE_HandheldHeaderButtonModule",
    "configuration": {},
    "views": [
        {
            "id": "OE_HandheldHeaderButtonView",
            "require": "geocortex/oe_amd/OE_HandheldHeaderButton/OE_HandheldHeaderButtonView",
            "markup": "geocortex/oe_amd/OE_HandheldHeaderButton/OE_HandheldHeaderButtonView.html",
            "viewModelId": "OE_HandheldHeaderButtonViewModel",
            "title": "Header Button",
            "visible": true,
            "region": "HeaderRegion",
            "configuration": {}
        }
		],
    "viewModels": [
        {
            "id": "OE_HandheldHeaderButtonViewModel",
            "require": "geocortex/oe_amd/OE_HandheldHeaderButton/OE_HandheldHeaderButtonViewModel",
            "configuration": {
				"buttonText": "Button",
                "commandName": "OpenAndFocusIWanToMenu",
                "commandParam": ""                
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