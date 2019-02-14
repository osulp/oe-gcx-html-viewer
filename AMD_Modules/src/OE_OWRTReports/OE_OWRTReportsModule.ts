/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";
import { Observable } from "geocortex/framework/observables";

export class OE_OWRTReportsModule extends ModuleBase {

    app: ViewerApplication;
    //viewerApp: Observable<ViewerApplication>;
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);                
    }

    initialize(config: any): void {
        //alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));                
    }   

}