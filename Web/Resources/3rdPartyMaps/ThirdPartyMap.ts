/// <reference path="../../../_Definitions/bridge.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />

module geocortex.essentialsHtmlViewer.integration {

    export interface ThirdPartyMapBase {
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

        /**
         * Update your map provider with the given custom viewpoint indicator position.
         * This method receives an esri Geometry.
         */
        handleCustomViewpointIndicatorUpdatedEvent?: (arg: {
            id: string;
            geometry: esri.geometry.Geometry;
        }) => void;
    }

    export interface ActionButton {
        /** The ID of the button */
        id: string;

        /** The action to perform when the button is clicked */
        clickHandler: () => void;

        /** Whether or not to show this action button in the panel */
        show: boolean;

        /** The HTML Element of the button */
        elem: HTMLElement;
    }

    export class ThirdPartyMap implements ThirdPartyMapBase {

        bridge: integration.RemotePostMessageComponent;
        allowedOrigins: string[] = [];

        id: string;
        sync: boolean;
        isDocked: boolean = true;

        debounceTimer: number = null;
        debounceInterval: number = 500;
        ignoreNextPositionChange: boolean = false;

        statusOverlayElement: HTMLElement;
        actionButtons: ActionButton[];

        private _isInitialized: boolean;
        private _shouldAddViewpointIndicator: boolean;

        constructor(id: string,
            public initializeMap: () => void,
            public getMapViewpointParams: () => mapping.infrastructure.integration.ComponentViewpointMessage,
            public handleViewerPositionUpdatedEvent: (arg: mapping.infrastructure.integration.MapViewpointMessage) => void,
            public handleViewpointIndicatorUpdatedEvent: (arg: esri.geometry.Point) => void,
            sync: boolean = false,
            addViewpointIndicator = true,
            public handleCustomViewpointIndicatorUpdatedEvent?: (arg: {
                id: string;
                geometry: esri.geometry.Geometry;
            }) => void) {

            this.bridge = new integration.RemotePostMessageComponent();
            this.id = id;
            this.sync = sync;
            this._shouldAddViewpointIndicator = addViewpointIndicator;

            this.actionButtons = [
                { id: "centerButton", clickHandler: () => { this.handleClickCenter(); }, show: true, elem: null },
                { id: "syncButton", clickHandler: () => { this.handleClickSync(); }, show: false, elem: null },
                { id: "dockButton", clickHandler: () => { this.handleClickDock(); }, show: true, elem: null },
                { id: "closeButton", clickHandler: () => { this.handleClickClose(); }, show: true, elem: null }
            ];

            // Check the window has already finished loading (GVH-7329)
            if (document.readyState === "complete") {
                this.initializePane();
            } else {
                window.onload = () => {
                    this.initializePane();
                };
            }

            window.onunload = () => {
                this.disconnect();
            };
        }

        /**
         * Initializes this map's container.
         */
        initializePane(): void {
            // If it's already initialized, bail out (GVH-7329)
            if (this._isInitialized) {
                return;
            }

            // Set the initialization to true so we don't initialize more than once
            this._isInitialized = true;

            this.initializeMap();
            this.initializeViewerBridge();

            this.statusOverlayElement = document.getElementById("status");

            // Setup buttons
            this.actionButtons.forEach(button => {
                button.elem = document.getElementById(button.id);
                if (button.elem && button.show) {
                    button.elem.addEventListener("click", () => {
                        button.clickHandler();
                    });
                } else {
                    this.hideActionButton(button);
                }
            });

            var dockButton = this.getActionButtonById("dockButton");
            // If we have an opener, we are in an undocked window
            if (window.opener) {
                this.isDocked = false;

                if (dockButton.elem) {
                    dockButton.elem.className = "window-dock";
                    dockButton.elem.title = "Dock in map viewer";
                }
            }

            // Hide the docking button if it is not supported (Tablet or IE9)
            if (!this.supportsUndocking() && dockButton.elem) {
                this.hideActionButton(dockButton);
            }
        }

        /**
         * Initializes the "bridge" mechanism that allows communication with the viewer.
         */
        initializeViewerBridge(): void {
            this.bridge.getTransport().allowOrigin(window.location.protocol + "//" + window.location.host);
            this.allowedOrigins.forEach(origin => {
                this.bridge.getTransport().allowOrigin(origin);
            });

            this.bridge.on("ExternalComponentInitializedEvent", (arg: mapping.infrastructure.integration.ComponentInitializationMessage) => {
                if (arg.hasPreviousState) {
                    this.updateSync(arg.sync);

                    // We only recieve viewpoint if the 3rd party map was previously unsynced
                    if (arg.viewpoint) {
                        this.handleViewerPositionUpdatedEvent(arg.viewpoint);
                    }
                } else if (this.sync !== arg.sync) {
                    this.bridge.publish("ToggleExternalComponentSyncById", this.id);
                }
            });

            this.bridge.on("ViewerPositionUpdatedEvent", (arg: mapping.infrastructure.integration.MapViewpointMessage) => {
                if (arg.updaterName === this.bridge.getComponentId()) {
                    return;
                }

                this.ignoreNextPositionChange = true;
                this.handleViewerPositionUpdatedEvent(arg);
            });

            this.bridge.on("ViewpointIndicatorUpdatedEvent", (arg: esri.geometry.Point) => {
                this.ignoreNextPositionChange = true;
                this.handleViewpointIndicatorUpdatedEvent(arg);
            });

            this.bridge.on("ComponentCustomViewpointIndicatorUpdatedEvent", args => {
                if (this.handleCustomViewpointIndicatorUpdatedEvent) {
                    this.handleCustomViewpointIndicatorUpdatedEvent(args);
                }
            });

            this.bridge.connect({ id: this.id, addViewpointIndicator: this._shouldAddViewpointIndicator });
        }

