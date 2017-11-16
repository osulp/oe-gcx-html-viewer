// Type definitions for XSockets.NET 3.0
// Project: http://xsockets.net/
// Definitions by: Jeffery Grajkowski <https://github.com/pushplay>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module XSockets {
    export class WebSocket {
        id: string;
        constructor(url: string, subprotocol?: string, settings?: any);
        on(event: string, handler: (data: any) => void, confirmation?: (arg: ConfirmationArgument) => void): void;
        bind(event: string, handler: (data: any) => void, confirmation?: (arg: ConfirmationArgument) => void): void;
        subscribe(event: string, handler: (data: any) => void, confirmation?: (arg: ConfirmationArgument) => void): void;
        one(event: string, handler: (data: any) => void, confirmation?: (arg: ConfirmationArgument) => void): void;
        many(event: string, times: number, handler: (data: any) => void, confirmation?: (arg: ConfirmationArgument) => void): void;
        unbind(event: string, confirmation?: (arg: ConfirmationArgument) => void): void;
        unsubscribe(event: string, confirmation?: (arg: ConfirmationArgument) => void): void;
        publish(topic: string, data: any, confirmation?: (arg: ConfirmationArgument) => void): void;
        trigger(topic: string, data: any, confirmation?: (arg: ConfirmationArgument) => void): void;
        readyState(): number;
    }
    export interface ConfirmationArgument {
        event: string;
    }
    export module Events {
        export var close: string;
        export var onBlob: string;
        export var onError: string;
        export module bindings {
            export var completed: string;
        }
        export var open: string;
        export module pubSub {
            export var subscribe: string;
            export var unsubscribe: string;
        }
        export module storage {
            export var get: string;
            export var getAll: string;
            export var remove: string;
            export var set: string;
        }
    }
}
