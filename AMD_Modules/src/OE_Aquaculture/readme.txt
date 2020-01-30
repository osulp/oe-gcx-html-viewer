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
        "configuration": {}
    }
    ],
    "viewModels": [        
		{
            "id": "OE_AquacultureDynamicFormViewModel",      
            "require": "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormViewModel",      
            "configuration": {}
        }
    ]
}