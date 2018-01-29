// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/WorkerConnection",["require","exports","./WorkerProxy"],function(f,g,e){return function(){function d(a,b,c){this.id=c;this._target="function"===typeof a?new a(this):a;this.proxy=new e(this._target,b,this)}d.prototype.invoke=function(a,b,c){return this.proxy.invoke(a,b,c,this.id)};return d}()});