/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/jqueryui.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { ImageProperties } from "geocortex/infrastructure/commandArgs/ImageProperties";
import { DisplayNotificationArgs,NotificationActionButton } from "geocortex/infrastructure/commandArgs/DisplayNotificationArgs";
import { contains } from "geocortex/framework/utils/ArrayUtils";
import { Observable } from "geocortex/framework/observables";
import { AddStatusArgs } from "geocortex/infrastructure/commandArgs/AddStatusArgs";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { ExportGraphicsLayerArgs } from "geocortex/infrastructure/commandArgs/ExportGraphicsLayerArgs";
import { request } from "geocortex/geocortex";
import { parseNumber } from "geocortex/infrastructure/FormatUtils";

declare var $: any;

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

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.geo_filter = {
            enabled: false,
            ids: [],
            type: '',
            layer: null
        }        
    }



    showTour(_evt, _el, context: any) {
        if (this.canShowTour || _el) {
            this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
            if (this.hopscotch) {
                // Set the context of the scope for the function callbacks to relate to the right context.  Checks against filterView of viewModel which gets passed on click events.
                var thisScope = context.filterView ? this : context;
                var demoFilterID = "#12SageGrouseProbabilityofWinterHabitatUseNonhabitat";
                // Define the tour!
                var tour = {
                    id: "cons-pln-tour",
                    steps: [
                        {
                            title: "Tour the customized query features",
                            content: "This tool allows you to identify priority areas based on a customized, user-defined query or filtering of data layers. The tool queries hexagons (1 square mile in size) across the sagebrush habitat in Oregon (displayed in blue over the map). As filters are applied, hexagons are removed from the selection to identify areas of interest. Click the Next button to continue through the tour.",
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
                            title: "Show hexagon selection",
                            content: "Use the Show Hexagons check box at the top of the screen to show (check) or hide (uncheck) the blue hexagon layer. By unchecking the box, the user can view data layers underneath. You can view or change data layers being displayed while using the query tool through the red I want to.. button in the map or by selecting the layers tab in the lower left corner of the screen (after unchecking the Show Hexagons box).",
                            target: "#toggle-hex-layer",
                            placement: "right",
                            yOffset: -20,
                            //showCTAButton: true,
                            //ctaLabel: "Show me",
                            //onCTA: () => {
                            //    thisScope.toggleTabFilters();
                            //}
                        },
                        {
                            title: "Show your current query selection",
                            content: "As layers are filtered, the Active Filters section will show which layers are selected and what criteria are defined in the selection. To remove a filter, click the x button to the right of the filter name. Once a selection has been made, you will see the option to generate a report, download data, and clear all filters.",
                            target: "#filter-summary",
                            placement: "right",
                            yOffset: -20,
                            //onShow: () => {
                            //    thisScope.toggleTabFilters(null, null, thisScope, 'Data');
                            //},
                            //showCTAButton: true,
                            //ctaLabel: "Show me",
                            //onCTA: () => {
                            //    thisScope.viewModel.filterText.set('wi');
                            //}
                        },
                        {
                            title: "Query by data layers or geographic area",
                            content: "Choose the Data filters section (left) or Geographic filter section (right). Data filters change query criteria through check boxes or slider bars. Geographic filters limit the area of your selection by drawing an area of interest or uploading a shapefile delineating an area. Both data filters and geographic filters can be applied in the same session.",
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
                            content: "Change the filter settings by selecting or deselecting check boxes, or modifying the range sliders by clicking on the black bar. For more information about the data layers available for filtering, click the (i) icon to the right of the layer name.",
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
                        thisScope.resetFilters();
                        thisScope.clearSearch();
                    },
                    onClose: () => {
                        thisScope.resetFilters();
                        thisScope.clearSearch();
                    }
                };

                // Start the tour!
                this.hopscotch.startTour(tour);
            }
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
            this.setDefaultFilters(true);  
            this.viewModel.show_hex_layer.bind(this, () => {                
                this.viewModel._toggleLayerDisplay('HexSageCon','HEX_SageCon',this.viewModel.show_hex_layer.get());
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

            window.setTimeout(() => {
                this.showTour(null,null,this);
            }, 50);
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
        }, (err) => {
            console.log('error', err);
        });
    }

    setDefaultFilters(reset?) {
        var thisScope = this;
        // create jq ui options
        thisScope.viewModel.dashboard_meta.getItems().forEach((folder) => {
            folder.layers.getItems().forEach((layer) => {
                switch (layer.UITYPE) {
                    case "RangeSlider":
                    case "Slider":
                        var categories = layer.DATAVALUES.getAt(0).categories;
                        let min = layer.MIN
                            ? parseFloat(layer.MIN)
                            : 0;
                        let max = categories.length > 1
                            ? categories.length - 1
                            : layer.MAX
                                ? parseFloat(layer.MAX)
                                : 100;                            
                        let minVal = reset
                            ? min
                            : layer.DATAVALUES.getAt(0).optionValue.get()
                                ? layer.UITYPE === "Slider"
                                    ? layer.DATAVALUES.getAt(0).optionValue.get()
                                    : layer.DATAVALUES.getAt(0).optionValue.get()[0]
                                : min;
                        let maxVal = reset ? max
                            : layer.DATAVALUES.getAt(0).optionValue.get()
                                ? layer.UITYPE === "Slider"
                                    ? layer.DATAVALUES.getAt(0).optionValue.get()
                                    : layer.DATAVALUES.getAt(0).optionValue.get()[1]
                                : max;
                        let increment = layer.INCREMENT ? parseFloat(layer.INCREMENT) : 1;

                        layer.DATAVALUES.getItems().forEach(function (dv) {
                            $("#" + dv.optionValID).html(
                                categories.length > 1
                                    ? (categories[0].category + ' - ' + categories[max].category) :
                                    layer['UITYPE'] === 'RangeSlider' ?
                                        minVal.toString() + " - " + maxVal.toString()
                                        : maxVal.toString());
                             ///////////////////////////////////////
                                // RangeSlider Plugin Alternate option with bubble handles
                                //////////////////////////////////////
                                //$("#" + dv.optionID).rangeSlider({
                                //    symmetricPositionning: true,
                                //    bounds: {
                                //        min: min_1,
                                //        max: max_1
                                //    },
                                //    step: increment_1,
                                //    defaultValues: {
                                //        min: min_1,
                                //        max: max_1
                                //    },
                                //    formatter: function (val) {
                                //        if (categories.length > 1) {
                                //            return categories[parseInt(val)]['category'];
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
                            $("#" + dv.optionID).slider({
                                range: layer['UITYPE'] === 'RangeSlider',
                                step: increment,
                                min: min,
                                max: max,
                                value: layer['UITYPE'] === 'Slider' ? maxVal : null,
                                values: layer['UITYPE'] === 'RangeSlider' ? [minVal, maxVal] : null,
                                slide: function (_event, ui) {
                                    if ((ui.values[0] + .005) >= ui.values[1]) {
                                        return false;
                                    }
                                    $("#" + this.id + "Val").html(
                                        categories.length > 1
                                            ? (categories[ui.values[0]].category + ' - ' + categories[ui.values[1]].category)
                                            : ui.values
                                                ? ui.values[0] + (layer['UITYPE'] === 'RangeSlider' ? " - " + ui.values[1] : '')
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
                        });
                        break;
                    case "Checkbox":
                        if (reset) {
                            layer.DATAVALUES.getItems().forEach(dv => {
                                dv.optionValue.set(true);
                            });
                        }
                        break;
                    default:
                        break;
                }
            })
        });

        if (reset) {
            //reset layerDef for layer
            this.setLayerDef("1=1");
        }
    }

    onGetInfo(_event, _element, context) {
        let layerInfo = {
            layer: context.DATALAYER,
            desc: context.DESC
        };
        this.viewModel.get_info_layer.set([layerInfo]);
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnFilterInfoView");
    }

    onFolderClick(_event, _element, context) {
        context.visible.set(!context.visible.get());
    }

    onUIChangeEvtHandler(_event, _element, context) {
        var thisScope = this;
        if (context.optionUI === 'RadioButton') {
            //need to turn off previous value if any since the value binding doesn't seem to work with radio button groups.
            this.viewModel.dashboard_meta.getItems().forEach(folder => {
                folder.layers.getItems().forEach(layer => {
                    if (layer.DATALAYER === context.optionLayer) {
                        layer.DATAVALUES.getItems().forEach(dv => {
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

    toggleFilters() {        
        this.viewModel.show_filter_summary.set(!this.viewModel.show_filter_summary.get());
        this.viewModel.show_filter_class.set(!this.viewModel.show_filter_summary.get() ? 'show-filters' : 'hide-filters');
        this.viewModel._resizeFilterList();
    }
    toggleFilter(_evt, _elem, cntx) {       
        if (cntx.type === 'geographic') {
            this.geo_filter.enabled = !this.geo_filter.enabled; //cntx.enabled.get();
        } else {
            this.viewModel.dashboard_meta.getItems().forEach(folder => {
                folder.layers.getItems().forEach(layer => {
                    if (layer.DATALAYER === cntx.layer) {
                        layer.enabled.set(!layer.enabled.get());
                    };
                });
            });
        }  
        this.updateQuery();
    }

    toggleTabFilters(_a,_b,_c, activeTab?: string) {        
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
        this.geo_filter.enabled = false;
        this.geo_filter.ids = [];
        this.setDefaultFilters(true);
        this.updateQuery();
    }

    drawAOIFilter(_evt, elem, _cntx) {       
        let drawType = elem.className.toUpperCase();       
        let displayImageProps: ImageProperties = { altText: "", uri: "" };
        let closeBtn: NotificationActionButton = { text:'Close' }
        this.displayNotification = { id: elem.className, text: '', iconProperties: displayImageProps, closeButton: closeBtn};
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
                if (layer.DATALAYER === context.layer) {
                    layer.enabled.set(true);
                    layer.DATAVALUES.getItems().forEach(dv => {
                        dv.optionValue.set(['Checkbox','RadioButton'].indexOf(layer.UITYPE) !== -1 ? true : null);
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
        this.toggleTabFilters(null,null,null,'Data');
        this.viewModel.filterText.set(cnxt.layer);
    }

    zoomToGeoFilter() {
        this.toggleTabFilters(null,null,null,'Geo');
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
        this.viewModel.geo_filter_collection.getItems().forEach((gfc,idx) => {
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
        let workflowUrl = "https://lib-gis1.library.oregonstate.edu/arcgis/home/item.html?id=24c76ba4aab347a0be0b5db5a878c636";
        let filters = { "filters": [] };
        this.viewModel.filter_collection.get().forEach(fc => {
            if (fc.type !== 'geographic') {
                filters.filters.push(
                    { "filterDef": fc.filterDef, "layer": fc.layer, "desc":fc.desc }
                );
            }            
        });

        let workflowArgs: any = {};
        workflowArgs.workflowId = "cons_pln_generate_report";
        workflowArgs.filterCollection = JSON.stringify(filters);
        workflowArgs.layerDef = this.viewModel.active_layer_def;
        workflowArgs.aoiGeometry = this.viewModel.aoiGeometry
            ? this.viewModel.aoiGeometry
            : JSON.parse("{\"rings\":[[[-13561079.235725246,5696991.214135939],[-12959366.9490645,5696991.214135939],[-12959366.9490645,5134414.685957194],[-13561079.235725246,5134414.685957194],[-13561079.235725246,5696991.214135939]]],\"spatialReference\":{\"wkid\":102100}}");      
        this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
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
                    layer: layer.DATALAYER,
                    field: layer.FIELD,
                    ui_type: layer.UITYPE,
                    min: layer.MIN,
                    max: layer.MAX,
                    enabled: layer.enabled.get(),
                    desc: layer.DESC,
                    filters: []
                };
                layer.DATAVALUES.getItems().forEach(dv => {
                    if (updateObj) {
                        if (updateObj.id === dv.optionID) {
                            dv.optionValue.set(updateObj.values);
                        }
                    }
                    let filter = {
                        label: dv.option,
                        field: dv.fieldValue,
                        value: dv.optionValue.get(),
                        categories: dv.categories
                    }
                    qo.filters.push(filter);
                });
                query_obj.push(qo);
            })
        });
        query_obj = query_obj.filter(qo => qo['filters'] ? qo['filters'].filter(f => f.value !== null).length > 0 : false);        
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
            if (qo['field']) {
                layerDef += layerDef !== '' ? ' AND (' : '(';
                let filter = {
                    layer: qo['layer'],
                    enabled: new Observable<Boolean>(qo['enabled']),
                    filterDef: '',
                    desc: qo["desc"],
                    type: 'attribute'
                };
                let filterDef = '';
                let filterDefSimple = ''; //for filter summary display more readable
                let showFilter = false;
                var divideBy = 1;
                switch (qo["ui_type"]) {
                    case 'Checkbox':
                    case 'RadioButton':
                        let filterVals = qo['filters'].filter(f => f.value ? true : false);
                        let joinCondition = filterVals.length === 0 ? ' AND ' : ' OR ';
                        if (filterVals.length === 0) {
                            joinCondition = ' AND ';
                            filterVals = qo['filters'];
                        }
                        showFilter = filterVals.length !== qo['filters'].length || joinCondition === ' AND ';
                        filterDefSimple += '( ';
                        filterVals.forEach((fv, idx2) => {
                            filterDefSimple += idx2 > 0 ? joinCondition : '';
                            let isNumeric = $.isNumeric(fv.field);
                            let comparator = !isNumeric
                                ? fv.value
                                    ? " like '"
                                    : " not like '"
                                : fv.value
                                    ? '='
                                    : '!=';
                            //filterDefSimple += comparator + (fv.label) + (!isNumeric ? "'" : "");
                            filterDefSimple += fv.label;
                            if (qo['enabled']) {
                                filterDef += idx2 > 0 ? joinCondition : '';
                                filterDef += ((qo['field']) + comparator + (fv.field) + (!isNumeric ? "'" : ""));
                            }                            
                        });
                        filterDefSimple += ' )';
                        break;
                    case 'RangeSlider':             
                        let hasCategories = qo['filters'][0].categories.length > 0;             
                        let minVal = qo['filters'][0]['value'][0] ? qo['filters'][0]['value'][0] : qo['min'];
                        let maxVal = qo['filters'][0]['value'][1] ? qo['filters'][0]['value'][1] : qo['max'];
                        showFilter = !(minVal.toString() === qo['min'] && maxVal.toString() === qo['max']);
                        if (showFilter) {
                            if (hasCategories) {
                                let selectedCategories = qo['filters'][0].categories.slice(minVal, maxVal + 1);
                                filterDefSimple += '( ';
                                selectedCategories.forEach((sc, idx) => {
                                    let cat = sc['category'];
                                    let catVal = sc['categoryVal'];
                                    filterDefSimple += cat + (idx !== selectedCategories.length - 1 ? ', ' : '');
                                    if (qo['enabled']) {
                                        if ($.isNumeric(catVal)) {
                                            filterDef += qo['field'] + " = " + catVal + (idx !== selectedCategories.length - 1 ? ' OR ' : '');
                                        } else {
                                            filterDef += qo['field'] + " like '" + catVal + "'" + (idx !== selectedCategories.length - 1 ? ' OR ' : '');
                                        }
                                    }
                                });
                                filterDefSimple += ')';
                            } else {
                                filterDefSimple += '( >=' + minVal + ' AND <=' + maxVal + ' )';
                                if (qo['enabled']) {
                                    filterDef = qo['field'] + '>='
                                        + (hasCategories
                                            ? minVal
                                            : (minVal / divideBy))
                                        + ' AND '
                                        + qo['field'] + '<='
                                        + (hasCategories ? maxVal : (maxVal / divideBy));
                                }
                            }
                        }
                        break;
                    case 'Slider':
                        filterDefSimple += '( >=' + qo['filters'][0]['value'] + ' )';
                        if (qo['enabled']) {
                            filterDef += qo['field'] + '>=' + (qo['filters'][0]['value'] / divideBy);
                        }
                        showFilter = qo['filters'][0]['value'].toString() !== qo['max'];
                        break;
                    default:
                        break;
                };
                filter.filterDef = filterDefSimple;
                if (showFilter) {
                    filterCollection.push(filter);
                } else {
                    this.viewModel.dashboard_meta.getItems().forEach(folder => {
                        folder.layers.getItems().forEach(layer => {
                            if (layer.DATALAYER === qo['layer']) {
                                layer.enabled.set(true);
                            }
                        });
                    });
                }               
                //check for spatial filter                
                layerDef += filterDef + ')' + (this.geo_filter.enabled
                    ? ' AND OBJECTID in (' + this.geo_filter.ids.toString() + ')'
                    : '');
                layerDef = layerDef === '()'
                    ? '1=1'
                    : layerDef.replace(' AND ()', '').replace('() AND ', '');                
            }            
        })
        this.viewModel.filter_collection.set(filterCollection);
        this.viewModel.has_filters.set(filterCollection.length > 0);
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
        var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon').length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon')[0] : null;
        let layer = mService.findLayerByName('HEX_SageCon');
        this.hex_layer_url = !this.hex_layer_url ? layer.getLayerUrl() : this.hex_layer_url;
        let layerDefintion = [];
        layerDefintion[0] = layerDef;
        mService.serviceLayer["setLayerDefinitions"](layerDefintion, true);
        mService.refresh();
        this.viewModel._resizeFilterList();
        this.getHexCount(layerDef);
    }
}
