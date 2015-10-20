/// <reference path="Framework.d.ts" />
/// <reference path="Mapping.Infrastructure.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="jquery.cleditor.d.ts" />
/// <reference path="arcgis-js-api.d.ts" />
declare module geocortex.essentialsHtmlViewer.management.infrastructure.CLEditorUtils {
    /**
     * Fixes the observable vinding to properly track the state of the editor.
     * Without this fix changes to the observable will be reflected in the editor but
     * changes to the editor do not get immediately reflected in the observable.
     *
     * If/when ViewBase supports pluggable bindings this might be something that can
     * be refactored into it.
     */
    function bindObservable(editor: CLEditor, observable: Observable<string>): void;
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure {
    /**
     * This class provides slight enhancements to the viewer app being managed.
     * This is not the app that is doing the managing.
     */
    class ManagedApplication extends geocortex.essentialsHtmlViewer.ViewerApplication {
        private _availableResourceKeys;
        viewerId: string;
        siteId: string;
        constructor(configObject: any, hostElement?: HTMLElement, id?: string, configTokens?: {
            [token: string]: string;
        });
        /**
         * Performs a callback function when all the libraries have been loaded. If the libraries
         * are already loaded when this function is called, the callback function will execute
         * immediately.
         * @param scope The scope to using when executing the callback - i.e. the value of
         * the 'this' variable in the callback function. This parameter may be ommitted in which cased
         * the first parameter will be used as the callback function.
         * @param callback The callback function to execute.
         */
        doWhenLibrariesLoaded(scope: any, callback?: (app: ManagedApplication) => void): void;
        /**
         * Gets a list of all the available resource keys for this application, in the current locale.
         */
        getAvailableResourceKeys(libraryId: string): string[];
        /**
         * General purpose function used to add resouce keys to an object
         */
        private addToKeys(resourceDictionaries, libraryId, keysObj);
    }
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure {
    interface ManagedConfigInfo {
        configUri: string;
        previewUri: string;
        name: string;
    }
    class ManagementApplication extends geocortex.essentialsHtmlViewer.ViewerApplication {
        /**
         * A grab bag of key-value pairs represented as an object. Each value should be the URI
         * of a particular endpoint that a module or infrastructural component may need, that can
         * be looked up by key. As an example, a theoretical "offline" module may need a URI for
         * performing provisioning on the server.
         * @type Object
         */
        managementEndPoints: {
            virtualDir?: string;
            metaSaveUri?: string;
            metaUri?: string;
            saveUri?: string;
            tagsUri?: string;
        };
        /**
         * An array of ManagedConfigurations. There will be one entry for each item in the managedConfigInfos
         * collection.
         * @type Array(ManagedConfiguration)
         */
        managedConfigs: ManagedConfiguration[];
        /**
         * An array of managed config infos. Each managed config info should have three properties:
         * configUri, previewUri, and name. This is the collection of configs that the application
         * should manage. The JSON file for each config URI will be downloaded, and then represented
         * as a ManagedConfiguration which will be made available for editing.
         * @type Array(Object)
         */
        managedConfigInfos: ManagedConfigInfo[];
        /**
         * The parsed representation of the Meta.json.js file.
         * @type Object
         */
        metadata: any;
        /**
         * A handler callback function that should be invoked whenever a user wants to browse
         * for a file. This allows for a third party integration of the Management components
         * to define its own browse behavior.
         * @type Function
         */
        browseResourceHandler: (element: HTMLElement, input: HTMLElement, fxn: Function) => void;
        /**
         * A flag to keep track of whether the parent application class has been initialized.
         * We don't want to raise our own initialized event until this has happened.
         * @private
         */
        _frameworkInitialized: boolean;
        /**
         * Used by the offline module.
         */
        viewerFrameworks: string[];
        /**
         * @private
         */
        private _libraryId;
        /**
         * Initializes a new instance of the {@link geocortex.essentialsHtmlViewer.management.infrastructure.Application} class.
         * @class
         * <p>Represents a management application instance.</p>
         * <p>Extends {@link geocortex.framework.application.Application} and also provides loading of managed configurations.
         * Begins the initialization of managed applications and their corresponding sites. When this Application
         * is initialized, then the "ManagementAppInitialized" event is raised. At this point the managed
         * configurations have been loaded, and the management modules are free to begin build their user interfaces
         * to show the configuration.
         * </p>
         * @constructs
         * @memberOf geocortex.essentialsHtmlViewer.management.infrastructure
         */
        constructor(configObject: any, hostElement?: HTMLElement, id?: string, configTokens?: {
            [token: string]: string;
        });
        /**
         * Initializes the application and begins download of the managed configurations defined through the
         * managedConfigInfos property.
         */
        initialize(): void;
        /**
         * Begins downloading the configurations and after each one is downloaded,
         * parses the configuration, begins initializing the corresponding managed
         * applications, and calls the function to check to see if we're done initializing.
         * @private
         */
        private _loadConfigs();
        /**
         * Begins downloading the metadata and after is downloaded, parses the metadata and
         * calls the function to check to see if we're done initializing.
         * @private
         */
        private _loadMeta();
        /**
        * Performs a check to see if initialization is done, and if it is,
        * raises the ManagementAppInitialized event.
        * @private
        */
        private _tryFinishInitialization();
        /**
        * Submits the changes to the specified managed configurations to the server.
        * The server side request is specified by managementEndPoints.saveUri and it
        * is expected to take a configUri query string parameter, and JSON content
        * in a POST body.
        * @param managedConfigs The configurations to submit to the server, or all of the
        * managed configurations if this parameter is not specified.
        */
        saveViewer(managedConfigs: ManagedConfiguration[]): dojo.Deferred;
        /**
        * Submits the changes to the metadata configuration to the server.
        * The server side request is specified by managementEndPoints.metaSaveUri and it
        * is expected to take a POST body with the metadata JSON in it.
        */
        saveMeta(): dojo.Deferred;
    }
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure.utils {
    /**
     * Perform a right to left copy of properties.  Much like dojo.mixin(), but this method
     * also works with Observables.  So Observables will have their get() and set() methods called
     * rather than just a full property replacement.
     * @param obj1 {Object} The object to copy properties into.
     * @param obj2 {Object} The object to copy properties from.
     * @param properties {Array(String)} An optional list of properties to include in the mixin.
     * Properties that are not included in this list will not be copied. If this parameter is not specified,
     * all properties from obj2 will be copied into obj1.
     * @param matchingPropertiesOnly {Boolean} A flag which if set to true, will mean that only properties that exist
     * in the target will be updated. i.e. New properties will not be created. Only updates of existing properties
     * in the target will occur.
     */
    function mixin(obj1: any, obj2: any, properties?: string[], matchingPropertiesOnly?: boolean): void;
    /**
     * First creates an invisible DIV as a direct child at the end of the document,
     * and then creates an ESRI map control that uses this DIV. The DIV is given a random
     * ID.
     * @return The ESRI Map control.
     */
    function createHiddenEsriMap(): esri.Map;
    function htmlDecode(text: string): string;
    function unescapeSiteStrings(site: geocortex.essentials.Site): void;
    function toPropertyDescriptor(value: any): PercentagePropertyDescriptor;
    function toPropertyValue(descriptor: PercentagePropertyDescriptor): string | number;
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure {
    interface ManagedConfigurationRoot {
        configuration: geocortex.framework.config.ConfigJson;
    }
    class ManagedConfiguration {
        /**
         * The raw managed configuration object. This is *the* object graph that management modules
         * will ultimately want to update. This is the thing that will be posted to the server (as JSON)
         * when the application is saved.
         * @type Object
         */
        root: ManagedConfigurationRoot;
        /**
         * The URI of the configuration to load.
         * @type String
         */
        configUri: string;
        /**
         * The URI to launch to preview the changes to this managed configuration.
         * @type String
         */
        previewUri: string;
        /**
         * The friendly display name for this managed configuration. For example, something like "Desktop" or "Handheld".
         * @type String
         */
        name: string;
        /**
         * A reference to the management application.
         */
        app: ManagementApplication;
        /**
         * An initialized application that we're managing (editing). This is the app that's been initialized
         * from the managed configuration. The managedApp will have had most of its modules removed, but it
         * can still be used for language string lookup and translation.
         */
        managedApp: ManagedApplication;
        /**
         * Initializes a new instance of the {@link geocortexgeocortex.essentialsHtmlViewer.management.infrastructure.ManagedConfiguration} class.
         * @class
         * <p>Represents a managed configuration instance.</p>
         * <p>A ManagedConfiguration wraps a raw configuration object with some useful
         * helper methods to be able to do things like find modules, views, and view modules
         * within that configuration. The ManagedConfiguration also stores a reference to an
         * initialized managed application (albeit with most of its modules disabled).
         * </p>
         * @constructs
         * @memberOf geocortex.essentialsHtmlViewer.management.infrastructure
         */
        constructor(config?: ManagedConfigurationRoot);
        /**
         * Adds a module to the configuration model.
         * @param moduleConfig The entire module declaration.
         */
        addModuleConfig(moduleConfig: geocortex.framework.config.ModuleJson): void;
        /**
         * Removes a module from the configuration model.
         * @param moduleConfig The entire module declaration.
         */
        removeModule(mod: geocortex.framework.config.ModuleJson): void;
        /**
         * Gets the configuration property of the root.
         */
        getConfiguration(): geocortex.framework.config.ConfigJson;
        /**
         * Gets the array of modules.
         */
        getModules(): geocortex.framework.config.ModuleJson[];
        /**
         * Gets an entire module declaration from a module type.
         */
        findModuleByType(moduleType: string): geocortex.framework.config.ModuleJson;
        /**
         * Gets the module's configuration section from a module type.
         */
        findModuleConfigByType(moduleType: string): any;
        /**
         * Finds a module based on a set of matching properties.
         * @param properties {Object} An object of properties that need to match
         * the module in order for that module to be returned.
         */
        findModule(properties: any): geocortex.framework.config.ModuleJson;
        /**
         * Finds a set of modules based on a set of matching properties.
         * @param properties {Object} An object of properties that need to match
         * the module in order for that module to be returned.
         */
        findModules(properties: any): geocortex.framework.config.ModuleJson[];
        /**
         * Finds a view with the matching type, with the matching module type.
         * @param moduleType {String} The type of the module.
         * @param viewType {String} The type of the view.
         */
        findViewByType(moduleType: string, viewType: string): geocortex.framework.config.ViewJson;
        /**
         * Finds a view model with the matching type, with the matching module type.
         * @param moduleType {String} The type of the module.
         * @param viewModelType {String} The type of the view model.
         */
        findViewModelByType(moduleType: string, viewModelType: string): geocortex.framework.config.ViewModelJson;
        /**
         * Gets the library ID of the specified module.
         * @param module Either a module itself, or its type name.
         */
        getLibraryId(mod: geocortex.framework.config.ModuleJson): string;
        getLibraryId(mod: string): string;
        /**
         * Initializes the application that this instance is managing the configuration of.
         * This is a "lean" initialization, with the modules disabled. However, the initialized
         * application can still be used for language key lookup and translation.
         */
        initializeManagedApp(): void;
        /**
         * Finds a view in a module with the specified properties that must match the module declaration.
         * @param module {Object} The module to look for the view in.
         * @param properties {Object} The properties to match for the module.
         */
        static findViewInModule(mod: geocortex.framework.config.ModuleJson, properties: any): geocortex.framework.config.ViewJson;
        /**
         * Finds matching views in a module with the specified properties that must match the module declaration.
         * @param module {Object} The module to look for the view in.
         * @param properties {Object} The properties to match for the module.
         */
        static findViewsInModule(mod: geocortex.framework.config.ModuleJson, properties: any): geocortex.framework.config.ViewJson[];
        /**
         * Finds a view model in a module with the specified properties that must match the module declaration.
         * @param module {Object} The module to look for the view model in.
         * @param properties {Object} The properties to match for the module.
         */
        static findViewModelInModule(mod: geocortex.framework.config.ModuleJson, properties: any): geocortex.framework.config.ViewModelJson;
        /**
         * Finds matching view models in a module with the specified properties that must match the module declaration.
         * @param module {Object} The module to look for the view models in.
         * @param properties {Object} The properties to match for the module.
         */
        static findViewModelsInModule(mod: geocortex.framework.config.ModuleJson, properties: any): geocortex.framework.config.ViewModelJson[];
        /**
         * Determines if a candidate object matches the specified properties.
         * @private
         * @return true if the object matches, otherwise false.
         */
        private static _isMatch(candidate, properties);
    }
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure {
    interface PercentagePropertyDescriptor {
        propertyValue: any;
        numericValue: number;
        isPercentage: boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure {
    class ShellSectionView extends geocortex.framework.ui.ViewBase {
        managedConfigs: infrastructure.ManagedConfiguration[];
        /**
         * Initializes a new instance of the {@link geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView} class.
         * @class
         * <p>
         * Represents a view that can manage configuration for either a single shell (form factor) or a collection
         * of shells simultaneously.
         * </p>
         * @constructs
         * @memberOf geocortex.essentialsHtmlViewer.management.infrastructure
         */
        constructor(app: framework.application.Application, libraryId: string);
        /**
         * A life cycle event that will be called by infrastructure when the configuration has been loaded.
         * The view should update itself so that it is representing the supplied configurations. Realistically,
         * the view can only show one of these, so by convention, the first configuration should be used.
         */
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        /**
         * A life cycle event that indicates that a view's configuration and visual state should be updated
         * to represent the supplied view model. All of the managed configurations that this view is managing
         * should be updated when this method is called.
         */
        applyViewModel(viewModel: any): void;
        /**
         * A utility function which fetches the configuration for a given module.
         */
        getModuleConfigByType(moduleType: string): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.infrastructure.validator {
    /**
     * Validates a property which is known to be required. If the property is invalid then the
     * message property will be set to the error message. If the property is valid, then the
     * message property will be set to the empty string.
     * @param valueProperty {Observable} An Observable property to validate.
     * @param messageProperty {Observable} An Observable property which will have
     * its value set to the error message if the required property is not set (not valid).
     * @param errorMessage {String} The error message to set if the property is not set (not valid).
     * @return true if valid; false if not.
     */
    function validateRequiredProperty(valueProperty: Observable<string>, messageProperty: Observable<string>, errorMessage: string): boolean;
}
