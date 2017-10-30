/// <reference path="Essentials.d.ts" />
/// <reference path="Mapping.Infrastructure.d.ts" />
declare module geocortex.framework.application.loading {
    interface ApplicationInitializationOptions {
        hostElement?: HTMLElement;
        onInitialized?: (application: Application, loader: ApplicationLoader) => void;
        onError?: (error: Error, loader: ApplicationLoader, application?: Application) => void;
    }
}
declare module geocortex.framework.application.loading {
    class ApplicationLoader {
        resourceSet: resources.ResourceSet;
        private _isUnloading;
        constructor(resourceSet?: resources.ResourceSet);
        initializeApplication(options: ApplicationInitializationOptions): Application;
        loadAndInitialize(options?: ApplicationInitializationOptions): void;
        protected handleError(error: Error, handler?: (error: Error, loader: ApplicationLoader) => void, application?: Application): void;
    }
}
declare module geocortex.framework.application.loading {
    class CaselessMap {
        [key: string]: any;
        constructor(obj?: {});
        find(name: string): {
            name: string;
            value: any;
        };
        has(name: string): boolean;
        get(name: string): any;
        getAsBoolean(name: string): boolean;
        set(name: string, value: any): CaselessMap;
        merge(obj: {}): CaselessMap;
    }
}
declare module geocortex.essentialsHtmlViewer {
    class Splash {
        splashOverlay: HTMLElement;
        useTransitions: boolean;
        constructor(splashOverlay: HTMLElement, useTransitions?: boolean);
        static getDefaultSplash(): Splash;
        display(splashScreenUrl?: string): Splash;
        destroy(): Splash;
        close(animationDuration?: number): Splash;
    }
}
declare module geocortex.essentialsHtmlViewer {
    interface ViewerInitializationOptions extends framework.application.loading.ApplicationInitializationOptions {
        debug?: boolean;
        aliases?: {
            [viewerName: string]: string;
        };
        offline?: boolean;
        configBase?: string;
        shell?: string;
        viewerConfigUri?: string;
        query?: geocortex.framework.application.loading.CaselessMap;
        onSiteInitialized?: (viewer: ViewerApplication, loader: ViewerLoader) => void;
        splashScreenUrl?: string;
    }
}
declare module geocortex.essentialsHtmlViewer {
    class ViewerLoader extends framework.application.loading.ApplicationLoader {
        static initialize(): void;
        static determineAppropriateShell(userAgent?: string): string;
        aliases: framework.application.loading.CaselessMap;
        addAlias(aliasName: string, configBase: string): ViewerLoader;
        constructor(options?: ViewerLoaderOptions);
        initializeApplication(options?: ViewerInitializationOptions): ViewerApplication;
        obtainConfigFromAlias(options: any, onSuccess: any, onError: any): void;
        loadAndInitialize(options?: ViewerInitializationOptions): void;
        private resolveSplashScreenUrl(baseUrl, splashScreenUrl);
        getViewerSettingsFromJson(onSuccess: (arg: any) => void, onError: (err: Error) => void): void;
        canPassWithoutRedirect(json: any, hasToken: any, securityUrl: any): boolean;
        getConfigBaseFromEndpoints(endpointParams: ViewerSettingsEndpointParams): void;
        replaceConfigParamsWithAliasInUrl(url: string, alias: any): string;
        loadQueryParams(options?: ViewerInitializationOptions): Object;
        getSiteIDFromConfig(url: string): string;
        getViewerIDFromConfig(url: string): string;
        protected handleError(error: Error, handler?: (error: Error, loader: ViewerLoader) => void, viewer?: ViewerApplication): void;
    }
    function tryParseJson(objectToParse: any): any;
    function getJson(url: any, onSuccess: any, onError: any): void;
    function xhrGet(url: any, onSuccess: any, onError: any): void;
}
declare module geocortex.essentialsHtmlViewer {
    interface ViewerLoaderOptions {
        loaderResourcePrefix?: string;
        useLocalEsriApi?: boolean;
        baseUrl?: string;
    }
}
declare module geocortex.essentialsHtmlViewer {
    interface ViewerSettingsEndpointParams {
        alias?: string;
        hasToken: boolean;
        endpoints: Object[];
        index: number;
        options?: ViewerInitializationOptions;
        onSuccess?: (displaySplashScreen?: boolean) => void;
        onError?: () => void;
    }
}
declare module geocortex.framework.application.loading {
    class QueryParameters {
        [key: string]: string;
        constructor(url?: string);
    }
}
declare module geocortex.framework.application.resources {
    class Resource {
        name: string;
        status: ResourceStatus;
        prevResource: Resource;
        constructor(name: string);
        load(options?: ResourceLoadOptions): void;
    }
}
declare module geocortex.framework.application.resources {
    class RequireResource extends Resource {
        static prefixRegex: RegExp;
        module: any;
        load(options?: RequireResourceLoadOptions): void;
    }
    interface RequireResourceLoadOptions extends ResourceLoadOptions {
        onLoaded?: (resource: Resource, module?: any) => void;
    }
}
declare module geocortex.framework.application.resources {
    interface ResourceLoadOptions {
        parent?: ResourceSet;
        onNext?: (resource: Resource) => void;
        onPending?: (resource: Resource) => void;
        onLoaded?: (resource: Resource) => void;
        onError?: (resource: Resource, error: Error) => void;
    }
}
declare module geocortex.framework.application.resources {
    class ResourceSet extends Resource implements ResourceSetLiteral {
        resources: Resource[];
        constructor(name: string, items?: ResourceItem[]);
        load(options?: ResourceLoadOptions): void;
        executePending(): void;
        getAllResources(): Resource[];
        find(resourceName: string): Resource;
        add(items: ResourceItem[], prepend?: boolean): ResourceSet;
        append(items: ResourceItem[]): ResourceSet;
        prepend(items: ResourceItem[]): ResourceSet;
        protected static interpretItemAsResource(item: ResourceItem): Resource;
        protected static generateResourceSetFromLiteral(literal: ResourceSetLiteral): ResourceSet;
    }
    type ResourceItem = string | Resource | ResourceSetLiteral | (() => void | string | Resource | ResourceSetLiteral);
    interface ResourceSetLiteral {
        name: string;
        resources: ResourceItem[];
    }
}
declare module geocortex.framework.application.resources {
    enum ResourceStatus {
        Unloaded = 0,
        Loading = 1,
        Pending = 2,
        Loaded = 3,
        Error = 4,
    }
}
declare module geocortex.framework.application.resources {
    enum ScriptLoadingMode {
        Concurrent = 0,
        ConcurrentLegacyIE = 1,
        Sequential = 2,
    }
    class ScriptResource extends Resource {
        static loadingMode: ScriptLoadingMode;
        static concurrentLegacyIEInterval: number;
        protected pendingExecution: HTMLScriptElement;
        constructor(url: string);
        protected static detectScriptLoadingMode(userAgent?: string, documentMode?: number): ScriptLoadingMode;
        protected static sniffScriptLoadingMode(userAgent?: string, documentMode?: number): ScriptLoadingMode;
        load(options?: ResourceLoadOptions): void;
        executePending(): void;
    }
}
declare module geocortex.framework.application.resources {
    class StyleResource extends Resource {
        constructor(href: string);
        load(options?: ResourceLoadOptions): void;
    }
}
