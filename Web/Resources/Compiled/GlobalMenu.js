function shim(e,n,i){if("string"==typeof e&&(i=n,n=e),"undefined"==typeof i)return void console.warn("Undefined shim for: "+n);for(var l=n.split("."),t=null,o=window,u=0,a=l.length;u<a;u++)t=l[u],u==a-1?o[t]=i:o[t]||(o[t]={}),o=o[t]}require({cache:{"Mapping/modules/GlobalMenu/GlobalMenuModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase"],function(e,n,i){"use strict";var l=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return __extends(n,e),n.prototype.initialize=function(n){e.prototype.initialize.call(this,n),n&&n.menus&&this.app.menuRegistry.loadMenus(n)},n}(i.ModuleBase);n.GlobalMenuModule=l})},"Mapping/modules/GlobalMenu/GlobalMenuView":function(){define(["require","exports","geocortex/infrastructure/menus/MenuView"],function(e,n,i){"use strict";var l=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return __extends(n,e),n.prototype.handleMenuItemClick=function(n,i,l){this.deactivateIWTM(),e.prototype.handleMenuItemClick.call(this,n,i,l)},n.prototype.deactivateIWTM=function(){this.app.command("DeactivateView").execute("IWantToMenuView")},n}(i.MenuView);n.GlobalMenuView=l})},"Mapping/modules/GlobalMenu/GlobalMenuViewModel":function(){define(["require","exports","geocortex/infrastructure/menus/MenuViewModel","geocortex/framework/observables"],function(e,n,i,l){"use strict";var t=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.mobileMode=new l.Observable((!1)),n}return __extends(n,e),n.prototype.initialize=function(n){e.prototype.initialize.call(this,n),this.mobileMode.set(!!this.app.configuration.mobileMode)},n}(i.MenuViewModel);n.GlobalMenuViewModel=t})},"url:/Mapping/modules/GlobalMenu/GlobalMenuView.html":'<ul class="list-menu global-menu has-icon" data-binding="{@visible: visibleMenuItems}{@source: visibleMenuItems}">\r\n    <li class="list-menu-item" data-binding="{@template-for: visibleMenuItems}{@enabled: canExecute}">\r\n        <button class="global-menu-details" data-binding="{@event-onclick: handleMenuItemClick}{title: description}">\r\n            <img class="list-menu-icon" data-binding="{src: iconUri}{@visible: iconUri}{alt: description}" />\r\n            <strong class="list-menu-name" data-binding="{@text: text}{@hidden: mobileMode}"></strong>\r\n        </button>\r\n    </li>\r\n</ul>'}}),define(["Mapping/modules/GlobalMenu/GlobalMenuModule","Mapping/modules/GlobalMenu/GlobalMenuView","Mapping/modules/GlobalMenu/GlobalMenuViewModel"],function(e,n,i){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuModule",e.GlobalMenuModule),shim(n,"geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuView",n.GlobalMenuView),shim(i,"geocortex.essentialsHtmlViewer.mapping.modules.GlobalMenu.GlobalMenuViewModel",i.GlobalMenuViewModel)});