Use the showLayerDescription configuration to toggle visiblity of the layer description at the top of the layer options list.

metadataHyperlinkOverride requires a layer hyperlink named "Metadata" to override the "View metadata" url and/or a "Download" layer hyperlink to override "Download layer".


{
	"moduleName": "OE_LayerActions",	
	"libraryId": "OE_AMD",
	"require": "geocortex/oe_amd/OE_LayerActions/OE_LayerActionsModule",
	"configuration": {
        "showLayerDescription":true,
		"showLayerDescViewHide":true,
		"allowAllLayerTypes:":false,
		"metadataHyperlinkOverride": true,
		"expandLayerTreeOnVisible": true,
		"downloadWorkflowOverride": {
					"workflowID":"Area_of_Interest",
					"argNames":["test1","test2","test3"],
					"argValues":["val1","val2","val3"]
				}
	}
}


