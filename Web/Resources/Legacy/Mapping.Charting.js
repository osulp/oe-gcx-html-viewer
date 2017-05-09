/*
	
	Copyright (c) 2016, Latitude Geographics Group Ltd.
	All rights reserved.
	       
	Redistribution is not permitted. 
	
	Use in binary form, without modification, is permitted provided that neither 
	the name of the organization nor the names of its contributors may be used 
	to endorse or promote products derived from this software without specific 
	prior written permission.
	       
	THIS SOFTWARE IS PROVIDED BY COPYRIGHT HOLDER ''AS IS'' AND ANY
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL LATITUDE GEOGRAPHICS GROUP LTD. BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/* Begin Script: Mapping.Charting/mapping.charting_ts_out.js ------------------------- */ 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     *
                     */
                    var ChartPaneViewModel = (function (_super) {
                        __extends(ChartPaneViewModel, _super);
                        /**
                         * Initializes a new instance of the {@link ChartPaneViewModel} class.
                         * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
                         * @param libraryId The library Id
                        */
                        function ChartPaneViewModel(app, libraryId) {
                            _super.call(this, app, libraryId);
                            this.infrastructureLibraryId = "Charting";
                            this.title = new Observable("");
                            this.headerIsVisible = new Observable(true);
                            this.showXButton = new Observable(true);
                            this.showBusyIndicator = new Observable(false);
                            this.responsiveLegendPositioning = new Observable(false);
                            /** The chart being displayed in this pane. */
                            this.currentChart = new Observable(null);
                            /** Whether the pane should auto adjust the width and height to fill the available space in the parent container. */
                            this.autoSize = new Observable(false);
                            /** The height of the pane item. */
                            this.height = new Observable(0);
                            /** The width of the pane item. */
                            this.width = new Observable(0);
                            this.currentChart.bind(this, this._handleCurrentChartChanged);
                        }
                        ChartPaneViewModel.prototype.initialize = function (config) {
                            _super.prototype.initialize.call(this, config);
                            if (config) {
                                if (config.hasOwnProperty("infrastructureLibraryId")) {
                                    this.infrastructureLibraryId = config.infrastructureLibraryId;
                                }
                                if (config.hasOwnProperty("headerIsVisible")) {
                                    this.headerIsVisible.set(!!config.headerIsVisible);
                                }
                                if (config.hasOwnProperty("showXButton")) {
                                    this.showXButton.set(!!config.showXButton);
                                }
                            }
                        };
                        /**
                         * Sets the width and height of this pane.
                         * @param w The width.
                         * @param h The height.
                         */
                        ChartPaneViewModel.prototype.setSize = function (w, h) {
                            if (!isNaN(w) && !isNaN(h)) {
                                this.width.set(w);
                                this.height.set(h);
                            }
                        };
                        /**
                         * Override or attach to provide custom clean-up behaviour.
                         */
                        ChartPaneViewModel.prototype.onDestroy = function () {
                            _super.prototype.onDestroy.call(this);
                            this.currentChart.set(null);
                            this.currentChart = null;
                            this.app = null;
                        };
                        ChartPaneViewModel.prototype._handleCurrentChartChanged = function (value) {
                            this.title.set(value.displayName.get());
                        };
                        return ChartPaneViewModel;
                    }(geocortex.framework.ui.ViewModelBase));
                    charting.ChartPaneViewModel = ChartPaneViewModel;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/jquery.d.ts" />
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
/// <reference path="ChartPaneViewModel.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     * This class provides a single container view designed to host a {@link geocortex.charting.Chart}
                     */
                    var ChartPane = (function (_super) {
                        __extends(ChartPane, _super);
                        /**
                         * Initializes a new instance of the {@link geocortex.charting.Chart} class.
                         * @param app The {@link framework.application.Application} that this view belongs to.
                         * @param libraryId The library Id
                        */
                        function ChartPane(app, libraryId) {
                            _super.call(this, app, libraryId);
                            this._chartView = null;
                            this._isDestroyed = false;
                        }
                        /**
                         * Attaches a view model and performs data-binding.
                         * @param viewModel The view model to attach to this view.
                         */
                        ChartPane.prototype.attach = function (viewModel) {
                            var _this = this;
                            _super.prototype.attach.call(this, viewModel);
                            // Apply CSS positioning to the chart panel whenever the size is changed programmatically.
                            if (this.viewModel && this.containerElement) {
                                this.auto(this.viewModel.width, this, function (w) { return $(_this.containerElement).width(w); });
                                this.auto(this.viewModel.height, this, function (h) { return $(_this.containerElement).height(h); });
                            }
                        };
                        ChartPane.prototype.resolveWidget = function (widgetId, context, binding) {
                            if (context && widgetId === "ChartWidget") {
                                // Keep track of the view, in case datalinks get resolved later.
                                this._chartView = this.app.viewManager.createView({
                                    markupResource: "Charting/charting/Chart.html",
                                    typeName: "geocortex.charting.Chart",
                                    isVisible: true,
                                    libraryId: this.viewModel.infrastructureLibraryId || "Charting"
                                });
                                if (this.viewModel && this.viewModel.responsiveLegendPositioning.get()) {
                                    this._overrideLegendPosition(context);
                                }
                                // Attach the view to the view model. This will cause all of its binding expressions to be evaluated.
                                this._chartView.attach(context);
                                this.viewModel.showBusyIndicator.sync(this._chartView.isBusy);
                                return this._chartView;
                            }
                            return _super.prototype.resolveWidget.call(this, widgetId, context);
                        };
                        ChartPane.prototype.refresh = function () {
                            if (this.viewModel && this.viewModel.responsiveLegendPositioning.get() && this.viewModel.currentChart.get()) {
                                this._overrideLegendPosition(this.viewModel.currentChart.get());
                            }
                            if (this._chartView) {
                                this._chartView.updateLayout();
                            }
                        };
                        /**
                         * Clean up the chart while destroying this view.
                         */
                        ChartPane.prototype.destroy = function () {
                            _super.prototype.destroy.call(this);
                            if (this._chartView) {
                                this._chartView.destroy();
                            }
                            if (this.viewModel) {
                                this.viewModel.showBusyIndicator.removeSync();
                                this.viewModel.destroy();
                            }
                            this._chartView = null;
                            this.viewModel = null;
                            this.root = null;
                            this.app = null;
                            this._isDestroyed = true;
                        };
                        ChartPane.prototype.displayChart = function (chartViewModel) {
                            this.viewModel.currentChart.set(chartViewModel);
                            // Attach the view to the view model. This will cause all of its binding expressions to be re-evaluated.
                            var view = this._chartView;
                            if (view) {
                                view.destroyBindings();
                                view.attach(chartViewModel);
                                this.app.command("ActivateView").execute(view.id);
                            }
                        };
                        /**
                         * Invoked when the chart pane is closed.
                         * @event
                         */
                        ChartPane.prototype.onClose = function (chart) { };
                        ChartPane.prototype.handleClickClose = function (evt, el, ctx) {
                            if (this.viewModel && this.onClose) {
                                this.onClose(this.viewModel.currentChart.get());
                            }
                            if (!this._isDestroyed) {
                                // Destroying via command is more extensible than directly via the ViewManager.
                                this.app.command("DestroyView").execute(this.id);
                            }
                        };
                        ChartPane.prototype._overrideLegendPosition = function (chart) {
                            // Keep track of portrait/landscape mode
                            if (this.root && chart) {
                                var w = !!this.app.configuration.mobileMode ? $(window).width() : $(this.root).width();
                                var h = !!this.app.configuration.mobileMode ? $(window).height() : $(this.root).height();
                                var isLandscape = w > h;
                                var pos = geocortex.charting.ChartUtils.getResponsiveLegendPosition(chart, isLandscape);
                                // Auto-position the chart legend based on container dimensions
                                chart.legendPosition.set(pos);
                            }
                        };
                        return ChartPane;
                    }(geocortex.framework.ui.ViewBase));
                    charting.ChartPane = ChartPane;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     *
                     */
                    var ChartingModule = (function (_super) {
                        __extends(ChartingModule, _super);
                        function ChartingModule(app, libraryId) {
                            _super.call(this, app, libraryId);
                            this.infrastructureLibraryId = "Charting";
                            this._behavior = null;
                            this._savedBorderColor = null;
                            this._savedFillColor = null;
                            this._lookupTable = new mapping.infrastructure.Dictionary();
                            // Subscribe to chart mouse events here so the module can set things up before the charting commands
                            // are invoked via the configured behavior.
                            this._subscribeToEvents();
                        }
                        ChartingModule.prototype.initialize = function (config) {
                            var _this = this;
                            _super.prototype.initialize.call(this, config);
                            // This module depends on a different library (Charting.js) to be loaded before it can be properly initialized.
                            // Wrap the following code in a callback function that will be executed once all viewer libraries have been loaded.
                            var callback = function (innerConfig) {
                                if (innerConfig) {
                                    if (innerConfig.hasOwnProperty("infrastructureLibraryId")) {
                                        _this.infrastructureLibraryId = innerConfig.infrastructureLibraryId;
                                    }
                                }
                                // Create and register the ChartViewModelFactory instance
                                _this.initializeChartFactory();
                                // Register the commands and events handled by this module
                                _this._registerCommands();
                                // Load the chart point adapters
                                if (innerConfig && innerConfig.hasOwnProperty("adapters")) {
                                    _this._loadAdapters(innerConfig.adapters);
                                }
                                // Create a highlight layer for the features associated with a chart. This depends on the 
                                // Highlight module being initialized so we need to make sure the module is available before 
                                // creating the highlight layer.
                                var _command = _this.app.command("CreateHighlightLayer");
                                var layerName = ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME;
                                if (_command.canExecute(layerName)) {
                                    _command.execute(layerName);
                                }
                                else {
                                    // Wait until the highlight module is initialized
                                    var eventSubToken = _command.canExecuteChanged.subscribe(_this, function () {
                                        if (_command.canExecute(layerName)) {
                                            _command.canExecuteChanged.unsubscribe(eventSubToken);
                                            _command.execute(layerName);
                                        }
                                    });
                                }
                            };
                            this.doWhenLibrariesDownloaded(callback, config);
                        };
                        ChartingModule.prototype.getStateFilter = function () {
                            return {
                                results: {
                                    item: this.app.project.filter.featureSetCollection
                                },
                                displayedCharts: {
                                    item: true
                                }
                            };
                        };
                        ChartingModule.prototype.exportState = function () {
                            var _this = this;
                            var state = {
                                results: undefined,
                                displayedCharts: []
                            };
                            // Delegate to ChartingView.
                            return Promise.try(function () {
                                _this.app.command("_ExportChartingState").execute(state);
                                return state;
                            });
                        };
                        ChartingModule.prototype.applyState = function (state) {
                            var _this = this;
                            var args = {
                                state: state,
                                stateAppliedPromises: []
                            };
                            // Delegate to ChartingView.
                            return Promise.try(function () { return _this.app.command("_ApplyChartingState").execute(args); })
                                .then(function () { return Promise.all(args.stateAppliedPromises); })
                                .return();
                        };
                        /**
                         * Creates and registers the ChartViewModelFactory instance
                         */
                        ChartingModule.prototype.initializeChartFactory = function () {
                            var numberAndDateFormatter = new charting.FormatProvider();
                            var seriesProvider = new geocortex.charting.ChartSeriesProvider(this.app, this.infrastructureLibraryId);
                            var aggregator = new geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartPointCollectionFeatureAggregator();
                            aggregator.formatProvider = numberAndDateFormatter;
                            this.chartFactory = new geocortex.charting.ChartViewModelFactory(this.app, this.infrastructureLibraryId);
                            this.chartFactory.id = "ChartViewModelFactory";
                            this.chartFactory.initialize({
                                formatProvider: numberAndDateFormatter,
                                seriesProvider: seriesProvider,
                                aggregator: aggregator
                            });
                            this.app.registerFrameworkObject(this.chartFactory);
                        };
                        /**
                         * Performs some operation when the viewer finishes loading all the libraries, or
                         * immediately if the libraries have already been loaded.
                         * @param callback The callback function to execute.
                         * @param userState An object containing state information for this asynchronous operation.
                         */
                        ChartingModule.prototype.doWhenLibrariesDownloaded = function (callback, userState) {
                            var _this = this;
                            if (!callback) {
                                return;
                            }
                            if (this.app.allLibrariesLoaded) {
                                callback(userState);
                            }
                            else {
                                var token = this.app.event("ViewerLibrariesDownloadedEvent").subscribe(this, function () {
                                    _this.app.event("ViewerLibrariesDownloadedEvent").unsubscribe(token);
                                    callback(userState);
                                });
                            }
                        };
                        ChartingModule.prototype._registerCommands = function () {
                            this.app.command("RegisterChartPointAdapter").register(this, this._executeRegisterAdapter);
                            this.app.command("ClearChartHighlights").register(this, this._executeClearChartHighlights, this._canExecuteClearChartHighlights);
                            this.app.command("HighlightChartFeatureSet").register(this, this._executeHighlightChartFeatureSet, this._canExecuteHighlightChartFeatureSet);
                            this.app.command("RunChartFeatureActions").register(this, this._executeRunChartFeatureActions, this._isValidFeatureSet);
                        };
                        ChartingModule.prototype._subscribeToEvents = function () {
                            this.app.event("ChartPointMouseHoverBeginEvent").subscribe(this, this._chartPointMouseHoverBeginEventHandler);
                        };
                        /**
                         * Executes a command to register a chart data adapter if not already registered.
                         * @param adapter The chart data provider
                         */
                        ChartingModule.prototype._executeRegisterAdapter = function (args) {
                            if (!args.adapter) {
                                throw new Error("Cannot register a null chart data adapter.");
                            }
                            geocortex.charting.ChartPointAdapterRegistry.registerAdapter(args.adapter, args.sourceType);
                        };
                        /**
                         * ClearChartHighlights command implementation
                         */
                        ChartingModule.prototype._executeClearChartHighlights = function () {
                            this.app.command("SetActiveHighlightLayer").execute(ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME);
                            this.app.command("ClearHighlights").execute();
                            // Restore site-wide highlight color settings
                            if (this._savedFillColor) {
                                this.app.command("SetHighlightFillColor").execute(this._savedFillColor);
                            }
                            if (this._savedBorderColor) {
                                this.app.command("SetHighlightBorderColor").execute(this._savedBorderColor);
                            }
                        };
                        ChartingModule.prototype._canExecuteClearChartHighlights = function () {
                            return this.app.command("SetActiveHighlightLayer").canExecute(ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME)
                                && this.app.command("ClearHighlights").canExecute()
                                && this.app.command("SetHighlightFillColor").canExecute(undefined)
                                && this.app.command("SetHighlightBorderColor").canExecute(undefined);
                        };
                        /**
                         * HighlightChartFeatureSet command implementation
                         * @param parameter The feature set or chart point to operate on. Unofficially takes a ChartPointEventArgs for compatibility with Behaviors.
                         */
                        ChartingModule.prototype._executeHighlightChartFeatureSet = function (parameter) {
                            var featureSet = this._convertParameterToFeatureSet(parameter);
                            // Save current highlight color so that we can restore it later
                            this._savedBorderColor = this.app.highlightManager.getHighlightBorderColor();
                            this._savedFillColor = this.app.highlightManager.getHighlightFillColor();
                            this.app.command("SetActiveHighlightLayer").execute(ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME);
                            // Lookup the chart point that triggered this command
                            if (this._lookupTable.containsKey(featureSet.uniqueId)) {
                                var entry = this._lookupTable.get(featureSet.uniqueId);
                                var series = geocortex.charting.ChartUtils.findSeriesViewModelFromChartPoint(entry.chartPoint, entry.chartViewModel.seriesViewModels.getItems());
                                // Set new highlight colors to match the series color
                                if (series) {
                                    var borderColor = ChartingModule.DEFAULT_FILL_COLOR;
                                    var fillColor = ChartingModule.DEFAULT_BORDER_COLOR;
                                    if (series.distinctColor) {
                                        borderColor = series.distinctColor.toString(true);
                                        fillColor = geocortex.charting.ColorUtils.generateSelectionColor(series.distinctColor).toString(true);
                                    }
                                    else if (series.seriesDefinition && series.seriesDefinition.color) {
                                        borderColor = series.seriesDefinition.color.toString(true);
                                        fillColor = geocortex.charting.ColorUtils.generateSelectionColor(series.seriesDefinition.color).toString(true);
                                    }
                                    this.app.command("SetHighlightFillColor").execute(fillColor);
                                    this.app.command("SetHighlightBorderColor").execute(borderColor);
                                }
                            }
                            // Highlight features on mouse over
                            this.app.command("HighlightFeatureSet").execute(featureSet);
                        };
                        ChartingModule.prototype._canExecuteHighlightChartFeatureSet = function (parameter) {
                            var featureSet = this._convertParameterToFeatureSet(parameter);
                            return this.app.command("SetActiveHighlightLayer").canExecute(ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME)
                                && this.app.command("SetHighlightFillColor").canExecute(undefined)
                                && this.app.command("SetHighlightBorderColor").canExecute(undefined)
                                && this.app.command("HighlightFeatureSet").canExecute(featureSet);
                        };
                        ChartingModule.prototype._convertParameterToFeatureSet = function (parameter) {
                            var featureSet = null;
                            // FeatureSet might be sent as a ChartPointEventArgs - this is so behaviors work properly.
                            if (parameter instanceof geocortex.charting.eventArgs.ChartPointEventArgs) {
                                featureSet = charting.ChartUtils.getFeaturesFromChartPoint(parameter.chartPoint);
                            }
                            else if (parameter instanceof mapping.infrastructure.FeatureSet) {
                                featureSet = parameter;
                            }
                            return featureSet;
                        };
                        /**
                         * RunChartFeatureActions command implementation. In SLV this took a featureset, but in GVH this is always called in our code
                         * with a ChartPointEventArgs object. The lookup table may no longer be needed, since it is not really possible to run this command independently.
                         * @param parameter Either a featureset containing the clicked point, or a ChartPointEventArgs object.
                         */
                        ChartingModule.prototype._executeRunChartFeatureActions = function (parameter) {
                            var _this = this;
                            var featureSet = this._convertParameterToFeatureSet(parameter);
                            var chartViewModel;
                            // Get the chart view model from the event args if they are supplied, else use the lookup table.
                            if (parameter instanceof geocortex.charting.eventArgs.ChartPointEventArgs) {
                                chartViewModel = parameter.chartViewModel;
                            }
                            else {
                                if (this._lookupTable.containsKey(featureSet.uniqueId)) {
                                    var entry = this._lookupTable.get(featureSet.uniqueId);
                                    chartViewModel = entry.chartViewModel;
                                }
                            }
                            // If a view model was found, then run the appropriate actions
                            if (chartViewModel) {
                                var config = chartViewModel.chartDefinition.area;
                                if (config) {
                                    // GVH-4214 if Zoom is enabled for a chart, it will zoom (and pan) to the extent of 
                                    // all relevant features irrespective of Pan being enabled.
                                    if (config.actionZoom) {
                                        // Zoom Enabled
                                        this.app.command("ZoomToAllFeatures").execute(featureSet.features.getItems());
                                    }
                                    else if (config.actionPan) {
                                        // Only Pan Enabled
                                        this.app.command("PanToAllFeatures").execute(featureSet.features.getItems());
                                    }
                                    // Show feature details for first feature (if enabled in chart view model)
                                    if (config.actionFeatureDetails) {
                                        var firstFeature = featureSet.features.getAt(0);
                                        // GVH-10408: The charting view does not get deactivated when switching to feature details, so chart highlights must be removed here
                                        this.app.command("ClearChartHighlights").execute();
                                        // GVH-10408: On mobile, the event that triggers the dismissal of tooltips sometimes doesn't fire when switching views.
                                        if (!!this.app.configuration.mobileMode) {
                                            $(".k-chart").trigger("mouseout");
                                        }
                                        // Put this at the end of the event queue in case the chart is still cleaning up
                                        setTimeout(function () {
                                            _this.app.command("ShowFeatureDetails").execute(firstFeature);
                                        }, 0);
                                    }
                                    // Run command with configured parameter (if enabled in chart view model)
                                    if (config.actionRunCommand) {
                                        var commandName = config.commandName;
                                        var commandParam = config.commandParameter ? config.commandParameter : null;
                                        if (commandName) {
                                            this.app.command(commandName).execute(commandParam);
                                        }
                                    }
                                }
                            }
                            else {
                                // Log warning
                                this.app.trace.warning("Could not execute actions associated with clicking on a chart. Chart configuration not found.");
                            }
                        };
                        ChartingModule.prototype._isValidFeatureSet = function (parameter) {
                            var featureSet = this._convertParameterToFeatureSet(parameter);
                            return featureSet !== null && (featureSet instanceof mapping.infrastructure.FeatureSet) && featureSet.features.getLength() > 0;
                        };
                        /**
                         * Handler for ChartPointMouseHoverBeginEvent
                         */
                        ChartingModule.prototype._chartPointMouseHoverBeginEventHandler = function (args) {
                            // Get related FeatureSet from chart point; add it to our lookup table.
                            // Charting commands will use the lookup table to figure out the color of the highlight for a given FeatureSet.
                            if (args) {
                                var lookupEntry = {
                                    chartPoint: args.chartPoint,
                                    chartViewModel: args.chartViewModel
                                };
                                var fs = charting.ChartUtils.getFeaturesFromChartPoint(args.chartPoint);
                                if (fs) {
                                    this._lookupTable.set(fs.uniqueId, lookupEntry);
                                }
                            }
                        };
                        ChartingModule.prototype._loadAdapters = function (adapters) {
                            for (var i = 0; i < adapters.length; i++) {
                                var adapterConfig = adapters[i];
                                if (adapterConfig) {
                                    this._loadAdapter(adapterConfig);
                                }
                            }
                        };
                        ChartingModule.prototype._loadAdapter = function (entry) {
                            var ctor = dojo.getObject(entry.type);
                            if (ctor) {
                                // Initialize the adapter
                                var adapter = new ctor();
                                if (typeof adapter.initialize == "function") {
                                    adapter.initialize(entry.configuration);
                                }
                                // Register the chart point adapter
                                var commandArgs = {
                                    adapter: adapter,
                                    sourceType: entry.source || "Field"
                                };
                                this.app.command("RegisterChartPointAdapter").execute(commandArgs);
                            }
                        };
                        ChartingModule.DEFAULT_HIGHLIGHT_LAYER_NAME = "Charts";
                        ChartingModule.DEFAULT_FILL_COLOR = "#99ECEC3A";
                        ChartingModule.DEFAULT_BORDER_COLOR = "#FFCCCC33";
                        return ChartingModule;
                    }(geocortex.framework.application.ModuleBase));
                    charting.ChartingModule = ChartingModule;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     *
                     */
                    var ChartingViewModel = (function (_super) {
                        __extends(ChartingViewModel, _super);
                        function ChartingViewModel(app, libraryId) {
                            _super.call(this, app, libraryId);
                            /** Stores event subscription tokens so we can unsubscribe later */
                            this._handles = {
                                appEvents: [],
                                mapEvents: [],
                                fsEvents: []
                            };
                            /** Chart-specific configuration */
                            this._chartConfig = {
                                animationsEnabled: true,
                                gradientsEnabled: false,
                                interactiveLegendEnabled: false,
                                pieStartAngle: 180,
                                renderAs: "svg",
                                chartWidth: 0,
                                chartHeight: 0
                            };
                            /** The chart view model factory */
                            this._chartFactory = null;
                            /**
                             * Set to true to enable charts for search results; otherwise, set to false.
                             * The default is true.
                             */
                            this.enabled = true;
                            /**
                             * The featureset collection we are showing charts for.
                             */
                            this.featureSetCollection = new Observable();
                            /**
                             * The collection of available charts (ordered by the user in Manager).
                             */
                            this.charts = new ObservableCollection();
                            /**
                             * The collection of charts to display by default whenever the charting view is activated.
                             */
                            this.defaultCharts = new ObservableCollection();
                            /**
                             * The collection of charts currently being displayed in the charting view.
                             */
                            this.displayedCharts = new ObservableCollection();
                            /**
                             * Whether the charting view is expanded (active).
                             */
                            this.expanded = new Observable(false);
                            this.infrastructureLibraryId = "Charting";
                            this.headerIsVisible = new Observable(true);
                            this.showXButton = new Observable(true);
                            this.isGenerated = new Observable(false);
                            this.featureSetCollection.bind(this, this._handleCollectionChanged); // keep track of changes
                        }
                        ChartingViewModel.prototype.initialize = function (config) {
                            _super.prototype.initialize.call(this, config);
                            if (config) {
                                if (config.hasOwnProperty("chartingEnabled")) {
                                    this.enabled = !!config.chartingEnabled;
                                }
                                if (config.hasOwnProperty("infrastructureLibraryId")) {
                                    this.infrastructureLibraryId = config.infrastructureLibraryId;
                                }
                                if (config.hasOwnProperty("headerIsVisible")) {
                                    this.headerIsVisible.set(!!config.headerIsVisible);
                                }
                                if (config.hasOwnProperty("showXButton")) {
                                    this.showXButton.set(!!config.showXButton);
                                }
                                var chartConfig = config.chartConfiguration;
                                if (chartConfig) {
                                    if (chartConfig.hasOwnProperty("chartWidth")) {
                                        this._chartConfig.chartWidth = parseInt(chartConfig.chartWidth);
                                    }
                                    if (chartConfig.hasOwnProperty("chartHeight")) {
                                        this._chartConfig.chartHeight = parseInt(chartConfig.chartHeight);
                                    }
                                    if (chartConfig.hasOwnProperty("renderAs")) {
                                        this._chartConfig.renderAs = chartConfig.renderAs;
                                    }
                                    if (chartConfig.hasOwnProperty("animationsEnabled")) {
                                        this._chartConfig.animationsEnabled = !!chartConfig.animationsEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("gradientsEnabled")) {
                                        this._chartConfig.gradientsEnabled = !!chartConfig.gradientsEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("interactiveLegendEnabled")) {
                                        this._chartConfig.interactiveLegendEnabled = !!chartConfig.interactiveLegendEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("pieStartAngle")) {
                                        this._chartConfig.pieStartAngle = chartConfig.pieStartAngle;
                                    }
                                }
                            }
                            // Register commands and events
                            this._registerCommands();
                            this._subscribeEvents();
                        };
                        ChartingViewModel.prototype.refresh = function () {
                            this.featureSetCollection.pulse(); // triggers binding
                        };
                        /**
                         * Lazy-load the chart view model factory.
                         */
                        ChartingViewModel.prototype.getChartFactory = function () {
                            // "Import" the chart view model factory instance. It is initially created by the ChartingModule.
                            if (this._chartFactory === null) {
                                this._chartFactory = this.app.getFrameworkObjectById("ChartViewModelFactory");
                            }
                            return this._chartFactory;
                        };
                        /**
                         * Performs some operation when the chart data has finished generating, or immediately if the
                         * data has already been generated.
                         * @param callback The callback function to execute when the chart data is generated.
                         */
                        ChartingViewModel.prototype.doWhenChartGenerationCompleted = function (callback) {
                            var _this = this;
                            if (!callback) {
                                return;
                            }
                            if (this.isGenerated.get()) {
                                callback(this);
                            }
                            else {
                                var token = this.isGenerated.bind(this, function (value) {
                                    if (value) {
                                        _this.isGenerated.unbind(token);
                                        callback(_this);
                                    }
                                });
                            }
                        };
                        ChartingViewModel.prototype.applyChartOptions = function (chart) {
                            if (chart) {
                                chart.setOptions(this._chartConfig);
                            }
                        };
                        ChartingViewModel.prototype.findChartById = function (chartId) {
                            return geocortex.framework.utils.ArrayUtils.firstOrDefault(this.charts.getItems(), function (c) { return c.chartDefinition.id === chartId; });
                        };
                        ChartingViewModel.prototype.findDisplayedChartById = function (chartId) {
                            return geocortex.framework.utils.ArrayUtils.firstOrDefault(this.displayedCharts.getItems(), function (c) { return c.chartDefinition.id === chartId; });
                        };
                        /**
                         * Creates a chart view model.
                         * @param config The chart configuration.
                         */
                        ChartingViewModel.prototype.createChart = function (config) {
                            var chart = this.getChartFactory().createInstance(config.chartDefinition, config.chartFeatureType);
                            this.applyChartOptions(chart);
                            return chart;
                        };
                        /**
                         * Returns a delegate function that gets called to load data points into a chart.
                         * Defers loading chart points in memory until absolutely necessary (e.g. when a chart is added to the UI)
                         * @param chart The chart.
                         * @param featureSet The data source (a Geocortex FeatureSet).
                         */
                        ChartingViewModel.prototype.chartPointCollectionLoadDelegate = function (chart, featureSet) {
                            var _this = this;
                            // This is consumed by the LazyObservable on the first time that we request it's value
                            return function () {
                                if (_this.getChartFactory()) {
                                    return _this.getChartFactory().createChartPointCollection(chart.chartDefinition, featureSet, chart.chartFeatureType);
                                }
                                return null;
                            };
                        };
                        /**
                         * Responsible for rebuilding the chart point collection, which is used as the data for rendering charts.
                         * This method is called when the collection of interest changes.
                         */
                        ChartingViewModel.prototype.initializeCharts = function (featureSet) {
                            var _this = this;
                            // Don't generate anything if there are no features in the feature set or no charts configured in the Essentials layer
                            if (!featureSet || featureSet.features.isEmpty() || !featureSet.layer || !featureSet.layer.charts || featureSet.layer.charts.length == 0) {
                                return;
                            }
                            this.isGenerated.set(false);
                            // Select the id of charts that are already being tracked (so we don't add them again)
                            var exclusionList = this.charts.getItems().map(function (c) { return c.chartDefinition.id; });
                            // Select the charts from the layer associated with this FeatureSet that aren't already being managed. Add them to the charts collection
                            var newCharts = this._createCharts(featureSet.layer, exclusionList);
                            this.charts.addItems(newCharts);
                            // Remove charts corresponding to layers no longer in the current feature set collection
                            this.cleanup();
                            // Abort if no charts available
                            if (this.charts.getLength() == 0) {
                                this.defaultCharts.clear();
                                return;
                            }
                            // Setup the default chart(s). Default charts are automatically displayed whenever the charting container view is activated
                            var candidates = featureSet.layer.charts.filter(function (x) { return x.chartDefinition.visible && x.defaultChart && x.chartFeatureType == geocortex.charting.ChartFeatureType.MultiFeature; });
                            for (var i = 0; i < candidates.length; i++) {
                                var layerChartConfig = candidates[i];
                                var chartViewModel = geocortex.framework.utils.ArrayUtils.firstOrDefault(this.charts.getItems(), function (c) { return c.chartDefinition.id === layerChartConfig.id; });
                                // Add chart to defaultCharts collection (if not already there)
                                if (chartViewModel && !this.defaultCharts.contains(chartViewModel)) {
                                    this.defaultCharts.addItem(chartViewModel);
                                }
                            }
                            if (this.defaultCharts.getLength() == 0) {
                                this.defaultCharts.addItem(this.charts.getAt(0));
                            }
                            // If some charts contain data links, resolve the data links before we build the data set
                            var hasDataLinks = featureSet.layer.charts && featureSet.layer.charts.some(function (x) { return geocortex.charting.ChartUtils.containsDataLinks(x.chartDefinition); });
                            if (hasDataLinks) {
                                featureSet.doWhenDataLinkingCompleted(function (fs) {
                                    _this._buildChartPointCollections(fs);
                                    _this.isGenerated.set(true); // ... chart generation completed
                                });
                                return;
                            }
                            this._buildChartPointCollections(featureSet);
                            this.isGenerated.set(true); // ... chart generation completed
                        };
                        /**
                         * Remove charts if the corresponding layer is no longer visible and the chart is not currently being displayed.
                         */
                        ChartingViewModel.prototype.cleanup = function () {
                            if (this.featureSetCollection.get()) {
                                var layersInFsc = this.featureSetCollection.get().featureSets.getItems().map(function (fs) { return fs.layer; });
                                var i = this.charts.getLength();
                                while (i--) {
                                    var c = this.charts.getAt(i);
                                    if (!this.displayedCharts.contains(c) && (layersInFsc == null || !geocortex.framework.utils.ArrayUtils.contains(layersInFsc, c.tag))) {
                                        this.defaultCharts.removeItem(c);
                                        this.charts.removeAt(i);
                                    }
                                }
                            }
                        };
                        /**
                         * Triggers a data update for the charts displayed in the UI.
                         */
                        ChartingViewModel.prototype.updateDisplayedCharts = function () {
                            // ... force lazy observables to resolve
                            this.displayedCharts.get().forEach(function (chart) {
                                chart.chartPointCollection.get();
                            });
                        };
                        ChartingViewModel.prototype._registerCommands = function () {
                            this.app.command("SetCollectionOfInterest").register(this, this._executeChangeCollectionOfInterest);
                        };
                        ChartingViewModel.prototype._subscribeEvents = function () {
                            // Remove any existing handlers
                            this._disconnectAppEvents();
                            // Keep track of event subscriptions so we can unsubscribe later.
                            this._connectAppEvent("FSMCollectionChangedEvent", this._fsmCollectionChangedEventHandler);
                            this._connectAppEvent("FSMCollectionRemovedEvent", this._fsmCollectionRemovedEventHandler);
                        };
                        /**
                         * Update the charts when the observable featureset collection is set.
                         * <code>
                         *     this.featureSetCollection.set(...)
                         * </code>
                         */
                        ChartingViewModel.prototype._handleCollectionChanged = function (fsc) {
                            // Cleanup
                            this.cleanup();
                            this._disconnectFeatureSetChanges(fsc);
                            if (fsc && fsc.featureSets.getLength() > 0) {
                                // Initialize each FeatureSet if there's at least one chart on the respective layer
                                for (var i = 0; i < fsc.featureSets.getLength(); i++) {
                                    this.initializeCharts(fsc.featureSets.getAt(i));
                                }
                                // Watch for changes within the collection's feature sets
                                this._connectFeatureSetChanges(fsc);
                            }
                        };
                        /**
                         * Update the charts when the featureset collection changes (e.g. new feature sets are added to the collection)
                         * <code>
                         *     this.featureSetCollection.get().featureSets.add/remove/clear(...)
                         * </code>
                         */
                        ChartingViewModel.prototype._fsmCollectionChangedEventHandler = function (args) {
                            var _this = this;
                            if (this.featureSetCollection.get() && args && args.featureSetCollection && args.featureSetCollection.id == this.featureSetCollection.get().id) {
                                // Use a timeout to let the clear event finish and clear the underlying items.
                                if (args.collectionChangedEventArgs && (args.collectionChangedEventArgs.type === "clear" || args.collectionChangedEventArgs.type === "remove")) {
                                    setTimeout(function () {
                                        _this.featureSetCollection.set(args.featureSetCollection); // ... trigger binding
                                    }, 0);
                                }
                                else {
                                    this.featureSetCollection.set(args.featureSetCollection); // ... trigger binding
                                }
                            }
                        };
                        /**
                         * Update the charts when a feature set belonging to the active FSC changes.
                         * <code>
                         *     this.featureSetCollection.get().featureSets[i].features.add/remove/clear(...)
                         * </code>
                         */
                        ChartingViewModel.prototype._featureSetChanged = function (fscId, args) {
                            // TODO Implement
                        };
                        /** Cleanup when the FSC is removed from the FeatureSetManager */
                        ChartingViewModel.prototype._fsmCollectionRemovedEventHandler = function (args) {
                            // Clear the charts when going offline
                            if (this.featureSetCollection.get() && args && args.featureSetCollectionId && args.featureSetCollectionId == this.featureSetCollection.get().id) {
                                this._disconnectFeatureSetChanges();
                                this.featureSetCollection.set(null);
                            }
                        };
                        /**
                         * Creates and displays HTML5 charts for the feature set collection specified.
                         */
                        ChartingViewModel.prototype._executeChangeCollectionOfInterest = function (fscId) {
                            var fsc = this.app.featureSetManager.getCollectionById(fscId);
                            if (fsc && fsc !== this.featureSetCollection.get()) {
                                this._disconnectFeatureSetChanges();
                                this.featureSetCollection.set(fsc); // triggers binding
                            }
                        };
                        ChartingViewModel.prototype._createCharts = function (layer, exclusionList) {
                            if (exclusionList === void 0) { exclusionList = null; }
                            var charts = [];
                            if (layer && layer.charts) {
                                for (var i = 0; i < layer.charts.length; i++) {
                                    // We are only interested in visible, multi-feature charts
                                    var config = layer.charts[i];
                                    if (!config || !config.chartDefinition.id || !config.chartDefinition.visible || config.chartFeatureType != geocortex.charting.ChartFeatureType.MultiFeature) {
                                        continue;
                                    }
                                    // Skip charts already managed by this view model
                                    if (exclusionList && exclusionList.indexOf(config.chartDefinition.id) >= 0) {
                                        continue;
                                    }
                                    var newChart = this.createChart(config);
                                    newChart.tag = layer; // keep track of the layer
                                    charts.push(newChart);
                                }
                            }
                            return charts;
                        };
                        /** Generates point data for each chart configured on the layer */
                        ChartingViewModel.prototype._buildChartPointCollections = function (fs) {
                            var layerChartIds = fs.layer.charts.map(function (config) { return config.id; });
                            for (var i = 0; i < this.charts.getLength(); i++) {
                                // Ensure the chart belongs to the specified layer
                                var chart = this.charts.getAt(i);
                                if (!chart || !layerChartIds || layerChartIds.indexOf(chart.chartDefinition.id) < 0) {
                                    continue;
                                }
                                // GVH-4249 Only fetch new data from the data source when needed. Setup delegates for the lazy observable.
                                var delegate = this.chartPointCollectionLoadDelegate(chart, fs);
                                var lazy = chart.chartPointCollection;
                                lazy.clear();
                                lazy.delegateGetter = delegate;
                                lazy.cacheDelegateResults = true;
                            }
                            // Trigger a data update for the charts displayed in the UI.
                            if (this.expanded.get()) {
                                this.updateDisplayedCharts();
                            }
                        };
                        ChartingViewModel.prototype._connectAppEvent = function (eventName, handler) {
                            var token = this.app.event(eventName).subscribe(this, handler);
                            this._handles.appEvents.push({ eventName: eventName, token: token });
                        };
                        ChartingViewModel.prototype._disconnectAppEvents = function () {
                            if (this._handles.appEvents.length > 0) {
                                for (var i = 0; i < this._handles.appEvents.length; i++) {
                                    var sub = this._handles.appEvents[i];
                                    this.app.event(sub.eventName).unsubscribe(sub.token);
                                }
                            }
                            this._handles.appEvents.length = 0; // Clears the array
                        };
                        /**
                         * Only connects for handles that don't already exist.
                         */
                        ChartingViewModel.prototype._connectFeatureSetChanges = function (fsc) {
                            var _this = this;
                            for (var i = 0; i < fsc.featureSets.getLength(); i++) {
                                var fs = fsc.featureSets.getAt(i);
                                if (!this._handles.fsEvents.some(function (handle) { return handle.collection === fs.features; })) {
                                    var token = fs.features.bind(this, function (args) { return _this._featureSetChanged(fsc.id, args); });
                                    this._handles.fsEvents.push({ collection: fs.features, token: token });
                                }
                            }
                        };
                        /**
                         * Disconnect listeners for feature sets.
                         * @param fsc if specified, handlers will *not* be disconnected for feature sets contained within
                         */
                        ChartingViewModel.prototype._disconnectFeatureSetChanges = function (fsc) {
                            var featureSets = fsc ? fsc.featureSets.getRange(0) : null;
                            for (var i = 0; i < this._handles.fsEvents.length; i++) {
                                var handle = this._handles.fsEvents[i];
                                if (handle.collection && (!featureSets || !featureSets.some(function (fs) { return fs.features === handle.collection; }))) {
                                    handle.collection.unbind(handle.token);
                                    this._handles.fsEvents.splice(i, 1);
                                    i--;
                                }
                            }
                        };
                        return ChartingViewModel;
                    }(geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel));
                    charting.ChartingViewModel = ChartingViewModel;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/jquery.d.ts" />
