
/**
 * Represents AWAB's BaseWidget.
 */
interface IBaseWidget {
    hasStyle: boolean;
    hasUIFile: boolean;
    hasLocale: boolean;
    hasConfig: boolean
    name: string;
    baseClass: string;

    // this.map
    // this.appConfig
    // this.position
} 

declare module "geocortex/Essentials.js" {
    var nothing;
    export = nothing;
}