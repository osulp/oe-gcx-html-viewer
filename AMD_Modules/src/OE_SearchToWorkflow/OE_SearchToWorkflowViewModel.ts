/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { SearchProgressEventArgs } from "geocortex/infrastructure/eventArgs/SearchProgressEventArgs";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { OE_SearchToWorkflowSuggestViewModel } from "./OE_SearchToWorkflowSuggestViewModel";

export class OE_SearchToWorkflowViewModel extends ViewModelBase {

    app: ViewerApplication;

    eventCount: number = 0;
    searchWorkflowID: string;
    searchArgumentName: string;

    workflowSearchText: Observable<string> = new Observable<string>("Address Search");
    defaultSearchOption: string; //site, workflow

    searchType: Observable<string> = new Observable<string>("default");
    searchOptionsVisible: Observable<boolean> = new Observable<boolean>(false);

    oeSearchToWorkflowDefault: Observable<string> = new Observable<string>("oeSearchToWorkflowSelected");
    oeSearchToWorkflowWorkflow: Observable<string> = new Observable<string>("");

    suggestionSearchDelayMS: number;
    minLengthToSearch: number;

    suggestTimeout: any;
    suggestionsVisible: Observable<boolean> = new Observable<boolean>(false);
    suggestions: ObservableCollection<object> = new ObservableCollection<object>();
        
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
        
    initialize(config: any): void {

        var site = (<any>this).app.site;

        this.searchWorkflowID = config.searchWorkflowID;
        this.searchArgumentName = config.searchArgumentName;
        this.defaultSearchOption = config.defaultSearchOption || "site";
        
        let tmpText = config.workflowSearchText || "Address Search";
        this.workflowSearchText.set(tmpText);
                
        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args);
            });
        }
    }
   
    _onSiteInitialized(site) {
        this.app.eventRegistry.event("SearchProgressEvent").subscribe(this, (args) => {
            this.searchProgressEvent(args);
        });
        
        //add search view combo box, SearchView
        let thisScope = this;
        window.setTimeout(() => {
            thisScope.app.commandRegistry.command("ActivateView").execute("OE_SearchToWorkflowView");

            //set default selected option
            if (thisScope.defaultSearchOption == "workflow")
                thisScope.searchToWorkflow();
            else
                thisScope.searchToDefault();

            //listen for input
            $("#gcx_search").keyup(function (event) {
                thisScope.searchKeyUp(event);
            });

            //disable search input auto complete
            $("#gcx_search").attr("autocomplete", "off");

        }, 1000);
        
    }

    searchToDefault() {
        this.searchType.set("default");
        this.toggleSearchOptions(false);

        this.oeSearchToWorkflowDefault.set("oeSearchToWorkflowSelected");
        this.oeSearchToWorkflowWorkflow.set("");
    }

    searchToWorkflow() {
        this.searchType.set("workflow");
        this.toggleSearchOptions(false);

        this.oeSearchToWorkflowDefault.set("");
        this.oeSearchToWorkflowWorkflow.set("oeSearchToWorkflowSelected");
    }

    toggleSearchOptions(val: boolean) {
        this.searchOptionsVisible.set(val);
        this.suggestionsVisible.set(false);
    }

    searchProgressEvent(args: SearchProgressEventArgs) {
        //first event is searching, second is idle, third is idle
        this.eventCount++;
        
        if (this.searchType && this.searchType.get() == "workflow") {

            //prevent default search results
            this.app.commandRegistry.command("DeactivateView").execute("DataFrameResultsContainerView");

            if (this.eventCount >= 4) {
                this.eventCount = 0;

                var workflowArgs: any = {};
                workflowArgs.workflowId = this.searchWorkflowID;
                workflowArgs[this.searchArgumentName] = args.query;

                this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);                
            }
        }

        if (this.eventCount >= 4) {
            this.eventCount = 0;
        }   
    }    


    searchKeyUp(event) {
        console.log(event.keyCode);

        if (event.keyCode == 13) {

            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout)

            this.suggestionsVisible.set(false);

            return;
        }

        if ($("#gcx_search").val().toString().length < this.minLengthToSearch) {

            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout)

            this.suggestionsVisible.set(false);

            return;
        }

        if (event.keyCode == 8 || event.keyCode == 46 || (event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 111)) {
            this.searchSuggestStartTimeout();
        }
    }

    searchSuggestStartTimeout() {

        if (this.suggestTimeout)
            clearTimeout(this.suggestTimeout)


        let thisScope = this;
        this.suggestTimeout = window.setTimeout(() => {
            thisScope.searchSuggestRequest();
        }, this.suggestionSearchDelayMS);
    }

    searchSuggestRequest() {

        let searchString = encodeURI($("#gcx_search").val().toString());
        let requestURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=" + searchString + "&category=&searchExtent=-124.83,41.85,-116.37,46.36&location=&f=json";

        let thisScope = this;

        var jqxhr = $.getJSON(requestURL, function (data) {
            console.log("success");
            thisScope.suggestionResults(data);
        })
            .fail(function () {
                console.log("suggest request error");
            })

    }

    suggestionResultError() {
        this.suggestionsVisible.set(true);
    }

    suggestionResults(data: any) {

        console.log(data);

        this.suggestions.clear();

        if (data.suggestions && data.suggestions.length > 0) {
            this.suggestions.addItems(data.suggestions);
            this.suggestionsVisible.set(true);     
        }
        else {
            //this.suggestions.addItems();
            this.suggestionsVisible.set(false);
        }

    }
        
    suggestionClicked(val: any) {
        this.suggestionsVisible.set(false);

        let searchText: string = val.text;

        $("#gcx_search").val(searchText);
        //$("#gcx_search").submit();
        $(".search-button").click();
    }
}