***READ BEFORE PROCEEDING***
The instructions below involve altering Latitude Code which may be detrimental to all applications.  Please backup before making any changes


These instructions will help you to offset the final measurement label as well as toggle on and off the measurement labels.  Either one can be done without the use of the other.  So if you would like to just use the custom module to hide/show the labels, you can.  Or if you would like to just modify the Latitude code to move the final measurement label, you can do that too.

**offset total measurement label
1) Backup the working file first!
2) To move the total measurement label so that it doesn't hide where the measurement line ends, you'll need to open the Mapping.js file that is found in the wwwroot/{Html2.6 location}/Resources/Compiled/Mapping.js
3) Search for the following: a.highlightedLabelGraphic=f.MeasurementUtils.addHighlightedLabelToMap(a.labelStr,b,a.id,this.measurementMarkupLayerId,this.app,!1,this._textOffset,this._textOffset,"Arial",this._textSize
4) Replace the second 'this._textOffset' with -15 like so:
a.highlightedLabelGraphic=f.MeasurementUtils.addHighlightedLabelToMap(a.labelStr,b,a.id,this.measurementMarkupLayerId,this.app,!1,this._textOffset,-15/*this._textOffset*/,"Arial",this._textSize
5) Save and you're done.  I would recommend testing the app's functionality before closing your text editor so that you can always 'undo' and save again to go back to a working state.  Again, backup the working file first!

**custom module to show/hide measurement labels
In this zip file there are 2 files: Custom.js and MeasureLabelsModule.ts.  The MeasureLabelsModule.ts is used to create the Custom.js.  The following instructions are geared to just use the custom.js file.

1) In the directory where you installed the HTML5 viewer (wwwroot/{Html2.6 location}/) create a folder named 'Libraries'.
2) In that folder, create a folder named 'Custom'
3) In that folder, create a folder named 'Compiled'
4) Place the Custom.js file in there.
5) Open the config folder in the site/viewer that you are interested in adding this module to (\Latitude Geographics\Geocortex Essentials\{Instance Name}\REST Elements\Sites\{Site Name}\Viewers\{Viewer Name}\VirtualDirectory\Resources\Config\Default)
6) Open Desktop.json.js
7) Find the "defaultLibraryId": "Mapping"
8) In the "libraries" array, add the following:
    {
        "id":"Custom",
        "uri":"Libraries/Custom/Compiled/Custom.js",
        "locales":[]
    },
9) In the "modules" array, add the following:
    {
        "libaryId": "Custom",
        "moduleName": "showHideLabels",
        "moduleType":"measureLabelsModule.MeasureLabelsModule",
        "configuration":{},
        "views":[],
        "viewModels": []
    },
10) Next, add a button to the expandable menu for measuring in the toolbar. Please be aware that there are 2 toolbars to add it to, add it to the tabbedtoolbarmodule.  To do this, do a search for "stateName": "MeasureState",
              "widgetId": "CompactToolbarTransientBase",. 
11) Once you find it, add the following code to the items array ( I added this just after the snapping button):
                    {
                        "id":"MeasurementLineLabelToggle",
                        "type":"toggleButton",
                        "iconUri":"Resources/Images/Icons/Toolbar/draw-text-24.png",
                        "toggleStateName":"",
                        "toggleOn":{
                            "name":"Hide Labels",
                            "command":"ChangeTheDisplay",
                            "commandParameter":"hide",
                            "tooltip":"Disable Labels for Measurement Lines"
                        },
                        "toggleOff":{
                            "name":"Show Labels",
                            "command":"ChangeTheDisplay",
                            "commandParameter":"show",
                            "tooltip":"Enable Labels for Measurement Lines"
                        }
                        
                    }
12)  The measureState will look like this when it is done:
{
        "moduleName": "TabbedToolbar",
        "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.TabbedToolbarModule",
        "configuration": {
          "isEnabled": true,
          "transientElements": [
            {
                "stateName": "MeasureState",
                "widgetId": "TabbedToolbarTransientBase",
                "region": "MeasurementToolControlRegion",
                "items": [
                    {
                        "id": "MeasureSnappingToggle",
                        "type": "toggleButton",
                        "iconUri": "Resources/Images/Icons/Toolbar/snapping-24.png",
                        "toggleStateName": "SnappingState",
                        "toggleOn": {
                            "name": "@language-toolbar-snapping-enable",
                            "command": "ActivateSnapping",
                            "tooltip": "@language-toolbar-snapping-alt-enable"
                        },
                        "toggleOff": {
                            "name": "@language-toolbar-snapping-disable",
                            "command": "DeactivateSnapping",
                            "tooltip": "@language-toolbar-snapping-alt-disable"
                        }
                    },
                    {
                        "id":"MeasurementLineLabelToggle",
                        "type":"toggleButton",
                        "iconUri":"Resources/Images/Icons/Toolbar/draw-text-24.png",
                        "toggleStateName":"",
                        "toggleOn":{
                            "name":"Hide Labels",
                            "command":"ChangeTheDisplay",
                            "commandParameter":"hide",
                            "tooltip":"Disable Labels for Measurement Lines"
                        },
                        "toggleOff":{
                            "name":"Show Labels",
                            "command":"ChangeTheDisplay",
                            "commandParameter":"show",
                            "tooltip":"Enable Labels for Measurement Lines"
                        }
                        
                    },
                    {
                        "id": "MeasureSelectSnappingLayersButton",
                        "type": "button",
                        "iconUri": "Resources/Images/Icons/Toolbar/layers-snapping-24.png",
                        "command": "ActivateSelectLayersForSnapping",
                        "commandParameter": null,
                        "hideOnDisable": false,
                        "name": "@language-toolbar-snapping-select-layers",
                        "tooltip": "@language-toolbar-snapping-select-layers-tooltip"
                    }
                ]
            },