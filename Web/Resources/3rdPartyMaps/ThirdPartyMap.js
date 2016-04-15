/// <reference path="../../../_Definitions/bridge.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var ThirdPartyMap = (function () {
                function ThirdPartyMap(id, initializeMap, getMapViewpointParams, handleViewerPositionUpdatedEvent, handleViewpointIndicatorUpdatedEvent, sync) {
                    var _this = this;
                    if (sync === void 0) { sync = false; }
                    this.initializeMap = initializeMap;
                    this.getMapViewpointParams = getMapViewpointParams;
                    this.handleViewerPositionUpdatedEvent = handleViewerPositionUpdatedEvent;
                    this.handleViewpointIndicatorUpdatedEvent = handleViewpointIndicatorUpdatedEvent;
                    this.allowedOrigins = [];
                    this.isDocked = true;
                    this.debounceTimer = null;
                    this.debounceInterval = 500;
                    this.ignoreNextPositionChange = false;
                    /**
                     * The scale values to use when converting between a zoom level
                     * Based on http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#designing_overlay_gm_mve.htm
                     */
                    this.scales = [
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
                    this.bridge = new integration.RemotePostMessageComponent();
                    this.id = id;
                    this.sync = sync;
                    this.actionButtons = [
                        { id: "centerButton", clickHandler: function () { _this.handleClickCenter(); }, show: true, elem: null },
                        { id: "syncButton", clickHandler: function () { _this.handleClickSync(); }, show: false, elem: null },
                        { id: "dockButton", clickHandler: function () { _this.handleClickDock(); }, show: true, elem: null },
                        { id: "closeButton", clickHandler: function () { _this.handleClickClose(); }, show: true, elem: null }
                    ];
                    // Check the window has already finished loading (GVH-7329)
                    if (document.readyState === "complete") {
                        this.initializePane();
                    }
                    else {
                        window.onload = function () {
                            _this.initializePane();
                        };
                    }
                    window.onunload = function () {
                        _this.disconnect();
                    };
                }
                /**
                 * Initializes this map's container.
                 */
                ThirdPartyMap.prototype.initializePane = function () {
                    var _this = this;
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
                    this.actionButtons.forEach(function (button) {
                        button.elem = document.getElementById(button.id);
                        if (button.elem && button.show) {
                            button.elem.addEventListener("click", function () {
                                button.clickHandler();
                            });
                        }
                        else {
                            _this.hideActionButton(button);
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
                };
                /**
                 * Initializes the "bridge" mechanism that allows communication with the viewer.
                 */
                ThirdPartyMap.prototype.initializeViewerBridge = function () {
                    var _this = this;
                    this.bridge.getTransport().allowOrigin(window.location.protocol + "//" + window.location.host);
                    this.allowedOrigins.forEach(function (origin) {
                        _this.bridge.getTransport().allowOrigin(origin);
                    });
                    this.bridge.on("ExternalComponentInitializedEvent", function (arg) {
                        if (arg.hasPreviousState) {
                            _this.updateSync(arg.sync);
                            // We only recieve viewpoint if the 3rd party map was previously unsynced
                            if (arg.viewpoint) {
                                _this.handleViewerPositionUpdatedEvent(arg.viewpoint);
                            }
                        }
                        else if (_this.sync !== arg.sync) {
                            _this.bridge.publish("ToggleExternalComponentSyncById", _this.id);
                        }
                    });
                    this.bridge.on("ViewerPositionUpdatedEvent", function (arg) {
                        if (arg.updaterName === _this.bridge.getComponentId()) {
                            return;
                        }
                        _this.ignoreNextPositionChange = true;
                        _this.handleViewerPositionUpdatedEvent(arg);
                    });
                    this.bridge.on("ViewpointIndicatorUpdatedEvent", function (arg) {
                        _this.ignoreNextPositionChange = true;
                        _this.handleViewpointIndicatorUpdatedEvent(arg);
                    });
                    this.bridge.connect(this.id);
                };
                /**
                 * Disconnects the bridge when the window unloads
                 */
                ThirdPartyMap.prototype.disconnect = function () {
                    var currentState = {
                        id: this.id,
                        sync: this.sync,
                        viewpoint: this.getMapViewpointParams()
                    };
                    this.bridge.disconnect(currentState);
                };
                /**
                 * Triggers a viewpoint updated message after being debounced.
                 */
                ThirdPartyMap.prototype.debouncedBroadcast = function () {
                    this.debounceTimer = null;
                    this.bridge.publish("ComponentViewpointUpdatedEvent", this.getMapViewpointParams());
                };
                /**
                 * Called whenever the viewpoint changes. Third-party map components should call this when their location is altered.
                 */
                ThirdPartyMap.prototype.handleViewpointChanged = function () {
                    var _this = this;
                    if (this.ignoreNextPositionChange) {
                        this.ignoreNextPositionChange = false;
                        return;
                    }
                    if (this.debounceTimer) {
                        clearTimeout(this.debounceTimer);
                    }
                    this.debounceTimer = setTimeout(function () {
                        _this.debouncedBroadcast();
                    }, this.debounceInterval);
                };
                /**
                 * Called when the "center" button is clicked/tapped.
                 */
                ThirdPartyMap.prototype.handleClickCenter = function () {
                    this.bridge.publish("BroadcastCurrentViewpoint", this.id);
                };
                /**
                 * Called when the "sync" button is clicked/tapped.
                 */
                ThirdPartyMap.prototype.handleClickSync = function () {
                    this.updateSync(!this.sync);
                    this.bridge.publish("ToggleExternalComponentSyncById", this.id);
                };
                /**
                 * Called when the "dock" button is clicked/tapped.
                 */
                ThirdPartyMap.prototype.handleClickDock = function () {
                    if (this.isDocked) {
                        this.bridge.publish("DisplayUndockedExternalComponentById", this.id);
                    }
                    else {
                        this.bridge.publish("DisplayDockedExternalComponentById", this.id);
                    }
                };
                /**
                 * Called when the "close" button clicked/tapped.
                 */
                ThirdPartyMap.prototype.handleClickClose = function () {
                    this.bridge.publish("RemoveExternalComponentById", this.id);
                    // TODO: Unsubscribe from all?
                };
                /**
                 * Updates the visibility of the status overlay
                 */
                ThirdPartyMap.prototype.showStatusOverlay = function (showStatus) {
                    if (this.statusOverlayElement) {
                        this.statusOverlayElement.style.display = showStatus ? "block" : "none";
                    }
                };
                /**
                 * Hides an action button from the action button panel
                 */
                ThirdPartyMap.prototype.hideActionButton = function (button) {
                    if (button.elem) {
                        button.elem.parentElement.style.display = "none";
                    }
                };
                /**
                 * Update the sync value for the 3rd party map and updates the button if available.
                 */
                ThirdPartyMap.prototype.updateSync = function (syncValue) {
                    this.sync = syncValue;
                    var syncButton = this.getActionButtonById("syncButton");
                    if (syncButton.show && syncButton.elem) {
                        syncButton.elem.className = this.sync ? "sync-toggle-on" : "sync-toggle-off";
                    }
                };
                ThirdPartyMap.prototype.zoomLevelToScale = function (zoom) {
                    return this.scales[Math.floor(zoom)];
                };
                ThirdPartyMap.prototype.scaleToZoomLevel = function (scale) {
                    var zoomLevel = 0;
                    for (var i = this.scales.length - 1; i > 0; --i) {
                        if (scale <= this.scales[i]) {
                            return i;
                        }
                    }
                    return null;
                };
                ThirdPartyMap.prototype.getActionButtonById = function (id) {
                    for (var i = 0; i < this.actionButtons.length; i++) {
                        if (this.actionButtons[i].id === id) {
                            return this.actionButtons[i];
                        }
                    }
                    return null;
                };
                /**
                 * Checks whether undocking is supported for the current browser.
                 */
                ThirdPartyMap.prototype.supportsUndocking = function () {
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
                };
                return ThirdPartyMap;
            })();
            integration.ThirdPartyMap = ThirdPartyMap;
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
//# sourceMappingURL=ThirdPartyMap.js.map