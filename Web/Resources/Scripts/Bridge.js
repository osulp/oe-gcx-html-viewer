var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var MessageBroker = (function () {
                function MessageBroker(transport) {
                    var _this = this;
                    this.onReady = function (message) { };
                    this._isReady = false;
                    this._queuedMessages = [];
                    this._messageSubscriptions = {};
                    this._messageHandlers = {};
                    this._transport = transport;
                    this._transport.onMessage = function (msg) { return _this._handleMessageFromHub(msg); };
                }
                MessageBroker.prototype.getComponentId = function () {
                    return this._componentId;
                };
                MessageBroker.prototype.getTransport = function () {
                    return this._transport;
                };
                MessageBroker.prototype.connect = function (payload) {
                    if (payload === void 0) { payload = null; }
                    var msg = {
                        messageName: integration.protocol.HandshakeRequest,
                        payload: payload
                    };
                    this._transport.send(msg);
                };
                MessageBroker.prototype.disconnect = function (payload) {
                    if (payload === void 0) { payload = null; }
                    var msg = {
                        componentId: this._componentId,
                        messageName: integration.protocol.RemoteDisconnect,
                        payload: payload
                    };
                    this._sendMessage(msg);
                };
                MessageBroker.prototype.on = function (messageName, impl, options) {
                    if (options === void 0) { options = {}; }
                    var token = Math.random().toString(36).slice(2);
                    var handlers = this._messageHandlers[messageName] || (this._messageHandlers[messageName] = []);
                    handlers.push({
                        subscriptionToken: token,
                        impl: impl,
                        options: options
                    });
                    if (!this._messageSubscriptions[messageName]) {
                        this._messageSubscriptions[messageName] = true;
                        var msg = {
                            componentId: this._componentId,
                            messageName: integration.protocol.RemoteSubscribe,
                            commandOrEventName: messageName,
                            payload: null
                        };
                        this._sendMessage(msg);
                    }
                    return token;
                };
                MessageBroker.prototype.off = function (messageName, token) {
                    if (!messageName) {
                        console.error("Must specify event or command name");
                        return;
                    }
                    if (!token) {
                        console.error("Must specify event or command subscription token");
                        return;
                    }
                    var handler = this._messageHandlers[messageName];
                    if (!handler) {
                        return;
                    }
                    var subIndex = -1;
                    for (var i = 0; i < handler.length; i++) {
                        var sub = handler[i];
                        if (sub.subscriptionToken === token) {
                            subIndex = i;
                            break;
                        }
                    }
                    if (subIndex === -1) {
                        console.error("Couldn't find event or command subscription by token");
                        return;
                    }
                    var subscription = handler[subIndex];
                    handler.splice(subIndex, 1);
                    if (handler.length === 0) {
                        delete this._messageSubscriptions[messageName];
                        var msg = {
                            componentId: this._componentId,
                            messageName: integration.protocol.RemoteUnsubscribe,
                            commandOrEventName: messageName,
                            payload: null
                        };
                        this._sendMessage(msg);
                    }
                };
                MessageBroker.prototype.publish = function (commandOrEventName, payload) {
                    var msg = {
                        componentId: this._componentId,
                        messageName: integration.protocol.RemotePublish,
                        commandOrEventName: commandOrEventName,
                        payload: payload
                    };
                    this._sendMessage(msg);
                };
                MessageBroker.prototype.once = function (messageName, impl) {
                    var _this = this;
                    var token;
                    var callback = function (args) {
                        _this.off(messageName, token);
                        impl(args);
                    };
                    token = this.on(messageName, callback, { once: true });
                    return token;
                };
                MessageBroker.prototype._sendMessage = function (message) {
                    if (!this._isReady) {
                        this._queueMessage(message);
                        return;
                    }
                    this._transport.send(message);
                };
                MessageBroker.prototype._queueMessage = function (message) {
                    this._queuedMessages.push(message);
                };
                MessageBroker.prototype._handleMessageFromHub = function (message) {
                    var handlers = null;
                    switch (message.messageName) {
                        case integration.protocol.HandshakeResponse:
                            this._componentId = message.componentId;
                            this._isReady = true;
                            try {
                                this._dispatchQueuedMessages();
                            }
                            finally {
                                this.onReady(message);
                            }
                            break;
                        case integration.protocol.RemotePublish:
                            this._dispatchCommandOrEvent(message);
                            break;
                    }
                    return;
                };
                MessageBroker.prototype._dispatchQueuedMessages = function () {
                    var _this = this;
                    try {
                        this._queuedMessages.forEach(function (msg) {
                            msg.componentId = _this._componentId;
                            _this._transport.send(msg);
                        });
                    }
                    finally {
                        this._queuedMessages = [];
                    }
                };
                MessageBroker.prototype._dispatchCommandOrEvent = function (message) {
                    var _this = this;
                    var handlers = null;
                    var commandOrEventName = message.commandOrEventName;
                    var commandOrEventArg = message.payload;
                    handlers = this._messageHandlers[commandOrEventName];
                    if (!handlers || !handlers.length) {
                        return null;
                    }
                    handlers.slice(0).forEach(function (handler, index) {
                        try {
                            handler.impl(message.payload);
                        }
                        catch (error) {
                            console.error("Unhandled exception handling message '" + commandOrEventName + "': " + error);
                        }
                        finally {
                            if (handler.options && handler.options.once) {
                                _this._messageHandlers[commandOrEventName].splice(index, 1);
                            }
                        }
                    });
                    if (this._messageHandlers[commandOrEventName].length === 0) {
                        var msg = {
                            componentId: this._componentId,
                            messageName: integration.protocol.RemoteUnsubscribe,
                            commandOrEventName: commandOrEventName
                        };
                        this._sendMessage(msg);
                    }
                };
                return MessageBroker;
            }());
            integration.MessageBroker = MessageBroker;
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var PostMessageTransport = (function () {
                function PostMessageTransport(input, output, name) {
                    if (name === void 0) { name = "PostMessageBridge"; }
                    var _this = this;
                    this.onMessage = function (payload) { };
                    this._originsAllowed = {};
                    this._targetOrigin = "*";
                    this._messageHandler = function (message) { return _this._handleMessage(message); };
                    this._name = name;
                    this.attach(input, output);
                }
                PostMessageTransport.prototype.attach = function (input, output) {
                    this._input = input;
                    this._output = output;
                    if (this._input) {
                        if (this._input.addEventListener) {
                            this._input.addEventListener("message", this._messageHandler, false);
                        }
                        else {
                            this._input.attachEvent("message", this._messageHandler);
                        }
                    }
                };
                PostMessageTransport.prototype.detach = function () {
                    if (this._input) {
                        if (this._input.removeEventListener) {
                            this._input.removeEventListener("message", this._messageHandler);
                        }
                        else {
                            this._input.detachEvent("message", this._messageHandler);
                        }
                        this._input = null;
                    }
                };
                PostMessageTransport.prototype.allowOrigin = function (origin) {
                    this._originsAllowed[origin] = true;
                };
                PostMessageTransport.prototype.setTargetOrigin = function (origin) {
                    this._targetOrigin = origin;
                };
                PostMessageTransport.prototype.send = function (message) {
                    return this._sendMessage(message);
                };
                PostMessageTransport.prototype._sendMessage = function (message) {
                    if (!this._output) {
                        throw new Error("Tried to send a message over a transport with no output.");
                    }
                    if (message.payload && typeof message.payload.toJson === "function") {
                        try {
                            message.payload = message.payload.toJson();
                        }
                        catch (error) {
                            console.warn("Error invoking payload's toJson() method", error);
                        }
                    }
                    try {
                        this._output.postMessage(JSON.stringify(message), this._targetOrigin);
                        return {
                            token: "",
                            promise: null
                        };
                    }
                    catch (error) {
                        console.error("Message not sent - could not serialize to JSON", error);
                        return null;
                    }
                };
                PostMessageTransport.prototype._handleMessage = function (message) {
                    if (!message || !message.data || typeof message.data !== "string") {
                        return;
                    }
                    if (!this._originsAllowed[message.origin]) {
                        return;
                    }
                    try {
                        var messageObj = JSON.parse(message.data);
                    }
                    catch (err) {
                        console.log("Message received and ignored - could not deserialize from JSON: " + err);
                        return;
                    }
                    try {
                        this.onMessage(messageObj);
                    }
                    catch (err) {
                        console.error("Unhandled exception handling bridge message: " + err);
                    }
                };
                return PostMessageTransport;
            }());
            integration.PostMessageTransport = PostMessageTransport;
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var protocol;
            (function (protocol) {
                protocol.HandshakeRequest = "bridge.handshake.req";
                protocol.HandshakeResponse = "bridge.handshake.resp";
                protocol.RemoteSubscribe = "bridge.remote.subscribe";
                protocol.RemotePublish = "bridge.remote.publish";
                protocol.RemoteUnsubscribe = "bridge.remote.unsubscribe";
                protocol.RemoteDisconnect = "bridge.remote.disconnect";
            })(protocol = integration.protocol || (integration.protocol = {}));
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var essentialsHtmlViewer;
    (function (essentialsHtmlViewer) {
        var integration;
        (function (integration) {
            var RemotePostMessageComponent = (function (_super) {
                __extends(RemotePostMessageComponent, _super);
                function RemotePostMessageComponent() {
                    return _super.call(this, new integration.PostMessageTransport(window, window.opener || window.parent, name)) || this;
                }
                return RemotePostMessageComponent;
            }(integration.MessageBroker));
            integration.RemotePostMessageComponent = RemotePostMessageComponent;
        })(integration = essentialsHtmlViewer.integration || (essentialsHtmlViewer.integration = {}));
    })(essentialsHtmlViewer = geocortex.essentialsHtmlViewer || (geocortex.essentialsHtmlViewer = {}));
})(geocortex || (geocortex = {}));
