function shim(e,l,t){if("string"==typeof e&&(t=l,l=e),"undefined"==typeof t)return void console.warn("Undefined shim for: "+l);for(var n=l.split("."),a=null,i=window,r=0,s=n.length;r<s;r++)a=n[r],r==s-1?i[a]=t:i[a]||(i[a]={}),i=i[a]}require({cache:{"Mapping/modules/LayerSelector/LayerSelectorModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase"],function(e,l,t){"use strict";var n=function(e){function l(){return null!==e&&e.apply(this,arguments)||this}return __extends(l,e),l}(t.ModuleBase);l.LayerSelectorModule=n})},"url:/Mapping/modules/LayerSelector/LayerSelectorView.html":'<ul class="layer-selector-buttons">\r\n    <li><button class="button layer-actions-button" data-binding="{@text: selectAllButtonText}{title: selectAllButtonTitle}{@event-onclick: selectAllLayers}"></button></li>\r\n    <li><button class="button layer-actions-button" data-binding="{@text: clearAllButtonText}{title: clearAllButtonTitle}{@event-onclick: clearAllLayers}"></button></li>\r\n</ul>\r\n<div class="layer-list">\r\n    <div class="identify-layers" data-binding="{@source: items}{@template: Mapping/modules/LayerSelector/Templates/LayerSelectorItemTemplate.html}"></div>\r\n</div>\r\n',"url:/Mapping/modules/LayerSelector/Templates/LayerSelectorItemTemplate.html":'<ul class="layers" data-binding="{@template-for: items}">\r\n    <li class="layer">\r\n        <div class="layer-item-expander" data-binding="{@visible: isFolder}">\r\n            <button class="tree-expander" data-binding="{@class-expanded: isExpanded}{@noclass-collapsed: isExpanded}{@event-onclick: handleExpanderClick}{title: expanderTooltip}"></button>\r\n        </div>\r\n        <div class="layer-info">\r\n            <div class="layer-contents">\r\n                <span class="layer-item-ctrl" data-binding="{@hidden: isFolder}">\r\n                    <input type="checkbox" data-binding="{@value: isEnabled}{checked: isEnabled}{title: stateToggleTooltip}" />\r\n                </span>\r\n                <span class="layer-item-ctrl layer-list-layer-icon" data-binding="{@visible: iconUri}"><img data-binding="{alt: iconTooltip}{src: iconUri}" /></span>\r\n                <span class="display-name" data-binding="{@text: name}"></span>\r\n            </div>\r\n        </div>\r\n        <ul class="layers" data-binding="{@visible: isExpanded}{@source: items}{@template: Mapping/modules/LayerSelector/Templates/LayerSelectorItemTemplate.html}"></ul>\r\n    </li>\r\n</ul>\r\n'}}),define(["Mapping/modules/LayerSelector/LayerSelectorModule"],function(e){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.layerSelector.LayerSelectorModule",e.LayerSelectorModule)});