!function(){function e(e,i,t){if("string"==typeof e&&(t=i,i=e),void 0!==t)for(var n=i.split("."),a=null,r=window,p=0,o=n.length;p<o;p++)a=n[p],p==o-1?r[a]=t:r[a]||(r[a]={}),r=r[a];else console.warn("Undefined shim for: "+i)}require({cache:{"Mapping/modules/Snapping/EsriSnappingProvider":function(){define(["require","exports","./SnappingInfo","geocortex/infrastructure/ArrayUtils","geocortex/infrastructure/TaskUtils","geocortex/essentials/utilities/GraphicsLayerUtilities","geocortex/infrastructure/GraphicsLayerUtils","geocortex/infrastructure/GraphicsLayerIds"],function(e,i,t,n,a,r,p,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,i){this._convertedSnappingGraphics=null,this._managedDynamicLayers=[],this._loadedDefaultLayers=[],this._snappingLayerInfos=[],this._paused=!1,this._snappingManagerReference=null,this._active=!1,this._refreshOnNextContinue=!1,this.app=e,this.libraryId=i,this.name="EsriSnappingProvider"}return e.prototype.initialize=function(e){this.providerConfiguration=e,this._convertedSnappingGraphics=p.getInternalGraphicsLayer(o.SNAPPING_GRAPHICS_LAYER_ID,this.app,p.GraphicsLayerType.Pushpin),r.addToGraphicsLayerIdsToExclude([p.ExcludeFromEnum.ExportMapTaskName,p.ExcludeFromEnum.ExportApplyStateName,p.ExcludeFromEnum.WebMapName],o.SNAPPING_GRAPHICS_LAYER_ID),this._handleGraphicsLayer(this._convertedSnappingGraphics),this._listenForGraphicLayers()},e.prototype.activate=function(e){this._threshold=e,this.app.map.enableSnapping(this._getSnappingInitOptions()),this._refreshDynamicSnappingData(),this._active=!0},e.prototype._getSnappingInitOptions=function(){return{map:this.app.map,alwaysSnap:!0,snapKey:-1,tolerance:this._threshold,snapPointSymbol:new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_PATH,0,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color([0,0,0,0]),0),new esri.Color([0,0,0,0])),layerInfos:this._cloneLayerInfos()}},e.prototype._cloneLayerInfos=function(){var e=[];return this._loadConfiguredDefaultGraphicsLayers(),this._snappingLayerInfos.forEach(function(i){var n=new t.SnappingInfo(i.layer);n.snapToEdge=i.snapToEdge,n.snapToPoint=i.snapToPoint,n.snapToVertex=i.snapToVertex,e.push(i)}),e},e.prototype.deactivate=function(){this.app.map.disableSnapping(),this._convertedSnappingGraphics.clear(),this._snappingManagerReference&&(this._snappingManagerReference.destroy(),this._snappingManagerReference=null),this._active=!1},e.prototype._snappingWithinMap=function(e){var i=!0;return e.x<this._threshold?i=!1:e.y<this._threshold?i=!1:e.y>this.app.map.height-this._threshold?i=!1:e.x>this.app.map.width-this._threshold&&(i=!1),i},e.prototype.provideSnappingPoint=function(e){var i=this;return new Promise(function(t,n){i._paused&&t(null),i._snappingWithinMap(e)?(i.continueSnapping(),i.app.map.snappingManager.getSnappingPoint(e).then(function(e){t(e?e:null)},function(e){n(e)})):(i.pauseSnapping(),t(null))})},e.prototype.registerLayer=function(e,i){if(!e)throw new Error("Must specify a layer for snapping.");return e.snappable?e.mapService.serviceLayer instanceof esri.layers.GraphicsLayer?(this._handleGraphicsLayer(e.mapService.serviceLayer,i),this._refreshLayerInfos(),!0):e.mapService.serviceLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer?(this._handleDynamicLayer(e),!0):(this.app.trace.warning("Cannot snap to layer {0}, must be of Graphic or Dynamic type".format(e.displayName)),!1):(this.app.trace.warning("Cannot snap to layer {0}, must be set as snappable in REST Manager".format(e.displayName)),!1)},e.prototype.unregisterLayer=function(e){e.mapService.serviceLayer instanceof esri.layers.GraphicsLayer?this._handleRemoveGraphicsLayer(e.mapService.serviceLayer):e.mapService.serviceLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer&&this._handleRemoveDynamicLayer(e),this._refreshLayerInfos()},e.prototype.getSnappableLayers=function(e){var i=e.mapInfo.getLayerInfos().filter(function(e){return e.gcxLayer.snappable});return i=n.ArrayUtils.sortBy(i,function(e){return e.displayName})},e.prototype.continueSnapping=function(){this._snappingManagerReference&&!this.app.map.snappingManager&&this._paused&&(this.app.map.enableSnapping(this._snappingManagerReference),this._snappingManagerReference=null),this.app.map.snappingManager&&this._paused&&(this.app.map.snappingManager._killOffSnapping(),this.app.map.snappingManager._setUpSnapping(),this.app.map.snappingManager._activateSnapping(),this.app.map.snappingManager._startSelectionLayerQuery(),this._refreshLayerInfos()),this._refreshOnNextContinue&&this._active&&(this._refreshDynamicSnappingData(),this._refreshOnNextContinue=!1),this._paused=!1},e.prototype.pauseSnapping=function(){this.app.map.snappingManager&&(this.app.map.snappingManager._killOffSnapping(),this.app.map.snappingManager._deactivateSnapping(),this.app.map.snappingManager._stopSelectionLayerQuery(),this._snappingManagerReference=this.app.map.snappingManager,this.app.map.snappingManager=null),this._paused=!0},e.prototype._isLayerVisible=function(e){if(!e.isVisible())return!1;if(null!==e.maxScale&&void 0!==e.maxScale&&null!==e.minScale&&void 0!==e.minScale){var i=this.app.map.getScale();if(i<e.maxScale||i>e.minScale)return!1}return!0},e.prototype._handleGraphicsLayer=function(e,i){this._removeInfo(e),this.app.trace.debug("[EsriSnappingProvider] Graphics Layer handled {0}".format(e.id));var n=new t.SnappingInfo(e);i&&(n.snapToEdge=i.edge,n.snapToPoint=i.point,n.snapToVertex=i.vertex),this._snappingLayerInfos.push(n),this._refreshLayerInfos()},e.prototype._listenForGraphicLayers=function(){var e=this;this.app.map.on("layer-add-result",function(i){i&&i.layer&&i.layer instanceof esri.layers.GraphicsLayer&&e._loadConfiguredDefaultGraphicsLayers()})},e.prototype._refreshLayerInfos=function(){this.app.map.snappingManager&&this.app.map.snappingManager.setLayerInfos(this._cloneLayerInfos())},e.prototype._handleRemoveGraphicsLayer=function(e){this._removeInfo(e)},e.prototype._handleDynamicLayer=function(e){this._managedDynamicLayers.indexOf(e)<0&&(this._managedDynamicLayers.push(e),this._active&&!this._paused?this._refreshDynamicSnappingData():this._refreshOnNextContinue=!0)},e.prototype._handleRemoveDynamicLayer=function(e){var i=this._managedDynamicLayers.indexOf(e);i>-1&&(this._managedDynamicLayers.splice(i,1),this._active&&!this._paused?this._refreshDynamicSnappingData():this._refreshOnNextContinue=!0)},e.prototype._refreshDynamicSnappingData=function(){this.loadForExtent(this.app.map.extent)},e.prototype._removeInfo=function(e){for(var i=0;i<this._snappingLayerInfos.length;i++)if(this._snappingLayerInfos[i].layer===e){this._snappingLayerInfos.splice(i,1);break}},e.prototype.loadForExtent=function(e){var i=this;this._convertedSnappingGraphics.clear(),this._refreshOnNextContinue=!1;for(var t=[],n=0;n<this._managedDynamicLayers.length;n++)this._isLayerVisible(this._managedDynamicLayers[n])&&t.push(this._managedDynamicLayers[n]);for(n=0;n<t.length;n++){var r=t[n];if(r){var p=new esri.tasks.Query;p.geometry=e,p.outSpatialReference=this.app.map.spatialReference,p.returnGeometry=!0;var o="1=1";if(r.mapService&&r.mapService.serviceLayer&&r.mapService.serviceLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer){var s=(r.mapService.serviceLayer.layerDefinitions||[])[parseInt(r.id)];s&&(o=s)}p.where=o,a.getQueryTask(r).execute(p,function(e){i._queryCompleted(e,r)},function(e){i._queryError(e)})}}},e.prototype._queryCompleted=function(e,i){if(e&&e.features)for(var t=0;t<e.features.length;t++){var n=e.features[t];n&&this._convertedSnappingGraphics.add(n)}},e.prototype._queryError=function(e){this.app.trace.error("An error occured while downloading snapping points: {0}".format(e&&e.message?e.message:"Undetermined cause"))},e.prototype._loadConfiguredDefaultGraphicsLayers=function(){var e=this;this.providerConfiguration&&this.providerConfiguration.configuration&&this.providerConfiguration.configuration.graphicsLayers&&this.providerConfiguration.configuration.graphicsLayers.forEach(function(i){var t=e.app.map.getLayer(i);t&&t instanceof esri.layers.GraphicsLayer&&e._loadedDefaultLayers.indexOf(t)<0&&(e._loadedDefaultLayers.push(t),e._handleGraphicsLayer(t))})},e}();i.EsriSnappingProvider=s})},"Mapping/modules/Snapping/LayerSelectorForSnapping":function(){define(["require","exports"],function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t=function(){function e(e,i){this.app=e,this.snappingModule=i,this._registerApplicationCommands()}return e.prototype._registerApplicationCommands=function(){this.app.command("EnableAllLayersForSnapping").register(this,this._executeEnableAllLayersForSnapping),this.app.command("DisableAllLayersForSnapping").register(this,this._executeDisableAllLayersForSnapping),this.app.command("EnableLayerForSnapping").register(this,this._executeEnableLayerForSnapping),this.app.command("DisableLayerForSnapping").register(this,this._executeDisableLayerForSnapping)},e.prototype._executeEnableLayerForSnapping=function(e){this.app.command("RegisterSnappingLayer").execute(e)},e.prototype._executeEnableAllLayersForSnapping=function(e){this.app.command("RegisterSnappingLayers").execute(e)},e.prototype._executeDisableLayerForSnapping=function(e){this.app.command("RemoveSnappingLayer").execute(e)},e.prototype._executeDisableAllLayersForSnapping=function(e){this.app.command("RemoveSnappingLayers").execute(e)},e}();i.LayerSelectorForSnapping=t})},"Mapping/modules/Snapping/SnappingInfo":function(){define(["require","exports"],function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t=function(){return function(e){this.snapToEdge=!0,this.snapToPoint=!0,this.snapToVertex=!0,this.layer=e}}();i.SnappingInfo=t})},"Mapping/modules/Snapping/SnappingLayerSelectorView":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/infrastructure/layerselector/LayerSelectorViewBase"],function(i,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(i){function t(){return null!==i&&i.apply(this,arguments)||this}return e(t,i),t.prototype.attach=function(e){e&&(i.prototype.attach.call(this,e),this.registerCommands())},t.prototype.registerCommands=function(){var e=this;this.app.command("ActivateSelectLayersForSnapping").register(this,this.executeActivateSelectLayersForSnapping,this.canExecuteSnapping),this.app.command("DeactivateSelectLayersForSnapping").register(this,this.executeDeactivateSelectLayersForSnapping,this.canExecuteSnapping),this.app.command("ActivateSnapping").preExecute.subscribe(this,function(){e.viewModel.layerSelectorInitialized.get()||e.viewModel.setupLayerSelector()})},t.prototype.executeActivateSelectLayersForSnapping=function(){this.app.viewManager.activateView(this),this.viewModel.activateSelectLayersForSnapping()},t.prototype.executeDeactivateSelectLayersForSnapping=function(){this.app.viewManager.deactivateView(this),this.viewModel.deactivateSelectLayersForSnapping()},t.prototype.canExecuteSnapping=function(){return this.app.command("ActivateSnapping").canExecute()},t}(n.LayerSelectorViewBase);t.SnappingLayerSelectorView=a})},"Mapping/modules/Snapping/SnappingLayerSelectorViewModel":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/infrastructure/layerselector/LayerSelectorViewModelBase"],function(i,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(i){function t(e,t){var n=i.call(this,e,t)||this;return n._providerRegistered=!1,n._initializeHandler=null,n.selectAllButtonTitle.set(n.app.getResource(t,"language-layer-selector-snapping-select-all-tooltip")),n.clearAllButtonTitle.set(n.app.getResource(t,"language-layer-selector-snapping-clear-all-tooltip")),n}return e(t,i),t.prototype.initialize=function(e){var t=this;i.prototype.initialize.call(this,e),this.app.event("SnappingProviderRegistered").once(this,function(e){t._providerRegistered=!0,t._initializeHandler&&(t._initializeHandler(),t._initializeHandler=null)})},t.prototype.filter=function(e){if(e&&e.layer&&e.layer.gcxLayer){var i=e.layer.gcxLayer;return!!i&&i.snappable}},t.prototype.handleLayerStateChange=function(e){this._setLayerStateForSnapping(e)},t.prototype.handleAllLayersEnabled=function(){var e=this._getListedLayers();this.app.command("EnableAllLayersForSnapping").execute(e)},t.prototype.handleAllLayersDisabled=function(){var e=this._getListedLayers();this.app.command("DisableAllLayersForSnapping").execute(e)},t.prototype.onInitialized=function(e){var i=this;this._providerRegistered?this._handleInitialize(e):this._initializeHandler=function(){i._handleInitialize(e)}},t.prototype._handleMapServicesAdded=function(e){i.prototype._handleMapServicesAdded.call(this,e);for(var t=0,n=e.layers;t<n.length;t++){var a=n[t];!1!==a.snappable&&a.snappingEnabled&&this.app.command("RegisterSnappingLayer").execute(a)}},t.prototype._handleMapServiceRemoved=function(e){i.prototype._handleMapServiceRemoved.call(this,e);for(var t=0,n=e.layers;t<n.length;t++){var a=n[t];this.app.command("RemoveSnappingLayer").execute(a)}},t.prototype._handleInitialize=function(e){e.filteredLayerSelectorLayerItems.forEach(function(e){if(e&&e.layer&&e.layer.gcxLayer){var i=e.layer.gcxLayer;e.isEnabled.set(i.snappingEnabled)}})},t.prototype._getListedLayers=function(){var e=[];return this.layerSelector.filteredLayerSelectorLayerItems.forEach(function(i){i&&i.layer&&i.layer.gcxLayer&&e.push(i.layer.gcxLayer)}),e},t.prototype.activateSelectLayersForSnapping=function(){this.app.event("SelectLayersForSnappingActivatedEvent").publish(this.layerSelector.filteredLayerSelectorLayerItems.slice(0))},t.prototype.deactivateSelectLayersForSnapping=function(){this.app.event("SelectLayersForSnappingDeactivatedEvent").publish(this.layerSelector.filteredLayerSelectorLayerItems.slice(0))},t.prototype._setLayerStateForSnapping=function(e){if(e&&e.layer&&e.layer.gcxLayer){var i=e.layer.gcxLayer;i?e.isEnabled.get()?this.app.command("EnableLayerForSnapping").execute(i):this.app.command("DisableLayerForSnapping").execute(i):this.app.trace.error("SnappingLayerSelectorViewModel: Could not handle layer state change. Layer not defined.")}},t}(n.LayerSelectorViewModelBase);t.SnappingLayerSelectorViewModel=a})},"Mapping/modules/Snapping/SnappingModule":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/framework/application/ModuleBase","./LayerSelectorForSnapping","geocortex/infrastructure/accessibility/InputMethod","geocortex/infrastructure/tools/DrawMode","geocortex/infrastructure/tools/MapTool","geocortex/infrastructure/FocusUtils","geocortex/essentials/utilities/GraphicsLayerUtilities","geocortex/infrastructure/GraphicsLayerUtils","geocortex/infrastructure/GraphicsLayerIds"],function(i,t,n,a,r,p,o,s,c,h,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=function(i){function t(){var e=null!==i&&i.apply(this,arguments)||this;return e._inputThrottleDelay=1e3/60,e._originPoint=null,e._originSnapPoint=null,e._timer=null,e._mouseInsideMapBounds=!1,e._snapSymbol=null,e._canSnap=!1,e._supportedDrawModes=[],e._enabled=!1,e._accessibleMode=!1,e._graphicsLayer=null,e._tempEditingLayer=null,e._toggleKey=null,e._isEditing=!1,e._supressNextDeactivatedEvent=!1,e._graphicEditingLayerRef=null,e._currentEditingGraphic=null,e._dummyGraphic=null,e._toolbar=null,e._mouseMoveToken=null,e._extentChangedToken=null,e._mouseOverToken=null,e._onKeyDown=null,e._graphicDrawToken=null,e._vertexMovedToken=null,e._editVertexMoveToken=null,e._vertexHandleShownToken=null,e._vertexHandleHiddenToken=null,e._esriEditVertexMovedToken=null,e._defaultRadiusBorderColor="#000000",e._defaultHoverColor="#ffffff",e._defaultPointColor="#ffffff",e._defaultSnappingPointColor="#ffffff",e._defaultHoverOpacity=.2,e._defaultPointSize=5,e._defaultBorderSize=1,e._defaultThreshold=25,e._defaultCancelKey=70,e}return e(t,i),t.prototype.initialize=function(e){var t=this;i.prototype.initialize.call(this,e),this._toggleKey=isNaN(parseInt(this.configuration.toggleKey+"",10))?this._defaultCancelKey:parseInt(this.configuration.toggleKey+"",10),this._threshold=isNaN(parseInt(this.configuration.threshold,10))?this._defaultThreshold:parseInt(this.configuration.threshold,10),this.layerSelectorForSnapping=new a.LayerSelectorForSnapping(this.app,this),this.app.waitUntilSiteServiceLayersLoaded().then(function(){t._initializeSnappingManager(),t._subscribeToMapEvents()}),this.configuration.supportedDrawModes&&(this._supportedDrawModes=this.configuration.supportedDrawModes);var n=this.configuration.radiusFillColor?this.configuration.radiusFillColor:this._defaultHoverColor,r=new esri.Color(n).toRgba(),p=isNaN(parseFloat(this.configuration.radiusFillOpacity))?this._defaultHoverOpacity:parseFloat(this.configuration.radiusFillOpacity);r[3]=p;var o=new esri.Color(r),s=this.configuration.pointColor?this.configuration.pointColor:this._defaultPointColor,c=isNaN(parseInt(this.configuration.pointSize,10))?this._defaultPointSize:parseInt(this.configuration.pointSize,10);this._snapSymbol=new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,c,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color(s),1),new esri.Color(s));var h=isNaN(parseInt(this.configuration.radiusBorderSize,10))?this._defaultBorderSize:parseInt(this.configuration.radiusBorderSize,10),l=this.configuration.radiusBorderColor?this.configuration.radiusBorderColor:this._defaultRadiusBorderColor;this._hoverGraphic=new esri.Graphic,this._hoverGraphic.setSymbol(new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,2*this._threshold,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color(l),h),o)),this._snapGraphic=new esri.Graphic,this._snapGraphic.setSymbol(this._snapSymbol),this._registerApplicationCommands(),this._subscribeToApplicationEvents(),this.app.map&&this.app.map.loaded?this._addKeyHandlers():this.app.event("MapLoadedEvent").once(this,function(){t._addKeyHandlers()})},t.prototype._registerApplicationCommands=function(){this.app.command("ActivateSnapping").register(this,this._executeActivateSnapping,this._canExecuteSnapping),this.app.command("DeactivateSnapping").register(this,this._executeDeactivateSnapping,this._canExecuteSnapping),this.app.command("RegisterSnappingLayer").register(this,this._executeRegisterSnappingLayer),this.app.command("RegisterSnappingLayers").register(this,this._executeRegisterSnappingLayers),this.app.command("RemoveSnappingLayer").register(this,this._executeUnregisterSnappingLayer),this.app.command("RemoveSnappingLayers").register(this,this._executeUnregisterSnappingLayers)},t.prototype._subscribeToApplicationEvents=function(){var e=this;this.app.event("ActiveToolChangedEvent").subscribe(this,this._handleActiveToolChanged),this.app.event("GraphicDrawActivatedEvent").subscribe(this,function(i){e._handleGraphicDrawActivatedEvent(i)}),this.app.event("GraphicDrawDeactivatedEvent").subscribe(this,function(i){e._handleDrawDeactivatedEvent(i)}),this.app.event("GraphicEditActivatedEvent").subscribe(this,function(i){e._canSnap=!0,e._handleEditBegin(),e._subscribeMouseEvents(),e._supressNextDeactivatedEvent=!0,e._currentEditingGraphic=i.graphic,e._dummyGraphic=new esri.Graphic,e._toolbar=i.sender,e._graphicEditingLayerRef=i.graphic.getLayer(),e._enabled&&e._moveEditingGraphicToTempLayer()}),this.app.event("GraphicEditDeactivatedEvent").subscribe(this,function(i){e._canSnap=!1,e._handleEditEnd(),e._supressNextDeactivatedEvent=!1,e._currentEditingGraphic&&(e._returnEditingGraphicToOwner(!1),e._currentEditingGraphic=null,e._graphicEditingLayerRef=null,e._dummyGraphic=null,e._toolbar=null,e.app.trace.debug("[SnappingModule]: Graphic editing context cleaned up"))}),this.app.event("GraphicDrawAccessibleEditActivatedEvent").subscribe(this,function(i){e._canSnap=!0,e._handleEditBegin()}),this.app.event("GraphicDrawAccessibleEditDeactivatedEvent").subscribe(this,function(i){e._supressNextDeactivatedEvent?e._supressNextDeactivatedEvent=!1:(e._canSnap=!1,e._handleEditEnd())}),this.app.event("InputMethodChangedEvent").subscribe(this,function(i){var t=!1;i.newMethod===r.InputMethod.KEYBOARD&&(t=!0),e._accessibleMode!==t&&e._hideSnappingGraphics(),e._accessibleMode=t,e._subscribeToUIEvents()})},t.prototype._initializeSnappingManager=function(){this._graphicsLayer=h.getInternalGraphicsLayer(l.SNAPPING_HELPER_GRAPHICS_LAYER_ID,this.app,h.GraphicsLayerType.Pushpin),c.addToGraphicsLayerIdsToExclude([h.ExcludeFromEnum.ExportApplyStateName,h.ExcludeFromEnum.ExportMapTaskName,h.ExcludeFromEnum.WebMapName],l.SNAPPING_HELPER_GRAPHICS_LAYER_ID),this.app.map.addLayer(this._graphicsLayer),this._graphicsLayer.add(this._hoverGraphic),this._graphicsLayer.add(this._snapGraphic),this._hideSnappingGraphics();var e=this.configuration.snappingProvider;e&&(e.libraryId&&!this.app.allLibrariesLoaded?this._loadProviderWhenLibrariesDownloaded(e):this._loadProvider(e))},t.prototype._subscribeToMapEvents=function(){var e=this;this.app.map.on("layer-add-result",function(i){e.app.map.reorderLayer(e._graphicsLayer,e.app.map.graphicsLayerIds.length)})},t.prototype._loadProviderWhenLibrariesDownloaded=function(e){var i=this;this.app.event("ViewerLibrariesDownloadedEvent").once(this,function(){return i._loadProvider(e)})},t.prototype._loadProvider=function(e){var i=e.type,t=dojo.getObject(i);if(t){var n=new t(this.app,e.libraryId||this.libraryId);n.initialize(e),this._registerSnappingProvider(n)}},t.prototype._subscribeMouseEvents=function(){window.PointerEvent?this._addPointerMove():this._addMouseMove(),this._addMouseLeave(),this._addMouseOver()},t.prototype._removeMouseEvents=function(){this._removeEventListener(this.app.map.root,"pointermove",this._handlePointerMove),this._removeEsriHandle(this._mouseOverToken),this._removeEsriHandle(this._mouseMoveToken),this._removeJQueryHandle(this._mouseLeaveToken)},t.prototype._handleEditBegin=function(){var e=this;this._handleEditEnd(),this._editVertexMoveToken=this.app.event("EditVertexMovedEvent").subscribe(this,function(i){e._mouseInsideMapBounds=!0,e._handleInputMove(i)}),this._vertexHandleShownToken=this.app.event("VertexHandleShownEvent").subscribe(this,function(i){e._hideSnappingGraphics(),e._removeMouseEvents()}),this._vertexHandleHiddenToken=this.app.event("VertexHandleHiddenEvent").subscribe(this,function(){e._hideSnappingGraphics(),e._subscribeMouseEvents()}),this._esriEditVertexMovedToken=this.app.event("EditVertexHandleMovedEvent").subscribe(this,function(i){i&&i.geometry&&i.geometry instanceof esri.geometry.Point&&(e._mouseInsideMapBounds=!0,e._timer||(e._timer=setTimeout(function(){var t=i.getShape(),n=t.matrix.dx,a=t.matrix.dy,r=i.geometry,p=e.app.map.toScreen(r).offset(n,a),o={mapPoint:e.app.map.toMap(p),screenPoint:p};e._handleInputMove(o),e._clearTimeout()},e._inputThrottleDelay)))}),this._isEditing=!0},t.prototype._handleEditEnd=function(){this._hideSnappingGraphics(),this._removeGcxHandle("EditVertexMovedEvent",this._editVertexMoveToken),this._removeGcxHandle("VertexHandleShownEvent",this._vertexHandleShownToken),this._removeGcxHandle("VertexHandleHiddenEvent",this._vertexHandleHiddenToken),this._removeGcxHandle("EditVertexHandleMovedEvent",this._esriEditVertexMovedToken),this._isEditing=!1,this.snappingProvider.pauseSnapping()},t.prototype._subscribeAccessibilityEvents=function(){this._addVertexMoved()},t.prototype._removeAccessibilityEvents=function(){this._removeGcxHandle("GraphicVertexMovedEvent",this._vertexMovedToken)},t.prototype._handleGraphicDrawActivatedEvent=function(e){var i=e.geometryType;i===esri.toolbars.Draw.MULTI_POINT&&(i=p.DrawMode.MULTI_POINT),i&&this._drawModeSupported(i)?(this._canSnap=!0,this.snappingProvider.continueSnapping()):(this._canSnap=!1,this.snappingProvider.pauseSnapping())},t.prototype._handleDrawDeactivatedEvent=function(e){this._canSnap=!1,this.snappingProvider.pauseSnapping()},t.prototype._handleActiveToolChanged=function(e){if(!this.snappingProvider)return this._canSnap=!1,void this.app.trace.debug("[SnappingModule]: 'ActiveToolChangedEvent' cannot be handled by the module before a SnappingProvider is registered. Check to ensure 'SiteServiceLayersLoadedEvent' has fired.");if(e&&e.tool&&e.tool instanceof o.MapTool){var i=e.tool;"EditMarkup"!==i.command&&"DeleteMarkup"!==i.command?this._drawModeSupported(i.drawMode)?(this._canSnap=!0,this.snappingProvider.continueSnapping()):(this._canSnap=!1,this.snappingProvider.pauseSnapping()):this._canSnap=!1}else this._canSnap=!1},t.prototype._drawModeSupported=function(e){return this._supportedDrawModes.indexOf(e?e.toUpperCase():e)>-1},t.prototype._registerSnappingProvider=function(e){this.snappingProvider=e,this.app.command("ActivateSnapping").raiseCanExecuteChanged(),this.app.event("SnappingProviderRegistered").publish(this.snappingProvider)},t.prototype._subscribeToUIEvents=function(){this._enabled&&(this._accessibleMode?(this._subscribeAccessibilityEvents(),this._removeMouseEvents(),this._mouseInsideMapBounds=!0):(this._subscribeMouseEvents(),this._removeAccessibilityEvents()),this._addMapStateChangedEvents())},t.prototype._executeActivateSnapping=function(){this._executeDeactivateSnapping(),this._enabled=!0,this.snappingProvider.activate(this._threshold),this._canSnap&&(this.snappingProvider.pauseSnapping(),this.snappingProvider.continueSnapping()),this._subscribeToUIEvents(),this.app.command("ScreenReaderNarrate").execute(this.app.getResource(this.libraryId,"language-snapping-activated")),this._isEditing&&(this.app.trace.debug("[SnappingModule]: Snapping enabled mid-edit"),this._handleEditBegin(),this._subscribeMouseEvents(),this._currentEditingGraphic&&this._moveEditingGraphicToTempLayer())},t.prototype._canExecuteSnapping=function(){if(this._canSnap)return!0;if(!(this.app.toolRegistry.getActiveTool()instanceof o.MapTool))return!1;var e=this.app.toolRegistry.getActiveTool();return!(!this.snappingProvider||!this._drawModeSupported(e.drawMode))},t.prototype._executeDeactivateSnapping=function(){this._enabled&&this.app.command("ScreenReaderNarrate").execute(this.app.getResource(this.libraryId,"language-snapping-deactivated")),this._enabled=!1,this.snappingProvider.deactivate(),this._killOffSnapping(),this._hideSnappingGraphics(),this._raiseSnappingInputMovedEvent(null,null),s.focusOnMap(this.app.map),this._currentEditingGraphic&&this._returnEditingGraphicToOwner()},t.prototype._executeRegisterSnappingLayers=function(e){var i=this;e.forEach(function(e){i._readerLayerRegisterWrapper(e)})},t.prototype._executeRegisterSnappingLayer=function(e){this._readerLayerRegisterWrapper(e)},t.prototype._executeUnregisterSnappingLayer=function(e){this._readerLayerUnregisterWrapper(e)},t.prototype._executeUnregisterSnappingLayers=function(e){var i=this;e.forEach(function(e){i._readerLayerUnregisterWrapper(e)})},t.prototype._readerLayerRegisterWrapper=function(e){this.snappingProvider.registerLayer(e)&&this.app.command("ScreenReaderNarrate").execute(this.app.getResource(this.libraryId,"language-snapping-layer-registered").format(e.displayName))},t.prototype._readerLayerUnregisterWrapper=function(e){this.snappingProvider.unregisterLayer(e),this.app.command("ScreenReaderNarrate").execute(this.app.getResource(this.libraryId,"language-snapping-layer-unregistered").format(e.displayName))},t.prototype._clearTimeout=function(){this._timer&&(clearTimeout(this._timer),this._timer=null)},t.prototype._addVertexMoved=function(){var e=this;this._removeGcxHandle("GraphicVertexMovedEvent",this._vertexMovedToken),this._vertexMovedToken=this.app.event("GraphicVertexMovedEvent").subscribe(this,function(i){e._handleInputMove(i)})},t.prototype._addMouseLeave=function(){var e=this;this._removeJQueryHandle(this._mouseLeaveToken),this._mouseLeaveToken=$(this.app.map.root).mouseleave(function(){e._clearTimeout(),e._hideSnappingGraphics(),e.snappingProvider.pauseSnapping(),e._mouseInsideMapBounds=!1})},t.prototype._addPointerMove=function(){var e=this;this._removeEventListener(this.app.map.root,"pointermove",this._handlePointerMove),this._addEventListener(this.app.map.root,"pointermove",function(i){e._handlePointerMove(i)})},t.prototype._handlePointerMove=function(e){var i=this;e&&(this._timer||(this._timer=setTimeout(function(){var t=e.clientX-i.app.map.root.getBoundingClientRect().left,n=e.clientY-i.app.map.root.getBoundingClientRect().top,a=i.app.map.toMap(new esri.geometry.ScreenPoint(t,n)),r={mapPoint:a,screenPoint:i.app.map.toScreen(a)};i._handleInputMove(r),i._clearTimeout()},this._inputThrottleDelay)))},t.prototype._addMouseOver=function(){var e=this;this._removeEsriHandle(this._mouseOverToken),this._mouseOverToken=this.app.map.on("mouse-over",function(i){e._mouseInsideMapBounds=!0,e._timer||(e._timer=setTimeout(function(){e._handleInputMove(i),e._clearTimeout()},e._inputThrottleDelay))})},t.prototype._addMouseMove=function(){var e=this;this._removeEsriHandle(this._mouseMoveToken),this._mouseMoveToken=this.app.map.on("mouse-move",function(i){e._mouseInsideMapBounds=!0,e._timer||(e._timer=setTimeout(function(){e._handleInputMove(i),e._clearTimeout()},e._inputThrottleDelay))})},t.prototype._addMapStateChangedEvents=function(){var e=this;this._removeEsriHandle(this._extentChangedToken),this._extentChangedToken=this.app.map.on("extent-change",function(i){e.snappingProvider.loadForExtent(i.extent),e._originPoint=null,e._originSnapPoint=null})},t.prototype._removeGcxHandle=function(e,i){e&&i&&(this.app.event(e).unsubscribe(i),i=null)},t.prototype._addKeyHandlers=function(){var e=this;this._removeEsriHandle(this._onKeyDown),this._onKeyDown=this.app.map.on("key-down",function(i){e._onSnapKeyDownHandler(i)})},t.prototype._onSnapKeyDownHandler=function(e){e.keyCode===this._toggleKey&&(this._enabled?this.app.command("DeactivateSnapping").execute():this.app.command("ActivateSnapping").execute())},t.prototype._killOffSnapping=function(){this._removeMouseEvents(),this._removeAccessibilityEvents(),this._removeEsriHandle(this._graphicDrawToken),this._removeEsriHandle(this._extentChangedToken)},t.prototype._removeEsriHandle=function(e){e&&(e.remove(),e=null)},t.prototype._removeJQueryHandle=function(e){e&&(e.off(),e=null)},t.prototype._addSnappingGraphics=function(e,i){if(void 0===i&&(i=null),i||(i=e),this._originPoint){var t=this.app.map.toScreen(i),n=t.x-this._originSnapPoint.x,a=t.y-this._originSnapPoint.y,r=dojox.gfx.matrix.translate(n,a),p=this._snapGraphic.getDojoShape();p&&p.setTransform(r),n=(t=this.app.map.toScreen(e)).x-this._originPoint.x,a=t.y-this._originPoint.y,r=dojox.gfx.matrix.translate(n,a),(p=this._hoverGraphic.getDojoShape())&&p.setTransform(r)}else this._originPoint=this.app.map.toScreen(e),this._originSnapPoint=this.app.map.toScreen(i),this._snapGraphic.setGeometry(i),this._hoverGraphic.setGeometry(e);this._snapGraphic.visible||this._snapGraphic.show(),this._hoverGraphic.visible||this._hoverGraphic.show(),$(this._snapGraphic.getNode()).css("pointer-events","none"),$(this._hoverGraphic.getNode()).css("pointer-events","none")},t.prototype._hideSnappingGraphics=function(){this._originPoint=null,this._originSnapPoint=null,this._hoverGraphic.visible&&this._hoverGraphic.hide(),this._snapGraphic.visible&&this._snapGraphic.hide()},t.prototype._handleInputMove=function(e){var i=this;this._enabled&&(this._canSnap?e&&e.screenPoint&&this._mouseInsideMapBounds&&(this.snappingProvider.continueSnapping(),this.snappingProvider.provideSnappingPoint(e.screenPoint).then(function(t){t?(i._addSnappingGraphics(e.mapPoint,t),i._raiseSnappingInputMovedEvent(t,e.mapPoint),i.app.command("ScreenReaderNarrate").execute(i.app.getResource(i.libraryId,"language-snapping-point-found"))):(i._addSnappingGraphics(e.mapPoint,null),i._raiseSnappingInputMovedEvent(null,e.mapPoint))}).catch(function(t){i.app.trace.error("Failed to find a snapping point: {0}".format(t&&t.message?t.message:"Undetermined cause")),i.app.command("ScreenReaderNarrate").execute(i.app.getResource(i.libraryId,"language-snapping-error")),i._raiseSnappingInputMovedEvent(null,e.mapPoint)})):this._hideSnappingGraphics())},t.prototype._raiseSnappingInputMovedEvent=function(e,i){var t={snappingPoint:e,inputPoint:i};this.app.event("SnappingFeedbackEvent").publish(t)},t.prototype._addEventListener=function(e,i,t){e.addEventListener?e.addEventListener(i,t,!1):e.attachEvent&&e.attachEvent("on"+i,t)},t.prototype._removeEventListener=function(e,i,t){e.removeEventListener?e.removeEventListener(i,t,!1):e.detachEvent&&e.detachEvent("on"+i,t)},t.prototype._moveEditingGraphicToTempLayer=function(){if(this._graphicEditingLayerRef&&this._currentEditingGraphic&&this._canSwapEditingGraphic(this._graphicEditingLayerRef)&&(this.app.trace.debug("[SnappingModule]: Attempting to move the editing graphic from '{0}' to the temporary layer".format(this._graphicEditingLayerRef.id)),this._tempEditingLayer||(this._tempEditingLayer=h.getInternalGraphicsLayer(l.TEMP_SNAPPING_EDITOR_LAYER_ID,this.app,h.GraphicsLayerType.Pushpin)),this._graphicEditingLayerRef.remove(this._currentEditingGraphic),this._graphicEditingLayerRef.add(this._dummyGraphic),this._tempEditingLayer.add(this._currentEditingGraphic),this._toolbar&&this._toolbar.refresh(),this.app.clickableGraphics.isLayerRegistered(this._graphicEditingLayerRef))){var e=this.app.clickableGraphics.getLayerInfo(this._graphicEditingLayerRef);this.app.clickableGraphics.register(this._tempEditingLayer,e)}},t.prototype._returnEditingGraphicToOwner=function(e){void 0===e&&(e=!0),this._graphicEditingLayerRef&&this._currentEditingGraphic&&this._tempEditingLayer&&this._canSwapEditingGraphic(this._graphicEditingLayerRef)&&(this.app.trace.debug("[SnappingModule]: Returning the editing graphic back to '{0}'".format(this._graphicEditingLayerRef.id)),this._tempEditingLayer.remove(this._currentEditingGraphic),this._graphicEditingLayerRef.remove(this._dummyGraphic),this._graphicEditingLayerRef.add(this._currentEditingGraphic),this.app.clickableGraphics.isLayerRegistered(this._tempEditingLayer)&&this.app.clickableGraphics.unregister(this._tempEditingLayer),h.removeInternalGraphicsLayer(this._tempEditingLayer.id,this.app,h.GraphicsLayerType.Pushpin),this._tempEditingLayer.clear(),this._tempEditingLayer=null,e&&this._toolbar&&this._toolbar.refresh())},t.prototype._canSwapEditingGraphic=function(e){var i=!1,t=[];return this.snappingProvider&&this.snappingProvider.providerConfiguration&&this.snappingProvider.providerConfiguration.configuration&&this.snappingProvider.providerConfiguration.configuration.graphicsLayers&&(t=this.snappingProvider.providerConfiguration.configuration.graphicsLayers),e&&e instanceof esri.layers.GraphicsLayer&&t.indexOf(e.id)>-1&&(i=!0),i},t}(n.ModuleBase);t.SnappingModule=d})},"Mapping/modules/Snapping/SnappingModuleConfiguration":function(){define(["require","exports"],function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0})})},"Mapping/modules/Snapping/SnappingOptions":function(){define(["require","exports"],function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0})})},"Mapping/modules/Snapping/SnappingProviderConfiguration":function(){define(["require","exports"],function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0})})}}}),require({cache:{}}),define(["Mapping/modules/Snapping/EsriSnappingProvider","Mapping/modules/Snapping/LayerSelectorForSnapping","Mapping/modules/Snapping/SnappingInfo","Mapping/modules/Snapping/SnappingLayerSelectorView","Mapping/modules/Snapping/SnappingLayerSelectorViewModel","Mapping/modules/Snapping/SnappingModule"],function(i,t,n,a,r,p){e(i,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.EsriSnappingProvider",i.EsriSnappingProvider),e(t,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.LayerSelectorForSnapping",t.LayerSelectorForSnapping),e(n,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.SnappingInfo",n.SnappingInfo),e(a,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.SnappingLayerSelectorView",a.SnappingLayerSelectorView),e(r,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.SnappingLayerSelectorViewModel",r.SnappingLayerSelectorViewModel),e(p,"geocortex.essentialsHtmlViewer.mapping.modules.snapping.SnappingModule",p.SnappingModule)})}();