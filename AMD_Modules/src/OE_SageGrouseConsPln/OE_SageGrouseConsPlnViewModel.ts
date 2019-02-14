/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { FilterableCollection } from "geocortex/framework-ui/FilterableCollection";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { OE_SageGrouseConsPlnView } from './OE_SageGrouseConsPlnView';
import { config } from "rx-lite";

export interface Folder {
    folder: string;
    visible: boolean;
    layers: ObservableCollection<any>;
}

export class SageGrouseConsPlnViewModel extends ViewModelBase {    
    app: ViewerApplication;
    filterView: OE_SageGrouseConsPlnView;   
    myWorkflowContext: any;
    myModel: any;
    dashboard_meta: ObservableCollection<Folder>;
    geo_filter_collection: ObservableCollection<any>;    
    geo_history_filter_collection: FilterableCollection<any>;
    folders: ObservableCollection<string>;   
    show_filter_summary: Observable<boolean>;
    show_geo_filter: Observable<boolean>;
    show_data_filter: Observable<boolean>;
    show_filter_class: Observable<string>;
    show_data_filter_class: Observable<string>;
    show_geo_filter_class: Observable<string>;
    filter_collection: ObservableCollection<any>;
    has_filters: Observable<boolean>;
    get_info_layer: ObservableCollection<any>;
    firstSizing: boolean = true;
    filterText = new Observable<string>("");
    dashboard_meta_filter: FilterableCollection<any>;
    filter_number: Observable<string>;
    show_hex_layer: Observable<boolean>;
    show_recent_geo_filters: Observable<boolean>;
    aoiGeometry: any;
    active_layer_def: string;
    downloadFormats: ObservableCollection<any>;
    selectedFormat: Observable<string> = new Observable("");  
    isDownloading: Observable<boolean> = new Observable(false);
    downloadReady: Observable<boolean> = new Observable(false);
    downloadUrl: Observable<string> = new Observable("");
    downloadError: Observable<boolean> = new Observable(false);
    hexCount: Observable<string> = new Observable('0');
    isUploading: boolean = false;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.myModel = this;
        this.dashboard_meta = new ObservableCollection<Folder>();
        this.dashboard_meta_filter = new FilterableCollection<Folder>(this.dashboard_meta, this._FilterFilters.bind(this, this));
        this.filter_number = new Observable<string>("0");
        this.folders = new ObservableCollection([]);
        this.show_filter_summary = new Observable(true);
        this.show_filter_class = new Observable("hide-filters");
        this.show_geo_filter_class = new Observable("tab-header show-filters");
        this.show_data_filter_class = new Observable("tab-header hide-filters");
        this.show_geo_filter = new Observable(false);
        this.show_data_filter = new Observable(true);
        this.filter_collection = new ObservableCollection([]);
        this.has_filters = new Observable(false);
        this.get_info_layer = new ObservableCollection([]);
        this.filterText = new Observable<string>("");
        this.filterView = new OE_SageGrouseConsPlnView(app, lib);
        this.show_hex_layer = new Observable(true);
        this.geo_filter_collection = new ObservableCollection<any>();
        this.geo_history_filter_collection = new FilterableCollection<any>(this.geo_filter_collection, this._FilterGeoHistory.bind(this, this));
        this.show_recent_geo_filters = new Observable(false);

        this.downloadFormats = new ObservableCollection([
            {
                label: 'Shapefile',
                val: 'Shapefile - SHAPE - .shp'
            }, {
                label: 'KML/KMZ',
                val: 'OpenGIS KML Encoding Standard - OGCKML - .kmz'
            },
            {
                label: 'File Geodatabse (.gdb)',
                val: 'File Geodatabase - FILEGDB - .gdb'
            }
        ]);        
        // Listen for changes to the filter text to update the filtered collection.
        this.filterText.bind(this, () => {
            this.dashboard_meta_filter.refresh();
            let layer_cnt = 0;
            this.dashboard_meta.getItems().forEach(folder => {
                folder["filteredLayers"].refresh();
                layer_cnt += folder["filteredLayers"].getLength();
                folder["filteredLayers"].refresh();
            });
            this.filter_number.set(layer_cnt.toString() + ' filter(s)');
            this.app.viewManager.getViewById("OE_SageGrouseConsPlnView")["setDefaultFilters"]();
        });
        this.geo_filter_collection.bind(this, () => {
            this.show_recent_geo_filters.set(this.geo_filter_collection.getLength() > 0);
        });    
    
