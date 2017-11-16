declare namespace geocortex.analytics {
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
        appVersion: string;
        appName: string;
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
declare namespace geocortex.analytics {
    class EventRelay {
        STORAGE_TEXTFILE_NAME: string;
        STORAGE_ZIPFILE_NAME: string;
        STORAGE_ANALYTICS_GUID: string;
        ERROR_MSG_LOCAL_STORAGE_NOT_SUPPORTED: string;
        ERROR_MSG_LOCAL_STORAGE_EXCEPTION: string;
        /**
         * Whether or not the relay is enabled. It is enabled by default, but disables itself after four
         * consecutive failures to log data to the Analytics Rest endpoint.
         * @default true
         */
        private _enabled;
        /**
         * Whether or not the relay is initialized.
         * @default false
         */
        private _isInit;
        /**
         * Determines whether or not local storage is available (if not, don't store more data).
         * @default true
         */
        private _localStorageAvailable;
        /**
         * Temporary array to add events to before they are stored in local storage.
         */
        private _tempEventCollection;
        /**
         * Indicates if the current browser is IE/Edge or not.
         * @default false
         */
        private _isIE;
        /**
         * Handle used to identify the connection to the onExtentChange
         * map event to disconnect it if the collector needs to be disabled.
         */
        private _extentConnect;
        private _map;
        private _siteId;
        private _endpointUrl;
        private _sessionId;
        private _workstationId;
        private _viewerId;
        private _dataTransmissionTimer;
        private _transmissionInterval;
        private _timerDuration;
        private _writeToStorageTimeoutToken;
        /**
         * Creates a new instance of the {@link geocortex.insight.EventRelay} class.
         * Call init() to record pending and future events.
         * @param viewerId The unique identifier for this instance of the viewer (eg. "LA_County_Viewer").
         * @param siteId The unique identifier for the "site" or map instance used (eg. "LA_County").
         * @param siteUrl An optional URL to the site. Will be used as the unique identifier if specified.
         * @param endpointUrl URL for the Insight client relay REST endpoint.
         * @param transmissionInterval Specify the number of seconds between data transmission periods (default is 30 seconds).
         * @param libraryUrl An optional URL pointing to the directory containing referenced Javascript libraries.
         */
        constructor(viewerId: string, siteId: string, siteUrl?: string, endpointUrl?: string, transmissionInterval?: number, libraryUrl?: string);
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
        /**
         * Checks if the relay has been initialized.
         */
        isInit(): boolean;
        /**
         * Initializes the relay.  Temp events will be recorded to the file for sending.
         * @param viewerType The type of viewer used (eg. "Geocortex Viewer for HTML5").
         * @param viewerVersion The version of the viewer.
         */
        init(viewerType: string, viewerVersion: string): void;
        private _initializeMapEvents();
        private _logStartupEvent(viewerType, viewerVersion);
        private _logExtentChange(extent, lod?);
        private _logVisibilityChange(args);
        /**
        * private - Adds the log event to the queue, which will be cleared on a variable time interval. This function
        * will mix in values common to all log events before queueing.
        */
        private _queueData(content);
        /**
         * Writes the pending events to local storage.
         */
        private _writeToStorage();
        private _compressEvents();
        /**
        * Attempt to send the accumulated data to the client relay. All existing event information will
        * be compressed prior to sending it out. If there is an error sending the data, then the Event Relay will
        * perform a retry after an exponential amount of time passes.
        */
        private _sendDataToClientRelay(endpointUrl);
        private _resetDataTransmissionTimer(_this);
        private _getWorkstationId();
        private _generateGuid();
        private _generateTimestamp();
        /**
         * Determine if the current browser is IE/Edge.
         */
        private _detectIE();
        private _browserDimensions();
    }
}
