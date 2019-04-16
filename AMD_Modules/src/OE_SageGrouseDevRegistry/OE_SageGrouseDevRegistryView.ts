/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SageGrouseDevRegistryViewModel } from './OE_SageGrouseDevRegistryViewModel';

var myWorkflowContext;
//var myApp;
//var myLibID;

export class OE_SageGrouseDevRegistryView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevRegistryViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }   

    toggleLayer = function (event, element, context) {
        let workflowArgs: any = {};
        workflowArgs.workflowId = "toggleLayer";
        workflowArgs.MapServiceID = myWorkflowContext.getValue("mapServiceID");
        workflowArgs.LayerName = element.getAttribute("data-attr-layer");
        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
    };
    showInfo = function (event, element, context) {
        let workflowArgs: any = {};
        workflowArgs.workflowId = "constraintPopUps";
        workflowArgs.constraint = element.getAttribute("data-attr-constraint");
        this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
    };

    zoomTo = function (event, element, context) {
        let featureExtent: any = myWorkflowContext.getValue('uda_extent');
        this.app.commandRegistry.commands.ZoomToExtent.execute(featureExtent);
    };

    clearTitle = function (event, element, context) {
        element.value = "";
    };    

    cancelForm = function (event, element, context) {
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryView");
        return true;
    };

}


