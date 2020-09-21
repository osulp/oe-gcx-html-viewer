
// Module 'OE_Aquaculture'
        (function () {
var markup1 = '<a href=\'#\'></a><div class=\'module workflow-form oeAquacultureDynamicForm\' dir=\'ltr\'>    <div data-binding=\'{innerHTML:mainContent}\'></div>        <h3>Your Location</h3>    <div class=\'your_location\'>        <div class=\'data-hd\'>Detailed Site Suitability Report</div>        <div class=\'data-content\'>            <a data-binding=\'{href:reportLink}\' target=\'_blank\' href=\'\'>Download Report</a>        </div>        <div class=\'data-hd\'>Financial Planning</div>        <div class=\'data-content\'>            <a data-binding=\'{@event-onclick:runFinancialTool}\' href=\'javascript:void(0)\'>Run Financial Planning Tool for this location</a>        </div>        <div class=\'data-hd\'>Zoning</div>        <div class=\'data-content\' data-binding=\'{@text:fieldZoning}\'></div>        <div class=\'data-hd\'>Land Ownership</div>        <div class=\'data-content\' data-binding=\'{@text:fieldLandOwnership}\'></div>        <div class=\'data-hd\'>County</div>        <div class=\'data-content\' data-binding=\'{@text:fieldCounty}\'></div>        <div class=\'data-hd\'>City or Town</div>        <div class=\'data-content\' data-binding=\'{@text:fieldCityOrTown}\'></div>        <div class=\'data-hd\'>Within 100 year floodplain?</div>        <div class=\'data-content\' data-binding=\'{@text:fieldFloodplain100}\'></div>    </div>    <div style=\'text-align:right; width:100%; display: inline-block;\' class=\'form-btns\'>        <button id=\'backBtn\' class=\'button\' type=\'button\' data-binding=\'{@event-onclick:backForm}\'><< Back  </button>    </div></div>';
var markup2 = '<div id=\'aqua-financial-pln-wrapper\'>    <header>        <div class=\'header-bar-wrapper\'>            <div class=\'header-bar-left\'>                <!--<div data-binding=\'{@source:scenario_cache}\'>                    <div data-binding=\'{@template-for:scenario_cache}\'>                        <span data-binding=\'{@text:scenario_name}\'></span>                    </div>                </div>-->                <div class=\'header-warning-wrapper\' data-binding=\'{@visible:show_warning}\'>                    <div><img alt=\'Get a pdf of your Oregon Aquaculture Financial Planning scenario\' src=\'Resources/Images/Icons/Toolbar/alert-24.png\' class=\'bound-visible-inline\'></div>                    <div id=\'warning-message\' data-binding=\'{@event-onclick:gotoProductionTab}\'>Resource constraints less than required resources.  Results may not be realistic.</div>                </div>            </div>            <div class=\'header-bar-right\'>                <button data-binding=\'{@event-onclick:resetValues}\' class=\'toolbar-item tool aqua\' title=\'Reset values\'><img alt=\'Reset all of the values to default values.\' src=\'Resources/Images/Icons/Toolbar/sync-24.png\' class=\'bound-visible-inline\'><p>Reset Values</p></button>                <button data-binding=\'{@event-onclick:showPDFReportName}\' class=\'toolbar-item tool aqua\' title=\'Add layers to the map\'><img alt=\'Get a pdf of your Oregon Aquaculture Financial Planning scenario\' src=\'Resources/Images/Icons/Toolbar/reports-24.png\' class=\'bound-visible-inline\'><p>Full PDF Report</p></button>                <button data-binding=\'{@event-onclick:print}\' class=\'toolbar-item tool aqua\' title=\'Print the current page\'><img alt=\'Print the current page\' src=\'Resources/Images/Icons/Toolbar/print-24.png\' class=\'bound-visible-inline\'><p>Print Page</p></button>            </div>            <div id=\'report-name\' data-binding=\'{@visible:show_report_name_input}\'>                <div id=\'report-name-form\'>                    <div class=\'close-btn\' data-binding=\'{@event-onclick:hideReportNameInput}\'><img src=\'Resources/Images/Icons/close-16.png\' /></div>                                            <label>Enter name for report:</label>                        <br />                        <input type=\'text\' data-binding=\'{@value:report_name}\' />                        <div class=\'oe-btn-wrapper\'>                            <div data-binding=\'{@event-onclick: getPDFReport}\' class=\'oe-btn\'>Get PDF Report</div>                        </div>                                    </div>                            </div>        </div>    </header>    <div class=\'panel\'>        <div class=\'panel-row\'>            <div class=\'panel-cell tabs\'>                <div data-binding=\'{@source:screens_collection_filter}\' class=\'tab\'>                    <button class=\'tablinks\' data-binding=\'{@template-for:screens_collection_filter}{@text:screen}{@event-onclick:openTab}{id:tabId}{class:screenTabClass}\'></button>                </div>            </div>            <div id=\'printarea\' class=\'panel-cell screens\'>                <div data-binding=\'{@source:screens_collection_filter}\'>                    <div data-binding=\'{class:screenContentClass}{@template-for:screens_collection_filter}\'>                        <br />                        <div class=\'screen-title\'>                            <div>                                <h2 class=\'screen-header\' data-binding=\'{@text:screenTitle}{id:id}\'></h2>                            </div>                            <div>                                <h3 data-binding=\'{@text:selectedSystem}{@visible:show_select_system}\'></h3>                            </div>                        </div>                        <div data-binding=\'{@source: @context}{@template-selector: screen}\'>                            <div data-binding=\'{@template-select: Production}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/production.html}\'></div>                            <div data-binding=\'{@template-for: @context}\'>                                <div data-binding=\'{@source:sections}{@template-selector: sectionType}\'>                                    <!-- System Selection -->                                    <div data-binding=\'{@template-select:HtmlOverview}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/overview.html}\'>                                    </div>                                    <!-- System Selection -->                                    <div data-binding=\'{@template-select:Select System}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/selectSystem.html}\'>                                    </div>                                    <!-- Summary -->                                    <div data-binding=\'{@template-select:Summary Table}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/summary.html}\'>                                    </div>                                    <!-- Map Section -->                                    <div data-binding=\'{@template-select:Map}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/locationMap.html}\'>                                    </div>                                    <!-- Transportation Locations -->                                    <!--<div data-binding=\'{@template-select:transportationLocations}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/transportationLocations.html}{class:displayClass}\'>                                    </div>-->                                    <!-- Calculated Inputs -->                                    <div data-binding=\'{@template-select:InputsCalculated}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/inputsCalculated.html}{class:displayClass}\'>                                    </div>                                    <!-- Input Sections -->                                    <div data-binding=\'{@template-select:Input}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/inputs.html}\'>                                    </div>                                    <!-- Amortization Section -->                                    <div data-binding=\'{@template-select:AmortizationTable}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/amortization.html}\'>                                    </div>                                    <!-- Operating Charts -->                                    <div data-binding=\'{@template-select:OutputChart}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/operatingCharts.html}\'>                                    </div>                                    <!-- Default Parameter Sections -->                                    <div data-binding=\'{@template-select:Parameter}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/parameters.html}\'>                                    </div>                                    <!--all else-->                                    <div data-binding=\'{@template-for:sections}{@visible:visible}{class:displayClass}\'>                                        <fieldset>                                            <legend data-binding=\'{@text:displayName}\'></legend>                                            <div data-binding=\'{innerHTML:sectionDesc}\'></div>                                            <div data-binding=\'{@source:fields_filter}\'>                                                <div data-binding=\'{@template-for:fields_filter}\'>                                                    <span data-binding=\'{@text:fieldName}\'></span>                                                    <input type=\'text\' data-binding=\'{@value:value}{placeholder:value}{@event-change:updateModel}\' />                                                </div>                                            </div>                                        </fieldset>                                    </div>                                </div>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div></div><div id=\'fin-pln-footer\'>    <div id=\'pager-wrapper\'>        <div class=\'oe-brand\'>            <a href=\'https://oregonexplorer.info\' target=\'_blank\'><img src=\'Resources/Images/Custom/oe_logo_text.png\' /></a>        </div>        <center>            <div class=\'oe-btn-wrapper\'>                <div data-binding=\'{@visible: show_back_btn}{@event-onclick: gotoPrevScreen}\' class=\'oe-btn\'><- Back</div>            </div>            <div class=\'oe-btn-wrapper\'>                <div data-binding=\'{@event-onclick: gotoNextScreen}{@visible: show_next_btn}\' class=\'oe-btn\'>Next -></div>            </div>        </center>        <div data-binding=\'{@event-onclick: gotoSummary}{@visible: show_summary_btn}\' class=\'oe-btn-wrapper summary\'>            <div class=\'oe-btn\'>                <div>System</div>                <div>Summary</div>            </div>        </div>    </div></div><div id=\'loading-wrapper\' data-binding=\'{@visible:show_loading}\'>    <div id=\'loading\'>        <div>                   </div>    </div></div><div id=\'loading-wrapper-pdf\' data-binding=\'{@visible:show_loading_pdf}\'>    <div id=\'loading_pdf\'>        <div>            Generating PDF report....            Please wait        </div>    </div></div>';
var markup3 = '<div data-binding=\'{@template-for:sections}\'>    <fieldset>        <legend>Amortization Table</legend>        <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>        <br />        <div class=\'div-table amortization\' data-binding=\'{@source:amortization_table}\'>            <div class=\'div-table-row\' data-binding=\'{@template-for:amortization_table}{class:class}\'>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:paymentNumber}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:prevBalance}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:payment}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:interest}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:principal}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:newBalance}\'></span>                </div>                <div class=\'div-table-cell\'>                    <span data-binding=\'{@text:totInterest}\'></span>                </div>            </div>        </div>    </fieldset></div><br />';
var markup4 = '<div class=\'oe_select\'>    <div class=\'select\'>        <select data-binding=\'{@source: ddOptions}{@value: selDDoption}\'>            <option data-binding=\'{@template-for: ddOptions}{value: option}{@text: option}\' />        </select>    </div></div>     ';
var markup5 = '<div class=\'oe_select dd-locations\'>    <div class=\'select\'>        <select data-binding=\'{@source: ddOptions}{@value: selDDoption}\'>            <option data-binding=\'{@template-for: ddOptions}{value: option}{@text: option}\' />        </select>    </div>    <div data-binding=\'{@visible:showOtherInput}\'>        <div style=\'position:relative\'>            <hr />            <div data-binding=\'{id:fieldValidateMsgID}{class:fieldValidateMsgClass}\'>                <span data-binding=\'{innerHTML:fieldValidateMsg}\' class=\'tooltiptext\'></span>            </div>            <label>Enter a distance (miles)</label>            <input type=\'text\' data-binding=\'{id:fieldHandle}{@event-change:updateDistance}{@event-keyup:validateTextInput}{@event-onclick:checkClearTextInput}\' />        </div>    </div>    <!--<div data-binding=\'{@hidden:showOtherInput}\'>        <div style=\'position:relative\'>            <hr />                        <label>Routed distance (miles)</label>            <input type=\'text\' data-binding=\'{id:fieldHandle}\' readonly />        </div>    </div>--></div>     ';
var markup6 = '<span><input type=\'text\' data-binding=\'{@value:value}{placeholder:value}{@event-change:updateModel}\' /></span>';
var markup7 = '<div data-binding=\'{@template-for:sections}\'>    <fieldset>        <legend data-binding=\'{@text:displayName}\'></legend>        <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>        <div data-binding=\'{@source:fields_filter}\'>            <br />            <div data-binding=\'{@template-for:fields_filter}\'>                <div class=\'div-row\'>                    <hr />                    <div class=\'div-row-cell\'>                        <div class=\'input-header-wrapper\' data-binding=\'{@event-onclick:toggleDesc}\'>                            <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'></span>                            <span>&nbsp;(</span>                            <span data-binding=\'{@text:unit}\'></span>                            <span>)</span>                        </div>                        <div class=\'input_wrapper\' data-binding=\'{@source:@context}{@template-selector: uiType}\'>                            <!-- SLIDERS -->                            <div data-binding=\'{@template-select:slider}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/slider.html}\'></div>                            <!-- DROPDOWN -->                            <div data-binding=\'{@template-select:dropdown}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html}\'></div>                            <!--  Input NUMBERS -->                            <div data-binding=\'{@template-select:inputNumber}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/inputNumber.html}\'></div>                            <div data-binding=\'{@template-select:inputLocation}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html}\'></div>                            <!-- Default All Else -->                            <!--<div data-binding=\'{@template-for:@context}\'>        <span><input type=\'text\' data-binding=\'{@value:value}{placeholder:value}{@event-change:updateModel}\' /></span>    </div>-->                        </div>                    </div>                    <!--<div class=\'div-row-cell\' data-binding=\'{@event-onclick:toggleDesc}\'>                <div class=\'info-btn\' data-binding=\'{@hidden:showDesc}\'>                    <img src=\'Resources/Images/Icons/chevron-down-24.png\'>                </div>                <div class=\'info-btn\' data-binding=\'{@visible:showDesc}\'>                    <img src=\'Resources/Images/Icons/chevron-up-24.png\'>                </div>            </div>-->                    <div class=\'div-row-cell\'>                        <div class=\'desc\' data-binding=\'{@visible:showDesc}\'>                            <div class=\'input-header\' data-binding=\'{@text:fieldName}\'></div>                            <hr />                            <div class=\'notes\' data-binding=\'{@text:desc}\'></div>                        </div>                    </div>                </div>            </div>        </div>        <hr />        <div class\'notes\'>Enter your values.  Existing values are defaults that update related inputs.</div>    </fieldset></div>';
var markup8 = '<div data-binding=\'{@template-for:sections}\'>    <fieldset>        <legend data-binding=\'{@text:displayName}\'></legend>        <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>        <div data-binding=\'{@source:field_categories}\' class=\'div-row production\'>            <div data-binding=\'{@template-for:field_categories}\' class=\'div-row-cell\'>                <div data-binding=\'{@source:@context}{@template-selector:category}\'>                    <div data-binding=\'{@template-select:Input}\'>                        <h3>Your Inputs</h3>                        <div class=\'div-table production\' data-binding=\'{@source:fields_filter}\'>                            <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                                <div data-binding=\'{class:tableDisplayClass}\'>                                    <div class=\'tooltip\'>                                        <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'> </span>                                        <span data-binding=\'{@text:desc}\' class=\'tooltiptext\'></span>                                    </div>                                </div>                                <div data-binding=\'{@source:@context}{@template-selector: uiType}{class:tableDisplayClass}\'>                                    <!-- SLIDERS -->                                    <div data-binding=\'{@template-select:slider}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/sliderKendo.html}\'></div>                                    <!-- DROPDOWN -->                                    <div data-binding=\'{@template-select:dropdown}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html}\'></div>                                    <!-- DROPDOWN LOCATIONS -->                                    <div data-binding=\'{@template-select:dropdownLocations}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/dropdownLocations.html}\'></div>                                    <!--  Input NUMBERS -->                                    <div data-binding=\'{@template-select:inputNumber}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/inputNumber.html}\'></div>                                    <!--  LAT LONG -->                                    <div data-binding=\'{@template-select:inputLocation}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html}\'></div>                                    <!-- Default All Else -->                                    <div data-binding=\'{@template-for:@context}\'>                                        <span data-binding=\'{@text:formattedValue}\'></span>                                    </div>                                </div>                            </div>                        </div>                    </div>                                        <div data-binding=\'{@template-select:InputCalculated}\'>                        <h3>Calculated</h3>                        <div class=\'div-table production\' data-binding=\'{@source:fields_filter}\'>                            <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                                <div data-binding=\'{class:tableDisplayClass}\'>                                    <div class=\'tooltip\'>                                        <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'> </span>                                        <span data-binding=\'{@text:desc}\' class=\'tooltiptext\'></span>                                    </div>                                </div>                                <div data-binding=\'{class:tableDisplayClass}\'><span data-binding=\'{@text:formattedValue}\'></span></div>                            </div>                        </div>                    </div>                </div>            </div>        </div>        <!--input location display-->        <!--<div data-binding=\'{@source:field_ui_categories}\' class=\'div-row production\'>            <div data-binding=\'{@template-for:field_ui_categories}\' class=\'div-row-cell input-location-section\'>                <div data-binding=\'{@source:@context}{@template-selector:category}\'>                    <div data-binding=\'{@template-select:inputLocation}\'>                        <h3>Locations</h3>                        <div class=\'div-table\' data-binding=\'{@source:fields}\'>                            <div class=\'div-table-row\' data-binding=\'{@template-for:fields}\'>                                <div data-binding=\'{class:tableDisplayClass}\'>                                    <span class=\'input-header\' data-binding=\'{@text:fieldName}\'></span>                                </div>                                <div data-binding=\'{class:tableDisplayClass}\'><span data-binding=\'{innerHTML:value}\'></span></div>                            </div>                        </div>                    </div>                </div>            </div>        </div>-->    </fieldset>    <br /></div>';
var markup9 = 'Location?<span data-binding=\'{innerHTML:value}\'></span>';
var markup10 = '<div class=\'panel-cell location\'>    <fieldset id=\'map-section\'>        <legend>Location</legend>        <div id=\'location-wrapper\'>            <div id=\'location-status\' data-binding=\'{@visible: show_selected_location}\'>                <div id=\'location-status-selected\' data-binding=\'{@source:selected_location}\'>                    <div data-binding=\'{@template-for:selected_location}\'>                        <span> SELECTED:  </span>                        <span id=\'selected-location-name\' data-binding=\'{@event-onclick: zoomToSelectedLocation}{@text:name}\'></span>                        <span id=\'selected-location-remove\' title=\'Remove selected location\' data-binding=\'{@event-onclick: removeSelectedLocation}\'><img src=\'Resources/Images/Icons/delete-16.png\' /></span>                    </div>                </div>            </div>            <div id=\'location-instruction\' data-binding=\'{@hidden: show_selected_location}\'>                No location selected.  Select a location by searching or clicking on the map.            </div>            <div data-binding=\'{@visible: show_add_location}\'>                <div id=\'add-location\'>                    <div id=\'add-location-msg\'>                        <div>                            <p>No location set.</p>                            <p>  Would you like to add a location or run the model without location information?</p>                            <div id=\'pager-wrapper\'>                                <center>                                    <div class=\'oe-btn-wrapper\'>                                        <div data-binding=\'{@event-onclick: setLocation}\' class=\'oe-btn add-location\'>+ Add location</div>                                    </div>                                </center>                            </div>                            <hr />                            <div>                                <em>** If no location is added, the model will run with generic values for location specific parameters.</em>                            </div>                        </div>                    </div>                </div>            </div>            <div class=\'calcite\'>                <div id=\'search-wrapper\'>                    <div id=\'search\'></div>                </div>                <div id=\'location-map\'>                    <div id=\'home-button\'></div>                    <div id=\'basemap-toggle\'></div>                </div>            </div>        </div>    </fieldset>    <fieldset>        <legend>More resources</legend>        <div class=\'div-row\'>            <div class=\'div-row-cell site-report\'>                <h3>Site Report</h3>                <div>                    <div class=\'float-left\'>                        <img src=\'Resources/Images/Custom/AquacultureSiteReportThumb.png\' width=\'100\' alt=\'Site Report Thumbnail\' />                    </div>                    <p> Get a Site Report for your selected location.  A Site Report pulls together spatial information about your location including:</p>                    <br />                </div>                                <div class=\'clear\'>                    <ul>                        <li>Zoning and Ownership</li>                        <li>Geophysical (precipitation, elevation, and temperature)</li>                        <li>Markets and Suppliers</li>                        <li>Water and Energy</li>                        <li>Habitat and Floodplain</li>                    </ul>                </div>                <div data-binding=\'{@hidden:show_site_report_url}\'>                    <center>                        <div class=\'oe-btn-wrapper\'>                            <div data-binding=\'{@event-onclick: runSiteReport}\' class=\'oe-btn\'>Generate Site Report</div>                        </div>                    </center>                </div>                <div id=\'site-report-generating\' data-binding=\'{@visible: site_report_loading}\'>                    <div>                        Generating site report for your selected location.  Please be patient.  This may take a minute...                        <p>                            <img src=\'Resources/Images/loader-small.gif\' alt=\'generating site report\' />                        </p>                    </div>                </div>                <div data-binding=\'{@visible: show_site_report_url}\'>                    <a data-binding=\'{href:site_report_url}\' href=\'\' target=\'_blank\' download=\'Site Report\'><img src=\'Resources/Images/Icons/download-16.png\' alt=\'Download site report\' />&nbsp; Download Site Report (PDF)</a>                </div>            </div>            <div class=\'div-row-cell map-viewer\'>                <h3>Aquaculture Map Viewer</h3>                <div>                    <div class=\'float-left\'>                        <!--<button data-binding=\'{@event-onclick:closeView}\' class=\'toolbar-item tool aqua\' title=\'Goto map viewer\'><p>Map Viewer</p></button>-->                        <img width=\'150\' alt=\'Go to map viewer\' src=\'Resources/Images/Custom/AquacultureViewer.png\' class=\'bound-visible-inline\'>                    </div>                    <p>                        The Oregon Aquaculture Map Viewer brings together dozens of layers to view interactively on the map.                        <!--<a href=\'https://tools.oregonexplorer.info/OE_HtmlViewer/index.html?viewer=aquaculture\' target=\'_blank\'>Open in new tab.</a>-->                    </p>                    <br />                </div>                <div class=\'clear\'>                                        <ul>                        <li>View and query layers</li>                        <li>Print a map</li>                        <li>Measure distances</li>                        <li>Run the Financial Planning and Site Report tools interactively based on site selectins</li>                    </ul>                </div>                <center>                    <div class=\'oe-btn-wrapper\'>                        <div data-binding=\'{@event-onclick: gotoMapViewer}\' class=\'oe-btn\'>Open map viewer in new tab</div>                    </div>                </center>            </div>        </div>    </fieldset>    <br /><br /></div>';
var markup11 = '<div data-binding=\'{@template-for:sections}\' class=\'oe_chart_aquaculture\'>    <fieldset>        <legend data-binding=\'{@text:displayName}\'></legend>        <!--<div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>-->        <br />        <div data-binding=\'{@source:fields_filter}\'>            <div data-binding=\'{@template-for:fields_filter}\'>                <div data-binding=\'{@source:chartConfig}\'>                    <div class=\'div-row\' data-binding=\'{@template-for:chartConfig}\'>                        <div class=\'div-row-cell\' data-binding=\'{data-table:chartID}\'>                            <div class=\'div-table\' data-binding=\'{@source:chartData}\'>                                <div class=\'div-table-row\' data-binding=\'{@template-for:chartData}\'>                                    <div class=\'div-table-cell\' data-binding=\'{@text:category}\'></div>                                    <div class=\'div-table-cell\' data-binding=\'{@text:value}\'></div>                                    <div class=\'div-table-cell\' data-binding=\'{@text:percent}\'></div>                                </div>                            </div>                        </div>                        <div class=\'div-row-cell\'>                            <div class=\'demo-section k-content wide\' >                                <div data-binding=\'{id:chartID}\'></div>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </fieldset></div><br />';
var markup12 = '<fieldset>    <legend>Introduction</legend>    <div class=\'section-desc\'>        <p>            <b>Welcome to the Oregon Aquaculture Financial Planning Tool!</b>        </p>        <p>            This tools is designed to help you learn about aquaculture systems and the financial considerations involved in setting up an operation.         </p>        <p>             To navigate around the tool, use the left navigation tabs to step through the various components of an aquaculture system.  You can jump directly to the <b>Summary</b> page and see the full range of calculated values based on the defaults or your selections for selected inputs like feed cost, labor rates, etc.        </p>        <p>For more information contact John Moehl and Gil Sylvia :)</p>            </div></fieldset>';
var markup13 = '<div data-binding=\'{@template-for:sections}\'>    <!--<div data-binding=\'{@hidden:visible}{class:displayClass}{@event-onclick:toggleParameters}\'>        Show / hide assumptions and calculations    </div>-->    <!--<div data-binding=\'{class:displayClass}\'>-->        <fieldset>            <legend class=\'tooltip\'>                      <span class=\'input-header\'>Assumptions & Calculations</span>                    <span data-binding=\'{innerHTML:sectionDesc}\' class=\'tooltiptext\'></span>            </legend>                       <br />            <br />            <div class=\'div-table parameters\' data-binding=\'{@source:fields_filter}\'>                <!--<thead><td>Parameter</td><td>Unit</td><td>Value</td></thead>-->                <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                    <div class=\'div-table-cell\'>                        <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'></span>                    </div>                    <!--<div class=\'div-table-cell units\'><span data-binding=\'{@text:unit}\'></span></div>-->                    <div class=\'div-table-cell values\'> <span data-binding=\'{@text:formattedValue}\'></span></div>                </div>            </div>        </fieldset>    <!--</div>--></div><br />';
var markup14 = '<div data-binding=\'{@source:sections}\'>    <div data-binding=\'{@template-for:sections}{@visible:visible}\'>        <div data-binding=\'{@source:@context}{@template-selector:sectionType}\'>            <div data-binding=\'{@template-select:Production}\'>                <fieldset>                    <legend data-binding=\'{@text:displayName}\'></legend>                                       <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>                    <!--<br />-->                    <div id=\'production-targets\' data-binding=\'{@source:fields_filter}\' class=\'div-row\'>                        <div data-binding=\'{@template-for:fields_filter}\' class=\'div-row-cell\'>                            <div data-binding=\'{@source:@context}{@template-selector:uiType}\'>                                <div data-binding=\'{@template-select:dropdown}\'>                                    <center>                                        <h3 class=\'tooltip\'>                                            <span class=\'input-header\'>Market Size (lbs)</span>                                            <span class=\'tooltiptext\'>                                                Select the size of your whole fish product at which you will sell it to the market                                            </span>                                        </h3>                                        <div data-binding=\'{@source:@context}{@template:geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html}\'></div>                                    </center>                                </div>                                <div data-binding=\'{@template-select:slider}\'>                                    <center>                                        <h3 class=\'tooltip\'>                                            <span class=\'input-header\'>Annual Harvest (lbs)</span>                                            <span class=\'tooltiptext\'>                                                Select the size of your annual harvest                                            </span>                                        </h3>                                    </center>                                    <div data-binding=\'{@source:@context}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/sliderKendo.html}\'></div>                                </div>                            </div>                        </div>                    </div>                </fieldset>            </div>        </div>        <div data-binding=\'{@source:@context}{@template-selector:sectionType}\'>            <div data-binding=\'{@template-select:ReqResources}\'>                <fieldset>                    <legend data-binding=\'{@text:displayName}\'></legend>                                        <div data-binding=\'{@source:field_categories}\' class=\'div-row production\'>                        <div data-binding=\'{@template-for:field_categories}\' class=\'div-row-cell\'>                            <div data-binding=\'{@source:@context}{@template-selector:category}\'>                                <div data-binding=\'{@template-select:ExistingResource}\'>                                    <h3>Resource constraints</h3>                                    <div class=\'production notes\'>(Enter any known constraints)</div>                                    <div class=\'div-table production\' data-binding=\'{@source:fields_filter}\'>                                        <!--<div class=\'div-table-row\'>                                            <div class=\'div-table-cell\'>Existing Resource</div>                                            <div class=\'div-table-cell\'>Value</div>                                        </div>-->                                        <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                                            <div data-binding=\'{class:tableDisplayClass}\'>                                                <div class=\'tooltip\'>                                                    <span class=\'input-header\' data-binding=\'{@text:fieldName}\'> </span>                                                    <span data-binding=\'{@text:desc}\' class=\'tooltiptext\'></span>                                                </div>                                            </div>                                            <div data-binding=\'{@source:@context}{@template-selector: uiType}{class:tableDisplayClass}\'>                                                <div data-binding=\'{@template-select:inputNumber}\'>                                                    <span><input type=\'text\' data-binding=\'{placeholder:unit}{@value:value}{@event-change:updateModel}{@event-keyup:checkReset}\' /></span>                                                </div>                                                <!-- SLIDERS -->                                                <div data-binding=\'{@template-select:slider}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/sliderKendo.html}\'></div>                                                <!-- DROPDOWN -->                                                <div data-binding=\'{@template-select:dropdown}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html}\'></div>                                                <!--  Input NUMBERS -->                                                <!--<div data-binding=\'{@template-select:inputNumber}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/inputNumber.html}\'></div>-->                                                <div data-binding=\'{@template-select:inputLocation}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html}\'></div>                                                <!-- Default All Else -->                                                <div data-binding=\'{@template-for:@context}\'>                                                    <span data-binding=\'{@text:formattedValue}\'></span>                                                </div>                                            </div>                                        </div>                                    </div>                                </div>                                <div data-binding=\'{@template-select:RequiredResource}\'>                                    <h3>Required resources</h3>                                    <div class=\'production notes\'>(Based on the production targets above)</div>                                    <div class=\'div-table production\' data-binding=\'{@source:fields_filter}\'>                                        <!--<div class=\'div-table-row\'>                                            <div class=\'div-table-cell\'>Required Resource</div>                                            <div class=\'div-table-cell\'>Value</div>                                        </div>-->                                        <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                                            <div data-binding=\'{class:tableDisplayClass}\'>                                                <div class=\'tooltip\'>                                                    <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'> </span>                                                    <span data-binding=\'{@text:desc}\' class=\'tooltiptext\'></span>                                                </div>                                            </div>                                            <div data-binding=\'{class:class}\'><span data-binding=\'{@text:formattedValue}\'></span></div>                                        </div>                                    </div>                                    <div class=\'required-notes\' data-binding=\'{@visible:show_warning}\'>                                        <span>Values in </span><span class=\'warning-span\'>YELLOW</span><span> indicate you have exceeded your available resource. Adjust the Annual Harvest slider until there are no</span><span class=\'warning-span\'>YELLOW</span><span> values. </span>                                    </div>                                </div>                            </div>                        </div>                    </div>                                        <br />                </fieldset>            </div>        </div>        <div data-binding=\'{@source:@context}{@template-selector:sectionType}\'>            <div data-binding=\'{@template-select:Parameter}\'>                <fieldset>                    <legend class=\'tooltip\'>                        <span class=\'input-header\'>Assumptions & Calculations</span>                        <span data-binding=\'{innerHTML:sectionDesc}\' class=\'tooltiptext\'></span>                    </legend>                                        <br />                                       <br />                    <div class=\'div-table parameters\' data-binding=\'{@source:fields_filter}\'>                        <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                            <div data-binding=\'{class:tableDisplayClass}\'>                                <span class=\'input-header\' data-binding=\'{@text:fieldName}\'></span>                            </div>                            <div class=\'div-table-cell values\'><span data-binding=\'{@text:formattedValue}\'></span></div>                        </div>                    </div>                </fieldset>            </div>        </div>    </div></div><br />';
var markup15 = '<div data-binding=\'{@template-for:sections}{@visible:visible}\'>    <fieldset>        <legend data-binding=\'{@text:displayName}\'></legend>        <br />        <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>        <br />        <div class=\'div-row\'>            <h3>Select a resource you can use for this system</h3>            <hr />            <div class=\'div-row-cell\'>                <div class=\'rdgroup\' data-binding=\'{@source:fields}\'>                    <div data-binding=\'{@template-for:fields}\'>                        <div data-binding=\'{@source:@context}{@template-selector:uiType}\'>                            <div data-binding=\'{@template-select:none}\'>                                <label class=\'container\'>                                    <span data-binding=\'{@text:fieldName}\'></span>                                    <input type=\'radio\' checked name=\'qstart\' data-binding=\'{@event-onclick:setSelectedQuickstartResource}\'>                                    <span class=\'checkmark\'></span>                                </label>                            </div>                            <div data-binding=\'{@template-select:radiobutton}\'>                                <label class=\'container\'>                                    <span data-binding=\'{@text:fieldName}\'></span>                                    <input type=\'radio\' name=\'qstart\' data-binding=\'{checked:selected}{@event-onclick:setSelectedQuickstartResource}\'>                                    <span class=\'checkmark\'></span>                                </label>                            </div>                        </div>                    </div>                </div>            </div>            <div class=\'div-row-cell\' data-binding=\'{@source:fields_filter}\'>                <div data-binding=\'{@template-for:fields_filter}{@visible:visible}\'>                    <br />                    <div class=\'div-row no-pad\'>                        <div class=\'div-row-cell\'>                            <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'></span>                            <span>&nbsp;(</span>                            <span data-binding=\'{@text:unit}\'></span>                            <span>)</span>                        </div>                        <div class=\'div-row-cell\'>                            <span><input type=\'text\' data-binding=\'{@value:value}{placeholder:value}{@event-change:updateModel}\' /></span>                        </div>                    </div>                    <div class=\'desc\'>                        <div class=\'input-header\' data-binding=\'{@text:fieldName}\'></div>                        <hr />                        <div class=\'notes\' data-binding=\'{@text:desc}\'></div>                    </div>                </div>            </div>        </div>        <br />        <div class=\'div-table\' data-binding=\'{@source:fields_filter}\'>            <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                <div data-binding=\'{class:tableDisplayClass}\'>                    <span class=\'input-header\' data-binding=\'{@text:fieldName}\'></span>                </div>                <div class=\'div-table-cell values\'><span data-binding=\'{@text:formattedValue}\'></span></div>            </div>        </div>        <div class=\'table-notes\'>Initial values are defaults.  Values can be changed above.</div>    </fieldset></div>';
var markup16 = '<div class=\'panel-cell\'>    <fieldset>        <legend>Select Aquaculture System</legend>        <em>For this application an aqualculture system is considered a species and a production method.</em>        <br />        <br />        <!--        <div class=\'filter-header-wrapper\' data-binding=\'{@event-onclick: toggleSystemFilters}\'>            <div> <img alt=\' \' width=\'14\' src=\'Resources/Images/Icons/filter-24.png\' class=\'bound-visible-inline\'><b>Filter by</b></div>            <div data-binding=\'{class: show_filter_class}\'></div>        </div>        <div id=\'system-filters-wrapper\' data-binding=\'{@visible:show_system_filters}\'>            <div id=\'filter-type-header\'>                <div>Species</div>                <div>Production Method</div>            </div>            <div id=\'filters-wrapper\'>                <div>                    <select data-binding=\'{@source: species_tbl}{@value: selected_species_filter}\'>                        <option data-binding=\'{@template-for: species_tbl}{value: species}{disabled: disabled}{@text: species}\' />                    </select>                </div>                <div>                    <select data-binding=\'{@source: prod_meth_tbl}{@value: selected_prod_meth_filter}\'>                        <option data-binding=\'{@template-for: prod_meth_tbl}{value: production_method}{@text: production_method}{disabled: disabled}\' />                    </select>                </div>            </div>        </div>-->        <br />        <div id=\'system-select-wrapper\' data-binding=\'{@source: systems_tbl_filter}\'>            <div data-binding=\'{@template-for: systems_tbl_filter}\'>                <label class=\'container\'>                    <span data-binding=\'{@text:systemTitle}\'></span>                    <input type=\'radio\' name=\'aquasystem\' data-binding=\'{checked:selected}{@event-onclick:setSelectedSystem}\'>                    <span class=\'checkmark\'></span>                </label>            </div>        </div>        <!--<div data-binding=\'{@visible:show_no_systems_in_filtered_view}\'>            <center>                <div>                    <em>No aquaculture systems match your selected filters.</em>                </div>                <br />                <div class=\'oe-btn-wrapper\'>                    <div data-binding=\'{@event-onclick: resetFilters}\' class=\'oe-btn clear-filters\'>Clear Filters</div>                </div>            </center>        </div>-->    </fieldset>    <br />    <div class=\'div-row system-overview\' data-binding=\'{@source: selected_system}\'>        <div class=\'desc\' data-binding=\'{@template-for: selected_system}\'>            <div class=\'input-header\' data-binding=\'{@text:systemTitle}\'></div>            <hr />            <!--<div class=\'img-wrapper-left\'>                <img data-binding=\'{src:img_src}\' />            </div>-->            <div data-binding=\'{innerHTML:overview}\'></div>        </div>    </div>    <br />    <div class=\'div-row overview\'>        <!--<div class=\'div-row-column\'>-->        <div class=\'div-row-cell\' data-binding=\'{@source: species_tbl_filter}\'>            <div class=\'desc\' data-binding=\'{@template-for: species_tbl_filter}\'>                <div class=\'input-header\' data-binding=\'{@text:species}\'></div>                <hr />                <div class=\'img-wrapper-center\'>                    <img data-binding=\'{src:img_src}\' />                    <div class=\'img-caption\' data-binding=\'{@text:img_credit}\'></div>                </div>                                <div data-binding=\'{innerHTML:overview}\'></div>            </div>        </div>        <!--</div>        <div class=\'div-row-column\'>-->        <div class=\'div-row-cell\' data-binding=\'{@source: prod_meth_tbl_filter}\'>            <div class=\'desc\' data-binding=\'{@template-for: prod_meth_tbl_filter}\'>                <div class=\'input-header\' data-binding=\'{@text:production_method}\'></div>                <hr />                <div class=\'img-wrapper-center\'>                    <img data-binding=\'{src:img_src}\' />                    <div class=\'img-caption\' data-binding=\'{@text:img_credit}\'></div>                </div>                                <div data-binding=\'{innerHTML:overview}\'></div>            </div>        </div>        <!--</div>-->    </div>    <br />    <br /></div>';
var markup17 = '<div class=\'slider-wrapper div-row\'>    <div class=\'div-row-cell\'>        <div data-binding=\'{id:fieldCalVar}\'>            <!--<div class=\'ui-slider-handle oe-slider-handle\'></div>-->        </div>    </div>    <div class=\'div-row-cell\'>        <div class=\'slider-value\' data-binding=\'{id:fieldHandle}\'></div>    </div>    </div>';
var markup18 = '<div class=\'slider-wrapper\'>    <div class=\'slider-handle-wrapper\'>        <!--<div class=\'slider-value\' data-binding=\'{id:fieldHandle}\'></div>-->        <div data-binding=\'{id:fieldValidateMsgID}{class:fieldValidateMsgClass}\'>            <span data-binding=\'{innerHTML:fieldValidateMsg}\' class=\'tooltiptext\'></span>        </div>        <div class=\'slider-text-input-div\' data-binding=\'{data-value:unit}\'>            <!--<img src=\'Resources/Images/Icons/file-edit-16.png\' />-->            <input type=\'text\' class=\'slider-value\' data-binding=\'{id:fieldHandle}{@event-change:updateSlider}{@event-keyup:validateTextInput}{@event-onclick:checkClearTextInput}\' />        </div>    </div>    <input class=\'oe_slider\' data-binding=\'{id:fieldID}\' /></div>';
var markup19 = '<div data-binding=\'{@source:summary_table}\'>    <div data-binding=\'{@template-for:summary_table}\'>        <div data-binding=\'{@source:summary_sections}\'>            <div data-binding=\'{@template-for:summary_sections}\'>                <!--<div data-binding=\'{class:displayClass}\'>-->                <fieldset>                    <legend data-binding=\'{@text:screen}{@event-onclick:gotoTab}\'></legend>                    <br />                    <div class=\'div-table production\' data-binding=\'{@source:fields_filter}\'>                        <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                            <div data-binding=\'{class:tableDisplayClass}\'>                                <span class=\'input-header\' data-binding=\'{@text:fieldName}\'></span>                            </div>                            <div data-binding=\'{class:tableDisplayClass}\'><span data-binding=\'{@text:formattedValue}\'></span></div>                        </div>                    </div>                    <!--<div class=\'div-table\' data-binding=\'{@source:fields_filter}\'>                        <div class=\'div-table-row\' data-binding=\'{@template-for:fields_filter}\'>                            <div class=\'div-table-cell\'>                                <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'></span>                            </div>                            <div class=\'div-table-cell values\'> <span data-binding=\'{@text:formattedValue}\'></span></div>                        </div>                    </div>-->                </fieldset>                </div>            </div>    </div></div><br /><br />';
var markup20 = '<div data-binding=\'{@template-for:sections}\'>    <fieldset>        <legend data-binding=\'{@text:displayName}\'></legend>        <div class=\'section-desc\' data-binding=\'{innerHTML:sectionDesc}\'></div>        <div data-binding=\'{@source:fields_filter}\'>            <br />            <div data-binding=\'{@template-for:fields_filter}\'>                <div class=\'div-row\'>                    <hr />                    <div class=\'div-row-cell\'>                        <div class=\'input-header-wrapper\' data-binding=\'{@event-onclick:toggleDesc}\'>                            <span class=\'input-header\' data-binding=\'{@text:fieldLabel}\'></span>                            <span>&nbsp;(</span>                            <span data-binding=\'{@text:unit}\'></span>                            <span>)</span>                        </div>                        <div class=\'input_wrapper\' data-binding=\'{@source:@context}{@template-selector: uiType}\'>                            <div data-binding=\'{@template-select:inputLocation}{@template: geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html}\'></div>                                                   </div>                    </div>                                        <div class=\'div-row-cell\'>                        <div class=\'desc\' data-binding=\'{@visible:showDesc}\'>                            <div class=\'input-header\' data-binding=\'{@text:fieldName}\'></div>                            <hr />                            <div class=\'notes\' data-binding=\'{@text:desc}\'></div>                        </div>                    </div>                </div>            </div>        </div>        <hr />            </fieldset></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormView": function () {
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
    var OE_AquacultureDynamicFormView = /** @class */ (function (_super) {
        __extends(OE_AquacultureDynamicFormView, _super);
        function OE_AquacultureDynamicFormView(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            _this.runFinancialTool = function (event, element, context) {
                context.myModel.RunFinancialTool();
                return true;
            };
            _this.cancelForm = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'close');
                context.myWorkflowContext.completeActivity();
                //context.myModel.closeView();
                return true;
            };
            _this.backForm = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'back');
                context.myWorkflowContext.completeActivity();
                //context.myModel.closeView();
                return true;
            };
            _this.listForm = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'list');
                context.myWorkflowContext.completeActivity();
                //context.myModel.closeView();
                return true;
            };
            _this.reportForm = function (event, element, context) {
                context.myWorkflowContext.setValue("customFormResult", 'report');
                context.myWorkflowContext.completeActivity();
                //context.myModel.closeView();
                return true;
            };
            return _this;
        }
        return OE_AquacultureDynamicFormView;
    }(ViewBase_1.ViewBase));
    exports.OE_AquacultureDynamicFormView = OE_AquacultureDynamicFormView;
});

},
"geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormViewModel": function () {
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Framework.UI.AMD.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables"], function (require, exports, ViewModelBase_1, observables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_AquacultureDynamicFormViewModel = /** @class */ (function (_super) {
        __extends(OE_AquacultureDynamicFormViewModel, _super);
        function OE_AquacultureDynamicFormViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            //input
            _this.mainContent = new observables_1.Observable("");
            _this.fieldZoning = new observables_1.Observable("");
            _this.fieldLandOwnership = new observables_1.Observable("");
            _this.fieldCounty = new observables_1.Observable("");
            _this.fieldCityOrTown = new observables_1.Observable("");
            _this.fieldFloodplain100 = new observables_1.Observable("");
            _this.reportLink = new observables_1.Observable("");
            _this.financialWorkflowID = new observables_1.Observable();
            _this.mapPointIn = new observables_1.Observable();
            //output
            _this.customFormResult = new observables_1.Observable("");
            //workflow ref
            _this.myWorkflowContext = new observables_1.Observable(null);
            _this.myModel = new observables_1.Observable(null);
            return _this;
        }
        OE_AquacultureDynamicFormViewModel.prototype.initialize = function (config) {
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
            }
        };
        OE_AquacultureDynamicFormViewModel.prototype._onSiteInitialized = function (site, thisViewModel) {
            //dynamic external workflow form
            this.app.registerActivityIdHandler("displayAquacultureForm", function CustomEventHandler(workflowContext) {
                thisViewModel.myModel = thisViewModel;
                thisViewModel.myWorkflowContext = $.extend({}, workflowContext);
                var wf;
                thisViewModel.app.commandRegistry.command("ActivateView").execute("OE_AquacultureDynamicFormView");
                thisViewModel.mainContent.set(thisViewModel.myWorkflowContext.getValue("mainContent"));
                thisViewModel.fieldZoning.set(thisViewModel.myWorkflowContext.getValue("fieldZoning"));
                thisViewModel.fieldLandOwnership.set(thisViewModel.myWorkflowContext.getValue("fieldLandOwnership"));
                thisViewModel.fieldCounty.set(thisViewModel.myWorkflowContext.getValue("fieldCounty"));
                thisViewModel.fieldCityOrTown.set(thisViewModel.myWorkflowContext.getValue("fieldCityOrTown"));
                thisViewModel.fieldFloodplain100.set(thisViewModel.myWorkflowContext.getValue("fieldFloodplain100"));
                thisViewModel.reportLink.set(thisViewModel.myWorkflowContext.getValue("reportLink"));
                thisViewModel.financialWorkflowID.set(thisViewModel.myWorkflowContext.getValue("financialWorkflowID"));
                thisViewModel.mapPointIn.set(thisViewModel.myWorkflowContext.getValue("mapPointIn"));
            });
        };
        OE_AquacultureDynamicFormViewModel.prototype.cleanOnClose = function () {
            //this.app.commandRegistry.command("ClearMarkupQuiet").execute();
        };
        OE_AquacultureDynamicFormViewModel.prototype.closeView = function () {
            //this.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureDynamicFormView");
        };
        OE_AquacultureDynamicFormViewModel.prototype.RunFinancialTool = function () {
            var workflowArgs = {};
            workflowArgs.workflowId = this.financialWorkflowID.get(); //cStep["runWorkflowById"];
            workflowArgs.inputPoint = this.mapPointIn.get();
            this.app.commandRegistry.commands.RunWorkflowWithArguments.execute(workflowArgs);
        };
        return OE_AquacultureDynamicFormViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_AquacultureDynamicFormViewModel = OE_AquacultureDynamicFormViewModel;
});

},
"geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView": function () {
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
    var OE_AquacultureFinancialView = /** @class */ (function (_super) {
        __extends(OE_AquacultureFinancialView, _super);
        function OE_AquacultureFinancialView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_AquacultureFinancialView.prototype.activated = function () {
            var thisScope = this;
            this.fitScreenHeight();
            this.setSelectedSystem(null, null, this.viewModel.selected_system.get());
            //load map to preserve location in report if clicked without having gone to location tab.
            this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(0));
            //window.setTimeout(() => {
            //    thisScope.openTab(null, null, thisScope.viewModel.screens_collection_filter.getAt(0));
            //    //avoid flicker of map loading
            //    window.setTimeout(() => { thisScope.viewModel.show_loading.set(false);}, 500);
            //}, 500);
            //this.renderMap();
            $(window).resize(function () {
                thisScope.fitScreenHeight();
                thisScope.resizeMap();
            });
        };
        OE_AquacultureFinancialView.prototype.openTab = function (evt, elem, ctx) {
            //let screenOrder = !this.viewModel.show_all_tabs.get() && ctx.screen === 'Summary' ? 2 : parseInt(ctx.screenOrder) - 1;
            if (ctx) {
                var screenOrder = parseInt(ctx.screenOrder) - 1;
                this.viewModel.active_screen.set(screenOrder);
                this.viewModel.show_back_btn.set(screenOrder > 0);
                this.viewModel.show_next_btn.set(screenOrder < (this.viewModel.screens_collection_filter.length() - 1));
                this.viewModel.screens_collection.get().forEach(function (scr) {
                    scr['screenTabClass'].set('tablinks ' + (ctx.id === scr['id'] ? 'activeTab' : 'inactiveTab'));
                    scr['screenContentClass'].set('tabcontent ' + (ctx.id == scr['id'] ? 'activeScreen' : 'inactiveScreen'));
                });
                this.setUIInputs();
                $('#modal-description').stop().animate({
                    'scrollTop': $('#' + ctx.id)
                }, 800, 'swing');
                //load map if on location screen
                if (ctx.screen === 'Location') {
                    this.renderMap();
                    //if (this.viewModel.has_location.get()) {
                    //    this.viewModel.runRoutingServices();
                    //}
                }
                if (ctx.screen === 'Financial Summary') {
                    this.viewModel.renderCharts();
                }
                this.viewModel.show_summary_btn.set(this.viewModel.active_screen.get() < this.viewModel.screens_collection.length() - 1);
            }
        };
        OE_AquacultureFinancialView.prototype.renderMap = function () {
            var thisScope = this;
            if (typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null) {
                this.viewModel.esriMap = new esri.Map("location-map", {
                    //center: [44.17432483, -120.5859375],
                    //OSU Ag Fields: -123.29560542046448, 44.56679003060179
                    //Statewide: new esri.geometry.Point(-120.58, 44.17)
                    center: new esri.geometry.Point(-123.29560542046448, 44.56679003060179),
                    zoom: 6,
                    basemap: "streets",
                    minZoom: 6,
                    slider: true,
                    showAttribution: true,
                    //autoResize: true,
                    logo: false
                });
                //SEARCH
                try {
                    var sources = [{
                            locator: this.viewModel.esriLocator,
                            locationType: "street",
                            singleLineFieldName: "SingleLine",
                            name: "Oregon GC_Composite",
                            placeholder: "Search",
                            highlightSymbol: this.viewModel.marker,
                            countryCode: "US",
                            suffix: ", OR",
                            maxSuggestions: 6,
                            enableSuggestions: true,
                            minCharacters: 1
                        }];
                    this.viewModel.esriSearch = new esri.dijit.Search({
                        map: this.viewModel.esriMap,
                        sources: sources,
                        showInfoWindowOnSelect: false
                    }, "search");
                    this.viewModel.esriSearch.startup();
                    this.viewModel.esriSearch.on('search-results', function (e) {
                        thisScope.viewModel.esriMap.graphics.clear();
                    });
                    this.viewModel.esriSearch.on('select-result', function (e) {
                        thisScope.viewModel.selected_location.set({
                            "point": new esri.geometry.Point(e.result.feature.geometry),
                            "name": e.result.name
                        });
                    });
                }
                catch (ex) {
                    //console.log('cannot load search');
                }
                try {
                    //HOME BUTTON
                    this.viewModel.esriHomeBtn = new esri.dijit.HomeButton({
                        map: this.viewModel.esriMap
                    }, "home-button");
                    this.viewModel.esriHomeBtn.startup();
                }
                catch (ex) {
                    //console.log('cannot load home button');
                }
                try {
                    //BASEMAP TOGGLE
                    var basemaps = {
                        "streets": {
                            "title": "Streets",
                            "thumbnailUrl": "https://js.arcgis.com/3.15/esri/images/basemap/streets.jpg"
                        },
                        "hybrid": {
                            "title": "Satellite",
                            "thumbnailUrl": "https://js.arcgis.com/3.15/esri/images/basemap/satellite.jpg"
                        }
                    };
                    this.viewModel.esriBasemapToggle = new esri.dijit.BasemapToggle({
                        theme: "basemapToggle",
                        map: this.viewModel.esriMap,
                        basemaps: basemaps,
                        visible: true,
                        basemap: "hybrid"
                    }, "basemap-toggle");
                    this.viewModel.esriBasemapToggle.startup();
                }
                catch (ex) {
                    //console.log('cannot load basemap toggle');
                }
                //Event handlers
                this.viewModel.esriMap.on("load", function (event) {
                    try {
                        var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/42");
                        event.map.addLayer(featureLayer);
                        //thisScope.setInfoScreenHeight();
                        //window.setTimeout(thisScope.animateInfoScreen, 1000);
                        thisScope.resizeMap();
                        thisScope.resizeWindow();
                        if (thisScope.viewModel.has_location.get()) {
                            window.setTimeout(function () {
                                var inputPnt = thisScope.viewModel.selected_location.get().point;
                                thisScope.viewModel.esriLocator.locationToAddress(inputPnt, 100);
                                thisScope.viewModel.esriMap.centerAndZoom(inputPnt, 13);
                            }, 500);
                        }
                    }
                    catch (ex) {
                        console.log('error loading map', ex);
                    }
                });
                this.viewModel.esriMap.on("click", function (evt) {
                    //console.log('map click!', evt);
                    thisScope.viewModel.esriMap.graphics.clear();
                    thisScope.viewModel.esriLocator.locationToAddress(evt.mapPoint, 100);
                    thisScope.viewModel.esriMap.centerAndZoom(evt.mapPoint, 13);
                });
            }
            else {
                //this.viewModel.esriMap.resize();
            }
        };
        OE_AquacultureFinancialView.prototype.deactivated = function () {
            try {
                this.removeSelectedLocation();
                //this.viewModel.workflowContext.setValue("outputVal", "finished!");
                this.viewModel.workflowContext.completeActivity();
                this.viewModel._resetDefaults();
            }
            catch (ex) {
                //console.log('deactivated warning');
            }
        };
        OE_AquacultureFinancialView.prototype.resetValues = function (evt, el, ctx) {
            var _this = this;
            //let activeScreen = this.viewModel.active_screen.get();
            this.viewModel.show_loading.set(true);
            var screen = this.viewModel.screens_collection.get().filter(function (s) { return s['screenOrder'] === (_this.viewModel.active_screen.get() + 1).toString(); })[0];
            this.viewModel._resetValues();
            this.openTab(null, null, screen);
            this.viewModel.show_loading.set(false);
        };
        OE_AquacultureFinancialView.prototype.print = function (event, element, context) {
            event.preventDefault();
            var html = '<!DOCTYPE html><html><head><title>FinancialPlanningPrint</title></head><body onload="window.print();window.close();">';
            html += '<style type="text/css">' +
                'body { font-family: "Segoe UI","Helvetica Neue","Droid Sans",Arial,sans-serif; font-size:.8em;}.inactiveScreen {display:none;}.oe_slider{display:none} fieldset{position:relative;border:solid 1px grey;border-radius:4px;margin:20px 20px 0 20px}legend{padding:15px}#location-map{position:relative;width:100%;height:100%}#map-section{position:relative}#location-wrapper{position:relative}#add-location{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.9);text-align:center;vertical-align:middle;z-index:19000}#add-location-msg{position:relative;max-width:350px;top:50%;transform:translateY(-50%);margin:auto}.slider-wrapper{position:relative;text-align:center;padding:10px;max-width:245px;margin:10px 0}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all{width:5.5em;height:2em;top:43%;margin-top:-.9em;text-align:center;line-height:1.6em;text-indent:0;color:#5e737f;border-radius:10px;padding:2px;background-color:#a5c9df}.ui-slider-handle.oe-slider-handle.ui-state-default.ui-corner-all:hover{cursor:pointer}.filter-header-wrapper{padding:5px;background-color:#f0f0f0;border-radius:4px 4px 0 0;position:relative}.filter-header-wrapper img{padding:0 10px}.filter-header-wrapper img:first-child{padding-left:2px}.filter-header-wrapper:hover{cursor:pointer}.filter-header-wrapper div{display:inline-block}.show-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-down-small-24.png);background-repeat:no-repeat}.hide-filters{width:24px;height:16px;background-image:url(Resources/Images/Icons/arrow-up-small-24.png);background-repeat:no-repeat}#filter-options-wrapper{padding:10px 0 5px 5px}#filter-type-header{padding:2px;border:solid 1px #e6e0e0;border-top:none}#filter-type-header div{display:inline-block;width:48%;text-align:center;font-size:.9em}#filter-type-header div:first-child{border-right:solid 1px #e6e0e0}#filters-wrapper div{display:inline-block;width:49%}#filters-wrapper select{font-size:.9em}#search-wrapper,.calcite{position:relative}#search{display:block;position:absolute;z-index:2;top:20px;left:74px}#home-button{position:absolute;top:95px;left:20px;z-index:50}#basemap-toggle{position:absolute;bottom:20px;right:20px;z-index:50}#basemap-toggle:hover{cursor:pointer}.basemapBG{height:50px;width:50px;border-radius:10px 10px 0 0}.basemapTitle{width:50px;font-size:.9em;text-align:center;background-color:#e6e0e0;padding:2px 0}#location-instruction{padding:10px 5px;background:#f5f5f5}.arcgisSearch .searchBtn{position:relative;z-index:2}#location-status-selected{background-color:#eef7d3;padding:10px}#selected-location-remove img{margin:0 0 -4px 5px}#selected-location-remove img:hover{cursor:pointer}#selected-location-name{text-decoration:underline}#selected-location-name:hover{cursor:pointer}.OE_Chart{min-width:300px}.screenSectionnone{display:none}h2.screen-header{margin-left:15px}.activeScreen,.activeTab{display:block}.inactiveScreen,.inactiveTab{display:none}.div-row{width:90%;margin:auto}.div-row.overview{width:100%;margin-left:-10px}.div-row.overview div.div-row-cell{width:49%;padding:0 30px 0 0}.div-row.overview .desc{height:550px;overflow:auto}.overview .input-header{font-weight:400;font-size:1.2em}.system-overview{padding:10px;border:1px solid #a7a7a7;width:95%}.img-wrapper-center{width:100%;text-align:center;margin-bottom:10px}.img-wrapper-center img{max-width:95%;max-height:200px;border:solid 1px #a7a7a7;padding:10px;border-radius:10px}.div-row.no-pad{width:100%}.div-row.no-pad div.div-row-cell:first-child{width:72%}.div-row.no-pad div.div-row-cell:last-child{width:25%}.div-row div.div-row-cell{display:inline-block;vertical-align:top;width:47%;margin:auto}.div-row div.div-row-cell fieldset{height:100%;width:100%;background:#f0f0f0;margin:auto}.div-row div.div-row-cell legend{margin:20px}.div-row-cell .desc{margin:10px 20px 10px 30px;width:100%;font-size:.9em;background:#f0f0f0;border:solid 1px #ccc;border-radius:4px;padding:20px}.notes{color:#302f2f;text-indent:each-line 10px}.table-notes{width:90%;margin:auto;font-size:.9em;color:#302f2f;text-align:right;background-color:#fff}.input-header{font-weight:700}.div-table{display:table;width:90%;background-color:beige;margin:auto}.div-table.amortization,.div-table.parameters{background-color:#f0f0f0}.div-table-row{display:table-row}.div-table-row.heading{font-weight:700}.div-table-cell{display:table-cell;padding:4px;border:solid 1px #e6e0e0}.div-table-cell:nth-child(1){width:75%}.div-table-cell:nth-child(2){width:25%}.div-table-cell:nth-child(3){width:12%}.div-table.amortization .div-table-cell{width:14.2%;text-align:center}.div-table-cell.InputCalcTotal{font-size:1.1em;font-weight:700;border-top:solid 2px #000;border-bottom:solid 2px #000}.div-table-cell.units{text-align:center}.div-table-cell.values{padding-left:10px}#system-select-wrapper{width:300px;margin:auto}.container{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container input{position:absolute;opacity:0;cursor:pointer}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;background-color:#eee;border-radius:50%}.container:hover input~.checkmark{background-color:#ccc}.container input:checked~.checkmark{background-color:#a5c9df}.checkmark:after{content:"";position:absolute;display:none}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{top:9px;left:9px;width:8px;height:8px;border-radius:50%;background:#fff}.toggle-detail-inputs div{font-size:.9em;padding:15px;color:#1a72c4}.toggle-detail-inputs div:hover{text-decoration:underline;cursor:pointer}.rdgroup{padding-left:15px}.section-desc{width:90%;margin:auto}.section-desc div{width:90%}</style>';
            html += document.getElementById('printarea').outerHTML;
            html += '</body></html>';
            var printWindow = window.open("");
            printWindow.document.write(html);
            var browser = this.detectBrowser();
            if (browser === 'IE') {
                printWindow.location.reload();
            }
            else {
                printWindow.print();
                printWindow.close();
            }
        };
        OE_AquacultureFinancialView.prototype.detectBrowser = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                return 'Opera';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                return 'Chrome';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                return 'Safari';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                return 'Firefox';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document['documentMode'] == true)) {
                return 'IE';
            }
            else {
                return 'unknown';
            }
        };
        OE_AquacultureFinancialView.prototype.fitScreenHeight = function () {
            //adjust scroll window based on modal-container height
            var modal_height = $('.modal-container').height() - $('.modal-container-inner').height();
            if (modal_height > 0) {
                $('.panel-scroll-container').css("maxHeight", (modal_height + "px"));
            }
            else {
                $("#fin-pln-footer").css("display", "none");
            }
            //console.log('panel height: ', modal_height);
        };
        OE_AquacultureFinancialView.prototype.getPDFReport = function () {
            var _this = this;
            this.viewModel.show_report_name_input.set(false);
            this.viewModel.show_loading_pdf.set(true);
            var currentScreen = this.viewModel.screens_collection.get()[this.viewModel.active_screen.get()];
            //clear global variable to store the chart images
            window['oe_report_charts'] = [];
            this.gotoTab(null, null, this.viewModel.screens_collection.get().filter(function (s) { return s['screen'] === "Financial Summary"; })[0]);
            this.showHideLabelsOnCharts(true);
            //render map if not already rendered for the 
            if (typeof this.viewModel.esriMap == "undefined" || this.viewModel.esriMap == null) {
                this.gotoTab(null, null, this.viewModel.screens_collection.get().filter(function (s) { return s['screen'] === "Location"; })[0]);
            }
            var thisScope = this;
            //To pass json to workflow, you have to double quote each attribute...
            var report_data = {
                "system": this.viewModel.systems_tbl.get()
                    .filter(function (sys) { return sys["selected"].get(); })
                    .map(function (sys) {
                    return {
                        "system": sys.systemTitle,
                        "system_img": sys.img_credit,
                        "system_img_credit": sys.img_credit,
                        "system_overview": sys.overview.replace(/\<\/p>/g, '').replace(/\<p>/g, '')
                    };
                })[0],
                "species": this.viewModel.species_tbl.get().filter(function (species) { return species.selected; })[0],
                "prodMeth": this.viewModel.prod_meth_tbl.get().filter(function (prod) { return prod.selected; })[0],
                "screen_data": [],
                "financial_summary": [],
                "charts": []
            };
            window.setTimeout(function () {
                thisScope.viewModel.screens_collection.get()
                    .filter(function (screen, idx, arr) {
                    return thisScope.viewModel._screenSystemFilter(screen, true);
                })
                    .forEach(function (scr) {
                    scr.sections.get().forEach(function (sct) {
                        sct.fields.get().filter(function (f) {
                            return thisScope.viewModel._fieldsFilter(null, f);
                        }).forEach(function (f) {
                            if (f.uiType === "chart") {
                                thisScope.getChartAndTableAsBase64(f);
                            }
                            else if (f.uiType !== "inputLocation") {
                                var sd = {
                                    screen: scr.screenTitle.toUpperCase(),
                                    section: sct.displayName,
                                    sectionType: sct.sectionType,
                                    field: f.fieldLabel,
                                    fieldVal: f.formattedValue.get() === '<enter value>' ? '' : f.formattedValue.get()
                                };
                                if (['FINANCIAL SUMMARY', 'SUMMARY'].indexOf(sd.screen) === -1 && ['Amortization Table'].indexOf(sct.displayName) === -1) {
                                    //hide financial summary since the data is processed as charts and table images
                                    report_data.screen_data.push(sd);
                                }
                                if (sct.section === "sumOverview") {
                                    report_data.financial_summary.push(sd);
                                }
                            }
                        });
                    });
                });
                window.setTimeout(function () {
                    report_data.charts = window['oe_report_charts'];
                    var sel_loc = _this.viewModel.selected_location.get();
                    var sel_loc_point = sel_loc.point.spatialReference.wkid !== 4326
                        ? new esri.geometry.Point(esri.geometry.webMercatorToGeographic(sel_loc.point))
                        : sel_loc.point;
                    var workflowArgs = {};
                    workflowArgs.workflowId = "Get_Financial_Planning_Report";
                    workflowArgs.report_data = JSON.stringify(report_data);
                    workflowArgs.report_name = thisScope.viewModel.report_name.get(),
                        workflowArgs.aoi_geometry = sel_loc_point;
                    workflowArgs.aoi_name = sel_loc.name;
                    workflowArgs.aoi_latlong = sel_loc_point.y.toFixed(2) + ", " + sel_loc_point.x.toFixed(2);
                    workflowArgs.map_extent = typeof _this.viewModel.esriMap == "undefined" || _this.viewModel.esriMap == null ? new esri.geometry.Extent({
                        "xmin": -122.68, "ymin": 45.53, "xmax": -122.45, "ymax": 45.6,
                        "spatialReference": { "wkid": 4326 }
                    }) : _this.viewModel.esriMap.extent;
                    thisScope.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
                    thisScope.gotoTab(null, null, currentScreen);
                    thisScope.viewModel.show_loading_pdf.set(false);
                    thisScope.showHideLabelsOnCharts(true);
                }, 100);
            }, 750);
        };
        OE_AquacultureFinancialView.prototype.getChartAndTableAsBase64 = function (f) {
            var chartTable = document.querySelectorAll("[data-table='" + f.chartID + "']");
            var clone = chartTable[0].cloneNode(true);
            $("body").append(clone);
            $(clone).css("width", "450px");
            html2canvas(clone, {
                onrendered: function (canvas) {
                    var chart_info = {
                        chartName: f.chartConfig.chartName,
                        //chartConfig: f.chartConfig,
                        chartDataURI: '',
                        chartTableURI: ''
                    };
                    var base64FilterImg = canvas.toDataURL('image/png'); //.replace(/^data:image\/(png|jpg);base64,/, "");
                    chart_info.chartTableURI = base64FilterImg;
                    window['oe_report_charts'].push(chart_info);
                    $(clone).remove();
                    //add chart data img
                    var chart = $("#" + f.chartID).getKendoChart();
                    chart.exportImage().done(function (data) {
                        window['oe_report_charts'][window['oe_report_charts'].length - 1]['chartDataURI'] = data; //.replace(/^data:image\/(png|jpg);base64,/, "");
                        //console.log(data);
                    });
                }
            });
        };
        OE_AquacultureFinancialView.prototype.showPDFReportName = function () {
            if (this.viewModel.show_report_name_input.get()) {
                this.viewModel.show_report_name_input.set(false);
            }
            else {
                this.viewModel.report_number++;
                this.viewModel.report_name.set('Scenario ' + this.viewModel.report_number.toString() + ': ' + this.viewModel.selected_system_text.get());
                this.viewModel.show_report_name_input.set(true);
            }
        };
        OE_AquacultureFinancialView.prototype.hideReportNameInput = function () {
            this.viewModel.show_report_name_input.set(false);
            this.viewModel.report_number--;
        };
        OE_AquacultureFinancialView.prototype.showHideLabelsOnCharts = function (show) {
            var _this = this;
            this.viewModel.screens_collection.get().forEach(function (scr) {
                scr.sections.get().forEach(function (sct) {
                    sct.fields.get().filter(function (f) {
                        return _this.viewModel._fieldsFilter(null, f);
                    }).forEach(function (f) {
                        if (f.uiType === "chart") {
                            var chart = $("#" + f.chartID).getKendoChart();
                            //add labels
                            chart.setOptions({
                                seriesDefaults: {
                                    labels: {
                                        visible: show
                                    }
                                },
                                legend: {
                                    visible: show ? false : true
                                }
                            });
                            chart.refresh();
                        }
                    });
                });
            });
        };
        OE_AquacultureFinancialView.prototype.resizeMap = function () {
            //Chrome fix for auto-expanding map issue
            $("#location-map").css("width", $(".calcite").width() + "px");
        };
        OE_AquacultureFinancialView.prototype.resizeWindow = function () {
            if (typeof (Event) === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            }
            else {
                // for IE and other old browsers
                // causes deprecation warning on modern browsers
                var evt = window.document.createEvent('UIEvents');
                evt['initUIEvent']('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
            this.fitScreenHeight();
        };
        OE_AquacultureFinancialView.prototype.toggleInfoScreen = function (event, element, context) {
            context.show_info_screen.set(!context.show_info_screen.get());
            if (context.show_info_screen.get()) {
                //set the height of the info screen
                this.setInfoScreenHeight();
            }
            context.info_screen_arrow_src.set(context.info_screen_arrow_src.get() === "Resources/Images/Icons/arrow-right-small-24.png" ? "Resources/Images/Icons/arrow-down-small-24.png" : "Resources/Images/Icons/arrow-right-small-24.png");
            this.animateInfoScreen();
        };
        OE_AquacultureFinancialView.prototype.updateModel = function (event, element, context) {
            var updatedValue = element
                ? element.value !== context.value.get()
                    ? element.value
                    : context.value.get()
                : context.value.get();
            context.value.set(updatedValue);
            if (updatedValue !== this.viewModel.formatValue(updatedValue, context.decimalDisp) && updatedValue !== '<enter value>') {
                var formattedVal = this.viewModel.formatValue(updatedValue, context.decimalDisp);
                context.value.set(formattedVal);
                if (element) {
                    element.value = formattedVal;
                }
            }
            this.viewModel.updateViewModel(context);
        };
        OE_AquacultureFinancialView.prototype.clearVal = function (evt, el, context) {
            el.value = '';
            //context.value.set();
        };
        OE_AquacultureFinancialView.prototype.checkReset = function (evt, el, context) {
            if (evt.key === 'Esc') {
                context.value.set(context.defaultVal);
                el.value = '';
                this.updateModel(null, el, context);
            }
        };
        OE_AquacultureFinancialView.prototype.gotoTab = function (evt, el, cntx) {
            var screen = this.viewModel.screens_collection.get().filter(function (s) { return s['screen'] === cntx.screen; })[0];
            //this.viewModel.show_all_tabs.set(true);
            this.openTab(null, null, screen);
        };
        OE_AquacultureFinancialView.prototype.gotoProductionTab = function (evt, el, cntx) {
            var screen = this.viewModel.screens_collection.get().filter(function (s) { return s['screen'] === 'Production'; })[0];
            this.openTab(null, null, screen);
        };
        OE_AquacultureFinancialView.prototype.gotoNextScreen = function (evt, el, cntx) {
            var curIndx = this.viewModel.active_screen.get();
            if (curIndx === 0) {
                //update title
                //this.app.viewManager.getViewById("OE_AquacultureFinancialView").title.set("Aquaculture Financial Planning for " + this.viewModel.selected_system.get().system);
                this.viewModel.refreshScreenFilters();
            }
            this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(curIndx + 1));
            //if (this.viewModel.active_screen.get() === 2) {
            //    this.createLineChart();
            //    //get routing on second page if selected place
            //    if (this.viewModel.has_location.get()) {
            //        this.runRoutingServices();
            //    }
            //}
        };
        OE_AquacultureFinancialView.prototype.gotoPrevScreen = function () {
            var curIndx = this.viewModel.active_screen.get();
            if (curIndx === 0) {
                this.viewModel.show_back_btn.set(false);
            }
            this.viewModel.active_screen.set(curIndx - 1);
            this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(curIndx - 1));
        };
        OE_AquacultureFinancialView.prototype.gotoSummary = function () {
            //get summary screen and pass to openTab function
            var summaryScreen = this.viewModel.screens_collection.getItems().filter(function (s) { return s['screen'] === "Summary"; })[0];
            this.openTab(null, null, summaryScreen);
        };
        OE_AquacultureFinancialView.prototype.zoomToSelectedLocation = function (evt, elem, ctx) {
            this.viewModel.esriMap.centerAndZoom(ctx.point, 13);
        };
        OE_AquacultureFinancialView.prototype.animateInfoScreen = function () {
            $("#info-screen-content").animate({
                opacity: "toggle",
                height: ["toggle", "swing"],
            }, 1000, function () {
                // Animation complete.
            });
        };
        OE_AquacultureFinancialView.prototype.setLocation = function () {
            this.viewModel.screens_collection.get().forEach(function (s) {
                s['sections'].get().forEach(function (sct) {
                    if (sct.sectionType === 'Map') {
                        sct.show_add_location.set(false);
                    }
                });
            });
        };
        OE_AquacultureFinancialView.prototype.updateDistance = function (evt, elem, ctx) {
            console.log('updating distance', ctx);
            this.viewModel.getSetValue(ctx.formula, elem.value);
        };
        OE_AquacultureFinancialView.prototype.runSiteReport = function (evt, elem, ctx) {
            this.viewModel.getSiteReport();
        };
        OE_AquacultureFinancialView.prototype.downloadSiteReport = function (evt, elem, ctx) {
            window.open(ctx.reportUrl, "_blank");
        };
        OE_AquacultureFinancialView.prototype.removeSelectedLocation = function () {
            this.viewModel.selected_location.set(null);
            this.setLocation();
            try {
                this.viewModel.esriSearch.clear();
                this.viewModel.esriMap.graphics.clear();
            }
            catch (ex) {
                //console.log('clear search exit');
            }
        };
        OE_AquacultureFinancialView.prototype.setSelectedSystem = function (_event, _element, context) {
            this.viewModel.setSelectedSystem(context);
            //this._setSliders();
            return true;
        };
        OE_AquacultureFinancialView.prototype.setInfoScreenHeight = function () {
            //modal height - header - toggle
            var modalContainerHeight = $('.modal-container').height();
            var modalHeader = $('.panel-header').height();
            var toggleBar = $('#info-screen-toggle-bar').height();
            var infoScreenContentHeight = modalContainerHeight - (modalHeader + toggleBar);
            $("#info-screen-content").height(infoScreenContentHeight);
            //$("#info-screen-content").height(
            //    $("#aqua-financial-pln-wrapper").height()
            //    - ($("#info-screen-toggle-bar").height()
            //        + (parseInt($("#info-screen-content").css("padding-top").replace("px", "")) * 2))
            //);
        };
        //gotoNextTab(evt, el, ctx) {
        //    console.log('goto next', ctx);
        //    this.viewModel.selected_system.set(ctx.selected_system.get());
        //    //update title
        //    this.app.viewManager.getViewById("OE_AquacultureFinancialView").title.set("Aquaculture Financial Planning for " + ctx.selected_system.get().system);
        //    this.viewModel.refreshScreenFilters();
        //    //this.viewModel.screens_collection_filter.refresh();
        //    this.openTab(null, null, this.viewModel.screens_collection_filter.getAt(1));
        //}
        OE_AquacultureFinancialView.prototype.toggleParameters = function (evt, el, ctx) {
            ctx.visible.set(!ctx.visible.get());
        };
        OE_AquacultureFinancialView.prototype.toggleDesc = function (evt, el, ctx) {
            ctx.showDesc.set(!ctx.showDesc.get());
        };
        OE_AquacultureFinancialView.prototype.showAllTabs = function () {
            //this.viewModel.show_all_tabs.set(true);
            this.viewModel.refreshScreenFilters();
        };
        OE_AquacultureFinancialView.prototype.hideDetailTabs = function () {
            //this.viewModel.show_all_tabs.set(false);
            this.viewModel.refreshScreenFilters();
        };
        OE_AquacultureFinancialView.prototype.toggleSystemFilters = function () {
            if (this.viewModel.screens_collection.get().length > 0) {
                this.viewModel.screens_collection.getItems().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        if (sct.sectionType === 'Select System') {
                            sct.show_system_filters.set(!sct.show_system_filters.get());
                            sct.show_filter_class.set(sct.show_filter_class.get() === "hide-filters" ? "show-filters" : "hide-filters");
                        }
                    });
                });
            }
            //this.viewModel.show_system_filters.set(!this.viewModel.show_system_filters.get());
            //this.viewModel.show_filter_class.set(this.viewModel.show_filter_class.get() === "hide-filters" ? "show-filters" : "hide-filters");
        };
        OE_AquacultureFinancialView.prototype.resetFilters = function () {
            this.viewModel.resetSystemFilters();
        };
        OE_AquacultureFinancialView.prototype.updateSlider = function (evt, elem, ctx) {
            this.viewModel.updateSlider(ctx);
        };
        OE_AquacultureFinancialView.prototype.validateTextInput = function (evt, elem, ctx) {
            this.viewModel.validateTextInput(evt, elem, ctx);
        };
        OE_AquacultureFinancialView.prototype.checkClearTextInput = function (evt, elem, ctx) {
            this.viewModel.checkClearTextInput(evt, elem, ctx);
            //return false;
        };
        OE_AquacultureFinancialView.prototype.setSelectedQuickstartResource = function (evt, el, cntx) {
            this.viewModel.setSelectedQuickstartResource(cntx.fieldName);
            return true;
        };
        OE_AquacultureFinancialView.prototype.closeView = function () {
            this.deactivated();
            this.viewModel.app.commandRegistry.command("DeactivateView").execute("OE_AquacultureFinancialView");
        };
        OE_AquacultureFinancialView.prototype.gotoMapViewer = function () {
            window.open('https://tools.oregonexplorer.info/OE_HtmlViewer/index.html?viewer=aquaculture');
        };
        OE_AquacultureFinancialView.prototype.setUIInputs = function (reset) {
            var _this = this;
            var thisScope = this;
            this.viewModel.screens_collection.get().forEach(function (s) {
                s['sections'].get().forEach(function (sct) {
                    sct.fields.get().forEach(function (f) {
                        if ((f.show.indexOf('All') !== -1 || f.show.indexOf(_this.viewModel.selected_system_text.get()) !== -1)) {
                            switch (f.uiType) {
                                case 'slider':
                                    thisScope.viewModel.setKendoSlider(f);
                                    if (reset) {
                                        f.value.set(null);
                                    }
                                    break;
                            }
                        }
                    });
                });
            });
        };
        return OE_AquacultureFinancialView;
    }(ViewBase_1.ViewBase));
    exports.OE_AquacultureFinancialView = OE_AquacultureFinancialView;
});

},
"geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialViewModel": function () {
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework-ui/FilterableCollection", "geocortex/framework-ui/OrderedCollection", "geocortex/infrastructure/NumberFormat"], function (require, exports, ViewModelBase_1, observables_1, FilterableCollection_1, OrderedCollection_1, NumberFormat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { OE_Charts } from "../OE_Aquaculture/OE_Charts";
    var OE_AquacultureFinancialViewModel = /** @class */ (function (_super) {
        __extends(OE_AquacultureFinancialViewModel, _super);
        function OE_AquacultureFinancialViewModel(app, lib) {
            var _this = _super.call(this, app, lib) || this;
            //History cache
            _this.scenario_cache = new observables_1.ObservableCollection([]);
            //SPECIES
            _this.species_tbl = new observables_1.ObservableCollection([]);
            _this.selected_species = new observables_1.Observable({});
            _this.selected_species_label = new observables_1.Observable('');
            _this.selected_species_filter = new observables_1.Observable('<--');
            //PRODUCTION METHODS
            _this.prod_meth_tbl = new observables_1.ObservableCollection([]);
            _this.selected_prod_meth_filter = new observables_1.Observable('<--');
            _this.selected_prod_meth = new observables_1.Observable({});
            _this.selected_prod_meth_label = new observables_1.Observable('');
            //SYSTEMS (Species and Production Method)
            _this.systems_tbl = new observables_1.ObservableCollection([]);
            _this.selected_system = new observables_1.Observable({});
            //selected_system_binding_token: string = '';
            _this.selected_system_text = new observables_1.Observable('');
            _this.show_no_systems_in_filtered_view = new observables_1.Observable(false);
            //SCREEN CONFIG
            _this.screens_collection = new observables_1.ObservableCollection([]);
            //OTHER INPUT PARAMS
            _this.show_other_input_params_1 = new observables_1.Observable(false);
            //SELECTED LOCATION
            _this.has_location = new observables_1.Observable(false);
            _this.selected_location = new observables_1.Observable();
            _this.site_report_loading = new observables_1.Observable(false);
            _this.site_report_url = new observables_1.Observable('');
            _this.show_site_report_url = new observables_1.Observable(false);
            //Markets and Feed Suppliers
            _this.closest_markets = new observables_1.ObservableCollection([]);
            _this.feed_suppliers = new observables_1.ObservableCollection([]);
            _this.OregonGeolocator = new esri.tasks.Locator("https://navigator.state.or.us/arcgis/rest/services/Locators/gc_Composite/GeocodeServer");
            _this.esriLocator = new esri.tasks.Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
            _this.marker = new esri.symbol.PictureMarkerSymbol({
                "height": 28,
                "width": 28,
                "url": "./Resources/Images/Custom/search-pointer.png"
                //"url": "//js.arcgis.com/3.27/esri/dijit/Search/images/search-pointer.png"
            });
            //INFO SCREEN
            _this.info_screen_arrow_src = new observables_1.Observable("Resources/Images/Icons/arrow-right-small-24.png");
            _this.show_info_screen = new observables_1.Observable(false);
            //INPUT SCREENS
            _this.active_screen = new observables_1.Observable(0);
            //PAGER_NAV
            _this.show_next_btn = new observables_1.Observable(true);
            _this.show_back_btn = new observables_1.Observable(false);
            //ROUTES
            _this.sub_station_routes = new observables_1.ObservableCollection([]);
            //AMORTIZATION
            _this.amortization_tbl = new observables_1.ObservableCollection([]);
            //Summary Button
            _this.show_summary_btn = new observables_1.Observable(false);
            //UPDATE State
            _this.show_report_name_input = new observables_1.Observable(false);
            _this.report_number = 0;
            _this.report_name = new observables_1.Observable('scenario1');
            _this.show_loading_pdf = new observables_1.Observable(false);
            _this.show_loading = new observables_1.Observable(false);
            _this.show_all_for_report = new observables_1.Observable(false);
            //Validation Monitoring
            _this.show_warning = new observables_1.Observable(false);
            _this.invalid_array = [];
            _this.screens_collection_filter = new FilterableCollection_1.FilterableCollection(_this.screens_collection, _this._screensFilter.bind(_this, _this));
            _this.selected_location.bind(_this, function (selLoc) {
                if (selLoc) {
                    if (selLoc.name !== 'User click') {
                        _this.runRoutingServices();
                    }
                }
            });
            //this.selected_system_binding_token =
            _this.selected_system.bind(_this, function (sys) {
                if (sys) {
                    _this.selected_system_text.set(sys.system ? sys.system : sys);
                    var _species_1 = [];
                    _this.species_tbl.get().forEach(function (species) {
                        var isSelected = sys.species === species.species;
                        species.selected = isSelected; //.set(isSelected);
                        _species_1.push(species);
                    });
                    _this.species_tbl.set(_species_1);
                    _this.species_tbl_filter.refresh();
                    var _prod_1 = [];
                    _this.prod_meth_tbl.get().forEach(function (prod_meth) {
                        prod_meth.selected = sys.production_method === prod_meth.production_method;
                        _prod_1.push(prod_meth);
                    });
                    _this.prod_meth_tbl.set(_prod_1);
                    _this._refreshSystemsDisplay();
                    _this.show_warning.set(!sys.constraintsValid.get());
                    //this._resetMap();
                }
            });
            _this.species_tbl_filter = new FilterableCollection_1.FilterableCollection(_this.species_tbl, _this._selectedFilter.bind(_this, _this));
            _this.prod_meth_tbl_filter = new FilterableCollection_1.FilterableCollection(_this.prod_meth_tbl, _this._selectedFilter.bind(_this, _this));
            _this.selected_prod_meth_filter.bind(_this, function (selProdMeth) {
                _this._refreshSystemsDisplay();
            });
            _this.selected_species_filter.bind(_this, function (selSpecies) {
                _this._refreshSystemsDisplay();
            });
            _this.systems_tbl_filter = new FilterableCollection_1.FilterableCollection(_this.systems_tbl, _this._systemsFilters.bind(_this, _this));
            _this.show_all_for_report.bind(_this, function () {
                _this.screens_collection_filter.refresh();
            });
            _this.closest_markets.set([]);
            _this.feed_suppliers.set([]);
            _this.closest_markets.bind(_this, function (cm) {
                //set ddoptions for marketDistanc
                _this.screens_collection.get().forEach(function (sc) {
                    sc['sections'].get().forEach(function (sct) {
                        sct['field_categories'].get().forEach(function (fc) {
                            fc.fields.get().forEach(function (ff) {
                                if (ff.fieldCalVar === 'marketDistanceOpts') {
                                    ff.ddOptions.set(cm.sender.value);
                                    ff.selDDoption.set(cm.sender.value[1].value);
                                    _this.getSetValue(ff.formula, cm.sender.value[1].distance.toString());
                                    //this.routeDistance('market', cm);
                                }
                            });
                        });
                    });
                });
            });
            _this.feed_suppliers.bind(_this, function (cm) {
                //set ddoptions for feed suppliers
                _this.screens_collection.get().forEach(function (sc) {
                    sc['sections'].get().forEach(function (sct) {
                        sct['field_categories'].get().forEach(function (fc) {
                            fc.fields.get().forEach(function (ff) {
                                if (ff.fieldCalVar === 'feedDistanceOpts') {
                                    ff.ddOptions.set(cm.sender.value);
                                    ff.selDDoption.set(cm.sender.value[1].value);
                                    _this.getSetValue(ff.formula, cm.sender.value[1].distance.toString());
                                }
                            });
                        });
                    });
                });
            });
            return _this;
        }
        OE_AquacultureFinancialViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            var thisViewModel = this;
            if (site && site.isInitialized) {
                this._onSiteInitialized(site, thisViewModel, config);
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized(args, thisViewModel, config);
                });
            }
            this.app.registerActivityIdHandler("runFinancialPlnModule", function (wc) {
                _this.workflowContext = $.extend({}, wc);
                //this.resetSystemFilters();
                var hasLocation = wc.getValue("location") ? true : false;
                _this.has_location.set(hasLocation);
                _this.setSpecies(wc);
                _this.setProdMethods(wc);
                _this.setSystems(wc);
                _this.setScreens();
                _this.transportation_lut = wc.getValue('transportation').features ? wc.getValue('transportation').features.map(function (f) {
                    return {
                        pounds: f.attributes.pounds,
                        miles: f.attributes.miles,
                        shipCostLbMile: f.attributes.shipCostLbMile
                    };
                }) : [];
                if (_this.has_location.get()) {
                    _this.selected_location.set({ "point": wc.getValue("location"), "name": "User click" });
                }
                else {
                    var defaultLocation = new esri.geometry.Point(-123.29560542046448, 44.56679003060179);
                    _this.selected_location.set({ "point": defaultLocation, "name": "OSU Agriculuture Fields" });
                    _this.has_location.set(true);
                }
                var inputPnt = _this.selected_location.get().point;
                _this.esriLocator.locationToAddress(inputPnt, 100);
                //this.runRoutingServices();
                //rerun to set the resources system selection screen val...  TODO: figure out a better way
                //this.setSystems(wc);
                _this.app.commandRegistry.command("ActivateView").execute("OE_AquacultureFinancialView");
            });
            this.app.registerActivityIdHandler("onClosestCitiesGTE50k", function (wc) {
                //console.log('on closest cities!', wc);
                try {
                    var closestMarkets = wc.getValue("citiesTable").features.map((function (m) {
                        return {
                            "option": m.attributes.NAME + " (" + (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles" + ")",
                            "value": m.attributes.NAME + " (" + (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles" + ")",
                            "market": m.attributes.NAME,
                            "distance": (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles",
                            "rank": m.attributes.NEAR_RANK
                        };
                    }));
                    closestMarkets.push({
                        "option": 'Other distance',
                        "value": 'Other distance'
                    });
                    _this.closest_markets.set(closestMarkets);
                }
                catch (ex) {
                    var closestMarkets = [{
                            "option": 'Other distance',
                            "value": 'Other distance'
                        }];
                    _this.closest_markets.set(closestMarkets);
                }
            });
            this.app.registerActivityIdHandler("onSiteReportHandler", function (wc) {
                _this.site_report_loading.set(false);
                console.log('on site report!', wc);
                var siteReportURL = wc.getValue("reportURL");
                if (siteReportURL.toLowerCase().indexOf('error') === -1) {
                    _this.show_site_report_url.set(true);
                    _this.site_report_url.set(siteReportURL);
                    console.log('url', siteReportURL);
                }
            });
            this.app.registerActivityIdHandler("onClosestFeedSupplier", function (wc) {
                //console.log('on closest cities!', wc);
                var feedSuppliers = [];
                try {
                    feedSuppliers = wc.getValue("feedSuppliersTable").features.map((function (m) {
                        return {
                            "option": m.attributes.NAME + " (" + (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles" + ")",
                            "value": m.attributes.NAME + " (" + (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles" + ")",
                            "market": m.attributes.NAME,
                            "distance": (m.attributes.NEAR_DIST / 1609).toFixed(0) + " Miles",
                            "rank": m.attributes.NEAR_RANK
                        };
                    }));
                    feedSuppliers.splice(0, 0, {
                        "option": 'Other distance',
                        "value": 'Other distance'
                    });
                    _this.feed_suppliers.set(feedSuppliers);
                }
                catch (ex) {
                    feedSuppliers.push({
                        "option": 'Other distance',
                        "value": 'Other distance'
                    });
                    _this.feed_suppliers.set(feedSuppliers);
                }
            });
            this.app.registerActivityIdHandler("onMarketFeedRouted", function (wc) {
                var closestMarkets = JSON.parse(wc.getValue("marketDestinations"))
                    .map(function (m) {
                    return {
                        "distance": m.distance,
                        "name": m.name,
                        "state": m.state,
                        "value": m.name + ", " + m.state + " (" + m.distance.toFixed(0) + " Miles)",
                        "option": m.name + ", " + m.state + " (" + m.distance.toFixed(0) + " Miles)"
                    };
                })
                    .sort(function (a, b) { return a.distance - b.distance; })
                    .slice(0, 15);
                closestMarkets.splice(0, 0, {
                    "option": 'Other distance',
                    "value": 'Other distance'
                });
                _this.closest_markets.set(closestMarkets);
                var feedSuppliers = JSON.parse(wc.getValue("feedSupplierDestinations"))
                    .map(function (m) {
                    return {
                        "distance": m.distance,
                        "name": m.name,
                        "state": m.state,
                        "value": m.name + ", " + m.state + " (" + m.distance.toFixed(0) + " Miles)",
                        "option": m.name + ", " + m.state + " (" + m.distance.toFixed(0) + " Miles)"
                    };
                })
                    .sort(function (a, b) { return a.distance - b.distance; })
                    .slice(0, 15);
                feedSuppliers.splice(0, 0, {
                    "option": 'Other distance',
                    "value": 'Other distance'
                });
                _this.feed_suppliers.set(feedSuppliers);
            });
            this.esriLocator.on("location-to-address-complete", function (evt) {
                if (evt.address.address) {
                    var address = evt.address.address;
                    var location = esri.geometry.geographicToWebMercator(evt.address.location);
                    thisViewModel.selected_location.set({
                        "point": new esri.geometry.Point(evt.address.location),
                        "name": address.Match_addr !== "" ? address.Match_addr : address.Address
                    });
                    if (typeof thisViewModel.esriMap !== "undefined" && thisViewModel.esriMap !== null) {
                        var graphic = new esri.Graphic(location, thisViewModel.marker, address);
                        thisViewModel.esriMap.graphics.add(graphic);
                    }
                }
            });
        };
        OE_AquacultureFinancialViewModel.prototype.setSystems = function (wc) {
            var _this = this;
            //create the object array for summary data
            var defaultSystem;
            var systems = wc.getValue("systems").features ? wc.getValue("systems").features
                .filter(function (f) { return f.attributes.System !== 'All'; })
                .map(function (feat) {
                var constraintsValid = new observables_1.Observable(true);
                constraintsValid.bind(_this, function (isValid) {
                    //if selected system then set warning to match
                    _this.show_warning.set(!isValid);
                });
                var sys = {
                    "production_method": feat.attributes.ProductionMethod,
                    "species": feat.attributes.Species,
                    "system": feat.attributes.System,
                    "systemTitle": feat.attributes.SystemTitle,
                    "systemid": feat.attributes.System.replace(/\ /g, "").replace(/\:/g, "_"),
                    "selected": new observables_1.Observable(feat.attributes.Default === "True"),
                    "overview": feat.attributes.Overview,
                    "img_src": feat.attributes.ImagePath,
                    "img_credit": feat.attributes.ImageCredit,
                    "constraintsValid": constraintsValid
                };
                if (feat.attributes.Default === 'True') {
                    defaultSystem = sys;
                }
                return sys;
            }) : [];
            this.systems_tbl.set(systems);
            this.setSelectedSystem(defaultSystem);
        };
        OE_AquacultureFinancialViewModel.prototype.setSpecies = function (wc) {
            var _this = this;
            var defaultSelect = "<-- All -->";
            var speciesSelected = false; // new Observable<boolean>(false);
            var species = wc.getValue("species").features ?
                wc.getValue("species").features
                    .filter(function (f) { return f.attributes.Species !== 'All'; })
                    .map(function (feat, idx) {
                    return {
                        "species": feat.attributes.Species,
                        "show": true,
                        "production_methods": _this.systems_tbl.get()
                            .map(function (sxs) {
                            if (sxs.species === feat.attributes.Species) {
                                return sxs.ProductionMethods;
                            }
                        }).toString(),
                        "type": feat.attributes.Type,
                        "weight_min": feat.attributes.WeightMin,
                        "weight_max": feat.attributes.WeightMax,
                        "weight_default": feat.attributes.WeightDefault,
                        "weight_increment": feat.attributes.WeightIncrement,
                        "price_min": feat.attributes.PriceMin,
                        "price_max": feat.attributes.PriceMax,
                        "price_default": feat.attributes.PriceDefault,
                        "price_increment": feat.attributes.PriceIncrement,
                        "selected": speciesSelected,
                        "overview": feat.attributes.Overview,
                        "img_src": feat.attributes.ImagePath,
                        "img_credit": feat.attributes.ImageCredit
                    };
                })
                : [];
            species.splice(0, 0, { "species": defaultSelect, "type": "placeholder", "show": true, "production_methods": "*", "selected": speciesSelected });
            this.species_tbl.set(species);
            //this.selected_species_filter
            //if (this.screens_collection.get().length > 0) {
            //    this.screens_collection.getItems().forEach(s => {
            //        s['sections'].get().forEach(sct => {
            //            if (sct.sectionType === 'Select System') {
            //                sct.species_tbl.set(species);
            //                sct.selected_species.set(defaultSelect);
            //                sct.selected_species_filter.bind(this, (selSpecies) => {
            //                    this._refreshSystemsDisplay();
            //                });
            //            }
            //        });
            //    });
            //}
        };
        OE_AquacultureFinancialViewModel.prototype.setProdMethods = function (wc) {
            var _this = this;
            var defaultSelect = "<-- All -->";
            var prodSelected = false; // new Observable<boolean>(false);
            var prod_meths = wc.getValue("prodMethods").features
                ? wc.getValue("prodMethods").features
                    .filter(function (f) { return f.attributes.ProductionMethod !== 'All'; })
                    .map(function (feat) {
                    return {
                        "production_method": feat.attributes.ProductionMethod,
                        "species": _this.systems_tbl.get()
                            .map(function (sxs) {
                            if (sxs.production_method === feat.attributes.ProductionMethod) {
                                return sxs.species;
                            }
                        }).toString(),
                        "show": true,
                        "selected": prodSelected,
                        "overview": feat.attributes.Overview,
                        "img_src": feat.attributes.ImagePath,
                        "img_credit": feat.attributes.ImageCredit
                    };
                })
                : [];
            prod_meths.splice(0, 0, { "production_method": defaultSelect, "type": "placeholder", "species": "*", "show": true, "selected": prodSelected });
            this.prod_meth_tbl.set(prod_meths);
            //this.selected_prod_meth.set(defautlSelect);
            //if (this.screens_collection.get().length > 0) {
            //    this.screens_collection.getItems().forEach(s => {
            //        s['sections'].get().forEach(sct => {
            //            if (sct.sectionType === 'Select System') {
            //                sct.prod_meth_tbl.set(prod_meths);
            //                sct.selected_prod_meth.set(defaultSelect);
            //                sct.selected_prod_meth_filter.bind(this, (selProdMeth) => {
            //                    this._refreshSystemsDisplay();
            //                });
            //            }
            //        });
            //    });
            //}
        };
        OE_AquacultureFinancialViewModel.prototype.setScreens = function () {
            var _this = this;
            //////////
            // Screen Config
            // Create obj of screens and fields to display
            // Screens -> sections -> fields heirarchy
            //////////////
            var wc = this.workflowContext;
            var _screens = wc.getValue('screens').features
                ? wc.getValue('screens').features
                    .map(function (s) {
                    var sAttr = s.attributes;
                    var returnObj = {
                        screen: sAttr.Screen,
                        screenTitle: sAttr.ScreenTitle,
                        subTitle: sAttr.SubTitle,
                        selectedSystem: _this.selected_system_text,
                        show_select_system: parseInt(sAttr.Order) > 2,
                        screenOrder: sAttr.Order,
                        id: 'screen' + sAttr.Order,
                        tabId: sAttr.Order === '1' ? 'defaultOpen' : 'screen' + sAttr.Order,
                        sections: new observables_1.ObservableCollection(),
                        selected: new observables_1.Observable(false),
                        showAdvOnly: sAttr.AdvancedOnly,
                        showInReport: sAttr.IncludeInReport,
                        screenContentClass: new observables_1.Observable('tabcontent'),
                        screenTabClass: new observables_1.Observable('tablinks')
                    };
                    returnObj['summary_sections'] = new FilterableCollection_1.FilterableCollection(returnObj.sections, _this._summarySectionsFilter.bind(_this, _this));
                    return returnObj;
                })
                : [];
            var _screenSectionsInput = wc.getValue('screenSections').features ? wc.getValue('screenSections').features : [];
            var _chartConfigs = wc.getValue('charts').features ? wc.getValue('charts').features : [];
            var _growthRates = wc.getValue('growthRates').features ? wc.getValue('growthRates').features : [];
            //let _screenConfig = [];
            if (wc.getValue("screenConfig").features) {
                var scrCnfFeat_1 = wc.getValue("screenConfig").features;
                _screens.forEach(function (scr) {
                    var _screenSections = _screenSectionsInput.filter(function (s) { return s.attributes.Screen === scr.screen; })
                        .map(function (ss) {
                        var ssAttr = ss.attributes;
                        var returnSectionInfo = {
                            section: ssAttr.SectionID,
                            displayName: ssAttr.DisplayName,
                            screen: ssAttr.Screen,
                            sectionType: ssAttr.SectionType,
                            sectionDesc: ssAttr.SectionDesc,
                            displayClass: 'screenSection' + ssAttr.Display,
                            fields: new observables_1.ObservableCollection([]),
                            field_categories: new observables_1.ObservableCollection([]),
                            //field_ui_categories: new ObservableCollection<any>([]),
                            visible: new observables_1.Observable(true)
                        };
                        returnSectionInfo['fields_filter'] = new FilterableCollection_1.FilterableCollection(returnSectionInfo['fields'], _this._fieldsFilter.bind(_this, _this));
                        switch (ssAttr.SectionType) {
                            case 'Map':
                                returnSectionInfo['selected_location'] = new observables_1.Observable('');
                                returnSectionInfo['show_add_location'] = new observables_1.Observable(true);
                                returnSectionInfo['show_selected_location'] = new observables_1.Observable(false);
                                returnSectionInfo['site_report_loading'] = _this.site_report_loading;
                                returnSectionInfo['site_report_url'] = _this.site_report_url;
                                returnSectionInfo['show_site_report_url'] = _this.show_site_report_url;
                                break;
                            case 'Select System':
                                returnSectionInfo['show_filter_class'] = new observables_1.Observable('show-filters');
                                returnSectionInfo['show_system_filters'] = new observables_1.Observable(false);
                                returnSectionInfo['species_tbl'] = _this.species_tbl;
                                returnSectionInfo['species_tbl_filter'] = _this.species_tbl_filter;
                                returnSectionInfo['selected_species'] = _this.selected_species;
                                //returnSectionInfo['selected_species_label'] = this.selected_species_label;
                                returnSectionInfo['selected_species_filter'] = _this.selected_species_filter;
                                returnSectionInfo['prod_meth_tbl'] = _this.prod_meth_tbl;
                                returnSectionInfo['prod_meth_tbl_filter'] = _this.prod_meth_tbl_filter;
                                returnSectionInfo['selected_prod_meth'] = _this.selected_prod_meth;
                                //returnSectionInfo['selected_prod_meth_label'] = this.selected_prod_meth_label;
                                returnSectionInfo['selected_prod_meth_filter'] = _this.selected_prod_meth_filter;
                                returnSectionInfo['selected_system'] = _this.selected_system;
                                returnSectionInfo['systems_tbl'] = _this.systems_tbl;
                                returnSectionInfo['systems_tbl_filter'] = _this.systems_tbl_filter;
                                returnSectionInfo['show_no_systems_in_filtered_view'] = new observables_1.Observable(false);
                                returnSectionInfo['show_other_input_params_1'] = _this.show_other_input_params_1;
                                break;
                            case 'Summary Table':
                                var orderedCollection = new OrderedCollection_1.OrderedCollection();
                                orderedCollection.sync(_this.screens_collection);
                                orderedCollection.setSortFunction(function (left, right) {
                                    if (left.screen.toLowerCase() === 'Summary' || right.screen.toLowerCase() === 'Summary') {
                                        return -1;
                                    }
                                    else {
                                        if (left.screenOrder < right.screenOrder) {
                                            return -1;
                                        }
                                        if (left.screenOrder > right.screenOrder) {
                                            return 1;
                                        }
                                    }
                                    return 0;
                                });
                                returnSectionInfo['summary_table'] = orderedCollection;
                                break;
                            case 'AmortizationTable':
                                returnSectionInfo['amortization_table'] = _this.amortization_tbl;
                                break;
                            default:
                                break;
                        }
                        var _screenSectionFields = scrCnfFeat_1.filter(function (f) { return f.attributes.Section === ssAttr.SectionID; })
                            .map(function (sf) {
                            var thisScope = _this;
                            var att = sf.attributes;
                            var value = att.Default === '' && att.FieldCategory === 'ExistingResource' ? '________' : _this.formatValue(att.Default, att.Decimal);
                            var fieldValue;
                            fieldValue = new observables_1.Observable(value);
                            var fieldValidateMsg = new observables_1.Observable('Invalid input: Please enter a number between ' + _this.formatValue(att.Min, att.Decimal) + ' and ' + _this.formatValue(att.Max, att.Decimal) + '. <br>  ESC to reset to default value.');
                            var fieldValidateMsgClass = new observables_1.Observable(att.UiType === 'dropdownLocations' ? 'validate-msg-nested hide' : 'validate-msg hide');
                            var fieldDisplayValue = new observables_1.Observable(_this.formatDisplayValue(value, att.Unit, att.Decimal, true));
                            var species = att.Show.split(';').indexOf('All') === -1
                                ? _this.systems_tbl.get().filter(function (s) { return s['system'] === att.Show; })[0]['species']
                                : 'All';
                            var prodMeth = att.Show.split(';').indexOf('All') === -1
                                ? _this.systems_tbl.get().filter(function (s) { return s['system'] === att.Show; })[0]['procMeth']
                                : 'All';
                            var system = att.Show.split(';').indexOf('All') === -1
                                ? _this.systems_tbl.get().filter(function (s) { return s['system'] === att.Show; })[0]['system']
                                : 'All';
                            var systemNoSpace = system.replace(/\ /g, '');
                            var returnVal = {
                                fieldName: att.Field,
                                fieldID: att.FieldCalVar + systemNoSpace,
                                fieldCalVar: att.FieldCalVar,
                                fieldHandle: att.FieldCalVar + systemNoSpace + "Handle",
                                fieldValidateMsgID: att.FieldCalVar + systemNoSpace + "Validate",
                                fieldValidateMsgClass: fieldValidateMsgClass,
                                fieldValidateMsg: fieldValidateMsg,
                                fieldCat: att.FieldCategory,
                                fieldLabel: att.FieldLabel,
                                uiType: att.UiType,
                                unit: att.Unit,
                                defaultVal: att.Default,
                                increment: att.Increment,
                                value: fieldValue,
                                formattedValue: fieldDisplayValue,
                                previousValue: fieldValue,
                                min: att.Min,
                                max: att.Max,
                                decimalDisp: att.Decimal,
                                show: att.Show.split(';'),
                                species: species,
                                prodMeth: prodMeth,
                                system: system,
                                formula: att.Formula,
                                desc: att.Description,
                                notes: att.Notes,
                                chartID: att.ChartConfig,
                                showDesc: new observables_1.Observable(true),
                                visible: new observables_1.Observable(att.Field === 'Total Land'),
                                tableDisplayClass: new observables_1.Observable('div-table-cell ' + att.FieldClass),
                                class: new observables_1.Observable('div-table-cell values')
                            };
                            //add chart config if applicable
                            if (att.ChartConfig !== '') {
                                //lookup chart config values and render?
                                var _chartConfig = _chartConfigs.filter(function (f) { return f.attributes.ChartID === att.ChartConfig; })[0];
                                var chartSeries = JSON.parse(_chartConfig.attributes.Series);
                                var chartData = new observables_1.ObservableCollection(chartSeries.data.map(function (d) {
                                    return {
                                        value: new observables_1.Observable(d.value),
                                        percent: new observables_1.Observable(d.value),
                                        category: d.category,
                                        fieldCalVar: d.fieldCalVar
                                    };
                                }));
                                returnVal['chartConfig'] = {
                                    chartID: _chartConfig.attributes.ChartID,
                                    chartName: _chartConfig.attributes.ChartName,
                                    chartType: _chartConfig.attributes.Type,
                                    chartSeries: chartSeries,
                                    chartData: chartData
                                };
                            }
                            if (att.UiType === 'dropdownLocations') {
                                var selectedDDoption = new observables_1.Observable();
                                var ddOptions = new observables_1.ObservableCollection();
                                ddOptions.set([{
                                        option: 'Waiting for results from service',
                                        value: 'Waiting for results from service',
                                        updateField: returnVal.formula
                                    }]);
                                returnVal['ddOptions'] = ddOptions;
                                returnVal['selDDoption'] = selectedDDoption;
                                returnVal['showOtherInput'] = new observables_1.Observable(false);
                                selectedDDoption.set('Waiting for results from service');
                                selectedDDoption.bind(returnVal, function (val) {
                                    console.log('change the location distance', val);
                                    returnVal['showOtherInput'].set(val === 'Other distance');
                                    if (val !== 'Other distance') {
                                        _this.getSetValue(returnVal.formula, val.split('(')[1].split(' ')[0]);
                                    }
                                });
                            }
                            if (att.FieldCategory === 'LookupTable') {
                                var lutName = att.Formula.split('lut:')[1].split('>')[0];
                                var lutField = att.Formula.split('>')[1].split('{')[0];
                                var lutFieldLookup = att.Formula.indexOf('{') !== -1 ? att.Formula.split('{')[1].split('}')[0] : null;
                                var lut = void 0;
                                var selectedDDoption_1 = new observables_1.Observable();
                                var ddOptions = new observables_1.ObservableCollection();
                                switch (lutName) {
                                    case 'growthRate':
                                        lut = _growthRates;
                                        var harvestWeights = _growthRates.filter(function (gr) {
                                            return returnVal.species === gr.attributes.Species;
                                        }).map(function (gr) {
                                            if (gr.attributes['Default'] === 'True') {
                                                selectedDDoption_1.set(gr.attributes['Market Weight']);
                                            }
                                            return {
                                                option: gr.attributes['Market Weight'],
                                                value: gr.attributes['Months to Harvest'],
                                                updateField: 'monthsToHarvest',
                                            };
                                        });
                                        ddOptions.set(harvestWeights);
                                        returnVal['ddOptions'] = ddOptions;
                                        break;
                                    default:
                                        break;
                                }
                                returnVal['selDDoption'] = selectedDDoption_1;
                                selectedDDoption_1.bind(returnVal, function (val) {
                                    //update original value
                                    returnVal.value.set(val);
                                    _this.updateViewModel(returnVal);
                                    //update dependent field if any
                                    var hasDependentField = returnVal['ddOptions'].get().filter(function (dd) { return dd.updateField !== undefined; }).length > 0;
                                    if (hasDependentField) {
                                        //get update field based on new input val
                                        returnVal['ddOptions'].get().forEach(function (dd) {
                                            if (dd.option === val) {
                                                //update dependent field
                                                _this.screens_collection.get().forEach(function (scr) {
                                                    scr['sections'].get().forEach(function (sct) {
                                                        sct['fields'].get().forEach(function (f) {
                                                            if (f.fieldCalVar === dd.updateField) {
                                                                f.value.set(dd.value);
                                                                _this.updateViewModel(f);
                                                            }
                                                        });
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            fieldValue.bind(returnVal, function (val) {
                                returnVal.formattedValue.set(thisScope.formatDisplayValue(val, returnVal.unit, returnVal.decimalDisp, true));
                            });
                            return returnVal;
                        });
                        returnSectionInfo.fields.set(_screenSectionFields);
                        ////Quickstart only sort fields for resource vs goal
                        //if (returnSectionInfo.section === 'productionRequired') {
                        var categories = _screenSectionFields.map(function (f) { return f.fieldCat; })
                            .filter(function (v, idx, self) { return self.indexOf(v) === idx; });
                        var field_categories = [];
                        categories.forEach(function (c) {
                            var catFields = _screenSectionFields.filter(function (sf) { return sf.fieldCat === c; });
                            var cat = {
                                category: c,
                                fields: new observables_1.ObservableCollection(catFields)
                            };
                            cat['fields_filter'] = new FilterableCollection_1.FilterableCollection(cat['fields'], _this._fieldsFilter.bind(_this, _this));
                            field_categories.push(cat);
                        });
                        returnSectionInfo['field_categories'].set(field_categories);
                        //let ui_categories = _screenSectionFields.map(f => f.uiType)
                        //    .filter((v, idx, self) => self.indexOf(v) === idx);
                        //var field_ui_cat = [];
                        //ui_categories.forEach(c => {
                        //    let catFields = _screenSectionFields.filter(sf => sf.uiType === c);
                        //    let cat = {
                        //        category: c,
                        //        fields: new ObservableCollection<any>(catFields)
                        //    }
                        //    cat['fields_filter'] = new FilterableCollection<any>(cat['fields'], this._fieldsFilter.bind(this, this));
                        //    field_ui_cat.push(cat);
                        //});
                        //returnSectionInfo['field_ui_categories'].set(field_ui_cat);
                        //}
                        return returnSectionInfo;
                    });
                    scr.sections.set(_screenSections);
                });
                this.screens_collection.set(_screens);
            }
            this._setScreenSectionBindings();
            this.calculateAmortization();
            this.renderCharts();
            this.saveScenarioToCache();
        };
        OE_AquacultureFinancialViewModel.prototype.saveScenarioToCache = function () {
            //create scenario object
            var scenario = {
                scenario_name: "Scenario 1",
                screens: this.screens_collection.get(),
                selected: new observables_1.Observable(true)
            };
            this.scenario_cache.addItem(scenario);
        };
        OE_AquacultureFinancialViewModel.prototype.sortChartDataTable = function (left, right) {
            var leftPercent = parseFloat(left.percent.get().replace('%', ''));
            var rightPercent = parseFloat(right.percent.get().replace('%', ''));
            if (leftPercent < rightPercent) {
                return 1;
            }
            if (leftPercent > rightPercent) {
                return -1;
            }
            return 0;
        };
        OE_AquacultureFinancialViewModel.prototype.renderCharts = function () {
            var _this = this;
            this.screens_collection.get().forEach(function (scr) {
                scr['sections'].get().forEach(function (sct) {
                    sct['fields'].get().forEach(function (f) {
                        if (f.chartConfig && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            var totalChartValues_1 = 0;
                            //update with model values
                            f.chartConfig.chartSeries.data.forEach(function (d) {
                                var value = _this.getSetValue(d.fieldCalVar);
                                d.value = parseInt(value.replace(/\,/g, ''));
                                totalChartValues_1 += d.value;
                            });
                            //update chartData for table display
                            var sortedData_1 = [];
                            f.chartConfig.chartData.get().forEach(function (cd) {
                                var value = _this.getSetValue(cd.fieldCalVar);
                                cd.value.set(_this.formatDisplayValue(parseInt(value.replace(/\,/g, '')), "$", null, true));
                                cd.percent.set((parseInt(value.replace(/\,/g, '')) / totalChartValues_1 * 100).toFixed(1) + "%");
                                sortedData_1.push(cd);
                            });
                            sortedData_1 = sortedData_1.sort(_this.sortChartDataTable);
                            f.chartConfig.chartData.set(sortedData_1);
                            //f.chartConfig.chartDataSorted.sync();
                            var opts = {
                                plotArea: {
                                    margin: {
                                        top: -10
                                    }
                                },
                                legend: {
                                    visible: true,
                                    position: "bottom"
                                },
                                chartArea: {
                                    background: ""
                                },
                                seriesColors: ["#b64242", "#cc8830", "#d0b809", "#07873b", "#39a0a1", "#24769f", "#82295c", "#1a1128", "#77747f", "#cecad1"],
                                seriesDefaults: {
                                    labels: {
                                        visible: false,
                                        background: "transparent",
                                        template: "#= category #: #= kendo.format('{0:P0}', percentage)#"
                                        //template: "#= category #: #= kendo.format('{0:P0}', percentage)# \n #= kendo.format('{0:c0}',value)#"
                                    }
                                },
                                series: [f.chartConfig.chartSeries],
                                tooltip: {
                                    visible: true,
                                    template: "#= category #: #= kendo.format('{0:c0}', value)# \n #= kendo.format('{0:P0}',percentage)#"
                                    //format: "{0:c0}"
                                }
                            };
                            $("#" + f.chartConfig.chartID).kendoChart(opts);
                        }
                    });
                });
            });
        };
        OE_AquacultureFinancialViewModel.prototype.getSetValue = function (fieldCalVar, value) {
            var _this = this;
            var returnVal = null;
            this.screens_collection.get().forEach(function (scr) {
                scr['sections'].get().forEach(function (sct) {
                    sct['fields'].get().forEach(function (f) {
                        if (f.fieldCalVar === fieldCalVar && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            returnVal = f.value.get();
                            if (value) {
                                f.value.set(value);
                                _this.updateViewModel(f);
                            }
                        }
                    });
                });
            });
            return returnVal;
        };
        OE_AquacultureFinancialViewModel.prototype.calculateAmortization = function () {
            //pull out loan amount, interest rate, term
            var _this = this;
            //Calculate your monthly payment(p) using your principal balance or total loan amount(a), periodic interest rate(r), which is your annual rate divided by the number of payment periods, and your total number of payment periods(n): 3
            //Formula: a / { [(1 + r) ^ n]-1 } / [r(1 + r) ^ n]=p
            //Assume you borrow $100, 000 at 6 % for 30 years to be repaid monthly.To calculate the monthly payment, convert percentages to decimal format, then follow the formula:
            //a: 100, 000, the amount of the loan
            //r: 0.005(6 % annual rate�expressed as 0.06�divided by 12 monthly payments per year)
            //n: 360(12 monthly payments per year times 30 years)
            //Calculation: 100, 000 / { [(1 + 0.005) ^ 360]-1 } / [0.005(1 + 0.005) ^ 360]=599.55, or 100, 000 / 166.7916=599.55
            var loanAmt;
            var intRate;
            var term;
            var frequency = 12; //monthly vs yearly
            var totInterest = 0;
            var amortTbl = [{
                    paymentNumber: "Number",
                    prevBalance: "Prev Balance",
                    payment: "Payment",
                    interest: "Payment (Interest)",
                    principal: "Payment (Principal)",
                    newBalance: "Balance",
                    totInterest: "Total Interest Paid",
                    class: "div-table-row heading"
                }];
            this.screens_collection.get().forEach(function (scr) {
                scr['sections'].get().forEach(function (sct) {
                    sct['fields'].get().forEach(function (f) {
                        if ((f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            switch (f.fieldCalVar) {
                                case 'loanAmountReq':
                                    loanAmt = parseFloat(f.value.get().replace(/\,/g, ''));
                                    break;
                                case 'loanIntRate':
                                    intRate = parseFloat(f.value.get());
                                    break;
                                case 'termOfLoan':
                                    term = parseInt(f.value.get());
                                    break;
                            }
                        }
                    });
                });
            });
            var freqRate = intRate / frequency;
            var numPayments = frequency * term;
            var formulaDenom = Math.pow((1 + freqRate), numPayments);
            var regularPayment = loanAmt / ((formulaDenom - 1) / (freqRate * (formulaDenom)));
            this.setAnnualLoanPayment(regularPayment, frequency);
            for (var x = 0; x < numPayments; x++) {
                var paymentInterest = loanAmt * freqRate;
                var paymentPrincipal = regularPayment - paymentInterest;
                totInterest += paymentInterest;
                var paymentInfo = {
                    paymentNumber: (x + 1).toString(),
                    prevBalance: this.formatDisplayValue(this.formatValue(loanAmt, 0), '$', null, true),
                    payment: this.formatDisplayValue(this.formatValue(regularPayment, 0), '$', null, true),
                    interest: this.formatDisplayValue(this.formatValue(paymentInterest, 0), '$', null, true),
                    principal: this.formatDisplayValue(this.formatValue(paymentPrincipal, 0), '$', null, true),
                    newBalance: this.formatDisplayValue(this.formatValue(loanAmt - paymentPrincipal, 0), '$', null, true),
                    totInterest: this.formatDisplayValue(this.formatValue(totInterest, 0), '$', null, true),
                    class: 'div-table-row'
                };
                amortTbl.push(paymentInfo);
                loanAmt = loanAmt - paymentPrincipal;
            }
            this.amortization_tbl.set(amortTbl);
            this.amortization_tbl.pulse();
        };
        OE_AquacultureFinancialViewModel.prototype.setAnnualLoanPayment = function (regPayment, freq) {
            var _this = this;
            this.screens_collection.get().forEach(function (scr) {
                scr['sections'].get().forEach(function (sct) {
                    sct['fields'].get().forEach(function (f) {
                        if (f.fieldCalVar === 'annualLoanPayment' && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            f.value.set(_this.formatValue((regPayment * freq), 0));
                            _this.updateViewModel(f);
                        }
                    });
                });
            });
        };
        OE_AquacultureFinancialViewModel.prototype.formatValue = function (value, decimalPlaces) {
            try {
                var val = value.toString().replace(/\,/g, '');
                if (NumberFormat_1.isNumeric(val)) {
                    return this.addCommas(parseFloat(val).toFixed(decimalPlaces).toString());
                }
                else {
                    return value;
                }
            }
            catch (ex) {
                return value;
            }
        };
        OE_AquacultureFinancialViewModel.prototype.addCommas = function (nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0].length > 1 ? x[0].replace(/^0+/, '') : x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        };
        OE_AquacultureFinancialViewModel.prototype.updateViewModel = function (changedInput) {
            var _this = this;
            //find all fields that are dependant on this field for selected system        
            var _fieldCalVar = changedInput.fieldCalVar;
            if (['feedDistance', 'marketDistance'].indexOf(_fieldCalVar) !== -1) {
                //process interpolated distance before processing other dependent variables
                console.log('update interpolated then update costs', changedInput);
                this.updateInterpolatedValues(_fieldCalVar === 'feedDistance' ? 'feedLbTransportCost' : 'marketLbTransportCost');
            }
            if (changedInput.formula.indexOf('[validate:') !== -1) {
                this.validateConstraints(changedInput);
            }
            else if (changedInput.formula.indexOf('[interpolate:') !== -1) {
                var interpolatedValue = Number(this.interpolateValues(changedInput)).toFixed(9);
                changedInput.value.set(interpolatedValue);
            }
            else {
                this.screens_collection.get().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        sct.fields.get().forEach(function (f) {
                            if (f.formula.indexOf(_fieldCalVar) !== -1 && f.fieldCalVar !== _fieldCalVar && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                                //need to update value
                                //get formula
                                var newVal = _this.formatValue(_this.processFieldFormula(f), f.decimalDisp);
                                if (newVal ? newVal !== f.value.get() && newVal.indexOf('NaN') == -1 : false) {
                                    if (f.uiType === 'slider') {
                                        _this.setKendoSlider(f, newVal);
                                    }
                                    f.value.set(newVal);
                                    //check if related to amortization and update table if so
                                    if (['_termOfLoan', '_loanIntRate', 'loanAmountReq'].indexOf(f.fieldCalVar) !== -1) {
                                        _this.calculateAmortization();
                                    }
                                    //check if net gain/loss or profitability and change display class to color accordingly.
                                    if (['annualNetGainLoss', 'grossProfitMarginRatio', 'annualNetGainLossLoan', '_annualNetGainLoss', '_grossProfitMarginRatio', '_annualNetGainLossLoan'].indexOf(f.fieldCalVar) !== -1) {
                                        f.tableDisplayClass.set(parseFloat(f.value.get().replace(/\,/g, '')) > 0 ? 'div-table-cell InputCalcRevenue' : 'div-table-cell InputCalcExpense');
                                    }
                                    //recurssivley search for other dependent variables
                                    _this.updateViewModel(f);
                                }
                            }
                        });
                    });
                });
            }
        };
        OE_AquacultureFinancialViewModel.prototype.setKendoSlider = function (f, newVal) {
            var thisScope = this;
            var sliderID = f.fieldID;
            //var sliderTextHandle = $("#" + sliderID + " .oe-slider-handle");
            var sliderTextHandle = $("#" + f.fieldHandle);
            newVal = newVal ? newVal : f.value.get();
            sliderTextHandle.val(thisScope.formatDisplayValue(newVal.toString(), f.unit, f.decimalDisp, false));
            var min = f.min ? parseFloat(f.min) : 0;
            var max = f.max ? parseFloat(f.max) : 100;
            var increment = f.increment ? parseFloat(f.increment) : 1;
            var value = newVal.replace(/\,/g, ''); //
            //let value = this.formatValue(newVal, f.decimalDisp);
            ////////////////////////////////////////////////
            // Kendo Slider
            ////////////////////////////////////////////////
            var opts = {
                increaseButtonTitle: "+",
                decreaseButtonTitle: "-",
                dragHandleTitle: "",
                min: min,
                max: max,
                value: value,
                smallStep: increment,
                largeStep: increment,
                tooltip: {
                    enabled: false
                },
                tickPlacement: "none",
                showButtons: true,
                slide: function (slideEvt) {
                    sliderTextHandle.val(thisScope.formatDisplayValue(slideEvt.value.toString(), f.unit, f.decimalDisp, false));
                },
                change: function (changeEvt) {
                    var newVal = changeEvt.value.toString();
                    sliderTextHandle.val(thisScope.formatDisplayValue(newVal, f.unit, f.decimalDisp, false));
                    f.value.set(newVal);
                    thisScope.updateViewModel(f);
                }
            };
            //Check if slider already added and update reference or else create
            if ($("#" + sliderID).data("kendoSlider")) {
                var slider = $("#" + sliderID).data("kendoSlider");
                slider.value(value);
            }
            else {
                $("#" + sliderID).kendoSlider(opts);
            }
        };
        OE_AquacultureFinancialViewModel.prototype.updateSlider = function (field) {
            if (this.checkIsValidTextInput(field) && field.uiType === 'slider') {
                var sliderTextHandle = $("#" + field.fieldHandle);
                var newValue = sliderTextHandle.val().toString().split(' ')[0].replace(/\,/g, '');
                sliderTextHandle.val(this.formatDisplayValue(newValue, field.unit, field.decimalDisp, false));
                var slider = $("#" + field.fieldID).data("kendoSlider");
                if ($.isNumeric(newValue)) {
                    slider.value(Number(newValue));
                }
                else {
                    slider.value(0);
                }
                field.value.set(newValue);
                this.updateViewModel(field);
            }
            else {
                //console.log('not valid for slider update');
            }
        };
        OE_AquacultureFinancialViewModel.prototype.validateTextInput = function (evt, elem, field) {
            if (elem.value === '________') {
                elem.value = '';
            }
            if (evt.keyCode === 27) {
                //reset to default value
                //console.log('reset!', field);
                //get default
                elem.value = field.defaultVal;
                this.updateSlider(field);
            }
            if (evt.keyCode === 13) {
                //submit changes
                this.updateSlider(field);
            }
            var isValid = this.checkIsValidTextInput(field);
            if (isValid) {
                //elem.value = this.formatDisplayValue(elem.value.split(' ')[0].replace(/\,/g, ''), field.unit, field.decimalDisp);
            }
        };
        OE_AquacultureFinancialViewModel.prototype.checkIsValidTextInput = function (field) {
            var inputValue = $("#" + field.fieldHandle).val().toString().split(' ')[0].replace(/\,/g, '');
            if (inputValue !== field.defaultVal || !isNaN(field.defaultVal)) {
                var isValid = !isNaN(inputValue) ? parseFloat(inputValue) >= parseFloat(field.min) && parseFloat(inputValue) <= parseFloat(field.max) : false;
                var baseClass = field.uiType === 'dropdownLocations' ? 'validate-msg-nested' : 'validate-msg';
                field.fieldValidateMsgClass.set(!isValid
                    ? baseClass : baseClass + ' hide');
                return isValid;
            }
            else {
                return true;
            }
        };
        OE_AquacultureFinancialViewModel.prototype.checkClearTextInput = function (evt, elem, ctx) {
            if (elem.value === '________') {
                elem.value = '';
            }
            //return true;
        };
        OE_AquacultureFinancialViewModel.prototype.formatDisplayValue = function (val, unit, decimalDisp, showUnits) {
            var returnVal;
            //showUnits = showUnits ? false : true;
            if (val === '________') {
                return val;
            }
            else {
                val = this.addCommas(val);
                switch (unit) {
                    case '$':
                        returnVal = (showUnits ? unit : '') + val;
                        break;
                    case '#':
                        returnVal = val;
                        break;
                    case '%':
                        returnVal = decimalDisp
                            ? decimalDisp > 2
                                ? ((parseFloat(val) * 100).toFixed(decimalDisp - 2) + (showUnits ? unit : ''))
                                : Math.round(parseFloat(val) * 100) + (showUnits ? unit : '')
                            : Math.round(parseFloat(val) * 100) + (showUnits ? unit : '');
                        break;
                    default:
                        returnVal = val + ' ' + (showUnits ? unit : '');
                        break;
                }
                return returnVal;
            }
        };
        OE_AquacultureFinancialViewModel.prototype.processFieldFormula = function (field) {
            var _this = this;
            //parse fomula
            var formula = field.formula;
            if (formula.indexOf('[validate') !== -1) {
                this.validateConstraints(field);
                return field.value.get();
            }
            else if (formula.indexOf('[interpolate') !== -1) {
                //console.log('interpolate!!!', field, formula);
                return this.interpolateValues(field).toString();
            }
            else {
                var formulaVals_1 = formula;
                var formulaFields = formula
                    .replace(/\*/g, ',')
                    .replace(/\+/g, ',')
                    .replace(/\-/g, ',')
                    .replace(new RegExp('/', 'g'), ',')
                    .replace(/\(/g, '')
                    .replace(/\)/g, '')
                    .replace(/\Math.log/g, '')
                    .split(',');
                //formulaFields.forEach(ff => {
                //    this.screens_collection.get().forEach(s => {
                //        s['sections'].get().forEach(sct => {
                //            sct.fields.get().forEach(f => {
                //                if (f.fieldCalVar === ff && ff !== '' && (f.show.indexOf('All') !== -1 || f.show.indexOf(this.selected_system_text.get()) !== -1)) {
                //                    let value = f.value.get().split(/\ /g)[0].replace(/\,/g, '');
                //                    formulaVals = formulaVals.replace(ff, value);
                //                }
                //            });
                //        });
                //    });
                //});
                formulaFields.forEach(function (ff) {
                    if (!NumberFormat_1.isNumeric(ff)) {
                        var ffVal = _this.getSetValue(ff).toString().split(/\ /g)[0].replace(/\,/g, '');
                        formulaVals_1 = formulaVals_1.replace(ff, ffVal);
                    }
                });
                //should have updated formula as a string
                //console.log('formula with values', formulaVals);
                return eval(formulaVals_1);
            }
        };
        OE_AquacultureFinancialViewModel.prototype.validateConstraints = function (field) {
            var _this = this;
            var _fieldToValidate = field.formula.indexOf('[validate:') !== -1 ? field.formula.split('validate:')[1].split(']')[0] : '';
            this.screens_collection.get().forEach(function (s) {
                s['sections'].get().forEach(function (sct) {
                    sct.fields.get().forEach(function (f) {
                        //validate constraints
                        if (_fieldToValidate !== '' && f.fieldCalVar === _fieldToValidate && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            if (field.value.get() !== '________') {
                                var isNotValid = parseFloat(field.value.get().replace(/\,/g, '')) < parseFloat(f.value.get().replace(/\,/g, ''));
                                f.class.set(isNotValid ? 'div-table-cell values warning' : 'div-table-cell values');
                                _this.invalid_array = _this.invalid_array.filter(function (iv) { return iv !== f.fieldCalVar; });
                                if (isNotValid) {
                                    _this.invalid_array.push(f.fieldCalVar);
                                }
                                //set system level warning
                                _this.systems_tbl.get().forEach(function (s) {
                                    if (s['system'] === _this.selected_system_text.get()) {
                                        s['constraintsValid'].set(_this.invalid_array.length === 0);
                                    }
                                });
                                //this.show_warning.set();
                            }
                        }
                    });
                });
            });
        };
        OE_AquacultureFinancialViewModel.prototype.interpolateValues = function (field) {
            //get values to base lookup and interpolation
            var formula = field.formula;
            var interpolateType = formula.split(':')[1].split('{')[0];
            var fields = formula.split('{')[1].split('}')[0].split('>');
            var distinct = function (value, index, self) {
                return self.indexOf(value) === index;
            };
            var returnVal;
            switch (interpolateType) {
                case "Transporation":
                default:
                    //get lookup values based on formula fields
                    //weight
                    var weight_1 = parseInt(this.getSetValue(fields[0]).replace(/\,/g, ''));
                    var distance_1 = parseInt(this.getSetValue(fields[1]).replace(/\,/g, ''));
                    //distance under
                    var x_1_1 = this.transportation_lut
                        .map(function (td) { return parseInt(td.miles); })
                        .filter(distinct)
                        .filter(function (td) { return td <= distance_1; })
                        .sort(function (a, b) { return b - a; })[0];
                    //distance over
                    var x_2_1 = this.transportation_lut
                        .map(function (td) { return parseInt(td.miles); })
                        .filter(distinct)
                        .filter(function (td) { return td > distance_1; })
                        .sort(function (a, b) { return a - b; })[0];
                    //weight under
                    var y_1_1 = this.transportation_lut
                        .map(function (td) { return parseInt(td.pounds); })
                        .filter(distinct)
                        .filter(function (td) { return td <= weight_1; })
                        .sort(function (a, b) { return b - a; })[0];
                    //weight over
                    var y_2_1 = this.transportation_lut
                        .map(function (td) { return parseInt(td.pounds); })
                        .filter(distinct)
                        .filter(function (td) { return td > weight_1; })
                        .sort(function (a, b) { return a - b; })[0];
                    //get value lookups
                    //market distance under by harvest weight under
                    var Q_11 = parseFloat(this.transportation_lut.filter(function (hw) { return parseInt(hw.miles) === x_1_1 && parseInt(hw.pounds) === y_1_1; })[0].shipCostLbMile);
                    var Q_12 = parseFloat(this.transportation_lut.filter(function (hw) { return parseInt(hw.miles) === x_1_1 && parseInt(hw.pounds) === y_2_1; })[0].shipCostLbMile);
                    var Q_21 = parseFloat(this.transportation_lut.filter(function (hw) { return parseInt(hw.miles) === x_2_1 && parseInt(hw.pounds) === y_1_1; })[0].shipCostLbMile);
                    var Q_22 = parseFloat(this.transportation_lut.filter(function (hw) { return parseInt(hw.miles) === x_2_1 && parseInt(hw.pounds) === y_2_1; })[0].shipCostLbMile);
                    //bilinear interpolation calculation: 
                    //=1/((x_2-x_1)*(y_2-y_1))*(Q_11*(x_2-x)*(y_2-y)+Q_21*(x-x_1)*(y_2-y)+Q_12*(x_2-x)*(y-y_1)+Q_22*(x-x_1)*(y-y_1))
                    // help https://engineerexcel.com/bilinear-interpolation-excel/                
                    var x = distance_1;
                    var y = weight_1;
                    var interpolatedShipCostLbMile = 1 / ((x_2_1 - x_1_1) * (y_2_1 - y_1_1)) * (Q_11 * (x_2_1 - x) * (y_2_1 - y) + Q_21 * (x - x_1_1) * (y_2_1 - y) + Q_12 * (x_2_1 - x) * (y - y_1_1) + Q_22 * (x - x_1_1) * (y - y_1_1));
                    //set field value
                    returnVal = interpolatedShipCostLbMile;
                    break;
            }
            return returnVal;
        };
        OE_AquacultureFinancialViewModel.prototype.updateInterpolatedValues = function (fieldCalVar) {
            var _this = this;
            //get field for system
            this.screens_collection.get().forEach(function (scr) {
                scr['sections'].get().forEach(function (sct) {
                    sct['fields'].get().forEach(function (f) {
                        if (f.fieldCalVar === fieldCalVar && (f.show.indexOf('All') !== -1 || f.show.indexOf(_this.selected_system_text.get()) !== -1)) {
                            var interpolatedValue = Number(_this.interpolateValues(f)).toFixed(9);
                            f.value.set(interpolatedValue);
                        }
                    });
                });
            });
        };
        OE_AquacultureFinancialViewModel.prototype.setSelectedSystem = function (selSystem) {
            if (this.selected_system.get() !== selSystem) {
                this.selected_system.set(selSystem);
                this.show_next_btn.set(true);
                this.systems_tbl.get()
                    .forEach(function (s) {
                    s['selected'].set(selSystem.system === s['system']);
                });
                this.show_other_input_params_1.set(selSystem.system ? true : false);
                //this.refreshScreenFilters()
            }
        };
        OE_AquacultureFinancialViewModel.prototype.setSelectedQuickstartResource = function (selQsRes) {
            if (this.screens_collection.get().length > 0) {
                this.screens_collection.getItems().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        if (sct.sectionType === 'Resources') {
                            sct.fields.get().forEach(function (f) {
                                f.visible.set(f.fieldName === selQsRes);
                            });
                        }
                    });
                });
            }
        };
        OE_AquacultureFinancialViewModel.prototype.resetSystemFilters = function () {
            if (this.screens_collection.get().length > 0) {
                this.screens_collection.getItems().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        if (sct.sectionType === 'Select System') {
                            sct.selected_prod_meth_filter.set(sct.prod_meth_tbl.getAt(0)['production_method']);
                            sct.selected_species_filter.set(sct.species_tbl.getAt(0)['species']);
                        }
                    });
                });
            }
        };
        //getClosestMarkets() {
        //    let mapPoint = this.selected_location.get().point;
        //    var workflowArgs: any = {};
        //    workflowArgs.workflowId = "Closest_Markets";
        //    workflowArgs.mapPoint = this.selected_location.get().point;        
        //    this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
        //}
        //getClosestFeedSuppliers() {
        //    let mapPoint = this.selected_location.get().point;
        //    var workflowArgs: any = {};
        //    workflowArgs.workflowId = "Closest_Feed_Suppliers";
        //    workflowArgs.mapPoint = this.selected_location.get().point;
        //    this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
        //}
        OE_AquacultureFinancialViewModel.prototype.getSiteReport = function () {
            if (this.site_report_loading.get() !== true) {
                this.site_report_loading.set(true);
                this.show_site_report_url.set(false);
                var mapPoint = esri.geometry.geographicToWebMercator(this.selected_location.get().point);
                var workflowArgs = {};
                workflowArgs.workflowId = "Aquaculture_Site_Report";
                workflowArgs.startPointIn = mapPoint;
                workflowArgs.onlyReportURL = true;
                this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
            }
        };
        //routeDistance(destType, location) {
        //    var site = (<any>this).app.site;
        //    var queryUrl = site.essentialsMap.mapServices.filter(ms => ms.displayName === 'Supplies and Markets')[0].layers.filter(l => l.displayName === (destType === 'markets' ? 'Markets (Cities > 50K)' : 'Feed Suppliers'))[0].getLayerUrl();
        //    //based on destination get appropriate data
        //    let QueryTask = new esri.tasks.QueryTask(queryUrl);
        //    let Query = new esri.tasks.Query();
        //    Query.returnGeometry = true;
        //    Query.where = destType === 'markets' ? "NAME like  '" + location.name + "'" : "Name like '" + location.name + "'";
        //    QueryTask.execute(Query, (results) => {
        //        console.log('results from markets/feed', results);
        //    });
        //    let request = new XMLHttpRequest();
        //    request.open('POST', "https://api.openrouteservice.org/v2/matrix/driving-car");
        //    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
        //    request.setRequestHeader('Content-Type', 'application/json');
        //    request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248be3feb3f8b3c45a68ca1db32bbfaa56b');
        //    request.onreadystatechange = function () {
        //        if (this.readyState === 4) {
        //            console.log('Status:', this.status);
        //            console.log('Headers:', this.getAllResponseHeaders());
        //            console.log('Body:', this.responseText);
        //        }
        //    };
        //    const body = '{"locations":[[9.70093,48.477473],[9.207916,49.153868],[37.573242,55.801281],[115.663757,38.106467]]}';
        //    request.send(body);
        //}
        OE_AquacultureFinancialViewModel.prototype.runRoutingServices = function () {
            var mapPoint = this.selected_location.get().point;
            //convert to 4326
            var workflowArgs = {};
            workflowArgs.workflowId = "Markets_Supply_Distances";
            workflowArgs.locationIn = mapPoint; //mapPoint.x.toString() + "," + mapPoint.y.toString() + "," + mapPoint.spatialReference.wkid;
            workflowArgs.useDynamicExternal = true;
            workflowArgs.maxDistance = "250";
            //workflowArgs.runInBackground = true;
            this.app.commandRegistry.command("RunWorkflowWithArguments").execute(workflowArgs);
        };
        OE_AquacultureFinancialViewModel.prototype._injectScript = function () {
            //html2canvas
            // http://html2canvas.hertzen.com/
            ////////////////
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/html2canvas.min.js",
                dataType: "script",
                success: function () {
                    //console.log('success!');
                },
                error: function (err) {
                    //console.log('fail', err);
                }
            });
        };
        OE_AquacultureFinancialViewModel.prototype._refreshSystemsDisplay = function () {
            if (this.screens_collection.get().length > 0) {
                this.screens_collection.getItems().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        if (sct.sectionType === 'Select System') {
                            sct.systems_tbl_filter.refresh();
                            sct.show_no_systems_in_filtered_view.set(sct.systems_tbl_filter.isEmpty());
                        }
                        else {
                            //update field categories to filter based on new system selection
                            sct.field_categories.get().forEach(function (fc) {
                                fc.fields_filter.refresh();
                            });
                            //sct.field_ui_categories.get().forEach(fc => {
                            //    fc.fields_filter.refresh();
                            //});
                            sct.fields_filter.refresh();
                        }
                    });
                });
            }
        };
        OE_AquacultureFinancialViewModel.prototype._onSiteInitialized = function (site, thisViewModel, config) {
            this._injectScript();
            //if (config) {
            //    let configUri = config["configUri"];
            //    $.ajax({
            //        type: "GET",
            //        url: configUri,
            //        dataType: "json",
            //        context: thisViewModel,
            //        success: function (config) {
            //            console.log('got financial pln config! ', config);
            //            thisViewModel.moduleJsonConfig = config;
            //        },
            //        error: function (err) {
            //            console.log('fail', err);
            //        }
            //    });
            //}
        };
        OE_AquacultureFinancialViewModel.prototype._setScreenSectionBindings = function () {
            //if (this.screens_collection.get().length > 0) {
            //    this.screens_collection.getItems().forEach(s => {
            //        s['sections'].get().forEach(sct => {
            //            if (sct.sectionType === 'Select System') {
            //                sct.selected_system.bind(this, (selSys) => {
            //                    this.selected_system.set(selSys);
            //                    this.selected_species_label.set(selSys.species);
            //                    this.selected_prod_meth_label.set(selSys.production_method);
            //                });
            //                sct.selected_species.bind(this, (selSpecies) => {
            //                    this.selected_species.set(selSpecies);
            //                });
            //                sct.selected_prod_meth.bind(this, (selProdMeth) => {
            //                    this.selected_prod_meth.set(selProdMeth);
            //                });
            var _this = this;
            //            }
            //        });
            //    });
            //}
            this.selected_location.bind(this, function (selLoc) {
                if (_this.screens_collection.get().length > 0) {
                    //update the map screen info
                    //console.log('selected location', selLoc, this.screens_collection);
                    _this.screens_collection.getItems().forEach(function (s) {
                        s['sections'].get().forEach(function (sct) {
                            if (sct.sectionType === 'Map') {
                                sct.selected_location.set(selLoc);
                                sct.show_selected_location.set(selLoc ? true : false);
                                sct.show_add_location.set(selLoc ? false : true);
                            }
                        });
                    });
                }
            });
        };
        OE_AquacultureFinancialViewModel.prototype._systemsFilters = function (thisViewModel, system) {
            var returnValSpecies = true;
            var returnValProdMeth = true;
            if (this.screens_collection.get().length > 0) {
                this.screens_collection.getItems().forEach(function (s) {
                    s['sections'].get().forEach(function (sct) {
                        if (sct.sectionType === 'Select System') {
                            var selectedSpeciesFilter = sct.selected_species_filter.get();
                            var selectedProdMethFilter = sct.selected_prod_meth_filter.get();
                            if (selectedSpeciesFilter) {
                                if (selectedSpeciesFilter.indexOf("<--") === -1) {
                                    returnValSpecies = system.species === selectedSpeciesFilter;
                                }
                            }
                            if (selectedProdMethFilter) {
                                if (selectedProdMethFilter.indexOf("<--") === -1) {
                                    returnValProdMeth = system.production_method == selectedProdMethFilter;
                                }
                            }
                        }
                    });
                });
            }
            return returnValSpecies && returnValProdMeth;
        };
        OE_AquacultureFinancialViewModel.prototype.refreshScreenFilters = function () {
            this.screens_collection_filter.refresh();
            this.screens_collection.get().forEach(function (s) { return s['sections'].get().forEach(function (sct) { return sct['fields_filter'].refresh(); }); });
        };
        OE_AquacultureFinancialViewModel.prototype._screensFilter = function (thisViewModel, screen) {
            //TODO Go through each screen/section and determine if fields for selected system exist and if so, then return true.
            //Also 
            if (this.show_all_for_report.get()) {
                return true;
            }
            else {
                return this._screenSystemFilter(screen);
                //let hasFieldsForSystem = false;
                //this.screens_collection.get().forEach(scr => {
                //    return this._screenSystemFilter(scr)
                //    //if (scr["id"] === screen.id && !hasFieldsForSystem) {
                //    //    scr['sections'].get().forEach(sct => {
                //    //        sct.fields.get().forEach(f => {
                //    //            hasFieldsForSystem = f.show.indexOf(this.selected_system_text.get()) !== -1 || f.show.indexOf('All') !== -1
                //    //                ? true
                //    //                : hasFieldsForSystem;
                //    //        });
                //    //    });
                //    //}
                //});
                //return hasFieldsForSystem;
            }
        };
        OE_AquacultureFinancialViewModel.prototype._screenSystemFilter = function (screen, forReport) {
            var _this = this;
            var hasFieldsForSystem = false;
            var forReportView = forReport;
            this.screens_collection.get().forEach(function (scr) {
                if (scr["id"] === screen.id && !hasFieldsForSystem) {
                    if (forReport && scr['showInReport'] === 'False') {
                        return false;
                    }
                    else {
                        scr['sections'].get().forEach(function (sct) {
                            sct.fields.get().forEach(function (f) {
                                hasFieldsForSystem = f.show.indexOf(_this.selected_system_text.get()) !== -1 || f.show.indexOf('All') !== -1
                                    ? true
                                    : hasFieldsForSystem;
                            });
                        });
                    }
                }
            });
            return hasFieldsForSystem;
        };
        OE_AquacultureFinancialViewModel.prototype._selectedFilter = function (thisViewModel, obj) {
            //return true;
            return obj.selected;
        };
        OE_AquacultureFinancialViewModel.prototype._fieldsFilter = function (thisViewModel, field) {
            return field.uiType !== 'none'
                ? this.selected_system.get()['system']
                    ? field.show.indexOf('All') !== -1 || field.show.indexOf(this.selected_system.get()['system']) !== -1
                    : false
                : false;
        };
        OE_AquacultureFinancialViewModel.prototype._summarySectionsFilter = function (thisViewModel, section) {
            return section.sectionType === "InputsCalculated";
        };
        OE_AquacultureFinancialViewModel.prototype._checkOtherParamVisible = function () {
            var hasSpeciesSelection = this.selected_species.get() === "" ? false : this.selected_species.get().indexOf("<--") === -1;
            var hasProdMethSelection = this.selected_prod_meth.get() === "" ? false : this.selected_prod_meth.get().indexOf("<--") === -1;
            this.show_other_input_params_1.set(hasSpeciesSelection && hasProdMethSelection);
        };
        OE_AquacultureFinancialViewModel.prototype._resetMap = function () {
            try {
                this.esriMap = null;
                if (this.esriBasemapToggle) {
                    this.esriBasemapToggle.destroy();
                }
                if (this.esriHomeBtn) {
                    this.esriHomeBtn.destroy();
                }
                if (this.esriSearch) {
                    this.esriSearch.destroy();
                }
            }
            catch (ex) {
                //console.log('multiple map deletes?');
            }
        };
        OE_AquacultureFinancialViewModel.prototype._resetValues = function () {
            var closestMarkets = [];
            this.closest_markets.get().forEach(function (m) { return closestMarkets.push(m); });
            var closestFeedSuppliers = [];
            this.feed_suppliers.get().forEach(function (f) { return closestFeedSuppliers.push(f); });
            this.setScreens();
            this.show_warning.set(false);
            this.closest_markets.set(closestMarkets);
            this.feed_suppliers.set(closestFeedSuppliers);
        };
        OE_AquacultureFinancialViewModel.prototype._resetDefaults = function () {
            this._resetMap();
        };
        return OE_AquacultureFinancialViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_AquacultureFinancialViewModel = OE_AquacultureFinancialViewModel;
});

},
"geocortex/oe_amd/OE_Aquaculture/OE_AquacultureModule": function () {
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
define(["require", "exports", "geocortex/framework/application/ModuleBase", "geocortex/charting/Chart"], function (require, exports, ModuleBase_1, Chart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_AquacultureModule = /** @class */ (function (_super) {
        __extends(OE_AquacultureModule, _super);
        function OE_AquacultureModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_AquacultureModule.prototype.initialize = function (config) {
            var site = this.app.site;
            Chart_1.Chart.prototype.initialize();
            //var map = new esri.Map("tempmap");
            //var essentialsSite = new Site("https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/sites/__root_oreall", map);
            //dojo.connect(site, "onInitialized", this._onSiteInitialized);
            //dojo.connect(site, "onInitializationFailed", this._onSiteInitializationFailed);
            //site.initialize();
            //if (site && site.isInitialized) {
            //    this._onSiteInitialized(site);
            //}
            //else {
            //    this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, (args) => {
            //        this._onSiteInitialized(args);
            //    });
            //}
        };
        OE_AquacultureModule.prototype._onSiteInitialized = function (site) {
        };
        OE_AquacultureModule.prototype._onSiteInitializationFailed = function (args) {
            console.log('failed', args);
        };
        return OE_AquacultureModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_AquacultureModule = OE_AquacultureModule;
});

},
"url:/geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormView.html": markup1,
"url:/geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView.html": markup2,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/amortization.html": markup3,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html": markup4,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/dropdownLocations.html": markup5,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/inputNumber.html": markup6,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/inputs.html": markup7,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/inputsCalculated.html": markup8,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html": markup9,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/locationMap.html": markup10,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/operatingCharts.html": markup11,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/overview.html": markup12,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/parameters.html": markup13,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/production.html": markup14,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/resources.html": markup15,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/selectSystem.html": markup16,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/slider.html": markup17,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/sliderKendo.html": markup18,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/summary.html": markup19,
"url:/geocortex/oe_amd/OE_Aquaculture/Templates/transportationLocations.html": markup20,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/CSS/OE_Aquaculture.css", "css", "DQojYXF1YS1maW5hbmNpYWwtcGxuLXdyYXBwZXIgew0KICAgIC8qbWF4LXdpZHRoOiA5MSU7DQogICAgbWF4LWhlaWdodDogOTUlOw0KICAgIG1pbi1oZWlnaHQ6NjAwcHg7Ki8NCiAgICAvKm1heC13aWR0aDogMTIwMHB4OyovDQogICAgLyptYXgtaGVpZ2h0OiAxMjAwcHg7Ki8NCiAgICBwb3NpdGlvbjogcmVsYXRpdmU7DQogICAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmOw0KICAgIGZvbnQtc2l6ZTogMS4yZW07DQp9DQogICAgDQoNCi5tb2RhbC1jb250YWluZXIgew0KICAgIG1pbi13aWR0aDogOTAlICFpbXBvcnRhbnQ7DQogICAgbWF4LXdpZHRoOiAxNDAwcHggIWltcG9ydGFudDsNCiAgICBtaW4taGVpZ2h0OiA5MCUgIWltcG9ydGFudDsNCiAgICBtYXgtaGVpZ2h0OiAxNDAwcHggIWltcG9ydGFudDsNCn0NCg0KLnRvb2xiYXItZ3JvdXAuYm91bmQtdmlzaWJsZS5vZS1hcXVhIGltZ3sNCiAgICB3aWR0aDoxNnB4Ow0KICAgIGhlaWdodDoxNnB4Ow0KICAgIA0KfQ0KDQojbG9hZGluZy13cmFwcGVyLXBkZiwgI2xvYWRpbmctd3JhcHBlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHRvcDogMDsNCiAgICBib3R0b206IDA7DQogICAgbGVmdDogMDsNCiAgICByaWdodDogMDsNCiAgICAvKmNvbG9yOiB3aGl0ZTsqLw0KICAgIHotaW5kZXg6IDIwMDA7DQogICAgaGVpZ2h0OiAxMDAlOw0KfQ0KDQojbG9hZGluZy13cmFwcGVyLXBkZiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0NDQ0NDQzsNCn0NCg0KI2xvYWRpbmdfcGRmLCAjbG9hZGluZyB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGhlaWdodDogMTAwJTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICB0b3A6IDQ1JTsNCn0NCg0KICAgICNsb2FkaW5nX3BkZiBkaXYsICNsb2FkaW5nIGRpdiB7DQogICAgICAgIHdpZHRoOiAzMDBweDsNCiAgICAgICAgaGVpZ2h0OiAxMDBweDsNCiAgICAgICAgbWFyZ2luOiBhdXRvOw0KICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7DQogICAgfQ0KDQoucGFuZWwgew0KICAgIC8qY2xlYXI6Ym90aDsqLw0KICAgIGRpc3BsYXk6IHRhYmxlOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIC8qaGVpZ2h0Ojgwdmg7Ki8NCiAgICAvKm1heC13aWR0aDogMTIwMHB4OyovDQp9DQoNCi5wYW5lbC1yb3cgew0KICAgIGRpc3BsYXk6IHRhYmxlLXJvdzsNCn0NCg0KLnBhbmVsLWNlbGwgew0KICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7DQogICAgd2lkdGg6IDgwJTsNCiAgICBtaW4td2lkdGg6IDE1MHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7DQogICAgbWF4LXdpZHRoOjgwMHB4Ow0KICAgIC8qbWluLWhlaWdodDogNTAwcHg7Ki8NCn0NCg0KICAgIC5wYW5lbC1jZWxsLmxvY2F0aW9uIHsNCiAgICAgICAgd2lkdGg6IDY1JTsNCiAgICAgICAgLyptYXgtd2lkdGg6IDc1MHB4OyovDQogICAgfQ0KDQogICAgLnBhbmVsLWNlbGwudGFicyB7DQogICAgICAgIHdpZHRoOiAxNmVtOw0KICAgIH0NCg0KICAgIC5wYW5lbC1jZWxsLnNjcmVlbnMgew0KICAgICAgICAvKndpZHRoOjc1JTsqLw0KICAgICAgICAvKm1pbi13aWR0aDogNzAwcHg7Ki8NCiAgICAgICAgcGFkZGluZy1ib3R0b206IDQwcHg7DQogICAgfQ0KDQogICAgLnNjcmVlbi10aXRsZSBkaXZ7DQogICAgICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KICAgIH0NCiAgICAuc2NyZWVuLXRpdGxlIGgzew0KICAgICAgICBjb2xvcjojYWNhN2E3Ow0KICAgICAgICBtYXJnaW4tbGVmdDoyMHB4Ow0KICAgIH0NCg0KaGVhZGVyIHsNCiAgICBiYWNrZ3JvdW5kOiAjZjRmNGY0Ow0KICAgIHBhZGRpbmc6IDAgMTBweCAwOw0KICAgIGhlaWdodDogNDVweDsgLyozMHB4OyovDQogICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICMzYzZmOGU7DQogICAgZGlzcGxheTp0YWJsZTsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KICAgIGhlYWRlciBkaXZ7DQogICAgICAgIC8qdGV4dC1hbGlnbjpyaWdodDsqLw0KICAgICAgICBwYWRkaW5nOjVweCAyNXB4IDVweDsNCiAgICAgICAgZm9udC1zaXplOjEycHg7DQogICAgICAgIGNvbG9yOiMxQTcyQzQ7DQogICAgfQ0KICAgIA0KICAgIGhlYWRlciBkaXY6aG92ZXJ7DQogICAgICAgIC8qdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsqLw0KICAgICAgICBjdXJzb3I6cG9pbnRlcjsNCiAgICB9DQoNCi5oZWFkZXItYmFyLXdyYXBwZXJ7DQogICAgcG9zaXRpb246cmVsYXRpdmU7DQogICAgd2lkdGg6MTAwJTsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdzsNCn0NCg0KLmhlYWRlci1iYXItbGVmdCB7DQogICAgLypwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgbGVmdDogMTBweDsNCiAgICB0b3A6IC0ycHg7Ki8NCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7DQogICAgd2lkdGg6NjYlOw0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQogICAgdmVydGljYWwtYWxpZ246bWlkZGxlOw0KfQ0KDQogICAgLmhlYWRlci1iYXItbGVmdCBkaXYgew0KICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgICAgIHBhZGRpbmc6IDAgMTBweDsNCiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgICB9DQoNCi5oZWFkZXItd2FybmluZy13cmFwcGVyIGRpdnsNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCn0NCiAgI3dhcm5pbmctbWVzc2FnZXsNCiAgICAgIHBhZGRpbmctYm90dG9tOjVweDsNCiAgfQ0KDQogICN3YXJuaW5nLW1lc3NhZ2U6aG92ZXJ7DQogICAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOw0KICB9DQouaGVhZGVyLWJhci1yaWdodHsNCiAgICAvKnBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjEwcHg7DQogICAgdG9wOi0ycHg7Ki8NCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7DQogICAgd2lkdGg6MzMlOw0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQp9DQoNCi5oZWFkZXItYmFyLXJpZ2h0IGRpdnsNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCiAgICBwYWRkaW5nOjAgMTBweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7DQp9DQoNCi5oZWFkZXItYmFyLXdyYXBwZXIgI3JlcG9ydC1uYW1lIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgcmlnaHQ6IDIwcHg7DQogICAgdG9wOiA0NXB4Ow0KICAgIC8qcGFkZGluZzogNXB4OyovDQogICAgei1pbmRleDogMjsNCiAgICBiYWNrZ3JvdW5kOiAjZDdlMWU3Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOw0KICAgIGJvcmRlci1yYWRpdXM6IDVweDsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgd2lkdGg6IDIwMHB4Ow0KfQ0KDQojcmVwb3J0LW5hbWUtZm9ybXsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICBwYWRkaW5nOjEwcHggMDsNCn0NCg0KI3JlcG9ydC1uYW1lLWZvcm0gLmNsb3NlLWJ0biB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHJpZ2h0OiAtNDBweDsNCiAgICB0b3A6IC0ycHg7DQp9DQoNCg0KDQouY2xlYXJ7DQogICAgZmxvYXQ6bm9uZTsNCiAgICBjbGVhcjpib3RoOw0KfQ0KDQojZmluLXBsbi1mb290ZXIgew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBib3R0b206IDA7DQogICAgbGVmdDogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjMUE3MkM0OyovDQogICAgcGFkZGluZzogMTBweCAwOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7DQogICAgLyptaW4taGVpZ2h0OiA1MHB4OyovDQogICAgei1pbmRleDogMTAwOw0KfQ0KDQojcGFnZXItd3JhcHBlciB7DQogICAgd2lkdGg6IDEwMCU7DQogICAgZGlzcGxheTogdGFibGU7DQp9DQoNCi5vZS1idG4gew0KICAgIGhlaWdodDogMTAwJTsNCiAgICAvKndpZHRoOiA1ZW07Ki8NCiAgICBtaW4td2lkdGg6IDVlbTsNCiAgICBwYWRkaW5nOiAuNWVtIDFlbTsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1Ow0KICAgIGZvbnQtd2VpZ2h0OiA2MDA7DQogICAgY29sb3I6ICMxQTcyQzQ7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGxpbmUtaGVpZ2h0OiAxMDAlOw0KICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0NDQ0NDOw0KICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOw0KICAgIG92ZXJmbG93OiBoaWRkZW47DQogICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsNCn0NCg0KDQogICAgLm9lLWJ0bjpob3ZlciB7DQogICAgICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7DQogICAgfQ0KDQogICAgLm9lLWJ0bi5hZGQtbG9jYXRpb24gew0KICAgICAgICB3aWR0aDogMTdlbTsNCiAgICB9DQoNCiAgICAub2UtYnRuLmNsZWFyLWZpbHRlcnMgew0KICAgICAgICB3aWR0aDogOGVtOw0KICAgIH0NCg0KLmlucHV0LWhlYWRlci13cmFwcGVyOmhvdmVyIHsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7DQp9DQoNCi5pbmZvLWJ0biB7DQogICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCn0NCg0KICAgIC5pbmZvLWJ0bjpob3ZlciB7DQogICAgICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICB9DQoNCg0KDQoub2UtYnRuLXdyYXBwZXIgew0KICAgIG1hcmdpbjogMCAxMHB4Ow0KICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7DQp9DQoNCiAgICAub2UtYnRuLXdyYXBwZXIgLm9lLWJ0biB7DQogICAgICAgIG1hcmdpbjogMCAxMHB4Ow0KICAgIH0NCg0KICAgIC5vZS1idG4td3JhcHBlci5zdW1tYXJ5IHsNCiAgICAgICAgd2lkdGg6IDE0MHB4Ow0KICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgICAgIHJpZ2h0OiA2cHg7DQogICAgICAgIHRvcDogNXB4Ow0KICAgIH0NCg0KICAgICAgICAub2UtYnRuLXdyYXBwZXIuc3VtbWFyeTpob3ZlciB7DQogICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5vZS1idG4td3JhcHBlci5zdW1tYXJ5OmJlZm9yZSB7DQogICAgICAgICAgICBjb250ZW50OiAiIjsNCiAgICAgICAgICAgIHdpZHRoOiAzMHB4Ow0KICAgICAgICAgICAgaGVpZ2h0OiAzMHB4Ow0KICAgICAgICAgICAgYmFja2dyb3VuZDogdXJsKCIvUmVzb3VyY2VzL0ltYWdlcy9JY29ucy9sb2cucG5nIik7DQogICAgICAgICAgICB0b3A6IDBweDsNCiAgICAgICAgICAgIGxlZnQ6IDVweDsNCiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICAgICAgfQ0KDQogICAgICAgIC5vZS1idG4td3JhcHBlci5zdW1tYXJ5IC5vZS1idG4gew0KICAgICAgICAgICAgYmFja2dyb3VuZDogI2MzNDUwMDsNCiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTsNCiAgICAgICAgfQ0KDQoub2UtYnJhbmQgew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBsZWZ0OiAxMXB4Ow0KICAgIHRvcDogN3B4Ow0KfQ0KDQpmaWVsZHNldCB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGJvcmRlcjogc29saWQgMXB4ICM4MDgwODA7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIG1hcmdpbjogMjBweCAyMHB4IDAgMjBweDsNCn0NCg0KbGVnZW5kIHsNCiAgICBwYWRkaW5nOiAxNXB4Ow0KfQ0KDQojcHJvZHVjdGlvbi10YXJnZXRzew0KICAgIG1hcmdpbi10b3A6IDEwcHg7DQp9DQoNCiNsb2NhdGlvbi1tYXAgew0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDEwMCU7DQp9DQoNCiNtYXAtc2VjdGlvbiB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KDQojbG9jYXRpb24td3JhcHBlciB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KDQojYWRkLWxvY2F0aW9uIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAwOw0KICAgIGxlZnQ6IDA7DQogICAgcmlnaHQ6IDA7DQogICAgYm90dG9tOiAwOw0KICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsNCiAgICB6LWluZGV4OiAxOTAwMDsNCn0NCg0KI2FkZC1sb2NhdGlvbi1tc2cgew0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICBtYXgtd2lkdGg6IDM1MHB4Ow0KICAgIHRvcDogNTAlOw0KICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTsNCiAgICBtYXJnaW46IGF1dG87DQp9DQoNCi5zbGlkZXItd3JhcHBlciB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICBwYWRkaW5nOiAxMHB4Ow0KICAgIG1heC13aWR0aDogMjQ1cHg7DQogICAgbWFyZ2luOiAtMTBweCBhdXRvIC0xNXB4Ow0KfQ0KDQouc2xpZGVyLXRleHQtaW5wdXQtZGl2IHsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIHdpZHRoOjYwJTsNCn0NCiAgICAuc2xpZGVyLXRleHQtaW5wdXQtZGl2OjpiZWZvcmUgew0KICAgICAgICBjb250ZW50OiAnJzsNCiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdSZXNvdXJjZXMvSW1hZ2VzL0ljb25zL2ZpbGUtZWRpdC0xNi5wbmcnKTsNCiAgICAgICAgd2lkdGg6IDE2cHg7DQogICAgICAgIGhlaWdodDogMTZweDsNCiAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgICAgIGxlZnQ6MzBweDsNCiAgICAgICAgdG9wOjVweDsNCiAgICB9DQoNCiAgICAgICAgLnNsaWRlci10ZXh0LWlucHV0LWRpdjo6YWZ0ZXIgew0KICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtdmFsdWUpOw0KICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgICAgIHRvcDogNXB4Ow0KICAgICAgICBmb250LXdlaWdodDogYm9sZDsNCiAgICAgICAgcmlnaHQ6IC0yNXB4Ow0KICAgICAgICBwYWRkaW5nLWxlZnQ6M3B4Ow0KICAgICAgICB3aWR0aDogMzBweDsNCiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4wNXMgZWFzZS1pbi1vdXQ7DQogICAgICAgIGNvbG9yOiByZ2JhKDU5LCAxMTEsIDE0MiwgMC43MCk7DQoNCiAgICB9DQoNCi5zbGlkZXItdmFsdWUgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50Ow0KICAgIC8qYm9yZGVyOiAxcHggZG90dGVkIHJnYmEoMjA0LCAyMDQsIDIwNCwgMC45NSkgIWltcG9ydGFudDsqLw0KICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogNnB4ICFpbXBvcnRhbnQ7DQogICAgbWFyZ2luLWJvdHRvbTogNXB4Ow0KICAgIGNvbG9yOiAjM2I2ZjhlOw0KICAgIHBhZGRpbmctcmlnaHQ6OHB4Ow0KICAgIC8qdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsqLw0KfQ0KLnNsaWRlci12YWx1ZTpob3ZlcnsNCiAgICBjdXJzb3I6cG9pbnRlcjsNCn0NCg0KLmstc2xpZGVyLXNlbGVjdGlvbiwgLmstc3RhdGUtc2VsZWN0ZWQsIC5rLWRyYWdoYW5kbGUgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzYzZmOGUgIWltcG9ydGFudDsNCiAgICBib3JkZXItY29sb3I6ICMzYzZmOGUgIWltcG9ydGFudDsNCiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IDFweCAjM2M2ZjhlICFpbXBvcnRhbnQ7DQp9DQoNCiAgICAuay1kcmFnaGFuZGxlOmhvdmVyLCAuay1kcmFnaGFuZGxlOnZpc2l0ZWQgew0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M2ZjhlICFpbXBvcnRhbnQ7DQogICAgfQ0KDQoua3RiLXRoZW1lLWlkLWRlZmF1bHR7b3BhY2l0eTowfS5rdGItdmFyLWFjY2VudHtjb2xvcjojZjM1ODAwfS5rdGItdmFyLWJhc2V7Y29sb3I6I2U5ZTllOX0ua3RiLXZhci1iYWNrZ3JvdW5ke2NvbG9yOiNmZmZ9Lmt0Yi12YXItYm9yZGVyLXJhZGl1c3tib3JkZXItcmFkaXVzOjRweH0ua3RiLXZhci1ub3JtYWwtYmFja2dyb3VuZHtjb2xvcjojZmZmfS5rdGItdmFyLW5vcm1hbC1ncmFkaWVudHtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjYpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC42KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpfS5rdGItdmFyLW5vcm1hbC10ZXh0LWNvbG9ye2NvbG9yOiMyZTJlMmV9Lmt0Yi12YXItaG92ZXItYmFja2dyb3VuZHtjb2xvcjojYmNiNGIwfS5rdGItdmFyLWhvdmVyLWdyYWRpZW50e2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuNCkpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjQpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSl9Lmt0Yi12YXItaG92ZXItdGV4dC1jb2xvcntjb2xvcjojMmUyZTJlfS5rdGItdmFyLXNlbGVjdGVkLWJhY2tncm91bmR7Y29sb3I6I2YzNTgwMH0ua3RiLXZhci1zZWxlY3RlZC1ncmFkaWVudHtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjIpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuMikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpfS5rdGItdmFyLXNlbGVjdGVkLXRleHQtY29sb3J7Y29sb3I6I2ZmZn0ua3RiLXZhci1lcnJvcntjb2xvcjojZmZlMGQ5fS5rdGItdmFyLXdhcm5pbmd7Y29sb3I6I2ZmZTc5ZX0ua3RiLXZhci1zdWNjZXNze2NvbG9yOiNlYWY3ZWN9Lmt0Yi12YXItaW5mb3tjb2xvcjojZTVmNWZhfS5rdGItdmFyLXNlcmllcy1he2NvbG9yOiNmZjY4MDB9Lmt0Yi12YXItc2VyaWVzLWJ7Y29sb3I6I2EwYTcwMH0ua3RiLXZhci1zZXJpZXMtY3tjb2xvcjojZmY4ZDAwfS5rdGItdmFyLXNlcmllcy1ke2NvbG9yOiM2Nzg5MDB9Lmt0Yi12YXItc2VyaWVzLWV7Y29sb3I6I2ZmYjUzY30ua3RiLXZhci1zZXJpZXMtZntjb2xvcjojMzk2MDAwfS5rLWdyaWQtbm9yZWNvcmRzLXRlbXBsYXRle2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNkNWQ1ZDV9LmstaW4sLmstaXRlbSwuay13aW5kb3ctYWN0aW9ue2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0uay1ibG9jaywuay13aWRnZXR7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5rLWJsb2NrLC5rLXdpZGdldCwuay1pbnB1dCwuay10ZXh0Ym94LC5rLWdyb3VwLC5rLWNvbnRlbnQsLmstaGVhZGVyLC5rLWZpbHRlci1yb3c+dGgsLmstZWRpdGFibGUtYXJlYSwuay1zZXBhcmF0b3IsLmstY29sb3JwaWNrZXIgLmstaS1hcnJvdy1zLC5rLXRleHRib3g+aW5wdXQsLmstYXV0b2NvbXBsZXRlLC5rLWRyb3Bkb3duLXdyYXAsLmstdG9vbGJhciwuay1ncm91cC1mb290ZXIgdGQsLmstZ3JpZC1mb290ZXIsLmstZm9vdGVyLXRlbXBsYXRlIHRkLC5rLXN0YXRlLWRlZmF1bHQsLmstc3RhdGUtZGVmYXVsdCAuay1zZWxlY3QsLmstc3RhdGUtZGlzYWJsZWQsLmstZ3JpZC1oZWFkZXIsLmstZ3JpZC1oZWFkZXItd3JhcCwuay1ncmlkLWhlYWRlci1sb2NrZWQsLmstZ3JpZC1mb290ZXItbG9ja2VkLC5rLWdyaWQtY29udGVudC1sb2NrZWQsLmstZ3JpZCB0ZCwuay1ncmlkIHRkLmstc3RhdGUtc2VsZWN0ZWQsLmstZ3JpZC1mb290ZXItd3JhcCwuay1wYWdlci13cmFwLC5rLXBhZ2VyLXdyYXAgLmstbGluaywuay1wYWdlci1yZWZyZXNoLC5rLWdyb3VwaW5nLWhlYWRlciwuay1ncm91cGluZy1oZWFkZXIgLmstZ3JvdXAtaW5kaWNhdG9yLC5rLXBhbmVsYmFyPi5rLWl0ZW0+LmstbGluaywuay1wYW5lbD4uay1pdGVtPi5rLWxpbmssLmstcGFuZWxiYXIgLmstcGFuZWwsLmstcGFuZWxiYXIgLmstY29udGVudCwuay10cmVlbWFwLXRpbGUsLmstY2FsZW5kYXIgdGgsLmstc2xpZGVyLXRyYWNrLC5rLXNwbGl0YmFyLC5rLWRyb3B6b25lLWFjdGl2ZSwuay10aWxlcywuay10b29sYmFyLC5rLXRvb2x0aXAsLmstYnV0dG9uLWdyb3VwIC5rLXRvb2wsLmstdXBsb2FkLWZpbGVze2JvcmRlci1jb2xvcjojZDVkNWQ1fS5rLWdyb3VwLC5rLXRvb2xiYXIsLmstZ3JvdXBpbmctaGVhZGVyLC5rLXBhZ2VyLXdyYXAsLmstZ3JvdXAtZm9vdGVyIHRkLC5rLWdyaWQtZm9vdGVyLC5rLWZvb3Rlci10ZW1wbGF0ZSB0ZCwuay13aWRnZXQgLmstc3RhdHVzLC5rLWNhbGVuZGFyIHRoLC5rLWRyb3B6b25lLWhvdmVyZWQsLmstd2lkZ2V0LmstcG9wdXB7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1fS5rLWdyb3VwaW5nLXJvdyB0ZCx0ZC5rLWdyb3VwLWNlbGwsLmstcmVzaXplLWhhbmRsZS1pbm5lcntiYWNrZ3JvdW5kLWNvbG9yOiNlYWU4ZTh9LmstbGlzdC1jb250YWluZXJ7Ym9yZGVyLWNvbG9yOiNjNWM1YzU7YmFja2dyb3VuZC1jb2xvcjojZTllOWU5fS5rLWNvbnRlbnQsLmstZWRpdGFibGUtYXJlYSwuay1wYW5lbGJhcj5saS5rLWl0ZW0sLmstcGFuZWw+bGkuay1pdGVtLC5rLXRpbGVze2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1hbHQsLmstc2VwYXJhdG9yLC5rLXJlc291cmNlLmstYWx0LC5rLXBpdm90LWxheW91dD50Ym9keT50cjpmaXJzdC1jaGlsZD50ZDpmaXJzdC1jaGlsZHtiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjF9LmstcGl2b3Qtcm93aGVhZGVycyAuay1hbHQgLmstYWx0LC5rLWhlYWRlci5rLWFsdHtiYWNrZ3JvdW5kLWNvbG9yOiNkY2RjZGN9LmstdGV4dGJveCwuay1hdXRvY29tcGxldGUuay1oZWFkZXIsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWFjdGl2ZSwuay1waWNrZXItd3JhcC5rLXN0YXRlLWFjdGl2ZSwuay1udW1lcmljLXdyYXAuay1zdGF0ZS1hY3RpdmV7Ym9yZGVyLWNvbG9yOiNkNWQ1ZDU7YmFja2dyb3VuZC1jb2xvcjojZTllOWU5fS5rLXRleHRib3g+aW5wdXQsLmstYXV0b2NvbXBsZXRlIC5rLWlucHV0LC5rLWRyb3Bkb3duLXdyYXAgLmstaW5wdXQsLmstYXV0b2NvbXBsZXRlLmstc3RhdGUtZm9jdXNlZCAuay1pbnB1dCwuay1kcm9wZG93bi13cmFwLmstc3RhdGUtZm9jdXNlZCAuay1pbnB1dCwuay1waWNrZXItd3JhcC5rLXN0YXRlLWZvY3VzZWQgLmstaW5wdXQsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtZm9jdXNlZCAuay1pbnB1dHtib3JkZXItY29sb3I6I2Q1ZDVkNX1pbnB1dC5rLXRleHRib3gsdGV4dGFyZWEuay10ZXh0Ym94LGlucHV0LmstdGV4dGJveDpob3Zlcix0ZXh0YXJlYS5rLXRleHRib3g6aG92ZXIsLmstdGV4dGJveD5pbnB1dHtiYWNrZ3JvdW5kOjB9LmstaW5wdXQsaW5wdXQuay10ZXh0Ym94LHRleHRhcmVhLmstdGV4dGJveCxpbnB1dC5rLXRleHRib3g6aG92ZXIsdGV4dGFyZWEuay10ZXh0Ym94OmhvdmVyLC5rLXRleHRib3g+aW5wdXQsLmstbXVsdGlzZWxlY3Qtd3JhcHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6IzJlMmUyZX0uay1pbnB1dFtyZWFkb25seV17YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiMyZTJlMmV9LmstYmxvY2ssLmstd2lkZ2V0LC5rLXBvcHVwLC5rLWNvbnRlbnQsLmstdG9vbGJhciwuay1kcm9wZG93biAuay1pbnB1dHtjb2xvcjojMmUyZTJlfS5rLWludmVyc2V7Y29sb3I6I2ZmZn0uay1ibG9ja3tjb2xvcjojMzEzMTMxfS5rLWxpbms6bGluaywuay1saW5rOnZpc2l0ZWQsLmstbmF2LWN1cnJlbnQuay1zdGF0ZS1ob3ZlciAuay1saW5re2NvbG9yOiMyZTJlMmV9LmstdGFic3RyaXAtaXRlbXMgLmstbGluaywuay1wYW5lbGJhcj5saT4uay1saW5re2NvbG9yOiMyZTJlMmV9LmstaGVhZGVyLC5rLXRyZWVtYXAtdGl0bGUsLmstZ3JpZC1oZWFkZXIgLmstaGVhZGVyPi5rLWxpbmt7Y29sb3I6IzMxMzEzMX0uay1oZWFkZXIsLmstZ3JpZC1oZWFkZXIsLmstdG9vbGJhciwuay1kcm9wZG93bi13cmFwLC5rLXBpY2tlci13cmFwLC5rLW51bWVyaWMtd3JhcCwuay1ncm91cGluZy1oZWFkZXIsLmstcGFnZXItd3JhcCwuay10ZXh0Ym94LC5rLWJ1dHRvbiwuay1wcm9ncmVzc2Jhciwuay1kcmFnaGFuZGxlLC5rLWF1dG9jb21wbGV0ZSwuay1zdGF0ZS1oaWdobGlnaHQsLmstdGFic3RyaXAtaXRlbXMgLmstaXRlbSwuay1wYW5lbGJhciAuay10YWJzdHJpcC1pdGVtcyAuay1pdGVtLC5rbS1wYW5lLXdyYXBwZXI+LmttLXBhbmU+LmttLXZpZXc+LmttLWNvbnRlbnR7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ3RleHR1cmVzL2hpZ2hsaWdodC5wbmcnKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDI1NSwyNTUsMjU1LC42KSksdG8ocmdiYSgyNTUsMjU1LDI1NSwuMCkpKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjYpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpub25lLGxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCU7YmFja2dyb3VuZC1jb2xvcjojZWFlOGU4fS5rLWJsb2NrLC5rLWhlYWRlciwuay1ncmlkLWhlYWRlciwuay10b29sYmFyLC5rLWdyb3VwaW5nLWhlYWRlciwuay1wYWdlci13cmFwLC5rLWJ1dHRvbiwuay1kcmFnaGFuZGxlLC5rLXRyZWVtYXAtdGlsZSxodG1sIC5rbS1wYW5lLXdyYXBwZXIgLmstaGVhZGVye2JhY2tncm91bmQtY29sb3I6I2VhZThlOH0uay1pY29uOmhvdmVyLC5rLXN0YXRlLWhvdmVyIC5rLWljb24sLmstc3RhdGUtc2VsZWN0ZWQgLmstaWNvbiwuay1zdGF0ZS1mb2N1c2VkIC5rLWljb24sLmstY29sdW1uLW1lbnUgLmstc3RhdGUtaG92ZXIgLmstc3ByaXRlLC5rLWNvbHVtbi1tZW51IC5rLXN0YXRlLWFjdGl2ZSAuay1zcHJpdGUsLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazpob3ZlcjphZnRlciwuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldy5rLXN0YXRlLWhvdmVyPi5rLWxpbms6YWZ0ZXJ7b3BhY2l0eToxfS5rLWljb24sLmstc3RhdGUtZGlzYWJsZWQgLmstaWNvbiwuay1jb2x1bW4tbWVudSAuay1zcHJpdGUsLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazphZnRlciwuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldz4uay1saW5rOmFmdGVye29wYWNpdHk6Ljl9LmstbW9iaWxlLWxpc3QgLmstY2hlY2s6Y2hlY2tlZCwuay1tb2JpbGUtbGlzdCAuay1lZGl0LWZpZWxkIFt0eXBlPWNoZWNrYm94XTpjaGVja2VkLC5rLW1vYmlsZS1saXN0IC5rLWVkaXQtZmllbGQgW3R5cGU9cmFkaW9dOmNoZWNrZWR7b3BhY2l0eTouOX0uay10b29se2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0uay1pY29uLC5rLXRvb2wtaWNvbiwuay1ncm91cGluZy1kcm9wY2x1ZSwuay1kcm9wLWhpbnQsLmstY29sdW1uLW1lbnUgLmstc3ByaXRlLC5rLWdyaWQtbW9iaWxlIC5rLXJlc2l6ZS1oYW5kbGUtaW5uZXI6YmVmb3JlLC5rLWdyaWQtbW9iaWxlIC5rLXJlc2l6ZS1oYW5kbGUtaW5uZXI6YWZ0ZXIsLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazphZnRlciwuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldz4uay1saW5rOmFmdGVyLC5rLWdhbnR0LXZpZXdzPi5rLWN1cnJlbnQtdmlldz4uay1saW5rOmFmdGVye2JhY2tncm91bmQtaW1hZ2U6dXJsKCdSZXNvdXJjZXMvSW1hZ2VzL3Nwcml0ZS5wbmcnKTtib3JkZXItY29sb3I6dHJhbnNwYXJlbnR9LmstbW9iaWxlLWxpc3QgLmstY2hlY2s6Y2hlY2tlZCwuay1tb2JpbGUtbGlzdCAuay1lZGl0LWZpZWxkIFt0eXBlPWNoZWNrYm94XTpjaGVja2VkLC5rLW1vYmlsZS1saXN0IC5rLWVkaXQtZmllbGQgW3R5cGU9cmFkaW9dOmNoZWNrZWR7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ1Jlc291cmNlcy9JbWFnZXMvc3ByaXRlLnBuZycpO2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0uay1sb2FkaW5nLC5rLXN0YXRlLWhvdmVyIC5rLWxvYWRpbmd7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ0RlZmF1bHQvbG9hZGluZy5naWYnKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCV9LmstbG9hZGluZy1pbWFnZXtiYWNrZ3JvdW5kLWltYWdlOnVybCgnRGVmYXVsdC9sb2FkaW5nLWltYWdlLmdpZicpfS5rLWxvYWRpbmctY29sb3J7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5rLWJ1dHRvbntjb2xvcjojMmUyZTJlO2JvcmRlci1jb2xvcjojYzVjNWM1O2JhY2tncm91bmQtY29sb3I6I2U5ZTllOX0uay1kcmFnaGFuZGxle2JvcmRlci1jb2xvcjojYTBkYmE5O2JhY2tncm91bmQtY29sb3I6I2ZmZjstd2Via2l0LWJveC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9LmstZHJhZ2hhbmRsZTpob3Zlcntib3JkZXItY29sb3I6Izk1ZDc5ZjtiYWNrZ3JvdW5kLWNvbG9yOiNiYmI0YjE7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXNjaGVkdWxlcntjb2xvcjojMmUyZTJlO2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1zY2hlZHVsZXItbGF5b3V0e2NvbG9yOiMyZTJlMmV9Lmstc2NoZWR1bGVyLWRhdGVjb2x1bW4sLmstc2NoZWR1bGVyLWdyb3VwY29sdW1ue2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMmUyZTJlfS5rLXNjaGVkdWxlci10aW1lcyB0ciwuay1zY2hlZHVsZXItdGltZXMgdGgsLmstc2NoZWR1bGVyLXRhYmxlIHRkLC5rLXNjaGVkdWxlci1oZWFkZXIgdGgsLmstc2NoZWR1bGVyLWhlYWRlci13cmFwLC5rLXNjaGVkdWxlci10aW1lc3tib3JkZXItY29sb3I6I2M1YzVjNX0uay1ub253b3JrLWhvdXJ7YmFja2dyb3VuZC1jb2xvcjojZjFmMWYxfS5rLWdhbnR0IC5rLW5vbndvcmstaG91cntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjMzLDIzMywyMzMsMC4yKX0uay1nYW50dCAuay1oZWFkZXIuay1ub253b3JrLWhvdXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIzMywyMzMsMjMzLDAuMTUpfS5rLXNjaGVkdWxlci10YWJsZSAuay10b2RheSwuay10b2RheT4uay1zY2hlZHVsZXItZGF0ZWNvbHVtbiwuay10b2RheT4uay1zY2hlZHVsZXItZ3JvdXBjb2x1bW57YmFja2dyb3VuZC1jb2xvcjojZjhmOGY4fS5rLXNjaGVkdWxlci1ub3ctYXJyb3d7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmNjc0NX0uay1zY2hlZHVsZXItbm93LWxpbmV7YmFja2dyb3VuZC1jb2xvcjojZmY2NzQ1fS5rLWV2ZW50LC5rLXRhc2stY29tcGxldGV7Ym9yZGVyLWNvbG9yOiNmZmMwOWM7YmFja2dyb3VuZDojZmZjMDljIDAgLTI1N3B4IHVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpIHJlcGVhdC14O2NvbG9yOiMyZTJlMmV9LmstZXZlbnQtaW52ZXJzZXtjb2xvcjojZmZmfS5rLWV2ZW50Lmstc3RhdGUtc2VsZWN0ZWR7YmFja2dyb3VuZC1wb3NpdGlvbjowIDA7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAwIDJweCAjMmUyZTJlO2JveC1zaGFkb3c6MCAwIDAgMnB4ICMyZTJlMmV9LmstZXZlbnQgLmstcmVzaXplLWhhbmRsZTphZnRlciwuay10YXNrLXNpbmdsZSAuay1yZXNpemUtaGFuZGxlOmFmdGVye2JhY2tncm91bmQtY29sb3I6Izc4Nzg3OH0uay1zY2hlZHVsZXItbWFycXVlZTpiZWZvcmUsLmstc2NoZWR1bGVyLW1hcnF1ZWU6YWZ0ZXJ7Ym9yZGVyLWNvbG9yOiNmMzU4MDB9LmstcGFuZWxiYXIgLmstY29udGVudCwuay1wYW5lbGJhciAuay1wYW5lbCwuay1wYW5lbGJhciAuay1pdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMmUyZTJlO2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLXBhbmVsYmFyPmxpPi5rLWxpbmt7Y29sb3I6IzJlMmUyZX0uay1wYW5lbGJhcj4uay1pdGVtPi5rLWxpbmt7Ym9yZGVyLWNvbG9yOiNjNWM1YzV9LmstcGFuZWw+bGkuay1pdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1zdGF0ZS1hY3RpdmUsLmstc3RhdGUtYWN0aXZlOmhvdmVyLC5rLWFjdGl2ZS1maWx0ZXIsLmstdGFic3RyaXAgLmstc3RhdGUtYWN0aXZle2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItY29sb3I6IzlmOWY5Zjtjb2xvcjojMzEzMTMxfS5rLWZpZWxkc2VsZWN0b3IgLmstbGlzdC1jb250YWluZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5rLWJ1dHRvbjpmb2N1cywuay1idXR0b24uay1zdGF0ZS1mb2N1c2Vke2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLWJ1dHRvbjpob3Zlciwuay1idXR0b24uay1zdGF0ZS1ob3Zlcntjb2xvcjojMmUyZTJlO2JvcmRlci1jb2xvcjojYjZiNmI2O2JhY2tncm91bmQtY29sb3I6I2JjYjRiMH0uay1idXR0b246YWN0aXZlLC5rLWJ1dHRvbi5rLXN0YXRlLWFjdGl2ZXtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6I2YzNTgwMDtib3JkZXItY29sb3I6I2Y4NWEwMH0uay1idXR0b246YWN0aXZlOmhvdmVyLC5rLWJ1dHRvbi5rLXN0YXRlLWFjdGl2ZTpob3Zlcntjb2xvcjojZmZmO2JvcmRlci1jb2xvcjojOGQ4MDc5O2JhY2tncm91bmQtY29sb3I6I2ZmNWUwM30uay1idXR0b25bZGlzYWJsZWRdLC5rLWJ1dHRvbi5rLXN0YXRlLWRpc2FibGVkLC5rLXN0YXRlLWRpc2FibGVkIC5rLWJ1dHRvbiwuay1zdGF0ZS1kaXNhYmxlZCAuay1idXR0b246aG92ZXIsLmstYnV0dG9uLmstc3RhdGUtZGlzYWJsZWQ6aG92ZXIsLmstc3RhdGUtZGlzYWJsZWQgLmstYnV0dG9uOmFjdGl2ZSwuay1idXR0b24uay1zdGF0ZS1kaXNhYmxlZDphY3RpdmV7Y29sb3I6IzlmOWY5Zjtib3JkZXItY29sb3I6I2M1YzVjNTtiYWNrZ3JvdW5kLWNvbG9yOiNlOWU5ZTk7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ3RleHR1cmVzL2hpZ2hsaWdodC5wbmcnKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDI1NSwyNTUsMjU1LC42KSksdG8ocmdiYSgyNTUsMjU1LDI1NSwuMCkpKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjYpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpub25lLGxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKX0uay1idXR0b246Zm9jdXM6bm90KC5rLXN0YXRlLWRpc2FibGVkKTpub3QoW2Rpc2FibGVkXSl7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAzcHggMXB4ICNiNmI2YjY7Ym94LXNoYWRvdzppbnNldCAwIDAgM3B4IDFweCAjYjZiNmI2fS5rLWJ1dHRvbjpmb2N1czphY3RpdmU6bm90KC5rLXN0YXRlLWRpc2FibGVkKTpub3QoW2Rpc2FibGVkXSl7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAzcHggMXB4ICNjNTQ3MDA7Ym94LXNoYWRvdzppbnNldCAwIDAgM3B4IDFweCAjYzU0NzAwfS5rLW1lbnUgLmstc3RhdGUtaG92ZXI+Lmstc3RhdGUtYWN0aXZle2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lmstc3RhdGUtaGlnaGxpZ2h0e2JhY2tncm91bmQ6I2ZmZjtjb2xvcjojMzEzMTMxfS5rLXN0YXRlLWZvY3VzZWQsLmstZ3JvdXBpbmctcm93IC5rLXN0YXRlLWZvY3VzZWR7Ym9yZGVyLWNvbG9yOiM5NWQ3OWZ9LmstY2FsZW5kYXIgLmstbGlua3tjb2xvcjojMmUyZTJlfS5rLWNhbGVuZGFyIC5rLWZvb3RlcntwYWRkaW5nOjB9LmstY2FsZW5kYXIgLmstZm9vdGVyIC5rLW5hdi10b2RheXtjb2xvcjojMmUyZTJlO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1jYWxlbmRhciAuay1mb290ZXIgLmstbmF2LXRvZGF5OmhvdmVyLC5rLWNhbGVuZGFyIC5rLWZvb3RlciAuay1uYXYtdG9kYXkuay1zdGF0ZS1ob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0uay1jYWxlbmRhciAuay1mb290ZXIgLmstbmF2LXRvZGF5OmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmstY2FsZW5kYXIgLmstbGluay5rLW5hdi1mYXN0e2NvbG9yOiMyZTJlMmV9LmstY2FsZW5kYXIgLmstbmF2LWZhc3Quay1zdGF0ZS1ob3Zlcnt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNiY2I0YjA7Y29sb3I6IzJlMmUyZX0uay1jYWxlbmRhciAuay1saW5rLmstc3RhdGUtaG92ZXIsLmstd2luZG93LXRpdGxlYmFyIC5rLWxpbmt7Ym9yZGVyLXJhZGl1czo0cHh9LmstY2FsZW5kYXIgLmstZm9vdGVyIC5rLWxpbmt7Ym9yZGVyLXJhZGl1czowfS5rLWNhbGVuZGFyIHRoe2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNX0uay1jYWxlbmRhci1jb250YWluZXIuay1ncm91cHtib3JkZXItY29sb3I6I2M1YzVjNX0uay1zdGF0ZS1zZWxlY3RlZCwuay1zdGF0ZS1zZWxlY3RlZDpsaW5rLC5rLXN0YXRlLXNlbGVjdGVkOnZpc2l0ZWQsLmstbGlzdD4uay1zdGF0ZS1zZWxlY3RlZCwuay1saXN0Pi5rLXN0YXRlLWhpZ2hsaWdodCwuay1wYW5lbD4uay1zdGF0ZS1zZWxlY3RlZCwuay1naG9zdC1zcGxpdGJhci12ZXJ0aWNhbCwuay1naG9zdC1zcGxpdGJhci1ob3Jpem9udGFsLC5rLWRyYWdoYW5kbGUuay1zdGF0ZS1zZWxlY3RlZDpob3Zlciwuay1zY2hlZHVsZXIgLmstc2NoZWR1bGVyLXRvb2xiYXIgLmstc3RhdGUtc2VsZWN0ZWQsLmstc2NoZWR1bGVyIC5rLXRvZGF5Lmstc3RhdGUtc2VsZWN0ZWQsLmstbWFycXVlZS1jb2xvcntjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6I2YzNTgwMDtib3JkZXItY29sb3I6I2Y4NWEwMH0uay12aXJ0dWFsLWl0ZW0uay1maXJzdCwuay1ncm91cC1oZWFkZXIrLmstbGlzdD4uay1pdGVtLmstZmlyc3QsLmstc3RhdGljLWhlYWRlcisuay1saXN0Pi5rLWl0ZW0uay1maXJzdHtib3JkZXItdG9wLWNvbG9yOiNiNmI2YjZ9LmstcG9wdXA+LmstZ3JvdXAtaGVhZGVyLC5rLXBvcHVwPi5rLXZpcnR1YWwtd3JhcD4uay1ncm91cC1oZWFkZXJ7YmFja2dyb3VuZDojYjZiNmI2O2NvbG9yOiNmZmZ9LmstcG9wdXAgLmstbGlzdCAuay1pdGVtPi5rLWdyb3Vwe2JhY2tncm91bmQ6I2I2YjZiNjtjb2xvcjojZmZmO2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6M3B4fS5rLXBvcHVwIC5rLXRyZWV2aWV3IC5rLWl0ZW0+LmstZ3JvdXB7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjojMmUyZTJlfS5rLW1hcnF1ZWUtdGV4dHtjb2xvcjojZmZmfS5rLXN0YXRlLWZvY3VzZWQsLmstbGlzdD4uay1zdGF0ZS1mb2N1c2VkLC5rLWxpc3R2aWV3Pi5rLXN0YXRlLWZvY3VzZWQsLmstZ3JpZC1oZWFkZXIgdGguay1zdGF0ZS1mb2N1c2VkLHRkLmstc3RhdGUtZm9jdXNlZCwuay1idXR0b24uay1zdGF0ZS1mb2N1c2Vkey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDAgM3B4IDFweCAjYjZiNmI2O2JveC1zaGFkb3c6aW5zZXQgMCAwIDNweCAxcHggI2I2YjZiNn0uay1zdGF0ZS1mb2N1c2VkLmstc3RhdGUtc2VsZWN0ZWQsLmstbGlzdD4uay1zdGF0ZS1mb2N1c2VkLmstc3RhdGUtc2VsZWN0ZWQsLmstbGlzdHZpZXc+Lmstc3RhdGUtZm9jdXNlZC5rLXN0YXRlLXNlbGVjdGVkLHRkLmstc3RhdGUtZm9jdXNlZC5rLXN0YXRlLXNlbGVjdGVkey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDAgM3B4IDFweCAjYzU0NzAwO2JveC1zaGFkb3c6aW5zZXQgMCAwIDNweCAxcHggI2M1NDcwMH0uay1pZTggLmstcGFuZWxiYXIgc3Bhbi5rLXN0YXRlLWZvY3VzZWQsLmstaWU4IC5rLW1lbnUgbGkuay1zdGF0ZS1mb2N1c2VkLC5rLWllOCAuay1saXN0dmlldz4uay1zdGF0ZS1mb2N1c2VkLC5rLWllOCAuay1ncmlkLWhlYWRlciB0aC5rLXN0YXRlLWZvY3VzZWQsLmstaWU4IHRkLmstc3RhdGUtZm9jdXNlZCwuay1pZTggLmstdG9vbC5rLXN0YXRlLWhvdmVyLC5rLWllOCAuay1idXR0b246Zm9jdXMsLmstaWU4IC5rLWJ1dHRvbi5rLXN0YXRlLWZvY3VzZWR7YmFja2dyb3VuZC1jb2xvcjojYmNiNGIwfS5rLWxpc3Q+Lmstc3RhdGUtc2VsZWN0ZWQuay1zdGF0ZS1mb2N1c2VkLC5rLWxpc3Qtb3B0aW9ubGFiZWwuay1zdGF0ZS1zZWxlY3RlZC5rLXN0YXRlLWZvY3VzZWR7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXN0YXRlLXNlbGVjdGVkPi5rLWxpbmssLmstcGFuZWxiYXI+bGk+Lmstc3RhdGUtc2VsZWN0ZWQsLmstcGFuZWxiYXI+bGkuay1zdGF0ZS1kZWZhdWx0Pi5rLWxpbmsuay1zdGF0ZS1zZWxlY3RlZHtjb2xvcjojZmZmfS5rLXN0YXRlLWhvdmVyLC5rLXN0YXRlLWhvdmVyOmhvdmVyLC5rLXNwbGl0YmFyLWhvcml6b250YWwtaG92ZXI6aG92ZXIsLmstc3BsaXRiYXItdmVydGljYWwtaG92ZXI6aG92ZXIsLmstbGlzdD4uay1zdGF0ZS1ob3Zlciwuay1zY2hlZHVsZXIgLmstc2NoZWR1bGVyLXRvb2xiYXIgdWwgbGkuay1zdGF0ZS1ob3Zlciwuay1wYWdlci13cmFwIC5rLWxpbms6aG92ZXIsLmstZHJvcGRvd24gLmstc3RhdGUtZm9jdXNlZCwuay1maWxlYnJvd3Nlci1kcm9wem9uZSwuay1tb2JpbGUtbGlzdCAuay1pdGVtPi5rLWxpbms6YWN0aXZlLC5rLW1vYmlsZS1saXN0IC5rLWl0ZW0+LmstbGFiZWw6YWN0aXZlLC5rLW1vYmlsZS1saXN0IC5rLWVkaXQtbGFiZWwuay1jaGVjazphY3RpdmUsLmstbW9iaWxlLWxpc3QgLmstcmVjdXItdmlldyAuay1jaGVjazphY3RpdmV7Y29sb3I6IzJlMmUyZTtiYWNrZ3JvdW5kLWNvbG9yOiNiY2I0YjA7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstbW9iaWxlLWxpc3QgLmstc2NoZWR1bGVyLXRpbWV6b25lcyAuay1lZGl0LWZpZWxkOm50aC1jaGlsZCgyKTphY3RpdmV7Y29sb3I6IzJlMmUyZTtiYWNrZ3JvdW5kLWNvbG9yOiNiY2I0YjA7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstaWU4IC5rLXdpbmRvdy10aXRsZWJhciAuay1zdGF0ZS1ob3Zlcntib3JkZXItY29sb3I6I2I2YjZiNn0uay1zdGF0ZS1ob3Zlcj4uay1zZWxlY3QsLmstc3RhdGUtZm9jdXNlZD4uay1zZWxlY3R7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstYnV0dG9uOmhvdmVyLC5rLWJ1dHRvbi5rLXN0YXRlLWhvdmVyLC5rLWJ1dHRvbjpmb2N1cywuay1idXR0b24uay1zdGF0ZS1mb2N1c2VkLC5rLXRleHRib3g6aG92ZXIsLmstc3RhdGUtaG92ZXIsLmstc3RhdGUtaG92ZXI6aG92ZXIsLmstcGFnZXItd3JhcCAuay1saW5rOmhvdmVyLC5rLW90aGVyLW1vbnRoLmstc3RhdGUtaG92ZXIgLmstbGluayxkaXYuay1maWxlYnJvd3Nlci1kcm9wem9uZSBlbSwuay1kcmFnaGFuZGxlOmhvdmVye2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuNCkpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjQpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSl9LmstcGFnZXItd3JhcHtiYWNrZ3JvdW5kLWNvbG9yOiNlYWU4ZTg7Y29sb3I6IzMxMzEzMX0uay1hdXRvY29tcGxldGUuay1zdGF0ZS1hY3RpdmUsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1hY3RpdmUsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtYWN0aXZlLC5rLWRyb3Bkb3duLXdyYXAuay1zdGF0ZS1hY3RpdmUsLmstc3RhdGUtYWN0aXZlLC5rLXN0YXRlLWFjdGl2ZTpob3Zlciwuay1zdGF0ZS1hY3RpdmU+LmstbGluaywuay1idXR0b246YWN0aXZlLC5rLXBhbmVsYmFyPi5rLWl0ZW0+Lmstc3RhdGUtZm9jdXNlZHtiYWNrZ3JvdW5kLWltYWdlOm5vbmV9Lmstc3RhdGUtc2VsZWN0ZWQsLmstYnV0dG9uOmFjdGl2ZSwuay1idXR0b24uay1zdGF0ZS1hY3RpdmUsLmstZHJhZ2hhbmRsZS5rLXN0YXRlLXNlbGVjdGVkOmhvdmVye2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuMikpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpOy8qISBiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpICovfS5rLWJ1dHRvbjphY3RpdmUsLmstYnV0dG9uLmstc3RhdGUtYWN0aXZlLC5rLWRyYWdoYW5kbGUuay1zdGF0ZS1zZWxlY3RlZDpob3ZlcntiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCV9LmstdG9vbC1pY29ue2JhY2tncm91bmQtaW1hZ2U6dXJsKCdSZXNvdXJjZXMvSW1hZ2VzL3Nwcml0ZS5wbmcnKX0uay1zdGF0ZS1ob3Zlcj4uay1saW5rLC5rLW90aGVyLW1vbnRoLmstc3RhdGUtaG92ZXIgLmstbGluayxkaXYuay1maWxlYnJvd3Nlci1kcm9wem9uZSBlbXtjb2xvcjojMmUyZTJlfS5rLWF1dG9jb21wbGV0ZS5rLXN0YXRlLWhvdmVyLC5rLWF1dG9jb21wbGV0ZS5rLXN0YXRlLWZvY3VzZWQsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1ob3Zlciwuay1waWNrZXItd3JhcC5rLXN0YXRlLWZvY3VzZWQsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtaG92ZXIsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtZm9jdXNlZCwuay1kcm9wZG93bi13cmFwLmstc3RhdGUtaG92ZXIsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWZvY3VzZWR7YmFja2dyb3VuZC1jb2xvcjojYmRiNGFmO2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuNCkpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjQpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1wb3NpdGlvbjo1MCUgNTAlO2JvcmRlci1jb2xvcjojYjZiNmI2fS5rbS1wYW5lLXdyYXBwZXIgLmstbW9iaWxlLWxpc3QgaW5wdXQ6bm90KFt0eXBlPSJjaGVja2JveCJdKTpub3QoW3R5cGU9InJhZGlvIl0pLC5rbS1wYW5lLXdyYXBwZXIgLmttLXBhbmUgLmstbW9iaWxlLWxpc3Qgc2VsZWN0Om5vdChbbXVsdGlwbGVdKSwua20tcGFuZS13cmFwcGVyIC5rLW1vYmlsZS1saXN0IHRleHRhcmVhLC5rLWRyb3Bkb3duIC5rLXN0YXRlLWZvY3VzZWQgLmstaW5wdXR7Y29sb3I6IzJlMmUyZX0uay1kcm9wZG93biAuay1zdGF0ZS1ob3ZlciAuay1pbnB1dHtjb2xvcjojMmUyZTJlfS5rLXN0YXRlLWVycm9ye2JvcmRlci1jb2xvcjojZmY2NzQ1O2JhY2tncm91bmQtY29sb3I6I2Y0ZjNmMjtjb2xvcjojZmZiMzg4fS5rLXN0YXRlLWRpc2FibGVke29wYWNpdHk6Ljd9LmstaWU4IC5rLXN0YXRlLWRpc2FibGVke2ZpbHRlcjphbHBoYShvcGFjaXR5PTcwKX0uay10aWxlLWVtcHR5Lmstc3RhdGUtc2VsZWN0ZWQsLmstbG9hZGluZy1tYXNrLmstc3RhdGUtc2VsZWN0ZWR7Ym9yZGVyLXdpZHRoOjA7YmFja2dyb3VuZC1pbWFnZTpub25lO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lmstc3RhdGUtZGlzYWJsZWQsLmstc3RhdGUtZGlzYWJsZWQgLmstbGluaywuay1zdGF0ZS1kaXNhYmxlZCAuay1idXR0b24sLmstb3RoZXItbW9udGgsLmstb3RoZXItbW9udGggLmstbGluaywuay1kcm9wem9uZSBlbSwuay10aWxlLWVtcHR5IHN0cm9uZywuay1zbGlkZXIgLmstZHJhZ2hhbmRsZXtjb2xvcjojOWY5ZjlmfS5rLWRyb3B6b25lIC5rLXVwbG9hZC1zdGF0dXN7Y29sb3I6IzJlMmUyZX0uay1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRle2JhY2tncm91bmQ6dXJsKCdEZWZhdWx0L2luZGV0ZXJtaW5hdGUuZ2lmJyl9LmstcHJvZ3Jlc3NiYXItaW5kZXRlcm1pbmF0ZSAuay1wcm9ncmVzcy1zdGF0dXMtd3JhcCwuay1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlIC5rLXN0YXRlLXNlbGVjdGVke2Rpc3BsYXk6bm9uZX0uay1zbGlkZXItdHJhY2t7YmFja2dyb3VuZC1jb2xvcjojZDVkNWQ1fS5rLXNsaWRlci1zZWxlY3Rpb257YmFja2dyb3VuZC1jb2xvcjojZjM1ODAwO30uay1zbGlkZXItaG9yaXpvbnRhbCAuay10aWNre2JhY2tncm91bmQtaW1hZ2U6dXJsKCdEZWZhdWx0L3NsaWRlci1oLmdpZicpfS5rLXNsaWRlci12ZXJ0aWNhbCAuay10aWNre2JhY2tncm91bmQtaW1hZ2U6dXJsKCdEZWZhdWx0L3NsaWRlci12LmdpZicpfS5rLXdpZGdldC5rLXRvb2x0aXB7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ3RleHR1cmVzL2hpZ2hsaWdodC5wbmcnKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDI1NSwyNTUsMjU1LC42KSksdG8ocmdiYSgyNTUsMjU1LDI1NSwuMCkpKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjYpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpub25lLGxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCU7YmFja2dyb3VuZC1jb2xvcjojZWFlOGU4O2NvbG9yOiMzMTMxMzE7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtYm94LXNoYWRvdzowIDRweCA2cHggcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MCA0cHggNnB4IHJnYmEoMCwwLDAsMC4zKX0uay13aWRnZXQuay10b29sdGlwLXZhbGlkYXRpb257Ym9yZGVyLWNvbG9yOiNmZmU3OWU7YmFja2dyb3VuZC1jb2xvcjojZmZlNzllO2NvbG9yOiM2YjUxMDB9LmlucHV0LXByZXBlbmQgLmstdG9vbHRpcC12YWxpZGF0aW9uLC5pbnB1dC1hcHBlbmQgLmstdG9vbHRpcC12YWxpZGF0aW9ue2ZvbnQtc2l6ZToxMnB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDozcHh9LmstY2FsbG91dC1ue2JvcmRlci1ib3R0b20tY29sb3I6I2VhZThlOH0uay1jYWxsb3V0LXd7Ym9yZGVyLXJpZ2h0LWNvbG9yOiNlYWU4ZTh9LmstY2FsbG91dC1ze2JvcmRlci10b3AtY29sb3I6I2VhZThlOH0uay1jYWxsb3V0LWV7Ym9yZGVyLWxlZnQtY29sb3I6I2VhZThlOH0uay10b29sdGlwLXZhbGlkYXRpb24gLmstY2FsbG91dC1ue2JvcmRlci1ib3R0b20tY29sb3I6I2ZmZTc5ZX0uay10b29sdGlwLXZhbGlkYXRpb24gLmstY2FsbG91dC13e2JvcmRlci1yaWdodC1jb2xvcjojZmZlNzllfS5rLXRvb2x0aXAtdmFsaWRhdGlvbiAuay1jYWxsb3V0LXN7Ym9yZGVyLXRvcC1jb2xvcjojZmZlNzllfS5rLXRvb2x0aXAtdmFsaWRhdGlvbiAuay1jYWxsb3V0LWV7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmZTc5ZX0uay1zcGxpdGJhcntiYWNrZ3JvdW5kLWNvbG9yOiNlOWU5ZTl9LmstcmVzdHJpY3RlZC1zaXplLXZlcnRpY2FsLC5rLXJlc3RyaWN0ZWQtc2l6ZS1ob3Jpem9udGFse2JhY2tncm91bmQtY29sb3I6I2ZmYjM4OH0uay1maWxle2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItY29sb3I6I2M1YzVjNX0uay1maWxlLXByb2dyZXNze2NvbG9yOiMyNDk4YmN9LmstZmlsZS1wcm9ncmVzcyAuay1wcm9ncmVzc3tiYWNrZ3JvdW5kLWNvbG9yOiNlNWY1ZmF9LmstZmlsZS1zdWNjZXNze2NvbG9yOiMzZWE0NGV9LmstZmlsZS1zdWNjZXNzIC5rLXByb2dyZXNze2JhY2tncm91bmQtY29sb3I6I2VhZjdlY30uay1maWxlLWVycm9ye2NvbG9yOiNkOTI4MDB9LmstZmlsZS1lcnJvciAuay1wcm9ncmVzc3tiYWNrZ3JvdW5kLWNvbG9yOiNmZmUwZDl9LmstdGlsZXtib3JkZXItY29sb3I6I2ZmZn0uay10ZXh0Ym94OmhvdmVyLC5rLXRpbGVzIGxpLmstc3RhdGUtaG92ZXJ7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstdGlsZXMgbGkuay1zdGF0ZS1zZWxlY3RlZHtib3JkZXItY29sb3I6I2Y4NWEwMH0uay1maWxlYnJvd3NlciAuay10aWxlIC5rLWZvbGRlciwuay1maWxlYnJvd3NlciAuay10aWxlIC5rLWZpbGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ0RlZmF1bHQvaW1hZ2Vicm93c2VyLnBuZycpOy13ZWJraXQtYmFja2dyb3VuZC1zaXplOmF1dG8gYXV0bztiYWNrZ3JvdW5kLXNpemU6YXV0byBhdXRvfS5rLWxlYWYsLmstbGVhZi5rLXN0YXRlLWhvdmVyOmhvdmVye2NvbG9yOiNmZmZ9LmstbGVhZi5rLWludmVyc2UsLmstbGVhZi5rLWludmVyc2Uuay1zdGF0ZS1ob3Zlcjpob3Zlcntjb2xvcjojMDAwfS5rLXdpZGdldCwuay1idXR0b257LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXNsaWRlciwuay10cmVldmlldywuay11cGxvYWR7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXN0YXRlLWhvdmVyey13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay10ZXh0Ym94OmZvY3VzLC5rLWF1dG9jb21wbGV0ZS5rLXN0YXRlLWZvY3VzZWQsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWZvY3VzZWQsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1mb2N1c2VkLC5rLW51bWVyaWMtd3JhcC5rLXN0YXRlLWZvY3VzZWR7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggMCByZ2JhKDAsMCwwLDAuMyk7Ym94LXNoYWRvdzowIDAgM3B4IDAgcmdiYSgwLDAsMCwwLjMpfS5rLXN0YXRlLXNlbGVjdGVkey13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay1zdGF0ZS1hY3RpdmV7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLWdyaWQgdGQuay1zdGF0ZS1zZWxlY3RlZC5rLXN0YXRlLWZvY3VzZWR7YmFja2dyb3VuZC1jb2xvcjojZmY1ZTAzfS5rLXBvcHVwLC5rLW1lbnUgLmstbWVudS1ncm91cCwuay1ncmlkIC5rLWZpbHRlci1vcHRpb25zLC5rLXRpbWUtcG9wdXAsLmstZGF0ZXBpY2tlci1jYWxlbmRhciwuay1hdXRvY29tcGxldGUuay1zdGF0ZS1ib3JkZXItZG93biwuay1hdXRvY29tcGxldGUuay1zdGF0ZS1ib3JkZXItdXAsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWFjdGl2ZSwuay1waWNrZXItd3JhcC5rLXN0YXRlLWFjdGl2ZSwuay1tdWx0aXNlbGVjdC5rLXN0YXRlLWZvY3VzZWQsLmstZmlsZWJyb3dzZXIgLmstaW1hZ2UsLmstdG9vbHRpcHstd2Via2l0LWJveC1zaGFkb3c6MCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpfS5rLXRyZWVtYXAtdGlsZS5rLXN0YXRlLWhvdmVyey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDAgMCAzcHggI2Q1ZDVkNTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDNweCAjZDVkNWQ1fS5rLXdpbmRvd3tib3JkZXItY29sb3I6cmdiYSgwLDAsMCwwLjMpOy13ZWJraXQtYm94LXNoYWRvdzoxcHggMXB4IDdweCAxcHggcmdiYSgxMjgsMTI4LDEyOCwwLjMpO2JveC1zaGFkb3c6MXB4IDFweCA3cHggMXB4IHJnYmEoMTI4LDEyOCwxMjgsMC4zKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lmstd2luZG93Lmstc3RhdGUtZm9jdXNlZHtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwwLjMpOy13ZWJraXQtYm94LXNoYWRvdzoxcHggMXB4IDdweCAxcHggcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MXB4IDFweCA3cHggMXB4IHJnYmEoMCwwLDAsMC4zKX0uay13aW5kb3cuay13aW5kb3ctbWF4aW1pemVkLC5rLXdpbmRvdy1tYXhpbWl6ZWQgLmstd2luZG93LXRpdGxlYmFyLC5rLXdpbmRvdy1tYXhpbWl6ZWQgLmstd2luZG93LWNvbnRlbnR7Ym9yZGVyLXJhZGl1czowfS5rLXNoYWRvd3std2Via2l0LWJveC1zaGFkb3c6MCAxcHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MCAxcHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpfS5rLWluc2V0ey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsMC4zKX0uay1lZGl0b3ItaW5saW5lIDo6LW1vei1zZWxlY3Rpb257YmFja2dyb3VuZC1jb2xvcjojZjg1YTAwO3RleHQtc2hhZG93Om5vbmU7Y29sb3I6I2ZmZn0uay1lZGl0b3ItaW5saW5lIDo6c2VsZWN0aW9ue2JhY2tncm91bmQtY29sb3I6I2Y4NWEwMDt0ZXh0LXNoYWRvdzpub25lO2NvbG9yOiNmZmZ9LmstZWRpdG9yLWlubGluZSA6Oi1tb3otc2VsZWN0aW9ue2JhY2tncm91bmQtY29sb3I6I2Y4NWEwMDt0ZXh0LXNoYWRvdzpub25lO2NvbG9yOiNmZmZ9Lmstd2lkZ2V0Lmstbm90aWZpY2F0aW9uLmstbm90aWZpY2F0aW9uLWluZm97YmFja2dyb3VuZC1jb2xvcjojZTVmNWZhO2NvbG9yOiMyNDk4YmM7Ym9yZGVyLWNvbG9yOiNiNmUzZjF9Lmstd2lkZ2V0Lmstbm90aWZpY2F0aW9uLmstbm90aWZpY2F0aW9uLXN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjojZWFmN2VjO2NvbG9yOiM2ZTZlNmU7Ym9yZGVyLWNvbG9yOiNjNWU5Y2J9Lmstd2lkZ2V0Lmstbm90aWZpY2F0aW9uLmstbm90aWZpY2F0aW9uLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmZlNzllO2NvbG9yOiM2NjY7Ym9yZGVyLWNvbG9yOiNmZmUzOGZ9Lmstd2lkZ2V0Lmstbm90aWZpY2F0aW9uLmstbm90aWZpY2F0aW9uLWVycm9ye2JhY2tncm91bmQtY29sb3I6I2ZmZTBkOTtjb2xvcjojNmU2ZTZlO2JvcmRlci1jb2xvcjojZmZiNmE2fS5rLWdhbnR0IC5rLXRyZWVsaXN0e2JhY2tncm91bmQ6I2YxZjFmMX0uay1nYW50dCAuay10cmVlbGlzdCAuay1hbHR7YmFja2dyb3VuZC1jb2xvcjojZTRlNGU0fS5rLWdhbnR0IC5rLXRyZWVsaXN0IC5rLXN0YXRlLXNlbGVjdGVkLC5rLWdhbnR0IC5rLXRyZWVsaXN0IC5rLXN0YXRlLXNlbGVjdGVkIHRkLC5rLWdhbnR0IC5rLXRyZWVsaXN0IC5rLWFsdC5rLXN0YXRlLXNlbGVjdGVkLC5rLWdhbnR0IC5rLXRyZWVsaXN0IC5rLWFsdC5rLXN0YXRlLXNlbGVjdGVkPnRke2JhY2tncm91bmQtY29sb3I6I2YzNTgwMH0uay10YXNrLWRvdDphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiMyZTJlMmU7Ym9yZGVyLWNvbG9yOiMyZTJlMmV9LmstdGFzay1kb3Q6aG92ZXI6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5rLXRhc2stc3VtbWFyeXtib3JkZXItY29sb3I6IzZlNmU2ZTtiYWNrZ3JvdW5kOiM2ZTZlNmV9LmstdGFzay1taWxlc3RvbmUsLmstdGFzay1zdW1tYXJ5LWNvbXBsZXRle2JvcmRlci1jb2xvcjojMmUyZTJlO2JhY2tncm91bmQ6IzJlMmUyZX0uay1zdGF0ZS1zZWxlY3RlZC5rLXRhc2stc3VtbWFyeXtib3JkZXItY29sb3I6I2ZmYTY3MztiYWNrZ3JvdW5kOiNmZmE2NzN9Lmstc3RhdGUtc2VsZWN0ZWQuay10YXNrLW1pbGVzdG9uZSwuay1zdGF0ZS1zZWxlY3RlZCAuay10YXNrLXN1bW1hcnktY29tcGxldGV7Ym9yZGVyLWNvbG9yOiNmMzU4MDA7YmFja2dyb3VuZDojZjM1ODAwfS5rLXRhc2stc2luZ2xle2JhY2tncm91bmQtY29sb3I6I2ZmZDdjMDtib3JkZXItY29sb3I6I2ZmYzA5Yztjb2xvcjojMmUyZTJlfS5rLXN0YXRlLXNlbGVjdGVkLmstdGFzay1zaW5nbGV7Ym9yZGVyLWNvbG9yOiNmODVhMDB9LmstbGluZXtiYWNrZ3JvdW5kLWNvbG9yOiMyZTJlMmU7Y29sb3I6IzJlMmUyZX0uay1zdGF0ZS1zZWxlY3RlZC5rLWxpbmV7YmFja2dyb3VuZC1jb2xvcjojZjM1ODAwO2NvbG9yOiNmMzU4MDB9LmstcmVzb3VyY2V7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5rLWkta3BpLWRlY3JlYXNlLC5rLWkta3BpLWRlbmllZCwuay1pLWtwaS1lcXVhbCwuay1pLWtwaS1ob2xkLC5rLWkta3BpLWluY3JlYXNlLC5rLWkta3BpLW9wZW57YmFja2dyb3VuZC1pbWFnZTp1cmwoJ0RlZmF1bHQvc3ByaXRlX2twaS5wbmcnKX0uay1ibG9jaywuay1idXR0b24sLmstdGV4dGJveCwuay1kcmFnLWNsdWUsLmstdG91Y2gtc2Nyb2xsYmFyLC5rLXdpbmRvdywuay13aW5kb3ctdGl0bGVsZXNzIC5rLXdpbmRvdy1jb250ZW50LC5rLXdpbmRvdy1hY3Rpb24sLmstaW5saW5lLWJsb2NrLC5rLWdyaWQgLmstZmlsdGVyLW9wdGlvbnMsLmstZ3JvdXBpbmctaGVhZGVyIC5rLWdyb3VwLWluZGljYXRvciwuay1hdXRvY29tcGxldGUsLmstbXVsdGlzZWxlY3QsLmstY29tYm9ib3gsLmstZHJvcGRvd24sLmstZHJvcGRvd24td3JhcCwuay1kYXRlcGlja2VyLC5rLXRpbWVwaWNrZXIsLmstY29sb3JwaWNrZXIsLmstZGF0ZXRpbWVwaWNrZXIsLmstbm90aWZpY2F0aW9uLC5rLW51bWVyaWN0ZXh0Ym94LC5rLXBpY2tlci13cmFwLC5rLW51bWVyaWMtd3JhcCwuay1jb2xvcnBpY2tlciwuay1saXN0LWNvbnRhaW5lciwuay1jYWxlbmRhci1jb250YWluZXIsLmstY2FsZW5kYXIgdGQsLmstY2FsZW5kYXIgLmstbGluaywuay10cmVldmlldyAuay1pbiwuay1lZGl0b3ItaW5saW5lLC5rLXRvb2x0aXAsLmstdGlsZSwuay1zbGlkZXItdHJhY2ssLmstc2xpZGVyLXNlbGVjdGlvbiwuay11cGxvYWQsLmstc3BsaXQtYnV0dG9uIC5rLWdhbnR0LXZpZXdzLC5rLWdhbnR0LXZpZXdzPi5rLWN1cnJlbnQtdmlld3tib3JkZXItcmFkaXVzOjRweH0uay10b29se3RleHQtYWxpZ246Y2VudGVyO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uay10b29sLmstZ3JvdXAtc3RhcnQsLmstdG9vbGJhciAuay1zcGxpdC1idXR0b24gLmstYnV0dG9uLC5rLXRvb2xiYXIgLmstYnV0dG9uLWdyb3VwIC5rLWdyb3VwLXN0YXJ0e2JvcmRlci1yYWRpdXM6NHB4IDAgMCA0cHh9LmstcnRsIC5rLXRvb2wuay1ncm91cC1zdGFydCwuay1ydGwgLmstdG9vbGJhciAuay1zcGxpdC1idXR0b24gLmstYnV0dG9uLC5rLXJ0bCAuay10b29sYmFyIC5rLWJ1dHRvbi1ncm91cCAuay1ncm91cC1zdGFydHtib3JkZXItcmFkaXVzOjAgNHB4IDRweCAwfS5rLXRvb2wuay1ncm91cC1lbmQsLmstdG9vbGJhciAuay1idXR0b24tZ3JvdXAgLmstZ3JvdXAtZW5kLC5rLXRvb2xiYXIgLmstc3BsaXQtYnV0dG9uIC5rLXNwbGl0LWJ1dHRvbi1hcnJvd3tib3JkZXItcmFkaXVzOjAgNHB4IDRweCAwfS5rLXJ0bCAuay10b29sLmstZ3JvdXAtZW5kLC5rLXJ0bCAuay10b29sYmFyIC5rLWJ1dHRvbi1ncm91cCAuay1ncm91cC1lbmQsLmstcnRsIC5rLXRvb2xiYXIgLmstc3BsaXQtYnV0dG9uIC5rLXNwbGl0LWJ1dHRvbi1hcnJvd3tib3JkZXItcmFkaXVzOjRweCAwIDAgNHB4fS5rLWdyb3VwLXN0YXJ0LmstZ3JvdXAtZW5kLmstdG9vbHtib3JkZXItcmFkaXVzOjRweH0uay1jYWxlbmRhci1jb250YWluZXIuay1zdGF0ZS1ib3JkZXItdXAsLmstbGlzdC1jb250YWluZXIuay1zdGF0ZS1ib3JkZXItdXAsLmstYXV0b2NvbXBsZXRlLmstc3RhdGUtYm9yZGVyLXVwLC5rLW11bHRpc2VsZWN0Lmstc3RhdGUtYm9yZGVyLXVwLC5rLWRyb3Bkb3duLXdyYXAuay1zdGF0ZS1ib3JkZXItdXAsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1ib3JkZXItdXAsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtYm9yZGVyLXVwLC5rLXdpbmRvdy1jb250ZW50LC5rLWZpbHRlci1tZW51e2JvcmRlci1yYWRpdXM6MCAwIDRweCA0cHh9LmstYXV0b2NvbXBsZXRlLmstc3RhdGUtYm9yZGVyLXVwIC5rLWlucHV0LC5rLWRyb3Bkb3duLXdyYXAuay1zdGF0ZS1ib3JkZXItdXAgLmstaW5wdXQsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1ib3JkZXItdXAgLmstaW5wdXQsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1ib3JkZXItdXAgLmstc2VsZWN0ZWQtY29sb3IsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtYm9yZGVyLXVwIC5rLWlucHV0e2JvcmRlci1yYWRpdXM6MCAwIDAgNHB4fS5rLW11bHRpc2VsZWN0Lmstc3RhdGUtYm9yZGVyLXVwIC5rLW11bHRpc2VsZWN0LXdyYXB7Ym9yZGVyLXJhZGl1czowIDAgNHB4IDRweH0uay13aW5kb3ctdGl0bGViYXIsLmstYmxvY2s+LmstaGVhZGVyLC5rLXRhYnN0cmlwLWl0ZW1zIC5rLWl0ZW0sLmstcGFuZWxiYXIgLmstdGFic3RyaXAtaXRlbXMgLmstaXRlbSwuay10YWJzdHJpcC1pdGVtcyAuay1saW5rLC5rLWNhbGVuZGFyLWNvbnRhaW5lci5rLXN0YXRlLWJvcmRlci1kb3duLC5rLWxpc3QtY29udGFpbmVyLmstc3RhdGUtYm9yZGVyLWRvd24sLmstYXV0b2NvbXBsZXRlLmstc3RhdGUtYm9yZGVyLWRvd24sLmstbXVsdGlzZWxlY3Quay1zdGF0ZS1ib3JkZXItZG93biwuay1kcm9wZG93bi13cmFwLmstc3RhdGUtYm9yZGVyLWRvd24sLmstcGlja2VyLXdyYXAuay1zdGF0ZS1ib3JkZXItZG93biwuay1udW1lcmljLXdyYXAuay1zdGF0ZS1ib3JkZXItZG93biwuay1nYW50dC12aWV3cy5rLXN0YXRlLWV4cGFuZGVkLC5rLWdhbnR0LXZpZXdzLmstc3RhdGUtZXhwYW5kZWQ+LmstY3VycmVudC12aWV3e2JvcmRlci1yYWRpdXM6NHB4IDRweCAwIDB9Lmstc3BsaXQtYnV0dG9uLmstc3RhdGUtYm9yZGVyLWRvd24+LmstYnV0dG9ue2JvcmRlci1yYWRpdXM6NHB4IDAgMCAwfS5rLXNwbGl0LWJ1dHRvbi5rLXN0YXRlLWJvcmRlci11cD4uay1idXR0b257Ym9yZGVyLXJhZGl1czowIDAgMCA0cHh9Lmstc3BsaXQtYnV0dG9uLmstc3RhdGUtYm9yZGVyLWRvd24+Lmstc3BsaXQtYnV0dG9uLWFycm93e2JvcmRlci1yYWRpdXM6MCA0cHggMCAwfS5rLXNwbGl0LWJ1dHRvbi5rLXN0YXRlLWJvcmRlci11cD4uay1zcGxpdC1idXR0b24tYXJyb3d7Ym9yZGVyLXJhZGl1czowIDAgNHB4IDB9LmstZHJvcGRvd24td3JhcCAuay1pbnB1dCwuay1waWNrZXItd3JhcCAuay1pbnB1dCwuay1udW1lcmljLXdyYXAgLmstaW5wdXR7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0uay1ydGwgLmstZHJvcGRvd24td3JhcCAuay1pbnB1dCwuay1ydGwgLmstcGlja2VyLXdyYXAgLmstaW5wdXQsLmstcnRsIC5rLW51bWVyaWMtd3JhcCAuay1pbnB1dHtib3JkZXItcmFkaXVzOjAgM3B4IDNweCAwfS5rLW51bWVyaWMtd3JhcCAuay1saW5re2JvcmRlci1yYWRpdXM6MCAzcHggMCAwfS5rLW51bWVyaWMtd3JhcCAuay1saW5rKy5rLWxpbmt7Ym9yZGVyLXJhZGl1czowIDAgM3B4IDB9LmstY29sb3JwaWNrZXIgLmstc2VsZWN0ZWQtY29sb3J7Ym9yZGVyLXJhZGl1czozcHggMCAwIDNweH0uay1ydGwgLmstY29sb3JwaWNrZXIgLmstc2VsZWN0ZWQtY29sb3J7Ym9yZGVyLXJhZGl1czowIDNweCAzcHggMH0uay1hdXRvY29tcGxldGUuay1zdGF0ZS1ib3JkZXItZG93biAuay1pbnB1dHtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5rLWRyb3Bkb3duLXdyYXAuay1zdGF0ZS1ib3JkZXItZG93biAuay1pbnB1dCwuay1waWNrZXItd3JhcC5rLXN0YXRlLWJvcmRlci1kb3duIC5rLWlucHV0LC5rLXBpY2tlci13cmFwLmstc3RhdGUtYm9yZGVyLWRvd24gLmstc2VsZWN0ZWQtY29sb3IsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtYm9yZGVyLWRvd24gLmstaW5wdXR7Ym9yZGVyLXJhZGl1czo0cHggMCAwIDB9LmstbnVtZXJpYy13cmFwIC5rLWxpbmsuay1zdGF0ZS1zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiNmMzU4MDB9LmstbXVsdGlzZWxlY3Quay1zdGF0ZS1ib3JkZXItZG93biAuay1tdWx0aXNlbGVjdC13cmFwe2JvcmRlci1yYWRpdXM6M3B4IDNweCAwIDB9LmstZHJvcGRvd24td3JhcCAuay1zZWxlY3QsLmstcGlja2VyLXdyYXAgLmstc2VsZWN0LC5rLW51bWVyaWMtd3JhcCAuay1zZWxlY3QsLmstZGF0ZXRpbWVwaWNrZXIgLmstc2VsZWN0Ky5rLXNlbGVjdCwuay1saXN0LWNvbnRhaW5lci5rLXN0YXRlLWJvcmRlci1yaWdodHtib3JkZXItcmFkaXVzOjAgNHB4IDRweCAwfS5rLXJ0bCAuay1kcm9wZG93bi13cmFwIC5rLXNlbGVjdCwuay1ydGwgLmstcGlja2VyLXdyYXAgLmstc2VsZWN0LC5rLXJ0bCAuay1udW1lcmljLXdyYXAgLmstc2VsZWN0LC5rLXJ0bCAuay1kYXRldGltZXBpY2tlciAuay1zZWxlY3QrLmstc2VsZWN0LC5rLXJ0bCAuay1saXN0LWNvbnRhaW5lci5rLXN0YXRlLWJvcmRlci1yaWdodHtib3JkZXItcmFkaXVzOjRweCAwIDAgNHB4fS5rLW51bWVyaWMtd3JhcC5rLWV4cGFuZC1wYWRkaW5nIC5rLWlucHV0e2JvcmRlci1yYWRpdXM6NHB4fS5rLXRleHRib3g+aW5wdXQsLmstYXV0b2NvbXBsZXRlIC5rLWlucHV0LC5rLW11bHRpc2VsZWN0LXdyYXB7Ym9yZGVyLXJhZGl1czozcHh9LmstbGlzdCAuay1zdGF0ZS1ob3Zlciwuay1saXN0IC5rLXN0YXRlLWZvY3VzZWQsLmstbGlzdCAuay1zdGF0ZS1oaWdobGlnaHQsLmstbGlzdCAuay1zdGF0ZS1zZWxlY3RlZCwuay1maWVsZHNlbGVjdG9yIC5rLWxpc3QgLmstaXRlbSwuay1saXN0LW9wdGlvbmxhYmVsLC5rLWRyb3B6b25le2JvcmRlci1yYWRpdXM6M3B4fS5rLXNsaWRlciAuay1idXR0b24sLmstZ3JpZCAuay1zbGlkZXIgLmstYnV0dG9ue2JvcmRlci1yYWRpdXM6MTNweH0uay1kcmFnaGFuZGxle2JvcmRlci1yYWRpdXM6N3B4fS5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpOmZpcnN0LWNoaWxkLC5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpOmZpcnN0LWNoaWxkIC5rLWxpbmssLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6Zmlyc3QtY2hpbGQrbGksLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6Zmlyc3QtY2hpbGQrbGkgLmstbGlua3tib3JkZXItcmFkaXVzOjRweCAwIDAgNHB4fS5rLXJ0bCAuay1zY2hlZHVsZXItdG9vbGJhcj51bCBsaTpmaXJzdC1jaGlsZCwuay1ydGwgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6Zmlyc3QtY2hpbGQgLmstbGluaywuay1ydGwgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6Zmlyc3QtY2hpbGQrbGksLmstcnRsIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpOmZpcnN0LWNoaWxkK2xpIC5rLWxpbmssLmttLXZpZXcuay1wb3B1cC1lZGl0LWZvcm0gLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6bGFzdC1jaGlsZCwua20tdmlldy5rLXBvcHVwLWVkaXQtZm9ybSAuay1zY2hlZHVsZXItdG9vbGJhcj51bCBsaTpsYXN0LWNoaWxkIC5rLWxpbmt7Ym9yZGVyLXJhZGl1czowIDRweCA0cHggMH0uay1zY2hlZHVsZXItcGhvbmUgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGkuay1uYXYtdG9kYXksLmstc2NoZWR1bGVyLXBob25lIC5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpLmstbmF2LXRvZGF5IC5rLWxpbmssLmstZWRpdC1maWVsZD4uay1zY2hlZHVsZXItbmF2aWdhdGlvbntib3JkZXItcmFkaXVzOjRweH0uay1zY2hlZHVsZXItdG9vbGJhciAuay1uYXYtbmV4dCwuay1zY2hlZHVsZXItdG9vbGJhciB1bCt1bCBsaTpsYXN0LWNoaWxkLC5rLXNjaGVkdWxlci10b29sYmFyIC5rLW5hdi1uZXh0IC5rLWxpbmssLmstc2NoZWR1bGVyLXRvb2xiYXIgdWwrdWwgbGk6bGFzdC1jaGlsZCAuay1saW5re2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjRweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo0cHh9LmstcnRsIC5rLXNjaGVkdWxlci10b29sYmFyIC5rLW5hdi1uZXh0LC5rLXJ0bCAuay1zY2hlZHVsZXItdG9vbGJhciB1bCt1bCBsaTpsYXN0LWNoaWxkLC5rLXJ0bCAuay1zY2hlZHVsZXItdG9vbGJhciAuay1uYXYtbmV4dCAuay1saW5rLC5rLXJ0bCAuay1zY2hlZHVsZXItdG9vbGJhciB1bCt1bCBsaTpsYXN0LWNoaWxkIC5rLWxpbmt7Ym9yZGVyLXJhZGl1czo0cHggMCAwIDRweH0uay1zY2hlZHVsZXIgZGl2Lmstc2NoZWR1bGVyLWZvb3RlciB1bCBsaSwuay1zY2hlZHVsZXIgZGl2Lmstc2NoZWR1bGVyLWZvb3RlciAuay1saW5re2JvcmRlci1yYWRpdXM6NHB4fS5rLW1vcmUtZXZlbnRzLC5rLWV2ZW50LC5rLXRhc2stc2luZ2xlLC5rLXRhc2stY29tcGxldGUsLmstZXZlbnQgLmstbGlua3tib3JkZXItcmFkaXVzOjNweH0uay1zY2hlZHVsZXItbW9iaWxlIC5rLWV2ZW50e2JvcmRlci1yYWRpdXM6MnB4fS5rLWdyaWQtbW9iaWxlIC5rLWNvbHVtbi1hY3RpdmUrdGguay1oZWFkZXJ7Ym9yZGVyLWxlZnQtY29sb3I6IzJlMmUyZX1odG1sIC5rbS1wYW5lLXdyYXBwZXIgLmttLXdpZGdldCwuay1pZSAua20tcGFuZS13cmFwcGVyIC5rLXdpZGdldCwuay1pZSAua20tcGFuZS13cmFwcGVyIC5rLWdyb3VwLC5rLWllIC5rbS1wYW5lLXdyYXBwZXIgLmstY29udGVudCwuay1pZSAua20tcGFuZS13cmFwcGVyIC5rLWhlYWRlciwuay1pZSAua20tcGFuZS13cmFwcGVyIC5rLXBvcHVwLWVkaXQtZm9ybSAuay1lZGl0LWZpZWxkIC5rLWJ1dHRvbiwua20tcGFuZS13cmFwcGVyIC5rLW1vYmlsZS1saXN0IC5rLWl0ZW0sLmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdCAuay1lZGl0LWxhYmVsLC5rbS1wYW5lLXdyYXBwZXIgLmstbW9iaWxlLWxpc3QgLmstZWRpdC1maWVsZHtjb2xvcjojMmUyZTJlfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6bm9uZSl7ZGl2LmttLXBhbmUtd3JhcHBlciBhe2NvbG9yOiMyZTJlMmV9LmttLXBhbmUtd3JhcHBlciAuay1pY29ue2JhY2tncm91bmQtaW1hZ2U6dXJsKCdEZWZhdWx0L3Nwcml0ZV8yeC5wbmcnKTstd2Via2l0LWJhY2tncm91bmQtc2l6ZToyMS4yZW0gMjFlbTtiYWNrZ3JvdW5kLXNpemU6MjEuMmVtIDIxZW19fS5rbS1wYW5lLXdyYXBwZXIgLmstbW9iaWxlLWxpc3QgLmstaXRlbSwua20tcGFuZS13cmFwcGVyIC5rLW1vYmlsZS1saXN0IC5rLWVkaXQtZmllbGQsLmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdCAuay1yZWN1ci12aWV3Pi5rLWVkaXQtZmllbGQgLmstY2hlY2t7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci10b3A6MXB4IHNvbGlkICNjNWM1YzV9LmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdCAuay1lZGl0LWZpZWxkIHRleHRhcmVhe291dGxpbmUtd2lkdGg6MH0ua20tcGFuZS13cmFwcGVyIC5rLW1vYmlsZS1saXN0IC5rLWl0ZW0uay1zdGF0ZS1zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiNmMzU4MDA7Ym9yZGVyLXRvcC1jb2xvcjojZjg1YTAwfS5rbS1wYW5lLXdyYXBwZXIgLmstbW9iaWxlLWxpc3QgLmstcmVjdXItdmlldz4uay1lZGl0LWZpZWxkIC5rLWNoZWNrOmZpcnN0LWNoaWxke2JvcmRlci10b3AtY29sb3I6dHJhbnNwYXJlbnR9LmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdCAuay1pdGVtOmxhc3QtY2hpbGR7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgLTFweCAwICNjNWM1YzU7Ym94LXNoYWRvdzppbnNldCAwIC0xcHggMCAjYzVjNWM1fS5rbS1wYW5lLXdyYXBwZXIgLmstbW9iaWxlLWxpc3Q+dWw+bGk+LmstbGluaywua20tcGFuZS13cmFwcGVyIC5rLW1vYmlsZS1saXN0IC5rLXJlY3VyLXZpZXc+LmstZWRpdC1sYWJlbDpudGgtY2hpbGQoMyksLmttLXBhbmUtd3JhcHBlciAjcmVjdXJyZW5jZSAua20tc2Nyb2xsLWNvbnRhaW5lcj4uay1lZGl0LWxhYmVsOmZpcnN0LWNoaWxke2NvbG9yOiM3OTc5Nzl9LmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdD51bD5saT4uay1saW5re2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjNWM1YzV9LmttLXBhbmUtd3JhcHBlciAuay1tb2JpbGUtbGlzdCAuay1lZGl0LWZpZWxkey13ZWJraXQtYm94LXNoYWRvdzowIDFweCAxcHggI2M1YzVjNTtib3gtc2hhZG93OjAgMXB4IDFweCAjYzVjNWM1fS5rbS1hY3Rpb25zaGVldCAuay1ncmlkLWRlbGV0ZSwua20tYWN0aW9uc2hlZXQgLmstc2NoZWR1bGVyLWRlbGV0ZSwua20tcGFuZS13cmFwcGVyIC5rLXNjaGVkdWxlci1kZWxldGUsLmttLXBhbmUtd3JhcHBlciAuay1maWx0ZXItbWVudSAuay1idXR0b25bdHlwZT1yZXNldF17Y29sb3I6I2ZmZjtib3JkZXItY29sb3I6I2ZmNjc0NTtiYWNrZ3JvdW5kLWNvbG9yOnJlZDtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwwLjMpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwwLjMpLHJnYmEoMjU1LDI1NSwyNTUsMC4xNSkpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LDAuMykscmdiYSgyNTUsMjU1LDI1NSwwLjE1KSl9LmttLWFjdGlvbnNoZWV0IC5rLWdyaWQtZGVsZXRlOmFjdGl2ZSwua20tYWN0aW9uc2hlZXQgLmstc2NoZWR1bGVyLWRlbGV0ZTphY3RpdmUsLmttLXBhbmUtd3JhcHBlciAuay1zY2hlZHVsZXItZGVsZXRlOmFjdGl2ZSwua20tcGFuZS13cmFwcGVyIC5rLWZpbHRlci1tZW51IC5rLWJ1dHRvblt0eXBlPXJlc2V0XTphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojOTAwfS5rLWF1dG9jb21wbGV0ZS5rLXN0YXRlLWRlZmF1bHQsLmstcGlja2VyLXdyYXAuay1zdGF0ZS1kZWZhdWx0LC5rLW51bWVyaWMtd3JhcC5rLXN0YXRlLWRlZmF1bHQsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWRlZmF1bHR7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ3RleHR1cmVzL2hpZ2hsaWdodC5wbmcnKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDI1NSwyNTUsMjU1LC42KSksdG8ocmdiYSgyNTUsMjU1LDI1NSwuMCkpKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjYpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpub25lLGxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCU7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjO2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLWF1dG9jb21wbGV0ZS5rLXN0YXRlLWhvdmVyLC5rLXBpY2tlci13cmFwLmstc3RhdGUtaG92ZXIsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtaG92ZXIsLmstZHJvcGRvd24td3JhcC5rLXN0YXRlLWhvdmVye2JhY2tncm91bmQtY29sb3I6I2JkYjRhZjtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjQpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuNCkgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJTtib3JkZXItY29sb3I6I2I2YjZiNn1pbnB1dC5rLXRleHRib3gsdGV4dGFyZWEuay10ZXh0Ym94LC5rLW11bHRpc2VsZWN0LmstaGVhZGVye2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLW11bHRpc2VsZWN0LmstaGVhZGVyLmstc3RhdGUtaG92ZXJ7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstYXV0b2NvbXBsZXRlLmstc3RhdGUtZm9jdXNlZCwuay1waWNrZXItd3JhcC5rLXN0YXRlLWZvY3VzZWQsLmstbnVtZXJpYy13cmFwLmstc3RhdGUtZm9jdXNlZCwuay1kcm9wZG93bi13cmFwLmstc3RhdGUtZm9jdXNlZCwuay1tdWx0aXNlbGVjdC5rLWhlYWRlci5rLXN0YXRlLWZvY3VzZWR7YmFja2dyb3VuZC1jb2xvcjojYmRiNGFmO2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuNCkpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjQpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1wb3NpdGlvbjo1MCUgNTAlO2JvcmRlci1jb2xvcjojYmRiZGJkOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4IDAgcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MCAwIDNweCAwIHJnYmEoMCwwLDAsMC4zKX0uay1saXN0LWNvbnRhaW5lcntjb2xvcjojMmUyZTJlfS5rLWRyb3Bkb3duIC5rLWlucHV0LC5rLWRyb3Bkb3duIC5rLXN0YXRlLWZvY3VzZWQgLmstaW5wdXQsLmstbWVudSAuay1wb3B1cHtjb2xvcjojMmUyZTJlfS5rLXN0YXRlLWRlZmF1bHQ+Lmstc2VsZWN0e2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLXN0YXRlLWhvdmVyPi5rLXNlbGVjdHtib3JkZXItY29sb3I6I2I2YjZiNn0uay1zdGF0ZS1mb2N1c2VkPi5rLXNlbGVjdHtib3JkZXItY29sb3I6I2JkYmRiZH0uay10YWJzdHJpcDpmb2N1c3std2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAwIHJnYmEoMCwwLDAsMC4zKTtib3gtc2hhZG93OjAgMCAzcHggMCByZ2JhKDAsMCwwLDAuMyl9LmstdGFic3RyaXAtaXRlbXMgLmstc3RhdGUtZGVmYXVsdCAuay1saW5rLC5rLXBhbmVsYmFyPmxpLmstc3RhdGUtZGVmYXVsdD4uay1saW5re2NvbG9yOiMyZTJlMmV9LmstdGFic3RyaXAtaXRlbXMgLmstc3RhdGUtaG92ZXIgLmstbGluaywuay1wYW5lbGJhcj5saS5rLXN0YXRlLWhvdmVyPi5rLWxpbmssLmstcGFuZWxiYXI+bGkuay1zdGF0ZS1kZWZhdWx0Pi5rLWxpbmsuay1zdGF0ZS1ob3Zlcntjb2xvcjojMmUyZTJlfS5rLXBhbmVsYmFyIC5rLXN0YXRlLWZvY3VzZWQuay1zdGF0ZS1ob3ZlcntiYWNrZ3JvdW5kOiNiY2I0YjA7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXRhYnN0cmlwLWl0ZW1zIC5rLXN0YXRlLWRlZmF1bHR7Ym9yZGVyLWNvbG9yOiNjNWM1YzV9LmstdGFic3RyaXAtaXRlbXMgLmstc3RhdGUtaG92ZXJ7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9LmstdGFic3RyaXAtaXRlbXMgLmstc3RhdGUtYWN0aXZlLC5rLXBhbmVsYmFyIC5rLXRhYnN0cmlwLWl0ZW1zIC5rLXN0YXRlLWFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7YmFja2dyb3VuZC1pbWFnZTpub25lO2JvcmRlci1jb2xvcjojOWY5ZjlmfS5rLXRhYnN0cmlwIC5rLWNvbnRlbnQuay1zdGF0ZS1hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiMyZTJlMmV9LmstbWVudS5rLWhlYWRlciwuay1tZW51IC5rLWl0ZW17Ym9yZGVyLWNvbG9yOiNjNWM1YzV9LmstY29sdW1uLW1lbnUsLmstY29sdW1uLW1lbnUgLmstaXRlbSwuay1vdmVyZmxvdy1jb250YWluZXIgLmstb3ZlcmZsb3ctZ3JvdXB7Ym9yZGVyLWNvbG9yOiNjNWM1YzV9Lmstb3ZlcmZsb3ctY29udGFpbmVyIC5rLW92ZXJmbG93LWdyb3Vwey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAwICNmZmYsMCAxcHggMCAjZmZmO2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMCAjZmZmLDAgMXB4IDAgI2ZmZn0uay10b29sYmFyLWZpcnN0LXZpc2libGUuay1vdmVyZmxvdy1ncm91cCwuay1vdmVyZmxvdy1jb250YWluZXIgLmstb3ZlcmZsb3ctZ3JvdXArLmstb3ZlcmZsb3ctZ3JvdXB7LXdlYmtpdC1ib3gtc2hhZG93OjAgMXB4IDAgI2ZmZjtib3gtc2hhZG93OjAgMXB4IDAgI2ZmZn0uay10b29sYmFyLWxhc3QtdmlzaWJsZS5rLW92ZXJmbG93LWdyb3Vwey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAwICNmZmY7Ym94LXNoYWRvdzppbnNldCAwIDFweCAwICNmZmZ9LmstY29sdW1uLW1lbnUgLmstc2VwYXJhdG9ye2JvcmRlci1jb2xvcjojYzVjNWM1O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LmstbWVudSAuay1ncm91cHtib3JkZXItY29sb3I6I2M1YzVjNX0uay1ncmlkLWZpbHRlci5rLXN0YXRlLWFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmstZ3JvdXBpbmctcm93IHRkLC5rLWdyb3VwLWZvb3RlciB0ZCwuay1ncmlkLWZvb3RlciB0ZHtjb2xvcjojMmUyZTJlO2JvcmRlci1jb2xvcjojYzVjNWM1O2ZvbnQtd2VpZ2h0OmJvbGR9LmstZ3JvdXBpbmctaGVhZGVye2NvbG9yOiMyZTJlMmV9LmstZ3JpZCB0ZC5rLXN0YXRlLWZvY3VzZWR7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCBpbnNldCAwIDAgM3B4IDFweCAjYjZiNmI2O2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IGluc2V0IDAgMCAzcHggMXB4ICNiNmI2YjZ9LmstaGVhZGVyLC5rLWdyaWQtaGVhZGVyLXdyYXAsLmstZ3JpZCAuay1ncm91cGluZy1oZWFkZXIsLmstZ3JpZC1oZWFkZXIsLmstcGFnZXItd3JhcCwuay1wYWdlci13cmFwIC5rLXRleHRib3gsLmstcGFnZXItd3JhcCAuay1saW5rLC5rLWdyb3VwaW5nLWhlYWRlciAuay1ncm91cC1pbmRpY2F0b3IsLmstZ2FudHQtdG9vbGJhciAuay1zdGF0ZS1kZWZhdWx0e2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLXByaW1hcnksLmstb3ZlcmZsb3ctY29udGFpbmVyIC5rLXByaW1hcnl7Y29sb3I6I2ZmZjtib3JkZXItY29sb3I6I2U0NTIwMDtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjIpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuMikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmZjZiMTg7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5rLXByaW1hcnk6Zm9jdXMsLmstcHJpbWFyeS5rLXN0YXRlLWZvY3VzZWR7Y29sb3I6I2ZmZjtib3JkZXItY29sb3I6I2U0NTIwMDtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjQpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuNCkgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4IDAgI2YzNTgwMDtib3gtc2hhZG93OjAgMCAzcHggMCAjZjM1ODAwfS5rLXByaW1hcnk6aG92ZXJ7Y29sb3I6I2ZmZjtib3JkZXItY29sb3I6IzhkODA3OTtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjQpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuNCkgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtY29sb3I6I2ZmNWUwMzstd2Via2l0LWJveC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9LmstcHJpbWFyeTpmb2N1czphY3RpdmU6bm90KC5rLXN0YXRlLWRpc2FibGVkKTpub3QoW2Rpc2FibGVkXSksLmstcHJpbWFyeTpmb2N1czpub3QoLmstc3RhdGUtZGlzYWJsZWQpOm5vdChbZGlzYWJsZWRdKXstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDA7Ym94LXNoYWRvdzowIDAgM3B4IDAgI2YzNTgwMH0uay1wcmltYXJ5OmFjdGl2ZXtjb2xvcjojZmZmO2JvcmRlci1jb2xvcjojZjg1YTAwO2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuMikpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1jb2xvcjojZjI1ODAxOy13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay1wcmltYXJ5Lmstc3RhdGUtZGlzYWJsZWQsLmstc3RhdGUtZGlzYWJsZWQgLmstcHJpbWFyeSwuay1wcmltYXJ5Lmstc3RhdGUtZGlzYWJsZWQ6aG92ZXIsLmstc3RhdGUtZGlzYWJsZWQgLmstcHJpbWFyeTpob3Zlciwuay1wcmltYXJ5Lmstc3RhdGUtZGlzYWJsZWQ6aG92ZXIsLmstc3RhdGUtZGlzYWJsZWQgLmstcHJpbWFyeTphY3RpdmUsLmstcHJpbWFyeS5rLXN0YXRlLWRpc2FibGVkOmFjdGl2ZXtjb2xvcjojZTZlNmU2O2JvcmRlci1jb2xvcjojZTZlNmU2O2JhY2tncm91bmQtY29sb3I6I2ZmNmYxZDtiYWNrZ3JvdW5kLWltYWdlOnVybCgndGV4dHVyZXMvaGlnaGxpZ2h0LnBuZycpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMjU1LDI1NSwyNTUsLjIpKSx0byhyZ2JhKDI1NSwyNTUsMjU1LC4wKSkpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSwtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuMikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpOy13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay1wYWdlci1udW1iZXJzIC5rLWxpbmssLmstdHJlZXZpZXcgLmstaW57Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50fS5rLXRyZWV2aWV3IC5rLWljb24sLmstc2NoZWR1bGVyLXRhYmxlIC5rLWljb24sLmstZ3JpZCAuay1oaWVyYXJjaHktY2VsbCAuay1pY29ue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czo0cHh9Lmstc2NoZWR1bGVyLXRhYmxlIC5rLXN0YXRlLWhvdmVyIC5rLWljb257YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0uay1idXR0b246Zm9jdXMsLmstc3BsaXQtYnV0dG9uOmZvY3Vze291dGxpbmU6MH0uay1zcGxpdC1idXR0b246Zm9jdXN7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCA0cHggMnB4ICNiNmI2YjY7Ym94LXNoYWRvdzppbnNldCAwIDAgNHB4IDJweCAjYjZiNmI2fS5rLXNwbGl0LWJ1dHRvbjpmb2N1cz4uay1idXR0b257YmFja2dyb3VuZDp0cmFuc3BhcmVudDtib3JkZXItY29sb3I6I2M1YzVjNX0uay1lZGl0b3IgLmstdG9vbDpmb2N1c3tvdXRsaW5lOjA7Ym9yZGVyLWNvbG9yOiNjNWM1YzU7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAzcHggMXB4ICNiNmI2YjY7Ym94LXNoYWRvdzppbnNldCAwIDAgM3B4IDFweCAjYjZiNmI2fS5rLWNoZWNrYm94LWxhYmVsOmJlZm9yZXtib3JkZXItY29sb3I6I2M1YzVjNTtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLXJhZGl1czozcHh9LmstY2hlY2tib3gtbGFiZWw6aG92ZXI6YmVmb3JlLC5rLWNoZWNrYm94OmNoZWNrZWQrLmstY2hlY2tib3gtbGFiZWw6aG92ZXI6YmVmb3Jle2JvcmRlci1jb2xvcjojYWNhY2FjOy13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay1jaGVja2JveDpjaGVja2VkKy5rLWNoZWNrYm94LWxhYmVsOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLWNvbG9yOiNhMGRiYTk7Y29sb3I6I2Y4NWEwMH0uay1jaGVja2JveC1sYWJlbDphY3RpdmU6YmVmb3Jley13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4IDAgI2YzNTgwMDtib3gtc2hhZG93OjAgMCAzcHggMCAjZjM1ODAwO2JvcmRlci1jb2xvcjojZjg1YTAwfS5rLWNoZWNrYm94OmNoZWNrZWQrLmstY2hlY2tib3gtbGFiZWw6YWN0aXZlOmJlZm9yZXstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDA7Ym94LXNoYWRvdzowIDAgM3B4IDAgI2YzNTgwMDtib3JkZXItY29sb3I6I2Y4NWEwMH0uay1jaGVja2JveDpkaXNhYmxlZCsuay1jaGVja2JveC1sYWJlbHtjb2xvcjojOWY5ZjlmfS5rLWNoZWNrYm94OmRpc2FibGVkKy5rLWNoZWNrYm94LWxhYmVsOmhvdmVyOmJlZm9yZXstd2Via2l0LWJveC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9LmstY2hlY2tib3g6ZGlzYWJsZWQrLmstY2hlY2tib3gtbGFiZWw6YmVmb3JlLC5rLWNoZWNrYm94OmNoZWNrZWQ6ZGlzYWJsZWQrLmstY2hlY2tib3gtbGFiZWw6YmVmb3JlLC5rLWNoZWNrYm94OmNoZWNrZWQ6ZGlzYWJsZWQrLmstY2hlY2tib3gtbGFiZWw6YWN0aXZlOmJlZm9yZSwuay1jaGVja2JveDpjaGVja2VkOmRpc2FibGVkKy5rLWNoZWNrYm94LWxhYmVsOmhvdmVyOmJlZm9yZXtjb2xvcjojOWY5ZjlmO2JhY2tncm91bmQ6I2VkZWJlYTtib3JkZXItY29sb3I6IzljZDlhNjtib3JkZXItcmFkaXVzOjNweH0uay1jaGVja2JveDpmb2N1cysuay1jaGVja2JveC1sYWJlbDpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNmODVhMDA7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggMCAjZjM1ODAwO2JveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDB9LmstcmFkaW8tbGFiZWw6YmVmb3Jle2JvcmRlci1jb2xvcjojYzVjNWM1O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItd2lkdGg6MXB4fS5rLXJhZGlvLWxhYmVsOmhvdmVyOmJlZm9yZSwuay1yYWRpbzpjaGVja2VkKy5rLXJhZGlvLWxhYmVsOmhvdmVyOmJlZm9yZXtib3JkZXItY29sb3I6I2FjYWNhYzstd2Via2l0LWJveC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9LmstcmFkaW86Y2hlY2tlZCsuay1yYWRpby1sYWJlbDphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjVlMDM7Ym9yZGVyLXJhZGl1czo1MCV9LmstcmFkaW8tbGFiZWw6YWN0aXZlOmJlZm9yZXtib3JkZXItY29sb3I6I2Y4NWEwMDstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDA7Ym94LXNoYWRvdzowIDAgM3B4IDAgI2YzNTgwMH0uay1yYWRpbzpjaGVja2VkKy5rLXJhZGlvLWxhYmVsOmFjdGl2ZTpiZWZvcmV7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggMCAjZjM1ODAwO2JveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDA7Ym9yZGVyLWNvbG9yOiNmODVhMDB9LmstcmFkaW86ZGlzYWJsZWQrLmstcmFkaW8tbGFiZWx7Y29sb3I6IzlmOWY5Zn0uay1yYWRpbzpkaXNhYmxlZCsuay1yYWRpby1sYWJlbDpiZWZvcmUsLmstcmFkaW86ZGlzYWJsZWQrLmstcmFkaW8tbGFiZWw6YWN0aXZlOmJlZm9yZSwuay1yYWRpbzpkaXNhYmxlZCsuay1yYWRpby1sYWJlbDpob3ZlcjphZnRlciwuay1yYWRpbzpkaXNhYmxlZCsuay1yYWRpby1sYWJlbDpob3ZlcjpiZWZvcmV7YmFja2dyb3VuZDojZWRlYmVhO2JvcmRlci1jb2xvcjojYmZiZmJmOy13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uay1yYWRpbzpmb2N1cysuay1yYWRpby1sYWJlbDpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNmODVhMDA7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggMCAjZjM1ODAwO2JveC1zaGFkb3c6MCAwIDNweCAwICNmMzU4MDB9QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOjIpLG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzoyKXsuay1pY29uOm5vdCguay1sb2FkaW5nKSwuay1ncm91cGluZy1kcm9wY2x1ZSwuay1kcm9wLWhpbnQsLmstY2FsbG91dCwuay10b29sLWljb24sLmstc3RhdGUtaG92ZXIgLmstdG9vbC1pY29uLC5rLXN0YXRlLWFjdGl2ZSAuay10b29sLWljb24sLmstc3RhdGUtYWN0aXZlLmstc3RhdGUtaG92ZXIgLmstdG9vbC1pY29uLC5rLXN0YXRlLXNlbGVjdGVkIC5rLXRvb2wtaWNvbiwuay1zdGF0ZS1zZWxlY3RlZC5rLXN0YXRlLWhvdmVyIC5rLXRvb2wtaWNvbiwuay1jb2x1bW4tbWVudSAuay1zcHJpdGUsLmstbW9iaWxlLWxpc3QgLmstY2hlY2s6Y2hlY2tlZCwuay1tb2JpbGUtbGlzdCAuay1lZGl0LWZpZWxkIFt0eXBlPWNoZWNrYm94XTpjaGVja2VkLC5rLW1vYmlsZS1saXN0IC5rLWVkaXQtZmllbGQgW3R5cGU9cmFkaW9dOmNoZWNrZWR7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ0RlZmF1bHQvc3ByaXRlXzJ4LnBuZycpOy13ZWJraXQtYmFja2dyb3VuZC1zaXplOjM0MHB4IDMzNnB4O2JhY2tncm91bmQtc2l6ZTozNDBweCAzMzZweH0uay1kcm9wZG93bi13cmFwIC5rLWlucHV0LC5rLXBpY2tlci13cmFwIC5rLWlucHV0LC5rLW51bWVyaWMtd3JhcCAuay1pbnB1dHtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4fS5rLWkta3BpLWRlY3JlYXNlLC5rLWkta3BpLWRlbmllZCwuay1pLWtwaS1lcXVhbCwuay1pLWtwaS1ob2xkLC5rLWkta3BpLWluY3JlYXNlLC5rLWkta3BpLW9wZW57YmFja2dyb3VuZC1pbWFnZTp1cmwoJ0RlZmF1bHQvc3ByaXRlX2twaV8yeC5wbmcnKTstd2Via2l0LWJhY2tncm91bmQtc2l6ZTo5NnB4IDE2cHg7YmFja2dyb3VuZC1zaXplOjk2cHggMTZweH19QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmstZWRpdG9yLXRvb2xiYXItd3JhcCAuay1kcm9wZG93bi13cmFwLmstc3RhdGUtZm9jdXNlZCwuay1lZGl0b3ItdG9vbGJhci13cmFwIC5rLWJ1dHRvbi1ncm91cCAuay10b29sOmZvY3Vze2JvcmRlci1jb2xvcjojZmZmfX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MTAyNHB4KXsuay13ZWJraXQgLmstcGFnZXItbnVtYmVycywuay1mZiAuay1wYWdlci1udW1iZXJzLC5rLWllMTEgLmstcGFnZXItbnVtYmVycywuay1zYWZhcmkgLmstcGFnZXItbnVtYmVycywuay13ZWJraXQgLmstZ3JpZCAuay1wYWdlci1udW1iZXJzLC5rLWZmIC5rLWdyaWQgLmstcGFnZXItbnVtYmVycywuay1pZTExIC5rLWdyaWQgLmstcGFnZXItbnVtYmVycywuay1zYWZhcmkgLmstZ3JpZCAuay1wYWdlci1udW1iZXJzey1tcy10cmFuc2Zvcm06dHJhbnNsYXRleSgtMTAwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZXkoLTEwMCUpOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZXkoLTEwMCUpfS5rLXdlYmtpdCAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSwuay1mZiAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSwuay1pZTExIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlLC5rLXNhZmFyaSAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSwuay13ZWJraXQgLmstZ3JpZCAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSwuay1mZiAuay1ncmlkIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlLC5rLWllMTEgLmstZ3JpZCAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSwuay1zYWZhcmkgLmstZ3JpZCAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZXstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZXkoMTAwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZXkoMTAwJSk7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRleSgxMDAlKX0uay13ZWJraXQgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3M+bGkuay1jdXJyZW50LXZpZXcsLmstZmYgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3M+bGkuay1jdXJyZW50LXZpZXcsLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldywuay1zYWZhcmkgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3M+bGkuay1jdXJyZW50LXZpZXcsLmstd2Via2l0IC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbmssLmstZmYgLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluaywuay1pZTExIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbmssLmstc2FmYXJpIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbmt7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ3RleHR1cmVzL2hpZ2hsaWdodC5wbmcnKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDI1NSwyNTUsMjU1LC42KSksdG8ocmdiYSgyNTUsMjU1LDI1NSwuMCkpKTtiYWNrZ3JvdW5kLWltYWdlOm5vbmUsLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjYpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpub25lLGxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmdiYSgyNTUsMjU1LDI1NSwuNikgMCxyZ2JhKDI1NSwyNTUsMjU1LC4wKSAxMDAlKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCU7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjO2JvcmRlci1jb2xvcjojZDVkNWQ1fS5rLXdlYmtpdCAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSAuay1saW5rLC5rLWZmIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbmssLmstaWUxMSAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSAuay1saW5rLC5rLXNhZmFyaSAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSAuay1saW5re2JvcmRlci1jb2xvcjojYzVjNWM1fS5rLXdlYmtpdCAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldywuay1mZiAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldywuay1pZTExIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3LC5rLXNhZmFyaSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlld3tib3JkZXItcmFkaXVzOjRweH0uay13ZWJraXQgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3Muay1zdGF0ZS1leHBhbmRlZD5saSwuay1mZiAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVkPmxpLC5rLWllMTEgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3Muay1zdGF0ZS1leHBhbmRlZD5saSwuay1zYWZhcmkgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3Muay1zdGF0ZS1leHBhbmRlZD5saXtib3JkZXItcmFkaXVzOjB9Lmstd2Via2l0IC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzLmstc3RhdGUtZXhwYW5kZWQ+bGkuay1jdXJyZW50LXZpZXcsLmstZmYgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3Muay1zdGF0ZS1leHBhbmRlZD5saS5rLWN1cnJlbnQtdmlldywuay1pZTExIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzLmstc3RhdGUtZXhwYW5kZWQ+bGkuay1jdXJyZW50LXZpZXcsLmstc2FmYXJpIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzLmstc3RhdGUtZXhwYW5kZWQ+bGkuay1jdXJyZW50LXZpZXd7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0uay13ZWJraXQgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6Zmlyc3QtY2hpbGQsLmstZmYgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6Zmlyc3QtY2hpbGQsLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bCBsaTpmaXJzdC1jaGlsZCwuay1zYWZhcmkgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6Zmlyc3QtY2hpbGQsLmstd2Via2l0IC5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpOmZpcnN0LWNoaWxkIC5rLWxpbmssLmstZmYgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwgbGk6Zmlyc3QtY2hpbGQgLmstbGluaywuay1pZTExIC5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpOmZpcnN0LWNoaWxkIC5rLWxpbmssLmstc2FmYXJpIC5rLXNjaGVkdWxlci10b29sYmFyPnVsIGxpOmZpcnN0LWNoaWxkIC5rLWxpbmssLmstd2Via2l0IC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpLC5rLWllMTEgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGksLmstc2FmYXJpIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpLC5rLXdlYmtpdCAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cyBsaSAuay1saW5rLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpIC5rLWxpbmssLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cyBsaSAuay1saW5rLC5rLXNhZmFyaSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cyBsaSAuay1saW5re2JvcmRlci1yYWRpdXM6MH0uay13ZWJraXQgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6bGFzdC1jaGlsZCwuay1mZiAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cyBsaTpsYXN0LWNoaWxkLC5rLWllMTEgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6bGFzdC1jaGlsZCwuay1zYWZhcmkgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6bGFzdC1jaGlsZCwuay13ZWJraXQgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6bGFzdC1jaGlsZCAuay1saW5rLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpOmxhc3QtY2hpbGQgLmstbGluaywuay1pZTExIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzIGxpOmxhc3QtY2hpbGQgLmstbGluaywuay1zYWZhcmkgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3MgbGk6bGFzdC1jaGlsZCAuay1saW5re2JvcmRlci1yYWRpdXM6MCAwIDNweCAzcHh9Lmstd2Via2l0IC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbms6aG92ZXIsLmstZmYgLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazpob3Zlciwuay1pZTExIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbms6aG92ZXIsLmstc2FmYXJpIC5rLXBhZ2VyLW51bWJlcnMgLmstY3VycmVudC1wYWdlIC5rLWxpbms6aG92ZXIsLmstd2Via2l0IC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVyLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVyLC5rLWllMTEgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3M+bGkuay1jdXJyZW50LXZpZXc6aG92ZXIsLmstc2FmYXJpIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVye2JvcmRlci1jb2xvcjojYjZiNmI2O2JhY2tncm91bmQtaW1hZ2U6dXJsKCd0ZXh0dXJlcy9oaWdobGlnaHQucG5nJyk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGZyb20ocmdiYSgyNTUsMjU1LDI1NSwuNCkpLHRvKHJnYmEoMjU1LDI1NSwyNTUsLjApKSk7YmFja2dyb3VuZC1pbWFnZTpub25lLC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC40KSAwLHJnYmEoMjU1LDI1NSwyNTUsLjApIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZSxsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJnYmEoMjU1LDI1NSwyNTUsLjQpIDAscmdiYSgyNTUsMjU1LDI1NSwuMCkgMTAwJSk7YmFja2dyb3VuZC1jb2xvcjojYmNiNGIwfS5rLXdlYmtpdCAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldz4uay1saW5rLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3Pi5rLWxpbmssLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldz4uay1saW5rLC5rLXNhZmFyaSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cz5saS5rLWN1cnJlbnQtdmlldz4uay1saW5re2NvbG9yOiMyZTJlMmU7bWluLXdpZHRoOjc1cHh9Lmstd2Via2l0IC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVyPi5rLWxpbmssLmstZmYgLmstc2NoZWR1bGVyLXRvb2xiYXI+dWwuay1zY2hlZHVsZXItdmlld3M+bGkuay1jdXJyZW50LXZpZXc6aG92ZXI+LmstbGluaywuay1pZTExIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVyPi5rLWxpbmssLmstc2FmYXJpIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstY3VycmVudC12aWV3OmhvdmVyPi5rLWxpbmt7Y29sb3I6IzJlMmUyZX0uay13ZWJraXQgLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazphZnRlciwuay1mZiAuay1wYWdlci1udW1iZXJzIC5rLWN1cnJlbnQtcGFnZSAuay1saW5rOmFmdGVyLC5rLWllMTEgLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazphZnRlciwuay1zYWZhcmkgLmstcGFnZXItbnVtYmVycyAuay1jdXJyZW50LXBhZ2UgLmstbGluazphZnRlciwuay13ZWJraXQgLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstc3RhdGUtc2VsZWN0ZWQ+LmstbGluazphZnRlciwuay1mZiAuay1zY2hlZHVsZXItdmlld3M+bGkuay1zdGF0ZS1zZWxlY3RlZD4uay1saW5rOmFmdGVyLC5rLWllMTEgLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstc3RhdGUtc2VsZWN0ZWQ+LmstbGluazphZnRlciwuay1zYWZhcmkgLmstc2NoZWR1bGVyLXZpZXdzPmxpLmstc3RhdGUtc2VsZWN0ZWQ+LmstbGluazphZnRlcntkaXNwbGF5OmJsb2NrO2NvbnRlbnQ6IiI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTttYXJnaW4tdG9wOi0wLjVlbTtyaWdodDouMzMzZW07d2lkdGg6MS4zMzNlbTtoZWlnaHQ6MS4zMzNlbX0uay13ZWJraXQgLmstcGFnZXItbnVtYmVycy5rLXN0YXRlLWV4cGFuZGVkLC5rLWZmIC5rLXBhZ2VyLW51bWJlcnMuay1zdGF0ZS1leHBhbmRlZCwuay1pZTExIC5rLXBhZ2VyLW51bWJlcnMuay1zdGF0ZS1leHBhbmRlZCwuay1zYWZhcmkgLmstcGFnZXItbnVtYmVycy5rLXN0YXRlLWV4cGFuZGVkLC5rLXdlYmtpdCAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVkLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzLmstc3RhdGUtZXhwYW5kZWQsLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVkLC5rLXNhZmFyaSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVke2JvcmRlci13aWR0aDoxcHggMXB4IDAgMXB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItY29sb3I6I2M1YzVjNTtiYWNrZ3JvdW5kLWNvbG9yOiNlYWU4ZTg7Ym9yZGVyLXJhZGl1czo0cHggNHB4IDAgMDstd2Via2l0LWJveC1zaGFkb3c6MCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpO2JveC1zaGFkb3c6MCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpfS5rLXdlYmtpdCAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVkLC5rLWZmIC5rLXNjaGVkdWxlci10b29sYmFyPnVsLmstc2NoZWR1bGVyLXZpZXdzLmstc3RhdGUtZXhwYW5kZWQsLmstaWUxMSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVkLC5rLXNhZmFyaSAuay1zY2hlZHVsZXItdG9vbGJhcj51bC5rLXNjaGVkdWxlci12aWV3cy5rLXN0YXRlLWV4cGFuZGVke2JvcmRlci13aWR0aDoxcHg7YmFja2dyb3VuZC1pbWFnZTpub25lO2JvcmRlci1yYWRpdXM6NHB4fS5rLXdlYmtpdCAuay1wYWdlci1udW1iZXJzIC5rLXN0YXRlLXNlbGVjdGVkLC5rLWZmIC5rLXBhZ2VyLW51bWJlcnMgLmstc3RhdGUtc2VsZWN0ZWQsLmstaWUxMSAuay1wYWdlci1udW1iZXJzIC5rLXN0YXRlLXNlbGVjdGVkLC5rLXNhZmFyaSAuay1wYWdlci1udW1iZXJzIC5rLXN0YXRlLXNlbGVjdGVkLC5rLXdlYmtpdCAuay1wYWdlci1udW1iZXJzIC5rLWxpbmssLmstZmYgLmstcGFnZXItbnVtYmVycyAuay1saW5rLC5rLWllMTEgLmstcGFnZXItbnVtYmVycyAuay1saW5rLC5rLXNhZmFyaSAuay1wYWdlci1udW1iZXJzIC5rLWxpbmt7Ym9yZGVyLXJhZGl1czozcHh9fS5rLWNoYXJ0IC5rLW1hc2t7YmFja2dyb3VuZC1jb2xvcjojZmZmO2ZpbHRlcjphbHBoYShvcGFjaXR5PTY4KTtvcGFjaXR5Oi42OH0uay1jaGFydCAuay1zZWxlY3Rpb257Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsMC4yKTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAxcHggOHB4IHJnYmEoMCwwLDAsMC4xKTtib3gtc2hhZG93Omluc2V0IDAgMXB4IDhweCByZ2JhKDAsMCwwLDAuMSk7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtYm94LXNoYWRvdyAuMnMgbGluZWFyLGJvcmRlci1jb2xvciAuMnMgbGluZWFyO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuMnMgbGluZWFyLGJvcmRlci1jb2xvciAuMnMgbGluZWFyfS5rLWNoYXJ0IC5rLXNlbGVjdGlvbjpob3Zlcntib3JkZXItY29sb3I6cmdiYSgwLDAsMCwwLjMpOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA4cHggcmdiYSgwLDAsMCwwLjIpO2JveC1zaGFkb3c6aW5zZXQgMCAzcHggOHB4IHJnYmEoMCwwLDAsMC4yKX0uay1jaGFydCAuay1oYW5kbGV7YmFja2dyb3VuZC1jb2xvcjojZmNmY2ZjOy13ZWJraXQtYm94LXNoYWRvdzowIDAgMCAxcHggcmdiYSgwLDAsMCwwLjEpO2JveC1zaGFkb3c6MCAwIDAgMXB4IHJnYmEoMCwwLDAsMC4xKX0uay1jaGFydCAuay1oYW5kbGU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1jb2xvcjojYjhiOGI4Oy13ZWJraXQtYm94LXNoYWRvdzowIDAgMCAycHggcmdiYSgxMTEsMTAxLDk2LDAuNSk7Ym94LXNoYWRvdzowIDAgMCAycHggcmdiYSgxMTEsMTAxLDk2LDAuNSl9LmstY2hhcnQgLmstbmF2aWdhdG9yLWhpbnQgLmstdG9vbHRpcHtib3JkZXI6M3B4IHNvbGlkICNmZmY7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAwIDNweCByZ2JhKDAsMCwwLDAuMik7Ym94LXNoYWRvdzowIDAgMCAzcHggcmdiYSgwLDAsMCwwLjIpO2JhY2tncm91bmQ6I2ZmZjtjb2xvcjojMjQyNDI0fS5rLWNoYXJ0IC5rLW5hdmlnYXRvci1oaW50IC5rLXNjcm9sbHtiYWNrZ3JvdW5kOnJnYmEoMjQzLDg4LDAsMC43KTtoZWlnaHQ6NHB4fS5rLW1hcCAuay1tYXJrZXJ7YmFja2dyb3VuZC1pbWFnZTp1cmwoIkRlZmF1bHQvbWFya2Vycy5wbmciKX1AbWVkaWEgb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86Miksb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOjIpey5rLW1hcCAuay1tYXJrZXJ7YmFja2dyb3VuZC1pbWFnZTp1cmwoIkRlZmF1bHQvbWFya2Vyc18yeC5wbmciKX19LmstbWFwIC5rLWF0dHJpYnV0aW9ue2NvbG9yOiM2NjZ9Lmstc3ByZWFkc2hlZXQtcm93LWhlYWRlciwuay1zcHJlYWRzaGVldC1jb2x1bW4taGVhZGVye2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1zcHJlYWRzaGVldC10b3AtY29ybmVyLC5rLXNwcmVhZHNoZWV0LXJvdy1oZWFkZXIgdGQsLmstc3ByZWFkc2hlZXQtY29sdW1uLWhlYWRlciB0ZHtiYWNrZ3JvdW5kLWNvbG9yOiNlOWU5ZTk7YmFja2dyb3VuZC1pbWFnZTpub25lO2NvbG9yOiMwMDA7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9Lmstc3ByZWFkc2hlZXQtdG9wLWNvcm5lcntib3JkZXItY29sb3I6I2I2YjZiNn0uay1zcHJlYWRzaGVldC10b3AtY29ybmVyOmFmdGVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjYjZiNmI2ICNiNmI2YjYgdHJhbnNwYXJlbnR9Lmstc3ByZWFkc2hlZXQtcGFuZXtib3JkZXItY29sb3I6I2I2YjZiNn0uay1zcHJlYWRzaGVldC1wYW5lIHRke2JvcmRlci1jb2xvcjojZDBkMGQwfS5rLXNwcmVhZHNoZWV0LXBhbmUgLmstc3ByZWFkc2hlZXQtY29sdW1uLWhlYWRlciB0ZCwuay1zcHJlYWRzaGVldC1wYW5lIC5rLXNwcmVhZHNoZWV0LXJvdy1oZWFkZXIgdGR7Ym9yZGVyLWNvbG9yOiNiNmI2YjZ9Lmstc3ByZWFkc2hlZXQtcGFuZSAuay1zcHJlYWRzaGVldC1tZXJnZWQtY2VsbHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lmstc3ByZWFkc2hlZXQtcGFuZSAuay1zZWxlY3Rpb24tcGFydGlhbCwuay1zcHJlYWRzaGVldC1wYW5lIC5rLXNlbGVjdGlvbi1mdWxse2JvcmRlci1jb2xvcjpyZ2JhKDI0Myw4OCwwLDAuMik7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0Myw4OCwwLDAuMil9Lmstc3ByZWFkc2hlZXQtcGFuZSAuay1maWx0ZXItcmFuZ2V7Ym9yZGVyLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtcGFuZSAuay1zcHJlYWRzaGVldC1jb2x1bW4taGVhZGVyIC5rLXNlbGVjdGlvbi1wYXJ0aWFsLC5rLXNwcmVhZHNoZWV0LXBhbmUgLmstc3ByZWFkc2hlZXQtY29sdW1uLWhlYWRlciAuay1zZWxlY3Rpb24tZnVsbHtib3JkZXItYm90dG9tLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtcGFuZSAuay1zcHJlYWRzaGVldC1yb3ctaGVhZGVyIC5rLXNlbGVjdGlvbi1wYXJ0aWFsLC5rLXNwcmVhZHNoZWV0LXBhbmUgLmstc3ByZWFkc2hlZXQtcm93LWhlYWRlciAuay1zZWxlY3Rpb24tZnVsbHtib3JkZXItcmlnaHQtY29sb3I6I2YzNTgwMH0uay1zcHJlYWRzaGVldC1zZWxlY3Rpb257YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0Myw4OCwwLDAuMik7Ym9yZGVyLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtY2VsbC1lZGl0b3J7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAwIDJweCAjZjM1ODAwO2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMnB4ICNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtYWN0aXZlLWNlbGx7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCAjZjM1ODAwO2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4ICNmMzU4MDA7Ym9yZGVyLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtYWN0aXZlLWNlbGwgdGR7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1jb2xvcjojZjM1ODAwOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAxcHggMXB4IDAgMXB4ICNmMzU4MDAsaW5zZXQgMCAwIDAgMXB4ICNmMzU4MDA7Ym94LXNoYWRvdzppbnNldCAxcHggMXB4IDAgMXB4ICNmMzU4MDAsaW5zZXQgMCAwIDAgMXB4ICNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtYWN0aXZlLWNlbGwuay1yaWdodCB0ZHstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAwIDFweCAjZjM1ODAwLGluc2V0IC0ycHggMCAwIDFweCAjZjM1ODAwO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAwIDFweCAjZjM1ODAwLGluc2V0IC0ycHggMCAwIDFweCAjZjM1ODAwfS5rLXNwcmVhZHNoZWV0LWFjdGl2ZS1jZWxsLmstYm90dG9tIHRkey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAxcHggMXB4IDAgMXB4ICNmMzU4MDAsaW5zZXQgMCAtMnB4IDAgMXB4ICNmMzU4MDA7Ym94LXNoYWRvdzppbnNldCAxcHggMXB4IDAgMXB4ICNmMzU4MDAsaW5zZXQgMCAtMnB4IDAgMXB4ICNmMzU4MDB9Lmstc3ByZWFkc2hlZXQtYWN0aXZlLWNlbGwuay1yaWdodC5rLWJvdHRvbSB0ZHstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAwIDFweCAjZjM1ODAwLGluc2V0IC0ycHggLTJweCAwIDFweCAjZjM1ODAwO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAwIDFweCAjZjM1ODAwLGluc2V0IC0ycHggLTJweCAwIDFweCAjZjM1ODAwfS5rLWZmIC5rLXNwcmVhZHNoZWV0LWFjdGl2ZS1jZWxsIHRkey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggI2YzNTgwMDtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCAjZjM1ODAwfS5rLXNwcmVhZHNoZWV0LWFjdGl2ZS1jZWxsLmstc2luZ2xle2JhY2tncm91bmQtY29sb3I6I2ZmZn0uay1zcHJlYWRzaGVldD4uay1zcHJlYWRzaGVldC1mb3JtdWxhLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLWNvbG9yOiNlOWU5ZTkgI2U5ZTllOSAjYjZiNmI2fS5rLXNwcmVhZHNoZWV0Pi5rLXNwcmVhZHNoZWV0LWZvcm11bGEtYmFyOmJlZm9yZXtib3JkZXItY29sb3I6I2I2YjZiNn0uay1zcHJlYWRzaGVldD4uay1zcHJlYWRzaGVldC1mb3JtdWxhLWJhcjphZnRlcntib3JkZXItY29sb3I6I2U5ZTllOX0uay1zcHJlYWRzaGVldCAuay1zcHJlYWRzaGVldC1mb3JtdWxhLWlucHV0e2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMmUyZTJlfS5rLXNwcmVhZHNoZWV0IC5rLXJlc2l6ZS1oYW5kbGUsLmstc3ByZWFkc2hlZXQgLmstcmVzaXplLWhpbnQtaGFuZGxlLC5rLXNwcmVhZHNoZWV0IC5rLXJlc2l6ZS1oaW50LW1hcmtlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQgLmstcmVzaXplLWhpbnQtdmVydGljYWwgLmstcmVzaXplLWhpbnQtaGFuZGxlLC5rLXNwcmVhZHNoZWV0IC5rLXJlc2l6ZS1oaW50LXZlcnRpY2FsIC5rLXJlc2l6ZS1oaW50LW1hcmtlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMzU4MDB9Lmstc3ByZWFkc2hlZXQgLmstc2luZ2xlLXNlbGVjdGlvbjo6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjM1ODAwO2JvcmRlci1jb2xvcjojZmZmfS5rLXNwcmVhZHNoZWV0IC5rLWF1dG8tZmlsbHtib3JkZXItY29sb3I6I2YzNTgwMH0uay1zcHJlYWRzaGVldCAuay1hdXRvLWZpbGwtcHVuY2h7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNSl9Lmstc3ByZWFkc2hlZXQgLmstc2luZ2xlLXNlbGVjdGlvbi5rLWRpbS1hdXRvLWZpbGwtaGFuZGxlOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjQzLDg4LDAsMC41KX0uay1zcHJlYWRzaGVldC1mb3JtYXQtY2VsbHMgLmstc3ByZWFkc2hlZXQtcHJldmlld3tib3JkZXItY29sb3I6I2Q1ZDVkNX0uay1zcHJlYWRzaGVldC1maWx0ZXJ7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggI2QwZDBkMDtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCAjZDBkMGQwfS5rLXNwcmVhZHNoZWV0LWZpbHRlci5rLXN0YXRlLWFjdGl2ZXtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6I2YzNTgwMH0uay1zcHJlYWRzaGVldC1maWx0ZXI6aG92ZXJ7Y29sb3I6IzJlMmUyZTtiYWNrZ3JvdW5kOiNiY2I0YjA7Ym9yZGVyLWNvbG9yOiNhOTlmOWF9LmstYWN0aW9uLXdpbmRvdyAuay1hY3Rpb24tYnV0dG9uc3tib3JkZXItY29sb3I6I2Q1ZDVkNX0uay1zcHJlYWRzaGVldC1zYW1wbGV7Y29sb3I6IzdhN2E3YX0uay1zdGF0ZS1zZWxlY3RlZCAuay1zcHJlYWRzaGVldC1zYW1wbGV7Y29sb3I6aW5oZXJpdH0uay1zcHJlYWRzaGVldC13aW5kb3cgLmstbGlzdC13cmFwcGVyLC5rLXNwcmVhZHNoZWV0LXdpbmRvdyAuay1saXN0e2JvcmRlci1jb2xvcjojZDVkNWQ1O2JvcmRlci1yYWRpdXM6NHB4fS5rLXNwcmVhZHNoZWV0LXRvb2xiYXIuay10b29sYmFyIC5rLWJ1dHRvbi1ncm91cCAuay1idXR0b257Ym9yZGVyLXJhZGl1czo0cHh9Lmstc3ByZWFkc2hlZXQtdG9vbGJhcj4uay13aWRnZXQsLmstc3ByZWFkc2hlZXQtdG9vbGJhcj4uay1idXR0b24sLmstc3ByZWFkc2hlZXQtdG9vbGJhcj4uay1idXR0b24tZ3JvdXB7Ym9yZGVyLXJhZGl1czo0cHh9Lmstc3ByZWFkc2hlZXQtdG9vbGJhcj4uay1zZXBhcmF0b3J7Ym9yZGVyLWNvbG9yOiNkNWQ1ZDV9Lmstc3ByZWFkc2hlZXQtdG9vbGJhciAuay1vdmVyZmxvdy1hbmNob3J7Ym9yZGVyLXJhZGl1czowfS5rLXNwcmVhZHNoZWV0LXBvcHVwe2JvcmRlci1yYWRpdXM6NHB4fS5rLXNwcmVhZHNoZWV0LXBvcHVwIC5rLXNlcGFyYXRvcntiYWNrZ3JvdW5kLWNvbG9yOiNkNWQ1ZDV9Lmstc3ByZWFkc2hlZXQtcG9wdXAgLmstYnV0dG9ue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lmstc3ByZWFkc2hlZXQtcG9wdXAgLmstYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2JjYjRiMH0uay1zcHJlYWRzaGVldC1wb3B1cCAuay1zdGF0ZS1hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZjM1ODAwO2NvbG9yOiMwMDB9Lmstc3ByZWFkc2hlZXQtcG9wdXAgLmstc3RhdGUtYWN0aXZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2MwNDYwMH0uay1zcHJlYWRzaGVldC1maWx0ZXItbWVudSAuay1kZXRhaWxze2JvcmRlci1jb2xvcjojZDVkNWQ1fS5rLXNwcmVhZHNoZWV0LWZpbHRlci1tZW51IC5rLWRldGFpbHMtY29udGVudCAuay1zcGFjZS1yaWdodHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lmstc3ByZWFkc2hlZXQtZmlsdGVyLW1lbnUgLmstc3ByZWFkc2hlZXQtdmFsdWUtdHJlZXZpZXctd3JhcHBlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLWNvbG9yOiNkNWQ1ZDU7Ym9yZGVyLXJhZGl1czo0cHggMCAwIDRweH0uay1zeW50YXgtcmVme2NvbG9yOiNmODJ9Lmstc3ludGF4LW51bXtjb2xvcjojMDlmfS5rLXN5bnRheC1mdW5je2ZvbnQtd2VpZ2h0OmJvbGR9Lmstc3ludGF4LXN0cntjb2xvcjojMzhiNzE0fS5rLXN5bnRheC1lcnJvcntjb2xvcjpyZWR9Lmstc3ludGF4LWJvb2x7Y29sb3I6I2E5MTY5Y30uay1zeW50YXgtc3RhcnRleHB7Zm9udC13ZWlnaHQ6Ym9sZH0uay1zeW50YXgtcGFyZW4tbWF0Y2h7YmFja2dyb3VuZC1jb2xvcjojY2FmMjAwfS5rLXNlcmllcy1he2JvcmRlci1jb2xvcjojZmY2ODAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMTA0LDAsMC4xNSl9Lmstc2VyaWVzLWJ7Ym9yZGVyLWNvbG9yOiNhMGE3MDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE2MCwxNjcsMCwwLjE1KX0uay1zZXJpZXMtY3tib3JkZXItY29sb3I6I2ZmOGQwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDE0MSwwLDAuMTUpfS5rLXNlcmllcy1ke2JvcmRlci1jb2xvcjojNjc4OTAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgxMDMsMTM3LDAsMC4xNSl9Lmstc2VyaWVzLWV7Ym9yZGVyLWNvbG9yOiNmZmI1M2M7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwxODEsNjAsMC4xNSl9Lmstc2VyaWVzLWZ7Ym9yZGVyLWNvbG9yOiMzOTYwMDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDU3LDk2LDAsMC4xNSl9Lmstc3ByZWFkc2hlZXQtc2hlZXRzLXJlbW92ZTpob3ZlciAuay1pY29ue2NvbG9yOiNjMjJ9Lmstc3ByZWFkc2hlZXQtZm9ybXVsYS1saXN0IC5rLXN0YXRlLWZvY3VzZWR7YmFja2dyb3VuZC1jb2xvcjojZjM1ODAwO2NvbG9yOiNmZmZ9Lmstc3ByZWFkc2hlZXQgLmstd2lkZ2V0W2RhdGEtcHJvcGVydHk9J2ZvbnRTaXplJ117d2lkdGg6NjBweH0uay1zcHJlYWRzaGVldCAuay13aWRnZXRbZGF0YS1wcm9wZXJ0eT0nZm9ybWF0J117d2lkdGg6MTAwcHh9Lmstc3ByZWFkc2hlZXQgLmstd2lkZ2V0W2RhdGEtcHJvcGVydHk9J2ZvbnRGYW1pbHknXXt3aWR0aDoxMzBweH0uay1zcHJlYWRzaGVldCAuay1zcHJlYWRzaGVldC1zaGVldHMtcmVtb3Zle21hcmdpbjouNWVtIC41ZW0gLjVlbSAtMC41ZW19Lmstc3ByZWFkc2hlZXQtdG9vbGJhciAuay1jb21ib2JveCAuay1pbnB1dHtjb2xvcjojMmUyZTJlfS5rLXNwcmVhZHNoZWV0LXRvb2xiYXIgLmstY29tYm9ib3ggLmstc3RhdGUtaG92ZXIgLmstaW5wdXQsLmstc3ByZWFkc2hlZXQtdG9vbGJhciAuay1jb21ib2JveCAuay1zdGF0ZS1hY3RpdmUgLmstaW5wdXQsLmstc3ByZWFkc2hlZXQtdG9vbGJhciAuay1jb21ib2JveCAuay1zdGF0ZS1mb2N1c2VkIC5rLWlucHV0e2NvbG9yOiMyZTJlMmV9DQoNCi51aS1zbGlkZXItaGFuZGxlLm9lLXNsaWRlci1oYW5kbGUudWktc3RhdGUtZGVmYXVsdC51aS1jb3JuZXItYWxsIHsNCiAgICB3aWR0aDogNS41ZW07DQogICAgaGVpZ2h0OiAyZW07DQogICAgdG9wOiA0MyU7DQogICAgbWFyZ2luLXRvcDogLS45ZW07DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGxpbmUtaGVpZ2h0OiAxLjZlbTsNCiAgICB0ZXh0LWluZGVudDogMHB4Ow0KICAgIC8qY29sb3I6ICM1RTczN0Y7Ki8NCiAgICBib3JkZXItcmFkaXVzOiAxMHB4Ow0KICAgIHBhZGRpbmc6IDJweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQTVDOURGOw0KfQ0KDQogICAgLnVpLXNsaWRlci1oYW5kbGUub2Utc2xpZGVyLWhhbmRsZS51aS1zdGF0ZS1kZWZhdWx0LnVpLWNvcm5lci1hbGw6aG92ZXIgew0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgfQ0KDQoudG9vbGJhci1pdGVtLmFxdWEgPiBpbWcsIC50b29sYmFyLWl0ZW0uYXF1YSA+IHNwYW4uaWNvbiB7DQogICAgd2lkdGg6MThweDsNCiAgICBoZWlnaHQ6MThweDsNCiAgICBtYXJnaW46LjFlbSBhdXRvOw0KfQ0KDQoudG9vbGJhci1pdGVtLmFxdWF7DQogICAgbWF4LXdpZHRoOjEwZW07DQogICAgZm9udC1zaXplOi44ZW07DQp9DQoNCg0KLmZpbHRlci1oZWFkZXItd3JhcHBlciB7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIC8qbWFyZ2luOiA1cHg7Ki8NCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwOw0KICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwOw0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCn0NCg0KICAgIC5maWx0ZXItaGVhZGVyLXdyYXBwZXIgaW1nIHsNCiAgICAgICAgcGFkZGluZzogMCAxMHB4Ow0KICAgIH0NCg0KICAgICAgICAuZmlsdGVyLWhlYWRlci13cmFwcGVyIGltZzpmaXJzdC1jaGlsZCB7DQogICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDJweDsNCiAgICAgICAgfQ0KDQogICAgLmZpbHRlci1oZWFkZXItd3JhcHBlcjpob3ZlciB7DQogICAgICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICAgICAgLyp0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOyovDQogICAgfQ0KDQogICAgLmZpbHRlci1oZWFkZXItd3JhcHBlciBkaXYgew0KICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgfQ0KDQoNCi5zaG93LWZpbHRlcnMgew0KICAgIHdpZHRoOiAyNHB4Ow0KICAgIGhlaWdodDogMTZweDsNCiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoUmVzb3VyY2VzL0ltYWdlcy9JY29ucy9hcnJvdy1kb3duLXNtYWxsLTI0LnBuZyk7DQogICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsNCn0NCg0KLmhpZGUtZmlsdGVycyB7DQogICAgd2lkdGg6IDI0cHg7DQogICAgaGVpZ2h0OiAxNnB4Ow0KICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChSZXNvdXJjZXMvSW1hZ2VzL0ljb25zL2Fycm93LXVwLXNtYWxsLTI0LnBuZyk7DQogICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsNCn0NCg0KI2ZpbHRlci1vcHRpb25zLXdyYXBwZXIgew0KICAgIHBhZGRpbmc6IDEwcHggMCA1cHggNXB4Ow0KfQ0KDQojZmlsdGVyLXR5cGUtaGVhZGVyIHsNCiAgICBwYWRkaW5nOiAycHg7DQogICAgYm9yZGVyOiBzb2xpZCAxcHggI2U2ZTBlMDsNCiAgICBib3JkZXItdG9wOiBub25lOw0KfQ0KDQogICAgI2ZpbHRlci10eXBlLWhlYWRlciBkaXYgew0KICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgICAgIHdpZHRoOiA0OCU7DQogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICAgICAgZm9udC1zaXplOiAuOWVtOw0KICAgIH0NCg0KICAgICAgICAjZmlsdGVyLXR5cGUtaGVhZGVyIGRpdjpmaXJzdC1jaGlsZCB7DQogICAgICAgICAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCAjZTZlMGUwOw0KICAgICAgICB9DQoNCiNmaWx0ZXJzLXdyYXBwZXIgZGl2IHsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgd2lkdGg6IDQ5JTsNCn0NCg0KI2ZpbHRlcnMtd3JhcHBlciBzZWxlY3Qgew0KICAgIGZvbnQtc2l6ZTogLjllbTsNCn0NCg0KI3NlYXJjaC13cmFwcGVyLCAuY2FsY2l0ZSB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KDQojc2VhcmNoIHsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgei1pbmRleDogMjsNCiAgICB0b3A6IDIwcHg7DQogICAgbGVmdDogNzRweDsNCn0NCg0KI2hvbWUtYnV0dG9uIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiA5NXB4Ow0KICAgIGxlZnQ6IDIwcHg7DQogICAgei1pbmRleDogNTA7DQp9DQoNCiNiYXNlbWFwLXRvZ2dsZSB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGJvdHRvbTogMjBweDsNCiAgICBsZWZ0OiAyMHB4Ow0KICAgIHotaW5kZXg6IDUwOw0KfQ0KDQogICAgI2Jhc2VtYXAtdG9nZ2xlOmhvdmVyIHsNCiAgICAgICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIH0NCg0KLmJhc2VtYXBCRyB7DQogICAgaGVpZ2h0OiA1MHB4Ow0KICAgIHdpZHRoOiA1MHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7DQp9DQoNCi5iYXNlbWFwVGl0bGUgew0KICAgIHdpZHRoOiA1MHB4Ow0KICAgIGZvbnQtc2l6ZTogLjllbTsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTBlMDsNCiAgICBwYWRkaW5nOiAycHggMDsNCn0NCg0KI2xvY2F0aW9uLWluc3RydWN0aW9uIHsNCiAgICBwYWRkaW5nOiAxMHB4IDVweDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlOw0KfQ0KDQouYXJjZ2lzU2VhcmNoIC5zZWFyY2hCdG4gew0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICB6LWluZGV4OiAyOw0KfQ0KDQojbG9jYXRpb24tc3RhdHVzLXNlbGVjdGVkIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmN2QzOw0KICAgIHBhZGRpbmc6IDEwcHg7DQp9DQoNCiNzZWxlY3RlZC1sb2NhdGlvbi1yZW1vdmUgaW1nIHsNCiAgICBtYXJnaW46IDAgMCAtNHB4IDVweDsNCn0NCg0KICAgICNzZWxlY3RlZC1sb2NhdGlvbi1yZW1vdmUgaW1nOmhvdmVyIHsNCiAgICAgICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIH0NCg0KI3NlbGVjdGVkLWxvY2F0aW9uLW5hbWUgew0KICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOw0KfQ0KDQogICAgI3NlbGVjdGVkLWxvY2F0aW9uLW5hbWU6aG92ZXIgew0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgfQ0KDQouT0VfQ2hhcnQgew0KICAgIG1pbi13aWR0aDogMzAwcHg7DQp9DQoNCi5zY3JlZW5TZWN0aW9ubm9uZSB7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCg0KaDIuc2NyZWVuLWhlYWRlciB7DQogICAgbWFyZ2luLWxlZnQ6IDE1cHg7DQp9DQoNCi5hY3RpdmVUYWIsIC5hY3RpdmVTY3JlZW4gew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KfQ0KDQouaW5hY3RpdmVUYWIsIC5pbmFjdGl2ZVNjcmVlbiB7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCg0KLmRpdi1yb3cgew0KICAgIHdpZHRoOiA5MCU7DQogICAgbWFyZ2luOiBhdXRvOw0KfQ0KDQouZGl2LXJvdy5vdmVydmlld3sNCiAgICB3aWR0aDoxMDAlOw0KICAgIG1hcmdpbi1sZWZ0Oi0xMHB4Ow0KfQ0KDQouZGl2LXJvdy5vdmVydmlldyBkaXYuZGl2LXJvdy1jZWxsew0KICAgIHdpZHRoOjQ5JTsNCiAgICBwYWRkaW5nOiAwIDMwcHggMCAwIDsNCiAgDQp9DQoNCi5pbnB1dC1sb2NhdGlvbi1zZWN0aW9uew0KICAgIHdpZHRoOjEwMCU7DQogICAgY29sb3I6IHB1cnBsZTsNCn0NCg0KLmRpdi1yb3ctY2VsbCBoM3sNCiAgICBwYWRkaW5nOjEwcHg7DQp9DQoNCiAgICAuZGl2LXJvdy5vdmVydmlldyAuZGVzYyB7DQogICAgICAgIGhlaWdodDogNTUwcHg7DQogICAgICAgIG92ZXJmbG93OiBhdXRvOw0KICAgIH0NCg0KLm92ZXJ2aWV3IC5pbnB1dC1oZWFkZXJ7DQogICAgZm9udC13ZWlnaHQ6bm9ybWFsOw0KICAgIGZvbnQtc2l6ZToxLjJlbTsNCn0NCi5zeXN0ZW0tb3ZlcnZpZXcgew0KICAgIHBhZGRpbmc6MTBweDsNCiAgICBib3JkZXI6MXB4IHNvbGlkICNhN2E3YTc7DQogICAgd2lkdGg6OTUlOw0KfQ0KDQouaW1nLXdyYXBwZXItY2VudGVyew0KICAgIHdpZHRoOjEwMCU7DQogICAgdGV4dC1hbGlnbjpjZW50ZXI7DQogICAgbWFyZ2luLWJvdHRvbToxMHB4Ow0KfQ0KLmltZy13cmFwcGVyLWNlbnRlciBpbWd7DQogICAgLypoZWlnaHQ6MjAwcHg7Ki8NCiAgICBtYXgtd2lkdGg6IDk1JTsNCiAgICBtYXgtaGVpZ2h0OiAyMDBweDsNCg0KICAgIGJvcmRlcjpzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBwYWRkaW5nOjEwcHg7DQogICAgYm9yZGVyLXJhZGl1czoxMHB4Ow0KfQ0KDQogICAgLmRpdi1yb3cubm8tcGFkLCAuZGl2LXJvdy5wcm9kdWN0aW9uIHsNCiAgICAgICAgd2lkdGg6IDEwMCU7DQogICAgfQ0KDQogICAgICAgIC5kaXYtcm93Lm5vLXBhZCBkaXYuZGl2LXJvdy1jZWxsOmZpcnN0LWNoaWxkIHsNCiAgICAgICAgICAgIHdpZHRoOiA3MiU7DQogICAgICAgIH0NCg0KICAgICAgICAuZGl2LXJvdy5uby1wYWQgZGl2LmRpdi1yb3ctY2VsbDpsYXN0LWNoaWxkIHsNCiAgICAgICAgICAgIHdpZHRoOiAyNSU7DQogICAgICAgIH0NCg0KICAgIC5kaXYtcm93IGRpdi5kaXYtcm93LWNlbGwgew0KICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7DQogICAgICAgIHdpZHRoOiA0NyU7DQogICAgICAgIG1hcmdpbjphdXRvOw0KICAgIH0NCg0KICAgICAgICAuZGl2LXJvdy5wcm9kdWN0aW9uIGRpdi5kaXYtcm93LWNlbGx7DQogICAgICAgICAgICB3aWR0aDo1MCU7DQogICAgICAgICAgICBwYWRkaW5nOjEwcHg7DQogICAgICAgIH0NCiAgICAgICAgICAgIA0KICAgICAgICAuZGl2LXJvdyBkaXYuZGl2LXJvdy1jZWxsIGZpZWxkc2V0IHsNCiAgICAgICAgICAgIGhlaWdodDogMTAwJTsNCiAgICAgICAgICAgIC8qZm9udC1zaXplOiAuOWVtOyovDQogICAgICAgICAgICB3aWR0aDogMTAwJTsNCiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7DQogICAgICAgICAgICBtYXJnaW46IGF1dG87DQogICAgICAgIH0NCg0KICAgICAgICAuZGl2LXJvdyBkaXYuZGl2LXJvdy1jZWxsIGxlZ2VuZCB7DQogICAgICAgICAgICBtYXJnaW46IDIwcHg7DQogICAgICAgIH0NCg0KLmRpdi1yb3ctY2VsbCAuZGVzYyB7DQogICAgbWFyZ2luOiAxMHB4IDIwcHggMTBweCAzMHB4Ow0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGZvbnQtc2l6ZTogLjllbTsNCiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwOw0KICAgIGJvcmRlcjogc29saWQgMXB4ICNDQ0NDQ0M7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIHBhZGRpbmc6IDIwcHg7DQp9DQoNCi5ub3RlcyB7DQogICAgLypmb250LXNpemU6MWVtOyovDQogICAgY29sb3I6ICMzMDJmMmY7DQogICAgdGV4dC1pbmRlbnQ6IGVhY2gtbGluZSAxMHB4Ow0KfQ0KDQoubm90ZXMucHJvZHVjdGlvbnsNCiAgICBmb250LXNpemU6LjllbTsNCiAgICBwYWRkaW5nOjEwcHggN3B4Ow0KfQ0KDQoudGFibGUtbm90ZXMsIC5yZXF1aXJlZC1ub3RlcyB7DQogICAgd2lkdGg6IDkwJTsNCiAgICBtYXJnaW46IGF1dG87DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIGNvbG9yOiAjMzAyZjJmOw0KICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KfQ0KDQoucmVxdWlyZWQtbm90ZXN7DQogICAgdGV4dC1hbGlnbjpsZWZ0Ow0KICAgIHBhZGRpbmctdG9wOjEwcHg7DQp9DQoNCi5pbnB1dC1oZWFkZXIgew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KfQ0KDQouZGl2LXRhYmxlIHsNCiAgICBkaXNwbGF5OiB0YWJsZTsNCiAgICB3aWR0aDogOTAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6IGJlaWdlOw0KICAgIG1hcmdpbjogYXV0bzsNCn0NCg0KLmRpdi10YWJsZS5wcm9kdWN0aW9uew0KICAgIHdpZHRoOjEwMCU7DQogICAgbWFyZ2luLXJpZ2h0OjEwcHg7DQogICAgZm9udC1zaXplOi45ZW07DQp9DQoNCiAgICAuZGl2LXRhYmxlLnBhcmFtZXRlcnMsIC5kaXYtdGFibGUuYW1vcnRpemF0aW9uIHsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDsNCiAgICB9DQoNCi5kaXYtdGFibGUtcm93IHsNCiAgICBkaXNwbGF5OiB0YWJsZS1yb3c7DQp9DQoNCi5kaXYtdGFibGUtcm93LmhlYWRpbmd7DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCg0KLmRpdi10YWJsZS1jZWxsIHsNCiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsOw0KICAgIHBhZGRpbmc6IDRweDsNCiAgICBib3JkZXI6IHNvbGlkIDFweCAjZTZlMGUwOw0KfQ0KDQogICAgLmRpdi10YWJsZS1jZWxsOm50aC1jaGlsZCgxKSB7DQogICAgICAgIHdpZHRoOiA1NSU7DQogICAgICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsNCiAgICAgICAgcGFkZGluZy1sZWZ0OjEwcHg7DQogICAgICAgICAgIA0KICAgIH0NCg0KICAgIC5kaXYtdGFibGUtY2VsbDpudGgtY2hpbGQoMikgew0KICAgICAgICB3aWR0aDogNDUlOw0KICAgICAgICBwYWRkaW5nLWxlZnQ6MTBweDsNCiAgICAgICAgLyp0ZXh0LWFsaWduOmNlbnRlcjsqLw0KICAgIH0NCg0KICAgIC5kaXYtdGFibGUtY2VsbDpudGgtY2hpbGQoMykgew0KICAgICAgICB3aWR0aDogMTIlOw0KICAgIH0NCg0KICAgIC5kaXYtdGFibGUuYW1vcnRpemF0aW9uIC5kaXYtdGFibGUtY2VsbHsNCiAgICAgICAgd2lkdGg6MTQuMiU7DQogICAgICAgIHRleHQtYWxpZ246Y2VudGVyOw0KICAgIH0NCg0KLmRpdi10YWJsZS1jZWxsLklucHV0Q2FsY1RvdGFsIHsNCiAgICBmb250LXNpemU6IDEuMWVtOw0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIC8qYm9yZGVyLXRvcDogc29saWQgMnB4IGJsYWNrOw0KICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAycHggYmxhY2s7Ki8NCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2FsbW9uOw0KfQ0KDQouZGl2LXRhYmxlLWNlbGwuSW5wdXRDYWxjRXhwZW5zZSB7DQogICAgZm9udC1zaXplOiAxLjFlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsgICAgDQogICAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NhbG1vbjsNCn0NCg0KLmRpdi10YWJsZS1jZWxsLklucHV0Q2FsY1JldmVudWUgew0KICAgIGZvbnQtc2l6ZTogMS4xZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NlYWdyZWVuOyAvKmRhcmtraGFraSovOw0KfQ0KDQogICAgLmRpdi10YWJsZS1jZWxsLnVuaXRzIHsNCiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIH0NCg0KICAgIC5kaXYtdGFibGUtY2VsbC52YWx1ZXMgew0KICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7DQogICAgfQ0KDQogICAgLmRpdi10YWJsZS1jZWxsLndhcm5pbmcgew0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7IC8qcmdiYSgyMTcsIDEwMywgMTAzLCAwLjY0KTsqLw0KICAgIH0NCg0KLndhcm5pbmctc3BhbiB7DQogICAgYmFja2dyb3VuZDogeWVsbG93Ow0KICAgIHBhZGRpbmc6IDNweDsNCn0NCg0KI3N5c3RlbS1zZWxlY3Qtd3JhcHBlciB7DQogICAgLyp3aWR0aDogMzAwcHg7Ki8NCiAgICBtYXJnaW46IGF1dG87DQogICAgcGFkZGluZy1sZWZ0OjUwcHg7DQp9DQoNCi8qIFRoZSBjb250YWluZXIgKi8NCi5jb250YWluZXIgew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICBwYWRkaW5nLWxlZnQ6IDM1cHg7DQogICAgbWFyZ2luLWJvdHRvbTogMTJweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgZm9udC1zaXplOiAxOHB4Ow0KICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7DQogICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsNCiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7DQogICAgdXNlci1zZWxlY3Q6IG5vbmU7DQp9DQoNCiAgICAvKiBIaWRlIHRoZSBicm93c2VyJ3MgZGVmYXVsdCByYWRpbyBidXR0b24gKi8NCiAgICAuY29udGFpbmVyIGlucHV0IHsNCiAgICAgICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgICAgICBvcGFjaXR5OiAwOw0KICAgICAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgfQ0KDQovKiBDcmVhdGUgYSBjdXN0b20gcmFkaW8gYnV0dG9uICovDQouY2hlY2ttYXJrIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAwOw0KICAgIGxlZnQ6IDA7DQogICAgaGVpZ2h0OiAyNXB4Ow0KICAgIHdpZHRoOiAyNXB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7DQogICAgYm9yZGVyLXJhZGl1czogNTAlOw0KfQ0KDQovKiBPbiBtb3VzZS1vdmVyLCBhZGQgYSBncmV5IGJhY2tncm91bmQgY29sb3IgKi8NCi5jb250YWluZXI6aG92ZXIgaW5wdXQgfiAuY2hlY2ttYXJrIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjOw0KfQ0KDQovKiBXaGVuIHRoZSByYWRpbyBidXR0b24gaXMgY2hlY2tlZCwgYWRkIGEgYmx1ZSBiYWNrZ3JvdW5kICovDQouY29udGFpbmVyIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQTVDOURGOw0KfQ0KDQovKiBDcmVhdGUgdGhlIGluZGljYXRvciAodGhlIGRvdC9jaXJjbGUgLSBoaWRkZW4gd2hlbiBub3QgY2hlY2tlZCkgKi8NCi5jaGVja21hcms6YWZ0ZXIgew0KICAgIGNvbnRlbnQ6ICIiOw0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KDQovKiBTaG93IHRoZSBpbmRpY2F0b3IgKGRvdC9jaXJjbGUpIHdoZW4gY2hlY2tlZCAqLw0KLmNvbnRhaW5lciBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyazphZnRlciB7DQogICAgZGlzcGxheTogYmxvY2s7DQp9DQoNCi8qIFN0eWxlIHRoZSBpbmRpY2F0b3IgKGRvdC9jaXJjbGUpICovDQouY29udGFpbmVyIC5jaGVja21hcms6YWZ0ZXIgew0KICAgIHRvcDogOXB4Ow0KICAgIGxlZnQ6IDlweDsNCiAgICB3aWR0aDogOHB4Ow0KICAgIGhlaWdodDogOHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDUwJTsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCn0NCg0KDQoudG9nZ2xlLWRldGFpbC1pbnB1dHMgZGl2IHsNCiAgICBmb250LXNpemU6IC45ZW07DQogICAgcGFkZGluZzogMTVweDsNCiAgICBjb2xvcjogIzFBNzJDNDsNCn0NCg0KICAgIC50b2dnbGUtZGV0YWlsLWlucHV0cyBkaXY6aG92ZXIgew0KICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsNCiAgICAgICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIH0NCg0KLnJkZ3JvdXAgew0KICAgIHBhZGRpbmctbGVmdDogMTVweDsNCn0NCg0KLnNlY3Rpb24tZGVzYyB7DQogICAgd2lkdGg6IDkwJTsNCiAgICBtYXJnaW46IGF1dG87DQp9DQoNCiAgICAuc2VjdGlvbi1kZXNjIGRpdiB7DQogICAgICAgIHdpZHRoOiA5MCU7DQogICAgfQ0KDQoNCi5vZV9zZWxlY3Qgew0KICAgIGZvbnQtc2l6ZTogMTNweDsNCiAgICBwYWRkaW5nOiAxMHB4IDhweCAxMHB4IDE0cHg7DQogICAgYmFja2dyb3VuZDogI2ZmZjsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOw0KICAgIGJvcmRlci1yYWRpdXM6IDZweDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICB3aWR0aDogNTAlOw0KfQ0KDQoub2Vfc2VsZWN0LmRkLWxvY2F0aW9uc3sNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQogICAgLm9lX3NlbGVjdCAuc2VsZWN0IHsNCiAgICAgICAgd2lkdGg6IDEwMCU7DQogICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXJyb3cucG5nJykgbm8tcmVwZWF0Ow0KICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA4MCUgY2VudGVyOw0KICAgIH0NCg0KICAgICAgICAub2Vfc2VsZWN0IC5zZWxlY3Qgc2VsZWN0IHsNCiAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50Ow0KICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDE7DQogICAgICAgICAgICBib3JkZXI6IDA7DQogICAgICAgICAgICBwYWRkaW5nOiAwOw0KICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICAgICAgICAgIHdpZHRoOiAxMjAlOw0KICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgICAgICAgICAgei1pbmRleDogMTA7DQogICAgICAgICAgICBmb250LXNpemU6IDFlbTsNCiAgICAgICAgfQ0KDQoudG9vbHRpcCB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsNCiAgICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkIGJsYWNrICFpbXBvcnRhbnQ7DQp9DQoNCi5zbGlkZXItaGFuZGxlLXdyYXBwZXJ7DQogICAgcG9zaXRpb246cmVsYXRpdmU7DQogICAgdGV4dC1hbGlnbjpsZWZ0Ow0KfQ0KDQoudmFsaWRhdGUtbXNnLCAudmFsaWRhdGUtbXNnLW5lc3RlZCB7DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIHdpZHRoOiAzMjBweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE3LCAxMDMsIDEwMyk7DQogICAgY29sb3I6ICNmZmY7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1yYWRpdXM6IDZweDsNCiAgICBwYWRkaW5nOiAxMHB4Ow0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICB6LWluZGV4OiAxOw0KICAgIGJvdHRvbTogMTI1JTsNCiAgICBsZWZ0OiBhdXRvOw0KICAgIG1hcmdpbi1sZWZ0OiAtNjBweDsNCiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7DQp9DQoNCi52YWxpZGF0ZS1tc2ctbmVzdGVkew0KICAgIHBvc2l0aW9uOnJlbGF0aXZlOw0KICAgIHdpZHRoOjEwMCU7DQogICAgbWFyZ2luLWxlZnQ6MHB4Ow0KfQ0KDQoudmFsaWRhdGUtbXNnOjphZnRlciwgLnZhbGlkYXRlLW1zZy1uZXN0ZWQ6OmFmdGVyIHsNCiAgICBjb250ZW50OiAiIjsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAxMDAlOw0KICAgIGxlZnQ6IDUwJTsNCiAgICBtYXJnaW4tbGVmdDogLTVweDsNCiAgICBib3JkZXItd2lkdGg6IDVweDsNCiAgICBib3JkZXItc3R5bGU6IHNvbGlkOw0KICAgIGJvcmRlci1jb2xvcjogcmdiKDIxNywgMTAzLCAxMDMpIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50Ow0KfQ0KDQoudmFsaWRhdGUtbXNnLmhpZGUsIC52YWxpZGF0ZS1tc2ctbmVzdGVkLmhpZGV7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCg0KICAgIC50b29sdGlwIC50b29sdGlwdGV4dCB7DQogICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjsNCiAgICAgICAgd2lkdGg6IDMyMHB4Ow0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1Ow0KICAgICAgICBjb2xvcjogI2ZmZjsNCiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgICAgICBib3JkZXItcmFkaXVzOiA2cHg7DQogICAgICAgIHBhZGRpbmc6IDEwcHg7DQogICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICAgICAgei1pbmRleDogMTsNCiAgICAgICAgYm90dG9tOiAxMjUlOw0KICAgICAgICBsZWZ0OiA1MCU7DQogICAgICAgIG1hcmdpbi1sZWZ0OiAtNjBweDsNCiAgICAgICAgb3BhY2l0eTogMDsNCiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzOw0KICAgIH0NCg0KICAgICAgICAudG9vbHRpcCAudG9vbHRpcHRleHQ6OmFmdGVyIHsNCiAgICAgICAgICAgIGNvbnRlbnQ6ICIiOw0KICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgICAgICAgICAgdG9wOiAxMDAlOw0KICAgICAgICAgICAgbGVmdDogNTAlOw0KICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7DQogICAgICAgICAgICBib3JkZXItd2lkdGg6IDVweDsNCiAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7DQogICAgICAgICAgICBib3JkZXItY29sb3I6ICM1NTUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7DQogICAgICAgIH0NCg0KICAgIC50b29sdGlwOmhvdmVyIC50b29sdGlwdGV4dCB7DQogICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7DQogICAgICAgIG9wYWNpdHk6IDE7DQogICAgfQ0KDQouc2l0ZS1yZXBvcnR7DQogICAgcG9zaXRpb246cmVsYXRpdmU7DQogICAgcGFkZGluZy1yaWdodDoxNXB4Ow0KfQ0KDQouc2l0ZS1yZXBvcnQgaW1nLCAubWFwLXZpZXdlciBpbWd7DQogICAgcGFkZGluZzoxMHB4Ow0KICAgIG1hcmdpbi1yaWdodDoxNXB4Ow0KICAgIGJvcmRlcjpzb2xpZCAxcHggI2Q1ZDVkNTsNCn0NCg0KLmZsb2F0LWxlZnR7DQogICAgZmxvYXQ6bGVmdDsNCn0NCg0KI3NpdGUtcmVwb3J0LWdlbmVyYXRpbmd7DQogICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgdG9wOjA7DQogICAgbGVmdDowOw0KICAgIHJpZ2h0OjA7DQogICAgYm90dG9tOjA7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZDVkNWQ1Ow0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KICAgIGJvcmRlci1yYWRpdXM6NnB4Ow0KfQ0KDQogICAgI3NpdGUtcmVwb3J0LWdlbmVyYXRpbmcgZGl2IHsNCiAgICAgICAgbWFyZ2luLXRvcDogNDAlOw0KICAgIH0NCg0KICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDoxMTAwcHgpIHsNCiAgICAgICAgLyogc3R5bGVzIGZvciBicm93c2VycyBsYXJnZXIgdGhhbiA5NjAgKi8NCg0KICAgICAgICAuZGl2LXJvdy5vdmVydmlldyBkaXYuZGl2LXJvdy1jZWxsIHsNCiAgICAgICAgICAgIHdpZHRoOiAxMDAlOw0KICAgICAgICB9DQoNCiAgICAgICAgLmRpdi1yb3cgZGl2LmRpdi1yb3ctY2VsbCB7DQogICAgICAgICAgICB3aWR0aDogMTAwJTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5kaXYtcm93LnByb2R1Y3Rpb24gZGl2LmRpdi1yb3ctY2VsbCB7DQogICAgICAgICAgICB3aWR0aDogMTAwJTsNCiAgICAgICAgfQ0KDQogICAgICAgIC5kaXYtdGFibGUuYW1vcnRpemF0aW9uIHsNCiAgICAgICAgICAgIGZvbnQtc2l6ZTogLjhlbTsNCiAgICAgICAgfQ0KICAgIH0NCg==");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/CSS/OE_AquacultureModule.css", "css", "Lm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSBmaWVsZHNldCB7DQogICAgYm9yZGVyOiBzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOiA0cHg7DQogICAgbWFyZ2luOiA1cHggMDsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSBwLm9yYW5nZVRleHQgc3BhbiB7DQogICAgY29sb3I6ICNlNjk1MDA7DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi5vZUFxdWFjdWx0dXJlRHluYW1pY0Zvcm0gaDIgew0KICAgIGNvbG9yOiAjOTk5OTk5Ow0KfQ0KDQoub2VBcXVhY3VsdHVyZUR5bmFtaWNGb3JtIGgzIHsNCiAgICBtYXJnaW4tdG9wOjhweDsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAueW91cl9sb2NhdGlvbiB7DQogICAgcGFkZGluZzogMTJweCAwcHggMHB4IDRweDsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAuZGF0YS1oZCB7DQogICAgcGFkZGluZy1sZWZ0OiA0cHg7DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgZm9udC1zaXplOiAxLjFlbTsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAuZGF0YS1jb250ZW50IHsNCiAgICBwYWRkaW5nLWxlZnQ6MTBweDsNCiAgICBjb2xvcjojNjY2NjY2Ow0KfQ0KDQoub2VBcXVhY3VsdHVyZUR5bmFtaWNGb3JtIC5idG4tcm93ew0KICAgIGRpc3BsYXk6dGFibGU7DQogICAgd2lkdGg6MTAwJTsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAuYnRuLWNlbGx7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOw0KICAgIHRleHQtYWxpZ246Y2VudGVyOw0KfQ0KDQoub2VBcXVhY3VsdHVyZUR5bmFtaWNGb3JtIC5idG4tY2VsbCBkaXY6Zmlyc3QtY2hpbGR7DQogICAgd2lkdGg6IDgwJTsNCiAgICBwYWRkaW5nOjhweDsNCiAgICBjb2xvcjojMWE3MmM0Ow0KICAgIGJhY2tncm91bmQtY29sb3I6cmdiYSgyNDUsIDI0NSwgMjQ1LCAxKTsNCiAgICBib3JkZXItcmFkaXVzOjRweDsNCiAgICBtYXJnaW46MTBweDsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0NDQ0NDOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi5vZUFxdWFjdWx0dXJlRHluYW1pY0Zvcm0gLmJ0bi1jZWxsIGRpdjpob3ZlcnsNCiAgICBjdXJzb3I6cG9pbnRlcjsNCiAgICBjb2xvcjogI2ZmZmZmZjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiMxYTcyYzQ7DQogICAgdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAuYnRuLWNlbGwtZG93bmxvYWQ6aG92ZXJ7DQogICAgY3Vyc29yOnBvaW50ZXI7DQogICAgdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsNCn0NCg0KLm9lQXF1YWN1bHR1cmVEeW5hbWljRm9ybSAuZGF0YS1sYWJlbHsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQoub2VBcXVhY3VsdHVyZUR5bmFtaWNGb3JtIC5jb250ZW50QnJlYWtJbWFnZSB7DQogICAgZGlzcGxheTogYmxvY2s7DQogICAgbWFyZ2luLWxlZnQ6IGF1dG87DQogICAgbWFyZ2luLXJpZ2h0OiBhdXRvOw0KICAgIHBhZGRpbmc6MTBweCAwcHg7DQp9");
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/CSS/tab_styles.css", "css", "LyogU3R5bGUgdGhlIHRhYiAqLw0KDQoudGFiICosIC50YWJjb250ZW50ICogew0KICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQoNCi50YWIgew0KICAgIC8qZmxvYXQ6IGxlZnQ7Ki8NCiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7DQogICAgLyp3aWR0aDogMzAlOyovDQogICAgLyptaW4taGVpZ2h0OiA1MDBweDsqLw0KICAgIGhlaWdodDoxMDAlOw0KICAgIHBhZGRpbmc6MDsNCiAgICB3aWR0aDoxNWVtOw0KICAgIC8qbWFyZ2luLXRvcDoycHg7Ki8NCn0NCg0KICAgIC8qIFN0eWxlIHRoZSBidXR0b25zIHRoYXQgYXJlIHVzZWQgdG8gb3BlbiB0aGUgdGFiIGNvbnRlbnQgKi8NCiAgICAudGFiIGJ1dHRvbiB7DQogICAgICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0Ow0KICAgICAgICBjb2xvcjogYmxhY2s7DQogICAgICAgIHBhZGRpbmc6IDhweCAxNnB4Ow0KICAgICAgICBtYXJnaW46MDsNCiAgICAgICAgd2lkdGg6IDEwMCU7DQogICAgICAgIGJvcmRlci1ib3R0b206cmdiYSgxNjcsIDE2NywgMTY3LCAwLjgxKSAxcHggc29saWQ7DQogICAgICAgIC8qYm9yZGVyOiBub25lOw0KICAgICAgICBvdXRsaW5lOiBub25lOyovDQogICAgICAgIHRleHQtYWxpZ246IGxlZnQ7DQogICAgICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICAgICAgLyp0cmFuc2l0aW9uOiAwLjNzOyovDQogICAgfQ0KDQogICAgICAgIC8qIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGJ1dHRvbnMgb24gaG92ZXIgKi8NCiAgICAgICAgLnRhYiBidXR0b246aG92ZXIgew0KICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDsNCiAgICAgICAgfQ0KDQogICAgICAgIC8qIENyZWF0ZSBhbiBhY3RpdmUvY3VycmVudCAidGFiIGJ1dHRvbiIgY2xhc3MgKi8NCiAgICAgICAgLnRhYiBidXR0b24uYWN0aXZlVGFiIHsNCiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNjYWQ4ZGY7IC8qLy8jODhiN2Q1OyovDQogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2FkOGRmOw0KICAgICAgICAgICAgbWFyZ2luOiAwOw0KICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgICAgIH0NCg0KICAgICAgICAgICAgLnRhYiBidXR0b24uYWN0aXZlVGFiOmFmdGVyLCAudGFiIGJ1dHRvbi5hY3RpdmVUYWI6YmVmb3JlIHsNCiAgICAgICAgICAgICAgICBsZWZ0OiAxMDAlOw0KICAgICAgICAgICAgICAgIHRvcDogNTAlOw0KICAgICAgICAgICAgICAgIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7DQogICAgICAgICAgICAgICAgY29udGVudDogIiAiOw0KICAgICAgICAgICAgICAgIGhlaWdodDogMDsNCiAgICAgICAgICAgICAgICB3aWR0aDogMDsNCiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7DQogICAgICAgICAgICB9DQoNCiAgICAgICAgICAgIC50YWIgYnV0dG9uLmFjdGl2ZVRhYjphZnRlciB7DQogICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB3aGl0ZTsgLypyZ2JhKDEzNiwgMTgzLCAyMTMsIDApOyovDQogICAgICAgICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNjYWQ4ZGY7DQogICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAxOXB4Ow0KICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IC0xOXB4Ow0KICAgICAgICAgICAgfQ0KDQogICAgICAgICAgICAvKi50YWIgYnV0dG9uLmFjdGl2ZVRhYjpiZWZvcmUgew0KICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgxOTQsIDIyNSwgMjQ1LCAwKTsNCiAgICAgICAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogI2MyZTFmNTsNCiAgICAgICAgICAgICAgICBib3JkZXItd2lkdGg6IDI1cHg7DQogICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogLTI1cHg7DQogICAgICAgICAgICB9Ki8NCg0KLyogU3R5bGUgdGhlIHRhYiBjb250ZW50ICovDQoudGFiY29udGVudCB7DQogICAgLypmbG9hdDogbGVmdDsqLw0KICAgIHBhZGRpbmc6IDBweCAxMnB4Ow0KICAgIC8qYm9yZGVyOiAxcHggc29saWQgI2NjYzsqLw0KICAgIC8qd2lkdGg6IDcwJTsqLw0KICAgIG1heC13aWR0aDo5MCU7DQogICAgbWFyZ2luOmF1dG87DQogICAgYm9yZGVyLWxlZnQ6IG5vbmU7DQogICAgLyptaW4taGVpZ2h0OiA1MDBweDsqLw0KfQ0KDQpAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ODAwcHgpIHsNCiAgICAudGFiew0KICAgICAgICB3aWR0aDogMTBlbTsNCiAgICB9DQp9DQo=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureDynamicFormView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/OE_AquacultureFinancialView.html", "html", markup2);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/amortization.html", "html", markup3);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/dropdown.html", "html", markup4);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/dropdownLocations.html", "html", markup5);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/inputNumber.html", "html", markup6);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/inputs.html", "html", markup7);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/inputsCalculated.html", "html", markup8);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/latlong.html", "html", markup9);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/locationMap.html", "html", markup10);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/operatingCharts.html", "html", markup11);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/overview.html", "html", markup12);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/parameters.html", "html", markup13);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/production.html", "html", markup14);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/resources.html", "html", markup15);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/selectSystem.html", "html", markup16);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/slider.html", "html", markup17);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/sliderKendo.html", "html", markup18);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/summary.html", "html", markup19);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_Aquaculture/Templates/transportationLocations.html", "html", markup20);
});

})();
