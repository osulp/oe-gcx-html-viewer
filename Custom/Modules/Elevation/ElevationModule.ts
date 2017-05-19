/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.elevation {

   /* var googleURL = "http://maps.googleapis.com/maps/api/elevation/json?locations=";
    var identifyParams = new esri.tasks.IdentifyParameters();
    var elevCounter = 0;
    var elevCounterMax;
    var shellName;*/

    export class ElevationModule extends geocortex.framework.application.ModuleBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;

        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }    

        initialize(config: any): void {     
           
        }

       
    }
}