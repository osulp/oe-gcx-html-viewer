!function(){function e(e,t,n){if("string"==typeof e&&(n=t,t=e),void 0!==n)for(var o=t.split("."),i=null,r=window,a=0,s=o.length;a<s;a++)i=o[a],a==s-1?r[i]=n:r[i]||(r[i]={}),r=r[i];else console.warn("Undefined shim for: "+t)}var t="<div class='home-panel' data-binding='{@widget: GetHTMLContent}{@widget-context: content}' tabindex='0'></div>";require({cache:{"Mapping/modules/Info/InfoModule":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define(["require","exports","geocortex/framework/application/ModuleBase"],function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n}(o.ModuleBase);n.InfoModule=i})},"Mapping/modules/Info/InfoView":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define(["require","exports","geocortex/framework/ui/ViewBase","geocortex/infrastructure/FeatureDescriptionPresenterView"],function(t,n,o,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.attach=function(e){if(t.prototype.attach.call(this,e),null!==this.viewModel.content.get())this._activateHomePanel();else var n=this.app.eventRegistry.event("HomePanelContentInitializedEvent").subscribe(this,function(){this._activateHomePanel(),this.app.eventRegistry.event("HomePanelContentInitializedEvent").unsubscribe(n)})},n.prototype._registerCommands=function(){this.app.commandRegistry.command("ShowHomePanel").register(this,this._executeActivateHomePanel,this._canExecuteActivateHomePanel),this.app.commandRegistry.command("ActivateHomePanel").register(this,this._executeActivateHomePanel,this._canExecuteActivateHomePanel),this.app.commandRegistry.command("HideHomePanel").register(this,this._executeDeactivateHomePanel)},n.prototype._canExecuteActivateHomePanel=function(){return this.viewModel.included.get()},n.prototype._executeActivateHomePanel=function(){this.app.commandRegistry.command("ActivateView").execute(this.id)},n.prototype._executeDeactivateHomePanel=function(){this.app.commandRegistry.command("DeactivateView").execute(this.id)},n.prototype._activateHomePanel=function(){this.viewModel.included.get()&&this.title.set(this.viewModel.title.get()),this._registerCommands()},n.prototype.resolveWidget=function(e,n){if(t.prototype.resolveWidget.call(this,e,n),"GetHTMLContent"===e){var o=new i.FeatureDescriptionPresenterView(this.app,this.libraryId);return o.root=document.createElement("div"),o.root.className="content",o.root.innerHTML=o.insertLinkAndImageBindings(n),o.attach(null),o}},n}(o.ViewBase);n.InfoView=r})},"Mapping/modules/Info/InfoViewModel":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables"],function(t,n,o,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(t){function n(e,n){var o=t.call(this,e,n)||this;return o.included=null,o.content=null,o.title=null,o.content=new i.Observable(null),o.title=new i.Observable,o.included=new i.Observable(!1),o}return e(n,t),n.prototype.initialize=function(e){t.prototype.initialize.call(this,e),e&&(e.hasOwnProperty("included")&&this.included.set(e.included),e.hasOwnProperty("title")&&this.title.set(e.title),e.hasOwnProperty("content")&&(this.content.set(decodeURIComponent(e.content)),this.app.eventRegistry.event("HomePanelContentInitializedEvent").publish()))},n}(o.ViewModelBase);n.InfoViewModel=r})},"url:/Mapping/modules/Info/InfoView.html":t}}),require(["geocortex/framework/resourceManager"],function(e){e.resourceManager.register("Mapping","inv","Mapping/modules/Info/CSS/common.css","css","LmhvbWUtcGFuZWwNCnsNCiAgICBwYWRkaW5nOiA4cHg7DQp9DQoNCiAgICAuaG9tZS1wYW5lbCB0ZA0KICAgIHsNCiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDsNCiAgICB9"),e.resourceManager.register("Mapping","inv","Mapping/modules/Info/CSS/small.css","css","LnNjcmVlbi1yZWdpb24gLkhvbWVQYW5lbENvbnRhaW5lclZpZXcgew0KICAgIHRvcDogMHB4Ow0KICAgIGJvdHRvbTogMHB4Ow0KICAgIGxlZnQ6IDBweDsNCiAgICByaWdodDogMHB4Ow0KICAgIGhlaWdodDogMTAwJTsNCiAgICB3aWR0aDogMTAwJTsNCn0="),e.resourceManager.register("Mapping","inv","Mapping/modules/Info/InfoView.html","html",t)}),require({cache:{}}),define(["Mapping/modules/Info/InfoModule","Mapping/modules/Info/InfoView","Mapping/modules/Info/InfoViewModel"],function(t,n,o){e(t,"geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoModule",t.InfoModule),e(n,"geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoView",n.InfoView),e(o,"geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoViewModel",o.InfoViewModel)})}();