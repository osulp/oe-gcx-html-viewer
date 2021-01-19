/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
/// <reference path="./../../_Definitions/dojo.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { MapService } from "geocortex/essentials/MapService";
import { Layer } from "geocortex/essentials/Layer";

import { ChartViewModelFactory } from "geocortex/charting/ChartViewModelFactory";
import { Chart } from "geocortex/charting/Chart";
import { ChartPointAdapterRegistry } from "geocortex/charting/infrastructure/ChartPointAdapterRegistry"

import { ChartColorPalette, ChartFeatureType, ChartFieldSourceType } from "geocortex/charting/infrastructure/Enums";

import { OE_ChartPointJsonAdapter } from "../OE_OWRTReports/OE_JsonAdapter";

declare var $: any;

export class OE_OWRTReportsViewModelSequenceTask {

    queryTask: esri.tasks.QueryTask;
    query: any;
    isRelationshipsQuery: boolean;
    isIDQuery: boolean;
    isCountQuery: boolean;
    isDistinct: boolean;    
    largeRequest: OE_LargeRecordRequest;
    listeners: any[];
            
    constructor(qt: esri.tasks.QueryTask, queryIn: any, listenersIn: any[], relationshipQuery: boolean = false, isIDQueryIn: boolean = false, isCountQueryIn: boolean = false, largeRequestIn: OE_LargeRecordRequest = null, isDistinctIn: boolean = false) {
        this.queryTask = qt;
        this.query = queryIn;
        this.isRelationshipsQuery = relationshipQuery;
        this.isIDQuery = isIDQueryIn;
        this.largeRequest = largeRequestIn;
        this.listeners = listenersIn;
        this.isCountQuery = isCountQueryIn;
        this.isDistinct = isDistinctIn;
    }    
}

export class OE_LargeRecordRequest {

    url: string;
    maxRecordCount: number = 0;
    totalRecords: number = 0;
    isDistinct: boolean = false;
    fieldnames: string[];
    where: string;    
    queryGeometry: esri.geometry.Geometry = null;

    workingOffset: number = 0;
    allFeatures: any[];    
    targetFeatureSet: string;
    logName: string;
    
    onComplete: any;
    modelRef: OE_OWRTReportsAreaViewModel;

    listeners: any[];

    errors: any;

    public SetupRequest(
        urlIn: string,
        whereIn: string,        
        queryGeometryIn: esri.geometry.Geometry,
        fieldNamesIn: string[],
        logNameIn: string,
        onCompleteIn: any,
        modelRefIn: OE_OWRTReportsAreaViewModel,
        targetFeatureSetIn: string,
        isDistinctIn:boolean = false): void {

        this.url = urlIn;
        this.fieldnames = fieldNamesIn;
        this.where = whereIn;
        this.queryGeometry = queryGeometryIn;
        this.allFeatures = null;
        this.logName = logNameIn;        
        this.workingOffset = 0;
        this.isDistinct = isDistinctIn;
                
        this.errors = "";
        this.onComplete = onCompleteIn;
        this.modelRef = modelRefIn;

        this.targetFeatureSet = targetFeatureSetIn;                                
    }

    public StartRequest() {
        this._GetMaxeRecordCount(this.url);
    }
        
    private _GetMaxeRecordCount(queryUrl:string): void {
        
        //MaxRecordCount (get from config)
        var esriRequest = esri.request(
            {
                url: queryUrl,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback"
            }
        );

        var thisRef = this;

        esriRequest.then(function (response) {
            //console.log("MaxRecordCount Request: " + response);
            thisRef.maxRecordCount = response.maxRecordCount;
            thisRef._GetTotalRecords(thisRef.url);
        }, function (error) {            
            console.log(error);
            thisRef.modelRef.StopOnErrorMessage("Max query size failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + error);
        });
    }

    private _GetTotalRecords(queryUrl: string): void {
        
        var query = new esri.tasks.Query();
        if (this.queryGeometry != null)
            query.geometry = this.queryGeometry;

        query.where = this.where;
        query.returnGeometry = false;
        
        var queryTask = new esri.tasks.QueryTask(this.url);
        
        var thisRef = this;

        queryTask.on("execute-for-count-complete", function (event: any) {
                        
            if (event.count > 0)
            {
                thisRef.totalRecords = event.count;                                
                thisRef._DoQueryLoop(thisRef.url);
                
            }
            else {
                console.log("Count is zero or null.");
                thisRef.totalRecords = 0;
                thisRef._DoQueryLoop(thisRef.url);
            }
        });
        queryTask.on("error", function (event: any) {
            console.log((<esri.tasks.QueryTask>event.target).url);
            console.log(event.error);      
            thisRef.modelRef.StopOnErrorMessage("Count failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
        });                               

        queryTask.executeForCount(query);                
    }

    private _DoQueryLoop(queryUrl: string): void {

        var query: esri.tasks.Query = new esri.tasks.Query();
        if (this.queryGeometry != null) {
            query.geometry = this.queryGeometry;
            //query.geometryPrecision
            //query.maxAllowableOffset
        }

        query.where = this.where;
        query.returnGeometry = false;
        query.outFields = this.fieldnames;
        query.start = this.workingOffset;
        query.num = this.maxRecordCount;
        query.returnDistinctValues = this.isDistinct;
        
        var queryTask = new esri.tasks.QueryTask(this.url);

        var thisRef = this;

        var onSuccess = queryTask.on("complete", function (event: any) {
            if (typeof event != "undefined" && typeof event.featureSet != "undefined") {
                //thisRef.allFeatureSets.push(response);

                if (thisRef.allFeatures == null)
                    thisRef.allFeatures = event.featureSet.features;
                else
                    thisRef.allFeatures = thisRef.allFeatures.concat(event.featureSet.features)

                thisRef._CheckIfLoopIsDone();
            }
            else
            {
                console.log("Query failed.");
                console.log((<esri.tasks.QueryTask>event.target).url);
                thisRef.modelRef.StopOnErrorMessage("Query loop failed: no event or featureset.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet);
            }
        });
        var onError = queryTask.on("error", function (event: any) {
            console.log((<esri.tasks.QueryTask>event.target).url);
            console.log(event.error);
            thisRef.modelRef.StopOnErrorMessage("Query loop failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
        });

        this.listeners = [onSuccess, onError];
                
        queryTask.execute(query);        
    }
            
    private _CheckIfLoopIsDone():void {

        this.workingOffset += this.maxRecordCount;

        //request more records
        if (this.workingOffset < this.totalRecords)
        {
            //clear previous listeners
            if (typeof this.listeners !== "undefined" && this.listeners != null) {
                for (let i = 0; i < this.listeners.length; i++)
                    this.listeners[i].remove();
            }

            this._DoQueryLoop(this.url);
        }
        else //done
        {
            this._AllFinished();
        }
    }

    private _AllFinished(): void {

        //console.log("Total Features: " + this.allFeatures.length);

        //clear previous listeners
        if (typeof this.listeners !== "undefined" && this.listeners != null) {
            for (let i = 0; i < this.listeners.length; i++)
                this.listeners[i].remove();
        }
        
        if (typeof this.targetFeatureSet !== "undefined" && this.targetFeatureSet != null && this.targetFeatureSet != "")
            this.modelRef[this.targetFeatureSet] = this.allFeatures;

        if (this.onComplete)
            this.onComplete();
    }
}

export class OE_OWRTReportsAreaViewModel extends ViewModelBase {
     
    app: ViewerApplication;
    chartFactory: ChartViewModelFactory;
    dataSource: any;

    reportMapServiceName: string;

    geoService: string = "http://arcgis.oregonexplorer.info/arcgis/rest/services/Utilities/Geometry/GeometryServer";
        
    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading Report...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(true);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);

    loaderProjectsVisible: Observable<boolean> = new Observable<boolean>(false);
    loaderFundsVisible: Observable<boolean> = new Observable<boolean>(false);
    loaderResultsVisible: Observable<boolean> = new Observable<boolean>(false);

    loadSpinnerProjects: Observable<boolean> = new Observable<boolean>(true);
    loadSpinnerFunding: Observable<boolean> = new Observable<boolean>(true);
    loadSpinnerResults: Observable<boolean> = new Observable<boolean>(true);

    primaryQueryString: Observable<string> = new Observable<string>("1=1");    
    primaryObjectIDString: Observable<string> = new Observable<string>("");
    requiredFeaturesLoaded: Observable<boolean> = new Observable<boolean>(false);
    
    //map
    esriMap: esri.Map;
    esriProjectLayer: esri.layers.FeatureLayer;    
    esriAreaLayer: esri.layers.FeatureLayer;
    esriMapSymbol: esri.symbol.SimpleMarkerSymbol;
    esriMapSymbolFill: esri.symbol.SimpleFillSymbol;
    esriMapPrimaryQuery: Observable<string> = new Observable<string>("1=1");
    esriMapLayerDefs: string[];
    esirMapPointLayers: esri.layers.FeatureLayer[];

    esriPointsLayer: esri.layers.ArcGISDynamicMapServiceLayer = null;

    //chart
    kChartActive: kendo.dataviz.ui.Chart;
    chartPartVisible: Observable<boolean> = new Observable<boolean>(true);
    chartActVisible: Observable<boolean> = new Observable<boolean>(false);
    chartActive: any;
    
    chartFundingActivity: RestChartDefinition = null;
    chartFundingActivityData: any = {}        
    chartFundingPart: RestChartDefinition = null;
    chartFundingPartData: any = {};

    chartProjectsByYear: any;

    queryUrlOWRT: string;    
    queryCentroidsSimple: string;
    
    urlMainMapService: string;
    layerIDProjectPoints: number;
    urlSWCDMapService: string;
            
    queryUrlCounty: string;
    queryUrlWSC: string;
    queryUrlSWCD: string;
    queryUrlBasins: string;
    queryUrlHUC8: string;

    queryUrlActivityTypes: string;

    //drop down menus, area geometry, activity types for chart table view
    fsBasins: esri.tasks.FeatureSet = null;
    fsHUC8: esri.tasks.FeatureSet = null;
    fsCounty: esri.tasks.FeatureSet = null;
    fsWSC: esri.tasks.FeatureSet = null;
    fsSWCD: esri.tasks.FeatureSet = null;
    fsSelectedAreaGeometry: esri.tasks.FeatureSet = null;    
    fsActivityTypeStrings: esri.tasks.FeatureSet = null;
    
    owebRequestsCount: number = 0;
    owebRequestsDone: number = 0;
    owebRequestsErrors: string = null;
    owebResults_project_Totals: any;
    owebResults_project_Year: any;
    owebResults_project_Type_Year_Funding: any;
    owebResults_results: any;
    owebResults_funding_Source: any;
    owebResults_ranking: any;
    owebResultChartDataSets: any;

    activeTab: string = "overview";

    //async completion tallies
    toCompleteProject: number = 1;
    toCompleteFunds: number = 3;
    toCompleteResults: number = 1;
    toCompleteProjectCurrent: number = 0;
    toCompleteFundsCurrent: number = 0;
    toCompleteResultsCurrent: number = 0;
                
    selectedAreaGeometry: esri.geometry.Polygon = null;    
    graphicsArrayPrimaryRecords: esri.Graphic[] = null;        
             
    sequenceTasks: OE_OWRTReportsViewModelSequenceTask[] = [];    
    sequenceErrors: string = "";
    sequenceOnComplete: any = null;
    sequenceLastTask: OE_OWRTReportsViewModelSequenceTask = null;

    largeRequest: OE_LargeRecordRequest;
    owrtActivitySymbols: any[] = [];
    
    //report options    
    pipeParamsFromURL: any;
    //reportWorkingQuery: string;
    lastQuery: string;
    isCustomReport: boolean = false;
    customGeometry: esri.geometry.Polygon = null;

    yearRangeSlider: any;
    optionsImageSrc: Observable<string> = new Observable<string>("Resources/Images/Icons/arrow-right-small-24.png");
    reportOptionsPanelVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaListVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaList: ObservableCollection<object> = new ObservableCollection<object>(null);

    yearMin: number = 1995;
    yearMax: number = 2019;
    startYearDefault: number = 1995;
    endYearDefault: number = 2019;

    startYear: Observable<string> = new Observable<string>(this.startYearDefault.toString());
    endYear: Observable<string> = new Observable<string>(this.endYearDefault.toString());
    yearRangeString: Observable<string> = new Observable<string>("");

    geoTypeList: ObservableCollection<object> = new ObservableCollection<object>([]);
    geoTypeName: Observable<string> = new Observable<string>("State");    
    geoTypeValue: Observable<string> = new Observable<string>("state");
    geoTypeGeometryLayerDef: Observable<string> = new Observable<string>("");

    areaNameVisisble: Observable<boolean> = new Observable<boolean>(false);
    areaName: Observable<string> = new Observable<string>("");
    areaNameSelected: Observable<string> = new Observable<string>("");
    areaNamePointsQueryString: Observable<string> = new Observable<string>("1=1");
    areaNamePolyQueryString: Observable<string> = new Observable<string>("");

    selectedAreaQueryUrl: string;

    activeTabChartName: string;
    lastProjectTabChartName: string;
    lastFundingTabChartName: string;
    lastResultsChartName: string;

    //table data view
    owrtChartsTableContainerVisible: Observable<boolean> = new Observable<boolean>(false);

    owrtChartsTableSharedVisible: Observable<boolean> = new Observable<boolean>(false);
            
    owrtTableLinkText: Observable<string> = new Observable<string>("Table View");
    owrtTableLinkImg: Observable<string> = new Observable<string>("Resources/Images/Icons/paging-control-table-24.png");
    owrtChartTableLinkVisible: Observable<boolean> = new Observable<boolean>(false);

    //shared table        
    owrtTableHdrName: Observable<string> = new Observable<string>("");
    owrtTableHdrValue: Observable<string> = new Observable<string>("");
    owrtTableData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}    

    //projects table
    owrtChartProjectsVisible: Observable<boolean> = new Observable<boolean>(true);
    owrtTableProjectsVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtTableProjectsHeader: Observable<string> = new Observable<string>("");
    owrtTableProjectsValue: Observable<string> = new Observable<string>("");
    owrtTableProjectsData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}    

    //funding table
    owrtChartFundsVisible: Observable<boolean> = new Observable<boolean>(true);

    owrtTableFundsVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtTableFundInvestByYearVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtTableFundInvestByActByYearVisible: Observable<boolean> = new Observable<boolean>(false);

    owrtTableFundsHeader: Observable<string> = new Observable<string>("");
    owrtTableFundsValue: Observable<string> = new Observable<string>("");
    owrtTableFundsData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}    

