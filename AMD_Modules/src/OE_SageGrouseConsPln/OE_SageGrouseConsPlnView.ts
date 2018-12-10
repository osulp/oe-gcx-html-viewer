/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/jqueryui.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { contains } from "geocortex/framework/utils/ArrayUtils";

declare var require;
var myWorkflowContext;

export class OE_SageGrouseConsPlnView extends ViewBase {

    jquiSlider = HTMLElement;
    amount = HTMLElement;
    root: HTMLElement;
    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    onFolderClick(event, element, context) {
        context.visible.set(!context.visible.get());
    }    

    onUIChangeEvtHandler(event, element, context) {        
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
        //this.updateQuery();
    }

    activated() {
        this.setDefaultFilters(true);    
        //set right panel to display and fire map resize event to get map displaying properly
        $(".large-shell-right").css("display", "block");
        $(".large-shell-center").css("right", "350px");
        this.app.commandRegistry.command("RecenterMapOnNextMapResize").execute();
        this.app.commandRegistry.command("MapResize").execute();
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
                                slide: function (event, ui) {
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
    }

    onGetInfo(event, element, context) {
        let layerInfo = {
            layer: context.DATALAYER,
            desc: context.DESC
        };
        this.viewModel.get_info_layer.set([layerInfo]);
        this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnFilterInfoView");
    }

    toggleFilters() {        
        this.viewModel.show_filter_summary.set(!this.viewModel.show_filter_summary.get());
        this.viewModel._resizeFilterList();
    }

    resetFilters() {
        this.setDefaultFilters(true);
        this.updateQuery();
    }

    removeFilter(event, element, context) {
        console.log('filter to remove!');
        //update data model to remove the filter for layer
        this.viewModel.dashboard_meta.getItems().forEach(folder => {
            folder.layers.getItems().forEach(layer => {
                if (layer.DATALAYER === context.layer) {
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

    clearSearch(evt, el, cnxt) {
        this.viewModel.filterText.set("");
    }

    setSearch(evt, el, cnxt) {
        this.viewModel.filterText.set(cnxt.layer);
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
        query_obj.forEach((qo, idx) => {
            if (qo['field']) {
                layerDef += layerDef !== '' ? ' AND (' : '(';
                let filter = {
                    layer: qo['layer'],
                    filterDef: ''
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
                            filterDef += idx2 > 0 ? joinCondition : '';
                            filterDef += ((qo['field']) + comparator + (fv.field) + (!isNumeric ? "'" : ""));
                        });
                        filterDefSimple += ' )';
                        break;
                    case 'RangeSlider':
                        let divideBy = 1;
                        filterDefSimple += '( >=' + qo['filters'][0]['value'][0] + ' AND <=' + qo['filters'][0]['value'][1] + ' )';
                        filterDef = qo['field'] + '>=' + qo['filters'][0]['value'][0] / divideBy + ' AND ' + qo['field'] + '<=' + qo['filters'][0]['value'][1] / divideBy;
                        showFilter = !(qo['filters'][0]['value'][0].toString() === qo['min'] && qo['filters'][0]['value'][1].toString() === qo['max']);
                        break;
                    case 'Slider':
                        filterDefSimple += '( >=' + qo['filters'][0]['value'][0] + ' )';
                        filterDef += qo['field'] + '>=' + qo['filters'][0]['value'][0] / divideBy;
                        showFilter = qo['filters'][0]['value'][0].toString() !== qo['max'];
                        break;
                    default:
                        break;
                };
                filter.filterDef = filterDefSimple;
                if (showFilter) {
                    filterCollection.push(filter);
                }                
                layerDef += filterDef + ')';
            }            
        })
        this.viewModel.filter_collection.set(filterCollection);
        this.viewModel.has_filters.set(filterCollection.length > 0);
        console.log('query_obj', query_obj);
        var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon').length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon')[0] : null;

        let layer = mService.findLayerByName('HEX_SageCon');
        let layerDefintion = [];
        layerDefintion[0] = layerDef;
        mService.serviceLayer["setLayerDefinitions"](layerDefintion, true);
        mService.refresh();
        this.viewModel._resizeFilterList();
    }    
}