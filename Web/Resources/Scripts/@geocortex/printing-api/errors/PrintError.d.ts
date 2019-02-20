import { ErrorBase } from "./ErrorBase";
/**
 * An error that is thrown when the print operation fails.
 */
export declare class PrintError extends ErrorBase {
    /**
     * Initializes a new instance of the {@link PrintError} class.
     * @param message The error message.
     */
    constructor(message: string);
}
