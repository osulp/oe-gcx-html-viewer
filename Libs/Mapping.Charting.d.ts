/// <reference path="Charting.d.ts" />
/// <reference path="Mapping.Infrastructure.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="Framework.d.ts" />
/// <reference path="Framework.UI.d.ts" />
/// <reference path="Charting.Infrastructure.d.ts" />
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    interface ApplyChartingStateArgs {
        state: ChartingState;
        stateAppliedPromises: Promise<void>[];
    }
    class ChartingModule extends geocortex.framework.application.ModuleBase {
        private static CHART_HIGHLIGHT_LAYER_NAME;
        private static DEFAULT_FILL_COLOR;
        private static DEFAULT_BORDER_COLOR;
        private infrastructureLibraryId;
        private _behavior;
        private _savedBorderColor;
        private _savedFillColor;
        private _lookupTable;
        chartFactory: geocortex.charting.ChartViewModelFactory;
        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(config: any): void;
        getStateFilter(): any;
        exportState(): Promise<ChartingState>;
        applyState(state: ChartingState): Promise<void>;
        initializeChartFactory(): void;
        doWhenLibrariesDownloaded<T>(callback: (state?: T) => void, userState?: T): void;
        private _registerCommands();
        private _subscribeToEvents();
        private _executeRegisterAdapter(args);
        private _executeClearChartHighlights();
        private _canExecuteClearChartHighlights();
        private _executeHighlightChartFeatureSet(parameter);
        private _canExecuteHighlightChartFeatureSet(parameter);
        private _convertParameterToFeatureSet(parameter);
        private _executeRunChartFeatureActions(parameter);
        private _isValidFeatureSet(parameter);
        private _chartPointMouseHoverBeginEventHandler(args);
        private _loadAdapters(adapters);
        private _loadAdapter(entry);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    interface ChartingState extends infrastructure.project.ModuleState {
        results: mapping.infrastructure.project.FeatureSetCollection;
        displayedCharts: string[];
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartingViewModel extends geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel {
        private _handles;
        private _chartConfig;
        private _chartFactory;
        enabled: boolean;
        featureSetCollection: Observable<infrastructure.FeatureSetCollection>;
        charts: ObservableCollection<geocortex.charting.ChartViewModel>;
        defaultCharts: ObservableCollection<geocortex.charting.ChartViewModel>;
        displayedCharts: ObservableCollection<geocortex.charting.ChartViewModel>;
        expanded: Observable<boolean>;
        infrastructureLibraryId: string;
        headerIsVisible: Observable<boolean>;
        showXButton: Observable<boolean>;
        isGenerated: Observable<boolean>;
        app: geocortex.essentialsHtmlViewer.ViewerApplication;
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId?: string);
        initialize(config: any): void;
        refresh(): void;
        getChartFactory(): geocortex.charting.ChartViewModelFactory;
        doWhenChartGenerationCompleted(callback: (viewModel: ChartingViewModel) => void): void;
        applyChartOptions(chart: geocortex.charting.ChartViewModel): void;
        findChartById(chartId: string): geocortex.charting.ChartViewModel;
        findDisplayedChartById(chartId: string): geocortex.charting.ChartViewModel;
        createChart(config: geocortex.essentials.LayerChart): geocortex.charting.ChartViewModel;
        chartPointCollectionLoadDelegate(chart: geocortex.charting.ChartViewModel, featureSet: infrastructure.FeatureSet): () => geocortex.charting.ChartPointCollection;
        initializeCharts(featureSet: geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureSet): void;
        cleanup(): void;
        updateDisplayedCharts(): void;
        private _registerCommands();
        private _subscribeEvents();
        private _handleCollectionChanged(fsc);
        private _fsmCollectionChangedEventHandler(args);
        private _featureSetChanged(fscId, args);
        private _fsmCollectionRemovedEventHandler(args);
        private _executeChangeCollectionOfInterest(fscId);
        private _createCharts(layer, exclusionList?);
        private _buildChartPointCollections(fs);
        private _connectAppEvent(eventName, handler);
        private _disconnectAppEvents();
        private _connectFeatureSetChanges(fsc);
        private _disconnectFeatureSetChanges(fsc?);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartPaneViewModel extends geocortex.framework.ui.ViewModelBase {
        infrastructureLibraryId: string;
        title: Observable<string>;
        headerIsVisible: Observable<boolean>;
        showXButton: Observable<boolean>;
        showBusyIndicator: Observable<boolean>;
        responsiveLegendPositioning: Observable<boolean>;
        currentChart: Observable<geocortex.charting.ChartViewModel>;
        autoSize: Observable<boolean>;
        height: Observable<number>;
        width: Observable<number>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config: any): void;
        setSize(w: number, h: number): void;
        onDestroy(): void;
        protected _handleCurrentChartChanged(value: geocortex.charting.ChartViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartPane extends geocortex.framework.ui.ViewBase {
        protected _chartView: geocortex.charting.Chart;
        protected _isDestroyed: boolean;
        viewModel: ChartPaneViewModel;
        containerElement: HTMLElement;
        constructor(app: framework.application.Application, libraryId?: string);
        attach(viewModel?: any): void;
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
        refresh(): void;
        destroy(): void;
        displayChart(chartViewModel: geocortex.charting.ChartViewModel): void;
        onClose(chart: geocortex.charting.ChartViewModel): void;
        handleClickClose(evt: Event, el: HTMLElement, ctx: any): void;
        private _overrideLegendPosition(chart);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
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
        activated(): void;
        deactivated(): void;
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
        addDefaultCharts(): void;
        addChartById(chartId: string): void;
        addChart(chart: geocortex.charting.ChartViewModel): charting.ChartPane;
        canAddChart(chart: geocortex.charting.ChartViewModel): boolean;
        destroyChartById(chartId: string): void;
        destroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        canDestroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        clearCharts(): void;
        handleSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleUnSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleClickClose(evt: Event, el: HTMLElement, ctx: any): void;
        handleViewHostedEvent(args: framework.ui.RegionViewHostingEventArgs): void;
        handleViewUnhostedEvent(args: framework.ui.RegionViewHostingEventArgs): void;
        handleViewActivatedEvent(view: framework.ui.ViewBase): void;
        handleViewDeactivatedEvent(view: framework.ui.ViewBase): void;
        handleViewDimensionsChangedEvent(args: framework.events.ViewDimensionsChangedArgs): void;
        handleApplicationResizedEvent(): void;
        handleViewContainerActivatedEvent(container: framework.ui.ViewBase): void;
        protected _isViewHostedInContainer(container: framework.ui.ViewBase): boolean;
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
        protected _exportState(state: ChartingState): void;
        protected _applyState(args: ApplyChartingStateArgs): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    type ChartOptions = geocortex.charting.ChartOptions;
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartPointCollectionFeatureAggregator extends geocortex.charting.aggregation.ChartPointCollectionAggregator {
        attachAttributes(item: geocortex.charting.ChartPoint, group: geocortex.charting.ChartPointGroup): void;
        private _getFeatureFromChartPoint(cp);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class ChartUtils {
        static findDataLinkingResultById(feature: infrastructure.Feature, dataLinkId: string): infrastructure.DataLinkingResult;
        static getFeaturesFromChartPoint(chartPoint: geocortex.charting.ChartPoint): infrastructure.FeatureSet;
        static createCompareFunction<T, TKey>(keySelector: (element: T) => TKey): (left: T, right: T) => number;
        static applyChartOptions(chart: geocortex.charting.ChartViewModel, options: ChartOptions): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class DataLinkChartPointAdapter extends geocortex.charting.ChartPointAdapterBase {
        fill(collection: geocortex.charting.ChartPointCollection, source: infrastructure.FeatureSet, options?: geocortex.charting.ChartPointAdapterOptions): void;
        createChartPoint(sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): geocortex.charting.ChartPoint;
        getFieldValue(fieldDefinition: geocortex.charting.configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        private _fillFromDataLink(collection, feature, dataLinkResult, options?);
        attachAttributes(item: geocortex.charting.ChartPoint, sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class FeatureChartPointAdapter extends geocortex.charting.ChartPointAdapterBase {
        fill(collection: geocortex.charting.ChartPointCollection, source: infrastructure.FeatureSet, options?: geocortex.charting.ChartPointAdapterOptions): void;
        createChartPoint(sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): geocortex.charting.ChartPoint;
        getFieldValue(fieldDefinition: geocortex.charting.configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        attachAttributes(item: geocortex.charting.ChartPoint, sourceItem: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): void;
        private _normalizeAttribute(value, dataType?);
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class FormatProvider implements geocortex.charting.globalization.FormatProviderInterface {
        private _kendoFormatProvider;
        toString(value: Date, format: string, timeZoneId?: string, displayTimeZoneId?: string): string;
        toString(value: number, format: string, timeZoneId?: string, displayTimeZoneId?: string): string;
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
        attach(viewModel?: SingleFeatureChartViewModel): void;
        activated(): void;
        resolveWidget(widgetId: string, context: any, binding?: framework.ui.BindingExpression): any;
        protected _hostChartInPane(chart: geocortex.charting.ChartViewModel): ChartPane;
        handleSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleUnSelectChart(chart: geocortex.charting.ChartViewModel): void;
        handleApplicationResizedEvent(): void;
        addChart(chart: geocortex.charting.ChartViewModel): charting.ChartPane;
        destroyChart(chart: geocortex.charting.ChartViewModel): boolean;
        cleanup(): void;
        private _onCurrentChartChanged(chart);
        private _onNewFeatureInitialized();
        private _refreshChartPane();
    }
}
declare module geocortex.essentialsHtmlViewer.mapping.modules.charting {
    class SingleFeatureChartViewModel extends infrastructure.featureDetails.FeatureProviderBase {
        private _chartFactory;
        private _chartConfig;
        private _syncToken;
        private _syncSource;
        charts: ObservableCollection<geocortex.charting.ChartViewModel>;
        currentChart: Observable<geocortex.charting.ChartViewModel>;
        onNewFeatureInitialized(): void;
        infrastructureLibraryId: string;
        containerRegionName: Observable<string>;
        constructor(app: framework.application.Application, libraryId?: string);
        getChartFactory(): geocortex.charting.ChartViewModelFactory;
        initialize(config: any): void;
        handleCurrentFeatureChanged(feature: infrastructure.Feature): void;
        applyChartOptions(chart: geocortex.charting.ChartViewModel): void;
        updateDisplayedCharts(): void;
        chartPointCollectionLoadDelegate(chart: geocortex.charting.ChartViewModel, feature: infrastructure.Feature): () => geocortex.charting.ChartPointCollection;
        buildChartPointCollections(feature: infrastructure.Feature): void;
        protected _handleDataLinksChanged(args: geocortex.framework.events.CollectionChangedArgs): void;
    }
}
