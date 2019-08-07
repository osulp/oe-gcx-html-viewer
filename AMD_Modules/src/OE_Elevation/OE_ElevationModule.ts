/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Site } from "geocortex/essentials/Site";

export class OE_ElevationModule extends ModuleBase {
       
    app: ViewerApplication;

    pointIn: object = null;
    usgsURL:string = "https://nationalmap.gov/epqs/pqs.php?";

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }
    
    initialize(config: any): void {
                
        var site = (<any>this).app.site;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args);
            });            
        }

    }

    _onSiteInitialized(site) {
        
        //buildElevationHTML();
        //this.app.eventRegistry.event("ContextMenuActivated").subscribe(this, this.contextMenuActiviated);
        this.app.eventRegistry.event("MapContextMenuPointUpdatedEvent").subscribe(this, this.handleMouseClick);

        this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, this.checkActivatedView);                
    }    

    checkActivatedView(args): void {
        //MapContextMenuView
        //console.log(args);
        //console.log(args.id);

        if (args.id == "MapContextMenuView")
        {
            this.buildElevationHTML();
            this.buildElevationRequest(this.pointIn);
        }

        //MapContextMenuView
    }

    buildElevationHTML(): void {

        //make sure the menu exists
        if (!$(".map-menu-coordinates").length)
            return;

        //create div if needed
        if (!$(".oeCustomElevationDiv").length)
            $(".map-menu-coordinates").append('<div class="oeCustomElevationDiv"><b>Elevation: </b><span id="GoogleElevationValue">Loading...</span></div>');
    }

    contextMenuActiviated(): void {
        //this.buildElevationHTML();
        //this.buildElevationRequest(this.pointIn);
    }

    handleMouseClick(pointIn, appIn):void {
        this.pointIn = pointIn;
    }

    buildElevationRequest(pointIn):void {

        $("#GoogleElevationValue").html("Loading...");

        //Grab the current application
        var appIn = (<any>this).app; //geocortex.framework.applications[0];

        if (appIn == undefined || appIn == null) {
            $("#GoogleElevationValue").html("App not found");
            return;
        }

        if (pointIn == undefined || pointIn == null) {
            $("#GoogleElevationValue").html("No point supplied");
            return;
        }

        //The coordinates manager hold a prevCoord which is acutally the current context menu point.                
        var defaultX = pointIn.x;
        var defaultY = pointIn.y;

        //The default spatial reference is 102100, change it to web mercator
        var xyPoint = new esri.geometry.Point(defaultX, defaultY, new esri.SpatialReference({ wkid: 102100 }));
        var geographicPoint = esri.geometry.webMercatorToGeographic(xyPoint);
        var mapPoint = new esri.geometry.Point(geographicPoint);

        //toss point at usgs
        var url = this.usgsURL + "x=" + mapPoint.x + "&y=" + mapPoint.y + "&units=feet&output=json";

        $.get(url, "", null, "json")
            .done(function (result) {

                var elevation = result.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation;
                if (elevation > -10000) {
                    elevation = Math.round(parseFloat(elevation)).toString() + " ft";
                    $("#GoogleElevationValue").html(elevation);
                }
                else {
                    $("#GoogleElevationValue").html("No data");
                }
            })
            .fail(function (xhr, ajaxOptions, thrownError) {
                $("#GoogleElevationValue").html("Load failed");
            });
    }  

}