dojo.declare("latitudeDemos.featureTooltipsModule", geocortex.framework.application.ModuleBase, {

    jsonConfig: {},
    layerConfigs: {},
    fieldConfigs: {},

    pup: null,              // This is the popup box, represented by a div    
    identifier: "pup",      // Name of ID and class of the popup box
    minMargin: 15,          // Set how much space there should be (in pixels) between the popup and everything else (borders, mouse)
    default_width: 125,    
    move: false,            // Is the popup currently being repositioned?
    show: false,
    default_color: "#777",
    message: null,


    initialize: function (config) {

        this.jsonConfig = config;
        this.app.eventRegistry.event("SiteServiceLayersLoadedEvent").subscribe(this, this.layersLoaded);
        this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, this.initializeSite);

        // Prepare popup and define the mouseover callback
        $(document).ready(function () {
            // create default popup on the page.    
            $('body').append('<div id="' + this.identifier + '" class="' + this.identifier + '" style="position:abolute; display:none; z-index:200;"></div>');
            this.pup = $('#' + this.identifier);
            // set dynamic coords when the mouse moves
            $(document).mousemove(function (evt) {
                if (this.move) {
                    this._setElementPos(evt.pageX, evt.pageY);
                }                
            }.bind(this));
        }.bind(this));
    },


    // Store the maptip configuration for each configured layer in layerConfigs[], to be accessed later.
    initializeSite: function () {

        var i, j, layerJson, fieldJson, mapservice;

        // looking for a 'layers' object containing maptip configuration
        if (this.jsonConfig.hasOwnProperty("layers")) {
            for (i = this.jsonConfig.layers.length - 1; i >= 0; i--) {
                // Config for a single layer
                layerJson = this.jsonConfig.layers[i];
                // Each layer has name and maptip configuration
                if (layerJson.hasOwnProperty("name") && layerJson.hasOwnProperty("maptip")) {
                    // Loop through mapservices, looking for the configured item
                    for (j = this.app.site.essentialsMap.mapServices.length - 1; j >= 0; j--) {
                        mapservice = this.app.site.essentialsMap.mapServices[j];
                        // These map tips are only applicable to featurelayers, as the data needs to be present on the client
                        // Checking draw behavior is more reliable than checking mapserviceType, as this will be set to "Dynamic" for featurelayers from mapservices
                        if (mapservice.drawingBehavior === "FeatureLayer") { 
                            if (mapservice.layers[0].name === layerJson.name) {
                                // Store the maptip configuration
                                this.layerConfigs[mapservice._serviceLayer.id] = {};
                                this.layerConfigs[mapservice._serviceLayer.id].maptip = layerJson.maptip;
                                // If a background color is set, store this as well.
                                if (layerJson.hasOwnProperty("color")) {
                                    this.layerConfigs[mapservice._serviceLayer.id].color = layerJson.color;
                                }
                                // And custom widths
                                if (layerJson.hasOwnProperty("width")) {
                                    this.layerConfigs[mapservice._serviceLayer.id].width = layerJson.width;
                                }
                            }
                        }
                    }
                }
            }
        }
        // If a field is configured with a field type, store it
        // Currently only used to fix date fields with type = "Date".
        // Note that coded domains can be resolved by enabling the GCX Service Enhancement Proxy 
        // and binding FIELDNAME.Name() in the maptip config.
        if (this.jsonConfig.hasOwnProperty("fields")) {
            for (i = this.jsonConfig.fields.length - 1; i >= 0; i--) {
                fieldJson = this.jsonConfig.fields[i];
                this.fieldConfigs[fieldJson.name] = {};
                this.fieldConfigs[fieldJson.name].fieldtype = fieldJson.fieldtype;
            }
        }
    },


    // Hook up the 'mouse-over' event handler to the appropriate layers
    layersLoaded: function () {

        var i, esriLayer;

        for (i = this.app.site.essentialsMap.mapServices.length - 1; i >= 0; i--) {
            if (this.app.site.essentialsMap.mapServices[i].drawingBehavior === "FeatureLayer") {
                esriLayer = this.app.site.essentialsMap.mapServices[i]._serviceLayer;
                if (esriLayer !== null) {
                    if (this.layerConfigs[esriLayer.id] !== 'undefined') {
                        esriLayer.on("mouse-over", this.displayPopup.bind(this));
                    }
                }
            }
        }
    },


    // Mouse over event handler.
    // Sets the appropriate content for the feature and displays the popup.
    displayPopup: function (evt) {

        var maptip, attributes, content, p_config, id;

        id = evt.graphic.getLayer().id;
        maptip = unescape(this.layerConfigs[id].maptip);
        attributes =  this.resolveFields(evt.graphic.attributes);
        content = esri.substitute(attributes, maptip);

        p_config = {};
        
        if (this.layerConfigs[id].hasOwnProperty("color")) {           
            p_config['background-color'] =  this.layerConfigs[id].color;
        } 

        if (this.layerConfigs[id].hasOwnProperty("width")) {           
            p_config['width'] =  this.layerConfigs[id].width;
        } 
            
        this._popup(content, p_config);
    },


    // Special handling for user defined field types. 
    // Currently only used to fix date fields, as otherwise they display as seconds since the epoch.
    resolveFields: function (attributes) {

        var resolved, field, date;

        resolved = $.extend({}, attributes); // Shallow copy. Can't alter the original attributes as it causes issues

        for (field in resolved) {
            if (this.fieldConfigs.hasOwnProperty(field)) {
                if (this.fieldConfigs[field].fieldtype === "Date") {
                    date = new Date(0); //set the date to the epoch in local time (js default)
                    date.setUTCMilliseconds(resolved[field]); //add UTC milliseconds to time, result is in local time
                    resolved[field] = date;
                }
            }
        }

        return resolved;
    },


    // The following is based on original 'nhpup' code from http://www.nicolashoening.de/?twocents&nr=8

    // Write message, show popup w/ custom width and other properties if necessary,
    // make sure it disappears on mouseout
    _popup: function (p_msg, p_config) {

        var target;

        // store message globally so that the correct one always displays 
        this.message = p_msg;

        // do track mouse moves and update position
        this.move = true;
        this.show = true;

        // restore defaults
        this.pup.removeClass()
                .addClass(this.identifier)
                .width(this.default_width)
                .css('background-color', this.default_color);

        // Custom configuration. A custom css class, width, and background color are supported here
        // although only the background color is currently configurable.
        if (p_config !== 'undefined') {
            if (p_config.hasOwnProperty('class')) {
                this.pup.addClass(p_config['class']);
            }
            if (p_config.hasOwnProperty('width')) {
                this.pup.width(p_config['width']);
            }
            if (p_config.hasOwnProperty('background-color')) {
                this.pup.css('background-color', p_config['background-color']);
            }
        }

        // Write content and display
        setTimeout(function () {
            if (this.show === true) {
                this.pup.html(this.message).show(); // show the current message                       
                this.move = false;  // just move once to an appropriate label position, and then stop.
            }
        }.bind(this), 500);

        // Make sure popup goes away on mouse out and we stop the constant 
        // positioning on mouse moves.
        target = this._getTarget(this.displayPopup.caller.arguments[0]);

        $(target).unbind('mouseout').bind('mouseout', function (evt) {
            this.pup.hide();
            this.move = false;
            this.show = false;
        }.bind(this));
    },


    // set the target element position
    _setElementPos: function (x, y) {
        // Call nudge to avoid edge overflow. Important tweak: x+10, because if
        //  the popup is where the mouse is, the hoverOver/hoverOut events flicker
        var x_y = this._nudge(x + 10, y);
        // remember: the popup is still hidden
        this.pup.css('top', x_y[1] + 'px')
                .css('left', x_y[0] + 'px');
    },


    // Avoid edge overflow
    _nudge: function (x, y) {

        var win, xtreme;

        win = $(window);
        // When the mouse is too far on the right, put window to the left
        xtreme = $(document).scrollLeft() + win.width() - this.pup.width() - this.minMargin;
        if (x > xtreme) {
            x -= this.pup.width() + 2 * this.minMargin;
        }
        x = this._max(x, 0);
        // When the mouse is too far down, move window up
        if ((y + this.pup.height()) > (win.height() + $(document).scrollTop())) {
            y -= this.pup.height() + this.minMargin;
        }

        return [ x, y ];
    },

    // custom max
    _max: function (a, b) {

        if (a > b) {
            return a;
        } else {
            return b;
        }
    },


    // Get the target (element) of an event.
    // Inspired by quirksmode
    _getTarget: function(e) {

        var target;   

        if (!e) {
            e = window.event;
        }
        if (e.target) {
            target = e.target; 
        }
        else if (e.srcElement) {
            target = e.srcElement;
        }
        // defeat Safari bug
        if (target.nodeType === 3) { 
            target = target.parentNode;
        }

        return target;
    }
});

/* End Script: Modules/GeocortexCustom/FastMapTipModule.js ------------------------- */ 

geocortex.framework.notifyLibraryDownload("FeatureTooltips");
