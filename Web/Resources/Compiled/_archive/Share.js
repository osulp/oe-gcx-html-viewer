!function(){function e(e,t,r){if("string"==typeof e&&(r=t,t=e),void 0!==r)for(var o=t.split("."),n=null,i=window,a=0,s=o.length;a<s;a++)n=o[a],a==s-1?i[n]=r:i[n]||(i[n]={}),i=i[n];else console.warn("Undefined shim for: "+t)}var t="<div class='social-media-share'>    <div class='list-menu active has-icon' data-binding='{@source: shareOptions}{@visible: shareOptions}'>        <div data-binding='{@template-for: shareOptions}'>            <a href='javascript:void(0)' data-binding='{@event-click: handleClick}' target='_blank'>                <div class='list-menu-item'>                    <img class='list-menu-icon' data-binding='{@visible: icon}{src: iconUri}' alt=' ' />                    <div class='list-menu-details'>                        <strong class='list-menu-name' data-binding='{@text: displayName}'></strong>                    </div>                </div>            </a>        </div>    </div></div>";require({cache:{"Mapping/modules/Share/ShareModule":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();define(["require","exports","geocortex/framework/application/ModuleBase","geocortex/framework/observables"],function(t,r,o,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=function(t){function r(e,r){var o=t.call(this,e,r)||this;return o.shareOptions={},o._urlToken="{ViewerUrl}",o}return e(r,t),r.prototype.initialize=function(e){var t=this;e.shareOptions&&e.shareOptions.forEach(function(e,r,o){if(e){var i=e.displayName,a=e.url,s=e.iconUri,p=e.id;i&&a&&s&&p&&(t.shareOptions[p]={displayName:new n.Observable(i),url:new n.Observable(a),iconUri:new n.Observable(s)})}}),this._registerCommands()},r.prototype._registerCommands=function(){var e=this;this.app.commandRegistry.command("ShareOn").register(this,function(t){var r=e.shareOptions[t];if(r){var o=e.app.getResource(e.libraryId,"language-share-share-on-prompt-content").format(r.displayName.get()),n=e.app.getResource(e.libraryId,"language-share-share-on-prompt-title").format(r.displayName.get());e.app.commandRegistry.command("Confirm").execute(o,n,function(r){r&&e._openUrl(e.shareOptions[t].url.get())})}},function(t){return!!e.shareOptions[t]}),this.app.commandRegistry.command("GetShareOptions").register(this,this._getShareOptions)},r.prototype._getShareOptions=function(e){e(this.shareOptions)},r.prototype._openUrl=function(e){var t=this;this.app.commandRegistry.command("HandleGenerateSharingLink").execute(function(r){r=encodeURIComponent(r);var o=e.replace(t._urlToken,r);o&&o.toLowerCase().startsWith("mailto")&&t.app.configuration.mobileMode?window.open(o,"_top"):window.open(o,"_blank")})},r}(o.ModuleBase);r.ShareModule=i})},"Mapping/modules/Share/ShareView":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();define(["require","exports","geocortex/framework/ui/ViewBase"],function(t,r,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(t){function r(e,r){var o=t.call(this,e,r)||this;return o.urlToken="{ViewerUrl}",o}return e(r,t),r.prototype.attach=function(e){var r=this;t.prototype.attach.call(this,e),this.app.commandRegistry.command("ShowShareView").register(this,function(){r.app.viewManager.activateView(r)},function(){return!!r.viewModel&&!!r.viewModel.shareOptions.get()&&r.viewModel.shareOptions.get().length>0})},r.prototype.handleClick=function(e,t,r){var o=this;return this.app.commandRegistry.command("HandleGenerateSharingLink").execute(function(e){e=encodeURIComponent(e),t.href=r.url.get().replace(o.urlToken,e)}),!0},r}(o.ViewBase);r.ShareView=n})},"Mapping/modules/Share/ShareViewModel":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();define(["require","exports","geocortex/framework/observables","geocortex/framework/ui/ViewModelBase"],function(t,r,o,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=function(t){function r(e,r){var n=t.call(this,e,r)||this;return n.shareOptions=new o.ObservableCollection,n}return e(r,t),r.prototype.initialize=function(e){var t=this,r=[];e.shareOptionIds&&e.shareOptionIds.hasOwnProperty("length")&&(r=e.shareOptionIds),this.app.commandRegistry.command("GetShareOptions").execute(function(e){t._populateShareOptions(e,r)})},r.prototype._populateShareOptions=function(e,t){var r=this;if(0===t.length){t=[];for(var o in e)t.push(o)}t.forEach(function(t){var o=e[t];o&&r.shareOptions.addItem(o)})},r}(n.ViewModelBase);r.ShareViewModel=i})},"url:/Mapping/modules/Share/ShareView.html":t}}),require(["geocortex/framework/resourceManager"],function(e){e.resourceManager.register("Mapping","inv","Mapping/modules/Share/CSS/common.css","css","LnNvY2lhbC1tZWRpYS1wYWdlcyB7DQogICAgZGlzcGxheTogdGFibGUtY2VsbDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgcGFkZGluZzogMWVtOw0KfQ=="),e.resourceManager.register("Mapping","inv","Mapping/modules/Share/ShareView.html","html",t)}),require({cache:{}}),define(["Mapping/modules/Share/ShareModule","Mapping/modules/Share/ShareView","Mapping/modules/Share/ShareViewModel"],function(t,r,o){e(t,"geocortex.essentialsHtmlViewer.mapping.modules.share.ShareModule",t.ShareModule),e(r,"geocortex.essentialsHtmlViewer.mapping.modules.share.ShareView",r.ShareView),e(o,"geocortex.essentialsHtmlViewer.mapping.modules.share.ShareViewModel",o.ShareViewModel)})}();