        /**
         * Disconnects the bridge when the window unloads
         */
        disconnect(): void {
            var currentState = {
                id: this.id,
                sync: this.sync,
                viewpoint: this.getMapViewpointParams()
            };

            this.bridge.disconnect(currentState);
        }

        /**
         * Triggers a viewpoint updated message after being debounced.
         */
        debouncedBroadcast(): void {
            this.debounceTimer = null;
            this.bridge.publish("ComponentViewpointUpdatedEvent", this.getMapViewpointParams());
        }

        /**
         * Called whenever the viewpoint changes. Third-party map components should call this when their location is altered.
         */
        handleViewpointChanged(): void {
            if (this.ignoreNextPositionChange) {
                this.ignoreNextPositionChange = false;
                return;
            }

            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }

            this.debounceTimer = setTimeout(() => {
                this.debouncedBroadcast();
            }, this.debounceInterval);
        }

        /**
         * Called when the "center" button is clicked/tapped.
         */
        handleClickCenter(): void {
            this.bridge.publish("BroadcastCurrentViewpoint", this.id);
        }

        /**
         * Called when the "sync" button is clicked/tapped.
         */
        handleClickSync(): void {
            this.updateSync(!this.sync);
            this.bridge.publish("ToggleExternalComponentSyncById", this.id);
        }

        /**
         * Called when the "dock" button is clicked/tapped.
         */
        handleClickDock(): void {
            if (this.isDocked) {
                this.bridge.publish("DisplayUndockedExternalComponentById", this.id);
            } else {
                this.bridge.publish("DisplayDockedExternalComponentById", this.id);
            }
        }

        /**
         * Called when the "close" button clicked/tapped.
         */
        handleClickClose(): void {
            this.bridge.publish("RemoveExternalComponentById", this.id);

            // TODO: Unsubscribe from all?
        }

        /**
         * Updates the visibility of the status overlay
         */
        showStatusOverlay(showStatus: boolean): void {
            if (this.statusOverlayElement) {
                this.statusOverlayElement.style.display = showStatus ? "block" : "none";
            }
        }

        /**
         * Hides an action button from the action button panel
         */
        hideActionButton(button: ActionButton): void {
            if (button.elem) {
                button.elem.parentElement.style.display = "none";
            }
        }

        /**
         * Update the sync value for the 3rd party map and updates the button if available.
         */
        updateSync(syncValue: boolean): void {
            this.sync = syncValue;

            var syncButton = this.getActionButtonById("syncButton");
            if (syncButton.show && syncButton.elem) {
                syncButton.elem.className = this.sync ? "sync-toggle-on" : "sync-toggle-off";
            }
        }


        /**
         * The scale values to use when converting between a zoom level
         * Based on http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#designing_overlay_gm_mve.htm
         */
        scales: number[] = [
            null,
            591657550.500000,
            295828775.300000,
            147914387.600000,
            73957193.820000,
            36978596.910000,
            18489298.450000,
            9244649.227000,
            4622324.614000,
            2311162.307000,
            1155581.153000,
            577790.576700,
            288895.288400,
            144447.644200,
            72223.822090,
            36111.911040,
            18055.955520,
            9027.977761,
            4513.988880,
            2256.994440,
            1128.497220
        ];

        zoomLevelToScale(zoom: number): number {
            return this.scales[Math.floor(zoom)];
        }

        scaleToZoomLevel(scale: number): number {
            var zoomLevel = 0;

            for (var i = this.scales.length - 1; i > 0; --i) {
                if (scale <= this.scales[i]) {
                    return i;
                }
            }

            return null;
        }

        getActionButtonById(id: string): ActionButton {
            for (var i = 0; i < this.actionButtons.length; i++) {
                if (this.actionButtons[i].id === id) {
                    return this.actionButtons[i];
                }
            }
            return null;
        }

        /**
         * Checks whether undocking is supported for the current browser.
         */
        supportsUndocking(): boolean {
            var ua = navigator.userAgent.toLowerCase();
            var userAgentContains = function (token) {
                return ua.indexOf(token.toLowerCase()) > -1;
            };

            // Docking is not supported in the tablet shell
            if (userAgentContains("Android") || userAgentContains("iPad") ||
                userAgentContains("Playbook") || userAgentContains("Touch")) {
                return false;
            }

            // Post message is not supported between tabs/windows in IE9
            if (userAgentContains("MSIE 9.0")) {
                return false;
            }

            return true;
        }
    }
}
