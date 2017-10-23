function shim(a,b,c){"string"==typeof a&&(c=b,b=a);if(typeof c === "undefined"){console.warn("Undefined shim for: " + b);return;}for(var d=b.split("."),e=null,f=window,g=0,h=d.length;g<h;g++)e=d[g],g==h-1?f[e]=c:f[e]||(f[e]={}),f=f[e]}
define(["geocortex/infrastructure/AreaOfInterestMask",
"geocortex/infrastructure/ArrayUtils",
"geocortex/infrastructure/AttachmentInfo",
"geocortex/infrastructure/AttributeGroup",
"geocortex/infrastructure/BookmarkManager",
"geocortex/infrastructure/CancellationTokenSource",
"geocortex/infrastructure/ClusterLayer",
"geocortex/infrastructure/ColorUtils",
"geocortex/infrastructure/CommandViewModel",
"geocortex/infrastructure/ContentPolicy",
"geocortex/infrastructure/DataLinkingResult",
"geocortex/infrastructure/DateFormat",
"geocortex/infrastructure/Dictionary",
"geocortex/infrastructure/DistanceConverter",
"geocortex/infrastructure/ExportTilesUtils",
"geocortex/infrastructure/Feature",
"geocortex/infrastructure/FeatureAttribute",
"geocortex/infrastructure/FeatureDescriptionPresenterView",
"geocortex/infrastructure/FeatureSet",
"geocortex/infrastructure/FeatureSetCollection",
"geocortex/infrastructure/FeatureSetManager",
"geocortex/infrastructure/FilterUtils",
"geocortex/infrastructure/FocusUtils",
"geocortex/infrastructure/FormatUtils",
"geocortex/infrastructure/GeometryUtils",
"geocortex/infrastructure/GraphicUtils",
"geocortex/infrastructure/HighlightManager",
"geocortex/infrastructure/KmlFeature",
"geocortex/infrastructure/LayerIntegrationUtils",
"geocortex/infrastructure/MapUtils",
"geocortex/infrastructure/MatrixUtils",
"geocortex/infrastructure/NumberFormat",
"geocortex/infrastructure/ObjectFilter",
"geocortex/infrastructure/PortalUtils",
"geocortex/infrastructure/PresentableDelegateFactory",
"geocortex/infrastructure/PromiseUtils",
"geocortex/infrastructure/Reporting",
"geocortex/infrastructure/SecurityUtils",
"geocortex/infrastructure/ShellUtils",
"geocortex/infrastructure/SimpleRenderer",
"geocortex/infrastructure/SymbolUtils",
"geocortex/infrastructure/TaskUtils",
"geocortex/infrastructure/TimeSliderUtils",
"geocortex/infrastructure/TimeZoneUtils",
"geocortex/infrastructure/UrlUtilities",
"geocortex/infrastructure/VisualizationUtils",
"geocortex/infrastructure/accessibility/AccessibilityManager",
"geocortex/infrastructure/accessibility/AccessibilityProviderBase",
"geocortex/infrastructure/accessibility/AccessibleMapComponent",
"geocortex/infrastructure/accessibility/BoxEditor",
"geocortex/infrastructure/accessibility/Draw",
"geocortex/infrastructure/accessibility/Edit",
"geocortex/infrastructure/accessibility/EditCapabilityBase",
"geocortex/infrastructure/accessibility/GraphicMover",
"geocortex/infrastructure/accessibility/InputMethod",
"geocortex/infrastructure/accessibility/MultipointVertexEditor",
"geocortex/infrastructure/accessibility/PolygonVertexEditor",
"geocortex/infrastructure/accessibility/PolylineVertexEditor",
"geocortex/infrastructure/accessibility/VertexEditor",
"geocortex/infrastructure/buffer/BufferUtils",
"geocortex/infrastructure/commandArgs/AddStatusArgs",
"geocortex/infrastructure/commandArgs/ClusterLayerArgs",
"geocortex/infrastructure/commandArgs/ProjectArgs",
"geocortex/infrastructure/commandArgs/ShowMapElementArgs",
"geocortex/infrastructure/coordinates/AngleDirectionSystem",
"geocortex/infrastructure/coordinates/AngleFormat",
"geocortex/infrastructure/coordinates/CoordinatesManager",
"geocortex/infrastructure/coordinates/CoordinatesModel",
"geocortex/infrastructure/coordinates/CoordinateUtils",
"geocortex/infrastructure/documents/DocumentCollection",
"geocortex/infrastructure/documents/GrantEditorView",
"geocortex/infrastructure/documents/GrantEditorViewModel",
"geocortex/infrastructure/documents/GuestLinkModel",
"geocortex/infrastructure/documents/MonikerModel",
"geocortex/infrastructure/eventArgs/AuthenticationEventArgs",
"geocortex/infrastructure/eventArgs/FeatureSetManagerEventArgs",
"geocortex/infrastructure/eventArgs/GeolocationEventArgs",
"geocortex/infrastructure/eventArgs/MapExtentEventArgs",
"geocortex/infrastructure/eventArgs/ResultsPageChangedEventArgs",
"geocortex/infrastructure/eventArgs/SearchProgressEventArgs",
"geocortex/infrastructure/eventArgs/SnappingFeedbackEventArgs",
"geocortex/infrastructure/eventArgs/UserEventArgs",
"geocortex/infrastructure/featureDetails/FeatureProviderBase",
"geocortex/infrastructure/gis/AppInfo",
"geocortex/infrastructure/gis/DomainInfo",
"geocortex/infrastructure/gis/FieldInfo",
"geocortex/infrastructure/gis/GisUtils",
"geocortex/infrastructure/gis/LayerInfo",
"geocortex/infrastructure/gis/MapInfo",
"geocortex/infrastructure/gis/ServiceLayerInfo",
"geocortex/infrastructure/highlightedLabel/HighlightedLabelGraphic",
"geocortex/infrastructure/highlightedLabel/HighlightedLabelUtils",
"geocortex/infrastructure/identify/IdentifyProviderBase",
"geocortex/infrastructure/identify/GraphicsLayerIdentifyProvider",
"geocortex/infrastructure/identify/WorkflowIdentifyTaskIdentifyProvider",
"geocortex/infrastructure/identify/MapIdentifyTaskIdentifyProvider",
"geocortex/infrastructure/identify/RasterIdentifyTaskIdentifyProvider",
"geocortex/infrastructure/layerCatalog/LayerCatalogFilterProviderBase",
"geocortex/infrastructure/layerList/LayerList",
"geocortex/infrastructure/layerList/LayerListFolderItem",
"geocortex/infrastructure/layerList/LayerListGraphicsLayerItem",
"geocortex/infrastructure/layerList/LayerListItem",
"geocortex/infrastructure/layerList/LayerListItemCollection",
"geocortex/infrastructure/layerList/LayerListKmlFolderItem",
"geocortex/infrastructure/layerList/LayerListLayerItem",
"geocortex/infrastructure/layerList/LayerListMapServiceItem",
"geocortex/infrastructure/layerList/LayerListNode",
"geocortex/infrastructure/layerList/LayerVisibilityType",
"geocortex/infrastructure/layerselector/LayerSelector",
"geocortex/infrastructure/layerselector/LayerSelectorViewBase",
"geocortex/infrastructure/layerselector/LayerSelectorViewModelBase",
"geocortex/infrastructure/legend/LegendItem",
"geocortex/infrastructure/legend/LegendItemProviderEntry",
"geocortex/infrastructure/legend/LegendItemProviderFactory",
"geocortex/infrastructure/legend/LegendItemProviderResponse",
"geocortex/infrastructure/menus/BatchItemModel",
"geocortex/infrastructure/menus/MenuItemModel",
"geocortex/infrastructure/menus/MenuItemViewModel",
"geocortex/infrastructure/menus/MenuModel",
"geocortex/infrastructure/menus/MenuRegistry",
"geocortex/infrastructure/menus/MenuView",
"geocortex/infrastructure/menus/MenuViewModel",
"geocortex/infrastructure/native/MessageClient",
"geocortex/infrastructure/native/NativeManager",
"geocortex/infrastructure/offline/BasemapDeleting",
"geocortex/infrastructure/offline/BasemapDownloading",
"geocortex/infrastructure/offline/OfflineManager",
"geocortex/infrastructure/offline/OfflineMap",
"geocortex/infrastructure/offline/StringFormatting",
"geocortex/infrastructure/offline/SyncEngine",
"geocortex/infrastructure/offline/SyncInfo",
"geocortex/infrastructure/offline/SyncParameters",
"geocortex/infrastructure/offline/WorkCalculator",
"geocortex/infrastructure/project/ProjectConverter",
"geocortex/infrastructure/project/ProjectFilter",
"geocortex/infrastructure/project/ProjectManager",
"geocortex/infrastructure/results/FlatResultsViewModel",
"geocortex/infrastructure/results/ResultsAttributeHeaderViewModel",
"geocortex/infrastructure/results/ResultsFeatureActionsView",
"geocortex/infrastructure/results/ResultsListView",
"geocortex/infrastructure/results/ResultsModule",
"geocortex/infrastructure/results/ResultsTableView",
"geocortex/infrastructure/results/ResultsViewBase",
"geocortex/infrastructure/results/ResultsViewModel",
"geocortex/infrastructure/results/TabbedResultsViewModel",
"geocortex/infrastructure/search/SearchHintItem",
"geocortex/infrastructure/search/SearchManager",
"geocortex/infrastructure/search/SearchProviderBase",
"geocortex/infrastructure/selection/CombineMode",
"geocortex/infrastructure/selection/SelectionMetadataStore",
"geocortex/infrastructure/sharing/SharingLinkProviderBase",
"geocortex/infrastructure/states/State",
"geocortex/infrastructure/states/StateManager",
"geocortex/infrastructure/states/States",
"geocortex/infrastructure/toolbarGroup/ToolbarGroupBase",
"geocortex/infrastructure/toolbarGroup/ToolbarGroupItemBase",
"geocortex/infrastructure/toolbarGroup/ToolbarGroupRegistry",
"geocortex/infrastructure/tools/DisablingMapTool",
"geocortex/infrastructure/tools/DrawMode",
"geocortex/infrastructure/tools/MapTool",
"geocortex/infrastructure/tools/ToolBase",
"geocortex/infrastructure/tools/ToolRegistry",
"geocortex/infrastructure/undo/TransactionStatus",
"geocortex/infrastructure/undo/UndoManager",
"geocortex/infrastructure/undo/UndoTransaction",
"geocortex/infrastructure/validation/NumberValidator",
"geocortex/infrastructure/validation/SiteUrlValidator",
"geocortex/infrastructure/validation/XssHtmlValidator",
"geocortex/infrastructure/visualization/VisualizationProviderBase",
"geocortex/infrastructure/webMap/BaseMapLayer",
"geocortex/infrastructure/webMap/Domain",
"geocortex/infrastructure/webMap/Geometry",
"geocortex/infrastructure/webMap/OperationalLayer",
"geocortex/infrastructure/webMap/Renderer",
"geocortex/infrastructure/webMap/Symbol",
"geocortex/infrastructure/webMap/WebMapConverter",
"geocortex/infrastructure/webMap/WebMapFilter",
"geocortex/infrastructure/webMap/WebMapManager",
"geocortex/infrastructure/offline/bundle/BundleBuilder",
"geocortex/infrastructure/offline/bundle/BundleManager",
"geocortex/infrastructure/offline/bundle/BundleResourceEntry",
"geocortex/infrastructure/offline/bundle/EsriLayerHacker",
"geocortex/infrastructure/offline/bundle/EsriRequestHacker",
"geocortex/infrastructure/offline/bundle/OfflineRouter",
"geocortex/infrastructure/offline/bundle/RequestContext",
"geocortex/infrastructure/offline/bundle/RoutingRulesBuilder",
"geocortex/infrastructure/toolbarGroup/types/ToolbarButton",
"geocortex/infrastructure/toolbarGroup/types/ToolbarFlyout",
"geocortex/infrastructure/toolbarGroup/types/ToolbarGroup",
"geocortex/infrastructure/toolbarGroup/types/ToolbarRegion",
"geocortex/infrastructure/toolbarGroup/types/ToolbarToggleButton",
"geocortex/infrastructure/toolbarGroup/types/ToolbarTool",
"geocortex/infrastructure/symbology/AttributeSymbologySettingsView",
"geocortex/infrastructure/symbology/AttributeSymbologySettingsViewModel",
"geocortex/infrastructure/symbology/DataClassificationUtils",
"geocortex/infrastructure/symbology/SymbolColor",
"geocortex/infrastructure/symbology/SymbologySettingsView",
"geocortex/infrastructure/symbology/SymbologySettingsViewModel",
"geocortex/infrastructure/offline/bundle/offlineHandlers/FailHandler",
"geocortex/infrastructure/offline/bundle/offlineHandlers/OfflineHandler",
"geocortex/infrastructure/offline/bundle/offlineHandlers/PassthroughHandler",
"geocortex/infrastructure/offline/bundle/offlineHandlers/RewriteHandler",
"geocortex/infrastructure/offline/bundle/offlineHandlers/ServeResourceHandler",
"geocortex/infrastructure/offline/bundle/offlineHandlers/SiteHandler",
"geocortex/infrastructure/ui/components/Forms/AutoCompleteBoxFormItemView",
"geocortex/infrastructure/ui/components/Forms/CheckBoxFormItemView",
"geocortex/infrastructure/ui/components/Forms/ContainerFormItemView",
"geocortex/infrastructure/ui/components/Forms/DatePickerFormItemView",
"geocortex/infrastructure/ui/components/Forms/FilePickerFormItemView",
"geocortex/infrastructure/ui/components/Forms/GroupBoxFormItemView",
"geocortex/infrastructure/ui/components/Forms/HyperlinkFormItemView",
"geocortex/infrastructure/ui/components/Forms/ListBoxFormItemView",
"geocortex/infrastructure/ui/components/Forms/MarkdownFormItemView",
"geocortex/infrastructure/ui/components/Forms/RadioButtonFormItemView",
"geocortex/infrastructure/ui/components/Forms/TextEntryFormItemView",
"geocortex/infrastructure/ui/components/Forms/TimePickerFormItemView",
"geocortex/infrastructure/ui/components/Forms/FormItemViewBase",
"geocortex/infrastructure/ui/components/MultiPane/MultiPaneView",
"geocortex/infrastructure/ui/components/MultiPane/MultiPaneViewModel",
"geocortex/infrastructure/ui/components/MultiPane/PaneView",
"geocortex/infrastructure/ui/components/MultiPane/PaneViewModel",
"geocortex/infrastructure/ui/components/PagingControls/PagingControlsView",
"geocortex/infrastructure/ui/components/PagingControls/PagingControlsViewModel",
"geocortex/infrastructure/ui/components/SmartPanel/SmartPanelView",
"geocortex/infrastructure/ui/components/SmartPanel/SmartPanelViewModel",
"geocortex/infrastructure/ui/components/Slider/SliderViewBase",
"geocortex/infrastructure/ui/components/Slider/SliderViewModelBase",
"geocortex/infrastructure/ui/components/Table/SortState",
"geocortex/infrastructure/ui/components/Table/TableColumnHeaderViewModel",
"geocortex/infrastructure/ui/components/Table/TableColumnHeaderViewModelInterface",
"geocortex/infrastructure/ui/components/Table/TableColumnViewModelInterface",
"geocortex/infrastructure/ui/components/Table/TableView",
"geocortex/infrastructure/ui/components/Table/TableViewModel",
"geocortex/infrastructure/ui/components/WizardPanel/WizardFragmentView",
"geocortex/infrastructure/ui/components/WizardPanel/WizardPanelView",
"geocortex/infrastructure/ui/components/WizardPanel/WizardPanelViewModel",
"geocortex/infrastructure/Viewer",
"geocortex/infrastructure/commands.meta",
"geocortex/infrastructure/ui/components/ColorPicker/ColorPickerWidget",
"geocortex/infrastructure/ui/components/ColorPicker/KendoColorPickerProvider",
"geocortex/infrastructure/ui/components/NumericInput/NumericInputWidget",
"geocortex/infrastructure/ui/components/NumericInput/KendoSliderProvider",
"geocortex/infrastructure/symbology/widgets/TextSymbolWidget",
"geocortex/infrastructure/symbology/widgets/TextSymbolWidgetViewModel",
"geocortex/infrastructure/symbology/widgets/PictureSymbolWidget",
"geocortex/infrastructure/symbology/widgets/PictureSymbolWidgetViewModel",
"geocortex/infrastructure/symbology/widgets/SimpleSymbolWidget",
"geocortex/infrastructure/symbology/widgets/SimpleSymbolWidgetViewModel",
"geocortex/infrastructure/clickableGraphics/ClickableGraphicsRegistry",
"geocortex/infrastructure/ReverseGeocoder",
"geocortex/infrastructure/results/FeatureSetCollectionResultsViewModel",
"geocortex/infrastructure/results/FeatureSetCollectionResultsView",
"geocortex/infrastructure/results/FeatureSetCollectionResultsLabelView",
"geocortex/infrastructure/results/FeatureSetCollectionResultsLabelViewModel",
"geocortex/infrastructure/results/FeatureSetResultsView",
"geocortex/infrastructure/results/FeatureSetResultsViewModel",
"geocortex/infrastructure/results/ResultsUtils",
"geocortex/infrastructure/BrowserUtils",
"geocortex/infrastructure/symbology/SymbolEditorView",
"geocortex/infrastructure/symbology/SymbolEditorViewModel"],
function(AreaOfInterestMask_ts_0,
ArrayUtils_ts_1,
AttachmentInfo_ts_2,
AttributeGroup_ts_3,
BookmarkManager_ts_4,
CancellationTokenSource_ts_5,
ClusterLayer_ts_6,
ColorUtils_ts_7,
CommandViewModel_ts_8,
ContentPolicy_ts_9,
DataLinkingResult_ts_10,
DateFormat_ts_11,
Dictionary_ts_12,
DistanceConverter_ts_13,
ExportTilesUtils_ts_14,
Feature_ts_15,
FeatureAttribute_ts_16,
FeatureDescriptionPresenterView_ts_17,
FeatureSet_ts_18,
FeatureSetCollection_ts_19,
FeatureSetManager_ts_20,
FilterUtils_ts_21,
FocusUtils_ts_22,
FormatUtils_ts_23,
GeometryUtils_ts_24,
GraphicUtils_ts_25,
HighlightManager_ts_26,
KmlFeature_ts_27,
LayerIntegrationUtils_ts_28,
MapUtils_ts_29,
MatrixUtils_ts_30,
NumberFormat_ts_31,
ObjectFilter_ts_32,
PortalUtils_ts_33,
PresentableDelegateFactory_ts_34,
PromiseUtils_ts_35,
Reporting_ts_36,
SecurityUtils_ts_37,
ShellUtils_ts_38,
SimpleRenderer_ts_39,
SymbolUtils_ts_40,
TaskUtils_ts_41,
TimeSliderUtils_ts_42,
TimeZoneUtils_ts_43,
UrlUtilities_ts_44,
VisualizationUtils_ts_45,
AccessibilityManager_ts_46,
AccessibilityProviderBase_ts_47,
AccessibleMapComponent_ts_48,
BoxEditor_ts_49,
Draw_ts_50,
Edit_ts_51,
EditCapabilityBase_ts_52,
GraphicMover_ts_53,
InputMethod_ts_54,
MultipointVertexEditor_ts_55,
PolygonVertexEditor_ts_56,
PolylineVertexEditor_ts_57,
VertexEditor_ts_58,
BufferUtils_ts_59,
AddStatusArgs_ts_60,
ClusterLayerArgs_ts_61,
ProjectArgs_ts_62,
ShowMapElementArgs_ts_63,
AngleDirectionSystem_ts_64,
AngleFormat_ts_65,
CoordinatesManager_ts_66,
CoordinatesModel_ts_67,
CoordinateUtils_ts_68,
DocumentCollection_ts_69,
GrantEditorView_ts_70,
GrantEditorViewModel_ts_71,
GuestLinkModel_ts_72,
MonikerModel_ts_73,
AuthenticationEventArgs_ts_74,
FeatureSetManagerEventArgs_ts_75,
GeolocationEventArgs_ts_76,
MapExtentEventArgs_ts_77,
ResultsPageChangedEventArgs_ts_78,
SearchProgressEventArgs_ts_79,
SnappingFeedbackEventArgs_ts_80,
UserEventArgs_ts_81,
FeatureProviderBase_ts_82,
AppInfo_ts_83,
DomainInfo_ts_84,
FieldInfo_ts_85,
GisUtils_ts_86,
LayerInfo_ts_87,
MapInfo_ts_88,
ServiceLayerInfo_ts_89,
HighlightedLabelGraphic_ts_90,
HighlightedLabelUtils_ts_91,
IdentifyProviderBase_ts_92,
GraphicsLayerIdentifyProvider,
WorkflowIdentifyTaskIdentifyProvider,
MapIdentifyTaskIdentifyProvider,
RasterIdentifyTaskIdentifyProvider,
LayerCatalogFilterProviderBase_ts_93,
LayerList_ts_94,
LayerListFolderItem_ts_95,
LayerListGraphicsLayerItem_ts_96,
LayerListItem_ts_97,
LayerListItemCollection_ts_98,
LayerListKmlFolderItem_ts_99,
LayerListLayerItem_ts_100,
LayerListMapServiceItem_ts_101,
LayerListNode_ts_102,
LayerVisibilityType_ts_103,
LayerSelector_ts_104,
LayerSelectorViewBase_ts_105,
LayerSelectorViewModelBase_ts_106,
LegendItem_ts_107,
LegendItemProviderEntry_ts_108,
LegendItemProviderFactory_ts_109,
LegendItemProviderResponse_ts_110,
BatchItemModel_ts_111,
MenuItemModel_ts_112,
MenuItemViewModel_ts_113,
MenuModel_ts_114,
MenuRegistry_ts_115,
MenuView_ts_116,
MenuViewModel_ts_117,
MessageClient_ts_118,
NativeManager_ts_119,
BasemapDeleting_ts_120,
BasemapDownloading_ts_121,
OfflineManager_ts_122,
OfflineMap_ts_123,
StringFormatting_ts_124,
SyncEngine_ts_125,
SyncInfo_ts_126,
SyncParameters_ts_127,
WorkCalculator_ts_128,
ProjectConverter_ts_129,
ProjectFilter_ts_130,
ProjectManager_ts_131,
FlatResultsViewModel_ts_132,
ResultsAttributeHeaderViewModel_ts_133,
ResultsFeatureActionsView_ts_134,
ResultsListView_ts_135,
ResultsModule_ts_136,
ResultsTableView_ts_137,
ResultsViewBase_ts_138,
ResultsViewModel_ts_139,
TabbedResultsViewModel_ts_140,
SearchHintItem_ts_141,
SearchManager_ts_142,
SearchProviderBase_ts_143,
CombineMode_ts_144,
SelectionMetadataStore_ts_145,
SharingLinkProviderBase_ts_146,
State_ts_147,
StateManager_ts_148,
States_ts_149,
ToolbarGroupBase_ts_150,
ToolbarGroupItemBase_ts_151,
ToolbarGroupRegistry_ts_152,
DisablingMapTool_ts_153,
DrawMode_ts_154,
MapTool_ts_155,
ToolBase_ts_156,
ToolRegistry_ts_157,
TransactionStatus_ts_158,
UndoManager_ts_159,
UndoTransaction_ts_160,
NumberValidator_ts_161,
SiteUrlValidator_ts_162,
XssHtmlValidator_ts_163,
VisualizationProviderBase_ts_164,
BaseMapLayer_ts_165,
Domain_ts_166,
Geometry_ts_167,
OperationalLayer_ts_168,
Renderer_ts_169,
Symbol_ts_170,
WebMapConverter_ts_171,
WebMapFilter_ts_172,
WebMapManager_ts_173,
BundleBuilder_ts_174,
BundleManager_ts_175,
BundleResourceEntry_ts_176,
EsriLayerHacker_ts_177,
EsriRequestHacker_ts_178,
OfflineRouter_ts_179,
RequestContext_ts_180,
RoutingRulesBuilder_ts_181,
ToolbarButton_ts_182,
ToolbarFlyout_ts_183,
ToolbarGroup_ts_184,
ToolbarRegion_ts_185,
ToolbarToggleButton_ts_186,
ToolbarTool_ts_187,
AttributeSymbologySettingsView_ts_188,
AttributeSymbologySettingsViewModel_ts_189,
DataClassificationUtils_ts_190,
SymbolColor_ts_191,
SymbologySettingsView_ts_192,
SymbologySettingsViewModel_ts_193,
FailHandler_ts_194,
OfflineHandler_ts_195,
PassthroughHandler_ts_196,
RewriteHandler_ts_197,
ServeResourceHandler_ts_198,
SiteHandler_ts_199,
AutoCompleteBoxFormItemView,
CheckBoxFormItemView,
ContainerFormItemView,
DatePickerFormItemView,
FilePickerFormItemView,
GroupBoxFormItemView,
HyperlinkFormItemView,
ListBoxFormItemView,
MarkdownFormItemView,
RadioButtonFormItemView,
TextEntryFormItemView,
TimePickerFormItemView,
FormItemViewBase,
MultiPaneView_ts_202,
MultiPaneViewModel_ts_203,
PaneView_ts_204,
PaneViewModel_ts_205,
PagingControlsView_ts_206,
PagingControlsViewModel_ts_207,
SmartPanelView_ts_208,
SmartPanelViewModel_ts_209,
SliderViewBase_ts_210,
SliderViewModelBase_ts_211,
SortState_ts_212,
TableColumnHeaderViewModel_ts_213,
TableColumnHeaderViewModelInterface_ts_214,
TableColumnViewModelInterface_ts_215,
TableView_ts_216,
TableViewModel_ts_217,
WizardFragmentView_ts_218,
WizardPanelView_ts_219,
WizardPanelViewModel_ts_220,
Viewer_ts_221,
commands_meta_ts_222,
ColorPickerWidget_ts_223,
KendoColorPickerProvider_ts_224,
NumericInputWidget_ts_225,
KendoSliderProvider_ts_226,
TextSymbolWidget_ts_227,
TextSymbolWidgetViewModel_ts_228,
PictureSymbolWidget_ts_229,
PictureSymbolWidgetViewModel_ts_230,
SimpleSymbolWidget_ts_231,
SimpleSymbolWidgetViewModel_ts_232,
ClickableGraphicsRegistry_ts_233,
ReverseGeocoder_ts_224,
FeatureSetCollectionResultsViewModel_ts_234,
FeatureSetCollectionResultsView_ts_235,
FeatureSetCollectionResultsLabelView_ts_236,
FeatureSetCollectionResultsLabelViewModel_ts_237,
FeatureSetResultsView_ts_238,
FeatureSetResultsViewModel_ts_239,
ResultsUtils_ts_240,
BrowserUtils_ts_241,
SymbolEditorView_ts_242,
SymbolEditorViewModel_ts_243) {
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.AreaOfInterestMask", AreaOfInterestMask_ts_0.AreaOfInterestMask);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ArrayUtils", ArrayUtils_ts_1.ArrayUtils);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.AttachmentInfo", AttachmentInfo_ts_2.AttachmentInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.AttributeGroup", AttributeGroup_ts_3.AttributeGroup);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.BookmarkSource", BookmarkManager_ts_4.BookmarkSource);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.BookmarkManager", BookmarkManager_ts_4.BookmarkManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.CancellationTokenSource", CancellationTokenSource_ts_5.CancellationTokenSource);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ClusterLayer", ClusterLayer_ts_6.ClusterLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.getColorFromList", ColorUtils_ts_7.getColorFromList);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.getColorFromString", ColorUtils_ts_7.getColorFromString);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.getStringFromList", ColorUtils_ts_7.getStringFromList);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.getStringFromHex", ColorUtils_ts_7.getStringFromHex);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.generateRandomColors", ColorUtils_ts_7.generateRandomColors);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.generateRandomColor", ColorUtils_ts_7.generateRandomColor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ColorUtils.isColorInputSupported", ColorUtils_ts_7.isColorInputSupported);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.CommandViewModel", CommandViewModel_ts_8.CommandViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.modules.command.CommandViewModel", CommandViewModel_ts_8.CommandViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PolicyFlags", ContentPolicy_ts_9.PolicyFlags);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ContentPolicy", ContentPolicy_ts_9.ContentPolicy);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.DataLinkingResult", DataLinkingResult_ts_10.DataLinkingResult);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.DateFormat", DateFormat_ts_11.DateFormat);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.Dictionary", Dictionary_ts_12.Dictionary);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.distances.canConvert", DistanceConverter_ts_13.canConvert);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.distances.convert", DistanceConverter_ts_13.convert);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ExportTilesUtils.exportTiles", ExportTilesUtils_ts_14.exportTiles);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ExportTilesUtils.estimateExportTilesSize", ExportTilesUtils_ts_14.estimateExportTilesSize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.Feature", Feature_ts_15.Feature);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureAttribute", FeatureAttribute_ts_16.FeatureAttribute);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureDescriptionPresenterView", FeatureDescriptionPresenterView_ts_17.FeatureDescriptionPresenterView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.DataLinksState", FeatureSet_ts_18.DataLinksState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureSet", FeatureSet_ts_18.FeatureSet);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureSetCollection", FeatureSetCollection_ts_19.FeatureSetCollection);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FeatureSetManager", FeatureSetManager_ts_20.FeatureSetManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FilterUtils.sanitize", FilterUtils_ts_21.sanitize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FilterUtils.stripHtml", FilterUtils_ts_21.stripHtml);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FilterUtils.UriType", FilterUtils_ts_21.UriType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FilterUtils.UnsafeHtml", FilterUtils_ts_21.UnsafeHtml);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FilterUtils.DataUri", FilterUtils_ts_21.DataUri);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FocusUtils.focusOnFirstInput", FocusUtils_ts_22.focusOnFirstInput);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FocusUtils.focusOnMap", FocusUtils_ts_22.focusOnMap);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FocusUtils.focus", FocusUtils_ts_22.focus);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.DateFormat", FormatUtils_ts_23.DateFormat);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.NumberFormat", FormatUtils_ts_23.NumberFormat);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.format", FormatUtils_ts_23.format);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.formatDate", FormatUtils_ts_23.formatDate);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.formatDateFromNow", FormatUtils_ts_23.formatDateFromNow);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.formatNumber", FormatUtils_ts_23.formatNumber);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.parseDate", FormatUtils_ts_23.parseDate);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.parseUtcDate", FormatUtils_ts_23.parseUtcDate);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.FormatUtils.parseNumber", FormatUtils_ts_23.parseNumber);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.DEFAULT_GEOMETRY_SERVICE_URI", GeometryUtils_ts_24.DEFAULT_GEOMETRY_SERVICE_URI);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.isValidGeometry", GeometryUtils_ts_24.isValidGeometry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.getMiddle", GeometryUtils_ts_24.getMiddle);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.getMidpoint", GeometryUtils_ts_24.getMidpoint);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.getEsriGeometryType", GeometryUtils_ts_24.getEsriGeometryType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils._getGeometryService", GeometryUtils_ts_24._getGeometryService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.getGeometryService", GeometryUtils_ts_24.getGeometryService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.needsProjection", GeometryUtils_ts_24.needsProjection);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.projectGeometry", GeometryUtils_ts_24.projectGeometry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.projectGeometryWithTransform", GeometryUtils_ts_24.projectGeometryWithTransform);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.project", GeometryUtils_ts_24.project);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.simplifyPolygons", GeometryUtils_ts_24.simplifyPolygons);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.simplifyPolygon", GeometryUtils_ts_24.simplifyPolygon);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils._projectLocally", GeometryUtils_ts_24._projectLocally);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.createCircle", GeometryUtils_ts_24.createCircle);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.fixAspectRatio", GeometryUtils_ts_24.fixAspectRatio);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.extentToPolygon", GeometryUtils_ts_24.extentToPolygon);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.pointsAreEqual", GeometryUtils_ts_24.pointsAreEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.registerDefaultDatumTransforms", GeometryUtils_ts_24.registerDefaultDatumTransforms);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.registerDatumTransforms", GeometryUtils_ts_24.registerDatumTransforms);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.getDatumTransformParameters", GeometryUtils_ts_24.getDatumTransformParameters);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.intersects", GeometryUtils_ts_24.intersects);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.unionGeometries", GeometryUtils_ts_24.unionGeometries);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.explodeGeometry", GeometryUtils_ts_24.explodeGeometry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.cutGeometries", GeometryUtils_ts_24.cutGeometries);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GeometryUtils.toRing", GeometryUtils_ts_24.toRing);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.sanitizeAttributeNames", GraphicUtils_ts_25.sanitizeAttributeNames);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils._isSEPCodedDomainField", GraphicUtils_ts_25._isSEPCodedDomainField);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.deleteMarkupSilently", GraphicUtils_ts_25.deleteMarkupSilently);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.deleteMarkup", GraphicUtils_ts_25.deleteMarkup);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getMarkupFromGeometry", GraphicUtils_ts_25.getMarkupFromGeometry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.rotatePolygon", GraphicUtils_ts_25.rotatePolygon);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getPolygonFromPoint", GraphicUtils_ts_25.getPolygonFromPoint);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getRenderedTextMarkupSize", GraphicUtils_ts_25.getRenderedTextMarkupSize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getRenderedTextMarkupSize", GraphicUtils_ts_25.getRenderedTextMarkupSize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getRenderedTextMarkupSize", GraphicUtils_ts_25.getRenderedTextMarkupSize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.addGraphicToLayer", GraphicUtils_ts_25.addGraphicToLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getGraphicsLayer", GraphicUtils_ts_25.getGraphicsLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.GraphicUtils.getUserGraphicsLayers", GraphicUtils_ts_25.getUserGraphicsLayers);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.HighlightManager", HighlightManager_ts_26.HighlightManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.isKmlProperty", KmlFeature_ts_27.isKmlProperty);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.KmlFeature", KmlFeature_ts_27.KmlFeature);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.discoverFeatureServices", LayerIntegrationUtils_ts_28.discoverFeatureServices);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.buildFeatureLayerService", LayerIntegrationUtils_ts_28.buildFeatureLayerService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.buildKmlService", LayerIntegrationUtils_ts_28.buildKmlService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.buildLocalFeatureLayerService", LayerIntegrationUtils_ts_28.buildLocalFeatureLayerService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.LocalFeatureLayer", LayerIntegrationUtils_ts_28.LocalFeatureLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.LocalFeatureLayerService", LayerIntegrationUtils_ts_28.LocalFeatureLayerService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.LayerIntegrationUtils.LocalLayer", LayerIntegrationUtils_ts_28.LocalLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.stepZoom", MapUtils_ts_29.stepZoom);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.stepZoomWithPriority", MapUtils_ts_29.stepZoomWithPriority);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.getExtent", MapUtils_ts_29.getExtent);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.panToPointWithPriority", MapUtils_ts_29.panToPointWithPriority);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.zoomToExtent", MapUtils_ts_29.zoomToExtent);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.zoomToExtentWithPriority", MapUtils_ts_29.zoomToExtentWithPriority);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.getClosestScale", MapUtils_ts_29.getClosestScale);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.ScaleChangeMode", MapUtils_ts_29.ScaleChangeMode);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.cloneEsriFeature", MapUtils_ts_29.cloneEsriFeature);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriFeatureAttributesEqual", MapUtils_ts_29.esriFeatureAttributesEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriFeaturesEqual", MapUtils_ts_29.esriFeaturesEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriGeometriesEqual", MapUtils_ts_29.esriGeometriesEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.compareTypeSR", MapUtils_ts_29.compareTypeSR);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriPointsEqual", MapUtils_ts_29.esriPointsEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriMultipointsEqual", MapUtils_ts_29.esriMultipointsEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriPolylinesEqual", MapUtils_ts_29.esriPolylinesEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriPolygonsEqual", MapUtils_ts_29.esriPolygonsEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.esriExtentsEqual", MapUtils_ts_29.esriExtentsEqual);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.findFeatureInLayer", MapUtils_ts_29.findFeatureInLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.findFeatureInMap", MapUtils_ts_29.findFeatureInMap);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MapUtils.getThumbnailUri", MapUtils_ts_29.getThumbnailUri);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.MatrixUtils", MatrixUtils_ts_30.MatrixUtils);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.NumberFormat", NumberFormat_ts_31.NumberFormat);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ObjectFilter", ObjectFilter_ts_32.ObjectFilter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.getPortalIdentity", PortalUtils_ts_33.getPortalIdentity);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.hasAccessToPortal", PortalUtils_ts_33.hasAccessToPortal);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.hasCreateContentPrivilege", PortalUtils_ts_33.hasCreateContentPrivilege);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.hasPublishFeaturePrivilege", PortalUtils_ts_33.hasPublishFeaturePrivilege);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.getPortalBaseUrl", PortalUtils_ts_33.getPortalBaseUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.getPortalMyContentUrl", PortalUtils_ts_33.getPortalMyContentUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PortalUtils.getPortalItemUrl", PortalUtils_ts_33.getPortalItemUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PresentableDelegateFactory", PresentableDelegateFactory_ts_34.PresentableDelegateFactory);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PromiseUtils.allSkipRejected", PromiseUtils_ts_35.PromiseUtils.allSkipRejected);    
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PromiseUtils.mapSkipRejected", PromiseUtils_ts_35.PromiseUtils.mapSkipRejected);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PromiseUtils.propsSkipRejected", PromiseUtils_ts_35.PromiseUtils.propsSkipRejected);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.PromiseUtils.warnOnReject", PromiseUtils_ts_35.PromiseUtils.warnOnReject);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.reporting.getAllFeaturesFromReportable", Reporting_ts_36.getAllFeaturesFromReportable);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SecurityUtils.getIdentity", SecurityUtils_ts_37.getIdentity);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SecurityUtils.getClaimsByType", SecurityUtils_ts_37.getClaimsByType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SecurityUtils.getClaimsByValue", SecurityUtils_ts_37.getClaimsByValue);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SecurityUtils.getClaimByTypeAndValue", SecurityUtils_ts_37.getClaimByTypeAndValue);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SecurityUtils.hasPrivilegeClaim", SecurityUtils_ts_37.hasPrivilegeClaim);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ShellUtils.debounceViewEvents", ShellUtils_ts_38.debounceViewEvents);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ShellUtils.debounceEvents", ShellUtils_ts_38.debounceEvents);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SimpleRenderer", SimpleRenderer_ts_39.SimpleRenderer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultSymbolColor", SymbolUtils_ts_40.defaultSymbolColor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultMarkerSymbol", SymbolUtils_ts_40.defaultMarkerSymbol);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultLineSymbol", SymbolUtils_ts_40.defaultLineSymbol);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultFillSymbol", SymbolUtils_ts_40.defaultFillSymbol);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultTextSymbol", SymbolUtils_ts_40.defaultTextSymbol);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.POINTS_TO_PIXELS", SymbolUtils_ts_40.POINTS_TO_PIXELS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getQueryTaskUrl", TaskUtils_ts_41.getQueryTaskUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getQueryTask", TaskUtils_ts_41.getQueryTask);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getIdentifyTaskUrl", TaskUtils_ts_41.getIdentifyTaskUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getIdentifyTask", TaskUtils_ts_41.getIdentifyTask);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getTokenizedUrl", TaskUtils_ts_41.getTokenizedUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.canIdentifyLayer", TaskUtils_ts_41.canIdentifyLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.canQueryLayer", TaskUtils_ts_41.canQueryLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.canQueryMapService", TaskUtils_ts_41.canQueryMapService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.taskUtils.getSearchTextWhereClause", TaskUtils_ts_41.getSearchTextWhereClause);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeSliderUtils.convertTimeUnitToMilliseconds", TimeSliderUtils_ts_42.convertTimeUnitToMilliseconds);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeSliderUtils.computeTimeIntervalInMs", TimeSliderUtils_ts_42.computeTimeIntervalInMs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.UTC_ZONE_ID", TimeZoneUtils_ts_43.UTC_ZONE_ID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.getTimeZoneFromLayer", TimeZoneUtils_ts_43.getTimeZoneFromLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.getTimeZoneFromMapService", TimeZoneUtils_ts_43.getTimeZoneFromMapService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.getDisplayTimeZoneFromMapService", TimeZoneUtils_ts_43.getDisplayTimeZoneFromMapService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.correctDatesForDisplayInDisplayTimeZone", TimeZoneUtils_ts_43.correctDatesForDisplayInDisplayTimeZone);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.correctDatesForDisplayInLocalTime", TimeZoneUtils_ts_43.correctDatesForDisplayInLocalTime);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.correctDatesToSubmitInDatabaseTime", TimeZoneUtils_ts_43.correctDatesToSubmitInDatabaseTime);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.TimeZoneUtils.correctDatesToQueryInDatabaseTime", TimeZoneUtils_ts_43.correctDatesToQueryInDatabaseTime);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.queryStringDictionaryToString", UrlUtilities_ts_44.queryStringDictionaryToString);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.queryStringToDictionary", UrlUtilities_ts_44.queryStringToDictionary);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.parseUrl", UrlUtilities_ts_44.parseUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.addQueryParameter", UrlUtilities_ts_44.addQueryParameter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.removeQueryParameter", UrlUtilities_ts_44.removeQueryParameter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.getFolder", UrlUtilities_ts_44.getFolder);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.UrlUtils.removeParameters", UrlUtilities_ts_44.removeParameters);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.VisualizationUtils.getFeatureHeatMap", VisualizationUtils_ts_45.getFeatureHeatMap);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.VisualizationUtils.getHeatMapRenderer", VisualizationUtils_ts_45.getHeatMapRenderer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.AccessibilityManager", AccessibilityManager_ts_46.AccessibilityManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.AccessibilityProviderBase", AccessibilityProviderBase_ts_47.AccessibilityProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.AccessibleMapComponent", AccessibleMapComponent_ts_48.AccessibleMapComponent);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.BoxEditor", BoxEditor_ts_49.BoxEditor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.Draw", Draw_ts_50.Draw);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.EditInternal", Draw_ts_50.EditInternal);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.Edit", Edit_ts_51.Edit);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.EditCapabilityBase", EditCapabilityBase_ts_52.EditCapabilityBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.GraphicMover", GraphicMover_ts_53.GraphicMover);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.InputMethod", InputMethod_ts_54.InputMethod);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.MultipointVertexEditor", MultipointVertexEditor_ts_55.MultipointVertexEditor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.PolygonVertexEditor", PolygonVertexEditor_ts_56.PolygonVertexEditor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.PolylineVertexEditor", PolylineVertexEditor_ts_57.PolylineVertexEditor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.accessibility.VertexEditor", VertexEditor_ts_58.VertexEditor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.SUPPORTED_BUFFER_UNITS", BufferUtils_ts_59.SUPPORTED_BUFFER_UNITS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.GCX_UNIT_YARDS", BufferUtils_ts_59.GCX_UNIT_YARDS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.bufferGeometry", BufferUtils_ts_59.bufferGeometry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.bufferGeometries", BufferUtils_ts_59.bufferGeometries);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.buffer", BufferUtils_ts_59.buffer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.isGeographicWkid", BufferUtils_ts_59.isGeographicWkid);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.getUnitDescFromConfig", BufferUtils_ts_59.getUnitDescFromConfig);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.getGeometryServiceUnitConstant", BufferUtils_ts_59.getGeometryServiceUnitConstant);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.buffer.BufferUtils.convertLength", BufferUtils_ts_59.convertLength);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.commandArgs.AddStatusArgs", AddStatusArgs_ts_60.AddStatusArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.commandArgs.ClusterLayerArgs", ClusterLayerArgs_ts_61.ClusterLayerArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.commandArgs.ProjectArgs", ProjectArgs_ts_62.ProjectArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.commandArgs.ShowMapElementArgs", ShowMapElementArgs_ts_63.ShowMapElementArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleDirectionSystem.POLAR", AngleDirectionSystem_ts_64.POLAR);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleDirectionSystem.NORTH_AZIMUTH", AngleDirectionSystem_ts_64.NORTH_AZIMUTH);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleDirectionSystem.SOUTH_AZIMUTH", AngleDirectionSystem_ts_64.SOUTH_AZIMUTH);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleFormat.DD", AngleFormat_ts_65.DD);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleFormat.DDM", AngleFormat_ts_65.DDM);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.AngleFormat.DMS", AngleFormat_ts_65.DMS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.featureSetExtendedProperty", CoordinatesManager_ts_66.featureSetExtendedProperty);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.coordinateIdentifierProperty", CoordinatesManager_ts_66.coordinateIdentifierProperty);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinatesManager", CoordinatesManager_ts_66.CoordinatesManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinatesModel", CoordinatesModel_ts_67.CoordinatesModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.getCoordinate", CoordinateUtils_ts_68.getCoordinate);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.convertDmsToDecimalDegrees", CoordinateUtils_ts_68.convertDmsToDecimalDegrees);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.formatAngle", CoordinateUtils_ts_68.formatAngle);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.formatLatLon", CoordinateUtils_ts_68.formatLatLon);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.formatXYCoordinate", CoordinateUtils_ts_68.formatXYCoordinate);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.formatBearing", CoordinateUtils_ts_68.formatBearing);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.coordinates.CoordinateUtils.getResource", CoordinateUtils_ts_68.getResource);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.documents.DocumentCollection", DocumentCollection_ts_69.DocumentCollection);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.documents.GrantEditorView", GrantEditorView_ts_70.GrantEditorView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.documents.GrantEditorViewModel", GrantEditorViewModel_ts_71.GrantEditorViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.documents.GuestLinkModel", GuestLinkModel_ts_72.GuestLinkModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.documents.MonikerModel", MonikerModel_ts_73.MonikerModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.AuthenticationEventArgs", AuthenticationEventArgs_ts_74.AuthenticationEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.FeatureSetManagerEventArgs", FeatureSetManagerEventArgs_ts_75.FeatureSetManagerEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.GeolocationEventArgs", GeolocationEventArgs_ts_76.GeolocationEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.MapExtentEventArgs", MapExtentEventArgs_ts_77.MapExtentEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.ResultsPageChangedEventArgs", ResultsPageChangedEventArgs_ts_78.ResultsPageChangedEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.SearchProgressEventArgs", SearchProgressEventArgs_ts_79.SearchProgressEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.SnappingFeedbackEventArgs", SnappingFeedbackEventArgs_ts_80.SnappingFeedbackEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.eventArgs.UserEventArgs", UserEventArgs_ts_81.UserEventArgs);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.featureDetails.FeatureProviderBase", FeatureProviderBase_ts_82.FeatureProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.AppInfo", AppInfo_ts_83.AppInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.DomainInfo", DomainInfo_ts_84.DomainInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.FieldInfo", FieldInfo_ts_85.FieldInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.GisUtils.getServiceLayerType", GisUtils_ts_86.getServiceLayerType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.LayerInfo", LayerInfo_ts_87.LayerInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.MapInfo", MapInfo_ts_88.MapInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.gis.ServiceLayerInfo", ServiceLayerInfo_ts_89.ServiceLayerInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelAnchor", HighlightedLabelGraphic_ts_90.HighlightedLabelAnchor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelGraphic", HighlightedLabelGraphic_ts_90.HighlightedLabelGraphic);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelUtils.getLabelSize", HighlightedLabelUtils_ts_91.getLabelSize);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelUtils.getTextLines", HighlightedLabelUtils_ts_91.getTextLines);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelUtils.generateSvgHighlightLabelPath", HighlightedLabelUtils_ts_91.generateSvgHighlightLabelPath);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.highlightedLabel.HighlightedLabelUtils.generateSvgCirclePath", HighlightedLabelUtils_ts_91.generateSvgCirclePath);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.IdentifyProviderBase", IdentifyProviderBase_ts_92.IdentifyProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.GraphicsLayerIdentifyProvider", GraphicsLayerIdentifyProvider.GraphicsLayerIdentifyProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.WorkflowIdentifyTaskIdentifyProvider", WorkflowIdentifyTaskIdentifyProvider.WorkflowIdentifyTaskIdentifyProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.MapIdentifyTaskIdentifyProvider", MapIdentifyTaskIdentifyProvider.MapIdentifyTaskIdentifyProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.identify.RasterIdentifyTaskIdentifyProvider", RasterIdentifyTaskIdentifyProvider.RasterIdentifyTaskIdentifyProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerCatalog.LayerCatalogFilterProviderBase", LayerCatalogFilterProviderBase_ts_93.LayerCatalogFilterProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerList", LayerList_ts_94.LayerList);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListFolderItem", LayerListFolderItem_ts_95.LayerListFolderItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListGraphicsLayerItem", LayerListGraphicsLayerItem_ts_96.LayerListGraphicsLayerItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListItemType", LayerListItem_ts_97.LayerListItemType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListItem", LayerListItem_ts_97.LayerListItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListItemCollection", LayerListItemCollection_ts_98.LayerListItemCollection);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListKmlFolderItem", LayerListKmlFolderItem_ts_99.LayerListKmlFolderItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListLayerItem", LayerListLayerItem_ts_100.LayerListLayerItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListMapServiceItem", LayerListMapServiceItem_ts_101.LayerListMapServiceItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerListNode", LayerListNode_ts_102.LayerListNode);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerList.LayerVisibilityType", LayerVisibilityType_ts_103.LayerVisibilityType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerSelector.LayerSelector", LayerSelector_ts_104.LayerSelector);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerSelector.LayerSelectorViewBase", LayerSelectorViewBase_ts_105.LayerSelectorViewBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.layerSelector.LayerSelectorViewModelBase", LayerSelectorViewModelBase_ts_106.LayerSelectorViewModelBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.legend.LegendItem", LegendItem_ts_107.LegendItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.legend.LegendItemProviderEntry", LegendItemProviderEntry_ts_108.LegendItemProviderEntry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.legend.LegendItemProviderFactory", LegendItemProviderFactory_ts_109.LegendItemProviderFactory);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.legend.LegendItemProviderResponseCode", LegendItemProviderResponse_ts_110.LegendItemProviderResponseCode);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.legend.LegendItemProviderResponse", LegendItemProviderResponse_ts_110.LegendItemProviderResponse);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.BatchItemModel", BatchItemModel_ts_111.BatchItemModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuItemModel", MenuItemModel_ts_112.MenuItemModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuItemViewModel", MenuItemViewModel_ts_113.MenuItemViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuModel", MenuModel_ts_114.MenuModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuRegistry", MenuRegistry_ts_115.MenuRegistry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView", MenuView_ts_116.MenuView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuViewModel", MenuViewModel_ts_117.MenuViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.nativeIntegration.MessageClient", MessageClient_ts_118.MessageClient);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.nativeIntegration.NativeManager", NativeManager_ts_119.NativeManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.deleteBasemaps", BasemapDeleting_ts_120.deleteBasemaps);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.downloadBasemaps", BasemapDownloading_ts_121.downloadBasemaps);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.OfflineManager", OfflineManager_ts_122.OfflineManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.OfflineMap.verify", OfflineMap_ts_123.OfflineMap.verify);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.OfflineMap.diff", OfflineMap_ts_123.OfflineMap.diff);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.OfflineMapBasemap.Type", OfflineMap_ts_123.OfflineMapBasemap.Type);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.formatByteTransferRateString", StringFormatting_ts_124.formatByteTransferRateString);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.formatBytesString", StringFormatting_ts_124.formatBytesString);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.SyncEngine", SyncEngine_ts_125.SyncEngine);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.SyncInfo", SyncInfo_ts_126.SyncInfo);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.SyncParameters.buildSyncParameters", SyncParameters_ts_127.SyncParameters.buildSyncParameters);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.WorkCalculator", WorkCalculator_ts_128.WorkCalculator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.PROPERTY_MEASUREMENT_ID", ProjectConverter_ts_129.PROPERTY_MEASUREMENT_ID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.PROPERTY_HIGHLIGHT_ID", ProjectConverter_ts_129.PROPERTY_HIGHLIGHT_ID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.ProjectConverter", ProjectConverter_ts_129.ProjectConverter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.ProjectFilter", ProjectFilter_ts_130.ProjectFilter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.PROJECT_TYPE", ProjectManager_ts_131.PROJECT_TYPE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.SITE_ID_PROPERTY_NAME", ProjectManager_ts_131.SITE_ID_PROPERTY_NAME);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.VIEWER_ID_PROPERTY_NAME", ProjectManager_ts_131.VIEWER_ID_PROPERTY_NAME);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.PROJECT_QUERY_STRING_KEY", ProjectManager_ts_131.PROJECT_QUERY_STRING_KEY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.VIEWER_QUERY_STRING_KEY", ProjectManager_ts_131.VIEWER_QUERY_STRING_KEY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.project.ProjectManager", ProjectManager_ts_131.ProjectManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FlatResultsViewModel", FlatResultsViewModel_ts_132.FlatResultsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsAttributeHeaderViewModel", ResultsAttributeHeaderViewModel_ts_133.ResultsAttributeHeaderViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.manualCollator", ResultsAttributeHeaderViewModel_ts_133.manualCollator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.collator", ResultsAttributeHeaderViewModel_ts_133.collator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.SharedState", ResultsAttributeHeaderViewModel_ts_133.SharedState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsFeatureActionsView", ResultsFeatureActionsView_ts_134.ResultsFeatureActionsView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsListView", ResultsListView_ts_135.ResultsListView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsModule", ResultsModule_ts_136.ResultsModule);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsTableView", ResultsTableView_ts_137.ResultsTableView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsViewBase", ResultsViewBase_ts_138.ResultsViewBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsViewModel", ResultsViewModel_ts_139.ResultsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.TabbedResultsViewModel", TabbedResultsViewModel_ts_140.TabbedResultsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.SearchHintItem", SearchHintItem_ts_141.SearchHintItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.Status.IDLE", SearchManager_ts_142.Status.IDLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.Status.SEARCHING", SearchManager_ts_142.Status.SEARCHING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.Status.ERROR", SearchManager_ts_142.Status.ERROR);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.SearchManager", SearchManager_ts_142.SearchManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.search.SearchProviderBase", SearchProviderBase_ts_143.SearchProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.selection.CombineMode.REPLACE", CombineMode_ts_144.CombineMode.REPLACE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.selection.CombineMode.UNION", CombineMode_ts_144.CombineMode.UNION);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.selection.CombineMode.SUBTRACT", CombineMode_ts_144.CombineMode.SUBTRACT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.selection.CombineMode.INTERSECT", CombineMode_ts_144.CombineMode.INTERSECT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.selection.SelectionMetadataStore", SelectionMetadataStore_ts_145.SelectionMetadataStore);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.sharing.ExtentLinkPriority", SharingLinkProviderBase_ts_146.ExtentLinkPriority);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.sharing.LayerListLinkPriority", SharingLinkProviderBase_ts_146.LayerListLinkPriority);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.sharing.SharingLinkProviderBase", SharingLinkProviderBase_ts_146.SharingLinkProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.applicationState.ActiveState", State_ts_147.ActiveState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.applicationState.StateManager", StateManager_ts_148.StateManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.applicationState.definedStates", States_ts_149.definedStates);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.registerToolbarFactoryMethod", ToolbarGroupBase_ts_150.registerToolbarFactoryMethod);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.createToolbarItem", ToolbarGroupBase_ts_150.createToolbarItem);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarGroupBase", ToolbarGroupBase_ts_150.ToolbarGroupBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarGroupItemBase", ToolbarGroupItemBase_ts_151.ToolbarGroupItemBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarGroupRegistry", ToolbarGroupRegistry_ts_152.ToolbarGroupRegistry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.tools.DisablingMapTool", DisablingMapTool_ts_153.DisablingMapTool);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.tools.DrawMode", DrawMode_ts_154.DrawMode);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.tools.MapTool", MapTool_ts_155.MapTool);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.tools.ToolBase", ToolBase_ts_156.ToolBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.tools.ToolRegistry", ToolRegistry_ts_157.ToolRegistry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.TransactionStatus.PENDING", TransactionStatus_ts_158.TransactionStatus.PENDING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.TransactionStatus.COMMITTING", TransactionStatus_ts_158.TransactionStatus.COMMITTING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.TransactionStatus.COMMITTED", TransactionStatus_ts_158.TransactionStatus.COMMITTED);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.TransactionStatus.ABORTING", TransactionStatus_ts_158.TransactionStatus.ABORTING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.TransactionStatus.ABORTED", TransactionStatus_ts_158.TransactionStatus.ABORTED);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.Status.IDLE", UndoManager_ts_159.Status.IDLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.Status.UNDOING", UndoManager_ts_159.Status.UNDOING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.Status.REDOING", UndoManager_ts_159.Status.REDOING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.Status.COMMITTING", UndoManager_ts_159.Status.COMMITTING);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.Status.ROLLINGBACK", UndoManager_ts_159.Status.ROLLINGBACK);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.UndoManager", UndoManager_ts_159.UndoManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.undo.UndoTransaction", UndoTransaction_ts_160.UndoTransaction);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.validation.NumberValidator", NumberValidator_ts_161.NumberValidator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.validation.SiteUrlValidator", SiteUrlValidator_ts_162.SiteUrlValidator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.validation.XssHtmlValidator", XssHtmlValidator_ts_163.XssHtmlValidator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.visualization.VisualizationProviderBase", VisualizationProviderBase_ts_164.VisualizationProviderBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.BaseMapType.OPEN_STREET_MAP", BaseMapLayer_ts_165.BaseMapType.OPEN_STREET_MAP);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.BaseMapType.BING_AERIAL", BaseMapLayer_ts_165.BaseMapType.BING_AERIAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.BaseMapType.BING_ROAD", BaseMapLayer_ts_165.BaseMapType.BING_ROAD);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.BaseMapType.BING_HYBRID", BaseMapLayer_ts_165.BaseMapType.BING_HYBRID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.BaseMapType.WEB_TILED", BaseMapLayer_ts_165.BaseMapType.WEB_TILED);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.DomainType.INHERITED", Domain_ts_166.DomainType.INHERITED);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.DomainType.RANGE", Domain_ts_166.DomainType.RANGE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.DomainType.CODED_VALUE", Domain_ts_166.DomainType.CODED_VALUE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.POINT", Geometry_ts_167.GeometryType.POINT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.MULTIPOINT", Geometry_ts_167.GeometryType.MULTIPOINT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.POLYLINE", Geometry_ts_167.GeometryType.POLYLINE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.POLYGON", Geometry_ts_167.GeometryType.POLYGON);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.EXTENT", Geometry_ts_167.GeometryType.EXTENT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.GeometryType.fromEsriGeometryType", Geometry_ts_167.GeometryType.fromEsriGeometryType);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.OperationalLayerType.CSV", OperationalLayer_ts_168.OperationalLayerType.CSV);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.OperationalLayerType.WMS", OperationalLayer_ts_168.OperationalLayerType.WMS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.OperationalLayerType.KML", OperationalLayer_ts_168.OperationalLayerType.KML);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.RendererType.SIMPLE", Renderer_ts_169.RendererType.SIMPLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.RendererType.UNIQUE_VALUE", Renderer_ts_169.RendererType.UNIQUE_VALUE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.RendererType.CLASS_BREAKS", Renderer_ts_169.RendererType.CLASS_BREAKS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.RendererType.HEATMAP", Renderer_ts_169.RendererType.HEATMAP);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.NormalizationType.BY_FIELD", Renderer_ts_169.NormalizationType.BY_FIELD);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.NormalizationType.BY_LOG", Renderer_ts_169.NormalizationType.BY_LOG);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.NormalizationType.BY_PERCENT_OF_TOTAL", Renderer_ts_169.NormalizationType.BY_PERCENT_OF_TOTAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ClassificationMethod.NATURAL_BREAKS", Renderer_ts_169.ClassificationMethod.NATURAL_BREAKS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ClassificationMethod.EQUAL_INTERVAL", Renderer_ts_169.ClassificationMethod.EQUAL_INTERVAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ClassificationMethod.QUANTILE", Renderer_ts_169.ClassificationMethod.QUANTILE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ClassificationMethod.STANDARD_DEVIATION", Renderer_ts_169.ClassificationMethod.STANDARD_DEVIATION);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ClassificationMethod.GEOMETRICAL_INTERVAL", Renderer_ts_169.ClassificationMethod.GEOMETRICAL_INTERVAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.SIMPLE_MARKER", Symbol_ts_170.SymbolType.SIMPLE_MARKER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.SIMPLE_LINE", Symbol_ts_170.SymbolType.SIMPLE_LINE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.SIMPLE_FILL", Symbol_ts_170.SymbolType.SIMPLE_FILL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.PICTURE_MARKER", Symbol_ts_170.SymbolType.PICTURE_MARKER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.PICTURE_FILL", Symbol_ts_170.SymbolType.PICTURE_FILL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SymbolType.TEXT", Symbol_ts_170.SymbolType.TEXT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.CIRCLE", Symbol_ts_170.SimpleMarkerStyle.CIRCLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.CROSS", Symbol_ts_170.SimpleMarkerStyle.CROSS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.DIAMOND", Symbol_ts_170.SimpleMarkerStyle.DIAMOND);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.SQUARE", Symbol_ts_170.SimpleMarkerStyle.SQUARE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.X", Symbol_ts_170.SimpleMarkerStyle.X);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.TRIANGLE", Symbol_ts_170.SimpleMarkerStyle.TRIANGLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleMarkerStyle.PATH", Symbol_ts_170.SimpleMarkerStyle.PATH);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.DASH", Symbol_ts_170.SimpleLineStyle.DASH);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.DASH_DOT", Symbol_ts_170.SimpleLineStyle.DASH_DOT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.DASH_DOT_DOT", Symbol_ts_170.SimpleLineStyle.DASH_DOT_DOT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.DOT", Symbol_ts_170.SimpleLineStyle.DOT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.NONE", Symbol_ts_170.SimpleLineStyle.NONE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleLineStyle.SOLID", Symbol_ts_170.SimpleLineStyle.SOLID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.BACKWARD_DIAGONAL", Symbol_ts_170.SimpleFillStyle.BACKWARD_DIAGONAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.CROSS", Symbol_ts_170.SimpleFillStyle.CROSS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.DIAGONAL_CROSS", Symbol_ts_170.SimpleFillStyle.DIAGONAL_CROSS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.FORWARD_DIAGONAL", Symbol_ts_170.SimpleFillStyle.FORWARD_DIAGONAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.HORIZONTAL", Symbol_ts_170.SimpleFillStyle.HORIZONTAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.NONE", Symbol_ts_170.SimpleFillStyle.NONE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.SOLID", Symbol_ts_170.SimpleFillStyle.SOLID);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.SimpleFillStyle.VERTICAL", Symbol_ts_170.SimpleFillStyle.VERTICAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.VerticalAlignment.BASELINE", Symbol_ts_170.VerticalAlignment.BASELINE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.VerticalAlignment.TOP", Symbol_ts_170.VerticalAlignment.TOP);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.VerticalAlignment.MIDDLE", Symbol_ts_170.VerticalAlignment.MIDDLE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.VerticalAlignment.BOTTOM", Symbol_ts_170.VerticalAlignment.BOTTOM);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.HorizontalAlignment.LEFT", Symbol_ts_170.HorizontalAlignment.LEFT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.HorizontalAlignment.RIGHT", Symbol_ts_170.HorizontalAlignment.RIGHT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.HorizontalAlignment.CENTER", Symbol_ts_170.HorizontalAlignment.CENTER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.HorizontalAlignment.JUSTIFY", Symbol_ts_170.HorizontalAlignment.JUSTIFY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontStyle.ITALIC", Symbol_ts_170.FontStyle.ITALIC);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontStyle.NORMAL", Symbol_ts_170.FontStyle.NORMAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontStyle.OBLIQUE", Symbol_ts_170.FontStyle.OBLIQUE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontWeight.BOLD", Symbol_ts_170.FontWeight.BOLD);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontWeight.BOLDER", Symbol_ts_170.FontWeight.BOLDER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontWeight.LIGHTER", Symbol_ts_170.FontWeight.LIGHTER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.FontWeight.NORMAL", Symbol_ts_170.FontWeight.NORMAL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.TextDecoration.LINE_THROUGH", Symbol_ts_170.TextDecoration.LINE_THROUGH);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.TextDecoration.UNDERLINE", Symbol_ts_170.TextDecoration.UNDERLINE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.TextDecoration.NONE", Symbol_ts_170.TextDecoration.NONE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.CONVERSION_TYPE_PROPERTY", WebMapConverter_ts_171.CONVERSION_TYPE_PROPERTY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.FeatureLayer", WebMapConverter_ts_171.LayerType.FeatureLayer);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.MapService", WebMapConverter_ts_171.LayerType.MapService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.TiledMapService", WebMapConverter_ts_171.LayerType.TiledMapService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.ImageService", WebMapConverter_ts_171.LayerType.ImageService);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.BingAerial", WebMapConverter_ts_171.LayerType.BingAerial);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.BingHybrid", WebMapConverter_ts_171.LayerType.BingHybrid);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.BingRoad", WebMapConverter_ts_171.LayerType.BingRoad);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.OpenStreetMap", WebMapConverter_ts_171.LayerType.OpenStreetMap);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.WebTiled", WebMapConverter_ts_171.LayerType.WebTiled);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.KML", WebMapConverter_ts_171.LayerType.KML);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.LayerType.WMS", WebMapConverter_ts_171.LayerType.WMS);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_SERVICE_LAYER", WebMapConverter_ts_171.ConversionType.WEB_MAP_SERVICE_LAYER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_LAYER", WebMapConverter_ts_171.ConversionType.WEB_MAP_LAYER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_FEATURE_SET", WebMapConverter_ts_171.ConversionType.WEB_MAP_FEATURE_SET);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_FEATURE", WebMapConverter_ts_171.ConversionType.WEB_MAP_FEATURE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_GEOMETRY", WebMapConverter_ts_171.ConversionType.WEB_MAP_GEOMETRY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_SYMBOL", WebMapConverter_ts_171.ConversionType.WEB_MAP_SYMBOL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_RENDERER", WebMapConverter_ts_171.ConversionType.WEB_MAP_RENDERER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_SPATIAL_REFERENCE", WebMapConverter_ts_171.ConversionType.WEB_MAP_SPATIAL_REFERENCE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_COLOR", WebMapConverter_ts_171.ConversionType.WEB_MAP_COLOR);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.WEB_MAP_DATA", WebMapConverter_ts_171.ConversionType.WEB_MAP_DATA);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.GCX_MAP_SERVICE", WebMapConverter_ts_171.ConversionType.GCX_MAP_SERVICE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.GCX_LAYER", WebMapConverter_ts_171.ConversionType.GCX_LAYER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.GCX_FEATURE_SET", WebMapConverter_ts_171.ConversionType.GCX_FEATURE_SET);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.GCX_FEATURE", WebMapConverter_ts_171.ConversionType.GCX_FEATURE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_LAYER", WebMapConverter_ts_171.ConversionType.ESRI_LAYER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_FEATURE_SET", WebMapConverter_ts_171.ConversionType.ESRI_FEATURE_SET);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_GRAPHIC", WebMapConverter_ts_171.ConversionType.ESRI_GRAPHIC);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_GEOMETRY", WebMapConverter_ts_171.ConversionType.ESRI_GEOMETRY);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_SYMBOL", WebMapConverter_ts_171.ConversionType.ESRI_SYMBOL);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_RENDERER", WebMapConverter_ts_171.ConversionType.ESRI_RENDERER);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_SPATIAL_REFERENCE", WebMapConverter_ts_171.ConversionType.ESRI_SPATIAL_REFERENCE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.ESRI_COLOR", WebMapConverter_ts_171.ConversionType.ESRI_COLOR);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.ConversionType.OBJECT", WebMapConverter_ts_171.ConversionType.OBJECT);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.WebMapConverter", WebMapConverter_ts_171.WebMapConverter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.WebMapFilter", WebMapFilter_ts_172.WebMapFilter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.webMap.WebMapManager", WebMapManager_ts_173.WebMapManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.buildBundle", BundleBuilder_ts_174.buildBundle);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.cleanUpMapServiceUrl", BundleBuilder_ts_174.cleanUpMapServiceUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.cleanUpRestUrl", BundleBuilder_ts_174.cleanUpRestUrl);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.urlToPattern", BundleBuilder_ts_174.urlToPattern);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.BundleManager", BundleManager_ts_175.BundleManager);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.BundleResourceEntry", BundleResourceEntry_ts_176.BundleResourceEntry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.EsriLayerHacker", EsriLayerHacker_ts_177.EsriLayerHacker);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.EsriRequestHacker", EsriRequestHacker_ts_178.EsriRequestHacker);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.OfflineRouter", OfflineRouter_ts_179.OfflineRouter);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.RequestContext", RequestContext_ts_180.RequestContext);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.buildRoutingRules", RoutingRulesBuilder_ts_181.buildRoutingRules);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarButton", ToolbarButton_ts_182.ToolbarButton);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarFlyout", ToolbarFlyout_ts_183.ToolbarFlyout);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarGroup", ToolbarGroup_ts_184.ToolbarGroup);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarRegion", ToolbarRegion_ts_185.ToolbarRegion);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToggleButtonState", ToolbarToggleButton_ts_186.ToggleButtonState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarToggleButton", ToolbarToggleButton_ts_186.ToolbarToggleButton);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.toolbarGroup.ToolbarTool", ToolbarTool_ts_187.ToolbarTool);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.visualization.WIDGET_ID_BASE", AttributeSymbologySettingsView_ts_188.WIDGET_ID_BASE);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.AttributeSymbologySettingsView", AttributeSymbologySettingsView_ts_188.AttributeSymbologySettingsView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.AttributeSymbologySettingsViewModel", AttributeSymbologySettingsViewModel_ts_189.AttributeSymbologySettingsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.DataClassificationUtils.ckmeans", DataClassificationUtils_ts_190.ckmeans);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.DataClassificationUtils.createMatrix", DataClassificationUtils_ts_190.createMatrix);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.DataClassificationUtils.uniqueCountSorted", DataClassificationUtils_ts_190.uniqueCountSorted);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.DataClassificationUtils.findSignificanceFactor", DataClassificationUtils_ts_190.findSignificanceFactor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.DataClassificationUtils.getDecimalSeparator", DataClassificationUtils_ts_190.getDecimalSeparator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbolColor", SymbolColor_ts_191.SymbolColor);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbologySettingsView", SymbologySettingsView_ts_192.SymbologySettingsView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbologySettingsViewModel", SymbologySettingsViewModel_ts_193.SymbologySettingsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.FailHandler", FailHandler_ts_194.FailHandler);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.hookDeferredCallbacks", OfflineHandler_ts_195.hookDeferredCallbacks);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.PassthroughHandler", PassthroughHandler_ts_196.PassthroughHandler);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.RewriteHandler", RewriteHandler_ts_197.RewriteHandler);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.ServeResourceHandler", ServeResourceHandler_ts_198.ServeResourceHandler);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.offline.bundle.offlineHandlers.SiteHandler", SiteHandler_ts_199.SiteHandler);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.AutoCompleteBoxFormItemView", AutoCompleteBoxFormItemView.AutoCompleteBoxFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.CheckBoxFormItemView", CheckBoxFormItemView.CheckBoxFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.ContainerFormItemView", ContainerFormItemView.ContainerFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.DatePickerFormItemView", DatePickerFormItemView.DatePickerFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.FilePickerFormItemView", FilePickerFormItemView.FilePickerFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.GroupBoxFormItemView", GroupBoxFormItemView.GroupBoxFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.HyperlinkFormItemView", HyperlinkFormItemView.HyperlinkFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.ListBoxFormItemView", ListBoxFormItemView.ListBoxFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.MarkdownFormItemView", MarkdownFormItemView.MarkdownFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.RadioButtonFormItemView", RadioButtonFormItemView.RadioButtonFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.TextEntryFormItemView", TextEntryFormItemView.TextEntryFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.TimePickerFormItemView", TimePickerFormItemView.TimePickerFormItemView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Forms.FormItemViewBase", FormItemViewBase.FormItemViewBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.MultiPane.MultiPaneView", MultiPaneView_ts_202.MultiPaneView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.MultiPane.MultiPaneViewModel", MultiPaneViewModel_ts_203.MultiPaneViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.MultiPane.PaneView", PaneView_ts_204.PaneView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.MultiPane.PaneViewModel", PaneViewModel_ts_205.PaneViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.PagingControls.PagingControlsView", PagingControlsView_ts_206.PagingControlsView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.PagingControls.PagingControlsViewModel", PagingControlsViewModel_ts_207.PagingControlsViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelView", SmartPanelView_ts_208.SmartPanelView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.SmartPanel.SmartPanelViewModel", SmartPanelViewModel_ts_209.SmartPanelViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Slider.SliderViewBase", SliderViewBase_ts_210.SliderViewBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Slider.SliderViewModelBase", SliderViewModelBase_ts_211.SliderViewModelBase);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.SortState", SortState_ts_212.SortState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.TableColumnHeaderViewModel", TableColumnHeaderViewModel_ts_213.TableColumnHeaderViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.manualCollator", TableColumnHeaderViewModel_ts_213.manualCollator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.collator", TableColumnHeaderViewModel_ts_213.collator);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.SharedState", TableColumnHeaderViewModel_ts_213.SharedState);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.TableColumnHeaderViewModelInterface", TableColumnHeaderViewModelInterface_ts_214.TableColumnHeaderViewModelInterface);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.TableColumnViewModelInterface", TableColumnViewModelInterface_ts_215.TableColumnViewModelInterface);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.TableView", TableView_ts_216.TableView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.Table.TableViewModel", TableViewModel_ts_217.TableViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardFragmentView", WizardFragmentView_ts_218.WizardFragmentView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelView", WizardPanelView_ts_219.WizardPanelView);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.WizardPanel.WizardPanelViewModel", WizardPanelViewModel_ts_220.WizardPanelViewModel);
    shim("geocortex.essentialsHtmlViewer.ViewerApplication", Viewer_ts_221.ViewerApplication);
    shim("geocortex.essentialsHtmlViewer.Commands.commandsMetadata", commands_meta_ts_222.Commands.commandsMetadata);
    shim("geocortex.essentialsHtmlViewer.Commands.metadataForCommandName", commands_meta_ts_222.Commands.metadataForCommandName);
    shim("geocortex.essentialsHtmlViewer.Commands.publicCommands", commands_meta_ts_222.Commands.publicCommands);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.ColorPickerWidget", ColorPickerWidget_ts_223.ColorPickerWidget);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.KendoColorPickerProvider", KendoColorPickerProvider_ts_224.KendoColorPickerProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.NumericInputWidget", NumericInputWidget_ts_225.NumericInputWidget);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ui.components.KendoSliderProvider", KendoSliderProvider_ts_226.KendoSliderProvider);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.TextSymbolWidget", TextSymbolWidget_ts_227.TextSymbolWidget);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.TextSymbolWidgetViewModel", TextSymbolWidgetViewModel_ts_228.TextSymbolWidgetViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.PictureSymbolWidget", PictureSymbolWidget_ts_229.PictureSymbolWidget);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.PictureSymbolWidgetViewModel", PictureSymbolWidgetViewModel_ts_230.PictureSymbolWidgetViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SimpleSymbolWidget", SimpleSymbolWidget_ts_231.SimpleSymbolWidget);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SimpleSymbolWidgetViewModel", SimpleSymbolWidgetViewModel_ts_232.SimpleSymbolWidgetViewModel);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.clickableGraphics.ClickableGraphicsRegistry", ClickableGraphicsRegistry_ts_233.ClickableGraphicsRegistry);
    shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.ReverseGeocoder", ReverseGeocoder_ts_224.ReverseGeocoder);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsViewModel", FeatureSetCollectionResultsViewModel_ts_234.FeatureSetCollectionResultsViewModel);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsView", FeatureSetCollectionResultsView_ts_235.FeatureSetCollectionResultsView);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsLabelView", FeatureSetCollectionResultsLabelView_ts_236.FeatureSetCollectionResultsLabelView);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetCollectionResultsLabelViewModel", FeatureSetCollectionResultsLabelViewModel_ts_237.FeatureSetCollectionResultsLabelViewModel);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetResultsView", FeatureSetResultsView_ts_238.FeatureSetResultsView);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.FeatureSetResultsViewModel", FeatureSetResultsViewModel_ts_239.FeatureSetResultsViewModel);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.results.ResultsUtils", ResultsUtils_ts_240);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.BrowserUtils", BrowserUtils_ts_241);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbolEditorView", SymbolEditorView_ts_242.SymbolEditorView);
	shim("geocortex.essentialsHtmlViewer.mapping.infrastructure.symbology.SymbolEditorViewModel", SymbolEditorViewModel_ts_243.SymbolEditorViewModel);
});


if (!geocortex) geocortex = { }; 
if (!geocortex.essentialsHtmlViewer) geocortex.essentialsHtmlViewer = { }; 
geocortex.essentialsHtmlViewer.version = "2.9.2.001"; 
