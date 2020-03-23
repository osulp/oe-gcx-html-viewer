/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_AquacultureFinancialViewModel } from './OE_AquacultureFinancialViewModel';


export class OE_AquacultureFinancialView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_AquacultureFinancialViewModel;
    sliderAnnualHarvest: any;
    sliderProductWeight: any;
    sliderPriceTarget: any;
    kChartActive: kendo.dataviz.ui.Chart;


    OregonGeolocator: esri.tasks.Locator = new esri.tasks.Locator("http://navigator.state.or.us/arcgis/rest/services/Locators/gc_Composite/GeocodeServer");
    marker: esri.symbol.PictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol({
        "height": 28,
        "width": 28,
        "url": "//js.arcgis.com/3.27/esri/dijit/Search/images/search-pointer.png"
    });

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    activated() {
        //adjust scroll window based on modal-container height
        let modal_height = $('.modal-container').height() - $('.modal-container-inner').height() + "px";
        $('.panel-scroll-container').css("maxHeight", modal_height);
        //this.toggleInfoScreen();
        //set height of aqua-financial-pln-wrapper
        //$("#aqua-financial-pln-wrapper").height(modal_height);
        //this.renderVerticalTabs();
        // Get the element with id="defaultOpen" and click on it
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(0));
        this.setUIInputs();

    }

    openTab(evt, elem, ctx) {
        //let screenOrder = !this.viewModel.show_all_tabs.get() && ctx.screen === 'Summary' ? 2 : parseInt(ctx.screenOrder) - 1;
        let screenOrder = parseInt(ctx.screenOrder) - 1;
        this.viewModel.active_screen.set(screenOrder);
        this.viewModel.show_back_btn.set(screenOrder > 0);
        this.viewModel.show_next_btn.set(screenOrder < (this.viewModel.screens_collection_filter.length() - 1));
        
        
        this.viewModel.screens_collection.get().forEach(scr => {
            scr['screenTabClass'].set('tablinks ' + (ctx.id === scr['id'] ? 'activeTab' : 'inactiveTab'));
            scr['screenContentClass'].set('tabcontent ' + (ctx.id == scr['id'] ? 'activeScreen' : 'inactiveScreen'));
        });
        this.setUIInputs();
        $('#modal-description').stop().animate({
            'scrollTop': $('#'+ctx.id)
        }, 800, 'swing');

        //load map if on transportation
        if (ctx.screen === 'Transportation') {
            this.renderMap();
        }
    } 

    renderMap() {
        var thisScope = this;
        if (typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null) {

            this.viewModel.esriMap = new esri.Map("location-map", {
                //center: [44.17432483, -120.5859375],
                center: new esri.geometry.Point(-120.58, 44.17),
                zoom: 6,
                basemap: "streets",
                minZoom: 6,
                slider: true
            });


            //SEARCH
            try {

                var sources = [{
                    locator: this.OregonGeolocator,
                    locationType: "street",
                    singleLineFieldName: "SingleLine",
                    name: "Oregon GC_Composite",
                    placeholder: "Search",
                    highlightSymbol: this.marker,
                    maxResults: 3,
                    maxSuggestions: 6,
                    enableSuggestions: true,
                    minCharacters: 1
                }];

                this.viewModel.esriSearch = new esri.dijit.Search({
                    map: this.viewModel.esriMap,
                    sources: sources,
                    showInfoWindowOnSelect: false
                }, "search");

                this.viewModel.esriSearch.startup();

                this.viewModel.esriSearch.on('search-results', function (e) {
                    thisScope.viewModel.esriMap.graphics.clear();
                });

                this.viewModel.esriSearch.on('select-result', function (e) {
                    thisScope.viewModel.selected_location.set({
                        "point": new esri.geometry.Point(e.result.feature.geometry),
                        "name": e.result.name
                    });
                });
            } catch (ex) {
                console.log('cannot load search');
            }

            try {
                //HOME BUTTON
                this.viewModel.esriHomeBtn = new esri.dijit.HomeButton({
                    map: this.viewModel.esriMap
                }, "home-button");

                this.viewModel.esriHomeBtn.startup();
            } catch (ex) {
                console.log('cannot load home button');
            }

            try {
                //BASEMAP TOGGLE
                let basemaps = {
                    "streets": {
                        "title": "Streets",
                        "thumbnailUrl": "https://js.arcgis.com/3.15/esri/images/basemap/streets.jpg"
                    },
                    "hybrid": {
                        "title": "Satellite",
                        "thumbnailUrl": "https://js.arcgis.com/3.15/esri/images/basemap/satellite.jpg"
                    }
                };

                this.viewModel.esriBasemapToggle = new esri.dijit.BasemapToggle({
                    theme: "basemapToggle",
                    map: this.viewModel.esriMap,
                    basemaps: basemaps,
                    visible: true,
                    basemap: "hybrid"
                }, "basemap-toggle");
                this.viewModel.esriBasemapToggle.startup();
            } catch (ex) {
                console.log('cannot load basemap toggle');
            }


            //Event handlers
            this.viewModel.esriMap.on("load", function (event: any) {
                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/40");
                (<esri.Map>event.map).addLayer(featureLayer);
                //thisScope.setInfoScreenHeight();
                //window.setTimeout(thisScope.animateInfoScreen, 1000);
                thisScope.resizeMap();
            });

            this.viewModel.esriLocator = new esri.tasks.Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

            //this.viewModel.esriLocator = this.OregonGeolocator;

            this.viewModel.esriLocator.on("location-to-address-complete", function (evt) {
                if (evt.address.address) {
                    var address = evt.address.address;
                    var location = esri.geometry.webMercatorUtils.geographicToWebMercator(evt.address.location);

                    thisScope.viewModel.selected_location.set({
                        "point": new esri.geometry.Point(evt.address.location),
                        "name": address.Match_addr !== "" ? address.Match_addr : address.Address
                    });

                    var graphic = new esri.Graphic(location, thisScope.marker, address);
                    thisScope.viewModel.esriMap.graphics.add(graphic);
                }
            });

            this.viewModel.esriMap.on("click", function (evt) {
                //console.log('map click!', evt);
                thisScope.viewModel.esriMap.graphics.clear();
                thisScope.viewModel.esriLocator.locationToAddress(evt.mapPoint, 100);
                thisScope.viewModel.esriMap.centerAndZoom(evt.mapPoint, 13);
            });
        }
        if (this.viewModel.has_location.get()) {
            let inputPnt = thisScope.viewModel.selected_location.get().point;
            this.viewModel.esriLocator.locationToAddress(inputPnt, 100);
            window.setTimeout(() => { thisScope.viewModel.esriMap.centerAndZoom(inputPnt, 13); }, 1000);
        }
        $(window).resize(function () {
            thisScope.resizeMap();
            //thisScope.viewModel.esriMap.reposition();
            //thisScope.viewModel.esriMap.resize();

        });
    }

    deactivated() {
        this.removeSelectedLocation();
        this.viewModel.workflowContext.setValue("outputVal", "finished!");
        this.viewModel.workflowContext.completeActivity();
        this.viewModel._resetDefaults();
    }

    resizeMap() {
        //Chrome fix for auto-expanding map issue
        $("#location-map").css("width", $(".calcite").width() + "px");
    }

    toggleInfoScreen(event, element, context) {
        context.show_info_screen.set(!context.show_info_screen.get());
        if (context.show_info_screen.get()) {
            //set the height of the info screen
            this.setInfoScreenHeight();
        }
        context.info_screen_arrow_src.set(context.info_screen_arrow_src.get() === "Resources/Images/Icons/arrow-right-small-24.png" ? "Resources/Images/Icons/arrow-down-small-24.png" : "Resources/Images/Icons/arrow-right-small-24.png");
        this.animateInfoScreen();
    }

    updateModel(event, element, context) {
        if (context.value.get() !== this.viewModel.formatValue(context.value.get(), context.decimalDisp)) {
            context.value.set(this.viewModel.formatValue(context.value.get(), context.decimalDisp));
        }
        this.viewModel.updateViewModel(context);
    }

    gotoTab(evt, el, cntx) {
        let screen = this.viewModel.screens_collection.get().filter(s => s['screen'] === cntx.screen)[0];
        //this.viewModel.show_all_tabs.set(true);
        this.openTab(null, null, screen);
    }
    gotoNextScreen(evt, el, cntx) {
        let curIndx = this.viewModel.active_screen.get();
        if (curIndx === 0) {
            //update title
            //this.app.viewManager.getViewById("OE_AquacultureFinancialView").title.set("Aquaculture Financial Planning for " + this.viewModel.selected_system.get().system);
            this.viewModel.refreshScreenFilters();
        } 
        this.viewModel.show_summary_btn.set(this.viewModel.active_screen.get() < this.viewModel.screens_collection.length() - 1);
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(curIndx + 1));
        //if (this.viewModel.active_screen.get() === 2) {
        //    this.createLineChart();
        //    //get routing on second page if selected place
        //    if (this.viewModel.has_location.get()) {
        //        this.runRoutingServices();
        //    }
        //}
    }

    gotoPrevScreen() {
        let curIndx = this.viewModel.active_screen.get();
        if (curIndx === 0) {
            this.viewModel.show_back_btn.set(false);
        }
        this.viewModel.active_screen.set(curIndx - 1);
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(curIndx - 1));
    }

    gotoSummary() {
        //get summary screen and pass to openTab function
        let summaryScreen = this.viewModel.screens_collection.getItems().filter(s => s['screen'] === "Summary")[0];
        this.openTab(null, null, summaryScreen);
    }

    

    zoomToSelectedLocation(evt, elem, ctx) {
        this.viewModel.esriMap.centerAndZoom(ctx.point, 13);
    }

    animateInfoScreen() {
        $("#info-screen-content").animate({
            opacity: "toggle",
            height: ["toggle", "swing"],
        }, 1000, function () {
            // Animation complete.
        });
    }

    setLocation() {
        this.viewModel.screens_collection.get().forEach(s => {
            s['sections'].get().forEach(sct => {
                if (sct.sectionType === 'Map') {
                    sct.show_add_location.set(false);
                }
            });
        });
    }

    removeSelectedLocation() {
        this.viewModel.selected_location.set(null);
        this.setLocation();
        try {
            this.viewModel.esriSearch.clear();
            this.viewModel.esriMap.graphics.clear();
        } catch (ex) {
            console.log('clear search exit');
        }
    }

    setSelectedSystem(_event, _element, context) {
        this.viewModel.setSelectedSystem(context);
        //this._setSliders();
        return true;
    }

    //runRoutingServices() {
    //    let mapPoint = this.viewModel.selected_location.get().point;
    //    var workflowArgs:any = {};
    //    workflowArgs.workflowId = "Routing_Services";
    //    workflowArgs.startPointIn = mapPoint.x.toString() + "," + mapPoint.y.toString();
    //    workflowArgs.runInBackground = true;
    //    this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
    //}

    setInfoScreenHeight() {
        //modal height - header - toggle
        let modalContainerHeight = $('.modal-container').height();
        let modalHeader = $('.panel-header').height();
        let toggleBar = $('#info-screen-toggle-bar').height();
        let infoScreenContentHeight = modalContainerHeight - (modalHeader + toggleBar);

        $("#info-screen-content").height(infoScreenContentHeight);
        
        //$("#info-screen-content").height(
        //    $("#aqua-financial-pln-wrapper").height()
        //    - ($("#info-screen-toggle-bar").height()
        //        + (parseInt($("#info-screen-content").css("padding-top").replace("px", "")) * 2))
        //);
    }

    //gotoNextTab(evt, el, ctx) {
    //    console.log('goto next', ctx);
    //    this.viewModel.selected_system.set(ctx.selected_system.get());
    //    //update title
    //    this.app.viewManager.getViewById("OE_AquacultureFinancialView").title.set("Aquaculture Financial Planning for " + ctx.selected_system.get().system);
    //    this.viewModel.refreshScreenFilters();
    //    //this.viewModel.screens_collection_filter.refresh();
    //    this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(1));
    //}

    toggleParameters(evt, el, ctx) {
        ctx.visible.set(!ctx.visible.get());
    }

    toggleDesc(evt, el, ctx) {
        ctx.showDesc.set(!ctx.showDesc.get());
    }

    showAllTabs() {
        //this.viewModel.show_all_tabs.set(true);
        this.viewModel.refreshScreenFilters();
    }

    hideDetailTabs() {
        //this.viewModel.show_all_tabs.set(false);
        this.viewModel.refreshScreenFilters();
    }

    toggleSystemFilters() {
        if (this.viewModel.screens_collection.get().length > 0) {
            this.viewModel.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.show_system_filters.set(!sct.show_system_filters.get());
                        sct.show_filter_class.set(sct.show_filter_class.get() === "hide-filters" ? "show-filters" : "hide-filters");
                    }
                });
            });
        }
        //this.viewModel.show_system_filters.set(!this.viewModel.show_system_filters.get());
        //this.viewModel.show_filter_class.set(this.viewModel.show_filter_class.get() === "hide-filters" ? "show-filters" : "hide-filters");
    }

    resetFilters() {
        this.viewModel.resetSystemFilters();
    }

    setSelectedQuickstartResource(evt,el,cntx) {
        this.viewModel.setSelectedQuickstartResource(cntx.fieldName);
        return true;
    }

    closeView() {
        this.viewModel.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureFinancialView");
    }

    setUIInputs(reset?) {
        var thisScope = this;
        this.viewModel.screens_collection.get().forEach((s) => {
            s['sections'].get().forEach(sct => {
                sct.fields.get().forEach(f => {
                    switch (f.uiType) {
                        case 'slider':
                            let sliderID = f.fieldCalVar;
                            var sliderTextHandle = $("#" + sliderID + " .oe-slider-handle");
                            let min = f.min ? parseFloat(f.min) : 0;
                            let max = f.max ? parseFloat(f.max) : 100;

                            let increment = f.increment ? parseFloat(f.increment) : 1;

                            ////////////////////////////////////////////////
                            // Traditional JQuery Slider
                            ////////////////////////////////////////////////
                            $("#" + sliderID).slider({
                                step: increment,
                                min: min,
                                max: max,
                                value: parseFloat(f.value.get()),
                                create: function () {
                                    sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(f.value.get(), f.unit));
                                },
                                slide: function (event, ui) {
                                    sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(ui.value.toString(), f.unit));
                                },
                                stop: function (event, ui) {
                                    f.value.set(ui.value.toString());
                                    thisScope.updateModel(null,null,f);
                                }
                            });
                            if (reset) {
                                f.value.set(null);
                            }

                    }
                })
            })
        })

    }
    //_setSliders() {

    //    let _species = this.viewModel.selected_species.get();

    //    ////////////
    //    //  Product Weight
    //    ///////////

    //    var sliderProductWeightHandle = $("#slider-product-weight .oe-slider-handle");

    //    $("#slider-product-weight").slider({
    //        step: Number(_species["weight_increment"]),
    //        min: Number(_species["weight_min"]),
    //        max: Number(_species["weight_max"]),
    //        value: _species["weight_default"],
    //        create: function () {
    //            sliderProductWeightHandle.text(_species["weight_default"].toString() + " lbs");
    //        },
    //        slide: function (event, ui) {
    //            sliderProductWeightHandle.text(ui.value.toString() + " lbs");
    //        }
    //    });

    //    sliderProductWeightHandle.text(_species["weight_default"] + " lbs");

    //    ////////////
    //    //  Price Target
    //    ///////////

    //    var sliderPriceTargetHandle = $("#slider-price-target .oe-slider-handle");

    //    $("#slider-price-target").slider({
    //        step: Number(_species["price_increment"]),
    //        min: Number(_species["price_min"]),
    //        max: Number(_species["price_max"]),
    //        value: _species["price_default"],
    //        create: function () {
    //            sliderPriceTargetHandle.text("$" + parseFloat(_species["price_default"]).toFixed(2));
    //        },
    //        slide: function (event, ui) {
    //            sliderPriceTargetHandle.text("$" + parseFloat(ui.value.toString()).toFixed(2));
    //        }
    //    });

    //    sliderPriceTargetHandle.text("$" + parseFloat(_species["price_default"]).toFixed(2));

    //    ////////////
    //    //  Annual Harvest
    //    ///////////

    //    var sliderAnnualHarvestHandle = $("#slider-annual-harvest .oe-slider-handle");

    //    $("#slider-annual-harvest").slider({
    //        step: 10,
    //        min: 10,
    //        max: 100000,
    //        value: 1000,
    //        create: function () {
    //            sliderAnnualHarvestHandle.text("1,000 lbs");
    //        },
    //        slide: function (event, ui) {
    //            sliderAnnualHarvestHandle.text(ui.value.toString() + " lbs");
    //        }
    //    });

    //    sliderAnnualHarvestHandle.text(_species["price_default"] + " lbs");

    //}

    //TEMP example
    createLineChart(): void {
        let opts:any = {
            title: {
                text: "Growth Rate \n annual %"
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                type: "line",
                style: "smooth"
            },
            series: [{
                name: "Species 1",
                data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
            }, {
                name: "Species 2",
                data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
            }, {
                name: "Species 3",
                data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
            }, {
                name: "Species 4",
                data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
            }],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: -10
            },
            categoryAxis: {
                categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
        };

        $("#OE_Chart1").kendoChart(opts);
    }

}