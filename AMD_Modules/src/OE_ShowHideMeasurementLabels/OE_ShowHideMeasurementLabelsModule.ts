/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";

export class OE_ShowHideMeasurementLabelsModule extends ModuleBase {

    private _markupLayerName = "Drawings_measurement";
    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);        
    }

    initialize(config: any): void {
        this.app.commandRegistry.command("ChangeTheDisplay").register(this, this.changeTheDisplay);
    }

    changeTheDisplay(theCommand): void {
        var theGraphic = getGraphicsLayer(this._markupLayerName, false, this.app);
        if (theCommand == "show") {
            theGraphic.setVisibility(true);
        }
        else {
            theGraphic.setVisibility(false);
        }
    }

}