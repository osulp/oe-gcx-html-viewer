/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { MapService } from "geocortex/essentials/MapService";
import { MapServiceType } from "geocortex/essentials/MapServiceConstants";
import { MapServiceFunction } from "geocortex/essentials/MapServiceConstants";

export class OE_AddLayerToLayerListViewModel extends ViewModelBase {

    app: ViewerApplication;    
    site: any;
    thisViewModel: OE_AddLayerToLayerListViewModel

    loaderVisible: Observable<boolean> = new Observable<boolean>(false);
    loaderMessage: Observable<string> = new Observable<string>("Loading content...");
    loaderSpinner: Observable<boolean> = new Observable<boolean>(false);
    loaderWarnIcon: Observable<boolean> = new Observable<boolean>(false);
    inputBlockOnError: Observable<boolean> = new Observable<boolean>(false);

    searchFieldText: Observable<string> = new Observable<string>("");    

    resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);
    layers: object[] = [];
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.site = (<any>this).app.site;

        this.thisViewModel = this;
                
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
    }

    public OpenSearchWindow() {

        this.app.commandRegistry.command("ActivateView").execute("OE_AddLayerToLayerListView");

    }

    public ClearSearchInput() {
        console.log("Clear search");
        this.searchFieldText.set("");
    }

    public DoSearch() {
                
        console.log("Do search: " + this.searchFieldText.get());
        this.OESearchPortalLayers();
    }

    public ToggleSelected() {
        console.log("Toggle selected");
    }

    public OkClicked() {
        console.log("Ok clicked");
    }

    public CancelClicked() {

        this.app.commandRegistry.command("DeactivateView").execute("OE_AddLayerToLayerListView");

    }

    public OESearchPortalLayers(): void {

        //?q=wildfire+%2B+%22map+service%22&bbox=&sortField=&sortOrder=

        this.resultsObject.clear();

        var thisRef = this;
        var recordsToProcess = 0;
        var workingTitle = "";
        var workingURL = "";

        var usedURLs = [];

        thisRef.layers = [];
                                
        $.get("https://lib-gis1.library.oregonstate.edu/arcgis/sharing/rest/search", { "q": this.searchFieldText.get(), "start":1,"num":100, "f": "json" }, null, "json")
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
                                            thisRef.layers.push(serviceUrlResult.layers[layerIndex]);
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
            });
    }

    public IsSearchDone(recordsToProcess:any) {

        console.log("Records to process: " + recordsToProcess);

        if (recordsToProcess > 0)
            return;

        this.layers.sort((a: any, b: any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        console.log("Results: " + this.layers.length);
        console.log("Results: " + this.layers);

        this.resultsObject.addItems(this.layers);   
        console.log("Results Object Count: " + this.resultsObject.length());
        //console.log("Results Object: " + this.resultsObject);
    }

    OEAddMapService(serviceUL:string, layerName:string) {
        let url: string = serviceUL; //"https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/restoration/OITT/MapServer";
        let workingService: MapService = new MapService(url);


        let layerOptions = { "id": "oeDynamicLayerTest123", "opacity": 1, "showAttribution": false };
        let dLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, layerOptions);
        dLayer.setVisibleLayers([layerName]);
        //dLayer.setVisibleLayers([7]);

        workingService.serviceLayer = dLayer;
        workingService.mapServiceType = MapServiceType.DYNAMIC;
        workingService.isUserCreated = true;
        workingService.userLayerType = "LayerAddition";
        workingService.includeInLayerList = true;
        //workingService.essentialsMap = this.app.site.essentialsMap;                
        workingService.displayName = "Custom Layer";
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
    
}