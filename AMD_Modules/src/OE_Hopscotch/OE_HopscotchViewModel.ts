/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { MapService } from "geocortex/essentials/MapService";
import { MapServiceType } from "geocortex/essentials/MapServiceConstants";
import { MapServiceFunction } from "geocortex/essentials/MapServiceConstants";

export class OE_HopscotchViewModel extends ViewModelBase {

    app: ViewerApplication;    
    site: any;
    thisViewModel: OE_HopscotchViewModel

    hopscotch;    
    toursKeyValObject: any;
    
    //searchFieldText: Observable<string> = new Observable<string>("");    
    //resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);    
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.site = (<any>this).app.site;

        this.thisViewModel = this;

        //this.tourJson = config.tourLayers;
        this.toursKeyValObject = {};

        //load tours into string reference object
        if (config.hasOwnProperty("tours")) {
            for (var i = 0; i < config.tours.length; i++) {
                this.toursKeyValObject[config.tours[i].key] = config.tours[i];
            }
        }
        
                
        if (this.site && this.site.isInitialized) {
            this._onSiteInitialized(config);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(config);
            });
        }
    }

    _onSiteInitialized(config: any) {
                                
        this._injectScript();

        //register tagging command
        this.app.commandRegistry.command("oeStartTour").register(this, this._startTour);
    }

    _startTour(args:any) {

        this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
        if (this.hopscotch && this.toursKeyValObject.hasOwnProperty(args)) {            

            if (this.toursKeyValObject[args].hasOwnProperty("requiredView"))
                this.app.command("ActivateView").execute(this.toursKeyValObject[args].requiredView);

            this.hopscotch.startTour(this.toursKeyValObject[args].tour);
        }        
    }
    
    private _injectScript() {

        //jQuery plugin for displaying tour/guide
        //http://linkedin.github.io/hopscotch/
        //////////////////////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/hopscotch-0.1.1.min.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
        });
        //html2canvas
        // http://html2canvas.hertzen.com/
        ////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/html2canvas.min.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
        });
    }
    
}