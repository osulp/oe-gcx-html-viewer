/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
/// <reference path="./../../_Definitions/dojo.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { MapService } from "geocortex/essentials/MapService";
import { Layer } from "geocortex/essentials/Layer";

import { ChartViewModelFactory } from "geocortex/charting/ChartViewModelFactory";
import { Chart } from "geocortex/charting/Chart";
import { KendoFormatProvider } from "geocortex/charting/globalization/KendoFormatProvider";
import { ChartSeriesProvider } from "geocortex/charting/ChartSeriesProvider";
import { ChartPointAdapterRegistry } from "geocortex/charting/infrastructure/ChartPointAdapterRegistry"
import { ChartPointCollectionAggregator } from "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregator";
import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
import { ChartColorPalette, ChartFeatureType, ChartFieldSourceType } from "geocortex/charting/infrastructure/Enums";

import { OE_ChartPointJsonAdapter } from "../OE_OWRTReports/OE_JsonAdapter";

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
        
    chartPartVisible: Observable<boolean> = new Observable<boolean>(true);
    chartActVisible: Observable<boolean> = new Observable<boolean>(false);
    chartActive: any;
    
    chartFundingActivity: RestChartDefinition = null;
    chartFundingActivityData: any = {}        
    chartFundingPart: RestChartDefinition = null;
    chartFundingPartData: any = {};

    queryUrlOWRT: string;    
    //queryReportPoints: string;
    queryUrlProjectInfo: string;
    queryUrlParts: string;

    urlMainMapService: string;
    layerIDProjectPoints: number;
    urlSWCDMapService: string;
            
    queryUrlCounty: string;
    queryUrlWSC: string;
    queryUrlSWCD: string;
    queryUrlBasins: string;
    queryUrlHUC8: string;
        
    fsBasins: esri.tasks.FeatureSet = null;
    fsHUC8: esri.tasks.FeatureSet = null;
    fsCounty: esri.tasks.FeatureSet = null;
    fsWSC: esri.tasks.FeatureSet = null;
    fsSWCD: esri.tasks.FeatureSet = null;
    fsSelectedAreaGeometry: esri.tasks.FeatureSet = null;    
    fsActivityTypeStrings: esri.tasks.FeatureSet = null;

    fsProjectInfo: esri.tasks.FeatureSet = null;
    fsActivities: esri.tasks.FeatureSet = null;
    fsParticipants: esri.tasks.FeatureSet = null;
    fsResults: esri.tasks.FeatureSet = null;
    fsResultsFishPassage: esri.tasks.FeatureSet = null;
    fsCentroidsForMap: esri.tasks.FeatureSet = null;

    fsPartSuperTypes: esri.tasks.FeatureSet = null;
    fsPartTypes: esri.tasks.FeatureSet = null;
    participantTypeSuperTypeMap: any = {};

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

    toCompleteProject: number = 1;
    toCompleteFunds: number = 3;
    toCompleteResults: number = 1;
    toCompleteProjectCurrent: number = 0;
    toCompleteFundsCurrent: number = 0;
    toCompleteResultsCurrent: number = 0;
                
    selectedAreaGeometry: esri.geometry.Polygon = null;    
    graphicsArrayPrimaryRecords: esri.Graphic[] = null;
    primaryRecordIDSlots: any[] = null;
    projectInfoIDS: any[] = null;
    projectInfoAtts: any[] = null;
        
    queryUrlPartSuperTypes: string;
    queryUrlPartTypes: string;    
    queryUrlActivityTypes: string;
                     
    sequenceTasks: OE_OWRTReportsViewModelSequenceTask[] = [];    
    sequenceErrors: string = "";
    sequenceOnComplete: any = null;
    sequenceLastTask: OE_OWRTReportsViewModelSequenceTask = null;

    largeRequest: OE_LargeRecordRequest;
    owrtActivitySymbols: any[] = [];
    
    //report options    
    pipeParamsFromURL: any;
    reportWorkingQuery: string;
    lastQuery: string;
    isCustomReport: boolean = false;
    customGeometry: esri.geometry.Polygon = null;

    reportOptionsPanelVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaListVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaList: ObservableCollection<object> = new ObservableCollection<object>(null);

    yearMin: number = 1995;
    yearMax: number = 2017;
    startYearDefault: number = 1995;
    endYearDefault: number = 2017;

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
    //projectChartString: string;
    //fundingChartString: string;

    //table data view
    owrtChartsTableContainerVisible: Observable<boolean> = new Observable<boolean>(false);

    owrtChartsTableSharedVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtChartsTableFundInvestByYearVisible: Observable<boolean> = new Observable<boolean>(false);
    owrtChartsTableFundInvestByActByYearVisible: Observable<boolean> = new Observable<boolean>(false);
        
    owrtTableLinkText: Observable<string> = new Observable<string>("Table View");
    owrtTableLinkImg: Observable<string> = new Observable<string>("Resources/Images/Icons/paging-control-table-24.png");
    owrtChartTableLinkVisible: Observable<boolean> = new Observable<boolean>(false);

    //shared table        
    owrtTableHdrName: Observable<string> = new Observable<string>("");
    owrtTableHdrValue: Observable<string> = new Observable<string>("");
    owrtTableData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}    

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
        
    //projectAttributesMap[project_nbr] = projectAttributes;
    projectNbrAttributesMap: object = {};
    //projectIDAttributesMap[project_id] = projectAttributes;
    projectIDAttributesMap: object = {};

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
        
    resultsCrossingsDefs: any;
    resultsCrossingsData: object[]; //{"year:"","total":0}
        
    resultsWaterflowDefs: any;
    resultsWaterflowData: object[];

    resultsScreensDefs: any;
    resultsScreensData: object[];

    resultsFishHabitatMilesDefs: any;
    resultsFishHabitatMilesData: object[];

    resultsRiparianMilesDefs: any;
    resultsRiparianMilesData: object[];

    resultsInstreamMilesDefs: any;
    resultsInstreamMilesData: object[];

    resultsWetlandDefs: any;
    resultsWetlandData: object[];

    resultsUplandDefs: any;
    resultsUplandData: object[];

    resultsRiparianDefs: any;
    resultsRiparianData: object[];

    resultsEstuarineDefs: any;
    resultsEstuarineData: object[];

    
        
    initialize(config: any): void {

        var site = (<any>this).app.site;
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
        this._destroyAllCharts();

        //remove all map layers
        if (!this._IsNullOrEmpty(this.esriMap))
            this.esriMap.removeAllLayers();
    }

    _onSiteInitialized() {
        
        //register tagging command
        this.app.commandRegistry.command("oeOWRTareaReport").register(this, this.OpenAreaReport);

        //set default year selection
        let dateTmp = new Date();
        let workingYear: number = dateTmp.getFullYear();
        if (workingYear > this.endYearDefault)
            workingYear = this.endYearDefault;

        this.startYearDefault = workingYear - 5;

        this._SetupJQueryTableSort();
                                
        // Register our custom JSON data adapter with the charting infrastructure.
        let jsonDataAdapter = new OE_ChartPointJsonAdapter();
        let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
        ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);

        this.initializeChartFactory();                
        
        //let mService = this._GetServiceByName("OWRT");
        let mService = this._GetServiceByName("OWRT_DEV");
        this.urlMainMapService = mService.serviceUrl;
        this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "Poly_Centroids").id);
        //this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "PointsForReport").id);
        //this.queryReportPoints = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "PointsForReport").id;
        //this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "ALL_POLYS_SDE_WM").id;
        this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Poly_Centroids").id;
                        
        this.queryUrlCounty = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Counties").id;
        this.queryUrlBasins = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Plan Basins").id;
        this.queryUrlHUC8 = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "8-Digit Hydrologic Unit Code").id;
        this.queryUrlWSC = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Watershed Councils").id;

        this.queryUrlProjectInfo = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PROJECT_INFO").id;

        this.queryUrlParts = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS").id;
        this.queryUrlPartSuperTypes = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU").id;
        this.queryUrlPartTypes = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU").id;        
        this.queryUrlActivityTypes = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "ACTIVITY_TYPES").id;

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
                { "name": "County", "value": "county" },
                { "name": "Watershed Council", "value": "wsc" },
                { "name": "Soil & Water Conservation District", "value": "swcd" }
            ]
        );

        //this.esriMapSymbol = new esri.symbol.SimpleMarkerSymbol();
        //this.esriMapSymbol.setColor(new esri.Color([0, 255, 255, 0.45])); 
        //new esri.Color([0, 255, 255]), 4), new esri.Color([0, 255, 255, 0.25])
        
        //get the OWRT drawing color data
        var requestHandle = esri.request({
            "url": this.queryUrlOWRT + "?f=json",            
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

    private _SetupJQueryTableSort()
    {
        /*
             A simple, lightweight jQuery plugin for creating sortable tables.
             https://github.com/kylefox/jquery-tablesort
             Version 0.0.11
         */
        !function (t) { t.tablesort = function (e, s) { var i = this; this.$table = e, this.$thead = this.$table.find("thead"), this.settings = t.extend({}, t.tablesort.defaults, s), this.$sortCells = this.$thead.length > 0 ? this.$thead.find("th:not(.no-sort)") : this.$table.find("th:not(.no-sort)"), this.$sortCells.on("click.tablesort", function () { i.sort(t(this)) }), this.index = null, this.$th = null, this.direction = null }, t.tablesort.prototype = { sort: function (e, s) { var i = new Date, n = this, o = this.$table, l = o.find("tbody").length > 0 ? o.find("tbody") : o, a = l.find("tr").has("td, th"), r = a.find(":nth-child(" + (e.index() + 1) + ")").filter("td, th"), d = e.data().sortBy, h = [], c = r.map(function (s, i) { return d ? "function" == typeof d ? d(t(e), t(i), n) : d : null != t(this).data().sortValue ? t(this).data().sortValue : t(this).text() }); 0 !== c.length && (this.index !== e.index() ? (this.direction = "asc", this.index = e.index()) : "asc" !== s && "desc" !== s ? this.direction = "asc" === this.direction ? "desc" : "asc" : this.direction = s, s = "asc" == this.direction ? 1 : -1, n.$table.trigger("tablesort:start", [n]), n.log("Sorting by " + this.index + " " + this.direction), n.$table.css("display"), setTimeout(function () { n.$sortCells.removeClass(n.settings.asc + " " + n.settings.desc); for (var o = 0, d = c.length; o < d; o++)h.push({ index: o, cell: r[o], row: a[o], value: c[o] }); h.sort(function (t, e) { return n.settings.compare(t.value, e.value) * s }), t.each(h, function (t, e) { l.append(e.row) }), e.addClass(n.settings[n.direction]), n.log("Sort finished in " + ((new Date).getTime() - i.getTime()) + "ms"), n.$table.trigger("tablesort:complete", [n]), n.$table.css("display") }, c.length > 2e3 ? 200 : 10)) }, log: function (e) { (t.tablesort.DEBUG || this.settings.debug) && console && console.log && console.log("[tablesort] " + e) }, destroy: function () { return this.$sortCells.off("click.tablesort"), this.$table.data("tablesort", null), null } }, t.tablesort.DEBUG = !1, t.tablesort.defaults = { debug: t.tablesort.DEBUG, asc: "sorted ascending", desc: "sorted descending", compare: function (t, e) { return t > e ? 1 : t < e ? -1 : 0 } }, t.fn.tablesort = function (e) { var s, i; return this.each(function () { s = t(this), i = s.data("tablesort"), i && i.destroy(), s.data("tablesort", new t.tablesort(s, e)) }) } }((<any>window).Zepto || (<any>window).jQuery);                
    }
    
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

        let workLayer = mService.tables.filter((ly: Layer) => ly.name == name).length > 0 ?
            mService.tables.filter((ly: Layer) => ly.name === name)[0] : null;

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

        //console.log("Queuing: " + queryString);
        //console.log("Where: " + where);
        
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

            //if (results && results.featureSets[objectID] && (<esri.tasks.FeatureSet>results.featureSets[objectID]).features.length > 0) {
       
            //myModel[targetFeatureSet] = (<esri.tasks.FeatureSet>results.featureSets[objectID]);
            if (results && typeof results.featureSets != "undefined" && results.featureSets != null) {

                //myModel[targetFeatureSet] = results.featureSets;
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
        this._sequenceQuery(this.queryUrlHUC8, "1=1", ["name"], "fsHUC8", "", "HUC8");
        this._sequenceQuery(this.queryUrlCounty, "1=1", ["name10"], "fsCounty", "","Counties");
        this._sequenceQuery(this.queryUrlWSC, "1=1", ["instname"], "fsWSC", "", "WSC");
        this._sequenceQuery(this.queryUrlSWCD, "1=1", ["SWCD_Name"], "fsSWCD", "", "SWCD");
                
        //types
        this._sequenceQuery(this.queryUrlActivityTypes, "1=1", ["activity_type"], "fsActivityTypeStrings", "", "Activity Type Strings", false, true, ["activity_type"]);                
        this._sequenceQuery(this.queryUrlPartSuperTypes, "1=1", ["participant_super_type,super_type_lu_id"], "fsPartSuperTypes", "", "Participant Super Type");
        this._sequenceQuery(this.queryUrlPartTypes, "1=1", ["super_type_lu_id,participant_type_lu_id"], "fsPartTypes", "", "Participant Type");

        this._MoveCurrentSequenceProgress();
    }

    private _RequiredFeatureSetsDone() {
                
        this.participantTypeSuperTypeMap = {};

        //build participant type to super type map
        for (let i = 0; i < this.fsPartTypes.features.length; i++)
        {                        
            //store partType id as object property and store the super type name as the value            
            for (let sIndex = 0; sIndex < this.fsPartSuperTypes.features.length; sIndex++)
            {
                if (this.fsPartTypes.features[i].attributes.super_type_lu_id == this.fsPartSuperTypes.features[sIndex].attributes.super_type_lu_id) {
                    this.participantTypeSuperTypeMap[this.fsPartTypes.features[i].attributes.participant_type_lu_id] = this.fsPartSuperTypes.features[sIndex].attributes.participant_super_type;                    
                    break;
                }
            }
        }

        this.requiredFeaturesLoaded.set(true);
        
        if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
            this._LoadReportFromURLParams();
        else
            this.ReportOptionsSubmission();
    }

    private _BuildNewReport(whereIn: string) {

        this.reportWorkingQuery = whereIn;
        this.fsSelectedAreaGeometry = null;

        //geometry is needed to query the main records set (basin, county, wsc, swcd)
        if (this.geoTypeGeometryLayerDef.get() != "") {            
            this._GetReportGeometry();
        }
        else
        {
            this._GetReportFeatureSets(whereIn);
        }
    }

    private _GetReportFeatureSets(whereIn: string) {

        //this._GetReportJSONSets();
                
        //console.log("Report query: " + whereIn);

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

        this._sequenceQueryLarge(this.queryUrlOWRT, whereIn, queryGeometry,
            ["OBJECTID", "project_nbr"],
            "graphicsArrayPrimaryRecords", "Poly Projects", false);

        /*this._sequenceQueryLarge(this.queryUrlOWRT, whereIn, queryGeometry,
            ["OBJECTID", "project_id", "project_nbr","total_cash", "total_inkind", "complete_year"],
            "graphicsArrayPrimaryRecords", "Poly Projects", false);*/
        
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
        this._GetReportFeatureSets(this.reportWorkingQuery);
    }

    private _GetReportFeatureSetsDone() {

        var recordsPerRequest = 50;
        var recordToTrigger = recordsPerRequest;
        var targetSlot = 0;

        this.primaryRecordIDSlots = [];
        this.primaryRecordIDSlots[targetSlot] = [];

        this.projectIDAttributesMap = {};
        //this.projectNbrAttributesMap = {};

        let usedProjectIDs = {};

        let usedProjectNbrs = {};
        let nbrCount = 0;
        let idCount = 0;

        /*for (let i = 0; i < this.graphicsArrayPrimaryRecords.length; i++) {

            let workingAttributes = this.graphicsArrayPrimaryRecords[i].attributes;

            //move slot
            if (this.primaryRecordIDSlots[targetSlot].length >= recordsPerRequest) {
                targetSlot++;
                this.primaryRecordIDSlots[targetSlot] = [];
            }

            //only include unique project numbers.  The poly layer has multiple records for the same project number for project polygons and activity types
            if (this._IsNullOrEmpty(usedProjectIDs[workingAttributes.project_id]))
            {
                //project objectids (should be unique?)
                this.primaryRecordIDSlots[targetSlot].push(Number(workingAttributes.OBJECTID));
                idCount++;
            }
            usedProjectIDs[workingAttributes.project_id] = workingAttributes.project_id;        
        }*/

        this._GetReportJSONSets(this._OWEBOverviewReady, [0]);
        this._GetReportJSONSets(this._OWEBProjectsReady, [1, 2]);
        this._GetReportJSONSets(this._OWEBFundsReady, [3]);
        this._GetReportJSONSets(this._OWEBResultsReady, [4]);

        /*if (this.geoTypeValue.get().toLowerCase() == "state")
            this._GetRelationshipData(this._BuildOverview);
        else
            this._GetRelationshipData(this._BuildOverview, true, true, true);*/
    }

    private _GetProjectInfo()
    {
        let workingURL = this.queryUrlOWRT;//this.queryUrlProjectInfo;

        //clear tasks
        this.sequenceTasks = [];
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._ProjectInfosDone;

        let relatedIDCount: number = 0;

        //related project info
        if (this._IsNullOrEmpty(this.fsProjectInfo)) {

            this.fsProjectInfo = new esri.tasks.FeatureSet();
            for (let i = 0; i < this.primaryRecordIDSlots.length; i++) {
                this._sequenceRelationshipQuery(workingURL, this.primaryRecordIDSlots[i], 0, ["OBJECTID", "project_id","project_nbr", "total_cash", "total_inkind","complete_year"], "fsProjectInfo", "Project Info Table", false);
            }
        }

        this._MoveCurrentSequenceProgress();
    }    

    private _ProjectInfosDone(): void {

        var recordsPerRequest = 50;
        var recordToTrigger = recordsPerRequest;
        var targetSlot = 0;

        //this.primaryRecordIDSlots = [];
        //this.primaryRecordIDSlots[targetSlot] = [];

        this.projectInfoIDS = [];
        this.projectInfoIDS[targetSlot] = [];

        this.projectIDAttributesMap = {};
        let projectIDCount = 0;

        //unique project records by OBJECTID
        //this.projectInfoAtts = [];

        let projectNbrs = {};
        let projectNbrCount = 0;
                
        for (let i = 0; i < this.fsProjectInfo.features.length; i++) {

            let workingAttributes = this.fsProjectInfo.features[i].attributes;

            //move slot
            if (this.projectInfoIDS[targetSlot].length >= recordsPerRequest) {
                targetSlot++;
                this.projectInfoIDS[targetSlot] = [];
            }

            //project objectids (should be unique?)
            this.projectInfoIDS[targetSlot].push(Number(workingAttributes.OBJECTID));

            //unique values only
            if (this._IsNullOrEmpty(this.projectIDAttributesMap[workingAttributes.project_id])) {

                this.projectIDAttributesMap[workingAttributes.project_id] = workingAttributes;
                projectIDCount++;
            }

            //unique project_nbrs
            if (this._IsNullOrEmpty(projectNbrs[workingAttributes.project_nbr])) {

                projectNbrs[workingAttributes.project_nbr] = 1;
                projectNbrCount++;
            }
        }

        console.log("Nbr: "+projectNbrCount);
        console.log("ID: "+projectIDCount);
        
        if (this.geoTypeValue.get().toLowerCase() == "state")
            this._GetRelationshipData(this._BuildOverview);
        else
            this._GetRelationshipData(this._BuildOverview, true, true, true);
    }
    
    private _GetRelationshipData(onComplete:any,getActivities:boolean=false,getParticipants:boolean=false,getResults:boolean=false) {

        //console.log("Total project ids for relationship queries: " + this.primaryRecordIDSlots.length);        

        let workingURL = this.queryUrlOWRT;//this.queryUrlProjectInfo;

        //clear tasks
        this.sequenceTasks = [];
        this.sequenceErrors = "";
        this.sequenceOnComplete = onComplete;

        let relatedIDCount: number = 0;
                        
        //related activities
        if (getActivities && this._IsNullOrEmpty(this.fsActivities)) {
                        
            this.fsActivities = new esri.tasks.FeatureSet();
            for (let i = 0; i < this.primaryRecordIDSlots.length; i++) {
                this._sequenceRelationshipQuery(workingURL, this.primaryRecordIDSlots[i], 9, ["OBJECTID", "total", "activity_type", "project_nbr"], "fsActivities", "Activities", false);
            }
        }
        
        //setup participants relationships queries
        if (getParticipants && this._IsNullOrEmpty(this.fsParticipants))
        {
            this.fsParticipants = new esri.tasks.FeatureSet();

            for (let i = 0; i < this.primaryRecordIDSlots.length; i++) {
                this._sequenceRelationshipQuery(workingURL, this.primaryRecordIDSlots[i], 3,
                    ["OBJECTID","participant_id", "cash", "inkind", "participant_type_lu_id"], "fsParticipants", "Participants Relationships",
                    false,"cash > 0 OR inkind > 0");
            }

            /*for (let i = 0; i < this.primaryRecordProjectIDSlots.length; i++) {
                this._sequenceQuery(this.queryUrlParts, "(cash > 0 OR inkind > 0) AND project_id IN (" + this.primaryRecordProjectIDSlots[i].join(",") + ")",
                    ["OBJECTID", "participant_id", "cash", "inkind", "participant_type_lu_id"], "fsParticipants", null, "Parts",null,false,null,null,false,false,true);
            }*/            
        }

        //setup results relationship queries
        if (getResults && this._IsNullOrEmpty(this.fsResults))
        {
            this.fsResults = new esri.tasks.FeatureSet();
            this.fsResultsFishPassage = new esri.tasks.FeatureSet();
                        
            for (let i = 0; i < this.primaryRecordIDSlots.length; i++) {

                //get records not related to a specific fish passage group
                this._sequenceRelationshipQuery(workingURL, this.primaryRecordIDSlots[i], 4, ["OBJECTID","project_id", "activity_type", "quantity", "unit"], "fsResults", "Results Relationships", false,
                    "result NOT LIKE '%fish habitat made accessible%' AND result NOT LIKE '%accessible by the removal%'");

                //get specific fish passage group (this would be ResultsLUID of 2 and 17) Text search eliminates 18 which would be included otherwise
                this._sequenceRelationshipQuery(workingURL, this.primaryRecordIDSlots[i], 4, ["OBJECTID","project_id", "activity_type", "quantity", "unit"], "fsResultsFishPassage", "Results Fish Passage", false,
                    "result LIKE '%fish habitat made accessible%' AND result NOT LIKE '%accessible by the removal%'");
            }
        }

        console.log("Activites: " + getActivities + " Participants: " + getParticipants+" Results: "+ getResults)
        console.log("Total relationship requests to perform: " + this.sequenceTasks.length);

        this._MoveCurrentSequenceProgress();  
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

        let strGeoType = this.geoTypeValue.get();
        let strExtent = this.areaNameSelected.get();

        //json request requires an extent of state for geotype of state.
        if (strGeoType == "state")
            strExtent = "state";

        //let requestURL = urlBase + "?strYears=" + strYears + "&strGeoType=" + strGeoType + "&strExtent=" + strExtent + "&sReportType=" + reportTypes[0];
                
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
        let jTotals: any = JSON.parse(this.owebResults_project_Totals);
        jTotals = jTotals.getOWRI_Report_Project_Totals[0];

        //area totals
        this.areaTotalInvestment.set("$" + jTotals.TotalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
        this.areaTotalProjects.set(jTotals.TotalProjects);
        //total investment in projects        
        this.fundingChartTotalData = [{ "cash": jTotals.TotalCash, "inkind": jTotals.TotalInkind }];

        this.ShowFundingTotal("", true);

        this._toCompleteFundsCheck();

        this._BuildOverview();
    }

    private _OWEBProjectsReady(fromThis: any): void {
        fromThis._OWEBProjectsProcess();
    }

    private _OWEBProjectsProcess(): void {

        //projects by year
        let yearTotals: any = JSON.parse(this.owebResults_project_Year);

        this.projectChartYearData = [];
        this.fundingChartByYearData = [];

        if (!this._IsNullOrEmpty(yearTotals.getOWRI_Report_Projects_Year)) {

            //project count by year
            this.projectChartYearData = yearTotals.getOWRI_Report_Projects_Year;
            //funding by year
            this.fundingChartByYearData = yearTotals.getOWRI_Report_Projects_Year;
        }


        //projects by activity, funding by activity, funding by activity by year
        let projectTypeDetails: any = JSON.parse(this.owebResults_project_Type_Year_Funding);

        this.projectChartActData = [];
        this.fundingChartByActivityData = [];
        this.fundingChartByActivityYearData = [];

        let fundingByActYearIndex: any = {};

        let sYearNum: number = Number(this.startYear.get());
        let eYearNum: number = Number(this.endYear.get());

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
                    //else
                    //  this.fundingChartByActivityYearData[fundingByActYearIndex[year]][workingType.ProjType] += workingType[year];
                }
            }
        }

        this.ShowProjectChartYear("", true);
        this.ShowProjectsActivity("", true);        
        this.ShowFundingYear("", true);
        this.ShowFundingActivity("", true);
        this.ShowFundingActivityYear("", true);

        this._toCompleteProjectsCheck();
        this._toCompleteFundsCheck();
    }

    private _OWEBFundsReady(fromThis: any): void {
        fromThis._OWEBFundsProcess();
    }

    private _OWEBFundsProcess(): void {

        this.fundingTabProcessed = true;

        //funding source chart data
        let fundingSource: any = JSON.parse(this.owebResults_funding_Source);

        this.fundingChartBySourceData = [];

        if (!this._IsNullOrEmpty(fundingSource)) {

            let fundingSourceObject: any = {};

            for (let stringIndex in fundingSource) {
                let workingObject = fundingSource[stringIndex][0];
                fundingSourceObject[workingObject.Funding_Source] = workingObject.TotalContribution;
            }

            this.fundingChartBySourceData.push(fundingSourceObject);
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

        //results tab
        let resultsData: any = JSON.parse(this.owebResults_results);

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

        //this._ResultsTabDataLoaded();           

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
                //this._OwebJsonToReportData();
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
        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Year",
                name: "year",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "",
                visible: true,
                showLabels: true
            }
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showVerticalGridLines: false,
            showHorizontalGridLines: true,
            showVerticalStrips: false,
            showHorizontalStrips: false
        }

        let axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: true,
            showTicks: true,
            title: "",
            minimum: 0
        }

        let colorsToUse: any = [[70, 132, 238]];
        let workingDefs = this._BuildRestChartDefinition("activeChart", "", "Linear", true, false, chartCategoryDefs, areaDef);
        this._BuildRestChartDefinitionSeriesItem(workingDefs, seriesName, seriesField, colorsToUse, "N0", "Line", axisIn);
        
        //only draw the chart if it is null
        if (!this.resultsChart || this.resultsChartActive != activeChartString) {
            this.resultsChartActive = activeChartString;
            this.BuildChart("resultsChart", workingDefs, chartDataIn, "oeOWRTAreaResultsChart", 550);
        }
        
    }

    /*private _BuildOverview(): void
    {
        let sYearNum: number;
        let eYearNum: number;

        //overview data
        let totalProjects = 0;
        var totalInvestment = 0;

        //projects data
        this.projectChartYearData = [];
        var yearArrayIndex: object = {};

        //funding data
        this.totalInvestedCash = 0;
        this.totalInvestedInkind = 0;
        
        this.fundingChartByYearData = [];
        let investmentsByYearKey = {};

        //setup investments by year dataset
        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());
        for (let year = sYearNum; year <= eYearNum; year++) {
            investmentsByYearKey[year] = this.fundingChartByYearData.length;
            this.fundingChartByYearData.push({ "year": year, "cash": 0, "inkind": 0 }); //new object
        }

        //build year series
        for (var i = sYearNum; i <= eYearNum; i++) {
            //the new year index will be the length of the array                     
            if (yearArrayIndex[i] === "undefined" || yearArrayIndex[i] == null)
                yearArrayIndex[i] = this.projectChartYearData.length;

            this.projectChartYearData.push({ "year": i, "projects": 0 });
        }

        for (let i = 0; i < this.fsProjectInfo.features.length; i++) {

            let workingAttributes = this.fsProjectInfo.features[i].attributes;
                        
            //project number map
            this.projectNbrAttributesMap[workingAttributes.project_nbr] = workingAttributes;

            //total invested
            totalInvestment += workingAttributes.total_cash + workingAttributes.total_inkind;

            //funding data
            this.totalInvestedCash += workingAttributes.total_cash;
            this.totalInvestedInkind += workingAttributes.total_inkind;

            //investments by year
            if (investmentsByYearKey[workingAttributes.complete_year] === "undefined" || investmentsByYearKey[workingAttributes.complete_year] == null) {
                investmentsByYearKey[workingAttributes.complete_year] = this.fundingChartByYearData.length;
                this.fundingChartByYearData.push({ "year": workingAttributes.complete_year, "cash": workingAttributes.total_cash, "inkind": workingAttributes.total_inkind }); //new object
            }
            else {
                this.fundingChartByYearData[investmentsByYearKey[workingAttributes.complete_year]]["cash"] += workingAttributes.total_cash;//sum object
                this.fundingChartByYearData[investmentsByYearKey[workingAttributes.complete_year]]["inkind"] += workingAttributes.total_inkind;//sum object
            }
            
            //projects by year data
            if (sYearNum <= Number(workingAttributes.complete_year) && Number(workingAttributes.complete_year) <= eYearNum)
                this.projectChartYearData[yearArrayIndex[Number(workingAttributes.complete_year)]]["projects"] += 1;

            totalProjects++;
        }

        //total projects
        this.areaTotalProjects.set(totalProjects.toString());

        //total investment
        this.areaTotalInvestment.set("$" + totalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
        
        this._LoadReport();
    }*/

    private _BuildOverview(): void
    {
        //build related queries with X records per query.
        //Relationships queries require objectids        
        var recordsPerRequest = 50;
        var recordToTrigger = recordsPerRequest;
        var targetSlot = 0;

        this.primaryRecordIDSlots = [];
        this.primaryRecordIDSlots[targetSlot] = [];

        this.projectIDAttributesMap = {};
        this.projectNbrAttributesMap = {};

        let project_nbr_dupes = "";

        let sYearNum: number;
        let eYearNum: number;

        //overview data
        //this.areaTotalProjects.set(features.length.toString());
        let totalProjects = 0;
        var totalInvestment = 0;

        let totalProjectsPIDUnique = 0;
        let totalInvestmentPIDUnique = 0;
        let PIDUsed = {};

        let totalProjectsPNumUnique = 0;
        let totalInvestmentPNumUnique = 0;
        let PNumUsed = {};

        //projects data
        //this.projectChartYearData = [];
        var yearArrayIndex: object = {};

        //funding data
        this.totalInvestedCash = 0;
        this.totalInvestedInkind = 0;
        //let projectedSummed: any = {};
        //let processedProjectNumber: any = {};

        //this.fundingChartByYearData = [];
        let investmentsByYearKey = {};

        /*

        //setup investments by year dataset
        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());
        for (let year = sYearNum; year <= eYearNum; year++) {
            investmentsByYearKey[year] = this.fundingChartByYearData.length;
            this.fundingChartByYearData.push({ "year": year, "cash": 0, "inkind": 0 }); //new object
        }

        //build year series
        for (var i = sYearNum; i <= eYearNum; i++) {
            if (yearArrayIndex[i] === "undefined" || yearArrayIndex[i] == null)
                yearArrayIndex[i] = this.projectChartYearData.length;

            this.projectChartYearData.push({ "year": i, "projects": 0 });
        }

        for (let i = 0; i < this.graphicsArrayPrimaryRecords.length; i++) {

            let workingAttributes = this.graphicsArrayPrimaryRecords[i].attributes;

            //move slot
            if (this.primaryRecordIDSlots[targetSlot].length >= recordsPerRequest) {
                targetSlot++;
                this.primaryRecordIDSlots[targetSlot] = [];
            }

            //project objectids (should be unique?)
            this.primaryRecordIDSlots[targetSlot].push(Number(workingAttributes.OBJECTID));

            //unique values only
            if (this._IsNullOrEmpty(this.projectIDAttributesMap[workingAttributes.project_id])) {

                this.projectIDAttributesMap[workingAttributes.project_id] = workingAttributes;

                //total invested
                totalInvestment += workingAttributes.total_cash + workingAttributes.total_inkind;

                //funding data
                this.totalInvestedCash += workingAttributes.total_cash;
                this.totalInvestedInkind += workingAttributes.total_inkind;

                //investments by year
                if (investmentsByYearKey[workingAttributes.complete_year] === "undefined" || investmentsByYearKey[workingAttributes.complete_year] == null) {
                    investmentsByYearKey[workingAttributes.complete_year] = this.fundingChartByYearData.length;
                    this.fundingChartByYearData.push({ "year": workingAttributes.complete_year, "cash": workingAttributes.total_cash, "inkind": workingAttributes.total_inkind }); //new object
                }
                else {
                    this.fundingChartByYearData[investmentsByYearKey[workingAttributes.complete_year]]["cash"] += workingAttributes.total_cash;//sum object
                    this.fundingChartByYearData[investmentsByYearKey[workingAttributes.complete_year]]["inkind"] += workingAttributes.total_inkind;//sum object
                }

                //projects by year data
                if (sYearNum <= Number(workingAttributes.complete_year) && Number(workingAttributes.complete_year) <= eYearNum)
                    this.projectChartYearData[yearArrayIndex[Number(workingAttributes.complete_year)]]["projects"] += 1;

                totalProjects++;
            }

            //project number map
            this.projectNbrAttributesMap[workingAttributes.project_nbr] = workingAttributes;                        
        }

        //total projects
        this.areaTotalProjects.set(totalProjects.toString());

        //total investment
        this.areaTotalInvestment.set("$" + totalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));

        */

        //console.log("PID Uniques: " + totalProjectsPIDUnique + " :: " + totalInvestmentPIDUnique);
        //console.log("PNum Uniques: " + totalProjectsPNumUnique + " :: " + totalInvestmentPNumUnique);
                
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
        //this._BuildOverview(this.graphicsArrayPrimaryRecords);

        //build related chart(s)
        //this.ShowProjectChartYear("", true);
        //this.ShowFundingTotal("", true);
        //this.ShowFundingYear("", true);

        this.ranksVisible.set(false);

        //load everything if the selection is smaller
        if (this.geoTypeValue.get() !== "state") {
            //this._ProcessActivities();
            //this._ProcessParticipants();
            //this._ProcessResults();

            //this.projectsTabProcessed = true;
            //this.fundingTabProcessed = true;
            //this.resultsTabProcessed = true;

            this.ranksVisible.set(false);
        }
                                
        //hide the loader overlay
        this.loaderVisible.set(false);
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
        //console.log(geoTypeSelected);

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
                this.areaNamePolyQueryString.set("UPPER(name) =");
                this._BuildAreaList(this.fsHUC8, "name", "name", forceAreaSelection);
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
                //this.geoTypeValue.set("1=1");
                this.areaNameVisisble.set(false);
                this.areaNamePolyQueryString.set("");
                this.geoTypeGeometryLayerDef.set("");
                this.areaNameSelected.set("");
                //this.esriLayerDefintionString.set("1=1");

                this.areaNamePointsQueryString.set("1=1");
                this.BuildOptionsQuery();
                //this.OptionsAreaChanged("1=1");

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

    public OptionsYearStartChanged(value:string)
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
    }

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
        this.owrtChartsTableContainerVisible.set(false);
        this.owrtTableLinkText.set("Table View");
        this.owrtTableLinkImg.set("Resources/Images/Icons/paging-control-table-24.png");

        this.HideAllTableViews();
    }

    public HideAllTableViews()
    {
        this.owrtChartsTableSharedVisible.set(false);
        this.owrtChartsTableFundInvestByYearVisible.set(false);
        this.owrtChartsTableFundInvestByActByYearVisible.set(false);
    }

    public ToggleChartTableView()
    {
        //hide all views first
        this.HideAllTableViews();

        if (!this.owrtChartsTableContainerVisible.get()) {
           
            this.owrtTableLinkText.set("Chart View");
            this.owrtTableLinkImg.set("Resources/Images/Icons/charting-24.png");
                        
            if (this.activeTabChartName == "projectsyear")
            {
                this.owrtTableHdrName.set("Year");
                this.owrtTableHdrValue.set("Number of Projects");
                this.owrtChartsTableSharedVisible.set(true);

                this.owrtTableData.clear();
                for (let i = 0; i < this.projectChartYearData.length; i++) {
                    this.owrtTableData.addItem({
                        "name": (<any>this.projectChartYearData[i]).Year,
                        "value": (<any>this.projectChartYearData[i]).TotalProjects,
                        "data-sort-value": isNaN(parseInt((<any>this.projectChartYearData[i]).TotalProjects)) ? 0 : parseInt((<any>this.projectChartYearData[i]).TotalProjects)
                    });
                }                
                
            }
            else if (this.activeTabChartName == "projectsactivity")
            {
                this.owrtTableHdrName.set("Project Types");
                this.owrtTableHdrValue.set("Number of Projects");
                this.owrtChartsTableSharedVisible.set(true);

                this.owrtTableData.clear();
                for (let i = 0; i < this.projectChartActData.length; i++) {
                    this.owrtTableData.addItem({
                        "name": (<any>this.projectChartActData[i]).ProjType,
                        "value": (<any>this.projectChartActData[i]).NumProj,
                        "data-sort-value": isNaN(parseInt((<any>this.projectChartActData[i]).NumProj)) ? 0 : parseInt((<any>this.projectChartActData[i]).NumProj)
                    });
                }                
                
            }                        
            else if (this.activeTabChartName == "fundingtotal") {

                this.owrtTableHdrName.set("Contribution Types");
                this.owrtTableHdrValue.set("Total Investment");
                this.owrtChartsTableSharedVisible.set(true);

                //(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                //Number(someNumber.toFixed(1)).toLocaleString()
                this.owrtTableData.clear();
                this.owrtTableData.addItem({ "name": "Cash",
                    "value": "$" + Number((<any>this.fundingChartTotalData[0]).cash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    "data-sort-value": isNaN(parseInt((<any>this.fundingChartTotalData[0]).cash)) ? 0 : parseInt((<any>this.fundingChartTotalData[0]).cash)
                });
                this.owrtTableData.addItem({
                    "name": "Inkind",
                    "value": "$" + Number((<any>this.fundingChartTotalData[0]).inkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    "data-sort-value": isNaN(parseInt((<any>this.fundingChartTotalData[0]).inkind)) ? 0 : parseInt((<any>this.fundingChartTotalData[0]).inkind)
                });                                                
                
            }    
            else if (this.activeTabChartName == "fundingactivity") {

                this.owrtTableHdrName.set("Project Types");
                this.owrtTableHdrValue.set("Funding");
                this.owrtChartsTableSharedVisible.set(true);

                let totalVal:number = 0;

                this.owrtTableData.clear();
                for (let i = 0; i < this.fundingChartByActivityData.length; i++) {
                    
                    this.owrtTableData.addItem({
                        "name": (<any>this.fundingChartByActivityData[i]).ProjType,
                        "value": "$" + Number((<any>this.fundingChartByActivityData[i]).TotalFunding).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt((<any>this.fundingChartByActivityData[i]).TotalFunding)) ? 0 : parseInt((<any>this.fundingChartByActivityData[i]).TotalFunding)
                    });

                    totalVal += Number((<any>this.fundingChartByActivityData[i]).total);
                }                                
            }           
            else if (this.activeTabChartName == "fundingsource") {

                this.owrtTableHdrName.set("Funding Source");
                this.owrtTableHdrValue.set("Funding");
                this.owrtChartsTableSharedVisible.set(true);
                            
                this.owrtTableData.clear();

                let workingObject: any = this.fundingChartBySourceData[0];

                let totalVal: number = 0;

                for (let key in workingObject)
                {                                                            
                    this.owrtTableData.addItem({
                        "name": key,
                        "value": "$" + workingObject[key].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt(workingObject[key])) ? 0 : parseInt(workingObject[key])
                    });

                    totalVal += Number((<any>workingObject[key]));
                }
                                
            }
            else if (this.activeTabChartName == "fundingyear") {

                this.owrtChartsTableFundInvestByYearVisible.set(true);

                let totalVal: number = 0;
                                
                this.owrtTableDataFundInvestByYear.clear();
                for (let i = 0; i < this.fundingChartByYearData.length; i++) {

                    this.owrtTableDataFundInvestByYear.addItem({
                        "year": (<any>this.fundingChartByYearData[i]).Year,
                        "cash": "$" + Number((<any>this.fundingChartByYearData[i]).TotalCash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "inkind": "$" + Number((<any>this.fundingChartByYearData[i]).TotalInkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "cashForSort": isNaN(parseInt((<any>this.fundingChartByYearData[i]).TotalCash)) ? 0 : parseInt((<any>this.fundingChartByYearData[i]).TotalCash),
                        "inkindForSort": isNaN(parseInt((<any>this.fundingChartByYearData[i]).TotalInkind)) ? 0 : parseInt((<any>this.fundingChartByYearData[i]).TotalInkind)
                    });

                    totalVal += Number((<any>this.fundingChartByYearData[i]).inkind) + Number((<any>this.fundingChartByYearData[i]).cash);
                }
                                
            }
            else if (this.activeTabChartName == "fundingactivityYear") {
                
                this.owrtChartsTableFundInvestByActByYearVisible.set(true);

                let totalVal: number = 0;

                this.owrtTableDataFundInvestByActByYear.clear();
                for (let i = 0; i < this.fundingChartByActivityYearData.length; i++) {

                    let workingObject = this.fundingChartByActivityYearData[i];
                    let newObject = { "year": workingObject["year"] };

                    //add display and sort values to new object
                    for (let aIndex = 0; aIndex < this.fsActivityTypeStrings.features.length; aIndex++) {
                        let workingAtt = this.fsActivityTypeStrings.features[aIndex].attributes.activity_type;
                        let sortAtt = workingAtt + "Sort";
                        newObject[sortAtt] = workingObject[workingAtt]; //copy raw value into new attribute
                        newObject[workingAtt] = "$" + workingObject[workingAtt].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

                        totalVal += Number((<any>workingObject[workingAtt]));
                    }
                    
                    this.owrtTableDataFundInvestByActByYear.addItem(newObject);                    
                }                                
            }
            
            //show container
            this.owrtChartsTableContainerVisible.set(true);
        }
        else {
            this.CloseChartTableView();
        }

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
            /*this.loaderMessage.set("Loading Funding Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);*/

            this.loaderProjectsVisible.set(true);

            //this._GetReportJSONSets(this._OWEBFundingSourceQueryDone, [3]);
            return;
        }
               
        /*if (!this.projectsTabProcessed && this._IsNullOrEmpty(this.fsActivities))
        {
            this.loaderMessage.set("Loading Projects Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);
            //this.resultsFieldSetVisible.set(false);

            this._GetRelationshipData(this._ProjectTabDataLoaded, true);
            return;
        }

        if (!this.projectsTabProcessed)
            this._ProcessActivities();*/

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
            /*this.loaderMessage.set("Loading Funding Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);*/
                        
            this.loaderFundsVisible.set(true);
            
            //this._GetReportJSONSets(this._OWEBFundingSourceQueryDone, [3]);
            return;
        }

        /*if (!this.fundingTabProcessed && (this._IsNullOrEmpty(this.fsParticipants))) {
            this.loaderMessage.set("Loading Funding Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);
            //this.resultsFieldSetVisible.set(false);

            this._GetRelationshipData(this._FundingTabDataLoaded, true, true);
            //this._GetActivityStats(this.LoadFundingTab);
            return;
        }
                
        if (!this.fundingTabProcessed)
        {
            this._ProcessActivities();
            this._ProcessParticipants();
        } */           

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

            /*this.loaderMessage.set("Loading Results Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);*/

            this.loaderResultsVisible.set(true);

            //this._GetReportJSONSets(this._OWEBResultsQueryDone, [4]);
            return;
        }

        /*if (!this.resultsTabProcessed && this._IsNullOrEmpty(this.fsResults) ) {
            this.loaderMessage.set("Loading Results Tab...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);
            //this.resultsFieldSetVisible.set(false);

            this._GetRelationshipData(this._ResultsTabDataLoaded, false, false, true);
            return;
        }

        if (!this.resultsTabProcessed) {
            this._ProcessResults();
        }*/

        this.loaderResultsVisible.set(false);
        this.resultsTabProcessed = true;
        this.loaderVisible.set(false);
                
        //if (!this.resultsChart)
            //this.ShowChart("results", "");
            //this.ShowFundingTotal("total");
    }

    private _ResultsTabDataLoaded() {
        this.LoadResultsTab();
    }

        
    public ShowProjectChartYear(activeChartString: string, setupOnly: boolean = false)
    {   
        if (!setupOnly && !this._IsNullOrEmpty(this.projectChartYearData) && !this._IsNullOrEmpty(this.projectChartYearDefs)) {
            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;                
                this.BuildChart("projectChart", this.projectChartYearDefs, this.projectChartYearData, "oeOWRTAreaProjectsChart", 550);                
            }

            return;
        }
                
        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Year",
                name: "Year",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "Year",
                visible: true,
                showLabels: true
            }
        }

        var axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: true,
            showTicks: true,
            title: "Projects"
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showHorizontalGridLines: true
        }

        let colorsToUse: any = [[70, 132, 238]];
        this.projectChartYearDefs = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Linear", true, false, chartCategoryDefs, areaDef);
                        
        this._BuildRestChartDefinitionSeriesItem(this.projectChartYearDefs, "Projects", "TotalProjects", colorsToUse, "N0", "Bar", axisIn);
        
    }

    public ShowProjectsActivity(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.projectChartActData) && !this._IsNullOrEmpty(this.projectChartActDefs)) {
            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartActive != activeChartString) {
                this.projectChartActive = activeChartString;
                this.BuildChart("projectChart", this.projectChartActDefs, this.projectChartActData, "oeOWRTAreaProjectsChart", 550);                
            }

            return;
        }
        
        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Activity",
                name: "ProjType",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "Activity",
                visible: true,
                showLabels: true,
                reverseValues: true
            }
        }

        var axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: true,
            showTicks: true,
            title: "Projects"            
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showHorizontalGridLines: true
        }

        let colorsToUse: any = [[70, 132, 238]];
        this.projectChartActDefs = this._BuildRestChartDefinition("activeChart", "Number of Projects by Activity", "Linear", true, true, chartCategoryDefs, areaDef);                
        this._BuildRestChartDefinitionSeriesItem(this.projectChartActDefs, "Number of Projects", "NumProj", colorsToUse, "N0", "Bar", axisIn);
                
    }

    public ShowFundingTotal(activeChartString: string, setupOnly: boolean=false) {

        //if the data is already built show the chart and exit
        if (!setupOnly && typeof this.fundingChartTotalData != "undefined" && this.fundingChartTotalData != null) {

            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartActive != activeChartString) {
                this.fundingChartActive = activeChartString;
                this.BuildChart("fundingChart", this.fundingChartTotalDefs, this.fundingChartTotalData, "oeOWRTAreaFundingChart", 550);
            }

            return;
        }
        
        let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
        //let colorsToUse: any = this._generateRGBArrayFromCount(2);
        this.fundingChartTotalDefs = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Pie", true, false, null, null);
                
        this._BuildRestChartDefinitionSeriesItem(this.fundingChartTotalDefs, "Cash", "cash", colorsToUse, "C0");
        this._BuildRestChartDefinitionSeriesItem(this.fundingChartTotalDefs, "Inkind", "inkind", colorsToUse, "C0");

        //this.fundingChartTotalData = [{ "cash": this.totalInvestedCash, "inkind": this.totalInvestedInkind}];
    }
        
    public ShowFundingYear(activeChartString: string, setupOnly: boolean=false) {

        //if the data is already built show the chart and exit
        if (!setupOnly && typeof this.fundingChartByYearData != "undefined" && this.fundingChartByYearData != null &&
            typeof this.fundingChartByYearDefs != "undefined" && this.fundingChartByYearDefs != null) {

            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartActive != activeChartString) {
                this.fundingChartActive = activeChartString;
                this.BuildChart("fundingChart", this.fundingChartByYearDefs, this.fundingChartByYearData, "oeOWRTAreaFundingChart", 550);
            }

            return;
        }

        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Year",
                name: "Year",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "Year",
                visible: true,
                showLabels: true
            }
        }

        var axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: true,
            showTicks: true,
            title: ""            
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showHorizontalGridLines: true
        }
                
        let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
        this.fundingChartByYearDefs = this._BuildRestChartDefinition("activeChart", "Investments By Year", "Linear", true, false, chartCategoryDefs, areaDef);        
        this._BuildRestChartDefinitionSeriesItem(this.fundingChartByYearDefs, "Cash", "TotalCash", colorsToUse, "C0", "Bar", axisIn);
        this._BuildRestChartDefinitionSeriesItem(this.fundingChartByYearDefs, "In Kind", "TotalInkind", colorsToUse, "C0");
    }
          
    private ShowFundingActivity(activeChartString: string, setupOnly:boolean=false) {

        //if the data is already built show the chart and exit
        if (!setupOnly && typeof this.fundingChartByActivityData != "undefined" && this.fundingChartByActivityData != null &&
            typeof this.fundingChartByActivityDefs != "undefined" && this.fundingChartByActivityDefs != null) {

            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartActive != activeChartString) {
                this.fundingChartActive = activeChartString;
                this.BuildChart("fundingChart", this.fundingChartByActivityDefs, this.fundingChartByActivityData, "oeOWRTAreaFundingChart", 550);
            }

            return;
        }

        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Activity",
                name: "ProjType",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "",
                visible: true,
                showLabels: true,
                reverseValues: true
            }
        }

        var axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: false,
            showTicks: true,
            title: ""            
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showVerticalGridLines: false,
            showHorizontalGridLines: true,
            showVerticalStrips: false,
            showHorizontalStrips: false
        }

        let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
        this.fundingChartByActivityDefs = this._BuildRestChartDefinition("activeChart", "Investments By Activity", "Linear", true, true, chartCategoryDefs, areaDef);
        this._BuildRestChartDefinitionSeriesItem(this.fundingChartByActivityDefs, "Total", "TotalFunding", colorsToUse, "C0", "Bar", axisIn);                
        //#,##0,,M
    }

    private ShowFundingActivityYear(activeChartString:string, setupOnly:boolean=false) {

        //if the data is already built show the chart and exit
        if (!setupOnly && typeof this.fundingChartByActivityYearData != "undefined" && this.fundingChartByActivityYearData != null &&
            typeof this.fundingChartByActivityYearDefs != "undefined" && this.fundingChartByActivityYearDefs != null) {

            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartActive != activeChartString) {
                this.fundingChartActive = activeChartString;
                this.BuildChart("fundingChart", this.fundingChartByActivityYearDefs, this.fundingChartByActivityYearData, "oeOWRTAreaFundingChart", 550);
            }

            return;
        }

        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Year",
                name: "year",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "",
                visible: true,
                showLabels: true
            }
        }
                
        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showVerticalGridLines: false,
            showHorizontalGridLines: true,
            showVerticalStrips: false,
            showHorizontalStrips: false
        }
                
        //let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
        let colorsToUse: any = this._generateRGBArrayFromCount(this.fsActivityTypeStrings.features.length);
        this.fundingChartByActivityYearDefs = this._BuildRestChartDefinition("activeChart", "Investments By Activity By Year", "Linear", true, false, chartCategoryDefs, areaDef);

        if (!this._IsNullOrEmpty(this.fundingChartByActivityYearData) && this.fundingChartByActivityYearData.length>0)
        {
            let needAxis: boolean = true;

            for (let activityName in this.fundingChartByActivityYearData[0]) {

                if (activityName == "year")
                    continue;

                let axisIn: RestChartAxisDefinition = {
                    visible: false,
                    showLabels: true,
                    showTicks: true,
                    title: "Funding",
                    minimum: 0
                }

                //only show the first axis
                if (needAxis)
                {
                    axisIn.visible = true;
                    needAxis = false;
                }
                else
                    axisIn.visible = false;

                //(workingAtt.charAt(0).toUpperCase() + workingAtt.slice(1))
                this._BuildRestChartDefinitionSeriesItem(this.fundingChartByActivityYearDefs, activityName, activityName, colorsToUse, "C0", "Line", axisIn);
            }
        }

       
        
        //create a series for each activity type
        /*for (let i = 0; i < this.fsActivityTypeStrings.features.length; i++)
        {
            let workingAtt: string = this.fsActivityTypeStrings.features[i].attributes.activity_type;

            let axisIn: RestChartAxisDefinition = {
                visible: false,
                showLabels: true,
                showTicks: true,
                title: "Funding",
                minimum: 0                 
            }

            //only show the first axis
            if (i == 0)
                axisIn.visible = true;
            else
                axisIn.visible = false;

            //(workingAtt.charAt(0).toUpperCase() + workingAtt.slice(1))
            this._BuildRestChartDefinitionSeriesItem(this.fundingChartByActivityYearDefs, (workingAtt.charAt(0).toUpperCase() + workingAtt.slice(1)), workingAtt, colorsToUse, "C0", "Line", axisIn);
        }*/
        
    }

    private ShowFundingSource(activeChartString: string, setupOnly:boolean=false) {

        //if the data is already built show the chart and exit
        if (!setupOnly && typeof this.fundingChartBySourceData != "undefined" && this.fundingChartBySourceData != null &&
            typeof this.fundingChartBySourceDefs != "undefined" && this.fundingChartBySourceDefs != null) {

            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartActive != activeChartString) {
                this.fundingChartActive = activeChartString;
                this.BuildChart("fundingChart", this.fundingChartBySourceDefs, this.fundingChartBySourceData, "oeOWRTAreaFundingChart", 550);
            }

            return;
        }

        //let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];

        let workingObject = this.fundingChartBySourceData[0];

        let colorsToUse: any = this._generateRGBArrayFromCount(Object.keys(workingObject).length);
        this.fundingChartBySourceDefs = this._BuildRestChartDefinition("activeChart", "Funding Source", "Pie", true, false, null, null);
                
        for (var propName in workingObject)
        {
            this._BuildRestChartDefinitionSeriesItem(this.fundingChartBySourceDefs, propName, propName, colorsToUse, "C0");
        }        
    }

    private ShowResultsChart(activeChartString: string, workingData: object[], workingDefs: any, seriesField:string, seriesName:string, setupOnly: boolean = false)
    {
        //if the data is already built show the chart and exit
        if (!setupOnly && typeof workingData != "undefined" && workingData != null &&
            typeof workingDefs != "undefined" && workingDefs != null) {

            //only draw the chart if it is null
            if (!this.resultsChart || this.resultsChartActive != activeChartString) {
                this.resultsChartActive = activeChartString;
                this.BuildChart("resultsChart", workingDefs, workingData, "oeOWRTAreaResultsChart", 550);
            }

            return;
        }


        var chartCategoryDefs: RestChartCategoryDefinition = {
            field: {
                displayName: "Year",
                name: "year",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: {
                title: "",
                visible: true,
                showLabels: true
            }
        }

        var areaDef: RestChartAreaDefinition = {
            background: [255, 255, 255, 255],
            foreground: [0, 0, 0, 255],
            showLabels: true,
            colorPalette: ChartColorPalette.Rainbow,
            showToolTips: true,
            actionSelect: false,
            actionPan: false,
            actionZoom: false,
            actionFeatureDetails: false,
            actionRunCommand: false,
            enableCommonSeriesRange: true,
            showVerticalGridLines: false,
            showHorizontalGridLines: true,
            showVerticalStrips: false,
            showHorizontalStrips: false
        }

        let axisIn: RestChartAxisDefinition = {
            visible: true,
            showLabels: true,
            showTicks: true,
            title: "",
            minimum: 0
        }

        let colorsToUse: any = [[70, 132, 238]];
        workingDefs = this._BuildRestChartDefinition("activeChart", "", "Linear", true, false, chartCategoryDefs, areaDef);
        this._BuildRestChartDefinitionSeriesItem(workingDefs, seriesName, seriesField, colorsToUse, "N0", "Line", axisIn);

        return workingDefs;
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
        /*$('.owrtResultsTable th.owrtResultsTotal').data('sortBy', function (th, td, tablesort) {
            return parseInt(td.text());
        });*/

        $(".owrtChartTableShared").tablesort();
        $(".owrtChartTableFundInvestByYear").tablesort();
        $(".owrtChartTableFundInvestByActByYear").tablesort();        
        
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

            //if (typeof this.pipeParamsFromURL == "string")
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
                        this.OptionsYearStartChanged(years[0]);
                        this.OptionsYearEndChanged(years[years.length - 1]);
                    }
                }
                else {
                    this.OptionsYearStartChanged(this.yearMin.toString());
                    this.OptionsYearEndChanged(this.yearMax.toString());
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
        this._destroyAllCharts();

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

        //clear featuresets        
        this.fsActivities = null;
        this.fsParticipants = null;
        this.fsResults = null;
        this.fsCentroidsForMap = null;

        //clear projects tab
        this.projectsTabProcessed = false;
        //this.projectChartActData = null;
        this.projectChartActDefs = null;
        //this.projectChartYearData = null;
        this.projectChartYearDefs = null;        
        
        //clear funding tab
        this.fundingTabProcessed = false;
        //this.fundingChartByActivityData = null;
        this.fundingChartByActivityDefs = null;
        //this.fundingChartByActivityYearData = null;
        this.fundingChartByActivityYearDefs = null;
        //this.fundingChartByYearData = null;
        this.fundingChartByYearDefs = null;
        //this.fundingChartBySourceData = null;
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
                  
        this._BuildNewReport(this.primaryQueryString.get());
    }
    
    private _ProcessResults() {
        
        if (this._IsNullOrEmpty(this.fsResults))
            return;

        //results loop
        let sYearNum: number;
        let eYearNum: number;

        this.resultsCrossingsData = [];
        var crossingKey: any = {};

        this.resultsScreensData = [];
        var screenKey: any = {};

        this.resultsInstreamMilesData = [];
        var instreamMilesKey: any = {};

        this.resultsFishHabitatMilesData = [];
        var fishHabitatMilesKey: any = {};

        this.resultsRiparianMilesData = [];
        var riparianMilesKey: any = {};

        this.resultsWaterflowData = [];
        var waterflowKey: any = {};

        this.resultsWetlandData = [];
        var wetlandKey: any = {};

        this.resultsUplandData = [];
        var uplandKey: any = {};

        this.resultsRiparianData = [];
        var riparianKey: any = {};

        this.resultsEstuarineData = [];
        var estuarineKey: any = {};

        //load all data with all years and zero count
        let resultsDataSets: any[] = [
            { "data": "resultsCrossingsData", "key": crossingKey },
            { "data": "resultsScreensData", "key": screenKey },
            { "data": "resultsInstreamMilesData", "key": instreamMilesKey },
            { "data": "resultsFishHabitatMilesData", "key": fishHabitatMilesKey },
            { "data": "resultsRiparianMilesData", "key": riparianMilesKey },
            { "data": "resultsWaterflowData", "key": waterflowKey },
            { "data": "resultsWetlandData", "key": wetlandKey },
            { "data": "resultsUplandData", "key": uplandKey },
            { "data": "resultsRiparianData", "key": riparianKey },
            { "data": "resultsEstuarineData", "key": estuarineKey }
        ];

        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());

        for (let i = 0; i < resultsDataSets.length; i++) {
            for (let year = sYearNum; year <= eYearNum; year++) {
                resultsDataSets[i].key[year] = this[resultsDataSets[i].data].length;
                this[resultsDataSets[i].data].push({ "year": year, "total": 0 }); //new object
            }
        }

        let workingAtts: any;
        let workingProjectAtts: any;

        //clear results table data
        this.resultsTableData.clear(); //object {"name":"result name","total":0,"graph":"resultGraphname"}

        let resultsTableCrossing = { "name": "Total number of road/stream crossings improved for fish passage", "total": 0, "display": "0", "chart": "crossing" };
        let resultsTableInstreamMiles = { "name": "Total miles of stream treated (instream activities)", "total": 0, "display": "0","chart": "instreamMiles" };
        let resultsTableFishHabitatMiles = { "name": "Total miles of fish habitat made accessible due to road/stream crossing improvements (e.g. improvement or removal of culverts and other structures)", "total": 0, "display": "0","chart": "fishHabitatMiles" };
        let resultsTableRiparianMiles = { "name": "Total linear stream miles treated (riparian activities)", "total": 0, "display": "0","chart": "riparianMiles" };
        let resultsTableWaterflow = { "name": "Total water flow acquired", "total": 0, "display": "0","chart": "waterflow" };
        let resultsTableWetland = { "name": "Total acres treated (wetland activities)", "total": 0, "display": "0","chart": "wetland" };
        let resultsTableUpland = { "name": "Total acres treated (upland activities)", "total": 0, "display": "0","chart": "upland" };
        let resultsTableRiparian = { "name": "Total acres treated (riparian activities)", "total": 0, "display": "0","chart": "riparian" };
        let resultsTableEstuarine = { "name": "Total acres treated (estuarine activities)", "total": 0, "display": "0","chart": "estuarine" };
        let resultsTableScreens = { "name": "Flow rate of water diverted by screens", "total": 0, "display": "0","chart": "screens" };
                
        let objectIDUsed = {};
        
        //special fish passage results
        for (let i = 0; i < this.fsResultsFishPassage.features.length; i++) {
            workingAtts = this.fsResultsFishPassage.features[i].attributes;
            workingProjectAtts = this.projectIDAttributesMap[workingAtts.project_id];

            //use unique objectids
            if (!this._IsNullOrEmpty(objectIDUsed[workingAtts.OBJECTID]))
                continue;
            objectIDUsed[workingAtts.OBJECTID] = 1;

            if (workingAtts.activity_type.toLowerCase() != "fish passage" || workingAtts.unit.toLowerCase() != "mile")
                continue;
            
            if (fishHabitatMilesKey[workingProjectAtts.complete_year] === "undefined" || fishHabitatMilesKey[workingProjectAtts.complete_year] == null) {
                fishHabitatMilesKey[workingProjectAtts.complete_year] = this.resultsFishHabitatMilesData.length;
                this.resultsFishHabitatMilesData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                resultsTableFishHabitatMiles.total += workingAtts.quantity;
            }
            else {
                this.resultsFishHabitatMilesData[fishHabitatMilesKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                resultsTableFishHabitatMiles.total += workingAtts.quantity;
            }            
        }

        objectIDUsed = {};
                        
        //all other results
        for (let i = 0; i < this.fsResults.features.length; i++) {
            workingAtts = this.fsResults.features[i].attributes;
            workingProjectAtts = this.projectIDAttributesMap[workingAtts.project_id];

            //use unique objectids
            if (!this._IsNullOrEmpty(objectIDUsed[workingAtts.OBJECTID]))
                continue;
            objectIDUsed[workingAtts.OBJECTID] = 1;

            //object = {"year":"","total":""}
            if (workingAtts.activity_type.toLowerCase() == "fish passage") {

                if (workingAtts.unit.toLowerCase() == "crossing") {
                    if (crossingKey[workingProjectAtts.complete_year] === "undefined" || crossingKey[workingProjectAtts.complete_year] == null) {
                        crossingKey[workingProjectAtts.complete_year] = this.resultsCrossingsData.length;
                        this.resultsCrossingsData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                        resultsTableCrossing.total += workingAtts.quantity;
                    }
                    else {
                        this.resultsCrossingsData[crossingKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                        resultsTableCrossing.total += workingAtts.quantity;
                    }
                }
                /*else if (workingAtts.unit.toLowerCase() == "mile") {
                    if (fishHabitatMilesKey[workingProjectAtts.complete_year] === "undefined" || fishHabitatMilesKey[workingProjectAtts.complete_year] == null) {
                        fishHabitatMilesKey[workingProjectAtts.complete_year] = this.resultsFishHabitatMilesData.length;
                        this.resultsFishHabitatMilesData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                        resultsTableFishHabitatMiles.total += workingAtts.quantity;
                    }
                    else {
                        this.resultsFishHabitatMilesData[fishHabitatMilesKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                        resultsTableFishHabitatMiles.total += workingAtts.quantity;
                    }
                }*/

            }
            else if (workingAtts.activity_type.toLowerCase() == "fish screening" && workingAtts.unit.toLowerCase() == "cfs") {
                if (screenKey[workingProjectAtts.complete_year] === "undefined" || screenKey[workingProjectAtts.complete_year] == null) {
                    screenKey[workingProjectAtts.complete_year] = this.resultsScreensData.length;
                    this.resultsScreensData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableScreens.total += workingAtts.quantity;
                }
                else {
                    this.resultsScreensData[screenKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableScreens.total += workingAtts.quantity;
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "instream" && workingAtts.unit.toLowerCase() == "mile") {
                if (instreamMilesKey[workingProjectAtts.complete_year] === "undefined" || instreamMilesKey[workingProjectAtts.complete_year] == null) {
                    instreamMilesKey[workingProjectAtts.complete_year] = this.resultsInstreamMilesData.length;
                    this.resultsInstreamMilesData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableInstreamMiles.total += workingAtts.quantity;
                }
                else {
                    this.resultsInstreamMilesData[instreamMilesKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableInstreamMiles.total += workingAtts.quantity;
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "instream flow" && workingAtts.unit.toLowerCase() == "cfs") {

                if (waterflowKey[workingProjectAtts.complete_year] === "undefined" || waterflowKey[workingProjectAtts.complete_year] == null) {
                    waterflowKey[workingProjectAtts.complete_year] = this.resultsWaterflowData.length;
                    this.resultsWaterflowData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableWaterflow.total += workingAtts.quantity;
                }
                else {
                    this.resultsWaterflowData[waterflowKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableWaterflow.total += workingAtts.quantity;
                }

            }
            else if (workingAtts.activity_type.toLowerCase() == "riparian") {

                if (workingAtts.unit.toLowerCase() == "acre") {
                    if (riparianKey[workingProjectAtts.complete_year] === "undefined" || riparianKey[workingProjectAtts.complete_year] == null) {
                        riparianKey[workingProjectAtts.complete_year] = this.resultsRiparianData.length;
                        this.resultsRiparianData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                        resultsTableRiparian.total += workingAtts.quantity;
                    }
                    else {
                        this.resultsRiparianData[riparianKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                        resultsTableRiparian.total += workingAtts.quantity;
                    }
                }
                else if (workingAtts.unit.toLowerCase() == "mile") {
                    if (riparianMilesKey[workingProjectAtts.complete_year] === "undefined" || riparianMilesKey[workingProjectAtts.complete_year] == null) {
                        riparianMilesKey[workingProjectAtts.complete_year] = this.resultsRiparianMilesData.length;
                        this.resultsRiparianMilesData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                        resultsTableRiparianMiles.total += workingAtts.quantity;
                    }
                    else {
                        this.resultsRiparianMilesData[riparianMilesKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                        resultsTableRiparianMiles.total += workingAtts.quantity;
                    }
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "estuarine" && workingAtts.unit.toLowerCase() == "acre") {
                if (estuarineKey[workingProjectAtts.complete_year] === "undefined" || estuarineKey[workingProjectAtts.complete_year] == null) {
                    estuarineKey[workingProjectAtts.complete_year] = this.resultsEstuarineData.length;
                    this.resultsEstuarineData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableEstuarine.total += workingAtts.quantity;
                }
                else {
                    this.resultsEstuarineData[estuarineKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableEstuarine.total += workingAtts.quantity;
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "wetland" && workingAtts.unit.toLowerCase() == "acre") {
                if (wetlandKey[workingProjectAtts.complete_year] === "undefined" || wetlandKey[workingProjectAtts.complete_year] == null) {
                    wetlandKey[workingProjectAtts.complete_year] = this.resultsWetlandData.length;
                    this.resultsWetlandData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableWetland.total += workingAtts.quantity;
                }
                else {
                    this.resultsWetlandData[wetlandKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableWetland.total += workingAtts.quantity;
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "upland" && workingAtts.unit.toLowerCase() == "acre") {
                if (uplandKey[workingProjectAtts.complete_year] === "undefined" || uplandKey[workingProjectAtts.complete_year] == null) {
                    uplandKey[workingProjectAtts.complete_year] = this.resultsUplandData.length;
                    this.resultsUplandData.push({ "year": workingProjectAtts.complete_year, "total": workingAtts.quantity }); //new object
                    resultsTableUpland.total += workingAtts.quantity;
                }
                else {
                    this.resultsUplandData[uplandKey[workingProjectAtts.complete_year]]["total"] += workingAtts.quantity;//sum object
                    resultsTableUpland.total += workingAtts.quantity;
                }
            }
            else if (workingAtts.activity_type.toLowerCase() == "road") {

            }

        }
                
        this._AddResultsToTable(resultsTableCrossing);
        this._AddResultsToTable(resultsTableFishHabitatMiles);
        this._AddResultsToTable(resultsTableScreens);
        this._AddResultsToTable(resultsTableInstreamMiles);
        this._AddResultsToTable(resultsTableRiparian);
        this._AddResultsToTable(resultsTableRiparianMiles);
        this._AddResultsToTable(resultsTableEstuarine);
        this._AddResultsToTable(resultsTableWetland);
        this._AddResultsToTable(resultsTableUpland);
        this._AddResultsToTable(resultsTableWaterflow);
        
        //clear when done
        this.fsResults = null;                

        //build related charts
        this.resultsCrossingsDefs = this.ShowResultsChart("", this.resultsCrossingsData, this.resultsCrossingsDefs, "total", "Crossings", true);

        this.resultsScreensDefs = this.ShowResultsChart("", this.resultsScreensData, this.resultsScreensDefs, "total", "cfs", true);
        this.resultsWaterflowDefs = this.ShowResultsChart("", this.resultsWaterflowData, this.resultsWaterflowDefs, "total", "cfs", true);

        this.resultsInstreamMilesDefs = this.ShowResultsChart("", this.resultsInstreamMilesData, this.resultsInstreamMilesDefs, "total", "Miles", true);
        this.resultsRiparianMilesDefs = this.ShowResultsChart("", this.resultsRiparianMilesData, this.resultsRiparianMilesDefs, "total", "Miles", true);
        this.resultsFishHabitatMilesDefs = this.ShowResultsChart("", this.resultsFishHabitatMilesData, this.resultsFishHabitatMilesDefs, "total", "Miles", true);

        this.resultsUplandDefs = this.ShowResultsChart("", this.resultsUplandData, this.resultsUplandDefs, "total", "Acres", true);
        this.resultsRiparianDefs = this.ShowResultsChart("", this.resultsRiparianData, this.resultsRiparianDefs, "total", "Acres", true);
        this.resultsWetlandDefs = this.ShowResultsChart("", this.resultsWetlandData, this.resultsWetlandDefs, "total", "Acres", true);
        this.resultsEstuarineDefs = this.ShowResultsChart("", this.resultsEstuarineData, this.resultsEstuarineDefs, "total", "Acres", true);
    }

    private _AddResultsToTable(resultTableObject: any) {
        resultTableObject.total = Math.round(resultTableObject.total);
        resultTableObject.display = (<any>Math.round(resultTableObject.total)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.resultsTableData.addItem(resultTableObject);
    }

    private _ProcessParticipants() {

        if (this._IsNullOrEmpty(this.fsParticipants))
            return;
        
        //participants loop
        this.fundingChartBySourceData = [];
        let fundingSourceObject: any = {};

        let partIDSummed: any = {};
        let totalPartsIncluded: number = 0;
        
        for (let i = 0; i < this.fsParticipants.features.length; i++) {
            let atts = this.fsParticipants.features[i].attributes;

            //skip duplicate participant_id's.  participants are duplicated for multiple roles...
            if (!this._IsNullOrEmpty(partIDSummed[atts.participant_id]))
                continue;
                        
            if (atts.cash < 1 && atts.inkind < 1)
                continue;

            let superType: string = "";
            //get the working super type
            if (this.participantTypeSuperTypeMap[atts.participant_type_lu_id] !== "undefined" && this.participantTypeSuperTypeMap[atts.participant_type_lu_id] != null)
                superType = this.participantTypeSuperTypeMap[atts.participant_type_lu_id];

            //investments by activity
            if (fundingSourceObject[superType] === "undefined" || fundingSourceObject[superType] == null) {                
                fundingSourceObject[superType] = atts.cash + atts.inkind;
            }
            else {                
                fundingSourceObject[superType] += atts.cash + atts.inkind;//sum
            }
            
            partIDSummed[atts.participant_id] = atts.participant_id;

            totalPartsIncluded++;
        }
        this.fundingChartBySourceData.push(fundingSourceObject);

        console.log("Participants included: "+totalPartsIncluded);
        
        this.fsParticipants = null;

        //build related chart(s)        
        this.ShowFundingSource("", true);
    }

    private _ProcessActivities() {

        if (this._IsNullOrEmpty(this.fsActivities))
            return;

        let sYearNum: number;
        let eYearNum: number;

        this.fundingChartByActivityData = [];
        let investmentsByActivityKey = {};

        this.fundingChartByActivityYearData = [];
        let investmentsByActivityByYearKey = {};

        //setup investments by activity by year
        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());
        for (let year = sYearNum; year <= eYearNum; year++) {
            investmentsByActivityByYearKey[year] = this.fundingChartByActivityYearData.length;            

            let yearActFAB: any = { "year": year };
            //add all activity types
            for (let aIndex = 0; aIndex < this.fsActivityTypeStrings.features.length; aIndex++) {
                yearActFAB[this.fsActivityTypeStrings.features[aIndex].attributes.activity_type] = 0;
            }

            this.fundingChartByActivityYearData.push(yearActFAB);
        }

        //setup by activity counts
        this.projectChartActData = [];
        var activityIndex: object = {};
                                
        //activity counts
        for (let i = 0; i < this.fsActivityTypeStrings.features.length; i++) {

            //skip any null attributes... why are these null?
            if (typeof this.fsActivityTypeStrings.features[i] === "undefined" || this.fsActivityTypeStrings.features[i] == null)
                continue;

            var workingAtt: string = this.fsActivityTypeStrings.features[i].attributes.activity_type;

            //the new year index will be the length of the array                     
            if (activityIndex[workingAtt] === "undefined" || activityIndex[workingAtt] == null)
                activityIndex[workingAtt] = this.projectChartActData.length;

            this.projectChartActData.push({ "activity": workingAtt, "count": 0 });
        }

        let PIDUsed = {};
        let PIDActUsed = {};
        let projectActivity: string;
                                
        //activities loop
        for (let rIndex = 0; rIndex < this.fsActivities.features.length; rIndex++) {
            let atts = this.fsActivities.features[rIndex].attributes;

            //project activity
            projectActivity = atts.project_nbr + atts.activity_type;

            //PID unique
            if (this._IsNullOrEmpty(PIDUsed[atts.project_nbr]))
            {
                PIDUsed[atts.project_nbr] = 1;

                //activity counts
                if (atts.activity_type)
                    this.projectChartActData[activityIndex[atts.activity_type]]["count"] += 1;
                                
            }

            //PID Activity unique
            if (this._IsNullOrEmpty(PIDActUsed[projectActivity])) {

                PIDActUsed[projectActivity] = 1;

                //investments by activity
                if (investmentsByActivityKey[atts.activity_type] === "undefined" || investmentsByActivityKey[atts.activity_type] == null) {
                    investmentsByActivityKey[atts.activity_type] = this.fundingChartByActivityData.length;
                    this.fundingChartByActivityData.push({ "activity": atts.activity_type, "total": atts.total / 1 }); //new object
                }
                else {
                    this.fundingChartByActivityData[investmentsByActivityKey[atts.activity_type]]["total"] += atts.total / 1;//sum object
                }

                //get complete year for matching project number
                let workingCompleteYear: number = 0;
                if (typeof this.projectNbrAttributesMap[atts.project_nbr] != "undefined" && this.projectNbrAttributesMap[atts.project_nbr] != null)
                    workingCompleteYear = this.projectNbrAttributesMap[atts.project_nbr]["complete_year"];
                if (typeof workingCompleteYear === "undefined" || workingCompleteYear == null || workingCompleteYear == NaN)
                    workingCompleteYear = 0;

                //skip year 0
                if (workingCompleteYear == 0)
                    continue;

                //key is year
                let actYearKey = workingCompleteYear.toString();//atts.activity_type + workingCompleteYear.toString();

                //investments by activity by year
                if (investmentsByActivityByYearKey[actYearKey] === "undefined" || investmentsByActivityByYearKey[actYearKey] == null) {

                    investmentsByActivityByYearKey[actYearKey] = this.fundingChartByActivityYearData.length;

                    let yearActFAB: any = { "year": actYearKey };
                    //add all activity types
                    for (let aIndex = 0; aIndex < this.fsActivityTypeStrings.features.length; aIndex++) {
                        yearActFAB[this.fsActivityTypeStrings.features[aIndex].attributes.activity_type] = 0;
                    }

                    yearActFAB[atts.activity_type] = atts.total;

                    this.fundingChartByActivityYearData.push(yearActFAB); //new object                
                }
                else {
                    this.fundingChartByActivityYearData[investmentsByActivityByYearKey[actYearKey]][atts.activity_type] += atts.total;//sum object
                }
            }
                        
        }

        this.projectChartActData.sort((a: any, b: any) => {
            if (a.activity < b.activity) return -1;
            if (a.activity > b.activity) return 1;
            return 0;
        });

        this.projectChartActData.reverse();
        
        this.fsActivities = null;

        //build related chart(s)
        this.ShowProjectsActivity("", true);        
        this.ShowFundingActivity("", true);
        this.ShowFundingActivityYear("", true);
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

    public BuildChart(targetChart:string, chartConfig: any, chartData: any, targetRegionID: string, widthIn:number) {

        //destry the active chart
        this._destoryActiveChart(targetChart);
                
        let chartDefinition = new ChartDefinition(chartConfig);

        // Create chart view model from chart config & data.
        let chartViewModel = this.chartFactory.createInstance(<any>chartDefinition, ChartFeatureType.SingleFeature, chartData);        
        chartViewModel.width.set(widthIn);

        // Create the chart.
        let chart = <any>this.app.viewManager.createView({
            markupResource: "Charting/charting/Chart.html",
            typeName: "geocortex.charting.Chart",
            isVisible: true,
            libraryId: "Charting",
            regionName: targetRegionID
        });

        // Attach the view to the view model. This will cause all of its binding expressions to be evaluated.
        chart.attach(chartViewModel);

        this[targetChart] = chart;
    }
            
    private _destoryActiveChart(targetName:string ) {
        if (this[targetName]) {
            this.app.command("DestroyView").execute(this[targetName].id);
        }
        this[targetName] = null;                
    }

    private _destroyAllCharts() {

        if (this.projectChart)
            this.app.command("DestroyView").execute(this.projectChart.id);
        this.projectChart = null;

        if (this.fundingChart)
            this.app.command("DestroyView").execute(this.fundingChart.id);
        this.fundingChart = null;

        if (this.resultsChart)
            this.app.command("DestroyView").execute(this.resultsChart.id);
        this.resultsChart = null;
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
        //project points
        //this.esriProjectLayer.setDefinitionExpression(this.esriMapPrimaryQuery.get());  

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
                                                
                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/40");
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

            /*if (workingChart == "crossing")
                this.ShowResultsChart(workingChart, this.resultsCrossingsData, this.resultsCrossingsDefs, "total", "Crossings");
            else if (workingChart == "upland")
                this.ShowResultsChart(workingChart, this.resultsUplandData, this.resultsUplandDefs, "total", "Acres");
            else if (workingChart == "riparian")
                this.ShowResultsChart(workingChart, this.resultsRiparianData, this.resultsRiparianDefs, "total", "Acres");                
            else if (workingChart == "wetland")
                this.ShowResultsChart(workingChart, this.resultsWetlandData, this.resultsWetlandDefs, "total", "Acres");
            else if (workingChart == "estuarine")
                this.ShowResultsChart(workingChart, this.resultsEstuarineData, this.resultsEstuarineDefs, "total", "Acres");
            else if (workingChart == "waterflow")
                this.ShowResultsChart(workingChart, this.resultsWaterflowData, this.resultsWaterflowDefs, "total", "CFS");
            else if (workingChart == "screens")
                this.ShowResultsChart(workingChart, this.resultsScreensData, this.resultsScreensDefs, "total", "CFS");
            else if (workingChart == "instreamMiles")
                this.ShowResultsChart(workingChart, this.resultsInstreamMilesData, this.resultsInstreamMilesDefs, "total", "Miles");
            else if (workingChart == "fishHabitatMiles")
                this.ShowResultsChart(workingChart, this.resultsFishHabitatMilesData, this.resultsFishHabitatMilesDefs, "total", "Miles");
            else if (workingChart == "riparianMiles")
                this.ShowResultsChart(workingChart, this.resultsRiparianMilesData, this.resultsRiparianMilesDefs, "total", "Miles");*/

            this.lastResultsChartName = this.activeTabChartName;
        }
    }
        
    private initializeChartFactory(): void {

        let chartingLibraryId = "Charting";        
        let numberAndDateFormatter = new KendoFormatProvider();
        let seriesProvider = new ChartSeriesProvider(<any>this.app, chartingLibraryId);
        let aggregator = new ChartPointCollectionAggregator();
        aggregator.formatProvider = numberAndDateFormatter;

        this.chartFactory = new ChartViewModelFactory(<any>this.app, chartingLibraryId);
        this.chartFactory.id = "ChartViewModelFactory";
                
        this.chartFactory.initialize(<any>{
            formatProvider: numberAndDateFormatter,
            seriesProvider: seriesProvider,
            aggregator: aggregator
        });

        this.app.registerFrameworkObject(<any>this.chartFactory);
    }
    
    private _BuildRestChartDefinition(idIn: string, displayName: string, chartType: string, enableCommonSeriesRange: boolean, flipChart: boolean,
        catDefs: RestChartCategoryDefinition, areaDef: RestChartAreaDefinition ): RestChartDefinition {

        //chartType = Pie, Linear
        //enableCommonSeriesRange = true for linear types?

        //category is the horizontal axis for a bar chart

        if (areaDef == null)
        {
            areaDef = {
                background: [255, 255, 255, 255],
                foreground: [0, 0, 0, 255],
                showLabels: true,
                colorPalette: ChartColorPalette.Rainbow,
                showToolTips: true,
                actionSelect: false,
                actionPan: false,
                actionZoom: false,
                actionFeatureDetails: false,
                actionRunCommand: false,
                enableCommonSeriesRange: enableCommonSeriesRange
            }
        }

        let json: RestChartDefinition = {
            id: idIn,
            displayName: displayName,
            visible: true,
            flipChart: flipChart,
            chartType: chartType,                        
            area: areaDef,
            legend: {
                position: "Bottom"
            },
            category: catDefs,
            series: []
        }

        return json;
    }
        
    private _BuildRestChartDefinitionSeriesItem(chartDef: RestChartDefinition, title: string, fieldName: string, colorsToUse: any, valueFormat: string,
        seriesType: string = "Bar", axisIn: RestChartAxisDefinition = null) {

        //valueFormat = microsoft style field format values?  C0, F2

        if (axisIn == null)
        {
            axisIn = {};
            axisIn.visible = false;
            axisIn.showLabels = true;
            axisIn.showTicks = true;
        }
                
        var obj: RestChartSeriesDefinition = {
            id: chartDef.series.length.toString(),
            title: title,
            seriesType: seriesType,
            valueFormat: valueFormat,
            color: colorsToUse[chartDef.series.length],
            field: {
                name: fieldName,
                displayFormat: "",
                sortingFormat: "000000000000000.###############",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: axisIn
        }
                                               
        chartDef.series.push(obj);
    }

    private _FindActivitySymbolColor(activityType: string, cssType: boolean = true): any {

        for (let i = 0; i < this.owrtActivitySymbols.length; i++) {
            var valueString = this.owrtActivitySymbols[i].value;

            if (valueString.toLowerCase() == activityType.toLowerCase()) {
                if (cssType) {
                    var colorOut = "background-color: rgb(";

                    //drop off the alpha value for IE support                    
                    var colorArray: Array<number> = this.owrtActivitySymbols[i].symbol.color.slice()
                    colorArray.pop();

                    //drop off the alpha value for IE support
                    //let maxIndex = this.owrtActivitySymbols[i].symbol.color.length - 1;

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

                    return colorArray;
                }                
                //return "background-color: rgb(" + this.owrtActivitySymbols[i].symbol.color.toString() + ")";
            }
        }

        //default color
        return "background-color: rgb(255, 99, 71)";
    }

    private _generateRGBArrayFromCount(maxColors: number) {

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

        var colorsOut = [];

        //return a single color
        if (maxColors == 1) {
            colorsOut.push([224, 100, 50]);
            return colorsOut;
        }

        // distribute the colors evenly on
        // the hue range (the 'H' in HSV)
        var i = 360 / (maxColors - 1);

        // hold the generated colors        
        var sv = 70;
        for (var x = 0; x < maxColors; x++) {
            // alternate the s, v for more
            // contrast between the colors.
            sv = sv > 90 ? 70 : sv + 10;
            colorsOut.push(hsvToRgb(i * x, sv, sv));
        }

        return colorsOut;
    }
    
}