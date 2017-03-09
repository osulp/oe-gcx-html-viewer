This module is used in the M49 viewer to display the constraint output with embedded viewer commands (toggle layer, view constraints, zoom to feature).

Sample config for including in viewer along with the compiled library output.

	{
                "moduleName": "CustomFormM49",
                "moduleType": "oe.customform49.CustomFormM49Module",
                "libraryId": "Custom",
                "configuration": {},
                "views": [
                 {
                     "id": "CustomForm49ModuleView",
                     "title": "Measure 49 Estimated Constraints",
                     "viewModelId": "CustomFormM49ModuleViewModel",
                     "visible": false,
                     "markup": "Modules/CustomFormM49/CustomFormM49ModuleView.html",
                     "type": "oe.customform49.CustomForm49ModuleView",
                     "region": "DataRegion",
                     "configuration": {}
                 }
                ],
                "viewModels": [
                  {
                      "id": "CustomFormM49ModuleViewModel",
                      "type": "oe.customform49.CustomFormM49ModuleViewModel",
                      "configuration": {}
                  }
                ]
            }