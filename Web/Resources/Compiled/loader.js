var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application_1) {
            var loading;
            (function (loading) {
                var ApplicationLoader = (function () {
                    function ApplicationLoader(resourceSet) {
                        var _this = this;
                        this._isUnloading = false;
                        this.resourceSet = resourceSet || new application_1.resources.ResourceSet("everything");
                        window.addEventListener("beforeunload", function (e) {
                            _this._isUnloading = true;
                        });
                    }
                    ApplicationLoader.prototype.initializeApplication = function (options) {
                        throw new Error("Not implemented.");
                    };
                    ApplicationLoader.prototype.loadAndInitialize = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        this.resourceSet.load({
                            onLoaded: function () {
                                var application = _this.initializeApplication(options);
                                if (options.onInitialized) {
                                    options.onInitialized(application, _this);
                                }
                            },
                            onError: function (resource, error) {
                                _this.handleError(error, options.onError);
                            }
                        });
                    };
                    ApplicationLoader.prototype.handleError = function (error, handler, application) {
                        if (handler) {
                            handler(error, this);
                        }
                        else {
                            console.error(error);
                            if (this._isUnloading) {
                                return;
                            }
                            var alerted = false;
                            if (application) {
                                try {
                                    application.trace.error("[{0}]: {1}".format(error.name, error.message));
                                    application.command("Alert").execute("[{0}]: {1}".format(error.name, error.message), "Viewer Error");
                                    alerted = true;
                                }
                                finally { }
                            }
                            if (!alerted) {
                                var warning = document.createElement("div");
                                warning.setAttribute("class", "application-error");
                                warning.setAttribute("style", "padding: 1em; font-size: 1em; color: #333; border: 1px solid #cccccc; border-radius: 0.25em; margin: 2%;");
                                var heading = document.createElement("h1");
                                heading.textContent = heading.innerText = "An error occurred.";
                                heading.style.fontSize = "1.5em";
                                heading.style.fontWeight = "normal";
                                heading.style.paddingBottom = "0.25em";
                                heading.style.color = "#990000";
                                var errorName = document.createElement("strong");
                                errorName.textContent = errorName.innerText = error.name + ": ";
                                var errorMessage = document.createTextNode(error.message);
                                warning.appendChild(heading);
                                warning.appendChild(errorName);
                                warning.appendChild(errorMessage);
                                document.body.appendChild(warning);
                            }
                        }
                    };
                    return ApplicationLoader;
                }());
                loading.ApplicationLoader = ApplicationLoader;
            })(loading = application_1.loading || (application_1.loading = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var loading;
            (function (loading) {
                var CaselessMap = (function () {
                    function CaselessMap(obj) {
                        if (obj) {
                            this.merge(obj);
                        }
                    }
                    CaselessMap.prototype.find = function (name) {
                        if (name) {
                            for (var n in this) {
                                if (this.hasOwnProperty(n) && name.toLowerCase() === n.toLowerCase()) {
                                    return {
                                        name: n,
                                        value: this[n]
                                    };
                                }
                            }
                        }
                        return null;
                    };
                    CaselessMap.prototype.has = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? true
                            : false;
                    };
                    CaselessMap.prototype.get = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? prop.value
                            : undefined;
                    };
                    CaselessMap.prototype.getAsBoolean = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? ((typeof prop.value != "string" || prop.value.toLowerCase() !== "false") && prop.value !== false && prop.value !== null)
                            : false;
                    };
                    CaselessMap.prototype.set = function (name, value) {
                        var prop = this.find(name);
                        var n = (prop)
                            ? prop.name
                            : name;
                        this[n] = value;
                        return this;
                    };
                    CaselessMap.prototype.merge = function (obj) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                this.set(key, obj[key]);
                            }
                        }
                        return this;
                    };
                    return CaselessMap;
                }());
                loading.CaselessMap = CaselessMap;
            })(loading = application.loading || (application.loading = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var Splash = (function () {
            function Splash(splashOverlay, useTransitions) {
                if (useTransitions === void 0) { useTransitions = "transition" in document.createElement("span").style; }
                this.splashOverlay = splashOverlay;
                this.useTransitions = useTransitions;
            }
            Splash.getDefaultSplash = function () {
                return new Splash(document.querySelector(".splash-overlay"));
            };
            Splash.prototype.display = function (splashScreenUrl) {
                var plate = document.querySelector(".splash-plate");
                if (plate) {
                    plate.className = plate.className.replace(" splash-invisible", "");
                }
                var image = document.querySelector(".splash-image");
                if (image && !image.src) {
                    if (splashScreenUrl) {
                        image.src = splashScreenUrl;
                    }
                    else {
                        image.src = "Resources/Images/splash-logo.png";
                    }
                }
                var preLoader = document.querySelector(".splash-pre-loader");
                if (preLoader && this.splashOverlay) {
                    this.splashOverlay.removeChild(preLoader);
                }
                return this;
            };
            Splash.prototype.destroy = function () {
                if (this.splashOverlay) {
                    this.splashOverlay.parentElement.removeChild(this.splashOverlay);
                    this.splashOverlay = null;
                }
                return this;
            };
            Splash.prototype.close = function (animationDuration) {
                var _this = this;
                if (animationDuration === void 0) { animationDuration = 1000; }
                performance && performance.mark && performance.mark("splash_close");
                if (this.splashOverlay && !this.splashOverlay.hasAttribute("data-closing")) {
                    if (this.useTransitions) {
                        this.splashOverlay.setAttribute("data-closing", "true");
                        this.splashOverlay.style.transition = "opacity " + animationDuration + "ms linear";
                        setTimeout(function () {
                            _this.splashOverlay.style.opacity = "0";
                            setTimeout(function () {
                                _this.destroy();
                            }, animationDuration);
                        });
                    }
                    else {
                        this.destroy();
                    }
                }
                return this;
            };
            return Splash;
        }());
        essentialsHtmlViewer.Splash = Splash;
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var ViewerLoader = (function (_super) {
            __extends(ViewerLoader, _super);
            function ViewerLoader(options) {
                if (options === void 0) { options = {}; }
                var _this = _super.call(this) || this;
                _this.aliases = new geocortex.framework.application.loading.CaselessMap();
                var ResourceSet = geocortex.framework.application.resources.ResourceSet;
                var ScriptResource = geocortex.framework.application.resources.ScriptResource;
                var loaderResourcePrefix = ("loaderResourcePrefix" in options)
                    ? options.loaderResourcePrefix
                    : null;
                if (!loaderResourcePrefix) {
                    loaderResourcePrefix = ("baseUrl" in options)
                        ? options.baseUrl
                        : "./";
                }
                if ("useLocalEsriApi" in options) {
                    window["geocortexUseLocalEsriApi"] = options.useLocalEsriApi;
                }
                else {
                    options.useLocalEsriApi = ("geocortexUseLocalEsriApi" in window)
                        ? window["geocortexUseLocalEsriApi"]
                        : false;
                }
                _this.resourceSet.append([
                    {
                        name: "dependencies",
                        resources: [
                            {
                                name: "css",
                                resources: [
                                    loaderResourcePrefix + "Resources/Styles/jquery.ui.custom.css",
                                    loaderResourcePrefix + "Resources/Scripts/esri/css/esri.css",
                                    loaderResourcePrefix + "Resources/Styles/Animations.css"
                                ]
                            },
                            {
                                name: "tools",
                                resources: [
                                    loaderResourcePrefix + "Resources/Scripts/jquery.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/jquery.ui.custom.js",
                                    loaderResourcePrefix + "Resources/Scripts/jquery.ui.touch-punch.js",
                                    loaderResourcePrefix + "Resources/Scripts/jquery-ui-timepicker-addon.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/modernizr.js",
                                    loaderResourcePrefix + "Resources/Scripts/modernizr-fix.js",
                                    loaderResourcePrefix + "Resources/Scripts/bluebird.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/iso8601.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/remarkable.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/fastclick.js",
                                    loaderResourcePrefix + "Resources/Scripts/globalize/cldr.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/globalize/globalize.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/caja-html-sanitizer-minified.js",
                                    loaderResourcePrefix + "Resources/Scripts/kendo.extract.min.js",
                                    loaderResourcePrefix + "Resources/Scripts/Bridge.js",
                                    loaderResourcePrefix + "Resources/Scripts/insight-event-relay.js",
                                ]
                            },
                            {
                                name: "esri",
                                resources: [
                                    loaderResourcePrefix + "Resources/Scripts/dojo-config.js",
                                    loaderResourcePrefix + "Resources/Scripts/esri.js",
                                    loaderResourcePrefix + "Resources/Scripts/dojo-requires.js"
                                ]
                            }
                        ]
                    },
                    {
                        name: "framework",
                        resources: [
                            "require:Resources/Compiled/Framework.bundle.js"
                        ]
                    },
                    {
                        name: "framework-shim",
                        resources: [
                            "require:Resources/Compiled/shims.framework.js"
                        ]
                    },
                    {
                        name: "infrastructure",
                        resources: [
                            "require:geocortex/framework/utils/ArrayUtils",
                            "require:geocortex/framework/utils/String",
                            "require:Resources/Compiled/framework.ui.bundle.js",
                            "require:Resources/Compiled/charting.infrastructure.bundle.js",
                            "require:Resources/Compiled/charting.bundle.js",
                            "require:Resources/Compiled/essentials.bundle.js",
                            "require:Resources/Compiled/mapping.infrastructure.bundle.js",
                            "require:Resources/Scripts/moment/moment-timezone-with-data.js"
                        ]
                    },
                    {
                        name: "infrastructure-shim",
                        resources: [
                            "require:Resources/Compiled/shims.framework.ui.js",
                            "require:Resources/Compiled/shims.charting.js",
                            "require:Resources/Compiled/shims.charting.infrastructure.js",
                            "require:Resources/Compiled/shims.essentials.js",
                            "require:Resources/Compiled/shims.mapping.infrastructure.js"
                        ]
                    }
                ]);
                if (typeof WeakMap !== "function") {
                    _this.resourceSet.find("tools").append([loaderResourcePrefix + "Resources/Scripts/weakmap.js"]);
                }
                var documentMode = document.documentMode;
                if (documentMode && documentMode <= 8) {
                    _this.resourceSet.find("css").prepend([loaderResourcePrefix + "Resources/Styles/IE.css"]);
                }
                if (documentMode && documentMode <= 9) {
                    _this.resourceSet.find("tools").append([loaderResourcePrefix + "Resources/Scripts/jquery.iframe-transport-1.0.0.min.js"]);
                }
                if (!documentMode || (documentMode && documentMode >= 10)) {
                    _this.resourceSet.find("tools").append([loaderResourcePrefix + "Resources/Scripts/hammer.js"]);
                }
                return _this;
            }
            ViewerLoader.initialize = function () {
                if (!String.prototype.startsWith) {
                    String.prototype.startsWith = function (searchString, position) {
                        position = position || 0;
                        return this.substr(position, searchString.length) === searchString;
                    };
                }
                if (!String.prototype.endsWith) {
                    String.prototype.endsWith = function (searchString, position) {
                        var subjectString = this.toString();
                        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                            position = subjectString.length;
                        }
                        position -= searchString.length;
                        var lastIndex = subjectString.lastIndexOf(searchString, position);
                        return lastIndex !== -1 && lastIndex === position;
                    };
                }
            };
            ViewerLoader.determineAppropriateShell = function (userAgent) {
                if (userAgent === void 0) { userAgent = navigator.userAgent; }
                var shell;
                var ua = function (search) { return new RegExp(search, "i").test(userAgent); };
                if ((ua("Android") && ua("mobile")) || (ua("Windows") && ua("Phone")) || ua("iPhone") || ua("iPod") || ua("BlackBerry") || ua("BB10")) {
                    shell = "Handheld";
                }
                else if (ua("Android") || ua("iPad") || ua("Playbook") || ua("Touch")) {
                    shell = "Tablet";
                }
                else {
                    shell = "Desktop";
                }
                return shell;
            };
            ViewerLoader.prototype.addAlias = function (aliasName, configBase) {
                this.aliases.set(aliasName, configBase);
                return this;
            };
            ViewerLoader.prototype.initializeApplication = function (options) {
                var _this = this;
                if (options === void 0) { options = {}; }
                try {
                    dojo.contentHandlers["json"] = function (data) {
                        return JSON.parse(data.responseText);
                    };
                    var query = new geocortex.framework.application.loading.CaselessMap(options.query || this.loadQueryParams(options));
                    new window["FastClick"](document.body);
                    var hostElement = options.hostElement || document.body;
                    var debug = query.has("debug") ? query.getAsBoolean("debug") : options.debug || false;
                    var offline = query.has("offline") ? query.getAsBoolean("offline") : options.offline || false;
                    var configBase = options.configBase;
                    var configBaseDefined = !!configBase;
                    if (!configBase) {
                        configBase = "Resources/Config/Default/";
                    }
                    if (!/\/$/.test(configBase)) {
                        configBase += "/";
                    }
                    var shell = options.shell || ViewerLoader.determineAppropriateShell();
                    var viewerConfigUri = options.viewerConfigUri;
                    if (!viewerConfigUri) {
                        var defaultAliasValue = this.aliases.get("default");
                        if (defaultAliasValue && !configBaseDefined) {
                            viewerConfigUri = defaultAliasValue;
                        }
                    }
                    if (!viewerConfigUri) {
                        viewerConfigUri = configBase + shell + ".json.js";
                    }
                    var viewerConfigPathPieces = viewerConfigUri.split("/");
                    var viewerConfigPath = viewerConfigPathPieces
                        .slice(0, viewerConfigPathPieces.length - 1)
                        .join("/") + "/";
                    var viewerId = String.quickHashCode(geocortex.framework.utils.makeUrlAbsolute(viewerConfigPath));
                    var region = document.createElement("div");
                    region.setAttribute("class", "shell splash-blurred");
                    region.setAttribute("data-region-name", "ApplicationRegion");
                    region.setAttribute("data-region-adapter", "geocortex.framework.ui.MultiDivRegionAdapter");
                    hostElement.appendChild(region);
                    var viewer = new geocortex.essentialsHtmlViewer.ViewerApplication(viewerConfigUri, hostElement, viewerId);
                    viewer.shellName = shell;
                    viewer.viewerConfigPath = viewerConfigPath;
                    viewer.debugMode = debug;
                    viewer.urlParameters = query;
                    viewer.isOffline.set(offline);
                    viewer.event("LibraryDownloadedEvent").subscribe(window, function (libraryId) {
                        if (libraryId === "Mapping") {
                            essentialsHtmlViewer.Splash.getDefaultSplash().close();
                        }
                    });
                    viewer.event("SiteInitializedEvent").subscribe(window, function () {
                        if (options.onSiteInitialized) {
                            options.onSiteInitialized(viewer, _this);
                        }
                    });
                    viewer.event("SiteInitializationFailedEvent").subscribe(window, function (error) {
                        error.name = "SiteInitializationFailedEvent/" + error.name;
                        _this.handleError(error, options.onError, viewer);
                    });
                    viewer.event("SiteAuthorizationFailedEvent").subscribe(window, function (error) {
                        error.name = "SiteAuthorizationFailedEvent/" + error.name;
                        _this.handleError(error, options.onError, viewer);
                    });
                    viewer.event("ConfigurationLoadFailedEvent").subscribe(window, function (error) {
                        error.name = "ConfigurationLoadFailed/" + error.name;
                        _this.handleError(error, options.onError, viewer);
                    });
                    viewer.event("TraceEvent").subscribe(window, function (args) {
                        function padDigits(n, width, z) {
                            z = z || "0";
                            n = n + "";
                            return (n.length >= width) ? n : new Array(width - n.length + 1).join(z) + n;
                        }
                        var date = args["timestamp"];
                        var timestampStr = "{0}:{1}:{2}.{3}".format(padDigits(date.getHours(), 2), padDigits(date.getMinutes(), 2), padDigits(date.getSeconds(), 2), padDigits(date.getMilliseconds(), 3));
                        var logMessage = "[{0}]: {1}: {2}".format(args["level"], timestampStr, args["message"]);
                        if (console.info) {
                            console.info(logMessage);
                        }
                        else {
                            console.log(logMessage);
                        }
                    });
                    viewer.initialize();
                    return viewer;
                }
                catch (error) {
                    this.handleError(error, options.onError);
                }
            };
            ViewerLoader.prototype.obtainConfigFromAlias = function (options, onSuccess, onError) {
                var _this = this;
                var query = options.query;
                var viewerID = query.get("viewer");
                var siteID = "";
                var configBase = query.get("configBase");
                var viewerConfigUri = query.get("viewerConfigUri");
                if (!viewerID) {
                    if (configBase) {
                        viewerID = this.getViewerIDFromConfig(configBase);
                        siteID = this.getSiteIDFromConfig(configBase);
                    }
                    else if (viewerConfigUri) {
                        viewerID = this.getViewerIDFromConfig(viewerConfigUri);
                        siteID = this.getSiteIDFromConfig(viewerConfigUri);
                    }
                }
                var viewerConfig = window["viewerConfig"];
                if (viewerConfig && viewerConfig.configurations) {
                    this.aliases.merge(viewerConfig.configurations || {});
                }
                this.aliases.merge(options.aliases || {});
                var aliasValue = this.aliases.get(viewerID);
                if (viewerConfig && viewerConfig.viewerConfigUri) {
                    options.viewerConfigUri = viewerConfig.viewerConfigUri;
                    onSuccess(true);
                }
                else if (aliasValue) {
                    options.viewerConfigUri = aliasValue;
                    onSuccess(true);
                }
                else {
                    var alias = siteID.length != 0 ? siteID + "." + viewerID : viewerID;
                    var fallthroughError = function () {
                        if (configBase && configBase.length !== 0) {
                            options.configBase = configBase;
                        }
                        else if (viewerConfigUri && viewerConfigUri.length !== 0) {
                            options.viewerConfigUri = viewerConfigUri;
                        }
                        onSuccess(true);
                    };
                    this.getViewerSettingsFromJson(function (json) {
                        var hasToken = location.hash.length != 0 && location.hash.startsWith("#gcx-");
                        var endpointsFromJson = json["endpoints"];
                        var viewerSettingsFromJson = json["viewerSettings"] || [];
                        var gotSettingsFromJson = false;
                        viewerSettingsFromJson.forEach(function (setting) {
                            options.splashScreenUrl = setting["splashScreenUrl"] ? setting["splashScreenUrl"] : "";
                            if (alias && setting["id"].toLowerCase() === alias.toLowerCase() && !gotSettingsFromJson) {
                                gotSettingsFromJson = true;
                                if (_this.canPassWithoutRedirect(setting, hasToken, setting["securityUrl"])) {
                                    if (setting["viewerConfigUri"]) {
                                        options.viewerConfigUri = setting["viewerConfigUri"];
                                    }
                                    else if (setting["url"]) {
                                        options.configBase = setting["url"];
                                    }
                                    onSuccess(true);
                                }
                            }
                        });
                        if (alias && !gotSettingsFromJson && endpointsFromJson && endpointsFromJson[0] && endpointsFromJson[0]["externalUrl"]) {
                            alias = encodeURIComponent(alias);
                            _this.getConfigBaseFromEndpoints({
                                alias: alias,
                                hasToken: hasToken,
                                options: options,
                                endpoints: endpointsFromJson,
                                index: 0,
                                onSuccess: onSuccess,
                                onError: fallthroughError
                            });
                        }
                        else if (!gotSettingsFromJson) {
                            fallthroughError();
                        }
                    }, fallthroughError);
                }
            };
            ViewerLoader.prototype.loadAndInitialize = function (options) {
                var _this = this;
                if (options === void 0) { options = {}; }
                var onErrorOriginal = options.onError;
                options.onError = function (error, loader) {
                    _this.handleError(error, onErrorOriginal);
                };
                options.query = options.query || new geocortex.framework.application.loading.CaselessMap(new geocortex.framework.application.loading.QueryParameters(location.href));
                var count = 0;
                var readyToInitializeApplication = function (displaySplash) {
                    if (displaySplash) {
                        essentialsHtmlViewer.Splash.getDefaultSplash().display(options.splashScreenUrl);
                    }
                    ++count;
                    if (count > 1) {
                        var application = _this.initializeApplication(options);
                        window.addEventListener("unload", function () {
                            $(application.getHostElement()).empty().off("*");
                            $(document.head).empty().off("*");
                            application.shutdown(null);
                        });
                        if (options.onInitialized) {
                            options.onInitialized(application, _this);
                        }
                    }
                };
                this.obtainConfigFromAlias(options, readyToInitializeApplication, function (err) { _this.handleError(err, options.onError); });
                this.resourceSet.find("dependencies").load({
                    onLoaded: function () {
                        if (window["Globalize"]) {
                            window["_globalize"] = window["Globalize"];
                            delete window["Globalize"];
                        }
                        require(["dojo/ready"], function (ready) {
                            ready(function () {
                                var resourceNames = ["framework", "framework-shim", "infrastructure", "infrastructure-shim"];
                                var index = 0;
                                var loadResource = function (resourceName) {
                                    var resource = _this.resourceSet.find(resourceName);
                                    resource.load({
                                        onLoaded: function () {
                                            index++;
                                            var nextResource = resourceNames[index];
                                            if (nextResource) {
                                                loadResource(resourceNames[index]);
                                            }
                                            else {
                                                readyToInitializeApplication();
                                            }
                                        },
                                        onError: function (resource, error) {
                                            _this.handleError(error, options.onError);
                                        }
                                    });
                                };
                                loadResource(resourceNames[index]);
                            });
                        });
                    },
                    onError: function (resource, error) {
                        _this.handleError(error, options.onError);
                    }
                });
            };
            ViewerLoader.prototype.resolveSplashScreenUrl = function (baseUrl, splashScreenUrl) {
                var r = new RegExp("^(?:[a-z]+:)?//", "i");
                if (r.test(splashScreenUrl)) {
                    return splashScreenUrl;
                }
                else {
                    if (!baseUrl.endsWith("/")) {
                        baseUrl = baseUrl + "/";
                    }
                    if (baseUrl.toLowerCase().endsWith("/viewers/")) {
                        baseUrl = baseUrl.substring(0, baseUrl.length - 8);
                    }
                    if (splashScreenUrl.startsWith("/")) {
                        splashScreenUrl = splashScreenUrl.substring(1);
                    }
                    return baseUrl + splashScreenUrl;
                }
            };
            ViewerLoader.prototype.getViewerSettingsFromJson = function (onSuccess, onError) {
                getJson("ViewerSettings.json.js", onSuccess, onError);
            };
            ViewerLoader.prototype.canPassWithoutRedirect = function (json, hasToken, securityUrl) {
                if (json["isAuthorized"] === true) {
                    return true;
                }
                if (!hasToken && securityUrl && securityUrl.length !== 0) {
                    securityUrl = securityUrl + encodeURIComponent(this.replaceConfigParamsWithAliasInUrl(window.location.toString(), json["id"]));
                    location.assign(securityUrl);
                    return false;
                }
                return true;
            };
            ViewerLoader.prototype.getConfigBaseFromEndpoints = function (endpointParams) {
                var _this = this;
                var alias = endpointParams.alias, hasToken = endpointParams.hasToken, options = endpointParams.options, endpoints = endpointParams.endpoints, index = endpointParams.index, onSuccess = endpointParams.onSuccess, onError = endpointParams.onError;
                if (index === endpoints.length) {
                    onError();
                }
                else {
                    var configSuffix = "/Resources/Config/Default";
                    var endpointUrl = String(endpoints[index]["externalUrl"]);
                    if (endpointUrl.endsWith("/") || endpointUrl.endsWith("\\")) {
                        endpointUrl = endpointUrl.slice(0, -1);
                    }
                    endpointUrl += "/";
                    getJson(endpointUrl + alias + "?f=json", function (json) {
                        var configStem = json["url"];
                        if (configStem.endsWith("/") || configStem.endsWith("\\")) {
                            configStem = configStem.slice(0, -1);
                        }
                        if (configStem.indexOf("/") === 0 || configStem.indexOf("\\") === 0) {
                            configStem = configStem.slice(0, 1);
                        }
                        options.splashScreenUrl = json["splashScreenUrl"] ? json["splashScreenUrl"] : "";
                        if (options.splashScreenUrl) {
                            options.splashScreenUrl = _this.resolveSplashScreenUrl(endpointUrl, options.splashScreenUrl);
                        }
                        if (_this.canPassWithoutRedirect(json, hasToken, endpointUrl + json["securityUrl"])) {
                            options.configBase = endpointUrl + configStem + configSuffix;
                            onSuccess(true);
                        }
                    }, function (error, xhr) {
                        error.name = "EssentialsEndpointHttpError/" + error.name;
                        error.message += " - Error with essentials endpoint \"" + endpoints[index]["externalUrl"] + "\"";
                        console.log(error);
                        ++index;
                        _this.getConfigBaseFromEndpoints({
                            alias: alias,
                            hasToken: hasToken,
                            options: options,
                            endpoints: endpoints,
                            index: index,
                            onSuccess: onSuccess,
                            onError: onError
                        });
                    });
                }
            };
            ViewerLoader.prototype.replaceConfigParamsWithAliasInUrl = function (url, alias) {
                var paramToRemove = "";
                var regEx = /((\&|\?)configBase=|(\&|\?)viewerConfigUri=)/;
                var matches = url.match(regEx);
                if (null == matches) {
                    return url;
                }
                paramToRemove = matches[0];
                var prefixLength = url.indexOf(paramToRemove) + 1;
                var paramAndSuffix = url.substring(prefixLength);
                var paramLength = paramAndSuffix.indexOf("&") > 0 ? paramAndSuffix.indexOf("&") : paramAndSuffix.length;
                var goodSuffix = url.substring(prefixLength + paramLength);
                return url.substring(0, prefixLength) + "viewer=" + alias + goodSuffix;
            };
            ViewerLoader.prototype.loadQueryParams = function (options) {
                if (options === void 0) { options = {}; }
                var q = /^.*\?([^#]*).*$/.exec(location.href);
                return q ? dojo.queryToObject(q[1]) : {};
            };
            ViewerLoader.prototype.getSiteIDFromConfig = function (url) {
                var lowerCaseUrl = url.toLowerCase();
                var startIndex = lowerCaseUrl.indexOf("/sites/") + 7 || lowerCaseUrl.indexOf("\\sites\\") + 7;
                var truncUrl = url.substr(startIndex);
                var endIndex = truncUrl.indexOf("/") || truncUrl.indexOf("\\");
                return truncUrl.substr(0, endIndex);
            };
            ViewerLoader.prototype.getViewerIDFromConfig = function (url) {
                var lowerCaseUrl = url.toLowerCase();
                var startIndex = lowerCaseUrl.toLocaleLowerCase().indexOf("/viewers/") + 9 || lowerCaseUrl.indexOf("\\viewers\\") + 9;
                var truncUrl = url.substr(startIndex);
                var endIndex = truncUrl.indexOf("/") || truncUrl.indexOf("\\");
                return truncUrl.substr(0, endIndex);
            };
            ViewerLoader.prototype.handleError = function (error, handler, viewer) {
                essentialsHtmlViewer.Splash.getDefaultSplash().destroy();
                if (viewer) {
                    var host = viewer.getHostElement();
                    host.className += " viewer-loader-error";
                }
                _super.prototype.handleError.call(this, error, handler, viewer);
            };
            return ViewerLoader;
        }(geocortex.framework.application.loading.ApplicationLoader));
        essentialsHtmlViewer.ViewerLoader = ViewerLoader;
        function tryParseJson(objectToParse) {
            try {
                var obj = JSON.parse(objectToParse);
                if (obj && typeof obj === "object") {
                    return obj;
                }
            }
            catch (e) {
                return { "error": { "message": "Could not parse response. Error: " + e } };
            }
        }
        essentialsHtmlViewer.tryParseJson = tryParseJson;
        function getJson(url, onSuccess, onError) {
            var handleResponse = function (response, xhr) {
                var json = tryParseJson(response);
                if (!json || "error" in json) {
                    onError(new Error("Error reported from server: " + json ? json.error.message : "no response returned"), xhr);
                }
                else {
                    onSuccess(json, xhr);
                }
            };
            xhrGet(url, handleResponse, onError);
        }
        essentialsHtmlViewer.getJson = getJson;
        function xhrGet(url, onSuccess, onError) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.send();
            xhr.onload = function () {
                var err = null;
                if (xhr.status === 200 && !!xhr.responseText) {
                    onSuccess(xhr.responseText, err, xhr);
                }
                else {
                    err = new Error("xhrGet request failed. Status: " + xhr.status + ".");
                    onError(err, xhr);
                }
            };
            xhr.onerror = function () {
                var err = new Error("xhrGet request failed. Status: " + xhr.status + ".");
                onError(err, xhr);
            };
        }
        essentialsHtmlViewer.xhrGet = xhrGet;
        ;
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
geocortex.essentialsHtmlViewer.ViewerLoader.initialize();
window["shellName"] = geocortex.essentialsHtmlViewer.ViewerLoader.determineAppropriateShell();
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var loading;
            (function (loading) {
                var QueryParameters = (function () {
                    function QueryParameters(url) {
                        if (url === void 0) { url = window.location.href; }
                        var _this = this;
                        var query = /^.*\?([^#]*).*$/.exec(url);
                        if (query) {
                            query[1].split("&").forEach(function (paramString) {
                                var paramParts = paramString.split("=");
                                var paramName = paramParts.shift();
                                var paramValue = paramParts.join("=");
                                _this[decodeURIComponent(paramName)] = (paramValue) ? decodeURIComponent(paramValue) : undefined;
                            });
                        }
                    }
                    return QueryParameters;
                }());
                loading.QueryParameters = QueryParameters;
            })(loading = application.loading || (application.loading = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                var Resource = (function () {
                    function Resource(name) {
                        this.status = resources.ResourceStatus.Unloaded;
                        this.name = name;
                    }
                    Resource.prototype.load = function (options) {
                        if (options === void 0) { options = {}; }
                        throw new Error("Not implemented.");
                    };
                    return Resource;
                }());
                resources.Resource = Resource;
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                var RequireResource = (function (_super) {
                    __extends(RequireResource, _super);
                    function RequireResource() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    RequireResource.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        require([this.name], function (module) {
                            _this.status = resources.ResourceStatus.Loaded;
                            _this.module = module;
                            if (options.onLoaded) {
                                options.onLoaded(_this, module);
                            }
                        });
                        if (options.onNext) {
                            options.onNext(this);
                        }
                    };
                    return RequireResource;
                }(resources.Resource));
                RequireResource.prefixRegex = /^require:(.*)$/i;
                resources.RequireResource = RequireResource;
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources_1) {
                var ResourceSet = (function (_super) {
                    __extends(ResourceSet, _super);
                    function ResourceSet(name, items) {
                        var _this = _super.call(this, name) || this;
                        _this.resources = [];
                        geocortex.framework.application.resources.ScriptResource;
                        if (items) {
                            _this.append(items);
                        }
                        return _this;
                    }
                    ResourceSet.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources_1.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources_1.ResourceStatus.Loading;
                        var resourceSet = this;
                        var loadingCounter = this.resources.length;
                        var pendingCounter = 0;
                        if (resources_1.ScriptResource.loadingMode === resources_1.ScriptLoadingMode.ConcurrentLegacyIE) {
                            for (var i = 0; i < this.resources.length; i++) {
                                var resource = this.resources[i];
                                if (i > 0) {
                                    resource.prevResource = this.resources[i - 1];
                                }
                                if (resource instanceof resources_1.ScriptResource) {
                                    pendingCounter++;
                                }
                                else if (resource instanceof ResourceSet) {
                                    if (resource.resources.length > 0) {
                                        resource.resources[0].prevResource = resource.prevResource;
                                    }
                                    var containsScript = false;
                                    var resources = resource.getAllResources();
                                    for (var i2 = 0; i2 < resources.length; i2++) {
                                        if (resources[i2] instanceof resources_1.ScriptResource) {
                                            containsScript = true;
                                            break;
                                        }
                                    }
                                    if (containsScript) {
                                        pendingCounter++;
                                    }
                                }
                            }
                        }
                        function recursivelyLoadChildren(resources, recursiveLoadOptions) {
                            if (resources.length < 1) {
                                return recursiveLoadOptions.onNext(this);
                            }
                            var resource = resources.shift();
                            resource.load({
                                parent: resourceSet,
                                onNext: function (resource) {
                                    recursivelyLoadChildren(resources, recursiveLoadOptions);
                                },
                                onPending: function (resource) {
                                    pendingCounter--;
                                    if (pendingCounter < 1) {
                                        recursiveLoadOptions.onPending(resource);
                                    }
                                },
                                onLoaded: function (resource) {
                                    loadingCounter--;
                                    if (loadingCounter < 1) {
                                        recursiveLoadOptions.onLoaded(resource);
                                    }
                                },
                                onError: function (resource, error) {
                                    recursiveLoadOptions.onError(resource, error);
                                }
                            });
                        }
                        recursivelyLoadChildren(this.resources.slice(), {
                            onNext: function (resource) {
                                if (options.onNext) {
                                    options.onNext(_this);
                                }
                            },
                            onPending: function (resource) {
                                if (options.onPending) {
                                    options.onPending(_this);
                                }
                                if (!options.parent) {
                                    _this.executePending();
                                }
                            },
                            onLoaded: function (resource) {
                                _this.status = resources_1.ResourceStatus.Loaded;
                                if (options.onLoaded) {
                                    options.onLoaded(_this);
                                }
                            },
                            onError: function (resource, error) {
                                _this.status = resources_1.ResourceStatus.Error;
                                if (options.onError) {
                                    options.onError(resource, error);
                                }
                                else {
                                    console.error(error);
                                }
                            }
                        });
                    };
                    ResourceSet.prototype.executePending = function () {
                        function recursivelyExecutePending(resources) {
                            if (!resources.length) {
                                return;
                            }
                            var resource = resources.shift();
                            if (resource.executePending) {
                                resource.executePending();
                            }
                            recursivelyExecutePending(resources);
                        }
                        recursivelyExecutePending(this.resources.slice());
                    };
                    ResourceSet.prototype.getAllResources = function () {
                        var all = [this];
                        for (var i = 0, len = this.resources.length; i < len; i++) {
                            var resource = this.resources[i];
                            if (resource instanceof ResourceSet) {
                                var innerResources = resource.getAllResources();
                                for (var i2 = 0, len2 = innerResources.length; i2 < len2; i2++) {
                                    all.push(innerResources[i2]);
                                }
                            }
                            else {
                                all.push(resource);
                            }
                        }
                        return all;
                    };
                    ResourceSet.prototype.find = function (resourceName) {
                        var resources = this.getAllResources();
                        for (var i = 0, len = resources.length; i < len; i++) {
                            var resource = resources[i];
                            if (resourceName === resource.name) {
                                return resource;
                            }
                        }
                        return null;
                    };
                    ResourceSet.prototype.add = function (items, prepend) {
                        if (prepend === void 0) { prepend = false; }
                        for (var i = 0, len = items.length; i < len; i++) {
                            var resource = ResourceSet.interpretItemAsResource(items[i]);
                            if (resource) {
                                if (prepend) {
                                    this.resources.unshift(resource);
                                }
                                else {
                                    this.resources.push(resource);
                                }
                            }
                        }
                        return this;
                    };
                    ResourceSet.prototype.append = function (items) {
                        this.add(items, false);
                        return this;
                    };
                    ResourceSet.prototype.prepend = function (items) {
                        this.add(items, true);
                        return this;
                    };
                    ResourceSet.interpretItemAsResource = function (item) {
                        if (typeof item === "string") {
                            if (resources_1.RequireResource.prefixRegex.test(item)) {
                                var uri = resources_1.RequireResource.prefixRegex.exec(item)[1];
                                return new resources_1.RequireResource(uri);
                            }
                            else if (/\.js$/i.test(item)) {
                                return new resources_1.ScriptResource(item);
                            }
                            else if (/\.css$/i.test(item)) {
                                return new resources_1.StyleResource(item);
                            }
                            else {
                                throw "Unknown resource type \"" + item + "\"";
                            }
                        }
                        else if (typeof item === "object") {
                            if (item instanceof resources_1.Resource) {
                                return item;
                            }
                            else {
                                return ResourceSet.generateResourceSetFromLiteral(item);
                            }
                        }
                        else {
                            throw new Error("Unknown item type: " + typeof item);
                        }
                    };
                    ResourceSet.generateResourceSetFromLiteral = function (literal) {
                        if (literal instanceof ResourceSet) {
                            return literal;
                        }
                        var resourceSet = new ResourceSet(literal.name);
                        for (var i = 0, len = literal.resources.length; i < len; i++) {
                            resourceSet.append([literal.resources[i]]);
                        }
                        return resourceSet;
                    };
                    return ResourceSet;
                }(resources_1.Resource));
                resources_1.ResourceSet = ResourceSet;
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                var ResourceStatus;
                (function (ResourceStatus) {
                    ResourceStatus[ResourceStatus["Unloaded"] = 0] = "Unloaded";
                    ResourceStatus[ResourceStatus["Loading"] = 1] = "Loading";
                    ResourceStatus[ResourceStatus["Pending"] = 2] = "Pending";
                    ResourceStatus[ResourceStatus["Loaded"] = 3] = "Loaded";
                    ResourceStatus[ResourceStatus["Error"] = 4] = "Error";
                })(ResourceStatus = resources.ResourceStatus || (resources.ResourceStatus = {}));
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                var log = function (msg) {
                };
                var ScriptLoadingMode;
                (function (ScriptLoadingMode) {
                    ScriptLoadingMode[ScriptLoadingMode["Concurrent"] = 0] = "Concurrent";
                    ScriptLoadingMode[ScriptLoadingMode["ConcurrentLegacyIE"] = 1] = "ConcurrentLegacyIE";
                    ScriptLoadingMode[ScriptLoadingMode["Sequential"] = 2] = "Sequential";
                })(ScriptLoadingMode = resources.ScriptLoadingMode || (resources.ScriptLoadingMode = {}));
                var ScriptResource = (function (_super) {
                    __extends(ScriptResource, _super);
                    function ScriptResource(url) {
                        return _super.call(this, url) || this;
                    }
                    ScriptResource.detectScriptLoadingMode = function (userAgent, documentMode) {
                        if (userAgent === void 0) { userAgent = navigator.userAgent; }
                        if (documentMode === void 0) { documentMode = document.documentMode; }
                        var scriptAsyncSupport = (document.createElement("script").async === true);
                        if (scriptAsyncSupport) {
                            return ScriptLoadingMode.Concurrent;
                        }
                        else {
                            if (documentMode) {
                                return ScriptLoadingMode.ConcurrentLegacyIE;
                            }
                            else {
                                return ScriptLoadingMode.Sequential;
                            }
                        }
                    };
                    ScriptResource.sniffScriptLoadingMode = function (userAgent, documentMode) {
                        if (userAgent === void 0) { userAgent = navigator.userAgent; }
                        if (documentMode === void 0) { documentMode = document.documentMode; }
                        if (documentMode) {
                            return (documentMode >= 10)
                                ? ScriptLoadingMode.Concurrent
                                : ScriptLoadingMode.ConcurrentLegacyIE;
                        }
                        if (/Chrome/i.test(userAgent) || /Chromium/i.test(userAgent)) {
                            return ScriptLoadingMode.Concurrent;
                        }
                        if (/Firefox/i.test(userAgent)) {
                            return ScriptLoadingMode.Sequential;
                        }
                        if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent) && !/Chromium\//i.test(userAgent)) {
                            var safariMajorVersion = parseInt(/Version\/([\w]+)/i.exec(userAgent)[1]);
                            if (safariMajorVersion > 5) {
                                return ScriptLoadingMode.Concurrent;
                            }
                        }
                        if (/Opera/i.test(userAgent) && !/Opera Mini/i.test(userAgent)) {
                            return ScriptLoadingMode.Concurrent;
                        }
                        return ScriptLoadingMode.Sequential;
                    };
                    ScriptResource.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        var head = document.head || document.getElementsByTagName("head")[0];
                        var script = document.createElement("script");
                        script.setAttribute("data-injected-script", "");
                        try {
                            if (ScriptResource.loadingMode === ScriptLoadingMode.Concurrent) {
                                script.async = false;
                                script.onload = function () {
                                    _this.status = resources.ResourceStatus.Loaded;
                                    if (options.onLoaded) {
                                        options.onLoaded(_this);
                                    }
                                    script.onload = null;
                                };
                                script.onerror = function (e) {
                                    var error = new Error("Script failed to load (" + _this.name + ")");
                                    error.name = "ResourceLoadError";
                                    if (options.onError) {
                                        options.onError(_this, error);
                                    }
                                    else {
                                        console.error(error);
                                    }
                                    script.onerror = null;
                                };
                                script.src = this.name;
                                head.appendChild(script);
                                if (options.onNext) {
                                    options.onNext(this);
                                }
                            }
                            else if (ScriptResource.loadingMode === ScriptLoadingMode.ConcurrentLegacyIE) {
                                script.onerror = function () {
                                    var error = new Error("Script failed to load (" + _this.name + ")");
                                    error.name = "ResourceLoadError";
                                    log(error);
                                    if (options.onError) {
                                        options.onError(_this, error);
                                    }
                                    else {
                                        console.error(error);
                                    }
                                    script.onerror = null;
                                };
                                script.src = this.name;
                                var completionPollingInterval = setInterval(function () {
                                    if (_this.prevResource && (_this.prevResource.status !== resources.ResourceStatus.Loaded)) {
                                        return;
                                    }
                                    if (script.readyState === "loaded") {
                                        _this.status = resources.ResourceStatus.Pending;
                                        _this.pendingExecution = script;
                                        if (options.onPending) {
                                            options.onPending(_this);
                                        }
                                        if (!options.parent) {
                                            _this.executePending();
                                        }
                                    }
                                    else if (script.readyState === "complete") {
                                        clearInterval(completionPollingInterval);
                                        _this.status = resources.ResourceStatus.Loaded;
                                        options.onLoaded(_this);
                                    }
                                }, ScriptResource.concurrentLegacyIEInterval);
                                if (options.onNext) {
                                    options.onNext(this);
                                }
                            }
                            else if (ScriptResource.loadingMode === ScriptLoadingMode.Sequential) {
                                var done = false;
                                script.onload = script.onreadystatechange = function () {
                                    if (!done && (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
                                        _this.status = resources.ResourceStatus.Loaded;
                                        if (options.onLoaded) {
                                            options.onLoaded(_this);
                                        }
                                        if (options.onNext) {
                                            options.onNext(_this);
                                        }
                                        done = true;
                                        script.onload = script.onreadystatechange = null;
                                    }
                                };
                                script.onerror = function () {
                                    var error = new Error("Script failed to load (" + _this.name + ")");
                                    error.name = "ResourceLoadError";
                                    if (options.onError) {
                                        options.onError(_this, error);
                                    }
                                    else {
                                        console.error(error);
                                    }
                                    script.onerror = null;
                                };
                                script.src = this.name;
                                head.appendChild(script);
                            }
                        }
                        catch (error) {
                            if (options.onError) {
                                options.onError(this, error);
                            }
                            else {
                                console.error(error);
                            }
                        }
                    };
                    ScriptResource.prototype.executePending = function () {
                        if (this.status !== resources.ResourceStatus.Pending || !this.pendingExecution) {
                            return;
                        }
                        log("Executed script " + this.name);
                        var head = document.head || document.getElementsByTagName("head")[0];
                        head.appendChild(this.pendingExecution);
                        this.pendingExecution = null;
                    };
                    return ScriptResource;
                }(resources.Resource));
                ScriptResource.loadingMode = ScriptResource.detectScriptLoadingMode();
                ScriptResource.concurrentLegacyIEInterval = 150;
                resources.ScriptResource = ScriptResource;
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                var StyleResource = (function (_super) {
                    __extends(StyleResource, _super);
                    function StyleResource(href) {
                        return _super.call(this, href) || this;
                    }
                    StyleResource.prototype.load = function (options) {
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        var head = document.head || document.getElementsByTagName("head")[0];
                        var lastInjectedStylesheet = null;
                        for (var i = 0; i < head.children.length; i++) {
                            var element = head.children[i];
                            if (element.tagName.toLowerCase() === "link" && element.getAttribute("[data-injected-stylesheet]") === "") {
                                lastInjectedStylesheet = element;
                            }
                        }
                        var link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = this.name;
                        link.setAttribute("data-injected-stylesheet", "");
                        if (!lastInjectedStylesheet) {
                            if (head.firstChild) {
                                head.insertBefore(link, head.firstChild);
                            }
                            else {
                                head.appendChild(link);
                            }
                        }
                        else {
                            if (lastInjectedStylesheet.nextSibling) {
                                head.insertBefore(link, lastInjectedStylesheet.nextSibling);
                            }
                            else {
                                head.appendChild(link);
                            }
                        }
                        this.status = resources.ResourceStatus.Loaded;
                        if (options.onLoaded) {
                            options.onLoaded(this);
                        }
                        if (options.onNext) {
                            options.onNext(this);
                        }
                    };
                    return StyleResource;
                }(resources.Resource));
                resources.StyleResource = StyleResource;
            })(resources = application.resources || (application.resources = {}));
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
