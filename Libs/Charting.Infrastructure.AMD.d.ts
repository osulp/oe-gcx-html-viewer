/// <reference path="_all.d.ts" />
/// <reference path="Framework.AMD.d.ts" />
declare module "geocortex/charting/infrastructure/Enums" {
    export enum ChartType {
        Linear = 0,
        Pie = 1,
    }
    export enum ChartFeatureType {
        SingleFeature = 0,
        MultiFeature = 1,
    }
    export enum ChartSeriesType {
        Bar = 0,
        Line = 1,
        Spline = 2,
        Area = 3,
        SplineArea = 4,
        ScatterPoint = 5,
    }
    export enum ChartFieldSourceType {
        Field = 0,
        DataLink = 1,
    }
    export enum ChartLegendPosition {
        None = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        Left = 4,
    }
    export enum ChartPointLabelType {
        None = 0,
        Smart = 1,
        SmartWithConnectors = 2,
    }
    export enum ChartAxisLabelMode {
        Smart = 0,
        All = 1,
    }
    export enum ChartAreaDragMode {
        None = 0,
        Zoom = 1,
        Pan = 2,
    }
    export enum ChartPointMarkerType {
        None = 0,
        Circle = 1,
        Square = 2,
        Triangle = 3,
        Diamond = 4,
    }
    export enum ChartSeriesBreakType {
        None = 0,
        UniqueValue = 1,
    }
    export enum ChartColorPalette {
        Arctic = 0,
        Autumn = 1,
        Cold = 2,
        Flower = 3,
        Forest = 4,
        Grayscale = 5,
        Ground = 6,
        Lilac = 7,
        Natural = 8,
        Office2013 = 9,
        Pastel = 10,
        Rainbow = 11,
        Spring = 12,
        Summer = 13,
        Warm = 14,
        Windows8 = 15,
    }
    export enum DateTimeFormats {
        Full = 0,
        Day = 1,
        Month = 2,
        Year = 3,
        DayOfWeek = 4,
        Hour = 5,
        Custom = 6,
    }
    export enum NumericFormats {
        None = 0,
        Currency = 1,
        FixedPoint = 2,
        Number = 3,
        Percent = 4,
        Custom = 5,
    }
}
declare module "geocortex/charting/infrastructure/JsonSerializable" {
    export interface JsonSerializable {
        toJson(): any;
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartFieldDefinition" {
    import { ChartFieldSourceType } from "geocortex/charting/infrastructure/Enums";
    export class ChartFieldDefinition {
        name: string;
        displayName: string;
        displayFormat: string;
        sortingFormat: string;
        isContinuous: boolean;
        isNumerical: boolean;
        sourceType: ChartFieldSourceType;
        dataLinkId: string;
        constructor(json?: RestChartFieldDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartAxisDefinition" {
    export class ChartAxisDefinition {
        title: string;
        visible: boolean;
        showLabels: boolean;
        minimum: number;
        maximum: number;
        positionOpposite: boolean;
        showTicks: boolean;
        reverseValues: boolean;
        constructor(json?: RestChartAxisDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition" {
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    import { ChartAxisDefinition } from "geocortex/charting/infrastructure/configuration/ChartAxisDefinition";
    export class ChartCategoryDefinition {
        field: ChartFieldDefinition;
        axis: ChartAxisDefinition;
        constructor(json?: RestChartCategoryDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartSeriesBreakDefinition" {
    import { ChartSeriesBreakType } from "geocortex/charting/infrastructure/Enums";
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    export class ChartSeriesBreakDefinition {
        breakType: ChartSeriesBreakType;
        field: ChartFieldDefinition;
        constructor(json?: RestChartSeriesBreakDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition" {
    import { ChartSeriesType, ChartPointLabelType, ChartPointMarkerType } from "geocortex/charting/infrastructure/Enums";
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    import { ChartAxisDefinition } from "geocortex/charting/infrastructure/configuration/ChartAxisDefinition";
    import { ChartSeriesBreakDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesBreakDefinition";
    import { Color } from "geocortex/charting/infrastructure/Color";
    export class ChartSeriesDefinition {
        id: string;
        displayName: string;
        seriesType: ChartSeriesType;
        field: ChartFieldDefinition;
        axis: ChartAxisDefinition;
        seriesBreak: ChartSeriesBreakDefinition;
        title: string;
        valueFormat: string;
        color: Color;
        labelType: ChartPointLabelType;
        markerType: ChartPointMarkerType;
        timeZoneId: string;
        displayTimeZoneId: string;
        valueAggregatorName: string;
        constructor(json?: RestChartSeriesDefinition);
    }
}
declare module "geocortex/charting/infrastructure/globalization/FormatProviderInterface" {
    export interface FormatProviderInterface {
        toString(value: Date, format: string, timeZoneId?: string, displayTimeZoneId?: string): string;
        toString(value: number, format: string, timeZoneId?: string, displayTimeZoneId?: string): string;
        toString(value: any, format: string, timeZoneId?: string, displayTimeZoneId?: string): string;
    }
}
declare module "geocortex/charting/infrastructure/ChartPoint" {
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export interface ChartPointOptions {
        categoryDefinition?: ChartCategoryDefinition;
        seriesDefinition?: ChartSeriesDefinition;
        category?: any;
        series?: any;
        seriesBreakValue?: any;
        isSelected?: boolean;
        value?: any;
        attributes?: {
            [key: string]: any;
        };
        formatProvider?: FormatProviderInterface;
    }
    export class ChartPoint {
        uniqueId: string;
        categoryDefinition: ChartCategoryDefinition;
        seriesDefinition: ChartSeriesDefinition;
        category: any;
        displayCategory: string;
        sortingCategory: string | number | Date;
        seriesBreakValue: any;
        seriesBreakDisplayValue: string;
        seriesBreakSortingValue: string;
        series: any;
        displaySeries: string;
        sortingSeries: string | number | Date;
        isSelected: boolean;
        value: any;
        displayValue: string;
        attributes: {
            [key: string]: any;
        };
        formatProvider: FormatProviderInterface;
        static tryGetFormattedString(value: any, format: string, formatProvider?: FormatProviderInterface, timeZoneId?: string, displayTimeZoneId?: string): string;
        constructor(options?: ChartPointOptions);
        setCategoryDefinition(value: ChartCategoryDefinition): void;
        setSeriesDefinition(value: ChartSeriesDefinition): void;
        setCategory(value: any): void;
        setSeries(value: any): void;
        setSeriesBreakValue(value: any): void;
        setValue(value: any): void;
        clone(): ChartPoint;
        destroy(): void;
        private _setSeriesStrings();
        private _setCategoryStrings();
        private _setSeriesBreakStrings();
        private _setDisplayValue();
    }
}
declare module "geocortex/charting/infrastructure/ChartPointCollection" {
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class ChartPointCollection {
        items: ChartPoint[];
        constructor(collection?: ChartPoint[]);
        constructor(collection?: ChartPointCollection);
        isEmpty(): boolean;
        clear(destroyItems?: boolean): void;
        set(newCollection: ChartPoint[], destroyItems?: boolean): void;
        sort(predicate?: (a: ChartPoint, b: ChartPoint) => number): ChartPointCollection;
        private static _defaultSortingPredicate(a, b);
    }
}
declare module "geocortex/charting/infrastructure/ChartPointAdapterInterface" {
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    import { ChartFeatureType, ChartType } from "geocortex/charting/infrastructure/Enums";
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export interface ChartPointAdapterInterface {
        fill(collection: ChartPointCollection, source: any, options?: ChartPointAdapterOptions): void;
        getFieldValue(fieldDefinition: ChartFieldDefinition, sourceItem: any, userState?: any): any;
        createChartPoint(sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint;
        attachAttributes(item: ChartPoint, sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): void;
    }
    export interface ChartPointAdapterOptions {
        chartFeatureType?: ChartFeatureType;
        chartType?: ChartType;
        chartCategory?: ChartCategoryDefinition;
        chartSeries?: ChartSeriesDefinition;
        formatProvider?: FormatProviderInterface;
    }
}
declare module "geocortex/charting/infrastructure/ChartPointAdapterRegistry" {
    import { ChartPointAdapterInterface } from "geocortex/charting/infrastructure/ChartPointAdapterInterface";
    export class ChartPointAdapterRegistry {
        private static _adapters;
        static registerAdapter(adapter: ChartPointAdapterInterface, sourceType: string): void;
        static getAdapterBySourceType(sourceType: string): ChartPointAdapterInterface;
        static getAdapters(): ChartPointAdapterInterface[];
        static clear(): void;
    }
}
declare module "geocortex/charting/infrastructure/SeriesViewModelInterface" {
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { Color } from "geocortex/charting/infrastructure/Color";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    export interface SeriesViewModelInterface {
        seriesDefinition: ChartSeriesDefinition;
        chartDefinition: ChartDefinition;
        isSeriesInternal: boolean;
        distinctColor: Color;
        sourceCollection: ChartPointCollection;
        items: ChartPointCollection;
    }
}
declare module "geocortex/charting/infrastructure/ChartUtils" {
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    import { ChartSeriesType, ChartLegendPosition } from "geocortex/charting/infrastructure/Enums";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    import { SeriesViewModelInterface } from "geocortex/charting/infrastructure/SeriesViewModelInterface";
    import { ChartViewModelInterface } from "geocortex/charting/infrastructure/ChartViewModelInterface";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    export class ChartUtils {
        static DEFAULT_PRECISION: number;
        static COORD_PRECISION: number;
        static toString(value: any): string;
        static decimalToByte(value: number): number;
        static byteToDecimal(value: number, scale?: number): number;
        static isNumeric(obj: any): boolean;
        static numericValue(obj: any): number;
        static round(value: number, precision?: number): number;
        static ceil(value: number, step: number): number;
        static floor(value: number, step: number): number;
        static remainderClose(value: number, divisor: number, ratio: number): boolean;
        static isDefined(value: any): boolean;
        static valueOrDefault(value: any, defaultValue: any): any;
        static tryGetFieldValue(fieldDefinition: ChartFieldDefinition, sourceItem: any, userState?: any): any;
        static getSeriesPriority(type: ChartSeriesType): number;
        static containsDataLinks(chartDefinition: ChartDefinition): boolean;
        static findSeriesViewModelFromChartPoint(chartPoint: ChartPoint, seriesViewModels: SeriesViewModelInterface[]): SeriesViewModelInterface;
        static findSeriesViewModelById(seriesViewModels: SeriesViewModelInterface[], id: string): SeriesViewModelInterface;
        static findSeriesViewModelByTitle(seriesViewModels: SeriesViewModelInterface[], title: string, ignoreCase?: boolean): SeriesViewModelInterface;
        static equalsDefinition(left: ChartFieldDefinition, right: ChartFieldDefinition): boolean;
        static getResponsiveLegendPosition(chart: ChartViewModelInterface, landscapeMode?: boolean): ChartLegendPosition;
        static isScatterChart(series: ChartSeriesDefinition[]): boolean;
    }
}
declare module "geocortex/charting/infrastructure/Color" {
    import { JsonSerializable } from "geocortex/charting/infrastructure/JsonSerializable";
    export interface RGBColor {
        r: number;
        g: number;
        b: number;
    }
    export interface RGBAColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    export interface HSVColor {
        h: number;
        s: number;
        v: number;
    }
    export interface HSVAColor extends RGBColor {
        h: number;
        s: number;
        v: number;
        a: number;
    }
    export class Color implements JsonSerializable {
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
        toString(includeAlpha?: boolean): string;
        toCss(includeAlpha?: boolean): string;
        toJson(): any;
        private hsvToRgb(hsvColor);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartAreaDefinition" {
    import { Color } from "geocortex/charting/infrastructure/Color";
    import { ChartColorPalette } from "geocortex/charting/infrastructure/Enums";
    export class ChartAreaDefinition {
        background: Color;
        foreground: Color;
        showToolTips: boolean;
        showLabels: boolean;
        showHorizontalGridLines: boolean;
        showHorizontalStrips: boolean;
        showVerticalGridLines: boolean;
        showVerticalStrips: boolean;
        actionSelect: boolean;
        actionPan: boolean;
        actionZoom: boolean;
        actionFeatureDetails: boolean;
        actionRunCommand: boolean;
        commandName: string;
        commandParameter: string;
        enablePanAndZoom: boolean;
        enableColorPalette: boolean;
        colorPalette: ChartColorPalette;
        enableCommonSeriesRange: boolean;
        constructor(json?: RestChartAreaDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartLegendDefinition" {
    import { ChartLegendPosition } from "geocortex/charting/infrastructure/Enums";
    export class ChartLegendDefinition {
        title: string;
        position: ChartLegendPosition;
        constructor(json?: RestChartLegendDefinition);
    }
}
declare module "geocortex/charting/infrastructure/configuration/ChartDefinition" {
    import { ChartType } from "geocortex/charting/infrastructure/Enums";
    import { ChartAreaDefinition } from "geocortex/charting/infrastructure/configuration/ChartAreaDefinition";
    import { ChartLegendDefinition } from "geocortex/charting/infrastructure/configuration/ChartLegendDefinition";
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    export class ChartDefinition {
        id: string;
        displayName: string;
        chartType: ChartType;
        flipChart: boolean;
        visible: boolean;
        area: ChartAreaDefinition;
        legend: ChartLegendDefinition;
        category: ChartCategoryDefinition;
        series: ChartSeriesDefinition[];
        constructor(json?: RestChartDefinition);
    }
}
declare module "geocortex/charting/infrastructure/ChartViewModelInterface" {
    import { Observable, ObservableCollection } from "geocortex/framework/observables";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartFeatureType, ChartLegendPosition } from "geocortex/charting/infrastructure/Enums";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { SeriesViewModelInterface } from "geocortex/charting/infrastructure/SeriesViewModelInterface";
    export interface ChartViewModelInterface {
        animations: Observable<boolean>;
        chartDefinition: ChartDefinition;
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
declare module "geocortex/charting/infrastructure/eventArgs/ChartDataChangedEventArgs" {
    import { ChartViewModelInterface } from "geocortex/charting/infrastructure/ChartViewModelInterface";
    export class ChartDataChangedEventArgs {
        chartViewModel: ChartViewModelInterface;
        constructor(chartViewModel?: ChartViewModelInterface);
    }
}
declare module "geocortex/charting/infrastructure/eventArgs/ChartPointEventArgs" {
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    import { ChartViewModelInterface } from "geocortex/charting/infrastructure/ChartViewModelInterface";
    export class ChartPointEventArgs {
        chartPoint: ChartPoint;
        chartViewModel: ChartViewModelInterface;
        constructor(chartPoint: ChartPoint, chartViewModel: ChartViewModelInterface);
    }
}
declare module "events" {
    import { EventsBase } from "geocortex/framework/events";
    import { TypedEvent } from "geocortex/framework/events/TypedEvent";
    import { ChartDataChangedEventArgs } from "geocortex/charting/infrastructure/eventArgs/ChartDataChangedEventArgs";
    import { ChartPointEventArgs } from "geocortex/charting/infrastructure/eventArgs/ChartPointEventArgs";
    export interface FrameworkEvents extends EventsBase {
        (eventName: "ChartDataGenerationCompleteEvent"): TypedEvent<{
            (args: ChartDataChangedEventArgs): void;
        }>;
        (eventName: "ChartPointMouseDownEvent"): TypedEvent<{
            (args: ChartPointEventArgs): void;
        }>;
        (eventName: "ChartPointMouseHoverBeginEvent"): TypedEvent<{
            (args: ChartPointEventArgs): void;
        }>;
        (eventName: "ChartPointMouseHoverEndEvent"): TypedEvent<{
            (args: ChartPointEventArgs): void;
        }>;
    }
}
declare module "geocortex/charting/infrastructure/ChartInterface" {
    import { ChartViewModelInterface } from "geocortex/charting/infrastructure/ChartViewModelInterface";
    export interface ChartInterface {
        viewModel: ChartViewModelInterface;
        initialize(): void;
        updateLayout(): void;
        refresh(): void;
        destroy(): void;
    }
}
declare module "geocortex/charting/infrastructure/ChartOptions" {
    export interface ChartOptions {
        animationsEnabled?: boolean;
        gradientsEnabled?: boolean;
        interactiveLegendEnabled?: boolean;
        interactiveChart?: boolean;
        pieStartAngle?: number;
        renderAs?: string;
        chartWidth?: number;
        chartHeight?: number;
        autoSize?: boolean;
    }
}
declare module "geocortex/charting/infrastructure/ChartPointAdapterBase" {
    import { ChartPointAdapterInterface, ChartPointAdapterOptions } from "geocortex/charting/infrastructure/ChartPointAdapterInterface";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class ChartPointAdapterBase implements ChartPointAdapterInterface {
        constructor();
        fill(collection: ChartPointCollection, source: any, options?: ChartPointAdapterOptions): void;
        getFieldValue(fieldDefinition: ChartFieldDefinition, sourceItem: any, userState?: any): any;
        createChartPoint(sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint;
        createChartPointCore(sourceItem: any, seriesTitle: string, seriesFieldValue: any, categoryFieldValue: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint;
        attachAttributes(item: ChartPoint, sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): void;
    }
}
declare module "geocortex/charting/infrastructure/ChartPointGroup" {
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class ChartPointGroup {
        categoryDefinition: ChartCategoryDefinition;
        seriesDefinition: ChartSeriesDefinition;
        sortingCategory: string | number | Date;
        sortingSeries: string | number | Date;
        items: ChartPoint[];
    }
}
declare module "geocortex/charting/infrastructure/ChartPointUtils" {
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    import { Tuple } from "geocortex/framework/utils/Tuple";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartPointGroup } from "geocortex/charting/infrastructure/ChartPointGroup";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    export class ChartPointUtils {
        static getBounds(items: ChartPoint[], valueFunction: (item: ChartPoint) => number): Tuple;
        static getCategorySortingValues(collection: ChartPointCollection): (string | number | Date)[];
        static getCategorySortingStrings(collection: ChartPointCollection): string[];
        static getCategoryDisplayValues(collection: ChartPointCollection): string[];
        static getSeriesDisplayValues(collection: ChartPointCollection): string[];
        static getGroupedChartPoints(collection: ChartPointCollection): ChartPointGroup[];
        static getSeriesChartPoints(collection: ChartPointCollection, seriesDefinition: ChartSeriesDefinition, sortingSeries?: string): ChartPointCollection;
        static getSeriesGroupedChartPoints(collection: ChartPointCollection): ChartPointGroup[];
        static getSeriesStrings(collection: ChartPointCollection): {
            [id: string]: string[];
        };
        static sortChartPointCollection(collection: ChartPointCollection, predicate?: (a: ChartPoint, b: ChartPoint) => number): ChartPointCollection;
        private static _defaultSortingPredicate(a, b);
        static compareFields(item: ChartPoint, seriesField: string): boolean;
    }
}
declare module "geocortex/charting/infrastructure/ChartSeriesProviderInterface" {
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartFeatureType } from "geocortex/charting/infrastructure/Enums";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export interface ChartSeriesProviderInterface {
        createChartPointCollection(source: any, options?: ChartSeriesProviderOptions): ChartPointCollection;
    }
    export interface ChartSeriesProviderOptions {
        chartFeatureType?: ChartFeatureType;
        chartDefinition?: ChartDefinition;
        seriesDefinitions?: ChartSeriesDefinition[];
        categoryDefinition?: ChartCategoryDefinition;
        formatProvider?: FormatProviderInterface;
    }
}
declare module "geocortex/charting/infrastructure/ColorPalette" {
    import { Color } from "geocortex/charting/infrastructure/Color";
    export class ColorPalette {
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
        name: string;
        entries: Color[];
        constructor(name: string, entries?: Color[]);
        constructor(name: string, entries?: string[]);
        toHexColors(): string[];
        toCssColors(includeAlpha?: boolean): string[];
    }
}
declare module "geocortex/charting/infrastructure/ColorPaletteRegistry" {
    import { ColorPalette } from "geocortex/charting/infrastructure/ColorPalette";
    export class ColorPaletteRegistry {
        private static _palettes;
        private static _builtinPalettes();
        static registerColorPalette(palette: ColorPalette): void;
        static getColorPaletteByName(name: string): ColorPalette;
        static getColorPalettes(): ColorPalette[];
        static clear(): void;
    }
}
declare module "geocortex/charting/infrastructure/HslColor" {
    import { Color } from "geocortex/charting/infrastructure/Color";
    export class HslColor {
        a: number;
        h: number;
        s: number;
        l: number;
        static fromColor(c: Color): HslColor;
        static fromArgb(alpha: number, red: number, green: number, blue: number): HslColor;
        static fromRgb(red: number, green: number, blue: number): HslColor;
        toColor(): Color;
        private _norm(d);
        private _getComponent(tc, p, q);
    }
}
declare module "geocortex/charting/infrastructure/ColorUtils" {
    import { Color } from "geocortex/charting/infrastructure/Color";
    export class ColorUtils {
        static generateSatLumPalette(color: Color, numColors?: number, luminosityRatio?: number, saturationRatio?: number): Color[];
        static generateSelectionColor(color: Color): Color;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface" {
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export interface ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/SumValueAggregator" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class SumValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/CountValueAggregator" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class CountValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/AverageValueAggregator" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class AverageValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/MinValueAggregator" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class MinValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/MaxValueAggregator" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class MaxValueAggregator implements ValueAggregatorInterface {
        name: string;
        displayName: string;
        aggregate(items: ChartPoint[]): number;
    }
}
declare module "geocortex/charting/infrastructure/ValueAggregatorRegistry" {
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    export class ValueAggregatorRegistry {
        private static _aggregators;
        private static _builtinAggregators();
        static registerAggregator(aggregator: ValueAggregatorInterface): void;
        static getAggregatorByName(name: string): ValueAggregatorInterface;
        static getAggregators(): ValueAggregatorInterface[];
        static clear(): void;
    }
}
declare module "geocortex/charting/infrastructure/ValueAxisRange" {
    export interface ValueAxisRange {
        min: number;
        max: number;
    }
}
declare module "geocortex/charting/infrastructure/ValueAxisUtils" {
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ValueAxisRange } from "geocortex/charting/infrastructure/ValueAxisRange";
    export class ValueAxisUtils {
        static getRange(seriesDefinition: ChartSeriesDefinition, collection?: ChartPointCollection, roundToMajorUnit?: boolean): ValueAxisRange;
        static calculateMajorUnit(range: ValueAxisRange): number;
        static calculateMinorUnit(range: ValueAxisRange): number;
        static calculateMinorUnit(majorUnit: number): number;
        static calculateVisibleTickCount(range: ValueAxisRange, unitValue?: number): number;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregatorInterface" {
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartPointGroup } from "geocortex/charting/infrastructure/ChartPointGroup";
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export interface ChartPointCollectionAggregatorInterface {
        aggregate(collection: ChartPointCollection): ChartPointCollection;
        aggregateGroup(group: ChartPointGroup, valueAggregator: ValueAggregatorInterface): ChartPoint;
        attachAttributes(item: ChartPoint, group: ChartPointGroup): void;
    }
}
declare module "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregator" {
    import { ChartPointCollectionAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregatorInterface";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    import { ChartPointGroup } from "geocortex/charting/infrastructure/ChartPointGroup";
    import { ValueAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ValueAggregatorInterface";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    export class ChartPointCollectionAggregator implements ChartPointCollectionAggregatorInterface {
        formatProvider: FormatProviderInterface;
        aggregate(collection: ChartPointCollection): ChartPointCollection;
        aggregateGroup(group: ChartPointGroup, valueAggregator?: ValueAggregatorInterface): ChartPoint;
        attachAttributes(item: ChartPoint, group: ChartPointGroup): void;
        getAggregator(seriesDefinition: ChartSeriesDefinition): ValueAggregatorInterface;
    }
}

