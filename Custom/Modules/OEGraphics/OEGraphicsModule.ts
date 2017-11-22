/// <reference path="../../../Libs/Framework.d.ts" />
/// <reference path="../../../Libs/Mapping.Infrastructure.d.ts" />

module oe.OEGraphics {
    
    export class OEGraphicsModule extends geocortex.framework.application.ModuleBase {
        
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

                this.app.eventRegistry.event("MapLoadedEvent").subscribe(this, (args) => {
                    this._onMapLoaded(args);
                });

                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
                    this._onSiteInitialized(args);
                });
            }
            
        }

        _onMapLoaded(site: geocortex.essentials.Site) {           
            //this.app.command("ZoomToInitialExtent").execute();
            //grab the geocortex map event
            //this.app.eventRegistry.event("MapClickedEvent").subscribe(null, this._handleMouseClick);
        }

        _onSiteInitialized(site: geocortex.essentials.Site) {            
            //this.app.command("ZoomToInitialExtent").execute();
        }

        _handleMouseClick(pointIn, appIn) {

            //store the point
            //var workingPointGeometry = <esri.geometry.Geometry>null;
            //workingPointGeometry = pointIn;

            //convert to a lat long version                
            //var latLongPoint = <esri.geometry.Point>esri.geometry.webMercatorToGeographic(workingPointGeometry);
            //var latOut = formateLatLong(latLongPoint.y, true);
            //var lonOut = formateLatLong(latLongPoint.x, false);

            //appIn.command("AddMarkupGeometry").execute(workingPointGeometry);

        }

    }
}