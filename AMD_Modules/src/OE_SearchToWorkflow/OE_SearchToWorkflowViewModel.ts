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
    isWorkflow: boolean;

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
    searchEventCountTrigger: number; //the search event progress moves through various stages, this determines when to do our custom stuff    
    launchWorkflowLocked: boolean;
    launchWorkflowLockedTimeout: number; //timeout for each workflow launch request

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
        this.isWorkflow = (this.searchWorkflowID && this.searchWorkflowID != undefined && this.searchWorkflowID != null && this.searchWorkflowID != "") ? true : false;

        this.searchArgumentName = config.searchArgumentName;
        this.defaultSearchOption = config.defaultSearchOption || "site";

        this.suggestionSearchDelayMS = config.suggestionSearchDelayMS || 250;
        this.minLengthToSearch = config.minLengthToSearch || 3;
        this.searchEventCountTrigger = config.searchEventCountTrigger || 3; //3; 
        this.launchWorkflowLockedTimeout = config.launchWorkflowLockedTimeout || 1000;  //default ms
        this.launchWorkflowLocked = false;
                               
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

        //only register event if workflow is used
        if (this.isWorkflow) {

            this.app.eventRegistry.event("SearchProgressEvent").subscribe(this, (args) => {
                this.searchProgressEvent(args);
            });

        }
                                                
        //add search view combo box, SearchView
        let thisScope = this;
        window.setTimeout(() => {

            //determine how many event cycles need to be supressed 
            //1st event is a "Searching" notifcation.  The following events are based on the number of geocoder services on the site.
            if (thisScope.app.site.geocodingEndpoints !== undefined && thisScope.app.site.geocodingEndpoints !== null) {
                this.searchEventCountTrigger = thisScope.app.site.geocodingEndpoints.length + 1;
            }

            //disable search input auto complete
            $(this.targetInputBoxID).attr("autocomplete", "off");

            thisScope.app.commandRegistry.command("ActivateView").execute("OE_SearchToWorkflowView");

            thisScope.toggleSearchClearButton(true);
            //thisScope.searchOptionsButtonVisible.set(thisScope.isWorkflow);
                        
            //set default selected option
            if (thisScope.defaultSearchOption == "workflow")
                thisScope.searchToWorkflow();
            else
                thisScope.searchToDefault();
                        
            //listen for input            
            $(this.targetInputBoxID).on("keyup",function (event: any) {
                thisScope.searchKeyUp(event);                
            });

            $(this.targetInputBoxID).on("focusin",function (event: any) {

                if (thisScope.searchBoxFocusOutTimeout)
                    clearTimeout(thisScope.searchBoxFocusOutTimeout)

                thisScope.toggleSearchClearButton(false);
                thisScope.searchOptionsVisible.set(false);
            });

            $(this.targetInputBoxID).on("focusout",function (event: any) {
                thisScope.searchBoxFocusOutTimeout = window.setTimeout( () => {
                    thisScope.searchBoxFocusOutEvent();
                }, 250);
            });

            thisScope.suggestionBoxAdjustRight();
                        
        }, 1000);
        
    }

    suggestionBoxAdjustRight() {
        //adjust suggestion popup right alight based on distance from right edge.
        let suggestRightValue = $("body").width() - ($(".SearchView").position().left + $(".SearchView").width());
        //console.log(suggestRightValue);
        if (suggestRightValue < 30 || suggestRightValue > 300)
            suggestRightValue = 30;

        $(".oeSearchToWorkflowSuggest-module-view").css("right", suggestRightValue);
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

        this.toggleSearchClearButton(true);
    }

    toggleSearchClearButton(showOptions: boolean) {

        //the search options is only needed if there is a workflow
        if (this.isWorkflow) {
            this.searchOptionsButtonVisible.set(showOptions);
            this.clearSearchVisible.set(!showOptions);
        }
        else {

            this.searchOptionsButtonVisible.set(false);

            if ($(this.targetInputBoxID).val() == "") {
                this.clearSearchVisible.set(false);
            }
            else {
                this.clearSearchVisible.set(true);
            }                        
        }        
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

        if (!this.isWorkflow) {

            this.toggleSearchClearButton(true);
            this.suggestionsVisible.set(false);

            //keyboard selection submission event
            if (this.eventCount == 1 && this.suggestionSelectedText != null) {

                $(this.targetInputBoxID).val(this.suggestionSelectedText);
                this.suggestionSelectedText = null;
                $(".search-button").trigger("click");
                return;
            }                        
        }
        else if (this.searchType && this.searchType.get() == "workflow") {

            //prevent default search results
            try {
                this.app.commandRegistry.command("DeactivateView").execute("DataFrameResultsContainerView");
            }
            catch (viewError){}

            //mobile version
            try {
                this.app.commandRegistry.command("DeactivateView").execute("ResultsViewContainerView");
            }
            catch (viewError){}
                        
            this.toggleSearchClearButton(true);
            this.suggestionsVisible.set(false);
            
            //keyboard selection submission event
            if (this.eventCount == 1 && this.suggestionSelectedText != null) {
                                
                $(this.targetInputBoxID).val(this.suggestionSelectedText);                
                this.suggestionSelectedText = null;
                $(".search-button").trigger("click");
                return;
            }

            if (!this.launchWorkflowLocked && this.eventCount >= this.searchEventCountTrigger) {

                this.launchWorkflowLocked = true;

                console.log("Starting workflow");

                this.eventCount = 0; //this.searchEventCountAfterWorkflowRun; //0;
                                                
                var workflowArgs: any = {};
                workflowArgs.workflowId = this.searchWorkflowID;                                
                workflowArgs[this.searchArgumentName] = $(this.targetInputBoxID).val();                

                if (this.suggestionSelectedIndex > -1 && this.suggestions && this.suggestionSelectedIndex < this.suggestions.length()) {
                    let suggestObject: any = this.suggestions.getAt(this.suggestionSelectedIndex);
                    if (suggestObject) {
                        workflowArgs["magicKey"] = suggestObject.magicKey;
                        workflowArgs["text"] = suggestObject.text;
                    }
                }

                //portal workflow
                if (workflowArgs.workflowId.indexOf("http") > -1) {
                    workflowArgs["url"] = workflowArgs.workflowId;
                    workflowArgs["inputs"] = {"magicKey": workflowArgs["magicKey"],"text": workflowArgs["text"]};
                    this.app.commandRegistry.command("RunWorkflowByUrlAndInputs").execute(workflowArgs);
                }
                else {
                    this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                }
                
                let thisScope = this;

                window.setTimeout(() => {
                    thisScope.launchWorkflowLocked = false;
                }, thisScope.launchWorkflowLockedTimeout);
            }
        }

        if (this.eventCount >= this.searchEventCountTrigger) {
            this.eventCount = 0;
        }   
    }    


    searchKeyUp(event: KeyboardEvent) {
        //console.log(event.keyCode);

        if ($(this.targetInputBoxID).val().toString().length > 0) {
            try
            {
                this.clearSearchVisible.set(true);
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
            this.suggestionArrowMovement(event.key);
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

        this.launchWorkflowLocked = false;

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

        this.suggestionBoxAdjustRight();

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

        //this is handled in searchProgressEvent
        //this.suggestionSelectedText = searchText;

        //primary search box use the search button
        if (this.targetInputBoxID == "#gcx_search")
            $(".search-button").trigger("click");
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

    suggestionArrowMovement(keyCode: string) {
                
        let pElement: Element = document.getElementsByClassName("oeSearchToWorkflowSuggest-module-view")[0];

        if (!pElement)
            return;

        let moveDir: number = (keyCode == "ArrowUp") ? -1 : 1;
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