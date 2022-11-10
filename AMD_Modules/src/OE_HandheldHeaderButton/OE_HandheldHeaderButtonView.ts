/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_HandheldHeaderButtonViewModel } from "../OE_HandheldHeaderButton/OE_HandheldHeaderButtonViewModel"

export class OE_HandheldHeaderButtonView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    buttonClicked(event, element, context) {
        this.viewModel.buttonClicked(context);
    }
}