    //results table
    owrtChartResultsVisible: Observable<boolean> = new Observable<boolean>(true);
    owrtTabletResultsVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtTabletResultsHeader: Observable<string> = new Observable<string>("");
    owrtTabletResultsValue: Observable<string> = new Observable<string>("");
    owrtTabletResultsData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}

    //funding invest by year table
    owrtTableDataFundInvestByYear: ObservableCollection<object> = new ObservableCollection<object>(null); //{"year:0,"cash":0,"inkind":0}    

    //funding invest by act by year table
    owrtTableDataFundInvestByActByYear: ObservableCollection<object> = new ObservableCollection<object>(null); //{"year:0,"combined":0,"upland":0,"instream":0.....etc}    
                        
    //overview
    areaPanelOverviewVisisble: Observable<boolean> = new Observable<boolean>(true);
    areaTotalProjects: Observable<string> = new Observable<string>("0");
    areaTotalInvestment: Observable<string> = new Observable<string>("0");
    tabOverviewClass: Observable<string> = new Observable<string>("oeOWRTAreaTabEnabled");
    areaMapLegend: Observable<string> = new Observable<string>("Map");
    areaMaxLayersToLoad: number;
    ranksVisible: Observable<boolean> = new Observable<boolean>(false);

    fsRankingsCount: esri.tasks.FeatureSet;
    fsRankingsInvestment: esri.tasks.FeatureSet;
    rankingsCount: any = [];
    rankingsInvestment: any = [];
    
    //projects    
    projectsTabProcessed: boolean = false;

    projectChartActive: string;
    projectChart: any;
    projectChartLegendText: Observable<string> = new Observable<string>("");
    projectChartYearDefs: any;
    projectChartYearData: object[];
    projectChartActDefs: any;
    projectChartActData: object[];
    areaPanelProjectsVisisble: Observable<boolean> = new Observable<boolean>(false);
    tabProjectsClass: Observable<string> = new Observable<string>("");
    oeOWRTProjChartYearClass: Observable<string> = new Observable<string>("oeOWRTAreaChartSelectionBoxSelected");
    oeOWRTProjChartActivityClass: Observable<string> = new Observable<string>("");
    
    //funding
    fundingTabProcessed: boolean = false;

    totalInvestedCash: number;
    totalInvestedInkind: number;

    fundingChartTotalDefs: any;
    fundingChartTotalData: object[];
        
    fundingChartByYearDefs: any;
    fundingChartByYearData: object[]; //{"year:0,"cash":0,"inkind":0}
        
    fundingChartByActivityDefs: any; 
    fundingChartByActivityData: object[]; //{"activity:"","count":""}
        
    fundingChartByActivityYearDefs: any;
    fundingChartByActivityYearData: object[]; //{"activity:"","total":0,year:0}
        
    fundingChartBySourceDefs: any;
    fundingChartBySourceData: object[]; //{"source:"","total":0}

    areaPanelFundingVisisble: Observable<boolean> = new Observable<boolean>(false);
    tabFundingClass: Observable<string> = new Observable<string>("");

    fundingChartActive: string;
    fundingChart: any;
    fundingChartLegendText: Observable<string> = new Observable<string>("");

    oeOWRTFundingChartTotalClass: Observable<string> = new Observable<string>("oeOWRTAreaChartSelectionBoxSelected");
    oeOWRTFundingChartYearClass: Observable<string> = new Observable<string>("");
    oeOWRTFundingChartActivityClass: Observable<string> = new Observable<string>("");
    oeOWRTFundingChartActivityYearClass: Observable<string> = new Observable<string>("");
    oeOWRTFundingChartSourceClass: Observable<string> = new Observable<string>("");

    //results
    resultsTabProcessed: boolean = false;

    areaPanelResultsVisisble: Observable<boolean> = new Observable<boolean>(false);
    tabResultsClass: Observable<string> = new Observable<string>("");

    resultsTableData: ObservableCollection<object> = new ObservableCollection<object>(null);

    resultsChartActive: string;
    resultsChart: any;
    resultsChartLegendText: Observable<string> = new Observable<string>("");
    resultsFieldSetVisible: Observable<boolean> = new Observable<boolean>(false);

    oeOWRTResultsChartCrossingsClass: Observable<string> = new Observable<string>("");
        
    initialize(config: any): void {

        var site = (<any>this).app.site;

        this.reportMapServiceName = config.reportMapServiceName || "OWRT";

        if (site && site.isInitialized) {
            this._onSiteInitialized();
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized();
            });
        }                   
    }
        
    deactivated() {
        this._destoryActiveChart();

        //remove all map layers
        if (!this._IsNullOrEmpty(this.esriMap))
            this.esriMap.removeAllLayers();
    }
    
    _onSiteInitialized() {
        
        //register tagging command
        this.app.commandRegistry.command("oeOWRTareaReport").register(this, this.OpenAreaReport);
                
        Chart.prototype.initialize();
        
        //set default year selection
        let dateTmp = new Date();
        let workingYear: number = dateTmp.getFullYear();
        if (workingYear > this.endYearDefault)
            workingYear = this.endYearDefault;

        this.startYearDefault = workingYear - 5;

        this._injectScript();
        //this._SetupJQueryTableSort();
                                
        // Register our custom JSON data adapter with the charting infrastructure.
        let jsonDataAdapter = new OE_ChartPointJsonAdapter();
        let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
        ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);
                                
        let mService = this._GetServiceByName(this.reportMapServiceName);
        this.urlMainMapService = mService.serviceUrl;
        this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "Poly_Centroids").id);
        this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Poly_Centroids").id;
        this.queryCentroidsSimple = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "CentroidsSimple").id;
                        
        this.queryUrlCounty = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Counties").id;
        this.queryUrlBasins = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Plan Basins").id;
        this.queryUrlHUC8 = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "8-Digit Hydrologic Unit Code").id;
        this.queryUrlWSC = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Watershed Councils").id;

        this.queryUrlActivityTypes = mService.serviceUrl + "/";
        this.queryUrlActivityTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "ACTIVITY_TYPES"))) ? "20" : this._GetTableIDByName(mService, "ACTIVITY_TYPES").id;
        console.log("ACTIVITY_TYPES: " + this.queryUrlActivityTypes);

        mService = this._GetServiceByName("Soil and Water Conservation District Boundaries (WM)");
        this.urlSWCDMapService = mService.serviceUrl;
        this.queryUrlSWCD = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Soil and Water Conservation District Boundaries (WM)").id;

        //create the map symbol
        this.esriMapSymbolFill = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new esri.Color([255, 0, 0]), 2),
                new esri.Color([255, 0, 0, 0.35])
        );

        //geotype selection list
        this.geoTypeList.clear();
        this.geoTypeList.addItems(
            [
                { "name": "State", "value": "state" },
                { "name": "OWEB Reporting Basin", "value": "basin" },
                { "name": "Subbasin", "value": "subbasin" },
                { "name": "County", "value": "county" }                
            ]
        );

        //{ "name": "Watershed Council", "value": "wsc" },
        //{ "name": "Soil & Water Conservation District", "value": "swcd" }
                
        //get the OWRT drawing color data
        var requestHandle = esri.request({
            "url": this.queryCentroidsSimple + "?f=json",            
            handleAs: "json",
            callbackParamName: "callback"
        });
        requestHandle.then(
            (response, io) => {
                //console.log(response);
                if (response && response.drawingInfo && response.drawingInfo.renderer && response.drawingInfo.renderer.uniqueValueInfos)
                {
                    this.owrtActivitySymbols = response.drawingInfo.renderer.uniqueValueInfos;
                }
            },
            (error, io) => {
                console.log("OWRT symbol request error: "+error);
                this.owrtActivitySymbols = [];
            }
        );
    }

    _injectScript() {
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/jqueryTableSort.js",
            dataType: "script",
            success: function () {
                //console.log('success!');
            },
            error: function (err) {
                //console.log('fail', err);
            }
        });
    }

    //private _SetupJQueryTableSort()
    //{
    //    /*
    //         A simple, lightweight jQuery plugin for creating sortable tables.
    //         https://github.com/kylefox/jquery-tablesort
    //         Version 0.0.11
    //     */
    //    !function (t) { t.tablesort = function (e, s) { var i = this; this.$table = e, this.$thead = this.$table.find("thead"), this.settings = t.extend({}, t.tablesort.defaults, s), this.$sortCells = this.$thead.length > 0 ? this.$thead.find("th:not(.no-sort)") : this.$table.find("th:not(.no-sort)"), this.$sortCells.on("click.tablesort", function () { i.sort(t(this)) }), this.index = null, this.$th = null, this.direction = null }, t.tablesort.prototype = { sort: function (e, s) { var i = new Date, n = this, o = this.$table, l = o.find("tbody").length > 0 ? o.find("tbody") : o, a = l.find("tr").has("td, th"), r = a.find(":nth-child(" + (e.index() + 1) + ")").filter("td, th"), d = e.data().sortBy, h = [], c = r.map(function (s, i) { return d ? "function" == typeof d ? d(t(e), t(i), n) : d : null != t(this).data().sortValue ? t(this).data().sortValue : t(this).text() }); 0 !== c.length && (this.index !== e.index() ? (this.direction = "asc", this.index = e.index()) : "asc" !== s && "desc" !== s ? this.direction = "asc" === this.direction ? "desc" : "asc" : this.direction = s, s = "asc" == this.direction ? 1 : -1, n.$table.trigger("tablesort:start", [n]), n.log("Sorting by " + this.index + " " + this.direction), n.$table.css("display"), setTimeout(function () { n.$sortCells.removeClass(n.settings.asc + " " + n.settings.desc); for (var o = 0, d = c.length; o < d; o++)h.push({ index: o, cell: r[o], row: a[o], value: c[o] }); h.sort(function (t, e) { return n.settings.compare(t.value, e.value) * s }), t.each(h, function (t, e) { l.append(e.row) }), e.addClass(n.settings[n.direction]), n.log("Sort finished in " + ((new Date).getTime() - i.getTime()) + "ms"), n.$table.trigger("tablesort:complete", [n]), n.$table.css("display") }, c.length > 2e3 ? 200 : 10)) }, log: function (e) { (t.tablesort.DEBUG || this.settings.debug) && console && console.log && console.log("[tablesort] " + e) }, destroy: function () { return this.$sortCells.off("click.tablesort"), this.$table.data("tablesort", null), null } }, t.tablesort.DEBUG = !1, t.tablesort.defaults = { debug: t.tablesort.DEBUG, asc: "sorted ascending", desc: "sorted descending", compare: function (t, e) { return t > e ? 1 : t < e ? -1 : 0 } }, t.fn.tablesort = function (e) { var s, i; return this.each(function () { s = t(this), i = s.data("tablesort"), i && i.destroy(), s.data("tablesort", new t.tablesort(s, e)) }) } }((<any>window).Zepto || (<any>window).jQuery);                
    //}
    
    private _GetServiceByName(name: string): MapService {

        let mService = this.app.site.essentialsMap.mapServices.filter((ms: MapService) => ms.displayName == name).length > 0 ?
            this.app.site.essentialsMap.mapServices.filter((ms: MapService) => ms.displayName === name)[0] : null;

        return mService;
    }

    private _GetLayerIDByName(mService:MapService, name:string): Layer {

        let workLayer = mService.layers.filter((ly: Layer) => ly.name == name).length > 0 ?
            mService.layers.filter((ly: Layer) => ly.name === name)[0] : null;

        return workLayer;
    }

    private _GetTableIDByName(mService: MapService, name: string): Layer {

        let workLayer = null;

        try {
            workLayer = mService.tables.filter((ly: Layer) => ly.name == name).length > 0 ?
                mService.tables.filter((ly: Layer) => ly.name === name)[0] : null;
        }
        catch(e){}

        return workLayer;
    }

    private _GetFieldByTypeID(featureSet: esri.tasks.FeatureSet, idFieldName:string, idTarget:string, valueFieldName:string): string
    {
        for (let i = 0; i < featureSet.features.length; i++) {
            if (featureSet.features[i].attributes[idFieldName] &&
                featureSet.features[i].attributes[valueFieldName] && 
                featureSet.features[i].attributes[idFieldName] == idTarget)
                return featureSet.features[i].attributes[valueFieldName];
        }

        return "";
    }

    private _NewSequence(onComplete:any)
    {
        //clear tasks
        this.sequenceTasks = [];
        this.sequenceErrors = "";
        this.sequenceOnComplete = onComplete;
    }
    

    private _MoveCurrentSequenceProgress()
    {
        var workingThis = this;

        if (typeof workingThis["modelRef"] !== "undefined" && workingThis["modelRef"] != null)
            workingThis = workingThis["modelRef"];

        //remove any events to the last query task
        if (typeof this.sequenceLastTask != "undefined" && this.sequenceLastTask != null)
        {
            if (typeof this.sequenceLastTask.listeners != "undefined" && this.sequenceLastTask.listeners != null)
            {
                for (let i = 0; i < this.sequenceLastTask.listeners.length; i++)
                    this.sequenceLastTask.listeners[i].remove();
            }
        }

        if (workingThis.sequenceTasks.length > 0)
        {
            var sTask = workingThis.sequenceTasks.pop();
            this.sequenceLastTask = sTask;

            if (sTask.largeRequest != null)
                sTask.largeRequest.StartRequest();
            else if (sTask.isRelationshipsQuery)
                sTask.queryTask.executeRelationshipQuery(sTask.query);
            else if (sTask.isIDQuery)
                sTask.queryTask.executeForIds(sTask.query);
            else if (sTask.isCountQuery)
                sTask.queryTask.executeForCount(sTask.query);
            else
                sTask.queryTask.execute(sTask.query);                        
        }
        else
        {
            if (workingThis.sequenceOnComplete) {
                workingThis.sequenceOnComplete();                
            }
        }

    }

    private _sequenceQueryLarge(queryURL: string, where: string, queryGeometry: esri.geometry.Geometry, outFields: string[], targetFeatureSet: string, logName: string, getGeometry: boolean = false, isDistinct:boolean = false) {

        var largeRequest = new OE_LargeRecordRequest();
        largeRequest.SetupRequest(queryURL, where, queryGeometry, outFields, logName, this._MoveCurrentSequenceProgress, this, targetFeatureSet, isDistinct);
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(null,null,[],false,false,false,largeRequest));
    }

    private _sequenceQuery(queryString: string, where: string, outFields: string[], targetString: string, attString: string, logName: string, getGeometry: boolean = false,
        returnDistinctValues: boolean = false, orderByFields: string[] = null, outStats: esri.tasks.StatisticDefinition[] = null, returnIDsOnly: boolean = false,
        isCountQuery: boolean = false, addToFeatureSet: boolean = false, statsGroup:string[] = null) {

        var myModel: OE_OWRTReportsAreaViewModel = this;

        var query = new esri.tasks.Query();
        query.where = where;
        query.outFields = outFields;
        query.returnGeometry = getGeometry;        
        query.returnDistinctValues = returnDistinctValues;        
        if (orderByFields != null)
            query.orderByFields = orderByFields;
        if (outStats != null)
            query.outStatistics = outStats;
        if (statsGroup != null)
            query.groupByFieldsForStatistics = statsGroup;
                
        var queryTask = new esri.tasks.QueryTask(queryString);
        let onSuccess;

        if (isCountQuery)
        {
            onSuccess = queryTask.on("execute-for-count-complete", (results: any) => {

                if (!myModel._IsNullOrEmpty(results.count))
                    myModel[targetString][attString] = results.count;
                else
                    myModel[targetString][attString] = 0;

                this._MoveCurrentSequenceProgress();
            });
        }
        else
        {
            onSuccess = queryTask.on("complete", (results: any) => {

                if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {

                    if ($.isArray(myModel[targetString]))
                        (<any>myModel[targetString]).push(results.featureSet);
                    if (!this._IsNullOrEmpty(attString) && attString != "")
                        myModel[targetString][attString] = results.featureSet;
                    else {                                           

                        if (results.featureSet.features.length == 1000)
                        {
                            console.log("Possible query limit hit! " + queryString + " :: " + where);
                        }

                        if (addToFeatureSet)
                            myModel[targetString].features = myModel[targetString].features.concat(results.featureSet.features);
                        else
                            myModel[targetString] = results.featureSet;
                        
                    }
                }
                else {
                    this.sequenceErrors += logName + " Complete: Empty object or no results.";
                }

                this._MoveCurrentSequenceProgress();

            });
        }
        
        var onError = queryTask.on("error", (results: any) => {
            this.sequenceErrors += logName + " Error: " + results.error;

            this._MoveCurrentSequenceProgress();
        });
                
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, [onSuccess, onError], false, returnIDsOnly, isCountQuery));
    }

    private _sequenceRelationshipQuery(queryURL: string, objectIDs: number[], relationshipID: number, outFields: string[], targetFeatureSet: string, logName: string, resetTargetFeatureSet: boolean = true, definitionExpressionIn: string = "") {

        var myModel: OE_OWRTReportsAreaViewModel = this;
        
        var query = new esri.tasks.RelationshipQuery();
        query.objectIds = objectIDs;        
        query.returnGeometry = false;
        query.relationshipId = relationshipID;        
        query.outFields = outFields;
        query.definitionExpression = definitionExpressionIn;
                
        let queryTask = new esri.tasks.QueryTask(queryURL);
        var onSuccess = queryTask.on("execute-relationship-query-complete", (results: any) => {
                        
            if (results && typeof results.featureSets != "undefined" && results.featureSets != null) {
                
                if (resetTargetFeatureSet)
                    myModel[targetFeatureSet] = new esri.tasks.FeatureSet();

                for (let i = 0; i < query.objectIds.length; i++)
                {
                    let workingID = query.objectIds[i];
                    if (results.featureSets.hasOwnProperty(workingID))
                        myModel[targetFeatureSet].features = myModel[targetFeatureSet].features.concat(results.featureSets[workingID].features);                    
                }                                
                
            }
            else {
                this.sequenceErrors += logName + " Complete: Empty object or no results.";
            }

            this._MoveCurrentSequenceProgress();

        });
                
        var onError = queryTask.on("error", (results: any) => {
            this.sequenceErrors += logName + " Error: " + results.error;

            this._MoveCurrentSequenceProgress();
        });
                
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, [onSuccess, onError], true));                
    }
        
    private _GetRequredFeatureSets() {
        
        //clear tasks
        this.sequenceTasks = [];

        //setup a new sequence        
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._RequiredFeatureSetsDone; //when the follow sequence of queries are done build the relationships
                
        this._sequenceQuery(this.queryUrlBasins, "1=1", ["oweb_name"], "fsBasins","", "Basins");
        this._sequenceQuery(this.queryUrlHUC8, "1=1", ["name,huc8"], "fsHUC8", "", "HUC8");
        this._sequenceQuery(this.queryUrlCounty, "1=1", ["name10"], "fsCounty", "","Counties");
        this._sequenceQuery(this.queryUrlWSC, "1=1", ["instname"], "fsWSC", "", "WSC");
        this._sequenceQuery(this.queryUrlSWCD, "1=1", ["SWCD_Name"], "fsSWCD", "", "SWCD");
                
        //types
        this._sequenceQuery(this.queryUrlActivityTypes, "1=1", ["activity_type"], "fsActivityTypeStrings", "", "Activity Type Strings", false, true, ["activity_type"]);

        this._MoveCurrentSequenceProgress();
    }

    private _RequiredFeatureSetsDone() {
      
        this.requiredFeaturesLoaded.set(true);
        
        if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
            this._LoadReportFromURLParams();
        else
            this.ReportOptionsSubmission();
    }

    private _BuildNewReport() {
                
        //this.reportWorkingQuery = whereIn;
        this.fsSelectedAreaGeometry = null;

        //geometry is needed to query the main records set (basin, county, wsc, swcd)
        if (this.geoTypeGeometryLayerDef.get() != "") {            
            this._GetReportGeometry();
        }
        else
        {
            this._GetReportFeatureSets();
        }
    }

    private _GetReportFeatureSets() {
        
        //clear tasks
        this.sequenceTasks = [];

        //setup a new sequence        
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._GetReportFeatureSetsDone; //when the follow sequence of queries are done build the relationships
        
        this.selectedAreaGeometry = null;
        var queryGeometry: esri.geometry.Geometry = null;

        if (!this._IsNullOrEmpty(this.customGeometry))
        {
            this.selectedAreaGeometry = this.customGeometry;
            queryGeometry = this.customGeometry;

            this.customGeometry = null;
        }
        else if (this.fsSelectedAreaGeometry != null) {
            queryGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
            this.selectedAreaGeometry = <esri.geometry.Polygon>this.fsSelectedAreaGeometry.features[0].geometry;        
        }

        let whereIn = this.primaryQueryString.get();

        this._sequenceQueryLarge(this.queryUrlOWRT, whereIn, queryGeometry,
            ["OBJECTID", "project_nbr"],
            "graphicsArrayPrimaryRecords", "Poly Projects", false);
                
        this._MoveCurrentSequenceProgress();
    }
        
    private _GetReportGeometry() {              
        //clear tasks
        this.sequenceTasks = [];
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._GetReportGeometryDone;
        this._sequenceQuery(this.selectedAreaQueryUrl, this.geoTypeGeometryLayerDef.get(), ["OBJECTID"], "fsSelectedAreaGeometry", "", "Geometry Query", true);
        this._MoveCurrentSequenceProgress();
    }

    private _GetReportGeometryDone() {
        this._GetReportFeatureSets();
    }

    private _GetReportFeatureSetsDone() {
                    
        this._GetReportJSONSets(this._OWEBOverviewReady, [0]);
        this._GetReportJSONSets(this._OWEBProjectsReady, [1, 2]);
        this._GetReportJSONSets(this._OWEBFundsReady, [3]);
        this._GetReportJSONSets(this._OWEBResultsReady, [4]);        
    }
    
    private _GetReportJSONSets(onComplete:any, indexesToLoad:number[]): void
    {                   
        let d = new Date();
        console.log("Start OWEB Request: " + d);

        let proxyUrl = "proxy.ashx?";

        let reportTypes = [
            { "t": "Project_Totals", "r": "owebResults_project_Totals", "v": "getOWRI_Report_Project_Totals" },
            { "t": "Project_Year", "r": "owebResults_project_Year", "v":"getOWRI_Report_Projects_Year" },
            { "t": "Project_Type_Year_Funding", "r": "owebResults_project_Type_Year_Funding", "v":"getOWRI_Report_Project_Type_Year_Funding" },            
            { "t": "Funding_Source", "r": "owebResults_funding_Source", "v": "getOWRI_Report_Funding_Source_Type_Year" },
            { "t": "Results", "r": "owebResults_results", "v": "getOWRI_Report_Results_Year" }
        ];
        //{ "t": "Ranking", "r": "ranking", "v":"getOWRI_Report_Ranking" }

        //clear data
        for (let i = 0; i < reportTypes.length; i++) {
            this[reportTypes[i].r] = [];
        }            

        //reset request counts
        this.owebRequestsCount = indexesToLoad.length;
        this.owebRequestsDone = 0;
        this.owebRequestsErrors = null;
                        
        let urlBase = "https://apps.wrd.state.or.us/apps/oweb/owrio_api/api/owriproject/GetProjectReports";
        
        //build years string
        let sYear: number = Number(this.startYear.get());
        let eYear: number = Number(this.endYear.get()) + 1;
        let strYears = null;

        for (let i = sYear; i < eYear;i++)
        {
            if (this._IsNullOrEmpty(strYears))
                strYears = i.toString();
            else
                strYears += "," + i.toString();
        }

        console.log("Years to query: " + strYears);

        let strGeoType = this.geoTypeValue.get();
        let strExtent = this.areaNameSelected.get();

        //json request requires an extent of state for geotype of state.
        if (strGeoType == "state")
            strExtent = "state";
        //else if ((strGeoType) == "subbasin")
        //    strExtent = HUC8;
                                        
        let reportThis = this;
                
        for (let i = 0; i < indexesToLoad.length; i++)
        {
            let reportToLoad = reportTypes[indexesToLoad[i]];

            let requestURL = proxyUrl + urlBase + "?strYears=" + strYears + "&strGeoType=" + strGeoType + "&strExtent=" + strExtent + "&sReportType=" + reportToLoad.t;

            console.log("Request: " + requestURL);

            var jqxhr = $.get(requestURL)
                .done(function (data) {
                    console.log("Success: " + requestURL);
                    reportThis[reportToLoad.r] = data;
                    reportThis.owebRequestsDone += 1;
                    reportThis._JSONSetsDone(onComplete);
                })
                .fail(function (error) {
                    console.log("Failed: " + requestURL);

                    if (reportThis._IsNullOrEmpty(reportThis.owebRequestsErrors))
                        reportThis.owebRequestsErrors = "Failed request: " + requestURL + "  \n";
                    else
                        reportThis.owebRequestsErrors += "Failed request: " + requestURL + "  \n";

                    reportThis.owebRequestsDone += 1;
                    reportThis._JSONSetsDone(onComplete);
                });
        }        
    }

    private _OWEBOverviewReady(fromThis: any): void {
        fromThis._OWEBOverviewProcess();
    }

    private _OWEBOverviewProcess(): void {

        //Totals
        this.areaTotalInvestment.set("$0");
        this.areaTotalProjects.set("0");
        //total investment in projects        
        this.fundingChartTotalData = [{ "cash": 0, "inkind": 0 }];

        if (!this._IsNullOrEmpty(this.owebResults_project_Totals))
        {
            let jTotals: any = JSON.parse(this.owebResults_project_Totals);

            if (!this._IsNullOrEmpty(jTotals) && !this._IsNullOrEmpty(jTotals.getOWRI_Report_Project_Totals[0]))
            {
                jTotals = jTotals.getOWRI_Report_Project_Totals[0];

                //area totals
                if (!this._IsNullOrEmpty(jTotals.TotalInvestment))
                    this.areaTotalInvestment.set("$" + jTotals.TotalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
                if (!this._IsNullOrEmpty(jTotals.TotalProjects))
                    this.areaTotalProjects.set(jTotals.TotalProjects.toLocaleString('en'));
                //total investment in projects                        
                this.fundingChartTotalData = [{
                    "cash": (!this._IsNullOrEmpty(jTotals.TotalCash)) ? jTotals.TotalCash : 0,
                    "inkind": (!this._IsNullOrEmpty(jTotals.TotalInkind)) ? jTotals.TotalInkind : 0
                }];
            }                        
        }
        
        this.ShowFundingTotal("", true);

        this._toCompleteFundsCheck();

        this._BuildOverview();
    }

    private _OWEBProjectsReady(fromThis: any): void {
        fromThis._OWEBProjectsProcess();
    }

    private _OWEBProjectsProcess(): void {

        //projects by year
        
        this.projectChartYearData = [];
        this.fundingChartByYearData = [];

        if (!this._IsNullOrEmpty(this.owebResults_project_Year))
        {
            let yearTotals: any = JSON.parse(this.owebResults_project_Year);

            if (!this._IsNullOrEmpty(yearTotals.getOWRI_Report_Projects_Year)) {

                //project count by year
                this.projectChartYearData = yearTotals.getOWRI_Report_Projects_Year;
                //funding by year
                this.fundingChartByYearData = yearTotals.getOWRI_Report_Projects_Year;
            }
        }
        
        //projects by activity, funding by activity, funding by activity by year
      
        this.projectChartActData = [];
        this.fundingChartByActivityData = [];
        this.fundingChartByActivityYearData = [];
        
        let fundingByActYearIndex: any = {};

        let sYearNum: number = Number(this.startYear.get());
        let eYearNum: number = Number(this.endYear.get());

        if (!this._IsNullOrEmpty(this.owebResults_project_Type_Year_Funding) && this.owebResults_project_Type_Year_Funding.length > 0)
        {
            let projectTypeDetails:any = null;

            try {
                projectTypeDetails = JSON.parse(this.owebResults_project_Type_Year_Funding);
            }
            catch (e) {
                console.log("Error: "+e);
                console.log("Project Type Year Funding: "+this.owebResults_project_Type_Year_Funding);
            }

            if (!this._IsNullOrEmpty(projectTypeDetails)) {

                for (let stringIndex in projectTypeDetails) {
                    let workingType: any = projectTypeDetails[stringIndex][0];

                    //project count by activity
                    this.projectChartActData.push(workingType);
                    //funding total by activity
                    this.fundingChartByActivityData.push(workingType);
                                        
                    //funding by activity by year
                    for (let year = sYearNum; year <= eYearNum; year++) {
                        
                        if (this._IsNullOrEmpty(fundingByActYearIndex[year])) {
                            fundingByActYearIndex[year] = this.fundingChartByActivityYearData.length;
                            this.fundingChartByActivityYearData.push({ "year": year });
                        }

                        if (this._IsNullOrEmpty(this.fundingChartByActivityYearData[fundingByActYearIndex[year]][workingType.ProjType]))
                            this.fundingChartByActivityYearData[fundingByActYearIndex[year]][workingType.ProjType] = workingType[year];
                    }                                        
                }
            }
        }
        
        /*this.ShowProjectChartYear("", true);
        this.ShowProjectsActivity("", true);        
        this.ShowFundingYear("", true);
        this.ShowFundingActivity("", true);
        this.ShowFundingActivityYear("", true);*/

        this._toCompleteProjectsCheck();
        this._toCompleteFundsCheck();
    }

    private _OWEBFundsReady(fromThis: any): void {
        fromThis._OWEBFundsProcess();
    }

    private _OWEBFundsProcess(): void {

        this.fundingTabProcessed = true;

        //funding source chart data        
        this.fundingChartBySourceData = [];

        if (!this._IsNullOrEmpty(this.owebResults_funding_Source))
        {
            let fundingSource: any = JSON.parse(this.owebResults_funding_Source);

            if (!this._IsNullOrEmpty(fundingSource)) {

                let fundingSourceObject: any = {};

                for (let stringIndex in fundingSource) {
                    let workingObject = fundingSource[stringIndex][0];
                    fundingSourceObject[workingObject.Funding_Source] = workingObject.TotalContribution;
                }

                this.fundingChartBySourceData.push(fundingSourceObject);
            }
        }

        this.ShowFundingSource("", true);                
                
        this._toCompleteFundsCheck();
    }

    private _OWEBResultsReady(fromThis: any): void {
        fromThis._OWEBResultsProcess();
    }

    private _OWEBResultsProcess(): void {

        this.resultsTabProcessed = true;

        let sYearNum: number = Number(this.startYear.get());
        let eYearNum: number = Number(this.endYear.get());
               
        let resultDataSetKeys = {
            "Total number of road/stream crossings improved for fish passage": "resultsCrossingsData",
            "Flow rate of water diverted by screens": "resultsScreensData",
            "Total miles of stream treated (instream activities)": "resultsInstreamMilesData",
            "Total miles of fish habitat made accessible due to road/stream crossing improvements (e.g. improvement or removal of culverts and other structures)": "resultsFishHabitatMilesData",
            "Total linear stream miles treated (riparian activities)": "resultsRiparianMilesData",
            "Total water flow acquired": "resultsWaterflowData",
            "Total acres treated (wetland activities)": "resultsWetlandData",
            "Total acres treated (upland activities)": "resultsUplandData",
            "Total acres treated (riparian activities)": "resultsRiparianData",
            "Total acres treated (estuarine activities)": "resultsEstuarineData"
        }

        this.owebResultChartDataSets = {};
        this.resultsTableData.clear();

        if (!this._IsNullOrEmpty(this.owebResults_results))
        {
            //results tab
            let resultsData: any = JSON.parse(this.owebResults_results);

            if (!this._IsNullOrEmpty(resultsData)) {

                let fundingSourceObject: any = {};

                for (let stringIndex in resultsData) {
                    let workingObject = resultsData[stringIndex][0];

                    this.owebResultChartDataSets[workingObject.Result] = {
                        "unit": workingObject.Unit,
                        "total": workingObject.TotalResult,
                        "chart": workingObject.Result,
                        "name": workingObject.Result,
                        "dataKey": resultDataSetKeys[workingObject.Result]
                    };

                    this._AddOWEBResultsToTable(this.owebResultChartDataSets[workingObject.Result]);

                    this[resultDataSetKeys[workingObject.Result]] = [];

                    //funding by activity by year
                    for (let year = sYearNum; year <= eYearNum; year++) {
                        this[resultDataSetKeys[workingObject.Result]].push({ "year": year, "total": workingObject[year] });
                    }
                }
            }
        }      

        this._toCompleteResultsCheck();
    }

    private _toCompleteProjectsCheck(): void {
        this.toCompleteProjectCurrent++;

        if (this.toCompleteProjectCurrent >= this.toCompleteProject) {
            this.loaderProjectsVisible.set(false);
            this.projectsTabProcessed = true;
            this.loadSpinnerProjects.set(false);

            if (this.activeTab == "projects")
                this.LoadProjectsTab();
        }
    }

    private _toCompleteFundsCheck(): void {
        this.toCompleteFundsCurrent++;

        if (this.toCompleteFundsCurrent >= this.toCompleteFunds) {
            this.loaderFundsVisible.set(false);
            this.fundingTabProcessed = true;
            this.loadSpinnerFunding.set(false);

            if (this.activeTab == "funding")
                this.LoadFundingTab();
        }
    }

    private _toCompleteResultsCheck(): void {
        this.toCompleteResultsCurrent++;

        if (this.toCompleteResultsCurrent >= this.toCompleteResults) {            
            this.loaderResultsVisible.set(false);
            this.resultsTabProcessed = true;
            this.loadSpinnerResults.set(false);

            if (this.activeTab == "results")
                this.LoadResultsTab();
        }
    }
    
    private _JSONSetsDone(onComplete:any): void
    {
        if (this.owebRequestsDone >= this.owebRequestsCount)
        {
            console.log("All data ready.");

            let d = new Date();
            console.log("OWEB Request Done: " + d);

            if (this._IsNullOrEmpty(this.owebRequestsErrors))
            {
                onComplete(this);
            }
            else
            {
                this._OwebJsonRequestErrors();
            }            
        }
    }

    private _OwebJsonRequestErrors(): void
    {        
        this.StopOnErrorMessage(this.owebRequestsErrors);
    }
    
    private _AddOWEBResultsToTable(resultTableObject: any) {
        resultTableObject.total = Math.round(resultTableObject.total);
        resultTableObject.display = (<any>Math.round(resultTableObject.total)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.resultsTableData.addItem(resultTableObject);
    }

    private _ShowOWEBResultChart(chartDataIn: any, seriesName: string, seriesField: string, activeChartString:string): void
    {

        if (!this._IsNullOrEmpty(chartDataIn)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();
                                
                let catValues = [];             
                let dataValues = [];   
                                                       
                for (let i = 0; i < chartDataIn.length; i++) {
                    catValues.push(chartDataIn[i].year);
                    dataValues.push({ "total": Math.round(parseInt(chartDataIn[i].total)) } );
                }

                let rotationAngle = 0;
                if (catValues.length > 8)
                    rotationAngle = -45;
                
                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "line"                        
                    },                   
                    series: [{
                        name: seriesName,
                        type: "line",
                        color: "#4684EE",
                        field: "total",
                        data: dataValues                       
                    }],
                    valueAxis: [{
                        title: { text: seriesName },
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            name: seriesName,
                            rotation: "auto",
                            format: "{0:n0}"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "" },
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: { angle: rotationAngle }
                        }
                    }],
                    tooltip: {
                        visible: true,
                        template: 'Year: #= category # <br /> ' + seriesName +': #= kendo.toString(value,"n0") #'
                    }
                };

                //$(".oeOWRTAreaResultsChart").kendoChart(opts);
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaResultsChart")[0], opts);
            }
        }         
    }
    
    private _BuildOverview(): void
    {        
        //funding data
        this.totalInvestedCash = 0;
        this.totalInvestedInkind = 0;

        let investmentsByYearKey = {};
                        
        this._LoadReport();
    }
                
    private _BuildObjectIDString(workingFS: esri.tasks.FeatureSet): string {
        var objectIDQuery: string = "";

        for (let i = 0; i < workingFS.features.length; i++) {
            if (objectIDQuery != "")
                objectIDQuery += ",";

            objectIDQuery += workingFS.features[i].attributes["OBJECTID"];
        }

        return objectIDQuery;
    }

    private _BuildObjectIDStringFromGraphics(graphics: esri.Graphic[], fieldToUse:string): string {
        var objectIDQuery: string = "";

        for (let i = 0; i < graphics.length; i++) {
            if (objectIDQuery != "")
                objectIDQuery += ",";

            objectIDQuery += graphics[i].attributes[fieldToUse];
        }

        return objectIDQuery;
    }
            
    private _LoadReport() {
                
        //map and overview data
        this._loadEsirMap(null, null, this);       

        this.ranksVisible.set(false);

        //load everything if the selection is smaller
        if (this.geoTypeValue.get() !== "state") {
            this.ranksVisible.set(false);
        }
                                                
        //hide the loader overlay
        this.loaderVisible.set(false);
    }

    private _YearSliderChanged()
    {
        let val = this.yearRangeSlider.value();

        this.startYear.set(val[0].toString());
        this.endYear.set(val[1].toString());

        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }

    private _YearSliderChange(minVal: string, maxVal: string)
    {
        this.startYear.set(minVal);
        this.endYear.set(maxVal);

        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());

        this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
    }

    private _GetGeoTypeNameByValue(valueIn: string): string {

        for (let i = 0; i < this.geoTypeList.getLength(); i++)
        {
            if ((<any>this.geoTypeList.getAt(i)).value.toLowerCase() == valueIn.toLowerCase())
                return (<any>this.geoTypeList.getAt(i)).name;
        }

        return valueIn;
    }

    public OptionsGeoTypeChanged(geoTypeValueIn: string, geoTypeName:string, forceAreaSelection:string = null) {        
        //force the geotype name if there is a matching value
        this.geoTypeName.set(this._GetGeoTypeNameByValue(geoTypeValueIn));

        this.geoTypeValue.set(geoTypeValueIn);

        this.reportAreaListVisible.set(true);
        this.areaNameVisisble.set(true);
                        
        switch (geoTypeValueIn)
        {
            case "basin":
                this.areaNamePointsQueryString.set("UPPER(report_basin) =");
                this.areaNamePolyQueryString.set("UPPER(oweb_name) =");
                this._BuildAreaList(this.fsBasins, "oweb_name", "oweb_name", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlBasins;
                break;
            case "subbasin":
                this.areaNamePointsQueryString.set("UPPER(subbasin_actual) =");
                this.areaNamePolyQueryString.set("UPPER(huc8) =");
                this._BuildAreaList(this.fsHUC8, "name", "huc8", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlHUC8;
                break;
            case "county":
                this.areaNamePointsQueryString.set("UPPER(county) =");
                this.areaNamePolyQueryString.set("UPPER(name10) =");
                this._BuildAreaList(this.fsCounty, "name10", "name10", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlCounty;
                break;
            case "wsc":                
                this.areaNamePointsQueryString.set("");
                this.areaNamePolyQueryString.set("UPPER(instname) =");
                this._BuildAreaList(this.fsWSC, "instname", "instname", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlWSC;
                break;
            case "swcd":
                this.areaNamePointsQueryString.set("");
                this.areaNamePolyQueryString.set("UPPER(SWCD_Name) =");
                this._BuildAreaList(this.fsSWCD, "SWCD_Name", "SWCD_Name", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlSWCD;
                break;
            case "state":
            default:
                this.areaNameVisisble.set(false);
                this.areaNamePolyQueryString.set("");
                this.geoTypeGeometryLayerDef.set("");
                this.areaNameSelected.set("");

                this.areaNamePointsQueryString.set("1=1");
                this.BuildOptionsQuery();

                this.reportAreaList.clear();
                this.reportAreaListVisible.set(false);
                
                break;
        }                                
    }

    private _BuildAreaList(fsIn: esri.tasks.FeatureSet, nameField: string, valueField: string, setValue:string=null)
    {
        this.reportAreaList.clear();

        //sort by field
        fsIn.features.sort((a: any, b: any) => {
            if (a.attributes[nameField] < b.attributes[nameField]) return -1;
            if (a.attributes[nameField] > b.attributes[nameField]) return 1;
            return 0;
        });

        for (let i = 0; i < fsIn.features.length; i++) {

            let workingAttributes = fsIn.features[i].attributes;
            let workingObject = new Object;

            workingObject["name"] = workingAttributes[nameField];                        
            workingObject["value"] = workingAttributes[valueField];

            //set the first value
            if (this.reportAreaList.length() < 1)
                this.OptionsAreaChanged(workingObject["value"],workingObject["name"]);

            this.reportAreaList.addItem(workingObject);
        }        

        //force a selection
        if ( !this._IsNullOrEmpty(setValue,0) )
            this.OptionsAreaChanged(setValue, setValue);
    }

    /*public OptionsYearStartChanged(value:string)
    {
        this.startYear.set(value);
        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }

    public OptionsYearEndChanged(value:string)
    {
        this.endYear.set(value);
        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }*/

    public OptionsAreaChanged(areaValue: string, areaNameIn: string)
    {        
        this.areaName.set(areaNameIn);
        this.areaNameSelected.set(areaValue);
        var searchValue = this.areaNameSelected.get().toUpperCase();

        this.geoTypeGeometryLayerDef.set(this.areaNamePolyQueryString.get() + " '" + searchValue + "'");

        this.BuildOptionsQuery();
    }

    private BuildOptionsQuery() {

        //area name will be used to select geometry outline
        var searchValue = this.areaNameSelected.get().toUpperCase();

        //the primary query is used for selecting geometry, the subbasin name is used, not the huc for selecting geometry
        if (this.geoTypeValue.get() == "subbasin")
            searchValue = this.areaName.get().toUpperCase();

        //query for projects (points)
        let queryString = this.areaNamePointsQueryString.get();
                
        //add area search
        if (typeof searchValue !== "undefined" && searchValue != null && searchValue.length > 0)
        {
            queryString += " '" + searchValue + "'";

            //This basin name is different between the basin layer and the projects layer.  Projects layer has spaces in it....
            queryString = queryString.replace("Owyhee-Malheur".toUpperCase(), "Owyhee - Malheur".toUpperCase());
        }

        //wsc and swcd are selected by geometry only, set query to 1=1
        if (this.geoTypeValue.get() == "wsc" || this.geoTypeValue.get() == "swcd")
            queryString = "1=1";

        queryString += " AND complete_year BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();

        this.primaryQueryString.set(queryString);        
    }

    public CloseChartTableView()
    {
        //this.owrtChartsTableContainerVisible.set(false);
        this.owrtTableLinkText.set("Table View");
        this.owrtTableLinkImg.set("Resources/Images/Icons/paging-control-table-24.png");

        this.HideAllTableViews();
    }

    public HideAllTableViews()
    {
        this.owrtTableProjectsVisible.set(false);

        this.owrtChartsTableSharedVisible.set(false);

        this.owrtTableFundsVisible.set(false);
        this.owrtTableFundInvestByYearVisible.set(false);
        this.owrtTableFundInvestByActByYearVisible.set(false);
    }

    public ToggleOptionsArrow(val:boolean)
    {
        if (val)
            this.optionsImageSrc.set("Resources/Images/Icons/arrow-right-small-24.png");
        else
            this.optionsImageSrc.set("Resources/Images/Icons/arrow-down-small-16.png");         
    }

    public ToggleChartTableView()
    {
        //hide all views first
        //this.HideAllTableViews();

        //if (!this.owrtChartsTableContainerVisible.get()) {
           
            this.owrtTableLinkText.set("Chart View");
            this.owrtTableLinkImg.set("Resources/Images/Icons/charting-24.png");

            if (this.activeTabChartName == "projectsyear")
            {
                if (!this.owrtTableProjectsVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableProjectsHeader.set("Year");
                    this.owrtTableProjectsValue.set("Number of Projects");
                    this.owrtChartProjectsVisible.set(false);
                    this.owrtTableProjectsVisible.set(true);
                                        
                    this.owrtTableProjectsData.clear();
                    for (let i = 0; i < this.projectChartYearData.length; i++) {
                        this.owrtTableProjectsData.addItem({
                            "name": (<any>this.projectChartYearData[i]).Year,
                            "value": (<any>this.projectChartYearData[i]).TotalProjects,
                            "data-sort-value": isNaN(parseInt((<any>this.projectChartYearData[i]).TotalProjects)) ? 0 : parseInt((<any>this.projectChartYearData[i]).TotalProjects)
                        });
                    }
                }
                else
                {
                    this.owrtTableProjectsVisible.set(false);
                    this.owrtChartProjectsVisible.set(true);
                    this.CloseChartTableView();
                }
            }            
            else if (this.activeTabChartName == "projectsactivity")
            {

                if (!this.owrtTableProjectsVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableProjectsHeader.set("Project Types");
                    this.owrtTableProjectsValue.set("Number of Projects");
                    this.owrtChartProjectsVisible.set(false);
                    this.owrtTableProjectsVisible.set(true);

                    this.owrtTableProjectsData.clear();
                    for (let i = 0; i < this.projectChartActData.length; i++) {
                        this.owrtTableProjectsData.addItem({
                            "name": (<any>this.projectChartActData[i]).ProjType,
                            "value": (<any>this.projectChartActData[i]).NumProj,
                            "data-sort-value": isNaN(parseInt((<any>this.projectChartActData[i]).NumProj)) ? 0 : parseInt((<any>this.projectChartActData[i]).NumProj)
                        });
                    }
                }
                else
                {
                    this.owrtTableProjectsVisible.set(false);
                    this.owrtChartProjectsVisible.set(true);
                    this.CloseChartTableView();
                }      
                
            }                        
            else if (this.activeTabChartName == "fundingtotal") {

                if (!this.owrtTableFundsVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableFundsHeader.set("Contribution Types");
                    this.owrtTableFundsValue.set("Total Investment");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);
                    
                    this.owrtTableFundsData.clear();
                    this.owrtTableFundsData.addItem({
                        "name": "Cash",
                        "value": "$" + Number((<any>this.fundingChartTotalData[0]).cash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt((<any>this.fundingChartTotalData[0]).cash)) ? 0 : parseInt((<any>this.fundingChartTotalData[0]).cash)
                    });
                    this.owrtTableFundsData.addItem({
                        "name": "Inkind",
                        "value": "$" + Number((<any>this.fundingChartTotalData[0]).inkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt((<any>this.fundingChartTotalData[0]).inkind)) ? 0 : parseInt((<any>this.fundingChartTotalData[0]).inkind)
                    });
                }
                else
                {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }                                   
                
            }    
            else if (this.activeTabChartName == "fundingactivity") {

                if (!this.owrtTableFundsVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableFundsHeader.set("Project Types");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);

                    let totalVal: number = 0;

                    this.owrtTableFundsData.clear();
                    for (let i = 0; i < this.fundingChartByActivityData.length; i++) {

                        this.owrtTableFundsData.addItem({
                            "name": (<any>this.fundingChartByActivityData[i]).ProjType,
                            "value": "$" + Number((<any>this.fundingChartByActivityData[i]).TotalFunding).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "data-sort-value": isNaN(parseInt((<any>this.fundingChartByActivityData[i]).TotalFunding)) ? 0 : parseInt((<any>this.fundingChartByActivityData[i]).TotalFunding)
                        });

                        totalVal += Number((<any>this.fundingChartByActivityData[i]).total);
                    } 
                }
                else {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }       
                
                                               
            }           
            else if (this.activeTabChartName == "fundingsource") {

                if (!this.owrtTableFundsVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);


                    this.owrtTableFundsData.clear();

                    let workingObject: any = this.fundingChartBySourceData[0];

                    let totalVal: number = 0;

                    for (let key in workingObject) {
                        this.owrtTableFundsData.addItem({
                            "name": key,
                            "value": "$" + workingObject[key].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "data-sort-value": isNaN(parseInt(workingObject[key])) ? 0 : parseInt(workingObject[key])
                        });

                        totalVal += Number((<any>workingObject[key]));
                    }
                }
                else {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }       
                   
                                
            }
            else if (this.activeTabChartName == "fundingyear") {

                if (!this.owrtTableFundInvestByYearVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);

                    //this.owrtTableFundsVisible.set(true);
                    this.owrtTableFundInvestByYearVisible.set(true);

                    let totalVal: number = 0;

                    //owrtTableDataFundInvestByYear
                    this.owrtTableFundsData.clear();
                    for (let i = 0; i < this.fundingChartByYearData.length; i++) {

                        this.owrtTableFundsData.addItem({
                            "year": (<any>this.fundingChartByYearData[i]).Year,
                            "cash": "$" + Number((<any>this.fundingChartByYearData[i]).TotalCash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "inkind": "$" + Number((<any>this.fundingChartByYearData[i]).TotalInkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "cashForSort": isNaN(parseInt((<any>this.fundingChartByYearData[i]).TotalCash)) ? 0 : parseInt((<any>this.fundingChartByYearData[i]).TotalCash),
                            "inkindForSort": isNaN(parseInt((<any>this.fundingChartByYearData[i]).TotalInkind)) ? 0 : parseInt((<any>this.fundingChartByYearData[i]).TotalInkind)
                        });

                        totalVal += Number((<any>this.fundingChartByYearData[i]).inkind) + Number((<any>this.fundingChartByYearData[i]).cash);
                    }
                }
                else
                {
                    //this.owrtTableFundsVisible.set(false);
                    this.owrtTableFundInvestByYearVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }  
                                
            }
            else if (this.activeTabChartName == "fundingactivityYear") {


                if (!this.owrtTableFundInvestByActByYearVisible.get()) {

                    this.HideAllTableViews();

                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);

                    //this.owrtTableFundsVisible.set(true);
                    //this.owrtChartsTableFundInvestByActByYearVisible.set(true);
                    this.owrtTableFundInvestByActByYearVisible.set(true);

                    let totalVal: number = 0;

                    //owrtTableDataFundInvestByActByYear
                    this.owrtTableFundsData.clear();
                    for (let i = 0; i < this.fundingChartByActivityYearData.length; i++) {

                        let workingObject = this.fundingChartByActivityYearData[i];
                        let newObject = { "year": workingObject["year"] };

                        //add display and sort values to new object
                        for (let aIndex = 0; aIndex < this.fsActivityTypeStrings.features.length; aIndex++) {
                            let workingAtt = this.fsActivityTypeStrings.features[aIndex].attributes.activity_type;
                            let sortAtt = workingAtt + "Sort";
                            newObject[sortAtt] = workingObject[workingAtt]; //copy raw value into new attribute
                            newObject[workingAtt] = "$" + Math.round(workingObject[workingAtt]).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

                            totalVal += Number((<any>workingObject[workingAtt]));
                        }

                        this.owrtTableFundsData.addItem(newObject);
                    }

                }
                else {
                    //this.owrtTableFundsVisible.set(false);
                    this.owrtTableFundInvestByActByYearVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }  
                                                
            }
            else {
                this.CloseChartTableView();
            }  
        
            
            //show container
            //this.owrtChartsTableContainerVisible.set(true);
        /*}
        else {
            this.CloseChartTableView();
        }*/

    }
        
    public ResetAllTabs() {
        this.tabOverviewClass.set("");
        this.tabProjectsClass.set("");
        this.tabFundingClass.set("");
        this.tabResultsClass.set("");

        this.loaderProjectsVisible.set(false);
        this.loaderFundsVisible.set(false);
        this.loaderResultsVisible.set(false);
                
        this.areaPanelOverviewVisisble.set(false);
        this.areaPanelProjectsVisisble.set(false);
        this.areaPanelFundingVisisble.set(false);
        this.areaPanelResultsVisisble.set(false);
    }

    public LoadOverviewTab() {
        this.ResetAllTabs();
        this.CloseChartTableView();
        this.owrtChartTableLinkVisible.set(false);
        this.tabOverviewClass.set("oeOWRTAreaTabEnabled");
        this.areaPanelOverviewVisisble.set(true);        

        this.activeTab = "overview";
    }

    public LoadProjectsTab() {

        this.ResetAllTabs();
        this.CloseChartTableView();
        this.owrtChartTableLinkVisible.set(true);
        this.tabProjectsClass.set("oeOWRTAreaTabEnabled");
        this.areaPanelProjectsVisisble.set(true);

        this.activeTab = "projects";

        if (!this.projectsTabProcessed) {            
            this.loaderProjectsVisible.set(true);
            return;
        }
         
        this.loaderProjectsVisible.set(false);
        this.projectsTabProcessed = true;
        this.loaderVisible.set(false);

        if (!this.projectChart)
            this.ShowChart("projects", "year");
        else if (!this._IsNullOrEmpty(this.lastProjectTabChartName) && this.lastProjectTabChartName != "") {
            this.activeTabChartName = this.lastProjectTabChartName;
        }
        else {
            this.activeTabChartName = this.projectChartActive;
        }
    }

    private _ProjectTabDataLoaded() {        
        this.LoadProjectsTab();
    }

    public LoadFundingTab() {
        this.ResetAllTabs();
        this.CloseChartTableView();
        this.owrtChartTableLinkVisible.set(true);
        this.tabFundingClass.set("oeOWRTAreaTabEnabled");
        this.areaPanelFundingVisisble.set(true);

        this.activeTab = "funding";

        if (!this.fundingTabProcessed)
        {                        
            this.loaderFundsVisible.set(true);
            return;
        }
        
        this.fundingTabProcessed = true;
        this.loaderFundsVisible.set(false);

        this.loaderVisible.set(false);

        if (!this.fundingChart)
            this.ShowChart("funding", "total");
        else if (!this._IsNullOrEmpty(this.lastFundingTabChartName) && this.lastFundingTabChartName != "") {
            this.activeTabChartName = this.lastFundingTabChartName;
        }
        else {
            this.activeTabChartName = this.fundingChartActive;
        }
    }

    private _FundingTabDataLoaded() {
        this.LoadFundingTab();
    }

    public LoadResultsTab() {
        this.ResetAllTabs();
        this.CloseChartTableView();
        this.owrtChartTableLinkVisible.set(false);
        this.tabResultsClass.set("oeOWRTAreaTabEnabled");
        this.areaPanelResultsVisisble.set(true);

        this.activeTab = "results";

        if (!this.resultsTabProcessed) {            
            this.loaderResultsVisible.set(true);
            return;
        }
        
        this.loaderResultsVisible.set(false);
        this.resultsTabProcessed = true;
        this.loaderVisible.set(false);                
    }

    private _ResultsTabDataLoaded() {
        this.LoadResultsTab();
    }

        
    public ShowProjectChartYear(activeChartString: string, setupOnly: boolean = false)
    {
        if (!setupOnly && !this._IsNullOrEmpty(this.projectChartYearData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();

                let catValues = [];                
                let dataValues = [];
                for (let index in this.projectChartYearData)
                {
                    catValues.push((<any>this.projectChartYearData[index]).Year);
                    dataValues.push((<any>this.projectChartYearData[index]).TotalProjects);
                }

                let rotationAngle = 0;
                if (catValues.length > 10)
                    rotationAngle = -45;

                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "column"                        
                    },
                    series: [{
                        name: "Projects",
                        color: "#4684EE",                
                        data: dataValues
                    }],
                    valueAxis: [{
                        title: { text: "Projects" },
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto",
                            format: "{0:n0}"                            
                        }
                    }],
                    categoryAxis: [{
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: { angle: rotationAngle }                            
                        }
                    }],
                    tooltip: {
                        visible: true,
                        template: 'Year: #= category # <br /> #= series.name #: #= kendo.toString(value,"n0") #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
            }
        }                        
    }

    public ShowProjectsActivity(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.projectChartActData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValues = [];
                for (let index in this.projectChartActData) {
                    catValues.push((<any>this.projectChartActData[index]).ProjType);
                    dataValues.push((<any>this.projectChartActData[index]).NumProj);
                }

                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "bar"
                    },
                    series: [{
                        name: "Activity",
                        color: "#4684EE",
                        data: dataValues
                    }],
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto",
                            format: "{0:n0}"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "Activity" },
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        }
                    }],
                    tooltip: {
                        visible: true,                        
                        template: 'Activity: #= category # <br /> Projects: #= kendo.toString(value,"n0") #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
            }
        }                        
    }

    public ShowFundingTotal(activeChartString: string, setupOnly: boolean=false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartTotalData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();
                
                let total = (<any>this.fundingChartTotalData[0]).cash + (<any>this.fundingChartTotalData[0]).inkind;
                let cash = (<any>this.fundingChartTotalData[0]).cash;
                let inkind = (<any>this.fundingChartTotalData[0]).inkind;
                                
                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    dataSource: {
                        data: [
                            { "name": "Cash", "val": cash, "p": cash / total, color: "#4684EE" },
                            { "name": "Inkind", "val": inkind, "p": inkind / total, color: "#ee6f44" }
                        ]
                    },
                    seriesDefaults: {
                        type: "pie",
                        labels: {
                            visible: true,                          
                            format: "{0:P}",  
                            template: '#= category #: #= kendo.format("{0:P0}",value)#'
                        }
                    },
                    series: [{
                        type: "pie",                        
                        color: "#4684EE",
                        field: "p",
                        categoryField: "name"
                    }],
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "" },
                        categories: [],
                        majorGridLines: {
                            visible: false
                        }
                    }],
                    tooltip: {
                        visible: true,
                        format: "{0:C0}",
                        template: '#= category #: #= kendo.format("{0:P0}",value)# <br /> #= kendo.format("{0:C0}",dataItem.val) #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
            }
        }
    }
        
    public ShowFundingYear(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByYearData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValuesCash = [];
                let dataValuesInkind = [];
                for (let index in this.fundingChartByYearData) {
                    catValues.push((<any>this.fundingChartByYearData[index]).Year);
                    dataValuesCash.push((<any>this.fundingChartByYearData[index]).TotalCash);
                    dataValuesInkind.push((<any>this.fundingChartByYearData[index]).TotalInkind);
                }

                let rotationAngle = 0;
                if (catValues.length > 8)
                    rotationAngle = -45;

                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "column"
                    },
                    series: [{
                        name: "Cash",
                        color: "#4684EE",
                        data: dataValuesCash
                    },
                    {
                        name: "Inkind",
                        color: "#ee6f44",
                        data: dataValuesInkind                      
                    }
                    ],
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto",
                            format: "{0:C0}"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "Year" },
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: { angle: rotationAngle }
                        }
                    }],
                    tooltip: {
                        visible: true,
                        template: 'Year: #= category # <br /> #=series.name#:  #= kendo.format("{0:C0}",value) #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
            }
        }        
    }
          
    private ShowFundingActivity(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByActivityData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValues = [];
                for (let index in this.fundingChartByActivityData) {
                    catValues.push((<any>this.fundingChartByActivityData[index]).ProjType);
                    dataValues.push((<any>this.fundingChartByActivityData[index]).TotalFunding);
                }

                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "bar"
                    },
                    series: [{
                        name: "Activity",
                        color: "#4684EE",
                        data: dataValues
                    }],
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto",
                            format: "{0:C0}"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "Activity" },
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        }
                    }],
                    tooltip: {
                        visible: true,
                        template: 'Activity: #= category # <br /> Total Investment: #= kendo.format("{0:C0}",value) #'
                    }
                };

                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
            }
        }              
    }

    private ShowFundingActivityYear(activeChartString:string, setupOnly:boolean=false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByActivityYearData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();

                let catValues = [];

                let seriesSet = [];
                let seriesObj = { "name": "", "color":"", "data": [] };
                let seriesIndexs = {};

                let workingObj: any;
                for (let index in this.fundingChartByActivityYearData) {

                    workingObj = this.fundingChartByActivityYearData[index];
                    catValues.push(workingObj.year);

                    for (let propIndex in workingObj)
                    {
                        if (propIndex == "year") //skip year property
                            continue;
                                                
                        //create index for this activity type
                        if (this._IsNullOrEmpty(seriesIndexs[propIndex]))
                        {
                            seriesIndexs[propIndex] = seriesSet.length;
                            seriesObj = {
                                "name": propIndex,
                                "color": this._FindActivitySymbolColor(propIndex,false,true),
                                "data": [parseInt(workingObj[propIndex])]
                            };
                            seriesSet.push(seriesObj);
                        }
                        else
                        {
                            seriesSet[seriesIndexs[propIndex]].data.push(parseInt(workingObj[propIndex]));
                        }                                                                                                                        
                    }                    
                }

                let rotationAngle = 0;
                if (catValues.length > 8)
                    rotationAngle = -45;
                               
                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "line"
                    },
                    series: seriesSet,
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto",
                            format: "{0:C0}"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "Year" },
                        categories: catValues,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: { angle: rotationAngle }
                        }
                    }],
                    tooltip: {
                        visible: true,
                        template: 'Year: #= category # <br /> #= series.name #: #= kendo.format("{0:C0}",value) #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
            }
        }              
    }

    private ShowFundingSource(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartBySourceData)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;

                this._destoryActiveChart();
                                
                let dataSets = [];
                let dataObj = { "name": "", "val": 0,"p":0, color: "" };
                                
                let workingColor: any;
                let total: number = 0;

                let colorCount: number = 0;

                for (let propIndex in this.fundingChartBySourceData[0]) {
                    total += this.fundingChartBySourceData[0][propIndex];
                    colorCount++;
                }

                let colorsToUse: any = this._generateRGBArrayFromCount(colorCount, true);
                
                for (let propIndex in this.fundingChartBySourceData[0])
                {
                    workingColor = colorsToUse.pop();

                    dataObj = {
                        "name": propIndex,
                        "val": (<any>this.fundingChartBySourceData[0][propIndex]),
                        "p": (<any>this.fundingChartBySourceData[0][propIndex])/total,
                        "color": workingColor
                        };
                    dataSets.push(dataObj);
                }

                let opts: any = {
                    title: {
                        text: ""
                    },
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    dataSource: {
                        data: dataSets
                    },
                    seriesDefaults: {
                        type: "pie",
                        labels: {
                            visible: true,
                            format: "{0:P1}",
                            template: '#= category #: #= kendo.format("{0:P1}",value)#'
                        }
                    },
                    series: [{
                        type: "pie",
                        color: "#4684EE",
                        field: "p",
                        categoryField: "name"
                    }],
                    valueAxis: [{
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto"
                        }
                    }],
                    categoryAxis: [{
                        title: { text: "" },
                        categories: [],
                        majorGridLines: {
                            visible: false
                        }
                    }],
                    tooltip: {
                        visible: true,
                        format: "{0:C0}",
                        template: '#= category #: #= kendo.format("{0:P1}",value)# <br /> #= kendo.format("{0:C0}",dataItem.val) #'
                    }
                };
                                
                this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
            }
        }        
    }
                
    public OpenAreaReport(pipeParamsIn:string) {

        //geoType: string, geoValue: string, extent: string, years: string
                
        //ModalWindowRegion
        this.app.commandRegistry.command("ActivateView").execute("OE_OWRTReportsAreaView");                  
                
        var thisView = this;
                                                
        //reset variables
        this.primaryQueryString.set("1=1");        
        this.geoTypeGeometryLayerDef.set("");
        this.geoTypeValue.set("state");
        this.areaNameVisisble.set(false);
        this.reportAreaListVisible.set(false);
        this.startYear.set(this.startYearDefault.toString());
        this.endYear.set(this.endYearDefault.toString());
        this.OptionsGeoTypeChanged("state", "State");
        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.resultsFieldSetVisible.set(false);

        this.isCustomReport = false;
        this.customGeometry = null;

        this.loaderProjectsVisible.set(false);
        this.loaderFundsVisible.set(false);
        this.loaderResultsVisible.set(false);

        this.loadSpinnerProjects.set(true);
        this.loadSpinnerFunding.set(true);
        this.loadSpinnerResults.set(true);
        
        this.loaderWarnIcon.set(false);
        this.inputBlockOnError.set(false);
        
        //setup sort table on results tab
        $(".owrtResultsTable").tablesort();
        
        $(".owrtChartTableShared").tablesort();
        $(".owrtChartTableFundInvestByYear").tablesort();
        $(".owrtChartTableFundInvestByActByYear").tablesort();        
                
        if (this._IsNullOrEmpty(this.yearRangeSlider))
        {
            this.yearRangeSlider = new kendo.ui.RangeSlider(document.getElementsByClassName("owrtYearSlider")[0],
                {
                    orientation: "horizontal",
                    min: this.yearMin,
                    max: this.yearMax,
                    smallStep: 1,
                    largeStep: 5,
                    leftDragHandleTitle: "Start Year",
                    rightDragHandleTitle: "End Year",
                    tooltip: { format: "{0:0}" },
                    change: function () {
                        thisView._YearSliderChanged();
                    }
                }
            )            
        }
        else
        {
            //this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
            this._YearSliderChange(this.startYear.get(), this.endYear.get());
        } 
        
        //check for url paramemters, use these later to load this report
        if ( !this._IsNullOrEmpty(pipeParamsIn) )
            this.pipeParamsFromURL = pipeParamsIn;

        if (this.requiredFeaturesLoaded.get())
        {
            //check for pipe params for load
            if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
                this._LoadReportFromURLParams();
            else {
                this.ReportOptionsSubmission();
            }
        }            
        else
            this._GetRequredFeatureSets();
    }

    private _LoadReportFromURLParams() {

        this.isCustomReport = false;
        this.customGeometry = null;

        //check for url paramemters
        if (!this._IsNullOrEmpty(this.pipeParamsFromURL)) {
            
            console.log("Params type: " + (typeof this.pipeParamsFromURL));

            //pipe delimited string
            if (typeof this.pipeParamsFromURL == "string") {

                //decode
                this.pipeParamsFromURL = decodeURIComponent(this.pipeParamsFromURL);

                //geoType | areaType | years
                var paramStrings: string[] = this.pipeParamsFromURL.split("|");

                this.pipeParamsFromURL = null;

                //set years first
                if (!this._IsNullOrEmpty(paramStrings[2], 0)) {

                    var years: string[] = paramStrings[2].split(",");

                    if (years.length > 1) {
                        //this.OptionsYearStartChanged(years[0]);
                        //this.OptionsYearEndChanged(years[years.length - 1]);

                        this._YearSliderChange(years[0], years[years.length - 1]);
                    }
                }
                else {
                    //this.OptionsYearStartChanged(this.yearMin.toString());
                    //this.OptionsYearEndChanged(this.yearMax.toString());

                    this._YearSliderChange(this.yearMin.toString(), this.yearMax.toString());
                }

                //set geotype and areaselection
                if (!this._IsNullOrEmpty(paramStrings[0], 0) && !this._IsNullOrEmpty(paramStrings[1], 0)) {
                    this.geoTypeValue.set(paramStrings[0]);
                    this.OptionsGeoTypeChanged(paramStrings[0], paramStrings[0], paramStrings[1]);
                }
            }
            else if (typeof this.pipeParamsFromURL == "object" && this.pipeParamsFromURL.geometry !== 'undefined' )
            {
                //0 = name
                //1 = geometry

                if (typeof this.pipeParamsFromURL[1] == "string")
                    this.pipeParamsFromURL[1] = JSON.parse(this.pipeParamsFromURL[1]);

                //custom geometry
                this.customGeometry = new esri.geometry.Polygon(this.pipeParamsFromURL[1]); //<esri.geometry.Polygon>esri.geometry.fromJson(this.pipeParamsFromURL["geometry"]);
                
                this.geoTypeName.set("Custom Report");
                this.yearRangeString.set("");

                this.areaName.set(this.pipeParamsFromURL[0]);
                this.areaNameVisisble.set(true);

                this.isCustomReport = true;
                this.pipeParamsFromURL = null;
            }

            this.ReportOptionsSubmission();
        }
                
    }

    private _IsNullOrEmpty(testValue:any,testLength:number = -1):boolean {

        if (typeof testValue === "undefined" || testValue == null)
            return true;

        if (testLength > -1)
            return !(testValue.length > testLength);

        return false;
    }

    public ReportOptionsSubmission() {
                
        //clear all active charts
        this._destoryActiveChart();

        this.loaderWarnIcon.set(false);
        this.inputBlockOnError.set(false);

        this.loaderMessage.set("Loading report...");
        this.loaderVisible.set(true);
        this.loaderSpinner.set(true);
        this.reportOptionsPanelVisible.set(false);

        this.loadSpinnerProjects.set(true);
        this.loadSpinnerFunding.set(true);
        this.loadSpinnerResults.set(true);

        this.resultsFieldSetVisible.set(false);

        this.toCompleteProjectCurrent = 0;
        this.toCompleteFundsCurrent = 0;
        this.toCompleteResultsCurrent = 0;

        //clear chart/table strings
        this.lastFundingTabChartName = null;
        this.lastProjectTabChartName = null;
        this.lastResultsChartName = null;
        this.activeTabChartName = "";
        this.projectChartActive = null;
        this.fundingChartActive = null;
        
        //clear projects tab
        this.projectsTabProcessed = false;        
        this.projectChartActDefs = null;        
        this.projectChartYearDefs = null;        
        
        //clear funding tab
        this.fundingTabProcessed = false;        
        this.fundingChartByActivityDefs = null;        
        this.fundingChartByActivityYearDefs = null;        
        this.fundingChartByYearDefs = null;        
        this.fundingChartBySourceDefs = null;
        
        //clear results tab
        this.resultsTabProcessed = false;

        //change to overview tab
        this.LoadOverviewTab();

        //custom report 
        if (this.isCustomReport)
        {
            this.geoTypeValue.set("custom");            
        }
                  
        this._BuildNewReport();
    }
        
    public StopOnErrorMessage(message: string) {

        this.loaderMessage.set(message);

        this.loaderWarnIcon.set(true);
        this.loaderSpinner.set(false);
        this.inputBlockOnError.set(true);
        this.loaderVisible.set(true);        
    }
        
    private _GetFieldValue(graphic: esri.Graphic, field: string): string {

        if (typeof graphic.attributes[field] === "undefined")
            return "Undefined Field - " + field;

        if (graphic.attributes[field] === null)
            return "Null Field - " + field;
                               
        return graphic.attributes[field];
    }
    
    private _GetDivider(records: object[], targetField: string): number {

        let bigNumber = 0;

        for (let i = 0; i < records.length; i++) {
            if (records[i][targetField] > bigNumber)
                bigNumber = records[i][targetField];
        }

        if (bigNumber > 1000000)
            return 100000;

        if (bigNumber > 100000)
            return 1000;

        return 0;
    }

    private _abbreviateNumber(num, fixed) {
        if (num === null) { return null; } // terminate early
        if (num === 0) { return '0'; } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
            k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
            c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
            d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
            e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
    }
            
    private _destoryActiveChart() {

        //if (!this._IsNullOrEmpty(this.kChartActive) && !this._IsNullOrEmpty(this.kChartActive.destroy) && typeof this.kChartActive.destroy == 'function')
        //    this.kChartActive.destroy();

        try {
            this.kChartActive.destroy();
        }
        catch (e) {}
    }
    
    private _LoadMapLayers() {

        //remove old layers
        if (!this._IsNullOrEmpty(this.esirMapPointLayers))
        {
            for (let i = 0; i < this.esirMapPointLayers.length; i++) {
                this.esriMap.removeLayer(this.esirMapPointLayers[i]);
            }
        }

        //remove old graphics
        this.esriMap.graphics.clear();

        this.esirMapPointLayers = [];
        this.esriMapLayerDefs = [];
        var recordsPerBreak: number = 2500;
        var nextBreak: number = recordsPerBreak;


        //load all points on a single layer?
        if (this.geoTypeValue.get().toLowerCase() == "state") {

            let stateQuery: string = "1=1 AND complete_year BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();
            //let stateQuery: string = "1=1";
            this.esriMapLayerDefs.push(stateQuery);
            this.areaMaxLayersToLoad = this.esriMapLayerDefs.length;
            this._LoadMapLayerNext();

            return;
        }
        
        if (this.isCustomReport) {
            
            this.isCustomReport = false;

            let passThis = this;
            let gsvc = new esri.tasks.GeometryService(this.geoService);
            let proParams = new esri.tasks.ProjectParameters();
            proParams.geometries = [this.selectedAreaGeometry];
            proParams.outSR = new esri.SpatialReference(102100);

            gsvc.project(proParams
                , function (geometries: esri.geometry.Geometry[]) {
                    let customPoly: esri.geometry.Polygon = <esri.geometry.Polygon>geometries[0];
                    passThis.esriMap.graphics.add(new esri.Graphic(customPoly, passThis.esriMapSymbolFill));
                    let gExtent = customPoly.getExtent().expand(2);
                    passThis.esriMap.setExtent(gExtent);
                }
                , function (error:any) {
                    console.log("Projection failed: " + error);
                });
        }
        
        let objectids = "";
                
        for (let i = 0; i < this.graphicsArrayPrimaryRecords.length; i++) {

            if (i == nextBreak)
            {
                objectids = "project_nbr IN (" + objectids + ")";
                this.esriMapLayerDefs.push(objectids);

                nextBreak += recordsPerBreak;                
                objectids = "";
            }

            if (objectids != "")
                objectids += ",";

            objectids += this.graphicsArrayPrimaryRecords[i].attributes["project_nbr"];
        }

        //add last set
        if (!this._IsNullOrEmpty(objectids, 2))
        {
            objectids = "project_nbr IN (" + objectids + ")";
            this.esriMapLayerDefs.push(objectids);
        }

        this.areaMaxLayersToLoad = this.esriMapLayerDefs.length;

        this._LoadMapLayerNext();
    }
    
    private _LoadMapLayerNext()
    {
        if (this._IsNullOrEmpty(this.esriMapLayerDefs) || this.esriMapLayerDefs.length < 1) {
            this.areaMapLegend.set("Map");
            return;
        }

        let defString = this.esriMapLayerDefs.pop();    

        if (this._IsNullOrEmpty(defString))
        {
            this.areaMapLegend.set("Map");
            return;
        }
        
        let defsIn: string[] = [];
        defsIn[this.layerIDProjectPoints] = defString;

        if (this._IsNullOrEmpty(this.esriPointsLayer))
        {            
            let imageParams = new esri.layers.ImageParameters();
            imageParams.layerIds = [this.layerIDProjectPoints];
            imageParams.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
            imageParams.transparent = true;
            imageParams.layerDefinitions = defsIn;

            this.esriPointsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(this.urlMainMapService, { "id": "owrtPoints", "imageParameters": imageParams });
            this.esriPointsLayer.setDisableClientCaching(true);
            this.esriPointsLayer.id = "owrtPoints";

            this.esriMap.reorderLayer(this.esriPointsLayer, 10);
            this.esriMap.addLayer(this.esriPointsLayer);                        

            let d = new Date();
            console.log("Map layer added: " + d);
        }
        else if (!this._IsNullOrEmpty(this.esriPointsLayer))
        {
            (<esri.layers.ArcGISDynamicMapServiceLayer>this.esriMap.getLayer("owrtPoints")).setLayerDefinitions(defsIn);
        }        
    }

    private _loadEsirMap(graphicIn: esri.Graphic, featuresIn: esri.Graphic[], thisView: OE_OWRTReportsAreaViewModel) {

        let d = new Date();
        console.log("Start map render: " + d);
        
        if (typeof this.esriMap == "undefined" || this.esriMap == null)
        {
            this.esriMap = new esri.Map("oeOWRTAreaMap", {
                //center: [44.17432483, -120.5859375],
                center: new esri.geometry.Point(-120.58, 44.17),
                zoom: 6,
                basemap: "streets",
                minZoom: 6,
                slider: true
            });

            var viewThis = this;

            this.esriMap.on("load", function (event: any) {
                                                
                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/27");
                (<esri.Map>event.map).addLayer(featureLayer);

                var modelRef = viewThis;

                //area layer                
                viewThis._GeoTypeLayerToDisplay(viewThis);
                
                //only zoom to map extent if no area layer is present
                if (viewThis.esriAreaLayer == null)
                {
                    viewThis.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);                    
                }
                
                //load all the layers
                viewThis._LoadMapLayers();

                let d = new Date();
                console.log("Map loaded: " + d);
            });                     
        }
        else
        {
            //area layer
            this._GeoTypeLayerToDisplay(this);
            
            if (this.esriAreaLayer == null)
                this.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);

            //load all the layers
            this._LoadMapLayers();
        }
    }
    
    private _GeoTypeLayerToDisplay(viewRef: OE_OWRTReportsAreaViewModel) {

        var viewMap: esri.Map = (<esri.Map>viewRef.esriMap);

        //always remove this layer first
        if (typeof viewRef.esriAreaLayer != "undefined" && viewRef.esriAreaLayer != null)
            viewMap.removeLayer(viewRef.esriAreaLayer);

        switch (this.geoTypeValue.get())
        {
            case "basin":
                viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlBasins);
                break;
            case "subbasin":
                viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlHUC8);
                break;
            case "county":
                viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlCounty);
                break;
            case "wsc":
                viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlWSC);
                viewRef.esriAreaLayer.setOpacity(.50);
                break;
            case "swcd":
                viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlSWCD);
                break;
            case "state":                
            default:     
                viewRef.esriAreaLayer = null;           
                break;
        }

        if (viewRef.esriAreaLayer != null)
        {
            viewRef.esriAreaLayer.setDefinitionExpression(viewRef.geoTypeGeometryLayerDef.get());                        
            viewMap.addLayer(viewRef.esriAreaLayer);
            this.esriMap.reorderLayer(viewRef.esriAreaLayer, 1);

            viewRef.esriAreaLayer.on("load", function (event: any) {
                //use the selected geometry to set extent
                viewRef.esriMap.setExtent(viewRef.selectedAreaGeometry.getExtent().expand(1.4));
            });                  
        }        
    }

    private _ClearFundingClasses() {
        this.oeOWRTFundingChartTotalClass.set("");
        this.oeOWRTFundingChartYearClass.set("");
        this.oeOWRTFundingChartActivityClass.set("");
        this.oeOWRTFundingChartActivityYearClass.set("");
        this.oeOWRTFundingChartSourceClass.set("");
    }

    public ShowChart(workingTab:string, workingChart:string, legendName:string=""): void {

        this.CloseChartTableView();

        this.activeTabChartName = workingTab+workingChart;

        if (workingTab == "projects")
        {
            this.owrtChartProjectsVisible.set(true);

            if (workingChart == "year") {
                this.oeOWRTProjChartYearClass.set("oeOWRTAreaChartSelectionBoxSelected");
                this.projectChartLegendText.set("Number of Projects by Year");
                this.oeOWRTProjChartActivityClass.set("");
                                
                this.ShowProjectChartYear(workingChart);                                
            }
            else if (workingChart == "activity") {
                this.oeOWRTProjChartActivityClass.set("oeOWRTAreaChartSelectionBoxSelected");
                this.projectChartLegendText.set("Number of Projects by Activity Type");
                this.oeOWRTProjChartYearClass.set("");
                                
                this.ShowProjectsActivity(workingChart);                                
            }

            this.lastProjectTabChartName = this.activeTabChartName;
        }
        else if (workingTab == "funding")
        {
            this.owrtChartFundsVisible.set(true);

            if (workingChart == "total") {
                this._ClearFundingClasses();
                this.oeOWRTFundingChartTotalClass.set("oeOWRTAreaChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Total Investment in Projects");                
                this.ShowFundingTotal(workingChart);
            }
            else if (workingChart == "year")
            {
                this._ClearFundingClasses();
                this.oeOWRTFundingChartYearClass.set("oeOWRTAreaChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Year");                
                this.ShowFundingYear(workingChart);
            }
            else if (workingChart == "activity") {
                this._ClearFundingClasses();
                this.oeOWRTFundingChartActivityClass.set("oeOWRTAreaChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Activity");
                this.ShowFundingActivity(workingChart);
            }
            else if (workingChart == "activityYear") {
                this._ClearFundingClasses();
                this.oeOWRTFundingChartActivityYearClass.set("oeOWRTAreaChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Activity By Year");
                this.ShowFundingActivityYear(workingChart);
            }
            else if (workingChart == "source") {
                this._ClearFundingClasses();
                this.oeOWRTFundingChartSourceClass.set("oeOWRTAreaChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Source");
                this.ShowFundingSource(workingChart);
            }            

            this.lastFundingTabChartName = this.activeTabChartName;
        }
        else if (workingTab == "results")
        {
            this.resultsFieldSetVisible.set(true);
            this.resultsChartLegendText.set(legendName);
            
            let workingDataSet:any = this.owebResultChartDataSets[workingChart];
            this._ShowOWEBResultChart(this[workingDataSet.dataKey], workingDataSet.unit, "total", workingDataSet.name);
            
            this.lastResultsChartName = this.activeTabChartName;
        }
    }
    
    private _FindActivitySymbolColor(activityType: string, cssType: boolean = true, toHex:boolean = false): any {

        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        for (let i = 0; i < this.owrtActivitySymbols.length; i++) {
            var valueString = this.owrtActivitySymbols[i].value;

            if (valueString.toLowerCase() == activityType.toLowerCase()) {
                if (cssType) {
                    var colorOut = "background-color: rgb(";

                    //drop off the alpha value for IE support                    
                    var colorArray: Array<number> = this.owrtActivitySymbols[i].symbol.color.slice()
                    colorArray.pop();
                    
                    for (let c = 0; c < colorArray.length; c++) {
                        colorOut += colorArray[c];

                        if (c < colorArray.length - 1)
                            colorOut += ",";
                    }

                    colorOut += ")";

                    return colorOut;
                }
                else {
                    //drop off the alpha value for IE support
                    var colorArray: Array<number> = this.owrtActivitySymbols[i].symbol.color.slice()
                    colorArray.pop();

                    if (toHex)
                        return rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
                    else
                        return colorArray;
                }
            }
        }

        //default color
        if (cssType)
            return "background-color: rgb(255, 99, 71)";
        else
        {
            if (toHex)
                return rgbToHex(255, 99, 71);
            else
                return "rgb(255, 99, 71)";
        }
            
    }

    private _generateRGBArrayFromCount(maxColors: number, asHex:boolean = false) {

        /**
             * HSV to RGB color conversion
             *
             * H runs from 0 to 360 degrees
             * S and V run from 0 to 100
             * 
             * Ported from the excellent java algorithm by Eugene Vishnevsky at:
             * http://www.cs.rit.edu/~ncs/color/t_convert.html
             */
        function hsvToRgb(h, s, v) {
            var r, g, b;
            var i;
            var f, p, q, t;

            // Make sure our arguments stay in-range
            h = Math.max(0, Math.min(360, h));
            s = Math.max(0, Math.min(100, s));
            v = Math.max(0, Math.min(100, v));

            // We accept saturation and value arguments from 0 to 100 because that's
            // how Photoshop represents those values. Internally, however, the
            // saturation and value are calculated from a range of 0 to 1. We make
            // That conversion here.
            s /= 100;
            v /= 100;

            if (s == 0) {
                // Achromatic (grey)
                r = g = b = v;
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }

            h /= 60; // sector 0 to 5
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));

            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;

                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;

                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;

                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;

                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;

                default: // case 5:
                    r = v;
                    g = p;
                    b = q;
            }

            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        };

        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        var colorsOut = [];

        //return a single color
        if (maxColors == 1) {

            if (asHex) {                
                colorsOut.push(rgbToHex(224, 100, 50));
            }
            else
            {
                colorsOut.push([224, 100, 50]);
            }
                        
            return colorsOut;
        }

        // distribute the colors evenly on
        // the hue range (the 'H' in HSV)
        var i = 360 / (maxColors - 1);

        // hold the generated colors        
        var sv = 70;
        let workingRGB;
        for (var x = 0; x < maxColors; x++) {
            // alternate the s, v for more
            // contrast between the colors.
            sv = sv > 90 ? 70 : sv + 10;

            if (asHex)
            {
                workingRGB = hsvToRgb(i * x, sv, sv);
                colorsOut.push(rgbToHex(workingRGB[0], workingRGB[1], workingRGB[2]));
            }
            else
            {
                colorsOut.push(hsvToRgb(i * x, sv, sv));
            }
            
        }

        return colorsOut;
    }    
    
}