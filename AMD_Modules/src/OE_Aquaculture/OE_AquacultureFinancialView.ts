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
        this.setSelectedSystem(null,null,this.viewModel.selected_system.get());
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(0));
        this.setUIInputs();
    }

    onDestroy() {

    }

    openTab(evt, elem, ctx) {
        //let screenOrder = !this.viewModel.show_all_tabs.get() && ctx.screen === 'Summary' ? 2 : parseInt(ctx.screenOrder) - 1;
        if (ctx) {
            let screenOrder = parseInt(ctx.screenOrder) - 1;
            this.viewModel.active_screen.set(screenOrder);
            this.viewModel.show_back_btn.set(screenOrder > 0);
            this.viewModel.show_next_btn.set(screenOrder < (this.viewModel.screens_collection_filter.length() - 1));


            this.viewModel.screens_collection.get().forEach(scr => {
                scr['screenTabClass'].set('tablinks ' + (ctx.id === scr['id'] ? 'activeTab' : 'inactiveTab'));
                scr['screenContentClass'].set('tabcontent ' + (ctx.id == scr['id'] ? 'activeScreen' : 'inactiveScreen'));
            });
            //this.setUIInputs();
            $('#modal-description').stop().animate({
                'scrollTop': $('#' + ctx.id)
            }, 800, 'swing');

            //load map if on transportation
            if (ctx.screen === 'Transportation') {
                this.renderMap();
            }
            this.viewModel.renderCharts();
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
                var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/42");
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
        //this.viewModel.workflowContext.setValue("outputVal", "finished!");
        this.viewModel.workflowContext.completeActivity();
        this.viewModel._resetDefaults();
    }

    print(event, element, context) {
        event.preventDefault();
        var html = '<!DOCTYPE html><html><head><title>FinancialPlanningPrint</title></head><body onload="window.print();window.close();">';
        html += '<style type="text/css">' +
            'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.inactiveScreen {display:none;}fieldset{position:relative;border:solid 1px grey;border-radius:4px;margin:20px 20px 0 20px}legend{padding:15px}#location-map{position:relative;width:100%;height:100%}#map-section{position:relative}#location-wrapper{position:relative}#add-location{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.9);text-align:center;vertical-align:middle;z-index:19000}#add-location-msg{position:relative;max-width:350px;top:50%;transform:translateY(-50%);margin:auto}.slider-wrapper{position:relative;text-align:center;padding:10px;max-width:245px;margin:10px 0}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all{width:5.5em;height:2em;top:43%;margin-top:-.9em;text-align:center;line-height:1.6em;text-indent:0;color:#5e737f;border-radius:10px;padding:2px;background-color:#a5c9df}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all:hover{cursor:pointer}.filter-header-wrapper{padding:5px;background-color:#f0f0f0;border-radius:4px 4px 0 0;position:relative}.filter-header-wrapper img{padding:0 10px}.filter-header-wrapper img:first-child{padding-left:2px}.filter-header-wrapper:hover{cursor:pointer}.filter-header-wrapper div{display:inline-block}.show-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-down-small-24.png);background-repeat:no-repeat}.hide-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-up-small-24.png);background-repeat:no-repeat}#filter-options-wrapper{padding:10px 0 5px 5px}#filter-type-header{padding:2px;border:solid 1px #e6e0e0;border-top:none}#filter-type-header div{display:inline-block;width:48%;text-align:center;font-size:.9em}#filter-type-header div:first-child{border-right:solid 1px #e6e0e0}#filters-wrapper div{display:inline-block;width:49%}#filters-wrapper select{font-size:.9em}#search-wrapper,.calcite{position:relative}#search{display:block;position:absolute;z-index:2;top:20px;left:74px}#home-button{position:absolute;top:95px;left:20px;z-index:50}#basemap-toggle{position:absolute;bottom:20px;right:20px;z-index:50}#basemap-toggle:hover{cursor:pointer}.basemapBG{height:50px;width:50px;border-radius:10px 10px 0 0}.basemapTitle{width:50px;font-size:.9em;text-align:center;background-color:#e6e0e0;padding:2px 0}#location-instruction{padding:10px 5px;background:#f5f5f5}.arcgisSearch .searchBtn{position:relative;z-index:2}#location-status-selected{background-color:#eef7d3;padding:10px}#selected-location-remove img{margin:0 0 -4px 5px}#selected-location-remove img:hover{cursor:pointer}#selected-location-name{text-decoration:underline}#selected-location-name:hover{cursor:pointer}.OE_Chart{min-width:300px}.screenSectionnone{display:none}h2.screen-header{margin-left:15px}.activeScreen,.activeTab{display:block}.inactiveScreen,.inactiveTab{display:none}.div-row{width:90%;margin:auto}.div-row.overview{width:100%;margin-left:-10px}.div-row.overview div.div-row-cell{width:49%;padding:0 30px 0 0}.div-row.overview .desc{height:550px;overflow:auto}.overview .input-header{font-weight:400;font-size:1.2em}.system-overview{padding:10px;border:1px solid #a7a7a7;width:95%}.img-wrapper-center{width:100%;text-align:center;margin-bottom:10px}.img-wrapper-center img{max-width:95%;max-height:200px;border:solid 1px #a7a7a7;padding:10px;border-radius:10px}.div-row.no-pad{width:100%}.div-row.no-pad div.div-row-cell:first-child{width:72%}.div-row.no-pad div.div-row-cell:last-child{width:25%}.div-row div.div-row-cell{display:inline-block;vertical-align:top;width:47%;margin:auto}.div-row div.div-row-cell fieldset{height:100%;width:100%;background:#f0f0f0;margin:auto}.div-row div.div-row-cell legend{margin:20px}.div-row-cell .desc{margin:10px 20px 10px 30px;width:100%;font-size:.9em;background:#f0f0f0;border:solid 1px #ccc;border-radius:4px;padding:20px}.notes{color:#302f2f;text-indent:each-line 10px}.table-notes{width:90%;margin:auto;font-size:.9em;color:#302f2f;text-align:right;background-color:#fff}.input-header{font-weight:700}.div-table{display:table;width:90%;background-color:beige;margin:auto}.div-table.amortization,.div-table.parameters{background-color:#f0f0f0}.div-table-row{display:table-row}.div-table-row.heading{font-weight:700}.div-table-cell{display:table-cell;padding:4px;border:solid 1px #e6e0e0}.div-table-cell:nth-child(1){width:75%}.div-table-cell:nth-child(2){width:25%}.div-table-cell:nth-child(3){width:12%}.div-table.amortization .div-table-cell{width:14.2%;text-align:center}.div-table-cell.InputCalcTotal{font-size:1.1em;font-weight:700;border-top:solid 2px #000;border-bottom:solid 2px #000}.div-table-cell.units{text-align:center}.div-table-cell.values{padding-left:10px}#system-select-wrapper{width:300px;margin:auto}.container{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container input{position:absolute;opacity:0;cursor:pointer}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;background-color:#eee;border-radius:50%}.container:hover input~.checkmark{background-color:#ccc}.container input:checked~.checkmark{background-color:#a5c9df}.checkmark:after{content:"";position:absolute;display:none}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{top:9px;left:9px;width:8px;height:8px;border-radius:50%;background:#fff}.toggle-detail-inputs div{font-size:.9em;padding:15px;color:#1a72c4}.toggle-detail-inputs div:hover{text-decoration:underline;cursor:pointer}.rdgroup{padding-left:15px}.section-desc{width:90%;margin:auto}.section-desc div{width:90%}</style>';
        html += document.getElementById('printarea').outerHTML;
        html += '</body></html>';
        let printWindow = window.open("");
        printWindow.document.write(html);
        let browser = this.detectBrowser()
        if (browser === 'IE') {
            printWindow.location.reload();
        } else {
            printWindow.print();
            printWindow.close();
        }
    }

    detectBrowser() {
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            return 'Opera';
        }
        else if (navigator.userAgent.indexOf("Chrome") != -1) {
            return 'Chrome';
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            return 'Safari';
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            return 'Firefox';
        }
        else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document['documentMode'] == true)) {
            return 'IE';
        }
        else {
            return 'unknown';
        }
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
        let updatedValue = element
            ? element.value !== context.value.get()
                ? element.value
                : context.value.get()
            : context.value.get();
        context.value.set(updatedValue);
        if (updatedValue !== this.viewModel.formatValue(updatedValue, context.decimalDisp) && updatedValue !== '<enter value>') {
            let formattedVal = this.viewModel.formatValue(updatedValue, context.decimalDisp);
            context.value.set(formattedVal);
            if (element) {
                element.value = formattedVal;
            }
        }        
        this.viewModel.updateViewModel(context);
    }

    clearVal(evt, el, context) {
        el.value = '';
        //context.value.set();
    }

    checkReset(evt, el, context) {
        console.log('test', evt, el, context);
        if (evt.key === 'Esc') {
            context.value.set(context.defaultVal);
            el.value = '';
            this.updateModel(null, el, context);
        }
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
                            thisScope.viewModel.setKendoSlider(f);
                            //let sliderID = f.fieldCalVar;
                            ////var sliderTextHandle = $("#" + sliderID + " .oe-slider-handle");
                            //var sliderTextHandle = $("#" + f.fieldHandle);

                            //sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(f.value.get().toString(), f.unit));
                            //let min = f.min ? parseFloat(f.min) : 0;
                            //let max = f.max ? parseFloat(f.max) : 100;

                            //let increment = f.increment ? parseFloat(f.increment) : 1;

                            //let value = parseFloat(f.value.get().replace(/\,/g,''));

                            //////////////////////////////////////////////////
                            //// Kendo Slider
                            //////////////////////////////////////////////////
                            //var slider = $("#" + sliderID).kendoSlider({
                            //    increaseButtonTitle: "+",
                            //    decreaseButtonTitle: "-",
                            //    min: min,
                            //    max: max,      
                            //    value: value,
                            //    smallStep: increment,
                            //    largeStep: increment * 2,
                            //    tooltip: {
                            //        enabled:false
                            //    },
                            //    tickPlacement:"none",
                            //    showButtons: true,
                            //    slide: function (slideEvt) {
                            //        sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(slideEvt.value.toString(), f.unit));
                            //    },
                            //    change: function (changeEvt) {
                            //        let newVal = changeEvt.value.toString();
                            //        sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(newVal, f.unit));
                            //        window.setTimeout(() => {
                            //            f.value.set(newVal);
                            //            thisScope.updateModel(null, null, f);
                            //        }, 50);
                            //    }
                            //}).data("kendoSlider");

                            //slider.value(parseFloat(f.value.get()));

                            ////////////////////////////////////////////////
                            // Traditional JQuery Slider
                            ////////////////////////////////////////////////
                            //$("#" + sliderID).slider({
                            //    step: increment,
                            //    min: min,
                            //    max: max,
                            //    value: parseFloat(f.value.get()),
                            //    create: function () {
                            //        sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(f.value.get(), f.unit));
                            //    },
                            //    slide: function (event, ui) {
                            //        sliderTextHandle.text(thisScope.viewModel.formatDisplayValue(ui.value.toString(), f.unit));
                            //    },
                            //    stop: function (event, ui) {
                            //        f.value.set(ui.value.toString());
                            //        thisScope.updateModel(null,null,f);
                            //    }
                            //});
                            if (reset) {
                                f.value.set(null);
                            }

                    }
                });
            });
        });
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
    

}