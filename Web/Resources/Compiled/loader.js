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
        (function (application) {
            var loading;
            (function (loading) {
                /**
                 * Object-form representation of a query string (part of a URL following a question mark). Parameter names and values are decoded.
                 */
                var QueryParameters = (function () {
                    /**
                     * Construct a QueryParameters instance, optionally providing in a URL containing a query string to parse from.
                     * @param url The URL to parse from. Defaults to `window.location.href`.
                     */
                    function QueryParameters(url) {
                        if (url === void 0) { url = window.location.href; }
                        var _this = this;
                        // Extracting the query string portion from the URL.
                        var query = /^.*\?([^#]*).*$/.exec(url);
                        if (query) {
                            // Looping through each paramString, breaking each by the '=', and adding it to params object after decoding.
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
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        /**
         * Represents and controls the behavior of the splash screen.
         * Auto-detects CSS transition support.
         */
        var Splash = (function () {
            /**
             * @param splashOverlay The root HTMLElement of the splash screen.
             * @param useTransitions Boolean indicating whether CSS transitions should be used for animating the splash screen. Defaults to autodetecting CSS transition support.
             */
            function Splash(splashOverlay, useTransitions) {
                if (useTransitions === void 0) { useTransitions = "transition" in document.createElement("span").style; }
                this.splashOverlay = splashOverlay;
                this.useTransitions = useTransitions;
            }
            /**
             * Create a new Splash instance for controlling the default existing splash screen markup by the classname "splash-overlay".
             */
            Splash.getDefaultSplash = function () {
                return new Splash(document.querySelector(".splash-overlay"));
            };
            /**
             * Display the (custom) splash screen, removes splashPreLoader from the DOM.
             * @returns This instance (chainable).
             */
            Splash.prototype.display = function (splashScreenUrl) {
                //Display splash plate
                var plate = document.querySelector(".splash-plate");
                if (plate) {
                    plate.className = plate.className.replace(" splash-invisible", "");
                }
                var image = document.querySelector(".splash-image");
                //Overwrite image's src only if admin has not changed the markup for splash image
                if (image && !image.src) {
                    //Change url to custom if exists
                    if (splashScreenUrl) {
                        image.src = splashScreenUrl;
                    }
                    else {
                        image.src = "Resources/Images/splash-logo.png";
                    }
                }
                //Remove pre-loader
                var preLoader = document.querySelector(".splash-pre-loader");
                if (preLoader && this.splashOverlay) {
                    this.splashOverlay.removeChild(preLoader);
                }
                return this;
            };
            /**
             * Destroys the splash screen, removes splashOverlay from the DOM.
             * @returns This instance (chainable).
             */
            Splash.prototype.destroy = function () {
                if (this.splashOverlay) {
                    this.splashOverlay.parentElement.removeChild(this.splashOverlay);
                    this.splashOverlay = null;
                }
                return this;
            };
            /**
             * Closes the splash screen with a fade-out animation (where CSS transitions are available).
             * @param animationDuration The amount of time, in milliseconds, that the fade-out animation should last.
             * @returns This instance (chainable).
             */
            Splash.prototype.close = function (animationDuration) {
                var _this = this;
                if (animationDuration === void 0) { animationDuration = 1000; }
                performance && performance.mark && performance.mark("splash_close");
                if (this.splashOverlay && !this.splashOverlay.hasAttribute("data-closing")) {
                    // If transitions are available, we animate the close with a fancy fade-out.
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
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var loading;
            (function (loading) {
                /**
                 * A CaselessMap is simply an object which has methods for accessing its properties in a case-insensitive way.
                 */
                var CaselessMap = (function () {
                    /**
                     * Construct a new CaselessMap. Pass in an object and the CaselessMap will gain all of its properties.
                     * @param obj Object from which to base the new CaselessMap. Own properties from this object will be added to
                     * the new CaselessMap.
                     */
                    function CaselessMap(obj) {
                        if (obj) {
                            this.merge(obj);
                        }
                    }
                    /**
                     * Returns information about the first property to match a case-insensitive comparison with the given `name`.
                     * @param name Name of the property to find.
                     * @returns Object containing `name` and `value` properties, or undefined if the property isn't found.
                     */
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
                    /**
                     * Case-insensitive check for whether the given own property is present in the CaselessMap.
                     * @param name Name of the property.
                     * @returns true if the property is present, otherwise false.
                     */
                    CaselessMap.prototype.has = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? true
                            : false;
                    };
                    /**
                     * Case-insensitive getter for any own property on this CaselessMap.
                     * @param name Name of the property.
                     * @returns The value of the property, otherwise undefined if the property isn't found.
                     */
                    CaselessMap.prototype.get = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? prop.value
                            : undefined;
                    };
                    /**
                     * Case-insensitive check for an own property's truthiness, where mere presence implies truth.
                     * Any string value except "false" (case-insensitive) will evaluate to true.
                     * @param name Name of the property.
                     * @returns True if the property isn't "false" (case-insensitive), false, or null.
                     */
                    CaselessMap.prototype.getAsBoolean = function (name) {
                        var prop = this.find(name);
                        return (prop)
                            ? ((typeof prop.value != "string" || prop.value.toLowerCase() !== "false") && prop.value !== false && prop.value !== null)
                            : false;
                    };
                    /**
                     * Case-insensitive property setter.
                     * Finds the property which matches the given `name` and assigns it the given `value`.
                     * @param name Name of the property.
                     * @param value Value to be assigned onto the property.
                     * @returns this (chainable).
                     */
                    CaselessMap.prototype.set = function (name, value) {
                        var prop = this.find(name);
                        var n = (prop)
                            ? prop.name
                            : name;
                        this[n] = value;
                        return this;
                    };
                    /**
                     * Case-insensitive merge operation, copying every own property from the given object onto this Caseless map.
                     * @param obj Object from which to add all own properties to this CaselessMap.
                     * @returns this (chainable).
                     */
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
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                /**
                 * The status of a loadable Resource.
                 */
                var ResourceStatus;
                (function (ResourceStatus) {
                    /** Loading has not yet begun. */
                    ResourceStatus[ResourceStatus["Unloaded"] = 0] = "Unloaded";
                    /** Loading is in progress. */
                    ResourceStatus[ResourceStatus["Loading"] = 1] = "Loading";
                    /** Downloaded, but awaiting execution by the execution manager (specific to ScriptLoadingMode.ConcurrentLegacyIE). */
                    ResourceStatus[ResourceStatus["Pending"] = 2] = "Pending";
                    /** Loading has completed. */
                    ResourceStatus[ResourceStatus["Loaded"] = 3] = "Loaded";
                    /** Loading has failed. */
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
                /**
                 * This base class represents anything that is idempotently loadable in a performance-conscious way.
                 */
                var Resource = (function () {
                    /**
                     * @param name The name string for this Resource. In some cases, this name is a URI.
                     */
                    function Resource(name) {
                        /**
                         * The loading status of this ResourceSet.
                         */
                        this.status = resources.ResourceStatus.Unloaded;
                        this.name = name;
                    }
                    /**
                     * Load this Resource.
                     */
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
/// <reference path="Resource.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources) {
                /**
                 * AMD module resource, loaded via `require`.
                 */
                var RequireResource = (function (_super) {
                    __extends(RequireResource, _super);
                    function RequireResource() {
                        return _super.apply(this, arguments) || this;
                    }
                    /**
                     * Load this require resource.
                     */
                    RequireResource.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        // Require the resource, and notify subscribers when it is done.
                        require([this.name], function (module) {
                            _this.status = resources.ResourceStatus.Loaded;
                            _this.module = module;
                            if (options.onLoaded) {
                                options.onLoaded(_this, module);
                            }
                        });
                        // Proceed immediately, because require ensures correct ordering.
                        if (options.onNext) {
                            options.onNext(this);
                        }
                    };
                    return RequireResource;
                }(resources.Resource));
                /** Regular expression for parsing a "require:..." resource string. */
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
            (function (resources) {
                var log = function (msg) {
                };
                /**
                 * Techniques available for loading scripts dynamically.
                 */
                var ScriptLoadingMode;
                (function (ScriptLoadingMode) {
                    /** Loads scripts simultaneously using 'script.async=false' mode in modern browsers. */
                    ScriptLoadingMode[ScriptLoadingMode["Concurrent"] = 0] = "Concurrent";
                    /** Workaround for 'script.async=false' that works in old IE. */
                    ScriptLoadingMode[ScriptLoadingMode["ConcurrentLegacyIE"] = 1] = "ConcurrentLegacyIE";
                    /** Fallback loading that works on all browsers. */
                    ScriptLoadingMode[ScriptLoadingMode["Sequential"] = 2] = "Sequential";
                })(ScriptLoadingMode = resources.ScriptLoadingMode || (resources.ScriptLoadingMode = {}));
                /**
                 * Represents a script resource that can be loaded once (idempotently).
                 */
                var ScriptResource = (function (_super) {
                    __extends(ScriptResource, _super);
                    /**
                     * @param name: URL to load the script from.
                     */
                    function ScriptResource(url) {
                        // url is used as this Resource's name.
                        return _super.call(this, url) || this;
                    }
                    /**
                     * Determines the ScriptLoadingMode based on feature detection.
                     */
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
                    /**
                     * Determines the ScriptLoadingMode based on user agent sniffing.
                     * Guilty until proven innocent.
                     * @deprecated
                     */
                    ScriptResource.sniffScriptLoadingMode = function (userAgent, documentMode) {
                        if (userAgent === void 0) { userAgent = navigator.userAgent; }
                        if (documentMode === void 0) { documentMode = document.documentMode; }
                        // Internet Explorer.
                        if (documentMode) {
                            return (documentMode >= 10)
                                ? ScriptLoadingMode.Concurrent
                                : ScriptLoadingMode.ConcurrentLegacyIE;
                        }
                        // Chrome / Chromium.
                        if (/Chrome/i.test(userAgent) || /Chromium/i.test(userAgent)) {
                            return ScriptLoadingMode.Concurrent;
                        }
                        // Firefox.
                        if (/Firefox/i.test(userAgent)) {
                            return ScriptLoadingMode.Sequential;
                        }
                        // Safari.
                        if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent) && !/Chromium\//i.test(userAgent)) {
                            var safariMajorVersion = parseInt(/Version\/([\w]+)/i.exec(userAgent)[1]);
                            if (safariMajorVersion > 5) {
                                return ScriptLoadingMode.Concurrent;
                            }
                        }
                        // Opera (and Opera Mini).
                        if (/Opera/i.test(userAgent) && !/Opera Mini/i.test(userAgent)) {
                            return ScriptLoadingMode.Concurrent;
                        }
                        // Fallback on Sequential loading (slow and icky).
                        return ScriptLoadingMode.Sequential;
                    };
                    /**
                     * Loads this ScriptResource with the technique described by ScriptResource.loadingMode.
                     */
                    ScriptResource.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        var head = document.head || document.getElementsByTagName("head")[0]; // IE8 doesn't do document.head.
                        var script = document.createElement("script");
                        script.setAttribute("data-injected-script", "");
                        try {
                            //## Concurrent: standardized high-performace loading technique (using 'script.async=false').
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
                                // 
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
                                            // Self-execution for lonely scripts (no parent, not part of a ResourceSet).
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
                    /**
                     * Executes this script when it's in Pending state.
                     * Specific to ScriptLoadingMode.ConcurrentLegacyIE.
                     */
                    ScriptResource.prototype.executePending = function () {
                        if (this.status !== resources.ResourceStatus.Pending || !this.pendingExecution) {
                            return;
                        }
                        log("Executed script " + this.name);
                        var head = document.head || document.getElementsByTagName("head")[0]; // IE8 doesn't do document.head.
                        head.appendChild(this.pendingExecution);
                        this.pendingExecution = null;
                    };
                    return ScriptResource;
                }(resources.Resource));
                /** The mode under which this script will or has been loaded. */
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
                /**
                 * Represents a stylesheet resource that can be loaded idempotently (one time).
                 */
                var StyleResource = (function (_super) {
                    __extends(StyleResource, _super);
                    /**
                     * @param href Stylesheet URL that is also used as this Resource's name.
                     */
                    function StyleResource(href) {
                        return _super.call(this, href) || this;
                    }
                    /**
                     * Load this stylesheet resource idempotently.
                     * Warning: Unfortunately, there's no good cross-browser way to detect when a stylesheet has actually finished loading, so this load method will actually fire the onLoaded callback immediately after the stylesheet <link> is injectected into the DOM.
                     * The stylesheets will be injected in the same order that they are loaded, so CSS precedence will be preserved.
                     */
                    StyleResource.prototype.load = function (options) {
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources.ResourceStatus.Loading;
                        // Obtaining the head in a cross-browser way (IE8 doesn't have document.head, lol).
                        var head = document.head || document.getElementsByTagName("head")[0];
                        // Obtaining the last injected stylesheet (if present) so that subsequent injections can be placed after it.
                        var lastInjectedStylesheet = null;
                        for (var i = 0; i < head.children.length; i++) {
                            var element = head.children[i];
                            if (element.tagName.toLowerCase() === "link" && element.getAttribute("[data-injected-stylesheet]") === "") {
                                lastInjectedStylesheet = element;
                            }
                        }
                        // Creating the stylesheet link that will be injected.
                        var link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = this.name; // Using name as the URI.
                        link.setAttribute("data-injected-stylesheet", ""); // Marking the link tag as an injected stylesheet.
                        // This is the first injected stylesheet (prepend to head).
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
                        // We claim that this Resource is done loading immediately after the stylesheet is injected, because there's unfortunately no good cross-browser way to detect when a stylesheet is actually finished loading.
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
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var resources;
            (function (resources_1) {
                /**
                 * ResourceSet is a named collection of Resources, which itself is a loadable Resource (and is therefore nestable).
                 * Using `find`, you can obtain any child Resource by name (including this ResourceSet).
                 * Can be manipulated via public the `resources` array, and `append` and `prepend` methods.
                 * Call the `load` method to start recursively loading the entire set and everything within it.
                 * All loading happens idempotently (only once, subsequent calls do nothing).
                 * To accomodate for `ScriptLoadingMode.ConcurrentLegacyIE`, this class has special handling for managing the ordered execution of 'pending' ScriptResources.
                 */
                var ResourceSet = (function (_super) {
                    __extends(ResourceSet, _super);
                    /**
                     * Construct a ResourceSet given a name, and any number of ResourceItems which are interpreted into valid Resource instances.
                     * @param name String name for this ResourceSet.
                     * @param items Any number of ResourceItems.
                     */
                    function ResourceSet(name, items) {
                        var _this = _super.call(this, name) || this;
                        /** This ResourceSet's internal collection of Resources. */
                        _this.resources = [];
                        geocortex.framework.application.resources.ScriptResource;
                        if (items) {
                            _this.append(items);
                        }
                        return _this;
                    }
                    /**
                     * Idempotently load every Resource within this ResourceSet, recursively.
                     */
                    ResourceSet.prototype.load = function (options) {
                        var _this = this;
                        if (options === void 0) { options = {}; }
                        if (this.status !== resources_1.ResourceStatus.Unloaded) {
                            return;
                        }
                        this.status = resources_1.ResourceStatus.Loading;
                        var resourceSet = this;
                        var loadingCounter = this.resources.length;
                        //## Counting the number of child resources that we'll be waiting to finish pending (Specific to ScriptLoadingMode.ConcurrentLegacyIE).
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
                        //## Recursive function that chews through a resources array, loading each Resource. Defined here in order to close over the `loadingCounter` variable above.
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
                                        // All loading complete.
                                        recursiveLoadOptions.onLoaded(resource);
                                    }
                                },
                                onError: function (resource, error) {
                                    recursiveLoadOptions.onError(resource, error);
                                }
                            });
                        }
                        //## Starting to load everything.
                        recursivelyLoadChildren(
                        // Copy of array, because `loadInOrder` actually shifts through (destroying any array we pass).
                        this.resources.slice(), {
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
                    /**
                     * Recursively executes all pending children, in the correct order.
                     * Specific to ScriptLoadingMode.ConcurrentLegacyIE.
                     */
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
                    /**
                     * Returns an array containing this ResourceSet, and also every Resource within it. Recursive.
                     * @returns Array of Resources.
                     */
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
                    /**
                     * Loops through all resources and returns the Resource object with the matching `name` property.
                     * @param resourceName The `name` string of the Resource that we are looking for.
                     * @returns Resource object that was found, or null if no Resource matched by name.
                     */
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
                    /**
                     * Interpret the given items as Resources, and then append or prepend them to this ResourceSet.
                     * @param items Array of ResourceItems to add to this ResourceSet.
                     * @param prepend Boolean representing whether or not the ResourceItems should be prepended instead of appended.
                     * @returns This ResourceSet (chainable).
                     */
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
                    /**
                     * Sugar for `add`. Interpret items as Resources, and add them onto the end of this ResourceSet's collection of resources.
                     * @param items Array of ResourceItems to be appended to this ResourceSet.
                     * @returns This ResourceSet (chainable).
                     */
                    ResourceSet.prototype.append = function (items) {
                        this.add(items, false);
                        return this;
                    };
                    /**
                     * Sugar for `add`. Interpret items as Resources, and add them to the beginning of this ResourceSet's collection of resources.
                     * @param items Array of ResourceItems to be prepended to this ResourceSet.
                     * @returns This ResourceSet (chainable).
                     */
                    ResourceSet.prototype.prepend = function (items) {
                        this.add(items, true);
                        return this;
                    };
                    /**
                     * Transform a `ResourceItem` into a `Resource`.
                     * @param item The ResourceItem to transform into a real Resource.
                     * @returns Appropriate Resource class instance that the item represented.
                     */
                    ResourceSet.interpretItemAsResource = function (item) {
                        // Interpret a string as a resource item.
                        if (typeof item === "string") {
                            // Item beginning with the require prefix is an AMD module.
                            if (resources_1.RequireResource.prefixRegex.test(item)) {
                                var uri = resources_1.RequireResource.prefixRegex.exec(item)[1];
                                return new resources_1.RequireResource(uri);
                            }
                            else if (/\.js$/i.test(item)) {
                                // Item is a regular globalized javascript file.
                                return new resources_1.ScriptResource(item);
                            }
                            else if (/\.css$/i.test(item)) {
                                // If it ends with ".css".
                                return new resources_1.StyleResource(item);
                            }
                            else {
                                throw "Unknown resource type \"" + item + "\"";
                            }
                        }
                        else if (typeof item === "object") {
                            if (item instanceof resources_1.Resource) {
                                return item; // we just return it :)
                            }
                            else {
                                return ResourceSet.generateResourceSetFromLiteral(item);
                            }
                        }
                        else {
                            // so we throw an error.
                            throw new Error("Unknown item type: " + typeof item);
                        }
                    };
                    /**
                     * Convert an object literal conforming to ResourceSetLiteral into a ResourceSet instance.
                     * @param literal The ResourceSetLiteral object literal that will be used as the basis of a new ResourceSet instance.
                     * @returns A ResourceSet instance.
                     */
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
/// <reference path="../_Definitions/Essentials.d.ts"/>
/// <reference path="../_Definitions/Mapping.Infrastructure.d.ts"/>
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application_1) {
            var loading;
            (function (loading) {
                /**
                 * Base class which uses a `resources.ResourceSet` to load scripts and stylesheets in a performance-conscious way before creating and initializing a `framework.application.Application`.
                 */
                var ApplicationLoader = (function () {
                    /**
                     * Constructs an `ApplicationLoader` and initializes it with the provided `resources.ResourceSet` or an empty default one.
                     * @param resourceSet: The `resources.ResourceSet` that this application depends on. If not provided, an empty ResourceSet is created.
                     */
                    function ApplicationLoader(resourceSet) {
                        var _this = this;
                        this._isUnloading = false;
                        this.resourceSet = resourceSet || new application_1.resources.ResourceSet("everything");
                        // GVH-11260
                        // Capture if the window is unloading. We'll use this to suppress the error handler later.
                        window.addEventListener("beforeunload", function (e) {
                            _this._isUnloading = true;
                        });
                    }
                    /**
                     * Abstract method for creating and initializing a `framework.application.Application`.
                     * @param options Options object used to initialize the `framework.application.Application`.
                     */
                    ApplicationLoader.prototype.initializeApplication = function (options) {
                        throw new Error("Not implemented.");
                    };
                    /**
                     * Load the `resources.ResourceSet` that this application depends on, and then create and initialize an application.
                     * @param options Options object used to initialize the application.
                     */
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
                    /**
                     * Handles errors related to loading resources or initializing an application.
                     */
                    ApplicationLoader.prototype.handleError = function (error, handler, application) {
                        if (handler) {
                            handler(error, this);
                        }
                        else {
                            console.error(error);
                            // GVH-11260
                            // Suppress the visual presentation of errors if the window is unloading
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
                                // Inline styling because these errors could appear when no stylesheets have yet been loaded.
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
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        /**
         * A `framework.ApplicationLoader` subclass that is specific to the task of embedding the Geocortex Essentials HTML5 Viewer into a webpage.
         */
        var ViewerLoader = (function (_super) {
            __extends(ViewerLoader, _super);
            /**
             * Create a ViewerLoader instance and establish a ResourceSet for loading a Geocortex Essentials HTML5 Viewer.
             * @param options: `ViewerLoaderOptions` object literal, containing options used to construct the viewer's ResourceSet.
             */
            function ViewerLoader(options) {
                if (options === void 0) { options = {}; }
                var _this = _super.call(this) || this;
                /** Aliases that point to full viewerConfigUri's. Specified via the 'viewer' query string parameter. */
                _this.aliases = new geocortex.framework.application.loading.CaselessMap();
                var ResourceSet = geocortex.framework.application.resources.ResourceSet;
                var ScriptResource = geocortex.framework.application.resources.ScriptResource;
                // Obtaining loaderResourcePrefix and it's deprecated former name 'baseUrl'.
                var loaderResourcePrefix = ("loaderResourcePrefix" in options)
                    ? options.loaderResourcePrefix
                    : null;
                if (!loaderResourcePrefix) {
                    loaderResourcePrefix = ("baseUrl" in options)
                        ? options.baseUrl
                        : "./";
                }
                // useLocalEsriApi and geocortexUseLocalEsriApi.
                if ("useLocalEsriApi" in options) {
                    window["geocortexUseLocalEsriApi"] = options.useLocalEsriApi;
                }
                else {
                    options.useLocalEsriApi = ("geocortexUseLocalEsriApi" in window)
                        ? window["geocortexUseLocalEsriApi"]
                        : false;
                }
                // GVH's default viewer resources.
                _this.resourceSet.append([
                    {
                        name: "dependencies",
                        resources: [
                            {
                                name: "css",
                                resources: [
                                    loaderResourcePrefix + "Resources/Styles/jquery.ui.custom.css",
                                    loaderResourcePrefix + "Resources/Scripts/esri/css/esri.css",
                                    loaderResourcePrefix + "Resources/Styles/common.css",
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
                    // Note that we're careful here about which buckets of dependencies are loaded in what order
                    // Framework must load first since it's required by everything else
                    {
                        name: "framework",
                        resources: [
                            "require:Resources/Compiled/Framework.bundle.js"
                        ]
                    },
                    // Framework shims can't load before Framework is ready. If it loads too early, it will begin require()-ing 
                    // Framework modules that haven't yet been loaded into require.cache.
                    // This will cause HTTP requests for Framework module files that don't even exist 
                    // (http://localhost/Resources/Compiled/geocortex/framework/ui/ViewBase.js for example)
                    // Once the Framework.bundle file has been processed, it will have primed the require.cache with the Framework module definitions,
                    // so subsequent requires in the shims.framework file will know where to find the Framework modules.
                    {
                        name: "framework-shim",
                        resources: [
                            "require:Resources/Compiled/shims.framework.js"
                        ]
                    },
                    // This bundle is basically everything else. They potentially have requirements on the global geocortex.framework namespace that
                    // shims.framework will have taken care of. 
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
                    // This bundle shims the previous infrastructure components on the global window object
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
                // If IE8-
                if (documentMode && documentMode <= 8) {
                    _this.resourceSet.find("css").prepend([loaderResourcePrefix + "Resources/Styles/IE.css"]);
                }
                // If IE9-
                if (documentMode && documentMode <= 9) {
                    _this.resourceSet.find("tools").append([loaderResourcePrefix + "Resources/Scripts/jquery.iframe-transport-1.0.0.min.js"]);
                }
                // If IE10+
                if (!documentMode || (documentMode && documentMode >= 10)) {
                    _this.resourceSet.find("tools").append([loaderResourcePrefix + "Resources/Scripts/hammer.js"]);
                }
                return _this;
            }
            /**
             * This class relies on some methods in the String class that are not
             * suppored in Internet Explorer prior to IE 11. Elsewhere in our code,
             * we get around this with polyfills defined in the Framework. We cannot
             * rely on that here, though, because this class is used prior to
             * the Framework being loaded. Instead, we must define the polyfills
             * here.
             *
             * As long as this method is called prior to any of the others in this
             * class, it is safe to use startsWith and endsWith in this class.
             */
            ViewerLoader.initialize = function () {
                // Polyfill from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
                if (!String.prototype.startsWith) {
                    String.prototype.startsWith = function (searchString, position) {
                        position = position || 0;
                        return this.substr(position, searchString.length) === searchString;
                    };
                }
                // Polyfill from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
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
            /**
             * Detect which shell is most appropriate based on user agent sniffing.
             * @param userAgent The user agent string to override (perhaps for testing).
             * @returns Shell profile name string. Can be "Desktop", "Tablet", or "Handheld".
             */
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
            /**
             * Adds a viewer alias to a configBase.
             */
            ViewerLoader.prototype.addAlias = function (aliasName, configBase) {
                this.aliases.set(aliasName, configBase);
                return this;
            };
            /**
             * Create and initialize a `ViewerApplication` instance, using the provided options.
             * @param options Object literal of `ViewerInitializationOptions` that specifies options for initializing a `ViewerApplication`.
             * @returns An initialized `ViewerApplication` instance.
             */
            ViewerLoader.prototype.initializeApplication = function (options) {
                var _this = this;
                if (options === void 0) { options = {}; }
                try {
                    // Dojo's API still uses `eval` to parse JSON in some code paths such as XHR with
                    // the handling type set to JSON.
                    dojo.contentHandlers["json"] = function (data) {
                        return JSON.parse(data.responseText);
                    };
                    var query = new geocortex.framework.application.loading.CaselessMap(options.query || this.loadQueryParams(options));
                    // Adds Fastclick to the page. Any elements which we don't want fastclick on should have the 'needsclick' class. ex. Map
                    new window["FastClick"](document.body);
                    // Pulling out the viewer initialization options.
                    var hostElement = options.hostElement || document.body;
                    var debug = query.has("debug") ? query.getAsBoolean("debug") : options.debug || false;
                    var offline = query.has("offline") ? query.getAsBoolean("offline") : options.offline || false;
                    // configBase.
                    var configBase = options.configBase;
                    var configBaseDefined = !!configBase;
                    if (!configBase) {
                        configBase = "Resources/Config/Default/";
                    }
                    if (!/\/$/.test(configBase)) {
                        configBase += "/";
                    }
                    // viewerConfigUri (and associated viewer aliases).
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
                    // Process the viewer URL. The path to config is used as a base path for certain resources.
                    var viewerConfigPathPieces = viewerConfigUri.split("/");
                    var viewerConfigPath = viewerConfigPathPieces
                        .slice(0, viewerConfigPathPieces.length - 1)
                        .join("/") + "/";
                    // Create a viewer ID using the absolute path of this viewer's config folder. 
                    // This ID is used to save offline resources for a particular viewer.
                    var viewerId = String.quickHashCode(geocortex.framework.utils.makeUrlAbsolute(viewerConfigPath));
                    // Initializing the ApplicationRegion and placing it within the hostElement.
                    var region = document.createElement("div");
                    region.setAttribute("class", "shell splash-blurred");
                    region.setAttribute("data-region-name", "ApplicationRegion");
                    region.setAttribute("data-region-adapter", "geocortex.framework.ui.MultiDivRegionAdapter");
                    hostElement.appendChild(region);
                    // Instancing the ViewerApplication.
                    var viewer = new geocortex.essentialsHtmlViewer.ViewerApplication(viewerConfigUri, hostElement, viewerId);
                    // Applying some important properties.
                    viewer.shellName = shell;
                    viewer.viewerConfigPath = viewerConfigPath;
                    viewer.debugMode = debug;
                    viewer.urlParameters = query;
                    viewer.isOffline.set(offline);
                    viewer.event("SiteInitializingEvent").once(window, function () {
                        essentialsHtmlViewer.Splash.getDefaultSplash().close();
                    });
                    viewer.event("SiteInitializedEvent").subscribe(window, function () {
                        if (options.onSiteInitialized) {
                            options.onSiteInitialized(viewer, _this);
                        }
                    });
                    // Initialization failure events.
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
                    // Any traces that warrant a TraceEvent should get written to the console, as they may occur before any logging modules have been loaded.
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
                    // Initializing and returning the ViewerApplication.
                    viewer.initialize();
                    return viewer;
                }
                catch (error) {
                    this.handleError(error, options.onError);
                }
            };
            /* Locates the relative path to the given viewer's configuration from ViewerSettings.js An administrator can configure
             * a dictionary wherein a viewer alias iss keyed to a property "viewerConfigUri" of a fully-qualified viewer config URI (including shell name)
             * or to a property "url" of the directory where the viewer configuration will be found.
             * This chain of methods will search the viewerSettings dictionary to match an input "viewer" parameter. If no match is found, then
             * the alias will be fed to an Essentials endpoint listed in ViewerSettings.js (set by the Post Installer), which
             * will return a path to the viewer's virtual directory. We then add the path to GVH configuration, recreating the "configBase" parameter.
             * @param options Object literal which specifies `ViewerInitializationOptions` are used internally by `initializeApplication` to setup the `ViewerApplication`.
             * @param onSuccess Callback function for success of operation.
             * @param onError Callback function for failure of operation.
             */
            ViewerLoader.prototype.obtainConfigFromAlias = function (options, onSuccess, onError) {
                var _this = this;
                // We detect a viewer ID from query parameters. Either this ID comes from
                // the "viewer" parameter, in which case it corresponds to the GloballyUniqueViewerID
                // as set in the management pack, or it comes from a legacy parameter (i.e., "configBase"
                // or "viewerConfigUri"), in which case we construct a unique ID of the form "siteID.viewerID",
                // as detected from the path of those parameters.
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
                // Viewer aliases.
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
                    // If siteID has a value, then we have parsed a legacy parameter, and will identify
                    // the viewer via "siteID.viewerID", which the server is expecting.
                    var alias = siteID.length != 0 ? siteID + "." + viewerID : viewerID;
                    // We define a fallthrough error that still honours the legacy parameters, if they are present.
                    var fallthroughError = function () {
                        if (configBase && configBase.length !== 0) {
                            options.configBase = configBase;
                        }
                        else if (viewerConfigUri && viewerConfigUri.length !== 0) {
                            options.viewerConfigUri = viewerConfigUri;
                        }
                        //Will continue loading and display default splash screen
                        onSuccess(true);
                    };
                    this.getViewerSettingsFromJson(function (json) {
                        var hasToken = location.hash.length != 0 && location.hash.startsWith("#gcx-");
                        var endpointsFromJson = json["endpoints"];
                        var viewerSettingsFromJson = json["viewerSettings"] || [];
                        var gotSettingsFromJson = false;
                        viewerSettingsFromJson.forEach(function (setting) {
                            options.splashScreenUrl = setting["splashScreenUrl"] ? setting["splashScreenUrl"] : "";
                            // Search through the viewer settings and proceed if a match is found. If we do not have an alias, we fall through
                            // to default behaviour.
                            if (alias && setting["id"].toLowerCase() === alias.toLowerCase() && !gotSettingsFromJson) {
                                gotSettingsFromJson = true;
                                // Administrators can set a "url", which is the equivalent of "configBase",
                                // or a "viewerConfigUri", which is the full path to the preferred viewer 
                                // configuration file. Either path can be relative to the viewer's host.
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
                        // Send the viewer's alias to the Essentials endpoint(s), if it exists and was not matched above.
                        if (alias && !gotSettingsFromJson && endpointsFromJson && endpointsFromJson[0] && endpointsFromJson[0]["externalUrl"]) {
                            // Encode the alias to send to the endpoint.
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
            /**
             * Loads the resourceSet, and then creates and initializes a `ViewerApplication` object.
             * Unlike the base class super method, this method hitches onto the provided onError option to close the splash screen when an error occurs.
             * Takes `ViewerInitializationOptions` as an argument (as opposed to `ApplicationInitializationOptions` as the super method does).
             * @param options Object literal which specifies `ViewerInitializationOptions` are used internally by `initializeApplication` to setup the `ViewerApplication`.
             */
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
                        // GVH-9842: We'll formally shutdown the application and clean out the host element so there are no memory leaks on browser reload (IE11 & Edge)
                        window.addEventListener("unload", function () {
                            // We'll tear down everything within our host element. We're using jQuery .empty() here since it also removes other constructs such as data and event handlers
                            // from the child elements before removing the elements themselves, which is crucial to avoid memory leaks in IE11/Edge (https://api.jquery.com/empty).
                            // empty(), however only removes bound event handlers, not delegated ones so we need the .off('*') directive as well. (http://stackoverflow.com/questions/11609053/jquery-empty-function-and-event-handlers)
                            // We'll also empty out the document head for good measure before finally shutting down the application.
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
                // Load the resource set in a particular order.
                this.resourceSet.find("dependencies").load({
                    onLoaded: function () {
                        // Once Globalize is loaded, rename it so that Kendo UI (used by charting) can't find it.
                        // Otherwise, it tries to use Globalize for all of its formatting needs, which fails because 
                        // we only load a portion of the library.
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
                                            // After the current resource has finished loading, let's grab the next resource
                                            var nextResource = resourceNames[index];
                                            // There is another resource to load, let's begin loading it
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
                                // Start loading the first resource set
                                loadResource(resourceNames[index]);
                            });
                        });
                        // Handle require errors.
                        /* ESPORT: Disabling loader errors for the time being, as they prevent the viewer from otherwise loading if possible.
                        require.on("error", error => {
                            this.handleError(error, options.onError);
                        });
                        */
                    },
                    onError: function (resource, error) {
                        _this.handleError(error, options.onError);
                    }
                });
            };
            ViewerLoader.prototype.resolveSplashScreenUrl = function (baseUrl, splashScreenUrl) {
                // If splash screen url is absolute don't resolve it
                // Regex source: http://stackoverflow.com/a/19709846
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
            /* A convenience wrapper to retrieve the viewer settings objects from
             * ViewerSettings.json.js
             * @param onSuccess Callback for operation success.
             * @param onError Callback for operation failure.
             */
            ViewerLoader.prototype.getViewerSettingsFromJson = function (onSuccess, onError) {
                getJson("ViewerSettings.json.js", onSuccess, onError);
            };
            /* A function to force an early sign-in if we detect that anonymous access to a site is restricted.
             * @param json The JSON payload of the ViewerSettings object, either from ViewerSettings.json.js or
             * from an Essentials endpoint that the settings file points to.
             * @param hasToken Whether or not we have detected a security token in the HREF.
             * @param securityUrl The stem of the security URL to hit for sign-in. Should conform to
             *      '{host or relative path to Essentials}/security/signin?token_type=fragment&app='
             */
            ViewerLoader.prototype.canPassWithoutRedirect = function (json, hasToken, securityUrl) {
                // Technically the json payload from the Essentials endpoint has an "isAuthenticated" flag, 
                // but we currently always hit the endpoint anonymously and use the client-side token as confirmation
                // of authentication. However, this can lead to the scenario where a user is signed-in but 
                // insufficiently privileged to view a given site, which is caught later in the loading process.
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
            /* A recursive function which takes a list of Essentials enpoints sourced from ViewerSettings.js and passes an alias to the endpoints
             * via an XHR request, in an attempt to retrieve a path to a given viewer's configuration.
             * @param alias The alias of the viewer we wish to see; this is either a globally-unique ID (across a given Essentials installation)
             * or a site ID-viewerID pair of the form siteID{separator}viewerID, which is unique up to Essentials installation.
             * @param options The ViewerInitializationOptions we will modify with a successful config retrieval
             * @param endpoints The endpoints we will poll with alias.
             * @param index The depth of recursion.
             * @param onSuccess The success callback.
             * @param onError The error callback.
             */
            ViewerLoader.prototype.getConfigBaseFromEndpoints = function (endpointParams) {
                var _this = this;
                // In-line destructuring to pass linting.
                var alias = endpointParams.alias, hasToken = endpointParams.hasToken, options = endpointParams.options, endpoints = endpointParams.endpoints, index = endpointParams.index, onSuccess = endpointParams.onSuccess, onError = endpointParams.onError;
                if (index === endpoints.length) {
                    onError();
                }
                else {
                    // The viewers/{alias} endpoint returns a path to the viewer's virtual
                    // directory; we finish the GVH-specific path here.
                    var configSuffix = "/Resources/Config/Default";
                    // Extract the endpoint's path and ensure it is suffix with a '/'.
                    var endpointUrl = String(endpoints[index]["externalUrl"]);
                    if (endpointUrl.endsWith("/") || endpointUrl.endsWith("\\")) {
                        endpointUrl = endpointUrl.slice(0, -1);
                    }
                    endpointUrl += "/";
                    getJson(endpointUrl + alias + "?f=json", function (json) {
                        var configStem = json["url"];
                        // Ensure configStem is not bracketed by slashes, since this is taken care of by
                        // endpointUrl and configSuffix.
                        if (configStem.endsWith("/") || configStem.endsWith("\\")) {
                            configStem = configStem.slice(0, -1);
                        }
                        if (configStem.indexOf("/") === 0 || configStem.indexOf("\\") === 0) {
                            configStem = configStem.slice(0, 1);
                        }
                        options.splashScreenUrl = json["splashScreenUrl"] ? json["splashScreenUrl"] : "";
                        if (options.splashScreenUrl) {
                            // Manager has returned splash screen url relative to site location. 
                            // Parse the base url so that the image's url can be resolved.
                            options.splashScreenUrl = _this.resolveSplashScreenUrl(endpointUrl, options.splashScreenUrl);
                        }
                        if (_this.canPassWithoutRedirect(json, hasToken, endpointUrl + json["securityUrl"])) {
                            // We prepend the endpointUrl to get the appropriate relative path
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
            /* A function which parses out "configBase=..." or "viewerConfigUri=..." parameters from a URL
             * and replaces them with "viewer={alias}".
             * @param url The url to parse.
             * @param alias The viewer alias to replace the configuration parameters.
             */
            ViewerLoader.prototype.replaceConfigParamsWithAliasInUrl = function (url, alias) {
                var paramToRemove = "";
                // We assume that 'configBase' and 'viewerConfigUri' are reserved words, used as parameters
                // to locate a viewer's configuration files. This assumption is case-sensitive.
                var regEx = /((\&|\?)configBase=|(\&|\?)viewerConfigUri=)/;
                var matches = url.match(regEx);
                if (null == matches) {
                    return url;
                }
                // We have a match, which will conform to '&configBase=' (or similar).
                paramToRemove = matches[0];
                // We don't want to capture the first character (either '&' or '?').
                var prefixLength = url.indexOf(paramToRemove) + 1;
                var paramAndSuffix = url.substring(prefixLength);
                var paramLength = paramAndSuffix.indexOf("&") > 0 ? paramAndSuffix.indexOf("&") : paramAndSuffix.length;
                var goodSuffix = url.substring(prefixLength + paramLength);
                return url.substring(0, prefixLength) + "viewer=" + alias + goodSuffix;
            };
            /* A function to load query parameters from the window's HREF, used after dojo is available.
             * @params options The ViewerInitializationOptions we will attach the query parameters to. (Deprecated?)
             */
            ViewerLoader.prototype.loadQueryParams = function (options) {
                if (options === void 0) { options = {}; }
                var q = /^.*\?([^#]*).*$/.exec(location.href);
                return q ? dojo.queryToObject(q[1]) : {};
            };
            /* A function to extract the site ID from a URL. Note that we assume "/sites/" will only appear in the url
             * if it signifies the actual sites directory of an Essentials install; this assumption can be thwarted if,
             * for example, a user names a site "Site".
             * @param url The URL which includes the "/sites/" directory.
             */
            ViewerLoader.prototype.getSiteIDFromConfig = function (url) {
                var lowerCaseUrl = url.toLowerCase();
                var startIndex = lowerCaseUrl.indexOf("/sites/") + 7 || lowerCaseUrl.indexOf("\\sites\\") + 7;
                var truncUrl = url.substr(startIndex);
                var endIndex = truncUrl.indexOf("/") || truncUrl.indexOf("\\");
                return truncUrl.substr(0, endIndex);
            };
            /* A function to extract a viewer ID from a URL. Note that we assume "/viewers/" will only appear in
             * the url if it signifies the actual viewers directory of a particular site; this assumption can be
             * thwarted if, for example, a user names a site "Viewers".
             * @param url The URL which includes the "/viewers/" directory.
             */
            ViewerLoader.prototype.getViewerIDFromConfig = function (url) {
                var lowerCaseUrl = url.toLowerCase();
                var startIndex = lowerCaseUrl.toLocaleLowerCase().indexOf("/viewers/") + 9 || lowerCaseUrl.indexOf("\\viewers\\") + 9;
                var truncUrl = url.substr(startIndex);
                var endIndex = truncUrl.indexOf("/") || truncUrl.indexOf("\\");
                return truncUrl.substr(0, endIndex);
            };
            /**
              * ViewerLoader variety of handleError destroys the splash screen.
              */
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
        /* A function to parse an object in JSON format.
         * @param objectToParse the object to parse as JSON.
         */
        function tryParseJson(objectToParse) {
            try {
                var obj = JSON.parse(objectToParse);
                // JSON.parse(arg) does not throw an exception if arg is a bool, number, or null.
                if (obj && typeof obj === "object") {
                    return obj;
                }
            }
            catch (e) {
                return { "error": { "message": "Could not parse response. Error: " + e } };
            }
        }
        essentialsHtmlViewer.tryParseJson = tryParseJson;
        /* A wrapper function to extract a JSON object from an XMLHttpRequest.
         * @param url The url to hit for the request.
         * @param onSuccess The success callback.
         * @param onError The error callback.
         */
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
        /* A convenience function to make an XMLHttpRequest.
         * @param url The url to hit for the request.
         * @param onSuccess The success callback.
         * @param onError The error callback.
         */
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
// Legacy support for viewerConfig global.
window["shellName"] = geocortex.essentialsHtmlViewer.ViewerLoader.determineAppropriateShell();
