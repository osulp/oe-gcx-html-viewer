{
    "configuration": {
        "libraries": [{
            "id": "OE_AMD",
            "async": true,
            "location": "Libraries/Custom/AMD",
            "locales": [
                {
                    "locale": "inv",
                    "uri": "Libraries/Custom/AMD/OE_AMD-Language.json"
                }
            ]
        }],

            "modules": [{
                "moduleName": "OE_Aquaculture",
                "libraryId": "OE_AMD",
                "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureModule",
                "configuration": {},
                "views": [                    
                    {
                        "id": "OE_AquacultureFinancialView",
                        "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView",
                        "markup": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView.html",
                        "title": "Oregon Aquaculture Financial Planning Tool",
                        "viewModelId": "OE_AquacultureFinancialViewModel",
                        "visible": true,
                        "region": "ApplicationRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [                    
                    {
                        "id": "OE_AquacultureFinancialViewModel",
                        "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialViewModel",
                        "configuration": {
                            "configUri": "./Resources/ModuleConfig/AquacultureFinancePlnModule/config.json"
                        }
                    }
                ]
            }]
    }
}