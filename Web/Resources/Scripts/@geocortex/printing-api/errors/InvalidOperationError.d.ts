import { ErrorBase } from "./ErrorBase";
/**
 * An error that is thrown when a method call is invalid for the object's current state.
 */
export declare class InvalidOperationError extends ErrorBase {
    /**
     * Initializes a new instance of the {@link InvalidOperationError} class.
     * @param message The error message. If not specified, a default one will be used.
     */
    constructor(message?: string);
}
