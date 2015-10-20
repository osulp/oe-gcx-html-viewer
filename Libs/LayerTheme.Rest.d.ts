// Layer Theme rest endpoint type definitions

interface RestProperty {
    name: string;
    value: {};
}

interface RestExtension {
    className: string;
    instance: {};
}

// Type definitions for layer list themes

interface RestlayerThemeSetting {
    themeID: string;
    visible?: boolean;
    initiallyVisible?: boolean;
}

interface RestLayerTheme {
    id: string;
    displayName: string;
    properties?: RestProperty[];
    extensions?: RestExtension[];
}

interface RestLayerThemesInfo {
    allowDefault: boolean;
    defaultThemeDisplayName: string;
    startupThemeID: string;
    items: RestLayerTheme[];
}