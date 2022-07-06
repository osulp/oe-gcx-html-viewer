{
                    "moduleName": "OE_WildfireRiskLegend",
                    "libraryId": "OE_AMD",                    
                    "require": "geocortex/oe_amd/OE_WildfireRiskLegend/OE_WildfireRiskLegendModule",
                    "views": [{
                        "id": "OE_WildfireRiskLegend",
                        "require": "geocortex/oe_amd/OE_WildfireRiskLegend/OE_WildfireRiskLegendView",
                        "markup": "geocortex/oe_amd/OE_WildfireRiskLegend/OE_WildfireRiskLegendView.html",
                        "viewModelId": "OE_WildfireRiskLegendViewModel",
                        "title": "Wildfire Risk Legend",
                        "visible": true,
                        "region": "MiddleRightMapRegion",
                        "configuration": {
                        }
                    }],
                    "viewModels": [
                        {
                            "id": "OE_WildfireRiskLegendViewModel",
                            "require": "geocortex/oe_amd/OE_WildfireRiskLegend/OE_WildfireRiskLegendViewModel",
                            "configuration": {}
                        }],
                    "configuration": {}
                },