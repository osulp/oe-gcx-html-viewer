!function(){var e="<div class='skiplinks-view' data-binding='{@var: skipLinksHtmlElement}'>    <div class='widget' data-binding='{@visible: enabled}{@widget: SkipLinksActionsWidget}{@widget-required: false}{@widget-context: resolvedWidget}' data-menu-id='SkipLinksActions' data-menu-template='Mapping/infrastructure/menus/MenuHyperlinkView.html'></div></div>";require({cache:{"Mapping/modules/SkipLinks/SkipLinksModule":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/framework/application/ModuleBase"],function(i,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(i){function t(){return null!==i&&i.apply(this,arguments)||this}return e(t,i),t.prototype.initialize=function(e){if(i.prototype.initialize.call(this,e),e&&e.menus){if(e.menus[0]&&e.menus[0].items&&e.menus[0].items.length){var t=e.menus[0].items.length;(e.menus[0].items&&e.menus[0].items[t-1]).onFocusCommand="ShowSkipLinks",e.menus[0].items[0].onFocusCommand="ShowSkipLinks"}this.app.menuRegistry.loadMenus(e)}},t}(n.ModuleBase);t.SkipLinksModule=o})},"Mapping/modules/SkipLinks/SkipLinksView":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/framework/ui/ViewBase"],function(i,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(i){function t(e,t){return i.call(this,e,t)||this}return e(t,i),t.prototype.resolveWidget=function(e,t,n){if(i.prototype.resolveWidget.call(this,e,t),0==t)return null;if(e)switch(e){case"SkipLinksActionsWidget":var o=this.app.menuRegistry.createMenuWidget(this,t,n);return this.viewModel.skipLinksHtmlElement=this.skipLinksHtmlElement,o;default:return null}},t.prototype.activated=function(){i.prototype.activated.call(this)},t}(n.ViewBase);t.SkipLinksView=o})},"Mapping/modules/SkipLinks/SkipLinksViewModel":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e[t]=i[t])};return function(i,t){function n(){this.constructor=i}e(i,t),i.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables"],function(i,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(i){function t(e,t){var n=i.call(this,e,t)||this;return n.enabled=null,n.resolvedWidget=new o.Observable(!1),n.app.waitUntilShellStabilized().then(function(){return n._handleGVHload()}),n.enabled=new o.Observable(!1),n._isModalActive=!1,n.app.commandRegistry.command("ShowSkipLinks").register(n,n._showSkipLinks,n._canExecuteShowSkipLinks),n.enabled.bind(n,function(){1==n.enabled.get()&&n._captureKeyPressAndMouseClicksAfterShowingSkipLinks()}),n.app.event("RegionActivatedEvent").subscribe(n,function(e){"ModalWindowRegion"===e.name&&(n._isModalActive=!0)}),n.app.event("RegionDeactivatedEvent").subscribe(n,function(e){"ModalWindowRegion"===e.name&&(n._isModalActive=!1)}),n}return e(t,i),t.prototype._canShowSkipLinks=function(){return!(this._isModalActive||!this.resolvedWidget||0==this.resolvedWidget.get())},t.prototype._canExecuteShowSkipLinks=function(){return this._canShowSkipLinks()},t.prototype._showSkipLinks=function(){0==this.enabled.get()&&this.enabled.set(!0)},t.prototype._handleGVHload=function(){var e=this;this.resolvedWidget.set(!0);var i=function(i){return e._interceptTabsAfterGVHLoad(i)};$(document).off("keydown.skiplinks",i),$(document).off("mousedown.skiplinks",i),$(document).on("keydown.skiplinks",i),$(document).on("mousedown.skiplinks",i)},t.prototype._interceptTabsAfterGVHLoad=function(e){if(this._canShowSkipLinks){if(9===(e.keyCode||e.which)){var i=document.activeElement;if("TEXTAREA"===i.nodeName||"INPUT"===i.nodeName||"A"===i.nodeName||"BUTTON"===i.nodeName||"SELECT"===i.nodeName);else{var t=$(this.skipLinksHtmlElement).find("button");t&&t.length>0&&t[0].focus(),e.preventDefault()}}$(document).off("mousedown.skiplinks"),$(document).off("keydown.skiplinks")}},t.prototype._captureKeyPressAndMouseClicksAfterShowingSkipLinks=function(){var e=this,i=function(i){return e._interceptAfterShowingSkipLinks(i)};$(document).off("keyup.skiplinks",i),$(document).off("mouseup.skiplinks",i),$(document).on("keyup.skiplinks",i),$(document).on("mouseup.skiplinks",i)},t.prototype._interceptAfterShowingSkipLinks=function(e){if(this._canShowSkipLinks){var i=e.keyCode||e.which;13===i||0===i||1===i||2===i||4===i?(this.enabled.set(!1),$(document).off("keyup.skiplinks"),$(document).off("mouseup.skiplinks")):9===i&&(this.skipLinksHtmlElement.contains(document.activeElement)||this.skipLinksHtmlElement===document.activeElement||(this.enabled.set(!1),$(document).off("keyup.skiplinks"),$(document).off("mouseup.skiplinks")))}},t}(n.ViewModelBase);t.SkipLinksViewModel=s})},"url:/Mapping/modules/SkipLinks/SkipLinksView.html":e}}),require(["geocortex/framework/resourceManager"],function(i){i.resourceManager.register("Mapping","inv","Mapping/modules/SkipLinks/CSS/common.css","css","LnNraXBsaW5rcy12aWV3IHsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBtYXJnaW46IDA7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHRvcDogMDsNCiAgICBsZWZ0OiAwOw0KICAgIHotaW5kZXg6IDkwMDsNCiAgICB0cmFuc2l0aW9uOiBtYXJnaW4gMC4zczsNCn0NCi5za2lwbGlua3MtdmlldyAud2lkZ2V0LmJvdW5kLWludmlzaWJsZSB7DQogICAgbWFyZ2luLXRvcDogLTNlbTsNCiAgICB0cmFuc2l0aW9uOiBtYXJnaW4gMC4zczsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCi5za2lwbGlua3MtdmlldyAud2lkZ2V0LmJvdW5kLXZpc2libGUgew0KICAgIG1hcmdpbi10b3A6IDA7DQogICAgdHJhbnNpdGlvbjogbWFyZ2luIDAuM3M7DQp9DQouc2tpcGxpbmtzLXZpZXcgLmxpc3QtbWVudSB7DQogICAgbWFyZ2luOiAwOw0KICAgIHBhZGRpbmc6IDA7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KfQ0KLnNraXBsaW5rcy12aWV3IC5saXN0LW1lbnUtaXRlbSB7DQogICAgbWFyZ2luOiAwOw0KICAgIHBhZGRpbmc6IDA7DQogICAgYm9yZGVyLWNvbG9yOiAjRkZGRkZGOw0KfQ0KLnNraXBsaW5rcy12aWV3IC5saXN0LW1lbnUtYnV0dG9uIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUE3MkM0Ow0KICAgIGNvbG9yOiAjRkZGRkZGOw0KICAgIHBhZGRpbmc6IDAuNWVtIDFlbTsNCiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQouc2tpcGxpbmtzLXZpZXcgLmxpc3QtbWVudS1pdGVtOmZpcnN0LWNoaWxkIC5saXN0LW1lbnUtYnV0dG9uIHsNCiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwLjI1cmVtOw0KfQ0KLnNraXBsaW5rcy12aWV3IC5saXN0LW1lbnUtaXRlbTpsYXN0LWNoaWxkIC5saXN0LW1lbnUtYnV0dG9uIHsNCiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMC4yNXJlbTsNCn0NCi5za2lwbGlua3MtdmlldyAubGlzdC1tZW51LWJ1dHRvbjpob3ZlciwNCi5za2lwbGlua3MtdmlldyAubGlzdC1tZW51LWJ1dHRvbjpmb2N1cywNCi5rZXlib2FyZC1mb2N1cy1hY3RpdmUgLnNraXBsaW5rcy12aWV3IC5saXN0LW1lbnUtYnV0dG9uOmZvY3VzIHsNCiAgICBib3JkZXItY29sb3I6ICMxQTcyQzQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCiAgICBjb2xvcjogIzFBNzJDNDsNCn0="),i.resourceManager.register("Mapping","inv","Mapping/modules/SkipLinks/SkipLinksView.html","html",e)})}();