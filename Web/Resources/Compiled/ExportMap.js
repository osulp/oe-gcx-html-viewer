function shim(e,t,a){if("string"==typeof e&&(a=t,t=e),"undefined"==typeof a)return void console.warn("Undefined shim for: "+t);for(var r=t.split("."),o=null,i=window,p=0,n=r.length;p<n;p++)o=r[p],p==n-1?i[o]=a:i[o]||(i[o]={}),i=i[o]}require({cache:{"Mapping/modules/ExportMap/ExportMapModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase"],function(e,t,a){"use strict";var r=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(a.ModuleBase);t.ExportMapModule=r})},"Mapping/modules/ExportMap/ExportMapView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(e,t,a){"use strict";var r=function(e){function t(t,a){var r=e.call(this,t,a)||this;return r.app.command("ShowExportMapDialog").register(r,function(){r.app.viewManager.activateView(r),r.viewModel.exportComplete.set(!1)},function(){return r.app.site&&!!r.app.site.essentialsMap&&!!r.app.site.essentialsMap.supportedExportFormats}),r}return __extends(t,e),t.prototype.handleExportMapClick=function(e,t,a){this.viewModel.exportMap()},t.prototype.handleViewImageClick=function(e,t,a){window.open(this.viewModel.url.get()),this.viewModel.exportComplete.set(!1)},t}(a.ViewBase);t.ExportMapView=r})},"Mapping/modules/ExportMap/ExportMapViewModel":function(){define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables","geocortex/essentials/ReportParameters"],function(e,t,a,r,o){"use strict";var i=function(e){function t(t,a){var o=e.call(this,t,a)||this;return o.formatSupportsIncludeGeoreferenceData=new r.Observable((!1)),o.isExporting=new r.Observable((!1)),o.exportComplete=new r.Observable((!1)),o.url=new r.Observable(null),o.outputFormats=new r.ObservableCollection,o.allowIncludeGeoreferenceData=new r.Observable((!0)),o.selectedFormat=new r.Observable(null),o.includeGeoreferenceData=new r.Observable((!1)),o.app.site&&o.app.site.isInitialized?o.siteInitialized():o.app.event("SiteInitializedEvent").once(o,o.siteInitialized),o.formatSupportsIncludeGeoreferenceData.syncTransform(o.selectedFormat,function(e){return e&&"GeoTIFF"!=e&&"PDF"!=e}),o.includeGeoreferenceData.syncTransform(o.selectedFormat,function(e){return e&&"GeoTIFF"!=e&&"PDF"!=e&&o.includeGeoreferenceData.get()}),o}return __extends(t,e),t.prototype.siteInitialized=function(){var e=this;if(this.app.site&&this.app.site.essentialsMap&&this.app.site.essentialsMap.supportedExportFormats){var t=this.app.site.essentialsMap.supportedExportFormats.filter(function(t){return!(e.app.site.getEssentialsVersion()<4.03&&"pdf"===t.toLowerCase())});this.outputFormats.set(t),this.app.site.essentialsMap.exportMapImageOptions&&this.app.site.essentialsMap.exportMapImageOptions.defaultOutputFormat?this.selectedFormat.set(this.getFormatIgnoreCase(this.app.site.essentialsMap.exportMapImageOptions.defaultOutputFormat)):this.outputFormats.get().length>0?this.selectedFormat.set(this.outputFormats.getAt(0)):this.selectedFormat.set(this.app.getResource(this.libraryId,"language-export-map-none")),this.app.site.essentialsMap.exportMapImageOptions&&this.allowIncludeGeoreferenceData.set(this.app.site.essentialsMap.exportMapImageOptions.allowIncludeGeoreferenceData)}this.app.command("ShowExportMapDialog").raiseCanExecuteChanged()},t.prototype.getFormatIgnoreCase=function(e){var t=this.outputFormats.get();if(!t||t.length<=0)return null;if(e)for(var a=e.toUpperCase(),r=0;r<t.length;r++){var o=t[r];if(o&&o.toUpperCase()===a)return t[r]}return t[0]},t.prototype.exportMap=function(){var e=this;this.isExporting.set(!0);var t=this.app.site.essentialsMap;this.app.command("ScreenReaderNarrate").execute(this.app.getResource(this.libraryId,"language-export-map-is-exporting"));var a=new o.ReportParameters;a.outputFormat=this.selectedFormat.get(),a.customExtent=this.app.map.extent,a.extentType=o.ReportParameters.CURRENT_EXTENT,this.allowIncludeGeoreferenceData&&(a.includeGeoreferenceData=this.includeGeoreferenceData.get()),void 0!=this.app&&null!=this.app.map&&a.populateMapGraphicsLayers(this.app.map),t.exportMap(a,function(t){e.app.command("ScreenReaderNarrate").execute(e.app.getResource(e.libraryId,"language-export-map-complete-description")),e.isExporting.set(!1),e.url.set(t.href),e.exportComplete.set(!0)},function(t){e.app.command("Alert").execute(e.app.getResource(e.libraryId,"language-export-map-error").format(t.message)),e.app.command("ScreenReaderNarrate").execute(e.app.getResource(e.libraryId,"language-export-map-error").format(t.message)),e.isExporting.set(!1)})},t}(a.ViewModelBase);t.ExportMapViewModel=i})},"url:/Mapping/modules/ExportMap/ExportMapView.html":'<div class="exportmap">\r\n    <div class="export-create" data-binding="{@hidden: exportComplete}">\r\n        <div class="export-status" data-binding="{@visible: isExporting}">\r\n            <p data-binding="{@text: @language-export-map-is-exporting}"></p>\r\n        </div>\r\n\r\n        <div data-binding="{@hidden: isExporting}">\r\n            <label for="outputformat" data-binding="{@text: @language-export-map-select-image-format}{@visible: outputFormats}"></label>\r\n            <select id="outputformat" data-binding="{@source: outputFormats}{@value: selectedFormat}{@visible: outputFormats}">\r\n                <option data-binding="{@template-for: outputFormats}{@text: @context}{@attach: @context}"></option>\r\n            </select>\r\n\r\n            <input id="georeference" type="checkbox" data-binding="{@value: includeGeoreferenceData}{@enabled: formatSupportsIncludeGeoreferenceData}{@visible: allowIncludeGeoreferenceData}" />\r\n            <label for="georeference" class="inline" data-binding="{@text: @language-export-map-include-georeference-data}{@visible: allowIncludeGeoreferenceData}"></label>\r\n\r\n            <div class="form-btns">\r\n                <button class="export-button button" data-binding="{@event-click: handleExportMapClick}{@text: @language-export-map-create-image}"></button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="export-complete" data-binding="{@visible: exportComplete}">\r\n        <p data-binding="{@text: @language-export-map-complete-description}"></p>\r\n        <div class="form-btns">\r\n            <button class="export-button button" data-binding="{@event-click: handleViewImageClick}{@text: @language-export-map-view-image}"></button>\r\n        </div>\r\n    </div>\r\n</div>'}}),define(["Mapping/modules/ExportMap/ExportMapModule","Mapping/modules/ExportMap/ExportMapView","Mapping/modules/ExportMap/ExportMapViewModel"],function(e,t,a){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapModule",e.ExportMapModule),shim(t,"geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapView",t.ExportMapView),shim(a,"geocortex.essentialsHtmlViewer.mapping.modules.exportMap.ExportMapViewModel",a.ExportMapViewModel)});