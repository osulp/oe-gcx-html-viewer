/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
//import { SiteServiceDiscoveryProvider } from "geocortex/essentials/serviceDiscovery/SiteServiceDiscoveryProvider";

export class ImageryViewModel extends ViewModelBase {

    app: ViewerApplication;
    //ssdp: SiteServiceDiscoveryProvider;
    imageryLayers: ObservableCollection<any> = new ObservableCollection([]);
    selectedImagery1: Observable<string> = new Observable('');
    selectedImagery2: Observable<string> = new Observable('');
    prevSelectedImagery1: Observable<string> = new Observable('');
    prevSelectedImagery2: Observable<string> = new Observable('');
    lc_imagery: any;
    esriMap: esri.Map;
    swipeWidget: esri.dijit.LayerSwipe;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        var site: Site = (<any>this).app.site;

        //add dummy map to attach site 
        $('body').append('<div id="tempmap"></div>');
        let thisScope = this;

        var thisViewModel = this;

        this.app.registerActivityIdHandler("runCompareImagery", (wc) => {
            if (this.imageryLayers.get().length === 0) {
                let thisScope = this;
                this.esriMap = this.app.site.essentialsMap.getMap();
                var essentialsSite = new Site("https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/sites/lc_imagery", this.esriMap);
                dojo.connect(essentialsSite, "onInitialized", (s) => {
                    let imageryServiceList = [];
                    s.essentialsMap.mapServices.forEach(ms => {
                        let service = {
                            "displayName": ms.displayName,
                            "serviceUrl": ms.serviceUrl,
                            "imageLayer": new esri.layers.ArcGISTiledMapServiceLayer(ms.serviceUrl, {
                                visible: true,
                                id: ms.displayName
                            })
                        };
                        imageryServiceList.push(service);
                    });
                    thisScope.imageryLayers.set(imageryServiceList);
                    thisScope.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare");
                    thisScope.selectedImagery1.set(imageryServiceList[0].displayName);
                    thisScope.selectedImagery2.set(imageryServiceList[1].displayName);
                });
                essentialsSite.initialize();
            } else {
                this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewCompare");
            }
        });

        this.app.registerActivityIdHandler("runIdentifyDownloadImagery", (wc) => {
            this.app.commandRegistry.command("ActivateView").execute("OE_ImageryViewResults");
        });

        this.selectedImagery1.bind(this, (val) => {
            this.updateSwipeTool();
        });
        this.selectedImagery2.bind(this, (val) => {
            this.updateSwipeTool();
        });
    }

    updateSwipeTool() {       
        let thisScope = this;
        //get selectedLayers
        let swipeLayer1: any;
        let swipeLayer2: any;
        let prevSwipeLayer1: any;
        let prevSwipeLayer2: any;
        let swiperLeft = 600;

        this.imageryLayers.get().forEach(l => {
            if (this.selectedImagery1.get() === l.displayName) {
                swipeLayer1 = l;
            }
            if (this.selectedImagery2.get() === l.displayName) {
                swipeLayer2 = l;
            }
            if (this.prevSelectedImagery1.get() === l.displayName) {
                prevSwipeLayer1 = l;
            }
            if (this.prevSelectedImagery2.get() === l.displayName) {
                prevSwipeLayer2 = l;
            }
        });

        //update map display
        if (prevSwipeLayer1) {
            if (this.esriMap.getLayer(prevSwipeLayer1.imageLayer.id)) {
                this.esriMap.removeLayer(prevSwipeLayer1.imageLayer.id);
                //this.esriMap.getLayer(prevSwipeLayer1.imageLayer.id).hide();
            }
        }
        if (prevSwipeLayer2) {
            if (this.esriMap.getLayer(prevSwipeLayer2.imageLayer.id)) {
                this.esriMap.removeLayer(prevSwipeLayer2.imageLayer.id);
                //this.esriMap.getLayer(prevSwipeLayer2.imageLayer.id).hide();
            }
        }

        if (swipeLayer1) {
            if (this.esriMap.getLayer(swipeLayer1.imageLayer.id)) {                
                this.esriMap.getLayer(swipeLayer1.imageLayer.id).show();
            } else {
                this.esriMap.addLayer(swipeLayer1.imageLayer,10000);
            }
            this.prevSelectedImagery1.set(swipeLayer1.displayName);
        }

        if (swipeLayer2) {
            if (this.esriMap.getLayer(swipeLayer2.imageLayer.id)) {
                this.esriMap.getLayer(swipeLayer2.imageLayer.id).show();
            } else {
                this.esriMap.addLayer(swipeLayer2.imageLayer,9999);
            }
            this.prevSelectedImagery2.set(swipeLayer2.displayName);
        }
        

        if (!this.swipeWidget) {
            $("#map").append('<div id="swipeDiv"></div>');
            //var swipeContainer = document.getElementById("swipeContainer");
            //if (!swipeContainer) {
            //    swipeContainer = document.createElement("div");
            //    swipeContainer.id = "swipeContainer";
            //    var swipeDiv = document.getElementById("swipeDiv");
            //    swipeDiv.appendChild(swipeContainer);
            //}
        } else {
            swiperLeft = this.swipeWidget.left;
            this.swipeWidget.destroy();
            $("#map").append('<div id="swipeDiv"></div>');
        }

        if (this.prevSelectedImagery2.get() !== "") {
            this.swipeWidget = new esri.dijit.LayerSwipe({
                type: "vertical",  //Try switching to "scope" or "horizontal"
                map: this.esriMap,
                left: swiperLeft,
                layers: [swipeLayer1.imageLayer]
            }, "swipeDiv");
            this.swipeWidget.startup();
            window.setTimeout(() => {
                if ($(".vertical").length > 0) {
                    var observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutationRecord) {
                            if (mutationRecord.target["style"].top.indexOf('-') === -1) {
                                $(".vertical").css("top", "-" + $(".vertical")[0].clientHeight + "px");
                            }
                        });
                    });

                    var target = document.getElementsByClassName('vertical')[0];
                    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
                    $(".vertical").css("top", "-" + $(".vertical")[0].clientHeight + "px");
                }
            }, 500);
        }
    }
}