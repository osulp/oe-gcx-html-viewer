
// Module 'OE_SageGrouseConsPln'
        (function () {
var markup1 = '<div class=\'download-popup-wrapper\'>    <div data-binding=\'{@hidden:isDownloading}\'>        <div data-binding=\'{@hidden:downloadReady}\'>            <p>Select an output format below and click the download button to submit your download request.  It may take a minute or two to process your request depending on the size and extent of your selected filter area.</p>            <center>                <select data-binding=\'{@source: downloadFormats}{@value: selectedFormat}\'>                    <option data-binding=\'{@template-for: downloadFormats}{value: val}{@text: label}\' />                </select>            </center>            <br />            <hr />            <br />            <center>                <div class=\'submit_download_request_btn\' data-binding=\'{@event-onclick: download}\'>                    Submit Request                </div>            </center>        </div>    </div>    <div data-binding=\'{@visible:isDownloading}\'>        <br />        <center>            <img src=\'Resources/Images/loader-small.gif\' title=\'processing request.\' /><div>                Processing your request.  Please be patient....            </div>        </center>        <br />    </div>    <div data-binding=\'{@visible:downloadReady}\'>        <br />               <center>            <p>Your download is ready! </p>            <p>                <a data-binding=\'{href:downloadUrl}\' download=\'Filtered Hex Sage-Grouse Filter\' target=\'_blank\'><img src=\'Resources/Images/Icons/download-16.png\' title=\'Download requested hexagon filtered areas.\' />&nbsp;&nbsp;Get Download</a>            </p>        </center>        <br />    </div>    <div data-binding=\'{@visible:downloadError}\'>       <p>Sorry.  Your request was not able to be completed.  You may need to try a different geographic extent or format.  If the problem continues, you can contact us at:</p>        <a href=\'mailto:virtualoregon.support@oregonstate.edu?Subject:Help%20with%20sage-grouse%20Conservation%20Planning%20Tool\' target=\'_top\'>virtualoregon.support@oregonstate.edu</a>    </div></div>';
var markup2 = '<div class=\'get-info-wrapper\' data-binding=\'{@source: get_info_layer}\'>    <div data-binding=\'{@template-for: get_info_layer}\'>        <h2 data-binding=\'{@text: layer}\'>        </h2>        <hr />        <div data-binding=\'{innerHTML: desc}\'>        </div>        <div data-binding=\'{@source:layerLinks}\'>            <div data-binding=\'{@template-for:layerLinks}\'>                <span data-binding=\'{@text:label}\'></span>                <a data-binding=\'{href:url}\' target=\'_blank\'><span data-binding=\'{@text:label}\'></span></a>            </div>        </div>    </div>    </div>';
var markup3 = '<div>    HELP!</div>';
var markup4 = '<a href=\'#\'></a><div id=\'report_area\' dir=\'ltr\'>    <div id=\'filter-summary-control\'>        <div>            <div class=\'active-filter-header-wrapper dashboard-headers\'>                <div>                    <input id=\'toggle-hex-layer\' type=\'checkbox\' data-binding=\'{@value: show_hex_layer}\' /><label for=\'toggle-hex-layer\'><b>SHOW OR HIDE HEXAGON LAYER</b></label>                </div>                <div class=\'help-tour\' data-binding=\'{@event-onclick: showTour}\'><img src=\'Resources/Images/Icons/info-12.png\' alt=\'Info Button\' />Query Tutorial</div>            </div>            <div class=\'active-filter-header-wrapper dashboard-headers example-queries\' data-binding=\'{@event-onclick: toggleExampleFilters}\'>                <div><b>EXAMPLE QUERIES</b></div>                <div data-binding=\'{class: show_example_filter_class}\'></div>            </div>            <div id=\'example-filters-wrapper\' data-binding=\'{@visible: show_example_filters}\'>                <ul data-binding=\'{@source: example_filters_collection}\'>                    <li data-binding=\'{@template-for: example_filters_collection}\'>                        <div class=\'example-list-entry-wrapper\'>                            <div data-binding=\'{id:tour_id} {@text:label} {@event-onclick:runExampleTour}\'></div>                            <div><button data-binding=\'{@event-onclick:applyExample}\'>Apply</button>                                </div>                        </div>                                            </li>                </ul>            </div>            <div id=\'active-filters\' class=\'active-filter-header-wrapper dashboard-headers\' data-binding=\'{@event-onclick: toggleFilters}\'>                <div><b>ACTIVE FILTERS</b></div>                <div data-binding=\'{class: show_filter_class}\'></div>                <div>                    <span>Selected Hexagons: </span>                    <span data-binding=\'{@text:hexCount}\'></span>                </div>            </div>            <div id=\'filter-summary\' data-binding=\'{@visible: show_filter_summary}\'>                <div data-binding=\'{@visible: has_filters}\'>                    <ul data-binding=\'{@source: filter_collection}\'>                        <li data-binding=\'{@template-for: filter_collection}\'>                            <div class=\'active-filter-details toggle-active-filter\'>                                <input type=\'checkbox\' data-binding=\'{@value: enabled}{@event-onclick:toggleFilter}\' />                            </div>                            <div class=\'active-filter-details\' data-binding=\'{@source: @context}{@template-selector:type}\'>                                <div data-binding=\'{@template-select:attribute}\'>                                    <div data-binding=\'{@text: layer}{@event-onclick:setSearch}\' title=\'Click to see in filter list.\'></div>                                    <div class=\'filter-def\' data-binding=\'{@text: filterDef}\'></div>                                </div>                                <div class=\'geo-filter\' data-binding=\'{@template-select:geographic}\'>                                    <div data-binding=\'{@text: layer}{@event-onclick:zoomToGeoFilter}\' title=\'Zoom to extent of geographic filter.\'>                                    </div>                                    <div class=\'aoi-filter-commands-wrapper\'>                                        <div class=\'filter-def\'>                                            <input type=\'checkbox\' data-binding=\'{id:layer}{@value: show}\' />                                            <label data-binding=\'{for:layer}\'>Display Boundary </label>                                        </div><div data-binding=\'{@event-onclick:zoomToGeoFilter}\' class=\'filter-def\'>                                            Zoom to extent                                        </div>                                    </div>                                </div>                            </div>                            <div class=\'active-filter-details remove\' title=\'Clear filter.\'>                                <div data-binding=\'{@event-onclick:removeFilter}\'></div>                            </div>                        </li>                    </ul>                    <div class=\'reset-filters-wrapper\'>                        <div data-binding=\'{@event-onclick:getReport}\'>Report</div>                        <div data-binding=\'{@event-onclick:downloadHexFilterAreas}\'>Download</div>                        <div id=\'clear-filters\' data-binding=\'{@event-onclick:resetFilters}\'>Clear Filters</div>                    </div>                </div>                <div class=\'no-filters\' data-binding=\'{@hidden: has_filters}\'>                    <em>No filters currently in use.</em>                </div>            </div>        </div>        <div id=\'filter-toggle\' class=\'active-filter-header-wrapper dashboard-headers tab-header-wrapper\'>            <div data-binding=\'{class: show_data_filter_class}{@event-onclick: toggleTabFilters}\'>                <div><b>DATA FILTERS</b></div>            </div>            <div data-binding=\'{class: show_geo_filter_class}{@event-onclick: toggleTabFilters}\'>                <div><b>GEOGRAPHIC FILTER</b></div>            </div>        </div>        <div id=\'geo-filter\' data-binding=\'{@visible: show_geo_filter}\'>            <div>                <span>Add a geographic filter:</span>                <fieldset>                    <legend>Draw</legend>                    <div id=\'draw-tools-wrapper\' data-binding=\'{@visible: show-draw-geo}\'>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'freehand_polygon\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Freehand</p>                            </button>                        </div>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'polygon\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-polygon-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Polygon</p>                            </button>                        </div>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'rectangle\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-rectangle-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Rectangle</p>                            </button>                        </div>                    </div>                </fieldset>                <fieldset>                    <legend>Upload</legend>                    <p>                        Choose files to upload from your computer, and they will become temporarily available on the map. Supported file types include: .csv, .xlsx, .kml, .shp, .gpx, or a .zip containing a FileGDB or shapefiles.                    </p>                    <div class=\'upload-btn\' data-binding=\'{@event-onclick: uploadAOIFilter}\'>Upload</div>                </fieldset>                <fieldset data-binding=\'{@visible: show_recent_geo_filters}\'>                    <legend>History</legend>                    <div>                        <ol class=\'ul-history-layers\' data-binding=\'{@source: geo_history_filter_collection}\'>                            <li data-binding=\'{@template-for: geo_history_filter_collection}\'>                                <div data-binding=\'{@text: geoType}\'></div>                                <div data-binding=\'{@event-onclick: viewGeoHistoryArea}\'>                                    <input data-binding=\'{id: showID}\' type=\'checkbox\' />                                    <label data-binding=\'{for: showID}\'>Show</label>                                </div>                                <div class=\'restoreGeoBtn\' data-binding=\'{@event-onclick: useGeoHistoryArea}\'>                                    Restore                                </div>                                <div class=\'remove\' data-binding=\'{@event-onclick:removeGeoHistoryArea}\'>                                    <img src=\'Resources/Images/Icons/delete-16.png\' data-binding=\'{@event-onclick:removeGeoHistoryArea}\' title=\'Clear from history.\' />                                </div>                            </li>                        </ol>                    </div>                </fieldset>            </div>        </div>        <div data-binding=\'{@visible: show_data_filter}\'>            <div id=\'quick-find-wrapper\'>                <div>Quick Find:</div>                <div>                    <input type=\'text\' data-binding=\'{@value: filterText}\' />                </div>                <div id=\'quick-find-clear\' data-binding=\'{@event-onclick:clearSearch}\'>Clear</div>            </div>            <div class=\'toggle-folders-wrapper\'>                <div data-binding=\'{@text: filter_number}\'></div>                <div data-binding=\'{@event-onclick:collapseFolders}\'>Collapse All</div>                <div data-binding=\'{@event-onclick:expandFolders}\'>Expand All</div>            </div>        </div>    </div>    <div id=\'query-filter-wrapper\' data-binding=\'{@visible: show_data_filter}\'>        <div class=\'table-cell body-content-outer-wrapper\'>            <div class=\'body-content-inner-wrapper\'>                <div class=\'body-content\'>                    <ul id=\'scroll-filter-body\' class=\'ul-query-folders\' data-binding=\'{@source: dashboard_meta_filter}\'>                        <li data-binding=\'{@template-for: dashboard_meta_filter}\'>                            <div data-binding=\'{@event-onclick:onFolderClick} {@hidden:show_selected_filters}\' class=\'folder-header-wrapper\'>                                <div class=\'tree-expander expanded\' title=\'Collapse or expand\' data-binding=\'{@visible:visible}\'>&nbsp;</div>                                <div class=\'tree-expander collapsed\' data-binding=\'{@hidden:visible}\'>&nbsp;</div>                                <div class=\'folder-title\' data-binding=\'{@text:folder}\'></div>                            </div>                            <div data-binding=\'{@visible: visible}\'>                                <ul class=\'ul-query-layers\' data-binding=\'{@source: filteredLayers}\'>                                    <li data-binding=\'{@template-for: filteredLayers}\'>                                        <div data-binding=\'{@event-onclick:onGetInfo}\'>                                            <div class=\'data-label query-layer\' data-binding=\'{@text:layerName}\'></div>                                            <div class=\'get-info-btn-wrapper\' data-binding=\'{@hidden:show_selected_filters}\'>                                                <button class=\'get-info-btn\' title=\'Click to see description of this layer.\'></button>                                            </div>                                        </div>                                        <div data-binding=\'{@source:layerDataValues}\'>                                            <div data-binding=\'{@template-for:layerDataValues}\'>                                                <div data-binding=\'{@source:@context}{@template-selector:uiType}\'>                                                    <div data-binding=\'{@template-select:checkbox}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html}\'></div>                                                    <div data-binding=\'{@template-select:rangeslider}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.html}\'></div>                                                </div>                                            </div>                                        </div>                                        <div class=\'clone-filter-desc\' data-binding=\'{@visible:show_selected_filters}\'>                                            <div data-binding=\'{innerHTML:layerDesc}\'></div>                                        </div>                                    </li>                                </ul>                            </div>                        </li>                    </ul>                </div>            </div>        </div>    </div></div>';
var markup5 = '<a href=\'#\'></a><div id=\'report_area\' dir=\'ltr\'>    <div id=\'filter-summary-control\'>        <div>            <div class=\'active-filter-header-wrapper dashboard-headers\'>                <div>                    <input id=\'toggle-hex-layer\' type=\'checkbox\' data-binding=\'{@value: show_hex_layer}\' /><label for=\'toggle-hex-layer\'><b>SHOW HEXAGONS</b></label>                </div>                <div class=\'help-tour\' data-binding=\'{@event-onclick: showTour}\'><img src=\'Resources/Images/Icons/info-12.png\' alt=\'Info Button\' />Help Tutorial</div>            </div>            <div class=\'active-filter-header-wrapper dashboard-headers\' data-binding=\'{@event-onclick: toggleFilters}\'>                <div><b>ACTIVE FILTERS</b></div>                <div data-binding=\'{class: show_filter_class}\'></div>                <div>                    <span>Selected Hexagons: </span>                    <span data-binding=\'{@text:hexCount}\'></span>                </div>            </div>            <div id=\'filter-summary\' data-binding=\'{@visible: show_filter_summary}\'>                <div data-binding=\'{@visible: has_filters}\'>                    <ul data-binding=\'{@source: filter_collection}\'>                        <li data-binding=\'{@template-for: filter_collection}\'>                            <div class=\'active-filter-details toggle-active-filter\'>                                <input type=\'checkbox\' data-binding=\'{@value: enabled}{@event-onclick:toggleFilter}\' />                            </div>                            <div class=\'active-filter-details\' data-binding=\'{@source: @context}{@template-selector:type}\'>                                <div data-binding=\'{@template-select:attribute}\'>                                    <div data-binding=\'{@text: layer}{@event-onclick:setSearch}\' title=\'Click to see in filter list.\'></div>                                    <div class=\'filter-def\' data-binding=\'{@text: filterDef}\'></div>                                </div>                                <div class=\'geo-filter\' data-binding=\'{@template-select:geographic}\'>                                    <div data-binding=\'{@text: layer}{@event-onclick:zoomToGeoFilter}\' title=\'Zoom to extent of geographic filter.\'>                                    </div>                                    <div class=\'aoi-filter-commands-wrapper\'>                                        <div class=\'filter-def\'>                                            <input type=\'checkbox\' data-binding=\'{id:layer}{@value: show}\' />                                            <label data-binding=\'{for:layer}\'>Display</label>                                        </div><div data-binding=\'{@event-onclick:zoomToGeoFilter}\' class=\'filter-def\'>                                            Zoom to extent                                        </div>                                    </div>                                </div>                            </div>                            <div class=\'active-filter-details remove\' title=\'Clear filter.\'>                                <div data-binding=\'{@event-onclick:removeFilter}\'></div>                            </div>                        </li>                    </ul>                    <div class=\'reset-filters-wrapper\'>                        <div data-binding=\'{@event-onclick:getReport}\'>Report</div>                        <div data-binding=\'{@event-onclick:downloadHexFilterAreas}\'>Download</div>                        <div id=\'clear-filters\' data-binding=\'{@event-onclick:resetFilters}\'>Clear Filters</div>                    </div>                </div>                <div class=\'no-filters\' data-binding=\'{@hidden: has_filters}\'>                    <em>No filters currently in use.</em>                </div>            </div>        </div>        <div id=\'filter-toggle\' class=\'active-filter-header-wrapper dashboard-headers tab-header-wrapper\'>            <div data-binding=\'{class: show_data_filter_class}{@event-onclick: toggleTabFilters}\'>                <div><b>DATA FILTERS</b></div>            </div>            <div data-binding=\'{class: show_geo_filter_class}{@event-onclick: toggleTabFilters}\'>                <div><b>GEOGRAPHIC FILTER</b></div>            </div>        </div>        <div id=\'geo-filter\' data-binding=\'{@visible: show_geo_filter}\'>            <div>                <span>Add a geographic filter:</span>                <fieldset>                    <legend>Draw</legend>                    <div id=\'draw-tools-wrapper\' data-binding=\'{@visible: show-draw-geo}\'>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'freehand_polygon\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Freehand</p>                            </button>                        </div>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'polygon\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-polygon-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Polygon</p>                            </button>                        </div>                        <div data-binding=\'{@event-onclick: drawAOIFilter}\' class=\'rectangle\'>                            <button class=\'toolbar-item tool\' title=\'Draw a rectangle on the map\'>                                <img src=\'Resources/Images/Icons/Toolbar/draw-rectangle-24.png\' width=\'16\' class=\'bound-visible\' alt=\'Tool\'>                <p>Rectangle</p>                            </button>                        </div>                    </div>                </fieldset>                <fieldset>                    <legend>Upload</legend>                    <p>                        Choose files to upload from your computer, and they will become temporarily available on the map. Supported file types include: .csv, .xlsx, .kml, .shp, .gpx, or a .zip containing a FileGDB or shapefiles.                    </p>                    <div class=\'upload-btn\' data-binding=\'{@event-onclick: uploadAOIFilter}\'>Upload</div>                </fieldset>                <fieldset data-binding=\'{@visible: show_recent_geo_filters}\'>                    <legend>History</legend>                    <div>                        <ol class=\'ul-history-layers\' data-binding=\'{@source: geo_history_filter_collection}\'>                            <li data-binding=\'{@template-for: geo_history_filter_collection}\'>                                <div data-binding=\'{@text: geoType}\'></div>                                <div data-binding=\'{@event-onclick: viewGeoHistoryArea}\'>                                    <input data-binding=\'{id: showID}\' type=\'checkbox\' />                                    <label data-binding=\'{for: showID}\'>Show</label>                                </div>                                <div class=\'restoreGeoBtn\' data-binding=\'{@event-onclick: useGeoHistoryArea}\'>                                    Restore                                </div>                                <div class=\'remove\' data-binding=\'{@event-onclick:removeGeoHistoryArea}\'>                                    <img src=\'Resources/Images/Icons/delete-16.png\' data-binding=\'{@event-onclick:removeGeoHistoryArea}\' title=\'Clear from history.\' />                                </div>                            </li>                        </ol>                    </div>                </fieldset>            </div>        </div>        <div data-binding=\'{@visible: show_data_filter}\'>            <div id=\'quick-find-wrapper\'>                <div>Quick Find:</div>                <div>                    <input type=\'text\' data-binding=\'{@value: filterText}\' />                </div>                <div id=\'quick-find-clear\' data-binding=\'{@event-onclick:clearSearch}\'>Clear</div>            </div>            <div class=\'toggle-folders-wrapper\'>                <div data-binding=\'{@text: filter_number}\'></div>                <div data-binding=\'{@event-onclick:collapseFolders}\'>Collapse All</div>                <div data-binding=\'{@event-onclick:expandFolders}\'>Expand All</div>            </div>        </div>    </div>    <div id=\'query-filter-wrapper\' data-binding=\'{@visible: show_data_filter}\'>        <div class=\'table-cell body-content-outer-wrapper\'>            <div class=\'body-content-inner-wrapper\'>                <div  class=\'body-content\'>                    <ul id=\'scroll-filter-body\' class=\'ul-query-folders\' data-binding=\'{@source: dashboard_meta_filter}\'>                        <li data-binding=\'{@template-for: dashboard_meta_filter}\'>                            <div data-binding=\'{@event-onclick:onFolderClick} {@hidden:show_selected_filters}\' class=\'folder-header-wrapper\'>                                <div class=\'tree-expander expanded\' title=\'Collapse or expand\' data-binding=\'{@visible:visible}\'>&nbsp;</div>                                <div class=\'tree-expander collapsed\' data-binding=\'{@hidden:visible}\'>&nbsp;</div>                                <div class=\'folder-title\' data-binding=\'{@text:folder}\'></div>                            </div>                            <div data-binding=\'{@visible: visible}\'>                                <ul class=\'ul-query-layers\' data-binding=\'{@source: filteredLayers}\'>                                    <li data-binding=\'{@template-for: filteredLayers}\'>                                        <div data-binding=\'{@event-onclick:onGetInfo}\'>                                            <div class=\'data-label query-layer\' data-binding=\'{@text:layerName}\'></div>                                            <div class=\'get-info-btn-wrapper\' data-binding=\'{@hidden:show_selected_filters}\'>                                                <button class=\'get-info-btn\' title=\'Click to see description of this layer.\'></button>                                            </div>                                        </div>                                                                               <div data-binding=\'{@source:layerDataValues}\'>                                            <div data-binding=\'{@template-for:layerDataValues}\'>                                                                                               <div data-binding=\'{@source:@context}{@template-selector:uiType}\'>                                                    <div data-binding=\'{@template-select:checkbox}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html}\'></div>                                                </div>                                            </div>                                        </div>                                        <!--<div data-binding=\'{@source:filters}\'>                                                <div data-binding=\'{@template-for:filters}\'>                                                    <div data-binding=\'{@source:@context}{@template-selector:uiType}\'>                                                        <div data-binding=\'{@template-select:Checkbox    }{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html}\'></div>                                                        <div data-binding=\'{@template-select:RadioButton    }{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/radiobutton.html}\'></div>                                                        <div data-binding=\'{@template-select:Slider    }{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.html}\'></div>                                                        <div data-binding=\'{@template-select:RangeSlider    }{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.html}\'></div>                                                    </div>                                                </div>                                            </div>-->                                        <div class=\'clone-filter-desc\' data-binding=\'{@visible:show_selected_filters}\'>                                            <span data-binding=\'{@text:DESC}\'></span>                                        </div>                                    </li>                                </ul>                            </div>                            <!--<div data-binding=\'{@visible: visible}\'>                                <ul class=\'ul-query-layers\' data-binding=\'{@source: filteredLayers}\'>                                    <li data-binding=\'{@template-for: filteredLayers}\'>                                        <div data-binding=\'{@event-onclick:onGetInfo}\'>                                            <div class=\'data-label query-layer\' data-binding=\'{@text:DATALAYER}\'></div>                                            <div class=\'get-info-btn-wrapper\' data-binding=\'{@hidden:show_selected_filters}\'>                                                <button class=\'get-info-btn\' title=\'Click to see description of this layer.\'></button>                                            </div>                                        </div>                                        <div data-binding=\'{@source: @context}{@template-selector:UITYPE}\'>                                            <div data-binding=\'{@template-select:Checkbox}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html}\'></div>                                            <div data-binding=\'{@template-select:RadioButton}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/radiobutton.html}\'></div>                                            <div data-binding=\'{@template-select:Slider}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.html}\'></div>                                            <div data-binding=\'{@template-select:RangeSlider}{@template: geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.html}\'></div>                                        </div>                                        <div class=\'clone-filter-desc\' data-binding=\'{@visible:show_selected_filters}\'>                                            <span  data-binding=\'{@text:DESC}\'></span>                                        </div>                                    </li>                                </ul>                            </div>-->                        </li>                    </ul>                </div>            </div>        </div>    </div></div>';
var markup6 = '<div class=\'filter_options_wrapper\'>            <input type=\'checkbox\' data-binding=\'{id: optionID}{@value: optionValue}{@event-onchange:onUIChangeEvtHandler}\' />        <label data-binding=\'{for: optionID} {@text: label}\'></label>    </div>';
var markup7 = '<div class=\'filter_options_wrapper\' data-binding=\'{@source: DATAVALUES}\'>    <div data-binding=\'{@template-for: DATAVALUES}\'>        <input type=\'checkbox\' data-binding=\'{id: optionID}{@value: optionValue}{@event-onchange:onUIChangeEvtHandler}\' />        <label data-binding=\'{for: optionID} {@text: option}\'>                    </label>    </div>    </div>';
var markup8 = '<div class=\'filter_options_wrapper\' data-binding=\'{@source: DATAVALUES}\'>    <div data-binding=\'{@template-for: DATAVALUES}\'>        <input type=\'radio\' data-binding=\'{id: optionID}{name:optionLayer}{@value: optionValue}{@event-onchange:onUIChangeEvtHandler}\' />        <label data-binding=\'{for: optionID} {@text: option}\'>        </label>    </div></div>';
var markup9 = '<div class=\'filter_options_wrapper\'>    <div>        <span>Selected Values:</span>        <span type=\'text\' data-binding=\'{id: optionValID}\' readonly style=\'border:0;color:#f6931f;font-weight:bold\'></span>    </div>    <div class=\'slider\' data-binding=\'{id: optionID}\'>    </div></div>';
var markup10 = '<div class=\'filter_options_wrapper\' data-binding=\'{@source: DATAVALUES}\'>    <div data-binding=\'{@template-for: DATAVALUES}\'>        <div>            <span>Selected Values:</span>            <span type=\'text\' data-binding=\'{id: optionValID}\' readonly style=\'border:0;color:#f6931f;font-weight:bold\'></span>        </div>        <div class=\'slider\' data-binding=\'{id: optionID}\'>        </div>            </div></div>';
var markup11 = '<div class=\'filter_options_wrapper\' data-binding=\'{@source: DATAVALUES}\'>    <div data-binding=\'{@template-for: DATAVALUES}\'>        <div>            <span>Value:</span>            <span type=\'text\' data-binding=\'{id: optionValID}\' readonly style=\'border:0;color:#f6931f;font-weight:bold\'></span>        </div>        <div class=\'slider\' data-binding=\'{id: optionID}\'>        </div>            </div></div>';
var markup12 = '<div class=\'filter_options_wrapper\' data-binding=\'{@source: DATAVALUES}\'>    <div data-binding=\'{@template-for: DATAVALUES}\'>        <div>            <span>Value:</span>            <span type=\'text\' data-binding=\'{id: optionValID}\' readonly style=\'border:0;color:#f6931f;font-weight:bold\'></span>        </div>        <div class=\'slider\' data-binding=\'{id: optionID}\'>        </div>            </div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnDownloadView": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
    var OE_SageGrouseConsPlnDownloadView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseConsPlnDownloadView, _super);
        function OE_SageGrouseConsPlnDownloadView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.gpExtractHexURL = 'https://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/geoprocessing/extractFilteredHex/GPServer/extractFilteredHex';
            return _this;
        }
        OE_SageGrouseConsPlnDownloadView.prototype.activated = function () {
            this.viewModel.isDownloading.set(false);
            this.viewModel.downloadReady.set(false);
            this.viewModel.downloadError.set(false);
        };
        OE_SageGrouseConsPlnDownloadView.prototype.download = function () {
            var _this = this;
            this.viewModel.isDownloading.set(true);
            this.viewModel.downloadError.set(false);
            this.viewModel.downloadReady.set(false);
            var gp = new esri.tasks.Geoprocessor(this.gpExtractHexURL);
            var gpParams = {
                "LayerDefinition": this.viewModel.active_layer_def,
                "Feature_Format": this.viewModel.selectedFormat.get()
            };
            gp.submitJob(gpParams, function (results, messages) {
                console.log('results!', results, messages);
                if (results.jobStatus === 'esriJobSucceeded') {
                    gp.getResultData(results.jobId, "SageConHexDownload_zip", function (result) {
                        _this.viewModel.isDownloading.set(false);
                        _this.viewModel.downloadReady.set(true);
                        _this.viewModel.downloadUrl.set(result.value.url);
                    });
                }
                else {
                    _this.viewModel.downloadError.set(true);
                }
            }, function (status) {
                console.log('status', status);
            }, function (error) {
                console.log('error :(', error);
            });
        };
        return OE_SageGrouseConsPlnDownloadView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseConsPlnDownloadView = OE_SageGrouseConsPlnDownloadView;
});

},
"geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnFilterInfoView": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
    var myWorkflowContext;
    var OE_SageGrouseConsPlnFilterInfoView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseConsPlnFilterInfoView, _super);
        function OE_SageGrouseConsPlnFilterInfoView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        return OE_SageGrouseConsPlnFilterInfoView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseConsPlnFilterInfoView = OE_SageGrouseConsPlnFilterInfoView;
});

},
"geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnHelpTutorialView": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
    var myWorkflowContext;
    var OE_SageGrouseConsPlnHelpTutorialView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseConsPlnHelpTutorialView, _super);
        function OE_SageGrouseConsPlnHelpTutorialView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SageGrouseConsPlnHelpTutorialView.prototype.activated = function () {
            //$('.modal-overlay.active')
        };
        return OE_SageGrouseConsPlnHelpTutorialView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseConsPlnHelpTutorialView = OE_SageGrouseConsPlnHelpTutorialView;
});

},
"geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnModule": function () {
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
    var OE_SageGrouseConsPlnModule = /** @class */ (function (_super) {
        __extends(OE_SageGrouseConsPlnModule, _super);
        function OE_SageGrouseConsPlnModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_SageGrouseConsPlnModule.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args);
                });
            }
        };
        OE_SageGrouseConsPlnModule.prototype._onSiteInitialized = function (site) {
            console.log('cons planning initialized!');
        };
        return OE_SageGrouseConsPlnModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_SageGrouseConsPlnModule = OE_SageGrouseConsPlnModule;
});

},
"geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnView": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewBase", "geocortex/framework/observables", "geocortex/infrastructure/commandArgs/AddStatusArgs"], function (require, exports, ViewBase_1, observables_1, AddStatusArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_SageGrouseConsPlnView = /** @class */ (function (_super) {
        __extends(OE_SageGrouseConsPlnView, _super);
        function OE_SageGrouseConsPlnView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.jquiSlider = HTMLElement;
            _this.amount = HTMLElement;
            //aoiGeometry: any;
            _this.gpDissolveURL = 'https://lib-gis3.library.oregonstate.edu/arcgis/rest/services/geoprocessing/dissolve/GPServer/dissolve';
            _this.gpExtractHexURL = 'https://lib-arcgis5.library.oregonstate.edu/arcgis/rest/services/geoprocessing/extractFilteredHex/GPServer/extractFilteredHex';
            _this.uploadGeoFilterLayerName = '';
            _this.canShowTour = true;
            _this.hasLoaded = false;
            _this.geo_filter = {
                enabled: false,
                ids: [],
                type: '',
                layer: null
            };
            return _this;
        }
        OE_SageGrouseConsPlnView.prototype.activated = function () {
            var _this = this;
            if (!this.isActive) {
                if (this.regionName === "RightPanelRegion") {
                    ////set right panel to display and fire map resize event to get map displaying properly
                    $(".large-shell-right").css("display", "block");
                    $(".large-shell-center").css("right", "350px");
                    this.app.commandRegistry.command("RecenterMapOnNextMapResize").execute();
                    this.app.commandRegistry.command("MapResize").execute();
                }
                //this.setDefaultFilters(true);
                this.viewModel.show_hex_layer.bind(this, function () {
                    _this.viewModel._toggleLayerDisplay('HexSageCon', 'HexBaseScored', _this.viewModel.show_hex_layer.get());
                    _this.viewModel._toggleLayerDisplay('HexBaseScoredFill', 'HexBaseScoredFill', _this.viewModel.show_hex_layer.get());
                });
                if (this.drawToolBar == null) {
                    this.esriMap = this.app.site.essentialsMap.getMap();
                    this.drawToolBar = new esri.toolbars.Draw(this.esriMap);
                    this.drawToolBar.on("draw-end", function (evt) {
                        var geoType = '';
                        switch (evt.target._geometryType) {
                            case 'rectangle':
                                geoType = 'Rectangle';
                                break;
                            case 'polygon':
                                geoType = 'Polygon';
                                break;
                            case 'freehandpolygon':
                            default:
                                geoType = 'Freehand';
                                break;
                        }
                        _this.viewModel.aoiGeometry = evt.geometry;
                        _this.geo_filter.type = geoType;
                        _this.geo_filter.layer = null;
                        _this.uploadGeoFilterLayerName = '';
                        _this.drawToolBar.deactivate();
                        _this.esriMap.showZoomSlider();
                        _this.app.commandRegistry.command("AddTemporaryMarkupGeometry").execute(evt.geometry);
                        _this.app.commandRegistry.command("RemoveNotification").execute(_this.displayNotification.id);
                        //query to get ids to include in layer def                    
                        var QueryTask = new esri.tasks.QueryTask(_this.hex_layer_url);
                        var Query = new esri.tasks.Query();
                        Query.geometry = evt.geometry;
                        Query.returnGeometry = false;
                        Query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
                        //Query["returnIdsOnly"] = true;                    
                        QueryTask.executeForIds(Query, function (results) {
                            _this.geo_filter.enabled = true;
                            _this.geo_filter.ids = results;
                            _this.updateQuery();
                            _this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                            _this.zoomToGeoFilter();
                        });
                    });
                }
                //subscribe to the UploadDataCompletedEvent in case files get uploaded.
                this.app.eventRegistry.event("UploadDataCompletedEvent").subscribe(this, function (uploadInfo) {
                    ////set uploadGeoFilterLayer to upload name and turn off display    
                    _this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                    _this.uploadGeoFilterLayerName = uploadInfo.layerDetailsResults.details.layerName;
                    _this.viewModel._toggleLayerDisplay(_this.uploadGeoFilterLayerName, _this.uploadGeoFilterLayerName, false);
                    _this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Updating geographic filter to use uploaded data...', null, null, null, null, true));
                    if (uploadInfo.mainResponse.featureCollection.layers.length > 0) {
                        //need to dissolve into one feature geometry                        
                        var uploadFS_1 = new esri.tasks.FeatureSet();
                        uploadInfo.mainResponse.featureCollection.layers[0].featureSet.features.forEach(function (feature) {
                            var graphic = new esri.Graphic({
                                geometry: feature.geometry,
                                attributes: feature.attributes
                            });
                            uploadFS_1.features.push(graphic);
                        });
                        var gpInputFS = { 'InputFeatures': uploadFS_1 };
                        var gptask_1 = new esri.tasks.Geoprocessor(_this.gpDissolveURL);
                        gptask_1.submitJob(gpInputFS, function (result) {
                            gptask_1.getResultData(result.jobId, "dissolved_features", function (df) {
                                _this.setUploadGeometry(df.value.features[0].geometry);
                                _this.zoomToGeoFilter();
                            }, function (err) {
                                console.log('error getting gp result data', err);
                            });
                        }, function (status) {
                            console.log('status', status);
                        }, function (error) {
                            console.log('gp error', error);
                        });
                    }
                    var mService = _this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === _this.uploadGeoFilterLayerName; }).length > 0 ? _this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === _this.uploadGeoFilterLayerName; })[0] : null;
                    var layer = mService.findLayerByName(_this.uploadGeoFilterLayerName);
                    _this.geo_filter.layer = layer;
                    window.setTimeout(function () {
                        _this.app.commandRegistry.command("RemoveUserAddedLayer").execute(layer);
                        _this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");
                    }, 50);
                });
                this.viewModel.show_selected_filters.set(false);
                this.app.eventRegistry.event("GraphicDrawCompletedEvent").subscribe(this, function (sender) {
                    console.log('graphic drawing event!', sender);
                    var lineSymbol = sender.sender.lineSymbol;
                    lineSymbol.color.r = 0;
                    lineSymbol.color.b = 255;
                    lineSymbol.color.g = 255;
                    var fillSymbolOutline = sender.sender.fillSymbol.outline;
                    fillSymbolOutline.color.r = 0;
                    fillSymbolOutline.color.b = 255;
                    fillSymbolOutline.color.g = 255;
                });
                window.setTimeout(function () {
                    _this.showTour(null, null, _this);
                }, 50);
            }
        };
        OE_SageGrouseConsPlnView.prototype.showTour = function (_evt, _el, context, example) {
            if (this.canShowTour || _el) {
                this.hopscotch = window["hopscotch"] ? window["hopscotch"] : null;
                if (this.hopscotch) {
                    // Set the context of the scope for the function callbacks to relate to the right context.  Checks against filterView of viewModel which gets passed on click events.
                    var thisScope = example ? context : context.filterView ? this : context;
                    // Define the tour!
                    var tour_id = example ? example.tour_id : 'default';
                    var tour = void 0;
                    switch (tour_id) {
                        case 'herbicide_vale':
                        case 'herbicide_no_sagebrush':
                        case 'juniper_removal':
                            this.activeTour = example;
                            tour = {
                                id: example.tour_id,
                                steps: [
                                    {
                                        title: "EXAMPLE: " + example.label,
                                        content: example.description,
                                        target: '#' + example.tour_id,
                                        yOffset: -20,
                                        placement: "right",
                                        showCTAButton: true,
                                        ctaLabel: "Apply",
                                        onCTA: function (evt) {
                                            thisScope.applyExample(null, null, thisScope.activeTour);
                                        }
                                    }
                                ],
                                showCloseButton: false,
                                showPrevButton: false,
                            };
                            break;
                        case 'default':
                        default:
                            tour = {
                                id: "cons-pln-tour",
                                steps: [
                                    {
                                        title: "Tour the customized query features",
                                        content: "The Query Data Tool allows you to easily construct a customized, web-based query by filtering values of multiple data layers. The tool queries hexagons (1 square mile in size) across the sagebrush landscape in Oregon (displayed in blue over the map). As filters are applied, hexagons are removed from the selection to identify areas of interest. Click the Next button to continue through this 6-step tutorial.",
                                        target: ".panel-title-contents.bound-visible-inline",
                                        yOffset: -20,
                                        placement: "right",
                                        showCTAButton: _el ? false : true,
                                        ctaLabel: "Don't Show Again",
                                        onCTA: function () {
                                            thisScope.canShowTour = false;
                                            thisScope.hopscotch.endTour();
                                        }
                                    },
                                    {
                                        title: "Show or hide hexagon layer",
                                        content: "Use the SHOW OR HIDE HEXAGON LAYER check box at the top of the screen to show (check) or hide (uncheck) the blue hexagon layer. By unchecking the box, you can view data layers underneath. View or change data layers being displayed through the red <button class=\"wtm-button bound-visible\" style=\"background: rgb(26, 114, 196) none repeat scroll 0 % 0 %;\">I want to...</button>  button in the map or by selecting the layers tab in the lower left corner of the screen (after unchecking the box). Then check the box again to view your query.",
                                        target: "#toggle-hex-layer",
                                        placement: "right",
                                        yOffset: -20
                                    },
                                    {
                                        title: "View and modify example queries",
                                        content: "The EXAMPLE QUERIES section shows three sample queries targeted for specific management questions. These queries can be viewed as examples and/or modified to reflect specific criteria for a question or area of interest.",
                                        target: ".example-queries",
                                        placement: "right",
                                        yOffset: -20,
                                        onShow: function () {
                                            thisScope.toggleTabFilters(null, null, null, 'Data');
                                            thisScope.viewModel.show_example_filters.set(true);
                                        }
                                    },
                                    {
                                        title: "Show your current query selection",
                                        content: "As layers are filtered, the ACTIVE FILTERS section will show which layers are selected and what criteria are defined in the selection. To remove a filter, click the x button to the right of the filter name. Once a selection has been made, you will see the option to generate a report, download your selected hexagons, and clear all filters. To download base data layers, use the Download Data tool under the red <button class=\"wtm-button bound-visible\" style=\"background: rgb(26, 114, 196) none repeat scroll 0 % 0 %;\">I want to...</button> menu.",
                                        target: "#active-filters",
                                        placement: "right",
                                        yOffset: -20,
                                        onShow: function () {
                                            //thisScope.toggleTabFilters(null, null, null, 'Data');
                                            //thisScope.viewModel.show_example_filters.set(false); 
                                        },
                                    },
                                    {
                                        title: "Query based on data layers or geographic area",
                                        content: "Choose the DATA FILTERS section (left) or GEOGRAPHIC FILTER section (right). Data filters change query criteria through check boxes or slider bars. Geographic filters limit the area of your selection by drawing an area of interest or uploading a shapefile delineating an area. Both data filters and geographic filters can be applied in the same query.",
                                        target: "#filter-toggle",
                                        placement: "right",
                                        yOffset: -20
                                        //onShow: () => {
                                        //    thisScope.toggleTabFilters(null, null, null, 'Data');
                                        //    thisScope.viewModel.filterText.set('wi');
                                        //},
                                        //showCTAButton: true,
                                        //ctaLabel: "Show me",
                                        //onCTA: () => {
                                        //    thisScope.viewModel.filterText.set('wi');
                                        //    $(demoFilterID).click();
                                        //}
                                    },
                                    {
                                        title: "Find a data filter",
                                        content: "Scroll through the data filters below or search by name through the Quick Find menu. Data layers for filtering are organized into four folders by theme: Ownership and Management Designation, Existing Condition, Restoration Potential, and Energy Development Potential. Expand and contract the folders by clicking the plus or minus box to the left of the folder name.",
                                        target: ".ul-query-folders",
                                        placement: "right",
                                    },
                                    {
                                        title: "Adjust filter settings",
                                        content: "Change the filter settings by selecting or de-selecting check boxes, or modifying the range sliders by clicking or sliding the bar. For more information about the data layers available for filtering, click the (i)  icon to the right of the layer name.",
                                        target: ".ul-query-layers",
                                        yOffset: -20,
                                        placement: "right",
                                    }
                                    //{
                                    //    title: "Show/Hide selected hexagons",
                                    //    content: "To toggle the display of the selected hexagon layer, use this checkbox.",
                                    //    target: ".active-filter-header-wrapper.dashboard-headers",
                                    //    placement: "right",
                                    //    yOffset: -20,
                                    //    showCTAButton: true,
                                    //    ctaLabel: "Show me",
                                    //    onCTA: () => {
                                    //        $("#toggle-hex-layer").click();
                                    //    }
                                    //},
                                ],
                                showCloseButton: true,
                                showPrevButton: true,
                                i18n: {
                                    stepNums: ['', '1', '2', '3', '4', '5', '6', '7']
                                },
                                onEnd: function () {
                                    thisScope.viewModel.show_example_filters.set(false);
                                    thisScope.resetFilters();
                                    thisScope.clearSearch();
                                },
                                onClose: function () {
                                    thisScope.viewModel.show_example_filters.set(false);
                                    thisScope.resetFilters();
                                    thisScope.clearSearch();
                                }
                            };
                            break;
                    }
                    // Start the tour!
                    this.hopscotch.startTour(tour);
                }
            }
        };
        OE_SageGrouseConsPlnView.prototype.setUploadGeometry = function (geometry) {
            var _this = this;
            this.viewModel.aoiGeometry = geometry;
            //query to get ids to include in layer def                    
            var QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
            var Query = new esri.tasks.Query();
            Query.geometry = this.viewModel.aoiGeometry;
            Query.returnGeometry = false;
            Query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
            QueryTask.executeForIds(Query, function (results) {
                _this.geo_filter.enabled = true;
                _this.geo_filter.ids = results;
                _this.geo_filter.type = _this.uploadGeoFilterLayerName;
                _this.updateQuery();
                _this.app.commandRegistry.command("RemoveStatus").execute();
                _this.viewModel.filter_collection.get().forEach(function (fc) {
                    if (fc.layer === 'Geographic Filter: Vale BLM District') {
                        fc.show.set(true);
                    }
                });
            }, function (err) {
                console.log('error', err);
            });
        };
        OE_SageGrouseConsPlnView.prototype.loadExampleGeo = function (url, geoname) {
            this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Updating geographic filter to show ' + geoname + ' ...', null, null, null, null, true));
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                context: this,
                success: function (config) {
                    var _this = this;
                    var uploadFS = new esri.tasks.FeatureSet();
                    config.forEach(function (feature) {
                        var graphic = new esri.Graphic({
                            geometry: feature.geometry,
                            attributes: feature.attributes
                        });
                        uploadFS.features.push(graphic);
                    });
                    var gpInputFS = { 'InputFeatures': uploadFS };
                    var gptask = new esri.tasks.Geoprocessor(this.gpDissolveURL);
                    gptask.submitJob(gpInputFS, function (result) {
                        gptask.getResultData(result.jobId, "dissolved_features", function (df) {
                            _this.uploadGeoFilterLayerName = 'Vale BLM District';
                            _this.setUploadGeometry(df.value.features[0].geometry);
                            _this.zoomToGeoFilter();
                            _this.toggleTabFilters(null, null, null, null, 'Data');
                        }, function (err) {
                            console.log('error getting gp result data', err);
                        });
                    }, function (status) {
                        console.log('status', status);
                    }, function (error) {
                        console.log('gp error', error);
                    });
                },
                error: function (err) {
                    console.log('fail', err);
                }
            });
        };
        OE_SageGrouseConsPlnView.prototype.setDefaultFilters = function (reset) {
            var thisScope = this;
            // create jq ui options
            thisScope.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                folder.layers.getItems().forEach(function (layer) {
                    layer.layerDataValues.getItems().forEach(function (dv) {
                        switch (dv.uiType) {
                            case "RangeSlider":
                            case "rangeslider":
                            case "Slider":
                                var categories = dv.fields[0].values ? dv.fields[0].values : [];
                                var min = dv.min
                                    ? parseFloat(dv.min)
                                    : 0;
                                var max = dv.max ?
                                    parseFloat(dv.max)
                                    : 100;
                                var minVal = reset
                                    ? min
                                    : dv.optionValue.get()
                                        ? dv.optionValue.get()[0]
                                            ? dv.optionValue.get()[0]
                                            : dv.optionValue.get().min
                                        : min;
                                minVal = minVal !== undefined ? minVal : min;
                                var maxVal = reset ? max
                                    : dv.optionValue.get()
                                        ? dv.optionValue.get()[1]
                                            ? dv.optionValue.get()[1]
                                            : dv.optionValue.get().max
                                        : max;
                                maxVal = maxVal !== undefined ? maxVal : min;
                                var increment = dv.increment ? parseFloat(dv.increment) : 1;
                                $("#" + dv.optionValID).html(categories.length > 1
                                    ? (categories[0].label + ' - ' + categories[max].label)
                                    : dv.uiType === 'rangeslider' ?
                                        minVal.toString() + " - " + maxVal.toString()
                                        : maxVal.toString());
                                ///////////////////////////////////////
                                // RangeSlider Plugin Alternate option with bubble handles
                                //////////////////////////////////////
                                //implement then destroy in order to recreate for updating.
                                //try {        
                                //    if (thisScope.hasLoaded) {
                                //        $("#" + dv.optionID).rangeSlider('destroy');
                                //    }
                                //} catch (ex) {}
                                //$("#" + dv.optionID).rangeSlider({
                                //    symmetricPositionning: true,
                                //    bounds: {
                                //        min: min,
                                //        max: max
                                //    },
                                //    step: increment,
                                //    defaultValues: {
                                //        min: minVal,
                                //        max: maxVal
                                //    },
                                //    formatter: function (val) {
                                //        if (categories.length > 1) {
                                //            return categories[parseInt(val)]['label'];
                                //        }
                                //        else {
                                //            return val.toString().indexOf('.') !== -1 ? (Math.round(0.04 * 100) / 100) : val;
                                //        }
                                //    }
                                //});
                                //$("#" + dv.optionID).bind("valuesChanged", function (event, data) {
                                //    var updateObj = {
                                //        id: event.target
                                //            ? event.target['id']
                                //            : event.srcElement.id !== ""
                                //                ? event.srcElement.id
                                //                : event.srcElement.parentNode["id"],
                                //        values: data.values ? data.values : data.value
                                //    };
                                //    thisScope.updateQuery(updateObj);
                                //});
                                //$("#" + dv.optionID).rangeSlider("resize");
                                ////////////////////////////////////////////////
                                // Traditional JQuery Rangeslider
                                ////////////////////////////////////////////////
                                $("#" + dv.optionID).slider({
                                    range: dv.uiType === 'rangeslider',
                                    step: increment,
                                    min: min,
                                    max: max,
                                    value: dv.uiType === 'slider' ? maxVal : null,
                                    values: dv.uiType === 'rangeslider' ? [minVal ? minVal : min, maxVal ? maxVal : max] : null,
                                    slide: function (_event, ui) {
                                        //if ((ui.values[0] + .005) >= ui.values[1]) {
                                        //    return false;
                                        //}
                                        if (ui.values[0] == ui.values[1]) {
                                            $(this).addClass('touch');
                                        }
                                        else {
                                            $(this).removeClass('touch');
                                        }
                                        $("#" + this.id + "Val").html(categories.length > 1
                                            ? (categories[ui.values[0]].label + ' - ' + categories[ui.values[1]].label)
                                            : ui.values
                                                ? ui.values[0] + (dv.uiType === 'rangeslider' ? " - " + ui.values[1] : '')
                                                : ui.value.toString());
                                    },
                                    stop: function (event, ui) {
                                        console.log('now run something', event);
                                        var updateObj = {
                                            id: event.target
                                                ? event.target['id']
                                                : event.srcElement.id !== ""
                                                    ? event.srcElement.id
                                                    : event.srcElement.parentNode["id"],
                                            values: ui.values ? ui.values : ui.value
                                        };
                                        thisScope.updateQuery(updateObj);
                                    }
                                });
                                if (reset) {
                                    dv.optionValue.set(null);
                                }
                                break;
                            case "checkbox":
                                if (reset) {
                                    dv.optionValue.set(dv.default ? dv.default !== 'unchecked' : true);
                                }
                                break;
                            default:
                                break;
                        }
                    });
                });
            });
            if (reset) {
                //reset layerDef for layer
                this.setLayerDef("1=1");
            }
            thisScope.hasLoaded = true;
        };
        OE_SageGrouseConsPlnView.prototype.onGetInfo = function (_event, _element, context) {
            var layerInfo = {
                layer: context.layerName,
                desc: context.layerDesc,
                layerLinks: context.layerLinks
            };
            this.viewModel.get_info_layer.set([layerInfo]);
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnFilterInfoView");
        };
        OE_SageGrouseConsPlnView.prototype.onFolderClick = function (_event, _element, context) {
            context.visible.set(!context.visible.get());
        };
        OE_SageGrouseConsPlnView.prototype.onUIChangeEvtHandler = function (_event, _element, context) {
            var thisScope = this;
            if (context.uiType === 'RadioButton') {
                //need to turn off previous value if any since the value binding doesn't seem to work with radio button groups.
                this.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                    folder.layers.getItems().forEach(function (layer) {
                        if (layer.layerName === context.optionLayer) {
                            layer.layerDataValues.getItems().forEach(function (dv) {
                                if (dv.optionID !== context.optionID) {
                                    dv.optionValue.set(null);
                                }
                            });
                        }
                    });
                });
            }
            window.setTimeout(function () {
                thisScope.updateQuery();
            }, 50);
        };
        OE_SageGrouseConsPlnView.prototype.applyExample = function (_evt, _elem, cntx) {
            this.app.commandRegistry.command("AddStatus").execute(new AddStatusArgs_1.AddStatusArgs('Applying example query: ' + cntx.label, null, null, null, null, true));
            this.toggleTabFilters(null, null, null, 'Data');
            try {
                this.resetFilters();
            }
            catch (ex) { }
            var thisScope = this;
            window.setTimeout(function () {
                thisScope.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                    folder.layers.getItems().forEach(function (layer) {
                        layer.layerDataValues.getItems().forEach(function (dv) {
                            //search for id
                            cntx.filters.forEach(function (f) {
                                if (f.filter_id === dv.optionID) {
                                    dv.optionValue.set(f.ui_type === 'checkbox' ? f.value : [f.min, f.max]);
                                }
                            });
                        });
                    });
                });
                thisScope.setDefaultFilters();
                if (cntx.geo_filter) {
                    thisScope.loadExampleGeo(cntx.geo_filter.geojson_url, cntx.geo_filter.geo_name);
                }
                else {
                    thisScope.updateQuery();
                }
                thisScope.app.commandRegistry.command("RemoveStatus").execute();
            }, 100);
        };
        OE_SageGrouseConsPlnView.prototype.runExampleTour = function (_evt, _elem, cntx) {
            this.showTour(null, _elem, this, cntx);
        };
        OE_SageGrouseConsPlnView.prototype.toggleFilters = function () {
            this.viewModel.show_filter_summary.set(!this.viewModel.show_filter_summary.get());
            this.viewModel.show_filter_class.set(!this.viewModel.show_filter_summary.get() ? 'show-filters' : 'hide-filters');
            this.viewModel._resizeFilterList();
        };
        OE_SageGrouseConsPlnView.prototype.toggleExampleFilters = function () {
            this.viewModel.show_example_filters.set(!this.viewModel.show_example_filters.get());
            this.viewModel.show_example_filter_class.set(!this.viewModel.show_example_filters.get() ? 'show-filters' : 'hide-filters');
            this.viewModel._resizeFilterList();
        };
        OE_SageGrouseConsPlnView.prototype.toggleFilter = function (_evt, _elem, cntx) {
            if (cntx.type === 'geographic') {
                this.geo_filter.enabled = !this.geo_filter.enabled; //cntx.enabled.get();
            }
            else {
                this.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                    folder.layers.getItems().forEach(function (layer) {
                        if (layer.layerName === cntx.layer) {
                            layer.enabled.set(!layer.enabled.get());
                            layer.needsUpdate = true;
                        }
                        ;
                    });
                });
            }
            this.updateQuery();
        };
        OE_SageGrouseConsPlnView.prototype.toggleTabFilters = function (_a, _b, _c, activeTab) {
            var showData = activeTab
                ? activeTab === 'Data'
                : !this.viewModel.show_data_filter.get();
            var showGeo = activeTab ? activeTab === 'Geo' :
                !this.viewModel.show_geo_filter.get();
            this.viewModel.show_data_filter.set(showData);
            this.viewModel.show_data_filter_class.set(!showData ? 'tab-header show-filters' : 'tab-header hide-filters');
            this.viewModel.show_geo_filter.set(showGeo);
            this.viewModel.show_geo_filter_class.set(!showGeo ? 'tab-header show-filters' : 'tab-header hide-filters');
            this.viewModel._resizeFilterList();
        };
        OE_SageGrouseConsPlnView.prototype.resetFilters = function () {
            this.app.commandRegistry.command("ClearMarkupQuiet").execute();
            this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            this.geo_filter.enabled = false;
            this.geo_filter.ids = [];
            this.viewModel.aoiGeometry = null;
            this.viewModel.geo_history_filter_collection.refresh();
            this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 0);
            this.setDefaultFilters(true);
            this.updateQuery();
        };
        OE_SageGrouseConsPlnView.prototype.drawAOIFilter = function (_evt, elem, _cntx) {
            var drawType = elem.className.toUpperCase();
            var displayImageProps = { altText: "", uri: "" };
            var closeBtn = { text: 'Close' };
            this.displayNotification = { id: elem.className, text: '', iconProperties: displayImageProps, closeButton: closeBtn };
            switch (elem.className) {
                case "rectangle":
                    displayImageProps.altText = "Click and drag to draw a rectangle on the map.";
                    displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-rectangle-24.png";
                    this.displayNotification.text = "Click and drag to draw a rectangle on the map.";
                    this.displayNotification.iconProperties = displayImageProps;
                    break;
                case "freehand_polygon":
                    displayImageProps.altText = "Draw a custom shape on the map.";
                    displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-polygon-freehand-24.png";
                    this.displayNotification.text = "Draw a custom shape on the map.";
                    this.displayNotification.iconProperties = displayImageProps;
                    break;
                case "polygon":
                    displayImageProps.altText = "Click or tap locations to define a polygon. Double-click/tap to finish.";
                    displayImageProps.uri = "Resources/Images/Icons/Toolbar/draw-polygon-24.png";
                    this.displayNotification.text = "Click or tap locations to define a polygon. Double-click/tap to finish.";
                    this.displayNotification.iconProperties = displayImageProps;
                    break;
            }
            this.app.commandRegistry.command("DisplayNotification").execute(this.displayNotification);
            this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            this.drawToolBar.activate(esri.toolbars.Draw[drawType]);
            this.esriMap.hideZoomSlider();
        };
        OE_SageGrouseConsPlnView.prototype.uploadAOIFilter = function (_evt, _elem, _cntx) {
            this.app.commandRegistry.command("UploadData").execute();
        };
        OE_SageGrouseConsPlnView.prototype.removeFilter = function (_event, _element, context) {
            if (context.type === 'geographic') {
                this.geo_filter.enabled = false;
                this.geo_filter.ids = [];
                this.viewModel.aoiGeometry = null;
                this.viewModel.geo_history_filter_collection.refresh();
                this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 0);
            }
            //update data model to remove the filter for layer
            this.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                folder.layers.getItems().forEach(function (layer) {
                    if (layer.layerName === context.layer) {
                        layer.enabled.set(true);
                        layer.layerDataValues.getItems().forEach(function (dv) {
                            dv.optionValue.set(['checkbox', 'radiobutton'].indexOf(dv.uiType) !== -1 ? true : null);
                        });
                    }
                    ;
                });
            });
            this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            this.updateQuery();
            this.setDefaultFilters();
        };
        OE_SageGrouseConsPlnView.prototype.collapseFolders = function () {
            this.viewModel.dashboard_meta.getItems().forEach(function (folder) { return folder.visible.set(false); });
        };
        OE_SageGrouseConsPlnView.prototype.expandFolders = function () {
            this.viewModel.dashboard_meta.getItems().forEach(function (folder) { return folder.visible.set(true); });
        };
        OE_SageGrouseConsPlnView.prototype.clearSearch = function (_evt, _el, _cnxt) {
            this.viewModel.filterText.set("");
        };
        OE_SageGrouseConsPlnView.prototype.setSearch = function (_evt, _el, cnxt) {
            this.toggleTabFilters(null, null, null, 'Data');
            this.viewModel.filterText.set(cnxt.layer);
        };
        OE_SageGrouseConsPlnView.prototype.zoomToGeoFilter = function () {
            this.toggleTabFilters(null, null, null, 'Geo');
            this.app.commandRegistry.command("ZoomToExtent").execute(this.viewModel.aoiGeometry.getExtent().expand(2));
        };
        //++++++++++++++++++++++++
        // Geo Filter History Functions
        //++++++++++++++++++++++++
        OE_SageGrouseConsPlnView.prototype.viewGeoHistoryArea = function (_evt, _el, cntx) {
            cntx.historyShow.set(!cntx.historyShow.get());
            this.updateHistoryMarkup();
            return true;
        };
        OE_SageGrouseConsPlnView.prototype.updateHistoryMarkup = function () {
            var _this = this;
            this.app.commandRegistry.command("ClearMarkupQuiet").execute();
            this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            this.viewModel.geo_filter_collection.getItems().forEach(function (gfc) {
                if (gfc.historyShow.get()) {
                    _this.app.commandRegistry.command("AddMarkup").execute(gfc.geometry);
                }
            });
        };
        OE_SageGrouseConsPlnView.prototype.removeGeoHistoryArea = function (_evt, _el, cntx) {
            var idxToRemove = 0;
            this.viewModel.geo_filter_collection.getItems().forEach(function (gfc, idx) {
                if (gfc.geometry === cntx.geometry) {
                    idxToRemove = idx;
                }
            });
            this.viewModel.geo_filter_collection.removeAt(idxToRemove);
            var has_active_geo_filter = this.viewModel.filter_collection.get().filter(function (f) { return f.type === 'geographic'; }).length > 0;
            this.viewModel.show_recent_geo_filters.set((this.viewModel.geo_filter_collection.getLength() > 1 && has_active_geo_filter) || (!has_active_geo_filter && this.viewModel.geo_filter_collection.getLength() > 0));
            //if upload layer remove service from layer list
            //if (cntx.mapLayer) {
            //    this.app.commandRegistry.command("RemoveUserAddedLayer").execute(cntx.mapLayer);
            //}        
            this.updateHistoryMarkup();
            var thisScope = this;
            //window.setTimeout(() => {
            //    thisScope.app.commandRegistry.command("SetCurrentTab").execute("Sage-Grouse Conservation Planning");
            //}, 1500);
        };
        OE_SageGrouseConsPlnView.prototype.useGeoHistoryArea = function (_evt, _el, cntx) {
            //turn off all other display and set active geo filter to selected geo
            this.app.commandRegistry.command("ClearMarkupQuiet").execute();
            this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
            this.viewModel.aoiGeometry = cntx.geometry;
            this.viewModel.geo_filter_collection.getItems().forEach(function (gfc) {
                gfc.historyShow.set(false);
            });
            this.viewModel.geo_history_filter_collection.refresh();
            this.uploadGeoFilterLayerName = cntx.mapLayer ? cntx.type : '';
            this.geo_filter.enabled = true;
            this.geo_filter.ids = cntx.ids;
            this.geo_filter.type = cntx.geoType;
            this.updateQuery();
            this.zoomToGeoFilter();
            return true;
        };
        //++++++++++++++++++++++++
        // END Geo Filter History Functions
        //++++++++++++++++++++++++
        OE_SageGrouseConsPlnView.prototype.downloadHexFilterAreas = function () {
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnDownloadView");
        };
        ;
        OE_SageGrouseConsPlnView.prototype.getReport = function () {
            console.log('get report');
            //var workflowUrl = "https://lib-gis1.library.oregonstate.edu/arcgis/home/item.html?id=24c76ba4aab347a0be0b5db5a878c636"; 
            this.toggleTabFilters(null, null, null, 'Data');
            this.viewModel.show_selected_filters.set(true);
            var thisScope = this;
            var clone = document.getElementById("scroll-filter-body").cloneNode(true);
            $("body").append(clone);
            $(clone).css("width", "720px");
            $(clone).find('.slider').css("width", "305px");
            $('.get-info-btn-wrapper').css("display", "none");
            html2canvas(clone, {
                onrendered: function (canvas) {
                    var base64FilterImg = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
                    var filters = { "filters": [] };
                    thisScope.viewModel.filter_collection.get().forEach(function (fc) {
                        if (fc.type !== 'geographic') {
                            filters.filters.push({ "filterDef": fc.filterDef, "layer": fc.layer, "desc": fc.desc });
                        }
                    });
                    var workflowArgs = {};
                    workflowArgs.workflowId = "cons_pln_generate_report";
                    workflowArgs.filterCollection = JSON.stringify(filters);
                    workflowArgs.layerDef = thisScope.viewModel.active_layer_def;
                    workflowArgs.filterImg = base64FilterImg;
                    workflowArgs.aoiGeometry = thisScope.viewModel.aoiGeometry
                        ? thisScope.viewModel.aoiGeometry
                        : JSON.parse("{\"rings\":[[[-13561079.235725246,5696991.214135939],[-12959366.9490645,5696991.214135939],[-12959366.9490645,5134414.685957194],[-13561079.235725246,5134414.685957194],[-13561079.235725246,5696991.214135939]]],\"spatialReference\":{\"wkid\":102100}}");
                    workflowArgs.hexCount = thisScope.viewModel.hexCount.get();
                    thisScope.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                    thisScope.viewModel.show_selected_filters.set(false);
                    $(clone).remove();
                }
            });
        };
        OE_SageGrouseConsPlnView.prototype.createGeoFilterObj = function () {
            var _this = this;
            var idNum = (this.viewModel.geo_filter_collection.getLength() + 1).toString();
            var filterObj = {
                layer: "Geographic Filter: " + this.geo_filter.type,
                geoType: this.geo_filter.type,
                enabled: new observables_1.Observable(this.geo_filter.enabled),
                ids: this.geo_filter.ids,
                geometry: this.viewModel.aoiGeometry,
                show: new observables_1.Observable(false),
                mapLayer: this.geo_filter.layer,
                filterDef: '',
                type: 'geographic',
                showID: 'show' + idNum,
                historyShow: new observables_1.Observable(false)
            };
            if (this.viewModel.geo_filter_collection.getLength() > 0) {
                var alreadyInList_1 = false;
                this.viewModel.geo_filter_collection.getItems().forEach(function (gfc) {
                    alreadyInList_1 = gfc.geometry === filterObj.geometry ? true : alreadyInList_1;
                });
                if (!alreadyInList_1) {
                    this.viewModel.geo_filter_collection.addItem(filterObj);
                }
            }
            else {
                this.viewModel.geo_filter_collection.addItem(filterObj);
            }
            this.viewModel.geo_history_filter_collection.refresh();
            this.viewModel.show_recent_geo_filters.set(this.viewModel.geo_filter_collection.getLength() > 1);
            filterObj.show.bind(this, function (showVal) {
                if (showVal) {
                    _this.app.commandRegistry.command("AddTemporaryMarkupGeometry").execute(_this.viewModel.aoiGeometry);
                }
                else {
                    _this.app.commandRegistry.command("ClearTemporaryMarkup").execute();
                }
            });
            return filterObj;
        };
        OE_SageGrouseConsPlnView.prototype.updateQuery = function (updateObj) {
            var _this = this;
            //iterate through query options and create query obj
            var query_obj = [{}];
            this.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                folder.layers.getItems().forEach(function (layer) {
                    var qo = {
                        layer: layer.layerName,
                        enabled: layer.enabled.get(),
                        desc: layer.layerDesc,
                        filters: []
                    };
                    layer.layerDataValues.getItems().forEach(function (dv) {
                        if (updateObj) {
                            if (updateObj.id === dv.optionID) {
                                dv.optionValue.set(updateObj.values);
                            }
                        }
                        var filter = {
                            label: dv.label,
                            fields: dv.fields,
                            uiType: dv.uiType,
                            value: dv.optionValue.get(),
                            min: dv.min,
                            max: dv.max,
                            comparator: dv.comparator
                            //categories: dv.categories
                        };
                        qo.filters.push(filter);
                    });
                    query_obj.push(qo);
                });
            });
            query_obj = query_obj.filter(function (qo) { return qo['filters'] ? qo['filters'].filter(function (f) { return f.value !== null && f.value !== false; }).length > 0 : false; });
            //setup query string for layer definition
            //iterate through query_objs that have optionValues set
            var layerDef = '';
            var filterCollection = [];
            //add geo filter if present
            if (this.geo_filter.ids.length > 0) {
                var filterObj = this.createGeoFilterObj();
                filterCollection.push(filterObj);
            }
            query_obj.forEach(function (qo, _idx) {
                if (qo['filters']) {
                    var filter = {
                        layer: qo['layer'],
                        enabled: new observables_1.Observable(qo['enabled']),
                        filterDef: '',
                        desc: qo["desc"],
                        type: 'attribute',
                        comparator: qo['comparator']
                    };
                    var filterDef_1 = '';
                    var filterDefSimple_1 = ''; //for filter summary display more readable
                    var filterVals = qo['filters'].filter(function (f) { return f.value ? true : false; });
                    var showFilter_1 = filterVals.length !== qo['filters'].length || filterVals.length === 0;
                    var filterUIs = qo['filters'].map(function (f) { return f.uiType; });
                    if (showFilter_1 || filterUIs.indexOf('checkbox') === -1) {
                        //if (qo['enabled']) {
                        layerDef += qo['enabled']
                            ? layerDef !== ''
                                ? ' AND ('
                                : '('
                            : '';
                        //let comparator = (filterVals
                        //    .map(fv => fv.fields
                        //        .map(f => f.field))
                        //    .filter((value, index, self) => { return self.indexOf(value) === index; })
                        //    .length > 1) ? ' OR ' : ' AND ';
                        var divideBy = 1;
                        var comparator_1 = ' OR ';
                        filterVals.forEach(function (filter, fidx) {
                            if (filter.value) {
                                filterDef_1 += fidx > 0 ? comparator_1 : '';
                                filterDefSimple_1 += fidx > 0 ? comparator_1 : '';
                                switch (filter.uiType) {
                                    case 'checkbox':
                                    case 'radiobutton':
                                        //for each fieldinfo for each values
                                        //get field type
                                        var query_1 = '';
                                        var simpleQuery_1 = '';
                                        var fieldComparator_1 = filter.comparator ? (' ' + filter.comparator + ' ') : ' OR ';
                                        var isMultiField_1 = false;
                                        filter.fields.forEach(function (fi, idx) {
                                            if (idx > 0) {
                                                query_1 += fieldComparator_1;
                                                isMultiField_1 = true;
                                                //simpleQuery += fieldComparator;
                                            }
                                            var field = fi.field;
                                            //get range or fixed
                                            fi.values.forEach(function (v) {
                                                var isNumeric = $.isNumeric(v.value);
                                                var comparator = !isNumeric ? " like '" : v.type === 'min' ? ' > ' : v.type === 'max' ? ' < ' : '=';
                                                query_1 += field + comparator + v.value + (!isNumeric ? "'" : "");
                                                simpleQuery_1 += !isMultiField_1 ? (' ' + filter.label) : '';
                                            });
                                        });
                                        if (qo['enabled']) { // filter can be disabled in the filter summary view
                                            filterDef_1 += query_1;
                                        }
                                        filterDefSimple_1 += simpleQuery_1;
                                        break;
                                    case 'rangeslider':
                                        var hasCategories = qo['filters'][0].fields[0].values ? qo['filters'][0].fields[0].values.length > 0 : false;
                                        var minVal = qo['filters'][0]['value'][0]
                                            ? qo['filters'][0]['value'][0]
                                            : qo['filters'][0]['value']['min'] !== undefined
                                                ? qo['filters'][0]['value']['min']
                                                : qo['filters'][0]['min'];
                                        var maxVal = qo['filters'][0]['value'][1]
                                            ? qo['filters'][0]['value'][1]
                                            : qo['filters'][0]['value']['max'] !== undefined
                                                ? qo['filters'][0]['value']['max']
                                                : qo['filters'][0]['max'];
                                        //showFilter = !(minVal.toString() === qo['filters'][0]['min'].toString() && maxVal.toString() === qo['filters'][0]['max'].toString());
                                        showFilter_1 = (minVal.toString() !== qo['filters'][0]['min'].toString() || maxVal.toString() !== qo['filters'][0]['max'].toString());
                                        if (showFilter_1) {
                                            if (hasCategories) {
                                                var selectedCategories_1 = qo['filters'][0].fields[0].values.slice(minVal, maxVal + 1);
                                                filterDefSimple_1 += '( ';
                                                selectedCategories_1.forEach(function (sc, idx) {
                                                    var cat = sc['label'];
                                                    var catVal = sc['value'];
                                                    var hasCatRangeVals = sc['min'] || sc['max'];
                                                    //get first and last if has category range
                                                    if (hasCatRangeVals && qo['enabled']) {
                                                        filterDef_1 += idx === 0
                                                            ? filter.fields[0].field + ' >= ' + sc['min'] + (selectedCategories_1.length === 1
                                                                ? ' AND ' + filter.fields[0].field + ' <= ' + sc['max']
                                                                : '')
                                                            : idx === selectedCategories_1.length - 1
                                                                ? ' AND ' + filter.fields[0].field + ' <= ' + sc['max']
                                                                : '';
                                                        //filterDef += filter.fields[0].field + ' >= ' + sc['min'] + ' AND ' + filter.fields[0].field + ' <= ' + sc['max'];
                                                    }
                                                    if (qo['enabled']) {
                                                        if (!hasCatRangeVals) {
                                                            if ($.isNumeric(catVal)) {
                                                                filterDef_1 += filter.fields[0].field + " = " + catVal + (idx !== selectedCategories_1.length - 1 ? ' OR ' : '');
                                                            }
                                                            else {
                                                                filterDef_1 += filter.fields[0].field + " like '" + catVal + "'" + (idx !== selectedCategories_1.length - 1 ? ' OR ' : '');
                                                            }
                                                        }
                                                    }
                                                    filterDefSimple_1 += sc['label'] + (idx !== selectedCategories_1.length - 1 ? ', ' : '');
                                                });
                                                filterDefSimple_1 += ')';
                                            }
                                            else {
                                                filterDefSimple_1 += '( >=' + minVal + ' AND <=' + maxVal + ' )';
                                                if (qo['enabled']) {
                                                    filterDef_1 = filter.fields[0].field + '>='
                                                        + (hasCategories
                                                            ? minVal
                                                            : (minVal / divideBy))
                                                        + ' AND '
                                                        + filter.fields[0].field + '<='
                                                        + (hasCategories ? maxVal : (maxVal / divideBy));
                                                }
                                            }
                                        }
                                        break;
                                    case 'slider':
                                        filterDefSimple_1 += '( >=' + qo['filters'][0]['value'] + ' )';
                                        if (qo['enabled']) {
                                            filterDef_1 += qo['field'] + '>=' + (qo['filters'][0]['value'] / divideBy);
                                        }
                                        showFilter_1 = qo['filters'][0]['value'].toString() !== qo['max'];
                                        break;
                                    default:
                                        break;
                                }
                                ;
                            }
                        });
                        filter.filterDef = filterDefSimple_1;
                        //check for spatial filter                
                        layerDef += qo['enabled'] ? filterDef_1 + ')' : '';
                    }
                    if (showFilter_1) {
                        filterCollection.push(filter);
                    }
                    else {
                        _this.viewModel.dashboard_meta.getItems().forEach(function (folder) {
                            folder.layers.getItems().forEach(function (layer) {
                                if (layer.layerName === qo['layer']) {
                                    layer.enabled.set(true);
                                }
                            });
                        });
                    }
                }
            });
            this.viewModel.filter_collection.set(filterCollection);
            this.viewModel.has_filters.set(filterCollection.length > 0);
            if (this.geo_filter.enabled) {
                layerDef += (filterCollection.filter(function (f) { return f.enabled.get(); }).length > 1 ? ' AND ' : '') + 'OBJECTID in (' + this.geo_filter.ids.toString() + ')';
            }
            layerDef = layerDef === '()'
                ? '1=1'
                : layerDef.replace(' AND ()', '').replace('() AND ', '');
            layerDef = filterCollection.length > 0 ? layerDef : '1=1';
            this.setLayerDef(layerDef);
        };
        OE_SageGrouseConsPlnView.prototype.getHexCount = function (layerDef) {
            var _this = this;
            var QueryTask = new esri.tasks.QueryTask(this.hex_layer_url);
            var Query = new esri.tasks.Query();
            Query.returnGeometry = false;
            Query.where = layerDef;
            QueryTask.executeForCount(Query, function (results) {
                _this.viewModel.hexCount.set(results);
            });
        };
        OE_SageGrouseConsPlnView.prototype.setLayerDef = function (layerDef) {
            this.viewModel.active_layer_def = layerDef;
            //set filter for both fill and border layers
            //Border
            var mService = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === 'HexSageCon'; }).length > 0 ? this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === 'HexSageCon'; })[0] : null;
            var layer = mService.findLayerByName('HexBaseScored');
            this.hex_layer_url = !this.hex_layer_url ? layer.getLayerUrl() : this.hex_layer_url;
            var layerDefintion = [];
            layerDefintion[0] = layerDef;
            mService.serviceLayer["setVisibleLayers"]([layer.id]);
            mService.serviceLayer["setLayerDefinitions"](layerDefintion, false);
            mService.refresh();
            this.viewModel._resizeFilterList();
            this.getHexCount(layerDef);
            window.setTimeout(function () {
                mService.refresh();
            }, 1000);
        };
        return OE_SageGrouseConsPlnView;
    }(ViewBase_1.ViewBase));
    exports.OE_SageGrouseConsPlnView = OE_SageGrouseConsPlnView;
});

},
"geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnViewModel": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework-ui/FilterableCollection", "./OE_SageGrouseConsPlnView"], function (require, exports, ViewModelBase_1, observables_1, FilterableCollection_1, OE_SageGrouseConsPlnView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SageGrouseConsPlnViewModel = /** @class */ (function (_super) {
        __extends(SageGrouseConsPlnViewModel, _super);
        function SageGrouseConsPlnViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.firstSizing = true;
            _this.filterText = new observables_1.Observable("");
            _this.selectedFormat = new observables_1.Observable("");
            _this.isDownloading = new observables_1.Observable(false);
            _this.downloadReady = new observables_1.Observable(false);
            _this.downloadUrl = new observables_1.Observable("");
            _this.downloadError = new observables_1.Observable(false);
            _this.hexCount = new observables_1.Observable('0');
            _this.isUploading = false;
            _this.myModel = _this;
            _this.dashboard_meta = new observables_1.ObservableCollection();
            _this.dashboard_meta_filter = new FilterableCollection_1.FilterableCollection(_this.dashboard_meta, _this._FilterFilters.bind(_this, _this));
            _this.filter_number = new observables_1.Observable("0");
            _this.folders = new observables_1.ObservableCollection([]);
            _this.show_filter_summary = new observables_1.Observable(true);
            _this.show_example_filters = new observables_1.Observable(false);
            _this.show_filter_class = new observables_1.Observable("hide-filters");
            _this.show_geo_filter_class = new observables_1.Observable("tab-header show-filters");
            _this.show_data_filter_class = new observables_1.Observable("tab-header hide-filters");
            _this.show_example_filter_class = new observables_1.Observable("show-filters");
            _this.show_geo_filter = new observables_1.Observable(false);
            _this.show_data_filter = new observables_1.Observable(true);
            _this.filter_collection = new observables_1.ObservableCollection([]);
            _this.has_filters = new observables_1.Observable(false);
            _this.get_info_layer = new observables_1.ObservableCollection([]);
            _this.filterText = new observables_1.Observable("");
            _this.filterView = new OE_SageGrouseConsPlnView_1.OE_SageGrouseConsPlnView(app, lib);
            _this.show_hex_layer = new observables_1.Observable(true);
            _this.show_selected_filters = new observables_1.Observable(false);
            _this.geo_filter_collection = new observables_1.ObservableCollection();
            _this.geo_history_filter_collection = new FilterableCollection_1.FilterableCollection(_this.geo_filter_collection, _this._FilterGeoHistory.bind(_this, _this));
            _this.show_recent_geo_filters = new observables_1.Observable(false);
            _this.downloadFormats = new observables_1.ObservableCollection([
                {
                    label: 'Shapefile',
                    val: 'Shapefile - SHAPE - .shp'
                }, {
                    label: 'KML/KMZ',
                    val: 'OpenGIS KML Encoding Standard - OGCKML - .kmz'
                },
                {
                    label: 'File Geodatabse (.gdb)',
                    val: 'File Geodatabase - FILEGDB - .gdb'
                }
            ]);
            _this.example_filters_collection = new observables_1.ObservableCollection([
                {
                    label: 'Sage-grouse habitat with invasive grass and remaining sagebrush cover',
                    description: 'This example query identifies sage-grouse seasonal habitat compromised by invasive annual grasses with remaining sagebrush cover. These areas may be targeted for herbicide treatment without the need for sagebrush planting to restore functioning sage-grouse habitat. The query identifies areas with >20% invasive annual grass cover, >10% sagebrush cover, and mapped sage-grouse seasonal habitat (all seasons).',
                    tour_id: 'herbicide_no_sagebrush',
                    filters: [
                        {
                            filter_id: "InvasiveAnnualGrassCover",
                            ui_type: "rangeslider",
                            min: "20",
                            max: "100"
                        },
                        {
                            filter_id: "SagebrushCover",
                            ui_type: "rangeslider",
                            min: "10",
                            max: "100"
                        },
                        {
                            filter_id: "SageGrouseSeasonalHabitatUnlikelytoProvideSageGrouseHabitat",
                            ui_type: "checkbox",
                            value: false
                        }
                    ]
                },
                {
                    label: 'Vale BLM District with invasive grass and resilient understory',
                    description: 'This example query prioritizes areas managed by the Vale BLM district compromised by invasive annual grasses, but with intact perennial grass components. These areas may be targeted for herbicide treatment without the need for re-seeding of native perennial grasses. The query includes BLM land within the Vale District where invasive grass is mapped as a primary threat, perennial grass cover is >20%, and existing development is very low to moderate.',
                    tour_id: 'herbicide_vale',
                    geo_filter: {
                        geojson_url: './Resources/ModuleConfig/SageConLandscapePlanningFilters/vale_bndry.json',
                        geo_name: 'Vale BLM District'
                    },
                    filters: [
                        {
                            filter_id: "LandOwnershipBLM",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "LandOwnershipOtherFederalAgency",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "LandOwnershipPrivate",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "LandOwnershipTribalGovernment",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "LandOwnershipStateorLocalGovernment",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatNotHabitat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatNoMajorThreats",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatInvasiveGrassThreat",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatJuniperThreat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatInvasiveGrassandJuniperThreat",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "PerennialGrassCover",
                            ui_type: "rangeslider",
                            min: "20",
                            max: "100"
                        },
                        {
                            filter_id: "ExistingDevelopmentImpacts",
                            ui_type: "rangeslider",
                            min: "1",
                            max: "2"
                        }
                    ]
                },
                {
                    label: 'Juniper removal to improve habitat connectivity',
                    description: 'This example query identifies areas where juniper removal may improve sage-grouse habitat and connectivity between sub-populations. It includes core and low density sage-grouse habitat, areas with juniper encroachment as a primary threat, and areas mapped as connectivity barrier removal priorities and connectivity pinchpoints.',
                    tour_id: 'juniper_removal',
                    filters: [
                        {
                            filter_id: "SageGrouseHabitatDesignationCore",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "SageGrouseHabitatDesignationLowDensity",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "SageGrouseHabitatDesignationGeneralHabitat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "SageGrouseHabitatDesignationNonHabitat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatNotHabitat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatNoMajorThreats",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatInvasiveGrassThreat",
                            ui_type: "checkbox",
                            value: false
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatNotJuniperThreat",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "VegetationConditionPrimaryThreatInvasiveGrassandJuniperThreat",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "SageGrouseConnectivityBarrierRemovalPriority",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "SageGrouseConnectivityConnectivityPinchpoint",
                            ui_type: "checkbox",
                            value: true
                        },
                        {
                            filter_id: "SageGrouseConnectivityLowConnectivtyValue",
                            ui_type: "checkbox",
                            value: false
                        }
                    ]
                }
            ]);
            // Listen for changes to the filter text to update the filtered collection.
            _this.filterText.bind(_this, function () {
                _this.updateFolderFilters();
            });
            _this.geo_filter_collection.bind(_this, function () {
                _this.show_recent_geo_filters.set(_this.geo_filter_collection.getLength() > 0);
            });
            _this.show_selected_filters.bind(_this, function () {
                _this.updateFolderFilters();
            });
            _this.dashboard_meta.bind(_this, function (args) {
                //if (this.dashboard_meta.getLength() > 0) {
                //    let layer_cnt = 0;
                //    this.dashboard_meta.getItems().forEach((folder) => {
                //        layer_cnt += folder["filteredLayers"].getLength();
                //    });
                //    this.filter_number.set(layer_cnt.toString() + ' filter(s)');
                //}
            });
            return _this;
        }
        SageGrouseConsPlnViewModel.prototype.updateFolderFilters = function () {
            var _this = this;
            var layer_cnt = 0;
            this.dashboard_meta.getItems().forEach(function (folder) {
                folder["layers"].get().forEach(function (fl) {
                    fl.show_selected_filters = _this.show_selected_filters.get();
                });
                folder["filteredLayers"].refresh();
                layer_cnt += folder["filteredLayers"].getLength();
                folder["filteredLayers"].refresh();
            });
            this.dashboard_meta_filter.refresh();
            this.filter_number.set(layer_cnt.toString() + ' filter(s)');
            this.app.viewManager.getViewById("OE_SageGrouseConsPlnView")["setDefaultFilters"]();
        };
        SageGrouseConsPlnViewModel.prototype._injectCSS = function () {
            var link = document.createElement('link');
            link.href = "";
            link.type = 'text/css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        };
        //
        SageGrouseConsPlnViewModel.prototype._injectScript = function () {
            //jQuery plugin for displaying tour/guide
            //http://linkedin.github.io/hopscotch/
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
            //jQuery Plugin for advanced range sliders
            // http://ghusse.github.io/jQRangeSlider/options.html
            ////////////////
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/jQAllRangeSliders-min.js",
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
        SageGrouseConsPlnViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            var thisViewModel = this;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel);
                });
                this.app.eventRegistry.event("ApplicationResizedEvent").subscribe(this, function (args) {
                    if (_this._resizeFilterList) {
                        _this._resizeFilterList(_this);
                    }
                });
                this.app.eventRegistry.event("PanelResizeEndEvent").subscribe(this, function (args) {
                    var thisScope = _this;
                    window.setTimeout(function (thisScope) {
                        if (thisScope) {
                            thisScope._resizeFilterList(thisScope);
                        }
                    }, 500);
                });
                this.app.eventRegistry.event("DataFrameClosedEvent").subscribe(this, function (args) {
                    var thisScope = _this;
                    window.setTimeout(function (thisScope) {
                        if (thisScope) {
                            thisScope._resizeFilterList(thisScope);
                        }
                    }, 500);
                });
                this.app.eventRegistry.event("ViewContainerViewClosedEvent").subscribe(this, function (args) {
                    console.log('view container closing', args);
                    if (args.viewId === "OE_SageGrouseConsPlnView") {
                        //turn off hex layer display                    
                        _this._toggleLayerDisplay('HexSageCon', 'HexBaseScored', false);
                        //this._hexLayerDisplay(false);
                    }
                });
                //////////////////////
                //  Hide download symbolize options
                //////////////////////
                this.app.eventRegistry.event("ViewActivatedEvent").subscribe(this, function (args) {
                    if (args.id === "WaitForUploadDataMainResponse") {
                        _this.isUploading = true;
                    }
                    if (args.id === "SymbolDialogView" && _this.isUploading) {
                        window.setTimeout(function () {
                            $('.button:contains("Proceed")').each(function (idx, btn) {
                                $(btn).click();
                            });
                        }, 50);
                        _this.isUploading = false;
                    }
                    if (args.id === "OE_SageGrouseConsPlnHelpTutorialView") {
                        $(".modal-overlay.active").css("background", "pink");
                    }
                });
            }
        };
        SageGrouseConsPlnViewModel.prototype._toggleLayerDisplay = function (service, layer, show) {
            var mService = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === service; }).length > 0 ? this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === service; })[0] : null;
            var serviceLayer = mService.findLayerByName(layer);
            //mService.serviceLayer["setVisibleLayers"]([parseInt(serviceLayer.id)]);
            serviceLayer.setVisibility(show);
            mService.setVisibility(show);
            mService.refresh();
        };
        SageGrouseConsPlnViewModel.prototype._removeService = function (service) {
            var ms = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === service; }).length > 0 ? this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === service; })[0] : null;
            if (ms) {
                this.app.site.essentialsMap.removeMapService(ms);
            }
        };
        SageGrouseConsPlnViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            this.app.registerActivityIdHandler("showConsPlnFilters", function CustomEventHandler(workflowContext) {
                //Show over viewe first // add check based on cookie preference to show again or not.
                //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnHelpTutorialView"); 
                //create the query list stucture
                //pull unique folders
                //var thisScope = this;
                //Get module config for display of query filters
                //////////////////////////////////
                var thisScope = this;
                $.ajax({
                    type: "GET",
                    url: "./Resources/ModuleConfig/SageConLandscapePlanningFilters/query_filters_config.json",
                    dataType: "json",
                    context: thisViewModel,
                    success: function (config) {
                        this.moduleJsonConfig = config;
                        this._ProcessConfig(config);
                    },
                    error: function (err) {
                        console.log('fail', err);
                    }
                });
                //    let _query_dash_meta = workflowContext.getValue("query_dash_meta").features;
                //    let _queryMeta = _query_dash_meta
                //        .map(rec => {
                //            return rec.attributes.FOLDER;
                //        })
                //        .filter((v, i, a) => a.indexOf(v) === i)
                //        .map(folder => {
                //            return {
                //                folder: folder,
                //                //show_selected_filters: thisScope.show_selected_filters.get()
                //            }
                //        });          
                //    //Attach layers to folders
                //    _queryMeta.map((folder,idx) => {
                //        let visible = new Observable<boolean>(idx === 0);
                //        let layers = new ObservableCollection<any>();    
                //        let filteredLayers = new FilterableCollection<any>(layers, thisViewModel._LayerFilters.bind(this, thisViewModel));                
                //        let _lyrs = []
                //        _query_dash_meta.forEach(rec => {
                //            var recAttr = rec.attributes;
                //            if (folder.folder === recAttr.FOLDER) {
                //                //split the datavalues field to get unique options for layer 
                //                let layer_filter_opts = [];
                //                let layer = recAttr.DATALAYER;
                //                let objID = recAttr.OBJECTID;
                //                let datavalues = new ObservableCollection<any>();
                //                let _datavalues = JSON.parse(recAttr.DATAVALUES);
                //                //setup categories if applicable
                //                var hasCategories = ['RangeSlider', 'Slider'].indexOf(recAttr.UITYPE) !== -1
                //                    && _datavalues.length > 0;// recAttr.DATAVALUES.split(',').length > 1;
                //                var categories = hasCategories
                //                    ? //recAttr.DATAVALUES.split(',')
                //                    _datavalues
                //                        .map(dv => {
                //                        return {
                //                            category: dv.label, // dv.split(':')[0],
                //                            categoryVal: dv.fields //dv.split(':')[1]
                //                        }
                //                    })
                //                    : [];
                //                //var categoryVals = hasCategories ? recAttr.DATAVALUES.split(',').map(dv => dv.split(':')[1]) : [];
                //                //recAttr.DATAVALUES.split(',')
                //                _datavalues
                //                    .forEach((dv, idx) => {
                //                    if (idx === 0 && hasCategories || !hasCategories) {
                //                        let nameForIDs = thisViewModel._shortenIDs(objID + layer + (!hasCategories
                //                            ? dv.label : ''// dv.split(':')[0] : ''
                //                        ));
                //                        let _opts = {
                //                            option: hasCategories ? layer : dv.label,// dv.split(':')[0],
                //                            categories: categories,
                //                            optionLayer: layer,
                //                            optionUI: dv.uiType,//recAttr.UITYPE,
                //                            optionID: nameForIDs,
                //                            optionValID: nameForIDs + "Val",
                //                            fieldValue: !hasCategories
                //                                ? dv.fields //dv.split(':')[1]
                //                                : '',
                //                            optionValue: new Observable<any>(dv.uiType === 'Checkbox' // recAttr.UITYPE === "Checkbox"
                //                                ? true
                //                                : null)                                    
                //                        };
                //                        layer_filter_opts.push(_opts);
                //                    }
                //                });
                //                datavalues.set(layer_filter_opts);
                //                recAttr.DATAVALUES = datavalues; 
                //                recAttr.FILTERS = datavalues;
                //                recAttr.show_selected_filters = thisViewModel.show_selected_filters.get();
                //                recAttr.enabled = new Observable<Boolean>(true);
                //                _lyrs.push(recAttr);
                //            }
                //        });
                //        layers.set(_lyrs);
                //        folder.layers = layers;
                //        folder.filteredLayers = filteredLayers;
                //        folder.visible = visible;
                //    })            
                //    //Set observable collection to bind to html
                //    thisViewModel.dashboard_meta.set(_queryMeta);     
                //    thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");   
                //    //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnHelpTutorialView"); 
                //    thisViewModel._resizeFilterList();            
            });
            this._injectScript();
        };
        SageGrouseConsPlnViewModel.prototype._ProcessConfig = function (_queryMeta) {
            var _this = this;
            var _obsQueryMeta = [];
            _queryMeta.map(function (folder, idx) {
                var _folderObj = {};
                var _visible = new observables_1.Observable(idx === 0);
                var _layers = new observables_1.ObservableCollection();
                var _filteredLayers = new FilterableCollection_1.FilterableCollection(_layers, _this._LayerFilters.bind(_this, _this));
                _folderObj.folder = folder.folder;
                _folderObj.layers = _layers;
                _folderObj.filteredLayers = _filteredLayers;
                _folderObj.visible = _visible;
                var _lyrs = [];
                folder.layers.forEach(function (layer, fidx) {
                    var _layer = {};
                    _layer.layerName = layer.layerName;
                    _layer.layerDesc = layer.layerDesc;
                    _layer.enabled = new observables_1.Observable(true);
                    _layer.show_selected_filters = _this.show_selected_filters.get();
                    var _layerDataValues = new observables_1.ObservableCollection();
                    _layer.layerDataValues = _layerDataValues;
                    var _lyrDV = [];
                    layer.layerDataValues.forEach(function (dv) {
                        var nameForIDs = _this._shortenIDs(_layer.layerName + (dv.label ? dv.label : ''));
                        var _dataValue = {};
                        _dataValue.label = dv.label;
                        _dataValue.uiType = dv.uiType;
                        _dataValue.min = dv.min;
                        _dataValue.max = dv.max;
                        _dataValue.default = dv.default;
                        _dataValue.comparator = dv.comparator;
                        _dataValue.increment = dv.increment;
                        _dataValue.fields = dv.fields;
                        _dataValue.optionID = nameForIDs;
                        _dataValue.optionValue = new observables_1.Observable(dv.uiType === 'checkbox'
                            ? (dv.default
                                ? dv.default !== 'unchecked'
                                : true)
                            : null);
                        _dataValue.optionValID = nameForIDs + "Val";
                        _lyrDV.push(_dataValue);
                    });
                    _layer.layerDataValues.set(_lyrDV);
                    _lyrs.push(_layer);
                    //_layer.layerDataValues = layer.layerDataValues;
                });
                _folderObj.layers.set(_lyrs);
                _obsQueryMeta.push(_folderObj);
            });
            //Set observable collection to bind to html
            this.dashboard_meta.set(_obsQueryMeta);
            //thisViewModel.dashboard_meta.set(_queryMeta);
            this.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnView");
            //thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_SageGrouseConsPlnHelpTutorialView"); 
            this._resizeFilterList();
        };
        SageGrouseConsPlnViewModel.prototype._FilterFilters = function (thisViewModel, folder) {
            var filterText = thisViewModel.filterText.get().toUpperCase();
            var hasLayers = folder.layers.getItems()
                .filter(function (layer) {
                //if show selected
                if (thisViewModel.show_selected_filters.get()) {
                    return thisViewModel.filter_collection.get().filter(function (filter) {
                        return filter.layer === layer.layerName;
                    }).length > 0;
                }
                else {
                    return layer.layerName.toUpperCase().indexOf(filterText) > -1;
                }
            })
                .length > 0;
            folder.visible.set(hasLayers);
            folder.show_selected_filters = thisViewModel.show_selected_filters.get();
            return hasLayers;
        };
        SageGrouseConsPlnViewModel.prototype._FilterGeoHistory = function (thisViewModel, filter) {
            return this.aoiGeometry
                ? filter.geometry !== this.aoiGeometry
                : true;
        };
        SageGrouseConsPlnViewModel.prototype._LayerFilters = function (thisViewModel, layer) {
            if (thisViewModel.show_selected_filters.get()) {
                return thisViewModel.filter_collection.get().filter(function (filter) {
                    filter.show_selected_filters = thisViewModel.show_selected_filters.get();
                    return filter.layer === layer.layerName; //layer.DATALAYER
                }).length > 0;
            }
            else {
                //if (layer.DATALAYER.toUpperCase().indexOf(thisViewModel.filterText.get().toUpperCase()) > -1) {
                if (layer.layerName.toUpperCase().indexOf(thisViewModel.filterText.get().toUpperCase()) > -1) {
                    return true;
                }
                return false;
            }
        };
        SageGrouseConsPlnViewModel.prototype._resizeFilterList = function (thisViewModel) {
            //set height for scroll list
            if ($(".OE_SageGrouseConsPlnView").length > 0 ? $(".OE_SageGrouseConsPlnView")[0].classList.contains('active') : false) {
                var process = thisViewModel ? thisViewModel.show_data_filter.get() : this.show_data_filter ? this.show_data_filter.get() : false;
                if (process) {
                    var reportAreaHeight = $(".OE_SageGrouseConsPlnView").parent().height();
                    var summaryAreaHeight = $("#filter-summary-control").height();
                    summaryAreaHeight += this.firstSizing ? 49 : 20;
                    $(".body-content-inner-wrapper").height(reportAreaHeight - summaryAreaHeight + "px");
                    //set width
                    var reportAreaWidth = $(".OE_SageGrouseConsPlnView").parent().width() - 25;
                    $("#report_area").width(reportAreaWidth + "px");
                    this.firstSizing = reportAreaHeight ? false : true;
                }
            }
        };
        SageGrouseConsPlnViewModel.prototype._shortenIDs = function (id) {
            return id.replace(/\ /ig, '')
                .replace(/\(/ig, '')
                .replace(/\)/ig, '')
                .replace(/\-/ig, '')
                .replace(/\:/ig, '');
        };
        return SageGrouseConsPlnViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.SageGrouseConsPlnViewModel = SageGrouseConsPlnViewModel;
});

},
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnDownloadView.html": markup1,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnFilterInfoView.html": markup2,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnHelpTutorialView.html": markup3,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnView.html": markup4,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnView.old.html": markup5,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html": markup6,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.old.html": markup7,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/radiobutton.html": markup8,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.html": markup9,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.old.html": markup10,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.html": markup11,
"url:/geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.old.html": markup12,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/CSS/hopscotch-0.1.1.css", "css", "LyoqDQogKg0KICogQ29weXJpZ2h0IDIwMTMgTGlua2VkSW4gQ29ycC4gQWxsIHJpZ2h0cyByZXNlcnZlZC4NCg0KICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7DQogKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuDQogKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQNCg0KICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMA0KDQogKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlDQogKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiAiQVMgSVMiIEJBU0lTLA0KICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuDQogKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kDQogKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCiAqLw0KLyoqDQogKiBUaGlzIGZhZGUgYW5pbWF0aW9uIGlzIGJhc2VkIG9uIERhbiBFZGVuJ3MgYW5pbWF0ZS5jc3MgKGh0dHA6Ly9kYW5lZGVuLm1lL2FuaW1hdGUvKSwgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgbGljZW5zZS4NCiAqDQogKiBDb3B5cmlnaHQgMjAxMyBEYW4gRWRlbi4NCiAqDQogKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5DQogKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbA0KICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cw0KICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbA0KICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzDQogKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOg0KICoNCiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluDQogKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4NCiAqDQogKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUg0KICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksDQogKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUNCiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVINCiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sDQogKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElODQogKiBUSEUgU09GVFdBUkUuDQogKi8NCi5hbmltYXRlZCB7DQogIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLW1vei1hbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOw0KICAtbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLW8tYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICAtbW96LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7DQogIC1tcy1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICAtby1hbmltYXRpb24tZHVyYXRpb246IDFzOw0KICBhbmltYXRpb24tZHVyYXRpb246IDFzOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJblVwIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJblVwIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1vLWtleWZyYW1lcyBmYWRlSW5VcCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQGtleWZyYW1lcyBmYWRlSW5VcCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KLmZhZGUtaW4tdXAgew0KICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5VcDsNCiAgLW1vei1hbmltYXRpb24tbmFtZTogZmFkZUluVXA7DQogIC1vLWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5VcDsNCiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJblVwOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsNCiAgfQ0KfQ0KQC1vLWtleWZyYW1lcyBmYWRlSW5Eb3duIHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOw0KICB9DQp9DQpAa2V5ZnJhbWVzIGZhZGVJbkRvd24gew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpOw0KICB9DQogIDEwMCUgew0KICAgIG9wYWNpdHk6IDE7DQogICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOw0KICB9DQp9DQouZmFkZS1pbi1kb3duIHsNCiAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogZmFkZUluRG93bjsNCiAgLW1vei1hbmltYXRpb24tbmFtZTogZmFkZUluRG93bjsNCiAgLW8tYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkRvd247DQogIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5Eb3duOw0KfQ0KQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJblJpZ2h0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOw0KICB9DQogIDEwMCUgew0KICAgIG9wYWNpdHk6IDE7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCkAtbW96LWtleWZyYW1lcyBmYWRlSW5SaWdodCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOw0KICB9DQp9DQpALW8ta2V5ZnJhbWVzIGZhZGVJblJpZ2h0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KQGtleWZyYW1lcyBmYWRlSW5SaWdodCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCi5mYWRlLWluLXJpZ2h0IHsNCiAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogZmFkZUluUmlnaHQ7DQogIC1tb3otYW5pbWF0aW9uLW5hbWU6IGZhZGVJblJpZ2h0Ow0KICAtby1hbmltYXRpb24tbmFtZTogZmFkZUluUmlnaHQ7DQogIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5SaWdodDsNCn0NCkAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW5MZWZ0IHsNCiAgMCUgew0KICAgIG9wYWNpdHk6IDA7DQogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KQC1tb3ota2V5ZnJhbWVzIGZhZGVJbkxlZnQgew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOw0KICB9DQp9DQpALW8ta2V5ZnJhbWVzIGZhZGVJbkxlZnQgew0KICAwJSB7DQogICAgb3BhY2l0eTogMDsNCiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7DQogIH0NCiAgMTAwJSB7DQogICAgb3BhY2l0eTogMTsNCiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7DQogIH0NCn0NCkBrZXlmcmFtZXMgZmFkZUluTGVmdCB7DQogIDAlIHsNCiAgICBvcGFjaXR5OiAwOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTsNCiAgfQ0KICAxMDAlIHsNCiAgICBvcGFjaXR5OiAxOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsNCiAgfQ0KfQ0KLmZhZGUtaW4tbGVmdCB7DQogIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnQ7DQogIC1tb3otYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnQ7DQogIC1vLWFuaW1hdGlvbi1uYW1lOiBmYWRlSW5MZWZ0Ow0KICBhbmltYXRpb24tbmFtZTogZmFkZUluTGVmdDsNCn0NCi8qKg0KICoNCiAqIENvcHlyaWdodCAyMDEzIExpbmtlZEluIENvcnAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuDQoNCiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSAiTGljZW5zZSIpOw0KICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLg0KICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0DQoNCiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjANCg0KICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZQ0KICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gIkFTIElTIiBCQVNJUywNCiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLg0KICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZA0KICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuDQogKi8NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbiB7DQogIC8qIGJvcnJvd2VkIGZyb20ga2F0eSBzdHlsZXMgKi8NCg0KICBmb250LXdlaWdodDogYm9sZDsNCiAgYm9yZGVyLXdpZHRoOiAxcHg7DQogIGJvcmRlci1zdHlsZTogc29saWQ7DQogIGN1cnNvcjogcG9pbnRlcjsNCiAgbWFyZ2luOiAwOw0KICBvdmVyZmxvdzogdmlzaWJsZTsNCiAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7DQogIHdpZHRoOiBhdXRvOw0KICBwYWRkaW5nOiAwIDEwcHg7DQogIGhlaWdodDogMjZweDsNCiAgbGluZS1oZWlnaHQ6IDI0cHg7DQogIGZvbnQtc2l6ZTogMTJweDsNCiAgKnpvb206IDE7DQogIHdoaXRlLXNwYWNlOiBub3dyYXA7DQogIGRpc3BsYXk6IC1tb3otaW5saW5lLXN0YWNrOw0KICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICp2ZXJ0aWNhbC1hbGlnbjogYXV0bzsNCiAgem9vbTogMTsNCiAgKmRpc3BsYXk6IGlubGluZTsNCiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgLW1vei1ib3JkZXItcmFkaXVzOiAzcHg7DQogIC1tcy1ib3JkZXItcmFkaXVzOiAzcHg7DQogIC1vLWJvcmRlci1yYWRpdXM6IDNweDsNCiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAzcHg7DQogIGJvcmRlci1yYWRpdXM6IDNweDsNCiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Ow0KICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b246aG92ZXIgew0KICAqem9vbTogMTsNCiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjI1KTsNCiAgLW1vei1ib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjI1KTsNCiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yNSk7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b246YWN0aXZlIHsNCiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI1KSBpbnNldDsNCiAgLW1vei1ib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI1KSBpbnNldDsNCiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSkgaW5zZXQ7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLW5hdi1idXR0b24ubmV4dCB7DQogIGJvcmRlci1jb2xvcjogIzFiNTQ4MDsNCiAgY29sb3I6ICNmZmY7DQogIG1hcmdpbjogMCAwIDAgMTBweDsNCiAgLyogSFMgc3BlY2lmaWMqLw0KDQogIHRleHQtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM1KTsNCiAgYmFja2dyb3VuZC1jb2xvcjogIzI4N2JiYzsNCiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoZ3JhZGllbnRUeXBlPTAsIHN0YXJ0Q29sb3JzdHI9JyMyODdiYmMnLCBlbmRDb2xvcnN0cj0nIzIzNjM5YScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgIzI4N2JiYyksIGNvbG9yLXN0b3AoMTAwJSwgIzIzNjM5YSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICMyODdiYmMgMCUsICMyMzYzOWEgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgIzI4N2JiYyAwJSwgIzIzNjM5YSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbi5uZXh0OmhvdmVyIHsNCiAgYmFja2dyb3VuZC1jb2xvcjogIzI2NzJhZTsNCiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoZ3JhZGllbnRUeXBlPTAsIHN0YXJ0Q29sb3JzdHI9JyMyNjcyYWUnLCBlbmRDb2xvcnN0cj0nIzFlNGY3ZScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgIzI2NzJhZSksIGNvbG9yLXN0b3AoMTAwJSwgIzFlNGY3ZSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICMyNjcyYWUgMCUsICMxZTRmN2UgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgIzI2NzJhZSAwJSwgIzFlNGY3ZSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtbmF2LWJ1dHRvbi5wcmV2IHsNCiAgYm9yZGVyLWNvbG9yOiAjYTdhN2E3Ow0KICBjb2xvcjogIzQ0NDsNCiAgdGV4dC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpOw0KICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyOw0KICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChncmFkaWVudFR5cGU9MCwgc3RhcnRDb2xvcnN0cj0nI2YyZjJmMicsIGVuZENvbG9yc3RyPScjZTllOWU5Jyk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCA1MCUgMCUsIDUwJSAxMDAlLCBjb2xvci1zdG9wKDAlLCAjZjJmMmYyKSwgY29sb3Itc3RvcCgxMDAlLCAjZTllOWU5KSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2YyZjJmMiAwJSwgI2U5ZTllOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjJmMmYyIDAlLCAjZTllOWU5IDEwMCUpOw0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1uYXYtYnV0dG9uLnByZXY6aG92ZXIgew0KICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4Ow0KICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChncmFkaWVudFR5cGU9MCwgc3RhcnRDb2xvcnN0cj0nI0ZGRThFOEU4JywgZW5kQ29sb3JzdHI9JyNGRkE5QTlBOScpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgNTAlIDAlLCA1MCUgMTAwJSwgY29sb3Itc3RvcCgwJSwgI2U4ZThlOCksIGNvbG9yLXN0b3AoMTMlLCAjZTNlM2UzKSwgY29sb3Itc3RvcCgzMiUsICNkN2Q3ZDcpLCBjb2xvci1zdG9wKDcxJSwgI2I5YjliOSksIGNvbG9yLXN0b3AoMTAwJSwgI2E5YTlhOSkpOw0KICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlOGU4ZTggMCUsICNlM2UzZTMgMTMlLCAjZDdkN2Q3IDMyJSwgI2I5YjliOSA3MSUsICNhOWE5YTkgMTAwJSk7DQogIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgI2U4ZThlOCAwJSwgI2UzZTNlMyAxMyUsICNkN2Q3ZDcgMzIlLCAjYjliOWI5IDcxJSwgI2E5YTlhOSAxMDAlKTsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIHsNCiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsNCiAgYm9yZGVyOiA1cHggc29saWQgIzAwMDAwMDsNCiAgLyogZGVmYXVsdCAqLw0KDQogIGJvcmRlcjogNXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC41KTsNCiAgLyogdHJhbnNwYXJlbnQsIGlmIHN1cHBvcnRlZCAqLw0KDQogIGNvbG9yOiAjMzMzOw0KICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbDsNCiAgZm9udC1zaXplOiAxM3B4Ow0KICBwb3NpdGlvbjogYWJzb2x1dGU7DQogIHotaW5kZXg6IDk5OTk5OTsNCiAgLW1vei1iYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmc7DQogIC8qIGZvciBNb3ppbGxhIGJyb3dzZXJzKi8NCg0KICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZzsNCiAgLyogV2Via2l0ICovDQoNCiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDsNCiAgLyogIGJyb3dzZXJzIHdpdGggZnVsbCBzdXBwb3J0ICovDQoNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlLmFuaW1hdGUgew0KICAtbW96LXRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgLW1vei10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW1vei10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7DQogIC1tcy10cmFuc2l0aW9uLXByb3BlcnR5OiB0b3AsIGxlZnQ7DQogIC1tcy10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW1zLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsNCiAgLW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTogdG9wLCBsZWZ0Ow0KICAtby10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLW8tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0Ow0KICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsNCiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7DQogIHRyYW5zaXRpb24tcHJvcGVydHk6IHRvcCwgbGVmdDsNCiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7DQogIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlLmludmlzaWJsZSB7DQogIG9wYWNpdHk6IDA7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZS5oaWRlLA0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhpZGUsDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaGlkZS1hbGwgew0KICBkaXNwbGF5OiBub25lOw0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgaDMgew0KICBjb2xvcjogIzAwMDsNCiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgQXJpYWw7DQogIGZvbnQtc2l6ZTogMTZweDsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogIGxpbmUtaGVpZ2h0OiAxOXB4Ow0KICBtYXJnaW46IC0xcHggMTVweCAwIDA7DQogIHBhZGRpbmc6IDA7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1jb250YWluZXIgew0KICBwYWRkaW5nOiAxNXB4Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIHRleHQtYWxpZ246IGxlZnQ7DQogIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOw0KICAvKiB0byBmaXggdGV4dCBmbGlja2VyaW5nICovDQoNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtY29udGVudCB7DQogIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsOw0KICBmb250LXdlaWdodDogbm9ybWFsOw0KICBsaW5lLWhlaWdodDogMTdweDsNCiAgbWFyZ2luOiAtNXB4IDAgMTFweDsNCiAgcGFkZGluZy10b3A6IDhweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNvbnRlbnQgew0KICBtYXJnaW46IDAgMCAwIDQwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZS5uby1udW1iZXIgLmhvcHNjb3RjaC1idWJibGUtY29udGVudCB7DQogIG1hcmdpbjogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNsb3NlIHsNCiAgY29sb3I6ICMwMDA7DQogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChSZXNvdXJjZXMvSW1hZ2VzL0N1c3RvbS9zcHJpdGUtZ3JlZW4tMC4zLnBuZykgLTE5MnB4IC05MnB4IG5vLXJlcGVhdDsNCiAgZGlzcGxheTogYmxvY2s7DQogIHBhZGRpbmc6IDhweDsNCiAgcG9zaXRpb246IGFic29sdXRlOw0KICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQogIHRleHQtaW5kZW50OiAtOTk5OXB4Ow0KICB3aWR0aDogOHB4Ow0KICBoZWlnaHQ6IDhweDsNCiAgdG9wOiAwOw0KICByaWdodDogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWNsb3NlLmhpZGUsDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1jbG9zZS5oaWRlLWFsbCB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1udW1iZXIgew0KICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoUmVzb3VyY2VzL0ltYWdlcy9DdXN0b20vc3ByaXRlLWdyZWVuLTAuMy5wbmcpIDAgMCBuby1yZXBlYXQ7DQogIGNvbG9yOiAjZmZmOw0KICBkaXNwbGF5OiBibG9jazsNCiAgZmxvYXQ6IGxlZnQ7DQogIGZvbnQtc2l6ZTogMTdweDsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogIGxpbmUtaGVpZ2h0OiAzMXB4Ow0KICBwYWRkaW5nOiAwIDEwcHggMCAwOw0KICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogIHdpZHRoOiAzMHB4Ow0KICBoZWlnaHQ6IDMwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgew0KICBwb3NpdGlvbjogYWJzb2x1dGU7DQogIHdpZHRoOiAzNHB4Ow0KICBoZWlnaHQ6IDM0cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgLmhvcHNjb3RjaC1idWJibGUtYXJyb3csDQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctYm9yZGVyIHsNCiAgd2lkdGg6IDA7DQogIGhlaWdodDogMDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci51cCB7DQogIHRvcDogLTIycHg7DQogIGxlZnQ6IDEwcHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIudXAgLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkICNmZmZmZmY7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgdG9wOiAtMTBweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci51cCAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1ib3JkZXIgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkICMwMDAwMDA7DQogIGJvcmRlci1ib3R0b206IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItbGVmdDogMTdweCBzb2xpZCB0cmFuc3BhcmVudDsNCiAgYm9yZGVyLXJpZ2h0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLmRvd24gew0KICBib3R0b206IC0zOXB4Ow0KICBsZWZ0OiAxMHB4Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLmRvd24gLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkICNmZmZmZmY7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgdG9wOiAtMjRweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci5kb3duIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWJvcmRlciB7DQogIGJvcmRlci10b3A6IDE3cHggc29saWQgIzAwMDAwMDsNCiAgYm9yZGVyLXRvcDogMTdweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNSk7DQogIGJvcmRlci1sZWZ0OiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIubGVmdCB7DQogIHRvcDogMTBweDsNCiAgbGVmdDogLTIycHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIubGVmdCAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdyB7DQogIGJvcmRlci1ib3R0b206IDE3cHggc29saWQgdHJhbnNwYXJlbnQ7DQogIGJvcmRlci1yaWdodDogMTdweCBzb2xpZCAjZmZmZmZmOw0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIGxlZnQ6IDdweDsNCiAgdG9wOiAtMzRweDsNCn0NCmRpdi5ob3BzY290Y2gtYnViYmxlIC5ob3BzY290Y2gtYnViYmxlLWFycm93LWNvbnRhaW5lci5sZWZ0IC5ob3BzY290Y2gtYnViYmxlLWFycm93LWJvcmRlciB7DQogIGJvcmRlci1yaWdodDogMTdweCBzb2xpZCAjMDAwMDAwOw0KICBib3JkZXItcmlnaHQ6IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctY29udGFpbmVyLnJpZ2h0IHsNCiAgdG9wOiAxMHB4Ow0KICByaWdodDogLTM5cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIucmlnaHQgLmhvcHNjb3RjaC1idWJibGUtYXJyb3cgew0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItbGVmdDogMTdweCBzb2xpZCAjZmZmZmZmOw0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIGxlZnQ6IC03cHg7DQogIHRvcDogLTM0cHg7DQp9DQpkaXYuaG9wc2NvdGNoLWJ1YmJsZSAuaG9wc2NvdGNoLWJ1YmJsZS1hcnJvdy1jb250YWluZXIucmlnaHQgLmhvcHNjb3RjaC1idWJibGUtYXJyb3ctYm9yZGVyIHsNCiAgYm9yZGVyLWxlZnQ6IDE3cHggc29saWQgIzAwMDAwMDsNCiAgYm9yZGVyLWxlZnQ6IDE3cHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpOw0KICBib3JkZXItYm90dG9tOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KICBib3JkZXItdG9wOiAxN3B4IHNvbGlkIHRyYW5zcGFyZW50Ow0KfQ0KZGl2LmhvcHNjb3RjaC1idWJibGUgLmhvcHNjb3RjaC1hY3Rpb25zIHsNCiAgbWFyZ2luOiAxMHB4IDAgMDsNCiAgdGV4dC1hbGlnbjogcmlnaHQ7DQp9DQo=");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/CSS/iThing-min.css", "css", "LnVpLXJhbmdlU2xpZGVye2hlaWdodDozMHB4O3BhZGRpbmctdG9wOjQwcHh9LnVpLXJhbmdlU2xpZGVyLC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItY29udGFpbmVyey13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveDstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveH0udWktcmFuZ2VTbGlkZXItd2l0aEFycm93cyAudWktcmFuZ2VTbGlkZXItY29udGFpbmVye21hcmdpbjowIDE1cHh9LnVpLXJhbmdlU2xpZGVyLWFycm93LC51aS1yYW5nZVNsaWRlci1ub0Fycm93IC51aS1yYW5nZVNsaWRlci1jb250YWluZXIsLnVpLXJhbmdlU2xpZGVyLXdpdGhBcnJvd3MgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcnstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCA0cHggNnB4IC0ycHggUkdCQSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjUpO2JveC1zaGFkb3c6aW5zZXQgMCA0cHggNnB4IC0ycHggUkdCQSgwLDAsMCwuNSl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQudWktcmFuZ2VTbGlkZXItbm9BcnJvdyAudWktcmFuZ2VTbGlkZXItY29udGFpbmVyLC51aS1yYW5nZVNsaWRlci1kaXNhYmxlZC51aS1yYW5nZVNsaWRlci13aXRoQXJyb3dzIC51aS1yYW5nZVNsaWRlci1jb250YWluZXJ7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjMpOy1tb3otYm94LXNoYWRvdzppbnNldCAwIDRweCA2cHggLTJweCBSR0JBKDAsMCwwLC4zKTtib3gtc2hhZG93Omluc2V0IDAgNHB4IDZweCAtMnB4IFJHQkEoMCwwLDAsLjMpfS51aS1yYW5nZVNsaWRlci1ub0Fycm93IC51aS1yYW5nZVNsaWRlci1jb250YWluZXJ7LW1vei1ib3JkZXItcmFkaXVzOjRweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItbGVmdDpzb2xpZCAxcHggIzUxNTg2Mjtib3JkZXItcmlnaHQ6c29saWQgMXB4ICM1MTU4NjJ9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkLnVpLXJhbmdlU2xpZGVyLW5vQXJyb3cgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntib3JkZXItY29sb3I6Izg0OTBhM30udWktcmFuZ2VTbGlkZXItYXJyb3csLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntoZWlnaHQ6MzBweDtib3JkZXItdG9wOnNvbGlkIDFweCAjMjMyYTMyO2JvcmRlci1ib3R0b206c29saWQgMXB4ICM2YTcxNzl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lcntib3JkZXItdG9wLWNvbG9yOiM0OTU3NmI7Ym9yZGVyLWJvdHRvbS1jb2xvcjojOWNhN2IzfS51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItY29udGFpbmVyLC51aS1yYW5nZVNsaWRlci1sYWJlbHtiYWNrZ3JvdW5kOiM2NzcwN0Y7YmFja2dyb3VuZDotbW96LWxpbmVhci1ncmFkaWVudCh0b3AsIzY3NzA3RiAwLCM4ODhEQTAgMTAwJSk7YmFja2dyb3VuZDotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxjb2xvci1zdG9wKDAlLCM2NzcwN0YpLGNvbG9yLXN0b3AoMTAwJSwjODg4REEwKSl9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1hcnJvdywudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWNvbnRhaW5lciwudWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWxhYmVse2JhY2tncm91bmQ6Izk1YTRiZDtiYWNrZ3JvdW5kOi1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwjOTVhNGJkIDAsI2IyYmJkOCAxMDAlKTtiYWNrZ3JvdW5kOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yLXN0b3AoMCUsIzk1YTRiZCksY29sb3Itc3RvcCgxMDAlLCNiMmJiZDgpKX0udWktcmFuZ2VTbGlkZXItYXJyb3d7d2lkdGg6MTRweDtjdXJzb3I6cG9pbnRlcn0udWktcmFuZ2VTbGlkZXItbGVmdEFycm93e2JvcmRlci1yYWRpdXM6NHB4IDAgMCA0cHg7Ym9yZGVyLWxlZnQ6c29saWQgMXB4ICM1MTU4NjJ9LnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3d7Ym9yZGVyLWxlZnQtY29sb3I6Izg3OTJhMn0udWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvd3tib3JkZXItcmFkaXVzOjAgNHB4IDRweCAwO2JvcmRlci1yaWdodDpzb2xpZCAxcHggIzUxNTg2Mn0udWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLXJpZ2h0QXJyb3d7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM4NzkyYTJ9LnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7Ym9yZGVyOjEwcHggc29saWQgdHJhbnNwYXJlbnQ7d2lkdGg6MDtoZWlnaHQ6MDttYXJnaW4tdG9wOi0xMHB4fS51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3cgLnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye2JvcmRlci1yaWdodDoxMHB4IHNvbGlkICNhNGE4Yjc7bGVmdDowO21hcmdpbi1sZWZ0Oi04cHh9LnVpLXJhbmdlU2xpZGVyLWxlZnRBcnJvdzpob3ZlciAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXJ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgI2IzYjZjMn0udWktcmFuZ2VTbGlkZXItZGlzYWJsZWQgLnVpLXJhbmdlU2xpZGVyLWxlZnRBcnJvdyAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXIsLnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1sZWZ0QXJyb3c6aG92ZXIgLnVpLXJhbmdlU2xpZGVyLWFycm93LWlubmVye2JvcmRlci1yaWdodC1jb2xvcjojYmJjMGNmfS51aS1yYW5nZVNsaWRlci1yaWdodEFycm93IC51aS1yYW5nZVNsaWRlci1hcnJvdy1pbm5lcntib3JkZXItbGVmdDoxMHB4IHNvbGlkICNhNGE4Yjc7cmlnaHQ6MDttYXJnaW4tcmlnaHQ6LThweH0udWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvdzpob3ZlciAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXJ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCAjYjNiNmMyfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItcmlnaHRBcnJvdyAudWktcmFuZ2VTbGlkZXItYXJyb3ctaW5uZXIsLnVpLXJhbmdlU2xpZGVyLWRpc2FibGVkIC51aS1yYW5nZVNsaWRlci1yaWdodEFycm93OmhvdmVyIC51aS1yYW5nZVNsaWRlci1hcnJvdy1pbm5lcntib3JkZXItbGVmdC1jb2xvcjojYmJjMGNmfS51aS1yYW5nZVNsaWRlci1pbm5lckJhcnt3aWR0aDoxMTAlO2hlaWdodDoxMDAlO2xlZnQ6LTEwcHg7b3ZlcmZsb3c6aGlkZGVufS51aS1yYW5nZVNsaWRlci1iYXJ7YmFja2dyb3VuZDojNjhhMWQ2O2hlaWdodDoyOXB4O21hcmdpbjoxcHggMDstbW96LWJvcmRlci1yYWRpdXM6NHB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjptb3ZlO2N1cnNvcjpncmFiO2N1cnNvcjotbW96LWdyYWI7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMnB4IDZweCBSR0JBKDAsMCwwLC41KTstbW96LWJveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjUpO2JveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjUpfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItYmFye2JhY2tncm91bmQ6IzkzYWVjYTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAycHggNnB4IFJHQkEoMCwwLDAsLjMpOy1tb3otYm94LXNoYWRvdzppbnNldCAwIDJweCA2cHggUkdCQSgwLDAsMCwuMyk7Ym94LXNoYWRvdzppbnNldCAwIDJweCA2cHggUkdCQSgwLDAsMCwuMyl9LnVpLXJhbmdlU2xpZGVyLWhhbmRsZXt3aWR0aDoxMHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQ6MCAwO2N1cnNvcjpjb2wtcmVzaXplfS51aS1yYW5nZVNsaWRlci1sYWJlbHtwYWRkaW5nOjVweCAxMHB4O2JvdHRvbTo0MHB4Oy1tb3otYm9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLXJhZGl1czo0cHg7LXdlYmtpdC1ib3gtc2hhZG93OjAgMXB4IDAgI2MyYzVkNjstbW96LWJveC1zaGFkb3c6MCAxcHggMCAjYzJjNWQ2O2JveC1zaGFkb3c6MCAxcHggMCAjYzJjNWQ2O2NvbG9yOiNmZmY7Zm9udC1zaXplOjE1cHg7Y3Vyc29yOmNvbC1yZXNpemV9LnVpLXJhbmdlU2xpZGVyLWxhYmVsLWlubmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6NTAlO2Rpc3BsYXk6YmxvY2s7ei1pbmRleDo5OTtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O21hcmdpbi1sZWZ0Oi0xMHB4O2JvcmRlci10b3A6MTBweCBzb2xpZCAjODg4REEwfS51aS1yYW5nZVNsaWRlci1kaXNhYmxlZCAudWktcmFuZ2VTbGlkZXItbGFiZWwtaW5uZXJ7Ym9yZGVyLXRvcC1jb2xvcjojYjJiYmQ4fS51aS1lZGl0UmFuZ2VTbGlkZXItaW5wdXRWYWx1ZXt3aWR0aDoyZW07dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE1cHh9LnVpLXJhbmdlU2xpZGVyIC51aS1ydWxlci1zY2FsZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXRpY2t7ZmxvYXQ6bGVmdH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXNjYWxlMCAudWktcnVsZXItdGljay1pbm5lcntjb2xvcjojZmZmO21hcmdpbi10b3A6MXB4O2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZmZmO2hlaWdodDoyOXB4O3BhZGRpbmctbGVmdDoycHg7cG9zaXRpb246cmVsYXRpdmV9LnVpLXJhbmdlU2xpZGVyIC51aS1ydWxlci1zY2FsZTAgLnVpLXJ1bGVyLXRpY2stbGFiZWx7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjZweH0udWktcmFuZ2VTbGlkZXIgLnVpLXJ1bGVyLXNjYWxlMSAudWktcnVsZXItdGljay1pbm5lcntib3JkZXItbGVmdDoxcHggc29saWQgI2ZmZjttYXJnaW4tdG9wOjI1cHg7aGVpZ2h0OjVweH0=");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnModule.css", "css", "LmxhcmdlLXNoZWxsLXJpZ2h0ew0KICAgIHRvcDowOw0KICAgIHJpZ2h0OiAwOw0KICAgIGJvdHRvbTowOw0KICAgIHdpZHRoOjM1MHB4Ow0KICAgIGRpc3BsYXk6bm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOw0KfQ0KDQoubGFyZ2Utc2hlbGwtY2VudGVyew0KICAgIHJpZ2h0OjM1MHB4Ow0KfQ0KDQojcmVwb3J0X2FyZWEgew0KICAgIHBhZGRpbmc6IDAgMTBweCAxMHB4IDEwcHg7DQogICAgd2lkdGg6IDMyNXB4Ow0KICAgIGRpc3BsYXk6IHRhYmxlOw0KfQ0KDQouc2xpZGVyew0KICAgIHdpZHRoOjkwJTsgICAgDQogICAgbWFyZ2luLXRvcDo1cHg7DQp9DQoNCiAgICAuc2xpZGVyLnRvdWNoIGEgew0KICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweDsNCiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBtYXJnaW4tbGVmdCAuNXMsIG1hcmdpbi1yaWdodCAuNXM7DQogICAgfQ0KDQogICAgLnNsaWRlci50b3VjaCBhICsgYSB7DQogICAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7DQogICAgICAgIG1hcmdpbi1yaWdodDogMHB4Ow0KICAgIH0NCg0KLnVsLXF1ZXJ5LWZvbGRlcnMgew0KICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCiAgICBtYXJnaW4tbGVmdDotNDBweDsNCn0NCg0KLnVsLXF1ZXJ5LWxheWVycyB7DQogICAgbGlzdC1zdHlsZS10eXBlOm5vbmU7DQogICAgbWFyZ2luLWxlZnQ6LTE1cHg7DQogICAgbWFyZ2luLXJpZ2h0OjEwcHg7DQp9DQoNCi51bC1xdWVyeS1sYXllcnMgbGl7DQogICAgLypiYWNrZ3JvdW5kOiNmMWVkZWQ7Ki8NCiAgICBwYWRkaW5nOjVweCAxMHB4Ow0KICAgIGJvcmRlci10b3A6MXB4IHNvbGlkICNmMWVkZWQ7DQp9DQoNCiAgICAudWwtcXVlcnktbGF5ZXJzIGxpOmZpcnN0LWNoaWxkIHsNCiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7DQogICAgICAgIGJvcmRlci10b3A6bm9uZTsNCiAgICB9DQoNCiAgICAvKi51bC1xdWVyeS1sYXllcnMgbGk6bnRoLWNoaWxkKG9kZCkgew0KICAgICAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwOw0KICAgIH0qLw0KDQovKi5mb2xkZXItaGVhZGVyLXdyYXBwZXJ7DQogICAgYm9yZGVyLXRvcDpzb2xpZCAxcHggIzgwODA4MDsNCn0qLw0KDQouZm9sZGVyLWhlYWRlci13cmFwcGVyIC50cmVlLWV4cGFuZGVyIHsNCiAgICB3aWR0aDoyMHB4Ow0KICAgIGhlaWdodDoxNnB4Ow0KICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KfQ0KLmZvbGRlci10aXRsZXsNCiAgICBmb250LXNpemU6MS4xZW07DQogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCi5maWx0ZXJfb3B0aW9uc193cmFwcGVyew0KICAgIG1hcmdpbjogNXB4IDEwcHg7DQp9DQoNCiNmaWx0ZXItc3VtbWFyeSwgI2dlby1maWx0ZXIgew0KICAgIG1hcmdpbjogMCAxMHB4Ow0KICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDJweCAjNTU1NTU1Ow0KICAgIGJvcmRlci10b3A6IG5vbmU7DQogICAgcGFkZGluZzogNXB4IDEwcHggMDsNCiAgICAvKmJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDsNCiAgICAvKndpZHRoOiA5MCU7Ki8NCn0NCg0KI2ZpbHRlci1zdW1tYXJ5IHVsew0KICAgIG1hcmdpbjogMnB4IDAgMnB4IC0zMHB4Ow0KfQ0KDQoucXVlcnktY29udHJvbC1iYXIgew0KICAgIC8qd2lkdGg6IDkwJTsqLw0KICAgIHBhZGRpbmc6IDEwcHg7DQogICAgbWFyZ2luOiAxMHB4IDEwcHggMCAxMHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7DQogICAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7DQogICAgYm9yZGVyLXRvcDogc29saWQgMnB4ICM1NTU1NTU7DQogICAgYm9yZGVyLWJvdHRvbTogc29saWQgMnB4ICM1NTU1NTU7DQp9DQoNCi5xdWVyeS1jb250cm9sLWJhciBkaXZ7DQogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7DQogICAgd2lkdGg6NDklOw0KICAgIGJvcmRlci1sZWZ0OjFweCBzb2xpZCAjODA4MDgwOw0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KfQ0KDQoucXVlcnktY29udHJvbC1iYXIgZGl2OmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQp9DQoNCi5xdWVyeS1jb250cm9sLWJhciBkaXY6Zmlyc3QtY2hpbGR7DQogICAgYm9yZGVyLWxlZnQ6bm9uZTsNCn0NCg0KLmdldC1pbmZvLWJ0bi13cmFwcGVyLCAucXVlcnktbGF5ZXIgew0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCn0NCg0KLnF1ZXJ5LWxheWVyew0KICAgIHdpZHRoOjkyJTsNCn0NCg0KLnF1ZXJ5LWxheWVyOmhvdmVyew0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQogICAgY3Vyc29yOnBvaW50ZXI7DQp9DQoNCi5nZXQtaW5mby1idG57DQogICAgYmFja2dyb3VuZC1pbWFnZTp1cmwoUmVzb3VyY2VzL0ltYWdlcy9JY29ucy9DdXN0b20vaW5mb19pXzE2cHgucG5nKTsNCiAgICB3aWR0aDoxNnB4Ow0KICAgIGhlaWdodDoxNnB4Ow0KICAgIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDsNCn0NCg0KLmdldC1pbmZvLXdyYXBwZXJ7DQogICAgbWluLXdpZHRoOjMwMHB4Ow0KICAgIG1heC13aWR0aDogNDAwcHg7DQogICAgcGFkZGluZzoyMHB4Ow0KfQ0KDQouZmlsdGVyLWRlZnsNCiAgICBmb250LXNpemU6IC44ZW07DQogICAgY29sb3I6ICM4MDgwODA7DQogICAgbWFyZ2luLWxlZnQ6NXB4Ow0KfQ0KLmZpbHRlci1kZWYgaW5wdXR7DQogICAgbWFyZ2luLXJpZ2h0OjVweDsNCn0NCg0KI3F1ZXJ5LWZpbHRlci13cmFwcGVyew0KICAgIGRpc3BsYXk6dGFibGUtcm93Ow0KICAgIGhlaWdodDoxMDAlOw0KfQ0KDQojcXVlcnktZmlsdGVyLXdyYXBwZXIuYm91bmQtaW52aXNpYmxlew0KICAgIGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50Ow0KfQ0KDQojZmlsdGVyLXN1bW1hcnktY29udHJvbCB7DQogICAgZGlzcGxheTp0YWJsZS1yb3c7ICAgDQogICAgLyptYXJnaW46LTEwcHggMCAwIDA7Ki8NCn0NCg0KI2ZpbHRlci1zdW1tYXJ5IHVsIGxpew0KICAgIGxpc3Qtc3R5bGU6bm9uZTsNCiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCAjODA4MDgwOw0KfQ0KDQoudGFibGUtY2VsbCB7DQogICAgZGlzcGxheTogdGFibGUtY2VsbDsNCn0NCg0KLmJvZHktY29udGVudC1vdXRlci13cmFwcGVyIHsNCiAgICBoZWlnaHQ6IDEwMCU7DQp9DQoNCi5ib2R5LWNvbnRlbnQtaW5uZXItd3JhcHBlciB7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICAvKm92ZXJmbG93OiBhdXRvOyovDQp9DQoNCi5ib2R5LWNvbnRlbnQgew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICB0b3A6IDA7DQogICAgYm90dG9tOiAwOw0KICAgIGxlZnQ6IDA7DQogICAgcmlnaHQ6IDA7DQp9DQoNCiNxdWljay1maW5kLXdyYXBwZXJ7DQogICAgcGFkZGluZzo1cHggMTBweDsNCiAgICBtYXJnaW46MCAxMHB4Ow0KICAgIGJvcmRlci1ib3R0b206c29saWQgMXB4ICM4MDgwODA7DQp9DQoNCiNxdWljay1maW5kLXdyYXBwZXIgZGl2ew0KICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KfQ0KDQojcXVpY2stZmluZC13cmFwcGVyIGlucHV0ew0KICAgIG1pbi13aWR0aDogMjAwcHg7DQogICAgd2lkdGg6MTAwJTsNCn0NCg0KI3F1aWNrLWZpbmQtY2xlYXJ7DQogICAgcGFkZGluZzowIDEwcHg7DQp9DQoNCiNxdWljay1maW5kLWNsZWFyOmhvdmVyew0KICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQogICAgY3Vyc29yOnBvaW50ZXI7DQp9DQoNCi5hY3RpdmUtZmlsdGVyLWRldGFpbHN7DQogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7DQogICAgd2lkdGg6ODUlOw0KfQ0KDQogICAgLmFjdGl2ZS1maWx0ZXItZGV0YWlsczpudGgtY2hpbGQoMik6aG92ZXJ7DQogICAgICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQogICAgICAgIGN1cnNvcjpwb2ludGVyOw0KICAgIH0NCg0KICAgIC5hY3RpdmUtZmlsdGVyLWRldGFpbHMucmVtb3ZlLCAuYWN0aXZlLWZpbHRlci1kZXRhaWxzLnRvZ2dsZS1hY3RpdmUtZmlsdGVyIHsNCiAgICAgICAgdmVydGljYWwtYWxpZ246dG9wOw0KICAgICAgICB3aWR0aDogNSU7DQogICAgfQ0KDQogICAgICAgIC5hY3RpdmUtZmlsdGVyLWRldGFpbHMudG9nZ2xlLWFjdGl2ZS1maWx0ZXIgaW5wdXR7DQogICAgICAgICAgICBtYXJnaW46NHB4IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYWN0aXZlLWZpbHRlci1kZXRhaWxzLnJlbW92ZSBkaXYgew0KICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFJlc291cmNlcy9JbWFnZXMvSWNvbnMvZGVsZXRlLTE2LnBuZyk7DQogICAgICAgICAgICB3aWR0aDogMTZweDsNCiAgICAgICAgICAgIGhlaWdodDogMTZweDsNCiAgICAgICAgICAgIG1hcmdpbjogNXB4Ow0KICAgICAgICB9DQoNCi5hY3RpdmUtZmlsdGVyLWRldGFpbHMucmVtb3ZlOmhvdmVyew0KICAgIGN1cnNvcjpwb2ludGVyOw0KfQ0KDQoudG9nZ2xlLWZvbGRlcnMtd3JhcHBlcnsNCiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCAjODA4MDgwOw0KICAgIHBhZGRpbmc6MnB4Ow0KICAgIG1hcmdpbjogMCAxMHB4Ow0KICAgIGZvbnQtc2l6ZTouOWVtOw0KfQ0KDQoudG9nZ2xlLWZvbGRlcnMtd3JhcHBlciBkaXYgew0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICBib3JkZXItbGVmdDogc29saWQgMXB4ICM4MDgwODA7DQogICAgd2lkdGg6IDMwJTsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQoNCiAgICAudG9nZ2xlLWZvbGRlcnMtd3JhcHBlciBkaXY6aG92ZXIgew0KICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsNCiAgICAgICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIH0NCiAgICAudG9nZ2xlLWZvbGRlcnMtd3JhcHBlciBkaXY6Zmlyc3QtY2hpbGQgew0KICAgICAgICBib3JkZXItbGVmdDogbm9uZTsNCiAgICAgICAgY29sb3I6IzgwODA4MDsNCiAgICB9DQogICAgICAgIC50b2dnbGUtZm9sZGVycy13cmFwcGVyIGRpdjpmaXJzdC1jaGlsZDpob3ZlciB7DQogICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQogICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7DQogICAgICAgIH0NCg0KLmFjdGl2ZS1maWx0ZXItaGVhZGVyLXdyYXBwZXIsIC5kYXNoYm9hcmQtaGVhZGVycyB7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIG1hcmdpbjogMTBweCAxMHB4IDAgMTBweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwOw0KICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwOw0KICAgIHBvc2l0aW9uOnJlbGF0aXZlOw0KfQ0KDQogICAgLmRhc2hib2FyZC1oZWFkZXJzLnRhYi1oZWFkZXItd3JhcHBlcnsNCiAgICAgICAgcGFkZGluZzowOw0KICAgIH0gICAgICANCg0KDQogICAgLmFjdGl2ZS1maWx0ZXItaGVhZGVyLXdyYXBwZXI6aG92ZXIgew0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgICAgIC8qdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsqLw0KICAgIH0NCi5hY3RpdmUtZmlsdGVyLWhlYWRlci13cmFwcGVyIGRpdnsNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCn0NCg0KLnNob3ctZmlsdGVyc3sNCiAgICB3aWR0aDoyNHB4Ow0KICAgIGhlaWdodDoxNnB4Ow0KICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKFJlc291cmNlcy9JbWFnZXMvSWNvbnMvYXJyb3ctZG93bi1zbWFsbC0yNC5wbmcpOw0KICAgIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDsNCn0NCg0KLmhpZGUtZmlsdGVycyB7DQogICAgd2lkdGg6IDI0cHg7DQogICAgaGVpZ2h0OiAxNnB4Ow0KICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChSZXNvdXJjZXMvSW1hZ2VzL0ljb25zL2Fycm93LXVwLXNtYWxsLTI0LnBuZyk7DQogICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsNCn0NCg0KLnJlc2V0LWZpbHRlcnMtd3JhcHBlcnsNCiAgICBtYXJnaW46N3B4IDA7DQp9DQogICAgLnJlc2V0LWZpbHRlcnMtd3JhcHBlciBkaXYNCiAgICAsIC51cGxvYWQtYnRuDQogICAgLCAucmVzdG9yZUdlb0J0bg0KICAgICwgLnN1Ym1pdF9kb3dubG9hZF9yZXF1ZXN0X2J0biB7DQogICAgICAgIHdpZHRoOiAyOSU7DQogICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgICAgICBwYWRkaW5nOiAzcHg7DQogICAgICAgIGJvcmRlcjogc29saWQgMXB4ICNhN2E3YTc7DQogICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsNCiAgICAgICAgY29sb3I6ICMxQTcyQzQ7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7DQogICAgfQ0KDQogICAgICAgIC5yZXN0b3JlR2VvQnRuew0KICAgICAgICAgICAgd2lkdGg6MTUlOw0KICAgICAgICB9DQogICAgICAgICAgICAucmVzZXQtZmlsdGVycy13cmFwcGVyIGRpdjpob3Zlcg0KICAgICAgICAgICAgLCAudXBsb2FkLWJ0bjpob3Zlcg0KICAgICAgICAgICAgLCAucmVzdG9yZUdlb0J0bjpob3Zlcg0KICAgICAgICAgICAgLCAuc3VibWl0X2Rvd25sb2FkX3JlcXVlc3RfYnRuOmhvdmVyIHsNCiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsNCiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgICAgICAgICB9DQoNCi5uby1maWx0ZXJzew0KICAgIHBhZGRpbmc6NXB4Ow0KICAgIGNvbG9yOiM4MDgwODA7DQp9DQoNCiN0b2dnbGUtaGV4LWxheWVyew0KICAgIG1hcmdpbjogMnB4IDVweDsNCn0NCg0KI2RyYXctdG9vbHMtd3JhcHBlciBkaXYgew0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICBtYXJnaW46IDJweCAxNXB4Ow0KICAgIHdpZHRoOiAyNHB4Ow0KICAgIGhlaWdodDogMjRweDsNCiAgICBmb250LXNpemU6LjhlbTsNCn0NCg0KI2dlby1maWx0ZXIgbGVnZW5kew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KfQ0KDQojZ2VvLWZpbHRlciBmaWVsZHNldCBwew0KICAgIGZvbnQtc2l6ZTouOWVtOw0KfQ0KDQoudGFiLWhlYWRlciB7DQogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOw0KICAgIHBhZGRpbmc6IDVweCAxMHB4Ow0KICAgIHdpZHRoOiA0MiU7DQp9DQoNCi50YWItaGVhZGVyIGRpdjpob3ZlcnsNCiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KfQ0KDQogICAgLnRhYi1oZWFkZXIuc2hvdy1maWx0ZXJzIHsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDsNCiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTsNCiAgICAgICAgY29sb3I6ICNhOGE4YTg7DQogICAgICAgIA0KICAgICAgICBoZWlnaHQ6IHVuc2V0Ow0KICAgIH0NCg0KICAgIC50YWItaGVhZGVyLmhpZGUtZmlsdGVycyB7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1NTU1NTU7DQogICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7DQogICAgICAgIGNvbG9yOiB3aGl0ZTsgICAgICAgIA0KICAgICAgICBoZWlnaHQ6IHVuc2V0Ow0KICAgIH0NCg0KLmFvaS1maWx0ZXItY29tbWFuZHMtd3JhcHBlciBkaXZ7DQogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7DQogICAgcGFkZGluZzowIDEwcHg7DQogICAgbWFyZ2luLXRvcDo1cHg7DQp9DQogICAgLmFvaS1maWx0ZXItY29tbWFuZHMtd3JhcHBlciBkaXY6Zmlyc3QtY2hpbGQgew0KICAgICAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCAjODA4MDgwOw0KICAgIH0NCg0KICAgIC5hb2ktZmlsdGVyLWNvbW1hbmRzLXdyYXBwZXIgZGl2OmhvdmVyew0KICAgICAgICB0ZXh0LWRlY29yYXRpb246bm9uZTsNCiAgICB9DQogICAgLmFvaS1maWx0ZXItY29tbWFuZHMtd3JhcHBlciBkaXY6bnRoLWNoaWxkKDIpOmhvdmVyew0KICAgICAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KICAgIH0NCg0KLnVsLWhpc3RvcnktbGF5ZXJzIHsNCiAgICBtYXJnaW4tbGVmdDogLTI1cHg7DQogICAgbWFyZ2luLXJpZ2h0OiAtMjVweDsNCn0NCi51bC1oaXN0b3J5LWxheWVycyBsaXsNCiAgICBsaXN0LXN0eWxlOmRlY2ltYWw7DQogICAgZm9udC1zaXplOi45ZW07DQp9DQogICAgLnVsLWhpc3RvcnktbGF5ZXJzIGxpIGRpdiB7DQogICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAgICAgcGFkZGluZzogMnB4IDhweDsgICAgICAgDQogICAgfQ0KICAgICAgICAudWwtaGlzdG9yeS1sYXllcnMgbGkgZGl2OmZpcnN0LWNoaWxkIHsNCiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM4MDgwODA7DQogICAgICAgICAgICB3aWR0aDogODBweDsNCiAgICAgICAgICAgIG92ZXJmbG93LXdyYXA6YnJlYWstd29yZDsNCiAgICAgICAgfQ0KDQogICAgICAgIC51bC1oaXN0b3J5LWxheWVycyAucmVtb3Zlew0KICAgICAgICAgICAgdmVydGljYWwtYWxpZ246bWlkZGxlOw0KICAgICAgICB9DQogICAgICAgIC51bC1oaXN0b3J5LWxheWVycyAucmVtb3ZlOmhvdmVyIHsNCiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICAgICAgfQ0KDQoNCi5kb3dubG9hZC1wb3B1cC13cmFwcGVyew0KICAgIHBhZGRpbmc6MTVweDsNCiAgICBtYXgtd2lkdGg6NDAwcHg7DQp9DQoNCi5kb3dubG9hZC1wb3B1cC13cmFwcGVyIHNlbGVjdHsNCiAgICB3aWR0aDoyMDBweDsNCn0NCg0KLmhlbHAtdG91cnsNCiAgICBwb3NpdGlvbjphYnNvbHV0ZTsNCiAgICByaWdodDo4cHg7DQogICAgYm9yZGVyLWxlZnQ6MXB4IHNvbGlkICM1NTU1NTU7DQogICAgcGFkZGluZzowIDAgMCAxMHB4Ow0KfQ0KLmhlbHAtdG91cjpob3ZlcnsNCiAgICBjdXJzb3I6cG9pbnRlcjsNCiAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KfQ0KLmhlbHAtdG91ciBpbWd7DQogICAgbWFyZ2luLXJpZ2h0OjVweDsNCn0NCg0KLnVpLXJhbmdlU2xpZGVyLWFycm93LCAudWktcmFuZ2VTbGlkZXItY29udGFpbmVyLCAudWktcmFuZ2VTbGlkZXItYmFyIHsNCiAgICBoZWlnaHQ6IDIwcHg7DQp9DQoNCi51aS1yYW5nZVNsaWRlci1sYWJlbHsNCiAgICBmb250LXNpemU6MTJweDsNCn0NCg0KLmNsb25lLWZpbHRlci1kZXNjew0KICAgIGZvbnQtc2l6ZToxMnB4Ow0KICAgIG1hcmdpbjoxMHB4IDAgMzBweCAyMHB4Ow0KfQ0KDQouZm9ybS1jb250cm9sIGlucHV0LCAuZm9ybS1jb250cm9sIHRleHRhcmVhew0KICAgIHdpZHRoOjEwMCUgIWltcG9ydGFudDsNCn0NCg0KLmZvcm0taXRlbS5yZXF1aXJlZCAuZm9ybS1sYWJlbHsNCiAgICBtaW4td2lkdGg6IDUlICFpbXBvcnRhbnQ7DQp9DQoNCiNleGFtcGxlLWZpbHRlcnMtd3JhcHBlciB1bCBsaXsNCiAgICBsaXN0LXN0eWxlOm5vbmU7DQogICAgbWFyZ2luLWxlZnQ6LTE1cHg7DQogICAgYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2E4YThhODsNCn0NCg0KLmV4YW1wbGUtbGlzdC1lbnRyeS13cmFwcGVyIHsNCiAgICBtYXJnaW46IDAgYXV0bzsNCiAgICBtYXgtd2lkdGg6NDAwcHg7DQogICAgZGlzcGxheTogLXdlYmtpdC1mbGV4OyAvKiBTYWZhcmkgKi8NCiAgICBkaXNwbGF5OiBmbGV4OyAvKiBTdGFuZGFyZCBzeW50YXggKi8NCiAgICBwYWRkaW5nOjNweCAwOw0KfQ0KICAgIC5leGFtcGxlLWxpc3QtZW50cnktd3JhcHBlciBidXR0b24gew0KICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgICAgIHBhZGRpbmc6IDNweDsNCiAgICAgICAgYm9yZGVyOiBzb2xpZCAxcHggI2E3YTdhNzsNCiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgICAgICBjb2xvcjogIzFBNzJDNDsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0Y1RjVGNTsNCiAgICB9DQoNCiAgICAgICAgLmV4YW1wbGUtbGlzdC1lbnRyeS13cmFwcGVyIGJ1dHRvbjpob3ZlciB7DQogICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KICAgICAgICB9DQogICAgICAgIC5leGFtcGxlLWxpc3QtZW50cnktd3JhcHBlciBkaXY6Zmlyc3QtY2hpbGQgew0KICAgICAgICAgICAgd2lkdGg6IDgwJTsNCiAgICAgICAgICAgIG1hcmdpbjogYXV0bzsNCiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQogICAgICAgICAgICBjb2xvcjojMUE3MkM0Ow0KICAgICAgICB9DQogICAgICAgICAgICAuZXhhbXBsZS1saXN0LWVudHJ5LXdyYXBwZXIgZGl2OmZpcnN0LWNoaWxkOmhvdmVyew0KICAgICAgICAgICAgICAgIGN1cnNvcjpwb2ludGVyOw0KICAgICAgICAgICAgfQ0KDQogICAgICAgICAgICAuZXhhbXBsZS1saXN0LWVudHJ5LXdyYXBwZXIgZGl2Om50aC1jaGlsZCgyKSB7DQogICAgICAgICAgICAgICAgd2lkdGg6IDE1JTsNCiAgICAgICAgICAgICAgICBtYXJnaW46IGF1dG87DQogICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgICAgICAgICAgfQ0KDQojbWFwX2dyYXBoaWNzX2xheWVyIGcgcGF0aCB7DQogICAgZmlsbDogbm9uZSAhaW1wb3J0YW50OyAgICANCiAgICBzdHJva2U6IHJnYigyNTUsIDAsIDApICFpbXBvcnRhbnQ7DQp9DQoNCiNUZW1wb3JhcnlNYXJrdXBfbGF5ZXIgZyBwYXRoIHsNCiAgICBmaWxsOiBub25lICFpbXBvcnRhbnQ7DQogICAgc3Ryb2tlOiByZ2IoMjU1LCAwLCAwKSAhaW1wb3J0YW50Ow0KfQ==");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnDownloadView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnFilterInfoView.html", "html", markup2);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnHelpTutorialView.html", "html", markup3);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnView.html", "html", markup4);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/OE_SageGrouseConsPlnView.old.html", "html", markup5);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.html", "html", markup6);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/checkbox.old.html", "html", markup7);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/radiobutton.html", "html", markup8);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.html", "html", markup9);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/rangeslider.old.html", "html", markup10);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.html", "html", markup11);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_SageGrouseConsPln/Templates/slider.old.html", "html", markup12);
});

})();
