function shim(e,t,r){if("string"==typeof e&&(r=t,t=e),"undefined"==typeof r)return void console.warn("Undefined shim for: "+t);for(var n=t.split("."),i=null,o=window,s=0,a=n.length;s<a;s++)i=n[s],s==a-1?o[i]=r:o[i]||(o[i]={}),o=o[i]}require({cache:{"Mapping/modules/Reporting/ListReportsView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(e,t,r){"use strict";var n=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.app.command("ListReports").postExecute.subscribe(n,function(){n.app.viewManager.activateView(n)}),n.app.command("RunFeatureReport").postExecute.subscribe(n,function(){n.app.viewManager.activateView(n)}),n.app.command("RunFeaturesReport").postExecute.subscribe(n,function(){n.app.viewManager.activateView(n)}),n}return __extends(t,e),t.prototype.handleClickReport=function(e,t,r){this.viewModel.engageReport(r)},t}(r.ViewBase);t.ListReportsView=n})},"Mapping/modules/Reporting/ListReportsViewModel":function(){define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables","geocortex/infrastructure/Reporting"],function(e,t,r,n,i){"use strict";var o=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.features=new n.ObservableCollection,t.availableReportListings=new n.ObservableCollection,t}return __extends(t,e),t.prototype.initialize=function(t){void 0===t&&(t={}),e.prototype.initialize.apply(this,arguments),this.warnUserWhenReportExcludesFeatures="warnUserWhenReportExcludesFeatures"in t&&t.warnUserWhenReportExcludesFeatures,this.app.command("ListReports").register(this,this._executeListReports,this._canExecuteListReports),this.app.command("RunFeatureReport").register(this,this._executeListReports,this._canExecuteListReports),this.app.command("RunFeaturesReport").register(this,this._executeListReports,this._canExecuteListReports)},t.prototype._executeListReports=function(e){var t=this,r=i.getAllFeaturesFromReportable(e);this.features.set(r),this.availableReportListings.set(this._getVisibleReportsFromFeatures(r).map(function(e){var n=r.filter(function(t){return!t||!t.layer||!t.layer.mapService||t.layer.mapService.id!==e.layer.mapService.id||t.layer.id!==e.layer.id}),i=t.features.get().filter(function(e){return n.indexOf(e)===-1}),o={report:e,displayName:e.displayName,description:e.description,excludedFeatures:n,includedFeatures:i,details:t.getResource("language-list-reports-details").format(i.length,r.length),isMoreThanOneFeatureSelected:t.features.getLength()>1};return o}))},t.prototype._canExecuteListReports=function(e){var t=i.getAllFeaturesFromReportable(e),r=this._getVisibleReportsFromFeatures(t);return r.length>0},t.prototype._getVisibleReportsFromFeatures=function(e){var t=[];e.forEach(function(e){e.layer&&t.indexOf(e.layer)===-1&&t.push(e.layer)});var r=[];return t.forEach(function(e){e.reports&&e.reports.forEach(function(e){r.indexOf(e)===-1&&e.visible&&r.push(e)})}),r},t.prototype.engageReport=function(e){var t=this,r=e.report,n=e.excludedFeatures,i=e.includedFeatures,o={report:r,reportable:i};this.warnUserWhenReportExcludesFeatures&&n.length>0?this.app.command("Confirm").execute(this.getResource("language-list-reports-exclusion-warning-message").format(r.displayName,n.length,this.features.getLength(),i.length),this.getResource("language-list-reports-exclusion-warning-title"),function(e){e&&t.app.command("RunReport").execute(o)}):this.app.command("RunReport").execute(o)},t}(r.ViewModelBase);t.ListReportsViewModel=o})},"Mapping/modules/Reporting/ReportingModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase"],function(e,t,r){"use strict";var n=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(r.ModuleBase);t.ReportingModule=n})},"Mapping/modules/Reporting/RunReportView":function(){define(["require","exports","geocortex/framework/ui/ViewBase","geocortex/infrastructure/commandArgs/AddStatusArgs"],function(e,t,r,n){"use strict";var i=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.app.command("RunReport").preExecute.subscribe(n,n._displayReportProgressUI),n.app.event("ReportResultEvent").subscribe(n,n._handleReportResultUI),n.app.event("ReportErrorEvent").subscribe(n,n._handleReportErrorUI),n}return __extends(t,e),t.prototype.handleClickDoneButton=function(){this.app.viewManager.deactivateView(this)},t.prototype._displayReportProgressUI=function(e){this.isBusy.set(!0),this.app.viewManager.activateView(this);var t=new n.AddStatusArgs(this.getResource("language-run-report-progress-status").format(e.report.displayName||e.report.id));t.id="RunningReport",t.imageProperties={uri:"Resources/Images/Icons/Toolbar/reports-24.png",altText:this.getResource("language-run-report-progress-image-alt")},t.showBusyIcon=!0,t.timeoutMS=0,this.app.command("AddStatus").execute(t)},t.prototype._cleanupReportProgressUI=function(){this.isBusy.set(!1),this.app.command("RemoveStatus").execute("RunningReport")},t.prototype._handleReportResultUI=function(e){this._cleanupReportProgressUI(),this.isBusy.set(!1),this.app.viewManager.activateView(this)},t.prototype._handleReportErrorUI=function(e){this.isBusy.set(!1),this.app.viewManager.deactivateView(this);var t,r=this.getResource("language-run-report-error-title");t="ReportAlreadyRunning"===e.name?this.getResource("language-run-report-error-message-already-running"):"RequestTimeoutError"===e.name?this.getResource("language-run-report-error-message-timeout"):"OfflineReportImpossible"===e.name?this.getResource("language-run-report-error-message-offline"):/outputFormat parameter invalid/.test(e.message)?this.getResource("language-run-report-error-message-output-format-unavailable"):this.getResource("language-run-report-error-message-generic"),"ReportAlreadyRunning"!==e.name&&this._cleanupReportProgressUI(),this.app.command("Alert").execute(t,r)},t}(r.ViewBase);t.RunReportView=i})},"Mapping/modules/Reporting/RunReportViewModel":function(){define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables","geocortex/essentials/ReportParameters","geocortex/infrastructure/Reporting"],function(e,t,r,n,i,o){"use strict";var s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.complete=new n.Observable((!1)),t.isAsync=new n.Observable((!1)),t.href=new n.Observable(""),t.downloadTag=new n.Observable((!0)),t}return __extends(t,e),t.prototype.initialize=function(t){void 0===t&&(t={}),e.prototype.initialize.apply(this,arguments),this.app.command("RunReport").register(this,this._executeRunReport)},t.prototype._executeRunReport=function(e){var t=this;if(e)try{this.complete.set(!1),e.reportParameters=e.reportParameters||new i.ReportParameters,e.reportParameters.featureIds=[],e.reportParameters.outputFormat=e.reportParameters.outputFormat||"PDF";var r=e.report.supportedOutputFormats.some(function(t){return t.toLowerCase()===e.reportParameters.outputFormat.toLowerCase()});if(!r){var n=e.report.supportedOutputFormats.length?e.report.supportedOutputFormats[0]:null;if(!n){var s=new Error("Selected report has no available output formats configured.");throw s.name="ReportHasNoSupportedOutputFormats",s}e.reportParameters.outputFormat=n}if(o.getAllFeaturesFromReportable(e.reportable).forEach(function(t){var r=t.getPrimaryKeyValue();r&&e.reportParameters.featureIds.push(r)}),this.app.isNative.get()&&(this.downloadTag.set(!1),this.app.isOffline.get())){var s=new Error("Reports cannot be run while offline.");throw s.name="OfflineReportImpossible",s}null!=e.report.layer&&null!=e.report.layer.mapService&&this.app.event("ReportStartedEvent").publish(e.report.id,e.report.layer.mapService.id,e.report.layer.id),e.report.run(null,e.reportParameters,function(e){t.isAsync.set(e.isAsync),t.href.set(e.href),t.complete.set(!0),t.app.event("ReportResultEvent").publish(e)},function(e){t.app.event("ReportErrorEvent").publish(e)})}catch(s){this.app.event("ReportErrorEvent").publish(s)}},t}(r.ViewModelBase);t.RunReportViewModel=s})},"url:/Mapping/modules/Reporting/ListReportsView.html":'<div class="list-reports-view">\r\n\r\n    <div class="list-reports-header" tabindex="0">\r\n        <p data-binding="{@text: @language-list-reports-explanation}"></p>\r\n    </div>\r\n\r\n    <ul class="list-of-reports" data-binding="{@source: availableReportListings}">\r\n        <li data-binding="{@template-for: availableReportListings}">\r\n            <button class="list-of-reports-link" data-binding="{@event-onclick: handleClickReport}">\r\n                <strong class="list-of-reports-link-title" data-binding="{@text: displayName}"></strong>\r\n                <span class="list-of-reports-link-description" data-binding="{@text: description}"></span>\r\n                <span class="list-of-reports-link-details" data-binding="{@visible: isMoreThanOneFeatureSelected}{@text: details}"></span>\r\n            </button>\r\n        </li>\r\n    </ul>\r\n\r\n</div>',"url:/Mapping/modules/Reporting/RunReportView.html":'<div class="run-report-view">\r\n\r\n    <!-- Report is in progress. -->\r\n    <div class="run-report-progress" data-binding="{@hidden: complete}">\r\n\r\n        <!-- Sync report. -->\r\n        <div data-binding="{@hidden: isAsync}">\r\n            <h2 data-binding="{@text: @language-run-report-progress-heading-sync}"></h2>\r\n            <p data-binding="{@text: @language-run-report-progress-message-sync}"></p>\r\n        </div>\r\n\r\n        <!-- Async report. -->\r\n        <div data-binding="{@visible: isAsync}">\r\n            <h2 data-binding="{@text: @language-run-report-progress-heading-async}"></h2>\r\n            <p data-binding="{@text: @language-run-report-progress-message-async}"></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Report is complete. -->\r\n    <div class="run-report-complete" data-binding="{@visible: complete}">\r\n\r\n        <!-- Sync report: direct link to download file. -->\r\n        <div data-binding="{@hidden: isAsync}">\r\n            <h2 data-binding="{@text: @language-run-report-complete-heading-sync}"></h2>\r\n            <a class="run-report-complete-link" data-binding="{@visible: downloadTag}{href: href}{@text: @language-run-report-complete-link-sync}" href="" target="_blank" download></a>\r\n            <!-- Browser in GMAF cannot handle the download nor the target tahs. The download tag disables the download fir all  platforms, target breaks iOS. Therefore, in GMAF, they are removed. -->\r\n            <a class="run-report-complete-link" data-binding="{@hidden: downloadTag}{href: href}{@text: @language-run-report-complete-link-sync}" href=""></a>\r\n        </div>\r\n\r\n        <!-- Async report: embedded print job iframe. -->\r\n        <div data-binding="{@visible: isAsync}">\r\n            <h2 data-binding="{@text: @language-run-report-complete-heading-async}"></h2>\r\n            <a class="run-report-complete-link" data-binding="{href: href}{@text: @language-run-report-complete-link-async}" href="" target="_blank"></a>\r\n        </div>\r\n\r\n        <button class="run-report-complete-done-button" data-binding="{@text: @language-run-report-complete-done-button}{@event-onclick: handleClickDoneButton}"></button>\r\n    </div>\r\n</div>'}}),define(["Mapping/modules/Reporting/ListReportsView","Mapping/modules/Reporting/ListReportsViewModel","Mapping/modules/Reporting/ReportingModule","Mapping/modules/Reporting/RunReportView","Mapping/modules/Reporting/RunReportViewModel"],function(e,t,r,n,i){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.reporting.ListReportsView",e.ListReportsView),shim(t,"geocortex.essentialsHtmlViewer.mapping.modules.reporting.ListReportsViewModel",t.ListReportsViewModel),shim(r,"geocortex.essentialsHtmlViewer.mapping.modules.reporting.ReportingModule",r.ReportingModule),shim(n,"geocortex.essentialsHtmlViewer.mapping.modules.reporting.RunReportView",n.RunReportView),shim(i,"geocortex.essentialsHtmlViewer.mapping.modules.reporting.RunReportViewModel",i.RunReportViewModel)});