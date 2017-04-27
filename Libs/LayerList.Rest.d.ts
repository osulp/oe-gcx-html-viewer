/// <reference path='LayerTheme.Rest.d.ts' />

// Type definitions for the configurable layer list rest endpoint
// {siteUri}/map/layerlist

/** @docs-hide-from-nav */
interface RestLayerListItem {
    id: string;
    type: string;
    layerID?: string;
    name?: string;
    layerName?: string;
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

/** @docs-hide-from-nav */
interface RestLayerList {
    items: RestLayerListItem[];
    userAddedLayersDestinationId: string;
    properties?: RestProperty[];
    extensions?: RestExtension[];
}