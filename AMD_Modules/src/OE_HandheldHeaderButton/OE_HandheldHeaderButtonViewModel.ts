/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
import { ViewModelBase } from "geocortex/framework/ui/ViewModelBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable } from "geocortex/framework/observables";

export class OE_HandheldHeaderButtonViewModel extends ViewModelBase {

    app: ViewerApplication;
    buttonText: Observable<string> = new Observable<string>();
    commandName: Observable<string> = new Observable<string>();
    commandParam: Observable<string> = new Observable<string>();

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
    }

    initialize(config: any): void {

        if (config) {
            //this.greeting.set(config["greeting"] || this.app.getResource(this.libraryId, "language-hello-world-greeting"));

            var site = (<any>this).app.site;

            this.buttonText = config.buttonText || "Open Menu";
            this.commandName = config.commandName || "OpenAndFocusIWantToMenu";
            this.commandParam = config.commandParam || "";
        }

        
    }

    buttonClicked(): void {

        if (this.commandName !== undefined && this.commandName !== null && <any>this.commandName !== "") {

            if (this.commandParam !== undefined && this.commandParam !== null && <any>this.commandParam !== "")
                this.app.commandRegistry.command(<any>this.commandName).execute(<any>this.commandParam);
            else
                this.app.commandRegistry.command(<any>this.commandName).execute();
        }

        /*var workflowArgs: any = {};
        workflowArgs.workflowId = this.searchWorkflowID;
        workflowArgs[this.searchArgumentName] = $(this.targetInputBoxID).val();

        if (this.suggestionSelectedIndex > -1 && this.suggestions && this.suggestionSelectedIndex < this.suggestions.length()) {
            let suggestObject: any = this.suggestions.getAt(this.suggestionSelectedIndex);
            if (suggestObject)
                workflowArgs["magicKey"] = suggestObject.magicKey;
        }

        this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);*/
    }
}