var esriBase = "//js.arcgis.com/3.31/dojo/";
if ("geocortexUseLocalEsriApi" in window && geocortexUseLocalEsriApi === true) {
    esriBase = "Resources/Scripts/dojo/";
}

// GVH-14502
// require() seems to fail sometimes on IE9 even though the resource is loaded in require.cache
// We will now disable dojo AMD loading on IE9
var ie9Div = document.createElement("div");
ie9Div.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
var isIE9 = ie9Div.getElementsByTagName("i").length === 1;

var dojoConfig = {
    async: isIE9 ? false : true,
    isDebug: false,
    baseUrl: "./",
    tlmSiblingOfDojo: false,
    deps: [],
    paths: {
        "Mapping/modules": "Resources/Compiled",
        "Viewer/Resources/Scripts/@geocortex": "Resources/Scripts/@geocortex"
    },
    map: {
        "*": {
            "Mapping/modules/CompactToolbar": "Mapping/modules/Toolbar",
            "Mapping/modules/TabbedToolbar": "Mapping/modules/Toolbar"
        }
    },
    packages: [
        {
            location: esriBase + "../dijit",
            name: "dijit"
        },
        {
            location: esriBase + "../dojox",
            name: "dojox"
        },
        {
            location: esriBase + "../put-selector",
            main: "put",
            name: "put-selector"
        },
        {
            location: esriBase + "../xstyle",
            name: "xstyle"
        },
        {
            location: esriBase + "../dgrid",
            main: "OnDemandGrid",
            name: "dgrid"
        },
        {
            location: esriBase + "../dgrid1",
            main: "OnDemandGrid",
            name: "dgrid1"
        },
        {
            location: esriBase + "../dstore",
            main: "Store",
            name: "dstore"
        },
        {
            location: esriBase + "../moment",
            main: "moment",
            name: "moment"
        },
        {
            location: esriBase + "../esri",
            name: "esri"
        },
        {
            location: esriBase + "../dojo",
            name: "dojo"
        },
        {
            location: "Resources/Scripts",
            name: "pica",
            main: "pica"
        },
        {
            location: "Resources/Scripts",
            name: "react",
            main: "react.min"
        },
        {
            location: "Resources/Scripts",
            name: "React",
            main: "react.min"
        },
        {
            location: "Resources/Scripts",
            name: "ReactDOM",
            main: "react-dom.min"
        },
        {
            location: "Resources/Scripts",
            name: "react-dom",
            main: "react-dom.min"
        },
        {
            location: "Resources/Scripts",
            name: "fixed-data-table-2",
            main: "fixed-data-table.min"
        },
        {
            location: "Resources/Scripts",
            name: "react-virtualized",
            main: "react-virtualized.min"
        }],
    callback: function () {
        var originalRequire = require;
        var originalRequest;

        require = function () {
            if (arguments.length > 0 && arguments[0].hasOwnProperty('cache') && arguments[0].cache.hasOwnProperty('esri/request')) {
                originalRequest = arguments[0].cache['esri/request'];
                arguments[0].cache['esri/request'] = replacedRequestModuleGenerator;
                require = originalRequire;
            }

            originalRequire.apply(window, arguments);
        };

        function replacedRequestModuleGenerator() {
            var originalDefine = define;
            define = function (requestDependencies, requestDefinition) {
                definedThis = this;
                define = originalDefine;
                define(requestDependencies, replacedRequestModule);

                function replacedRequestModule() {
                    requestBase = requestDefinition.apply(definedThis, arguments);

                    if (!esri.request) {
                        esri.request = requestBase;
                    }

                    return function () {
                        return esri.request.apply(this, arguments);
                    }
                }
            };
            originalRequest.apply(this, arguments);
        }
    }
};

// Clean up global scope
ie9Div = undefined;
isIE9 = undefined;
