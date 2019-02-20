/**
 * Base class for custom errors.
 * Copied from the Geocortex TS API.
 */
export interface ErrorBaseConstructor {
    prototype: Error;
    new (message?: string): Error;
}
/**
 * Base class for custom errors.
 */
export declare const ErrorBase: ErrorBaseConstructor;
