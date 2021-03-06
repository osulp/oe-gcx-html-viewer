
// Module 'OE_Graphics'
        (function () {

require({
    cache: {
        "geocortex/oe_amd/OE_Graphics/OE_GraphicsModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase", "geocortex/infrastructure/GraphicsLayerUtils", "geocortex/infrastructure/GraphicsLayerIds"], function (require, exports, ModuleBase_1, GraphicsLayerUtils_1, GraphicsLayerIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_GraphicsModule = /** @class */ (function (_super) {
        __extends(OE_GraphicsModule, _super);
        //nextMarkupColor: string; //rgb(202,0,19)
        function OE_GraphicsModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_GraphicsModule.prototype.initialize = function (config) {
            var _this = this;
            this.tagNextMarkup = false;
            this.enableCustomFeatures = config.enableCustomFeatures || false;
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
            if (this.hideMapTipOnEdit || this.openMarkupStyleOnEdit || this.workflowIDRunOnEdit != null || this.enableCustomFeatures) {
                this.app.eventRegistry.event("MarkupEditingStartedEvent").subscribe(this, function (args) {
                    _this._markupEditingStarted(args);
                });
            }
            //commands required for hiding map tips and marking a graphic as OE
            if (this.hideMapTipOnEdit || this.enableCustomFeatures) {
                //register tagging command
                this.app.commandRegistry.command("OETagNextMarkup").register(this, this._oeTagNextMarkup);
                //custom clear commmand
                this.app.commandRegistry.command("OEClearTaggedMarkup").register(this, this._oeClearOEMarkup);
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
        OE_GraphicsModule.prototype._oeIsOEMarkup = function (graphic) {
            if (typeof graphic == "undefined" || graphic == null)
                return false;
            if (Object.prototype.hasOwnProperty.call(graphic, "oe_markup") && graphic["oe_markup"] == true)
                return true;
            return false;
        };
        OE_GraphicsModule.prototype._oeClearOEMarkup = function (group) {
            var t = GraphicsLayerUtils_1.getInternalGraphicsLayer(GraphicsLayerIds_1.MARKUP_LAYER_ID, this.app);
            if (!t)
                return;
            var i = t.graphics.length;
            while (i--) {
                //only remove oe markup graphics
                if (this._oeIsOEMarkup(t.graphics[i])) {
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
                this.app.event("MarkupClearedEvent").publish();
        };
        OE_GraphicsModule.prototype._oeTagNextMarkup = function (featuresIn) {
            this.tagNextMarkup = true;
            if (featuresIn != undefined && featuresIn != "")
                this.customFeaturesIn = JSON.parse(featuresIn);
            else
                this.customFeaturesIn = "";
        };
        OE_GraphicsModule.prototype._markupAddedEvent = function (graphic) {
            if (this.tagNextMarkup == true) {
                graphic["oe_markup"] = true;
                if (this.customFeaturesIn != undefined && this.customFeaturesIn != "") {
                    //feature group (for clearing specific groups)
                    if (this.customFeaturesIn.group != undefined && this.customFeaturesIn.group != "") {
                        graphic["oe_group"] = this.customFeaturesIn.group;
                    }
                    //feature name field and name value
                    if (this.customFeaturesIn.name != undefined && this.customFeaturesIn.name != "") {
                        var obj = new Object();
                        obj[this.customFeaturesIn.name] = this.customFeaturesIn.nameval;
                        graphic.attributes = obj;
                    }
                    //feature color
                    if (this.customFeaturesIn.color != "") {
                        graphic.symbol.setColor(esri.Color.fromHex("#000000"));
                        var workingRBGString = void 0;
                        if (this.customFeaturesIn.color.indexOf("rgba") > -1)
                            workingRBGString = this.customFeaturesIn.color.replace(/[rgba()" \s]/g, "");
                        else
                            workingRBGString = this.customFeaturesIn.color.replace(/[rgb()" \s]/g, "");
                        var rgbArray = workingRBGString.split(",");
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
        };
        OE_GraphicsModule.prototype._handleMapClickEvent = function (pointIn) {
            if (this.hideMapTipOnEdit || this.enableCustomFeatures) {
                if (!pointIn.graphic) {
                    //no graphic select, clear markup
                    this.app.commandRegistry.commands['StopEditingMarkup'].execute(true);
                    this.app.commandRegistry.commands["ResumeMapTips"].execute();
                    this.lastGraphicWasOE = false;
                }
                else if (pointIn.graphic.getSourceLayer().id === 'Drawings') {
                    if (this._oeIsOEMarkup(pointIn.graphic)) {
                        //oe graphic, edit and mark that OE was the last graphic edited                    
                        this.lastGraphicWasOE = true;
                        if (!this.hideMapTipOnEdit) {
                            //document.getElementById("map_graphics_layer").className["baseVal"] = "";
                            this.app.commandRegistry.commands["ResumeMapTips"].execute();
                            this.app.commandRegistry.commands['InvokeMapTip'].execute();
                        }
                        else {
                            this.app.commandRegistry.commands["HideMapTips"].execute();
                            this.app.commandRegistry.commands['EditMarkup'].execute(pointIn.graphic.geometry);
                        }
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
        OE_GraphicsModule.prototype._markupEditingStarted = function (selectedGraphic) {
            if (this._oeIsOEMarkup(selectedGraphic)) {
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
            if (this.openMarkupStyleOnEdit) {
                this.app.commandRegistry.commands["CreateMarkupStyleView"].execute();
            }
            else if (this.workflowIDRunOnEdit != null) {
                this.app.commandRegistry.commands["RunWorkflowById"].execute(this.workflowIDRunOnEdit);
            }
        };
        OE_GraphicsModule.prototype._markupEditingStopped = function (selectedGraphic) {
            //change color        
            if (this._oeIsOEMarkup(selectedGraphic)) {
                selectedGraphic.symbol.setColor(this.lastColor);
                if (selectedGraphic.symbol["outline"] != undefined && selectedGraphic.symbol["outline"] != "") {
                    selectedGraphic.symbol["outline"].setColor(this.lastColorOutline);
                }
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
