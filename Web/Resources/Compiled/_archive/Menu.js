!function(){function e(e,n,t){if("string"==typeof e&&(t=n,n=e),void 0!==t)for(var o=n.split("."),i=null,r=window,u=0,l=o.length;u<l;u++)i=o[u],u==l-1?r[i]=t:r[i]||(r[i]={}),r=r[i];else console.warn("Undefined shim for: "+n)}require({cache:{"Mapping/modules/Menu/MenuModule":function(){var e=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])};return function(n,t){function o(){this.constructor=n}e(n,t),n.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}}();define(["require","exports","geocortex/framework/application/ModuleBase"],function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return e(t,n),t.prototype.initialize=function(e){n.prototype.initialize.call(this,e),this.app.menuRegistry.loadMenus(e)},t}(o.ModuleBase);t.MenuModule=i})}}}),require({cache:{}}),define(["Mapping/modules/Menu/MenuModule"],function(n){e(n,"geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule",n.MenuModule)})}();