import { ErrorBase } from "./ErrorBase";
/**
 * An error that is thrown when a fetch call fails. A fetch will only
 * throw when a network error occurs.
 */
export declare class NetworkError extends ErrorBase {
    /**
     * Initializes a new instance of the {@link NetworkError} class.
     * @param message The error message. If not specified, a default one will be used.
     */
    constructor(message?: string);
}
