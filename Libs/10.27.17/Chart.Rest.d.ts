// Type definitions for the layer charts rest endpoint

/** @docs-hide-from-nav */
interface RestLayerChart {
    id: string;
    displayName?: string;
    chartFeatureType?: number;
    defaultChart?: boolean;
    chartDefinition: RestChartDefinition;
}

/** @docs-hide-from-nav */
interface RestChartDefinition {
    id?: string;
    displayName?: string;
    area?: RestChartAreaDefinition;
    chartType?: string;
    legend?: RestChartLegendDefinition;
    category?: RestChartCategoryDefinition;
    flipChart?: boolean;
    visible?: boolean;
    series?: RestChartSeriesDefinition[];
}

/** @docs-hide-from-nav */
interface RestChartAreaDefinition {
    background?: number[];
    foreground?: number[];
    showToolTips?: boolean;
    showLabels?: boolean;
    showHorizontalGridLines?: boolean;
    showHorizontalStrips?: boolean;
    showVerticalGridLines?: boolean;
    showVerticalStrips?: boolean;
    enableVerticalZoom?: boolean;
    enableHorizontalZoom?: boolean;
    actionSelect?: boolean;
    actionPan?: boolean;
    actionZoom?: boolean;
    actionFeatureDetails?: boolean;
    actionRunCommand?: boolean;
    commandName?: string;
    commandParameter?: string;
    dragMode?: number;
    enableTrackBall?: boolean;
    enableColorPalette?: boolean;
    colorPalette?: number;
    enableCommonSeriesRange?: boolean;
}

/** @docs-hide-from-nav */
interface RestChartLegendDefinition {
    title?: string;
    position?: string;
}

/** @docs-hide-from-nav */
interface RestChartCategoryDefinition {
    field?: RestChartFieldDefinition;
    axis?: RestChartAxisDefinition;
}

/** @docs-hide-from-nav */
interface RestChartSeriesDefinition {
    id?: string;
    displayName?: string;
    seriesType?: string;
    field?: RestChartFieldDefinition;
    axis?: RestChartAxisDefinition;
    seriesBreak?: RestChartSeriesBreakDefinition;
    title?: string;
    timeZoneId?: string;
    displayTimeZoneId?: string;
    valueFormat?: string;
    color?: number[];
    labelType?: string;
    markerType?: string;
    valueAggregatorName?: string;
}

/** @docs-hide-from-nav */
interface RestChartSeriesBreakDefinition {
    breakType?: number;
    field?: RestChartFieldDefinition;
}

/** @docs-hide-from-nav */
interface RestChartFieldDefinition {
    name?: string;
    displayName?: string;
    displayFormat?: string;
    sortingFormat?: string;
    isContinuous?: boolean;
    isNumerical?: boolean;
    sourceType?: number;
    dataLinkId?: string;
}

/** @docs-hide-from-nav */
interface RestChartAxisDefinition {
    title?: string;
    visible?: boolean;
    showLabels?: boolean;
    minimum?: number;
    maximum?: number;
    positionOpposite?: boolean;
    axisLabelMode?: number;
    showTicks?: boolean;
    reverseValues?: boolean;
}