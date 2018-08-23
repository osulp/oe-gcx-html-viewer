function shim(a,b,c){"string"==typeof a&&(c=b,b=a);if(typeof c === "undefined"){console.warn("Undefined shim for: " + b);return;}for(var d=b.split("."),e=null,f=window,g=0,h=d.length;g<h;g++)e=d[g],g==h-1?f[e]=c:f[e]||(f[e]={}),f=f[e]}
define(["geocortex/framework-ui/FilterableCollection", "geocortex/framework-ui/LazyObservable", "geocortex/framework-ui/ObservableCollectionAggregator", "geocortex/framework-ui/OrderedCollection", "geocortex/framework-ui/PresentableCollection", "geocortex/framework-ui/StringLocalizer", "geocortex/framework-ui/animation/Animation", "geocortex/framework-ui/animation/AnimationFactory", "geocortex/framework-ui/animation/AnimationKeyframe", "geocortex/framework-ui/animation/AnimationProviderBase", "geocortex/framework-ui/animation/AnimationSequence", "geocortex/framework-ui/animation/AnimationState", "geocortex/framework-ui/MultiRegion/MultiRegionView", "geocortex/framework-ui/MultiRegion/MultiRegionViewModel", "geocortex/framework-ui/MultiRegion/RegionDescriptor", "geocortex/framework-ui/Selector/SelectorItemViewModel", "geocortex/framework-ui/Selector/SelectorView", "geocortex/framework-ui/Selector/SelectorViewModel", "geocortex/framework-ui/SplashScreen/SplashScreenView", "geocortex/framework-ui/utils/UiUtils", "geocortex/framework-ui/ViewContainer/ButtonTabStripView", "geocortex/framework-ui/ViewContainer/ViewContainerView", "geocortex/framework-ui/ViewContainer/ViewContainerViewClosedEventArgs", "geocortex/framework-ui/ViewContainer/ViewContainerViewModel", "geocortex/framework-ui/ViewContainer/ViewDescriptor", "geocortex/framework-ui/ViewSwitcher/ViewSwitcherView", "geocortex/framework-ui/ViewSwitcher/ViewSwitcherViewDescriptor", "geocortex/framework-ui/ViewSwitcher/ViewSwitcherViewModel", "geocortex/framework-ui/animation/providers/CssTransitionAnimationProvider"], function (FilterableCollection_ts_0, LazyObservable_ts_1, ObservableCollectionAggregator_ts_2, OrderedCollection_ts_3, PresentableCollection_ts_4, StringLocalizer_ts_5, Animation_ts_6, AnimationFactory_ts_7, AnimationKeyframe_ts_8, AnimationProviderBase_ts_9, AnimationSequence_ts_10, AnimationState_ts_11, MultiRegionView_ts_12, MultiRegionViewModel_ts_13, RegionDescriptor_ts_14, SelectorItemViewModel_ts_15, SelectorView_ts_16, SelectorViewModel_ts_17, SplashScreenView_ts_18, UiUtils_ts_19, ButtonTabStripView_ts_20, ViewContainerView_ts_21, ViewContainerViewClosedEventArgs_ts_22, ViewContainerViewModel_ts_23, ViewDescriptor_ts_24, ViewSwitcherView_ts_25, ViewSwitcherViewDescriptor_ts_26, ViewSwitcherViewModel_ts_27, CssTransitionAnimationProvider_ts_28) {
    shim("geocortex.framework.ui.FilterableCollection", FilterableCollection_ts_0.FilterableCollection);
    shim("geocortex.framework.ui.LazyObservable", LazyObservable_ts_1.LazyObservable);
    shim("geocortex.framework.ui.ObservableCollectionAggregator", ObservableCollectionAggregator_ts_2.ObservableCollectionAggregator);
    shim("geocortex.framework.ui.OrderedCollection", OrderedCollection_ts_3.OrderedCollection);
    shim("geocortex.framework.ui.PresentableCollectionPageShortcut", PresentableCollection_ts_4.PresentableCollectionPageShortcut);
    shim("geocortex.framework.ui.PresentableCollection", PresentableCollection_ts_4.PresentableCollection);
    shim("geocortex.framework.ui.stringLocalizer.localizeObservables", StringLocalizer_ts_5.localizeObservables);
    shim("geocortex.framework.ui.stringLocalizer.localizeString", StringLocalizer_ts_5.localizeString);
    shim("geocortex.framework.ui.animation.MAX_OPS_PER_FRAME", Animation_ts_6.MAX_OPS_PER_FRAME);
    shim("geocortex.framework.ui.animation.getDefault", Animation_ts_6.getDefault);
    shim("geocortex.framework.ui.animation.create", Animation_ts_6.create);
    shim("geocortex.framework.ui.animation.create", Animation_ts_6.create);
    shim("geocortex.framework.ui.animation.play", Animation_ts_6.play);
    shim("geocortex.framework.ui.animation.play", Animation_ts_6.play);
    shim("geocortex.framework.ui.animation.scheduleForAnimationFrame", Animation_ts_6.scheduleForAnimationFrame);
    shim("geocortex.framework.ui.animation.AnimationFactory", AnimationFactory_ts_7.AnimationFactory);
    shim("geocortex.framework.ui.animation.reservedKeyframeProperties", AnimationKeyframe_ts_8.reservedKeyframeProperties);
    shim("geocortex.framework.ui.animation.AnimationProviderBase", AnimationProviderBase_ts_9.AnimationProviderBase);
    shim("geocortex.framework.ui.animation._activeAnimations", AnimationSequence_ts_10._activeAnimations);
    shim("geocortex.framework.ui.animation.isAnimating", AnimationSequence_ts_10.isAnimating);
    shim("geocortex.framework.ui.animation.checkAndRunIdle", AnimationSequence_ts_10.checkAndRunIdle);
    shim("geocortex.framework.ui.animation.runWhenIdle", AnimationSequence_ts_10.runWhenIdle);
    shim("geocortex.framework.ui.animation.AnimationSequence", AnimationSequence_ts_10.AnimationSequence);
    shim("geocortex.framework.ui.animation.AnimationState", AnimationState_ts_11.AnimationState);
    shim("geocortex.framework.ui.MultiRegion.MultiRegionView", MultiRegionView_ts_12.MultiRegionView);
    shim("geocortex.framework.ui.MultiRegion.MultiRegionViewModel", MultiRegionViewModel_ts_13.MultiRegionViewModel);
    shim("geocortex.framework.ui.MultiRegion.RegionDescriptor", RegionDescriptor_ts_14.RegionDescriptor);
    shim("geocortex.framework.ui.Selector.SelectorItemViewModel", SelectorItemViewModel_ts_15.SelectorItemViewModel);
    shim("geocortex.framework.ui.Selector.SelectorView", SelectorView_ts_16.SelectorView);
    shim("geocortex.framework.ui.Selector.SelectorViewModel", SelectorViewModel_ts_17.SelectorViewModel);
    shim("geocortex.framework.ui.SplashScreen.SplashScreenView", SplashScreenView_ts_18.SplashScreenView);
    shim("geocortex.framework.ui.utils.detectBrowserPrefix", UiUtils_ts_19.detectBrowserPrefix);
    shim("geocortex.framework.ui.utils.tapToDismissThis", UiUtils_ts_19.tapToDismissThis);
    shim("geocortex.framework.ui.ViewContainer.ButtonTabStripView", ButtonTabStripView_ts_20.ButtonTabStripView);
    shim("geocortex.framework.ui.ViewContainer.ViewContainerView", ViewContainerView_ts_21.ViewContainerView);
    shim("geocortex.framework.ui.ViewContainer.ViewContainerViewClosedEventArgs", ViewContainerViewClosedEventArgs_ts_22.ViewContainerViewClosedEventArgs);
    shim("geocortex.framework.ui.ViewContainer.ViewContainerViewModel", ViewContainerViewModel_ts_23.ViewContainerViewModel);
    shim("geocortex.framework.ui.ViewContainer.ViewDescriptor", ViewDescriptor_ts_24.ViewDescriptor);
    shim("geocortex.framework.ui.ViewSwitcher.ViewSwitcherView", ViewSwitcherView_ts_25.ViewSwitcherView);
    shim("geocortex.framework.ui.ViewSwitcher.ViewSwitcherViewDescriptor", ViewSwitcherViewDescriptor_ts_26.ViewSwitcherViewDescriptor);
    shim("geocortex.framework.ui.ViewSwitcher.ViewSwitcherViewModel", ViewSwitcherViewModel_ts_27.ViewSwitcherViewModel);
    shim("geocortex.framework.ui.animation.CssTransitionAnimationProvider", CssTransitionAnimationProvider_ts_28.CssTransitionAnimationProvider);
});


