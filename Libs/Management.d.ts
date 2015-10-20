/// <reference path="Framework.d.ts" />
/// <reference path="Management.Infrastructure.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="jquery.cleditor.d.ts" />
/// <reference path="jquery.colorpicker.d.ts" />
/// <reference path="essentials.d.ts" />
/// <reference path="jqueryui.d.ts" />
/// <reference path="dojo.d.ts" />
/// <reference path="framework.ui.d.ts" />
/// <reference path="arcgis-js-api.d.ts" />
declare module geocortex.essentialsHtmlViewer.management.modules.Accessibility {
    class AccessibilityModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Accessibility {
    class AccessibilityView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        accessibilityIconViewModelProperties: string[];
        accessibilityIconViewProperties: any[];
        richEditor: CLEditor;
        activated(): void;
        handleApply(): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: AccessibilityViewModel): void;
        findAccessibilityIconViewModel(managedConfig: infrastructure.ManagedConfiguration): any;
        findAccessibilityIconView(managedConfig: infrastructure.ManagedConfiguration): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class LanguageResourceViewModel {
        rawValue: Observable<string>;
        displayValue: Observable<string>;
        isLanguageKey: Observable<boolean>;
        enabled: Observable<boolean>;
        private managedApp;
        private managedLibraryId;
        private libraryDownloadedEventToken;
        constructor();
        initialize(managedApp: geocortex.essentialsHtmlViewer.management.infrastructure.ManagedApplication, managedLibraryId: string): void;
        viewModelInitialized(): void;
        translate(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Accessibility {
    class AccessibilityViewModel extends geocortex.framework.ui.ViewModelBase {
        content: Observable<string>;
        title: Observable<string>;
        included: Observable<boolean>;
        titleWidget: shared.LanguageResourceViewModel;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Geolocate {
    class GeolocateModule extends geocortex.framework.application.ModuleBase {
    }
    interface GeolocationOptions {
        timeout?: number;
        maximumAge?: number;
        adjustExtentZoomOnGeolocate?: boolean;
        geolocateAccuracyCircleEnabled?: boolean;
        geolocateExtentZoomLevel?: number;
        geolocationIndicator?: string;
    }
    interface GeolocateCoordinateFormat {
        displayName: string;
        format: string;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Geolocate {
    class GeolocateView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        geolocateProperties: string[];
        geolocateStatusProperties: string[];
        geolocationIndicatorInput: any;
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        viewModel: GeolocateViewModel;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: GeolocateViewModel): void;
        findGeolocateViewModel(managedConfig: infrastructure.ManagedConfiguration): any;
        findGeolocateStatusViewModel(managedConfig: infrastructure.ManagedConfiguration): any;
        findGeolocateView(managedConfig: infrastructure.ManagedConfiguration): any;
        handleApply(): void;
        checkGeolocationMethodsEnabled(): void;
        browseGeolocationIndicatorUriHandler(evt: any, element: any, context: any): void;
        validate(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Geolocate {
    class GeolocateViewModel extends geocortex.framework.ui.ViewModelBase {
        geolocateEnabled: Observable<boolean>;
        trackingEnabled: Observable<boolean>;
        followingEnabled: Observable<boolean>;
        geolocationMethodEnabled: Observable<boolean>;
        geolocationIndicator: Observable<string>;
        geolocateAccuracyCircleEnabled: Observable<boolean>;
        adjustExtentZoomOnGeolocate: Observable<boolean>;
        geolocateExtentZoomLevel: Observable<number>;
        region: Observable<string>;
        showGeolocateCoordinates: Observable<boolean>;
        showTrackingCoordinates: Observable<boolean>;
        showFollowingCoordinates: Observable<boolean>;
        coordinateFormats: ObservableCollection<GeolocateCoordinateFormat>;
        coordinateFormat: Observable<string>;
        coordinateWkid: Observable<number>;
        coordinateFractionalDigits: Observable<number>;
        coordinateFractionalDigitsError: Observable<string>;
        coordinateFormatIsXy: Observable<boolean>;
        geolocationIndicatorId: Observable<string>;
        coordinateFormatId: Observable<string>;
        coordinateWkidId: Observable<string>;
        coordinateFractionalDigitsId: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.InsightIntegration {
    class InsightIntegrationView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        insightIntegrationModuleProperties: string[];
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        attach(viewModel?: any): void;
        handleApply(): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: InsightIntegrationViewModel): void;
        getInsightIntegrationConfig(managedConfig: infrastructure.ManagedConfiguration): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.InsightIntegration {
    class InsightIntegrationViewModel extends geocortex.framework.ui.ViewModelBase {
        enabled: Observable<boolean>;
        dataRelayUri: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class BottomPanelViewModel extends geocortex.framework.ui.ViewModelBase {
        bottomRegionHeight: Observable<string | number>;
        hasBottomPanel: Observable<boolean>;
        textErrorMessage: Observable<string>;
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class BookmarksViewModel extends geocortex.framework.ui.ViewModelBase {
        managedProperties: string[];
        bookmarksEnabled: Observable<boolean>;
        showBookmarksButton: Observable<boolean>;
        region: Observable<string>;
        constructor(app: framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class CoordinatesViewModel extends geocortex.framework.ui.ViewModelBase {
        managedProperties: Array<string>;
        isEnabled: Observable<boolean>;
        isEnabledId: Observable<string>;
        openByDefault: Observable<boolean>;
        openByDefaultId: Observable<string>;
        useBasemapCoordinates: Observable<boolean>;
        useBasemapCoordinatesId: Observable<string>;
        numDigits: Observable<number>;
        numDigitsId: Observable<string>;
        coordinateSystems: ObservableCollection<CoordinateSystem>;
        coordinateSystemsId: Observable<string>;
        errorMessage: Observable<string>;
        displayNameError: Observable<string>;
        wkidError: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
        validCoordinateSystem(coordinateSystem: CoordinateSystem): boolean;
        generateCoordinateSystemFromDialog(dialog: JQuery): CoordinateSystem;
        saveNewCoordinateSystem(dialog: JQuery): boolean;
        saveEditedCoordinateSystem(dialog: JQuery, arrayPosition: number): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class OverviewMapViewModel extends geocortex.framework.ui.ViewModelBase {
        managedProperties: Array<string>;
        isEnabled: Observable<boolean>;
        isEnabledId: Observable<string>;
        openByDefault: Observable<boolean>;
        openByDefaultId: Observable<string>;
        extentScaleFactor: Observable<number>;
        extentScaleFactorId: Observable<string>;
        visibleExtentColour: geocortex.essentialsHtmlViewer.management.modules.shared.ColorPickerWidgetModel;
        visibleExtentColourId: Observable<string>;
        errorMessageExtent: Observable<string>;
        errorMessageColour: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Map {
    class MapModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Map {
    class MapView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        viewModel: MapViewModel;
        private _mapViewProperties;
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        handleApply(): any;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: MapViewModel): void;
        private _findMapViewConfig(managedConfig);
        validate(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Map {
    class MapViewModel extends geocortex.framework.ui.ViewModelBase {
        minScale: Observable<number>;
        maxScale: Observable<number>;
        textErrorMessage: Observable<string>;
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.offline {
    /**
     * This is not a good pattern.  I'm just documenting what existing JS code was doing.
     */
    interface HackedMapService extends geocortex.essentials.MapService {
        isProvisioned: Observable<boolean>;
        tpkFilename: Observable<string>;
        title: Observable<string>;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.offline {
    class OfflineModule extends geocortex.framework.application.ModuleBase {
    }
}
declare var createQRToolTip: Function;
declare module geocortex.essentialsHtmlViewer.management.modules.offline {
    class OfflineView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        viewModel: OfflineViewModel;
        attach(viewModel?: OfflineViewModel): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: OfflineViewModel): void;
        toggleProvision(evt: any, element: any, context: HackedMapService): void;
        tpkFileUpdated(evt: any, element: any, context: HackedMapService): void;
        handleApply(): any;
        handleClickEvent(evt: any, element: any): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.offline {
    class OfflineViewModel extends geocortex.framework.ui.ViewModelBase {
        static advertiseTag: string;
        static autoInstallTag: string;
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        advertiseOriginal: boolean;
        autoInstallOriginal: boolean;
        isLoading: Observable<boolean>;
        templatePath: Observable<string>;
        viewerFrameworks: ObservableCollection<any>;
        baseMaps: ObservableCollection<HackedMapService>;
        hasBaseMap: Observable<boolean>;
        multipleTemplates: Observable<boolean>;
        advertise: Observable<boolean>;
        autoInstall: Observable<boolean>;
        constructor(app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication, libraryId?: string);
        onSiteInitialized(site: geocortex.essentials.Site, moduleConfig: any): void;
        /**
         * Fetch the tags from the viewer's endpoint and process them to see if gmafadvertised is set.
         */
        fetchTags(): void;
        setTags(): void;
        private _setTag(tag, add);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class CommandParameterWidget extends geocortex.framework.ui.ViewBase {
        viewModel: CommandParameterWidgetViewModel;
        commandParameterTextBox: any;
        commandParameterTextArea: any;
        private _textBox;
        attach(viewModel: CommandParameterWidgetViewModel): void;
        destroy(): void;
        private _setupCommandParameterAutoComplete();
        private _getCommandParameterSuggestions(request, response);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class CommandParameterWidgetViewModel extends geocortex.framework.ui.ViewModelBase {
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        command: string;
        commandMetadata: geocortex.essentialsHtmlViewer.Commands.CommandMetadataDescriptor;
        rawCommandParameter: Observable<string>;
        commandParameter: Observable<any>;
        commandPlaceHolder: Observable<string>;
        displayTextArea: Observable<boolean>;
        validTextAreaJson: Observable<boolean>;
        statusMessage: Observable<string>;
        inputElementDisabled: Observable<boolean>;
        workflows: string[];
        constructor(app: framework.application.Application, libraryId?: string);
        setCommand(commandName: string): void;
        validate(value: string): void;
        private _onSiteInitialized(site);
        private _updateStatus(value, isValid);
        private _commandMetadataChanged();
        private _computeCommandPlaceHolder();
        private _commandMetadataContainsMultipleParams();
        private _resolveRawCommandParameter(val);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class StateResourceViewModel {
        rawValue: Observable<string>;
        enabled: Observable<boolean>;
        private managedApp;
        private libraryDownloadedEventToken;
        initialize(managedApp: geocortex.essentialsHtmlViewer.management.infrastructure.ManagedApplication, managedLibraryId: string): void;
        viewModelInitialized(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class StateResourceWidget extends geocortex.framework.ui.ViewBase {
        rawValueTextBox: HTMLElement;
        attach(viewModel?: any): void;
        viewModelInitialized(): void;
        initAutoComplete(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class LoadPresetView extends geocortex.framework.ui.ViewBase {
        viewModel: ToolbarEditorViewModel;
        constructor(app: any, libraryId: string);
        handleDefaultPresetClick(evt: Event, el: HTMLElement, context: any): void;
        handleFullPresetClick(evt: Event, el: HTMLElement, context: any): void;
        handleCancelClick(evt: Event, el: HTMLElement, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class LanguageResourceWidget extends geocortex.framework.ui.ViewBase {
        rawValueTextBox: HTMLElement;
        attach(viewModel?: any): void;
        viewModelInitialized(): void;
        initAutoComplete(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ToggleButtonEditorView extends geocortex.framework.ui.ViewBase {
        viewModel: ToggleButtonEditorViewModel;
        toggleOnButtonIconUriInput: HTMLElement;
        toggleOffButtonIconUriInput: HTMLElement;
        attach(viewModel?: any): void;
        handleCancelClick(el: HTMLElement, evt: Event, context: any): void;
        handleSubmit(): boolean;
        validate(textString: string, messageProperty: Observable<string>): boolean;
        handleBrowseToggleOnIconUri(element: HTMLElement, event: Event, context: any): void;
        handleBrowseToggleOffIconUri(element: HTMLElement, event: Event, context: any): void;
        handleBrowseIconUri(element: HTMLElement, event: Event, context: any, targetConfig: string): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface ISerializable {
        toJSON(): any;
        clone(): any;
    }
    class ToolbarItem extends geocortex.framework.ui.ViewModelBase implements ISerializable {
        toJSON(): any;
        clone(): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface ToggleButton {
        id: string;
        type: string;
        name?: string;
        hideOnDisable?: boolean;
        iconUri?: string;
        tooltip?: string;
        toggleStateName?: string;
        toggleOn: geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToggleStateConfig;
        toggleOff: geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToggleStateConfig;
    }
    class ToggleButtonEditorViewModel extends ToolbarItem {
        isNew: boolean;
        parentGroup: GroupEditorViewModel;
        masterViewModel: any;
        name: geocortex.essentialsHtmlViewer.management.modules.shared.LanguageResourceViewModel;
        toggleStateName: geocortex.essentialsHtmlViewer.management.modules.shared.StateResourceViewModel;
        displayIconUri: Observable<string>;
        type: string;
        guid: string;
        id: string;
        toggleOnButtonName: any;
        toggleOnButtonTooltip: any;
        toggleOnButtonCommand: geocortex.essentialsHtmlViewer.management.modules.shared.CommandAutoCompleteWidgetViewModel;
        toggleOnButtonIconUri: Observable<string>;
        toggleOnButtonHideOnDisable: Observable<boolean>;
        toggleOnButtonCommandParamWidgetContext: geocortex.essentialsHtmlViewer.management.modules.shared.CommandParameterWidgetViewModel;
        toggleOnButtonTextErrorMessage: Observable<string>;
        toggleOnButtonIconUriId: Observable<string>;
        toggleOnButtonDisplayIconUri: Observable<string>;
        toggleOffButtonName: any;
        toggleOffButtonTooltip: any;
        toggleOffButtonCommand: geocortex.essentialsHtmlViewer.management.modules.shared.CommandAutoCompleteWidgetViewModel;
        toggleOffButtonIconUri: Observable<string>;
        toggleOffButtonHideOnDisable: Observable<boolean>;
        toggleOffButtonCommandParamWidgetContext: geocortex.essentialsHtmlViewer.management.modules.shared.CommandParameterWidgetViewModel;
        toggleOffButtonTextErrorMessage: Observable<string>;
        toggleOffButtonIconUriId: Observable<string>;
        toggleOffButtonDisplayIconUri: Observable<string>;
        private _managementLibraryId;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(toggleButton?: ToggleButton): void;
        toJSON(): ToggleButton;
        clone(): ToggleButtonEditorViewModel;
        protected _setupBindings(): void;
        toggleOnButtonIconUriChanged(value?: string): void;
        toggleOffButtonIconUriChanged(value?: string): void;
        protected _iconUriChanged(value: string, source: string): void;
        protected _setDisplayName(): void;
        protected _cleanseStringAndRetrieveResource(libraryId: string, langResource: string): string;
        setParentGroup(parenGroup: GroupEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    var ToolbarLayouts: string[];
    var DefaultToolbarLayout: string;
}
declare module geocortex.essentialsHtmlViewer.management.modules.InstantSearch {
    class InstantSearchView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        instantSearchProviderConfigProps: string[];
        searchViewModelConfigProps: string[];
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        attach(viewModel?: any): void;
        handleApply(): any;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: InstantSearchViewModel): void;
        getInstantSearchProviderConfig(managedConfig: infrastructure.ManagedConfiguration): any;
        getSearchViewModelConfig(managedConfig: infrastructure.ManagedConfiguration): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.InstantSearch {
    class InstantSearchViewModel extends geocortex.framework.ui.ViewModelBase {
        enableSearchHints: Observable<boolean>;
        precedenceToNearbyResults: Observable<boolean>;
        minimumPopulateDelay: Observable<number>;
        minimumPrefixLength: Observable<number>;
        maxHints: Observable<number>;
        maxResults: Observable<number>;
        textErrorMessage: Observable<string>;
        validateNumericValues(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class MapWidgetsModule extends geocortex.framework.application.ModuleBase {
    }
    interface CoordinateSystem {
        displayName: string;
        wkid?: number;
        wkt?: string;
        output: string;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class MapWidgetsView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        viewModel: MapWidgetsViewModel;
        wkidInputElement: HTMLInputElement;
        wktTextAreaElement: HTMLTextAreaElement;
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        activated(): void;
        handleApply(): any;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: MapWidgetsViewModel): void;
        openAddNewModal(): void;
        openEditModal(event: Event, element: HTMLElement, context: any): void;
        wkidChanged(evt: any, el: any, context: any): void;
        wktChanged(evt: any, el: any, context: any): void;
        removeCoordinateSystem(): void;
        private findScalebarView(managedConfig);
        private _findBookmarksView(managedConfig);
        private findViewModel(managedConfig, viewModelName);
        validate(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class MapWidgetsViewModel extends geocortex.framework.ui.ViewModelBase {
        scalebar: Observable<ScalebarViewModel>;
        overviewMap: Observable<OverviewMapViewModel>;
        overviewMapInConfig: Observable<boolean>;
        coordinates: Observable<CoordinatesViewModel>;
        coordinatesInConfig: Observable<boolean>;
        bookmarksViewModel: Observable<BookmarksViewModel>;
        bookmarksInConfig: Observable<boolean>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.layerList {
    class LayerListModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.layerList {
    class LayerListSettingsViewModel extends geocortex.framework.ui.ViewModelBase {
        enableLegendIntegration: Observable<boolean>;
        showTransparencySlider: Observable<boolean>;
        autoExpandLegendSwatches: Observable<boolean>;
        onlyShowSwatchesOnVisibleLayers: Observable<boolean>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.layerList {
    class LayerListView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        layerListModuleProperties: string[];
        layerListViewModelProperties: string[];
        attach(viewModel?: any): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: any): void;
        handleApply(): void;
        findLayerListViewModel(managedConfig: any): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.layerList {
    class LayerListViewModel extends geocortex.framework.ui.ViewModelBase {
        layerListSettingsViewModel: Observable<any>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class FeatureDetailsViewModel extends geocortex.framework.ui.ViewModelBase {
        descriptionField: Observable<any>;
        descriptionFieldOptions: ObservableCollection<{
            "display": string;
            "config": string;
        }>;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class MapTipsViewModel extends geocortex.framework.ui.ViewModelBase {
        contentField: Observable<any>;
        contentFieldOptions: ObservableCollection<{
            "display": string;
            "config": string;
        }>;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class ResultsListViewModel extends geocortex.framework.ui.ViewModelBase {
        contentField: Observable<any>;
        contentFieldOptions: ObservableCollection<{
            "display": string;
            "config": string;
        }>;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.mapwidgets {
    class ScalebarViewModel extends geocortex.framework.ui.ViewModelBase {
        managedProperties: Array<string>;
        showScalebar: Observable<boolean>;
        showScalebarId: Observable<string>;
        scalebarUnit: Observable<string>;
        scalebarUnitOptions: ObservableCollection<{
            display: string;
            config: string;
        }>;
        scalebarUnitError: Observable<string>;
        scalebarStyle: Observable<string>;
        scalebarStyleOptions: ObservableCollection<{
            display: string;
            config: string;
        }>;
        showBackground: Observable<boolean>;
        showBackgroundId: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.OptimizerIntegration {
    class OptimizerIntegrationView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        optimizerIntegrationModuleProperties: string[];
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        attach(viewModel?: any): void;
        handleApply(): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: OptimizerIntegrationViewModel): void;
        getOptimizerIntegrationConfig(managedConfig: infrastructure.ManagedConfiguration): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.OptimizerIntegration {
    class OptimizerIntegrationViewModel extends geocortex.framework.ui.ViewModelBase {
        enabled: Observable<boolean>;
        userName: Observable<string>;
        dataRelayUri: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Pushpins {
    class PushpinsView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        pushpinsModuleProperties: string[];
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        pushpinUriInput: any;
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, libraryId: string);
        attach(viewModel?: any): void;
        handleApply(): any;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: PushpinsViewModel): void;
        getPushpinsModuleConfig(managedConfig: infrastructure.ManagedConfiguration): any;
        browsePushpinUriHandler(evt: any, element: any, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.Pushpins {
    class PushpinsViewModel extends geocortex.framework.ui.ViewModelBase {
        pushpinsEnabled: Observable<boolean>;
        pushpinMarkerUri: Observable<string>;
        pushpinMarkerWidth: Observable<number>;
        pushpinMarkerHeight: Observable<number>;
        offsetX: Observable<number>;
        offsetY: Observable<number>;
        eventMappings: string;
        pushpinUriId: Observable<string>;
        textErrorMessage: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validateNumericValues(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    /**
     * The model for the Color Picker Widget includes the state and configuration.
     */
    class ColorPickerWidgetModel extends geocortex.framework.ui.ViewModelBase {
        color: Observable<string>;
        includeAlpha: boolean;
        constructor(app?: framework.application.Application, libraryId?: string);
        initialize(config?: {
            color?: string;
            includeAlpha?: boolean;
        }): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    /**
     * Displays a color value in a text field that when clicked on reveals a color picker.
     * Picking an alpha value with the color is optional.
     */
    class ColorPickerWidget extends geocortex.framework.ui.ViewBase {
        inputElement: HTMLInputElement;
        private colorBindingToken;
        private ignoreSet;
        private timerToken;
        attach(viewModel?: ColorPickerWidgetModel): void;
        /**
         * Previously #aarrggbb was used for colours with alpha but this has never been a standard.
         * This should be doable with a parser but Colorpicker fails to init the button color when
         * starting up with such a value.  This probably represents a bug in Colorpicker but it was
         * hard to track down and this gets the job done.
         */
        private sanitizeColor(value);
        deactivated(): void;
        destroyBindings(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.HomePanel {
    class HomePanelModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.HomePanel {
    class HomePanelView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        infoViewModelProperties: string[];
        shellModuleProperties: string[];
        infoViewProperties: any[];
        richEditor: CLEditor;
        activated(): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: HomePanelViewModel): void;
        handleApply(): void;
        /**
         * InfoViewModel is not yet ported to TS.
         */
        findInfoViewModel(managedConfig: infrastructure.ManagedConfiguration): any;
        /**
         * InfoView is not yet ported to TS.
         */
        findInfoView(managedConfig: infrastructure.ManagedConfiguration): any;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.HomePanel {
    class HomePanelViewModel extends geocortex.framework.ui.ViewModelBase {
        content: Observable<string>;
        homePanelVisible: Observable<boolean>;
        title: Observable<string>;
        included: Observable<boolean>;
        titleWidget: shared.LanguageResourceViewModel;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class DataFrameViewModel extends geocortex.framework.ui.ViewModelBase {
        dataFrameWidth: Observable<string | number>;
        dataFrameOpenByDefault: Observable<boolean>;
        maxWidth: Observable<string | number>;
        minWidth: Observable<string | number>;
        textErrorMessage: Observable<any>;
        hasDataFrame: Observable<boolean>;
        validateWidths(): boolean;
    }
}
declare module JQueryUI {
    interface Autocomplete {
        /**
         * This seems to come with standard jqueryui but it's not documented anywhere.
         */
        filter(array: any[], term: string): any[];
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    /**
     * The MenuItemView presents the UI for either editing or adding a menu item (such as an I Want to Menu item).
     * However it's done in a generic way so that we can reuse this widget to edit any type of menu item, not just
     * an IWTM item.
     */
    class MenuItemView extends geocortex.framework.ui.ViewBase {
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        viewModel: MenuItemViewModel;
        sortable: boolean;
        masterViewModel: any;
        isNew: boolean;
        commandTextBox: any;
        commandParameterTextBox: any;
        iconUriInput: any;
        constructor(app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication, libraryId?: string);
        attach(viewModel?: MenuItemViewModel): void;
        activated(): void;
        handleSubmit(): void;
        handleCancelClick(evt: Event, el: HTMLElement, context: any): void;
        browseIconUriHandler(evt: Event, element: HTMLElement, context: any): void;
        private _setupCommandAutoComplete();
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class BannerViewModel extends geocortex.framework.ui.ViewModelBase {
        applicationTitle: shared.LanguageResourceViewModel;
        applicationSubtitle: shared.LanguageResourceViewModel;
        titleColor: shared.ColorPickerWidgetModel;
        subtitleColor: shared.ColorPickerWidgetModel;
        backgroundColor: shared.ColorPickerWidgetModel;
        backgroundImage: Observable<{}>;
        backgroundImageId: Observable<{}>;
        leftImage: Observable<{}>;
        leftImageId: Observable<{}>;
        leftImageDescription: shared.LanguageResourceViewModel;
        rightImage: Observable<{}>;
        rightImageId: Observable<{}>;
        rightImageDescription: shared.LanguageResourceViewModel;
        height: Observable<number>;
        visible: Observable<boolean>;
        visibleId: Observable<string>;
        isBanner: Observable<boolean>;
        noBanner: Observable<boolean>;
        textErrorMessage: Observable<string>;
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class LookAndFeelModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class LookAndFeelView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        viewModel: LookAndFeelViewModel;
        bannerProperties: string[];
        bannerViewProperties: string[];
        dataframeProperties: string[];
        bottomPanelProperties: string[];
        resultslistProperties: string[];
        maptipsProperties: string[];
        backgroundImageInput: HTMLInputElement;
        leftImageInput: HTMLInputElement;
        rightImageInput: HTMLInputElement;
        attach(viewModel: any): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        findBannerViewModel(managedConfig: infrastructure.ManagedConfiguration): framework.config.ViewModelJson;
        findBannerView(managedConfig: infrastructure.ManagedConfiguration): framework.config.ViewJson;
        findDataframeViewModel(managedConfig: infrastructure.ManagedConfiguration): framework.config.ViewModelJson;
        findResultslistView(managedConfig: infrastructure.ManagedConfiguration): framework.config.ViewJson;
        findMapTipsModule(managedConfig: infrastructure.ManagedConfiguration): framework.config.ModuleJson;
        findFeatureDescriptionProvider(managedConfig: infrastructure.ManagedConfiguration): any;
        applyViewModel(viewModel: LookAndFeelViewModel): void;
        handleApply(): boolean;
        browseBackgroundHandler(evt: any, element: any, context: any): void;
        browseLeftImageHandler(evt: any, element: any, context: any): void;
        browseRightImageHandler(evt: any, element: any, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.lookandfeel {
    class LookAndFeelViewModel extends geocortex.framework.ui.ViewModelBase {
        browserTitle: shared.LanguageResourceViewModel;
        banner: Observable<BannerViewModel>;
        dataframe: Observable<DataFrameViewModel>;
        bottomPanel: Observable<BottomPanelViewModel>;
        resultslist: Observable<ResultsListViewModel>;
        maptips: Observable<MapTipsViewModel>;
        featureDetails: Observable<FeatureDetailsViewModel>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.navigation {
    class NavigationItem {
        text: Observable<string>;
        viewId: Observable<string>;
        iconUri: Observable<string>;
        cssClass: Observable<string>;
        cssListClass: Observable<string>;
        constructor();
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.navigation {
    class NavigationModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.navigation {
    class NavigationViewModel extends geocortex.framework.ui.ViewModelBase {
        items: ObservableCollection<NavigationItem>;
        isInitialized: boolean;
        initialize(config: any): void;
        containsViewId(viewId: string): boolean;
        getFirstViewId(): string;
        /**
         * Performed when configuration loaded.
         * @event
         */
        onInitialized(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.navigation {
    class NavigationView extends geocortex.framework.ui.ViewBase {
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        attach(viewModel?: NavigationViewModel): void;
        viewModelInitializedHandler(): void;
        navigate(evt: Event, element: HTMLElement, context: any): void;
        performHashChange(viewId: string): void;
        hashChangeEventHandler(): void;
        viewActivated(view: geocortex.framework.ui.ViewBase): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class CoalescePromptViewModel extends geocortex.framework.ui.ViewModelBase {
        shells: ObservableCollection<any>;
        selectedShell: Observable<any>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class SectionManagerModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class SectionViewModel extends geocortex.framework.ui.ViewModelBase {
        config: any;
        title: Observable<string>;
        showExpand: Observable<boolean>;
        showCoalesce: Observable<boolean>;
        explodeToolTip: Observable<string>;
        coalesceToolTip: Observable<string>;
        allowConfigureIndividually: Observable<boolean>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class CoalescePromptView extends geocortex.framework.ui.ViewBase {
        okCallback: (view: CoalescePromptView) => void;
        cancelCallback: (view: CoalescePromptView) => void;
        handleOKClick(evt: Event, el: HTMLElement, ctx: any): void;
        handleCancelClick(evt: Event, el: HTMLElement, ctx: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class SectionView extends geocortex.framework.ui.ViewBase {
        static EXPLODED_STATE: string;
        static COALESCED_STATE: string;
        app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication;
        coalescedViewContainer: geocortex.framework.ui.ViewBase;
        explodedViewContainer: geocortex.framework.ui.ViewBase;
        coalescedView: geocortex.framework.ui.ViewBase;
        managementViewRoot: Observable<HTMLElement>;
        isInitialized: boolean;
        constructor(app: geocortex.essentialsHtmlViewer.management.infrastructure.ManagementApplication, libraryId?: string);
        activated(): void;
        attach(viewModel?: SectionViewModel): void;
        managementAppInitialized(app: any): void;
        reloadConfiguration(): void;
        coalesce(viewModel?: geocortex.framework.ui.ViewModelBase): void;
        explode(viewModel?: geocortex.framework.ui.ViewModelBase): void;
        createViewContainer(containerViewId: string, containerContentRegionName: string): geocortex.framework.ui.ViewContainer.ViewContainerView;
        createManagementView(managedConfigs: infrastructure.ManagedConfiguration[], regionName: string): geocortex.framework.ui.ViewBase;
        destroyViewIfItExists(viewId: string): void;
        destroyRegionIfItExists(regionName: string): void;
        changeState(state: string, viewModel?: geocortex.framework.ui.ViewModelBase): void;
        updateMetadata(explodedShells: boolean): void;
        coalesceOK(coalescePromptView: any): void;
        coalesceCancel(coalescePromptView: any): void;
        explodeClickHandler(evt: Event, element: HTMLElement, context: any): void;
        coalesceClickHandler(evt: Event, element: HTMLElement, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.sectionmanager {
    class TabView extends geocortex.framework.ui.ViewBase {
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        handleClickTab(evt: Event, el: HTMLElement, ctx: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class MenuItemViewModel extends geocortex.framework.ui.ViewModelBase {
        iconUri: Observable<string>;
        text: LanguageResourceViewModel;
        description: LanguageResourceViewModel;
        command: Observable<string>;
        commandParameter: Observable<any>;
        commandParameterWidgetContext: geocortex.essentialsHtmlViewer.management.modules.shared.CommandParameterWidgetViewModel;
        hideOnDisable: Observable<boolean>;
        managedConfigs: any;
        managedLibraryId: string;
        menuConfig: any;
        hideOnDisableId: Observable<string>;
        supportsDisabling: Observable<boolean>;
        managedProperties: string[];
        isNew: boolean;
        menuEditorViewModel: MenuEditorViewModel;
        displayIconUri: Observable<string>;
        iconUriId: Observable<string>;
        displayText: Observable<string>;
        displayDescription: Observable<string>;
        textErrorMessage: Observable<string>;
        commandErrorMessage: Observable<string>;
        constructor(menuEditorViewModel: MenuEditorViewModel, app: geocortex.framework.application.Application, libraryId: string);
        initialize(managedConfigs: any, libraryId?: string): void;
        validate(): boolean;
        createNewMenuConfig(): any;
        iconUriChanged(value?: string): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class MenuEditorViewModel extends geocortex.framework.ui.ViewModelBase {
        title: LanguageResourceViewModel;
        defaultIconUri: Observable<string>;
        items: ObservableCollection<MenuItemViewModel>;
        menuConfigs: any;
        titleTranslated: string;
        mixinProperties: string[];
        managedLibraryId: string;
        managedConfigs: any;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        updateMenu(menuConfigs: any, managedLibraryId: string, managedConfigs: any): void;
        apply(viewModel: MenuEditorViewModel): void;
        syncConfigItemsAcrossAllManagedConfigurations(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    /**
     * The MenuEditorWidget presents the UI for manipulating a menu, such as an I Want to Menu.
     * However it's done in a generic way so that we can reuse this widget to edit any type of menu, not just
     * an IWTM menu.
     */
    class MenuEditorWidget extends geocortex.framework.ui.ViewBase {
        sortable: HTMLElement;
        itemView: MenuItemView;
        attach(viewModel?: any): void;
        /**
         * Reorders the menu items once a drag and drop reordering has been performed by the user
         */
        sortUpdate(event: Event, args: any): void;
        sortStop(event: Event, args: any): void;
        /**
         * Edit handler for the edit button click
         * Brings up an edit menu item dialog
         */
        editHandler(evt: Event, el: HTMLElement, itemViewModel: MenuItemViewModel): void;
        /**
         * Helper function to create a new view for editing (or adding) a menu item.
         * @param oldView The old view that this one replaces. This view will be destroyed.
         * @param isNewMenuItem Indicates whether to create a view for editing an item or for creating a new item.
         */
        createItemView(oldView: MenuItemView, isNewMenuItem: boolean): MenuItemView;
        /**
         * Helper function to create a new view for editing (or adding) a menu item.
         */
        createItemViewModel(): MenuItemViewModel;
        /**
         * Handler function for the delete button. Confirms with the user to make sure the item should be deleted.
         * If the user clicks yes, the item will be removed.
         */
        deleteHandler(evt: Event, el: HTMLElement, itemViewModel: MenuItemViewModel): void;
        /**
         * Handler function for the add button. Brings up a dialog to add the menu item.
         */
        addHandler(evt: Event, el: HTMLElement, itemViewModel: MenuEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shells {
    class ShellsModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shells {
    class SimpleShellView extends geocortex.framework.ui.ViewBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface Button {
        id: string;
        name: string;
        type: string;
        command: string;
        iconUri: string;
        commandParameter: string;
        hideOnDisable: boolean;
        tooltip: string;
    }
    class ButtonEditorViewModel extends ToolbarItem {
        isNew: boolean;
        parentGroup: GroupEditorViewModel;
        masterViewModel: any;
        textErrorMessage: Observable<string>;
        displayIconUri: Observable<string>;
        iconUriId: Observable<string>;
        name: any;
        tooltip: any;
        command: geocortex.essentialsHtmlViewer.management.modules.shared.CommandAutoCompleteWidgetViewModel;
        type: string;
        guid: string;
        id: string;
        iconUri: Observable<string>;
        hideOnDisable: Observable<boolean>;
        commandParameterWidgetContext: geocortex.essentialsHtmlViewer.management.modules.shared.CommandParameterWidgetViewModel;
        private _managementLibraryId;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(button?: any): void;
        toJSON(): Button;
        clone(): ButtonEditorViewModel;
        iconUriChanged(value?: string): void;
        setParentGroup(parenGroup: GroupEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ButtonEditorView extends geocortex.framework.ui.ViewBase {
        iconUriInput: any;
        attach(viewModel?: any): void;
        handleCancelClick(el: HTMLElement, evt: Event, context: any): void;
        handleSubmit(): boolean;
        validate(textString: string): boolean;
        handleBrowseIconUri(element: HTMLElement, event: Event, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class CommandAutoCompleteWidget extends geocortex.framework.ui.ViewBase {
        cmdTextbox: HTMLElement;
        constructor(app: any, libraryId: any);
        attach(viewModel?: any): void;
        setCommandsAutoComplete(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.shared {
    class CommandAutoCompleteWidgetViewModel extends geocortex.framework.ui.ViewModelBase {
        commandName: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId?: string);
        initialize(config: string | {
            [key: string]: any;
        }): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface Tool {
        id: string;
        name: string;
        type: string;
        iconUri: string;
        command: string;
        drawMode: string;
        hideOnDisable: boolean;
        isSticky: boolean;
        tooltip: string;
        statusText: string;
    }
    class ToolEditorViewModel extends ToolbarItem {
        guid: string;
        isNew: boolean;
        parentGroup: GroupEditorViewModel;
        masterViewModel: any;
        drawModes: ObservableCollection<string>;
        textErrorMessage: Observable<string>;
        drawModesBucket: {};
        iconUriId: Observable<string>;
        displayIconUri: Observable<string>;
        id: string;
        type: string;
        name: any;
        tooltip: any;
        statusText: any;
        iconUri: Observable<string>;
        command: any;
        drawMode: Observable<string>;
        hideOnDisable: Observable<boolean>;
        isSticky: Observable<boolean>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(tool: any): void;
        toJSON(): Tool;
        clone(): ToolEditorViewModel;
        setDrawModes(): void;
        getDrawModeKey(value: string): string;
        iconUriChanged(value?: string): void;
        setParentGroup(parenGroup: GroupEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface Region {
        id: string;
        regionName: string;
        type: string;
    }
    class RegionEditorViewModel extends ToolbarItem {
        toolbarItem: Observable<any>;
        guid: string;
        isNew: boolean;
        parentGroup: GroupEditorViewModel;
        masterViewModel: any;
        textErrorMessage: Observable<string>;
        displayIconUri: Observable<string>;
        id: string;
        name: any;
        type: string;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(region?: any): void;
        toJSON(): Region;
        clone(): RegionEditorViewModel;
        setParentGroup(parenGroup: GroupEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    interface ToolbarGroup {
        id: string;
        name: string;
        type: string;
        items: any[];
        layout?: string;
    }
    class GroupEditorViewModel extends ToolbarItem {
        isNew: boolean;
        masterViewModel: any;
        guid: string;
        parentGroup: Observable<GroupEditorViewModel>;
        textErrorMessage: Observable<string>;
        supportedLayouts: ObservableCollection<string>;
        isMultitool: Observable<boolean>;
        isCompactToolbar: Observable<boolean>;
        id: string;
        name: any;
        type: string;
        items: ObservableCollection<any>;
        layout: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        initialize(toolbarGroup?: any, parentGroup?: GroupEditorViewModel): void;
        constructItemsFromConfig(itemsConfig: any): ToolbarItem[];
        constructItem(itemConfig: any): ToolbarItem;
        toJSON(): ToolbarGroup;
        getItemsToJSON(): any[];
        clone(): GroupEditorViewModel;
        setParentGroup(parenGroup: GroupEditorViewModel): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class RegionEditorView extends geocortex.framework.ui.ViewBase {
        attach(viewModel?: any): void;
        handleCancelClick(el: HTMLElement, evt: Event, context: any): void;
        handleSubmit(): any;
        validate(textString: string): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    enum validationError {
        noName = 0,
        hasImproperChildren = 1,
        hasImproperParent = 2,
    }
    class GroupEditorView extends geocortex.framework.ui.ViewBase {
        handleCancelClick(el: HTMLElement, evt: Event, context: any): void;
        handleSubmit(): boolean;
        validate(): validationError;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ToolbarWrapper {
        itemsBucket: {
            [id: string]: any;
        };
        app: any;
        libraryId: any;
        managedLibraryId: string;
        constructor(app: any, libraryId: any);
        replaceItem(item: any): void;
        addToItemBucket(item: any): void;
        removeItemsFromItemBucket(items: any): void;
        removeSingleItemFromItemBucket(item: any): boolean;
        updateItemsBucket(tools: any): void;
        constructToolbarFromConfig(toolbarConfig: any[]): any[];
        rebuildConfiguredToolbar(): ObservableCollection<any>;
        constructToolbarItemsList(listOfItems: any, parentGroup?: GroupEditorViewModel): ObservableCollection<any>;
        getUListItems(parent: any): JQuery;
        getUniqueId(): string;
        createNewToolbarGroupView(title: any): any;
        createNewToolbarGroupViewModel(tbr: any, isNew: boolean, parentGroup?: GroupEditorViewModel): GroupEditorViewModel;
        createToolView(title: any): any;
        createToolViewModel(tool: any, isNew: boolean): ToolEditorViewModel;
        createButtonView(title: any): any;
        createButtonViewModel(button: any, isNew: boolean): ButtonEditorViewModel;
        createToggleButtonView(title: any): any;
        createToggleButtonViewModel(toggleButton: any, isNew: boolean): ToggleButtonEditorViewModel;
        createRegionView(title: any): any;
        createRegionViewModel(region: any, isNew: boolean): RegionEditorViewModel;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    var tools: any;
    var simpleTools: any;
    var defaultToolbar: any;
    var defaultCompactToolbar: any;
    var fullToolbar: any;
    class ToolbarConfig {
        toolbarViewModel: Observable<any>;
        toolbarOpenByDefault: Observable<boolean>;
        toolbarVisibleTools: Observable<number>;
        isToolbarModified: Observable<boolean>;
        toolbarGroupRegistry: any;
        availableTools: ObservableCollection<any>;
        configuredTools: ObservableCollection<any>;
        toolbarModule: any;
        toolbarConfig: any;
        toolbarGroupsConfig: any;
        id: Observable<string>;
        type: Observable<string>;
        toolbarWrapper: ToolbarWrapper;
        openToolbarByDefaultCheckboxId: Observable<string>;
    }
    class ToolbarEditorViewModel extends geocortex.framework.ui.ViewModelBase {
        app: essentialsHtmlViewer.ViewerApplication;
        static tabbedToolbarViewModelId: string;
        static compactToolbarViewModelId: string;
        activeToolbar: Observable<ToolbarConfig>;
        tabbedToolbar: ToolbarConfig;
        compactToolbar: ToolbarConfig;
        managedConfigs: any[];
        failedToFindToolbar: Observable<boolean>;
        showMessage: Observable<string>;
        isCompactToolbar: Observable<boolean>;
        validNumberOfCompactToolbarTools: Observable<boolean>;
        radioButtons: HTMLElement;
        tabbedToolbarRadioButtonId: Observable<string>;
        compactToolbarRadioButtonId: Observable<string>;
        openToolbarByDefaultCheckboxId: Observable<string>;
        constructor(app: essentialsHtmlViewer.ViewerApplication, libraryId: string);
        setup(managedConfigs: any[]): void;
        private _activateToolbarViewModel(toolbarConfig, toolbarModule, toolbarViewModelBase, managedLibraryId);
        initializeTools(): void;
        initializeAvailableTools(): void;
        initializeConfiguredTools(): void;
        revertToDefaultToolbar(): void;
        revertToFullToolbar(): void;
        toolbarModified(): void;
        removeItem(item: any, src?: ObservableCollection<any>, isRemoved?: boolean): boolean;
        editExistingItem(item: any, src?: ObservableCollection<any>, isEdited?: boolean): boolean;
        addNewItem(item: any, parentGroup: any): void;
        removeToolbar(): void;
        toJSON(): {
            "toolbarGroups": any[];
        };
        tabsToJSON(): {
            "toolbarGroupRefs": any[];
        };
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ToolbarEditorView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        viewModel: ToolbarEditorViewModel;
        toolbarProperties: string[];
        toolbarViewModelProperties: string[];
        compactToolbarViewModelProperties: string[];
        configuredToolbarElement: HTMLElement;
        btnCopyDefault: HTMLElement;
        btnRevertDefault: HTMLElement;
        radioButtons: HTMLElement;
        previousActiveToolMenuId: any;
        private _bindToken;
        private _initalBindingPerformed;
        constructor(app: any, libraryId: string);
        activated(): void;
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        _subscribeEvents(): void;
        toolbarChanged(evt: any, el: HTMLSelectElement, context: any): boolean;
        intializeSorting(): void;
        initializeToolRegistryDragging(activeToolbarType: string): void;
        /**
         * Used to bind the clickable/draggable elements to a function that is executed whenever they are dropped in the
         * right place.
         */
        private _performBindings();
        sortUpdate: (event: any, ui: any) => void;
        refreshInteractivity(): void;
        handleRevertToDefault(el: HTMLElement, evt: any, context: any): void;
        handleLoadPreset(el: HTMLElement, evt: any, context: any): void;
        handleRemoveItem(el: HTMLElement, evt: any, context: any): void;
        handleRemoveToolbar(el: HTMLElement, evt: any, context: any): void;
        handleEditItem(el: HTMLElement, evt: any, context: any): void;
        /**
         * Used to tell a GroupEditorViewModel whether the user has compact or tabbed tooblar selected.
         */
        protected _setViewModelCompactToolbar(viewModel: any): void;
        handleAddItem(el: HTMLElement, evt: any, context: any): void;
        handleAddTab(el: HTMLElement, evt: any, context: any): void;
        handleAddGroup(el: HTMLElement, evt: any, context: any): void;
        handleAddButton(el: HTMLElement, evt: any, context: any): void;
        handleAddToggleButton(el: HTMLElement, evt: any, context: any): void;
        handleAddTool(el: HTMLElement, evt: any, context: any): void;
        handleAddRegion(el: HTMLElement, evt: any, context: any): void;
        handleCancelClick(el: HTMLElement, evt: any, context: any): void;
        handleCloseMenu(el: HTMLElement, evt: any, context: any): void;
        handleToggleBranch: (evt: any, el: any, context: any) => void;
        handleApply(): void;
        applyViewModel(viewModel: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ToolbarModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolbar {
    class ToolEditorView extends geocortex.framework.ui.ViewBase {
        drawModeSelect: HTMLElement;
        iconUriInput: HTMLElement;
        drawModes: string[];
        attach(viewModel?: any): void;
        handleCancelClick(el: HTMLElement, evt: Event, context: any): void;
        handleSubmit(): boolean;
        validate(textString: string): boolean;
        handleBrowseIconUri(element: HTMLElement, event: Event, context: any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class ToolBehaviorModule extends geocortex.framework.application.ModuleBase {
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class BufferViewModel extends geocortex.framework.ui.ViewModelBase {
        bufferModuleProperties: string[];
        bufferViewModelProperties: string[];
        availableBufferUnits: ObservableCollection<{
            display: string;
            config: string;
            isSelected: Observable<boolean>;
        }>;
        bufferProjectionWkid: Observable<string>;
        bufferUnits: string[];
        defaultBufferUnit: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        refreshSelectedBufferUnits(): void;
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class IdentifyViewModel extends geocortex.framework.ui.ViewModelBase {
        identifyModuleProperties: string[];
        pixelTolerance: Observable<number | string>;
        visibleLayersOnly: Observable<boolean>;
        layersInVisibleScaleRangeOnly: Observable<boolean>;
        pixelToleranceValueError: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class MeasurementViewModel extends geocortex.framework.ui.ViewModelBase {
        measurementModuleProperties: string[];
        measurementViewModelProperties: string[];
        lengthUnits: ObservableCollection<{
            display: string;
            config: string;
        }>;
        areaUnits: ObservableCollection<{
            display: string;
            config: string;
        }>;
        calculationTypeOptions: ObservableCollection<{
            text: string;
            option: string;
        }>;
        measurementProjectionWkid: Observable<string>;
        measurementAreaUnits: Observable<string>;
        measurementLengthUnits: Observable<string>;
        enablePrediction: Observable<boolean>;
        enableWkidInput: Observable<boolean>;
        addMarkupToMapByDefault: Observable<boolean>;
        calculationType: Observable<string>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class ToolBehaviorView extends geocortex.essentialsHtmlViewer.management.infrastructure.ShellSectionView {
        applyConfigs(managedConfigs: infrastructure.ManagedConfiguration[]): void;
        applyViewModel(viewModel: any): void;
        handleApply(): void;
        findMeasurementViewModel(managedConfig: any): any;
        findBufferOptionsViewModel(managedConfig: any): any;
        validate(): void;
    }
}
declare module geocortex.essentialsHtmlViewer.management.modules.toolBehavior {
    class ToolBehaviorViewModel extends geocortex.framework.ui.ViewModelBase {
        measurementToolBehaviorViewModel: Observable<MeasurementViewModel>;
        identifyToolBehaviorViewModel: Observable<IdentifyViewModel>;
        bufferToolBehaviorViewModel: Observable<BufferViewModel>;
        constructor(app: geocortex.framework.application.Application, libraryId: string);
        validate(): boolean;
    }
}
