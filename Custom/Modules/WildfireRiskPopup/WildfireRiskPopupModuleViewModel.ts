/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.wildfireRiskPopup {

    export class WildfireRiskPopupModuleViewModel extends geocortex.framework.ui.ViewModelBase {

        app: geocortex.essentialsHtmlViewer.ViewerApplication;
                        
        constructor(app: geocortex.essentialsHtmlViewer.ViewerApplication, lib: string) {
            super(app, lib);
        }

        initialize(config: any): void {

            var site: geocortex.essentials.Site = (<any>this).app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }

        }

        _onSiteInitialized(site: geocortex.essentials.Site) {
                        
            var gsvc = null;
            var gsvcURL = "http://lib-arcgis2.library.oregonstate.edu/arcgis/rest/services/Geometry/GeometryServer/"
            var imageServerURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireRisk_ImageService/ImageServer/"
            var fireSiteURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/";
            var oreallSiteURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_admin/MapServer/";
            var oreallHazardsURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_hazards/MapServer/";
            
            //var loadingDiv = null;
            var contentDiv = null;
            var riskValueDiv = null;

            var geometryBuffered = null;
            var geometryBufferedJsonString = null;
            var bufferArea = 0;
            var serviceInfoJson = null;
            
            //grab the geocortex map event
            this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);

            function handleMouseClick(pointIn, appIn) {

                //Grab the current application
                appIn = geocortex.framework.applications[0];

                //load the html view
                myApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");

                //clear fields
                ClearFields();

                //loading div
                //loadingDiv = $("#WildfireRisk_loading");
                //loadingDiv.css("display", "block");

                riskValueDiv = $("#WildfireRisk_value");

                //content div
                contentDiv = $("#WildfireRisk_content");
                contentDiv.css("display", "block");

                //create an event for the close button
                $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);

                //show the point on map
                appIn.command("ClearTemporaryMarkup").execute();
                appIn.command("AddTemporaryMarkupGeometry").execute(pointIn.mapPoint);

                //start up the service                
                createBuffer(pointIn);                
            }

            /*function ShowError(msg) {

                contentDiv.css("display", "none");
                loadingDiv.css("display", "block");

                loadingDiv.text = msg;
            }*/

            function ClearFields() {

                $("#WildfireRisk_value").text("Calculating...");
                $("#WildfireRisk_riskdatapercent").text("Calculating...");
                $("#WildfireRisk_forest_protection_district").text("Searching...");
                $("#WildfireRisk_structural_projection_district").text("Searching...");
                $("#WildfireRisk_rangeland_protection_assoc").text("Searching...");
                $("#WildfireRisk_city").text("Searching...");
                $("#WildfireRisk_urban_growth_boundary").text("Searching...");
                $("#WildfireRisk_cwpp_area").text("Searching...");
                $("#WildfireRisk_senatebill_360").text("Searching...");                                
            }

            function createBuffer(pointIn) {

                //loadingDiv.html("Creating buffer...");
                riskValueDiv.text("Creating buffer...");

                gsvc = new esri.tasks.GeometryService(gsvcURL);
                                
                var params = new esri.tasks.BufferParameters();
                params.geometries = [pointIn.mapPoint];
                params.distances = [0.25];
                params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                params.outSpatialReference = pointIn.mapPoint.spatialReference;
                
                gsvc.buffer(params, bufferResult, bufferError);
            }

            function bufferError(error) {
                console.log("Error: ", error.message);
                riskValueDiv.text("Error: Buffer creation");
            }

            function bufferResult(geometries) {

                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "No buffer returned");
                    riskValueDiv.text("Error: No buffer returned");
                    //ShowError("Error. No buffer.");
                    return;
                }

                //Grab the current application
                var appIn = geocortex.framework.applications[0];

                //loadingDiv.html("Calculating fire risk...");
                riskValueDiv.text("Calculating...");

                /*var symbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(
                        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([0, 0, 255, 0.65]), 2
                    ),
                    new dojo.Color([0, 0, 255, 0.35])
                );*/
                //var graphic = new esri.Graphic(geometries[0], symbol);

                //grab the geometry
                geometryBuffered = geometries[0];
                geometryBufferedJsonString = JSON.stringify(geometryBuffered.toJson());

                //show the buffer for now
                appIn.command("AddTemporaryMarkupGeometry").execute(geometryBuffered); 

                //simplify the selection first
                gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);                
            }

            function simplifyError(error) {
                console.log("Error: ", error.message);
                //ShowError("Simplify Error");
                riskValueDiv.text("Error: Simplify Failed");
            }

            function simplifyComplete(simplifiedGeometries) {

                var alparams = new esri.tasks.AreasAndLengthsParameters();

                alparams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                alparams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                alparams.calculationType = "preserveShape";
                alparams.polygons = simplifiedGeometries;

                var str = JSON.stringify(geometryBuffered.toJson());

                riskValueDiv.text("Calculating area...");
                                
                //gsvc.on("areas-and-lengths-complete", requestAreaResult);
                //gsvc.areasAndLengths(alparams);
                gsvc.areasAndLengths(alparams, requestAreaResult, requestAreaError);

                  /*var requestObj = esri.request({
                        url: "http://lib-arcgis2.library.oregonstate.edu/arcgis/rest/services/Geometry/GeometryServer/areasAndLengths",
                        handleAs: "json",
                        content: {
                            f: "json",
                            calculationType: "preserveShape",
                            polygons: simplifiedGeometries,
                            sr: geometryBuffered.spatialReference.wkid,
                            lengthUnit: esri.tasks.GeometryService.UNIT_METER,
                            areaUnit: JSON.stringify({ "areaUnit": esri.tasks.GeometryService.UNIT_SQUARE_METERS })
                        }
                    });

                    requestObj.then(requestAreaResult, requestAreaError);*/

            }

            function requestAreaError(error) {
                console.log("Error: ", error.message);
                riskValueDiv.text("Error: Area calculation failed.");
            }

            function requestAreaResult(result) {                
                bufferArea = result.areas[0];               
                requestMapServiceInfo();
            }                        
            
            function requestMapServiceInfo() {

                var requestObj = esri.request({
                    url: imageServerURL,
                    handleAs: "json",
                    content: {
                        f: "json"
                    }
                });

                requestObj.then(requestInfoComplete, requestInfoError);
            }

            function requestInfoError(error) {
                console.log("Error: ", error.message);
                //ShowError("Service Info Error");
                riskValueDiv.text("Error: Service information failed.");
            }

            function requestInfoComplete(jsonData) {                
                //set the pixel size
                serviceInfoJson = jsonData;//alert(data);

                 //request histogram
                requestHistogram(JSON.stringify(geometryBuffered.toJson()));
            }


            function requestHistogram(geoStringIn) {
                                
                var requestObj = esri.request({
                    url: imageServerURL+"computeHistograms",
                    handleAs: "json",
                    content: {
                        f: "json",
                        geometryType: "esriGeometryPolygon ",
                        geometry: geoStringIn,
                        mosaicRule: "",
                        renderingRule: "",
                        pixelSize: ""
                    }
                });
                               
                requestObj.then(requestHistogram_success, requestHistogram_fail);
            }

            function requestHistogram_success(data) {
                //console.log("Data: ", JSON.stringify(data)); // print the data to browser's console
                //alert(JSON.stringify(data));

                /*if (data.histograms.length < 1) {

                    loadingDiv.text("No data in selection");
                    ShowError("Simplify Error");
                    return;
                }*/

                riskValueDiv.text("Building Histogram...");
                                
                var counts = null;
                var countTotal = 0;
                var valueTotal = 0;
                var averageFirerisk = 0;

                //process histogram data
                if (data.histograms.length > 0) {

                    counts = data.histograms[0].counts;

                    //loop over the counts
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {

                        countTotal += counts[i];
                        valueTotal += counts[i] * i;
                    }

                    averageFirerisk = Math.round((valueTotal / countTotal) * 100) / 100;
                }

                var riskName = "No Data";

                if (averageFirerisk >= 16) {
                    riskName = "High";
                }
                else if (averageFirerisk >= 4) {
                    riskName = "Moderate";
                }
                else if (averageFirerisk > 0){
                    riskName = "Low";
                }
                                               
                $("#WildfireRisk_value").text(riskName);

                //bufferArea = Math.round(bufferArea * 100) / 100;              
                var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                var maxPixels = bufferArea / pixelArea;
                var dataPercent = Math.round((countTotal / maxPixels) * 100);

                $("#WildfireRisk_riskdatapercent").text(dataPercent + "%");

                requestRemainingData();
                
                //loadingDiv.css("display", "none");
                //contentDiv.css("display", "block");                                
            }

            function requestHistogram_fail(error) {
                console.log("Error: ", error.message);
                //ShowError("Calculation Error");
                riskValueDiv.text("Error: Histogram creation failed.");
            }

            function queryRemainingData(url,layerID,fieldName,divElement,resultCallback,errorCallBack) {
                                
                var queryTask = new esri.tasks.QueryTask(url + layerID);

                //build query filter
                var query = new esri.tasks.Query();
                query.geometry = geometryBuffered;
                query.returnGeometry = false;
                query.outFields = [fieldName];

                queryTask.execute(query,
                    function (result) {
                        resultCallback(result.features, fieldName, divElement);
                    },
                    function (error) {                      
                        errorCallBack(error, divElement);
                    }
                );
            }

            function resultRemainingData(features, attributeName, divElement) {

                if (features.length < 1) {
                    divElement.text("No Results");
                    return;
                }

                var i = 0;
                var str = "";
                for (i = 0; i < features.length; i++) {
                    str += "<div>" + features[i].attributes[attributeName] + "</div>";
                }

                divElement.html(str);
            }

            function errorRemainingData(error, divElement) {
                //console.log("Error: ", error.message);
                divElement.text("No data");
            }

            function requestRemainingData() {

                //Wildfire Forest Projection District
                queryRemainingData(oreallSiteURL, "40", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                
                //Structural Fire Protection District
                queryRemainingData(oreallSiteURL, "42", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);

                //Rangeland Protection Associations
                queryRemainingData(oreallSiteURL, "41", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);

                //city or town
                queryRemainingData(fireSiteURL, "55", "name10", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);

                //urban growth boundary
                queryRemainingData(oreallSiteURL, "17", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);

                //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                queryRemainingData(oreallHazardsURL, "28", "wui_name", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);

                //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                queryRemainingData(oreallHazardsURL, "52", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);
                
            }

            function UGB_result(features, attributeName, divElement) {
                if (features.length < 1) {
                    divElement.text("Outside Urban Growth Boundary");
                    return;
                }

                var i = 0;
                var str = "";
                for (i = 0; i < features.length; i++) {
                    str += features[i].attributes[attributeName] + ", ";
                }

                str = str.slice(0, -2);
                divElement.html("Within "+str);

               // divElement.text("Within " + features[0].attributes[attributeName]);
            }

            function UGB_error(error, divElement) {                
                divElement.text("Outside Urban Growth Boundary");                    
            }

            function SB360_result(features, attributeName, divElement) {

                if (features.length < 1) {
                    divElement.text("No");
                    return;
                }

                divElement.text("Yes");
            }

            function SB360_error(error, divElement) {
                divElement.text("No"); 
            }

           

            function closeWildfireRiskPopup() {
                
                myApp.command("ClearTemporaryMarkup").execute();

                //deactivate view
                myApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");
            }

            

        }

    }
}