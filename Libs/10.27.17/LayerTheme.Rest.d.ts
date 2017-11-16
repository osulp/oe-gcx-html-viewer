// Layer Theme rest endpoint type definitions

/** @docs-hide-from-nav */
interface RestProperty {
    name: string;
    value: {};
}

/** @docs-hide-from-nav */
interface RestExtension {
    className: string;
    instance: {};
}

// Type definitions for layer list themes

/** @docs-hide-from-nav */
interface RestlayerThemeSetting {
    themeID: string;
    visible?: boolean;
    initiallyVisible?: boolean;
}

/** @docs-hide-from-nav */
interface RestLayerTheme {
    id: string;
    displayName: string;
    properties?: RestProperty[];
    extensions?: RestExtension[];
}

/** @docs-hide-from-nav */
interface RestLayerThemesInfo {
    allowDefault: boolean;
    defaultThemeDisplayName: string;
    startupThemeID: string;
    items: RestLayerTheme[];
}
