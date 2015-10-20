/// <reference path="dojo.d.ts" />
/// <reference path="webkitwindow.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="filesystem.d.ts" />
declare module geocortex.framework.behaviors {
    interface BehaviorBase {
        (behaviorName: string): TypedBehavior<any>;
    }
}
declare module geocortex.framework.behaviors {
    class Behavior implements TypedBehavior<any> {
        /**
         * Instance of the {@link application.Application} that this behavior belongs to.
         */
        app: geocortex.framework.application.Application;
        /**
         * Name that will be used to retrieve this behavior from the registry.
         */
        name: string;
        /**
         * Array of {@link framework.commands.Command} that will be run when this behavior is executed.
         */
        commands: string[];
        /**
         * The event that triggers this behavior.
         */
        event: string;
        /**
         * The token associated with the event that this behavior is associated with.
         */
        eventToken: string;
        /**
         * Creates a new Behavior - a collection of commands that are run sequentially.
         * @param app The framework Application.
         * @param name The name that can be used to reference the behavior.
         * @param commands The array of commands to be run when the behavior is executed.
         */
        constructor(app: framework.application.Application, name: string, commands: string[], event?: string);
        /**
         * Runs the behavior on demand. Reccomanded when events and commands parameters don't match nicely.
         * @param args A common parameter that will be accepted by all commands executed by the behavior.
         */
        run(args: any): void;
        /**
         * Associates the behavior with an event if there is one present.
         */
        protected _wireUpEvent(): void;
        /**
         * Executes all of the commands associated with this behavior.
         * @param args A common parameter that will be accepted by all commands executed by the behavior.
         */
        protected _executeCommands(args: any): void;
        /**
         * Used to clear any associoated events and to dismiss the commands.
         */
        destroy(): void;
    }
}
declare module geocortex.framework.behaviors {
    interface BehaviorConfig {
        linkedEvent?: string;
        commands: string[];
    }
    interface BehaviorRegistryConfig {
        behaviors: BehaviorConfig[];
    }
    class BehaviorRegistry {
        /**
         * Instance of the {@link application.Application} that this registry belongs to.
         */
        app: application.Application;
        /**
         * Collection of {@link Behaviors} that are stored within the registry.
         */
        behaviors: {
            [behaviorName: string]: Behavior;
        };
        /**
         * Empty behavior to be returned whenever a request for an invalid behavior is made.
         */
        dummyBehavior: Behavior;
        constructor(app: application.Application);
        /**
         * Loads a collection of behaviors from config.
         * Behaviors are stored in a 'behaviors' object, which stores a collection of arrays of commands.
         * Returns an array of the behavior names so that the module can remove them from the registry when it is destroyed.
         * @param scope The scope of the calling function - used to ensure that behaviors are only loaded from modules.
         * @param config The configuration for the associated module.
         */
        loadBehaviorsFromConfig(scope: FrameworkObject, config: any): string[];
        /**
         * Used to add a new behavior to the registry.
         * @param name The name used to access the behavior in the registry.
         * @param commands An array of commands that define the behavior's actions.
         * @param event An (optional) event that can  will trigger the behavior.
         */
        protected addBehavior(name: string, commands: string[], event?: string): void;
        /**
         * Used to remove a behavior from the registry.
         * Also unsubscribes the behavior from its event and clears run commands.
         * @param name The name used to access the behavior in the registry.
         */
        remove(name: string): boolean;
        /**
         * Used to retreive a stored behavior from the registry. If the behavior does not exist then
         * a dummy behavior is returned.
         * @param name The name of the behavior to be retrieved.
         */
        behavior(name: string): void;
    }
}
declare module geocortex.framework.behaviors {
    /**
     * Defines the typed signature for an event. This type is distinct from Event itself as it is a backwards compatible
     * decorator whose job is to create and enforce type signatures using the newer, shortened event syntax.
     */
    interface TypedBehavior<T extends Function> {
        name: string;
        commands: string[];
        event: string;
        eventToken: string;
        run: T;
        destroy: T;
    }
}
declare module geocortex.framework.commands {
    /**
     * Defines the typed signature for a command. Defines the typed signature for a command.
     * This type is distinct from Command itself as it is a backwards compatible decorator whose
     * job is to create and enforce type signatures using the newer, shortened command syntax.
     */
    interface TypedCommand<T extends Function> {
        name: string;
        isWrapper: boolean;
        canExecuteMode: string;
        canExecuteChanged: framework.events.Event;
        preExecute: events.TypedEvent<T>;
        postExecute: events.TypedEvent<T>;
        canExecute: T;
        execute: T;
        register(scope: any, implementation: T, canExecute?: FunctionReturning<boolean>): string;
        unregister(token: string): boolean;
        clear(): void;
        raiseCanExecuteChanged(): void;
    }
}
declare module geocortex.framework.commands {
    /** @private */
    interface CommandsBase {
        (commandName: string): TypedCommand<any>;
    }
    /**
     * Commands exposed by the framework.
     * @private
     */
    interface FrameworkCommands extends CommandsBase {
        /**
         * Activates a view by its ID.
         * @docs-gcx-command geocortex.framework
         * @name ActivateView
         * @param viewId The ID of the view to activate.
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "ActivateView"): TypedCommand<{
            (viewId: string): void;
        }>;
        /**
         * Deactivates a view by its ID.
         * @docs-gcx-command geocortex.framework
         * @name DeactivateView
         * @param viewId The ID of the view to deactivate.
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "DeactivateView"): TypedCommand<{
            (viewId: string): void;
        }>;
        /**
         * Activates or deactivates a view based on its current state.
         * @docs-gcx-command geocortex.framework
         * @name ToggleView
         * @param viewId The ID of the view to toggle.
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "ToggleView"): TypedCommand<{
            (viewId: string): void;
        }>;
        /**
         * Destroys a view, wiping out its bindings and DOM elements.
         * @docs-gcx-command geocortex.framework
         * @name DestroyView
         * @param viewId The ID of the view to destroy.
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "DestroyView"): TypedCommand<{
            (viewId: string): void;
        }>;
        /**
         * Closes the application's modal region, if there is one. The modal region is a singleton region
         * backed by the PopupModalRegionAdapter type.
         * @docs-gcx-command geocortex.framework
         * @name CloseModalRegion
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "CloseModalRegion"): TypedCommand<{
            (): void;
        }>;
        /**
         * Opens a web page in another tab/window.
         * @docs-gcx-command geocortex.framework
         * @name OpenWebPage
         * @param url The URL to open.
         * @introduced 1.0
         * @gcx-command-category Region and View
         */
        (commandName: "OpenWebPage"): TypedCommand<{
            (url: string): void;
        }>;
    }
}
declare module geocortex.framework.events {
    /**
     * Defines the typed signature for an event. This type is distinct from Event itself as it is a backwards compatible
     * decorator whose job is to create and enforce type signatures using the newer, shortened event syntax.
     */
    interface TypedEvent<T extends Function> {
        name: string;
        isPublishing: boolean;
        getSubscriptionHandlerByToken(token: string): Function;
        publish: T;
        subscribe(scope: any, implementation: T): string;
        once(scope: any, implementation: T): string;
        unsubscribe(token: string): boolean;
        clear(): void;
    }
}
declare module geocortex.framework.events {
    interface EventsBase {
        (eventName: string): TypedEvent<any>;
    }
    /**
     * Events exposed by the framework.
     * @private
     */
    interface FrameworkEvents extends EventsBase {
        /**
         * Raised when the application has received and processed its configuration materials.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationConfigLoadedEvent
         * @param configModel The object representing the application's configuration.
         * @introduced 2.0
         * @gcx-event-category Load
         */
        (eventName: "ApplicationConfigLoadedEvent"): TypedEvent<{
            (configModel: any): void;
        }>;
        /**
         * Raised when native application components have been initialized and are ready for use.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationNativeReadyEvent
         * @private
         */
        (eventName: "ApplicationNativeReadyEvent"): TypedEvent<{
            (): void;
        }>;
        /**
         * Raised when native application components have moved to a non-ready state.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationNativeRemovedEvent
         * @private
         */
        (eventName: "ApplicationNativeRemovedEvent"): TypedEvent<{
            (): void;
        }>;
        /**
         * Raised when the application goes into the offline state.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationOfflineEvent
         * @introduced 1.1
         * @gcx-event-category Offline/Online
         */
        (eventName: "ApplicationOfflineEvent"): TypedEvent<{
            (): void;
        }>;
        /**
         * Raised when the application goes into the online state.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationOnlineEvent
         * @introduced 1.1
         * @gcx-event-category Offline/Online
         */
        (eventName: "ApplicationOnlineEvent"): TypedEvent<{
            (): void;
        }>;
        /**
         * Raised when the application is resized.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationResizedEvent
         * @introduced 1.1
         * @gcx-event-category Interface
         */
        (eventName: "ApplicationResizedEvent"): TypedEvent<{
            (): void;
        }>;
        /**
         * Raised when the application has been instructed to shut down.
         * @docs-gcx-event geocortex.framework
         * @name ApplicationShutdownEvent
         * @param state An error or arbitrary piece of state indicating a reason for the shutdown.
         * @introduced 1.0
         * @gcx-event-category Start-Up, Initialization and Shutdown
         */
        (eventName: "ApplicationShutdownEvent"): TypedEvent<{
            (state?: any): void;
        }>;
        /**
         * Raised when an error is encountered while parsing configuration.
         * @docs-gcx-event geocortex.framework
         * @name ConfigurationLoadFailedEvent
         * @param error The error that occurred while attempting to load configuration.
         * @introduced 1.0
         * @gcx-event-category Load
         */
        (eventName: "ConfigurationLoadFailedEvent"): TypedEvent<{
            (error: Error): void;
        }>;
        /**
         * Raised when a library file specified in configuration is successfully marked as having been downloaded.
         * @docs-gcx-event geocortex.framework
         * @name LibraryDownloadedEvent
         * @param libraryId The ID of the library.
         * @introduced 1.0
         * @gcx-event-category Start-Up, Initialization and Shutdown
         */
        (eventName: "LibraryDownloadedEvent"): TypedEvent<{
            (libraryId: string): void;
        }>;
        /**
         * Raised when a module is initialized.
         * @docs-gcx-event geocortex.framework
         * @name ModuleInitializedEvent
         * @param moduleName The configured name of the module that was successfully initialized.
         * @introduced 1.0
         * @gcx-event-category Start-Up, Initialization and Shutdown
         */
        (eventName: "ModuleInitializedEvent"): TypedEvent<{
            (moduleName: string): void;
        }>;
        /**
         * Raised when a view is activated in a region that previously had no active views.
         * @docs-gcx-event geocortex.framework
         * @name RegionActivatedEvent
         * @param regionName The region that was activated.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "RegionActivatedEvent"): TypedEvent<{
            (region: geocortex.framework.ui.RegionAdapterBase): void;
        }>;
        /**
         * Raised when the last active view in a region is deactivated.
         * @docs-gcx-event geocortex.framework
         * @name RegionDeactivatedEvent
         * @param regionName The region that was deactivated.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "RegionDeactivatedEvent"): TypedEvent<{
            (region: geocortex.framework.ui.RegionAdapterBase): void;
        }>;
        /**
         * Raised by each trace operation. Allows pluggable tracing and logging functionality.
         * @docs-gcx-event geocortex.framework
         * @name TraceEvent
         * @param args An object containing the following properties: timestamp, level, message, stack.
         * @introduced 1.0
         * @gcx-event-category Debugging
         */
        (eventName: "TraceEvent"): TypedEvent<{
            (args: {
                timestamp: Date;
                level: string;
                message: string;
                stack?: string;
            }): void;
        }>;
        /**
         * Raised when a view is activated in a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewActivatedEvent
         * @param view The view that was activated.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewActivatedEvent"): TypedEvent<{
            (view: ui.ViewBase): void;
        }>;
        /**
         * Raised when a view container is activated in a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewContainerActivatedEvent
         * @param view The view that was activated.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewContainerActivatedEvent"): TypedEvent<{
            (view: ui.ViewBase): void;
        }>;
        /**
         * Raised when a view container is deactivated in a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewContainerDeactivatedEvent
         * @param args The view that was deactivated.
         * @introduced 2.1
         * @gcx-event-category Interface
         */
        (eventName: "ViewContainerDeactivatedEvent"): TypedEvent<{
            (view: ui.ViewBase): void;
        }>;
        /**
         * Raised when a view is deactivated in a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewDeactivatedEvent
         * @param args The view that was deactivated.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewDeactivatedEvent"): TypedEvent<{
            (view: ui.ViewBase): void;
        }>;
        /**
         * Raised by views when they wish to notify other components that their dimensions have changed.
         * @docs-gcx-event geocortex.framework
         * @name ViewDimensionsChangedEvent
         * @param args An instance of {@link geocortex.framework.events.ViewDimensionsChangedArgs} with the properties: view and region.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewDimensionsChangedEvent"): TypedEvent<{
            (args: ViewDimensionsChangedArgs): void;
        }>;
        /**
         * Raised when a view is added to a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewHostedEvent
         * @param args An object containing the view that was added, and the region that the view was added to.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewHostedEvent"): TypedEvent<{
            (args: ui.RegionViewHostingEventArgs): void;
        }>;
        /**
         * Raised when a view is removed from a region.
         * @docs-gcx-event geocortex.framework
         * @name ViewUnhostedEvent
         * @param arg An object containing the view that was removed, and the region that the view was removed from.
         * @introduced 1.0
         * @gcx-event-category Interface
         */
        (eventName: "ViewUnhostedEvent"): TypedEvent<{
            (args: ui.RegionViewHostingEventArgs): void;
        }>;
        /**
         * Raised when all library files specified in configuration are successfully processed. This event is raised even if one or more library downloads fail, in which case an error will be added to the viewer log.
         * @docs-gcx-event geocortex.framework
         * @name ViewerLibrariesDownloadedEvent
         * @param app An instance of the application.
         * @introduced 1.0
         * @gcx-event-category Start-Up, Initialization and Shutdown
         */
        (eventName: "ViewerLibrariesDownloadedEvent"): TypedEvent<{
            (app: application.Application): void;
        }>;
    }
}
declare module geocortex.framework.ui {
    /** @private */
    interface BindingEventHandler {
        (event: Event, element: HTMLElement, context: any): any;
    }
}
/**
 * Provides a foundation for building responsive, extensible HTML5 applications.
 * Offers facilities for data-binding, templating, internationalization, configuration, accessibility, and extensibility.
 */
