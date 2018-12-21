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

declare var require;
var myWorkflowContext;
var drawToolBar;
var esriMap;

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
    aoiGeometry: any;
    gpDissolveURL: string = 'https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/dissolve/GPServer/dissolve'

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.geo_filter = {
            enabled: false,
            ids: []
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
                this.viewModel._hexLayerDisplay(this.viewModel.show_hex_layer.get());
            });
            if (this.drawToolBar == null) {
                this.esriMap = this.app.site.essentialsMap.getMap();
                this.drawToolBar = new esri.toolbars.Draw(this.esriMap);

                this.drawToolBar.on("draw-end", (evt) => {
                    this.aoiGeometry = evt.geometry;
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
                    });
                }
                );
            }

            //subscribe to the UploadDataCompletedEvent in case files get uploaded.
            this.app.eventRegistry.event("UploadDataCompletedEvent").subscribe(this, (uploadInfo) => {
                console.log('upload stuff!', uploadInfo);
                if (uploadInfo.mainResponse.featureCollection.layers.length > 0) {
                    if (uploadInfo.mainResponse.featureCollection.layers[0].featureSet.features.length > 1) {
                        //need to dissolve into one feature geometry                        
                        let uploadFS = new esri.tasks.FeatureSet();
                        //uploadFS.spatialReference = new esri.SpatialReference(102100);
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
                            console.log('gp Dissolve result!', result);
                            gptask.getResultData(result.jobId, "dissolved_features", (df) => {
                                this.aoiGeometry = df.value.features[0].geometry;
                                //query to get ids to include in layer def                    
                                let QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
                                let Query = new esri.tasks.Query();
                                Query.geometry = this.aoiGeometry;
                                Query.returnGeometry = false;
                                Query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
                                //Query["returnIdsOnly"] = true;                    
                                QueryTask.executeForIds(Query, (results) => {
                                    this.geo_filter.enabled = true;
                                    this.geo_filter.ids = results;
                                    this.updateQuery();
                                    this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                                });


                                console.log('dissolved features!', df);
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
                }
            })
        }        
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
                            ? parseInt(layer.MIN)
                            : 0;
                        let max = categories.length > 1
                            ? categories.length - 1
                            : layer.MAX
                                ? parseInt(layer.MAX)
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
                        let increment = layer.INCREMENT ? parseInt(layer.INCREMENT) : 1;

                        layer.DATAVALUES.getItems().forEach(function (dv) {
                            $("#" + dv.optionValID).html(
                                categories.length > 1
                                    ? (categories[0].category + ' - ' + categories[max].category) :
                                    layer['UITYPE'] === 'RangeSlider' ?
                                        minVal.toString() + " - " + maxVal.toString()
                                        : maxVal.toString());
                            $("#" + dv.optionID).slider({
                                range: layer['UITYPE'] === 'RangeSlider',
                                step: increment,
                                min: min,
                                max: max,
                                value: layer['UITYPE'] === 'Slider' ? maxVal : null,
                                values: layer['UITYPE'] === 'RangeSlider' ? [minVal, maxVal] : null,
                                slide: function (_event, ui) {
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
                            })
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
    toggleGeographicFilter(_evt, _elem, _cntx) {
        this.viewModel.show_geo_filter.set(!this.viewModel.show_geo_filter.get());
        this.viewModel.show_geo_filter_class.set(!this.viewModel.show_geo_filter.get() ? 'show-filters' : 'hide-filters');
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
        this.viewModel.filterText.set(cnxt.layer);
    }

    zoomToGeoFilter(_evt, _el, cntx) {
        this.app.commandRegistry.command("ZoomToExtent").execute(this.aoiGeometry.getExtent());
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
                        value: dv.optionValue.get()
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
        if (this.geo_filter.ids.length >0) {
            filterCollection.push({
                layer: "Geographic Filter",
                enabled: new Observable<Boolean>(this.geo_filter.enabled),
                filterDef: '',
                type: 'geographic'
            });
        }
        query_obj.forEach((qo, _idx) => {
            if (qo['field']) {
                layerDef += layerDef !== '' ? ' AND (' : '(';
                let filter = {
                    layer: qo['layer'],
                    enabled: new Observable<Boolean>(qo['enabled']),
                    filterDef: '',
                    type: 'attribute'
                };
                let filterDef = '';
                let filterDefSimple = ''; //for filter summary display more readable
                let showFilter = false;
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
                        let divideBy = 1;
                        filterDefSimple += '( >=' + qo['filters'][0]['value'][0] + ' AND <=' + qo['filters'][0]['value'][1] + ' )';
                        if (qo['enabled']) {
                            filterDef = qo['field'] + '>=' + qo['filters'][0]['value'][0] / divideBy + ' AND ' + qo['field'] + '<=' + qo['filters'][0]['value'][1] / divideBy;
                        }
                        showFilter = !(qo['filters'][0]['value'][0].toString() === qo['min'] && qo['filters'][0]['value'][1].toString() === qo['max']);
                        break;
                    case 'Slider':
                        filterDefSimple += '( >=' + qo['filters'][0]['value'][0] + ' )';
                        if (qo['enabled']) {
                            filterDef += qo['field'] + '>=' + qo['filters'][0]['value'][0] / divideBy;
                        }
                        showFilter = qo['filters'][0]['value'][0].toString() !== qo['max'];
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
    setLayerDef(layerDef) {
        var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon').length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon')[0] : null;
        let layer = mService.findLayerByName('HEX_SageCon');
        this.hex_layer_url = !this.hex_layer_url ? layer.getLayerUrl() : this.hex_layer_url;
        let layerDefintion = [];
        layerDefintion[0] = layerDef;
        mService.serviceLayer["setLayerDefinitions"](layerDefintion, true);
        mService.refresh();
        this.viewModel._resizeFilterList();
    }
}