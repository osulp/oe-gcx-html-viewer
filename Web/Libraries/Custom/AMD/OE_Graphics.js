
// Module 'OE_Graphics'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_Graphics/OE_GraphicsModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_GraphicsModule = (function (_super) {
        __extends(OE_GraphicsModule, _super);
        function OE_GraphicsModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_GraphicsModule.prototype.initialize = function (config) {
            var _this = this;
            this.editingCount = 0;
            this.isEditing = false;
            this.hideMapTipOnEdit = config.hideMapTipOnEdit || false;
            this.workflowIDRunOnEdit = config.workflowIDRunOnEdit || null;
            this.openMarkupStyleOnEdit = config.openMarkupStyleOnEdit || false;
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args);
                });
            }
        };
        OE_GraphicsModule.prototype._onSiteInitialized = function (site) {
            var _this = this;
            this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, function (args) {
                _this._markupEditingStarted(args);
            });
            this.app.eventRegistry.event("MarkupEditingStoppedEvent").subscribe(this, function (args) {
                _this._markupEditingStopped(args);
            });
            //grab the geocortex map event
            this.app.eventRegistry.event("MapClickedEvent").subscribe(this, function (args) {
                _this._handleMapClickEvent(args);
            });
        };
        OE_GraphicsModule.prototype._handleGeometryEditInvokeEvent = function (args) {
            //close map tip
            this.app.commandRegistry.commands["HideMapTips"].execute();
        };
        OE_GraphicsModule.prototype._handleMapClickEvent = function (pointIn) {
            console.log("OE: >> Click Event << ");
            if (!pointIn.graphic) {
                this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
            }
            else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {
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
        };
        /*_markupStopAllEditing() {
            this.app.commandRegistry.command("StopEditingClickableFeature").execute();
        }*/
        OE_GraphicsModule.prototype._markupEditingStarted = function (selectedGraphic) {
            this.isEditing = true;
            this.app.commandRegistry.commands["HideMapTips"].execute();
            $("#map_graphics_layer").css("display", "none");
            if (this.hideMapTipOnEdit)
                this.app.commandRegistry.command("HideAllMapTips").execute();
            /*console.log("OE: >> Start Edit << ");
            this.app.commandRegistry.command("SuspendMapTips").execute();
    
            if (this.hideMapTipOnEdit)
                this.app.commandRegistry.command("HideAllMapTips").execute();
    
            this.editingCount++;*/
            //if (this.workflowIDRunOnEdit)
            //  this.app.commandRegistry.command("RunWorkflowById").execute(this.workflowIDRunOnEdit);
            //if (this.openMarkupStyleOnEdit)
            //  this.app.commandRegistry.command("CreateMarkupStyleView").execute();
        };
        OE_GraphicsModule.prototype._markupEditingStopped = function (selectedGraphic) {
            /*console.log("OE: >> Stop Edit << ");
            this.editingCount--;
    
            this.app.commandRegistry.command("ResumeMapTips").execute();                */
        };
        return OE_GraphicsModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_GraphicsModule = OE_GraphicsModule;
});

},

    }
});


})();
