/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_WildfireRiskLegendViewModel } from './OE_WildfireRiskLegendViewModel';

export class OE_WildfireRiskLegendView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_WildfireRiskLegendViewModel;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    toggleWildfireLegend = function (_event: any, _element: any, _context: any) {   
        console.log('toggling!', this.viewModel);
        this.viewModel.showLegend.set(!this.viewModel.showLegend.get());
        return true;
    };
}