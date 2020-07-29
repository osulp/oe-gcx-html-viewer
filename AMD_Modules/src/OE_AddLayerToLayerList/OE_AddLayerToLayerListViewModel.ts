/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";

import { RestHelperHTTPService } from "geocortex/essentials/RestHelperHTTPService";

import { MapService } from "geocortex/essentials/MapService";
import { MapServiceType } from "geocortex/essentials/MapServiceConstants";
import { MapServiceFunction } from "geocortex/essentials/MapServiceConstants";

import { Layer } from "geocortex/essentials/Layer";

import { AddStatusArgs } from "geocortex/infrastructure/commandArgs/AddStatusArgs";
import { ImageProperties } from "geocortex/infrastructure/commandArgs/ImageProperties";
import { SiteServiceDiscoveryProvider } from "geocortex/essentials/serviceDiscovery/SiteServiceDiscoveryProvider";
import { ServiceDiscoveryUtilities } from "geocortex/essentials/utilities/ServiceDiscoveryUtilities";
import { ServiceHelper } from "geocortex/essentials/ServiceHelper";
import { ResultItem } from "geocortex/essentials/serviceDiscovery/ResultItem";
import { LayerListMapServiceItem } from "geocortex/infrastructure/layerList/LayerListMapServiceItem";
import { Site } from "geocortex/essentials/Site";

export class OE_AddLayerToLayerListViewModel extends ViewModelBase {

