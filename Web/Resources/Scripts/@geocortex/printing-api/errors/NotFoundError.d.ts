import { ErrorBase } from "./ErrorBase";
/**
 * An error that is thrown when a requested resource could not be found.
 */
export declare class NotFoundError extends ErrorBase {
    /**
     * Initializes a new instance of the {@link NotFoundError} class.
     * @param message The error message. If not specified, a default one will be used.
     */
    constructor(message?: string);
}
