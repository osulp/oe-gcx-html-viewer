/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />
/// <reference path="../../../Libs/arcgis-js-api.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oe;
(function (oe) {
    var SageGrouseDevSiting;
    (function (SageGrouseDevSiting) {
        var SageGrouseDevSitingModuleViewModel = (function (_super) {
            __extends(SageGrouseDevSitingModuleViewModel, _super);
            function SageGrouseDevSitingModuleViewModel(app, lib) {
                _super.call(this, app, lib);
                this.projectName = new Observable("");
                this.devType = new Observable("");
                this.compensatoryMitigation = new Observable("");
                this.reportURL = new Observable("");
                this.chartURL = new Observable("");
                this.directArea = new Observable("");
                this.indirectArea = new Observable("");
                this.bufferDist = new Observable("");
                this.nonHabArea = new Observable("");
                this.habDesig = new Observable("");
                this.isLek = new Observable("");
                this.landManagement = new Observable("");
                this.countyContacts = new Observable("");
                this.blmContacts = new Observable("");
                this.avoidance = new Observable("");
                //minimization: Observable<string> = new Observable<string>("");
                this.significant = new Observable("");
                this.significantMsg = new Observable("");
                this.minimization_list = new ObservableCollection([]);
            }
            SageGrouseDevSitingModuleViewModel.prototype.initialize = function (config) {
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
                    thisViewModel.avoidance.set(myWorkflowContext.getValue("avoidance") === 'True' ? 'may' : 'will not');
                    //thisViewModel.minimization.set(myWorkflowContext.getValue("minimizations"));
                    var minimizations = [];
                    myWorkflowContext.getValue("minimizations").split(';').forEach(function (min) {
                        var minimization = { minimization: min };
                        minimizations.push(minimization);
                    });
                    thisViewModel.minimization_list.set(minimizations);
                    thisViewModel.significant.set(myWorkflowContext.getValue("significant") === 'True' ? 'are' : 'are not');
                    thisViewModel.significantMsg.set(myWorkflowContext.getValue("significantMsg"));
                });
            };
            return SageGrouseDevSitingModuleViewModel;
        }(geocortex.framework.ui.ViewModelBase));
        SageGrouseDevSiting.SageGrouseDevSitingModuleViewModel = SageGrouseDevSitingModuleViewModel;
    })(SageGrouseDevSiting = oe.SageGrouseDevSiting || (oe.SageGrouseDevSiting = {}));
})(oe || (oe = {}));
//# sourceMappingURL=SageGrouseDevSitingModuleViewModel.js.map