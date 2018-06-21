
hideMapTipOnEdit setups a custom OE graphic that prevents the maptips from showing when it is selected
To set a graphic as an OE graphic a command must be called before the graphic it added to the map.
This is done in a workflow by calling the custom command "OETagNextMarkup".

These two options do not need hideMapTipOnEdit enabled
openMarkupStyleOnEdit will open style editor when a graphic is selected
workflowIDRunOnEdit will run a custom workflow when the graphic is selected
enableCustomFeatures will check for passed in key/value object.  Object pairs: color:RGBString, name:AttributeName, nameval:AttributeValue 

{
    "moduleName": "OE_Graphics",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_Graphics/OE_GraphicsModule",
    "configuration": {
        "hideMapTipOnEdit": true,
        "workflowIDRunOnEdit": "",
        "openMarkupStyleOnEdit": false,
		enableCustomFeatures: false;
    }
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


-------------------------------------
Workflow Example
-------------------------------------

RunExternalCommand

"OETagNextMarkup"
"{""color"":""rgb(255,0,0,.2)"",""name"":""Title"",""nameval"":""Value""}"