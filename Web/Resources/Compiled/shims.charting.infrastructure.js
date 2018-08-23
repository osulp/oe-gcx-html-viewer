function shim(a,b,c){"string"==typeof a&&(c=b,b=a);if(typeof c === "undefined"){console.warn("Undefined shim for: " + b);return;}for(var d=b.split("."),e=null,f=window,g=0,h=d.length;g<h;g++)e=d[g],g==h-1?f[e]=c:f[e]||(f[e]={}),f=f[e]}
define(["geocortex/charting/infrastructure/ChartPoint", "geocortex/charting/infrastructure/ChartPointAdapterBase", "geocortex/charting/infrastructure/ChartPointAdapterRegistry", "geocortex/charting/infrastructure/ChartPointCollection", "geocortex/charting/infrastructure/ChartPointGroup", "geocortex/charting/infrastructure/ChartPointUtils", "geocortex/charting/infrastructure/ChartUtils", "geocortex/charting/infrastructure/Color", "geocortex/charting/infrastructure/ColorPalette", "geocortex/charting/infrastructure/ColorPaletteRegistry", "geocortex/charting/infrastructure/ColorUtils", "geocortex/charting/infrastructure/Enums", "geocortex/charting/infrastructure/HslColor", "geocortex/charting/infrastructure/ValueAggregatorRegistry", "geocortex/charting/infrastructure/ValueAxisUtils", "geocortex/charting/infrastructure/aggregation/AverageValueAggregator", "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregator", "geocortex/charting/infrastructure/aggregation/CountValueAggregator", "geocortex/charting/infrastructure/aggregation/MaxValueAggregator", "geocortex/charting/infrastructure/aggregation/MinValueAggregator", "geocortex/charting/infrastructure/aggregation/SumValueAggregator", "geocortex/charting/infrastructure/configuration/ChartAreaDefinition", "geocortex/charting/infrastructure/configuration/ChartAxisDefinition", "geocortex/charting/infrastructure/configuration/ChartCategoryDefinition", "geocortex/charting/infrastructure/configuration/ChartDefinition", "geocortex/charting/infrastructure/configuration/ChartFieldDefinition", "geocortex/charting/infrastructure/configuration/ChartLegendDefinition", "geocortex/charting/infrastructure/configuration/ChartSeriesBreakDefinition", "geocortex/charting/infrastructure/configuration/ChartSeriesDefinition", "geocortex/charting/infrastructure/eventArgs/ChartDataChangedEventArgs", "geocortex/charting/infrastructure/eventArgs/ChartPointEventArgs"], function (ChartPoint_ts_0, ChartPointAdapterBase_ts_1, ChartPointAdapterRegistry_ts_2, ChartPointCollection_ts_3, ChartPointGroup_ts_4, ChartPointUtils_ts_5, ChartUtils_ts_6, Color_ts_7, ColorPalette_ts_8, ColorPaletteRegistry_ts_9, ColorUtils_ts_10, Enums_ts_11, HslColor_ts_12, ValueAggregatorRegistry_ts_13, ValueAxisUtils_ts_14, AverageValueAggregator_ts_15, ChartPointCollectionAggregator_ts_16, CountValueAggregator_ts_17, MaxValueAggregator_ts_18, MinValueAggregator_ts_19, SumValueAggregator_ts_20, ChartAreaDefinition_ts_21, ChartAxisDefinition_ts_22, ChartCategoryDefinition_ts_23, ChartDefinition_ts_24, ChartFieldDefinition_ts_25, ChartLegendDefinition_ts_26, ChartSeriesBreakDefinition_ts_27, ChartSeriesDefinition_ts_28, ChartDataChangedEventArgs_ts_29, ChartPointEventArgs_ts_30) {
    shim("geocortex.charting.ChartPoint", ChartPoint_ts_0.ChartPoint);
    shim("geocortex.charting.ChartPointAdapterBase", ChartPointAdapterBase_ts_1.ChartPointAdapterBase);
    shim("geocortex.charting.ChartPointAdapterRegistry", ChartPointAdapterRegistry_ts_2.ChartPointAdapterRegistry);
    shim("geocortex.charting.ChartPointCollection", ChartPointCollection_ts_3.ChartPointCollection);
    shim("geocortex.charting.ChartPointGroup", ChartPointGroup_ts_4.ChartPointGroup);
    shim("geocortex.charting.ChartPointUtils", ChartPointUtils_ts_5.ChartPointUtils);
    shim("geocortex.charting.ChartUtils", ChartUtils_ts_6.ChartUtils);
    shim("geocortex.charting.Color", Color_ts_7.Color);
    shim("geocortex.charting.ColorPalette", ColorPalette_ts_8.ColorPalette);
    shim("geocortex.charting.ColorPaletteRegistry", ColorPaletteRegistry_ts_9.ColorPaletteRegistry);
    shim("geocortex.charting.ColorUtils", ColorUtils_ts_10.ColorUtils);
    shim("geocortex.charting.ChartType", Enums_ts_11.ChartType);
    shim("geocortex.charting.ChartFeatureType", Enums_ts_11.ChartFeatureType);
    shim("geocortex.charting.ChartSeriesType", Enums_ts_11.ChartSeriesType);
    shim("geocortex.charting.ChartFieldSourceType", Enums_ts_11.ChartFieldSourceType);
    shim("geocortex.charting.ChartLegendPosition", Enums_ts_11.ChartLegendPosition);
    shim("geocortex.charting.ChartPointLabelType", Enums_ts_11.ChartPointLabelType);
    shim("geocortex.charting.ChartAxisLabelMode", Enums_ts_11.ChartAxisLabelMode);
    shim("geocortex.charting.ChartAreaDragMode", Enums_ts_11.ChartAreaDragMode);
    shim("geocortex.charting.ChartPointMarkerType", Enums_ts_11.ChartPointMarkerType);
    shim("geocortex.charting.ChartSeriesBreakType", Enums_ts_11.ChartSeriesBreakType);
    shim("geocortex.charting.ChartColorPalette", Enums_ts_11.ChartColorPalette);
    shim("geocortex.charting.DateTimeFormats", Enums_ts_11.DateTimeFormats);
    shim("geocortex.charting.NumericFormats", Enums_ts_11.NumericFormats);
    shim("geocortex.charting.HslColor", HslColor_ts_12.HslColor);
    shim("geocortex.charting.ValueAggregatorRegistry", ValueAggregatorRegistry_ts_13.ValueAggregatorRegistry);
    shim("geocortex.charting.ValueAxisUtils", ValueAxisUtils_ts_14.ValueAxisUtils);
    shim("geocortex.charting.aggregation.AverageValueAggregator", AverageValueAggregator_ts_15.AverageValueAggregator);
    shim("geocortex.charting.aggregation.ChartPointCollectionAggregator", ChartPointCollectionAggregator_ts_16.ChartPointCollectionAggregator);
    shim("geocortex.charting.aggregation.CountValueAggregator", CountValueAggregator_ts_17.CountValueAggregator);
    shim("geocortex.charting.aggregation.MaxValueAggregator", MaxValueAggregator_ts_18.MaxValueAggregator);
    shim("geocortex.charting.aggregation.MinValueAggregator", MinValueAggregator_ts_19.MinValueAggregator);
    shim("geocortex.charting.aggregation.SumValueAggregator", SumValueAggregator_ts_20.SumValueAggregator);
    shim("geocortex.charting.configuration.ChartAreaDefinition", ChartAreaDefinition_ts_21.ChartAreaDefinition);
    shim("geocortex.charting.configuration.ChartAxisDefinition", ChartAxisDefinition_ts_22.ChartAxisDefinition);
    shim("geocortex.charting.configuration.ChartCategoryDefinition", ChartCategoryDefinition_ts_23.ChartCategoryDefinition);
    shim("geocortex.charting.configuration.ChartDefinition", ChartDefinition_ts_24.ChartDefinition);
    shim("geocortex.charting.configuration.ChartFieldDefinition", ChartFieldDefinition_ts_25.ChartFieldDefinition);
    shim("geocortex.charting.configuration.ChartLegendDefinition", ChartLegendDefinition_ts_26.ChartLegendDefinition);
    shim("geocortex.charting.configuration.ChartSeriesBreakDefinition", ChartSeriesBreakDefinition_ts_27.ChartSeriesBreakDefinition);
    shim("geocortex.charting.configuration.ChartSeriesDefinition", ChartSeriesDefinition_ts_28.ChartSeriesDefinition);
    shim("geocortex.charting.eventArgs.ChartDataChangedEventArgs", ChartDataChangedEventArgs_ts_29.ChartDataChangedEventArgs);
    shim("geocortex.charting.eventArgs.ChartPointEventArgs", ChartPointEventArgs_ts_30.ChartPointEventArgs);
});


