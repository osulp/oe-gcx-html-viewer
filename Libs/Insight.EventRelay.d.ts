declare module geocortex.insight {
    interface AuthenticationEvent {
        username: string;
        success: boolean;
        authority?: string;
    }
    interface DatalinkEvent {
        datalinkID: string;
        featureResults: number;
        time: number;
    }
    interface GeocodeEvent {
        mapServiceURL: string;
        searchText: string;
        geocodeType: string;
        resultCount: number;
        time: number;
    }
    interface GeometryRequestEvent {
        mapServiceURL: string;
        geometryCommand: string;
        time: number;
    }
    interface LayerVisibilityEvent {
        layerURL: string;
        mapServiceURL: string;
        visible: boolean;
    }
    interface LogEvent {
        message: string;
        level: string;
        stackTrace: string;
    }
    interface MapExtent {
        xMax: number;
        xMin: number;
        yMax: number;
        yMin: number;
        spatialReference: esri.SpatialReference;
        resolution?: number;
        scale?: number;
    }
    interface MapServiceVisibilityEvent {
        mapServiceURL: string;
        visible: boolean;
    }
    interface PrintEvent {
        templateID: string;
        time: number;
    }
    interface ReportEvent {
        templateID: string;
        time: number;
    }
    interface SearchEvent {
        searchText: string;
        searchType: string;
        resultCount: number;
        time: number;
    }
    interface ServiceLayerInitializationEvent {
        layerURL: string;
        mapServiceURL: string;
        time: number;
    }
    interface SiteInitializationEvent {
        time: number;
    }
    interface StartupEvent {
        viewerType: string;
        viewerVersion: string;
        siteID: string;
        userAgent: string;
        browserWidth: number;
        browserHeight: number;
        screenWidth: number;
        screenHeight: number;
    }
    interface ToolEvent {
        name: string;
        location: string;
        command?: string;
        commandParameter?: string;
        drawMode?: string;
    }
    interface WorkflowEvent {
        workflowID: string;
        workflowURL: string;
        time: number;
    }
    interface UnhandledExceptionEvent {
        message: string;
        stackTrace?: string;
    }
}
declare module geocortex.insight {
    class EventRelay {
        /**
         * Initializes a new instance of the {@link geocortex.insight.EventRelay} class.
         * @param viewerType The type of viewer used (eg. "Geocortex Viewer for HTML5").
         * @param viewerId The unique identifier for this instance of the viewer (eg. "LA_County_Viewer").
         * @param siteId The unique identifier for the "site" or map instance used (eg. "LA_County").
         * @param siteUrl An optional URL to the site. Will be used as the unique identifier if specified.
         * @param viewerVersion The version of the viewer.
         * @param endpointUrl URL for the Insight client relay REST endpoint.
         * @param transmissionInterval Specify the number of seconds between data transmission periods (default is 30 seconds).
         * @param libraryUrl An optional URL pointing to the directory containing referenced Javascript libraries.
         */
        constructor(viewerType: string, viewerId: string, siteId: string, siteUrl?: string, viewerVersion?: string, endpointUrl?: string, transmissionInterval?: number, libraryUrl?: string);
        /**
         * Setup the ESRI map so that map events can be monitored and automatically logged to Insight.
         * @param map ESRI map object whose events will be logged.
         */
        setupMap(map: esri.Map): void;
        /**
         * Log an event to Insight that is not otherwise captured by the Event Relay.
         * @param eventName The name or type of the event to log.
         * @param eventData The event data; an object containing properties to log.
         */
        logEvent(eventName: string, eventData: any): void;
    }
}
