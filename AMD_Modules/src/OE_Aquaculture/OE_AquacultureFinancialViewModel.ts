/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { FilterableCollection } from "geocortex/framework-ui/FilterableCollection";
import { Site } from "geocortex/essentials/Site";
//import { OE_Charts } from "../OE_Aquaculture/OE_Charts";

export class OE_AquacultureFinancialViewModel extends ViewModelBase {

    app: ViewerApplication;
    workflowContext: any;
    moduleJsonConfig: any;
    //History cache
    selection_cache: ObservableCollection<string> = new ObservableCollection([]);

    //SPECIES
    species_tbl: ObservableCollection<any> = new ObservableCollection([]);
    species_tbl_filter: FilterableCollection<any>;
    selected_species: Observable<any> = new Observable({});
    selected_species_label: Observable<string> = new Observable('');
    selected_species_filter: Observable<string> = new Observable('<--');
    //PRODUCTION METHODS
    prod_meth_tbl: ObservableCollection<any> = new ObservableCollection([]);
    selected_prod_meth_filter: Observable<string> = new Observable('<--');
    selected_prod_meth: Observable<any> = new Observable({});
    selected_prod_meth_label: Observable<string> = new Observable('');
    prod_meth_tbl_filter: FilterableCollection<any>;
    //SYSTEMS (Species and Production Method)
    systems_tbl: ObservableCollection<string> = new ObservableCollection([]);
    selected_system: Observable<any> = new Observable({});
    selected_system_text: Observable<string> = new Observable('');
    systems_tbl_filter: FilterableCollection<any>;
    show_no_systems_in_filtered_view: Observable<boolean> = new Observable(false);
    //SCREEN CONFIG
    screens_collection: ObservableCollection<string> = new ObservableCollection([]);
    screens_collection_filter: FilterableCollection<any>;
    //OTHER INPUT PARAMS
    show_other_input_params_1: Observable<boolean> = new Observable(false);
    //SELECTED LOCATION
    has_location: Observable<boolean> = new Observable(false);
    selected_location: Observable<any> = new Observable();
    //MAP COMPONENTS
    esriMap: esri.Map;
    esriSearch: esri.dijit.Search;
    esriLocator: esri.tasks.Locator;
    esriHomeBtn: esri.dijit.HomeButton;
    esriBasemapToggle: esri.dijit.BasemapToggle;
    //INFO SCREEN
    info_screen_arrow_src: Observable<string> = new Observable("Resources/Images/Icons/arrow-right-small-24.png");
    show_info_screen: Observable<boolean> = new Observable(false);
    //INPUT SCREENS
    active_screen: Observable<number> = new Observable(0);
    //PAGER_NAV
    show_next_btn: Observable<boolean> = new Observable(true);
    show_back_btn: Observable<boolean> = new Observable(false);
    //ROUTES
    sub_station_routes: ObservableCollection<any> = new ObservableCollection([]);
    //AMORTIZATION
    amortization_tbl: ObservableCollection<any> = new ObservableCollection([]);
    //Summary Button
    show_summary_btn: Observable<boolean> = new Observable(false);

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.screens_collection_filter = new FilterableCollection<any>(this.screens_collection, this._screensFilter.bind(this, this));
        this.selected_location.bind(this, (selLoc) => {
            if (selLoc ? selLoc.name !== 'User click' : false) {
                this.screens_collection.get().forEach(scr => {
                    scr['sections'].get().forEach(sec => {
                        sec['fields'].get().forEach(f => {
                            if (f['fieldCalVar'] === 'facilityLocation') {
                                f.value.set(selLoc.name + "<br>Lat: " + selLoc.point.y.toFixed(2) + " Long: " + selLoc.point.x.toFixed(2));
                                if (this.has_location.get()) {
                                    this.runRoutingServices();
                                }
                            }
                        });
                    });
                });
            }
        });

        this.selected_system.bind(this, (sys) => {
            this.selected_system_text.set(sys.system ? sys.system : sys);
            let _species = [];
            this.species_tbl.get().forEach(species => {
                let isSelected = sys.species === species.species;
                species.selected = isSelected; //.set(isSelected);
                _species.push(species);
            });
            this.species_tbl.set(_species);
            //this.species_tbl_filter.refresh();
            let _prod = [];
            this.prod_meth_tbl.get().forEach(prod_meth => {
                prod_meth.selected = sys.production_method === prod_meth.production_method;
                _prod.push(prod_meth);
            })
            this.prod_meth_tbl.set(_prod);
        });

        this.species_tbl_filter = new FilterableCollection<any>(this.species_tbl, this._selectedFilter.bind(this, this));
        this.prod_meth_tbl_filter = new FilterableCollection<any>(this.prod_meth_tbl, this._selectedFilter.bind(this, this));

        this.selected_prod_meth_filter.bind(this, (selProdMeth) => {
            this._refreshSystemsDisplay();
        });

