
// Module 'OE_Hopscotch'
        (function () {
var markup1 = '<div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Hopscotch/OE_HopscotchModule": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/application/ModuleBase"], function (require, exports, ModuleBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_HopscotchModule = /** @class */ (function (_super) {
        __extends(OE_HopscotchModule, _super);
        function OE_HopscotchModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_HopscotchModule.prototype.initialize = function (config) {
            var _this = this;
            var thisViewModel = this;
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel);
                });
            }
        };
        OE_HopscotchModule.prototype._onSiteInitialized = function (site, thisViewModel) {
        };
        return OE_HopscotchModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_HopscotchModule = OE_HopscotchModule;
});

},
"geocortex/oe_amd/OE_Hopscotch/OE_HopscotchView": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_HopscotchView = /** @class */ (function (_super) {
        __extends(OE_HopscotchView, _super);
        function OE_HopscotchView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return OE_HopscotchView;
    }(ViewBase_1.ViewBase));
    exports.OE_HopscotchView = OE_HopscotchView;
});

},
"geocortex/oe_amd/OE_Hopscotch/OE_HopscotchViewModel": function () {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "geocortex/framework/ui/ViewModelBase"], function (require, exports, ViewModelBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_HopscotchViewModel = /** @class */ (function (_super) {
        __extends(OE_HopscotchViewModel, _super);
        //searchFieldText: Observable<string> = new Observable<string>("");    
        //resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);    
        function OE_HopscotchViewModel(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_HopscotchViewModel.prototype.initialize = function (config) {
            var _this = this;
            this.site = this.app.site;
            this.thisViewModel = this;
            //this.tourJson = config.tourLayers;
            this.toursKeyValObject = {};
            //load tours into string reference object
            if (config.hasOwnProperty("tours")) {
                for (var i = 0; i < config.tours.length; i++) {
                    this.toursKeyValObject[config.tours[i].key] = config.tours[i];
                }
            }
            if (this.site && this.site.isInitialized) {
                this._onSiteInitialized(config);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(config);
                });
            }
        };
        OE_HopscotchViewModel.prototype._onSiteInitialized = function (config) {
            this._injectScript();
            //register tagging command
            this.app.commandRegistry.command("oeStartTour").register(this, this._startTour);
        };
        OE_HopscotchViewModel.prototype._startTour = function (args) {
            this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
            this.hopscotch.endTour();
            var currentScope = this;
            if (this.hopscotch && this.toursKeyValObject.hasOwnProperty(args)) {
                if (this.toursKeyValObject[args].hasOwnProperty("requiredView") && this.toursKeyValObject[args].requiredView)
                    this.app.command("ActivateView").execute(this.toursKeyValObject[args].requiredView);
                if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourStart") && this.toursKeyValObject[args].commandOnTourStart) {
                    var commands = this.toursKeyValObject[args].commandOnTourStart.split(",");
                    var commandParams = null;
                    if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourStartParam") && this.toursKeyValObject[args].commandOnTourStartParam)
                        commandParams = this.toursKeyValObject[args].commandOnTourStartParam.split(",");
                    for (var i = 0; i < commands.length; i++) {
                        if (commandParams != null && i < commandParams.length)
                            this.app.command(commands[i]).execute(commandParams[i]);
                        else
                            this.app.command(commands[i]).execute("");
                        if (commands[i] == "OpenAndFocusIWantToMenu") {
                            var elements = document.getElementsByClassName("IWantToMenuView");
                            elements[0].firstChild.scrollTop = 0;
                        }
                    }
                    //this.app.command(this.toursKeyValObject[args].commandOnTourStart).execute(this.toursKeyValObject[args].commandOnTourStartParam);
                }
                if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourEnd") && this.toursKeyValObject[args].commandOnTourEnd) {
                    this.toursKeyValObject[args].tour.onEnd = function () { currentScope.CheckOnEventCommand(currentScope, "commandOnTourEnd", "commandOnTourEndParam"); };
                }
                if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourClose") && this.toursKeyValObject[args].commandOnTourClose) {
                    this.toursKeyValObject[args].tour.onClose = function () { currentScope.CheckOnEventCommand(currentScope, "commandOnTourClose", "commandOnTourCloseParam"); };
                }
                for (var i = 0; i < this.toursKeyValObject[args].tour.steps.length; i++) {
                    if (this.toursKeyValObject[args].tour.steps[i].hasOwnProperty("commandOnShow") && this.toursKeyValObject[args].tour.steps[i].commandOnShow) {
                        this.toursKeyValObject[args].tour.steps[i].onShow = function () { currentScope.CheckOnEventCommand(currentScope, "commandOnShow", "commandOnShowParam"); };
                    }
                    if (this.toursKeyValObject[args].tour.steps[i].hasOwnProperty("runWorkflowById")) {
                        this.toursKeyValObject[args].tour.steps[i].onShow = function () { currentScope.CheckOnEventWorkflow(currentScope); };
                    }
                }
                if (this.toursKeyValObject[args].hasOwnProperty("startTourDelay") && this.toursKeyValObject[args].startTourDelay) {
                    setTimeout(function () {
                        this.hopscotch.startTour(currentScope.toursKeyValObject[args].tour);
                    }, currentScope.toursKeyValObject[args].startTourDelay);
                }
                else {
                    this.hopscotch.startTour(this.toursKeyValObject[args].tour);
                }
            }
        };
        OE_HopscotchViewModel.prototype.CheckOnEventCommand = function (currentScope, commandName, commandParamName) {
            var cTour = currentScope.hopscotch.getCurrTour();
            var currStepNum = currentScope.hopscotch.getCurrStepNum();
            var cStep = cTour.steps[currStepNum];
            if (cStep.commandDoIfHidden && currentScope.IsClassVisisble(cStep.commandDoIfHidden)) {
                return;
            }
            if (cStep[commandParamName])
                currentScope.app.command(cStep[commandName]).execute(cStep[commandParamName]);
            else
                currentScope.app.command(cStep[commandName]).execute();
        };
        OE_HopscotchViewModel.prototype.CheckOnEventWorkflow = function (currentScope, commandName, commandParamName) {
            var cTour = currentScope.hopscotch.getCurrTour();
            var currStepNum = currentScope.hopscotch.getCurrStepNum();
            var cStep = cTour.steps[currStepNum];
            if (cStep["runWorkflowById"]) {
                var workflowArgs = {};
                workflowArgs.workflowId = cStep["runWorkflowById"];
                //workflowArgs.mapPointIn = contextIn.mapPointIn;
                this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
            }
        };
        OE_HopscotchViewModel.prototype.IsClassVisisble = function (classPath) {
            console.log(classPath + " visible: " + $(classPath).is(":visible"));
            return $(classPath).is(":visible");
        };
        OE_HopscotchViewModel.prototype._injectScript = function () {
            //jQuery plugin for displaying tour/guide
            //http://linkedin.github.io/hopscotch/
            //https://github.com/LinkedInAttic/hopscotch
            //////////////////////////////////
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/hopscotch-0.1.1.min.js",
                dataType: "script",
                success: function () {
                    console.log('success!');
                },
                error: function (err) {
                    console.log('fail', err);
                }
            });
            //html2canvas
            // http://html2canvas.hertzen.com/
            ////////////////
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/html2canvas.min.js",
                dataType: "script",
                success: function () {
                    console.log('success!');
                },
                error: function (err) {
                    console.log('fail', err);
                }
            });
        };
        return OE_HopscotchViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_HopscotchViewModel = OE_HopscotchViewModel;
});

},
"url:/geocortex/oe_amd/OE_Hopscotch/OE_HopscotchView.html": markup1,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Hopscotch/CSS/hopscotch-0.1.1.css", "css", "LyoqDQogKg0KICogQ29weXJpZ2h0IDIwMTMgTGlua2VkSW4gQ29ycC4gQWxsIHJpZ2h0cyByZXNlcnZlZC4NCg0KICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7DQogKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuDQogKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQNCg0KICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMA0KDQogKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlDQogKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiAiQVMgSVMiIEJBU0lTLA0KICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuDQogKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kDQogKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCiAqLw0KLyoqDQogKiBUaGlzIGZhZGUgYW5pbWF0aW9uIGlzIGJhc2VkIG9uIERhbiBFZGVuJ3MgYW5pbWF0ZS5jc3MgKGh0dHA6Ly9kYW5lZGVuLm1lL2FuaW1hdGUvKSwgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgbGljZW5zZS4NCiAqDQogKiBDb3B5cmlnaHQgMjAxMyBEYW4gRWRlbi4NCiAqDQogKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5DQogKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbA0KICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cw0KICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbA0KICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzDQogKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOg0KICoNCiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluDQogKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4NCiAqDQogKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUg0KICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksDQogKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUNCiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVINCiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sDQogKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElODQogKiBUSEUgU09GVFdBUkUuDQogKi8NCi5hbmltYXRlZCB7DQogIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLW1vei1hbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOw0KICAtbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLW8tYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICAtbW96LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7DQogIC1tcy1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICAtby1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICBhbmltYXRpb24tZHVyYXRpb246IDFzOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJblVwIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJblVwIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1vLWtleWZyYW1lcyBmYWRlSW5VcCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQGtleWZyYW1lcyBmYWRlSW5VcCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KLmZhZGUtaW4tdXAgew0KICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5VcDsNCiAgLW1vei1hbmltYXRpb24tbmFtZTogZmFkZUluVXA7DQogIC1vLWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5VcDsNCiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJblVwOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1vLWtleWZyYW1lcyBmYWRlSW5Eb3duIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOw0KICB9DQp9DQpAa2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpOw0KICB9DQogIDEwMCUgew0KICAgIG9wYWNpdHk6IDE7DQogICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOw0KICB9DQp9DQouZmFkZS1pbi1kb3duIHsNCiAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogZmFkZUluRG93bjsNCiAgLW1vei1hbmltYXRpb24tbmFtZTogZmFkZUluRG93bjsNCiAgLW8tYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkRvd247DQogIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5Eb3duOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJblJpZ2h0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOw0KICB9DQogIDEwMCUgew0KICAgIG9wYWNpdHk6IDE7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCkAtbW96LWtleWZyYW1lcyBmYWRlSW5SaWdodCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOw0KICB9DQp9DQpALW8ta2V5ZnJhbWVzIGZhZGVJblJpZ2h0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KQGtleWZyYW1lcyBmYWRlSW5SaWdodCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCi5mYWRlLWluLXJpZ2h0IHsNCiAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogZmFkZUluUmlnaHQ7DQogIC1tb3otYW5pbWF0aW9uLW5hbWU6IGZhZGVJblJpZ2h0Ow0KICAtby1hbmltYXRpb24tbmFtZTogZmFkZUluUmlnaHQ7DQogIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5SaWdodDsNCn0NCkAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW5MZWZ0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJbkxlZnQgew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOw0KICB9DQp9DQpALW8ta2V5ZnJhbWVzIGZhZGVJbkxlZnQgew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCkBrZXlmcmFtZXMgZmFkZUluTGVmdCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KLmZhZGUtaW4tbGVmdCB7DQogIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnQ7DQogIC1tb3otYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnQ7DQogIC1vLWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5MZWZ0Ow0KICBhbmltYXRpb24tbmFtZTogZmFkZUluTGVmdDsNCn0NCi8qKg0KICoNCiAqIENvcHlyaWdodCAyMDEzIExpbmtlZEluIENvcnAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuDQoNCiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSAiTGljZW5zZSIpOw0KICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLg0KICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0DQoNCiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjANCg0KICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZQ0KICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gIkFTIElTIiBCQVNJUywNCiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLg0KICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZA0KICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuDQogKi8NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbiB7DQogIC8qIGJvcnJvd2VkIGZyb20ga2F0eSBzdHlsZXMgKi8NCg0KICBmb250LXdlaWdodDogYm9sZDsNCiAgYm9yZGVyLXdpZHRoOiAxcHg7DQogIGJvcmRlci1zdHlsZTogc29saWQ7DQogIGN1cnNvcjogcG9pbnRlcjsNCiAgbWFyZ2luOiAwOw0KICBvdmVyZmxvdzogdmlzaWJsZTsNCiAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7DQogIHdpZHRoOiBhdXRvOw0KICBwYWRkaW5nOiAwIDEwcHg7DQogIGhlaWdodDogMjZweDsNCiAgbGluZS1oZWlnaHQ6IDI0cHg7DQogIGZvbnQtc2l6ZTogMTJweDsNCiAgKnpvb206IDE7DQogIHdoaXRlLXNwYWNlOiBub3dyYXA7DQogIGRpc3BsYXk6IC1tb3otaW5saW5lLXN0YWNrOw0KICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICp2ZXJ0aWNhbC1hbGlnbjogYXV0bzsNCiAgem9vbTogMTsNCiAgKmRpc3BsYXk6IGlubGluZTsNCiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgLW1vei1ib3JkZXItcmFkaXVzOiAzcHg7DQogIC1tcy1ib3JkZXItcmFkaXVzOiAzcHg7DQogIC1vLWJvcmRlci1yYWRpdXM6IDNweDsNCiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAzcHg7DQogIGJvcmRlci1yYWRpdXM6IDNweDsNCiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Ow0KICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b246aG92ZXIgew0KICAqem9vbTogMTsNCiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjI1KTsNCiAgLW1vei1ib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjI1KTsNCiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yNSk7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b246YWN0aXZlIHsNCiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI1KSBpbnNldDsNCiAgLW1vei1ib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI1KSBpbnNldDsNCiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSkgaW5zZXQ7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b24ubmV4dCB7DQogIGJvcmRlci1jb2xvcjogIzFiNTQ4MDsNCiAgY29sb3I6ICNmZmY7DQogIG1hcmdpbjogMCAwIDAgMTBweDsNCiAgLyogSFMgc3BlY2lmaWMqLw0KDQogIHRleHQtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM1KTsNCiAgYmFja2dyb3VuZC1jb2xvcjogIzI4N2JiYzsNCiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoZ3JhZGllbnRUeXBlPTAsIHN0YXJ0Q29sb3JzdHI9JyMyODdiYmMnLCBlbmRDb2xvcnN0cj0nIzIzNjM5YScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgIzI4N2JiYyksIGNvbG9yLXN0b3AoMTAwJSwgIzIzNjM5YSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICMyODdiYmMgMCUsICMyMzYzOWEgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbi5uZXh0OmhvdmVyIHsNCiAgYmFja2dyb3VuZC1jb2xvcjogIzI2NzJhZTsNCiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoZ3JhZGllbnRUeXBlPTAsIHN0YXJ0Q29sb3JzdHI9JyMyNjcyYWUnLCBlbmRDb2xvcnN0cj0nIzFlNGY3ZScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgIzI2NzJhZSksIGNvbG9yLXN0b3AoMTAwJSwgIzFlNGY3ZSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICMyNjcyYWUgMCUsICMxZTRmN2UgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbi5wcmV2IHsNCiAgYm9yZGVyLWNvbG9yOiAjYTdhN2E3Ow0KICBjb2xvcjogIzQ0NDsNCiAgdGV4dC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpOw0KICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyOw0KICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChncmFkaWVudFR5cGU9MCwgc3RhcnRDb2xvcnN0cj0nI2YyZjJmMicsIGVuZENvbG9yc3RyPScjZTllOWU5Jyk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCA1MCUgMCUsIDUwJSAxMDAlLCBjb2xvci1zdG9wKDAlLCAjZjJmMmYyKSwgY29sb3Itc3RvcCgxMDAlLCAjZTllOWU5KSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2YyZjJmMiAwJSwgI2U5ZTllOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1uYXYtYnV0dG9uLnByZXY6aG92ZXIgew0KICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4Ow0KICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChncmFkaWVudFR5cGU9MCwgc3RhcnRDb2xvcnN0cj0nI0ZGRThFOEU4JywgZW5kQ29sb3JzdHI9JyNGRkE5QTlBOScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgI2U4ZThlOCksIGNvbG9yLXN0b3AoMTMlLCAjZTNlM2UzKSwgY29sb3Itc3RvcCgzMiUsICNkN2Q3ZDcpLCBjb2xvci1zdG9wKDcxJSwgI2I5YjliOSksIGNvbG9yLXN0b3AoMTAwJSwgI2E5YTlhOSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlOGU4ZTggMCUsICNlM2UzZTMgMTMlLCAjZDdkN2Q3IDMyJSwgI2I5YjliOSA3MSUsICNhOWE5YTkgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIHsNCiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsNCiAgYm9yZGVyOiA1cHggc29saWQgIzAwMDAwMDsNCiAgLyogZGVmYXVsdCAqLw0KDQogIGJvcmRlcjogNXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC41KTsNCiAgLyogdHJhbnNwYXJlbnQsIGlmIHN1cHBvcnRlZCAqLw0KDQogIGNvbG9yOiAjMzMzOw0KICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbDsNCiAgZm9udC1zaXplOiAxM3B4Ow0KICBwb3NpdGlvbjogYWJzb2x1dGU7DQogIHotaW5kZXg6IDk5OTk5OTsNCiAgLW1vei1iYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmc7DQogIC8qIGZvciBNb3ppbGxhIGJyb3dzZXJzKi8NCg0KICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZzsNCiAgLyogV2Via2l0ICovDQoNCiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDsNCiAgLyogIGJyb3dzZXJzIHdpdGggZnVsbCBzdXBwb3J0ICovDQoNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlLmFuaW1hdGUgew0KICAtbW96LXRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgLW1vei10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW1vei10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7DQogIC1tcy10cmFuc2l0aW9uLXByb3BlcnR5OiB0b3AsIGxlZnQ7DQogIC1tcy10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW1zLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsNCiAgLW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTogdG9wLCBsZWZ0Ow0KICAtby10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW8tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0Ow0KICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7DQogIHRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7DQogIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlLmludmlzaWJsZSB7DQogIG9wYWNpdHk6IDA7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZS5oaWRlLA0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhpZGUsDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaGlkZS1hbGwgew0KICBkaXNwbGF5OiBub25lOw0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgaDMgew0KICBjb2xvcjogIzAwMDsNCiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgQXJpYWw7DQogIGZvbnQtc2l6ZTogMTZweDsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogIGxpbmUtaGVpZ2h0OiAxOXB4Ow0KICBtYXJnaW46IC0xcHggMTVweCAwIDA7DQogIHBhZGRpbmc6IDA7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1jb250YWluZXIgew0KICBwYWRkaW5nOiAxNXB4Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIHRleHQtYWxpZ246IGxlZnQ7DQogIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOw0KICAvKiB0byBmaXggdGV4dCBmbGlja2VyaW5nICovDQoNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtY29udGVudCB7DQogIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsOw0KICBmb250LXdlaWdodDogbm9ybWFsOw0KICBsaW5lLWhlaWdodDogMTdweDsNCiAgbWFyZ2luOiAtNXB4IDAgMTFweDsNCiAgcGFkZGluZy10b3A6IDhweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNvbnRlbnQgew0KICBtYXJnaW46IDAgMCAwIDQwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZS5uby1udW1iZXIgLmhvcHNjb3RjaC1idWJibGUtY29udGVudCB7DQogIG1hcmdpbjogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNsb3NlIHsNCiAgY29sb3I6ICMwMDA7DQogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChSZXNvdXJjZXMvSW1hZ2VzL0N1c3RvbS9zcHJpdGUtZ3JlZW4tMC4zLnBuZykgLTE5MnB4IC05MnB4IG5vLXJlcGVhdDsNCiAgZGlzcGxheTogYmxvY2s7DQogIHBhZGRpbmc6IDhweDsNCiAgcG9zaXRpb246IGFic29sdXRlOw0KICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQogIHRleHQtaW5kZW50OiAtOTk5OXB4Ow0KICB3aWR0aDogOHB4Ow0KICBoZWlnaHQ6IDhweDsNCiAgdG9wOiAwOw0KICByaWdodDogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNsb3NlLmhpZGUsDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1jbG9zZS5oaWRlLWFsbCB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1udW1iZXIgew0KICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoUmVzb3VyY2VzL0ltYWdlcy9DdXN0b20vc3ByaXRlLWdyZWVuLTAuMy5wbmcpIDAgMCBuby1yZXBlYXQ7DQogIGNvbG9yOiAjZmZmOw0KICBkaXNwbGF5OiBibG9jazsNCiAgZmxvYXQ6IGxlZnQ7DQogIGZvbnQtc2l6ZTogMTdweDsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogIGxpbmUtaGVpZ2h0OiAzMXB4Ow0KICBwYWRkaW5nOiAwIDEwcHggMCAwOw0KICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogIHdpZHRoOiAzMHB4Ow0KICBoZWlnaHQ6IDMwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgew0KICBwb3NpdGlvbjogYWJzb2x1dGU7DQogIHdpZHRoOiAzNHB4Ow0KICBoZWlnaHQ6IDM0cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgLmhvcHNjb3RjaC1idWJibGUtYXJyb3csDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctYm9yZGVyIHsNCiAgd2lkdGg6IDA7DQogIGhlaWdodDogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci51cCB7DQogIHRvcDogLTIycHg7DQogIGxlZnQ6IDEwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIudXAgLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkICNmZmZmZmY7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgdG9wOiAtMTBweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci51cCAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1ib3JkZXIgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkICMwMDAwMDA7DQogIGJvcmRlci1ib3R0b206IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItbGVmdDogMTdweCBzb2xpZCB0cmFuc3BhcmVudDsNCiAgYm9yZGVyLXJpZ2h0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLmRvd24gew0KICBib3R0b206IC0zOXB4Ow0KICBsZWZ0OiAxMHB4Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLmRvd24gLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkICNmZmZmZmY7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgdG9wOiAtMjRweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci5kb3duIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWJvcmRlciB7DQogIGJvcmRlci10b3A6IDE3cHggc29saWQgIzAwMDAwMDsNCiAgYm9yZGVyLXRvcDogMTdweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNSk7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIubGVmdCB7DQogIHRvcDogMTBweDsNCiAgbGVmdDogLTIycHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIubGVmdCAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdyB7DQogIGJvcmRlci1ib3R0b206IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIGJvcmRlci1yaWdodDogMTdweCBzb2xpZCAjZmZmZmZmOw0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIGxlZnQ6IDdweDsNCiAgdG9wOiAtMzRweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci5sZWZ0IC5ob3BzY290Y2gtYnViYmxlLWFycm93LWJvcmRlciB7DQogIGJvcmRlci1yaWdodDogMTdweCBzb2xpZCAjMDAwMDAwOw0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLnJpZ2h0IHsNCiAgdG9wOiAxMHB4Ow0KICByaWdodDogLTM5cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIucmlnaHQgLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItbGVmdDogMTdweCBzb2xpZCAjZmZmZmZmOw0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIGxlZnQ6IC03cHg7DQogIHRvcDogLTM0cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIucmlnaHQgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctYm9yZGVyIHsNCiAgYm9yZGVyLWxlZnQ6IDE3cHggc29saWQgIzAwMDAwMDsNCiAgYm9yZGVyLWxlZnQ6IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1hY3Rpb25zIHsNCiAgbWFyZ2luOiAxMHB4IDAgMDsNCiAgdGV4dC1hbGlnbjogcmlnaHQ7DQp9DQo=");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Hopscotch/CSS/OE_HopscotchModule.css", "css", "Lm9lTGF5ZXJTZWFyY2gtbW9kdWxlLXZpZXcgew0KICAgIHBvc2l0aW9uOiBpbmhlcml0Ow0KICAgIHotaW5kZXg6IDEwMDsNCiAgICAvKndpZHRoOiA5MDBweDsNCiAgICBwYWRkaW5nOiA2cHg7DQogICAgbWFyZ2luLXRvcDogMTJweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCiAgICBtaW4taGVpZ2h0OiA1NzBweDsNCiAgICBmb250OiAxMnB4IE15cmlhZCxIZWx2ZXRpY2EsVGFob21hLEFyaWFsLGNsZWFuLHNhbnMtc2VyaWY7DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIHJpZ2h0OiAwOyovDQogICAgYmFja2dyb3VuZDogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIGJvcmRlcjogbm9uZTsNCn0NCg0KLm9lTGF5ZXJTZWFyY2hMb2FkaW5nIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAzZW07DQogICAgbGVmdDogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgLypwYWRkaW5nLXRvcDogNTBweDsqLw0KICAgIHotaW5kZXg6IDEwMDA7DQp9DQoNCi5vZUxheWVyU2VhcmNoV2FybmluZ01lc3NhZ2Ugew0KICAgIHBhZGRpbmctdG9wOiAxMHB4Ow0KICAgIGZvbnQtc2l6ZTogMS40ZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi5vZUxheWVyU2VhcmNoRXJyb3JJbnB1dCB7DQogICAgcGFkZGluZy10b3A6IDEycHg7DQp9DQoNCi5vZUxheWVyU2VhcmNoRXJyb3JJbnB1dCBkaXYgew0KICAgIGZvbnQtc2l6ZTogMS4yZW07DQogICAgcGFkZGluZy1ib3R0b206IDE2cHg7DQp9");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Hopscotch/OE_HopscotchView.html", "html", markup1);
});

})();
