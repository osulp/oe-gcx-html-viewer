function shim(o,e,n){if("string"==typeof o&&(n=e,e=o),"undefined"==typeof n)return void console.warn("Undefined shim for: "+e);for(var t=e.split("."),i=null,r=window,u=0,m=t.length;u<m;u++)i=t[u],u==m-1?r[i]=n:r[i]||(r[i]={}),r=r[i]}require({cache:{"Mapping/modules/ZoomControl/ZoomControlModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase"],function(o,e,n){"use strict";var t=function(o){function e(){return null!==o&&o.apply(this,arguments)||this}return __extends(e,o),e}(n.ModuleBase);e.ZoomControlModule=t})},"Mapping/modules/ZoomControl/ZoomInView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(o,e,n){"use strict";var t=function(o){function e(){return null!==o&&o.apply(this,arguments)||this}return __extends(e,o),e.prototype.handleClickZoomIn=function(o,e,n){var t=this;return this.app.command("StepZoomIn").execute(),this.app.event("MapZoomEvent").once(this,function(){t.app.command("FocusOnFirstInputInView").execute(t)}),!1},e}(n.ViewBase);e.ZoomInView=t})},"Mapping/modules/ZoomControl/ZoomOutView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(o,e,n){"use strict";var t=function(o){function e(){return null!==o&&o.apply(this,arguments)||this}return __extends(e,o),e.prototype.handleClickZoomOut=function(o,e,n){var t=this;return this.app.command("StepZoomOut").execute(),this.app.event("MapZoomEvent").once(this,function(){t.app.command("FocusOnFirstInputInView").execute(t)}),!1},e}(n.ViewBase);e.ZoomOutView=t})},"url:/Mapping/modules/ZoomControl/ZoomInView.html":'<div class="zoom-control-btn">\r\n    <button class="zoom-in" data-binding="{@event-onclick: handleClickZoomIn}{title: @language-command-description-step-zoom-in}" tabindex="0"></button>\r\n</div>',"url:/Mapping/modules/ZoomControl/ZoomOutView.html":'<div class="zoom-control-btn">\r\n    <button class="zoom-out" data-binding="{@event-onclick: handleClickZoomOut}{title: @language-command-description-step-zoom-out}" tabindex="0"></button>\r\n</div>'}}),define(["Mapping/modules/ZoomControl/ZoomControlModule","Mapping/modules/ZoomControl/ZoomInView","Mapping/modules/ZoomControl/ZoomOutView"],function(o,e,n){shim(o,"geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomControlModule",o.ZoomControlModule),shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomInView",e.ZoomInView),shim(n,"geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomOutView",n.ZoomOutView)});