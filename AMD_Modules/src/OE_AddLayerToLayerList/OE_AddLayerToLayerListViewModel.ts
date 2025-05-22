/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";

import { RestHelperHTTPService } from "geocortex/essentials/RestHelperHTTPService";

import { AddStatusArgs } from "geocortex/infrastructure/commandArgs/AddStatusArgs";
import { SiteServiceDiscoveryProvider } from "geocortex/essentials/serviceDiscovery/SiteServiceDiscoveryProvider";
import { ServiceHelper } from "geocortex/essentials/ServiceHelper";
import { ResultItem } from "geocortex/essentials/serviceDiscovery/ResultItem";
import { Site } from "geocortex/essentials/Site";
import { MapService } from "geocortex/essentials/MapService";
import { LegendItemProviderFactory } from "geocortex/infrastructure/legend/LegendItemProviderFactory";
import { LayerList } from "geocortex/infrastructure/layerList/LayerList";
import { LayerListItem } from "geocortex/infrastructure/layerList/LayerListItem";
import { LegendItem } from "geocortex/infrastructure/legend/LegendItem";

export class OE_AddLayerToLayerListViewModel extends ViewModelBase {

    app: ViewerApplication;    
    site: any;
    thisViewModel: OE_AddLayerToLayerListViewModel;

    menuItems: [{}];

    loaderVisible: Observable<boolean> = new Observable<boolean>(true);
    loaderMessage: Observable<string> = new Observable<string>("Loading content...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(false);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);
    resultButtonVisible: Observable<boolean> = new Observable<boolean>(false);
    resultButtonText: Observable<string> = new Observable<string>("New Search");

    searchFieldText: Observable<string> = new Observable<string>("");    
    noResultsVisible: Observable<boolean> = new Observable<boolean>(false);
    layerDetailsVisible: Observable<boolean> = new Observable<boolean>(false);

    toggleLiveValue: Observable<boolean> = new Observable<boolean>(false);
    toggleLiveText: Observable<string> = new Observable<string>("Show Live");

    toggleSelectedValue: Observable<boolean> = new Observable<boolean>(false);
    toggleSelectedText: Observable<string> = new Observable<string>("Show Selected");
    textSelectedLayersVisible: Observable<boolean> = new Observable<boolean>(false);

    resultsArrayForSort: any = [];
    resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);
    currentFilteredCount: Observable<string> = new Observable<string>();
    
    usedURLs: any[] = [];
    layerListURLS: string[] = [];
        
    ssdp: SiteServiceDiscoveryProvider;

    defaultRemoteUrls: string[] = [];
    defaultRemoteUrlsCurrent: number = 0;
    
    gcxServiceMaps: string[] = [];
    gcxServiceMapsCurrent: number = 0;
    gcxServiceMapsFlagLive: string[] = [];

    remoteGCXSites: any = {};

    checkedBoxMap: any;
    checkBoxGroupID: number = 0;

    parentServiceLayerIDShown: string[] = [];

    oeSearchLayerOptionsVisible: Observable<boolean> = new Observable<boolean>(false);
    
    //portalLayers: any;
    portalServices: any;

