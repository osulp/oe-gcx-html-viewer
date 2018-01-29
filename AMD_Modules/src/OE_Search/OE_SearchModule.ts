/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />

import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

declare const require: any;

export class OE_SearchModule extends ModuleBase {

    constructor(app: ViewerApplication, libraryId: string) {
        super(app, libraryId);

        // Legacy 'shim' to make the GeoNamesSearchProvider available at the location defined in the 'type' configuration
        // This is required as custom search provider instantiation does not yet make use of the AMD style 'require', and it can be removed when it does. 
        require(["geocortex/oe_amd/OE_Search/OE_SearchProvider"], (obj) => {
            dojo.getObject("geocortex.oe_amd.OE_Search", true);
            (<any>geocortex).oe_amd.OE_Search.OE_SearchProvider = obj.GeoNamesSearchProvider;
        });        
    }

    clearTitle = function (event, element, context) {
        element.value = "";
    };

    //myWorkflowContext.setValue("reportTitle", document.getElementById("reportTitle")["value"]);
}