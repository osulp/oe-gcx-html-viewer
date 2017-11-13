This module is used in the M49 viewer to display the constraint output with embedded viewer commands (toggle layer, view constraints, zoom to feature).

Sample config for including in viewer along with the compiled library output.

	{
                "moduleName": "SageGrouseDevSiting",
                "moduleType": "oe.SageGrouseDevSiting.SageGrouseDevSitingModule",
                "libraryId": "Custom",
                "configuration": {},
                "views": [
                 {
                     "id": "SageGrouseDevSitingModuleView",
                     "title": "Measure 49 Estimated Constraints",
                     "viewModelId": "SageGrouseDevSitingModuleViewModel",
                     "visible": false,
                     "markup": "Modules/SageGrouseDevSiting/SageGrouseDevSitingModuleView.html",
                     "type": "oe.SageGrouseDevSiting.SageGrouseDevSitingModuleView",
                     "region": "DataRegion",
                     "configuration": {}
                 }
                ],
                "viewModels": [
                  {
                      "id": "SageGrouseDevSitingModuleViewModel",
                      "type": "oe.SageGrouseDevSiting.SageGrouseDevSitingModuleViewModel",
                      "configuration": {}
                  }
                ]
            }