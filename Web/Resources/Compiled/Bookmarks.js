function shim(e,o,t){if("string"==typeof e&&(t=o,o=e),"undefined"==typeof t)return void console.warn("Undefined shim for: "+o);for(var a=o.split("."),i=null,r=window,n=0,s=a.length;n<s;n++)i=a[n],n==s-1?r[i]=t:r[i]||(r[i]={}),r=r[i]}require({cache:{"Mapping/modules/Bookmarks/AddBookmarkView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(e,o,t){"use strict";var a=function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.subscriptionToken=null,o}return __extends(o,e),o.prototype.attach=function(o){e.prototype.attach.call(this,o),this.subscriptionToken=this.app.event("ViewContainerViewClosedEvent").subscribe(this,function(e){e&&e.viewId===this.id&&this.destroyAddBookmarkView()})},o.prototype.activated=function(){this.viewModel.newBookmarkName.set(null),this.viewModel.textErrorMessage.set(null)},o.prototype.destroyAddBookmarkView=function(){this.app.viewManager.destroyView(this),this.subscriptionToken&&this.app.event("ViewContainerViewClosedEvent").unsubscribe(this.subscriptionToken)},o.prototype.handleSubmit=function(){if(this.viewModel.existsBookmarkWithName(this.viewModel.newBookmarkName.get()))return this.viewModel.textErrorMessage.set(this.app.getResource(this.libraryId,"language-bookmarks-name-exists")),!1;try{this.app.command("AddBookmark").execute(this.viewModel.newBookmarkName.get())}catch(e){return this.viewModel.textErrorMessage.set(e.message),!1}this.destroyAddBookmarkView()},o.prototype.handleCancelClick=function(e,o,t){this.destroyAddBookmarkView()},o.prototype.handleTextBoxClick=function(e,o,t){},o}(t.ViewBase);o.AddBookmarkView=a})},"Mapping/modules/Bookmarks/BookmarksModule":function(){define(["require","exports","geocortex/framework/application/ModuleBase","geocortex/infrastructure/BookmarkManager"],function(e,o,t,a){"use strict";var i=function(e){function o(o,t){var a=e.call(this,o,t)||this;return a._registerCommands(),a}return __extends(o,e),o.prototype.getStateFilter=function(){return{bookmarks:{item:this.app.project.filter.bookmark}}},o.prototype.exportState=function(){return this.app.bookmarks["export"]([a.BookmarkSource.User,a.BookmarkSource.Project]).then(function(e){return{bookmarks:e}})},o.prototype.applyState=function(e){var o=this;return this.app.bookmarks.getProjectBookmarks().then(function(e){e.forEach(function(e){return o.app.bookmarks.remove(e)})}).then(function(){return o.app.bookmarks.getUserBookmarks()}).then(function(t){e.bookmarks.filter(function(e){return!t.some(function(o){return o.name===e.name})}).forEach(function(e){o.app.bookmarks.add({name:e.name,extent:o.app.project.convert.toEsriGeometry(e.extent),source:a.BookmarkSource.Project})})})},o.prototype._registerCommands=function(){var e=this;this.app.command("AddBookmark").register(this,function(o){if(!e.isValidBookmarkName(o))throw new Error(e.app.getResource(e.libraryId,"language-bookmarks-name-required"));e._addBookmark(o)}),this.app.command("RemoveBookmark").register(this,function(o){e._deleteBookmark(o)})},o.prototype._deleteBookmark=function(e){var o=this;e&&this.app.bookmarks.remove(e)["catch"](function(e){o.app.trace.error("Error occurred while deleting bookmark: {0}".format(e))})},o.prototype._addBookmark=function(e){var o=this,t={name:e.trim(),extent:this.app.map.extent,source:a.BookmarkSource.User};this.app.bookmarks.add(t)["catch"](function(e){o.app.trace.error("Error occurred while adding bookmark: {0}".format(e))})},o.prototype.isValidBookmarkName=function(e){return"string"==typeof e&&null!==e&&""!==e.trim()},o}(t.ModuleBase);o.BookmarksModule=i})},"Mapping/modules/Bookmarks/BookmarksState":function(){define(["require","exports"],function(e,o){"use strict"})},"Mapping/modules/Bookmarks/BookmarksView":function(){define(["require","exports","geocortex/framework/ui/ViewBase"],function(e,o,t){"use strict";var a=function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.addBookMarksView=null,o.addBookmarksViewActive=!1,o}return __extends(o,e),o.prototype.activated=function(){var e=this;if("BookmarksView"===this.id&&this.viewModel.showBookmarksButton.get()&&(this.viewModel.active.set(!0),!this.app.configuration.mobileMode)){this.app.event("FlyoutActivated").publish(this);var o={view:this,onOtherInteracted:function(o){return e._onOtherInteracted(o)}};this.app.command("TapToDismiss").execute(o)}},o.prototype.deactivated=function(){"ModalWindowRegion"!==this.regionName&&(this.addBookmarksViewActive||this.addBookMarksView)&&(this.addBookMarksView&&(this.app.viewManager.destroyView(this.addBookMarksView),this.addBookMarksView=null),this.addBookmarksViewActive=!1),this.viewModel.showBookmarksButton.get()&&this.viewModel.active.set(!1)},o.prototype.deactivateBookmarksView=function(){this.app.command("DeactivateView").execute("BookmarksView"),this.app.configuration.mobileMode||this.app.event("FlyoutDeactivated").publish(this)},o.prototype.handleBookmarkSelectionChanged=function(e,o,t){if(null!==this.app.map){if(null===this.app.site||!this.app.site.isInitialized||null===this.app.site.essentialsMap)return;if(!this.app.site.essentialsMap.isInitialized||null===this.app.site.essentialsMap.initialExtent)return;this.app.map.setExtent(t.extent,!!this.app.map._fitTiledMapsToExtent)}this.deactivateBookmarksView(),this.app.command("ShowMap").execute(),this.app.command("LogOptimizerEvent").execute("SelectBookmark",t.displayName)},o.prototype.handleClickToggleBookmark=function(e,o,t){this.app.configuration.mobileMode?this.app.command("ActivateView").execute("BookmarksView"):this.app.command("ToggleView").execute("BookmarksView")},o.prototype.handleHideBookmarks=function(e,o,t){this.deactivateBookmarksView()},o.prototype.handleDeleteBookmark=function(e,o,t){this.app.command("RemoveBookmark").execute(t.displayName)},o.prototype.handleAddBookmark=function(e,o,t){this.showAddBookmarkDialog()},o.prototype.showAddBookmarkDialog=function(){var e=this;this.addBookMarksView=this.app.viewManager.createView({markupResource:"Mapping/modules/Bookmarks/AddBookmarkView.html",regionName:"ModalWindowRegion",typeName:"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.AddBookmarkView",title:this.app.getResource(this.libraryId,"language-bookmarks-add"),libraryId:this.libraryId}),this.addBookMarksView.app=this.app,this.addBookMarksView.attach(this.viewModel),this.app.viewManager.activateView(this.addBookMarksView),this.addBookmarksViewActive=!0,this.addBookMarksView&&dojo.connect(this.addBookMarksView,"destroy",function(){e.addBookmarksViewActive=!1,e.addBookMarksView=null;var o={view:e,onOtherInteracted:function(o){return e._onOtherInteracted(o)}};e.app.command("TapToDismiss").execute(o)})},o.prototype._onOtherInteracted=function(e){if(!this.addBookmarksViewActive&&this.isActive){var o=$(e.target||e.srcElement),t=o.hasClass("bookmark")&&o.hasClass("toggle-btn");t||this.deactivateBookmarksView()}},o}(t.ViewBase);o.BookmarksView=a})},"Mapping/modules/Bookmarks/BookmarksViewModel":function(){define(["require","exports","geocortex/framework/ui/ViewModelBase","geocortex/framework/observables","./BookmarkViewModel"],function(e,o,t,a,i){"use strict";var r=function(e){function o(o,t){var i=e.call(this,o,t)||this;return i.bookmarks=new a.ObservableCollection,i.textErrorMessage=new a.Observable,i.bookmarksEnabled=new a.Observable((!1)),i.showBookmarksButton=new a.Observable((!1)),i.newBookmarkName=new a.Observable,i.active=new a.Observable((!1)),i._buttonEnabled=!1,i.app=o,i.libraryId=t,i._registerCommand(),i._subscribeEvents(),i}return __extends(o,e),o.prototype.initialize=function(e){var o=this;e&&(this.bookmarksEnabled.set(!!e.bookmarksEnabled),this._buttonEnabled=!!e.showBookmarksButton,this._buttonEnabled&&(this.app.configuration.mobileMode?this.bookmarks.bind(this,function(e){o.showBookmarksButton.set("clear"!==e.type&&o.bookmarks.length()>0)}):(this.bookmarks.bind(this,function(e){o.active.get()||o.showBookmarksButton.set("clear"!==e.type&&o.bookmarks.length()>0)}),this.active.bind(this,function(e){e||o.showBookmarksButton.set(o.bookmarks.length()>0)})))),this.app.command("ShowBookmarks").raiseCanExecuteChanged(),this.app.command("ShowAddBookmark").raiseCanExecuteChanged(),this.bookmarksEnabled.get()?this._initializePromise=this._initializeBookmarks():this._initializePromise=Promise.resolve()},o.prototype._registerCommand=function(){var e=this;this.app.command("ShowBookmarks").register(this,function(){e.app.command("ActivateView").execute("BookmarksView"),e._buttonEnabled&&(e.showBookmarksButton.set(!0),e.active.set(!0))},function(){return e.bookmarksEnabled.get()}),this.app.command("ShowAddBookmark").register(this,function(){var o=e.app.viewManager.getViewById("BookmarksView");o&&o.showAddBookmarkDialog()},function(){return e.bookmarksEnabled.get()&&e._buttonEnabled})},o.prototype._subscribeEvents=function(){var e=this;this.app.event("BookmarksModifiedEvent").subscribe(this,function(o){e._initializeBookmarks()})},o.prototype._initializeBookmarks=function(){var e=this;return this.app.bookmarks.getAll().then(function(o){e.bookmarks.set(o.map(function(o){return new i.BookmarkViewModel(e.app,e.libraryId,o)}))})["catch"](function(o){return e.app.trace.error("Error occurred while retrieving the bookmark values: {0}".format(o))})},o.prototype.existsBookmarkWithName=function(e){if(e){for(var o=0;o<this.bookmarks.getLength();o++)if(this.bookmarks.getAt(o).displayName===e.trim())return!0;return!1}},o}(t.ViewModelBase);o.BookmarksViewModel=r})},"Mapping/modules/Bookmarks/BookmarkViewModel":function(){define(["require","exports","geocortex/infrastructure/BookmarkManager"],function(e,o,t){"use strict";var a=function(){function e(e,o,a){return this.defaultBookmarkName="Unspecified Bookmark Label",this.extent=null,a?(this.displayName=a.name||this.defaultBookmarkName,this.deleteBookmarkString=e.getResource(o,"language-bookmarks-delete")+" "+this.displayName,this.isUserDefined=a.source!==t.BookmarkSource.Site,this.extent=a.extent,this.extent?void 0:null):null}return e.prototype.setExtent=function(e){if(e&&e.spatialReference&&e.xmin&&e.ymin&&e.xmax&&e.ymax&&(e.spatialReference.wkid||e.spatialReference.wkt)&&(!e.spatialReference.wkid||!isNaN(parseInt(e.spatialReference.wkid,10))))if(e instanceof esri.geometry.Extent)this.extent=e;else{var o=e.spatialReference.wkid?new esri.SpatialReference(parseInt(e.spatialReference.wkid,10)):new esri.SpatialReference(e.spatialReference.wkt);this.extent=new esri.geometry.Extent(e.xmin,e.ymin,e.xmax,e.ymax,o)}},e}();o.BookmarkViewModel=a})},"url:/Mapping/modules/Bookmarks/AddBookmarkView.html":'<div class="form-modal bkmk-add-dialog"> \r\n  <form action="javascript:void(0);" data-binding="{@event-onsubmit: handleSubmit}">\r\n      <label for="BookmarkName" data-binding=" {@text: @language-bookmarks-enter-name}"></label>\r\n        <input id="BookmarkName" class="bkmk-input" type="text" data-binding="{@value: newBookmarkName}{@event-click: handleTextBoxClick}" />\r\n        <span class="form-validation" data-binding="{@visible: textErrorMessage}">\r\n            <span class="field-validation-error" data-binding="{@text: textErrorMessage}"></span>\r\n        </span>\r\n\r\n        <div class="form-btns">\r\n            <button class="button" data-binding="{@event-onclick: handleSubmit}{@text: @language-common-ok}"></button>\r\n            <button class="button" data-binding="{@event-onclick: handleCancelClick}{@text: @language-common-cancel}"></button>\r\n        </div>\r\n    </form>\r\n</div> ',"url:/Mapping/modules/Bookmarks/BookmarksButtonView.html":'<div class="bookmark-wrapper">\r\n    <div class="zoom-control-btn" data-binding="{@visible: showBookmarksButton}{@class-bkmk-active: active}">\r\n        <button class="bookmark toggle-btn" data-binding="{@event-onclick: handleClickToggleBookmark}{title: @language-bookmarks-title}" tabindex="0"></button>\r\n    </div>\r\n    <div class="bookmark-list" data-region-name="BookmarksListRegion" data-region-adapter="geocortex.framework.ui.MultiDivRegionAdapter"></div>\r\n</div>',"url:/Mapping/modules/Bookmarks/BookmarksView.html":'<div class="bkmk-container" data-binding="{@visible: bookmarksEnabled}">\r\n    <div class="bkmk-title" data-binding="{@visible: bookmarks}">\r\n        <span data-binding="{@text: @language-bookmarks-title}"></span>\r\n    </div>\r\n    <div class="bkmk-list" tabindex="-1">\r\n        <ul class="list-menu has-icon" data-binding="{@source: bookmarks}{@event-onblur: handleHideBookmarks}">\r\n            <li class="list-menu-item" data-binding="{@template-for: bookmarks}{@attach: @context}">\r\n                <button data-binding="{@visible: isUserDefined}{@event-onclick: handleDeleteBookmark}{title: deleteBookmarkString}" class="bkmk-delete">\r\n                    <img class="list-menu-icon" src="Resources/Images/Icons/delete-16.png" alt=" " />\r\n                </button>\r\n                <button class="list-menu-details" data-binding="{@text: displayName}{@event-onclick: handleBookmarkSelectionChanged}"></button>\r\n            </li>\r\n        </ul>\r\n        <ul class="list-menu has-icon bkmk-add">\r\n            <li class="list-menu-item">\r\n                <button class="bkmk-add-btn" data-binding="{@event-onclick: handleAddBookmark}{title: @language-bookmarks-add}">\r\n                    <img class="list-menu-icon" src="Resources/Images/Icons/add-16.png" alt=" " />\r\n                    <span class="list-menu-details" data-binding="{@text: @language-bookmarks-add}"></span>\r\n                </button>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n'}}),define(["Mapping/modules/Bookmarks/AddBookmarkView","Mapping/modules/Bookmarks/BookmarksModule","Mapping/modules/Bookmarks/BookmarksView","Mapping/modules/Bookmarks/BookmarksViewModel","Mapping/modules/Bookmarks/BookmarkViewModel"],function(e,o,t,a,i){shim(e,"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.AddBookmarkView",e.AddBookmarkView),shim(o,"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksModule",o.BookmarksModule),shim(t,"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksView",t.BookmarksView),shim(a,"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarksViewModel",a.BookmarksViewModel),shim(i,"geocortex.essentialsHtmlViewer.mapping.modules.bookmarks.BookmarkViewModel",i.BookmarkViewModel)});