declare module geocortex.framework {
}
declare module geocortex.framework {
    class FrameworkObject {
        app: application.Application;
        id: string;
        libraryId: string;
        constructor(app: application.Application, libraryId?: string);
        private dojoConnects;
        private observableBindings;
        private eventSubscriptions;
        private commandHandlers;
        /**
        * Binds a handler to an {@link geocortex.framework.events.Observable} or to a dojo.connect.
        * Binding to an {@link geocortex.framework.events.Observable}:
        *```
        *   this.auto(someObservable, function (newValue) { });
        *
        * with explicit scope:
        *
        *   this.auto(someObservable, this, function (newValue) { });
        *```
        * Alternately, pass an event name as a string to use dojo.connect:
        *```
        *   this.auto(window, "onclick", function () { });
        *```
        * @param arg0 Either an {@link geocortex.framework.events.Observable} (for observable bindings) or a regular object (if arg1 is a string)
        * @param arg1 If arg0 is an {@link geocortex.framework.events.Observable}, a function or scope object. Otherwise, an event name (to use with dojo.connect).
        * @param arg2 If arg0 is an {@link geocortex.framework.events.Observable}, a function handler.
        */
        auto(arg0: any, arg1: any, arg2: any): void;
        /**
         * Tracks a subscription to an {@link geocortex.framework.events.Event}, disposing it when this object is disposed with the destroy method.
         */
        trackSubscription(event: any, token: any): void;
        /**
         * Tracks a subscription to an {@link geocortex.framework.commands.Command}, disposing it when this object is disposed with the destroy method.
         */
        trackCommandHandler(command: any, token: any): void;
        /**
         * Override or attach to provide custom clean-up behaviour.
         */
        onDestroy(): void;
        /**
         * Disposes any bindings tracked by this object.
         */
        destroy(): void;
        /**
         * Gets a language resource from the Application's resource dictionary, given a key, and optional locale.
         * Returns `null` if the resource does not exist.
         * @param key The resource key.
         * @param locale The locale of the resource to fetch. Defaults to the current application locale.
         */
        getResource(resourceKey: string, locale?: string): string;
    }
}
declare module geocortex.framework.events {
    class CollectionChangedArgs {
        /** Sender of this event collection changed argument object. */
        sender: any;
        /**
         * Type of collection operation this argument object represents.
         * One of:
         * -append
         * -insert
         * -remove
         * -clear
         * -set
         */
        type: string;
        /** The beginning of the range that this operation represents.*/
        rangeStart: number;
        /** The end of the range that this operation represents. */
        rangeEnd: number;
    }
}
/** @private */
interface String {
    format(...args: any[]): string;
    ltrim(): string;
    rtrim(): string;
    startsWith(str: string, position?: number): boolean;
    endsWith(str: string, position?: number): boolean;
    isNullOrEmpty(str: string): boolean;
}
/**
 * Extensions to `String` (not on the prototype, but the constructor itself).
 * @private
 */
interface StringConstructor {
    escapeHtml(input: string): string;
    escapeHtmlEncode(input: string): string;
    unescapeHtml(input: string): string;
    isNullOrEmpty(input: string): boolean;
    format(formatStr: string, ...args: any[]): string;
    quickHashCode(str: string): number;
}
declare module geocortex.framework.utils {
    var base64keyStr: string;
    function isDefined(value: any): boolean;
    function isNullOrUndefined(value: any): boolean;
    /**
     * Makes a relative URL absolute.
     * @param url The URL to make absolute.
     */
    function makeUrlAbsolute(url: string): string;
    /**
     * Generates a random alphanumeric token, given a length.
     * @param length The length of the token to generate. If no length is provided, a default length of 8 characters is used.
     */
    function alphaNumericToken(length?: number): string;
    /**
     * Base-64 encodes a chunk of UTF-8 data.
     * @param input The text input to encode.
     */
    function base64Encode(input: string): string;
    /**
     * Decodes a Base-64 string.
     * @param input The text input to decode.
     */
    function base64Decode(input: string): string;
    /**
     * Encodes a string into its UTF-8 representation.
     * @param s The string to encode.
     */
    function utf8Encode(s: string): string;
    /**
     * Decodes a UTF-8 value into its string representation.
     * @param s The string to decode.
     */
    function utf8Decode(input: string): string;
    /**
     * Checks whether the supplied string represents a URL.
     * @param value The value to check.
     */
    function isUrl(value: string): boolean;
    /**
     * Returns true if a value is a percentage value, false otherwise.
     * @param value The value being evaluated.
     */
    function isPercentage(value: string): boolean;
    /**
     * Restricts a value to be within a specified range.
     * @param value The value to clamp
     * @param min The minimum value. If value is less than min, min will be returned
     * @param max The maximum value. If value is greater than max, max will be returned
     */
    function clamp(value: number, min: number, max: number): number;
    /**
     * Add an event listener to an object.
     * @param obj The object to add the event listener to.
     * @param type The type of event to listen for.
     * @param listener The object that receives a notification when an event occurs.
     */
    function addEventListener(obj: any, type: any, listener: any): void;
}
declare module geocortex.framework.events {
    /**
     * Represents a named event which can have multiple subscriptions. Subscriptions are functions that are executed and
     * passed event args when an event is raised.
     */
    class Event implements TypedEvent<any> {
        /** The {@link geocortex.framework.application.Application} that this event instance belongs to. Set to null for private/internal events. */
        app: application.Application;
        /** The name of this event. */
        name: string;
        /** Is this event currently being published? This flag can be used to prevent unwanted recursive behaviour. */
        isPublishing: boolean;
        /** Map of subscription tokens to subscription implementations.  */
        private subscriptions;
        /**
         * Initializes a new instance of the {@link geocortex.framework.events.Event} class.
         * @param {String} name The name of this event.
         * @param app The {@link framework.application.Application} that this event belongs to.
         */
        constructor(name: string, app?: application.Application);
        /**
         * Gets a subscription handler given a subscription token.
         * @param token The subscription token to get the subscription for.
         */
        getSubscriptionHandlerByToken(token: string): Function;
        /**
         * Subscribes an event handler to this event, returning a subscription token which can later be used
         * to unsubscribe the handler from this event.
         * @param scope The scope for which to execute the handler in. It will become "this" inside of the handler when fired.
         * @param handler The handler function to execute.
         */
        subscribe(scope: any, handler: Function): string;
        /**
         * Subscribes an event handler for a *single* publishing of this event, returning a subscription token which can later be used
         * to unsubscribe the handler from this event.
         * @param scope The scope for which to execute the handler in. It will become "this" inside of the handler when fired.
         * @param handler The handler function to execute.
         */
        once(scope: any, handler: Function): string;
        /**
         * Unsubscribes a handler from this event, given its token.
         * @param token The subscription token previously obtained by subscribing to this event.
         */
        unsubscribe(token: string): boolean;
        /**
         * Removes all registered handlers from this event.
         */
        clear(): void;
        /**
         * Raises this event, sequentially executing every registered handler.
         * @param parameters Parameters to pass to each handler.
         */
        publish(...parameters: any[]): void;
    }
}
/**
 * An {@link Observable} wraps a value that is modified using a call to {@link set}() and fetched with a call to {@link get}().
 * An {@link Observable} has an internal binding event that is raised when set() is called.
 *
 * This mechanism allows interested parties to receive notifications when a particular value changes, and this pattern is
 * used by the HTML5 framework to allow construction of data-bound applications that respond automatically
 * to data as it changes.
 *
 * @docs-hide-from-nav
 */
declare class Observable<T> {
    /** @private The binding event that is fired. Made private in docs because we may wish to lazily allocate it
      * in the near future. */
    bindingEvent: geocortex.framework.events.Event;
    /** @private */
    private value;
    private _syncToken;
    private _syncSource;
    /**
     * Constructs a new instance of the {@link Observable}, wrapping the given value.
     *
     *     var property = new Observable("hello");
     *
     * @param value The initial value of the {@link Observable}.
     */
    constructor(value?: T);
    /**
     * Sets the value of the {@link Observable}, raising the binding event and notifying any subscribers of the new value.
     * Set() should always be used to modify {@link Observable} values.
     *
     *     var property = new Observable("hello");
     *
     *     // Updates the value and fires the binding event.
     *     property.set("hello world");
     *
     *     // Alerts "hello world"
     *     alert(property.get());
     *
     * @param value The new value to set the Observable to.
     */
    set(value: T): void;
    /**
     * Returns the value of the {@link Observable}. Get should always be used to fetch the value of an {@link Observable}.
     *
     *     var property = new Observable("hello");
     *
     *     // Alerts "hello"
     *     alert(property.get());
     */
    get(): T;
    /**
     * Compares the value of this {@link Observable} to the value of another object.
     * If the other object is an {@link Observable}, its value will be used in the comparison.
     *
     *     var a = new Observable("hello");
     *     var b = new Observable("hello");
     *
     *     // Alerts "true"
     *     alert(a.equals(b));
     *
     * @param other The other raw value or Observable to compare.
     */
    equals(other: T): boolean;
    equals(other: Observable<T>): boolean;
    /** @private Hidden in docs since it's kind of magic (read: dangerous). */
    static makeBindableProxy(obj: any): any;
    /**
     * Binds an event handler to the binding event of this {@link Observable}. The event handler will be executed when
     * the value of the {@link Observable} changes via a call to set(). A string token is returned that can be used to
     * unbind the handler from the event.
     *
     *     var property = new Observable();
     *     property.bind(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *
     * @param scope The value of 'this' to bind the handler to.
     * @param handler The handler function to execute when the value changes.
     */
    bind(scope: any, handler: (value: T) => void): string;
    /**
     * Removes an event handler previously attached via bind(), given the token that bind() returned.
     *
     *     var property = new Observable();
     *     var token = property.bind(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *     property.unbind(token);
     *
     *     // Does not alert anything
     *     property.set("hello?");
     *
     * @param token The token previously returned from a call to bind().
     */
    unbind(token: string): boolean;
    /**
     * Binds a one-time event handler to the {@link Observable}, unbinding it the next time the {@link Observable} fires.
     *
     *     var property = new Observable();
     *     var token = property.once(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *
     *     // Does not alert anything
     *     property.set("hello?");
     *
     * @param scope The value of 'this' inside of the handler.
     * @param handler The one-time handler to execute.
     */
    once(scope: any, handler: Function): string;
    /**
     * Synchronizes this {@link Observable} to another {@link Observable}. When the other {@link Observable} changes, this {@link Observable}
     * will be set to the same value, and the binding event raised. The value of this {@link Observable} will be set
     * to the value of the other {@link Observable} upon synchronization.
     *
     *     var property1 = new Observable("hello");
     *     var property2 = new Observable();
     *
     *     property2.sync(property1);
     *
     *     // Alerts "hello"
     *     alert(property2.get());
     *
     *     property1.set("bye");
     *
     *     // Alerts "bye"
     *     alert(property2.get());
     *
     * @param source The {@link Observable} to synchronize this one with.
     */
    sync(source: Observable<T>): void;
    /**
     * Removes the event subscriptions that were created when sync() or syncTransform() was called.
     * This effectively unbinds the synchronization that exists between this Observable and another
     * Observable.
     */
    removeSync(): void;
    /**
     * Works the same as {@link sync}, but calls a transformation function every time the other {@link Observable} changes.
     *
     *     var property1 = new Observable("hello");
     *     var property2 = new Observable();
     *
     *     property2.syncTransform(property1, function (value) {
     *          return value.toUpperCase());
     *     });
     *
     *     // Alerts "HELLO"
     *     alert(property2.get());
     *
     *     property1.set("bye");
     *
     *     // Alerts "BYE"
     *     alert(property2.get());
     *
     * @param source The Observable to sync to.
     * @param transformation The function that performs the desired transformation.
     */
    syncTransform<U>(source: Observable<U>, transformation: (value: U) => T): void;
    /**
     * Sets the {@link Observable} to its current value and fires the binding event.
     *
     *     var property1 = new Observable("hello");
     *     property1.bind(this, function (value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello".
     *     property1.pulse();
     */
    pulse(): void;
}
/**
 * ObservableCollection provides {@link Observable} semantics around collections. Modifications to an {@link ObservableCollection} are
 * broadcast via a binding event that describes the change to the collection via a {@link CollectionChangedArgs}.
 *
 * See {@link Observable} for more details about semantics and usage of {@link Observable}s.
 * @docs-hide-from-nav
 */