        this.selected_species_filter.bind(this, (selSpecies) => {
            this._refreshSystemsDisplay();
        });

        this.systems_tbl_filter = new FilterableCollection<any>(this.systems_tbl, this._systemsFilters.bind(this, this));
    }

    initialize(config: any): void {
        var site: Site = (<any>this).app.site;

        var thisViewModel = this;

        if (site && site.isInitialized) {
            this._onSiteInitialized(site, thisViewModel, config);
        } else {
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(args, thisViewModel, config);
            });
        }

        this.app.registerActivityIdHandler("runFinancialPlnModule", (wc, cf) => {
            this.has_location.set(wc.getValue("location") ? true : false);

            this.workflowContext = $.extend({}, wc);

            this.setScreens(wc);

            this.setSpecies(wc);

            this.setProdMethods(wc);

            this.setSystems(wc);

            this.app.commandRegistry.command("ActivateView").execute("OE_AquacultureFinancialView");
        });

        this.app.registerActivityIdHandler("onRoutingServicesComplete", (wc, df) => {
            
            let routes = wc.getValue("RouteEndPoints").features.map((ri: any) => {
                return {
                    "distance": ri.attributes.distance,
                    "name": ri.attributes.NAME,
                    "city": ri.attributes.CITY,
                    "county": ri.attributes.COUNTY
                };
            });
            if (routes.length > 0) {
                this.screens_collection.get().forEach(scr => {
                    scr['sections'].get().forEach(sec => {
                        sec['fields'].get().forEach(f => {
                            if (f['fieldCalVar'] === 'feedLocation') {
                                f.value.set(routes.length > 0 ? routes[0].name + ': ' + routes[0].distance + ' miles <br> City: ' + routes[0].city : 'None found');
                            }
                            if (f['fieldCalVar'] === 'seedLocation') {
                                f.value.set(routes.length > 1 ? routes[1].name + ': ' + routes[1].distance + ' miles <br> City: ' + routes[1].city : 'None found');
                            }
                            if (f['fieldCalVar'] === 'marketLocation') {
                                f.value.set(routes.length > 2 ? routes[2].name + ': ' + routes[2].distance + ' miles <br> City: ' + routes[2].city : 'None found');
                            }
                            if (f['fieldCalVar'] === 'feedDistance') {
                                f.value.set(routes.length > 0 ? routes[0].distance.toString() : 0);
                                this.updateViewModel(f);
                            }
                            if (f['fieldCalVar'] === 'seedDistance') {
                                f.value.set(routes.length > 0 ? routes[1].distance.toString() : 0);
                                this.updateViewModel(f);
                            }
                            if (f['fieldCalVar'] === 'marketDistance') {
                                f.value.set(routes.length > 0 ? routes[2].distance.toString() : 0);
                                this.updateViewModel(f);
                            }
                        });
                    });
                });
            }
            //this.sub_station_routes.set(routes);
        });

        //$(document).bind("kendo:skinChange", this.renderCharts());
    }

    setSystems(wc) {
        //create the object array for summary data
        let defaultSystem;
        let systems = wc.getValue("systems").features ? wc.getValue("systems").features
            .filter(f => f.attributes.System !== 'All')
            .map((feat) => {
                let sys =
                {
                    "production_method": feat.attributes.ProductionMethod,
                    "species": feat.attributes.Species,
                    "system": feat.attributes.System,
                    "systemid": feat.attributes.System.replace(/\ /g, "").replace(/\:/g, "_"),
                    "selected": new Observable<boolean>(feat.attributes.Default === "True"),
                    "overview": feat.attributes.Overview,
                    "img_src": feat.attributes.ImagePath,
                    "img_credit": feat.attributes.ImageCredit
                };
                if (feat.attributes.Default === 'True') {
                    defaultSystem = sys;
                }
                return sys;
            }) : [];

        this.systems_tbl.set(systems);

        this.setSelectedSystem(defaultSystem);
    }

    setSpecies(wc) {
        let defaultSelect = "<-- All -->";

        let speciesSelected = false; // new Observable<boolean>(false);

        let species = wc.getValue("species").features ?
            wc.getValue("species").features
                .filter(f => f.attributes.Species !== 'All')
                .map((feat, idx) => {
                    return {
                        "species": feat.attributes.Species,
                        "show": true,
                        "production_methods": this.systems_tbl.get()
                            .map((sxs: any) => {
                            if (sxs.species === feat.attributes.Species) {
                                return sxs.ProductionMethods
                            }
                        }).toString(),
                        "type": feat.attributes.Type,
                        "weight_min": feat.attributes.WeightMin,
                        "weight_max": feat.attributes.WeightMax,
                        "weight_default": feat.attributes.WeightDefault,
                        "weight_increment": feat.attributes.WeightIncrement,
                        "price_min": feat.attributes.PriceMin,
                        "price_max": feat.attributes.PriceMax,
                        "price_default": feat.attributes.PriceDefault,
                        "price_increment": feat.attributes.PriceIncrement,
                        "selected": speciesSelected,
                        "overview": feat.attributes.Overview,
                        "img_src": feat.attributes.ImagePath,
                        "img_credit": feat.attributes.ImageCredit
                    }
                })
            : [];

        species.splice(0, 0, { "species": defaultSelect, "type": "placeholder", "show": true, "production_methods": "*", "selected": speciesSelected });

        this.species_tbl.set(species);
        //this.selected_species_filter

        //if (this.screens_collection.get().length > 0) {
        //    this.screens_collection.getItems().forEach(s => {
        //        s['sections'].get().forEach(sct => {
        //            if (sct.sectionType === 'Select System') {
        //                sct.species_tbl.set(species);
        //                sct.selected_species.set(defaultSelect);
        //                sct.selected_species_filter.bind(this, (selSpecies) => {
        //                    this._refreshSystemsDisplay();
        //                });
        //            }
        //        });
        //    });
        //}
    }

    setProdMethods(wc) {
        let defaultSelect = "<-- All -->";
        let prodSelected = false; // new Observable<boolean>(false);
        let prod_meths = wc.getValue("prodMethods").features
            ? wc.getValue("prodMethods").features
                .filter(f => f.attributes.ProductionMethod !== 'All')
                .map((feat) => {
                    return {
                        "production_method": feat.attributes.ProductionMethod,
                        "species": this.systems_tbl.get()
                            .map((sxs: any) => {
                                if (sxs.production_method === feat.attributes.ProductionMethod) {
                                    return sxs.species
                                }
                            }).toString(),
                        "show": true,
                        "selected": prodSelected,
                        "overview": feat.attributes.Overview,
                        "img_src": feat.attributes.ImagePath,
                        "img_credit": feat.attributes.ImageCredit
                    }
                })
            : [];

        prod_meths.splice(0, 0, { "production_method": defaultSelect, "type": "placeholder", "species": "*", "show": true, "selected":prodSelected });

        this.prod_meth_tbl.set(prod_meths);
        //this.selected_prod_meth.set(defautlSelect);

        //if (this.screens_collection.get().length > 0) {
        //    this.screens_collection.getItems().forEach(s => {
        //        s['sections'].get().forEach(sct => {
        //            if (sct.sectionType === 'Select System') {
        //                sct.prod_meth_tbl.set(prod_meths);
        //                sct.selected_prod_meth.set(defaultSelect);
        //                sct.selected_prod_meth_filter.bind(this, (selProdMeth) => {
        //                    this._refreshSystemsDisplay();
        //                });
        //            }
        //        });
        //    });
        //}
    }

    setScreens(wc) {
        //////////
        // Screen Config
        // Create obj of screens and fields to display
        // Screens -> sections -> fields heirarchy
        //////////////

        let _screens = wc.getValue('screens').features
            ? wc.getValue('screens').features
                .map(s => {
                    let sAttr = s.attributes;
                    let returnObj =
                    {
                        screen: sAttr.Screen,
                        screenTitle: sAttr.ScreenTitle,
                        subTitle: sAttr.SubTitle,
                        selectedSystem: this.selected_system_text,
                        show_select_system: parseInt(sAttr.Order) > 2,
                        screenOrder: sAttr.Order,
                        id: 'screen' + sAttr.Order,
                        tabId: sAttr.Order === '1' ? 'defaultOpen' : 'screen' + sAttr.Order,
                        sections: new ObservableCollection<any>(),
                        selected: new Observable<boolean>(false),
                        showAdvOnly: sAttr.AdvancedOnly,
                        screenContentClass: new Observable<any>('tabcontent'),
                        screenTabClass: new Observable<any>('tablinks')
                    };
                    returnObj['summary_sections'] = new FilterableCollection<any>(returnObj.sections, this._summarySectionsFilter.bind(this, this));
                    return returnObj;
                })
            : [];

        var _screenSectionsInput = wc.getValue('screenSections').features ? wc.getValue('screenSections').features : [];

        let _chartConfigs = wc.getValue('charts').features ? wc.getValue('charts').features : [];

        let _growthRates = wc.getValue('growthRates').features ? wc.getValue('growthRates').features : [];

        let _screenConfig = [];

        if (wc.getValue("screenConfig").features) {
            let scrCnfFeat = wc.getValue("screenConfig").features;

            _screens.forEach((scr) => {
                let _screenSections = _screenSectionsInput.filter(s => s.attributes.Screen === scr.screen)
                    .map(ss => {
                        let ssAttr = ss.attributes;
                        let returnSectionInfo = {
                            section: ssAttr.SectionID,
                            displayName: ssAttr.DisplayName,
                            screen: ssAttr.Screen,
                            sectionType: ssAttr.SectionType,
                            sectionDesc: ssAttr.SectionDesc,
                            displayClass: 'screenSection' + ssAttr.Display,
                            fields: new ObservableCollection<any>([]),
                            visible: new Observable<boolean>(true)
                        };
                        returnSectionInfo['fields_filter'] = new FilterableCollection<any>(returnSectionInfo['fields'], this._fieldsFilter.bind(this, this));

                        switch (ssAttr.SectionType) {
                            case 'Resources':
                                let selected_qs_resource = new Observable<any>('');
                                selected_qs_resource.bind(this, (val) => {
                                    this.setSelectedQuickstartResource(val);
                                });
                                returnSectionInfo['selected_qs_resource'] = selected_qs_resource;
                                if (ssAttr.SectionID === 'resourceIntro') {
                                    returnSectionInfo['field_categories'] = new ObservableCollection<any>([]);
                                }
                            case 'Map':
                                returnSectionInfo['selected_location'] = new Observable<any>('');
                                returnSectionInfo['show_add_location'] = new Observable<boolean>(true);
                                returnSectionInfo['show_selected_location'] = new Observable<boolean>(false);
                                break;
                            case 'Select System':
                                returnSectionInfo['show_filter_class'] = new Observable<any>('show-filters');
                                returnSectionInfo['show_system_filters'] = new Observable<boolean>(false);
                                returnSectionInfo['species_tbl'] = this.species_tbl; 
                                returnSectionInfo['species_tbl_filter'] = this.species_tbl_filter;
                                returnSectionInfo['selected_species'] = this.selected_species;
                                //returnSectionInfo['selected_species_label'] = this.selected_species_label;
                                returnSectionInfo['selected_species_filter'] = this.selected_species_filter;
                                returnSectionInfo['prod_meth_tbl'] = this.prod_meth_tbl; 
                                returnSectionInfo['prod_meth_tbl_filter'] = this.prod_meth_tbl_filter;
                                returnSectionInfo['selected_prod_meth'] = this.selected_prod_meth;
                                //returnSectionInfo['selected_prod_meth_label'] = this.selected_prod_meth_label;
                                returnSectionInfo['selected_prod_meth_filter'] = this.selected_prod_meth_filter; 
                                returnSectionInfo['selected_system'] = this.selected_system;
                                returnSectionInfo['systems_tbl'] = this.systems_tbl;
                                returnSectionInfo['systems_tbl_filter'] = this.systems_tbl_filter;
                                returnSectionInfo['show_no_systems_in_filtered_view'] = new Observable<boolean>(false);
                                returnSectionInfo['show_other_input_params_1'] = this.show_other_input_params_1;
                                break;
                            case 'Summary Table':
                                returnSectionInfo['summary_table'] = this.screens_collection;
                                break;
                            case 'AmortizationTable':
                                returnSectionInfo['amortization_table'] = this.amortization_tbl;
                                break;
                            default:
                                break;
                        }

                        let _screenSectionFields = scrCnfFeat.filter(f => f.attributes.Section === ssAttr.SectionID)
                            .map(sf => {
                                let thisScope = this;
                                const att = sf.attributes;
let value = this.formatValue(att.Default, att.Decimal)
                                let fieldValue;
                                fieldValue = new Observable<any>(value);
                                //switch (att.fieldCalVar) {
                                //    case 'facilityLocation':
                                //        fieldValue = this.selected_location_desc;
                                //        break;
                                //    case '_speciedLocation':
                                //        fieldValue = this.seedLocation;
                                //        break;
                                //    case 'feedLocation':
                                //        fieldValue = this.feedLocation;
                                //        break;
                                //    case 'marketLocation':
                                //        fieldValue = this.marketLocation;
                                //        break;
                                //    default:
                                //        fieldValue = new Observable<any>(value);
                                //        break;
                                //}
                                let fieldDisplayValue = new Observable<any>(this.formatDisplayValue(value, att.Unit));
                                

                                let returnVal =
                                {
                                    fieldName: att.Field,
                                    fieldCalVar: att.FieldCalVar,
                                    fieldCat: att.FieldCategory,
                                    fieldLabel: att.FieldLabel,
                                    uiType: att.UiType,
                                    unit: att.Unit,
                                    defaultVal: att.Default,
                                    increment: att.Increment,
                                    value: fieldValue,
                                    formattedValue: fieldDisplayValue,
                                    min: att.Min,
                                    max: att.Max,
                                    decimalDisp: att.Decimal,
                                    show: att.Show.split(';'),
                                    formula: att.Formula,
                                    desc: att.Description,
                                    notes: att.Notes,
                                    showDesc: new Observable<boolean>(true),
                                    visible: new Observable<boolean>(att.Field === 'Total Land'),
                                    tableDisplayClass: 'div-table-cell ' + att.FieldCategory
                                };
                                //add chart config if applicable
                                if (att.ChartConfig !== '') {
                                    //lookup chart config values and render?
                                    let _chartConfig = _chartConfigs.filter(f => f.attributes.ChartID === att.ChartConfig)[0];
                                    returnVal['chartConfig'] = {
                                        chartID: _chartConfig.attributes.ChartID,
                                        chartName: _chartConfig.attributes.ChartName,
                                        chartType: _chartConfig.attributes.Type,
                                        chartSeries: JSON.parse(_chartConfig.attributes.Series)
                                    };
                                }
                                if (att.FieldCategory === 'LookupTable') {
                                    let lutName = att.Formula.split('lut:')[1].split('>')[0];
                                    let lutField = att.Formula.split('>')[1].split('{')[0];
                                    let lutFieldLookup = att.Formula.indexOf('{') !== -1 ? att.Formula.split('{')[1].split('}')[0] : null;
                                    let lut;
                                    switch (lutName) {
                                        case 'growthRate':
                                            lut = _growthRates;
                                            let harvestWeights = _growthRates.filter(gr =>
                                                this.selected_species.get() === gr.attributes.Species
                                            ).map(gr => {
                                                return {
                                                    option: gr.attributes['Market Weight'],
                                                    value: gr.attributes['Months to Harvest']
                                                }
                                            });
                                            returnVal['ddOptions'] = harvestWeights;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                fieldValue.bind(returnVal, (val) => {
                                    returnVal.formattedValue.set(thisScope.formatDisplayValue(val, returnVal.unit));
                                });
                                return returnVal;
                            });

                        returnSectionInfo.fields.set(_screenSectionFields);
                        ////Quickstart only sort fields for resource vs goal
                        //if (returnSectionInfo.section === 'resourceIntro') {
                        //    let categories = _screenSectionFields.map(f => f.fieldCat)
                        //        .filter((v, idx, self) => self.indexOf(v) === idx);
                        //    var field_categories = [];
                        //    categories.forEach(c => {
                        //        let catFields = _screenSectionFields.filter(sf => sf.fieldCat === c);
                        //        let cat = {
                        //            category: c,
                        //            fields: new ObservableCollection<any>(catFields)
                        //        }
                        //        field_categories.push(cat);
                        //    });
                        //    returnSectionInfo['field_categories'].set(field_categories);
                        //}
                        return returnSectionInfo;
                    });
                scr.sections.set(_screenSections);
            });
            this.screens_collection.set(_screens);
        }

        if (this.has_location.get()) {
            this.selected_location.set({ "point": wc.getValue("location"), "name": "User click" });
        }

        this._setScreenSectionBindings();
        this.calculateAmortization();
        //this.renderCharts();
    }

    renderCharts() {
        this.screens_collection.get().forEach(scr => {
            scr['sections'].get().forEach(sct => {
                sct['fields'].get().forEach(f => {
                    if (f.chartConfig) {
                        //update with model values
                        f.chartConfig.chartSeries[0].data.forEach(d => {
                            let value = this.getValue(d.fieldCalVar);
                            d.value = parseInt(value.replace(/\,/g,''));
                        });
                        let opts = {
                            legend: {
                                visible: true
                            },
                            chartArea: {
                                background: ""
                            },
                            seriesDefaults: {
                                labels: {
                                    visible: true,
                                    background: "transparent",
                                    template: "#= category #: #= kendo.format('{0:P0}', percentage)# \n #= kendo.format('{0:c0}',value)#"
                                }
                            },
                            series: f.chartConfig.chartSeries,
                            tooltip: {
                                visible: true,
                                format: "{0:c0}"
                            }
                        };
                        $("#"+f.chartConfig.chartID).kendoChart(opts);
                    }
                });
            });
        });
    }

    getValue(fieldCalVar) {
        let returnVal = null;
        this.screens_collection.get().forEach(scr => {
            scr['sections'].get().forEach(sct => {
                sct['fields'].get().forEach(f => {
                    if (f.fieldCalVar === fieldCalVar) {
                        returnVal = f.value.get();
                    }
                });
            });
        });
        return returnVal;
    }

    calculateAmortization() {
        //pull out loan amount, interest rate, term


        //Calculate your monthly payment(p) using your principal balance or total loan amount(a), periodic interest rate(r), which is your annual rate divided by the number of payment periods, and your total number of payment periods(n): 3

        //Formula: a / { [(1 + r) ^ n]-1 } / [r(1 + r) ^ n]=p

        //Assume you borrow $100, 000 at 6 % for 30 years to be repaid monthly.To calculate the monthly payment, convert percentages to decimal format, then follow the formula:

        //a: 100, 000, the amount of the loan
        //r: 0.005(6 % annual rate—expressed as 0.06—divided by 12 monthly payments per year)
        //n: 360(12 monthly payments per year times 30 years)
        //Calculation: 100, 000 / { [(1 + 0.005) ^ 360]-1 } / [0.005(1 + 0.005) ^ 360]=599.55, or 100, 000 / 166.7916=599.55


        let loanAmt; 
        let intRate; 
        let term;
        let frequency = 1; //monthly vs yearly
        let totInterest = 0;
        let amortTbl = [{
            paymentNumber: "Number",
            prevBalance: "Prev Balance",
            payment: "Payment",
            interest: "Payment (Interest)",
            principal: "Payment (Principal)",
            newBalance: "Balance",
            totInterest: "Total Interest Paid",
            class: "div-table-row heading"
        }];
        this.screens_collection.get().forEach(scr => {
            scr['sections'].get().forEach(sct => {
                sct['fields'].get().forEach(f => {
                    switch (f.fieldCalVar) {
                        case 'loanAmountReq':
                            loanAmt = parseFloat(f.value.get().replace(/\,/g, ''));
                            break;
                        case 'loanIntRate':
                            intRate = parseFloat(f.value.get());
                            break;
                        case 'termOfLoan':
                            term = parseInt(f.value.get());
                            break;
                    }
                });
            });
        });
        let freqRate = intRate / frequency;
        let numPayments = frequency * term;
        let formulaDenom = Math.pow((1+freqRate), numPayments);
        let regularPayment = loanAmt / ((formulaDenom - 1) / (freqRate * (formulaDenom)));
        this.setAnnualLoanPayment(regularPayment, frequency);

        for (var x = 0; x < numPayments; x++) {
            let paymentInterest = loanAmt * freqRate;
            let paymentPrincipal = regularPayment - paymentInterest;
            totInterest += paymentInterest;
            let paymentInfo = {
                paymentNumber: (x + 1).toString(),
                prevBalance: this.formatDisplayValue(this.formatValue(loanAmt,0),'$'),
                payment: this.formatDisplayValue(this.formatValue(regularPayment, 0), '$'),
                interest: this.formatDisplayValue(this.formatValue(paymentInterest, 0), '$'),
                principal: this.formatDisplayValue(this.formatValue(paymentPrincipal, 0), '$'),
                newBalance: this.formatDisplayValue(this.formatValue(loanAmt - paymentPrincipal, 0), '$'),
                totInterest: this.formatDisplayValue(this.formatValue(totInterest, 0), '$'),
                class: 'div-table-row'
            };
            
            amortTbl.push(paymentInfo);
            loanAmt = loanAmt - paymentPrincipal;
        }
        this.amortization_tbl.set(amortTbl);
        this.amortization_tbl.pulse();
    }

    setAnnualLoanPayment(regPayment,freq) {
        this.screens_collection.get().forEach(scr => {
            scr['sections'].get().forEach(sct => {
                sct['fields'].get().forEach(f => {
                    if (f.fieldCalVar === 'annualLoanPayment') {
                        f.value.set(this.formatValue((regPayment * freq), 0));
                        this.updateViewModel(f);
                    }
                });
            });
        });
    }

    formatValue(value, decimalPlaces) {
        let val = value.toString().replace(/\,/g, '');
        return this.addCommas(parseFloat(val).toFixed(decimalPlaces).toString());
    }

    addCommas(nStr) {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    updateViewModel(changedInput) {
        //find all fields that are dependant on this field
        let _fieldCalVar = changedInput.fieldCalVar;
        this.screens_collection.get().forEach(s => {
            s['sections'].get().forEach(sct => {
                sct.fields.get().forEach(f => {
                    if (f.formula.indexOf(_fieldCalVar) !== -1 && f.fieldCalVar !== _fieldCalVar) {
                        //need to update value
                        //get formula
                        let newVal = this.formatValue(this.processFieldFormula(f), f.decimalDisp);
                        if (newVal !== f.value.get()) {
                            if (f.uiType === 'slider') {
                                $('#' + f.fieldCalVar).slider('value', parseFloat(newVal));
                                $("#" + f.fieldCalVar + " .oe-slider-handle").text(this.formatDisplayValue(newVal, f.unit));
                            } 
                            f.value.set(newVal);
                            //check if related to amortization and update table if so
                            if (['_termOfLoan', '_loanIntRate', 'loanAmountReq'].indexOf(f.fieldCalVar) !== -1) {
                                this.calculateAmortization();
                            }
                            //recurssivley search for other dependent variables
                            this.updateViewModel(f);
                        }
                    }
                });
            });
        });
    }

    formatDisplayValue(val, unit) {
        let returnVal;
        val = this.addCommas(val);
        switch (unit) {
            case '$':
                returnVal = unit + val;
                break;
            case '#':
                returnVal = val;
                break;
            case '%':
                returnVal = parseFloat(val) * 100 + unit;
                break;
            default:
                returnVal = val + ' ' + unit;
                break;
        }
        return returnVal;
    }

    processFieldFormula(field) {
        //parse fomula
        let formula = field.formula;
        let formulaVals = formula;
        let formulaFields = formula
            .replace(/\*/g, ',')
            .replace(/\+/g, ',')
            .replace(/\-/g, ',')
            .replace(new RegExp('/', 'g'), ',')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .split(',');

        formulaFields.forEach(ff => {
            this.screens_collection.get().forEach(s => {
                s['sections'].get().forEach(sct => {
                    sct.fields.get().forEach(f => {
                        if (f.fieldCalVar === ff && ff !== '') {
                            let value = f.value.get().replace(/\,/g,'');
                            formulaVals = formulaVals.replace(ff,value);
                        }
                    });
                });
            });
        }
        );

        //should have updated formula as a string
        console.log('formula with values', formulaVals);

        return eval(formulaVals);
    }

    setSelectedSystem(selSystem) {
        this.selected_system.set(selSystem);
        this.show_next_btn.set(true);
        //this.selected_species.set(this.species_tbl.get().filter(spec => {
        //    let selected = spec.species === selSystem.system;
        //    spec.selected.set(selected);
        //    return selected;
        //})[0]);
        //this.selected_prod_meth.set(this.prod_meth_tbl.get().filter(prod => {
        //    let selected =  prod.production_method === selSystem.production_method;
        //    prod.selected.set(selected);
        //    return selected;
        //})[0]);
        //if (this.screens_collection.get().length > 0) {
        //    this.screens_collection.getItems().forEach(s => {
        //        s['sections'].get().forEach(sct => {
        //            if (sct.sectionType === 'Select System') {
        //                sct.selected_system.set(sct.systems_tbl.get().filter((sys) => {
        //                    return sys['system'] === selSystem.system;
        //                })[0]);
                        
        //                sct.selected_species.set(sct.species_tbl.get().filter((sys) => {
        //                    return sys['species'] === sct.selected_system.get()['species'];
        //                })[0]);
        //                sct.selected_prod_meth.set(sct.prod_meth_tbl.get().filter((sys) => {
        //                    return sys['production_method'] === sct.selected_system.get()['production_method'];
        //                })[0]);
        //            }
        //        });
        //    });
        //}

        this.systems_tbl.get()
            .forEach(s => {
                s['selected'].set(selSystem.system === s['system']);
                });

        this.show_other_input_params_1.set(selSystem.system ? true : false);

        this.refreshScreenFilters()

        //this.viewModel.selected_system.set(this.viewModel.systems_tbl.get().filter((system) => {
        //    return system['system'] === context.system;
        //})[0]);
        //this.viewModel.selected_species.set(this.viewModel.species_tbl.get().filter((species) => {
        //    return species['species'] === this.viewModel.selected_system.get()['species'];
        //})[0]);
        //this.viewModel.selected_prod_meth.set(this.viewModel.prod_meth_tbl.get().filter((prodmeth) => {
        //    return prodmeth['production_method'] === this.viewModel.selected_system.get()['production_method'];
        //})[0]);
    }

    setSelectedQuickstartResource(selQsRes) {
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Resources') {
                        sct.fields.get().forEach(f => {
                            f.visible.set(f.fieldName === selQsRes)
                        })
                    }
                });
            });
        }
    }

    resetSystemFilters() {
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.selected_prod_meth_filter.set(sct.prod_meth_tbl.getAt(0)['production_method']);
                        sct.selected_species_filter.set(sct.species_tbl.getAt(0)['species']);
                    }
                });
            });
        }
    }

    runRoutingServices() {
        let mapPoint = this.selected_location.get().point;
        //convert to 4326

        var workflowArgs: any = {};
        workflowArgs.workflowId = "Routing_Services";
        workflowArgs.startPointIn = mapPoint.x.toString() + "," + mapPoint.y.toString() + "," + mapPoint.spatialReference.wkid;
        workflowArgs.runInBackground = true;
        this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
    }

    _injectScript() {

        //jQuery plugin for displaying tour/guide
        //http://linkedin.github.io/hopscotch/
        //////////////////////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/easy-responsive-tabs.js",
            dataType: "script",
            success: function () {
                console.log('success!');
            },
            error: function (err) {
                console.log('fail', err);
            }
        });

    }

    _refreshSystemsDisplay() {
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.systems_tbl_filter.refresh();
                        sct.show_no_systems_in_filtered_view.set(sct.systems_tbl_filter.isEmpty());
                    }
                });
            });
        }
    }

    _onSiteInitialized(site: Site, thisViewModel, config) {

        //this._injectScript();

        //if (config) {
        //    let configUri = config["configUri"];
        //    $.ajax({
        //        type: "GET",
        //        url: configUri,
        //        dataType: "json",
        //        context: thisViewModel,
        //        success: function (config) {
        //            console.log('got financial pln config! ', config);
        //            thisViewModel.moduleJsonConfig = config;

        //        },
        //        error: function (err) {
        //            console.log('fail', err);
        //        }
        //    });
        //}
    }

    _setScreenSectionBindings() {

        //if (this.screens_collection.get().length > 0) {
        //    this.screens_collection.getItems().forEach(s => {
        //        s['sections'].get().forEach(sct => {
        //            if (sct.sectionType === 'Select System') {
        //                sct.selected_system.bind(this, (selSys) => {
        //                    this.selected_system.set(selSys);
        //                    this.selected_species_label.set(selSys.species);
        //                    this.selected_prod_meth_label.set(selSys.production_method);
        //                });
        //                sct.selected_species.bind(this, (selSpecies) => {
        //                    this.selected_species.set(selSpecies);
        //                });
        //                sct.selected_prod_meth.bind(this, (selProdMeth) => {
        //                    this.selected_prod_meth.set(selProdMeth);
        //                });

        //            }
        //        });
        //    });
        //}

        this.selected_location.bind(this, (selLoc) => {
            if (this.screens_collection.get().length > 0) {
                //update the map screen info
                console.log('selected location', selLoc, this.screens_collection);
                this.screens_collection.getItems().forEach(s => {
                    s['sections'].get().forEach(sct => {
                        if (sct.sectionType === 'Map') {
                            sct.selected_location.set(selLoc);
                            sct.show_selected_location.set(selLoc ? true : false);
                            sct.show_add_location.set(selLoc ? false : true);
                        } else if (sct.sectionType === 'Select System') {
                            sct.selected_system.bind(this, (selSys) => {
                                this.selected_system.set(selSys);
                            })
                        }

                    });
                });
            }
        });
    }

    _systemsFilters(thisViewModel: any, system: any) {
        let returnValSpecies = true;
        let returnValProdMeth = true;
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        let selectedSpeciesFilter = sct.selected_species_filter.get();
                        let selectedProdMethFilter = sct.selected_prod_meth_filter.get();
                        if (selectedSpeciesFilter) {
                            if (selectedSpeciesFilter.indexOf("<--") === -1) {
                                returnValSpecies = system.species === selectedSpeciesFilter;
                            }
                        }
                        if (selectedProdMethFilter) {
                            if (selectedProdMethFilter.indexOf("<--") === -1) {
                                returnValProdMeth = system.production_method == selectedProdMethFilter;
                            }
                        }
                    }
                });
            });
        }
        return returnValSpecies && returnValProdMeth;
    }

    refreshScreenFilters() {
        this.screens_collection_filter.refresh();
        this.screens_collection.get().forEach(s => s['sections'].get().forEach(sct => sct['fields_filter'].refresh()));
    }

    _screensFilter(thisViewModel: any, screen: any) {
        return true;
        //let hasSystemSelected = this.selected_system.get()['system'] ? true : false;
        //return hasSystemSelected || screen.screenOrder === '1';

        //if (hasSystemSelected) {
        //    //filter to only show fields that are set to show are set for all or for the selected system
        //    return this.show_all_tabs.get() || screen.showAdvOnly === "False";
        //}
        //else {
        //        return screen.screenOrder === '1'
        //    }
        
        //return this.show_all_tabs.get() || (screen.showAdvOnly === "False" && this.selected_system.get()['system'] || screen.screenOrder === "1");
        //return this.show_all_tabs.get() || screen.showAdvOnly === "False";
    }

    _selectedFilter(thisViewModel: any, obj:any) {
        //return true;
        return obj.selected;
    }

    _fieldsFilter(thisViewModel: any, field: any) {
        return field.uiType !== 'none'
            ? this.selected_system.get()['system']
                ? field.show.indexOf('All') !== -1 || field.show.indexOf(this.selected_system.get()['system']) !== -1
                : false
            : false;
    }


    _summarySectionsFilter(thisViewModel: any, section: any) {
        return section.sectionType ==="InputsCalculated"
    }

    _checkOtherParamVisible() {
        let hasSpeciesSelection = this.selected_species.get() === "" ? false : this.selected_species.get().indexOf("<--") === -1;
        let hasProdMethSelection = this.selected_prod_meth.get() === "" ? false : this.selected_prod_meth.get().indexOf("<--") === -1;
        this.show_other_input_params_1.set(hasSpeciesSelection && hasProdMethSelection);

    }

    _resetDefaults() {
        this.has_location.set(false);
        this.screens_collection.set(null);
        //if (this.screens_collection.get().length > 0) {
        //    this.screens_collection.getItems().forEach(s => {
        //        s['sections'].get().forEach(sct => {
        //            if (sct.sectionType === 'Select System') {
        //                sct.selected_system.set(null);
        //                sct.selected_species.set(null);
        //                sct.selected_prod_meth.set(null);
        //            }
        //        });
        //    });
        //}
        this.selected_location.set(null);
        //this.selected_species.set(null);
        //this.selected_price_target.set(null);
        //this.selected_product_weight.set(null);
        //this.selected_prod_meth.set(null);
        //this.selected_prod_meth_filter.set(null);
        //this.selected_species_filter.set(null);
        //this.selected_system.set(null);
        //this.selected_annual_harvest.set(null);
        //this.show_add_location.set(null);
        //this.show_other_input_params_1.set(null);
        this.active_screen.set(1);
        this.esriMap = null;
        //this.esriBasemapToggle.destroy();
        //this.esriHomeBtn.destroy();
        //this.esriSearch.destroy();
    }
}