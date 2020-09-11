
// Module 'OE_Search'
        (function () {
var markup1 = '<div class=\'OE_Searchbox\'>    <!--<div data-region-name=\'GlobalSearchRegion\'></div>-->    <div class=\'search-box\'>    <!-- The id \'gcx_search\' is used to prevent a long press in the search box from bringing up the log view (GVH-3271) -->        <!--<input type=\'text\' id=\'gcx_search\' tabindex=\'0\' placeholder=\'Search...\' title=\'Type your search terms\'>-->        <input id=\'oe_search_box\' type=\'text\' placeholder=\'Search...\' title=\'Type your search terms\' data-binding=\'{@event-onclick:clearTitle}\' />        <button class=\'search-button\' tabindex=\'0\'><span>Perform a Search</span></button>            </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Search/OE_SearchModule": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SearchModule = /** @class */ (function (_super) {
        __extends(OE_SearchModule, _super);
        function OE_SearchModule(app, libraryId) {
            var _this = _super.call(this, app, libraryId) || this;
            _this.clearTitle = function (event, element, context) {
                element.value = "";
            };
            // Legacy 'shim' to make the GeoNamesSearchProvider available at the location defined in the 'type' configuration
            // This is required as custom search provider instantiation does not yet make use of the AMD style 'require', and it can be removed when it does. 
            require(["geocortex/oe_amd/OE_Search/OE_SearchProvider"], function (obj) {
                dojo.getObject("geocortex.oe_amd.OE_Search", true);
                geocortex.oe_amd.OE_Search.OE_SearchProvider = obj.GeoNamesSearchProvider;
            });
            return _this;
        }
        return OE_SearchModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_SearchModule = OE_SearchModule;
});

},
"geocortex/oe_amd/OE_Search/OE_SearchProvider": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/infrastructure/search/SearchProviderBase", "geocortex/infrastructure/FeatureAttribute", "geocortex/infrastructure/FeatureSet", "geocortex/infrastructure/Feature", "geocortex/infrastructure/eventArgs/SearchProgressEventArgs", "geocortex/infrastructure/search/SearchManager"], function (require, exports, SearchProviderBase_1, FeatureAttribute_1, FeatureSet_1, Feature_1, SearchProgressEventArgs_1, SearchManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SearchProvider = /** @class */ (function (_super) {
        __extends(OE_SearchProvider, _super);
        // Initializes a new instance of the GeoNamesSearchProvider class.
        function OE_SearchProvider(app, libraryId) {
            var _this = _super.call(this, app, libraryId) || this;
            _this.SEARCH_TYPE = "GeoNames";
            _this.searchUniqueId = 0;
            _this.currentSearchId = null;
            _this.searchCancelState = {};
            // Cross origin requests for data from non-CORS enabled servers need to be proxied.
            _this.geoNamesUrl = "./proxy.ashx?http://api.geonames.org/wikipediaSearch";
            _this.geoNamesQueryTemplate = "?q={0}&username={1}&type=json";
            // Format strings for displaying results. Follow the same syntax as used in RestManager.
            _this.labelFormat = "{title}";
            _this.descriptionFormat = "<img src='{thumbnailImg}'/><p>{summary}</p><strong>Latitude: </strong>{lat}<br/><strong>Longitude: </strong>{lng}<br/><strong>Elevation: </strong>{elevation}m";
            _this.name = "GeoNames Wikipedia Search";
            _this.description = "Search provider for the GeoNames geolocated Wikipedia web service.";
            _this.isEnabled = true;
            return _this;
        }
        // Initializes the provider.
        OE_SearchProvider.prototype.initialize = function (config) {
            _super.prototype.initialize.call(this, config);
            // Check that a username was provided.
            if (config && config.geoNamesUser) {
                this.geoNamesUser = config.geoNamesUser;
            }
            else {
                this.isEnabled = false;
                this.app.trace.warning("No GeoNames user was provided. The GeoNames Search Provider will not be available.");
            }
        };
        // If this provider is configured and enabled, then this method will be automatically called when the user initiates a search.
        OE_SearchProvider.prototype.search = function (targetFsc, searchText) {
            var _this = this;
            var searchId = this.searchUniqueId++;
            this.currentSearchId = searchId;
            this.searchCancelState[searchId] = false;
            var eventArgs = new SearchProgressEventArgs_1.SearchProgressEventArgs();
            eventArgs.results = targetFsc;
            eventArgs.error = null;
            eventArgs.searchType = this.SEARCH_TYPE;
            eventArgs.query = searchText;
            eventArgs.endpointUrl = this.geoNamesUrl;
            var updateProviderStatus = function () {
                _this.status = SearchManager_1.Status.IDLE;
            };
            // A feature set collection must be provided.
            if (!targetFsc) {
                this.app.trace.error("GeoNames Search Provider: Cannot perform search without a feature set collection.");
                return;
            }
            // Search text must be provided.
            if (!searchText) {
                this.app.trace.error("GeoNames Search Provider: Cannot perform search without search text.");
            }
            // Set the status to searching, and fire the appropriate event.
            this.status = SearchManager_1.Status.SEARCHING;
            eventArgs.status = this.status;
            this.app.event("SearchProgressEvent").publish(eventArgs);
            // Populate the query URL with parameters.
            var queryUrl = this.geoNamesUrl + this.geoNamesQueryTemplate.format(encodeURIComponent(searchText), this.geoNamesUser);
            // Query the endpoint.
            dojo.xhrGet({
                url: queryUrl,
                load: function (response) {
                    // Only process the data if the operation has not been cancelled.
                    if (!_this.searchCancelState[searchId]) {
                        // Parse the result into GeoNames Wikipedia result objects, as defined in the interface above.
                        // 'geonames' is the top level array containing these results.
                        var results = JSON.parse(response).geonames ? JSON.parse(response).geonames : null;
                        if (results && results.length > 0) {
                            var fs = new FeatureSet_1.FeatureSet({ "app": _this.app });
                            // Add info about the attributes to the FeatureSet.
                            var attributeNames = Object.keys(results[0]);
                            for (var _i = 0, attributeNames_1 = attributeNames; _i < attributeNames_1.length; _i++) {
                                var attributeName = attributeNames_1[_i];
                                fs.attributes.addItem(new FeatureAttribute_1.FeatureAttribute("", attributeName));
                            }
                            fs.displayName.set(_this.name);
                            // Loop through each result and add it.
                            for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
                                var result = results_1[_a];
                                var location = new esri.geometry.Point(result.lng, result.lat, new esri.SpatialReference(4326));
                                var graphic = new esri.Graphic(location, null, result);
                                var feature = new Feature_1.Feature({ "graphic": graphic });
                                // Set label and description format.
                                feature.labelFormat.set(_this.labelFormat);
                                feature.descriptionFormat.set(_this.descriptionFormat);
                                feature.zoomScale.set(8000);
                                fs.addFeature(feature);
                            }
                            targetFsc.featureSets.addItem(fs);
                        }
                    }
                    updateProviderStatus();
                    if (!_this.searchCancelState[searchId]) {
                        // We've done this search.
                        eventArgs.status = _this.status;
                        _this.app.event("SearchProgressEvent").publish(eventArgs);
                    }
                },
                error: function (error) {
                    updateProviderStatus();
                    // Only process the error if the operation has not been cancelled.
                    if (!_this.searchCancelState[searchId]) {
                        eventArgs.status = SearchManager_1.Status.ERROR;
                        eventArgs.error = error;
                        eventArgs.message = error.message;
                        _this.app.event("SearchProgressEvent").publish(eventArgs);
                    }
                }
            });
        };
        // Search providers should support the cancelling of searches. This method will be called in the event this happens.
        OE_SearchProvider.prototype.cancelSearch = function () {
            // We can only cancel a search that is currently happening.
            if (this.status === SearchManager_1.Status.SEARCHING) {
                this.searchCancelState[this.currentSearchId] = true;
            }
        };
        return OE_SearchProvider;
    }(SearchProviderBase_1.SearchProviderBase));
    exports.OE_SearchProvider = OE_SearchProvider;
});

},
"url:/geocortex/oe_amd/OE_Search/OE_Search.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Search/OE_Search.html", "html", markup1);
});

})();
