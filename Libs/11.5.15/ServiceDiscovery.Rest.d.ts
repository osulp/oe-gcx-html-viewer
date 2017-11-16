/// <reference path="LayerTheme.Rest.d.ts" />

// Type definitions for service discovery rest endpoints

declare module geocortex.essentials.rest.serviceDiscovery {

    /**
     * Represents a result from a service discovery operation.
     */
    interface ResultItem {
        id: string;
        name: string;
        displayName: string;
        description: string;

        discoveryProviderName: string;
        serviceProviderName: string;
        url: string;
        serviceType: string[];
        thumbnailUrl: string;
        boundingBox?: any; //--> Envelope
        children: ResultItem[];
        hasChildren: boolean;

        currentPageInfo: ResultPageInfo;
        connection: ServiceConnection;

        layerMask: string;
        mapStyle: string;
        styleUrl: string;
        isContainerForRealResult: boolean;
        isLastItemOfPage: boolean;
    }

    /** 
     * Contains metadata for the current result set/page.
     */
    interface ResultPageInfo {
        page: number;
        startCounter: number;
        resultsPerPage: number;
        totalResults: number;
        useNextPageInfo: boolean;
    }

    interface MapServiceInfo {
        id: string;
        displayName: string;
        shortDisplayName: string;
        description: string;
        connectionString?: string;
        serviceUrl?: string;
        copyright: string;
        hasAttributionData: boolean;
        serviceType: string;
        serviceFunction: string;

        baseMapGroup: string;
        baseMapGroupIndex: string;
        baseMapGroupIsMutuallyExclusive: boolean;

        opacity: number;
        visible: boolean;
        initiallyVisible: boolean;
        drawingBehavior: string;
        iconUri: string;

        includeInLayerList: boolean;
        defaultAllowSymbolization: boolean;
        isExpanded: boolean;
        updateInterval: number;
        dataProvider: string;
        disableClientCaching: boolean;
        identifiable?: boolean;
        instantSearch?: boolean;

        includeMosaicDatasetValues?: boolean;
        includeCatalogItems?: boolean;

        startTime?: any; //--> Date
        endTime?: any; //--> Date

        serverVersion: string;
        failureAction: string;
        requestEncoding: string;

        supportsDynamicLayers: boolean;
        hasLayerCatalog: boolean;

        format?: string;
        defaultDateFormat?: string;
        defaultNumberFormat?: string;
        timeZoneId?: string;

        proxyInfo?: {
            address: string;
            type: string;
        };

        // GeoRSS layer properties
        feedImageUri?: string;
        color?: number[];

        // WMS properties
        operationalSpatialReference?: string;

        // WMTS properties
        tileMatrixSet?: string;

        themeSettings?: RestlayerThemeSetting[];
        layerHyperlinks?: LayerHyperlinkInfo[];

        // Raster options
        bandIds?: any[];
        interpolation?: string;
        compressionQuality?: number;
        pixelType?: string;
        noData?;
        mosaicRule?: {
            ascending: boolean;
            mosaicMethod?: string;
            mosaicOperation?: string;
            sortField: string;
            sortValue?: any;
            where?: string;
            lockRasterIds?: number[];
            fids?: number[];
            viewpoint?: {
                x: number;
                y: number;
            };
        };
        renderingRule?: {
            rasterFunction?: string;
            variableName?: string;
            rasterFunctionArguments?: any;
        };

        // Tile info
        tileInfo?: {
            dpi: number;
            format: string;
            spatialReference: {
                wkid?: number;
                wkt?: string;
            };
            height: number;
            width: number;
            origin: {
                x: number;
                y: number;
            };
            lods: TileLevelOfDetail[];
        };

        // Scale dependencies
        minScale?: number;
        maxScale?: number;
        fullExtent?: any; //--> Extent

        layers: any[];
        tables: any[];
    }

    interface FeatureLayerServiceInfo extends MapServiceInfo {
        autoSave: boolean;
        color: number[];
        geometry: any;
        objectIds: number[];
        onDemandCacheSize: number;
        outFields: string;
        queryMode: string;

        tileHeight?: number;
        tileWidth?: number;

        selectionColor: number[];
        where: string;

        editVerticesEnabled: boolean;
        moveEnabled: boolean;
        rotateEnabled: boolean;
        scaleEnabled: boolean;

        renderer?: any;
        featureClustering?: FeatureClusterInfo;
        featureHeatMap?: FeatureHeatMapInfo;
    }

    interface FeatureClusterInfo {
        enabled: boolean;
        userCanToggle: boolean;
        radius: number;
        clusterSize: number;
        backgroundColor: number[];
        labelColor: number[];
    }

    interface FeatureHeatMapInfo {
        enabled: boolean;
        userCanToggle: boolean;
        respectScaleRange: boolean;
        gradient: number[][];
        offset: number[];
        intensity: number;
        field?: string;
        defaultRenderer?: any;
        defaultMinScale?: number;
        defaultMaxScale?: number;
        includeInLegend?: boolean;
    }

    interface LayerHyperlinkInfo {
        encodeUriReplacementValues: string;
        target: string;
        text: string;
        toolTip: string;
        uri: string;
        iconUri: string;
    }

    interface TileLevelOfDetail {
        level: string;
        resolution: number;
        scale: number;
    }
    /**
     * Defines the service connection.
     */
    interface ServiceConnection {
        id: string;
    }

    /**
     * Basic structure of a request to a REST endpoint.
     */
    interface BaseRequest {

        /** Preferred response format, usually "json". */
        f?: string;
    }

    /** 
     * A set of parameters used in a service discovery find operation.
     */
    interface FindServicesRequest extends BaseRequest {
        term: string;
        whitelistOnly?: boolean;
        providerName?: string;
        page?: number;
        startCounter?: number;
        resultsPerPage?: number;
        totalResults?: number;
        useNextPageInfo?: boolean
    }

    /** 
     * A set of parameters used in a service discovery suggest operation.
     */
    interface SuggestHintsRequest extends BaseRequest {
        term: string;
    }

    interface ExpandServiceRequest extends BaseRequest {
        providerName: string;
        url: string;
    }

    interface RealizeMapServiceRequest extends BaseRequest {
        providerName: string;
        url: string;
        sr: string;
        itemId?: string;
    }
}

declare module geocortex.essentials.rest.serviceDiscovery.results {

    /**
     * Basic structure of a response from a REST endpoint. It might include an error.
     */
    interface BaseResponse {

        /** Standard error that may or may not be found in a response from the server. */
        error?: {
            name: string;
            message: string;
            code: number;
        };
    }

    /**
     * Response from the find services endpoint, which returns a list of result items that match the provided search term.
     */
    interface FindServicesResult extends BaseResponse {
        results: ResultItem[];
    }

    /**
     * Response from the suggest hints endpoint, which returns a list of strings that match or are related to the provided search term.
     * This is typically used for auto-complete dropdown boxes.
     */
    interface SuggestHintsResult extends BaseResponse {
        hints: string[];
    }

    interface ExpandServiceResult extends BaseResponse, ResultItem {
    }

    interface RealizeMapServiceResult extends BaseResponse, MapServiceInfo {
    }
}