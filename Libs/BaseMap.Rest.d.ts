// Type definitions for the base maps rest endpoint
// {siteUri }/map/basemaps

/** @docs-hide-from-nav */
interface RestBaseMap {
    id: string;
    displayName: string;
    iconUri?: string;
    exportTilesMapServiceUri?: string;
    mapServices: RestBaseMapService[];
    properties?: RestProperty[];
    extensions?: RestExtension[];
}

/** @docs-hide-from-nav */
interface RestBaseMapService {
    id: string;
}
