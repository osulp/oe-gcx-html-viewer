/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { OE_AquacultureFinancialViewModel } from './OE_AquacultureFinancialViewModel';
import { KmlService } from "geocortex/essentials/KmlService";

declare var html2canvas: any;
declare var $: any;


export class OE_AquacultureFinancialView extends ViewBase {

    app: ViewerApplication;
    viewModel: OE_AquacultureFinancialViewModel;
    sliderAnnualHarvest: any;
    sliderProductWeight: any;
    sliderPriceTarget: any;
    kChartActive: kendo.dataviz.ui.Chart;

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    activated() {        
        let thisScope = this;
        this.fitScreenHeight();        
        this.setSelectedSystem(null, null, this.viewModel.selected_system.get());
        //load map to preserve location in report if clicked without having gone to location tab.
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(0)); 

        //var kmzTest = new KmlService('https://droughtmonitor.unl.edu/data/kmz/usdm_current.kmz');
        ////this.viewModel.app.commandRegistry.command("AddMapService").execute(kmzTest);
        //this.app.command('AddMapService').execute(kmzTest);
        ////kml test
        ////buildKmlService('https://droughtmonitor.unl.edu/data/kmz/usdm_current.kmz').then()

        //window.setTimeout(() => {
        //    thisScope.openTab(null, null, thisScope.viewModel.screens_collection_filter.getAt(0));
        //    //avoid flicker of map loading
        //    window.setTimeout(() => { thisScope.viewModel.show_loading.set(false);}, 500);
            
        //}, 500);
        //this.renderMap();
        this.viewModel.selected_screen.bind(this, (screen) => {
            this.gotoTab(null, null, { screen: screen });
        });

        $(window).resize(function () {            
            thisScope.fitScreenHeight();
            thisScope.resizeMap();
        });

        $('.tooltip').on('click', (args) => {
            console.log('touchy,toucy', $(args.target));
            let isVisible = $(args.target).parent().find('.tooltiptext').css('visibility');
            console.log('visibile?', isVisible);
            if (isVisible === 'hidden') {
                $(args.target).parent().find('.tooltiptext').css({ "visibility": "visible", "opacity": "1" });
            } else {
                $(args.target).parent().find('.tooltiptext').css({ "visibility": "hidden", "opacity": "0" });
            }
        });
        this.app.registerActivityIdHandler("aquaculturePDFReportDone", (wc) => {
            //window.open(wc.getValue("report_url"), '_blank');
            thisScope.viewModel.show_loading_pdf.set(false);
            thisScope.showHideLabelsOnCharts(true);
            //check if chrome
            const a = window.document.createElement('a');
            a.href = wc.getValue("report_url");
            a.download = 'AquacultureFinanicalPlanningReport.pdf';
            a.target = '_blank';
            document.body.appendChild(a);
            // IE: "Access is denied"; 
            // see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            a.click();
            document.body.removeChild(a);
        });
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
            this.setUIInputs();
            $('#modal-description').stop().animate({
                'scrollTop': $('#' + ctx.id)
            }, 800, 'swing');

