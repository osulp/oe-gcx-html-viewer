function shim(a,b,c){"string"==typeof a&&(c=b,b=a);if(typeof c === "undefined"){console.warn("Undefined shim for: " + b);return;}for(var d=b.split("."),e=null,f=window,g=0,h=d.length;g<h;g++)e=d[g],g==h-1?f[e]=c:f[e]||(f[e]={}),f=f[e]}
define(["geocortex/charting/Chart", "geocortex/charting/ChartSeriesProvider", "geocortex/charting/ChartViewModel", "geocortex/charting/ChartViewModelFactory", "geocortex/charting/SeriesViewModel", "geocortex/charting/globalization/KendoFormatProvider", "geocortex/charting/extensions/telerik/CartesianSeries", "geocortex/charting/extensions/telerik/CategoryAxis", "geocortex/charting/extensions/telerik/ChartArea", "geocortex/charting/extensions/telerik/ChartBehaviors", "geocortex/charting/extensions/telerik/Legend", "geocortex/charting/extensions/telerik/PieSeries", "geocortex/charting/extensions/telerik/PlotArea", "geocortex/charting/extensions/telerik/SeriesCommonDefaults", "geocortex/charting/extensions/telerik/TelerikExtensions", "geocortex/charting/extensions/telerik/ValueAxis", "geocortex/charting/extensions/telerik/XAxis", "geocortex/charting/extensions/telerik/YAxis"], function (Chart_ts_0, ChartSeriesProvider_ts_1, ChartViewModel_ts_2, ChartViewModelFactory_ts_3, SeriesViewModel_ts_4, KendoFormatProvider_ts_5, CartesianSeries_ts_6, CategoryAxis_ts_7, ChartArea_ts_8, ChartBehaviors_ts_9, Legend_ts_10, PieSeries_ts_11, PlotArea_ts_12, SeriesCommonDefaults_ts_13, TelerikExtensions_ts_14, ValueAxis_ts_15, XAxis_ts_16, YAxis_ts_17) {
    shim("geocortex.charting.Chart", Chart_ts_0.Chart);
    shim("geocortex.charting.ChartSeriesProvider", ChartSeriesProvider_ts_1.ChartSeriesProvider);
    shim("geocortex.charting.ChartViewModel", ChartViewModel_ts_2.ChartViewModel);
    shim("geocortex.charting.ChartViewModelFactory", ChartViewModelFactory_ts_3.ChartViewModelFactory);
    shim("geocortex.charting.SeriesViewModel", SeriesViewModel_ts_4.SeriesViewModel);
    shim("geocortex.charting.globalization.KendoFormatProvider", KendoFormatProvider_ts_5.KendoFormatProvider);
    shim("geocortex.charting.extensions.telerik.CartesianSeries", CartesianSeries_ts_6.CartesianSeries);
    shim("geocortex.charting.extensions.telerik.CategoryAxis", CategoryAxis_ts_7.CategoryAxis);
    shim("geocortex.charting.extensions.telerik.ChartArea", ChartArea_ts_8.ChartArea);
    shim("geocortex.charting.extensions.telerik.ChartBehaviors", ChartBehaviors_ts_9.ChartBehaviors);
    shim("geocortex.charting.extensions.telerik.Legend", Legend_ts_10.Legend);
    shim("geocortex.charting.extensions.telerik.PieSeries", PieSeries_ts_11.PieSeries);
    shim("geocortex.charting.extensions.telerik.PlotArea", PlotArea_ts_12.PlotArea);
    shim("geocortex.charting.extensions.telerik.SeriesCommonDefaults", SeriesCommonDefaults_ts_13.SeriesCommonDefaults);
    shim("geocortex.charting.extensions.telerik.setProperty", TelerikExtensions_ts_14.setProperty);
    shim("geocortex.charting.extensions.telerik.axisMinimumValue", TelerikExtensions_ts_14.axisMinimumValue);
    shim("geocortex.charting.extensions.telerik.axisMaximumValue", TelerikExtensions_ts_14.axisMaximumValue);
    shim("geocortex.charting.extensions.telerik.ValueAxis", ValueAxis_ts_15.ValueAxis);
    shim("geocortex.charting.extensions.telerik.XAxis", XAxis_ts_16.XAxis);
    shim("geocortex.charting.extensions.telerik.YAxis", YAxis_ts_17.YAxis);
});


