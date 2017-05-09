/// <reference path="Framework.d.ts" />
/// <reference path="Chart.Rest.d.ts" />
declare module geocortex.charting {
    /**
     * Represents metadata about a {@link Chart}.
     */
    interface ChartOptions {
        /** Whether or not the chart should play animations when displaying the series. */
        animationsEnabled?: boolean;
        /** Whether the chart series should have a gradient applied or not. */
        gradientsEnabled?: boolean;
        /**
         * Whether legend items should be interactive or not.
         * When enabled, clicking legend items of pie charts will enable or disable slices of the pie,
         * and clicking legend items of linear charts will toggle the display of corresponding series.
         */
        interactiveLegendEnabled?: boolean;
        /** Whether or not to enable clicking on chart components (e.g. bars, pie slices, etc) */
        interactiveChart?: boolean;
        /** The angle at which to start pie charts in degrees. Negative values are acceptable. The default is 180. */
        pieStartAngle?: number;
        /** The format in which to render charts. The default is `svg`. Possible values include: `svg`, `vml` and `canvas` */
        renderAs?: string;
        /** Optional width of charts in pixels. */
        chartWidth?: number;
        /** Optional height of charts in pixels. */
        chartHeight?: number;
        /** Whether the chart should auto adjust the width and height to fill the available space in the parent container. */
        autoSize?: boolean;
    }
}
declare module geocortex.charting {
    /**
     * Represents metadata about a {@link ChartPoint}.
     */
    interface ChartPointOptions {
        /** The {@link configuration.ChartCategoryDefinition} for this point. */
        categoryDefinition?: geocortex.charting.configuration.ChartCategoryDefinition;
        /** The {@link configuration.ChartSeriesDefinition} for this point. */
        seriesDefinition?: geocortex.charting.configuration.ChartSeriesDefinition;
        /** The arbitrary category that this point falls under (if any). */
        category?: any;
        /** The series that this point falls under (if any). */
        series?: any;
        /** Series break value, for rendering the point based on contextual symbolization. */
        seriesBreakValue?: any;
        /** Whether or not this point is selected for further inspection. */
        isSelected?: boolean;
        /** The raw value represented by this point. */
        value?: any;
        /** Arbitrary attributes represented by this chart point. */
        attributes?: {
            [key: string]: any;
        };
        /** Optional formatting provider for this chart point. */
        formatProvider?: globalization.FormatProviderInterface;
    }
    /**
     * Represents a point of data in a Geocortex chart.
     */
    class ChartPoint {
        /** An id guaranteed to be unique. Auto-generated. */
        uniqueId: string;
        /** The category definition for this {@link ChartPoint}. */
        categoryDefinition: configuration.ChartCategoryDefinition;
        /** The series definition for this {@link ChartPoint}. */
        seriesDefinition: configuration.ChartSeriesDefinition;
        /** The category object. */
        category: any;
        /** The category value formatted for displaying in the user interface. */
        displayCategory: string;
        /** The category value formatted for sorting and aggregating. */
        sortingCategory: string;
        /** The value that breaks apart the series. */
        seriesBreakValue: any;
        /** The series break value formatted for display. */
        seriesBreakDisplayValue: string;
        /** The series break value formatted for sorting. */
        seriesBreakSortingValue: string;
        /** The series object. */
        series: any;
        /** The series value formatted for displaying in the user interface. */
        displaySeries: string;
        /** The series value formatted for sorting and aggregating. */
        sortingSeries: string;
        /** Whether or not this {@link ChartPoint} is selected. */
        isSelected: boolean;
        /** The raw value for this {@link ChartPoint}. */
        value: any;
        /** The value of this {@link ChartPoint} formatted for displaying in the user interface. */
        displayValue: string;
        /** An attributes dictionary which can be used to store custom application-specific data. */
        attributes: {
            [key: string]: any;
        };
        /** The format provider */
        formatProvider: globalization.FormatProviderInterface;
        /**
         * Tries to format an arbitrary value using a specified format string and a format provider.
         * Returns a formatted string representation of the object.
         * @param value The value to format.
         * @param format The format to use when converting the value to string.
         * @param formatProvider The optional format provider to use.
         */
        static tryGetFormattedString(value: any, format: string, formatProvider?: globalization.FormatProviderInterface): string;
        /**
         * Initializes a new instance of the {@link ChartPoint} class.
         * @param options Optional options block for this point.
         */
        constructor(options?: ChartPointOptions);
        /**
         * Sets the category definition for this point.
         * @param value The category definition to set.
         */
        setCategoryDefinition(value: configuration.ChartCategoryDefinition): void;
        /**
         * Sets the series definition for this point.
         * @param value The series definition to set.
         */
        setSeriesDefinition(value: configuration.ChartSeriesDefinition): void;
        /**
         * Sets the arbitrary category that this point falls under.
         * @param value The category value to set.
         */
        setCategory(value: any): void;
        /**
         * Sets the arbitrary series value for this point.
         * @param value The series value to set.
         */
        setSeries(value: any): void;
        /**
         * Sets the arbitrary series break value for this point.
         * @param value The break value to set.
         */
        setSeriesBreakValue(value: any): void;
        /**
         * Sets the raw value of this chart point.
         * @param value The value of this chart point.
         */
        setValue(value: any): void;
        /**
         * Performs a shallow clone of this chart point, returning the cloned value.
         */
        clone(): ChartPoint;
        /**
         * Performs tasks associated with freeing, releasing, or resetting resources held by this object.
         */
        destroy(): void;
        private _setSeriesStrings();
        private _setCategoryStrings();
        private _setSeriesBreakStrings();
        private _setDisplayValue();
    }
}
declare module geocortex.charting {
    /**
     * This class represents a collection of {@link ChartPoint} objects.
     */
    class ChartPointCollection {
        items: ChartPoint[];
        /**
         * Creates a new {@link ChartPointCollection}, optionally wrapping an existing array.
         * @param collection An array of items to initialize the collection to.
         */
        constructor(collection?: ChartPoint[]);
        constructor(collection?: ChartPointCollection);
        /**
         * Checks whether this collection contains any items.
         */
        isEmpty(): boolean;
        /**
         * Clears the collection. Optionally, destroys the chart point objects.
         * @param destroyItems (Optional) Whether to destroy the chart points. The default value is false.
         */
        clear(destroyItems?: boolean): void;
        /**
         * Copies an existing raw collection.
         * @param newCollection The raw collection to copy.
         * @param destroyItems (Optional) Whether to destroy the chart points. The default value is false.
         */
        set(newCollection: ChartPoint[], destroyItems?: boolean): void;
        /**
         * Sorts the chart point collection.
         * @param predicate The predicate function used to determine the order of the elements.
         * @return The sorted collection.
         */
        sort(predicate?: (a: ChartPoint, b: ChartPoint) => number): ChartPointCollection;
        /** Default alphanumeric sorting predicate. */
        private static _defaultSortingPredicate(a, b);
    }
}
declare module geocortex.charting {
    /**
     * This class represents a group of {@link ChartPoint} objects which are accumulated through aggregation.
     */
    class ChartPointGroup {
        /**
         * The category definition for this {@link ChartPointGroup}.
         */
        categoryDefinition: configuration.ChartCategoryDefinition;
        /**
         * The series definition for this {@link ChartPointGroup}.
         */
        seriesDefinition: configuration.ChartSeriesDefinition;
        /**
         * The category value formatted for sorting and aggregating.
         */
        sortingCategory: string;
        /**
         * The series value formatted for sorting and aggregating.
         */
        sortingSeries: string;
        /**
         * The collection of {@link ChartPoint} objects that belong to this group.
         */
        items: ChartPoint[];
    }
}
declare module geocortex.charting {
    class ChartPointUtils {
        /**
         * Gets the min and max bounds of a collection of {@link ChartPoint} objects.
         * @param collection The collection of {@link ChartPoint} objects.
         * @param valueFunction The function to apply to each item in the collection.
         * @return An object (tuple) with the following properties: min, max.
         */
        static getBounds(items: geocortex.charting.ChartPoint[], valueFunction: (item: geocortex.charting.ChartPoint) => number): geocortex.framework.utils.Tuple;
        /**
         * Gets the various category sorting strings from a {@link ChartPointCollection}.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return An array of category sorting strings.
         */
        static getCategorySortingStrings(collection: geocortex.charting.ChartPointCollection): string[];
        /**
         * Gets the various category display values strings from a {@link ChartPointCollection}.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return An array of category display values.
         */
        static getCategoryDisplayValues(collection: geocortex.charting.ChartPointCollection): string[];
        /**
         * Gets the various display values strings from a {@link ChartPointCollection}.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return An array of display values for the supplied series.
         */
        static getSeriesDisplayValues(collection: geocortex.charting.ChartPointCollection): string[];
        /**
         * Takes a collection of {@link ChartPoint} objects and creates an array of {@link ChartPointGroup} objects that contain
         * {@link ChartPoint} objects who share the same Series Definition Id, Category value, Series value, and Series Break value (if it exists).
         * This method is useful for aggregation as all of the items in each {@link ChartPointGroup} can be aggregated over to
         * create a single {@link ChartPoint}.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return The array of {@link ChartPointGroup} objects.
         */
        static getGroupedChartPoints(collection: geocortex.charting.ChartPointCollection): geocortex.charting.ChartPointGroup[];
        /**
         * Returns a collection of {@link ChartPoint} objects that pertain to a particular series definition.
         * @param collection The collection of {@link ChartPoint} objects to filter.
         * @param seriesDefinition The chart series definition.
         * @param sortingSeries The name of the series to get items for
         * @return The resulting collection of {@link ChartPoint} objects.
         */
        static getSeriesChartPoints(collection: geocortex.charting.ChartPointCollection, seriesDefinition: geocortex.charting.configuration.ChartSeriesDefinition, sortingSeries?: string): geocortex.charting.ChartPointCollection;
        /**
         * Returns an array of {@link ChartPointGroup} objects which represent a group of {@link ChartPoint} objects that
         * all have the same {@link ChartSeriesDefinition}, and the same sorting value.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return The array of {@link ChartPointGroup} objects.
         */
        static getSeriesGroupedChartPoints(collection: geocortex.charting.ChartPointCollection): geocortex.charting.ChartPointGroup[];
        /**
         * Takes a collection of {@link ChartPoint} objects and returns a dictionary keyed on the {@link ChartSeriesDefinitionInterface}'s ID
         * with the list of strings of the series associated with that {@link ChartSeriesDefinitionInterface}.
         * @param collection The collection of {@link ChartPoint} objects.
         * @return A dictionary (key=SeriesConfigId, value=Array(Series)).
         */
        static getSeriesStrings(collection: geocortex.charting.ChartPointCollection): {
            [id: string]: string[];
        };
        /**
         * Sorts the chart point collection.
         * @param collection The collection of {@link ChartPoint} objects.
         * @param predicate The predicate function used to determine the order of the elements.
         * @return The sorted collection.
         */
        static sortChartPointCollection(collection: geocortex.charting.ChartPointCollection, predicate?: (a: geocortex.charting.ChartPoint, b: geocortex.charting.ChartPoint) => number): geocortex.charting.ChartPointCollection;
        /** Default alphanumeric sorting predicate. */
        private static _defaultSortingPredicate(a, b);
        /**
         * Checks whether the {@link ChartPoint}'s series field alias is the same
         * field as the non-alias field string. Because the chart point's DisplayValue is
         * generated from the field alias, it might not match the field in the ChartDefinition;
         * thus, we need to check whether the field alias matches the field in the item's feature attributes.
         * This method returns True if the field alias is equivalent to the series field supplied.
         * @param item The chart point.
         * @param seriesField The string of the series to compare.
         */
        static compareFields(item: ChartPoint, seriesField: string): boolean;
    }
}
declare module geocortex.charting {
    class ChartUtils {
        static DEFAULT_PRECISION: number;
        static COORD_PRECISION: number;
        /**
         * Returns a string representation of the value specified
         */
        static toString(value: any): string;
        /**
         * Converts a 0-1 value into 0-255.
         */
        static decimalToByte(value: number): number;
        /**
         * Converts a 0-255 value into 0-1.
         */
        static byteToDecimal(value: number, scale?: number): number;
        /**
         * Checks whether or not an arbitrary object is numeric.
         * @param obj The value to check.
         */
        static isNumeric(obj: any): boolean;
        /**
         * This method tries to return the numeric value of an arbitrary object.
         * Returns null if the object is not numeric.
         * @param obj The object to get the numeric value from.
         */
        static numericValue(obj: any): number;
        /**
         * Decimal rounding of a number - e.g. round(2.54344, 2) = 2.54
         * @param value The number.
         * @param precision The number of decimal places.
         */
        static round(value: number, precision?: number): number;
        /**
         * Rounds a value up to the next closest multiple of X - e.g. ceil(680, 250) = 750 (closest multiple of 250 greater than 680)
         * @param value The number
         * @param step The increments of X
         */
        static ceil(value: number, step: number): number;
        /**
         * Rounds a value down to the previous closest multiple of X - e.g. floor(680, 250) = 500 (closest multiple of 250 smaller than 680)
         * @param value The number
         * @param step The increments of X
         */
        static floor(value: number, step: number): number;
        /**
         * Checks whether a number is close to the next multiple of X. Parameter `ratio` defines the threshold of how close.
         * e.g. remainderClose(19, 5, 1/3) = true because 19 is closer to 20 than 5 * 1/3
         * @param value The number to check
         * @param divisor The divisor
         * @param ratio The ratio - e.g. 1/3 of X - where X is the divisor.
         */
        static remainderClose(value: number, divisor: number, ratio: number): boolean;
        /**
         * Indicates whether the specified value is defined.
         * @param value The value to check.
         */
        static isDefined(value: any): boolean;
        /**
         * Retrieves a value if that value is defined; otherwise, it retrieves the default value.
         */
        static valueOrDefault(value: any, defaultValue: any): any;
        /**
         * Returns the value of the specified field, or null if no value could be resolved.
         * Delegates to the proper chart point adapter when resolving the value of the specified field.
         */
        static tryGetFieldValue(fieldDefinition: geocortex.charting.configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        /**
         * Returns a priority for a series type, which determines the order in which series are rendered.
         * @param type The chart series type (e.g. Bar, Area, Line, etc)
         */
        static getSeriesPriority(type: ChartSeriesType): number;
        /**
         * Determines whether a chart configuration makes use of data links.
         * @param chartDefinition The chart configuration to check.
         */
        static containsDataLinks(chartDefinition: configuration.ChartDefinition): boolean;
        /**
         * Finds the {@link SeriesViewModelInterface} associated with a particular {@link ChartPoint}. Returns null if no series was found.
         * @param chartPoint The chart point.
         * @param seriesViewModels The list of series view models.
         */
        static findSeriesViewModelFromChartPoint(chartPoint: ChartPoint, seriesViewModels: SeriesViewModelInterface[]): SeriesViewModelInterface;
        /**
         * Searches the supplied collection for a series view model with the specified `id` parameter. Returns null if no series was found.
         * @param seriesViewModels The list of series view models.
         * @param id The identifier for the series view model to be found.
         */
        static findSeriesViewModelById(seriesViewModels: SeriesViewModelInterface[], id: string): SeriesViewModelInterface;
        /**
         * Searches the supplied collection for a series view model with the specified `title` parameter. Returns null if no series was found.
         * @param seriesViewModels The list of series view models.
         * @param id The title for the series view model to be found.
         */
        static findSeriesViewModelByTitle(seriesViewModels: SeriesViewModelInterface[], title: string, ignoreCase?: boolean): SeriesViewModelInterface;
        static equalsDefinition(left: configuration.ChartFieldDefinition, right: configuration.ChartFieldDefinition): boolean;
        /**
         * Overrides the chart legend position to be on the bottom (for Portrait mode) or to the right (for Landscape mode).
         * @param chart The {@link geocortex.charting.ChartViewModel} instance.
         * @param landscapeMode Whether the shell is in landscape mode or not. The default is false.
         */
        static getResponsiveLegendPosition(chart: ChartViewModelInterface, landscapeMode?: boolean): ChartLegendPosition;
    }
}
declare module geocortex.charting {
    interface RGBColor {
        r: number;
        g: number;
        b: number;
    }
    interface RGBAColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    interface HSVColor {
        h: number;
        s: number;
        v: number;
    }
    interface HSVAColor extends RGBColor {
        h: number;
        s: number;
        v: number;
        a: number;
    }
    /**
     * The Color class provides a unified way to store colors, which holds the color in rgba form.
     * This simplifies dealing with the different ways to define colors as everyone can use the format
     * they are most comfortable with.
     */
    class Color implements JsonSerializable {
        static MAX_H: number;
        static MIN_H: number;
        static MAX_S: number;
        static MIN_S: number;
        static MAX_V: number;
        static MIN_V: number;
        static Black: Color;
        static White: Color;
        static Red: Color;
        static Green: Color;
        static Blue: Color;
        static Transparent: Color;
        red: number;
        green: number;
        blue: number;
        alpha: number;
        constructor(rgbaArray?: number[]);
        static fromRgb(color: RGBColor): Color;
        static fromRgba(color: RGBAColor): Color;
        static fromHsv(color: HSVColor): Color;
        static fromHsva(color: HSVAColor): Color;
        static fromString(hexString: string): Color;
        static fromArray(a: number[]): Color;
        setWithHSV(hsvColor: HSVColor): void;
        setWithString(hexString: string): void;
        getHsv(): HSVColor;
        /**
         * Returns a CSS color string in hexadecimal representation.
         */
        toString(includeAlpha?: boolean): string;
        /**
         * Returns a CSS color string in rgb(a) representation.
         */
        toCss(includeAlpha?: boolean): string;
        /**
         * Returns a 4 component array of RGBA values.
         */
        toJson(): any;
        private hsvToRgb(hsvColor);
    }
}
declare module geocortex.charting {
    /**
     * Represents the different types of charts available.
     */
    enum ChartType {
        /**
         * Linear charts, used for plotting data in an X-Y coordinate system.
         */
        Linear = 0,
        /**
         * Pie chart type is used for plotting pie charts.
         */
        Pie = 1,
    }
    /**
     * Represents the feature type of the chart.
     */
    enum ChartFeatureType {
        /**
         * A chart for a single feature.
         */
        SingleFeature = 0,
        /**
         * A chart for multiple features.
         */
        MultiFeature = 1,
    }
    /**
     * Represents the various types of Chart Series that can exist.
     */
    enum ChartSeriesType {
        /**
         * A bar series, plots data points as bars
         */
        Bar = 0,
        /**
         * A line series, plots data points as markers connected by lines
         */
        Line = 1,
        /**
         * Spline series, plots data as interpolated curves
         */
        Spline = 2,
        /**
         * Area series, plots data points as markers connected by lines, and fills it in with color
         */
        Area = 3,
        /**
         * Area series, plots data points as markers connected by interpolated curves, and fills it in with color
         */
        SplineArea = 4,
        /**
         * Scatter series, plots data as scatter points
         */
        ScatterPoint = 5,
    }
    /**
     * Represents the ChartFieldSourceType of the series data.
     */
    enum ChartFieldSourceType {
        /**
         * A chart field.
         */
        Field = 0,
        /**
         * A one-to-one {@link essentials.DataLink}.
         */
        DataLink = 1,
    }
    /**
     * Represents the
     */
    enum ChartLegendPosition {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        Top = 1,
        /**
         *
         */
        Right = 2,
        /**
         *
         */
        Bottom = 3,
        /**
         *
         */
        Left = 4,
    }
    /**
     * Represents the
     */
    enum ChartPointLabelType {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        Smart = 1,
        /**
         *
         */
        SmartWithConnectors = 2,
    }
    /**
     * Represents the
     */
    enum ChartAxisLabelMode {
        /**
         *
         */
        Smart = 0,
        /**
         *
         */
        All = 1,
    }
    /**
     * Represents the
     */
    enum ChartAreaDragMode {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        Zoom = 1,
        /**
         *
         */
        Pan = 2,
    }
    enum ChartPointMarkerType {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        Circle = 1,
        /**
         *
         */
        Square = 2,
        /**
         *
         */
        Triangle = 3,
        /**
         *
         */
        Diamond = 4,
    }
    enum ChartSeriesBreakType {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        UniqueValue = 1,
    }
    enum ChartColorPalette {
        /**
         *
         */
        Arctic = 0,
        /**
         *
         */
        Autumn = 1,
        /**
         *
         */
        Cold = 2,
        /**
         *
         */
        Flower = 3,
        /**
         *
         */
        Forest = 4,
        /**
         *
         */
        Grayscale = 5,
        /**
         *
         */
        Ground = 6,
        /**
         *
         */
        Lilac = 7,
        /**
         *
         */
        Natural = 8,
        /**
         *
         */
        Office2013 = 9,
        /**
         *
         */
        Pastel = 10,
        /**
         *
         */
        Rainbow = 11,
        /**
         *
         */
        Spring = 12,
        /**
         *
         */
        Summer = 13,
        /**
         *
         */
        Warm = 14,
        /**
         *
         */
        Windows8 = 15,
    }
    enum DateTimeFormats {
        Full = 0,
        Day = 1,
        Month = 2,
        Year = 3,
        DayOfWeek = 4,
        Hour = 5,
        Custom = 6,
    }
    enum NumericFormats {
        None = 0,
        Currency = 1,
        FixedPoint = 2,
        Number = 3,
        Percent = 4,
        Custom = 5,
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for the plot area of a geocortex chart.
     */
    class ChartAreaDefinition {
        /** The background color of the chart. */
        background: Color;
        /** The foreground color of the chart. */
        foreground: Color;
        /** Whether the chart should show tool tips or not. */
        showToolTips: boolean;
        /** Whether the pie chart should display labels or not. */
        showLabels: boolean;
        /** Whether horizontal gridlines should be shown or not. */
        showHorizontalGridLines: boolean;
        /** Whether horizontal strips should be shown or not. */
        showHorizontalStrips: boolean;
        /** Whether vertical gridlines should be shown or not. */
        showVerticalGridLines: boolean;
        /** Whether vertical strips should be shown or not. */
        showVerticalStrips: boolean;
        /** Whether vertical zoom is enabled or not. */
        enableVerticalZoom: boolean;
        /** Whether horizontal zoom is enabled or not. */
        enableHorizontalZoom: boolean;
        /** Whether or not clicking on a chart point will select the respective features on the map. */
        actionSelect: boolean;
        /** Whether or not clicking on a chart point will pan to the respective features on the map. */
        actionPan: boolean;
        /** Whether or not clicking on a chart point will zoom to the respective features on the map. */
        actionZoom: boolean;
        /** Whether or not clicking on a chart point will open the feature details dialog for the first feature linked to the chart point. */
        actionFeatureDetails: boolean;
        /** Whether or not clicking on a chart point will run a custom command. */
        actionRunCommand: boolean;
        /** The command to run if configured to run a command upon clicking upon a chart point. */
        commandName: string;
        /** The command parameter to use if configured to run a command upon clicking a chart point. */
        commandParameter: string;
        /** A value indicating how the chart handles a mouse drag gesture. */
        dragMode: ChartAreaDragMode;
        /** Whether or not a trackball is shown on the chart for the nearest chart point from the current mouse position. */
        enableTrackBall: boolean;
        /** Whether or not a pre-defined color palette is used for the chart series. */
        enableColorPalette: boolean;
        /** The approved Telerik chart color palette. */
        colorPalette: ChartColorPalette;
        /** Whether or not the axis range will be harmonized for all configured chart series (each series axis is set to the same max/min). */
        enableCommonSeriesRange: boolean;
        /**
         * Creates a new instance of the `ChartAreaDefinition`.
         * @param json The JSON definition to create this instance from.
         */
        constructor(json?: RestChartAreaDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for an axis in a geocortex chart.
     */
    class ChartAxisDefinition {
        /**
         * The title of this axis.
         */
        title: string;
        /**
         * Whether this axis should be visible.
         */
        visible: boolean;
        /**
         * Whether this axis should show labels for the major ticks.
         */
        showLabels: boolean;
        /**
         * The minimum value for this axis.
         */
        minimum: number;
        /**
         * The maximum value for this axis.
         */
        maximum: number;
        /**
         * Whether this axis should be rendered on the opposite side (i.e. on the right side for normal charts, on the top for flipped charts).
         */
        positionOpposite: boolean;
        /**
         * The label mode used for displaying labels on the category axis.
         */
        axisLabelMode: ChartAxisLabelMode;
        /**
         * Whether ticks are displayed on the axis.
         */
        showTicks: boolean;
        /**
         * Whether this axis should display values in reverse order (descending).
         */
        reverseValues: boolean;
        constructor(json?: RestChartAxisDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for the category axis of a particular chart.
     */
    class ChartCategoryDefinition {
        /**
         * The field that will be used for generating this category.
         * This field object also contains all of the formatting information for this category. This should probably be moved
         * into LayerChart since it has more to do with translating a feature/featureset into a Category, but it will remain
         * here for now. Right now the field contains the formatting information in conjunction with the field name itself.
         * This information is used when creating the DataSetItems used by the actual geocortex chart in infrastructure.
         * The formatting information should likely be kept in this class and move the field configuration into the
         * FeatureLayerChart since it is more feature / layer specific information that the infrastructural chart shouldn't
         * have to worry about.
         */
        field: ChartFieldDefinition;
        /**
         * The configuration object for the category axis.
         */
        axis: ChartAxisDefinition;
        constructor(json?: RestChartCategoryDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration objects / options for a geocortex chart.
     * This is a fundamental class that every geocortex chart will consume.
     */
    class ChartDefinition {
        id: string;
        displayName: string;
        /**
         * The type of chart (e.g. Linear, Pie).
         */
        chartType: ChartType;
        /**
         * Whether or not the chart should be flipped.
         */
        flipChart: boolean;
        /**
         * Whether the chart should be visible or not.
         */
        visible: boolean;
        /**
         * The chart plot area definition.
         */
        area: ChartAreaDefinition;
        /**
         * The chart legend definition.
         */
        legend: ChartLegendDefinition;
        /**
         * The chart category definition.
         */
        category: ChartCategoryDefinition;
        /**
         * The collection of chart series definition objects.
         */
        series: ChartSeriesDefinition[];
        constructor(json?: RestChartDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for a field used by {@link ChartSeriesDefinition} and {@link ChartCategoryDefinition}.
     * It contains all of the display and sorting information needed to aggregate and display the field.
     */
    class ChartFieldDefinition {
        /**
         * The name of the field.
         */
        name: string;
        /**
         * The name to use when displaying this field.
         */
        displayName: string;
        /**
         * The format string used when displaying this field data.
         */
        displayFormat: string;
        /**
         * The format string used when sorting and aggregating this field data.
         */
        sortingFormat: string;
        /**
         * Whether the data should be plotted on a continuous DateTime x-axis.
         */
        isContinuous: boolean;
        /**
         * Whether the data should be plotted on a numerical x-axis.
         */
        isNumerical: boolean;
        /**
         * A value indicating what the field source is (e.g Field, DataLink).
         */
        sourceType: ChartFieldSourceType;
        /**
         * The data link id if the source is a data link.
         */
        dataLinkId: string;
        constructor(json?: RestChartFieldDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for a chart's legend.
     */
    class ChartLegendDefinition {
        /**
         * The title of the chart legend.
         */
        title: string;
        /**
         * The position of the chart legend (e.g None, Top, Right, Bottom, Left).
         */
        position: ChartLegendPosition;
        constructor(json?: RestChartLegendDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for a chart's series break.
     */
    class ChartSeriesBreakDefinition {
        /**
         * A value indicating the type of series break to perform (e.g. None, UniqueValue)
         */
        breakType: ChartSeriesBreakType;
        /**
         * The field that should be used. Only applies to unique values.
         */
        field: ChartFieldDefinition;
        constructor(json?: RestChartSeriesBreakDefinition);
    }
}
declare module geocortex.charting.configuration {
    /**
     * This class represents the exposed configuration options for a series in a geocortex chart.
     */
    class ChartSeriesDefinition {
        /**
         * The unique identifier associated with this {@link ChartSeriesDefinition}
         */
        id: string;
        /**
         * The display name of this {@link ChartSeriesDefinition}.
         */
        displayName: string;
        /**
         * The type of series that this should be (e.g. Bar, Line, Spline, Area, SplineArea, ScatterPoint).
         */
        seriesType: ChartSeriesType;
        /**
         * The field that will be used for generating this series of data.
         * This field object also contains all of the formatting information for this series. This should probably be moved
         * into feature chart since it has more to do with translating a feature/featureset into a Series, but it will remain
         * here for now. Right now the field contains the formatting information in conjunction with the field name itself.
         * This information is used when creating the DataSetItems used by the actual geocortex chart in infrastructure.
         * The formatting information should likely be kept in this class and move the field configuration into the
         * FeatureLayerChart since it is more feature / layer specific information that the infrastructural chart shouldn't
         * have to worry about.
         */
        field: ChartFieldDefinition;
        /**
         * The configuration object for this series custom axis.
         */
        axis: ChartAxisDefinition;
        /**
         * The series break for the series.
         */
        seriesBreak: ChartSeriesBreakDefinition;
        /**
         * The title of this series.
         */
        title: string;
        /**
         * The format string used when formatting the value of this field (i.e. in DataLabels and such)
         */
        valueFormat: string;
        /**
         * The root color of this series.
         */
        color: Color;
        /**
         * The label orientation used when displaying point labels (e.g. None, Smart, SmartWithConnectors)
         */
        labelType: ChartPointLabelType;
        /**
         * The marker type to be used for data points in this series (e.g. None, Circle, Square, Triangle, Diamond)
         */
        markerType: ChartPointMarkerType;
        /**
         * The name of the Value Aggregator to be used by this series.
         * In infrastructure, there is a notion of an {@link IValueAggregator} which is responsible for aggregating
         * value fields in collections that are generated by the Series Definition.  The various {@link IValueAggregator} are
         * imported allowing a developer to create a new one and configure any chart to use it by its name.
         */
        valueAggregatorName: string;
        constructor(json?: RestChartSeriesDefinition);
    }
}
declare module geocortex.charting.globalization {
    /**
     * Defines a method that supports custom formatting of the value of an object.
     */
    interface FormatProviderInterface {
        /**
         * Converts the value of a specified object to an equivalent string representation using specified format information.
         * @param value The object to format.
         * @param format A format string containing formatting specifications.
         */
        toString(value: Date, format: string): string;
        toString(value: number, format: string): string;
        toString(value: any, format: string): string;
    }
}
declare module geocortex.charting {
    /**
     * Represents a registry of all available {@link ChartPointAdapterInterface} instances.
     */
    class ChartPointAdapterRegistry {
        private static _adapters;
        static registerAdapter(adapter: ChartPointAdapterInterface, sourceType: string): void;
        static getAdapterBySourceType(sourceType: string): ChartPointAdapterInterface;
        static getAdapters(): ChartPointAdapterInterface[];
        static clear(): void;
    }
}
declare module geocortex.charting {
    /**
     * Serializable interface which is responsible for providing serialization logic.
     */
    interface JsonSerializable {
        toJson(): any;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * Represents an entity responsible for aggregating value fields in collections that are generated by the Series Definition.
     */
    interface ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * An aggregator that aggregates using a `Sum` function. The produced value is the sum of all of the input values.
     */
    class SumValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * An aggregator that aggregates via counting the number of inputs. In other words, the aggregate value of a sequence of `10` elements is `10`.
     */
    class CountValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        /** @inherited */
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * Aggregates values and produces an average value based on the set of {@link ChartPoint} instances passed in.
     */
    class AverageValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        /** @inherited */
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * An aggregator that aggregates using a `Min` function. In other words, the produced value is the lowest (minimum) encountered in the input collection.
     */
    class MinValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * An aggregator that aggregates using a `Max` function. In other words, the produced value is the highest (maximum) encountered in the input collection.
     */
    class MaxValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        /** @inherited */
        aggregate(items: ChartPoint[]): number;
    }
}
declare module geocortex.charting {
    /**
     * Represents a registry of all available {@link ValueAggregatorInterface} instances.
     */
    class ValueAggregatorRegistry {
        private static _aggregators;
        private static _builtinAggregators();
        static registerAggregator(aggregator: aggregation.ValueAggregatorInterface): void;
        static getAggregatorByName(name: string): aggregation.ValueAggregatorInterface;
        static getAggregators(): aggregation.ValueAggregatorInterface[];
        static clear(): void;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * Represents an entity capable of aggregating collections of {@link ChartPoint}.
     */
    interface ChartPointCollectionAggregatorInterface {
        /**
         * Aggregates a {@link ChartPointCollection}, collapsing it into another, aggregated {@link ChartPointCollection}.
         * @param collection The collection to aggregate.
         */
        aggregate(collection: ChartPointCollection): ChartPointCollection;
        /**
         * Aggregates a group of chart points, given a group and an instance of {@link ValueAggregatorInterface}.
         * @param group The group to aggregate.
         * @param valueAggregator The aggregator to use.
         */
        aggregateGroup(group: ChartPointGroup, valueAggregator: ValueAggregatorInterface): ChartPoint;
        /**
         * Attaches attributes and metadata to a {@link ChartPoint}.
         * @param item The {@link ChartPoint} to attach data to.
         * @param group The {@link ChartPointGroup} from which to pull attributes and metadata.
         */
        attachAttributes(item: ChartPoint, group: ChartPointGroup): void;
    }
}
declare module geocortex.charting.aggregation {
    /**
     * Uses an implementation of {@link ValueAggregatorInterface} to aggregate a collection of {@link ChartPoint} instances.
     */
    class ChartPointCollectionAggregator implements ChartPointCollectionAggregatorInterface {
        /**
         * The value formatter (e.g. format "123" as currency, et cetera)
         */
        formatProvider: globalization.FormatProviderInterface;
        /**
         * Aggregates a collection of chart points, represented by a {@link ChartPointCollection}.
         * @param collection The collection to aggregate.
         */
        aggregate(collection: ChartPointCollection): ChartPointCollection;
        /**
         * Aggregates a group of charting points, represented by a {@link ChartPointGroup}.
         * @param group The group to aggregate.
         * @param valueAggregator The aggregator to use.
         */
        aggregateGroup(group: ChartPointGroup, valueAggregator?: ValueAggregatorInterface): ChartPoint;
        /**
         * Attaches attributes and metadata to a {@link ChartPoint}.
         * @param item The {@link ChartPoint} to attach data to.
         * @param group The {@link ChartPointGroup} from which to pull attributes and metadata.
         */
        attachAttributes(item: ChartPoint, group: ChartPointGroup): void;
        /**
         * Gets an implementation of {@link ValueAggregatorInterface} based on the given {@link configuration.ChartSeriesDefinition}.
         * @param seriesDefinition The series definition.
         */
        getAggregator(seriesDefinition: configuration.ChartSeriesDefinition): ValueAggregatorInterface;
    }
}
declare module geocortex.charting {
    /**
     * Defines the palette semantic for the chart's series.
     */
    class ColorPalette {
        static Arctic: ColorPalette;
        static Autumn: ColorPalette;
        static Cold: ColorPalette;
        static Flower: ColorPalette;
        static Forest: ColorPalette;
        static Grayscale: ColorPalette;
        static Ground: ColorPalette;
        static Lilac: ColorPalette;
        static Natural: ColorPalette;
        static Office2013: ColorPalette;
        static Pastel: ColorPalette;
        static Rainbow: ColorPalette;
        static Spring: ColorPalette;
        static Summer: ColorPalette;
        static Warm: ColorPalette;
        static Windows8: ColorPalette;
        /**
         * The user-friendly identifier for the palette.
         */
        name: string;
        /**
         * The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
         */
        entries: Color[];
        constructor(name: string, entries?: Color[]);
        constructor(name: string, entries?: string[]);
        /**
         * Returns the CSS color strings for this palette in hexadecimal representation.
         */
        toHexColors(): string[];
        /**
         * Returns the CSS color strings for this palette in rbg(a) representation.
         */
        toCssColors(includeAlpha?: boolean): string[];
    }
}
declare module geocortex.charting {
    /**
     * Represents a registry of all available {@link ColorPalette} instances.
     */
    class ColorPaletteRegistry {
        private static _palettes;
        private static _builtinPalettes();
        static registerColorPalette(palette: ColorPalette): void;
        static getColorPaletteByName(name: string): ColorPalette;
        static getColorPalettes(): ColorPalette[];
        static clear(): void;
    }
}
declare module geocortex.charting {
    /**
     * Represents a value axis range. Defines the upper and lower bounds.
     */
    interface ValueAxisRange {
        min: number;
        max: number;
    }
}
declare module geocortex.charting {
    class ValueAxisUtils {
        /**
         * Calculates the range for the value axis associated with the a chart series.
         * If a point collection is supplied, it calculates the upper and lower bounds based on the data provided.
         * Returns a range object with properties: `min`, `max`.
         * @param seriesDefinition The chart series configuration.
         * @collection The collection of {@link ChartPoint} objects.
         * @param roundToMajorUnit Whether to round the min and max values to the next major unit. Defaults to `true`.
         */
        static getRange(seriesDefinition: geocortex.charting.configuration.ChartSeriesDefinition, collection?: geocortex.charting.ChartPointCollection, roundToMajorUnit?: boolean): ValueAxisRange;
        /**
         * Calculates the automatic major unit for a vertical (value) axis.
         * Value axes have major and minor divisions, corresponding to where tick marks, tick labels, and gridlines appear, when present.
         * How frequently these appear is determined by the major/minor units setting, specified as a floating point number of units to
         * skip between divisions.
         * @param range The axis range.
         */
        static calculateMajorUnit(range: ValueAxisRange): number;
        /**
         * Calculates the automatic minor unit for a vertical (value) axis.
         * Value axes have major and minor divisions, corresponding to where tick marks, tick labels, and gridlines appear, when present.
         * How frequently these appear is determined by the major/minor units setting, specified as a floating point number of units to
         * skip between divisions.
         * @param range The axis range.
         */
        static calculateMinorUnit(range: ValueAxisRange): number;
        /**
         * Calculates the automatic minor unit for a vertical (value) axis.
         * Value axes have major and minor divisions, corresponding to where tick marks, tick labels, and gridlines appear, when present.
         * How frequently these appear is determined by the major/minor units setting, specified as a floating point number of units to
         * skip between divisions.
         * @param majorUnit The axis major unit value.
         */
        static calculateMinorUnit(majorUnit: number): number;
        /**
         * Calculates the number of visible ticks along a value axis.
         * @param range The axis range.
         * @param unitValue The value between each tick mark along the axis. Can be either the major unit or minor unit. Defaults to the major unit.
         */
        static calculateVisibleTickCount(range: ValueAxisRange, unitValue?: number): number;
    }
}
declare module geocortex.charting.eventArgs {
    /**
     * Contains information pertaining to changes in a collection of chart data, included completion of rendering the set of data.
     */
    class ChartDataChangedEventArgs {
        chartViewModel: ChartViewModelInterface;
        constructor(chartViewModel?: ChartViewModelInterface);
    }
}
declare module geocortex.charting.eventArgs {
    class ChartPointEventArgs {
        chartPoint: geocortex.charting.ChartPoint;
        chartViewModel: ChartViewModelInterface;
        constructor(chartPoint: geocortex.charting.ChartPoint, chartViewModel: ChartViewModelInterface);
    }
}
declare module geocortex.framework.events {
    /** @docs-hide-from-nav */
    interface FrameworkEvents extends EventsBase {
        /**
         * Raised when new chart data has been generated.
         * @docs-gcx-event geocortex.essentialsHtmlViewer
         * @name ChartDataGenerationCompleteEvent
         * @param args An object with the following member: chartViewModel.
         * @introduced 2.3
         * @gcx-event-category Charting
         */
        (eventName: "ChartDataGenerationCompleteEvent"): TypedEvent<{
            (args: geocortex.charting.eventArgs.ChartDataChangedEventArgs): void;
        }>;
        /**
         * Raised when the user clicks a chart point.
         * @docs-gcx-event geocortex.essentialsHtmlViewer
         * @name ChartPointMouseDownEvent
         * @param args An object with the following members: chartPoint, chartViewModel.
         * @introduced 2.3
         * @gcx-event-category Charting
         */
        (eventName: "ChartPointMouseDownEvent"): TypedEvent<{
            (args: geocortex.charting.eventArgs.ChartPointEventArgs): void;
        }>;
        /**
         * Raised when the user hovers over a chart point.
         * @docs-gcx-event geocortex.essentialsHtmlViewer
         * @name ChartPointMouseHoverBeginEvent
         * @param args An object with the following members: chartPoint, chartViewModel.
         * @introduced 2.3
         * @gcx-event-category Charting
         */
        (eventName: "ChartPointMouseHoverBeginEvent"): TypedEvent<{
            (args: geocortex.charting.eventArgs.ChartPointEventArgs): void;
        }>;
        /**
         * Raised when the user stops hovering over a chart point.
         * @docs-gcx-event geocortex.essentialsHtmlViewer
         * @name ChartPointMouseHoverEndEvent
         * @param args An object with the following members: chartPoint, chartViewModel.
         * @introduced 2.3
         * @gcx-event-category Charting
         */
        (eventName: "ChartPointMouseHoverEndEvent"): TypedEvent<{
            (args: geocortex.charting.eventArgs.ChartPointEventArgs): void;
        }>;
    }
}
declare module geocortex.charting {
    class ColorUtils {
        /**
         * By using the HSL color system, this extension method generates a palette of colors
         * based on a root color by altering the Saturation and Luminosity of the colors.
         * Returns an array of {@link Color} that represent the generated palette.
         * @param color The root color to generate the palette from
         * @param numColors The number or colors to generate in the palette
         * @param luminosityRatio The ratio of the luminosity spectrum to use in the palette
         * @param saturationRatio The ratio of the saturation spectrum to use in the palette
         */
        static generateSatLumPalette(color: Color, numColors?: number, luminosityRatio?: number, saturationRatio?: number): Color[];
        /**
         * Generates a "selection" color based on the existing color. For now,
         * this method simply sets the alpha of the new color to half of the original.
         * Returns a new "selection" {@link Color}.
         * @param color The original color
         */
        static generateSelectionColor(color: Color): Color;
    }
}
declare module geocortex.charting {
    /**
     * Represents an adapter class to transform external data into instances of {@link ChartPoint} for use in a Geocortex chart.
     */
    class ChartPointAdapterBase implements ChartPointAdapterInterface {
        /**
         * Initializes a new instance of the {@link ChartPointAdapterBase} class.
         */
        constructor();
        /**
         * Fills a {@link ChartPointCollection} with data from the given `source`, respecting any options passed in.
         * @param collection The collection to fill.
         * @param source The data source to populate the collection from.
         * @param options Options to use while adapting data from the source.
         */
        fill(collection: ChartPointCollection, source: any, options?: ChartPointAdapterOptions): void;
        /**
         * Returns the raw data value from a given source item and with respect to the given field definition.
         * @param fieldDefinition The field definition to honor.
         * @param sourceItem The raw source item to extract the value from.
         * @param userState
         */
        getFieldValue(fieldDefinition: configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        /**
         * Creates a new {@link ChartPoint} based on a raw source item, optional options, and arbitrary user state.
         * @param sourceItem The raw item to use.
         * @param options Options to use while creating the new chart point.
         * @param userState arbitrary state to consume or pass onwards.
         */
        createChartPoint(sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint;
        /**
         * Creates a new {@link ChartPoint} given a raw source item, a series title, series value, category value, options, and arbitrary user state.
         * @param sourceItem The raw item to create the point from.
         * @param seriesTitle The title of the series that the point belongs to.
         * @param seriesFieldValue The value of the field that the series relates to.
         * @param categoryFieldValue The category field value for this point.
         * @param options The options to respect when creating the new chart point.
         */
        createChartPointCore(sourceItem: any, seriesTitle: string, seriesFieldValue: any, categoryFieldValue: any, options?: geocortex.charting.ChartPointAdapterOptions, userState?: any): geocortex.charting.ChartPoint;
        /**
         * Attaches attributes and metadata to a {@link ChartPoint}.
         * @param sourceItem The {@link ChartPoint} to attach data to.
         * @param options The options to respect when attaching attributes to the new chart point.
         * @param userState
         */
        attachAttributes(item: ChartPoint, sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): void;
    }
}
declare module geocortex.charting {
    /**
     * Represents an adapter object that transforms external data into points of data in a Geocortex chart.
     */
    interface ChartPointAdapterInterface {
        /**
         * Fills a {@link ChartPointCollection} with data from the given `source`, respecting any options passed in.
         * @param collection The collection to fill.
         * @param source The data source to populate the collection from.
         * @param options Options to use while adapting data from the source.
         */
        fill(collection: ChartPointCollection, source: any, options?: ChartPointAdapterOptions): void;
        /**
         * Returns the raw data value from a given source item and with respect to the given field definition.
         * @param fieldDefinition The field definition to honor.
         * @param sourceItem The raw source item to extract the value from.
         * @param userState
         */
        getFieldValue(fieldDefinition: configuration.ChartFieldDefinition, sourceItem: any, userState?: any): any;
        /**
         * Creates a new {@link ChartPoint} based on a raw source item, optional options, and arbitrary user state.
         * @param sourceItem The raw item to use.
         * @param options Options to use while creating the new chart point.
         * @param userState arbitrary state to consume or pass onwards.
         */
        createChartPoint(sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint;
        /**
         * Attaches attributes and metadata to a {@link ChartPoint}.
         * @param sourceItem The {@link ChartPoint} to attach data to.
         * @param options The options to respect when attaching attributes to the new chart point.
         * @param userState
         */
        attachAttributes(item: ChartPoint, sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): void;
    }
    interface ChartPointAdapterOptions {
        chartFeatureType?: ChartFeatureType;
        chartType?: ChartType;
        chartCategory?: configuration.ChartCategoryDefinition;
        chartSeries?: configuration.ChartSeriesDefinition;
        formatProvider?: globalization.FormatProviderInterface;
    }
}
declare module geocortex.charting {
    /**
     * The {@link ChartSeriesProviderInterface} serves as a bridge between a {@link ChartPointCollectinInterface} and a data source for retrieving data.
     * It transforms external data into points of data that can be plotted in a geocortex chart.
     */
    interface ChartSeriesProviderInterface {
        createChartPointCollection(source: any, options?: ChartSeriesProviderOptions): ChartPointCollection;
    }
    interface ChartSeriesProviderOptions {
        chartFeatureType?: ChartFeatureType;
        chartDefinition?: configuration.ChartDefinition;
        seriesDefinitions?: configuration.ChartSeriesDefinition[];
        categoryDefinition?: configuration.ChartCategoryDefinition;
        formatProvider?: globalization.FormatProviderInterface;
    }
}
declare module geocortex.charting {
    /**
     * Represents a view of a chart.
     */
    interface ChartInterface {
        /** The view model of the chart, containing settings and data. */
        viewModel: ChartViewModelInterface;
        /** Initializes the chart view. */
        initialize(): void;
        /** Updates the chart's layout, re-rendering it with the currently loaded data. */
        updateLayout(): void;
        /** Refreshes the chart by destroying and recreating it. */
        refresh(): void;
        /** Destroys the chart view. */
        destroy(): void;
    }
}
declare module geocortex.charting {
    interface ChartViewModelInterface {
        animations: Observable<boolean>;
        chartDefinition: configuration.ChartDefinition;
        chartFeatureType: ChartFeatureType;
        chartId: Observable<string>;
        chartPointCollection: Observable<ChartPointCollection>;
        defaultChart: Observable<boolean>;
        displayName: Observable<string>;
        gradients: Observable<boolean>;
        height: Observable<number>;
        interactiveChart: Observable<boolean>;
        interactiveLegend: Observable<boolean>;
        legendPosition: Observable<ChartLegendPosition>;
        pieStartAngle: Observable<number>;
        renderAs: Observable<string>;
        seriesViewModels: ObservableCollection<SeriesViewModelInterface>;
        tag: any;
        visible: Observable<boolean>;
        width: Observable<number>;
        createSeriesViewModels(collection: ChartPointCollection): void;
    }
}
declare module geocortex.charting {
    interface SeriesViewModelInterface {
        seriesDefinition: configuration.ChartSeriesDefinition;
        chartDefinition: configuration.ChartDefinition;
        isSeriesInternal: boolean;
        distinctColor: Color;
        sourceCollection: ChartPointCollection;
        items: ChartPointCollection;
    }
}
declare module geocortex.charting {
    class HslColor {
        a: number;
        h: number;
        s: number;
        l: number;
        /**
         * Creates a new {@link HslColor} by using the specified {@link Color} channel values.
         * @param c The {@link Color} object.
         */
        static fromColor(c: Color): HslColor;
        /**
         * Creates a new {@link HslColor} by using the specified alpha channel and color channel values.
         * @param alpha The alpha channel of the new color. The value must be between 0 and 1.
         * @param red The red channel of the new color. The value must be between 0 and 1.
         * @param green The green channel of the new color. The value must be between 0 and 1.
         * @param blue The blue channel of the new color. The value must be between 0 and 1.
         */
        static fromArgb(alpha: number, red: number, green: number, blue: number): HslColor;
        /**
         * Creates a new {@link HslColor} by using the specified color channel values.
         * @param red The red channel of the new color. The value must be between 0 and 1.
         * @param green The green channel of the new color. The value must be between 0 and 1.
         * @param blue The blue channel of the new color. The value must be between 0 and 1.
         */
        static fromRgb(red: number, green: number, blue: number): HslColor;
        toColor(): Color;
        private _norm(d);
        private _getComponent(tc, p, q);
    }
}
