/// <reference path="Essentials.d.ts" />
/// <reference path="Mapping.Infrastructure.d.ts" />
declare module geocortex.essentialsHtmlViewer {
    /**
     * Represents and controls the behavior of the splash screen.
     * Auto-detects CSS transition support.
     */
    class Splash {
        /** The root DOM node of the splash screen. */
        splashOverlay: HTMLElement;
        /** Whether or not to take advantage of CSS transitions for animations. */
        useTransitions: boolean;
        /**
         * @param splashOverlay The root HTMLElement of the splash screen.
         * @param useTransitions Boolean indicating whether CSS transitions should be used for animating the splash screen. Defaults to autodetecting CSS transition support.
         */
        constructor(splashOverlay: HTMLElement, useTransitions?: boolean);
        /**
         * Create a new Splash instance for controlling the default existing splash screen markup by the classname "splash-overlay".
         */
        static getDefaultSplash(): Splash;
        /**
         * Destroys the splash screen, removes splashOverlay from the DOM.
         * @returns This instance (chainable).
         */
        destroy(): Splash;
        /**
         * Closes the splash screen with a fade-out animation (where CSS transitions are available).
         * @param animationDuration The amount of time, in milliseconds, that the fade-out animation should last.
         * @returns This instance (chainable).
         */
        close(animationDuration?: number): Splash;
    }
}
declare module geocortex.framework.application.loading {
    /**
     * A CaselessMap is simply an object which has methods for accessing its properties in a case-insensitive way.
     */
    class CaselessMap {
        [key: string]: any;
        /**
         * Construct a new CaselessMap. Pass in an object and the CaselessMap will gain all of its properties.
         * @param obj Object from which to base the new CaselessMap. Own properties from this object will be added to
         * the new CaselessMap.
         */
        constructor(obj?: {});
        /**
         * Returns information about the first property to match a case-insensitive comparison with the given `name`.
         * @param name Name of the property to find.
         * @returns Object containing `name` and `value` properties, or undefined if the property isn't found.
         */
        find(name: string): {
            name: string;
            value: any;
        };
        /**
         * Case-insensitive check for whether the given own property is present in the CaselessMap.
         * @param name Name of the property.
         * @returns true if the property is present, otherwise false.
         */
        has(name: string): boolean;
        /**
         * Case-insensitive getter for any own property on this CaselessMap.
         * @param name Name of the property.
         * @returns The value of the property, otherwise undefined if the property isn't found.
         */
        get(name: string): any;
        /**
         * Case-insensitive check for an own property's truthiness, where mere presence implies truth.
         * Any string value except "false" (case-insensitive) will evaluate to true.
         * @param name Name of the property.
         * @returns True if the property isn't "false" (case-insensitive), false, or null.
         */
        getAsBoolean(name: string): boolean;
        /**
         * Case-insensitive property setter.
         * Finds the property which matches the given `name` and assigns it the given `value`.
         * @param name Name of the property.
         * @param value Value to be assigned onto the property.
         * @returns this (chainable).
         */
        set(name: string, value: any): CaselessMap;
        /**
         * Case-insensitive merge operation, copying every own property from the given object onto this Caseless map.
         * @param obj Object from which to add all own properties to this CaselessMap.
         * @returns this (chainable).
         */
        merge(obj: {}): CaselessMap;
    }
}
declare module geocortex.framework.application.resources {
    /**
     * Options for loading a Resource.
     */
    interface ResourceLoadOptions {
        /** The parent ResourceSet for a Resource (or nothing). */
        parent?: ResourceSet;
        /** Called when it is safe to start loading another Resource. */
        onNext?: (resource: Resource) => void;
        /** Called when a Resource has finished downloading, but hasn't yet been executed (Specific to ScriptLoadingMode.ConcurrentLegacyIE). */
        onPending?: (resource: Resource) => void;
        /** Called when a Resource is downloaded and executed.*/
        onLoaded?: (resource: Resource) => void;
        /** Called when loading this Resource fails in error. */
        onError?: (resource: Resource, error: Error) => void;
    }
}
declare module geocortex.framework.application.resources {
    /**
     * The status of a loadable Resource.
     */
    enum ResourceStatus {
        /** Loading has not yet begun. */
        Unloaded = 0,
        /** Loading is in progress. */
        Loading = 1,
        /** Downloaded, but awaiting execution by the execution manager (specific to ScriptLoadingMode.ConcurrentLegacyIE). */
        Pending = 2,
        /** Loading has completed. */
        Loaded = 3,
        /** Loading has failed. */
        Error = 4,
    }
}
declare module geocortex.framework.application.resources {
    /**
     * This base class represents anything that is idempotently loadable in a performance-conscious way.
     */
    class Resource {
        /**
         * Name of the Resource (might double as the resource's URI).
         */
        name: string;
        /**
         * The loading status of this ResourceSet.
         */
        status: ResourceStatus;
        /**
         * The previously defined resource. This resource may depend on the previous one. If so, this resource should not be
         * realized until the previous one has.
         */
        prevResource: Resource;
        /**
         * @param name The name string for this Resource. In some cases, this name is a URI.
         */
        constructor(name: string);
        /**
         * Load this Resource.
         */
        load(options?: ResourceLoadOptions): void;
    }
}
declare module geocortex.framework.application.resources {
    /**
     * Techniques available for loading scripts dynamically.
     */
    enum ScriptLoadingMode {
        /** Loads scripts simultaneously using 'script.async=false' mode in modern browsers. */
        Concurrent = 0,
        /** Workaround for 'script.async=false' that works in old IE. */
        ConcurrentLegacyIE = 1,
        /** Fallback loading that works on all browsers. */
        Sequential = 2,
    }
    /**
     * Represents a script resource that can be loaded once (idempotently).
     */
    class ScriptResource extends Resource {
        /** The mode under which this script will or has been loaded. */
        static loadingMode: ScriptLoadingMode;
        static concurrentLegacyIEInterval: number;
        /** Special property for ConcurrentLegacyIE ScriptLoadingMode: a downloaded script will sit here pending, ready to be executed. */
        protected pendingExecution: HTMLScriptElement;
        /**
         * @param name: URL to load the script from.
         */
        constructor(url: string);
        /**
         * Determines the ScriptLoadingMode based on feature detection.
         */
        protected static detectScriptLoadingMode(userAgent?: string, documentMode?: number): ScriptLoadingMode;
        /**
         * Determines the ScriptLoadingMode based on user agent sniffing.
         * Guilty until proven innocent.
         * @deprecated
         */
        protected static sniffScriptLoadingMode(userAgent?: string, documentMode?: number): ScriptLoadingMode;
        /**
         * Loads this ScriptResource with the technique described by ScriptResource.loadingMode.
         */
        load(options?: ResourceLoadOptions): void;
        /**
         * Executes this script when it's in Pending state.
         * Specific to ScriptLoadingMode.ConcurrentLegacyIE.
         */
        executePending(): void;
    }
}
declare module geocortex.framework.application.resources {
    /**
     * Represents a stylesheet resource that can be loaded idempotently (one time).
     */
    class StyleResource extends Resource {
        /**
         * @param href Stylesheet URL that is also used as this Resource's name.
         */
        constructor(href: string);
        /**
         * Load this stylesheet resource idempotently.
         * Warning: Unfortunately, there's no good cross-browser way to detect when a stylesheet has actually finished loading, so this load method will actually fire the onLoaded callback immediately after the stylesheet <link> is injectected into the DOM.
         * The stylesheets will be injected in the same order that they are loaded, so CSS precedence will be preserved.
         */
        load(options?: ResourceLoadOptions): void;
    }
}
declare module geocortex.framework.application.resources {
    /**
     * ResourceSet is a named collection of Resources, which itself is a loadable Resource (and is therefore nestable).
     * Using `find`, you can obtain any child Resource by name (including this ResourceSet).
     * Can be manipulated via public the `resources` array, and `append` and `prepend` methods.
     * Call the `load` method to start recursively loading the entire set and everything within it.
     * All loading happens idempotently (only once, subsequent calls do nothing).
     * To accomodate for `ScriptLoadingMode.ConcurrentLegacyIE`, this class has special handling for managing the ordered execution of 'pending' ScriptResources.
     */
    class ResourceSet extends Resource implements ResourceSetLiteral {
        /** This ResourceSet's internal collection of Resources. */
        resources: Resource[];
        /**
         * Construct a ResourceSet given a name, and any number of ResourceItems which are interpreted into valid Resource instances.
         * @param name String name for this ResourceSet.
         * @param items Any number of ResourceItems.
         */
        constructor(name: string, items?: ResourceItem[]);
        /**
         * Idempotently load every Resource within this ResourceSet, recursively.
         */
        load(options?: ResourceLoadOptions): void;
        /**
         * Recursively executes all pending children, in the correct order.
         * Specific to ScriptLoadingMode.ConcurrentLegacyIE.
         */
        executePending(): void;
        /**
         * Returns an array containing this ResourceSet, and also every Resource within it. Recursive.
         * @returns Array of Resources.
         */
        getAllResources(): Resource[];
        /**
         * Loops through all resources and returns the Resource object with the matching `name` property.
         * @param resourceName The `name` string of the Resource that we are looking for.
         * @returns Resource object that was found, or null if no Resource matched by name.
         */
        find(resourceName: string): Resource;
        /**
         * Interpret the given items as Resources, and then append or prepend them to this ResourceSet.
         * @param items Array of ResourceItems to add to this ResourceSet.
         * @param prepend Boolean representing whether or not the ResourceItems should be prepended instead of appended.
         * @returns This ResourceSet (chainable).
         */
        add(items: ResourceItem[], prepend?: boolean): ResourceSet;
        /**
         * Sugar for `add`. Interpret items as Resources, and add them onto the end of this ResourceSet's collection of resources.
         * @param items Array of ResourceItems to be appended to this ResourceSet.
         * @returns This ResourceSet (chainable).
         */
        append(items: ResourceItem[]): ResourceSet;
        /**
         * Sugar for `add`. Interpret items as Resources, and add them to the beginning of this ResourceSet's collection of resources.
         * @param items Array of ResourceItems to be prepended to this ResourceSet.
         * @returns This ResourceSet (chainable).
         */
        prepend(items: ResourceItem[]): ResourceSet;
        /**
         * Transform a `ResourceItem` into a `Resource`.
         * @param item The ResourceItem to transform into a real Resource.
         * @returns Appropriate Resource class instance that the item represented.
         */
        protected static interpretItemAsResource(item: ResourceItem): Resource;
        /**
         * Convert an object literal conforming to ResourceSetLiteral into a ResourceSet instance.
         * @param literal The ResourceSetLiteral object literal that will be used as the basis of a new ResourceSet instance.
         * @returns A ResourceSet instance.
         */
        protected static generateResourceSetFromLiteral(literal: ResourceSetLiteral): ResourceSet;
    }
    /**
     * A ResourceItem is any value that can be transformed into a Resource via interpretItemAsResource.
     */
    type ResourceItem = string | Resource | ResourceSetLiteral | (() => void | string | Resource | ResourceSetLiteral);
    /**
     * If an object literal desires to become a real ResourceSet one day, it must conform to this interface.
     */
    interface ResourceSetLiteral {
        /** Name of the Resource (usually is the URI). */
        name: string;
        /** Child resources within this ResourceSet. */
        resources: ResourceItem[];
    }
}
declare module geocortex.framework.application.loading {
    /**
     * Options that are used by `ApplicationLoader` to initialize a `framework.application.Application`.
     */
    interface ApplicationInitializationOptions {
        /**
         * The DOM element in which the `framework.application.Application` will live.
         */
        hostElement?: HTMLElement;
        /**
         * Callback that is called when the `ResourceSet` has loaded and the `Application` has been initialized.
         */
        onInitialized?: (application: Application, loader: ApplicationLoader) => void;
        /**
         * Callback that is called when the `ResourceSet` fails to load, or the `Application` fails to initialize.
         */
        onError?: (error: Error, loader: ApplicationLoader, application?: Application) => void;
    }
}
declare module geocortex.essentialsHtmlViewer {
    /**
     * Options used by `ViewerLoader` to load resources (prior to application initialization).
     */
    interface ViewerLoaderOptions {
        /** Prefix string prepended to all locally hosted resources. Defaults to "./". */
        baseUrl?: string;
        /** Whether or not load Esri scripts locally or from the cloud. */
        useLocalEsriApi?: boolean;
    }
}
declare module geocortex.essentialsHtmlViewer {
    /**
     * Options used by `ViewerLoader` to initialize a `ViewerApplication`.
     */
    interface ViewerInitializationOptions extends framework.application.loading.ApplicationInitializationOptions {
        /**
         * Whether or not to output debug information to the console (whether debugMode should be set on the
         * `ViewerApplication` instance).
         */
        debug?: boolean;
        /**
         * Aliases to full viewerConfigUri's. Specified with the 'viewer' query string parameter.
         */
        aliases?: {
            [viewerName: string]: string;
        };
        /**
         * Whether or not the viewer should be booted in offline mode.
         */
        offline?: boolean;
        /**
         * Specify the directory from which to load a configuration shell. Trailing slash will be added if missing.
         */
        configBase?: string;
        /**
         * Specify which shell to use (override the user agent sniffing which determines the default shell). "Desktop",
         * "Handheld", and "Tablet" are the standard values.
         */
        shell?: string;
        /**
         * Directly specify the URL of a configuration file you want the viewer to initialize with. If you specify
         * this, `configBase` and 'shell' options will be ignored.
         */
        viewerConfigUri?: string;
        /**
         * CaselessMap of query parameters.
         */
        query?: geocortex.framework.application.loading.CaselessMap;
        /**
         * Callback that is called when the `ViewerApplication` fires its "SiteInitializedEvent" framework event.
         */
        onSiteInitialized?: (viewer: ViewerApplication, loader: ViewerLoader) => void;
    }
}
declare module geocortex.framework.application.loading {
    /**
     * Base class which uses a `resources.ResourceSet` to load scripts and stylesheets in a performance-conscious way before creating and initializing a `framework.application.Application`.
     */
    class ApplicationLoader {
        /**
         * The `resources.ResourceSet` that the `framework.application.Application` depends on.
         * It is used to load scripts and stylesheets in a performance-conscious way.
         */
        resourceSet: resources.ResourceSet;
        /**
         * Constructs an `ApplicationLoader` and initializes it with the provided `resources.ResourceSet` or an empty default one.
         * @param resourceSet: The `resources.ResourceSet` that this application depends on. If not provided, an empty ResourceSet is created.
         */
        constructor(resourceSet?: resources.ResourceSet);
        /**
         * Abstract method for creating and initializing a `framework.application.Application`.
         * @param options Options object used to initialize the `framework.application.Application`.
         */
        initializeApplication(options: ApplicationInitializationOptions): Application;
        /**
         * Load the `resources.ResourceSet` that this application depends on, and then create and initialize an application.
         * @param options Options object used to initialize the application.
         */
        loadAndInitialize(options?: ApplicationInitializationOptions): void;
        /**
         * Handles errors related to loading resources or initializing an application.
         */
        protected handleError(error: Error, handler?: (error: Error, loader: ApplicationLoader) => void, application?: Application): void;
    }
}
declare module geocortex.essentialsHtmlViewer {
    /**
     * A `framework.ApplicationLoader` subclass that is specific to the task of embedding the Geocortex Essentials HTML5 Viewer into a webpage.
     */
    class ViewerLoader extends framework.application.loading.ApplicationLoader {
        /**
         * Detect which shell is most appropriate based on user agent sniffing.
         * @param userAgent The user agent string to override (perhaps for testing).
         * @returns Shell profile name string. Can be "Desktop", "Tablet", or "Handheld".
         */
        static determineAppropriateShell(userAgent?: string): string;
        /** Aliases that point to full viewerConfigUri's. Specified via the 'viewer' query string parameter. */
        aliases: framework.application.loading.CaselessMap;
        /**
         * Adds a viewer alias to a configBase.
         */
        addAlias(aliasName: string, configBase: string): ViewerLoader;
        /**
         * Create a ViewerLoader instance and establish a ResourceSet for loading a Geocortex Essentials HTML5 Viewer.
         * @param options: `ViewerLoaderOptions` object literal, containing options used to construct the viewer's ResourceSet.
         */
        constructor(options?: ViewerLoaderOptions);
        /**
         * Create and initialize a `ViewerApplication` instance, using the provided options.
         * @param options Object literal of `ViewerInitializationOptions` that specifies options for initializing a `ViewerApplication`.
         * @returns An initialized `ViewerApplication` instance.
         */
        initializeApplication(options?: ViewerInitializationOptions): ViewerApplication;
        /**
         * Loads the resourceSet, and then creates and initializes a `ViewerApplication` object.
         * Unlike the base class super method, this method hitches onto the provided onError option to close the splash screen when an error occurs.
         * Takes `ViewerInitializationOptions` as an argument (as opposed to `ApplicationInitializationOptions` as the super method does).
         * @param options Object literal which specifies `ViewerInitializationOptions` are used internally by `initializeApplication` to setup the `ViewerApplication`.
         */
        loadAndInitialize(options?: ViewerInitializationOptions): void;
        /**
         * ViewerLoader variety of handleError destroys the splash screen.
         */
        protected handleError(error: Error, handler?: (error: Error, loader: ViewerLoader) => void, viewer?: ViewerApplication): void;
    }
}
