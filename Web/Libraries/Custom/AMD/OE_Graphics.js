
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
            this.tagNextMarkup = false;
            this.hideMapTipOnEdit = config.hideMapTipOnEdit || false;
            this.workflowIDRunOnEdit = config.workflowIDRunOnEdit || null;
            this.openMarkupStyleOnEdit = config.openMarkupStyleOnEdit || false;
            this.lastGraphicWasOE = false;
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
            //any enabled property requires this command 
            if (this.hideMapTipOnEdit || this.openMarkupStyleOnEdit || this.workflowIDRunOnEdit != null) {
                this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, function (args) {
                    _this._markupEditingStarted(args);
                });
            }
            //commands required for hiding map tips and marking a graphic as OE
            if (this.hideMapTipOnEdit) {
                //register tagging command
                this.app.commandRegistry.command("OETagNextMarkup").register(this, this._oeTagNextMarkup);
                this.app.eventRegistry.event("MarkupAddedEvent").subscribe(this, function (args) {
                    _this._markupAddedEvent(args);
                });
                this.app.eventRegistry.event("MarkupEditingStoppedEvent").subscribe(this, function (args) {
                    _this._markupEditingStopped(args);
                });
                //grab the geocortex map event        
                this.app.eventRegistry.event("MapClickedEvent").subscribe(this, function (args) {
                    _this._handleMapClickEvent(args);
                });
            }
        };
        OE_GraphicsModule.prototype._oeTagNextMarkup = function () {
            this.tagNextMarkup = true;
        };
        OE_GraphicsModule.prototype._markupAddedEvent = function (graphic) {
            if (this.tagNextMarkup == true) {
                //graphic.setAttributes({ "oe_markup": "oe", "name": "Custom Name", "title": "Custom Title" });
                graphic["oe_markup"] = true;
            }
            this.tagNextMarkup = false;
        };
        OE_GraphicsModule.prototype._handleMapClickEvent = function (pointIn) {
            if (this.hideMapTipOnEdit) {
                if (!pointIn.graphic) {
                    //no graphic select, clear markup
                    this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
                    this.app.commandRegistry.commands["ResumeMapTips"].execute();
                    this.lastGraphicWasOE = false;
                }
                else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {
                    if (pointIn.graphic["oe_markup"] != undefined && pointIn.graphic["oe_markup"] == true) {
                        //oe graphic, edit and mark that OE was the last graphic edited
                        this.app.commandRegistry.commands['EditMarkup'].execute(pointIn.graphic.geometry);
                        this.lastGraphicWasOE = true;
                    }
                    else {
                        if (this.lastGraphicWasOE) {
                            //if the last graphic was OE clear the markup.
                            //This prevents the controls showing up on the OE graphic if the user selects a standard graphic
                            this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
                            this.app.commandRegistry.commands["ResumeMapTips"].execute();
                            this.lastGraphicWasOE = false;
                        }
                        else {
                            //standard graphic, remove classname
                            document.getElementById("map_graphics_layer").className["baseVal"] = "";
                            this.app.commandRegistry.commands["ResumeMapTips"].execute();
                            this.app.commandRegistry.commands['InvokeMapTip'].execute();
                        }
                    }
                }
            }
        };
        /*_checkChildCount(selectedGraphic) {
    
            //redraw the square selection outline around the graphic
    
            var svgElement = document.getElementById("map_graphics_layer");
            var elements = svgElement.getElementsByTagName("path");
    
            let str: String = elements[0].getAttribute("d");
            let pathParts: String[] = str.split(" ");
            pathParts.splice(pathParts.length - 2, 1);
            elements[0].setAttribute("d", pathParts.join(" "));
        
        }*/
        OE_GraphicsModule.prototype._markupEditingStarted = function (selectedGraphic) {
            if (this.hideMapTipOnEdit && selectedGraphic["oe_markup"] == true) {
                this.app.commandRegistry.commands["HideMapTips"].execute();
                document.getElementById("map_graphics_layer").className["baseVal"] = "OESvgMarkup";
                selectedGraphic.symbol.setColor(new esri.Color([102, 255, 255, .5]));
                selectedGraphic.draw();
            }
            if (this.openMarkupStyleOnEdit) {
                this.app.commandRegistry.commands["CreateMarkupStyleView"].execute();
            }
            else if (this.workflowIDRunOnEdit != null) {
                this.app.commandRegistry.commands["RunWorkflowById"].execute(this.workflowIDRunOnEdit);
            }
        };
        OE_GraphicsModule.prototype._markupEditingStopped = function (selectedGraphic) {
            //change color
            if (selectedGraphic["oe_markup"] != undefined && selectedGraphic["oe_markup"] == true) {
                selectedGraphic.symbol.setColor(new esri.Color([76, 160, 216, .5]));
                selectedGraphic.draw();
            }
        };
        return OE_GraphicsModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_GraphicsModule = OE_GraphicsModule;
});

},

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Graphics/CSS/OE_GraphicsModule.css", "css", "DQovKiNtYXBfZ3JhcGhpY3NfbGF5ZXIgcGF0aDpudGgtY2hpbGQoMikNCnsgICAgDQogICAgc3Ryb2tlOiB3aGl0ZSAhaW1wb3J0YW50Ow0KICAgIHN0cm9rZS13aWR0aDogMiAhaW1wb3J0YW50Ow0KfQ0KDQojbWFwX2dyYXBoaWNzX2xheWVyIHBhdGg6bnRoLWNoaWxkKG4rMykNCnsNCiAgICBkaXNwbGF5Om5vbmUgIWltcG9ydGFudDsNCn0NCg0KI21hcF9ncmFwaGljc19sYXllciBwYXRoOm50aC1jaGlsZCgyKQ0KeyAgICANCiAgICAgZGlzcGxheTpibG9jayAhaW1wb3J0YW50Ow0KfQ0KDQojbWFwX2dyYXBoaWNzX2xheWVyIGNpcmNsZQ0Kew0KICAgIGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50Ow0KfSovDQoNCi8qLk9FU3ZnTWFya3VwIHBhdGg6bnRoLWNoaWxkKDIpDQp7ICAgIA0KICAgIGRpc3BsYXk6YmxvY2sgIWltcG9ydGFudDsNCiAgICBzdHJva2U6IHdoaXRlICFpbXBvcnRhbnQ7DQogICAgc3Ryb2tlLXdpZHRoOiAyICFpbXBvcnRhbnQ7DQp9DQoNCi5PRVN2Z01hcmt1cCBwYXRoOm50aC1jaGlsZChuKzMpDQp7DQogICAgZGlzcGxheTpub25lICFpbXBvcnRhbnQ7DQp9Ki8NCg0KLyouT0VTdmdNYXJrdXAgcGF0aDpudGgtY2hpbGQoMikNCnsNCiAgICBkaXNwbGF5OmJsb2NrICFpbXBvcnRhbnQ7DQp9Ki8NCg0KLk9FU3ZnTWFya3VwIGNpcmNsZSwgLk9FU3ZnTWFya3VwIHBhdGgNCnsNCiAgICBkaXNwbGF5Om5vbmUgIWltcG9ydGFudDsNCn0=");

});

})();
