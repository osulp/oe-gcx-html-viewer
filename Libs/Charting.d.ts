/// <reference path="Framework.d.ts" />
/// <reference path="Charting.Infrastructure.d.ts" />
/// <reference path="kendo.dataviz.d.ts" />
/// <reference path="Framework.UI.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="dojo.d.ts" />
declare module geocortex.charting {
    class SeriesViewModel extends geocortex.framework.ui.ViewModelBase implements SeriesViewModelInterface {
        /**
         * The series definition
         */
        seriesDefinition: configuration.ChartSeriesDefinition;
        /**
         * The chart definition
         */
        chartDefinition: configuration.ChartDefinition;
        /**
         * Whether or not this series is an internal series - i.e. the series is a sub series.
         * For instance if you have a series that takes a DateTime and breaks it into days of the week,
         * you will actually have a separate series for each day internally, but you want them to appear
         * as one contiguous series.
         */
        isSeriesInternal: boolean;
        /**
         * A distinctive color for the series. This differs from the the {@link ChartSeriesDefinition} color
         * if the source is a multi-value field.
         */
        distinctColor: Color;
        /**
         * A reference to the original {@link ChartPointCollection}.
         */
        sourceCollection: ChartPointCollection;
        /**
         * The {@link ChartPointCollection} that holds the items related to the series.
         */
        items: ChartPointCollection;
        /**
         * Initializes a new instance of the {@link geocortex.charting.infrastructure.SeriesViewModel} class.
         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
         * @param libraryId The library Id
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /**
         * Override or attach to provide custom clean-up behaviour.
         */
        onDestroy(): void;
    }
}
declare module geocortex.charting {
    /**
     * Provides an abstracted view model for a charting view.
     */
    class ChartViewModel extends geocortex.framework.ui.ViewModelBase implements ChartViewModelInterface {
        /** If set to true the chart will play animations when displaying the series. By default animations are enabled. */
        animations: Observable<boolean>;
        /** Whether the chart should auto adjust the width and height to fill the available space in the parent container. */
        autoSize: Observable<boolean>;
        /** The chart definition. */
        chartDefinition: configuration.ChartDefinition;
        /** Textual description of the chart. */
        chartDescription: Observable<string>;
        /** The chart feature type (e.g. Multi-Feature, Single Feature). */
        chartFeatureType: ChartFeatureType;
        /** The chart ID. */
        chartId: Observable<string>;
        /** The collection of chart points to plot for this chart. */
        chartPointCollection: framework.ui.LazyObservable<ChartPointCollection>;
        /** Whether this is the default chart to display in a client application. */
        defaultChart: Observable<boolean>;
        /** The chart display name. */
        displayName: Observable<string>;
        /** Whether to apply a gradient overlay to chart series. */
        gradients: Observable<boolean>;
        /** The height of the chart area. */
        height: Observable<number>;
        /** Whether or not to enable clicking on chart components (e.g. bars, pie slices, etc) */
        interactiveChart: Observable<boolean>;
        /**
         * Whether legend items should be interactive or not.
         * When enabled, clicking legend items of pie charts will enable or disable slices of the pie,
         * and clicking legend items of linear charts will toggle the display of corresponding series.
         */
        interactiveLegend: Observable<boolean>;
        /** The position of the chart legend. */
        legendPosition: Observable<ChartLegendPosition>;
        /** The angle at which to start pie charts in degrees. Negative values are acceptable. The default is 180. */
        pieStartAngle: Observable<number>;
        /**
         * Sets the preferred chart rendering engine. If it is not supported by the browser,
         * the chart will switch to the first available mode.
         * Supported values:
         *   * `svg`: renders the chart as inline SVG document, if SVG support is available.
         *   * `"vml"`: renders the chart as VML, if available (e.g. older version of IE).
         *   * `"canvas"`: renders the chart in a `canvas` element, if support for `canvas` is available.
         */
        renderAs: Observable<string>;
        /** The collection of series view models for this chart. */
        seriesViewModels: ObservableCollection<SeriesViewModel>;
        /**
         * An object that contains data about this {@link ChartViewModel}. The default is null.
         * A common use for the tag property is to store data that is closely associated with the {@link ChartViewModel}.
         */
        tag: any;
        /** Whether the chart is currently visible or not. */
        visible: Observable<boolean>;
        /** The width of the chart area. */
        width: Observable<number>;
        /**
         * Initializes a new instance of the {@link ChartViewModel} class.
         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
         * @param libraryId The library Id
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /** @inherited */
        initialize(config: any): void;
        /**
         * Applies various configuration options to a chart. Changes are cumulative.
         * @param options The settings to apply.
         */
        setOptions(options: ChartOptions): void;
        /**
         * Sets the width and height of the chart.
         * @param w The width.
         * @param h The height.
         */
        setSize(w: number, h: number): void;
        /** Updates the `autoSize` property whenever `width` or `height` are changed. */
        protected _handleSizeChanged(): void;
        /** Rebuilds the chart series data whenever the backing chart point collection is changed. */
        protected _chartPointCollectionChanged(newValue: ChartPointCollection): void;
        /**
         * Performs tasks associated with freeing, releasing, or resetting resources held by this object.
         */
        destroyChartPoints(): void;
        /**
         * Creates and stores a set of view models for configured series', given an instance of {@link ChartPointCollection}.
         * @param collection The collection of chart points to process.
         */
        createSeriesViewModels(collection: ChartPointCollection): void;
        /**
         * Updates the textual description of the chart.
         */
        updateChartDescription(): void;
        /**
         * This method generates a tuple which is used as a key when sorting relevant instances of {@link SeriesViewModel}.
         * This method ensures that series' data is in the correct order.
         * @param seriesViewModel The {@link SeriesViewModel} for which to fetch the priority for.
         */
        protected _getSeriesViewModelPriority(seriesViewModel: SeriesViewModel, order: number): geocortex.framework.utils.Tuple;
        /**
         * Sets a distinct color for each series, based on the configured color and the number of related series
         * (e.g. a bar chart with days of the week will apply a different color gradient to every day series)
         * @param seriesCollection The collection of series view models to apply color selection to.
         */
        protected _applyDistinctColorsToSeries(seriesCollection: SeriesViewModel[]): void;
        /**
         * Fills series with blank items if there is data missing (e.g. if sorted by day of the week, adds a blank object
         * for each missing day in a series). Also sorts them by Category before returning.
         */
        protected _checkAndFillSeriesViewModels(series: SeriesViewModel[], collection: ChartPointCollection): void;
        /**
         * Mark internal series (e.g. if you have a series that takes a datetime and breaks it into day of the week
         * you will actually have a separate series for each day internally, but you want them to appear as one contiguous series.
         */
        protected _tagInternalSeries(series: SeriesViewModel[]): void;
    }
}
declare module geocortex.charting.extensions.telerik {
    function setProperty(configObj: any, propName: string, value: any, includeNullValues?: boolean): void;
    function axisMinimumValue(config: configuration.ChartAxisDefinition): number;
    function axisMaximumValue(config: configuration.ChartAxisDefinition): number;
}
declare module kendo.internals {
    /** Private Kendo classes and APIs **/
    interface Box2D {
        x1?: number;
        x2?: number;
        y1?: number;
        y2?: number;
        width?: () => number;
        height?: () => number;
    }
    interface ChartElement {
        options?: any;
    }
    interface Axis extends ChartElement {
        lineBox?: () => Box2D;
        labelsCount?: () => number;
    }
    interface PlotAreaBase extends ChartElement {
        box?: Box2D;
        axes?: any[];
    }
    interface CategoricalPlotArea extends PlotAreaBase {
        namedCategoryAxes?: {
            [name: string]: Axis;
        };
        namedValueAxes?: {
            [name: string]: Axis;
        };
        categoryAxis?: Axis;
        valueAxis?: Axis;
        axisX?: Axis;
        axisY?: Axis;
    }
    interface ChartInternals {
        _plotArea?: PlotAreaBase;
    }
    interface CategoricalChartInternals {
        _plotArea?: CategoricalPlotArea;
    }
}
declare module geocortex.charting {
    /**
     * Represents a visual chart component.
     */
    class Chart extends geocortex.framework.ui.ViewBase implements ChartInterface {
        /** The default font size and family of all charts. */
        static DEFAULT_FONT: string;
        private _syncToken;
        private _syncSource;
        private _chart;
        private _options;
        /** The DOM element that this chart works against. */
        chartDomElement: HTMLElement;
        /**
         * The ViewModel backing this view.
         */
        viewModel: ChartViewModel;
        /**
         * Initializes a new instance of the {@link geocortex.charting.infrastructure.Chart} class.
         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
         * @param libraryId The library Id
        */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        /**
         * Attaches a view model and performs data-binding.
         * @param viewModel The view model to attach to this view.
         */
        attach(viewModel?: any): void;
        /**
         * Initializes a Geocortex chart.
         */
        initialize(): void;
        /**
         * Cleans up the chart and destroys this view.
         */
        destroy(): void;
        /**
         * Updates the layout of the chart when the chart view is activated.
         */
        activated(): void;
        /**
         * Repaints the chart using the currently loaded data.
         */
        updateLayout(): void;
        /**
         * Refreshes the chart by destroying and recreating it.
         */
        refresh(): void;
        /**
         * Invoked when the user hovers over a chart point.
         * @event
         * @param args The arguments to the event.
         */
        onChartPointMouseHoverBegin(args: eventArgs.ChartPointEventArgs): void;
        /**
         * Invoked when the user stops hovering over a chart point.
         * @event
         * @param args The arguments to the event.
         */
        onChartPointMouseHoverEnd(args: eventArgs.ChartPointEventArgs): void;
        /**
         * Invoked when the user clicks a chart point.
         * @event
         * @param args The arguments to the event.
         */
        onChartPointMouseDown(args: eventArgs.ChartPointEventArgs): void;
        protected _create(domElement: HTMLElement): kendo.dataviz.ui.Chart;
        protected _getChartOptions(viewModel: ChartViewModel): kendo.dataviz.ui.ChartOptions;
        /**
         * Sets the same axis range for all series on the chart. This scale range is based on the minimum
         * and maximum values found on the existing axes.
         * @param chartOptions The chart options.
         */
        protected _applyCommonSeriesRange(chartOptions: kendo.dataviz.ui.ChartOptions): void;
        /**
         * Rearranges the axis labels on all value (vertical) axes so they don't overlap. The layout is affected by the chart size and vertical zoom level.
         * Called whenever the window size or zoom level is changed.
         * @param chart The chart instance.
         * @param chartOptions The chart options.
         */
        protected _autoScaleValueAxes(chart: kendo.dataviz.ui.Chart, chartOptions: kendo.dataviz.ui.ChartOptions): void;
        /**
         * Rearranges the axis labels on all category (horizontal) axes so they don't overlap. The layout is affected by the chart size and vertical zoom level.
         * Called whenever the window size or zoom level is changed.
         * @param chart The chart instance.
         * @param chartOptions The chart options.
         */
        protected _autoScaleCategoryAxes(chart: kendo.dataviz.ui.Chart, chartOptions: kendo.dataviz.ui.ChartOptions): void;
        /**
         * Rearranges the axis labels for a given value (vertical) axis so they don't overlap. The layout is affected by the chart size and vertical zoom level.
         * Called whenever the window size or zoom level is changed.
         * @param chart The chart instance.
         * @param chartOptions The chart options.
         * @param axisIndex The index of the axis in the axis collection. If not supplied, 0 is assumed.
         * @param axisLineLength Optional length of the axis line. If not supplied, will be estimated.
         */
        protected _autoFitValueAxisLabels(chart: kendo.dataviz.ui.Chart, chartOptions: kendo.dataviz.ui.ChartOptions, axisIndex?: number, axisLineLength?: number): void;
        /**
         * Rearranges the axis labels for a given category (horizontal) axis so they don't overlap. The layout is affected by the chart size and vertical zoom level.
         * Called whenever the window size or zoom level is changed.
         * @param chart The chart instance.
         * @param chartOptions The chart options.
         * @param axisIndex The index of the axis in the axis collection. If not supplied, 0 is assumed.
         * @param axisLineLength Optional length of the axis line. If not supplied, will be estimated.
         */
        protected _autoFitCategoryAxisLabels(chart: kendo.dataviz.ui.Chart, chartOptions: kendo.dataviz.ui.ChartOptions, axisIndex?: number, axisLineLength?: number): void;
        /**
         * Sets the label rendering interval for an axis, i.e. render every n-th label. By default every label is rendered.
         * @param axisOptions The chart axis options.
         * @param interval The label interval. By default every label is rendered.
         */
        protected _setAxisLabelInterval(axisOptions: kendo.dataviz.ui.ChartValueAxisItem, interval?: number): void;
        /**
         * Makes an educated guess of the size of an axis based on the chart plot size.
         * @param chartOptions The chart options.
         * @param vertical Whether the axis is vertical or horizontal.
         */
        protected _axisDefaultLineLength(chartOptions: kendo.dataviz.ui.ChartOptions, vertical?: boolean): number;
        private _seriesCategoryAxis(chart, axisName?);
        private _seriesValueAxis(chart, axisName?);
        private _axisLineLength(axis, chartOptions, vertical?);
        private _axisLabelsCount(axis);
        private _numericAxisLabelsCount(seriesNameOrConfig);
        private _longestString(list);
    }
}
/**
 * Houses models and services involved with producing HTML5 charts based on spatial and non-spatial data.
 */
