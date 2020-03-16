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
    selected_species: Observable<any> = new Observable({});
    //PRODUCTION METHODS
    selected_prod_meth: Observable<any> = new Observable({});
    //SYSTEMS (Species and Production Method)
    systems_tbl: ObservableCollection<string> = new ObservableCollection([]);
    selected_system: Observable<any> = new Observable({});
    //SCREEN CONFIG
    screens_collection: ObservableCollection<string> = new ObservableCollection([]);
    screens_collection_filter: FilterableCollection<any>;
    //OTHER INPUT PARAMS
    show_other_input_params_1: Observable<boolean> = new Observable(false);
    //selected_annual_harvest: Observable<string> = new Observable('');
    //selected_product_weight: Observable<string> = new Observable('');
    //selected_price_target: Observable<string> = new Observable('');
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
    //show_screen_1: Observable<boolean> = new Observable(true);
    //show_screen_2: Observable<boolean> = new Observable(false);
    //show_screen_3: Observable<boolean> = new Observable(false);
    //show_screen_4: Observable<boolean> = new Observable(false);
    active_screen: Observable<number> = new Observable(0);
    //PAGER_NAV
    show_next_btn: Observable<boolean> = new Observable(false);
    show_back_btn: Observable<boolean> = new Observable(false);
    //ROUTES
    sub_station_routes: ObservableCollection<any> = new ObservableCollection([]);
    //TAB Display
    //show_all_tabs: Observable<boolean> = new Observable(false);


    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
        this.screens_collection_filter = new FilterableCollection<any>(this.screens_collection, this._screensFilter.bind(this, this));
        
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
                    "name": ri.attributes.name
                };
            });
            this.sub_station_routes.set(routes);
        });

        //this.active_screen.bind(this, (activeScreen) => {
        //    this.show_screen_1.set(false);
        //    this.show_screen_2.set(false);
        //    this.show_screen_3.set(false);
        //    this.show_screen_4.set(false);
        //    if (activeScreen > 0) {
        //        this["show_screen_" + activeScreen].set(true);
        //        this.show_next_btn.set(activeScreen < 4);
        //        this.show_back_btn.set(activeScreen > 1);
        //    }
        //});
    }

    setSystems(wc) {
        //create the object array for summary data
        let systems = wc.getValue("systems").features ? wc.getValue("systems").features
            .filter(f => f.attributes.System !== 'All')
            .map((feat) => {
                return {
                    "production_method": feat.attributes.ProductionMethod,
                    "species": feat.attributes.Species,
                    "system": feat.attributes.System,
                    "systemid": feat.attributes.System.replace(/\ /g, "").replace(/\:/g, "_"),
                    "selected": new Observable<boolean>(false)
                }
            }) : [];

        this.systems_tbl.set(systems);

        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.systems_tbl.set(systems);
                    }
                });
            });
        }
    }

    setSpecies(wc) {
        let defaultSelect = "<-- All -->";

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
                        "price_increment": feat.attributes.PriceIncrement
                    }
                })
            : [];

        species.splice(0, 0, { "species": defaultSelect, "type": "placeholder", "show": true, "production_methods": "*" });

        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.species_tbl.set(species);
                        sct.selected_species.set(defaultSelect);
                        sct.selected_species_filter.bind(this, (selSpecies) => {
                            this._refreshSystemsDisplay();
                        });
                    }
                });
            });
        }
    }

    setProdMethods(wc) {
        let defaultSelect = "<-- All -->";
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
                        "show": true
                    }
                })
            : [];

        prod_meths.splice(0, 0, { "production_method": defaultSelect, "type": "placeholder", "species": "*", "show": true });
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.prod_meth_tbl.set(prod_meths);
                        sct.selected_prod_meth.set(defaultSelect);
                        sct.selected_prod_meth_filter.bind(this, (selProdMeth) => {
                            this._refreshSystemsDisplay();
                        });
                    }
                });
            });
        }
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
                            displayClass: 'screenSection' + ssAttr.Display + ' panel-cell',
                            fields: new ObservableCollection<any>([]),
                            visible: new Observable<boolean>(true),
                            //show_all_tabs: this.show_all_tabs
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
                                returnSectionInfo['species_tbl'] = new ObservableCollection<any>([]);
                                returnSectionInfo['selected_species'] = new Observable<any>('');
                                returnSectionInfo['selected_species_filter'] = new Observable<any>('<--');
                                returnSectionInfo['prod_meth_tbl'] = new ObservableCollection<any>([]);
                                returnSectionInfo['selected_prod_meth'] = new Observable<any>('');
                                returnSectionInfo['selected_prod_meth_filter'] = new Observable<any>('<--');
                                returnSectionInfo['selected_system'] = new Observable<any>('');
                                returnSectionInfo['systems_tbl'] = new ObservableCollection<any>([]);
                                returnSectionInfo['systems_tbl_filter'] = new FilterableCollection<any>(returnSectionInfo['systems_tbl'], this._systemsFilters.bind(this, this));
                                returnSectionInfo['show_no_systems_in_filtered_view'] = new Observable<boolean>(false);
                                returnSectionInfo['next_enabled_class'] = new Observable<any>('oe-btn next-disabled');
                                returnSectionInfo['show_other_input_params_1'] = this.show_other_input_params_1;
                                break;
                            case 'Summary Table':
                                returnSectionInfo['summary_table'] = this.screens_collection
                            default:
                                break;
                        }

                        let _screenSectionFields = scrCnfFeat.filter(f => f.attributes.Section === ssAttr.SectionID)
                            .map(sf => {
                                const att = sf.attributes;
                                let fieldValue = new Observable<any>(this.formatValue(att.Default, att.Decimal));

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
                                    min: att.Min,
                                    max: att.Max,
                                    decimalDisp: att.Decimal,
                                    show: att.Show.split(';'),
                                    formula: att.Formula,
                                    desc: att.Description,
                                    notes: att.Notes,
                                    showDesc: new Observable<boolean>(false),
                                    visible: new Observable<boolean>(att.Field === 'Total Land'),
                                    tableDisplayClass: 'div-table-cell ' + att.FieldCategory
                                };
                                return returnVal;
                            });

                        returnSectionInfo.fields.set(_screenSectionFields);
                        //Quickstart only sort fields for resource vs goal
                        if (returnSectionInfo.section === 'resourceIntro') {
                            let categories = _screenSectionFields.map(f => f.fieldCat)
                                .filter((v, idx, self) => self.indexOf(v) === idx);
                            var field_categories = [];
                            categories.forEach(c => {
                                let catFields = _screenSectionFields.filter(sf => sf.fieldCat === c);
                                let cat = {
                                    category: c,
                                    fields: new ObservableCollection<any>(catFields)
                                }
                                field_categories.push(cat);
                            });
                            returnSectionInfo['field_categories'].set(field_categories);
                        }
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
    }


    formatValue(value, decimalPlaces) {
        return this.addCommas(parseFloat(value).toFixed(decimalPlaces).toString());
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
                        let newVal = this.formatValue(this.processFieldFormula(f, parseFloat(changedInput)), f.decimalDisp);
                        if (newVal !== f.value.get()) {
                            if (f.uiType === 'slider') {
                                $('#' + f.fieldCalVar).slider('value', parseFloat(newVal));
                                $("#" + f.fieldCalVar + " .oe-slider-handle").text(this.formatSliderValue(newVal, f.unit));
                            } 
                            f.value.set(newVal);
                            this.updateViewModel(f);
                        }
                    }
                });
            });
        });
    }

    formatSliderValue(val, unit) {
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

    processFieldFormula(field, changedVal) {
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
        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.selected_system.set(sct.systems_tbl.get().filter((sys) => {
                            return sys['system'] === selSystem;
                        })[0]);
                        
                        sct.selected_species.set(sct.species_tbl.get().filter((sys) => {
                            return sys['species'] === sct.selected_system.get()['species'];
                        })[0]);
                        sct.selected_prod_meth.set(sct.prod_meth_tbl.get().filter((sys) => {
                            return sys['production_method'] === sct.selected_system.get()['production_method'];
                        })[0]);
                    }
                });
            });
        }

        this.systems_tbl.get()
            .forEach(s => {
                s['selected'].set(selSystem === s['system']);
                });

        this.show_other_input_params_1.set(selSystem ? true : false);

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

        if (this.screens_collection.get().length > 0) {
            this.screens_collection.getItems().forEach(s => {
                s['sections'].get().forEach(sct => {
                    if (sct.sectionType === 'Select System') {
                        sct.selected_system.bind(this, (selSys) => {
                            this.selected_system.set(selSys);
                        });
                        sct.selected_species.bind(this, (selSpecies) => {
                            this.selected_species.set(selSpecies);
                        });
                        sct.selected_prod_meth.bind(this, (selProdMeth) => {
                            this.selected_prod_meth.set(selProdMeth);
                        });

                    }
                });
            });
        }

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
        //return true;
        let hasSystemSelected = this.selected_system.get()['system'] ? true : false;
        return hasSystemSelected || screen.screenOrder === '1';

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