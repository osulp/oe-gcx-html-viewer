import { ErrorBase } from "./ErrorBase";
/**
 * An error that is thrown when the current user does not have permission to
 * access a resource or perform an operation.
 */
export declare class AccessDeniedError extends ErrorBase {
    /**
     * Initializes a new instance of the {@link AccessDeniedError} class.
     * @param message The error message. If not specified, a default one will be used.
     */
    constructor(message?: string);
}
