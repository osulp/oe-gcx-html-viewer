/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { ImageProperties } from "geocortex/infrastructure/commandArgs/ImageProperties";
import { DisplayNotificationArgs, NotificationActionButton } from "geocortex/infrastructure/commandArgs/DisplayNotificationArgs";
//import { contains } from "geocortex/framework/utils/ArrayUtils";
import { Observable } from "geocortex/framework/observables";
import { AddStatusArgs } from "geocortex/infrastructure/commandArgs/AddStatusArgs";
import { base64Decode } from "geocortex/framework/utils/utils";

//import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
//import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";
//import { request } from "geocortex/geocortex";
//import { parseNumber } from "geocortex/infrastructure/FormatUtils";

declare var $: any;
declare var html2canvas: any;

export class OE_SageGrouseConsPlnView extends ViewBase {
    jquiSlider = HTMLElement;
    amount = HTMLElement;
    root: HTMLElement;
    app: ViewerApplication;
    drawToolBar: any;
    esriMap: any;
    hex_layer_url: string;
    geo_filter: any;
    displayNotification: DisplayNotificationArgs;
    //aoiGeometry: any;
    gpDissolveURL: string = 'https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/dissolve/GPServer/dissolve';
    gpExtractHexURL: string = 'https://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/geoprocessing/extractFilteredHex/GPServer/extractFilteredHex';
    uploadGeoFilterLayerName = '';
    hopscotch;
    canShowTour: boolean = true;
    hasLoaded: boolean = false;
    activeTour: any;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.geo_filter = {
            enabled: false,
            ids: [],
            type: '',
            layer: null
        }
    }

    activated() {
        if (!this.isActive) {
            if (this.regionName === "RightPanelRegion") {
                ////set right panel to display and fire map resize event to get map displaying properly
                $(".large-shell-right").css("display", "block");
                $(".large-shell-center").css("right", "350px");
                this.app.commandRegistry.command("RecenterMapOnNextMapResize").execute();
                this.app.commandRegistry.command("MapResize").execute();
            }
            //this.setDefaultFilters(true);
            this.viewModel.show_hex_layer.bind(this, () => {
                this.viewModel._toggleLayerDisplay('HexSageCon', 'HexBaseScored', this.viewModel.show_hex_layer.get());
                this.viewModel._toggleLayerDisplay('HexBaseScoredFill', 'HexBaseScoredFill', this.viewModel.show_hex_layer.get());
            });
            if (this.drawToolBar == null) {
                this.esriMap = this.app.site.essentialsMap.getMap();
                this.drawToolBar = new esri.toolbars.Draw(this.esriMap);                
                this.drawToolBar.on("draw-end", (evt) => {
                    let geoType = '';
                    switch (evt.target._geometryType) {
                        case 'rectangle':
                            geoType = 'Rectangle';
                            break;
                        case 'polygon':
                            geoType = 'Polygon';
                            break;
                        case 'freehandpolygon':
                        default:
                            geoType = 'Freehand';
                            break;
                    }
                    this.viewModel.aoiGeometry = evt.geometry;
                    this.geo_filter.type = geoType;
                    this.geo_filter.layer = null;
                    this.uploadGeoFilterLayerName = '';
                    this.drawToolBar.deactivate();
                    this.esriMap.showZoomSlider();
                    this.app.commandRegistry.command("AddTemporaryMarkupGeometry").execute(evt.geometry);
                    this.app.commandRegistry.command("RemoveNotification").execute(this.displayNotification.id);
                    //query to get ids to include in layer def                    
                    let QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
                    let Query = new esri.tasks.Query();
                    Query.geometry = evt.geometry;
                    Query.returnGeometry = false;
                    Query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
                    //Query["returnIdsOnly"] = true;                    
                    QueryTask.executeForIds(Query, (results) => {
                        this.geo_filter.enabled = true;
                        this.geo_filter.ids = results;
                        this.updateQuery();
                        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                        this.zoomToGeoFilter();
                    });
                }
                );
            }

            //subscribe to the UploadDataCompletedEvent in case files get uploaded.
            this.app.eventRegistry.event("UploadDataCompletedEvent").subscribe(this, (uploadInfo) => {
                ////set uploadGeoFilterLayer to upload name and turn off display    
                this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                this.uploadGeoFilterLayerName = uploadInfo.layerDetailsResults.details.layerName;
                this.viewModel._toggleLayerDisplay(this.uploadGeoFilterLayerName, this.uploadGeoFilterLayerName, false);
                this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Updating geographic filter to use uploaded data...', null, null, null, null, true));
                if (uploadInfo.mainResponse.featureCollection.layers.length > 0) {
                    //need to dissolve into one feature geometry                        
                    let uploadFS = new esri.tasks.FeatureSet();
                    uploadInfo.mainResponse.featureCollection.layers[0].featureSet.features.forEach(feature => {
                        var graphic = new esri.Graphic({
                            geometry: feature.geometry,
                            attributes: feature.attributes
                        });
                        uploadFS.features.push(graphic);
                    });
                    let gpInputFS = { 'InputFeatures': uploadFS };
                    let gptask = new esri.tasks.Geoprocessor(this.gpDissolveURL);
                    gptask.submitJob(gpInputFS, (result) => {
                        gptask.getResultData(result.jobId, "dissolved_features", (df) => {
                            this.setUploadGeometry(df.value.features[0].geometry);
                            this.zoomToGeoFilter();
                        }, (err) => {
                            console.log('error getting gp result data', err);
                        })
                    }, (status) => {
                        console.log('status', status);
                    },
                        (error) => {
                            console.log('gp error', error);
                        });
                }
                var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === this.uploadGeoFilterLayerName).length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === this.uploadGeoFilterLayerName)[0] : null;
                let layer = mService.findLayerByName(this.uploadGeoFilterLayerName);
                this.geo_filter.layer = layer;
                window.setTimeout(() => {
                    this.app.commandRegistry.command("RemoveUserAddedLayer").execute(layer);
                    this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");
                }, 50);
            });

            this.viewModel.show_selected_filters.set(false);

            this.app.eventRegistry.event("GraphicDrawCompletedEvent").subscribe(this, (sender) => {
                console.log('graphic drawing event!', sender);
                let lineSymbol = sender.sender.lineSymbol;
                lineSymbol.color.r = 0;
                lineSymbol.color.b = 255;
                lineSymbol.color.g = 255;
                let fillSymbolOutline = sender.sender.fillSymbol.outline;
                fillSymbolOutline.color.r = 0;
                fillSymbolOutline.color.b = 255;
                fillSymbolOutline.color.g = 255;
            });

            window.setTimeout(() => {
                this.showTour(null, null, this);
            }, 50);
        }
    }

    showTour(_evt, _el, context: any, example?: any) {
        if (this.canShowTour || _el) {
            this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
            if (this.hopscotch) {
                // Set the context of the scope for the function callbacks to relate to the right context.  Checks against filterView of viewModel which gets passed on click events.
                var thisScope = example ? context : context.filterView ? this : context;
                // Define the tour!
                let tour_id = example ? example.tour_id : 'default';
                let tour;
                switch (tour_id) {
                    case 'herbicide_vale':
                    case 'herbicide_no_sagebrush':
                    case 'juniper_removal':
                        this.activeTour = example;
                        tour = {
                            id: example.tour_id,
                            steps: [
                                {
                                    title: "EXAMPLE: " + example.label,
                                    content: example.description,
                                    target: '#' + example.tour_id,
                                    yOffset: -20,
                                    placement: "right",
                                    showCTAButton: true,
                                    ctaLabel: "Apply",
                                    onCTA: function(evt) {
                                        thisScope.applyExample(null, null, thisScope.activeTour);
                                    }
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
                                    content: "<p><b>NOTE: SOME LAYERS OUT OF DATE</b></p><p>The Query Data Tool allows you to easily construct a customized, web-based query by filtering values of multiple data layers. The tool queries hexagons (1 square mile in size) across the sagebrush landscape in Oregon (displayed in blue over the map). As filters are applied, hexagons are removed from the selection to identify areas of interest. Click the Next button to continue through this 6-step tutorial.</p>",
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


    setUploadGeometry(geometry) {
        this.viewModel.aoiGeometry = geometry;
        //query to get ids to include in layer def                    
        let QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
        let Query = new esri.tasks.Query();
        Query.geometry = this.viewModel.aoiGeometry;
        Query.returnGeometry = false;
        Query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
        QueryTask.executeForIds(Query, (results) => {
            this.geo_filter.enabled = true;
            this.geo_filter.ids = results;
            this.geo_filter.type = this.uploadGeoFilterLayerName;
            this.updateQuery();
            this.app.commandRegistry.command("RemoveStatus").execute();
            this.viewModel.filter_collection.get().forEach(fc => {
                if (fc.layer === 'Geographic Filter: Vale BLM District') {
                    fc.show.set(true);
                }
            });
        }, (err) => {
            console.log('error', err);
        });
    }

    loadExampleGeo(url: string,geoname:string) {
        this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Updating geographic filter to show ' + geoname + ' ...', null, null, null, null, true));
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            context: this,
            success: function (config) {
                let uploadFS = new esri.tasks.FeatureSet();
                config.forEach(feature => {
                    var graphic = new esri.Graphic({
                        geometry: feature.geometry,
                        attributes: feature.attributes
                    });
                    uploadFS.features.push(graphic);
                });
                let gpInputFS = { 'InputFeatures': uploadFS };
                let gptask = new esri.tasks.Geoprocessor(this.gpDissolveURL);
                gptask.submitJob(gpInputFS, (result) => {
                    gptask.getResultData(result.jobId, "dissolved_features", (df) => {
                        this.uploadGeoFilterLayerName = 'Vale BLM District';
                        this.setUploadGeometry(df.value.features[0].geometry);
                        this.zoomToGeoFilter();
                        this.toggleTabFilters(null, null, null, null, 'Data');
                    }, (err) => {
                        console.log('error getting gp result data', err);
                    })
                }, (status) => {
                    console.log('status', status);
                },
                    (error) => {
                        console.log('gp error', error);
                    });
            },
            error: function (err) {
                console.log('fail', err);
            }
        });
    }

    setDefaultFilters(reset?) {
        var thisScope = this;
        // create jq ui options
        thisScope.viewModel.dashboard_meta.getItems().forEach((folder) => {
            folder.layers.getItems().forEach((layer) => {
                layer.layerDataValues.getItems().forEach((dv) => {
                    switch (dv.uiType) {
                        case "RangeSlider":
                        case "rangeslider":
                        case "Slider":
                            var categories = dv.fields[0].values ? dv.fields[0].values : [];
                            let min = dv.min
                                ? parseFloat(dv.min)
                                : 0;
                            let max = dv.max ?
                                parseFloat(dv.max)
                                : 100;
                            let minVal = reset
                                ? min
                                : dv.optionValue.get()
                                    ? dv.optionValue.get()[0]
                                        ? dv.optionValue.get()[0]
                                        : dv.optionValue.get().min
                                    : min;
                            minVal = minVal !== undefined ? minVal : min;
                            let maxVal = reset ? max
                                : dv.optionValue.get()
                                    ? dv.optionValue.get()[1]
                                        ? dv.optionValue.get()[1]
                                        : dv.optionValue.get().max
                                    : max;
                            maxVal = maxVal !== undefined ? maxVal : min;
                            let increment = dv.increment ? parseFloat(dv.increment) : 1;

                            $("#" + dv.optionValID).html(
                                categories.length > 1
                                    ? (categories[0].label + ' - ' + categories[max].label)
                                    : dv.uiType === 'rangeslider' ?
                                        minVal.toString() + " - " + maxVal.toString()
                                        : maxVal.toString());
                            ///////////////////////////////////////
                            // RangeSlider Plugin Alternate option with bubble handles
                            //////////////////////////////////////
                            //implement then destroy in order to recreate for updating.
                            //try {        
                            //    if (thisScope.hasLoaded) {
                            //        $("#" + dv.optionID).rangeSlider('destroy');
                            //    }
                            //} catch (ex) {}
                                                  
                            //$("#" + dv.optionID).rangeSlider({
                            //    symmetricPositionning: true,
                            //    bounds: {
                            //        min: min,
                            //        max: max
                            //    },
                            //    step: increment,
                            //    defaultValues: {
                            //        min: minVal,
                            //        max: maxVal
                            //    },
                            //    formatter: function (val) {
                            //        if (categories.length > 1) {
                            //            return categories[parseInt(val)]['label'];
                            //        }
                            //        else {
                            //            return val.toString().indexOf('.') !== -1 ? (Math.round(0.04 * 100) / 100) : val;
                            //        }
                            //    }
                            //});
                            //$("#" + dv.optionID).bind("valuesChanged", function (event, data) {
                            //    var updateObj = {
                            //        id: event.target
                            //            ? event.target['id']
                            //            : event.srcElement.id !== ""
                            //                ? event.srcElement.id
                            //                : event.srcElement.parentNode["id"],
                            //        values: data.values ? data.values : data.value
                            //    };
                            //    thisScope.updateQuery(updateObj);
                            //});
                            //$("#" + dv.optionID).rangeSlider("resize");
                            ////////////////////////////////////////////////
                            // Traditional JQuery Rangeslider
                            ////////////////////////////////////////////////
                            $("#" + dv.optionID).slider({
                                range: dv.uiType === 'rangeslider',
                                step: increment,
                                min: min,
                                max: max,
                                value: dv.uiType === 'slider' ? maxVal : null,
                                values: dv.uiType === 'rangeslider' ? [minVal ? minVal : min, maxVal ? maxVal : max] : null,
                                slide: function (_event, ui) {
                                    //if ((ui.values[0] + .005) >= ui.values[1]) {
                                    //    return false;
                                    //}
                                    if (ui.values[0] == ui.values[1]) {
                                        $(this).addClass('touch');
                                    } else {
                                        $(this).removeClass('touch');
                                    }
                                    $("#" + this.id + "Val").html(
                                        categories.length > 1
                                            ? (categories[ui.values[0]].label + ' - ' + categories[ui.values[1]].label)
                                            : ui.values
                                                ? ui.values[0] + (dv.uiType === 'rangeslider' ? " - " + ui.values[1] : '')
                                                : ui.value.toString()
                                    );
                                },
                                stop: function (event, ui) {
                                    console.log('now run something', event);
                                    let updateObj = {
                                        id: event.target
                                            ? event.target['id']
                                            : event.srcElement.id !== ""
                                                ? event.srcElement.id
                                                : event.srcElement.parentNode["id"],
                                        values: ui.values ? ui.values : ui.value
                                    };
                                    thisScope.updateQuery(updateObj);
                                }
                            });
                            if (reset) {
                                dv.optionValue.set(null);
                            }
                            break;
                        case "checkbox":
                            if (reset) {
                                dv.optionValue.set(dv.default ? dv.default !== 'unchecked' : true);
                            }
                            break;
                        default:
                            break;
                    }
                });
            })
        });

        if (reset) {
            //reset layerDef for layer
            this.setLayerDef("1=1");
        }
        thisScope.hasLoaded = true;
    }

    onGetInfo(_event, _element, context) {
        let layerInfo = {
            layer: context.layerName,
            desc: context.layerDesc,
            layerLinks: context.layerLinks
        };
        this.viewModel.get_info_layer.set([layerInfo]);
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnFilterInfoView");
    }

    onFolderClick(_event, _element, context) {
        context.visible.set(!context.visible.get());
    }

    onUIChangeEvtHandler(_event, _element, context) {
        var thisScope = this;
        if (context.uiType === 'RadioButton') {
            //need to turn off previous value if any since the value binding doesn't seem to work with radio button groups.
            this.viewModel.dashboard_meta.getItems().forEach(folder => {
                folder.layers.getItems().forEach(layer => {
                    if (layer.layerName === context.optionLayer) {
                        layer.layerDataValues.getItems().forEach(dv => {
                            if (dv.optionID !== context.optionID) {
                                dv.optionValue.set(null);
                            }
                        });
                    }
                });
            });
        }
        window.setTimeout(function () {
            thisScope.updateQuery();
        }, 50);

    }

    applyExample(_evt, _elem, cntx) {
        this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Applying example query: ' + cntx.label, null, null, null, null, true));
        this.toggleTabFilters(null, null, null, 'Data');
        try {
            this.resetFilters();
        } catch (ex) {}        
        
        let thisScope = this;
        window.setTimeout(() => {
            thisScope.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                folder.layers.getItems().forEach(function (layer) {
                    layer.layerDataValues.getItems().forEach(function (dv) {
                        //search for id
                        cntx.filters.forEach(function (f) {
                            if (f.filter_id === dv.optionID) {
                                dv.optionValue.set(f.ui_type === 'checkbox' ? f.value : [f.min, f.max]);
                            }
                        });
                    });
                });
            });
            thisScope.setDefaultFilters();
            if (cntx.geo_filter) {
                thisScope.loadExampleGeo(cntx.geo_filter.geojson_url, cntx.geo_filter.geo_name);
            }
            else {
                thisScope.updateQuery();
            }
            thisScope.app.commandRegistry.command("RemoveStatus").execute();
        }, 100);
    }

    runExampleTour(_evt, _elem, cntx) {
        this.showTour(null, _elem, this, cntx);
    }

    toggleFilters() {
        this.viewModel.show_filter_summary.set(!this.viewModel.show_filter_summary.get());
        this.viewModel.show_filter_class.set(!this.viewModel.show_filter_summary.get() ? 'show-filters' : 'hide-filters');
        this.viewModel._resizeFilterList();
    }

    toggleExampleFilters() {
        this.viewModel.show_example_filters.set(!this.viewModel.show_example_filters.get());
        this.viewModel.show_example_filter_class.set(!this.viewModel.show_example_filters.get() ? 'show-filters' : 'hide-filters');
        this.viewModel._resizeFilterList();
    }

    toggleFilter(_evt, _elem, cntx) {
        if (cntx.type === 'geographic') {
            this.geo_filter.enabled = !this.geo_filter.enabled; //cntx.enabled.get();
        } else {
            this.viewModel.dashboard_meta.getItems().forEach(folder => {
                folder.layers.getItems().forEach(layer => {
                    if (layer.layerName === cntx.layer) {
                        layer.enabled.set(!layer.enabled.get());
                        layer.needsUpdate = true;
                    };
                });
            });
        }
        this.updateQuery();
    }

    toggleTabFilters(_a, _b, _c, activeTab?: string) {
        let showData = activeTab
            ? activeTab === 'Data'
            : !this.viewModel.show_data_filter.get();
        let showGeo = activeTab ? activeTab === 'Geo' :
            !this.viewModel.show_geo_filter.get();
        this.viewModel.show_data_filter.set(showData);
        this.viewModel.show_data_filter_class.set(!showData ? 'tab-header show-filters' : 'tab-header hide-filters');
        this.viewModel.show_geo_filter.set(showGeo);
        this.viewModel.show_geo_filter_class.set(!showGeo ? 'tab-header show-filters' : 'tab-header hide-filters');
        this.viewModel._resizeFilterList();
    }

    resetFilters() {
        this.app.commandRegistry.command("ClearMarkupQuiet").execute();
        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
        this.geo_filter.enabled = false;
        this.geo_filter.ids = [];
        this.viewModel.aoiGeometry = null;
        this.viewModel.geo_history_filter_collection.refresh();
        this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 0);
        this.setDefaultFilters(true);
        this.updateQuery();
    }

    drawAOIFilter(_evt, elem, _cntx) {
        let drawType = elem.className.toUpperCase();
        let displayImageProps: ImageProperties = { altText: "", uri: "" };
        let closeBtn: NotificationActionButton = { text: 'Close' }
        this.displayNotification = { id: elem.className, text: '', iconProperties: displayImageProps, closeButton: closeBtn };
        switch (elem.className) {
            case "rectangle":
                displayImageProps.altText = "Click and drag to draw a rectangle on the map."
                displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-rectangle-24.png";
                this.displayNotification.text = "Click and drag to draw a rectangle on the map."
                this.displayNotification.iconProperties = displayImageProps;
                break;
            case "freehand_polygon":
                displayImageProps.altText = "Draw a custom shape on the map."
                displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png";
                this.displayNotification.text = "Draw a custom shape on the map."
                this.displayNotification.iconProperties = displayImageProps;
                break;
            case "polygon":
                displayImageProps.altText = "Click or tap locations to define a polygon. Double-click/tap to finish."
                displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-polygon-24.png";
                this.displayNotification.text = "Click or tap locations to define a polygon. Double-click/tap to finish."
                this.displayNotification.iconProperties = displayImageProps;
                break;
        }
        this.app.commandRegistry.command("DisplayNotification").execute(this.displayNotification);
        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
        this.drawToolBar.activate(esri.toolbars.Draw[drawType]);
        this.esriMap.hideZoomSlider();
    }

    uploadAOIFilter(_evt, _elem, _cntx) {
        this.app.commandRegistry.command("UploadData").execute();
    }

    removeFilter(_event, _element, context) {
        if (context.type === 'geographic') {
            this.geo_filter.enabled = false;
            this.geo_filter.ids = [];
            this.viewModel.aoiGeometry = null;
            this.viewModel.geo_history_filter_collection.refresh();
            this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 0);
        }
        //update data model to remove the filter for layer
        this.viewModel.dashboard_meta.getItems().forEach(folder => {
            folder.layers.getItems().forEach(layer => {
                if (layer.layerName === context.layer) {
                    layer.enabled.set(true);
                    layer.layerDataValues.getItems().forEach(dv => {
                        dv.optionValue.set(['checkbox', 'radiobutton'].indexOf(dv.uiType) !== -1 ? true : null);
                    });
                };
            });
        });
        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
        this.updateQuery();
        this.setDefaultFilters();
    }

    collapseFolders() {
        this.viewModel.dashboard_meta.getItems().forEach(folder => folder.visible.set(false));
    }

    expandFolders() {
        this.viewModel.dashboard_meta.getItems().forEach(folder => folder.visible.set(true));
    }

    clearSearch(_evt, _el, _cnxt) {
        this.viewModel.filterText.set("");
    }

    setSearch(_evt, _el, cnxt) {
        this.toggleTabFilters(null, null, null, 'Data');
        this.viewModel.filterText.set(cnxt.layer);
    }

    zoomToGeoFilter() {
        this.toggleTabFilters(null, null, null, 'Geo');
        this.app.commandRegistry.command("ZoomToExtent").execute(this.viewModel.aoiGeometry.getExtent().expand(2));
    }

    //++++++++++++++++++++++++
    // Geo Filter History Functions
    //++++++++++++++++++++++++
    viewGeoHistoryArea(_evt, _el, cntx) {
        cntx.historyShow.set(!cntx.historyShow.get());
        this.updateHistoryMarkup();
        return true;
    }

    updateHistoryMarkup() {
        this.app.commandRegistry.command("ClearMarkupQuiet").execute();
        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
        this.viewModel.geo_filter_collection.getItems().forEach(gfc => {
            if (gfc.historyShow.get()) {
                this.app.commandRegistry.command("AddMarkup").execute(gfc.geometry);
            }
        });
    }

    removeGeoHistoryArea(_evt, _el, cntx) {
        let idxToRemove = 0;
        this.viewModel.geo_filter_collection.getItems().forEach((gfc, idx) => {
            if (gfc.geometry === cntx.geometry) {
                idxToRemove = idx;
            }
        });
        this.viewModel.geo_filter_collection.removeAt(idxToRemove);
        let has_active_geo_filter = this.viewModel.filter_collection.get().filter(f => f.type === 'geographic').length > 0;
        this.viewModel.show_recent_geo_filters.set((this.viewModel.geo_filter_collection.getLength() > 1 && has_active_geo_filter) || (!has_active_geo_filter && this.viewModel.geo_filter_collection.getLength() > 0));
        //if upload layer remove service from layer list
        //if (cntx.mapLayer) {
        //    this.app.commandRegistry.command("RemoveUserAddedLayer").execute(cntx.mapLayer);
        //}        
        this.updateHistoryMarkup();
        var thisScope = this;
        //window.setTimeout(() => {
        //    thisScope.app.commandRegistry.command("SetCurrentTab").execute("Sage-Grouse Conservation Planning");
        //}, 1500);


    }

    useGeoHistoryArea(_evt, _el, cntx) {
        //turn off all other display and set active geo filter to selected geo
        this.app.commandRegistry.command("ClearMarkupQuiet").execute();
        this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
        this.viewModel.aoiGeometry = cntx.geometry;
        this.viewModel.geo_filter_collection.getItems().forEach(gfc => {
            gfc.historyShow.set(false);
        });
        this.viewModel.geo_history_filter_collection.refresh();
        this.uploadGeoFilterLayerName = cntx.mapLayer ? cntx.type : '';
        this.geo_filter.enabled = true;
        this.geo_filter.ids = cntx.ids;
        this.geo_filter.type = cntx.geoType;
        this.updateQuery();
        this.zoomToGeoFilter();
        return true;
    }

    //++++++++++++++++++++++++
    // END Geo Filter History Functions
    //++++++++++++++++++++++++

    downloadHexFilterAreas() {
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnDownloadView");
    };

    getReport() {
        console.log('get report');
        //var workflowUrl = "https://lib-gis1.library.oregonstate.edu/arcgis/home/item.html?id=24c76ba4aab347a0be0b5db5a878c636"; 
        this.toggleTabFilters(null, null, null, 'Data');
        this.viewModel.show_selected_filters.set(true);
        let thisScope = this;
        let clone = document.getElementById("scroll-filter-body").cloneNode(true);
        $("body").append(clone);
        $(clone).css("width", "720px");
        $(clone).find('.slider').css("width", "305px");
        $('.get-info-btn-wrapper').css("display", "none");
        html2canvas(clone, {
            onrendered: function (canvas) {
                var base64FilterImg = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
                let filters = { "filters": [] };
                thisScope.viewModel.filter_collection.get().forEach(fc => {
                    if (fc.type !== 'geographic') {
                        filters.filters.push(
                            { "filterDef": fc.filterDef, "layer": fc.layer, "desc": fc.desc }
                        );
                    }
                });

                let workflowArgs: any = {};
                workflowArgs.workflowId = "cons_pln_generate_report";
                workflowArgs.filterCollection = JSON.stringify(filters);
                workflowArgs.layerDef = thisScope.viewModel.active_layer_def;
                workflowArgs.filterImg = base64FilterImg;
                workflowArgs.aoiGeometry = thisScope.viewModel.aoiGeometry
                    ? thisScope.viewModel.aoiGeometry
                    : JSON.parse("{\"rings\":[[[-13561079.235725246,5696991.214135939],[-12959366.9490645,5696991.214135939],[-12959366.9490645,5134414.685957194],[-13561079.235725246,5134414.685957194],[-13561079.235725246,5696991.214135939]]],\"spatialReference\":{\"wkid\":102100}}");
                workflowArgs.hexCount = thisScope.viewModel.hexCount.get();
                thisScope.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                thisScope.viewModel.show_selected_filters.set(false);
                $(clone).remove();
            }
        });
    }

    createGeoFilterObj() {
        let idNum = (this.viewModel.geo_filter_collection.getLength() + 1).toString();
        let filterObj = {
            layer: "Geographic Filter: " + this.geo_filter.type,
            geoType: this.geo_filter.type,
            enabled: new Observable<Boolean>(this.geo_filter.enabled),
            ids: this.geo_filter.ids,
            geometry: this.viewModel.aoiGeometry,
            show: new Observable<Boolean>(false),
            mapLayer: this.geo_filter.layer,
            filterDef: '',
            type: 'geographic',
            showID: 'show' + idNum,
            historyShow: new Observable<Boolean>(false)
        };
        if (this.viewModel.geo_filter_collection.getLength() > 0) {
            let alreadyInList = false;
            this.viewModel.geo_filter_collection.getItems().forEach(gfc => {
                alreadyInList = gfc.geometry === filterObj.geometry ? true : alreadyInList;
            })
            if (!alreadyInList) {
                this.viewModel.geo_filter_collection.addItem(filterObj);
            }
        } else {
            this.viewModel.geo_filter_collection.addItem(filterObj);
        }
        this.viewModel.geo_history_filter_collection.refresh();
        this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 1)
        filterObj.show.bind(this, (showVal) => {
            if (showVal) {
                this.app.commandRegistry.command("AddTemporaryMarkupGeometry").execute(this.viewModel.aoiGeometry);
            } else {
                this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            }
        });
        return filterObj;
    }

    updateQuery(updateObj?) {
        //iterate through query options and create query obj
        var query_obj = [{}];
        this.viewModel.dashboard_meta.getItems().forEach(folder => {
            folder.layers.getItems().forEach(layer => {
                var qo = {
                    layer: layer.layerName,
                    enabled: layer.enabled.get(),
                    desc: layer.layerDesc,
                    filters: []
                };
                layer.layerDataValues.getItems().forEach(dv => {
                    if (updateObj) {
                        if (updateObj.id === dv.optionID) {
                            dv.optionValue.set(updateObj.values);
                        }
                    } 
                    let filter = {
                        label: dv.label,
                        fields: dv.fields,
                        uiType: dv.uiType,
                        value: dv.optionValue.get(),
                        min: dv.min,
                        max: dv.max,
                        comparator: dv.comparator
                        //categories: dv.categories
                    }
                    qo.filters.push(filter);
                });
                query_obj.push(qo);
            })
        });
        query_obj = query_obj.filter(qo => qo['filters'] ? qo['filters'].filter((f: { value: boolean; }) => f.value !== null && f.value !== false).length > 0 : false);
        //setup query string for layer definition
        //iterate through query_objs that have optionValues set
        var layerDef = '';
        var filterCollection = [];
        //add geo filter if present
        if (this.geo_filter.ids.length > 0) {
            let filterObj = this.createGeoFilterObj();
            filterCollection.push(filterObj);
        }
        query_obj.forEach((qo, _idx) => {
            if (qo['filters']) {
                let filter = {
                    layer: qo['layer'],
                    enabled: new Observable<Boolean>(qo['enabled']),
                    filterDef: '',
                    desc: qo["desc"],
                    type: 'attribute',
                    comparator: qo['comparator']
                };
                let filterDef = '';
                let filterDefSimple = ''; //for filter summary display more readable
                let filterVals = qo['filters'].filter(f => f.value ? true : false);
                let showFilter = filterVals.length !== qo['filters'].length || filterVals.length === 0;
                let filterUIs = qo['filters'].map(f => f.uiType);
                if (showFilter || filterUIs.indexOf('checkbox') === -1) {
                    //if (qo['enabled']) {
                    layerDef += qo['enabled']
                        ? layerDef !== ''
                            ? ' AND ('
                            : '('
                        : '';
                    //let comparator = (filterVals
                    //    .map(fv => fv.fields
                    //        .map(f => f.field))
                    //    .filter((value, index, self) => { return self.indexOf(value) === index; })
                    //    .length > 1) ? ' OR ' : ' AND ';
                    var divideBy = 1;
                    let comparator = ' OR ';
                    filterVals.forEach((filter, fidx) => {
                        if (filter.value) {
                            filterDef += fidx > 0 ? comparator : '';
                            filterDefSimple += fidx > 0 ? comparator : '';
                            switch (filter.uiType) {
                                case 'checkbox':
                                case 'radiobutton':
                                    //for each fieldinfo for each values
                                    //get field type
                                    let query = '';
                                    let simpleQuery = '';
                                    let fieldComparator = filter.comparator ? (' ' + filter.comparator + ' ') : ' OR ';
                                    let isMultiField = false;
                                    filter.fields.forEach((fi, idx) => {
                                        if (idx > 0) {
                                            query += fieldComparator;
                                            isMultiField = true;
                                            //simpleQuery += fieldComparator;
                                        }
                                        let field = fi.field;
                                        //get range or fixed
                                        fi.values.forEach(v => {
                                            let isNumeric = $.isNumeric(v.value);
                                            let comparator = !isNumeric ? " like '" : v.type === 'min' ? ' > ' : v.type === 'max' ? ' < ' : '=';
                                            query += field + comparator + v.value + (!isNumeric ? "'" : "");
                                            simpleQuery += !isMultiField ? (' ' + filter.label) : '';
                                        });
                                    });
                                    if (qo['enabled']) { // filter can be disabled in the filter summary view
                                        filterDef += query;
                                    }
                                    filterDefSimple += simpleQuery;
                                    break;
                                case 'rangeslider':
                                    let hasCategories = qo['filters'][0].fields[0].values ? qo['filters'][0].fields[0].values.length > 0 : false;
                                    let minVal = qo['filters'][0]['value'][0]
                                        ? qo['filters'][0]['value'][0]
                                        : qo['filters'][0]['value']['min'] !== undefined
                                            ? qo['filters'][0]['value']['min']
                                            : qo['filters'][0]['min'];
                                    let maxVal = qo['filters'][0]['value'][1]
                                        ? qo['filters'][0]['value'][1] 
                                        : qo['filters'][0]['value']['max'] !== undefined
                                            ? qo['filters'][0]['value']['max']
                                            : qo['filters'][0]['max'];
                                    //showFilter = !(minVal.toString() === qo['filters'][0]['min'].toString() && maxVal.toString() === qo['filters'][0]['max'].toString());
                                    showFilter = (minVal.toString() !== qo['filters'][0]['min'].toString() || maxVal.toString() !== qo['filters'][0]['max'].toString());
                                    if (showFilter) {
                                        if (hasCategories) {
                                            let selectedCategories = qo['filters'][0].fields[0].values.slice(minVal, maxVal + 1)
                                            filterDefSimple += '( ';
                                            selectedCategories.forEach((sc, idx) => {
                                                let cat = sc['label'];
                                                let catVal = sc['value'];
                                                let hasCatRangeVals = sc['min'] || sc['max'];
                                                //get first and last if has category range
                                                if (hasCatRangeVals && qo['enabled']) {
                                                    filterDef += idx === 0
                                                        ? filter.fields[0].field + ' >= ' + sc['min'] + (selectedCategories.length === 1
                                                            ? ' AND ' + filter.fields[0].field + ' <= ' + sc['max']
                                                            : '')
                                                        : idx === selectedCategories.length - 1
                                                            ? ' AND ' + filter.fields[0].field + ' <= ' + sc['max']
                                                            : '';
                                                    //filterDef += filter.fields[0].field + ' >= ' + sc['min'] + ' AND ' + filter.fields[0].field + ' <= ' + sc['max'];
                                                }
                                                if (qo['enabled']) {
                                                    if (!hasCatRangeVals) {
                                                        if ($.isNumeric(catVal)) {
                                                            filterDef += filter.fields[0].field + " = " + catVal + (idx !== selectedCategories.length - 1 ? ' OR ' : '');
                                                        } else {
                                                            filterDef += filter.fields[0].field + " like '" + catVal + "'" + (idx !== selectedCategories.length - 1 ? ' OR ' : '');
                                                        }
                                                    }
                                                }
                                                filterDefSimple += sc['label'] + (idx !== selectedCategories.length - 1 ? ', ' : '');
                                            });
                                            filterDefSimple += ')';
                                        } else {
                                            filterDefSimple += '( >=' + minVal + ' AND <=' + maxVal + ' )';
                                            if (qo['enabled']) {
                                                filterDef = filter.fields[0].field + '>='
                                                    + (hasCategories
                                                        ? minVal
                                                        : (minVal / divideBy))
                                                    + ' AND '
                                                    + filter.fields[0].field + '<='
                                                    + (hasCategories ? maxVal : (maxVal / divideBy));
                                            }
                                        }
                                    }
                                    break;
                                case 'slider':
                                    filterDefSimple += '( >=' + qo['filters'][0]['value'] + ' )';
                                    if (qo['enabled']) {
                                        filterDef += qo['field'] + '>=' + (qo['filters'][0]['value'] / divideBy);
                                    }
                                    showFilter = qo['filters'][0]['value'].toString() !== qo['max'];
                                    break;
                                default:
                                    break;
                            };
                        }
                    });

                    filter.filterDef = filterDefSimple;
                    //check for spatial filter                
                    layerDef += qo['enabled'] ? filterDef + ')' : '';
                }
                if (showFilter) {
                    filterCollection.push(filter);
                } else {
                    this.viewModel.dashboard_meta.getItems().forEach(folder => {
                        folder.layers.getItems().forEach(layer => {
                            if (layer.layerName === qo['layer']) {
                                layer.enabled.set(true);
                            }
                        });
                    });
                }
            }
        })
        this.viewModel.filter_collection.set(filterCollection);
        this.viewModel.has_filters.set(filterCollection.length > 0);
        if (this.geo_filter.enabled) {
            layerDef += (filterCollection.filter(f => f.enabled.get()).length > 1 ? ' AND ' : '') + 'OBJECTID in (' + this.geo_filter.ids.toString() + ')';
        }
        layerDef = layerDef === '()'
            ? '1=1'
            : layerDef.replace(' AND ()', '').replace('() AND ', '');
        layerDef = filterCollection.length > 0 ? layerDef : '1=1';
        this.setLayerDef(layerDef);
    }

    getHexCount(layerDef) {
        let QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
        let Query = new esri.tasks.Query();
        Query.returnGeometry = false;
        Query.where = layerDef;
        QueryTask.executeForCount(Query, (results) => {
            this.viewModel.hexCount.set(results);
        });
    }

    setLayerDef(layerDef) {
        this.viewModel.active_layer_def = layerDef;
        //set filter for both fill and border layers
        //Border
        
        var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon').length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon')[0] : null;
        let layer = mService.findLayerByName('HexBaseScored');
        this.hex_layer_url = !this.hex_layer_url ? layer.getLayerUrl() : this.hex_layer_url;
        let layerDefintion = [];
        layerDefintion[0] = layerDef;
        mService.serviceLayer["setVisibleLayers"]([layer.id]);
        mService.serviceLayer["setLayerDefinitions"](layerDefintion, false);
        mService.refresh();
        this.viewModel._resizeFilterList();
        this.getHexCount(layerDef);
        window.setTimeout(() => {
            mService.refresh();
        }, 1000);
    }
}
