/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_AddLayerToLayerListViewModel } from "../OE_AddLayerToLayerList/OE_AddLayerToLayerListViewModel"

export class OE_AddLayerToLayerListView extends ViewBase {

    app: ViewerApplication;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    buttonCancel(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.CancelClicked();
    }

    buttonOK(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.OkClicked();
    }

    buttonClearSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ClearSearchInput();
    }

    inputDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {

        if (event.code == "Enter") {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
    }

    buttonDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.searchFieldText.set($("#oeLayerSearchInput").val());
        context.DoSearch();
    }

    buttonToggleSelected(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ToggleSelected();
    }
}