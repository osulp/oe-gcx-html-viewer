var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var ThirdPartyMap = (function () {
                function ThirdPartyMap(paramsOrId, initializeMap, getMapViewpointParams, handleViewerPositionUpdatedEvent, handleViewpointIndicatorUpdatedEvent, sync, addViewpointIndicator, handleCustomViewpointIndicatorUpdatedEvent) {
                    if (sync === void 0) { sync = false; }
                    if (addViewpointIndicator === void 0) { addViewpointIndicator = true; }
                    var _this = this;
                    this.allowedOrigins = [];
                    this.updateOnDrag = true;
                    this.isDocked = true;
                    this.debounceTimer = null;
                    this.debounceInterval = 500;
                    this.ignoreNextPositionChange = false;
                    this.scales = [
                        591657527.591555,
                        295828763.795777,
                        147914381.897889,
                        73957190.948944,
                        36978595.474472,
                        18489297.737236,
                        9244648.868618,
                        4622324.434309,
                        2311162.217155,
                        1155581.108577,
                        577790.554289,
                        288895.277144,
                        144447.638572,
                        72223.819286,
                        36111.909643,
                        18055.954822,
                        9027.977411,
                        4513.988705,
                        2256.994353,
                        1128.497176,
                        564.248588,
                        282.124294,
                        141.062147,
                        70.5310735
                    ];
                    var args;
                    if (typeof paramsOrId === "string") {
                        args = {
                            id: paramsOrId,
                            initializeMap: initializeMap,
                            getMapViewpointParams: getMapViewpointParams,
                            handleViewerPositionUpdatedEvent: handleViewerPositionUpdatedEvent,
                            handleViewpointIndicatorUpdatedEvent: handleViewpointIndicatorUpdatedEvent,
                            sync: sync,
                            addViewpointIndicator: addViewpointIndicator,
                            handleCustomViewpointIndicatorUpdatedEvent: handleCustomViewpointIndicatorUpdatedEvent
                        };
                    }
                    else {
                        args = paramsOrId;
                    }
                    this.bridge = new integration.RemotePostMessageComponent();
                    this.id = args.id;
                    this.sync = !!args.sync;
                    this._shouldAddViewpointIndicator = !!args.addViewpointIndicator;
                    this.initializeMap = args.initializeMap;
                    this.getMapViewpointParams = args.getMapViewpointParams;
                    this.handleViewerPositionUpdatedEvent = args.handleViewerPositionUpdatedEvent;
                    this.handleViewpointIndicatorUpdatedEvent = args.handleViewpointIndicatorUpdatedEvent;
                    this.handleCustomViewpointIndicatorUpdatedEvent = args.handleCustomViewpointIndicatorUpdatedEvent;
                    this.handleSharedArcGISTokenUpdate = args.handleSharedArcGISTokenUpdate;
                    this.sharedArcGISToken = !!args.sharedArcGISToken;
                    this.updateOnDrag = !!args.updateOnDrag;
                    this.actionButtons = [
                        { id: "centerButton", clickHandler: function () { _this.handleClickCenter(); }, show: true, elem: null },
                        { id: "syncButton", clickHandler: function () { _this.handleClickSync(); }, show: true, elem: null },
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
                    this.bridge.onReady = function (message) {
                        _this.initializeMap(message);
                    };
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
                        if (_this.updateOnDrag !== true) {
                            _this.bridge.publish("DisableUpdateOnDragById", _this.id);
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
                    if (this.sharedArcGISToken && this.handleSharedArcGISTokenUpdate) {
                        this.bridge.on("SitePrincipalUpdatedEvent", function (principal) {
                            if (principal && principal.tokens && principal.tokens.arcgis && Object.keys(principal.tokens.arcgis).length > 0) {
                                var token = principal.tokens.arcgis[Object.keys(principal.tokens.arcgis)[0]];
                                _this.handleSharedArcGISTokenUpdate(token);
                            }
                        });
                    }
                    this.bridge.connect({ id: this.id, addViewpointIndicator: this._shouldAddViewpointIndicator, sharedArcGISToken: this.sharedArcGISToken });
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
                    for (var i = this.scales.length - 1; i > 0; --i) {
                        if (scale <= this.scales[i]) {
                            return i;
                        }
                    }
                    return null;
                };
                ThirdPartyMap.prototype.getGeographicDistance = function (lat, distance) {
                    var rad = lat * (360 / (2.0 * Math.PI));
                    var m1 = 111132.92;
                    var m2 = -559.82;
                    var m3 = 1.175;
                    var m4 = -0.0023;
                    var p1 = 111412.84;
                    var p2 = -93.5;
                    var p3 = 0.118;
                    var latlen = m1 + (m2 * Math.cos(2 * rad)) + (m3 * Math.cos(4 * rad)) + (m4 * Math.cos(6 * rad));
                    var longlen = (p1 * Math.cos(rad)) + (p2 * Math.cos(3 * rad)) + (p3 * Math.cos(5 * rad));
                    var latDist = distance / latlen;
                    var longDist = distance / longlen;
                    return { latDist: latDist, longDist: longDist };
                };
                ThirdPartyMap.prototype.getActionButtonById = function (id) {
                    for (var _i = 0, _a = this.actionButtons; _i < _a.length; _i++) {
                        var actionButton = _a[_i];
                        if (actionButton.id === id) {
                            return actionButton;
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
