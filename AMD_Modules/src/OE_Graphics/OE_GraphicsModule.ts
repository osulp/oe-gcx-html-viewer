/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getMarkupFromGeometry } from "geocortex/infrastructure/GraphicUtils";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { getInternalGraphicsLayer } from "geocortex/infrastructure/GraphicsLayerUtils";
import { MARKUP_LAYER_ID } from "geocortex/infrastructure/GraphicsLayerIds";
import { COORDINATES_LAYER_ID } from "geocortex/infrastructure/GraphicsLayerIds";
import { Geometry } from "geocortex/infrastructure/webMap/Geometry";

export class OE_GraphicsModule extends ModuleBase {
        
    app: ViewerApplication;
    enableCustomFeatures: boolean;
    customFeaturesIn: any; //name / value pairs {"color":"rgb(255,0,0)","name":"Title","nameval":"Value","group":"sfam_circles"}

    hideMapTipOnEdit: boolean; //also adds the OE property to graphics
    workflowIDRunOnEdit: string;
    openMarkupStyleOnEdit: boolean;    
    tagNextMarkup: boolean; //used to add an OE property to a graphic

    lastGraphicWasOE: boolean; //need to know if the last graphic was OE
    lastColor: esri.Color;
    lastColorOutline: esri.Color;
        
    //nextMarkupColor: string; //rgb(202,0,19)

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.tagNextMarkup = false;        

