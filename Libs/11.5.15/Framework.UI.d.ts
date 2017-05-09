/// <reference path="framework.d.ts" />
/// <reference path="dojo.d.ts" />
/// <reference path="jquery.d.ts" />
/**
 * Offers support for smooth, efficient animations on mobile devices and in modern browsers.
 */
declare module geocortex.framework.ui.animation {
    /** The maximum number of delegated animation operations that the system will attempt to perform in a single animation frame. */
    var MAX_OPS_PER_FRAME: number;
    /**
     * Returns the default {@link AnimationFactory}, which will use the default {@link AnimationProvider} associated with it.
     */
    function getDefault(): AnimationFactory;
    /**
     * Creates a new animation using the default {@link AnimationFactory}.
     * @param element The element to apply the animation on.
     * @param keyframes The animation keyframes to apply. Can be an array of CSS class names to apply, or an array of {@link AnimationKeyframe}.
     * @param frameCallback An optional callback to execute after every frame.
     */
    function create(element: HTMLElement, keyframes?: AnimationKeyframe[], frameCallback?: AnimationFrameCallback): AnimationSequence;
    /**
     * Creates a new animation using the default {@link AnimationFactory} and plays it.
     * @param element The element to apply the animation on.
     * @param keyframes The animation keyframes to play. Can be an array of CSS class names to apply, or an array of {@link AnimationKeyframe}.
     * @param frameCallback An optional callback to execute after every frame.
     */
    function play(element: HTMLElement, keyframes: AnimationKeyframe[], frameCallback?: AnimationFrameCallback): Thenable<AnimationEvent>;
    /**
     * Schedules an action to be done on an animation frame.
     * As a general rule, any work that touches the DOM (write **or read**) should be deferred using this mechanism (if possible).
     * @param delegate The delegated action.
     */
    function scheduleForAnimationFrame(delegate: () => void): void;
}
declare module geocortex.framework.ui.animation {
    /**
     * Represents an event emitted by an {@link AnimationSequence}, or by an {@link AnimationProvider}.
     */
    interface AnimationEvent {
        /** The current state of the {@link AnimationSequence}. */
        state: AnimationState;
        /** The element that the animation is being applied to. */
        element: HTMLElement;
        /** The current or last keyframe applied. */
        frame: AnimationKeyframe;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * A mechanism for creating visual animations that can be satisfied by different instances of an {@link AnimationProvider}.
     */
    class AnimationFactory {
        protected _isInitialized: boolean;
        protected _animationProvider: AnimationProvider;
        /**
         * Constructs a new instance of {@link AnimationFactory} with the given animation provider.
         * @param frameProvider The frame provider to use. This will perform the actual animation.
         */
        constructor(animationProvider?: AnimationProvider);
        /**
         * Creates a new animation for a particular element.
         * @param element The element to apply the animation to.
         * @param keyframes The animation's keyframes.
         * @param frameCallback A callback to invoke after every each keyframe has completed.
         */
        create(element: HTMLElement, keyframes?: string[], frameCallback?: AnimationFrameCallback): AnimationSequence;
        /**
         * Returns the animation provider for this factory.
         */
        getAnimationProvider(): AnimationProvider;
        /**
         * Sets the animation provider for this factory.
         * @param animationProvider The provider to use.
         */
        setAnimationProvider(animationProvider: AnimationProvider): void;
        /**
         * Initializes this facility, using a default animation provider if one has not been specified.
         */
        protected _init(): void;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Represents a simple callback that is fired after animation keyframes are complete.
     */
    interface AnimationFrameCallback {
        (event: AnimationEvent): void;
    }
}
declare module geocortex.framework.ui.animation {
    /** Reserved properties on keyframes are not valid CSS names. */
    var reservedKeyframeProperties: string[];
    /**
     * Represents an animation key frame.
     * An animation keyframe may be a reference to a CSS class with transitions associated, or a set of animatable CSS properties and values.
     * http://www.w3.org/TR/css3-transitions/#animatable-css
     */
    interface AnimationKeyframe {
        /**
         * CSS class name to apply for this keyframe.
         * This class name may pre-exist in an application stylesheet and be specified by the API consumer.
         * If not, it may be populated by the animation system to point to an emitted CSS class, depending on the {@link AnimationProvider} used.
         */
        className?: string;
        /**
         * The duration of this keyframe.
         * If this keyframe is a simply a reference to an existing CSS class, and no duration is provided, one
         * will need to be calculated. The act of calculating the duration will cause a layout calculation and should
         * thus be considered expensive.
         * It's always better to explicitly provide a duration if possible.
         */
        duration?: number;
        /**
         * Whether or not this frame is dynamic. Frames that are dynamic do not need to be cached.
         * Frames calculated on the fly and only used once should be considered dynamic frames.
         */
        isDynamic?: boolean;
        background?: any;
        backgroundColor?: any;
        backgroundPosition?: any;
        border?: any;
        borderColor?: any;
        borderBottomColor?: any;
        borderBottomWidth?: any;
        borderLeftColor?: any;
        borderLeftWidth?: any;
        borderRightColor?: any;
        borderRightWidth?: any;
        borderSpacing?: any;
        borderTopColor?: any;
        borderTopWidth?: any;
        bottom?: any;
        clip?: any;
        color?: any;
        crop?: any;
        fontSize?: any;
        fontWeight?: any;
        height?: any;
        left?: any;
        letterSpacing?: any;
        lineHeight?: any;
        margin?: any;
        marginBottom?: any;
        marginLeft?: any;
        marginRight?: any;
        marginTop?: any;
        maxHeight?: any;
        maxWidth?: any;
        minHeight?: any;
        minWidth?: any;
        opacity?: any;
        outline?: any;
        outlineColor?: any;
        outlineOffset?: any;
        outlineWidth?: any;
        padding?: any;
        paddingBottom?: any;
        paddingLeft?: any;
        paddingRight?: any;
        paddingTop?: any;
        right?: any;
        textIndent?: any;
        textShadow?: any;
        transform?: any;
        transitionDuration?: any;
        top?: any;
        verticalAlign?: any;
        visibility?: any;
        width?: any;
        wordSpacing?: any;
        zIndex?: any;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Represents an animation provider that is capable of animating between instances of {@link AnimationKeyframe}.
     * An animation provider may execute the frame in any given way, and it *must* invoke the callback with an {@link AnimationEvent}.
     */
    interface AnimationProvider {
        /**
         * Handles a keyframe in an {@link AnimationSequence}.
         * @param animation The animation itself.
         * @param element The HTML element to provide the frame for.
         * @param currentFrame The current animation frame. This will be `null` for the first frame.
         * @param nextFrame The next animation frame. This will be `null` for the last frame.
         * @param callback The callback to invoke once the frame has completed.
         */
        animate(animation: AnimationSequence, element: HTMLElement, currentFrame: AnimationKeyframe, nextFrame: AnimationKeyframe, callback: (arg?: AnimationEvent) => void): any;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Base implementation of a {@link AnimationFrameProvider}.
     * Not implemented.
     */
    class AnimationProviderBase implements AnimationProvider {
        /** @inherited */
        animate(animation: AnimationSequence, element: HTMLElement, currentFrame: AnimationKeyframe, nextFrame: AnimationKeyframe, callback: (arg?: AnimationEvent) => void): void;
    }
}
declare module geocortex.framework.ui.animation {
    /** @private */
    var _activeAnimations: AnimationSequence[];
    /**
     * Returns `true` if there are animations currently running.
     */
    function isAnimating(): boolean;
    /**
     * Checks if there are no active animations using {@link isAnimating}, and runs any scheduled "idle delegates" if there are no active animations.
     * This is useful when you wish to perform actions in between animations, e.g. setting form field focus.
     */
    function checkAndRunIdle(): boolean;
    /**
     * Schedules an "idle delegate" to be run when there are no more active animations.
     */
    function runWhenIdle(delegate: Function): void;
    /**
     * Represents an animation, defined as a simple sequence of {@link AnimationFrames}.
     * {@link Animation} itself does no actual animation, it's simply an abstract represention of an animation for which the
     * actual mechanism of the visual representation is decoupled. See {@link AnimationFrameProvider}.
     */
    class AnimationSequence {
        protected _state: AnimationState;
        protected _isDynamic: boolean;
        protected _resets: boolean;
        protected _element: HTMLElement;
        protected _frames: AnimationKeyframe[];
        protected _frame: number;
        protected _frameCallback: AnimationFrameCallback;
        protected _frameClass: string;
        protected _animationPromise: Thenable<AnimationEvent>;
        protected _frameProvider: AnimationProvider;
        /**
         * Constructs an instance of {@link AnimationSequence}, given a frame provider, an HTML element, and some optional keyframes.
         * @param frameProvider The {@link AnimationFrameProvider} responsible for interpolating between keyframes.
         * @param element The HTML element that the animation is to run on.
         * @param frames An initial set of 0 or more animation frames to populate the animation with.
         * @param frameCallback A callback to invoke after every frame has completed.
         */
        constructor(frameProvider: AnimationProvider, element: HTMLElement, frames?: any[], frameCallback?: AnimationFrameCallback);
        /**
         * Returns whether or not this animation resets.
         * An animation that resets should cause the animated element to go back to its original state when complete.
         */
        resets(): boolean;
        /**
         * Sets whether or not the animation resets to its original state.
         * @param value Whether or not the animation should reset.
         */
        setResets(value?: boolean): AnimationSequence;
        /**
         * Begins playing the animation, returning a Promise-like object that will be resolved once the animation is complete.
         * @param frameCallback An optional callback to invoke after every frame has been applied and immediately before `_onFrameEnd` is called.
         */
        play(frameCallback?: AnimationFrameCallback): Thenable<AnimationEvent>;
        /**
         * Stops playing the animation by preventing subsequent keyframes from being applied. Note that this will not prevent the visual
         * state of the animation from progressing between keyframes. In other words, an animation stopped will continue to animate until
         * the visual state of current keyframe has been reached.
         */
        stop(): Thenable<AnimationEvent>;
        /**
         * Adds a keyframe to the sequence.
         * The keyframe may represent a pre-defined CSS class, or an object block containing animatable property values.
         * Keyframes may be added to animations that are in progress. However, if the animation has completed, it must be restarted.
         * @param keyframe The keyframe to add to the animation.
         */
        add(keyframe: AnimationKeyframe): AnimationSequence;
        /**
         * Starts the animation sequences and begins progressing through the animation's states and applying keyframes.
         */
        protected _startAnimation(): Thenable<AnimationEvent>;
        /**
         * Moves the animation forward, either to the next keyframe or to the completed state if all keyframes are complete.
         */
        protected _tick(): void;
        /**
         * Completes the animation, resolving the animation's completion promise.
         * @param completed Whether or not to indicate that the animation was actually completed, rather than stopped.
         */
        protected _complete(completed?: boolean): Thenable<AnimationKeyframe>;
        /**
         * Called after each keyframe has been fully applied.
         */
        protected _onFrameEnd(): void;
        /**
         * Applies the current frame in the sequence to the element being animated.
         */
        protected _applyFrame(): void;
        /**
         * Gets the currently activate animation for a given element, if there is one.
         * @param element The element to return the active animation for.
         */
        static getActiveAnimationForElement(element: HTMLElement): AnimationSequence;
        /**
         * Removes the activate animation for a given element, if it exists.
         * @param element The element to remove the animation for.
         */
        static removeAnimationForElement(element: HTMLElement): boolean;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Describes the state of an {@link Animation} at a certain point of time.
     */
    enum AnimationState {
        Idle = 0,
        Started = 1,
        FrameBegin = 2,
        FrameEnd = 3,
        Completed = 4,
        Stopped = 5,
        Error = 6,
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Bookkeeping structure that holds information about a keyframe and any emitted styles associated with it.
     */
    interface CachedKeyframe {
        key: string;
        refCount: number;
        emittedClassName: string;
        count: number;
        frame: AnimationKeyframe;
        duration: number;
        styleBlockIndex: number;
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * An animation provider that executes animations using CSS Transitions in browsers that support them.
     * Rather than interpolate between keyframe values and perform DOM IO every frame, as many animation libraries do,
     * `CssTransitionAnimationProvider` executes animations by offloading as much work to the browser as possible via transitions.
     * Read/write operations from/to the DOM are kept to a minimum and synchronized with animation frames via browsers' `requestAnimationFrame`.
     * The only DOM changes to elements being animated are changes to their CSS class names. Each keyframe in an animation is represented by a CSS class.
     * Arbitrary, defined-in-code animations are handled by emitting keyframe properties and values into CSS classes inside of an internal style sheet.
     */
    class CssTransitionAnimationProvider extends AnimationProviderBase {
        protected _poolSize: number;
        protected _poolFlushFactor: number;
        protected _poolSizeTarget: number;
        protected _emittedStylesheet: CSSStyleSheet;
        protected _prevElement: HTMLElement;
        protected _cachedKeyframeMap: {
            [frameId: string]: CachedKeyframe;
        };
        protected _cachedKeyframesArray: CachedKeyframe[];
        protected _cssPropertyNameMap: {};
        /** @inherited */
        constructor();
        /**
         * Returns the number of emitted keyframes that currently exist in the emission stylesheet.
         */
        getKeyframeStyleCount(): number;
        /** @inherited */
        animate(animation: AnimationSequence, element: HTMLElement, currentFrame: AnimationKeyframe, nextFrame: AnimationKeyframe, callback: (arg?: AnimationEvent) => void): void;
        /**
         * Sets up a property map to map between JavaScript and CSS property names.
         * This allows animation keyframes to be defined in JavaScript using the JavaScript names of CSS properties.
         * It also lets animation authors disregard prefixes.
         */
        protected _setupPropertyMap(): void;
        /**
         * Creats a style sheet to hold emitted classes.
         */
        protected _setupStylesheet(): void;
        /**
         * Generates a frame ID that is also used as a CSS class name.
         */
        protected _generateFrameId(): string;
        /**
         * Gets the CSS name for a JavaScript property name, e.g. returns `background-color` for `backgroundColor`.
         * Performs browser-based prefixing.
         * @param The property name, typically a valid JavaScript identifier (e.g. `backgroundColor`).
         */
        protected getCssNameForProperty(property: string): string;
        /**
         * Gets a hash key for an {@link AnimationKeyFrame}. This is used to uniquely identify the frame contents, rather than the frame instance.
         * In other words, two different frame objects with the exact same properties and values are considered the same.
         * @param frame The animation keyframe to generate a key for.
         */
        protected _getHashKey(frame: AnimationKeyframe): string;
        /**
         * Creates a style rule for an {@link AnimationKeyFrame}, if one does not already exist.
         * @param frame The keyframe to create the style block for, if one does not already exist.
         */
        protected _getCachedKeyframeData(element: HTMLElement, frame: AnimationKeyframe): CachedKeyframe;
        /**
         * Flushes CSS classes from the stylesheet that holds the keyframes.
         * This ensures that the stylesheet does not grow too big over time.
         */
        flushKeyframes(): void;
        protected _swapKeyframeSets(newKeyframeArray: CachedKeyframe[], newKeyframeMap: {
            [key: string]: CachedKeyframe;
        }): void;
        protected _removeKeyframesFromStylesheets(keyframesToRemove: CachedKeyframe[], orderPreserved?: boolean): void;
        /**
         * Gets the current transition duration associated with and element.
         * This is a relatively expensive operation and should ideally be avoided by manually specifying durations in keyframes.
         * @param element The HTML element to compute duration from.
         */
        protected _getKeyframeDuration(element: HTMLElement): number;
        /** @protected **/
        protected _setPoolOptions(options: any): void;
        /**
         * These are used as a manual fallback in case `getComputedStyle` isn't supported.
         */
        protected static _animatableProperties: string[];
    }
}
declare module geocortex.framework.ui.animation {
    /**
     * Represents a Promise-like object.
     */
    interface Thenable<T> {
        then<U>(onFulfilled: (value: T) => Thenable<U>, onRejected: (error: any) => Thenable<U>, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled: (value: T) => Thenable<U>, onRejected?: (error: any) => U, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled: (value: T) => U, onRejected: (error: any) => Thenable<U>, onProgress?: (note: any) => any): Thenable<U>;
        then<U>(onFulfilled?: (value: T) => U, onRejected?: (error: any) => U, onProgress?: (note: any) => any): Thenable<U>;
        resolve(arg: T): any;
        resolve(val: T): Thenable<T>;
        reject(...args: any[]): Thenable<T>;
        rejectWith(context: any, ...args: any[]): Thenable<T>;
    }
}
declare module geocortex.framework.ui {
    class PresentableCollectionPageShortcut {
        pageNumber: Observable<number>;
        isActive: Observable<boolean>;
        cssClass: Observable<string>;
        constructor(pageNumber: number, isActive?: boolean, cssClass?: string);
    }
    /**
     * PresentableCollection implements paging at the collection level and provides an easy way
     * for interface components to manage common collection-related concerns.
     */
    class PresentableCollection<T> extends geocortex.framework.FrameworkObject {
        static RANGE_RELATION_SAME: number;
        static RANGE_RELATION_BEFORE: number;
        static RANGE_RELATION_HEAD: number;
        static RANGE_RELATION_TAIL: number;
        static RANGE_RELATION_AFTER: number;
        static RANGE_RELATION_CONTAINS: number;
        static RANGE_RELATION_CONTAINED: number;
        items: ObservableCollection<T>;
        isSorted: Observable<boolean>;
        isFiltered: Observable<boolean>;
        isPaginated: Observable<boolean>;
        isMultiplePages: Observable<boolean>;
        numberOfItems: Observable<number>;
        currIndexStart: Observable<number>;
        currIndexStartFromOne: Observable<number>;
        currIndexEnd: Observable<number>;
        currPageNumber: Observable<number>;
        prevPageNumber: Observable<number>;
        nextPageNumber: Observable<number>;
        firstPageNumber: Observable<number>;
        lastPageNumber: Observable<number>;
        pageSize: Observable<number>;
        pageShortcuts: ObservableCollection<PresentableCollectionPageShortcut>;
        numPageShortcuts: Observable<number>;
        private _prevIndexStart;
        private _prevIndexEnd;
        private _prevPageNum;
        private _prevPageSize;
        private _itemCollection;
        private _itemCollectionBindingToken;
        private _underlyingCollection;
        private _underlyingCollectionBindingToken;
        /**
        * Initializes a new instance of the {@link geocortex.framework.ui.PresentableCollection} class.
        * @param collection The ObservableCollection object to mirror and paginate for.
        */
        constructor(collection?: ObservableCollection<T>);
        /**
         * Increments the page number.
         */
        nextPage(): void;
        /**
         * Decrements the page number.
         */
        prevPage(): void;
        /**
         * Gets an item from a given position in the underlying collection.
         */
        getAt(i: number): any;
        /**
         * Returns the total number of items in the underlying collection.
         */
        getLength(): number;
        /**
         * Goes even farther than `cleanUp()`, releasing all resources.
         */
        destroy(): void;
        /**
         * Disposes some event handlers and tears down state, resetting the PresentableCollection
         */
        cleanUp(): void;
        /**
         * Attaches to an ObservableCollection and begins mirroring it in a paginated, presentable fashion.
         */
        attachToCollection(collection: ObservableCollection<T>): void;
        /**
         * Attaches to the underlying, proxied collection.
         */
        private _attachToUnderlyingCollection(collection);
        /**
         * Rebinds the entire window of items.
         */
        private _bindEntirePage();
        /**
        * @private
        * Handle enabling or disabling pagination, rebuilding a page window if necessary. */
        private _enableOrDisablePagination(value);
        /**
        * @private
        * Contrains the page size and calculates any shifting of the item window that needs to occur. */
        _calculatePageWindow(): {
            pageShift: number;
            startShift: number;
            endShift: number;
        };
        /**
        * @private
        * Handle a change in the current page size. */
        _handlePageChange(value: any): void;
        /**
        * @private
        * Maintains page range identifiers and bindable pagination items. */
        _maintainPageRanges(): void;
        /**
        * @private
        * Updates the pagination shortcuts to reflect the active/inactive state. */
        _highlightCorrectPageShortcut(): void;
        /**
        * @private
        * Recalculates. */
        private _performWindowRecalc(args);
        /**
        * @private
        * Handle changes to the underlying proxied collection in a way that minimizes the amount of resulting UI redraw. */
        private _handleUnderlyingCollectionChanges(args);
        /**
        * Sorts the entire underlying collection based on the current sorting predicate. */
        sortCollection(): void;
        /**
        * Unsorts the collection and rebinds. */
        unsortCollection(): void;
        /**
        * Uses a simple binary search to find the sorted position of an item. */
        getSortedPosition(item: any): number;
        /**
        * Sorts an array using the default native sort implementation and any sorting predicate set. */
        defaultNativeSort(items: any[], predicate?: (a: any, b: any) => number): any[];
        /** The sorting method to use. */
        sortMethod: (items: any[], predicate?: (a: any, b: any) => number) => any[];
        /** The sorting predicate to use when choosing item positions. */
        sortingPredicate: (a: any, b: any) => number;
        /** The predicate to filter by. */
        filterPredicate: (item: any) => boolean;
        /**
         * Classifies an intersection type based on two pairs of indices.
         * @param startRange1 is inclusive
         * @param endRange1 is exclusive
         * @param startRange2 is inclusive
         * @param endRange2 is inclusive (confusing!)
         */
        static getIntersectType(startRange1: number, endRange1: number, startRange2: number, endRange2: number): number;
    }
}
declare module geocortex.framework.ui.MultiRegion {
    class MultiRegionView extends ViewBase {
        viewModel: MultiRegionViewModel;
        attach(viewModel: framework.ui.MultiRegion.MultiRegionViewModel): void;
        /**
         * Resolves the "RegionViewSwitcherWidget" using default parameters. Configure widget type in configuration to override
         * @param widgetId A string denoting the name of the widget
         * @param context The ViewSwitcherViewModel vontext backing the RegionSwitcherWidget
         * @param binding The binding expression for the widget.
         * @return The widget view.
         */
        resolveWidget(widgetId: string, context: framework.ui.ViewSwitcher.ViewSwitcherViewModel, binding: geocortex.framework.ui.BindingExpression): ViewBase;
        private _wireUpEventSubscriptions();
        private _handleRegionActivatedEvent(region);
        private _handleRegionDeactivatedEvent(region);
    }
}
declare module geocortex.framework.ui.MultiRegion {
    class RegionDescriptor {
        /**
         * The name of this region.
         */
        regionName: string;
        /**
         * The type of this region. Defaults to MultiDivRegionAdapter.
         */
        regionType: string;
        /**
         * The user configured CSS class to apply to this region
         */
        regionCss: string;
        /**
         * A boolean that indicates that this region is currently active.
         */
        regionActive: Observable<boolean>;
        /**
         * A boolean that indicates that more than a single view has been hosted in this region.
         */
        displayRegionViewSwitcher: Observable<boolean>;
        /**
         * The view switcher view model for this region (if this region type supports a view switcher)
         */
        viewSwitcherViewModel: Observable<geocortex.framework.ui.ViewSwitcher.ViewSwitcherViewModel>;
        private DEFAULT_REGION_TYPE;
        private DEFAULT_CSS_CLASS;
        constructor(regionName: string, regionType?: string, regionCss?: string);
    }
}
declare module geocortex.framework.ui {
    interface ViewDescriptorInterface {
        view: ViewBase;
        title: Observable<string>;
        isActive: Observable<boolean>;
        iconUri?: Observable<string>;
        cssClass?: Observable<string>;
        isBusy?: Observable<boolean>;
        scrollTop?: number;
    }
}
declare module geocortex.framework.ui.ViewSwitcher {
    class ViewSwitcherViewDescriptor implements geocortex.framework.ui.ViewDescriptorInterface {
        view: ViewBase;
        title: Observable<string>;
        isActive: Observable<boolean>;
        viewSwitcherViewModel: ViewSwitcherViewModel;
        constructor(view: ui.ViewBase, vsvm: ViewSwitcherViewModel);
    }
}
declare module geocortex.framework.ui.ViewSwitcher {
    /**
     * The ViewSwicherView is a lightweight tab strip representing the various views hosted in any "target" region. The ViewSwitcher will 'listen' for all views hosted in the target region and will pop up
     * a tab to represent the view so users can easily switch between the hosted views. This is a much more lightweight solution than using a full fledged ViewContainerView though that has it's own merits.
     */
    class ViewSwitcherViewModel extends ViewModelBase {
        /**
         * The region this view switcher will target and listen to in order to display tabs for all views hosted
         */
        targetRegion: string;
        /**
         * Descriptors for the views hosted in the target region
         */
        viewDescriptors: ObservableCollection<ViewDescriptorInterface>;
        /**
         * Indicates whether to enable or disable the view switcher based on various criteria - most common being that multiple views have been hosted
         * in the target region.
         */
        viewSwitcherActive: Observable<boolean>;
        /**
         * Constructs a new instance of the ViewSwitcherViewModel. Note that if the optional targetRegion parameter is supplied, the initialize method need not be explicitly invoked.
          If not specified during creation, the initialize method needs to be called to configure the target region
         * @param app The application this class belongs to
         * @param libraryId Optional. The library Id to be used for this class
         * @param targetRegion Optional. The region this switcher should target. If not specified during construction, needs to be specified during initialization.
         */
        constructor(app: application.Application, libraryId?: string, targetRegion?: string);
        /**
         * Initializes the ViewSwitcherViewModel.
         * @param A configuration object containing the target region that this view container will listen to for hosted views.
         */
        initialize(config?: {
            targetRegion: string;
        }): void;
        /**
        * Looks up a view descriptor for a given view.
        * @param view The view to retrieve the descriptor for
        * @return The retrived ViewDescriptor
        */
        getDescriptorForView(view: ViewBase): ViewDescriptorInterface;
        /**
        * Updates the state (enabled/disabled) for the View Switcher. Can be overridden if custom behaviour is needed. Called each time a new view is added or
        * removed from the View Switcher.
        */
        protected updateViewSwitcherState(): void;
        /**
         * Creates and returns the view descriptor for the given view. Override this method to return a custom view descriptor
         * @param view The view for which we need to create the descriptor.
         * @return The view descriptor for the specified view.
         */
        protected createDescriptorForView(view: ViewBase): ViewDescriptorInterface;
        /**
         * Handler for the ViewHostedEvent
         * @param args An object containing the view that has been hosted and the region it has been hosted in
         */
        protected handleViewHostedEvent(args: {
            view: ViewBase;
            region: RegionAdapterBase;
        }): void;
        /**
         * The handler for the ViewUnhostedEvent
         * @param args An object containing the view that has been unhosted and the region it was hosted in
         */
        protected handleViewUnHostedEvent(args: {
            view: ViewBase;
            region: RegionAdapterBase;
        }): void;
        /**
         * The handler for the ViewActivatedEvent
         * @param view The view that was activated
         */
        protected handleViewActivatedEvent(view: ViewBase): void;
        /**
        * The handler for the ViewActivatedEvent
        * @param view The view that was activated
        */
        protected handleViewDeactivatedEvent(view: ViewBase): void;
        /**
         * Returns true if the view switcher is to be enabled. This function checks whether there are multiple views and enables it if there are. If additional
         * checks are required, this method may be overridden. Called each time a new view is added or removed from this view switcher
         */
        protected checkIfSwitcherActive(): boolean;
        /**
         * This function is required because when a view is activated in a MultiViewRegionAdapter, it simply "hides" the currently active view before activating the new one. Therefore, a "ViewDeactivatedEvent" is not fired for the
         * active view its "hiding".
         */
        private _deactivateActiveTabsInTargetRegion();
        private _subscribeEvents();
    }
}
declare module geocortex.framework.ui.MultiRegion {
    /**
     * The MultiRegionView is intended to host a simple view containing various user configured regions. The regions are MultiDivRegionAdapters by default but can be configured as any type. If a
     * region of type MultiDivRegionAdapter detects more than a single view hosted in it, it will automatically insert a view switcher so users can switch between views - unless configured otherwise.
     */
    class MultiRegionViewModel extends geocortex.framework.ui.ViewModelBase {
        /**
         * A collection of region descriptors for all regions created by this MultiRegionViewModel
         */
        regionDescriptors: ObservableCollection<RegionDescriptor>;
        /**
         * A boolean indicating whether or not to automatically insert a view switcher to supported regions hosted by this MultiRegionViewModel. Defaults to false.
         */
        autoInsertViewSwitcher: boolean;
        /**
        * The markup resource to be used to construct the RegionViewSwitcherWidget for supported regions. Defaults to Framework.UI/geocortex/framework/ui/ViewSwitcher/ViewSwitcherView.html
        */
        regionViewSwitcherWidgetMarkup: string;
        /**
         * The markup type to be used for the RegionViewSwitcherWidget for supported regions. Defaults to geocortex.framework.ui.ViewSwitcher.ViewSwitcherView
         */
        regionViewSwitcherWidgetType: string;
        /**
         * The libraryId to be used to construct the RegionViewSwitcherWidget for supported regions. Defaults to Framework.UI
         */
        regionViewSwitcherLibraryId: string;
        /**
         * An array containing the types of supported region adapters to which we can attach a view switcher
         */
        supportedViewSwitcherRegionAdapters: string[];
        /**
         * Initializes the MultiRegionViewModel.
         * @param config A configuration object containing an array of region definitions. Each definition will contain a regionName, optional regionType and optional regionCss. An optional property - autoInsertViewSwitcher -
         * can be set to false to disable automatic insertion of view switchers into regions.
         */
        initialize(config: {
            regions: {
                regionName: string;
                regionType: string;
                regionCss: string;
            }[];
            autoInsertViewSwitcher: boolean;
        }): void;
        getRegionDescriptorByRegionName(regionName: string): RegionDescriptor;
        /**
        * Returns true if a specified region supports a view switcher
        * @param rd The region descriptor for the region
        * @return Returns true if the region supports a view switcher, false otherwise.
        */
        supportsViewSwitcher(rd: RegionDescriptor): boolean;
        /**
         * Creates and returns a descriptor for a given region. Override this method to return a custom region descriptor
         * @param regionName A string denoting the name of the region for which this descriptor is being created
         * @param regionType A string denoting the type of the region for which this descriptor is being created
         * @param regionCss An optional string which defines any custom css to be applied to the new region
         * @return A descriptor for newly constructed region
         */
        protected createDescriptorForRegion(regionName: string, regionType: string, regionCss?: string): RegionDescriptor;
        /**
         * Creates and returns a view model for a view switcher for this region. Override this method to return a custom view switcher.
         * @param targetRegion The region whose views the created view switcher view model should target.
         * @return An initialized ViewSwitcherViewModel.
         */
        protected createViewSwitcherViewModel(targetRegion: string): geocortex.framework.ui.ViewSwitcher.ViewSwitcherViewModel;
        /**
         * Process each region created by the MultiRegionViewModel. May be overridden to provide custom behaviour.
         * @param rd The region descriptor describing the newly created region
         */
        protected processRegion(rd: RegionDescriptor): void;
        private _processRegionDescriptors();
    }
}
declare module geocortex.framework.ui.SplashScreen {
    class SplashScreenView extends ViewBase {
        private _siteInitializedToken;
        private _siteInitializedFailedToken;
        constructor(app: application.Application, libraryId?: string);
        /**
         * Clear the splash screen, once the site has initialized, the initialization has failed, or the Authentication is ready to display.
         */
        removeSplash(): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * Flattens a collection of collections as though it was a single collection
     * with the order of all the elements preserved.  Methods that manipulate the
     * underlying collections are not supported.
     */
    class ObservableCollectionAggregator<T> extends ObservableCollection<T> {
        private _collections;
        private _collectionsBindingToken;
        private _collectionsMembersBindingTokens;
        constructor(collections?: ObservableCollection<ObservableCollection<T>>);
        /**
         * Set the collection of collections that will be exposed as a single flat collection.
         * Set to null to clear.
         */
        setCollectionsSource(collections?: ObservableCollection<ObservableCollection<T>>): void;
        /**
         * Get the collection of collections exposed as a single flat collection.  Changes to
         * this collection will be automatically reflected in the aggregate.
         */
        getCollectionSource(): ObservableCollection<ObservableCollection<T>>;
        private collectionsChanged(args);
        private fixBindings(args);
        private propagateEvents(argsIn);
        private underlyingCollectionChanged(args);
        isEmpty(): boolean;
        length(): number;
        contains(item: T): boolean;
        getAt(index: number): T;
        /**
         * Get a range of values.
         * @param begin the index of the first item to include, inclusive
         * @param end the index of the last item to include, inclusive
         *            (inconsistent with Array.slice, consistent with other ObservableCollection events)
         */
        getRange(begin: number, end?: number): T[];
        indexOf(item: T): number;
        get(): T[];
        getItems(): T[];
        getLength(): number;
        addItems(items: T[]): void;
        addItem(item: T): void;
        insertItems(index: number, items: T[]): void;
        insertItem(index: number, item: T): void;
        removeItem(obj: T): void;
        removeAt(index: number): void;
        removeRange(from: number, to?: number): void;
        clear(): void;
        set(newCollection: T[]): void;
        sync(source: ObservableCollection<T>): void;
        equals(other: any): boolean;
    }
}
declare module geocortex.framework.ui {
    /**
     * A variant of Observable that has a function which can be called to obtain the value,
     * if no value is currently stored.  That function is the delegate.
     *
     * If cacheDelegateResults is true and the value is not undefined or null, that value
     * will be stored. It will be returned on every get() until clear() is called.
     *
     * If cacheDelegateNull is true even null or undefined values from the delegateGetter will
     * be taken as the true value.
     */
    class LazyObservable<T> extends Observable<T> {
        /**
         * Delegate function that can be called to return the value when the stored value is null.
         */
        delegateGetter: () => T;
        /**
         * When true indicates that a value from delegateGetter should be stored.
         */
        cacheDelegateResults: boolean;
        /**
         * When true the value returned from the delegateGetter will be used even if it is
         * undefined or null.
         */
        cacheDelegateNull: boolean;
        private _delegateNullCached;
        constructor(value?: T, delegateGetter?: () => T, cacheDelegateResults?: boolean);
        get(): T;
        /**
         * Clear the stored result. The delegate function will not be called until the
         * next get().
         */
        clear(): void;
    }
}
declare module geocortex.framework.ui {
    /**
     * Applies a filter function to a source Observable collection and only
     * exposes values that pass the filter (returns true).  Change events and
     * getters all work as expected.  Setters are not supported.
     */
    class FilterableCollection<T> extends ObservableCollection<T> {
        private _source;
        private _sourceBindingToken;
        private _filter;
        private _indexMap;
        constructor(source?: ObservableCollection<T>, filter?: (input: T) => boolean);
        /**
         * Set the collection that will be exposed as filtered. Set to null for none.
         * The current filter function will be applied.
         */
        setSource(source?: ObservableCollection<T>): void;
        /**
         * Get the underlying collection being filtered.
         */
        getSource(): ObservableCollection<T>;
        /**
         * Set the function that filters what elements of the source collection
         * will be exposed.  Set to null for no filtering. This function will
         * be called a lot so performance matters.
         */
        setFilter(filter: (input: T) => boolean): void;
        getFilter(): (input: T) => boolean;
        /**
         * Refreshes the collection. The collection is rebuilt from scratch. This method should be called whenever the state of the system
         * is changed such that the filter predicate will return a different result than it previously did.
         */
        refresh(): void;
        /**
         * Rebuild the result from scratch.
         */
        private _redo(args?);
        private _sourceChanged(inArgs);
        /**
         * Find the exposed index of the source index. If the source index is filtered out the next highest
         * or lowest value will be returned depending on how the binary search goes.
         */
        private _findIndexMapIx(sourceIx);
        private _defaultFilter(input);
        isEmpty(): boolean;
        length(): number;
        contains(item: T): boolean;
        getAt(index: number): T;
        getRange(begin: number, end?: number): T[];
        indexOf(item: T): number;
        get(): T[];
        getItems(): T[];
        getLength(): number;
        addItems(items: T[]): void;
        addItem(item: T): void;
        insertItems(index: number, items: T[]): void;
        insertItem(index: number, item: T): void;
        removeItem(obj: T): void;
        removeAt(index: number): void;
        removeRange(from: number, to?: number): void;
        clear(): void;
        set(newCollection: T[]): void;
        sync(source: ObservableCollection<T>): void;
        equals(other: any): boolean;
    }
}
declare module geocortex.framework.ui.Selector {
    /**
     * Models an arbitrary, selectable item in the selector.
     */
    class SelectorItemViewModel<T> {
        /** A unique ID token for the item. */
        id: string;
        /** The name to display for the item. How its displayed is up to the item template used in the selector. */
        displayName: Observable<string>;
        /** Whether or not this item is selected. */
        isSelected: Observable<boolean>;
        /** The actual underlying item that this object wraps */
        item: T;
        /**
         * Constructs a new instance.
         * @param displayName The name to display for the item. How its displayed is up to the template.
         * @param item The actual underlying item that this object wraps.
         * @param isSelected The selected state of the object.
         */
        constructor(displayName?: string, item?: T, isSelected?: boolean);
    }
}
declare module geocortex.framework.ui.Selector {
    /**
     * A fairly generic drop down single/multi select control.
     */
    class SelectorView<T> extends geocortex.framework.ui.ViewBase {
        private _itemViews;
        viewModel: SelectorViewModel<T>;
        /** @inherited */
        attach(viewModel: SelectorViewModel<T>): void;
        /**
         * Handles an item click. In {@link resolveWidget}, we actually set the parent view of newly templated item instances
         * to be this view, which means that the templated widget will actually have data-bound event handlers firing against
         * this view.
         * @param evt The DOM event of the click.
         * @param element The DOM element of the click.
         * @param context The {@link SelectorItemViewModel} that was clicked/touched.
         */
        handleClickItem(evt: Event, element: HTMLElement, context: any): boolean;
        /**
         * Handles the selector being clicked upon, usually by popping it open.
         * @param evt The actual DOM event issued.
         * @param el The actual DOM element that was clicked.
         * @param context The view model context that was clicked.
         */
        handleClickSelector(evt: Event, el: HTMLElement, context: any): void;
        /** @inherited */
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
    }
}
declare module geocortex.framework.ui.Selector {
    /**
     * View Model for the Selector widget.
     */
    class SelectorViewModel<T> extends geocortex.framework.ui.ViewModelBase {
        private _underlyingCollection;
        private _selectedItems;
        private _singleSelect;
        selectorText: Observable<string>;
        noItemsText: Observable<string>;
        items: ObservableCollection<SelectorItemViewModel<T>>;
        syncToken: any;
        displayNameField: string;
        templatePath: string;
        openState: Observable<boolean>;
        /**@inherited */
        constructor(app: framework.application.Application, libraryId: string, singleSelect?: boolean);
        /**
         * Toggles the state of the selector menu, expanding or collapsing it.
         */
        toggleOpenState(): void;
        /**
         * Sets the underlying collection and enables selection of items from it.
         * @param collection The collection of items to model selection for.
         * @param displayNameField The name of the field to use on the underlying items for selection.
         * @param templatePath The resource path of the HTML template to use for rendering.
         */
        setCollection(collection: ObservableCollection<T>, displayNameField: string, templatePath: string): void;
        /**
         * "Adapts" an array of items into {@link SelectorItemViewModels}.
         * @param items The items to adapt in selectable view models.
         */
        private _adapt(items);
        /**
         * Handles changes in the underlying collection, adapting new items and removing entries for items that have been removed.
         * @param changedArgs An instance of {@link events.CollectionChangedArgs} representing the collection change.
         */
        handleUnderlyingCollectionChange(changedArgs: framework.events.CollectionChangedArgs): void;
        /**
         * Given an underlying item, returns the view model for it.
         * @param item The underlying item to find the view model for.
         */
        getViewModelForItem(item: T): SelectorItemViewModel<T>;
        /**
         * Gets a view model for an item, provided that the item is selected.
         * @param item The item.
         */
        getViewModelForSelectedItem(item: T): SelectorItemViewModel<T>;
        /**
         * Returns true or false based on the existence of a view model for a particular item.
         * @param item The item that may or may not have a corresponding view model.
         */
        hasItemViewModelFor(item: T): boolean;
        /**
         * Selects an item, given either an item or a {@link SelectorItemViewModel} for an item.
         * @param item The underlying item to select for. Pass null if you have a {@link SelectorItemViewModel} already.
         * @param itemViewModel The view model, already obtained, to select. Pass null if you just have a raw item.
         */
        selectItem(item: T, itemViewModel?: SelectorItemViewModel<T>): void;
        /**
         * Unselects an item, given either an item or a {@link SelectorItemViewModel} for an item.
         * @param item The underlying item to unselect for. Pass null if you have a {@link SelectorItemViewModel} already.
         * @param itemViewModel The view model, already obtained, to select. Pass null if you just have a raw item.
         */
        unselectItem(item: T, itemViewModel?: SelectorItemViewModel<T>): void;
        /**
         * Invoked when an item is selected.
         * @event
         * @param item The view model containing the item that was selected.
         */
        onSelectItem(item: SelectorItemViewModel<T>): void;
        /**
         * Invoked when an item is unselected.
         * @event
         * @param item The view model containing the item that was unselected.
         */
        onUnselectItem(item: SelectorItemViewModel<T>): void;
        /**
         * Handles changes to the selected state of a view model.
         * @param selected Whether or not the given item is selected.
         * @param itemViewModel The view model to handle selection change for.
         */
        handleSelectionChange(selected: boolean, itemViewModel: SelectorItemViewModel<T>): void;
        /**
         * Unselects any selected items.
         * @param exceptForItem An item to ignore...this item's selected state will not be changed, i.e.
         * because it is intended to be the only selected item.
         */
        unselectAll(exceptForItem?: SelectorItemViewModel<T>): void;
        /**
         * Sets the selected state of an item and handles its presence in {@link selectedItems}.
         * @param item The item.
         * @param itemViewModel The view model for the item.
         * @param selected The selected state to set.
         */
        private _setItemSelectedState(item, itemViewModel?, selected?);
    }
}
declare module geocortex.framework.ui {
    /**
     * Stores values in sorted order based on a sort function.  Use sync to track
     * an existing collection and present it as sorted.
     */
    class OrderedCollection<T> extends ObservableCollection<T> {
        private _sorter;
        private _unsortedSyncToken;
        private _unsortedSyncSource;
        constructor(items?: T[], sorter?: (left: T, right: T) => number);
        /**
         * Change the sorting function and trigger a resort of the collection.
         * If left should come before right then the sort function should return < 0.
         * If left and right are equal the sort function should return 0.
         * If left should come after right the sort function should return > 0.
         */
        setSortFunction(sorter: (left: T, right: T) => number): void;
        getSortFunction(): (left: T, right: T) => number;
        /**
         * The array of items being added need not be sorted.
         */
        addItems(items: T[]): void;
        addItem(item: T): void;
        set(newCollection: T[]): void;
        /**
         * Track changes to the given ObservableCollection and present them in this collection
         * in sorted order.
         */
        sync(source: ObservableCollection<T>): void;
        private _onSyncedCollectionChanged(inArgs);
        insertItems(index: number, items: T[]): void;
        insertItem(index: number, item: T): void;
    }
}
declare module geocortex.framework.ui.ViewContainer {
    class ButtonTabStripView extends ViewBase {
        handleClickTab(evt: Event, el: HTMLElement, ctx: any): void;
    }
}
declare module geocortex.framework.ui.stringLocalizer {
    /**
     * Localize the given list of Observable<string>s when all libraries are downloaded.
     */
    function localizeObservables(app: geocortex.framework.application.Application, libraryId: string, observables: Observable<string>[]): void;
    /**
    * Localize the given <string> when all libraries are downloaded.
    */
    function localizeString(app: geocortex.framework.application.Application, libraryId: string, stringToLocalize: string, callback: (localizedString: string) => void): void;
}
declare module geocortex.framework.ui.utils {
    /**
     * Detects the correct browser vendor prefix to use on CSS properties.
     * @param userAgent If specified, this user agent string will be used instead of the one on the `navigator` object.
     */
    function detectBrowserPrefix(userAgent?: string): string;
    function tapToDismissThis(view: framework.ui.ViewBase, onOtherInteracted?: (evt?: Event) => void, onElementInteracted?: (evt?: Event) => void): void;
}
declare module geocortex.framework.ui.ViewContainer {
    class ViewContainerViewClosedEventArgs {
        /** The ID of the ContainerView that has the view the triggered the event. */
        containerViewId: string;
        /** The ID of the view the triggered the event. */
        viewId: string;
        /** Indicates if the `X` button was pressed when the view deactivated. */
        xButtonClicked: boolean;
        /** Indicates if the `Back` button was pressed when the view deactivated. */
        backButtonClicked: boolean;
        /**
         * Initializes a new instance of the {@link ViewContainerViewClosedEventArgs} class.
         */
        constructor(containerViewId: string, viewId: string, xButtonClicked: boolean, backButtonClicked: boolean);
    }
}
declare module geocortex.framework.ui.ViewContainer {
    class ViewContainerView extends ViewBase {
        headerInsertDomElement: Observable<HTMLElement>;
        footerInsertDomElement: Observable<HTMLElement>;
        scrollContainerTop: Observable<number>;
        scrollContainerBottom: Observable<number>;
        viewModel: ViewContainerViewModel;
        protected _hasDiscoveredRegions: boolean;
        protected _active: boolean;
        protected _keyDownEventToken: any;
        protected _activatingForViewInContainer: boolean;
        constructor(app: application.Application, libraryId?: string);
        attach(viewModelArg?: any): void;
        resize(): void;
        /**
         * Works the same as resize() but after a small delay. This is useful if other elements still need to settle down.
         */
        delayedResize(): void;
        getZerothView(): ui.ViewBase;
        activated(): void;
        deactivated(): void;
        activateContainer(): void;
        deactivateContainer(): void;
        handleScrollChange(evt: Event, el: HTMLElement, ctx: any): void;
        handleRegionActivatedEvent(region: ViewManagerRegionEntry): void;
        handleRegionDeactivatedEvent(region: ViewManagerRegionEntry): void;
        handleClickBack(evt: Event, el: HTMLElement, ctx: any): void;
        handleClickClose(evt: Event, el: HTMLElement, ctx: any): void;
        handleClickTab(evt: Event, el: HTMLElement, ctx: any): void;
        handleClickCloseTab(evt: Event, el: HTMLElement, ctx: any): void;
        /**
         * Handles the document key down event so that the view container can be closed
         * when the escape key is pressed.
         * @param e The event object.
         */
        protected _documentKeyDown(e: KeyboardEvent): void;
        protected _handleViewActivatedInContainerEvent(view: ViewBase): void;
        protected _closeCurrentView(ctx: any): void;
        protected _broadcastClosedEvent(view: ViewBase, xButton: boolean, backButton: boolean): void;
    }
}
declare module geocortex.framework.ui.ViewContainer {
    class ViewContainerViewModel extends ViewModelBase {
        regionName: Observable<string>;
        regionType: Observable<string>;
        headerIsVisible: Observable<boolean>;
        titleBarIsVisible: Observable<boolean>;
        hasCustomHeaderComponent: Observable<boolean>;
        hasCustomFooterComponent: Observable<boolean>;
        showingBackButton: Observable<boolean>;
        showBusyIndicator: Observable<boolean>;
        showHostedViews: Observable<boolean>;
        showingXButton: Observable<boolean>;
        containerTitle: Observable<string>;
        viewTitle: Observable<string>;
        closeTitle: Observable<string>;
        backTitle: Observable<string>;
        fullTitle: Observable<string>;
        viewDescriptors: ObservableCollection<ViewDescriptor>;
        activeViewDescriptors: ObservableCollection<ViewDescriptor>;
        headerInsertDomElement: Observable<HTMLElement>;
        footerInsertDomElement: Observable<HTMLElement>;
        currentView: ViewBase;
        managedViewsOnly: boolean;
        closeOnEscape: boolean;
        defaultViewIconUri: string;
        protected _viewDescriptorConstructor: string;
        protected _activeViews: any;
        protected _insertedViews: any;
        protected _ordering: {};
        protected _backButtonOnRootView: boolean;
        protected _showBackButton: boolean;
        protected _showBackButtonAsX: boolean;
        protected _originalHeaderIsVisibleSetting: boolean;
        protected _showHeaderForStandaloneViews: boolean;
        protected _fullTitleFormatString: string;
        constructor(app: application.Application, libraryId?: string);
        initialize(config: any): void;
        createDescriptorForView(view: ViewBase): ViewDescriptor;
        /**
         * Looks up a view descriptor for a given view.
         */
        getDescriptorForView(view: ViewBase): ViewDescriptor;
        /**
         * Looks up a view descriptor for a given view.
         */
        getDescriptorForActiveView(view: ViewBase): ViewDescriptor;
        /**
         * Handles a view being hosted in the region this container contains.
         */
        handleViewHosted(args: framework.ui.RegionViewHostingEventArgs): void;
        /**
         * Handles a view being unhosted from the region this container contains.
         */
        handleViewUnhosted(args: framework.ui.RegionViewHostingEventArgs): void;
        handleViewActivatedEvent(view: ViewBase): void;
        handleViewDeactivatedEvent(view: ViewBase): void;
        activateViewInContainer(view: ViewBase): void;
        showOrHideCloseButtons(): void;
        deactivateViewInContainer(view: ViewBase): void;
        closeCurrentView(): void;
        deactivateCurrentView(): void;
        deactivateViews(): void;
        getViewPriority(id: string): number;
        protected _addOrderedView(viewDescriptor: ViewDescriptor): void;
        /**
         * Inserts a view descriptor into the collection of descriptors representing active views, maintaining the configured order.
         * @param descriptor The descriptor for the active view.
         */
        insertActiveViewDescriptor(descriptor: ViewDescriptor): void;
        /**
         * Disposes of event handlers and child views. This should be called whenever a ViewContainerViewModel
         * is no longer needed so that this object can be garbage collected, and so that child views are destroyed.
         */
        dispose(): void;
    }
}
declare module geocortex.framework.ui.ViewContainer {
    class ViewDescriptor implements geocortex.framework.ui.ViewDescriptorInterface {
        view: ViewBase;
        iconUri: Observable<string>;
        title: Observable<string>;
        containerTitle: Observable<string>;
        isBusy: Observable<boolean>;
        isActive: Observable<boolean>;
        cssClass: Observable<string>;
        priority: number;
        scrollTop: number;
        constructor(view: ui.ViewBase, vcvm: ViewContainerViewModel);
    }
}
declare module geocortex.framework.ui.ViewSwitcher {
    class ViewSwitcherView extends ViewBase {
        /**
         * Handles the click event on one of the view switcher tabs
         * @param evt The HTML Event
         * @param el The HTML Element
         * @param ctx The ViewDescriptor the associated view
         */
        handleClickTab(evt: Event, el: HTMLElement, ctx: ViewDescriptorInterface): void;
    }
}
