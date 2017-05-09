/// <reference path="../../../_Definitions/bridge.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
declare module geocortex.essentialsHtmlViewer.integration {
    interface ThirdPartyMapBase {
        /** Initialize your map and add event listeners in this method */
        initializeMap: () => void;
        /**
         * Return an object in this format:
         * return {
         *    center: {
         *        x: number, // e.g. longitude
         *        y: number, // e.g. latitude
         *    },
         *    scale: number, // Scale
         *    heading: number, // Heading, in degrees. Assumes North is up
         *    pitch: pov.pitch // Pitch angle
         * };
         */
        getMapViewpointParams: () => mapping.infrastructure.integration.ComponentViewpointMessage;
        /**
         * This method receives an instance of 'MapViewpointMessage' which can be used
         * to update your map provider with the given viewer's position.
         */
        handleViewerPositionUpdatedEvent: (arg: mapping.infrastructure.integration.MapViewpointMessage) => void;
        /**
         * Update your map provider with the given viewpoint indicator position.
         * This method receives an esri Point in the format:
         *     { x: longitude, y: latitude }
         */
        handleViewpointIndicatorUpdatedEvent: (arg: esri.geometry.Point) => void;
    }
    interface ActionButton {
        /** The ID of the button */
        id: string;
        /** The action to perform when the button is clicked */
        clickHandler: () => void;
        /** Whether or not to show this action button in the panel */
        show: boolean;
        /** The HTML Element of the button */
        elem: HTMLElement;
    }
    class ThirdPartyMap implements ThirdPartyMapBase {
        initializeMap: () => void;
        getMapViewpointParams: () => mapping.infrastructure.integration.ComponentViewpointMessage;
        handleViewerPositionUpdatedEvent: (arg: mapping.infrastructure.integration.MapViewpointMessage) => void;
        handleViewpointIndicatorUpdatedEvent: (arg: esri.geometry.Point) => void;
        bridge: integration.RemotePostMessageComponent;
        allowedOrigins: string[];
        id: string;
        sync: boolean;
        isDocked: boolean;
        debounceTimer: number;
        debounceInterval: number;
        ignoreNextPositionChange: boolean;
        statusOverlayElement: HTMLElement;
        actionButtons: ActionButton[];
        private _isInitialized;
        constructor(id: string, initializeMap: () => void, getMapViewpointParams: () => mapping.infrastructure.integration.ComponentViewpointMessage, handleViewerPositionUpdatedEvent: (arg: mapping.infrastructure.integration.MapViewpointMessage) => void, handleViewpointIndicatorUpdatedEvent: (arg: esri.geometry.Point) => void, sync?: boolean);
        /**
         * Initializes this map's container.
         */
        initializePane(): void;
        /**
         * Initializes the "bridge" mechanism that allows communication with the viewer.
         */
        initializeViewerBridge(): void;
        /**
         * Disconnects the bridge when the window unloads
         */
        disconnect(): void;
        /**
         * Triggers a viewpoint updated message after being debounced.
         */
        debouncedBroadcast(): void;
        /**
         * Called whenever the viewpoint changes. Third-party map components should call this when their location is altered.
         */
        handleViewpointChanged(): void;
        /**
         * Called when the "center" button is clicked/tapped.
         */
        handleClickCenter(): void;
        /**
         * Called when the "sync" button is clicked/tapped.
         */
        handleClickSync(): void;
        /**
         * Called when the "dock" button is clicked/tapped.
         */
        handleClickDock(): void;
        /**
         * Called when the "close" button clicked/tapped.
         */
        handleClickClose(): void;
        /**
         * Updates the visibility of the status overlay
         */
        showStatusOverlay(showStatus: boolean): void;
        /**
         * Hides an action button from the action button panel
         */
        hideActionButton(button: ActionButton): void;
        /**
         * Update the sync value for the 3rd party map and updates the button if available.
         */
        updateSync(syncValue: boolean): void;
        /**
         * The scale values to use when converting between a zoom level
         * Based on http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#designing_overlay_gm_mve.htm
         */
        scales: number[];
        zoomLevelToScale(zoom: number): number;
        scaleToZoomLevel(scale: number): number;
        getActionButtonById(id: string): ActionButton;
        /**
         * Checks whether undocking is supported for the current browser.
         */
        supportsUndocking(): boolean;
    }
}
