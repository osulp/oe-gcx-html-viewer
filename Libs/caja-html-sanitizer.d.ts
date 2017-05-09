
declare module html4 {
    export var ATTRIBS: { [selector: string]: number };

    export enum ltypes {
        DATA,
        SANDBOXED,
        UNSANDBOXED
    }
    export enum ueffects {
        NOT_LOADED,
        SAME_DOCUMENT,
        NEW_DOCUMENT
    }
}

/**
 * Caja was not written in TypeScript.
 * These interface definitions have been fabricated to help fortify usage of Caja within TypeScript.
 */
declare module CajaTyping {
    interface UriHintsBase {
        TYPE: string;
    }
    export interface XmlUriHints extends UriHintsBase {
        XML_TAG: string;
        XML_ATTR: string;
    }
    export interface CssUriHints extends UriHintsBase {
        CSS_PROP: string;
    }
    export type UriHints = XmlUriHints|CssUriHints;

    type UriTransformer = (uri: string, ueffect: html4.ueffects, ltype: html4.ltypes, hints: UriHints) => string;
    type TokenTransformer = (token: string, ...rest: any[]) => string;
    type Logger = (...rest: any[]) => void;

    export type Sanitizer = (
        inputHtml: string,
        uriTransformer?: UriTransformer,
        tokenTransformer?: TokenTransformer,
        logger?: Logger
    ) => string;
}

declare module html {
    export var sanitize: CajaTyping.Sanitizer;
    export function makeTagPolicy(
        uriTransformer?: CajaTyping.UriTransformer,
        tokenTransformer?: CajaTyping.TokenTransformer,
        logger?: CajaTyping.Logger
    );
}

declare var html_sanitize: CajaTyping.Sanitizer;