    app: ViewerApplication;    
    site: any;
    thisViewModel: OE_AddLayerToLayerListViewModel

    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading content...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(false);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);
    resultButtonVisible: Observable<boolean> = new Observable<boolean>(false);
    resultButtonText: Observable<string> = new Observable<string>("New Search");

    searchFieldText: Observable<string> = new Observable<string>("");    
    noResultsVisible: Observable<boolean> = new Observable<boolean>(false);    

    toggleSelectedValue: Observable<boolean> = new Observable<boolean>(false);
    toggleSelectedText: Observable<string> = new Observable<string>("Show Selected");
    textSelectedLayersVisible: Observable<boolean> = new Observable<boolean>(false);

    resultsArrayForSort: any = [];
    resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);
    currentFilteredCount: Observable<string> = new Observable<string>();
    
    usedURLs: any[] = [];
        
    ssdp: SiteServiceDiscoveryProvider;

    remoteServiceURLs: string[] = [];
    remoteServiceURLcurrent: number = 0;
    remoteGCXSites: any = {};

    checkedBoxMap: any;

    parentServiceLayerIDShown: string[] = [];

    oeSearchLayerOptionsVisible: Observable<boolean> = new Observable<boolean>(false);
    
    //portalLayers: any;
    portalServices: any;
                                            
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }

    initialize(config: any): void {
                                                
        this.site = (<any>this).app.site;
        this.thisViewModel = this;

        this.remoteServiceURLs = config.remoteServiceURLs;
        this.checkedBoxMap = {};
                
        if (this.site && this.site.isInitialized) {
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
        this.app.commandRegistry.command("oeLayerSearch").register(this, this.OpenSearchWindow);

        this.ssdp = new SiteServiceDiscoveryProvider();
        this.ssdp.initialize(this.app.site);                
    }

    public OpenSearchWindow() {

        this.app.commandRegistry.command("ActivateView").execute("OE_AddLayerToLayerListView");
        this.CheckSSDPState();
    }

    ShowLoader(loaderMessage: string, showLoader: boolean, showSpinner: boolean, showWarning: boolean, showError: boolean, showResetButton: boolean): void {

        this.loaderMessage.set(loaderMessage);

        this.loaderWarnIcon.set(showWarning);
        this.loaderSpinner.set(showSpinner);
        this.resultButtonVisible.set(showResetButton);

        this.inputBlockOnError.set(showError);
        this.loaderVisible.set(showLoader);
    }

    HideLoader() {
        this.ShowLoader("", false, false, false, false, false);
    }

    public CheckSSDPState() {
                
        if (!this.ssdp.initialized) {
            this.ShowLoader("Initializing...",true,true,false,false, false);                        
            setTimeout(function () { this.CheckSSDPState();}, 500);
        }
        else {
            this.HideLoader();
            this.LoadRemoteServiceSources(false);
        }
    }

    LoadRemoteServiceSources(forceLoad:boolean) {
               
        //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
        //"/map/mapservices?f=json"

        this.oeSearchLayerOptionsVisible.set(false);

        if (!forceLoad && this.resultsObject.length() > 0) {

            //clear checkbox data           
            this.ClearLayerCheckboxes();
            this.checkedBoxMap = {};
            this.searchFieldText.set("");

            this.HideLoader();
            return;
        }
                
        this.ShowLoader("Loading remote services.  This may take a moment...", true, true, false, false, false);
                
        this.checkedBoxMap = {};
        this.resultsArrayForSort = [];
        this.resultsObject.clear();        
        this.usedURLs = [];
        this.searchFieldText.set("");
        this.noResultsVisible.set(false);

        this.remoteServiceURLcurrent = 0;

        if (this.remoteServiceURLs!=null && this.remoteServiceURLs.length > 0) {
            this.RequestSearchSources(this.remoteServiceURLs[this.remoteServiceURLcurrent]);
        }
        else {
            //no service urls!
            this.ShowLoader("Error: No remote service urls.  No search can be performed.", true, false, true, true, true);
        }        
    }

    RemoteServiceLoadedCheck(isError: boolean) {

        this.remoteServiceURLcurrent++;

        if (this.remoteServiceURLcurrent < this.remoteServiceURLs.length) {
            //load next
            this.RequestSearchSources(this.remoteServiceURLs[this.remoteServiceURLcurrent]);
        }
        else {
            //done
            this.SourcesDone();
        }
    }

    SourcesDone(): void {
                
        if (this.resultsArrayForSort.length < 1) {

            this.ShowLoader("Error. No remote services loaded.", true, false, true, false, true);
        }
        else {

            //sort
            this.resultsArrayForSort.sort((a: any, b: any) => {
                if (a.displayName < b.displayName) return -1;
                if (a.displayName > b.displayName) return 1;
                return 0;
            });
                                                
            this.resultsObject.addItems(this.resultsArrayForSort);
            this.resultsArrayForSort = [];

            this.HideLoader();

            //show all results
            this.OESearchLayers(true,false);
        }
    }

    public ClearSearchInput() {
        console.log("Clear search");
        this.searchFieldText.set("");
                       
        //show all results
        this.OESearchLayers(true,false);
    }

    public DoSearch() {
                
        console.log("Do search: " + this.searchFieldText.get());
        this.OESearchLayers(false,false);
    }

    public ToggleSelected() {
        console.log("Toggle selected");
    }

    public OkClicked() {
        console.log("Ok clicked");
    }
        
    public CancelClicked() {                
        this.HideLoader();
        this.app.commandRegistry.command("DeactivateView").execute("OE_AddLayerToLayerListView");
    }

    public CloseError() {
        this.HideLoader();
    }
        
    public CleanURL(val: string): string {
                
        //remove url=
        //val = val.replace("url=", "");

        //url is the first item only use it
        /*if (val.indexOf(";") > -1) {           
            //url
            val = val.split(";")[0];
        }*/

        //some connection strings have the layer id in them.... why?
        if (val.indexOf("/MapServer/") > -1) {
            let searchVal: string = "/MapServer/";
            let selectTo: number = val.indexOf(searchVal) + searchVal.length - 1;
            val = val.substring(0, selectTo);
        }

        if (val.indexOf("/FeatureServer/") > -1) {
            let searchVal: string = "/FeatureServer/";
            let selectTo: number = val.indexOf(searchVal) + searchVal.length - 1;
            val = val.substring(0, selectTo);
        }

        return val;
    }

    public GetURLPart(val: string, searchName: string) {

        let token: string = "";

        //url is the first item only use it
        if (val.indexOf(";") > -1) {
            let valArray: string[] = val.split(";");

            if (val.indexOf(searchName+"=") > -1) {
                for (let i: number = 0; i < valArray.length; i++) {
                    if (valArray[i].indexOf(searchName+"=") > -1) {
                        token = valArray[i].replace(searchName+"=", "");
                        break;
                    }
                }
            }                        
        }

        return token;
    }

    public IsDefined(testObject: any, testProperty: string) {

        if (!testObject.hasOwnProperty(testProperty) || testObject[testProperty] == 'undefined' || testObject[testProperty] == null)
            return false

        return true;
    }

    public RequestSearchSources(urlToLoad:string): void {
                
        var thisRef = this;        
        
        this.ShowLoader("Loading sources...", true, true, false, false, false);
        
        //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
        var siteURL = urlToLoad;
        urlToLoad += "/map/mapservices?f=json";

        var aSettings: any = {
            url: urlToLoad,
            dataType: "jsonp",
            success: function (data) {

                var workingService: any;                                
                let tmpCollection: ObservableCollection<object>;
                let parentIdMap: any = {};
                let sortIndentObject: any;

                for (var i = 0; i < data.mapServices.length; i++) {
                    
                    workingService = data.mapServices[i];

                    //no layers
                    if (!thisRef.IsDefined(workingService, "layers") || workingService.layers.length<1 )
                        continue;

                    workingService["tipURL"] = thisRef.CleanURL(workingService.connectionString);
                    
                    workingService["oeServiceVisible"] = new Observable<boolean>(true);
                    workingService["oeTreeVisible"] = new Observable<boolean>(true);
                    workingService["oeTreeExpand"] = new Observable<boolean>(false);
                    workingService["oeTreeCollapse"] = new Observable<boolean>(true);

                    workingService["oeResultCountString"] = new Observable<string>("0");
                    workingService["oeResultCount"] = 0;
                    workingService["removeCustomServiceVisible"] = new Observable<boolean>(false);
                    workingService["oeCanRemove"] = false;
                                        
                    //layers need custom properties here
                    for (var lyr = 0; lyr < workingService.layers.length; lyr++) {

                        //setup a map for sorting by group name and then layer name
                        if (workingService.layers[lyr]["subLayerIds"].length > 0 &&
                            !thisRef.IsDefined(parentIdMap, workingService.layers[lyr]["id"])) {

                            parentIdMap["k"+workingService.layers[lyr]["id"]] = workingService.layers[lyr];
                        }

                        workingService.layers[lyr]["siteURL"] = siteURL;
                        workingService.layers[lyr]["mapServiceConnectionString"] = workingService.connectionString;
                        workingService.layers[lyr]["mapServiceID"] = workingService.id;
                                                                        
                        workingService.layers[lyr]["layerCheckbox"] = new Observable<boolean>(false);
                        workingService.layers[lyr]["oeLayerVisible"] = new Observable<boolean>(true);
                        workingService.layers[lyr]["nameAlt"] = thisRef.CleanURL(workingService.connectionString);                        

                        //sort by displayName by default
                        workingService.layers[lyr]["nameGroupSort"] = workingService.layers[lyr]["displayName"];

                        //layer group?
                        workingService.layers[lyr]["oeSearchLayerGroup"] = new Observable<string>("layer-item-name");
                        if (workingService.layers[lyr].type.toLowerCase() == "grouplayer") {                            
                            workingService.layers[lyr]["oeSearchLayerGroup"].set("layer-item-name oeLayerSearchLayerGroup");                                                                                
                        }
                    }

                    for (var lyr = 0; lyr < workingService.layers.length; lyr++) {

                        workingService.layers[lyr]["oeIndentLevel"] = new Observable<string>("");
                        sortIndentObject = thisRef.IndentLevel(parentIdMap, workingService.layers[lyr]);                        

                        workingService.layers[lyr]["nameGroupSort"] = sortIndentObject.sort;
                                                
                        if (sortIndentObject.indent != "") {                            
                            workingService.layers[lyr]["oeIndentLevel"].set("padding-left:" + sortIndentObject.indent + "px");
                        } 
                        
                    }

                    //layers needs to be an observable collection
                    tmpCollection = new ObservableCollection<object>();

                    workingService.layers.sort((a: any, b: any) => {
                        if (a.nameGroupSort < b.nameGroupSort) return -1;
                        if (a.nameGroupSort > b.nameGroupSort) return 1;
                        return 0;
                    });

                    tmpCollection.addItems(workingService.layers);
                    workingService.layers = tmpCollection;
                                                            
                    thisRef.resultsArrayForSort.push(workingService);
                }
                
                thisRef.RemoteServiceLoadedCheck(false);
            }
        };

        $.ajax(aSettings)
            .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Sources request failed.");                
                thisRef.RemoteServiceLoadedCheck(true);
            });
    }

    public IndentLevel(parentIdMap:any, workingLayer: any): any {

        let indentOut: number = 0;
        let workingParentID: string = workingLayer.parentLayerId;
        let workingKey: string;
        let outProp: any = { "sort": workingLayer.displayName, "indent": "" };
                        
        while (workingParentID != null) {

            //indent now
            indentOut++;

            //get the next parent
            workingKey = "k" + workingParentID;

            //parent in map?
            if (!this.IsDefined(parentIdMap, workingKey)) {
                break;
            }

            //update sort string
            outProp.sort = parentIdMap[workingKey].displayName + outProp.sort;

            //does the parent have a parent id?
            if (!this.IsDefined(parentIdMap[workingKey], "parentLayerId")) {
                break;
            }

            //possible next parent
            workingParentID = parentIdMap[workingKey].parentLayerId;
        }

        if (indentOut > 0) {
            outProp.indent = (indentOut * 24).toString();
        }

        return outProp;
    }

    public RemoveService(workingService: any) {

        let target: number = -1;

        for (let i: number = 0; i < this.resultsObject.getLength(); i++) {
            let record: any = this.resultsObject.getAt(i);
            if (record.connectionString == workingService.connectionString && record.oeCanRemove) {
                target = i;
                break;
            }
        }

        if (target > -1) {
            this.resultsObject.removeAt(target);
        }

        this.OESearchLayers(true, false);
    }

    public ShowDirectServiceURL() {

        this.oeSearchLayerOptionsVisible.set(false);

        var thisRef = this;

        //load map service
        let workingURL: string = this.searchFieldText.get();
        this.searchFieldText.set("");
        let urlArray: string[] = workingURL.split("/");

        let workingServiceURL: string;
        let workingLayerID: string = null;

        //url has a layer id on the end
        if (urlArray[urlArray.length-1].toLowerCase().indexOf("server") < 0) {

            workingLayerID = urlArray[urlArray.length-1];
            workingServiceURL = "";

            for (let i: number = 0; i < urlArray.length - 1; i++) {
                workingServiceURL += urlArray[i] + "/";
            }
        }
        else {
            workingServiceURL = workingURL;
        }

        console.log("Working url: "+workingServiceURL);

        //load the service information
        let urlToLoad = workingServiceURL+"?f=json";
        
        var aSettings: any = {
            url: urlToLoad,
            dataType: "jsonp",
            success: function (data) {
                
                var workingService: any;
                let tmpCollection: ObservableCollection<object>;
                let parentIdMap: any = {};
                let sortIndentObject: any;

                workingService = {};

                if (!thisRef.IsDefined(data, "documentInfo") )
                    workingService["displayName"] = workingServiceURL;
                else if(data.documentInfo.Title != "")
                    workingService["displayName"] = data.documentInfo.Title;
                else if (data.documentInfo.Subject != "")
                    workingService["displayName"] = data.documentInfo.Subject;
                else
                    workingService["displayName"] = workingServiceURL;

                workingService["tipURL"] = workingServiceURL;
                workingService["connectionString"] = workingServiceURL;

                workingService["oeServiceVisible"] = new Observable<boolean>(true);
                workingService["oeTreeVisible"] = new Observable<boolean>(true);
                workingService["oeTreeExpand"] = new Observable<boolean>(false);
                workingService["oeTreeCollapse"] = new Observable<boolean>(true);

                workingService["oeResultCountString"] = new Observable<string>("0");
                workingService["oeResultCount"] = 0;
                workingService["removeCustomServiceVisible"] = new Observable<boolean>(true);
                workingService["oeCanRemove"] = true;
                                
                if (workingLayerID != null) {

                    //only add one layer
                    workingService["layers"] = [];

                    for (var i = 0; i < data.layers.length; i++) {
                        if (workingLayerID == data.layers[i].id) {
                            workingService["layers"].push(data.layers[i]);
                        }
                        else if (data.layers[i].subLayerIds != null && data.layers[i].subLayerIds.indexOf(Number(workingLayerID))>-1) {
                            workingService["layers"].push(data.layers[i]);
                        }
                    }
                }
                else {
                    //all layers
                    workingService["layers"] = data.layers;
                }

                for (var i = 0; i < workingService.layers.length; i++) {
                    
                    if (workingService.layers[i].parentLayerId == -1)
                        workingService.layers[i].parentLayerId = null;

                    workingService.layers[i]["name"] = workingService.layers[i].name;
                    workingService.layers[i]["displayName"] = workingService.layers[i].name;

                    //setup a map for sorting by group name and then layer name
                    if (workingService.layers[i]["subLayerIds"] != null &&
                        !thisRef.IsDefined(parentIdMap, workingService.layers[i]["id"])) {

                        parentIdMap["k" + workingService.layers[i]["id"]] = workingService.layers[i];
                    }
                                        
                    workingService.layers[i]["mapServiceConnectionString"] = "url="+workingServiceURL;
                    workingService.layers[i]["mapServiceID"] = null;

                    workingService.layers[i]["layerCheckbox"] = new Observable<boolean>(false);
                    workingService.layers[i]["oeLayerVisible"] = new Observable<boolean>(true);
                    workingService.layers[i]["nameAlt"] = workingServiceURL;

                    //sort by displayName by default
                    workingService.layers[i]["nameGroupSort"] = workingService.layers[i].name;

                    //layer group?
                    workingService.layers[i]["oeSearchLayerGroup"] = new Observable<string>("layer-item-name");
                    if (workingService.layers[i]["subLayerIds"] != null) {
                        workingService.layers[i]["oeSearchLayerGroup"].set("layer-item-name oeLayerSearchLayerGroup");
                    }
                }

                for (var i = 0; i < workingService.layers.length; i++) {

                    workingService.layers[i]["oeIndentLevel"] = new Observable<string>("");
                    sortIndentObject = thisRef.IndentLevel(parentIdMap, workingService.layers[i]);

                    workingService.layers[i]["nameGroupSort"] = sortIndentObject.sort;

                    if (sortIndentObject.indent != "") {
                        workingService.layers[i]["oeIndentLevel"].set("padding-left:" + sortIndentObject.indent + "px");
                    }

                }

                //layers needs to be an observable collection
                tmpCollection = new ObservableCollection<object>();

                workingService.layers.sort((a: any, b: any) => {
                    if (a.nameGroupSort < b.nameGroupSort) return -1;
                    if (a.nameGroupSort > b.nameGroupSort) return 1;
                    return 0;
                });

                tmpCollection.addItems(workingService.layers);
                workingService.layers = tmpCollection;

                //thisRef.resultsArrayForSort.push(workingService);                
                //thisRef.RemoteServiceLoadedCheck(false);
                //thisRef.SourcesDone();

                //insert service to list
                (<ObservableCollection<object>>thisRef.resultsObject).insertItem(0, workingService);
                thisRef.HideLoader();
                thisRef.OESearchLayers(true, false);                                
            }
        };

        $.ajax(aSettings)
            .fail(function (xhr, ajaxOptions, thrownError) {                
                console.log("Sources request failed.");
                thisRef.HideLoader();
                //thisRef.RemoteServiceLoadedCheck(true);
            });
            
    }

    public ClearLayerCheckboxes() {

        for (var i = 0; i < this.resultsObject.length(); i++) {

            if (!this.IsDefined((<any>this.resultsObject.getAt(i)), "layers"))
                continue;

            for (var lptr = 0; lptr < (<any>this.resultsObject.getAt(i)).layers.length(); lptr++) {

                if (!this.IsDefined((<any>this.resultsObject.getAt(i)).layers.getAt(lptr), "layerCheckbox"))
                    continue;

                (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).layerCheckbox.set(false);
            }
        }
    }

    public ExpandAllTrees(val:boolean) {

        this.oeSearchLayerOptionsVisible.set(false);

        for (var i = 0; i < this.resultsObject.length(); i++) {

            (<any>this.resultsObject.getAt(i)).oeTreeVisible.set(val);

            if (val) {
                (<any>this.resultsObject.getAt(i)).oeTreeExpand.set(false);
                (<any>this.resultsObject.getAt(i)).oeTreeCollapse.set(true);
            }
            else {
                (<any>this.resultsObject.getAt(i)).oeTreeExpand.set(true);
                (<any>this.resultsObject.getAt(i)).oeTreeCollapse.set(false);
            }            
        }
    }

    public OESearchLayers(showAllFilter: boolean, onlySelected:boolean): void {

        this.oeSearchLayerOptionsVisible.set(false);

        if (!onlySelected) {
            this.toggleSelectedValue.set(false);
            this.toggleSelectedText.set("Show Selected");
        }        

        if (this.resultsObject.length() < 1) {
            this.ShowLoader("Error: No layers to search.", true, false, false, true, true);
            return;
        }

        this.ShowLoader("Searching...",true,true,false,false,false);
        
        var searchText: string = this.searchFieldText.get().toLowerCase();        
        let foundItem: boolean = showAllFilter;
        let foundCount: number = 0;
        let childCount: number = 0;
        let showLayersForServiceHit: boolean = false;

        let serviceLayerKey: string;
        this.parentServiceLayerIDShown = [];

        //services
        for (var i = 0; i < this.resultsObject.length(); i++) {

            if (!this.IsDefined(this.resultsObject.getAt(i), "layers"))
                continue;
                        
            (<any>this.resultsObject.getAt(i)).oeServiceVisible.set(showAllFilter);

            showLayersForServiceHit = false;
            //service name, show all layer?
            if ((<any>this.resultsObject.getAt(i)).displayName.toLowerCase().indexOf(searchText) > -1) {
                showLayersForServiceHit = true;
            }

            (<any>this.resultsObject.getAt(i)).oeResultCount = 0;

            //layers
            for (var lptr = 0; lptr < (<any>this.resultsObject.getAt(i)).layers.length(); lptr++) {

                serviceLayerKey = i + (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).id;

                //layer already handled, skip
                if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1)
                    continue;
                                
                if (showAllFilter) {
                    (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(showAllFilter);
                    foundCount++;
                }
                else {
                                        
                    if (onlySelected) {

                        //layer is selected
                        if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).layerCheckbox.get()) {

                            //show service tree if a layer is on
                            (<any>this.resultsObject.getAt(i)).oeServiceVisible.set(true);

                            //show layer
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(true);
                            this.parentServiceLayerIDShown.push(serviceLayerKey);

                            foundItem = true;
                            foundCount++;
                                                        
                            //if this is a group layer show children
                            if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).subLayerIds.length > 0) {
                                childCount = this.ShowImmediateChildren(i, (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).subLayerIds);
                                foundCount += childCount;
                            }

                            //enable all parents
                            if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).parentLayerId != null) {
                                this.ShowParents(i, (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).parentLayerId);
                            }
                        }
                        else if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1) {
                            //layer is already toggled on, do nothing
                            console.log("do nothing");
                        }
                        else {
                            //hide layer
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(false);
                        }
                    }
                    else {
                                                
                        if (showLayersForServiceHit || (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).name.toLowerCase().indexOf(searchText) > -1 ||
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).displayName.toLowerCase().indexOf(searchText) > -1) {

                            foundItem = true;
                            foundCount++;

                            if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) < 0)
                                (<any>this.resultsObject.getAt(i)).oeResultCount++;
                                                        
                            (<any>this.resultsObject.getAt(i)).oeServiceVisible.set(true);
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(true);
                            this.parentServiceLayerIDShown.push(serviceLayerKey);

                            childCount = 0;
                            //if this is a group layer show children
                            if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).subLayerIds != null && (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).subLayerIds.length > 0) {
                                childCount = this.ShowImmediateChildren(i, (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).subLayerIds);
                                foundCount += childCount;
                            }
                                                        
                            (<any>this.resultsObject.getAt(i)).oeResultCount += childCount;
                            
                            //enable all parents
                            if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).parentLayerId != null) {
                                this.ShowParents(i, (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).parentLayerId);
                            }
                        }
                        else if (this.parentServiceLayerIDShown.indexOf(serviceLayerKey) > -1)
                        {
                            //layer is already toggled on, do nothing
                            console.log("do nothing");
                        }
                        else {
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(false);
                        }
                    }
                    
                }                                
            }
            //end layers

            if (showAllFilter || onlySelected)
                (<any>this.resultsObject.getAt(i)).oeResultCountString.set("");
            else
                (<any>this.resultsObject.getAt(i)).oeResultCountString.set("(" + (<any>this.resultsObject.getAt(i)).oeResultCount.toString() + ")");
        }
        //end services

        this.noResultsVisible.set(false);
        this.textSelectedLayersVisible.set(false);
        this.currentFilteredCount.set(foundCount.toString());
        this.HideLoader();

        if (onlySelected && foundItem) {            
            //this.HideLoader();
        }
        else if (onlySelected && !foundItem) {
            this.textSelectedLayersVisible.set(true);
            //this.HideLoader();            
        }
        else if (foundItem) {            
            //this.HideLoader();            
        }
        else {            
            //this.ShowLoader("No results for: " + this.searchFieldText.get(), true, false, true, false, true);            
            this.noResultsVisible.set(true);
        }
    }

    ShowParents(serviceIndex:number, parentID:string): number {
        let valOut: number = 0;
        let continueLoop: boolean = true;

        while (continueLoop) {

            continueLoop = false;

            for (let i: number = 0; i < (<any>this.resultsObject.getAt(serviceIndex)).layers.getLength(); i++) {

                if (parentID == (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(i).id) {
                    
                    (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(i).oeLayerVisible.set(true);
                    this.parentServiceLayerIDShown.push(serviceIndex + (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(i).id);
                    
                    parentID = (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(i).parentLayerId;

                    continueLoop = true;
                }
            }
        }
       
        return valOut;
    }

    ShowImmediateChildren(serviceIndex:number, subLayersArray:any): number {

        let valOut: number = 0;
        //let serviceIndex: number;

        for (let i: number = 0; i < subLayersArray.length; i++) {

            for (let j: number = 0; j < (<any>this.resultsObject.getAt(serviceIndex)).layers.getLength(); j++) {

                if (this.parentServiceLayerIDShown.indexOf(serviceIndex + subLayersArray[i]) > -1)
                    continue;

                if (subLayersArray[i] == (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(j).id)
                {
                    (<any>this.resultsObject.getAt(serviceIndex)).layers.getAt(j).oeLayerVisible.set(true);
                    this.parentServiceLayerIDShown.push(serviceIndex + subLayersArray[i]);
                    valOut++;
                }                    
            }
        }

        return valOut;
    }

    ResolveLayerTest() {
        let customLayer: any = {};
        //customLayer.mapServiceConnectionString = "https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer";
        //customLayer.mapServiceConnectionString = "https://chetco-new.dsl.state.or.us/arcgis/rest/services/Maps/ESH_State_15/MapServer";
        customLayer.mapServiceConnectionString = "https://gis.dogami.oregon.gov/arcgis/rest/services/secured/StatewideEQ_gen2/MapServer?tokenUrl=https://gis.dogami.oregon.gov/arcgis/tokens/generateToken&layerMask=Active Faults";
        customLayer.mapServiceID = null;
        customLayer.description = "This is a custom description.";
        customLayer.displayName = "Custom Layer A";
        customLayer.id = "0";

        //layerMask=Active Faults;tokenUrl=https://gis.dogami.oregon.gov/arcgis/tokens/generateToken

        //this.OEAddMapServiceFromGecortexLayer(customLayer);
        this.CheckToken(customLayer);
    }

    CheckToken(gcxLayer: any) {

        if (gcxLayer.mapServiceConnectionString.indexOf(";token=") > -1) {
            this.LoadGCXSiteForSecureRequest(gcxLayer);
            //this.OEAddMapServiceFromGecortexLayer(gcxLayer);

        }
        else {
            this.OEAddMapServiceFromGecortexLayer(gcxLayer);
        }            
    }

    OEAddMapServiceFromGecortexLayer(gcxLayer: any) {
                
        //MapUtilities
        //createMapServiceFromJson

        let thisRef: any = this;        
        //let url: string = this.CleanURL(gcxLayer.mapServiceConnectionString);//"https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/restoration/OITT/MapServer";
        let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');        
        url = this.CleanURL(url);
                                
        class TMPItem implements ResultItem {
            isWhitelisted?: boolean;
            id: string;
            name: string;
            displayName: string;
            description: string;
            discoveryProviderName: string;
            serviceProviderName: string;
            url: string;
            serviceType: string[];
            thumbnailUrl: string;
            boundingBox?: any;
            children: ResultItem[];
            hasChildren: boolean;
            currentPageInfo: any;
            connection: any;
            layerMask: string;
            mapStyle: string;
            styleUrl: string;
            isContainerForRealResult: boolean;
            isLastItemOfPage: boolean;

        }

        let rItem: TMPItem = new TMPItem();
        rItem.connection = { id: null }; //{ id: (gcxLayer.mapServiceID != null) ? gcxLayer.mapServiceID.toString() : null }
        rItem.description = gcxLayer.description;
        rItem.discoveryProviderName = "ArcGisServerDiscoveryProvider";
        rItem.displayName = gcxLayer.displayName;
        rItem.serviceProviderName = "Geocortex.Gis.Services.ArcGisServer.Rest";
        rItem.serviceType = ["None", "FeatureLayer", "ServiceLayer", "MapService"];
                       
        
        let tokenUrl = this.GetURLPart(gcxLayer.mapServiceConnectionString, "tokenUrl");
        let layerMask = this.GetURLPart(gcxLayer.mapServiceConnectionString, "layerMask");

        let tokenVal = this.GetURLPart(gcxLayer.mapServiceConnectionString, "token");
        rItem["serviceToken"] = tokenVal;
        //rItem["connectionString"] = gcxLayer.mapServiceConnectionString;
        
        //rItem.url = url + "/" + gcxLayer.id + "?token=" + tokenVal;
        url = url + "/" + gcxLayer.id;
        if (tokenVal!="")
            url = RestHelperHTTPService.appendTokenToUrl(url, tokenVal);
        rItem.url = url;
        
                        
        console.log("Realize Map Service: " + rItem.displayName);
        console.log("Realize Map Service: " + rItem.url);
                               
        //RestHelperHTTPService.setDefaultToken(urlToken, url);        
        //RestHelperHTTPService.
        //RestHelperHTTPService.setDefaultToken
        //RestHelperHTTPService.setDefaultToken()
        /*if (RestHelperHTTPService.urlHasToken(rItem.url)) {
            console.log("Url has token");
        }*/

        this.AddServiceItem(rItem);                
    }

    /*CreateMapService(gcxLayer: any) {
        //try map service method

        let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
        url = this.CleanURL(url);

        //class TMPClass implements ResultItem { }

        //MapServiceInfo

        let workingService: MapService = new MapService(url);
        
        workingService.serviceToken = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'token');
        workingService.drawingBehavior = "MapService";

        //let layerOptions = { "id": gcxLayer.id, "opacity": 1, "showAttribution": false };
        //let dLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, layerOptions);
        //dLayer.setVisibleLayers([layerName]);
        //dLayer.setVisibleLayers([7]);

        //workingService.serviceLayer = dLayer;
        workingService.mapServiceType = MapServiceType.DYNAMIC;
        workingService.isUserCreated = true;
        workingService.userLayerType = "LayerAddition";
        workingService.includeInLayerList = true;
        //workingService.essentialsMap = this.app.site.essentialsMap;                
        workingService.displayName = gcxLayer.name;
        //newMapService.disableClientCaching = true;
        workingService.mapServiceFunction = MapServiceFunction.OPERATIONAL;
        workingService.opacity = 1;

        //workingService._configureObject()
    }*/

    AddServiceItem(serviceItem: any) {

        let thisRef = this;

        thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Requesting service: ' + serviceItem.displayName, null, null, serviceItem.url, 10000, true));

        Promise.resolve(this.ssdp.realizeMapService(serviceItem, this.app.map.spatialReference.wkid.toString()))
            .then(
                function (e) {

                    thisRef.app.commandRegistry.command("RemoveStatus").execute(e.serviceLayer.url);
                    thisRef.app.command("AddMapService").execute(e);

                    console.log("Adding Map Service: " + e.displayName);
                    console.log("Adding Map Service: " + e.serviceLayer.url);
                }
            ).catch(function (e) {

                thisRef.app.commandRegistry.command("RemoveStatus").execute(serviceItem.url);
                thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Service unavailable: ' + serviceItem.displayName, { uri: "Resources/Images/Custom/warning.png", altText: "", class: "" }, null, null, 0, false));

                console.log("RealizeMapService catch: " + e);
                console.log("RealizeMapService catch: " + e.message);
                console.log("RealizeMapService catch: " + e.status);
            }
            ).error(function (e) {
                thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Service unavailable (e): ' + serviceItem.displayName, { uri: "Resources/Images/Custom/warning.png", altText: "", class: "" }, null, null, 0, false));
                console.log("RealizeMapService Error: " + e);
            });
    }

    LoadGCXSiteForSecureRequest(gcxLayer:any) {

        var thisRef = this;

        if (!this.IsDefined(this.remoteGCXSites, gcxLayer.siteURL)) {
            let map = new esri.Map("oeLayerSearchJunkMap");
            let essentialsSite = new Site(gcxLayer.siteURL, map);

            essentialsSite.onInitialized = function (args) {
                thisRef.remoteGCXSites[gcxLayer.siteURL] = args;
                console.log("Site ready");
                console.log(args);

                //let url: string = thisRef.CleanURL(gcxLayer.mapServiceConnectionString);
                let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
                url = thisRef.CleanURL(url);
                //url += "/" + gcxLayer.id;

                args.essentialsMap.mapServices.forEach(s1 => {
                    if (s1.serviceUrl == url) {

                        if (s1.layers != null) {
                            s1.layers.forEach(l1 => {
                                if (gcxLayer.id == l1.id) {

                                    //add layer directly without reslove?
                                    //thisRef.OEAddMapServiceFromGecortexLayer(gcxLayer);
                                    //thisRef.AddServiceItem(s1);
                                    thisRef.app.command("AddMapService").execute(s1);

                                    return;
                                }
                            });
                        }

                    }
                });

                /*this.app.eventRegistry.event("LayerListInitializedEvent").subscribe(this, (sender: RestLayerList) => {
                    // look for tables
                    this.layerList = sender;
                    if (this.app.site.principal.isAuthenticated) {
                        this._getDevSubTypes();
                    }
                });*/
            };

            essentialsSite.onInitializationFailed = function (args) {
                console.log("Site failed");
                console.log(args);
            };

            this.remoteGCXSites[this.remoteServiceURLs[this.remoteServiceURLcurrent]] = essentialsSite;
            this.remoteGCXSites[this.remoteServiceURLs[this.remoteServiceURLcurrent]].initialize();
        }
        else {
            //site already loaded, try adding layer
            this.OEAddMapServiceFromGecortexLayer(gcxLayer);
        }
    }
    
    
    public OESearchPortalLayers(): void {

        //?q=wildfire+%2B+%22map+service%22&bbox=&sortField=&sortOrder=

        this.resultsObject.clear();

        var thisRef = this;
        var recordsToProcess = 0;
        var workingTitle = "";
        var workingURL = "";

        let workingMapService: MapService;
        let workingLayer: Layer;

        var usedURLs = [];
                
        this.portalServices = [];
                
        let urlToLoad: string = "https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search";
                
        var aSettings: any = {
            url: urlToLoad,   
            type:"GET",
            dataType: "jsonp",
            data: { "q": this.searchFieldText.get(), "start":1, "num":100, f:"json"},
            success: function (data) {

                if (data.results.length < 1) {
                    console.log("No hits for search term.");
                }
                else {

                    console.log("Results: " + data.results.length);
                    recordsToProcess = data.results.length;

                    for (var i = 0; i < data.results.length; i++) {

                        //check each result for a map service and load the layers from that service                                                            
                        if (data.results[i].type == "Map Service" && data.results[i].url.length > 0) {

                            console.log("Title: " + data.results[i].title);
                            console.log("Map service url: " + data.results[i].url);
                            workingTitle = data.results[i].title;
                            workingURL = data.results[i].url;
                            //usedURLs.push(workingURL);
                            
                            thisRef.ssdp.findServices(workingURL).then(
                                function (e) {
                                    console.log("Find Service");
                                    console.log(workingURL);
                                    console.log(e);
                                }
                            );

                            /*workingMapService = new MapService(workingURL +"?f=json");
                            workingMapService.onInitialized = function (args) {
                                console.log("service up!");

                                console.log(workingURL);
                                console.log(args);
                            };
                            workingMapService.onInitializationFailed = function (args) {
                                console.log("service failed!");
                                console.log(workingURL);
                                console.log(args);
                            }
                            workingMapService.initialize();*/

                            recordsToProcess--;
                            thisRef.IsSearchDone(recordsToProcess);

                            /*$.get(workingURL + "?f=json", null, null, "json")
                                .done(function (serviceUrlResult) {

                                    console.log(serviceUrlResult);
                                                                        
                                    //only add layers with no subLayerIds
                                    for (var layerIndex = 0; layerIndex < serviceUrlResult.layers.length; layerIndex++) {

                                        if (serviceUrlResult.layers[layerIndex].subLayerIds == null &&
                                            serviceUrlResult.layers[layerIndex].name.toLowerCase().indexOf(thisRef.searchFieldText.get().toString().toLowerCase()) > -1) {
                                            
                                            serviceUrlResult.layers[layerIndex].serviceTitle = workingTitle;
                                            serviceUrlResult.layers[layerIndex].serviceURL = workingURL;
                                            serviceUrlResult.layers[layerIndex].nameLong = serviceUrlResult.layers[layerIndex].name + " (" + workingURL + ")";
                                            serviceUrlResult.layers[layerIndex].displayName = serviceUrlResult.layers[layerIndex].name;

                                            //thisRef.portalLayers.push(serviceUrlResult.layers[layerIndex]);
                                        }
                                    }

                                    serviceUrlResult.layers.sort((a: any, b: any) => {
                                        if (a.name < b.name) return -1;
                                        if (a.name > b.name) return 1;
                                        return 0;
                                    });

                                    thisRef.portalServices.push(serviceUrlResult);

                                    //thisRef.resultsObject.addItem(workingResultAndLayers);
                                    recordsToProcess--;
                                    thisRef.IsSearchDone(recordsToProcess);
                                })
                                .fail(function (xhr, ajaxOptions, thrownError) {
                                    recordsToProcess--;
                                    console.log("Failed to load map service layers: " + data.results[i].url);
                                    thisRef.IsSearchDone(recordsToProcess);
                                });*/
                            
                        }
                        else {
                            recordsToProcess--;
                            thisRef.IsSearchDone(recordsToProcess);
                        }
                    }
                }
            }
        };

        $.ajax(aSettings)
            .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Portal sources request failed.");
                thisRef.RemoteServiceLoadedCheck(true);
            });
                                
        /*$.get("https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search", { "q": this.searchFieldText.get(), "start":1,"num":100, "f": "json" }, null, "json")
            .done(function (result) {

                if (result.num < 1) {
                    console.log("No hits for search term.");
                }
                else {

                    console.log("Results: " + result.results.length);
                    recordsToProcess = result.results.length;
                     
                    for (var i = 0; i < result.results.length; i++) {                        

                        //check each result for a map service and load the layers from that service                                                            
                        if (usedURLs.indexOf(result.results[i].url)<0 && result.results[i].type == "Map Service" && result.results[i].url.length > 0) {

                            console.log("Title: " + result.results[i].title);
                            console.log("Map service url: " + result.results[i].url);
                            workingTitle = result.results[i].title;
                            workingURL = result.results[i].url;
                            usedURLs.push(workingURL);
                            //let workingLayers: any = { "title": result.results[i].title, "layers": [] };

                            $.get(result.results[i].url + "?f=json", null, null, "json")
                                .done(function (serviceUrlResult) {

                                    console.log(serviceUrlResult);

                                    //only add layers with no subLayerIds
                                    for (var layerIndex = 0; layerIndex < serviceUrlResult.layers.length; layerIndex++) {
                                        
                                        if (serviceUrlResult.layers[layerIndex].subLayerIds == null && 
                                            serviceUrlResult.layers[layerIndex].name.toLowerCase().indexOf(thisRef.searchFieldText.get().toString().toLowerCase()) > -1) {
                                            //workingResultAndLayers.layers.push(serviceUrlResult.layers[layerIndex]);
                                            serviceUrlResult.layers[layerIndex].serviceTitle = workingTitle;
                                            serviceUrlResult.layers[layerIndex].serviceURL = workingURL;
                                            serviceUrlResult.layers[layerIndex].nameLong = serviceUrlResult.layers[layerIndex].name + " (" +workingURL+")";
                                            //thisRef.resultsObject.addItem(serviceUrlResult.layers[layerIndex]);
                                            thisRef.portalLayers.push(serviceUrlResult.layers[layerIndex]);
                                        }
                                    }
                                                                        
                                    //thisRef.resultsObject.addItem(workingResultAndLayers);
                                    recordsToProcess--;
                                    thisRef.IsSearchDone(recordsToProcess);
                                })
                                .fail(function (xhr, ajaxOptions, thrownError) {                                                                        
                                    recordsToProcess--;
                                    console.log("Failed to load map service layers: " + result.results[i].url);                                    
                                    thisRef.IsSearchDone(recordsToProcess);
                                });
                        }
                        else {
                            recordsToProcess--;
                            thisRef.IsSearchDone(recordsToProcess);
                        }
                    }
                }
            })
            .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Portal Search Failed.");
            });*/
    }

    public IsSearchDone(recordsToProcess:any) {

        console.log("Records to process: " + recordsToProcess);

        if (recordsToProcess > 0)
            return;

        /*this.portalLayers.sort((a: any, b: any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });*/

        console.log("Results: " + this.portalServices.length);
        console.log("Results: " + this.portalServices);

        //this.resultsObject.addItems(this.portalLayers);   
        //console.log("Results Object Count: " + this.resultsObject.length());
        //console.log("Results Object: " + this.resultsObject);
    }

/*
    OEAddMapService(context:any, layerName:string) {
        let url: string = context.serviceURL; //"https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/restoration/OITT/MapServer";
        let workingService: MapService = new MapService(url);


        let layerOptions = { "id": context.customID, "opacity": 1, "showAttribution": false };
        let dLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, layerOptions);
        dLayer.setVisibleLayers([layerName]);
        //dLayer.setVisibleLayers([7]);
                
        workingService.serviceLayer = dLayer;
        workingService.mapServiceType = MapServiceType.DYNAMIC;
        workingService.isUserCreated = true;
        workingService.userLayerType = "LayerAddition";
        workingService.includeInLayerList = true;
        //workingService.essentialsMap = this.app.site.essentialsMap;                
        workingService.displayName = context.name;
        //newMapService.disableClientCaching = true;
        workingService.mapServiceFunction = MapServiceFunction.OPERATIONAL;
        workingService.opacity = 1;

        dLayer.on("load", (args) => {
            workingService.id = dLayer.id;
            this.thisViewModel.app.commandRegistry.commands.AddMapService.execute(workingService);
        });

        dLayer.on("error", (args) => {
            console.log("Error in initializing map service: {0}".format(args.error));
        });
    }
    */
}