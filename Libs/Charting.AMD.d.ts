/// <reference path="_all.d.ts" />
/// <reference path="Framework.UI.AMD.d.ts" />
/// <reference path="Charting.Infrastructure.AMD.d.ts" />
declare module "geocortex/charting/SeriesViewModel" {
    import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
    import { SeriesViewModelInterface } from "geocortex/charting/infrastructure/SeriesViewModelInterface";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { Color } from "geocortex/charting/infrastructure/Color";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { Application } from "geocortex/framework/application/Application";
    export class SeriesViewModel extends ViewModelBase implements SeriesViewModelInterface {
        seriesDefinition: ChartSeriesDefinition;
        chartDefinition: ChartDefinition;
        isSeriesInternal: boolean;
        distinctColor: Color;
        sourceCollection: ChartPointCollection;
        items: ChartPointCollection;
        constructor(app: Application, libraryId?: string);
        onDestroy(): void;
    }
}
declare module "geocortex/charting/ChartViewModel" {
    import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
    import { ChartViewModelInterface } from "geocortex/charting/infrastructure/ChartViewModelInterface";
    import { Observable, ObservableCollection } from "geocortex/framework/observables";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartFeatureType, ChartLegendPosition } from "geocortex/charting/infrastructure/Enums";
    import { LazyObservable } from "geocortex/framework-ui/LazyObservable";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    import { SeriesViewModel } from "geocortex/charting/SeriesViewModel";
    import { Application } from "geocortex/framework/application/Application";
    import { ChartOptions } from "geocortex/charting/infrastructure/ChartOptions";
    import { Tuple } from "geocortex/framework/utils/Tuple";
    export class ChartViewModel extends ViewModelBase implements ChartViewModelInterface {
        animations: Observable<boolean>;
        autoSize: Observable<boolean>;
        chartDefinition: ChartDefinition;
        chartDescription: Observable<string>;
        chartFeatureType: ChartFeatureType;
        chartId: Observable<string>;
        chartPointCollection: LazyObservable<ChartPointCollection>;
        defaultChart: Observable<boolean>;
        displayName: Observable<string>;
        formatProvider: FormatProviderInterface;
        gradients: Observable<boolean>;
        height: Observable<number>;
        interactiveChart: Observable<boolean>;
        interactiveLegend: Observable<boolean>;
        legendPosition: Observable<ChartLegendPosition>;
        pieStartAngle: Observable<number>;
        renderAs: Observable<string>;
        seriesViewModels: ObservableCollection<SeriesViewModel>;
        showTitle: Observable<boolean>;
        tag: any;
        visible: Observable<boolean>;
        width: Observable<number>;
        constructor(app: Application, libraryId?: string);
        initialize(config: any): void;
        setOptions(options: ChartOptions): void;
        setSize(w: number, h: number): void;
        protected _handleSizeChanged(): void;
        protected _chartPointCollectionChanged(newValue: ChartPointCollection): void;
        destroyChartPoints(): void;
        createSeriesViewModels(collection: ChartPointCollection): void;
        updateChartDescription(): void;
        protected _getSeriesViewModelPriority(seriesViewModel: SeriesViewModel, order: number): Tuple;
        protected _applyDistinctColorsToSeries(seriesCollection: SeriesViewModel[]): void;
        protected _checkAndFillSeriesViewModels(series: SeriesViewModel[], collection: ChartPointCollection): void;
        protected _tagInternalSeries(series: SeriesViewModel[]): void;
    }
}
declare module "geocortex/charting/extensions/telerik/TelerikExtensions" {
    import { ChartAxisDefinition } from "geocortex/charting/infrastructure/configuration/ChartAxisDefinition";
    export function setProperty(configObj: any, propName: string, value: any, includeNullValues?: boolean): void;
    export function axisMinimumValue(config: ChartAxisDefinition): number;
    export function axisMaximumValue(config: ChartAxisDefinition): number;
}
declare module "geocortex/charting/extensions/telerik/Legend" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class Legend {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendLabels;
        static border(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendBorder;
        static margin(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendMargin;
        static visibility(chartViewModel: ChartViewModel): boolean;
        static position(chartViewModel: ChartViewModel): string;
        static inactiveItems(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartLegendInactiveItems;
    }
}
declare module "geocortex/charting/extensions/telerik/ChartArea" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class ChartArea {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module "geocortex/charting/extensions/telerik/PlotArea" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class PlotArea {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module "geocortex/charting/globalization/KendoFormatProvider" {
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export class KendoFormatProvider implements FormatProviderInterface {
        static adaptFormat(format: string): string;
        toString(value: Date, format: string): string;
        toString(value: number, format: string): string;
    }
}
declare module "geocortex/charting/extensions/telerik/XAxis" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class XAxis {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartXAxisItemLabels;
        static axisType(chartViewModel: ChartViewModel): string;
        static axisCrossingValues(chartViewModel: ChartViewModel): any;
        static plotBands(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartXAxisItemPlotBand[];
    }
}
declare module "geocortex/charting/extensions/telerik/YAxis" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { SeriesViewModel } from "geocortex/charting/SeriesViewModel";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export class YAxis {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static cssColor(series: SeriesViewModel): string;
        static labels(seriesViewModel: SeriesViewModel, axisIsVisible?: boolean, formatProvider?: FormatProviderInterface): kendo.dataviz.ui.ChartYAxisItemLabels;
        static axisCrossingValues(series: SeriesViewModel): any;
        static plotBands(series: SeriesViewModel): kendo.dataviz.ui.ChartYAxisItemPlotBand[];
    }
}
declare module "geocortex/charting/extensions/telerik/CategoryAxis" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class CategoryAxis {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static labels(chartViewModel: ChartViewModel, axisIsVisible?: boolean): kendo.dataviz.ui.ChartCategoryAxisItemLabels;
        static axisType(chartViewModel: ChartViewModel): string;
        static axisCrossingValues(chartViewModel: ChartViewModel): any;
        static plotBands(chartViewModel: ChartViewModel): kendo.dataviz.ui.ChartCategoryAxisItemPlotBand[];
    }
}
declare module "geocortex/charting/extensions/telerik/ValueAxis" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { SeriesViewModel } from "geocortex/charting/SeriesViewModel";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    export class ValueAxis {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static cssColor(series: SeriesViewModel): string;
        static labels(series: SeriesViewModel, axisIsVisible?: boolean, formatProvider?: FormatProviderInterface): kendo.dataviz.ui.ChartValueAxisItemLabels;
        static axisCrossingValues(series: SeriesViewModel): any;
        static plotBands(series: SeriesViewModel): kendo.dataviz.ui.ChartValueAxisItemPlotBand[];
    }
}
declare module "geocortex/charting/extensions/telerik/SeriesCommonDefaults" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class SeriesCommonDefaults {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
    }
}
declare module "geocortex/charting/extensions/telerik/CartesianSeries" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { SeriesViewModel } from "geocortex/charting/SeriesViewModel";
    export class CartesianSeries {
        static applyConfiguration(chartOptions: kendo.dataviz.ui.ChartOptions, chartViewModel: ChartViewModel): void;
        static seriesType(series: SeriesViewModel, flipChart?: boolean): string;
        static seriesName(series: SeriesViewModel, singleSeries?: boolean): string;
        static cssColor(series: SeriesViewModel): string;
        static overlay(series: SeriesViewModel, gradientsEnabled?: boolean): kendo.dataviz.ui.ChartSeriesItemOverlay;
        static labelTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemLabels;
        static tooltipTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemTooltip;
        static style(series: SeriesViewModel): string;
        static lineTemplate(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemLine;
        static pointMarkers(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemMarkers;
        static border(series: SeriesViewModel): kendo.dataviz.ui.ChartSeriesItemBorder;
    }
}
declare module "geocortex/charting/extensions/telerik/PieSeries" {
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
    export class PieSeries {
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
declare module "geocortex/charting/extensions/telerik/ChartBehaviors" {
    import { Chart } from "geocortex/charting/Chart";
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    export class ChartBehaviors {
        static applyChartBehaviors(chartOptions: kendo.dataviz.ui.ChartOptions, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesMouseEnter(e: kendo.dataviz.ui.ChartSeriesHoverEvent, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesMouseLeave(e: kendo.dataviz.ui.ChartSeriesHoverEvent, view: Chart, chartViewModel: ChartViewModel): void;
        static handleSeriesClick(e: kendo.dataviz.ui.ChartSeriesClickEvent, view: Chart, chartViewModel: ChartViewModel): void;
        private static _stopEvent(e);
    }
}
declare module "geocortex/charting/Chart" {
    import { ViewBase } from "geocortex/framework/ui/ViewBase";
    import { ChartInterface } from "geocortex/charting/infrastructure/ChartInterface";
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { Application } from "geocortex/framework/application/Application";
    import { ChartPointEventArgs } from "geocortex/charting/infrastructure/eventArgs/ChartPointEventArgs";
    export class Chart extends ViewBase implements ChartInterface {
        static DEFAULT_FONT: string;
        private _syncToken;
        private _syncSource;
        private _chart;
        private _options;
        chartDomElement: HTMLElement;
        viewModel: ChartViewModel;
        constructor(app: Application, libraryId?: string);
        attach(viewModel?: any): void;
        initialize(): void;
        destroy(): void;
        activated(): void;
        updateLayout(): void;
        refresh(): void;
        onChartPointMouseHoverBegin(args: ChartPointEventArgs): void;
        onChartPointMouseHoverEnd(args: ChartPointEventArgs): void;
        onChartPointMouseDown(args: ChartPointEventArgs): void;
        protected _destroyChartWidget(): void;
        protected _create(domElement: HTMLElement): kendo.dataviz.ui.Chart;
        protected _getChartOptions(viewModel: ChartViewModel): kendo.dataviz.ui.ChartOptions;
        protected _enablePanAndZoom(chartOptions: kendo.dataviz.ui.ChartOptions): void;
        protected _applyCommonSeriesRange(chartOptions: kendo.dataviz.ui.ChartOptions): void;
    }
}
declare module geocortex.charting.aggregation {
}
declare module geocortex.charting.configuration {
}
declare module geocortex.charting.eventArgs {
}
declare module geocortex.charting.extensions {
}
declare module geocortex.charting.globalization {
}
declare module "geocortex/charting/ChartSeriesProvider" {
    import { FrameworkObject } from "geocortex/framework/FrameworkObject";
    import { ChartSeriesProviderInterface, ChartSeriesProviderOptions } from "geocortex/charting/infrastructure/ChartSeriesProviderInterface";
    import { ChartFeatureType } from "geocortex/charting/infrastructure/Enums";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartSeriesDefinition } from "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition";
    import { ChartCategoryDefinition } from "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    import { Application } from "geocortex/framework/application/Application";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    export class ChartSeriesProvider extends FrameworkObject implements ChartSeriesProviderInterface {
        name: string;
        chartFeatureType: ChartFeatureType;
        chartDefinition: ChartDefinition;
        seriesDefinitions: ChartSeriesDefinition[];
        categoryDefinition: ChartCategoryDefinition;
        formatProvider: FormatProviderInterface;
        constructor(app: Application, libraryId?: string);
        initialize(options: ChartSeriesProviderOptions): void;
        createChartPointCollection(source?: any, options?: ChartSeriesProviderOptions): ChartPointCollection;
        private _setChartDefinition(chartDefinition);
    }
}
declare module "geocortex/charting/ChartViewModelFactory" {
    import { ChartSeriesProviderInterface } from "geocortex/charting/infrastructure/ChartSeriesProviderInterface";
    import { FormatProviderInterface } from "geocortex/charting/infrastructure/globalization/FormatProviderInterface";
    import { ChartPointCollectionAggregatorInterface } from "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregatorInterface";
    import { FrameworkObject } from "geocortex/framework/FrameworkObject";
    import { Application } from "geocortex/framework/application/Application";
    import { ChartDefinition } from "geocortex/charting/infrastructure/configuration/ChartDefinition";
    import { ChartFeatureType } from "geocortex/charting/infrastructure/Enums";
    import { ChartViewModel } from "geocortex/charting/ChartViewModel";
    import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";
    export interface ChartViewModelFactoryOptions {
        seriesProvider?: ChartSeriesProviderInterface;
        formatProvider?: FormatProviderInterface;
        aggregator?: ChartPointCollectionAggregatorInterface;
    }
    export class ChartViewModelFactory extends FrameworkObject {
        seriesProvider: ChartSeriesProviderInterface;
        formatProvider: FormatProviderInterface;
        aggregator: ChartPointCollectionAggregatorInterface;
        constructor(app: Application, libraryId?: string);
        initialize(config?: ChartViewModelFactoryOptions): void;
        createInstance(chartDefinition: ChartDefinition, chartFeatureType?: ChartFeatureType, source?: any): ChartViewModel;
        refreshChartData(chartViewModel: ChartViewModel, source?: any): void;
        createChartPointCollection(chartDefinition: ChartDefinition, source?: any, chartFeatureType?: ChartFeatureType): ChartPointCollection;
    }
}

