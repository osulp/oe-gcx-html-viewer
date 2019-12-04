/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { Site } from "geocortex/essentials/Site";

export class OE_ConvertGeometryViewModel extends ViewModelBase {

    app: ViewerApplication;

    googlePolylineIn: Observable<string> = new Observable<string>("");
    coordinatesStringOut: Observable<string> = new Observable<string>("");
    coordinatesCollection: ObservableCollection<any> = new ObservableCollection<any>();
    
    //workflow ref
    myWorkflowContext: Observable<ActivityContext> = new Observable<ActivityContext>(null);
    myModel: Observable<OE_ConvertGeometryViewModel> = new Observable<OE_ConvertGeometryViewModel>(null);
    
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
                
        //dynamic external workflow form
        this.app.registerActivityIdHandler("googlePolylineDecode", function CustomEventHandler(workflowContext, contextFunctions) {

            //let myWorkflowContext: any;
            //myWorkflowContext = $.extend({}, workflowContext);
            thisViewModel.myModel = thisViewModel;

            thisViewModel.myWorkflowContext = $.extend({}, workflowContext);

            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_Wildfire_DynamicFormView");
            thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_ConvertGeometryView");

            thisViewModel.googlePolylineIn.set(thisViewModel.myWorkflowContext.getValue("googlePolylineIn"));

            var coordinates: any[] = thisViewModel.googlePolylineDecode(thisViewModel.myWorkflowContext.getValue("googlePolylineIn"), 5);
            thisViewModel.coordinatesCollection.addItems(coordinates);
            thisViewModel.myWorkflowContext.setValue("coordinatesCollection", coordinates);

            thisViewModel.myWorkflowContext.setValue("coordinatesStringOut", "test");
            thisViewModel.myWorkflowContext.completeActivity();

            thisViewModel.app.commandRegistry.command("DeactivateView").execute("OE_ConvertGeometryView");

                        

            //context.myWorkflowContext.setValue("customFormResult", 'homeReport');
            //context.myWorkflowContext.completeActivity();
            //context.myModel.closeView();

            /*if (thisViewModel.myWorkflowContext.getValue("isSFPD")) {
                $(".wildfire_sfpd_content").css("display", "block");
            }
            else
            {
                $(".wildfire_sfpd_content").css("display", "none");
            }*/
        });
    }

     /**
     * Decodes to a [latitude, longitude] coordinates array.
     *
     * This is adapted from the implementation in Project-OSRM.
     *
     * @param {String} str
     * @param {Number} precision
     * @returns {Array}
     *
     * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
     */
    googlePolylineDecode = function (str, precision) {
        var index = 0,
            lat = 0,
            lng = 0,
            coordinates = [],
            shift = 0,
            result = 0,
            byte = null,
            latitude_change,
            longitude_change,
            factor = Math.pow(10, (Math.round(precision)==precision) ? precision : 5);
                
        // Coordinates have variable length when encoded, so just keep
        // track of whether we've hit the end of the string. In each
        // loop iteration, a single coordinate is decoded.
        while (index < str.length) {

            // Reset shift, result, and byte
            byte = null;
            shift = 0;
            result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            shift = result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            lat += latitude_change;
            lng += longitude_change;

            coordinates.push([lat / factor, lng / factor]);
        }

        return coordinates;
    };
}