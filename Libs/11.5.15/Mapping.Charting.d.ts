/// <reference path="Charting.d.ts" />
/// <reference path="Mapping.Infrastructure.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="Framework.d.ts" />
/// <reference path="Framework.UI.d.ts" />
/// <reference path="Charting.Infrastructure.d.ts" />
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     *
     */
    class ChartPaneViewModel extends geocortex.framework.ui.ViewModelBase {
        infrastructureLibraryId: string;
        title: Observable<string>;
        headerIsVisible: Observable<boolean>;
        showXButton: Observable<boolean>;
        showBusyIndicator: Observable<boolean>;
        responsiveLegendPositioning: Observable<boolean>;
        /** The chart being displayed in this pane. */
        currentChart: Observable<geocortex.charting.ChartViewModel>;
        /** Whether the pane should auto adjust the width and height to fill the available space in the parent container. */
        autoSize: Observable<boolean>;
        /** The height of the pane item. */
        height: Observable<number>;
        /** The width of the pane item. */
        width: Observable<number>;
        /**
         * Initializes a new instance of the {@link geocortex.charting.ChartPaneViewModel} class.
         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
         * @param libraryId The library Id
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config: any): void;
        /**
         * Sets the width and height of this pane.
         * @param w The width.
         * @param h The height.
         */
        setSize(w: number, h: number): void;
        /**
         * Override or attach to provide custom clean-up behaviour.
         */
        onDestroy(): void;
        protected _handleCurrentChartChanged(value: geocortex.charting.ChartViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     * This class provides a single container view designed to host a {@link Chart}
     */
    class ChartPane extends geocortex.framework.ui.ViewBase {
        protected _chartView: geocortex.charting.Chart;
        protected _isDestroyed: boolean;
        /** The ViewModel backing this view. */
        viewModel: ChartPaneViewModel;
        containerElement: HTMLElement;
        /**
         * Initializes a new instance of the {@link geocortex.charting.Chart} class.
         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
         * @param libraryId The library Id
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /**
         * Attaches a view model and performs data-binding.
         * @param viewModel The view model to attach to this view.
         */
        attach(viewModel?: any): void;
        resolveWidget(widgetId: string, context: any, binding?: geocortex.framework.ui.BindingExpression): any;
        refresh(): void;
        /**
         * Clean up the chart while destroying this view.
         */
        destroy(): void;
        displayChart(chartViewModel: geocortex.charting.ChartViewModel): void;
        /**
         * Invoked when the chart pane is closed.
         * @event
         */
        onClose(chart: geocortex.charting.ChartViewModel): void;
        handleClickClose(evt: Event, el: HTMLElement, ctx: any): void;
        private _overrideLegendPosition(chart);
    }
}
/**
 * This class has moved to {@link geocortex.charting.ChartOptions} so that other libraries may extend it.
 * The namespace is duplicated below to be backwards compatible with third party code.
 */
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    type ChartOptions = geocortex.charting.ChartOptions;
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     *
     */
    class ChartingModule extends geocortex.framework.application.ModuleBase {
        private static DEFAULT_HIGHLIGHT_LAYER_NAME;
        private static DEFAULT_FILL_COLOR;
        private static DEFAULT_BORDER_COLOR;
        private infrastructureLibraryId;
        private _behavior;
        private _savedBorderColor;
        private _savedFillColor;
        private _lookupTable;
        /**
         * The chart view model factory.
         */
        chartFactory: geocortex.charting.ChartViewModelFactory;
        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(config: any): void;
        /**
         * Creates and registers the ChartViewModelFactory instance
         */
        initializeChartFactory(): void;
        /**
         * Performs some operation when the viewer finishes loading all the libraries, or
         * immediately if the libraries have already been loaded.
         * @param callback The callback function to execute.
         * @param userState An object containing state information for this asynchronous operation.
         */
        doWhenLibrariesDownloaded<T>(callback: (state?: T) => void, userState?: T): void;
        private _registerCommands();
        private _subscribeToEvents();
        /**
         * Executes a command to register a chart data adapter if not already registered.
         * @param adapter The chart data provider
         */
        private _executeRegisterAdapter(args);
        /**
         * ClearChartHighlights command implementation
         */
        private _executeClearChartHighlights();
        private _canExecuteClearChartHighlights();
        /**
         * HighlightChartFeatureSet command implementation
         * @param parameter The feature set or chart point to operate on. Unofficially takes a ChartPointEventArgs for compatability with Behaviors.
         */
        private _executeHighlightChartFeatureSet(parameter);
        private _canExecuteHighlightChartFeatureSet(parameter);
        private _convertParameterToFeatureSet(parameter);
        /**
         * RunChartFeatureActions command implementation
         * @param featureSet The feature set to operate on. Unofficially takes a ChartPointEventArgs for compatability with Behaviors.
         */
        private _executeRunChartFeatureActions(parameter);
        private _isValidFeatureSet(parameter);
        /**
         * Handler for ChartPointMouseHoverBeginEvent
         */
        private _chartPointMouseHoverBeginEventHandler(args);
        private _loadAdapters(adapters);
        private _loadAdapter(entry);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     *
     */
    class ChartingViewModel extends geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel {
        /** Stores event subscription tokens so we can unsubscribe later */
        private _handles;
        /** Chart-specific configuration */
        private _chartConfig;
        /** The chart view model factory */
        private _chartFactory;
        /**
         * Set to true to enable charts for search results; otherwise, set to false.
         * The default is true.
         */
        enabled: boolean;
        /**
         * The featureset collection we are showing charts for.
         */
        featureSetCollection: Observable<infrastructure.FeatureSetCollection>;
        /**
         * The collection of available charts (ordered by the user in Manager).
         */
        charts: ObservableCollection<geocortex.charting.ChartViewModel>;
        /**
         * The collection of charts to display by default whenever the charting view is activated.
         */
        defaultCharts: ObservableCollection<geocortex.charting.ChartViewModel>;
        /**
         * The collection of charts currently being displayed in the charting view.
         */
        displayedCharts: ObservableCollection<geocortex.charting.ChartViewModel>;
        /**
         * Whether the charting view is expanded (active).
         */
        expanded: Observable<boolean>;
        infrastructureLibraryId: string;
        headerIsVisible: Observable<boolean>;
        showXButton: Observable<boolean>;
        isGenerated: Observable<boolean>;
        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId?: string);
        initialize(config: any): void;
        refresh(): void;
        /**
         * Lazy-load the chart view model factory.
         */
        getChartFactory(): geocortex.charting.ChartViewModelFactory;
        /**
         * Performs some operation when the chart data has finished generating, or immediately if the
         * data has already been generated.
         * @param callback The callback function to execute when the chart data is generated.
         */
        doWhenChartGenerationCompleted(callback: (viewModel: ChartingViewModel) => void): void;
        applyChartOptions(chart: geocortex.charting.ChartViewModel): void;
        findChartById(chartId: string): geocortex.charting.ChartViewModel;
        findDisplayedChartById(chartId: string): geocortex.charting.ChartViewModel;
        /**
         * Creates a chart view model.
         * @param config The chart configuration.
         */
        createChart(config: geocortex.essentials.LayerChart): geocortex.charting.ChartViewModel;
        /**
         * Returns a delegate function that gets called to load data points into a chart.
         * Defers loading chart points in memory until absolutely necessary (e.g. when a chart is added to the UI)
         * @param chart The chart.
         * @param featureSet The data source (a Geocortex FeatureSet).
         */
        chartPointCollectionLoadDelegate(chart: geocortex.charting.ChartViewModel, featureSet: infrastructure.FeatureSet): () => geocortex.charting.ChartPointCollection;
        /**
         * Responsible for rebuilding the chart point collection, which is used as the data for rendering charts.
         * This method is called when the collection of interest changes.
         */
        initializeCharts(featureSet: geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureSet): void;
        /**
         * Remove charts if the corresponding layer is no longer visible and the chart is not currently being displayed.
         */
        cleanup(): void;
        /**
         * Triggers a data update for the charts displayed in the UI.
         */
        updateDisplayedCharts(): void;
        private _registerCommands();
        private _subscribeEvents();
        /**
         * Update the charts when the observable featureset collection is set.
         * <code>
         *     this.featureSetCollection.set(...)
         * </code>
         */
        private _handleCollectionChanged(fsc);
        /**
         * Update the charts when the featureset collection changes (e.g. new feature sets are added to the collection)
         * <code>
         *     this.featureSetCollection.get().featureSets.add/remove/clear(...)
         * </code>
         */
        private _fsmCollectionChangedEventHandler(args);
        /**
         * Update the charts when a feature set belonging to the active FSC changes.
         * <code>
         *     this.featureSetCollection.get().featureSets[i].features.add/remove/clear(...)
         * </code>
         */
        private _featureSetChanged(fscId, args);
        /** Cleanup when the FSC is removed from the FeatureSetManager */
        private _fsmCollectionRemovedEventHandler(args);
        /**
         * Creates and displays HTML5 charts for the feature set collection specified.
         */
        private _executeChangeCollectionOfInterest(fscId);
        private _createCharts(layer, exclusionList?);
        /** Generates point data for each chart configured on the layer */
        private _buildChartPointCollections(fs);
        private _connectAppEvent(eventName, handler);
        private _disconnectAppEvents();
        /**
         * Only connects for handles that don't already exist.
         */
        private _connectFeatureSetChanges(fsc);
        /**
         * Disconnect listeners for feature sets.
         * @param fsc if specified, handlers will *not* be disconnected for feature sets contained within
         */
        private _disconnectFeatureSetChanges(fsc?);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     *
     */
    class ChartingView extends geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView {
        viewModel: ChartingViewModel;
        selector: framework.ui.Selector.SelectorViewModel<geocortex.charting.ChartViewModel>;
        containerElement: HTMLElement;
        headerElement: HTMLElement;
        scrollRegionElement: HTMLElement;
        protected _panes: ChartPane[];
        protected _activePanes: ChartPane[];
        protected _selectorView: framework.ui.ViewBase;
        protected _delayedResizeHandle: framework.utils.TimeDelayedAction;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        private _registerCommandsAndEvents();
        private _enableOrDisableShowChartingView(args);
        resize(): void;
        /**
         * Called when the view has been activated.
         */
        activated(): void;
        /**
         * Called when the view has been deactivated.
         */
        deactivated(): void;
        /**
         * Override this method to resolve widgets by ID and context. Return a {@geocortex.framework.config.WidgetConfig}, or null.
         */
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
        /**
         * Adds the default chart(s) to the layout.
         * Only runs if no other charts are currently shown in the container view.
         */
        addDefaultCharts(): void;
        /**
         * Adds a chart with the specified Id to the layout by creating a new pane and loading the specified chart.
         * @param chartId The Id of the chart to add.
         */
        addChartById(chartId: string): void;
        /**
         * Adds a chart to the layout by creating a new chart pane and loading the specified chart.
         * @param chart The chart to be added to the layout.
         */
        addChart(chart: geocortex.charting.ChartViewModel): charting.ChartPane;
        canAddChart(chart: geocortex.charting.ChartViewModel): boolean;
        /**
         * Removes a chart with the specified Id from the layout.
         * @param chartId The Id of the chart to remove.
         */
        destroyChartById(chartId: string): void;
        /**
         * Removes a chart from the layout.
         * @param chart The chart to remove from the layout.
         */
        destroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        canDestroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        /**
         * Removes all charts from the charting container view.
         */
        clearCharts(): void;
        handleSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleUnSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleClickClose(evt: Event, el: HTMLElement, ctx: any): void;
        /**
         * Handles a chart pane being hosted within the region this container contains.
         */
        handleViewHostedEvent(args: framework.ui.RegionViewHostingEventArgs): void;
        /**
         * Handles a chart pane being unhosted from the region this container contains.
         */
        handleViewUnhostedEvent(args: framework.ui.RegionViewHostingEventArgs): void;
        /**
         * Handles a chart pane being activated.
         */
        handleViewActivatedEvent(view: framework.ui.ViewBase): void;
        /**
         * Handles a chart pane being deactivated.
         */
        handleViewDeactivatedEvent(view: framework.ui.ViewBase): void;
        handleViewDimensionsChangedEvent(args: framework.events.ViewDimensionsChangedArgs): void;
        handleApplicationResizedEvent(): void;
        protected _cancelDelayedResizeContainer(): void;
        protected _delayedResizeContainer(): framework.utils.TimeDelayedAction;
        protected _resizeContainer(force?: boolean): void;
        findChartPaneForViewModel(chart: geocortex.charting.ChartViewModel): charting.ChartPane;
        protected _hostChartInPane(chart: geocortex.charting.ChartViewModel): ChartPane;
        private _executeShowChartingView();
        private _canExecuteShowChartingView();
        private _canExecuteDisplayChartById(chartId);
        private _canExecuteRemoveChartById(chartId);
        private _canExecuteClearCharts();
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     * TODO Document
     */
    class ChartPointCollectionFeatureAggregator extends geocortex.charting.aggregation.ChartPointCollectionAggregator {
        /**
         * TODO Document
         */
        attachAttributes(item: geocortex.charting.ChartPoint, group: geocortex.charting.ChartPointGroup): void;
        private _getFeatureFromChartPoint(cp);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartUtils {
        /**
         * Finds a {@link infrastructure.DataLinkingResult} object by Id for a given {@link infrastructure.Feature}.
         */
        static findDataLinkingResultById(feature: infrastructure.Feature, dataLinkId: string): infrastructure.DataLinkingResult;
        /**
         * Gets the features contained in a single chart point.
         * @param chartPoint The chart point.
         */
        static getFeaturesFromChartPoint(chartPoint: geocortex.charting.ChartPoint): infrastructure.FeatureSet;
        /**
         * Creates a sort function delegate according to a specified key selector function.
         * This is typically used so we can have chart selection dropdowns ordered by display name.
         * @param keySelector A function to extract the key for each element.
         */
        static createCompareFunction<T, TKey>(keySelector: (element: T) => TKey): (left: T, right: T) => number;
        /**
         * Applies various configuration options to a chart.
         * @param chart The {@link geocortex.charting.ChartViewModel} instance.
         * @param options The settings to apply.
         */
        static applyChartOptions(chart: geocortex.charting.ChartViewModel, options: ChartOptions): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     * Represents an adapter class to transform external data into points of data in a Geocortex chart.
     */
    class DataLinkChartPointAdapter extends geocortex.charting.ChartPointAdapterBase {
        /**
         * TODO Document
         */
        fill(collection: geocortex.charting.ChartPointCollection, source: infrastructure.FeatureSet, options?: geocortex.charting.ChartPointAdapterOptions): void;
        /**
         * TODO Document
         */
        createChartPoint(sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): geocortex.charting.ChartPoint;
        /**
         * TODO Document
         */
        getFieldValue(fieldDefinition: geocortex.charting.configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        private _fillFromDataLink(collection, feature, dataLinkResult, options?);
        /**
         * TODO Document
         */
        attachAttributes(item: geocortex.charting.ChartPoint, sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    /**
     * Represents an adapter class to transform external data into points of data in a Geocortex chart.
     */
    class FeatureChartPointAdapter extends geocortex.charting.ChartPointAdapterBase {
        /**
         * TODO Document
         */
        fill(collection: geocortex.charting.ChartPointCollection, source: infrastructure.FeatureSet, options?: geocortex.charting.ChartPointAdapterOptions): void;
        /**
         * TODO Document
         */
        createChartPoint(sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): geocortex.charting.ChartPoint;
        /**
         * TODO Document
         */
        getFieldValue(fieldDefinition: geocortex.charting.configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        /**
         * TODO Document
         */
        attachAttributes(item: geocortex.charting.ChartPoint, sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): void;
        private _normalizeAttribute(value, dataType?);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class SingleFeatureChartView extends geocortex.framework.ui.ViewBase {
        private _chartPane;
        private _selectorView;
        viewModel: SingleFeatureChartViewModel;
        selector: framework.ui.Selector.SelectorViewModel<geocortex.charting.ChartViewModel>;
        containerElement: HTMLElement;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /**
         * Attaches a view model and performs data-binding.
         */
        attach(viewModel?: SingleFeatureChartViewModel): void;
        activated(): void;
        /**
         * Override this method to resolve widgets by ID and context. Return a {@geocortex.framework.config.WidgetConfig}, or null.
         */
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
        protected _hostChartInPane(chart: geocortex.charting.ChartViewModel): ChartPane;
        handleSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleUnSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleApplicationResizedEvent(): void;
        /**
         * Adds a chart to the layout by creating a new chart pane and loading the specified chart.
         */
        addChart(chart: geocortex.charting.ChartViewModel): charting.ChartPane;
        /**
         * Removes a chart from the layout
         */
        destroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        cleanup(): void;
        private _onCurrentChartChanged(chart);
        private _onNewFeatureInitialized();
        private _refreshChartPane();
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class SingleFeatureChartViewModel extends infrastructure.featureDetails.FeatureProviderBase {
        /** The chart view model factory */
        private _chartFactory;
        /** Chart-specific configuration. Single feature charts are non-interactive */
        private _chartConfig;
        private _syncToken;
        private _syncSource;
        /**
         * The collection of available charts (ordered by the user in Manager).
         */
        charts: ObservableCollection<geocortex.charting.ChartViewModel>;
        /**
         * The chart being displayed.
         */
        currentChart: Observable<geocortex.charting.ChartViewModel>;
        /**
         * Invoked when charts for a new feature have been initialized and are ready to display
         */
        onNewFeatureInitialized(): void;
        infrastructureLibraryId: string;
        containerRegionName: Observable<string>;
        constructor(app: framework.application.Application, libraryId?: string);
        /**
         * Lazy-load the chart view model factory.
         */
        getChartFactory(): geocortex.charting.ChartViewModelFactory;
        initialize(config: any): void;
        /**
         * This is called when the current feature changes, so that we might update our displays. This will likely change when
         * a new result is selected from one of the result views.
         * @param feature A Geocortex Feature that we are displaying.
         */
        handleCurrentFeatureChanged(feature: infrastructure.Feature): void;
        applyChartOptions(chart: geocortex.charting.ChartViewModel): void;
        /**
         * Triggers a data update for the charts displayed in the UI.
         */
        updateDisplayedCharts(): void;
        /**
         * Returns a delegate function that gets called to load data points into a chart.
         * Defers loading chart points in memory until absolutely necessary (e.g. when a chart is added to the UI)
         * @param chart The chart.
         * @param feature The data source (a Geocortex Feature).
         */
        chartPointCollectionLoadDelegate(chart: geocortex.charting.ChartViewModel, feature: infrastructure.Feature): () => geocortex.charting.ChartPointCollection;
        /**
         * Generates point data for each chart configured on the layer
         */
        buildChartPointCollections(feature: infrastructure.Feature): void;
        protected _handleDataLinksChanged(args: geocortex.framework.events.CollectionChangedArgs): void;
    }
}
