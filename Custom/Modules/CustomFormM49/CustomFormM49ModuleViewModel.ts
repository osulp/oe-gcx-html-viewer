/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

module oe.customform49 {

    export class CustomFormM49ModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        //greeting: Observable<string> = new Observable<string>();
        //okBtn_lbl = new Observable();
        //cancelBtn_lbl = new Observable();
        //userID_lbl = new Observable();
        //userName_lbl = new Observable();

        hvfl_soil: Observable<string> = new Observable<string>();
        //hvfl_forest = new Observable();
        //hvfl_dairy = new Observable();
        //likely_hvf = new Observable();
        //uda: Observable<esri.geometry.Extent> =  new Observable<esri.geometry.Extent>();

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
                //document.getElementById("uda").value = myWorkflowContext.getValue("uda");
            });
        }

    }
}