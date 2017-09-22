/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.wildfireRiskPopup {

    export var reportImageFeatureCollectionJSON;
    export var reportImageExtent;
    export var pointLatLong;
    export var geometryElementsJsonString;
    export var riskPercentOut;

    //popup toggle and default state
    export var fireRiskPopupEnabled = <boolean>true;
        
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
            //var gsvcURL = "http://tools.oregonexplorer.info/arcgis/rest/services/Geometry/GeometryServer"            
            var gsvcURL = "http://arcgis.oregonexplorer.info/arcgis/rest/services/Utilities/Geometry/GeometryServer"            
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

            var workingPointGeometry = <esri.geometry.Geometry>null;

            var geometryBuffered = null;
            var geometryBufferedJsonString = null;
            var bufferArea = 0;
            var serviceInfoJson = null;

            var workingFeatureCollection = null;

            var workingApp = <geocortex.framework.application.Application>geocortex.framework.applications[0];

            /*
                This module is added to the NavigationMapRegion region.
                Geocortex adds this module above the "I want to" button.
                Move this module to the bottom of the navigation map region

                map-navigation-region
                WildfireRiskPopupModuleView
            */
            $(".WildfireRiskPopupModuleView").appendTo(".map-navigation-region");
            
            //add a command button
            this.app.commandRegistry.command("toggle_firerisk_mode").register(this, toggleFireRiskMode);

            //run popup by coordinates
            this.app.commandRegistry.command("OpenFireriskPopup").register(this, openFireriskPopup);
                                    
            //grab the geocortex map event
            this.app.eventRegistry.event("MapClickedEvent").subscribe(null, handleMouseClick);

            //check for current mode
            if (fireRiskPopupEnabled)
                enableFireRiskMode();
            else
                disableFireRiskMode();



            function toggleFireRiskMode(): void {

                if(fireRiskPopupEnabled)
                    disableFireRiskMode();
                else
                    enableFireRiskMode();
            }

            function enableFireRiskMode(): void {

                //hide map tips
                workingApp.commandRegistry.command("HideAllMapTips").execute();

                //disable identify for mobile?
                workingApp.commandRegistry.command("DisableAllLayersForIdentify").execute();

                //enable fire risk
                workingApp.command("DisableMapTips").execute();

                //$(".WildfireRiskPopupHeaderText").text("Fire Risk Mode Active");    
                
                fireRiskPopupEnabled = true;
                                
                //workingApp.command("RunWorkflowWithArguments").execute({ "workflowId": "myworkflow", "param1":"value1" });
                //load the html view
                //workingApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");

                //create an event for the close button
                //$(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);

                //$(".WildfireRiskPopupContent").css("display", "none");
                //$(".WildfireRiskPopupGuide").css("display", "block");

            }

            function disableFireRiskMode(): void {

                //clear markup
                workingApp.command("ClearMarkupQuiet").execute();

                //enable identify
                workingApp.commandRegistry.command("EnableAllLayersForIdentify").execute();

                //load the html view
                workingApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");

                fireRiskPopupEnabled = false;
                workingApp.command("EnableMapTips").execute();
            }

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

            function processMapPoint(mapPointIn) {

                if (!fireRiskPopupEnabled)
                    return;

                //store the point
                workingPointGeometry = mapPointIn;
                
                //convert to a lat long version                
                var latLongPoint = <esri.geometry.Point>esri.geometry.webMercatorToGeographic(workingPointGeometry);
                var latOut = formateLatLong(latLongPoint.y, true);
                var lonOut = formateLatLong(latLongPoint.x, false);

                pointLatLong = latOut + "," + lonOut;

                //create a feature set that includes just this point
                //This will be passed to the workflow to be used with a geoprocess tool
                var pointGraphic = new esri.Graphic(workingPointGeometry);

                //load the html view
                workingApp.commandRegistry.command("ActivateView").execute("WildfireRiskPopupModuleView");

                requestsCompleted = 0;

                //clear fields
                ClearFields();

                //risk value 
                riskValueDiv = $("#WildfireRisk_value");

                //loading div
                loadingDiv = $("#WildfireRisk_loading");
                loadingDiv.css("display", "block");

                //swap blocks
                $(".WildfireRiskPopupContent").css("display", "block");
                //$(".WildfireRiskPopupGuide").css("display", "none");

                //link div
                linkDiv = $(".WildfireRisk_link");
                linkDiv.css("display", "none");

                //content div
                contentDiv = $("#WildfireRisk_content");
                contentDiv.css("display", "none");

                //create an event for the close button
                $(".WildfireRiskPopupCloseButton").click(closeWildfireRiskPopup);

                //show the point on map
                workingApp.command("ClearMarkupQuiet").execute();
                workingApp.command("AddMarkupGeometry").execute(workingPointGeometry);

                $(".WildfireRiskPopupHeaderText").text("Your Location");

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

                //start the risk calcuation 
                createBuffer();
            }

            function openFireriskPopup(geometryIn, appIn) {

                if (!fireRiskPopupEnabled)
                    return;

                var jsonIn = jQuery.parseJSON(geometryIn);                
                var newPoint = new esri.geometry.Point(jsonIn.x, jsonIn.y, new esri.SpatialReference({ wkid: jsonIn.spatialReference.wkid }));

                processMapPoint(newPoint);
            }

            function handleMouseClick(pointIn, appIn) {

                if (!fireRiskPopupEnabled)
                    return;
                
                //store the point
                //workingPointGeometry = pointIn.mapPoint;

                processMapPoint(pointIn.mapPoint);
            }
            
            function CreateLayerJSON(layerName,esriGeometryType,graphicsIn) {
                               
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

            function ClearFields() {

                $("#WildfireRisk_value").text("Calculating...");
                //$("#WildfireRisk_riskdatapercent").text("Calculating...");
                $("#WildfireRisk_forest_protection_district").text("Searching...");
                $("#WildfireRisk_structural_projection_district").text("Searching...");
                $("#WildfireRisk_rangeland_protection_assoc").text("Searching...");
                $("#WildfireRisk_city").text("Searching...");
                $("#WildfireRisk_urban_growth_boundary").text("Searching...");
                $("#WildfireRisk_cwpp_area").text("Searching...");
                $("#WildfireRisk_senatebill_360").text("Searching...");     

                //warning block
                //$("#WildfireRisk_warning").text("");
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
                //params.bufferSpatialReference = workingPointGeometry.spatialReference;
                params.unit = esri.tasks.GeometryService.UNIT_STATUTE_MILE;                
                params.outSpatialReference = workingPointGeometry.spatialReference;
                
                gsvc.buffer(params, bufferResult, bufferError);
                                                
                //add some other buffers
                AddBuffer([workingPointGeometry], esri.tasks.GeometryService.UNIT_FOOT, [30, 100], AddBufferSuccess, AddBufferError);
            }

            function AddBuffer(workingPoints, unitOfMeasure, distances, successCallback, failCallback) {
                                
                loadingDiv.text("Creating buffer...");

                gsvc = new esri.tasks.GeometryService(gsvcURL);

                var params = new esri.tasks.BufferParameters();
                params.geometries = workingPoints;
                params.distances = distances;
                params.unit = unitOfMeasure;
                params.geodesic = true;
                params.outSpatialReference = workingPointGeometry.spatialReference;

                gsvc.buffer(params, successCallback, bufferError);
            }

            function AddBufferSuccess(geometries) {

                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "Add buffer error");
                    return;
                }

                /*var esriLine = esri.symbol.SimpleLineSymbol;
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

                var layerJSON = CreateLayerJSON("imageMapBuffer", "esriGeometryPolygon", newGraphics);
                
                //add layer JSON
                workingFeatureCollection.featureCollection.layers.push(layerJSON);*/

                //create string
                reportImageFeatureCollectionJSON = JSON.stringify(workingFeatureCollection);
                                
                //set the report image extent to the geometry
                reportImageExtent = geometries[0].getExtent();
                
                AddRequestComplete(1);                          
            }

            function AddBufferError() {
                console.log("Error: ", "Add buffer error");
                AddRequestComplete(1);
            }

            function bufferError(error) {
                console.log("Error: ", error.message);
                SetRiskError("Error: Buffer creation");
            }

            function bufferResult(geometries) {
                                
                if (geometries == null || geometries.length < 1) {
                    console.log("Error: ", "No buffer returned");
                    riskValueDiv.text("Error: No buffer returned");                                        
                    return;
                }
                
                loadingDiv.text("Calculating...");
                
                //grab the geometry
                geometryBuffered = geometries[0];
                geometryBufferedJsonString = JSON.stringify(geometryBuffered.toJson());

                //show the buffer for now
                workingApp.command("AddMarkupGeometry").execute(geometryBuffered);

                //simplify the selection first
                gsvc.simplify([geometryBuffered], simplifyComplete, simplifyError);                
            }

            function simplifyError(error) {
                console.log("Error: ", error.message);     
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
                else if (averageFirerisk >= 5) {
                    riskName = "Moderate";
                }
                else if (averageFirerisk > 0){
                    riskName = "Low";
                }
                                              
                                                
                //bufferArea = Math.round(bufferArea * 100) / 100;              
                var pixelArea = serviceInfoJson.pixelSizeX * serviceInfoJson.pixelSizeY;
                var maxPixels = bufferArea / pixelArea;
                var dataPercent = Math.round((countTotal / maxPixels) * 100);

                //$("#WildfireRisk_riskdatapercent").text(dataPercent + "%");
                riskPercentOut = dataPercent;

                //show warning if data percent is low
                if (dataPercent < 25) {
                    //$("#WildfireRisk_warning").text("Warning! Incomplete data coverage in your area.");
                    $("#WildfireRisk_warning").css("display", "block");
                }
                
                SetRiskValue(riskName);
                                    
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

                //flame categories
                //1 = 0
                //2 = 0-4
                //3 = 4-8
                //4 = 8-11
                //5 = >11

                //average values for a given histogram array index
                var categories = [
                    { "min": -1, "max": -1, "rangeMid":-1 },
                    { "min": 0, "max": 0, "rangeMid": 0 },
                    { "min": 0, "max": 4, "rangeMid": 2 },
                    { "min": 4, "max": 8, "rangeMid": 6 },
                    { "min": 8, "max": 11, "rangeMid": 9.5 },
                    { "min": "> 11", "max": "> 11", "rangeMid": "> 11" }
                ];

                var counts = null;
                                
                var flameLow = 300;
                var flameHigh = 0;
                var flameAverage = 0;
                var flameAveStr = "0";

                var totalPixelCount = 0;
                var totalPixelCategoryValue = 0;

                //var countTotal = 0;
                //var valueTotal = 0;

                //var iVal = 0;

                var str = "";
                var i = 0;
                                
                if (data.histograms.length > 0) {
                    counts = data.histograms[0].counts;

                    //get total for all categories                    
                    for (i = 0; i < counts.length; i++) {

                        totalPixelCount += counts[i];
                        totalPixelCategoryValue += counts[i] * i;

                        //set flameLow
                        if (counts[i] > 0 && i < flameLow) {
                            flameLow = i;
                        }

                        //set flameHigh
                        if (counts[i] > 0 && i > flameHigh) {
                            flameHigh = i;
                        }
                    }

                    if (flameLow == 300)
                        flameLow = 1;

                    flameAverage = Math.round(totalPixelCategoryValue / totalPixelCount);
                    
                    if (flameAverage > -1 && flameAverage < categories.length)
                        $("#WildfireRisk_flame_ave").text(categories[flameAverage].rangeMid);
                    else
                        $("#WildfireRisk_flame_ave").text("No Data");
                    
                    if (flameLow > -1 && flameLow < categories.length)
                        $("#WildfireRisk_flame_min").text(categories[flameLow].min);
                    else
                        $("#WildfireRisk_flame_min").text("No Data");

                    if (flameHigh > -1 && flameHigh < categories.length)
                        $("#WildfireRisk_flame_max").text(categories[flameHigh].max);
                    else
                        $("#WildfireRisk_flame_max").text("No Data");

                    //alert("Ave: " + categories[flameAverage].rangeMid + "    Low: " + categories[flameLow].min + "    High: " + categories[flameHigh].max);                    
                }
                
                //process histogram data
                /*if (data.histograms.length > 0) {

                    counts = data.histograms[0].counts;
                    
                    var i = 0;
                    for (i = 0; i < counts.length; i++) {

                        //iVal = i * data.histograms[0].max / data.histograms[0].size;                        

                        countTotal += counts[i];
                        //valueTotal += counts[i] * iVal;
                        valueTotal += counts[i] * i;

                        //set flameLow
                        if (counts[i] > 0 && iVal < flameLow) {
                            flameLow = iVal;

                            //if (flameLow > 11)
                              //  flameLow = 11;
                        }

                        //set flameHigh
                        if (counts[i] > 0 && iVal > flameHigh) {
                            flameHigh = iVal;
                        }
                    }

                    //flameAverage = Math.round((valueTotal / countTotal) * 10) / 10;
                    flameAverage = Math.round(valueTotal / countTotal);

                    if (flameAverage < 1)
                        flameAverage = 0;
                    else if (flameAverage == 1)
                        flameAverage = 0;
                    else if (flameAverage == 2)
                        flameAverage = 2;
                    else if (flameAverage == 3)
                        flameAverage = 4;
                    else if (flameAverage == 4)
                        flameAverage = 9.5;
                    else if (flameAverage > 4)
                        flameAverage = 11;                                        
                }

                if (flameLow == 300)
                    flameLow = 0;

                flameLow = Math.round(flameLow * 10) / 10;
                flameHigh = Math.round(flameHigh * 10) / 10;*/

                //$("#WildfireRisk_flame_ave").text(flameAverage);                
                //$("#WildfireRisk_flame_min").text(flameLow);                
                //$("#WildfireRisk_flame_max").text(flameHigh);                

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

                    str += strItem;
                }

                divElement.html(str);
            }

            function errorRemainingData(error, divElement) {
                //console.log("Error: ", error.message);
                divElement.text("No data");
            }

            function requestRemainingData() {
                
                //Wildfire Forest Projection District
                sendQueryRequest(fireSiteURL, "65", "odf_fpd", $("#WildfireRisk_forest_protection_district"), resultRemainingData, errorRemainingData);
                
                //Structural Fire Protection District
                sendQueryRequest(fireSiteURL, "67", "agency", $("#WildfireRisk_structural_projection_district"), resultRemainingData, errorRemainingData);

                //Rangeland Protection Associations
                sendQueryRequest(fireSiteURL, "66", "rpa_name", $("#WildfireRisk_rangeland_protection_assoc"), resultRemainingData, errorRemainingData);

                //city or town
                sendQueryRequest(fireSiteURL, "59", "name", $("#WildfireRisk_city"), resultRemainingData, errorRemainingData);

                //urban growth boundary
                sendQueryRequest(fireSiteURL, "69", "name", $("#WildfireRisk_urban_growth_boundary"), UGB_result, UGB_error);

                //CWPP - Community Wildfire Protection Plans OR Wildland Urban Interface
                sendQueryRequest(fireSiteURL, "72", "cwpp", $("#WildfireRisk_cwpp_area"), resultRemainingData, errorRemainingData);

                //Firewise community
                sendQueryRequest(fireSiteURL, "71", "name", $("#WildfireRisk_firewise_community"), resultRemainingData, errorRemainingData);

                //Senate Bill 360 (SB360)  Classified Forestland-Urban Interface feature
                sendQueryRequest(fireSiteURL, "80", "rating", $("#WildfireRisk_senatebill_360"), SB360_result, SB360_error);                                                
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
                
                workingApp.command("ClearMarkupQuiet").execute();

                //deactivate view
                workingApp.commandRegistry.command("DeactivateView").execute("WildfireRiskPopupModuleView");

                //disableFireRiskMode();
            }
            
        }

    }
}