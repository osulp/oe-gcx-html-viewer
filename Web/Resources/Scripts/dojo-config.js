var dojoConfig = {
    deps: [],
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