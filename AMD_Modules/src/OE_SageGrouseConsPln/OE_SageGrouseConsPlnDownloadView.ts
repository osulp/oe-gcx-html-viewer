/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/jqueryui.d.ts"/>
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />

import { ViewBase } from "geocortex/framework/ui/ViewBase";
import { ViewerApplication } from "geocortex/infrastructure/Viewer";
import { Observable, ObservableCollection } from "geocortex/framework/observables";

export class OE_SageGrouseConsPlnDownloadView extends ViewBase {
    
    app: ViewerApplication;
    gpExtractHexURL: string = 'https://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/geoprocessing/extractFilteredHex/GPServer/extractFilteredHex';
     

    constructor(app: ViewerApplication, lib: string) {
        super(app, lib);
       
    }
    activated() {
        this.viewModel.isDownloading.set(false);
        this.viewModel.downloadReady.set(false);
        this.viewModel.downloadError.set(false);
    }

    download() {
        this.viewModel.isDownloading.set(true);
        this.viewModel.downloadError.set(false);
        this.viewModel.downloadReady.set(false);
        let gp = new esri.tasks.Geoprocessor(this.gpExtractHexURL);

        let gpParams = {
            "LayerDefinition": this.viewModel.active_layer_def,
            "Feature_Format": this.viewModel.selectedFormat.get()
        }       

        gp.submitJob(gpParams, (results, messages) => {
            console.log('results!', results, messages);
            if (results.jobStatus === 'esriJobSucceeded') {                
                gp.getResultData(results.jobId, "output_zip", (result) => {
                    this.viewModel.isDownloading.set(false);
                    this.viewModel.downloadReady.set(true);
                    this.viewModel.downloadUrl.set(result.value.url);                    
                });
            } else {
                this.viewModel.downloadError.set(true);
            }
        }, (status) => {
            console.log('status', status);
        },
            (error) => {
                console.log('error :(', error);
            });
    }
    
}