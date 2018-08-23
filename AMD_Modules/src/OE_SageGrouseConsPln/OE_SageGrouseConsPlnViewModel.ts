/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { ActivityContext } from "geocortex/workflow/ActivityContext";

export var oeSageGrouseDevSitingReports: any[] = [];

export class SageGrouseConsPlnViewModel extends ViewModelBase {
    app: ViewerApplication;



    //myWorkflowContext: Observable<ActivityContext> = new Observable<ActivityContext>(null);
    myWorkflowContext: any;
    myModel: any;
    //myModel: Observable<OE_SageGrouseDevSitingViewModel> = new Observable<OE_SageGrouseDevSitingViewModel>(null);


    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        var site: Site = (<any>this).app.site;

        var thisViewModel = this;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel);
            });
        }
    }

    _onSiteInitialized(site: Site, thisViewModel) {
        this.app.registerActivityIdHandler("showConsPlnFilters", function CustomEventHandler(workflowContext, contextFunctions) {

            //thisViewModel.app.commandRegistry.command
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");
            //workflowContext.completeActivity();
            //thisViewModel.myModel = thisViewModel;
        });
    }

}