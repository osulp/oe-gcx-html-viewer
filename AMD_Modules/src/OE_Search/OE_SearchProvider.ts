/// <reference path="./../../_Definitions/Framework.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts"/>

import { SearchProviderBase } from "geocortex/infrastructure/search/SearchProviderBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { FeatureAttribute } from "geocortex/infrastructure/FeatureAttribute";
import { FeatureSet } from "geocortex/infrastructure/FeatureSet";
import { Feature } from "geocortex/infrastructure/Feature";
import { FeatureSetCollection } from "geocortex/infrastructure/FeatureSetCollection";
import { SearchProgressEventArgs } from "geocortex/infrastructure/eventArgs/SearchProgressEventArgs";
import { Status } from "geocortex/infrastructure/search/SearchManager";

// Structure of the JSON object returned for each result from the GeoNames Wikipedia search endpoint.
export interface OE_SearchResultsObject {
    summary: string;
    rank: number;
    title: string;
    wikipediaUrl: string;
    elevation: number;
    countryCode: string;
    lng: number;
    feature: string;
    thumbnailImg: string;
    geoNameId: number;
    lang: string;
    lat: number;
}

export class OE_SearchProvider extends SearchProviderBase {

    // The GeoNames user to run the search. To use this sample in your own projects, create a user for your application at www.geonames.org
    geoNamesUser: string;

    private SEARCH_TYPE: string = "GeoNames";
    private searchUniqueId: number = 0;
    private currentSearchId: number = null;
    private searchCancelState: { [searchId: number]: boolean; } = {};

    // Cross origin requests for data from non-CORS enabled servers need to be proxied.
    private geoNamesUrl: string = "./proxy.ashx?http://api.geonames.org/wikipediaSearch";
    private geoNamesQueryTemplate: string = "?q={0}&username={1}&type=json";

    // Format strings for displaying results. Follow the same syntax as used in RestManager.
    private labelFormat: string = "{title}";
    private descriptionFormat: string = "<img src='{thumbnailImg}'/><p>{summary}</p><strong>Latitude: </strong>{lat}<br/><strong>Longitude: </strong>{lng}<br/><strong>Elevation: </strong>{elevation}m";

    // Initializes a new instance of the GeoNamesSearchProvider class.
    constructor(app: ViewerApplication, libraryId: string) {
        super(app, libraryId);

        this.name = "GeoNames Wikipedia Search";
        this.description = "Search provider for the GeoNames geolocated Wikipedia web service.";
        this.isEnabled = true;
    }

    // Initializes the provider.
    initialize(config: any) {
        super.initialize(config);

        // Check that a username was provided.
        if (config && config.geoNamesUser) {
            this.geoNamesUser = config.geoNamesUser;
        } else {
            this.isEnabled = false;
            this.app.trace.warning("No GeoNames user was provided. The GeoNames Search Provider will not be available.");
        }
    }

    // If this provider is configured and enabled, then this method will be automatically called when the user initiates a search.
    search(targetFsc: FeatureSetCollection, searchText: string) {

        let searchId = this.searchUniqueId++;
        this.currentSearchId = searchId;
        this.searchCancelState[searchId] = false;

        let eventArgs = new SearchProgressEventArgs();
        eventArgs.results = targetFsc;
        eventArgs.error = null;
        eventArgs.searchType = this.SEARCH_TYPE;
        eventArgs.query = searchText;
        eventArgs.endpointUrl = this.geoNamesUrl;

        let updateProviderStatus = () => {
            this.status = Status.IDLE;
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
        this.status = Status.SEARCHING;
        eventArgs.status = this.status;
        this.app.event("SearchProgressEvent").publish(eventArgs);

        // Populate the query URL with parameters.
        let queryUrl = this.geoNamesUrl + this.geoNamesQueryTemplate.format(encodeURIComponent(searchText), this.geoNamesUser);

        // Query the endpoint.
        dojo.xhrGet({
            url: queryUrl,
            load: (response: string) => {

                // Only process the data if the operation has not been cancelled.
                if (!this.searchCancelState[searchId]) {

                    // Parse the result into GeoNames Wikipedia result objects, as defined in the interface above.
                    // 'geonames' is the top level array containing these results.
                    var results: OE_SearchResultsObject[] = JSON.parse(response).geonames ? JSON.parse(response).geonames : null;

                    if (results && results.length > 0) {
                        var fs = new FeatureSet({ "app": this.app });

                        // Add info about the attributes to the FeatureSet.
                        var attributeNames: string[] = Object.keys(results[0]);

                        for (let attributeName of attributeNames) {
                            fs.attributes.addItem(new FeatureAttribute("", attributeName));
                        }

                        fs.displayName.set(this.name);

                        // Loop through each result and add it.
                        for (let result of results) {
                            var location = new esri.geometry.Point(result.lng, result.lat, new esri.SpatialReference(4326));
                            var graphic = new esri.Graphic(location, null, result);
                            var feature = new Feature({ "graphic": graphic });

                            // Set label and description format.
                            feature.labelFormat.set(this.labelFormat);
                            feature.descriptionFormat.set(this.descriptionFormat);
                            feature.zoomScale.set(8000);
                            fs.addFeature(feature);
                        }

                        targetFsc.featureSets.addItem(fs);
                    }
                }

                updateProviderStatus();

                if (!this.searchCancelState[searchId]) {

                    // We've done this search.
                    eventArgs.status = this.status;
                    this.app.event("SearchProgressEvent").publish(eventArgs);
                }
            },

            error: (error: Error) => {

                updateProviderStatus();

                // Only process the error if the operation has not been cancelled.
                if (!this.searchCancelState[searchId]) {
                    eventArgs.status = Status.ERROR;
                    eventArgs.error = error;
                    eventArgs.message = error.message;
                    this.app.event("SearchProgressEvent").publish(eventArgs);
                }
            }
        });
    }

    // Search providers should support the cancelling of searches. This method will be called in the event this happens.
    cancelSearch() {

        // We can only cancel a search that is currently happening.
        if (this.status === Status.SEARCHING) {
            this.searchCancelState[this.currentSearchId] = true;
        }
    }
}