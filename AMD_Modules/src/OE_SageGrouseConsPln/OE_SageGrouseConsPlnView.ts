/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/jqueryui.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";

declare var require;
var myWorkflowContext;

export class OE_SageGrouseConsPlnView extends ViewBase {

    jquiSlider = HTMLElement;
    amount = HTMLElement;
    root: HTMLElement;
    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    added() {
        var thisScope = this;
        $(thisScope.amount).val("75 - 300");
        $(this.jquiSlider).slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $(thisScope.amount).val(ui.values[0] + " - " + ui.values[1]);
            },
            stop: function (event, ui) {
                console.log('now run something');
                var mService = thisScope.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon').length > 0 ? thisScope.app.site.essentialsMap.mapServices.filter((ms: any) => ms.displayName === 'HexSageCon')[0] : null;

                let layer = mService.findLayerByName('HEX_SageCon');

                //var mService = thisScope.app.site.essentialsMap.findMapServiceById('0');
                //if (mService.serviceLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer) {
                //    var tServiceLayer: esri.layers.ArcGISDynamicMapServiceLayer = mService.convertToDynamicLayers();
                //    if (!tServiceLayer.layerDefinitions)
                //        tServiceLayer.layerDefinitions = [];
                //    tServiceLayer.layerDefinitions[parseInt(layerId)] = definitionQuery;
                //    tServiceLayer.setLayerDefinitions(tServiceLayer.layerDefinitions, true)
                //    mService.refresh();
                //}
                //else if (mService.serviceLayer instanceof esri.layers.FeatureLayer) {
                //    mService.serviceLayer.setDefinitionExpression(definitionQuery);
                //    mService.refresh();
                //}
                //else
                //    throw Error("Set Layer Definition: Map service type does not support layer definitions.");
                let layerDefintion = [];
                layerDefintion[0] = "(AUSPATID IN (Select distinct AUSPATID from ElementsByHex where AU_ABUND > 4.0 AND COMNAME like 'Audobon Important Bird Area'))";
                //mService.serviceLayer.layerDefinitions[parseInt(layer.id)] = "GAP3HA > 0";

                mService.serviceLayer["setLayerDefinitions"](layerDefintion, true);
                mService.refresh();
            }
        });
    }
}