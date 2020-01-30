/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

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

import { OE_ChartPointJsonAdapter } from "../OE_OWRTReports/OE_JsonAdapter"

export class OE_OWRTReportsViewModelSequenceTask {
    queryTask: esri.tasks.QueryTask;
    query: any;
    isRelationshipsQuery: boolean;

    constructor(qt: esri.tasks.QueryTask, queryIn: any, relationshipQuery: boolean = false) {
        this.queryTask = qt;
        this.query = queryIn;
        this.isRelationshipsQuery = relationshipQuery;
    }
}

export class OE_OWRTReportsViewModel extends ViewModelBase {
     
    app: ViewerApplication;
    chartFactory: ChartViewModelFactory;
    dataSource: any;

    reportMapServiceName: string;
        
    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading Report...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(true);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);

    printAreaVisible: Observable<boolean> = new Observable<boolean>(true);
    printButtonVisible: Observable<boolean> = new Observable<boolean>(false);

    tabMainClassName: Observable<string> = new Observable<string>("");
    tabChartsClassName: Observable<string> = new Observable<string>("");

    mainReportVisible: Observable<boolean> = new Observable<boolean>(true);
    chartReportVisible: Observable<boolean> = new Observable<boolean>(true);
    
    esriMap: esri.Map;
    esriProjectLayer: esri.layers.FeatureLayer;
    esriMapSymbol: esri.symbol.SimpleFillSymbol;

    chartPartVisible: Observable<boolean> = new Observable<boolean>(true);
    chartActVisible: Observable<boolean> = new Observable<boolean>(false);
    //chartActive: any;
    chartMainFunding: any;
    chartMainActivity: any;
    activeChartName: Observable<string> = new Observable<string>("");
    chartFunding: any;
    chartActivity: any;

    chartFundingActivity: RestChartDefinition = null;
    chartFundingActivityData: any = {}        
    chartFundingPart: RestChartDefinition = null;
    chartFundingPartData: any = {};

    queryUrlOWRT: string;
    queryUrlProjectInfo: string;
    queryUrlCentroids: string;
    queryUrlPartRoles: string;
    queryUrlPartSuperTypes: string;
    queryUrlPartTypes: string;
    queryUrlActivities: string;
    queryUrlActivityTypes: string;
    queryUrlResults: string;
    queryUrlMetrics: string;
    queryUrlLandUse: string;
                 
    sequenceTasks: OE_OWRTReportsViewModelSequenceTask[] = [];    
    sequenceErrors: string = "";
    sequenceOnComplete: any = null;

    owrtActivitySymbols: any[] = [];

    projectInfo: esri.tasks.FeatureSet = null;
    participants: esri.tasks.FeatureSet = null;    
    partRoles: esri.tasks.FeatureSet = null;
    partSuperTypes: esri.tasks.FeatureSet = null;
    partTypes: esri.tasks.FeatureSet = null;

    activities: esri.tasks.FeatureSet = null;
    activityTypes: esri.tasks.FeatureSet = null;

    project_results: esri.tasks.FeatureSet = null;
    project_metrics: esri.tasks.FeatureSet = null;
    project_goals: esri.tasks.FeatureSet = null;
    project_activites: esri.tasks.FeatureSet = null;
    project_species: esri.tasks.FeatureSet = null;
    project_landuses: esri.tasks.FeatureSet = null;
    
    project_partcipants: ObservableCollection<object> = new ObservableCollection<object>(null);
    project_results_observe: ObservableCollection<object> = new ObservableCollection<object>(null);
    project_goals_observe: ObservableCollection<object> = new ObservableCollection<object>(null);
    project_metrics_observe: ObservableCollection<object> = new ObservableCollection<object>(null);
    project_activites_observe: ObservableCollection<object> = new ObservableCollection<object>(null);
                
    //project information block
    projectID: string;
    project_nbr: Observable<string> = new Observable<string>("");
    project_name: Observable<string> = new Observable<string>("");
    project_start_year: Observable<string> = new Observable<string>("");
    project_complete_year: Observable<string> = new Observable<string>("");
    project_activities_blob: Observable<string> = new Observable<string>("");
    project_site_selection: Observable<string> = new Observable<string>("");
    project_speices_observe: Observable<string> = new Observable<string>("");

    //project location block
    project_watershed: Observable<string> = new Observable<string>("");
    project_subwatershed: Observable<string> = new Observable<string>("");
    project_tributary_of: Observable<string> = new Observable<string>("");
    project_stream_name: Observable<string> = new Observable<string>("");
    project_townshipRangeSection: Observable<string> = new Observable<string>("");
    project_dominant_land_use: Observable<string> = new Observable<string>("");
        
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
        this._destoryMainCharts();
        this._destoryPrintCharts();
    }

    _onSiteInitialized() {
        
        //register tagging command
        this.app.commandRegistry.command("oeOWRTprojectReport").register(this, this._oeOWRTprojectReport);
                                
        // Register our custom JSON data adapter with the charting infrastructure.
        let jsonDataAdapter = new OE_ChartPointJsonAdapter();
        let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
        ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);

        this.initializeChartFactory();                
        
        let mService = this._GetServiceByName(this.reportMapServiceName);
        this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "ALL_POLYS_SDE_WM").id;
        this.queryUrlCentroids = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "CentroidsSimple").id;
                                
        this.queryUrlProjectInfo = mService.serviceUrl + "/";
        this.queryUrlProjectInfo += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PROJECT_INFO"))) ? "28" : this._GetTableIDByName(mService, "PROJECT_INFO").id;
        console.log("PROJECT_INFO: "+this.queryUrlProjectInfo);

        this.queryUrlPartRoles = mService.serviceUrl + "/";
        this.queryUrlPartRoles += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_ROLE_LU"))) ? "25" : this._GetTableIDByName(mService, "PARTICIPANTS_ROLE_LU").id;
        console.log("PARTICIPANTS_ROLE_LU: "+this.queryUrlPartRoles);

        this.queryUrlPartSuperTypes = mService.serviceUrl + "/";
        this.queryUrlPartSuperTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU"))) ? "26" : this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU").id;
        console.log("PARTICIPANTS_SUPERTYPE_LU: " + this.queryUrlPartSuperTypes);

        this.queryUrlPartTypes = mService.serviceUrl + "/";
        this.queryUrlPartTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU"))) ? "27" : this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU").id;
        console.log("PARTICIPANTS_TYPE_LU: "+this.queryUrlPartTypes);

        this.queryUrlLandUse = mService.serviceUrl + "/";
        this.queryUrlLandUse += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "LAND_USE"))) ? "22" : this._GetTableIDByName(mService, "LAND_USE").id;
        console.log("LAND_USE: "+this.queryUrlLandUse);

        //create the map symbol
        this.esriMapSymbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new esri.Color([0, 255, 255]), 2),
                new esri.Color([0, 255, 255, 0.35])
        );

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
        catch (e) { }

        return workLayer;
    }

    private _GetTableRelationshipIDByName(mService: MapService, layerName: string, relationshipName: string, searchTables: boolean = false): number {
        //ALL_POLYS
        let workingLayer = null;

        let workingList: any = (searchTables == true) ? mService.tables : mService.layers;

        try {
            workingLayer = workingList.filter((ly: Layer) => ly.name == layerName).length > 0 ?
                workingList.filter((ly: Layer) => ly.name === layerName)[0] : null;
        }
        catch (e) { }

        let workingRelationship = null;
        relationshipName = relationshipName.toLowerCase();

        try {
            workingRelationship = workingLayer.relationships.filter((workRelate: any) => workRelate.name.toLowerCase() == relationshipName).length > 0 ?
                workingLayer.relationships.filter((workRelate: any) => workRelate.name.toLowerCase() === relationshipName)[0] : null;
        }
        catch (e) { }

        if (workingRelationship != null)
            return workingRelationship.id;
        else
            return -1;
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

    private _IsNullOrEmpty(testValue: any, testLength: number = -1): boolean {

        if (typeof testValue === "undefined" || testValue == null)
            return true;

        if (testLength > -1)
            return !(testValue.length > testLength);

        return false;
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
        if (this.sequenceTasks.length > 0)
        {
            var sTask = this.sequenceTasks.pop();

            if (sTask.isRelationshipsQuery)
                sTask.queryTask.executeRelationshipQuery(sTask.query);
            else
                sTask.queryTask.execute(sTask.query);
        }
        else
        {
            if (this.sequenceOnComplete)
                this.sequenceOnComplete();
        }

    }

    private _sequenceQuery(queryString: string, where: string, outFields: string[], targetFeatureSet: string, logName: string) {

        var myModel: OE_OWRTReportsViewModel = this;

        var query = new esri.tasks.Query();
        query.where = where;
        query.outFields = outFields;
        query.returnGeometry = false;

        var queryTask = new esri.tasks.QueryTask(queryString);
        queryTask.on("complete", (results: any) => {

            if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {                
                myModel[targetFeatureSet] = results.featureSet;
            }
            else {
                this.sequenceErrors += logName + " Complete: Empty object or no results.";                
            }

            this._MoveCurrentSequenceProgress();

        });
        queryTask.on("error", (results: any) => {
            this.sequenceErrors += logName + " Error: " + results.error;

            this._MoveCurrentSequenceProgress();
        });
                
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query));
    }

    private _sequenceRelationshipQuery(queryURL: string, objectID: number, relationshipID: number, outFields: string[], targetFeatureSet: string, logName: string) {

        var myModel: OE_OWRTReportsViewModel = this;
        
        let query = new esri.tasks.RelationshipQuery();
        query.objectIds = [objectID];
        query.returnGeometry = false;
        query.relationshipId = relationshipID;
        query.outFields = outFields;
        
        let queryTask = new esri.tasks.QueryTask(queryURL);
        queryTask.on("execute-relationship-query-complete", (results: any) => {

            if (results && results.featureSets[objectID] && (<esri.tasks.FeatureSet>results.featureSets[objectID]).features.length > 0) {
       
                myModel[targetFeatureSet] = (<esri.tasks.FeatureSet>results.featureSets[objectID]);
            }
            else {
                this.sequenceErrors += logName + " Complete: Empty object or no results.";
            }

            this._MoveCurrentSequenceProgress();

        });

        queryTask.on("error", (results: any) => {
            this.sequenceErrors += logName + " Error: " + results.error;

            this._MoveCurrentSequenceProgress();
        });
                
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, true));                
    }
        
    private _BuildTypesAndRelationships(objectID:number) {

        //clear tasks
        this.sequenceTasks = [];

        //setup a new sequence        
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._BuildRelationships; //when the follow sequence of queries are done build the relationships

        //types
        this._sequenceQuery(this.queryUrlPartRoles, "1=1", ["participant_role_lu_id,role,active"], "partRoles", "Participant Role");
        this._sequenceQuery(this.queryUrlPartSuperTypes, "1=1", ["participant_super_type,super_type_lu_id"], "partSuperTypes", "Participant Super Type");
        this._sequenceQuery(this.queryUrlPartTypes, "1=1", ["participant_type,super_type_lu_id,participant_type_lu_id,active,gov_nongov"], "partTypes", "Participant Type");
                        
        //related records to project
        let mService = this._GetServiceByName(this.reportMapServiceName);
        let relationshipID = -1;

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "project_info",false);
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "projectInfo", "Project Info");
        console.log("Relationship: project_info :: " + relationshipID);

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "participants", false);
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "participants", "Participants");
        console.log("Relationship: participants :: " + relationshipID);

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "results");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID,["*"], "project_results", "Project Activity Results");
        console.log("Relationship: results :: " + relationshipID);

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Goals");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID,["*"], "project_goals", "Project Goals");
        console.log("Relationship: Goals :: " + relationshipID);

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Metrics");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID,["*"], "project_metrics", "Project Metrics");
        console.log("Relationship: Metrics :: " + relationshipID);

        relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Species");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID,["*"], "project_species", "Project Species");
        console.log("Relationship: Species :: " + relationshipID);

        this._MoveCurrentSequenceProgress();
    }
        
    private _oeOWRTprojectReport(project_nbr: any) {
        
        //ModalWindowRegion
        this.app.commandRegistry.command("ActivateView").execute("OE_OWRTReportsView");                                

        if (typeof project_nbr != "string")
        {
            if (typeof project_nbr === "number")
            {
                project_nbr = project_nbr.toString();
            }
            else if (typeof project_nbr._graphic !== "undefined")
            {                
                //table context
                project_nbr = project_nbr._graphic.attributes.project_nbr;
            }
        }
        
        this._oeReportQueries(project_nbr);
    }
    
    public _oeReportQueries(project_nbr: string) {

        this.printButtonVisible.set(false);

        this.loaderMessage.set("Loading Report...");
        this.loaderWarnIcon.set(false);
        this.loaderSpinner.set(true);
        this.loaderVisible.set(true);
        this.inputBlockOnError.set(false);

        this.printAreaVisible.set(true);
        this.mainReportVisible.set(true);
        this.chartReportVisible.set(true);

        //no number, default to one
        if (!project_nbr)
        {            
            this._StopOnErrorMessage("No project number supplied. Example project number: 20090660.");
            return;
        }

        //force string type
        project_nbr = project_nbr.toString();

        //invalid number, default to one
        var matchResult = project_nbr.match(/^[0-9]+$/g);
        if (matchResult == undefined || matchResult === null || matchResult.length < 1) {
            this._StopOnErrorMessage("The project number is not valid: " + project_nbr + ".");
            return;
        }

        //primary record query.  All related information queries are in the function of this call back       
        var query = new esri.tasks.Query();
        query.where = "project_nbr = " + project_nbr;
        query.outFields = ["*"];
        query.returnGeometry = true;

        var thisView = this;

        var queryTask = new esri.tasks.QueryTask(this.queryUrlOWRT);
        queryTask.on("complete", (results: any) => {             

            if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {

                //build primary chart from record
                this._BuildProjectInfo(<esri.tasks.FeatureSet>results.featureSet);

                this._loadEsirMap(null, <esri.tasks.FeatureSet>results.featureSet, thisView);
            }
            else
            {
                if(!results)
                    this._StopOnErrorMessage("No result with project number "+project_nbr+" returned.");
                else if (!results.featureSet)
                    this._StopOnErrorMessage("No feature set with project number " + project_nbr + " returned.");
                else if ((<esri.tasks.FeatureSet>results.featureSet).features.length < 1)
                    this._StopOnErrorMessage("No records matching project number " + project_nbr + ".");
            }

        })
        queryTask.execute(query);                        
    }

    private _StopOnErrorMessage(message: string) {

        this.loaderMessage.set(message);

        this.loaderWarnIcon.set(true);
        this.loaderSpinner.set(false);
        this.inputBlockOnError.set(true);
        this.loaderVisible.set(true);        
    }

    private _BuildProjectInfo(featureSet: esri.tasks.FeatureSet) {

        //console.log("Features Found: " + featureSet.features.length);
        let graphicToUse = featureSet.features[0];
                
        //single field values
        let fieldsToUse = [
            { "field": "project_nbr", "target": this.project_nbr },
            { "field": "project_name", "target": this.project_name },
            { "field": "start_year", "target": this.project_start_year },
            { "field": "complete_year", "target": this.project_complete_year },
            { "field": "drvd_project_description", "target": this.project_activities_blob },
            { "field": "project_site_selection", "target": this.project_site_selection },
            { "field": "basin_actual", "target": this.project_watershed },
            { "field": "subbasin_actual", "target": this.project_subwatershed },
            { "field": "tributary_of", "target": this.project_tributary_of },
            { "field": "stream_name", "target": this.project_stream_name }            
        ];

        for (let i = 0; i < fieldsToUse.length; i++)
        {
            fieldsToUse[i].target.set(this._GetFieldValue(graphicToUse, fieldsToUse[i].field));
        }

        this.projectID = graphicToUse.attributes.ri_project_id;

        /*for (let fieldPointer in fieldsToUse) {
            if (typeof fieldsToUse[fieldPointer] !== "undefined" && fieldsToUse[fieldPointer] !== null)
                fieldsToUse[fieldPointer].target.set(this._GetFieldValue(graphicToUse, fieldsToUse[fieldPointer].field));            
        }*/

        //township range section string
        let townshipRangeSection = "";
        townshipRangeSection += this._GetFieldValue(graphicToUse, "township");
        townshipRangeSection += " " + this._GetFieldValue(graphicToUse, "range");
        townshipRangeSection += " " + this._GetFieldValue(graphicToUse, "section");
        this.project_townshipRangeSection.set(townshipRangeSection);
                
        //dominant land use
        //this.project_dominant_land_use.set("No Data");

        //build types featuersets
        this._BuildTypesAndRelationships(parseInt(this._GetFieldValue(graphicToUse, "OBJECTID"), 10));

        //gather all relationships
        //this._GetRelationships(parseInt(this._GetFieldValue(graphicToUse, "OBJECTID"),10));        
    }
        
    private _BuildRelationships() {

        console.log("Participants feature: " + this.participants.features.length);

        this._BuildParticipants();
        this._BuildActivityResults();
        this._BuildGoals();
        this._BuildMetrics();
        this._BuildSpecies();
                
        this._RelatedProjectInfo(); // also pulls in activities (for funding)
    }    

    private _RelatedProjectInfo() {

        //set project site selection
        this.project_site_selection.set("No site selection on record.");
        if (this.projectInfo && this.projectInfo.features.length > 0)
        {
            var workingAttributes = this.projectInfo.features[0].attributes;

            if (workingAttributes.project_site_selection)
                this.project_site_selection.set(workingAttributes.project_site_selection.toString());
            
            //get activity type funding and land use

            //clear tasks
            this._NewSequence(this._QuerysThatRequireProjectID);
            //related records to project

            let mService = this._GetServiceByName(this.reportMapServiceName);
            let relationshipID = this._GetTableRelationshipIDByName(mService, "PROJECT_INFO", "Activity_Types", true);
            this._sequenceRelationshipQuery(this.queryUrlProjectInfo, workingAttributes.OBJECTID, relationshipID, ["*"], "project_activites", "Project Activities");
            
            this._sequenceQuery(this.queryUrlLandUse, "project_id=" + this.projectID, ["land_use"], "project_landuses", "Project Land Uses");
            this._MoveCurrentSequenceProgress();
        }
    }

    private _QuerysThatRequireProjectID() {

        this._BuildActivities();
        this._BuildLandUse();

        //build main charts
        this.BuildMainCharts();

        //build print charts now
        this.BuildAllChartsForPrint();
                
        //hide print area
        this.printAreaVisible.set(false);

        this.ToggleTabMain();

        //hide the loader overlay
        this.loaderVisible.set(false);

        this.printButtonVisible.set(true);            
    }

    public ToggleTabMain() {

        this.chartReportVisible.set(false);
        this.mainReportVisible.set(true);        

        this.tabMainClassName.set("oeOWRTReportsTabEnabled");
        this.tabChartsClassName.set("");
    }

    public ToggleTabCharts() {

        this.mainReportVisible.set(false);
        this.chartReportVisible.set(true);

        this.tabMainClassName.set("");
        this.tabChartsClassName.set("oeOWRTReportsTabEnabled");
    }
        
    public PrintReport() {

        var PW = window.open('', '_blank', 'Print content');

        let styleTags = document.getElementsByTagName("style");
        let styleHtml = "";

        for (let i = 0; i < styleTags.length; i++) {
            styleHtml = styleHtml + " " + styleTags[i].innerHTML;
        }

        this.printAreaVisible.set(true);

        $("#oe_owrtPR_divMapPrint").html($("#oe_owrtPR_divMap").html());

        PW.document.write("<div class=\"oe_owrtPR- module - view\">" + document.getElementById("oeOWRTDetailReportPrintArea").innerHTML + "</div>");
        PW.document.head.innerHTML = "<style>" + styleHtml + " body, html {overflow:visible; font-family:\"Segoe UI\", \"Helvetica Neue\", \"Droid Sans\", Arial, sans-serif; font-size:.8em} fieldset{margin:10px;}</style>";
        PW.document.close();

        let divLayers = PW.document.getElementById("oe_owrtPR_divMap_layer0");
        let divImages = divLayers.firstChild;
        let imageNodes: any = divImages.childNodes;

        for (let i = 0; i < imageNodes.length; i++) {
            imageNodes[i].style.width = "128px";
            imageNodes[i].style.height = "128px";

            if (i == 0)
                imageNodes[i].style.transform = "translate3d(0px, 0px, -1px)";
            else if (i == 1)
                imageNodes[i].style.transform = "translate3d(-128px, 128px, -1px)";
            else if (i == 2)
                imageNodes[i].style.transform = "translate3d(128px, -128px, -1px)";
            else if (i == 3)
                imageNodes[i].style.transform = "translate3d(0px, 0px, -1px)";
            else if (i>=4)
                imageNodes[i].style.display = "none";
        }

        this.printAreaVisible.set(false);

        PW.focus();
        PW.print();
        PW.close();

    }

    private _BuildLandUse() {

        //Land use
        var landUseString: string = "";

        for (let i = 0; i < this.project_landuses.features.length; i++) {

            let workingAttributes = this.project_landuses.features[i].attributes;
            
            landUseString += workingAttributes.land_use;

            if (i < this.project_landuses.features.length - 1)
                landUseString += ", ";
        }

        if (landUseString == "")
            landUseString = "No land use on record.";

        this.project_dominant_land_use.set(landUseString);
    }

    private _BuildSpecies() {

        //species
        var speciesString: string = "";

        if (this.project_species && this.project_species.features) {

            for (let i = 0; i < this.project_species.features.length; i++) {

                let workingAttributes = this.project_species.features[i].attributes;

                speciesString += workingAttributes.species;

                if (i < this.project_species.features.length - 1)
                    speciesString += ", ";
            }

        }

        if (speciesString == "")
            speciesString = "No species on record.";

        this.project_speices_observe.set(speciesString);

    }

    private _BuildActivities() {

        if (!this.project_activites || this.project_activites.features.length < 1)
            return;

        this.project_activites_observe.clear();

        //get the inkind chart defintion
        this.chartFundingActivity = this._BuildRestChartDefinition("chartFunding", "Activity Funding");
        //let chartFundingActivityData: any = {};
        //let colorsToUse: any = this._generateRGBArrayFromCount(this.project_activites.features.length);
        let colorsToUse = [];

        //get symbol colors for this chart
        for (let i = 0; i < this.project_activites.features.length; i++) {
            colorsToUse.push(this._FindActivitySymbolColor(this.project_activites.features[i].attributes.activity_type,false));
        }
        
                
        //sort by treatment name
        this.project_activites.features.sort((a: any, b: any) => {
            if (a.attributes.activity_type < b.attributes.activity_type) return -1;
            if (a.attributes.activity_type > b.attributes.activity_type) return 1;
            return 0;
        });

        for (let i = 0; i < this.project_activites.features.length; i++) {

            let workingAttributes = this.project_activites.features[i].attributes;
            let workingPartID = workingAttributes["OBJECTID"];
            let workingObject = null;

            workingObject = workingAttributes;

            //include activities with funding.  BEFORE the values are changed to string
            if (workingObject.total > 0) {
                this._BuildRestChartDefinitionSeriesItem(this.chartFundingActivity, workingObject.activity_type, workingPartID, colorsToUse);
                this.chartFundingActivityData[workingPartID] = workingObject.total;
            }

            workingObject.colorFromLegend = this._FindActivitySymbolColor(workingObject.activity_type);
            workingObject.cash = "$" + workingObject.cash;
            workingObject.inkind = "$" + workingObject.inkind;
            workingObject.total = "$" + workingObject.total;
                                   
            this.project_activites_observe.addItem(workingObject);
        }

        //Build funding chart
        //this.chartActivity = this.createPieChart(chartFundingActivity, [chartFundingActivityData], "OE_pieChartFundingActivity");                  
    }

    private _FindActivitySymbolColor(activityType: string, cssType: boolean = true): any {

        for (let i = 0; i < this.owrtActivitySymbols.length; i++)
        {
            var valueString = this.owrtActivitySymbols[i].value;

            if (valueString.toLowerCase() == activityType.toLowerCase())
            {
                if (cssType)
                {
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
                else
                {
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

    private _BuildMetrics() {

        this.project_metrics_observe.clear();

        if (this._IsNullOrEmpty(this.project_metrics) || this._IsNullOrEmpty(this.project_metrics.features))
        {
            let workingObject: any = { "treatment": "No treatments & metrics records for this project.", "metrics": {}};
            //workingObject.metrics = new ObservableCollection<object>();
            //workingObject.metrics.addItem({"treatment":"No treatments & metrics for this record.", "metric": "", "displayValue": "" });
            this.project_metrics_observe.addItem(workingObject);
            return;
        }

        //sort by treatment name
        this.project_metrics.features.sort((a: any, b: any) => {
            if (a.attributes.treatment < b.attributes.treatment) return -1;
            if (a.attributes.treatment > b.attributes.treatment) return 1;
            return 0;
        });

        var treatments: any = {};

        for (let i = 0; i < this.project_metrics.features.length; i++) {
        
            let workingAttributes = this.project_metrics.features[i].attributes;
            let workingPartID = workingAttributes["OBJECTID"];
            let workingObject = null;

            workingObject = workingAttributes;

            //workingObject.visible = new Observable<boolean>(true);

            if (!treatments[workingObject.treatment]) {

                workingObject.metrics = new ObservableCollection<object>();
                workingObject.metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity+" "+workingObject.unit});

                treatments[workingObject.treatment] = workingObject;

                this.project_metrics_observe.addItem(workingObject);
            }
            else
            {
                treatments[workingObject.treatment].metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
            }                        
        }
    }

    private _BuildGoals() {

        this.project_goals_observe.clear();

        if (this._IsNullOrEmpty(this.project_goals) || this._IsNullOrEmpty(this.project_goals.features)) {
            return;
        }

        //sort by goal 
        this.project_goals.features.sort((a: any, b: any) => {
            if (a.attributes.goal < b.attributes.goal) return -1;
            if (a.attributes.goal > b.attributes.goal) return 1;
            return 0;
        });

        for (let i = 0; i < this.project_goals.features.length; i++) {

            let workingAttributes = this.project_goals.features[i].attributes;
            let workingPartID = workingAttributes["OBJECTID"];
            let workingObject = null;

            workingObject = workingAttributes;

            this.project_goals_observe.addItem(workingObject);
        }
    }

    private _BuildActivityResults()
    {        
        
        this.project_results_observe.clear();      
        //this.project_treatments_observe.clear();  

        //var treatments: any = {};

        if (this._IsNullOrEmpty(this.project_results) || this._IsNullOrEmpty(this.project_results.features)) {
            return;
        }

        //sort by activity type
        this.project_results.features.sort((a: any, b: any) => {
            if (a.attributes.activity_type < b.attributes.activity_type) return -1;
            if (a.attributes.activity_type > b.attributes.activity_type) return 1;
            return 0;
        });

        for (let i = 0; i < this.project_results.features.length; i++) {        

            /****************************************
                 Activity Results
            *****************************************/
            let workingAttributes = this.project_results.features[i].attributes;
            let workingPartID = workingAttributes["OBJECTID"];
            let workingObject = null;

            workingObject = workingAttributes;
            this.project_results_observe.addItem(workingObject);

            /****************************************
                Treatments & Metrics
            *****************************************/
           /* if (!treatments[workingObject.treatment]) {

                workingObject.metrics = new ObservableCollection<object>();
                workingObject.metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });

                treatments[workingObject.treatment] = workingObject;

                this.project_treatments_observe.addItem(workingObject);
            }
            else {
                treatments[workingObject.treatment].metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
            }*/
        }
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

    private _BuildParticipants()
    {        
        let colorsToUse: any = this._generateRGBArrayFromCount(this.participants.features.length);
        
        //clear list
        this.project_partcipants.clear();

        let participantObjects = {};
        let cashTotal = 0;
        let inkindTotal = 0;

        //sort by cash, high to low
        this.participants.features.sort((a: any, b: any) => {
            return b.attributes.cash - a.attributes.cash;
        });

        //get the cash chart defintion
        //let chartFundingActivity: RestChartDefinition = this._BuildRestChartDefinition("chartActivity", "Activity Funding");

        //get the inkind chart defintion
        this.chartFundingPart = this._BuildRestChartDefinition("chartFunding", "Participant Funding");
        //let chartFundingPartData: any = {};
                        
        for (let i = 0; i < this.participants.features.length; i++) {

            let workingAttributes = this.participants.features[i].attributes;
            let workingPartID = workingAttributes["participant_id"];
            let workingObject = null; // = { "participant": "","contact":"","cash":"0","inkind":"0","roles":[],"types":[]};

            //first participant record add a row
            if (participantObjects && !participantObjects[workingPartID]) {
                workingObject = workingAttributes;
                //workingObject.htmlID = "participant" + workingPartID;
                workingObject.visible = new Observable<boolean>(false);
                workingObject.showParticipantBlock = new Observable<boolean>(true);
                workingObject.collapseImgVisisble = new Observable<boolean>(false);                
                workingObject.expandImgVisisble = new Observable<boolean>(true);

                //build chart defintions and add series item
                //The series item fieldName needs to match the data property    workingPartID = workingPartID
                //Only include participants with cash or inkind above 0
                if (workingObject.cash > 0 || workingObject.inkind > 0) {
                    this._BuildRestChartDefinitionSeriesItem(this.chartFundingPart, workingObject.participant, workingPartID, colorsToUse);
                    this.chartFundingPartData[workingPartID] = workingObject.cash + workingObject.inkind;
                }

                cashTotal += workingObject.cash+0;
                inkindTotal += workingObject.inkind+0;

                workingObject.cash = "$"+workingObject.cash;
                workingObject.inkind = "$" + workingObject.inkind;
                                
                //roles
                workingObject.roles = new ObservableCollection<object>();
                workingObject.roles.addItem({ "name": this._GetFieldByTypeID(this.partRoles, "participant_role_lu_id", workingObject.participant_role_lu_id, "role") });
                workingObject.roleIDs = {}; //track role ids used, roles should be unique
                workingObject.roleIDs[workingObject.participant_role_lu_id] = true;

                //types
                workingObject.types = new ObservableCollection<object>();
                workingObject.types.addItem({ "name": this._GetFieldByTypeID(this.partTypes, "participant_type_lu_id", workingObject.participant_type_lu_id, "participant_type") });
                workingObject.typeIDs = {}; //track type ids used, types should be unique
                workingObject.typeIDs[workingObject.participant_type_lu_id] = true;

                //add object to collection
                this.project_partcipants.addItem(workingObject);

                //save the object based on ID
                participantObjects[workingPartID] = workingObject;
            }
            else  //add more roles and/or types
            {
                //get the object already created
                workingObject = participantObjects[workingPartID];

                //roles
                if (!workingObject.roleIDs[workingAttributes.participant_role_lu_id])
                    workingObject.roles.addItem({ "name": this._GetFieldByTypeID(this.partRoles, "participant_role_lu_id", workingAttributes.participant_role_lu_id, "role") });

                //types
                if (!workingObject.typeIDs[workingAttributes.participant_type_lu_id])
                    workingObject.types.addItem({ "name": this._GetFieldByTypeID(this.partTypes, "participant_type_lu_id", workingObject.participant_type_lu_id, "participant_type") });
            }

        }

        //build a final row for the total, hide participant elements
        let footerObject = null;
        footerObject = new Object();
        footerObject.visible = new Observable<boolean>(false);
        footerObject.showParticipantBlock = new Observable<boolean>(false);        
        footerObject.collapseImgVisisble = new Observable<boolean>(false);
        footerObject.expandImgVisisble = new Observable<boolean>(false);
        footerObject.roles = new ObservableCollection<object>();
        footerObject.types = new ObservableCollection<object>();
        footerObject.cash = "$"+cashTotal;
        footerObject.inkind = "$" + inkindTotal;        
        this.project_partcipants.addItem(footerObject);

        //Build funding chart
        //this.fundingChart = this.createPieChart(chartFundingPart, [chartFundingPartData], "OE_pieChartFunding");     
        //this.BuildChartParticipant();
    }

    private _GetFieldValue(graphic: esri.Graphic, field: string): string {

        if (typeof graphic.attributes[field] === "undefined")
            return "Undefined Field - " + field;

        if (graphic.attributes[field] === null)
            return "Null Field - " + field;
                               
        return graphic.attributes[field];
    }

    public BuildMainCharts() {
        this._destoryMainCharts();

        //Build funding chart
        this.chartMainActivity = this.createPieChart(this.chartFundingActivity, [this.chartFundingActivityData], "OE_pieChartActivity",400);
        this.activeChartName.set("Activity Funding");                

        this.chartMainFunding = this.createPieChart(this.chartFundingPart, [this.chartFundingPartData], "OE_pieChartFunding",400);
        this.activeChartName.set("Participant Funding");    
    }
    
    public BuildAllChartsForPrint() {

        this._destoryPrintCharts();

        this.chartActivity = this.createPieChart(this.chartFundingActivity, [this.chartFundingActivityData], "OE_ChartActivityForPrint", 380);
        this.chartFunding = this.createPieChart(this.chartFundingPart, [this.chartFundingPartData], "OE_ChartFundingForPrint", 380);        
    }

    private _destoryPrintCharts() {
        if (this.chartFunding) {
            this.app.command("DestroyView").execute(this.chartFunding.id);
        }
        this.chartFunding = null;        

        if (this.chartActivity) {
            this.app.command("DestroyView").execute(this.chartActivity.id);
        }
        this.chartActivity = null;     
    }
        
    private _destoryMainCharts() {
        if (this.chartMainFunding) {
            this.app.command("DestroyView").execute(this.chartMainFunding.id);
        }
        this.chartMainFunding = null;                

        if (this.chartMainActivity) {
            this.app.command("DestroyView").execute(this.chartMainActivity.id);
        }
        this.chartMainActivity = null;                
    }

    private _loadEsirMap(graphicIn: esri.Graphic, featureSetIn: esri.tasks.FeatureSet, thisView: OE_OWRTReportsViewModel) {

        var point: esri.geometry.Point = null;

        if (graphicIn && graphicIn != null && graphicIn.geometry)
            point = <esri.geometry.Point>graphicIn.geometry;
        else
            point = new esri.geometry.Point(-120.58, 44.17);
                
        if (typeof this.esriMap == "undefined" || this.esriMap == null)
        {
            this.esriMap = new esri.Map("oe_owrtPR_divMap", {
                //center: [44.17432483, -120.5859375],
                center: new esri.geometry.Point(-120.58, 44.17),
                zoom: 5,
                basemap: "streets",
                minZoom: 5,
                slider: true
            });

            var viewThis = this;

            this.esriMap.on("load", function (event: any) {
                console.log(event.map);

                
                //markerSymbol.setColor(new esri.Color("#00FFFF"));
                //markerSymbol.setOutline(new esri.symbol.SimpleLineSymbol())
                
                /*var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                markerSymbol.setColor(new esri.Color("#00FFFF"));                
                (<esri.Map>event.map).graphics.add(new esri.Graphic(point, markerSymbol));*/

                for (let i = 0; i < featureSetIn.features.length; i++)
                {
                    featureSetIn.features[i].setSymbol(thisView.esriMapSymbol);
                    (<esri.Map>event.map).graphics.add(featureSetIn.features[i]);
                }

                //this.esriProjectLayer = new esri.layers.FeatureLayer(this._MakeFeatureCollection(featureSetIn));
                //(<esri.Map>event.map).addLayer(this.esriProjectLayer);

                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/40");
                (<esri.Map>event.map).addLayer(featureLayer);
                                
                (<esri.Map>event.map).setExtent(esri.graphicsExtent(featureSetIn.features).expand(2));                
            });                     
        }
        else
        {
            this.esriMap.graphics.clear();

            for (let i = 0; i < featureSetIn.features.length; i++) {
                featureSetIn.features[i].setSymbol(this.esriMapSymbol);
                this.esriMap.graphics.add(featureSetIn.features[i]);
            }

            this.esriMap.setExtent(esri.graphicsExtent(featureSetIn.features).expand(2));

            /*var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
            markerSymbol.setColor(new esri.Color("#00FFFF"));
            this.esriMap.graphics.add(new esri.Graphic(point, markerSymbol));*/

            //if (typeof this.esriProjectLayer != "undefined")
                //this.esriMap.removeLayer(this.esriProjectLayer);

            //this.esriProjectLayer = new esri.layers.FeatureLayer(this._MakeFeatureCollection(featureSetIn));
            //this.esriMap.addLayer(this.esriProjectLayer);            
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

    private createPieChart(chartConfig: any, data: any, targetRegion: string, widthIn:number=250): Chart {
                
        let chartDefinition = new ChartDefinition(chartConfig);
                
        // Create chart view model from chart config & data.
        let chartViewModel = this.chartFactory.createInstance(<any>chartDefinition, ChartFeatureType.SingleFeature, data);
        chartViewModel.width.set(widthIn);
        //chartViewModel.autoSize.set(false);
        //chartViewModel.interactiveLegend.set(true);
        //chartViewModel.pieStartAngle.set(90);
        
        // Create the chart.
        let chart = <any>this.app.viewManager.createView({
            markupResource: "Charting/charting/Chart.html",
            typeName: "geocortex.charting.Chart",
            isVisible: true,
            libraryId: "Charting",
            regionName: targetRegion
        });

        // Attach the view to the view model. This will cause all of its binding expressions to be evaluated.
        chart.attach(chartViewModel);
        return chart;      
    }

    private _BuildRestChartDefinition(idIn: string, displayName: string): RestChartDefinition {

        let json: RestChartDefinition = {
            id: idIn,
            displayName: displayName,
            visible: true,
            chartType: "Pie",            
            area: {
                background: [255, 255, 255, 255],
                foreground: [0, 0, 0, 255],
                showLabels: true,
                colorPalette: ChartColorPalette.Rainbow,
                showToolTips: true,
                actionSelect: false,
                actionPan: false,
                actionZoom: false,
                actionFeatureDetails: false,
                actionRunCommand: false                
            },
            legend: {
                position: "Bottom"
            },
            series: []
        }

        return json;
    }
        
    private _BuildRestChartDefinitionSeriesItem(chartDef: RestChartDefinition, title: string, fieldName: string, colorsToUse: any) {

        var obj = {
            id: chartDef.series.length.toString(),
            title: title,
            valueFormat: "C0",
            color: colorsToUse[chartDef.series.length],
            field: {
                name: fieldName,
                displayFormat: "",
                sortingFormat: "000000000000000.###############",
                sourceType: (<any>ChartFieldSourceType).Json
            }
        }
                                               
        chartDef.series.push(obj);
    }
    
}