            //load map if on location screen
            if (ctx.screen === 'Location') {
                this.renderMap();
                //if (this.viewModel.has_location.get()) {
                //    this.viewModel.runRoutingServices();
                //}
            }
            if (ctx.screen === 'Financial Summary') {
                this.viewModel.renderCharts();
            }
            this.viewModel.show_summary_btn.set(this.viewModel.active_screen.get() < this.viewModel.screens_collection.length() - 1);
        }
    } 

    renderMap() {
        var thisScope = this;
        
        if (typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null) {

            this.viewModel.esriMap = new esri.Map("location-map", {
                //center: [44.17432483, -120.5859375],
                //OSU Ag Fields: -123.29560542046448, 44.56679003060179
                //Statewide: new esri.geometry.Point(-120.58, 44.17)
                center: new esri.geometry.Point(-123.29560542046448, 44.56679003060179),
                zoom: 6,
                basemap: "streets",
                minZoom: 6,
                slider: true,
                showAttribution: true,
                //autoResize: true,
                logo: false
            });


            //SEARCH
            try {

                var sources = [{
                    locator: this.viewModel.esriLocator,// this.OregonGeolocator,
                    locationType: "street",
                    singleLineFieldName: "SingleLine",
                    name: "Oregon GC_Composite",
                    placeholder: "Search",
                    highlightSymbol: this.viewModel.marker,
                    countryCode: "US",
                    suffix: ", OR",
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
                    //thisScope.viewModel.esriMap.graphics.clear();
                });

                this.viewModel.esriSearch.on('select-result', function (e) {
                    thisScope.viewModel.selected_location.set({
                        "point": new esri.geometry.Point(e.result.feature.geometry),
                        "name": e.result.name
                    });
                    thisScope.viewModel.show_site_report_url.set(false);
                });
            } catch (ex) {
                //console.log('cannot load search');
            }

            try {
                //HOME BUTTON
                this.viewModel.esriHomeBtn = new esri.dijit.HomeButton({
                    map: this.viewModel.esriMap
                }, "home-button");

                this.viewModel.esriHomeBtn.startup();
            } catch (ex) {
                //console.log('cannot load home button');
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
                //console.log('cannot load basemap toggle');
            }


            //Event handlers
            this.viewModel.esriMap.on("load", function (event: any) {
                try {
                    var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/44");
                    (<esri.Map>event.map).addLayer(featureLayer);
                    //thisScope.setInfoScreenHeight();
                    //window.setTimeout(thisScope.animateInfoScreen, 1000);
                    thisScope.resizeMap();
                    thisScope.resizeWindow();
                    if (thisScope.viewModel.has_location.get()) {
                        window.setTimeout(() => {
                            if (thisScope.viewModel.selected_location.get()) {
                                let inputPnt = thisScope.viewModel.selected_location.get().point;
                                thisScope.viewModel.esriLocator.locationToAddress(inputPnt, 100);
                                thisScope.viewModel.esriMap.centerAndZoom(inputPnt, 13);
                            }
                        }, 500);
                    }
                } catch (ex) {
                    console.log('error loading map', ex);
                }
                
            });

            this.viewModel.esriMap.on("click", function (evt) {
                //console.log('map click!', evt);
                thisScope.viewModel.esriMap.graphics.clear();               
                thisScope.viewModel.esriMap.centerAndZoom(evt.mapPoint, 13);
                thisScope.viewModel.esriLocator.locationToAddress(evt.mapPoint, 100);
                thisScope.viewModel.show_site_report_url.set(false);
                var graphic = new esri.Graphic(evt.mapPoint, thisScope.viewModel.marker);
                thisScope.viewModel.esriMap.graphics.add(graphic);       
            });
        }
        else {
            //this.viewModel.esriMap.resize();
        }
    }

    deactivated() {
        try {
            this.removeSelectedLocation();
            //this.viewModel.workflowContext.setValue("outputVal", "finished!");
            this.viewModel.workflowContext.completeActivity();
            this.viewModel._resetDefaults();
        } catch (ex) {
            //console.log('deactivated warning');
        }
        
    }

    resetValues(evt, el, ctx) {
        //let activeScreen = this.viewModel.active_screen.get();
        this.viewModel.show_loading.set(true);
        let screen = this.viewModel.screens_collection.get().filter(s => s['screenOrder'] === (this.viewModel.active_screen.get() + 1).toString())[0];
        this.viewModel._resetValues();
        this.openTab(null, null, screen);
        this.viewModel.show_loading.set(false);
    }

    print(event, element, context) {
        event.preventDefault();
        var html = '<!DOCTYPE html><html><head><title>FinancialPlanningPrint</title></head><body onload="window.print();window.close();">';
        html += '<style type="text/css">' +
            'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.inactiveScreen {display:none;}.oe_slider{display:none} fieldset{position:relative;border:solid 1px grey;border-radius:4px;margin:20px 20px 0 20px}legend{padding:15px}#location-map{position:relative;width:100%;height:100%}#map-section{position:relative}#location-wrapper{position:relative}#add-location{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.9);text-align:center;vertical-align:middle;z-index:19000}#add-location-msg{position:relative;max-width:350px;top:50%;transform:translateY(-50%);margin:auto}.slider-wrapper{position:relative;text-align:center;padding:10px;max-width:245px;margin:10px 0}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all{width:5.5em;height:2em;top:43%;margin-top:-.9em;text-align:center;line-height:1.6em;text-indent:0;color:#5e737f;border-radius:10px;padding:2px;background-color:#a5c9df}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all:hover{cursor:pointer}.filter-header-wrapper{padding:5px;background-color:#f0f0f0;border-radius:4px 4px 0 0;position:relative}.filter-header-wrapper img{padding:0 10px}.filter-header-wrapper img:first-child{padding-left:2px}.filter-header-wrapper:hover{cursor:pointer}.filter-header-wrapper div{display:inline-block}.show-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-down-small-24.png);background-repeat:no-repeat}.hide-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-up-small-24.png);background-repeat:no-repeat}#filter-options-wrapper{padding:10px 0 5px 5px}#filter-type-header{padding:2px;border:solid 1px #e6e0e0;border-top:none}#filter-type-header div{display:inline-block;width:48%;text-align:center;font-size:.9em}#filter-type-header div:first-child{border-right:solid 1px #e6e0e0}#filters-wrapper div{display:inline-block;width:49%}#filters-wrapper select{font-size:.9em}#search-wrapper,.calcite{position:relative}#search{display:block;position:absolute;z-index:2;top:20px;left:74px}#home-button{position:absolute;top:95px;left:20px;z-index:50}#basemap-toggle{position:absolute;bottom:20px;right:20px;z-index:50}#basemap-toggle:hover{cursor:pointer}.basemapBG{height:50px;width:50px;border-radius:10px 10px 0 0}.basemapTitle{width:50px;font-size:.9em;text-align:center;background-color:#e6e0e0;padding:2px 0}#location-instruction{padding:10px 5px;background:#f5f5f5}.arcgisSearch .searchBtn{position:relative;z-index:2}#location-status-selected{background-color:#eef7d3;padding:10px}#selected-location-remove img{margin:0 0 -4px 5px}#selected-location-remove img:hover{cursor:pointer}#selected-location-name{text-decoration:underline}#selected-location-name:hover{cursor:pointer}.OE_Chart{min-width:300px}.screenSectionnone{display:none}h2.screen-header{margin-left:15px}.activeScreen,.activeTab{display:block}.inactiveScreen,.inactiveTab{display:none}.div-row{width:90%;margin:auto}.div-row.overview{width:100%;margin-left:-10px}.div-row.overview div.div-row-cell{width:49%;padding:0 30px 0 0}.div-row.overview .desc{height:550px;overflow:auto}.overview .input-header{font-weight:400;font-size:1.2em}.system-overview{padding:10px;border:1px solid #a7a7a7;width:95%}.img-wrapper-center{width:100%;text-align:center;margin-bottom:10px}.img-wrapper-center img{max-width:95%;max-height:200px;border:solid 1px #a7a7a7;padding:10px;border-radius:10px}.div-row.no-pad{width:100%}.div-row.no-pad div.div-row-cell:first-child{width:72%}.div-row.no-pad div.div-row-cell:last-child{width:25%}.div-row div.div-row-cell{display:inline-block;vertical-align:top;width:47%;margin:auto}.div-row div.div-row-cell fieldset{height:100%;width:100%;background:#f0f0f0;margin:auto}.div-row div.div-row-cell legend{margin:20px}.div-row-cell .desc{margin:10px 20px 10px 30px;width:100%;font-size:.9em;background:#f0f0f0;border:solid 1px #ccc;border-radius:4px;padding:20px}.notes{color:#302f2f;text-indent:each-line 10px}.table-notes{width:90%;margin:auto;font-size:.9em;color:#302f2f;text-align:right;background-color:#fff}.input-header{font-weight:700}.div-table{display:table;width:90%;background-color:beige;margin:auto}.div-table.amortization,.div-table.parameters{background-color:#f0f0f0}.div-table-row{display:table-row}.div-table-row.heading{font-weight:700}.div-table-cell{display:table-cell;padding:4px;border:solid 1px #e6e0e0}.div-table-cell:nth-child(1){width:75%}.div-table-cell:nth-child(2){width:25%}.div-table-cell:nth-child(3){width:12%}.div-table.amortization .div-table-cell{width:14.2%;text-align:center}.div-table-cell.InputCalcTotal{font-size:1.1em;font-weight:700;border-top:solid 2px #000;border-bottom:solid 2px #000}.div-table-cell.units{text-align:center}.div-table-cell.values{padding-left:10px}#system-select-wrapper{width:300px;margin:auto}.container{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container input{position:absolute;opacity:0;cursor:pointer}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;background-color:#eee;border-radius:50%}.container:hover input~.checkmark{background-color:#ccc}.container input:checked~.checkmark{background-color:#a5c9df}.checkmark:after{content:"";position:absolute;display:none}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{top:9px;left:9px;width:8px;height:8px;border-radius:50%;background:#fff}.toggle-detail-inputs div{font-size:.9em;padding:15px;color:#1a72c4}.toggle-detail-inputs div:hover{text-decoration:underline;cursor:pointer}.rdgroup{padding-left:15px}.section-desc{width:90%;margin:auto}.section-desc div{width:90%}</style>';
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

    fitScreenHeight() {
        //adjust scroll window based on modal-container height
        let modal_height = $('.modal-container').height() - $('.modal-container-inner').height();
        if (modal_height > 0) {
            $('.panel-scroll-container').css("maxHeight", (modal_height + "px"));
        } else {
            $("#fin-pln-footer").css("display", "none");
        }
        this.viewModel.is_mobile.set($(window).width() < 850);
        //console.log('panel height: ', modal_height);
    }

    getPDFReport() {
        this.viewModel.show_report_name_input.set(false);
        this.viewModel.show_loading_pdf.set(true);        
        let currentScreen = this.viewModel.screens_collection.get()[this.viewModel.active_screen.get()];
        //clear global variable to store the chart images
        window['oe_report_charts'] = [];
        this.gotoTab(null, null, this.viewModel.screens_collection.get().filter(s => s['screen'] === "Financial Summary")[0]);
        this.showHideLabelsOnCharts(true);
        //render map if not already rendered for the 
        if (typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null) {
            this.gotoTab(null, null, this.viewModel.screens_collection.get().filter(s => s['screen'] === "Location")[0]);
        }
        let thisScope = this;
        //To pass json to workflow, you have to double quote each attribute...
        let report_data = {
            "system": this.viewModel.systems_tbl.get()
                .filter(sys => sys["selected"].get())
                .map((sys: any) => {
                    return {
                        "system": sys.systemTitle,
                        "system_img": sys.img_credit,
                        "system_img_credit": sys.img_credit,
                        "system_overview": sys.overview.replace(/\<\/p>/g, '').replace(/\<p>/g, '')
                    }
                })[0],
            "species": this.viewModel.species_tbl.get().filter(species => species.selected)[0],
            "prodMeth": this.viewModel.prod_meth_tbl.get().filter(prod => prod.selected)[0],
            "screen_data": [],
            "financial_summary": [],
            "charts": []
        }

        window.setTimeout(() => {
            thisScope.viewModel.screens_collection.get()
                .filter((screen, idx, arr) => {                   
                    return thisScope.viewModel._screenSystemFilter(screen, true)
                })
                .forEach((scr: any) => {
                scr.sections.get().forEach((sct: any) => {
                    sct.fields.get().filter(f => {
                        return thisScope.viewModel._fieldsFilter(null, f);
                    }).forEach((f: any) => {
                        if (f.uiType === "chart") {
                            thisScope.getChartAndTableAsBase64(f);
                        } else if (f.uiType !== "inputLocation") {
                            let sd: any = {
                                screen: scr.screenTitle.toUpperCase(),
                                section: sct.displayName,
                                sectionType: sct.sectionType,
                                field: f.fieldLabel,
                                fieldVal: f.formattedValue.get() === '<enter value>' ? '' : f.formattedValue.get()
                            };
                            if (['FINANCIAL SUMMARY','SUMMARY'].indexOf(sd.screen) === -1 && ['Amortization Table'].indexOf(sct.displayName) === -1) {
                                //hide financial summary since the data is processed as charts and table images
                                report_data.screen_data.push(sd);
                            } 
                            if (sct.section === "sumOverview") {
                                report_data.financial_summary.push(sd);
                            }
                        }
                    });
                });
            });
            window.setTimeout(() => {
                report_data.charts = window['oe_report_charts'];
                let sel_loc = this.viewModel.selected_location.get();
                let sel_loc_point = sel_loc.point.spatialReference.wkid !== 4326
                    ? new esri.geometry.Point(esri.geometry.webMercatorToGeographic(sel_loc.point))
                    : sel_loc.point;
                var workflowArgs: any = {};
                workflowArgs.workflowId = "Get_Financial_Planning_Report";
                workflowArgs.report_data = JSON.stringify(report_data);
                workflowArgs.report_name = thisScope.viewModel.report_name.get(),
                workflowArgs.aoi_geometry = sel_loc_point;
                workflowArgs.aoi_name = sel_loc.name;
                workflowArgs.aoi_latlong = sel_loc_point.y.toFixed(2) + ", " + sel_loc_point.x.toFixed(2);
                workflowArgs.map_extent = typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null ? new esri.geometry.Extent({
                    "xmin": -122.68, "ymin": 45.53, "xmax": -122.45, "ymax": 45.6,
                    "spatialReference": { "wkid": 4326 }
                }) : this.viewModel.esriMap.extent;
                thisScope.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                thisScope.gotoTab(null, null, currentScreen);
                
            }, 100);
        }, 750);
    }

    getChartAndTableAsBase64(f) {
        let chartTable = document.querySelectorAll("[data-table='" + f.chartID + "']");
        var clone = chartTable[0].cloneNode(true);
        $("body").append(clone);
        $(clone).css("width", "450px");
        html2canvas(clone, {
            onrendered: function (canvas) {
                let chart_info = {
                    chartName: f.chartConfig.chartName,
                    //chartConfig: f.chartConfig,
                    chartDataURI: '',
                    chartTableURI: ''
                };

                var base64FilterImg = canvas.toDataURL('image/png');//.replace(/^data:image\/(png|jpg);base64,/, "");
                chart_info.chartTableURI = base64FilterImg;
                window['oe_report_charts'].push(chart_info);
                $(clone).remove();
                //add chart data img
                let chart = $("#" + f.chartID).getKendoChart();
                chart.exportImage().done((data) => {
                    window['oe_report_charts'][window['oe_report_charts'].length - 1]['chartDataURI'] = data;//.replace(/^data:image\/(png|jpg);base64,/, "");
                    //console.log(data);
                });               
            }
        });
    }
    showPDFReportName() {
        if (this.viewModel.show_report_name_input.get()) {
            this.viewModel.show_report_name_input.set(false);
        } else {
            this.viewModel.report_number++;
            this.viewModel.report_name.set('Scenario ' + this.viewModel.report_number.toString() + ': ' + this.viewModel.selected_system_text.get());
            this.viewModel.show_report_name_input.set(true);
        }
    }

    sendFeedback() {        
        const a = window.document.createElement('a');
        a.href = 'mailto:virtualoregon.support@oregonstate.edu?subject=Aquaculture Financial Planning Tool';        
        a.target = '_top';
        document.body.appendChild(a);
        // IE: "Access is denied"; 
        // see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        a.click();
        document.body.removeChild(a);
    }

    toggleSpreadsheetInfo() {
        if (this.viewModel.show_spreadsheet_info.get()) {
            
        }

        this.viewModel.show_spreadsheet_info.set(!this.viewModel.show_spreadsheet_info.get());
    }

    resetSection(evt, elem, ctx) {
        console.log('reset section values', ctx);
        this.viewModel._resetSectionValues(ctx);
        let currentScreen = this.viewModel.screens_collection.get()[this.viewModel.active_screen.get()];
        this.gotoTab(null,null,currentScreen);
    }

    getSpreadsheet() {
        let downloadUrl = this.viewModel.selected_system.get().model_spreadsheet;
        const a = window.document.createElement('a');
        a.href = downloadUrl;
        a.download = downloadUrl.split('/')[downloadUrl.split('/').length - 1];
        a.target = '_blank';
        document.body.appendChild(a);
        // IE: "Access is denied"; 
        // see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        a.click();
        document.body.removeChild(a);
    }

    hideReportNameInput() {
        this.viewModel.show_report_name_input.set(false);
        this.viewModel.report_number--;
    }

    showHideLabelsOnCharts(show: boolean) {
        this.viewModel.screens_collection.get().forEach((scr: any) => {
            scr.sections.get().forEach((sct: any) => {
                sct.fields.get().filter(f => {
                    return this.viewModel._fieldsFilter(null, f);
                }).forEach((f: any) => {
                    if (f.uiType === "chart") {
                        let chart = $("#" + f.chartID).getKendoChart();
                        //add labels
                        chart.setOptions({
                            seriesDefaults: {
                                labels: {
                                    visible: show
                                }
                            },
                            legend: {
                                visible: show ? false : true
                            }
                        });
                        chart.refresh();
                    }
                });
            });
        });
    }

    resizeMap() {
        //Chrome fix for auto-expanding map issue
        $("#location-map").css("width", $(".calcite").width() + "px");
    }

    resizeWindow() {
        if (typeof (Event) === 'function') {
            // modern browsers
            window.dispatchEvent(new Event('resize'));
        } else {
            // for IE and other old browsers
            // causes deprecation warning on modern browsers
            var evt = window.document.createEvent('UIEvents');
            evt['initUIEvent']('resize', true, false, window, 0);
            window.dispatchEvent(evt);
        }

        this.fitScreenHeight();
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

    gotoProductionTab(evt, el, cntx) {
        let screen = this.viewModel.screens_collection.get().filter(s => s['screen'] === 'Production')[0];
        this.openTab(null, null, screen);
    }
    gotoNextScreen(evt, el, cntx) {
        let curIndx = this.viewModel.active_screen.get();
        if (curIndx === 0) {
            //update title
            //this.app.viewManager.getViewById("OE_AquacultureFinancialView").title.set("Aquaculture Financial Planning for " + this.viewModel.selected_system.get().system);
            this.viewModel.refreshScreenFilters();
        } 
        this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(curIndx + 1));
        this.viewModel.selected_screen.set(this.viewModel.screens_collection_filter.getAt(curIndx + 1).screen);
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

    updateDistance(evt, elem, ctx) {
        console.log('updating distance', ctx);
        this.viewModel.getSetValue(ctx.formula, elem.value);
    }

    runSiteReport(evt, elem, ctx) {
        this.viewModel.getSiteReport();
    }

    downloadSiteReport(evt, elem, ctx) {
        window.open(ctx.reportUrl, "_blank");
    }

    removeSelectedLocation() {
        this.viewModel.selected_location.set(null);
        this.setLocation();
        try {
            this.viewModel.esriSearch.clear();
            this.viewModel.esriMap.graphics.clear();
        } catch (ex) {
            //console.log('clear search exit');
        }
    }

    setSelectedSystem(_event, _element, context) {
        this.viewModel.setSelectedSystem(context);
        //this._setSliders();
        return true;
    }

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

    updateSlider(evt, elem, ctx) {
        this.viewModel.updateSlider(ctx);
    }

    validateTextInput(evt, elem, ctx) {
        this.viewModel.validateTextInput(evt, elem, ctx);        
    }

    checkClearTextInput(evt, elem, ctx) {
        this.viewModel.checkClearTextInput(evt, elem, ctx);        
        //return false;
    }
    setSelectedQuickstartResource(evt,el,cntx) {
        this.viewModel.setSelectedQuickstartResource(cntx.fieldName);
        return true;
    }

    closeView() {
        this.deactivated();
        this.viewModel.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureFinancialView");
    }

    gotoMapViewer() {
        window.open('https://tools.oregonexplorer.info/OE_HtmlViewer/index.html?viewer=aquaculture');
    }

    setUIInputs(reset?) {
        var thisScope = this;        
        this.viewModel.screens_collection.get().forEach((s) => {
            s['sections'].get().forEach(sct => {
                sct.fields.get().forEach(f => {
                    if ((f.show.indexOf('All') !== -1 || f.show.indexOf(this.viewModel.selected_system_text.get()) !== -1)) {
                        switch (f.uiType) {
                            case 'slider':
                                thisScope.viewModel.setKendoSlider(f);
                                if (reset) {
                                    f.value.set(null);
                                }
                                break;
                        }
                    }                    
                });
            });
        });
    }
    

}