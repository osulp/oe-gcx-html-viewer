/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_HopscotchViewModel } from "../OE_Hopscotch/OE_HopscotchViewModel";

export class OE_HopscotchView extends ViewBase {

    app: ViewerApplication;
    hopscotch;
    canShowTour: boolean;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }
    
    /*buttonClearSearch(event, element, context: OE_HopscotchViewModel) {
        context.ClearSearchInput();
    }

    inputDoSearch(event, element, context: OE_HopscotchViewModel) {

        if (event.code == "Enter") {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
    }

    buttonDoSearch(event, element, context: OE_HopscotchViewModel) {
        context.searchFieldText.set($("#oeLayerSearchInput").val());
        context.DoSearch();
    }

    buttonToggleSelected(event, element, context: OE_HopscotchViewModel) {
        context.ToggleSelected();
    }*/        
}