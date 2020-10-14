/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_AddLayerToLayerListViewModel } from "../OE_AddLayerToLayerList/OE_AddLayerToLayerListViewModel"

export class OE_AddLayerToLayerListView extends ViewBase {

    app: ViewerApplication;

    fullDescription: string;
    groupIDS: string[];
        
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

        this.groupIDS = [];
        let workingUrl: string;
        
        //Add group layer service AND note group layer urls and id.   url_ID
        for (var prop in context.checkedBoxMap) {
            //skip missing properties
            if (!context.checkedBoxMap.hasOwnProperty(prop))
                continue;
            
            if (context.checkedBoxMap[prop].type == "GroupLayer") {
                                
                workingUrl = this.GetLayerURLWithoutID(context.checkedBoxMap[prop].fullURL);
                this.groupIDS.push(workingUrl + "_" + context.checkedBoxMap[prop].id);

                context.checkedBoxMap[prop]["customID"] = prop;
                context.CheckToken(context.checkedBoxMap[prop]);
            }
        }

        //Add individual layers
        for (var prop in context.checkedBoxMap) {
            //skip missing properties
            if (!context.checkedBoxMap.hasOwnProperty(prop))
                continue;

            //skip group layers
            if (context.checkedBoxMap[prop].type == "GroupLayer")
                continue;

            workingUrl = this.GetLayerURLWithoutID(context.checkedBoxMap[prop].fullURL);            

            //add individual layers
            if (!this.IsParentGroupIncluded(workingUrl, context.checkedBoxMap[prop].id)) {

                context.checkedBoxMap[prop]["customID"] = prop;
                context.CheckToken(context.checkedBoxMap[prop]);
            }            
        }

        this.app.commandRegistry.command("ActivateView").execute("LayerListView");

        context.CancelClicked();
    }

    GetLayerURLWithoutID(workingUrl:string) {        
        let workingLen: number = workingUrl.length - (workingUrl.length - workingUrl.lastIndexOf("/"));
        workingUrl = workingUrl.substr(0, workingLen);
        return workingUrl;
    }

    IsParentGroupIncluded(url:string, id:string): boolean {

        for (let i = 0; i < this.groupIDS.length; i++) {
            if (this.groupIDS[i].indexOf(url) > - 1 && this.groupIDS[i].indexOf("_"+id)) {
                return true;
            }
        }
        
        return false;
    }

    public OptionsToggle(event, element, context: OE_AddLayerToLayerListViewModel) {

        let newVal: boolean = !context.oeSearchLayerOptionsVisible.get();
        context.oeSearchLayerOptionsVisible.set(newVal);
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
                
        var mapKey: string = context.mapServiceConnectionString.replace("url=", "") + "/"+context.id;
        
        if (element.checked) {                       
            this.viewModel.checkedBoxMap[mapKey] = context;
        }
        else {
            if (this.viewModel.checkedBoxMap.hasOwnProperty(mapKey)) {
                delete this.viewModel.checkedBoxMap[mapKey];
            }
        }

        if (context.type == "GroupLayer")
        {
            if (element.checked)
                this.viewModel.CheckAllChildLayers(context, true);
            else
                this.viewModel.CheckAllChildLayers(context, false);
        }
        else
        {
            this.viewModel.CheckParentGroupLayer(context, false);            
        }
    }


    showLayerDetails(event, element, context: any) {
        
        let val: string = "<strong>" + context.displayName + "</strong><br /><a href=\"" + context.fullURL+"\" target=\"_blank\">" + context.fullURL + "</a>";
                
        $(".oeAddLayerDetailsText").html(val);
                
        if (!this.viewModel.IsDefined(context,"description")) {
            $(".oeAddLayerDetailsDesc").text("");                        
            $(".oeAddLayerDetails").css("height", "7em");
            $(".oeAddLayerDetailsDesc").css("height", "5em");
            $(".oeAddLayerDetailsDesc").css("overflow-y", "hidden");            
        }
        else {

            this.fullDescription = context.description;
            let descShort;
                        
            if (context.description.length > 250) {                
                descShort = context.description;                
                $(".oeAddLayerDetails").css("height", "17em");
                $(".oeAddLayerDetailsDesc").css("height", "11em");
                $(".oeAddLayerDetailsDesc").css("overflow-y", "scroll");
            }            
            else {
                descShort = context.description;

                if (context.description.length < 50)
                    $(".oeAddLayerDetails").css("height", "7em");
                else
                    $(".oeAddLayerDetails").css("height", "11em");

                $(".oeAddLayerDetailsDesc").css("height", "5em");
                $(".oeAddLayerDetailsDesc").css("overflow-y", "hidden");
            }

            $(".oeAddLayerDetailsDesc").text(descShort);
        }
        
        this.viewModel.layerDetailsVisible.set(true);
    }
        
    hideLayerDetails(event, element, context: any) {
        this.viewModel.layerDetailsVisible.set(false);
        $(".oeAddLayerDetailsText").text("");
        $(".oeAddLayerDetailsDesc").text("");
    }
    
    loadSourceURL(event, element, context: any) {
        window.open(context.fullURL, "_blank");
    }

    buttonClearSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.ClearSearchInput();
    }

    inputDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
                
        if (event.code == "Enter") {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
        else if (context.isStringAurl(element.value.toLowerCase())) {
            //no auto search or adding of urls, requires manual dosearch request
        }
        else if (element.value.length > 2) {
            context.searchFieldText.set(element.value);
            context.DoSearch();
        }
        else if (element.value.length < 1) {
            context.ClearSearchInput();
        }
    }

    OpenHelp() {

        let valTitle: string = "<strong>Help</strong>";
       
        $(".oeAddLayerDetailsText").html(valTitle);

        $(".oeAddLayerDetails").css("height", "15em");
        $(".oeAddLayerDetailsDesc").css("height", "11em");
        $(".oeAddLayerDetailsDesc").css("overflow-y", "scroll");

        let valDesc = "To add external layer, enter service url. Example: <br />https://lib-gis2.library.oregonstate.edu/arcgis/rest/services/animals_plants/Oregon2020/MapServer<br /><br />";
        valDesc += "External layers must be added with https."

        $(".oeAddLayerDetailsDesc").html(valDesc);
        
        this.viewModel.layerDetailsVisible.set(true);
    }

    buttonReloadServices(event, element, context: OE_AddLayerToLayerListViewModel) {        
        //force services reload
        context.LoadRemoteServiceSources(true);
        context.LoadRemoteSingleURLS(true);
    }
    
    buttonDoSearch(event, element, context: OE_AddLayerToLayerListViewModel) {
        context.searchFieldText.set($("#oeLayerSearchInput").val().toString());
        context.DoSearch();
    }

    buttonToggleLive(event, element, context: OE_AddLayerToLayerListViewModel) {
        
        let newVal: boolean = !context.toggleLiveValue.get();
        context.toggleLiveValue.set(newVal);
                
        if (newVal) {
            context.toggleLiveText.set("Show All");
            context.ToggleLiveLayers();
        }
        else {
            context.toggleLiveText.set("Show Live");
            this.ShowAllOrSelected(true);
        }
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
    
    buttonRemoveService(event, element, context: any) {
        this.viewModel.RemoveService(context);
    }

}