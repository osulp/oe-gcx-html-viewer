/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SageGrouseDevRegistryViewModel } from './OE_SageGrouseDevRegistryViewModel';


var myWorkflowContext;
//var myApp;
//var myLibID;

export class OE_SageGrouseDevRegistryAllPacsReport extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevRegistryViewModel;    

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    cancelForm = function (event, element, context) {
        myWorkflowContext.setValue("finalFormBtn", 'Close');
        myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryAllPacsReport");
        //$(".panel-header-button.right.close-16.bound-visible").show();
        return true;
    };

    activated() {
        var thisScope = this;
        ///////////////////////////////////////
        // RangeSlider Plugin Alternate option with bubble handles
        //////////////////////////////////////        
        $("#time-slider").dateRangeSlider({
            symmetricPositionning: true,
            bounds: {
                min: new Date(2015, 7, 13),
                max: new Date()
            },
            step: { days: 1 },
            defaultValues: {
                min: new Date(2015, 7, 13),
                max: new Date()
            }
        });
        $("#time-slider").bind("userValuesChanged ", function (event, data) {            
            thisScope.viewModel.selected_preset_date_range.set('custom'); 
            thisScope.viewModel.date_filter.set({
                min: data.values.min,
                max: data.values.max
            });                               
        });

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
                $("#time-slider").dateRangeSlider("min", minDate);
                $("#time-slider").dateRangeSlider("max", maxDate);
                thisScope.viewModel.date_filter.set({
                    min: minDate,
                    max: maxDate
                });
                
            }
        });
        this.viewModel.selected_report_type.bind(this.viewModel, (selectedReportType) => {
            this.viewModel.processPACSummaries();
        })
        //$("#time-slider").rangeSlider("resize");
    }      

    showPACReport(evt, el, ctx) {        
        this.viewModel.processPACReport(ctx.pac_name, ctx.pac_area_dbl, ctx.pac_baseline_area_dbl, ctx.pac_data, this.viewModel.selected_report_type.get(), true, true, this.viewModel.show_custom_date_range_data.get());
    }
}