        this.dashboard_meta.bind(this, (args) => {
            if (this.dashboard_meta.getLength() > 0) {
                let layer_cnt = 0;
                this.dashboard_meta.getItems().forEach((folder) => {
                    layer_cnt += folder["filteredLayers"].getLength();
                });
                this.filter_number.set(layer_cnt.toString() + ' filter(s)');
            }
        });
    }


    private _injectCSS(): void {

        let link = document.createElement('link');
        link.href = "";
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    //
    private _injectScript() {
        //jQuery plugin for displaying tour/guide
        //http://linkedin.github.io/hopscotch/
        //////////////////////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/hopscotch-0.1.1.min.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
        });
        //jQuery Plugin for advanced range sliders
        // http://ghusse.github.io/jQRangeSlider/options.html
        ////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/jQAllRangeSliders-min.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
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
                window.setTimeout((thisScope) => { thisScope._resizeFilterList(thisScope) }, 500);                
            });       
            this.app.eventRegistry.event("DataFrameClosedEvent").subscribe(this, (args) => {
                let thisScope = this;
                window.setTimeout((thisScope) => { thisScope._resizeFilterList(thisScope) }, 500);
            }); 
            
            this.app.eventRegistry.event("ViewContainerViewClosedEvent").subscribe(this, (args) => {
                console.log('view container closing', args);
                if (args.viewId === "OE_SageGrouseConsPlnView") {
                    //turn off hex layer display                    
                    this._toggleLayerDisplay('HexSageCon', 'HEX_SageCon', false);
                    //this._hexLayerDisplay(false);
                }
            }); 
            //////////////////////
            //  Hide download symbolize options
            //////////////////////
            this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
                if (args.id === "WaitForUploadDataMainResponse") {
                    this.isUploading = true;
                }
                if (args.id === "SymbolDialogView" && this.isUploading) {
                    window.setTimeout(() => {
                        $('.button:contains("Proceed")').each((idx,btn) => {
                            $(btn).click();
                        });
                    }, 50);                           
                    this.isUploading = false;
                }
                if (args.id === "OE_SageGrouseConsPlnHelpTutorialView") {
                    $(".modal-overlay.active").css("background", "pink");
                }
            });            
        }
    }

    _toggleLayerDisplay(service, layer, show?: boolean) {
        var mService = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === service).length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === service)[0] : null;
        let serviceLayer = mService.findLayerByName(layer);
        serviceLayer.setVisibility(show);
        mService.setVisibility(show);
        mService.refresh();
    }

    _removeService(service) {
        let ms = this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === service).length > 0 ? this.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === service)[0] : null;
        if (ms) {
            this.app.site.essentialsMap.removeMapService(ms);
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {
        this.app.registerActivityIdHandler("showConsPlnFilters", function CustomEventHandler(workflowContext, contextFunctions) {    
            //Show over viewe first // add check based on cookie preference to show again or not.

            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnHelpTutorialView"); 
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
                        recAttr.enabled = new Observable<Boolean>(true);
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
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");   
            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnHelpTutorialView"); 
            thisViewModel._resizeFilterList();            
        });      
        this._injectScript();
       
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

    _FilterGeoHistory(thisViewModel: any, filter: any) {
        return this.aoiGeometry
            ? filter.geometry !== this.aoiGeometry
            : true;
    }

    _LayerFilters(thisViewModel: any, layer: any) {
        if (layer.DATALAYER.toUpperCase().indexOf(thisViewModel.filterText.get().toUpperCase()) > -1) {
            return true;
        }
        return false;        
    }

    _resizeFilterList(thisViewModel?:any) {
        //set height for scroll list
        if ($(".OE_SageGrouseConsPlnView").length > 0 ? $(".OE_SageGrouseConsPlnView")[0].classList.contains('active') : false) {
            let process = thisViewModel ? thisViewModel.show_data_filter.get() : this.show_data_filter ? this.show_data_filter.get() : false;
            if (process) {
                let reportAreaHeight = $(".OE_SageGrouseConsPlnView").parent().height();
                let summaryAreaHeight = $("#filter-summary-control").height();
                summaryAreaHeight += this.firstSizing ? 49 : 20;
                $(".body-content-inner-wrapper").height(reportAreaHeight - summaryAreaHeight + "px");
                //set width
                let reportAreaWidth = $(".OE_SageGrouseConsPlnView").parent().width() - 25;
                $("#report_area").width(reportAreaWidth + "px");
                this.firstSizing = reportAreaHeight ? false : true;
            }            
        }        
    }

    _shortenIDs(id) {
        return id.replace(/\ /ig, '')
            .replace(/\(/ig, '')
            .replace(/\)/ig, '')
            .replace(/\-/ig, '')
            .replace(/\:/ig,'');
    }
}

