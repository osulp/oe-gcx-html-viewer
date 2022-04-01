/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ModuleBase } from "geocortex/framework/application/ModuleBase";
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { getMarkupFromGeometry } from "geocortex/infrastructure/GraphicUtils";
import { getGraphicsLayer } from "geocortex/infrastructure/GraphicUtils";
import { Geometry } from "geocortex/infrastructure/webMap/Geometry";
import { Workflow } from "geocortex/essentials/Workflow";
import { ActivityContext } from "geocortex/workflow/ActivityContext";
import { Observable } from "geocortex/framework/observables";

export class OE_UtilityModule extends ModuleBase {

    app: ViewerApplication;
    resultTableConfig: any;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {
        console.log('module config!', config);
        this.resultTableConfig = config.reportTableOptions !== undefined ? config.reportTableOptions : {};

        var site = (<any>this).app.site;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, this);
        }
        else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args: any) => {
                this._onSiteInitialized(args, this);
            });
        }
    }

    _onSiteInitialized(site: any, myModule: any) {

        this.app.registerActivityIdHandler("OE_Utility_IsViewActive", function CustomEventHandler(workflowContext) {

            //check for view from passed in view name (id)  "BannerView" for example
            let checkView: ViewBase = myModule.app.viewManager.getViewById(workflowContext.getValue("viewName"));

            //set the workflow out variable "isViewActive"
            if (checkView)
                workflowContext.setValue("isViewActive", checkView.isActive);
            else
                workflowContext.setValue("isViewActive", false);

            //move the workflow to the next activity
            workflowContext.completeActivity();
        });
                
        //RESULT TABLE CONFIGS
        if (this.resultTableConfig !== undefined) {
            // For result table row click zoom to point based feature and set  scale
            if (this.resultTableConfig.zoomToResultFeature !== undefined ? this.resultTableConfig.zoomToResultFeature : false) {
                console.log('result table zoom to result feature');
                this.app.eventRegistry.event("ResultsTableFeatureClickedEvent").subscribe(this, (args: any) => {
                    this.app.commandRegistry.command("PanToFeature").execute(args);
                    let thisScope = this;
                    window.setTimeout(() => {
                        //thisScope.app.commandRegistry.command("StepZoomOut").execute();
                        thisScope.app.commandRegistry.command("ZoomToScale").execute(36112);
                    }, 1500);
                });
            }

            // For result table show filter by default
            if (this.resultTableConfig.showResultTableFilter !== undefined ? this.resultTableConfig.showResultTableFilter : false) {
                this.app.eventRegistry.event("FSMCollectionAddedEvent").subscribe(this, (args: any) => {
                    if (this.resultTableConfig.featureSetID !== undefined ? this.resultTableConfig.featureSetID === args.featureSetCollectionId : false) {
                        window.setTimeout(() => {
                            $('.toggle-filter-button > button').click();
                        }, 2000);
                    }
                });
            }

            //Results table download visible set
            this.app.commandRegistry.command("ResultsTableDownloadToCSV").register(this, (args) => {
                //console.log("Try results download");
                let eArray: any = $('.ResultsRegionViewContainerView .list-menu-details');
                //console.log(eArray);
                for (let listItem of eArray) {
                    //console.log(listItem);
                    if (listItem.innerHTML.indexOf("CSV<") > -1) {
                        listItem.click();
                        break;
                    }
                }
            });

            //Results table download visible set
            this.app.commandRegistry.command("ResultsTableDownloadToXLSX").register(this, (args) => {
                //console.log("Try results download");
                let eArray: any = $('.ResultsRegionViewContainerView .list-menu-details');
                //console.log(eArray);
                for (let listItem of eArray) {
                    //console.log(listItem);
                    if (listItem.innerHTML.indexOf("XLSX<") > -1) {
                        listItem.click();
                        break;
                    }
                }
            });

            //Results table download visible set
            this.app.commandRegistry.command("ResultsTableDownloadToShapefile").register(this, (args) => {
                //console.log("Try results download");
                let eArray: any = $('.ResultsRegionViewContainerView .list-menu-details');
                //console.log(eArray);
                for (let listItem of eArray) {
                    //console.log(listItem);
                    if (listItem.innerHTML.indexOf("Shapefile<") > -1) {
                        listItem.click();
                        break;
                    }
                }
            });
        }

        
    }
}