/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

module oe.customform49 {

    export class CustomFormM49ModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;       

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            myApp = this.app;
            myLibID = this.libraryId;

            this.app.registerActivityIdHandler("displaycustomform_m49", function CustomEventHandler(workflowContext, contextFunctions) {
                myWorkflowContext = $.extend({}, workflowContext);
                myApp.commandRegistry.command("ActivateView").execute("CustomForm49ModuleView");
                document.getElementById("hvfl_soil").innerHTML = myWorkflowContext.getValue("hvfl_soil");
                document.getElementById("hvf").innerHTML = myWorkflowContext.getValue("hvfl_forest");
                document.getElementById("hvfl_dairy").innerHTML = myWorkflowContext.getValue("hvfl_dairy");
                document.getElementById("hvf_likely").innerHTML = myWorkflowContext.getValue("likely_hvf");
            });
        }

    }
}