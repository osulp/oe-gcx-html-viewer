require(["esri/map"]);
require(["esri/tasks/ProjectParameters"]);
require(["esri/tasks/IdentifyParameters"]);
require(["esri/tasks/IdentifyTask"]);
require(["esri/tasks/LengthsParameters"]);
require(["esri/tasks/AreasAndLengthsParameters"]);
require(["esri/tasks/BufferParameters"]);
require(["esri/tasks/Geoprocessor"]);
require(["esri/tasks/locator"]);
require(["esri/tasks/PrintTask"]);
require(["esri/virtualearth/VEGeocoder"]);
require(["esri/layers/ArcGISImageServiceLayer"]);
require(["esri/layers/CSVLayer"]);
require(["esri/layers/GeoRSSLayer"]);
require(["esri/layers/GraphicsLayer"]);
require(["esri/layers/KMLLayer"]);
require(["esri/layers/StreamLayer"]);
require(["esri/layers/WFSLayer"]);
require(["esri/layers/WMTSLayer"]);
require(["esri/layers/VectorTileLayer"]);
require(["esri/toolbars/draw"]);
require(["esri/toolbars/edit"]);
require(["esri/dijit/OverviewMap"]);
require(["esri/urlUtils"]);
require(["esri/SnappingManager"]);
require(["esri/geometry/geometryEngineAsync"], function (m) { esri.geometry.geometryEngineAsync = m; });

require(["esri/arcgis/utils"]);
require(["esri/arcgis/Portal"]);
require(["esri/layers/FeatureLayer"]);
require(["esri/layers/wms"]);
require(["esri/layers/wmts"]);
require(["esri/layers/WebTiledLayer"]);
require(["esri/virtualearth/VETiledLayer"]);

require(["moment/moment"], function(moment) {
    window.moment = moment;
});

require(["dojo/on","dojo/aspect"], function (on, aspect) {
    dojo.on = on;
    dojo.aspect = aspect;
});