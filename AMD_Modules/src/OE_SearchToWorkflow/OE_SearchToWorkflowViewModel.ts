/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { SearchProgressEventArgs } from "geocortex/infrastructure/eventArgs/SearchProgressEventArgs";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";

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

        /*this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, (args) => {
            this.watchForSearchView(args);
        });*/

        //add search view combo box, SearchView
        let thisScope = this;
        window.setTimeout(() => {
            thisScope.app.commandRegistry.command("ActivateView").execute("OE_SearchToWorkflowView");
            //set default selected option
            if (thisScope.defaultSearchOption == "workflow")
                thisScope.searchToWorkflow();
            else
                thisScope.searchToDefault();
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
    }

    searchProgressEvent(args: SearchProgressEventArgs) {
        //first event is searching, second is idle, third is idle
        this.eventCount++;

        /*console.log(args.status);
        console.log(args.query);
        console.log(args.results);*/

        if (this.searchType && this.searchType.get() == "workflow") {

            //prevent default search results
            this.app.commandRegistry.command("DeactivateView").execute("DataFrameResultsContainerView");

            if (this.eventCount >= 4) {
                this.eventCount = 0;

                //let workflowJson: any = "{\"workflowId\":\"" + this.searchWorkflowID + "\",\""+this.searchArgumentName+"\":\"" + args.query+"\"}";                
                
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
}