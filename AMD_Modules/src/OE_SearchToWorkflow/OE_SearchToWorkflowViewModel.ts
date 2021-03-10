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

    targetInputBoxID: string;

    workflowSearchText: Observable<string> = new Observable<string>("Address Search");
    defaultSearchOption: string; //site, workflow

    searchType: Observable<string> = new Observable<string>("default");
    searchOptionsVisible: Observable<boolean> = new Observable<boolean>(false);

    searchOptionsButtonVisible: Observable<boolean> = new Observable<boolean>(true);
    clearSearchVisible: Observable<boolean> = new Observable<boolean>(false);

    searchBoxFocusOutTimeout: any;

    oeSearchToWorkflowDefault: Observable<string> = new Observable<string>("oeSearchToWorkflowSelected");
    oeSearchToWorkflowWorkflow: Observable<string> = new Observable<string>("");

    suggestionSearchDelayMS: number;
    minLengthToSearch: number;

    suggestTimeout: any;
    suggestionsVisible: Observable<boolean> = new Observable<boolean>(false);
    suggestions: ObservableCollection<object> = new ObservableCollection<object>();
    suggestionSelectedIndex: number = -1;
    suggestionSelectedText: string = null;
                
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
        
    initialize(config: any): void {
                
        var site = (<any>this).app.site;

        this.targetInputBoxID = config.targetInputBoxID || "#gcx_search";

        this.searchWorkflowID = config.searchWorkflowID;
        this.searchArgumentName = config.searchArgumentName;
        this.defaultSearchOption = config.defaultSearchOption || "site";

        this.suggestionSearchDelayMS = config.suggestionSearchDelayMS || 250;
        this.minLengthToSearch = config.minLengthToSearch || 3;
        
        
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

            //disable search input auto complete
            $(this.targetInputBoxID).attr("autocomplete", "off");

            thisScope.app.commandRegistry.command("ActivateView").execute("OE_SearchToWorkflowView");

            thisScope.toggleSearchClearButton(true);
                        
            //set default selected option
            if (thisScope.defaultSearchOption == "workflow")
                thisScope.searchToWorkflow();
            else
                thisScope.searchToDefault();
                        
            //listen for input
            $(this.targetInputBoxID).keyup(function (event: any) {
                thisScope.searchKeyUp(event);
            });

            $(this.targetInputBoxID).focusin(function (event: any) {

                if (thisScope.searchBoxFocusOutTimeout)
                    clearTimeout(thisScope.searchBoxFocusOutTimeout)

                thisScope.toggleSearchClearButton(false);
                thisScope.searchOptionsVisible.set(false);
            });

            $(this.targetInputBoxID).focusout(function (event: any) {
                thisScope.searchBoxFocusOutTimeout = window.setTimeout( () => {
                    thisScope.searchBoxFocusOutEvent();
                }, 250);
            });
                        
        }, 1000);
        
    }

    searchBoxFocusOutEvent() {
        this.toggleSearchClearButton(true);
    }

    clearSearchBox() {

        if (this.searchBoxFocusOutTimeout)
            clearTimeout(this.searchBoxFocusOutTimeout)

        this.searchBoxFocusOutEvent()

        $(this.targetInputBoxID).val("");
        this.suggestionsVisible.set(false);
    }

    toggleSearchClearButton(showOptions: boolean) {
        this.searchOptionsButtonVisible.set(showOptions);
        this.clearSearchVisible.set(!showOptions);
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
            //mobile version
            this.app.commandRegistry.command("DeactivateView").execute("ResultsViewContainerView");
            
            this.toggleSearchClearButton(true);
            this.suggestionsVisible.set(false);
            
            //keyboard selection submission event
            if (this.eventCount == 1 && this.suggestionSelectedText != null) {
                                
                $(this.targetInputBoxID).val(this.suggestionSelectedText);                
                this.suggestionSelectedText = null;
                $(".search-button").click();
                return;
            }

            if (this.eventCount >= 4) {
                this.eventCount = 0;
                                                
                var workflowArgs: any = {};
                workflowArgs.workflowId = this.searchWorkflowID;                                
                workflowArgs[this.searchArgumentName] = $(this.targetInputBoxID).val();                

                if (this.suggestionSelectedIndex > -1 && this.suggestions && this.suggestionSelectedIndex < this.suggestions.length()) {
                    let suggestObject: any = this.suggestions.getAt(this.suggestionSelectedIndex);
                    if (suggestObject)
                        workflowArgs["magicKey"] = suggestObject.magicKey;
                }
                

                this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);                
            }
        }

        if (this.eventCount >= 4) {
            this.eventCount = 0;
        }   
    }    


    searchKeyUp(event: KeyboardEvent) {
        //console.log(event.keyCode);

        if ($(this.targetInputBoxID).val().toString().length > 0) {
            try
            {
                this.app.commandRegistry.command("oeEndTour").execute();
            }
            catch (e) { }
        }

        if (event.key.toLowerCase() == "enter") {
                        
            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout)

            this.suggestionsVisible.set(false);

            return;
        }

        if (this.searchType.get() == "default") {
            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout)

            this.suggestionsVisible.set(false);

            return;
        }

        if (this.suggestionsVisible.get() && (event.key.charCodeAt(0) == 38 || event.key.charCodeAt(0) <= 40)) {
            this.suggestionArrowMovement(event.keyCode);
        }

        if ($(this.targetInputBoxID).val().toString().length < this.minLengthToSearch) {

            if (this.suggestTimeout)
                clearTimeout(this.suggestTimeout)

            this.suggestionsVisible.set(false);

            return;
        }
                
        //event.keyCode == 8 || event.keyCode == 46 ||
        if (event.key.charCodeAt(0) == 8 || (event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 90) || (event.key.charCodeAt(0) >= 96 && event.key.charCodeAt(0) <= 111)) {
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

        this.suggestionSelectedIndex = -1;
        this.suggestionSelectedText = null;

        let searchString = encodeURI($(this.targetInputBoxID).val().toString());
        let requestURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=" + searchString + "&category=Address,Postal&searchExtent=-124.83,41.85,-116.37,46.36&location=&f=json";

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

        //this.findAddressCanidates();

        let searchText: string = val.text;

        $(this.targetInputBoxID).val(searchText);
        //$("#gcx_search").submit();

        //primary search box use the search button
        if (this.targetInputBoxID == "#gcx_search")
            $(".search-button").click();
    }

    suggestMouseOver(overElement: Element) {

        this.suggestionSelectedIndex = -1;
        this.suggestionSelectedText = null;

        let pElement: Element = document.getElementsByClassName("oeSearchToWorkflowSuggest-module-view")[0];
                
        for (let i = 0; i < pElement.children.length; i++) {

            if (overElement == pElement.children[i]) {
                this.suggestionSelectedIndex = i;
            }

            $(pElement.children[i]).removeClass("oeSearchSuggestSelected");
        }

        $(overElement).addClass("oeSearchSuggestSelected");
    }

    suggestionArrowMovement(keyCode: number) {
                
        let pElement: Element = document.getElementsByClassName("oeSearchToWorkflowSuggest-module-view")[0];

        if (!pElement)
            return;

        let moveDir: number = (keyCode == 38) ? -1 : 1;
        this.suggestionSelectedIndex += moveDir;

        if (this.suggestionSelectedIndex < 0 && pElement.children.length > 0)
            this.suggestionSelectedIndex = pElement.children.length - 1;

        if (this.suggestionSelectedIndex >= pElement.children.length)
            this.suggestionSelectedIndex = 0;
                                       
        for (let i = 0; i < pElement.children.length; i++) {
            console.log(pElement.children[i]);
            if (i == this.suggestionSelectedIndex) {
                $(pElement.children[i]).addClass("oeSearchSuggestSelected");
                this.suggestionSelectedText = $(pElement.children[i]).text();
            }
            else
                $(pElement.children[i]).removeClass("oeSearchSuggestSelected");
        }
    }

    findAddressCanidates() {

        if (this.suggestionSelectedIndex < 0 || this.suggestionSelectedIndex >= this.suggestions.length())
            return;                

        let suggestObject:any = this.suggestions.getAt(this.suggestionSelectedIndex);

        let searchString = encodeURI($(this.targetInputBoxID).val().toString());
        let requestURL = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=" + searchString + "&magicKey=" + suggestObject.magicKey + "&outFields=Match_addr,Place_addr,Type&f=json";

        console.log(requestURL);

        this.suggestionSelectedIndex = -1;
        this.suggestionSelectedText = null;

        let thisScope = this;

        var jqxhr = $.getJSON(requestURL, function (data) {
            console.log("success");
            thisScope.suggestionResults(data);
        })
        .fail(function () {
            console.log("suggest request error");
        })
    }
}