declare module geocortex.charting {
}
/**
 * Contains aggregators used to aggregate and shape data destined for visualization in charts.
 */
declare module geocortex.charting.aggregation {
}
/**
 * Contains configuration definitions for various configured models related to HTML5 charts.
 */
declare module geocortex.charting.configuration {
}
/**
 * Contains payload data for events that result from setup and interaction with charts.
 */
declare module geocortex.charting.eventArgs {
}
/**
 * Contains vendor-specific data pertaining to extensions and overrides.
 */
declare module geocortex.charting.extensions {
}
/**
 * Contains globalization utilities and format providers in support of internationalizable charts and charting data.
 */
declare module geocortex.charting.globalization {
}
declare module geocortex.charting {
    /**
     * The {@link ChartSeriesProvider} serves as a bridge between a {@link ChartPointCollectin} and a data source for retrieving data.
     * {@link ChartSeriesProvider} transforms external data into points of data that can be plotted in a Geocortex chart.
     */
    class ChartSeriesProvider extends geocortex.framework.FrameworkObject implements ChartSeriesProviderInterface {
        /**
         * The provider name
         */
        name: string;
        /**
         * The chart feature type (e.g. Multi-Feature, Single Feature).
         */
        chartFeatureType: ChartFeatureType;
        /**
         * The chart definition for this {@link ChartSeriesProvider}
         */
        chartDefinition: configuration.ChartDefinition;
        /**
         * The series definitions for this {@link ChartSeriesProvider}
         */
        seriesDefinitions: configuration.ChartSeriesDefinition[];
        /**
         * The category definition for this {@link ChartSeriesProvider}
         */
        categoryDefinition: configuration.ChartCategoryDefinition;
        /**
         * The value formatter (e.g. format "123" as currency, etc)
         */
        formatProvider: globalization.FormatProviderInterface;
        /**
         * Initializes a new instance of the {@link ChartSeriesProvider} class.
         */
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(options: ChartSeriesProviderOptions): void;
        createChartPointCollection(source?: any, options?: ChartSeriesProviderOptions): ChartPointCollection;
        private _setChartDefinition(chartDefinition);
    }
}
declare module geocortex.charting {
    interface ChartViewModelFactoryOptions {
        seriesProvider?: ChartSeriesProviderInterface;
        formatProvider?: globalization.FormatProviderInterface;
        aggregator?: aggregation.ChartPointCollectionAggregatorInterface;
    }
    /**
     * This class builds {@link ChartViewModel} instances from a given {@link ChartDefinition} and collections of items.
     */
    class ChartViewModelFactory extends geocortex.framework.FrameworkObject {
        /**
         * The chart series provider.
         */
        seriesProvider: ChartSeriesProviderInterface;
        /**
         * The value formatter (e.g. format "123" as currency, etc)
         */
        formatProvider: globalization.FormatProviderInterface;
        /**
         * The aggregator for this {@link ChartViewModelFactory}.
         */
        aggregator: aggregation.ChartPointCollectionAggregatorInterface;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config?: ChartViewModelFactoryOptions): void;
        /**
         * TODO Document
         */
        createInstance(chartDefinition: configuration.ChartDefinition, chartFeatureType?: ChartFeatureType, source?: any): ChartViewModel;
        /**
         * TODO Document
         */
        refreshChartData(chartViewModel: ChartViewModel, source?: any): void;
        /**
         * TODO Document
         */
        createChartPointCollection(chartDefinition: configuration.ChartDefinition, source?: any, chartFeatureType?: ChartFeatureType): ChartPointCollection;
    }
}
declare module geocortex.charting.globalization {
    /**
     * Defines a method that supports custom formatting of the value of an object.
     */
    class KendoFormatProvider implements FormatProviderInterface {
        static adaptFormat(format: string): string;
        /**
         * Converts the value of a specified object to an equivalent string representation using specified format information.
         * @param value The object to format.
         * @param format A format string containing formatting specifications.
         */
        toString(value: Date, format: string): string;
        toString(value: number, format: string): string;
    }
}
declare module geocortex.charting.extensions.telerik {
    class Legend {
        /**
         * Extension method that configures a kendo chart's legend component based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendLabels;
        static border(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendBorder;
        static margin(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendMargin;
        static visibility(chartViewModel: ChartViewModel): boolean;
        static position(chartViewModel: ChartViewModel): string;
        static inactiveItems(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendInactiveItems;
    }
}
declare module geocortex.charting.extensions.telerik {
    class PlotArea {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module geocortex.charting.extensions.telerik {
    class CategoryAxis {
        /**
         * Extension method that configures a kendo chart's category axis (X-axis) based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartCategoryAxisItemLabels;
        static axisType(chartViewModel: ChartViewModel): string;
        static axisCrossingValues(chartViewModel: ChartViewModel): any;
        static plotBands(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartCategoryAxisItemPlotBand[];
    }
}
declare module geocortex.charting.extensions.telerik {
    class ValueAxis {
        /**
         * Extension method that configures a kendo chart's value axis (Y-axis) based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static cssColor(series: SeriesViewModel): string;
        static labels(series: SeriesViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartValueAxisItemLabels;
        static axisCrossingValues(series: SeriesViewModel): any;
        static plotBands(series: SeriesViewModel): kendo.dataviz.ui.ChartValueAxisItemPlotBand[];
    }
}
declare module geocortex.charting.extensions.telerik {
    class ChartArea {
        /**
         * Extension method that configures a kendo chart's plot area based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module geocortex.charting.extensions.telerik {
    class SeriesCommonDefaults {
        /**
         * Extension method that configures default values for all series in a kendo chart based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module geocortex.charting.extensions.telerik {
    class CartesianSeries {
        /**
         * Extension method that configures the series for a kendo linear chart based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static seriesType(series: SeriesViewModel, flipChart?: boolean): string;
        /** Gets the series name as it appears in the legend */
        static seriesName(series: SeriesViewModel, singleSeries?: boolean): string;
        /**
         * Sets a distinct color for each series, based on the configured color.
         */
        static cssColor(series: SeriesViewModel): string;
        static overlay(series: SeriesViewModel, gradientsEnabled?: boolean): kendo.dataviz.ui.ChartSeriesItemOverlay;
        static labelTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemLabels;
        static tooltipTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemTooltip;
        static style(series: SeriesViewModel): string;
        static lineTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemLine;
        /**
         * Sets the shape of the points used to represent nodes in this series.
         * You can select either a Circle, Square, Triangle, Diamond or choose to have no marker at all.
         */
        static pointMarkers(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemMarkers;
        static border(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemBorder;
    }
}
declare module geocortex.charting.extensions.telerik {
    class PieSeries {
        /**
         * Extension method that configures the series for a kendo pie chart based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static cssSeriesColors(chartViewModel: ChartViewModel): string[];
        static seriesType(chartViewModel: ChartViewModel): string;
        static seriesData(chartViewModel: ChartViewModel): ChartPoint[];
        static overlay(chartViewModel: ChartViewModel, gradientsEnabled?: boolean): kendo.dataviz.ui.ChartSeriesItemOverlay;
        static labelConnectors(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartSeriesItemConnectors;
        static labelTemplate(viewModel: ChartViewModel): kendo.dataviz.ui.ChartSeriesItemLabels;
        static tooltipTemplate(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartSeriesItemTooltip;
        static border(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartSeriesItemBorder;
    }
}
declare module geocortex.charting.extensions.telerik {
    class ChartBehaviors {
        /**
         * Extension method that configures the behaviors for a chart (e.g. series hover, series click events) based on the supplied {@link ChartViewModel}
         */
        static applyChartBehaviors(chartOptions: kendo.dataviz.ui.ChartOptions, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesMouseEnter(e: kendo.dataviz.ui.ChartSeriesHoverEvent, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesMouseLeave(e: kendo.dataviz.ui.ChartSeriesHoverEvent, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesClick(e: kendo.dataviz.ui.ChartSeriesClickEvent, view: Chart, chartViewModel: ChartViewModel): void;
    }
}
declare module geocortex.charting.extensions.telerik {
    class XAxis {
        /**
         * Extension method that configures a kendo chart's category axis (X-axis) based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartXAxisItemLabels;
        static axisType(chartViewModel: ChartViewModel): string;
        static axisCrossingValues(chartViewModel: ChartViewModel): any;
        static plotBands(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartXAxisItemPlotBand[];
    }
}
declare module geocortex.charting.extensions.telerik {
    class YAxis {
        /**
         * Extension method that configures a kendo chart's value axis (Y-axis) based on the supplied {@link ChartViewModel}
         */
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static cssColor(series: SeriesViewModel): string;
        static labels(series: SeriesViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartYAxisItemLabels;
        static axisCrossingValues(series: SeriesViewModel): any;
        static plotBands(series: SeriesViewModel): kendo.dataviz.ui.ChartYAxisItemPlotBand[];
    }
}
declare module geocortex.charting {
    interface TextSize {
        width: number;
        height: number;
    }
    /**
     * Provides precise pixel measurements for blocks of text so that you can determine exactly how high and
     * wide, in pixels, a given block of text will be. Note that when measuring text, it should be plain text and
     * should not contain any HTML, otherwise it may not be measured correctly.
     */
    class TextMetrics {
        private static _instance;
        private _shared;
        static measureText(text: string, font?: string, fixedWidth?: any): TextSize;
        static getInstance(): TextMetrics;
        constructor();
        /**
         * Sets the font style on the internal measurement element. If the text will be multi-line, you have
         * to set a fixed width in order to accurately measure the text height.
         * @param font The font to set on the element (e.g. "12px Arial, Helvetica, sans-serif")
         */
        setFont(font: string): void;
        /**
         * Sets a fixed width on the internal measurement element. If the text will be multi-line, you have
         * to set a fixed width in order to accurately measure the text height.
         * @param width The width to set on the element
         */
        setFixedWidth(width: number): any;
        setFixedWidth(width: string): any;
        /**
         * Returns the size of the specified text based on the internal element's style and width properties.
         * @param text The text to measure
         * @return An object containing the text's size {width: (width), height: (height)}
         */
        getSize(text: string): TextSize;
        /**
         * Returns the measured width of the specified text in pixels.
         * @param text The text to measure
         */
        getWidth(text: string): number;
        /**
         * Returns the measured height of the specified text in pixels.
         * For multi-line text, be sure to call setFixedWidth if necessary.
         * @param text The text to measure
         */
        getHeight(text: string): number;
    }
}
