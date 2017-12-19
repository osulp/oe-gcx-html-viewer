/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getMarkupFromGeometry } from "geocortex/infrastructure/GraphicUtils";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { Geometry } from "geocortex/infrastructure/webMap/Geometry";

export class OE_GraphicsModule extends ModuleBase {

    app: ViewerApplication;
    hideMapTipOnEdit: boolean; //also adds the OE property to graphics
    workflowIDRunOnEdit: string;
    openMarkupStyleOnEdit: boolean;    
    tagNextMarkup: boolean; //used to add an OE property to a graphic
    lastGraphicWasOE: boolean; //need to know if the last graphic was OE

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.tagNextMarkup = false;        
        this.hideMapTipOnEdit = config.hideMapTipOnEdit || false;
        this.workflowIDRunOnEdit = config.workflowIDRunOnEdit || null;
        this.openMarkupStyleOnEdit = config.openMarkupStyleOnEdit || false;

        this.lastGraphicWasOE = false;

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

        //any enabled property requires this command 
        if (this.hideMapTipOnEdit || this.openMarkupStyleOnEdit || this.workflowIDRunOnEdit !=null) {
            this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, (args) => {
                this._markupEditingStarted(args);
            });
        }

        //commands required for hiding map tips and marking a graphic as OE
        if (this.hideMapTipOnEdit) {

             //register tagging command
            this.app.commandRegistry.command("OETagNextMarkup").register(this, this._oeTagNextMarkup);

            this.app.eventRegistry.event("MarkupAddedEvent").subscribe(this, (args) => {
                this._markupAddedEvent(args);
            });

            this.app.eventRegistry.event("MarkupEditingStoppedEvent").subscribe(this, (args) => {
                this._markupEditingStopped(args);
            });

            //grab the geocortex map event        
            this.app.eventRegistry.event("MapClickedEvent").subscribe(this, (args) => {
                this._handleMapClickEvent(args);
            });
        }
    }

    _oeTagNextMarkup() {
        this.tagNextMarkup = true;
    }

    _markupAddedEvent(graphic: esri.Graphic) {
        
        if (this.tagNextMarkup == true) {
            //graphic.setAttributes({ "oe_markup": "oe", "name": "Custom Name", "title": "Custom Title" });
            graphic["oe_markup"] = true;
        }

        this.tagNextMarkup = false;
    }
        
    _handleMapClickEvent(pointIn) {

        if (this.hideMapTipOnEdit) {
            if (!pointIn.graphic) {
                //no graphic select, clear markup
                this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);                
                this.app.commandRegistry.commands["ResumeMapTips"].execute();
                this.lastGraphicWasOE = false;
            } else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {

                if (pointIn.graphic["oe_markup"] != undefined && pointIn.graphic["oe_markup"] == true) {
                    //oe graphic, edit and mark that OE was the last graphic edited
                    this.app.commandRegistry.commands['EditMarkup'].execute(pointIn.graphic.geometry);
                    this.lastGraphicWasOE = true;
                }
                else {

                    if (this.lastGraphicWasOE)
                    {
                        //if the last graphic was OE clear the markup.
                        //This prevents the controls showing up on the OE graphic if the user selects a standard graphic
                        this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
                        this.app.commandRegistry.commands["ResumeMapTips"].execute();
                        this.lastGraphicWasOE = false;
                    }
                    else
                    {
                        //standard graphic, remove classname
                        document.getElementById("map_graphics_layer").className["baseVal"] = "";
                        this.app.commandRegistry.commands["ResumeMapTips"].execute();
                        this.app.commandRegistry.commands['InvokeMapTip'].execute();
                    }                    
                }
            }
        }   
    }

    /*_checkChildCount(selectedGraphic) {

        //redraw the square selection outline around the graphic

        var svgElement = document.getElementById("map_graphics_layer");
        var elements = svgElement.getElementsByTagName("path");

        let str: String = elements[0].getAttribute("d");
        let pathParts: String[] = str.split(" ");
        pathParts.splice(pathParts.length - 2, 1);
        elements[0].setAttribute("d", pathParts.join(" "));
    
    }*/

    _markupEditingStarted(selectedGraphic: esri.Graphic) {

        if (this.hideMapTipOnEdit && selectedGraphic["oe_markup"] == true)
        {            
            this.app.commandRegistry.commands["HideMapTips"].execute();
            document.getElementById("map_graphics_layer").className["baseVal"] = "OESvgMarkup";
            selectedGraphic.symbol.setColor(new esri.Color([102, 255, 255, .5]));
            selectedGraphic.draw();     
        }

        if (this.openMarkupStyleOnEdit)
        {
            this.app.commandRegistry.commands["CreateMarkupStyleView"].execute();            
        }
        else if (this.workflowIDRunOnEdit != null)
        {
            this.app.commandRegistry.commands["RunWorkflowById"].execute(this.workflowIDRunOnEdit);
        }        
    }
        
    _markupEditingStopped(selectedGraphic: esri.Graphic) {
  
        //change color
        if (selectedGraphic["oe_markup"] != undefined && selectedGraphic["oe_markup"] == true) {
            selectedGraphic.symbol.setColor(new esri.Color([76, 160, 216, .5]));
            selectedGraphic.draw();            
        }        
    }

}