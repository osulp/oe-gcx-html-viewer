/*
	
	Copyright (c) 2016, Latitude Geographics Group Ltd.
	All rights reserved.
	       
	Redistribution is not permitted. 
	
	Use in binary form, without modification, is permitted provided that neither 
	the name of the organization nor the names of its contributors may be used 
	to endorse or promote products derived from this software without specific 
	prior written permission.
	       
	THIS SOFTWARE IS PROVIDED BY COPYRIGHT HOLDER ''AS IS'' AND ANY
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL LATITUDE GEOGRAPHICS GROUP LTD. BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/* Begin Script: Framework/framework_ts_out.js ------------------------- */ 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var behaviors;
        (function (behaviors) {
            var Behavior = (function () {
                /**
                 * Creates a new Behavior - a collection of commands that are run sequentially.
                 * @param app The framework Application.
                 * @param name The name that can be used to reference the behavior.
                 * @param commands The array of commands to be run when the behavior is executed.
                 */
                function Behavior(app, name, commands, event) {
                    this.app = app;
                    this.name = name;
                    this.event = event;
                    this.commands = commands || [];
                    // Set up 
                    this._wireUpEvent();
                }
                /**
                 * Runs the behavior on demand. Reccomanded when events and commands parameters don't match nicely.
                 * @param args A common parameter that will be accepted by all commands executed by the behavior.
                 */
                Behavior.prototype.run = function (args) {
                    this._executeCommands(args);
                };
                /**
                 * Associates the behavior with an event if there is one present.
                 */
                Behavior.prototype._wireUpEvent = function () {
                    var _this = this;
                    // Link up the event if there is an event provided.
                    if (this.event) {
                        this.eventToken = this.app.event(this.event).subscribe(this, function (args) { _this._executeCommands(args); });
                    }
                };
                /**
                 * Executes all of the commands associated with this behavior.
                 * @param args A common parameter that will be accepted by all commands executed by the behavior.
                 */
                Behavior.prototype._executeCommands = function (args) {
                    for (var i = 0; this.commands && i < this.commands.length; i++) {
                        this.app.command(this.commands[i]).execute(args);
                    }
                };
                /**
                 * Used to clear any associoated events and to dismiss the commands.
                 */
                Behavior.prototype.destroy = function () {
                    if (this.event) {
                        this.app.event(this.event).unsubscribe(this.eventToken);
                    }
                    this.commands = null;
                };
                return Behavior;
            }());
            behaviors.Behavior = Behavior;
        })(behaviors = framework.behaviors || (framework.behaviors = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var behaviors;
        (function (behaviors) {
            var BehaviorRegistry = (function () {
                /*
                 * Creates the behavior registry.
                 */
                function BehaviorRegistry(app) {
                    /**
                     * Collection of {@link Behavior}s that are stored within the registry.
                     */
                    this.behaviors = {};
                    /**
                     * Empty behavior to be returned whenever a request for an invalid behavior is made.
                     */
                    this.dummyBehavior = new behaviors.Behavior(null, null, null);
                    this.app = app;
                }
                /**
                 * Loads a collection of behaviors from config.
                 * Behaviors are stored in a 'behaviors' object, which stores a collection of arrays of commands.
                 * Returns an array of the behavior names so that the module can remove them from the registry when it is destroyed.
                 * @param scope The scope of the calling function - used to ensure that behaviors are only loaded from modules.
                 * @param config The configuration for the associated module.
                 */
                BehaviorRegistry.prototype.loadBehaviorsFromConfig = function (scope, config) {
                    var behaviorNames = [];
                    if (!(scope instanceof framework.application.ModuleBase)) {
                        this.app.trace.warning("Attempted to add behaviors to registry outside of ModuleBase. Behaviors from " + scope.id + " not added.");
                        return behaviorNames;
                    }
                    if (config && config.behaviors) {
                        for (var i = 0; i < config.behaviors.length; i++) {
                            var currentBehavior = config.behaviors[i];
                            behaviorNames.push(currentBehavior.name);
                            this.addBehavior(currentBehavior.name, currentBehavior.commands, currentBehavior.event);
                        }
                    }
                    return behaviorNames;
                };
                /**
                 * Used to add a new behavior to the registry.
                 * @param name The name used to access the behavior in the registry.
                 * @param commands An array of commands that define the behavior's actions.
                 * @param event An (optional) event that can  will trigger the behavior.
                 */
                BehaviorRegistry.prototype.addBehavior = function (name, commands, event) {
                    if (!commands) {
                        this.app.trace.debug("Behavior " + name + " does not possess an array of command IDs. Not added to registry.");
                        return;
                    }
                    if (this.behaviors[name]) {
                        this.app.trace.warning("Behavior " + name + " is already present in registry.");
                    }
                    if (!name) {
                        this.app.trace.warning("Attempted to add a nameless Behavior to the registry.");
                    }
                    var newBehavior = new behaviors.Behavior(this.app, name, commands, event);
                    this.behaviors[name] = newBehavior;
                };
                /**
                 * Used to remove a behavior from the registry.
                 * Also unsubscribes the behavior from its event and clears run commands.
                 * @param name The name used to access the behavior in the registry.
                 */
                BehaviorRegistry.prototype.remove = function (name) {
                    if (!this.behaviors[name]) {
                        this.app.trace.debug("Attempted to remove behavior not in found in registry.");
                        return false;
                    }
                    var behavior = this.behaviors[name];
                    delete this.behaviors[name];
                    behavior.destroy();
                    return true;
                };
                /**
                 * Used to retreive a stored behavior from the registry. If the behavior does not exist then
                 * a dummy behavior is returned.
                 * @param name The name of the behavior to be retrieved.
                 */
                BehaviorRegistry.prototype.behavior = function (name) {
                    var behavior = null;
                    if (this.behaviors[name] !== undefined) {
                        behavior = this.behaviors[name];
                    }
                    else {
                        // Create a dummy behavior that will do nothing. If we don't return an empty behavior then calls to .run cause an error.
                        behavior = this.dummyBehavior;
                        this.app.trace.debug("Could not find Behavior named " + name + " in the Behavior Registry.");
                    }
                    return behavior;
                };
                return BehaviorRegistry;
            }());
            behaviors.BehaviorRegistry = BehaviorRegistry;
        })(behaviors = framework.behaviors || (framework.behaviors = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="commands/TypedCommand.ts" />
/// <reference path="events/TypedEvent.ts" />
/// <reference path="application/Application.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var FrameworkObject = (function () {
            function FrameworkObject(app, libraryId) {
                this.dojoConnects = [];
                this.observableBindings = [];
                this.eventSubscriptions = [];
                this.commandHandlers = [];
                this.app = app;
                this.libraryId = libraryId;
            }
            /**
            * Binds a handler to an {@link Observable} or to a dojo.connect.
            * Binding to an {@link Observable}:
            *```
            *   this.auto(someObservable, function (newValue) { });
            *
            * with explicit scope:
            *
            *   this.auto(someObservable, this, function (newValue) { });
            *```
            * Alternately, pass an event name as a string to use dojo.connect:
            *```
            *   this.auto(window, "onclick", function () { });
            *```
            * @param arg0 Either an {@link Observable} (for observable bindings) or a regular object (if arg1 is a string)
            * @param arg1 If arg0 is an {@link Observable}, a function or scope object. Otherwise, an event name (to use with dojo.connect).
            * @param arg2 If arg0 is an {@link Observable}, a function handler.
            */
            FrameworkObject.prototype.auto = function (arg0, arg1, arg2) {
                // Three usage scenarios here.
                // dojo.connect, e.g.: auto(window, "onclick", function () { });
                if (arguments.length === 3 && typeof arg1 === "string") {
                    this.dojoConnects.push(dojo.connect(arg0, arg1, arg2));
                }
                else if (arguments.length === 2 && arg1 instanceof Function) {
                    var token = arg0.bind(arg0, arg1);
                    this.observableBindings.push({ obj: arg0, token: token });
                }
                else if (arguments.length === 3 && arg2 instanceof Function) {
                    var token = arg0.bind(arg1, arg2);
                    this.observableBindings.push({ obj: arg0, token: token });
                }
            };
            /**
             * Tracks a subscription to an {@link geocortex.framework.events.Event}, disposing it when this object is disposed with the destroy method.
             */
            FrameworkObject.prototype.trackSubscription = function (event, token) {
                this.eventSubscriptions.push({ event: event, token: token });
            };
            /**
             * Tracks a subscription to an {@link geocortex.framework.commands.Command}, disposing it when this object is disposed with the destroy method.
             */
            FrameworkObject.prototype.trackCommandHandler = function (command, token) {
                this.commandHandlers.push({ command: command, token: token });
            };
            /**
             * Override or attach to provide custom clean-up behaviour.
             */
            FrameworkObject.prototype.onDestroy = function () {
            };
            /**
             * Disposes any bindings tracked by this object.
             */
            FrameworkObject.prototype.destroy = function () {
                // Clean up tracked dojo connects.
                for (var i = 0; i < this.dojoConnects.length; ++i) {
                    dojo.disconnect(this.dojoConnects[i]);
                }
                this.dojoConnects = [];
                // Remove tracked Observable bindings.
                for (var i = 0; i < this.observableBindings.length; ++i) {
                    var obj = this.observableBindings[i]["obj"];
                    var token = this.observableBindings[i]["token"];
                    obj.unbind(token);
                }
                this.observableBindings = [];
                // Remove event subscriptions.
                for (var i = 0; i < this.eventSubscriptions.length; ++i) {
                    var event = this.eventSubscriptions[i]["event"];
                    var token = this.eventSubscriptions[i]["token"];
                    event.unsubscribe(token);
                }
                this.eventSubscriptions = [];
                // Remove command handlers.
                for (var i = 0; i < this.commandHandlers.length; ++i) {
                    var command = this.commandHandlers[i]["command"];
                    var token = this.commandHandlers[i]["token"];
                    command.unregister(token);
                }
                this.commandHandlers = [];
                // Invoke any custom clean-up.
                this.onDestroy();
            };
            /**
             * Gets a language resource from the Application's resource dictionary, given a key, and optional locale.
             * Returns `null` if the resource does not exist.
             * @param key The resource key.
             * @param locale The locale of the resource to fetch. Defaults to the current application locale.
             */
            FrameworkObject.prototype.getResource = function (resourceKey, locale) {
                return this.app.getResource(this.libraryId, resourceKey, locale);
            };
            return FrameworkObject;
        }());
        framework.FrameworkObject = FrameworkObject;
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var events;
        (function (events) {
            var CollectionChangedArgs = (function () {
                function CollectionChangedArgs() {
                    /** Sender of this event collection changed argument object. */
                    this.sender = null;
                    /**
                     * Type of collection operation this argument object represents.
                     * One of:
                     * - "append"
                     * - "insert"
                     * - "remove"
                     * - "clear"
                     * - "set"
                     */
                    this.type = "append";
                    /** The beginning of the range that this operation represents.*/
                    this.rangeStart = 0;
                    /** The end of the range that this operation represents. */
                    this.rangeEnd = 0;
                }
                return CollectionChangedArgs;
            }());
            events.CollectionChangedArgs = CollectionChangedArgs;
        })(events = framework.events || (framework.events = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/**
 * Formats a string given a format string and subsequent comma-separated list of params. Example:
 *   `"Hello my name is {0}. My age is {1}.".format(name, age);`
 * You can also format dates. Example:
 *   `"DATE '{0:yyyy-MM-dd HH:mm:ss}'".format(new Date(2014, 04, 06, 14, 04, 30, 500));` // <-- "DATE '2014-05-06 14:04:30'"
 * To include literal '{' and '}' characters in the output, they must be escaped by doubling up the character. Example:
 *   `"Hello my name is {0}. My age is {{1}}.".format("Bob", 40);` // <-- "Hello my name is Bob. My age is {1}."
 */
if (!String.prototype.format) {
    // All the different format strings for dates
    var dateFormats = "d{1,4}|f{1,7}|F{1,7}|g{1,2}|h{1,2}|H{1,2}|K|m{1,2}|M{1,4}|s{1,2}|t{1,2}|y{1,5}|z{1,3}|:|\\/"; // Not supported: "string" and %
    var uberDateRegexPattern = "(" + dateFormats + "|[^" + dateFormats + "])"; // Anything other than one of the format patterns is itself a valid token
    var uberDateRegex = new RegExp(uberDateRegexPattern, "g");
    var openBraceTempToken = "\u0000MAGIC\u0000";
    String.prototype.format = function () {
        var args = arguments;
        // Temporarily replace escaped opening braces with a magic value, so they aren't interpretted
        // as part of a format placeholder.
        var formatted = this.replace(/{{/g, openBraceTempToken);
        formatted = formatted.replace(/{(\d+)(?::([^}]*))?}/g, function (match, index, format) {
            // Normal/simple case where there is no formatter specified
            var unformatted = args[index];
            if (!format || !(unformatted instanceof Date)) {
                return unformatted;
            }
            // It's a date, and we have a date format.
            // Format the date according to the specified format.
            var date = unformatted;
            var formatSpecifiers = format.match(uberDateRegex); // result will be something like ["yyyy", "-", "MM", "-", "dd"]
            var result = [];
            for (var i = 0; i < formatSpecifiers.length; i++) {
                var formatSpecifier = formatSpecifiers[i]; // e.g. "yyyy"
                // Look up the formatter based on the format specified
                var formatter = geocortex.framework.utils.DateFormatters[formatSpecifier];
                // If we don't have a conversion function, then just use the literal characters (could be something like "-", or a word like "DATE")
                if (!formatter) {
                    result.push(formatSpecifier);
                    continue;
                }
                // Convert from a specifier like "yyyy" to an actual value like "1980"
                var formattedToken = formatter.call(this, date);
                result.push(formattedToken);
            }
            var finalResult = result.join("");
            return finalResult;
        });
        return formatted.replace(new RegExp(openBraceTempToken, "g"), "{").replace(/}}/g, "}");
    };
}
;
/**
 * Formats a string given a format string and subsequent comma-separated list of params. Example:
 *   "Hello my name is {0}. My age is {1}.".format(name, age);
 */
String.format = function (formatStr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return formatStr.format.apply(formatStr, args);
};
/**
 * Returns a quick hash code given a particular string.
 */
String.quickHashCode = function (str) {
    // SECURITY: If you change this function at all, you MUST recompute the hash codes use in `checkList` in `ConfigurationLoader.ts`!
    // See GVH-10084.
    var hash = 0, i, chr;
    if (str.length == 0) {
        return hash;
    }
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
/**
 * Escapes common HTML characters.
 * @param htmlStr A string possibly containing HTML elements to be stripped out.
 */
String.escapeHtml = function (htmlStr) {
    if (htmlStr === null || htmlStr === undefined) {
        return htmlStr;
    }
    return htmlStr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
};
/**
 * Decodes HTML-encoded entities within a string back into plain characters.
 * This is the inverse operation of escapeHtml.
 * @param input A string possibly containing HTML entities to decode.
 */
String.unescapeHtml = function (input) {
    if (input === null || input === undefined) {
        return input;
    }
    return input
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, "/");
};
// TODO: Document
String.escapeHtmlEncode = function (htmlStr) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(htmlStr));
    return div.innerHTML;
};
/**
 * Checks whether a given string is null or has 0 length.
 * @param str The string to check.
 */
String.isNullOrEmpty = function (str) {
    return (typeof (str) === "undefined" || str === null || str.length === 0);
};
/**
 * Trims whitespace off of both ends of a string.
 */
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};
/**
 * Trims whitespace off of the left of a string.
 */
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
};
/**
 * Trims whitespace off of the right of a string.
 */
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
};
/**
 * Checks whether a string starts with another string.
 * @param str The characters to be searched for at the start of this string.
 * @param position The position in this string at which to begin searching for searchString; defaults to 0.
 */
String.prototype.startsWith = function (str, position) {
    position = position || 0;
    return this.indexOf(str, position) === position;
};
/**
 * Checks whether a string ends with another string.
 * @param str The characters to be searched for at the end of this string.
 * @param position Search within this string as if this string were only this long; defaults to this string's actual length, clamped within the range established by this string's length.
 */
String.prototype.endsWith = function (str, position) {
    position = position || this.length;
    position = position - str.length;
    var lastIndex = this.lastIndexOf(str);
    return lastIndex !== -1 && lastIndex === position;
};
/// <reference path="String.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            utils.base64keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";
            function isDefined(value) {
                return typeof value === "undefined" ? false : true;
            }
            utils.isDefined = isDefined;
            function isNullOrUndefined(value) {
                return value === null || !isDefined(value);
            }
            utils.isNullOrUndefined = isNullOrUndefined;
            /**
             * Makes a relative URL absolute.
             * @param url The URL to make absolute.
             */
            function makeUrlAbsolute(url) {
                // Does the URL start with http or https? If so, it's already absolute.
                if (url.indexOf("http") === 0) {
                    return url;
                }
                var appPath = "{0}//{1}{2}".format(window.location.protocol, window.location.host, window.location.pathname);
                // Add a trailing slash to the app path before we try to glue things onto it.
                if (appPath.charAt(appPath.length - 1) != "/" || appPath.charAt(appPath.length - 1) != "\\") {
                    // Remove the file portion
                    var pathPieces = appPath.split("/");
                    --pathPieces.length;
                    appPath = pathPieces.join("/");
                    appPath = appPath + "/";
                }
                // If the URL starts with a slash, it is relative to the root of the server.
                if (url.charAt(0) === "/" || url.charAt(0) === "\\") {
                    url = (window.location.protocol + "//" + window.location.host + "/" + url.substring(1));
                }
                else {
                    url = appPath + url;
                }
                return url;
            }
            utils.makeUrlAbsolute = makeUrlAbsolute;
            /**
             * Generates a random alphanumeric token, given a length.
             * @param length The length of the token to generate. If no length is provided, a default length of 8 characters is used.
             */
            function alphaNumericToken(length) {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var stringLength = length || 8;
                var randomstring = "";
                for (var i = 0; i < stringLength; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }
                return randomstring;
            }
            utils.alphaNumericToken = alphaNumericToken;
            /**
             * Base-64 encodes a chunk of UTF-8 data.
             * @param input The text input to encode.
             */
            function base64Encode(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = this.utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        this.base64keyStr.charAt(enc1) + this.base64keyStr.charAt(enc2) +
                        this.base64keyStr.charAt(enc3) + this.base64keyStr.charAt(enc4);
                }
                return output;
            }
            utils.base64Encode = base64Encode;
            /**
             * Decodes a Base-64 string.
             * @param input The text input to decode.
             */
            function base64Decode(input) {
                var output = "";
                // No input, blank output
                if (!input || input === "") {
                    return output;
                }
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    throw new Error("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do {
                    enc1 = this.base64keyStr.indexOf(input.charAt(i++));
                    enc2 = this.base64keyStr.indexOf(input.charAt(i++));
                    enc3 = this.base64keyStr.indexOf(input.charAt(i++));
                    enc4 = this.base64keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    chr1 = chr2 = chr3 = null;
                    enc1 = enc2 = enc3 = enc4 = null;
                } while (i < input.length);
                output = this.utf8Decode(output);
                return output;
            }
            utils.base64Decode = base64Decode;
            /**
             * Encodes a string into its UTF-8 representation.
             * @param s The string to encode.
             */
            function utf8Encode(s) {
                s = s.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < s.length; n++) {
                    var c = s.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            }
            utils.utf8Encode = utf8Encode;
            /**
             * Decodes a UTF-8 value into its string representation.
             * @param s The string to decode.
             */
            function utf8Decode(input) {
                var string = "";
                var i = 0;
                var c = 0;
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;
                while (i < input.length) {
                    c = input.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        c2 = input.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = input.charCodeAt(i + 1);
                        c3 = input.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
            utils.utf8Decode = utf8Decode;
            /**
             * Checks whether the supplied string represents a URL.
             * @param value The value to check.
             */
            function isUrl(value) {
                if (!value || typeof value !== "string") {
                    return false;
                }
                // Does the URL start with http or https?
                var valueTrimmed = value.trim().toLowerCase();
                if (valueTrimmed.length >= 7 && valueTrimmed.indexOf("http://") === 0) {
                    return true;
                }
                if (valueTrimmed.length >= 8 && valueTrimmed.indexOf("https://") === 0) {
                    return true;
                }
                return false;
            }
            utils.isUrl = isUrl;
            /**
             * Returns true if a value is a percentage value, false otherwise.
             * @param value The value being evaluated.
             */
            function isPercentage(value) {
                if (isNullOrUndefined(value)) {
                    return false;
                }
                return /^(\d+|\d*[.]\d+)%$/.test(value);
            }
            utils.isPercentage = isPercentage;
            /**
             * Restricts a value to be within a specified range.
             * @param value The value to clamp
             * @param min The minimum value. If value is less than min, min will be returned
             * @param max The maximum value. If value is greater than max, max will be returned
             */
            function clamp(value, min, max) {
                if (value < min) {
                    return min;
                }
                else if (value > max) {
                    return max;
                }
                return value;
            }
            utils.clamp = clamp;
            /**
             * Add an event listener to an object.
             * @param obj The object to add the event listener to.
             * @param type The type of event to listen for.
             * @param listener The object that receives a notification when an event occurs.
             */
            function addEventListener(obj, type, listener) {
                // IE 8 doesn't support addEventListener, use attachEvent instead
                if (obj.addEventListener) {
                    obj.addEventListener(type, listener, false);
                }
                else if (obj.attachEvent) {
                    obj.attachEvent("on" + type, listener);
                }
            }
            utils.addEventListener = addEventListener;
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../FrameworkObject.ts" />
/// <reference path="../utils/utils.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var events;
        (function (events) {
            /**
             * Defines an event subscription.
             */
            var EventSubscription = (function () {
                /**
                 * @param handler
                 * @param scope
                 */
                function EventSubscription(handler, scope) {
                    this.handler = handler;
                    this.scope = scope;
                    /**
                     * Flag indicates the event should only dispatch once for this subscription before
                     * being removed.
                     */
                    this.once = false;
                }
                return EventSubscription;
            }());
            /**
             * Represents a named event which can have multiple subscriptions. Subscriptions are functions that are executed and
             * passed event args when an event is raised.
             */
            var Event = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.events.Event} class.
                 * @param {String} name The name of this event.
                 * @param app The {@link framework.application.Application} that this event belongs to.
                 */
                function Event(name, app) {
                    /** The {@link geocortex.framework.application.Application} that this event instance belongs to. Set to null for private/internal events. */
                    this.app = null;
                    /** Is this event currently being published? This flag can be used to prevent unwanted recursive behaviour. */
                    this.isPublishing = false;
                    /** Map of subscription tokens to subscription implementations.  */
                    this.subscriptions = {};
                    this.name = name;
                    this.app = app;
                }
                /**
                 * Gets a subscription handler given a subscription token.
                 * @param token The subscription token to get the subscription for.
                 */
                Event.prototype.getSubscriptionHandlerByToken = function (token) {
                    if (this.subscriptions.hasOwnProperty(token)) {
                        return this.subscriptions[token].handler;
                    }
                    return null;
                };
                /**
                 * Subscribes an event handler to this event, returning a subscription token which can later be used
                 * to unsubscribe the handler from this event.
                 * @param scope The scope for which to execute the handler in. It will become "this" inside of the handler when fired.
                 * @param handler The handler function to execute.
                 */
                Event.prototype.subscribe = function (scope, handler) {
                    if (handler === null || handler === undefined) {
                        throw new Error("Event handler cannot be null or undefined");
                    }
                    var token;
                    do {
                        // Ensure that token is unique.
                        // Note: We may want to hard limit attempts here in case our token method breaks. We don't want to look forever.
                        token = geocortex.framework.utils.alphaNumericToken();
                    } while (this.getSubscriptionHandlerByToken[token]);
                    var subscription = new EventSubscription(handler, scope);
                    this.subscriptions[token] = subscription;
                    // If this being registered by a framework object? If so, track it so it can be cleaned up automatically.
                    if (scope && scope instanceof geocortex.framework.FrameworkObject) {
                        scope.trackSubscription(this, token);
                    }
                    return token;
                };
                /**
                 * Subscribes an event handler for a *single* publishing of this event, returning a subscription token which can later be used
                 * to unsubscribe the handler from this event.
                 * @param scope The scope for which to execute the handler in. It will become "this" inside of the handler when fired.
                 * @param handler The handler function to execute.
                 */
                Event.prototype.once = function (scope, handler) {
                    var token = this.subscribe(scope, handler);
                    this.subscriptions[token].once = true;
                    return token;
                };
                /**
                 * Unsubscribes a handler from this event, given its token.
                 * @param token The subscription token previously obtained by subscribing to this event.
                 */
                Event.prototype.unsubscribe = function (token) {
                    if (!this.subscriptions.hasOwnProperty(token)) {
                        return false;
                    }
                    delete this.subscriptions[token];
                    return true;
                };
                /**
                 * Removes all registered handlers from this event.
                 */
                Event.prototype.clear = function () {
                    this.subscriptions = {};
                };
                /**
                 * Raises this event, sequentially executing every registered handler.
                 * @param parameters Parameters to pass to each handler.
                 */
                Event.prototype.publish = function () {
                    var parameters = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        parameters[_i - 0] = arguments[_i];
                    }
                    // Log public events only. Private/internal events have the app set to null.
                    if (this.app && !!this.app.debugMode) {
                        // ... console debug not supported in IE 8-9
                        var msg = "Event '{0}' published.".format(this.name);
                        if (console.debug) {
                            console.debug(msg);
                        }
                        else {
                            console.log(msg);
                        }
                    }
                    this.isPublishing = true;
                    for (var sub in this.subscriptions) {
                        if (!this.subscriptions.hasOwnProperty(sub)) {
                            continue;
                        }
                        var subscription = this.subscriptions[sub];
                        subscription.handler.apply(subscription.scope, arguments);
                        if (subscription.once) {
                            delete this.subscriptions[sub];
                        }
                    }
                    this.isPublishing = false;
                };
                return Event;
            }());
            events.Event = Event;
        })(events = framework.events || (framework.events = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="events/Event.ts" />
// Note: While these two objects are very similar, they are implemented seperately for performance reasons, primarily
// due to the large volume of them and the amount of time spent in the observable constructor.
/**
 * An {@link Observable} wraps a value that is modified using a call to {@link set}() and fetched with a call to {@link get}().
 * An {@link Observable} has an internal binding event that is raised when set() is called.
 *
 * This mechanism allows interested parties to receive notifications when a particular value changes, and this pattern is
 * used by the HTML5 framework to allow construction of data-bound applications that respond automatically
 * to data as it changes.
 *
 * @docs-hide-from-nav
 */
var Observable = (function () {
    /**
     * Constructs a new instance of the {@link Observable}, wrapping the given value.
     *
     *     var property = new Observable("hello");
     *
     * @param value The initial value of the {@link Observable}.
     */
    function Observable(value) {
        /** @private The binding event that is fired. Made private in docs because we may wish to lazily allocate it
          * in the near future. */
        this.bindingEvent = new geocortex.framework.events.Event("__anonymous");
        this._syncToken = null;
        this._syncSource = null;
        this.value = value;
    }
    /**
     * Sets the value of the {@link Observable}, raising the binding event and notifying any subscribers of the new value.
     * Set() should always be used to modify {@link Observable} values.
     *
     *     var property = new Observable("hello");
     *
     *     // Updates the value and fires the binding event.
     *     property.set("hello world");
     *
     *     // Alerts "hello world"
     *     alert(property.get());
     *
     * @param value The new value to set the Observable to.
     */
    Observable.prototype.set = function (value) {
        this.value = value;
        this.bindingEvent.publish(value);
    };
    /**
     * Returns the value of the {@link Observable}. Get should always be used to fetch the value of an {@link Observable}.
     *
     *     var property = new Observable("hello");
     *
     *     // Alerts "hello"
     *     alert(property.get());
     */
    Observable.prototype.get = function () {
        return this.value;
    };
    Observable.prototype.equals = function (other) {
        var otherValue = other;
        if (other && other.get && typeof other.get === "function") {
            otherValue = other.get();
        }
        if (this.value instanceof Array && otherValue instanceof Array) {
            if (this.value.length !== otherValue.length) {
                return false;
            }
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] !== otherValue[i]) {
                    return false;
                }
            }
            // GVH-8186 Observable class - error in equals() method
            return true;
        }
        return (this.get() === otherValue);
    };
    /** @private Hidden in docs since it's kind of magic (read: dangerous). */
    Observable.makeBindableProxy = function (obj) {
        if (!obj) {
            return null;
        }
        var refs = [];
        var _this = this;
        // If this thing has already been cloned, return the clone. We do not want multiple clones of the same object.
        if (obj["___clonedObject"]) {
            return obj["___clonedObject"];
        }
        // Function
        var functionReplacement = function () {
            throw new Error("Can't make method calls on a bindable proxy.");
        };
        // Walk the object graph, making things Observable where appropriate.
        var rewrite = function (name, node, parent) {
            // Don't traverse cyclic structures!
            for (var i = 0; i < refs.length; ++i) {
                if (node === refs[i]) {
                    return refs[i];
                }
            }
            refs.push(node);
            if (!node || typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
                var observablePrimitive = new Observable(node);
                // Creating new get/set objects in a closure allows us to modify primitive values in the original object.
                (function () {
                    observablePrimitive.set = function (value) {
                        // Set the original value.
                        parent[name] = value;
                        observablePrimitive.value = value;
                        observablePrimitive.bindingEvent.publish(value);
                    };
                    observablePrimitive.get = function () {
                        return parent[name];
                    };
                })();
                return observablePrimitive;
            }
            else if (node instanceof Array) {
                var newCollection = new ObservableCollection();
                for (var i = 0; i < node.length; ++i) {
                    var newObject = {};
                    newObject = rewrite(i, node[i], node);
                    newCollection.addItem(newObject);
                }
                return newCollection;
            }
            else if (node instanceof Object) {
                // Don't touch things that are already Observable.
                if (node.isObservable) {
                    return node;
                }
                var newObject = {};
                // Rewrite the sub-object.
                for (var prop in node) {
                    if (!node.hasOwnProperty(prop)) {
                        continue;
                    }
                    newObject[prop] = rewrite(prop, node[prop], node);
                }
                return newObject;
            }
            else if (node instanceof Function) {
                return functionReplacement;
            }
            else {
                return node;
            }
        };
        var containerObj = {
            root: obj
        };
        var newObj = rewrite("root", containerObj, obj);
        obj["___clonedObject"] = newObj["root"];
        if (obj instanceof Array) {
            return newObj["root"];
        }
        else {
            return new Observable(newObj["root"]);
        }
    };
    /**
     * Binds an event handler to the binding event of this {@link Observable}. The event handler will be executed when
     * the value of the {@link Observable} changes via a call to set(). A string token is returned that can be used to
     * unbind the handler from the event.
     *
     *     var property = new Observable();
     *     property.bind(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *
     * @param scope The value of 'this' to bind the handler to.
     * @param handler The handler function to execute when the value changes.
     */
    Observable.prototype.bind = function (scope, handler) {
        return this.bindingEvent.subscribe(scope, handler);
    };
    /**
     * Removes an event handler previously attached via bind(), given the token that bind() returned.
     *
     *     var property = new Observable();
     *     var token = property.bind(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *     property.unbind(token);
     *
     *     // Does not alert anything
     *     property.set("hello?");
     *
     * @param token The token previously returned from a call to bind().
     */
    Observable.prototype.unbind = function (token) {
        return this.bindingEvent.unsubscribe(token);
    };
    /**
     * Binds a one-time event handler to the {@link Observable}, unbinding it the next time the {@link Observable} fires.
     *
     *     var property = new Observable();
     *     var token = property.once(this, function(value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello world"
     *     property.set("hello world");
     *
     *     // Does not alert anything
     *     property.set("hello?");
     *
     * @param scope The value of 'this' inside of the handler.
     * @param handler The one-time handler to execute.
     */
    Observable.prototype.once = function (scope, handler) {
        var _thisObservable = this;
        // As of TS 1.5, `arguments` cannot be referenced in arrow funcs.
        var token = this.bind(scope, function () {
            _thisObservable.unbind(token);
            handler.apply(scope, arguments);
        });
        return token;
    };
    /**
     * Synchronizes this {@link Observable} to another {@link Observable}. When the other {@link Observable} changes, this {@link Observable}
     * will be set to the same value, and the binding event raised. The value of this {@link Observable} will be set
     * to the value of the other {@link Observable} upon synchronization.
     *
     *     var property1 = new Observable("hello");
     *     var property2 = new Observable();
     *
     *     property2.sync(property1);
     *
     *     // Alerts "hello"
     *     alert(property2.get());
     *
     *     property1.set("bye");
     *
     *     // Alerts "bye"
     *     alert(property2.get());
     *
     * @param source The {@link Observable} to synchronize this one with.
     */
    Observable.prototype.sync = function (source) {
        this.removeSync();
        if (source) {
            this.set(source.get());
            this._syncSource = source;
            this._syncToken = source.bindingEvent.subscribe(this, function (value) {
                this.set(value);
            });
        }
    };
    /**
     * Removes the event subscriptions that were created when sync() or syncTransform() was called.
     * This effectively unbinds the synchronization that exists between this Observable and another
     * Observable.
     */
    Observable.prototype.removeSync = function () {
        if (this._syncToken && this._syncSource) {
            this._syncSource.unbind(this._syncToken);
            this._syncToken = null;
            this._syncSource = null;
        }
    };
    /**
     * Works the same as {@link sync}, but calls a transformation function every time the other {@link Observable} changes.
     *
     *     var property1 = new Observable("hello");
     *     var property2 = new Observable();
     *
     *     property2.syncTransform(property1, function (value) {
     *          return value.toUpperCase());
     *     });
     *
     *     // Alerts "HELLO"
     *     alert(property2.get());
     *
     *     property1.set("bye");
     *
     *     // Alerts "BYE"
     *     alert(property2.get());
     *
     * @param source The Observable to sync to.
     * @param transformation The function that performs the desired transformation.
     */
    Observable.prototype.syncTransform = function (source, transformation) {
        if (this._syncToken && this._syncSource) {
            this._syncSource.unbind(this._syncToken);
            this._syncToken = null;
            this._syncSource = null;
        }
        if (source) {
            this.set(transformation(source.get()));
            this._syncSource = source;
            this._syncToken = source.bindingEvent.subscribe(this, function (value) {
                this.set(transformation(value));
            });
        }
    };
    /**
     * Sets the {@link Observable} to its current value and fires the binding event.
     *
     *     var property1 = new Observable("hello");
     *     property1.bind(this, function (value) {
     *         alert(value);
     *     });
     *
     *     // Alerts "hello".
     *     property1.pulse();
     */
    Observable.prototype.pulse = function () {
        this.set(this.get());
    };
    return Observable;
}());
// A convenience flag that indicates this object is an Observable type.
Observable.prototype.isObservable = true;
/**
 * ObservableCollection provides {@link Observable} semantics around collections. Modifications to an {@link ObservableCollection} are
 * broadcast via a binding event that describes the change to the collection via a {@link geocortex.framework.events.CollectionChangedArgs}.
 *
 * See {@link Observable} for more details about semantics and usage of {@link Observable}s.
 * @docs-hide-from-nav
 */
var ObservableCollection = (function () {
    /**
     * Creates a new {@link ObservableCollection}, optionally wrapping an existing array.
     *
     *     var collection = new ObservableCollection(["hello"]);
     *     collection.addItem("world");
     *
     *     // Returns ["hello", "world"]
     *     var array = collection.get();
     *
     * @param items An array of items to initialize the collection to.
     */
    function ObservableCollection(items) {
        /**
         * The {@link geocortex.framework.events.Event} that is fired when this collection is modified.
         */
        this.bindingEvent = new geocortex.framework.events.Event("__anonymous");
        /**
        * Whether or not to perform throttled binding on this collection. If set to true, data-binding operations across this collection will be
        * performed asynchronously to avoid blocking the UI thread.
        */
        this.useThrottling = false;
        /**
         * An array containing all the throttled binding operations currently active on this collection, if throttling is enabled.
         */
        this.throttledOperations = null;
        this._syncSource = null;
        this.value = items || [];
    }
    /** Checks whether this collection contains any items */
    ObservableCollection.prototype.isEmpty = function () {
        return this.value.length === 0;
    };
    /** Returns the length of this collection. */
    ObservableCollection.prototype.length = function () {
        return this.value.length;
    };
    /**
     * Checks whether this collection contains a specific item.
     * @param item The item to check for.
     */
    ObservableCollection.prototype.contains = function (item) {
        return Array.contains(this.value, item);
    };
    /**
    * Tries to get an item from the underlying collection at a given index.
    * @param i The index of the item to return.
    */
    ObservableCollection.prototype.getAt = function (index) {
        return this.value[index];
    };
    /**
     * Returns items, given a specific range. Works like Array.slice, except end is inclusive.
     * @param begin The beginning of the range to fetch.
     * @param end The end of the rang to fetch (inclusive).
     */
    ObservableCollection.prototype.getRange = function (begin, end) {
        if (end === undefined) {
            return this.value.slice(begin);
        }
        return this.value.slice(begin, end + 1);
    };
    /**
    * Determines the index of the specified item in the collection.
    * @param item The item to get the index of.
    */
    ObservableCollection.prototype.indexOf = function (item) {
        return this.value.indexOf(item);
    };
    /** Gets the raw underlying collection. */
    ObservableCollection.prototype.get = function () {
        return this.value;
    };
    /** Gets the raw underlying collection. */
    ObservableCollection.prototype.getItems = function () {
        return this.value;
    };
    /** Gets the length of the collection. */
    ObservableCollection.prototype.getLength = function () {
        return this.value.length;
    };
    /**
    * Adds items to the collection and triggers the binding event.
    * @param items The items to add to the collection.
    */
    ObservableCollection.prototype.addItems = function (items) {
        if (!items || items.length < 1) {
            return;
        }
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "append";
        args.rangeStart = this.value.length;
        this.value = this.value.concat(items);
        args.rangeEnd = (args.rangeStart + items.length - 1); // Inclusive range indices
        args.sender = this;
        // Instead of raising our changed event with the new value of this observable, we'll pass the collection changed info.
        this.bindingEvent.publish(args);
    };
    /**
    * Adds an item to the collection and triggers the binding event.
    * @param item The item to add to the collection. */
    ObservableCollection.prototype.addItem = function (item) {
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "append";
        args.rangeStart = this.value.length;
        args.rangeEnd = this.value.length;
        this.value.push(item);
        args.sender = this;
        this.bindingEvent.publish(args);
    };
    /**
    * Inserts items into the collection at a given position and triggers the binding event.
    * @param index The location to insert the items.
    * @param items The items to insert.
    */
    ObservableCollection.prototype.insertItems = function (index, items) {
        if (items.length == 0) {
            return;
        }
        if (index >= this.value.length) {
            this.addItems(items);
            return;
        }
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "insert";
        args.rangeStart = index;
        args.rangeEnd = index + items.length - 1; // Inclusive range indices
        args.sender = this;
        for (var i = 0; i < items.length; ++i) {
            this.value.splice(index + i, 0, items[i]);
        }
        this.bindingEvent.publish(args);
    };
    /**
    * Inserts an item into the collection at a given position and triggers the binding event.
    * @param index The location to insert the items.
    * @param items The items to insert.
    */
    ObservableCollection.prototype.insertItem = function (index, item) {
        if (index >= this.value.length) {
            this.addItem(item);
            return;
        }
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "insert";
        args.rangeStart = index;
        args.rangeEnd = index;
        args.sender = this;
        this.value.splice(index, 0, item);
        this.bindingEvent.publish(args);
    };
    /**
    * Removes an object from the collection and triggers the binding event.
    * @param obj The object instance to remove.
    */
    ObservableCollection.prototype.removeItem = function (obj) {
        var objectIndex;
        // Remove all instances of the object from the collection.
        while ((objectIndex = Array.pos(this.value, obj)) > -1) {
            var args = new geocortex.framework.events.CollectionChangedArgs();
            args.type = "remove";
            args.rangeStart = objectIndex;
            args.rangeEnd = objectIndex;
            args.sender = this;
            this.bindingEvent.publish(args);
            Array.remove(this.value, objectIndex, objectIndex);
        }
    };
    /**
    * Removes the item at the specified index and triggers the binding event.
    * If the index is not valid for this collection, then nothing happens.
    * @param index The index of the item to remove.
    */
    ObservableCollection.prototype.removeAt = function (index) {
        if (0 <= index && index < this.getLength()) {
            var args = new geocortex.framework.events.CollectionChangedArgs();
            args.type = "remove";
            args.rangeStart = index;
            args.rangeEnd = index;
            args.sender = this;
            this.bindingEvent.publish(args);
            Array.remove(this.value, index, index);
        }
    };
    /**
    * Removes a range of items from the collection and fires the binding event accordingly.
    * @param from The index to remove from.
    * @param to The index to remove to. This is inclusive.
    */
    ObservableCollection.prototype.removeRange = function (from, to) {
        if (!to && to !== 0) {
            to = this.value.length;
        }
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "remove";
        args.rangeStart = from;
        args.rangeEnd = Math.min(to, this.value.length);
        args.sender = this;
        this.bindingEvent.publish(args);
        Array.remove(this.value, from, to);
    };
    /**
    Removes all items from this {@link ObservableCollection} where the supplied callback
    function returns a truthy value.
    */
    ObservableCollection.prototype.removeWhere = function (callback) {
        if (callback) {
            for (var i = this.value.length - 1; i >= 0; i--) {
                if (callback(this.value[i])) {
                    // Notify
                    var args = new geocortex.framework.events.CollectionChangedArgs();
                    args.type = "remove";
                    args.rangeStart = i;
                    args.rangeEnd = i;
                    args.sender = this;
                    this.bindingEvent.publish(args);
                    // Remove
                    Array.remove(this.value, i, i);
                }
            }
        }
    };
    /** Clears the collection and triggers the binding event. */
    ObservableCollection.prototype.clear = function () {
        if (!this.value || this.value.length == 0) {
            // Nothing to clear
            return;
        }
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "clear";
        args.rangeStart = 0;
        args.rangeEnd = this.value.length - 1;
        args.sender = this;
        this.bindingEvent.publish(args);
        // Clear is a special case - we'll broadcast the event *before* actually clearing. This is because
        // any handler of the event can know the exact state of the collection based on the event args itself,
        // but can still look at the collection to see what's being cleared.
        this.value.length = 0;
    };
    /**
    * Copies an existing raw collection.
    * @param newCollection The raw collection to copy. */
    ObservableCollection.prototype.set = function (newCollection) {
        this.clear();
        if (newCollection) {
            this.addItems(newCollection);
        }
    };
    /**
     * Fires the binding event twice, simulating a clear and and append of the entire collection back to its original state.
     * See {@link Observable}.
     */
    ObservableCollection.prototype.pulse = function () {
        var args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "clear";
        args.rangeStart = 0;
        args.rangeEnd = this.value.length - 1;
        args.sender = this;
        this.bindingEvent.publish(args);
        args = new geocortex.framework.events.CollectionChangedArgs();
        args.type = "append";
        args.rangeStart = 0;
        args.rangeEnd = this.value.length - 1; // Inclusive range indices
        args.sender = this;
        this.bindingEvent.publish(args);
    };
    /**
     * Binds a handler to the binding event. This handler will be executed whenever the value of the collection is modified
     * Through an {@link ObservableCollection} call.
     * This method returns a subscription token that can be used to unsubscribe the handler.
     * @param scope The scope to execute the handler in. This will the meaning of 'this' inside of the handler when it is called.
     * @param handler The handler to execute when the Observable changes.
     */
    ObservableCollection.prototype.bind = function (scope, handler) {
        return this.bindingEvent.subscribe(scope, handler);
    };
    /**
     * Unbinds a binding subscription, given a valid subscription token received from a call to bind().
     * @param token The token representing the previously added subscription handler.
     */
    ObservableCollection.prototype.unbind = function (token) {
        return this.bindingEvent.unsubscribe(token);
    };
    /**
     * Binds a handler the the binding event only once. The handler will only be executed the next time the {@link ObservableCollection} is updated.
     * This method returns a subscription token that can be used to unsubscribe the handler.
     * @param scope The scope to execute the handler in.
     * @param handler The handler to execute when the Observable changes.
     */
    ObservableCollection.prototype.once = function (scope, handler) {
        // This is to make sure that _this this is this;
        var _this = this;
        var token = _this.bind(scope, function () {
            _this.unbind(token);
            handler.apply(scope, arguments);
        });
        return token;
    };
    /**
    * Synchronizes one observable collection with another. Henceforth, whenever the source
    * changes, the synchronized collection will also be updated.
    * @param source The source ObservableCollection that this ObservableCollection will now mirror.
    */
    ObservableCollection.prototype.sync = function (source) {
        if (source.value && source.bindingEvent) {
            this.clear();
            this.value = source.value;
            source.bindingEvent.subscribe(this, function (args) {
                this.value = source.value;
                // Clone the event args but fixup the sender
                var newArgs = new geocortex.framework.events.CollectionChangedArgs();
                dojo.mixin(newArgs, args);
                newArgs.sender = this;
                this.bindingEvent.publish(newArgs);
                // Note: Clear is actually broadcast before the collection is cleared. This means that "this.value" has the
                // value of the collection before it was actually cleared. To mirror it, we need to clear our own.
                // Also note that now this.value will not point to the same array as source.value - they have become "detached" and
                // will remain so until an Observable change is made to the source. This means that changes to the raw source.value
                // won't be reflected in the raw this.value of a sync'ed ObservableCollection.
                if (args.type === "clear") {
                    this.value = [];
                }
            });
        }
    };
    ObservableCollection.prototype.equals = function (other) {
        var otherValue = other;
        if (other && other.isObservableCollection) {
            otherValue = other.get();
        }
        if (!otherValue.hasOwnProperty("length")) {
            throw new Error("Type mismatch");
        }
        if (this.get().length !== otherValue.length) {
            return false;
        }
        for (var i = 0; i < this.get().length; i++) {
            if (this.value[i] !== otherValue[i]) {
                return false;
            }
        }
        return true;
    };
    return ObservableCollection;
}());
// A convenience flag that indicates this object is an Observable type.
ObservableCollection.prototype.isObservable = true;
ObservableCollection.prototype.isObservableCollection = true;
// Some/most of these methods by John Resig (MIT Licensed)
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            var ArrayUtils;
            (function (ArrayUtils) {
                var orderByFn = function (x, y) {
                    if (x === y) {
                        return 0;
                    }
                    return (x > y) ? 1 : -1;
                };
                /**
                 * Returns the first element in a sequence that satisfies a specified condition.
                 * @param source The sequence of values to return an element from.
                 * @param predicate A function to test each element for a condition.
                 */
                function firstOrDefault(source, predicate) {
                    // Return the first element of the sequence if no predicate was specified.
                    var sourceLen = source ? source.length : 0;
                    if ((predicate === null || typeof predicate === "undefined") && sourceLen > 0) {
                        return source[0];
                    }
                    for (var i = 0; i < sourceLen; i++) {
                        var element = source[i];
                        if (predicate(element, i)) {
                            return element;
                        }
                    }
                    return null;
                }
                ArrayUtils.firstOrDefault = firstOrDefault;
                /**
                 * Returns the last element in a sequence that satisfies a specified condition.
                 * @param source The sequence of values to return an element from.
                 * @param predicate A function to test each element for a condition.
                 */
                function lastOrDefault(source, predicate) {
                    // Return the last element of the sequence if no predicate was specified.
                    var sourceLen = source ? source.length : 0;
                    if ((predicate === null || typeof predicate === "undefined") && sourceLen > 0) {
                        return source[sourceLen - 1];
                    }
                    for (var i = sourceLen - 1; i >= 0; i--) {
                        var element = source[i];
                        if (predicate(element, i)) {
                            return element;
                        }
                    }
                    return null;
                }
                ArrayUtils.lastOrDefault = lastOrDefault;
                /**
                 * Sorts the elements of a sequence in ascending order according to a key.
                 * The source sequence remains unaltered.
                 * @param source The sequence of values to order.
                 * @param keySelector A function to extract the key for each element.
                 */
                function orderBy(source, keySelector) {
                    if (source) {
                        var clone = source.slice();
                        return clone.sort(function (a, b) {
                            var keyA = keySelector(a);
                            var keyB = keySelector(b);
                            if (keyA instanceof utils.Tuple) {
                                return utils.Tuple.compare(keyA, keyB);
                            }
                            else {
                                return orderByFn(keyA, keyB);
                            }
                        });
                    }
                    return [];
                }
                ArrayUtils.orderBy = orderBy;
                /**
                 * Sorts the elements of a sequence in descending order according to a key.
                 * The source sequence remains unaltered.
                 * @param source The sequence of values to order.
                 * @param keySelector A function to extract the key for each element.
                 */
                function orderByDescending(source, keySelector) {
                    if (source) {
                        var clone = source.slice();
                        return clone.sort(function (a, b) {
                            var keyA = keySelector(a);
                            var keyB = keySelector(b);
                            if (keyA instanceof utils.Tuple) {
                                return utils.Tuple.compare(keyB, keyA); // descending order
                            }
                            else {
                                return orderByFn(keyB, keyA); // descending order
                            }
                        });
                    }
                    return [];
                }
                ArrayUtils.orderByDescending = orderByDescending;
                /**
                 * Groups the elements of a sequence according to a specified key selector function.
                 * The source sequence remains unaltered.
                 * @param source The sequence whose elements to group.
                 * @param keySelector A function to extract the key for each element.
                 */
                function groupBy(source, keySelector) {
                    // Filling the dictionary. It will contain: [Key -> List<Values>]
                    var groups = {};
                    var results = [];
                    if (source && keySelector) {
                        for (var i = 0; i < source.length; i++) {
                            var value = source[i];
                            var key = keySelector(value);
                            var hash = JSON.stringify(key); // create a hash
                            // Check if the key exists in the dictionary
                            if (groups.hasOwnProperty(hash)) {
                                groups[hash].items.push(value);
                            }
                            else {
                                // Create new grouping
                                groups[hash] = { key: key, items: [value] };
                            }
                        }
                        for (var prop in groups) {
                            if (groups.hasOwnProperty(prop)) {
                                results.push(groups[prop]);
                            }
                        }
                    }
                    return results;
                }
                ArrayUtils.groupBy = groupBy;
                /**
                 * Returns distinct elements from a sequence by using the default equality comparer to compare values.
                 * The source sequence remains unaltered.
                 * @param source The sequence to remove duplicate elements from.
                 */
                function distinct(source) {
                    if (source) {
                        // Exclude duplicates
                        var result = source.filter(function (item, index, origArray) {
                            return item != null && (origArray.indexOf(item) === index);
                        });
                        return result;
                    }
                    return [];
                }
                ArrayUtils.distinct = distinct;
                /**
                 * Produces the set difference of two sequences by using the default equality comparer to compare values.
                 * The source sequence remains unaltered.
                 * @param first An array whose elements that are not also in `second` will be returned.
                 * @param second An array whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
                 */
                function difference(first, second) {
                    var result;
                    if (!first) {
                        result = [];
                    }
                    else if (!second) {
                        result = first.slice(0);
                    }
                    else {
                        result = first.filter(function (x) { return second.indexOf(x) < 0; });
                    }
                    return result;
                }
                ArrayUtils.difference = difference;
                /**
                 * Removes a range of items from an Array.
                 * @param array The Array to remove from.
                 * @param from The index to begin removing from.
                 * @param to The index to remove to.
                 */
                function remove(array, from, to) {
                    var rest = array.slice((to || from) + 1 || array.length);
                    array.length = from < 0 ? array.length + from : from;
                    return array.push.apply(array, rest);
                }
                ArrayUtils.remove = remove;
                /**
                 * Removes a specific item from an array. If multiple instances of the item exist in the array, only the first reference is removed.
                 * @param array The array to remove from.
                 * @param obj The object to remove.
                 */
                function removeItem(array, obj) {
                    var i = ArrayUtils.pos(array, obj);
                    if (i == -1) {
                        return null;
                    }
                    else {
                        return ArrayUtils.remove(array, i, i);
                    }
                }
                ArrayUtils.removeItem = removeItem;
                /**
                 * Checks whether or not an array contains a specific object.
                 * @param array The array to check.
                 * @param obj The object to check for.
                 */
                function contains(array, obj) {
                    var i = array.length;
                    while (i--) {
                        if (array[i] === obj) {
                            return true;
                        }
                    }
                    return false;
                }
                ArrayUtils.contains = contains;
                /**
                 * Returns the index of a given object, if it exists in an array.
                 * @param array The Array to check.
                 * @param obj The object to check for.
                 */
                function pos(array, obj) {
                    var i = array.length;
                    while (i--) {
                        if (array[i] === obj) {
                            return i;
                        }
                    }
                    return -1;
                }
                ArrayUtils.pos = pos;
                /**
                 * Flattens an array of arrays into a single array of items, e.g. flatten([[1,2], [3], [4,5,6]]) == [1,2,3,4,5,6].
                 * The original array is not modified.
                 * @param array The array to flatten.
                 */
                function flatten(array) {
                    if (!array) {
                        return array;
                    }
                    return [].concat.apply([], array);
                }
                ArrayUtils.flatten = flatten;
                if (!Array.prototype.indexOf) {
                    /*
                     * indexOf is a recent addition to the ECMA-262 standard; as such it may not be present in all browsers.
                     * This algorithm is exactly the one specified in ECMA-262, 5th edition, assuming Object, TypeError,
                     * Number, Math.floor, Math.abs, and Math.max have their original value.
                     * @param searchElement The object to search in array.
                     */
                    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
                        "use strict";
                        if (this == null) {
                            throw new TypeError();
                        }
                        var t = Object(this);
                        var len = t.length >>> 0;
                        if (len === 0) {
                            return -1;
                        }
                        var n = 0;
                        if (arguments.length > 1) {
                            n = Number(arguments[1]);
                            if (n != n) {
                                n = 0;
                            }
                            else if (n != 0 && n != Infinity && n != -Infinity) {
                                n = +(n > 0 || -1) * Math.floor(Math.abs(n));
                            }
                        }
                        if (n >= len) {
                            return -1;
                        }
                        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                        for (; k < len; k++) {
                            if (k in t && t[k] === searchElement) {
                                return k;
                            }
                        }
                        return -1;
                    };
                }
                if (!Array.prototype.lastIndexOf) {
                    /**
                     * lastIndexOf is a recent addition to the ECMA-262 standard; as such it may not be present in other
                     * implementations of the standard. You can work around this by inserting the following code at the beginning
                     * of your scripts, allowing use of lastIndexOf in implementations which do not natively support it. This
                     * algorithm is exactly the one specified in ECMA-262, 5th edition, assuming Object, TypeError, Number,
                     * Math.floor, Math.abs, and Math.min have their original values.
                     */
                    Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
                        "use strict";
                        if (this == null) {
                            throw new TypeError();
                        }
                        var t = Object(this);
                        var len = t.length >>> 0;
                        if (len === 0) {
                            return -1;
                        }
                        var n = len;
                        if (arguments.length > 1) {
                            n = Number(arguments[1]);
                            if (n != n) {
                                n = 0;
                            }
                            else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                                n = +(n > 0 || -1) * Math.floor(Math.abs(n));
                            }
                        }
                        var k = n >= 0
                            ? Math.min(n, len - 1)
                            : len - Math.abs(n);
                        for (; k >= 0; k--) {
                            if (k in t && t[k] === searchElement) {
                                return k;
                            }
                        }
                        return -1;
                    };
                }
                if (!Array.prototype.forEach) {
                    /**
                     * forEach is a recent addition to the ECMA-262 standard; as such it may not be present in other
                     * implementations of the standard. You can work around this by inserting the following code at the beginning
                     * of your scripts, allowing use of forEach in implementations which do not natively support it.
                     */
                    Array.prototype.forEach = function forEach(callback, thisArg) {
                        var T, k;
                        if (this == null) {
                            throw new TypeError("this is null or not defined");
                        }
                        var O = Object(this);
                        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                        if ({}.toString.call(callback) !== "[object Function]") {
                            throw new TypeError(callback + " is not a function");
                        }
                        if (thisArg) {
                            T = thisArg;
                        }
                        k = 0;
                        while (k < len) {
                            var kValue;
                            if (Object.prototype.hasOwnProperty.call(O, k)) {
                                kValue = O[k];
                                callback.call(T, kValue, k, O);
                            }
                            k++;
                        }
                    };
                }
                if (!Array.prototype.every) {
                    /**
                     * every is a recent addition to the ECMA-262 standard; as such it may not be present in other implementations
                     * of the standard. You can work around this by inserting the following code at the beginning of your scripts,
                     * allowing use of every in implementations which do not natively support it. This algorithm is exactly the
                     * one specified in ECMA-262, 5th edition, assuming Object and TypeError have their original values and that
                     * fun.call evaluates to the original value of Function.prototype.call.
                     */
                    Array.prototype.every = function (fun /*, thisp */) {
                        "use strict";
                        if (this == null) {
                            throw new TypeError();
                        }
                        var t = Object(this);
                        var len = t.length >>> 0;
                        if (typeof fun != "function") {
                            throw new TypeError();
                        }
                        var thisp = arguments[1];
                        for (var i = 0; i < len; i++) {
                            if (i in t && !fun.call(thisp, t[i], i, t)) {
                                return false;
                            }
                        }
                        return true;
                    };
                }
                if (!Array.prototype.some) {
                    /**
                     * some is a recent addition to the ECMA-262 standard; as such it may not be present in other
                     * implementations of the standard. You can work around this by inserting the following code
                     * at the beginning of your scripts, allowing use of some in implementations which do not natively
                     * support it. This algorithm is exactly the one specified in ECMA-262, 5th edition, assuming Object
                     * and TypeError have their original values and that fun.call evaluates to the original value of Function.prototype.call.
                     */
                    Array.prototype.some = function (fun /*, thisp */) {
                        "use strict";
                        if (this == null) {
                            throw new TypeError();
                        }
                        var t = Object(this);
                        var len = t.length >>> 0;
                        if (typeof fun != "function") {
                            throw new TypeError();
                        }
                        var thisp = arguments[1];
                        for (var i = 0; i < len; i++) {
                            if (i in t && fun.call(thisp, t[i], i, t)) {
                                return true;
                            }
                        }
                        return false;
                    };
                }
                if (!Array.prototype.filter) {
                    /**
                     * filter is a JavaScript extension to the ECMA-262 standard; as such it may not be present in other
                     * implementations of the standard. You can work around this by inserting the following code at the beginning
                     * of your scripts, allowing use of filter in ECMA-262 implementations which do not natively support it. This
                     * algorithm is exactly the one specified in ECMA-262, 5th edition, assuming Object and TypeError have their
                     * original values, that fun.call evaluates to the original value of Function.prototype.call, and that
                     * Array.prototype.push has its original value.
                     */
                    Array.prototype.filter = function (fun /*, thisp */) {
                        "use strict";
                        if (this == null) {
                            throw new TypeError();
                        }
                        var t = Object(this);
                        var len = t.length >>> 0;
                        if (typeof fun != "function") {
                            throw new TypeError();
                        }
                        var res = [];
                        var thisp = arguments[1];
                        for (var i = 0; i < len; i++) {
                            if (i in t) {
                                var val = t[i]; // in case fun mutates this
                                if (fun.call(thisp, val, i, t)) {
                                    res.push(val);
                                }
                            }
                        }
                        return res;
                    };
                }
                if (!Array.prototype.map) {
                    /**
                     * map is a recent addition to the ECMA-262 standard; as such it may not be present in other implementations
                     * of the standard. You can work around this by inserting the following code at the beginning of your scripts,
                     * allowing use of map in implementations which do not natively support it. This algorithm is exactly the one
                     * specified in ECMA-262, 5th edition, assuming Object, TypeError, and Array have their original values and
                     * that callback.call evaluates to the original value of Function.prototype.call.
                     */
                    Array.prototype.map = function (callback, thisArg) {
                        var T, A, k;
                        if (this == null) {
                            throw new TypeError(" this is null or not defined");
                        }
                        var O = Object(this);
                        var len = O.length >>> 0;
                        if (typeof callback !== "function") {
                            throw new TypeError(callback + " is not a function");
                        }
                        if (thisArg) {
                            T = thisArg;
                        }
                        A = new Array(len);
                        k = 0;
                        while (k < len) {
                            var kValue, mappedValue;
                            if (k in O) {
                                kValue = O[k];
                                mappedValue = callback.call(T, kValue, k, O);
                                A[k] = mappedValue;
                            }
                            k++;
                        }
                        return A;
                    };
                }
                // Array.prototype.find -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                // By Mozilla Contributors -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find$history
                // Licensed under CC-BY-SA 2.5 -- http://creativecommons.org/licenses/by-sa/2.5/
                if (!Array.prototype.find) {
                    /**
                     * The find() method returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned.
                     */
                    Array.prototype.find = function (predicate) {
                        if (this === null) {
                            throw new TypeError("Array.prototype.find called on null or undefined");
                        }
                        if (typeof predicate !== "function") {
                            throw new TypeError("predicate must be a function");
                        }
                        var list = Object(this);
                        var length = list.length >>> 0;
                        var thisArg = arguments[1];
                        var value;
                        for (var i = 0; i < length; i++) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return value;
                            }
                        }
                        return undefined;
                    };
                }
                // Array.prototype.findIndex -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
                // By Mozilla Contributors -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex$history
                // Licensed under CC-BY-SA 2.5 -- http://creativecommons.org/licenses/by-sa/2.5/
                if (!Array.prototype.findIndex) {
                    /**
                     * The findIndex() method returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned.
                     */
                    Array.prototype.findIndex = function (predicate) {
                        if (this === null) {
                            throw new TypeError("Array.prototype.findIndex called on null or undefined");
                        }
                        if (typeof predicate !== "function") {
                            throw new TypeError("predicate must be a function");
                        }
                        var list = Object(this);
                        var length = list.length >>> 0;
                        var thisArg = arguments[1];
                        var value;
                        for (var i = 0; i < length; i++) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return i;
                            }
                        }
                        return -1;
                    };
                }
            })(ArrayUtils = utils.ArrayUtils || (utils.ArrayUtils = {}));
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
Array.remove = geocortex.framework.utils.ArrayUtils.remove;
Array.removeItem = geocortex.framework.utils.ArrayUtils.removeItem;
Array.contains = geocortex.framework.utils.ArrayUtils.contains;
Array.pos = geocortex.framework.utils.ArrayUtils.pos;
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            /**
             * Models an operation that executes periodically based on a specific interval.
             * @private
             */
            var ThrottledOperation = (function () {
                /**
                 * Instantiate an the {@link framework.utils.ThrottledOperation} class.
                 * @param period The number of milliseconds to wait between each application of the throttled operation.
                 * @param action A function describing the action to throttle. If it returns true, it will be repeated. If not, the throttler will terminate.
                 * @param cancelAction A function which will be called in the event that a throttling operation is cancelled midway.
                 */
                function ThrottledOperation(period, action, cancelAction) {
                    /** The number of milliseconds to wait between each application of the throttled operation. */
                    this.period = 100;
                    /**
                     * Boolean indicating whether this throttling operation is currently active or not.
                     */
                    this.isActive = false;
                    /**
                     * Private set timeout token reference.
                     */
                    this._setTimeoutToken = null;
                    this.period = period == undefined ? 0 : period;
                    this.action = action;
                    this.cancelAction = cancelAction;
                    var _this = this;
                    this._setTimeoutToken = setTimeout(function () { _this.execute(_this); }, this.period);
                }
                /**
                 * This function cancels this throttled operation if it is in progress. If a cancelAction is specified, it will be invoked on cancellation.
                 */
                ThrottledOperation.prototype.cancel = function () {
                    if (this._setTimeoutToken) {
                        clearTimeout(this._setTimeoutToken);
                        this._setTimeoutToken = null;
                        this.isActive = false;
                        if (this.cancelAction) {
                            this.cancelAction();
                        }
                    }
                };
                /**
                 * Internal throttled operation implementation.
                 */
                ThrottledOperation.prototype.execute = function (scope) {
                    scope.isActive = true;
                    var result = scope.action();
                    if (scope._setTimeoutToken !== null && result) {
                        scope._setTimeoutToken = setTimeout(function () { scope.execute(scope); }, scope.period);
                    }
                    else {
                        scope._setTimeoutToken = null;
                        scope.isActive = false;
                    }
                };
                return ThrottledOperation;
            }());
            utils.ThrottledOperation = ThrottledOperation;
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../events/Event.ts" />
/// <reference path="BindingNode.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var onEventMatcher = /^on/;
            /**
             * Represents a single binding expression.
             */
            var BindingExpression = (function () {
                function BindingExpression() {
                    /** The DOM element this binding expression applies to. */
                    this.domElement = null;
                    /**
                     * The name of this binding type. One of:
                     * -attr
                     * -visibility
                     * -event
                     * -collection
                     */
                    this.type = "attr";
                    /** The name of the attribute this binding applies to, if applicable. */
                    this.attributeName = null;
                    /** The target name of this binding, e.g. the name of a view model field. */
                    this.target = null;
                    /** Whether or not this binding should be inverted, if applicable. */
                    this.invert = false;
                    /** Signals returned by dojo.on, created in the .on function. */
                    this._dojoDomEvents = [];
                    /** Array of objects containing event subscriptions tokens for bindings to {@link Observable} and {@link ObservableCollection} objects. */
                    this.targetBindings = [];
                    /** Describes the templating mode of this binding expression. */
                    this.templateMode = null;
                    /** The key field use in template selection. */
                    this.templateKey = null;
                    /** Templates available for binding. */
                    this.templateSelections = {};
                    /** The view that this binding belongs to. */
                    this.parentView = null;
                    /** Views created as a result of this binding. */
                    this.boundViews = [];
                    /** The view model this binding connects to. */
                    this.viewModel = null;
                }
                /**
                 * Connect a BindingExpression event from the DOM element.  The event will automatically
                 * be disconnected when this BindingExpression is destroyed.
                 */
                BindingExpression.prototype.on = function (event, handler) {
                    var _this = this;
                    if (!event || !handler) {
                        return;
                    }
                    if (!this.domElement) {
                        throw new Error("Cannot bind before domElement is set.");
                    }
                    // Strip out the 'on' in oldschool 'onblah' event names.
                    if (onEventMatcher.test(event)) {
                        event = event.substring(2);
                    }
                    require(["dojo/on"], function (on) {
                        var signal = on(_this.domElement, event, handler);
                        _this._dojoDomEvents.push(signal);
                    });
                };
                /**
                 * Destroys this binding expression along with any views created as a result of it.
                 */
                BindingExpression.prototype.destroy = function () {
                    // If the binding has any template elements, they should be placed back into their parent elements.
                    // Placing templates back into their parent items allows views to be re-used.
                    if (this.templateSelections) {
                        for (var template in this.templateSelections) {
                            if (this.templateSelections.hasOwnProperty(template)) {
                                var templateElement = this.templateSelections[template];
                                if (templateElement && templateElement["___domParent"]) {
                                    var domParent = templateElement["___domParent"];
                                    dojo.place(templateElement, domParent, "last");
                                }
                            }
                        }
                    }
                    this.domElement = null;
                    this.target = null;
                    this.parentView = null;
                    this.viewModel = null;
                    // Remove DOM events.
                    for (var i = 0; i < this._dojoDomEvents.length; ++i) {
                        this._dojoDomEvents[i].remove();
                    }
                    this._dojoDomEvents.length = 0;
                    // Remove Observable event subscriptions.
                    for (i = 0; i < this.targetBindings.length; ++i) {
                        this.targetBindings[i].event.unsubscribe(this.targetBindings[i].token);
                    }
                    this.targetBindings = [];
                    // Destroy bound views.
                    for (var i = 0; i < this.boundViews.length; ++i) {
                        this.boundViews[i].destroyBindings();
                    }
                    this.boundViews = [];
                };
                return BindingExpression;
            }());
            ui.BindingExpression = BindingExpression;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="BindingExpression.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * BindingNode represents a data-bound DOM element with one or more binding expressions.
             */
            var BindingNode = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.ui.BindingNode} class
                 */
                function BindingNode() {
                    /** The DOM element for which this binding effects. */
                    this.domElement = null;
                    this.parent = null;
                    /**  Child bindings. */
                    this.children = [];
                    /** Computed binding expressions. */
                    this.expressions = [];
                    /** Data context of the binding, usually a view model of some sort. */
                    this.context = null;
                    /** Whether or not this node represents a change in data context, e.g. in a @source binding. */
                    this.contextChange = false;
                    this.domElement = null;
                    this.parent = null;
                    this.context = null;
                }
                /**
                 * Destroys this binding node, unsubscribing from any events and freeing all resources.
                 */
                BindingNode.prototype.destroy = function () {
                    this.domElement = null;
                    this.parent = null;
                    this.context = null;
                    this.contextChange = false;
                    // Destroy specific bindings.
                    for (var i = 0; i < this.expressions.length; ++i) {
                        this.expressions[i].destroy();
                    }
                    this.expressions = [];
                    // Destroy child nodes.
                    for (var i = 0; i < this.children.length; ++i) {
                        this.children[i].destroy();
                    }
                    this.children = [];
                };
                return BindingNode;
            }());
            ui.BindingNode = BindingNode;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../events/Event.ts" />
/// <reference path="BindingInterfaces.ts" />
/// <reference path="../application/Application.ts" />
/// <reference path="../FrameworkObject.ts" />
/// <reference path="../events/CollectionChangedArgs.ts" />
/// <reference path="../observables.ts" />
/// <reference path="../utils/ArrayUtils.ts" />
/// <reference path="../utils/ThrottledOperation.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="BindingNode.ts" />
/// <reference path="DisposableBinding.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * Represents a data-bound, MVVM-style view. `ViewBase` handles data-binding and view lifecycle concerns.
             * *Note:* Data-binding is achieved primarily through HTML templating - consumers need not call binding methods directly.
             */
            var ViewBase = (function (_super) {
                __extends(ViewBase, _super);
                /**
                * Initializes a new instance of the {@link geocortex.framework.ui.ViewBase} class.
                * @param app The {@link geocortex.framework.application.Application} that this view belongs to.
                * @param libraryId
                */
                function ViewBase(app, libraryId) {
                    _super.call(this, app, libraryId);
                    /** Whether or not this view is active. */
                    this.isActive = false;
                    /** Whether or not this view is allowed to be managed by some sort of view management component. */
                    this.isManaged = false;
                    /** The {@link Observable} isBusy flag of the view. */
                    this.isBusy = new Observable(false);
                    /**
                     * The {@link Observable} title of the view. */
                    this.title = new Observable("");
                    /** The {@link Observable} description of the view. */
                    this.description = new Observable("");
                    /** The {@link Observable} icon URI of the view. */
                    this.iconUri = new Observable("");
                    /** Resource name of the markup for this view (if any). */
                    this.markupResource = null;
                    /** The View Model backing this view. Does not necessarily have to be a formal instance of {@link ViewModelBase}. */
                    this.viewModel = null;
                    /** The name of the region that this view is hosted in. */
                    this.regionName = "";
                    /** The type name of this view. */
                    this.typeName = "";
                    /** The root DOM element of this view. */
                    this.root = null;
                    /** The tree of binding nodes represented in the markup. */
                    this.bindingTree = null;
                    /** The parent view of this view, if this view is the result of a collection binding. */
                    this.parentView = null;
                    /** Regions belonging to (hosted in) this view. */
                    this.childRegions = [];
                    /** Whether or not this view has been bound. */
                    this.bound = false;
                    /** Indicates whether this view has been initialized and bound for the first time. */
                    this.initiallyBound = false;
                    /** @private */
                    this.disposableBindings = [];
                    /** @private */
                    this.bindingSetupDelegates = [];
                    this.id = "View-" + geocortex.framework.utils.alphaNumericToken();
                }
                /**
                * Adds an {@link Observable} binding that will be disposed of when the view is destroyed.
                * @param observable The Observable to bind to.
                * @param token The token received from binding to the observable.
                */
                ViewBase.prototype.addDisposableBinding = function (observable, token) {
                    this.disposableBindings.push({ event: observable.bindingEvent, token: token });
                };
                /**
                 * Attaches a view model and performs data-binding.
                 * @param viewModel The view model to attach to.
                 */
                ViewBase.prototype.attach = function (viewModel) {
                    //this.app.trace.debug("View.Attach called for view '{0}'.".format(this.id));
                    if (this.bound) {
                        return;
                    }
                    this.viewModel = viewModel;
                    if (this.root) {
                        this.bindingTree = this.buildTree();
                        if (this.viewModel !== null && this.viewModel !== undefined) {
                            this.pulseAll();
                        }
                        this.bound = true;
                        if (!this.initiallyBound) {
                            this.initiallyBound = true;
                            this.app.event("ViewInitializedEvent").publish(this);
                        }
                    }
                };
                /**
                 * Called when the view has been activated.
                 */
                ViewBase.prototype.activated = function () {
                };
                /**
                 * Called when the view has been deactivated.
                 */
                ViewBase.prototype.deactivated = function () {
                };
                /**
                 * Called when the view has been added to a region or as another view in the form of a widget.
                 * @param The parent view, if this view is being hosted as a widget.
                 */
                ViewBase.prototype.added = function (widgetViewHost) {
                    if (!this.bound && this.viewModel) {
                        this.bindingTree = this.buildTree();
                        this.bound = true;
                        this.pulseAll();
                        if (!this.initiallyBound) {
                            this.initiallyBound = true;
                            this.app.event("ViewInitializedEvent").publish(this);
                        }
                    }
                };
                /**
                 * Called when a view has been removed from a region.
                 */
                ViewBase.prototype.removed = function () {
                    //this.app.trace.debug("View.Removed called for view '{0}'.".format(this.id));
                    this.destroyBindings();
                };
                /**
                 * Disposes any bindings tracked by this object.
                 */
                ViewBase.prototype.destroy = function () {
                    this.destroyBindings();
                    _super.prototype.destroy.call(this);
                };
                /**
                 * Destroys all of this view's bindings, and by extension any views bound under this one.
                 * The primary purpose of this is to remove event subscriptions due to binding as well as dereferencing expensive DOM
                 * nodes so that they may be discarded.
                 */
                ViewBase.prototype.destroyBindings = function () {
                    if (this.isActive) {
                        this.app.viewManager.deactivateView(this);
                    }
                    if (!this.bindingTree) {
                        return;
                    }
                    this.bindingTree.destroy();
                    // Get rid of any custom bindings.
                    for (var bindingIndex = 0; bindingIndex < this.disposableBindings.length; ++bindingIndex) {
                        var binding = this.disposableBindings[bindingIndex];
                        binding["event"].unsubscribe(binding["token"]);
                    }
                    this.bound = false;
                    this.disposableBindings = [];
                    this.bindingSetupDelegates = [];
                };
                /**
                 * Performs the initial data bind of the UI.
                 */
                ViewBase.prototype.pulseAll = function () {
                    for (var i = 0; i < this.bindingSetupDelegates.length; ++i) {
                        try {
                            this.bindingSetupDelegates[i]();
                        }
                        catch (err) {
                            this.app.trace.error("Error performing initial data-bind in view '{0}' with view model '{1}': {2}".format(this.id, this.viewModel.id, err.message), err);
                        }
                    }
                    this.bindingSetupDelegates = [];
                };
                /**
                 * Override this method to resolve widgets by ID and context. Return a {@link geocortex.framework.config.WidgetConfig}, or null.
                 * @param widgetId The ID of the widget to resolve.
                 * @param context The data context (view model) to bind the widget view to.
                 * @param binding The binding expression that triggered this call to `resolveWidget`.
                 */
                ViewBase.prototype.resolveWidget = function (widgetId, context, binding) {
                    return null;
                };
                /**
                 * Builds a tree of all binding expressions in this view and hooks up binding events as it goes.
                 * This method will recursively descend the DOM structure of its visual root and resolve binding expressions.
                 */
                ViewBase.prototype.buildTree = function () {
                    var _this = this;
                    if (this.root == null) {
                        return;
                    }
                    // "build" will walk the tree recursively. We'll fire it recursively from itself and once below, starting at the visual root of this view.
                    function build(entry, element) {
                        // Parses raw binding expressions, splitting "{directive: target}{@directive: target}{@directive: @target}" into 3 tuples, for example.
                        function parseExpressions(exprString) {
                            var expressions = [];
                            if (!exprString) {
                                return expressions;
                            }
                            var rawExpressions = exprString.match(/\{(.*?)\}/g);
                            if (!rawExpressions) {
                                if (this.app) {
                                    this.app.trace.warning("Invalid data-binding expression '{0}'.".format(exprString));
                                    return [];
                                }
                                else {
                                    throw new Error("Invalid data-binding expression '{0}'.".format(exprString));
                                }
                            }
                            for (var i = 0; i < rawExpressions.length; ++i) {
                                var rawExpr = rawExpressions[i];
                                var exprPieces = rawExpr.split(":");
                                if (exprPieces.length != 2) {
                                    continue;
                                }
                                expressions.push({
                                    directive: exprPieces[0].replace("{", "").trim(),
                                    target: exprPieces[1].replace("}", "").trim()
                                });
                            }
                            return expressions;
                        }
                        ;
                        if (!element || !element.children) {
                            return;
                        }
                        // Walk over all children of element and satisfy the appropriate binding expressions.
                        for (var childIndex = 0; childIndex < element.children.length; ++childIndex) {
                            var el = element.children[childIndex];
                            var isRegion = dojo.attr(el, "data-region-name");
                            var bindingAttr = dojo.attr(el, "data-binding");
                            // If the actual attribute doesn't exist, it might mean that this view has had its binding attributes removed
                            // but is being bound again. If that's the case, we will have stashed away the original expressions.
                            if (!bindingAttr) {
                                bindingAttr = el["___dataBindingExpressions"];
                            }
                            // No bindings? Carry on down the DOM tree.
                            if (!bindingAttr) {
                                if (!isRegion) {
                                    build(entry, el);
                                }
                            }
                            else {
                                // Binding time. Grab the binding expressions, starting by matching everything in curly brackets.
                                var bindingExpressions = parseExpressions(bindingAttr);
                                // Remove the data-binding attribute from the DOM (even if malformed) and stash it somewhere safe.
                                el["___dataBindingExpressions"] = bindingAttr;
                                if (!_this.app.debugMode) {
                                    dojo.removeAttr(el, "data-binding");
                                }
                                if (!bindingExpressions || bindingExpressions.length === 0) {
                                    continue;
                                }
                                // If we encounter a collection binding, we need to halt recursion so we don't descend into its children and incorrectly
                                // bind the template element(s).
                                var halt = false;
                                // Handle each binding expression in the binding string. There may be multiple stacked together, e.g. '{src: imageSrc}{alt: imageAlt}'.
                                for (var i = 0; i < bindingExpressions.length; ++i) {
                                    // Since ECMAScript/JavaScript don't support proper closures, we need to wrap our looping callback-creating code in a func scope
                                    // to get the intended behaviour. See http://www.mennovanslooten.nl/blog/post/62 for more info.
                                    (function () {
                                        // Parsed expressions.
                                        var expressions = entry.expressions;
                                        var currentContext = entry.context;
                                        var error = false;
                                        var expr = bindingExpressions[i];
                                        // Extract the attribute name and binding target.
                                        var type = expr["directive"];
                                        var target = expr["target"];
                                        // Create a blank binding.
                                        var binding = new geocortex.framework.ui.BindingExpression();
                                        //binding.app = _this.app;
                                        //GVH-3198 removed redundant code which was called in the BindingExpression constructor
                                        binding.domElement = el;
                                        binding.target = target;
                                        if (_this.viewModel != null) {
                                            binding.viewModel = _this.viewModel;
                                        }
                                        else {
                                            binding.viewModel = {};
                                            binding.viewModel["id"] = "[None]";
                                        }
                                        if (_this.parentView) {
                                            binding.parentView = _this.parentView;
                                        }
                                        else {
                                            binding.parentView = _this;
                                        }
                                        // Parse binding expression, defaulting to simple attribute binding.
                                        // Pseudo-bindings
                                        if (type.startsWith("@")) {
                                            var modifierName = type.split("-")[1];
                                            // Pseudo-binding: "event"
                                            if (type.startsWith("@event-")) {
                                                if (modifierName) {
                                                    binding.type = "event";
                                                    binding.attributeName = modifierName;
                                                }
                                                else {
                                                    this.app.trace.warning("Binding error: Invalid event binding expression '{0}' in view '{1}'.".format(type, _this.id));
                                                    error = true;
                                                }
                                            }
                                            else if (type.startsWith("@var")) {
                                                binding.type = "var";
                                            }
                                            else if (type.startsWith("@text")) {
                                                binding.attributeName = "innerHTML";
                                                binding.type = "text";
                                            }
                                            else if (type.startsWith("@attach")) {
                                                binding.attributeName = "___attachedValue";
                                                binding.type = "attachment";
                                            }
                                            else if (type.startsWith("@style-")) {
                                                var stylePieceIndex = type.indexOf("-");
                                                var styleName = type.substring(stylePieceIndex + 1);
                                                if (styleName) {
                                                    binding.type = "style";
                                                    binding.attributeName = styleName;
                                                }
                                                else {
                                                    this.app.trace.warning("Binding error: Invalid style binding expression '{0}' in view '{1}'.".format(type, _this.id));
                                                    error = true;
                                                }
                                            }
                                            else if (type.startsWith("@dom")) {
                                                binding.type = "dom";
                                                binding.attributeName = modifierName;
                                            }
                                            else if (type.startsWith("@value")) {
                                                binding.type = "value";
                                                binding.attributeName = modifierName;
                                            }
                                            else if (type.startsWith("@widget")) {
                                                // Ditch the '@' symbol but preserve actual type (could be one of a few "widget-xxx" directives)
                                                binding.type = type.substring(1);
                                                binding.attributeName = modifierName;
                                                // We need access to the other binding expressions to resolve some other widget related expressions.
                                                binding["otherExpressions"] = bindingExpressions;
                                            }
                                            else if (type.startsWith("@class") || type.startsWith("@noclass")) {
                                                binding.type = "class";
                                                if (type.startsWith("@noclass")) {
                                                    binding.invert = true;
                                                }
                                                var classNameIndex = type.indexOf("-");
                                                var className = type.substring(classNameIndex + 1);
                                                if (className) {
                                                    binding.attributeName = className;
                                                }
                                                else {
                                                    this.app.trace.warning("Binding error: Invalid class binding expression '{0}' in view '{1}'.".format(type, _this.id));
                                                    error = true;
                                                }
                                            }
                                            else if (type === "@source") {
                                                binding.type = "source";
                                                binding.attributeName = "@source";
                                                halt = true;
                                                // There are three primary ways to specify templates:
                                                // 1) directly on the @source element with a @template directive
                                                // 2) on an inline template as a child of the @source element with @template-for.
                                                // 3) on one or more inline template elements with a "template-select" statement.
                                                // 1) First, look for a "template" directive on this source element, picking up on a "template-selector" if present.
                                                var externalTemplate = null;
                                                var templateSelector = null;
                                                // Look for an inline template by default (2).
                                                binding.templateMode = "single-inline";
                                                // Look over the rest of the binding expressions on this element.
                                                for (var otherExprIndex = 0; otherExprIndex < bindingExpressions.length; ++otherExprIndex) {
                                                    var otherExpr = bindingExpressions[otherExprIndex];
                                                    if (otherExpr === expr) {
                                                        continue;
                                                    }
                                                    var otherExprDirective = otherExpr["directive"];
                                                    var otherExprTarget = otherExpr["target"];
                                                    // If we have a "template" directive, we are dealing with an external template. We will try to load the single
                                                    // external template for future use.
                                                    if (otherExprDirective === "@template") {
                                                        binding.templateMode = "single-external";
                                                        var templateConfig = new framework.config.ViewConfig(null, null, null);
                                                        templateConfig.markupResource = otherExprTarget;
                                                        templateConfig.libraryId = _this.libraryId;
                                                        var templateElement = _this.app.viewManager.createView(templateConfig);
                                                        if (!templateElement) {
                                                            _this.app.trace.error("Could not instantiate template '{0}' while binding view '{1}'.".format(otherExprTarget, this.id));
                                                            break;
                                                        }
                                                        templateElement.app = _this.app;
                                                        // We have one template to select for - the one explicitly specified.
                                                        binding.templateSelections = {
                                                            "@default": templateElement.root
                                                        };
                                                        break;
                                                    }
                                                    else if (otherExprDirective === "@template-selector") {
                                                        binding.templateMode = "inline-selected";
                                                        binding.templateKey = otherExprTarget;
                                                        binding.templateSelections = {};
                                                        break;
                                                    }
                                                }
                                                // 2/3) If we are binding to single-inline or inline-selected template(s), we'll need to look through child elements of
                                                // this @source-bound element and find template candidates.
                                                if (binding.templateMode !== "single-external") {
                                                    // We'll need to orphan any inline templates we find, and we'll need to do it after iteration.
                                                    var templatesToOrphan = new dojo.NodeList();
                                                    // Since there was no direct "@template" reference on the parent element, one or more child elements will serve as the template(s).
                                                    // Iterate over child templates and build a selection set of templates we can use to present items.
                                                    for (var possibleTemplateIndex = 0; possibleTemplateIndex < el.children.length; ++possibleTemplateIndex) {
                                                        var possibleTemplate = el.children[possibleTemplateIndex];
                                                        var bindingAttr = dojo.attr(possibleTemplate, "data-binding");
                                                        // Look for template specifiers on this child item. This element will either be a selected inline template
                                                        // or a selected external template.
                                                        var possibleTemplateExprs = parseExpressions(bindingAttr);
                                                        for (var exprIndex = 0; exprIndex < possibleTemplateExprs.length; ++exprIndex) {
                                                            var bindingExpr = possibleTemplateExprs[exprIndex];
                                                            if (bindingExpr["directive"] === "@template-for" || bindingExpr["directive"] === "@template-select") {
                                                                // Did we find a single-inline template? Mark it as the default template selection.
                                                                if (bindingExpr["directive"] === "@template-for" && bindingExpr["target"] === binding.target) {
                                                                    // Mark the template as needing orphaning.
                                                                    templatesToOrphan.push(possibleTemplate);
                                                                    // Store the template element in the binding as the default template. We'll use this if we are either binding to it as
                                                                    // a single inline template, or if we are performing template selection and we find no match on the key field.
                                                                    var templateElement = dojo.clone(possibleTemplate);
                                                                    // TODO: Make this less evil
                                                                    binding.templateSelections["@default"] = templateElement;
                                                                    // Since this is an inline template, mark the original owner of it template so it can be replaced if/when we unbind the view.
                                                                    templateElement["___domParent"] = el;
                                                                }
                                                                else if (bindingExpr["directive"] === "@template-select") {
                                                                    // This thing is an inline template - remove it.
                                                                    templatesToOrphan.push(possibleTemplate);
                                                                    // Okay, we found a selectable template. This template will either be an inline or external template reference.
                                                                    // If this thing is an external template refernece, it will have a @template directive.
                                                                    // Let's look over the other binding expressions on this element to find @template. If we don't find it, we'll treat this
                                                                    // element as an inline template.
                                                                    var foundExternalTemplate = false;
                                                                    // Look for an external template reference.
                                                                    for (var templateBindingExprIndex = 0; templateBindingExprIndex < possibleTemplateExprs.length; ++templateBindingExprIndex) {
                                                                        var templateBindingExpr = possibleTemplateExprs[templateBindingExprIndex];
                                                                        // Do we have a selectable external template reference?
                                                                        if (templateBindingExpr["directive"] === "@template") {
                                                                            // Ok, this template selector references an external template. Load it, but as a child of this element.
                                                                            // The actual template item we create will be nested in the element that is associated with the template.
                                                                            // This allows us to have templates that are, for example, contained in divs but are bound into LI, TR, TD, etc. elements.
                                                                            var vc = new framework.config.ViewConfig(null, null, null);
                                                                            vc.markupResource = templateBindingExpr["target"];
                                                                            vc.libraryId = _this.libraryId;
                                                                            var templateElement = _this.app.viewManager.createView(vc);
                                                                            if (!templateElement) {
                                                                                this.app.trace.error("Could not instantiate template '{0}' while binding view '{1}'.".format(templateBindingExpr["target"], this.id));
                                                                                break;
                                                                            }
                                                                            templateElement.app = _this.app;
                                                                            // Clone the template container (the element with the selector) and host the external template within.
                                                                            var templateContainer = dojo.clone(possibleTemplate);
                                                                            // Place the template element inside.
                                                                            dojo.place(templateElement.root, templateContainer, "last");
                                                                            // Add the external template to the collection of selectable templates keyed with the @template-select target.
                                                                            binding.templateSelections[bindingExpr["target"]] = templateContainer;
                                                                            foundExternalTemplate = true;
                                                                            break;
                                                                        }
                                                                    }
                                                                    // If no external template reference was found, treat the selector element itself as the template.
                                                                    if (!foundExternalTemplate) {
                                                                        // This thing is an inline template - remove it.
                                                                        templatesToOrphan.push(possibleTemplate);
                                                                        // Add the external template to the collection of selectable templates keyed with the @template-select target.
                                                                        binding.templateSelections[bindingExpr["target"]] = possibleTemplate;
                                                                        // Mark this inline template so it can be restored.
                                                                        possibleTemplate["___domParent"] = el;
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    templatesToOrphan.orphan();
                                                }
                                            }
                                            else if (type === "@source-remove") {
                                                binding.type = "source-remove";
                                                binding.attributeName = modifierName;
                                            }
                                            else if (type === "@source-add") {
                                                binding.type = "source-add";
                                                binding.attributeName = modifierName;
                                            }
                                            else if (type === "@visible" || type === "@hidden") {
                                                // @hidden is the inverse of @visible (but still the same binding type).
                                                if (type === "@hidden") {
                                                    binding.invert = true;
                                                }
                                                binding.type = "visibility";
                                                binding.attributeName = "@visibility";
                                            }
                                            else if (type === "@disabled" || type === "@enabled") {
                                                // @disabled is the inverse of @enabled ( but still the same binding type).
                                                if (type === "@disabled") {
                                                    binding.invert = true;
                                                }
                                                binding.type = "disabledState";
                                                binding.attributeName = "@disabledState";
                                            }
                                            else if (type.startsWith("@template")) {
                                                binding.type = "template";
                                            }
                                            else if (type.startsWith("@halt")) {
                                                halt = true;
                                            }
                                            else {
                                                _this.app.trace.warning("Unknown binding term '{0}'.".format(type));
                                                error = true;
                                            }
                                        }
                                        else {
                                            // Default to attribute binding.
                                            binding.type = "attr";
                                            binding.attributeName = type;
                                        }
                                        if (!error) {
                                            if (_this.applyBinding.apply(_this, [el, binding, currentContext, entry])) {
                                                // We'll save all the bindings for this particular bound DOM node.
                                                expressions.push(binding);
                                            }
                                        }
                                    })(); // End of inner-loop function scope.
                                }
                                // Store a binding entry for this node.
                                var newEntry = new geocortex.framework.ui.BindingNode();
                                newEntry.domElement = el;
                                newEntry.parent = entry;
                                newEntry.context = entry.context;
                                newEntry.children = [];
                                newEntry.expressions = [];
                                entry.children.push(newEntry);
                                if (halt == false && !isRegion) {
                                    build(newEntry, el);
                                }
                            }
                        }
                    }
                    ;
                    // Create the root binding node.
                    var rootBindingNode = new geocortex.framework.ui.BindingNode();
                    rootBindingNode.domElement = null;
                    rootBindingNode.parent = null;
                    rootBindingNode.children = [];
                    rootBindingNode.context = this.viewModel;
                    // Build the binding tree, starting at the visual root of this view.
                    // As a simple workaround for GVH-4030, a synthetic container element is passed in. This is a low impact way of addressing the issue
                    // in the interim until ViewBase is refactored into a cleaner and more extensible binding engine.
                    build(rootBindingNode, {
                        children: [this.root]
                    });
                    return rootBindingNode;
                };
                /**
                * Returns the target of a binding expression, taking into consideration Observables and pseudo-targets.
                * @param binding The binding whose target should be resolved.
                */
                ViewBase.prototype.getBindingTarget = function (binding) {
                    // @context targets allow us to bind directly to a view model itself.
                    if (binding.target === "@context") {
                        return binding.viewModel;
                    }
                    // @language binds to an application language resource.
                    if (binding.target.indexOf("@language-") > -1) {
                        var keyParts = binding.target.split("-");
                        var languageKey = keyParts.slice(1).join("-");
                        return this.app.getResource(this.libraryId, "language-" + languageKey);
                    }
                    // Is the View Model itself an Observable? If that's the case, we'll need go through its level of indirection.
                    if (binding.viewModel.isObservable != true) {
                        return binding.viewModel[binding.target];
                    }
                    else {
                        var observableValue = binding.viewModel.get();
                        if (observableValue == null) {
                            return observableValue;
                        }
                        return observableValue[binding.target];
                    }
                };
                /**
                 * Sets the value of the target of a binding expression, taking into consideration Observables and pseudo-targets.
                 * @param binding The binding whose target should be resolved.
                 * @param value The value to set.
                 */
                ViewBase.prototype.setBindingTargetValue = function (binding, value) {
                    // @context means the view model itself.
                    if (binding.target === "@context") {
                        if (binding.viewModel && binding.viewModel.isObservable) {
                            binding.viewModel.set(value);
                        }
                        else {
                            binding.viewModel = value;
                        }
                        return;
                    }
                    // @language refers to a culture specific string - Don't do anything.
                    if (binding.target.indexOf("@language-") > -1) {
                        return;
                    }
                    // Is the View Model itself an Observable? If that's the case, we'll need go through its level of indirection.
                    if (!binding.viewModel.isObservable) {
                        if (!binding.viewModel[binding.target].isObservable) {
                            binding.viewModel[binding.target] = value;
                        }
                        else {
                            binding.viewModel[binding.target].set(value);
                        }
                        return;
                    }
                    else {
                        var observableValue = binding.viewModel.get();
                        if (!observableValue) {
                            return;
                        }
                        else if (observableValue[binding.target]) {
                            if (observableValue[binding.target].isObservable) {
                                observableValue[binding.target].set(value);
                            }
                            else {
                                observableValue[binding.target] = value;
                            }
                        }
                        else {
                            observableValue[binding.target] = new Observable(value);
                        }
                    }
                };
                /**
                 * Given a binding expression and a view model, resolves the correct template to use.
                 * @param binding The binding being satisfied.
                 * @param viewModel The view model participating in the binding.
                 */
                ViewBase.prototype.resolveBindingTemplate = function (binding, viewModel) {
                    var selectedTemplateInstance = null;
                    // If we have a single inline template or external template, use it.
                    if (binding.templateMode === "single-inline" || binding.templateMode === "single-external") {
                        selectedTemplateInstance = dojo.clone(binding.templateSelections["@default"]);
                    }
                    else if (binding.templateMode === "inline-selected") {
                        // Resolve the key value so we can select a template.
                        var keyValue = null;
                        if (viewModel[binding.templateKey]) {
                            keyValue = viewModel[binding.templateKey];
                            if (keyValue.isObservable) {
                                keyValue = keyValue.get();
                            }
                        }
                        if (!keyValue && binding.templateSelections.hasOwnProperty("@null")) {
                            selectedTemplateInstance = dojo.clone(binding.templateSelections["@null"]);
                        }
                        else if (binding.templateSelections.hasOwnProperty(keyValue)) {
                            selectedTemplateInstance = dojo.clone(binding.templateSelections[keyValue]);
                        }
                        // None selected yet? default.
                        if (!selectedTemplateInstance && binding.templateSelections.hasOwnProperty("@default")) {
                            selectedTemplateInstance = dojo.clone(binding.templateSelections["@default"]);
                            dojo.addClass(selectedTemplateInstance, "empty-div");
                        }
                    }
                    // If no template selection was possible, just create a div.
                    if (!selectedTemplateInstance) {
                        selectedTemplateInstance = dojo.create("div");
                    }
                    return selectedTemplateInstance;
                };
                /**
                 * Builds a complex binding between a `source` and `template` element.
                 * Allows binding to collections of complex objects or singular complex objects.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 * @param bindingNode The current binding node in the binding tree.
                 */
                ViewBase.prototype.buildSourceBinding = function (el, binding, currentContext, bindingNode) {
                    var _this = this;
                    var target = _this.getBindingTarget(binding);
                    // Check view model for existence of the observable collection (or something similar).
                    // If the target is null, that's ok - it exists but is explicitly null.
                    if (target === null) {
                        return false;
                    }
                    if (target === undefined) {
                        _this.app.trace.warning("Binding error: '{0}' in view model '{1}' was not bindable.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    var collection = target;
                    var cancelAllThrottledOperations = function () {
                        if (collection.useThrottling && collection.throttledOperations && collection.throttledOperations.length) {
                            for (var p = collection.throttledOperations.length - 1; p >= 0; p--) {
                                collection.throttledOperations[p].cancel();
                                collection.throttledOperations.splice(p, 1);
                            }
                        }
                    };
                    // This method performs the actual update when the binding is triggered.
                    var updateSourceBinding = function (args) {
                        if (binding["upToDate"] === true) {
                            binding["upToDate"] = false;
                            return;
                        }
                        // If this binding node has dynamic source binding handlers (@source-add or @source-remove), we'll assign them to the expression.
                        // Look for the first instance of each.
                        var addHandlerName = null;
                        var removeHandlerName = null;
                        for (var bindingExprIndex = 0; bindingExprIndex < bindingNode.expressions.length; ++bindingExprIndex) {
                            var expr = bindingNode.expressions[bindingExprIndex];
                            if (!addHandlerName && expr.type == "source-add") {
                                addHandlerName = expr.target;
                            }
                            if (!removeHandlerName && expr.type == "source-remove") {
                                removeHandlerName = expr.target;
                            }
                        }
                        // Point to the dynamic binding handlers in the view.
                        var eventReceiverView = this;
                        if (binding.parentView) {
                            eventReceiverView = binding.parentView;
                        }
                        var addHandler = eventReceiverView[addHandlerName];
                        var removeHandler = eventReceiverView[removeHandlerName];
                        if (args === undefined || args === null) {
                            return;
                        }
                        // Handle non-collection objects.
                        if (!(args instanceof geocortex.framework.events.CollectionChangedArgs)) {
                            var value = args.isObservable ? args.get() : args;
                            // Remove existing element(s), using a remove handler if specified ("@source-remove").
                            if (removeHandler) {
                                removeHandler.apply(_this, [binding, value, args, 0]);
                            }
                            // Dispose of existing sub views, most likely there will only be one.
                            for (var i = 0; i < binding.boundViews.length; ++i) {
                                this.app.viewManager.destroyView(binding.boundViews[i]);
                            }
                            binding.boundViews = [];
                            // If no remove handler was used, remove the DOM node the old fashioned way.
                            if (!removeHandler) {
                                var item = binding["___singleSourceItem"];
                                if (item) {
                                    var nl = new dojo.NodeList();
                                    nl.push(item);
                                    nl.orphan();
                                    binding["___singleSourceItem"] = null;
                                }
                            }
                            if (value) {
                                // If we have a special add handler, use it to build the element.
                                if (addHandler) {
                                    addHandler.apply(_this, [binding, value, args, 0]);
                                }
                                else {
                                    var foundTemplate = false;
                                    // Resolve our template item.
                                    var selectedTemplateInstance = _this.resolveBindingTemplate(binding, value);
                                    // Place the template, we'll modify it in place.
                                    dojo.place(selectedTemplateInstance, binding.domElement, "last");
                                    // Create a child view. This will handle binding. We'll pass the child view a parent
                                    // reference so that bound events can be sent to the correct view.
                                    var view = new geocortex.framework.ui.ViewBase(_this.app);
                                    view.parentView = binding.parentView;
                                    view.app = view.parentView.app;
                                    view.libraryId = _this.libraryId;
                                    // In order to support template objects with binding expressions at their root levels, we need
                                    // to wrap the template instance in a parent object.
                                    // TODO: Fix buildTree so this isn't the case.
                                    var containerObject = { children: [] };
                                    containerObject.children.push(selectedTemplateInstance);
                                    // Mark this view with the instance of the bound view.
                                    var viewModel = value;
                                    // If our view model (a raw value) is null, we'll just make a dummy one. This will be replaced by a real one
                                    // if the bound property is set() to one.
                                    if (!viewModel) {
                                        viewModel = new geocortex.framework.ui.ViewModelBase(_this.app, _this.libraryId);
                                        viewModel.app = _this.app;
                                        viewModel.libraryId = _this.libraryId;
                                    }
                                    if (!viewModel["___boundViews"]) {
                                    }
                                    // Note: If viewModel is a primitive type (Number, String, Boolean, null, undefined), then the ___boundViews
                                    // property won't actually be attached. Yikes!.
                                    if (viewModel.hasOwnProperty("___boundViews")) {
                                    }
                                    // TODO: Make this less evil.
                                    view.root = containerObject;
                                    view.attach(viewModel);
                                    // Re-assign the root to the actual content.
                                    view.root = selectedTemplateInstance;
                                    binding["___singleSourceItem"] = view.root;
                                    // Hold a reference to the parent view in the DOM element for when we clean it up.
                                    binding.boundViews.push(view);
                                }
                            }
                        }
                        else if (args === null || args.type === "clear") {
                            // GVH-1044: Cancel any throttled binding operations which are are underway. This is pretty much the only way to ensure that we dont 
                            // inadvertently alter/ clear a collection while throttling is in progress.
                            cancelAllThrottledOperations();
                            // If this collection has a special remove handler ("@source-remove"), invoke it on each item to be cleared.
                            if (removeHandler) {
                                for (var i = args.rangeStart; i <= args.rangeEnd; ++i) {
                                    removeHandler.apply(_this, [binding, collection.getAt(i), args, i]);
                                }
                            }
                            // Dispose of existing sub views.
                            for (var i = 0; i < binding.boundViews.length; ++i) {
                                this.app.viewManager.destroyView(binding.boundViews[i]);
                            }
                            binding.boundViews = [];
                            // If no remove handler is present, empty the control (save for the collection template).
                            if (!removeHandler) {
                                if (binding.domElement != null && binding.domElement.children != null) {
                                    var nl = new dojo.NodeList();
                                    for (var i = 0; i < binding.domElement.children.length; ++i) {
                                        if (!binding.domElement.children[i]["___collectionTemplate"]) {
                                            nl.push(binding.domElement.children[i]);
                                        }
                                    }
                                    nl.orphan();
                                }
                            }
                        }
                        else if (args.type === "replace") {
                            // GVH-1044: Cancel any throttled binding operations which are are underway. This is pretty much the only way to ensure that we dont 
                            // inadvertently alter/ clear a collection while throttling is in progress.
                            cancelAllThrottledOperations();
                            // If this collection has a special remove handler ("@source-remove"), invoke it on each item to be cleared.
                            if (removeHandler) {
                                for (var i = args.rangeStart; i < args.rangeEnd + 1; ++i) {
                                    removeHandler.apply(_this, [binding, collection.getAt(i), args, i]);
                                }
                            }
                            // Dispose.
                            for (var i = 0; i < binding.boundViews.length; ++i) {
                                this.app.viewManager.destroyView(binding.boundViews[i]);
                            }
                            binding.boundViews = [];
                            // If no remove handler is present, empty the control.
                            if (!removeHandler) {
                                dojo.empty(binding.domElement);
                            }
                            // Continue by treating the operation as an append to our newly empty collection.
                            args.type = "append";
                            args.rangeStart = 0;
                            args.rangeEnd = collection.value.length - 1;
                        }
                        // Append / Insert
                        if (args.type === "append" || args.type === "insert") {
                            // If we're inserting, we'll grab an anchor node to insert after.
                            var anchorNode = null;
                            if (args.type === "insert" && binding.domElement.children.length > args.rangeStart) {
                                anchorNode = binding.domElement.children[args.rangeStart];
                            }
                            // This closure can be called multiple times over multiple discrete ranges of the collection to throttle binding operations.
                            // This prevents the main JavaScript thread from being blocked for long periods of time and rendering the application unuseable.
                            var addRange = function (start, end, optionalCollArray) {
                                if (start > end) {
                                    return false;
                                }
                                // GVH-7996: There may be cases when a view/bindings are destroyed before throttling is completed. In this scenario, the dom element will be set to null. Break.
                                if (!binding || binding.domElement == null) {
                                    return false;
                                }
                                var coll = optionalCollArray ? optionalCollArray : collection;
                                // Add each member to the collection.
                                for (var i = start; i <= end; ++i) {
                                    var templateInstance = null;
                                    // If we have an add handler defined, use it. Otherwise use conventional binding.
                                    if (addHandler != null) {
                                        addHandler.apply(_this, [binding, coll.isObservable ? coll.getAt(i) : coll[i], args, i]);
                                    }
                                    else {
                                        // Mark this view with the instance of the bound view.
                                        var viewModel = coll.isObservable ? coll.getAt(i) : coll[i];
                                        // Resolve the binding template.
                                        templateInstance = _this.resolveBindingTemplate(binding, viewModel);
                                        if (anchorNode && args.type === "insert") {
                                            dojo.place(templateInstance, anchorNode, "before");
                                        }
                                        else if (anchorNode && args.type === "append") {
                                            dojo.place(templateInstance, anchorNode, "after");
                                        }
                                        else if (binding && binding.domElement != null) {
                                            dojo.place(templateInstance, binding.domElement, "last");
                                        }
                                        else {
                                            // GVH-7996. See previous note.
                                            return false;
                                        }
                                        // Create a child view. This will handle binding. We'll pass the child view a parent
                                        // reference so that bound events can be sent to the correct view.
                                        var view = new geocortex.framework.ui.ViewBase(_this.app, _this.libraryId);
                                        view.parentView = binding.parentView;
                                        view.app = view.parentView.app;
                                        view.libraryId = _this.libraryId;
                                        view.id += "-item" + i;
                                        // In order to support template objects with binding expressions at their root levels, we need
                                        // to wrap the template instance in a parent object. 
                                        var containerObject = { children: [] };
                                        containerObject.children.push(templateInstance);
                                        if (viewModel === null || viewModel === undefined) {
                                            viewModel = new geocortex.framework.ui.ViewModelBase(_this.app, _this.libraryId);
                                            viewModel.app = _this.app;
                                            viewModel.libraryId = _this.libraryId;
                                        }
                                        if (!viewModel["___boundViews"]) {
                                        }
                                        // Can't attach propeties to primitives...
                                        if (viewModel.hasOwnProperty("___boundViews")) {
                                        }
                                        // TODO: Fix.
                                        view.root = containerObject;
                                        view.attach(viewModel);
                                        // Re-assign the root to the actual content.
                                        view.root = templateInstance;
                                        // Hold a reference to the parent view in the DOM element for when we clean it up.
                                        binding.boundViews.push(view);
                                    }
                                }
                                // If this element needs an initial "onchange" event to set a @value binding, fire it.
                                if (el["___populateInitialValueFunc"]) {
                                    el["___populateInitialValueFunc"]();
                                    //GVH-3192
                                    delete el["___populateInitialValueFunc"];
                                }
                                return true;
                            };
                            // If the collection is not marked for throttling, add the entire range in one go.
                            if (!collection.useThrottling) {
                                addRange(args.rangeStart, args.rangeEnd);
                            }
                            else {
                                // Collection is marked for throttling.
                                collection.throttledOperations = (collection.throttledOperations && collection.throttledOperations.constructor === Array) ? collection.throttledOperations : [];
                                var throttleChunkSize = 10;
                                var throttleDelay = collection.throttleDelay == undefined ? 0 : collection.throttleDelay;
                                var s = args.rangeStart;
                                var e = Math.min(s + throttleChunkSize - 1, args.rangeEnd);
                                var collArray = collection.get().slice(0);
                                var terminateThrottler = function () {
                                    var throttleIndex = collection.throttledOperations.indexOf(throttler);
                                    if (throttleIndex > -1) {
                                        collection.throttledOperations.splice(throttleIndex, 1);
                                    }
                                };
                                var throttler = new geocortex.framework.utils.ThrottledOperation(throttleDelay, function () {
                                    var result = addRange(s, e, collArray);
                                    if (e >= args.rangeEnd) {
                                        terminateThrottler();
                                        return false;
                                    }
                                    s += throttleChunkSize;
                                    e += throttleChunkSize;
                                    e = Math.min(e, args.rangeEnd);
                                    if (!result) {
                                        terminateThrottler();
                                    }
                                    return result;
                                });
                                collection.throttledOperations.push(throttler);
                            }
                        }
                        else if (args.type === "remove") {
                            // GVH-1044: Cancel any throttled binding operations which are are underway. This is pretty much the only way to ensure that we dont 
                            // inadvertently alter/ clear a collection while throttling is in progress.
                            cancelAllThrottledOperations();
                            // Iterate over the range of items being removed, destroying any related views.
                            for (var itemIndex = args.rangeStart; itemIndex <= args.rangeEnd; ++itemIndex) {
                                // For each item being destroyed, check if there is a matching view in this binding.
                                for (var childviewIndex = 0; childviewIndex < binding.boundViews.length; ++childviewIndex) {
                                    var boundView = binding.boundViews[childviewIndex];
                                    // Do we have a view with a view model that matches an element being removed from the collection? destroy.
                                    if ((boundView.viewModel !== null && boundView.viewModel !== undefined) && boundView.viewModel == target.getAt(itemIndex)) {
                                        // Use the remove handler, if present.
                                        if (removeHandler) {
                                            removeHandler.apply(_this, [binding, args[itemIndex], args, itemIndex]);
                                        }
                                        else {
                                            _this.app.viewManager.destroyView(boundView);
                                        }
                                        // TODO: Optimize this with a slice instead of another lookup.
                                        Array.removeItem(binding.boundViews, boundView);
                                        // Step back, since we just deleted an item.
                                        --childviewIndex;
                                    }
                                }
                            }
                        }
                    };
                    // Bind to the observable's changed event. In the case of ObservableCollection, the update function will be passed a
                    // CollectionChangedArgs object. In the case of an Observable, a new singular value will be passed.
                    if (collection.bind) {
                        binding.targetBindings.push({ event: collection.bindingEvent, token: collection.bind(_this, updateSourceBinding) });
                    }
                    // Schedule a binding setup delegate to satisfy the binding once the view is ready.
                    if (collection.isObservableCollection) {
                        var end = collection.getLength() - 1;
                        this.bindingSetupDelegates.push(function () {
                            // Perform the initial update with a synthetic CollectionChangedArgs that represents the entire collection in an append operation.
                            var args = new geocortex.framework.events.CollectionChangedArgs();
                            args.type = "append";
                            args.rangeStart = 0;
                            args.rangeEnd = end;
                            args.sender = collection;
                            updateSourceBinding.apply(_this, [args]);
                            // If we're creating bindings to something that is currently publishing a binding event, we need to mark the binding
                            // as being up to date and skip it in the next update or else we will end up with the initial update happening and
                            // followed by the regular update, resulting in duplicated operations.
                            if (collection.isObservable && collection.bindingEvent.isPublishing) {
                                binding["upToDate"] = true;
                            }
                        });
                    }
                    else {
                        this.bindingSetupDelegates.push(function () {
                            updateSourceBinding.apply(_this, [target]);
                            if (collection.isObservable && collection.bindingEvent.isPublishing) {
                                binding["upToDate"] = true;
                            }
                        });
                    }
                };
                /**
                 * Builds an event binding, binding a DOM event to an event handler in the view.
                 */
                ViewBase.prototype.buildEventBinding = function (el, binding, currentContext) {
                    var eventReceiverView = this;
                    // If the target is not found in the current view, then look for it in the parent
                    if (!this[binding.target] && binding.parentView && binding.parentView[binding.target]) {
                        eventReceiverView = binding.parentView;
                    }
                    if (!eventReceiverView[binding.target]) {
                        this.app.trace.warning("Binding error: Event handler '{0}' was not found in view '{1}' or its parent view.".format(binding.target, eventReceiverView.id));
                        return false;
                    }
                    else {
                        // Fire the specified event handler, passing in 1) the DOM event, 2) the DOM element, and 3) the data context of the element.
                        if (el != binding.domElement) {
                            this.app.trace.warning("Binding error: buildEventBinding passed in el that doesn't match binding.domElement.");
                        }
                        binding.on(binding.attributeName, function (event) {
                            var result = eventReceiverView[binding.target](event, el, currentContext);
                            if (!result) {
                                // This is the equivalent of the old dojo.stopEvent
                                event.preventDefault();
                                event.stopPropagation();
                                return false;
                            }
                            return result;
                        });
                    }
                };
                /**
                 * Builds a var binding, creating a variable in the view that references a DOM element.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildVarBinding = function (el, binding, currentContext) {
                    var targetView = this;
                    // The variable will be declared in the parent view, if any.
                    if (binding.parentView) {
                        targetView = binding.parentView;
                    }
                    var target = targetView[binding.target];
                    // Does the target var exist yet? If not, create it.
                    if (!target) {
                        targetView[binding.target] = el;
                    }
                    else if (target && target instanceof Array) {
                        target.push(el);
                    }
                    else if (target && target.isObservableCollection) {
                        target.addItem(el);
                    }
                    else {
                        targetView[binding.target] = el;
                    }
                };
                /**
                 * Builds a sanitized text binding. Strips out unsafe characters, and allows direct referencing of language keys.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildTextBinding = function (el, binding, currentContext) {
                    var target = this.getBindingTarget(binding);
                    if (target === null) {
                        return false;
                    }
                    // Check view model for existence of the attribute.
                    if (target === undefined) {
                        this.app.trace.warning("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    var updateTextBinding = function () {
                        if (target != null && !target.isObservable) {
                            // This property is non-observable - set value initially for a one-time binding.
                            if (binding.attributeName === "innerHTML") {
                                dojo.empty(el);
                                el.appendChild(document.createTextNode(target));
                            }
                            else {
                                dojo.attr(el, binding.attributeName, String.escapeHtml(target));
                            }
                        }
                        else {
                            var value = target.get();
                            if (value === null || value === undefined) {
                                value = "";
                            }
                            else {
                                value = value.toString();
                            }
                            if (binding.attributeName === "innerHTML") {
                                dojo.empty(el);
                                el.appendChild(dojo.doc.createTextNode(value));
                            }
                            else {
                                dojo.attr(el, binding.attributeName, String.escapeHtml(value));
                            }
                        }
                    };
                    // Set up the binding. When the setter of the observable target property is changed, we'll just copy that value into our
                    // DOM element using the attribute name specified.
                    if (target.isObservable) {
                        binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(this, updateTextBinding) });
                    }
                    // Mark the member to be pulsed.
                    this.bindingSetupDelegates.push(function () {
                        updateTextBinding.apply(this, [null]);
                    });
                };
                /**
                 * Builds a DOM attribute binding, binding a DOM attribute to a view model property or attaching directly to the DOM object.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 * @param directAttach Whether or not to directly modify the actual DOM element's own properties. Defaults to `false`.
                 */
                ViewBase.prototype.buildAttributeBinding = function (el, binding, currentContext, directAttach) {
                    var target = this.getBindingTarget(binding);
                    // Check view model for existence of the attribute.
                    if (typeof target === "undefined") {
                        this.app.trace.warning("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    var updateAttributeBinding = function () {
                        if (target === null) {
                            dojo.attr(el, binding.attributeName, "");
                            return false;
                        }
                        else if (!target.isObservable) {
                            // Don't show "null" or "undefined".
                            if (target === null || target === undefined) {
                                target = "";
                            }
                            // This property is non-observable - set value initially for a one-time binding.
                            if (directAttach === true) {
                                el[binding.attributeName] = target;
                            }
                            else {
                                dojo.attr(el, binding.attributeName, target);
                            }
                        }
                        else {
                            var val = target.get();
                            // Don't show "null" or "undefined".
                            if (val === null || val === undefined) {
                                val = "";
                            }
                            if (directAttach === true) {
                                el[binding.attributeName] = val;
                            }
                            else {
                                dojo.attr(el, binding.attributeName, val);
                            }
                        }
                    };
                    // Set up the binding. When the setter of the observable target property is changed, we'll just copy that value into our
                    // DOM element using the attribute name specified.
                    if (target !== null && target.isObservable) {
                        binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(this, updateAttributeBinding) });
                    }
                    // Mark the member to be pulsed.
                    this.bindingSetupDelegates.push(function () {
                        updateAttributeBinding.apply(this, [null]);
                    });
                };
                /**
                 * Builds an inline CSS style binding.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildStyleBinding = function (el, binding, currentContext) {
                    var _this = this;
                    var target = this.getBindingTarget(binding);
                    if (target === null) {
                        return false;
                    }
                    // Preps the style for application.
                    var prepStyle = function (styleName, styleValue) {
                        if (!isNaN(styleValue) && styleValue !== "") {
                            return styleValue + "px";
                        }
                        return styleValue;
                    };
                    // Check view model for existence of the attribute.
                    if (target === undefined) {
                        this.app.trace.warning("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    else if (target != null && !target.isObservable) {
                        // This property is non-observable - set value initially for a one-time binding.
                        var styleValue = prepStyle(binding.attributeName, target);
                        dojo.style(el, binding.attributeName, styleValue);
                    }
                    else if (target != null) {
                        // Set up an actual binding.
                        var updateStyleBinding = function () {
                            var styleValue = prepStyle(binding.attributeName, target.get());
                            dojo.style(el, binding.attributeName, styleValue);
                        };
                        if (target.isObservable) {
                            binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(this, updateStyleBinding) });
                        }
                        // Mark the member to be pulsed.
                        this.bindingSetupDelegates.push(function () {
                            updateStyleBinding.apply(_this, [null]);
                        });
                    }
                };
                /**
                 * Builds a one-time DOM binding, binding to a DOM element in the view codebehind.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildDomBinding = function (el, binding, currentContext) {
                    var targetView = this;
                    // The variable will be declared in the parent view, if any.
                    if (binding.parentView) {
                        targetView = binding.parentView;
                    }
                    var target = targetView[binding.target];
                    if (target == null) {
                        return false;
                    }
                    // Check view model for existence of the attribute.
                    if (target === undefined) {
                        this.app.trace.warning("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    else {
                        try {
                            if (target.isObservable) {
                                binding.targetBindings.push({
                                    event: target.bindingEvent, token: target.bind(this, function (value) {
                                        if (!target.get()) {
                                            return false;
                                        }
                                        binding.domElement = dojo.place(target.get(), binding.domElement, "replace");
                                        // If we have a valid app instance, broadcast the fact that we may have changed our dimensions.
                                        if (this.app) {
                                            this.app.viewManager.notifyDimensionsChanged(this);
                                        }
                                    })
                                });
                                if (!target.get()) {
                                    return false;
                                }
                                dojo.place(target.get(), binding.domElement, "replace");
                            }
                            else {
                                if (!target) {
                                    return false;
                                }
                                dojo.place(target, binding.domElement, "replace");
                            }
                        }
                        catch (err) {
                            this.app.trace.warning("Binding error: An error occurred in view '{0}' while attempting to perform a DOM binding in view model '{1}'.".format(this.id, binding.viewModel.id));
                        }
                    }
                };
                /**
                 * Creates a new view, given a WidgetConfig object.
                 * @private
                 */
                ViewBase.prototype._createWidgetViewFromConfig = function (widgetConfig, currentContext) {
                    /*
                     * TODO: this method is a good candidate for wider usage. There are scenarios where
                     * a module may want to fire up a widget. Consider making this a public utility.
                     * FormRenderer.getItemView is one such usage. Currently it has just duplicated the
                     * relevant bits of logic.
                     */
                    // Inserts a widget based on a widget config.
                    var viewType = widgetConfig.type;
                    var widgetViewId = widgetConfig.id ?
                        "WidgetView-{0}-{1}".format(widgetConfig.id, geocortex.framework.utils.alphaNumericToken()) :
                        "{0}-{1}".format(geocortex.framework.utils.alphaNumericToken(), geocortex.framework.utils.alphaNumericToken());
                    var viewArgs = new framework.config.ViewConfig(widgetViewId, null, viewType || "geocortex.framework.ui.ViewBase");
                    viewArgs.isVisible = true;
                    viewArgs.libraryId = widgetConfig.libraryId;
                    if (widgetConfig.markup) {
                        viewArgs.markupResource = widgetConfig.markup;
                    }
                    widgetConfig = this.app.translateConfiguration(widgetConfig.libraryId, widgetConfig);
                    // Resolve view model.
                    // If we used explicit context (@widget-context), use that.
                    // If we have a view model ID, look it up and use it.
                    // If we have a view model type, create a new view model of that type and bind to it.
                    var viewModel = null;
                    if (widgetConfig.viewModelId) {
                        // Look up the view model
                        viewModel = this.app.getFrameworkObjectById(widgetConfig.viewModelId);
                        if (!viewModel) {
                            throw new Error("Could not bind widget '{0}' to view model with ID '{1}': View model not found.".format(widgetConfig.Id, widgetConfig.viewModelId));
                        }
                    }
                    else if (widgetConfig.viewModelType) {
                        viewModel = this.app.instantiateFrameworkObject(widgetConfig.viewModelType, widgetConfig.libraryId);
                        if (!widgetConfig.id) {
                            widgetConfig.id = geocortex.framework.utils.alphaNumericToken();
                        }
                        // Construct the view model.
                        viewModel.id = "WidgetViewModel-{0}-{1}".format(widgetConfig.id, geocortex.framework.utils.alphaNumericToken());
                    }
                    else {
                        // Default to the host view's view model.
                        viewModel = currentContext;
                    }
                    // Create the widget view!
                    var widgetView = this.app.viewManager.createView(viewArgs);
                    if (!widgetView) {
                        throw new Error("Could not create widget '{0}': The widget's view could not be created.".format(widgetConfig.Id));
                    }
                    widgetView.configuration = widgetConfig.configuration;
                    // In order to support template objects with binding expressions at their root levels, we need
                    // to wrap the template instance in a parent object.
                    // TODO: Fix buildTree so this isn't the case.
                    var containerObject = { children: [] };
                    containerObject.children.push(widgetView.root);
                    // TODO: Make this less evil. 
                    widgetView.root = containerObject;
                    widgetView.attach(viewModel);
                    widgetView.root = containerObject.children[0];
                    return widgetView;
                };
                /**
                 * Builds a (one-time) widget binding.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildWidgetBinding = function (el, binding, currentContext) {
                    var _this = this;
                    var widgetId = binding.target;
                    var target = this.viewModel;
                    // Grab any other widget-related binding expressions from this element, if present.
                    var isRequired = true;
                    var shouldReplaceReferringNode = false;
                    var explicitContext = null;
                    var widgetContextIsObservable = null;
                    // This binding will likely have been "tagged" with the full set of binding expressions on this node.
                    // Pull out some key flags and binding parameters related to widget-binding.
                    if (binding["otherExpressions"]) {
                        for (var i = 0; i < binding["otherExpressions"].length; ++i) {
                            var b = binding["otherExpressions"][i];
                            // The "@widget-context" directive allows the widget to bind to a property on the current context.
                            if (b.directive === "@widget-context") {
                                binding.target = b.target;
                                target = this.getBindingTarget(binding);
                                if (!target) {
                                    this.app.trace.error("Error binding widget '{0}' to target '{1}': Target was not found in view model.".format(widgetId, b.target));
                                    return false;
                                }
                                // If the target is observable, we'll bind it to the function we use to create the view.
                                explicitContext = target;
                            }
                            else if (b.directive === "@widget-required") {
                                isRequired = !(b.target.toLowerCase() === "false");
                            }
                            else if (b.directive === "@widget-replace") {
                                shouldReplaceReferringNode = (b.target.toLowerCase() === "true");
                            }
                        }
                    }
                    // 
                    widgetContextIsObservable = target && target.isObservable;
                    // Attempt to resolve the widget, first by searching configuration.
                    var widgetConfigs = this.app.configModel.widgetConfigs;
                    var widgetConfig = null;
                    for (var i = 0; i < widgetConfigs.length; ++i) {
                        var thisWidgetConfig = widgetConfigs[i];
                        if (thisWidgetConfig.id !== widgetId) {
                            continue;
                        }
                        else {
                            widgetConfig = thisWidgetConfig;
                            break;
                        }
                    }
                    var dynamicResolution = !widgetConfig;
                    // ... widgets bound directly to collections?
                    // Widgets specified in configuration will be resolved once, and if explicit widget context is specified
                    // they will be re-attached when the context is changed.
                    var dynamicResolve = function () {
                        var widgetCtx = (explicitContext || null);
                        if (widgetCtx && widgetCtx.isObservable) {
                            widgetCtx = widgetCtx.get();
                        }
                        var resolvedWidgetObject = (binding.parentView || this).resolveWidget(widgetId, widgetCtx, binding);
                        // Did we manage to get one?
                        if (!resolvedWidgetObject) {
                            if (isRequired) {
                                throw new Error("Widget '{0}' was not found.".format(widgetId));
                            }
                            return false;
                        }
                        return resolvedWidgetObject;
                    };
                    // We have a return value from resolveWidget. This return value could be a WidgetConfig, a view, or a piece of DOM.
                    // This method will be called multiple times if the widget is bound to an explicit, observable context (e.g. "{@widget-context: observableThing)").
                    var insertWidgetObject = function insertWidgetFunc(resolvedWidgetObject, widgetContext) {
                        var domElement = null;
                        // First, dispose of the existing widget element. If it's a view, destroy it properly.
                        if (binding.boundViews.length > 0) {
                            for (var i = 0; i < binding.boundViews.length; ++i) {
                                var boundView = binding.boundViews[i];
                                _this.app.viewManager.destroyView(boundView);
                            }
                        }
                        // Empty this container.
                        dojo.empty(binding.domElement);
                        var widgetView = null;
                        // Scenario 1: resolveWidget returns nothing.
                        if (!resolvedWidgetObject) {
                            return;
                        }
                        else if (typeof resolvedWidgetObject === "string") {
                            // We'll need to turn this string into a single-root DOM element.
                            // We'll create it in a DIV and if that DIV has only one inner child, we'll use that
                            // as our new widget. Otherwise, we'll use the single outer DIV that we created.
                            var hostDiv = dojo.create("div");
                            dojo.attr(hostDiv, "innerHTML", resolvedWidgetObject);
                            dojo.addClass(hostDiv, "empty-div");
                            if (hostDiv.children && hostDiv.children.length === 1) {
                                domElement = hostDiv.children[0];
                            }
                            else {
                                domElement = hostDiv;
                            }
                        }
                        else if (resolvedWidgetObject.hasOwnProperty("nodeType") && [1, 2, 3, 8, 9].contains(widgetConfig.nodeType)) {
                            domElement = resolvedWidgetObject;
                        }
                        else if (resolvedWidgetObject instanceof geocortex.framework.ui.ViewBase) {
                            widgetView = resolvedWidgetObject;
                            binding.boundViews.push(widgetView);
                            domElement = resolvedWidgetObject.root;
                        }
                        else if (resolvedWidgetObject instanceof geocortex.framework.config.WidgetConfig) {
                            widgetView = _this._createWidgetViewFromConfig(resolvedWidgetObject, widgetContext);
                            binding.boundViews.push(widgetView);
                            domElement = widgetView.root;
                        }
                        else {
                            _this.app.trace.warning("Could not resolve widget '{0}': Object of unknown type provided.".format(widgetId));
                            return;
                        }
                        dojo.place(domElement, binding.domElement, shouldReplaceReferringNode ? "replace" : "last");
                        // If we have a proper view, call "added" and let it do initialization.
                        if (widgetView) {
                            widgetView.added(_this);
                            widgetView.activated();
                        }
                    };
                    // Default to the library ID of the host component, but allow widgets to specify.
                    var libraryId = this.libraryId;
                    if (widgetConfig && widgetConfig.libraryId) {
                        libraryId = widgetConfig.libraryId;
                    }
                    // Set the the handler if the context is observable.
                    if (widgetContextIsObservable) {
                        binding.targetBindings.push({
                            event: target.bindingEvent,
                            token: target.bind(this, function (value) {
                                if (dynamicResolution) {
                                    var widgetElement = dynamicResolve();
                                    insertWidgetObject(widgetElement, value);
                                }
                                else {
                                    insertWidgetObject(widgetConfig, value);
                                }
                            })
                        });
                    }
                    // Set up an initial bind.
                    this.bindingSetupDelegates.push(function () {
                        var value = null;
                        if (target) {
                            value = target.isObservable ? target.get() : target;
                        }
                        else {
                        }
                        if (dynamicResolution) {
                            var widgetElement = dynamicResolve();
                            insertWidgetObject(widgetElement, value);
                        }
                        else {
                            insertWidgetObject(widgetConfig, value);
                        }
                    });
                };
                ViewBase.prototype.buildClassBinding = function (el, binding, currentContext) {
                    var target = this.getBindingTarget(binding);
                    if (target === null) {
                        return false;
                    }
                    if (target === undefined) {
                        this.app.trace.debug("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    else {
                        // This method will be used to update the visibility binding.
                        var updateClassBinding = function (value) {
                            var shouldDisplay = _this.isTruthy(value);
                            if (binding.invert === true) {
                                shouldDisplay = !shouldDisplay;
                            }
                            var displayClass = binding.attributeName;
                            if (shouldDisplay === true) {
                                dojo.removeClass(el, displayClass);
                                dojo.addClass(el, displayClass);
                            }
                            else {
                                dojo.removeClass(el, displayClass);
                            }
                        };
                        // Bind the handler that will calculate visibility.
                        var _this = this;
                        if (target.isObservable) {
                            binding.targetBindings.push({
                                event: target.bindingEvent,
                                token: target.bind(this, updateClassBinding)
                            });
                        }
                        // Mark the member to be pulsed.
                        this.bindingSetupDelegates.push(function () {
                            updateClassBinding.apply(_this, [target]);
                        });
                    }
                };
                /**
                 * Given some sort of thing, decide whether or not it is "truthy". Works with {@link ObservableCollection}.
                 * @param thing The thing to check truthiness upon.
                 */
                ViewBase.prototype.isTruthy = function (thing) {
                    if (!thing) {
                        return false;
                    }
                    else {
                        // Special case: If the value is a CollectionChangedArgs, we'll deduce the result of the collection
                        // change and determine visibility based on the state of the collection.
                        if (thing instanceof geocortex.framework.events.CollectionChangedArgs) {
                            var collectionChangedArgs = thing;
                            if (collectionChangedArgs.type === "append") {
                                var len = (collectionChangedArgs.rangeEnd + 1) - collectionChangedArgs.rangeStart;
                                // If the collection will end up with items, or already has items, visible = true.
                                if (len > 0 || (collectionChangedArgs.sender.value && collectionChangedArgs.sender.value.length > 0)) {
                                    return true;
                                }
                            }
                            else if (collectionChangedArgs.type === "clear") {
                                return false;
                            }
                            else if (collectionChangedArgs.type === "insert") {
                                if ((collectionChangedArgs.rangeEnd + 1) - collectionChangedArgs.rangeStart > 0) {
                                    return true;
                                }
                            }
                            else if (thing.type === "remove") {
                                if (((collectionChangedArgs.rangeEnd + 1) - collectionChangedArgs.rangeStart) < collectionChangedArgs.sender.value.length) {
                                    return true;
                                }
                            }
                        }
                        else if (thing.isObservableCollection) {
                            return thing.getLength() > 0;
                        }
                        else if (thing.isObservable) {
                            return !!thing.get();
                        }
                        else if (thing) {
                            return true;
                        }
                        else if (typeof thing === "string") {
                            return (thing.length > 0);
                        }
                        else {
                            return false;
                        }
                    }
                };
                /**
                 * Builds a visibility binding.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildVisibilityBinding = function (el, binding, currentContext) {
                    var target = this.getBindingTarget(binding);
                    if (target === null) {
                        return false;
                    }
                    if (target === undefined) {
                        this.app.trace.debug("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    else {
                        // Grab the initial visibility of the item.
                        binding["initialVisibility"] = dojo.style(el, "display") || "block";
                        // This method will be used to update the visibility binding.
                        var updateVisibilityBinding = function (value) {
                            var shouldDisplay = _this.isTruthy(value);
                            if (binding.invert == true) {
                                shouldDisplay = !shouldDisplay;
                            }
                            var displayClass = "";
                            if (binding["initialVisibility"] === "inline") {
                                displayClass = "bound-visible-inline";
                            }
                            else {
                                displayClass = "bound-visible";
                            }
                            if (shouldDisplay == true) {
                                dojo.removeClass(el, "bound-invisible");
                                dojo.addClass(el, displayClass);
                            }
                            else {
                                dojo.removeClass(el, displayClass);
                                dojo.addClass(el, "bound-invisible");
                            }
                        };
                        // Bind the handler that will calculate visibility.
                        var _this = this;
                        if (target.isObservable) {
                            binding.targetBindings.push({
                                event: target.bindingEvent,
                                token: target.bind(this, updateVisibilityBinding)
                            });
                        }
                        // Mark the member to be pulsed.
                        this.bindingSetupDelegates.push(function () {
                            updateVisibilityBinding.apply(_this, [target]);
                        });
                    }
                };
                /**
                 * Builds an `enabled`/`disabled` binding, simulating a cascading enabled/disabled state.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildDisabledBinding = function (el, binding, currentContext) {
                    var target = this.getBindingTarget(binding);
                    if (target === undefined) {
                        this.app.trace.debug("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    else {
                        // Grab the initial disabled/enabled state of the item.
                        binding["initialDisabled"] = dojo.attr(el, "disabled");
                        // This method will be used to update the disabled binding.
                        var updateDisabledStateBinding = function (value) {
                            // class attached to disabled items
                            var DISABLED_CLASS = "bound-disabled";
                            var shouldDisable = false;
                            // collection logic
                            if (!value) {
                                shouldDisable = true;
                            }
                            else {
                                if (target) {
                                    // Special case: If the value is a CollectionChangedArgs, we'll deduce the result of the collection
                                    // change and determine visibility based on the state of the collection. Having a "type" member serves
                                    // as our hint that this object is a CollectionChangedArgs object.
                                    if (value instanceof geocortex.framework.events.CollectionChangedArgs) {
                                        if (value.type == "append") {
                                            var len = (value.rangeEnd + 1) - value.rangeStart;
                                            // If the collection will end up with items, or already has items, visible = true.
                                            if (len > 0 || (target.value && target.value.length > 0)) {
                                                shouldDisable = false;
                                            }
                                        }
                                        else if (value.type == "clear") {
                                            shouldDisable = true;
                                        }
                                        else if (value.type == "insert") {
                                            if ((value.rangeEnd + 1) - value.rangeStart > 0) {
                                                shouldDisable = false;
                                            }
                                        }
                                        else if (value.type == "remove") {
                                            if (((value.rangeEnd + 1) - value.rangeStart) < target.value.length) {
                                                shouldDisable = false;
                                            }
                                        }
                                    }
                                    else if (target.isObservableCollection) {
                                        shouldDisable = !(target.getLength() > 0);
                                    }
                                    else if (target.isObservable) {
                                        shouldDisable = !target.get();
                                    }
                                    else if (typeof value === "string") {
                                        shouldDisable = value.length == 0;
                                    }
                                    else if (value) {
                                        shouldDisable = false;
                                    }
                                    else {
                                        shouldDisable = false;
                                    }
                                }
                            }
                            if (binding.invert == true) {
                                shouldDisable = !shouldDisable;
                            }
                            if (shouldDisable == true) {
                                dojo.attr(el, "disabled", true);
                                dojo.attr(el, "tabindex", -1);
                                dojo.addClass(el, DISABLED_CLASS);
                            }
                            else {
                                dojo.removeAttr(el, "disabled");
                                dojo.removeAttr(el, "tabindex");
                                dojo.removeClass(el, DISABLED_CLASS);
                            }
                        };
                        // Bind the handler that will calculate disabled state.
                        var _this = this;
                        if (target.isObservable) {
                            binding.targetBindings.push({
                                event: target.bindingEvent,
                                token: target.bind(this, updateDisabledStateBinding)
                            });
                        }
                        // Mark the member to be pulsed.
                        this.bindingSetupDelegates.push(function () {
                            updateDisabledStateBinding.apply(_this, [target]);
                        });
                    }
                };
                /**
                 * Builds a two-way binding between a form control and an {@link Observable}.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 */
                ViewBase.prototype.buildValueBinding = function (el, binding, currentContext) {
                    var _this = this;
                    var target = this.getBindingTarget(binding);
                    if (target === undefined) {
                        this.app.trace.warning("Binding error: Property '{0}' does not exist in view model '{1}'.".format(binding.target, binding.viewModel.id));
                        return false;
                    }
                    if (target == null) {
                        return false;
                    }
                    var observable = target["isObservable"] || false;
                    var observableCollection = target["isObservableCollection"] || false;
                    // What type of element are we binding to?
                    var tag = el.tagName.toLowerCase();
                    // GVH-11601 When the type is set through a binding, the DOM will not have updated by the time this call is made, so dojo.attr will return null
                    // this checks the HTMLElement to see if a type property has been added and uses that instead in the absence of a type attribute on the DOM.
                    var type = dojo.attr(el, "type") || el["type"] ? el["type"] : null;
                    // If the target is observable, build the value -> control binding.
                    if (observable) {
                        // Build updater delegates for each type we wish to update.
                        var updateInputValue = function (value) {
                            // Since we might be getting this update due to this field being set
                            // We should check if it's already the same.
                            if (value !== dojo.attr(el, "value")) {
                                if (value === null || value === undefined) {
                                    value = "";
                                }
                                dojo.attr(el, "value", value);
                            }
                        };
                        var updateCheckboxValue = function (newValue) {
                            el.checked = (newValue === true);
                        };
                        var updateRadioValue = function (newValue) {
                            var existingValue = dojo.attr(el, "value");
                            // Uncheck other radios in this group.
                            dojo.query("input[type=radio]", _this.root).forEach(function (radio) {
                                if (radio.name === el.name) {
                                }
                            });
                            // If the bound value matches the radio button value, check it.
                            if (newValue === true || existingValue == newValue) {
                                el.checked = true;
                            }
                            else {
                                el.checked = false;
                            }
                        };
                        var updateDateValue = function (newValue) {
                            // Per the HTML5 spec, the "value" attribute for a date input is always a string in ISO-8601
                            // date format ("YYYY-MM-DD"). Attempting to set it to anything else, including a native Date
                            // object, will fail with an error in most browsers. If the bound value is a Date object, we
                            // need to set the "valueAsDate" attribute instead.
                            if (newValue instanceof Date) {
                                // The date picker will display the date's UTC value, which might be a day off from
                                // the local date, depending on time zone and time of day. Offset the time so that the
                                //  date picker reflects the local date.
                                var newDateValue = new Date(newValue.getTime());
                                newDateValue.setMinutes(newDateValue.getMinutes() - newDateValue.getTimezoneOffset());
                                el.valueAsDate = newDateValue;
                            }
                            else {
                                el.value = newValue;
                            }
                        };
                        var updateSelectValue = function (value) {
                            // See GVH-3742.
                            var newValue = value;
                            // Take @attached-value into consideration when looking for matches.
                            var optionMatchesValue = function (opt, indexedValue) {
                                if ((typeof opt["___attachedValue"] !== "undefined")) {
                                    // There is an attached value
                                    var attachedValue = opt["___attachedValue"];
                                    if (attachedValue === (indexedValue === undefined ? newValue : indexedValue)) {
                                        // If the values are equal we are done
                                        return true;
                                    }
                                    // The values are not equal, but we still need to do some more checks
                                    if (typeof attachedValue === "number" || typeof attachedValue === "boolean") {
                                        // GVH-10334
                                        // The newValue variable will always be a string for number and booleans, but the 
                                        // attached value still has its original type. Convert it to a string when comparing.
                                        attachedValue = attachedValue.toString();
                                    }
                                    else if (attachedValue && attachedValue.hasOwnProperty("value")) {
                                        // GVH-9403
                                        // The attached value appears to be an observable
                                        // Use the value of the observable when comparing.
                                        var attachedValue = attachedValue.value;
                                        if (typeof attachedValue === "number" || typeof attachedValue === "boolean") {
                                            // GVH-10377
                                            // Similar to GVH-10334 above.
                                            // The newValue variable will always be a string for number and booleans, but the 
                                            // value of the observable is a number or boolean. Convert it to a string when comparing.
                                            attachedValue = attachedValue.toString();
                                        }
                                    }
                                    return attachedValue === (indexedValue === undefined ? newValue : indexedValue);
                                }
                                var comparisonValue = indexedValue === undefined ? newValue : indexedValue;
                                return (opt.value === comparisonValue);
                            };
                            // The newValue might actually be a CollectionChangedArgs if the target is an ObservableCollection
                            if (newValue instanceof geocortex.framework.events.CollectionChangedArgs) {
                                var args = newValue;
                                var collection = args.sender;
                                var lookup = [];
                                for (var i = args.rangeStart; i <= args.rangeEnd; i++) {
                                    var item = collection.getAt(i);
                                    lookup.push(item.value ? item.value + "" : item);
                                }
                                if (args.type === "append" || args.type === "insert") {
                                    for (var domItemIndex = 0; domItemIndex < binding.domElement.options.length; ++domItemIndex) {
                                        var option = binding.domElement.options[domItemIndex];
                                        for (var lookupIndex = 0; lookupIndex < lookup.length; lookupIndex++) {
                                            if (optionMatchesValue(option, lookup[lookupIndex])) {
                                                option.selected = true;
                                            }
                                            else if (!dojo.attr(binding.domElement, "multiple")) {
                                                option.selected = false;
                                            }
                                        }
                                    }
                                }
                                return;
                            }
                            // Else... the target is just a value (target is Observable). Let's deal with that scenario now.
                            if (typeof newValue === "number" || typeof newValue === "boolean") {
                                // Treat bools and numbers as a string because the values are strings and we don't want 0 == ""
                                newValue = newValue.toString();
                            }
                            // Null/undefined value? Select none.
                            if (newValue === null || newValue === undefined) {
                                for (var domItemIndex = 0; domItemIndex < binding.domElement.options.length; ++domItemIndex) {
                                    var option = binding.domElement.options[domItemIndex];
                                    option.selected = false;
                                }
                            }
                            else if (dojo.isArray(newValue)) {
                                // Is the actual property a collection?
                                var valueIsCollection = binding.viewModel[binding.target].isObservableCollection;
                                // If the value being set is a collection, set all the appropriate options.
                                if (valueIsCollection) {
                                    var optionSet = false;
                                    for (var domItemIndex = 0; domItemIndex < binding.domElement.options.length; ++domItemIndex) {
                                        var option = binding.domElement.options[domItemIndex];
                                        option.selected = false;
                                        // If we're a single select, only need to set a new value if we haven't already done a set yet
                                        if (dojo.attr(binding.domElement, "multiple") || !optionSet) {
                                            // Because we have a double for-loop here, it means this is an O(nm) algorithm - we should be able to cut this down to O(n).
                                            for (var valueItemIndex = 0; valueItemIndex < newValue.length; ++valueItemIndex) {
                                                var valueItem = newValue[valueItemIndex];
                                                if (optionMatchesValue(option, valueItem)) {
                                                    option.selected = true;
                                                    optionSet = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (var domItemIndex = 0; domItemIndex < binding.domElement.options.length; ++domItemIndex) {
                                        var option = binding.domElement.options[domItemIndex];
                                        if (optionMatchesValue(option, valueItem)) {
                                            option.selected = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            else {
                                // Value set to single item.
                                for (var domItemIndex = 0; domItemIndex < binding.domElement.options.length; ++domItemIndex) {
                                    var option = binding.domElement.options[domItemIndex];
                                    if (optionMatchesValue(option, valueItem)) {
                                        option.selected = true;
                                        break;
                                    }
                                }
                            }
                        };
                        if (tag === "select") {
                            binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(binding, updateSelectValue) });
                            this.bindingSetupDelegates.push(function () {
                                updateSelectValue.apply(_this, [target.get()]);
                            });
                        }
                        else {
                            if (type === "radio") {
                                binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(binding, updateRadioValue) });
                                this.bindingSetupDelegates.push(function () {
                                    updateRadioValue.apply(_this, [target.get()]);
                                });
                            }
                            else if (type === "checkbox") {
                                binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(binding, updateCheckboxValue) });
                                this.bindingSetupDelegates.push(function () {
                                    updateCheckboxValue.apply(_this, [target.get()]);
                                });
                            }
                            else if (type === "date") {
                                binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(binding, updateDateValue) });
                                this.bindingSetupDelegates.push(function () {
                                    updateDateValue.apply(_this, [target.get()]);
                                });
                            }
                            else {
                                binding.targetBindings.push({ event: target.bindingEvent, token: target.bind(binding, updateInputValue) });
                                this.bindingSetupDelegates.push(function () {
                                    updateInputValue.apply(_this, [target.get()]);
                                });
                            }
                        }
                    }
                    // Build the control -> value binding.
                    // Handler for most form controls:
                    var bindChangeValue = function () {
                        binding.on("change", function (event) {
                            if (event.currentTarget === undefined) {
                                if (_this.app) {
                                    _this.app.trace.error("Binding error: bound to change event where currentTarget is undefined");
                                }
                                return;
                            }
                            var value = dojo.attr(event.currentTarget, "value");
                            if (observable) {
                                target.set(value);
                            }
                            else {
                                _this.setBindingTargetValue(binding, value);
                            }
                            return true;
                        });
                    };
                    // Handler for text inputs:
                    var bindTextboxChangeValue = function () {
                        var lastValue = null;
                        var handleChange = function (event) {
                            var value = dojo.attr(event.currentTarget, "value");
                            if (value === lastValue) {
                                return;
                            }
                            else {
                                lastValue = value;
                            }
                            if (observable) {
                                target.set(value);
                            }
                            else {
                                _this.setBindingTargetValue(binding, value);
                            }
                            return true;
                        };
                        // Bind to change, keyup, and mouseup to handle "change" (only happens on focus change), key inputs (active typing) and mouse clicks (copy/paste).
                        binding.on("change", handleChange);
                        binding.on("keyup", handleChange);
                        binding.on("mouseup", handleChange);
                        // 'input' is the only event that fires in IE 10 when the text input is cleared with the X.
                        // It's not necessary to listen for this add the above, but not all browsers support it and
                        // modernizr can't detect it.  see: https://github.com/modernizr/modernizr/issues/210
                        binding.on("input", handleChange);
                    };
                    // Handler for checkboxes:
                    var bindCheckboxChangeValue = function () {
                        binding.on("change", function (event) {
                            var value = dojo.attr(event.currentTarget, "checked");
                            if (observable) {
                                target.set(value);
                            }
                            else {
                                _this.setBindingTargetValue(binding, value);
                            }
                            return true;
                        });
                    };
                    // Handler for radios:
                    var bindRadioChangeValue = function () {
                        binding.on("click", function (event) {
                            if (dojo.attr(event.currentTarget, "checked")) {
                                if (observable) {
                                    target.set(event.currentTarget.value);
                                }
                                else {
                                    _this.setBindingTargetValue(binding, event.currentTarget.value);
                                }
                            }
                            return true;
                        });
                    };
                    // Handler for date inputs:
                    var bindDateChangeValue = function () {
                        binding.on("change", function (event) {
                            var currentValue = observable ? target.get() : target;
                            var newValue = event.currentTarget.valueAsDate;
                            // Convert the date to 00:00 local time instead of 00:00 UTC.
                            newValue.setMinutes(newValue.getMinutes() + newValue.getTimezoneOffset());
                            // Preserve the time portion of the current value, if there is one.
                            if (currentValue instanceof Date && !isNaN(currentValue.getTime())) {
                                newValue.setHours(currentValue.getHours());
                                newValue.setMinutes(currentValue.getMinutes());
                                newValue.setSeconds(currentValue.getSeconds());
                                newValue.setMilliseconds(currentValue.getMilliseconds());
                            }
                            if (observable) {
                                target.set(newValue);
                            }
                            else {
                                _this.setBindingTargetValue(binding, newValue);
                            }
                            return true;
                        });
                    };
                    // Handler for selects:
                    var bindSelectChangeValue = function () {
                        // This handler will perform the onchange logic.
                        var handleSelectChange = function () {
                            // Grab selected options.
                            var options = dojo.query("option", el);
                            var selected = [];
                            for (var i = 0; i < options.length; ++i) {
                                var option = options[i];
                                // TODO: Break, if single-select.
                                if (option.selected === true) {
                                    var attached = option["___attachedValue"];
                                    if (!framework.utils.isNullOrUndefined(attached)) {
                                        selected.push(attached);
                                    }
                                    else {
                                        selected.push(option.value);
                                    }
                                }
                            }
                            // The following is an iPad specific hack. Thanks Apple!
                            // Select elements that had/have a selectedIndex of -1 will not allow the first option in the list
                            // to become selected until a different item is selected first. To work around this, we'll always
                            // select the first item in a single-select control on an iPad.
                            // See GVH-283.
                            if (selected.length === 0 && options.length > 0 && !el.multiple) {
                                if (_this.app["___uaIsiPad"] === true) {
                                    el.selectedIndex = 0;
                                    var attached = options[0]["___attachedValue"];
                                    selected.push(!framework.utils.isNullOrUndefined(attached) ? attached : options[0].value);
                                }
                            }
                            // Do we have a multiple selection?
                            if (selected.length > 0) {
                                // We have a multiple selection, but are bound to something that is not an Observable collection.
                                if (!observableCollection) {
                                    if (observable) {
                                        // If we're bound to an Observable, set its value to the first selected item. It's better than nothing.
                                        target.set(selected[0]);
                                    }
                                    else {
                                        // If we're bound to a non-Observable, replace it with the whole selected collection.
                                        _this.setBindingTargetValue(binding, selected);
                                    }
                                }
                                else {
                                    // Set the ObservableCollection.
                                    target.clear();
                                    target.addItems(selected);
                                }
                            }
                            else {
                                target.clear();
                            }
                            return true;
                        };
                        // When initially binding to a combobox, we will mark it as needed to be updated with a selection
                        // when elements are added to it. This is to get around the fact that there is no initial "change"
                        // event fired - we must set the backing @value ourselves initially.
                        el["___populateInitialValueFunc"] = function () { updateSelectValue(target.isObservable ? target.get() : target); };
                        binding.on("change", handleSelectChange);
                    };
                    // Checkbox gets its own handling.
                    if ((tag === "textarea") || (tag === "input" && type === "text")) {
                        bindTextboxChangeValue();
                    }
                    else if (tag === "input" && type === "checkbox") {
                        bindCheckboxChangeValue();
                    }
                    else if (tag === "input" && type === "radio") {
                        bindRadioChangeValue();
                    }
                    else if (tag === "input" && type === "date") {
                        bindDateChangeValue();
                    }
                    else if (tag === "select") {
                        bindSelectChangeValue();
                    }
                    else {
                        // Use bindChangeValue by default.
                        bindChangeValue();
                    }
                };
                /**
                 * Applies a binding expression to a DOM node based on the type name of the binding.
                 * @param el The element being bound.
                 * @param binding The binding expression.
                 * @param currentContext The current data context.
                 * @param bindingNode The binding node to apply.
                 */
                ViewBase.prototype.applyBinding = function (el, binding, currentContext, bindingNode) {
                    if (binding.type === "source") {
                        this.buildSourceBinding(el, binding, currentContext, bindingNode);
                    }
                    else if (binding.type === "event") {
                        this.buildEventBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "text") {
                        this.buildTextBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "var") {
                        this.buildVarBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "class") {
                        this.buildClassBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "style") {
                        this.buildStyleBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "dom") {
                        this.buildDomBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "value") {
                        this.buildValueBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "attr") {
                        this.buildAttributeBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "attachment") {
                        this.buildAttributeBinding(el, binding, currentContext, true);
                    }
                    else if (binding.type === "visibility") {
                        this.buildVisibilityBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "disabledState") {
                        this.buildDisabledBinding(el, binding, currentContext);
                    }
                    else if (binding.type === "widget") {
                        this.buildWidgetBinding(el, binding, currentContext);
                    }
                    return true;
                };
                return ViewBase;
            }(geocortex.framework.FrameworkObject));
            ui.ViewBase = ViewBase;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ViewBase.ts" />
/// <reference path="../application/Application.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * RegionAdapterBase serves as the base class for all region adapters.
             */
            var RegionAdapterBase = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.ui.RegionAdapterBase} class.
                 * @param name The name of the region adapter.
                 * @param app The {@link framework.application.Application} that this region adapter belongs to.
                 */
                function RegionAdapterBase(name, app) {
                    this._viewActivationTimers = [];
                    this._viewDeactivationTimers = [];
                    /** Whether or not this region has one or more active views. */
                    this.isActive = false;
                    /** The DOM element that this adapter works against. */
                    this.domElement = null;
                    /** A key value-pair collection of configured options, specific to the particular region adapter. */
                    this.options = null;
                    /** Any views hosted in this region. */
                    this.views = [];
                    /** Active views in this region. */
                    this.activeViews = [];
                    /** Default time that views should take in transitioning from different states (active~inactive). */
                    this.defaultTransitionDelay = 10;
                    this.app = app;
                    this.name = name;
                }
                /**
                 * Hosts the region in the given DOM element. Views will be adapted for this element.
                 * @param element The DOM element to adapt views for.
                 * @param options The data region options as a key-value pair collection (i.e. an object).
                 */
                RegionAdapterBase.prototype.host = function (element, options) {
                    this.domElement = element;
                    this.options = options || {};
                    // GVH-2469: Disable CSS transitions on view activation/deactivation by default.
                    if (this.options.useTransitions) {
                        if (!this.options.transitionDelay || isNaN(this.options.transitionDelay)) {
                            this.options.transitionDelay = this.defaultTransitionDelay;
                        }
                    }
                    else {
                        this.options.useTransitions = false;
                    }
                };
                /**
                 * Called when the region adapter is to be removed from the user interface.
                 */
                RegionAdapterBase.prototype.unhost = function () {
                    this.domElement = null;
                    this.options = null;
                };
                /**
                 * Activates a view in the context of the adapter, generally making it visible and interactive.
                 * @param view The view to activate. This view should already be hosted in the region.
                 */
                RegionAdapterBase.prototype.activateView = function (view) {
                    this.cancelActivate(view);
                    if (this.activeViews.length === 0 && view.isActive === false) {
                        this.isActive = true;
                        this.app.event("RegionActivatedEvent").publish(this);
                        dojo.removeClass(this.domElement, "region-inactive");
                        dojo.addClass(this.domElement, "region-active");
                    }
                    // If the view doesn't already exist, add it to the stack of active views.
                    if (!framework.utils.ArrayUtils.contains(this.activeViews, view)) {
                        this.activeViews.push(view);
                    }
                    else {
                        // If the view already exists in the stack, remove it and push it on the end.
                        framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                        this.activeViews.push(view);
                    }
                    view.activated();
                    view.isActive = true;
                    if (this.options.useTransitions) {
                        dojo.removeClass(view.root, "inactive");
                        dojo.addClass(view.root, "activating");
                        // It is necessary to do this inside a timeout because the browser needs time to apply the "activating" class
                        // before we remove it.  Because the "inactive": class may (likely will) have a style of display: none,
                        // a css transition to the "active" class will not be triggered unless we first remove display: none.  So, we 
                        // remove display: none through the use of the "activating" class, and then the css transition to the "active" class
                        // will be triggered.  However this can introduce a race condition (see method comment for cancelActivate).  We
                        // resolve the race condition by cancelling the timer as necessary.
                        this._viewActivationTimers[view.id] = setTimeout(dojo.hitch(this, function () {
                            dojo.removeClass(view.root, "inactive");
                            dojo.removeClass(view.root, "activating");
                            dojo.addClass(view.root, "active");
                            delete this._viewActivationTimers[view.id];
                        }), this.options.transitionDelay);
                    }
                    else {
                        dojo.removeClass(view.root, "inactive");
                        dojo.addClass(view.root, "active");
                    }
                    this.app.event("ViewActivatedEvent").publish(view);
                };
                /**
                 * Because the adding of the "active" class is asynchronous (through setTimeout(0)), there can be a potential race condition
                 * whereby if a view is immediately deactivated after getting activated, it may actually get the "activated" class
                 * added to it after it has been deactivated.  To prevent this from happening, this method should be called when deactivating
                 * or simply hiding a view.
                 */
                RegionAdapterBase.prototype.cancelActivate = function (view) {
                    if (this._viewActivationTimers[view.id]) {
                        clearTimeout(this._viewActivationTimers[view.id]);
                        delete this._viewActivationTimers[view.id];
                        dojo.removeClass(view.root, "activating");
                    }
                };
                RegionAdapterBase.prototype.cancelDeactivate = function (view) {
                    if (this._viewActivationTimers[view.id]) {
                        clearTimeout(this._viewActivationTimers[view.id]);
                        delete this._viewActivationTimers[view.id];
                        dojo.removeClass(view.root, "deactivating");
                    }
                };
                /**
                 * Deactivates a view in the context of the adapter, generally making it non-visible and non-interactive.
                 * @param view The view to deactivate. This view should already be hosted in the region.
                 */
                RegionAdapterBase.prototype.deactivateView = function (view) {
                    this.cancelDeactivate(view);
                    if (this.activeViews.length <= 1 && view.isActive === true) {
                        this.isActive = false;
                        dojo.removeClass(this.domElement, "region-active");
                        dojo.addClass(this.domElement, "region-inactive");
                        this.app.event("RegionDeactivatedEvent").publish(this);
                    }
                    this.cancelActivate(view);
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    view.deactivated();
                    view.isActive = false;
                    if (this.options.useTransitions) {
                        dojo.removeClass(view.root, "active");
                        dojo.addClass(view.root, "deactivating");
                        this._viewDeactivationTimers[view.id] = setTimeout(dojo.hitch(this, function () {
                            dojo.removeClass(view.root, "active");
                            dojo.removeClass(view.root, "deactivating");
                            dojo.addClass(view.root, "inactive");
                            delete this._viewDeactivationTimers[view.id];
                        }), this.options.transitionDelay);
                    }
                    else {
                        dojo.removeClass(view.root, "active");
                        dojo.addClass(view.root, "inactive");
                    }
                    this.app.event("ViewDeactivatedEvent").publish(view);
                };
                /**
                 * Adds a view to the region.
                 * @param view The view to add to the region.
                 */
                RegionAdapterBase.prototype.hostView = function (view) {
                    view.added();
                    dojo.removeClass(view.root, "active");
                    dojo.addClass(view.root, "inactive");
                    this.app.event("ViewHostedEvent").publish({ "region": this, "view": view });
                };
                /**
                 * Removes a view from the region.
                 * @param view The view to remove from the region.
                 */
                RegionAdapterBase.prototype.unhostView = function (view) {
                    view.removed();
                    dojo.removeClass(view.root, "active");
                    dojo.addClass(view.root, "inactive");
                    this.app.event("ViewUnhostedEvent").publish({ "region": this, "view": view });
                };
                return RegionAdapterBase;
            }());
            ui.RegionAdapterBase = RegionAdapterBase;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="RegionAdapterBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * A singleton modal region adapter that pops up when a view belonging to it is activated.
             * An overlay element is used to fade the elements underneath the popup and to prevent user interaction with the app until the modal
             * popup is dismissed.
             */
            var PopupModalRegionAdapter = (function (_super) {
                __extends(PopupModalRegionAdapter, _super);
                /**
                 * Initializes a new instance of the {@link ObservableCollection} class.
                 * @param name The optional name of the region adapter.
                 * @param app The {@link geocortex.framework.application.Application} that this PopupModalRegionAdapter belongs to.
                 */
                function PopupModalRegionAdapter(name, app) {
                    var _this = this;
                    _super.call(this, name, app);
                    /** The active view currently being displayed. */
                    this.activeView = null;
                    /** The stack of active views. */
                    this.activeViews = [];
                    /** Token used to unsubscribe binding to the active view title. */
                    this.titleBindingToken = null;
                    /** Window header DOM element. */
                    this.contentHeader = null;
                    /**  Window title DOM element. */
                    this.contentTitle = null;
                    /** Content container outer element. */
                    this.contentContainer = null;
                    /** Content container inner DOM element. */
                    this.contentElement = null;
                    /** Modal overlay element. */
                    this.overlayElement = null;
                    this._scrollTimer = null;
                    this._scrollDelay = 50;
                    this._screenReaderNarrationDisabled = false;
                    // TODO: Fix! Need a singleton flag or something.
                    if (PopupModalRegionAdapter.instance) {
                        throw new Error("PopupModalRegionAdapter is a singleton and has already been constructed once.");
                    }
                    PopupModalRegionAdapter.instance = this;
                    if (this.app.modalRegionSingleton == null) {
                        this.app.modalRegionSingleton = this;
                    }
                    this.app.command("CloseModalRegion").register(this, function () {
                        _this.deactivate();
                    });
                    this.app.event("ViewActivatedEvent").subscribe(this, function () {
                        if (_this.activeViews.length > 0) {
                            setTimeout(function () {
                                _this.positionContent();
                            }, 0); // GVH-3323
                        }
                    });
                    this.app.event("ViewDimensionsChangedEvent").subscribe(this, function () {
                        _this.positionContent();
                    });
                }
                PopupModalRegionAdapter.getInstance = function () {
                    return PopupModalRegionAdapter.instance;
                };
                /**
                 * Activates the region, displaying the modal overlay and any modal content.
                 */
                PopupModalRegionAdapter.prototype.activate = function () {
                    //dojo.addClass("shell", "no-scroll");
                    if (this.activeViews.length > 0) {
                        // Temporarily change the opacity to 0 to avoid flickering (GVH-5932)
                        dojo.style(this.domElement, "opacity", 0);
                        dojo.query(this.domElement).removeClass("inactive");
                        dojo.query(this.domElement).addClass("active");
                        dojo.query(this.overlayElement).removeClass("inactive");
                        dojo.query(this.overlayElement).addClass("active");
                    }
                };
                /**
                 * Deactivates the region, hiding the modal overlay and any modal content.
                 */
                PopupModalRegionAdapter.prototype.deactivate = function () {
                    dojo.query(this.domElement).removeClass("active");
                    dojo.query(this.domElement).addClass("inactive");
                    dojo.query(this.overlayElement).removeClass("active");
                    dojo.query(this.overlayElement).addClass("inactive");
                    // GVH-7846: The first view that's activated in this region will have disabled screen narration. Enable it.
                    if (this._screenReaderNarrationDisabled) {
                        this.app.command("EnableScreenReaderNarrate").execute();
                        this._screenReaderNarrationDisabled = false;
                    }
                    if (this.activeView) {
                        this.activeView = null;
                    }
                };
                /**
                 * Attaches the region adapter to a DOM element.
                 * @param element The DOM element to adapt for.
                 */
                PopupModalRegionAdapter.prototype.host = function (element) {
                    var _this = this;
                    _super.prototype.host.call(this, element);
                    this.domElement = element;
                    dojo.query(this.domElement).removeClass("active");
                    dojo.query(this.domElement).addClass("inactive");
                    // <jeffg> The JS version of this class had this.root, which doesn't exist, so I'm taking a bit of a guess here
                    this.contentContainer = dojo.query(".modal-container")[0];
                    this.contentElement = dojo.query(".modal-container-inner")[0];
                    this.overlayElement = dojo.query(".modal-overlay")[0];
                    dojo.connect(window, "onresize", function () { _this.handleScrollEvent(); });
                    dojo.connect(window, "onscroll", function () { _this.handleScrollEvent(); });
                    this.app.event("WorkflowFormTextInputBlurredEvent").subscribe(this, function () {
                        setTimeout(function () {
                            _this.positionContent();
                        }, 100);
                    });
                };
                /**
                 * Handles a scroll event on the window, which sets a timer to reposition the content.
                 */
                PopupModalRegionAdapter.prototype.handleScrollEvent = function () {
                    var _this = this;
                    if (this._scrollTimer != null) {
                        clearTimeout(this._scrollTimer);
                        this._scrollTimer = null;
                    }
                    this._scrollTimer = setTimeout(function () {
                        _this.positionContent();
                    }, 0);
                };
                /**
                 * Centers the modal content.
                 */
                PopupModalRegionAdapter.prototype.positionContent = function () {
                    var _this = this;
                    if (this.contentContainer && this.activeView != null && this.activeView.root != null) {
                        var box = dojo.position(this.contentContainer);
                        var winBox = dojo.window.getBox();
                        // Constrain the container to the dimensions of the window
                        var newWidth = box.w;
                        if (box.w > winBox.w) {
                            newWidth = winBox.w;
                            dojo.style(this.contentElement, { "max-width": newWidth + "px" });
                        }
                        else {
                            dojo.style(this.contentElement, { "max-width": "" });
                        }
                        var newHeight = box.h;
                        if (box.h > winBox.h) {
                            newHeight = winBox.h;
                            dojo.style(this.contentElement, { "max-height": newHeight + "px" });
                        }
                        else {
                            dojo.style(this.contentElement, { "max-height": "" });
                        }
                        // Set the position of the container
                        dojo.style(this.contentContainer, {
                            left: ((winBox.w / 2) - (newWidth / 2)) + "px",
                            top: ((winBox.h / 2) - (newHeight / 2)) + "px"
                        });
                        // Make the prompt again visibl        
                        setTimeout(function () { return dojo.style(_this.domElement, "opacity", 1); });
                    }
                };
                /**
                 * Displays the active view, activating the modal popup and overlay if they are not already active.
                 * @param view The active view to show.
                 */
                PopupModalRegionAdapter.prototype.showActiveView = function (view) {
                    if (view.isActive) {
                        this.activeView = view;
                        // Hide all other views.
                        this.hideAllViews();
                        view.activated();
                        this.activate();
                        this.activeView = view;
                        dojo.removeClass(view.root, "inactive");
                        dojo.addClass(view.root, "active");
                    }
                };
                /**
                 * Hides all views hosted in the region.
                 */
                PopupModalRegionAdapter.prototype.hideAllViews = function () {
                    dojo.query("> .view", this.contentElement).removeClass("active");
                    dojo.query("> .view", this.contentElement).addClass("inactive");
                };
                /**
                 * Activates a view and pushes it to the top of the active views, activating the region if required.
                 * @param view The view to activate.
                 */
                PopupModalRegionAdapter.prototype.activateView = function (view) {
                    var _this = this;
                    // If the view doesn't already exist, add it to the stack of active views.
                    if (!framework.utils.ArrayUtils.contains(this.activeViews, view)) {
                        this.activeViews.push(view);
                    }
                    else {
                        // If the view already exists in the stack, remove it and push it on the end.
                        framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                        this.activeViews.push(view);
                    }
                    // GVH-7846: We want to disable all event based screen narration when a modal view is hosted. This needs to be done before the view is actually set active.
                    // This should be done only once since the command tracks the number of times its been disabled and can only be reenabled when each disable command is 
                    // cancelled out by a corresponding enable command. We'll reenable event based narration when this region is deactivated.
                    if (!this._screenReaderNarrationDisabled) {
                        this._screenReaderNarrationDisabled = true;
                        this.app.command("DisableScreenReaderNarrate").execute();
                    }
                    _super.prototype.activateView.call(this, view);
                    this.showActiveView(view);
                    this._repositionOnImageLoaded(view.root);
                    // GVH-7846: Now we'll need to focus on the view we've just activated. The timeout is needed in order to allow the DOM to settle first.
                    setTimeout(function () { return _this.app.command("FocusOnFirstInputInView").execute(view); }, 400);
                };
                /**
                 * Deactivates a view.
                 * @param view The view to deactivate. The view should pre-exist in the region.
                 */
                PopupModalRegionAdapter.prototype.deactivateView = function (view) {
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    // Any queued up views waiting to be displayed behind this one? display them. Otherwise, deactivate the region.
                    if (this.activeViews.length > 0) {
                        this.showActiveView(this.activeViews[this.activeViews.length - 1]);
                        this.positionContent();
                    }
                    else {
                        this.deactivate();
                    }
                    _super.prototype.deactivateView.call(this, view);
                };
                /**
                 * Deactivates the active view.
                 */
                PopupModalRegionAdapter.prototype.deactivateActiveView = function () {
                    if (this.activeView) {
                        // Unbind title
                        if (this.titleBindingToken != null) {
                            this.activeView.title.unbind(this.titleBindingToken);
                            this.titleBindingToken = null;
                        }
                        // Deactivate.
                        var view = this.activeView;
                        this.activeView = null;
                        this.deactivateView(view);
                        // Remove from active views collection.
                        framework.utils.ArrayUtils.removeItem(this.activeViews, this.activeView);
                    }
                };
                /**
                 * Adds a view to this region. This region adapter actually hosts its content in one of the children of the actual region. This allows
                 * it to provide some container markup and an "X" button that will deactivate the current view.
                 * @param view The view to host.
                 */
                PopupModalRegionAdapter.prototype.hostView = function (view) {
                    this.views.push(view);
                    // Does the view have markup? Fetch it.
                    if (view.root == null) {
                        var viewMarkup = geocortex.resourceManager.fetch(view.markupResource, view.libraryId);
                        if (viewMarkup == null) {
                            this.app.trace.warning("Could not fetch markup resource '{0}' in library '{1}'.".format(view.markupResource, view.libraryId));
                            return false;
                        }
                        // We'll create some markup structure for the view and put it in the region.
                        view.root = dojo.create("div", { className: "view {0}".format(view.id) });
                        view.root.innerHTML = viewMarkup;
                        dojo.place(view.root, this.contentElement, "last");
                        // Attach the view model (if present) and perform binding.
                        if (view.viewModel) {
                            view.attach(view.viewModel);
                        }
                        // Host any sub-regions in this view.
                        this.app.viewManager.discoverRegions(view.root, view);
                        this.positionContent();
                    }
                    else {
                        dojo.place(view.root, this.contentElement, "last");
                    }
                    _super.prototype.hostView.call(this, view);
                    return true;
                };
                /**
                 * Removes a view from this region.
                 * @param view The view to remove.
                 */
                PopupModalRegionAdapter.prototype.unhostView = function (view) {
                    if (view == this.activeView) {
                        this.deactivateView(view);
                    }
                    // Remove from view collections.
                    framework.utils.ArrayUtils.removeItem(this.views, view);
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    // Remove DOM element.
                    var nl = new dojo.NodeList();
                    nl.push(view.root);
                    nl.orphan();
                    _super.prototype.unhostView.call(this, view);
                };
                PopupModalRegionAdapter.prototype._repositionOnImageLoaded = function (node) {
                    var _this = this;
                    // We want the loaded function to have access to this class *and* to the img node
                    var connectionPropName = "attached_ModalRegion_ImageLoadedConnection";
                    dojo.forEach(dojo.query("img", node), function (image) {
                        // Keep track of event subscriptions and unsubscribe
                        if (image[connectionPropName]) {
                            // Clear out the connection
                            dojo.disconnect(image[connectionPropName]);
                            //GVH-3192
                            delete image[connectionPropName];
                        }
                        // On image load, we'll notify dimensions changed
                        var connection = dojo.connect(image, "load", _this, function (evt) {
                            _this._imageLoaded(evt);
                        });
                        image[connectionPropName] = connection;
                    });
                };
                PopupModalRegionAdapter.prototype._imageLoaded = function (evt) {
                    // Make the image visible once more
                    var imgNode = evt.target;
                    var connectionPropName = "attached_ModalRegion_ImageLoadedConnection";
                    if (imgNode[connectionPropName]) {
                        // Clear out the connection
                        dojo.disconnect(imgNode[connectionPropName]);
                        //GVH-3192
                        delete imgNode[connectionPropName];
                    }
                    // Reposition
                    this.positionContent();
                };
                PopupModalRegionAdapter.instance = null;
                return PopupModalRegionAdapter;
            }(ui.RegionAdapterBase));
            ui.PopupModalRegionAdapter = PopupModalRegionAdapter;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="Application.ts" />
// TODO: Rework this to not use _Url, move into Application.ts.
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var ApplicationCommands = (function () {
                function ApplicationCommands() {
                }
                /**
                 * @obsolete 2.6 The "OpenWebPage" command is no longer handled by Framework.
                 * In the viewer, it is handled by {@link geocortex.essentialsHtmlViewer.ViewerApplication}.
                 */
                ApplicationCommands.createCommands = function (app) {
                };
                return ApplicationCommands;
            }());
            application.ApplicationCommands = ApplicationCommands;
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../application/Application.ts" />
/// <reference path="../events/Event.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var commands;
        (function (commands) {
            var CommandRegistrationEntry = (function () {
                function CommandRegistrationEntry(impl, scope, canExecute) {
                    this.impl = impl;
                    this.scope = scope;
                    this.canExecute = canExecute;
                }
                return CommandRegistrationEntry;
            }());
            /**
             * Command provides a general purpose, loosely coupled command model. A command can have 0 or more implementations registered to it.
             */
            var Command = (function () {
                /**
                 * Initializes a new instance of the {@link Command} class.
                 * @param name The name of this command.
                 * @param app The {@link application.Application} that this command belongs to.
                 * @param canExecuteMode An optional string, either *any* or *all*.
                 * A `canExecuteMode` of *any* (the default) will prevent the command from running if any of the constituent implementations return false in their `canExecute` delegate.
                 * A `canExecuteMode` of *all* will only prevent the command from running if all of the constituent `canExecute` delegates return false.
                 */
                function Command(name, app, canExecuteMode) {
                    this._entries = {};
                    /** The {@link geocortex.framework.application.Application} that this command instance belongs to. */
                    this.app = null;
                    this.name = name;
                    this.app = app;
                    this.isWrapper = true;
                    this.canExecuteChanged = new framework.events.Event("{0}.CanExecuteChanged".format(name));
                    this.preExecute = new framework.events.Event("{0}.PreExecute".format(name));
                    this.postExecute = new framework.events.Event("{0}.PostExecute".format(name));
                    this.canExecuteMode = canExecuteMode != null && canExecuteMode != undefined ? canExecuteMode : "all";
                }
                /**
                 * Raises the canExecuteChanged event.
                 */
                Command.prototype.raiseCanExecuteChanged = function () {
                    this.canExecuteChanged.publish();
                };
                Command.prototype.canExecute = function (parameters) {
                    // Wrapper commands cannot execute.
                    if (this.isWrapper) {
                        return false;
                    }
                    for (var token in this._entries) {
                        if (!this._entries.hasOwnProperty(token)) {
                            continue;
                        }
                        var entry = this._entries[token];
                        // Same logic as GVS
                        if (entry.canExecute && entry.canExecute.apply(entry.scope, arguments)) {
                            // We really want to call the function before checking the flag???
                            if (this.canExecuteMode === "any") {
                                return true;
                            }
                        }
                        else {
                            if (this.canExecuteMode === "all") {
                                return false;
                            }
                        }
                    }
                    // If we haven't satisfied any _canExecutes and we require one, we can't execute.
                    if (this.canExecuteMode === "any") {
                        return false;
                    }
                    return true;
                };
                Command.prototype.execute = function (parameters) {
                    var hasEntries = false;
                    if (this._entries) {
                        for (var token in this._entries) {
                            if (this._entries.hasOwnProperty(token)) {
                                hasEntries = true;
                                break;
                            }
                        }
                    }
                    if (!hasEntries) {
                        this.app.trace.debug("Command '{0}' executed but no implementation registered.".format(this.name));
                        return;
                    }
                    // RequireAll? Check our canExecute.
                    if (this.canExecuteMode === "all") {
                        if (!this.canExecute.apply(this, arguments)) {
                            return;
                        }
                    }
                    // Log public commands when app is in debug mode
                    if (this.app && !!this.app.debugMode) {
                        // ... console debug not supported in IE 8-9
                        var msg = "Command '{0}' executed.".format(this.name);
                        if (console.debug) {
                            console.debug(msg);
                        }
                        else {
                            console.log(msg);
                        }
                    }
                    this.preExecute.publish.apply(this.preExecute, arguments);
                    for (var token in this._entries) {
                        if (!this._entries.hasOwnProperty(token)) {
                            continue;
                        }
                        var entry = this._entries[token];
                        // RequireAny? Skip command shards that can't execute.
                        if (this.canExecuteMode === "any" && !entry.canExecute.apply(entry.scope, arguments)) {
                            continue;
                        }
                        entry.impl.apply(entry.scope, arguments);
                    }
                    this.postExecute.publish.apply(this.postExecute, arguments);
                };
                /**
                 * Registers a command implementation that executes in a specific scope and with optional canExecute logic.
                 * @param scope The scope of which to execute the command implementation.
                 * @param implementation The implementation to add to this command/
                 * @param canExecute An optional canExecute method to decide whether this command fragment can execute or not.
                 */
                Command.prototype.register = function (scope, implementation, canExecute) {
                    this.isWrapper = false;
                    var token = geocortex.framework.utils.alphaNumericToken();
                    var entry = new CommandRegistrationEntry(implementation, scope, canExecute || this.defaultCanExecuteFunction);
                    this._entries[token] = entry;
                    // If this being registered by a framework object? If so, track it so it can be cleaned up automatically.
                    if (scope && scope instanceof geocortex.framework.FrameworkObject) {
                        scope.trackCommandHandler(this, token);
                    }
                    this.app.trace.debug("Registered an implementation for command '{0}'.".format(this.name));
                    this.raiseCanExecuteChanged();
                    return token;
                };
                /**
                 * The canExecute function to use if none is provided. (Always allows.)
                 * @private
                 */
                Command.prototype.defaultCanExecuteFunction = function () {
                    return true;
                };
                /**
                 * Removes a command implementation from this command, using the token returned when the implementation was registered.
                 * @param token The token that was returned when the command implementation was registered.
                 */
                Command.prototype.unregister = function (token) {
                    this.isWrapper = false;
                    if (!this._entries.hasOwnProperty(token)) {
                        return false;
                    }
                    delete this._entries[token];
                    this.app.trace.debug("Unregistered an implementation for command '{0}'.".format(this.name));
                    this.raiseCanExecuteChanged();
                    return true;
                };
                /**
                 * Clears this command of all implementations.
                 */
                Command.prototype.clear = function () {
                    this._entries = {};
                    this.raiseCanExecuteChanged();
                    this.app.trace.debug("Cleared all implementations of command '{0}'.".format(this.name));
                };
                return Command;
            }());
            commands.Command = Command;
        })(commands = framework.commands || (framework.commands = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../application/Application.ts" />
/// <reference path="Command.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var commands;
        (function (commands) {
            /**
             * CommandRegistry provides a safe method of referencing {@link geocortex.framework.commands.Command} instances
             * between loosely coupled components.
             */
            var CommandRegistry = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.commands.CommandRegistry} class.
                 * @param app An instance of {@link geocortex.framework.application.Application}.
                 */
                function CommandRegistry(app) {
                    /**
                     * Map object of commands held in this registry.
                     */
                    this.commands = {};
                    this.app = app;
                }
                /**
                 * Clears all commands.
                 */
                CommandRegistry.prototype.clear = function () {
                    for (var commandName in this.commands) {
                        if (!this.commands.hasOwnProperty(commandName)) {
                            continue;
                        }
                        this.commands[commandName].clear();
                    }
                };
                /**
                 * Fetches a command by name. If the command doesn't exist, a placeholder ("wrapper") command is created.
                 * @param name The name of the command to fetch.
                 */
                CommandRegistry.prototype.command = function (name) {
                    // Does a placeholder command already exist due to being prereferenced?
                    var existingCommand = this.commands[name];
                    if (!existingCommand) {
                        // Create a wrapped command.
                        var newCommand = new geocortex.framework.commands.Command(name, this.app);
                        newCommand.isWrapper = true;
                        this.commands[newCommand.name] = newCommand;
                        return newCommand;
                    }
                    return existingCommand;
                };
                return CommandRegistry;
            }());
            commands.CommandRegistry = CommandRegistry;
        })(commands = framework.commands || (framework.commands = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../application/Application.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config_1) {
            /** Loads an application configuration and fires a callback upon completion. */
            var ConfigurationLoader = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.ConfigurationLoader} class.
                 * @param app
                 */
                function ConfigurationLoader(app) {
                    this._targetConfigUri = null;
                    this.app = app;
                }
                /**
                 * Loads a configuration tree, publishing the ConfigurationLoadFailedEvent in the event of a failure.
                 * @param configUri URI of the configuration file to load.
                 * @param callback The callback to call upon success.
                 */
                ConfigurationLoader.prototype.loadConfigurationTree = function (configUri, callback) {
                    var _this = this;
                    this._targetConfigUri = configUri;
                    var noFly = checkList(this._targetConfigUri);
                    if (noFly) {
                        var error = new Error("Configuration cannot be loaded from this location.");
                        this.app.event("ConfigurationLoadFailedEvent").publish(error);
                        return;
                    }
                    this.app.fetchConfigResource({
                        url: this._targetConfigUri,
                        load: function (result) {
                            if (callback != null && callback != undefined) {
                                callback(result);
                            }
                        },
                        error: function (error) { return _this.app.event("ConfigurationLoadFailedEvent").publish(error); }
                    });
                };
                return ConfigurationLoader;
            }());
            config_1.ConfigurationLoader = ConfigurationLoader;
            function checkList(url) {
                var noFlyList = [
                    -1399014851,
                    -706512510 // "RestManager/documents"
                ];
                if (geocortex["_nonConfigs"]) {
                    noFlyList = geocortex["_nonConfigs"]
                        .map(function (nc) { return String.quickHashCode(nc.toLowerCase()); });
                }
                // Clean up the URL. //foo/baz/bar/../../ => //foo. This is done to prevent URLs like "REST/foo/../documents/readDocument" from
                // beating the blacklist. Unfortunately, the blacklist is all we have to work with here.
                var location = document.createElement("a");
                location.href = url.toLowerCase();
                url = location.href;
                // Critically important, decoding the URI as a URI *component* prevents this issue. Escaping it via `window.decodeURI` does not work.
                url = decodeURIComponent(url);
                // Handle multiple encodings.
                while (url.indexOf("%") > -1) {
                    url = decodeURIComponent(url);
                }
                // Since we are about to split into pairs, we need to ensure the spliting chars aren't duplicated, or the logic will fail.
                url = url.replace(/[\\\/:]+/g, "/");
                // Split into pairs. //foo/baz/bar => [foo, baz], [baz, bar]. This lets us work with fragments like "foo/baz" that we can hash
                // and check against blacklisted hashes.
                var fragments = url.split(/[\\\/:]/);
                var len = fragments.length;
                var pairs = fragments
                    .map(function (frag) { return frag.toLowerCase(); })
                    .map(function (frag, i) { return i < fragments.length - 1 ? [frag, fragments[i + 1]] : null; });
                pairs.pop();
                var noFly = false;
                pairs.forEach(function (pair) {
                    var hash = String.quickHashCode(pair[0] + "/" + pair[1]);
                    if (noFlyList.indexOf(hash) > -1) {
                        noFly = true;
                        return;
                    }
                });
                return noFly;
            }
            config_1.checkList = checkList;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config) {
            /**
             * Represents a reference to an application library and related configuration elements.
             */
            var LibraryConfig = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.LibraryConfig} class.
                 * @param idArg The ID of the library.
                 * @param uriArg The URI from which to download the library. **Note:** Must be relative.
                 */
                function LibraryConfig(idArg, uriArg) {
                    /** Array of locale ID/URI elements to fetch for this piece of code. */
                    this.locales = [];
                    /** The position in configuration that this library was declared at. */
                    this.position = 0;
                    /** Don't inject any styles from this library. */
                    this.omitStyles = false;
                    this.id = idArg;
                    this.uri = uriArg;
                }
                return LibraryConfig;
            }());
            config.LibraryConfig = LibraryConfig;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../FrameworkObject.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewModelBase = (function (_super) {
                __extends(ViewModelBase, _super);
                function ViewModelBase(app, libraryId) {
                    _super.call(this, app, libraryId);
                }
                ViewModelBase.prototype.initialize = function (config) {
                };
                /**
                 * Gets a language resource from the Application's resource dictionary, given a key, and optional locale.
                 * Returns null if the resource does not exist.
                 * @param key The resource key.
                 * @param locale The locale of the resource to fetch. Defaults to the current application locale.
                 */
                ViewModelBase.prototype.getResource = function (resourceKey, locale) {
                    return this.app.getResource(this.libraryId, resourceKey, locale);
                };
                return ViewModelBase;
            }(geocortex.framework.FrameworkObject));
            ui.ViewModelBase = ViewModelBase;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../ui/ViewModelBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config) {
            /**
             * Holds configuration information about a view.
             */
            var ViewConfig = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.ViewConfig} class.
                 * @param viewId The configured ID of this view.
                 * @param moduleName The name of the module that this view belongs to.
                 * @param typeName The type name of the instance for this view.
                 */
                function ViewConfig(viewId, moduleName, typeName) {
                    this.viewId = viewId;
                    this.moduleName = moduleName;
                    this.typeName = typeName;
                }
                return ViewConfig;
            }());
            config.ViewConfig = ViewConfig;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config) {
            /**
             * Holds configuration information about a view model
             */
            var ViewModelConfig = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.ViewModelConfig} class.
                 * @param viewModelId The configured ID of this view model.
                 * @param moduleName The name of the module that this view mode; belongs to.
                 * @param typeName The type name of the instance for this view model.
                 */
                function ViewModelConfig(viewModelId, moduleName, typeName) {
                    /** The ID of the library that this view model belongs to. */
                    this.libraryId = "";
                    /** Configuration materials to pass to the view model upon initialization.*/
                    this.configuration = {};
                    this.viewModelId = viewModelId;
                    this.moduleName = moduleName;
                    this.typeName = typeName;
                }
                return ViewModelConfig;
            }());
            config.ViewModelConfig = ViewModelConfig;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ViewConfig.ts" />
/// <reference path="ViewModelConfig.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config) {
            /**
             * Represents a configured module, including any configured {@link geocortex.framework.ui.ViewBase} and {@link geocortex.framework.ui.ViewModelBase}
             * objects belonging to the module.<
             */
            var ModuleConfig = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.ModuleConfig} class
                 * @param: moduleName The name of the module this configuration item represents.
                 * @param: moduleType The type name of the module this configuration item represents.
                 * @param: configuration The configuration object to pass to the module during initialization.
                 * @param: libraryId The configured library ID that this module belongs to.
                 */
                function ModuleConfig(moduleName, moduleType, configuration, libraryId) {
                    /** An array of {@link geocortex.framework.config.ViewConfig} objects configured for this module. */
                    this.viewConfigs = [];
                    /** An array of {@link geocortex.framework.config.ViewModelConfig} objects configured for this module. */
                    this.viewModelConfigs = [];
                    this.moduleName = moduleName;
                    this.moduleType = moduleType;
                    this.configuration = configuration;
                    this.libraryId = libraryId;
                }
                return ModuleConfig;
            }());
            config.ModuleConfig = ModuleConfig;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config) {
            /**
             * Holds configuration information about a widget.
             */
            var WidgetConfig = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.config.WidgetConfig} class.
                 * @param id The configured ID of this widget.
                 * @param libraryId The ID of the library that the resources for this widget live in.
                 */
                function WidgetConfig(id, libraryId) {
                    /** The fully-qualified typename of the view model this view will be bound to, if applicable. */
                    this.viewModelType = null;
                    /** Configuration materials to pass this view upon initialization. */
                    this.configuration = {};
                    /** The type name of the view instance. */
                    this.typeName = "";
                    /** An HTML resource key into the {@link geocortex.framework.application.ResourceManager} that will be used to load the view UI. */
                    this.markup = "";
                    this.id = id;
                    this.libraryId = libraryId;
                }
                return WidgetConfig;
            }());
            config.WidgetConfig = WidgetConfig;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../application/Application.ts" />
/// <reference path="LibraryConfig.ts" />
/// <reference path="ModuleConfig.ts" />
/// <reference path="ViewModelConfig.ts" />
/// <reference path="ViewConfig.ts" />
/// <reference path="WidgetConfig.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var config;
        (function (config_2) {
            /**
             * Represents configuration for a `Framework` application.
             */
            var ConfigurationModel = (function () {
                /**
                 * Initializes a new instance of the {@link ConfigurationModel} class.
                 * @param app The {@link geocortex.framework.application.Application} that this configuration model belongs to.
                 */
                function ConfigurationModel(app) {
                    /** Global application configuration values from the "application" section. */
                    this.application = {};
                    /** The configuration version of the model. */
                    this.version = "unknown";
                    /** The configured ID of this viewer. */
                    this.viewerId = "unknown";
                    /** The configured ID of the default library. Modules with no explicit libraryId reference will be considered as belonging to the default library. */
                    this.defaultLibraryId = "";
                    /** "Global" configuration values that can be referenced elsewhere in configuration. */
                    this.globals = null;
                    /** An array of {@link geocortex.framework.config.LibraryConfig} objects representing external library dependencies. */
                    this.libraryConfigs = [];
                    /** An array of {@link geocortex.framework.config.ModuleConfig} objects representing all of the configured modules in this configuration model. */
                    this.moduleConfigs = [];
                    /** An array of {@link geocortex.framework.config.WidgetConfig} objects representing all of the configured widgets in this configuration model. */
                    this.widgetConfigs = [];
                    /** An object map that maps a library ID to a collection of {@link geocortex.framework.config.ModuleConfig} objects belonging to that library. */
                    this.libraryModules = {};
                    /** An array of references to external locale resources. */
                    this.externalLocaleReferences = [];
                    this.app = app;
                }
                ConfigurationModel.prototype.parse = function (configuration, callback) {
                    var config = (typeof configuration === "object") ? configuration : JSON.parse(configuration);
                    if (!config["configuration"]) {
                        var defaultConfig = {
                            version: "1.0",
                            viewerId: "unknown",
                            application: {},
                            defaultLibraryId: "",
                            libraries: [],
                            modules: [],
                            widgets: []
                        };
                        config["configuration"] = defaultConfig;
                    }
                    var libraryElements;
                    var moduleElements;
                    var widgetElements;
                    // Try and grab our basic elements.
                    try {
                        this.application = config["configuration"]["application"] || {};
                        this.version = config["configuration"]["version"] || "1.0";
                        this.viewerId = config["configuration"]["viewerId"] || "unknown";
                        this.defaultLibraryId = config["configuration"]["defaultLibraryId"] || null;
                        libraryElements = config["configuration"]["libraries"] || [];
                        moduleElements = config["configuration"]["modules"] || [];
                        widgetElements = config["configuration"]["widgets"] || [];
                        this.app.trace.debug("Config version: {0}.".format(this.version));
                    }
                    catch (err) {
                        this.app.trace.error("Error reading configuration: {0}".format(err), err);
                        return;
                    }
                    // Read library configs.
                    if (libraryElements && libraryElements.length > 0) {
                        for (var i = 0; i < libraryElements.length; ++i) {
                            var libraryElement = libraryElements[i];
                            // Perform token injection in library element.
                            // Note that since the libraries have not actually been loaded, language strings can't be used here - only config tokens.
                            libraryElement = this.app.translateConfiguration(libraryElement.id, libraryElement);
                            // If we have no default library, grab the first one.
                            if (this.defaultLibraryId == null) {
                                this.defaultLibraryId = libraryElement.id;
                            }
                            // Create a real lib config.
                            var libConfig = new geocortex.framework.config.LibraryConfig(libraryElement.id, libraryElement.uri);
                            libConfig.position = i;
                            libConfig.omitStyles = libraryElement.omitStyles || false;
                            this.libraryConfigs.push(libConfig);
                            // Add so we can track modules that reference this library.
                            this.libraryModules[libraryElement.id] = [];
                            // Does this library reference any external locale resources?
                            if (libraryElement.locales) {
                                for (var j = 0; j < libraryElement.locales.length; ++j) {
                                    var localeElement = libraryElement.locales[j];
                                    localeElement.locale = localeElement.locale.toLowerCase();
                                    // Keep a reference to this locale entry so it can be loaded later.
                                    if (localeElement.hasOwnProperty("uri")) {
                                        localeElement.libraryId = libraryElement.id;
                                        libConfig.locales.push(localeElement);
                                        this.externalLocaleReferences.push(localeElement);
                                    }
                                }
                            }
                        }
                    }
                    // Read module configurations.
                    if (moduleElements && moduleElements.length > 0) {
                        for (var j = 0; j < moduleElements.length; ++j) {
                            var moduleElement = moduleElements[j];
                            var libraryId = moduleElement.libraryId;
                            if (!libraryId) {
                                libraryId = this.defaultLibraryId;
                            }
                            // Note that at this point module configuration has not been translated - we need to download libraries before we can do that.
                            var gcxModule = new geocortex.framework.config.ModuleConfig(moduleElement.moduleName, moduleElement.moduleType, moduleElement.configuration, libraryId);
                            // We'll map this module to a library so that when the library is loaded the viewer will know to instantiate the module.
                            if (!this.libraryModules[libraryId]) {
                                this.app.trace.error("Unknown library '{0}'.".format(libraryId));
                            }
                            else {
                                this.libraryModules[libraryId].push(gcxModule);
                            }
                            // Next we'll grab any view configs associated with this module.
                            var moduleViewsElement = moduleElement["views"];
                            if (moduleViewsElement) {
                                for (var k = 0; k < moduleViewsElement.length; ++k) {
                                    var viewConfigElement = moduleViewsElement[k];
                                    // If no view type is specified, default to ViewBase.
                                    var viewType = viewConfigElement["type"] || "geocortex.framework.ui.ViewBase";
                                    var viewConfig = new geocortex.framework.config.ViewConfig(viewConfigElement["id"], moduleElement["moduleName"], viewType);
                                    // Add this view to the module config.
                                    gcxModule.viewConfigs.push(viewConfig);
                                    viewConfig.libraryId = viewConfigElement.libraryId || libraryId;
                                    // Optional view model reference.
                                    viewConfig.viewModelId = viewConfigElement["viewModelId"] || null;
                                    viewConfig.markupResource = viewConfigElement["markup"] || null;
                                    viewConfig.configuration = viewConfigElement["configuration"] || {};
                                    viewConfig.regionName = viewConfigElement["region"] || null;
                                    viewConfig.isManaged = viewConfigElement["isManaged"] || false;
                                    viewConfig.isVisible = viewConfigElement["visible"] || false;
                                    viewConfig.title = viewConfigElement["title"] || null;
                                    viewConfig.description = viewConfigElement["description"] || "";
                                    viewConfig.iconUri = viewConfigElement["iconUri"] || "";
                                }
                            }
                            // Finally, we'll grab view model configs.
                            var moduleViewModelsElement = moduleElement["viewModels"];
                            if (moduleViewModelsElement) {
                                for (var k = 0; k < moduleViewModelsElement.length; ++k) {
                                    var viewModelConfigElement = moduleViewModelsElement[k];
                                    var viewModelConfig = new geocortex.framework.config.ViewModelConfig(viewModelConfigElement["id"], moduleElement["moduleName"], viewModelConfigElement["type"]);
                                    // Add the view model to the module config.
                                    gcxModule.viewModelConfigs.push(viewModelConfig);
                                    viewModelConfig.libraryId = viewModelConfigElement.libraryId || libraryId;
                                    // Optional configuration.
                                    if (viewModelConfigElement["configuration"]) {
                                        viewModelConfig.configuration = viewModelConfigElement["configuration"];
                                    }
                                }
                            }
                            this.moduleConfigs.push(gcxModule);
                        }
                    }
                    // Widgets
                    if (widgetElements && widgetElements.length > 0) {
                        for (var i = 0; i < widgetElements.length; ++i) {
                            var widgetConfig = new geocortex.framework.config.WidgetConfig(widgetElements[i].id, widgetElements[i].libraryId || this.defaultLibraryId);
                            dojo.safeMixin(widgetConfig, widgetElements[i]);
                            this.widgetConfigs.push(widgetConfig);
                        }
                    }
                    if (callback) {
                        callback(this);
                    }
                };
                return ConfigurationModel;
            }());
            config_2.ConfigurationModel = ConfigurationModel;
        })(config = framework.config || (framework.config = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="Event.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var events;
        (function (events) {
            /**
             * EventRegistry provides safe, loosely-coupled access to events in a manner similar to {@link geocortex.framework.commands.CommandRegistry}.
             * If a non-existent event is referenced, it is created.
             * An EventRegistry instance should always be used when referencing commands.
             * A global EventRegistry instance lives in the base {@link geocortex} namespace.
             */
            var EventRegistry = (function () {
                /** Initializes a new instance of the {@link geocortex.framework.events.EventRegistry} class. */
                function EventRegistry(app) {
                    this.events = {};
                    this.app = app;
                }
                /**
                 * Clears all events, removing all subscriptions.
                 */
                EventRegistry.prototype.clear = function () {
                    for (var event in this.events) {
                        if (!this.events.hasOwnProperty(event)) {
                            continue;
                        }
                        this.events[event].clear();
                    }
                };
                /**
                 * Fetches an event by name. If the event doesn't exist, an empty one is created.
                 * @param name The name of the event to fetch or create.
                 */
                EventRegistry.prototype.event = function (name) {
                    var existingEvent = this.events[name];
                    if (!existingEvent) {
                        // Create a blank event.
                        var newEvent = new geocortex.framework.events.Event(name, this.app);
                        existingEvent = newEvent;
                        this.events[name] = existingEvent;
                    }
                    return existingEvent;
                };
                return EventRegistry;
            }());
            events.EventRegistry = EventRegistry;
        })(events = framework.events || (framework.events = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            var StorageStats = (function () {
                function StorageStats() {
                    this.capacity = StorageStats.UNKNOWN;
                    this.sizeInChars = StorageStats.UNKNOWN;
                    this.numKeys = StorageStats.UNKNOWN;
                }
                StorageStats.UNKNOWN = -1;
                return StorageStats;
            }());
            storage.StorageStats = StorageStats;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="StorageStats.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            var StorageProviderBase = (function () {
                function StorageProviderBase(app) {
                    this.app = app;
                    this.keyNamespace = app.id;
                }
                /**
                 * Initializes this provider.
                 */
                StorageProviderBase.prototype.initialize = function () {
                };
                /**
                 * Detects whether or not this provider is supported by the current user agent.
                 */
                StorageProviderBase.prototype.isSupported = function () {
                    return false;
                };
                /**
                 * Returns a boolean value indicating whether or not this provider mechanism is full.
                 */
                StorageProviderBase.prototype.isFull = function () {
                    return false;
                };
                /**
                 * Returns a new {@link StorageStats} Object.
                 */
                StorageProviderBase.prototype.getStats = function () {
                    return new storage.StorageStats();
                };
                /**
                 * Returns the scoring value for this provider, if supported.
                 */
                StorageProviderBase.prototype.getScore = function () {
                    return 0;
                };
                /**
                 * Clears all data for the current application.
                 * @param successCallback
                 * @parma errorCallback
                 */
                StorageProviderBase.prototype.clear = function (successCallback, errorCallback) { };
                /**
                 * Clears all data for all applications.
                 * @param successCallback
                 * @parma errorCallback
                 */
                StorageProviderBase.prototype.clearAllData = function (successCallback, errorCallback) { };
                /**
                 * Fetches a value based on its key.
                 * @param key The key of the value to fetch.
                 * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
                 * @param errorCallback The callback to fire if an error occurs.
                 * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
                 */
                StorageProviderBase.prototype.get = function (key, successCallback, errorCallback, shared) { };
                /**
                 * Adds a new key/value pair to storage or overwrites an existing one.
                 * @param key The key of the value to store.
                 * @param value The value to store.
                 * @param successCallback The callback to fire upon success.
                 * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
                 * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
                 */
                StorageProviderBase.prototype.set = function (key, value, successCallback, errorCallback, shared) { };
                /**
                 * Removes a key and associated value from the store.
                 * @param key The key for which key/value pair to remove.
                 * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
                 * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
                 * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
                 */
                StorageProviderBase.prototype.remove = function (key, successCallback, errorCallback, shared) { };
                return StorageProviderBase;
            }());
            storage.StorageProviderBase = StorageProviderBase;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../_Definitions/dojo.d.ts" />
/// <reference path="../../_Definitions/webkitwindow.d.ts" />
/// <reference path="../../_Definitions/phonegap.d.ts" />
/// <reference path="../../_Definitions/filesystem.d.ts" />
/// <reference path="../utils/String.ts" />
/// <reference path="StorageProviderBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            var FileStorageProvider = (function (_super) {
                __extends(FileStorageProvider, _super);
                function FileStorageProvider() {
                    _super.apply(this, arguments);
                    /** Whether or not we are currently initializing. */
                    this._isInitializing = false;
                    this._initializationSuccessCallback = null;
                    this._initializationErrorCallback = null;
                    /** Default amount of size to request. */
                    this._defaultDesiredSize = 500 * 1024 * 1024;
                    /** Value to represent temporary file storage option. */
                    this._storageTypeTemporary = 0;
                    /** Value to represent persistent file storage option. */
                    this._storageTypePersistent = 1;
                    /** An error that occurred. The presence of a value here indicates that the provider is not useable. */
                    this._error = null;
                    /** Do we know this thing is full? */
                    this._isFull = false;
                    /** Has this provider been initialized? */
                    this._isInitialized = false;
                }
                /**
                 * Initializes this provider.
                 */
                FileStorageProvider.prototype.initialize = function (desiredSize) {
                    var _this = this;
                    if (this._isInitialized || this._error) {
                        return;
                    }
                    _super.prototype.initialize.call(this);
                    if (!this.isSupported()) {
                        this.app.trace.warning("The HTML5 storage provider could not be initialized. The File API is not supported by this browser.");
                        return;
                    }
                    if (!desiredSize) {
                        if (this.app.configuration && this.app.configuration["offlineStorageSpaceMb"]) {
                            desiredSize = parseInt(this.app.configuration["offlineStorageSpaceMb"], 10) * 1024 * 1024;
                        }
                        if (!desiredSize) {
                            desiredSize = this._defaultDesiredSize;
                        }
                    }
                    // Callback for when the filesystem is initialized.
                    var fsInitialized = function (filesystem) {
                        if (!_this._isInitialized) {
                            _this._isInitialized = true;
                            _this.app.trace.debug("Filesystem '{0}' initialized successfully.".format(filesystem.name));
                            _this._filesystem = filesystem;
                            _this._error = null;
                            _this._initializationSuccessCallback(filesystem);
                        }
                    };
                    if (!navigator.webkitPersistentStorage && !window.webkitStorageInfo) {
                        // Non-WebKit (e.g. Cordova's API).
                        this._requestFileSystem(LocalFileSystem.PERSISTENT, desiredSize, fsInitialized, function (error) {
                            error = _this._shapeError(error);
                            _this._error = error;
                            _this._initializationErrorCallback(error);
                        });
                    }
                    else {
                        // WebKit browsers
                        this._requestQuota(this._storageTypePersistent, desiredSize, function (granted) {
                            if (!this._isInitialized) {
                                _this.app.trace.debug("HTML5 File API quota granted. Size: {0} bytes.".format(granted));
                                // Request and call fsInitialized on success.
                                _this._requestFileSystem(window.PERSISTENT, desiredSize, fsInitialized, function (error) {
                                    error = _this._shapeError(error);
                                    _this._error = error;
                                    _this._initializationErrorCallback(error);
                                });
                            }
                        }, function (error) {
                            error = _this._shapeError(error);
                            _this._error = error;
                            _this.app.trace.error("Error requesting filesystem quota: {0}".format(error.toString()), error);
                            _this._initializationErrorCallback(error);
                        });
                    }
                };
                /**
                 * Detects whether or not Local Storage is supported by the current user agent.
                 */
                FileStorageProvider.prototype.isSupported = function () {
                    return !!(window.requestFileSystem || window.webkitRequestFileSystem);
                };
                /**
                 * Returns a boolean value indicating whether or not Local Storage is full.
                 */
                FileStorageProvider.prototype.isFull = function () {
                    return this._isFull;
                };
                /**
                 * Returns the scoring value for this provider, if supported.
                 */
                FileStorageProvider.prototype.getScore = function () {
                    this.initialize();
                    return 5;
                };
                /**
                 * Returns stats about the underlying mechanism.
                 */
                FileStorageProvider.prototype.getStats = function () {
                    this.initialize();
                    return new storage.StorageStats();
                };
                /**
                 * Ensures the provider is initialized before performing an action.
                 */
                FileStorageProvider.prototype._ensureInitializedThen = function (successCallback) {
                    var handle = null;
                    if (this._isInitialized) {
                        successCallback.apply(this, []);
                    }
                    else if (!this._isInitializing) {
                        var _this = this;
                        this._isInitializing = true;
                        handle = dojo.connect(this, "_initializationSuccessCallback", function () {
                            dojo.disconnect(handle);
                            successCallback.apply(_this, []);
                        });
                        this.initialize();
                    }
                    else {
                        handle = dojo.connect(this, "_initializationSuccessCallback", function () {
                            dojo.disconnect(handle);
                            successCallback.apply(_this, []);
                        });
                    }
                };
                /**
                 * Ensures initialization unless it's known that storage has not been granted
                 * and the call will ask the user to grant storage, then skipCallback is called.
                 * @param successCallback
                 * @param skipCallback
                 */
                FileStorageProvider.prototype._silentlyEnsureInitializeThen = function (successCallback, skipCallback) {
                    var _this = this;
                    if (this._isInitialized || this._isInitializing || (!navigator.webkitPersistentStorage && !window.webkitStorageInfo)) {
                        _this._ensureInitializedThen(successCallback);
                        return;
                    }
                    this._queryUsageAndQuota(this._storageTypePersistent, function (used, quota) {
                        if (used == 0 && quota == 0) {
                            skipCallback();
                        }
                        else {
                            _this._ensureInitializedThen(successCallback);
                        }
                    }, function (error) {
                        error = _this._shapeError(error);
                        _this.app.trace.warning("An error occurred while trying to fetch file API usage information: {0}".format(error.toString()));
                    });
                };
                /**
                 * Perform window.requestFileSystem or window.webkitRequestFileSystem
                 * @param type
                 * @param size
                 * @param successCallback
                 * @param errorCallback
                 */
                FileStorageProvider.prototype._requestFileSystem = function (type, size, successCallback, errorCallback) {
                    if (window.requestFileSystem) {
                        window.requestFileSystem(type, size, successCallback, errorCallback);
                    }
                    else if (window.webkitRequestFileSystem) {
                        window.webkitRequestFileSystem(type, size, successCallback, errorCallback);
                    }
                    else {
                        throw new Error("No request filesystem method found");
                    }
                };
                /**
                 * Perform navigator.webkit[Temporary|Persistent]Storage.requestQuota or window.webkitStorageInfo.requestQuota
                 * @param storageType
                 * @param newQuotaInBytes
                 * @param successCallback
                 * @param errorCallback
                 */
                FileStorageProvider.prototype._requestQuota = function (storageType, newQuotaInBytes, successCallback, errorCallback) {
                    var webkitNavigator = navigator;
                    var webkitWindow = window;
                    switch (storageType) {
                        case this._storageTypeTemporary:
                            if (webkitNavigator.webkitTemporaryStorage && webkitNavigator.webkitTemporaryStorage.requestQuota) {
                                webkitNavigator.webkitTemporaryStorage.requestQuota(newQuotaInBytes, successCallback, errorCallback);
                            }
                            else if (webkitWindow.webkitStorageInfo && webkitWindow.webkitStorageInfo.requestQuota) {
                                webkitWindow.webkitStorageInfo.requestQuota(window.TEMPORARY, newQuotaInBytes, successCallback, errorCallback);
                            }
                            break;
                        case this._storageTypePersistent:
                            if (webkitNavigator.webkitPersistentStorage && webkitNavigator.webkitPersistentStorage.requestQuota) {
                                webkitNavigator.webkitPersistentStorage.requestQuota(newQuotaInBytes, successCallback, errorCallback);
                            }
                            else if (webkitWindow.webkitStorageInfo && webkitWindow.webkitStorageInfo.requestQuota) {
                                webkitWindow.webkitStorageInfo.requestQuota(window.PERSISTENT, newQuotaInBytes, successCallback, errorCallback);
                            }
                            break;
                        default:
                            break;
                    }
                };
                /**
                 * Perform navigator.webkit[Temporary|Persistent]Storage.requestQuota or window.webkitStorageInfo.requestQuota
                 * @param storageType
                 * @param successCallback
                 * @param errorCallback
                 */
                FileStorageProvider.prototype._queryUsageAndQuota = function (storageType, successCallback, errorCallback) {
                    var webkitNavigator = navigator;
                    var webkitWindow = window;
                    switch (storageType) {
                        case this._storageTypeTemporary:
                            if (webkitNavigator.webkitTemporaryStorage && webkitNavigator.webkitTemporaryStorage.queryUsageAndQuota) {
                                webkitNavigator.webkitTemporaryStorage.queryUsageAndQuota(successCallback, errorCallback);
                            }
                            else if (webkitWindow.webkitStorageInfo && webkitWindow.webkitStorageInfo.queryUsageAndQuota) {
                                webkitWindow.webkitStorageInfo.queryUsageAndQuota(window.TEMPORARY, successCallback, errorCallback);
                            }
                            break;
                        case this._storageTypePersistent:
                            if (webkitNavigator.webkitPersistentStorage && webkitNavigator.webkitPersistentStorage.queryUsageAndQuota) {
                                webkitNavigator.webkitPersistentStorage.queryUsageAndQuota(successCallback, errorCallback);
                            }
                            else if (webkitWindow.webkitStorageInfo && webkitWindow.webkitStorageInfo.queryUsageAndQuota) {
                                webkitWindow.webkitStorageInfo.queryUsageAndQuota(window.PERSISTENT, successCallback, errorCallback);
                            }
                            break;
                        default:
                            break;
                    }
                };
                /**
                 * Writes a value to the filesystem. The path of the file will match the key, and the file will contain the value.
                 * @param key
                 * @param value
                 * @param successCallback
                 * @param errorCallback
                 */
                FileStorageProvider.prototype._writeValue = function (key, value, successCallback, errorCallback, shared) {
                    var _this = this;
                    var namespace = shared ? "" : (this.keyNamespace);
                    function onError(error) {
                        // Shape this error and ensure it is a regular Error and not a FileError - we don't want to leak implementation details.
                        // Consumers of the Store mechanism should always receive the same type of Error.
                        error = _this._shapeError(error);
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    }
                    function getFile(onSuccess) {
                        if (shared) {
                            _this._filesystem.root.getFile(key + ".json", { create: true, exclusive: false }, onSuccess, onError);
                        }
                        else {
                            _this._filesystem.root.getDirectory(namespace, { create: true, exclusive: false }, function (dirEntry) {
                                _this._filesystem.root.getFile(namespace + "/" + key + ".json", { create: true, exclusive: false }, onSuccess, onError);
                            }, onError);
                        }
                    }
                    function writeFile(fileEntry) {
                        // Clear out the file.
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.truncate(0);
                        });
                        // Create a FileWriter object for our FileEntry.
                        fileEntry.createWriter(function (fileWriter) {
                            // Write completed callback. evt is a ProgressEvent.
                            fileWriter.onwriteend = function (evt) {
                                _this.app.trace.debug("Wrote {0} bytes to filesystem.".format(evt.total));
                            };
                            // Write error callback.
                            fileWriter.onerror = function (error) {
                                error = _this._shapeError(error);
                                _this.app.trace.debug("Write failed: {0}".format(error));
                                if (errorCallback) {
                                    errorCallback(error);
                                }
                            };
                            var failed = false;
                            try {
                                // NOTE: Cordova is the new name of PhoneGap.
                                // TODO: Improve Cordova detection support. This check will currently return true anytime the Cordova lib is included in the build.
                                var cordova = (typeof window.cordova !== "undefined") && window.cordova.exec;
                                //var cordova = (typeof device !== "undefined") && device.cordova;
                                // Cordova does not support binary data, due to the marshalling mechanism. We'll have to call "write" with a string.
                                var success = false;
                                if (cordova) {
                                    fileWriter.write(value);
                                    success = true;
                                }
                                if (!success && typeof Blob !== "undefined") {
                                    // In Chrome 18 (currently used on mobile) this is broken
                                    try {
                                        var blob = new Blob([value], { type: "text/plain" });
                                        fileWriter.write(blob);
                                        success = true;
                                    }
                                    catch (blobError) {
                                        _this.app.trace.debug("Failed to create blob \"" + blobError + "\". Falling back to BlobBuilder.");
                                    }
                                }
                                if (!success) {
                                    // BlobBuilder support across browsers is spotty, and it is being deprecated.
                                    var bb = null;
                                    if (typeof BlobBuilder !== "undefined") {
                                        bb = new BlobBuilder();
                                    }
                                    else if (typeof WebKitBlobBuilder !== "undefined") {
                                        bb = new WebKitBlobBuilder();
                                    }
                                    else if (typeof MSBlobBuilder !== "undefined") {
                                        bb = new MSBlobBuilder();
                                    }
                                    if (!bb) {
                                        throw new Error("Error writing to File API file: No BlobBuilder implementation found.");
                                    }
                                    bb.append(value);
                                    fileWriter.write(bb.getBlob("text/plain"));
                                }
                            }
                            catch (error) {
                                failed = true;
                                onError(error);
                            }
                            if (!failed) {
                                successCallback();
                            }
                        });
                    }
                    try {
                        getFile(writeFile);
                    }
                    catch (error) {
                        onError(error);
                    }
                };
                /**
                 * Reads a value from a filesystem file whose name matches the key.
                 * @param key
                 * @param successCallback
                 * @param errorCallback
                 * @param shared
                 */
                FileStorageProvider.prototype._readValue = function (key, successCallback, errorCallback, shared) {
                    var _this = this;
                    var namespace = shared ? "" : (this.keyNamespace + "/");
                    function handleReadError(error) {
                        // Not found? Pass null to the successcallback. Nothing failed, we just didn't find the key.
                        if (error["code"] && error.code === FileError.NOT_FOUND_ERR) {
                            successCallback(null);
                            return;
                        }
                        error = _this._shapeError(error);
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    }
                    _this._filesystem.root.getFile(namespace + key + ".json", {}, function (fileEntry) {
                        // Get a File object representing the file,
                        // then use FileReader to read its contents.
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                successCallback(this.result);
                            };
                            try {
                                reader.readAsText(file);
                            }
                            catch (error) {
                                handleReadError(error);
                            }
                        }, handleReadError);
                    }, handleReadError);
                };
                /**
                 * If passed a FileError, this method will format a message for it and return a regular Error object.
                 * This is to avoid "leaking" File API implementation details through the StorageProviderBase interface.
                 * @param {Error} e
                 */
                FileStorageProvider.prototype._shapeError = function (e) {
                    var msg = "";
                    // Note: Chrome likes to throw a FileException object that matches the signature of FileError.
                    // There's something funny about FileException - if you type "FileException" in the Chrome console, it's not defined.
                    // We'll look for a "code" member instead of checking the type of e.
                    //if (e instanceof FileError) {
                    if (e.hasOwnProperty("code")) {
                        switch (e.code) {
                            case FileError.QUOTA_EXCEEDED_ERR:
                                msg = "Quota Exceeded.";
                                break;
                            case FileError.NOT_FOUND_ERR:
                                msg = "File not found.";
                                break;
                            case FileError.SECURITY_ERR:
                                msg = "Security error.";
                                break;
                            case FileError.INVALID_MODIFICATION_ERR:
                                msg = "Invalid modification.";
                                break;
                            case FileError.INVALID_STATE_ERR:
                                msg = "Invalid state.";
                                break;
                            default:
                                msg = "Unknown Error.";
                                break;
                        }
                        e = new Error("File error: {0}.".format(msg));
                    }
                    return e;
                };
                /**
                 * Clears all data for the current application.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                FileStorageProvider.prototype.clear = function (successCallback, errorCallback) {
                    var _this = this;
                    function errorHandler(error) {
                        if (errorCallback) {
                            error = _this._shapeError(error);
                            errorCallback(error);
                        }
                    }
                    this._silentlyEnsureInitializeThen(function () {
                        _this._filesystem.root.getDirectory(this.keyNamespace, { create: false }, function (dirEntry) {
                            dirEntry.removeRecursively(function () {
                                if (successCallback) {
                                    successCallback();
                                }
                            }, errorHandler);
                        }, function (error) {
                            if (error.code === FileError.NOT_FOUND_ERR) {
                                // If the directory we're looking for is not found, then it's cleared
                                successCallback();
                            }
                            else {
                                // If we've had an error other then file not found, then we should bubble it.
                                errorHandler(error);
                            }
                        });
                    }, successCallback);
                };
                /**
                 * Clears all data for this domain.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                FileStorageProvider.prototype.clearAllData = function (successCallback, errorCallback) {
                    var _this = this;
                    this._silentlyEnsureInitializeThen(function () {
                        try {
                            var dirReader = _this._filesystem.root.createReader();
                            var files = [];
                            var directories = [];
                            var remainingFiles = 0;
                            var remainingFolders = 0;
                            var errors = 0;
                            // We need to delete all files and all folders before considering ourselves done.
                            var deleteFilesDfd = new dojo.Deferred();
                            var deleteDirectoriesDfd = new dojo.Deferred();
                            var deleteComplete = new dojo.DeferredList([deleteFilesDfd, deleteDirectoriesDfd]);
                            // This deferred list will fire once all files and directories have been deleted (or errored out).
                            deleteComplete.then(function (results) {
                                // Fire the error callback if any errors occurred.
                                if (errors) {
                                    if (errorCallback) {
                                        errorCallback(new Error("{0} errors were encountered while clearing the storage provider.".format(errors)));
                                    }
                                }
                                else {
                                    if (successCallback) {
                                        successCallback();
                                    }
                                }
                            });
                            deleteComplete.addErrback(function (error) {
                                if (errorCallback) {
                                    error = _this._shapeError(error);
                                    errorCallback(error);
                                }
                            });
                            // This function deletes files.
                            var deleteFiles = function () {
                                // Callback for when a file is successfully deleted. Resolves the deferred file deletion object if no files remain.
                                var removeFileSuccess = function () {
                                    --remainingFiles;
                                    if (remainingFiles <= 0) {
                                        deleteFilesDfd.resolve();
                                        deleteDirectoriesDfd.resolve();
                                    }
                                };
                                // Callback for when an error occurs while attempting to delete a file. Resolves the deferred file deletion object if no files remain.
                                var removeFileError = function (error) {
                                    error = _this._shapeError(error);
                                    _this.app.trace.warning("Error removing local file: {0}.".format(error.toString()));
                                    --remainingFiles;
                                    ++errors;
                                    if (remainingFiles <= 0) {
                                        deleteFilesDfd.resolve();
                                    }
                                };
                                // Callback for when a fileEntry is obtained for a file we wish to delete.
                                var gotFileToRemove = function (fileEntry) {
                                    fileEntry.remove(removeFileSuccess, removeFileError);
                                };
                                // Callback for when an error occurs while attempting to find a fileEntry for deletion.
                                var gotFileToRemoveError = function (error) {
                                    error = _this._shapeError(error);
                                    _this.app.trace.warning("Could not obtain file for removal: {0}.".format(error.toString()));
                                    deleteDirectoriesDfd.errback(error);
                                };
                                remainingFiles = files.length;
                                if (remainingFiles === 0) {
                                    deleteFilesDfd.resolve();
                                    deleteDirectoriesDfd.resolve();
                                }
                                else {
                                    if (files.length === 0) {
                                        deleteFilesDfd.resolve();
                                        deleteDirectoriesDfd.resolve();
                                    }
                                    else {
                                        for (var i = 0; i < files.length; ++i) {
                                            try {
                                                _this._filesystem.root.getFile(files[i], {}, gotFileToRemove, gotFileToRemoveError);
                                            }
                                            catch (error) {
                                                error = _this._shapeError(error);
                                                deleteComplete.errback(error);
                                            }
                                        }
                                    }
                                }
                            };
                            // Callback for when a file is successfully deleted. Resolves the deferred file deletion object if no files remain.
                            var removeFolderSuccess = function () {
                            };
                            // Callback for when an error occurs while attempting to delete a folder. Resolves the deferred folder deletion object if no folders remain.
                            var removeFolderError = function (error) {
                                error = _this._shapeError(error);
                                _this.app.trace.warning("Error removing local folder: {0}.".format(error.toString()));
                                ++errors;
                                if (remainingFolders <= 0) {
                                    deleteDirectoriesDfd.resolve();
                                }
                            };
                            // Call readEntries() until no more results are returned.
                            var readEntries = function () {
                                dirReader.readEntries(function (results) {
                                    if (!results.length) {
                                        deleteFiles();
                                    }
                                    else {
                                        for (var i = 0; i < results.length; ++i) {
                                            var entry = results[i];
                                            if (entry.isDirectory) {
                                                entry.removeRecursively(removeFolderSuccess, removeFolderError);
                                            }
                                            else {
                                                files.push(entry.fullPath);
                                            }
                                        }
                                        readEntries();
                                    }
                                }, function (error) {
                                    error = _this._shapeError(error);
                                    if (errorCallback) {
                                        errorCallback(error);
                                    }
                                });
                            };
                            // Read all entries at the root level.
                            readEntries();
                        }
                        catch (error) {
                            error = _this._shapeError(error);
                            if (errorCallback) {
                                errorCallback(error);
                            }
                        }
                    }, successCallback);
                };
                /**
                 * Fetches a value based on its key.
                 * @param key The key of the value to fetch.
                 * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
                 * @param errorCallback The callback to fire if an error occurs.
                 * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
                 */
                FileStorageProvider.prototype.get = function (key, successCallback, errorCallback, shared) {
                    var _this = this;
                    this._silentlyEnsureInitializeThen(function () {
                        try {
                            _this._readValue(key, successCallback, errorCallback, shared);
                        }
                        catch (error) {
                            error = _this._shapeError(error);
                            if (errorCallback) {
                                errorCallback(error);
                            }
                        }
                    }, function () {
                        successCallback(null);
                    });
                };
                /**
                 * Adds a new key/value pair to storage or overwrites an existing one.
                 * @param key The key for the value being stored.
                 * @param value The value to store.
                 * @param successCallback The callback to fire upon success.
                 * @param errorCallback The callback to fire if an error occurs.
                 * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
                 */
                FileStorageProvider.prototype.set = function (key, value, successCallback, errorCallback, shared) {
                    var _this = this;
                    this._ensureInitializedThen(function () {
                        try {
                            _this._writeValue(key, value, successCallback, errorCallback, shared);
                        }
                        catch (error) {
                            error = _this._shapeError(error);
                            if (errorCallback) {
                                errorCallback(error);
                            }
                        }
                    });
                };
                /**
                 * Removes a key and associated value from the store.
                 * @param key The key for which key/value pair to remove.
                 * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
                 * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
                 * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
                 */
                FileStorageProvider.prototype.remove = function (key, successCallback, errorCallback, shared) {
                    var _this = this;
                    var namespace = shared ? "" : this.keyNamespace;
                    this._ensureInitializedThen(function () {
                        try {
                            // Callback for when a fileEntry is obtained for a file we wish to delete.
                            var gotFileToRemove = function (fileEntry) {
                                fileEntry.remove(successCallback, function (error) {
                                    error = _this._shapeError(error);
                                    if (errorCallback) {
                                        errorCallback(error);
                                    }
                                });
                            };
                            // Callback for when an error occurs while attempting to find a fileEntry for deletion.
                            var gotFileToRemoveError = function (error) {
                                error = _this._shapeError(error);
                                _this.app.trace.debug("Could not obtain file for removal: {0}.".format(error.toString()));
                                if (errorCallback) {
                                    errorCallback(error);
                                }
                            };
                            _this._filesystem.root.getFile(namespace + "/" + key + ".json", { create: false }, gotFileToRemove, gotFileToRemoveError);
                        }
                        catch (error) {
                            error = _this._shapeError(error);
                            if (errorCallback) {
                                errorCallback(error);
                            }
                        }
                    });
                };
                return FileStorageProvider;
            }(storage.StorageProviderBase));
            storage.FileStorageProvider = FileStorageProvider;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../utils/String.ts" />
/// <reference path="StorageProviderBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            /**
             * Storage provider that uses the widely supported Local Storage mechanism to persist values.
             */
            var LocalStorageProvider = (function (_super) {
                __extends(LocalStorageProvider, _super);
                function LocalStorageProvider() {
                    _super.apply(this, arguments);
                    this._isFull = false;
                }
                /**
                 * Initializes this provider.
                 */
                LocalStorageProvider.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._localStorage = window.localStorage;
                };
                /**
                 * Detects whether or not Local Storage is supported by the current user agent.
                 */
                LocalStorageProvider.prototype.isSupported = function () {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    return !!this._localStorage;
                };
                /**
                 * Returns a boolean value indicating whether or not Local Storage is full.
                 */
                LocalStorageProvider.prototype.isFull = function () {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    return this._isFull;
                };
                /**
                 * Returns the scoring value for this provider, if supported.
                 */
                LocalStorageProvider.prototype.getScore = function () {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    return 5;
                };
                /**
                 * Returns stats about the underlying mechanism.
                 */
                LocalStorageProvider.prototype.getStats = function () {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    return new storage.StorageStats();
                };
                /**
                 * Clears all data in Local Storage for this namespace.  If an error occurs as many entries
                 * will be deleted as possible and the last error passed into errorCallback.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                LocalStorageProvider.prototype.clear = function (successCallback, errorCallback) {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    var error = null;
                    var regex = new RegExp("^" + this.keyNamespace + LocalStorageProvider._namespaceSeperator);
                    for (var keyIx = 0, keyCount = this._localStorage.length; keyIx < keyCount; keyIx++) {
                        var key = this._localStorage.key(keyIx);
                        if (regex.test(key)) {
                            try {
                                this._localStorage.removeItem(key);
                                keyIx--;
                                keyCount--;
                            }
                            catch (innerError) {
                                error = innerError;
                            }
                        }
                    }
                    if (error != null) {
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    }
                    else {
                        if (successCallback) {
                            successCallback();
                        }
                    }
                };
                /**
                 * Clears all data for the current application.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                LocalStorageProvider.prototype.clearAllData = function (successCallback, errorCallback) {
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    try {
                        this._localStorage.clear();
                        if (successCallback) {
                            successCallback();
                        }
                    }
                    catch (err) {
                        if (errorCallback) {
                            errorCallback(err);
                        }
                    }
                };
                /**
                 * Fetches a value based on its key.
                 * @param key The key of the value to fetch.
                 * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
                 * @param errorCallback The callback to fire if an error occurs.
                 * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
                 */
                LocalStorageProvider.prototype.get = function (key, successCallback, errorCallback, shared) {
                    key = shared ? key : "{0}{1}{2}".format(this.keyNamespace, LocalStorageProvider._namespaceSeperator, key);
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    try {
                        var val = this._localStorage.getItem(key);
                        if (successCallback) {
                            successCallback(val);
                        }
                    }
                    catch (err) {
                        if (errorCallback) {
                            errorCallback(err);
                        }
                    }
                };
                /**
                 * Adds a new key/value pair to storage or overwrites an existing one.
                 * @param key The key for the value being stored.
                 * @param value The value to store.
                 * @param successCallback The callback to fire upon success.
                 * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
                 * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
                 */
                LocalStorageProvider.prototype.set = function (key, value, successCallback, errorCallback, shared) {
                    key = shared ? key : "{0}{1}{2}".format(this.keyNamespace, LocalStorageProvider._namespaceSeperator, key);
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    try {
                        this._localStorage.setItem(key, value);
                        if (successCallback) {
                            successCallback();
                        }
                    }
                    catch (err) {
                        if (errorCallback) {
                            errorCallback(err);
                        }
                    }
                };
                /**
                 * Removes a key and associated value from the store.
                 * @param key The key for which key/value pair to remove.
                 * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
                 * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
                 * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
                 */
                LocalStorageProvider.prototype.remove = function (key, successCallback, errorCallback, shared) {
                    key = shared ? key : "{0}{1}{2}".format(this.keyNamespace, LocalStorageProvider._namespaceSeperator, key);
                    if (!this._localStorage) {
                        this.initialize();
                    }
                    try {
                        this._localStorage.removeItem(key);
                        if (successCallback) {
                            successCallback();
                        }
                    }
                    catch (err) {
                        if (errorCallback) {
                            errorCallback(err);
                        }
                    }
                };
                LocalStorageProvider._namespaceSeperator = "→";
                return LocalStorageProvider;
            }(storage.StorageProviderBase));
            storage.LocalStorageProvider = LocalStorageProvider;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../application/Application.ts" />
/// <reference path="FileStorageProvider.ts" />
/// <reference path="LocalStorageProvider.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            /**
             * Serves as an abstraction over a number of different client - side storage technologies.
             */
            var Store = (function () {
                /**
        
                /**
                 * Initializes a new instance of an {@link geocortex.framework.storage.Store} object.
                 * @param app The {@link application.Application} that this module belongs to.
                 * @param rootNamespace An optional parameter that is used to prefix storage keys.
                 */
                function Store(app, keyNamespace) {
                    this.app = app;
                    this._rootNamespace = this._sanitizeKey(keyNamespace ? keyNamespace.toString() : "framework." + this.app.id);
                }
                /**
                 * Initializes the store. During initialization, the most appropriate storage technology for the current user agent will be chosen.
                 * @param provider If passed, this provider will be used instead of the Store attempting to detect the most suitable choice.
                 */
                Store.prototype.initialize = function (provider) {
                    //
                    // TODO: Enumerate and score the various types using a factory strategy. _provider will hold the best option.
                    //
                    if (!provider) {
                        if (storage.HttpStorageProvider.isSupported()) {
                            this._provider = new storage.HttpStorageProvider(this.app);
                        }
                        else {
                            var fileApiProvider = new storage.FileStorageProvider(this.app);
                            if (fileApiProvider.isSupported()) {
                                this._provider = fileApiProvider;
                            }
                            else {
                                this._provider = new storage.LocalStorageProvider(this.app);
                            }
                        }
                    }
                    else {
                        this._provider = provider;
                    }
                    this._provider.keyNamespace = this._rootNamespace;
                };
                Store.prototype.hasProvider = function () {
                    return this._provider != null;
                };
                Store.prototype._yield = function (func) {
                    if (!func) {
                        return function () { };
                    }
                    return function () {
                        var parentArgs = arguments;
                        setTimeout(function () {
                            func.apply(this, parentArgs);
                        }, 0);
                    };
                };
                Store.prototype._yieldError = function (func) {
                    if (!func) {
                        return function () { };
                    }
                    return function () {
                        var parentArgs = arguments;
                        setTimeout(function () {
                            func.apply(this, parentArgs);
                        }, 0);
                    };
                };
                Store.prototype._yieldGet = function (func) {
                    if (!func) {
                        return function () { };
                    }
                    return function () {
                        var parentArgs = arguments;
                        setTimeout(function () {
                            func.apply(this, parentArgs);
                        }, 0);
                    };
                };
                /**
                 * Clears all local data for the current application.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                Store.prototype.clear = function (successCallback, errorCallback) {
                    if (this._provider) {
                        this._provider.clear(this._yield(successCallback), this._yieldError(errorCallback));
                    }
                };
                /**
                 * Clears all local data for this domain.
                 * @param successCallback The callback to fire after the data has been successfully cleared.
                 * @param errorCallback The callback to fire if an error occurs.
                 */
                Store.prototype.clearAllData = function (successCallback, errorCallback) {
                    if (this._provider) {
                        this._provider.clearAllData(this._yield(successCallback), this._yieldError(errorCallback));
                    }
                };
                Store.prototype._sanitizeKey = function (key) {
                    // TODO: Replace *all* invalid path chars or switch to using a string hash function (probably a better idea).
                    var newKey = key.replace(new RegExp("[/\\\\:,?=|]", "gm"), "_");
                    return newKey;
                };
                /**
                 * Sets the value for the given key, creating the key if it does not exist, and overwriting the current value if it does.
                 * @param key The key to set the value of.
                 * @param value The string value to set.
                 * @param successCallback (key, value) The callback to invoke upon successfully writing to the underlying storage mechanism.
                 * @param errorCallback (error, key, value) The callback to invoke if an error occurs trying to write to the underlying storage mechanism. Passed a key, and the error that occurred.
                 * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
                 */
                Store.prototype.set = function (key, value, successCallback, errorCallback, shared) {
                    var def = new dojo.Deferred();
                    var sanitizedKey = this._sanitizeKey(key);
                    shared = shared || false;
                    // Set using the provider.
                    if (this._provider) {
                        this._provider.set(sanitizedKey, value, this._yield(function () {
                            if (def && (def.fired == -1)) {
                                def.resolve(value);
                            }
                            if (successCallback) {
                                successCallback(key, value);
                            }
                        }), this._yieldError(function (error) {
                            if (def && (def.fired == -1)) {
                                def.resolve(error);
                            }
                            if (errorCallback) {
                                errorCallback(error, key, value);
                            }
                        }), shared);
                    }
                    return def;
                };
                /**
                 * Gets the value for the given key, firing a success callback with the value (or null if it wasn't found).
                 * @param key The key for which value to fetch.
                 * @param successCallback (value, key) The callback to invoke upon successfully reading from the underlying storage mechanism.
                 * @param errorCallback (error, key) The callback to invoke if an error occurs trying to read from the underlying storage mechanism.
                 * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
                 */
                Store.prototype.get = function (key, successCallback, errorCallback, shared) {
                    var def = new dojo.Deferred();
                    var sanitizedKey = this._sanitizeKey(key);
                    shared = shared || false;
                    // Fetch using the provider.
                    if (this._provider) {
                        this._provider.get(sanitizedKey, this._yieldGet(function (value) {
                            if (def && (def.fired == -1)) {
                                def.resolve(value);
                            }
                            if (successCallback) {
                                successCallback(value, key);
                            }
                        }), this._yieldError(function (error) {
                            if (def && (def.fired == -1)) {
                                def.resolve(error);
                            }
                            if (errorCallback) {
                                errorCallback(error, key);
                            }
                        }), shared);
                    }
                    return def;
                };
                /**
                 * Removes a key and associated value from the store.
                 * @param key The key for which key/value pair to remove.
                 * @param successCallback (key) The callback to invoke upon successfully removing from the underlying storage mechanism.
                 * @param errorCallback (error, key) The callback to invoke if an error occurs trying to remove from the underlying storage mechanism.
                 * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
                 */
                Store.prototype.remove = function (key, successCallback, errorCallback, shared) {
                    var def = new dojo.Deferred();
                    var sanitizedKey = this._sanitizeKey(key);
                    shared = shared || false;
                    // Delete using the provider.
                    if (this._provider) {
                        this._provider.remove(sanitizedKey, this._yield(function () {
                            if (def && (def.fired == -1)) {
                                def.resolve(key);
                            }
                            if (successCallback) {
                                successCallback(key);
                            }
                        }), this._yieldError(function (error) {
                            if (def && (def.fired == -1)) {
                                def.resolve(error);
                            }
                            if (errorCallback) {
                                errorCallback(error, key);
                            }
                        }), shared);
                    }
                    return def;
                };
                return Store;
            }());
            storage.Store = Store;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../ui/ViewBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var events;
        (function (events) {
            var ViewDimensionsChangedArgs = (function () {
                function ViewDimensionsChangedArgs(view, region) {
                    this.view = view;
                    this.region = region;
                }
                return ViewDimensionsChangedArgs;
            }());
            events.ViewDimensionsChangedArgs = ViewDimensionsChangedArgs;
        })(events = framework.events || (framework.events = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../events/ViewDimensionsChangedArgs.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../config/ViewConfig.ts" />
/// <reference path="../utils/ArrayUtils.ts" />
/// <reference path="../application/Application.ts" />
/// <reference path="../config/ViewConfig.ts" />
/// <reference path="../ui/ViewBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var ViewManagerRegionEntry = (function () {
                function ViewManagerRegionEntry() {
                }
                return ViewManagerRegionEntry;
            }());
            ui.ViewManagerRegionEntry = ViewManagerRegionEntry;
            var ViewManager = (function () {
                function ViewManager(app) {
                    this._views = [];
                    this._hostedRegions = [];
                    this._pendingRegions = [];
                    this.app = app;
                    this._registerCommands();
                }
                /**
                 * Shuts this instance down, freeing all regions and views.
                 */
                ViewManager.prototype.shutdown = function () {
                    // Start by tearing down regions. This will destroy all hosted views.
                    for (var regionIndex = 0; regionIndex < this._hostedRegions.length; ++regionIndex) {
                        this.destroyRegion(this._hostedRegions[regionIndex]);
                    }
                    this._hostedRegions.length = 0;
                    // Nuke any leftovers.
                    for (var viewIndex = 0; viewIndex < this._views.length; ++viewIndex) {
                        this.destroyView(this._views[viewIndex]);
                    }
                    this._views.length = 0;
                    // Remove any pending views that never got hosted.
                    for (var regionIndex = 0; regionIndex < this._pendingRegions.length; ++regionIndex) {
                        var pendingRegionEntry = this._pendingRegions[regionIndex];
                        for (var viewIndex = 0; viewIndex < pendingRegionEntry["views"].length; ++viewIndex) {
                            this.destroyView(pendingRegionEntry["views"][viewIndex]);
                        }
                        pendingRegionEntry["views"] = [];
                    }
                    this._pendingRegions.length = 0;
                };
                /**
                 * Registers some view-related commands.
                 * @private
                 */
                ViewManager.prototype._registerCommands = function () {
                    // Activates a view that has been added to a region.
                    this.app.commandRegistry.command("ActivateView").register(this, function (viewId) {
                        var view = this.getViewById(viewId);
                        if (!view) {
                            this.app.trace.warning("ActivateView: Could not find view '{0}'.".format(viewId));
                            return;
                        }
                        this.activateView(view);
                    });
                    // Deactivates a view that has been added to a region.
                    this.app.commandRegistry.command("DeactivateView").register(this, function (viewId) {
                        var view = this.getViewById(viewId);
                        if (!view) {
                            this.app.trace.warning("DeactivateView: Could not find view '{0}'.".format(viewId));
                            return;
                        }
                        this.deactivateView(view);
                    });
                    // Toggles a view, activating or deactivating it based on its visibility flag.
                    this.app.commandRegistry.command("ToggleView").register(this, function (viewId) {
                        var view = this.getViewById(viewId);
                        if (!view) {
                            this.app.trace.warning("ToggleView: Could not find view '{0}'.".format(viewId));
                            return;
                        }
                        this.toggleView(view);
                    });
                    this.app.commandRegistry.command("DestroyView").register(this, function (viewId) {
                        var view = this.getViewById(viewId);
                        if (!view) {
                            this.app.trace.warning("DestroyView: Could not find view '{0}'.".format(viewId));
                            return;
                        }
                        this.destroyView(view);
                    });
                };
                /**
                 * Activates the given view, if it is currently hosted in a region.
                 * @param view The view to activate.
                 */
                ViewManager.prototype.activateView = function (view) {
                    if (!view.id) {
                        this.app.trace.error("ViewManager: Invalid or nonexistent view passed to activateView.");
                        return false;
                    }
                    // TODO: Unhost logic when changing regions!!! important.
                    // First, we need to find a region for this view.
                    var region = this.getRegionForViewId(view.id);
                    // If the view does not currently exist in a region, we'll try to host it in the specified one.
                    if (!region) {
                        // If the view has no region name, we can't do anything with it.
                        if (!view.regionName) {
                            this.app.trace.warning("Could not activate view '{0}' - view is not associated with a region.".format(view.id));
                            return false;
                        }
                        // If the desired region is found, we'll host the view in it.
                        region = this.getExistingRegionByName(view.regionName);
                        if (region) {
                            // Note that we're hosting here...if no associated region was found for the view, we treat it as if the view
                            // had been removed (unhosted).                    
                            region.hostView(view);
                            region.activateView(view);
                            return true;
                        }
                        else {
                            // If the desired region was not found, we'll create or update a pending region entry.
                            var pendingRegionEntry = this._getPendingRegionEntryByName(view.regionName);
                            // NOTE: This if/else block is repeated in createView...refactor.
                            if (pendingRegionEntry) {
                                // Add the view to the pending region entry if it has not been added.
                                if (!framework.utils.ArrayUtils.contains(pendingRegionEntry["views"], view)) {
                                    pendingRegionEntry["views"].push(view);
                                    return false;
                                }
                                else {
                                    this.app.trace.debug("View '{0}' re-added to pending region '{1}'.".format(view.id, view.regionName));
                                    return false;
                                }
                            }
                            else {
                                var regionEntry = new ViewManagerRegionEntry();
                                regionEntry.name = view.regionName;
                                regionEntry.views = [view];
                                this._pendingRegions.push(regionEntry);
                                return false;
                            }
                        }
                    }
                    region.activateView(view);
                    return true;
                };
                /**
                 * Deactivates the given view.
                 * @param view The view.
                 */
                ViewManager.prototype.deactivateView = function (view) {
                    if (!view.id) {
                        this.app.trace.error("ViewManager: Invalid or nonexistent view passed to deactivateView.");
                        return false;
                    }
                    // First, we need to find a region for this view.
                    var region = this.getRegionForViewId(view.id);
                    if (!region) {
                        this.app.trace.debug("Could not find region for view '{0}'.".format(view.id));
                        return false;
                    }
                    region.deactivateView(view);
                    return true;
                };
                /**
                 * Either activates or deactivates a view based on its isVisible flag.
                 * @param view The view to toggle.
                 */
                ViewManager.prototype.toggleView = function (view) {
                    if (view.isActive) {
                        this.deactivateView(view);
                    }
                    else {
                        this.activateView(view);
                    }
                };
                /**
                 * Creates a view and hosts it in a region, if a region is specified.
                 * @param viewConfig The {@link geocortex.framework.config.ViewConfigInterface} representing the view to be created.
                 */
                ViewManager.prototype.createView = function (viewConfig) {
                    // Note: This method uses a shorthand view creation syntax (see below for alternate field names).
                    // These alternate fields names should be reflect into ViewConfig.
                    // If the view has an ID, only one instance is allowed.
                    var viewId = viewConfig.viewId || viewConfig.id; // #legacy
                    if (viewId) {
                        var existingView = this.getViewById(viewId);
                        if (existingView) {
                            this.app.trace.error("Could not create view '{0}' - a view with that ID already exists.".format(viewId));
                            return;
                        }
                    }
                    // Attempt to get an instance of the view.
                    // NOTE: viewConfig.type is for legacy reasons.
                    var viewType = viewConfig.typeName || viewConfig.type || "geocortex.framework.ui.ViewBase";
                    var viewInstance = null;
                    try {
                        viewInstance = this.app.instantiateFrameworkObject(viewType, viewConfig.libraryId);
                    }
                    catch (err) {
                        this.app.trace.error("Could not instantiate view with type '{0}' - type was not found or view constructor failed.".format(viewType), err);
                        return null;
                    }
                    // Set up the view based on its config entry.
                    var shouldActivate = viewConfig.isVisible || viewConfig.visible; // #legacy
                    viewInstance.id = (viewId == null) ? "View-" + geocortex.framework.utils.alphaNumericToken() : viewId;
                    viewInstance.markupResource = viewConfig.markupResource || viewConfig.markup; // #legacy
                    viewInstance.regionName = viewConfig.regionName || viewConfig.region; // #legacy
                    viewInstance.configuration = viewConfig.configuration || {};
                    viewInstance.isManaged = viewConfig.isManaged || false;
                    viewInstance.title.set(viewConfig.title || "");
                    viewInstance.description.set(viewConfig.description);
                    viewInstance.iconUri.set(viewConfig.iconUri);
                    if (viewConfig.viewModel) {
                        viewInstance.viewModel = viewConfig.viewModel;
                    }
                    this._views.push(viewInstance);
                    // Was a region specified? Attempt to grab the region, host the view, and activate it.
                    if (viewInstance.regionName) {
                        var region = this.getExistingRegionByName(viewInstance.regionName);
                        // If this region does not yet exist, we'll create it as a "pending" region. This region will be hosted when we detect its creation.
                        if (!region) {
                            // If we need to active this view as soon as the region becomes available, mark it so.
                            if (shouldActivate) {
                                viewInstance["___shouldActivate"] = true;
                            }
                            var pendingRegionEntry = this._getPendingRegionEntryByName(viewInstance.regionName);
                            if (pendingRegionEntry) {
                                // Add the view to the pending region entry if it has not been added.
                                if (!framework.utils.ArrayUtils.contains(pendingRegionEntry["views"], viewInstance)) {
                                    pendingRegionEntry["views"].push(viewInstance);
                                }
                                else {
                                    this.app.trace.debug("View '{0}' re-added to pending region '{1}'.".format(viewInstance.id, viewInstance.regionName));
                                    return viewInstance;
                                }
                            }
                            else {
                                var regionEntry = new ViewManagerRegionEntry();
                                regionEntry.name = viewInstance.regionName;
                                regionEntry.views = [viewInstance];
                                this._pendingRegions.push(regionEntry);
                            }
                            return viewInstance;
                        }
                        else {
                            // The region is currently hosted. Host the view in the region and activate it.              
                            region.hostView(viewInstance);
                            if (shouldActivate) {
                                region.activateView(viewInstance);
                            }
                            return viewInstance;
                        }
                    }
                    else {
                        // No region specified? Create an orphan view.
                        var viewMarkup = geocortex.resourceManager.fetch(viewInstance.markupResource, viewInstance.libraryId);
                        if (viewMarkup == null) {
                            this.app.trace.warning("Could not fetch markup resource '{0}' in library '{1}'.".format(viewInstance.markupResource, viewInstance.libraryId));
                            return null;
                        }
                        else {
                            viewInstance.root = dojo.create("div");
                            viewInstance.root.innerHTML = viewMarkup;
                            // If the view has a single element at its root, discard the extraneous div.
                            if (viewInstance.root.children && viewInstance.root.children.length === 1) {
                                viewInstance.root = viewInstance.root.children[0];
                            }
                        }
                        return viewInstance;
                    }
                };
                /**
                 * Convenience method to create and bind a view model and view. The view will be initially visible, and if a region name is
                 * supplied, the view will be activated in that region.
                 * @param viewType Type name of the view instance to create. If null, {@link ViewBase} is used.
                 * @param viewMarkup Resource name of the markup file to use with the view.
                 * @param regionName Optional region name to activate the view in.
                 * @param viewModelType Type name of the viewModel to use. The view will be attached to it.
                 * @param libraryId The library that this view originates from. This is used primarily for internationalization purposes.
                 */
                ViewManager.prototype.create = function (viewType, viewModelType, viewMarkup, regionName, libraryId) {
                    var viewConfig = new framework.config.ViewConfig(null, null, viewType);
                    viewConfig.markupResource = viewMarkup;
                    //viewConfig.isActive = true;   // <jeffg> This is an artifact from JS, I don't think it did anything useful
                    viewConfig.regionName = regionName;
                    viewConfig.configuration = {};
                    var view = this.createView(viewConfig);
                    if (view === null) {
                        return view;
                    }
                    // Attempt to instantiate the view model.
                    var viewModel = null;
                    try {
                        viewModel = this.app.instantiateFrameworkObject(viewModelType || "geocortex.framework.ui.ViewModelBase", viewModel.libraryId);
                        viewModel.initialize({});
                    }
                    catch (err) {
                        this.app.trace.error("Could not create view model with type '{0}' - type was not found, not a view model, or failed to construct: {1}".format(viewConfig.typeName, err.message), err);
                        return null;
                    }
                    view.attach(viewModel);
                    this.activateView(view);
                    return view;
                };
                /**
                 * Destroys a view, wiping out its bindings and DOM substructure.
                 * @param view The view to destroy.
                 */
                ViewManager.prototype.destroyView = function (view) {
                    var region = this.getRegionForViewId(view.id);
                    var current = window.document.activeElement;
                    while (current) {
                        if (view.root === current) {
                            window.document.activeElement.blur();
                            break;
                        }
                        current = current.parentElement;
                    }
                    // If the view is hosted in a region, unhost it from the region.
                    if (region != null) {
                        region.deactivateView(view);
                        region.unhostView(view);
                    }
                    // Even though the region (or view itself) may have torn down the view, we'll ensure that it is
                    // correctly destroyed.
                    view.destroy();
                    // Destroy any regions hosted in the view.
                    if (view.childRegions != null) {
                        for (var childRegionIndex = 0; childRegionIndex < view.childRegions.length; ++childRegionIndex) {
                            this.destroyRegion(view.childRegions[childRegionIndex]);
                        }
                    }
                    view.childRegions.length = 0;
                    if (view.root != null) {
                        var nl = new dojo.NodeList();
                        nl.push(view.root);
                        nl.orphan();
                    }
                    // Remove the view from the view manager.
                    framework.utils.ArrayUtils.removeItem(this._views, view);
                    view.onDestroy();
                };
                /**
                 * Destroys a region, unbinding and destroying any views contained in it.
                 * @param region The region to destroy.
                 */
                ViewManager.prototype.destroyRegion = function (region) {
                    // Destroy all the views hosted in the region.
                    if (region.views != null) {
                        for (var viewIndex = region.views.length - 1; viewIndex >= 0; viewIndex--) {
                            this.destroyView(region.views[viewIndex]);
                        }
                    }
                    framework.utils.ArrayUtils.removeItem(this._hostedRegions, region);
                    region.unhost();
                };
                /**
                 * Discovers regions in a given DOM element by searching for a data-region-name attribute.
                 * @param element The DOM element to examine.
                 * @param view If passed, any regions discovered will belong to this view.
                 */
                ViewManager.prototype.discoverRegions = function (element, view) {
                    var _this = this;
                    if (element == null) {
                        return;
                    }
                    // TODO: Improve this using a regular for loop and dojo.attr - dojo.query doesn't seem to pick up databound region names.
                    // Query each element marked as a region.
                    dojo.query("[data-region-name]", element).forEach(function (el) {
                        var regionName = dojo.attr(el, "data-region-name");
                        var existingRegion = _this.getExistingRegionByName(regionName);
                        if (existingRegion) {
                            _this.app.trace.error("Region '{0}' already exists.".format(regionName));
                            // Note that this return will continue the forEach, not return from discoverRegions.
                            return;
                        }
                        // Do we have a pending region with this name? If we do, grab it - we'll instantiate all of its views after we host the region.
                        var pendingRegionEntry = _this._getPendingRegionEntryByName(regionName);
                        var region = null;
                        if (pendingRegionEntry) {
                            // This region is no longer pending, axe it from the collection.
                            _this._removePendingRegionEntry(regionName);
                        }
                        // Build the actual region and host it inside of the target element.
                        // If the region has a type specified, create that type of region. Otherwise, create a DivRegionAdapter.
                        var regionTypeName = dojo.attr(el, "data-region-adapter");
                        var regionTypeCtor = null;
                        try {
                            if (!regionTypeName) {
                                regionTypeName = "geocortex.framework.ui.DivRegionAdapter";
                            }
                            regionTypeCtor = dojo.getObject(regionTypeName, true);
                            region = new regionTypeCtor(regionName, _this.app);
                        }
                        catch (err) {
                            _this.app.trace.error("Could not instantiate region with type '{0}' - type was not found.".format(regionTypeName), err);
                            return null;
                        }
                        // Parse the data-region-options
                        var regionOptionsAttr = dojo.attr(el, "data-region-options");
                        var regionOptions = {};
                        if (regionOptionsAttr) {
                            var splitOptions = regionOptionsAttr.split(",");
                            for (var i = 0; i < splitOptions.length; i++) {
                                var splitOption = splitOptions[i].split("=");
                                regionOptions[splitOption[0]] = splitOption.length > 1 ? splitOption[1] : "";
                            }
                        }
                        // Attach the region to the specific DOM element. The region may act outside of this DOM element, but is
                        // generally considered "anchored" here.
                        region.host(el, regionOptions);
                        // Region is now hosted. Add it to the hosted regions collection.
                        _this._hostedRegions.push(region);
                        // If we were passed an owner view, add the region reference to the view, and add a
                        // reference to the view from the region for convenience.
                        if (view != null) {
                            view.childRegions.push(region);
                            region.ownerView = view;
                        }
                        // If this region was pending, host all the views that were awaiting this region's creation.
                        if (pendingRegionEntry) {
                            for (var pendingViewIndex = 0; pendingViewIndex < pendingRegionEntry["views"].length; ++pendingViewIndex) {
                                var pendingView = pendingRegionEntry["views"][pendingViewIndex];
                                // Keep a reference to the view, and host it in the region.
                                _this._views.push(pendingView);
                                region.hostView(pendingView);
                                if (pendingView["___shouldActivate"]) {
                                    delete pendingView["___shouldActivate"];
                                    region.activateView(pendingView);
                                }
                            }
                        }
                    });
                };
                /**
                 * Gets a hosted region by name.
                 * @param regionName The name of the region to fetch.
                 */
                ViewManager.prototype.getExistingRegionByName = function (regionName) {
                    for (var regionIndex = 0; regionIndex < this._hostedRegions.length; ++regionIndex) {
                        var region = this._hostedRegions[regionIndex];
                        if (region.name == regionName) {
                            return region;
                        }
                    }
                    return null;
                };
                /**
                 * Gets a pending region entry by name. A pending region entry is an object representing a region that has not yet been created but
                 * is referenced by one or more views.
                 * @param regionName The name of the region.
                 */
                ViewManager.prototype._getPendingRegionEntryByName = function (regionName) {
                    for (var regionIndex = 0; regionIndex < this._pendingRegions.length; ++regionIndex) {
                        var region = this._pendingRegions[regionIndex];
                        if (region["name"] == regionName) {
                            return region;
                        }
                    }
                    return null;
                };
                /**
                 * Removes a pending region entry by name.
                 * @param regionName The name of the pending region entry to remove.
                 */
                ViewManager.prototype._removePendingRegionEntry = function (regionName) {
                    var foundRegionIndex = -1;
                    for (var regionIndex = 0; regionIndex < this._pendingRegions.length; ++regionIndex) {
                        var regionEntry = this._pendingRegions[regionIndex];
                        if (regionEntry.name == regionName) {
                            foundRegionIndex = regionIndex;
                            break;
                        }
                    }
                    if (regionIndex > -1) {
                        framework.utils.ArrayUtils.remove(this._pendingRegions, foundRegionIndex, foundRegionIndex);
                        return true;
                    }
                    return false;
                };
                /**
                 * Given a view ID, returns the region that the currently belongs to.
                 * @param viewId
                 */
                ViewManager.prototype.getRegionForViewId = function (viewId) {
                    for (var regionIndex = 0; regionIndex < this._hostedRegions.length; ++regionIndex) {
                        var region = this._hostedRegions[regionIndex];
                        for (var viewIndex = 0; viewIndex < region.views.length; ++viewIndex) {
                            var view = region.views[viewIndex];
                            if (view.id === viewId) {
                                return region;
                            }
                        }
                    }
                    return null;
                };
                /**
                 * Gets a view by id.
                 * @param id The ID of the view to fetch.
                 */
                ViewManager.prototype.getViewById = function (id) {
                    for (var viewIndex = 0; viewIndex < this._views.length; ++viewIndex) {
                        var view = this._views[viewIndex];
                        if (view.id && view.id === id) {
                            return view;
                        }
                    }
                };
                /**
                 * Returns all of the currently known views in the application.
                 */
                ViewManager.prototype.getViews = function () {
                    return this._views;
                };
                /**
                 * Notifies the system that the dimensions of a view have changed.
                 * This makes it possible for the containing region or some other construct to reposition the view
                 * based on the new dimensions. This method will raise the event `ViewDimensionsChangedEvent`, passing
                 * along the view and the region that its hosted in.
                 * @param view The view that's been resized.
                 */
                ViewManager.prototype.notifyDimensionsChanged = function (view) {
                    var region = this.getRegionForViewId(view.id);
                    var args = new geocortex.framework.events.ViewDimensionsChangedArgs(view, region);
                    this.app.eventRegistry.event("ViewDimensionsChangedEvent").publish(args);
                };
                return ViewManager;
            }());
            ui.ViewManager = ViewManager;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../events/Event.ts" />
/// <reference path="../application/Application.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            /**
             * Trace provides an application-wide log sink with hook points for extensible logging. Uses typical error levels.
             */
            var Trace = (function () {
                /**
                 * Initializes a new instance of the {@link Trace} class.
                 * @param app The {@link Trace} that this module belongs to.
                 */
                function Trace(app) {
                    this.app = app;
                }
                Trace.prototype._traceImpl = function (lvl, msg, stack) {
                    if ((lvl === "debug" || lvl === "trace") && !this.app.debugMode) {
                        return;
                    }
                    if (this.app) {
                        this.app.event("TraceEvent").publish({ "level": lvl, "timestamp": new Date(), "message": msg, "stack": stack });
                    }
                };
                Trace.prototype._stackTraceFromException = function (ex) {
                    if (typeof ex !== "undefined") {
                        return ex.stack || ex.backtrace || ex.stacktrace;
                    }
                    else {
                        return null;
                    }
                };
                /**
                 * Logs a message at the debug level.
                 * @param msg The message to log.
                 */
                Trace.prototype.debug = function (msg) {
                    this._traceImpl("debug", msg);
                };
                /**
                 * Logs a message at the trace level.
                 * @param msg The message to log.
                 */
                Trace.prototype.trace = function (msg) {
                    this._traceImpl("trace", msg);
                };
                /**
                 * Logs a message at the info level.
                 * @param msg The message to log.
                 */
                Trace.prototype.info = function (msg) {
                    this._traceImpl("info", msg);
                };
                /**
                 * Logs a message at the alert level.
                 * @param msg The message to log.
                 */
                Trace.prototype.alert = function (msg) {
                    this._traceImpl("alert", msg);
                };
                /**
                 * Logs a message at the warning level.
                 * @param msg The message to log.
                 */
                Trace.prototype.warning = function (msg) {
                    this._traceImpl("warning", msg);
                };
                /**
                 * Logs a message at the error level.
                 * @param msg The message to log.
                 * @param error The exception that generated the message.
                 */
                Trace.prototype.error = function (msg, error) {
                    this._traceImpl("error", msg, this._stackTraceFromException(error));
                };
                /**
                 * Logs a message at the exception level.
                 * @param msg The message to log.
                 * @param ex The exception that generated the message.
                 */
                Trace.prototype.exception = function (msg, error) {
                    this._traceImpl("error", msg, this._stackTraceFromException(error));
                };
                return Trace;
            }());
            utils.Trace = Trace;
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="Application.ts" />
/// <reference path="../FrameworkObject.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var ModuleBase = (function (_super) {
                __extends(ModuleBase, _super);
                /**
                 * Base class for all application modules. This class should be inherited from by any module to be loaded by an application,
                 * as the application will attempt to call an initialize method on anything it deems a module.
                 * Modules are instantiated when an {@link geocortex.framework.application.Application} loads a library containing modules
                 * that have configuration present in the application configuration.
                 */
                /**
                 * Initializes a new instance of the {@link geocortex.framework.application.ModuleBase} class.
                 * @param app The {@link geocortex.framework.application.Application} that this module belongs to.
                 * @param libraryId The ID of the library that this component originated from.
                 */
                function ModuleBase(app, libraryId) {
                    _super.call(this, app, libraryId);
                    /**
                     * The names of behaviors associated with this module.
                     * Keeping these make it so when the module is destroyed we can purge the behaviors from the registry.
                     */
                    this.behaviorNames = [];
                    this.configuration = {};
                }
                /**
                 * Called when an {@link geocortex.framework.application.Application} succesfully instantiates this module. Override this to provide
                 * custom initialization behaviour. When overriding, it is a good idea to call the base implementation using Dojo's "inherited" construct.
                 */
                ModuleBase.prototype.initialize = function (moduleConfiguration) {
                    this.configuration = moduleConfiguration;
                    this.behaviorNames = this.app.behaviorRegistry.loadBehaviorsFromConfig(this, moduleConfiguration);
                };
                /**
                 * Called on module destruction.
                 * Used to clear the behavior registry of all behaviors associated with this module.
                 */
                ModuleBase.prototype.onDestroy = function () {
                    _super.prototype.onDestroy.call(this);
                    for (var i = 0; i < this.behaviorNames.length; i++) {
                        this.app.behaviorRegistry.remove(this.behaviorNames[i]);
                    }
                    this.behaviorNames.length = 0;
                };
                /**
                 * Called when an {@link geocortex.framework.application.Application} is shutting down.
                 * @param state Custom state object, perhaps indicating a shutdown reason or exception.
                 */
                ModuleBase.prototype.shutdown = function (state) { };
                /**
                 * Exports the current state of the module, which can be reapplied later via {@link applyState}.
                 * @return: A promise that is fulfilled with the module's exported state.
                 */
                ModuleBase.prototype.exportState = function () {
                    return new framework.SimplePromise(function (resolve, reject) { return resolve(null); });
                };
                /**
                 * Re-applies module state that was previously exported via {@link exportState}.
                 * @param: state The module state to apply.
                 * @return: A promise that is fulfilled when the state has been fully applied.
                 */
                ModuleBase.prototype.applyState = function (state) {
                    return new framework.SimplePromise(function (resolve, reject) { return resolve(); });
                };
                /**
                 * A filter that will be applied to state as it is exported or applied to the module. See
                 * {@link geocortex.essentialsHtmlViewer.mapping.infrastructure.ObjectFilter} for information on
                 * how to define a filter.
                 */
                ModuleBase.prototype.getStateFilter = function () {
                    return null;
                };
                return ModuleBase;
            }(framework.FrameworkObject));
            application.ModuleBase = ModuleBase;
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="Application.ts" />
/// <reference path="ModuleBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            /**
             * ModuleManager provides some basic module management functionality, tracking and instantiating module instances.
             * A global ModuleManager instance lives in the base {@link geocortex} namespace.
             */
            var ModuleManager = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.application.ModuleManager} class.
                 * @param app The {@link geocortex.framework.application.Application} that this module belongs to.
                 */
                function ModuleManager(app) {
                    /**
                     * The modules managed by this instance.
                     */
                    this._modules = {};
                    this.app = app;
                }
                /**
                 * Shuts down the module manager, calling "shutdown" on all loaded modules and removing them from the managed collection.
                 * @param state Custom shutdown related state (such as an exception) to pass to each module via shutdown().
                 */
                ModuleManager.prototype.shutdown = function (state) {
                    for (var moduleName in this._modules) {
                        if (!this._modules.hasOwnProperty(moduleName)) {
                            continue;
                        }
                        this._modules[moduleName].shutdown(state);
                        this._modules[moduleName].destroy();
                    }
                    this._modules = {};
                };
                /**
                 * Creates an instance of a module by its type name.
                 * @param moduleTypeName The type name of the module to instantiate.
                 * @param libraryId The ID of the library that this module belongs to.
                 */
                ModuleManager.prototype.instantiate = function (moduleTypeName, libraryId) {
                    if (moduleTypeName == null) {
                        return null;
                    }
                    return this.app.instantiateFrameworkObject(moduleTypeName, libraryId);
                };
                /**
                 * Marks a module as being loaded.
                 * @param moduleName The configured name of the module to instantiate.
                 * @param moduleInstance The instance of the module to be loaded.
                 */
                ModuleManager.prototype.markModuleLoaded = function (moduleName, moduleInstance) {
                    this._modules[moduleName] = moduleInstance;
                    this.app.event("ModuleInitializedEvent").publish(moduleName);
                };
                /**
                 * Checks if a module has been loaded or not.
                 * @param moduleName The configured name of the module to check for.
                 */
                ModuleManager.prototype.moduleIsLoaded = function (moduleName) {
                    return (this._modules[moduleName] != null);
                };
                /**
                 * Notifies if/when a module is loaded. If the module is already loaded, the supplied callback is fired immediately.
                 * If the module has not yet been loaded, the callback will be fired when it becomes loaded.
                 * Take care to avoid using this method unless it is absolutely required, as it can introduce unnecessary coupling between modules.
                 * @param moduleName The configured name of the module to notify for.
                 * @param notificationCallback The callback to fire if/when the module is loaded.
                 */
                ModuleManager.prototype.notifyModuleLoaded = function (moduleName, notificationCallback) {
                    if (this.moduleIsLoaded(moduleName) && notificationCallback != null) {
                        notificationCallback(moduleName);
                    }
                    else {
                        var token = this.app.event("ModuleInitializedEvent").subscribe(this, function (innerModuleName) {
                            if (innerModuleName == moduleName) {
                                try {
                                    notificationCallback(innerModuleName);
                                }
                                finally {
                                    this.app.event("ModuleInitializedEvent").unsubscribe(token);
                                }
                            }
                        });
                    }
                };
                return ModuleManager;
            }());
            application.ModuleManager = ModuleManager;
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../ui/PopupModalRegionAdapter.ts" />
/// <reference path="../application/ApplicationCommands.ts" />
/// <reference path="../boot.ts" />
/// <reference path="../behaviors/behaviorregistry.ts" />
/// <reference path="../commands/CommandRegistry.ts" />
/// <reference path="../config/ConfigurationLoader.ts" />
/// <reference path="../config/ConfigurationModel.ts" />
/// <reference path="../events/EventRegistry.ts" />
/// <reference path="../observables.ts" />
/// <reference path="../storage/Store.ts" />
/// <reference path="../ui/ViewManager.ts" />
/// <reference path="../utils/String.ts" />
/// <reference path="../utils/Trace.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="ModuleManager.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            /**
             * Represents a Framework.js application instance.
             * Application provides library and module loading services and offers application-level lifecycle support and infrastructure.
             * An instance of {@link Application} will utilize framework services to provide and manage an application lifecycle
             * for a collection of modules to participate in.
             */
            var Application = (function () {
                /**
                 * Creates a new instance of {@link Application}.
                 * @param configObject Either a string URI, or a configuration object. If a string is passed, it will be treated as a URI and the application will attempt to fetch it. If an object is passed, it will be used as configuration.
                 * @param hostElement An optional container element of the application. The application will constrain its initial region discovery to within this element.
                 * This allows multiple framework applications to live on the same page without interfering with each other.
                 * @param id An optional application ID. This will be used to prefix storage keys, allowing for multiple distinct applications to live and store compartmentalized data on the same domain.
                 * @param configTokens An optional set of tokens that can be referenced in configuration.
                 */
                function Application(configObject, hostElement, id, configTokens) {
                    /**
                     * The version of the app. Defaults to the primary version of Framework.js.
                     */
                    this.version = "2.8";
                    /**
                     * Whether or not configuration can be loaded from other domains. If this is set to `true`, the application proxy will be used.
                     */
                    this.allowCrossDomainConfig = false;
                    /**
                     * Application-wide configuration available to all components. This is defined in the `application` section of configuration.
                     */
                    this.configuration = {};
                    /**
                    * Indicates the address of the native layer, if the web app has been loaded within a GMAF instance
                    */
                    this.localServerAddress = "";
                    /**
                    * An access token which needs to be provided in order to access any of the local server endpoints.
                    */
                    this.localServerToken = null;
                    /**
                    * The namespace for accessing data for a particular app.
                    */
                    this.localServerNamespace = null;
                    /**
                     * An object containing the URL parameters passed into the application.
                     */
                    this.urlParameters = {};
                    /**
                     * Whether or not the application is in development/debug mode. When an application is in development mode, certain runtime behaviour
                     * may differ from when not in development mode. This is a somewhat abritrary flag in place as single, unified application flag.
                     */
                    this.developmentMode = false;
                    /**
                     * Whether or not the application was served via HTTPS.
                     */
                    this.isHttpsMode = false;
                    /**
                     * Indicates whether or not all libraries have been loaded.
                     */
                    this.allLibrariesLoaded = false;
                    /**
                     * An optional configuration preprocessor - a function to process the configuration in place before parsing and loading.
                     * After initialization, this is nulled out.
                     */
                    this.configPreprocessor = null;
                    /** An application-wide instance of a {@link ui.RegionAdapterBase} that creates and manages a modal popup. */
                    this.modalRegionSingleton = null;
                    this._resourceDictionaries = {};
                    this.frameworkObjects = {};
                    this._pendingFrameworkObjectRequests = {};
                    this._initialStateAppliedCount = 0;
                    this.id = id || "default";
                    this.configTokens = configTokens || {};
                    this.trace = new framework.utils.Trace(this);
                    this.moduleManager = new geocortex.framework.application.ModuleManager(this);
                    this.commandRegistry = new geocortex.framework.commands.CommandRegistry(this);
                    this.eventRegistry = new geocortex.framework.events.EventRegistry(this);
                    this.behaviorRegistry = new geocortex.framework.behaviors.BehaviorRegistry(this);
                    this.viewManager = new geocortex.framework.ui.ViewManager(this);
                    // A native JS .bind would be very appropriate here, but is not supported pre IE 9.
                    this.command = dojo.hitch(this.commandRegistry, this.commandRegistry.command);
                    this.event = dojo.hitch(this.eventRegistry, this.eventRegistry.event);
                    this.behavior = dojo.hitch(this.behaviorRegistry, this.behaviorRegistry.behavior);
                    this.hostElement = hostElement || dojo.body();
                    // Create and initialize the storage layer, using the application's ID as a key to partition data between applications on the same domain.
                    this.store = new geocortex.framework.storage.Store(this, this.id);
                    this.store.initialize();
                    // Process config. Note that a null config object is totally valid. Useful for really lightweight "apps".
                    if (configObject == null) {
                        this.configModel = new framework.config.ConfigurationModel(this);
                    }
                    else if (typeof configObject === "object") {
                        this.configObject = configObject;
                        this.configUri = null;
                    }
                    else {
                        this.configModel = null;
                        this.configUri = configObject.trim();
                    }
                    // Wire up the application-wide "offline" flag.
                    this.isOffline = new Observable(false);
                    this.isOffline.bind(this, function (val) {
                        if (val) {
                            this.eventRegistry.event("ApplicationOfflineEvent").publish();
                        }
                        else {
                            this.eventRegistry.event("ApplicationOnlineEvent").publish();
                        }
                    });
                    // Wire up the Application-wide "native" flag.
                    this.isNative = new Observable(false);
                    this.isNative.bind(this, function (val) {
                        if (val) {
                            this.eventRegistry.event("ApplicationNativeReadyEvent").publish();
                        }
                        else {
                            this.eventRegistry.event("ApplicationNativeRemovedEvent").publish();
                        }
                    });
                    // Create and attach implementations for common application-wide commands.
                    geocortex.framework.application.ApplicationCommands.createCommands(this);
                    // Grab URL parameters and store for easy access.
                    var uri = document.URL;
                    var query = uri.substring(uri.indexOf("?") + 1, uri.length);
                    this.urlParameters = dojo.queryToObject(query) || {};
                    // Build a clean "host" path with which the application can create absolute URLs from relative ones (and vice versa).
                    var proto = window.location.protocol;
                    // Make sure we have a colon in our protocol.
                    if (proto.indexOf(":") < 0) {
                        proto = proto + ":";
                    }
                    // Get the application path, e.g. "/geo/maps/index.html" -> "/geo/maps/"
                    var slashIndex = window.location.pathname.lastIndexOf("/");
                    var path = "/";
                    if (slashIndex > -1) {
                        path = window.location.pathname.substr(0, slashIndex);
                    }
                    if (path === "") {
                        path = "/";
                    }
                    this.host = proto + "//" + window.location.host.trim() + path.trim();
                    // Add a trailing slash if one is not present, for convenience.
                    if (this.host.charAt(this.host.length - 1) !== "/") {
                        this.host = this.host + "/";
                    }
                    // Are we looking at an HTTPS page? If so, we are in HTTPS mode.
                    this.isHttpsMode = this.isHttpsUri(this.host);
                    this.detectBrowserLocale();
                    geocortex.framework.registerApplication(this);
                }
                /**
                 * Returns the order that a library has been configured in.
                 * @param libraryId The ID of the library.
                 */
                Application.prototype.getLibraryOrder = function (libraryId) {
                    if (!this.configModel.libraryConfigs) {
                        return null;
                    }
                    for (var i = 0; i < this.configModel.libraryConfigs.length; ++i) {
                        var lib = this.configModel.libraryConfigs[i];
                        if (lib.id === libraryId) {
                            return i;
                        }
                    }
                    return null;
                };
                /**
                 * Tests whether a not a library should have its styles omitted.
                 * @param libraryId The ID of the library in question.
                 */
                Application.prototype.shouldOmitStylesForLibrary = function (libraryId) {
                    if (!this.configModel.libraryConfigs) {
                        return null;
                    }
                    for (var i = 0; i < this.configModel.libraryConfigs.length; ++i) {
                        var lib = this.configModel.libraryConfigs[i];
                        if (lib.id === libraryId) {
                            return !!lib["omitStyles"];
                        }
                    }
                    return false;
                };
                /**
                 * Translates configuration, substituting library-specific culture specific strings for the appropriate locale.
                 * @param libraryId The ID of the library that the module configuration belongs to.
                 * @param configuration The configuration to translate.
                 * @private
                 */
                Application.prototype.translateConfiguration = function (libraryId, configuration) {
                    var _this = this;
                    // We'll walk the JSON tree the old fashioned way.
                    var translate = function (name, node, nodeLibraryId) {
                        if (typeof node === "string") {
                            if (node.indexOf("@language") > -1) {
                                // Strip off the "language" portion.
                                var keyParts = node.split("-");
                                if (keyParts.length < 2) {
                                    throw new Error("Invalid language key '{0}'.".format(node));
                                }
                                var languageKey = keyParts.join("-").replace("@", "");
                                // Translate the string.
                                // GVH-6035 Support translating text from libraries different than that of the current module!
                                var nodeOrModuleLibraryId = nodeLibraryId || libraryId;
                                return _this.getResource(nodeOrModuleLibraryId, languageKey);
                            }
                            return _this.performTokenReplacement(node);
                        }
                        else if (node instanceof Array) {
                            var newCollection = [];
                            for (var i = 0; i < node.length; ++i) {
                                newCollection.push(translate(i, node[i]));
                            }
                            return newCollection;
                        }
                        else if (node instanceof Function) {
                            return node;
                        }
                        else if (node instanceof Object) {
                            var newObject = {};
                            var nodeLibId = node.hasOwnProperty("libraryId") ? node["libraryId"] : undefined;
                            // Rewrite the sub-object.
                            for (var prop in node) {
                                if (!node.hasOwnProperty(prop)) {
                                    continue;
                                }
                                newObject[prop] = translate(prop, node[prop], nodeLibId);
                            }
                            return newObject;
                        }
                        else {
                            return node;
                        }
                    };
                    var obj = {};
                    for (var name in configuration) {
                        if (!configuration.hasOwnProperty(name)) {
                            continue;
                        }
                        obj[name] = translate(name, configuration[name]);
                    }
                    return obj;
                };
                /**
                 * Takes a string with 0 or more tokens in it, and returns a string with the replacement tokens replaced.
                 * @param value The string with the replacement tokens in it.
                 */
                Application.prototype.performTokenReplacement = function (value) {
                    var _this = this;
                    if (!value) {
                        return value;
                    }
                    var result = value.replace(/{.+?}/g, function (match) {
                        var attributeName = match.substring(1, match.length - 1);
                        var replacement = _this.configTokens.hasOwnProperty(attributeName) ? _this.configTokens[attributeName] : match;
                        if (!replacement && _this.configuration && _this.configuration.hasOwnProperty(attributeName)) {
                            return _this.configuration[attributeName];
                        }
                        if (replacement) {
                            return replacement;
                        }
                        else {
                            _this.trace.warning("The token syntax \\{{0}\\} was detected, but could not be matched to a valid replacement.".format(attributeName));
                            return "";
                        }
                    });
                    return result;
                };
                /**
                 * Determines whether or not a URI is HTTPS by looking at the scheme.
                 * @param uri The URI to test.
                 */
                Application.prototype.isHttpsUri = function (uri) {
                    var trimmedUri = uri.trim();
                    var seperatorIndex = trimmedUri.indexOf("://");
                    return (seperatorIndex > -1) && (trimmedUri.length >= 5) && (trimmedUri.substring(0, 5) === "https");
                };
                /**
                 * Given a relative URI, returns an absolute URI based on the application's URI.
                 * @param uri The relative URI to make absolute.
                 * @param appPathOverride Optional. Allows you to make the URI absolute using a different URI base.
                 */
                Application.prototype.makeAbsolute = function (uri, appPathOverride) {
                    // TODO: Stop using _Url.
                    var urlObj = new dojo._Url(uri);
                    // URL object has a host component? Already absolute.
                    if (urlObj.host) {
                        return uri;
                    }
                    else {
                        // NOTE: window.location.host includes the port number.
                        var appPath = appPathOverride ? appPathOverride : "{0}//{1}{2}".format(window.location.protocol, window.location.host, window.location.pathname);
                        // Remove any trailing, non-slash characters from the application path.
                        if (appPath.charAt(appPath.length - 1) != "/" || appPath.charAt(appPath.length - 1) != "\\") {
                            // Remove the end portion to leave us with the actual path.
                            var pathPieces = appPath.split("/");
                            --pathPieces.length;
                            // Add the trailing slash.
                            appPath = pathPieces.join("/");
                            appPath = appPath + "/";
                        }
                        // If the URI starts with a slash, it is relative to the root of the server.
                        if (uri.charAt(0) == "/" || uri.charAt(0) == "\\") {
                            var appPathObj = new dojo._Url(appPath);
                            uri = (appPathObj.scheme + "://" + appPathObj.authority + "/" + uri.substring(1));
                        }
                        else {
                            // Is there a proper term for ".." tokens? Let's call them "ups" for now.
                            // NOTE: Forward slashes only in Site URLs!
                            var rootUriPieces = appPath.split("/");
                            var uriPieces = uri ? uri.split("../") : [];
                            // Count how many ups are in the relative portion.
                            var ups = 0;
                            for (var i = 0; i < uriPieces.length; ++i) {
                                if (uriPieces[i] == "") {
                                    ++ups;
                                }
                            }
                            // Grab the host URI, less any ups.
                            var baseUrl = rootUriPieces.slice(0, rootUriPieces.length - (ups > 0 ? ups + 1 : ups));
                            // Build the relative URI again, discounting the first up.
                            var relativeUrl = uriPieces.slice(ups > 0 ? ups - 1 : ups);
                            // Done.
                            uri = baseUrl.join("/") + relativeUrl.join("/");
                        }
                        return uri;
                    }
                };
                /**
                 * Gets the container element of the application.
                 */
                Application.prototype.getHostElement = function () {
                    return this.hostElement;
                };
                /**
                 * Gets a language resource from the Application's resource dictionary, given a library ID, key, and optional locale.
                 * Returns null if the resource does not exist.
                 * @param libraryId The ID of the library the resource is for.
                 * @param key The resource key.
                 * @param locale The locale of the resource to fetch. Defaults to the current application locale.
                 */
                Application.prototype.getResource = function (libraryId, key, locale) {
                    locale = (locale || this.locale) || "inv";
                    locale = locale.toLowerCase();
                    if (!this._resourceDictionaries || !this._resourceDictionaries["inv"]) {
                        throw new Error("The application is missing its invariant resources.");
                    }
                    // Get a resource dictionary for the desired locale, and for the invariant locale.
                    var localeResources = this._resourceDictionaries[locale];
                    var invariantResources = this._resourceDictionaries["inv"];
                    // Do we have any resources for this locale at all? Fall back to the invariant culture dictionary if not.
                    if (!localeResources) {
                        localeResources = invariantResources;
                    }
                    // Try and get the library resources for the locale.
                    var libResources = localeResources[libraryId] || invariantResources[libraryId];
                    if (!libResources) {
                        this.trace.warning("No resource dictionary found for library '{0}' while trying to get resource with key '{1}', using locale '{2}'.".format(libraryId, key, locale));
                        return "@" + key;
                    }
                    var stringResource = null;
                    // Look for the resource key.
                    if (libResources.hasOwnProperty(key)) {
                        stringResource = libResources[key];
                    }
                    else {
                        // If we were looking in the invariant dictionary and did not find the key, return bogus.
                        if (localeResources === invariantResources) {
                            return "@" + key;
                        }
                        else {
                            // Otherwise, fall back to the invariant dictionary and look for the key.
                            libResources = invariantResources[libraryId];
                            if (libResources.hasOwnProperty(key) === false) {
                                this.trace.warning("The resource with key '{0}' was not found in library '{1}'.".format(key, libraryId));
                                return "@" + key;
                            }
                            else {
                                stringResource = libResources[key];
                            }
                        }
                    }
                    if (locale === "debug") {
                        return this._getDebugLocaleString(stringResource);
                    }
                    else if (locale === "strings") {
                        return key;
                    }
                    else if (locale === "!!") {
                        return "!" + stringResource + "!";
                    }
                    return stringResource;
                };
                /**
                 * Returns a URI, using the proxy if configured. Warns when mixed HTTP/HTTPS content is requested.
                 * @param uriPiece A relative or absolute URI to format.
                 * @todo Review if this is used anymore. May be time to deprecate it.
                 */
                Application.prototype.getUri = function (uriPiece) {
                    var uriIsRelative = false;
                    uriIsRelative = uriPiece.indexOf("://") < 0;
                    if (uriIsRelative) {
                        var target = this.host + uriPiece;
                        // Are we mixing secured and non-secured resources? Let's warn.
                        if (this.isHttpsUri(target) != this.isHttpsMode) {
                            this.trace.warning("Mixing secured and non-secured resources. Request: '{0}'.".format(target));
                        }
                        if (this.proxyUri != null && !String.isNullOrEmpty(this.proxyUri)) {
                            return this.proxyUri + encodeURIComponent(target);
                        }
                        else {
                            return target;
                        }
                    }
                    else {
                        // Are we mixing secured and non-secured resources? Let's warn.
                        if (this.isHttpsUri(uriPiece) != this.isHttpsMode) {
                            this.trace.warning("Mixing secured and non-secured resources. Request: '{0}'.".format(uriPiece));
                        }
                        return this.proxyUri + encodeURIComponent(uriPiece);
                    }
                };
                /**
                 * Returns the url parameter, ignoring case.
                 * @param paramName The parameter to run a case insensitive search for and retrieve
                 * @return The url parameter if found, or null
                 */
                Application.prototype.getUrlParameter = function (paramName) {
                    if (this.urlParameters) {
                        for (var prop in this.urlParameters) {
                            if (!this.urlParameters.hasOwnProperty(prop) || String.isNullOrEmpty(prop) || String.isNullOrEmpty(paramName)) {
                                continue;
                            }
                            if (prop.toLowerCase() === paramName.toLowerCase()) {
                                return this.urlParameters[prop];
                            }
                        }
                    }
                    return null;
                };
                /**
                 * Occurs when all libraries for this application have been processed. Invoked even if one or more libraries failed to download.
                 * To check if a specific library has successfully downloaded, use the hasLibrary function or check the libraries array on the app.
                 * @event
                 * @param app A {@link geocortex.framework.application.Application}.
                 */
                Application.prototype.onLibrariesDownloaded = function (app) {
                };
                /**
                 * Called immediately after the configuration object has been loaded from JSON, before any libraries have been downloaded.
                 */
                Application.prototype.onConfigurationLoaded = function (configObject) {
                };
                /**
                 * Called by the framework to notify the application that a library has been downloaded.
                 * @param libraryId The ID of the library that has been downloaded.
                 */
                Application.prototype.notifyLibraryDownload = function (libraryId) {
                    this.trace.info("Processing downloaded library '{0}' for application '{1}'.".format(libraryId, this.id));
                    this.eventRegistry.event("LibraryDownloadedEvent").publish(libraryId);
                    // TODO: Re-evaluate this in the case libraries shared across multiple applications on the page.
                    // Inject resources for this library.
                    var resourceDictionaries = geocortex.resourceManager.fetchAllFor(libraryId, "json");
                    if (resourceDictionaries && resourceDictionaries.length > 0) {
                        for (var resourceIndex = 0; resourceIndex < resourceDictionaries.length; ++resourceIndex) {
                            var resourceRecord = resourceDictionaries[resourceIndex];
                            var dictionary = geocortex.resourceManager.fetch(resourceRecord["name"], resourceRecord["library"], resourceRecord["locale"]);
                            this.injectLibraryResources(libraryId, dictionary, resourceRecord["locale"]);
                        }
                    }
                    // It's possible that this application has not even loaded config yet, so we will wait.
                    if (!this.configModel) {
                        return;
                    }
                    // Start loading modules for this library.
                    var libraryModules = this.configModel.libraryModules[libraryId];
                    if (libraryModules == null) {
                        this.trace.warning("No modules found for library '{0}' in application '{1}'.".format(libraryId, this.id));
                        return;
                    }
                    // Initialize all the modules for this library.
                    this.initializeModules(libraryModules);
                    if (this.pendingLibraryDownloads > 0) {
                        --this.pendingLibraryDownloads;
                    }
                    this._doIfNoPendingLibraryDownloads();
                };
                Application.prototype.hasLibrary = function (libraryId) {
                    return geocortex.framework.hasLibrary(libraryId) && !!this.configModel.libraryModules[libraryId]
                        && this._resourceDictionaries["inv"] && !!this._resourceDictionaries["inv"][libraryId];
                };
                /**
                 * Registers a Framework.js object. Framework objects are registered against an {@link Application} for clean-up later.
                 * @param obj The object to register. This object must have a unique ID.
                 */
                Application.prototype.registerFrameworkObject = function (obj) {
                    if (!obj.id) {
                        throw new Error("Could not register framework object. Object was missing an ID.");
                    }
                    this.frameworkObjects[obj.id] = obj;
                    // Check if any pending framework object requests match the object just registered.
                    var pending = this._pendingFrameworkObjectRequests[obj.id];
                    if (pending && pending.length) {
                        pending.forEach(function (callback) { return callback(obj); });
                        pending.length = 0;
                        delete this._pendingFrameworkObjectRequests[obj.id];
                    }
                    return obj;
                };
                /* @private */
                Application.prototype.freeAllFrameworkObjects = function () {
                };
                /**
                 * System-wide method to get a {@link FrameworkObject} by ID.
                 * @param id The ID of the object to fetch.
                 */
                Application.prototype.getFrameworkObjectById = function (id) {
                    for (var obj in this.frameworkObjects) {
                        if (!this.frameworkObjects.hasOwnProperty(obj)) {
                            continue;
                        }
                        if (obj === id) {
                            return this.frameworkObjects[obj];
                        }
                    }
                    return null;
                };
                /**
                 * System-wide method to get a {@link FrameworkObject} by ID asynchronously whenever it's registered with this application
                 * @param id The ID of the object to fetch.
                 */
                Application.prototype.getFrameworkObjectByIdAsync = function (id, callback, errBack) {
                    if (!id || !dojo.isString(id) || !callback || !dojo.isFunction(callback)) {
                        if (errBack && dojo.isFunction(errBack)) {
                            errBack(new Error("Cannot retrieve Framework Object. Object ID or callback unspecified or incorrect."));
                        }
                        return;
                    }
                    var object = this.getFrameworkObjectById(id);
                    if (object) {
                        callback(object);
                    }
                    else {
                        this._pendingFrameworkObjectRequests[id] = this._pendingFrameworkObjectRequests[id] || [];
                        this._pendingFrameworkObjectRequests[id].push(callback);
                    }
                };
                /**
                 * Begins the application initialization process.
                 */
                Application.prototype.initialize = function () {
                    var _this = this;
                    dojo.connect(window, "onresize", function (args) {
                        _this.eventRegistry.event("ApplicationResizedEvent").publish();
                    });
                    // Subscribe to token refresh notifications, in case we have a geometry service configured and its security token is refreshed.
                    dojo.subscribe("ServiceTokenRefreshed", function (eventArgs) {
                        if (_this.configuration && eventArgs.serviceUrl === _this.configuration.geometryServiceUrl) {
                            _this.configuration.geometryServiceToken = eventArgs.token;
                        }
                    });
                    // Start consuming the configuration tree.
                    var configurationLoader = new geocortex.framework.config.ConfigurationLoader(this);
                    // This helper function will be called either immediately (if we have object configuration) or as a network callback (for a config URI).
                    var process = function (config) {
                        if (typeof config == "string") {
                            config = JSON.parse(config);
                        }
                        if (_this.configPreprocessor) {
                            _this.configPreprocessor(config);
                            _this.configPreprocessor = null;
                        }
                        var configModel = new geocortex.framework.config.ConfigurationModel(_this);
                        // Give subclasses a chance to abort
                        _this.onConfigurationLoaded(config);
                        if (!_this.abortInitialization) {
                            configModel.parse(config, function (model) { return _this.processConfiguration(model); });
                        }
                    };
                    if (this.configModel != null) {
                        throw new Error("Configuration model should not be loaded already");
                    }
                    else if (this.configObject != null) {
                        process(this.configObject);
                        this.configObject = null;
                    }
                    else if (this.configUri != null) {
                        configurationLoader.loadConfigurationTree(this.configUri, function (config) { return process(config); });
                    }
                    else {
                        throw new Error("No configuration method");
                    }
                    // Find some regions in the shell body or specified host element. New ones will be discovered as modules load views.
                    this.viewManager.discoverRegions(this.hostElement);
                };
                /**
                 * Shuts down the application, releasing all modules, views, bindings, view models, regions, commands, and events.
                 * @param state Custom state object, indicating a shutdown reason or exception.
                 */
                Application.prototype.shutdown = function (state) {
                    // Notify of our intent to shut down.
                    this.eventRegistry.event("ApplicationShutdownEvent").publish(state);
                    // Start by tearing apart UI.
                    this.viewManager.shutdown();
                    // Modules.
                    this.moduleManager.shutdown(state);
                    // Commands.
                    this.commandRegistry.clear();
                    // Events.
                    this.eventRegistry.clear();
                };
                Application.prototype._doIfNoPendingLibraryDownloads = function () {
                    // Are we done loading all viewer libraries? Tell the resource manager to perform theme injection, and send out an event.
                    if (this.pendingLibraryDownloads === 0) {
                        if (geocortex.resourceManager) {
                            geocortex.resourceManager.performThemeInjection();
                        }
                        this.allLibrariesLoaded = true;
                        this.eventRegistry.event("ViewerLibrariesDownloadedEvent").publish(this);
                        this.onLibrariesDownloaded(this);
                        // Check if we've finished applying initial state.
                        if (this._initialStateAppliedCount <= 0 && this.initialStateAppliedCallback) {
                            this.initialStateAppliedCallback(this);
                        }
                    }
                };
                /**
                 * @private
                 */
                Application.prototype.onInitializationComplete = function () {
                    // Have we downloaded all externals? Fire initialization callback if so.
                    if (this.initializationCompleteCallback != null && this.initializationCompleteCallback != undefined) {
                        // Notify that the viewer has completed initialization.
                        this.initializationCompleteCallback(this);
                    }
                };
                /**
                 * Detects the browser locale to use in the application. This method will first consider the browser defined user language.
                 * @private
                 */
                Application.prototype.detectBrowserLocale = function () {
                    // Try and get a culture ID from the browser.
                    if (navigator["language"]) {
                        this.locale = navigator["language"]; // Non-IE browsers
                    }
                    else if (navigator["userLanguage"]) {
                        this.locale = navigator["userLanguage"]; // IE Only
                    }
                    else if (navigator["browserLanguage"]) {
                        this.locale = navigator["browserLanguage"]; // IE Only
                    }
                    else {
                        this.locale = "inv";
                    }
                };
                /**
                 * Starts downloading library resources.
                 * @private
                 */
                Application.prototype.downloadLibraries = function (configurationModel) {
                    // Track how many libraries we need to download.
                    this.pendingLibraryDownloads = configurationModel.libraryConfigs.length;
                    // Begin downloading external libraries.
                    for (var i = 0; i < configurationModel.libraryConfigs.length; ++i) {
                        var ref = configurationModel.libraryConfigs[i];
                        // Has a library with this ID previously been downloaded?
                        if (geocortex.framework.hasLibrary(ref.id) === true) {
                            this.notifyLibraryDownload(ref.id);
                        }
                        else {
                            geocortex.framework.libraries[ref.id] = false;
                            // GVH-9958
                            // Make sure we actually have a URI
                            if (ref.uri) {
                                // Fetch the code. Note that the callbacks will only be fired for JSONP code. We depend on the library itself
                                // calling notifyLibraryDownloaded.
                                this.includeScript(ref.uri, function (code) { }, function () { });
                            }
                        }
                    }
                };
                /**
                 * Adds the specified library resources for the specified library and locale to the application.
                 * @param libraryId The ID of the library to inject resources for.
                 * @param dictionary The dictionary of resources.
                 * @param locale The locale of the resources.
                 */
                Application.prototype.injectLibraryResources = function (libraryId, dictionary, locale) {
                    locale = locale.toLowerCase();
                    // Do we already have resources for this dictionary? If not, just add the dictionary. If so, merge into existing.
                    if (this._resourceDictionaries.hasOwnProperty(locale) === false) {
                        this._resourceDictionaries[locale] = {};
                        this._resourceDictionaries[locale][libraryId] = dictionary;
                        return;
                    }
                    else {
                        if (this._resourceDictionaries[locale].hasOwnProperty(libraryId) === false) {
                            this._resourceDictionaries[locale][libraryId] = dictionary;
                        }
                        else {
                            dojo.mixin(this._resourceDictionaries[locale][libraryId], dictionary);
                        }
                        return;
                    }
                };
                /**
                 * Instantiates a new FrameworkObject, passing in the application instance.
                 * @param typeName The fully-qualified name of the type to instantiate.
                 * @param libraryId The ID of the library that this object belongs to.
                 */
                Application.prototype.instantiateFrameworkObject = function (typeName, libraryId) {
                    var namespaceTokens = typeName.split(".");
                    var context = window; // node uses global
                    for (var i = 0; i < namespaceTokens.length && typeof (context) === "object"; i++) {
                        context = context[namespaceTokens[i]];
                    }
                    var obj = null;
                    // Try and create a TypeScript object...
                    if (typeof (context) === "function") {
                        obj = new context(this, libraryId);
                    }
                    if (!obj) {
                        try {
                            var ctor = dojo.getObject(typeName);
                            obj = new ctor(this, libraryId);
                        }
                        catch (error) {
                            this.trace.error("Could not instantiate object of type '{0}': '{1}'".format(typeName, error), error);
                        }
                    }
                    return obj;
                };
                /**
                 * Includes and runs a script file.
                 * @param scriptUri The URI of the script file to include.
                 * @param successCallback The callback to fire if the script was successfully served via JSONP.
                 * @param errorCallback The callback to fire if any error occurred trying to download the script.
                 */
                Application.prototype.includeScript = function (uri, successCallback, errorCallback) {
                    var _this = this;
                    var jsonpArgs = {
                        url: uri,
                        preventCache: this.debugMode,
                        // NOTE: Not called unless JSONP is served via the callbackParamName.
                        load: function (data) {
                            try {
                                if (successCallback) {
                                    successCallback(data);
                                }
                            }
                            catch (err) {
                                _this.trace.error("Error while including script '{0}': {1}".format(uri, err), err);
                            }
                        },
                        error: function (error) {
                            _this.trace.error("Error while including script '{0}': {1}".format(uri, error), error);
                            if (_this.pendingLibraryDownloads > 0) {
                                _this.pendingLibraryDownloads--;
                            }
                            _this._doIfNoPendingLibraryDownloads();
                            if (errorCallback) {
                                errorCallback(error);
                            }
                        }
                    };
                    dojo.io.script.get(jsonpArgs);
                };
                /** @private */
                Application.prototype.processConfiguration = function (configurationModel) {
                    var _this = this;
                    this.configuration = configurationModel.application || {};
                    this.configModel = configurationModel;
                    // Deprecated as of 2.0. Use AppConfigLoadedEvent instead.
                    this.eventRegistry.event("AppConfigLoaded").publish(this.configModel);
                    this.eventRegistry.event("ApplicationConfigLoadedEvent").publish(this.configModel);
                    // At this point the browserLocale detection has been done.
                    // If a culture has been provided in configuration, it is taken over the browser culture.
                    // If a culture has been specified by the user via URL parameter, that takes precedence over all.
                    // Check configuration for locale.
                    if (this.configuration && this.configuration["locale"]) {
                        this.locale = this.configuration["locale"];
                    }
                    // Check URL parameter for locale.
                    if (this.urlParameters && this.getUrlParameter("locale")) {
                        this.locale = this.getUrlParameter("locale");
                    }
                    // Let dojo know about the locale
                    dojo.locale = this.locale;
                    // Do we need to download any locale resources?
                    this.pendingLocaleDownloads = configurationModel.externalLocaleReferences.length;
                    // If not, continue loading libraries.
                    if (this.pendingLocaleDownloads == 0) {
                        this.downloadLibraries(configurationModel);
                    }
                    else {
                        // This callback will be executed when an external locale resource is successfully fetched.
                        var localeLoadCallback = function (localeRef, localeResource) {
                            try {
                                // We have a valid JSON resource.
                                if (!localeResource) {
                                    _this.trace.warning("Error loading locale '{0}' for library '{1}' from offline storage.".format(localeRef["locale"], localeRef["libraryId"]));
                                }
                                else {
                                    // If the resource contains a single resource, inject the whole thing.
                                    if (!localeResource.hasOwnProperty("locales")) {
                                        // If this resource contains one locale, the configured reference must have a "locale" identifier.
                                        if (!localeRef.hasOwnProperty("locale")) {
                                            throw new Error("Locale reference missing 'locale' identifier.");
                                        }
                                        else {
                                            _this.injectLibraryResources(localeRef["libraryId"], localeResource, localeRef["locale"]);
                                        }
                                    }
                                    else {
                                        // TODO: Test this code path - it hadn't been run before (there was a call to a non-existent method "injectLibraryResource").
                                        // If we have multiple resources, inject them all.
                                        for (var locale in localeResource) {
                                            if (localeResource.hasOwnProperty(locale)) {
                                                var localeDict = localeResource[locale];
                                                _this.injectLibraryResources(localeRef.libraryId, localeDict, locale);
                                            }
                                        }
                                    }
                                }
                            }
                            catch (err) {
                                _this.trace.error("Error fetching external locale resource {0}: {1}".format(localeRef["uri"], err.message), err);
                            }
                            finally {
                                --_this.pendingLocaleDownloads;
                                // If we have no more pending locale resources to fetch, start downloading libraries.
                                if (_this.pendingLocaleDownloads < 1) {
                                    _this.downloadLibraries(configurationModel);
                                }
                            }
                            return;
                        };
                        // This callback will be executed when an error occurs fetching locale resources.
                        var localeLoadError = function (localeRef, err) {
                            _this.trace.error("Error fetching external locale resource {0}: {1}".format(localeRef["uri"], err.message), err);
                            --_this.pendingLocaleDownloads;
                            // If we have no more pending locale resources to fetch, start downloading libraries.
                            if (_this.pendingLocaleDownloads < 1) {
                                _this.downloadLibraries(configurationModel);
                            }
                        };
                        // Start loading all locale resources.
                        for (var i = 0; i < configurationModel.externalLocaleReferences.length; ++i) {
                            var localeRef = configurationModel.externalLocaleReferences[i];
                            (function (currentLocale) {
                                var args = {
                                    url: currentLocale["uri"],
                                    handleAs: "json",
                                    load: function (result) { return localeLoadCallback(currentLocale, result); },
                                    error: function (err) { return localeLoadError(currentLocale, err); }
                                };
                                _this.fetchConfigResource(args);
                            })(localeRef);
                        }
                    }
                };
                Application.prototype.addNativeReadyFunction = function (callback) {
                    // If the gcxNativeReady flag is set, we're ready to call the callback now 
                    if (typeof gcxNativeReady !== "undefined") {
                        if (callback) {
                            callback();
                        }
                    }
                    else {
                        var oldNativeReadyCallback = gcxNativeReadyCallback;
                        gcxNativeReadyCallback = function () {
                            if (oldNativeReadyCallback) {
                                oldNativeReadyCallback();
                            }
                            if (callback) {
                                callback();
                            }
                        };
                    }
                };
                /**
                 * Subclasses can override this method to supply the initial state that will be applied to a module.
                 */
                Application.prototype.getInitialState = function (moduleName, libraryId) {
                    return new framework.SimplePromise(function (resolve, reject) { return resolve(null); });
                };
                /**
                 * Initializes an array of configured modules.
                 * @param modules An array of configured modules to initialize.
                 * @private
                 */
                Application.prototype.initializeModules = function (modules) {
                    var _this = this;
                    var viewModelEntries = {};
                    // Iterate over all modules in config and instantiate and initialize them.
                    for (var i = 0; i < modules.length; ++i) {
                        var moduleConfig = modules[i];
                        // Don't re-initialize any modules that we already have.
                        if (this.moduleManager.moduleIsLoaded(moduleConfig.moduleName)) {
                            continue;
                        }
                        // Attempt to translate the module configuration.
                        var config = this.translateConfiguration(moduleConfig.libraryId, moduleConfig.configuration);
                        // Attempt to instantiate the referenced module.
                        var moduleInstance = this.moduleManager.instantiate(moduleConfig.moduleType, moduleConfig.libraryId);
                        if (moduleInstance === null) {
                            this.trace.error("Could not instantiate module with type '{0}' - type not found or constructor failed.".format(moduleConfig.moduleType));
                            continue;
                        }
                        // If the module has an initialize method, invoke it.
                        if (moduleInstance.initialize) {
                            this.trace.info("Initializing module '{0}'.".format(moduleConfig.moduleName));
                            try {
                                moduleInstance.id = "module-{0}-{1}".format(moduleConfig.libraryId, moduleConfig.moduleName);
                                moduleInstance.initialize(config);
                                this.registerFrameworkObject(moduleInstance);
                                // Capture the values of these variables in the current loop iteration for use in closures.
                                (function (moduleInstance, moduleConfig) {
                                    // Apply the module's initial state.
                                    _this._initialStateAppliedCount++;
                                    _this.getInitialState(moduleConfig.moduleName, moduleConfig.libraryId)
                                        .then(function (moduleState) {
                                        if (moduleState && typeof moduleInstance.applyState === "function") {
                                            return moduleInstance.applyState(moduleState);
                                        }
                                    })
                                        .then(function () { return _this._onInitialStateApplied(moduleConfig.moduleName); }, function (error) { return _this._onInitialStateApplied(moduleConfig.moduleName, error); });
                                })(moduleInstance, moduleConfig);
                            }
                            catch (err) {
                                this.trace.error("Error initializing module '{0}': {1}.".format(moduleConfig.moduleName, err.message), err);
                                continue;
                            }
                            this.moduleManager.markModuleLoaded(moduleConfig.moduleName, moduleInstance);
                            this.trace.debug("Module '{0}' initialized.".format(moduleConfig.moduleName));
                        }
                        // Now that the module has initialized, create any view models referenced in configuration.
                        if (moduleConfig.viewModelConfigs && moduleConfig.viewModelConfigs.length > 0) {
                            for (var j = 0; j < moduleConfig.viewModelConfigs.length; ++j) {
                                var viewModelConfig = moduleConfig.viewModelConfigs[j];
                                // Make sure the view model ID is unique.
                                if (viewModelEntries[viewModelConfig.viewModelId]) {
                                    this.trace.error("ViewModel '{0}' already exists in module '{1}'.".format(viewModelConfig.viewModelId, moduleConfig.moduleName));
                                }
                                else {
                                    // Attempt to instantiate the view model.
                                    var viewModelInstance = null;
                                    try {
                                        viewModelInstance = this.instantiateFrameworkObject(viewModelConfig.typeName, viewModelConfig.libraryId);
                                        // Construct the view model.
                                        viewModelInstance.id = viewModelConfig.viewModelId || geocortex.framework.utils.alphaNumericToken();
                                        // Translate the view model's resources.
                                        var config = this.translateConfiguration(moduleConfig.libraryId, viewModelConfig.configuration);
                                        // Initialize the view model.
                                        viewModelInstance.initialize(config);
                                        // Store a reference to this view model instance so that views may reference it.
                                        viewModelEntries[viewModelConfig.viewModelId] = viewModelInstance;
                                        this.registerFrameworkObject(viewModelInstance);
                                    }
                                    catch (err) {
                                        this.trace.error("Could not create view model with type '{0}' - type was not found, not a view model, or failed to construct: {1}".format(viewModelConfig.typeName, err.message), err);
                                    }
                                }
                            }
                        }
                    }
                    // Now that our modules are initialized and our viewModels created, we'll spin up any views requested.
                    for (var i = 0; i < modules.length; ++i) {
                        var moduleConfig = modules[i];
                        // If the module has views, instantiate them.
                        if (moduleConfig.viewConfigs) {
                            for (var j = 0; j < moduleConfig.viewConfigs.length; ++j) {
                                var viewConfig = moduleConfig.viewConfigs[j];
                                // Don't re-initialize any modules that we already have.
                                if (this.getFrameworkObjectById(viewConfig.viewId)) {
                                    continue;
                                }
                                // Translate the view's resources.
                                viewConfig = this.translateConfiguration(moduleConfig.libraryId, viewConfig);
                                // If the view does not have a view model, an anonymous one will be created and bound.
                                var viewModel = null;
                                if (!viewConfig.viewModelId) {
                                    viewModel = new geocortex.framework.ui.ViewModelBase(this, moduleConfig.libraryId);
                                }
                                else {
                                    // Attempt to get the view model by id.
                                    viewModel = viewModelEntries[viewConfig.viewModelId];
                                    if (!viewModel) {
                                        this.trace.error("Could not attach view model '{0}' to view '{1}' - view model not found.".format(viewConfig.viewModelId, viewConfig.viewId));
                                    }
                                    else {
                                        viewModel.libraryId = viewModel.libraryId || moduleConfig.libraryId;
                                    }
                                }
                                viewConfig.viewModel = viewModel;
                                // The ViewManager will handle view creation responsibilities.
                                var viewInstance = this.viewManager.createView(viewConfig);
                                if (!viewInstance) {
                                    this.trace.warning("Could not instantiate view with type '{0}'.".format(viewConfig.typeName));
                                    continue;
                                }
                                this.registerFrameworkObject(viewInstance);
                            }
                        }
                    }
                    // We'll fire the initialization complete event once - the first time we load one or more modules.
                    if (this.initializationCompleteCallback) {
                        this.onInitializationComplete();
                        this.initializationCompleteCallback = null;
                    }
                };
                Application.prototype._onInitialStateApplied = function (moduleName, error) {
                    this._initialStateAppliedCount--;
                    if (error) {
                        this.trace.error("Error setting initial state for module \"{0}\": {1}".format(moduleName, error.message), error);
                    }
                    // Fire the callback when all promises to apply initial state are fulfilled (or rejected).
                    if (this.allLibrariesLoaded && this._initialStateAppliedCount <= 0 && this.initialStateAppliedCallback) {
                        this.initialStateAppliedCallback(this);
                    }
                };
                /**
                 * Fetches a configuration resource, provided it comes from the same domain or a whitelisted domain.
                 * @param args Arguments containing a URL to fetch. These will be passed directly into an XmlHttpRequest via `dojo.xhrGet`.
                 */
                Application.prototype.fetchConfigResource = function (args) {
                    var a = document.createElement("a");
                    try {
                        a.href = args.url;
                        a.style.display = "none";
                        document.body.appendChild(a);
                        var wl = geocortex["_configDomains"];
                        if (!a.hostname || ["protocol", "hostname"].every(function (p) { return a[p] === window.location[p]; }) || (wl && wl[a.protocol + "//" + a.hostname] == true)) {
                            return dojo.xhrGet(args);
                        }
                        else {
                            var error = new Error("Could not load viewer because the specified configuration file is not on the same domain as the viewer ({0}).".format(args.url));
                            error.name = "ConfigurationDomainMismatch";
                            throw error;
                        }
                    }
                    finally {
                        document.body.removeChild(a);
                    }
                };
                /**
                 * Generates a random string matching the length of the string passed in. Useful when testing internationalization.
                 * @param stringResource The original string resource.
                 */
                Application.prototype._getDebugLocaleString = function (stringResource) {
                    // Miscellaneous symbols Unicode range - http://unicode-table.com/en/blocks/miscellaneous-symbols/
                    var range = [9728, 9983];
                    var codePoints = [];
                    for (var i = 0; i < stringResource.length; ++i) {
                        codePoints.push(Math.floor(Math.random() * (range[1] - range[0])) + range[0]);
                    }
                    return String.fromCharCode.apply(String, codePoints);
                };
                return Application;
            }());
            application.Application = Application;
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../_Definitions/dojo.d.ts" />
/// <reference path="../utils/String.ts" />
/// <reference path="../utils/utils.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            var ResourceManager = (function () {
                function ResourceManager() {
                    this.resources = [];
                    this.cachedResources = {};
                    this.themesToInject = [];
                }
                /**
                 * Fetches a pre-registered resource by name, performing any decoding or processing required based on the resource format.
                 * @param resourceName The name that this resource was registered with, local to the libraryId.
                 * @param libraryId The ID of the library that the resource belongs to.
                 * @param locale The locale ID of the resource to fetch. Defaults to the invariant culture ID.
                 */
                ResourceManager.prototype.fetch = function (resourceName, libraryId, locale) {
                    locale = locale || "inv";
                    // Has this resource been decoded and cached already?
                    var cachedResourceId = "{0}-{1}-{2}".format(libraryId, locale, resourceName);
                    if (this.cachedResources.hasOwnProperty(cachedResourceId)) {
                        return this.cachedResources[cachedResourceId];
                    }
                    // Nope. Grab it.
                    var res = this.findResource(resourceName, libraryId, locale);
                    if (!res) {
                        return null;
                    }
                    var decodedValue = null;
                    // Process the resource and cache it.
                    switch (res["format"]) {
                        case "css":
                        case "html":
                            // The string version of HTML/CSS is fine - it's easy enough to turn into DOM elements.
                            decodedValue = geocortex.framework.utils.base64Decode(res["data"]);
                            // Cache the decoded resource for future referencing.
                            this.cachedResources[cachedResourceId] = decodedValue;
                            // TODO: Should place the decoded value back into the original resource entry to save memory.
                            break;
                        case "json":
                            decodedValue = geocortex.framework.utils.base64Decode(res["data"]);
                            decodedValue = JSON.parse(decodedValue);
                            this.cachedResources[cachedResourceId] = decodedValue;
                            break;
                        default:
                            // TODO: Fix. Not sure why the compiler does not like this try/catch block.
                            /*
                            var message = "Unknown resource type '{0}' for resource '{1}'.".format(res["format"], resourceName);
                            try {
                                console.error(message);
                            }
                            catch (fff) {
                                // Not all browsers support console.
                                throw new Error(message);
                            }*/
                            return null;
                    }
                    return decodedValue;
                };
                /**
                 * Fetches all resources of a given format from the given library.
                 * @param libraryId The configured ID of the library to fetch resources for.
                 * @param format The format of the desired resources.
                 */
                ResourceManager.prototype.fetchAllFor = function (libraryId, format) {
                    var resources = [];
                    for (var resourceIndex = 0; resourceIndex < this.resources.length; ++resourceIndex) {
                        var res = this.resources[resourceIndex];
                        // Match library name.
                        if (res["library"] == libraryId) {
                            // Match format, if we have it.
                            if (format != null && res["format"] != format) {
                                continue;
                            }
                            else {
                                resources.push(res);
                            }
                        }
                    }
                    return resources;
                };
                /**
                 * Registers a resource against a library with a name, a format, and a base-64 encoded data chunk.
                 * @param libraryId The ID of the library that the resource belongs to.
                 * @param locale The locale that this resource is for.
                 * @param resourceName The name of the registered resource, local to the library.
                 * @param resourceFormat The format identifier of the resource.
                 * @param resourceData The base-64 encoded data for this resource.
                 */
                ResourceManager.prototype.register = function (libraryId, locale, resourceName, resourceFormat, resourceData) {
                    var existingResource = this.findResource(resourceName, libraryId);
                    if (existingResource) {
                        return; // Temporary hack - TODO: revert this once we have proper library download detection
                    }
                    var res = {};
                    res["name"] = resourceName;
                    res["library"] = libraryId;
                    res["locale"] = locale;
                    res["format"] = resourceFormat;
                    res["data"] = resourceData;
                    this.resources.push(res);
                };
                /**
                 * Unregisters and removes a resource.
                 * @param resourceName The name that the resource was registered with.
                 * @param libraryId The ID of the library that the resource belongs to.
                 * @param locale The locale of the resource.
                 */
                ResourceManager.prototype.remove = function (libraryId, resourceName, locale) {
                    var resource = this.findResource(resourceName, libraryId, locale);
                    if (resource != null) {
                        // Remove from the main resource collection.
                        Array.removeItem(this.resources, resource);
                        // Remove from the resource cache.
                        var cachedResourceId = "{0}-{1}-{2}".format(libraryId, locale, resourceName);
                        if (this.cachedResources.hasOwnProperty(cachedResourceId)) {
                            //GVH-3189, GVH-3192
                            delete this.cachedResources[cachedResourceId];
                        }
                        return true;
                    }
                    return false;
                };
                /**
                 * Adds a CSS theme to the collection of themes to inject when the viewer loads all of its external code dependencies.
                 * @param themeUri
                 */
                ResourceManager.prototype.injectTheme = function (themeUri) {
                    this.themesToInject.push(themeUri);
                    return;
                };
                /**
                 * Performs theme injection. This method is called once by an application when it has become initialized.
                 */
                ResourceManager.prototype.performThemeInjection = function () {
                    var head = dojo.query("head")[0];
                    for (var themeIndex = 0; themeIndex < this.themesToInject.length; ++themeIndex) {
                        var styleElement = dojo.create("link", { rel: "stylesheet", href: this.themesToInject[themeIndex] });
                        dojo.place(styleElement, head, "last");
                    }
                };
                /**
                 * Finds a specific resources by name, library ID, and locale.
                 * @param resourceName The name that the resource was registered with.
                 * @param libraryId The ID of the library that the resource belongs to.
                 * @param locale The optional locale of the resource. Defaults to the invariant locale.
                 */
                ResourceManager.prototype.findResource = function (resourceName, libraryId, locale) {
                    locale = locale || "inv";
                    for (var i = 0; i < this.resources.length; ++i) {
                        var res = this.resources[i];
                        if (res["name"] == resourceName) {
                            if (libraryId != null && res["library"] != libraryId) {
                                continue;
                            }
                            else {
                                if (res["locale"] == locale) {
                                    return res;
                                }
                            }
                        }
                    }
                    return null;
                };
                return ResourceManager;
            }());
            application.ResourceManager = ResourceManager;
        })(application = framework.application || (framework.application = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="application/Application.ts" />
/// <reference path="application/ResourceManager.ts" />
// TODO: Finish documenting.
// TODO: Test.
var geocortex;
(function (geocortex) {
    geocortex.resourceManager = new geocortex.framework.application.ResourceManager();
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        framework.applications = [];
        framework.libraries = {};
        framework.injectedStyleBlocks = [];
        framework.initialized = false;
        function registerApplication(application) {
            geocortex.framework.applications.push(application);
        }
        framework.registerApplication = registerApplication;
        function hasLibrary(libraryId) {
            return (geocortex.framework.libraries[libraryId] === true);
        }
        framework.hasLibrary = hasLibrary;
        function notifyLibraryDownload(libraryId) {
            // Don't re-notify for libs that have already been downloaded.
            if (geocortex.framework.hasLibrary(libraryId)) {
                return;
            }
            geocortex.framework.libraries[libraryId] = true;
            // Get the order for this library. Since we may have multiple applications on the page with potentially different library orderings, the first application
            // that has an order will be the arbiter.
            var libraryIndex = 0;
            // Should include styles by default unless an application specifically prevents it (GVH-7129)
            var shouldIncludeStyles = true;
            for (var applicationIndex = 0; applicationIndex < geocortex.framework.applications.length; ++applicationIndex) {
                var application = geocortex.framework.applications[applicationIndex];
                var index = application.getLibraryOrder(libraryId);
                var shouldOmitStyles = application.shouldOmitStylesForLibrary(libraryId);
                if (shouldOmitStyles === true) {
                    shouldIncludeStyles = false;
                }
                // Add a dumb offset for each library. Up to 32 libraries with styles are supported for loading by each application.
                if (index) {
                    libraryIndex = index + (applicationIndex * 32);
                    break;
                }
            }
            // Add the library styles to the DOM. We'll do so by gluing all module styles together and dropping them in one style tag, as IE fails
            // after 31 style tags: http://support.microsoft.com/kb/262161.
            if (shouldIncludeStyles) {
                var styleResources = geocortex.resourceManager.fetchAllFor(libraryId, "css");
                if (!styleResources) {
                    styleResources = [];
                }
                var styles = "";
                var head = dojo.query("head")[0];
                for (var styleIndex = 0; styleIndex < styleResources.length; ++styleIndex) {
                    var styleResource = styleResources[styleIndex];
                    var decodedBody = geocortex.resourceManager.fetch(styleResource["name"], styleResource["library"]);
                    if (decodedBody) {
                        styles += decodedBody + " ";
                    }
                }
                // Add the glommed together styles to the page.
                // Note: dojo.create and dojo.place for styles in the head does not work in IE7, so we will do it differently (and in a browser specific way).
                var styleSheet = document.createElement("style");
                // Store a reference to this stylesheet so that we can clean it up after.
                geocortex.framework.injectedStyleBlocks.push(styleSheet);
                styleSheet.setAttribute("type", "text/css");
                dojo.attr(styleSheet, "data-block-order", libraryIndex);
                // If we are at position 0, cram the style block in the top of the head.
                // If we have an explicit position, place the stylesheet correctly.
                if (libraryIndex === 0) {
                    dojo.place(styleSheet, head, "first");
                }
                else {
                    var styleBlocks = dojo.query("head style[data-block-order]");
                    // No other blocks? Top of head for you, good sir.
                    if (styleBlocks.length === 0) {
                        dojo.place(styleSheet, head, "first");
                    }
                    else {
                        // If we do have existing blocks, they may be disparate, e.g. we may have download libraries 1, 4, and 7.
                        // We need to inject at the right position, either immediately before an element with greater order, or 
                        // after a trailing block with smaller order.
                        var prevBlock = null;
                        var injected = false;
                        for (var i = 0; i < styleBlocks.length; ++i) {
                            var block = styleBlocks[i];
                            var blockOrder = dojo.attr(block, "data-block-order") || 0;
                            if (blockOrder >= libraryIndex) {
                                dojo.place(styleSheet, block, "before");
                                injected = true;
                                break;
                            }
                            else {
                                prevBlock = block;
                            }
                        }
                        if (!injected) {
                            dojo.place(styleSheet, prevBlock, "after");
                        }
                    }
                }
                // IE
                if (styleSheet.styleSheet) {
                    styleSheet.styleSheet["cssText"] = styles;
                }
                else {
                    var textNode = document.createTextNode(styles);
                    styleSheet.appendChild(textNode);
                }
            }
            // Notify all of the applications in the page.
            for (var applicationIndex = 0; applicationIndex < geocortex.framework.applications.length; ++applicationIndex) {
                var application = geocortex.framework.applications[applicationIndex];
                application.notifyLibraryDownload(libraryId);
            }
        }
        framework.notifyLibraryDownload = notifyLibraryDownload;
        function initialize() {
            if (geocortex.framework["initialized"]) {
                return;
            }
            // This is a legacy thing we're going to leave in the implementation but not expose in TypeScript
            geocortex.utils = geocortex.framework.utils;
            geocortex.framework["initialized"] = true;
        }
        framework.initialize = initialize;
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
geocortex.framework.initialize();
/// <reference path="../utils/ArrayUtils.ts" />
/// <reference path="RegionAdapterBase.ts" />
/// <reference path="../application/Application.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * Displays a single div in a named region. If another div is added to the region, the previous one is removed.
             */
            var DivRegionAdapter = (function (_super) {
                __extends(DivRegionAdapter, _super);
                /**
                 * Initializes a new instance of the {@link geocortex.framework.ui.DivRegionAdapter} class.
                 * @param name Region name to use for this adapter.
                 * @param app The {@link geocortex.framework.application.Application} that this DivRegionAdapter belongs to.
                 */
                function DivRegionAdapter(name, app) {
                    _super.call(this, name, app);
                }
                /**
                 * Removes all views from the region.
                 */
                DivRegionAdapter.prototype.unhostAllViews = function () {
                    for (var viewIndex = 0; viewIndex < this.views.length; ++viewIndex) {
                        var view = this.views[viewIndex];
                        this.unhostView(view);
                    }
                    this.views.length = 0;
                };
                /**
                 * Hosts a single view in the region, removing any pre-existing ones.
                 * @param view The view to host.
                 */
                DivRegionAdapter.prototype.hostView = function (view) {
                    this.unhostAllViews();
                    this.views.push(view);
                    // Does the view have markup? Fetch it.
                    if (view.root == null) {
                        var viewMarkup = geocortex.resourceManager.fetch(view.markupResource, view.libraryId);
                        if (viewMarkup === null) {
                            this.app.trace.warning("Could not fetch markup resource '{0}' in library '{1}'.".format(view.markupResource, view.libraryId));
                            return false;
                        }
                        // We'll create some markup structure for the view and put it in the region.
                        view.root = dojo.create("div", { className: "view {0}".format(view.id) });
                        view.root.innerHTML = viewMarkup;
                        dojo.place(view.root, this.domElement, "last");
                        // Attach the view model (if present) and perform binding.
                        if (view.viewModel) {
                            view.attach(view.viewModel);
                        }
                        // Discover any new regions that were created.
                        this.app.viewManager.discoverRegions(view.root, view);
                    }
                    else {
                        dojo.place(view.root, this.domElement, "only");
                    }
                    _super.prototype.hostView.call(this, view);
                    return true;
                };
                /**
                 * Removes a view from the region. The view should pre-exist in the region.
                 * @param view The view to unhost.
                 */
                DivRegionAdapter.prototype.unhostView = function (view) {
                    this.deactivateView(view);
                    // Remove from view collections.
                    framework.utils.ArrayUtils.removeItem(this.views, view);
                    // Remove DOM element.
                    var nl = new dojo.NodeList();
                    nl.push(view.root);
                    nl.orphan();
                    _super.prototype.unhostView.call(this, view);
                };
                return DivRegionAdapter;
            }(ui.RegionAdapterBase));
            ui.DivRegionAdapter = DivRegionAdapter;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../utils/ArrayUtils.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="RegionAdapterBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            /**
             * DivStackRegionAdapter Models a number of views as a stack of div elements.Views are brought to the top when activated.
             * Multiple views may be visible at once and may overlap each other.
             */
            var DivStackRegionAdapter = (function (_super) {
                __extends(DivStackRegionAdapter, _super);
                /**
                 * Initializes a new instance of the {@link DivStackRegionAdapter} class.
                 * @param name The optional name of the region adapter.
                 * @param app The {@link geocortex.framework.application.Application} that this DivStackRegionAdapter belongs to.
                 */
                function DivStackRegionAdapter(name, app) {
                    _super.call(this, name, app);
                    /** Array of all the active views in this region. */
                    this.activeViews = [];
                    /** Whether or not to move a view to the last position in the region's DOM container when activating. */
                    this.activateViewsInLastPosition = true;
                }
                /** @inherited */
                DivStackRegionAdapter.prototype.host = function (element, options) {
                    _super.prototype.host.call(this, element, options);
                    if (this.options["activateViewsInLastPosition"] === "false") {
                        this.activateViewsInLastPosition = false;
                    }
                };
                /**
                 * Activates a view, making it visible and bringing it to the top of the active stack.
                 * @param view The view to activate. This view should already be hosted in the region.
                 */
                DivStackRegionAdapter.prototype.activateView = function (view) {
                    // If the view doesn't already exist, add it to the stack of active views.
                    if (!framework.utils.ArrayUtils.contains(this.activeViews, view)) {
                        this.activeViews.push(view);
                    }
                    else {
                        // If the view already exists in the stack, remove it and push it on the end.
                        framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                        this.activeViews.push(view);
                    }
                    // Shuffle this active view to the end of the child collection, placing it on top of any other views in the region.
                    if (this.activateViewsInLastPosition) {
                        dojo.place(view.root, this.domElement, "last");
                    }
                    _super.prototype.activateView.call(this, view);
                };
                /**
                 * Deactivates a view, making it non-visible and removing it from the active stack.
                 * @param view The view to deactivate. This view should already be hosted in the region.
                 */
                DivStackRegionAdapter.prototype.deactivateView = function (view) {
                    view.isActive = false;
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    // Any queued up views waiting to be displayed behind this one? display them. Otherwise, deactivate the region.
                    if (this.activeViews.length > 0) {
                        this.activateView(this.activeViews[this.activeViews.length - 1]);
                    }
                    else {
                    }
                    _super.prototype.deactivateView.call(this, view);
                };
                /**
                 * Adds a view to the region and binds it to its view model, if present.
                 * @param view
                 */
                DivStackRegionAdapter.prototype.hostView = function (view) {
                    this.views.push(view);
                    // Does the view have markup? Fetch it.
                    if (view.root == null) {
                        var viewMarkup = geocortex.resourceManager.fetch(view.markupResource, view.libraryId);
                        if (viewMarkup == null) {
                            this.app.trace.warning("Could not fetch markup resource '{0}' in library '{1}'.".format(view.markupResource, view.libraryId));
                            return false;
                        }
                        // We'll create some markup structure for the view and put it in the region.
                        var hostedTagName = this.getHostedTagName();
                        view.root = dojo.create(hostedTagName, { className: "view {0}".format(view.id) });
                        view.root.innerHTML = viewMarkup;
                        dojo.place(view.root, this.domElement, "last");
                        // Attach the view model (if present) and perform binding.
                        if (view.viewModel) {
                            view.attach(view.viewModel);
                        }
                        // Discover any new regions that were created.
                        this.app.viewManager.discoverRegions(view.root, view);
                    }
                    else {
                        dojo.place(view.root, this.domElement, "last");
                    }
                    _super.prototype.hostView.call(this, view);
                    return true;
                };
                /**
                 * Removes a view from this region.
                 * @param view
                 */
                DivStackRegionAdapter.prototype.unhostView = function (view) {
                    this.deactivateView(view);
                    // Remove from view collections.
                    framework.utils.ArrayUtils.removeItem(this.views, view);
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    // Remove DOM element.
                    var nl = new dojo.NodeList();
                    nl.push(view.root);
                    nl.orphan();
                    _super.prototype.unhostView.call(this, view);
                };
                /**
                * Gets the name of that element that the view will be hosted in. The default is div,
                * but the developer can specify that a different element name should be used through
                * the tagName property of the options.
                */
                DivStackRegionAdapter.prototype.getHostedTagName = function () {
                    if (!this.options || !this.options.tagName) {
                        return "div";
                    }
                    return this.options.tagName;
                };
                return DivStackRegionAdapter;
            }(ui.RegionAdapterBase));
            ui.DivStackRegionAdapter = DivStackRegionAdapter;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../utils/ArrayUtils.ts" />
/// <reference path="ViewBase.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var MultiViewRegionAdapter = (function (_super) {
                __extends(MultiViewRegionAdapter, _super);
                function MultiViewRegionAdapter() {
                    _super.apply(this, arguments);
                }
                /**
                 * Activates a view, making it the visible view in this region.
                 * @param view The view to activate. This view should already be hosted in the region.
                 */
                MultiViewRegionAdapter.prototype.activateView = function (view) {
                    this.hideAllViews();
                    // If there is an active view (and it's not the one being activated), deactivate it.
                    if (this.activeViews.length > 0) {
                        var activeView = this.activeViews[this.activeViews.length - 1];
                        if (activeView !== view) {
                            this.cancelActivate(activeView);
                            activeView.deactivated();
                        }
                    }
                    ;
                    _super.prototype.activateView.call(this, view);
                };
                /**
                 * Deactivates a view, making it non-visible. The previous view is made visible, if active.
                 * @param view The view to activate. This view should already be hosted in the region.
                 * @param activatePrevious
                 */
                MultiViewRegionAdapter.prototype.deactivateView = function (view, activatePrevious) {
                    if (activatePrevious === undefined || activatePrevious === null) {
                        activatePrevious = true;
                    }
                    _super.prototype.deactivateView.call(this, view);
                    // Display the next underlying, active view.
                    if (activatePrevious && this.activeViews.length > 0) {
                        this.activateView(this.activeViews[this.activeViews.length - 1]);
                    }
                };
                /**
                 * Makes all views in this region non-visible.
                 */
                MultiViewRegionAdapter.prototype.hideAllViews = function () {
                    dojo.query("> .view", this.domElement).removeClass("active");
                    dojo.query("> .view", this.domElement).addClass("inactive");
                };
                /**
                 * Adds a view to the region and binds it to its view model.
                 * @param view The view to add to the region.
                 */
                MultiViewRegionAdapter.prototype.hostView = function (view) {
                    // TODO: Unhost all other views
                    this.views.push(view);
                    // Does the view have markup? Fetch it.
                    if (view.root == null) {
                        var viewMarkup = geocortex.resourceManager.fetch(view.markupResource, view.libraryId);
                        if (viewMarkup == null) {
                            this.app.trace.warning("Could not fetch markup resource '{0}' in library '{1}'.".format(view.markupResource, view.libraryId));
                            return false;
                        }
                        // We'll create some markup structure for the view and put it in the region.
                        var hostedTagName = this.getHostedTagName();
                        view.root = dojo.create(hostedTagName, { className: "view {0}".format(view.id) });
                        view.root.innerHTML = viewMarkup;
                        dojo.place(view.root, this.domElement, "last");
                        // Attach the view model (if present) and perform binding.
                        if (view.viewModel) {
                            view.attach(view.viewModel);
                        }
                        // Discover any new regions that were created.
                        this.app.viewManager.discoverRegions(view.root, view);
                    }
                    else {
                        dojo.place(view.root, this.domElement, "last");
                    }
                    _super.prototype.hostView.call(this, view);
                    return true;
                };
                /**
                 * Gets the name of that element that the view will be hosted in. The default is div,
                 * but the developer can specify that a different element name should be used through
                 * the tagName property of the options.
                 */
                MultiViewRegionAdapter.prototype.getHostedTagName = function () {
                    if (!this.options || !this.options.tagName) {
                        return "div";
                    }
                    return this.options.tagName;
                };
                /**
                 * Removes a view from the region.
                 * @param view The view to remove from the region.
                 */
                MultiViewRegionAdapter.prototype.unhostView = function (view) {
                    this.deactivateView(view);
                    // Remove from view collections.
                    framework.utils.ArrayUtils.removeItem(this.views, view);
                    framework.utils.ArrayUtils.removeItem(this.activeViews, view);
                    // Remove DOM element.
                    var nl = new dojo.NodeList();
                    nl.push(view.root);
                    nl.orphan();
                    _super.prototype.unhostView.call(this, view);
                };
                return MultiViewRegionAdapter;
            }(ui.RegionAdapterBase));
            ui.MultiViewRegionAdapter = MultiViewRegionAdapter;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="MultiViewRegionAdapter.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var ui;
        (function (ui) {
            var MultiDivRegionAdapter = (function (_super) {
                __extends(MultiDivRegionAdapter, _super);
                function MultiDivRegionAdapter() {
                    _super.apply(this, arguments);
                }
                MultiDivRegionAdapter.prototype.getHostedTagName = function () {
                    return "div";
                };
                return MultiDivRegionAdapter;
            }(ui.MultiViewRegionAdapter));
            ui.MultiDivRegionAdapter = MultiDivRegionAdapter;
        })(ui = framework.ui || (framework.ui = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            var DateUtils;
            (function (DateUtils) {
                var containsTimezoneMatcher = /(Z|([+-][012]\d(:?\d\d)?))\s*$/;
                function containsTimezone(s) {
                    return containsTimezoneMatcher.test(s);
                }
                DateUtils.containsTimezone = containsTimezone;
                var cachedTimezoneOffset = null;
                var cachedTimeZoneString = null;
                function getTimezoneOffset() {
                    if (cachedTimezoneOffset === null) {
                        cachedTimezoneOffset = new Date().getTimezoneOffset();
                    }
                    return cachedTimezoneOffset;
                }
                DateUtils.getTimezoneOffset = getTimezoneOffset;
                function getTimezoneString() {
                    if (cachedTimeZoneString == null) {
                        var offset = getTimezoneOffset();
                        var hours = Math.floor(offset / 60);
                        var minutes = Math.floor(offset - hours * 60);
                        if (hours == 0 && minutes == 0) {
                            return "Z";
                        }
                        if (hours < 0) {
                            hours *= -1;
                            cachedTimeZoneString = "+";
                        }
                        else {
                            cachedTimeZoneString = "-";
                        }
                        if (hours == 0) {
                            cachedTimeZoneString += "00";
                        }
                        else if (hours < 10) {
                            cachedTimeZoneString += "0" + hours;
                        }
                        else {
                            cachedTimeZoneString += hours;
                        }
                        if (minutes == 0) {
                            cachedTimeZoneString += ":00";
                        }
                        else if (minutes < 10) {
                            cachedTimeZoneString += ":0" + minutes;
                        }
                        else {
                            cachedTimeZoneString += ":" + minutes;
                        }
                    }
                    return cachedTimeZoneString;
                }
                DateUtils.getTimezoneString = getTimezoneString;
                (function () {
                    var D = new Date("2011-06-02T09:34:29+02:00");
                    if (!D || +D !== 1307000069000) {
                        Date.fromISO = function (s) {
                            var day, tz, rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/, p = rx.exec(s) || [];
                            if (p[1]) {
                                day = p[1].split(/\D/);
                                for (var i = 0, L = day.length; i < L; i++) {
                                    day[i] = parseInt(day[i], 10) || 0;
                                }
                                ;
                                day[1] -= 1;
                                day = new Date(Date.UTC.apply(Date, day));
                                if (!day.getDate()) {
                                    return NaN;
                                }
                                if (p[5]) {
                                    tz = (parseInt(p[5], 10) * 60);
                                    if (p[6]) {
                                        tz += parseInt(p[6], 10);
                                    }
                                    if (p[4] == "+") {
                                        tz *= -1;
                                    }
                                    if (tz) {
                                        day.setUTCMinutes(day.getUTCMinutes() + tz);
                                    }
                                }
                                return day;
                            }
                            return NaN;
                        };
                    }
                    else {
                        Date.fromISO = function (s) {
                            return new Date(s);
                        };
                    }
                })();
                if (!Date.prototype.toISOString) {
                    /**
                     * This method was standardized in ECMA-262 5th edition.  Engines which have not been
                     * updated to support this method can work around the absence of this method using the following shim:
                     */
                    (function () {
                        function pad(number) {
                            var r = String(number);
                            if (r.length === 1) {
                                r = "0" + r;
                            }
                            return r;
                        }
                        Date.prototype.toISOString = function () {
                            return this.getUTCFullYear()
                                + "-" + pad(this.getUTCMonth() + 1)
                                + "-" + pad(this.getUTCDate())
                                + "T" + pad(this.getUTCHours())
                                + ":" + pad(this.getUTCMinutes())
                                + ":" + pad(this.getUTCSeconds())
                                + "." + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                                + "Z";
                        };
                    }());
                }
            })(DateUtils = utils.DateUtils || (utils.DateUtils = {}));
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            /**
             * TimeDelayedAction provides a wrapper around a `setTimeout()` function call that makes it easy to stop and reset.
             */
            var TimeDelayedAction = (function () {
                /**
                 * Initializes a new instance of the {@link geocortex.framework.utils.TimeDelayedAction} class.
                 * You must call the start method to start the timer.  It does not auto-start.</p>
                 * @param delayMS The number of milliseconds until the function is executed.
                 * @param func The function to execute after the time has ellapsed.
                 * @param functionContext Provides the value of the this variable in the function callback.
                */
                function TimeDelayedAction(delayMS, func, functionContext) {
                    /** The amount of delay before the function is called. */
                    this.delayMS = 0;
                    /** The function to execute. */
                    this.func = null;
                    this.delayMS = delayMS;
                    // If we have a context, wrap func so that it's executed against the context.
                    if (functionContext) {
                        this.func = function () {
                            func.apply(functionContext);
                        };
                    }
                    else {
                        this.func = func;
                    }
                }
                /** Starts the timer. */
                TimeDelayedAction.prototype.start = function () {
                    this._timerHandle = setTimeout(this.func, this.delayMS);
                };
                /** Stops the timer. */
                TimeDelayedAction.prototype.stop = function () {
                    clearTimeout(this._timerHandle);
                };
                /** Restarts the timer. */
                TimeDelayedAction.prototype.reset = function () {
                    this.stop();
                    this.start();
                };
                return TimeDelayedAction;
            }());
            utils.TimeDelayedAction = TimeDelayedAction;
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
/// <reference path="boot.ts" />
/// <reference path="commands/CommandRegistry.ts" />
/// <reference path="commands/TypedCommand.ts" />
/// <reference path="config/ConfigurationLoader.ts" />
/// <reference path="config/ConfigurationModel.ts" />
/// <reference path="events/EventRegistry.ts" />
/// <reference path="events/TypedEvent.ts" />
/// <reference path="observables.ts" />
/// <reference path="storage/Store.ts" />
/// <reference path="ui/DivRegionAdapter.ts" />
/// <reference path="ui/DivStackRegionAdapter.ts" />
/// <reference path="ui/MultiViewRegionAdapter.ts" />
/// <reference path="ui/MultiDivRegionAdapter.ts" />
/// <reference path="utils/DateUtils.ts" />
/// <reference path="utils/TimeDelayedOperation.ts" />
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        /**
         * A very lightweight promise implementation. Used internally within Framework to avoid forcing
         * consumers to load a 3rd party promise library. Applications that need to use promises are
         * probably better off using a full-featured promise library rather than this class.
         */
        var SimplePromise = (function () {
            function SimplePromise(resolver) {
                var _this = this;
                this._state = SimplePromise.PENDING;
                // Store value or error once FULFILLED or REJECTED.
                this._value = null;
                // Store success & failure handlers attached by calling .then or .done
                this._handlers = [];
                this._doResolve(resolver, function (x) { return _this._resolve(x); }, function (x) { return _this._reject(x); });
            }
            SimplePromise.resolve = function (value) {
                var then = SimplePromise._getThen(value);
                if (then) {
                    return value;
                }
                else {
                    return new SimplePromise(function (resolve, reject) {
                        resolve(value);
                    });
                }
            };
            /**
             * Create a promise that is rejected with the given reason.
             * @param reason An error or other value indicating why the promise was rejected.
             */
            SimplePromise.reject = function (reason) {
                return new SimplePromise(function (resolve, reject) {
                    reject(reason);
                });
            };
            SimplePromise.all = function (values) {
                return SimplePromise.resolve(values)
                    .then(function (values) {
                    if (!Array.isArray(values)) {
                        throw new Error("SimplePromise.all: expecting an array or a thenable.");
                    }
                    var remaining = values.length;
                    var result = [];
                    return new SimplePromise(function (resolve, reject) {
                        values.forEach(function (value, i) {
                            SimplePromise.resolve(value).then(function (value) {
                                result[i] = value;
                                if (--remaining === 0) {
                                    resolve(result);
                                }
                            }, reject);
                        });
                    });
                });
            };
            SimplePromise.prototype.then = function (onFulfilled, onRejected) {
                var _this = this;
                return new SimplePromise(function (resolve, reject) {
                    return _this._done(function (result) {
                        if (typeof onFulfilled === "function") {
                            try {
                                return resolve(onFulfilled(result));
                            }
                            catch (ex) {
                                return reject(ex);
                            }
                        }
                        else {
                            return resolve(result);
                        }
                    }, function (error) {
                        if (typeof onRejected === "function") {
                            try {
                                return resolve(onRejected(error));
                            }
                            catch (ex) {
                                return reject(ex);
                            }
                        }
                        else {
                            return reject(error);
                        }
                    });
                });
            };
            SimplePromise.prototype._fulfill = function (result) {
                var _this = this;
                this._state = SimplePromise.FULFILLED;
                this._value = result;
                this._handlers.forEach(function (handler) { return _this._handle(handler); });
                this._handlers = [];
            };
            SimplePromise.prototype._reject = function (error) {
                var _this = this;
                this._state = SimplePromise.REJECTED;
                this._value = error;
                this._handlers.forEach(function (handler) { return _this._handle(handler); });
                this._handlers = [];
            };
            SimplePromise.prototype._resolve = function (result) {
                var _this = this;
                try {
                    var then = SimplePromise._getThen(result);
                    if (then) {
                        this._doResolve(then.bind(result), function (x) { return _this._resolve(x); }, function (x) { return _this._reject(x); });
                        return;
                    }
                    this._fulfill(result);
                }
                catch (e) {
                    this._reject(e);
                }
            };
            /**
             * Check if a value is a Promise and, if it is,
             * return the `then` method of that promise.
             */
            SimplePromise._getThen = function (value) {
                var t = typeof value;
                if (value && (t === "object" || t === "function")) {
                    var then = value.then;
                    if (typeof then === "function") {
                        return then;
                    }
                }
                return null;
            };
            SimplePromise.prototype._doResolve = function (resolver, onFulfilled, onRejected) {
                var done = false;
                try {
                    resolver(function (value) {
                        if (done) {
                            return;
                        }
                        done = true;
                        onFulfilled(value);
                    }, function (reason) {
                        if (done) {
                            return;
                        }
                        done = true;
                        onRejected(reason);
                    });
                }
                catch (ex) {
                    if (done) {
                        return;
                    }
                    done = true;
                    onRejected(ex);
                }
            };
            SimplePromise.prototype._handle = function (handler) {
                if (this._state === SimplePromise.PENDING) {
                    this._handlers.push(handler);
                }
                else {
                    if (this._state === SimplePromise.FULFILLED &&
                        typeof handler.onFulfilled === "function") {
                        handler.onFulfilled(this._value);
                    }
                    if (this._state === SimplePromise.REJECTED &&
                        typeof handler.onRejected === "function") {
                        handler.onRejected(this._value);
                    }
                }
            };
            SimplePromise.prototype._done = function (onFulfilled, onRejected) {
                var _this = this;
                // Ensure we are always asynchronous.
                setTimeout(function () {
                    _this._handle({
                        onFulfilled: onFulfilled,
                        onRejected: onRejected
                    });
                }, 0);
            };
            // Implementation is based on the code found here: https://www.promisejs.org/implementing/.
            SimplePromise.PENDING = 0;
            SimplePromise.FULFILLED = 1;
            SimplePromise.REJECTED = 2;
            return SimplePromise;
        }());
        framework.SimplePromise = SimplePromise;
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var storage;
        (function (storage) {
            var HttpStorageProvider = (function (_super) {
                __extends(HttpStorageProvider, _super);
                function HttpStorageProvider(app) {
                    _super.call(this, app);
                    this.fileStorageEndpoint = "/filesystem";
                    this._initialized = false;
                    this.localServerAddress = this.app.localServerAddress ? this.app.localServerAddress : "http://127.0.0.1:8181";
                }
                /**
                 * Initializes this provider.
                 */
                HttpStorageProvider.prototype.initialize = function () {
                    if (this._initialized) {
                        return;
                    }
                    // If Esri doesn't think we have cors, but modernizr thinks we do, trust modernizr
                    if (!window.require.has("esri-cors") && window.Modernizr.cors) {
                        // In Esri 3.4, they switched to has.js support for their 'feature detection'. 
                        // Esri uses User Agent sniffing for their feature detection, which is regularly wrong, 
                        // Especially with the Geocortex App, as it doesn't have 'Safari', or 'Chrome' in it.
                        // To be able to support the App, we have to replace Esri's has function, but we only do this
                        // If we know that we support cors, and the browser doesn't think we already have it.
                        delete window.require.has.cache["esri-cors"];
                        window.require.has.add("esri-cors", function () { return true; });
                    }
                    var localServer = this.localServerAddress.replace("http://", "");
                    window.esri.config.defaults.io.corsEnabledServers.push(localServer);
                    this._initialized = true;
                };
                /**
                 * Detects whether or not this provider is supported by the current user agent.
                 */
                HttpStorageProvider.isSupported = function () {
                    var matches = navigator.userAgent.match(/GeocortexApp[^\/]*\/(\d+.\d+)/);
                    if (matches) {
                        if (parseFloat(matches[1]) >= 1.1) {
                            return true;
                        }
                    }
                    return false;
                };
                HttpStorageProvider.prototype.fileStorageRequest = function (method, path, successCallback, errorCallback, data) {
                    this.initialize();
                    var url = this.localServerAddress + this.fileStorageEndpoint + "/" + path;
                    var options = {
                        url: url,
                        headers: {
                            "Authorization": "Token " + this.app.localServerToken
                        },
                        load: function (result) {
                            successCallback(result);
                        },
                        error: function (error) {
                            if (error && error.status && error.status === 404) {
                                successCallback(null);
                                return;
                            }
                            errorCallback(error);
                        },
                        failOk: true
                    };
                    if (data) {
                        options.putData = data;
                    }
                    dojo.xhr(method, options);
                };
                /**
                 * Clears all data for the current application.
                 * @param successCallback
                 * @param errorCallback
                 */
                HttpStorageProvider.prototype.clear = function (successCallback, errorCallback) {
                    this.fileStorageRequest("DELETE", this.keyNamespace + "/", successCallback, errorCallback);
                };
                /**
                 * Clears all data for all applications.
                 * @param successCallback
                 * @param errorCallback
                 */
                HttpStorageProvider.prototype.clearAllData = function (successCallback, errorCallback) {
                    this.fileStorageRequest("DELETE", "", successCallback, errorCallback);
                };
                /**
                 * Fetches a value based on its key.
                 * @param key The key of the value to fetch.
                 * @param successCallback The callback to fire upon success. If the key is not found, the callback will be fired with null passed in.
                 * @param errorCallback The callback to fire if an error occurs.
                 * @param shared An optional flag that when set to true causes the storage mechanism to fetch the resource as a resource that is common to all applications on the same domain. Default is false.
                 */
                HttpStorageProvider.prototype.get = function (key, successCallback, errorCallback, shared) {
                    var path = shared ? "0" + "/" + key : this.keyNamespace + "/" + key;
                    this.fileStorageRequest("GET", path, successCallback, errorCallback);
                };
                /**
                 * Adds a new key/value pair to storage or overwrites an existing one.
                 * @param key The key of the value to store.
                 * @param value The value to store.
                 * @param successCallback The callback to fire upon success.
                 * @param errorCallback The callback to fire if an error occurs. Passed a key, and the error that occurred.
                 * @param shared An optional flag that when set to true causes the storage mechanism to save the resource in a way that is common to all applications on the same domain. Default is false.
                 */
                HttpStorageProvider.prototype.set = function (key, value, successCallback, errorCallback, shared) {
                    var path = shared ? "0" + "/" + key : this.keyNamespace + "/" + key;
                    this.fileStorageRequest("PUT", path, successCallback, errorCallback, value);
                };
                /**
                 * Removes a key and associated value from the store.
                 * @param key The key for which key/value pair to remove.
                 * @param successCallback The callback to invoke upon successfully removing the desired key/value pair.
                 * @param errorCallback The callback to invoke if an error occurs trying to remove the key/value pair.
                 * @param shared An optional flag that when set to true removes a resource previously saved as a shared resource. Default is false.
                 */
                HttpStorageProvider.prototype.remove = function (key, successCallback, errorCallback, shared) {
                    var path = shared ? "0" + "/" + key : this.keyNamespace + "/" + key;
                    this.fileStorageRequest("DELETE", path, successCallback, errorCallback);
                };
                return HttpStorageProvider;
            }(storage.StorageProviderBase));
            storage.HttpStorageProvider = HttpStorageProvider;
        })(storage = framework.storage || (framework.storage = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            // This is not a comprehensive implementation.
            // Add more formatters as needed.
            // See: http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx
            /**
            Allows you to look up a formatter based on a format string.
            */
            utils.DateFormatters = {
                "d": function (date) {
                    return date.getDate() + "";
                },
                "dd": function (date) {
                    return _zeroPadFront(date.getDate(), 2);
                },
                "f": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 1, false);
                },
                "ff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 2, false);
                },
                "fff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 3, false);
                },
                "ffff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 4, false);
                },
                "fffff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 5, false);
                },
                "ffffff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 6, false);
                },
                "fffffff": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 7, false);
                },
                "F": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 1, true);
                },
                "FF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 2, true);
                },
                "FFF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 3, true);
                },
                "FFFF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 4, true);
                },
                "FFFFF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 5, true);
                },
                "FFFFFF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 6, true);
                },
                "FFFFFFF": function (date) {
                    return _asDecimalDigits(date.getMilliseconds() / 1000.0, 7, true);
                },
                "h": function (date) {
                    var hours = date.getHours();
                    if (hours > 12) {
                        hours -= 12;
                    }
                    return _zeroPadFront(hours, 1);
                },
                "hh": function (date) {
                    var hours = date.getHours();
                    if (hours > 12) {
                        hours -= 12;
                    }
                    return _zeroPadFront(hours, 2);
                },
                "H": function (date) {
                    return _zeroPadFront(date.getHours(), 1);
                },
                "HH": function (date) {
                    return _zeroPadFront(date.getHours(), 2);
                },
                "m": function (date) {
                    return _zeroPadFront(date.getMinutes(), 1);
                },
                "mm": function (date) {
                    return _zeroPadFront(date.getMinutes(), 2);
                },
                "M": function (date) {
                    return _zeroPadFront(date.getMonth() + 1, 1);
                },
                "MM": function (date) {
                    return _zeroPadFront(date.getMonth() + 1, 2);
                },
                "s": function (date) {
                    return _zeroPadFront(date.getSeconds(), 1);
                },
                "ss": function (date) {
                    return _zeroPadFront(date.getSeconds(), 2);
                },
                "y": function (date) {
                    return _zeroPadFront(date.getFullYear(), 1);
                },
                "yy": function (date) {
                    return _zeroPadFront(date.getFullYear(), 2);
                },
                "yyy": function (date) {
                    return _zeroPadFront(date.getFullYear(), 3);
                },
                "yyyy": function (date) {
                    return _zeroPadFront(date.getFullYear(), 4);
                },
                "yyyyy": function (date) {
                    return _zeroPadFront(date.getFullYear(), 5);
                }
            };
            // Adds zeros in front of a string to ensure that it becomes the specified length.
            // If the input is already equal to or greater than the specified digits in length,
            // then the input is untouched and simply returned (as a string).
            // e.g. _zeroPadFront(35, 1) -> "35"
            // e.g. _zeroPadFront(35, 2) -> "35"
            // e.g. _zeroPadFront(35, 3) -> "350"
            var _zeroPadFront = function (input, digits) {
                input = input + "";
                var digitsToPad = digits - input.length;
                var padding = [];
                while (padding.length < digitsToPad) {
                    padding.push("0");
                }
                var result = padding.join("") + input;
                return result;
            };
            // For a given decimal number, ensures that it has the specified number of digits
            // precisely. Will be truncated (not rounded) if necessary.
            // e.g. _asDecimalDigits(.617, 1, false) -> "6"
            // e.g. _asDecimalDigits(.6, 2, false) -> "60"
            // e.g. _asDecimalDigits(.617, 2, false) -> "61"
            // e.g. _asDecimalDigits(.617, 3, false) -> "617"
            // e.g. _asDecimalDigits(.617, 3, true) -> "617"
            // e.g. _asDecimalDigits(.005, 3, true) -> "005"
            // e.g. _asDecimalDigits(.0005, 3, true) -> ""
            var _asDecimalDigits = function (input, digits, truncateTrailingZeros) {
                var decimal = Math.floor(input * Math.pow(10, digits));
                var frontPadded = _zeroPadFront(decimal, digits);
                var result = truncateTrailingZeros ? _truncateTrailingZeros(frontPadded) : frontPadded;
                return result;
            };
            var _truncateTrailingZeros = function (input) {
                input = input + "";
                return input.replace(/0*$/g, "");
            };
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var framework;
    (function (framework) {
        var utils;
        (function (utils) {
            var Tuple = (function () {
                function Tuple(item1, item2, item3, item4, item5) {
                    this.item1 = null;
                    this.item2 = null;
                    this.item3 = null;
                    this.item4 = null;
                    this.item5 = null;
                    this.item1 = item1;
                    this.item2 = item2;
                    if (item3 != null && typeof item3 !== "undefined") {
                        this.item3 = item3;
                    }
                    if (item4 != null && typeof item4 !== "undefined") {
                        this.item4 = item4;
                    }
                    if (item5 != null && typeof item5 !== "undefined") {
                        this.item5 = item5;
                    }
                }
                Tuple.equals = function (a, b) {
                    if (a === null) {
                        return b === null;
                    }
                    if (a.item1 !== b.item1) {
                        return false;
                    }
                    if (a.item2 !== b.item2) {
                        return false;
                    }
                    if (a.item3 !== b.item3) {
                        return false;
                    }
                    if (a.item4 !== b.item4) {
                        return false;
                    }
                    if (a.item5 !== b.item5) {
                        return false;
                    }
                    return true;
                };
                Tuple.compare = function (a, b) {
                    var _compare = function (x, y) {
                        if (x === null) {
                            return (y === null) ? 0 : -1;
                        }
                        if (x === y) {
                            return 0;
                        }
                        return (x > y) ? 1 : -1;
                    };
                    return _compare(a.item1, b.item1) || _compare(a.item2, b.item2) || _compare(a.item3, b.item3) || _compare(a.item4, b.item4) || _compare(a.item5, b.item5);
                };
                return Tuple;
            }());
            utils.Tuple = Tuple;
        })(utils = framework.utils || (framework.utils = {}));
    })(framework = geocortex.framework || (geocortex.framework = {}));
})(geocortex || (geocortex = {}));

/* End Script: Framework/framework_ts_out.js ------------------------- */ 

//# sourceMappingURL=framework_ts_out.js.map
