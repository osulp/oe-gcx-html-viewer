/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";
import { ObservableCollection } from "geocortex/framework/observables";
import { Site } from "geocortex/essentials/Site";
import { MapService } from "geocortex/essentials/MapService";
import { MapServiceType } from "geocortex/essentials/MapServiceConstants";
import { MapServiceFunction } from "geocortex/essentials/MapServiceConstants";
import { DOMElement } from "react";

export class OE_HopscotchViewModel extends ViewModelBase {

    app: ViewerApplication;    
    site: any;
    thisViewModel: OE_HopscotchViewModel

    hopscotch;        
    toursKeyValObject: any;
        
    //searchFieldText: Observable<string> = new Observable<string>("");    
    //resultsObject: ObservableCollection<object> = new ObservableCollection<object>(null);    
    
    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        this.site = (<any>this).app.site;

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
            this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                this._onSiteInitialized(config);
            });
        }
    }

    _onSiteInitialized(config: any) {
                                
        this._injectScript();

        //register tagging command
        this.app.commandRegistry.command("oeStartTour").register(this, this._startTour);
    }

    _startTour(args:any) {

        this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;

        this.hopscotch.endTour();

        var currentScope: any = this;
        
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
                        var elements: any = document.getElementsByClassName("IWantToMenuView");
                        elements[0].firstChild.scrollTop = 0;
                    }
                }

                //this.app.command(this.toursKeyValObject[args].commandOnTourStart).execute(this.toursKeyValObject[args].commandOnTourStartParam);
            }

            if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourEnd") && this.toursKeyValObject[args].commandOnTourEnd) {
                this.toursKeyValObject[args].tour.onEnd = () => { currentScope.CheckOnEventCommand(currentScope, "commandOnTourEnd", "commandOnTourEndParam") }                
            }

            if (this.toursKeyValObject[args].hasOwnProperty("commandOnTourClose") && this.toursKeyValObject[args].commandOnTourClose) {
                this.toursKeyValObject[args].tour.onClose = () => { currentScope.CheckOnEventCommand(currentScope, "commandOnTourClose", "commandOnTourCloseParam") }                
            }

            for (var i = 0; i < this.toursKeyValObject[args].tour.steps.length; i++) {

                if (this.toursKeyValObject[args].tour.steps[i].hasOwnProperty("commandOnShow") && this.toursKeyValObject[args].tour.steps[i].commandOnShow) {
                    this.toursKeyValObject[args].tour.steps[i].onShow = () => { currentScope.CheckOnEventCommand(currentScope, "commandOnShow", "commandOnShowParam") }
                }

                if (this.toursKeyValObject[args].tour.steps[i].hasOwnProperty("runWorkflowById") ) {
                    this.toursKeyValObject[args].tour.steps[i].onShow = () => { currentScope.CheckOnEventWorkflow(currentScope) }
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
    }

    private CheckOnEventCommand(currentScope:any, commandName:string, commandParamName:string) {
                
        var cTour: any = currentScope.hopscotch.getCurrTour();
        var currStepNum:any = currentScope.hopscotch.getCurrStepNum();
        var cStep: any = cTour.steps[currStepNum];

        if (cStep.commandDoIfHidden && currentScope.IsClassVisisble(cStep.commandDoIfHidden)) {
            return;
        }
                
        if (cStep[commandParamName])
            currentScope.app.command(cStep[commandName]).execute(cStep[commandParamName]);
        else
            currentScope.app.command(cStep[commandName]).execute();
    }

    private CheckOnEventWorkflow(currentScope: any, commandName: string, commandParamName: string) {

        var cTour: any = currentScope.hopscotch.getCurrTour();
        var currStepNum: any = currentScope.hopscotch.getCurrStepNum();
        var cStep: any = cTour.steps[currStepNum];

        if (cStep["runWorkflowById"]) {
            let workflowArgs: any = {};
            workflowArgs.workflowId = cStep["runWorkflowById"];
            //workflowArgs.mapPointIn = contextIn.mapPointIn;
            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
        }
    }

    private IsClassVisisble(classPath:string): boolean {

        console.log(classPath+" visible: " + $(classPath).is(":visible"));
        return $(classPath).is(":visible");
    }
        
    private _injectScript() {

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
    }
    
}