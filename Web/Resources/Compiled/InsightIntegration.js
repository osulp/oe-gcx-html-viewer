function shim(e,t,i){if("string"==typeof e&&(i=t,t=e),"undefined"==typeof i)return void console.warn("Undefined shim for: "+t);for(var n=t.split("."),a=null,r=window,o=0,s=n.length;o<s;o++)a=n[o],o==s-1?r[a]=i:r[a]||(r[a]={}),r=r[a]}require({cache:{"Mapping/modules/InsightIntegration/InsightIntegrationModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase","geocortex/essentials/utilities/UrlUtilities","geocortex/infrastructure/tools/MapTool","geocortex/essentials/MapServiceConstants","geocortex/infrastructure/search/SearchManager"],function(e,t,i,n,a,r,o){"use strict";var s=function(e){function t(t,i){var n=e.call(this,t,i)||this;return n.VIEWER_TYPE_FOR_ANALYTICS="Geocortex Viewer for HTML5",n.SECURITY_ISSUER_NAME="http://www.geocortex.net/security/claims/issuer-name",n.I_WANT_TO_MENU_ID="IWANTTO",n.TOOL_EVENT_SOURCE_IWTM="IWantToMenu",n.TOOL_EVENT_SOURCE_TOOLBAR="Toolbar",n._eventRelay=null,n._pendingEvents=[],n._datalinkResolutionTimes={},n._layerLoadTimes={},n._searchTimes={},n._webRequestTimes={},n._workflowTimes={},n}return __extends(t,e),t.prototype.initialize=function(e){var t=this;if(this._loggingEnabled=!(!e||void 0==e.enabled)&&e.enabled,this._loggingEnabled!==!1&&!this.app.isOffline.get()){this._dataRelayIntervalInSeconds=e&&e.dataRelayIntervalInSeconds?e.dataRelayIntervalInSeconds:30,this._dataRelayUri=e&&e.dataRelayUri?e.dataRelayUri:"http://localhost/Geocortex/Analytics/ClientRelay",this._requiresProxy(this._dataRelayUri)&&(this._dataRelayUri=this.app.configuration.proxyUri+this._dataRelayUri);var i=this.app.configModel.viewerId,a=this.app.configModel.moduleConfigs.filter(function(e){return"Site"===e.moduleName});if(0===a.length)return void(this._loggingEnabled=!1);var r=a[0].configuration.siteUri;r=this.app.performTokenReplacement(r),r=this.app.makeAbsolute(r),r=n.UrlUtilities.simplify(r);var o=new RegExp("(.*)/(REST/sites)/(.*)(/)?","i"),s=o.exec(r);if(null==s||s.length<4)return void(this._loggingEnabled=!1);var l=s[3];this._eventRelay=new geocortex.analytics.EventRelay(i,l,r,this._dataRelayUri),this._listenForUnhandledExceptions(),null!=this.app.site&&this.app.site.isInitialized||(this.app.event("SiteInitializingEvent").once(this,this._handleSiteInitializingStarted),this.app.event("SiteInitializedEvent").once(this,this._handleSiteInitializedCompleted)),this.app.map&&this.app.map.loaded?this._onMapInitialized():this.app.event("MapLoadedEvent").once(this,function(){t._onMapInitialized()}),this.app.event("AuthenticationSucceededEvent").once(this,function(e){return t._logAuthenticationEvent(e,!0)}),this.app.event("AuthenticationFailedEvent").once(this,function(e){return t._logAuthenticationEvent(e,!1)}),this.app.event("ActiveToolChangedEvent").subscribe(this,this._handleActiveToolChanged),this.app.event("DatalinkResolutionStartedEvent").subscribe(this,this._handleDatalinkResolutionStarted),this.app.event("DatalinkResolutionCompletedEvent").subscribe(this,this._handleDatalinkResolutionCompleted),this.app.event("EsriWebRequestStartedEvent").subscribe(this,this._handleWebRequestStarted),this.app.event("EsriWebRequestCompletedEvent").subscribe(this,this._handleWebRequestCompleted),this.app.event("LayerVisibilityChangedEvent").subscribe(this,this._handleLayerVisibilityChanged),this.app.event("MenuItemInvokedEvent").subscribe(this,this._handleMenuItemInvoked),this.app.event("PrintTemplateStartedEvent").subscribe(this,this._handlePrintTemplateStarted),this.app.event("ReportTemplateStartedEvent").subscribe(this,this._handleReportTemplateStarted),this.app.event("ReportStartedEvent").subscribe(this,this._handleReportStarted),this.app.event("SearchProgressEvent").subscribe(this,this._handleSearchProgressChanged),this.app.event("SiteLayerLoadingEvent").subscribe(this,this._handleSiteLayerLoading),this.app.event("SiteLayerLoadedEvent").subscribe(this,this._handleSiteLayerLoaded),this.app.event("ToolbarButtonClickedEvent").subscribe(this,this._handleToolbarButtonClicked),this.app.event("TraceEvent").subscribe(this,this._handleTrace),this.app.event("WorkflowWebRequestStartedEvent").subscribe(this,this._handleWorkflowWebRequestStarted),this.app.event("WorkflowWebRequestCompletedEvent").subscribe(this,this._handleWorkflowWebRequestCompleted)}},t.prototype._onMapInitialized=function(){this._eventRelay.setupMap(this.app.map)},t.prototype._logEvent=function(e,t){if(this._loggingEnabled!==!1)if(null!=this._eventRelay)this._eventRelay.logEvent(e,t);else{var i={eventName:e,eventData:t};this._pendingEvents.push(i)}},t.prototype._listenForUnhandledExceptions=function(){var e=this,t=window;"undefined"!=typeof window.addEventListener&&navigator.appVersion.indexOf("MSIE 9.")===-1?window.addEventListener("error",function(t){return e._onUnhandledException(t)}):"undefined"!=typeof t.attachEvent&&t.attachEvent("onerror",function(t){return e._onUnhandledException(t)}),"undefined"!=typeof Promise&&Promise.onPossiblyUnhandledRejection(function(t){return e._onUnhandledException(t)})},t.prototype._logAuthenticationEvent=function(e,t){var i=this,n=this.app.site.principal,a=n.identities[0],r=a.claims.filter(function(e){return e.type===i.SECURITY_ISSUER_NAME}),o={username:e.username,success:t};r.length>0&&(o.authority=r[0].value),this._logEvent("Authentication",o)},t.prototype._handleActiveToolChanged=function(e){if(e.tool){var t={name:e.tool.name,location:this.TOOL_EVENT_SOURCE_TOOLBAR};if(e.tool instanceof a.MapTool){var i=e.tool;t.command=i.command,t.drawMode=i.drawMode}this._logEvent("Tool",t)}},t.prototype._handleDatalinkResolutionStarted=function(e,t){this._datalinkResolutionTimes[e]=(new Date).getTime()},t.prototype._handleDatalinkResolutionCompleted=function(e,t){var i=(new Date).getTime(),n=this._datalinkResolutionTimes[e];if(this._datalinkResolutionTimes[e]=null,null!=n){var a=0;t.features.get().forEach(function(t){a+=t.dataLinkingResults.get().filter(function(t){return t.dataLink.get().id===e}).length});var r={datalinkID:e,featureResults:a,time:i-n};this._logEvent("Datalink",r)}},t.prototype._handleLayerVisibilityChanged=function(e){if(this.app.map.loaded!==!1)for(var t=0;t<e.length;t++){var i,n,a=e[t];switch(a.mapService.mapServiceType){case r.MapServiceType.DYNAMIC:i=a.mapService.serviceUrl+"/"+a.layer.id,n=a.mapService.serviceUrl;break;case r.MapServiceType.FEATURE:i=a.mapService.serviceUrl;var o=new RegExp("(.*)/(MapServer|FeatureServer)/(d*)"),s=o.exec(a.mapService.serviceUrl);n=s[1]+"/"+s[2];break;case r.MapServiceType.WMS:n=a.mapService.mapUrl,i=a.mapService.mapUrl+"layers="+a.layer.name;break;default:continue}var l={layerURL:i,mapServiceURL:n,visible:a.visibility};this._logEvent("VisibleLayer",l)}},t.prototype._handleMenuItemInvoked=function(e){if(null!=e.menuItem&&null!=e.menuItem.menuViewModel&&e.menuItem.menuViewModel.menuId.toUpperCase()===this.I_WANT_TO_MENU_ID){var t={name:e.menuItem.menuItem.text,location:this.TOOL_EVENT_SOURCE_IWTM};t.command=e.menuItem.menuItem.command.name,t.commandParameter=e.menuItem.menuItem.commandParameter,this._logEvent("Tool",t)}},t.prototype._handlePrintTemplateStarted=function(e){var t=this,i=(new Date).getTime(),n=null,a=null;a=this.app.event("PrintTemplateCompletedEvent").once(this,function(e){null!=n&&t.app.event("PrintTemplateErrorEvent").unsubscribe(n);var a={templateID:e.id,time:(new Date).getTime()-i};t._logEvent("Print",a)}),n=this.app.event("PrintTemplateErrorEvent").once(this,function(e){null!=a&&t.app.event("PrintTemplateCompletedEvent").unsubscribe(a)})},t.prototype._handleReportTemplateStarted=function(e,t,i){var n=this,a=(new Date).getTime();this.app.event("ReportTemplateCompletedEvent").once(this,function(e,t,i){var r=n._getMapServiceFromMapServiceId(t);if(null!=r){var o=r.layers.filter(function(e){return e.name===i});if(0!==o.length){var s={templateID:n._createInsightReportId(r.serviceUrl,o[0].id,e),time:(new Date).getTime()-a};n._logEvent("Report",s)}}})},t.prototype._handleReportStarted=function(e,t,i){var n=this,a=(new Date).getTime(),r=this._getMapServiceFromMapServiceId(t);if(null!=r&&null!=i){var o=null,s=null;s=this.app.event("ReportResultEvent").once(this,function(t){null!=o&&n.app.event("ReportErrorEvent").unsubscribe(o);var s={templateID:n._createInsightReportId(r.serviceUrl,i,e),time:(new Date).getTime()-a};n._logEvent("Report",s)}),o=this.app.event("ReportErrorEvent").once(this,function(e){null!=s&&n.app.event("ReportResultEvent").unsubscribe(s)})}},t.prototype._createInsightReportId=function(e,t,i){return e+"|"+t+"|"+i},t.prototype._getMapServiceFromMapServiceId=function(e){if(null!=e){var t=this.app.site.essentialsMap.mapServices.filter(function(t){return t.id===e});if(0!==t.length)return t[0]}},t.prototype._handleSearchProgressChanged=function(e){if(null!=e.searchType&&""!==e.searchType&&("ArcGIS"===e.searchType||"InstantSearch"===e.searchType||"InstantSearchHints"===e.searchType||"ArcGISGeocode"===e.searchType))if(e.status===o.Status.SEARCHING)null==this._searchTimes[e.searchType]&&(this._searchTimes[e.searchType]=(new Date).getTime());else if(e.status===o.Status.IDLE){var t=(new Date).getTime(),i=this._searchTimes[e.searchType];if(null!=i){var n=0;if(null!=e.results)for(var a=0;a<e.results.featureSets.getLength();a++){var r=e.results.featureSets.getAt(a);n+=r.features.getLength()}if("ArcGISGeocode"===e.searchType){var s={mapServiceURL:e.endpointUrl,searchText:e.query,geocodeType:"Forward",resultCount:n,time:t-i};this._logEvent("Geocode",s)}else{var l={searchText:e.query,searchType:e.searchType,resultCount:n,time:t-i};this._logEvent("Search",l)}}this._searchTimes[e.searchType]=null}},t.prototype._handleSiteInitializingStarted=function(e){this._siteInitializationStartTime=(new Date).getTime()},t.prototype._handleSiteInitializedCompleted=function(e){this._eventRelay.isInit()||this._eventRelay.init(this.VIEWER_TYPE_FOR_ANALYTICS,this.app.version);var t=(new Date).getTime(),i=this._siteInitializationStartTime;if(null!=i){var n={time:t-i};this._logEvent("SiteInitialization",n)}},t.prototype._handleSiteLayerLoading=function(e){this._layerLoadTimes[e.url]=(new Date).getTime()},t.prototype._handleSiteLayerLoaded=function(e){var t=(new Date).getTime(),i=this._layerLoadTimes[e.url];if(this._layerLoadTimes[e.url]=null,null!=i){var n="",a="",r=new RegExp("(.*)/(MapServer|FeatureServer)/(d*)");if(r.test(e.url)){var o=r.exec(e.url);a=o[1]+"/"+o[2],n=e.url}else a=e.url;var s={layerURL:n,mapServiceURL:a,time:t-i};this._logEvent("ServiceLayerInitialization",s)}},t.prototype._handleToolbarButtonClicked=function(e){var t={name:e.id,location:this.TOOL_EVENT_SOURCE_TOOLBAR,command:e.commandName,commandParameter:e.commandParameter};this._logEvent("Tool",t)},t.prototype._handleTrace=function(e){if("debug"!==e.level&&"trace"!==e.level&&"info"!==e.level){var t={message:e.message,level:e.level,stackTrace:e.stack};this._logEvent("Log",t)}},t.prototype._handleWebRequestStarted=function(e){var t=new RegExp("^(.*)/GeometryServer/(\\w+)$");t.test(e)&&(this._webRequestTimes[e]=(new Date).getTime())},t.prototype._handleWebRequestCompleted=function(e){var t=new RegExp("^(.*)/GeometryServer/(\\w+)$");if(t.test(e)){var i=(new Date).getTime(),n=this._webRequestTimes[e];if(null!=n){var a=t.exec(e),r=a[1]+"/GeometryServer",o=a[2],s={mapServiceURL:r,geometryCommand:o,time:i-n};this._logEvent("GeometryRequest",s)}this._webRequestTimes[e]=null}},t.prototype._handleWorkflowWebRequestStarted=function(e,t){this._workflowTimes[t.id]=(new Date).getTime()},t.prototype._handleWorkflowWebRequestCompleted=function(e,t){var i=(new Date).getTime(),n=this._workflowTimes[t.id];if(this._workflowTimes[t.id]=null,null!=n){var a={workflowID:t.id,workflowURL:e,time:i-n};this._logEvent("WorkflowRequest",a)}},t.prototype._onUnhandledException=function(e){if(null!=e){this._eventRelay.isInit()||this._eventRelay.init(this.VIEWER_TYPE_FOR_ANALYTICS,this.app.version);var t;if(null!=e.error&&null!=e.error.message){var i=e.error;t={message:i.message,stackTrace:i.stack}}else if(null!=e.error&&"string"==typeof e.error){var i=e;t={message:i.error}}else if(null!=e.message){var i=e;t={message:i.message,stackTrace:i.stack},console.log("A rejected promise was possibly unhandled, the following exception was captured."),console.warn(i)}null!=t&&this._logEvent("UnhandledException",t)}},t.prototype._requiresProxy=function(e){var t=new dojo._Url(e),i=window.location;return!!(t.scheme||t.host||t.port)&&i.protocol+"//"+i.hostname+(i.port?":"+i.port:"")!=t.scheme+"://"+t.host+(t.port?":"+t.port:"")},t}(i.ModuleBase);t.InsightIntegrationModule=s})}}}),define(["Mapping/modules/InsightIntegration/InsightIntegrationModule"],function(e){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.insightIntegration.InsightIntegrationModule",e.InsightIntegrationModule)});