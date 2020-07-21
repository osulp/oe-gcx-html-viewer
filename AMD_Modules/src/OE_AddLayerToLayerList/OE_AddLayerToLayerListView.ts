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

    buttonCloseError(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.CloseError();
    }

    buttonCancel(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.CancelClicked();
    }

    buttonOK(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.OkClicked();

        for (var prop in context.checkedBoxMap) {
            //skip missing properties
            if (!context.checkedBoxMap.hasOwnProperty(prop))
                continue;

            //console.log(this.checkedBoxMap[prop]);
            context.checkedBoxMap[prop]["customID"] = prop;
            context.OEAddMapServiceFromGecortexLayer(context.checkedBoxMap[prop],"*");
        }

        context.CancelClicked();
    }

    public OptionsToggle(event, element, context: OE_AddLayerToLayerListViewModel) {

        let newVal: boolean = !context.oeSearchLayerOptionsVisible.get();
        context.oeSearchLayerOptionsVisible.set(newVal);
    }

    public SearchPortal(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.OESearchPortalLayers();
    }

    public TreeToggle(event, element, context: any) {
                        
        let newVal: boolean = !context.oeTreeVisible.get();
        context.oeTreeVisible.set(newVal);

        if (newVal) {
            context.oeTreeExpand.set(false);
            context.oeTreeCollapse.set(true);
        }
        else {
            context.oeTreeExpand.set(true);
            context.oeTreeCollapse.set(false);
        }        
    }

    public ToggledSelected(event, element, context: OE_AddLayerToLayerListViewModel) {

        let newVal: boolean = !context.toggleSelectedValue.get();
        context.toggleSelectedValue.set(newVal);

        if (newVal) {
            context.toggleSelectedText.set("Show All");
            this.ShowAllOrSelected(false);
        }
        else {
            context.toggleSelectedText.set("Show Selected");
            this.ShowAllOrSelected(true);
        }            
    }

    ShowAllOrSelected(showAll:boolean) {
                        
        let showAllFilter: boolean = (this.viewModel.searchFieldText.get().length > 2) ? false : true;

        if (showAll) {            
            this.viewModel.OESearchLayers(showAllFilter,false);
        }
        else {
            this.viewModel.OESearchLayers(false, true);
        }
    }
    
    public CheckboxChanged(event, element, context: any) {
        
        //var workingService: any = this.viewModel.resultsObject.getAt(context.mapServiceIndex);
        var mapKey: string = context.mapServiceConnectionString.replace("url=", "") + "/"+context.id;

        console.log(mapKey);

        if (element.checked) {                       
            this.viewModel.checkedBoxMap[mapKey] = context;
        }
        else {
            if (this.viewModel.checkedBoxMap.hasOwnProperty(mapKey)) {
                delete this.viewModel.checkedBoxMap[mapKey];
            }
        }
                
        //context.serviceURL;        
    }

    buttonClearSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ClearSearchInput();
    }

    inputDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
                
        if (event.code == "Enter") {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
        else if (element.value.toLowerCase().indexOf("http") > -1) {
            context.searchFieldText.set(element.value);
            context.ShowDirectServiceURL();
        }
        else if (element.value.length > 2) {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
        else if (element.value.length < 1) {
            context.ClearSearchInput();
        }
    }

    buttonReloadServices(event, element, context: OE_AddLayerToLayerListViewModel) {        
        //force services reload
        context.LoadRemoteServiceSources(true);
    }


    buttonDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.searchFieldText.set($("#oeLayerSearchInput").val());
        context.DoSearch();
    }

    buttonToggleSelected(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ToggleSelected();
    }

    buttonCollapseAll(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ExpandAllTrees(false);
    }

    buttonExpandAll(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ExpandAllTrees(true);
    }

    buttonTestLayer(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ResolveLayerTest();
    }

    buttonRemoveService(event, element, context: any) {
        this.viewModel.RemoveService(context);
    }

}