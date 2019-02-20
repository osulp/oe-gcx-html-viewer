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
        
    //appSite: geocortex.framework.application.Application;
    //myModule: OE_OWRTReportsViewModel;
    app: ViewerApplication;
    chartFactory: ChartViewModelFactory;
    dataSource: any;
        
    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading Report...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(true);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);
    
    esriMap: esri.Map;

    chartPartVisible: Observable<boolean> = new Observable<boolean>(true);
    chartActVisible: Observable<boolean> = new Observable<boolean>(false);
    chartActive: any;
    activeChartName: Observable<string> = new Observable<string>("");

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
        
    /*constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }*/

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
        this._destoryFundingChart();
    }

    _onSiteInitialized() {

        //build custom image url
        //this.app.site.url        

        //register tagging command
        this.app.commandRegistry.command("oeOWRTprojectReport").register(this, this._oeOWRTprojectReport);
                        
        // Register our custom JSON data adapter with the charting infrastructure.
        let jsonDataAdapter = new OE_ChartPointJsonAdapter();
        let sourceTypeString = ChartFieldSourceType[(<any>ChartFieldSourceType).Json];
        ChartPointAdapterRegistry.registerAdapter((<any>jsonDataAdapter), sourceTypeString);

        this.initializeChartFactory();                

        //get the OWRT map service
        //let mService = this.app.site.essentialsMap.mapServices.filter((ms: MapService) => ms.displayName == "OWRT").length > 0 ?
        //    this.app.site.essentialsMap.mapServices.filter((ms: MapService) => ms.displayName === 'OWRT')[0] : null;


        //get the layer to query?
        //let workLayer = mService.layers.filter((ly: Layer) => ly.name == "ALL_POLYS_SDE_WM").length > 0 ?
        //    mService.layers.filter((ly: Layer) => ly.name === "ALL_POLYS_SDE_WM")[0] : null;

        let mService = this._GetServiceByName("OWRT");
        this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "ALL_POLYS_SDE_WM").id;
        this.queryUrlCentroids = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "CentroidsSimple").id;
                
        this.queryUrlProjectInfo = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PROJECT_INFO").id;
        this.queryUrlPartRoles = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS_ROLE_LU").id;
        this.queryUrlPartSuperTypes = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU").id;
        this.queryUrlPartTypes = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU").id;
        this.queryUrlLandUse = mService.serviceUrl + "/" + this._GetTableIDByName(mService, "LAND_USE").id;
        
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
                //targetFeatureSet = results.featureSet;
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

        //queryTask.execute(query);
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

                //targetFeatureSet = (<esri.tasks.FeatureSet>results.featureSets[objectID]);                
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

        //queryTask.executeRelationshipQuery(query);
        this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, true));                
    }
        
    private _BuildTypesAndRelationships(objectID:number) {

        //clear tasks
        this.sequenceTasks = [];

        //setup a new sequence
        //this.sequenceDoneValue = 8;
        //this.sequenceProgress = 0;
        this.sequenceErrors = "";
        this.sequenceOnComplete = this._BuildRelationships; //when the follow sequence of queries are done build the relationships

        //types
        this._sequenceQuery(this.queryUrlPartRoles, "1=1", ["participant_role_lu_id,role,active"], "partRoles", "Participant Role");
        this._sequenceQuery(this.queryUrlPartSuperTypes, "1=1", ["participant_super_type,super_type_lu_id"], "partSuperTypes", "Participant Super Type");
        this._sequenceQuery(this.queryUrlPartTypes, "1=1", ["participant_type,super_type_lu_id,participant_type_lu_id,active,gov_nongov"], "partTypes", "Participant Type");
                        
        //related records to project
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 0, ["*"], "projectInfo", "Project Info");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 3, ["*"], "participants", "Participants");                
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 4, ["*"], "project_results", "Project Activity Results");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 6, ["*"], "project_goals", "Project Goals");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 5, ["*"], "project_metrics", "Project Metrics");
        this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, 7, ["*"], "project_species", "Project Species");

        this._MoveCurrentSequenceProgress();
    }
        
    private _oeOWRTprojectReport(project_nbr: string) {
        
        //ModalWindowRegion
        this.app.commandRegistry.command("ActivateView").execute("OE_OWRTReportsView");                                
        this._oeReportQueries(project_nbr);
    }

    public _oeReportQueries(project_nbr: string) {

        this.loaderMessage.set("Loading Report...");
        this.loaderWarnIcon.set(false);
        this.loaderSpinner.set(true);
        this.loaderVisible.set(true);
        this.inputBlockOnError.set(false);

        //no number, default to one
        if (!project_nbr)
            project_nbr = "20090660";

        //invalid number, default to one
        var matchResult = project_nbr.match(/^[0-9]+$/g);
        if (matchResult == undefined || matchResult === null || matchResult.length < 1) {
            project_nbr = "20090660";
        }

        //primary record query.  All related information queries are in the function of this call back       
        var query = new esri.tasks.Query();
        query.where = "project_nbr = " + project_nbr;
        query.outFields = ["*"];
        query.returnGeometry = false;

        var queryTask = new esri.tasks.QueryTask(this.queryUrlOWRT);
        queryTask.on("complete", (results: any) => {             

            if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {
                //build primary chart from record
                this._BuildProjectInfo(<esri.tasks.FeatureSet>results.featureSet);
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
        
        //simple centroid geometry query
        var queryCentroid = new esri.tasks.Query();
        queryCentroid.where = "project_nbr = " + project_nbr;
        queryCentroid.outFields = ["*"];
        queryCentroid.returnGeometry = true;

        var queryTaskCentroid = new esri.tasks.QueryTask(this.queryUrlCentroids);
        queryTaskCentroid.on("complete", (results: any) => {

            if (results && results.featureSet && (<esri.tasks.FeatureSet>results.featureSet).features.length > 0) {                

                //this._loadLocatorMap((<esri.tasks.FeatureSet>results.featureSet).features[0]);
                this._loadEsirMap((<esri.tasks.FeatureSet>results.featureSet).features[0]);

            }
            else {
                if (!results)
                    console.log("Centroid: No result object returned.");
                else if (!results.featureSet)
                    console.log("Centroid: No feature set returned.");
                else if ((<esri.tasks.FeatureSet>results.featureSet).features.length < 1)
                    console.log("Centroid: Query successful. No matching records.");
            }

        })
        queryTaskCentroid.execute(queryCentroid);
                
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
            this._sequenceRelationshipQuery(this.queryUrlProjectInfo, workingAttributes.OBJECTID, 9, ["*"], "project_activites", "Project Activities");
            this._sequenceQuery(this.queryUrlLandUse, "project_id=" + this.projectID, ["land_use"], "project_landuses", "Project Land Uses");
            this._MoveCurrentSequenceProgress();
        }
    }

    private _QuerysThatRequireProjectID() {

        this._BuildActivities();
        this._BuildLandUse();

        //hide the loader overlay
        this.loaderVisible.set(false);     
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
                workingObject.inkind = "$"+workingObject.inkind;

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
        footerObject.collapseImgVisisble = new Observable<boolean>(false);
        footerObject.expandImgVisisble = new Observable<boolean>(false);
        footerObject.roles = new ObservableCollection<object>();
        footerObject.types = new ObservableCollection<object>();
        footerObject.cash = "$"+cashTotal;
        footerObject.inkind = "$" +inkindTotal;
        this.project_partcipants.addItem(footerObject);

        //Build funding chart
        //this.fundingChart = this.createPieChart(chartFundingPart, [chartFundingPartData], "OE_pieChartFunding");     
        this.BuildChartParticipant();
    }

    private _GetFieldValue(graphic: esri.Graphic, field: string): string {

        if (typeof graphic.attributes[field] === "undefined")
            return "Undefined Field - " + field;

        if (graphic.attributes[field] === null)
            return "Null Field - " + field;
                               
        return graphic.attributes[field];
    }

    public BuildChartActivity() {
        this._destoryFundingChart();

        //Build funding chart
        this.chartActive = this.createPieChart(this.chartFundingActivity, [this.chartFundingActivityData], "OE_pieChartFunding");        
        this.activeChartName.set("Activity Funding");
    }

    public BuildChartParticipant() {
        this._destoryFundingChart();

        this.chartActive = this.createPieChart(this.chartFundingPart, [this.chartFundingPartData], "OE_pieChartFunding");      
        this.activeChartName.set("Participant Funding");
    }
        
    private _destoryFundingChart() {
        if (this.chartActive) {
            this.app.command("DestroyView").execute(this.chartActive.id);
        }
        this.chartActive = null;                
    }

    private _loadEsirMap(graphicIn: esri.Graphic) {

        var point: esri.geometry.Point = null;

        if (graphicIn && graphicIn.geometry)
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
                slider: false
            });

            this.esriMap.on("load", function (event: any) {
                console.log(event.map);

                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                markerSymbol.setColor(new esri.Color("#00FFFF"));                
                (<esri.Map>event.map).graphics.add(new esri.Graphic(point, markerSymbol));

                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/40");
                (<esri.Map>event.map).addLayer(featureLayer);
            });                     
        }
        else
        {
            this.esriMap.graphics.clear();

            var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
            markerSymbol.setColor(new esri.Color("#00FFFF"));
            this.esriMap.graphics.add(new esri.Graphic(point, markerSymbol));
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

    private createPieChart(chartConfig: any, data: any, targetRegion: string): Chart {
                
        let chartDefinition = new ChartDefinition(chartConfig);
                
        // Create chart view model from chart config & data.
        let chartViewModel = this.chartFactory.createInstance(<any>chartDefinition, ChartFeatureType.SingleFeature, data);
        chartViewModel.width.set(250);
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