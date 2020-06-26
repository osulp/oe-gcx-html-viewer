/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";
import { FilterableCollection } from "geocortex/framework-ui/FilterableCollection";
import { OrderedCollection } from "geocortex/framework-ui/OrderedCollection";
import { Site } from "geocortex/essentials/Site";
//import { OE_Charts } from "../OE_Aquaculture/OE_Charts";

export class OE_AquacultureFinancialViewModel extends ViewModelBase {

    app: ViewerApplication;
    workflowContext: any;
    moduleJsonConfig: any;
    //History cache
    scenario_cache: ObservableCollection<any> = new ObservableCollection([]);

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
    //selected_system_binding_token: string = '';
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
    //TRANSPORTATION DATA
    transportation_lut: any;
    //ROUTES
    sub_station_routes: ObservableCollection<any> = new ObservableCollection([]);
    //AMORTIZATION
    amortization_tbl: ObservableCollection<any> = new ObservableCollection([]);
    //Summary Button
    show_summary_btn: Observable<boolean> = new Observable(false);
    //UPDATE State
    show_loading: Observable<boolean> = new Observable(false);
    show_all_for_report: Observable<boolean> = new Observable(false);
    //Validation Monitoring
    show_warning: Observable<boolean> = new Observable(false);
    invalid_array = [];
        
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.screens_collection_filter = new FilterableCollection<any>(this.screens_collection, this._screensFilter.bind(this, this));
        this.selected_location.bind(this, (selLoc) => {
            if (selLoc ? selLoc.name !== 'User click' : false) {
                this.has_location.set(true);
                this.screens_collection.get().forEach(scr => {
                    scr['sections'].get().forEach(sec => {
                        sec['fields'].get().forEach(f => {
                            if (f['fieldCalVar'] === 'facilityLocation') {
                                f.value.set(selLoc.name + "<br>Lat: " + selLoc.point.y.toFixed(2) + " Long: " + selLoc.point.x.toFixed(2));
                                this.runRoutingServices();
                            }
                        });
                    });
                });
            }
        });
        
