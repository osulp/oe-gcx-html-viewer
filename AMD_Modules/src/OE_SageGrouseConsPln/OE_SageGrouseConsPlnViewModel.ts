/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { FilterableCollection } from "geocortex/framework-ui/FilterableCollection";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { OE_SageGrouseConsPlnView } from './OE_SageGrouseConsPlnView';

export interface Folder {
    folder: string;
    visible: boolean;
    layers: ObservableCollection<any>;
}

//export interface Layer {
//    source: string;
//    DATAVALUES: [];
//    summarization: string;
//    MIN: string;
//    MAX: string;
//    INCREMENT: string;
//    FIELD: string;
//    UITYPE: string;
//    directionality: string;
//    desc: string;
//    notes: string;
//    uiID: string;
//    uiValID: string;
//    //uiID: ObservableCollection<string>;
//    //uiELem: HTMLElement;
//    //uiValue: HTMLElement;    
//}

export class SageGrouseConsPlnViewModel extends ViewModelBase {
    app: ViewerApplication;
    filterView: OE_SageGrouseConsPlnView;
    myWorkflowContext: any;
    myModel: any;
    dashboard_meta: ObservableCollection<Folder>;
    //dashboard_meta_filter: ObservableCollection<Folder>;    
    folders: ObservableCollection<string>;   
    show_filter_summary: Observable<boolean>;
    filter_collection: ObservableCollection<any>;
    has_filters: Observable<boolean>;
    get_info_layer: ObservableCollection<any>;
    firstSizing: boolean = true;
    filterText = new Observable<string>("");
    dashboard_meta_filter: FilterableCollection<any>;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
        this.myModel = this;
        this.dashboard_meta = new ObservableCollection<Folder>();
        this.dashboard_meta_filter = new FilterableCollection<Folder>(this.dashboard_meta, this._FilterFilters.bind(this,this));
        this.folders = new ObservableCollection([]);
        this.show_filter_summary = new Observable(false);
        this.filter_collection = new ObservableCollection([]);
        this.has_filters = new Observable(false);
        this.get_info_layer = new ObservableCollection([]);
        this.filterText = new Observable<string>("");
        this.filterView = new OE_SageGrouseConsPlnView(app, lib);
        //this.dashboard_meta_filter.bind(this, (changedArgs: any) => {
        //    console.log('what changed?', changedArgs);
        //});
        // Listen for changes to the filter text to update the filtered collection.
        this.filterText.bind(this, () => {
            this.dashboard_meta_filter.refresh();
            this.dashboard_meta.getItems().forEach(folder => {
                folder["filteredLayers"].refresh();
            });
            this.app.viewManager.getViewById("OE_SageGrouseConsPlnView")["setDefaultFilters"]();
        });

    }


    initialize(config: any): void {
        var site: Site = (<any>this).app.site;

        var thisViewModel = this;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
            this.app.eventRegistry.event("ApplicationResizedEvent").subscribe(this, (args) => {
                this._resizeFilterList();
            });
            this.app.eventRegistry.event("PanelResizeEndEvent").subscribe(this, (args) => {
                let thisScope = this;
                window.setTimeout(thisScope._resizeFilterList, 500);                
            });           
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {
        this.app.registerActivityIdHandler("showConsPlnFilters", function CustomEventHandler(workflowContext, contextFunctions) {            
            //create the query list stucture
            //pull unique folders
            var thisScope = this;
            let _query_dash_meta = workflowContext.getValue("query_dash_meta").features;
            let _queryMeta = _query_dash_meta
                .map(rec => {
                    return rec.attributes.FOLDER;
                })
                .filter((v, i, a) => a.indexOf(v) === i)
                .map(folder => { return { folder: folder } });          
            //Attach layers to folders
            _queryMeta.map((folder,idx) => {
                let visible = new Observable<boolean>(idx === 0);
                let layers = new ObservableCollection<any>();    
                let filteredLayers = new FilterableCollection<any>(layers, thisViewModel._LayerFilters.bind(this, thisViewModel));                
                let _lyrs = []
                _query_dash_meta.forEach(rec => {
                    var recAttr = rec.attributes;
                    if (folder.folder === recAttr.FOLDER) {
                        //split the datavalues field to get unique options for layer 
                        let layer_filter_opts = [];
                        let layer = recAttr.DATALAYER;
                        let objID = recAttr.OBJECTID;
                        let datavalues = new ObservableCollection<any>();

                        //setup categories if applicable
                        var hasCategories = ['RangeSlider', 'Slider'].indexOf(recAttr.UITYPE) !== -1 && recAttr.DATAVALUES.split(',').length > 1;
                        var categories = hasCategories
                            ? recAttr.DATAVALUES.split(',').map(dv => {
                                return {
                                    category: dv.split(':')[0], categoryVal: dv.split(':')[1]
                                }
                            })
                            : [];
                        var categoryVals = hasCategories ? recAttr.DATAVALUES.split(',').map(dv => dv.split(':')[1]) : [];
                        recAttr.DATAVALUES.split(',').forEach((dv, idx) => {
                            if (idx === 0 && hasCategories || !hasCategories) {
                                let nameForIDs = thisViewModel._shortenIDs(objID + layer + (!hasCategories ? dv.split(':')[0] : ''));
                                let _opts = {
                                    option: hasCategories ? layer : dv.split(':')[0],
                                    categories: categories,
                                    optionLayer: layer,
                                    optionUI: recAttr.UITYPE,
                                    optionID: nameForIDs,
                                    optionValID: nameForIDs + "Val",
                                    fieldValue: !hasCategories ? dv.split(':')[1] : '',
                                    optionValue: new Observable<any>(recAttr.UITYPE === "Checkbox" ? true : null)                                    
                                };
                                layer_filter_opts.push(_opts);
                            }
                        });
                        datavalues.set(layer_filter_opts);
                        recAttr.DATAVALUES = datavalues;                        
                        _lyrs.push(recAttr);
                    }
                });
                layers.set(_lyrs);
                folder.layers = layers;
                folder.filteredLayers = filteredLayers;
                folder.visible = visible;
            })            
            //Set observable collection to bind to html
            thisViewModel.dashboard_meta.set(_queryMeta);     
            //thisViewModel.dashboard_meta_filter.set(_queryMeta);
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");      
            thisViewModel._resizeFilterList();
        });
    }

    _FilterFilters(thisViewModel: any, folder: any) {        
        let filterText = thisViewModel.filterText.get().toUpperCase();
        let hasLayers = folder.layers.getItems()
            .filter((layer) => {
                return layer.DATALAYER.toUpperCase().indexOf(filterText) > -1;
            })
            .length > 0;
        folder.visible.set(hasLayers);
        return hasLayers;
    }

    _LayerFilters(thisViewModel: any, layer: any) {
        if (layer.DATALAYER.toUpperCase().indexOf(thisViewModel.filterText.get().toUpperCase()) > -1) {
            return true;
        }
        return false;        
    }

    _resizeFilterList() {
        //set height for scroll list
        if ($(".OE_SageGrouseConsPlnView").length > 0 ? $(".OE_SageGrouseConsPlnView")[0].classList.contains('active') : false ) {
            let reportAreaHeight = $(".OE_SageGrouseConsPlnView").parent().height();
            let summaryAreaHeight = $("#filter-summary-control").height();
            summaryAreaHeight += this.firstSizing ? 59 : 29;
            $(".body-content-inner-wrapper").height(reportAreaHeight - summaryAreaHeight + "px");
            //set width
            let reportAreaWidth = $(".OE_SageGrouseConsPlnView").parent().width() - 25;
            $("#report_area").width(reportAreaWidth + "px");
            this.firstSizing = reportAreaHeight ? false : true;
        }        
    }

    _shortenIDs(id) {
        return id.replace(/\ /ig, '')
            .replace(/\(/ig, '')
            .replace(/\)/ig, '')
            .replace(/\-/ig, '');
    }
    
}