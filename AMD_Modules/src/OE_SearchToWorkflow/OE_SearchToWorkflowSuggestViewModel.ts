/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

export class OE_SearchToWorkflowSuggestViewModel extends ViewModelBase {

    app: ViewerApplication;
            
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }        
}