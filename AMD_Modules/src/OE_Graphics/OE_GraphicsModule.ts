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
    hideMapTipOnEdit: boolean;
    workflowIDRunOnEdit: string;
    openMarkupStyleOnEdit: boolean;
    editingCount: number;
    isEditing: boolean;

    lastPoint: Geometry;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.editingCount = 0;
        this.hideMapTipOnEdit = config.hideMapTipOnEdit || false;
        this.workflowIDRunOnEdit = config.workflowIDRunOnEdit || null;
        this.openMarkupStyleOnEdit = config.openMarkupStyleOnEdit || false;

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

        this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, (args) => {
            this._markupEditingStarted(args);
        });

        this.app.eventRegistry.event("MarkupEditingStoppedEvent").subscribe(this, (args) => {
            this._markupEditingStopped(args);
        });

        //grab the geocortex map event
        this.app.eventRegistry.event("MapClickedEvent").subscribe(this, (args) => {
            this._handleMapClickEvent(args);
        });
    }

    _handleGeometryEditInvokeEvent(args) {
        //close map tip
        this.app.commandRegistry.commands["HideMapTips"].execute();
    }

    _handleMapClickEvent(pointIn) {
        console.log("OE: >> Click Event << ");
        if (!pointIn.graphic) {
            this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
        } else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {
            this.app.commandRegistry.commands['EditMarkup'].execute(pointIn.graphic.geometry);
        }

        //if (pointIn.graphic || this.isEditing) {
        //    if (pointIn.graphic.getSourceLayer().id !== 'Drawings') {

        //    }
        //}
        this.lastPoint = pointIn.mapPoint;

        /*let graphics: esri.Graphic[] = getMarkupFromGeometry(pointIn.mapPoint, getGraphicsLayer("Drawings", false, this.app), this.app);

        if (graphics.length > 0) {
            //this.app.commandRegistry.command("SuspendMapTips").execute();
            this.app.commandRegistry.command("EditMarkup").execute(graphics[0].geometry);
            //this.app.commandRegistry.command("StopAndAutoEditClickableFeature").execute(graphics[0].geometry);
        }

        if (this.editingCount>0) {
            //this.app.commandRegistry.command("StopEditingClickableFeature").execute();
            this.app.commandRegistry.command("StopEditingMarkup").execute();
            this.editingCount = 0;
        }*/
    }

    /*_markupStopAllEditing() {
        this.app.commandRegistry.command("StopEditingClickableFeature").execute();
    }*/

    _markupEditingStarted(selectedGraphic: esri.Graphic) {
        this.isEditing = true;
        this.app.commandRegistry.commands["HideMapTips"].execute();
        //$("#map_graphics_layer").css("display", "none");

        /*console.log("OE: >> Start Edit << ");
        this.app.commandRegistry.command("SuspendMapTips").execute();

        if (this.hideMapTipOnEdit)
            this.app.commandRegistry.command("HideAllMapTips").execute();

        this.editingCount++;*/

        //if (this.workflowIDRunOnEdit)
          //  this.app.commandRegistry.command("RunWorkflowById").execute(this.workflowIDRunOnEdit);

        //if (this.openMarkupStyleOnEdit)
          //  this.app.commandRegistry.command("CreateMarkupStyleView").execute();
    }

    _markupEditingStopped(selectedGraphic: esri.Graphic) {

        /*console.log("OE: >> Stop Edit << ");
        this.editingCount--;

        this.app.commandRegistry.command("ResumeMapTips").execute();                */
    }

}