        this.enableCustomFeatures = config.enableCustomFeatures || false;

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
        if (this.hideMapTipOnEdit || this.openMarkupStyleOnEdit || this.workflowIDRunOnEdit != null || this.enableCustomFeatures ) {
            this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, (args) => {
                this._markupEditingStarted(args);
            });
        }
        //commands required for hiding map tips and marking a graphic as OE
        if (this.hideMapTipOnEdit || this.enableCustomFeatures ) {
                        
             //register tagging command
            this.app.commandRegistry.command("OETagNextMarkup").register(this, this._oeTagNextMarkup);

            //custom clear commmand
            this.app.commandRegistry.command("OEClearTaggedMarkup").register(this, this._oeClearOEMarkup);
                       
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
    
    _oeIsOEMarkup(graphic: esri.Graphic)
    {
        if (typeof graphic == "undefined" || graphic == null)
            return false;

        if (Object.prototype.hasOwnProperty.call(graphic, "oe_markup") && graphic["oe_markup"] == true)
            return true;
        
        return false;
    }

    _oeClearOEMarkup(group: string)
    {                
        var t = getInternalGraphicsLayer(MARKUP_LAYER_ID, this.app);        
        if (!t)
            return;        

        var i = t.graphics.length;
        while (i--)
        {
            //only remove oe markup graphics
            if (this._oeIsOEMarkup(t.graphics[i]) ) {

                //clear a specific group
                if (group != undefined && group != "" && t.graphics[i]["oe_group"] != undefined && t.graphics[i]["oe_group"] == group) {
                    this.app.event("MarkupDeletedEvent").publish(t.graphics[i]);
                    t.remove(t.graphics[i]);
                } // clear all oe markup
                else if (group == undefined || group == "") {
                    this.app.event("MarkupDeletedEvent").publish(t.graphics[i]);
                    t.remove(t.graphics[i]);
                }
            }
        }

        //this._deactivateActiveToolIfNoMarkupExists(),
        this.app.command("ClearMarkup").raiseCanExecuteChanged(),
        this.app.command("EditMarkup").raiseCanExecuteChanged(),
        this.app.command("DeleteMarkup").raiseCanExecuteChanged(),
        this.app.command("ExportMarkupLayer").raiseCanExecuteChanged(),
        this.app.event("MarkupClearedEvent").publish()                
    }
    
    _oeTagNextMarkup(featuresIn: string) {
        this.tagNextMarkup = true;

        if (featuresIn != undefined && featuresIn != "")
            this.customFeaturesIn = JSON.parse(featuresIn);
        else
            this.customFeaturesIn = "";
    }

    _markupAddedEvent(graphic: esri.Graphic) {
        
        if (this.tagNextMarkup == true) {
            
            graphic["oe_markup"] = true;
            
            if (this.customFeaturesIn != undefined && this.customFeaturesIn != "") {

                //feature group (for clearing specific groups)
                if (this.customFeaturesIn.group != undefined && this.customFeaturesIn.group != "") {
                    graphic["oe_group"] = this.customFeaturesIn.group;
                }

                //feature name field and name value
                if (this.customFeaturesIn.name != undefined && this.customFeaturesIn.name != "") {
                    var obj: any = new Object();
                    obj[this.customFeaturesIn.name] = this.customFeaturesIn.nameval;

                    graphic.attributes = obj;
                }

                //feature color
                if (this.customFeaturesIn.color != "")
                {
                    graphic.symbol.setColor(esri.Color.fromHex("#000000"));

                    let workingRBGString = this.customFeaturesIn.color.replace(/[rgb()" \s]/g, "");

                    let rgbArray = workingRBGString.split(",");
                    graphic.symbol.color.r = parseInt(rgbArray[0]);
                    graphic.symbol.color.g = parseInt(rgbArray[1]);
                    graphic.symbol.color.b = parseInt(rgbArray[2]);
                    graphic.symbol.color.a = Number(rgbArray[3]);

                    graphic.symbol["outline"].color = esri.Color.fromHex("#000000");
                    graphic.symbol["outline"].color.r = graphic.symbol.color.r;
                    graphic.symbol["outline"].color.g = graphic.symbol.color.g;
                    graphic.symbol["outline"].color.b = graphic.symbol.color.b;
                    graphic.symbol["outline"].color.a = 1;

                    if (this.app.markupLayer["value"] != undefined && this.app.markupLayer["value"] != "")
                        this.app.markupLayer["value"].refresh();
                }

                this.customFeaturesIn = "";
            }             
        }
        
        this.tagNextMarkup = false;
    }
        
    _handleMapClickEvent(pointIn) {

        if (this.hideMapTipOnEdit || this.enableCustomFeatures) {

            if (!pointIn.graphic) {

                //no graphic select, clear markup
                this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);                
                this.app.commandRegistry.commands["ResumeMapTips"].execute();
                this.lastGraphicWasOE = false;

            } else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {
                                
                if (this._oeIsOEMarkup(pointIn.graphic) )
                {   
                     //oe graphic, edit and mark that OE was the last graphic edited                    
                    this.lastGraphicWasOE = true;                                        

                    if (!this.hideMapTipOnEdit) {
                        //document.getElementById("map_graphics_layer").className["baseVal"] = "";
                        this.app.commandRegistry.commands["ResumeMapTips"].execute();
                        this.app.commandRegistry.commands['InvokeMapTip'].execute();
                    }
                    else
                    {
                        this.app.commandRegistry.commands["HideMapTips"].execute();
                        this.app.commandRegistry.commands['EditMarkup'].execute(pointIn.graphic.geometry);
                    }
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
    
    _markupEditingStarted(selectedGraphic: esri.Graphic) {
             
        if ( this._oeIsOEMarkup(selectedGraphic) )
        {   
            if (this.hideMapTipOnEdit)         
                this.app.commandRegistry.commands["HideMapTips"].execute();

            document.getElementById("map_graphics_layer").className["baseVal"] = "OESvgMarkup";
            this.lastColor = selectedGraphic.symbol.color;
            selectedGraphic.symbol.setColor(new esri.Color([102, 255, 255, .5]));

            if (selectedGraphic.symbol["outline"] != undefined && selectedGraphic.symbol["outline"] != "") {
                this.lastColorOutline = selectedGraphic.symbol["outline"].color;
                selectedGraphic.symbol["outline"].setColor(new esri.Color([102, 255, 255, 1]));
            }

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
        if ( this._oeIsOEMarkup(selectedGraphic) ) { 
            selectedGraphic.symbol.setColor(this.lastColor);
            
            if (selectedGraphic.symbol["outline"] != undefined && selectedGraphic.symbol["outline"] != "") {
                selectedGraphic.symbol["outline"].setColor(this.lastColorOutline);
            }

            selectedGraphic.draw();            
        }        
    }

}