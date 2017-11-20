/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />

module oe.SageGrouseDevSiting {

    export class SageGrouseDevSitingModuleViewModel extends geocortex.framework.ui.ViewModelBase {


        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        projectName: Observable<string> = new Observable<string>("");
        devType: Observable<string> = new Observable<string>("");
        compensatoryMitigation: Observable<string> = new Observable<string>("");
        reportURL: Observable<string> = new Observable<string>("");
        chartURL: Observable<string> = new Observable<string>("");
        directArea: Observable<string> = new Observable<string>("");
        indirectArea: Observable<string> = new Observable<string>("");
        bufferDist: Observable<string> = new Observable<string>("");
        nonHabArea: Observable<string> = new Observable<string>("");
        habDesig: Observable<string> = new Observable<string>("");
        isLek: Observable<string> = new Observable<string>("");
        landManagement: Observable<string> = new Observable<string>("");
        countyContacts: Observable<string> = new Observable<string>("");
        blmContacts: Observable<string> = new Observable<string>("");
        avoidance: Observable<string> = new Observable<string>("");
        //minimization: Observable<string> = new Observable<string>("");
        significant: Observable<string> = new Observable<string>("");
        minimization_list: ObservableCollection<string> = new ObservableCollection([]);

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            myApp = this.app;
            myLibID = this.libraryId;
            var thisViewModel = this;

            this.app.registerActivityIdHandler("devSitingForm", function CustomEventHandler(workflowContext, contextFunctions) {
                myWorkflowContext = $.extend({}, workflowContext);
                myApp.commandRegistry.command("ActivateView").execute("SageGrouseDevSitingModuleView");
                thisViewModel.projectName.set(myWorkflowContext.getValue("projectName"));
                thisViewModel.devType.set(myWorkflowContext.getValue("devType"));
                thisViewModel.compensatoryMitigation.set(myWorkflowContext.getValue("compensatoryMitigation"));
                thisViewModel.reportURL.set(myWorkflowContext.getValue("reportURL"));
                thisViewModel.chartURL.set(myWorkflowContext.getValue("chartURL"));
                thisViewModel.directArea.set(myWorkflowContext.getValue("directArea"));
                thisViewModel.indirectArea.set(myWorkflowContext.getValue("indirectArea") + " Acres");
                thisViewModel.bufferDist.set(myWorkflowContext.getValue("bufferDist") + " km");
                thisViewModel.nonHabArea.set(myWorkflowContext.getValue("nonHabArea") + " Acres");
                thisViewModel.habDesig.set(myWorkflowContext.getValue("habDesig"));
                thisViewModel.isLek.set(myWorkflowContext.getValue("isLek") === 'True' ? 'Yes' : 'No');
                thisViewModel.landManagement.set(myWorkflowContext.getValue("landManagement"));
                thisViewModel.countyContacts.set(myWorkflowContext.getValue("countyContacts"));
                thisViewModel.blmContacts.set(myWorkflowContext.getValue("blmContacts"));
                thisViewModel.avoidance.set(myWorkflowContext.getValue("avoidance") === 'True' ? 'may' : 'will not' );
                //thisViewModel.minimization.set(myWorkflowContext.getValue("minimizations"));
                let minimizations = [];
                myWorkflowContext.getValue("minimizations").split(',').forEach((min) => {
                    let minimization = { minimization: min };
                    minimizations.push(minimization);
                });
                thisViewModel.minimization_list.set(minimizations);
                thisViewModel.significant.set(myWorkflowContext.getValue("significant") === 'True' ? 'is' : 'is not');
            });
        }

    }
}