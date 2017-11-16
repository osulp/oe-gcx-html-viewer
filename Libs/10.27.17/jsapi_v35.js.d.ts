///<reference path='dojo.d.ts' />
declare module esri {
    export var config: {
        defaults: {
            geometryService: any;
            kmlService: any;
            map: {
                basemaps: any;
                graphicsLayerNamePrefix: string;
                height: number;
                layerNamePrefix: string;
                logoLink: string;
                panDuration: number;
                panRate: number;
                slider: {
                    height: string;
                    left: string;
                    top: string;
                    width: string;
                };
                sliderChangeImmediate: boolean;
                sliderLabel: {
                    labels: any;
                    style: string;
                    tick: number;
                };
                width: number;
                zoomDuration: number;
                zoomRate: number;
                zoomSymbol: any;
            };
            io: {
                alwaysUseProxy: boolean;
                corsDetection: boolean;
                corsEnabledServers: string[];
                errorHandler: Function;
                postLengfth: number;
                proxyUrl: string;
                timeout: number;
            };
            screenDPI: number;
        };
    };
    export var id: IdentityManager;
    export function addProxyRule(rule: { proxyUrl: string; urlPrefix: string; }): void;
    export function filter(object: any, callback: (value: any) => boolean, thisObject: any): any;
    export function getGeometries(graphics: esri.Graphic[]): esri.geometry.Geometry[];
    export function graphicsExtent(graphics: esri.Graphic[]): esri.geometry.Extent;
    export function hide(element:Element): void;
    export function isDefined(value: any): boolean;
    export function request(request?: any, options?: any): dojo.Deferred;
    export function setRequestPreCallback(callbackFunction: (ioArgs: any) => any): void;
    export function show(element:Element): void;
    export function substitute(data: any, template?: string, first?: boolean): string;
    export function toggle(element:Element): void;
    export function urlToObject(url: string): any;
    export function valueOf(array: any[], value: any): any;
    export class Credential {
        expires: string;
        isAdmin: boolean;
        server: string;
        ssl: boolean;
        token: string;
        userId: string;
        constructor();
        destroy(): void;
        refreshToken(): dojo.Deferred;
        toJson(): any;
    }
    export class Graphic {
        attributes: any;
        geometry: esri.geometry.Geometry;
        infoTemplate: esri.InfoTemplate;
        symbol: esri.symbol.Symbol;
        visible: boolean;
        constructor(geometry: esri.geometry.Geometry, symbol: esri.symbol.Symbol, attributes: any, infoTemplate: esri.InfoTemplate);
        constructor(json: any);
        getContent(): string;
        getDojoShape(): dojox.gfx.shape.Shape;
        getInfoTemplate(): esri.InfoTemplate;
        getLayer(): esri.layers.GraphicsLayer;
        getTitle(): string;
        hide(): void;
        setAttributes(attributes: any): esri.Graphic;
        setGeometry(geometry: esri.geometry.Geometry): esri.Graphic;
        setInfoTemplate(infoTemplate: esri.InfoTemplate): esri.Graphic;
        setSymbol(symbol: esri.symbol.Symbol): esri.Graphic;
        show(): void;
        toJson(): any;
    }
    export class IdentityManager extends IdentityManagerBase {
        dialog: any;
        constructor();
        signIn(url: string, serverInfo: esri.ServerInfo, options?: { error?: Error; isAdmin?: boolean; token?: string; }): dojo.Deferred;
    }
    export class IdentityManagerBase {
        tokenValidity: number;
        constructor();
        findCredential(url: string, userId?: string): esri.Credential;
        findServerInfo(url: string): esri.ServerInfo;
        generateToken(serverInfo: esri.ServerInfo, userInfo: any, options?: any): dojo.Deferred;
        getCredential(url: string, options?: any): dojo.Deferred;
        initialize(json: any): any;
        isBusy(): boolean;
        registerServers(serverInfos: esri.ServerInfo): void;
        registerToken(properties: { server: string; token: string; userId?: string; expires?: number; ssl?: boolean; }): void;
        setProtocolErrorHandler(handlerFunction: Function): void;
        setRedirectionHandler(handler: any): void;
        signIn(url: string, serverInfo: esri.ServerInfo, options?: { error?: Error; isAdmin?: boolean; token?: string; }): dojo.Deferred;
        toJson(): any;
    }
    export class InfoTemplate {
        content: any;
        title: any;
        constructor(title: string, content : string);
        constructor(json: { title: string; content: string; });
        constructor();
        setContent(template: any): esri.InfoTemplate;
        setTitle(template: any): esri.InfoTemplate;
        toJson(): any;
    }
    export class InfoWindowBase {
        domNode: any;
        isShowing: boolean;
        constructor();
        destroyDijits(): void;
        hide(): void;
        place(value: any, parentNode: any): void;
        resize(width: number, height: number): void;
        setContent(content: any): void;
        setMap(map: esri.Map): void;
        setTitle(title: any): void;
        show(location: esri.geometry.Point): void;
        startupDijits(): void;
        unsetMap(map: esri.Map): void;
    }
    export interface MapOptions {
        attributionWidth?: number;
        autoResize?: boolean;
        basemap?: string;
        center?: any;
        displayGraphicsOnPan?: boolean;
        extent?: esri.geometry.Extent;
        fadeOnZoom?: boolean;
        fitExtent?: boolean;
        force3DTransforms?: boolean;
        infoWindow?: esri.InfoWindowBase;
        lods?: esri.layers.LOD[];
        logo?: boolean;
        maxScale?: number;
        maxZoom?: number;
        minScale?: number;
        minZoom?: number;
        nav?: boolean;
        navigationMode?: string;
        resizeDelay?: number;
        scale?: number;
        showAttribution?: boolean;
        showInfoWindowOnClick?: boolean;
        slider?: boolean;
        sliderLabels?: string[];
        sliderOrientation?: string;
        sliderPosition?: string;
        sliderStyle?: string;
        wrapAround180?: boolean;
        zoom?: number;
    }
    export class Map {
        attribution: esri.dijit.Attribution;
        autoResize: boolean;
        extent: esri.geometry.Extent;
        fadeOnZoom: boolean;
        force3DTransforms: boolean;
        geographicExtent: esri.geometry.Extent;
        graphics: esri.layers.GraphicsLayer;
        graphicsLayerIds: string[];
        height: number;
        id: string;
        infoWindow: any;
        isClickRecenter: boolean;
        isDoubleClickZoom: boolean;
        isKeyboardNavigation: boolean;
        isPan: boolean;
        isPanArrows: boolean;
        isRubberBandZoom: boolean;
        isScrollWheelZoom: boolean;
        isShiftDoubleClickZoom: boolean;
        isZoomSlider: boolean;
        layerIds: string[];
        loaded: boolean;
        navigationMode: string;
        position: esri.geometry.Point;
        root: any;
        showAttribution: boolean;
        snappingManager: esri.SnappingManager;
        spatialReference: esri.SpatialReference;
        timeExtent: esri.TimeExtent;
        width: number;
        constructor(divId: string, options?: MapOptions);
        addLayer(layer: esri.layers.Layer, index?: number): esri.layers.Layer;
        addLayers(layers: esri.layers.Layer[]): void;
        centerAndZoom(mapPoint: esri.geometry.Point, levelOrFactor: number): dojo.Deferred;
        centerAndZoom(mapPoint: number[], levelOrFactor: number): dojo.Deferred;
        centerAt(mapPoint: esri.geometry.Point): dojo.Deferred;
        centerAt(mapPoint: number[]): dojo.Deferred;
        destroy(): void;
        disableClickRecenter(): void;
        disableDoubleClickZoom(): void;
        disableKeyboardNavigation(): void;
        disableMapNavigation(): void;
        disablePan(): void;
        disableRubberBandZoom(): void;
        disableScrollWheelZoom(): void;
        disableShiftDoubleClickZoom(): void;
        disableSnapping(): void;
        enableClickRecenter(): void;
        enableDoubleClickZoom(): void;
        enableKeyboardNavigation(): void;
        enableMapNavigation(): void;
        enablePan(): void;
        enableRubberBandZoom(): void;
        enableScrollWheelZoom(): void;
        enableShiftDoubleClickZoom(): void;
        enableSnapping(snapOptions?: {
            tolerance?: number;
            layerInfos?: esri.layers.LayerInfo[];
            layer?: esri.layers.Layer;
            snapToPoint?: boolean;
            snapToVertex?: boolean;
            snapToEdge?: boolean;
            snapPointSymbol?: esri.symbol.SimpleMarkerSymbol;
            alwaysSnap?: boolean;
            snapKey?: any;
        }): esri.SnappingManager;
        getBasemap(): string;
        getInfoWindowAnchor(screenCoords: esri.geometry.Point): string;
        getLayer(id: string): esri.layers.Layer;
        getLayersVisibleAtScaleRange(scale: number): esri.layers.Layer[];
        getLevel(): number;
        getMaxScale(): number;
        getMaxZoom(): number;
        getMinScale(): number;
        getMinZoom(): number;
        getScale(): number;
        getZoom(): number;
        hidePanArrows(): void;
        hideZoomSlider(): void;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "basemap-change", handler: (event: { target: esri.Map; }) => void): void;
        on(event: "click", handler: (event: MouseEvent) => void): void;
        on(event: "dbl-click", handler: (event: MouseEvent) => void): void;
        on(event: "extent-change", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; delta: esri.geometry.Point; levelChange: boolean; lod: esri.layers.LOD; }) => void): void;
        on(event: "key-down", handler: (event: KeyboardEvent) => void): void;
        on(event: "key-up", handler: (event: KeyboardEvent) => void): void;
        on(event: "layer-add", handler: (event: { target: esri.Map; layer: esri.layers.Layer; }) => void): void;
        on(event: "layer-add-result", handler: (event: { target: esri.Map; layer: esri.layers.Layer; error: Error; }) => void): void;
        on(event: "layer-remove", handler: (event: { target: esri.Map; layer: esri.layers.Layer; }) => void): void;
        on(event: "layer-reorder", handler: (event: { target: esri.Map; layer: esri.layers.Layer; index: number; }) => void): void;
        on(event: "layer-resume", handler: (event: { target: esri.Map; layer: esri.layers.Layer; }) => void): void;
        on(event: "layers-add-result", handler: (event: { target: esri.Map; }) => void): void;
        on(event: "layers-removed", handler: (event: { target: esri.Map; }) => void): void;
        on(event: "layers-reordered", handler: (event: { target: esri.Map; layerIds: number[]; }) => void): void;
        on(event: "load", handler: (event: { target: esri.Map; map: esri.Map; }) => void): void;
        on(event: "mouse-down", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-drag", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-drag-end", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-drag-start", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-move", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-out", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-over", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-up", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-wheel", handler: (event: MouseEvent) => void): void;
        on(event: "pan", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; delta: esri.geometry.Point; }) => void): void;
        on(event: "pan-end", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; delta: esri.geometry.Point; }) => void): void;
        on(event: "pan-start", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; }) => void): void;
        on(event: "reposition", handler: (event: { target: esri.Map; x: number; y: number; }) => void): void;
        on(event: "resize", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; width: number; height: number; }) => void): void;
        on(event: "time-extent-change", handler: (event: { target: esri.Map; timeExtent: esri.TimeExtent; }) => void): void;
        on(event: "unload", handler: (event: { target: esri.Map; map: esri.Map; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.Map; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.Map; }) => void): void;
        on(event: "zoom", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; zoomFactor: number; anchor: esri.geometry.Point; }) => void): void;
        on(event: "zoom-end", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; zoomFactor: number; anchor: esri.geometry.Point; level: number; }) => void): void;
        on(event: "zoom-start", handler: (event: { target: esri.Map; extent: esri.geometry.Extent; zoomFactor: number; anchor: esri.geometry.Point; level: number; }) => void): void;
        panDown(): dojo.Deferred;
        panLeft(): dojo.Deferred;
        panLowerLeft(): dojo.Deferred;
        panLowerRight(): dojo.Deferred;
        panRight(): dojo.Deferred;
        panUp(): dojo.Deferred;
        panUpperLeft(): dojo.Deferred;
        panUpperRight(): dojo.Deferred;
        removeAllLayers(): void;
        removeLayer(layer: esri.layers.Layer): void;
        reorderLayer(layer: esri.layers.Layer, index: number): void;
        reposition(): void;
        resize(immediate?: boolean): void;
        setBasemap(basemap: string): void;
        setExtent(extent: esri.geometry.Extent, fit?: boolean): dojo.Deferred;
        setLevel(level: number): dojo.Deferred;
        setMapCursor(cursor: string): void;
        setScale(scale: number): dojo.Deferred;
        setTimeExtent(timeExtent: esri.TimeExtent): void;
        setTimeSlider(timeSlider: esri.dijit.TimeSlider): void;
        setZoom(zoom: number): dojo.Deferred;
        showPanArrows(): void;
        showZoomSlider(): void;
        toMap(screenPoint: esri.geometry.ScreenPoint): esri.geometry.Point;
        toScreen(mapPoint: esri.geometry.Point): esri.geometry.Point;
    }
    export class OperationBase {
        label: string;
        type: string;
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
    export class ServerInfo {
        adminTokenServiceUrl: string;
        currentVersion: number;
        server: string;
        shortLivedTokenValidity: number;
        tokenServiceUrl: string;
        constructor();
        toJson(): any;
    }
    export class SnappingManager {
        constructor(options?: {
            alwaysSnap?: boolean;
            layerInfos?: esri.layers.LayerInfo[];
            map?: esri.Map;
            snapKey?: any;
            snapPointSymbol?: esri.symbol.SimpleMarkerSymbol;
            tolerance?: number;
        });
        destroy(): void;
        getSnappingPoint(screenPoint: esri.geometry.Point): dojo.Deferred;
        setLayerInfos(setLayerInfos: esri.layers.LayerInfo[]): void;
    }
    export class SpatialReference {
        wkid: number;
        wkt: string;
        constructor(json: { wkid: number; });
        constructor(wkid: number);
        constructor(wkt: string);
        equals(sr: esri.SpatialReference): boolean;
        isWebMercator(): boolean;
        toJson(): any;
    }
    export class TimeExtent {
        endTime: esri.tasks.Date;
        startTime: esri.tasks.Date;
        constructor(startTime: esri.tasks.Date, endTime: esri.tasks.Date);
        intersection(timeExtent: number): esri.TimeExtent;
        offset(offsetValue: number, offsetUnits: string): esri.TimeExtent;
    }
    export class UndoManager {
        canRedo: boolean;
        canUndo: boolean;
        length: number;
        position: number;
        constructor(options: any);
        add(operation: any): void;
        clearRedo(): void;
        clearUndo(): void;
        destroy(): void;
        get(operation: any): any;
        peekRedo(): any;
        peekUndo(): any;
        redo(): void;
        remove(operation: any): any;
        undo(): void;
    }
    export class Units {
        static ACRES: string;
        static ARES: string;
        static CENTIMETERS: string;
        static DECIMAL_DEGREES: string;
        static DECIMETERS: string;
        static FEET: string;
        static HECTARES: string;
        static INCHES: string;
        static KILOMETERS: string;
        static METERS: string;
        static MILES: string;
        static MILLIMETERS: string;
        static NAUTICAL_MILES: string;
        static POINTS: string;
        static SQUARE_CENTIMETERS: string;
        static SQUARE_DECIMETERS: string;
        static SQUARE_FEET: string;
        static SQUARE_INCHES: string;
        static SQUARE_KILOMETERS: string;
        static SQUARE_METERS: string;
        static SQUARE_MILES: string;
        static SQUARE_MILLIMETERS: string;
        static SQUARE_YARDS: string;
        static UNKNOWN: string;
        static YARDS: string;
    }
}
declare module esri.arcgis {
    export class Portal {
        access: string;
        allSSL: boolean;
        basemapGalleryGroupQuery: string;
        canSearchPublic: boolean;
        canSharePublic: boolean;
        created: esri.tasks.Date;
        culture: string;
        defaultBasemap: any;
        defaultExtent: any;
        description: string;
        featuredGroups: any[];
        featuredItemsGroupQuery: string;
        id: string;
        isOrganization: boolean;
        layerTemplatesGroupQuery: string;
        modified: esri.tasks.Date;
        name: string;
        portalMode: string;
        portalName: string;
        symbolSetsGroupQuery: string;
        templatesGroupQuery: string;
        thumbnailUrl: string;
        url: string;
        constructor(url: string);
        getPortalUser(): esri.arcgis.PortalUser;
        queryGroups(queryParams?: esri.arcgis.PortalQueryParams): dojo.Deferred;
        queryItems(queryParams?: esri.arcgis.PortalQueryParams): dojo.Deferred;
        queryUsers(queryParams?: esri.arcgis.PortalQueryParams): dojo.Deferred;
        signIn(): dojo.Deferred;
        signOut(): esri.arcgis.Portal;
    }
    export class PortalComment {
        comment: string;
        created: string;
        id: string;
        owner: string;
        constructor();
    }
    export class PortalFolder {
        created: esri.tasks.Date;
        id: string;
        portal: esri.arcgis.Portal;
        title: string;
        url: string;
        constructor();
        getItems(): dojo.Deferred;
    }
    export class PortalGroup {
        access: string;
        created: esri.tasks.Date;
        description: string;
        id: string;
        isInvitationOnly: boolean;
        modified: esri.tasks.Date;
        owner: esri.arcgis.Portal;
        portal: esri.arcgis.Portal;
        snippet: string;
        tags: string[];
        thumbnailUrl: string;
        title: string;
        url: string;
        constructor();
        getMembers(): dojo.Deferred;
        queryItems(queryParams?: esri.arcgis.PortalQueryParams): dojo.Deferred;
    }
    export class PortalGroupMembers {
        admins: string[];
        owner: string;
        users: string[];
        constructor();
    }
    export class PortalItem {
        access: string;
        accessInformation: string;
        avgRating: number;
        created: esri.tasks.Date;
        culture: string;
        description: string;
        extent: any;
        id: string;
        itemDataUrl: string;
        itemUrl: string;
        licenseInfo: string;
        modified: esri.tasks.Date;
        name: string;
        numComments: number;
        numRatings: number;
        numViews: number;
        owner: string;
        portal: esri.arcgis.Portal;
        size: number;
        snippet: string;
        spatialReference: string;
        tags: string[];
        thumbnailUrl: string;
        title: string;
        type: string;
        typeKeywords: string[];
        url: string;
        userItemUrl: string;
        constructor();
        addComment(comment: string): dojo.Deferred;
        addRating(rating: number): dojo.Deferred;
        deleteComment(comment: esri.arcgis.PortalComment): dojo.Deferred;
        deleteRating(rating: esri.arcgis.PortalRating): dojo.Deferred;
        getComments(): dojo.Deferred;
        getRating(): dojo.Deferred;
        updateComment(comment: esri.arcgis.PortalComment): dojo.Deferred;
    }
    export class PortalQueryParams {
        num: string;
        q: string;
        sortField: string;
        start: string;
        constructor();
    }
    export class PortalQueryResult {
        nextQueryParams: esri.arcgis.PortalQueryParams;
        queryParams: esri.arcgis.PortalQueryParams;
        results: any[];
        total: number;
        constructor();
    }
    export class PortalRating {
        created: esri.tasks.Date;
        rating: number;
        constructor();
    }
    export class PortalUser {
        access: string;
        created: esri.tasks.Date;
        culture: string;
        description: string;
        email: string;
        fullName: string;
        modified: esri.tasks.Date;
        orgId: string;
        portal: esri.arcgis.Portal;
        preferredView: string;
        region: string;
        role: string;
        tags: string[];
        thumbnailUrl: string;
        userContentUrl: string;
        username: string;
        constructor();
        getFolders(): dojo.Deferred;
        getGroupInvitations(): dojo.Deferred;
        getGroups(): dojo.Deferred;
        getItem(itemId: string): PortalItem;
        getItems(folderId: string): dojo.Deferred;
        getNotifications(): dojo.Deferred;
        getTags(): dojo.Deferred;
    }
}
declare module esri.arcgis.utils {
    export function createMap(itemId: string, mapDiv: string, options?: { mapOptions?: MapOptions; bingMapsKey?: string; ignorePopups?: boolean; geometryServiceURL?: string; }): dojo.Deferred;
    export function createMap(itemInfo: any, mapDiv: string, options?: { mapOptions?: MapOptions; bingMapsKey?: string; ignorePopups?: boolean; geometryServiceURL?: string; }): dojo.Deferred;
    export function getItem(itemId: string): dojo.Deferred;
    export function getLegendLayers(): esri.layers.LayerInfo[];
}
declare module esri.dijit {
    export class AttributeInspector {
        constructor(params: { layerInfos?: esri.layers.LayerInfo[]; }, srcNodeRef: string);
        destroy(): void;
        first(): void;
        last(): void;
        next(): void;
        previous(): void;
        refresh(): void;
    }
    export class Attribution {
        itemDelimiter: string;
        itemNodes: HTMLElement[];
        listNode: HTMLElement;
        map: esri.Map;
        constructor(options: { itemDelimiter?: string; map?: esri.Map; }, srcNodeRef: any);
        destroy(): void;
    }
    export class Basemap {
        id: string;
        thumbnailUrl: string;
        title: string;
        constructor(params?: any);
        getLayers(): esri.layers.Layer[];
    }
    export class BasemapGallery {
        basemaps: esri.dijit.Basemap[];
        loaded: boolean;
        constructor(params: {
            basemapIds?: string[];
            basemaps?: esri.dijit.Basemap[];
            basemapsGroup?: any;
            map?: esri.Map;
            referenceIds?: string[];
            showArcGISBasemaps?: boolean;
        }, srcNodeRef?: string);
        add(basemap: esri.dijit.Basemap): boolean;
        destroy(): void;
        get(id: string): esri.dijit.Basemap;
        getSelected(): esri.dijit.Basemap;
        remove(id: string): esri.dijit.Basemap;
        select(id: string): esri.dijit.Basemap;
        startup(): void;
    }
    export class BasemapLayer {
        constructor(params?: {
            bandIds?: number[];
            displayLevels?: number[];
            isReference?: boolean;
            opacity?: number;
            type?: string;
            url?: string;
            visibleLayers?: number[];
        });
    }
    export class BookmarkItem {
        name: string;
        extent: esri.geometry.Extent;
        constructor(name: string, extent: esri.geometry.Extent);
    }
    export class Bookmarks {
        bookmarks: esri.dijit.BookmarkItem;
        constructor(params: { bookmarks: esri.dijit.BookmarkItem[]; editable: boolean; map: esri.Map; }, srcNodeRef: any);
        addBookmark(bookmarkItem: esri.dijit.BookmarkItem): void;
        destroy(): void;
        hide(): void;
        removeBookmark(bookmarkName: string): void;
        show(): void;
        toJson(): any;
    }
    export class Directions {
        directions: esri.tasks.DirectionsFeatureSet;
        geocoderResults: { value: string; results: { extent: esri.geometry.Extent; feature: esri.Graphic; name: string; }[]; }[];
        maxStopsReached: boolean;
        mergedRouteGraphic: esri.Graphic;
        stops: esri.Graphic[];
        theme: string;
        constructor(params: {
            alphabet?: any;
            canModifyStops?: boolean;
            centerAtSegmentStart?: boolean;
            dragging?: boolean;
            focusOnNewStop?: boolean;
            fromSymbol?: esri.symbol.PictureMarkerSymbol;
            fromSymbolDrag?: esri.symbol.PictureMarkerSymbol;
            geocoderOptions?: any;
            locatorUrl?: string;
            map?: esri.Map;
            routeParams?: esri.tasks.RouteParameters;
            routeSymbol?: esri.symbol.SimpleLineSymbol;
            routeTaskUrl?: string;
            segmentInfoTemplate?: esri.InfoTemplate;
            segmentSymbol?: esri.symbol.SimpleLineSymbol;
            showPrintPage?: boolean;
            showReverseStopsButton?: boolean;
            showSegmentHighlight?: boolean;
            showSegmentPopup?: boolean;
            stopSymbol?: esri.symbol.PictureMarkerSymbol;
            stopSymbolDrag?: esri.symbol.PictureMarkerSymbol;
            stops?: any[];
            stopsInfoTemplate?: esri.InfoTemplate;
            textSymbolColor?: dojo.Color;
            textSymbolFont?: esri.symbol.Font;
            textSymbolOffset?: any;
            theme?: string;
            toSymbol?: esri.symbol.PictureMarkerSymbol;
            toSymbolDrag?: esri.symbol.PictureMarkerSymbol;
        }, srcNodeRef: string);
        addStop(stop: esri.geometry.Point, index: number): dojo.Deferred;
        addStop(stop: string, index: number): dojo.Deferred;
        addStops(stops: esri.geometry.Point[], index: number): dojo.Deferred;
        addStops(stops: string[], index: number): dojo.Deferred;
        centerAtSegmentStart(index: number): void;
        clearDirections(): void;
        destroy(): void;
        getDirections(): dojo.Deferred;
        highlightSegment(index: number): void;
        removeStop(index: number): dojo.Deferred;
        removeStops(): void;
        reset(): void;
        startup(): void;
        unhighlightSegment(): void;
        updateStop(stop: esri.geometry.Point, index: number): dojo.Deferred;
        updateStop(stop: string, index: number): dojo.Deferred;
        updateStops(stops: esri.geometry.Point[]): dojo.Deferred;
        updateStops(stops: string[]): dojo.Deferred;
        zoomToFullRoute(): void;
        zoomToSegment(index: number): void;
    }
    export class Gallery {
        constructor(params: { items?: any[]; showTitle?: boolean; thumbnailStyle?: string; }, srcNodeRef: string);
        destroy(): void;
        getFocusedItem(): any;
        getSelectedItem(): any;
        next(): void;
        previous(): void;
        select(item: any): void;
        setFocus(item: any): void;
        startup(): void;
    }
    export class Gauge {
        constructor(params: {
            caption?: string;
            color?: string;
            dataField?: string;
            dataFormat?: string;
            dataLabelField?: string;
            fromWebmap?: boolean;
            layer?: esri.layers.GraphicsLayer;
            maxDataValue?: number;
            noDataLabel?: string;
            numberFormat?: any;
            title?: string;
            unitLabel?: string;
        }, srcNodeRef: string);
        destroy(): void;
        get(): any;
        set(): any;
        startup(): void;
    }
    export class Geocoder {
        activeGeocoder: any;
        activeGeocoderIndex: number;
        autoComplete: boolean;
        autoNavigate: boolean;
        geocoder: any[];
        geocoderMenu: boolean;
        maxLocations: number;
        minCharacters: number;
        results: any[];
        searchDelay: number;
        showResults: boolean;
        theme: string;
        value: string;
        constructor(params: {
            arcgisGeocoder?: any;
            autoComplete?: boolean;
            autoNavigate?: boolean;
            geocoderMenu?: boolean;
            geocoders?: any[];
            map?: esri.Map;
            maxLocations?: number;
            minCharacters?: number;
            searchDelay?: number;
            showResults?: boolean;
            theme?: string;
            value?: string;
        }, srcNodeRef: any);
        blur(): void;
        clear(): void;
        destroy(): void;
        find(): dojo.Deferred;
        focus(): void;
        hide(): void;
        select(result: any): void;
        show(): void;
        startup(): void;
    }
    export class InfoWindow {
        anchor: string;
        coords: esri.geometry.Point;
        fixedAnchor: string;
        isShowing: boolean;
        constructor(params: any, srcNodeRef: string);
        constructor(params: any, srcNodeRef: Node);
        hide(): void;
        move(point: esri.geometry.Point): void;
        resize(width: number, height: number): void;
        setContent(content: any): esri.dijit.InfoWindow;
        setFixedAnchor(anchor: string): void;
        setTitle(title: string): esri.dijit.InfoWindow;
        show(point: esri.geometry.Point, placement?: string): void;
    }
    export class InfoWindowLite {
        anchor: string;
        coords: esri.geometry.Point;
        fixedAnchor: string;
        isShowing: boolean;
        constructor(params: any, srcNodeRef: string);
        constructor(params: any, srcNodeRef: Node);
        hide(): void;
        move(point: esri.geometry.Point): void;
        resize(width: number, height: number): void;
        setContent(content: any): void;
        setFixedAnchor(anchor: string): void;
        setTitle(title: string): esri.dijit.InfoWindowLite;
        show(point: esri.geometry.Point, placement?: string): void;
    }
    export class Legend {
        constructor(params: {
            arrangement?: number;
            autoUpdate?: boolean;
            layerInfos?: esri.layers.LayerInfo[];
            map?: esri.Map;
            respectCurrentMapScale?: boolean;
        }, srcNodeRef: string);
        destroy(): void;
        refresh(): void;
        startup(): void;
    }
    export class Measurement {
        constructor(params: {
            defaultAreaUnit?: string;
            defaultLengthUnit?: string;
            lineSymbol?: esri.symbol.SimpleLineSymbol;
            map?: esri.Map;
            pointSymbol?: esri.symbol.MarkerSymbol;
        }, srcNodeRef: string);
        clearResult(): void;
        destroy(): void;
        hide(): void;
        hideTool(toolName: string): void;
        setTool(toolName: string, activate: boolean): void;
        show(): void;
        showTool(toolName: string): void;
        startup(): void;
    }
    export class OverviewMap {
        constructor(params: {
            attachTo?: string;
            baseLayer?: esri.layers.Layer;
            color?: string;
            expandFactor?: number;
            height?: number;
            id?: string;
            map?: esri.Map;
            maximizeButton?: boolean;
            opacity?: number;
            visible?: boolean;
            width?: number;
        }, srcNodeRef: any);
        destroy(): void;
        hide(): void;
        show(): void;
        startup(): void;
    }
    export class Popup {
        count: number;
        deferreds: dojo.Deferred[];
        domNode: any;
        features: esri.Graphic[];
        isShowing: boolean;
        selectedIndex: number;
        constructor(options: {
            anchor?: string;
            fillSymbol?: esri.symbol.FillSymbol;
            highlight?: boolean;
            keepHighlightOnHide?: boolean;
            lineSymbol?: esri.symbol.LineSymbol;
            marginLeft?: number;
            marginTop?: number;
            markerSymbol?: esri.symbol.MarkerSymbol;
            offsetX?: number;
            offsetY?: number;
            pagingControls?: boolean;
            pagingInfo?: boolean;
            popupWindow?: boolean;
            titleInBody?: boolean;
            zoomFactor?: number;
        }, srcNodeRef?: string);
        clearFeatures(): void;
        destroy(): void;
        getSelectedFeature(): esri.Graphic;
        hide(): void;
        maximize(): void;
        reposition(): void;
        resize(width: number, height: number): void;
        restore(): void;
        select(index: number): void;
        setContent(content: any): void;
        setFeatures(features: any[]): any[];
        setTitle(title: any): void;
        show(location: esri.geometry.Point, options?: any): void;
    }
    export class PopupMobile {
        constructor(options: {
            fillSymbol?: esri.symbol.FillSymbol;
            highlight?: boolean;
            lineSymbol?: esri.symbol.LineSymbol;
            marginLeft?: number;
            marginTop?: number;
            markerSymbol?: esri.symbol.MarkerSymbol;
            offsetX?: number;
            offsetY?: number;
            zoomFactor?: number;
        }, srcNodeRef: string);
        clearFeatures(): void;
        destroy(): void;
        getSelectedFeature(): esri.Graphic;
        hide(): void;
        select(index: number): void;
        setContent(content: string): void;
        setContent(content: Function): void;
        setFeatures(features: esri.Graphic[]): any[];
        setFeatures(features: dojo.Deferred[]): any[];
        setTitle(title: string): void;
        setTitle(title: Function): void;
        show(location: esri.geometry.Point): void;
    }
    export class PopupTemplate {
        info: any;
        constructor(popupInfo: any, options?: { utcOffset?: number; });
    }
    export class Print {
        constructor(params: {
            async?: boolean;
            map?: esri.Map;
            templates?: esri.tasks.PrintTemplate[];
            url?: string;
        }, srcNodeRef: any);
        destroy(): void;
        hide(): void;
        show(): void;
        startup(): void;
    }
    export class Scalebar {
        constructor(params: {
            attachTo?: string;
            map?: esri.Map;
            scalebarStyle?: string;
            scalebarUnit?: string;
        }, srcNodeRef: string);
        destroy(): void;
        hide(): void;
        show(): void;
    }
    export class TimeSlider {
        loop: boolean;
        playing: boolean;
        thumbCount: number;
        thumbMovingRate: number;
        timeStops: esri.tasks.Date[];
        constructor(params: { excludeDataAtLeadingThumb?: boolean; excludeDataAtTrailingThumb?: boolean; }, srcNodeRef: any);
        createTimeStopsByCount(timeExtent: esri.TimeExtent, count?: number): void;
        createTimeStopsByTimeInterval(timeExtent: esri.TimeExtent, timeInterval?: number, timeIntervalUnits?: string): void;
        getCurrentTimeExtent(): esri.TimeExtent;
        next(): void;
        pause(): void;
        play(): void;
        previous(): void;
        setLabels(labels: string[]): void;
        setLoop(loop: boolean): void;
        setThumbCount(thumbCount: number): void;
        setThumbIndexes(indexes:Array): void;
        setThumbMovingRate(thumbMovingRate: number): void;
        setTickCount(count: number): void;
        setTimeStops(timeStops: esri.tasks.Date[]): void;
        singleThumbAsTimeInstant(createTimeInstants: boolean): void;
    }
}
declare module esri.dijit.editing {
    export class Add {
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
    export class AttachmentEditor {
        constructor(params: any, srcNodeRef: string);
        showAttachments(graphic: esri.Graphic, featureLayer: esri.layers.FeatureLayer): void;
        startup(): void;
    }
    export class Cut {
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
    export class Delete {
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
    export class Editor {
        constructor(params: { settings: any; }, srcNodeRef: any);
    }
    export class TemplatePicker {
        grid: dojox.grid.DataGrid;
        tooltip: HTMLElement;
        constructor(params: {
            columns?: number;
            emptyMessage?: string;
            featureLayers?: esri.layers.FeatureLayer[];
            grouping?: boolean;
            items?: any[];
            maxLabelLength?: number;
            rows?: number;
            showTooltip?: boolean;
            style?: string;
            useLegend?: boolean;
        }, srcNodeRef: any);
        attr(name: string, value?: any): void;
        clearSelection(): void;
        destroy(): void;
        getSelected(): any;
        startup(): void;
        update(): void;
    }
    export class Union {
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
    export class Update {
        constructor(params: any);
        performRedo(): void;
        performUndo(): void;
    }
}
declare module esri.geometry {
    export function fromJson(json: any): any;
    export function geodesicAreas(polygons: esri.geometry.Polygon[], areaUnit: string): number[];
    export function geodesicDensify(geometry: esri.geometry.Geometry, maxSegmentLength: number): esri.geometry.Geometry;
    export function geodesicLengths(polylines: esri.geometry.Polyline[], lengthUnit: string): number[];
    export function geographicToWebMercator(geometry: esri.geometry.Geometry): esri.geometry.Geometry;
    export function getExtentForScale(map: esri.Map, scale: number): esri.geometry.Extent;
    export function getJsonType(geometry: esri.geometry.Geometry): string;
    export function getLength(point1: esri.geometry.Point, point2: esri.geometry.Point): number;
    export function getLineIntersection(line1start: esri.geometry.Point, line1end: esri.geometry.Point, line2start: esri.geometry.Point, line2end: esri.geometry.Point): esri.geometry.Point;
    export function getScale(map: esri.Map): number;
    export function isClockwise(ring: esri.geometry.Polygon): boolean;
    export function lngLatToXY(long: number, lat: number, isLinear: boolean): number[];
    export function normalizeCentralMeridian(geometries: esri.geometry.Geometry[], geometryService: esri.tasks.GeometryService, callback: Function, errback: Function): dojo.Deferred;
    export function polygonSelfIntersecting(polygon: esri.geometry.Polygon): boolean;
    export function toMapGeometry(extent: esri.geometry.Extent, width: number, height: number, mapGeometry: esri.geometry.Geometry): esri.geometry.Geometry;
    export function toMapPoint(extent: esri.geometry.Extent, width: number, height: number, screenPoint: esri.geometry.ScreenPoint): esri.geometry.Point;
    export function toScreenGeometry(extent: esri.geometry.Extent, width: number, height: number, screenGeometry: esri.geometry.Geometry): esri.geometry.Geometry;
    export function toScreenPoint(extent: esri.geometry.Extent, width: number, height: number, mapPoint: esri.geometry.Point): esri.geometry.ScreenPoint;
    export function webMercatorToGeographic(geometry: esri.geometry.Geometry): esri.geometry.Geometry;
    export function xyToLngLat(long: number, lat: number): number[];
    export class Extent extends Geometry {
        xmax: number;
        xmin: number;
        ymax: number;
        ymin: number;
        spatialReference: esri.SpatialReference;
        type: string;
        constructor(xmin: number, ymin: number, xmax: number, ymax: number, spatialReference?: esri.SpatialReference);
        constructor(json: any);
        centerAt(point: esri.geometry.Point): esri.geometry.Extent;
        contains(geometry: esri.geometry.Geometry): boolean;
        expand(factor: number): esri.geometry.Extent;
        getCenter(): esri.geometry.Point;
        getHeight(): number;
        getWidth(): number;
        intersects(geometry: esri.geometry.Geometry): any;
        offset(dx: number, dy: number): esri.geometry.Extent;
        union(extent: esri.geometry.Extent): esri.geometry.Extent;
        update(xmin: number, ymin: number, xmax: number, ymax: number, spatialReference: esri.SpatialReference): esri.geometry.Extent;
    }
    export class Geometry {
        spatialReference: esri.SpatialReference;
        type: string;
        constructor();
        setSpatialReference(sr: esri.SpatialReference): esri.geometry.Geometry;
        toJson(): any;
    }
    export class Multipoint extends Geometry {
        points: number[][];
        constructor(spatialReference: esri.SpatialReference);
        constructor(json: any);
        addPoint(point: esri.geometry.Point): esri.geometry.Multipoint;
        addPoint(point: number[]): esri.geometry.Multipoint;
        addPoint(json: any): esri.geometry.Multipoint;
        getExtent(): esri.geometry.Extent;
        getPoint(index: number): esri.geometry.Point;
        removePoint(index: number): esri.geometry.Point;
        setPoint(index: number, point: esri.geometry.Point): esri.geometry.Multipoint;
    }
    export class Point extends Geometry {
        x: number;
        y: number;
        constructor(x: number, y: number, spatialReference: esri.SpatialReference);
        constructor(xyCoord:Array, spatialReference: esri.SpatialReference);
        constructor(json: any);
        constructor(long: number, lat: number);
        constructor(point: number[]);
        constructor(point: esri.geometry.Point);
        getLatitude(): number;
        getLongitude(): number;
        offset(dx: number, dy: number): esri.geometry.Point;
        setLatitude(lat: number): esri.geometry.Point;
        setLongitude(lon: number): esri.geometry.Point;
        setX(x: number): esri.geometry.Point;
        setY(y: number): esri.geometry.Point;
        update(x: number, y: number): esri.geometry.Point;
    }
    export class Polygon extends Geometry {
        rings: number[][][];
        constructor(spatialReference: esri.SpatialReference);
        constructor(json: any);
        addRing(nums: number[][]): esri.geometry.Polygon;
        addRing(points: esri.geometry.Point[]): esri.geometry.Polygon;
        addRing(json: any): esri.geometry.Polygon;
        contains(point: esri.geometry.Point): boolean;
        getExtent(): esri.geometry.Extent;
        getPoint(ringIndex: number, pointIndex: number): esri.geometry.Point;
        insertPoint(ringIndex: number, pointIndex: number, point: esri.geometry.Point): esri.geometry.Polygon;
        removePoint(ringIndex: number, pointIndex: number): esri.geometry.Point;
        removeRing(ringIndex: number): esri.geometry.Point[];
        setPoint(ringIndex: number, pointIndex: number, point: esri.geometry.Point): esri.geometry.Polygon;
    }
    export class Polyline extends Geometry {
        paths: number[][][];
        constructor(spatialReference: esri.SpatialReference);
        constructor(json: any);
        addPath(points: esri.geometry.Point): esri.geometry.Polyline;
        addPath(path: number[][]): esri.geometry.Polyline;
        addPath(pointJson: any): esri.geometry.Polyline;
        getExtent(): esri.geometry.Extent;
        getPoint(pathIndex: number, pointIndex: number): esri.geometry.Point;
        insertPoint(pathIndex: number, pointIndex: number, point: esri.geometry.Point): esri.geometry.Polyline;
        removePath(pathIndex: number): esri.geometry.Point[];
        removePoint(pathIndex: number, pointIndex: number): esri.geometry.Point;
        setPoint(pathIndex: number, pointIndex: number, point: esri.geometry.Point): esri.geometry.Polyline;
    }
    export class ScreenPoint {
        x: number;
        y: number;
        constructor();
    }
}
declare module esri.layers {
    export class ArcGISDynamicMapServiceLayer extends DynamicMapServiceLayer {
        attributionDataUrl: string;
        capabilities: string;
        copyright: string;
        description: string;
        disableClientCaching: boolean;
        dpi: number;
        dynamicLayerInfos: esri.layers.DynamicLayerInfo[];
        hasAttributionData: boolean;
        imageFormat: string;
        imageTransparency: boolean;
        layerDefinitions: string[];
        layerDrawingOptions: esri.layers.LayerDrawingOptions[];
        layerInfos: esri.layers.LayerInfo[];
        layerTimeOptions: esri.layers.LayerTimeOptions[];
        maxImageHeight: number;
        maxImageWidgth: number;
        maxRecordCount: number;
        maxScale: number;
        minScale: number;
        showAttribution: boolean;
        suspended: boolean;
        timeInfo: esri.layers.TimeInfo;
        units: string;
        useMapImage: boolean;
        version: number;
        visibleAtMapScale: boolean;
        visibleLayers: string[];
        constructor(url: string, options?: {
            gdbVersion?: string;
            id?: string;
            imageParameters?: esri.layers.ImageParameters;
            opacity?: number;
            showAttribution?: boolean;
            useMapImage?: boolean;
            useMapTime?: boolean;
            visible?: boolean;
        });
        createDynamicLayerInfosFromLayerInfos(): esri.layers.DynamicLayerInfo[];
        exportMapImage(imageParameters?: esri.layers.ImageParameters, callback?: Function): void;
        getAttributionData(): dojo.Deferred;
        isVisibleAtScale(scale: number): boolean;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; error: Error; }) => void): void;
        on(event: "gdb-version-change", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "map-image-export", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; mapImage: esri.layers.MapImage; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.ArcGISDynamicMapServiceLayer; visible: boolean; }) => void): void;
        resume(): void;
        setDPI(dpi: number, doNotRefresh?: boolean): void;
        setDefaultLayerDefinitions(doNotRefresh?: boolean): void;
        setDefaultVisibleLayers(doNotRefresh?: boolean): void;
        setDisableClientCaching(disable: boolean): void;
        setDynamicLayerInfos(dynamicLayerInfos: esri.layers.DynamicLayerInfo[], doNotRefresh?: boolean): void;
        setGDBVersion(gdbVersion: string, doNotRefresh?: boolean): void;
        setImageFormat(imageFormat: string, doNotRefresh?: boolean): void;
        setImageTransparency(transparent: boolean, doNotRefresh?: boolean): void;
        setLayerDefinitions(layerDefinitions: string[], doNotRefresh?: boolean): void;
        setLayerDrawingOptions(layerDrawingOptions: esri.layers.LayerDrawingOptions[], doNotRefresh?: boolean): void;
        setLayerTimeOptions(options: esri.layers.LayerTimeOptions[], doNotRefresh?: boolean): void;
        setMaxScale(scale: number): void;
        setMinScale(scale: number): void;
        setScaleRange(minScale: number, maxScale: number): void;
        setUseMapTime(update: boolean): void;
        setVisibleLayers(ids: string[], doNotRefresh?: boolean): void;
        suspend(): void;
    }
    export class ArcGISImageServiceLayer extends DynamicMapServiceLayer {
        bandCount: number;
        bandIds: number[];
        bands: any[];
        compressionQuality: number;
        copyrightText: string;
        defaultMosaicRule: esri.layers.MosaicRule;
        description: string;
        disableClientCaching: boolean;
        format: string;
        interpolation: string;
        maxImageHeight: number;
        maxImageWidgth: number;
        maxRecordCount: number;
        maxScale: number;
        minScale: number;
        mosaicRule: esri.layers.MosaicRule;
        pixelSizeX: number;
        pixelSizeY: number;
        pixelType: number;
        renderingRule: esri.layers.RasterFunction;
        timeInfo: esri.layers.TimeInfo;
        version: number;
        constructor(url: string, options?: {
            id?: string;
            imageServiceParameters?: esri.layers.ImageServiceParameters;
            opacity?: number;
            useMapTime?: boolean;
            visible?: boolean;
        });
        exportMapImage(imageServiceParameters?: esri.layers.ImageServiceParameters, callback?: Function): void;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; error: Error; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "map-image-export", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; mapImage: esri.layers.MapImage; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "rendering-change", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.ArcGISImageServiceLayer; visible: boolean; }) => void): void;
        getKeyProperties(): dojo.Deferred;
        setBandIds(bandIds: number[], doNotRefresh?: boolean): void;
        setCompressionQuality(quality: number, doNotRefresh?: boolean): void;
        setDisableClientCaching(disable: boolean): void;
        setImageFormat(imageFormat: string, doNotRefresh?: boolean): void;
        setInterpolation(interpolation: string, doNotRefresh?: boolean): void;
        setMosaicRule(mosaicRule: esri.layers.MosaicRule, doNotRefresh?: boolean): esri.layers.MosaicRule;
        setRenderingRule(renderingRule: esri.layers.RasterFunction, doNotRefresh?: boolean): esri.layers.RasterFunction;
        setUseMapTime(update: boolean): void;
    }
    export interface ArcGISTiledMapServiceLayerOptions {
        displayLevels?: number;
        id?: string;
        opacity?: number;
        showAttribution?: boolean;
        tileServers?: string[];
        visible?: boolean;
    }
    export class ArcGISTiledMapServiceLayer extends TiledMapServiceLayer {
        attributionDataUrl: string;
        capabilities: string;
        copyright: string;
        description: string;
        hasAttributionData: boolean;
        layerInfos: esri.layers.LayerInfo[];
        maxImageHeight: number;
        maxImageWidgth: number;
        maxRecordCount: number;
        maxScale: number;
        minScale: number;
        showAttribution: boolean;
        suspended: boolean;
        timeInfo: esri.layers.TimeInfo;
        units: string;
        version: number;
        visibleAtMapScale: boolean;
        constructor(url: string, options?: ArcGISTiledMapServiceLayerOptions);
        getAttributionData(): dojo.Deferred;
        isVisibleAtScale(scale: number): boolean;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; error: Error; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.ArcGISTiledMapServiceLayer; visible: boolean; }) => void): void;
        resume(): void;
        setMaxScale(scale: number): void;
        setMinScale(scale: number): void;
        setScaleRange(minScale: number, maxScale: number): void;
        suspend(): void;
    }
    export class CodedValueDomain extends Domain {
        codedValues: any[];
        constructor();
    }
    export class Domain {
        name: string;
        type: string;
        constructor();
        toJson(): any;
    }
    export class DynamicLayerInfo extends LayerInfo {
        defaultVisibility: boolean;
        id: number;
        maxScale: number;
        minScale: number;
        name: string;
        parentLayerId: number;
        source: any;
        subLayerIds: number[];
        constructor(json?: any);
        toJson(): any;
    }
    export class DynamicMapServiceLayer extends Layer {
        fullExtent: esri.geometry.Extent;
        initialExtent: esri.geometry.Extent;
        spatialReference: esri.SpatialReference;
        constructor();
        getImageUrl(extent: esri.geometry.Extent, width: number, height: number, callback: (url: string) => void): string;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.DynamicMapServiceLayer; error: Error; }) => void): void;
        on(event: "gdb-version-change", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.DynamicMapServiceLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "map-image-export", handler: (event: { target: esri.layers.DynamicMapServiceLayer; mapImage: esri.layers.MapImage; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.DynamicMapServiceLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.DynamicMapServiceLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.DynamicMapServiceLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.DynamicMapServiceLayer; visible: boolean; }) => void): void;
        refresh(): void;
    }
    export class FeatureEditResult {
        attachmentId: number;
        error: Error;
        objectId: number;
        success: boolean;
        constructor();
    }
    export interface FeatureLayerOptions {
        autoGeneralize?: boolean;
        maxAllowableOffset?: number;
        gdbVersion?: string;
        showAttribution?: boolean;
        tileHeight?: number;
        displayOnPan?: boolean;
        editSummaryCallback?: Function;
        source?: any;
        trackIdField?: string;
        id?: string;
        visible?: boolean;
        mode?: number;
        opacity?: number;
        tileWidth?: number;
        outFields?: string[];
        infoTemplate?: InfoTemplate;
        useMapTime?: boolean;
    }
    export class FeatureLayer extends GraphicsLayer {
        static MODE_ONDEMAND: number;
        static MODE_SELECTION: number;
        static MODE_SNAPSHOT: number;
        static POPUP_HTML_TEXT: string;
        static POPUP_NONE: string;
        static POPUP_URL: string;
        static SELECTION_ADD: number;
        static SELECTION_NEW: number;
        static SELECTION_SUBTRACT: number;
        allowGeometryUpdates: boolean;
        attributionDataUrl: string;
        capabilities: string;
        copyright: string;
        defaultDefinitionExpression: string;
        defaultVisibility: boolean;
        description: string;
        displayField: string;
        editFieldsInfo: any;
        fields: esri.layers.Field[];
        fullExtent: esri.geometry.Extent;
        geometryType: string;
        globalIdField: string;
        graphics: esri.Graphic[];
        hasAttachments: boolean;
        hasAttributionData: boolean;
        htmlPopupType: string;
        layerId: number;
        maxRecordCount: number;
        maxScale: number;
        minScale: number;
        name: string;
        objectIdField: string;
        ownershipBasedAccessControlForFeatures: any;
        relationships: Relationship[];
        renderer: esri.renderer.Renderer;
        showAttribution: boolean;
        source: any;
        supportsAdvancedQueries: boolean;
        supportsStatistics: boolean;
        suspended: boolean;
        templates: esri.layers.FeatureTemplate[];
        timeInfo: esri.layers.TimeInfo;
        type: string;
        typeIdField: string;
        types: esri.layers.FeatureType[];
        version: number;
        visibleAtMapScale: boolean;
        constructor(url: string, options?: FeatureLayerOptions);
        constructor(featureCollectionObject: any, options?: FeatureLayerOptions);
        addAttachment(objectId: number, formNode:HTMLFormElement, callback?: Function, errback?: Function): dojo.Deferred;
        applyEdits(adds?: esri.Graphic[], updates?: esri.Graphic[], deletes?: esri.Graphic[], callback?: Function, errback?: Function): dojo.Deferred;
        clearSelection(): esri.layers.FeatureLayer;
        deleteAttachments(objectId: number, attachmentIds: number[], callback?: Function, errback?: Function): dojo.Deferred;
        getAttributionData(): dojo.Deferred;
        getDefinitionExpression(): string;
        getEditCapabilities(options?: { feature?: esri.Graphic; userId?: string; }): { canCreate: boolean; canUpdate: boolean; canDelete: boolean; };
        getEditInfo(feature: esri.Graphic, options?: { action?: any; creation?: boolean; edit?: boolean; }): any;
        getEditSummary(feature: esri.Graphic, options?: { action?: any; creation?: boolean; edit?: boolean; callback: (feature: esri.Graphic, info: any) => any; }): string;
        getMaxAllowableOffset(): number;
        getSelectedFeatures(): esri.Graphic[];
        getSelectionSymbol(): esri.symbol.Symbol;
        getTimeDefinition(): esri.TimeExtent;
        isEditable(): boolean;
        isVisibleAtScale(scale: number): boolean;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "add-attachment-complete", handler: (event: { target: esri.layers.FeatureLayer; result: esri.layers.FeatureEditResult; }) => void): void;
        on(event: "before-apply-edits", handler: (event: { target: esri.layers.FeatureLayer; adds: esri.Graphic[]; updates: esri.Graphic[]; deletes: esri.Graphic[]; }) => void): void;
        on(event: "capabilities-change", handler: (event: { target: esri.layers.FeatureLayer; results: any[]; }) => void): void;
        on(event: "edits-complete", handler: (event: { target: esri.layers.FeatureLayer; adds: esri.Graphic[]; updates: esri.Graphic[]; deletes: esri.Graphic[]; }) => void): void;
        on(event: "query-attachment-infos-complete", handler: (event: { target: esri.layers.FeatureLayer; info: any[]; }) => void): void;
        on(event: "query-count-complete", handler: (event: { target: esri.layers.FeatureLayer; count: number; }) => void): void;
        on(event: "query-features-complete", handler: (event: { target: esri.layers.FeatureLayer; featureSet: esri.tasks.FeatureSet; }) => void): void;
        on(event: "query-ids-complete", handler: (event: { target: esri.layers.FeatureLayer; objectIds: number[]; }) => void): void;
        on(event: "query-limit-exceeded", handler: (event: { target: esri.layers.FeatureLayer; }) => void): void;
        on(event: "query-related-features-complete", handler: (event: { target: esri.layers.FeatureLayer; relatedFeatures: any; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.FeatureLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.FeatureLayer; }) => void): void;
        on(event: "selection-clear", handler: (event: { target: esri.layers.FeatureLayer; }) => void): void;
        on(event: "selection-complete", handler: (event: { target: esri.layers.FeatureLayer; method: number; features: esri.Graphic[]; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.FeatureLayer; error: Error; info: any; }) => void): void;
        queryAttachmentInfos(objectId: number, callback?: Function, errback?: Function): dojo.Deferred;
        queryCount(query: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        queryFeatures(query: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        queryIds(query: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        queryRelatedFeatures(relQuery: esri.tasks.RelationshipQuery, callback?: Function, errback?: Function): dojo.Deferred;
        redraw(): void;
        refresh(): void;
        resume(): void;
        selectFeatures(query: esri.tasks.Query, selectionMethod?: number, callback?: Function, errback?: Function): dojo.Deferred;
        setAutoGeneralize(enable: boolean): esri.layers.FeatureLayer;
        setDefinitionExpression(expression: string): esri.layers.FeatureLayer;
        setEditable(editable: boolean): esri.layers.FeatureLayer;
        setGDBVersion(versionName: string): esri.layers.FeatureLayer;
        setInfoTemplate(infoTemplate: esri.InfoTemplate): void;
        setMaxAllowableOffset(offset: number): void;
        setMaxScale(scale: number): void;
        setMinScale(scale: number): void;
        setOpacity(opacity: number): void;
        setRenderer(renderer: esri.renderer.Renderer): void;
        setScaleRange(minScale: number, maxScale: number): void;
        setSelectionSymbol(symbol: esri.symbol.Symbol): esri.layers.FeatureLayer;
        setTimeDefinition(definition: esri.TimeExtent): esri.layers.FeatureLayer;
        setTimeOffset(offsetValue: number, offsetUnits: string): esri.layers.FeatureLayer;
        setUseMapTime(update: boolean): void;
        suspend(): void;
        toJson(): any;
    }
    // This interface is not in the published API
    export interface Relationship {
        id: number;
        name: string;
        relatedTableId: number;
    }
    export class FeatureTemplate {
        description: string;
        drawingTool: string;
        name: string;
        prototype: esri.Graphic;
        constructor();
        toJson(): any;
    }
    export class FeatureType {
        domains: { [fieldName: string]: string; };
        id: number;
        name: string;
        templates: esri.layers.FeatureTemplate[];
        constructor();
        toJson(): any;
    }
    export class Field {
        alias: string;
        domain: esri.layers.Domain;
        editable: boolean;
        length: number;
        name: string;
        nullable: boolean;
        type: string;
        constructor();
    }
    export class GeoRSSLayer {
        copyright: string;
        defaultVisibility: boolean;
        description: string;
        items: esri.Graphic[];
        name: string;
        constructor(url: string, options?: any);
        getFeatureLayers(): esri.layers.FeatureLayer[];
    }
    export class GraphicsLayer extends Layer {
        graphics: esri.Graphic[];
        renderer: esri.renderer.Renderer;
        constructor();
        constructor(options?: any);
        add(graphic: esri.Graphic): esri.Graphic;
        clear(): void;
        disableMouseEvents(): void;
        enableMouseEvents(): void;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "click", handler: (event: MouseEvent) => void): void;
        on(event: "dbl-click", handler: (event: MouseEvent) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.GraphicsLayer; error: Error; }) => void): void;
        on(event: "graphic-add", handler: (event: { target: esri.layers.GraphicsLayer; graphic: esri.Graphic; }) => void): void;
        on(event: "graphic-remove", handler: (event: { target: esri.layers.GraphicsLayer; graphic: esri.Graphic; }) => void): void;
        on(event: "graphics-clear", handler: (event: { target: esri.layers.GraphicsLayer; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.GraphicsLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "mouse-down", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-drag", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-move", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-out", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-over", handler: (event: MouseEvent) => void): void;
        on(event: "mouse-up", handler: (event: MouseEvent) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.GraphicsLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: () => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.GraphicsLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.GraphicsLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.GraphicsLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.GraphicsLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.GraphicsLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.GraphicsLayer; visible: boolean; }) => void): void;
        redraw(): void;
        remove(graphic: esri.Graphic): esri.Graphic;
        setInfoTemplate(infoTemplate: esri.InfoTemplate): void;
        setRenderer(renderer: esri.renderer.Renderer): void;
    }
    export class ImageParameters {
        bbox: esri.geometry.Extent;
        dpi: number;
        format: string;
        height: number;
        imageSpatialReference: esri.SpatialReference;
        layerDefinitions: string[];
        layerIds: number[];
        layerOption: string;
        layerTimeOptions: esri.layers.LayerTimeOptions[];
        timeExtent: esri.TimeExtent;
        transparent: boolean;
        width: number;
        constructor();
    }
    export class ImageServiceParameters {
        bandIds: number[];
        compressionQuality: number;
        extent: esri.geometry.Extent;
        format: string;
        height: number;
        interpolation: string;
        mosaicRule: esri.layers.MosaicRule;
        noData: number;
        renderingRule: esri.layers.RasterFunction;
        timeExtent: esri.TimeExtent;
        width: number;
        constructor();
    }
    export class JoinDataSource {
        joinType: string;
        leftTableKey: string;
        leftTableSource: any;
        rightTableKey: string;
        rightTableSource: any;
        constructor(json?: any);
        toJson(): any;
    }
    export class KMLFolder {
        description: string;
        featureInfos: { type: string; id: string; }[];
        id: number;
        name: string;
        parentFolderId: number;
        snippet: string;
        subFolderIds: number[];
        visibility: number;
        constructor();
    }
    export class KMLGroundOverlay {
        Snippet: string;
        description: string;
        extent: esri.geometry.Extent;
        height: number;
        href: string;
        id: number;
        name: string;
        scale: number;
        visibility: number;
        width: number;
        constructor();
    }
    export class KMLLayer extends Layer {
        featureInfos: { type: string; id: string; }[];
        folders: esri.layers.KMLFolder[];
        linkInfo: {
            description: string;
            httpQuery: string;
            id: string;
            name: string;
            refreshMode: any;
            refreshInterval: number;
            snippet: any;
            viewBoundScale: number;
            viewFormat: any;
            viewRefreshMode: any;
            viewRefreshTime: number;
            visibility: boolean;
        };
        constructor(id: string, url: string, options?: { outSR: esri.SpatialReference; });
        getFeature(featureInfo: any): any;
        getLayers(): esri.layers.Layer[];
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.KMLLayer; error: Error; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.KMLLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.KMLLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.KMLLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.KMLLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.KMLLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.KMLLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.KMLLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.KMLLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.KMLLayer; visible: boolean; }) => void): void;
        setFolderVisibility(folder: esri.layers.KMLFolder, trueOrFalse: boolean): void;
    }
    export class LOD {
        level: number;
        levelValue: string;
        resolution: number;
        scale: number;
        constructor();
    }
    export class Layer {
        attributionDataUrl: string;
        credential: esri.Credential;
        hasAttributionData: boolean;
        id: string;
        loaded: boolean;
        maxScale: number;
        minScale: number;
        opacity: number;
        showAttribution: boolean;
        suspended: boolean;
        url: string;
        visible: boolean;
        visibleAtMapScale: boolean;
        constructor(options?: { showAttribution?: boolean; });
        getAttributionData(): dojo.Deferred;
        hide(): void;
        isVisibleAtScale(scale: number): boolean;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.Layer; error: Error; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.Layer; layer: esri.layers.Layer; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.Layer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.Layer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.Layer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.Layer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.Layer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.Layer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.Layer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.Layer; visible: boolean; }) => void): void;
        resume(): void;
        setMaxScale(scale: number): void;
        setMinScale(scale: number): void;
        setOpacity(opacity: number): void;
        setScaleRange(minScale: number, maxScale: number): void;
        setVisibility(isVisible: boolean): void;
        show(): void;
        suspend(): void;
        toJson(): any;
    }
    export class LayerDataSource {
        dataSource: any;
        constructor(json?: any);
        toJson(): any;
    }
    export class LayerDrawingOptions {
        renderer: esri.renderer.Renderer;
        scaleSymbols: boolean;
        showLabels: boolean;
        transparency: number;
        constructor(json?: any);
        toJson(): any;
    }
    export class LayerInfo {
        defaultVisibility: boolean;
        id: number;
        maxScale: number;
        minScale: number;
        name: string;
        parentLayerId: number;
        subLayerIds: number[];
        constructor();
    }
    export class LayerMapSource {
        gdbVersion: string;
        mapLayerId: number;
        constructor(json?: any);
        toJson(): any;
    }
    export class LayerTimeOptions {
        timeDataCumulative: boolean;
        timeOffset: number;
        timeOffsetUnits: string;
        useTime: boolean;
        constructor();
    }
    export class MapImage {
        extent: esri.geometry.Extent;
        height: number;
        href: string;
        scale: number;
        width: number;
        constructor(options: { extent: esri.geometry.Extent; href: string; });
    }
    export class MapImageLayer extends Layer {
        constructor(options?: any);
        addImage(mapImage: esri.layers.MapImage): void;
        getImages(): esri.layers.MapImage[];
        removeAllImages(): void;
        removeImage(mapImage: esri.layers.MapImage): void;
    }
    export class MosaicRule {
        ascending: boolean;
        lockRasterIds: number[];
        method: string;
        objectIds: number[];
        operation: string;
        sortField: string;
        sortValue: string;
        viewpoint: esri.geometry.Point;
        where: string;
        constructor();
        toJson(): any;
    }
    export class OpenStreetMapLayer extends TiledMapServiceLayer {
        copyright: string;
        constructor(options?: any);
    }
    export class QueryDataSource {
        geometryType: string;
        oidFields: string[];
        query: string;
        spatialReference: esri.SpatialReference;
        workspaceId: string;
        constructor(json?: any);
        toJson(): any;
    }
    export class RangeDomain extends Domain {
        maxValue: number;
        minValue: number;
        constructor();
    }
    export class RasterDataSource {
        dataSourceName: string;
        workspaceId: string;
        constructor(json?: any);
        toJson(): any;
    }
    export class RasterFunction {
        arguments: any;
        functionName: string;
        variableName: string;
        constructor();
        toJson(): any;
    }
    export class TableDataSource {
        dataSourceName: string;
        gdbVersion: string;
        workspaceId: string;
        constructor(json?: any);
        toJson(): any;
    }
    export class TileInfo {
        dpi: number;
        format: string;
        height: number;
        lods: esri.layers.LOD[];
        origin: esri.geometry.Point;
        spatialReference: esri.SpatialReference;
        width: number;
        constructor(properties: any);
        toJson(): any;
    }
    export class TiledMapServiceLayer extends Layer {
        fullExtent: esri.geometry.Extent;
        initialExtent: esri.geometry.Extent;
        spatialReference: esri.SpatialReference;
        tileInfo: esri.layers.TileInfo;
        constructor();
        getTileUrl(level: number, row: number, column: number): string;
        on(event: string, handler: (event: { target: any; }) => void): void;
        on(event: "error", handler: (event: { target: esri.layers.TiledMapServiceLayer; error: Error; }) => void): void;
        on(event: "load", handler: (event: { target: esri.layers.TiledMapServiceLayer; layer: esri.layers.Layer; }) => void): void;
        on(event: "opacity-change", handler: (event: { target: esri.layers.TiledMapServiceLayer; opacity: number; }) => void): void;
        on(event: "resume", handler: (event: { target: esri.layers.TiledMapServiceLayer; }) => void): void;
        on(event: "scale-range-change", handler: (event: { target: esri.layers.TiledMapServiceLayer; }) => void): void;
        on(event: "scale-visibility-change", handler: (event: { target: esri.layers.TiledMapServiceLayer; }) => void): void;
        on(event: "suspend", handler: (event: { target: esri.layers.TiledMapServiceLayer; }) => void): void;
        on(event: "update-end", handler: (event: { target: esri.layers.TiledMapServiceLayer; error: Error; }) => void): void;
        on(event: "update-start", handler: (event: { target: esri.layers.TiledMapServiceLayer; }) => void): void;
        on(event: "visibility-change", handler: (event: { target: esri.layers.TiledMapServiceLayer; visible: boolean; }) => void): void;
        refresh(): void;
    }
    export class TimeInfo {
        endTimeField: string;
        exportOptions: esri.layers.LayerTimeOptions;
        startTimeField: string;
        timeExtent: esri.TimeExtent;
        timeInterval: number;
        timeIntervalUnits: string;
        timeReference: esri.layers.TimeReference;
        trackIdField: string;
        constructor();
    }
    export class TimeReference {
        respectsDaylightSaving: boolean;
        timeZone: string;
        constructor();
    }
    export interface WMSLayerOptions {
        format?: string;
        resourceInfo?: any;
        transparent?: boolean;
        visibleLayers?: string[];
    }
    export class WMSLayer extends DynamicMapServiceLayer {
        copyright: string;
        description: string;
        extent: esri.geometry.Extent;
        getMapUrl: string;
        imageFormat: string;
        layerInfos: esri.layers.WMSLayerInfo[];
        maxHeight: number;
        maxWidth: number;
        spatialReference: esri.SpatialReference;
        title: string;
        version: string;
        constructor(url: string, options?: WMSLayerOptions);
        setImageFormat(format: string): void;
        setImageTransparency(transparency: boolean): void;
        setVisibleLayers(layers: string[]): void;
    }
    export class WMSLayerInfo {
        description: string;
        extent: esri.geometry.Extent;
        name: string;
        title: string;
        constructor(layer: { name?: string; title: string; description?: string; extent?: esri.geometry.Extent; });
    }
    export class WMTSLayer extends TiledMapServiceLayer {
        copyright: string;
        description: string;
        format: string;
        fullExtent: esri.geometry.Extent;
        initialExtent: esri.geometry.Extent;
        layerInfos: any[];
        serviceMode: string;
        spatialReference: esri.SpatialReference;
        title: string;
        version: string;
        constructor(url: string, options?: { layerInfo: esri.layers.WMTSLayerInfo; resourceInfo: any; serviceMode: string; });
        setActiveLayer(WMTSLayerInfo: esri.layers.WMTSLayerInfo): void;
    }
    export class WMTSLayerInfo {
        description: string;
        format: string;
        fullExtent: esri.geometry.Extent;
        identifier: string;
        initialExtent: esri.geometry.Extent;
        style: string;
        tileInfo: esri.layers.TileInfo;
        tileMatrixSet: string;
        title: string;
        constructor(options: any);
    }
    export class WebTiledLayer extends TiledMapServiceLayer {
        copyright: string;
        fullExtent: esri.geometry.Extent;
        initialExtent: esri.geometry.Extent;
        spatialReference: esri.SpatialReference;
        tileInfo: esri.layers.TileInfo;
        tileServers: string[];
        constructor(urlTemplate: string, options: {
            copyright?: string;
            fullExtent?: esri.geometry.Extent;
            initialExtent?: esri.geometry.Extent;
            subDomains?: string[];
            tileInfo?: esri.layers.TileInfo;
            tileServers?: string[];
        });
    }
}
declare module esri.renderer {
    export function fromJson(json: any): any;
    export class ClassBreaksRenderer extends Renderer {
        attributeField: string;
        breaks: any[];
        classificationMethod: string;
        infos: any[];
        normalizationField: string;
        normalizationTotal: number;
        normalizationType: string;
        constructor(defaultSymbol: esri.symbol.Symbol, attributeField: string);
        constructor(json: any);
        addBreak(info: { minValue: number; maxValue: number; symbol: esri.symbol.Symbol; label: string; description: string; }): void;
        addBreak(minValue: number, maxValue: number, symbol: esri.symbol.Symbol): void;
        clearBreaks(): void;
        removeBreak(minValue: number, maxValue: number): void;
        setMaxInclusive(enable: boolean): void;
    }
    export class Renderer {
        defaultSymbol: esri.symbol.Symbol;
        constructor();
        getSymbol(graphic: esri.Graphic): esri.symbol.Symbol;
        toJson(): any;
    }
    export class SimpleRenderer extends Renderer {
        description: string;
        label: string;
        symbol: esri.symbol.Symbol;
        constructor(defaultSymbol: esri.symbol.Symbol);
        constructor(json: any);
    }
    export class SymbolAger {
        getAgedSymbol(symbol: esri.symbol.Symbol, graphic: esri.Graphic): esri.symbol.Symbol;
    }
    export class TemporalRenderer extends Renderer {
        constructor(observationRenderer: esri.renderer.Renderer, latestObservationRenderer?: esri.renderer.Renderer, trackRenderer?: esri.renderer.Renderer, observationAger?: esri.renderer.SymbolAger);
        getSymbol(graphic: esri.Graphic): esri.symbol.Symbol;
    }
    export class TimeClassBreaksAger extends SymbolAger {
        static UNIT_DAYS: string;
        static UNIT_HOURS: string;
        static UNIT_MILLISECONDS: string;
        static UNIT_MINUTES: string;
        static UNIT_MONTHS: string;
        static UNIT_SECONDS: string;
        static UNIT_WEEKS: string;
        static UNIT_YEARS: string;
        constructor(infos: { minAge: number; maxAge: number; color?: dojo.Color; size?: number; alpha?: number; }[]);
        getAgedSymbol(symbol: esri.symbol.Symbol, graphic: esri.Graphic): esri.symbol.Symbol;
    }
    export class TimeRampAger extends SymbolAger {
        constructor(colorRange?: dojo.Color, sizeRange?: number[], alphaRange?: number[]);
        getAgedSymbol(symbol: esri.symbol.Symbol, graphic: esri.Graphic): esri.symbol.Symbol;
    }
    export class UniqueValueRenderer extends Renderer {
        attributeField: string;
        attributeField2: string;
        attributeField3: string;
        defaultLabel: string;
        fieldDelimiter: string;
        infos: any[];
        values: string[];
        constructor(defaultSymbol?: esri.symbol.Symbol, attributeField?: string, attributeField2?: string, attributeField3?: string, fieldDelimeter?: string);
        constructor(json: any);
        addValue(value: string, symbol: esri.symbol.Symbol): void;
        addValue(info: { value: string; symbol: esri.symbol.Symbol; label: string; description: string; }): void;
        removeValue(value: string): void;
    }
}
declare module esri.symbol {
    export function fromJson(): esri.symbol.Symbol;
    export function getShapeDescriptors(): any;
    export class CartographicLineSymbol extends SimpleLineSymbol {
        static CAP_BUTT: string;
        static CAP_ROUND: string;
        static CAP_SQUARE: string;
        static JOIN_BEVEL: string;
        static JOIN_MITER: string;
        static JOIN_ROUND: string;
        cap: string;
        join: string;
        miterLimit: string;
        constructor(style?: string, color?: dojo.Color, width?: number, cap?: string, join?: string, miterLimit?: string);
        constructor();
        constructor(json?: any);
        setCap(cap: string): esri.symbol.CartographicLineSymbol;
        setJoin(join: string): esri.symbol.CartographicLineSymbol;
        setMiterLimit(miterLimit: string): esri.symbol.CartographicLineSymbol;
    }
    export class FillSymbol extends Symbol {
        outline: esri.symbol.SimpleLineSymbol;
        constructor();
        setOutline(outline: esri.symbol.SimpleLineSymbol): esri.symbol.FillSymbol;
    }
    export class Font {
        family: string;
        size: string;
        style: string;
        variant: string;
        weight: string;
        constructor(size: number, style: string, variant: string, weight: string, family: string);
        constructor(json: any);
        constructor();
        setFamily(): esri.symbol.Font;
        setSize(): esri.symbol.Font;
        setStyle(): esri.symbol.Font;
        setVariant(): esri.symbol.Font;
        setWeight(): esri.symbol.Font;
    }
    export class LineSymbol extends Symbol {
        width: number;
        constructor();
        setWidth(width: number): esri.symbol.LineSymbol;
    }
    export class MarkerSymbol extends Symbol {
        angle: number;
        size: number;
        xoffset: number;
        yoffset: number;
        constructor();
        setAngle(angle: number): esri.symbol.MarkerSymbol;
        setOffset(x: number, y: number): esri.symbol.MarkerSymbol;
        setSize(size: number): esri.symbol.MarkerSymbol;
    }
    export class PictureFillSymbol extends FillSymbol {
        height: number;
        url: string;
        width: number;
        xoffset: number;
        xscale: number;
        yoffset: number;
        yscale: number;
        constructor(url: string, outline: esri.symbol.SimpleLineSymbol, width: number, height: number);
        constructor(json: any);
        setHeight(height: number): esri.symbol.PictureFillSymbol;
        setOffset(x: number, y: number): esri.symbol.PictureFillSymbol;
        setUrl(url: string): esri.symbol.PictureFillSymbol;
        setWidth(width: number): esri.symbol.PictureFillSymbol;
        setXScale(scale: number): esri.symbol.PictureFillSymbol;
        setYScale(scale: number): esri.symbol.PictureFillSymbol;
    }
    export class PictureMarkerSymbol extends MarkerSymbol {
        height: number;
        url: string;
        width: number;
        constructor(url: string, width: number, height: number);
        constructor(json: any);
        setHeight(height: number): esri.symbol.PictureMarkerSymbol;
        setUrl(url: string): esri.symbol.PictureMarkerSymbol;
        setWidth(width: number): esri.symbol.PictureMarkerSymbol;
    }
    export class SimpleFillSymbol extends FillSymbol {
        static STYLE_BACKWARD_DIAGONAL: string;
        static STYLE_CROSS: string;
        static STYLE_DIAGONAL_CROSS: string;
        static STYLE_FORWARD_DIAGONAL: string;
        static STYLE_HORIZONTAL: string;
        static STYLE_NULL: string;
        static STYLE_SOLID: string;
        static STYLE_VERTICAL: string;
        style: string;
        constructor(style: string, outline: esri.symbol.SimpleLineSymbol, color: dojo.Color);
        constructor();
        constructor(json: any);
        setStyle(style: string): esri.symbol.SimpleFillSymbol;
    }
    export class SimpleLineSymbol extends LineSymbol {
        static STYLE_DASH: string;
        static STYLE_DASHDOT: string;
        static STYLE_DASHDOTDOT: string;
        static STYLE_DOT: string;
        static STYLE_NULL: string;
        static STYLE_SOLID: string;
        style: string;
        constructor(style: string, color: dojo.Color, width: number);
        constructor();
        constructor(json: any);
        setStyle(style: string): esri.symbol.SimpleLineSymbol;
    }
    export class SimpleMarkerSymbol extends MarkerSymbol {
        static STYLE_CIRCLE: string;
        static STYLE_CROSS: string;
        static STYLE_DIAMOND: string;
        static STYLE_SQUARE: string;
        static STYLE_X: string;
        outline: esri.symbol.SimpleLineSymbol;
        style: string;
        constructor(style: string, size: number, outline: esri.symbol.SimpleLineSymbol, color: dojo.Color);
        constructor();
        constructor(json: any);
        setOutline(outline: esri.symbol.SimpleLineSymbol): esri.symbol.SimpleMarkerSymbol;
        setPath(): esri.symbol.SimpleMarkerSymbol;
        setStyle(style: string): esri.symbol.SimpleMarkerSymbol;
    }
    export class Symbol {
        color: dojo.Color;
        type: string;
        constructor();
        setColor(color: dojo.Color): esri.symbol.Symbol;
        toJson(): any;
    }
    export class TextSymbol extends Symbol {
        static ALIGN_END: string;
        static ALIGN_MIDDLE: string;
        static ALIGN_START: string;
        static DECORATION_LINETHROUGH: string;
        static DECORATION_NONE: string;
        static DECORATION_OVERLINE: string;
        static DECORATION_UNDERLINE: string;
        align: string;
        angle: number;
        decoration: string;
        font: esri.symbol.Font;
        kerning: boolean;
        rotated: boolean;
        text: string;
        xoffset: number;
        yoffset: number;
        constructor(text: string, font: esri.symbol.Font, color: dojo.Color);
        constructor(json: any);
        constructor(text: string);
        setAlign(align: string): esri.symbol.TextSymbol;
        setAngle(angle: number): esri.symbol.TextSymbol;
        setDecoration(decoration: string): esri.symbol.TextSymbol;
        setFont(font: esri.symbol.Font): esri.symbol.TextSymbol;
        setKerning(kerning: boolean): esri.symbol.TextSymbol;
        setOffset(x: number, y: number): esri.symbol.TextSymbol;
        setRotated(rotated: boolean): esri.symbol.TextSymbol;
        setText(text: string): esri.symbol.TextSymbol;
    }
}
declare module esri.tasks {
    export class AddressCandidate {
        address: any;
        attributes: any;
        location: esri.geometry.Point;
        score: number;
        constructor();
    }
    export class AlgorithmicColorRamp {
        algorithim: string;
        fromColor: dojo.Color;
        toColor: dojo.Color;
        constructor();
        toJson(): any;
    }
    export class AreasAndLengthsParameters {
        areaUnit: number;
        calculationType: string;
        lengthUnit: number;
        polygons: esri.geometry.Geometry[];
        constructor();
    }
    export class BufferParameters {
        bufferSpatialReference: esri.SpatialReference;
        distances: number[];
        geodesic: boolean;
        geometries: esri.geometry.Geometry[];
        outSpatialReference: esri.SpatialReference;
        unionResults: boolean;
        unit: string;
        constructor();
    }
    export class ClassBreaksDefinition {
        baseSymbol: esri.symbol.Symbol;
        breakCount: number;
        classificationField: string;
        classificationMethod: string;
        colorRamp: any;
        normalizationField: string;
        normalizationType: string;
        standardDeviationInterval: number;
        constructor();
        toJson(): any;
    }
    export class ClassificationDefinition {
        baseSymbol: esri.symbol.Symbol;
        colorRamp: any;
        type: string;
        constructor();
    }
    export class ClosestFacilityParameters {
        accumulateAttributes: string[];
        attributeParameterValues: any[];
        defaultCutoff: number;
        defaultTargetFacilityCount: number;
        directionsLanguage: string;
        directionsLengthUnits: string;
        directionsOutputType: string;
        directionsStyleName: string;
        directionsTimeAttribute: string;
        doNotLocateOnRestrictedElements: boolean;
        facilities: any;
        impedenceAttribute: string;
        incidents: any;
        outSpatialReference: esri.SpatialReference;
        outputGeometryPrecision: number;
        outputGeometryPrecisionUnits: string;
        outputLines: string;
        pointBarriers: any;
        polygonBarriers: any;
        polylineBarriers: any;
        restrictUTurns: string;
        restrictionAttributes: string[];
        returnDirections: boolean;
        returnFacilities: boolean;
        returnIncidents: boolean;
        returnPointBarriers: boolean;
        returnPolygonBarriers: boolean;
        returnPolylineBarriers: boolean;
        returnRoutes: boolean;
        timeOfDay: esri.tasks.Date;
        timeOfDayUsage: string;
        travelDirection: string;
        useHierarchy: boolean;
        constructor();
    }
    export class ClosestFacilitySolveResult {
        directions: esri.tasks.DirectionsFeatureSet;
        facilities: esri.geometry.Point[];
        incidents: esri.geometry.Point[];
        messages: esri.tasks.NAMessage;
        pointBarriers: esri.geometry.Point[];
        polygonBarriers: esri.geometry.Polygon[];
        polylineBarriers: esri.geometry.Polyline[];
        routes: esri.Graphic[];
        constructor();
    }
    export class ClosestFacilityTask {
        constructor();
        on(event: string, handler: () => void): void;
        on(event: "solve-complete", handler: (event: { target: esri.tasks.ClosestFacilityTask; result: esri.tasks.ClosestFacilitySolveResult; }) => void): void;
        solve(params: esri.tasks.ClosestFacilityParameters, callback?: Function, errback?: Function): dojo.Deferred;
    }
    export class DataFile {
        itemID: string;
        url: string;
        constructor();
    }
    export class DataLayer {
        geometry: esri.geometry.Geometry;
        name: string;
        spatialRelationship: string;
        where: string;
        constructor();
    }
    export class Date {
        date: esri.tasks.Date;
        format: string;
        constructor();
    }
    export class DirectionsFeatureSet {
        extent: esri.geometry.Extent;
        mergedGeometry: esri.geometry.Polyline;
        routeId: string;
        routeName: string;
        strings: any[];
        totalDriveTime: number;
        totalLength: number;
        totalTime: number;
        constructor();
    }
    export class DistanceParameters {
        distanceUnit: esri.tasks.GeometryService;
        geodesic: boolean;
        geometry1: esri.geometry.Geometry;
        geometry2: esri.geometry.Geometry;
        constructor();
    }
    export class FeatureSet {
        displayFieldName: string;
        exceededTransferLimit: number;
        features: esri.Graphic[];
        fieldAliases: any;
        geometryType: string;
        spatialReference: esri.SpatialReference;
        constructor();
        constructor(json: any);
    }
    export class FindParameters {
        contains: boolean;
        dynamicLayerInfos: esri.layers.DynamicLayerInfo[];
        layerDefinitions: string[];
        layerIds: number[];
        maxAllowableOffset: number;
        outSpatialReference: esri.SpatialReference;
        returnGeometry: boolean;
        searchFields: string[];
        searchText: string;
        constructor();
    }
    export class FindResult {
        displayFieldName: string;
        feature: esri.Graphic;
        foundFieldName: string;
        layerId: number;
        layerName: string;
        constructor();
    }
    export class FindTask {
        url: string;
        constructor(url: string, options?: any);
        execute(findParameters: esri.tasks.FindParameters, callback?: Function, errback?: Function): dojo.Deferred;
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.FindTask; results: esri.tasks.FindResult[]; }) => void): void;
    }
    export class GPMessage {
        description: string;
        type: number;
        constructor();
    }
    export class GeneralizeParameters {
        deviationUnit: esri.tasks.GeometryService;
        geometries: esri.geometry.Geometry[];
        maxDeviation: number;
        constructor();
    }
    export class GenerateRendererParameters {
        classificationDefinition: esri.tasks.ClassificationDefinition;
        where: string;
        constructor();
    }
    export class GenerateRendererTask {
        constructor(url: string, options?: any);
        execute(generateRendererParameters: esri.tasks.GenerateRendererParameters, callback?: Function, errback?: Function): dojo.Deferred;
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.GenerateRendererTask; renderer: esri.renderer.Renderer; }) => void): void;
    }
    export class GeometryService {
        static UNIT_FOOT: number;
        static UNIT_KILOMETER: number;
        static UNIT_METER: number;
        static UNIT_NAUTICAL_MILE: number;
        static UNIT_STATUTE_MILE: number;
        static UNIT_US_NAUTICAL_MILE: number;
        static UNIT_SQUARE_INCHES: number;
        static UNIT_SQUARE_FEET: number;
        static UNIT_SQUARE_YARDS: number;
        static UNIT_ACRES: number;
        static UNIT_SQUARE_MILES: number;
        static UNIT_SQUARE_MILLIMETERS: number;
        static UNIT_SQUARE_CENTIMETERS: number;
        static UNIT_SQUARE_DECIMETERS: number;
        static UNIT_SQUARE_METERS: number;
        static UNIT_ARES: number;
        static UNIT_HECTARES: number;
        static UNIT_SQUARE_KILOMETERS: number;
        url: string;
        constructor(url: string);
        areasAndLengths(areasAndLengthsParameters: esri.tasks.AreasAndLengthsParameters, callback?: Function, errback?: Function): dojo.Deferred;
        autoComplete(polygons: esri.geometry.Polygon[], polylines: esri.geometry.Polyline[], callback?: Function, errback?: Function): dojo.Deferred;
        buffer(bufferParameters: esri.tasks.BufferParameters, callback?: Function, errback?: Function): dojo.Deferred;
        convexHull(geometries: esri.geometry.Geometry[], callback?: Function, errback?: Function): dojo.Deferred;
        cut(geometries: esri.geometry.Geometry[], cutterGeometry: esri.geometry.Geometry, callback?: Function, errback?: Function): dojo.Deferred;
        difference(geometries: esri.geometry.Geometry[], geometry: esri.geometry.Geometry, callback?: Function, errback?: Function): dojo.Deferred;
        distance(params: esri.tasks.DistanceParameters, callback?: Function, errback?: Function): dojo.Deferred;
        generalize(params: esri.tasks.GeneralizeParameters, callback?: Function, errback?: Function): dojo.Deferred;
        intersect(geometries: esri.geometry.Geometry[], geometry: esri.geometry.Geometry, callback?: Function, errback?: Function): dojo.Deferred;
        labelPoints(polygons: esri.geometry.Geometry[], callback?: Function, errback?: Function): dojo.Deferred;
        lengths(lengthsParameter: esri.tasks.LengthsParameters, callback?: Function, errback?: Function): dojo.Deferred;
        offset(params: esri.tasks.OffsetParameters, callback?: Function, errback?: Function): dojo.Deferred;
        project(params: esri.tasks.ProjectParameters, callback?: Function, errback?: Function): dojo.Deferred;
        relation(relationParameters: esri.tasks.RelationParameters, callback?: Function, errback?: Function): dojo.Deferred;
        reshape(targetGeometry: esri.geometry.Geometry, reshaperGeometry: esri.geometry.Geometry, callback?: Function, errback?: Function): dojo.Deferred;
        simplify(geometries: esri.geometry.Geometry[], callback?: Function, errback?: Function): dojo.Deferred;
        trimExtend(params: esri.tasks.TrimExtendParameters, callback?: Function, errback?: Function): dojo.Deferred;
        union(geometries: esri.geometry.Geometry[], callback?: Function, errback?: Function): dojo.Deferred;
    }
    export class Geoprocessor {
        outSpatialReference: esri.SpatialReference;
        outputSpatialReference: esri.SpatialReference;
        processSpatialReference: esri.SpatialReference;
        updateDelay: number;
        url: string;
        constructor(url: string);
        cancelJob(jobId: string, callback: Function, errback: Function): dojo.Deferred;
        cancelJobStatusUpdates(jobId: string): void;
        checkJobStatus(jobId: string, callback?: Function, errback?: Function): void;
        execute(inputParameters: any, callback?: Function, errback?: Function): dojo.Deferred;
        getResultData(jobId: string, parameterName: string, callback?: Function, errback?: Function): dojo.Deferred;
        getResultImage(jobId: string, parameterName: string, imageParameters: esri.layers.ImageParameters, callback?: Function, errback?: Function): dojo.Deferred;
        getResultImageLayer(jobId: string, parameterName: string, imageParameters: esri.layers.ImageParameters, callback?: Function, errback?: Function): void;
        setOutSpatialReference(spatialReference: esri.SpatialReference): void;
        setOutputSpatialReference(spatialReference: esri.SpatialReference): void;
        setProcessSpatialReference(spatialReference: esri.SpatialReference): void;
        setUpdateDelay(delay: number): void;
        submitJob(inputParameters: any, callback?: Function, statusCallback?: Function, errback?: Function): void;
    }
    export class IdentifyParameters {
        dpi: number;
        dynamicLayerInfos: esri.layers.DynamicLayerInfo[];
        geometry: esri.geometry.Geometry;
        height: number;
        layerDefinitions: string[];
        layerIds: number[];
        layerOption: string;
        layerTimeOptions: esri.layers.LayerTimeOptions[];
        mapExtent: esri.geometry.Extent;
        maxAllowableOffset: number;
        returnGeometry: boolean;
        spatialReference: esri.SpatialReference;
        timeExtent: esri.TimeExtent;
        tolerance: number;
        width: number;
        constructor();
    }
    export class IdentifyResult {
        displayFieldName: string;
        feature: esri.Graphic;
        layerId: number;
        layerName: string;
        constructor();
    }
    export class IdentifyTask {
        url: string;
        constructor(url: string, options?: any);
        execute(identifyParameters: esri.tasks.IdentifyParameters, callback?: Function, errback?: Function): dojo.Deferred;
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.IdentifyTask; results: esri.tasks.IdentifyResult[]; }) => void): void;
    }
    export class ImageServiceIdentifyParameters {
        geometry: esri.geometry.Geometry;
        mosaicRule: esri.layers.MosaicRule;
        pixelSize: esri.symbol.Symbol;
        pixelSizeX: number;
        pixelSizeY: number;
        returnGeometry: boolean;
        timeExtent: esri.TimeExtent;
        constructor();
    }
    export class ImageServiceIdentifyResult {
        catalogItemVisibilities: number[];
        catalogItems: esri.tasks.FeatureSet;
        location: esri.geometry.Point;
        name: string;
        objectId: number;
        properties: any;
        value: string;
        constructor();
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.ImageServiceIdentifyTask; result: esri.tasks.ImageServiceIdentifyResult; }) => void): void;
    }
    export class ImageServiceIdentifyTask {
        constructor(url: string);
        execute(params: esri.tasks.ImageServiceIdentifyParameters, callback?: Function, errback?: Function): dojo.Deferred;
    }
    export class JobInfo {
        static STATUS_CANCELLED: string;
        static STATUS_CANCELLING: string;
        static STATUS_DELETED: string;
        static STATUS_DELETING: string;
        static STATUS_EXECUTING: string;
        static STATUS_FAILED: string;
        static STATUS_NEW: string;
        static STATUS_SUBMITTED: string;
        static STATUS_SUCCEEDED: string;
        static STATUS_TIMED_OUT: string;
        static STATUS_WAITING: string;
        jobId: string;
        jobStatus: string;
        messages: esri.tasks.GPMessage[];
        constructor();
    }
    export class LegendLayer {
        layerId: string;
        subLayerIds: string[];
        constructor();
    }
    export class LengthsParameters {
        calculationType: string;
        geodesic: boolean;
        lengthUnit: esri.tasks.GeometryService;
        polylines: esri.geometry.Geometry[];
        constructor();
    }
    export class LinearUnit {
        distance: number;
        units: string;
        constructor();
    }
    export class Locator {
        outSpatialReference: esri.SpatialReference;
        url: string;
        constructor(url: string);
        addressToLocations(params: any, callback?: Function, errback?: Function): dojo.Deferred;
        addressesToLocations(params: any, callback: Function, errback: Function): dojo.Deferred;
        locationToAddress(location: esri.geometry.Point, distance: number, callback?: Function, errback?: Function): dojo.Deferred;
        setOutSpatialReference(spatialReference: esri.SpatialReference): void;
    }
    export class MultipartColorRamp {
        colorRamps: esri.tasks.AlgorithmicColorRamp[];
        constructor();
        toJson(): any;
    }
    export class NAMessage {
        description: string;
        type: number;
        constructor();
    }
    export class OffsetParameters {
        bevelRatio: number;
        geometries: esri.geometry.Geometry[];
        offsetDistance: number;
        offsetHow: string;
        offsetUnit: string;
        constructor();
    }
    export class ParameterValue {
        dataType: string;
        paramName: string;
        value: any;
        constructor();
    }
    export class PrintParameters {
        extraParameters: any;
        map: esri.Map;
        outSpatialReference: esri.SpatialReference;
        template: esri.tasks.PrintTemplate;
        constructor();
    }
    export class PrintTask {
        url: string;
        constructor(url: string, params: any);
        execute(printParameters?: esri.tasks.PrintParameters, callback?: Function, errback?: Function): dojo.Deferred;
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.PrintTask; url: string; }) => void): void;
    }
    export class PrintTemplate {
        exportOptions: any;
        format: string;
        label: string;
        layout: string;
        layoutOptions: any;
        preserveScale: boolean;
        showAttribution: boolean;
        constructor();
    }
    export class ProjectParameters {
        geometries: esri.geometry.Geometry[];
        outSR: esri.SpatialReference;
        transformation: any;
        transformationForward: boolean;
        constructor();
    }
    export class Query {
        static SPATIAL_REL_CONTAINS: string;
        static SPATIAL_REL_CROSSES: string;
        static SPATIAL_REL_ENVELOPEINTERSECTS: string;
        static SPATIAL_REL_INDEXINTERSECTS: string;
        static SPATIAL_REL_INTERSECTS: string;
        static SPATIAL_REL_OVERLAPS: string;
        static SPATIAL_REL_RELATION: string;
        static SPATIAL_REL_TOUCHES: string;
        static SPATIAL_REL_WITHIN: string;
        geometry: esri.geometry.Geometry;
        geometryPrecision: number;
        groupByFieldsForStatistics: string[];
        maxAllowableOffset: number;
        objectIds: number[];
        orderByFields: string[];
        outFields: string[];
        outSpatialReference: esri.SpatialReference;
        outStatistics: esri.tasks.StatisticDefinition[];
        pixelSize: esri.symbol.Symbol;
        relationParam: string;
        returnGeometry: boolean;
        spatialRelationship: string;
        text: string;
        timeExtent: esri.TimeExtent;
        where: string;
        constructor();
    }
    export class QueryTask {
        url: string;
        constructor(url: string, options?: any);
        execute(parameters: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        executeForCount(query: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        executeForIds(parameters: esri.tasks.Query, callback?: Function, errback?: Function): dojo.Deferred;
        executeRelationshipQuery(parameters: esri.tasks.RelationshipQuery, callback?: Function, errback?: Function): dojo.Deferred;
        on(event: string, handler: () => void): void;
        on(event: "complete", handler: (event: { target: esri.tasks.QueryTask; featureSet: esri.tasks.FeatureSet; }) => void): void;
        on(event: "execute-for-count-complete", handler: (event: { target: esri.tasks.QueryTask; count: number; }) => void): void;
        on(event: "execute-for-ids-complete", handler: (event: { target: esri.tasks.QueryTask; objectIds: number[]; }) => void): void;
        on(event: "execute-relationship-query-complete", handler: (event: { target: esri.tasks.QueryTask; featureSets: esri.tasks.FeatureSet[]; }) => void): void;
    }
    export class RasterData {
        format: string;
        itemID: string;
        url: string;
        constructor();
    }
    export class RelationParameters {
        geometries1: esri.geometry.Geometry[];
        geometries2: esri.geometry.Geometry[];
        relation: esri.tasks.RelationParameters;
        relationParam: string;
        constructor();
    }
    export class RelationshipQuery {
        definitionExpression: string;
        geometryPrecision: number;
        maxAllowableOffset: number;
        objectIds: number[];
        outFields: string[];
        outSpatialReference: esri.SpatialReference;
        relationshipId: number;
        returnGeometry: boolean;
        constructor();
    }
    export class RouteParameters {
        accumulateAttributes: string[];
        attributeParameterValues: any[];
        barriers: any;
        directionsLanguage: string;
        directionsLengthUnits: string;
        directionsOutputType: string;
        directionsStyleName: string;
        directionsTimeAttribute: string;
        doNotLocateOnRestrictedElements: boolean;
        findBestSequence: boolean;
        ignoreInvalidLocations: boolean;
        impedanceAttribute: string;
        outSpatialReference: esri.SpatialReference;
        outputGeometryPrecision: number;
        outputGeometryPrecisionUnits: string;
        outputLines: string;
        polygonBarriers: any;
        polylineBarriers: any;
        preserveFirstStop: boolean;
        preserveLastStop: boolean;
        restrictUTurns: string;
        restrictionAttributes: string[];
        returnBarriers: boolean;
        returnDirections: boolean;
        returnPolygonBarriers: boolean;
        returnPolylineBarriers: boolean;
        returnRoutes: boolean;
        returnStops: boolean;
        startTime: esri.tasks.Date;
        stops: any;
        useHierarchy: boolean;
        useTimeWindows: boolean;
        constructor();
    }
    export class RouteResult {
        directions: esri.tasks.DirectionsFeatureSet;
        route: esri.Graphic;
        routeName: string;
        stops: esri.Graphic[];
        constructor();
    }
    export class RouteTask {
        url: string;
        constructor(url: string);
        on(event: string, handler: () => void): void;
        on(event: "error", handler: (event: { target: esri.tasks.RouteTask; error: Error; }) => void): void;
        on(event: "solve-complete", handler: (event: { target: esri.tasks.RouteTask; result: esri.tasks.RouteResult; }) => void): void;
        solve(params: esri.tasks.RouteParameters, callback?: Function, errback?: Function): dojo.Deferred;
    }
    export class ServiceAreaParameters {
        accumulateAttributes: string[];
        attributeParameterValues: any[];
        defaultBreaks: number[];
        doNotLocateOnRestrictedElements: boolean;
        excludeSourcesFromPolygons: string[];
        facilities: any;
        impedanceAttribute: string;
        mergeSimilarPolygonRanges: boolean;
        outSpatialReference: esri.SpatialReference;
        outputGeometryPrecision: number;
        outputGeometryPrecisionUnits: string;
        outputLines: string;
        outputPolygons: string;
        overlapLines: boolean;
        overlapPolygons: boolean;
        pointBarriers: any;
        polygonBarriers: any;
        polylineBarriers: any;
        restrictUTurns: string;
        restrictionAttributes: string[];
        returnFacilities: boolean;
        returnPointBarriers: boolean;
        returnPolygonBarriers: boolean;
        returnPolylineBarriers: boolean;
        splitLinesAtBreaks: boolean;
        splitPolygonsAtBreaks: boolean;
        timeOfDay: esri.tasks.Date;
        travelDirection: string;
        trimOuterPolygon: boolean;
        trimPolygonDistance: number;
        trimPolygonDistanceUnits: string;
        useHierarchy: boolean;
        constructor();
    }
    export class ServiceAreaSolveResult {
        facilities: esri.geometry.Point[];
        messages: esri.tasks.NAMessage;
        pointBarriers: esri.geometry.Point[];
        polygonBarriers: esri.geometry.Polygon[];
        polylineBarriers: esri.geometry.Polyline[];
        serviceAreaPolygons: esri.Graphic[];
        serviceAreaPolylines: esri.Graphic[];
        constructor();
    }
    export class ServiceAreaTask {
        constructor();
        on(event: string, handler: () => void): void;
        on(event: "solve-complete", handler: (event: { target: esri.tasks.ServiceAreaTask; result: esri.tasks.ServiceAreaTask; }) => void): void;
        solve(params: esri.tasks.ServiceAreaParameters, callback?: Function, errback?: Function): dojo.Deferred;
    }
    export class StatisticDefinition {
        onStatisticField: string;
        outStatisticFieldName: string;
        statisticType: string;
        constructor();
    }
    export class TrimExtendParameters {
        extendHow: string;
        polylines: esri.geometry.Polyline[];
        trimExtendTo: esri.geometry.Polyline;
        constructor();
    }
    export class UniqueValueDefinition {
        attributeField: string;
        attributeField2: string;
        attributeField3: string;
        baseSymbol: esri.symbol.Symbol;
        colorRamp: any;
        constructor();
        toJson(): any;
    }
}
declare module esri.toolbars {
    export class Draw {
        static ARROW: string;
        static CIRCLE: string;
        static DOWN_ARROW: string;
        static ELLIPSE: string;
        static EXTENT: string;
        static FREEHAND_POLYGON: string;
        static FREEHAND_POLYLINE: string;
        static LEFT_ARROW: string;
        static LINE: string;
        static MULTI_POINT: string;
        static POINT: string;
        static POLYGON: string;
        static POLYLINE: string;
        static RECTANGLE: string;
        static RIGHT_ARROW: string;
        static TRIANGLE: string;
        static UP_ARROW: string;
        fillSymbol: esri.symbol.SimpleFillSymbol;
        lineSymbol: esri.symbol.SimpleLineSymbol;
        markerSymbol: esri.symbol.SimpleMarkerSymbol;
        respectDrawingVertexOrder: boolean;
        constructor(map: esri.Map, options?: any);
        activate(drawType: string, options?: any): void;
        deactivate(): void;
        finishDrawing(): void;
        setFillSymbol(fillSymbol: esri.symbol.FillSymbol): void;
        setLineSymbol(lineSymbol: esri.symbol.LineSymbol): void;
        setMarkerSymbol(markerSymbol: esri.symbol.MarkerSymbol): void;
        setRespectDrawingVertexOrder(set: boolean): void;
    }
    export class Edit {
        static EDIT_VERTICES: number;
        static MOVE: number;
        static SCALE: number;
        static ROTATE: number;
        constructor(map: esri.Map, options?: any);
        activate(tool: number, graphic: esri.Graphic, options?: {
            allowAddVertices?: boolean;
            allowDeleteVertices?: boolean;
            ghostVertexSymbol?: esri.symbol.MarkerSymbol;
            ghostLineSymbol?: esri.symbol.LineSymbol;
            vertexSymbol?: esri.symbol.MarkerSymbol;
            uniformScaling?: boolean;
        }): void;
        deactivate(): void;
        getCurrentState(): any;
        refresh(): void;
    }
    export class Navigation {
        constructor(map: esri.Map);
        activate(navType: string): void;
        deactivate(): void;
        isFirstExtent(): boolean;
        isLastExtent(): boolean;
        setZoomSymbol(symbol: esri.symbol.Symbol): void;
        zoomToFullExtent(): void;
        zoomToNextExtent(): void;
        zoomToPrevExtent(): void;
    }
}
declare module esri.virtualearth {
    export class VEAddress {
        addressLine: string;
        adminDistrict: string;
        countryRegion: string;
        district: string;
        formattedAddress: string;
        locality: string;
        postalCode: string;
        postalTown: string;
        constructor();
    }
    export class VEGeocodeResult {
        address: esri.virtualearth.VEAddress;
        bestView: esri.geometry.Extent;
        calculationMethod: string;
        confidence: string;
        displayName: string;
        entityType: string;
        location: esri.geometry.Point;
        matchCodes: string;
        constructor();
    }
    export class VEGeocoder {
        culture: string;
        constructor(options: {
            bingMapsKey?: string; culture?: string;
        });
        addressToLocations(query: string, callback?: Function, errback?: Function): dojo.Deferred;
        setCulture(culture: string): void;
    }
    export class VETiledLayer extends esri.layers.TiledMapServiceLayer {
        copyright: string;
        culture: string;
        mapStyle: string;
        constructor(options: any);
        setCulture(culture: string): void;
        setMapStyle(style: string): void;
    }
}