declare class ObservableCollection<T> {
    /**
     * The {@link geocortex.framework.events.Event} that is fired when this collection is modified.
     */
    bindingEvent: geocortex.framework.events.Event;
    /**
    * Whether or not to perform throttled binding on this collection. If set to true, data-binding operations across this collection will be
    * performed asynchronously to avoid blocking the UI thread.
    */
    useThrottling: boolean;
    /**
     * An array containing all the throttled binding operations currently active on this collection, if throttling is enabled.
     */
    throttledOperations: geocortex.framework.utils.ThrottledOperation[];
    /**
     * An optional throttleDelay parameter that defines the delay between throttling operations (in milliseconds).
     */
    throttleDelay: number;
    private _syncToken;
    private _syncSource;
    private value;
    /**
     * Creates a new {@link ObservableCollection}, optionally wrapping an existing array.
     *
     *     var collection = new ObservableCollection(["hello"]);
     *     collection.addItem("world");
     *
     *     // Returns ["hello", "world"]
     *     var array = collection.get();
     *
     * @param items An array of items to initialize the collection to.
     */
    constructor(items?: T[]);
    /** Checks whether this collection contains any items */
    isEmpty(): boolean;
    /** Returns the length of this collection. */
    length(): number;
    /**
     * Checks whether this collection contains a specific item.
     * @param item The item to check for.
     */
    contains(item: T): boolean;
    /**
    * Tries to get an item from the underlying collection at a given index.
    * @param i The index of the item to return.
    */
    getAt(index: number): T;
    /**
     * Returns items, given a specific range. Works like Array.slice, except end is inclusive.
     * @param begin The beginning of the range to fetch.
     * @param end The end of the rang to fetch (inclusive).
     */
    getRange(begin: number, end?: number): T[];
    /**
    * Determines the index of the specified item in the collection.
    * @param item The item to get the index of.
    */
    indexOf(item: T): number;
    /** Gets the raw underlying collection. */
    get(): T[];
    /** Gets the raw underlying collection. */
    getItems(): T[];
    /** Gets the length of the collection. */
    getLength(): number;
    /**
    * Adds items to the collection and triggers the binding event.
    * @param items The items to add to the collection.
    */
    addItems(items: T[]): void;
    /**
    * Adds an item to the collection and triggers the binding event.
    * @param item The item to add to the collection. */
    addItem(item: T): void;
    /**
    * Inserts items into the collection at a given position and triggers the binding event.
    * @param index The location to insert the items.
    * @param items The items to insert.
    */
    insertItems(index: number, items: T[]): void;
    /**
    * Inserts an item into the collection at a given position and triggers the binding event.
    * @param index The location to insert the items.
    * @param items The items to insert.
    */
    insertItem(index: number, item: T): void;
    /**
    * Removes an object from the collection and triggers the binding event.
    * @param obj The object instance to remove.
    */
    removeItem(obj: T): void;
    /**
    * Removes the item at the specified index and triggers the binding event.
    * If the index is not valid for this collection, then nothing happens.
    * @param index The index of the item to remove.
    */
    removeAt(index: number): void;
    /**
    * Removes a range of items from the collection and fires the binding event accordingly.
    * @param from The index to remove from.
    * @param to The index to remove to. This is inclusive.
    */
    removeRange(from: number, to?: number): void;
    /**
    Removes all items from this ObservableCollection where the supplied callback
    function returns a truthy value.
    */
    removeWhere(callback: (item: T) => boolean): void;
    /** Clears the collection and triggers the binding event. */
    clear(): void;
    /**
    * Copies an existing raw collection.
    * @param newCollection The raw collection to copy. */
    set(newCollection: T[]): void;
    /**
     * Fires the binding event twice, simulating a clear and and append of the entire collection back to its original state.
     * See {@link Observable}.
     */
    pulse(): void;
    /**
     * Binds a handler to the binding event. This handler will be executed whenever the value of the collection is modified
     * Through an {@link ObservableCollection} call.
     * This method returns a subscription token that can be used to unsubscribe the handler.
     * @param scope The scope to execute the handler in. This will the meaning of 'this' inside of the handler when it is called.
     * @param handler The handler to execute when the Observable changes.
     */
    bind(scope: any, handler: (args: geocortex.framework.events.CollectionChangedArgs) => void): string;
    /**
     * Unbinds a binding subscription, given a valid subscription token received from a call to bind().
     * @param token The token representing the previously added subscription handler.
     */
    unbind(token: string): boolean;
    /**
     * Binds a handler the the binding event only once. The handler will only be executed the next time the {@link ObservableCollection} is updated.
     * This method returns a subscription token that can be used to unsubscribe the handler.
     * @param scope The scope to execute the handler in.
     * @param handler The handler to execute when the Observable changes.
     */
    once(scope: any, handler: Function): string;
    /**
    * Synchronizes one observable collection with another. Henceforth, whenever the source
    * changes, the synchronized collection will also be updated.
    * @param source The source ObservableCollection that this ObservableCollection will now mirror.
    */
    sync(source: ObservableCollection<T>): void;
    equals(other: T[]): boolean;
    equals(other: ObservableCollection<T>): boolean;
}
declare module geocortex.framework.utils.ArrayUtils {
    /**
     * Returns the first element in a sequence that satisfies a specified condition.
     * @param source The sequence of values to return an element from.
     * @param predicate A function to test each element for a condition.
     */
    function firstOrDefault<TSource>(source: TSource[], predicate?: (element: TSource, index?: number) => boolean): TSource;
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     * The source sequence remains unaltered.
     * @param source The sequence of values to order.
     * @param keySelector A function to extract the key for each element.
     */
    function orderBy<TSource, TKey>(source: TSource[], keySelector: (element: TSource) => TKey): TSource[];
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     * The source sequence remains unaltered.
     * @param source The sequence of values to order.
     * @param keySelector A function to extract the key for each element.
     */
    function orderByDescending<TSource, TKey>(source: TSource[], keySelector: (element: TSource) => TKey): TSource[];
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * The source sequence remains unaltered.
     * @param source The sequence whose elements to group.
     * @param keySelector A function to extract the key for each element.
     */
    function groupBy<TSource, TKey>(source: TSource[], keySelector: (element: TSource) => TKey): utils.Grouping<TKey, TSource>[];
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     * The source sequence remains unaltered.
     * @param source The sequence to remove duplicate elements from.
     */
    function distinct<TSource>(source: TSource[]): TSource[];
    /**
     * Removes a range of items from an Array.
     * @param array The Array to remove from.
     * @param from The index to begin removing from.
     * @param to The index to remove to.
     */
    function remove(array: any[], from: number, to?: number): any[];
    /**
     * Removes a specific item from an array. If multiple instances of the item exist in the array, only the first reference is removed.
     * @param array The array to remove from.
     * @param obj The object to remove.
     */
    function removeItem(array: any[], obj: any): any[];
    /**
     * Checks whether or not an array contains a specific object.
     * @param array The array to check.
     * @param obj The object to check for.
     */
    function contains(array: any[], obj: any): boolean;
    /**
     * Returns the index of a given object, if it exists in an array.
     * @param array The Array to check.
     * @param obj The object to check for.
     */
    function pos(array: any[], obj: any): number;
}
declare module geocortex.framework.utils {
    /**
     * Models an operation that executes periodically based on a specific interval.
     * @private
     */
    class ThrottledOperation {
        /** The number of milliseconds to wait between each application of the throttled operation. */
        period: number;
        /**
         * A function describing the action to throttle. If it returns true, it will be repeated. If not the throttler will terminate.
         */
        action: () => boolean;
        /**
         * A function which will be called in the event that a throttling operation is cancelled midway.
         */
        cancelAction: () => any;
        /**
         * Boolean indicating whether this throttling operation is currently active or not.
         */
        isActive: boolean;
        /**
         * Private set timeout token reference.
         */
        protected _setTimeoutToken: number;
        /**
         * Instantiate an the {@link framework.utils.ThrottledOperation} class.
         * @param period The number of milliseconds to wait between each application of the throttled operation.
         * @param action A function describing the action to throttle. If it returns true, it will be repeated. If not, the throttler will terminate.
         * @param cancelAction A function which will be called in the event that a throttling operation is cancelled midway.
         */
        constructor(period: number, action: () => boolean, cancelAction?: () => void);
        /**
         * This function cancels this throttled operation if it is in progress. If a cancelAction is specified, it will be invoked on cancellation.
         */
        cancel(): void;
        /**
         * Internal throttled operation implementation.
         */
        protected execute(scope: ThrottledOperation): void;
    }
}
declare var require: any;
declare module geocortex.framework.ui {
    /**
     * Represents a single binding expression.
     */
    class BindingExpression {
        /** The DOM element this binding expression applies to. */
        domElement: HTMLElement;
        /**
         * The name of this binding type. One of:
         * -attr
         * -visibility
         * -event
         * -collection
         */
        type: string;
        /** The name of the attribute this binding applies to, if applicable. */
        attributeName: string;
        /** The target name of this binding, e.g. the name of a view model field. */
        target: string;
        /** Whether or not this binding should be inverted, if applicable. */
        invert: boolean;
        /** Signals returned by dojo.on, created in the .on function. */
        private _dojoDomEvents;
        /** Array of objects containing event subscriptions tokens for bindings to {@link geocortex.framework.events.Observable} and {@link geocortex.framework.events.ObservableCollection} objects. */
        targetBindings: {
            token: string;
            event: events.Event;
        }[];
        /** Describes the templating mode of this binding expression. */
        templateMode: string;
        /** The key field use in template selection. */
        templateKey: string;
        /** Templates available for binding. */
        templateSelections: {
            [key: string]: HTMLElement;
        };
        /** The view that this binding belongs to. */
        parentView: ViewBase;
        /** Views created as a result of this binding. */
        boundViews: ViewBase[];
        /** The view model this binding connects to. */
        viewModel: any;
        /**
         * Connect a BindingExpression event from the DOM element.  The event will automatically
         * be disconnected when this BindingExpression is destroyed.
         */
        on(event: string, handler: (event: Event) => any): void;
        /**
         * Destroys this binding expression along with any views created as a result of it.
         */
        destroy(): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * BindingNode represents a data-bound DOM element with one or more binding expressions.
     */
    class BindingNode {
        /** The DOM element for which this binding effects. */
        domElement: HTMLElement;
        parent: BindingNode;
        /**  Child bindings. */
        children: BindingNode[];
        /** Computed binding expressions. */
        expressions: ui.BindingExpression[];
        /** Data context of the binding, usually a view model of some sort. */
        context: any;
        /** Whether or not this node represents a change in data context, e.g. in a @source binding. */
        contextChange: boolean;
        /**
         * Initializes a new instance of the {@link geocortex.framework.ui.BindingNode} class
         */
        constructor();
        /**
         * Destroys this binding node, unsubscribing from any events and freeing all resources.
         */
        destroy(): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * Represents a disposable binding to an Event.
     */
    interface DisposableBinding {
        event: events.Event;
        token: string;
    }
}
declare module geocortex.framework.ui {
    /**
     * Represents a data-bound, MVVM-style view. `ViewBase` handles data-binding and view lifecycle concerns.
     * *Note:* Data-binding is achieved primarily through HTML templating - consumers need not call binding methods directly.
     */
    class ViewBase extends geocortex.framework.FrameworkObject {
        /** Whether or not this view is active. */
        isActive: boolean;
        /** Configuration materials. */
        configuration: any;
        /** Whether or not this view is allowed to be managed by some sort of view management component. */
        isManaged: boolean;
        /** The {@link Observable} isBusy flag of the view. */
        isBusy: Observable<boolean>;
        /**
         * The {@link Observable} title of the view. */
        title: Observable<string>;
        /** The {@link Observable} description of the view. */
        description: Observable<string>;
        /** The {@link Observable} icon URI of the view. */
        iconUri: Observable<string>;
        /** Resource name of the markup for this view (if any). */
        markupResource: string;
        /** The View Model backing this view. Does not necessarily have to be a formal instance of {@link ViewModelBase}. */
        viewModel: any;
        /** The name of the region that this view is hosted in. */
        regionName: string;
        /** The type name of this view. */
        typeName: string;
        /** The root DOM element of this view. */
        root: HTMLElement;
        /** The tree of binding nodes represented in the markup. */
        bindingTree: ui.BindingNode;
        /** The parent view of this view, if this view is the result of a collection binding. */
        parentView: ui.ViewBase;
        /** Regions belonging to (hosted in) this view. */
        childRegions: ui.RegionAdapterBase[];
        /** Whether or not this view has been bound. */
        bound: boolean;
        /** @private */
        disposableBindings: ui.DisposableBinding[];
        /** @private */
        bindingSetupDelegates: {
            (): void;
        }[];
        /**
        * Initializes a new instance of the {@link geocortex.framework.ui.ViewBase} class.
        * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
        * @param libraryId
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /**
        * Adds an {@link geocortex.framework.events.Observable} binding that will be disposed of when the view is destroyed.
        * @param observable The Observable to bind to.
        * @param token The token received from binding to the observable.
        */
        addDisposableBinding(observable: Observable<any>, token: string): void;
        /**
         * Attaches a view model and performs data-binding.
         * @param viewModel The view model to attach to.
         */
        attach(viewModel?: any): void;
        /**
         * Called when the view has been activated.
         */
        activated(): void;
        /**
         * Called when the view has been deactivated.
         */
        deactivated(): void;
        /**
         * Called when the view has been added to a region or as another view in the form of a widget.
         * @param The parent view, if this view is being hosted as a widget.
         */
        added(widgetViewHost?: ViewBase): void;
        /**
         * Called when a view has been removed from a region.
         */
        removed(): void;
        /**
         * Disposes any bindings tracked by this object.
         */
        destroy(): void;
        /**
         * Destroys all of this view's bindings, and by extension any views bound under this one.
         * The primary purpose of this is to remove event subscriptions due to binding as well as dereferencing expensive DOM
         * nodes so that they may be discarded.
         */
        destroyBindings(): void;
        /**
         * Performs the initial data bind of the UI.
         */
        pulseAll(): void;
        /**
         * Override this method to resolve widgets by ID and context. Return a {@link geocortex.framework.config.WidgetConfig}, or null.
         * @param widgetId The ID of the widget to resolve.
         * @param context The data context (view model) to bind the widget view to.
         * @param binding The binding expression that triggered this call to `resolveWidget`.
         */
        resolveWidget(widgetId: string, context: any, binding?: BindingExpression): any;
        /**
         * Builds a tree of all binding expressions in this view and hooks up binding events as it goes.
         * This method will recursively descend the DOM structure of its visual root and resolve binding expressions.
         */
        buildTree(): BindingNode;
        /**
        * Returns the target of a binding expression, taking into consideration Observables and pseudo-targets.
        * @param binding The binding whose target should be resolved.
        */
        getBindingTarget(binding: BindingExpression): any;
        /**
         * Sets the value of the target of a binding expression, taking into consideration Observables and pseudo-targets.
         * @param binding The binding whose target should be resolved.
         * @param value The value to set.
         */
        setBindingTargetValue(binding: BindingExpression, value: any): void;
        /**
         * Given a binding expression and a view model, resolves the correct template to use.
         * @param binding The binding being satisfied.
         * @param viewModel The view model participating in the binding.
         */
        resolveBindingTemplate(binding: BindingExpression, viewModel: any): any;
        /**
         * Builds a complex binding between a `source` and `template` element.
         * Allows binding to collections of complex objects or singular complex objects.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         * @param bindingNode The current binding node in the binding tree.
         */
        buildSourceBinding(el: HTMLElement, binding: BindingExpression, currentContext: any, bindingNode: BindingNode): boolean;
        /**
         * Builds an event binding, binding a DOM event to an event handler in the view.
         */
        buildEventBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Builds a var binding, creating a variable in the view that references a DOM element.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildVarBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): void;
        /**
         * Builds a sanitized text binding. Strips out unsafe characters, and allows direct referencing of language keys.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildTextBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Builds a DOM attribute binding, binding a DOM attribute to a view model property or attaching directly to the DOM object.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         * @param directAttach Whether or not to directly modify the actual DOM element's own properties. Defaults to `false`.
         */
        buildAttributeBinding(el: HTMLElement, binding: BindingExpression, currentContext: any, directAttach?: boolean): boolean;
        /**
         * Builds an inline CSS style binding.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildStyleBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Builds a one-time DOM binding, binding to a DOM element in the view codebehind.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildDomBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Creates a new view, given a WidgetConfig object.
         * @private
         */
        private _createWidgetViewFromConfig(widgetConfig, currentContext);
        /**
         * Builds a (one-time) widget binding.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildWidgetBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        buildClassBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Given some sort of thing, decide whether or not it is "truthy". Works with {@link ObservableCollection}.
         * @param thing The thing to check truthiness upon.
         */
        isTruthy(thing: any): boolean;
        /**
         * Builds a visibility binding.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildVisibilityBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Builds an `enabled`/`disabled` binding, simulating a cascading enabled/disabled state.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildDisabledBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Builds a two-way binding between a form control and an {@link Observable}.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         */
        buildValueBinding(el: HTMLElement, binding: BindingExpression, currentContext: any): boolean;
        /**
         * Applies a binding expression to a DOM node based on the type name of the binding.
         * @param el The element being bound.
         * @param binding The binding expression.
         * @param currentContext The current data context.
         * @param bindingNode The binding node to apply.
         */
        applyBinding(el: HTMLElement, binding: BindingExpression, currentContext: any, bindingNode: BindingNode): boolean;
    }
}
declare module geocortex.framework.ui {
    /**
     * Describes the format of event arguments related to views being hosted or unhosted in a particular region.
     */
    interface RegionViewHostingEventArgs {
        view: ViewBase;
        region: RegionAdapterBase;
    }
    /**
     * RegionAdapterBase serves as the base class for all region adapters.
     */
    class RegionAdapterBase {
        private _viewActivationTimers;
        private _viewDeactivationTimers;
        /** Whether or not this region has one or more active views. */
        isActive: boolean;
        /** The {@link geocortex.framework.application.Application} that this region adapter belongs to. */
        app: application.Application;
        /** The DOM element that this adapter works against. */
        domElement: HTMLElement;
        /** A key value-pair collection of configured options, specific to the particular region adapter. */
        options: any;
        /** The name of this region adapter. Must be globally unique. */
        name: string;
        /** The view that owns this region, if it's associated with one. */
        ownerView: ViewBase;
        /** Any views hosted in this region. */
        views: ViewBase[];
        /** Active views in this region. */
        activeViews: ViewBase[];
        /** Default time that views should take in transitioning from different states (active~inactive). */
        defaultTransitionDelay: number;
        /**
         * Initializes a new instance of the {@link geocortex.framework.ui.RegionAdapterBase} class.
         * @param name The name of the region adapter.
         * @param app The {@link framework.application.Application} that this region adapter belongs to.
         */
        constructor(name: string, app: application.Application);
        /**
         * Hosts the region in the given DOM element. Views will be adapted for this element.
         * @param element The DOM element to adapt views for.
         * @param options The data region options as a key-value pair collection (i.e. an object).
         */
        host(element: HTMLElement, options?: any): void;
        /**
         * Called when the region adapter is to be removed from the user interface.
         */
        unhost(): void;
        /**
         * Activates a view in the context of the adapter, generally making it visible and interactive.
         * @param view The view to activate. This view should already be hosted in the region.
         */
        activateView(view: ViewBase): void;
        /**
         * Because the adding of the "active" class is asynchronous (through setTimeout(0)), there can be a potential race condition
         * whereby if a view is immediately deactivated after getting activated, it may actually get the "activated" class
         * added to it after it has been deactivated.  To prevent this from happening, this method should be called when deactivating
         * or simply hiding a view.
         */
        cancelActivate(view: ViewBase): void;
        cancelDeactivate(view: ViewBase): void;
        /**
         * Deactivates a view in the context of the adapter, generally making it non-visible and non-interactive.
         * @param view The view to deactivate. This view should already be hosted in the region.
         */
        deactivateView(view: ViewBase): void;
        /**
         * Adds a view to the region.
         * @param view The view to add to the region.
         */
        hostView(view: ViewBase): void;
        /**
         * Removes a view from the region.
         * @param view The view to remove from the region.
         */
        unhostView(view: ViewBase): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * A singleton modal region adapter that pops up when a view belonging to it is activated.
     * An overlay element is used to fade the elements underneath the popup and to prevent user interaction with the app until the modal
     * popup is dismissed.
     */
    class PopupModalRegionAdapter extends RegionAdapterBase {
        /** The active view currently being displayed. */
        activeView: ViewBase;
        /** The stack of active views. */
        activeViews: ViewBase[];
        /** Token used to unsubscribe binding to the active view title. */
        titleBindingToken: string;
        /** Window header DOM element. */
        contentHeader: HTMLElement;
        /**  Window title DOM element. */
        contentTitle: HTMLElement;
        /** Content container outer element. */
        contentContainer: HTMLElement;
        /** Content container inner DOM element. */
        contentElement: HTMLElement;
        /** Modal overlay element. */
        overlayElement: HTMLElement;
        private _scrollTimer;
        private _scrollDelay;
        private static instance;
        /**
         * Initializes a new instance of the {@link geocortex.framework.events.ObservableCollection} class.
         * @param name The optional name of the region adapter.
         * @param app The {@link geocortex.framework.application.Application} that this PopupModalRegionAdapter belongs to.
         */
        constructor(name: string, app: application.Application);
        static getInstance(): PopupModalRegionAdapter;
        /**
         * Activates the region, displaying the modal overlay and any modal content.
         */
        activate(): void;
        /**
         * Deactivates the region, hiding the modal overlay and any modal content.
         */
        deactivate(): void;
        /**
         * Attaches the region adapter to a DOM element.
         * @param element The DOM element to adapt for.
         */
        host(element: HTMLElement): void;
        /**
         * Handles a scroll event on the window, which sets a timer to reposition the content.
         */
        handleScrollEvent(): void;
        /**
         * Centers the modal content.
         */
        positionContent(): void;
        /**
         * Displays the active view, activating the modal popup and overlay if they are not already active.
         * @param view The active view to show.
         */
        showActiveView(view: ViewBase): void;
        /**
         * Hides all views hosted in the region.
         */
        hideAllViews(): void;
        /**
         * Activates a view and pushes it to the top of the active views, activating the region if required.
         * @param view The view to activate.
         */
        activateView(view: ViewBase): void;
        /**
         * Deactivates a view.
         * @param view The view to deactivate. The view should pre-exist in the region.
         */
        deactivateView(view: ViewBase): void;
        /**
         * Deactivates the active view.
         */
        deactivateActiveView(): void;
        /**
         * Adds a view to this region. This region adapter actually hosts its content in one of the children of the actual region. This allows
         * it to provide some container markup and an "X" button that will deactivate the current view.
         * @param view The view to host.
         */
        hostView(view: ViewBase): boolean;
        /**
         * Removes a view from this region.
         * @param view The view to remove.
         */
        unhostView(view: ViewBase): void;
        private _repositionOnImageLoaded(node);
        private _imageLoaded(evt);
    }
}
declare module geocortex.framework.application {
    class ApplicationCommands {
        static createCommands(app: Application): void;
    }
}
declare module geocortex.framework.commands {
    /**
     * A function signature that specifies the return type but matches any parameters.
     * @docs-hide-from-nav
     */
    interface FunctionReturning<T> extends Function {
        (paramA: any, paramB: any, paramC: any, paramD: any, paramE: any, paramF: any): T;
    }
    /**
     * Command provides a general purpose, loosely coupled command model. A command can have 0 or more implementations registered to it.
     */
    class Command implements TypedCommand<any> {
        private _entries;
        /** The {@link geocortex.framework.application.Application} that this command instance belongs to. */
        app: application.Application;
        /** The name of this command. */
        name: string;
        /**
         * Whether this command is a wrapper command or not. A wrapper command is one that has been created
         * as a result of something trying to execute it, despite not having been created previously.
         */
        isWrapper: boolean;
        /**
         * Execute mode for the command. One of:
         * - all<
         * - any
         */
        canExecuteMode: string;
        /**
         * Event raised when the command's can execute status may have changed.
         * @event
         */
        canExecuteChanged: events.Event;
        /**
         * Event raised when execute has been called on the command and at least one implementation is about to execute.
         */
        preExecute: events.Event;
        /**
         * Event raised when execute has been called on the command and at least one implementation has executed.
         */
        postExecute: events.Event;
        /**
         * Initializes a new instance of the {@link geocortex.framework.commands.Command} class.
         * @param name The name of this command.
         * @param app The {@link framework.application.Application} that this command belongs to.
         * @param canExecuteMode An optional {@link geocortex.framework.commands.CommandRequireMode}.
         */
        constructor(name: string, app: application.Application, canExecuteMode?: string);
        /**
         * Raises the canExecuteChanged event.
         */
        raiseCanExecuteChanged(): void;
        /**
         * Returns true or false based on whether this command can execute or not.
         * @param parameters 0 or more parameters to evaluate canExecute with.
         */
        canExecute(...parameters: any[]): boolean;
        /**
         * Executes this command. If multiple implementations have been registered, they are executed sequentially.
         * @param parameters 0 or more parameters to pass to the command.
         */
        execute(...parameters: any[]): void;
        /**
         * Registers a command implementation that executes in a specific scope and with optional canExecute logic.
         * @param scope The scope of which to execute the command implementation.
         * @param implementation The implementation to add to this command/
         * @param canExecute An optional canExecute method to decide whether this command fragment can execute or not.
         */
        register(scope: any, implementation: FunctionReturning<void>, canExecute?: FunctionReturning<boolean>): string;
        /**
         * The canExecute function to use if none is provided. (Always allows.)
         * @private
         */
        private defaultCanExecuteFunction();
        /**
         * Removes a command implementation from this command, using the token returned when the implementation was registered.
         * @param token The token that was returned when the command implementation was registered.
         */
        unregister(token: string): boolean;
        /**
         * Clears this command of all implementations.
         */
        clear(): void;
    }
}
declare module geocortex.framework.commands {
    /**
     * CommandRegistry provides a safe method of referencing {@link geocortex.framework.commands.Command} instances
     * between loosely coupled components.
     */
    class CommandRegistry {
        /**
         * Instance of the {@link application.Application} that this registry belongs to.
         */
        app: application.Application;
        /**
         * Map object of commands held in this registry.
         */
        commands: {
            [commandName: string]: Command;
        };
        /**
         * Initializes a new instance of the {@link geocortex.framework.commands.CommandRegistry} class.
         * @param app An instance of {@link geocortex.framework.application.Application}.
         */
        constructor(app: application.Application);
        /**
         * Clears all commands.
         */
        clear(): void;
        /**
         * Fetches a command by name. If the command doesn't exist, a placeholder ("wrapper") command is created.
         * @param name The name of the command to fetch.
         */
        command(name: string): Command;
    }
}
declare module geocortex.framework.config {
    /** Loads an application configuration and fires a callback upon completion. */
    class ConfigurationLoader {
        /** The application instance that this ConfigurationLoader belongs to. */
        app: application.Application;
        private _targetConfigUri;
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.ConfigurationLoader} class.
         * @param app
         */
        constructor(app: application.Application);
        /**
         * Loads a configuration tree, publishing the ConfigurationLoadFailedEvent in the event of a failure.
         * @param configUri URI of the configuration file to load.
         * @param callback The callback to call upon success.
         */
        loadConfigurationTree(configUri: string, callback?: (config: Object) => void): void;
    }
}
declare module geocortex.framework.config {
    interface LibraryConfigLocale {
        locale: string;
        uri: string;
        libraryId?: string;
    }
    /**
     * Represents a reference to an application library and related configuration elements.
     */
    class LibraryConfig {
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.LibraryConfig} class.
         * @param idArg The ID of the library.
         * @param uriArg The URI from which to download the library. **Note:** Must be relative.
         */
        constructor(idArg: string, uriArg: string);
        /** The configured ID of this external code reference  */
        id: string;
        /** The configured URI of this external code reference. */
        uri: string;
        /** Array of locale ID/URI elements to fetch for this piece of code. */
        locales: LibraryConfigLocale[];
        /** The position in configuration that this library was declared at. */
        position: number;
        /** Don't inject any styles from this library. */
        omitStyles: boolean;
    }
}
declare module geocortex.framework.ui {
    class ViewModelBase extends geocortex.framework.FrameworkObject {
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config: any): void;
        /**
         * Gets a language resource from the Application's resource dictionary, given a key, and optional locale.
         * Returns null if the resource does not exist.
         * @param key The resource key.
         * @param locale The locale of the resource to fetch. Defaults to the current application locale.
         */
        getResource(resourceKey: string, locale?: string): string;
    }
}
declare module geocortex.framework.config {
    interface ViewConfigInterface {
        /**  The ID of the view represented by this {@link geocortex.framework.config.ViewConfig} object. */
        viewId?: string;
        /** An ID of a view model to bind this view to. */
        viewModelId?: string;
        /** An instance of a view model to bind this view to. */
        viewModel?: ui.ViewModelBase;
        /** The ID of the library that this view belongs to. */
        libraryId?: string;
        /** The name of the module that this view belongs to. */
        moduleName?: string;
        /** Configuration materials to pass this view upon initialization. */
        configuration?: any;
        /** The type name of the view instance. */
        typeName?: string;
        /** An HTML resource key into the {@link geocortex.framework.application.ResourceManager} that will be used to load the view UI. */
        markupResource?: string;
        /** The name of the region to host this view into once activated. */
        regionName?: string;
        /**  Whether or not this view is initially visible. Views that are initially visible will typically get activated when hosted. */
        isVisible?: boolean;
        /**Whether or not this view allows itself to be "managed" by a component such as a toolbar. */
        isManaged?: boolean;
        /** The title to give the view upon creation. */
        title?: string;
        /** A description of this view. */
        description?: string;
        /** An image URI to use an icon when displaying or managing this view. */
        iconUri?: string;
    }
    /**
     * Holds configuration information about a view.
     */
    class ViewConfig implements ViewConfigInterface {
        /** The ID of the view represented by this {@link geocortex.framework.config.ViewConfig} object. */
        viewId: string;
        /** An ID of a view model to bind this view to. */
        viewModelId: string;
        /** An instance of a view model to bind this view to. */
        viewModel: ui.ViewModelBase;
        /** The ID of the library that this view belongs to. */
        libraryId: string;
        /** The name of the module that this view belongs to. */
        moduleName: string;
        /** Configuration materials to pass this view upon initialization. */
        configuration: Object;
        /** The type name of the view instance. */
        typeName: string;
        /** resource key into the {@link geocortex.framework.application.ResourceManager} that will be used to load the view UI. */
        markupResource: string;
        /** The name of the region to host this view into once activated. */
        regionName: string;
        /** Whether or not this view is initially visible. Views that are initially visible will typically get activated when hosted. */
        isVisible: boolean;
        /** Whether or not this view allows itself to be "managed" by a component such as a toolbar. */
        isManaged: boolean;
        /** The title to give the view upon creation. */
        title: string;
        /** A description of this view. */
        description: string;
        /** An image URI to use an icon when displaying or managing this view. */
        iconUri: string;
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.ViewConfig} class.
         * @param viewId The configured ID of this view.
         * @param moduleName The name of the module that this view belongs to.
         * @param typeName The type name of the instance for this view.
         */
        constructor(viewId: string, moduleName: string, typeName: string);
    }
}
declare module geocortex.framework.config {
    /**
     * Holds configuration information about a view model
     */
    class ViewModelConfig {
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.ViewModelConfig} class.
         * @param viewModelId The configured ID of this view model.
         * @param moduleName The name of the module that this view mode; belongs to.
         * @param typeName The type name of the instance for this view model.
         */
        constructor(viewModelId: string, moduleName: string, typeName: string);
        /** The configured ID of this view model. */
        viewModelId: string;
        /** The ID of the library that this view model belongs to. */
        libraryId: string;
        /** The name of the module that this view model belongs to. */
        moduleName: string;
        /**  The type name of the view model instance this view model config represents. */
        typeName: string;
        /** Configuration materials to pass to the view model upon initialization.*/
        configuration: Object;
    }
}
declare module geocortex.framework.config {
    /**
     * Represents a configured module, including any configured {@link geocortex.framework.ui.ViewBase} and {@link geocortex.framework.ui.ViewModelBase}
     * objects belonging to the module.<
     */
    class ModuleConfig {
        /** The configured name of the module. */
        moduleName: string;
        /** The configured type name of the module instance. */
        moduleType: string;
        /** The configuration material to pass to the module upon initialization. */
        configuration: any;
        /** The configured ID of the library that this module's implementation can be found in. */
        libraryId: string;
        /** An array of {@link geocortex.framework.config.ViewConfig} objects configured for this module. */
        viewConfigs: ViewConfig[];
        /** An array of {@link geocortex.framework.config.ViewModelConfig} objects configured for this module. */
        viewModelConfigs: ViewModelConfig[];
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.ModuleConfig} class
         * @param: moduleName The name of the module this configuration item represents.
         * @param: moduleType The type name of the module this configuration item represents.
         * @param: configuration The configuration object to pass to the module during initialization.
         * @param: libraryId The configured library ID that this module belongs to.
         */
        constructor(moduleName: string, moduleType: string, configuration: Object, libraryId: string);
    }
}
declare module geocortex.framework.config {
    /**
     * Holds configuration information about a widget.
     */
    class WidgetConfig {
        /** The ID of the view represented by this {@link geocortex.framework.config.WidgetConfig} object. */
        id: string;
        /** The fully-qualified typename of the view model this view will be bound to, if applicable. */
        viewModelType: string;
        /** The ID of the library that this view belongs to. */
        libraryId: string;
        /** Configuration materials to pass this view upon initialization. */
        configuration: Object;
        /** The type name of the view instance. */
        typeName: string;
        /** An HTML resource key into the {@link geocortex.framework.application.ResourceManager} that will be used to load the view UI. */
        markup: string;
        /**
         * Initializes a new instance of the {@link geocortex.framework.config.WidgetConfig} class.
         * @param id The configured ID of this widget.
         * @param libraryId The ID of the library that the resources for this widget live in.
         */
        constructor(id: string, libraryId: string);
    }
}
declare module geocortex.framework.config {
    interface ConfigJson {
        version: string;
        application: any;
        defaultLibraryId: string;
        libraries: LibraryJson[];
        modules: ModuleJson[];
        widgets: WidgetJson[];
    }
    interface ApplicationJson {
        proxyUri?: string;
        allowUnsafeContent?: boolean;
        offlineStorageSpaceMb?: string;
        geometryServiceUrl?: string;
        geometryServiceToken?: string;
        mobileMode?: boolean;
    }
    interface LibraryJson {
        id: string;
        uri: string;
        omitStyles?: boolean;
        locales: LibraryConfigLocale[];
    }
    interface ModuleJson {
        moduleName: string;
        moduleType: string;
        views?: ViewJson[];
        viewModels?: ViewModelJson[];
        libraryId?: string;
        configuration?: any;
    }
    interface ViewJson {
        id: string;
        viewModelId: string;
        visible?: boolean;
        isManaged?: boolean;
        title?: string;
        iconUri?: string;
        description?: string;
        markup: string;
        type: string;
        region: string;
        libraryId?: string;
        configuration?: any;
    }
    interface ViewModelJson {
        id: string;
        type: string;
        libraryId?: string;
        configuration: any;
    }
    interface WidgetJson {
        id: string;
        libraryId: string;
        configuration?: any;
    }
    /**
     * Represents configuration for a `Framework` application.
     */
    class ConfigurationModel {
        /** The {@link geocortex.framework.application.Application} that this configuration model belongs to. */
        app: application.Application;
        /** Global application configuration values from the "application" section. */
        application: ApplicationJson;
        /** The configuration version of the model. */
        version: string;
        /** The configured ID of this viewer. */
        viewerId: string;
        /** The configured ID of the default library. Modules with no explicit libraryId reference will be considered as belonging to the default library. */
        defaultLibraryId: string;
        /** "Global" configuration values that can be referenced elsewhere in configuration. */
        globals: any;
        /** An array of {@link geocortex.framework.config.LibraryConfig} objects representing external library dependencies. */
        libraryConfigs: LibraryConfig[];
        /** An array of {@link geocortex.framework.config.ModuleConfig} objects representing all of the configured modules in this configuration model. */
        moduleConfigs: ModuleConfig[];
        /** An array of {@link geocortex.framework.config.WidgetConfig} objects representing all of the configured widgets in this configuration model. */
        widgetConfigs: WidgetConfig[];
        /** An object map that maps a library ID to a collection of {@link geocortex.framework.config.ModuleConfig} objects belonging to that library. */
        libraryModules: {
            [libraryId: string]: ModuleConfig[];
        };
        /** An array of references to external locale resources. */
        externalLocaleReferences: LibraryConfigLocale[];
        /**
         * Initializes a new instance of the {@link ConfigurationModel} class.
         * @param app The {@link geocortex.framework.application.Application} that this configuration model belongs to.
         */
        constructor(app: application.Application);
        /**
         * Builds this configuration model from JSON.
         * @param configuration The JSON string or object to parse.
         * @param callback The callback to fire when configuration loading has completed.
         */
        parse(configuration: string, callback?: (cm: ConfigurationModel) => void): void;
    }
}
declare module geocortex.framework.events {
    /**
     * EventRegistry provides safe, loosely-coupled access to events in a manner similar to {@link geocortex.framework.commands.CommandRegistry}.
     * If a non-existent event is referenced, it is created.
     * An EventRegistry instance should always be used when referencing commands.
     * A global EventRegistry instance lives in the base {@link geocortex} namespace.
     */
    class EventRegistry {
        private events;
        /**
         * Instance of the {@link application.Application} that this registry belongs to.
         */
        app: application.Application;
        /** Initializes a new instance of the {@link geocortex.framework.events.EventRegistry} class. */
        constructor(app?: application.Application);
        /**
         * Clears all events, removing all subscriptions.
         */
        clear(): void;
        /**
         * Fetches an event by name. If the event doesn't exist, an empty one is created.
         * @param name The name of the event to fetch or create.
         */
        event(name: string): Event;
    }
}
declare module geocortex.framework.storage {
    class StorageStats {
        static UNKNOWN: number;
        capacity: number;
        sizeInChars: number;
        numKeys: number;
    }
}
declare module geocortex.framework.storage {
    class StorageProviderBase {
        app: geocortex.framework.application.Application;
        /** The key prefix for this provider. This will be used to segregate stored values between applications. */
        keyNamespace: string;
        constructor(app: geocortex.framework.application.Application);
        /**
         * Initializes this provider.
         */
        initialize(): void;
        /**
         * Detects whether or not this provider is supported by the current user agent.
         */
        isSupported(): boolean;
        /**
         * Returns a boolean value indicating whether or not this provider mechanism is full.
         */
        isFull(): boolean;
        /**
         * Returns a new {@link StorageStats} Object.
         */
        getStats(): storage.StorageStats;
        /**
         * Returns the scoring value for this provider, if supported.
         */
        getScore(): number;
        /**
         * Clears all data for the current application.
         * @param successCallback
         * @parma errorCallback
         */
        clear(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Clears all data for all applications.
         * @param successCallback
         * @parma errorCallback
         */
        clearAllData(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Fetches a value based on its key.
         * @param key The key of the value to fetch.
         * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
         * @param errorCallback The callback to fire if an error occurs.
         * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
         */
        get(key: string, successCallback: (any) => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Adds a new key/value pair to storage or overwrites an existing one.
         * @param key The key of the value to store.
         * @param value The value to store.
         * @param successCallback The callback to fire upon success.
         * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
         * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
         */
        set(key: string, value: any, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Removes a key and associated value from the store.
         * @param key The key for which key/value pair to remove.
         * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
         * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
         * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
         */
        remove(key: string, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
    }
}
declare module geocortex.framework.storage {
    class FileStorageProvider extends storage.StorageProviderBase {
        /** Filesystem object we are (hopefully) granted. */
        private _filesystem;
        /** Whether or not we are currently initializing. */
        private _isInitializing;
        private _initializationSuccessCallback;
        private _initializationErrorCallback;
        /** Default amount of size to request. */
        private _defaultDesiredSize;
        /** Value to represent temporary file storage option. */
        private _storageTypeTemporary;
        /** Value to represent persistent file storage option. */
        private _storageTypePersistent;
        /** An error that occurred. The presence of a value here indicates that the provider is not useable. */
        private _error;
        /** Do we know this thing is full? */
        private _isFull;
        /** Has this provider been initialized? */
        private _isInitialized;
        /**
         * Initializes this provider.
         */
        initialize(desiredSize?: number): void;
        /**
         * Detects whether or not Local Storage is supported by the current user agent.
         */
        isSupported(): boolean;
        /**
         * Returns a boolean value indicating whether or not Local Storage is full.
         */
        isFull(): boolean;
        /**
         * Returns the scoring value for this provider, if supported.
         */
        getScore(): number;
        /**
         * Returns stats about the underlying mechanism.
         */
        getStats(): storage.StorageStats;
        /**
         * Ensures the provider is initialized before performing an action.
         */
        private _ensureInitializedThen(successCallback);
        /**
         * Ensures initialization unless it's known that storage has not been granted
         * and the call will ask the user to grant storage, then skipCallback is called.
         * @param successCallback
         * @param skipCallback
         */
        private _silentlyEnsureInitializeThen(successCallback, skipCallback?);
        /**
         * Perform window.requestFileSystem or window.webkitRequestFileSystem
         * @param type
         * @param size
         * @param successCallback
         * @param errorCallback
         */
        private _requestFileSystem(type, size, successCallback, errorCallback);
        /**
         * Perform navigator.webkit[Temporary|Persistent]Storage.requestQuota or window.webkitStorageInfo.requestQuota
         * @param storageType
         * @param newQuotaInBytes
         * @param successCallback
         * @param errorCallback
         */
        private _requestQuota(storageType, newQuotaInBytes, successCallback?, errorCallback?);
        /**
         * Perform navigator.webkit[Temporary|Persistent]Storage.requestQuota or window.webkitStorageInfo.requestQuota
         * @param storageType
         * @param successCallback
         * @param errorCallback
         */
        private _queryUsageAndQuota(storageType, successCallback?, errorCallback?);
        /**
         * Writes a value to the filesystem. The path of the file will match the key, and the file will contain the value.
         * @param key
         * @param value
         * @param successCallback
         * @param errorCallback
         */
        private _writeValue(key, value, successCallback, errorCallback, shared?);
        /**
         * Reads a value from a filesystem file whose name matches the key.
         * @param key
         * @param successCallback
         * @param errorCallback
         * @param shared
         */
        private _readValue(key, successCallback, errorCallback, shared?);
        /**
         * If passed a FileError, this method will format a message for it and return a regular Error object.
         * This is to avoid "leaking" File API implementation details through the StorageProviderBase interface.
         * @param {Error} e
         */
        private _shapeError(e);
        /**
         * Clears all data for the current application.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clear(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Clears all data for this domain.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clearAllData(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Fetches a value based on its key.
         * @param key The key of the value to fetch.
         * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
         * @param errorCallback The callback to fire if an error occurs.
         * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
         */
        get(key: string, successCallback: (value: any) => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Adds a new key/value pair to storage or overwrites an existing one.
         * @param key The key for the value being stored.
         * @param value The value to store.
         * @param successCallback The callback to fire upon success.
         * @param errorCallback The callback to fire if an error occurs.
         * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
         */
        set(key: string, value: any, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Removes a key and associated value from the store.
         * @param key The key for which key/value pair to remove.
         * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
         * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
         * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
         */
        remove(key: string, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
    }
}
declare module geocortex.framework.storage {
    /**
     * Storage provider that uses the widely supported Local Storage mechanism to persist values.
     */
    class LocalStorageProvider extends storage.StorageProviderBase {
        private static _namespaceSeperator;
        /**
         * Alias of window.localStorage
         */
        private _localStorage;
        private _isFull;
        /**
         * Initializes this provider.
         */
        initialize(): void;
        /**
         * Detects whether or not Local Storage is supported by the current user agent.
         */
        isSupported(): boolean;
        /**
         * Returns a boolean value indicating whether or not Local Storage is full.
         */
        isFull(): boolean;
        /**
         * Returns the scoring value for this provider, if supported.
         */
        getScore(): number;
        /**
         * Returns stats about the underlying mechanism.
         */
        getStats(): storage.StorageStats;
        /**
         * Clears all data in Local Storage for this namespace.  If an error occurs as many entries
         * will be deleted as possible and the last error passed into errorCallback.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clear(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Clears all data for the current application.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clearAllData(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Fetches a value based on its key.
         * @param key The key of the value to fetch.
         * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
         * @param errorCallback The callback to fire if an error occurs.
         * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
         */
        get(key: string, successCallback: (any) => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Adds a new key/value pair to storage or overwrites an existing one.
         * @param key The key for the value being stored.
         * @param value The value to store.
         * @param successCallback The callback to fire upon success.
         * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
         * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
         */
        set(key: string, value: any, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Removes a key and associated value from the store.
         * @param key The key for which key/value pair to remove.
         * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
         * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
         * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
         */
        remove(key: string, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
    }
}
declare module geocortex.framework.storage {
    /**
     * Serves as an abstraction over a number of different client - side storage technologies.
     */
    class Store {
        private app;
        private _provider;
        private _rootNamespace;
        /**

        /**
         * Initializes a new instance of an {@link geocortex.framework.storage.Store} object.
         * @param app The {@link geocortex.framework.storage.Application} that this module belongs to.
         * @param rootNamespace An optional parameter that is used to prefix storage keys.
         */
        constructor(app: application.Application, keyNamespace?: string);
        /**
         * Initializes the store. During initialization, the most appropriate storage technology for the current user agent will be chosen.
         * @param provider If passed, this provider will be used instead of the Store attempting to detect the most suitable choice.
         */
        initialize(provider?: storage.StorageProviderBase): void;
        hasProvider(): boolean;
        private _yield(func);
        private _yieldError(func);
        private _yieldGet(func?);
        /**
         * Clears all local data for the current application.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clear(successCallback?: () => void, errorCallback?: (error: Error) => void): void;
        /**
         * Clears all local data for this domain.
         * @param successCallback The callback to fire after the data has been successfully cleared.
         * @param errorCallback The callback to fire if an error occurs.
         */
        clearAllData(successCallback?: () => void, errorCallback?: (error: Error) => void): void;
        private _sanitizeKey(key);
        /**
         * Sets the value for the given key, creating the key if it does not exist, and overwriting the current value if it does.
         * @param key The key to set the value of.
         * @param value The string value to set.
         * @param successCallback (key, value) The callback to invoke upon successfully writing to the underlying storage mechanism.
         * @param errorCallback (error, key, value) The callback to invoke if an error occurs trying to write to the underlying storage mechanism. Passed a key, and the error that occurred.
         * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
         */
        set(key: string, value: any, successCallback: (key: string, value: any) => void, errorCallback: (error: Error, key: string, value: any) => void, shared?: boolean): any;
        /**
         * Gets the value for the given key, firing a success callback with the value (or null if it wasn't found).
         * @param key The key for which value to fetch.
         * @param successCallback (value, key) The callback to invoke upon successfully reading from the underlying storage mechanism.
         * @param errorCallback (error, key) The callback to invoke if an error occurs trying to read from the underlying storage mechanism.
         * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
         */
        get(key: string, successCallback: (value: any, key: string) => void, errorCallback: (error: Error, key: string) => void, shared?: boolean): any;
        /**
         * Removes a key and associated value from the store.
         * @param key The key for which key/value pair to remove.
         * @param successCallback (key) The callback to invoke upon successfully removing from the underlying storage mechanism.
         * @param errorCallback (error, key) The callback to invoke if an error occurs trying to remove from the underlying storage mechanism.
         * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
         */
        remove(key: string, successCallback: (key: String) => void, errorCallback: (error: Error, key: string) => void, shared?: boolean): any;
    }
}
declare module geocortex.framework.events {
    class ViewDimensionsChangedArgs {
        view: ui.ViewBase;
        region: any;
        constructor(view: ui.ViewBase, region: any);
    }
}
declare module geocortex.framework.ui {
    class ViewManagerRegionEntry {
        name: String;
        views: ViewBase[];
    }
    class ViewManager {
        /**
         * The {@link geocortex.framework.application.Application} that this view manager instance belongs to.
         */
        app: application.Application;
        private _views;
        private _hostedRegions;
        private _pendingRegions;
        constructor(app: application.Application);
        /**
         * Shuts this instance down, freeing all regions and views.
         */
        shutdown(): void;
        /**
         * Registers some view-related commands.
         * @private
         */
        private _registerCommands();
        /**
         * Activates the given view, if it is currently hosted in a region.
         * @param view The view to activate.
         */
        activateView(view: ViewBase): boolean;
        /**
         * Deactivates the given view.
         * @param view The view.
         */
        deactivateView(view: ViewBase): boolean;
        /**
         * Either activates or deactivates a view based on its isVisible flag.
         * @param view The view to toggle.
         */
        toggleView(view: ViewBase): void;
        /**
         * Creates a view and hosts it in a region, if a region is specified.
         * @param viewConfig The {@link geocortex.framework.config.ViewConfigInterface} representing the view to be created.
         */
        createView(viewConfig: config.ViewConfigInterface): ViewBase;
        /**
         * Convenience method to create and bind a view model and view. The view will be initially visible, and if a region name is
         * supplied, the view will be activated in that region.
         * @param viewType Type name of the view instance to create. If null, {@link geocortex.framework.ViewBase} is used.
         * @param viewMarkup Resource name of the markup file to use with the view.
         * @param regionName Optional region name to activate the view in.
         * @param viewModelType Type name of the viewModel to use. The view will be attached to it.
         * @param libraryId The library that this view originates from. This is used primarily for internationalization purposes.
         */
        create(viewType: string, viewModelType: string, viewMarkup: string, regionName: string, libraryId: string): ViewBase;
        /**
         * Destroys a view, wiping out its bindings and DOM substructure.
         * @param view The view to destroy.
         */
        destroyView(view: ViewBase): void;
        /**
         * Destroys a region, unbinding and destroying any views contained in it.
         * @param region The region to destroy.
         */
        destroyRegion(region: any): void;
        /**
         * Discovers regions in a given DOM element by searching for a data-region-name attribute.
         * @param element The DOM element to examine.
         * @param view If passed, any regions discovered will belong to this view.
         */
        discoverRegions(element: HTMLElement, view?: ViewBase): void;
        /**
         * Gets a hosted region by name.
         * @param regionName The name of the region to fetch.
         */
        getExistingRegionByName(regionName: string): RegionAdapterBase;
        /**
         * Gets a pending region entry by name. A pending region entry is an object representing a region that has not yet been created but
         * is referenced by one or more views.
         * @param regionName The name of the region.
         */
        private _getPendingRegionEntryByName(regionName);
        /**
         * Removes a pending region entry by name.
         * @param regionName The name of the pending region entry to remove.
         */
        private _removePendingRegionEntry(regionName);
        /**
         * Given a view ID, returns the region that the currently belongs to.
         * @param viewId
         */
        getRegionForViewId(viewId: string): RegionAdapterBase;
        /**
         * Gets a view by id.
         * @param id The ID of the view to fetch.
         */
        getViewById(id: string): ViewBase;
        /**
         * Returns all of the currently known views in the application.
         */
        getViews(): ViewBase[];
        /**
         * Notifies the system that the dimensions of a view have changed.
         * This makes it possible for the containing region or some other construct to reposition the view
         * based on the new dimensions. This method will raise the event `ViewDimensionsChangedEvent`, passing
         * along the view and the region that its hosted in.
         * @param view The view that's been resized.
         */
        notifyDimensionsChanged(view: ViewBase): void;
    }
}
declare module geocortex.framework.utils {
    /**
     * Trace provides an application-wide log sink with hook points for extensible logging. Uses typical error levels.
     */
    class Trace {
        /** The {@link geocortex.framework.application.Application} that this trace belongs to. */
        app: application.Application;
        /**
         * Initializes a new instance of the {@link Trace} class.
         * @param app The {@link Trace} that this module belongs to.
         */
        constructor(app?: application.Application);
        private _traceImpl(lvl, msg, stack?);
        private _stackTraceFromException(ex);
        /**
         * Logs a message at the debug level.
         * @param msg The message to log.
         */
        debug(msg: string): void;
        /**
         * Logs a message at the trace level.
         * @param msg The message to log.
         */
        trace(msg: string): void;
        /**
         * Logs a message at the info level.
         * @param msg The message to log.
         */
        info(msg: string): void;
        /**
         * Logs a message at the alert level.
         * @param msg The message to log.
         */
        alert(msg: string): void;
        /**
         * Logs a message at the warning level.
         * @param msg The message to log.
         */
        warning(msg: string): void;
        /**
         * Logs a message at the error level.
         * @param msg The message to log.
         * @param error The exception that generated the message.
         */
        error(msg: string, error?: Error): void;
        /**
         * Logs a message at the exception level.
         * @param msg The message to log.
         * @param ex The exception that generated the message.
         */
        exception(msg: string, error?: Error): void;
    }
}
declare module geocortex.framework.application {
    class ModuleBase extends FrameworkObject {
        /**
         * The {@link geocortex.framework.application.Application} that this module belongs to.
         */
        app: application.Application;
        /**
         * The configuration object that this module was initialized with.
         */
        configuration: any;
        /**
         * The names of behaviors associated with this module.
         * Keeping these make it so when the module is destroyed we can purge the behaviors from the registry.
         */
        behaviorNames: string[];
        /**
         * Base class for all application modules. This class should be inherited from by any module to be loaded by an application,
         * as the application will attempt to call an initialize method on anything it deems a module.
         * Modules are instantiated when an {@link geocortex.framework.application.Application} loads a library containing modules
         * that have configuration present in the application configuration.
         */
        /**
         * Initializes a new instance of the {@link geocortex.framework.application.ModuleBase} class.
         * @param app The {@link geocortex.framework.application.Application} that this module belongs to.
         * @param libraryId The ID of the library that this component originated from.
         */
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        /**
         * Called when an {@link geocortex.framework.application.Application} succesfully instantiates this module. Override this to provide
         * custom initialization behaviour. When overriding, it is a good idea to call the base implementation using Dojo's "inherited" construct.
         */
        initialize(moduleConfiguration: any): void;
        /**
         * Called on module destruction.
         * Used to clear the behavior registry of all behaviors associated with this module.
         */
        onDestroy(): void;
        /**
         * Called when an {@link geocortex.framework.application.Application} is shutting down.
         * @param state Custom state object, perhaps indicating a shutdown reason or exception.
         */
        shutdown(state: any): void;
    }
}
declare module geocortex.framework.application {
    /**
     * ModuleManager provides some basic module management functionality, tracking and instantiating module instances.
     * A global ModuleManager instance lives in the base {@link geocortex} namespace.
     */
    class ModuleManager {
        /**
         * The {@link geocortex.framework.application.Application} that this module manager belongs to.
         */
        app: application.Application;
        /** @private */
        private _modules;
        /**
         * Initializes a new instance of the {@link geocortex.framework.application.ModuleManager} class.
         * @param app The {@link geocortex.framework.application.Application} that this module belongs to.
         */
        constructor(app: application.Application);
        /**
         * Shuts down the module manager, calling "shutdown" on all loaded modules and removing them from the managed collection.
         * @param state Custom shutdown related state (such as an exception) to pass to each module via shutdown().
         */
        shutdown(state: any): void;
        /**
         * Creates an instance of a module by its type name.
         * @param moduleTypeName The type name of the module to instantiate.
         * @param libraryId The ID of the library that this module belongs to.
         */
        instantiate(moduleTypeName: string, libraryId: string): any;
        /**
         * Marks a module as being loaded.
         * @param moduleName The configured name of the module to instantiate.
         * @param moduleInstance The instance of the module to be loaded.
         */
        markModuleLoaded(moduleName: string, moduleInstance: ModuleBase): void;
        /**
         * Checks if a module has been loaded or not.
         * @param moduleName The configured name of the module to check for.
         */
        moduleIsLoaded(moduleName: string): boolean;
        /**
         * Notifies if/when a module is loaded. If the module is already loaded, the supplied callback is fired immediately.
         * If the module has not yet been loaded, the callback will be fired when it becomes loaded.
         * Take care to avoid using this method unless it is absolutely required, as it can introduce unnecessary coupling between modules.
         * @param moduleName The configured name of the module to notify for.
         * @param notificationCallback The callback to fire if/when the module is loaded.
         */
        notifyModuleLoaded(moduleName: string, notificationCallback: (moduleName: string) => void): void;
    }
}
declare var gcxNativeReady: boolean;
declare var gcxNativeReadyCallback: () => void;
declare module geocortex.framework.application {
    /**
     * Represents a Framework.js application instance.
     * Application provides library and module loading services and offers application-level lifecycle support and infrastructure.
     * An instance of {@link Application will utilize} framework services to provide and manage an application lifecycle
     * for a collection of modules to participate in.
     */
    class Application {
        command: commands.FrameworkCommands;
        event: events.FrameworkEvents;
        behavior: behaviors.BehaviorBase;
        /**
         * The version of the app. Defaults to the primary version of Framework.js.
         */
        version: string;
        /**
         * Named configuration tokens for injection into JSON configuration. In configuration, tokens are wrapped by brackets like so:
         *
         * `{{TokenKey}}`
         *
         * When the application processes configuration, it will populate these token values according to the name/value pairs in `configTokens`.
         * Note that configuration tokens can only be used as JSON values and not keys.
         *
         * ````
         * "siteUri": "sites/{{SiteName}}"
         * ````
         */
        configTokens: {
            [key: string]: string;
        };
        /**
         * Aborts initialization of the application. This is useful for preventing unnecessary processing of configuration or library code
         * in the case that an OAuth style authentication redirect is needed, or an erroneous condition will prevent the app and initilization
         * should be completely aborted.
         */
        abortInitialization: boolean;
        /**
         * The ID of the application. This is used for keying application-wide resources, for example when using the {@link Store} to store data.
         * It should be a simple string key with no spaces or special characters.
         */
        id: string;
        /**
         * The path of the hosted address of this application, not including the file portion, e.g. "http://localhost/my/app"
         */
        host: string;
        /**
         * Whether or not the app is in "debug mode", enabling arbitrary debug functionality. Setting `debugMode` to true in basic Framework applications
         * will cause the data-binding engine to leave data-binding statements in the DOM (for inspection purposes).
         */
        debugMode: boolean;
        /**
         * Whether or not configuration can be loaded from other domains. If this is set to `true`, the application proxy will be used.
         */
        allowCrossDomainConfig: boolean;
        /**
         * Application-wide configuration available to all components. This is defined in the `application` section of configuration.
         */
        configuration: config.ApplicationJson;
        /**
         * Indicates whether or not the application is functioning in an offline mode. Setting this {@link Observable} changes the online/offline state
         * of the application (for applications with offline capabilities).
         */
        isOffline: Observable<boolean>;
        /**
         * Indicates whether or not the application is functioning in some sort of enhanced native container, e.g. within Cordova or some other
         * native application application container or framework.
         */
        isNative: Observable<boolean>;
        /**
        * Indicates the address of the native layer, if the web app has been loaded within a GMAF instance
        */
        localServerAddress: string;
        /**
         * The application's locale identifier. The application will attempt to pull a locale identifier from the `navigator` object
         * if present. The locale can, by default, be overriden in the URL like so: `index.html?locale=en-CA`.
         */
        locale: string;
        /**
         * An object containing the URL parameters passed into the application.
         */
        urlParameters: {
            [key: string]: string;
        };
        /**
         * Whether or not the application is in development/debug mode. When an application is in development mode, certain runtime behaviour
         * may differ from when not in development mode. This is a somewhat abritrary flag in place as single, unified application flag.
         */
        developmentMode: boolean;
        /**
         * An optional proxy URI to use.
         */
        proxyUri: string;
        /**
         * Whether or not the application was served via HTTPS.
         */
        isHttpsMode: boolean;
        /**
         * Invoked when the application has downloaded all libraries and finished initializing.
         */
        initializationCompleteCallback: (app: Application) => void;
        /**
         * Indicates whether or not all libraries have been loaded.
         */
        allLibrariesLoaded: boolean;
        /**
         * The URI of a JSON configuration block that was used to intialize the application, if it was specified.
         */
        configUri: string;
        /**
         * An optional configuration preprocessor - a function to process the configuration in place before parsing and loading.
         * After initialization, this is nulled out.
         */
        configPreprocessor: (configObject: any) => void;
        /**
         * The object used to provide the application with configuration, if specified.
         */
        configModel: geocortex.framework.config.ConfigurationModel;
        /**
         * The instance of a {@link geocortex.framework.utils.Trace} facility used by this application instance.
         */
        trace: utils.Trace;
        /**
         * An instance of {@link ModuleManager} used to manage application modules.
         */
        moduleManager: application.ModuleManager;
        /**
         * An instance of {@link CommandRegistry} used to manage and invoke named {@link Command}s.
         */
        commandRegistry: commands.CommandRegistry;
        /**
         * An instance of {@link EventRegistry} used to manage and dispatch named {@link Event}s.
         */
        eventRegistry: events.EventRegistry;
        /**
         * An instance of {@link BehaviorRegistry} used to manage {@link Behavior}s.
         */
        behaviorRegistry: behaviors.BehaviorRegistry;
        /**
         * A {@link geocortex.framework.storage.Store} to manage and facilitate storage of local data, particularly for offline use,.
         */
        store: geocortex.framework.storage.Store;
        /**
         * The {@link geocortex.framework.ui.ViewManager} instance used to manage hierarchies of regions and views.
         */
        viewManager: geocortex.framework.ui.ViewManager;
        /** An application-wide instance of a {@link RegionAdapterBase} that creates and manages a modal popup. */
        modalRegionSingleton: ui.PopupModalRegionAdapter;
        _resourceDictionaries: {
            [key: string]: any;
        };
        private configObject;
        private pendingLibraryDownloads;
        private pendingLocaleDownloads;
        private hostElement;
        private frameworkObjects;
        /**
         * Creates a new instance of {@link Application}.
         * @param configObject Either a string URI, or a configuration object. If a string is passed, it will be treated as a URI and the application will attempt to fetch it. If an object is passed, it will be used as configuration.
         * @param hostElement An optional container element of the application. The application will constrain its initial region discovery to within this element.
         * This allows multiple framework applications to live on the same page without interfering with each other.
         * @param id An optional application ID. This will be used to prefix storage keys, allowing for multiple distinct applications to live and store compartmentalized data on the same domain.
         * @param configTokens An optional set of tokens that can be referenced in configuration.
         */
        constructor(configObject: any, hostElement?: HTMLElement, id?: string, configTokens?: {
            [token: string]: string;
        });
        /**
         * Returns the order that a library has been configured in.
         * @param libraryId The ID of the library.
         */
        getLibraryOrder(libraryId: string): number;
        /**
         * Tests whether a not a library should have its styles omitted.
         * @param libraryId The ID of the library in question.
         */
        shouldOmitStylesForLibrary(libraryId: string): boolean;
        /**
         * Translates configuration, substituting library-specific culture specific strings for the appropriate locale.
         * @param libraryId The ID of the library that the module configuration belongs to.
         * @param configuration The configuration to translate.
         * @private
         */
        translateConfiguration(libraryId: string, configuration: any): any;
        /**
         * Takes a string with 0 or more tokens in it, and returns a string with the replacement tokens replaced.
         * @param value The string with the replacement tokens in it.
         */
        performTokenReplacement(value: string): string;
        /**
         * Determines whether or not a URI is HTTPS by looking at the scheme.
         * @param uri The URI to test.
         */
        isHttpsUri(uri: string): boolean;
        /**
         * Given a relative URI, returns an absolute URI based on the application's URI.
         * @param uri The relative URI to make absolute.
         * @param appPathOverride Optional. Allows you to make the URI absolute using a different URI base.
         */
        makeAbsolute(uri: string, appPathOverride?: any): string;
        /**
         * Gets the container element of the application.
         */
        getHostElement(): HTMLElement;
        /**
         * Gets a language resource from the Application's resource dictionary, given a library ID, key, and optional locale.
         * Returns null if the resource does not exist.
         * @param libraryId The ID of the library the resource is for.
         * @param key The resource key.
         * @param locale The locale of the resource to fetch. Defaults to the current application locale.
         */
        getResource(libraryId: string, key: string, locale?: string): string;
        /**
         * Returns a URI, using the proxy if configured. Warns when mixed HTTP/HTTPS content is requested.
         * @param uriPiece A relative or absolute URI to format.
         * @todo Review if this is used anymore. May be time to deprecate it.
         */
        getUri(uriPiece: string): string;
        /**
         * Returns the url parameter, ignoring case.
         * @param paramName The parameter to run a case insensitive search for and retrieve
         * @return The url parameter if found, or null
         */
        getUrlParameter(paramName: string): string;
        /**
         * Occurs when all libraries for this application have been processed. Invoked even if one or more libraries failed to download.
         * To check if a specific library has successfully downloaded, use the hasLibrary function or check the libraries array on the app.
         * @event
         * @param app A {@link geocortex.framework.application.Application}.
         */
        onLibrariesDownloaded(app: application.Application): void;
        /**
         * Called immediately after the configuration object has been loaded from JSON, before any libraries have been downloaded.
         */
        onConfigurationLoaded(configObject: any): void;
        /**
         * Called by the framework to notify the application that a library has been downloaded.
         * @param libraryId The ID of the library that has been downloaded.
         */
        notifyLibraryDownload(libraryId: string): void;
        hasLibrary(libraryId: string): boolean;
        /**
         * Registers a Framework.js object. Framework objects are registered against an {@link Application} for clean-up later.
         * @param obj The object to register. This object must have a unique ID.
         */
        registerFrameworkObject(obj: FrameworkObject): FrameworkObject;
        freeAllFrameworkObjects(): void;
        /**
         * System-wide method to get a {@link FrameworkObject} by ID.
         * @param id The ID of the object to fetch.
         */
        getFrameworkObjectById(id: any): FrameworkObject;
        /**
         * Begins the application initialization process.
         */
        initialize(): void;
        /**
         * Shuts down the application, releasing all modules, views, bindings, view models, regions, commands, and events.
         * @param state Custom state object, indicating a shutdown reason or exception.
         */
        shutdown(state: any): void;
        private _doIfNoPendingLibraryDownloads();
        /**
         * @private
         */
        private onInitializationComplete();
        /**
         * Detects the browser locale to use in the application. This method will first consider the browser defined user language.
         * @private
         */
        private detectBrowserLocale();
        /**
         * Starts downloading library resources.
         * @private
         */
        private downloadLibraries(configurationModel);
        /**
         * Adds the specified library resources for the specified library and locale to the application.
         * @param libraryId The ID of the library to inject resources for.
         * @param dictionary The dictionary of resources.
         * @param locale The locale of the resources.
         */
        injectLibraryResources(libraryId: string, dictionary: {
            [key: string]: any;
        }, locale: string): void;
        /**
         * Instantiates a new FrameworkObject, passing in the application instance.
         * @param typeName The fully-qualified name of the type to instantiate.
         * @param libraryId The ID of the library that this object belongs to.
         */
        instantiateFrameworkObject(typeName: string, libraryId: string): any;
        /**
         * Includes and runs a script file.
         * @param scriptUri The URI of the script file to include.
         * @param successCallback The callback to fire if the script was successfully served via JSONP.
         * @param errorCallback The callback to fire if any error occurred trying to download the script.
         */
        includeScript(uri: string, successCallback: (script: string) => void, errorCallback: (error: Error) => void): void;
        /** @private */
        private processConfiguration(configurationModel);
        addNativeReadyFunction(callback: () => void): void;
        /**
         * Initializes an array of configured modules.
         * @param modules An array of configured modules to initialize.
         * @private
         */
        private initializeModules(modules);
        /**
         * Fetches a configuration resource, provided it comes from the same domain or a whitelisted domain.
         * @param args Arguments containing a URL to fetch. These will be passed directly into an XmlHttpRequest via `dojo.xhrGet`.
         */
        fetchConfigResource(args: {
            url: string;
        }): any;
        /**
         * Generates a random string matching the length of the string passed in. Useful when testing internationalization.
         * @param stringResource The original string resource.
         */
        private _getDebugLocaleString(stringResource);
    }
}
declare module geocortex.framework.application {
    class ResourceManager {
        private resources;
        private cachedResources;
        private themesToInject;
        /**
         * Fetches a pre-registered resource by name, performing any decoding or processing required based on the resource format.
         * @param resourceName The name that this resource was registered with, local to the libraryId.
         * @param libraryId The ID of the library that the resource belongs to.
         * @param locale The locale ID of the resource to fetch. Defaults to the invariant culture ID.
         */
        fetch(resourceName: string, libraryId: string, locale?: string): any;
        /**
         * Fetches all resources of a given format from the given library.
         * @param libraryId The configured ID of the library to fetch resources for.
         * @param format The format of the desired resources.
         */
        fetchAllFor(libraryId: string, format: string): any[];
        /**
         * Registers a resource against a library with a name, a format, and a base-64 encoded data chunk.
         * @param libraryId The ID of the library that the resource belongs to.
         * @param locale The locale that this resource is for.
         * @param resourceName The name of the registered resource, local to the library.
         * @param resourceFormat The format identifier of the resource.
         * @param resourceData The base-64 encoded data for this resource.
         */
        register(libraryId: string, locale: string, resourceName: string, resourceFormat: string, resourceData: any): void;
        /**
         * Unregisters and removes a resource.
         * @param resourceName The name that the resource was registered with.
         * @param libraryId The ID of the library that the resource belongs to.
         * @param locale The locale of the resource.
         */
        remove(libraryId: string, resourceName: string, locale: string): boolean;
        /**
         * Adds a CSS theme to the collection of themes to inject when the viewer loads all of its external code dependencies.
         * @param themeUri
         */
        injectTheme(themeUri: any): void;
        /**
         * Performs theme injection. This method is called once by an application when it has become initialized.
         */
        performThemeInjection(): void;
        /**
         * Finds a specific resources by name, library ID, and locale.
         * @param resourceName The name that the resource was registered with.
         * @param libraryId The ID of the library that the resource belongs to.
         * @param locale The optional locale of the resource. Defaults to the invariant locale.
         */
        private findResource(resourceName, libraryId, locale?);
    }
}
declare module geocortex {
    var resourceManager: geocortex.framework.application.ResourceManager;
}
declare module geocortex.framework {
    var applications: geocortex.framework.application.Application[];
    var libraries: {
        [libraryId: string]: boolean;
    };
    var injectedStyleBlocks: HTMLStyleElement[];
    var initialized: boolean;
    function registerApplication(application: geocortex.framework.application.Application): void;
    function hasLibrary(libraryId: any): boolean;
    function notifyLibraryDownload(libraryId: string): void;
    function initialize(): void;
}
declare module geocortex.framework.ui {
    /**
     * Displays a single div in a named region. If another div is added to the region, the previous one is removed.
     */
    class DivRegionAdapter extends RegionAdapterBase {
        /**
         * Initializes a new instance of the {@link geocortex.framework.ui.DivRegionAdapter} class.
         * @param name Region name to use for this adapter.
         * @param app The {@link geocortex.framework.application.Application} that this DivRegionAdapter belongs to.
         */
        constructor(name: string, app: application.Application);
        /**
         * Removes all views from the region.
         */
        unhostAllViews(): void;
        /**
         * Hosts a single view in the region, removing any pre-existing ones.
         * @param view The view to host.
         */
        hostView(view: ViewBase): boolean;
        /**
         * Removes a view from the region. The view should pre-exist in the region.
         * @param view The view to unhost.
         */
        unhostView(view: ViewBase): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * DivStackRegionAdapter Models a number of views as a stack of div elements.Views are brought to the top when activated.
     * Multiple views may be visible at once and may overlap each other.
     */
    class DivStackRegionAdapter extends RegionAdapterBase {
        /** Array of all the active views in this region. */
        activeViews: ViewBase[];
        /** Whether or not to move a view to the last position in the region's DOM container when activating. */
        activateViewsInLastPosition: boolean;
        /**
         * Initializes a new instance of the {@link DivStackRegionAdapter} class.
         * @param name The optional name of the region adapter.
         * @param app The {@link geocortex.framework.application.Application} that this DivStackRegionAdapter belongs to.
         */
        constructor(name: string, app: application.Application);
        /** @inherited */
        host(element: HTMLElement, options?: any): void;
        /**
         * Activates a view, making it visible and bringing it to the top of the active stack.
         * @param view The view to activate. This view should already be hosted in the region.
         */
        activateView(view: ViewBase): void;
        /**
         * Deactivates a view, making it non-visible and removing it from the active stack.
         * @param view The view to deactivate. This view should already be hosted in the region.
         */
        deactivateView(view: ViewBase): void;
        /**
         * Adds a view to the region and binds it to its view model, if present.
         * @param view
         */
        hostView(view: ViewBase): boolean;
        /**
         * Removes a view from this region.
         * @param view
         */
        unhostView(view: ViewBase): void;
        /**
        * Gets the name of that element that the view will be hosted in. The default is div,
        * but the developer can specify that a different element name should be used through
        * the tagName property of the options.
        */
        private getHostedTagName();
    }
}
declare module geocortex.framework.ui {
    class MultiViewRegionAdapter extends RegionAdapterBase {
        /**
         * Activates a view, making it the visible view in this region.
         * @param view The view to activate. This view should already be hosted in the region.
         */
        activateView(view: ViewBase): void;
        /**
         * Deactivates a view, making it non-visible. The previous view is made visible, if active.
         * @param view The view to activate. This view should already be hosted in the region.
         * @param activatePrevious
         */
        deactivateView(view: ViewBase, activatePrevious?: boolean): void;
        /**
         * Makes all views in this region non-visible.
         */
        hideAllViews(): void;
        /**
         * Adds a view to the region and binds it to its view model.
         * @param view The view to add to the region.
         */
        hostView(view: ViewBase): boolean;
        /**
         * Gets the name of that element that the view will be hosted in. The default is div,
         * but the developer can specify that a different element name should be used through
         * the tagName property of the options.
         */
        getHostedTagName(): string;
        /**
         * Removes a view from the region.
         * @param view The view to remove from the region.
         */
        unhostView(view: ViewBase): void;
    }
}
declare module geocortex.framework.ui {
    class MultiDivRegionAdapter extends MultiViewRegionAdapter {
        getHostedTagName(): string;
    }
}
declare module geocortex.framework.utils.DateUtils {
    function containsTimezone(s: string): boolean;
    function getTimezoneOffset(): number;
    function getTimezoneString(): string;
}
declare module geocortex.framework.utils {
    /**
     * TimeDelayedAction provides a wrapper around a `setTimeout()` function call that makes it easy to stop and reset.
     */
    class TimeDelayedAction {
        /** The amount of delay before the function is called. */
        delayMS: number;
        /** The function to execute. */
        private func;
        private _timerHandle;
        /**
         * Initializes a new instance of the {@link geocortex.framework.utils.TimeDelayedAction} class.
         * You must call the start method to start the timer.  It does not auto-start.</p>
         * @param delayMS The number of milliseconds until the function is executed.
         * @param func The function to execute after the time has ellapsed.
         * @param functionContext Provides the value of the this variable in the function callback.
        */
        constructor(delayMS: number, func: () => void, functionContext: any);
        /** Starts the timer. */
        start(): void;
        /** Stops the timer. */
        stop(): void;
        /** Restarts the timer. */
        reset(): void;
    }
}
declare module geocortex.framework {
}
declare module geocortex.framework.storage {
    class HttpStorageProvider extends storage.StorageProviderBase {
        fileStorageEndpoint: string;
        localServerAddress: string;
        private _initialized;
        constructor(app: geocortex.framework.application.Application);
        /**
         * Initializes this provider.
         */
        initialize(): void;
        /**
         * Detects whether or not this provider is supported by the current user agent.
         */
        static isSupported(): boolean;
        fileStorageRequest(method: string, path: string, successCallback: (result?: any) => void, errorCallback: (error: Error) => void, data?: any): void;
        /**
         * Clears all data for the current application.
         * @param successCallback
         * @param errorCallback
         */
        clear(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Clears all data for all applications.
         * @param successCallback
         * @param errorCallback
         */
        clearAllData(successCallback: () => void, errorCallback: (error: Error) => void): void;
        /**
         * Fetches a value based on its key.
         * @param key The key of the value to fetch.
         * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
         * @param errorCallback The callback to fire if an error occurs.
         * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
         */
        get(key: string, successCallback: (result: any) => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Adds a new key/value pair to storage or overwrites an existing one.
         * @param key The key of the value to store.
         * @param value The value to store.
         * @param successCallback The callback to fire upon success.
         * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
         * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
         */
        set(key: string, value: any, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
        /**
         * Removes a key and associated value from the store.
         * @param key The key for which key/value pair to remove.
         * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
         * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
         * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
         */
        remove(key: string, successCallback: () => void, errorCallback: (error: Error) => void, shared?: boolean): void;
    }
}
declare module geocortex.framework.utils {
    /**
    Allows you to look up a formatter based on a format string.
    */
    var DateFormatters: {
        "d": (date: Date) => string;
        "dd": (date: Date) => string;
        "f": (date: Date) => string;
        "ff": (date: Date) => string;
        "fff": (date: Date) => string;
        "ffff": (date: Date) => string;
        "fffff": (date: Date) => string;
        "ffffff": (date: Date) => string;
        "fffffff": (date: Date) => string;
        "F": (date: Date) => string;
        "FF": (date: Date) => string;
        "FFF": (date: Date) => string;
        "FFFF": (date: Date) => string;
        "FFFFF": (date: Date) => string;
        "FFFFFF": (date: Date) => string;
        "FFFFFFF": (date: Date) => string;
        "h": (date: Date) => string;
        "hh": (date: Date) => string;
        "H": (date: Date) => string;
        "HH": (date: Date) => string;
        "m": (date: Date) => string;
        "mm": (date: Date) => string;
        "M": (date: Date) => string;
        "MM": (date: Date) => string;
        "s": (date: Date) => string;
        "ss": (date: Date) => string;
        "y": (date: Date) => string;
        "yy": (date: Date) => string;
        "yyy": (date: Date) => string;
        "yyyy": (date: Date) => string;
        "yyyyy": (date: Date) => string;
    };
}
declare module geocortex.framework.utils {
    /**
     * Represents a collection of objects that have a common key.
     */
    interface Grouping<TKey, TSource> {
        /**
         * The key of the grouping.
         */
        key: TKey;
        /**
         * The collection of elements that share a common key.
         */
        items: TSource[];
    }
}
declare module geocortex.framework.utils {
    class Tuple {
        item1: any;
        item2: any;
        item3: any;
        item4: any;
        item5: any;
        static equals(a: Tuple, b: Tuple): boolean;
        static compare(a: Tuple, b: Tuple): number;
        constructor(item1: any, item2: any, item3?: any, item4?: any, item5?: any);
    }
}
