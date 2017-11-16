/// <reference path="../_Definitions/bluebird.d.ts" />
declare module geocortex.essentialsHtmlViewer.integration {
    class MessageBroker<T extends MessageTransport<any, any>> {
        onReady: (message: protocol.HandshakeResponse) => void;
        protected _transport: T;
        protected _isReady: boolean;
        protected _queuedMessages: protocol.Message<any>[];
        protected _componentId: string;
        protected _frameElement: HTMLIFrameElement;
        protected _messageSubscriptions: {};
        protected _messageHandlers: {
            [name: string]: MessageHandler[];
        };
        constructor(transport: T);
        getComponentId(): string;
        getTransport(): T;
        connect(payload?: any): void;
        disconnect(payload?: any): void;
        on(messageName: string, impl: (...args: any[]) => void, options?: any): string;
        publish(commandOrEventName: string, payload: any): void;
        once(messageName: string, impl: (...args: any[]) => void): string;
        protected _queueMessage(message: protocol.Message<any>): void;
        protected _handleMessageFromHub(message: protocol.Message<any>): void;
        protected _dispatchQueuedMessages(): void;
        protected _dispatchCommandOrEvent(message: protocol.RemotePublishMessage): void;
    }
}
declare module geocortex.essentialsHtmlViewer.integration {
    interface MessageHandler {
        impl: (param: any) => void;
        subscriptionToken: string;
        options?: any;
    }
}
declare module geocortex.essentialsHtmlViewer.integration {
    interface MessageSink {
        postMessage(message: any, targetOrigin: string, ports?: any): void;
        addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
        addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
        attachEvent?(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
        detachEvent?(type: "message", callback: (ev: MessageEvent) => any): void;
        addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
        removeEventListener(eventType: string, callback: (ev: any) => any): void;
        attachEvent?(type: string, listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
        detachEvent?(eventType: string, callback: (ev: any) => any): void;
    }
}
declare module geocortex.essentialsHtmlViewer.integration {
    interface MessageReceipt<T extends protocol.Message<any>> {
        promise: Promise<T>;
        token: string;
    }
    interface MessageTransport<T, U> {
        onMessage(payload: protocol.Message<any>): void;
        send<T extends protocol.Message<any>>(message: T): MessageReceipt<T>;
        attach(input: T, output: U): void;
        detach(): void;
    }
    class PostMessageTransport implements MessageTransport<Window, MessageSink> {
        onMessage: (payload: protocol.Message<any>) => void;
        protected _output: MessageSink;
        protected _input: MessageSink;
        protected _name: string;
        protected _originsAllowed: {
            [origin: string]: boolean;
        };
        protected _targetOrigin: string;
        protected _messageHandler: (message: any) => void;
        constructor(input: Window, output: MessageSink, name?: string);
        attach(input: MessageSink, output: MessageSink): void;
        detach(): void;
        allowOrigin(origin: string): void;
        setTargetOrigin(origin: string): void;
        send<T extends protocol.Message<any>>(message: T): MessageReceipt<protocol.Message<any>>;
        protected _sendMessage(message: protocol.Message<any>): MessageReceipt<protocol.Message<any>>;
        protected _handleMessage(message: MessageEvent): void;
    }
}
declare module geocortex.essentialsHtmlViewer.integration.protocol {
    var HandshakeRequest: string;
    var HandshakeResponse: string;
    var RemoteSubscribe: string;
    var RemotePublish: string;
    var RemoteUnsubscribe: string;
    var RemoteDisconnect: string;
    interface Message<T> {
        messageName: string;
        componentId?: string;
        id?: string;
        flags?: number;
        payload?: T;
    }
    interface HandshakeRequest extends Message<string> {
    }
    interface HandshakeResponse extends Message<string> {
    }
    interface RemoteDisconnectMessage extends Message<any> {
    }
    interface CommandOrEventMessage extends Message<any> {
        commandOrEventName: string;
    }
    interface RemoteSubscribeMessage extends CommandOrEventMessage {
    }
    interface RemotePublishMessage extends CommandOrEventMessage {
    }
    interface RemoteUnsubscribeMessage extends CommandOrEventMessage {
    }
}
declare module geocortex.essentialsHtmlViewer.integration {
    class RemotePostMessageComponent extends MessageBroker<PostMessageTransport> {
        constructor();
    }
}