    isSmallShell: boolean = false;
                                            
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }

    initialize(config: any): void {
                                                
        this.site = (<any>this).app.site;
        this.thisViewModel = this;

        this.gcxServiceMaps = config.gcxServiceMaps;
        this.gcxServiceMapsFlagLive = config.gcxServiceMapsFlagLive ? config.gcxServiceMapsFlagLive : [];

        this.defaultRemoteUrls = config.defaultRemoteUrls;
        this.checkedBoxMap = {};

        this.menuItems = config.menuItems ? config.menuItems : [];
                
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

        let shellElement: any = $(".shell-small");
        if (shellElement.length >0)
            this.isSmallShell = true;

        //layer search window
        this.app.commandRegistry.command("oeLayerSearch").register(this, this.OpenSearchWindow);
                
        //toggle legend view in layer list
        this.app.commandRegistry.command("oeToggleLayerListLegend").register(this, this.oeToggleLayerListLegend);

        this.app.eventRegistry.event("LayerRemovedEvent").subscribe(this, (args) => {
            this.serviceOrLayerRemoved(args.url, false);
        });

        this.app.eventRegistry.event("MapServiceRemovedEvent").subscribe(this, (args) => {
            this.serviceOrLayerRemoved(args.serviceUrl, true);
        });
        
        this.app.eventRegistry.event("FeatureDetailsInvokedEvent").subscribe(this, (args) => {
                                    
            if (args.featureSet.displayName.get().toLowerCase().indexOf("u.s. drought monitor") > -1)
            {
                let objectOfObservables: any = this.getAttributeObservableByName(args.attributes, "name");                
                if (objectOfObservables != null) {
                    args.label.set(this.getDroughtName(objectOfObservables.value.get()));
                }
                                
                setTimeout(function () {
                    $(".FeatureDetailsCompactView .feature-description").text(args.label.get());
                }, 20);

            }            
        });
                       
        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {

            let thisRef = this;

            if (args.id === "FeatureSetResultsView") {

                for (let i: number = 0; i < args.viewModel.resultsPage.length(); i++) {
                    if (args.viewModel.featureSet.value.displayName.get().toLowerCase().indexOf("u.s. drought monitor") > -1) {
                        setTimeout(function () {
                            $(".FeatureSetResultsView .feature-label").text(thisRef.getDroughtName($(".FeatureSetResultsView .feature-label").text()));
                            $(".FeatureSetResultsView .feature-description").text("");
                        }, 20);

                    }
                }
            }
        });
        
        this.app.eventRegistry.event("LayerAddedEvent").subscribe(this, function (args, mapS: MapService) {
            if (mapS.displayName.toLowerCase() == "user kml")
            {
                let isLayers: boolean = this.IsDefined(args, "_fLayers");
                if (isLayers && args._fLayers.length > 0 && this.IsDefined(args._fLayers[0],"_name")) {
                    mapS.displayName = args._fLayers[0]._name;

                    this.secureKMLSymbols(args);
                    this.buildKmlLayerLegend(args, mapS, args._fLayers[0].id);
                }                                
            }
            else if (args.url.toLowerCase() == "https://droughtmonitor.unl.edu/data/kmz/usdm_current.kmz") {
                let isLayers: boolean = this.IsDefined(args, "_fLayers");                
                if (isLayers) {                                        
                    for (let i: number = 0; i < args._fLayers[0].renderer.infos.length; i++) {                        
                        let workingInfo = args._fLayers[0].renderer.infos[i];
                        workingInfo.label = this.getDroughtName(workingInfo.label);
                    }

                    this.secureKMLSymbols(args);
                    this.buildKmlLayerLegend(args, mapS, args._fLayers[0].id);
                }
            }
            else if (args.url.toLowerCase() == "https://waterwatch.usgs.gov/index.php?m=real&w=kml&r=us&regions=or") {
                let isLayers: boolean = this.IsDefined(args, "_fLayers");
                if (isLayers) {
                    for (let i: number = 0; i < args._fLayers[0].renderer.infos.length; i++) {
                        args._fLayers[0]._name = "Stream Levels (KML)";
                        let workingInfo = args._fLayers[0].renderer.infos[i];
                        workingInfo.label = this.getStreamLevelName(workingInfo.label);
                    }

                    this.secureKMLSymbols(args);
                    this.buildKmlLayerLegend(args, mapS, args._fLayers[0].id);
                }
            }
        });
        
        this.ssdp = new SiteServiceDiscoveryProvider();
        this.ssdp.initialize(this.app.site);                

        this.BuildLayerListButtons(); //try buttons now as the view may already be active
        this.ListenForLayerListView();
    }

    secureKMLSymbols(args:any) {

        if (this.IsDefined(args._fLayers[0], "renderer") && this.IsDefined(args._fLayers[0].renderer, "symbol") && args._fLayers[0].renderer.symbol.url.indexOf("http:") > -1) {
            args._fLayers[0].renderer.symbol.url = args._fLayers[0].renderer.symbol.url.replace("http:", "https:");
        }

        if (this.IsDefined(args._fLayers[0], "renderer") && this.IsDefined(args._fLayers[0].renderer, "defaultSymbol") && this.IsDefined(args._fLayers[0].renderer.defaultSymbol, "url") &&  args._fLayers[0].renderer.defaultSymbol.url.indexOf("http:") > -1) {
            args._fLayers[0].renderer.defaultSymbol.url = args._fLayers[0].renderer.defaultSymbol.url.replace("http:", "https:");
        }
    }

    buildKmlLayerLegend(args:any, mapS: MapService, uniqueID:string) {

        let thisRef = this;
        let lastMapService = mapS;
        args["uniqueId"] = uniqueID; //legend items use the map service id + layer id, like #_0 for layer 0
        
        setTimeout(function () {

            LegendItemProviderFactory.getLegendItemWhenAvailable(args, function (legendItem: LegendItem) {
                
                let lList = (<LayerList>thisRef.app.layerList);
                let listItems: LayerListItem[] = lList.getDescendants();
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].id.get() == args.id) {

                        console.log(args);
                        let workingItem: LayerListItem = listItems[i];

                        //layers should match the info index?
                        if (workingItem.children.length() == 1) {

                            if ((<any>workingItem.children.getAt(0))._kmlLayer.uniqueId == uniqueID)
                                thisRef.buildLegendItem((<any>workingItem.children.getAt(0)), legendItem);
                        }
                        else if (workingItem.children.length() > 1) {

                            if (legendItem.children.length() > 1) //grouped legend on parent
                                thisRef.buildLegendItem(workingItem, legendItem);                            

                            for (let j = 0; j < workingItem.children.length(); j++) {                                
                                if ((<any>workingItem.children.getAt(j))._kmlLayer.uniqueId == uniqueID) {                                                                        
                                    //individual swatches on children?
                                    thisRef.buildLegendItem((<any>workingItem.children.getAt(j)), legendItem.children.getAt(j));                                    
                                }
                            }

                        }
                        else {
                            thisRef.buildLegendItem(workingItem, legendItem);
                        }                                                
                    }
                }

            });

        }, 100);
    }

    buildLegendItem(workingItem: LayerListItem, legendItem: LegendItem) {

        console.log(legendItem.swatchElement.get());

        //source mapping.infrastructure.bundle _populateLegendItem = function
        workingItem.expandLegend.set(!1);

        if ("single-item" === legendItem.templateType) {
            workingItem.legendItems.addItem(legendItem);
            workingItem.legendSwatch.set(legendItem.swatchElement.get());
        }
        else {
            workingItem.legendItems.addItems(legendItem.children.get());

            if (workingItem.legendItems.length() > 1) {

                if (workingItem.legendItems.getAt(workingItem.legendItems.length() - 1).label.get().toLowerCase().indexOf("all other values") > -1) {
                    workingItem.legendItems.removeAt(workingItem.legendItems.length() - 1);
                }

                workingItem.legendSwatch.set(workingItem.layerList.multiLegendSwatchElement || workingItem.legendItems.getAt(0).swatchElement.get());
                workingItem.legendHasMultipleItems.set(!0)
            }
            else {
                workingItem.legendSwatch.set(workingItem.legendItems.getAt(0).swatchElement.get());
                workingItem.legendHasMultipleItems.set(!1);
            }
        }

        if (workingItem.legendItems.length() === 1)
            workingItem.legendTooltip.set(workingItem.layerList.singleLegendIconTooltip.format(workingItem.name.get()));
        else
            workingItem.legendTooltip.set(workingItem.layerList.multiLegendIconTooltip)

        workingItem.legendTooltip.set(workingItem.legendTooltip.get().format(workingItem.name.get()));
    }

    getStreamLevelName(sIn:string): string {
                
        switch (sIn) {
            case "icon_1":
                return "Low";                
            case "icon_3":
                return "Much below normal (<10 percentile)";
            case "icon_4":
                return "Below normal (10-24 percentile)";
            case "icon_5":
                return "Normal (25-75 percentile)";
            case "icon_6":
                return "Above normal (76-90 percentile)";
            case "icon_7":
                return "Much above normal (>90 percentile)";
            case "icon_8":
                return "High (<10 percentile)";
            case "icon_0":
                return "Not Ranked";
            default:
            case "default":
                return "";
        }    
    }

    getDroughtName(sIn: string): string {

        switch (sIn) {
            case "PolyStyle00":
            case "0":
                return "DO: Abnomally dry";
            case "PolyStyle01":
            case "1":
                return "D1: Drought - Moderate";
            case "PolyStyle02":
            case "2":
                return "D2: Drought - Severe";
            case "PolyStyle03":
            case "3":
                return "D3: Drought - Extreme";                
            case "PolyStyle04":
            case "4":
                return "D4: Drought - Exceptional";
            default:
                return "Average";
        }
    }

    getAttributeObservableByName(attributesOCollection, nameMatch) {
        for (let i: number = 0; i < attributesOCollection.length(); i++) {
            if (attributesOCollection.getAt(i).name.get().toLowerCase() == nameMatch) {
                return attributesOCollection.getAt(i);
            }
        }

        return null;
    }
    
    isStringAurl(val: string): boolean {

        if (val.indexOf("https://") > -1 || val.indexOf("http://") > -1)
            return true;

        if (val.split("/").length > 2)
            return true;

        return false;
    }
        
    serviceOrLayerRemoved(workingURL: string, isServiceURL: boolean) {

        if (workingURL == null || workingURL == "" || workingURL == undefined)
            return;

        let ptr: number = this.layerListURLS.indexOf(workingURL.toLowerCase());
        this.layerListURLS.splice(ptr, 1);

        let workingServiceURL: string;
        let incomingURL: string;

        incomingURL = workingURL.replaceAll("/", "").toLowerCase();
                
        for (let i: number = 0; i < this.resultsObject.length(); i++) {
            let workingService: any = this.resultsObject.getAt(i);

            workingServiceURL = this.ServiceLayerURLLink(workingService.connectionString).toLowerCase().replaceAll("/", "");
            workingServiceURL = decodeURIComponent(workingServiceURL);

            if (isServiceURL && workingServiceURL == incomingURL) {
                for (var lyr = 0; lyr < workingService.layers.length(); lyr++)
                        workingService.layers.getAt(lyr).inLayerList.set(false);
            }
            else {
                for (var lyr = 0; lyr < workingService.layers.length(); lyr++) {

                    if (workingService.layers.getAt(lyr).fullURL.toLowerCase() == workingURL.toLowerCase())
                        workingService.layers.getAt(lyr).inLayerList.set(false);
                }
            }
        }

        this.currentFilteredCount.set(this.resultsObject.length().toString());
    }

    oeToggleLayerListLegend() {        
        let ele: HTMLElement = $(".LegendView.active").get(0);

        if (!ele || ele == undefined)
            this.app.commandRegistry.command("SwitchToLegendView").execute();
        else
            this.app.commandRegistry.command("ShowLayerList").execute();
    }

    ListenForLayerListView() {
        let thisScope = this;
        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
            
            if (args.id === "LayerListView" && args.hostView) {
                setTimeout(function () { thisScope.BuildLayerListButtons(); }, 100);                
            }
        });
    }

    BuildLayerListButtons() {

        let layerWrapper: any = $('.layer-list-wrapper');

        if ($(".oe_add_layer_wrapper").length === 0 && this.menuItems.length > 0 && layerWrapper!=null) {
            let menuHMTL = "";
            this.menuItems.forEach(menu => {
                let menuItemHTML = "<button onclick =\"geocortex.framework.applications[0].commandRegistry.commands." + menu["command"] + ".execute()\" class=\"toolbar-item tool\" title=\"" + (menu["description"] !== undefined ? menu["description"] : "Add layers to the map") +"\"><img alt=\"" + menu["description"] + "\" src=\"" + menu["iconUri"] + "\" class=\"bound-visible-inline\"><p>" + menu["text"] + "</p></button>";
                menuHMTL += menuItemHTML;
            })
                        
            $('.layer-list-wrapper').prepend("<div class=\"oe_add_layer_wrapper\">" + menuHMTL + "</div>");
            $('.LegendView').prepend("<div class=\"oe_add_layer_wrapper\">" + menuHMTL + "</div>");
            $('.layer-list').css("position", "relative !important");
            $('.layer-list').css("top", "unset !important");
        }
                
    }

    public OpenSearchWindow() {

        this.app.commandRegistry.command("ActivateView").execute("OE_AddLayerToLayerListView");
        this.CheckSSDPState();

        //$('.modal-container').addClass("oeAddLayerModalContainer");
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

            //load remote urls
            this.LoadRemoteSingleURLS(false);

            this.LoadRemoteServiceSources(false);                        
        }
    }

    LoadRemoteSingleURLS(forceLoad: boolean) {

        if (!forceLoad && this.resultsObject.length() > 0) {
            return;
        }

        this.ShowLoader("Loading remote services.  This may take a moment...", true, true, false, false, false);

        this.defaultRemoteUrlsCurrent = 0;

        if (this.defaultRemoteUrls != null && this.defaultRemoteUrls.length > 0) {
            this.ShowDirectServiceURL(this.defaultRemoteUrls[this.defaultRemoteUrlsCurrent], false);
        }
        else {
            this.RemoteServiceLoadedCheck(false);
        }
    }

    LoadRemoteServiceSources(forceLoad:boolean) {
               
        //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
        //"/map/mapservices?f=json"

        this.layerDetailsVisible.set(false);
        this.oeSearchLayerOptionsVisible.set(false);
        this.checkBoxGroupID = 0;

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

        this.gcxServiceMapsCurrent = 0;

        if (this.gcxServiceMaps != null && this.gcxServiceMaps.length > 0) {
            this.RequestGCXSources(this.gcxServiceMaps[this.gcxServiceMapsCurrent]);
        }
        else {
            //no service urls!            
            this.RemoteServiceLoadedCheck(true);
        }        
    }

    RemoteServiceLoadedCheck(isGCX: boolean) {
        
        if (isGCX) {

            this.gcxServiceMapsCurrent++;

            if (this.gcxServiceMaps != null && this.gcxServiceMapsCurrent < this.gcxServiceMaps.length) {
                //load next
                this.RequestGCXSources(this.gcxServiceMaps[this.gcxServiceMapsCurrent]);
            }
        }
        else {

            this.defaultRemoteUrlsCurrent++;

            if (this.defaultRemoteUrls != null && this.defaultRemoteUrlsCurrent < this.defaultRemoteUrls.length) {
                //load next
                this.ShowDirectServiceURL(this.defaultRemoteUrls[this.defaultRemoteUrlsCurrent], false);
            }
        }

        let isDone: number = 0;

        if (this.gcxServiceMaps == null || this.gcxServiceMapsCurrent >= this.gcxServiceMaps.length) {
            isDone++;
        }

        if (this.defaultRemoteUrls == null || this.defaultRemoteUrlsCurrent >= this.defaultRemoteUrls.length) {
            isDone++;
        }

        //finish
        if (isDone>1)
            this.SourcesDone();
        
    }

    SourcesDone(): void {
                
        if (this.resultsArrayForSort.length < 1) {                        
            this.HideLoader();
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
            this.OESearchLayers(true,false,false);
        }
    }

    public ClearSearchInput() {        
        this.searchFieldText.set("");
                       
        //show all results
        this.OESearchLayers(true,false,false);
    }

    public DoSearch() {
        
        var searchText: string = this.searchFieldText.get().toLowerCase();

        if (this.isStringAurl(searchText))
            this.ShowDirectServiceURL(this.searchFieldText.get(),true);
        else
            this.OESearchLayers(false, false,false);
    }

    public ToggleSelected() {        
    }

    public OkClicked() {        
    }
        
    public CancelClicked() {                
        this.HideLoader();
        this.app.commandRegistry.command("DeactivateView").execute("OE_AddLayerToLayerListView");
    }

    public CloseError() {
        this.HideLoader();
    }
        
    public CleanURL(val: string): string {
             
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

    public RequestGCXSources(urlToLoad:string): void {
                
        var thisRef = this;        
        
        this.ShowLoader("Loading sources...", true, true, false, false, false);
        
        //"https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall/map/mapservices?f=json"
        var siteURL = urlToLoad; //urlToLoad is url to the site name https://tools.oregonexplorer.info/Geocortex/Essentials/oe/rest/sites/__root_oreall
        let fullRequestURL = urlToLoad + "/map/mapservices?f=json";

        let flagAsLiveService: boolean = (this.gcxServiceMapsFlagLive.indexOf(urlToLoad) > -1) ? true : false;
                
        var aSettings: any = {
            url: fullRequestURL,
            dataType: "jsonp",
            success: function (data) {

                var workingService: any;
                let tmpCollection: ObservableCollection<object>;
                let parentIdMap: any = {};
                let sortIndentObject: any;
                let fullURL: string;
                                
                for (var i = 0; i < data.mapServices.length; i++) {
                                                            
                    workingService = data.mapServices[i];

                    //do not include kml at this time
                    //if (workingService.serviceType.toLowerCase() == "kml")
                    //    continue;

                    //do not include tile maps
                    if (thisRef.IsDefined(workingService, "tileInfo") && thisRef.IsDefined(workingService.tileInfo, "dpi"))
                        continue;

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

                    workingService["isLive"] = flagAsLiveService;
                                        
                    //layers need custom properties here
                    for (var lyr = 0; lyr < workingService.layers.length; lyr++) {

                        //setup a map for sorting by group name and then layer name
                        if (workingService.layers[lyr]["subLayerIds"].length > 0 &&
                            !thisRef.IsDefined(parentIdMap, workingService.layers[lyr]["id"])) {

                            parentIdMap["k" + workingService.layers[lyr]["id"]] = workingService.layers[lyr];                                                     
                        }                        

                        if (workingService.layers[lyr]["displayName"] != null && workingService.layers[lyr]["displayName"] != "" && workingService.layers[lyr]["displayName"].toLowerCase() == "kml layer")
                            workingService.layers[lyr]["displayName"] = workingService["displayName"] + " (KML)";

                        workingService.layers[lyr]["siteURL"] = siteURL;
                        workingService.layers[lyr]["mapServiceConnectionString"] = workingService.connectionString;
                        workingService.layers[lyr]["mapServiceID"] = workingService.id;
                                                                        
                        workingService.layers[lyr]["layerCheckbox"] = new Observable<boolean>(false);
                        workingService.layers[lyr]["oeLayerVisible"] = new Observable<boolean>(true);

                        if (workingService.serviceType.toLowerCase() == "kml") {
                            fullURL = thisRef.ServiceLayerURLLink(workingService.connectionString);
                            fullURL = decodeURIComponent(fullURL);
                            //workingService.layers[lyr]["customID"] = fullURL;
                        }
                        else {
                            fullURL = thisRef.ServiceLayerURLLink(workingService.connectionString) + "/" + workingService.layers[lyr]["id"];
                        }
                        
                        workingService.layers[lyr]["fullURL"] = fullURL;

                        if (thisRef.layerListURLS.indexOf(fullURL.toLowerCase()) > -1)
                            workingService.layers[lyr]["inLayerList"] = new Observable<boolean>(true);
                        else
                            workingService.layers[lyr]["inLayerList"] = new Observable<boolean>(false);

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
                
                thisRef.RemoteServiceLoadedCheck(true);
            }
        };

        $.ajax(aSettings)
            .fail(function (xhr, ajaxOptions, thrownError) {
                console.log("Sources request failed.");                
                thisRef.RemoteServiceLoadedCheck(true);
            });
    }

    public ServiceLayerURLLink(val: string): string {

        let vals: string[] = val.split(";");
        if (vals.length>0)
            val = vals[0];

        val = val.replace("url=", "");

        return val; //val.toLowerCase();
    }

    public IndentLevel(parentIdMap:any, workingLayer: any): any {

        let indentOut: number = 0;
        let workingParentID: string = workingLayer.parentLayerId;
        let workingKey: string;
        let outProp: any = { "sort": workingLayer.displayName, "indent": "" };
        let indentPx: number = (this.isSmallShell) ? 48 : 24;
                        
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


            outProp.indent = (indentOut * indentPx).toString();
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

        this.OESearchLayers(true, false, false);
    }

    public ShowDirectServiceURL(urlToAdd: string, canRemove: boolean) {

        this.oeSearchLayerOptionsVisible.set(false);

        var thisRef = this;

        //load map service
        let workingURL: string = urlToAdd; //this.searchFieldText.get();

        //force https if scheme is missing
        if (workingURL.indexOf("https://") < 0 && workingURL.indexOf("http://") < 0)
            workingURL = "https://" + workingURL;
        else if (workingURL.indexOf("https://") < 0 && workingURL.indexOf("http://") > -1)
            workingURL = workingURL.replace("http://", "https://");

        this.searchFieldText.set("");
        let urlArray: string[] = workingURL.split("/");

        let workingServiceURL: string;
        let workingLayerID: string = null;

        if (workingURL.toLowerCase().indexOf("mapserver") < 0 &&
            (workingURL.toLowerCase().indexOf(".kmz") > -1 ||
            workingURL.toLowerCase().indexOf("/kmz") > -1 ||
            workingURL.toLowerCase().indexOf(".kml") > -1 ||
            workingURL.toLowerCase().indexOf("=kml") > -1)) {

            this.AddKmlDirect(workingURL);
            return;
        }

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
                let fullURL: string;
                let tempURL: string;

                workingService = {};

                //do not include kml at this time
                //if (workingService.serviceType.toLowerCase() == "kml")
                //    continue;

                if (!thisRef.IsDefined(data, "documentInfo"))
                    workingService["displayName"] = workingServiceURL;
                else if (data.documentInfo.Title != "")
                    workingService["displayName"] = data.documentInfo.Title;
                else if (data.documentInfo.Subject != "")
                    workingService["displayName"] = data.documentInfo.Subject;
                else {
                    let urlSplit: string[] = workingServiceURL.split("/");
                    let urlDisplayName = workingServiceURL;
                    if (urlSplit.length > 2)
                        urlDisplayName = urlSplit[0] + "//" + urlSplit[2] + "/";

                    let servicesIndex = workingServiceURL.indexOf("/services/");
                    if (servicesIndex > -1) {
                        let startIndex = servicesIndex + 10;
                        urlDisplayName += ".../" + workingServiceURL.substr(startIndex, workingServiceURL.length - startIndex)
                    }  

                    urlDisplayName = urlDisplayName.replace("/MapServer", "");
                    urlDisplayName = urlDisplayName.replace("/mapserver", "");

                    workingService["displayName"] = urlDisplayName;
                }
                    

                workingService["tipURL"] = workingServiceURL;
                workingService["connectionString"] = workingServiceURL;

                workingService["oeServiceVisible"] = new Observable<boolean>(true);
                workingService["oeTreeVisible"] = new Observable<boolean>(true);
                workingService["oeTreeExpand"] = new Observable<boolean>(false);
                workingService["oeTreeCollapse"] = new Observable<boolean>(true);

                workingService["oeResultCountString"] = new Observable<string>("0");
                workingService["oeResultCount"] = 0;
                workingService["removeCustomServiceVisible"] = new Observable<boolean>(canRemove);
                workingService["oeCanRemove"] = canRemove;
                                
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

                    tempURL = thisRef.ServiceLayerURLLink(workingService.connectionString);
                    fullURL = tempURL;
                    if (tempURL.lastIndexOf("/") < tempURL.length-1)
                        fullURL += "/";

                    fullURL += workingService.layers[i]["id"];
                    
                    workingService.layers[i]["fullURL"] = fullURL;

                    if (thisRef.layerListURLS.indexOf(fullURL.toLowerCase()) > -1)
                        workingService.layers[i]["inLayerList"] = new Observable<boolean>(true);
                    else
                        workingService.layers[i]["inLayerList"] = new Observable<boolean>(false);
                    
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
                                                
                //insert service to list
                (<ObservableCollection<object>>thisRef.resultsObject).insertItem(0, workingService);

                //added from input box
                if (canRemove) {
                    thisRef.HideLoader();
                    thisRef.OESearchLayers(true, false, false);
                }
                else { //added from default list
                    thisRef.RemoteServiceLoadedCheck(false);
                }
            }
        };

        $.ajax(aSettings)
            .fail(function (xhr, ajaxOptions, thrownError) {                
                console.log("Sources request failed.");
                thisRef.RemoteServiceLoadedCheck(false);
                //thisRef.HideLoader();                
            });
            
    }

    AddKmlDirect(workingURL: string) {       

        let gcxLayer: any = {};
        gcxLayer.displayName = "User KML";
        gcxLayer.description = "User KML";
        gcxLayer.type = "kmllayer";
        gcxLayer.mapServiceConnectionString = "url=" + workingURL;

        //add kml service
        this.OEAddMapServiceFromGecortexLayer(gcxLayer);

        this.app.commandRegistry.command("ActivateView").execute("LayerListView");
        this.CancelClicked();
    }

    CheckParentGroupLayer(childLayer: any, val: boolean) {

        for (var i = 0; i < this.resultsObject.length(); i++) {

            if (!this.IsDefined((<any>this.resultsObject.getAt(i)), "layers"))
                continue;
                        
            for (var lptr = 0; lptr < (<any>this.resultsObject.getAt(i)).layers.length(); lptr++) {

                if ((<any>this.resultsObject.getAt(i)).layers.getAt(lptr).type != "GroupLayer")
                    continue;
                
                if (childLayer.mapServiceID == (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).mapServiceID &&
                    childLayer.parentLayerId == (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).id)
                    (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).layerCheckbox.set(val);
            }
        }
    }
    
    CheckAllChildLayers(gcxLayer: any, val: boolean) {

        for (var i = 0; i < this.resultsObject.length(); i++) {

            if (!this.IsDefined((<any>this.resultsObject.getAt(i)), "layers"))
                continue;

            for (var lptr = 0; lptr < (<any>this.resultsObject.getAt(i)).layers.length(); lptr++) {
                
                if (gcxLayer.mapServiceID == (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).mapServiceID &&
                    gcxLayer.id == (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).parentLayerId)
                    (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).layerCheckbox.set(val);
            }
        }
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

    public ToggleLiveLayers() {
        this.OESearchLayers(false, false, true);
    }

    public OESearchLayers(showAllFilter: boolean, onlySelected: boolean, showOnlyLive: boolean): void {

        this.oeSearchLayerOptionsVisible.set(false);

        if (!onlySelected) {
            this.toggleSelectedValue.set(false);
            this.toggleSelectedText.set("Show Selected");
        }        

        if (!showOnlyLive) {
            this.toggleLiveValue.set(false);
            this.toggleLiveText.set("Show Live");
        }

        if (this.resultsObject.length() < 1) {
            //this.ShowLoader("Error: No layers to search.", true, false, false, true, true);
            this.currentFilteredCount.set("0");
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

            //show layers for a isLive flag service hit            
            if (showOnlyLive) {
                if (this.IsDefined((<any>this.resultsObject.getAt(i)), "isLive") && (<any>this.resultsObject.getAt(i)).isLive)
                    showLayersForServiceHit = true;
            }
            //service hit should show layers for this service
            else if ((<any>this.resultsObject.getAt(i)).displayName.toLowerCase().indexOf(searchText) > -1) {
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
                else if (showOnlyLive) {

                    if (showLayersForServiceHit) {

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
                    }
                    else {
                        //hide layer
                        (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(false);
                    }

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
                        }
                        else {
                            (<any>this.resultsObject.getAt(i)).layers.getAt(lptr).oeLayerVisible.set(false);
                        }
                    }
                    
                }                                
            }
            //end layers

            if (showAllFilter || onlySelected || showOnlyLive)
                (<any>this.resultsObject.getAt(i)).oeResultCountString.set("");
            else
                (<any>this.resultsObject.getAt(i)).oeResultCountString.set("(" + (<any>this.resultsObject.getAt(i)).oeResultCount.toString() + ")");
        }
        //end services

        this.noResultsVisible.set(false);
        this.textSelectedLayersVisible.set(false);        
        this.HideLoader();

        let filteredCountString = foundCount.toString();
        if (showOnlyLive)
            filteredCountString += " (Live)";

        this.currentFilteredCount.set(filteredCountString);

        if (onlySelected && foundItem) {            

        }
        else if (onlySelected && !foundItem) {
            this.textSelectedLayersVisible.set(true);
            
        }
        else if (foundItem) {            
            
        }
        else {                        
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
    
    CheckToken(gcxLayer: any) {

        if (gcxLayer.mapServiceConnectionString.indexOf(";token=") > -1) {
            this.LoadGCXSiteForSecureRequest(gcxLayer);

        }
        else {
            this.OEAddMapServiceFromGecortexLayer(gcxLayer);
        }            
    }

    OEAddMapServiceFromGecortexLayer(gcxLayer: any) {
               
        let thisRef: any = this;        
        //let url: string = this.CleanURL(gcxLayer.mapServiceConnectionString);//"https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/restoration/OITT/MapServer";
        let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');        
        url = this.CleanURL(url);
        url = decodeURIComponent(url);
                                        
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
        rItem.name = gcxLayer.displayName;
        rItem.displayName = gcxLayer.displayName;
        rItem.description = gcxLayer.description;

        if (this.IsDefined(gcxLayer,"type") && gcxLayer.type.toLowerCase() == "kmllayer") {
            rItem.serviceType = ["None", "KmlService", "KmlLayer", "Kml"];
            rItem.discoveryProviderName = "KmlDiscoveryProvider";
            rItem.serviceProviderName = "Geocortex.Gis.Services.Kml";            
                        
        }
        else {
            rItem.discoveryProviderName = "ArcGisServerDiscoveryProvider";            
            rItem.serviceProviderName = "Geocortex.Gis.Services.ArcGisServer.Rest";
            rItem.serviceType = ["None", "FeatureLayer", "ServiceLayer", "MapService"];

            let tokenVal = this.GetURLPart(gcxLayer.mapServiceConnectionString, "token");
            rItem["serviceToken"] = tokenVal;
            url = url + "/" + gcxLayer.id;

            if (tokenVal != "")
                url = RestHelperHTTPService.appendTokenToUrl(url, tokenVal);
        }        
        
        rItem.url = url;
                        
        console.log("Realize Map Service: " + rItem.displayName);
        console.log("Realize Map Service: " + rItem.url);
        
        this.AddServiceItem(rItem, gcxLayer);                
    }
        
    AddServiceItem(serviceItem: any, gcxLayer: any) {

        let thisRef = this;

        thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Requesting service: ' + serviceItem.displayName, null, null, serviceItem.url, 10000, true));

        Promise.resolve(this.ssdp.realizeMapService(serviceItem, this.app.map.spatialReference.wkid.toString()))
            .then(
                function (e) {

                    //force display name from popup list on to the map service display name.
                    e.displayName = gcxLayer.displayName;
                    e.identifiable = false;
                                        
                    thisRef.app.commandRegistry.command("RemoveStatus").execute(e.serviceLayer.url);
                    thisRef.app.command("AddMapService").execute(e);

                    //layer added to layer list
                    if (thisRef.layerListURLS.indexOf(e.serviceLayer.url) < 0) {

                        if (thisRef.IsDefined(gcxLayer,"inLayerList"))
                            gcxLayer.inLayerList.set(true);

                        thisRef.layerListURLS.push(e.serviceLayer.url.toLowerCase());
                    }
                    
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


    Create_UUID(): string {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    LoadGCXSiteForSecureRequest(gcxLayer:any) {

        var thisRef = this;
                
        let workingUUID = this.Create_UUID();
        thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Requesting service: ' + gcxLayer.displayName, null, null, workingUUID, 10000, true));
        
        let tmpMap = new esri.Map("oeLayerSearchJunkMap");
        let essentialsSite = new Site(gcxLayer.siteURL, tmpMap);

        essentialsSite.onInitialized = function (args) {
            thisRef.remoteGCXSites[gcxLayer.siteURL] = args;
            
            let url: string = ServiceHelper.extractConnectionStringValue(gcxLayer.mapServiceConnectionString, 'url');
            url = thisRef.CleanURL(url);
                                            
            args.essentialsMap.mapServices.forEach(s1 => {
                if (s1.serviceUrl == url) {

                    if (s1.layers != null) {
                        s1.layers.forEach(l1 => {
                            if (gcxLayer.id == l1.id) {

                                //add layer directly without reslove?
                                thisRef.app.command("AddMapService").execute(s1);
                                thisRef.app.commandRegistry.command("RemoveStatus").execute(workingUUID);      

                                //layer added to layer list
                                if (thisRef.layerListURLS.indexOf(s1.serviceUrl) < 0) {
                                    gcxLayer.inLayerList.set(true);
                                    thisRef.layerListURLS.push(s1.serviceUrl.toLowerCase());
                                }                                    

                                //unload hidden site
                                essentialsSite.onInitializationFailed = null;
                                essentialsSite = null;
                                delete thisRef.remoteGCXSites[this.remoteServiceURLs[this.remoteServiceURLcurrent]];
                                tmpMap.destroy();

                                return;
                            }
                        });
                    }

                }
            });
        };

        essentialsSite.onInitializationFailed = function (args) {
            console.log("Site failed");
            console.log(args);
            thisRef.app.commandRegistry.command("RemoveStatus").execute(workingUUID);
            thisRef.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs('Service unavailable (STF): ' + gcxLayer.displayName, { uri: "Resources/Images/Custom/warning.png", altText: "", class: "" }, null, null, 0, false));
        };

        this.remoteGCXSites[this.gcxServiceMaps[this.gcxServiceMapsCurrent]] = essentialsSite;
        this.remoteGCXSites[this.gcxServiceMaps[this.gcxServiceMapsCurrent]].initialize();
    }        
}