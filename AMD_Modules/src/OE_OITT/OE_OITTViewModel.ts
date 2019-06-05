/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { MapService } from "geocortex/essentials/MapService";
import { Layer } from "geocortex/essentials/Layer";

import { ChartPointAdapterRegistry } from "geocortex/charting/infrastructure/ChartPointAdapterRegistry"
import { ChartPointCollectionAggregator } from "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregator";
import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
import { ChartColorPalette, ChartFeatureType, ChartFieldSourceType } from "geocortex/charting/infrastructure/Enums";

import { OE_ChartPointJsonAdapter } from "../OE_OITT/OE_JsonAdapter";

export class OE_QuerySequenceTask {

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
    modelRef: OE_OITTViewModel;

    listeners: any[];

    errors: any;

    public SetupRequest(
        urlIn: string,
        whereIn: string,
        queryGeometryIn: esri.geometry.Geometry,
        fieldNamesIn: string[],
        logNameIn: string,
        onCompleteIn: any,
        modelRefIn: OE_OITTViewModel,
        targetFeatureSetIn: string,
        isDistinctIn: boolean = false): void {

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

    private _GetMaxeRecordCount(queryUrl: string): void {

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

            if (event.count > 0) {
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
            else {
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

    private _CheckIfLoopIsDone(): void {

        this.workingOffset += this.maxRecordCount;

        //request more records
        if (this.workingOffset < this.totalRecords) {
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

        if (typeof this.targetFeatureSet !== "undefined" && this.targetFeatureSet != null && this.targetFeatureSet != "")
            this.modelRef[this.targetFeatureSet] = this.allFeatures;

        if (this.onComplete)
            this.onComplete();
    }
}


export class OE_OITTViewModel extends ViewModelBase {

    app: ViewerApplication;
    //greeting: Observable<string> = new Observable<string>();

    esriMap: esri.Map;
    esriAreaLayer: esri.layers.FeatureLayer;
    esriMapSymbolFill: esri.symbol.SimpleFillSymbol;
    //esriMapLayerDefs: string[];
    esirMapPointLayers: esri.layers.FeatureLayer[];    
    esriPointsLayer: esri.layers.ArcGISDynamicMapServiceLayer = null;
    areaMapLegend: Observable<string> = new Observable<string>("Map");
    owrtActivitySymbols: any[] = [];
    layerIDProjectPoints: number;

    fsSelectedAreaGeometry: esri.tasks.FeatureSet = null;
    selectedAreaGeometry: esri.geometry.Polygon = null;

    sequenceTasks: OE_QuerySequenceTask[] = [];
    sequenceErrors: string = "";
    sequenceOnComplete: any = null;
    sequenceLastTask: OE_QuerySequenceTask = null;

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

    fsProjectTypes: esri.tasks.FeatureSet = null;
    projectsGraphicsArray: esri.Graphic[] = null;

    reportWorkingQuery: string;
    primaryQueryString: Observable<string> = new Observable<string>("1=1");

    pipeParamsFromURL: string;

    urlMainMapService: string;
    queryURLProjects: string;
        
    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading Report...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(true);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);

    requiredFeaturesLoaded: Observable<boolean> = new Observable<boolean>(false);

    toggleReportOptionPanel: Observable<boolean> = new Observable<boolean>(false);

    yearRangeSlider: any;
    optionsImageSrc: Observable<string> = new Observable<string>("Resources/Images/Icons/arrow-right-small-24.png");
    reportOptionsPanelVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaListVisible: Observable<boolean> = new Observable<boolean>(false);
    reportAreaList: ObservableCollection<object> = new ObservableCollection<object>(null);

    minYear: number = 1999;
    maxYear: number = 2018;
    startYearDefault: number = 2014;
    endYearDefault: number = 2018;

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

    

    //tabs
    tabOverviewClass: Observable<string> = new Observable<string>("oittAreaTabEnabled");
    tabProjectsClass: Observable<string> = new Observable<string>("");
    tabFundingClass: Observable<string> = new Observable<string>("");

    //tab charts
    kChartActive: kendo.dataviz.ui.Chart;

    oittProjChartYearClass: Observable<string> = new Observable<string>("oittChartSelectionBoxSelected");
    oittProjChartTypeClass: Observable<string> = new Observable<string>("");

    oittFundingChartTotalClass: Observable<string> = new Observable<string>("oittChartSelectionBoxSelected");
    oittFundingChartYearClass: Observable<string> = new Observable<string>("");
    oittFundingChartTypeClass: Observable<string> = new Observable<string>("");
    oittFundingChartTypeYearClass: Observable<string> = new Observable<string>("");    
    
    //table view
    oittTableLinkText: Observable<string> = new Observable<string>("Table View");
    oittTableLinkImg: Observable<string> = new Observable<string>("Resources/Images/Icons/paging-control-table-24.png");
    oittChartTableLinkVisible: Observable<boolean> = new Observable<boolean>(false);
    oittChartsTableContainerVisible: Observable<boolean> = new Observable<boolean>(false);

    oittChartsTableSharedVisible: Observable<boolean> = new Observable<boolean>(false);
    oittChartsTableFundYearVisible: Observable<boolean> = new Observable<boolean>(false);
    oittChartsTableFundTypeYearVisible: Observable<boolean> = new Observable<boolean>(false);
        
    //shared table
    oittTableHdrName: Observable<string> = new Observable<string>("");
    oittTableHdrValue: Observable<string> = new Observable<string>("");
    oittTableData: ObservableCollection<object> = new ObservableCollection<object>(null); //{"name:"","value":0}    

    //funding invest by year table
    oittTableDataFundInvestByYear: ObservableCollection<object> = new ObservableCollection<object>(null); //{"year:0,"fund":0,"fed":0}    

    //funding invest by act by year table
    oittTableDataFundInvestByTypeByYearHeaders: ObservableCollection<object> = new ObservableCollection<object>(null); //{"n":"Header Name"}
    oittTableDataFundInvestByTypeByYear: ObservableCollection<object> = new ObservableCollection<object>(null); //{"year:0,"river":0,"upland":0,"instream":0.....etc}    
        
    //panels
    areaPanelOverviewVisisble: Observable<boolean> = new Observable<boolean>(true);
    areaPanelProjectsVisisble: Observable<boolean> = new Observable<boolean>(false);
    areaPanelFundingVisisble: Observable<boolean> = new Observable<boolean>(false);
    
    //area totals
    areaTotalProjects: Observable<string> = new Observable<string>("0");
    areaTotalInvestment: Observable<string> = new Observable<string>("0");
    areaTotalFunds: number;
    areaTotalFed: number;
        
    //chart data sets
    activeTabChartName: string;
    lastProjectTabChartName: string;
    lastFundingTabChartName: string;
    
    projectChart: any;
    projectChartString: string;
    projectChartLegendText: Observable<string> = new Observable<string>("");
        
    chartProjectYearCount: object[]; //{"y":2000,"c":39}
    chartDefsProjectYearCount: any;

    chartProjectTypeCount: object[]; //{"t":"River","c":39}
    chartDefsProjectTypeCount: any;

    fundingChart: any;
    fundingChartString: string;
    fundingChartLegendText: Observable<string> = new Observable<string>("");

    chartFundingTotal: object[]; //{"funding":0,"federal":0}
    chartDefsFundingTotal: any;

    chartFundingYear: object[]; //{"y":2000,"s":1324344}
    chartDefsFundingYear: any;

    chartFundingType: object[]; //{"t":"River,"s":335435}
    chartDefsFundingType: any;

    chartFundingTypeYear: object[]; //{"2000":,"river":54841}
    chartDefsFundingTypeYear: any;       

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

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

    _onSiteInitialized() {

        //register tagging command
        this.app.commandRegistry.command("oeOITTAreaReport").register(this, this.OpenAreaReport);

        //set default year selection
        let dateTmp = new Date();
        let workingYear: number = dateTmp.getFullYear();
        if (workingYear > this.endYearDefault)
            workingYear = this.endYearDefault;

        this.startYearDefault = workingYear - 5;

        this._SetupJQueryTableSort();

        // Register our custom JSON data adapter with the charting infrastructure.
        //let jsonDataAdapter = new OE_ChartPointJsonAdapter();
        //let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
        //ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);
        
        //let mService = this._GetServiceByName("OWRT");
        let mService = this._GetServiceByName("OITT_2016");
        this.urlMainMapService = mService.serviceUrl;
        this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "Projects_Cluster_Scales").id);
        this.queryURLProjects = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Projects_Cluster_Scales").id;        

        this.queryUrlCounty = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Counties").id;
        this.queryUrlBasins = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Plan Basins").id;
        this.queryUrlHUC8 = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "8-Digit Hydrologic Unit Code").id;
        this.queryUrlWSC = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Watershed Councils").id;

        mService = this._GetServiceByName("Soil and Water Conservation District Boundaries (WM)");
        //this.urlSWCDMapService = mService.serviceUrl;
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

        //get the OWRT drawing color data
        var requestHandle = esri.request({
            "url": this.queryURLProjects + "?f=json",
            handleAs: "json",
            callbackParamName: "callback"
        });
        requestHandle.then(
            (response, io) => {
                //console.log(response);
                if (response && response.drawingInfo && response.drawingInfo.renderer && response.drawingInfo.renderer.uniqueValueInfos) {
                    this.owrtActivitySymbols = response.drawingInfo.renderer.uniqueValueInfos;
                }
            },
            (error, io) => {
                console.log("OITT symbol request error: " + error);
                this.owrtActivitySymbols = [];
            }
        );
    }

    deactivated() {
        this._destroyAllCharts();
        //remove all map layers
        if (!this._IsNullOrEmpty(this.esriMap))
            this.esriMap.removeAllLayers();
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

    private _GetRequredFeatureSets() {

        //clear tasks
        this.sequenceTasks = [];

        //setup a new sequence        
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._RequiredFeatureSetsDone; //when the follow sequence of queries are done build the relationships

        this._sequenceQuery(this.queryUrlBasins, "1=1", ["oweb_name"], "fsBasins", "", "Basins");
        this._sequenceQuery(this.queryUrlHUC8, "1=1", ["name"], "fsHUC8", "", "HUC8");
        this._sequenceQuery(this.queryUrlCounty, "1=1", ["name10"], "fsCounty", "", "Counties");
        this._sequenceQuery(this.queryUrlWSC, "1=1", ["instname"], "fsWSC", "", "WSC");
        this._sequenceQuery(this.queryUrlSWCD, "1=1", ["SWCD_Name"], "fsSWCD", "", "SWCD");

        //types
        this._sequenceQuery(this.queryURLProjects, "1=1", ["ProjectType"], "fsProjectTypes", "", "Project Types", false, true, ["ProjectType"]);

        this._MoveCurrentSequenceProgress();
    }

    private _RequiredFeatureSetsDone() {

        this.requiredFeaturesLoaded.set(true);

        if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
            this._LoadReportFromURLParams();
        else
            this.ReportOptionsSubmission();
    }

    public OpenAreaReport(pipeParamsIn: string) {

        this.app.commandRegistry.command("ActivateView").execute("OE_OITTView");
                
        this._LoaderStateSet(true, "Loading Report...");

        $(".owrtChartTableShared").tablesort();
        $(".owrtChartTableFundInvestByYear").tablesort();
        //$(".owrtChartTableFundInvestByActByYear").tablesort();

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
        

        let thisView = this;

        if (this._IsNullOrEmpty(this.yearRangeSlider)) {
            this.yearRangeSlider = new kendo.ui.RangeSlider(document.getElementsByClassName("owrtYearSlider")[0],
                {
                    orientation: "horizontal",
                    min: this.minYear,
                    max: this.maxYear,
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
        else {            
            this._YearSliderChange(this.startYear.get(), this.endYear.get());
        } 

        //check for url paramemters, use these later to load this report
        if (!this._IsNullOrEmpty(pipeParamsIn))
            this.pipeParamsFromURL = pipeParamsIn;

        if (this.requiredFeaturesLoaded.get()) {
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

    private _BuildReportQuery(queryString: string) {

        if (this._IsNullOrEmpty(queryString) || queryString.length < 1)
            this.reportWorkingQuery = "1=1";
        else
            this.reportWorkingQuery = queryString;
    }

    public ReportOptionsSubmission() {

        this.reportOptionsPanelVisible.set(false);
        this._LoaderStateSet(true, "Loading report...");

        //clear all active charts
        this._destroyAllCharts();                        

        this.projectChart = null;
        this.fundingChart = null;
        this.lastFundingTabChartName = null;
        this.lastProjectTabChartName = null;
        this.activeTabChartName = "";
        this.projectChartString = null;
        this.fundingChartString = null;
                
        this._BuildReportQuery(this.primaryQueryString.get());

        //this.reportWorkingQuery = whereIn;
        this.fsSelectedAreaGeometry = null;
                
        //geometry is needed to query the main records set (basin, county, wsc, swcd)
        if (this.geoTypeGeometryLayerDef.get() != "") {
            this._GetReportGeometry();
        }
        else {
            this._GetReportFeatureSets(this.reportWorkingQuery);
        }             
    }

    private _destroyAllCharts() {

        if (this.projectChart)
            this.app.command("DestroyView").execute(this.projectChart.id);
        this.projectChart = null;

        if (this.fundingChart)
            this.app.command("DestroyView").execute(this.fundingChart.id);
        this.fundingChart = null;        
    }

    private _GetReportFeatureSets(queryIn:string)
    {
        this._NewSequence(this._GetReportFeatureSetsDone);

        this.selectedAreaGeometry = null;

        var queryGeometry: esri.geometry.Geometry = null;
        if (this.fsSelectedAreaGeometry != null) {
            queryGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
            this.selectedAreaGeometry = <esri.geometry.Polygon>this.fsSelectedAreaGeometry.features[0].geometry;
        }

        this._sequenceQueryLarge(this.queryURLProjects, queryIn, queryGeometry,
            ["OBJECTID", "ApplicationNbr", "ProjectType", "FundedAmount", "FederalFunds", "STATUS","YearEnd"],
            "projectsGraphicsArray", "Projects", false);
        
        this._MoveCurrentSequenceProgress();
    }

    private _GetReportFeatureSetsDone() {

        console.log("Projects: " + this.projectsGraphicsArray.length);

        this._loadEsirMap(this);

        this.areaTotalProjects.set("0");
        this.areaTotalInvestment.set("$0");
        let totalInvestment: number = 0;

        this.areaTotalFunds = 0;
        this.areaTotalFed = 0;

        let projectTypeCounts = {};
        //build project types map
        for (let i = 0; i < this.fsProjectTypes.features.length; i++)
        {
            projectTypeCounts[this.fsProjectTypes.features[i].attributes.ProjectType] = 0;
        }

        //project year counts
        let sYearNum:number = Number(this.startYear.get());
        let eYearNum: number = Number(this.endYear.get());
                
        let keyProjectYearCount = {};
        this.chartProjectYearCount = [];

        for (let year = sYearNum; year <= eYearNum; year++) {
            keyProjectYearCount[year] = this.chartProjectYearCount.length;
            this.chartProjectYearCount.push({ "y": year, "c": 0}); //new object
        }

        //project type counts
        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());

        let keyProjectTypeCount = {};
        this.chartProjectTypeCount = [];

        for (let i = 0; i < this.fsProjectTypes.features.length; i++) {

            let pType = this.fsProjectTypes.features[i].attributes.ProjectType;

            keyProjectTypeCount[pType] = this.chartProjectTypeCount.length;
            this.chartProjectTypeCount.push({ "t": pType, "c": 0 }); //new object
        }

        //funding by year
        this.chartFundingYear = [];
        let keyFundingYear = {};

        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());

        for (let year = sYearNum; year <= eYearNum; year++) {
            keyFundingYear[year] = this.chartFundingYear.length;
            this.chartFundingYear.push({ "y": year, "fund": 0, "fed": 0 }); //new object
        }

        //funding by activity
        this.chartFundingType = [];
        let keyFundingType = {};

        for (let i = 0; i < this.fsProjectTypes.features.length; i++)
        {
            let atts = this.fsProjectTypes.features[i].attributes;

            keyFundingType[atts.ProjectType] = this.chartFundingType.length;
            this.chartFundingType.push({ "t": atts.ProjectType, "s": 0 }); //new object
        }

        //let lowestTypeFunding = 1000000;


        //funding by activity by year
        this.chartFundingTypeYear = [];
        let keyFundingTypeYear = {};

        sYearNum = Number(this.startYear.get());
        eYearNum = Number(this.endYear.get());
        for (let year = sYearNum; year <= eYearNum; year++) {
            keyFundingTypeYear[year] = this.chartFundingTypeYear.length;

            let yearActFAB: any = { "year": year };
            //add all activity types
            for (let aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                yearActFAB[this.fsProjectTypes.features[aIndex].attributes.ProjectType] = 0;
            }

            this.chartFundingTypeYear.push(yearActFAB);
        }

        //loop over projects
        if (this.projectsGraphicsArray.length > 0) {

            this.areaTotalProjects.set(this.projectsGraphicsArray.length.toLocaleString('en'));

            for (let i = 0; i < this.projectsGraphicsArray.length; i++)
            {
                let atts = this.projectsGraphicsArray[i].attributes;

                //investment
                totalInvestment += Number(atts.FundedAmount);
                this.areaTotalFunds += Number(atts.FundedAmount);

                //any federal funds?
                if (!this._IsNullOrEmpty(atts.FederalFunds) && atts.FederalFunds.toString() != "null")
                {
                    //totalInvestment += Number(atts.FederalFunds);
                    this.areaTotalFed += Number(atts.FederalFunds);
                }

                //funding by year
                if (!this._IsNullOrEmpty(keyFundingYear[atts.YearEnd]))
                {
                    (<any>this.chartFundingYear[keyFundingYear[atts.YearEnd]]).fund += atts.FundedAmount;
                    (<any>this.chartFundingYear[keyFundingYear[atts.YearEnd]]).fed += atts.FederalFunds;
                }

                //funding by ProjectType
                if (!this._IsNullOrEmpty(keyFundingType[atts.ProjectType])) {
                    (<any>this.chartFundingType[keyFundingType[atts.ProjectType]]).s += (atts.FundedAmount + atts.FederalFunds);

                    //if (lowestTypeFunding < (<any>this.chartFundingType[keyFundingType[atts.ProjectType]]).s)
                      //  lowestTypeFunding = (<any>this.chartFundingType[keyFundingType[atts.ProjectType]]).s;
                }
                                    
                //project counts
                if (!this._IsNullOrEmpty(projectTypeCounts[atts.ProjectType]))
                    projectTypeCounts[atts.ProjectType] += 1;


                //project year counts
                if (!this._IsNullOrEmpty(keyProjectYearCount[Number(atts.YearEnd)]))
                    (<any>this.chartProjectYearCount[keyProjectYearCount[Number(atts.YearEnd)]]).c += 1;

                //project type counts
                if (!this._IsNullOrEmpty(keyProjectTypeCount[atts.ProjectType]))
                    (<any>this.chartProjectTypeCount[keyProjectTypeCount[atts.ProjectType]]).c += 1;

                //funding by type by year

                //key is year
                let actYearKey = atts.YearEnd.toString();
                let numYear = parseInt(atts.YearEnd);

                //get complete year for matching project number                
                if ( isNaN(numYear) || this._IsNullOrEmpty(keyFundingTypeYear[numYear]) || numYear == 0 )
                    continue;                

                //check for new key year
                if (this._IsNullOrEmpty(keyFundingTypeYear[actYearKey])) {

                    keyFundingTypeYear[actYearKey] = this.chartFundingTypeYear.length;

                    let yearActFAB: any = { "year": actYearKey };
                    //add all activity types
                    for (let aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                        yearActFAB[this.fsProjectTypes.features[aIndex].attributes.ProjectType] = 0;
                    }

                    yearActFAB[atts.ProjectType] = atts.FundedAmount + atts.FederalFunds;

                    this.chartFundingTypeYear.push(yearActFAB); //new object                
                }
                else {
                    this.chartFundingTypeYear[keyFundingTypeYear[actYearKey]][atts.ProjectType] += atts.FundedAmount + atts.FederalFunds; //sum
                }

            }

            
            //funding by ProjectType divider
            /*if (lowestTypeFunding > 100,000) {                
                for (let i = 0; i < this.chartFundingType.length; i++)
                {
                    (<any>this.chartFundingType[i]).s = (<any>this.chartFundingType[i]).s / lowestTypeFunding;
                }
            }*/

            this.areaTotalInvestment.set("$"+totalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
        }

        //build chart definitions
        this.ChartProjectYearCount("", true);
        this.ChartProjectTypeCount("", true);

        this.ChartFundingTotal("", true);
        this.ChartFundingByProjectType("", true);
        this.ChartFundingByYear("", true);
        this.ChartFundingByTypeByYear("", true);

        //change to overview tab
        this.LoadOverviewTab();

        this._LoaderStateSet(false);                
    }
        
    private _LoadReportFromURLParams() {

        //check for url paramemters
        if (!this._IsNullOrEmpty(this.pipeParamsFromURL)) {

            //decode
            this.pipeParamsFromURL = decodeURIComponent(this.pipeParamsFromURL);

            //geoType | areaType | years
            var paramStrings: string[] = this.pipeParamsFromURL.split("|");

            this.pipeParamsFromURL = null;

            //set years first
            if (!this._IsNullOrEmpty(paramStrings[2], 0)) {

                var years: string[] = paramStrings[2].split(",");

                if (years.length > 1) {
                    this._YearSliderChange(years[0], years[years.length - 1]);
                    //this.OptionsYearStartChanged(years[0]);
                    //this.OptionsYearEndChanged(years[years.length - 1]);
                }
            }
            else
            {
                this._YearSliderChange(this.minYear.toString(), this.maxYear.toString());
            }

            //set geotype and areaselection
            if (!this._IsNullOrEmpty(paramStrings[0], 0) && !this._IsNullOrEmpty(paramStrings[1], 0)) {
                this.geoTypeValue.set(paramStrings[0]);
                this.OptionsGeoTypeChanged(paramStrings[0], paramStrings[0], paramStrings[1]);
            }
                        
            this.ReportOptionsSubmission();
        }
    }

    private _YearSliderChanged() {
        let val = this.yearRangeSlider.value();

        this.startYear.set(val[0].toString());
        this.endYear.set(val[1].toString());

        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }

    private _YearSliderChange(minVal: string, maxVal: string) {
        this.startYear.set(minVal);
        this.endYear.set(maxVal);

        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());

        this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
    }

    private _GetGeoTypeNameByValue(valueIn: string): string {

        for (let i = 0; i < this.geoTypeList.getLength(); i++) {
            if ((<any>this.geoTypeList.getAt(i)).value.toLowerCase() == valueIn.toLowerCase())
                return (<any>this.geoTypeList.getAt(i)).name;
        }

        return valueIn;
    }

    public OptionsGeoTypeChanged(geoTypeValueIn: string, geoTypeName: string, forceAreaSelection: string = null) {
        //console.log(geoTypeSelected);

        //force the geotype name if there is a matching value
        this.geoTypeName.set(this._GetGeoTypeNameByValue(geoTypeValueIn));

        this.geoTypeValue.set(geoTypeValueIn);

        this.reportAreaListVisible.set(true);
        this.areaNameVisisble.set(true);

        switch (geoTypeValueIn) {
            case "basin":
                this.areaNamePointsQueryString.set("");
                this.areaNamePolyQueryString.set("UPPER(oweb_name) =");
                this._BuildAreaList(this.fsBasins, "oweb_name", "oweb_name", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlBasins;
                break;
            case "subbasin":
                this.areaNamePointsQueryString.set("");
                this.areaNamePolyQueryString.set("UPPER(name) =");
                this._BuildAreaList(this.fsHUC8, "name", "name", forceAreaSelection);
                this.selectedAreaQueryUrl = this.queryUrlHUC8;
                break;
            case "county":
                this.areaNamePointsQueryString.set("");
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

    private _BuildAreaList(fsIn: esri.tasks.FeatureSet, nameField: string, valueField: string, setValue: string = null) {
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
                this.OptionsAreaChanged(workingObject["value"], workingObject["name"]);

            this.reportAreaList.addItem(workingObject);
        }

        //force a selection
        if (!this._IsNullOrEmpty(setValue, 0))
            this.OptionsAreaChanged(setValue, setValue);
    }

    /*public OptionsYearStartChanged(value: string) {
        this.startYear.set(value);
        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }

    public OptionsYearEndChanged(value: string) {
        this.endYear.set(value);
        this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
        this.BuildOptionsQuery();
    }*/

    public OptionsAreaChanged(areaValue: string, areaNameIn: string) {
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
        if (typeof searchValue !== "undefined" && searchValue != null && searchValue.length > 0) {
            queryString += " '" + searchValue + "'";

            //This basin name is different between the basin layer and the projects layer.  Projects layer has spaces in it....
            queryString = queryString.replace("Owyhee-Malheur".toUpperCase(), "Owyhee - Malheur".toUpperCase());
        }

        //wsc and swcd are selected by geometry only, set query to 1=1
        //if (this.geoTypeValue.get() == "wsc" || this.geoTypeValue.get() == "swcd")
        //all queries are selected by state or geometry
        queryString = "1=1";

        queryString += " AND YearStart BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();

        this.primaryQueryString.set(queryString);
    }

    private _LoaderStateSet(showLoader:boolean, messageIn:string="", isError:boolean=false) {

        this.loaderVisible.set(showLoader);
        this.loaderMessage.set(messageIn);
        this.loaderSpinner.set(!isError);

        this.loaderWarnIcon.set(isError);
        this.inputBlockOnError.set(isError);
    }

    public ResetAllTabs() {
        this.tabOverviewClass.set("");
        this.tabProjectsClass.set("");
        this.tabFundingClass.set("");

        this.areaPanelOverviewVisisble.set(false);
        this.areaPanelProjectsVisisble.set(false);
        this.areaPanelFundingVisisble.set(false);
    }

    public LoadOverviewTab() {
        this.ResetAllTabs();
        this.CloseChartTableView();
        this.oittChartTableLinkVisible.set(false);
        this.tabOverviewClass.set("oittAreaTabEnabled");
        this.areaPanelOverviewVisisble.set(true);

        this._LoaderStateSet(false);
    }

    public LoadProjectsTab() {

        this.ResetAllTabs();
        this.CloseChartTableView();
        this.oittChartTableLinkVisible.set(true);
        this.tabProjectsClass.set("oittAreaTabEnabled");
        this.areaPanelProjectsVisisble.set(true);
                
        this._LoaderStateSet(false);

        if (!this.projectChart)
            this.ShowChart("projects", "year");
        else if (!this._IsNullOrEmpty(this.lastProjectTabChartName) && this.lastProjectTabChartName != "")
        {
            this.activeTabChartName = this.lastProjectTabChartName;
        }
        else
        {
            this.activeTabChartName = this.projectChartString;
        }
            
    }

    public LoadFundingTab() {
        this.ResetAllTabs();
        this.CloseChartTableView();
        this.oittChartTableLinkVisible.set(true);
        this.tabFundingClass.set("oeOWRTAreaTabEnabled");
        this.areaPanelFundingVisisble.set(true);

        this._LoaderStateSet(false);
                
        if (!this.fundingChart)
            this.ShowChart("funding", "total");
        else if (!this._IsNullOrEmpty(this.lastFundingTabChartName) && this.lastFundingTabChartName != "")
        {
            this.activeTabChartName = this.lastFundingTabChartName;
        }
        else
        {
            this.activeTabChartName = this.fundingChartString;
        }
    }

    public CloseChartTableView() {
        this.oittChartsTableContainerVisible.set(false);
        this.oittTableLinkText.set("Table View");
        this.oittTableLinkImg.set("Resources/Images/Icons/paging-control-table-24.png");

        this.HideAllTableViews();
    }

    public HideAllTableViews() {
        this.oittChartsTableSharedVisible.set(false);
        this.oittChartsTableFundYearVisible.set(false);
        this.oittChartsTableFundTypeYearVisible.set(false);
    }

    public ToggleOptionsArrow(val: boolean) {
        if (val)
            this.optionsImageSrc.set("Resources/Images/Icons/arrow-right-small-24.png");
        else
            this.optionsImageSrc.set("Resources/Images/Icons/arrow-down-small-16.png");
    }

    private _loadEsirMap(thisView: OE_OITTViewModel) {

        if (typeof this.esriMap == "undefined" || this.esriMap == null) {
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
                if (viewThis.esriAreaLayer == null) {
                    viewThis.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);
                }

                //load all the layers
                viewThis._LoadMapLayers();
            });
        }
        else {
            //area layer
            this._GeoTypeLayerToDisplay(this);

            if (this.esriAreaLayer == null)
                this.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);

            //load all the layers
            this._LoadMapLayers();
        }
    }

    private _LoadMapLayers() {

        //remove old layers
        if (!this._IsNullOrEmpty(this.esirMapPointLayers)) {
            for (let i = 0; i < this.esirMapPointLayers.length; i++) {
                this.esriMap.removeLayer(this.esirMapPointLayers[i]);
            }
        }
                
        //this.esriMapLayerDefs = [];

        let mapQuery = "";
        
        //load all points on a single layer?
        if (this.geoTypeValue.get().toLowerCase() == "state") {

            mapQuery = "1=1 AND YearEnd BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();            
            //this.esriMapLayerDefs.push(stateQuery);
        }
        else
        {
            let objectids = "";

            for (let i = 0; i < this.projectsGraphicsArray.length; i++) {
                
                if (objectids != "")
                    objectids += ",";

                objectids += this.projectsGraphicsArray[i].attributes["OBJECTID"];
            }

            objectids = "OBJECTID IN (" + objectids + ")";

            mapQuery = objectids;
        }

        if (this._IsNullOrEmpty(mapQuery) || mapQuery.length < 1) {
            this.areaMapLegend.set("Map");
            return;
        }

        console.log("Map query: " + mapQuery);
                
        let defsIn: string[] = [];
        defsIn[this.layerIDProjectPoints] = mapQuery;

        if (this._IsNullOrEmpty(this.esriPointsLayer)) {
            let imageParams = new esri.layers.ImageParameters();
            imageParams.layerIds = [this.layerIDProjectPoints];
            imageParams.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
            imageParams.transparent = true;
            imageParams.layerDefinitions = defsIn;

            this.esriPointsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(this.urlMainMapService, { "id": "oittPoints", "imageParameters": imageParams });
            this.esriPointsLayer.setDisableClientCaching(true);
            this.esriPointsLayer.id = "oittPoints";

            this.esriMap.reorderLayer(this.esriPointsLayer, 10);
            this.esriMap.addLayer(this.esriPointsLayer);
        }
        else if (!this._IsNullOrEmpty(this.esriPointsLayer)) {
            (<esri.layers.ArcGISDynamicMapServiceLayer>this.esriMap.getLayer("oittPoints")).setLayerDefinitions(defsIn);
        }
    }
    
    private _GeoTypeLayerToDisplay(viewRef: OE_OITTViewModel) {

        var viewMap: esri.Map = (<esri.Map>viewRef.esriMap);

        //always remove this layer first
        if (typeof viewRef.esriAreaLayer != "undefined" && viewRef.esriAreaLayer != null)
            viewMap.removeLayer(viewRef.esriAreaLayer);

        switch (this.geoTypeValue.get()) {
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

        if (viewRef.esriAreaLayer != null) {
            viewRef.esriAreaLayer.setDefinitionExpression(viewRef.geoTypeGeometryLayerDef.get());
            viewMap.addLayer(viewRef.esriAreaLayer);
            this.esriMap.reorderLayer(viewRef.esriAreaLayer, 1);

            viewRef.esriAreaLayer.on("load", function (event: any) {
                //use the selected geometry to set extent
                viewRef.esriMap.setExtent(viewRef.selectedAreaGeometry.getExtent().expand(1.4));
            });
        }
    }

    public ToggleChartTableView() {
        //hide all views first
        this.HideAllTableViews();

        if (!this.oittChartsTableContainerVisible.get()) {

            this.oittTableLinkText.set("Chart View");
            this.oittTableLinkImg.set("Resources/Images/Icons/charting-24.png");

            if (this.activeTabChartName == "projectsyear") {
                this.oittTableHdrName.set("Year");
                this.oittTableHdrValue.set("Number of Projects");
                this.oittChartsTableSharedVisible.set(true);

                this.oittTableData.clear();
                for (let i = 0; i < this.chartProjectYearCount.length; i++) {
                    this.oittTableData.addItem({
                        "name": (<any>this.chartProjectYearCount[i]).y,
                        "value": (<any>this.chartProjectYearCount[i]).c,
                        "data-sort-value": parseInt((<any>this.chartProjectYearCount[i]).c)
                    });
                }


            }
            else if (this.activeTabChartName == "projectstype") {
                this.oittTableHdrName.set("Project Types");
                this.oittTableHdrValue.set("Number of Projects");
                this.oittChartsTableSharedVisible.set(true);

                this.oittTableData.clear();
                for (let i = 0; i < this.chartProjectTypeCount.length; i++) {
                    this.oittTableData.addItem({
                        "name": (<any>this.chartProjectTypeCount[i]).t,
                        "value": (<any>this.chartProjectTypeCount[i]).c,
                        "data-sort-value": parseInt((<any>this.chartProjectTypeCount[i]).c)
                    });
                }


            }
            else if (this.activeTabChartName == "fundingtotal") {

                this.oittTableHdrName.set("Contribution Types");
                this.oittTableHdrValue.set("Total Investment");
                this.oittChartsTableSharedVisible.set(true);

                //(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                //Number(someNumber.toFixed(1)).toLocaleString()
                this.oittTableData.clear();
                this.oittTableData.addItem({
                    "name": "Funds",
                    "value": "$" + this.areaTotalFunds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    "data-sort-value": this.areaTotalFunds
                });
                this.oittTableData.addItem({
                    "name": "Fed",
                    "value": "$" + this.areaTotalFed.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    "data-sort-value": this.areaTotalFed
                });


            }
            else if (this.activeTabChartName == "fundingtype") {

                this.oittTableHdrName.set("Project Types");
                this.oittTableHdrValue.set("Total Funding");
                this.oittChartsTableSharedVisible.set(true);

                this.oittTableData.clear();
                for (let i = 0; i < this.chartFundingType.length; i++) {
                    this.oittTableData.addItem({
                        "name": (<any>this.chartFundingType[i]).t,
                        "value": "$" + Number((<any>this.chartFundingType[i]).s).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": parseInt((<any>this.chartFundingType[i]).s)
                    });
                }

            }
            else if (this.activeTabChartName == "fundingyear") {

                this.oittChartsTableFundYearVisible.set(true);
                
                this.oittTableDataFundInvestByYear.clear();
                for (let i = 0; i < this.chartFundingYear.length; i++) {

                    let total = (<any>this.chartFundingYear[i]).fund + (<any>this.chartFundingYear[i]).fed;

                    this.oittTableDataFundInvestByYear.addItem({
                        "year": (<any>this.chartFundingYear[i]).y,
                        "cash": "$" + Number((<any>this.chartFundingYear[i]).fund).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "inkind": "$" + Number((<any>this.chartFundingYear[i]).fed).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "total": "$" + Number(total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "cashForSort": parseInt((<any>this.chartFundingYear[i]).fund),
                        "inkindForSort": parseInt((<any>this.chartFundingYear[i]).fed),
                        "totalForSort": parseInt(total)
                    });
                }

            }
            else if (this.activeTabChartName == "fundingtypeYear") {
                                
                this.oittChartsTableFundTypeYearVisible.set(true);

                //table headers
                this.oittTableDataFundInvestByTypeByYearHeaders.clear();

                let newObject = { "n": "Year"};
                this.oittTableDataFundInvestByTypeByYearHeaders.addItem(newObject);

                for (let i = 0; i < this.fsProjectTypes.features.length; i++) {
                    let newObject = { "n": this.fsProjectTypes.features[i].attributes.ProjectType };
                    this.oittTableDataFundInvestByTypeByYearHeaders.addItem(newObject);
                }
                                
                //table values
                this.oittTableDataFundInvestByTypeByYear.clear();
                for (let i = 0; i < this.chartFundingTypeYear.length; i++) {

                    let workingObject = this.chartFundingTypeYear[i];
                    let newObject = { "year": workingObject["year"] };

                    //add display and sort values to new object
                    for (let aIndex = 0; aIndex < this.fsProjectTypes.features.length; aIndex++) {
                        let workingAtt = this.fsProjectTypes.features[aIndex].attributes.ProjectType;
                        let sortAtt = workingAtt + "Sort";
                        newObject[sortAtt] = workingObject[workingAtt]; //copy raw value into new attribute
                        newObject[workingAtt] = "$" + workingObject[workingAtt].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                    }

                    this.oittTableDataFundInvestByTypeByYear.addItem(newObject);
                }

                $(".owrtChartTableFundInvestByActByYear").tablesort();
            }
                        
            //show container
            this.oittChartsTableContainerVisible.set(true);
        }
        else {
            this.CloseChartTableView();
        }

    }

    public ChartFundingByTypeByYear(activeChartString: string, setupOnly: boolean = false)
    {
        if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingTypeYear)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;

                this._destoryActiveChart();

                let colorsToUse = this._generateRGBArrayFromCount(this.chartFundingTypeYear.length, true);

                let catValues = [];

                let seriesSet = [];
                let seriesObj = { "name": "", "color": "", "data": [] };
                let seriesIndexs = {};
                let colorIndex = 0;

                let workingObj: any;
                for (let index in this.chartFundingTypeYear) {

                    workingObj = this.chartFundingTypeYear[index];
                    catValues.push(workingObj.year);

                    colorIndex = 0;

                    for (let propIndex in workingObj) {
                        if (propIndex == "year") //skip year property
                            continue;

                        //create index for this activity type
                        if (this._IsNullOrEmpty(seriesIndexs[propIndex])) {
                            seriesIndexs[propIndex] = seriesSet.length;
                            seriesObj = {
                                "name": propIndex,
                                "color": colorsToUse[colorIndex],
                                "data": [parseInt(workingObj[propIndex])]
                            };
                            seriesSet.push(seriesObj);
                        }
                        else {
                            seriesSet[seriesIndexs[propIndex]].data.push(parseInt(workingObj[propIndex]));
                        }

                        colorIndex++;
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

        /*if (setupOnly)
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

            //let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
            let colorsToUse: any = this._generateRGBArrayFromCount(this.fsProjectTypes.features.length);
            this.chartDefsFundingTypeYear = this._BuildRestChartDefinition("activeChart", "Investments By Type By Year", "Linear", true, false, chartCategoryDefs, areaDef);

            //create a series for each activity type
            for (let i = 0; i < this.fsProjectTypes.features.length; i++) {
                let workingAtt: string = this.fsProjectTypes.features[i].attributes.ProjectType;

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

                this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTypeYear, (workingAtt.charAt(0).toUpperCase() + workingAtt.slice(1)), workingAtt, colorsToUse, "C0", "Line", axisIn);
            }

        }
        else
        {
            //render the chart!
            if (!this.fundingChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;
                this.BuildChart("fundingChart", this.chartDefsFundingTypeYear, this.chartFundingTypeYear, "oeOWRTAreaFundingChart", 550);
            }
        }*/

    }

    public ChartFundingByYear(activeChartString: string, setupOnly: boolean = false)
    {

        if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingYear)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValuesCash = [];
                let dataValuesInkind = [];
                for (let index in this.chartFundingYear) {
                    catValues.push((<any>this.chartFundingYear[index]).y);
                    dataValuesCash.push((<any>this.chartFundingYear[index]).fund);
                    dataValuesInkind.push((<any>this.chartFundingYear[index]).fed);
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
                        name: "Funding",
                        color: "#4684EE",
                        data: dataValuesCash
                    },
                    {
                        name: "Federal",
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

        /*if (setupOnly) {

            var chartCategoryDefs: RestChartCategoryDefinition = {
                field: {
                    displayName: "Year",
                    name: "y",
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
            this.chartDefsFundingYear = this._BuildRestChartDefinition("activeChart", "Investments By Year", "Linear", true, false, chartCategoryDefs, areaDef);
            this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingYear, "Funding", "fund", colorsToUse, "C0", "Bar", axisIn);
            this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingYear, "Federal", "fed", colorsToUse, "C0");

        }
        else
        {
            //render the chart!
            if (!this.fundingChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;
                this.BuildChart("fundingChart", this.chartDefsFundingYear, this.chartFundingYear, "oeOWRTAreaFundingChart", 550);
            }
        }*/

    }

    public ChartFundingByProjectType(activeChartString: string, setupOnly: boolean = false)
    {

        if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingType)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValues = [];
                for (let index in this.chartFundingType) {
                    catValues.push((<any>this.chartFundingType[index]).t);
                    dataValues.push((<any>this.chartFundingType[index]).s);
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

        /*let useDivider = this._GetDivider(this.chartFundingType, "s");
        let xAxisTitle = "Total";
        xAxisTitle += (useDivider > 0) ? " (" + useDivider.toString() + "s) " : "";

        if (setupOnly) {

            var chartCategoryDefs: RestChartCategoryDefinition = {
                field: {
                    displayName: "Type",
                    name: "t",
                    sourceType: (<any>ChartFieldSourceType).Json
                },
                axis: {
                    title: "",
                    visible: true,
                    showLabels: true,
                    reverseValues: true,
                    axisLabelMode: 0
                }
            }

            var axisIn: RestChartAxisDefinition = {
                visible: true,
                showLabels: true,
                showTicks: true,
                title: xAxisTitle,
                axisLabelMode: 1
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
            this.chartDefsFundingType = this._BuildRestChartDefinition("activeChart", "Investments By Type", "Linear", true, true, chartCategoryDefs, areaDef);
            this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingType, "Total", "s", colorsToUse, "C0", "Bar", axisIn);
            //#,##0,,M

        }
        else {
            //render the chart!
            if (!this.fundingChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;
                this.BuildChart("fundingChart", this.chartDefsFundingType, this.chartFundingType, "oeOWRTAreaFundingChart", 550, useDivider);
            }
        }*/
        
    }

    private _GetDivider(records: object[], targetField: string): number {

        let bigNumber = 0;

        for (let i = 0; i < records.length; i++)
        {
            if (records[i][targetField] > bigNumber)
                bigNumber = records[i][targetField];
        }

        if (bigNumber > 1000000)
            return 100000;

        if (bigNumber > 100000)
            return 1000;

        return 0;
    }

    public ChartProjectYearCount(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.chartProjectYearCount)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartString != activeChartString) {
                this.projectChartString = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValues = [];
                for (let index in this.chartProjectYearCount) {
                    catValues.push((<any>this.chartProjectYearCount[index]).y);
                    dataValues.push((<any>this.chartProjectYearCount[index]).c);
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

        /*
        if (setupOnly)
        {            
            var chartCategoryDefs: RestChartCategoryDefinition = {
                field: {
                    displayName: "Year",
                    name: "y",
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
            this.chartDefsProjectYearCount = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Linear", true, false, chartCategoryDefs, areaDef);

            this._BuildRestChartDefinitionSeriesItem(this.chartDefsProjectYearCount, "Projects", "c", colorsToUse, "N0", "Bar", axisIn);
        }
        else
        {
            //render the chart!
            if (!this.projectChart || this.projectChartString != activeChartString) {
                this.projectChartString = activeChartString;
                this.BuildChart("projectChart", this.chartDefsProjectYearCount, this.chartProjectYearCount, "oeOWRTAreaProjectsChart", 550);
            }
        }        */       
    }

    public ChartProjectTypeCount(activeChartString: string, setupOnly: boolean = false) {

        if (!setupOnly && !this._IsNullOrEmpty(this.chartProjectTypeCount)) {

            //only draw the chart if it is null
            if (!this.projectChart || this.projectChartString != activeChartString) {
                this.projectChartString = activeChartString;

                this._destoryActiveChart();

                let catValues = [];
                let dataValues = [];
                for (let index in this.chartProjectTypeCount) {
                    catValues.push((<any>this.chartProjectTypeCount[index]).t);
                    dataValues.push((<any>this.chartProjectTypeCount[index]).c);
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

        /*
        if (setupOnly) {

            var chartCategoryDefs: RestChartCategoryDefinition = {
                field: {
                    displayName: "Type",
                    name: "t",
                    sourceType: (<any>ChartFieldSourceType).Json
                },
                axis: {
                    title: "Project Type",
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
            this.chartDefsProjectTypeCount = this._BuildRestChartDefinition("activeChart", "Number of Projects by Type", "Linear", true, true, chartCategoryDefs, areaDef);
            this._BuildRestChartDefinitionSeriesItem(this.chartDefsProjectTypeCount, "Number of Projects", "c", colorsToUse, "N0", "Bar", axisIn);
        }
        else {
            //render the chart!
            if (!this.projectChart || this.projectChartString != activeChartString) {
                this.projectChartString = activeChartString;
                this.BuildChart("projectChart", this.chartDefsProjectTypeCount, this.chartProjectTypeCount, "oeOWRTAreaProjectsChart", 550);
            }
        }*/
    }

    public ChartFundingTotal(activeChartString: string, setupOnly: boolean = false) {

        this.chartFundingTotal = [{ "funds": this.areaTotalFunds, "fed": this.areaTotalFed }];

        if (!setupOnly && !this._IsNullOrEmpty(this.chartFundingTotal)) {
            
            //only draw the chart if it is null
            if (!this.projectChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;

                this._destoryActiveChart();

                let total = (<any>this.chartFundingTotal[0]).funds + (<any>this.chartFundingTotal[0]).fed;
                let cash = (<any>this.chartFundingTotal[0]).funds;
                let inkind = (<any>this.chartFundingTotal[0]).fed;

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
                            { "name": "Funds", "val": cash, "p": cash / total, color: "#4684EE" },
                            { "name": "Federal Funds", "val": inkind, "p": inkind / total, color: "#ee6f44" }
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

        /*
        if (setupOnly) {
            let colorsToUse: any = [[70, 132, 238], [220, 57, 18]];
            //let colorsToUse: any = this._generateRGBArrayFromCount(2);
            this.chartDefsFundingTotal = this._BuildRestChartDefinition("activeChart", "Number of Projects by Year", "Pie", true, false, null, null);

            this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTotal, "Funds", "funds", colorsToUse, "C0");
            this._BuildRestChartDefinitionSeriesItem(this.chartDefsFundingTotal, "Federal Funds", "fed", colorsToUse, "C0");

            this.chartFundingTotal = [{ "funds": this.areaTotalFunds, "fed": this.areaTotalFed }];
        }
        else
        {
            //only draw the chart if it is null
            if (!this.fundingChart || this.fundingChartString != activeChartString) {
                this.fundingChartString = activeChartString;
                this.BuildChart("fundingChart", this.chartDefsFundingTotal, this.chartFundingTotal, "oeOWRTAreaFundingChart", 550);
            }
        } */              
    }

    private _ClearFundingClasses() {
        this.oittFundingChartTotalClass.set("");
        this.oittFundingChartYearClass.set("");
        this.oittFundingChartTypeClass.set("");
        this.oittFundingChartTypeYearClass.set("");        
    }

    public ShowChart(workingTab: string, workingChart: string, legendName: string = ""): void {

        this.CloseChartTableView();

        this.activeTabChartName = workingTab + workingChart;

        if (workingTab == "projects") {
            if (workingChart == "year") {
                this.oittProjChartYearClass.set("oittChartSelectionBoxSelected");
                this.projectChartLegendText.set("Number of Projects by Year");                
                this.oittProjChartTypeClass.set("");
                                
                this.ChartProjectYearCount(workingChart);                                

                this.lastProjectTabChartName = this.activeTabChartName;
            }
            else if (workingChart == "type") {
                this.oittProjChartTypeClass.set("oittChartSelectionBoxSelected");
                this.projectChartLegendText.set("Number of Projects by Project Type");
                this.oittProjChartYearClass.set("");

                this.ChartProjectTypeCount(workingChart);

                this.lastProjectTabChartName = this.activeTabChartName;
            }
        }
        else if (workingTab == "funding") {
            if (workingChart == "total") {
                this._ClearFundingClasses();
                this.oittFundingChartTotalClass.set("oittChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Total Investment in Projects");
                this.ChartFundingTotal(workingChart);

                this.lastFundingTabChartName = this.activeTabChartName;
            }
            else if (workingChart == "year") {
                this._ClearFundingClasses();
                this.oittFundingChartYearClass.set("oittChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Year");
                this.ChartFundingByYear(workingChart);

                this.lastFundingTabChartName = this.activeTabChartName;
            }
            else if (workingChart == "type") {
                this._ClearFundingClasses();
                this.oittFundingChartTypeClass.set("oittChartSelectionBoxSelected");
                
                this.fundingChartLegendText.set("Investments By Type");
                this.ChartFundingByProjectType(workingChart);

                this.lastFundingTabChartName = this.activeTabChartName;
            }
            else if (workingChart == "typeYear") {
                this._ClearFundingClasses();
                this.oittFundingChartTypeYearClass.set("oittChartSelectionBoxSelected");

                this.fundingChartLegendText.set("Investments By Type By Year");                
                this.ChartFundingByTypeByYear(workingChart);

                this.lastFundingTabChartName = this.activeTabChartName;
            }
        }        
    }
        
    private _destoryActiveChart(targetName: string = "") {

        try {
            this.kChartActive.destroy();
        }
        catch (e) { }

        if (this[targetName]) {
            this.app.command("DestroyView").execute(this[targetName].id);
        }
        this[targetName] = null;
    }
    
    private _NewSequence(onComplete: any) {
        //clear tasks
        this.sequenceTasks = [];
        this.sequenceErrors = "";
        this.sequenceOnComplete = onComplete;
    }


    private _MoveCurrentSequenceProgress() {
        var workingThis = this;

        if (typeof workingThis["modelRef"] !== "undefined" && workingThis["modelRef"] != null)
            workingThis = workingThis["modelRef"];

        //remove any events to the last query task
        if (typeof this.sequenceLastTask != "undefined" && this.sequenceLastTask != null) {
            if (typeof this.sequenceLastTask.listeners != "undefined" && this.sequenceLastTask.listeners != null) {
                for (let i = 0; i < this.sequenceLastTask.listeners.length; i++)
                    this.sequenceLastTask.listeners[i].remove();
            }
        }

        if (workingThis.sequenceTasks.length > 0) {
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
        else {
            if (workingThis.sequenceOnComplete) {
                workingThis.sequenceOnComplete();
            }
        }

    }

    private _sequenceQueryLarge(queryURL: string, where: string, queryGeometry: esri.geometry.Geometry, outFields: string[], targetFeatureSet: string, logName: string, getGeometry: boolean = false, isDistinct: boolean = false) {

        var largeRequest = new OE_LargeRecordRequest();
        largeRequest.SetupRequest(queryURL, where, queryGeometry, outFields, logName, this._MoveCurrentSequenceProgress, this, targetFeatureSet, isDistinct);
        this.sequenceTasks.push(new OE_QuerySequenceTask(null, null, [], false, false, false, largeRequest));
    }

    private _sequenceQuery(queryString: string, where: string, outFields: string[], targetString: string, attString: string, logName: string, getGeometry: boolean = false,
        returnDistinctValues: boolean = false, orderByFields: string[] = null, outStats: esri.tasks.StatisticDefinition[] = null, returnIDsOnly: boolean = false,
        isCountQuery: boolean = false, addToFeatureSet: boolean = false, statsGroup: string[] = null) {

        var myModel: OE_OITTViewModel = this;

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

        if (isCountQuery) {
            onSuccess = queryTask.on("execute-for-count-complete", (results: any) => {

                if (!myModel._IsNullOrEmpty(results.count))
                    myModel[targetString][attString] = results.count;
                else
                    myModel[targetString][attString] = 0;

                this._MoveCurrentSequenceProgress();
            });
        }
        else {
            onSuccess = queryTask.on("complete", (results: any) => {

                if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {

                    if ($.isArray(myModel[targetString]))
                        (<any>myModel[targetString]).push(results.featureSet);
                    if (!this._IsNullOrEmpty(attString) && attString != "")
                        myModel[targetString][attString] = results.featureSet;
                    else {

                        if (results.featureSet.features.length == 1000) {
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

        this.sequenceTasks.push(new OE_QuerySequenceTask(queryTask, query, [onSuccess, onError], false, returnIDsOnly, isCountQuery));
    }
    
    private _IsNullOrEmpty(testValue: any, testLength: number = -1): boolean {

        if (typeof testValue === "undefined" || testValue == null)
            return true;

        if (testLength > -1)
            return !(testValue.length > testLength);

        return false;
    }

    public StopOnErrorMessage(message: string) {

        this._LoaderStateSet(true, message, true);
        this.reportOptionsPanelVisible.set(false);        
    }

    private _SetupJQueryTableSort() {
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

    private _GetLayerIDByName(mService: MapService, name: string): Layer {

        let workLayer = mService.layers.filter((ly: Layer) => ly.name == name).length > 0 ?
            mService.layers.filter((ly: Layer) => ly.name === name)[0] : null;

        return workLayer;
    }

    private _GetTableIDByName(mService: MapService, name: string): Layer {

        let workLayer = mService.tables.filter((ly: Layer) => ly.name == name).length > 0 ?
            mService.tables.filter((ly: Layer) => ly.name === name)[0] : null;

        return workLayer;
    }

    private _GetFieldByTypeID(featureSet: esri.tasks.FeatureSet, idFieldName: string, idTarget: string, valueFieldName: string): string {
        for (let i = 0; i < featureSet.features.length; i++) {
            if (featureSet.features[i].attributes[idFieldName] &&
                featureSet.features[i].attributes[valueFieldName] &&
                featureSet.features[i].attributes[idFieldName] == idTarget)
                return featureSet.features[i].attributes[valueFieldName];
        }

        return;
    }
       
    private _BuildRestChartDefinition(idIn: string, displayName: string, chartType: string, enableCommonSeriesRange: boolean, flipChart: boolean,
        catDefs: RestChartCategoryDefinition, areaDef: RestChartAreaDefinition): RestChartDefinition {

        //chartType = Pie, Linear
        //enableCommonSeriesRange = true for linear types?

        //category is the horizontal axis for a bar chart

        if (areaDef == null) {
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
        seriesType: string = "Bar", axisIn: RestChartAxisDefinition = null, displayFormatIn:string = "") {

        //valueFormat = microsoft style field format values?  C0, F2

        if (axisIn == null) {
            axisIn = {};
            axisIn.visible = false;
            axisIn.showLabels = true;
            axisIn.showTicks = true;
            axisIn.axisLabelMode = 1;
        }

        var obj: RestChartSeriesDefinition = {
            id: chartDef.series.length.toString(),
            title: title,
            seriesType: seriesType,
            valueFormat: valueFormat,
            color: colorsToUse[chartDef.series.length],
            field: {
                name: fieldName,
                displayFormat: displayFormatIn,
                sortingFormat: "000000000000000.###############",
                sourceType: (<any>ChartFieldSourceType).Json
            },
            axis: axisIn
        }

        chartDef.series.push(obj);
    }

    private _FindActivitySymbolColor(activityType: string, cssType: boolean = true, toHex: boolean = false): any {

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
        else {
            if (toHex)
                return rgbToHex(255, 99, 71);
            else
                return "rgb(255, 99, 71)";
        }

    }

    private _generateRGBArrayFromCount(maxColors: number, asHex: boolean = false) {

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
            else {
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

            if (asHex) {
                workingRGB = hsvToRgb(i * x, sv, sv);
                colorsOut.push(rgbToHex(workingRGB[0], workingRGB[1], workingRGB[2]));
            }
            else {
                colorsOut.push(hsvToRgb(i * x, sv, sv));
            }

        }

        return colorsOut;
    }    

}