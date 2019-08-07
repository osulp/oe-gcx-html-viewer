/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SageGrouseDevRegistryViewModel } from './OE_SageGrouseDevRegistryViewModel';


var myWorkflowContext;
var myApp;
//var myLibID;

export class OE_SageGrouseDevRegistryProjectReportView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SageGrouseDevRegistryViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    cancelForm = function (event, element, context) {
        myWorkflowContext.setValue("finalFormBtn", 'Close');
        myWorkflowContext.completeActivity();
        this.app.commandRegistry.command("DeactivateView").execute("OE_SageGrouseDevRegistryProjectReportView");
        //$(".panel-header-button.right.close-16.bound-visible").show();
        return true;
    };

}