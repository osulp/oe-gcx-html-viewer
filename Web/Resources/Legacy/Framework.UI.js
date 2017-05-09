/*
	
	Copyright (c) 2016, Latitude Geographics Group Ltd.
	All rights reserved.
	       
	Redistribution is not permitted. 
	
	Use in binary form, without modification, is permitted provided that neither 
	the name of the organization nor the names of its contributors may be used 
	to endorse or promote products derived from this software without specific 
	prior written permission.
	       
	THIS SOFTWARE IS PROVIDED BY COPYRIGHT HOLDER ''AS IS'' AND ANY
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL LATITUDE GEOGRAPHICS GROUP LTD. BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/* Begin Script: Framework.UI/framework.ui_ts_out.js ------------------------- */ 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/**
 * Offers support for smooth, efficient animations on mobile devices and in modern browsers.
 */
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation) {
                /** The maximum number of delegated animation operations that the system will attempt to perform in a single animation frame. */
                animation.MAX_OPS_PER_FRAME = 1000;
                var _defaultInstance = null;
                var _animationDelegates = [];
                var _requestedAnimationFrameHandle = 0;
                /**
                 * Returns the default {@link AnimationFactory}, which will use the default {@link AnimationProvider} associated with it.
                 */
                function getDefault() {
                    return _defaultInstance;
                }
                animation.getDefault = getDefault;
                function create(element, keyframes, frameCallback) {
                    if (!_defaultInstance) {
                        _defaultInstance = new animation.AnimationFactory();
                    }
                    return _defaultInstance.create(element, keyframes, frameCallback);
                }
                animation.create = create;
                function play(element, keyframes, frameCallback) {
                    return create(element, keyframes, frameCallback)
                        .play(frameCallback);
                }
                animation.play = play;
                /**
                 * Requests an animation frame using `window.requestAnimationFrame`.
                 * If `requestAnimationFrame` is not available (IE9-), `setTimeout` is used.
                 * @param delegate The delegate to run when the browser is ready.
                 */
                function _requestAnimationFrame(delegate) {
                    // RAF not available? `setTimeout` will have to do.
                    if (!window.requestAnimationFrame) {
                        _requestedAnimationFrameHandle = setTimeout(_animationFrameCallback, 0);
                    }
                    else {
                        _requestedAnimationFrameHandle = requestAnimationFrame(_animationFrameCallback);
                    }
                }
                /**
                 * Called during browser-scheduled `requestAnimationFrame` callbacks, this method executes delegates that have been delegated until the next animation frame.
                 * @private
                 */
                function _animationFrameCallback() {
                    _requestedAnimationFrameHandle = 0;
                    // Magic number! We need an upper limit on the amount of delegates to execute per frame.
                    // If this number is too low, animations won't keep up as keyframes won't be applied fast enough.
                    // If too high, too much work will be scheduled and 60fps targeted frames will be blown.
                    // By making a comprimise, we allow the possibility of animations across many DOM elements but they will not be frame-synced
                    // if the number of them exceeds this limit.
                    var delegates = _animationDelegates.splice(0, animation.MAX_OPS_PER_FRAME);
                    // Note: A try/catch makes perfect sense inside the loop here: if a delegate throws, none of the subsequent ones
                    // in the batch will be executed. Yikes! However, try/catch - at time of writing - will prevent JIT optimizations in V8.
                    // If a try/catch is added, its impact should be gauged. We're not doing a lot of CPU bound work in animation delegates,
                    // but it's worth profiling for future performance enhancements.
                    for (var i = 0; i < delegates.length; ++i) {
                        delegates[i]();
                    }
                    // Is there remaining animation work to do? Schedule another pass, but yield it so it (hopefully) happens on a different actual frame.
                    // Note: There's a chance that this may happen on the same frame.
                    // TODO: This could really benefit from a cross-browser test. The results may be different/interesting.
                    if (_animationDelegates.length && !_requestedAnimationFrameHandle) {
                        setTimeout(function () {
                            _requestedAnimationFrameHandle = requestAnimationFrame(_animationFrameCallback);
                        }, 0);
                    }
                }
                /**
                 * Schedules an action to be done on an animation frame.
                 * As a general rule, any work that touches the DOM (write **or read**) should be deferred using this mechanism (if possible).
                 * @param delegate The delegated action.
                 */
                function scheduleForAnimationFrame(delegate) {
                    _animationDelegates.push(delegate);
                    if (!_requestedAnimationFrameHandle) {
                        _requestedAnimationFrameHandle = requestAnimationFrame(_animationFrameCallback);
                    }
                }
                animation.scheduleForAnimationFrame = scheduleForAnimationFrame;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation) {
                /**
                 * A mechanism for creating visual animations that can be satisfied by different instances of an {@link AnimationProvider}.
                 */
                var AnimationFactory = (function () {
                    /**
                     * Constructs a new instance of {@link AnimationFactory} with the given animation provider.
                     * @param frameProvider The frame provider to use. This will perform the actual animation.
                     */
                    function AnimationFactory(animationProvider) {
                        this._animationProvider = animationProvider || null;
                    }
                    AnimationFactory.prototype.create = function (element, keyframes, frameCallback) {
                        if (!this._isInitialized) {
                            this._init();
                        }
                        return new animation.AnimationSequence(this.getAnimationProvider(), element, keyframes || [], frameCallback);
                    };
                    /**
                     * Returns the animation provider for this factory.
                     */
                    AnimationFactory.prototype.getAnimationProvider = function () {
                        return this._animationProvider;
                    };
                    /**
                     * Sets the animation provider for this factory.
                     * @param animationProvider The provider to use.
                     */
                    AnimationFactory.prototype.setAnimationProvider = function (animationProvider) {
                        this._animationProvider = animationProvider;
                    };
                    /**
                     * Initializes this facility, using a default animation provider if one has not been specified.
                     */
                    AnimationFactory.prototype._init = function () {
                        this._isInitialized = true;
                        // Future improvement: detect/select frame provider based on browser support, and possibly implement some sort of fallback mechanism.
                        if (!this._animationProvider) {
                            this._animationProvider = new animation.CssTransitionAnimationProvider();
                        }
                    };
                    return AnimationFactory;
                }());
                animation.AnimationFactory = AnimationFactory;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation) {
                /** Reserved properties on keyframes are not valid CSS names. */
                animation.reservedKeyframeProperties = ["className", "duration", "isDynamic"];
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation_1) {
                /**
                 * Base implementation of a {@link AnimationProvider}.
                 * Not implemented.
                 */
                var AnimationProviderBase = (function () {
                    function AnimationProviderBase() {
                    }
                    /** @inherited */
                    AnimationProviderBase.prototype.animate = function (animation, element, currentFrame, nextFrame, callback) {
                        throw new Error("Not implemented");
                    };
                    return AnimationProviderBase;
                }());
                animation_1.AnimationProviderBase = AnimationProviderBase;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation_2) {
                /** @private */
                animation_2._activeAnimations = [];
                var _idleDelegates = [];
                /**
                 * Returns `true` if there are animations currently running.
                 */
                function isAnimating() {
                    // If there are active animations and we're not factoring in dynamics, we're active.
                    return animation_2._activeAnimations.length > 0;
                }
                animation_2.isAnimating = isAnimating;
                /**
                 * Checks if there are no active animations using {@link isAnimating}, and runs any scheduled "idle delegates" if there are no active animations.
                 * This is useful when you wish to perform actions in between animations, e.g. setting form field focus.
                 */
                function checkAndRunIdle() {
                    if (isAnimating()) {
                        return false;
                    }
                    var delegates = _idleDelegates.slice();
                    _idleDelegates = [];
                    for (var i = 0; i < delegates.length; ++i) {
                        try {
                            delegates[i]();
                        }
                        catch (error) {
                            console.error("Error during animation delegate: " + error);
                        }
                    }
                    return true;
                }
                animation_2.checkAndRunIdle = checkAndRunIdle;
                /**
                 * Schedules an "idle delegate" to be run when there are no more active animations.
                 */
                function runWhenIdle(delegate) {
                    _idleDelegates.push(delegate);
                    // Don't check/run idle right away, as the caller is likely scheduling something to run as a result of
                    // some sort of event that others may be dispatching animations for.
                    setTimeout(function () { return checkAndRunIdle(); }, 0);
                }
                animation_2.runWhenIdle = runWhenIdle;
                /**
                 * Represents an animation, defined as a simple sequence of {@link AnimationKeyframe} objects.
                 * {@link AnimationSequence} itself does no actual animation, it's simply an abstract represention of an animation for which the
                 * actual mechanism of the visual representation is decoupled. See {@link AnimationProvider}.
                 */
                var AnimationSequence = (function () {
                    /**
                     * Constructs an instance of {@link AnimationSequence}, given a frame provider, an HTML element, and some optional keyframes.
                     * @param frameProvider The {@link AnimationProvider} responsible for interpolating between keyframes.
                     * @param element The HTML element that the animation is to run on.
                     * @param frames An initial set of 0 or more animation frames to populate the animation with.
                     * @param frameCallback A callback to invoke after every frame has completed.
                     */
                    function AnimationSequence(frameProvider, element, frames, frameCallback) {
                        var _this = this;
                        this._frameProvider = frameProvider;
                        this._element = element;
                        this._frame = -1;
                        this._frames = [];
                        this._frameCallback = frameCallback;
                        this._state = animation_2.AnimationState.Idle;
                        if (frames) {
                            frames.forEach(function (frame) { return _this.add(frame); });
                        }
                    }
                    /**
                     * Returns whether or not this animation resets.
                     * An animation that resets should cause the animated element to go back to its original state when complete.
                     */
                    AnimationSequence.prototype.resets = function () {
                        return this._resets;
                    };
                    /**
                     * Sets whether or not the animation resets to its original state.
                     * @param value Whether or not the animation should reset.
                     */
                    AnimationSequence.prototype.setResets = function (value) {
                        this._resets = value;
                        return this;
                    };
                    /**
                     * Begins playing the animation, returning a Promise-like object that will be resolved once the animation is complete.
                     * @param frameCallback An optional callback to invoke after every frame has been applied and immediately before `_onFrameEnd` is called.
                     */
                    AnimationSequence.prototype.play = function (frameCallback) {
                        var _this = this;
                        if (frameCallback) {
                            this._frameCallback = frameCallback;
                        }
                        if (this._state !== animation_2.AnimationState.Idle) {
                            return this._animationPromise.reject(new Error("Animation already in progress."));
                        }
                        // TODO: Switch to a Bluebird promise?
                        this._animationPromise = $.Deferred();
                        // If an active animation exists, finish it before starting the new one.
                        var activeAnimation = AnimationSequence.getActiveAnimationForElement(this._element);
                        if (activeAnimation) {
                            return activeAnimation._animationPromise.then(function (animation) { return _this._startAnimation(); });
                        }
                        else if (this._frames.length) {
                            return this._startAnimation();
                        }
                        else if (this._isDynamic && !this._frames.length) {
                            this._state = animation_2.AnimationState.Idle;
                            return this._animationPromise;
                        }
                    };
                    /**
                     * Stops playing the animation by preventing subsequent keyframes from being applied. Note that this will not prevent the visual
                     * state of the animation from progressing between keyframes. In other words, an animation stopped will continue to animate until
                     * the visual state of current keyframe has been reached.
                     */
                    AnimationSequence.prototype.stop = function () {
                        this._state = animation_2.AnimationState.Stopped;
                        return this._complete(false);
                    };
                    /**
                     * Adds a keyframe to the sequence.
                     * The keyframe may represent a pre-defined CSS class, or an object block containing animatable property values.
                     * Keyframes may be added to animations that are in progress. However, if the animation has completed, it must be restarted.
                     * @param keyframe The keyframe to add to the animation.
                     */
                    AnimationSequence.prototype.add = function (keyframe) {
                        // Handle keyframes defined in CSS.
                        if (typeof keyframe === "string") {
                            var duration = null;
                            var frameString = keyframe;
                            // Does the frame carry a manually specified duration? Let's use it.
                            if (frameString.indexOf(":") > -1) {
                                var framePieces = frameString.split(":");
                                frameString = framePieces[0];
                                duration = parseInt(framePieces[1]);
                            }
                            this._frames.push({ className: frameString, duration: duration });
                        }
                        else {
                            var frameProps = {};
                            for (var p in keyframe) {
                                if (keyframe.hasOwnProperty(p)) {
                                    frameProps[p] = keyframe[p];
                                }
                            }
                            if (this._isDynamic) {
                                frameProps["isDynamic"] = true;
                            }
                            this._frames.push(frameProps);
                        }
                        if (this._isDynamic && this._state === animation_2.AnimationState.Idle) {
                            this._tick();
                        }
                        return this;
                    };
                    /**
                     * Starts the animation sequences and begins progressing through the animation's states and applying keyframes.
                     */
                    AnimationSequence.prototype._startAnimation = function () {
                        var _this = this;
                        animation._activeAnimations.push(this);
                        this._state = animation_2.AnimationState.Started;
                        this._frame = -1;
                        // Defer the first progress event until after returning the completion promise.
                        setTimeout(function () {
                            _this._tick();
                        }, 0);
                        return this._animationPromise.then(function (animation) {
                            AnimationSequence.removeAnimationForElement(_this._element);
                            return animation;
                        });
                    };
                    /**
                     * Moves the animation forward, either to the next keyframe or to the completed state if all keyframes are complete.
                     */
                    AnimationSequence.prototype._tick = function () {
                        if (this._frame >= this._frames.length) {
                            if (!this._isDynamic) {
                                this._complete();
                                return;
                            }
                            else {
                                this._state = animation_2.AnimationState.Idle;
                                return;
                            }
                        }
                        this._applyFrame();
                    };
                    /**
                     * Completes the animation, resolving the animation's completion promise.
                     * @param completed Whether or not to indicate that the animation was actually completed, rather than stopped.
                     */
                    AnimationSequence.prototype._complete = function (completed) {
                        // Defer running the idle delegates until after we complete. This is more or less just to avoid a try/catch block here, as
                        // idle delegate functionality shouldn't prevent the completion promise from resolving.
                        setTimeout(function () {
                            animation.checkAndRunIdle();
                        }, 0);
                        var completedEvent = {
                            state: completed ? animation_2.AnimationState.Stopped : animation_2.AnimationState.Completed,
                            element: this._element,
                            frame: null
                        };
                        return this._animationPromise.resolve(completedEvent);
                    };
                    /**
                     * Called after each keyframe has been fully applied.
                     */
                    AnimationSequence.prototype._onFrameEnd = function () {
                        ++this._frame;
                        this._state = animation_2.AnimationState.Started;
                        this._tick();
                        return;
                    };
                    /**
                     * Applies the current frame in the sequence to the element being animated.
                     */
                    AnimationSequence.prototype._applyFrame = function () {
                        var _this = this;
                        animation_2.scheduleForAnimationFrame(function () {
                            // The current frame is `null` for the first frame. Conversely, nextFrame is `null` on the last frame.
                            // If the animation is dynamic, there will be no `null` last frame.
                            var currentFrame = _this._frame === -1 ? null : _this._frames[_this._frame];
                            var nextFrame = (_this._frame >= _this._frames.length - 1) ? null : _this._frames[_this._frame + 1];
                            if (_this._isDynamic && !nextFrame) {
                                _this._state = animation_2.AnimationState.Idle;
                                return;
                            }
                            _this._state = animation_2.AnimationState.FrameBegin;
                            _this._frameProvider.animate(_this, _this._element, currentFrame, nextFrame, function (event) {
                                event = event || {
                                    state: animation_2.AnimationState.FrameEnd,
                                    element: _this._element,
                                    frame: currentFrame
                                };
                                if (_this._frameCallback) {
                                    try {
                                        _this._frameCallback(event);
                                    }
                                    catch (error) {
                                        console.error("Error in animation frame callback: " + error);
                                        return _this._animationPromise.reject(event);
                                    }
                                }
                                if (event) {
                                    if (event.state === animation_2.AnimationState.Error) {
                                        return _this._animationPromise.reject(event);
                                    }
                                    else if (event.state !== animation_2.AnimationState.FrameEnd) {
                                        throw new Error("Animation provider emitted an event other than an error or a frame.");
                                    }
                                }
                                _this._onFrameEnd();
                            });
                        });
                        return;
                    };
                    /**
                     * Gets the currently activate animation for a given element, if there is one.
                     * @param element The element to return the active animation for.
                     */
                    AnimationSequence.getActiveAnimationForElement = function (element) {
                        return animation._activeAnimations.filter(function (anim) { return anim._element === element; })[0] || null;
                    };
                    /**
                     * Removes the activate animation for a given element, if it exists.
                     * @param element The element to remove the animation for.
                     */
                    AnimationSequence.removeAnimationForElement = function (element) {
                        for (var i = 0; i < animation._activeAnimations.length; ++i) {
                            if (animation._activeAnimations[i]._element === element) {
                                animation._activeAnimations.splice(i, 1);
                                return true;
                            }
                        }
                        return false;
                    };
                    return AnimationSequence;
                }());
                animation_2.AnimationSequence = AnimationSequence;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation) {
                /**
                 * Describes the state of an {@link AnimationSequence} at a certain point of time.
                 */
                (function (AnimationState) {
                    AnimationState[AnimationState["Idle"] = 0] = "Idle";
                    AnimationState[AnimationState["Started"] = 1] = "Started";
                    AnimationState[AnimationState["FrameBegin"] = 2] = "FrameBegin";
                    AnimationState[AnimationState["FrameEnd"] = 3] = "FrameEnd";
                    AnimationState[AnimationState["Completed"] = 4] = "Completed";
                    AnimationState[AnimationState["Stopped"] = 5] = "Stopped";
                    AnimationState[AnimationState["Error"] = 6] = "Error";
                })(animation.AnimationState || (animation.AnimationState = {}));
                var AnimationState = animation.AnimationState;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var animation;
            (function (animation_3) {
                /**
                 * An animation provider that executes animations using CSS Transitions in browsers that support them.
                 * Rather than interpolate between keyframe values and perform DOM IO every frame, as many animation libraries do,
                 * `CssTransitionAnimationProvider` executes animations by offloading as much work to the browser as possible via transitions.
                 * Read/write operations from/to the DOM are kept to a minimum and synchronized with animation frames via browsers' `requestAnimationFrame`.
                 * The only DOM changes to elements being animated are changes to their CSS class names. Each keyframe in an animation is represented by a CSS class.
                 * Arbitrary, defined-in-code animations are handled by emitting keyframe properties and values into CSS classes inside of an internal style sheet.
                 */
                var CssTransitionAnimationProvider = (function (_super) {
                    __extends(CssTransitionAnimationProvider, _super);
                    /** @inherited */
                    function CssTransitionAnimationProvider() {
                        _super.call(this);
                        // Tip: Some protected properties are used in `animations` test suite and they are tested for. If the names change, the suite will break.
                        this._poolSize = 1000;
                        this._poolFlushFactor = 0.75;
                        this._poolSizeTarget = 0.5;
                        this._cachedKeyframeMap = {};
                        this._cachedKeyframesArray = [];
                        this._cssPropertyNameMap = {};
                        // Perform one-time setup.
                        if (!this._emittedStylesheet) {
                            this._setupPropertyMap();
                            this._setupStylesheet();
                        }
                    }
                    /**
                     * Returns the number of emitted keyframes that currently exist in the emission stylesheet.
                     */
                    CssTransitionAnimationProvider.prototype.getKeyframeStyleCount = function () {
                        return this._emittedStylesheet.cssRules.length;
                    };
                    /** @inherited */
                    CssTransitionAnimationProvider.prototype.animate = function (animation, element, currentFrame, nextFrame, callback) {
                        var duration;
                        var nextFrameCached;
                        var wrappedCallback = callback;
                        // If we've got a current frame and a next frame, we're in the midst of the animation and we'll
                        // need to remove the current frame's CSS class and add the next.
                        var newClassName;
                        if (currentFrame && nextFrame) {
                            if (!currentFrame.className) {
                                var currentFrameCached = this._getCachedKeyframeData(element, nextFrame);
                                currentFrame.className = currentFrameCached.emittedClassName;
                            }
                            newClassName = element.className.replace(currentFrame.className, "").trim();
                        }
                        else {
                            if (currentFrame) {
                                newClassName = element.className;
                            }
                            else {
                                newClassName = element.className.replace(/anim-keyframe[-\d\w]+/g, "").trim();
                            }
                        }
                        if (nextFrame) {
                            duration = nextFrame.duration;
                            // If no CSS class name is present on the class, we'll look the frame up from the cache.
                            if (!nextFrame.className) {
                                nextFrameCached = this._getCachedKeyframeData(element, nextFrame);
                                nextFrame.className = nextFrameCached.emittedClassName;
                                if (element.className.indexOf(nextFrame.className) === -1) {
                                    newClassName = newClassName
                                        ? newClassName + " " + nextFrameCached.emittedClassName
                                        : nextFrameCached.emittedClassName;
                                }
                                ++nextFrameCached.refCount;
                                wrappedCallback = function () {
                                    callback();
                                    --nextFrameCached.refCount;
                                };
                            }
                            else {
                                // This keyframe is just a reference to a pre-existing CSS class.
                                if (element.className.indexOf(nextFrame.className) === -1) {
                                    newClassName = newClassName
                                        ? newClassName + " " + nextFrame.className
                                        : nextFrame.className;
                                }
                            }
                        }
                        // Skip the frame if we have the class already.
                        if (nextFrame && $(element).hasClass(nextFrame.className)) {
                            setTimeout(wrappedCallback, 10);
                            return;
                        }
                        // Do a single DOM update to swap keyframe classes, rather than doing `removeClass` + `addClass`.
                        element.className = newClassName.trim().replace(/\s\s+/g, " ");
                        // If we have a cached frame for our next frame, grab a duration from it so we don't have to calculate.
                        if (nextFrameCached && nextFrameCached.duration) {
                            duration = nextFrameCached.duration;
                        }
                        // If we didn't get a duration, calculate it.
                        if (duration == null) {
                            if (!nextFrame && currentFrame.duration) {
                                duration = currentFrame.duration;
                            }
                            else if (nextFrame) {
                                // Note: This is considered expensive and should be avoided as it causes a recalculation of styles.
                                // Durations should be manually specified whereever possible. In other words, code-based animations with manual durations are more performant.
                                duration = this._getKeyframeDuration(element);
                                nextFrame.duration = duration;
                                if (nextFrameCached) {
                                    nextFrameCached.duration = nextFrame.duration;
                                }
                            }
                        }
                        if (!nextFrame) {
                            if (animation.resets()) {
                                element.className = element.className.replace(currentFrame.className, "").trim();
                            }
                        }
                        setTimeout(wrappedCallback, duration != null ? duration : 10);
                    };
                    /**
                     * Sets up a property map to map between JavaScript and CSS property names.
                     * This allows animation keyframes to be defined in JavaScript using the JavaScript names of CSS properties.
                     * It also lets animation authors disregard prefixes.
                     */
                    CssTransitionAnimationProvider.prototype._setupPropertyMap = function () {
                        var prefix = "-{0}-".format(ui.utils.detectBrowserPrefix());
                        // If `window.getComputedStyle` is not present, we're most likely in IE8 or Opera and we'll just fall back to a list
                        // of properties known to be animatable.
                        var propsToMap;
                        if (!window.getComputedStyle) {
                            propsToMap = CssTransitionAnimationProvider._animatableProperties;
                        }
                        else {
                            // Note: The result of `getComputedStyle` can be accessed as both an array or object.
                            // Accessing as an array will give us property names. As an object will give us values (and array keys).
                            // Tested in IE9, FF, Chrome, Safari(Win).
                            var bodyStyles = window.getComputedStyle(document.body);
                            propsToMap = [];
                            for (var i = 0; i < bodyStyles.length; ++i) {
                                propsToMap.push(bodyStyles[i]);
                            }
                        }
                        // Shorthands are not included in the result of `getComputedStyle`.
                        // Because of this, prefixed shorthands need to be injected into our map so things like `transition` get mapped correctly to `-webkit-transition'.
                        // Un-prefixed shorthands not in the map will simply "fall through" and be emitted verbatim.
                        ["transition", "transform"].forEach(function (prop) { return prefix + prop; });
                        // Build the JS to CSS name map, .e.g "transformOrigin": "-webkit-transform-origin".
                        for (var i = 0; i < propsToMap.length; ++i) {
                            var jsName = propsToMap[i]
                                .replace(prefix, "")
                                .replace(/\-(\w)/g, function (str) { return str.toUpperCase().replace("-", ""); });
                            this._cssPropertyNameMap[jsName] = propsToMap[i];
                        }
                    };
                    /**
                     * Creats a style sheet to hold emitted classes.
                     */
                    CssTransitionAnimationProvider.prototype._setupStylesheet = function () {
                        var sheet = document.createElement("style");
                        document.getElementsByTagName("head")[0].appendChild(sheet);
                        // Get last style sheet so that the rules we add will take precedence over ones in existing sheets.
                        this._emittedStylesheet = sheet.sheet;
                    };
                    /**
                     * Generates a frame ID that is also used as a CSS class name.
                     */
                    CssTransitionAnimationProvider.prototype._generateFrameId = function () {
                        return "anim-keyframe-" + framework.utils.alphaNumericToken(8);
                    };
                    /**
                     * Gets the CSS name for a JavaScript property name, e.g. returns `background-color` for `backgroundColor`.
                     * Performs browser-based prefixing.
                     * @param The property name, typically a valid JavaScript identifier (e.g. `backgroundColor`).
                     */
                    CssTransitionAnimationProvider.prototype.getCssNameForProperty = function (property) {
                        return this._cssPropertyNameMap[property] || property;
                    };
                    /**
                     * Gets a hash key for an {@link AnimationKeyFrame}. This is used to uniquely identify the frame contents, rather than the frame instance.
                     * In other words, two different frame objects with the exact same properties and values are considered the same.
                     * @param frame The animation keyframe to generate a key for.
                     */
                    CssTransitionAnimationProvider.prototype._getHashKey = function (frame) {
                        var cleanFrame = {};
                        for (var p in frame) {
                            // If a `duration` is present, it needs to be keyed with, ensuring that similar keyframes with different durations don't conflict.
                            if (!frame.hasOwnProperty(p) || (animation_3.reservedKeyframeProperties.indexOf(p) > -1 && p !== "duration")) {
                                continue;
                            }
                            cleanFrame[p] = frame[p];
                        }
                        return String.quickHashCode(JSON.stringify(cleanFrame));
                    };
                    /**
                     * Creates a style rule for an {@link AnimationKeyFrame}, if one does not already exist.
                     * @param frame The keyframe to create the style block for, if one does not already exist.
                     */
                    CssTransitionAnimationProvider.prototype._getCachedKeyframeData = function (element, frame) {
                        var key = "anim-keyframe" + this._getHashKey(frame);
                        var cachedFrame = this._cachedKeyframeMap[key];
                        if (cachedFrame) {
                            ++cachedFrame.count;
                            return cachedFrame;
                        }
                        var explicitDuration = frame.duration != null;
                        frame.className = key;
                        frame.duration = frame.duration != null ? frame.duration : this._getKeyframeDuration(element);
                        cachedFrame = {
                            key: key,
                            count: 0,
                            refCount: 0,
                            emittedClassName: key,
                            frame: frame,
                            duration: frame.duration,
                            styleBlockIndex: -1
                        };
                        this._cachedKeyframeMap[key] = cachedFrame;
                        this._cachedKeyframesArray.push(cachedFrame);
                        var ruleBody = "." + frame.className + " { ";
                        for (var prop in frame) {
                            if (!frame.hasOwnProperty(prop) || prop === "className" || prop === "duration") {
                                continue;
                            }
                            // Try to map to a CSS name. If not, just emit the raw property name itself.
                            var cssName = this.getCssNameForProperty(prop) || prop;
                            ruleBody += cssName + ": " + frame[prop] + "; ";
                        }
                        // Make sure our own duration comes last just in case it was otherwise accidentally specified as a regular prop.
                        if (explicitDuration) {
                            ruleBody += this.getCssNameForProperty("transitionDuration") + ": " + frame.duration + "ms !important; ";
                        }
                        ruleBody += "} ";
                        cachedFrame.styleBlockIndex = this._emittedStylesheet.insertRule(ruleBody, this._emittedStylesheet.cssRules.length);
                        // Have we reached our threshold of classes? Schedule a flush but hold a reference to the current frame so it doesn't
                        // get flushed.
                        // TODO: Consider scheudling for when idle. Flushing as a request of attempting to get a cached keyframe is poor and will lead to stutter.
                        // This is done here for simplicity and to ensure we don't flush frame we just created.
                        if (this._emittedStylesheet.cssRules.length >= this._poolSize * this._poolFlushFactor) {
                            ++cachedFrame.refCount;
                            this.flushKeyframes();
                            --cachedFrame.refCount;
                        }
                        return cachedFrame;
                    };
                    /**
                     * Flushes CSS classes from the stylesheet that holds the keyframes.
                     * This ensures that the stylesheet does not grow too big over time.
                     */
                    CssTransitionAnimationProvider.prototype.flushKeyframes = function () {
                        // Time to flush! We want to get to our target count, which is some perecentage of the pool size.
                        // We'll keep things as simple as possible by disposing of all frames not currently referenced.
                        // Any in-progress animations who have frames disposed will simply incur the cost of emitting missing frames again.
                        // This is a tradeoff for simplicity in the implementation.
                        var total = this._emittedStylesheet.cssRules.length;
                        var target = this._poolSize * this._poolSizeTarget;
                        var count = total;
                        var newKeyframeMap = {};
                        var newKeyframeArray = [];
                        var keyframesToRemove = [];
                        for (var i = 0; i < this._cachedKeyframesArray.length; ++i) {
                            var frame = this._cachedKeyframesArray[i];
                            if (frame.refCount === 0) {
                                keyframesToRemove.push(frame);
                            }
                            else {
                                newKeyframeArray.push(frame);
                                newKeyframeMap[frame.key] = frame;
                            }
                        }
                        count -= keyframesToRemove.length;
                        this._swapKeyframeSets(newKeyframeArray, newKeyframeMap);
                        // Remove the actual styles for the existing.
                        var length = keyframesToRemove.length;
                        this._removeKeyframesFromStylesheets(keyframesToRemove);
                        if (count <= target) {
                            return;
                        }
                    };
                    CssTransitionAnimationProvider.prototype._swapKeyframeSets = function (newKeyframeArray, newKeyframeMap) {
                        this._cachedKeyframesArray = newKeyframeArray.slice();
                        this._cachedKeyframeMap = {};
                        for (var p in newKeyframeMap) {
                            // Note: Not using `hasOwnProperty` here on purpose - it's known to be slow and we're not worried about `length` and IE8 here.
                            this._cachedKeyframeMap[p] = newKeyframeMap[p];
                        }
                    };
                    CssTransitionAnimationProvider.prototype._removeKeyframesFromStylesheets = function (keyframesToRemove, orderPreserved) {
                        if (orderPreserved === void 0) { orderPreserved = true; }
                        var length = this._cachedKeyframesArray.length;
                        // Remove all the keyframes.
                        // IMPORTANT: Assumes that order is preserved! Rule indices are offset by `i` below.
                        // If we are trying to remove a collection of keyframes sorted by some condition, problems will be had.
                        for (var i = 0; i < keyframesToRemove.length; ++i) {
                            this._emittedStylesheet.removeRule(keyframesToRemove[i].styleBlockIndex - i);
                        }
                        // Rebuild the correct indices using the map.
                        for (var i = 0; i < this._emittedStylesheet.rules.length; ++i) {
                            // Note: Assumes that selectors in the emitted stylesheet will take the form ".anim-keyframe
                            var name = this._emittedStylesheet.rules[i].selectorText.substr(1);
                            this._cachedKeyframeMap[name].styleBlockIndex = i;
                        }
                    };
                    /**
                     * Gets the current transition duration associated with and element.
                     * This is a relatively expensive operation and should ideally be avoided by manually specifying durations in keyframes.
                     * @param element The HTML element to compute duration from.
                     */
                    CssTransitionAnimationProvider.prototype._getKeyframeDuration = function (element) {
                        // Note: `getComputedStyle` not supported in IE8
                        if (!window.getComputedStyle) {
                            return null;
                        }
                        // Note: We're actually just pulling the *first* duration here. If an element has multiple transition durations defined,
                        // all subsequent ones are ignored. That's a fairly uncommon scenario and thus this is kept as a dumb duration check.
                        var style = window.getComputedStyle(element);
                        var durationStr = style.getPropertyValue("transition-duration") || "0";
                        var delayStr = style.getPropertyValue("transition-delay") || "0";
                        var duration = durationStr.indexOf("ms") > -1 ? parseFloat(durationStr) : parseFloat(durationStr) * 1000;
                        var delay = delayStr.indexOf("ms") > -1 ? parseFloat(delayStr) : parseFloat(delayStr) * 1000;
                        return delay + duration;
                    };
                    /** @protected **/
                    CssTransitionAnimationProvider.prototype._setPoolOptions = function (options) {
                        // Note: Options are untyped because these are internal details that we don't want to expose a type for.
                        if (options.hasOwnProperty("poolSize")) {
                            this._poolSize = options["poolSize"];
                        }
                        if (options.hasOwnProperty("poolFlushFactor")) {
                            this._poolFlushFactor = options["poolFlushFactor"];
                        }
                        if (options.hasOwnProperty("poolSizeTarget")) {
                            this._poolSizeTarget = options["poolSizeTarget"];
                        }
                    };
                    /**
                     * These are used as a manual fallback in case `getComputedStyle` isn't supported.
                     */
                    // http://www.w3.org/TR/css3-transitions/#animatable-css
                    CssTransitionAnimationProvider._animatableProperties = [
                        "background",
                        "background-color",
                        "background-position",
                        "border-bottom-color",
                        "border-bottom-width",
                        "border",
                        "border-color",
                        "border-left-color",
                        "border-left-width",
                        "border-right-color",
                        "border-right-width",
                        "border-spacing",
                        "border-top-color",
                        "border-top-width",
                        "bottom",
                        "clip",
                        "color",
                        "crop",
                        "font-size",
                        "font-weight",
                        "height",
                        "left",
                        "letter-spacing",
                        "line-height",
                        "margin",
                        "margin-bottom",
                        "margin-left",
                        "margin-right",
                        "margin-top",
                        "max-height",
                        "max-width",
                        "min-height",
                        "min-width",
                        "opacity",
                        "outline-color",
                        "outline-offset",
                        "outline-width",
                        "padding",
                        "padding-bottom",
                        "padding-left",
                        "padding-right",
                        "padding-top",
                        "right",
                        "text-indent",
                        "text-shadow",
                        "transform",
                        "transition-duration",
                        "transform-origin",
                        "top",
                        "vertical-align",
                        "visibility",
                        "width",
                        "word-spacing",
                        "z-index"
                    ];
                    return CssTransitionAnimationProvider;
                }(animation_3.AnimationProviderBase));
                animation_3.CssTransitionAnimationProvider = CssTransitionAnimationProvider;
            })(animation = ui.animation || (ui.animation = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../_Definitions/framework.d.ts" />
// TODO: Pagination interface.
// TODO: Inserts into sorted collection.
// TODO: Move away from _performWindowRecalc - it's obtuse.
// TODO: Filtering.
// TODO: Make numPageShortcuts reactive.
// TODO: More test cases.
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var PresentableCollectionPageShortcut = (function () {
                function PresentableCollectionPageShortcut(pageNumber, isActive, cssClass) {
                    this.pageNumber = new Observable(pageNumber || null);
                    this.isActive = new Observable(isActive || false);
                    this.cssClass = new Observable(cssClass || "pc-page-shortcut");
                }
                return PresentableCollectionPageShortcut;
            }());
            ui.PresentableCollectionPageShortcut = PresentableCollectionPageShortcut;
            /**
             * PresentableCollection implements paging at the collection level and provides an easy way
             * for interface components to manage common collection-related concerns.
             */
            var PresentableCollection = (function (_super) {
                __extends(PresentableCollection, _super);
                /**
                * Initializes a new instance of the {@link geocortex.framework.ui.PresentableCollection} class.
                * @param collection The ObservableCollection object to mirror and paginate for.
                */
                function PresentableCollection(collection) {
                    _super.call(this, null, null);
                    this.items = new ObservableCollection();
                    this.isSorted = new Observable(false);
                    this.isFiltered = new Observable(false);
                    this.isPaginated = new Observable(true);
                    this.isMultiplePages = new Observable(true);
                    this.numberOfItems = new Observable(0);
                    this.currIndexStart = new Observable(0);
                    this.currIndexStartFromOne = new Observable(1); // 1-indexed, for presentation to user
                    this.currIndexEnd = new Observable(0);
                    this.currPageNumber = new Observable(1);
                    this.prevPageNumber = new Observable();
                    this.nextPageNumber = new Observable();
                    this.firstPageNumber = new Observable(1);
                    this.lastPageNumber = new Observable(1);
                    this.pageSize = new Observable(5);
                    this.pageShortcuts = new ObservableCollection();
                    this.numPageShortcuts = new Observable(10);
                    this._itemCollection = new ObservableCollection();
                    /** The sorting method to use. */
                    this.sortMethod = null;
                    /** The sorting predicate to use when choosing item positions. */
                    this.sortingPredicate = null;
                    // TODO: Implement.
                    /** The predicate to filter by. */
                    this.filterPredicate = null;
                    this._prevIndexStart = this.currIndexStart.get();
                    this._prevIndexEnd = this.currIndexEnd.get();
                    this._prevPageNum = 0;
                    this._prevPageSize = this.pageSize.get();
                    this.sortMethod = this.defaultNativeSort;
                    // Default alphanumeric sorting predicate.
                    this.sortingPredicate = function (a, b) {
                        if (a === b) {
                            return 0;
                        }
                        return (a > b) ? 1 : -1;
                    };
                    if (collection) {
                        this.attachToCollection(collection);
                    }
                    // Wire up our reactive properties.
                    this.auto(this.isSorted, this, function (value) {
                        value ?
                            this.sortCollection()
                            : this.unsortCollection();
                    });
                    this.currIndexStartFromOne.syncTransform(this.currIndexStart, function (value) {
                        return value + 1;
                    });
                    this.auto(this.isPaginated, this, this._enableOrDisablePagination);
                    this.auto(this.currPageNumber, this, this._handlePageChange);
                    this.auto(this.pageSize, this, this._handlePageChange);
                }
                /**
                 * Increments the page number.
                 */
                PresentableCollection.prototype.nextPage = function () {
                    this.currPageNumber.set(this.currPageNumber.get() + 1);
                };
                /**
                 * Decrements the page number.
                 */
                PresentableCollection.prototype.prevPage = function () {
                    this.currPageNumber.set(this.currPageNumber.get() - 1);
                };
                /**
                 * Gets an item from a given position in the underlying collection.
                 */
                PresentableCollection.prototype.getAt = function (i) {
                    return this._itemCollection.getAt(i);
                };
                /**
                 * Returns the total number of items in the underlying collection.
                 */
                PresentableCollection.prototype.getLength = function () {
                    return this._itemCollection.getLength();
                };
                /**
                 * Goes even farther than `cleanUp()`, releasing all resources.
                 */
                PresentableCollection.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this.cleanUp();
                };
                /**
                 * Disposes some event handlers and tears down state, resetting the PresentableCollection
                 */
                PresentableCollection.prototype.cleanUp = function () {
                    // Clear the full known set.
                    if (this._itemCollection) {
                        this._itemCollection.clear();
                    }
                    // Clear the current page of results.
                    if (this.items) {
                        this.items.clear();
                    }
                    // Unsubscribe from the underyling collection's change events.
                    if (this._underlyingCollection) {
                        this._underlyingCollection.unbind(this._underlyingCollectionBindingToken);
                        this._underlyingCollection = null;
                        this._underlyingCollectionBindingToken = null;
                    }
                };
                /**
                 * Attaches to an ObservableCollection and begins mirroring it in a paginated, presentable fashion.
                 */
                PresentableCollection.prototype.attachToCollection = function (collection) {
                    this.cleanUp();
                    if (!collection) {
                        throw new Error("Could not attach to collection.");
                    }
                    this._attachToUnderlyingCollection(collection);
                };
                /**
                 * Attaches to the underlying, proxied collection.
                 */
                PresentableCollection.prototype._attachToUnderlyingCollection = function (collection) {
                    this._underlyingCollection = collection;
                    this._underlyingCollectionBindingToken = this._underlyingCollection.bind(this, this._handleUnderlyingCollectionChanges);
                    this._itemCollection.set(collection.getRange(0));
                    var itemCollectionLength = this._itemCollection.getLength();
                    this.numberOfItems.set(itemCollectionLength);
                    this.currIndexStart.set(0);
                    this.currIndexEnd.set(this.pageSize.get());
                    this.currPageNumber.set(1);
                    if (itemCollectionLength < this.currIndexEnd.get()) {
                        this.currIndexEnd.set(itemCollectionLength);
                        this._prevIndexEnd = itemCollectionLength;
                    }
                    this._bindEntirePage();
                    this._maintainPageRanges();
                };
                /**
                 * Rebinds the entire window of items.
                 */
                PresentableCollection.prototype._bindEntirePage = function () {
                    this._calculatePageWindow();
                    this.items.clear();
                    var items = [];
                    var indexStart = this.currIndexStart.get();
                    var indexEnd = this.currIndexEnd.get();
                    for (var i = indexStart; i < indexEnd; ++i) {
                        var item = this._itemCollection.getAt(i);
                        items.push(item);
                    }
                    this.items.addItems(items);
                    this._prevIndexStart = indexStart;
                    this._prevIndexEnd = this._prevIndexEnd;
                };
                /**
                * @private
                * Handle enabling or disabling pagination, rebuilding a page window if necessary. */
                PresentableCollection.prototype._enableOrDisablePagination = function (value) {
                    // Disabling pagination.
                    if (!value) {
                        this.currIndexStart.set(0);
                        this._prevPageSize = this.pageSize.get();
                        this.pageSize.set(Number.MAX_VALUE);
                        this.pageShortcuts.clear();
                        this._calculatePageWindow();
                        this._bindEntirePage();
                    }
                    else {
                        this.currIndexStart.set(this.currPageNumber.get() * this._prevPageSize);
                        this.pageSize.set(this._prevPageSize);
                        this._calculatePageWindow();
                        this._bindEntirePage();
                        this._maintainPageRanges();
                    }
                };
                /**
                * @private
                * Contrains the page size and calculates any shifting of the item window that needs to occur. */
                PresentableCollection.prototype._calculatePageWindow = function () {
                    var totalLength = this._itemCollection.length();
                    this.lastPageNumber.set(Math.ceil(totalLength / this.pageSize.get()));
                    var start = this.currIndexStart.get();
                    var end = this.currIndexEnd.get();
                    var pageSize = this.pageSize.get();
                    var startShift = 0;
                    var endShift = 0;
                    var pageShift = 0;
                    // Has the collection shrunk out from the window? Shift the window back, either on the same page or multiple pages.
                    // Note: We don't shift the window start back here because we will be looking at the end of the collection which
                    // means we don't have to show (pageSize) elements.
                    if (end > totalLength) {
                        end = totalLength;
                    }
                    // Validate start/end indices.
                    this.currIndexStart.set(0 > start ? 0 : start);
                    this.currIndexEnd.set(Math.min(this._itemCollection.getLength(), this.currIndexEnd.get()));
                    // Calculate discrete shifts in the window start/finish indices.
                    startShift = (this.currIndexStart.get() - this._prevIndexStart);
                    // Did the collection shrink past the start of the window?
                    if (totalLength <= start) {
                        startShift = 0;
                        endShift = 0;
                        pageShift = ~~((start - totalLength + 1) / pageSize + 1);
                        pageShift *= -1;
                        startShift = Math.max(0, pageShift * pageSize);
                    }
                    // Has the collection grown? We may need to expand the window if it's less than pageSize.
                    if (end - start < pageSize && totalLength >= end) {
                        endShift = Math.min(pageSize, totalLength) - (end - start);
                    }
                    // If we have pageShift, don't use startShift and endShift.
                    if (pageShift !== 0) {
                        startShift = 0, endShift = 0;
                    }
                    return {
                        pageShift: pageShift,
                        startShift: startShift,
                        endShift: endShift
                    };
                };
                /**
                * @private
                * Handle a change in the current page size. */
                PresentableCollection.prototype._handlePageChange = function (value) {
                    if (!this.isPaginated.get()) {
                        if (value != Number.MAX_VALUE) {
                            this._prevPageSize = value;
                            this.pageSize.set(Number.MAX_VALUE);
                        }
                        return;
                    }
                    // Silently fix up the actual value of pageSize and pageNumber. Trickery!
                    this.pageSize.value = Math.max(0, Number(this.pageSize.get()));
                    this.currPageNumber.value = Math.max(1, Number(this.currPageNumber.get()));
                    // Don't even bother with bad values.
                    if (isNaN(this.pageSize.get()) || this.pageSize.get() < 1) {
                        return;
                    }
                    // Make sure we are in range.
                    if (this.currPageNumber.get() > this.lastPageNumber.get() && this.lastPageNumber.get() > 0) {
                        this.currPageNumber.set(this.lastPageNumber.get());
                    }
                    else {
                        // For page changes, we'll just rebind the window.
                        this.currIndexStart.set((this.currPageNumber.get() - 1) * this.pageSize.get());
                        this.currIndexEnd.set(Math.min(this._itemCollection.getLength(), this.currIndexStart.get() + this.pageSize.get()));
                        this._prevIndexStart = this.currIndexStart.get();
                        this._prevIndexEnd = this.currIndexEnd.get();
                        this._maintainPageRanges();
                        // Note: Indices get all out of sync here. Use _bindEntirePage for now.
                        //this._performWindowRecalc(this._constrainPage());
                        this._bindEntirePage();
                    }
                };
                /**
                * @private
                * Maintains page range identifiers and bindable pagination items. */
                PresentableCollection.prototype._maintainPageRanges = function () {
                    var numPages = Math.ceil(this._itemCollection.getLength() / this.pageSize.get());
                    this.lastPageNumber.set(numPages);
                    // Set the isMultiplePages flag, but only if it changes.
                    if (numPages > 1 && !this.isMultiplePages.get()) {
                        this.isMultiplePages.set(true);
                    }
                    else if (numPages <= 1 && this.isMultiplePages.get()) {
                        this.isMultiplePages.set(false);
                    }
                    // Kind of redundant but let's just make sure it is 1.
                    this.firstPageNumber.set(1);
                    // Set up the bindable page shortcuts.
                    var numPageShortcuts = this.numPageShortcuts.get();
                    var floor = Math.max(0, this.currPageNumber.get() - numPageShortcuts / 2);
                    var floorRemainder = (numPageShortcuts / 2) - ((this.currPageNumber.get() - floor));
                    var ceil = Math.min(numPages, (this.currPageNumber.get() + (numPageShortcuts / 2) + floorRemainder));
                    if (ceil - floor < this.numPageShortcuts.get()) {
                        floor -= this.numPageShortcuts.get() - (ceil - floor);
                        if (floor < 0) {
                            floor = 0;
                        }
                    }
                    // Rebind paging shortcuts.
                    this.pageShortcuts.clear();
                    var shortcutsToAdd = [];
                    for (var i = floor; i < ceil; ++i) {
                        shortcutsToAdd.push(new PresentableCollectionPageShortcut(i + 1, false));
                    }
                    this.pageShortcuts.addItems(shortcutsToAdd);
                    this._highlightCorrectPageShortcut();
                };
                /**
                * @private
                * Updates the pagination shortcuts to reflect the active/inactive state. */
                PresentableCollection.prototype._highlightCorrectPageShortcut = function () {
                    for (var i = 0; i < this.pageShortcuts.getLength(); ++i) {
                        var shortcut = this.pageShortcuts.getAt(i);
                        if (shortcut.pageNumber.get() === this.currPageNumber.get()) {
                            shortcut.cssClass.set("pc-page-shortcut pc-shortcut-active");
                        }
                        else {
                            shortcut.cssClass.set("pc-page-shortcut");
                        }
                    }
                };
                /**
                * @private
                * Recalculates. */
                PresentableCollection.prototype._performWindowRecalc = function (args) {
                    // If we have Page Shift, just rebind the new page.
                    if (args.pageShift !== 0) {
                        this.currIndexStart.set((this.currPageNumber.get() - 1) * this.pageSize.get());
                        this.currIndexEnd.set(this.currIndexStart.get() + this.pageSize.get());
                        // Constrain.
                        this.currIndexStart.set(Math.max(0, this.currIndexStart.get()));
                        this.currIndexEnd.set(Math.min(this._itemCollection.getLength(), this.currIndexEnd.get()));
                        this._bindEntirePage();
                    }
                    else {
                        if (args.startShift < 0) {
                            // If the window has shifted back, fill in the new slots.
                            var newStart = Math.max(0, this._prevIndexStart + args.startShift);
                            var items = this._itemCollection.getRange(newStart, this._prevIndexStart - 1);
                            this.items.insertItems(0, items);
                        }
                        else if (args.startShift > 0) {
                            this.items.removeRange(0, args.startShift - 1);
                        }
                        if (args.endShift < 0) {
                            this.items.removeRange(this.items.getLength() + args.endShift, this.items.getLength());
                        }
                        else if (args.endShift > 0) {
                            // If the window has shifted forward, fill in the new slots.
                            var newEnd = Math.min(this._itemCollection.getLength(), this.currIndexEnd.get() + args.endShift);
                            var items = this._itemCollection.getRange(this.currIndexEnd.get(), newEnd - 1);
                            this.items.addItems(items);
                        }
                        this.currIndexStart.set(this.currIndexStart.get() + args.startShift);
                        this.currIndexEnd.set(this.currIndexEnd.get() + args.endShift);
                        if (this.currIndexStart.get() < 0) {
                            this.currIndexEnd.set(Math.min(this.items.length(), this.currIndexEnd.get() - this.currIndexStart.get()));
                            this.currIndexStart.set(0);
                        }
                    }
                    this._prevIndexStart = this.currIndexStart.get();
                    this._prevIndexEnd = this.currIndexEnd.get();
                };
                /**
                * @private
                * Handle changes to the underlying proxied collection in a way that minimizes the amount of resulting UI redraw. */
                PresentableCollection.prototype._handleUnderlyingCollectionChanges = function (args) {
                    // TODO: Handle non args arg.
                    // Clear.
                    if (!args || args.type === "clear") {
                        this.items.clear();
                        this._itemCollection.clear();
                        this._calculatePageWindow();
                    }
                    else if (args.type === "replace") {
                        this.items.clear();
                        this._itemCollection.clear();
                        this._itemCollection.addItems(this._underlyingCollection.getRange(0));
                        // TODO: Sort, filter _itemCollection
                        // Constrain the page so we know that we have valid start and end indices.
                        // Note that we are attempting to remain on the same page.
                        this._calculatePageWindow();
                        // Just rebind the entire page.
                        this._bindEntirePage();
                    }
                    else if (args.type === "insert") {
                        // If the insert is into an unsorted collection, we simply need to check whether it occurs before or inside of
                        // the page window and offset accordingly.
                        if (!this.isSorted.get()) {
                            // Update our mirrored collection.
                            var insertedItems = this._underlyingCollection.getRange(args.rangeStart, args.rangeEnd);
                            this._itemCollection.insertItems(args.rangeStart, insertedItems);
                            var rangeRelation = PresentableCollection.getIntersectType(this.currIndexStart.get(), this.currIndexEnd.get(), args.rangeStart, args.rangeEnd);
                            if (rangeRelation === PresentableCollection.RANGE_RELATION_BEFORE ||
                                rangeRelation === PresentableCollection.RANGE_RELATION_HEAD) {
                                var offset = (args.rangeEnd - args.rangeStart) + 1;
                                this._prevIndexStart += offset;
                                this._prevIndexEnd += offset;
                                this._performWindowRecalc({ pageShift: 0, startShift: -offset, endShift: Math.min(-offset + Math.max(this.pageSize.get() - this.numberOfItems.get(), 0), 0) });
                            }
                            else if (rangeRelation === PresentableCollection.RANGE_RELATION_CONTAINED) {
                                this._performWindowRecalc({ pageShift: 0, startShift: 0, endShift: Math.min(-((args.rangeEnd - args.rangeStart) + 1) + Math.max(this.pageSize.get() - this.numberOfItems.get(), 0), 0) });
                                // Manually jam in the new items using their relative positions.
                                this.items.insertItems(args.rangeStart - this.currIndexStart.get(), insertedItems);
                                if (this.currIndexEnd.get() < this.items.length()) {
                                    this.currIndexEnd.set(this.items.length());
                                }
                            }
                            else if (rangeRelation === PresentableCollection.RANGE_RELATION_TAIL) {
                                this.items.removeRange(args.rangeStart - this.currIndexStart.get(), this.items.getLength());
                                var currPageIndexBound = this.currIndexStart.get() + this.pageSize.get();
                                var insertedItemsBound = Math.min(currPageIndexBound, args.rangeEnd);
                                this._performWindowRecalc({ pageShift: 0, startShift: 0, endShift: insertedItemsBound - this.currIndexEnd.get() });
                                // If the inserted items overflow the window, let's clip them.
                                if (args.rangeStart + insertedItems.length > currPageIndexBound) {
                                    insertedItems = insertedItems.slice(0, currPageIndexBound - args.rangeStart);
                                }
                                // Manually jam in the items using their relative positions.
                                this.items.insertItems(args.rangeStart - this.currIndexStart.get(), insertedItems);
                                if (this.currIndexEnd.get() < this.items.length()) {
                                    this.currIndexEnd.set(this.items.length());
                                }
                            }
                            else if (rangeRelation === PresentableCollection.RANGE_RELATION_AFTER) {
                                // Do we have space in the window?
                                var windowSize = (this.currIndexEnd.get() - this.currIndexStart.get());
                                if (windowSize < this.pageSize.get()) {
                                    this.items.addItems(insertedItems.slice(0, this.pageSize.get() - windowSize));
                                }
                            }
                            else {
                                // RANGE_RELATION_SAME
                                this._bindEntirePage();
                            }
                        }
                        else {
                        }
                    }
                    else if (args.type === "append") {
                        if (!this.isSorted.get()) {
                            // Note: If sorting is enabled, each appended record here must be treated like
                            // an insert into itemCollection.
                            this._itemCollection.addItems(this._underlyingCollection.getRange(args.rangeStart, args.rangeEnd));
                            // Constrain the page so we know that we have valid start and end indices.
                            this._performWindowRecalc(this._calculatePageWindow());
                        }
                        else {
                            // If the collection is sorted, treat every inserted item as potentially out of order.
                            for (var i = args.rangeStart; i <= args.rangeEnd; ++i) {
                                var item = this._underlyingCollection.getAt(i);
                                var pos = this.getSortedPosition(item);
                                // Insert into the underlying collection first.
                                this._itemCollection.insertItem(pos, item);
                                if (pos <= this.currIndexStart.get()) {
                                    this.items.removeRange(this.items.getLength() - 1);
                                    this.items.insertItem(0, this._itemCollection.getAt(this.currIndexStart.get()));
                                }
                                else if (pos > this.currIndexStart.get() && pos <= this.currIndexEnd.get()) {
                                    this.items.removeRange(this.items.getLength() - 1);
                                    this.items.insertItem(pos - this.currIndexStart.get(), item);
                                }
                            }
                        }
                    }
                    else if (args.type === "remove") {
                        // For the time being, we will handle single removals in a somewhat efficient way.
                        // For Bulk removals we will just re-render the entire page.
                        // TODO: Improve this.
                        if (args.rangeEnd - args.rangeStart > 0) {
                            //GVH-3228 added loop to remove individual elements in the case of sorted collection
                            if (!this.isSorted.get()) {
                                //if the collection is not sorted, remove the range from _itemCollection
                                this._itemCollection.removeRange(args.rangeStart, args.rangeEnd);
                            }
                            else {
                                //if the collection is sorted, remove each element individually
                                for (var i = args.rangeStart; i <= args.rangeEnd; ++i) {
                                    var position = this.getSortedPosition(this._underlyingCollection.getAt(i));
                                    this._itemCollection.removeRange(position, position);
                                }
                            }
                            this._bindEntirePage();
                        }
                        else {
                            var position = -1;
                            position = this.isSorted.get()
                                ? this.getSortedPosition(this._underlyingCollection.getAt(args.rangeStart))
                                : args.rangeStart;
                            // Update our internal collection.
                            this._itemCollection.removeRange(position, position);
                            // We only care about removals before or inside of our window.
                            if (position < this.currIndexStart.get()) {
                                // Before? Shift entire window.
                                this.currIndexEnd.set(this.currIndexEnd.get() - 1);
                                this._performWindowRecalc({ pageShift: 0, startShift: 1, endShift: 1 });
                                this.currIndexEnd.set(this.currIndexEnd.get() + 1);
                            }
                            else if (position >= this.currIndexStart.get() && position < this.currIndexEnd.get()) {
                                // Inside? Remove the item and shift the end.
                                var windowPosition = (position - this.currIndexStart.get());
                                this.items.removeRange(windowPosition, windowPosition);
                                this.currIndexEnd.set(this.currIndexEnd.get() - 1);
                                this._performWindowRecalc({ pageShift: 0, startShift: 0, endShift: 1 });
                            }
                        }
                    }
                    this.numberOfItems.set(this._itemCollection.getLength());
                    this._maintainPageRanges();
                };
                /**
                * Sorts the entire underlying collection based on the current sorting predicate. */
                PresentableCollection.prototype.sortCollection = function () {
                    var array = this._itemCollection.get();
                    this.sortMethod(array, this.sortingPredicate || null);
                    this._bindEntirePage();
                };
                /**
                * Unsorts the collection and rebinds. */
                PresentableCollection.prototype.unsortCollection = function () {
                    this._itemCollection.set(this._underlyingCollection.getRange(0));
                    this._bindEntirePage();
                };
                /**
                * Uses a simple binary search to find the sorted position of an item. */
                PresentableCollection.prototype.getSortedPosition = function (item) {
                    if (this.isSorted.get() === false) {
                        return this._itemCollection.getLength();
                    }
                    // Binary search.
                    var items = this._itemCollection.get();
                    var itemCount = this._itemCollection.getLength();
                    var pos = 0;
                    var lowPoint = 0;
                    var highPoint = items.length - 1;
                    var i = ~~((highPoint - lowPoint) / 2);
                    while (i < highPoint && i > lowPoint) {
                        var midpointItem = items[i];
                        var result = this.sortingPredicate(item, midpointItem);
                        // TODO: get rid of these....
                        if (this.sortingPredicate(item, items[highPoint]) === 0) {
                            return highPoint;
                        }
                        if (this.sortingPredicate(item, items[lowPoint]) === 0) {
                            return lowPoint;
                        }
                        if (result > 0) {
                            lowPoint = i;
                        }
                        else if (result < 0) {
                            highPoint = i;
                        }
                        else {
                            return i;
                        }
                        i = ~~((highPoint - lowPoint) / 2) + lowPoint;
                    }
                    return i;
                };
                /**
                * Sorts an array using the default native sort implementation and any sorting predicate set. */
                PresentableCollection.prototype.defaultNativeSort = function (items, predicate) {
                    var sorted = null;
                    // Note: Can't call Array.prototype.sort with a null args in IE(9).
                    if (predicate === null || typeof predicate === "undefined") {
                        sorted = items.sort();
                    }
                    else {
                        sorted = items.sort(predicate);
                    }
                    return sorted;
                };
                /**
                 * Classifies an intersection type based on two pairs of indices.
                 * @param startRange1 is inclusive
                 * @param endRange1 is exclusive
                 * @param startRange2 is inclusive
                 * @param endRange2 is inclusive (confusing!)
                 */
                PresentableCollection.getIntersectType = function (startRange1, endRange1, startRange2, endRange2) {
                    if (startRange1 === startRange2 && endRange1 === endRange2) {
                        return geocortex.framework.ui.PresentableCollection.RANGE_RELATION_SAME;
                    }
                    if (startRange2 < startRange1 && endRange2 <= startRange1) {
                        return PresentableCollection.RANGE_RELATION_BEFORE;
                    }
                    else if (startRange2 <= startRange1 && endRange2 < endRange1) {
                        return PresentableCollection.RANGE_RELATION_HEAD;
                    }
                    else if (startRange2 < startRange1 && endRange2 > endRange1) {
                        return PresentableCollection.RANGE_RELATION_CONTAINS;
                    }
                    else if (startRange2 > startRange1 && endRange2 < endRange1) {
                        return PresentableCollection.RANGE_RELATION_CONTAINED;
                    }
                    else if (startRange2 <= endRange1 && endRange2 > endRange1) {
                        return PresentableCollection.RANGE_RELATION_TAIL;
                    }
                    else if (startRange2 > endRange1) {
                        return PresentableCollection.RANGE_RELATION_AFTER;
                    }
                    else {
                        return PresentableCollection.RANGE_RELATION_SAME;
                    }
                };
                PresentableCollection.RANGE_RELATION_SAME = 0;
                PresentableCollection.RANGE_RELATION_BEFORE = 1;
                PresentableCollection.RANGE_RELATION_HEAD = 2;
                PresentableCollection.RANGE_RELATION_TAIL = 3;
                PresentableCollection.RANGE_RELATION_AFTER = 4;
                PresentableCollection.RANGE_RELATION_CONTAINS = 5;
                PresentableCollection.RANGE_RELATION_CONTAINED = 6;
                return PresentableCollection;
            }(geocortex.framework.FrameworkObject));
            ui.PresentableCollection = PresentableCollection;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../../../../../_Definitions/dojo.d.ts" />
/// ../ViewSwitcher/ViewSwitcherViewModel.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var MultiRegion;
            (function (MultiRegion) {
                var MultiRegionView = (function (_super) {
                    __extends(MultiRegionView, _super);
                    function MultiRegionView() {
                        _super.apply(this, arguments);
                    }
                    MultiRegionView.prototype.attach = function (viewModel) {
                        _super.prototype.attach.call(this, viewModel);
                        this._wireUpEventSubscriptions();
                    };
                    /**
                     * Resolves the "RegionViewSwitcherWidget" using default parameters. Configure widget type in configuration to override
                     * @param widgetId A string denoting the name of the widget
                     * @param context The ViewSwitcherViewModel vontext backing the RegionSwitcherWidget
                     * @param binding The binding expression for the widget.
                     * @return The widget view.
                     */
                    MultiRegionView.prototype.resolveWidget = function (widgetId, context, binding) {
                        _super.prototype.resolveWidget.call(this, widgetId, context, binding);
                        if (widgetId === "RegionViewSwitcherWidget") {
                            if (!context) {
                                return null;
                            }
                            var view = this.app.viewManager.createView({
                                markupResource: this.viewModel.regionViewSwitcherWidgetMarkup,
                                typeName: this.viewModel.regionViewSwitcherWidgetType,
                                libraryId: this.viewModel.regionViewSwitcherLibraryId
                            });
                            if (view) {
                                view.attach(context);
                            }
                            return view;
                        }
                        return null;
                    };
                    MultiRegionView.prototype._wireUpEventSubscriptions = function () {
                        // When any of the internally contained regions are activated, we need to do the same to the host view. When all regions are deactivated, we similarly need to deactivate the host view.
                        this.app.event("RegionActivatedEvent").subscribe(this, this._handleRegionActivatedEvent);
                        this.app.event("RegionDeactivatedEvent").subscribe(this, this._handleRegionDeactivatedEvent);
                    };
                    MultiRegionView.prototype._handleRegionActivatedEvent = function (region) {
                        var rd = this.viewModel.getRegionDescriptorByRegionName(region.name.toString());
                        if (rd) {
                            rd.regionActive.set(true);
                            // Activate only if we have a region specified. This MultiRegionView may be hosted as a widget (eg. FeatureDetailsView) in which case its host view will handle activations.
                            this.regionName && !this.isActive && this.app.viewManager.activateView(this);
                        }
                    };
                    MultiRegionView.prototype._handleRegionDeactivatedEvent = function (region) {
                        var rd = this.viewModel.getRegionDescriptorByRegionName(region.name.toString());
                        if (rd) {
                            rd.regionActive.set(false);
                            if (!dojo.some(this.viewModel.regionDescriptors.get(), function (rd) { return rd.regionActive.get() === true; })) {
                                // Deativate only if we have a region specified. This MultiRegionView may be hosted as a widget (eg. FeatureDetailsView) in which case its host view will handle deactivations.
                                this.regionName && this.isActive && this.app.viewManager.deactivateView(this);
                            }
                        }
                    };
                    return MultiRegionView;
                }(ui.ViewBase));
                MultiRegion.MultiRegionView = MultiRegionView;
            })(MultiRegion = ui.MultiRegion || (ui.MultiRegion = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// reference path="../ViewSwitcher/ViewSwitcherViewModel.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var MultiRegion;
            (function (MultiRegion) {
                var RegionDescriptor = (function () {
                    function RegionDescriptor(regionName, regionType, regionCss) {
                        /**
                         * A boolean that indicates that this region is currently active.
                         */
                        this.regionActive = new Observable(false);
                        /**
                         * A boolean that indicates that more than a single view has been hosted in this region.
                         */
                        this.displayRegionViewSwitcher = new Observable(false);
                        /**
                         * The view switcher view model for this region (if this region type supports a view switcher)
                         */
                        this.viewSwitcherViewModel = new Observable(null);
                        this.DEFAULT_REGION_TYPE = "geocortex.framework.ui.MultiDivRegionAdapter";
                        this.DEFAULT_CSS_CLASS = "region-container";
                        if (!regionName) {
                            throw new Error("RegionDescriptor Error: Cannot create region descriptor. Region name not defined.");
                        }
                        this.regionName = regionName;
                        this.regionType = regionType || this.DEFAULT_REGION_TYPE;
                        this.regionCss = this.DEFAULT_CSS_CLASS + (regionCss ? " " + regionCss.trim() : "");
                    }
                    return RegionDescriptor;
                }());
                MultiRegion.RegionDescriptor = RegionDescriptor;
            })(MultiRegion = ui.MultiRegion || (ui.MultiRegion = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../ViewDescriptorInterface.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewSwitcher;
            (function (ViewSwitcher) {
                var ViewSwitcherViewDescriptor = (function () {
                    function ViewSwitcherViewDescriptor(view, vsvm) {
                        this.view = view;
                        this.viewSwitcherViewModel = vsvm;
                        this.title = view.title;
                        this.isActive = new Observable(view.isActive);
                    }
                    return ViewSwitcherViewDescriptor;
                }());
                ViewSwitcher.ViewSwitcherViewDescriptor = ViewSwitcherViewDescriptor;
            })(ViewSwitcher = ui.ViewSwitcher || (ui.ViewSwitcher = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../ViewDescriptorInterface.ts" />
/// <reference path="./ViewSwitcherViewDescriptor.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewSwitcher;
            (function (ViewSwitcher) {
                /**
                 * The ViewSwicherView is a lightweight tab strip representing the various views hosted in any "target" region. The ViewSwitcher will 'listen' for all views hosted in the target region and will pop up
                 * a tab to represent the view so users can easily switch between the hosted views. This is a much more lightweight solution than using a full fledged ViewContainerView though that has it's own merits.
                 */
                var ViewSwitcherViewModel = (function (_super) {
                    __extends(ViewSwitcherViewModel, _super);
                    /**
                     * Constructs a new instance of the ViewSwitcherViewModel. Note that if the optional targetRegion parameter is supplied, the initialize method need not be explicitly invoked.
                      If not specified during creation, the initialize method needs to be called to configure the target region
                     * @param app The application this class belongs to
                     * @param libraryId Optional. The library Id to be used for this class
                     * @param targetRegion Optional. The region this switcher should target. If not specified during construction, needs to be specified during initialization.
                     */
                    function ViewSwitcherViewModel(app, libraryId, targetRegion) {
                        _super.call(this, app, libraryId);
                        /**
                         * Descriptors for the views hosted in the target region
                         */
                        this.viewDescriptors = new ObservableCollection([]);
                        /**
                         * Indicates whether to enable or disable the view switcher based on various criteria - most common being that multiple views have been hosted
                         * in the target region.
                         */
                        this.viewSwitcherActive = new Observable(false);
                        this.targetRegion = targetRegion || "";
                    }
                    /**
                     * Initializes the ViewSwitcherViewModel.
                     * @param A configuration object containing the target region that this view container will listen to for hosted views.
                     */
                    ViewSwitcherViewModel.prototype.initialize = function (config) {
                        if (config && !this.targetRegion) {
                            this.targetRegion = config.targetRegion;
                        }
                        if (!this.targetRegion) {
                            this.app.trace.error("ViewSwitcherViewModel: Target region not configured.");
                            return;
                        }
                        this._subscribeEvents();
                    };
                    /**
                    * Looks up a view descriptor for a given view.
                    * @param view The view to retrieve the descriptor for
                    * @return The retrived ViewDescriptor
                    */
                    ViewSwitcherViewModel.prototype.getDescriptorForView = function (view) {
                        if (view) {
                            for (var i = 0; i < this.viewDescriptors.getLength(); ++i) {
                                var descriptor = this.viewDescriptors.getAt(i);
                                if (descriptor.view.id === view.id) {
                                    return descriptor;
                                }
                            }
                        }
                        return null;
                    };
                    /**
                    * Updates the state (enabled/disabled) for the View Switcher. Can be overridden if custom behaviour is needed. Called each time a new view is added or
                    * removed from the View Switcher.
                    */
                    ViewSwitcherViewModel.prototype.updateViewSwitcherState = function () {
                        this.viewSwitcherActive.set(this.checkIfSwitcherActive());
                    };
                    /**
                     * Creates and returns the view descriptor for the given view. Override this method to return a custom view descriptor
                     * @param view The view for which we need to create the descriptor.
                     * @return The view descriptor for the specified view.
                     */
                    ViewSwitcherViewModel.prototype.createDescriptorForView = function (view) {
                        return new ViewSwitcher.ViewSwitcherViewDescriptor(view, this);
                    };
                    /**
                     * Handler for the ViewHostedEvent
                     * @param args An object containing the view that has been hosted and the region it has been hosted in
                     */
                    ViewSwitcherViewModel.prototype.handleViewHostedEvent = function (args) {
                        if (args.region.name === this.targetRegion && args.view) {
                            var descriptor = this.createDescriptorForView(args.view);
                            this.viewDescriptors.addItem(descriptor);
                            this.updateViewSwitcherState();
                        }
                    };
                    /**
                     * The handler for the ViewUnhostedEvent
                     * @param args An object containing the view that has been unhosted and the region it was hosted in
                     */
                    ViewSwitcherViewModel.prototype.handleViewUnHostedEvent = function (args) {
                        if (args.region.name === this.targetRegion && args.view) {
                            var descriptor = this.getDescriptorForView(args.view);
                            if (descriptor) {
                                this.viewDescriptors.removeItem(descriptor);
                                this.updateViewSwitcherState();
                            }
                        }
                    };
                    /**
                     * The handler for the ViewActivatedEvent
                     * @param view The view that was activated
                     */
                    ViewSwitcherViewModel.prototype.handleViewActivatedEvent = function (view) {
                        var desc = this.getDescriptorForView(view);
                        if (desc) {
                            this._deactivateActiveTabsInTargetRegion();
                            desc.isActive.set(true);
                        }
                    };
                    /**
                    * The handler for the ViewActivatedEvent
                    * @param view The view that was activated
                    */
                    ViewSwitcherViewModel.prototype.handleViewDeactivatedEvent = function (view) {
                        var desc = this.getDescriptorForView(view);
                        desc && desc.isActive.set(false);
                    };
                    /**
                     * Returns true if the view switcher is to be enabled. This function checks whether there are multiple views and enables it if there are. If additional
                     * checks are required, this method may be overridden. Called each time a new view is added or removed from this view switcher
                     */
                    ViewSwitcherViewModel.prototype.checkIfSwitcherActive = function () {
                        return this.viewDescriptors.length() > 1;
                    };
                    /**
                     * This function is required because when a view is activated in a MultiViewRegionAdapter, it simply "hides" the currently active view before activating the new one. Therefore, a "ViewDeactivatedEvent" is not fired for the
                     * active view its "hiding".
                     */
                    ViewSwitcherViewModel.prototype._deactivateActiveTabsInTargetRegion = function () {
                        this.viewDescriptors.get().forEach(function (vd) { return vd.isActive.get() && vd.isActive.set(false); });
                    };
                    ViewSwitcherViewModel.prototype._subscribeEvents = function () {
                        this.app.event("ViewHostedEvent").subscribe(this, this.handleViewHostedEvent);
                        this.app.event("ViewUnhostedEvent").subscribe(this, this.handleViewUnHostedEvent);
                        this.app.event("ViewActivatedEvent").subscribe(this, this.handleViewActivatedEvent);
                        this.app.event("ViewDeactivatedEvent").subscribe(this, this.handleViewDeactivatedEvent);
                    };
                    return ViewSwitcherViewModel;
                }(ui.ViewModelBase));
                ViewSwitcher.ViewSwitcherViewModel = ViewSwitcherViewModel;
            })(ViewSwitcher = ui.ViewSwitcher || (ui.ViewSwitcher = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="RegionDescriptor.ts" />
/// <reference path="../ViewSwitcher/ViewSwitcherViewModel.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var MultiRegion;
            (function (MultiRegion) {
                /**
                 * The MultiRegionView is intended to host a simple view containing various user configured regions. The regions are MultiDivRegionAdapters by default but can be configured as any type. If a
                 * region of type MultiDivRegionAdapter detects more than a single view hosted in it, it will automatically insert a view switcher so users can switch between views - unless configured otherwise.
                 */
                var MultiRegionViewModel = (function (_super) {
                    __extends(MultiRegionViewModel, _super);
                    function MultiRegionViewModel() {
                        _super.apply(this, arguments);
                        /**
                         * A collection of region descriptors for all regions created by this MultiRegionViewModel
                         */
                        this.regionDescriptors = new ObservableCollection([]);
                        /**
                         * A boolean indicating whether or not to automatically insert a view switcher to supported regions hosted by this MultiRegionViewModel. Defaults to false.
                         */
                        this.autoInsertViewSwitcher = false;
                        /**
                        * The markup resource to be used to construct the RegionViewSwitcherWidget for supported regions. Defaults to Framework.UI/geocortex/framework/ui/ViewSwitcher/ViewSwitcherView.html
                        */
                        this.regionViewSwitcherWidgetMarkup = "Framework.UI/geocortex/framework/ui/ViewSwitcher/ViewSwitcherView.html";
                        /**
                         * The markup type to be used for the RegionViewSwitcherWidget for supported regions. Defaults to geocortex.framework.ui.ViewSwitcher.ViewSwitcherView
                         */
                        this.regionViewSwitcherWidgetType = "geocortex.framework.ui.ViewSwitcher.ViewSwitcherView";
                        /**
                         * The libraryId to be used to construct the RegionViewSwitcherWidget for supported regions. Defaults to Framework.UI
                         */
                        this.regionViewSwitcherLibraryId = "Framework.UI";
                        /**
                         * An array containing the types of supported region adapters to which we can attach a view switcher
                         */
                        this.supportedViewSwitcherRegionAdapters = [
                            "geocortex.framework.ui.MultiDivRegionAdapter",
                            "geocortex.framework.ui.MultiViewRegionAdapter"
                        ];
                    }
                    /**
                     * Initializes the MultiRegionViewModel.
                     * @param config A configuration object containing an array of region definitions. Each definition will contain a regionName, optional regionType and optional regionCss. An optional property - autoInsertViewSwitcher -
                     * can be set to false to disable automatic insertion of view switchers into regions.
                     */
                    MultiRegionViewModel.prototype.initialize = function (config) {
                        var _this = this;
                        if (!config || !config.regions || !dojo.isArray(config.regions)) {
                            this.app.trace.error("MultiRegionViewModel: Region configuration not found or invalid region configuration syntax.");
                            return;
                        }
                        this.autoInsertViewSwitcher = !!config.autoInsertViewSwitcher;
                        config.regions.forEach(function (rd) { return rd.regionName && _this.regionDescriptors.addItem(_this.createDescriptorForRegion(rd.regionName, rd.regionType, rd.regionCss)); });
                        this._processRegionDescriptors();
                    };
                    MultiRegionViewModel.prototype.getRegionDescriptorByRegionName = function (regionName) {
                        for (var x = 0; x < this.regionDescriptors.length(); x++) {
                            var rd = this.regionDescriptors.getAt(x);
                            if (rd.regionName === regionName) {
                                return rd;
                            }
                        }
                        return null;
                    };
                    /**
                    * Returns true if a specified region supports a view switcher
                    * @param rd The region descriptor for the region
                    * @return Returns true if the region supports a view switcher, false otherwise.
                    */
                    MultiRegionViewModel.prototype.supportsViewSwitcher = function (rd) {
                        return this.autoInsertViewSwitcher && this.supportedViewSwitcherRegionAdapters.indexOf(rd.regionType) > -1;
                    };
                    /**
                     * Creates and returns a descriptor for a given region. Override this method to return a custom region descriptor
                     * @param regionName A string denoting the name of the region for which this descriptor is being created
                     * @param regionType A string denoting the type of the region for which this descriptor is being created
                     * @param regionCss An optional string which defines any custom css to be applied to the new region
                     * @return A descriptor for newly constructed region
                     */
                    MultiRegionViewModel.prototype.createDescriptorForRegion = function (regionName, regionType, regionCss) {
                        return new MultiRegion.RegionDescriptor(regionName, regionType, regionCss);
                    };
                    /**
                     * Creates and returns a view model for a view switcher for this region. Override this method to return a custom view switcher.
                     * @param targetRegion The region whose views the created view switcher view model should target.
                     * @return An initialized ViewSwitcherViewModel.
                     */
                    MultiRegionViewModel.prototype.createViewSwitcherViewModel = function (targetRegion) {
                        return new geocortex.framework.ui.ViewSwitcher.ViewSwitcherViewModel(this.app, this.libraryId, targetRegion);
                    };
                    /**
                     * Process each region created by the MultiRegionViewModel. May be overridden to provide custom behaviour.
                     * @param rd The region descriptor describing the newly created region
                     */
                    MultiRegionViewModel.prototype.processRegion = function (rd) {
                        if (rd && this.supportsViewSwitcher(rd)) {
                            rd.viewSwitcherViewModel.set(this.createViewSwitcherViewModel(rd.regionName));
                            rd.displayRegionViewSwitcher.sync(rd.viewSwitcherViewModel.get().viewSwitcherActive);
                        }
                    };
                    MultiRegionViewModel.prototype._processRegionDescriptors = function () {
                        var _this = this;
                        this.regionDescriptors.get().forEach(function (rd) { return _this.processRegion(rd); });
                    };
                    return MultiRegionViewModel;
                }(geocortex.framework.ui.ViewModelBase));
                MultiRegion.MultiRegionViewModel = MultiRegionViewModel;
            })(MultiRegion = ui.MultiRegion || (ui.MultiRegion = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var SplashScreen;
            (function (SplashScreen) {
                var SplashScreenView = (function (_super) {
                    __extends(SplashScreenView, _super);
                    function SplashScreenView(app, libraryId) {
                        var _this = this;
                        _super.call(this, app, libraryId);
                        this._siteInitializedToken = null;
                        this._siteInitializedFailedToken = null;
                        // This is to remove a circular dependency in the Splash Screen, where the initialized depends on the site being authenticated
                        // and the authentication dialog depends on modal dialog which depends on the site being initialized.
                        this.app.command("HideSplashScreen").register(this, function () {
                            this.removeSplash();
                        });
                        // If the size is already initialized, we have no need to show the splash, just hop straight to the site
                        if (this.app.site && this.app.site.isInitialized) {
                            this.removeSplash();
                        }
                        else {
                            this._siteInitializedToken = this.app.event("SiteInitializedEvent").once(this, function () {
                                setTimeout(function () {
                                    _this.removeSplash();
                                }, 0);
                            });
                            this._siteInitializedFailedToken = this.app.event("SiteInitializationFailedEvent").subscribe(this, function () {
                                setTimeout(function () {
                                    _this.removeSplash();
                                }, 0);
                            });
                            this._siteInitializedFailedToken = this.app.event("UserSignInCancelledEvent").subscribe(this, function () {
                                setTimeout(function () {
                                    _this.removeSplash();
                                }, 0);
                            });
                        }
                    }
                    /**
                     * Clear the splash screen, once the site has initialized, the initialization has failed, or the Authentication is ready to display.
                     */
                    SplashScreenView.prototype.removeSplash = function () {
                        var _this = this;
                        this.app.viewManager.deactivateView(this);
                        this.app.command("HideSplashScreen").clear();
                        // Clean up our event listeners before we dispose of the view
                        if (this._siteInitializedToken) {
                            this.app.event("SiteInitializedEvent").unsubscribe(this._siteInitializedToken);
                        }
                        if (this._siteInitializedFailedToken) {
                            this.app.event("SiteInitializationFailedEvent").unsubscribe(this._siteInitializedFailedToken);
                        }
                        setTimeout(function () {
                            //_this.app.command("ActivateView").execute("ShellView"); // TODO: config.
                            _this.app.viewManager.destroyView(_this);
                        }, 250);
                    };
                    return SplashScreenView;
                }(ui.ViewBase));
                SplashScreen.SplashScreenView = SplashScreenView;
            })(SplashScreen = ui.SplashScreen || (ui.SplashScreen = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * Flattens a collection of collections as though it was a single collection
             * with the order of all the elements preserved.  Methods that manipulate the
             * underlying collections are not supported.
             */
            var ObservableCollectionAggregator = (function (_super) {
                __extends(ObservableCollectionAggregator, _super);
                function ObservableCollectionAggregator(collections) {
                    _super.call(this);
                    this._collectionsBindingToken = null;
                    this._collectionsMembersBindingTokens = [];
                    if (collections) {
                        this.setCollectionsSource(collections);
                    }
                }
                /**
                 * Set the collection of collections that will be exposed as a single flat collection.
                 * Set to null to clear.
                 */
                ObservableCollectionAggregator.prototype.setCollectionsSource = function (collections) {
                    if (collections === this._collections) {
                        return;
                    }
                    if (this._collections != null) {
                        this._collections.unbind(this._collectionsBindingToken);
                        this._collectionsBindingToken = null;
                        if (this._collections.length() > 0) {
                            var clearArgs = new geocortex.framework.events.CollectionChangedArgs();
                            clearArgs.type = "clear";
                            clearArgs.rangeStart = 0;
                            clearArgs.rangeEnd = this.length() - 1;
                            this.collectionsChanged(clearArgs);
                        }
                        this._collections = null;
                    }
                    if (collections != null) {
                        this._collections = collections;
                        this._collectionsBindingToken = this._collections.bind(this, this.collectionsChanged);
                        var changeArgs = new geocortex.framework.events.CollectionChangedArgs();
                        changeArgs.rangeStart = 0;
                        changeArgs.rangeEnd = this._collections.length() - 1;
                        changeArgs.type = "append";
                        this.collectionsChanged(changeArgs);
                    }
                };
                /**
                 * Get the collection of collections exposed as a single flat collection.  Changes to
                 * this collection will be automatically reflected in the aggregate.
                 */
                ObservableCollectionAggregator.prototype.getCollectionSource = function () {
                    return this._collections;
                };
                ObservableCollectionAggregator.prototype.collectionsChanged = function (args) {
                    this.fixBindings(args);
                    this.propagateEvents(args);
                };
                ObservableCollectionAggregator.prototype.fixBindings = function (args) {
                    if (args.type == "append" || args.type == "insert") {
                        for (var i = args.rangeStart; i <= args.rangeEnd; i++) {
                            this._collectionsMembersBindingTokens.splice(i, 0, this._collections.getAt(i).bindingEvent.subscribe(this, this.underlyingCollectionChanged));
                        }
                    }
                    else if (args.type == "remove" || args.type == "clear") {
                        for (var i = args.rangeStart; i <= args.rangeEnd; i++) {
                            this._collections.getAt(i).bindingEvent.unsubscribe(this._collectionsMembersBindingTokens[i]);
                            this._collectionsMembersBindingTokens[i] = null;
                        }
                        this._collectionsMembersBindingTokens.splice(args.rangeStart, args.rangeEnd - args.rangeStart + 1);
                    }
                    else if (args.type == "replace") {
                        throw new Error("The original value is lost and we need to unbind from it");
                    }
                    else {
                        throw new Error("Unknown argument type");
                    }
                };
                ObservableCollectionAggregator.prototype.propagateEvents = function (argsIn) {
                    var collectionsLength = this._collections.length();
                    var argsOut = new geocortex.framework.events.CollectionChangedArgs();
                    argsOut.type = argsIn.type;
                    argsOut.rangeStart = 0;
                    argsOut.rangeEnd = 0;
                    for (var i = 0; i < collectionsLength && i < argsIn.rangeStart; i++) {
                        argsOut.rangeStart += this._collections.getAt(i).length();
                    }
                    argsOut.rangeEnd = argsOut.rangeStart - 1;
                    for (; i < collectionsLength && i <= argsIn.rangeEnd; i++) {
                        argsOut.rangeEnd += this._collections.getAt(i).length();
                    }
                    if (argsOut.rangeEnd >= argsOut.rangeStart) {
                        argsOut.sender = this;
                        this.bindingEvent.publish(argsOut);
                    }
                };
                ObservableCollectionAggregator.prototype.underlyingCollectionChanged = function (args) {
                    var argsOut = new geocortex.framework.events.CollectionChangedArgs();
                    argsOut.sender = this;
                    argsOut.type = args.type;
                    var length = 0;
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        var collection = this._collections.getAt(i);
                        if (collection === args.sender) {
                            if (args.type == "append" && i != collectionsLength - 1) {
                                argsOut.type = "insert";
                            }
                            else if (args.type == "clear" && collectionsLength != 1) {
                                argsOut.type = "remove";
                            }
                            argsOut.rangeStart = length + args.rangeStart;
                            argsOut.rangeEnd = length + args.rangeEnd;
                            break;
                        }
                        else {
                            length += collection.length();
                        }
                    }
                    this.bindingEvent.publish(argsOut);
                };
                ObservableCollectionAggregator.prototype.isEmpty = function () {
                    if (this._collections == null) {
                        return true;
                    }
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        if (!this._collections.getAt(i).isEmpty()) {
                            return false;
                        }
                    }
                    return true;
                };
                ObservableCollectionAggregator.prototype.length = function () {
                    if (this._collections == null) {
                        return 0;
                    }
                    var length = 0;
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        length += this._collections.getAt(i).length();
                    }
                    return length;
                };
                ObservableCollectionAggregator.prototype.contains = function (item) {
                    if (this._collections == null) {
                        return false;
                    }
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        if (this._collections.getAt(i).contains(item)) {
                            return true;
                        }
                    }
                    return false;
                };
                ObservableCollectionAggregator.prototype.getAt = function (index) {
                    if (this._collections == null) {
                        return null;
                    }
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        var collection = this._collections.getAt(i);
                        var length = collection.length();
                        if (index >= length) {
                            index -= length;
                        }
                        else {
                            return collection.getAt(index);
                        }
                    }
                    throw new Error("Index out of bounds");
                };
                /**
                 * Get a range of values.
                 * @param begin the index of the first item to include, inclusive
                 * @param end the index of the last item to include, inclusive
                 *            (inconsistent with Array.slice, consistent with other ObservableCollection events)
                 */
                ObservableCollectionAggregator.prototype.getRange = function (begin, end) {
                    if (this._collections == null) {
                        return [];
                    }
                    if (end === undefined) {
                        end = Number.POSITIVE_INFINITY;
                    }
                    var range = null;
                    var length = 0;
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength && end >= 0; i++, begin -= length, end -= length) {
                        var collection = this._collections.getAt(i);
                        length = collection.length();
                        if (length > begin) {
                            var slice = collection.getRange(begin > 0 ? begin : 0, end);
                            if (range == null) {
                                range = slice;
                            }
                            else {
                                range = range.concat(slice);
                            }
                        }
                    }
                    return range;
                };
                ObservableCollectionAggregator.prototype.indexOf = function (item) {
                    if (this._collections == null) {
                        return -1;
                    }
                    var length = 0;
                    var collectionsLength = this._collections.length();
                    for (var i = 0; i < collectionsLength; i++) {
                        var collection = this._collections.getAt(i);
                        var index = collection.indexOf(item);
                        if (index != -1) {
                            return length + index;
                        }
                        length += collection.length();
                    }
                    return -1;
                };
                ObservableCollectionAggregator.prototype.get = function () {
                    throw new Error("Raw array manipulation not supported");
                };
                ObservableCollectionAggregator.prototype.getItems = function () {
                    throw new Error("Raw array manipulation not supported");
                };
                ObservableCollectionAggregator.prototype.getLength = function () {
                    return this.length();
                };
                ObservableCollectionAggregator.prototype.addItems = function (items) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.addItem = function (item) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.insertItems = function (index, items) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.insertItem = function (index, item) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.removeItem = function (obj) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.removeAt = function (index) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.removeRange = function (from, to) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.clear = function () {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.set = function (newCollection) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.sync = function (source) {
                    throw new Error("Operation not supported");
                };
                ObservableCollectionAggregator.prototype.equals = function (other) {
                    throw new Error("Operation not supported");
                };
                return ObservableCollectionAggregator;
            }(ObservableCollection));
            ui.ObservableCollectionAggregator = ObservableCollectionAggregator;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
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
            var LazyObservable = (function (_super) {
                __extends(LazyObservable, _super);
                function LazyObservable(value, delegateGetter, cacheDelegateResults) {
                    _super.call(this, value);
                    this.delegateGetter = delegateGetter || null;
                    if (cacheDelegateResults) {
                        this.cacheDelegateResults = cacheDelegateResults;
                    }
                }
                LazyObservable.prototype.get = function () {
                    var value = _super.prototype.get.call(this);
                    if (value != null || this._delegateNullCached) {
                        return value;
                    }
                    if (this.delegateGetter) {
                        var newValue = this.delegateGetter();
                        if (this.cacheDelegateResults && newValue !== value) {
                            _super.prototype.set.call(this, newValue);
                        }
                        if (this.cacheDelegateNull) {
                            this._delegateNullCached = true;
                        }
                        return newValue;
                    }
                    return null;
                };
                /**
                 * Clear the stored result. The delegate function will not be called until the
                 * next get().
                 */
                LazyObservable.prototype.clear = function () {
                    _super.prototype.set.call(this, null);
                    delete this._delegateNullCached;
                };
                return LazyObservable;
            }(Observable));
            ui.LazyObservable = LazyObservable;
            LazyObservable.prototype.cacheDelegateResults = false;
            LazyObservable.prototype.cacheDelegateNull = false;
            LazyObservable.prototype._delegateNullCached = false;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * Applies a filter function to a source Observable collection and only
             * exposes values that pass the filter (returns true).  Change events and
             * getters all work as expected.  Setters are not supported.
             */
            var FilterableCollection = (function (_super) {
                __extends(FilterableCollection, _super);
                function FilterableCollection(source, filter) {
                    _super.call(this);
                    this._source = null;
                    this._sourceBindingToken = null;
                    this._filter = this._defaultFilter;
                    this._indexMap = []; // maps index in this collection to index in source
                    if (source) {
                        this.setSource(source);
                    }
                    if (filter) {
                        this.setFilter(filter);
                    }
                }
                /**
                 * Set the collection that will be exposed as filtered. Set to null for none.
                 * The current filter function will be applied.
                 */
                FilterableCollection.prototype.setSource = function (source) {
                    if (source === this._source) {
                        return;
                    }
                    if (this._source && this._sourceBindingToken) {
                        this._source.unbind(this._sourceBindingToken);
                        this._sourceBindingToken = null;
                        if (this.length() > 0) {
                            var clearArgs = new geocortex.framework.events.CollectionChangedArgs();
                            clearArgs.type = "clear";
                            clearArgs.rangeStart = 0;
                            clearArgs.rangeEnd = this.length() - 1;
                            this.bindingEvent.publish(clearArgs);
                        }
                        this._source = null;
                    }
                    if (source != null) {
                        this._source = source;
                        this._sourceBindingToken = this._source.bind(this, this._sourceChanged);
                        this._redo();
                    }
                };
                /**
                 * Get the underlying collection being filtered.
                 */
                FilterableCollection.prototype.getSource = function () {
                    return this._source;
                };
                /**
                 * Set the function that filters what elements of the source collection
                 * will be exposed.  Set to null for no filtering. This function will
                 * be called a lot so performance matters.
                 */
                FilterableCollection.prototype.setFilter = function (filter) {
                    if (!filter) {
                        filter = this._defaultFilter;
                    }
                    if (filter === this._filter) {
                        return;
                    }
                    this._filter = filter;
                    if (this._source) {
                        this._redo();
                    }
                };
                FilterableCollection.prototype.getFilter = function () {
                    return this._filter === this._defaultFilter ? null : this._filter;
                };
                /**
                 * Refreshes the collection. The collection is rebuilt from scratch. This method should be called whenever the state of the system
                 * is changed such that the filter predicate will return a different result than it previously did.
                 */
                FilterableCollection.prototype.refresh = function () {
                    this._redo();
                };
                /**
                 * Rebuild the result from scratch.
                 */
                FilterableCollection.prototype._redo = function (args) {
                    if (args === void 0) { args = new geocortex.framework.events.CollectionChangedArgs(); }
                    args.sender = this;
                    if (this._indexMap.length != 0) {
                        args.type = "clear";
                        args.rangeStart = 0;
                        args.rangeEnd = this._indexMap.length - 1;
                        this.bindingEvent.publish(args);
                    }
                    this._indexMap.length = 0;
                    for (var i = 0, sourceLength = this._source ? this._source.length() : 0; i < sourceLength; i++) {
                        if (this._filter(this._source.getAt(i))) {
                            this._indexMap.push(i);
                        }
                    }
                    if (this._indexMap.length != 0) {
                        args.type = "append";
                        args.rangeStart = 0;
                        args.rangeEnd = this._indexMap.length - 1;
                        this.bindingEvent.publish(args);
                    }
                };
                FilterableCollection.prototype._sourceChanged = function (inArgs) {
                    var sourceIx, mapIx;
                    var outArgs = new geocortex.framework.events.CollectionChangedArgs();
                    outArgs.sender = this;
                    switch (inArgs.type) {
                        case "set":
                            this._redo(outArgs);
                            return;
                        case "append":
                            outArgs.type = "append";
                            outArgs.rangeStart = this._indexMap.length;
                            for (sourceIx = inArgs.rangeStart; sourceIx <= inArgs.rangeEnd; sourceIx++) {
                                if (this._filter(this._source.getAt(sourceIx))) {
                                    this._indexMap.push(sourceIx);
                                }
                            }
                            outArgs.rangeEnd = this._indexMap.length - 1;
                            break;
                        case "insert":
                            mapIx = inArgs.rangeStart > 0 ? this._findIndexMapIx(inArgs.rangeStart) : 0;
                            while (mapIx < this._indexMap.length && this._indexMap[mapIx] < inArgs.rangeStart) {
                                mapIx++;
                            }
                            outArgs.type = mapIx < this._indexMap.length ? "insert" : "append";
                            outArgs.rangeStart = mapIx;
                            for (sourceIx = inArgs.rangeStart; sourceIx <= inArgs.rangeEnd; sourceIx++) {
                                if (this._filter(this._source.getAt(sourceIx))) {
                                    this._indexMap.splice(mapIx++, 0, sourceIx);
                                }
                            }
                            outArgs.rangeEnd = mapIx - 1;
                            var numInserted = inArgs.rangeEnd - inArgs.rangeStart + 1;
                            for (; mapIx < this._indexMap.length; mapIx++) {
                                this._indexMap[mapIx] += numInserted;
                            }
                            break;
                        case "remove":
                            mapIx = inArgs.rangeStart > 0 ? this._findIndexMapIx(inArgs.rangeStart) : 0;
                            while (mapIx < this._indexMap.length && this._indexMap[mapIx] < inArgs.rangeStart) {
                                mapIx++;
                            }
                            outArgs.rangeStart = mapIx;
                            while (mapIx < this._indexMap.length && this._indexMap[mapIx] <= inArgs.rangeEnd) {
                                mapIx++;
                            }
                            outArgs.rangeEnd = mapIx - 1;
                            outArgs.type = outArgs.rangeStart == 0 && outArgs.rangeEnd == this._indexMap.length - 1 ? "clear" : "remove";
                            break;
                        case "clear":
                            if (this.length() == 0) {
                                return;
                            }
                            outArgs.type = "clear";
                            outArgs.rangeStart = 0;
                            outArgs.rangeEnd = this._indexMap.length;
                            break;
                        default:
                            throw new Error("Unhandled case: " + inArgs.type);
                    }
                    if (outArgs.rangeStart <= outArgs.rangeEnd) {
                        this.bindingEvent.publish(outArgs);
                    }
                    // for remove and clear change the collection afect dispatching the event
                    switch (outArgs.type) {
                        case "remove":
                            this._indexMap.splice(outArgs.rangeStart, outArgs.rangeEnd - outArgs.rangeStart + 1);
                            var numRemoved = inArgs.rangeEnd - inArgs.rangeStart + 1;
                            for (mapIx = inArgs.rangeStart; mapIx < this._indexMap.length; mapIx++) {
                                this._indexMap[mapIx] -= numRemoved;
                            }
                            break;
                        case "clear":
                            this._indexMap.length = 0;
                            break;
                    }
                };
                /**
                 * Find the exposed index of the source index. If the source index is filtered out the next highest
                 * or lowest value will be returned depending on how the binary search goes.
                 */
                FilterableCollection.prototype._findIndexMapIx = function (sourceIx) {
                    var lo = 0, hi = this._indexMap.length - 1, mid = 0;
                    while (lo <= hi) {
                        mid = Math.floor((lo + hi) / 2);
                        if (this._indexMap[mid] > sourceIx) {
                            hi = mid - 1;
                        }
                        else if (this._indexMap[mid] < sourceIx) {
                            lo = mid + 1;
                        }
                        else {
                            return mid;
                        }
                    }
                    return mid;
                };
                FilterableCollection.prototype._defaultFilter = function (input) {
                    return true;
                };
                FilterableCollection.prototype.isEmpty = function () {
                    return this._indexMap.length == 0;
                };
                FilterableCollection.prototype.length = function () {
                    return this._indexMap.length;
                };
                FilterableCollection.prototype.contains = function (item) {
                    return this._source && this._filter(item) && this._source.contains(item);
                };
                FilterableCollection.prototype.getAt = function (index) {
                    if (!this._source) {
                        return null;
                    }
                    return this._source.getAt(this._indexMap[index]);
                };
                FilterableCollection.prototype.getRange = function (begin, end) {
                    if (end === null || end === undefined || end >= this._indexMap.length) {
                        end = this._indexMap.length - 1;
                    }
                    var result = new Array(end - begin + 1);
                    for (var i = begin; i <= end; i++) {
                        result[i - begin] = this.getAt(i);
                    }
                    return result;
                };
                FilterableCollection.prototype.indexOf = function (item) {
                    if (!this._source || !this._filter(item)) {
                        return -1;
                    }
                    var index = this._source.indexOf(item);
                    if (index == -1) {
                        return -1;
                    }
                    return this._findIndexMapIx(index);
                };
                FilterableCollection.prototype.get = function () {
                    throw new Error("Raw array manipulation not supported");
                };
                FilterableCollection.prototype.getItems = function () {
                    throw new Error("Raw array manipulation not supported");
                };
                FilterableCollection.prototype.getLength = function () {
                    return this._indexMap.length;
                };
                FilterableCollection.prototype.addItems = function (items) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.addItem = function (item) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.insertItems = function (index, items) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.insertItem = function (index, item) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.removeItem = function (obj) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.removeAt = function (index) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.removeRange = function (from, to) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.clear = function () {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.set = function (newCollection) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.sync = function (source) {
                    throw new Error("Operation not supported");
                };
                FilterableCollection.prototype.equals = function (other) {
                    throw new Error("Operation not supported");
                };
                return FilterableCollection;
            }(ObservableCollection));
            ui.FilterableCollection = FilterableCollection;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/Framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var Selector;
            (function (Selector) {
                /**
                 * Models an arbitrary, selectable item in the selector.
                 */
                var SelectorItemViewModel = (function () {
                    /**
                     * Constructs a new instance.
                     * @param displayName The name to display for the item. How its displayed is up to the template.
                     * @param item The actual underlying item that this object wraps.
                     * @param isSelected The selected state of the object.
                     */
                    function SelectorItemViewModel(displayName, item, isSelected) {
                        /** A unique ID token for the item. */
                        this.id = new Observable();
                        this.id.set(geocortex.framework.utils.alphaNumericToken());
                        this.displayName = new Observable((displayName === null || displayName === undefined) ? "" : displayName);
                        this.isSelected = new Observable(!!isSelected);
                        this.item = item || null;
                    }
                    SelectorItemViewModel.prototype.getId = function () {
                        return this.id.get();
                    };
                    return SelectorItemViewModel;
                }());
                Selector.SelectorItemViewModel = SelectorItemViewModel;
            })(Selector = ui.Selector || (ui.Selector = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/Framework.d.ts" />
/// <reference path="../../../../../_Definitions/jquery.d.ts"/>
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var Selector;
            (function (Selector) {
                var DUMMY_OPTION_ATTRIB_NAME = "data-is-dummy";
                /**
                 * A fairly generic drop down single/multi select control.
                 */
                var SelectorView = (function (_super) {
                    __extends(SelectorView, _super);
                    function SelectorView() {
                        _super.apply(this, arguments);
                        this._itemViews = [];
                    }
                    /** @inherited */
                    SelectorView.prototype.attach = function (viewModel) {
                        var _this = this;
                        _super.prototype.attach.call(this, viewModel);
                        if (!this.viewModel.singleSelect) {
                            dojo.attr(this.selectElement, "multiple", "multiple");
                        }
                        viewModel.openState.bind(this, function (value) {
                            if (value) {
                                var tapToDismissArgs = {
                                    view: _this,
                                    onOtherInteracted: function (evt) { return _this.viewModel.openState.set(false); }
                                };
                                _this.app.command("TapToDismiss").execute(tapToDismissArgs);
                                //If we are opening a custom select, check its position and reposition if necessary
                                if (_this.viewModel.openState.get() && !_this.viewModel.showNativeSelect.get()) {
                                    _this.positionCustomSelect();
                                }
                            }
                        });
                        // We're creating views manually in resolveWidget...track them so we don't leave views if the underlying collection is changed!
                        viewModel.items.bind(this, function (args) {
                            if (["remove"].indexOf(args.type) > -1) {
                                for (var i = args.rangeStart; i <= args.rangeEnd; ++i) {
                                    var viewIx = _this._itemViews.length;
                                    while (viewIx--) {
                                        var view = _this._itemViews[viewIx];
                                        // Do we have a view with a view model that matches an element being removed from the collection? destroy.
                                        if (view && view.viewModel == args.sender.getAt(i)) {
                                            _this.app.viewManager.destroyView(view);
                                            _this._itemViews.splice(viewIx, 1);
                                        }
                                    }
                                }
                            }
                        });
                    };
                    SelectorView.prototype.handleSelectionChange = function (evt, element, context) {
                        var _this = this;
                        // Because web: http://www.w3.org/TR/domcore/#interface-htmlcollection
                        var selectElement = element;
                        var options = [];
                        for (var i = 0; i < selectElement.options.length; ++i) {
                            options.push(selectElement.options[i]);
                        }
                        var selectedOptions = options
                            .filter(function (option) { return option.selected && option.attributes[DUMMY_OPTION_ATTRIB_NAME] == null; });
                        if (selectedOptions.length < 1) {
                            this.viewModel.unselectAll();
                            return true;
                        }
                        setTimeout(function () {
                            var items = _this.viewModel.items.get();
                            var selectedItems = _this.viewModel.getSelectedItems();
                            items.map(function (item) {
                                if (selectedItems.indexOf(item) > -1) {
                                    _this.viewModel.selectItem(item.item, item);
                                }
                                else {
                                    _this.viewModel.unselectItem(item.item, item);
                                }
                            });
                            if (_this.viewModel.singleSelect) {
                                _this.viewModel.toggleOpenState();
                            }
                        });
                        return true;
                    };
                    /**
                     * Handles an item click. In {@link resolveWidget}, we actually set the parent view of newly templated item instances
                     * to be this view, which means that the templated widget will actually have data-bound event handlers firing against
                     * this view.
                     * @param evt The DOM event of the click.
                     * @param element The DOM element of the click.
                     * @param context The {@link SelectorItemViewModel} that was clicked/touched.
                     */
                    SelectorView.prototype.handleClickItem = function (evt, element, context) {
                        if (context === this.viewModel.dummyItem) {
                            this.viewModel.unselectAll();
                            this.viewModel.toggleOpenState();
                            return;
                        }
                        this.viewModel.handleSelectionChange(null, context);
                        if (this.viewModel.singleSelect) {
                            this.viewModel.toggleOpenState();
                        }
                        return true;
                    };
                    /**
                     * Handles the selector being clicked upon, usually by popping it open.
                     * @param evt The actual DOM event issued.
                     * @param el The actual DOM element that was clicked.
                     * @param context The view model context that was clicked.
                     */
                    SelectorView.prototype.handleClickSelector = function (evt, el, context) {
                        this.viewModel.toggleOpenState();
                        return true;
                    };
                    SelectorView.prototype.positionCustomSelect = function () {
                        var select = this["customSelect"];
                        //resetting
                        select.style.top = "auto";
                        select.style.left = "auto";
                        // Force the DOM element to be rendered but invisible so we can calculate dimensions
                        select.style.opacity = "0";
                        this.app.viewManager.activateView(this);
                        // Get document dimensions
                        var docWidth = document.body.clientWidth;
                        var docHeight = document.body.clientHeight;
                        // Get context menu dimensions
                        var rect = select.getBoundingClientRect();
                        // Menu overflows off right of page
                        if (rect.left + rect.width > docWidth) {
                            select.style.left = -1 * rect.width + "px";
                        }
                        // Menu overflows off bottom of page
                        if (rect.top + rect.height > docHeight) {
                            select.style.top = -1 * rect.height + "px";
                        }
                        // Now we can actually make the element visible to the user
                        select.style.opacity = "1";
                    };
                    /** @inherited */
                    SelectorView.prototype.resolveWidget = function (widgetId, context, binding) {
                        if (widgetId === "SelectorItemWidget") {
                            var templatePath = this.viewModel.templatePath;
                            if (!templatePath) {
                                templatePath = "Framework.UI/geocortex/framework/ui/Selector/DefaultItemTemplate.html";
                            }
                            var view = this.app.viewManager.createView({
                                typeName: "geocortex.framework.ui.ViewBase",
                                markupResource: templatePath,
                                isVisible: true,
                                libraryId: this.libraryId
                            });
                            // By setting the parent view of the child item, event bindings get bound to this view, allowing items
                            // to reference this view's handleClickItem method.
                            view.parentView = this;
                            view.attach(context);
                            this._itemViews.push(view);
                            return view;
                        }
                    };
                    return SelectorView;
                }(geocortex.framework.ui.ViewBase));
                Selector.SelectorView = SelectorView;
            })(Selector = ui.Selector || (ui.Selector = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="SelectorItemViewModel.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var Selector;
            (function (Selector) {
                /**
                 * View Model for the Selector widget.
                 */
                var SelectorViewModel = (function (_super) {
                    __extends(SelectorViewModel, _super);
                    /**@inherited */
                    function SelectorViewModel(app, libraryId, singleSelect, nativeSelect) {
                        if (singleSelect === void 0) { singleSelect = true; }
                        if (nativeSelect === void 0) { nativeSelect = true; }
                        _super.call(this, app, libraryId);
                        this.displayNameField = "displayName";
                        this.dummyItemText = null;
                        this.templatePath = null;
                        this.mobileMode = true;
                        this.singleSelect = singleSelect;
                        this._selectedItems = new ObservableCollection();
                        this.showSelectorHeader = new Observable(false);
                        this.showNativeSelect = new Observable(nativeSelect);
                        this.selectorText = new Observable("");
                        this.noItemsText = new Observable("");
                        this.openState = new Observable(this.showNativeSelect.get() && singleSelect);
                        this.items = new ObservableCollection();
                        this.selectedItems = new ObservableCollection();
                        this.dummyItem = new Selector.SelectorItemViewModel();
                    }
                    /**
                     * Toggles the state of the selector menu, expanding or collapsing it.
                     */
                    SelectorViewModel.prototype.toggleOpenState = function () {
                        //Open state should not be handled programmatically when we are using a native single select
                        if (this.showNativeSelect.get() && this.singleSelect) {
                            return;
                        }
                        this.openState.set(!this.openState.get());
                    };
                    /**
                     * Sets the underlying collection and enables selection of items from it.
                     * @param collection The collection of items to model selection for.
                     * @param displayNameField The name of the field to use on the underlying items for selection.
                     * @param templatePath The resource path of the HTML template to use for rendering.
                     */
                    SelectorViewModel.prototype.setCollection = function (collection, displayNameField, templatePath) {
                        if (this.syncToken) {
                            this._underlyingCollection.unbind(this.syncToken);
                            this.syncToken = null;
                        }
                        this.displayNameField = displayNameField;
                        this.templatePath = templatePath;
                        // Show the header when we are either a) not using a native `select`, OR b) when doing multi-selection.
                        this.showSelectorHeader.set(!this.showNativeSelect.get() || !this.singleSelect);
                        this._underlyingCollection = collection;
                        this.syncToken = this._underlyingCollection.bind(this, this.handleUnderlyingCollectionChange);
                        this.clear();
                        this.items.addItems(this._adapt(this._underlyingCollection.get()));
                    };
                    SelectorViewModel.prototype.clear = function () {
                        this.items.clear();
                        if (this.dummyItemText) {
                            this.dummyItem.displayName.set(this.dummyItemText);
                            this.items.addItem(this.dummyItem);
                        }
                    };
                    /**
                     * "Adapts" an array of items into {@link SelectorItemViewModels}.
                     * @param items The items to adapt in selectable view models.
                     */
                    SelectorViewModel.prototype._adapt = function (items) {
                        var _this = this;
                        var viewModels = [];
                        items.forEach(function (item) {
                            var vm = new Selector.SelectorItemViewModel();
                            // Note that we're not binding to the display name field. This is simply to reduce complexity.
                            // If the underlying display name of a selector item changes, it won't be reflected in the selector.
                            if (item[_this.displayNameField].isObservable) {
                                vm.displayName.set(item[_this.displayNameField].get());
                            }
                            else {
                                vm.displayName.set(item[_this.displayNameField]);
                            }
                            vm.item = item;
                            viewModels.push(vm);
                        });
                        return viewModels;
                    };
                    /**
                     * Handles changes in the underlying collection, adapting new items and removing entries for items that have been removed.
                     * @param changedArgs An instance of {@link events.CollectionChangedArgs} representing the collection change.
                     */
                    SelectorViewModel.prototype.handleUnderlyingCollectionChange = function (changedArgs) {
                        // TODO: change selected items as well.
                        // TODO: perfect candidate for automated test.
                        var items;
                        switch (changedArgs.type) {
                            case "append":
                                items = this._adapt(this._underlyingCollection.getRange(changedArgs.rangeStart, changedArgs.rangeEnd));
                                this.items.addItems(items);
                                break;
                            case "insert":
                                items = this._adapt(this._underlyingCollection.getRange(changedArgs.rangeStart, changedArgs.rangeEnd));
                                this.items.insertItems(changedArgs.rangeStart, items);
                                break;
                            case "remove":
                                this.items.removeRange(changedArgs.rangeStart, changedArgs.rangeEnd);
                                break;
                            case "clear":
                                this.clear();
                                break;
                            case "set":
                                items = this._adapt(this._underlyingCollection.getRange(changedArgs.rangeStart, changedArgs.rangeEnd));
                                this.clear();
                                this.items.addItems(items);
                                break;
                        }
                    };
                    /**
                     * Given an underlying item, returns the view model for it.
                     * @param item The underlying item to find the view model for.
                     */
                    SelectorViewModel.prototype.getViewModelForItem = function (item) {
                        var returnItem;
                        for (var i = 0; i < this.items.getLength(); ++i) {
                            if (this.items.getAt(i).item === item) {
                                return this.items.getAt(i);
                            }
                        }
                        return null;
                    };
                    /**
                     * Gets a view model for an item, provided that the item is selected.
                     * @param item The item.
                     */
                    SelectorViewModel.prototype.getViewModelForSelectedItem = function (item) {
                        var returnItem;
                        for (var i = 0; i < this._selectedItems.getLength(); ++i) {
                            if (this._selectedItems.getAt(i).item === item) {
                                return this._selectedItems.getAt(i);
                            }
                        }
                        return null;
                    };
                    SelectorViewModel.prototype.getSelectedItems = function () {
                        return this._selectedItems.get().slice();
                    };
                    /**
                     * Returns true or false based on the existence of a view model for a particular item.
                     * @param item The item that may or may not have a corresponding view model.
                     */
                    SelectorViewModel.prototype.hasItemViewModelFor = function (item) {
                        return !!this.getViewModelForItem(item);
                    };
                    /**
                     * Selects an item, given either an item or a {@link SelectorItemViewModel} for an item.
                     * @param item The underlying item to select for. Pass null if you have a {@link SelectorItemViewModel} already.
                     * @param itemViewModel The view model, already obtained, to select. Pass null if you just have a raw item.
                     */
                    SelectorViewModel.prototype.selectItem = function (item, itemViewModel) {
                        this._setItemSelectedState(item, itemViewModel, true);
                    };
                    /**
                     * Unselects an item, given either an item or a {@link SelectorItemViewModel} for an item.
                     * @param item The underlying item to unselect for. Pass null if you have a {@link SelectorItemViewModel} already.
                     * @param itemViewModel The view model, already obtained, to select. Pass null if you just have a raw item.
                     */
                    SelectorViewModel.prototype.unselectItem = function (item, itemViewModel) {
                        this._setItemSelectedState(item, itemViewModel, false);
                    };
                    /**
                     * Invoked when an item is selected.
                     * @event
                     * @param item The view model containing the item that was selected.
                     */
                    SelectorViewModel.prototype.onSelectItem = function (item) { };
                    /**
                     * Invoked when an item is unselected.
                     * @event
                     * @param item The view model containing the item that was unselected.
                     */
                    SelectorViewModel.prototype.onUnselectItem = function (item) { };
                    /**
                     * Handles changes to the selected state of a view model.
                     * @param selected Whether or not the given item is selected.
                     * @param itemViewModel The view model to handle selection change for.
                     */
                    SelectorViewModel.prototype.handleSelectionChange = function (selected, itemViewModel) {
                        if (selected === true) {
                            this.selectItem(null, itemViewModel);
                        }
                        else {
                            var newSelectedValue = !itemViewModel.isSelected.get();
                            if (newSelectedValue) {
                                this.selectItem(null, itemViewModel);
                            }
                            else {
                                this.unselectItem(null, itemViewModel);
                            }
                        }
                    };
                    /**
                     * Unselects any selected items.
                     * @param exceptForItem An item to ignore...this item's selected state will not be changed, i.e.
                     * because it is intended to be the only selected item.
                     */
                    SelectorViewModel.prototype.unselectAll = function (exceptForItem) {
                        var _this = this;
                        this._selectedItems.get().forEach(function (item) {
                            if (typeof item !== "string" && item.isSelected.get() === true) {
                                if (!exceptForItem || (exceptForItem !== item)) {
                                    _this.unselectItem(null, item);
                                }
                            }
                        });
                        if (this.openState.get() && !this.singleSelect) {
                            this.openState.set(false);
                        }
                    };
                    /**
                     * Sets the selected state of an item and handles its presence in {@link _selectedItems}.
                     * @param item The item.
                     * @param itemViewModel The view model for the item.
                     * @param selected The selected state to set.
                     */
                    SelectorViewModel.prototype._setItemSelectedState = function (item, itemViewModel, selected) {
                        itemViewModel = itemViewModel || this.getViewModelForItem(item);
                        if (!itemViewModel) {
                            throw new Error("Tried to select an item in a Framework UI selector but item was not part of bound collection.");
                        }
                        if (this.singleSelect && selected) {
                            this.unselectAll(itemViewModel);
                        }
                        if (itemViewModel.isSelected.get() !== selected) {
                            itemViewModel.isSelected.set(selected);
                            if (selected) {
                                this._selectedItems.addItem(itemViewModel);
                            }
                            else {
                                this._selectedItems.removeItem(itemViewModel);
                            }
                            if (selected && this.onSelectItem) {
                                this.onSelectItem(itemViewModel);
                            }
                            else if (!selected && this.onUnselectItem) {
                                this.onUnselectItem(itemViewModel);
                            }
                        }
                    };
                    return SelectorViewModel;
                }(ui.ViewModelBase));
                Selector.SelectorViewModel = SelectorViewModel;
            })(Selector = ui.Selector || (ui.Selector = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * Stores values in sorted order based on a sort function.  Use sync to track
             * an existing collection and present it as sorted.
             */
            var OrderedCollection = (function (_super) {
                __extends(OrderedCollection, _super);
                function OrderedCollection(items, sorter) {
                    _super.call(this, items);
                    this._sorter = null;
                    if (sorter) {
                        this.setSortFunction(sorter);
                    }
                }
                /**
                 * Change the sorting function and trigger a resort of the collection.
                 * If left should come before right then the sort function should return < 0.
                 * If left and right are equal the sort function should return 0.
                 * If left should come after right the sort function should return > 0.
                 */
                OrderedCollection.prototype.setSortFunction = function (sorter) {
                    if (this._sorter === sorter) {
                        return;
                    }
                    var length = this.length();
                    if (sorter) {
                        var args = new geocortex.framework.events.CollectionChangedArgs();
                        args.type = "clear";
                        args.rangeStart = 0;
                        args.rangeEnd = length - 1;
                        args.sender = this;
                        this.bindingEvent.publish(args);
                    }
                    this._sorter = sorter;
                    if (sorter) {
                        _super.prototype.get.call(this).sort(this._sorter);
                        args = new geocortex.framework.events.CollectionChangedArgs();
                        args.type = "append";
                        args.rangeStart = 0;
                        args.rangeEnd = length - 1;
                        args.sender = this;
                        this.bindingEvent.publish(args);
                    }
                };
                OrderedCollection.prototype.getSortFunction = function () {
                    return this._sorter;
                };
                /**
                 * The array of items being added need not be sorted.
                 */
                OrderedCollection.prototype.addItems = function (items) {
                    if (!this._sorter) {
                        _super.prototype.addItems.call(this, items);
                        return;
                    }
                    if (this.length() === 0) {
                        _super.prototype.addItems.call(this, items.concat().sort(this._sorter));
                    }
                    else {
                        for (var i = 0; i < items.length; i++) {
                            this.addItem(items[i]);
                        }
                    }
                };
                OrderedCollection.prototype.addItem = function (item) {
                    if (!this._sorter) {
                        _super.prototype.addItem.call(this, item);
                        return;
                    }
                    // Find the index to insert into.  Intentionally empty loop body.
                    for (var i = 0, length = _super.prototype.length.call(this); i < length && this._sorter(_super.prototype.getAt.call(this, i), item) < 0; i++) {
                    }
                    if (i >= length) {
                        _super.prototype.addItem.call(this, item);
                    }
                    else {
                        _super.prototype.insertItem.call(this, i, item);
                    }
                };
                OrderedCollection.prototype.set = function (newCollection) {
                    if (this._sorter) {
                        _super.prototype.set.call(this, newCollection.concat().sort(this._sorter));
                    }
                    else {
                        _super.prototype.set.call(this, newCollection);
                    }
                };
                /**
                 * Track changes to the given ObservableCollection and present them in this collection
                 * in sorted order.
                 */
                OrderedCollection.prototype.sync = function (source) {
                    if (this._unsortedSyncToken && this._unsortedSyncSource) {
                        this._unsortedSyncSource.bindingEvent.unsubscribe(this._unsortedSyncToken);
                        this._unsortedSyncSource = null;
                        this._unsortedSyncToken = null;
                    }
                    if (source && source.bindingEvent) {
                        this.clear();
                        this.addItems(source.getRange(0, source.length() - 1));
                        this._unsortedSyncSource = source;
                        this._unsortedSyncToken = source.bindingEvent.subscribe(this, this._onSyncedCollectionChanged);
                    }
                };
                OrderedCollection.prototype._onSyncedCollectionChanged = function (inArgs) {
                    switch (inArgs.type) {
                        case "set":
                            this.set(inArgs.sender.getRange(inArgs.rangeStart, inArgs.rangeEnd));
                            break;
                        case "append":
                        case "insert":
                            this.addItems(inArgs.sender.getRange(inArgs.rangeStart, inArgs.rangeEnd));
                            break;
                        case "remove":
                            for (var removeIx = inArgs.rangeStart; removeIx <= inArgs.rangeEnd; removeIx++) {
                                this.removeItem(inArgs.sender.getAt(removeIx));
                            }
                            break;
                        case "clear":
                            this.clear();
                            break;
                        default:
                            throw new Error("Unhandled case: " + inArgs.type);
                    }
                };
                OrderedCollection.prototype.insertItems = function (index, items) {
                    throw new Error("Direct insertion is not supported");
                };
                OrderedCollection.prototype.insertItem = function (index, item) {
                    throw new Error("Direct insertion is not supported");
                };
                return OrderedCollection;
            }(ObservableCollection));
            ui.OrderedCollection = OrderedCollection;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewContainer;
            (function (ViewContainer) {
                var minimumTabSize = 75;
                var ButtonTabStripView = (function (_super) {
                    __extends(ButtonTabStripView, _super);
                    function ButtonTabStripView() {
                        _super.apply(this, arguments);
                    }
                    ButtonTabStripView.prototype.attach = function (viewModel) {
                        var _this = this;
                        _super.prototype.attach.call(this, viewModel);
                        // Check the labels when the data frame is opened or resized. Need to yield
                        // so that the views can actually opening before updating the labels
                        this.app.event("DataFrameOpenedEvent").subscribe(this, function () { return _this._yield(function () { return _this._updateLabels(); }); });
                        this.app.event("PanelResizeEndEvent").subscribe(this, function () { return _this._yield(function () { return _this._updateLabels(); }); });
                        // We need to check labels when the active view descriptors change
                        this.viewModel.activeViewDescriptors.bind(this, function (args) {
                            var viewDescriptorCount = _this.viewModel.activeViewDescriptors.getLength();
                            // Observable collections fire the event before manipulating the values
                            // when removing / clearing, so we need to calculate the length ourselves
                            if (args.type === "remove") {
                                var removedCount = args.rangeEnd - args.rangeStart + 1;
                                viewDescriptorCount = viewDescriptorCount - removedCount;
                            }
                            else if (args.type === "clear") {
                                viewDescriptorCount = 0;
                            }
                            _this._updateLabels(viewDescriptorCount);
                        });
                    };
                    ButtonTabStripView.prototype.handleClickTab = function (evt, el, ctx) {
                        var view = ctx["view"];
                        if (view) {
                            this.app.viewManager.activateView(view);
                        }
                    };
                    /**
                     * Update whether we should show or hide the labels for the active view descriptors
                     * @param viewDescriptorCount (Optional) The number of view descriptors that are active
                     */
                    ButtonTabStripView.prototype._updateLabels = function (viewDescriptorCount) {
                        viewDescriptorCount = viewDescriptorCount || this.viewModel.activeViewDescriptors.getLength();
                        // If the tab size is greater than the max, show the labels
                        var $buttonTabStripElement = $(this.buttonTabStripElement);
                        var tabSize = $buttonTabStripElement.width() / viewDescriptorCount;
                        if (tabSize > minimumTabSize) {
                            $buttonTabStripElement.removeClass("no-label");
                        }
                        else {
                            $buttonTabStripElement.addClass("no-label");
                        }
                    };
                    ButtonTabStripView.prototype._yield = function (delegate) {
                        return setTimeout(delegate, 0);
                    };
                    return ButtonTabStripView;
                }(ui.ViewBase));
                ViewContainer.ButtonTabStripView = ButtonTabStripView;
            })(ViewContainer = ui.ViewContainer || (ui.ViewContainer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var stringLocalizer;
            (function (stringLocalizer) {
                /**
                 * Localize the given list of Observable<string>s when all libraries are downloaded.
                 */
                function localizeObservables(app, libraryId, observables) {
                    if (!libraryId) {
                        return;
                    }
                    if (!app.allLibrariesLoaded) {
                        app.event("ViewerLibrariesDownloadedEvent").once(this, function () {
                            localizeObservables(app, libraryId, observables);
                        });
                        return;
                    }
                    for (var i = 0; i < observables.length; i++) {
                        var value = observables[i].get();
                        if (value && value.length > 9 && value.substring(0, 9) == "@language") {
                            observables[i].set(app.getResource(libraryId, value.substring(1)));
                        }
                    }
                }
                stringLocalizer.localizeObservables = localizeObservables;
                /**
                * Localize the given <string> when all libraries are downloaded.
                */
                function localizeString(app, libraryId, stringToLocalize, callback) {
                    if (!libraryId || !stringToLocalize || !callback) {
                        return;
                    }
                    if (!app.allLibrariesLoaded) {
                        var token = app.event("ViewerLibrariesDownloadedEvent").subscribe(this, function () {
                            app.event("ViewerLibrariesDownloadedEvent").unsubscribe(token);
                            localizeString(app, libraryId, stringToLocalize, callback);
                        });
                        return;
                    }
                    if (stringToLocalize && stringToLocalize.length > 9 && stringToLocalize.substring(0, 9) == "@language") {
                        callback(app.getResource(libraryId, stringToLocalize.substring(1)));
                    }
                    else {
                        callback(stringToLocalize);
                    }
                }
                stringLocalizer.localizeString = localizeString;
            })(stringLocalizer = ui.stringLocalizer || (ui.stringLocalizer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var utils;
            (function (utils) {
                /** @private */
                var _vendorPrefix = null;
                /**
                 * Detects the correct browser vendor prefix to use on CSS properties.
                 * @param userAgent If specified, this user agent string will be used instead of the one on the `navigator` object.
                 */
                function detectBrowserPrefix(userAgent) {
                    // Check if we've cached this already to avoid regexing, but don't cache values on override.
                    if (!userAgent && _vendorPrefix !== null) {
                        return _vendorPrefix;
                    }
                    var ua = userAgent ? userAgent.toLowerCase() : navigator.userAgent.toLowerCase();
                    var match = /opera/.exec(ua) || /(msie|trident)/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari|webkit)/.exec(ua);
                    var vendorPrefixes = {
                        opera: "O",
                        chrome: "webkit",
                        safari: "webkit",
                        webkit: "webkit",
                        firefox: "Moz",
                        msie: "ms",
                        trident: "ms"
                    };
                    var prefix = match ? (vendorPrefixes[match[0]] || "") : "";
                    if (!userAgent) {
                        _vendorPrefix = prefix;
                    }
                    return prefix;
                }
                utils.detectBrowserPrefix = detectBrowserPrefix;
                function _handleTapToDismissThisEvent(evt, view, onOtherInteracted, onElementInteracted) {
                    var isView = false;
                    var namespace = "tapToDismiss" + view.id;
                    if (view.root === evt.target) {
                        isView = true;
                    }
                    else {
                        // Check the parents if the immediate target isn't the view root.
                        $(evt.target).parents().each(function (index) {
                            if (this === view.root) {
                                isView = true;
                            }
                        });
                    }
                    if (isView) {
                        // No callback passed at all? Dismiss the view passed.
                        if (!onOtherInteracted) {
                            view.app.viewManager.deactivateView(view);
                        }
                        else {
                            if (onElementInteracted) {
                                onElementInteracted(evt);
                            }
                        }
                    }
                    else {
                        // Remove the binding as the outside of the view has been clicked.
                        $(document.body).off("mousedown." + namespace + " touchstart." + namespace);
                        if (onOtherInteracted) {
                            onOtherInteracted(evt);
                        }
                    }
                }
                function tapToDismissThis(view, onOtherInteracted, onElementInteracted) {
                    if (!view) {
                        return;
                    }
                    // Need to assign a distinct namespace or else *.off() clears the event handlers for ALL possible popups.
                    var namespace = "tapToDismiss" + view.id;
                    // Discard the previous binding as if the same element is clicked twice in a row then we end up with multiple bindings.
                    $(document.body).off("mousedown." + namespace + " touchstart." + namespace);
                    $(document.body).on("mousedown." + namespace + " touchstart." + namespace, function (eventObject) { return _handleTapToDismissThisEvent(eventObject, view, onOtherInteracted, onElementInteracted); });
                }
                utils.tapToDismissThis = tapToDismissThis;
            })(utils = ui.utils || (ui.utils = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewContainer;
            (function (ViewContainer) {
                var ViewContainerViewClosedEventArgs = (function () {
                    /**
                     * Initializes a new instance of the {@link ViewContainerViewClosedEventArgs} class.
                     */
                    function ViewContainerViewClosedEventArgs(containerViewId, viewId, xButtonClicked, backButtonClicked) {
                        this.containerViewId = containerViewId;
                        this.viewId = viewId;
                        this.xButtonClicked = xButtonClicked;
                        this.backButtonClicked = backButtonClicked;
                    }
                    return ViewContainerViewClosedEventArgs;
                }());
                ViewContainer.ViewContainerViewClosedEventArgs = ViewContainerViewClosedEventArgs;
            })(ViewContainer = ui.ViewContainer || (ui.ViewContainer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../../../../../_Definitions/dojo.d.ts" />
/// <reference path="ViewContainerViewClosedEventArgs.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewContainer;
            (function (ViewContainer) {
                var ViewContainerView = (function (_super) {
                    __extends(ViewContainerView, _super);
                    function ViewContainerView(app, libraryId) {
                        _super.call(this, app, libraryId);
                        this._hasDiscoveredRegions = false;
                        this._active = false;
                        this._keyDownEventToken = null;
                        this._activatingForViewInContainer = false;
                        this.headerInsertDomElement = new Observable(null);
                        this.footerInsertDomElement = new Observable(null);
                        this.scrollContainerTop = new Observable(0);
                        this.scrollContainerBottom = new Observable(0);
                        var token = this.app.eventRegistry.event("ViewActivatedInContainerEvent").subscribe(this, this._handleViewActivatedInContainerEvent);
                        // When the internally contained region is activated/deactivated, we need to do the same to the hosting view.
                        this.app.event("RegionActivatedEvent").subscribe(this, this.handleRegionActivatedEvent);
                        this.app.event("RegionDeactivatedEvent").subscribe(this, this.handleRegionDeactivatedEvent);
                        this.app.event("ViewDimensionsChangedEvent").subscribe(this, this.resize);
                        this.app.event("SiteInitializedEvent").once(this, this.delayedResize);
                    }
                    ViewContainerView.prototype.attach = function (viewModelArg) {
                        var _this = this;
                        _super.prototype.attach.call(this, viewModelArg);
                        this.title.sync(this.viewModel.viewTitle);
                        this.headerInsertDomElement.sync(this.viewModel.headerInsertDomElement);
                        this.footerInsertDomElement.sync(this.viewModel.footerInsertDomElement);
                        this.viewModel.headerIsVisible.bind(this, function (value) { return _this.delayedResize(); });
                        this.delayedResize();
                    };
                    /**
                     * Style the top/bottom offsets of the scroll region to accommodate any inserts (header or footer).
                     */
                    ViewContainerView.prototype.resize = function () {
                        if (this["headerElement"] && this["scrollRegionElement"] && this["containerElement"]) {
                            var $scrollRegionElement = $(this["scrollRegionElement"]);
                            var $headerElement = $(this["headerElement"]);
                            var $footerElement = $(this["footerElement"]);
                            // Gathering height of inserts, so long as they are not explicitly hidden by `display:none`.
                            var headerHeight = $headerElement.length && $headerElement.css("display") !== "none"
                                ? $headerElement.outerHeight()
                                : 0;
                            var footerHeight = $footerElement.length && $footerElement.css("display") !== "none"
                                ? $footerElement.outerHeight()
                                : 0;
                            // Don't bother with a "top" style if the scroll region element is not positioned absolutely.
                            if ($scrollRegionElement.css("position") !== "relative") {
                                $scrollRegionElement.css("top", headerHeight + "px");
                            }
                            $scrollRegionElement.css("bottom", footerHeight + "px");
                        }
                    };
                    /**
                     * Works the same as resize() but after a small delay. This is useful if other elements still need to settle down.
                     */
                    ViewContainerView.prototype.delayedResize = function () {
                        var _this = this;
                        setTimeout(function () {
                            _this.resize();
                        }, 1);
                    };
                    ViewContainerView.prototype.getZerothView = function () {
                        for (var i = 0; i < this.viewModel.viewDescriptors.getLength(); ++i) {
                            var desc = this.viewModel.viewDescriptors.getAt(i);
                            if (this.viewModel.getViewPriority(desc.view.id) === 0) {
                                return desc.view;
                            }
                        }
                        return null;
                    };
                    ViewContainerView.prototype.activated = function () {
                        _super.prototype.activated.call(this);
                        // If we are non-active (all of our contained views have been deactivated), activate the root (0th) view!
                        // However, if we are in the process of activating one of our own view (_activatingForViewInContainer), don't activate the 0th view.
                        if (!this._active && this.viewModel && !this._activatingForViewInContainer) {
                            this._activatingForViewInContainer = false;
                            this._active = true;
                            var zerothView = this.getZerothView();
                            if (zerothView && !zerothView.isActive) {
                                this.app.viewManager.activateView(zerothView);
                                this._active = true;
                            }
                            else {
                                var subscriptionToken = this.viewModel.viewDescriptors.bind(this, function (updateArgs) {
                                    var zerothViewDescriptor = updateArgs.sender.getAt(0);
                                    if (!zerothViewDescriptor || this.viewModel.getViewPriority(zerothViewDescriptor.view.id) !== 0) {
                                        return;
                                    }
                                    if (!zerothViewDescriptor.view.isActive) {
                                        this.app.viewManager.activateView(zerothViewDescriptor["view"]);
                                    }
                                    this.viewModel.viewDescriptors.unbind(subscriptionToken);
                                });
                            }
                        }
                        if (this.viewModel) {
                            this.viewModel.showOrHideCloseButtons();
                        }
                        if (this.viewModel && this.viewModel.closeOnEscape) {
                            this._keyDownEventToken = dojo.connect(document, "keydown", this, this._documentKeyDown);
                        }
                        // Fire an event whenever a view container is activated. That gives child views a chance to act according to their parent visibility.
                        // NOTE: Child views hosted within a ViewContainerView are not activated/deactivated when the container is activated/deactivated.
                        this.app.event("ViewContainerActivatedEvent").publish(this);
                        this.delayedResize();
                    };
                    ViewContainerView.prototype.deactivated = function () {
                        _super.prototype.deactivated.call(this);
                        this._activatingForViewInContainer = false;
                        if (this._keyDownEventToken) {
                            dojo.disconnect(this._keyDownEventToken);
                            this._keyDownEventToken = null;
                        }
                        // Fire an event whenever a view container is deactivated. That gives child views a chance to act according to their parent visibility.
                        // NOTE: Child views hosted within a ViewContainerView are not activated/deactivated when the container is activated/deactivated.
                        this.app.event("ViewContainerDeactivatedEvent").publish(this);
                    };
                    ViewContainerView.prototype.activateContainer = function () {
                        this._active = true;
                        // Activate the view, if it's hosted in a region
                        if (this.regionName) {
                            this.app.viewManager.activateView(this);
                        }
                    };
                    ViewContainerView.prototype.deactivateContainer = function () {
                        this._active = false;
                        this.app.viewManager.deactivateView(this);
                    };
                    ViewContainerView.prototype.handleScrollChange = function (evt, el, ctx) {
                        var currentDescriptor = ctx.getDescriptorForActiveView(ctx.currentView);
                        currentDescriptor.scrollTop = el.scrollTop;
                    };
                    ViewContainerView.prototype.handleRegionActivatedEvent = function (region) {
                        if (this.viewModel && region.name === this.viewModel.regionName.get()) {
                            this.activateContainer();
                        }
                    };
                    ViewContainerView.prototype.handleRegionDeactivatedEvent = function (region) {
                        if (this.viewModel && region.name === this.viewModel.regionName.get()) {
                            this.deactivateContainer();
                        }
                    };
                    ViewContainerView.prototype.handleClickBack = function (evt, el, ctx) {
                        if (!ctx.currentView) {
                            return;
                        }
                        var view = ctx.currentView;
                        this._closeCurrentView(ctx);
                        this._broadcastClosedEvent(view, false, true);
                    };
                    ViewContainerView.prototype.handleClickClose = function (evt, el, ctx) {
                        if (!ctx.currentView) {
                            return;
                        }
                        var view = ctx.currentView;
                        this._closeCurrentView(ctx);
                        this._broadcastClosedEvent(view, true, false);
                    };
                    ViewContainerView.prototype.handleClickTab = function (evt, el, ctx) {
                        var view = ctx["view"];
                        if (view) {
                            this.app.command("ActivateView").execute(view.id);
                        }
                    };
                    ViewContainerView.prototype.handleClickCloseTab = function (evt, el, ctx) {
                        var view = ctx["view"];
                        if (view) {
                            this.app.viewManager.destroyView(view);
                        }
                    };
                    /**
                     * Handles the document key down event so that the view container can be closed
                     * when the escape key is pressed.
                     * @param e The event object.
                     */
                    ViewContainerView.prototype._documentKeyDown = function (e) {
                        // Check for escape key
                        if (e.keyCode === 27) {
                            if (this.viewModel) {
                                var view = this.viewModel.currentView;
                                this._closeCurrentView(this.viewModel);
                                this._broadcastClosedEvent(view, true, false);
                            }
                        }
                    };
                    ViewContainerView.prototype._handleViewActivatedInContainerEvent = function (view) {
                        var _this = this;
                        this._activatingForViewInContainer = false;
                        // Does this container need to be activated?
                        var descriptor = null;
                        if (!this.viewModel) {
                            return;
                        }
                        // If we don't have a descriptor for this view already, we don't care about it.
                        descriptor = this.viewModel.getDescriptorForActiveView(view);
                        if (!descriptor) {
                            return;
                        }
                        // Are we going to activate this container because we're activating a view in it? Flag as so, so we don't
                        // end up activating the root view by accident.
                        this._activatingForViewInContainer = true;
                        if (this.regionName) {
                            this.app.viewManager.activateView(this);
                        }
                        // Restore the scroll position
                        // Use a timeout, so the binding engine has a chance to insert the view before we 
                        // set the scroll position on it. Otherwise the scrollPosition gets blown away (reset to 0).
                        var scrollTop = descriptor.scrollTop === undefined ? 0 : descriptor.scrollTop;
                        // GVH-1363 - Fix for problems w/ Feature Details View and Editor scrolling to the middle rather than the top on change.
                        if (descriptor.view.id != "FeatureDetailsView" && descriptor.view.id != "EditorView") {
                            setTimeout(function () {
                                dojo.style(_this["scrollRegionElement"], "scrollTop", scrollTop);
                                _this["scrollRegionElement"].scrollTop = scrollTop;
                            }, 0);
                        }
                        this.delayedResize();
                    };
                    ViewContainerView.prototype._closeCurrentView = function (ctx) {
                        ctx.closeCurrentView();
                    };
                    ViewContainerView.prototype._broadcastClosedEvent = function (view, xButton, backButton) {
                        var eventArgs = new geocortex.framework.ui.ViewContainer.ViewContainerViewClosedEventArgs(this.id, view.id, xButton, backButton);
                        this.app.event("ViewContainerViewClosedEvent").publish(eventArgs);
                    };
                    return ViewContainerView;
                }(ui.ViewBase));
                ViewContainer.ViewContainerView = ViewContainerView;
            })(ViewContainer = ui.ViewContainer || (ui.ViewContainer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="ViewContainerView.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewContainer;
            (function (ViewContainer) {
                var ViewContainerViewModel = (function (_super) {
                    __extends(ViewContainerViewModel, _super);
                    function ViewContainerViewModel(app, libraryId) {
                        _super.call(this, app, libraryId);
                        this.regionName = new Observable("");
                        this.regionType = new Observable(null);
                        this.headerIsVisible = new Observable(true);
                        this.titleBarIsVisible = new Observable(true);
                        this.hasCustomHeaderComponent = new Observable(false);
                        this.hasCustomFooterComponent = new Observable(false);
                        this.showingBackButton = new Observable(true);
                        this.showBusyIndicator = new Observable(false);
                        this.showHostedViews = new Observable(false);
                        this.showingXButton = new Observable(true);
                        this.containerTitle = new Observable("");
                        this.containerManagedTitle = new Observable("");
                        this.viewTitle = new Observable("");
                        this.closeTitle = new Observable("");
                        this.backTitle = new Observable("");
                        this.fullTitle = new Observable("");
                        this.viewDescriptors = new ObservableCollection();
                        this.activeViewDescriptors = new ObservableCollection();
                        this.headerInsertDomElement = new Observable(null);
                        this.footerInsertDomElement = new Observable(null);
                        this.managedViewsOnly = false;
                        this.defaultViewIconUri = null;
                        this._viewDescriptorConstructor = null;
                        this._activeViews = {}; // Used to keep trap of view activations.
                        this._insertedViews = []; // Used to keep track of the header/footer inserted markup
                        this._ordering = {};
                        this._backButtonOnRootView = true;
                        this._showBackButton = true;
                        this._showBackButtonAsX = true;
                        this._originalHeaderIsVisibleSetting = false;
                        this._showHeaderForStandaloneViews = false;
                        this._fullTitleFormatString = "{0} - {1}";
                        // If the region exists already, we'll enumerate the views in it and create view descriptors.
                        var region = this.app.viewManager.getExistingRegionByName(this.regionName.get());
                        if (region) {
                            for (var i = 0; i < region.views.length; ++i) {
                                this._addOrderedView(this.createDescriptorForView(region.views[i]));
                            }
                        }
                        this.app.event("ViewHostedEvent").subscribe(this, this.handleViewHosted);
                        this.app.event("ViewUnhostedEvent").subscribe(this, this.handleViewUnhosted);
                        this.app.event("ViewActivatedEvent").subscribe(this, this.handleViewActivatedEvent);
                        this.app.event("ViewDeactivatedEvent").subscribe(this, this.handleViewDeactivatedEvent);
                    }
                    ViewContainerViewModel.prototype.initialize = function (config) {
                        var _this = this;
                        this.regionName.set(config["containerRegionName"]);
                        this.regionType.set(config["containerRegionType"] || "geocortex.framework.ui.MultiDivRegionAdapter");
                        this.containerTitle.set(config["containerTitle"] || null);
                        this.containerManagedTitle.set(config["containerManagedTitle"] || null); // GVH-9160
                        this.defaultViewIconUri = config["defaultViewIcon"] || null;
                        if (this.containerTitle.get()) {
                            this.viewTitle.sync(this.containerTitle);
                        }
                        if (config["headerIsVisible"] !== null && config["headerIsVisible"] !== undefined) {
                            this._originalHeaderIsVisibleSetting = !!config["headerIsVisible"];
                        }
                        else {
                            this._originalHeaderIsVisibleSetting = true;
                        }
                        this._showHeaderForStandaloneViews = !!config["showHeaderForStandaloneViews"];
                        this.headerIsVisible.set(this._originalHeaderIsVisibleSetting);
                        this.showHostedViews.set(!!config["showHostedViews"]);
                        this._ordering = config["ordering"] || {};
                        this._backButtonOnRootView = config["backButtonOnRootView"];
                        this._showBackButtonAsX = config["showBackButtonAsX"];
                        this.closeOnEscape = !!config["closeOnEscape"];
                        this._viewDescriptorConstructor = config["viewDescriptor"] || null;
                        // Do we have a header insert specified? Create a view, if so.
                        var injectMarkupPiece = function (prefix, observableDomElement) {
                            if (!config["{0}InsertMarkup".format(prefix)]) {
                                return;
                            }
                            try {
                                var def = {
                                    markupResource: config["{0}InsertMarkup".format(prefix)],
                                    typeName: config["{0}InsertType".format(prefix)]
                                };
                                if (config["{0}InsertLibraryId".format(prefix)]) {
                                    if (!_this.app.allLibrariesLoaded) {
                                        // This piece of markup may not yet be available, rerun the function when it is.
                                        var librariesDownloadedtoken = _this.app.event("ViewerLibrariesDownloadedEvent").subscribe(_this, function () {
                                            _this.app.event("ViewerLibrariesDownloadedEvent").unsubscribe(librariesDownloadedtoken);
                                            injectMarkupPiece(prefix, observableDomElement);
                                        });
                                        return;
                                    }
                                    def.libraryId = config["{0}InsertLibraryId".format(prefix)];
                                }
                                var insertView = _this.app.viewManager.createView(def);
                                insertView.attach(_this);
                                _this._insertedViews.push(insertView);
                                observableDomElement.set(insertView.root);
                            }
                            catch (error) {
                                _this.app.trace.error("Could not create view {0} container insert: {1}".format(prefix, error.toString()));
                            }
                        };
                        injectMarkupPiece("header", this.headerInsertDomElement);
                        injectMarkupPiece("footer", this.footerInsertDomElement);
                    };
                    ViewContainerViewModel.prototype.createDescriptorForView = function (view) {
                        if (this._viewDescriptorConstructor) {
                            var ctor = dojo.getObject(this._viewDescriptorConstructor);
                            if (ctor) {
                                return new ctor(view, this);
                            }
                            this.app.trace.error("Couldn't find viewDescriptor type: " + this._viewDescriptorConstructor);
                            this._viewDescriptorConstructor = null;
                        }
                        return new ViewContainer.ViewDescriptor(view, this);
                    };
                    /**
                     * Looks up a view descriptor for a given view.
                     */
                    ViewContainerViewModel.prototype.getDescriptorForView = function (view) {
                        for (var i = 0; i < this.viewDescriptors.getLength(); ++i) {
                            var descriptor = this.viewDescriptors.getAt(i);
                            if (descriptor.view === view) {
                                return descriptor;
                            }
                        }
                        return null;
                    };
                    /**
                     * Looks up a view descriptor for a given view.
                     */
                    ViewContainerViewModel.prototype.getDescriptorForActiveView = function (view) {
                        for (var i = 0; i < this.activeViewDescriptors.getLength(); ++i) {
                            var descriptor = this.activeViewDescriptors.getAt(i);
                            if (descriptor.view === view) {
                                return descriptor;
                            }
                        }
                        return null;
                    };
                    /**
                     * Handles a view being hosted in the region this container contains.
                     */
                    ViewContainerViewModel.prototype.handleViewHosted = function (args) {
                        if (this.managedViewsOnly && !args.view.isManaged) {
                            return;
                        }
                        if (args.region.name === this.regionName.get()) {
                            var descriptor = this.getDescriptorForView(args.view);
                            if (!descriptor) {
                                descriptor = this.createDescriptorForView(args.view);
                                this._addOrderedView(descriptor);
                                // Are we showing views that are hosted?
                                if (this.showHostedViews.get()) {
                                    var activeViewDescriptor = this.getDescriptorForActiveView(args.view);
                                    if (!activeViewDescriptor) {
                                        this.insertActiveViewDescriptor(descriptor);
                                    }
                                }
                            }
                        }
                    };
                    /**
                     * Handles a view being unhosted from the region this container contains.
                     */
                    ViewContainerViewModel.prototype.handleViewUnhosted = function (args) {
                        if (args.region.name === this.regionName.get()) {
                            var descriptor = this.getDescriptorForView(args.view);
                            if (descriptor) {
                                this.viewDescriptors.removeItem(descriptor);
                                // If the view is unhosted, it will likely have been deactivated and thus removed from the active collection.
                                // We'll ensure it was removed, just to be safe.
                                if (!this.showHostedViews.get()) {
                                    this.activeViewDescriptors.removeItem(descriptor);
                                }
                            }
                        }
                    };
                    ViewContainerViewModel.prototype.handleViewActivatedEvent = function (view) {
                        if (this.managedViewsOnly && !view.isManaged) {
                            return;
                        }
                        var region = this.app.viewManager.getRegionForViewId(view.id);
                        if (region && region.name === this.regionName.get()) {
                            var descriptor = this.getDescriptorForView(view);
                            if (!descriptor) {
                                descriptor = this.createDescriptorForView(view);
                                this._addOrderedView(descriptor);
                            }
                            this._activeViews[view.id] = true;
                            this.app.trace.debug("--- Activated view {0}".format(view.id));
                            this.activateViewInContainer(view);
                        }
                    };
                    ViewContainerViewModel.prototype.handleViewDeactivatedEvent = function (view) {
                        var region = this.app.viewManager.getRegionForViewId(view.id);
                        if (region && region.name === this.regionName.get()) {
                            this._activeViews[view.id] = false;
                            var descriptor = this.getDescriptorForView(view);
                            if (descriptor && !this.showHostedViews.get()) {
                                this.activeViewDescriptors.removeItem(descriptor);
                            }
                            this.app.trace.debug("--- Deactivated view {0}".format(view.id));
                            this.deactivateViewInContainer(view);
                        }
                    };
                    ViewContainerViewModel.prototype.activateViewInContainer = function (view) {
                        this.deactivateViews();
                        this.currentView = view;
                        var descriptor = this.getDescriptorForView(view);
                        if (descriptor) {
                            descriptor.isActive.set(true);
                            descriptor.cssClass.set("tab-active");
                        }
                        else if (view.isManaged) {
                            descriptor = this.createDescriptorForView(view);
                            descriptor.isActive.set(true);
                            descriptor.cssClass.set("tab-active");
                            this._addOrderedView(descriptor);
                        }
                        var activeViewDescriptor = this.getDescriptorForActiveView(view);
                        if (!activeViewDescriptor) {
                            this.insertActiveViewDescriptor(descriptor);
                        }
                        this.app.event("ViewActivatedInContainerEvent").publish(view);
                        // If we are showing the header for standalone views, do so.
                        if (this._showHeaderForStandaloneViews && !(view instanceof geocortex.framework.ui.ViewContainer.ViewContainerView)) {
                            this.headerIsVisible.set(true);
                        }
                        else {
                            this.headerIsVisible.set(this._originalHeaderIsVisibleSetting);
                        }
                        this.showOrHideCloseButtons();
                        if (!this.containerTitle.get()) {
                            this.viewTitle.sync(view.title);
                        }
                        this.backTitle.set(this.app.getResource(this.libraryId, "language-framework-ui-view-container-view-back").format(this.viewTitle.get()));
                        this.closeTitle.set(this.app.getResource(this.libraryId, "language-framework-ui-view-container-view-close").format(this.viewTitle.get()));
                        this.showBusyIndicator.sync(view.isBusy);
                    };
                    ViewContainerViewModel.prototype.showOrHideCloseButtons = function () {
                        var rootViewDescriptor = this.viewDescriptors.getAt(0);
                        if (!rootViewDescriptor) {
                            return;
                        }
                        if (this.currentView === rootViewDescriptor.view) {
                            if (!this._backButtonOnRootView) {
                                this.showingBackButton.set(false);
                                this.showingXButton.set(false);
                            }
                            else {
                                this.showingXButton.set(this._showBackButtonAsX);
                                this.showingBackButton.set(!this._showBackButtonAsX);
                            }
                        }
                        else {
                            // GVH-3518 ViewContainerView should honor configuration properties of child views being hosted in the container
                            if (this.currentView && this.currentView.hasOwnProperty("configuration") && this.currentView.configuration.hasOwnProperty("showXButton")) {
                                this.showingXButton.set(this.currentView.configuration["showXButton"]);
                                this.showingBackButton.set(false);
                            }
                            else {
                                // Set the back button to be visible (provided it has been configured to be).
                                this.showingXButton.set(this._showBackButtonAsX);
                                this.showingBackButton.set(!this._showBackButtonAsX);
                            }
                        }
                    };
                    ViewContainerViewModel.prototype.deactivateViewInContainer = function (view) {
                        var descriptor = this.getDescriptorForView(view);
                        if (descriptor) {
                            descriptor.isActive.set(false);
                            descriptor.cssClass.set("tab-inactive");
                            if (!this.showHostedViews.get()) {
                                this.activeViewDescriptors.removeItem(descriptor);
                            }
                        }
                        this.showOrHideCloseButtons();
                    };
                    ViewContainerViewModel.prototype.closeCurrentView = function () {
                        var descriptor = this.getDescriptorForView(this.currentView);
                        if (descriptor && !this.showHostedViews.get()) {
                            this.activeViewDescriptors.removeItem(descriptor);
                        }
                        this.deactivateCurrentView();
                    };
                    ViewContainerViewModel.prototype.deactivateCurrentView = function () {
                        if (this.currentView) {
                            this.app.viewManager.deactivateView(this.currentView);
                        }
                    };
                    ViewContainerViewModel.prototype.deactivateViews = function () {
                        for (var i = 0; i < this.viewDescriptors.getLength(); ++i) {
                            var descriptor = this.viewDescriptors.getAt(i);
                            descriptor.isActive.set(false);
                            descriptor.cssClass.set("tab-inactive");
                        }
                    };
                    ViewContainerViewModel.prototype.getViewPriority = function (id) {
                        if (this._ordering.hasOwnProperty(id)) {
                            return parseInt(this._ordering[id]);
                        }
                        else {
                            return null;
                        }
                    };
                    // NOTE: Borrowed from ToolbarManagedViewsViewModel!
                    ViewContainerViewModel.prototype._addOrderedView = function (viewDescriptor) {
                        var view = viewDescriptor.view;
                        var activeViewDescriptor = this.getDescriptorForActiveView(view);
                        if (!this._ordering) {
                            this.viewDescriptors.addItem(viewDescriptor);
                            if (view.isActive && !activeViewDescriptor) {
                                this.insertActiveViewDescriptor(viewDescriptor);
                            }
                            return;
                        }
                        // Find a priority for the view. If no priority is found, add it on the end.
                        var viewId = view.id;
                        if (!viewId) {
                            this.viewDescriptors.addItem(viewDescriptor);
                            if (view.isActive && !activeViewDescriptor) {
                                this.insertActiveViewDescriptor(viewDescriptor);
                            }
                            return;
                        }
                        // Look for a spot to insert the view.
                        var newViewPriority = this.getViewPriority(viewId);
                        viewDescriptor.priority = newViewPriority;
                        // No priority? Add to the end. Note the explicit null/undefined checks...it is possible for newViewPriority to be zero.
                        if (newViewPriority === null || newViewPriority === undefined) {
                            // This is important: If no priority is specified, we'll want to ensure that we give it a non-zero priority.
                            viewDescriptor.priority = this.activeViewDescriptors.getLength() + 1;
                            this.viewDescriptors.addItem(viewDescriptor);
                            if (view.isActive && !activeViewDescriptor) {
                                this.insertActiveViewDescriptor(viewDescriptor);
                            }
                            return;
                        }
                        var inserted = false;
                        for (var i = 0; i < this.viewDescriptors.getLength(); ++i) {
                            var existingView = this.viewDescriptors.getAt(i).view;
                            var existingViewPriority = this.getViewPriority(existingView.id);
                            if (existingViewPriority === null || newViewPriority <= existingViewPriority) {
                                inserted = true;
                                this.viewDescriptors.insertItem(i, viewDescriptor);
                                break;
                            }
                        }
                        // If we didn't find a position for the view, append it.
                        if (!inserted) {
                            this.viewDescriptors.addItem(viewDescriptor);
                        }
                        if (view.isActive) {
                            this.insertActiveViewDescriptor(viewDescriptor);
                        }
                    };
                    /**
                     * Inserts a view descriptor into the collection of descriptors representing active views, maintaining the configured order.
                     * @param descriptor The descriptor for the active view.
                     */
                    ViewContainerViewModel.prototype.insertActiveViewDescriptor = function (descriptor) {
                        for (var i = 0; i < this.activeViewDescriptors.getLength(); ++i) {
                            var currDescriptor = this.activeViewDescriptors.getAt(i);
                            if (descriptor.priority < currDescriptor.priority) {
                                this.activeViewDescriptors.insertItem(i, descriptor);
                                return;
                            }
                        }
                        // Didn't find a place to insert? Tack on the end.
                        this.activeViewDescriptors.addItem(descriptor);
                        return;
                    };
                    /**
                     * Disposes of event handlers and child views. This should be called whenever a ViewContainerViewModel
                     * is no longer needed so that this object can be garbage collected, and so that child views are destroyed.
                     */
                    ViewContainerViewModel.prototype.dispose = function () {
                        for (var i = 0; i < this._insertedViews.length; i++) {
                            var view = this._insertedViews[i];
                            this.app.viewManager.destroyView(view);
                        }
                        this._insertedViews.length = 0;
                    };
                    return ViewContainerViewModel;
                }(ui.ViewModelBase));
                ViewContainer.ViewContainerViewModel = ViewContainerViewModel;
            })(ViewContainer = ui.ViewContainer || (ui.ViewContainer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../ViewDescriptorInterface.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewContainer;
            (function (ViewContainer) {
                var ViewDescriptor = (function () {
                    function ViewDescriptor(view, vcvm) {
                        this.containerTitle = new Observable(null);
                        this.isBusy = new Observable(null);
                        this.isActive = new Observable(false);
                        this.cssClass = new Observable("tab-inactive");
                        this.view = view;
                        this.iconUri = view.iconUri.get() ? view.iconUri : new Observable(vcvm.defaultViewIconUri);
                        this.title = view.title;
                        this.isBusy = view.isBusy;
                        // A default priority of 1 is simply to avoid having a default of 0, which effectively means "this view should be first".
                        this.priority = 1;
                        if (view instanceof ui.ViewContainer.ViewContainerView === true) {
                            var containerView = view;
                            this.containerTitle.set(containerView.viewModel.containerTitle.get());
                            if (containerView.viewModel.containerManagedTitle.get()) {
                                this.title = containerView.viewModel.containerManagedTitle; // GVH-9160
                            }
                        }
                    }
                    return ViewDescriptor;
                }());
                ViewContainer.ViewDescriptor = ViewDescriptor;
            })(ViewContainer = ui.ViewContainer || (ui.ViewContainer = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../../../_Definitions/framework.d.ts" />
/// <reference path="../../../../../_Definitions/dojo.d.ts" />
/// <reference path="../ViewDescriptorInterface.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewSwitcher;
            (function (ViewSwitcher) {
                var ViewSwitcherView = (function (_super) {
                    __extends(ViewSwitcherView, _super);
                    function ViewSwitcherView() {
                        _super.apply(this, arguments);
                    }
                    /**
                     * Handles the click event on one of the view switcher tabs
                     * @param evt The HTML Event
                     * @param el The HTML Element
                     * @param ctx The ViewDescriptor the associated view
                     */
                    ViewSwitcherView.prototype.handleClickTab = function (evt, el, ctx) {
                        var view = ctx.view;
                        if (view) {
                            this.app.viewManager.activateView(view);
                        }
                    };
                    return ViewSwitcherView;
                }(ui.ViewBase));
                ViewSwitcher.ViewSwitcherView = ViewSwitcherView;
            })(ViewSwitcher = ui.ViewSwitcher || (ui.ViewSwitcher = {}));
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));

/* End Script: Framework.UI/framework.ui_ts_out.js ------------------------- */ 


/* Begin Script: Mapping/version.js ------------------------- */ 
if (!geocortex) geocortex = { }; 
if (!geocortex.essentialsHtmlViewer) geocortex.essentialsHtmlViewer = { }; 
geocortex.essentialsHtmlViewer.version = "2.8.0.0003"; 

/* End Script: Mapping/version.js ------------------------- */ 

geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/MultiRegion/MultiRegionView.html","html","PGRpdiBjbGFzcz0ibXVsdGktcmVnaW9uLXZpZXciIGRhdGEtYmluZGluZz0ie0B2YXI6IG11bHRpUmVnaW9uVmlld0VsZW1lbnR9e0Bzb3VyY2U6IHJlZ2lvbkRlc2NyaXB0b3JzfSI+DQogICAgPGRpdiBkYXRhLWJpbmRpbmc9IntAdGVtcGxhdGUtZm9yOiByZWdpb25EZXNjcmlwdG9yc317Y2xhc3M6IHJlZ2lvbkNzc30iPg0KICAgICAgICA8ZGl2IGNsYXNzPSJyZWdpb24tdmlldy1zd2l0Y2hlciIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IGRpc3BsYXlSZWdpb25WaWV3U3dpdGNoZXJ9e0B3aWRnZXQ6IFJlZ2lvblZpZXdTd2l0Y2hlcldpZGdldH17QHdpZGdldC1jb250ZXh0OiB2aWV3U3dpdGNoZXJWaWV3TW9kZWx9e0B3aWRnZXQtcmVxdWlyZWQ6IGZhbHNlfSI+PC9kaXY+DQogICAgICAgIDxkaXYgY2xhc3M9InJlZ2lvbiIgZGF0YS1iaW5kaW5nPSJ7ZGF0YS1yZWdpb24tbmFtZTogcmVnaW9uTmFtZX17ZGF0YS1yZWdpb24tYWRhcHRlcjogcmVnaW9uVHlwZX0iPjwvZGl2Pg0KICAgIDwvZGl2Pg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/Selector/DefaultItemTemplate.html","html","PGxpIGNsYXNzPSJzZWxlY3Rvci1pdGVtIHNpbmdsZS1zZWxlY3QiPg0KICAgIDxkaXYgZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6IGhhbmRsZUNsaWNrSXRlbX17QGV2ZW50LXRvdWNoc3RhcnQ6IGhhbmRsZUNsaWNrSXRlbX0iPg0KICAgICAgICA8aW5wdXQgY2xhc3M9InNlbGVjdG9yLWNoZWNrYm94IiBkYXRhLWJpbmRpbmc9IntpZDogaWR9e2NoZWNrZWQ6IGlzU2VsZWN0ZWR9IiB0eXBlPSJjaGVja2JveCIgLz4NCiAgICAgICAgPGxhYmVsIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBkaXNwbGF5TmFtZX17Zm9yOiBpZH0iPjwvbGFiZWw+DQogICAgPC9kaXY+DQo8L2xpPg0K");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/Selector/SelectorView.html","html","PGRpdiBjbGFzcz0iZnVpLXNlbGVjdG9yIiBkYXRhLWJpbmRpbmc9IntAY2xhc3MtZXhwYW5kZWQ6IG9wZW5TdGF0ZX0iPg0KDQogICAgPGRpdiBjbGFzcz0iZnVpLXNlbGVjdG9yLWhlYWRlciIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHNob3dTZWxlY3RvckhlYWRlcn17QG5vY2xhc3Mtbm8tc2VsZWN0b3ItaXRlbXM6IGl0ZW1zfSI+DQogICAgICAgIDxidXR0b24gZGF0YS1iaW5kaW5nPSJ7QGV2ZW50LW9uY2xpY2s6IGhhbmRsZUNsaWNrU2VsZWN0b3J9e0B2aXNpYmxlOiBpdGVtc30iPjxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBzZWxlY3RvclRleHR9Ij48L3NwYW4+PC9idXR0b24+DQogICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0BoaWRkZW46IGl0ZW1zfXtAdGV4dDogbm9JdGVtc1RleHR9Ij48L3NwYW4+DQogICAgPC9kaXY+DQogICAgPGRpdiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogb3BlblN0YXRlfSI+DQogICAgICAgIDx1bCBjbGFzcz0iZnVpLXNlbGVjdG9yLWJvZHkiIGRhdGEtYmluZGluZz0ie0BoaWRkZW46c2hvd05hdGl2ZVNlbGVjdH17QHNvdXJjZTogaXRlbXN9e0BjbGFzcy1leHBhbmRlZDogb3BlblN0YXRlfXtAdmFyOiBjdXN0b21TZWxlY3R9Ij4NCiAgICAgICAgICAgIDxsaSBjbGFzcz0iZnVpLXNlbGVjdG9yLWl0ZW0iIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IGl0ZW1zfXtAd2lkZ2V0OiBTZWxlY3Rvckl0ZW1XaWRnZXR9e0B3aWRnZXQtY29udGV4dDogQGNvbnRleHR9e0B3aWRnZXQtcmVwbGFjZTogdHJ1ZX0iIC8+DQogICAgICAgIDwvdWw+ICAgICAgDQogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZ1aS1zZWxlY3Rvci1ib2R5IiBkYXRhLWJpbmRpbmc9IntAY2xhc3MtZXhwYW5kZWQ6IG9wZW5TdGF0ZX17QHZpc2libGU6IHNob3dOYXRpdmVTZWxlY3R9e0B2YXI6IHNlbGVjdEVsZW1lbnR9e0Bzb3VyY2U6IGl0ZW1zfXtAdmFsdWU6IF9zZWxlY3RlZEl0ZW1zfQ0KICAgICAgICAgICAge0BldmVudC1vbmNoYW5nZTogaGFuZGxlU2VsZWN0aW9uQ2hhbmdlfSI+DQogICAgICAgICAgICA8b3B0aW9uIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IGl0ZW1zfXtAZXZlbnQtb25jbGljazogaGFuZGxlQ2xpY2tJdGVtfXtAdGV4dDogZGlzcGxheU5hbWV9e0BhdHRhY2g6QGNvbnRleHR9Ij48L29wdGlvbj4NCiAgICAgICAgPC9zZWxlY3Q+ICANCiAgICA8L2Rpdj4NCjwvZGl2Pg0K");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/SplashScreen/SplashScreenView.html","html","PGRpdiBjbGFzcz0ic3BsYXNoLXNjcmVlbiI+PC9kaXY+DQo=");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/ViewContainer/ButtonTabStripView.html","html","DQo8ZGl2IGNsYXNzPSJidXR0b24tdGFiLXN0cmlwIiBkYXRhLWJpbmRpbmc9IntAdmFyOiBidXR0b25UYWJTdHJpcEVsZW1lbnR9Ij4NCiAgICA8ZGl2IGRhdGEtYmluZGluZz0ie0Bzb3VyY2U6IGFjdGl2ZVZpZXdEZXNjcmlwdG9yc30iPg0KICAgICAgICA8YnV0dG9uIGRhdGEtYmluZGluZz0ie0B0ZW1wbGF0ZS1mb3I6IGFjdGl2ZVZpZXdEZXNjcmlwdG9yc317QGV2ZW50LW9uY2xpY2s6IGhhbmRsZUNsaWNrVGFifXtjbGFzc05hbWU6IGNzc0NsYXNzfXt0aXRsZTogdGl0bGV9Ij4NCiAgICAgICAgICAgIDxpbWcgY2xhc3M9InRhYi1zdHJpcC1pY29uIiBkYXRhLWJpbmRpbmc9IntzcmM6IGljb25Vcml9e0B2aXNpYmxlOiBpY29uVXJpfSIgYWx0PSIgIiAvPg0KICAgICAgICAgICAgPHAgY2xhc3M9InRhYi1zdHJpcC1sYWJlbCIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHRpdGxlfXtAdGV4dDogdGl0bGV9Ij48L3A+DQogICAgICAgIDwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html","html","PGRpdiBjbGFzcz0idmlldy1jb250YWluZXItdmlldyIgZGF0YS1iaW5kaW5nPSJ7QHZhcjogY29udGFpbmVyRWxlbWVudH0iPg0KICAgIDxkaXYgY2xhc3M9InBhbmVsLWhlYWRlciIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IGhlYWRlcklzVmlzaWJsZX17QHZhcjogaGVhZGVyRWxlbWVudH0iPg0KDQogICAgICAgIDxkaXYgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHRpdGxlQmFySXNWaXNpYmxlfSI+DQogICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJwYW5lbC1oZWFkZXItYnV0dG9uIHJpZ2h0IGNsb3NlLTE2IiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd2luZ1hCdXR0b259e0BldmVudC1vbmNsaWNrOiBoYW5kbGVDbGlja0Nsb3NlfXt0aXRsZTogY2xvc2VUaXRsZX0iPjwvYnV0dG9uPg0KICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0icGFuZWwtaGVhZGVyLWJ1dHRvbiBsZWZ0IGJhY2stMTYiIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBzaG93aW5nQmFja0J1dHRvbn17QGV2ZW50LWNsaWNrOiBoYW5kbGVDbGlja0JhY2t9e3RpdGxlOiBiYWNrVGl0bGV9Ij48L2J1dHRvbj4NCg0KICAgICAgICAgICAgPGgyIGNsYXNzPSJwYW5lbC10aXRsZSI+DQogICAgICAgICAgICAgICAgPGltZyBzcmM9IlJlc291cmNlcy9JbWFnZXMvbG9hZGVyLXNtYWxsLmdpZiIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHNob3dCdXN5SW5kaWNhdG9yfSIgYWx0PSIgIiAvPg0KICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B0ZXh0OiBjb250YWluZXJUaXRsZX17QHZpc2libGU6IGNvbnRhaW5lclRpdGxlfSI+PC9zcGFuPg0KICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBjb250YWluZXJUaXRsZX0iPiZuYnNwOy0mbmJzcDs8L3NwYW4+DQogICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IHZpZXdUaXRsZX17QHZpc2libGU6IHZpZXdUaXRsZX0iPjwvc3Bhbj4NCiAgICAgICAgICAgIDwvaDI+DQogICAgICAgIDwvZGl2Pg0KDQogICAgICAgIDxkaXYgZGF0YS1iaW5kaW5nPSJ7QGRvbTogaGVhZGVySW5zZXJ0RG9tRWxlbWVudH0iPjwvZGl2Pg0KICAgIDwvZGl2Pg0KDQogICAgPGRpdiBjbGFzcz0icGFuZWwtc2Nyb2xsLWNvbnRhaW5lciIgZGF0YS1iaW5kaW5nPSJ7ZGF0YS1yZWdpb24tbmFtZTogcmVnaW9uTmFtZX17ZGF0YS1yZWdpb24tYWRhcHRlcjogcmVnaW9uVHlwZX17QHZhcjogc2Nyb2xsUmVnaW9uRWxlbWVudH17QGV2ZW50LW9uc2Nyb2xsOiBoYW5kbGVTY3JvbGxDaGFuZ2V9Ij48L2Rpdj4NCg0KICAgIDxkaXYgY2xhc3M9InBhbmVsLWZvb3RlciIgZGF0YS1iaW5kaW5nPSJ7QHZhcjogZm9vdGVyRWxlbWVudH17QHZpc2libGU6IGZvb3Rlckluc2VydERvbUVsZW1lbnR9IiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlIj4NCiAgICAgICAgPGRpdiBjbGFzcz0icGFuZWwtZm9vdGVyLWlubmVyIiBkYXRhLWJpbmRpbmc9IntAZG9tOiBmb290ZXJJbnNlcnREb21FbGVtZW50fSI+PC9kaXY+DQogICAgPC9kaXY+DQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/ViewSwitcher/ViewSwitcherView.html","html","PGRpdiBjbGFzcz0idGFiLWNvbnRhaW5lciI+DQogICAgPHVsIGNsYXNzPSJ0YWItY29udHJvbCIgZGF0YS1iaW5kaW5nPSJ7QHNvdXJjZTogdmlld0Rlc2NyaXB0b3JzfSI+DQogICAgICAgIDxsaSBkYXRhLWJpbmRpbmc9IntAdGVtcGxhdGUtZm9yOiB2aWV3RGVzY3JpcHRvcnN9e0BldmVudC1vbmNsaWNrOiBoYW5kbGVDbGlja1RhYn0iPg0KICAgICAgICAgICAgPGEgZGF0YS1iaW5kaW5nPSJ7QG5vY2xhc3MtdGFiOiBpc0FjdGl2ZX17QGNsYXNzLXRhYi1hY3RpdmU6IGlzQWN0aXZlfSI+DQogICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IHRpdGxlfXt0aXRsZTogdGl0bGV9Ij48L3NwYW4+DQogICAgICAgICAgICA8L2E+DQogICAgICAgIDwvbGk+DQogICAgPC91bD4NCjwvZGl2Pg0K");
geocortex.resourceManager.register("Framework.UI","inv","Framework.UI/geocortex/framework/ui/Selector/CSS/common.css","css","LyouZnVpLXNlbGVjdG9yLWJvZHkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoNCiAgICAuZnVpLXNlbGVjdG9yLWJvZHkuZXhwYW5kZWQgew0KICAgICAgICBkaXNwbGF5OiBibG9jazsNCiAgICB9Ki8NCg==");
geocortex.resourceManager.register("Framework.UI","inv","invariant","json","eyJsYW5ndWFnZS1mcmFtZXdvcmstdWktdmlldy1jb250YWluZXItdmlldy1jbG9zZSI6IkNsb3NlIHswfSIsImxhbmd1YWdlLWZyYW1ld29yay11aS12aWV3LWNvbnRhaW5lci12aWV3LWJhY2siOiJHbyBCYWNrIHswfSJ9");

geocortex.framework.notifyLibraryDownload("Framework.UI");
//# sourceMappingURL=framework.ui_ts_out.js.map
