/// <reference path="arcgis-js-api.d.ts" />
/// <reference path="modernizr.d.ts" />
/// <reference path="bluebird.d.ts" />
/// <reference path="framework.d.ts" />
/// <reference path="dojo.d.ts" />
/// <reference path="LayerTheme.Rest.d.ts" />
/// <reference path="BaseMap.Rest.d.ts" />
/// <reference path="LayerList.Rest.d.ts" />
/// <reference path="Chart.Rest.d.ts" />
/// <reference path="Charting.Infrastructure.d.ts" />
declare module geocortex.essentials {
    /**
    * Base class for objects that are typically initialized from a REST endpoint, e.g. a {@link Site}, or a {@link MapService}.
    *
    * Provides methods, events and properties common to objects commonly initialized in an asynchronous fashion.
    * This is the sequence of an asynchronous initialization:
    * 1. The class is instantiated.
    * 2. The initialize method is called by something looking to initialize the resource.
    * 3. The subclass asynchronously calls a REST endpoint.
    * 4. Once the asynchronous call has completed, sets the {@link isInitialized} property to true.
    * 5. If the asynchronous call returned an error, sets the {@link initializationFailure} property to the exception and fires the {@link initializationFailed} event.
    * 6. The object fires the {@link onInitialized} event, regardless of whether there were errors or not.
    */
    class AsyncInitializable {
        /** The exception that occurred if the object could not be initialized. */
        initializationFailure: Error;
        /** Whether or not the object was successfully initialized. */
        isInitialized: boolean;
        /** The URL that this resource was initialized from. */
        url: string;
        /** The {@link geocortex.essentials.Site} that this resource belongs to. */
        site: Site;
        /**
         * Occurs when initialization of this object fails.
         * @event
         */
        onInitializationFailed: (error: Error) => void;
        /**
         * Occurs when initialization succeeds with a response from the REST endpoint. Depending on the API,
         * this response may actually be an error message served as a correct HTTP response.
         * @event
         */
        onInitialized: (sender: any) => void;
        /** @private */
        _initializing: boolean;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.AsyncInitializable} class.
         * @param url The remote endpoint to initialize against, typically a REST endpoint serving JSON responses.
         */
        constructor(url: string);
        /**
         * Initializes the {@link geocortex.essentials.AsyncInitializable}.
         * This is an asynchronous method, you may subscribe to the {@link onInitialized}
         * and {@link onInitializationFailed} events for completion information.
         */
        initialize(obj?: any): void;
        doWhenInitialized(callback: (ai: AsyncInitializable) => void): void;
        /**
         * Performs a callback function when this instance has been initialized. If this instance
         * is already initialized when this function is called, the callback function will execute
         * immediately.
         * @param scope The scope to using when executing the callback - i.e. the value of
         * the 'this' variable in the callback function. This parameter may be ommitted in which cased
         * the first parameter will be used as the callback function.
         * @param callback The callback function to execute when this instance has been initialized.
         */
        doWhenInitialized(scope: any, callback: (ai: AsyncInitializable) => void): void;
        /** @private */
        _configureObject(results: any, deepInitialize?: boolean): void;
        /** @private */
        _initializationFailedHandler(err: Error): void;
        /** @private */
        _initializedHandler(sender: any): void;
        /** @private */
        _restErrorHandler(error: Error): void;
        /** @private */
        _restLoadHandler(deepInitialize: boolean, result: any): void;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Represents a URI that has been decomposed for manipulation so that it can be reformulated.
     * @private
     */
    class DecomposedUri {
        /** The original URI that this instance was created from. */
        originalUri: string;
        /** A manipulatable component of the URI that includes all parts of the URI except query and fragment. */
        schemeHostAndPath: string;
        /**
         * A manipulatable component of the URI that represents the query string as a set of key-value pairs (as an object).
         * You can add, remove, and update values in this object.
         */
        query: any;
        /**
         * A manipulatable component of the URI that represents the fragment as a set of key-value pairs (as an object).
         * You can add, remove, and update values in this object.
         */
        fragment: any;
        /**
         * Initializes a new instance of the {@link DecomposedUri} class.
         * @param uri The URI to consume.
         */
        constructor(uri: string);
        /**
         * Recomposes back into a URI.
         */
        recompose(): string;
        /**
        * @private
        */
        private anyProperties(object);
        /**
         * Gets the server host for a given URI.
         */
        static getHost(uri: string): string;
        static appendToPath(url: string, pathPart: string): string;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Static utility methods for strings and common operations involving strings.
     */
    class StringUtilities {
        /**
         * Determines if one string ends with another string.
         * @param str The string to check a suffix against.
         * @param suffix The string suffix to check.
         */
        static endsWith(str: string, suffix: string): boolean;
        /**
         * Replaces a specific set of {@link Layer} tokens with layer values, given a token and the {@link Layer}.
         * @param match The string that represents the token to replace.
         * @param layer The {@link Layer} to use when substituting a value.
         */
        static replaceLayerTokens(match: string, layer: Layer): string;
        /**
         * Replaces a specific set of {@link MapService} tokens with map service values, given a token and the {@link MapService}.
         * @param match The string that represents the token to replace.
         * @param mapService The {@link MapService} to use when substituting a value.
         */
        static replaceMapServicetokens(match: string, mapService: geocortex.essentials.MapService): string;
    }
}
declare module geocortex.essentials {
    /**
     * Stores a token and other ancillary information about the token and the user it was generated for.
     */
    class TokenResult {
        /** The token itself, that is used to gain access to protected resources. */
        token: string;
        /** The user name associated with the token.*/
        userName: string;
        /** The date the token expires on. */
        expiresOn: Date;
    }
}
declare module geocortex.essentials {
    /**
     * A lightweight OAuth2Client helper.
     */
    class OAuth2Client {
        /**
         * Gets token details from the URL, that have been specified in the OAuth2 implicit grant form.
         * The parameters should be in the URL fragement, with names: access_token, username, and expires_in. */
        static getTokenFromImplicitGrant(): TokenResult;
        /**
         * Gets the error parameter from the URL fragement indicating there was a problem with the login. */
        static getErrorFromImplicitGrant(): OAuth2Error;
        /**
         * Determines whether or not a token has been supplied using an implicit grant. In other words,
         * whether or not there is an access_token parameter in the fragment (hash) of the document URL.
         * @returns whether or not an access_token is present in the fragment (hash) of the document URL.
         */
        static applicationHasImplicitGrant(): boolean;
        /**
         * Determines whether or not an error has been supplied using an implicit grant. In other words,
         * whether or not there is an error parameter in the fragment (hash) of the document URL.
         * @returns whether or not an error is present in the fragment (hash) of the document URL.
         */
        static applicationHasImplicitGrantError(): boolean;
        /** @private */
        private static hasFragmentParameter(paramName);
        /**
         * Redirects to the logon page, using the implicit grant style that is recommended for HTML/JavaScript web applications.
         * @param logonUrl The URL of the OAuth2 logon page.
         * @param clientId The client ID to use for logging in. That should represent *this* application.
         */
        static redirectToLogOnPage(logonUrl: string, clientId: string): void;
        /**
         * Removes all implicit grant parameters from the URL and updates the URL hash in the browser
         * so that it doesn't contain those parameters.
         */
        static removeImplicitGrantParamsAndUpdateUrlHash(): void;
        private static removeImplicitGrantParams(uri);
    }
    /**
     * Represents an OAuth 2 error. See http://tools.ietf.org/html/rfc6749 for more information on OAuth
     * and OAuth errors.
     */
    class OAuth2Error {
        /** The error code that results if the user denies the authorization. */
        static ACCESS_DENIED_ERROR_CODE: string;
        /** The well known OAuth 2 error code. These are well known values, see http://tools.ietf.org/html/rfc6749. */
        code: string;
        /** Text providing additional information, used to assist the client developer in understanding the error that occurred. */
        description: string;
    }
}
declare module geocortex.essentials {
    /**
     * The ArcGisPortalSecurityContext contains the necessary information to be able to authenticate with [ArcGIS Online](https://www.arcgis.com/),
     * to initiate the authentication (perform a redirect to their OAuth login page), and to register a token with the {@link esri.IdentityManager}
     * so that map service requests will use the supplied token from [ArcGIS Online](https://www.arcgis.com/).
     * All of these actions are performed through the {@link initiate} method.
     */
    class ArcGisPortalSecurityContext {
        /** The stored token result.*/
        tokenResult: TokenResult;
        /** An error if there is one. For example, if the user cancelled the log on process. */
        error: OAuth2Error;
        /** The base URL of the ArcGIS Portal instance (eg. "http://www.arcgis.com/sharing/") */
        baseUrl: string;
        /**
         * A collection of domains that the token should be applied to. In other words, the ArcGIS Online token
         * will be applied to any of the domains that match this collection.
         */
        domains: string[];
        /** The client ID (or application ID) of the application that we're accessing resources on behalf of. */
        clientId: string;
        /**
         * Initializes a new instance of the {@link ArcGisPortalSecurityContext} class.
         * @param baseUrl The base URL of the ArcGIS Portal instance represented by this instance of the {@link ArcGisPortalSecurityContext}.
         * @param domains The collection of domains that the token result should be applied to.
         * @param clientId The ID of the client application.
         */
        constructor(baseUrl: string, domains: string[], clientId: string);
        /**
         * Ensures that we have a token available from an OAuth2 log on. Will redirect to the login page if a token has not yet been supplied in the URL.
         */
        initiate(): boolean;
        /**
         * Gets the URL of the OAuth2 login page (base url + oauth2/authorize).
         */
        getLogOnUrl(): string;
        /**
         * Gets an ArcGIS Portal token for the service located at the specified URI, or null if a Portal token is not assigned to this service.
         * @param serviceUri The portal service URI.
         */
        getToken(serviceUri: string): string;
        /**
         * Determines if the portal security represented by this instance should be applied to a particular service, located at the specified URI.
         * @param serviceURi The service to check.
         */
        appliesTo(serviceUri: string): boolean;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a base map.
     * A base map is one or more map services that acts as a reference for the map.
     */
    class BaseMap {
        /** The display name. */
        displayName: string;
        /** The Essentials map that this base map belongs to. */
        essentialsMap: Map;
        /**
         * The collection of {@link Extension} objects associated with the base map.
         * Extensions can be defined by the administrator on the server.
         */
        extensions: Extension[];
        /** The ID of the {@link BaseMap} */
        id: string;
        /** URI to an icon representation of this map service, for display in client applications. */
        iconUri: string;
        /** The properties of the {@link BaseMap}, as defined by the administrator on the server. */
        properties: any;
        /** The collection of services that belong to this base map. */
        services: BaseMapService[];
        constructor(essentialsMap: Map);
    }
}
declare module geocortex.essentials {
    /**
     * Represents an individual map service within a base map.
     */
    class BaseMapService {
        /** The map service. */
        mapService: MapService;
        /** Reserved for future use, such as per-base map opacity settings. */
        constructor(mapService: MapService);
    }
}
declare module geocortex.essentials.catalog {
    /** An object which contains values to initialize a {@link geocortex.essentials.Layer}.
      * Refer to {@link geocortex.essentials.Layer} for more information.
      */
    interface LayerCatalogDetailEntry {
        /** The layer's ID. */
        id: string;
        /** If the layer is dynamic. */
        isDynamic: boolean;
        /** If the layer is visible. */
        visible: boolean;
    }
}
declare module geocortex.essentials {
    /**
     * An object that represents the options for exporting the map image.
     */
    class ExportMapImageOptions {
        /** The default output format of the generated map image. */
        defaultOutputFormat: string;
        /** Indicates whether including georeference data in the export is allowed. */
        allowIncludeGeoreferenceData: boolean;
        /**
         * Initializes a new instance of the {@link ExportMapImageOptions} class.
         * @param defaultOutputFormat The default output format of the generated map image.
         * @param allowIncludeGeoreferenceData Indicates whether including georeference data in the export is allowed.
         */
        constructor(allowIncludeGeoreferenceData: boolean, defaultOutputFormat?: string);
    }
}
/**
 * Environment Type for Bing services.
 * @private
 */
declare module geocortex.essentials.exportMap.BingEnvironment {
    /** Represents the production environment. */
    var PRODUCTION: string;
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a feature to include in the exported map.
     * @private
     */
    interface ExportFeature {
        /** The geometry of the feature to export .*/
        geometry: any;
        /** The exportable representation of the feature's symbol. */
        symbol: ExportSymbol;
        /** The attributes of the feature to export. */
        attributes: any;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a layer to export, including any exportable features belonging to that layer and present in the viewer on the client side.
     * @private
     */
    interface ExportLayer {
        /** The definition of the layer's metadata relevant to the export. */
        layerDefinition: ExportMapLayerDefinition;
        /** Collection of serialized graphics. */
        featureSet: ExportLayerFeatureSet;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a set of features to export.
     * @private
     */
    interface ExportLayerFeatureSet {
        /** A string representing the type of geometry contained in the features array. */
        geometryType: string;
        /** An array of {@link ExportFeature}. */
        features: ExportFeature[];
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a layer included in the export map.
     * @private
     */
    interface ExportMapLayerDefinition {
        /** The name of the layer.*/
        name: string;
        /** Arbitrary drawing info for the layer to include in the printing request made to Essentials. */
        drawingInfo?: any;
        /** A string representing the type of geometry contained in the export layer's features array. */
        geometryType: string;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents an instance of a symbol present in the exported map.
     * @private
     */
    interface ExportSymbol {
        /** The URL of the symbol, if it's a {@link esri.symbols.PictureMarkerSymbol} */
        url: string;
        /** The base64 encoded representation of the image, if it was available. If not, {@link url} should be used. */
        data: string;
        /** The x axis offset. */
        xoffset: number;
        /** The y axis offset. */
        yoffset: number;
        /** Image height. */
        height: number;
        /** Image width. */
        width: number;
        /** Angle of the symbol. */
        angle: number;
        /**  The type of symbol. */
        type: string;
    }
}
declare module geocortex.essentials {
    /**
     * Describes an object that represents feature clustering settings for a map service.
     */
    interface FeatureCluster {
        /**
         * Whether Feature Clustering is currently enabled or not.
         */
        enabled: boolean;
        /**
         * Whether the user has the ability to turn clustering on/off.
         */
        userCanToggle: boolean;
        /**
         * Radius (in pixels) to group features into clusters by.
         */
        radius: number;
        /**
         * Maximum number of features for a cluster to contain.
         */
        maximumFeatures: number;
        /**
         * Background Color of clusters.
         */
        backgroundColor: number[];
        /**
         * Color of label text for clusters.
         */
        labelColor: number[];
    }
}
declare module geocortex.essentials {
    /**
     * Describes an object that represents feature heat map settings for a map service.
     */
    interface FeatureHeatMap {
        /**
         * Whether or not the feature heat map settings are enabled.
         */
        enabled: boolean;
        /**
         * Whether or not the end users can enable or disable feature heat maps.
         */
        userCanToggle: boolean;
        /**
         * Whether or not the feature heat map will respect the layer's scale range.
         */
        respectScaleRange: boolean;
        /**
         * A list of gradient colors represented as a number list in the form [R, G, B, A] to use for the heat map colors.
         */
        gradient: number[][];
        /**
         * A list of ratios to be used as color stops for the feature heat map.
         */
        offset: number[];
        /**
         * The heat radius (in pixels) for the feature heat map.
         */
        intensity: number;
        /**
         * The name of the attribute field used to weight the heatmap points.
         */
        field?: string;
        /**
         * The layer's default renderer.
         */
        defaultRenderer?: esri.renderer.Renderer;
        /**
         * The layer's default minimum scale range.
         */
        defaultMinScale?: number;
        /**
         * The layer's default maximum scale range.
         */
        defaultMaxScale?: number;
    }
}
declare module geocortex.essentials {
    /** Args for the layerThemeChangingEvent and layerThemeChangedEvent thrown by the {@link geocortex.essentials.LayerThemesInfo} object */
    interface LayerThemeEventArgs {
        currTheme: geocortex.essentials.LayerTheme;
        prevTheme: geocortex.essentials.LayerTheme;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Represents an error resulting from an image encoding operation.
     */
    interface EncodeImageError {
        /** The URL which the image was encoded from. */
        url: string;
        /** Any errors which occured. */
        error: any;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Represents a successful result of an image encoding operation.
     */
    interface EncodeImageResult {
        /** The URL which the image was encoded from. */
        url: string;
        /** The base64 data. */
        data: string;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a collection of features to export, modeled by a collection of layers bearing metadata and feature collections.
     * @private
     */
    interface ExportFeatureCollection {
        layers: ExportLayer[];
    }
}
/**
 * @private
 * String constants that represent constants used by Esri's Web Map builder.
 */
declare module geocortex.essentials.exportMap.ExportMapTypes {
    var WEBTILED: string;
    var BINGAERIAL: string;
    var BINGAERIALLABELS: string;
    var BINGROADS: string;
    var BINGHYBRID: string;
}
declare module geocortex.essentials.exportMap {
    /**
     * Export options pertaining to print/render settings.
     * @private
     */
    interface ExportOptions {
        /** The desired resolution of output image, in DPI (Dots Per Inch). */
        dpi: number;
        /** Array of dimensions equal to `{[Width],[Height]}`. */
        outputSize: number[];
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Layout options for exporting printable maps.
     * @private
     */
    interface ExportLayoutOptions {
        /** The id of the selected grid to overlay on the output image. */
        grid: string;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents options to apply to the exported map.
     * @private
     */
    interface ExportMapOptions {
        /** The map scale. */
        scale: number;
        /** The extent of the map. */
        extent: esri.geometry.Extent;
        /** The extent of the map. */
        spatialReference?: esri.SpatialReference;
        /** The rotation of the map. */
        rotation?: number;
        /** Array of time ticks equal to `{BeginTime, EndTime}`. */
        time?: number[];
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents a {@link MapService} bundled for exporting to Essentials for rendering/printing.
     * @private
     */
    interface ExportMapService {
        /** The ID of the corresponding {@link MapService}. */
        id: string;
        /** Opacity to render the {@link MapService} with, ranging from `0` to `1`, where `0` is completely transparent and `1` is fully opaque. */
        opacity: number;
        /** The visibility of the corresponding {@link MapService}. Set to `true` is the service is visible, and `false` if not. */
        visibility?: boolean;
        /** The URL of the corresponding {@link MapService}. */
        url?: string;
        /** IDs of any visible layers belonging to the service.*/
        visibleLayers?: number[];
        /** The map service type that this represents. */
        type?: string;
        /** A representation of the added dynamic or feature layers. */
        layers?: any;
        /** The server type for a Bing service. */
        serverType?: string;
        /** The service token if one exists. */
        token?: string;
        /** Arbitrary drawing info for consumption by Essentials. */
        drawingInfo?: any;
        /** Layer definition for the layers belonging to the {@link MapService}. */
        layerDefinition?: any;
        /** The ID of an essentials map service populated based on the `attributionDataUrl` property. */
        mapServiceId?: string;
        /** A collection representing layers to export and print and the feature graphics they contain. */
        featureCollection?: ExportFeatureCollection;
        /** A `WHERE` clause representing the layer's definition expression. */
        where?: string;
        /**
         * The minimum scale a layer can be visible at.
         */
        minScale?: number;
        /**
         * The maximum scale a layer can be visible at.
         */
        maxScale?: number;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Represents an object that is sent to Essentials for printing/exporting. It is a mashup of Essentials and Esri JSON.
     * @private
     */
    interface ExportContext {
        /** Contains options related to the desired state of the printed map. */
        exportOptions: ExportOptions;
        /** Contains options related to the desired layout and look of the printed map. */
        layoutOptions: ExportLayoutOptions;
        /** Contains options related to the desired location and extent of the printed map. */
        mapOptions: ExportMapOptions;
        /**
         * Representation of the {@link geocortex.essentials.MapService}.
         */
        operationalLayers: ExportMapService[];
        /** The ExportContext version. */
        version?: string;
        /** The current Geocortex Essentials product version. */
        product?: string;
    }
}
/**
 * Contains models and operations used in exporting map images and running print jobs.
 * @private
 */
declare module geocortex.essentials.exportMap {
}
declare module geocortex.essentials.exportMap {
    /**
     * Used for exporting a printable representation of the current state of an {@link esri.Map}.
     * @private
     */
    class ExportMapTask {
        /**
         * A resource which the Essentials ExportContext print will use. Can be of type {@link Map}, {@link PrintTemplate} or {@link Report}.
         */
        resource: essentials.Map | PrintTemplate | Report;
        private _esriMap;
        private _essentialsRestUrl;
        private _site;
        /**
         * Creates an instance of a {@link ExportMapTask}.
         * @param resource A resource which the Essentials ExportContext print will use. Can be of type {@link Map}, {@link PrintTemplate} or {@link Report}.
         */
        constructor(resource: Map | PrintTemplate | Report);
        /**
         * Infers an {@link ersi.Map}, Essentials REST URL and Essentials Site needed to run the ExportContext operation.
         * @param resource A resource which the Essentials {@link ExportContext} print will use.
         */
        private _populateFromResource(resource);
        /**
         * Generates a link to a map image with the given parameters and generated by Essentials.
         * @param buildParameters The {@link ExportMapParameters} which will be used when creating the printed map.
         */
        generateMapImageUrl(buildParameters: ExportMapParameters): dojo.Deferred;
        /**
         * Gets a printing definition for an esri Map.
         * @param printingTask The {@link PrintTask}. This will be used to generate the raw {@link ExportContext} object.
         * @param map A {@link esri.Map} which will have a printing definition generated for.
         * @return An {@link ExportContext} object representing the map's printing state.
         */
        private _getWebMap(printingTask, map);
        /**
         * Gets a printing definition for an {@link esri.Map}.
         * @return An {@link ExportContext} object representing the map's printing state.
         */
        private _getPrintingObjectForEssentials();
        /**
         * Converts picture marker symbols from relative urls into encoded data or absolute urls.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _convertSymbolsToBase64(exportContext);
        /**
         * Measurement markup needs to be transformed. We need to replace the objects which were created by ESRI with our own which are modified by {@link utilities.PrintUtilities}
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _adjustMeasurementSymbols(webMapObject);
        /**
         * Text markup needs to be transformed. We need to replace the objects which were created by ESRI with our own which are modified by {@link utilities.PrintUtilities}
         * @param webMapObject The {@link ExportContext} which will be modified.
         */
        private _adjustText(webMapObject);
        /**
         * Explicitly sets the visibility of each service layer. Otherwise, Essentials will use the service's default
         * visibility as configured in the site.
         */
        private _setServiceVisibilities(webMapObject);
        /**
         * Dynamic Layers need to have their LayerDefinitions changed so Essentials can understand them.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _handleDynamicLayerDefs(exportContext);
        /**
         * Feature Layers need some special attential. Esri builds them for us 99%, we just need to move some properties around.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _handleFeatureLayers(exportContext);
        /**
         * Removes any -1 values from visible layers array.
         * A value of -1 will be present if no layers are checked as visible in a map service.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _cleanOutVisibility(exportContext);
        /**
         * Modifies potential error causing configuration for WebTiledLayers and BingMaps into Essentials readable config.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _handleWebTiledLayers(exportContext);
        /**
         * Assigns an Essentials Map Service Id to the operational layers that contains
         * an attribution data url. This is needed since the id property of the operational
         * layer might not be accurate after we use esri's method to serialize the map.
         * (e.g. the id for a WMS or WMTS layer would be something like 'layer0' instead of the proper id)
         * @param exportContext The {@link ExportContext} which will be modified.
         * @param esriMap The {@link esri.Map} that contains information about the attributionDataUrl from which the
         * essentials map service Id can be extracted.
         */
        private _handleLayersAttribution(webMapObject, esriMap);
        /**
         * Removes the bitmap image(s) for heatmaps provided by ESRI from webMapObject,
         * and adds operational layers to webMapObject that correspond to the underlying
         * heatmap renderer(s) attached to the esriMap.
         * @param webMapObject the {@link ExportContext} to be modified
         * @param esriMap the {@link esri.Map} that contains the heatmap renderer(s) from which
         * the appropriate export information will be extracted
         */
        private _handleHeatmapRenderer(webMapObject, esriMap);
        /**
         * Removes the ESRI-provided export for clusters and prepares clustering information for export to the server,
         * where we re-query the feature data in order to provide clustering support for printing at different extents,
         * including large-format printing.
         * @param webMapObject the {@link ExportContext} to be modified
         * @param esriMap the {@link esri.Map} that contains the cluster layer(s) from which
         * the appropriate export information will be extracted
         */
        private _handleClusters(webMapObject, esriMap);
        /**
         * Removes any attributes from features which are not needed for printing. Attributes contribute to circular references and extra payload data.
         * @param exportContext The {@link ExportContext} which will be modified.
         */
        private _removeAttributes(exportContext);
        /**
         * Creates the request parameters for the ExportContext print operation.
         * @param buildParameters The {@link WebMapBuilderParameters} which the print operation will be created from.
         * @return A Promise which will contain the request parameters.
         */
        private _marshalContent(buildParameters);
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Interoperability interface for modeling the results of {@link PromiseUtilities.settle}.
     * This is a match for BlueBird's PromiseInspection object.
     */
    interface SettleInspection<T> {
        /** Checks if the underlying promise was fulfilled at the creation time of this inspection object. */
        isFulfilled(): boolean;
        /** Checks if the underlying promise was rejected at the creation time of this inspection object. */
        isRejected(): boolean;
        /** Checks if the underlying promise was deferred at the creation time of this inspection object. */
        isPending(): boolean;
        /**
         * Gets the fulfillment value of the underlying promise. Throws `TypeError` if the promise wasn't fulfilled at the creation time of this inspection object.
         * @throws `TypeError`
         */
        value(): T;
        /**
         * Gets the rejection reason for the underlying promise. Throws `TypeError` if the promise wasn't rejected at the creation time of this inspection object.
         * @throws `TypeError`
         */
        reason(): any;
    }
    /**
     * Contains utilities for working with `Promise` objects, including strategies for interoperating with different implementations of `Promise`.
     * For more information on Promises, see the [open standard](https://promisesaplus.com/).
     */
    class PromiseUtilities {
        /**
         * Based on BlueBird's `settle` function. Accepts an array of {@link Thenable} objects and returns a {@link Thenable} that is resolved when all of the
         * given promises are in a finalized state (i.e. either resolved or rejected).
         * @param promises An array of {@link Thenables} to settle.
         */
        static settle<T>(promises: Thenable<T>[]): Thenable<SettleInspection<T>[]>;
        /**
         * Based on BlueBird's `settle` function. Accepts an array of {@link Thenable} objects and returns a {@link Thenable} that is resolved when all of the
         * given promises are in a finalized state (i.e. either resolved or rejected).
         * @param promisePromises A promise of an array of {@link Thenables} to settle.
         */
        static settle<T>(promisePromises: Thenable<Thenable<T>[]>): Thenable<SettleInspection<T>[]>;
        /** @private */
        private static _settleImpl<T>(promises);
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Represents a `Promise`-like object. This interface is used for interoperability between different implementations of `Promise`.
     *
     */
    interface Thenable<T> {
        /**
         * Adds a callback to be invoked upon successful resolution or erroneous completion of the asynchronous operation.
         *
         * ```
         * doSomethingAsync()
         *     .then(result => console.log("Success!"), error => console.log("Something went wrong."));
         * ```
         *
         * @param onFulfilled The callback to invoke if the "thenable" resolved successfully.
         * @param onRejected The callback to invoke if the "thenable" resolved erroneously.
         * @param onProgress The progress handler to invoke as the underlying asynchronous operation progresses. **Note:** Not all implementations support this operation.
         */
        then<U>(onFulfilled: (value: T) => Thenable<U>, onRejected: (error: any) => Thenable<U>, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled: (value: T) => Thenable<U>, onRejected?: (error: any) => U, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled: (value: T) => U, onRejected: (error: any) => Thenable<U>, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled?: (value: T) => U, onRejected?: (error: any) => U, onProgress?: (note: any) => any): Thenable<U>;
        /**
         * Successfully resolves the "thenable" with the given value.
         * @param val The resolved value that the asynchronous operation produced.
         */
        resolve(val: T): Thenable<T>;
        /**
         * Rejects the "thenable", invoking any attached rejection handlers and applying the supplied arguments.
         * @param args Abritrary, optional arguments to pass. These typically represent the erroneous state that caused the operation to fail.
         */
        reject(...args: any[]): Thenable<T>;
        /**
         * Rejects the "thenable", invoking any attached rejection handlers and applying the supplied arguments.
         * @param args Abritrary, optional arguments to pass. These typically represent the erroneous state that caused the operation to fail.
         */
        rejectWith(context: any, ...args: any[]): Thenable<T>;
    }
}
declare module geocortex.essentials {
    /**
     * ExtentManager arbitrates potentially conflicting {@link esri.Map}  navigation events. For example, a {@link Workflow} run on application start up may
     * attempt to zoom the map to a particular location while a custom module attempts to navigate to another.
     *
     * In order to classify and prioritize competing map navigation requests, the {@link ExtentManager} offers an arbitrary system of navigation
     * priorities. These are known as 'extent changes' and each carries a priority value based on the nature of the change (i.e. how 'important' it is).
     *
     * @docs-hide-from-nav
     * @private
     */
    class ExtentManager {
        private _map;
        private _currentExtentChangePriority;
        private _queuedExtentChangePriority;
        private _queuedExtentChange;
        private _extentChangeInProgress;
        private _fitTiledMapsToExtent;
        private _newLayers;
        private _initialExtent;
        private currentExtentChangeHandle;
        private _firstMapResizeExecuted;
        /**
         * Initializes a new instance of the {@link ExtentManager} class.
         * @param map The map that this {@link ExtentManager} arbitrates.
         * @param fitToExtent Whether or not to force tiled maps to show up completely in the given map extent
         */
        constructor(map: esri.Map, fitToExtent?: boolean);
        setInitialExtent(initialExtent: esri.geometry.Extent): void;
        private _setInitialExtentImpl(initialExtent);
        private _onResize(extent, width, height);
        private _onReposition(x, y);
        private _onExtentChange();
        /**
         * Registers the given layer with the extent manager so that it can wait until the layer has sucessfully loaded to change the extent.
         * @param layer The layer to register.
         */
        registerLayer(layer: esri.layers.Layer): void;
        /**
         * Signals that the map has loaded, the initial extent is set after resizing the map appropriately and the extent manager is now allowed to arbitrate future extent changes.
         */
        firstResize(): void;
        /** @private */
        private _handleNextExtentChange();
        /**
         * Invokes the given function if there are no other extent changes in progress.
         * If there are other extent changes in progress, the priority of this extent change must be
         * greater than or equal to the priority of the current extent change for it to take effect.
         *
         * This methods allows for extent changes to be scheduled, but to not interfere with more "important" ones.
         *
         * @param extentChangeFunction The function to be executed if there are no higher priorities. This function most likely attempts to change the map extent.
         * @param priority The priority to be applied to this operation
         */
        changeExtentWithPriority(extentChangeFunction: (map: esri.Map) => dojo.Deferred, priority?: number): void;
        /**
         * Changes the map to the given extent if there are no other higher priority extent changes in progress.
         * If there are other extent changes in progress, the priority of this extent change must be
         * greater than or equal to the priority of the current extent change for it to take effect.
         * @param extent The extent to change to.
         * @param priority The priority to be applied to this operation
         */
        setExtentWithPriority(extent: esri.geometry.Extent, priority?: number): void;
        /**
         * Centers the map to the given point if there are no other higher priority extent changes in progress.
         * If there are other extent changes in progress, the priority of this extent change must be
         * greater than or equal to the priority of the current extent change for it to take effect.
         * @param center The point to center at.
         * @param priority The priority to be applied to this operation
         */
        centerAtWithPriority(center: esri.geometry.Point, priority?: number): void;
        /**
         * Zooms the map to the given scale if there are no other extent changes in progress.
         * If there are other extent changes in progress, the priority of this extent change must be
         * greater than or equal to the priority of the current extent change for it to take effect.
         * @param scale The scale to zoom to.
         * @param priority The priority to be applied to this operation
         */
        setScaleWithPriority(scale: number, priority?: number): void;
        /**
         * Resizes the map if there are no other extent changes in progress, as the resize operation may interface with the extent change.
         * If there are other extent changes in progress, the resize will wait for the current
         * extent change to finish and prevent all other extent changes until the resize is finished.
         * @param width The desired width of the map control.
         * @param width The desired height of the map control.
         * @param immediate Whether or not to resize immediately.
         */
        blockForResize(width: number, height: number, immediate?: boolean): void;
        /**
         * Repositions the map within the div if there are no other extent changes in progress.
         * If there are other extent changes in progress, the reposition will wait for the current
         * extent change to finish and prevent all other extent changes until the reposition is finished.
         */
        blockForReposition(): void;
        private _isExtentChangeBlocked();
        private _isRepositionBlocked();
        private _isResizeBlocked();
        private _hasLoaded();
    }
}
declare module geocortex.essentials {
    /**
     * Represents information about an Essentials {@link Layer}.
     */
    class EssentialsLayerInfo {
        /** The {@link MapService} URL. */
        mapServiceUrl: string;
        /** The {@link MapService} ID. */
        mapServiceId: string;
        /** The security token of the service. */
        token: string;
        /** The value indicating whether the {@link Layer} is set to visible. */
        isVisible: boolean;
        /** The value indicating that the {@link Layer} is dynamic. */
        isDynamic: boolean;
        /** A dictionary of arbitrary properties. */
        properties: {
            [key: string]: any;
        };
        /** The {@link Layer} ID. */
        id: string;
        /** The name of the {@link Layer} */
        name: string;
        /** The alias to use for the {@link Layer} in client applications */
        displayName: string;
        /** The {@link Layer} URL. */
        layerUrl: string;
    }
}
/**
 * Note: References to ValidationResult.ts, FormItemResult.ts, and ValidationItem.ts were causing circular references here.
 * Interestingly, this issue was only triggered when the workflow handlers are compiled as TypeScript. -jscharf
 */
/** @private */
interface FormDefinition {
}
/** @private */
interface ValidationResult {
}
/** @private */
interface FormItemResult {
}
declare module geocortex.forms.items {
    interface FormItem {
        formItemType: string;
        formDefinition: FormDefinition;
        toolTip: Observable<string>;
        itemID: Observable<string>;
        isRequired: Observable<boolean>;
        isValid: Observable<boolean>;
        isVisible: Observable<boolean>;
        validationItems: validation.ValidationItem[];
        getResult(): FormItemResult;
        refresh(): void;
        validate(): validation.ValidationResult[];
        _render(): Node;
        _destroy(): void;
    }
    class AbstractFormItem implements FormItem {
        /** The type of the FormItem. */
        formItemType: string;
        /** A reference to the FormDefinition that contains this form item. */
        formDefinition: FormDefinition;
        /** The tooltip of this form item. */
        toolTip: Observable<string>;
        /** The form item ID. */
        itemID: Observable<string>;
        /** The value indicating whether this item is required. */
        isRequired: Observable<boolean>;
        /** The value indicating whether this item is valid. */
        isValid: Observable<boolean>;
        /** The value indicating whether this item is visible or not.*/
        isVisible: Observable<boolean>;
        /** The name of the argument that will be used to store the result of this item. */
        argumentName: Observable<string>;
        /** Gets the collection of {@link validation.ValidationItem} objects that belong to this {@link FormItem}.
         * @type ValidationItem[]
         */
        validationItems: validation.ValidationItem[];
        /**
         * Initializes a new instance of the {@link FormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * Raises the FormItemResultChangedEvent.
         */
        protected _notifyResultChanged(): void;
        /**
         * Refreshes the user interface of the form item.
         */
        refresh(): void;
        /**
         * Validates the form item.
         * Returns a collection of invalid items.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}[]}
         */
        validate(): validation.ValidationResult[];
        /**
         * @private Renders the form item.
         */
        _render(): Node;
        /**
         * @private
         */
        _destroy(): void;
    }
}
declare module geocortex.forms.items {
    class LabelFormItem extends AbstractFormItem {
        /**
         * The text that will be displayed by the Label.
         * @type Observable(String)
         */
        text: Observable<string>;
        /**
         * The ItemID of the FormItem this label is for.
         * @type Observable(String)
         */
        labelForItemID: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.LabelFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    interface LabelContainer extends FormItem {
        /**
         * The text that will be displayed by the Label.
         * @type LabelFormItem
         */
        label: LabelFormItem;
    }
    function initLabelContainer(lc: LabelContainer, xmlNode: Element, formDefinition?: FormDefinition): void;
}
declare module geocortex.forms.items {
    class FormItemResult {
        /**
         * The argument name.
         * @type String
         */
        argumentName: string;
        /**
         * The result value.
         * @type Object
         */
        value: any;
        /**
         * The name of the argument that will be used to store the result of this form item.
         * @type Boolean
         */
        wasSet: boolean;
        /**
         * Indicate if the result is a list of items (not a single item).
         * @type Boolean
         */
        isList: boolean;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.FormItemResult} class.
         * @param argumentName Name of the argument for this result.
         * @param value Value for this result.
         * @param wasSet Indicates whether the value was set due to user interaction.
         */
        constructor(argumentName: string, value: any, wasSet?: boolean);
    }
}
declare module geocortex.forms.items {
    class TextBoxFormItem extends AbstractFormItem implements LabelContainer {
        label: LabelFormItem;
        /**
         * The default value shown in the textbox.
         * @type Observable(String)
         */
        defaultText: Observable<string>;
        /**
         * The value shown in the textbox.
         * @type Observable(String)
         */
        text: Observable<string>;
        /**
         * The input scope of the textbox.
         * @type Observable(String)
         */
        inputScope: Observable<string>;
        /**
         * The width of the text box in pixels.
         * @type Observable(Number)
         */
        textboxWidth: Observable<number>;
        /**
         * Gets or sets a value indicating whether the form item is read only.
         * @type Observable(Boolean)
         */
        readOnly: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.TextBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class TextAreaFormItem extends TextBoxFormItem {
        /**
         * The height of the text area in pixels.
         * @type Observable(Number)
         */
        textboxHeight: Observable<number>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.TextAreaFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
    }
}
declare module geocortex.essentials {
    /**
     * Client representation of an extension object, as configured by an administrator.
     */
    class Extension {
        /** The name of the class of the {@link Extension}. */
        className: string;
        /** The instance of this {@link Extension}. */
        instance: any;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.Extension} class.
         * @param className Name of the class.
         * @param instance The extension object instance.
         */
        constructor(className: string, instance: any);
    }
}
/** @private */
declare module geocortex.optimizer {
    class EventRelay {
        /**
         * @private - Handle used to identify the connection to the onExtentChange
         * map event to disconnect it if the collector needs to be disabled.
         */
        private _extentConnect;
        private _numConsecutiveFailures;
        private _map;
        private _siteId;
        userName: string;
        /**
         * @private - URL to the Optimizer Rest endpoint. This URL must include
         * the f=json query string parameter.
         */
        private _endpointUrl;
        /**
         * @private - Whether or not the relay is enabled. It is enabled by
         * default, but disables itself after three consecutive failures to
         * log data to the Optimizer Rest endpoint.
         */
        private _enabled;
        /**
         * @private - ID assigned to this page, which will be used in all
         * logging requests for the duration of the page itself. It is set
         * in the constructor, and based on the current timestamp.
         * Although the type is string, it is in fact a string
         * representation of an integer value.
         */
        private _sessionId;
        private _previousScale;
        /**
         * @private - Whether or not the first request has been logged to
         * the Optimizer Rest endpoint. This is purely to determine whether
         * or not to specify "true" for the InitialExtent field in
         * the ArcGISExtents table.
         */
        private _firstExtentLogged;
        /**
         * @private - Array of logged events waiting to be sent to the
         * Optimizer REST endpoint
         */
        private _pendingEvents;
        /**
         * @private - Timer used to delay posting the log messages. The
         * timer is reset every time that the map extent changes so that
         * we build up a queue of messages to send when the user stops
         * panning/zooming the map.
         */
        private _timer;
        /**
         * Initializes a new instance of the {@link geocortex.optimizer.EventRelay} class.
         * @param map ESRI map object whose events will be logged.
         * @param siteId Name to use to uniquely identify the site generating the log events.
         * @param endpointUrl Alternate URL for the optimizer rest logging endpoint.  Must
         * include the f=json url parameter.
         * @param userName The username of the local user
         */
        constructor(map: esri.Map, siteId?: string, endpointUrl?: string, userName?: string);
        /**
         * Logs a change of map extent to the Optimizer Rest endpoint.
         * This is the method hooked into the onExtentChange event of
         * the esri.Map object.  If the map scale has changed as well,
         * a call will be made from this method to log a scale change
         * event with Optimizer.
         * @param args Object containing the following extent arguments :- "extent": The new extent of the map; "delta" The change
         * in the x and y values from the previous extent (passed by esri.Map event); "levelChange": When using ArcGIS Server tiled
         * map services, the value is true when the user zooms to a new level; "lod": Level of Detail associated with the current
         * map extent, only if the map uses tiled service(s).
         */
        private _logExtentChange(args);
        /**
         * Logs a scale change event to the Optimizer Rest endpoint
         * @param oldScale The previous scale value of the map
         * @param newScale The new (current) scale value of the map
         */
        private _logScaleChange(oldScale, newScale);
        /**
         * Logs a tool usage event to the Optimizer Rest endpoint
         * @param toolName Name of the tool used
         * @param toolData Specifics of the tool usage
         */
        logToolUsage(toolName: string, toolData: string): void;
        /**
        * Adds the log event to the queue, which will be run when a
        * specified amount of time passes after a map extent change.
        * This function will mix in values common to all log events to
        * the content before queueing.
        */
        private _queueData(content);
        private _flushQueue();
        /**
         * Logs the supplied content to the Optimizer rest endpoint.
         * @param content Content to post to the REST endpoint
         */
        private _logData(content);
        /**
         * @private
         * Handler for a successful log response from the Optimizer Rest
         * endpoint. Will reset the failure counter.
         * @param logResult The response supplied by the async request
         */
        private _handleLogSuccessResponse(logResult);
        /**
         * Handler for an unsuccessful (error) log response from the Optimizer
         * Rest endpoint.  Will increment the failure counter.
         * @param errorMessage Reason for the failure
         */
        private _handleLogErrorResponse(errorMessage);
        /**
         * Increments the failure counter, and disables this relay if the
         * failure count is greater than 2.
         */
        private _incrementFailures();
        /**
         * Gets the list of currently visible layers in the map.  Dynamic services
         * will use the name from the LayerInfo, as will tiled AGS layers.  Bing
         * maps will use the format "Bing: <mapType>", such as "Bing: aerial".  Image
         * layers will use the format "Image: <layerUrl>".  Each layer is separated
         * by "\t" (backslash-tab), to identify to the Rest endpoint to replace the
         * character sequence with an actual tab character for inclusion into the
         * Optimizer database.
         */
        private _getCurrentLayerList();
        /**
         * Javascript crc32 implementation from www.webtoolkit.info
         * @param str String for which to generate a hash
         */
        private _crc32(str);
    }
}
/**
 * Contains the *Geocortex Essentials API for JavaScript*, the *Geocortex SDK for HTML5*, and associated, ancillary libraries.
 */
declare module geocortex {
}
/**
 * The Geocortex Essentials API for JavaScript.
 * Include `Essentials.js` to begin working with the API.
 */
declare module geocortex.essentials {
}
declare module geocortex {
    /** @docs-hide-from-nav */
    interface EssentialsConfig {
        baseUrl: string;
        io: {
            errorHandler: (err: Error, io: any) => void;
            postLength: number;
            timeout: number;
        };
        REST_version: string;
        authenticationDialogId: string;
    }
    /** @private */
    var config: EssentialsConfig;
    /**
     * Helper function that resolves a {@link dojo.Deferred}.
     * @private
     * @param def The {@link dojo.Deferred} to resolve.
     * @param result The result to invoke the deferred's resolve callback with.
     */
    function deferredResolve(def: dojo.Deferred, result: any): void;
    /**
     * Helper function that rejects a {@link dojo.Deferred}.
     * @private
     * @param def The {@link dojo.Deferred} to reject.
     * @param result The result to invoke the deferred's reject callback with.
     */
    function deferredReject(def: dojo.Deferred, result: any): void;
    /**
     * Encodes an object in a format that is ready for serialization as URL parameters or a POST body.
     * @param objectToEncode The object to encode for serialization.
     */
    function encodeJson(objectToEncode: Object): Object;
    /**
     * Describes the format of an outgoing REST request. See {@link geocortex.request}.
     * @docs-hide-from-nav
     */
    interface RequestObject {
        /** The URL to make the request to. Typically a RESTful endpoint. */
        url: string;
        /** Arbitrary content to send. Usually the result of a call to {@link geocortex.encodeJson}. */
        content?: any;
        /**
         * Callback to fire upon a successful response from the remote endpoint.
         * @param response The response body.
         */
        load?: (response: any) => void;
        /**
         * Callback to fire upon an successful response from the remote endpoint.
         * @param error The error that occurred.
         */
        error?: (error: Error) => void;
        /**
         * The [JSONP](http://en.wikipedia.org/wiki/JSONP) callback name to wrap the request in.
         * The remote endpoint must support JSONP. */
        callbackParamName?: string;
        /**
         * If true, a "cache-busting" URL parameter is added to the outgoing request in order to
         * circumvent HTTP request caching. This is typically a timestamp. */
        preventCache?: boolean;
        timeout?: number;
        handleAs?: string;
        gcx?: any;
    }
    /**
     * Represents a block of optional request options that affect the behaviour of an outgoing RESTful request.
     * @docs-hide-from-nav
     */
    interface RequestOptions {
        /** @private */
        gcx?: {
            /** If set to true, forces the use of a cache-busting parameter on the outgoing request. */
            preventCache?: boolean;
        };
        /**
         * If set to true, avoids the use of esri's {@link IdentityManager}, which can sometimes
         * interfere with certain authentication requests. */
        disableIdentityLookup?: boolean;
        /** Forces the use of the viewer proxy. */
        useProxy?: boolean;
        /** Indicates the request should be made using HTTP POST method. Default is false i.e., determined automatically based on the request size. */
        usePost?: boolean;
    }
    /**
     * A wrapper around `dojo.io.script.get` and `dojo.xhrPost`.
     * It will determine which one to use depending on the amount of data being sent.
     * @param request The request object.
     * @param options The request options.
     */
    function request(request: RequestObject, options?: RequestOptions): any;
    /**
     * Detects whether or not a proxy URL has been configured on the global ArcGIS JSAPI configuration object.
     */
    function hasProxy(): boolean;
    /**
     * Detects whether a request requires the viewer proxy. This will return true if the request length is greater than the
     * configured GET size limit, or if the request is to a different domain.
     * @param request The desired request.
     */
    function requiresProxy(request: RequestObject): boolean;
    /**
     * Creates a query object from a URL, creating object properties for any URL parameters found in the URL.
     * @param url The url to convert.
     */
    function urlToQueryObject(url: string): Object;
    /**
     * Represents a generic description of an Essentials extension.
     * @docs-hide-from-nav
     */
    interface ExtensionParam {
        className: string;
        instance: any;
    }
    /** @private */
    function _getExtensions(extensions: ExtensionParam[]): geocortex.essentials.Extension[];
    /** @docs-hide-from-nav */
    interface PropertyParam {
        name: string;
        value: any;
    }
    /** @private */
    function _getProperties(properties: PropertyParam[]): any;
}
declare module geocortex.essentials {
    /**
     * Carries materials related to a successful authentication against a {@link Site} and manages a queue
     * of requests that are pending authentication. */
    class AuthenticationControlBlock {
        /** The message returned from the security server. */
        messageFromServer: string;
        /** The password used to obtain the current token. */
        password: string;
        /** List of REST requests waiting for a token. */
        pendingCalls: any[];
        /** The Url to the token service, as returned by the 401. */
        tokenService: string;
        /**
         * The base url of the token server - for example, if the token url is
         * http://host/rest/site/sitename/authenticate the base url will be http://host/rest/site/sitename.
         */
        tokenRootUri: string;
        /**
         * The base url of the original request that triggered a call to the token server. It allows
         * to set up token servers outside of the base TokenRootUri - for example, if the token url is
         * http://host/rest/site/sitename/authenticate the target base url could be http://host/rest/proxy/proxyname.
         */
        targetRootUri: string;
        /** The token in question. */
        token: string;
        /** The username used to obtain the current token. */
        username: string;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a collection of {@link AuthenticationControlBlock} objects, each of which represents a
     * token login by the user to a specific Essentials {@link Site} endpoint.
    */
    class AuthenticationControlBlockStore {
        private _authenticationControlBlocks;
        /**
         * Adds a control block to the collection.
         * @param controlBlock The {@link AuthenticationControlBlock} control block to be added.
         */
        add(controlBlock: AuthenticationControlBlock): void;
        /**
         * Removes a control block by reference.
         * @param controlBlock The {@link geocortex.essentials.AuthenticationControlBlock} to be removed.
         * @return whether a control block was removed
         */
        remove(controlBlock: AuthenticationControlBlock): boolean;
        /**
         * Finds a token associated with the given url. A match is found if the
         * base url of the token (or the target root url) is a prefix of url.
         * @param {String} url The url to look for.
         * @return {{@link geocortex.essentials.AuthenticationControlBlock}}
         */
        find(url: string): AuthenticationControlBlock;
        /**
         * Removes an authentication control block.
         * @param {Number} Index of the controlblock to remove.
         */
        removeAt(index: number): void;
    }
}
declare module geocortex.essentials {
    /**
     * Provides a means of wrapping any request that is made to an external URL, for the purposes of
     * handling automatic token retrieval when an endpoint is secured.
     */
    class RestHelperHTTPService {
        /** The request object to be supplied to the esri request function. */
        requestObject: any;
        /** The options object to be supplied to the esri request function. */
        optionsObject: any;
        /** The handle delegate passed along with the original request object. */
        private _handle;
        /** The error delegate passed along with the original request object. */
        private _error;
        /**
         * The deferred object which will be invoked when the request has been processed
         * successfully, or when it fails. If authentication is required for the Essentials
         * site resource being requested, this deferred will wait until the token has been
         * requested and the resource has been requested again with the token before resolving.
         * @private
         */
        private _deferred;
        private static _controlBlocks;
        /**
        * The ArcGIS Portal token to pass along to Essentials when performing operations involving the map and
        * secured ArcGIS Portal hosted services.
        */
        static arcGisPortalToken: TokenResult;
        /** The Geocortex Essentials token for all requests. */
        static token: string;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.RestHelperHTTPService} class.
         * @param request An optional request object to associate with this helper.
         */
        constructor(request?: any, options?: any);
        /**
         * Returns the {@link AuthenticationControlBlockStore} that contains pending {@link AuthenticationControlBlock} objects. */
        static getAuthenticationControlBlockStore(): geocortex.essentials.AuthenticationControlBlockStore;
        /**
         * The delegate that will be attached to the request object before being
         * passed off to the esri.request method.  Using a proxy handler will allow
         * us to catch and deal with any 401 unauthorized requests, giving us a
         * chance to automatically collect a token and re-issue the request.
         * The reason we need to proxy the handle delegate is:
         * The handle delegate gets called automatically by dojo in success and in
         * failure conditions.  Success conditions are fine, since we want to invoke
         * the original handle delegate anyhow.  In error conditions, we do not want
         * to invoke the original handle delegate because the error may be due to a
         * 401 unauthorized response from the Essentials site - something this class
         * is meant to deal with.  In that case, telling the caller that an error occurred
         * by invoking the error handler is incorrect - we must wait until the token is
         * retrieved and the request is made again.
         * The reason we cannot simply invoke the handle delegate inside the _requestErrback
         * method (like is done for the error delegate) is due to the ioargs that must
         * be passed to the handle delegate.  The deferred error delegate does not get
         * passed an ioargs parameter - it is something that is only packaged and passed
         * explicitly to a handle delegate.  Thus, we have our own handle proxy that we
         * can call in all cases *except* those where a 401 error occurs.
         * @private
         */
        private _handleProxy(dataOrError, ioargs);
        /**
         * Handler for the request object sent to the esri.request function.  Upon being called,
         * this method will resolve the deferred object returned from this object's send method.
         * @private
         */
        private _requestCallback(data);
        /**
         * Error handler for the request sent to the esri.request function.  If the error occurred
         * due to a 401 unauthenticated error from an Essentials REST endpoint, a request will be made
         * to get a token and then the request will be made again.  If the error occurred for a
         * different reason, the deferred object will be rejected, and the original error delegate
         * supplied in the request object will be invoked (if it exists).
         * @private
         */
        private _requestErrback(error);
        /**
         * Will return true if the supplied error object represents a 401 JSON response that
         * indicates that the request was for a secured Essentials endpoint and did not include
         * a valid token for authorization.
         * @private
         */
        private _isUnauthorizedResponse(error);
        /**
         * Called to handle the case where a response has been received from an Essentials REST
         * endpoint indicating that the request requires authentication.  This method will kick
         * off a call to the authentication endpoint to retrieve a token based on credentials
         * gathered from the user, and will re-issue the original request but this time will
         * supply the token it recieved from the Site endpoint.
         * @private
         */
        private _handleUnauthenticated(error);
        /**
         * Displays an authentication dialog to the user to gather the credentials which will be used
         * to request a token from the Essentials site's authorization endpoint.
         * The authentication dialog will be constructed from scratch using a dijit.Dialog, which will
         * have the look and feel of the current dojo stylesheet in use.  Note that for best results,
         * the stylesheet "document.css" inside the relevant dojo style directory should be included in
         * the page.
         * If an alternate authentication dialog is required, the ID of the div containing the alternate
         * dialog should be specified in the geocortex.config.authenticationDialogId property.  The dialog
         * must be a dijit.Dialog, it must have a submit button with id of <divId>_ok, it must have a
         * standard button with id of <divId>_cancel, and it must have two text inputs named username and
         * password, respectively.
         * @returns {dojo.Deferred} the deferred promise that will be called back when the user clicks
         * the OK or cancelled buttons
         */
        private _gatherCredentials(forwardedDeferred?);
        /**
         * Constructs a dialog used to gather the username and password from the user.
         * @returns {Object} div DOM object representing the dijit.Dialog.
         * @private
         */
        private _createAuthDialogContent();
        /**
         * Requests an authentication token from the Essentials site endpoint, using the username
         * and password supplied in the controlBlock.
         * @private
         */
        _requestToken(controlBlock: geocortex.essentials.AuthenticationControlBlock): void;
        /**
         * Handler invoked when there was an error retrieving the credentials from the Essentials site REST
         * endpoint.  The error can either be another 401, indicating invalid credentials supplied, or it
         * could be a separate transport or server error (among others).  Another 401 is handled by just gathering
         * the credentials again from the user.
         * @private
         */
        private _onTokenRequestFault(e);
        /**
         * Handler invoked when a token request is successfully responded to by the Essentials site REST
         * endpoint.  When this occurs, any calls that have been waiting pending authentication are
         * sent.
         * @private
         */
        private _onTokenRequestCompleted(data);
        /**
         * Override send so that we can append tokens as needed.
         * @private
         */
        send(): any;
        private _appendParameter(url, paramName, paramValue);
    }
}
/**
 * Utility methods for working with geometries.
 */
declare module geocortex.essentials.GeometryUtilities {
    /**
     * Compares two spatial references for equality.
     * @param ref1 The first SpatialReference.
     * @param ref2 The second SpatialReference.
     * @param ignoreNulls Whether or not a null spatial reference passed in should equate to equal to the other.
     */
    function spatialRefsAreEqual(ref1: esri.SpatialReference, ref2: esri.SpatialReference, ignoreNulls?: boolean): boolean;
    /**
     * Compares two envelopes for spatial equality.
     * @param env1 Envelope A.
     * @param env2 Envelope B.
     */
    function envelopesAreEqual(envelope1: esri.geometry.Extent, envelope2: esri.geometry.Extent): boolean;
    /**
     * Builds a bounding extent, given an array of geometries.
     * @param geometries The collection of geometries for which to build the bounding extent.
     */
    function getExtent(geometries: esri.geometry.Geometry[]): esri.geometry.Extent;
    /**
     * Creates a polygon representing the given extent.
     * @param envelope The envelope to turn into a polygon.
     */
    function envelopeToPolygon(envelope: esri.geometry.Extent): esri.geometry.Polygon;
    /**
     * Checks a given geometry for validity.
     * @param geometry The geometry to check.
     */
    function isValidGeometry(geometry: esri.geometry.Geometry): boolean;
    /**
     * Checks if a polygon is self intersecting
     * @param esri.geometry.Polygon
     */
    function isSelfIntersectingPolygon(poly: esri.geometry.Polygon): boolean;
    /**
     * Checks whether or not a polygon is convex.
     * @param geometry The geometry to check.
     */
    function isConvex(poly: esri.geometry.Polygon): boolean;
    /**
     * Checks whether or not a point lies in an Envelope.
     * @param point The point to check.
     * @param envelope The envelope to check.
     */
    function pointInEnvelope(point: esri.geometry.Point, envelope: esri.geometry.Extent): boolean;
    /**
     * Returns an envelope representing the result of clipping a given envelope against another given envelope.
     * @param envelopeToClip The envelope to clip.
     * @param clipAgainst The envelope to clip against.
     */
    function clipEnvelope(envelopeToClip: esri.geometry.Extent, clipAgainst: esri.geometry.Extent): esri.geometry.Extent;
    /**
     * Returns an extent that represents the provided envelope scaled by the given amounts on each axis.
     * @param envelope The envelope to scale.
     * @param scaleX The amount to scale on the X axis.
     * @param scaleY The amount to scale on the Y axis.
     */
    function scaleEnvelope(envelope: esri.geometry.Extent, scaleX: number, scaleY: number): esri.geometry.Extent;
    /**
     * Returns an extent that represents the provided envelope, whose width and height have
     * been scaled by the given amount, and whose center has position is unchanged.
     * @param envelope The envelope to scale.
     * @param scaleFactor The amount to scale by.
     */
    function scaleEnvelopeWithoutTranslation(envelope: esri.geometry.Extent, scaleFactor: number): esri.geometry.Extent;
    /**
     * Computes the Cartesian distance between two points.
     * @param point1 The first point.
     * @param point2 The second point.
     */
    function computeDistance(point1: esri.geometry.Point, point2: esri.geometry.Point): number;
    /**
     * Returns an extent that represents the provided envelope scaled by the given amounts on each axis.
     * @param envelope The envelope to translate.
     * @param translateX The amount to translate on the X axis.
     * @param translateY The amount to translate on the Y axis.
     */
    function translateEnvelope(envelope: esri.geometry.Extent, translateX: number, translateY: number): esri.geometry.Extent;
    /**
     * Calculates the length of a vector.
     * @param vector The vector to calculate length for.
     */
    function length(vector: esri.geometry.Point): number;
    /**
     * Returns a normalized vector.
     * @param vector The vector to normalize.
     */
    function normalize(vector: esri.geometry.Point): esri.geometry.Point;
    /**
     * Calculates the angle (in Radians) between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    function angle(a: esri.geometry.Point, b: esri.geometry.Point): number;
    /**
     * Calculates the 2D cross product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @param origin The origin by which these vectors relate.
     */
    function crossProduct(a: esri.geometry.Point, b: esri.geometry.Point, origin?: esri.geometry.Point): number;
    /**
     * Calculates the 2D cross product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @param origin The origin by which these vectors relate.
     */
    function crossProductArray(a: number[], b: number[], origin?: number[]): number;
    /**
     * Calculates the dot product of two vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    function dotProduct(a: esri.geometry.Point, b: esri.geometry.Point): number;
    /**
     * Calculates the approximate midpoint of a collection of points.
     * @param points The array of points.
     */
    function polygonMidpoint(points: esri.geometry.Point[]): esri.geometry.Point;
}
declare module geocortex.essentials {
    /**
     * Represents a FeatureHyperlink configured on a layer by an Administrator.
     */
    class FeatureHyperlink {
        /** Whether to URL encode replacement values in the uri property. */
        encodeUriReplacementValues: boolean;
        /** The URI of an image which represents the hyperlink being generated. */
        iconUri: string;
        /** The {@link geocortex.essentials.Layer} that this FeatureHyperlink belongs to. */
        layer: Layer;
        /** The name of the target browser window which the hyperlink result will populate (e.g., _blank). */
        target: string;
        /**  The text to display in place of the hyperlink URI. */
        text: string;
        /** The information shown to the user when the hyperlink is hovered over. */
        toolTip: string;
        /** A URI format string which can be used to dynamically insert field values within the URI. */
        uri: string;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.FeatureHyperlink} class.
         * @param featureHyperlinkInfo Associative array of properties to use to populate the members of this object.
         * @param layer The layer that this FeatureHyperlink is associated with.
         */
        constructor(featureHyperlinkInfo: FeatureHyperlink, layer: Layer);
    }
}
declare module geocortex.essentials {
    /**
     * A simple descriptor representing a {@link MapGrid}.
     * A {@link MapGrid} is a series of vertical and horizontal lines with coordinate labels overlayed on top of a map, so that you can interpolate
     * coordinates for a particular point.
     */
    class MapGrid {
        /** A cross-application boundary identifier. */
        id: string;
        /** The user displayable name of the map grid. */
        displayName: string;
    }
}
declare module geocortex.essentials {
    /**
     * An object that represents a unit of distance.
     */
    class DistanceUnit {
        /** The display name of the {@link geocortex.essentials.DistanceUnit}. */
        name: string;
        /** The unit type. One of the available {@link geocortex.essentials.DistanceUnitType}s. */
        type: string;
        /**
         * Initializes a new instance of the {@link DistanceUnit} class.
         * @param name The display name of the {@link DistanceUnit}.
         * @param type A string constant representing the official unit type. See {@link DistanceUnitType} for a list of supported units.
         */
        constructor(name: string, type: string);
    }
}
/**
 * Contains a number of distance unit values.
 */
declare module geocortex.essentials.DistanceUnitType {
    var OTHER: string;
    var INCHES: string;
    var FEET: string;
    var US_SURVEY_FEET: string;
    var YARDS: string;
    var MILES: string;
    var NAUTICAL_MILES: string;
    var MILLIMETERS: string;
    var CENTIMETERS: string;
    var DECIMETERS: string;
    var METERS: string;
    var KILOMETERS: string;
    var DEGREES: string;
    var RADIANS: string;
    var GRADS: string;
}
declare module geocortex.essentials {
    class Map extends AsyncInitializable {
        /** The collection of {@link BaseMap}s for the map. */
        baseMaps: BaseMap[];
        /** The original URL of the Essentials map REST endpoint. */
        originalUrl: string;
        /** The esri.geometry.Extent which represents the full extent of the {@link Map}. */
        fullExtent: esri.geometry.Extent;
        /** The esri.geometry.Extent which represents the initial extent of the {@link Map}. */
        initialExtent: esri.geometry.Extent;
        /**
         * Configuration parameter which controls whether to fit tiled maps to extent. When true, for maps that contain tiled map service layers,
         * you are guaranteed to have the input extent shown completely on the map. The default value is false.
         */
        fitTiledMapsToExtent: boolean;
        /** The collection of {@link geocortex.essentials.MapService} object. */
        mapServices: MapService[];
        /**
         * A view of the map services which are filtered to only include the active services in the application. This will change when, for example,
         * a layer theme is applied. If no filter (layer theme) is applied, then this collection will be the same as the mapServices collection.
         **/
        mapServicesFilteredView: MapService[];
        /**
         * The LayerThemesInfo for layer theme's which can be applied to this Map
         */
        layerThemesInfo: geocortex.essentials.LayerThemesInfo;
        /** The primary {@link MapService} of the {@link Map}. */
        primaryMapService: MapService;
        /** The collection of supported export formats for the {@link Map}. */
        supportedExportFormats: string[];
        /** The {@link ExportMapImageOptions} which outline the options for exporting the map image. */
        exportMapImageOptions: ExportMapImageOptions;
        /** The {@link DistanceUnit} that is used by this map. This will be null for the overview map. */
        units: DistanceUnit;
        /** Whether esri service layers have yet been added to the {@link esri.Map} object */
        serviceLayersAdded: boolean;
        /** The {@link ExtentManager} that manages all extent changes for the esri map. */
        extentManager: ExtentManager;
        /** The spatial reference of the map. This should match the spatial reference of the Esri map */
        spatialReference: esri.SpatialReference;
        /**
         * A boolean that manages whether or not the initial extent should be set when all map services have been added
         * to the esri map or wait until another process manually calls setInitialExtent on the {@link ExtentManager}.
         */
        setExtentOnLoad: boolean;
        /** The esri.Map of the {@link Map}.*/
        private _esriMap;
        /** @private */
        private _onExportComplete;
        /** @private */
        private _onExportError;
        /**
         * Initializes a new instance of the {@link Map} class.
         * @param url The URL to the REST endpoint of the {@link Map}.
         */
        constructor(url: string);
        /**
         * Returns the underlying {@link esri.Map}. */
        getMap(): esri.Map;
        /**
         * Returns a flattened list of all the layers as defined by the {@link Site}.
         */
        allLayers(): Layer[];
        /**
         * Returns a flattened list of all the layers contained in the filtered mapService collection. (Filtered by Layer Theme settings)
         */
        filteredLayers(): Layer[];
        /**
         * Loads all the ServiceLayer objects into the ESRI layers collection.
         * This function is called automatically as part of the {@link Site} initialization process. */
        loadServiceLayersInMap(map: esri.Map): void;
        /**
         * Calculates the current scale of the map and returns it. This method just delegates to
         * esri.geometry.getScale(), passing it values that corresponding to the current state of the map. */
        calculateScale(): number;
        /** @private */
        private _addServiceLayers(esriMap);
        /**
         * Creates a MapService for every service layer provided and adds them to Essentials map.
         * @param serviceLayers An array of service layers.
         * @param serviceFunction The logical function of the {@link MapService}, either Base or Operational
         */
        addServiceLayers(serviceLayers: esri.layers.Layer[], serviceFunction: string): void;
        /**
         * Removes the MapService representing the service layer provided, from the Essentials MapServices array. Note: This will not remove it from the map.
         * @param serviceLayer The esri service layer, whose corresponding mapService we want to remove
         */
        removeServiceLayer(serviceLayer: esri.layers.Layer): void;
        /** @private */
        _configureMapServices(mapServiceResults: MapService[], deepInitialize: boolean): void;
        /** @private */
        _configureObject(obj: {
            mapServices: MapService[];
            primaryMapServiceID: string;
            initialExtent?: esri.geometry.Extent;
            fullExtent?: esri.geometry.Extent;
            units?: geocortex.essentials.DistanceUnit;
            exportOptions?: geocortex.essentials.ExportMapImageOptions;
            layerThemes?: RestLayerThemesInfo;
            baseMaps?: RestBaseMap[];
        }, deepInitialize?: boolean): void;
        /**
         * Find the {@link MapService} matching the specified ID.
         * @param mapServiceId The ID of the MapService to find.
         */
        findMapServiceById(mapServiceId: string): MapService;
        /**
         * Sets one {@link Layer} as the exclusively visible layer.
         * @param layer The layer to make the only visible layer.
         */
        setFeatureLayerExclusivelyVisible(layer: Layer): void;
        /**
         * Exports the {@link Map} using. This is an asynchronous method, you may provide delegates for completion or error information.
         * @param exportParameters The export parameters.
         * @param exportComplete The delegate that will be called when the export has completed
         * (even if an error occurs). This delegate expects one argument: a String representing the URL of the exported file.
         * @param exportError The delegate that will be called if an error occurs. This delegate expects an Error as argument.
         */
        exportMap(exportParameters: ReportParameters, exportComplete: (results: any) => void, exportError: (error: Error) => void): void;
        /** @private */
        private _exportRestComplete(results);
        /** @private */
        private _exportRestError(error);
        /** @private */
        private _layerLoadedUpdate(esriMap);
        /**
         * Applies layer catlog changes to the map.
         * @param detailsResults The details object which was returned from the Layer Catalog endpoint.
         */
        applyCatalogLayersChange(detailsResults: any): void;
        applyStartupTheme(): void;
        /**
         * Refreshes the mapServicesFilteredView collection and the layersFilteredView collection for each of the map services and constituent layers
         */
        refreshFilteredCollections(): void;
        /**
         * @private
         * CORE-23: WKT from Site does not match text found in AGS Map. We must thus ensure that we always use the map's wkt and not the one returned by essentials. Also affects
         * GVH-3186, GVH-3798, GVH-2416 and GVH-4243. This method will switch all spatial references in the site, map and elsewhere in the application to ensure compatibility throughout.
         **/
        private _switchSpatialReferenceGlobally(newSpatialReference);
        /** @private */
        private _applyCatalogChangesToWmsLayers(detailsResults);
        /** @private */
        private _applyCatalogChangesToDynamicLayers(detailsResults);
        /**
         * @private: Configure the LayerThemesInfo object from the rest response (if applicable).
         */
        private _configureLayerThemesInfo(restLayerThemesInfo);
        private _addToFilteredView(mapService);
        /**
         * @private: The filter used for filtering each service based on layer theme settings
         */
        private _layerThemeMapServiceFilter(mapService);
        /** @private */
        private _configureBaseMaps(restBaseMaps);
    }
}
declare module geocortex.essentials {
    /**
     * Represents a configured scale in a {@link Report}.
     */
    class Scale {
        /** The configured display name of this scale. */
        displayName: string;
        /** The configured value of this scale. */
        scale: string;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.Scale} class.
         * @param displayName The display name of the {@link geocortex.essentials.Scale}.
         * @param scale The scale.
         */
        constructor(displayName: string, scale: string);
    }
}
declare module geocortex.essentials {
    /**
     * Describes a resolution used in the generation of a {@link geocortex.essentials.Report}.
     */
    class Resolution {
        /** Configured display name for the {@link Resolution} object. */
        displayName: string;
        /** DPI of this resolution. */
        dpi: number;
        /**
         * Initializes a new instance of the {@link Resolution} class.
         * @param displayName The display name of the {@link Resolution}.
         * @param dpi The resolution in dots per inch.
         */
        constructor(displayName?: string, dpi?: number);
    }
}
declare module geocortex.essentials {
    /**
     * Represents a text field used in a {@link Report}.
     */
    class TextField {
        /** The display name of the {@link TextField}. */
        displayName: string;
        /** The ID of the {@link TextField}. */
        id: string;
        /** Whether the {@link TextField} is a multiline field. */
        multiline: boolean;
        /** The value of the {@link TextField}. */
        value: string;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.TextField} class.
         * @param id The ID of the text field.
         * @param name The name of the text field.
         * @param value The value of the text field.
         * @param multiline Indicates whether the text field is a multiline field.
         */
        constructor(id: string, displayName: string, value: string, multiline: boolean);
    }
}
declare module geocortex.essentials {
    /**
     * A class to hold parameters that will be used by the {@link Report} and
     * {@link PrintTemplate} classes to produce their output.
     */
    class ReportParameters {
        /** The custom extent to use if the extentType property is set to customExtent. */
        customExtent: esri.geometry.Extent;
        /** The type of extent that will be used for the map image in the report. */
        extentType: string;
        /** The list of fields that are defined for the report. */
        fields: TextField[];
        /** The map grid to include in the report. */
        grid: MapGrid;
        /** The image hight in pixels. */
        imageHeight: number;
        /** The image width in pixels. */
        imageWidth: number;
        /** Indicates whether to include georeference data in the output. */
        includeGeoreferenceData: boolean;
        /** The graphics that will be used on the map image in the report.  */
        mapGraphicsLayers: {
            layers: {
                elements: any[];
                opacity: number;
            }[];
            symbols: esri.symbol.Symbol[];
        };
        /** The email address to which to send a notification upon print completion. */
        notificationEmailAddress: string;
        /** The format for the report output. */
        outputFormat: string;
        /** Array of feature ID strings on which to run the report. */
        featureIds: string[];
        /** The resolution that will be used to create the report. */
        resolution: Resolution;
        /** The scale that will be used for the map image in the report. */
        scale: Scale;
        /** The spatial reference in which to create the printed map. */
        targetSpatialReference: esri.SpatialReference;
        /** Indicates whether to use a transparent background when rendering the map image.*/
        useTransparentBackground: boolean;
        /**
         * String constant representing the current extent of the map.
         * @private
         */
        static CURRENT_EXTENT: string;
        /**
         * String constant representing a custom extent.
         * @private
         */
        static CUSTOM_EXTENT: string;
        /**
         * String constant representing the full extent of the map.
         * @private
         */
        static FULL_EXTENT: string;
        /**
         * String constant representing the initial extent.
         * @private
         */
        static INITIAL_EXTENT: string;
        /**
         * Given an {@link esri.Map} and a {@link essentials.Map}, turns the {@link ReportParameters} into a JSON object
         * ready for serialization.
         */
        toJson(esriMap: esri.Map, essentialsMap: Map): any;
        /**
         * Extracts the geometries and symbols from the map graphics layers.
         * @param esriMap The {@link esri.Map} that contains the graphics layers.
         */
        populateMapGraphicsLayers(esriMap: esri.Map): void;
        private _extractGraphicInformation(layer, layers, symbols);
    }
}
declare module geocortex.essentials {
    /**
     * Represents a {@link Report} for a specific {@link Layer}.
     * A report displays information about some of the features of a specific {@link Layer}.
     * When a report is generated, a {@link Query} must be provided that indicates which features to include in the report.
     * Report generation requires a report template created by the Geocortex Report Designer and stored on the server.
     */
    class Report extends AsyncInitializable {
        /** The description of the {@link Report}. */
        description: string;
        /** The display name of the {@link Report}. */
        displayName: string;
        /** The extensions of the {@link PrintTemplate}, as defined by an administrator. */
        extensions: Extension[];
        /** The ID of the {@link Report}.*/
        id: string;
        /** The visibility of the {@link Report}. */
        visible: boolean;
        /** The {@link Layer} that the {@link Report} belongs to. */
        layer: Layer;
        /** The properties of the {@link PrintTemplate}, as defined by an administrator. */
        properties: any;
        /** The collection of supported {@link Scale}s for the {@link Report}. */
        supportedMapScales: Scale[];
        /** The collection of supported output formats for the {@link Report}. */
        supportedOutputFormats: string[];
        /** The collection of supported {@link Resolution}s for the {@link Report}. */
        supportedResolutions: Resolution[];
        /** The collection of {@link TextField} objects for the {@link Report}. */
        textFields: TextField[];
        /** @private */
        private _running;
        /** @private */
        private _onRunReportComplete;
        /** @private */
        private _onRunReportError;
        /**
         * Initializes a new instance of the {@link Report} class.
         * @param url The URL to the REST endpoint of the {@link Report}.
         */
        constructor(url: string);
        /**
         * Whether the {@link Report} is currently running (being generated). */
        isRunning(): boolean;
        /**
         * Runs the report using a {@link esri.tasks.Query} and the {@link ReportParameters}.
         * This is an asynchronous method, you may provide delegates for completion or error information.
         * @param query The {@link esri.tasks.Query} to use to select features from the {@link Layer} to report on.
         * @param reportParameters The report parameters.
         * @param runReportComplete The delegate that will be called when the report has finished running
         * (even if an error occurs). This delegate expects one argument: a String representing the URL of the prepared report.
         * @param runReportError The delegate that will be called if an error occurs. This delegate expects two arguments: a reference to the Report instance, and an Error.
         */
        run(query: esri.tasks.Query, reportParameters: ReportParameters, runReportComplete: (results: any) => void, runReportError: (error: Error) => void): void;
        /** @private */
        _configureObject(results: any, deepInitialize?: boolean): void;
        /** @private */
        private _runRestComplete(results);
        /** @private */
        private _runRestError(error);
    }
}
/**
 * Contains string constants that represent a type of {@link Report}.
 */
declare module geocortex.essentials.ReportType {
    var LAYER_TEMPLATE_REPORT: string;
    var MAP_TEMPLATE_REPORT: string;
}
declare module geocortex.essentials {
    /**
     * Represents the basic layer type of a {@link Layer}.
     */
    class LayerType {
        static UNKNOWN: number;
        static FEATURE_LAYER: number;
        static RASTER_LAYER: number;
        static GROUP_LAYER: number;
        static GEO_RSS_LAYER: number;
    }
}
declare module geocortex.essentials {
    class EsriFieldTypes {
        static esriFieldTypeSmallInteger: string;
        static esriFieldTypeInteger: string;
        static esriFieldTypeSingle: string;
        static esriFieldTypeDouble: string;
        static esriFieldTypeString: string;
        static esriFieldTypeDate: string;
        static esriFieldTypeOID: string;
        static esriFieldTypeGeometry: string;
        static esriFieldTypeBlob: string;
        static esriFieldTypeRaster: string;
        static esriFieldTypeGUID: string;
        static esriFieldTypeGlobalID: string;
        static esriFieldTypeXML: string;
    }
    class EssentialsFieldTypes {
        static essentialsFieldTypeSmallInteger: string;
        static essentialsFieldTypeInteger: string;
        static essentialsFieldTypeSingle: string;
        static essentialsFieldTypeDouble: string;
        static essentialsFieldTypeString: string;
        static essentialsFieldTypeDate: string;
        static essentialsFieldTypeGUID: string;
        static essentialsFieldTypeObject: string;
    }
    /**
     * Represents an attribute of a spatial layer, as configured by Essentials.
     */
    class Field {
        /** The field alias.*/
        alias: string;
        /** The type of data the field contains. */
        dataType: string;
        /** Alias to use when displaying the field's name. */
        displayName: string;
        /** Whether this field is a focus field or not. */
        focusField: boolean;
        /** The label, when used in a hyperlink. */
        hyperlinkLabel: string;
        /** Name of the field. */
        name: string;
        /** Whether the field will be searched as part of the layer search. */
        searchable: boolean;
        /** Whether the field is visible in reports. */
        visible: boolean;
        /**
         * Initializes a new instance of the {@link Field} class.
         * @param field A {@link Field}like object to clone.
         */
        constructor(fieldInfo: {
            alias: string;
            dataType: string;
            displayName: string;
            focusField?: boolean;
            hyperlinkLabel: string;
            name: string;
            searchable?: boolean;
            visible?: boolean;
        });
        /**
         * Converts an ESRI field type to a Geocortex Essentials type which is a .NET type name.
         * @returns esriFieldType Name of the system type that corresponds to ESRI field type.
         * @param esriFieldType Name of the ESRI field type to convert.
         */
        static convertFromEsriType(esriFieldType: string): string;
        /**
         * Converts a Geocortex Essentials field type (which is a .NET type name) to an esri field type.
         * @returns Name of the esri field type that corresponds to the Essentials type.
         * @param geocortexType Name of the Geocortex Essentials field type to convert.
         */
        static convertToEsriFieldType(geocortexType: string): string;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a parameter in a {@link geocortex.essentials.DataLink} relationship to an external data source.
     */
    class DataLinkParameter {
        /** The name of the feature field of the {@link DataLinkParameter}. */
        featureField: string;
        /** The ID of the {@link geocortex.essentials.DataLinkParameter}. */
        id: string;
        /** The name of the {@link geocortex.essentials.DataLinkParameter}. */
        name: string;
        /** The type of the {@link geocortex.essentials.DataLinkParameter}. */
        type: string;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a DataLink as defined by a {@link geocortex.essentials.Layer}.
     * A data link is a data relation between spatial attributes and tabular data from a foreign data source, such as a SQL database or a spreadsheet.
     * {@link DataLink}s allow data from external data sources to be pulled into web mapping applications.
     */
    class DataLink extends AsyncInitializable {
        /** The display name. */
        displayName: string;
        /**
         * The collection of {@link geocortex.essentials.Extension}s associated with the data link.
         * Extensions can be defined by the administrator on the server.
         */
        extensions: Extension[];
        /** The ID of the {@link DataLink} */
        id: string;
        /** The visibility of the {@link DataLink}. */
        visible: boolean;
        /**
         * Indicates whether the data fetched by the datalink represents a one to one relationship with the feature.
         */
        isOneToOne: boolean;
        /** The {@link Layer} that this {@link DataLink} belongs to. */
        layer: Layer;
        /** The parameters of the data link. */
        parameters: DataLinkParameter[];
        /**
         * Arbitrary properties associated with this {@link DataLink}.
         * The properties are defined by the administrator on the server.
         */
        properties: any;
        /** @private */
        private _dataLinking;
        /** @private */
        private _onDataLinkingComplete;
        /** @private */
        private _onDataLinkingError;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.DataLink} class.
         * @param The URL to a DataLink endpoint.
         */
        constructor(url: string);
        /**
         * Gets whether the {@link geocortex.essentials.DataLink} is currently performing data linking.
         * @return {boolean} True if datalinking is currently being performed, false otherwise.
         */
        isDataLinking(): boolean;
        /**
         * Performs the data linking operation using set of feature attributes required during the operation. This is an asynchronous method; you may provide delegates for completion or error information.
         * @param featureSetParameters An esri.tasks.FeatureSet that contains the attributes defined in the parameters. The method uses only the required attributes and ignores any other attributes in the feature set.
         * @param dataLinkingComplete The delegate that will be called when the operation has completed, even if an error occurs. This delegate expects one argument: an Object containing the result.
         * @param dataLinkingError The delegate that will be called if an error occurs during the operation. This delegate expects two arguments: a reference to the DataLink instance, and an Error.
         */
        performDataLinking(featureSetParameters: any, dataLinkingComplete: (results: any) => void, dataLinkingError: (error: Error) => void): void;
        /** @private */
        _configureObject(results: any, deepInitialize?: boolean): void;
        /** @private */
        private _dataLinkingRestComplete(result);
        private _parseConvertDates(jsonObject);
        /** @private */
        private _dataLinkRestError(er);
        /** @private */
        private _prepParamValue(param);
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Utility methods for comparing resource IDs.
     * @private
     */
    class SiteResourceIdComparer {
        static separator: string;
        /**
         * Determines if one string is equal to another string.
         * @param resourceId The resource ID to compare.
         * @param match The string to compare for a possible match.
         */
        static equals(resourceId: string, match: string): boolean;
        /**
         * Looks up the matching ID in the resources array and returns the found item.
         * @param resourceArray The resource array to check for `match`. Elements in the array must have an `id` property.
         * @param match the string value to check the resource array for.
         */
        static lookUp(resourceArray: {
            id: string;
        }[], match: string): any;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a layer configured in a {@link MapService}.
     * A Geocortex layer should not be confused with an _ArcGISDynamicMapServiceLayer_ or an _ArcGISTiledMapServiceLayer_. It is more akin to the esri.layers.LayerInfo class.
     * The layer provides additional configuration beyond what is defined in an ArcGIS server map service sub layer.
     * For example, the layer might have reports and datalinks defined. Also, the layer's configuration overrides the default visibility of the layer.
     * In order for sub - layers of {@link layers.ArcGISDynamicMapServiceLayer} to appear on the map, they must be explicitly defined in the layer collection of the {@link MapService}.
     */
    class Layer extends AsyncInitializable {
        /** Whether or not the layer supports toggling labels. */
        canToggleLabels: boolean;
        /** Array of charts associated with this layer*/
        charts: LayerChart[];
        /** The layer's initial visibility, defined in the site.  This will be true if the layer  was configured to be visible by default, false otherwise. */
        configuredVisible: boolean;
        /** Gets the collection of {@link DataLink} objects that belongs to the {@link Layer}. */
        dataLinks: DataLink[];
        /** The name of the underlying data provider for the layer, e.g. "SqlServer" or "Oracle". */
        dataProvider: string;
        /** Whether or not the layer is visible by default in the service. */
        defaultVisibility: boolean;
        /** The field to use as the primary representative of the layer in reports. */
        displayField: Field;
        /** The alias to use for the layer in client applications. */
        displayName: string;
        /** The description to use for the layer in client applications. */
        description: string;
        /** The layer's draw index that determines its drawing order (only applies to dynamic map services). */
        drawIndex: number;
        /** The dynamic definition of the {@link Layer}. */
        dynamicDefinition: string;
        /** The extensions of the Layer, as defined by an administrator.*/
        extensions: Extension[];
        /** The border color used when highlighting a feature from this layer. */
        featureBorderColor: number[];
        /** The format for a description of a feature from this layer. */
        featureDescription: string;
        /** The fill color used when highlighting a feature from this layer, represented as an array of RGB values in the range of 0-255. */
        featureFillColor: number[];
        /** Array of feature hyperlinks associated with this layer*/
        featureHyperlinks: FeatureHyperlink[];
        /** The format for a label of a feature. */
        featureLabel: string;
        /** The format for a long description of a feature. */
        featureLongDescription: string;
        /**
         * Shape type of the layer. One of:
         *  - None
         *  - Point
         *  - Multipoint
         *  - Polygon
         *  - Line
         */
        featureType: string;
        /**
         * Zoom factor to use to expand the extent by when zooming to a feature.  For example,
         * if this value is set to 3, then the extent will be expanded by a factor of 3 when zooming to that feature.
         * This property is not applicable to point layers since points do not have an extent to expand.
         */
        featureZoomFactor: number;
        /**
         * Scale to which the map should zoom when a standard viewer "zoom to feature" concept is invoked, from a list of results or otherwise.  This value should
         * be respected by implementing clients and viewers. If no value has been configured in the Essentials site for this, it will remain null.
         */
        featureZoomScale: number;
        /** Array of fields associated with this layer. */
        fields: Field[];
        /** The full extent of the layer. */
        fullExtent: esri.geometry.Extent;
        /** Whether the {@link Layer} contains a collection of {@link AttachmentInfo} objects. */
        hasAttachments: boolean;
        /** Whether the {@link Layer} contains a collection of {@link DataLink} objects. This information is available even if the {@link Layer} has not been initialized. */
        hasDataLinks: boolean;
        /**
         * Whether the {@link Layer} contains a collection of {@link Report} objects.
         * This information is available even if the {@link Layer} has not been initialized.
         */
        hasReports: boolean;
        /** URI to an icon representing this layer in the client application. */
        iconUri: string;
        /** The ID of the {@link Layer}. */
        id: string;
        /** Whether or not this layer can be identified in the client application. */
        identifiable: boolean;
        /** Whether or not this layer can be identified in the client application at scales it's not visible at. */
        identifiableAtAllScales: boolean;
        /** Whether or not to include this layer in the a layer list. */
        includeInLayerList: boolean;
        /** Whether or not to include this layer in the legend. */
        includeInLegend: boolean;
        /** Whether the {@link Layer} is dynamic. */
        isDynamic: boolean;
        /** Whether or not the layer will be expanded by default when shown in a layer list.  Only applies to group layers. */
        isExpanded: boolean;
        /** If the layer was added from the catalog **/
        isUserCreated: boolean;
        /** Array of representation of a layer hyperlink for this layer. */
        layerHyperlinks: any[];
        /** The URL of the image for the layer legend. */
        legendUrl: string;
        /** The map service that the {@link Layer} belongs to. */
        mapService: MapService;
        /** The layer's maximum scale. */
        maxScale: number;
        /** The layer's minimum scale. */
        minScale: number;
        /** The name of the {@link Layer}. */
        name: string;
        /** Gets the ID of the parent {@link Layer}. */
        parentLayerId: string;
        /** Field to use as the layer's primary key. */
        primaryKeyField: Field;
        /** The properties of the {@link Layer}, as defined by the administrator on the server. */
        properties: any;
        /** A flag indicating whether the layer is queryable or not. */
        queryable: boolean;
        /** Array of relationships associated with this layer. */
        relationships: esri.layers.Relationship[];
        /** The collection of {@link .Report} objects that belongs to the {@link Layer}. */
        reports: Report[];
        /**  Indicates if the layer is searchable. */
        searchable: boolean;
        /**
         * The display preference for feature hyperlinks. One of:
         *    ShowAll
         *    DisableBrokenLinks
         *    HideBrokenLinks
         **/
        showFeatureHyperlinks: string;
        /** Whether this layer should show its labels. */
        showLabels: boolean;
        /** Whether the client application is to show map tips for this layer. */
        showMapTips: boolean;
        /** Whether the layer can be snapped. */
        snappable: boolean;
        /** Whether the layer is enabled for snapping by default. */
        snappingEnabled: boolean;
        /** Indicates whether or not this layer supports the Identify task/endpoint. This is not the same as identifiable which is affected by user preference. */
        supportsIdentify: boolean;
        /** Indicates whether or not this layer supports the Query task/endpoint. This is not the same as queryable which is affected by user preference. */
        supportsQuery: boolean;
        /** The style name, for WMS requests. */
        styleName: string;
        /** Gets the IDs of all {@link Layer} objects that are sub-layers (children) of this {@link Layer}. The value is only set when the layer is a group layer. */
        subLayerIds: string[];
        /** The type of the layer, such as feature layer, raster layer, group layer, etc. Represented as a numerical value, defined by {@link LayerType}. */
        type: number;
        /** A flag used when changing map services and preserving user visibility settings. */
        visibleStateForRefresh: geocortex.essentials.RefreshVisibility;
        /**
         * The name of the WMS layer. This is the actual layer name from the capabilities, unlike
         * the name property of this Layer which is actually the title in the capabilities.
         */
        wmsLayerName: string;
        /**
         * An observable indicating whether this layer is participating in the currently configured layer theme or not
         */
        inActiveTheme: boolean;
        /**
         * A collection containing the layer theme settings for this layer.
         */
        layerThemeSettings: LayerThemeSetting[];
        /**
         * Whether the {@link Layer} is currently visible or not.
         * @private
         */
        _visible: boolean;
        /**
         * Caches the value for getFeatureLayer().
         */
        private _featureLayerPromise;
        /**
         * Initializes a new instance of the {@link Layer} class.
         * @param url The URL to the REST endpoint of the {@link Layer}.
         */
        constructor(url: string);
        /** Gets the feature layer associated with this layer. Not supported for all layers types, in which case the value will be null. */
        getFeatureLayer(): Promise<esri.layers.FeatureLayer>;
        /**
         * Returns a Feature Layer for a given relationship ID.
         * @param relationshipId The id of the relationship.
         * @param callbackResults A callback to invoke upon success.
         * @param callbackErrors A callback to invoke if an error is encountered.
         */
        getRelatedFeatureLayer(relationshipId: number, callbackResults: (result: any) => void, callbackErrors: (error: Error) => void): dojo.Deferred;
        /**
         * Gets a value representing whether or not all of this layer's ancestors are currently visible in the map. */
        areAllAncestorsVisible(): boolean;
        /**
         * Gets the URL to the actual Esri layer. */
        getLayerUrl(): string;
        private _fieldLookup;
        /**
         * Given a field name, returns the field object by that name.
         * @param name of the field to return
         */
        getFieldByName(name: string): Field;
        /**
         * Returns whether or not the layer is currently visible in the map. */
        isVisible(): boolean;
        /**
         * Sets the visibility of the {@link Layer}. If the {@link Layer} is part of a tiled (or image) service, then the whole {@link MapService} visibility is set.
         * @param visible The visibility value to set.
         */
        setVisibility(value: boolean, doNotRefresh?: boolean): void;
        /**
         * Sets the inActiveTheme property of the {@link Layer}. Raises the "LayerInActiveThemeChangedEvent" event.
         * @param value The value to set.
         */
        setInActiveTheme(value: boolean): void;
        /**
         * Find the Report matching the specified report ID.
         * @param reportId The Id of the Report to find.
         */
        findReportById(reportId: string): Report;
        /**
         * Determines if the specified scale is within this layer's min and max scale.
         * If a value is not provided for this parameter, then the map's current scale value will be used.
         * @param scale The scale value to test if it is between this layer's min and max scale.
         */
        withinScaleRange(scale?: number): boolean;
        /** @private */
        private _configureDataLinks(dataLinkResults, deepInitialize);
        /** @private */
        private _idIsUnique(id);
        /** @private */
        private _getUniqueId();
        /**
         * Populates the *Layer* from a dynamic object which represents a layer.
         * @param layerDefinition An object which represents the Layer.
         */
        createFromDefinition(layerDefinition: any): void;
        /** @private */
        _createFrom(results: any): void;
        /** @private */
        _configureObject(results: any, deepInitialize?: boolean): void;
        /** @private */
        private _configureReports(reportResults, deepInitialize);
        /**
         * Determine what the Esri OBJECTID field name is for the feature in the layer. */
        getObjectIdFieldName(): string;
        /** @private */
        private _convertLayerType(layerType);
        /** @private */
        _getRelation(relationshipId: number): esri.layers.Relationship;
        /**
       * Returns a string representing the layers definition expression.
       * Uses a service layer if passed in to find the most up to date definition expression.
       * If no service layer, get the definition expression for the layers dynamic definition json.
       * A service layer would be useless here if you were initializing these layers for the first time. (ie. it is not added yet.)
       * @param serviceLayer Service layer.
       * @return The definition expression.
       */
        getDefinitionExpression(serviceLayer?: esri.layers.Layer): string;
        /** @private */
        private _createDynamicLayerInfo();
        /**
         * Gets the layers drawing options from the dynamicDefinition.
         * @returns The *LayerDrawingOptions* for the layer or null.
         */
        getLayerDrawingOptions(): esri.layers.LayerDrawingOptions;
        /**
         * Retrieves the layer theme settings for this layer by specified layer theme or layer theme id
         */
        getLayerThemeSettings(layerTheme: LayerTheme): LayerThemeSetting;
        getLayerThemeSettings(layerThemeId: string): LayerThemeSetting;
        /**
         * Accessor method for the LayerVisibilityEventManager class in MapService.ts to sync layer visibility with
         * programmatic layer visibility changed made using esri's setLayerVisibility method.
         * @private
         */
        _syncProgramaticallyChangedLayerVisibility(visible: boolean): void;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a map service defined in a {@link EssentialsMap}.
     * A {@link MapService} is related to an Esri map service layer. It contains a reference to that Esri service in the {@link serviceLayer} property.
     */
    class MapService extends AsyncInitializable {
        /**
         * The parameters supplied for creation of a Bing map through the connection string
         * This object will be null for any {@link MapService} which is not a Bing map.
         */
        bingProperties: any;
        /** The base map group that this service belongs to, if applicable. */
        baseMapGroup: string;
        /** The zero-based index of this map service within its base map group, if applicable. */
        baseMapGroupIndex: number;
        /**
         * Indicates whether the base map group that this service belongs to allows only one base
         * map to be selected at a time.
         */
        baseMapGroupIsMutuallyExclusive: boolean;
        /** The initial opacity defined in the {@link Site}. */
        configuredOpacity: number;
        /**
         * The initial visibility defined in the {@link Site}. This will be
         * True if the default is to have the map service visible, false otherwise. */
        configuredVisible: boolean;
        /** The attribution information for the layer. */
        copyright: string;
        /** The URL, when available, where the layer's attribution data is stored. */
        attributionDataUrl: string;
        /** If the current map service has attribution data or not */
        hasAttributionData: boolean;
        /** The default data provider (e.g. "Oracle", "SqlServer") for all layers in this map service. */
        dataProvider: string;
        /** Description of the map service.  */
        description: string;
        /** Whether or not to disable caching of the MapService on the client. */
        disableClientCaching: boolean;
        /** The display name of the {@link MapService}. */
        displayName: string;
        /**
         * The drawing behavior of this map service. One of:
         *  - MapService - the map service is rendered on the server
         *  - FeatureLayer - the map service is rendered on the client
         */
        drawingBehavior: string;
        /** The {@link Map} that the {@link MapService} belongs to. */
        essentialsMap: Map;
        /** Any extensions of the {@link MapService}, as defined by the administrator on the server. */
        extensions: Extension[];
        /** The failure action, which describes how the end user application should deal with a failed service. */
        failureAction: string;
        /** Used to indicate what the MapService is capable of and is currently doing regarding clustering */
        featureClustering: FeatureCluster;
        /** The URL of the geometry service.*/
        geometryServiceUrl: string;
        /** Indicates whether this instance has layer catalog. */
        hasLayerCatalog: boolean;
        /** URI to an icon representation of this map service, for display in client applications. */
        iconUri: string;
        /** The ID of the {@link MapService}. */
        id: string;
        /** The original URL of the Essentials map service REST endpoint. */
        originalUrl: string;
        /** Format in which images will be drawn. */
        imageFormat: string;
        /**
         * Gets the error that occurred during initialization of the service layer, or null if there were no errors during initialization. */
        initializationFailure: Error;
        /** Whether or not to include this map service in the layer lists of client applications. */
        includeInLayerList: boolean;
        /** Whether or not the map service will be expanded by default when shown in a layer list. */
        isExpanded: boolean;
        /** Indicates whether or not the service layer (Esri's native layer) has been loaded. */
        isServiceLayerLoaded: boolean;
        /** Indicates whether or not a mapService was created by a user at runtime **/
        isUserCreated: boolean;
        /** The collection of {@link Layer} objects. */
        layers: Layer[];
        /**
         * A view of the layers which is filtered to only include the active layers in the application. This will change,
         * when, for example, a layer theme is applied. If no filter (layer theme) has been applied, then this collection
         * will be the same as the 'layers' collection
         */
        layersFilteredView: Layer[];
        /** The logical function of the {@link MapService}, either Base or Operational. */
        mapServiceFunction: string;
        /**  The type of {@link MapService}. */
        mapServiceType: string;
        /**
         * The URL used to retrieve a map image.  Maybe a templated URL, as in the case of WMTS using RESTful encoding.
         * May also be used to define the url that should used for WMS GetMap requests.*/
        mapUrl: string;
        /**
         * A maximum scale value that overrides the map service's defined maximum scale.
         */
        maxScale: number;
        /**
         * A minimum scale value that overrides the map service's defined minimum scale.
         */
        minScale: number;
        /** The opacity of the map service. */
        opacity: number;
        /**
         * A value between 0 and 1 inclusive that is used to filter the opacity of the map service.
         * The map service's opacity will be combined with the filter to produce the final opacity
         * seen by the end user.
         */
        opacityFilter: number;
        /**
         * The runtime spatial reference to use that is compatible with the map's spatial reference.
         * For now this is just used for WMS. */
        operationalSpatialReference: string;
        /**
         * Observable indicating whether this map service is in the active theme or not.
         */
        inActiveTheme: boolean;
        /**
         * A collection containing the layer theme settings for this map service.
         */
        layerThemeSettings: LayerThemeSetting[];
        /**  The properties of the {@link MapService}, as defined by the administrator on the server. */
        properties: any;
        /** The proxy URL for this service. */
        proxyUrl: string;
        /** The request encoding for a WMTS service. Can be KVP or RESTful. */
        requestEncoding: string;
        /** Indicates whether the map service is searchable through *Instant Search*. */
        instantSearch: boolean;
        /** The map server version for the service host. */
        serverVersion: string;
        /** The Esri map service Layer object. */
        serviceLayer: esri.layers.Layer;
        /** The security token that must be provided when requesting the service from ArcGIS Server. */
        serviceToken: string;
        /** The URL of the map service published by ArcGIS Server. */
        serviceUrl: string;
        /** The short display name for the map service. */
        shortDisplayName: string;
        /** The set of subdomains to use in a WebTiledLayer tile request. */
        subDomains: string[];
        /** Whether or not the map service supports dynamic layers. */
        supportsDynamicLayers: boolean;
        /**
         * The name of the tile matrix set to use for the WMTS layer, if this map service represents a WMTS service.
         * If this service does not represent a WMTS service, this property should be null. */
        tileMatrixSet: string;
        /**
         * An object in the same form as provided by Esri's REST API, and that is used  as a property for certain classes such as
         * {@link esri.layers.WMTSLayer.tileInfo}. */
        tileInfo: esri.layers.TileInfo;
        /**
         * Gets or sets the interval period (in seconds) for updating the specified map service.
         * It must be set to null, 0 or a value > 10 seconds. */
        updateInterval: number;
        /** The heap map settings for this map service. */
        heatMap: FeatureHeatMap;
        /** Whether or not this mapService can be identified in the client application. */
        identifiable: boolean;
        /** Whether or not the mosaic dataset values for this mapService should be included in idenitfy results or not. */
        includeMosaicDatasetValues: boolean;
        /** Whether or not the catalog items for this mapService should be included in idenitfy results or not. */
        includeCatalogItems: boolean;
        /** In certain cases, we need to route all requests through a primary proxy. This flag indicates that this layer requires that behaviour. */
        private _needsProxy;
        /** The LayerVisibilityChange event manager. */
        private layerVisibilityEventManager;
        private static _wmsExtended;
        private _updateIntervalId;
        private _delayedRefreshToken;
        private _layersInfoPromise;
        /** Whether or not the map service is initially visible. */
        protected _initiallyVisible: boolean;
        /**
         * Initializes a new instance of the {@link MapService} class.
         * @param url The URL to the REST endpoint of the {@link MapService}.
         */
        constructor(url: string);
        /**
         * @private
         * Gets metadata about all layers and tables from the map server's REST endpoint. This is an internal function used
         * by Layer.getFeatureLayer().
         */
        _getLayersInfo(): Promise<any>;
        /**
         * Gets the IDs of the visible layers which were configured by the REST manager in an array.
         *
         * Note: If a layer is  configured visible but is in fact not visible because its parent is not configured visible, that layer will not
         * be included in the returned list of visible layers.
         */
        getConfiguredVisibleLayers(): string[];
        /**
         * Gets the IDs of the layers which are visible by default in the Esri service layer. Note: If a layer is
         * visible by default but is in fact not visible because its parent is not visible by default, that layer will not
         * be included in the returned list of visible layers.
         */
        getDefaultVisibleLayers(): string[];
        /**
        * Gets the IDs of the currently visible layers in an array. Note: If a layer is currently set visible but is in fact not
        * visible because its parent is not visible, that layer will not be included in the returned list of visible layers.
        */
        getVisibleLayers(): string[];
        /** @private
         * Note: The visibility type:
         * "configuredVisible": returns original configured visible group layers as per the rest manager config.
         * "defaultVisibility": returns original visible group layers as per the esri service layer default visibility.
         * "_visible"         : returns visible group layers as per current visibility
         */
        private _getVisibleLayersOfType(visibilityType);
        /**
         * Gets whether the {@link MapService} is currently visible. */
        isVisible(): boolean;
        /**
         * Gets whether or not this map service is Tiled (i.e. instance of esri.layers.TiledMapServiceLayer).
         * @return {Boolean} true if this map service is tiled; false otherwise
         */
        isTiled(): boolean;
        /**
         * Sets the visibility of the {@link MapService}.
         * @param visible The visibility to be set (true: visible, false: hidden).
         */
        setVisibility(visible: boolean): void;
        /**
         * Sets the opacity of the {@link MapService}.
         * @param opacity The opacity to be set, between 0.0 and 1.0 inclusive.
         */
        setOpacity(opacity: number): void;
        /**
         * Sets the opacity filter of the {@link MapService}.
         * @param filter The opacity filter to be set, between 0.0 and 1.0 inclusive.
         */
        setOpacityFilter(filter: number): void;
        /**
         * Sets the inActiveTheme property of the {@link MapService}. Raises the "MapServiceInActiveThemeChangedEvent" event.
         * @param value The value to set.
         */
        setInActiveTheme(value: boolean): void;
        /**
         * Gets the access token for the map service, if there is one, by looking in a number of places. */
        findServiceToken(): string;
        /**
         * Find the {@link Layer} matching the specified name.
         * @param layerName The name of the {@link Layer} to find.
         */
        findLayerByName(layerName: string): Layer;
        /**
         * Find the Layer matching the specified ID.
         * @param layerId The Id of the Layer to find.
         */
        findLayerById(layerId: string): Layer;
        /**
         * Refreshes the map service by making a new request to the server.
         * @param refreshTimeoutMs An optional parameter which if specified, will cause the map refresh to occur after the specified timeout. Any previous refresh timeouts
         * will be cancelled when a new refresh timeout is set - ensuring that only one request goes out within the speicfied threshold. If undefined, the map refreshes immediately.
         * @param disableClientCaching An optional parameter which, if set will disable client caching on the service layer (if supported) prior to refreshing it. Defaults to false.
         */
        refresh(refreshTimeoutMs?: number, disableClientCaching?: boolean): void;
        /**
         * Refreshes the layersFilteredView collection.
         */
        refreshFilteredCollections(): void;
        /** @private */
        _configureLayers(layerResults: any, deepInitialize: boolean): void;
        /** @private */
        _createFrom(obj: any): void;
        /** @private */
        _configureObject(obj: any, deepInitialize?: boolean): void;
        /** @private */
        _updateServiceToken(token: string): void;
        /**
        * @private
        * Extracts definition expression from dynamic definition of a layer and adds it to layer definitions.
        * @param layer The *Layer* to extract definition expression from.
        * @param serviceLayer The *ServiceLayer* to add the definition to.
        */
        private _addDefinitionExpression(layer, serviceLayer?);
        /** @private */
        private _removeDefinitionExpression(layer, serviceLayer);
        /** @private */
        _createServiceLayer(): void;
        private _prefixProxy(url);
        private _constructWmsLayerInfos();
        private _getWmsVisibleLayers();
        private _applyWmsLayerVisibility();
        private _getEsriWmsImageFormat();
        private _getEsriOgcImageFormat();
        /** @private */
        private _findWMSLayerName(wmsLayers, wmsTitle);
        /** @private */
        private _finishWmsLayerConfiguration(wmsLayer);
        /** @private */
        _handleServiceLayerLoaded(layer: esri.layers.Layer): void;
        /** Converts the map service to use to dynamic layers. This will only have an effect if the map service supports dynamic layers. */
        convertToDynamicLayers(): void;
        /** @private */
        _layerLoadErrorHandler(error: Error): void;
        /**
        * Removes a *Layer* from the the map service.
        * Also manipulates the Esri Layer and removes appropriate layer info and drawing options for the layer.
        * Currently supports dynamic layers only.
        * @param layer A layer to remove from the map service
        */
        remove(layer: Layer): void;
        /**
        * Adds a *Layer* to the map service.
        * Also manipulates the Esri Layer and adds appropriate layer info and drawing options for dynamic layers.
        * Currently supports dynamic layers only.
        * @param layer A *Layer* to add to the map service
        */
        add(layer: geocortex.essentials.Layer): void;
        /**
         * Gets a layers DynamicLayerInfo from the ServiceLayer by the layer's id.
         * Works only when the underlying ServiceLayer is of esri.layers.ArcGISDynamicMapServiceLayer type.
         * @param layerId The layer id.
         * @returns A DynamicLayerInfo or null if not found.
         */
        getDynamicLayerInfoById(layerId: string): esri.layers.DynamicLayerInfo;
        /** @private */
        _syncLayerVisibilities(visibleLayerIds: Array<string>): void;
        /** @private */
        _handleDynamicLayers(dynamicMapServiceLayer: esri.layers.ArcGISDynamicMapServiceLayer): void;
        /** @private */
        private _createDynamicLayerInfos(dynamicMapServiceLayer, includeOnlyEssentialsLayers?);
        /** @private */
        private _getAgsDynamicImageFormat(imgFormat);
        /** @private */
        private _getAgsImageServiceImageFormat(imgFormat);
        /** @private
         * Note: The visibility type:
         * "configuredVisible": returns original configured visible group layers as per the rest manager config.
         * "defaultVisibility": returns original visible group layers as per the esri service layer default visibility.
         * "_visible"         : returns visible group layers as per current visibility
         */
        private _getVisibleGroupLayersOfType(visibilityType, parentLayer, results, count);
        /** @private */
        private _getWMSLayerNameFromTitle(wmsTitle);
        private _getPrincipalResult<T>(f);
        private _processConnectionString(connectionString, obj);
        /** @private */
        private _isLocalProxyInfo(proxyInfo);
        private _processProxyInfo(proxyInfo);
        /**
         * Returns whether or not this service supports layer visibility. */
        supportsLayerVisibility(): boolean;
        /** @private */
        _setVisibility(layerID: string, visible: boolean, doNotRefresh?: boolean): void;
        private _extendWms();
        /** @private */
        private _hasTileLevels();
        /**
         * Adds the layers specified by the layer catalog details to the map service.
         * @param details The details.
         * @returns A list of the layers that were added.
         */
        applyCatalogLayersChange(details: geocortex.essentials.catalog.LayerCatalogDetail): Array<Layer>;
        /**
         * Retrieves the layer theme settings for this mapService by specified layer theme or layer theme id
         */
        getLayerThemeSettings(layerTheme: LayerTheme): LayerThemeSetting;
        getLayerThemeSettings(layerThemeId: string): LayerThemeSetting;
        /** If the current layer is a dynamic map service layer and the interval is reasonable, then refresh the map service periodically */
        private _resetUpdateTimer();
        /** When the timer goes off, refresh the map service */
        private _onUpdateIntervalTick();
        private _addToFilteredView(layer);
        /**
         * @private: The filter used for filtering each layer in a given mapService based on layer theme settings
         */
        private _layerThemeLayerFilter(layer);
        /**
         * @private
         * Gets the default geometry service url from the site configuration. Returns null if none found.
         */
        protected _getDefaultGeometryServiceUrl(): string;
        /**
         * @private
         * Gets the default geometry service security token. Returns null if none found.
         */
        protected _getDefaultGeometryServiceToken(): string;
    }
}
declare module geocortex.essentials {
    /**
     * Represents an ArcGIS feature layer. The properties in this class represent the configuration served from the Essentials REST API.
     */
    class FeatureLayerService extends MapService {
        /** The color that regular graphics are drawn with for this service. Represented by an array of RGB values, in that order, each in 0-255 .*/
        color: number[];
        /** The color that selected graphics are drawn with for this service. Represented by an array of RGB values, in that order, each in 0-255. */
        selectionColor: number[];
        serviceLayer: esri.layers.FeatureLayer;
        /**
         * Whether or not to disable caching of the FeatureLayerService on the client.
         * @note not used currently in esri JS API, so ignored.
         * @deprecated 2.0
         */
        disableClientCaching: boolean;
        /**
         * The size of the client cache
         * Note not used currently in esri JS API, so ignored.
         * @deprecated 2.0
         */
        onDemandCacheSize: number;
        /** The outFields configuration parameter */
        outFields: string;
        /**
         * Represents an esri.layers.FeatureLayer MODE type. One of:
         * - esri.layers.FeatureLayer.MODE_SNAPSHOT
         * - esri.layers.FeatureLayer.MODE_ONDEMAND
         * - esri.layers.FeatureLayer.MODE_SELECTION
         */
        queryMode: number;
        /**
         * The size of the virtual tiles used in on-demand mode
         * @note This option is only valid in on-demand mode and must be a square.
         */
        tileHeight: number;
        /**
         * The size of the virtual tiles used in on-demand mode
         * @note This option is only valid in on-demand mode and must be a square.
         */
        tileWidth: number;
        /** The {@link esri.layers.FeatureLayer} WHERE clause expression. */
        where: string;
        /** Whether or not the {@link FeatureLayerService} is editable and supports feature updates. */
        canUpdate: boolean;
        /** Whether or not the {@link FeatureLayerService} is editable and supports feature additions. */
        canAdd: boolean;
        /** Whether or not the {@link FeatureLayerService} is editable and supports feature deletions. */
        canDelete: boolean;
        /** Whether or not the {@link FeatureLayerService} is editable.*/
        canEdit: boolean;
        /** Whether or not the {@link geocortex.essentials.FeatureLayerService} can add attachments to features. */
        canAddAttachments: boolean;
        /** Whether or not the features geometry can be edited and moved on the map. */
        moveEnabled: boolean;
        /** Whether the features geometry can rotated or not. */
        rotateEnabled: boolean;
        /** Are the vertices of the geometry of the features in this feature layer are editable. */
        editVerticesEnabled: boolean;
        /** Can the geometry of the features in this feature layer can be scaled. */
        scaleEnabled: boolean;
        /** The renderer as defined by the Site. */
        renderer: esri.renderer.Renderer;
        /** @private */
        private _colorSet;
        /** @private */
        private _initialFeatureCollection;
        /** @private */
        private _serviceLayer;
        /**
         * Initializes a new instance of the {@link FeatureLayerService} class.
         * @param url The URL of the service.
         */
        constructor(url: string);
        /**
         * Gets an empty feature collection that can be used when creating new FeatureLayer from a feature collection.
         * It contains the layer definition of this Feature Layer but no actual features.
         * @return {featureCollectionObject} An empty Feature Collection object.
         */
        getEmptyFeatureCollection(): any;
        /**
         * Restore the FeatureLayer (service layer) that was created from the Site configuration.
         */
        restoreFeatureLayer(): void;
        /**
         * Replace the FeatureLayer (service layer) currently associated with this FeatureLayerService with a new one.
         * @param featureLayer The layer to use for the replacement.
         * @param maintainVisibility Indicate that we should maintain the same visibility setting for the new feature layer as the one being replaced.
         * @param maintainOpacity Indicate that we should maintain the same opacity setting for the new feature layer as the one being replaced.
         * @param maintainRenderer Indicate that we should maintain the same renderer for the new feature layer as the one being replaced.
         */
        replaceFeatureLayer(featureLayer: esri.layers.FeatureLayer, maintainVisibility: boolean, maintainOpacity: boolean, maintainRenderer: boolean): void;
        /** @private */
        _cleanUpLayer(layer: esri.layers.FeatureLayer): void;
        /**
         * Returns a count of the number of features that satisfy the input query.
         * Valid only for layers published using ArcGIS Server 10 SP1 or greater.
         * Layers published with earlier versions of ArcGIS Server return an error to the error callback.
         *
         * The query object has the following restrictions to avoid conflicts between layer and map properties:
         *  - outFields specified by the query object are overridden by the outFields specified in the FeatureLayer constructor.
         *  - The returnGeometry value specified by the query object is ignored and true is used.
         *  - The outSpatialReference set by the query object is ignored and the map's spatial reference is used.
         *
         * @param query The input query.
         * @param callbackResults The success callback to invoke when the query has completed successfully.
         * @param callbackErrors An error callback to invoke when an error occurs.
         */
        queryCount(query: esri.tasks.Query, callbackResults: (results: any) => void, callbackErrors: (error: Error) => void): void;
        /**
         * Queries features from the feature layer. Layer definition and time definition are honored.
         * Whenever possible the feature layer will perform the query on the client.
         *
         * The query object has the following restrictions to avoid conflicts between layer and map properties:
         *  - outFields specified by the query object are overridden by the outFields specified in the FeatureLayer constructor.
         *  - The returnGeometry value specified by the query object is ignored and true is used.
         *  - The outSpatialReference set by the query object is ignored and the map's spatial reference is used.
         *
         * @param query The input query.
         * @param callbackResults The success callback to invoke when the query has completed successfully.
         * @param callbackErrors An error callback to invoke when an error occurs.
         */
        queryFeatures(query: esri.tasks.Query, callbackResults: (results: any) => void, callbackErrors: (error: Error) => void): dojo.Deferred;
        /**
         * Queries for OBJECTIDs. There is no limit on the number of OBJECTIDs that are returned from the server.
         * Like queryFeatures this operation will perform queries on the client whenever possible.
         * Valid only for layers published using ArcGIS Server 10 SP1 or greater.
         *
          * The query object has the following restrictions to avoid conflicts between layer and map properties:
         *  - outFields specified by the query object are overridden by the outFields specified in the FeatureLayer constructor.
         *  - The returnGeometry value specified by the query object is ignored and true is used.
         *  - The outSpatialReference set by the query object is ignored and the map's spatial reference is used.
         *
         * @param query The input query.
         * @param callbackResults The success callback to invoke when the query has completed successfully.
         * @param callbackErrors An error callback to invoke when an error occurs.
         */
        queryIds(query: esri.tasks.Query, callbackResults: (results: any) => void, callbackErrors: (error: Error) => void): dojo.Deferred;
        /**
         * Queries related features or records from another layer or table.
         * @param query The input query.
         * @param callbackResults The success callback to invoke when the query has completed successfully.
         * @param callbackErrors An error callback to invoke when an error occurs.
         */
        queryRelatedFeatures(query: esri.tasks.RelationshipQuery, callbackResults: (results: any) => void, callbackErrors: (error: Error) => void): dojo.Deferred;
        /** @private */
        private _getEsriMap();
        /** @private */
        _configureObject(obj: any, deepInitialize?: boolean): void;
        /** @private */
        _updateServiceToken(token: string): void;
        /** @private */
        _createServiceLayer(): void;
        /**
         * GVH-6928: Computes the initial visibility to apply to the service layer we're creating. A feature service will always be set to visible as per recent changes to Essentials to support
         * the new configurable layer list. Its the single feature layer within the feature service that will determine the visibility of the created service layer.
         */
        private _computeInitServiceLayerVisibility();
        /**
         * Handles a layer onLoad event - whether or not this was satisfied from the IE cache. See GVH-2287.
         * @private
         */
        private _handleLayerLoadEvent(layer);
        /**
         * Indicates whether the feature layer has relationships in which it is the origin.
         * This will always be false for layer coming from a server prior to 10.1.
         */
        hasOriginRelationships(): boolean;
        /**
         * Returns a Feature Layer pointing to the table referenced in the specified relationship.
         * @param relationshipId The id of the relationship.
         * @param callbackResults The success callback to invoke if the request completes successfully.
         * @param callbackErrors An error callback to invoke when an error occurs.
         */
        getRelatedFeatureLayer(relationshipId: number, callbackResults: (result: any) => void, callbackErrors: (error: Error) => void): dojo.Deferred;
        /**
         * @private
         * Returns an Esri Relationship objects, given a relationship ID.
         */
        private _getEsriRelation(relationshipId);
        /** @private */
        private _getRelation(relationshipId);
    }
}
declare module geocortex.workflow {
    class ArgumentInfo {
        /**
         * The name of the {@link geocortex.workflow.ArgumentInfo}.
         * @type String
         */
        name: string;
        /**
         * The type name of the {@link geocortex.workflow.ArgumentInfo}.
         * @type String
         */
        typeName: string;
        /**
         * The runtime type name of the {@link geocortex.workflow.ArgumentInfo}.
         * @type String
         */
        runtimeTypeName: string;
        /**
         * Whether the {@link geocortex.workflow.ArgumentInfo} is required.
         * @type Boolean
         */
        isRequired: boolean;
        /**
         * The value of the {@link geocortex.workflow.ArgumentInfo}.
         * @type Object
         */
        value: any;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.ArgumentInfo} class.
         * @class
         * Represents an argument used in a {@link geocortex.workflow.ExternalActivityInfo}.
         * @constructs
         * @param {String} name The name of the argument info.
         * @param {String} typeName The type name of the argument info.
         * @param {Boolean} isRequired Indicates whether the argument info is required.
         * @param {Object} value The value of the argument info.
         */
        constructor();
        constructor(name: string, typeName: string, isRequired: boolean, value: any);
        /** @private */
        _configureObject(restObject: any): void;
        /** @private */
        _internalClone(): ArgumentInfo;
    }
}
declare module geocortex.workflow {
    class ExternalActivityInfo {
        /**
         * The ID of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        id: string;
        /**
         * The display name of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        displayName: string;
        /**
         * The type name of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        typeName: string;
        /**
         * The instance Id of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        instanceId: string;
        /**
         * The external Id of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        externalId: string;
        /**
         * Indicates whether the activity should be debugged.
         * @type Boolean
         */
        debug: boolean;
        /**
         * The syncToken of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type String
         */
        syncToken: string;
        /**
         * Whether the {@link geocortex.workflow.ExternalActivityInfo} is complete.
         * @type Boolean
         */
        isComplete: boolean;
        /**
         * Whether the {@link geocortex.workflow.ExternalActivityInfo} has been aborted for any reason.
         * @type Boolean
         */
        isAborted: boolean;
        /**
         * The input {@link geocortex.workflow.ArgumentInfo}s of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type ArgumentInfo[]
         */
        inputs: ArgumentInfo[];
        /**
         * The output {@link geocortex.workflow.ArgumentInfo}s of the {@link geocortex.workflow.ExternalActivityInfo}.
         * @type ArgumentInfo[]
         */
        outputs: ArgumentInfo[];
        /**
         * Initializes a new instance of the {@link geocortex.workflow.ExternalActivityInfo} class.
         * @class
         * Represents an external activity of a workflow.
         * @constructs
         * @param {String} id The ID of the external activity.
         * @param {String} displayName The name of the external activity.
         * @param {String} typeName The type name of the external activity.
         * @param {String} instanceId The instance Id of the external activity.
         * @param {String} externalId The external Id of the external activity.
         * @param {String} syncToken The sync Token of the external activity.
         * @param {Boolean} isComplete Indicates whether the external activity is complete.
         * @param {geocortex.workflow.ArgumentInfo[]} inputs The inputs of the external activity.
         * @param {geocortex.workflow.ArgumentInfo[]} outputs The outputs of the external activity.
         */
        constructor();
        constructor(id: string, displayName: string, typeName: string, instanceId: string, externalId: string, syncToken: string, isComplete: boolean, inputs: ArgumentInfo[], outputs: ArgumentInfo[]);
        /** @private */
        _configureObject(restObject: any): void;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a GIS workflow reference by a {@link Site}.
     */
    class Workflow extends AsyncInitializable {
        /** The display name of the {@link Workflow}.  */
        displayName: string;
        /** Whether to run the {@link Workflow} on startup of the client application.  */
        runOnStartup: boolean;
        /** The last error of the Workflow. */
        error: Error;
        /** The extensions of the Workflow, as defined by an administrator. */
        extensions: Extension[];
        /** The externalActivities of the {@link Workflow}. */
        externalActivities: any;
        /** The ID of the {@link Workflow}. */
        id: string;
        /**
         * The properties of the Workflow, as defined by an administrator. */
        properties: any;
        /** The {@link Site} that the {@link Workflow} belongs to. */
        site: Site;
        /** @private */
        private _inputs;
        /** @private */
        private _outputs;
        /**
         * Initializes a new instance of the {@link Workflow} class.
         * @param url The URL to the REST endpoint of the {@link Workflow}.
         */
        constructor(url: string);
        /**
         * Return an array of ArgumentInfo that represents the inputs that can be populated with values and provided to the startWorkflow method of
         * {@link WorkflowControllerProxy}.
         */
        getInputs(): geocortex.workflow.ArgumentInfo[];
        /**
         * Return an array of {@link ArgumentInfo} that represents the
         * metadata about the outputs that will be returned when the workflow has completed. It does
         * not contain actual running values. The real outputs will be provided by the workflowComplete
         * method of any class implementing the {@link IActivityDispatcher}
         * interface such as the {@link SimpleActivityDispatcher}.
         */
        getOutputsMetadata(): geocortex.workflow.ArgumentInfo[];
        /** @private */
        private _cloneArgumentInfoCollection(collection);
        /** @private */
        _configureObject(restObject: any, deepInitialize?: boolean): void;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a Web Map, as referenced by a {@link Site}.
     */
    class WebMapReference extends AsyncInitializable {
        /** The display name of the {@link WebMapReference}. */
        displayName: string;
        /** The ID of the {@link WebMapReference}.*/
        id: string;
        /** @private */
        private _isLoading;
        /** @private */
        private _onLoadingComplete;
        /** @private */
        private _onLoadingError;
        /** @private */
        private _layerTypes;
        /** @private */
        private _arcgisSharingRegularExpressions;
        /** The {@link Site} that the {@link WebMapReference} belongs to. */
        site: Site;
        /**
         * Initializes a new instance of the {@link WebMapReference} class.
         * @param url The URL to the REST endpoint of the {@link WebMapReference}.
         */
        constructor(url: string);
        /**
         Gets whether the {@link DataLink} is currently performing data linking. */
        isLoading(): boolean;
        /** @private */
        private _getUrlPortions(url);
        /** @private */
        private _loadWebMap(urlPortions, webMapObjectUrl, progressing);
        /**
         * Loads a Web Map using a feature set containing the attributes required during the operation. This is an asynchronous method; you may provide delegates for completion or error information.
         * @param webMapObject The web map object.
         * @param loadComplete The delegate that will be called when the operation has completed, even if an error occurs. This delegate expects one argument: an Object containing the result.
         * @param loadError The delegate that will be called if an error occurs during the operation. This delegate expects two arguments: a reference to the WebMapReference instance, and an Error.
         */
        _initializeWebMap(webMapObject: any, site: geocortex.essentials.Site, loadComplete: (results: any) => void, loadError: (error: Error) => void): void;
        /** @private */
        private _processItemData(itemData);
        /** @private */
        private _processLayerCollection(layerCollection, serviceFunction);
        /** @private */
        private _addLayerToMap(layer);
        /** @private */
        private _addFeatureCollectionToMap(featureCollection);
        /** @private */
        private _loadingRestComplete(result);
        /** @private */
        private _loadingRestError(er);
        /**
         * Configures the web map reference.
         * @param obj The web map reference object.
         * @private
         */
        _configureObject(obj: any, deepInitialize?: boolean): void;
    }
}
declare module geocortex.essentials {
    class PrintTemplate extends AsyncInitializable {
        /** The description of the {@link PrintTemplate}. */
        description: string;
        /** The display name of the {@link PrintTemplate}. */
        displayName: string;
        /** The extensions of the {@link PrintTemplate}, as defined by an administrator. */
        extensions: Extension[];
        /** The ID of the {@link PrintTemplate}. */
        id: string;
        /** The visibility of the {@link PrintTemplate}.*/
        visible: boolean;
        /** The maximum resolution at which this template can be printed. */
        maximumResolution: number;
        /** The properties of the {@link PrintTemplate}, defined by the administrator on the server. */
        properties: any;
        /** The {@link Site} that the {@link PrintTemplate} belongs to. */
        site: Site;
        /** The collection of supported {@link geocortex.essentials.Scale}s for the {@link PrintTemplate}. */
        supportedMapScales: Scale[];
        /** The collection of supported output formats for the {@link PrintTemplate}. */
        supportedOutputFormats: string[];
        /** The collection of supported {@link Resolution} settings for the {@link PrintTemplate}. */
        supportedResolutions: Resolution[];
        /** Whether or not this print template supports asynchronous execution providing an email to the user upon completion. */
        supportsEmailNotification: boolean;
        /** The collection of {@link TextField} for the {@link PrintTemplate}. */
        textFields: TextField[];
        /** The map grids (for example, graticules) that are available for the print template. */
        grids: MapGrid[];
        /** The type of report. One of {@link ReportType}. (currently only supporting `MAP_TEMPLATE_REPORT`). */
        type: string;
        /** Whether or not this print template is default. */
        isDefault: boolean;
        /** Default map scale for this print template. */
        defaultMapScale: Scale;
        /** Default resolution for this print template. */
        defaultResolution: Resolution;
        /** Default grid for this print template. */
        defaultGrid: MapGrid;
        /** Default output format for this print template. */
        defaultOutputFormat: string;
        /** @private */
        private _printing;
        /** @private */
        private _onPrintComplete;
        /** @private */
        private _onPrintError;
        /**
         * Initializes a new instance of the {@link PrintTemplate} class.
         * @param url The URL to the REST endpoint of the {@link PrintTemplate}.
         */
        constructor(url: string);
        /**
         * Gets whether the {@link PrintTemplate} is currently being printed.
         * @return {Boolean} True if a print operation is currently being performed, false otherwise.
         */
        isPrinting(): boolean;
        /**
         * Prints the template using {@link ReportParameters}. This is an asynchronous
         * method, you may provide delegates for completion or error information.
         * @param printParameters The print parameters.
         * @param printComplete The delegate that will be called when the print has completed
         * (even if an error occurs). This delegate expects one argument: a string representing the URL of the prepared report.
         * @param  printError The delegate that will be called if an error occurs. This delegate expects two arguments: a reference to the PrintTemplate instance, and an Error.
         */
        print(printParameters: ReportParameters, printComplete: (results: any) => void, printError: (error: Error) => void): void;
        _configureObject(obj: any, deepInitialize?: boolean): void;
        /** @private */
        private _printRestComplete(results);
        /** @private */
        private _printRestError(error);
    }
}
declare module geocortex.essentials {
    /**
     * Represents a Named Extent defined by a {@link Site}.
     * Named Extents are geographical regions of interest that are defined for a {@link Site}.
     */
    class NamedExtent extends AsyncInitializable {
        /** The display name of the {@link NamedExtent}. */
        displayName: string;
        /** The extensions of the {@link NamedExtent}, as defined by an administrator. */
        extensions: Extension[];
        /** The extent of the {@link NamedExtent}. */
        extent: esri.geometry.Extent;
        /** The ID of the {@link NamedExtent}.*/
        id: string;
        /** The properties of the {@link NamedExtent}, as defined by an administrator. */
        properties: any;
        /** The {@link Site} that the {@link NamedExtent} belongs to. */
        site: Site;
        /**
         * Initializes a new instance of the {@link NamedExtent} class.
         * @param url The URL to the REST endpoint of the {@link NamedExtent}.
         */
        constructor(url: string);
        /**
         * Zooms and pans the map to the extent defined in the {@link NamedExtent}. */
        navigateTo(): void;
        /** @private */
        _configureObject(obj: any, deepInitialize?: boolean): void;
    }
}
declare module geocortex.essentials {
    class GeoprocessingEndpoint extends AsyncInitializable {
        /** The display name of the {@link GeoprocessingEndpoint}. */
        displayName: string;
        /** The extensions of the {@link GeoprocessingEndpoint}, as defined by an administrator. */
        extensions: Extension[];
        /** The ID of the {@link GeoprocessingEndpoint}. */
        id: string;
        /** The properties of the {@link GeoprocessingEndpoint}, as defined by an administrator. */
        properties: any;
        /** The type of {@link GeoprocessingEndpoint}, one of the {@link GeoprocessingEndpointType}s */
        geoprocessorType: string;
        /** The URL of the geoprocessor service published by ArcGIS Server. */
        geoprocessorUrl: string;
        /** The {@link Site} that the {@link Endpoint} belongs to. */
        site: Site;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.GeoprocessingEndpoint} class.
         * @param url The URL to the REST endpoint of the {@link eoprocessingEndpoint}.
         */
        constructor(url: string);
        /** @private */
        _configureObject(results: {
            id: string;
            displayName: string;
            geoprocessorType?: string;
            serviceType?: string;
            connectionString: string;
            properties: geocortex.PropertyParam[];
            extensions: geocortex.ExtensionParam[];
        }): void;
        /** @private */
        _processConnectionString(connectionString: string): void;
    }
}
/** @private */
declare module geocortex.essentials.GeoprocessingEndpointType {
    var ARCGIS_GEOPROCESSOR: string;
}
declare module geocortex.essentials {
    /**
     * Represents a geometry service endpoint defined by a {@link geocortex.essentials.Site}.
     */
    class GeometryEndpoint extends AsyncInitializable {
        /** The display name of the configured {@link GeometryEndpoint}. */
        displayName: string;
        /** The extensions of the {@link GeometryEndpoint}, as defined by the administrator on the server. */
        extensions: Extension[];
        /** The ID of the {@link GeometryEndpoint}. */
        id: string;
        /** * The properties of the {@link geocortex.essentials.GeometryEndpoint}, as defined by the administrator on the server. */
        properties: Object;
        /** The type of {@link geocortex.essentials.GeometryEndpoint}, one of the {@link GeometryEndpointType}s. */
        geometryServiceType: string;
        /** The URL of the geometry service published by ArcGIS Server. */
        geometryServiceUrl: string;
        /** The security token that must be provided when requesting the service from ArcGIS Server. */
        geometryServiceToken: string;
        /** The {@link Site} that the {@link GeometryEndpoint} belongs to. */
        site: Site;
        /**
         * Initializes a new instance of the {@link GeometryEndpoint} class.
         * @param url The URL to the REST endpoint of the {@link GeometryEndpoint}.
         */
        constructor(url: string);
        /** @private */
        _configureObject(results: any): void;
        /** @private */
        private _processConnectionString(connectionString);
    }
}
declare module geocortex.essentials.GeometryEndpointType {
    var ARCGIS_GEOMETRY: string;
}
declare module geocortex.essentials {
    /** @docs-hide-from-nav */
    class ServiceHelper {
        /**
         * Retrieves the value of the supplied key from the supplied connection
         * string parameter.  The connection string is assumed to be in
         * key=value format, with key-value pairs separated by semicolons
         *
         * @param params The full connection string containing the key the caller
         * is looking to find the value for.
         * @param key The key for the value being searched.
         * @returns {String} the string value corresponding to the supplied key;
         * or an empty string if no such key is found in the supplied params.
         */
        static extractConnectionStringValue(params: string, key: string): string;
    }
}
declare module geocortex.essentials {
    interface GeocodingEndpointResponse {
        id: string;
        displayName: string;
        serviceType: string;
        includeInGlobalSearch: boolean;
        connectionString: string;
        properties: geocortex.PropertyParam[];
        extensions: geocortex.ExtensionParam[];
        globalSearchKey: string;
        parameters: GeocodingEndpointParameter[];
    }
    interface GeocodingEndpointParameter {
        name: string;
        displayName: string;
        value: string;
        isRequired: boolean;
        isVisible: boolean;
    }
    class GeocodingEndpoint extends AsyncInitializable {
        /**
         * The parameters supplied for creation of a Bing geocoder through the connection string.
         * This object will be null for any GeocodingEndpoint
         * which is not a Bing geocoder.
         */
        bingProperties: any;
        /** The display name of the {@link GeocodingEndpoint}. */
        displayName: string;
        /** The extensions of the {@link GeocodingEndpoint}. The extensions are defined by the administrator on the server. */
        extensions: Extension[];
        /** The ID used to reference the {@link GeocodingEndpoint}. */
        id: string;
        /** The properties of the {@link GeocodingEndpoint}. The properties are defined by the administrator on the server. */
        properties: Object;
        /** The type of {@link GeocodingEndpoint}, representing by a value from {@link GeocodingEndpointType}. */
        geocoderType: string;
        /**
         * The URL of the geocoder service published by ArcGIS Server, if the {@link serviceType} of this GeocodingEndpoint is an ArcGisGeocoder.
         * If this is a Bing geocoder, this value will be null.
         */
        geocoderUrl: string;
        /**
         * The security token that must be provided when requesting the service from ArcGIS Server, if the {@link serviceType} of
         * this GeocodingEndpoint is an ArcGisGeocoder. If this is a Bing geocoder, this value will be null.
         */
        geocoderToken: string;
        /** Whether or not this particular geocoder should be invoked when a user performs a global search operation. */
        includeInGlobalSearch: boolean;
        /** The {@link Site} that the {@link GeocodingEndpoint} belongs to. */
        site: Site;
        /** The geocoding endpoint parameters of {@link GeocodingEndpoint}. */
        parameters: GeocodingEndpointParameter[];
        /** The global search key of {@link GeocodingEndpoint}. */
        globalSearchKey: string;
        /**
         * Creates a new instance of the {@link GeocodingEndpoint} class.
         * @param url The URL to the REST endpoint of the {@link GeocodingEndpoint}.
         */
        constructor(url: string);
        /** @private */
        _configureObject(results: GeocodingEndpointResponse): void;
        /** @private */
        private _processConnectionString(connectionString);
    }
}
declare module geocortex.essentials.GeocodingEndpointType {
    var ARCGIS_GEOCODER: string;
    var BING_GEOCODER: string;
}
declare module geocortex.essentials {
    /**
     * Contains information about the connected user.
     */
    interface Principal {
        /** Flag that indicates if the user was authenticated or not. */
        isAuthenticated: boolean;
        /** Indicates the label (friendly name) of this principal. */
        label: string;
        /** Indicates the expiration time of the principal. */
        expiry?: string;
        /** Collection of identities that represents the current user. */
        identities: Identity[];
        /** Indicates any semantics relevant to sign in / sign out behavior. */
        policy: {
            /** Indicates that the policy is suggesting to the client that authentication may be desirable or even required. */
            authenticate?: boolean;
            /** Indicates to the client what is acceptable for sign in / sign out. */
            hints?: string;
            /** The list of available issuers. */
            issuers?: Issuer[];
        };
        /** Indicates any important URLs. */
        urls: {
            /** Indicates the expiration notice content URL. */
            expirationNotice?: string;
            /** Indicates the referrer URL. */
            referrer?: string;
            /** Indicates the refresh URL. */
            refresh?: string;
            /** Indicates the sign in URL. */
            signIn?: string;
            /** Indicates the sign out URL. */
            signOut?: string;
        };
        /** Indicates the tokens that may be consumed. */
        tokens: {
            /** Indicates the ArcGIS tokens (realm => token). */
            arcgis?: {
                [realm: string]: string;
            };
            /** Indicates the Geocortex tokens (realm => token). */
            geocortex?: {
                [realm: string]: string;
            };
            /** Indicates the site token. */
            site?: string;
        };
    }
    /**
     * Represents an authenticated user identity.
     */
    interface Identity {
        /** A string representing the type of authentication used. */
        authenticationType: string;
        /** Flag that indicates if the identity was authenticated. */
        isAuthenticated: boolean;
        /** Indicates which claim type is the name. */
        nameClaimType: string;
        /** Indicates which claim type is the role. */
        roleClaimType: string;
        /** Indicates the label (friendly name) of this identity. */
        label: string;
        /** Contains the list of claims associated with this identity.*/
        claims: Claim[];
    }
    /**
     * Represents a claim received via federated authentication.
     */
    interface Claim {
        /** Indicates the type of the claim.*/
        type: string;
        /** Indicates the value of the claim. */
        value: string;
        /** Indicates the type of the value. */
        valueType: string;
        /** Indicates the intermediate issuer of the claim. */
        issuer: string;
        /** Indicates the original issuer of the claim. */
        originalIssuer: string;
    }
    /**
     * An issuer of security tokens (i.e. security provider).
     */
    interface Issuer {
        /** The friendly name of the issuer. */
        displayName: string;
        /** The type of issuer, e.g. "ags-oauth2", "windows", etc. */
        type: string;
        /** The friendly name for the issuer type, e.g. "Windows Integrated", "ArcGIS Online", etc. */
        displayType: string;
        /** Hint associated with the issuer. */
        hint: string;
        /** URLs associated with this issuer. */
        urls: {
            /** A sign-in URL that is specific to this issuer. */
            signIn: string;
        };
    }
}
declare module geocortex.essentials {
    /** Internal helper class used to assist in security related actions. */
    class SecurityHelper {
        dialog: HTMLDivElement;
        frame: HTMLIFrameElement;
        finished: boolean;
        id: string;
        scripts: Array<HTMLScriptElement>;
        site: Site;
        static getCurrent(): SecurityHelper;
        static beginRefresh(site: Site): boolean;
        static cancel(): boolean;
        /**
         * This refresh method uses the system browser which is assumed to not be the
         * current browser.  In practice this only happens on GMAF.
         */
        openSystemBrowser(): void;
        /**
         * This is the preferred refresh method.  If this fails we won't hear back from the frame
         * and will decide to open the popup.
         */
        openFrame(): void;
        /**
         * This is the second choice refresh method.
         */
        openPopup(): void;
        getExpirationNoticeUrl(): string;
        getRefreshUrl(): string;
        sendRequest(url: string): void;
        showContent(response: {
            content: string;
            rid: string;
        }): boolean;
        /**
         * Called from the SignInHelper, both before and after token refresh.  If there's a token in the hash
         * then refresh has happened, otherwise refresh must start.
         * @param hash
         * @param href
         * @returns The URL to redirect to if redirect should happen.
         */
        handleSignIn(hash: string, href: string): string;
        finish(): boolean;
        updateSitePrincipal(rawSite: {
            principal: Principal;
            rid: string;
        }): boolean;
        /**
         * When the system browser (and not this browser) does the log in then it must
         * also do the refresh because it holds cookie state necessary to refresh.
         * In practice this only happens on GMAF.
         */
        useSystemBrowser(): boolean;
    }
    interface SessionExpiringEvent {
        site: Site;
        handled: boolean;
        resumeRefresh: () => boolean;
        suspendRefresh: () => boolean;
    }
}
declare module geocortex.essentials {
    /**
     * Represents a Geocortex Essentials {@link Site} that is configured on the server and accessed via a REST endpoint.
     * You must call the {@link initialize} method on the {@link Site} before using it.
     * To determine if the {@link Site} has already been initialized, check the {@link isInitialized} property.
     * The {@link Site} is initialized asynchronously, so you must attach an event handler to determine when the initialization has finished.
     * You can also attach a handler to the event that will report initialization errors.
     */
    class Site extends AsyncInitializable {
        /** The current version of the Geocortex Essentials serving the {@link Site}. */
        currentVersion: string;
        /**
         * The default data provider (e.g. "Oracle", "SqlServer", etc.) for all map services and layers in this site.
         * Individual map services and layers may have overridden this default.
         */
        dataProvider: string;
        /**
         * Whether or not to initialize this site with a complete representation of the
         * {@link Site} in REST (deep initialization).  If false, the different components of
         * the {@link Site} such as the map will be initialized with a separate HTTP call after
         * the {@link Site} has been retrieved.
         */
        deepInitialize: boolean;
        /** The original URL of the Essentials site REST endpoint. */
        originalUrl: string;
        /**
         * The necessary information for logging in to an ArcGIS Portal, such as ArcGIS Online.
         * This will be set if the site is using secure ArcGIS Online content and a login is required,
         * or will be null if the site is not using secure ArcGIS Online content and a login is not required.
         */
        arcGisPortalSecurityContext: ArcGisPortalSecurityContext;
        /** The display name of the {@link Site}. */
        displayName: string;
        /** The interval period (in seconds) for updating the secured map services tokens. */
        updateInterval: number;
        /** The Essentials {@link Map} defined in the {@link Site}. */
        essentialsMap: Map;
        /** The extensions of the {@link Site}, as defined by the administrator on the server. */
        extensions: Extension[];
        /** The {@link GeocodingEndpoint}s defined in the {@link Site}.*/
        geocodingEndpoints: GeocodingEndpoint[];
        /** The {@link GeometryEndpoint}s defined in the {@link Site}. */
        geometryEndpoints: GeometryEndpoint[];
        /** The {@link GeoprocessingEndpoint}s defined in the {@link Site}. */
        geoprocessingEndpoints: GeoprocessingEndpoint[];
        /** The configurable layer list rest endpoint defined in the {@link Site}. */
        layerListRestEndpoint: RestLayerList;
        /** Whether the {@link Site} contains any geocoding endpoints. */
        hasGeocodingEndpoints: boolean;
        /** Whether the {@link Site} contains any geometry endpoints. */
        hasGeometryEndpoints: boolean;
        /** Whether the {@link Site} contains any geoprocessing endpoints. */
        hasGeoprocessingEndpoints: boolean;
        /** Whether the {@link Site} contains a collection of {@link NamedExtent} objects. */
        hasNamedExtents: boolean;
        /** Whether the {@link Site} contains a north arrow configuration. */
        hasNorthArrow: boolean;
        /** Whether the {@link Site} contains an overview map. */
        hasOverviewMap: boolean;
        /** Whether the {@link Site} contains a collection of {@link PrintTemplate} objects. */
        hasPrintTemplates: boolean;
        /** Whether the {@link Site} has any configured viewers. */
        hasViewers: boolean;
        /** Whether the {@link Site} has a virtual directory defined. */
        hasVirtualDirectory: boolean;
        /** Whether the {@link Site} contains a collection of {@link Workflow} objects. */
        hasWorkflows: boolean;
        /** Whether the {@link Site} contains a collection of {@link WebMapReference} objects. */
        hasWebMaps: boolean;
        /** The ID of the {@link Site}. */
        id: string;
        /** Collection of {@link NamedExtent} objects associated with the {@link Site}. */
        namedExtents: NamedExtent[];
        /** The overview {@link Map} defined in the {@link Site}. */
        overviewMap: Map;
        /** Collection of {@link PrintTemplate} objects associated with the {@link Site}. */
        printTemplates: PrintTemplate[];
        /** The properties of the {@link Site}, as defined by the administrator on the server.*/
        properties: Object;
        /** A boolean indicating that the esri service layers have been loaded in the map */
        serviceLayersLoaded: boolean;
        /** The URL to a Geocortex Essentials {@link Site}'s REST endpoint. */
        url: string;
        /**
         * Collection of {@link Workflow} objects associated with the {@link Site}. */
        workflows: Workflow[];
        /**
         * The object that represents information about web maps and
         * the collection of {@link WebMapReference} objects associated with the {@link Site}.
         */
        webMapsInfo: any;
        /**
         * An optional configuration preprocessor - a function to process the configuration in place before parsing and loading.
         * After initialization, this is nulled out.
         */
        configPreprocessor: (configObject: any) => void;
        /** Occurs when an Esri {@link esri.layers.Layer} has loaded. */
        onLayerLoad: (layer: esri.layers.Layer) => void;
        /** Occurs when a there is a problem loading an Esri layer. */
        onLayerLoadError: (error: Error) => void;
        /** Occurs when the service layers have been loaded in the map. */
        onServiceLayersLoaded: (site: Site) => void;
        /** Occurs when a federated sign in is initiated. */
        onSignIn: (args: {
            url: string;
        }) => void;
        /** Occurs when sing out is initiated. */
        onSignOut: () => void;
        /** Occurs when the user cancels the sign in process. */
        onUserSignInCancelled: (args: {
            tryAgainAction: () => void;
        }) => void;
        principal: Principal;
        /** Overrides the redirect target url used when signing in. */
        signInRedirectUri: string;
        /** Overrides the redirect target url used when signing out. */
        signOutRedirectUri: string;
        private _esriMap;
        private _geocodingEndpointsInitialized;
        private _geometryEndpointsInitialized;
        private _geoprocessingEndpointsInitialized;
        private _mapInitialized;
        private _namedExtentsInitialized;
        private _overviewMapInitialized;
        private _printTemplatesInitialized;
        private _workflowsInitialized;
        private _webMapsInitialized;
        private _initializedHandlerCalled;
        private _signInEnabled;
        private _signOutEnabled;
        /** @private This redirect uri comes from the site definition and does not take prescedence over the manual setting. */
        private _signOutRedirectUrl;
        /** @private - Handle to the setInterval code for updating tokens. In case we ever wanted to clearInterval. */
        private _tokenIntervalHandle;
        /**
         * Initializes a new instance of the {@link Site} class.
         * @param url URL to a Geocortex Essentials {@link Site} endpoint.
         * @param map The {@link esri.Map} object with which this {@link Site} will be associated.
         */
        constructor(url: string, map: esri.Map);
        /**
         * Initializes the {@link Site}.
         * This is an asynchronous method; for completion information, subscribe to the
         * {@link AsyncInitializable} {@link AsyncInitializable.initialized} and {2link AsyncInitializable.initializationFailed}events.
         *
         *     // Create a new empty ESRI map object
         *     var map = new esri.Map("map");
         *
         *     // Create a new Site object, supplying a URL to the REST endpoint
         *     // of an existing Essentials site, and the map object just created
         *     var essentialsSite = new geocortex.essentials.Site("http://sampleserver1.geocortex.com/geocortex/essentials/rest/sites/CharlotteArcGISOnline", map);
         *
         *     // Hook up events for when the initialization of the site completes,
         *     // and if it fails to initialize
         *     dojo.connect(essentialsSite, "onInitialized", site_Initialized);
         *     dojo.connect(essentialsSite, "onInitializationFailed", site_InitializationFailed);
         *
         *     // Initialize the site, which will load all configured layers into the ESRI map object
         *     essentialsSite.initialize();
         */
        initialize(): void;
        /**
         * Find the {@link Site} resource matching the specified ID.
         * @param resources The array of resources to look up.
         * @param resourceId The ID of the resource to find.
         */
        getResourceById(resources: any, resourceId: string): any;
        /**
         * Find the {@link Workflow} matching the specified ID.
         * @param workflowId The ID of the {@link Workflow} to find.
         */
        findWorkflowById(workflowId: string): Workflow;
        /**
         * Find the {@link PrintTemplate} matching the specified ID.
         * @param templateId The ID of the print template to find.
         */
        findPrintTemplateById(templateId: string): PrintTemplate;
        /**
         * Get all the {@link FeatureLayerService} objects defined in the site. */
        getFeatureServices(): FeatureLayerService[];
        /**
         * Gets the Esri {@link esri.Map} control.
         */
        getMap(): esri.Map;
        getEssentialsVersion(): number;
        /**
         * Performs a search query operation.
         * This is an asynchronous method, you may provide delegates for completion or error information.
         * @param queryParams The parameters for the search query.
         * @param searchBegin The delegate that will be called when the operation has started.
         * @param searchComplete The delegate that will be called when the operation has completed, even if an error occurs.
         * @param searchError The delegate that will be called if an error occurs during the operation.
         */
        search(queryParams: SearchQuery, searchBegin: (q: SearchQuery) => void, searchComplete: (results: SearchResults) => void, searchError: (e: Error) => void): void;
        /** @private */
        private _parseSearchResponse(searchResults, jsonObject);
        /**
         * Create the feature sets coming from geocortex search endpoint.
         * @private
         */
        private _createFeatureSets(jsonArray, includeHighlights);
        /**
         * Create a result feature coming from geocortex search endpoint.
         * @private
         */
        private _createFeature(jsonFeature, layer, includeHighlights);
        /** @private */
        private _jObjectToGraphic(jobject);
        /** @private */
        private _assignHighlights(feature, jobject);
        /** @private */
        private _initAsyncCollection(results, urlPath, memberCollection, objectType);
        /** @private */
        private _initAsyncCollectionErrorHandler(setInitializedDelegate, error);
        /** @private */
        private _initGeocodingEndpointsHandler(results);
        /** @private */
        private _initGeometryEndpointsHandler(results);
        /**
         * Gets the layer catalog asynchronously.
         * @param catalogParams The application.
         * @param loadBegin The callback to run when loading begins.
         * @param loadComplete The callback to run when loading completes.
         * @param loadError The callback to run when loading errors.
         */
        getLayerCatalog(catalogParams: geocortex.essentials.catalog.LayerCatalogParams, loadBegin: () => void, loadComplete: (results: any) => void, loadError: (e: Error) => void): void;
        /**
         * Gets the layer catalog details asynchronously.
         * @param catalogParams The application.
         * @param loadBegin The callback to run when loading begins.
         * @param loadComplete The callback to run when loading completes.
         * @param loadError The callback to run when loading errors.
         */
        getLayerCatalogDetails(catalogParams: geocortex.essentials.catalog.LayerCatalogDetailsParams, loadBegin: () => void, loadComplete: (results: any) => void, loadError: (e: Error) => void): void;
        /** @private */
        private _initGeoprocessingEndpointsHandler(results);
        /**
          * Responsible for scraping the token supplied by a sign-in response.
          * @private
          */
        private static _getTokenFromFragment();
        /**
         * Appends a query parameter to a URL.
         * @private
         * @param url An existing URL.
         * @param param One or more "name=value" parameter(s) to add to the URL.
         * @return The original URL with the given query parameters added.
         */
        private static _addQueryParameter(url, param);
        /**
         * Determines whether the current user is able to sign in.
         */
        canSignIn(): boolean;
        /**
         * Initiates a federated sign in.
         * @private
         * @param principal An optional argument that will take the {@link Principal} to sign in with explicitly.
         * @param url An optional sign-in URL to use, otherwise the principal's default URL will be used.
         */
        private _signIn(principal?, url?);
        /**
         * Initiates a federated sign in.
         * @param url An optional sign-in URL to use, otherwise the principal's default URL will be used.
         */
        signIn(url?: string): void;
        /**
         * Determines whether the current user is able to sign out.
         */
        canSignOut(): boolean;
        /**
         * Initiates a single sign out. NOTE: This will invalidate the security session for all applications
         * using the REST API. In other words, sign out for every application that signed in using our REST API.
         */
        signOut(): void;
        /**
          * Allows resources to find the token for a given resource pertaining to the current user.
          * @param url The url of the resource that is being accessed.
          * @param serviceType The type of the resource being accessed.
          * @returns Returns the appropriate token for the given type.
          */
        getTokenFromPrincipal(url: string, type: any): string;
        /**
         * Initializes the {@link Site} from the server.
         * {@link Site} needs to override the base initialize because it needs to initialize from more than one rest endpoint.</p>
         * @private
         */
        private _initialize();
        /** @private */
        private _initMapHandler(sender);
        /** @private */
        private _initMapErrorHandler(error);
        /** @private */
        private _initNamedExtentsHandler(results);
        /** @private */
        private _initOverviewMapHandler();
        /** @private */
        private _initOverviewMapErrorHandler(error);
        /** @private */
        private _initPrintTemplatesHandler(results);
        /** @private */
        private _getUpdatedServiceTokens();
        /** @private */
        private _processServiceTokensHandler(results);
        /** @private */
        private _processServiceTokensErrorHandler(error);
        /** @private */
        private _updateServiceTokens(map, tokens);
        /** @private */
        private _updateServiceTokensFromPrincipal(map);
        /** @private */
        private _refreshPrincipal();
        /** @private */
        private _refreshPrincipalAt(expiry, gracePeriod);
        /**
         * Updates the principal in the site with the given principal.
         * @param principal The principal to update the site with.
         */
        updatePrincipal(principal: Principal): void;
        /** @private */
        private _getCredential(url, options?);
        /** @private */
        private _hookGetCredential();
        /** @private */
        private _initSiteHandler(results);
        /** @private */
        private _initSiteErrorHandler(error);
        /** @private */
        private _initWorkflowsHandler(results);
        /** @private */
        private _initWebMapHandler(results);
        /** @private */
        private _siteInitializeUpdate();
        /** @private */
        private _verifySiteDependencies(results);
    }
}
declare module geocortex.essentials {
    /**
     * Helper class for dealing with REST data around layrs and layer definitions.
     */
    class RestHelper {
        static tokenDurationMinutes: number;
        /**
         * Replaces client side tokens in the supplied input string with their correct values.
         * Client side tokens replaced are:
         * - SiteRestUrl
         * - VirtualDirectoryUrl
         * - RestVirtualDirectoryUrl
         * - HostUri
         * - RestToken
         *
         * @param site the current {@link Site} for which tokens are to be replaced.
         * @param input The input string with tokens.
         */
        static processClientSideTokens(site: geocortex.essentials.Site, input: string): string;
        /**
         * Validates a Dynamic Layer Definition, ensuring all relevant required fields are supplied.
         * @param json A JSON string containing the Dynamic Layer Definition.
         */
        static validateDynamicDefinition(json: string): void;
        /**
         * Converts a JSON string into a JSON object.
         * @param json A JSON string containing the Dynamic Definition.
         * @returns The JSON object created.
         */
        static getJsonObjectFromJsonString(json: string): any;
        /**
         * Creates a layer source from a JSON object.
         * @param The source as a JSON object.
         * @returns Either an {esri.layers.LayerMapSource} or {esri.layers.LayerDataSource}.
         */
        static getLayerSourceFromJsonObject(sourceJson: any): any;
        /**
         * Create a DynamicLayerInfo from a dynamic definition in JSON format.
         * @param json A JSON string containing the dynamic definition.
         * @param id The ID to use if not specified in the dynamic definition.
         * @returns {esri.layers.DynamicLayerInfo} The DynamicLayerInfo created.
         */
        static getDynamicLayerInfoFromJson(json: string, id: string): esri.layers.DynamicLayerInfo;
        /**
        * Create a string from a dynamic definition in JSON format.
        * @param {String} json A JSON string containing the dynamic definition.
        * @returns {String} The definition expression (where clause).
        */
        static getDynamicExpressionFromJson(json: string): string;
        /**
         * Create a LayerDrawingOptions object from a dynamic definition in JSON format.
         * @param json A JSON string containing the dynamic definition.
         */
        static getLayerDrawingOptionsFromJson(json: string): esri.layers.LayerDrawingOptions;
        /** @private */
        private static _replaceToken(token, input, replacementValue);
        /** @private */
        static _createRestParametersFromQuery(query: any): any;
        /** @private */
        static _convertSpatialRelationshipToDotnet(rel: string): string;
        /** @private */
        static _convertSpatialRelationshipFromDotnetIndex(rel: number): string;
    }
}
declare module geocortex.essentials {
    /**
     * Client representation of a layer hyperlink object attached to a layer.
     */
    class LayerHyperlink {
        /** Whether to URL encode replacement values in the uri property. */
        encodeUriReplacementValues: boolean;
        /** The URI of an image which represents the hyperlink being generated. */
        iconUri: string;
        /** The {@link geocortex.essentials.Layer} that this LayerHyperlink belongs to. */
        layer: Layer;
        /** The name of the target browser window which the hyperlink result will populate (e.g., _blank). */
        target: string;
        /** The text to display in place of the hyperlink URI. */
        text: string;
        /** The information shown to the user when the hyperlink is hovered over. */
        toolTip: string;
        /** A URI format string which can be used to dynamically insert field values within the URI. */
        uri: string;
        /**
         * Initializes a new instance of the {@link LayerHyperlink} class.
         * @param layerHyperlinkInfo Values used to populate the members of this object.
         * @param layer The layer which owns this {@link LayerHyperlink}.
         */
        constructor(layerHyperlinkInfo: {
            encodeUriReplacementValues: boolean;
            target: string;
            text: string;
            toolTip: string;
            uri: string;
            iconUri: string;
        }, layer: any);
    }
}
/** @private */
declare module geocortex.essentials.Rx {
    /** @private */
    interface IDisposable {
        dispose(): void;
    }
    /** @private */
    interface ICancellationToken {
        register(action: () => void): IDisposable;
    }
    /** @private */
    interface IObserver<T> {
        onNext(value: T): void;
        onError(exception: any): void;
        onCompleted(): void;
    }
    /** @private */
    interface IObservable<T> {
        select<TResult>(selector: (T) => TResult): IObservable<TResult>;
        subscribe(observer: IObserver<T>): IDisposable;
        subscribe(callback: (value?: T, exception?: any) => void): any;
        subscribe(onNext?: (value: T) => void, onError?: (exception: any) => void, onCompleted?: () => void): IDisposable;
    }
    /** @private */
    class AnonymousObservable implements IObservable<any> {
        select<TResult>(selector: (any) => TResult): IObservable<TResult>;
        _subscribe(observer: IObserver<any>): IDisposable;
        subscribe(onNextOrObserver?: any, onError?: any, onCompleted?: any): IDisposable;
    }
}
declare module geocortex.essentials {
    /** @docs-hide-from-nav */
    class ServiceRequestError implements Error {
        message: string;
        name: string;
        details: string[];
        toString(): string;
    }
    /** @docs-hide-from-nav */
    class ServiceRequestAbortedError extends ServiceRequestError {
    }
    /** @docs-hide-from-nav */
    class ServicePoint {
        baseAddress: string;
        cancellationToken: Rx.ICancellationToken;
        /**
         * Formats the query resolving any placeholders and resolving the query to a fully-qualified query.
         *
         * @param query The query string to format.
         * @returns {string} The resulting formatted query.
         */
        formatQuery(query: string, ...argArray: any[]): string;
        /**
         * Returns the request as a reactive observable.
         *
         * @param query The query to execute upon observation.
         * @returns The observable source representing the query.
         */
        getRequest<T>(query: string, member?: string): Rx.IObservable<T>;
    }
}
/** @private */
declare module geocortex.essentials.serviceDiscovery {
    /** @private */
    interface ResultItem {
        id: string;
        displayName: string;
        name: string;
        description: string;
        discoveryProviderName: string;
        serviceProviderName: string;
        url: string;
        serviceType: string[];
        thumbnailUrl: string;
        boundingBox: any;
        children: ResultItem[];
        hasChildren: boolean;
        currentPageInfo: {
            page: number;
            startCounter: number;
            resultPerPage: number;
            totalResults: number;
            useNextPageInfo: boolean;
        };
        connection: {
            id: string;
        };
        isContainerForRealResult: boolean;
        layerMask: string;
        mapStyle: string;
        osLastItemOfPage: string;
    }
}
declare module geocortex.essentials {
    /**
     * Represents search query parameters for a Geocortex Search.
     */
    class SearchQuery {
        /** The extent to search within. */
        extent: esri.geometry.Extent;
        /** The maximum number of results to return. */
        maxResults: number;
        /**
         * The 'contains' parameter determines whether to look for an exact match of the search text or not. If "true",
         * searches for a value that contains the searchText provided. This is a case-insensitive search.
         * If "false", searches for an exact match of the searchText string. The exact match is case-sensitive.
         * The default is "true".
         */
        contains: boolean;
        /** If "true", the result set will include the geometry associated with each result. The default is "false". */
        returnGeometry: boolean;
        /**
         * Indicates whether or not to return the results of the search highlighted in the given fields.
         * Those results can be found on the feature's extended attributes property.
         */
        returnHighlights: boolean;
        /**
         * If "true", the response only includes an array of object IDs. Otherwise the response is a feature set.
         * The default is "false".
         */
        returnIdsOnly: boolean;
        /**
         * If "true", the response only includes the count (number of features / records) that would be returned by a search.
         * Otherwise the response is a feature set. The default is "false". This option supersedes the returnIdsOnly parameter.
         */
        returnCountOnly: boolean;
        /** The layers to search. */
        searchLayers: Layer[];
        /** The search text string parameter. */
        searchText: string;
        /**
         * The {@link esri.SpatialReference} for the returned geometries.
         * If not specified, the output geometries are returned in the default spatial reference of WKID 4326 (WGS84).
         */
        outSpatialReference: esri.SpatialReference;
        /**
         * Converts these parameters into a JSON object.
         * @param map The {@link esri.Map}.
         * @param essentialsMap The {@link essentials.Map}.
         */
        toJson(esriMap: esri.Map, essentialsMap: Map): any;
        private _getServiceStrings(layers);
    }
}
declare module geocortex.essentials {
    /**
     * Represents the result set of a Geocortex Search.
     */
    class SearchResultSet {
        /** The set of search results.*/
        features: SearchResultFeature[];
        /** The {@link Layer} associated with this result set. */
        layer: Layer;
        /**
         * Initializes a new instance of the {@link geocortex.essentials.SearchResultSet} class.
         * @param options An arbitrary options object.
         */
        constructor(options?: {
            features?: SearchResultFeature[];
            layer?: Layer;
        });
    }
}
declare module geocortex.essentials {
    /**
     * Represents the results of a Geocortex Search.
     */
    class SearchResultFeature {
        /** The related Esri feature.*/
        esriFeature: esri.Graphic;
        /** The layer this search result is a part of. */
        layer: Layer;
        /**  The highlights associated with this search result. */
        highlights: {
            [key: string]: string;
        };
        /**
         * Initializes a new instance of the {@link SearchResultFeature} class.
         * @param graphic The {@link esri.Graphic} represented by this result.
         * @param layer The link {@link Layer} that this search is for.
         */
        constructor(graphic?: esri.Graphic, layer?: Layer);
    }
}
/** @private */
declare module geocortex.essentials.serviceDiscovery {
    /** @private */
    class ServiceDiscoveryServicePoint {
        service: ServicePoint;
        constructor(service: ServicePoint);
        private postProcess(item);
        findServices(term: string): Rx.IObservable<{}>;
        expandService(item: ResultItem): Rx.IObservable<ResultItem>;
        expandService(id: string, providerName: string, url: string): Rx.IObservable<ResultItem>;
        suggestHints(term: string): Rx.IObservable<string>;
        realizeMapService(item: ResultItem, sr: string): Rx.IObservable<MapService>;
        realizeMapService(id: string, providerName: string, url: string, sr: string): Rx.IObservable<MapService>;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Static utility methods for working with URLs.
     */
    class UrlUtilities {
        /**
         * Simplifies a URL by processing double dots (..) and single dots (.) in the URL.
         * For example, `/sites/MySite/viewers/ViewerA/VirtualDirectory/../../` is simplified to `/sites/MySite/viewers/`.
         * @param url The URL to simplify.
         */
        static simplify(url: string): string;
    }
}
declare module geocortex.essentials.exportMap {
    /**
     * Contains parameters to use when exporting maps via {@link ExportMapTask}.
     * @private
     */
    class ExportMapParameters {
        /**
         * Container to hold operation parameters.
         * These parameters will be sent to Essentials during the request.
         */
        operationParameters: any;
        /** The {@link geocortex.essentials.ReportParameters} which will be consumed by the {@link ExportMapTask}. */
        reportParameters: ReportParameters;
        /** The query parameters used when building reports. */
        queryParameters: any;
        constructor();
    }
}
declare module geocortex.forms.items {
    class MarkdownFormItem extends AbstractFormItem {
        /**
         * Gets or sets the plaintext for markdown.
         * @type Observable(String)
         */
        plainText: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.MarkdownFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.workflow {
    class ArgumentValueWrapper {
        /**
         * The runtime type name of the argument value.
         * @type String
         */
        runtimeTypeName: string;
        /**
         * The value of the argument.
         * @type Object
         */
        value: any;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.ArgumentValueWrapper} class.
         * @class
         * Represents an argument value used that will be assigned to a {@link geocortex.workflow.ArgumentInfo}.
         * @constructs
         * @param {String} runtimeTypeName The runtime type name of the argument value.
         * @param {Object} value The value of the argument.
         */
        constructor(runtimeTypeName: string, value: any);
    }
}
declare module geocortex.essentials.utilities {
    /** @private */
    class LayerUtilities {
        /** @private */
        static createFeatureLayerFromCsv(layerContext: any, limitOption: any): dojo.Deferred;
    }
}
declare module geocortex.essentials {
    /**
     * Represents the results of a Geocortex Search.
     */
    class SearchResults {
        /** An error that may or may not have happened during a Search. */
        error: Error;
        /** The results of the search, if any. */
        results: SearchResultSet[];
        /** The {@link Query} that this {@link SearchResults} resulted from. */
        queryParams: SearchQuery;
    }
}
declare module geocortex.essentials.catalog {
    /** Represents an entry from a Layer Catalog. */
    class CatalogEntry {
        /** The ID of the entry. */
        id: string;
        /** The display name of the entry. */
        displayName: string;
        /** The collection of child entries. */
        entries: CatalogEntry[];
        /** The type name of this entry. */
        type: string;
        /** Creates a new instance of the CatalogEntry class. */
        constructor();
    }
}
declare module geocortex.essentials.catalog {
    /** Represents parameters to use when requesting Layer Catalog information from the Essentials REST API. */
    class LayerCatalogDetailsParams {
        /** The list of IDs to include in the layer catalog details query. */
        ids: string[];
        /** Creates a new instance of the LayerCatalogDetailsParams class. */
        constructor();
    }
}
declare module geocortex.essentials.catalog {
    /** An object that represents the parameters of a layer catalog query. This is a placeholder for future expansion.  */
    class LayerCatalogParams {
    }
}
/**
 * Contains models used when consuming Layer Catalog data from installations of Essentials with Layer Catalog functionality enabled.
 */
declare module geocortex.essentials.catalog {
}
declare module geocortex.essentials.catalog {
    /** Represents a set of {@link CatalogEntry} instances returned from a REST Endpoint and for a particular {@link MapService}. */
    class LayerCatalogDetail {
        /** The ID of the {@link MapService} that this set of {@link CatalogEntry} instances belong to. */
        mapServiceId: string;
        /** The collection of catalog entries belonging to the {@link MapService} that this is associated with. */
        entries: LayerCatalogDetailEntry[];
        /** Creates an instance of a LayerCatalogDetail. */
        constructor();
    }
}
declare module geocortex.essentials {
    /**
    * String constants that represent visibility settings for preserving user settings
    */
    class RefreshVisibility {
        static DEFAULT: string;
        static SHOW: string;
        static HIDE: string;
    }
}
declare module geocortex.essentials.utilities {
    /**
     * Static utility methods for printing.
     */
    class PrintUtilities {
        /**
         * Adjusts text symbols to bring the ArcGIS API for JavaScript's interpretation of them in line with the Geocortex Essentials print and export map rest endpoints'
         * interpretation, which may differ since Essentials caters to both the Silverlight and HTML5 viewers which handle text symbols slightly differently.
         * @param graphic The esri {@link esri.Graphic} object containing the text symbol.
         * @returns A copy of the original text symbol with the adjustments applied or `null` if the supplied graphic does not contain a text symbol.
         */
        static adjustTextSymbol(graphic: esri.Graphic): esri.symbol.TextSymbol;
        /**
         * Adjusts picture marker symbols to ensure that they are sent to the Essentials REST endpoint in the format in which it's expecting them.
         * @param graphic The graphic for which to adjust the marker symbol for.
         * @returns A copy of the original {@link esri.symbols.PictureMarkerSymbol} with the adjustments applied or null if the supplied graphic does not contain a text symbol.
         */
        static adjustPictureMarkerSymbol(graphic: esri.Graphic): esri.symbol.PictureMarkerSymbol;
        /**
         * Gets the base64 representation for an image.
         * If the image is from another domain and CORS is not configured on the server or otherwise available, the utility cannot convert the image.
         * If this is the case, an object will be returned with the reject. This object contains an error and the url which caused the failure.
         * @param url The URL of the image to encode.
         * @param outputFormat Optional: Either `"image/png"` or `"image/jpg"`. If not specified, defaults to `"image/png"`.
         * @returns A Promise-like object which contains the base64 and which URL the data is for.
         */
        static getImageAsBase64(url: string, outputFormat?: string): dojo.Deferred;
    }
}
declare module geocortex.essentials {
    /**
     * Represents information about an Essentials FeatureSet for json serialization purposes.
     */
    class EssentialsFeatureSet {
        /** The featureSet id. */
        featureSetId: string;
        /** The featureSet display name. */
        featureSetDisplayName: string;
        /** The layerInfo. */
        layerInfo: geocortex.essentials.EssentialsLayerInfo;
        /** The esri FeatureSet. */
        esriFeatureSet: any;
        toJson(): any;
    }
}
declare module geocortex.essentials {
    /**
     * Client representation of a layer chart object attached to a layer.
     */
    class LayerChart {
        id: string;
        displayName: string;
        chartFeatureType: geocortex.charting.ChartFeatureType;
        defaultChart: boolean;
        chartDefinition: geocortex.charting.configuration.ChartDefinition;
        layer: Layer;
        constructor(restLayerChart?: RestLayerChart, layer?: Layer);
        private _setFieldDisplayNames(chartDefinition, layer);
    }
}
declare module geocortex.forms {
    class FormButton {
        /** The label on the button. */
        label: Observable<string>;
        /** The value associated with the button. */
        value: Observable<string>;
        /**  A value indicating whether it is the default button. A user invokes the default button by pressing the ENTER key for example. */
        isDefault: Observable<boolean>;
        /**
         * A value indicating whether invoking the button causes form validation.
         * @type Observable
         */
        causesValidation: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.FormButton} class.
         * @class A button used when displaying a form.
         * @constructs
         * @param xmlNode Xml node containing the data item definition.
         * @param value The value of the button.
         * @param causesValidation Indicates whether the validation of the form should be triggered when the button is pressed.
         * @param causesValidation Indicates whether the button is the default button.
         */
        constructor(label: string, value: string, causesValidation: boolean, isDefault?: boolean);
    }
}
declare module geocortex.forms.items.validation {
    class ValidationItem {
        /**
         * The message to display when a value is invalid.
         * @type String
         */
        message: string;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.ValidationItem} class.
         * @param xmlNode Xml node containing the form item definition.
         */
        constructor(xmlNode: Element);
        validate(value: any): ValidationResult;
    }
}
declare module geocortex.forms.items {
    class CheckBoxFormItem extends AbstractFormItem {
        /**
         * The text associated with the CheckBox.
         */
        text: Observable<string>;
        /**
         * The value indicating whether the state is checked or not.
         */
        checked: Observable<boolean>;
        /**
         * The text location (left or right).
         */
        textLocation: Observable<string>;
        /**
         * Initializes a new instance of the {@link CheckBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.workflow {
    class WorkflowState {
        /**
         * The instance Id of the {@link geocortex.workflow.WorkflowState}.
         * @type String
         * @private
         */
        instanceId: string;
        /**
         * The status of the {@link geocortex.workflow.WorkflowState}.
         * @type String
         * @private
         */
        status: string;
        /**
         * The pending {@link geocortex.workflow.ExternalActivityInfo}s of the {@link geocortex.workflow.WorkflowState}.
         * @type ExternalActivityInfo[]
         * @private
         */
        pendingExternalActivities: ExternalActivityInfo[];
        /**
         * The output of the completed {@link geocortex.workflow.WorkflowState}.
         * @type Object
         * @private
         */
        outputs: any;
        /**
         * The internal workflowData of the {@link geocortex.workflow.WorkflowState}.
         * @type String
         * @private
         */
        workflowData: string;
        /**
         * The internal instanceData of the {@link geocortex.workflow.WorkflowState}.
         * @type String
         * @private
         */
        instanceData: string;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.WorkflowState} class.
         * @class
         * Represents the state of a workflow.
         * @constructs
         * @param instanceId The instance Id of the workflow.
         * @param status The status of the workflow.
         * @param pendingExternalActivities The pending external activities of the workflow.
         * @param outputs The outputs of the workflow.
         * @param workflowData The internal workflow data of the workflow.
         * @param instanceData The internal instance data of the workflow.
         * @private
         */
        constructor(instanceId: string, status: string, pendingExternalActivities: ExternalActivityInfo[], outputs: any, workflowData: string, instanceData: string);
    }
}
declare module geocortex.workflow {
    class ActivityContext {
        /** @private */
        private _dispatcher;
        /** @private */
        private _workflow;
        /** @private */
        private _pendingIndex;
        /** @private */
        private _workflowState;
        /**
         * Occurs when an activity is completed.
         * @event
         */
        activityComplete: any;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.ActivityContext} class.
         * @class
         * Represents the runtime state of a workflow.
         * @constructs
         * @param {Object} dispatcher The activity dispatcher.
         * @param {Number} pendingIndex The index of the pending {@link geocortex.workflow.ExternalActivityInfo}.
         * @param {geocortex.essentials.Workflow} workflow The {@link geocortex.essentials.Workflow}.
         * @param {Object} workflowState The internal workflow state object.
         */
        constructor(dispatcher: ActivityDispatcher, pendingIndex: number, workflow: essentials.Workflow, workflowState: WorkflowState);
        /**
         * Gets the activity dispatcher.
         * @return {Object}
         */
        dispatcher(): ActivityDispatcher;
        /**
         * Gets the {@link geocortex.essentials.Workflow}.
         * @return {{@link geocortex.essentials.Workflow}}
         */
        workflow(): essentials.Workflow;
        /**
         * Gets the display name of the activity.
         * @return {String}
         */
        getDisplayName(): string;
        /**
         * Gets a array of all input names in the activity.
         * @return {String[]}
         */
        getInputNames(): string[];
        /**
         * Gets a array of all input names in the activity that match the specified type.
         * @param typeName The type name.
         * @return {String[]}
         */
        getInputNamesByType(typeName: string): string[];
        /**
         * Gets a array of all output names in the activity.
         * @param typeName The type name.
         * @return {String[]}
         */
        getOutputNames(): string[];
        /**
         * Gets a array of all output names in the activity that match the specified type.
         * @return {String[]}
         */
        getOutputNamesByType(typeName: any): string[];
        /**
         * Gets the Geocortex Essentials {@link geocortex.essentials.Site} associated with the running workflow.
         * @return {{@link geocortex.essentials.Site}}
         */
        getSite(): geocortex.essentials.Site;
        /**
         * Gets the ESRI map associated with the running workflow.
         * @return {{@esri Map map}}
         */
        getEsriMap(): esri.Map;
        /**
         * Gets the value of an input argument.
         * @param {String} name The name of the input.
         * @return {Object}
         */
        getValue(name: string): any;
        /**
         * Gets the value of an output argument.
         * @param {String} name The name of the output.
         * @return {Object}
         */
        getOutputValue(name: string): any;
        /**
         * Gets the json value of an input argument.
         * @param {String} name The name of the input.
         * @return {String}
         */
        getJsonValue(name: string): string;
        /**
         * Gets the json value of an output argument.
         * @param {String} name The name of the output.
         * @return {String}
         */
        getOutputJsonValue(name: string): string;
        /**
         * Sets the value of an output argument.
         * @param {String} name The name of the output.
         * @param {Object} value The value of the output.
         * @param {Boolean} allowInsert Indicate that new output arguments can be added.
         */
        setValue(name: any, value: any, allowInsert?: boolean): void;
        /**
         * Gets the type name of the activity in context.
         * @return {String}
         */
        getActivityTypeName(): string;
        /**
         * Gets the external id of the activity in context.
         * @return {String}
         */
        getActivityExternalId(): string;
        /**
         * Gets the type name of an input argument.
         * @param {String} name The name of the input argument.
         * @return {String}
         */
        getInputArgumentTypeName(name: string): string;
        /**
         * Gets the runtime type name of an input argument.
         * @param {String} name The name of the input argument.
         * @return {String}
         */
        getInputArgumentRuntimeTypeName(name: string): string;
        /**
         * Completes the activity in context. Raises the activityComplete event.
         */
        completeActivity(): void;
        /**
         * Aborts the activity in context.
         */
        abortActivity(): void;
        /**
         * @private
         */
        private _completeActivityInternal();
        /**
         * Return the runtimeType of the value. Note that this is the .NET type name, for deserialization on the server.
         * @private
         */
        _getRuntimeType(value: any): string;
    }
}
declare module geocortex.workflow {
    interface ActivityDispatcher {
        isBusy: boolean;
        abortMapBasedActivity(): boolean;
        activityBegin(context: ActivityContext): void;
        activityComplete(context: ActivityContext): void;
        activityAbort(context: ActivityContext): void;
        dispatch(context: ActivityContext): void;
        handleError(error: Error, activityContext: ActivityContext): void;
        handleOpenReportUrl(url: string, activityContext: ActivityContext): void;
        setDrawObjectContext(ctx: {
            activityContext: ActivityContext;
            toolbar: esri.toolbars.Draw;
            drawEvent: any;
        }): void;
        webRequestBegin(url: string, workflow: essentials.Workflow): void;
        webRequestComplete(url: string, workflow: essentials.Workflow): void;
        workflowComplete(outputs: any, workflow: essentials.Workflow): any;
        workflowAbort(context: ActivityContext, workflow: essentials.Workflow): void;
    }
}
declare module geocortex.workflow.WorkflowControllerProxy {
    function startWorkflow(workflow: essentials.Workflow, dispatcher: ActivityDispatcher, inArgs: any): void;
    /** @private */
    function _executeWorkflow(workflow: essentials.Workflow, dispatcher: ActivityDispatcher, workflowState: WorkflowState, inArgs: any, activityContext: ActivityContext): void;
    /** @private */
    function _processWorkflowResults(results: any, workflow: essentials.Workflow, dispatcher: ActivityDispatcher): void;
    /** @private */
    function _handleErrorInternal(dispatcher: ActivityDispatcher, error: Error, activityContext?: ActivityContext): void;
    /** @private */
    function _preProcessArguments(args: any): void;
    /** @private */
    function _getObjectFromJsonWithType(value: any, typeName: string): any;
    /** @private */
    function _getExternalActivities(restObject: any): ExternalActivityInfo[];
    /** @private */
    function _getArguments(restObject: any): ArgumentInfo[];
    /** @private */
    function _dispatch(activityContext: ActivityContext): void;
}
declare module geocortex.forms {
    /**
     * Represents a data item to display in a collection use in a ComboBox for example.
     */
    class DataItem {
        /** The text to display in an items control. */
        display: string;
        /** The value to return when the data item is selected. */
        value: any;
        /**  The type of the .NET runtime type name of the value on the server.*/
        typeName: string;
        /**
         * Initializes a new instance of the {@link DataItem} class.
         * @param display The text to display to the user.
         * @param value The value held by the DataItem.
         * @param typeName The type name of the value.
         */
        constructor(display: string, value: any, typeName?: string);
        /**
         * Gets the value of the `dataItem`.
         */
        getValue(): any;
    }
}
declare module geocortex.forms.items {
    /**
     * <p>Represents a form items that has dataItems.</p>
     */
    interface DataItemsFormItem extends FormItem {
        dataItems: ObservableCollection<geocortex.forms.DataItem>;
        clearDataItems(): void;
    }
    function initDataItemsFormItem(formItem: DataItemsFormItem, xmlNode: Element, formDefinition?: FormDefinition): void;
}
declare module geocortex.forms.items {
    interface QueryTaskFormItem extends DataItemsFormItem {
        /** Does all the heavy lifting */
        queryTaskRunner: QueryTaskRunner;
        /** QueryTaskRunner will automatically hook this up and sync. */
        isBusy: Observable<boolean>;
        /** Prepares an item to receive new results. Used by QueryTaskRunner. */
        prepareForResults?: () => void;
        /** Allows a subclass to perform an operation when the results have been added from a query. Used by QueryTaskRunner. */
        handleResultsComplete?: () => void;
    }
    class QueryTaskRunner {
        /**
         * An event that is raised when a value has been selected and queries that cascade off of this control should be executed.
         * @type geocortex.framework.events.Event
         */
        cascadingEvent: geocortex.framework.events.Event;
        /**
         * Indicates that a query is in progress or the form item is otherwise busy.
         * @type Observable(Boolean)
         */
        isBusy: Observable<boolean>;
        /**
         * The query output field that will be used as display in the data item.
         * @type Observable(String)
         */
        queryDisplayOutputField: Observable<string>;
        /**
         * The query output field that will be used as value in the data item.
         * @type Observable(String)
         */
        queryValueOutputField: Observable<string>;
        /**
         * The url to the Esri service to query.
         * @type Observable(String)
         */
        queryServiceUrl: Observable<string>;
        /**
         * The where clause of the query.
         * @type Observable(String)
         */
        queryWhereClause: Observable<string>;
        /**
         * The ID of the ComboBox that will filter the query in this form item.
         * @type Observable(String)
         */
        queryCascadingID: Observable<string>;
        /**
         * Gets or sets a URL to a proxy to send the queries through.
         * @type Observable(String)
         */
        proxyUrl: Observable<string>;
        /**
         * Gets or sets a token (a high longevity token) to access a secure ArcGIS task.
         * @type Observable(String)
         */
        token: Observable<string>;
        /**
         * A value indicating whether the query should use the input geometry (if any) to filter the results.
         * @type Observable(Boolean)
         */
        filterByInputGeometry: Observable<boolean>;
        /**
         * Gets or sets the json representation of the layer source.
         * @type Observable(String)
         */
        layerSourceJson: Observable<string>;
        /** @private */
        private _queryId;
        private formItem;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.QueryTaskFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(formItem: QueryTaskFormItem, xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * @private Notifies any listeners that a value has been selected and they should cascade.
         */
        triggerCascading(selectedValue: any): void;
        /**
         * @private
         * Gets a value indicating whether this form item will actually be performing querying based on its configuration.
         */
        isQueryable(): boolean;
        /**
         * @private Perform the query task to load items.
         */
        performQuery(value: string, cascade?: boolean): void;
        /**
         * QueryTask supports the following token replacement schemes:
         * {0} will be replaced by the previous value in the cascade, escaped
         * {1:FormItem} will be replaced by the value in the form item with the matching id, unescaped
         * {1:FormItem:SQL} will be replaced by the value in the form item with the matching id, escaped
         * {1:FormItem:F[N]} will be replaced by the value as a number rounded to [N] decimal places
         */
        private _getWhereClause(value);
        /**
         * Escape the given value so it can be placed in a where clause as a string.
         */
        private _escapeForWhere(value);
    }
}
declare module geocortex.forms.items {
    class ComboBoxFormItem extends AbstractFormItem implements LabelContainer, QueryTaskFormItem {
        /**
         * Specifies whether or not we've set a default value so we don't do it again.
         * @private
         */
        private _defaultSet;
        /**
         * The text that will be shown as the first item of ComboBox.
         * @type Observable(String)
         */
        selectText: Observable<string>;
        /**
         * The selected object value
         * @type Observable(string)
         */
        selected: Observable<DataItem>;
        /**
         * The value that should be selected by default as defined in the form definition.
         * @type Object
         */
        defaultSelectedValue: Observable<string>;
        cascadingId: number;
        label: LabelFormItem;
        dataItems: ObservableCollection<DataItem>;
        queryTaskRunner: QueryTaskRunner;
        isBusy: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link ComboBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Clears the data items.
         */
        clearDataItems(): void;
        /** @private */
        private _hasRealDataItem();
        /**
         * @private Notifies any listeners that a value has been selected and they should cascade.
         */
        triggerCascading(value: DataItem): void;
        prepareForResults(): void;
        handleResultsComplete(): void;
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Add an option to the select item.
         */
        _addOption(label: string, value: string): void;
        /**
        * @private Select the default value if it exists
        */
        _selectDefaultValue(): void;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class TimePickerFormItem extends AbstractFormItem implements LabelContainer {
        label: LabelFormItem;
        time: Observable<Date>;
        /**
         * Gets or sets the initial time of the time picker.
         * @type Observable(Date)
         */
        initialTime: Observable<Date>;
        /**
         * Gets or sets a value indicating whether the user can clear the control's value.
         */
        nullable: Observable<boolean>;
        /**
         * Gets or sets the time format (short or long).
         * @type Observable(String)
         */
        timeFormat: Observable<string>;
        /**
         * The time format string.
         * @type String
         */
        _timeFormatStr: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.TimePickerFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class DatePickerFormItem extends AbstractFormItem implements LabelContainer {
        label: LabelFormItem;
        /**
         * The date.
         * @type Observable(Date)
         */
        date: Observable<Date>;
        /**
         * Gets or sets the initial date of the date picker.
         * @type Observable(Date)
         */
        initialDate: Observable<Date>;
        /**
         * Gets or sets a value indicating whether a should be bundled together with this form item.
         * @type Observable(Boolean)
         */
        includeTimePicker: Observable<boolean>;
        /**
         * Gets or sets a TimePickerFormItem for allow time picking.
         * @type TimePickerFormItem
         */
        timePickerItem: TimePickerFormItem;
        /**
         * The date format (short or long).
         * @type Observable(String)
         */
        dateFormat: Observable<string>;
        /**
         * Gets or sets a value indicating whether the user can clear the control's value.
         */
        nullable: Observable<boolean>;
        /**
         * The date format string.
         * @type String
         */
        _dateFormatStr: Observable<string>;
        /**
         * Initializes a new instance of the {@link DatePickerFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class FilePickerFormItem extends AbstractFormItem implements LabelContainer {
        /**
         * The LabelFormItem for this form item.
         * @type Observable(LabelFormItem)
         */
        label: LabelFormItem;
        /**
         * A value indicating whether to allow users to select multiple files.
         * @type Observable(Boolean)
         */
        allowMultiple: Observable<boolean>;
        /**
         * A value indicating whether the {@link geocortex.forms.items.FilePickerFormItem} is supported
         * by the browser.
         * @type Observable(Boolean)
         */
        isSupported: Observable<boolean>;
        /**
         * The file types accepted by the {@link geocortex.forms.items.FilePickerFormItem}.
         * @type Observable(String)
         */
        acceptFileTypes: Observable<string>;
        /**
         * The result.
         * @type Object[]
         */
        files: ObservableCollection<any>;
        /**
         * Initializes a new instance of the {@link FilePickerFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Clears the form item input.
         */
        clear(): void;
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
        private _isFileInputSupported();
    }
}
declare module geocortex.forms.items {
    class ContainerFormItem extends AbstractFormItem {
        formItems: ObservableCollection<FormItem>;
        /**
         * The tooltip of this form item.
         * @type Observable(String)
         */
        orientation: Observable<string>;
        /**
         * The description of the group.
         * @type Observable(String)
         */
        description: Observable<string>;
        /**
         * The maximum width of the group.
         * @type Observable(Number)
         */
        maxWidth: Observable<number>;
        /**
         * The ID of the form item whose value controls the visibility of this item.
         */
        visibleControlID: Observable<string>;
        /**
         * The value that the visible control form item must have for this item to be visible.
         */
        visibleControlValue: Observable<string>;
        /**
         * Initializes a new instance of the {@link ContainerFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Validates the form item.
         * Returns a collection of invalid items.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}[]}
         */
        validate(): validation.ValidationResult[];
        /**
         * @private Get a flat list of results
         */
        _getResults(): FormItemResult[];
        /**
         * @private Destroy all form items that it contains
         */
        _destroy(): void;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
        /**
         * Get the contained FormItem with the given id or null if none can be found.
         */
        getFormItemById(itemId: string): FormItem;
        /**
         * Set the visibility of this FormItem based on the value of the controlling FormItem.
         */
        applyVisibility(controlFormItem: geocortex.forms.items.FormItem): void;
        /**
         * Gets the display name for this container.
         */
        getDisplayName(): string;
    }
}
declare module geocortex.forms.items {
    class GroupBoxFormItem extends ContainerFormItem {
        /**
         * The header text displayed at the top of the group box.
         * @type Observable(String)
         */
        header: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.GroupBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * @private Renders the form item.
         */
        _render(): Node;
        /**
         * Gets the display name for this container.
         */
        getDisplayName(): string;
    }
}
declare module geocortex.forms.items {
    class HyperlinkFormItem extends AbstractFormItem {
        /**
         * Gets or sets the text that will be displayed by the Hyperlink.
         * @type Observable(String)
         */
        hyperlinkText: Observable<string>;
        /**
         * Gets or sets the name of the target window or frame that the Web page should open in.
         * @type Observable(String)
         */
        target: Observable<string>;
        /**
         * Gets or sets the Uri where hyperlink will navigate to.
         * @type Observable(String)
         */
        uri: Observable<string>;
        /**
         * Gets or sets a value indicating whether the hyperlink was clicked by the user.
         * @type Boolean
         */
        wasClicked: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.HyperlinkFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class ImageFormItem extends AbstractFormItem {
        /**
         * Gets or sets the source of the image.
         * @type Observable(String)
         */
        source: Observable<string>;
        /**
         * Gets or sets the width of the image (in pixels).
         * @type Observable(Number)
         */
        width: Observable<string>;
        /**
         * Gets or sets the height of the image (in pixels).
         * @type Observable(Number)
         */
        height: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.ImageFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class ListBoxFormItem extends AbstractFormItem implements LabelContainer, QueryTaskFormItem {
        /**
         * The LabelFormItem for this form item.
         * @type Observable(LabelFormItem)
         */
        label: LabelFormItem;
        /**
         * The maximum height of the ListBox in pixels.
         * @type Observable(Number)
         */
        maxHeight: Observable<number>;
        /**
         * The preferred size of the ListBox in rows.
         * @type Observable(Number)
         */
        size: Observable<number>;
        /**
         * The selection behavior for the ListBox control.
         * @type Observable(String)
         */
        selectionMode: Observable<string>;
        /**
         * The selected value (or values).
         * @type Object[]
         */
        selection: ObservableCollection<DataItem>;
        /**
         * The values that should be selected by default as defined in the form definition.
         */
        selectedValues: ObservableCollection<any>;
        /**
         * A fast lookup object that contains a property for each of the default selected values.
         * @private
         */
        private _selectedValuesLookup;
        dataItems: ObservableCollection<DataItem>;
        queryTaskRunner: QueryTaskRunner;
        isBusy: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.ListBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Clears the data items.
         */
        clearDataItems(): void;
        /** @protected */
        protected _setDefaults(): void;
        handleResultsComplete(): void;
        /**
         * @private Notifies any listeners that a value has been selected and they should cascade.
         */
        triggerCascading(value: any): void;
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
    }
}
declare module geocortex.forms.items {
    class RadioButtonFormItem extends AbstractFormItem {
        /**
         * The text associated with the CheckBox.
         * @type Observable(String)
         */
        text: Observable<string>;
        /**
         * The name that specifies which RadioButton controls are mutually exclusive.
         * @type Observable(String)
         */
        groupName: Observable<string>;
        /**
         * The value indicating whether the state is checked or not.
         * @type Observable(Boolean)
         */
        checked: Observable<boolean>;
        /**
         * The text location (left or right).
         * @type Observable(String)
         */
        textLocation: Observable<string>;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.RadioButtonFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Gets the result of the form item.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResult(): FormItemResult;
        /**
         * @private Renders the form item.
         */
        _render(): Node;
        private static _findButtonsInGroup(groupName, container);
    }
}
declare module geocortex.forms.items {
    class AutoCompleteBoxFormItem extends TextBoxFormItem implements QueryTaskFormItem {
        /**
         * The minimum number of characters required to be entered in the text box before the AutoCompleteBox displays possible matches.
         * @type Observable(int)
         */
        minimumPrefixLength: Observable<number>;
        /**
         * The minimum delay, in milliseconds, after text is typed in the text box before the AutoCompleteBox control populates the list of possible matches.
         * @type Observable(int)
         */
        minimumPopulateDelay: Observable<number>;
        dataItems: ObservableCollection<geocortex.forms.DataItem>;
        queryTaskRunner: QueryTaskRunner;
        isBusy: Observable<boolean>;
        /**
         * Initializes a new instance of the {@link AutoCompleteBoxFormItem} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param formDefinition The form definition that this form item belongs to.
         */
        constructor(xmlNode: Element, formDefinition?: FormDefinition);
        /**
         * Clears the data items.
         */
        clearDataItems(): void;
    }
}
declare module geocortex.forms.items.validation {
    class ValidationResult {
        /**
         * The value indicating whether the value checked against the <see cref="ValidationItem"/> is valid.
         * @type String
         */
        isValid: boolean;
        /**
         * The message that provides additional information about the invalidity.
         * @type String
         */
        errorMessage: string;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.ValidationResult} class.
         * @param xmlNode Xml node containing the form item definition.
         * @param errorMessage The error message to display to the user.
         */
        constructor(isValid: boolean, errorMessage: string);
    }
}
declare module geocortex.forms {
    class FileItem {
        /** The name of the file. */
        fileName: string;
        /** The file data as a base64 string. */
        fileDataBase64: string;
        /** The size of the file in bytes. */
        fileSize: number;
        /** The MIME type of the file. */
        fileType: string;
        /**
         * Initializes a new instance of the {@link FileItem} class.
         */
        constructor();
    }
}
declare module geocortex.forms.items.validation {
    class FileSizeValidationItem extends ValidationItem {
        /**
         * The total allowable size (in bytes) of the selected files.
         * @type Number
         */
        totalFileSize: number;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.FileSizeValidationItem} class.
         * @param xmlNode Xml node containing the form item definition.
         */
        constructor(xmlNode: Element);
        /**
         * Performs validation checks on a value.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}}
         */
        validate(value: any): ValidationResult;
    }
}
declare module geocortex.forms.items.validation {
    class NumericRangeValidationItem extends ValidationItem {
        /**
         * The minimum value of the validation range.
         * @type Float
         */
        minimumValue: number;
        /**
         * The maximum value of the validation range.
         * @type Float
         */
        maximumValue: number;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.NumericRangeValidationItem} class.
         * @param xmlNode Xml node containing the form item definition.
         */
        constructor(xmlNode: Element);
        /**
         * Performs validation checks on a value.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}}
         */
        validate(value: any): ValidationResult;
    }
}
declare module geocortex.forms.items.validation {
    class RegexValidationItem extends ValidationItem {
        /**
         * The regular expression to validate with.
         * @type String
         */
        expression: string;
        /**
         * A value indicating whether to perform case-insensitive matching.
         * @type Boolean
         */
        ignoreCase: boolean;
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.RegexValidationItem} class.
         * @param xmlNode Xml node containing the form item definition.
         */
        constructor(xmlNode: Element);
        /**
         * Performs validation checks on a value.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}}
         */
        validate(value: any): ValidationResult;
    }
}
declare module geocortex.forms.items.validation {
    class RequiredValidationItem extends ValidationItem {
        /**
         * Initializes a new instance of the {@link geocortex.forms.items.validation.RequiredValidationItem} class.
         * @param xmlNode Xml node containing the form item definition.
         */
        constructor(xmlNode: Element);
        /**
         * Performs validation checks on a value.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}}
         */
        validate(value: any): ValidationResult;
    }
}
/**
 * Contains models and code for working with *Geocortex Forms*, by way of Essentials' *Workflow* facilities. Part of the *Geocortex API for JavaScript*.
 * Include `Essentials.js` to work with Essentials' *Workflow* and *Forms* technologies.
 */
declare module geocortex.forms {
}
declare module geocortex.forms {
    /**
     * Return this first immediate child element named elementName.
     * @param XmlNode The xml node to use to find the element with name elementName.
     * @param String The name of the element to get the text content from.
     */
    function getElement(xmlDoc: Element, elementName: string): Element;
    /**
     * Return the text content of a child element named elementName.
     * @param XmlNode The xml node to use to find the element with name elementName.
     * @param String The name of the element to get the text content from.
     */
    function getElementText(xmlDoc: Element, elementName: string): string;
    /**
     * Return the value of an attribute on the specified node.
     * @param XmlNode The xml node to use to find the attribute value with name attributeName.
     * @param String The name of the attribute to get the value from.
     */
    function getAttributeValue(xmlDoc: Node, attributeName: string): string;
    /** @private */
    function _parseBoolean(value: string): boolean;
    function renderFormItem(fromItem: items.FormItem): Node;
}
declare module geocortex.forms.items {
    /**
     * @private Return the form item represented by the xml node.
     */
    function _processFormItem(xmlDoc: Element, formDefinition: any): geocortex.forms.items.FormItem;
    /**
     * @private Return the validation item represented by the xml node.
     */
    function _processValidationItem(xmlDoc: Element): forms.items.validation.ValidationItem;
    function _getType(xmlDoc: Node): string;
}
declare module geocortex.forms {
    class FormDefinition {
        /**
         * The title of the form.
         * @type String
         */
        title: Observable<string>;
        /**
         * The Form Definition Language version.
         * @type String
         */
        version: number;
        /**
         * The maximum width of the form (in pixels).
         * @type number
         */
        maxWidth: Observable<number>;
        /**
         * The dictionary of collection of DataItem to be used when binding form items that derive from DataItemsFormItem, such as ComboBoxFormItem and ListBoxFormItem.
         * @type Object
         */
        inputData: any;
        /**
         * The maximum height of the form (in pixels).
         * @type number
         */
        maxHeight: Observable<number>;
        /**
         * The container form item.
         * @type ContainerFormItem
         */
        containerFormItem: any;
        /**
         * The input geometry that can be used to filter the queries in the ComboBox and ListBox.
         * @type esri.geometry.Geometry
         */
        inputGeometry: esri.geometry.Geometry;
        /**
         * The known types used by this form definition.
         * @type String[]
         */
        knownTypes: string[];
        /** @private */
        private _formManager;
        /** @private */
        private _version;
        /** @private */
        private _formContainer;
        /** @private */
        private _cascadingMap;
        /*** @private */
        private _controlMap;
        /**
         * Initializes a new instance of the {@link geocortex.forms.FormDefinition} class.
         * @class Represents a workflow form.
         * @constructs
         * @param xmlString The xml of the form definition in a string.
         * @param inputData The dictionary of DataItem collection.
         * @param inputGeometry The geometry to use for filtering the entries in the list box.
         */
        constructor(xmlString?: string, inputData?: any, inputGeometry?: esri.geometry.Geometry);
        /**
         * Adds a cascading relationship. The FormDefinition will satisfy these relationships after it loads all controls by attaching the supplied handler
         * to the cascading event of the specified control.
         * @param cascadingId The id of the control that supports cascading.
         * @param formItem The form item.
         * @param handler The handler that will be triggered when an item cascades.
         */
        addCascading(cascadingId: string, formItem: items.FormItem, handler: Function): void;
        /**
         * Adds a control entry that allows the FormDefinition to quickly find the control by its ID.
         * @param item The form item.
         */
        map(item: items.FormItem): void;
        /**
         * Renders a form and attaches it to the dom node. This method should be overridden in the viewer.
         * @param node The node to render.
         */
        render(node: items.FormItem): void;
        /**
         * Validates the form item.
         * Returns a collection of invalid items.
         * @return {{@link geocortex.forms.items.validation.ValidationResult}[]}
         */
        validate(): items.validation.ValidationResult[];
        /**
         * A flatten list of FormItemResult for all items in the FormDefinition.
         * @return {{@link geocortex.forms.items.FormItemResult}[]}
         */
        getResults(): items.FormItemResult[];
        /**
         * Destroy all the form ui dijits that were created.
         */
        destroy(): void;
        /**
         * Get the contained FormItem with the given id or null if none can be found.
         */
        getFormItemById(itemId: string): items.FormItem;
    }
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function getPropertyIgnoreCase(objectWithProperties: any, prop: string): string;
    /** @private */
    function handleReport(activityContext: ActivityContext): void;
    /** @private */
    function showDebug(activityContext: ActivityContext, isInput: boolean, callback: () => void): void;
    /** @private */
    function handleGetBrowserUrl(activityContext: ActivityContext): void;
    /** @private */
    function handleExternalDelay(activityContext: ActivityContext): void;
    /** @private */
    function handleGetExternalTimeInfo(activityContext: ActivityContext): void;
    /** @private */
    function handleWaitForGeoprocessorJobComplete(activityContext: ActivityContext): void;
    /** @private */
    function _getJobStatusCode(status: string): number;
    /** @private */
    function handleGetLayerInfoByProperty(activityContext: ActivityContext): void;
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function handleAlert(activityContext: ActivityContext): void;
    /** @private */
    function handleConfirm(activityContext: ActivityContext): void;
    /** @private */
    function handlePrompt(activityContext: ActivityContext): void;
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function handleSetLayerProperty(activityContext: ActivityContext): void;
    /** @private */
    function handleGetLayerProperty(activityContext: ActivityContext): void;
    /** @private */
    function handleGetLayerVisibility(activityContext: ActivityContext): void;
    /** @private */
    function handleSetLayerVisibility(activityContext: ActivityContext): void;
    /** @private */
    function handleGetLayerDefinition(activityContext: ActivityContext): void;
    /** @private */
    function handleSetLayerDefinition(activityContext: ActivityContext): void;
    /** @private */
    function handleGetGraphicsLayerContent(activityContext: ActivityContext): void;
    /** @private */
    function handleUpdateGraphicsLayer(activityContext: ActivityContext): void;
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function findMapServiceById(site: any, serviceId: string): geocortex.essentials.MapService;
    /** @private */
    function findMapServiceByMap(map: esri.Map, serviceId: string): esri.layers.Layer;
    /** @private */
    function handleRemoveMapService(activityContext: ActivityContext): void;
    /** @private */
    function handleSetImageServiceInfo(activityContext: ActivityContext): void;
    /** @private */
    function handleSetMapServiceVisibility(activityContext: ActivityContext): void;
    /** @private */
    function handleGetMapServiceInfo(activityContext: ActivityContext): void;
    /** @private */
    function handleSetMapServiceProperty(activityContext: ActivityContext): void;
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function handleGetCurrentPosition(activityContext: ActivityContext): void;
    /** @private */
    function handleGetPhoto(activityContext: ActivityContext): void;
}
declare module geocortex.essentials {
    /**
     * Manages layer visibilities and events.
     * @private
     */
    class LayerVisibilityEventManager {
        private _mapService;
        /**
         * Constructs an instance of the manager for a given service and layer.
         * @param mapService The {@link MapService} to manage.
         * @param serviceLayer The {@link esri.layers.Layer} to manage.
         */
        constructor(mapService: MapService, serviceLayer: esri.layers.Layer);
        /**
         * Function invoked before the Esri `setVisibleLayers` function is called.
         * @private
         * @param ids IDs of layers to set the visibility of.
         * @param doNoRefresh Whether or not to actually refresh layer visibilities.
         */
        beforeESRIsetVisibleLayers(ids: string[], doNotRefresh?: boolean): any[];
        /**
         * Function called by dojo aspect after Esri's `setVisibleLayers` function is called.
         * @private
         */
        afterESRIsetVisibleLayers(ids: string[], doNotRefresh: boolean, changedLayers: any[]): void;
        /** @private*/
        private _recursivelyUpdateAncestorVisibility(layer, ids, changedLayers);
        /** @private */
        private _recursivelyUpdateSublayerVisibility(layer, visible, changedLayers);
        /**
         * Gets currently visible layers & group layers regarardless of whether parent layers are visible or not.
         * @private
         */
        private _getAllCurrentlyVisibleLayers();
        /** @private */
        private _findWmsLayerIdFromName(layerName);
        /** @private */
        private _deleteItemWithId(id, changedLayers);
    }
}
/**
 * String constants that represent the various types of {@link MapService}.
 */
declare module geocortex.essentials.MapServiceType {
    var DYNAMIC: string;
    var TILED: string;
    var IMAGE: string;
    var BING: string;
    var FEATURE: string;
    var WMS: string;
    var WMTS: string;
    var GEORSS: string;
    var WEBTILED: string;
    var KML: string;
    var GRAPHICS: string;
    var LABEL: string;
    var STREAM: string;
    var CSV: string;
    var MAPIMAGE: string;
    var UNKNOWN: string;
}
/**
 * String constants that represent the various functions of {@link MapService}.
 */
declare module geocortex.essentials.MapServiceFunction {
    var OPERATIONAL: string;
    var BASE: string;
}
/**
 * String constants that represent various drawing behaviours.
 */
declare module geocortex.essentials.DrawingBehavior {
    var MAP_SERVICE: string;
    var FEATURE_LAYER: string;
    var GEORSS_LAYER: string;
    var KML_SERVICE: string;
}
/**
 * String constants that represent various failure actions.
 */
declare module geocortex.essentials.FailureAction {
    var IGNORE: string;
    var WARN: string;
    var ERROR: string;
}
declare module geocortex.essentials {
    /**
     * Represents a set of layers which are grouped together in a meaningful way for a certain use case.
     * There will typically be multiple layer themes in a site which the end user can toggle between,
     * effectively swapping ou the list of layers with the new list of layers as configured in the selected
     * layer theme. The theme allows for the inclusion/exclusion of layers, and for each layer that is
     * included in the theme, the visibility can be specified.
     */
    class LayerTheme {
        /**
         * The ID of the theme. If the ID is null, it is defined to be the default theme
         */
        id: string;
        /**
         * The display name of the theme, that can be shown to the end user.
         */
        displayName: string;
        /**
         * The list of {@link geocortex.essentials.Extension} (if any) as defined by the administrator on the server.
         */
        extensions: geocortex.essentials.Extension[];
        /**
         * The list of {@geocortex.PropertyParam} objects as defined by the administrator on the server.
         */
        properties: geocortex.PropertyParam[];
        /**
         * The {@link LayerThemeInfo} object contained in the map.
         */
        layerThemesInfo: LayerThemesInfo;
        /**
         * A boolean indicating if this theme is the currently active theme.
         */
        isActive: boolean;
        /**
         * A boolean indicating whether this is the default theme. This is determined based on whether or not the ID is null.
         * If the ID is null, it is taken to be the default theme. If it is not null, it is not the default theme. The
         * default theme specifies that all layers are included, and the visibilities are as configured in the site map.
         */
        isDefaultTheme: boolean;
        /**
         * Initializes a new instance of the {@link LayerTheme} class.
         */
        constructor(layerThemesInfo: LayerThemesInfo, id: string, displayName: string);
        constructor(layerThemesInfo: LayerThemesInfo, restLayerTheme: RestLayerTheme);
        /**
         * Configure the {@link LayerTheme} from a {@link RestLayerTheme}
         */
        private _configureLayerTheme(restLayerTheme?, id?, displayName?);
        /**
         * Applies the theme settings to the map. This method iterates through all the layers in the map and adjusts
         * their visibility and other settings depending on if the layer is in the theme or not. By design, this method will
         * reapply the theme even if the theme has already been applied. It also ensures that the LayerThemesInfo.active theme
         * is set to this theme. In order to call this method, the LayerThemesInfo, and LayerThemesInfo.map properties must be
         * specified in order for this method to get access to the map.
         */
        applyToMap(): void;
    }
}
declare module geocortex.essentials {
    /**
     * Defines a reference to a theme and whether or not an object should be visible in that theme
     */
    class LayerThemeSetting {
        /**
         * The theme that this object belongs to
         */
        theme: LayerTheme;
        /**
         * Whether or not the object should be set visible when the theme is loaded
         */
        visible: boolean;
        /**
         * Initializes a new instance of the {@link LayerThemeSettings} class
         */
        constructor(theme: LayerTheme, visible: boolean);
    }
}
declare module geocortex.essentials {
    /**
     * A simple container for information about layer themes
     */
    class LayerThemesInfo {
        /**
         * Indicates whether any layer themes have been configured by the essentials administrator or not.
         * The default is false. If false, then all layers will be enabled by default (i.e. standard behaviour)
         */
        layerThemesConfigured: boolean;
        /**
         * Indicates whether all layers should be registered as a separate (default) theme
         */
        allowDefault: boolean;
        /**
         * The ID of the theme that will be activated upon startup
         */
        startupThemeId: string;
        /**
         * The MapInfo object with information about the map to apply the selected layer theme on
         */
        map: geocortex.essentials.Map;
        /**
         * Collection of available layer themes. Will include the default theme if one is configured
         */
        themes: LayerTheme[];
        /**
         * This event occurs just after a theme is changed. At this point the theme will have been applied to the map.
         */
        layerThemeChangedEvent: (args: LayerThemeEventArgs) => void;
        /**
         * Indicates whether or not the layer theme is currently in the process of changing.
         * This value should be true in between the `layerThemeChangedEvent` and `layerThemeChangingEvent`.
         */
        themeChangeInProgress: boolean;
        /**
         * This event occurs just before a theme is changed. At this point, the active theme property will be set, but the theme will not
         * yet have been applied to the map.
         */
        layerThemeChangingEvent: (args: LayerThemeEventArgs) => void;
        /**
         * The layer theme that's currently active (if any)
         */
        activeTheme: LayerTheme;
        /**
         * The previous active layer theme (if any)
         */
        previousTheme: LayerTheme;
        /**
         * Initializes a new instance of the {@link LayerThemesInfo} class
         */
        constructor(map: geocortex.essentials.Map);
        /**
         * Applies the theme with the specified ID to the map, and sets the _activeTheme property to reference that theme
         */
        applyTheme(id: string): void;
        /**
         * Retrieves the theme with the specified id if it exists. Else returns null. If the optional matchAgainstIdAndName parameter is true,
         * it will attempt to match the given string against the theme name (case insensitive) as well as it's id.
         * @param themeIdentifier The theme identifier. Could be either the theme id (default) or the theme display name. If it's the display name then matchAgainstIdAndName needs to be set true
         * @param matchAgainstIdAndName A boolean which, if true, will cause this function to match the identifier against both layer id's and display names.
         */
        getTheme(themeIdentifier: string, matchAgainstIdAndName?: boolean): LayerTheme;
    }
}
declare module geocortex.essentials {
    /**
     * Representation of a KML service. The properties in this class represent the configuration served from the Essentials REST API.
     */
    class KmlService extends MapService {
        /** The update interval in seconds. The KML will be refreshed on this interval. */
        updateInterval: number;
        /** The esri KML layer. */
        serviceLayer: esri.layers.KMLLayer;
        /** The spatial reference of the map. */
        mapSpatialReference: esri.SpatialReference;
        /** @private */
        _configureObject(obj: any, deepInitialize?: boolean): void;
        /** @private */
        _createServiceLayer(): void;
        private _updateStartHandler();
        private _initializeKmlLayers();
    }
}
/**
 * Provides core support for *Geocortex Essentials Workflow* technology in HTML5.
 */
declare module geocortex.workflow {
}
declare module geocortex.workflow.CacheActivityHandlers {
    /** @private */
    function handleGetExternalValue(activityContext: ActivityContext): void;
    /** @private */
    function handleSetExternalValue(activityContext: ActivityContext): void;
}
declare module geocortex.workflow {
    class DefaultActivityDispatcher implements ActivityDispatcher {
        /**
         * The value indicating whether the workflow controller is busy.
         * @type Boolean
         */
        isBusy: boolean;
        /** @private The draw object context for any activity that requires map interaction. Only one instance of the draw Object can be active at any given time */
        private _drawObjectContext;
        /** @private */
        private _registeredActivityHandlers;
        /** @private */
        private _registeredExternalIdHandlers;
        /** @private */
        private _handleErrorFunction;
        /** @private */
        private _activityBeginFunction;
        /** @private */
        private _activityCompleteFunction;
        /** @private */
        private _workflowAbortFunction;
        /** @private */
        private _workflowCompleteFunction;
        /** @private */
        private _webRequestBeginFunction;
        /** @private */
        private _webRequestCompleteFunction;
        handleUnhandledActivityErrorFunction: (error: Error, context: ActivityContext) => void;
        handleOpenReportUrlFunction: (url: string, context: ActivityContext) => void;
        _showDebugHandler: (formDefinition: any, callback: any) => any;
        /**
         * @private
         * The name of the default form container ID to use.
         */
        defaultFormContainerId: string;
        defaultFormContentId: string;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.DefaultActivityDispatcher} class.
         * @class
         * The default activity dispatcher for workflow.  Use or subclass this dispatcher to handle all built-in activities.
         * @constructs
         * @param {Function} [errorHandler] The callback function that will handle errors. The function should expect an Error as parameter.
         * @param {Function} [activityBeginHandler] The callback function that will be called when an activity begins.
         * @param {Function} [activityCompleteHandler] The callback function that will be called when an activity completes.
         * @param {Function} [activityAbortHandler] The callback function that will be called if an activity is aborted.
         * @param {Function} [workflowCompleteHandler] The callback function that will be called when the workflow completes.
         */
        constructor();
        constructor(errorHandler: (error: Error, context: ActivityContext) => void, activityBeginHandler: (context: any) => void, activityCompleteHandler: (context: any) => void, workflowCompleteHandler: (outputs: any, workflow: essentials.Workflow) => void);
        constructor(errorHandler: (error: Error, context: ActivityContext) => void, activityBeginHandler: (context: any) => void, activityCompleteHandler: (context: any) => void, workflowCompleteHandler: (outputs: any, workflow: essentials.Workflow) => void, workflowAbortHandler: (context: any, workflow: essentials.Workflow) => void, webRequestBeginHandler: (url: string, workflow: essentials.Workflow) => void, webRequestCompleteHandler: (url: string, workflow: essentials.Workflow) => void);
        /**
         * Registers default handler behaviour.
         */
        registerDefaultHandlers(): void;
        /**
         * Determines whether this instance can handle the specified ActivityContext.
         * @param context The ActivityContext to test.
         * @return {Boolean}
         */
        canHandleActivity(context: ActivityContext): boolean;
        /**
         * Registers a handler that will be called by the dispatcher if an activity with a matching external Id is encountered. This allows
         * the workflow developer to target a specific activity within a specific workflow instead of handling it based on the more general
         * type name. Note that a handler with a matching external Id overrides a matching type name.
         * @param externalId The Id of the activity to register handler for.
         * @param handler The handler to register for the given activity.
         */
        registerExternalIdHandler(externalId: string, handler: Function): void;
        /**
         * Registers a handler that will be called when an activity with a matching type name is encountered.  Note that a handler with a matching
         * external Id overrides a matching type name.
         */
        registerActivityHandler(activityTypeName: string, handler: Function): void;
        /**
         * Performs the dispatching of an external activity. This will invoke the dispatchHandler.
         * @param context The context of the activity to dispatch.
         */
        dispatch(context: ActivityContext): void;
        /**
         * Handles error related to workflows. This will invoke the errorHandler.
         * @param error The error to handle.
         * @param activityContext The ActivityContext that generated the error.
         */
        handleError(error: Error, activityContext: ActivityContext): void;
        handleUnhandledActivityError(error: Error, activityContext: ActivityContext): void;
        handleOpenReportUrl(url: string, activityContext: ActivityContext): void;
        /**
          * Called when a web request is started as part of a workflow.
          * @param url The web request URL.
          * @param workflow The current workflow.
          */
        webRequestBegin(url: string, workflow: essentials.Workflow): void;
        /**
         * Called when a web request is completed as part of a workflow.
         * @param url The web request URL.
         * @param workflow The current workflow.
         */
        webRequestComplete(url: string, workflow: essentials.Workflow): void;
        /**
         * Aborts any workflow activity that requires map interaction. e.g. CaptureGeometry.
         * @return A boolean value indicating if any active draw activity has been successfully cancelled or not
         */
        abortMapBasedActivity(): boolean;
        /**
         * Sets the value of the DrawObjectContext
         */
        setDrawObjectContext(ctx: {
            activityContext: ActivityContext;
            toolbar: esri.toolbars.Draw;
            drawEvent: any;
        }): void;
        /**
         * Called when the client portion of an external activity is about to be dispatched. This will invoke the activityBeginHandler.
         * @param context The context of the activity that is about to begin.
         */
        activityBegin(context: ActivityContext): void;
        /**
         * Called when the client portion of an external activity is complete. This will invoke the activityCompleteHandler.
         * @param context The context of the activity that has just completed.
         */
        activityComplete(context: ActivityContext): void;
        /**
         * Called when the client portion of an external activity is aborted for some reason. This will invoke the workflowAbortHandler since the workflow can no longer
         * continue once a component activity is aborted.
         * @param context The context of the activity that was aborted
         */
        activityAbort(context: ActivityContext): void;
        /**
         * Called when the workflow is complete.
         * @param outputs The outputs of the workflow that has just completed. This will invoke the workflowCompleteHandler.
         * @param workflow The workflow that has just completed.
         */
        workflowComplete(outputs: any, workflow: essentials.Workflow): void;
        /**
         * Called if the workflow is aborted.
         * @param context The context of the activity that has caused the workflow to abort
         * @param workflow The workflow that has just been aborted
         */
        workflowAbort(context: ActivityContext, workflow: essentials.Workflow): void;
    }
}
declare module geocortex.workflow {
    class SimpleActivityDispatcher implements ActivityDispatcher {
        /** @private */
        private _defaultActivityDispatcher;
        /** @private */
        private _dispatchFunction;
        /** @private */
        private _handleErrorFunction;
        /** @private */
        private _activityBeginFunction;
        /** @private */
        private _activityCompleteFunction;
        /** @private */
        private _workflowAbortFunction;
        /** @private */
        private _workflowCompleteFunction;
        /** @private */
        private _webRequestBeginFunction;
        /** @private */
        private _webRequestCompleteFunction;
        /**
         * @private The draw object context for any activity that requires map interaction. Only one instance of the draw Object can be active at any given time
         * @type {  activityContext: ActivityContext; toolbar: esri.toolbars.Draw; drawEvent: any }
         */
        private _drawObjectContext;
        /**
         * The value indicating whether the workflow controller is busy.
         * @type Boolean
         */
        isBusy: boolean;
        /**
         * Initializes a new instance of the {@link geocortex.workflow.SimpleActivityDispatcher} class.
         * @class
         * Represents a simple implementation of the IActivityDispatcher that allows the use of callback
         * functions to handle the dispatching functions. This is useful for unit testing.
         * @constructs
         * @param {Function} [dispatchHandler] The callback function that will handle the dispatching of activities. The function should expect an ActivityContext as parameter.
         * @param {Function} [errorHandler] The callback function that will handle errors. The function should expect an Error as parameter.
         * @param {Function} [activityBeginHandler] The callback function that will be called when an activity begins.
         * @param {Function} [activityCompleteHandler] The callback function that will be called when an activity completes.
         * @param {Function} [workflowCompleteHandler] The callback function that will be called when the workflow completes.
         */
        constructor(dispatchHandler?: (context: ActivityContext) => void, errorHandler?: (error: Error, activityContext: ActivityContext) => void, activityBeginHandler?: (context: ActivityContext) => void, activityCompleteHandler?: (context: ActivityContext) => void, workflowCompleteHandler?: (outputs: any, workflow: essentials.Workflow) => void, workflowAbortHandler?: (context: any, workflow: essentials.Workflow) => void, webRequestBeginHandler?: (url: string, workflow: essentials.Workflow) => void, webRequestCompleteHandler?: (url: string, workflow: essentials.Workflow) => void);
        /**
         * Performs the dispatching of an external activity. This will invoke the dispatchHandler.
         * @param context The context of the activity to dispatch.
         */
        dispatch(context: ActivityContext): void;
        /**
         * Handles error related to workflows. This will invoke the errorHandler.
         * @param error The error to handle.
         * @param activityContext The ActivityContext that generated the error.
         */
        handleError(error: Error, activityContext: ActivityContext): void;
        /**
         * Aborts any workflow activity that requires map interaction. e.g. CaptureGeometry.
         * @return A boolean value indicating if any active draw activity has been successfully cancelled or not
         */
        abortMapBasedActivity(): boolean;
        /**
         * Sets the value of the DrawObjectContext
         */
        setDrawObjectContext(ctx: {
            activityContext: ActivityContext;
            toolbar: esri.toolbars.Draw;
            drawEvent: any;
        }): void;
        /**
         * Called when the client portion of an external activity is about to be dispatched. This will invoke the activityBeginHandler.
         * @param context The context of the activity that is about to begin.
         */
        activityBegin(context: ActivityContext): void;
        /**
         * Called when the client portion of an external activity is complete. This will invoke the activityCompleteHandler.
         * @param context The context of the activity that has just completed.
         */
        activityComplete(context: ActivityContext): void;
        /**
         * Called when the client portion of an external activity is aborted for some reason. This will invoke the workflowborHandler since the workflow can no longer
         * continue once a component activity is aborted.
         * @param context The context of the activity that was aborted
         */
        activityAbort(context: ActivityContext): void;
        /**
         * Called when a web request is started as part of a workflow.
         * @param url The web request URL.
         * @param workflow The current workflow.
         */
        webRequestBegin(url: string, workflow: essentials.Workflow): void;
        /**
         * Called when a web request is completed as part of a workflow.
         * @param url The web request URL.
         * @param workflow The current workflow.
         */
        webRequestComplete(url: string, workflow: essentials.Workflow): void;
        /**
         * Called when the workflow is complete.
         * @param outputs The outputs of the workflow that has just completed. This will invoke the workflowCompleteHandler.
         * @param workflow The workflow that has just completed.
         */
        workflowComplete(outputs: any, workflow: essentials.Workflow): void;
        /**
         * Called if the workflow is aborted.
         * @param context The context of the activity that has caused the workflow to abort
         * @param workflow The workflow that has just been aborted
         */
        workflowAbort(context: ActivityContext, workflow: essentials.Workflow): void;
        handleOpenReportUrl(url: string, activityContext: ActivityContext): void;
    }
}
declare module geocortex.workflow.MapActivityHandlers {
    /** @private */
    function _pickSupported(list: string[], item: string): string;
    /** @private */
    function handleIntersectLayers(activityContext: ActivityContext): void;
    /** @private */
    function handleExportMap(activityContext: ActivityContext): void;
    /** @private */
    function handlePrintMap(activityContext: ActivityContext): void;
}
declare module geocortex.workflow.DefaultActivityHandlers {
    /** @private */
    function handleIntersectLayers(activityContext: ActivityContext): void;
    /** @private */
    function handleExportMap(activityContext: ActivityContext): void;
    /** @private */
    function handlePrintMap(activityContext: ActivityContext): void;
    /** @private */
    function handleRefreshMap(activityContext: ActivityContext): void;
    /** @private */
    function handleGetMapExtent(activityContext: ActivityContext): void;
    /** @private */
    function handleGetMapInfo(activityContext: ActivityContext): void;
    /** @private */
    function handleSetMapExtent(activityContext: ActivityContext): void;
    /** @private */
    function handleCaptureGeometry(activityContext: ActivityContext): void;
}
/** @docs-hide-from-nav */
declare module geocortex.essentials.xmlUtils {
    /**
     * recursively build object from xml doc
     */
    function parseObject(node: Node): Object;
    function getAllNodes(node: Node): dojo.NodeList;
    function getNodes(parentTagName: string, childTagName: string, doc: Document): dojo.NodeList;
    function getValue(source: string, document: Document): string;
    function getValue(source: Node, document: Document): string;
    function getAttribute(node: Element, attrName: string): string;
}
declare module geocortex.essentials {
    /**
     * Bundles the resulting object from a REST request, its JSON representation, and any error which occurred during the request into a single object.
     */
    class RestEndpointResult {
        /** Any error that occurred. */
        error: Error;
        /** The JSON representation of the {@link resultObject}. */
        rawJson: Object;
        /** The result object. */
        resultObject: Object;
        /**
         * Initializes a new instance of the {@link RestEndpointResult} class.
         * @param resultObject The object that represents the results of the REST request.
         * @param error The error.
         */
        constructor(resultObject: Object, error: Error);
    }
}
declare module geocortex.essentials {
    /**
     * Provides the functionality to access a custom REST endpoint and process any resulting response objects.
     */
    class RestUtility {
        /** @private */
        private _activeEndpointRequest;
        /** @private */
        private _onRequestComplete;
        /** @private */
        private _onRequestError;
        /**
         * Retrieves an object from an arbitrary rest endpoint. This is an asynchronous method, you may provide delegates for completion or error information.
         * @param endpointUrl The Rest endpoint to retrieve the object from.
         * @param completeHandler The delegate that will be called when the operation has completed
         *        (even if an error occurs).
         * @param errorHandler The delegate that will be called if an error occurs.
         * @param options Same as {@link esri.request} (useProxy, usePost).
         */
        getCustomRestEndpoint(endpointUrl: string, content: any, completeHandler: (res: RestEndpointResult) => void, errorHandler: (error: Error) => void, options: Object): void;
        /** @private */
        private _onEndpointRequestComplete(results);
        /** @private */
        private _onEndpointRequestError(error);
    }
}
declare module geocortex.essentials {
    /**
     * Representation of a GeoRSS layer. The properties in this class represent the configuration served from the Essentials REST API.
     */
    class GeoRssLayerService extends MapService {
        /**
         * WebMercator Spatial Reference. Some client-side handling exists, particularly between this and {@link wgs84Sref}.
         */
        static webMercatorSref: esri.SpatialReference;
        /**
         * WGS84 Spatial reference. See {@link webMercatorSref}.
         */
        static wgs84Sref: esri.SpatialReference;
        /** @private */
        private _colorSet;
        /** @private */
        private _layerLoadCompleted;
        /**
         * The color in which complex geometries like polygon and polyline will be drawn, represented as an integer array
         * of red, green, and blue values in 0-255. */
        color: number[];
        /** GeoRSS feed URL. */
        feedUrl: string;
        /** Picture image that represents a GeoRSS feed item. */
        feedImageUri: string;
        /** The GeoRSS feed update interval in seconds. The feed will be refreshed on this interval. */
        updateInterval: number;
        /** The symbol for feedImageUri. */
        pictureSymbol: esri.symbol.PictureMarkerSymbol;
        /** The rendering symbol when no feedImageUri provided. */
        markerSymbol: esri.symbol.SimpleMarkerSymbol;
        /** The graphics layer which represents a GeoRSS layer. */
        geoRssLayer: esri.layers.GraphicsLayer;
        /** The spatial reference of the map. */
        mapSpatialReference: esri.SpatialReference;
        /** A geometry service for projecting feed shapes to map spatial reference. */
        geometryService: esri.tasks.GeometryService;
        /**
        * Initializes a new instance of the {@link GeoRssLayerService} class.
        * @param url  The URL of the GeoRSS feed to load.
        */
        constructor(url: string);
        /** @private */
        _configureObject(obj: any, deepInitialize?: boolean): void;
        /** @private */
        _createServiceLayer(): void;
        /**
         * @private
         * Loads the GeoRSS feed.
         */
        private _loadFeed();
        /**
         * @private
         * Parses the GeoRSS feed and creates features from the feed items.
         */
        private _handleFeed(response);
        /**
         * @private
         * Does the projection of the graphic objects onto the map.
         */
        private _projectShapes(features, outSR);
        private _publishLayer(features);
        /**
         * @private
         * Projection failed for GeoRss layer.
         */
        _projectionError(error: Error): void;
        /**
         * @private
         * Provides support for SIMPLE encoding.
         */
        _getSimpleGRSSPoint(entryNode: Node): esri.geometry.Point;
        /**
         * @private
         * Provides support for GML encoding.
         */
        private _getGMLGRSSPoint(entryNode);
        /**
         * @private
         * Gets a none-text element.
         */
        private _getNonTextNodeChild(node);
        /**
         * @private
         * Provides support for W3C geo vocabulary.
         */
        _getW3CGRSSPoint(latNode: Node): esri.geometry.Point;
        /**
         * @private
         * Gets the root node of the feed.
         */
        _getFeedRoot(response: Document): Element;
    }
}
