{
                    "moduleName": "OE_Aquaculture",
                    "libraryId": "OE_AMD",
                    "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureModule",
                    "configuration": {},
                    "views": [
                        {
                            "id": "OE_AquacultureDynamicFormView",
                            "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormView",
                            "markup": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormView.html",
                            "viewModelId": "OE_AquacultureDynamicFormViewModel",
                            "title": "Aquaculture Site Report: Land-Based",
                            "visible": false,
                            "region": "DataRegion",                            
                            "configuration": {                           
                            }
                        },
                        {
                            "id": "OE_AquacultureFinancialView",
                            "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView",
                            "markup": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView.html",
                            "title": "Aquaculture Financial Planning",
                            "viewModelId": "OE_AquacultureFinancialViewModel",
                            "visible": false,
                            "region": "ModalWindowRegion",
                            "configuration": {}
                        }
                    ],
                    "viewModels": [
                        {
                            "id": "OE_AquacultureDynamicFormViewModel",
                            "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormViewModel",
                            "configuration": {}
                        },
                        {
                            "id": "OE_AquacultureFinancialViewModel",
                            "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialViewModel",
                            "configuration": {
                                "configUri": "./Resources/ModuleConfig/AquacultureFinancePlnModule/config.json"
                            }
                        }
                    ]
                }