        //this.selected_system_binding_token =
        this.selected_system.bind(this, (sys) => {
            if (sys) {
                this.selected_system_text.set(sys.system ? sys.system : sys);
                let _species = [];
                this.species_tbl.get().forEach(species => {
                    let isSelected = sys.species === species.species;
                    species.selected = isSelected; //.set(isSelected);
                    _species.push(species);
                });
                this.species_tbl.set(_species);
                this.species_tbl_filter.refresh();
                let _prod = [];
                this.prod_meth_tbl.get().forEach(prod_meth => {
                    prod_meth.selected = sys.production_method === prod_meth.production_method;
                    _prod.push(prod_meth);
                })
                this.prod_meth_tbl.set(_prod);
            }
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

        this.show_all_for_report.bind(this, () => {
            this.screens_collection_filter.refresh();
        });
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
            this.workflowContext = $.extend({}, wc);

            this.resetSystemFilters();

            this.has_location.set(wc.getValue("location") ? true : false);
                      
            this.setSystems(wc);

            this.setScreens(wc);

            this.setSpecies(wc);

            this.setProdMethods(wc);

            this.transportation_lut = wc.getValue('transportation').features ? wc.getValue('transportation').features.map(f => {
                return {
                    pounds: f.attributes.pounds,
                    miles: f.attributes.miles,
                    shipCostLbMile: f.attributes.shipCostLbMile
                }
            }) : [];

            //rerun to set the resources system selection screen val...  TODO: figure out a better way
            //this.setSystems(wc);

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
                    "systemTitle": feat.attributes.SystemTitle,
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
                        showInReport: sAttr.IncludeInReport,
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
                            field_categories: new ObservableCollection<any>([]),
                            field_ui_categories: new ObservableCollection<any>([]),
                            visible: new Observable<boolean>(true)
                        };
                        returnSectionInfo['fields_filter'] = new FilterableCollection<any>(returnSectionInfo['fields'], this._fieldsFilter.bind(this, this));

                        switch (ssAttr.SectionType) {  
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
let value = att.Default === '<-->' ? att.Default : this.formatValue(att.Default, att.Decimal)
                                let fieldValue;
                                fieldValue = new Observable<any>(value);
                                let fieldValidateMsg = new Observable<any>('Invalid input: Please enter a number between ' + this.formatValue(att.Min,att.Decimal) + ' and ' + this.formatValue(att.Max,att.Decimal) + '. <br>  ESC to reset to default value.');
                                let fieldValidateMsgClass = new Observable<any>('validate-msg hide');
                                let fieldDisplayValue = new Observable<any>(this.formatDisplayValue(value, att.Unit, att.Decimal, true));
                                let returnVal =
                                {
                                    fieldName: att.Field,
                                    fieldCalVar: att.FieldCalVar,
                                    fieldHandle: att.FieldCalVar + "Handle",
                                    fieldValidateMsgID: att.FieldCalVar + "Validate",
                                    fieldValidateMsgClass: fieldValidateMsgClass,
                                    fieldValidateMsg: fieldValidateMsg,
                                    fieldCat: att.FieldCategory,
                                    fieldLabel: att.FieldLabel,
                                    uiType: att.UiType,
                                    unit: att.Unit,
                                    defaultVal: att.Default,
                                    increment: att.Increment,
                                    value: fieldValue,
                                    formattedValue: fieldDisplayValue,
                                    previousValue: fieldValue,
                                    min: att.Min,
                                    max: att.Max,
                                    decimalDisp: att.Decimal,
                                    show: att.Show.split(';'),
                                    formula: att.Formula,
                                    desc: att.Description,
                                    notes: att.Notes,
                                    chartID: att.ChartConfig,
                                    showDesc: new Observable<boolean>(true),
                                    visible: new Observable<boolean>(att.Field === 'Total Land'),
                                    tableDisplayClass: 'div-table-cell ' + att.FieldCategory,
                                    class: new Observable<string>('div-table-cell values')
                                };
                                //add chart config if applicable
                                if (att.ChartConfig !== '') {
                                    //lookup chart config values and render?
                                    let _chartConfig = _chartConfigs.filter(f => f.attributes.ChartID === att.ChartConfig)[0];
                                    let chartSeries = JSON.parse(_chartConfig.attributes.Series);
                                    let chartData = new ObservableCollection<any>(chartSeries.data.map(d => {
                                        return {
                                            value: new Observable<any>(d.value),
                                            percent: new Observable<any>(d.value),
                                            category: d.category,
                                            fieldCalVar: d.fieldCalVar
                                        }
                                    }));
                                    
                                    returnVal['chartConfig'] = {
                                        chartID: _chartConfig.attributes.ChartID,
                                        chartName: _chartConfig.attributes.ChartName,
                                        chartType: _chartConfig.attributes.Type,
                                        chartSeries: chartSeries,
                                        chartData: chartData
                                    };
                                }
                                if (att.FieldCategory === 'LookupTable') {
                                    let lutName = att.Formula.split('lut:')[1].split('>')[0];
                                    let lutField = att.Formula.split('>')[1].split('{')[0];
                                    let lutFieldLookup = att.Formula.indexOf('{') !== -1 ? att.Formula.split('{')[1].split('}')[0] : null;
                                    let lut;
                                    let selectedDDoption = new Observable<any>();
                                    let ddOptions = new ObservableCollection<any>();
                                    switch (lutName) {
                                        case 'growthRate':
                                            lut = _growthRates;
                                            let harvestWeights = _growthRates.filter(gr =>
                                                this.selected_system.get().species === gr.attributes.Species
                                            ).map(gr => {
                                                if (gr.attributes['Default'] === 'True') {
                                                    selectedDDoption.set(gr.attributes['Market Weight']);
                                                }
                                                return {
                                                    option: gr.attributes['Market Weight'],
                                                    value: gr.attributes['Months to Harvest'],
                                                    updateField: 'monthsToHarvest',
                                                    //selected: new Observable<boolean>( gr.attributes['Default'] === 'True')                        
                                                }
                                            });
                                            ddOptions.set(harvestWeights);
                                            returnVal['ddOptions'] = ddOptions;
                                            break;
                                        default:
                                            break;
                                    }
                                    returnVal['selDDoption'] = selectedDDoption;
                                    selectedDDoption.bind(returnVal, (val) => {
                                        //update original value
                                        returnVal.value.set(val);
                                        this.updateViewModel(returnVal);
                                        //update dependent field if any
                                        let hasDependentField = returnVal['ddOptions'].get().filter(dd => dd.updateField !== undefined).length > 0;
                                        if (hasDependentField) {
                                            //get update field based on new input val
                                            returnVal['ddOptions'].get().forEach(dd => {
                                                if (dd.option === val) {

                                                    //update dependent field
                                                    this.screens_collection.get().forEach(scr => {
                                                        scr['sections'].get().forEach(sct => {
                                                            sct['fields'].get().forEach(f => {
                                                                if (f.fieldCalVar === dd.updateField) {
                                                                    f.value.set(dd.value);
                                                                    this.updateViewModel(f);
                                                                }
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                fieldValue.bind(returnVal, (val) => {
                                    returnVal.formattedValue.set(thisScope.formatDisplayValue(val, returnVal.unit,returnVal.decimalDisp,true));
                                });
                                return returnVal;
                            });

                        returnSectionInfo.fields.set(_screenSectionFields);
                        ////Quickstart only sort fields for resource vs goal
                        //if (returnSectionInfo.section === 'productionRequired') {
                            let categories = _screenSectionFields.map(f => f.fieldCat)
                                .filter((v, idx, self) => self.indexOf(v) === idx);
                            var field_categories = [];
                            categories.forEach(c => {
                                let catFields = _screenSectionFields.filter(sf => sf.fieldCat === c);
                                let cat = {
                                    category: c,
                                    fields: new ObservableCollection<any>(catFields)
                                }
                                cat['fields_filter'] = new FilterableCollection<any>(cat['fields'], this._fieldsFilter.bind(this, this));
                                field_categories.push(cat);
                            });
                        returnSectionInfo['field_categories'].set(field_categories);
                        let ui_categories = _screenSectionFields.map(f => f.uiType)
                            .filter((v, idx, self) => self.indexOf(v) === idx);
                        var field_ui_cat = [];
                        ui_categories.forEach(c => {
                            let catFields = _screenSectionFields.filter(sf => sf.uiType === c);
                            let cat = {
                                category: c,
                                fields: new ObservableCollection<any>(catFields)
                            }
                            cat['fields_filter'] = new FilterableCollection<any>(cat['fields'], this._fieldsFilter.bind(this, this));
                            ui_categories.push(cat);
                        });
                        returnSectionInfo['field_ui_categories'].set(ui_categories);
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
        this.renderCharts();
        this.saveScenarioToCache();
    }

    saveScenarioToCache() {
        //create scenario object
        let scenario = {
            scenario_name: "Scenario 1",
            screens: this.screens_collection.get(),
            selected: new Observable<boolean>(true)
        }
        this.scenario_cache.addItem(scenario);
    }

    sortChartDataTable(left, right) {
        let leftPercent = parseFloat(left.percent.get().replace('%', ''));
        let rightPercent = parseFloat(right.percent.get().replace('%', ''));
        if (leftPercent < rightPercent) {
            return 1;
        }
        if (leftPercent > rightPercent) {
            return -1;
        }
        return 0;
    }

    renderCharts() {
        this.screens_collection.get().forEach(scr => {
            scr['sections'].get().forEach(sct => {
                sct['fields'].get().forEach(f => {
                    if (f.chartConfig) {
                        let totalChartValues = 0;
                        //update with model values
                        f.chartConfig.chartSeries.data.forEach(d => {
                            let value = this.getValue(d.fieldCalVar);
                            d.value = parseInt(value.replace(/\,/g, ''));
                            totalChartValues += d.value;
                        });
                        //update chartData for table display
                        let sortedData = [];
                        f.chartConfig.chartData.get().forEach(cd => {
                            let value = this.getValue(cd.fieldCalVar);
                            cd.value.set(this.formatDisplayValue(parseInt(value.replace(/\,/g, '')), "$",null,true));
                            cd.percent.set((parseInt(value.replace(/\,/g, '')) / totalChartValues * 100).toFixed(1) + "%");
                            sortedData.push(cd);
                        });
                        sortedData = sortedData.sort(this.sortChartDataTable);
                        f.chartConfig.chartData.set(sortedData);
                        //f.chartConfig.chartDataSorted.sync();
                        let opts = {
                            plotArea: {
                                margin: {
                                    top:-10
                                }
                            },
                            legend: {
                                visible: true,
                                position: "bottom"
                            },
                            chartArea: {
                                background: ""
                            },
                            seriesColors: ["#b64242", "#cc8830", "#d0b809", "#07873b", "#39a0a1", "#24769f", "#82295c", "#1a1128", "#77747f","#cecad1"],
                            seriesDefaults: {
                                labels: {
                                    visible: false,
                                    background: "transparent",
                                    template: "#= category #: #= kendo.format('{0:P0}', percentage)#"
                                    //template: "#= category #: #= kendo.format('{0:P0}', percentage)# \n #= kendo.format('{0:c0}',value)#"
                                }
                            },
                            series: [f.chartConfig.chartSeries],
                            tooltip: {
                                visible: true,
                                template: "#= category #: #= kendo.format('{0:c0}', value)# \n #= kendo.format('{0:P0}',percentage)#"
                                //format: "{0:c0}"
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
        let frequency = 12; //monthly vs yearly
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
                prevBalance: this.formatDisplayValue(this.formatValue(loanAmt, 0), '$', null, true),
                payment: this.formatDisplayValue(this.formatValue(regularPayment, 0), '$', null, true),
                interest: this.formatDisplayValue(this.formatValue(paymentInterest, 0), '$', null, true),
                principal: this.formatDisplayValue(this.formatValue(paymentPrincipal, 0), '$', null, true),
                newBalance: this.formatDisplayValue(this.formatValue(loanAmt - paymentPrincipal, 0), '$', null, true),
                totInterest: this.formatDisplayValue(this.formatValue(totInterest, 0), '$', null, true),
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
        try {
            let val = value.toString().replace(/\,/g, '');
            return this.addCommas(parseFloat(val).toFixed(decimalPlaces).toString());
        } catch (ex) {
            return value;
        }       
    }

    addCommas(nStr) {        
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0].length > 1 ? x[0].replace(/^0+/, '') : x[0];
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
        //let _fieldToValidate = changedInput.formula.indexOf('[validate:') !== -1 ? changedInput.formula.split('validate:')[1].split(']')[0] : '';
        if (changedInput.formula.indexOf('[validate:') !== -1) {
            this.validateConstraints(changedInput);
        } else if (changedInput.formula.indexOf('[interpolate:') !== -1) {
            console.log('interpolate:', changedInput);
            let interpolatedValue = Number(this.interpolateValues(changedInput)).toFixed(15);            
            changedInput.value.set(interpolatedValue);
        }
        else {
            this.screens_collection.get().forEach(s => {
                s['sections'].get().forEach(sct => {
                    sct.fields.get().forEach(f => {
                        if (f.formula.indexOf(_fieldCalVar) !== -1 && f.fieldCalVar !== _fieldCalVar) {
                            //need to update value
                            //get formula
                            let newVal = this.formatValue(this.processFieldFormula(f), f.decimalDisp);
                            if (newVal  ? newVal !== f.value.get() && newVal.indexOf('NaN') == -1 : false) {
                                if (f.uiType === 'slider') {
                                    this.setKendoSlider(f, newVal);
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
    }

    setKendoSlider(f, newVal?) {
        let thisScope = this;
        let sliderID = f.fieldCalVar;
        //var sliderTextHandle = $("#" + sliderID + " .oe-slider-handle");
        var sliderTextHandle = $("#" + f.fieldHandle);
        newVal = newVal ? newVal : f.value.get();
        sliderTextHandle.val(thisScope.formatDisplayValue(newVal.toString(), f.unit, f.decimalDisp, false));
        let min = f.min ? parseFloat(f.min) : 0;
        let max = f.max ? parseFloat(f.max) : 100;

        let increment = f.increment ? parseFloat(f.increment) : 1;

        let value = newVal.replace(/\,/g,'');//this.formatValue(newVal, f.decimalDisp);

        ////////////////////////////////////////////////
        // Kendo Slider
        ////////////////////////////////////////////////
        let opts = {
            increaseButtonTitle: "+",
            decreaseButtonTitle: "-",
            dragHandleTitle: "",
            min: min,
            max: max,
            value: value,
            smallStep: increment,
            largeStep: increment,
            tooltip: {
                enabled: false
            },
            tickPlacement: "none",
            showButtons: true,
            slide: function (slideEvt) {
                sliderTextHandle.val(thisScope.formatDisplayValue(slideEvt.value.toString(), f.unit,f.decimalDisp, false));
            },
            change: function (changeEvt) {
                let newVal = changeEvt.value.toString();
                sliderTextHandle.val(thisScope.formatDisplayValue(newVal, f.unit, f.decimalDisp, false));
                f.value.set(newVal);
                thisScope.updateViewModel(f);
            }
        };

        //Check if slider already added and update reference or else create
        if ($("#" + sliderID).data("kendoSlider")) {
            var slider = $("#" + sliderID).data("kendoSlider");
            slider.value(value);            
        } else {
            $("#" + sliderID).kendoSlider(opts);
        }
    }

    updateSlider(field) {
        //if (this.checkIsValidTextInput(field)) {
        let sliderTextHandle = $("#" + field.fieldHandle);
        let newValue = sliderTextHandle.val().split(' ')[0].replace(/\,/g, '');
        sliderTextHandle.val(this.formatDisplayValue(newValue, field.unit, field.decimalDisp, false));
        var slider = $("#" + field.fieldCalVar).data("kendoSlider");
        if (!isNaN(newValue)) {
            slider.value(newValue);
        } else {
            slider.value(0);
        }
        field.value.set(newValue);
        this.updateViewModel(field);
        //} else {
        //    console.log('not valid for slider update');
        //}             
    }

    validateTextInput(evt, elem, field) {
        if (elem.value === '<-->') {
            elem.value = '';
        }    
        if (evt.keyCode === 27) {
            //reset to default value
            console.log('reset!', field);
            //get default
            elem.value = field.defaultVal;
            this.updateSlider(field);
        }
        if (evt.keyCode === 13) {
            //submit changes
            this.updateSlider(field);
        }
         
        let isValid = this.checkIsValidTextInput(field); 
        if (isValid) {
            //elem.value = this.formatDisplayValue(elem.value.split(' ')[0].replace(/\,/g, ''), field.unit, field.decimalDisp);
        }
    }

    checkIsValidTextInput(field) {
        let inputValue = $("#" + field.fieldHandle).val().split(' ')[0].replace(/\,/g, '');
        if (inputValue !== field.defaultVal) {
            let isValid = !isNaN(inputValue) ? parseFloat(inputValue) > parseFloat(field.min) && parseFloat(inputValue) < parseFloat(field.max) : false;
            field.fieldValidateMsgClass.set(!isValid ? 'validate-msg' : 'validate-msg hide');
            return isValid;
        } else {
            return true;
        }
    }

    checkClearTextInput(evt, elem, ctx) {                
        if (elem.value === '<-->') {
            elem.value = '';
        }        
        //return true;
    }

    formatDisplayValue(val, unit, decimalDisp?,showUnits?) {
        let returnVal;
        //showUnits = showUnits ? false : true;
        if (val === '<-->') {
            return val;
        } else {
            val = this.addCommas(val);
            switch (unit) {
                case '$':
                    returnVal = (showUnits ? unit : '') + val;
                    break;
                case '#':
                    returnVal = val;
                    break;
                case '%':
                    returnVal = decimalDisp
                        ? decimalDisp > 2
                            ? ((parseFloat(val) * 100).toFixed(decimalDisp - 2) + (showUnits ? unit : ''))
                            : Math.round(parseFloat(val) * 100) + (showUnits ? unit : '')
                        : Math.round(parseFloat(val) * 100) + (showUnits ? unit : '');
                    break;
                default:
                    returnVal = val + ' ' + (showUnits ? unit : '');
                    break;
            }
            return returnVal;
        }
    }

    processFieldFormula(field) {
        //parse fomula
        let formula = field.formula;
        if (formula.indexOf('[validate') !== -1) {
            this.validateConstraints(field);
            return field.value.get();
        } else if (formula.indexOf('[interpolate') !== -1) {
            console.log('interpolate!!!', field, formula);
            return this.interpolateValues(field).toString();            
        }
        else {
            let formulaVals = formula;
            let formulaFields = formula
                .replace(/\*/g, ',')
                .replace(/\+/g, ',')
                .replace(/\-/g, ',')
                .replace(new RegExp('/', 'g'), ',')                
                .replace(/\(/g, '')
                .replace(/\)/g, '')
                .replace(/\Math.log/g,'')
                .split(',');

            formulaFields.forEach(ff => {
                this.screens_collection.get().forEach(s => {
                    s['sections'].get().forEach(sct => {
                        sct.fields.get().forEach(f => {
                            if (f.fieldCalVar === ff && ff !== '') {
                                let value = f.value.get().split(/\ /g)[0].replace(/\,/g, '');
                                formulaVals = formulaVals.replace(ff, value);
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
    }

    validateConstraints(field) {
        let _fieldToValidate = field.formula.indexOf('[validate:') !== -1 ? field.formula.split('validate:')[1].split(']')[0] : '';
        this.screens_collection.get().forEach(s => {
            s['sections'].get().forEach(sct => {
                sct.fields.get().forEach(f => {
                    //validate constraints
                    if (_fieldToValidate !== '' && f.fieldCalVar === _fieldToValidate) {
                        if (field.value.get() !== '<-->') {
                            let isNotValid = parseFloat(field.value.get().replace(/\,/g, '')) < parseFloat(f.value.get().replace(/\,/g, ''));
                            f.class.set(isNotValid ? 'div-table-cell values warning' : 'div-table-cell values');
                            this.invalid_array = this.invalid_array.filter(iv => iv !== f.fieldCalVar)
                            if (isNotValid) {
                                this.invalid_array.push(f.fieldCalVar);
                            }
                            this.show_warning.set(this.invalid_array.length > 0);

                        }
                    }
                });
            });
        });
    }

    interpolateValues(field) {
        //get values to base lookup and interpolation
        let formula = field.formula;
        let interpolateType = formula.split(':')[1].split('{')[0];        
        let fields = formula.split('{')[1].split('}')[0].split('>');
        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }
        let returnVal;
        switch (interpolateType)
        {
            case "Transporation":
            default:
                //get lookup values based on formula fields
                //weight
                let weight = parseInt(this.getValue(fields[0]).replace(/\,/,''));
                let distance = parseInt(this.getValue(fields[1]).replace(/\,/, ''));
                //market distance under
                let x_1 = this.transportation_lut
                    .map(td => parseInt(td.miles))
                    .filter(distinct)
                    .filter(td => td <= distance)
                    .sort((a, b) => b - a)[0];
                //market distance over
                let x_2 = this.transportation_lut
                    .map(td => parseInt(td.miles))
                    .filter(distinct)
                    .filter(td => td >= distance)
                    .sort((a, b) => a - b)[0];
                //harvest weight under
                let y_1 = this.transportation_lut
                    .map(td => parseInt(td.pounds))
                    .filter(distinct)
                    .filter(td => td <= weight)
                    .sort((a, b) => b - a)[0];
                //havest weight over
                let y_2 = this.transportation_lut
                    .map(td => parseInt(td.pounds))
                    .filter(distinct)
                    .filter(td => td >= weight)
                    .sort((a, b) => a - b)[0];
                //get value lookups
                //market distance under by harvest weight under
                let Q_11 = parseFloat(this.transportation_lut.filter(hw => parseInt(hw.miles) === x_1 && parseInt(hw.pounds) === y_1)[0].shipCostLbMile);
                let Q_12 = parseFloat(this.transportation_lut.filter(hw => parseInt(hw.miles) === x_1 && parseInt(hw.pounds) === y_2)[0].shipCostLbMile);
                let Q_21 = parseFloat(this.transportation_lut.filter(hw => parseInt(hw.miles) === x_2 && parseInt(hw.pounds) === y_1)[0].shipCostLbMile);
                let Q_22 = parseFloat(this.transportation_lut.filter(hw => parseInt(hw.miles) === x_2 && parseInt(hw.pounds) === y_2)[0].shipCostLbMile);                
                
                //bilinear interpolation calculation: 
                //=1/((x_2-x_1)*(y_2-y_1))*(Q_11*(x_2-x)*(y_2-y)+Q_21*(x-x_1)*(y_2-y)+Q_12*(x_2-x)*(y-y_1)+Q_22*(x-x_1)*(y-y_1))
                // help https://engineerexcel.com/bilinear-interpolation-excel/                
                let x = distance;
                let y = weight;

                let interpolatedShipCostLbMile = 1 / ((x_2 - x_1) * (y_2 - y_1)) * (Q_11 * (x_2 - x) * (y_2 - y) + Q_21 * (x - x_1) * (y_2 - y) + Q_12 * (x_2 - x) * (y - y_1) + Q_22 * (x - x_1) * (y - y_1));

                //set field value
                returnVal = interpolatedShipCostLbMile;

                break;
        }
        return returnVal;
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
        //html2canvas
        // http://html2canvas.hertzen.com/
        ////////////////
        $.ajax({
            type: "GET",
            url: "./Resources/Scripts/oe_added_scripts/html2canvas.min.js",
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

       this._injectScript();

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
        //TODO Go through each screen/section and determine if fields for selected system exist and if so, then return true.
        //Also 
        if (this.show_all_for_report.get()) {
            return true;
        } else {
            return this._screenSystemFilter(screen);
            //let hasFieldsForSystem = false;
            //this.screens_collection.get().forEach(scr => {
            //    return this._screenSystemFilter(scr)
            //    //if (scr["id"] === screen.id && !hasFieldsForSystem) {
            //    //    scr['sections'].get().forEach(sct => {
            //    //        sct.fields.get().forEach(f => {
            //    //            hasFieldsForSystem = f.show.indexOf(this.selected_system_text.get()) !== -1 || f.show.indexOf('All') !== -1
            //    //                ? true
            //    //                : hasFieldsForSystem;
            //    //        });
            //    //    });
            //    //}
            //});
            //return hasFieldsForSystem;
        }        
    }

    _screenSystemFilter(screen, forReport?) {
        let hasFieldsForSystem = false;
        let forReportView = forReport;
        this.screens_collection.get().forEach(scr => {
            if (scr["id"] === screen.id && !hasFieldsForSystem) {
                if (forReport && scr['showInReport'] === 'False') {
                    return false;
                } else {
                    scr['sections'].get().forEach(sct => {
                        sct.fields.get().forEach(f => {
                            hasFieldsForSystem = f.show.indexOf(this.selected_system_text.get()) !== -1 || f.show.indexOf('All') !== -1
                                ? true
                                : hasFieldsForSystem;
                        });
                    });
                }
            }
        });
        return hasFieldsForSystem;
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
        this.esriMap = null;
        this.esriBasemapToggle.destroy();
        this.esriHomeBtn.destroy();
        this.esriSearch.destroy();        
    }
}