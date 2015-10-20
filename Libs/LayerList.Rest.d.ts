///<reference path='LayerTheme.Rest.d.ts' />

// Type definitions for the configurable layer list rest endpoint
// {siteUri }/map/layerlist

interface RestLayerListItem {
    id: string;
    type: string;
    layerID?: string;
    name?: string;
    isVisible?: boolean;
    isVisibleInLayerList?: boolean;
    isExpanded?: boolean;
    items?: RestLayerListItem[];
    canToggleVisibility?: boolean;
    mapServiceID?: string;
    themeSettings?: RestlayerThemeSetting[];
    layerVisibilityType?: string;
    iconUri?: string;
}

interface RestLayerList {
    items: RestLayerListItem[];
    properties?: RestProperty[];
    extensions?: RestExtension[];
}