/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_HopscotchViewModel } from "../OE_Hopscotch/OE_HopscotchViewModel";

export class OE_HopscotchView extends ViewBase {

    app: ViewerApplication;
    hopscotch;
    canShowTour: boolean;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    
    /*buttonClearSearch(event, element, context: OE_HopscotchViewModel) {
        context.ClearSearchInput();
    }

    inputDoSearch(event, element, context: OE_HopscotchViewModel) {

        if (event.code == "Enter") {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
    }

    buttonDoSearch(event, element, context: OE_HopscotchViewModel) {
        context.searchFieldText.set($("#oeLayerSearchInput").val());
        context.DoSearch();
    }

    buttonToggleSelected(event, element, context: OE_HopscotchViewModel) {
        context.ToggleSelected();
    }*/

    showTour(_evt, _el, context: any, example?: any) {

        if (this.canShowTour || _el) {
            this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
            if (this.hopscotch) {
                // Set the context of the scope for the function callbacks to relate to the right context.  Checks against filterView of viewModel which gets passed on click events.
                var thisScope = context.filterView ? this : context;
                var demoFilterID = "#12SageGrouseProbabilityofWinterHabitatUseNonhabitat";
                // Define the tour!
                let tour_id = example ? example.tour_id : 'default';
                let tour;
                switch (tour_id) {
                    case 'herbicide_vale':
                    case 'herbicide_no_sagebrush':
                    case 'juniper_removal':
                        tour = {
                            id: example.tour_id,
                            steps: [
                                {
                                    title: "EXAMPLE: " + example.label,
                                    content: example.description,
                                    target: '#' + example.tour_id,
                                    yOffset: -20,
                                    placement: "right",
                                    //showCTAButton: true,
                                    //ctaLabel: "Apply Query",
                                    //onCTA: () => {
                                    //    thisScope.hopscotch.endTour();
                                    //    thisScope.hopscotch = null;
                                    //    thisScope.applyExample(null, null, example);
                                    //}
                                }
                            ],
                            showCloseButton: false,
                            showPrevButton: false,
                        };
                        break;
                    case 'default':
                    default:
                        tour = {
                            id: "cons-pln-tour",
                            steps: [
                                {
                                    title: "Tour the customized query features",
                                    content: "The Query Data Tool allows you to easily construct a customized, web-based query by filtering values of multiple data layers. The tool queries hexagons (1 square mile in size) across the sagebrush landscape in Oregon (displayed in blue over the map). As filters are applied, hexagons are removed from the selection to identify areas of interest. Click the Next button to continue through this 6-step tutorial.",
                                    target: ".panel-title-contents.bound-visible-inline",
                                    yOffset: -20,
                                    placement: "right",
                                    showCTAButton: _el ? false : true,
                                    ctaLabel: "Don't Show Again",
                                    onCTA: () => {
                                        thisScope.canShowTour = false;
                                        thisScope.hopscotch.endTour();
                                    }
                                },
                                {
                                    title: "Show or hide hexagon layer",
                                    content: "Use the SHOW OR HIDE HEXAGON LAYER check box at the top of the screen to show (check) or hide (uncheck) the blue hexagon layer. By unchecking the box, you can view data layers underneath. View or change data layers being displayed through the red <button class=\"wtm-button bound-visible\" style=\"background: rgb(26, 114, 196) none repeat scroll 0 % 0 %;\">I want to...</button>  button in the map or by selecting the layers tab in the lower left corner of the screen (after unchecking the box). Then check the box again to view your query.",
                                    target: "#toggle-hex-layer",
                                    placement: "right",
                                    yOffset: -20
                                },
                                {
                                    title: "View and modify example queries",
                                    content: "The EXAMPLE QUERIES section shows three sample queries targeted for specific management questions. These queries can be viewed as examples and/or modified to reflect specific criteria for a question or area of interest.",
                                    target: ".example-queries",
                                    placement: "right",
                                    yOffset: -20,
                                    onShow: () => {
                                        thisScope.toggleTabFilters(null, null, null, 'Data');
                                        thisScope.viewModel.show_example_filters.set(true);
                                    }
                                },
                                {
                                    title: "Show your current query selection",
                                    content: "As layers are filtered, the ACTIVE FILTERS section will show which layers are selected and what criteria are defined in the selection. To remove a filter, click the x button to the right of the filter name. Once a selection has been made, you will see the option to generate a report, download your selected hexagons, and clear all filters. To download base data layers, use the Download Data tool under the red <button class=\"wtm-button bound-visible\" style=\"background: rgb(26, 114, 196) none repeat scroll 0 % 0 %;\">I want to...</button> menu.",
                                    target: "#active-filters",
                                    placement: "right",
                                    yOffset: -20,
                                    onShow: () => {
                                        //thisScope.toggleTabFilters(null, null, null, 'Data');
                                        //thisScope.viewModel.show_example_filters.set(false); 
                                    },
                                },
                                {
                                    title: "Query based on data layers or geographic area",
                                    content: "Choose the DATA FILTERS section (left) or GEOGRAPHIC FILTER section (right). Data filters change query criteria through check boxes or slider bars. Geographic filters limit the area of your selection by drawing an area of interest or uploading a shapefile delineating an area. Both data filters and geographic filters can be applied in the same query.",
                                    target: "#filter-toggle",
                                    placement: "right",
                                    yOffset: -20
                                    //onShow: () => {
                                    //    thisScope.toggleTabFilters(null, null, null, 'Data');
                                    //    thisScope.viewModel.filterText.set('wi');
                                    //},
                                    //showCTAButton: true,
                                    //ctaLabel: "Show me",
                                    //onCTA: () => {
                                    //    thisScope.viewModel.filterText.set('wi');
                                    //    $(demoFilterID).click();
                                    //}
                                },
                                {
                                    title: "Find a data filter",
                                    content: "Scroll through the data filters below or search by name through the Quick Find menu. Data layers for filtering are organized into four folders by theme: Ownership and Management Designation, Existing Condition, Restoration Potential, and Energy Development Potential. Expand and contract the folders by clicking the plus or minus box to the left of the folder name.",
                                    target: ".ul-query-folders",
                                    placement: "right",
                                    //onShow: () => {
                                    //    thisScope.toggleTabFilters(null, null, null, 'Data');
                                    //    thisScope.viewModel.filterText.set('wi');
                                    //    if ($(demoFilterID)[0].checked) {
                                    //        $(demoFilterID).click();
                                    //    }
                                    //}
                                },
                                {
                                    title: "Adjust filter settings",
                                    content: "Change the filter settings by selecting or de-selecting check boxes, or modifying the range sliders by clicking or sliding the bar. For more information about the data layers available for filtering, click the (i)  icon to the right of the layer name.",
                                    target: ".ul-query-layers",
                                    yOffset: -20,
                                    placement: "right",
                                    //onShow: () => {
                                    //    thisScope.toggleTabFilters(null, null, null, 'Data');
                                    //    thisScope.viewModel.filterText.set('wi');
                                    //    if ($(demoFilterID)[0].checked) {
                                    //        $(demoFilterID).click();
                                    //    }
                                    //}
                                }
                                //{
                                //    title: "Show/Hide selected hexagons",
                                //    content: "To toggle the display of the selected hexagon layer, use this checkbox.",
                                //    target: ".active-filter-header-wrapper.dashboard-headers",
                                //    placement: "right",
                                //    yOffset: -20,
                                //    showCTAButton: true,
                                //    ctaLabel: "Show me",
                                //    onCTA: () => {
                                //        $("#toggle-hex-layer").click();
                                //    }
                                //},
                            ],
                            showCloseButton: true,
                            showPrevButton: true,
                            i18n: {
                                stepNums: ['', '1', '2', '3', '4', '5', '6', '7']
                            },
                            onEnd: () => {
                                thisScope.viewModel.show_example_filters.set(false);
                                thisScope.resetFilters();
                                thisScope.clearSearch();
                            },
                            onClose: () => {
                                thisScope.viewModel.show_example_filters.set(false);
                                thisScope.resetFilters();
                                thisScope.clearSearch();
                            }
                        };
                        break;
                }
                // Start the tour!
                this.hopscotch.startTour(tour);
            }
        }
    }
}