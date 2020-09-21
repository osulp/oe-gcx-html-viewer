/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SearchToWorkflowViewModel } from "../OE_SearchToWorkflow/OE_SearchToWorkflowViewModel"

export class OE_SearchToWorkflowSuggestView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_SearchToWorkflowViewModel;
        
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    searchThisItem(event, element, context) {
        this.viewModel.suggestionClicked(context);
    }

    suggestMouseOver(event, element, context) {
        this.viewModel.suggestMouseOver(element);
    }
}