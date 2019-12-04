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
    moduleJsonConfig: any;
    //History cache
    selection_cache: ObservableCollection<string> = new ObservableCollection([]);
    //SPECIES
    species_tbl: ObservableCollection<string> = new ObservableCollection([]);
    selected_species: Observable<any> = new Observable({});
    selected_species_filter: Observable<string> = new Observable('');
    //PRODUCTION METHODS
    prod_meth_tbl: ObservableCollection<string> = new ObservableCollection([]);
    selected_prod_meth: Observable<any> = new Observable({});
    selected_prod_meth_filter: Observable<string> = new Observable('');
    //SYSTEMS (Species and Production Method)
    systems_tbl: ObservableCollection<string> = new ObservableCollection([]);
    systems_tbl_filter: FilterableCollection<any>;
    selected_system: Observable<any> = new Observable({});
    //SYSTEM FILTERS
    show_filter_class: Observable<string> = new Observable('show-filters');
    show_system_filters: Observable<boolean> = new Observable(false);
    show_no_systems_in_filtered_view: Observable<boolean> = new Observable(false);
    //OTHER INPUT PARAMS
    show_other_input_params_1: Observable<boolean> = new Observable(false);
    selected_annual_harvest: Observable<string> = new Observable('');
    selected_product_weight: Observable<string> = new Observable('');
    selected_price_target: Observable<string> = new Observable('');
    //SELECTED LOCATION
    has_location: Observable<boolean> = new Observable(false);
    show_add_location: Observable<boolean> = new Observable(true);
    selected_location: Observable<any> = new Observable();
    show_selected_location: Observable<boolean> = new Observable(false);
    esriMap: esri.Map;
    esriSearch: esri.dijit.Search;
    esriLocator: esri.tasks.Locator;
    //INFO SCREEN
    info_screen_arrow_src: Observable<string> = new Observable("Resources/Images/Icons/arrow-right-small-24.png");
    show_info_screen: Observable<boolean> = new Observable(true);
    //INPUT SCREENS
    show_screen_1: Observable<boolean> = new Observable(true);
    show_screen_2: Observable<boolean> = new Observable(false);
    show_screen_3: Observable<boolean> = new Observable(false);
    show_screen_4: Observable<boolean> = new Observable(false);
    active_screen: Observable<number> = new Observable(1);
    //PAGER_NAV
    show_next_btn: Observable<boolean> = new Observable(true);
    show_back_btn: Observable<boolean> = new Observable(false);
    

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
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
            if (this.has_location.get()) {
                this.selected_location.set({ "point": wc.getValue("location"), "name": "User click" });
                
                this.show_add_location.set(false);
            } else {
                this.show_add_location.set(true);
            }

            //create the object array for summary data
            let systems = wc.getValue("systems").features ? wc.getValue("systems").features.map((feat) => {
                return {
                    "production_method": feat.attributes.ProductionMethod,
                    "species": feat.attributes.Species,
                    "system": feat.attributes.System,
                    "systemid": feat.attributes.System.replace(/\ /g,"").replace(/\:/g,"_"),
                }
            }) : [];

            this.systems_tbl.set(systems);

            let defaultSelect = "<-- All -->";

            let species = wc.getValue("species").features ?
                wc.getValue("species").features
                    .map((feat, idx) => {
                        return {
                            "species": feat.attributes.Species,
                            "show": true,
                            "production_methods": this.systems_tbl.getItems()
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

            this.species_tbl.set(species);

            this.selected_species.set(defaultSelect);

            let prod_meths = wc.getValue("prodMethods").features
                ? wc.getValue("prodMethods").features
                    .map((feat) => {
                        return {
                            "production_method": feat.attributes.ProductionMethod,
                            "species": this.systems_tbl.getItems()
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
            this.prod_meth_tbl.set(prod_meths);
            this.selected_prod_meth.set(defaultSelect);

            this.app.commandRegistry.command("ActivateView").execute("OE_AquacultureFinancialView");
        });

        this.app.registerActivityIdHandler("onRoutingServicesComplete", (wc, df) => {
            console.log("routing return?", wc, df);
        });

        this.selected_species_filter.bind(this, (selectedSpecies) => {
            this._refreshSystemsDisplay();
        });

        this.selected_location.bind(this, (selectedLocation) => {
            this.show_selected_location.set(selectedLocation ? true : false);
        });

        this.selected_prod_meth_filter.bind(this, (selectedProdMeth) => {
            this._refreshSystemsDisplay();
        });

        this.selected_system.bind(this, (selectedSystem) => {
            this.show_other_input_params_1.set(selectedSystem !== '');
        });

        this.active_screen.bind(this, (activeScreen) => {
            this.show_screen_1.set(false);
            this.show_screen_2.set(false);
            this.show_screen_3.set(false);
            this.show_screen_4.set(false);
            this["show_screen_" + activeScreen].set(true);
            this.show_next_btn.set(activeScreen < 4);
            this.show_back_btn.set(activeScreen > 1);
        });
    }

    _refreshSystemsDisplay() {
        this.systems_tbl_filter.refresh();
        this.show_no_systems_in_filtered_view.set(this.systems_tbl_filter.isEmpty());
    }

    _onSiteInitialized(site: Site, thisViewModel, config) {

        if (config) {
            let configUri = config["configUri"];
            $.ajax({
                type: "GET",
                url: configUri,
                dataType: "json",
                context: thisViewModel,
                success: function (config) {
                    console.log('got financial pln config! ', config);
                    thisViewModel.moduleJsonConfig = config;

                },
                error: function (err) {
                    console.log('fail', err);
                }
            });
        }
    }

    _systemsFilters(thisViewModel: any, system: any) {
        let selectedSpeciesFilter = this.selected_species_filter.get();
        let selectedProdMethFilter = this.selected_prod_meth_filter.get();
        let returnValSpecies = true;
        let returnValProdMeth = true;
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
        
        return returnValSpecies && returnValProdMeth;
    }

    _checkOtherParamVisible() {
        let hasSpeciesSelection = this.selected_species.get() === "" ? false : this.selected_species.get().indexOf("<--") === -1;
        let hasProdMethSelection = this.selected_prod_meth.get() === "" ? false : this.selected_prod_meth.get().indexOf("<--") === -1;
        this.show_other_input_params_1.set(hasSpeciesSelection && hasProdMethSelection);

    }

    _resetDefaults() {
        this.has_location.set(false);
        this.selected_location.set(null);
        this.selected_species.set(null);
        this.selected_price_target.set(null);
        this.selected_product_weight.set(null);
        this.selected_prod_meth.set(null);
        this.selected_prod_meth_filter.set(null);
        this.selected_species_filter.set(null);
        this.selected_system.set(null);
        this.selected_annual_harvest.set(null);
        this.show_add_location.set(null);
        this.show_other_input_params_1.set(null);
    }
}