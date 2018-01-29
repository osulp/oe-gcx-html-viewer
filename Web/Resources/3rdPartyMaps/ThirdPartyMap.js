var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var ThirdPartyMap = (function () {
                function ThirdPartyMap(id, initializeMap, getMapViewpointParams, handleViewerPositionUpdatedEvent, handleViewpointIndicatorUpdatedEvent, sync, addViewpointIndicator, handleCustomViewpointIndicatorUpdatedEvent) {
                    if (sync === void 0) { sync = false; }
                    if (addViewpointIndicator === void 0) { addViewpointIndicator = true; }
                    var _this = this;
                    this.initializeMap = initializeMap;
                    this.getMapViewpointParams = getMapViewpointParams;
                    this.handleViewerPositionUpdatedEvent = handleViewerPositionUpdatedEvent;
                    this.handleViewpointIndicatorUpdatedEvent = handleViewpointIndicatorUpdatedEvent;
                    this.handleCustomViewpointIndicatorUpdatedEvent = handleCustomViewpointIndicatorUpdatedEvent;
                    this.allowedOrigins = [];
                    this.isDocked = true;
                    this.debounceTimer = null;
                    this.debounceInterval = 500;
                    this.ignoreNextPositionChange = false;
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
                    this._shouldAddViewpointIndicator = addViewpointIndicator;
                    this.actionButtons = [
                        { id: "centerButton", clickHandler: function () { _this.handleClickCenter(); }, show: true, elem: null },
                        { id: "syncButton", clickHandler: function () { _this.handleClickSync(); }, show: false, elem: null },
                        { id: "dockButton", clickHandler: function () { _this.handleClickDock(); }, show: true, elem: null },
                        { id: "closeButton", clickHandler: function () { _this.handleClickClose(); }, show: true, elem: null }
                    ];
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
                ThirdPartyMap.prototype.initializePane = function () {
                    var _this = this;
                    if (this._isInitialized) {
                        return;
                    }
                    this._isInitialized = true;
                    this.initializeMap();
                    this.initializeViewerBridge();
                    this.statusOverlayElement = document.getElementById("status");
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
                    if (window.opener) {
                        this.isDocked = false;
                        if (dockButton.elem) {
                            dockButton.elem.className = "window-dock";
                            dockButton.elem.title = "Dock in map viewer";
                        }
                    }
                    if (!this.supportsUndocking() && dockButton.elem) {
                        this.hideActionButton(dockButton);
                    }
                };
                ThirdPartyMap.prototype.initializeViewerBridge = function () {
                    var _this = this;
                    this.bridge.getTransport().allowOrigin(window.location.protocol + "//" + window.location.host);
                    this.allowedOrigins.forEach(function (origin) {
                        _this.bridge.getTransport().allowOrigin(origin);
                    });
                    this.bridge.on("ExternalComponentInitializedEvent", function (arg) {
                        if (arg) {
                            _this.setSavedState(arg.savedState);
                        }
                        if (arg && arg.hasPreviousState) {
                            _this.updateSync(arg.sync);
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
                    this.bridge.on("ComponentCustomViewpointIndicatorUpdatedEvent", function (args) {
                        if (_this.handleCustomViewpointIndicatorUpdatedEvent) {
                            _this.handleCustomViewpointIndicatorUpdatedEvent(args);
                        }
                    });
                    this.bridge.connect({ id: this.id, addViewpointIndicator: this._shouldAddViewpointIndicator });
                };
                ThirdPartyMap.prototype.getSavedState = function () {
                    return null;
                };
                ThirdPartyMap.prototype.setSavedState = function (savedState) {
                };
                ThirdPartyMap.prototype.disconnect = function () {
                    var currentState = {
                        id: this.id,
                        sync: this.sync,
                        viewpoint: this.getMapViewpointParams(),
                        savedState: this.getSavedState()
                    };
                    this.bridge.disconnect(currentState);
                };
                ThirdPartyMap.prototype.debouncedBroadcast = function () {
                    this.debounceTimer = null;
                    this.bridge.publish("ComponentViewpointUpdatedEvent", this.getMapViewpointParams());
                };
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
                ThirdPartyMap.prototype.handleClickCenter = function () {
                    this.bridge.publish("BroadcastCurrentViewpoint", this.id);
                };
                ThirdPartyMap.prototype.handleClickSync = function () {
                    this.updateSync(!this.sync);
                    this.bridge.publish("ToggleExternalComponentSyncById", this.id);
                };
                ThirdPartyMap.prototype.handleClickDock = function () {
                    if (this.isDocked) {
                        this.bridge.publish("DisplayUndockedExternalComponentById", this.id);
                    }
                    else {
                        this.bridge.publish("DisplayDockedExternalComponentById", this.id);
                    }
                };
                ThirdPartyMap.prototype.handleClickClose = function () {
                    this.bridge.publish("RemoveExternalComponentById", this.id);
                };
                ThirdPartyMap.prototype.showStatusOverlay = function (showStatus) {
                    if (this.statusOverlayElement) {
                        this.statusOverlayElement.style.display = showStatus ? "block" : "none";
                    }
                };
                ThirdPartyMap.prototype.hideActionButton = function (button) {
                    if (button.elem) {
                        button.elem.parentElement.style.display = "none";
                    }
                };
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
                ThirdPartyMap.prototype.supportsUndocking = function () {
                    var ua = navigator.userAgent.toLowerCase();
                    var userAgentContains = function (token) {
                        return ua.indexOf(token.toLowerCase()) > -1;
                    };
                    if (userAgentContains("Android") || userAgentContains("iPad") ||
                        userAgentContains("Playbook") || userAgentContains("Touch")) {
                        return false;
                    }
                    if (userAgentContains("MSIE 9.0")) {
                        return false;
                    }
                    return true;
                };
                return ThirdPartyMap;
            }());
            integration.ThirdPartyMap = ThirdPartyMap;
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
