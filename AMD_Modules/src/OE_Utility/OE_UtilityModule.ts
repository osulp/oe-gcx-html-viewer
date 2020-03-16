/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getMarkupFromGeometry } from "geocortex/infrastructure/GraphicUtils";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { Geometry } from "geocortex/infrastructure/webMap/Geometry";
import { Workflow } from "geocortex/essentials/Workflow";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { Observable } from "geocortex/framework/observables";

export class OE_UtilityModule extends ModuleBase {

    app: ViewerApplication;
        
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
                
        var site = (<any>this).app.site;
        
        if (site && site.isInitialized) {
            this._onSiteInitialized(site,this);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args,this);
            });
        }
    }

    _onSiteInitialized(site,myModule) {
        
        this.app.registerActivityIdHandler("OE_Utility_IsViewActive", function CustomEventHandler(workflowContext, contextFunctions) {

            //check for view from passed in view name (id)  "BannerView" for example
            let checkView: ViewBase = myModule.app.viewManager.getViewById(workflowContext.getValue("viewName"));

            //set the workflow out variable "isViewActive"
            if (checkView) 
                workflowContext.setValue("isViewActive", checkView.isActive);
            else
                workflowContext.setValue("isViewActive", false);

            //move the workflow to the next activity
            workflowContext.completeActivity();
        });           
    }
}