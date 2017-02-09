/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.wildfireRiskPopup {

    export var reportImageFeatureCollectionJSON;
    export var reportImageExtent;
    export var pointLatLong;
    export var geometryElementsJsonString;

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
            var fireRiskURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireRisk_ImageService/ImageServer/"
            var fireIntensityURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/FireIntensity_ImageService/ImageServer/"
            var fireSiteURL = "http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/hazards/WildfireRisk/MapServer/";
            var oreallSiteURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_admin/MapServer/";
            var oreallHazardsURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/oreall/oreall_hazards/MapServer/";
            
            var loadingDiv = null;
            var contentDiv = null;
            var riskValueDiv = null;
            var linkDiv = null;

            var requestsToComplete = 10;
            var requestsCompleted = 0;

            var workingPointGeometry = null;

            var geometryBuffered = null;
            var geometryBufferedJsonString = null;
            var bufferArea = 0;
            var serviceInfoJson = null;

            var workingFeatureCollection = null;
            
            //grab the geocortex map event
            this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);

            function formateLatLong(numberIn,isLat) {        
                                
                var dirSuffix;

                if (isLat) {
                    if (numberIn >= 0)
                        dirSuffix = "N"
                    else
                        dirSuffix = "S"
                }
                else
                {
                    if (numberIn >= 0)
                        dirSuffix = "E"
                    else
                        dirSuffix = "W"
                }

                var workingString = String(Math.abs(numberIn));                                
                var workingSplit = workingString.split(".");
                return workingSplit[0] + "." + workingSplit[1].substring(0, 3) + " " + dirSuffix;
            }

            function handleMouseClick(pointIn, appIn) {
                                
                //Grab the current application
                appIn = geocortex.framework.applications[0];

                //store the point
                workingPointGeometry = pointIn.mapPoint;

                //convert to a lat long version                
                var latLongPoint = <esri.geometry.Point>esri.geometry.webMercatorToGeographic(workingPointGeometry);                
                var latOut = formateLatLong(latLongPoint.y,true);
                var lonOut = formateLatLong(latLongPoint.x,false);
                
                pointLatLong = latOut + "," + lonOut;

                //create a feature set that includes just this point
                //This will be passed to the workflow to be used with a geoprocess tool
                var pointGraphic = new esri.Graphic(workingPointGeometry);
                                                                
                //load the html view
                myApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");

                requestsCompleted = 0;

                //clear fields
                ClearFields();

                //risk value 
                riskValueDiv = $("#WildfireRisk_value");

                //loading div
                loadingDiv = $("#WildfireRisk_loading");
                loadingDiv.css("display", "block");

                //link div
                linkDiv = $(".WildfireRisk_link");
                linkDiv.css("display", "none");
                                                              
                //content div
                contentDiv = $("#WildfireRisk_content");
                contentDiv.css("display", "none");

                //create an event for the close button
                $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);

                //show the point on map
                //appIn.command("ClearTemporaryMarkup").execute();
                //appIn.command("AddTemporaryMarkupGeometry").execute(workingPointGeometry);
                appIn.command("ClearMarkupQuiet").execute();
                appIn.command("AddMarkupGeometry").execute(workingPointGeometry);

                //get all the other data
                requestRemainingData();

                //getNearOffice();
                                
                //create the feature collection
                workingFeatureCollection = {
                    "id": "Drawings",
                    "opacity": 0.99,
                    "minScale": 0,
                    "maxScale": 0,
                    "featureCollection": {
                        "layers": []
                    }
                }

                
                var pointGraphic = new esri.Graphic(workingPointGeometry,
                    geocortex.essentialsHtmlViewer.mapping.infrastructure.SymbolUtils.defaultMarkerSymbol());


                geometryElementsJsonString = JSON.stringify(pointGraphic.toJson());


                var layerJSON = CreateLayerJSON("userPoint", "esriGeometryPoint", [pointGraphic]);
                
                //add layer JSON
                workingFeatureCollection.featureCollection.layers.push(layerJSON);

                //reportImageFeatureCollectionJSON = JSON.stringify(fCol);

                //console.log(JSON.stringify(fCol));
                //start the risk calcuation 
                createBuffer();
            }
            
            function CreateLayerJSON(layerName,esriGeometryType,graphicsIn) {
               
                /*var newGraphics = [];

                var i = 0;
                for (i = 0; i < geometries.length; i++) {
                    newGraphics.push(new esri.Graphic(geometries[i], symbol));
                }*/
                
                var layerDef = {
                    "name": layerName,
                    "geometryType": esriGeometryType,
                    "fields":[]
                };

                var featureCollection = {
                    "layerDefinition": layerDef,
                    "featureSet": null
                }

                var fLayer = new esri.layers.FeatureLayer(featureCollection);
                fLayer.graphics = graphicsIn;
                                                                                
                return fLayer.toJson();
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

                //warning block
                $("#WildfireRisk_warning").text("");
                $("#WildfireRisk_warning").css("display", "none");

                //hidden
                $("#WildfireRisk_flame_min").text("Searching...");                                     
                $("#WildfireRisk_flame_max").text("Searching...");                                     
                $("#WildfireRisk_flame_ave").text("Searching...");                                     
            }

            function AddRequestComplete(val = 1) {

                requestsCompleted += val;

                loadingDiv.text("Processing... (" + requestsCompleted + " of " + requestsToComplete+")");

                if (requestsCompleted >= requestsToComplete) {
                    loadingDiv.css("display", "none");                    
                    contentDiv.css("display", "block");
                    linkDiv.css("display", "block");
                }
            }

            function SetRiskValue(val) {
                riskValueDiv.text(val);
                AddRequestComplete();
            }

            function SetRiskError(val) {
                riskValueDiv.text(val);
                //add 2 because these processes are needed for two different results.
                AddRequestComplete(2);
            }

            function createBuffer() {

                //loadingDiv.html("Creating buffer...");
                loadingDiv.text("Creating buffer...");

                gsvc = new esri.tasks.GeometryService(gsvcURL);
                                
                var params = new esri.tasks.BufferParameters();
                params.geometries = [workingPointGeometry];
                params.distances = [0.25];
                params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;
                params.outSpatialReference = workingPointGeometry.spatialReference;
                
                gsvc.buffer(params, bufferResult, bufferError);
                                                
                //add some other buffers
                AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, [30,100], AddBufferSuccess, AddBufferError);
                //AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, 400, AddBufferSuccess, AddBufferError);
                //AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, 600, AddBufferSuccess, AddBufferError);
            }

            function AddBuffer(workingPoints, unitOfMeasure, distances, successCallback, failCallback) {
                                
                loadingDiv.text("Creating buffer...");

                gsvc = new esri.tasks.GeometryService(gsvcURL);

                var params = new esri.tasks.BufferParameters();
                params.geometries = workingPoints;
                params.distances = distances;
                params.unit = unitOfMeasure;
                params.outSpatialReference = workingPointGeometry.spatialReference;

                gsvc.buffer(params, successCallback, bufferError);
            }

            function AddBufferSuccess(geometries) {

                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "Add buffer error");
                    return;
                }

                //Grab the current application
                //var appIn = geocortex.framework.applications[0];

                //grab the geometry
                //var addThisBuffer = geometries[0];

                /*var i = 0;
                for (i = 0; i < geometries.length; i++) {
                    appIn.command("AddMarkupGeometry").execute(geometries[i]);
                }*/


                var esriLine = esri.symbol.SimpleLineSymbol;
                var esriFill = esri.symbol.SimpleFillSymbol;
                var esriColor = esri.Color;
                                               
                var symbolOuter = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_NULL,
                    new esriLine(esriLine.STYLE_SOLID, new esriColor([236, 181, 9, 1]), 2),
                    null
                );
                
                var symbolInner = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_NULL,
                    new esriLine(esriLine.STYLE_SOLID, new esriColor([222, 86, 27, 1]), 2),
                    null
                );
                                
                var symbolCurrent;
                var newGraphic = <esri.Graphic> null;
                var newGraphics = [];
                //var jsonGraphicsString = "";
                var i = 0;
                for (i = 0; i < geometries.length; i++) {

                    if (i == 0)
                        symbolCurrent = symbolInner;
                    else
                        symbolCurrent = symbolOuter;

                    newGraphics.push(new esri.Graphic(geometries[i], symbolCurrent));

                    newGraphic = new esri.Graphic(geometries[i], symbolCurrent);

                    geometryElementsJsonString += "," + JSON.stringify(newGraphic.toJson());
                }

                //jsonGraphicsString = jsonGraphicsString.slice(0, -1);
                                                
                var layerJSON = CreateLayerJSON("imageMapBuffer", "esriGeometryPolygon", newGraphics);

                
                
                //var layerJSON = CreateLayerJSON("imageMapBuffer", "esriGeometryPolygon", geometries,new esri.symbol.SimpleFillSymbol());

                //add layer JSON
                workingFeatureCollection.featureCollection.layers.push(layerJSON);

                //create string
                reportImageFeatureCollectionJSON = JSON.stringify(workingFeatureCollection);
                                
                //set the report image extent to the geometry
                reportImageExtent = geometries[0].getExtent();

                //console.log(reportImageFeatureCollectionJSON);

                AddRequestComplete(1);
                
                //show the buffer for now
                //appIn.command("AddTemporaryMarkupGeometry").execute(geometryBuffered); 
                //appIn.command("AddMarkupGeometry").execute(addThisBuffer);                
            }

            function AddBufferError() {
                console.log("Error: ", "Add buffer error");
                AddRequestComplete(1);
            }

            function bufferError(error) {
                console.log("Error: ", error.message);
                //riskValueDiv.text("Error: Buffer creation");
                SetRiskError("Error: Buffer creation");
            }

            function bufferResult(geometries) {
                                
                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "No buffer returned");
                    riskValueDiv.text("Error: No buffer returned");                                        
                    return;
                }

                //Grab the current application
                var appIn = geocortex.framework.applications[0];

                //loadingDiv.html("Calculating fire risk...");
                loadingDiv.text("Calculating...");

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
                //appIn.command("AddTemporaryMarkupGeometry").execute(geometryBuffered); 
                appIn.command("AddMarkupGeometry").execute(geometryBuffered);

                //simplify the selection first
                gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);                
            }

            function simplifyError(error) {
                console.log("Error: ", error.message);                
                //riskValueDiv.text("Error: Simplify Failed");
                SetRiskError("Error: Simplify Failed");
            }

            function simplifyComplete(simplifiedGeometries) {
                                
                var alparams = new esri.tasks.AreasAndLengthsParameters();

                alparams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                alparams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                alparams.calculationType = "preserveShape";
                alparams.polygons = simplifiedGeometries;
                                                
                //var str = JSON.stringify(geometryBuffered.toJson());
                
                loadingDiv.text("Calculating area...");
                                
                gsvc.areasAndLengths(alparams, requestAreaResult, requestAreaError);
            }

            function requestAreaError(error) {
                console.log("Error: ", error.message);
                //riskValueDiv.text("Error: Area calculation failed.");
                SetRiskError("Error: Area calculation failed.");
            }

            function requestAreaResult(result) {         
                 
                bufferArea = result.areas[0];               
                requestMapServiceInfo();
            }                        
            
            function requestMapServiceInfo() {

                var requestObj = esri.request({
                    url: fireRiskURL,
                    handleAs: "json",
                    content: {
                        f: "json"
                    }
                });

                requestObj.then(requestInfoComplete, requestInfoError);
            }

            function requestInfoError(error) {
                console.log("Error: ", error.message);                
                //riskValueDiv.text("Error: Service information failed.");
                SetRiskError("Error: Service information failed.");
            }

            function requestInfoComplete(jsonData) {                
                
                //set the pixel size
                serviceInfoJson = jsonData;//alert(data);
                

                 //request histogram
                requestHistogram(JSON.stringify(geometryBuffered.toJson()));
            }


            function requestHistogram(geoStringIn) {
                                
                var requestObj = esri.request({
                    url: fireRiskURL+"computeHistograms",
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

                //fire risk histogram
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
                                
                //loadingDiv.text("Building Histogram...");
                                
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
                                              
                                                
                //bufferArea = Math.round(bufferArea * 100) / 100;              
                var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                var maxPixels = bufferArea / pixelArea;
                var dataPercent = Math.round((countTotal / maxPixels) * 100);

                $("#WildfireRisk_riskdatapercent").text(dataPercent + "%");

                //show warning if data percent is low
                if (dataPercent < 50) {
                    $("#WildfireRisk_warning").text("Warning! Incomplete data coverage in your area.");
                    $("#WildfireRisk_warning").css("display", "block");
                }

                //$("#WildfireRisk_value").text(riskName);
                SetRiskValue(riskName);
                                                
                //loadingDiv.css("display", "none");
                //contentDiv.css("display", "block");         

                getFireIntensity();
            }

            function requestHistogram_fail(error) {
                console.log("Error: ", error.message);                
                //riskValueDiv.text("Error: Histogram creation failed.");                
                SetRiskError("Error: Histogram creation failed.");
            }

            function getFireIntensity() {

                var requestIntensity = esri.request({
                    url: fireIntensityURL + "computeHistograms",
                    handleAs: "json",
                    content: {
                        f: "json",
                        geometryType: "esriGeometryPolygon ",
                        geometry: geometryBufferedJsonString,
                        mosaicRule: "",
                        renderingRule: "",
                        pixelSize: ""
                    }
                });

                //fire intensity histogram
                requestIntensity.then(intensity_success, intensity_fail);
            }

            function intensity_success(data) {

                var counts = null;
                                
                var flameLow = 300;
                var flameHigh = 0;
                var flameAverage = 0;

                var countTotal = 0;
                var valueTotal = 0;

                var str = "";

                //process histogram data
                if (data.histograms.length > 0) {

                    counts = data.histograms[0].counts;
                    
                    var i = 0;
                    for (i = 1; i < counts.length; i++) {
                                                
                        //skip zero values
                        //if (counts[i] < 1)
                        //   continue;

                        countTotal += counts[i];
                        valueTotal += counts[i] * i;

                        //set flameLow
                        if (i < flameLow) {
                            flameLow = i;

                            if (flameLow > 11)
                                flameLow = 11;
                        }

                        //set flameHigh
                        if (i > flameHigh) {
                            flameHigh = i;                            
                        }
                    }

                    flameAverage = Math.round((valueTotal / countTotal) * 10) / 10;
                }

                if (flameLow == 300)
                    flameLow = 0;

                $("#WildfireRisk_flame_ave").text(flameAverage);                
                $("#WildfireRisk_flame_min").text(flameLow);                
                $("#WildfireRisk_flame_max").text(flameHigh);                

                AddRequestComplete();
            }

            function intensity_fail(error) {
                console.log("Error: ", error.message);
                //SetRiskValue("Error: Histogram creation failed.");
                AddRequestComplete();
            }

            function sendQueryRequest(url,layerID,fieldName,divElement,resultCallback,errorCallBack,returnGeometry=false) {
                                
                var queryTask = new esri.tasks.QueryTask(url + layerID);

                //build query filter
                var query = new esri.tasks.Query();
                //query.geometry = geometryBuffered;
                query.geometry = workingPointGeometry;
                query.returnGeometry = returnGeometry;
                query.outFields = [fieldName];

                queryTask.execute(query,
                    function (result) {
                        AddRequestComplete();
                        resultCallback(result.features, fieldName, divElement);
                    },
                    function (error) {                      
                        AddRequestComplete();
                        errorCallBack(error, divElement);
                    }
                );
            }

            function resultRemainingData(features, attributeName, divElement) {

                if (features.length < 1) {
                    divElement.text("None");
                    return;
                }

                var i = 0;
                var str = "";
                var strItem = "";
                for (i = 0; i < features.length; i++) {

                    strItem = features[i].attributes[attributeName];
                    strItem = strItem.trim();

                    if (strItem === "")
                        strItem = "None";                    

                    str += "<div>" + strItem + "</div>";
                }

                divElement.html(str);
            }

            function errorRemainingData(error, divElement) {
                //console.log("Error: ", error.message);
                divElement.text("No data");
            }

            function requestRemainingData() {
                
                //Wildfire Forest Projection District
                sendQueryRequest(oreallSiteURL, "40", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                
                //Structural Fire Protection District
                sendQueryRequest(oreallSiteURL, "42", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);

                //Rangeland Protection Associations
                sendQueryRequest(oreallSiteURL, "41", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);

                //city or town
                sendQueryRequest(fireSiteURL, "55", "name10", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);

                //urban growth boundary
                sendQueryRequest(oreallSiteURL, "17", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);

                //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                sendQueryRequest(oreallHazardsURL, "28", "cwpp", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);

                //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                sendQueryRequest(oreallHazardsURL, "52", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);                                                
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


            /*function getNearOffice() {

                var userPointJson = {
                    "displayFieldName": "",
                    "geometryType": "esriGeometryPoint",
                    "spatialReference": {
                        "wkid": 102100,
                        "latestWkid": 3857
                    },
                    "fields": [{
                        "name": "OBJECTID",
                        "type": "esriFieldTypeOID",
                        "alias": "OBJECTID"
                    }
                    ],
                    "features": [{
                        "geometry": workingPointGeometry.toJson()
                    }
                    ],
                    "exceededTransferLimit": false
                }

                var customGeoService = null;
                customGeoService = new esri.tasks.Geoprocessor("http://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/_sandbox/OfficeProximity/GPServer/OfficeProx");
                var params = { "UserPoint": userPointJson, "f":"json", "ReturnZ":false,"ReturnM":false}                
                customGeoService.submitJob(params, officeSuccess, officeStatus, officeFail);                
            }

            function officeSuccess(data) {
                console.log(data.toString);
                AddRequestComplete(1);
            }

            function officeStatus(data) {
                console.log(data.toString);
            }

            function officeFail(error) {
                console.log(error.toString);
                AddRequestComplete(1);
                //divElement.text("Outside Urban Growth Boundary");
            }*/


            function closeWildfireRiskPopup() {
                
                //myApp.command("ClearTemporaryMarkup").execute();
                myApp.command("ClearMarkupQuiet").execute();

                //deactivate view
                myApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");

                //close the open workflow?
                //myApp.app.commandRegistry.command("DeactivateView").execute("CustomForm49ModuleView");
            }

            

        }

    }
}