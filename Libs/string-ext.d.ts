
/** @private */
interface String {
    format(...args: any[]): string;
    //trim(): string;   // Complains about duplicate definition, not sure why
    ltrim(): string;
    rtrim(): string;
    startsWith(str: string, position?: number): boolean;
    endsWith(str: string, position?: number): boolean;
    isNullOrEmpty(str: string): boolean;
}

/**
 * Extensions to `String` (not on the prototype, but the constructor itself).
 * @private
 */
interface StringConstructor {
    escapeHtml(input: string): string;
    escapeHtmlEncode(input: string): string;
    unescapeHtml(input: string): string;
    isNullOrEmpty(input: string): boolean;
    format(formatStr: string, ...args: any[]): string;
    quickHashCode(str: string): number;
}
