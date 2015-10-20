dojo.declare("geocortex.demos.RightClickMenu", geocortex.framework.application.ModuleBase, {

    items: [],
    showIcons: true,
    menuId: "rightClickMenu",
    currentMapLocation: {},
    iconCssTemplate: ".{0} {{ background: url('{1}'); background-size: 16px 16px; height: 16px; width: 16px; display: block; }}",

    initialize: function (config) {

        // A menu can be configured directly in the module, or use a 'menuId' config parameter 
        // to refer to a menu configured in the "Menu" module.
        if (config && (config.menus && this.toType(config.menus) === 'array' || config.menuId)) {
            this.app.menuRegistry.loadMenus(config);
            this.menuId = config.menuId ? config.menuId : (config.menus[0].id ? config.menus[0].id : this.menuId);
            this.showIcons = typeof config.showIcons !== 'undefined' ? config.showIcons : this.showIcons;
            this.app.eventRegistry.event("MapLoadedEvent").subscribe(this, this._mapLoaded);
            this.app.eventRegistry.event("MapMouseDownEvent").subscribe(this, this._onMapMouseClick);
        }
    },
    
    _mapLoaded: function() {

        var _this = this;
        var menu = this.app.menuRegistry.getMenu(this.menuId);

        if (menu) {
            this.items = menu.items;

            var pMenu = new dijit.Menu({
                targetNodeIds:["map"]
            });

            // Passing the iterator 'i' into a function scope allows it to 
            // retain the correct value when the 'onClick' function is called
            for (var i = 0; i < this.items.length; i++) {
                (function(i) {

                    // Dijit menus only support icons added via css class.
                    if (_this.showIcons) {
                        var iconStyle = document.createElement('style');
                        var iconClass = "menuItem_icon_{0}".format(i);
                        iconStyle.type = 'text/css';
                        iconStyle.innerHTML = _this.iconCssTemplate.format(iconClass, _this.items[i].iconUri);
                        document.getElementsByTagName('head')[0].appendChild(iconStyle);
                    }

                    // Add a menu item
                    pMenu.addChild(new dijit.MenuItem({
                        label: _this.items[i].text,
                        iconClass: _this.showIcons ? iconClass : null, 

                        // This will execute when the menu item is clicked
                        onClick: function() { 

                            var parameter = null;

                            // Run batch commmands if configured
                            if (_this.items[i].batchItems && _this.toType(_this.items[i].batchItems) === 'array') {
                                for (var j = 0; j < _this.items[i].batchItems.length; j++) {
                                    parameter = null;
                                    if(_this.items[i].batchItems[j].commandParameter) {
                                        parameter = _this._resolveParameter(_this.items[i].batchItems[j].commandParameter)
                                    }
                                    _this.items[i].batchItems[j].command.execute(parameter);
                                }
                            }
                            // Or just run the configured command
                            else {
                                if (_this.items[i].commandParameter) {
                                    parameter = _this._resolveParameter(_this.items[i].commandParameter);
                                }
                                _this.items[i].command.execute(parameter);
                            }
                        }
                    }));

                })(i)
            }
            pMenu.startup();
        }
    },


    // Recursively inspect the object to be passed as a parameter, replacing 
    // the '{{context}}' token with a mapPoint representing the click location
    _resolveParameter: function(parameter) {
        if (this.toType(parameter) === 'string') {
            if (parameter === "{{context}}") {
                return this.currentMapLocation;
            } else {
                return parameter;
            }
        }
        if (this.toType(parameter) === 'object') {
            for (key in parameter) {
                if (parameter.hasOwnProperty(key)) {
                    parameter[key] = this._resolveParameter(parameter[key]);
                }
            }
            return parameter;
        } 
        return parameter;
    },

    // Save the location of the click if it is a right click.
    _onMapMouseClick: function(evt) {
        if (evt.which === 3) {
            this.currentMapLocation = evt.mapPoint;
        }
    },

    // https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    toType: function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
});

/* End Script: Modules/RightClickMenu/RightClickMenuModule.js ------------------------- */ 

geocortex.framework.notifyLibraryDownload("RightClickMenu");