/// <reference path="../../../_Definitions/Framework.d.ts" />
/// <reference path="../../../_Definitions/Framework.UI.d.ts" />
/// <reference path="../../../_Definitions/Charting.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
/// <reference path="ChartingViewModel.ts" />
/// <reference path="ChartPane.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     *
                     */
                    var ChartingView = (function (_super) {
                        __extends(ChartingView, _super);
                        function ChartingView(app, libraryId) {
                            _super.call(this, app, libraryId);
                            this._delayedResizeHandle = null;
                            this._panes = [];
                            this._activePanes = [];
                            this._registerCommandsAndEvents();
                        }
                        ChartingView.prototype._registerCommandsAndEvents = function () {
                            // Commands
                            this.app.command("ShowChartingView").register(this, this._executeShowChartingView, this._canExecuteShowChartingView);
                            this.app.command("DisplayChartById").register(this, this.addChartById, this._canExecuteDisplayChartById);
                            this.app.command("RemoveChartById").register(this, this.destroyChartById, this._canExecuteRemoveChartById);
                            this.app.command("ClearCharts").register(this, this.clearCharts, this._canExecuteClearCharts);
                            // Events
                            this.app.event("ApplicationResizedEvent").subscribe(this, this.handleApplicationResizedEvent);
                            this.app.event("ViewDimensionsChangedEvent").subscribe(this, this.handleViewDimensionsChangedEvent);
                            this.app.event("ViewHostedEvent").subscribe(this, this.handleViewHostedEvent);
                            this.app.event("ViewUnhostedEvent").subscribe(this, this.handleViewUnhostedEvent);
                            this.app.event("ViewActivatedEvent").subscribe(this, this.handleViewActivatedEvent);
                            this.app.event("ViewDeactivatedEvent").subscribe(this, this.handleViewDeactivatedEvent);
                            // GVH-7092 The charting view can be hosted within view containers (e.g. small shell) 
                            // If that's the case, we need to force a resize whenever a view container hosting this view is activated/deactivated.
                            this.app.event("ViewContainerActivatedEvent").subscribe(this, this.handleViewContainerActivatedEvent);
                            // Enable or disable the "Show Charts" toolbar button whenever the collection of interest changes.
                            this.app.event("FSMCollectionOpenedEvent").subscribe(this, this._enableOrDisableShowChartingView);
                            this.app.event("FSMCollectionChangedEvent").subscribe(this, this._enableOrDisableShowChartingView);
                            this.app.event("FSMCollectionAddedEvent").subscribe(this, this._enableOrDisableShowChartingView);
                            this.app.event("FSMCollectionRemovedEvent").subscribe(this, this._enableOrDisableShowChartingView);
                            // Internal commands used for saving and loading project state.
                            this.app.command("_ExportChartingState").register(this, this._exportState);
                            this.app.command("_ApplyChartingState").register(this, this._applyState);
                        };
                        ChartingView.prototype._enableOrDisableShowChartingView = function (args) {
                            this.app.command("ShowChartingView").raiseCanExecuteChanged();
                        };
                        ChartingView.prototype.resize = function () {
                            // View container view (base class) automatically sets the top value for scrollRegionElement. 
                            // We want to undo this for ChartingView as it causes charts to be too tall due to the container having wrong dimensions
                            _super.prototype.resize.call(this);
                            if (!geocortex.framework.utils.isNullOrUndefined(this.scrollRegionElement)) {
                                dojo.style(this.scrollRegionElement, "top", "");
                            }
                        };
                        /**
                         * Called when the view has been activated.
                         */
                        ChartingView.prototype.activated = function () {
                            _super.prototype.activated.call(this);
                            // GVH-4319: We have to wait for the view to finish activating before resizing everything, as the region hosting it 
                            // may not be done laying things out until after. Simply deferring the resize to the end of the call queue works.
                            if (this.viewModel) {
                                this.viewModel.expanded.set(true);
                                if (this.isActive === false) {
                                    this._delayedResizeHandle = this._delayedResizeContainer();
                                }
                            }
                            // GVH-7092 If this view is hosted in a ViewContainer, the `isActive` flag is not properly updated 
                            // when another view gets activated in the same container region.
                            this.isActive = true;
                        };
                        /**
                         * Called when the view has been deactivated.
                         */
                        ChartingView.prototype.deactivated = function () {
                            _super.prototype.deactivated.call(this);
                            if (this.viewModel) {
                                this.viewModel.expanded.set(false);
                            }
                            // GVH-7092 If this view is hosted in a ViewContainer, the `isActive` flag is not properly updated 
                            // when another view gets activated in the same container region.
                            this.isActive = false;
                            // Clear highlights and reset the highlight color to the default
                            this.app.command("ClearChartHighlights").execute();
                        };
                        /**
                         * Override this method to resolve widgets by ID and context. Return a {@geocortex.framework.config.WidgetConfig}, or null.
                         */
                        ChartingView.prototype.resolveWidget = function (widgetId, context, binding) {
                            var _this = this;
                            if (widgetId === "ChartSelector") {
                                this._selectorView = this.app.viewManager.createView({
                                    typeName: "geocortex.framework.ui.Selector.SelectorView",
                                    markupResource: "Framework.UI/geocortex/framework/ui/Selector/SelectorView.html",
                                    isVisible: true,
                                    title: this.app.getResource(this.libraryId, "language-feature-charts"),
                                    libraryId: "Framework.UI"
                                });
                                // Show native select only on mobile
                                this.selector = new geocortex.framework.ui.Selector.SelectorViewModel(this.app, this.libraryId, !!this.app.configuration.mobileMode, !!this.app.configuration.mobileMode);
                                this.selector.setCollection(this.viewModel.charts, "displayName", null);
                                this.selector.selectorText.set(this.app.getResource(this.libraryId, "language-charting-selector-text"));
                                this.selector.noItemsText.set(this.app.getResource(this.libraryId, "language-charting-no-items"));
                                this.selector.onSelectItem = function (item) { return _this.handleSelectChart(item.item); };
                                this.selector.onUnselectItem = function (item) { return _this.handleUnSelectChart(item.item); };
                                this._selectorView.attach(this.selector);
                                return this._selectorView;
                            }
                            return _super.prototype.resolveWidget.call(this, widgetId, context, null);
                        };
                        /**
                         * Adds the default chart(s) to the layout.
                         * Only runs if no other charts are currently shown in the container view.
                         */
                        ChartingView.prototype.addDefaultCharts = function () {
                            // Only show default chart(s) if no charts are displayed
                            if (this.viewModel.displayedCharts.getLength() > 0) {
                                return;
                            }
                            for (var i = 0; i < this.viewModel.defaultCharts.getLength(); i++) {
                                var chart = this.viewModel.defaultCharts.getAt(i);
                                this.addChart(chart);
                            }
                        };
                        /**
                         * Adds a chart with the specified Id to the layout by creating a new pane and loading the specified chart.
                         * @param chartId The Id of the chart to add.
                         */
                        ChartingView.prototype.addChartById = function (chartId) {
                            // Find the chart view model by Id and host it in a container
                            var chart = this.viewModel.findChartById(chartId);
                            this.addChart(chart);
                        };
                        /**
                         * Adds a chart to the layout by creating a new chart pane and loading the specified chart.
                         * @param chart The chart to be added to the layout.
                         */
                        ChartingView.prototype.addChart = function (chart) {
                            if (!chart || !this.canAddChart(chart)) {
                                return null;
                            }
                            // Show the container view (if not already active)
                            if (this.isActive === false) {
                                this.activateContainer();
                            }
                            // Update displayed pane items now so we don't recursively
                            // try to add it when creating the paneView.
                            this.viewModel.displayedCharts.addItem(chart);
                            this.app.command("ClearCharts").raiseCanExecuteChanged();
                            // Update selector checkboxes
                            if (this.selector && this.selector.hasItemViewModelFor(chart)) {
                                this.selector.selectItem(chart);
                            }
                            // Apply settings from viewer config
                            this.viewModel.applyChartOptions(chart);
                            // ... force lazy observable to resolve
                            chart.chartPointCollection.get();
                            var paneView = this._hostChartInPane(chart);
                            return paneView;
                        };
                        ChartingView.prototype.canAddChart = function (chart) {
                            if (chart && this.viewModel) {
                                return !this.viewModel.displayedCharts.contains(chart);
                            }
                            return false;
                        };
                        /**
                         * Removes a chart with the specified Id from the layout.
                         * @param chartId The Id of the chart to remove.
                         */
                        ChartingView.prototype.destroyChartById = function (chartId) {
                            // Find the chart view model by Id and remove it from the display collection (which is bound to the charting view)
                            var chart = this.viewModel.findDisplayedChartById(chartId);
                            this.destroyChart(chart);
                        };
                        /**
                         * Removes a chart from the layout.
                         * @param chart The chart to remove from the layout.
                         */
                        ChartingView.prototype.destroyChart = function (chart) {
                            if (!chart || !this.canDestroyChart(chart)) {
                                return false;
                            }
                            // Update displayed pane items now so we don't recursively
                            // try to remove it when destroying the paneView.
                            this.viewModel.displayedCharts.removeItem(chart);
                            this.app.command("ClearCharts").raiseCanExecuteChanged();
                            // Update selector checkboxes
                            if (this.selector && this.selector.hasItemViewModelFor(chart)) {
                                this.selector.unselectItem(chart);
                            }
                            // Destroy the lazy chart point collection. It's got tons of data...
                            chart.destroyChartPoints();
                            this.viewModel.cleanup();
                            // Destroy the pane holding this chart
                            var chartPane = this.findChartPaneForViewModel(chart);
                            if (chartPane) {
                                // ... trigger resize.
                                this.app.command("DestroyView").execute(chartPane.id);
                                return true;
                            }
                            else {
                                this.app.trace.warning("Could not destroy chart '{0}': Chart not found.".format(chart.chartId.get()));
                                return false;
                            }
                        };
                        ChartingView.prototype.canDestroyChart = function (chart) {
                            if (chart && this.viewModel) {
                                return this.viewModel.displayedCharts.contains(chart);
                            }
                            return false;
                        };
                        /**
                         * Removes all charts from the charting container view.
                         */
                        ChartingView.prototype.clearCharts = function () {
                            var i = this.viewModel.displayedCharts.getLength();
                            while (i--) {
                                var chartToRemove = this.viewModel.displayedCharts.getAt(i);
                                this.destroyChart(chartToRemove);
                            }
                        };
                        ChartingView.prototype.handleSelectChart = function (chart) {
                            this.addChart(chart);
                        };
                        ChartingView.prototype.handleUnSelectChart = function (chart) {
                            this.destroyChart(chart);
                        };
                        ChartingView.prototype.handleClickClose = function (evt, el, ctx) {
                            // ViewContainerView has some wacky logic to close/destroy the "currentView" in the container.
                            // The charting container uses a div stack region to show multiple views at once so "currentView" doesn't apply here.
                            // Do not call super.handleClickClose() or else weird things happen when this container is dismissed and then expanded again.
                            this.deactivateContainer();
                        };
                        /**
                         * Handles a chart pane being hosted within the region this container contains.
                         */
                        ChartingView.prototype.handleViewHostedEvent = function (args) {
                            // Was a chart pane activated (or hosted)? Re-layout.
                            if (this.viewModel && args.region.name === this.viewModel.regionName.get() && !geocortex.framework.utils.ArrayUtils.contains(this._panes, args.view)) {
                                // Keep track of chart panes and view models
                                this._panes.push(args.view);
                            }
                        };
                        /**
                         * Handles a chart pane being unhosted from the region this container contains.
                         */
                        ChartingView.prototype.handleViewUnhostedEvent = function (args) {
                            // Was a chart pane deactivated (or destroyed)? Re-layout.
                            if (this.viewModel && args.region.name === this.viewModel.regionName.get() && geocortex.framework.utils.ArrayUtils.contains(this._panes, args.view)) {
                                geocortex.framework.utils.ArrayUtils.removeItem(this._panes, args.view);
                                // If the pane was unhosted, it will likely have been deactivated and thus removed from the active collection.
                                // We'll ensure it was removed, just to be safe.
                                geocortex.framework.utils.ArrayUtils.removeItem(this._activePanes, args.view);
                            }
                        };
                        /**
                         * Handles a chart pane being activated.
                         */
                        ChartingView.prototype.handleViewActivatedEvent = function (view) {
                            if (!view || !this.viewModel) {
                                return;
                            }
                            // We are only interested in views that this container is currently tracking
                            var region = this.app.viewManager.getRegionForViewId(view.id);
                            if (region && region.name === this.viewModel.regionName.get()) {
                                var isBeingTracked = geocortex.framework.utils.ArrayUtils.contains(this._panes, view);
                                var isActive = geocortex.framework.utils.ArrayUtils.contains(this._activePanes, view);
                                // Was a chart pane activated (or hosted)? Re-layout.
                                if (isBeingTracked && !isActive) {
                                    this._activePanes.push(view);
                                    this._resizeContainer();
                                }
                            }
                        };
                        /**
                         * Handles a chart pane being deactivated.
                         */
                        ChartingView.prototype.handleViewDeactivatedEvent = function (view) {
                            if (!view || !this.viewModel) {
                                return;
                            }
                            // We are only interested in views that this container is currently tracking
                            var region = this.app.viewManager.getRegionForViewId(view.id);
                            if (region && region.name === this.viewModel.regionName.get()) {
                                var isBeingTracked = geocortex.framework.utils.ArrayUtils.contains(this._panes, view);
                                var isActive = geocortex.framework.utils.ArrayUtils.contains(this._activePanes, view);
                                // Was a chart pane deactivated (or unhosted)? Re-layout.
                                if (isBeingTracked && isActive) {
                                    geocortex.framework.utils.ArrayUtils.removeItem(this._activePanes, view);
                                    this._resizeContainer();
                                }
                            }
                        };
                        ChartingView.prototype.handleViewDimensionsChangedEvent = function (args) {
                            // We only want to resize when the shell emits this event.
                            // Otherwise we're doing the exact same work that an application resize does.
                            if (args.view.id === "ShellView") {
                                this._resizeContainer();
                            }
                        };
                        ChartingView.prototype.handleApplicationResizedEvent = function () {
                            this._resizeContainer();
                        };
                        /**
                         * Resizes the charting view when it is hosted within a ViewContainerView
                         */
                        ChartingView.prototype.handleViewContainerActivatedEvent = function (container) {
                            if (this.isActive && this._isViewHostedInContainer(container)) {
                                this._cancelDelayedResizeContainer();
                                this._delayedResizeContainer();
                            }
                        };
                        /**
                         * If this view is hosted within a ViewContainer (and it's currently active), we want to notify listeners that
                         * the container has been activated or deactivated.
                         * NOTE: Child views hosted within a ViewContainerView are not activated/deactivated when the container is
                         * activated/deactivated so this gives someone a chance to know that a view has been "hidden" because its
                         * container was deactivated.
                         */
                        ChartingView.prototype._isViewHostedInContainer = function (container) {
                            if (container instanceof geocortex.framework.ui.ViewContainer.ViewContainerView) {
                                var containerRegion = container.viewModel.regionName.get();
                                var region = this.app.viewManager.getRegionForViewId(this.id);
                                // If the view's region matches the container region, then fire the event to notify the visibility change.
                                if (region && region.name === containerRegion) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        ChartingView.prototype._cancelDelayedResizeContainer = function () {
                            if (this._delayedResizeHandle) {
                                this._delayedResizeHandle.stop();
                            }
                            this._delayedResizeHandle = null;
                        };
                        ChartingView.prototype._delayedResizeContainer = function () {
                            this._delayedResizeHandle = new geocortex.framework.utils.TimeDelayedAction(0, this._resizeContainer, this);
                            this._delayedResizeHandle.start();
                            return this._delayedResizeHandle;
                        };
                        ChartingView.prototype._resizeContainer = function (force) {
                            if (force === void 0) { force = false; }
                            this._cancelDelayedResizeContainer();
                            if (!this.viewModel) {
                                return;
                            }
                            // Only re-layout when the container view is active
                            if (this.isActive === false || this._active === false) {
                                return;
                            }
                            var isStack = this.viewModel.regionType.get().indexOf("Stack") > -1;
                            var chartingArea = this.scrollRegionElement;
                            var chartElements = $(".view.active .chart-pane", chartingArea);
                            if (!isStack || chartElements.length === 0) {
                                return;
                            }
                            // Note: $(chartingArea).width() does not factor in the scrollbar.
                            var horizMargin = 2;
                            var vertMargin = this.headerElement.clientHeight;
                            var containerWidth = chartingArea.clientWidth;
                            var containerHeight = chartingArea.clientHeight;
                            // Calculate the dimensions for pane items hosted within this container
                            var w = Math.floor((containerWidth / chartElements.length) - horizMargin);
                            var h = containerHeight;
                            // Resize the panels, redraw the charts to accommodate the new size
                            for (var i = 0; i < this._panes.length; i++) {
                                var pane = this._panes[i];
                                if (pane && pane.viewModel) {
                                    pane.viewModel.setSize(w, h);
                                    pane.refresh();
                                }
                            }
                        };
                        ChartingView.prototype.findChartPaneForViewModel = function (chart) {
                            return geocortex.framework.utils.ArrayUtils.firstOrDefault(this._panes, function (x) { return x && x.viewModel && x.viewModel.currentChart.get() === chart; });
                        };
                        ChartingView.prototype._hostChartInPane = function (chart) {
                            var _this = this;
                            var paneViewModel = new charting.ChartPaneViewModel(this.app, this.libraryId);
                            paneViewModel.id = "ChartPaneViewModel-" + geocortex.framework.utils.alphaNumericToken();
                            paneViewModel.currentChart.set(chart);
                            // Automatic positioning of the legend on multi-feature charts is for handheld shell only
                            paneViewModel.responsiveLegendPositioning.set(!!this.app.configuration.mobileMode);
                            paneViewModel.initialize({
                                title: chart.chartDefinition.displayName,
                                infrastructureLibraryId: this.viewModel.infrastructureLibraryId,
                                headerIsVisible: this.viewModel.headerIsVisible.get(),
                                showXButton: this.viewModel.showXButton.get()
                            });
                            var pane = this.app.viewManager.createView({
                                typeName: "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartPane",
                                markupResource: "Mapping.Charting/modules/Charting/ChartPane.html",
                                libraryId: this.libraryId || "Mapping.Charting",
                                title: this.app.getResource(this.libraryId, "language-feature-charts"),
                                regionName: this.viewModel.regionName.get(),
                                isVisible: true,
                                viewModel: paneViewModel // ...trigger bindings
                            });
                            // Update the view model and selector whenever a chart pane is closed via the "X"
                            pane.onClose = function (x) { return _this.destroyChart(x); };
                            return pane;
                        };
                        ChartingView.prototype._executeShowChartingView = function () {
                            this.addDefaultCharts();
                            this.viewModel.updateDisplayedCharts();
                            // Show the container view (if not already active)
                            if (this.isActive === false) {
                                this.activateContainer();
                            }
                        };
                        ChartingView.prototype._canExecuteShowChartingView = function () {
                            if (this.viewModel && this.viewModel.featureSetCollection.get()) {
                                var i = this.viewModel.featureSetCollection.get().featureSets.getLength();
                                while (i--) {
                                    var fs = this.viewModel.featureSetCollection.get().featureSets.getAt(i);
                                    if (!fs.features || !fs.layer || !fs.layer.charts) {
                                        continue;
                                    }
                                    if (fs.layer.charts.some(function (cfg) { return cfg.chartDefinition.visible && cfg.chartFeatureType === geocortex.charting.ChartFeatureType.MultiFeature; })) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                        ChartingView.prototype._canExecuteDisplayChartById = function (chartId) {
                            return this.viewModel && this.canAddChart(this.viewModel.findChartById(chartId));
                        };
                        ChartingView.prototype._canExecuteRemoveChartById = function (chartId) {
                            return this.viewModel && this.canDestroyChart(this.viewModel.findDisplayedChartById(chartId));
                        };
                        ChartingView.prototype._canExecuteClearCharts = function () {
                            return this.viewModel && this.viewModel.displayedCharts.getLength() > 0;
                        };
                        ChartingView.prototype._exportState = function (state) {
                            state.results = this.app.project.convert.fromGcxFeatureSetCollection(this.viewModel.featureSetCollection.get());
                            state.displayedCharts = this.viewModel.displayedCharts.get().map(function (c) { return c.chartId.get(); });
                        };
                        ChartingView.prototype._applyState = function (args) {
                            var _this = this;
                            args.stateAppliedPromises.push(this.app.project.convert.toGcxFeatureSetCollection(args.state.results).then(function (results) {
                                _this.viewModel.featureSetCollection.set(results);
                                _this.clearCharts();
                                var displayedCharts = args.state.displayedCharts || [];
                                displayedCharts.forEach(function (chartId) {
                                    _this.addChartById(chartId);
                                });
                            }));
                        };
                        return ChartingView;
                    }(geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView));
                    charting.ChartingView = ChartingView;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    var ChartPointCollectionFeatureAggregator = (function (_super) {
                        __extends(ChartPointCollectionFeatureAggregator, _super);
                        function ChartPointCollectionFeatureAggregator() {
                            _super.apply(this, arguments);
                        }
                        ChartPointCollectionFeatureAggregator.prototype.attachAttributes = function (item, group) {
                            _super.prototype.attachAttributes.call(this, item, group);
                            if (group && group.items && group.items.length > 0) {
                                var firstFeature = this._getFeatureFromChartPoint(group.items[0]);
                                var layer = firstFeature ? firstFeature.layer : null;
                                var fArray = [];
                                for (var i = 0; i < group.items.length; i++) {
                                    var f = this._getFeatureFromChartPoint(group.items[i]);
                                    if (f !== null && f instanceof mapping.infrastructure.Feature) {
                                        fArray.push(f);
                                    }
                                }
                                var featureSet = new mapping.infrastructure.FeatureSet({ layer: layer });
                                featureSet.features.addItems(fArray);
                                // Keep track of the underlying features when performing aggregation
                                item.attributes = item.attributes || {};
                                item.attributes["features"] = featureSet;
                            }
                        };
                        ChartPointCollectionFeatureAggregator.prototype._getFeatureFromChartPoint = function (cp) {
                            if (cp && cp.attributes && cp.attributes.hasOwnProperty("feature")) {
                                return cp.attributes["feature"];
                            }
                            return null;
                        };
                        return ChartPointCollectionFeatureAggregator;
                    }(geocortex.charting.aggregation.ChartPointCollectionAggregator));
                    charting.ChartPointCollectionFeatureAggregator = ChartPointCollectionFeatureAggregator;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    var ChartUtils = (function () {
                        function ChartUtils() {
                        }
                        /**
                         * Finds a {@link infrastructure.DataLinkingResult} object by Id for a given {@link infrastructure.Feature}.
                         */
                        ChartUtils.findDataLinkingResultById = function (feature, dataLinkId) {
                            if (feature && feature.layer && feature.dataLinkingResults) {
                                // GVH-9110: If the datalink and chart config come from a parent site we won't have the right datalink id. Look up the datalink as a site resource to find it.
                                var dataLink = geocortex.essentials.utilities.SiteResourceIdComparer.lookUp(feature.layer.dataLinks, dataLinkId);
                                if (dataLink) {
                                    return geocortex.framework.utils.ArrayUtils.firstOrDefault(feature.dataLinkingResults.getItems(), function (dl) { return dl != null && dl.dataLink.get().id === dataLink.id; });
                                }
                            }
                            return null;
                        };
                        /**
                         * Gets the features contained in a single chart point.
                         * @param chartPoint The chart point.
                         */
                        ChartUtils.getFeaturesFromChartPoint = function (chartPoint) {
                            var fs = null;
                            if (chartPoint && chartPoint.attributes) {
                                if (chartPoint.attributes.hasOwnProperty("feature")) {
                                    var feature = chartPoint.attributes["feature"];
                                    if (feature !== null && feature instanceof mapping.infrastructure.Feature) {
                                        fs = new mapping.infrastructure.FeatureSet({ layer: feature.layer });
                                        fs.features.addItem(feature);
                                    }
                                }
                                else if (chartPoint.attributes.hasOwnProperty("features")) {
                                    fs = chartPoint.attributes["features"];
                                }
                            }
                            return fs;
                        };
                        /**
                         * Creates a sort function delegate according to a specified key selector function.
                         * This is typically used so we can have chart selection dropdowns ordered by display name.
                         * @param keySelector A function to extract the key for each element.
                         */
                        ChartUtils.createCompareFunction = function (keySelector) {
                            return function (left, right) {
                                var keyLeft = keySelector(left);
                                var keyRight = keySelector(right);
                                if (keyLeft === keyRight) {
                                    return 0;
                                }
                                return (keyLeft > keyRight) ? 1 : -1;
                            };
                        };
                        /**
                         * Applies various configuration options to a chart.
                         * @param chart The {@link geocortex.charting.ChartViewModel} instance.
                         * @param options The settings to apply.
                         */
                        ChartUtils.applyChartOptions = function (chart, options) {
                            if (chart && options) {
                                chart.setOptions(options);
                            }
                        };
                        return ChartUtils;
                    }());
                    charting.ChartUtils = ChartUtils;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
/// <reference path="ChartUtils.ts"/>
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     * Represents an adapter class to transform external data into points of data in a Geocortex chart.
                     */
                    var DataLinkChartPointAdapter = (function (_super) {
                        __extends(DataLinkChartPointAdapter, _super);
                        function DataLinkChartPointAdapter() {
                            _super.apply(this, arguments);
                        }
                        DataLinkChartPointAdapter.prototype.fill = function (collection, source, options) {
                            if (!options || !options.chartCategory || !options.chartSeries) {
                                return;
                            }
                            if (!source || !(source instanceof mapping.infrastructure.FeatureSet) || source.features.getLength() == 0) {
                                return;
                            }
                            if (!collection) {
                                collection = new geocortex.charting.ChartPointCollection();
                            }
                            // Get the first datalink
                            // Note: All features will have a DataLinkingResults field, even if there are none attached to that particular feature
                            var firstFeature = source.features.getAt(0);
                            var dataLinkResult = charting.ChartUtils.findDataLinkingResultById(firstFeature, options.chartSeries.field.dataLinkId);
                            // Case 1: Field Source is a One-to-Many Datalink
                            if (dataLinkResult && !dataLinkResult.dataLink.get().isOneToOne) {
                                switch (options.chartFeatureType) {
                                    case geocortex.charting.ChartFeatureType.SingleFeature:
                                        this._fillFromDataLink(collection, firstFeature, dataLinkResult, options);
                                        break;
                                    case geocortex.charting.ChartFeatureType.MultiFeature:
                                        for (var i = 0; i < source.features.getLength(); i++) {
                                            var feature = source.features.getAt(i);
                                            dataLinkResult = charting.ChartUtils.findDataLinkingResultById(feature, options.chartSeries.field.dataLinkId);
                                            if (dataLinkResult) {
                                                this._fillFromDataLink(collection, feature, dataLinkResult, options);
                                            }
                                        }
                                        break;
                                }
                            }
                            else {
                                for (var ix = 0; ix < source.features.getLength(); ix++) {
                                    var feature = source.features.getAt(ix);
                                    // Only get the first row - we're assuming that this is a one-to-one data link
                                    var chartPoint = this.createChartPoint(feature, options, null);
                                    if (chartPoint) {
                                        collection.items.push(chartPoint);
                                    }
                                }
                            }
                            if (collection.items.length === 0) {
                            }
                        };
                        DataLinkChartPointAdapter.prototype.createChartPoint = function (sourceItem, options, userState) {
                            if (userState === void 0) { userState = null; }
                            if (!options || !options.chartCategory || !options.chartSeries) {
                                return null;
                            }
                            if (options.chartType == null || typeof options.chartType === "undefined") {
                                options.chartType = geocortex.charting.ChartType.Linear;
                            }
                            var seriesFieldValue = this.getFieldValue(options.chartSeries.field, sourceItem, userState);
                            var categoryFieldValue = null;
                            // If a category has been set, then try and grab the datalink value
                            switch (options.chartType) {
                                case geocortex.charting.ChartType.Linear:
                                    categoryFieldValue = geocortex.charting.ChartUtils.tryGetFieldValue(options.chartCategory.field, sourceItem, userState);
                                    break;
                                case geocortex.charting.ChartType.Pie:
                                    break;
                            }
                            return this.createChartPointCore(sourceItem, options.chartSeries.title, seriesFieldValue, categoryFieldValue, options, userState);
                        };
                        DataLinkChartPointAdapter.prototype.getFieldValue = function (fieldDefinition, sourceItem, userState) {
                            if (userState === void 0) { userState = null; }
                            var feature = sourceItem;
                            var dataLinkResult = userState ? userState.dataLink : null;
                            var dataLinkRow = userState ? userState.dataLinkRow : null;
                            // Ensure we are dealing with the right source type
                            if (!feature || !(feature instanceof mapping.infrastructure.Feature)) {
                                return null;
                            }
                            if (!fieldDefinition || fieldDefinition.sourceType != geocortex.charting.ChartFieldSourceType.DataLink) {
                                return null;
                            }
                            // Lookup the data link by id if none specified
                            if (!dataLinkResult) {
                                dataLinkResult = charting.ChartUtils.findDataLinkingResultById(feature, fieldDefinition.dataLinkId);
                                dataLinkRow = null; // Clearing out the data link row will default to first row
                            }
                            if (!dataLinkResult || !dataLinkResult.table.get()) {
                                return null;
                            }
                            // Get the table for the specified data link
                            var table = dataLinkResult.table.get();
                            if (table && table.rows.length > 0) {
                                // Default to first row if no data link row is supplied
                                if (!dataLinkRow) {
                                    dataLinkRow = table.rows[0];
                                }
                                // Get the index of the specified field
                                var index = table.columns.indexOf(fieldDefinition.name);
                                if (index > -1) {
                                    return dataLinkRow.row[index];
                                }
                            }
                            return null;
                        };
                        DataLinkChartPointAdapter.prototype._fillFromDataLink = function (collection, feature, dataLinkResult, options) {
                            if (!feature || !dataLinkResult) {
                                return;
                            }
                            if (!collection) {
                                collection = new geocortex.charting.ChartPointCollection();
                            }
                            var table = dataLinkResult.table.get();
                            if (!table || table.columns.length == 0) {
                                return;
                            }
                            for (var j = 0; j < table.rows.length; j++) {
                                var userState = {
                                    dataLink: dataLinkResult,
                                    dataLinkRow: table.rows[j]
                                };
                                var chartPoint = this.createChartPoint(feature, options, userState);
                                if (chartPoint) {
                                    collection.items.push(chartPoint);
                                }
                            }
                        };
                        DataLinkChartPointAdapter.prototype.attachAttributes = function (item, sourceItem, options, userState) {
                            if (userState === void 0) { userState = null; }
                            _super.prototype.attachAttributes.call(this, item, sourceItem, options, userState);
                            // Keep track of the underlying feature associated with this chart point
                            if (item && sourceItem && sourceItem instanceof mapping.infrastructure.Feature) {
                                item.attributes = item.attributes || {};
                                item.attributes["feature"] = sourceItem;
                            }
                        };
                        return DataLinkChartPointAdapter;
                    }(geocortex.charting.ChartPointAdapterBase));
                    charting.DataLinkChartPointAdapter = DataLinkChartPointAdapter;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
/// <reference path="ChartUtils.ts"/>
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    /**
                     * Represents an adapter class to transform external data into points of data in a Geocortex chart.
                     */
                    var FeatureChartPointAdapter = (function (_super) {
                        __extends(FeatureChartPointAdapter, _super);
                        function FeatureChartPointAdapter() {
                            _super.apply(this, arguments);
                        }
                        FeatureChartPointAdapter.prototype.fill = function (collection, source, options) {
                            if (!options || !options.chartCategory || !options.chartSeries) {
                                return;
                            }
                            if (!source || !(source instanceof mapping.infrastructure.FeatureSet)) {
                                return;
                            }
                            if (!collection) {
                                collection = new geocortex.charting.ChartPointCollection();
                            }
                            for (var j = 0; j < source.features.getLength(); j++) {
                                var feature = source.features.getAt(j);
                                // We don't want invalid points
                                var chartPoint = this.createChartPoint(feature, options);
                                if (chartPoint) {
                                    collection.items.push(chartPoint);
                                }
                            }
                            if (collection.items.length === 0) {
                            }
                        };
                        FeatureChartPointAdapter.prototype.createChartPoint = function (sourceItem, options, userState) {
                            if (userState === void 0) { userState = null; }
                            if (!options || !options.chartCategory || !options.chartSeries) {
                                return null;
                            }
                            if (options.chartType == null || typeof options.chartType === "undefined") {
                                options.chartType = geocortex.charting.ChartType.Linear;
                            }
                            var seriesFieldValue = this.getFieldValue(options.chartSeries.field, sourceItem, userState);
                            var categoryFieldValue = null;
                            // If a category has been set, then try and grab the field value
                            switch (options.chartType) {
                                case geocortex.charting.ChartType.Linear:
                                    categoryFieldValue = geocortex.charting.ChartUtils.tryGetFieldValue(options.chartCategory.field, sourceItem, userState);
                                    break;
                                case geocortex.charting.ChartType.Pie:
                                    break;
                            }
                            return this.createChartPointCore(sourceItem, options.chartSeries.title, seriesFieldValue, categoryFieldValue, options, userState);
                        };
                        FeatureChartPointAdapter.prototype.getFieldValue = function (fieldDefinition, sourceItem, userState) {
                            if (userState === void 0) { userState = null; }
                            var feature = sourceItem;
                            // Ensure we are dealing with the right source type
                            if (!feature || !(feature instanceof mapping.infrastructure.Feature)) {
                                return null;
                            }
                            if (!fieldDefinition || fieldDefinition.sourceType != geocortex.charting.ChartFieldSourceType.Field) {
                                return null;
                            }
                            // The field might have an alias, so we need to get the FeatureAttribute object
                            var featureAttribute;
                            if (feature.attributes) {
                                for (var i = 0; i < feature.attributes.getLength(); i++) {
                                    var attr = feature.attributes.getAt(i);
                                    if (attr.name.get() == fieldDefinition.name) {
                                        featureAttribute = attr;
                                        break;
                                    }
                                }
                            }
                            // Check the aliased field first
                            if (featureAttribute) {
                                return this._normalizeAttribute(featureAttribute.value.get(), featureAttribute.type.get());
                            }
                            // Check the field name on the underlying Esri feature
                            var esriFeature = feature.esriFeature.get();
                            if (esriFeature && esriFeature.attributes) {
                                return esriFeature.attributes[fieldDefinition.name];
                            }
                            return null;
                        };
                        FeatureChartPointAdapter.prototype.attachAttributes = function (item, sourceItem, options, userState) {
                            if (userState === void 0) { userState = null; }
                            _super.prototype.attachAttributes.call(this, item, sourceItem, options, userState);
                            // Keep track of the underlying feature associated with this chart point
                            if (item && sourceItem && sourceItem instanceof mapping.infrastructure.Feature) {
                                item.attributes = item.attributes || {};
                                item.attributes["feature"] = sourceItem;
                            }
                        };
                        FeatureChartPointAdapter.prototype._normalizeAttribute = function (value, dataType) {
                            if (dataType) {
                                if (dataType.toLowerCase() === "DateTime".toLowerCase()) {
                                    if (typeof value === "number") {
                                        var date = new Date(value);
                                        // If not parsed correctly, try to convert epoch value to integer before creating Date
                                        if (date == "Invalid Date") {
                                            date = new Date(parseInt(value.toString()));
                                        }
                                        return date;
                                    }
                                    if (typeof value === "string") {
                                        var timestamp = Date.parse(value);
                                        if (typeof timestamp === "number") {
                                            return new Date(timestamp);
                                        }
                                    }
                                }
                                else if (["single", "double", "float"].indexOf(dataType.toLowerCase()) > -1) {
                                    return parseFloat(value);
                                }
                                else if (["int32", "short"].indexOf(dataType.toLowerCase()) > -1) {
                                    return parseInt(value);
                                }
                            }
                            return value;
                        };
                        return FeatureChartPointAdapter;
                    }(geocortex.charting.ChartPointAdapterBase));
                    charting.FeatureChartPointAdapter = FeatureChartPointAdapter;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    var FormatUtils = geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils;
                    var TimeZoneUtils = geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils;
                    /**
                     * Defines a method that supports custom formatting of the value of an object.
                     */
                    var FormatProvider = (function () {
                        function FormatProvider() {
                            this._kendoFormatProvider = new geocortex.charting.globalization.KendoFormatProvider();
                        }
                        FormatProvider.prototype.toString = function (value, format, timeZoneId, displayTimeZoneId) {
                            // Use our own facilities in GVH for formatting dates and numbers.
                            if (value instanceof Date) {
                                // If we don't have a time zone ID for users to see the date in, we correct the date to agree
                                // with the time zone of the database. Otherwise we correct the date so that all users see the
                                // same clock time for the date, regardless of the users' actual locations.
                                if (!displayTimeZoneId) {
                                    value = TimeZoneUtils.correctDatesForDisplayInLocalTime(value, timeZoneId);
                                }
                                else {
                                    value = TimeZoneUtils.correctDatesForDisplayInDisplayTimeZone(value, timeZoneId, displayTimeZoneId);
                                }
                                return FormatUtils.formatDate(value, format);
                            }
                            else if (typeof value === "number") {
                                return FormatUtils.formatNumber(value, format);
                            }
                            else {
                                // Pass through to the default provider.
                                return this._kendoFormatProvider.toString(value, format);
                            }
                        };
                        return FormatProvider;
                    }());
                    charting.FormatProvider = FormatProvider;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/jquery.d.ts" />
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    var SingleFeatureChartView = (function (_super) {
                        __extends(SingleFeatureChartView, _super);
                        function SingleFeatureChartView(app, libraryId) {
                            _super.call(this, app, libraryId);
                            this._chartPane = null;
                            this.app.event("ApplicationResizedEvent").subscribe(this, this.handleApplicationResizedEvent);
                        }
                        /**
                         * Attaches a view model and performs data-binding.
                         */
                        SingleFeatureChartView.prototype.attach = function (viewModel) {
                            var _this = this;
                            _super.prototype.attach.call(this, viewModel);
                            if (viewModel) {
                                viewModel.currentChart.bind(this, this._onCurrentChartChanged);
                                viewModel.onNewFeatureInitialized = function () { return _this._onNewFeatureInitialized(); };
                            }
                        };
                        SingleFeatureChartView.prototype.activated = function () {
                            _super.prototype.activated.call(this);
                            this._refreshChartPane();
                        };
                        /**
                         * Override this method to resolve widgets by ID and context. Return a {@geocortex.framework.config.WidgetConfig}, or null.
                         */
                        SingleFeatureChartView.prototype.resolveWidget = function (widgetId, context, binding) {
                            var _this = this;
                            if (widgetId === "ChartSelector") {
                                this._selectorView = this.app.viewManager.createView({
                                    typeName: "geocortex.framework.ui.Selector.SelectorView",
                                    markupResource: "Framework.UI/geocortex/framework/ui/Selector/SelectorView.html",
                                    isVisible: true,
                                    libraryId: "Framework.UI"
                                });
                                this.selector = new geocortex.framework.ui.Selector.SelectorViewModel(this.app, this.libraryId, true);
                                if (this.selector.showNativeSelect.get()) {
                                    this.selector.dummyItemText = this.app.getResource(this.libraryId, "language-feature-no-chart");
                                }
                                this.selector.setCollection(this.viewModel.charts, "displayName", null);
                                this.selector.selectorText.set(this.app.getResource(this.libraryId, "language-charting-selector-text"));
                                this.selector.noItemsText.set(this.app.getResource(this.libraryId, "language-charting-no-items"));
                                this.selector.onSelectItem = function (item) { return _this.handleSelectChart(item.item); };
                                this.selector.onUnselectItem = function (item) { return _this.handleUnSelectChart(item.item); };
                                this._selectorView.attach(this.selector);
                                return this._selectorView;
                            }
                            else if (context && widgetId === "ChartPaneWidget") {
                                // Keep track of chart panes and view models
                                this._chartPane = this._hostChartInPane(context);
                                return this._chartPane;
                            }
                            return _super.prototype.resolveWidget.call(this, widgetId, context);
                        };
                        SingleFeatureChartView.prototype._hostChartInPane = function (chart) {
                            var _this = this;
                            // Chart legend is always auto-positioned on single feature charts
                            var paneViewModel = new charting.ChartPaneViewModel(this.app, this.libraryId);
                            paneViewModel.id = "ChartPaneViewModel-" + geocortex.framework.utils.alphaNumericToken();
                            paneViewModel.responsiveLegendPositioning.set(true);
                            paneViewModel.currentChart.set(chart);
                            paneViewModel.initialize({
                                title: chart.chartDefinition.displayName,
                                infrastructureLibraryId: this.viewModel.infrastructureLibraryId,
                                headerIsVisible: true,
                                showXButton: true
                            });
                            var pane = this.app.viewManager.createView({
                                typeName: "geocortex.essentialsHtmlViewer.mapping.modules.charting.ChartPane",
                                markupResource: "Mapping.Charting/modules/Charting/ChartPane.html",
                                libraryId: this.libraryId || "Mapping.Charting",
                                isVisible: true,
                                viewModel: paneViewModel // ...trigger bindings
                            });
                            // Update the view model and selector whenever a chart pane is closed via the "X"
                            pane.onClose = function (x) { return _this.destroyChart(x); };
                            return pane;
                        };
                        SingleFeatureChartView.prototype.handleSelectChart = function (chart) {
                            this.addChart(chart);
                        };
                        SingleFeatureChartView.prototype.handleUnSelectChart = function (chart) {
                            this.destroyChart(chart);
                        };
                        SingleFeatureChartView.prototype.handleApplicationResizedEvent = function () {
                            if (!this.viewModel) {
                                return;
                            }
                            // Auto-position the legend on single feature charts
                            if (this._chartPane) {
                                this._chartPane.refresh();
                            }
                        };
                        /**
                         * Adds a chart to the layout by creating a new chart pane and loading the specified chart.
                         */
                        SingleFeatureChartView.prototype.addChart = function (chart) {
                            if (chart && this.viewModel.currentChart.get() !== chart) {
                                // ... force lazy observable to resolve
                                chart.chartPointCollection.get();
                                // setting currentChart triggers a refresh of the currently displayed chart
                                this.viewModel.currentChart.set(chart);
                                this.selector.selectItem(chart);
                                this.handleApplicationResizedEvent();
                                return this._chartPane;
                            }
                            return null;
                        };
                        /**
                         * Removes a chart from the layout
                         */
                        SingleFeatureChartView.prototype.destroyChart = function (chart) {
                            if (chart && this.viewModel.currentChart.get() === chart) {
                                if (!this._chartPane) {
                                    this.app.trace.warning("Could not destroy chart '{0}': Chart not found.".format(chart.chartId.get()));
                                    return false;
                                }
                                this.viewModel.currentChart.set(null);
                                this.selector.unselectItem(chart);
                                // Destroy the lazy chart point collection. It's got tons of data...
                                chart.destroyChartPoints();
                                this.cleanup();
                                return true;
                            }
                            return false;
                        };
                        SingleFeatureChartView.prototype.cleanup = function () {
                            if (this._chartPane) {
                                this._chartPane.destroy();
                                this._chartPane = null;
                            }
                        };
                        SingleFeatureChartView.prototype._onCurrentChartChanged = function (chart) {
                            if (!chart) {
                                this.cleanup();
                            }
                        };
                        // GVH-4896: Make chart view open up automatically when feature details are being displayed and ChartProvider is the default tab
                        SingleFeatureChartView.prototype._onNewFeatureInitialized = function () {
                            if (this.viewModel.charts.length()) {
                                this.addChart(this.viewModel.charts.getAt(0));
                                this._refreshChartPane();
                            }
                        };
                        // Refresh the chart pane after first yielding to the view so it can successfully add the chart
                        SingleFeatureChartView.prototype._refreshChartPane = function () {
                            var _this = this;
                            setTimeout(function () { return _this.handleApplicationResizedEvent(); }, 0);
                        };
                        return SingleFeatureChartView;
                    }(geocortex.framework.ui.ViewBase));
                    charting.SingleFeatureChartView = SingleFeatureChartView;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Charting.Infrastructure.d.ts" />
/// <reference path="../../../_Definitions/Mapping.Infrastructure.d.ts" />
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var mapping;
        (function (mapping) {
            var modules;
            (function (modules) {
                var charting;
                (function (charting) {
                    var SingleFeatureChartViewModel = (function (_super) {
                        __extends(SingleFeatureChartViewModel, _super);
                        function SingleFeatureChartViewModel(app, libraryId) {
                            _super.call(this, app, libraryId);
                            /** The chart view model factory */
                            this._chartFactory = null;
                            /** Chart-specific configuration. Single feature charts are non-interactive */
                            this._chartConfig = {
                                animationsEnabled: true,
                                gradientsEnabled: false,
                                interactiveLegendEnabled: false,
                                interactiveChart: false,
                                pieStartAngle: 180,
                                renderAs: "svg",
                                chartWidth: 0,
                                chartHeight: 0
                            };
                            this._syncToken = null;
                            this._syncSource = null;
                            /**
                             * The collection of available charts (ordered by the user in Manager).
                             */
                            this.charts = new ObservableCollection();
                            /**
                             * The chart being displayed.
                             */
                            this.currentChart = new Observable();
                            this.infrastructureLibraryId = "Charting";
                            this.containerRegionName = new Observable("");
                        }
                        /**
                         * Invoked when charts for a new feature have been initialized and are ready to display
                         */
                        SingleFeatureChartViewModel.prototype.onNewFeatureInitialized = function () { };
                        /**
                         * Lazy-load the chart view model factory.
                         */
                        SingleFeatureChartViewModel.prototype.getChartFactory = function () {
                            // "Import" the chart view model factory instance. It is initially created by the ChartingModule.
                            if (this._chartFactory === null) {
                                this._chartFactory = this.app.getFrameworkObjectById("ChartViewModelFactory");
                            }
                            return this._chartFactory;
                        };
                        SingleFeatureChartViewModel.prototype.initialize = function (config) {
                            _super.prototype.initialize.call(this, config);
                            if (config) {
                                if (config.hasOwnProperty("infrastructureLibraryId")) {
                                    this.infrastructureLibraryId = config.infrastructureLibraryId;
                                }
                                if (config.hasOwnProperty("containerRegionName")) {
                                    this.containerRegionName.set(config.containerRegionName);
                                }
                                var chartConfig = config.chartConfiguration;
                                if (chartConfig) {
                                    if (chartConfig.hasOwnProperty("chartWidth")) {
                                        this._chartConfig.chartWidth = parseInt(chartConfig.chartWidth);
                                    }
                                    if (chartConfig.hasOwnProperty("chartHeight")) {
                                        this._chartConfig.chartHeight = parseInt(chartConfig.chartHeight);
                                    }
                                    if (chartConfig.hasOwnProperty("renderAs")) {
                                        this._chartConfig.renderAs = chartConfig.renderAs;
                                    }
                                    if (chartConfig.hasOwnProperty("animationsEnabled")) {
                                        this._chartConfig.animationsEnabled = !!chartConfig.animationsEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("gradientsEnabled")) {
                                        this._chartConfig.gradientsEnabled = !!chartConfig.gradientsEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("interactiveLegendEnabled")) {
                                        this._chartConfig.interactiveLegendEnabled = !!chartConfig.interactiveLegendEnabled;
                                    }
                                    if (chartConfig.hasOwnProperty("pieStartAngle")) {
                                        this._chartConfig.pieStartAngle = chartConfig.pieStartAngle;
                                    }
                                }
                            }
                        };
                        /**
                         * This is called when the current feature changes, so that we might update our displays. This will likely change when
                         * a new result is selected from one of the result views.
                         * @param feature A Geocortex Feature that we are displaying.
                         */
                        SingleFeatureChartViewModel.prototype.handleCurrentFeatureChanged = function (feature) {
                            this.charts.clear();
                            this.currentChart.set(null); // ... triggers destruction of chart pane (if any)
                            if (this._syncToken && this._syncSource) {
                                this._syncSource.unbind(this._syncToken);
                                this._syncSource = null;
                                this._syncToken = null;
                            }
                            var factory = this.getChartFactory();
                            if (factory && feature && feature.layer && feature.layer.charts) {
                                var newCharts = [];
                                for (var i = 0; i < feature.layer.charts.length; i++) {
                                    var config = feature.layer.charts[i];
                                    // We are only interested in visible, single feature charts
                                    if (config && config.chartDefinition.visible && config.chartFeatureType == geocortex.charting.ChartFeatureType.SingleFeature) {
                                        var chart = factory.createInstance(config.chartDefinition, geocortex.charting.ChartFeatureType.SingleFeature);
                                        chart.tag = feature.layer; // keep track of the layer
                                        this.applyChartOptions(chart);
                                        newCharts.push(chart);
                                    }
                                }
                                this.charts.addItems(newCharts);
                                // Since datalinks are resolved asynchronously, we should watch to make sure that if they change, we update the charts
                                var hasDataLinks = this.charts.getItems().some(function (x) { return geocortex.charting.ChartUtils.containsDataLinks(x.chartDefinition); });
                                if (hasDataLinks) {
                                    this._syncSource = feature.dataLinkingResults;
                                    this._syncToken = feature.dataLinkingResults.bind(this, this._handleDataLinksChanged);
                                }
                                this.buildChartPointCollections(feature);
                                this.updateDisplayedCharts();
                                this.onNewFeatureInitialized();
                            }
                            this.updateProviderState(!!this.charts.length());
                        };
                        SingleFeatureChartViewModel.prototype.applyChartOptions = function (chart) {
                            // Make single feature charts non-interactive and auto-position the legend
                            if (chart) {
                                chart.setOptions(this._chartConfig);
                            }
                        };
                        /**
                         * Triggers a data update for the charts displayed in the UI.
                         */
                        SingleFeatureChartViewModel.prototype.updateDisplayedCharts = function () {
                            if (this.currentChart.get()) {
                                // ... force lazy observables to resolve
                                this.currentChart.get().chartPointCollection.get();
                            }
                        };
                        /**
                         * Returns a delegate function that gets called to load data points into a chart.
                         * Defers loading chart points in memory until absolutely necessary (e.g. when a chart is added to the UI)
                         * @param chart The chart.
                         * @param feature The data source (a Geocortex Feature).
                         */
                        SingleFeatureChartViewModel.prototype.chartPointCollectionLoadDelegate = function (chart, feature) {
                            var _this = this;
                            // This is consumed by the LazyObservable on the first time that we request it's value
                            return function () {
                                if (_this.getChartFactory()) {
                                    // Create an empty FeatureSet containing only the single feature
                                    var featureSet = new mapping.infrastructure.FeatureSet({ layer: feature.layer, app: _this.app });
                                    featureSet.addFeature(feature);
                                    return _this.getChartFactory().createChartPointCollection(chart.chartDefinition, featureSet, geocortex.charting.ChartFeatureType.SingleFeature);
                                }
                                return null;
                            };
                        };
                        /**
                         * Generates point data for each chart configured on the layer
                         */
                        SingleFeatureChartViewModel.prototype.buildChartPointCollections = function (feature) {
                            for (var i = 0; i < this.charts.getLength(); i++) {
                                var chart = this.charts.getAt(i);
                                // GVH-4249 Only fetch new data from the data source when needed. Setup delegates for the lazy observable.
                                var delegate = this.chartPointCollectionLoadDelegate(chart, feature);
                                var lazy = chart.chartPointCollection;
                                lazy.clear();
                                lazy.delegateGetter = delegate;
                                lazy.cacheDelegateResults = true;
                            }
                        };
                        SingleFeatureChartViewModel.prototype._handleDataLinksChanged = function (args) {
                            this.buildChartPointCollections(this.currentFeature.get());
                            this.updateDisplayedCharts();
                        };
                        return SingleFeatureChartViewModel;
                    }(mapping.infrastructure.featureDetails.FeatureProviderBase));
                    charting.SingleFeatureChartViewModel = SingleFeatureChartViewModel;
                })(charting = modules.charting || (modules.charting = {}));
            })(modules = mapping.modules || (mapping.modules = {}));
        })(mapping = essentialsHtmlViewer.mapping || (essentialsHtmlViewer.mapping = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));

/* End Script: Mapping.Charting/mapping.charting_ts_out.js ------------------------- */ 

geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/modules/Charting/ChartingView.html","html","PGRpdiBjbGFzcz0idmlldy1jb250YWluZXItdmlldyBjaGFydGluZyIgZGF0YS1iaW5kaW5nPSJ7QHZhcjogY29udGFpbmVyRWxlbWVudH17QGNsYXNzLWNoYXJ0aW5nLW1vYmlsZTogbW9iaWxlTW9kZX17QG5vY2xhc3Mtbm8taGVhZGVyOiBoZWFkZXJJc1Zpc2libGV9Ij4NCiAgICA8IS0tIEJFR0lOOiBIZWFkZXIgLS0+DQogICAgPGJ1dHRvbiBjbGFzcz0iYm90dG9tLXBhbmVsLXJlc2l6ZSByZXNpemUtaGFuZGxlIiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogcmVzaXplWX17QGV2ZW50LW1vdXNlZG93bjogaGFuZGxlSGVhZGVyTW91c2VEb3dufXtAZXZlbnQtdG91Y2hzdGFydDogaGFuZGxlSGVhZGVyVG91Y2hTdGFydH17dGl0bGU6IEBsYW5ndWFnZS1jaGFydGluZy1zbWFydC1wYW5lbC1yZXNpemV9Ij4NCiAgICAgICAgPHNwYW4gY2xhc3M9Imljb24tZHJhZyI+PC9zcGFuPg0KICAgIDwvYnV0dG9uPg0KICAgIDxkaXYgY2xhc3M9InBhbmVsLWhlYWRlciBiYW5uZXItbm9zZWxlY3QiIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBoZWFkZXJJc1Zpc2libGV9e0B2YXI6IGhlYWRlckVsZW1lbnR9e0BldmVudC1tb3VzZWRvd246IGhhbmRsZUhlYWRlck1vdXNlRG93bn0NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtAZXZlbnQtdG91Y2hzdGFydDogaGFuZGxlSGVhZGVyVG91Y2hTdGFydH17QGNsYXNzLXJlc2l6ZS1ob3Jpem9udGFsLWhpbnQ6IHJlc2l6ZVh9e0BjbGFzcy1yZXNpemUtdmVydGljYWwtaGludDogcmVzaXplWX0iPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJwYW5lbC1oZWFkZXItYnV0dG9uIHJpZ2h0IGNsb3NlLTE2IiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd1hCdXR0b259e0BldmVudC1vbmNsaWNrOiBoYW5kbGVDbGlja0Nsb3NlfXt0aXRsZTogQGxhbmd1YWdlLWNvbW1vbi1jbG9zZX0iPjwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJwYW5lbC1oZWFkZXItYnV0dG9uIHJpZ2h0IiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogc2hvd2luZ01heGltaXplQnV0dG9ufXtAY2xhc3MtbWluaW1pemUtMTY6IHBhbmVsTWF4aW1pemVkfXtAbm9jbGFzcy1tYXhpbWl6ZS0xNjogcGFuZWxNYXhpbWl6ZWR9e0BldmVudC1vbmNsaWNrOiBoYW5kbGVNYXhpbWl6ZVRvZ2dsZUNsaWNrfXtAZXZlbnQtdG91Y2hzdGFydDogaGFuZGxlTWF4aW1pemVUb2dnbGVDbGlja317dGl0bGU6IEBsYW5ndWFnZS1jaGFydGluZy1zbWFydC1wYW5lbC1tYXhpbWl6ZS1yZXN0b3JlfSI+PC9idXR0b24+DQogICAgICAgIDxpbWcgc3JjPSJSZXNvdXJjZXMvSW1hZ2VzL0ljb25zL2NoYXJ0aW5nLTI0LnBuZyIgYWx0PSIgIiAvPg0KICAgICAgICA8ZGl2IGRhdGEtYmluZGluZz0ie0B3aWRnZXQ6IENoYXJ0U2VsZWN0b3J9e0B3aWRnZXQtcmVwbGFjZTogdHJ1ZX0iPjwvZGl2Pg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9InBhbmVsLXNjcm9sbC1jb250YWluZXIiIGRhdGEtYmluZGluZz0ie2RhdGEtcmVnaW9uLW5hbWU6IHJlZ2lvbk5hbWV9e2RhdGEtcmVnaW9uLWFkYXB0ZXI6IHJlZ2lvblR5cGV9e0B2YXI6IHNjcm9sbFJlZ2lvbkVsZW1lbnR9e0BldmVudC1vbnNjcm9sbDogaGFuZGxlU2Nyb2xsQ2hhbmdlfSI+PC9kaXY+DQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/modules/Charting/ChartPane.html","html","PGRpdiBjbGFzcz0iY2hhcnQtcGFuZSIgZGF0YS1iaW5kaW5nPSJ7QHZhcjogY29udGFpbmVyRWxlbWVudH17QGNsYXNzLWF1dG8tc2l6ZTogYXV0b1NpemV9e0Bub2NsYXNzLW5vLWhlYWRlcjogaGVhZGVySXNWaXNpYmxlfSI+DQogICAgPGRpdiBjbGFzcz0icGFuZWwtaGVhZGVyIiBkYXRhLWJpbmRpbmc9IntAdmlzaWJsZTogaGVhZGVySXNWaXNpYmxlfSI+DQogICAgICAgIDxidXR0b24gY2xhc3M9InBhbmVsLWhlYWRlci1idXR0b24gcmlnaHQgY2xvc2UtMTYiIGRhdGEtYmluZGluZz0ie0B2aXNpYmxlOiBzaG93WEJ1dHRvbn17QGV2ZW50LW9uY2xpY2s6IGhhbmRsZUNsaWNrQ2xvc2V9e3RpdGxlOiBAbGFuZ3VhZ2UtY29tbW9uLWNsb3NlfSI+PC9idXR0b24+DQogICAgICAgIDxoMiBjbGFzcz0icGFuZWwtdGl0bGUiPg0KICAgICAgICAgICAgPGltZyBzcmM9IlJlc291cmNlcy9JbWFnZXMvbG9hZGVyLXNtYWxsLmdpZiIgZGF0YS1iaW5kaW5nPSJ7QHZpc2libGU6IHNob3dCdXN5SW5kaWNhdG9yfSIgYWx0PSIgIiAvPg0KICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IHRpdGxlfXtAdmlzaWJsZTogdGl0bGV9Ij48L3NwYW4+DQogICAgICAgIDwvaDI+DQogICAgPC9kaXY+DQogICAgPGRpdiBjbGFzcz0iY2hhcnQtcGFuZS1ib2R5Ij4NCiAgICAgICAgPGRpdiBkYXRhLWJpbmRpbmc9IntAd2lkZ2V0OiBDaGFydFdpZGdldH17QHdpZGdldC1jb250ZXh0OiBjdXJyZW50Q2hhcnR9e0B3aWRnZXQtcmVxdWlyZWQ6IHRydWV9e0B3aWRnZXQtcmVwbGFjZTogdHJ1ZX0iPjwvZGl2Pg0KICAgIDwvZGl2Pg0KPC9kaXY+DQo=");
geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/modules/Charting/SingleFeatureChartView.html","html","PGRpdiBjbGFzcz0icGFuZWwtZ3JvdXAgc2luZ2xlLWZlYXR1cmUtY2hhcnQiIGRhdGEtYmluZGluZz0ie0B2YXI6IGNvbnRhaW5lckVsZW1lbnR9e0B2aXNpYmxlOiBwcm92aWRlckVuYWJsZWR9Ij4NCiAgICA8aDMgZGF0YS1iaW5kaW5nPSJ7QHRleHQ6IEBsYW5ndWFnZS1mZWF0dXJlLWNoYXJ0c30iPjwvaDM+DQogICAgPGRpdiBjbGFzcz0ic2luZ2xlLWZlYXR1cmUtY2hhcnQtc2VsZWN0b3IiPg0KICAgICAgICA8aW1nIHNyYz0iUmVzb3VyY2VzL0ltYWdlcy9JY29ucy9jaGFydGluZy0yNC5wbmciIGFsdD0iICIgLz4NCiAgICAgICAgPGRpdiBkYXRhLWJpbmRpbmc9IntAd2lkZ2V0OiBDaGFydFNlbGVjdG9yfXtAd2lkZ2V0LXJlcGxhY2U6IHRydWV9Ij48L2Rpdj4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJzaW5nbGUtZmVhdHVyZS1jaGFydC13aWRnZXQiIGRhdGEtYmluZGluZz0ie0B3aWRnZXQ6IENoYXJ0UGFuZVdpZGdldH17QHdpZGdldC1jb250ZXh0OiBjdXJyZW50Q2hhcnR9e0B3aWRnZXQtcmVxdWlyZWQ6IGZhbHNlfSI+PC9kaXY+DQo8L2Rpdj4NCg==");
geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/modules/Charting/CSS/common.css","css","LyogQ0hBUlRJTkcgU1RZTElORyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8NCg0KLyogLS0tLS0tIFNUQVJUOiBDaGFydCBQYW5lIC0tLS0tLSAqLw0KLmNoYXJ0LXBhbmUgew0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICBwYWRkaW5nOiAwOw0KICAgIG1hcmdpbjogMDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgIGJhY2tncm91bmQ6IHdoaXRlOw0KfQ0KLmNoYXJ0LXBhbmUgLnBhbmVsLWhlYWRlciBoMiB7DQogICAgZm9udC1zaXplOiAxLjFlbTsNCn0NCi5jaGFydC1wYW5lIC5wYW5lbC1oZWFkZXItYnV0dG9uIHsNCiAgICB3aWR0aDogMS43ZW07DQp9DQouY2hhcnQtcGFuZSAuY2hhcnQgew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIG1hcmdpbjogYXV0bzsNCiAgICBjbGVhcjogYm90aDsNCiAgICBwYWRkaW5nOiAwIC41ZW07DQp9DQovKiAtLS0tLS0gRU5EOiBDaGFydCBQYW5lIC0tLS0tLSAqLw0KDQovKiAtLS0tLS0gU1RBUlQ6IFNpbmdsZSBGZWF0dXJlIENoYXJ0cyAoRmVhdHVyZSBEZXRhaWxzKSAtLS0tLS0gKi8NCi5zaW5nbGUtZmVhdHVyZS1jaGFydC1zZWxlY3RvciB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsNCn0NCi5zaW5nbGUtZmVhdHVyZS1jaGFydC1zZWxlY3RvciBpbWcgew0KICAgIG1hcmdpbjogMWVtIDAgMCAxZW07DQogICAgbGVmdDogMDsNCiAgICB0b3A6IDA7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KfQ0KLnNpbmdsZS1mZWF0dXJlLWNoYXJ0LXNlbGVjdG9yIC5mdWktc2VsZWN0b3Igew0KICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQogICAgcGFkZGluZzogMWVtIDAuNWVtIDFlbSAzZW07DQogICAgd2lkdGg6IDgwJTsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgZmxvYXQ6IGxlZnQ7DQogICAgdG9wOiAwOw0KfQ0KLnNpbmdsZS1mZWF0dXJlLWNoYXJ0LXNlbGVjdG9yIC5mdWktc2VsZWN0b3ItaGVhZGVyIHsNCiAgICB3aWR0aDogMTAwJTsNCn0NCi5zaW5nbGUtZmVhdHVyZS1jaGFydC1zZWxlY3RvciB1bC5mdWktc2VsZWN0b3ItYm9keSBsaSBkaXYgew0KICAgIHBhZGRpbmc6IDFlbTsNCn0NCi5zaW5nbGUtZmVhdHVyZS1jaGFydC1zZWxlY3RvciAuc2VsZWN0b3ItaXRlbSBzcGFuIHsNCiAgICB3aWR0aDphdXRvOw0KfQ0KLnNpbmdsZS1mZWF0dXJlLWNoYXJ0LXNlbGVjdG9yIC5zZWxlY3Rvci1pdGVtIGlucHV0IHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIG1hcmdpbi1yaWdodDogMC41ZW07DQp9DQoNCi5zaW5nbGUtZmVhdHVyZS1jaGFydC13aWRnZXQgew0KICAgIGNsZWFyOiBib3RoOw0KICAgIG1hcmdpbi10b3A6IDAuNWVtOw0KfQ0KLnNpbmdsZS1mZWF0dXJlLWNoYXJ0IC5jaGFydC1wYW5lIHsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQp9DQouRmVhdHVyZURldGFpbHNDb21wYWN0VmlldyAuY2hhcnQtcGFuZSAuY2hhcnQgew0KICAgIG1pbi1oZWlnaHQ6IDQwMHB4Ow0KfQ0KLkNoYXJ0aW5nVmlldyAuY2hhcnQtcGFuZSAucGFuZWwtaGVhZGVyLA0KLnNpbmdsZS1mZWF0dXJlLWNoYXJ0IC5jaGFydC1wYW5lIC5wYW5lbC1oZWFkZXIgew0KICAgIGJvcmRlcjogMDsNCn0NCi8qIEFkanVzdCBjaGFydCBzaXplIHdoZW4gdGFicyBhcmUgcHJlc2VudCBpbiB0aGUgcmVnaW9uIGhlYWRlciAqLw0KLkZlYXR1cmVEZXRhaWxzRXhwYW5kZWRWaWV3IC5yZWdpb24tdmlldy1zd2l0Y2hlci5ib3VuZC12aXNpYmxlICsgLnJlZ2lvbiAudmlldy5hY3RpdmUgLnBhbmVsLWdyb3VwLnNpbmdsZS1mZWF0dXJlLWNoYXJ0ICB7DQogICAgdG9wOiAyLjJlbTsgLyogTWF0Y2hlcyBoZWlnaHQgb2YgdGhlIHRhYiBzd2l0Y2hlciAqLw0KfQ0KLkZlYXR1cmVEZXRhaWxzRXhwYW5kZWRWaWV3IC5zaW5nbGUtZmVhdHVyZS1jaGFydCB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHRvcDogMDsNCiAgICBib3R0b206IDA7DQp9DQouRmVhdHVyZURldGFpbHNFeHBhbmRlZFZpZXcgLnNpbmdsZS1mZWF0dXJlLWNoYXJ0LXdpZGdldCB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIG1hcmdpbjogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICB0b3A6IDMuNGVtOyAvKiBNYXRjaGVzIGhlaWdodCBvZiB0aGUgY2hhcnQgc2VsZWN0b3IgKi8NCiAgICBib3R0b206IDA7DQogICAgbWluLWhlaWdodDogMDsNCn0NCi5DaGFydGluZ1ZpZXcgLmNoYXJ0LXBhbmUgLmNoYXJ0LA0KLkZlYXR1cmVEZXRhaWxzRXhwYW5kZWRWaWV3IC5jaGFydC1wYW5lIC5jaGFydCB7DQogICAgaGVpZ2h0OiAxMDAlOw0KfQ0KLkNoYXJ0aW5nVmlldyAuY2hhcnQtcGFuZS1ib2R5LA0KLkZlYXR1cmVEZXRhaWxzRXhwYW5kZWRWaWV3IC5jaGFydC1wYW5lLWJvZHkgew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICB0b3A6IDMuNzVlbTsgLyogTWF0Y2hlcyBoZWlnaHQgb2YgdGhlIHBhbmVsIGhlYWRlciAqLw0KICAgIGJvdHRvbTogMDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgIGJhY2tncm91bmQ6IHdoaXRlOw0KfQ0KLm5vLXRvdWNoIC5DaGFydGluZ1ZpZXcgLmNoYXJ0LXBhbmUtYm9keSwNCi5uby10b3VjaCAuRmVhdHVyZURldGFpbHNFeHBhbmRlZFZpZXcgLmNoYXJ0LXBhbmUtYm9keSB7DQogICAgdG9wOiAzZW07IC8qIE1hdGNoZXMgaGVpZ2h0IG9mIHRoZSBwYW5lbCBoZWFkZXIgKi8NCn0NCi5DaGFydGluZ1ZpZXcgLm5vLWhlYWRlciAuY2hhcnQtcGFuZS1ib2R5LCANCi5GZWF0dXJlRGV0YWlsc0V4cGFuZGVkVmlldyAubm8taGVhZGVyIC5jaGFydC1wYW5lLWJvZHkgew0KICAgIHRvcDogMDsgLyogTm8gaGVhZGVyIHNob3duIGZvciB0aGlzIHBhbmVsLCBpdCBzaG91bGQgdGFrZSBhbGwgYXZhaWxhYmxlIHNwYWNlICovDQp9DQovKiAtLS0tLS0gRU5EOiBTaW5nbGUgRmVhdHVyZSBDaGFydHMgKEZlYXR1cmUgRGV0YWlscykgLS0tLS0tICovDQoNCi8qIC0tLS0tLSBTVEFSVDogTXVsdGktRmVhdHVyZSBDaGFydHMgLS0tLS0tICovDQouQ2hhcnRpbmdWaWV3IC5wYW5lbC1oZWFkZXIgaW1nIHsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgbWFyZ2luLWxlZnQ6IDAuN2VtOw0KICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQp9DQouQ2hhcnRpbmdWaWV3IC5mdWktc2VsZWN0b3Igew0KICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQogICAgcGFkZGluZzogMDsNCiAgICBtYXJnaW46IDA7DQogICAgd2lkdGg6IDE2ZW07DQogICAgZmxvYXQ6IG5vbmU7DQogICAgaGVpZ2h0OiBhdXRvOw0KfQ0KLkNoYXJ0aW5nVmlldyB1bC5mdWktc2VsZWN0b3ItYm9keSBzcGFuIHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wOw0KICAgIGxpbmUtaGVpZ2h0OiAxLjZlbTsNCiAgICBmb250LXNpemU6IDAuOTVlbTsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgd2lkdGg6IDkzJTsNCn0NCi5DaGFydGluZ1ZpZXcgLmNoYXJ0aW5nLW1vYmlsZSB1bC5mdWktc2VsZWN0b3ItYm9keSB7DQogICAgcG9zaXRpb246IGZpeGVkOw0KICAgIGxlZnQ6IDA7DQogICAgcmlnaHQ6IDA7DQogICAgdG9wOiA0NXB4Ow0KICAgIGJvdHRvbTogMDsNCiAgICBtYXgtaGVpZ2h0OiBpbml0aWFsOw0KICAgIGJvcmRlcjogbm9uZTsNCn0NCi5DaGFydGluZ1ZpZXcgLmNoYXJ0aW5nLW1vYmlsZSB1bC5mdWktc2VsZWN0b3ItYm9keS5leHBhbmRlZCB7DQogICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NjY2NjYzsNCn0NCg0KLkNoYXJ0aW5nVmlldyAucGFuZWwtc2Nyb2xsLWNvbnRhaW5lciB7DQogICAgYm9yZGVyOiAwOw0KICAgIG92ZXJmbG93OiBoaWRkZW47DQogICAgdG9wOiAzLjc1ZW07IC8qIE1hdGNoZXMgaGVpZ2h0IG9mIHRoZSB2aWV3IGNvbnRhaW5lciBoZWFkZXIgKi8NCiAgICBtYXJnaW4tdG9wOiAycHg7DQp9DQoubm8tdG91Y2ggLkNoYXJ0aW5nVmlldyAucGFuZWwtc2Nyb2xsLWNvbnRhaW5lciB7DQogICAgdG9wOiAzZW07IC8qIE1hdGNoZXMgaGVpZ2h0IG9mIHRoZSB2aWV3IGNvbnRhaW5lciBoZWFkZXIgKi8NCn0NCi5DaGFydGluZ1ZpZXcgLm5vLWhlYWRlciAucGFuZWwtc2Nyb2xsLWNvbnRhaW5lciB7DQogICAgdG9wOiAwOyAvKiBObyBoZWFkZXIgc2hvd24gZm9yIHRoaXMgdmlldyBjb250YWluZXIsIGl0IHNob3VsZCB0YWtlIGFsbCBhdmFpbGFibGUgc3BhY2UgKi8NCiAgICBtYXJnaW46IDA7DQp9DQouQ2hhcnRpbmdWaWV3IC5wYW5lbC1zY3JvbGwtY29udGFpbmVyID4gLnZpZXcuYWN0aXZlIHsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgLyoqDQogICAgICogTm90ZTogSWYgeW91J3JlIGNoYW5naW5nIHRoZXNlIHByb3BlcnRpZXMsIHlvdSdyZSBjaGFuZ2luZyB0aGUgdG90YWwgc2l6ZSBvZiBjaGFydGluZyBwYW5lcyBhbmQgbXVzdA0KICAgICAqIGNoYW5nZSB0aGUgc2l6ZSBwYXJhbWV0ZXJzIGluIGNvZGUuIFNlZSAnaGFuZGxlQXBwbGljYXRpb25SZXNpemVkRXZlbnQnIGluIENoYXJ0aW5nVmlldy4NCiAgICAgKi8NCiAgICBtYXJnaW46IDBlbTsNCiAgICAvKmJvcmRlcjogMXB4IHNvbGlkICNlZWU7Ki8NCn0NCi5DaGFydGluZ1ZpZXcgLmNoYXJ0LXBhbmUgew0KICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2VlZTsNCn0NCi5DaGFydGluZ1ZpZXcgLmNoYXJ0aW5nLW1vYmlsZSAuY2hhcnQtcGFuZSAucGFuZWwtaGVhZGVyLWJ1dHRvbiB7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCi8qIC0tLS0tLSBFTkQ6IE11bHRpLUZlYXR1cmUgQ2hhcnRzIC0tLS0tLSAqLw0KDQovKiAtLS0tLS0gU1RBUlQ6IENoYXJ0IFRvb2x0aXAgZGl2IC0tLS0tLSAqLw0KLmstY2hhcnQgLmstdG9vbHRpcCB7DQogICAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgDQogICAgbWF4LXdpZHRoOiA3ZW07DQp9DQouay1jaGFydCAuay10b29sdGlwID4gZGl2IHsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQp9DQovKiAtLS0tLS0gRU5EOiBDaGFydCBUb29sdGlwIGRpdiAtLS0tLS0gKi8NCg==");
geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/modules/Charting/CSS/small.css","css","LyogQ0hBUlRJTkcgU1RZTElORyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8NCg0KLyogLS0tLS0tIFNUQVJUOiBDaGFydCBQYW5lIC0tLS0tLSAqLw0KLmNoYXJ0LXBhbmUgLnBhbmVsLWhlYWRlci1idXR0b24uY2xvc2UtMTYgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi5zaGVsbC1zbWFsbCAuY2hhcnQtcGFuZSAuY2hhcnQgew0KICAgIHBhZGRpbmc6IDBlbTsNCn0NCg0KLnNoZWxsLXNtYWxsIC5jaGFydC1wYW5lIC5wYW5lbC1oZWFkZXIgew0KICAgIHBhZGRpbmc6IDBlbTsNCn0NCi8qIC0tLS0tLSBFTkQ6IENoYXJ0IFBhbmUgLS0tLS0tICovDQo=");
geocortex.resourceManager.register("Mapping.Charting","inv","Mapping.Charting/common.css","css","LyogR0xPQkFMIENIQVJUIFNUWUxJTkcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovDQo=");
geocortex.resourceManager.register("Mapping.Charting","inv","Invariant","json","eyJsYW5ndWFnZS1mcmFtZXdvcmstdWktdmlldy1jb250YWluZXItdmlldy1jbG9zZSI6IkNsb3NlIHswfSIsImxhbmd1YWdlLWNoYXJ0aW5nLXNtYXJ0LXBhbmVsLW1heGltaXplLXJlc3RvcmUiOiJNYXhpbWl6ZS9SZXN0b3JlIFBhbmVsIiwibGFuZ3VhZ2UtZmVhdHVyZS1uby1jaGFydCI6Ik5vIGNoYXJ0IiwibGFuZ3VhZ2UtY29tbW9uLWNsb3NlIjoiQ2xvc2UiLCJsYW5ndWFnZS1jaGFydGluZy1zZWxlY3Rvci10ZXh0IjoiU2VsZWN0IENoYXJ0cyIsImxhbmd1YWdlLWNoYXJ0aW5nLXNtYXJ0LXBhbmVsLXJlc2l6ZSI6IkRyYWcgdG8gcmVzaXplIHRoZSBwYW5lbCIsImxhbmd1YWdlLWZlYXR1cmUtY2hhcnRzIjoiQ2hhcnRzIiwibGFuZ3VhZ2UtY2hhcnRpbmctbm8taXRlbXMiOiJObyBjaGFydHMgdG8gZGlzcGxheSIsImxhbmd1YWdlLWZyYW1ld29yay11aS12aWV3LWNvbnRhaW5lci12aWV3LWJhY2siOiJHbyBCYWNrIHswfSJ9");

geocortex.framework.notifyLibraryDownload("Mapping.Charting");
