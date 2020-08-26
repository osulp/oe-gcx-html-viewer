/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_SearchToWorkflowViewModel } from "../OE_SearchToWorkflow/OE_SearchToWorkflowViewModel"

export class OE_SearchToWorkflowView extends ViewBase {

    app: ViewerApplication;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    toggleSearchOptions(event, element, context) {
        (<OE_SearchToWorkflowViewModel>context).toggleSearchOptions( !(<OE_SearchToWorkflowViewModel>context).searchOptionsVisible.get() );
    }
    
    searchToDefault(event, element, context) {
        (<OE_SearchToWorkflowViewModel>context).searchToDefault();
    }

    searchToWorkflow(event, element, context) {
        (<OE_SearchToWorkflowViewModel>context).searchToWorkflow();
    }
}