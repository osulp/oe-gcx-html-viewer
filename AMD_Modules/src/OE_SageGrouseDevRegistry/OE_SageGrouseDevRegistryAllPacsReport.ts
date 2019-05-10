/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SageGrouseDevRegistryViewModel } from './OE_SageGrouseDevRegistryViewModel';


var myWorkflowContext;

export class OE_SageGrouseDevRegistryAllPacsReport extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevRegistryViewModel;       
    startDateElem:any;
    endDateElem: any;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    cancelForm = function (event, element, context) {
        myWorkflowContext.setValue("finalFormBtn", 'Close');
        myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryAllPacsReport");        
        return true;
    };

    activated() {
        var thisScope = this;        

        function startChange() {
            var startDate: any = thisScope.startDateElem.value(),
                endDate: any = thisScope.endDateElem.value();

            if (startDate) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
                thisScope.endDateElem.min(startDate);
            } else if (endDate) {
                thisScope.startDateElem.max(new Date(endDate));
            } else {
                endDate = new Date();
                thisScope.startDateElem.max(endDate);
                thisScope.endDateElem.min(endDate);
            }
            thisScope.viewModel.selected_preset_date_range.set('custom');
            thisScope.viewModel.date_filter.set({
                min: thisScope.startDateElem.value(),
                max: thisScope.endDateElem.value()
            });    
        }

        function endChange() {
            var endDate: any = thisScope.endDateElem.value(),
                startDate: any = thisScope.startDateElem.value();

            if (endDate) {
                endDate = new Date(endDate);
                endDate.setDate(endDate.getDate());
                thisScope.startDateElem.max(endDate);
            } else if (startDate) {
                thisScope.endDateElem.min(new Date(startDate));
            } else {
                endDate = new Date();
                thisScope.startDateElem.max(endDate);
                thisScope.endDateElem.min(endDate);
            }
            thisScope.viewModel.selected_preset_date_range.set('custom');
            thisScope.viewModel.date_filter.set({
                min: thisScope.startDateElem.value(),
                max: thisScope.endDateElem.value()
            });  
        }

        this.startDateElem = $("#startDate").kendoDatePicker({
            change: startChange,
            value: new Date(2015, 7, 13)
        }).data("kendoDatePicker");

        this.endDateElem = $("#endDate").kendoDatePicker({
            change: endChange,
            value: new Date()
        }).data("kendoDatePicker");

        this.startDateElem.max(this.endDateElem.value());
        this.endDateElem.min(this.startDateElem.value());

        this.viewModel.selected_preset_date_range.bind(this.viewModel, (selectedDateRange) => {
            let minDate;
            let maxDate;
            this.viewModel.show_custom_date_range_data.set(true);
            if (selectedDateRange !== 'custom') {
                switch (selectedDateRange) {
                    case 'thisYear':
                        minDate = new Date(new Date().getFullYear(), 0, 1);
                        maxDate = new Date();                        
                        break;
                    case 'previousYear':
                        minDate = new Date((new Date().getFullYear() - 1), 0, 1);
                        maxDate = new Date(new Date().getFullYear() - 1, 11, 31);
                        break;
                    case 'decade':
                    default:
                        minDate = new Date(2015, 7, 13);
                        maxDate = new Date();
                        this.viewModel.show_custom_date_range_data.set(false);
                        break;
                }                 
                thisScope.viewModel.date_filter.set({
                    min: minDate,
                    max: maxDate
                });
                
            }
        });

        this.viewModel.date_filter.bind(this.viewModel, (dateFilter: any) => {
            this.startDateElem.value(dateFilter.min);
            this.endDateElem.value(dateFilter.max);
        });

        this.viewModel.selected_report_type.bind(this.viewModel, (selectedReportType) => {
            this.viewModel.processPACSummaries();
        })        
    }      

    showPACReport(evt, el, ctx) {        
        this.viewModel.processPACReport(ctx.pac_name, ctx.pac_area_dbl, ctx.pac_baseline_area_dbl, ctx.pac_data, this.viewModel.selected_report_type.get(), true, true, this.viewModel.show_custom_date_range_data.get());
    }
}