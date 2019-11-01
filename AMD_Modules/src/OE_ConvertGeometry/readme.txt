

{
	"moduleName": "OE_ConvertGeometry",	
	"libraryId": "OE_AMD",
	"require": "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryModule",	
	"configuration": {       
	},
	"views": [    
	{
        "id": "OE_ConvertGeometryView",
        "require": "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryView",
        "markup": "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryView.html",        
        "viewModelId": "OE_ConvertGeometryViewModel",
        "title": "Convert Geometry",        
        "visible": false,        
        "region": "DataRegion",
        "configuration": {}
    }
    ],
    "viewModels": [        
		{
            "id": "OE_ConvertGeometryViewModel",      
            "require": "geocortex/oe_amd/OE_ConvertGeometry/OE_ConvertGeometryViewModel",      
            "configuration": {}
        }
    ]
}
