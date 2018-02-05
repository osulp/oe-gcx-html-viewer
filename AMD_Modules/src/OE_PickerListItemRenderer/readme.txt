  This module will target the button element in the picker results list and change the dom element layout to support custom inline links that run gcx commands.
  The commands are entered into the description field of a picker list in a workflow.

  The only reason this module exists is the geocortex item renderer template "/Mapping/infrastructure/ui/components/FeatureSelector/Templates/ComplexButtonResultTemplateView.html"
  uses a button around the entire element.  This prevents a link from functioning within the button in Firefox and IE11.  If this changes at some point or there is a way to replace
  the template this module will no longer be needed.



  Workflow desciption example:
  
  "<div style=""padding-top:4px;""><a href=""command:RunWorkflowWithArguments?workflowId=ZoomToPoint&amp;jsonIn={jsonGeometry}&amp;scaleIn=9028"">
  <img style=""margin:0 .5em 0 0"" height=""16px"" alt=""Zoom to address"" src=""Resources/Images/Icons/Toolbar/zoom-feature-24.png""> Show on Map </a></div>"




  Include the module in the config file
  
  {
    "moduleName": "OE_PickerListItemRenderer",
    "libraryId": "OE_AMD",
    "require": "geocortex/oe_amd/OE_PickerListItemRenderer/OE_PickerListItemRendererModule",
    "configuration": {
        "targetClass": ".display-result-picker .gcx-list-button",
		"moveClass": ".gcx-list-desc"
    }
},


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