// Type definitions for the base maps rest endpoint
// {siteUri }/map/basemaps

interface RestBaseMap {
    id: string;
    displayName: string;
    iconUri?: string;
    mapServices: RestBaseMapService[];
    properties?: RestProperty[];
    extensions?: RestExtension[];
}

interface RestBaseMapService {
    id: string;
}