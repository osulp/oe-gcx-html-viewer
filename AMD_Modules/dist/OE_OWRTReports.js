
// Module 'OE_OWRTReports'
        (function () {
var markup1 = '<div class=\'oe_owrtAreaReport-module-view\'>    <div class=\'oeOWRTReportLoading\' data-binding=\'{@visible: loaderVisible}\'>        <img data-binding=\'{@visible: loaderSpinner}\' src=\'Resources/Images/Custom/project_loader.gif\' />        <img data-binding=\'{@visible: loaderWarnIcon}\' src=\'Resources/Images/Custom/warning.png\' />        <div class=\'oeOWRTwarningMessage\' data-binding=\'{@text: loaderMessage}\'>Loading report...</div>        <div data-binding=\'{@visible: inputBlockOnError}\' class=\'oeOWRTerrorInput\'>            <div>Try again?  If this error persists please contact the site admin.</div>            <button data-binding=\'{@event-onclick: reportOptionsSubmission}\'>Get Report</button>        </div>    </div>    <div class=\'oeOWRTLoaderTab\' data-binding=\'{@visible: loaderProjectsVisible}\'>        <div>Loading...</div>    </div>    <div class=\'oeOWRTLoaderTab\' data-binding=\'{@visible: loaderFundsVisible}\'>        <div>Loading...</div>    </div>    <div class=\'oeOWRTLoaderTab\' data-binding=\'{@visible: loaderResultsVisible}\'>        <div>Loading...</div>    </div>                <div class=\'oeOWRTOptions\'>        <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleReportOptionPanel}\'>            <img data-binding=\'{src: optionsImageSrc}\' src=\'Resources/Images/Icons/arrow-right-small-24.png\' />            <span>Options</span>        </a>    </div>    <div class=\'oeOWRTOptionsPanel\' data-binding=\'{@visible: reportOptionsPanelVisible}\'>        <table class=\'oeOWRTOptionsTable\'>            <tr>                <td>                    <h1>Select Geography Type</h1>                    <select data-binding=\'{@source: geoTypeList}{@event-onchange: geoTypeChanged}{@value: geoTypeValue}\'>                        <option data-binding=\'{@template-for: geoTypeList}{value: value}{@text: name}\'></option>                                            </select>                </td>                <td>                    <h1>Select Report Area</h1>                    <h2 data-binding=\'{@text:geoTypeName}\'>Geo Type</h2>                    <select data-binding=\'{@source: reportAreaList}{@visible: reportAreaListVisible}{@event-onchange: areaOptionChanged}{@value: areaNameSelected}\'>                        <option data-binding=\'{@template-for: reportAreaList}{value: value}{@text: name}\'></option>                    </select>                                    </td>                <td>                    <h1>Select Year(s)</h1>                    <div>                        Year Range: <span input data-binding=\'{@text:startYear}\'></span> - <span data-binding=\'{@text:endYear}\'></span>                        <div class=\'owrtYearSlider\'>                            <input value=\'2013\' />                            <input value=\'2018\' />                        </div>                    </div>                </td>                <td>                    <h1>Generate New Report</h1>                    <button data-binding=\'{@event-onclick: reportOptionsSubmission}\'>Get Report</button>                </td>            </tr>        </table>    </div>    <div class=\'oeOWRTAreaQueryInfo\'>        <div>&nbsp;</div>        <div data-binding=\'{@text: geoTypeName}\'></div>        <div data-binding=\'{@text: areaName}{@visible: areaNameVisisble}\'></div>        <div data-binding=\'{@text: yearRangeString}\'></div>    </div>               <div class=\'oeOWRTAreaTabs\'>        <div data-binding=\'{className: tabOverviewClass}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabOverview}\'>Overview</a></div>        <div data-binding=\'{className: tabProjectsClass}\'><img data-binding=\'{@visible: loadSpinnerProjects}\' width=\'14\' height=\'14\' src=\'Resources/Images/Custom/loading-transparent.gif\' /><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabProjects}\'>Projects</a></div>        <div data-binding=\'{className: tabFundingClass}\'><img data-binding=\'{@visible: loadSpinnerFunding}\' width=\'14\' height=\'14\' src=\'Resources/Images/Custom/loading-transparent.gif\' /><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabFunding}\'>Funding</a></div>        <div data-binding=\'{className: tabResultsClass}\'><img data-binding=\'{@visible: loadSpinnerResults}\' width=\'14\' height=\'14\' src=\'Resources/Images/Custom/loading-transparent.gif\' /><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabResults}\'>Results</a></div>    </div>    <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelOverview\' data-binding=\'{@visible: areaPanelOverviewVisisble}\'>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <fieldset>                <legend>Total Number of Projects</legend>                <h1 data-binding=\'{@text:areaTotalProjects}\'>0</h1>                <div class=\'oeOWRTFloatRight\' data-binding=\'{@visible: ranksVisible}\'>                    <div>Overall Rank: <strong>0</strong></div>                    <a href=\'javascript:void(0)\'>See full list of rankings</a>                </div>            </fieldset>            <fieldset>                <legend>Total Investment</legend>                <h1 data-binding=\'{@text:areaTotalInvestment}\'>0</h1>                <div class=\'oeOWRTFloatRight\' data-binding=\'{@visible: ranksVisible}\'>                    <div>Overall Rank: <strong>0</strong></div>                    <a href=\'javascript:void(0)\'>See full list of rankings</a>                </div>            </fieldset>            <fieldset data-binding=\'{@visible: ranksVisible}\'>                <legend>Overall Project Number Rank</legend>            </fieldset>        </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text: areaMapLegend}\'>Map</legend>                <div id=\'oeOWRTAreaMap\'></div>            </fieldset>        </div>    </div>            <div class=\'owrtChartsTableContainer\' data-binding=\'{@visible: owrtChartsTableContainerVisible}\'>        <table class=\'owrtChartTableShared owrtChartTables\' data-binding=\'{@visible: owrtChartsTableSharedVisible}\'>            <thead>                <tr>                    <th class=\'owrtChartsTableProjectsName\' data-binding=\'{@text: owrtTableHdrName}\'></th>                    <th class=\'owrtChartsTableProjectsValue\' data-binding=\'{@text: owrtTableHdrValue}\'></th>                </tr>            </thead>            <tbody data-binding=\'{@source: owrtTableData}\'>                <tr data-binding=\'{@template-for: owrtTableData}\'>                    <td data-binding=\'{@text: name}\'></td>                    <td data-binding=\'{@text: value}{data-sort-value: data-sort-value}\'></td>                </tr>            </tbody>        </table>        <table class=\'owrtChartTableFundInvestByYear owrtChartTables\' data-binding=\'{@visible: owrtChartsTableFundInvestByYearVisible}\'>            <thead>                <tr>                    <th class=\'owrtChartsTableProjectsName\'>Year</th>                    <th class=\'owrtChartsTableProjectsValue\'>Cash</th>                    <th class=\'owrtChartsTableProjectsValue\'>In Kind</th>                </tr>            </thead>            <tbody data-binding=\'{@source: owrtTableDataFundInvestByYear}\'>                <tr data-binding=\'{@template-for: owrtTableDataFundInvestByYear}\'>                    <td data-binding=\'{@text: year}\'></td>                    <td data-binding=\'{@text: cash}{data-sort-value: cashForSort}\'></td>                    <td data-binding=\'{@text: inkind}{data-sort-value: inkindForSort}\'></td>                </tr>            </tbody>        </table>        <table class=\'owrtChartTableFundInvestByActByYear owrtChartTables\' data-binding=\'{@visible: owrtChartsTableFundInvestByActByYearVisible}\'>            <thead>                <tr>                    <th>Year</th>                    <th>Combined</th>                    <th>Estuarine</th>                    <th>Fish Passage</th>                    <th>Fish Screening</th>                    <th>Instream</th>                    <th>Instream Flow</th>                    <th>Riparian</th>                    <th>Road</th>                    <th>Upland</th>                    <th>Urban</th>                    <th>Wetland</th>                </tr>            </thead>            <tbody data-binding=\'{@source: owrtTableDataFundInvestByActByYear}\'>                <tr data-binding=\'{@template-for: owrtTableDataFundInvestByActByYear}\'>                    <td data-binding=\'{@text: year}\'></td>                    <td data-binding=\'{@text: Combined}{data-sort-value: CombinedSort}\'></td>                    <td data-binding=\'{@text: Estuarine}{data-sort-value: EstuarineSort}\'></td>                    <td data-binding=\'{@text: Fish Passage}{data-sort-value: Fish PassageSort}\'></td>                    <td data-binding=\'{@text: Fish Screening}{data-sort-value: Fish ScreeningSort}\'></td>                    <td data-binding=\'{@text: Instream}{data-sort-value: InstreamSort}\'></td>                    <td data-binding=\'{@text: Instream Flow}{data-sort-value: Instream FlowSort}\'></td>                    <td data-binding=\'{@text: Riparian}{data-sort-value: RiparianSort}\'></td>                    <td data-binding=\'{@text: Road}{data-sort-value: RoadSort}\'></td>                    <td data-binding=\'{@text: Upland}{data-sort-value: UplandSort}\'></td>                    <td data-binding=\'{@text: Urban}{data-sort-value: UrbanSort}\'></td>                    <td data-binding=\'{@text: Wetland}{data-sort-value: WetlandSort}\'></td>                </tr>            </tbody>        </table>    </div>        <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelProjects\' data-binding=\'{@visible: areaPanelProjectsVisisble}\'>                        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <div class=\'oeOWRTAreaChartSelectBox\'>                <div data-binding=\'{className: oeOWRTProjChartYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleProjectsChartYear}\'># of Projects By Year</a>                </div>                <div data-binding=\'{className: oeOWRTProjChartActivityClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleProjectsChartActivity}\'># of Projects By Activity</a>                </div>            </div>        </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text:projectChartLegendText}\' data-content=\'\'>Title of Current Chart</legend>                                <div class=\'owrtChartTableToggleLink\' data-binding=\'{@visible: owrtChartTableLinkVisible}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleChartDataAsTable}\'>                        <img data-binding=\'{src: owrtTableLinkImg}\' src=\'Resources/Images/Icons/charting-24.png\' /><span data-binding=\'{@text:owrtTableLinkText}\'>View Table</span>                    </a>                </div>                    <div class=\'oeOWRTAreaProjectChart\' data-region-name=\'oeOWRTAreaProjectsChart\' data-binding=\'{@visible:owrtChartProjectsVisible}\'></div>                    <div class=\'owrtTableProjects\' data-binding=\'{@visible: owrtTableProjectsVisible}\'>                        <table class=\'owrtChartTableShared owrtChartTables\'>                            <thead>                                <tr>                                    <th class=\'owrtChartsTableProjectsName\' data-binding=\'{@text: owrtTableProjectsHeader}\'></th>                                    <th class=\'owrtChartsTableProjectsValue\' data-binding=\'{@text: owrtTableProjectsValue}\'></th>                                </tr>                            </thead>                            <tbody data-binding=\'{@source: owrtTableProjectsData}\'>                                <tr data-binding=\'{@template-for: owrtTableProjectsData}\'>                                    <td data-binding=\'{@text: name}\'></td>                                    <td data-binding=\'{@text: value}{data-sort-value: data-sort-value}\'></td>                                </tr>                            </tbody>                        </table>                    </div>            </fieldset>                    </div>                    </div>        <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelFunding\' data-binding=\'{@visible: areaPanelFundingVisisble}\'>                                        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewLeft\'>            <div class=\'oeOWRTAreaChartSelectBox\'>                <div data-binding=\'{className: oeOWRTFundingChartTotalClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartTotal}\'>Total Investment in Projects</a>                </div>                <div data-binding=\'{className: oeOWRTFundingChartYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartYear}\'>Investments By Year</a>                </div>                <div data-binding=\'{className: oeOWRTFundingChartActivityClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartActivity}\'>Investments By Activity</a>                </div>                <div data-binding=\'{className: oeOWRTFundingChartActivityYearClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartActivityYear}\'>Investments By Activity By Year</a>                </div>                <div data-binding=\'{className: oeOWRTFundingChartSourceClass}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleFundingChartSource}\'>Investments By Source</a>                </div>            </div>        </div>        <div class=\'oeOWRTAreaPanelCell oeOWRTAreaPanelOverviewRight\'>            <fieldset>                <legend data-binding=\'{@text:fundingChartLegendText}\'>Title of Current Chart</legend>                <div class=\'owrtChartTableToggleLink\' data-binding=\'{@visible: owrtChartTableLinkVisible}\'>                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleChartDataAsTable}\'>                        <img data-binding=\'{src: owrtTableLinkImg}\' src=\'Resources/Images/Icons/charting-24.png\' /><span data-binding=\'{@text:owrtTableLinkText}\'>View Table</span>                    </a>                </div>                <div class=\'oeOWRTAreaFundingChart\' data-region-name=\'oeOWRTAreaFundingChart\' data-binding=\'{@visible:owrtChartFundsVisible}\'></div>                <div class=\'owrtTableProjects\' data-binding=\'{@visible: owrtTableFundsVisible}\'>                    <table class=\'owrtChartTableShared owrtChartTables\'>                        <thead>                            <tr>                                <th class=\'owrtChartsTableProjectsName\' data-binding=\'{@text: owrtTableFundsHeader}\'></th>                                <th class=\'owrtChartsTableProjectsValue\' data-binding=\'{@text: owrtTableFundssValue}\'></th>                            </tr>                        </thead>                        <tbody data-binding=\'{@source: owrtTableFundsData}\'>                            <tr data-binding=\'{@template-for: owrtTableFundsData}\'>                                <td data-binding=\'{@text: name}\'></td>                                <td data-binding=\'{@text: value}{data-sort-value: data-sort-value}\'></td>                            </tr>                        </tbody>                    </table>                </div>                <div class=\'owrtTableProjects\' data-binding=\'{@visible: owrtTableFundInvestByYearVisible}\'>                    <table class=\'owrtChartTableFundInvestByYear owrtChartTables\'\'>                        <thead>                            <tr>                                <th class=\'owrtChartsTableProjectsName\'>Year</th>                                <th class=\'owrtChartsTableProjectsValue\'>Cash</th>                                <th class=\'owrtChartsTableProjectsValue\'>In Kind</th>                            </tr>                        </thead>                        <tbody data-binding=\'{@source: owrtTableFundsData}\'>                            <tr data-binding=\'{@template-for: owrtTableFundsData}\'>                                <td data-binding=\'{@text: year}\'></td>                                <td data-binding=\'{@text: cash}{data-sort-value: cashForSort}\'></td>                                <td data-binding=\'{@text: inkind}{data-sort-value: inkindForSort}\'></td>                            </tr>                        </tbody>                    </table>                </div>                <div class=\'owrtTableProjects\' data-binding=\'{@visible: owrtTableFundInvestByActByYearVisible}\'>                    <table class=\'owrtChartTableFundInvestByActByYear owrtChartTables\'\'>                        <thead>                            <tr>                                <th>Year</th>                                <th>Combined</th>                                <th>Estuarine</th>                                <th>Fish Passage</th>                                <th>Fish Screening</th>                                <th>Instream</th>                                <th>Instream Flow</th>                                <th>Riparian</th>                                <th>Road</th>                                <th>Upland</th>                                <th>Urban</th>                                <th>Wetland</th>                            </tr>                        </thead>                        <tbody data-binding=\'{@source: owrtTableFundsData}\'>                            <tr data-binding=\'{@template-for: owrtTableFundsData}\'>                                <td data-binding=\'{@text: year}\'></td>                                <td data-binding=\'{@text: Combined}{data-sort-value: CombinedSort}\'></td>                                <td data-binding=\'{@text: Estuarine}{data-sort-value: EstuarineSort}\'></td>                                <td data-binding=\'{@text: Fish Passage}{data-sort-value: Fish PassageSort}\'></td>                                <td data-binding=\'{@text: Fish Screening}{data-sort-value: Fish ScreeningSort}\'></td>                                <td data-binding=\'{@text: Instream}{data-sort-value: InstreamSort}\'></td>                                <td data-binding=\'{@text: Instream Flow}{data-sort-value: Instream FlowSort}\'></td>                                <td data-binding=\'{@text: Riparian}{data-sort-value: RiparianSort}\'></td>                                <td data-binding=\'{@text: Road}{data-sort-value: RoadSort}\'></td>                                <td data-binding=\'{@text: Upland}{data-sort-value: UplandSort}\'></td>                                <td data-binding=\'{@text: Urban}{data-sort-value: UrbanSort}\'></td>                                <td data-binding=\'{@text: Wetland}{data-sort-value: WetlandSort}\'></td>                            </tr>                        </tbody>                    </table>                </div>                </fieldset>        </div>    </div>       <div class=\'oeOWRTAreaPanel oeOWRTAreaPanelResults\' data-binding=\'{@visible: areaPanelResultsVisisble}\'>                        <table class=\'owrtResultsTable\'>            <thead>                <tr>                    <th>Results</th>                    <th class=\'owrtResultsTotal\'>Total</th>                    <th class=\'no-sort\'>Graph Result by Year</th>                </tr>            </thead>            <tbody data-binding=\'{@source: resultsTableData}\'>                <tr data-binding=\'{@template-for: resultsTableData}\'>                    <td data-binding=\'{@text: name}\'></td>                    <td data-binding=\'{@text: display}{data-sort-value: total}\'></td>                    <td><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleResultsChart}\'>See Graph</a></td>                </tr>            </tbody>        </table>        <fieldset data-binding=\'{@visible: resultsFieldSetVisible}\'>            <legend data-binding=\'{@text:resultsChartLegendText}\'>Title of Current Chart</legend>            <div class=\'oeOWRTAreaResultsChart\' data-region-name=\'oeOWRTAreaResultsChart\' ></div>                                </fieldset>    </div>    </div>';
var markup2 = '<div class=\'oe_owrtPR-module-view\'>    <div class=\'oeOWRTReportLoading\' data-binding=\'{@visible: loaderVisible}\'>        <img data-binding=\'{@visible: loaderSpinner}\' src=\'Resources/Images/Custom/project_loader.gif\' />        <img data-binding=\'{@visible: loaderWarnIcon}\' src=\'Resources/Images/Custom/warning.png\' />        <div class=\'oeOWRTwarningMessage\' data-binding=\'{@text: loaderMessage}\'>Loading report...</div>        <div data-binding=\'{@visible: inputBlockOnError}\' class=\'oeOWRTerrorInput\'>            <div>Have a valid project number? <br />Enter a project number below and press enter.</div>            <input name=\'project_nbr\' data-binding=\'{@event-onchange: loadProjectNbr}\' />        </div>    </div>    <div class=\'oeOWRTPrintButton\' data-binding=\'{@visible: printButtonVisible}\' >        <button data-binding=\'{@event-onclick: printReport}\'><img style=\'width:16px;\' src=\'Resources/Images/Icons/print-24.png\' />&nbsp;&nbsp; Print</button>    </div>    <div class=\'oeOWRTReportTabs\'>        <div data-binding=\'{className: tabMainClassName}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabMain}\'>Report</a></div>        <div data-binding=\'{className: tabChartsClassName}\'><a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleTabCharts}\'>Charts</a></div>    </div>    <div class=\'oeOWRTReportMain\' data-binding=\'{@visible: mainReportVisible}\'>        <div class=\'oe_owrtPR-row\'>            <div class=\'oe_owrtPR-column\'>                <fieldset class=\'oe_owrtPR-Info\'>                    <legend>Restoration Project Information</legend>                    <h1>Project Number</h1>                    <div data-binding=\'{@text:project_nbr}\'></div>                    <h1>Project Name</h1>                    <div data-binding=\'{@text:project_name}\'></div>                    <h1>Project Dates</h1>                    <div>Start: <span data-binding=\'{@text:project_start_year}\'></span></div>                    <div>Completion: <span data-binding=\'{@text:project_complete_year}\'></span></div>                    <h1>Project Activities</h1>                    <div data-binding=\'{@text:project_activities_blob}\'></div>                    <h1>Project Site Selection</h1>                    <div data-binding=\'{@text:project_site_selection}\'></div>                    <h1>Species</h1>                    <div data-binding=\'{@text:project_speices_observe}\'></div>                </fieldset>                <fieldset class=\'oeOwrtPRparticipants\'>                    <legend>Project Participants &amp; Funding</legend>                    <div class=\'oeParticipantDivTable\'>                        <div class=\'oeTableRowHeader\'>                            <div>Participant(s)</div>                            <div style=\'padding-right:5px\'>Cash</div>                            <div>In-Kind</div>                        </div>                        <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_partcipants}\'>                            <div class=\'oeTableRow oeTableRowAltColors\' data-binding=\'{@template-for: project_partcipants}\'>                                <div class=\'oePartCell oePartCellParticipant\'>                                    <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleElement}\'>                                        <img data-binding=\'{@visible: collapseImgVisisble}\' src=\'Resources/Images/Custom/collapse.gif\' /><img data-binding=\'{@visible: expandImgVisisble}\' src=\'Resources/Images/Custom/expand.gif\' /> <span data-binding=\'{@text: participant}\'></span>                                    </a>                                    <div class=\'participantDiv\' data-binding=\'{id: htmlID}{@visible: visible}\'>                                        <span data-binding=\'{@text: contact}\'></span>                                        <h1>Roles</h1>                                        <ul data-binding=\'{@source:roles}\'>                                            <li data-binding=\'{@template-for: roles} {@text: name}\'></li>                                        </ul>                                        <h2>Type of Participant</h2>                                        <ul data-binding=\'{@source:types}\'>                                            <li data-binding=\'{@template-for: types} {@text: name}\'></li>                                        </ul>                                    </div>                                </div>                                <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: cash}\'></div>                                <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: inkind}\'></div>                            </div>                        </div>                    </div>                </fieldset>                                            </div>            <div class=\'oe_owrtPR-column\'>                <div class=\'oe_owrtPR-Activities\'>Restoration Activities</div>                <div class=\'oeOWRTactivityBoxes\' data-binding=\'{@source: project_activites_observe}\'>                    <strong>Activities:</strong>&nbsp;                    <div data-binding=\'{@template-for: project_activites_observe}\'>                        <img src=\'Resources/Images/Custom/10x10_transparent.png\' data-binding=\'{style: colorFromLegend}\' />&nbsp;<span data-binding=\'{@text: activity_type}\'></span> &nbsp;                    </div>                </div>                <fieldset class=\'oeOwrtActivityOverview\'>                    <legend>Activity Overview</legend>                    <h1>Cost By Activity Type</h1>                    <div class=\'oeActivityByFundingTable\'>                        <div class=\'oeActivityByFundingHeader\'>                            <div>Activity Type</div>                            <div>Cash</div>                            <div>In-Kind</div>                            <div>TOTAL</div>                        </div>                        <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_activites_observe}\'>                            <div class=\'oeActivityByFundingRow\' data-binding=\'{@template-for: project_activites_observe}\'>                                <div data-binding=\'{@text: activity_type}\'></div>                                <div data-binding=\'{@text: cash}\'></div>                                <div data-binding=\'{@text: inkind}\'></div>                                <div data-binding=\'{@text: total}\'></div>                            </div>                        </div>                    </div>                    <h1>Results by Activity Type</h1>                    <div class=\'oeActResultsTable\'>                        <div class=\'oeAcResultsHeader\'>                            <div>Activity Type</div>                            <div>Quantity</div>                            <div>Result</div>                        </div>                        <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_results_observe}\'>                            <div class=\'oeActResultsRow\' data-binding=\'{@template-for: project_results_observe}\'>                                <div data-binding=\'{@text: activity_type}\'></div>                                <div data-binding=\'{@text: quantity}\'></div>                                <div data-binding=\'{@text: result}\'></div>                            </div>                        </div>                    </div>                    <h1>Goals</h1>                    <ul class=\'oeOWRTactivityGoals\' data-binding=\'{@source: project_goals_observe}\'>                        <li data-binding=\'{@template-for: project_goals_observe}{@text: goal}\'></li>                    </ul>                </fieldset>                <fieldset class=\'oeOwrtTreatmentMetrics\'>                    <legend>Treatments &amp; Metrics</legend>                    <ul data-binding=\'{@source: project_metrics_observe}\'>                        <li data-binding=\'{@template-for: project_metrics_observe}\'>                            <div data-binding=\'{@text: treatment}\'></div>                            <table style=\'clear:both;\' data-binding=\'{@visible: visible}\'>                                <tbody data-binding=\'{@source: metrics}\'>                                    <tr data-binding=\'{@template-for: metrics}\'>                                        <td class=\'oeOwrtTreatmentMetricsDescriptionColumn\' data-binding=\'{@text: metric}\'></td>                                        <td class=\'oeOwrtTreatmentMetricsValueColumn\' data-binding=\'{@text: displayValue}\'></td>                                    </tr>                                </tbody>                            </table>                        </li>                    </ul>                </fieldset>            </div>            <div class=\'oe_owrtPR-column\'>                <fieldset class=\'oe_owrtPR-Loc\'>                    <legend>Project Location</legend>                    <div id=\'oe_owrtPR_divMap\' data-binding=\'{@visible: locatorMapVisible}\' style=\'position: relative; width: 280px; height: 250px;\'></div>                    <div class=\'oeOWRTlocationData\'>                        <h1>Basin</h1>                        <div data-binding=\'{@text:project_watershed}\'></div>                        <h1>Sub-Basin</h1>                        <div data-binding=\'{@text:project_subwatershed}\'></div>                        <h1>Tributary Of</h1>                        <div data-binding=\'{@text:project_tributary_of}\'></div>                        <h1>Stream</h1>                        <div data-binding=\'{@text:project_stream_name}\'></div>                        <h1>Township, Range, Section</h1>                        <div data-binding=\'{@text:project_townshipRangeSection}\'></div>                        <h1>Dominant Land Use</h1>                        <div data-binding=\'{@text:project_dominant_land_use}\'></div>                    </div>                </fieldset>            </div>        </div>    </div>    <div class=\'oeOWRTReportCharts\' data-binding=\'{@visible: chartReportVisible}\'>                <table class=\'oeDetailChartTable\'>            <tr>                <td>                    <fieldset class=\'oeChartsFieldSet\'>                        <legend>Participant Funding</legend>                        <div class=\'OE_pieChartFunding\' data-region-name=\'OE_pieChartFunding\'></div>                    </fieldset>                </td>                <td>                    <fieldset class=\'oeChartsFieldSet\'>                        <legend>Activity Funding</legend>                        <div class=\'OE_pieChartActivity\' data-region-name=\'OE_pieChartActivity\'></div>                    </fieldset>                </td>            </tr>        </table>    </div>                <div id=\'oeOWRTDetailReportPrintArea\' data-binding=\'{@visible:printAreaVisible}\'>                        <div class=\'oe_owrtPR-Activities\'>OWRT Project Report</div>        <br />        <table class=\'oeOWRTDetailReportPrintTable\'>            <tr>                <td>                    <fieldset class=\'oe_owrtPR-Info\' style=\'font-size:0.8em;\'>                        <legend>Restoration Project Information</legend>                        <h1>Project Number</h1>                        <div data-binding=\'{@text:project_nbr}\'></div>                        <h1>Project Name</h1>                        <div data-binding=\'{@text:project_name}\'></div>                        <h1>Project Dates</h1>                        <div>Start: <span data-binding=\'{@text:project_start_year}\'></span></div>                        <div>Completion: <span data-binding=\'{@text:project_complete_year}\'></span></div>                        <h1>Project Activities</h1>                        <div data-binding=\'{@text:project_activities_blob}\'></div>                        <h1>Project Site Selection</h1>                        <div data-binding=\'{@text:project_site_selection}\'></div>                        <h1>Species</h1>                        <div data-binding=\'{@text:project_speices_observe}\'></div>                    </fieldset>                </td>                <td>                    <fieldset class=\'oe_owrtPR-Loc\' style=\'font-size:0.8em\'>                        <legend>Project Location</legend>                        <div id=\'oe_owrtPR_divMapPrint\' style=\'position: relative; width: 256px; height: 256px;\'></div>                        <div class=\'oeOWRTlocationData\'>                            <h1>Basin</h1>                            <div data-binding=\'{@text:project_watershed}\'></div>                            <h1>Sub-Basin</h1>                            <div data-binding=\'{@text:project_subwatershed}\'></div>                            <h1>Tributary Of</h1>                            <div data-binding=\'{@text:project_tributary_of}\'></div>                            <h1>Stream</h1>                            <div data-binding=\'{@text:project_stream_name}\'></div>                            <h1>Township, Range, Section</h1>                            <div data-binding=\'{@text:project_townshipRangeSection}\'></div>                            <h1>Dominant Land Use</h1>                            <div data-binding=\'{@text:project_dominant_land_use}\'></div>                        </div>                    </fieldset>                </td>            </tr>        </table>        <div style=\'page-break-before:always\'></div>        <div class=\'oe_owrtPR-Activities\'>Participants and Funding</div>        <br />        <table class=\'oeOWRTDetailReportPrintTable\'>            <tr>                <td>                    <fieldset class=\'oeOwrtPRparticipants\' style=\'width:700px; font-size:0.8em\'>                        <legend>Project Participants &amp; Funding</legend>                        <div class=\'oeParticipantDivTable\'>                            <div class=\'oeTableRowHeader\'>                                <div>Participant(s)</div>                                <div style=\'padding-right:5px\'>Cash</div>                                <div>In-Kind</div>                            </div>                            <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_partcipants}\'>                                <div class=\'oeTableRow oeTableRowAltColors\' data-binding=\'{@template-for: project_partcipants}\'>                                    <div class=\'oePartCell oePartCellParticipant\' style=\'width:500px\'>                                        <div data-binding=\'{@visible: showParticipantBlock}\'>                                            <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleElement}\'>                                                <span data-binding=\'{@text: participant}\'></span>                                            </a>                                            <div class=\'participantDiv\' data-binding=\'{id: htmlID}\'>                                                <span data-binding=\'{@text: contact}\' style=\'padding: 0 0 0 1em;\'></span>                                                <h1>Roles</h1>                                                <ul data-binding=\'{@source:roles}\'>                                                    <li data-binding=\'{@template-for: roles} {@text: name}\'></li>                                                </ul>                                                <h2>Type of Participant</h2>                                                <ul data-binding=\'{@source:types}\'>                                                    <li data-binding=\'{@template-for: types} {@text: name}\'></li>                                                </ul>                                            </div>                                        </div>                                    </div>                                    <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: cash}\'></div>                                    <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: inkind}\'></div>                                </div>                            </div>                        </div>                    </fieldset>                </td>            </tr>        </table>                <div style=\'page-break-before:always\'></div>                <div class=\'oe_owrtPR-Activities\'>Restoration Activities</div>                        <table class=\'oeOWRTDetailReportPrintTable\'>            <tr>                <td colspan=\'2\'>                    <div class=\'oeOWRTactivityBoxes\' data-binding=\'{@source: project_activites_observe}\' style=\'text-align:left; padding-left:40px\'>                        <strong>Activities:</strong>&nbsp;                        <div data-binding=\'{@template-for: project_activites_observe}\'>                            <img src=\'Resources/Images/Custom/10x10_transparent.png\' data-binding=\'{style: colorFromLegend}\' />&nbsp;<span data-binding=\'{@text: activity_type}\'></span> &nbsp;                        </div>                    </div>                </td>            </tr>            <tr>                <td>                                                           <fieldset class=\'oeOwrtActivityOverview\' style=\'font-size:0.8em\'>                        <legend>Activity Overview</legend>                        <h1>Cost By Activity Type</h1>                        <div class=\'oeActivityByFundingTable\'>                            <div class=\'oeActivityByFundingHeader\'>                                <div>Activity Type</div>                                <div>Cash</div>                                <div>In-Kind</div>                                <div>TOTAL</div>                            </div>                            <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_activites_observe}\'>                                <div class=\'oeActivityByFundingRow\' data-binding=\'{@template-for: project_activites_observe}\'>                                    <div data-binding=\'{@text: activity_type}\'></div>                                    <div data-binding=\'{@text: cash}\'></div>                                    <div data-binding=\'{@text: inkind}\'></div>                                    <div data-binding=\'{@text: total}\'></div>                                </div>                            </div>                        </div>                        <h1>Results by Activity Type</h1>                        <div class=\'oeActResultsTable\'>                            <div class=\'oeAcResultsHeader\'>                                <div>Activity Type</div>                                <div>Quantity</div>                                <div>Result</div>                            </div>                            <div class=\'oeTableRowsContainer\' data-binding=\'{@source: project_results_observe}\'>                                <div class=\'oeActResultsRow\' data-binding=\'{@template-for: project_results_observe}\'>                                    <div data-binding=\'{@text: activity_type}\'></div>                                    <div data-binding=\'{@text: quantity}\'></div>                                    <div data-binding=\'{@text: result}\'></div>                                </div>                            </div>                        </div>                        <h1>Goals</h1>                        <ul class=\'oeOWRTactivityGoals\' data-binding=\'{@source: project_goals_observe}\'>                            <li data-binding=\'{@template-for: project_goals_observe}{@text: goal}\'></li>                        </ul>                    </fieldset>                </td>                <td>                                       <fieldset class=\'oeOwrtTreatmentMetrics\' style=\'font-size:0.8em\'>                        <legend>Treatments &amp; Metrics</legend>                        <ul data-binding=\'{@source: project_metrics_observe}\'>                            <li data-binding=\'{@template-for: project_metrics_observe}\'>                                <div data-binding=\'{@text: treatment}\'></div>                                <table style=\'clear:both;\' data-binding=\'{@visible: visible}\'>                                    <tbody data-binding=\'{@source: metrics}\'>                                        <tr data-binding=\'{@template-for: metrics}\'>                                            <td class=\'oeOwrtTreatmentMetricsDescriptionColumn\' data-binding=\'{@text: metric}\'></td>                                            <td class=\'oeOwrtTreatmentMetricsValueColumn\' data-binding=\'{@text: displayValue}\'></td>                                        </tr>                                    </tbody>                                </table>                            </li>                        </ul>                    </fieldset>                </td>            </tr>        </table>        <div style=\'page-break-before:always\'></div>        <div class=\'oe_owrtPR-Activities\'>Funding Charts</div>        <br />        <table class=\'oeOWRTDetailReportPrintTable\'>            <tr>                <td>                    <fieldset class=\'oeChartsFieldSet\' style=\'width:400px; font-size:0.8em\'>                        <legend>Activity Funding</legend>                        <div class=\'ChartActivityForPrint\' data-region-name=\'OE_ChartActivityForPrint\'></div>                    </fieldset>                </td>                <td>                    <fieldset class=\'oeChartsFieldSet\' style=\'width:400px; font-size:0.8em\'>                        <legend>Participant Funding</legend>                                        <div class=\'ChartFundingForPrint\' data-region-name=\'OE_ChartFundingForPrint\'></div>                    </fieldset>                </td>            </tr>        </table>            </div>    </div>';
var markup3 = '<div class=\'oeTableRow oeTableRowAltColors\' data-binding=\'{@source: project_partcipants}{@template-for: project_partcipants}\'>    <div class=\'oePartCell oePartCellParticipant\' style=\'width:500px\'>        <a href=\'javascript:void(0)\' data-binding=\'{@event-onclick: toggleElement}\'>            <span data-binding=\'{@text: participant}\'></span>        </a>        <div class=\'participantDiv\' data-binding=\'{id: htmlID}\'>            <span data-binding=\'{@text: contact}\'></span>            <h1>Roles</h1>            <ul data-binding=\'{@source:roles}\'>                <li data-binding=\'{@template-for: roles} {@text: name}\'></li>            </ul>            <h2>Type of Participant</h2>            <ul data-binding=\'{@source:types}\'>                <li data-binding=\'{@template-for: types} {@text: name}\'></li>            </ul>        </div>    </div>    <div class=\'oePartCell oePartCellFundValue\'></div>    <div class=\'oePartCell oePartCellFundValue\'></div></div>';
var markup4 = '<div class=\'oeTableRow oeTableRowAltColors\' data-binding=\'{@source: project_partcipants}{@template-for: project_partcipants}\'>    <div class=\'oePartCell oePartCellParticipant\' style=\'width:500px\'></div>    <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: cash}\'></div>    <div class=\'oePartCell oePartCellFundValue\' data-binding=\'{@text: inkind}\'></div></div>';

require({
    cache: {
        "geocortex/oe_amd/OE_OWRTReports/OE_JsonAdapter": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.Infrastructure.AMD.d.ts"/>
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
define(["require", "exports", "geocortex/charting/infrastructure/ChartPointAdapterBase", "geocortex/charting/infrastructure/Enums", "geocortex/charting/infrastructure/ChartUtils", "geocortex/charting/infrastructure/ChartPointCollection"], function (require, exports, ChartPointAdapterBase_1, Enums_1, ChartUtils_1, ChartPointCollection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_ChartPointJsonAdapter = /** @class */ (function (_super) {
        __extends(OE_ChartPointJsonAdapter, _super);
        function OE_ChartPointJsonAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Gets the value that corresponds to the supplied field in the data source.
        */
        OE_ChartPointJsonAdapter.prototype.getFieldValue = function (fieldDefinition, sourceItem, userState) {
            // Ensure we are dealing with the correct source type.
            if (!fieldDefinition || fieldDefinition.sourceType != Enums_1.ChartFieldSourceType.Json) {
                return null;
            }
            // Lookup the value in the supplied JSON object.  For example, if the field name is "year", return the value of sourceItem.year.
            if (sourceItem && sourceItem.hasOwnProperty(fieldDefinition.name)) {
                return sourceItem[fieldDefinition.name];
            }
            // No value found
            return null;
        };
        /**
         * Creates a ChartPoint instance from the provided source data item.
         */
        OE_ChartPointJsonAdapter.prototype.createChartPoint = function (sourceItem, options, userState) {
            if (!options || !options.chartCategory || !options.chartSeries) {
                return null;
            }
            if (options.chartType == null || typeof options.chartType === "undefined") {
                options.chartType = Enums_1.ChartType.Linear;
            }
            var seriesFieldValue = this.getFieldValue(options.chartSeries.field, sourceItem, userState);
            var categoryFieldValue = null;
            // If a category has been set, then try and grab the field value. Pie charts have no category (x-axis).
            if (options.chartType == Enums_1.ChartType.Linear) {
                categoryFieldValue = ChartUtils_1.ChartUtils.tryGetFieldValue(options.chartCategory.field, sourceItem, userState);
            }
            // Call base class helper method to create a chart point. Pass in the values for the series (y-axis) and category (x-axis).
            return this.createChartPointCore(sourceItem, options.chartSeries.title, seriesFieldValue, categoryFieldValue, options, userState);
        };
        /**
         * Adds ChartPoint items to the collection to match those in the data source.
         */
        OE_ChartPointJsonAdapter.prototype.fill = function (collection, source, options) {
            if (!options || !options.chartCategory || !options.chartSeries) {
                return;
            }
            if (!source || !(source instanceof Array)) {
                return;
            }
            var sourceArray = source;
            // Initialize with an empty collection if needed.
            if (!collection) {
                collection = new ChartPointCollection_1.ChartPointCollection();
            }
            for (var _i = 0, sourceArray_1 = sourceArray; _i < sourceArray_1.length; _i++) {
                var item = sourceArray_1[_i];
                // Convert raw source data into ChartPoints that can be plotted on a chart.
                var chartPoint = this.createChartPoint(item, options);
                if (chartPoint) {
                    collection.items.push(chartPoint);
                }
            }
        };
        return OE_ChartPointJsonAdapter;
    }(ChartPointAdapterBase_1.ChartPointAdapterBase));
    exports.OE_ChartPointJsonAdapter = OE_ChartPointJsonAdapter;
    geocortex.charting.ChartFieldSourceType[100] = "Json";
    geocortex.charting.ChartFieldSourceType["Json"] = 100;
});

},
"geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsAreaView": function () {
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
    var OE_OWRTReportsAreaView = /** @class */ (function (_super) {
        __extends(OE_OWRTReportsAreaView, _super);
        function OE_OWRTReportsAreaView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_OWRTReportsAreaView.prototype.toggleElement = function (event, element, context) {
            context.visible.set(!context.visible.get());
            context.collapseImgVisisble.set(!context.collapseImgVisisble.get());
            context.expandImgVisisble.set(!context.expandImgVisisble.get());
        };
        ;
        OE_OWRTReportsAreaView.prototype.toggleReportOptionPanel = function (event, element, context) {
            var val = context.reportOptionsPanelVisible.get();
            context.reportOptionsPanelVisible.set(!val);
            context.ToggleOptionsArrow(val);
        };
        OE_OWRTReportsAreaView.prototype.geoTypeChanged = function (event, element, context) {
            context.OptionsGeoTypeChanged(element.value, element.options[element.selectedIndex].text);
        };
        OE_OWRTReportsAreaView.prototype.areaOptionChanged = function (event, element, context) {
            context.OptionsAreaChanged(element.value, element.options[element.selectedIndex].text);
        };
        OE_OWRTReportsAreaView.prototype.reportOptionsSubmission = function (event, element, context) {
            context.ReportOptionsSubmission();
        };
        OE_OWRTReportsAreaView.prototype.toggleTabOverview = function (event, element, context) {
            context.LoadOverviewTab();
        };
        OE_OWRTReportsAreaView.prototype.toggleTabProjects = function (event, element, context) {
            context.LoadProjectsTab();
        };
        OE_OWRTReportsAreaView.prototype.toggleTabFunding = function (event, element, context) {
            context.LoadFundingTab();
        };
        OE_OWRTReportsAreaView.prototype.toggleTabResults = function (event, element, context) {
            context.LoadResultsTab();
        };
        OE_OWRTReportsAreaView.prototype.toggleProjectsChartYear = function (event, element, context) {
            context.ShowChart("projects", "year");
        };
        OE_OWRTReportsAreaView.prototype.toggleProjectsChartActivity = function (event, element, context) {
            context.ShowChart("projects", "activity");
        };
        OE_OWRTReportsAreaView.prototype.toggleFundingChartTotal = function (event, element, context) {
            context.ShowChart("funding", "total");
        };
        OE_OWRTReportsAreaView.prototype.toggleFundingChartYear = function (event, element, context) {
            context.ShowChart("funding", "year");
        };
        OE_OWRTReportsAreaView.prototype.toggleFundingChartActivity = function (event, element, context) {
            context.ShowChart("funding", "activity");
        };
        OE_OWRTReportsAreaView.prototype.toggleFundingChartActivityYear = function (event, element, context) {
            context.ShowChart("funding", "activityYear");
        };
        OE_OWRTReportsAreaView.prototype.toggleFundingChartSource = function (event, element, context) {
            context.ShowChart("funding", "source");
        };
        OE_OWRTReportsAreaView.prototype.toggleResultsChart = function (event, element, context) {
            var vm = this.viewModel;
            vm.ShowChart("results", context.chart, context.name);
        };
        OE_OWRTReportsAreaView.prototype.toggleChartDataAsTable = function (event, element, context) {
            context.ToggleChartTableView();
        };
        OE_OWRTReportsAreaView.prototype.loadAreaReport = function (event, element, context) {
            console.log("Load Area Report");
            //context._oeReportQueries(element.value);
        };
        return OE_OWRTReportsAreaView;
    }(ViewBase_1.ViewBase));
    exports.OE_OWRTReportsAreaView = OE_OWRTReportsAreaView;
});

},
"geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsAreaViewModel": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
/// <reference path="./../../_Definitions/Mapping.Infrastructure.AMD.d.ts" />
/// <reference path="./../../_Definitions/dojo.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework/observables", "geocortex/charting/Chart", "geocortex/charting/infrastructure/ChartPointAdapterRegistry", "geocortex/charting/infrastructure/Enums", "../OE_OWRTReports/OE_JsonAdapter"], function (require, exports, ViewModelBase_1, observables_1, observables_2, Chart_1, ChartPointAdapterRegistry_1, Enums_1, OE_JsonAdapter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_OWRTReportsViewModelSequenceTask = /** @class */ (function () {
        function OE_OWRTReportsViewModelSequenceTask(qt, queryIn, listenersIn, relationshipQuery, isIDQueryIn, isCountQueryIn, largeRequestIn, isDistinctIn) {
            if (relationshipQuery === void 0) { relationshipQuery = false; }
            if (isIDQueryIn === void 0) { isIDQueryIn = false; }
            if (isCountQueryIn === void 0) { isCountQueryIn = false; }
            if (largeRequestIn === void 0) { largeRequestIn = null; }
            if (isDistinctIn === void 0) { isDistinctIn = false; }
            this.queryTask = qt;
            this.query = queryIn;
            this.isRelationshipsQuery = relationshipQuery;
            this.isIDQuery = isIDQueryIn;
            this.largeRequest = largeRequestIn;
            this.listeners = listenersIn;
            this.isCountQuery = isCountQueryIn;
            this.isDistinct = isDistinctIn;
        }
        return OE_OWRTReportsViewModelSequenceTask;
    }());
    exports.OE_OWRTReportsViewModelSequenceTask = OE_OWRTReportsViewModelSequenceTask;
    var OE_LargeRecordRequest = /** @class */ (function () {
        function OE_LargeRecordRequest() {
            this.maxRecordCount = 0;
            this.totalRecords = 0;
            this.isDistinct = false;
            this.queryGeometry = null;
            this.workingOffset = 0;
        }
        OE_LargeRecordRequest.prototype.SetupRequest = function (urlIn, whereIn, queryGeometryIn, fieldNamesIn, logNameIn, onCompleteIn, modelRefIn, targetFeatureSetIn, isDistinctIn) {
            if (isDistinctIn === void 0) { isDistinctIn = false; }
            this.url = urlIn;
            this.fieldnames = fieldNamesIn;
            this.where = whereIn;
            this.queryGeometry = queryGeometryIn;
            this.allFeatures = null;
            this.logName = logNameIn;
            this.workingOffset = 0;
            this.isDistinct = isDistinctIn;
            this.errors = "";
            this.onComplete = onCompleteIn;
            this.modelRef = modelRefIn;
            this.targetFeatureSet = targetFeatureSetIn;
        };
        OE_LargeRecordRequest.prototype.StartRequest = function () {
            this._GetMaxeRecordCount(this.url);
        };
        OE_LargeRecordRequest.prototype._GetMaxeRecordCount = function (queryUrl) {
            //MaxRecordCount (get from config)
            var esriRequest = esri.request({
                url: queryUrl,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback"
            });
            var thisRef = this;
            esriRequest.then(function (response) {
                //console.log("MaxRecordCount Request: " + response);
                thisRef.maxRecordCount = response.maxRecordCount;
                thisRef._GetTotalRecords(thisRef.url);
            }, function (error) {
                console.log(error);
                thisRef.modelRef.StopOnErrorMessage("Max query size failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + error);
            });
        };
        OE_LargeRecordRequest.prototype._GetTotalRecords = function (queryUrl) {
            var query = new esri.tasks.Query();
            if (this.queryGeometry != null)
                query.geometry = this.queryGeometry;
            query.where = this.where;
            query.returnGeometry = false;
            var queryTask = new esri.tasks.QueryTask(this.url);
            var thisRef = this;
            queryTask.on("execute-for-count-complete", function (event) {
                if (event.count > 0) {
                    thisRef.totalRecords = event.count;
                    thisRef._DoQueryLoop(thisRef.url);
                }
                else {
                    console.log("Count is zero or null.");
                    thisRef.totalRecords = 0;
                    thisRef._DoQueryLoop(thisRef.url);
                }
            });
            queryTask.on("error", function (event) {
                console.log(event.target.url);
                console.log(event.error);
                thisRef.modelRef.StopOnErrorMessage("Count failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
            });
            queryTask.executeForCount(query);
        };
        OE_LargeRecordRequest.prototype._DoQueryLoop = function (queryUrl) {
            var query = new esri.tasks.Query();
            if (this.queryGeometry != null) {
                query.geometry = this.queryGeometry;
                //query.geometryPrecision
                //query.maxAllowableOffset
            }
            query.where = this.where;
            query.returnGeometry = false;
            query.outFields = this.fieldnames;
            query.start = this.workingOffset;
            query.num = this.maxRecordCount;
            query.returnDistinctValues = this.isDistinct;
            var queryTask = new esri.tasks.QueryTask(this.url);
            var thisRef = this;
            var onSuccess = queryTask.on("complete", function (event) {
                if (typeof event != "undefined" && typeof event.featureSet != "undefined") {
                    //thisRef.allFeatureSets.push(response);
                    if (thisRef.allFeatures == null)
                        thisRef.allFeatures = event.featureSet.features;
                    else
                        thisRef.allFeatures = thisRef.allFeatures.concat(event.featureSet.features);
                    thisRef._CheckIfLoopIsDone();
                }
                else {
                    console.log("Query failed.");
                    console.log(event.target.url);
                    thisRef.modelRef.StopOnErrorMessage("Query loop failed: no event or featureset.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet);
                }
            });
            var onError = queryTask.on("error", function (event) {
                console.log(event.target.url);
                console.log(event.error);
                thisRef.modelRef.StopOnErrorMessage("Query loop failed.  " + thisRef.url + "  Target: " + thisRef.targetFeatureSet + "  Error: " + event.error);
            });
            this.listeners = [onSuccess, onError];
            queryTask.execute(query);
        };
        OE_LargeRecordRequest.prototype._CheckIfLoopIsDone = function () {
            this.workingOffset += this.maxRecordCount;
            //request more records
            if (this.workingOffset < this.totalRecords) {
                //clear previous listeners
                if (typeof this.listeners !== "undefined" && this.listeners != null) {
                    for (var i = 0; i < this.listeners.length; i++)
                        this.listeners[i].remove();
                }
                this._DoQueryLoop(this.url);
            }
            else //done
             {
                this._AllFinished();
            }
        };
        OE_LargeRecordRequest.prototype._AllFinished = function () {
            //console.log("Total Features: " + this.allFeatures.length);
            //clear previous listeners
            if (typeof this.listeners !== "undefined" && this.listeners != null) {
                for (var i = 0; i < this.listeners.length; i++)
                    this.listeners[i].remove();
            }
            if (typeof this.targetFeatureSet !== "undefined" && this.targetFeatureSet != null && this.targetFeatureSet != "")
                this.modelRef[this.targetFeatureSet] = this.allFeatures;
            if (this.onComplete)
                this.onComplete();
        };
        return OE_LargeRecordRequest;
    }());
    exports.OE_LargeRecordRequest = OE_LargeRecordRequest;
    var OE_OWRTReportsAreaViewModel = /** @class */ (function (_super) {
        __extends(OE_OWRTReportsAreaViewModel, _super);
        function OE_OWRTReportsAreaViewModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.geoService = "http://arcgis.oregonexplorer.info/arcgis/rest/services/Utilities/Geometry/GeometryServer";
            _this.loaderVisible = new observables_1.Observable(true);
            _this.loaderMessage = new observables_1.Observable("Loading Report...");
            _this.loaderSpinner = new observables_1.Observable(true);
            _this.loaderWarnIcon = new observables_1.Observable(false);
            _this.inputBlockOnError = new observables_1.Observable(false);
            _this.loaderProjectsVisible = new observables_1.Observable(false);
            _this.loaderFundsVisible = new observables_1.Observable(false);
            _this.loaderResultsVisible = new observables_1.Observable(false);
            _this.loadSpinnerProjects = new observables_1.Observable(true);
            _this.loadSpinnerFunding = new observables_1.Observable(true);
            _this.loadSpinnerResults = new observables_1.Observable(true);
            _this.primaryQueryString = new observables_1.Observable("1=1");
            _this.primaryObjectIDString = new observables_1.Observable("");
            _this.requiredFeaturesLoaded = new observables_1.Observable(false);
            _this.esriMapPrimaryQuery = new observables_1.Observable("1=1");
            _this.esriPointsLayer = null;
            _this.chartPartVisible = new observables_1.Observable(true);
            _this.chartActVisible = new observables_1.Observable(false);
            _this.chartFundingActivity = null;
            _this.chartFundingActivityData = {};
            _this.chartFundingPart = null;
            _this.chartFundingPartData = {};
            //drop down menus, area geometry, activity types for chart table view
            _this.fsBasins = null;
            _this.fsHUC8 = null;
            _this.fsCounty = null;
            _this.fsWSC = null;
            _this.fsSWCD = null;
            _this.fsSelectedAreaGeometry = null;
            _this.fsActivityTypeStrings = null;
            _this.owebRequestsCount = 0;
            _this.owebRequestsDone = 0;
            _this.owebRequestsErrors = null;
            _this.activeTab = "overview";
            //async completion tallies
            _this.toCompleteProject = 1;
            _this.toCompleteFunds = 3;
            _this.toCompleteResults = 1;
            _this.toCompleteProjectCurrent = 0;
            _this.toCompleteFundsCurrent = 0;
            _this.toCompleteResultsCurrent = 0;
            _this.selectedAreaGeometry = null;
            _this.graphicsArrayPrimaryRecords = null;
            _this.sequenceTasks = [];
            _this.sequenceErrors = "";
            _this.sequenceOnComplete = null;
            _this.sequenceLastTask = null;
            _this.owrtActivitySymbols = [];
            _this.isCustomReport = false;
            _this.customGeometry = null;
            _this.optionsImageSrc = new observables_1.Observable("Resources/Images/Icons/arrow-right-small-24.png");
            _this.reportOptionsPanelVisible = new observables_1.Observable(false);
            _this.reportAreaListVisible = new observables_1.Observable(false);
            _this.reportAreaList = new observables_2.ObservableCollection(null);
            _this.yearMin = 1995;
            _this.yearMax = 2018;
            _this.startYearDefault = 1995;
            _this.endYearDefault = 2018;
            _this.startYear = new observables_1.Observable(_this.startYearDefault.toString());
            _this.endYear = new observables_1.Observable(_this.endYearDefault.toString());
            _this.yearRangeString = new observables_1.Observable("");
            _this.geoTypeList = new observables_2.ObservableCollection([]);
            _this.geoTypeName = new observables_1.Observable("State");
            _this.geoTypeValue = new observables_1.Observable("state");
            _this.geoTypeGeometryLayerDef = new observables_1.Observable("");
            _this.areaNameVisisble = new observables_1.Observable(false);
            _this.areaName = new observables_1.Observable("");
            _this.areaNameSelected = new observables_1.Observable("");
            _this.areaNamePointsQueryString = new observables_1.Observable("1=1");
            _this.areaNamePolyQueryString = new observables_1.Observable("");
            //table data view
            _this.owrtChartsTableContainerVisible = new observables_1.Observable(false);
            _this.owrtChartsTableSharedVisible = new observables_1.Observable(false);
            _this.owrtTableLinkText = new observables_1.Observable("Table View");
            _this.owrtTableLinkImg = new observables_1.Observable("Resources/Images/Icons/paging-control-table-24.png");
            _this.owrtChartTableLinkVisible = new observables_1.Observable(false);
            //shared table        
            _this.owrtTableHdrName = new observables_1.Observable("");
            _this.owrtTableHdrValue = new observables_1.Observable("");
            _this.owrtTableData = new observables_2.ObservableCollection(null); //{"name:"","value":0}    
            //projects table
            _this.owrtChartProjectsVisible = new observables_1.Observable(true);
            _this.owrtTableProjectsVisible = new observables_1.Observable(false);
            _this.owrtTableProjectsHeader = new observables_1.Observable("");
            _this.owrtTableProjectsValue = new observables_1.Observable("");
            _this.owrtTableProjectsData = new observables_2.ObservableCollection(null); //{"name:"","value":0}    
            //funding table
            _this.owrtChartFundsVisible = new observables_1.Observable(true);
            _this.owrtTableFundsVisible = new observables_1.Observable(false);
            _this.owrtTableFundInvestByYearVisible = new observables_1.Observable(false);
            _this.owrtTableFundInvestByActByYearVisible = new observables_1.Observable(false);
            _this.owrtTableFundsHeader = new observables_1.Observable("");
            _this.owrtTableFundsValue = new observables_1.Observable("");
            _this.owrtTableFundsData = new observables_2.ObservableCollection(null); //{"name:"","value":0}    
            //results table
            _this.owrtChartResultsVisible = new observables_1.Observable(true);
            _this.owrtTabletResultsVisible = new observables_1.Observable(false);
            _this.owrtTabletResultsHeader = new observables_1.Observable("");
            _this.owrtTabletResultsValue = new observables_1.Observable("");
            _this.owrtTabletResultsData = new observables_2.ObservableCollection(null); //{"name:"","value":0}
            //funding invest by year table
            _this.owrtTableDataFundInvestByYear = new observables_2.ObservableCollection(null); //{"year:0,"cash":0,"inkind":0}    
            //funding invest by act by year table
            _this.owrtTableDataFundInvestByActByYear = new observables_2.ObservableCollection(null); //{"year:0,"combined":0,"upland":0,"instream":0.....etc}    
            //overview
            _this.areaPanelOverviewVisisble = new observables_1.Observable(true);
            _this.areaTotalProjects = new observables_1.Observable("0");
            _this.areaTotalInvestment = new observables_1.Observable("0");
            _this.tabOverviewClass = new observables_1.Observable("oeOWRTAreaTabEnabled");
            _this.areaMapLegend = new observables_1.Observable("Map");
            _this.ranksVisible = new observables_1.Observable(false);
            _this.rankingsCount = [];
            _this.rankingsInvestment = [];
            //projects    
            _this.projectsTabProcessed = false;
            _this.projectChartLegendText = new observables_1.Observable("");
            _this.areaPanelProjectsVisisble = new observables_1.Observable(false);
            _this.tabProjectsClass = new observables_1.Observable("");
            _this.oeOWRTProjChartYearClass = new observables_1.Observable("oeOWRTAreaChartSelectionBoxSelected");
            _this.oeOWRTProjChartActivityClass = new observables_1.Observable("");
            //funding
            _this.fundingTabProcessed = false;
            _this.areaPanelFundingVisisble = new observables_1.Observable(false);
            _this.tabFundingClass = new observables_1.Observable("");
            _this.fundingChartLegendText = new observables_1.Observable("");
            _this.oeOWRTFundingChartTotalClass = new observables_1.Observable("oeOWRTAreaChartSelectionBoxSelected");
            _this.oeOWRTFundingChartYearClass = new observables_1.Observable("");
            _this.oeOWRTFundingChartActivityClass = new observables_1.Observable("");
            _this.oeOWRTFundingChartActivityYearClass = new observables_1.Observable("");
            _this.oeOWRTFundingChartSourceClass = new observables_1.Observable("");
            //results
            _this.resultsTabProcessed = false;
            _this.areaPanelResultsVisisble = new observables_1.Observable(false);
            _this.tabResultsClass = new observables_1.Observable("");
            _this.resultsTableData = new observables_2.ObservableCollection(null);
            _this.resultsChartLegendText = new observables_1.Observable("");
            _this.resultsFieldSetVisible = new observables_1.Observable(false);
            _this.oeOWRTResultsChartCrossingsClass = new observables_1.Observable("");
            return _this;
        }
        OE_OWRTReportsAreaViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            this.reportMapServiceName = config.reportMapServiceName || "OWRT";
            if (site && site.isInitialized) {
                this._onSiteInitialized();
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized();
                });
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.deactivated = function () {
            this._destoryActiveChart();
            //remove all map layers
            if (!this._IsNullOrEmpty(this.esriMap))
                this.esriMap.removeAllLayers();
        };
        OE_OWRTReportsAreaViewModel.prototype._onSiteInitialized = function () {
            var _this = this;
            //register tagging command
            this.app.commandRegistry.command("oeOWRTareaReport").register(this, this.OpenAreaReport);
            Chart_1.Chart.prototype.initialize();
            //set default year selection
            var dateTmp = new Date();
            var workingYear = dateTmp.getFullYear();
            if (workingYear > this.endYearDefault)
                workingYear = this.endYearDefault;
            this.startYearDefault = workingYear - 5;
            this._injectScript();
            //this._SetupJQueryTableSort();
            // Register our custom JSON data adapter with the charting infrastructure.
            var jsonDataAdapter = new OE_JsonAdapter_1.OE_ChartPointJsonAdapter();
            var sourceTypeString = Enums_1.ChartFieldSourceType[Enums_1.ChartFieldSourceType.Json];
            ChartPointAdapterRegistry_1.ChartPointAdapterRegistry.registerAdapter(jsonDataAdapter, sourceTypeString);
            var mService = this._GetServiceByName(this.reportMapServiceName);
            this.urlMainMapService = mService.serviceUrl;
            this.layerIDProjectPoints = Number(this._GetLayerIDByName(mService, "Poly_Centroids").id);
            this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Poly_Centroids").id;
            this.queryCentroidsSimple = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "CentroidsSimple").id;
            this.queryUrlCounty = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Counties").id;
            this.queryUrlBasins = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Oregon Plan Basins").id;
            this.queryUrlHUC8 = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "8-Digit Hydrologic Unit Code").id;
            this.queryUrlWSC = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Watershed Councils").id;
            this.queryUrlActivityTypes = mService.serviceUrl + "/";
            this.queryUrlActivityTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "ACTIVITY_TYPES"))) ? "20" : this._GetTableIDByName(mService, "ACTIVITY_TYPES").id;
            console.log("ACTIVITY_TYPES: " + this.queryUrlActivityTypes);
            mService = this._GetServiceByName("Soil and Water Conservation District Boundaries (WM)");
            this.urlSWCDMapService = mService.serviceUrl;
            this.queryUrlSWCD = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "Soil and Water Conservation District Boundaries (WM)").id;
            //create the map symbol
            this.esriMapSymbolFill = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0]), 2), new esri.Color([255, 0, 0, 0.35]));
            //geotype selection list
            this.geoTypeList.clear();
            this.geoTypeList.addItems([
                { "name": "State", "value": "state" },
                { "name": "OWEB Reporting Basin", "value": "basin" },
                { "name": "Subbasin", "value": "subbasin" },
                { "name": "County", "value": "county" }
            ]);
            //{ "name": "Watershed Council", "value": "wsc" },
            //{ "name": "Soil & Water Conservation District", "value": "swcd" }
            //get the OWRT drawing color data
            var requestHandle = esri.request({
                "url": this.queryCentroidsSimple + "?f=json",
                handleAs: "json",
                callbackParamName: "callback"
            });
            requestHandle.then(function (response, io) {
                //console.log(response);
                if (response && response.drawingInfo && response.drawingInfo.renderer && response.drawingInfo.renderer.uniqueValueInfos) {
                    _this.owrtActivitySymbols = response.drawingInfo.renderer.uniqueValueInfos;
                }
            }, function (error, io) {
                console.log("OWRT symbol request error: " + error);
                _this.owrtActivitySymbols = [];
            });
        };
        OE_OWRTReportsAreaViewModel.prototype._injectScript = function () {
            $.ajax({
                type: "GET",
                url: "./Resources/Scripts/oe_added_scripts/jqueryTableSort.js",
                dataType: "script",
                success: function () {
                    //console.log('success!');
                },
                error: function (err) {
                    //console.log('fail', err);
                }
            });
        };
        //private _SetupJQueryTableSort()
        //{
        //    /*
        //         A simple, lightweight jQuery plugin for creating sortable tables.
        //         https://github.com/kylefox/jquery-tablesort
        //         Version 0.0.11
        //     */
        //    !function (t) { t.tablesort = function (e, s) { var i = this; this.$table = e, this.$thead = this.$table.find("thead"), this.settings = t.extend({}, t.tablesort.defaults, s), this.$sortCells = this.$thead.length > 0 ? this.$thead.find("th:not(.no-sort)") : this.$table.find("th:not(.no-sort)"), this.$sortCells.on("click.tablesort", function () { i.sort(t(this)) }), this.index = null, this.$th = null, this.direction = null }, t.tablesort.prototype = { sort: function (e, s) { var i = new Date, n = this, o = this.$table, l = o.find("tbody").length > 0 ? o.find("tbody") : o, a = l.find("tr").has("td, th"), r = a.find(":nth-child(" + (e.index() + 1) + ")").filter("td, th"), d = e.data().sortBy, h = [], c = r.map(function (s, i) { return d ? "function" == typeof d ? d(t(e), t(i), n) : d : null != t(this).data().sortValue ? t(this).data().sortValue : t(this).text() }); 0 !== c.length && (this.index !== e.index() ? (this.direction = "asc", this.index = e.index()) : "asc" !== s && "desc" !== s ? this.direction = "asc" === this.direction ? "desc" : "asc" : this.direction = s, s = "asc" == this.direction ? 1 : -1, n.$table.trigger("tablesort:start", [n]), n.log("Sorting by " + this.index + " " + this.direction), n.$table.css("display"), setTimeout(function () { n.$sortCells.removeClass(n.settings.asc + " " + n.settings.desc); for (var o = 0, d = c.length; o < d; o++)h.push({ index: o, cell: r[o], row: a[o], value: c[o] }); h.sort(function (t, e) { return n.settings.compare(t.value, e.value) * s }), t.each(h, function (t, e) { l.append(e.row) }), e.addClass(n.settings[n.direction]), n.log("Sort finished in " + ((new Date).getTime() - i.getTime()) + "ms"), n.$table.trigger("tablesort:complete", [n]), n.$table.css("display") }, c.length > 2e3 ? 200 : 10)) }, log: function (e) { (t.tablesort.DEBUG || this.settings.debug) && console && console.log && console.log("[tablesort] " + e) }, destroy: function () { return this.$sortCells.off("click.tablesort"), this.$table.data("tablesort", null), null } }, t.tablesort.DEBUG = !1, t.tablesort.defaults = { debug: t.tablesort.DEBUG, asc: "sorted ascending", desc: "sorted descending", compare: function (t, e) { return t > e ? 1 : t < e ? -1 : 0 } }, t.fn.tablesort = function (e) { var s, i; return this.each(function () { s = t(this), i = s.data("tablesort"), i && i.destroy(), s.data("tablesort", new t.tablesort(s, e)) }) } }((<any>window).Zepto || (<any>window).jQuery);                
        //}
        OE_OWRTReportsAreaViewModel.prototype._GetServiceByName = function (name) {
            var mService = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName == name; }).length > 0 ?
                this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === name; })[0] : null;
            return mService;
        };
        OE_OWRTReportsAreaViewModel.prototype._GetLayerIDByName = function (mService, name) {
            var workLayer = mService.layers.filter(function (ly) { return ly.name == name; }).length > 0 ?
                mService.layers.filter(function (ly) { return ly.name === name; })[0] : null;
            return workLayer;
        };
        OE_OWRTReportsAreaViewModel.prototype._GetTableIDByName = function (mService, name) {
            var workLayer = null;
            try {
                workLayer = mService.tables.filter(function (ly) { return ly.name == name; }).length > 0 ?
                    mService.tables.filter(function (ly) { return ly.name === name; })[0] : null;
            }
            catch (e) { }
            return workLayer;
        };
        OE_OWRTReportsAreaViewModel.prototype._GetFieldByTypeID = function (featureSet, idFieldName, idTarget, valueFieldName) {
            for (var i = 0; i < featureSet.features.length; i++) {
                if (featureSet.features[i].attributes[idFieldName] &&
                    featureSet.features[i].attributes[valueFieldName] &&
                    featureSet.features[i].attributes[idFieldName] == idTarget)
                    return featureSet.features[i].attributes[valueFieldName];
            }
            return "";
        };
        OE_OWRTReportsAreaViewModel.prototype._NewSequence = function (onComplete) {
            //clear tasks
            this.sequenceTasks = [];
            this.sequenceErrors = "";
            this.sequenceOnComplete = onComplete;
        };
        OE_OWRTReportsAreaViewModel.prototype._MoveCurrentSequenceProgress = function () {
            var workingThis = this;
            if (typeof workingThis["modelRef"] !== "undefined" && workingThis["modelRef"] != null)
                workingThis = workingThis["modelRef"];
            //remove any events to the last query task
            if (typeof this.sequenceLastTask != "undefined" && this.sequenceLastTask != null) {
                if (typeof this.sequenceLastTask.listeners != "undefined" && this.sequenceLastTask.listeners != null) {
                    for (var i = 0; i < this.sequenceLastTask.listeners.length; i++)
                        this.sequenceLastTask.listeners[i].remove();
                }
            }
            if (workingThis.sequenceTasks.length > 0) {
                var sTask = workingThis.sequenceTasks.pop();
                this.sequenceLastTask = sTask;
                if (sTask.largeRequest != null)
                    sTask.largeRequest.StartRequest();
                else if (sTask.isRelationshipsQuery)
                    sTask.queryTask.executeRelationshipQuery(sTask.query);
                else if (sTask.isIDQuery)
                    sTask.queryTask.executeForIds(sTask.query);
                else if (sTask.isCountQuery)
                    sTask.queryTask.executeForCount(sTask.query);
                else
                    sTask.queryTask.execute(sTask.query);
            }
            else {
                if (workingThis.sequenceOnComplete) {
                    workingThis.sequenceOnComplete();
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._sequenceQueryLarge = function (queryURL, where, queryGeometry, outFields, targetFeatureSet, logName, getGeometry, isDistinct) {
            if (getGeometry === void 0) { getGeometry = false; }
            if (isDistinct === void 0) { isDistinct = false; }
            var largeRequest = new OE_LargeRecordRequest();
            largeRequest.SetupRequest(queryURL, where, queryGeometry, outFields, logName, this._MoveCurrentSequenceProgress, this, targetFeatureSet, isDistinct);
            this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(null, null, [], false, false, false, largeRequest));
        };
        OE_OWRTReportsAreaViewModel.prototype._sequenceQuery = function (queryString, where, outFields, targetString, attString, logName, getGeometry, returnDistinctValues, orderByFields, outStats, returnIDsOnly, isCountQuery, addToFeatureSet, statsGroup) {
            var _this = this;
            if (getGeometry === void 0) { getGeometry = false; }
            if (returnDistinctValues === void 0) { returnDistinctValues = false; }
            if (orderByFields === void 0) { orderByFields = null; }
            if (outStats === void 0) { outStats = null; }
            if (returnIDsOnly === void 0) { returnIDsOnly = false; }
            if (isCountQuery === void 0) { isCountQuery = false; }
            if (addToFeatureSet === void 0) { addToFeatureSet = false; }
            if (statsGroup === void 0) { statsGroup = null; }
            var myModel = this;
            var query = new esri.tasks.Query();
            query.where = where;
            query.outFields = outFields;
            query.returnGeometry = getGeometry;
            query.returnDistinctValues = returnDistinctValues;
            if (orderByFields != null)
                query.orderByFields = orderByFields;
            if (outStats != null)
                query.outStatistics = outStats;
            if (statsGroup != null)
                query.groupByFieldsForStatistics = statsGroup;
            var queryTask = new esri.tasks.QueryTask(queryString);
            var onSuccess;
            if (isCountQuery) {
                onSuccess = queryTask.on("execute-for-count-complete", function (results) {
                    if (!myModel._IsNullOrEmpty(results.count))
                        myModel[targetString][attString] = results.count;
                    else
                        myModel[targetString][attString] = 0;
                    _this._MoveCurrentSequenceProgress();
                });
            }
            else {
                onSuccess = queryTask.on("complete", function (results) {
                    if (results && results.featureSet && results.featureSet.features.length > 0) {
                        if ($.isArray(myModel[targetString]))
                            myModel[targetString].push(results.featureSet);
                        if (!_this._IsNullOrEmpty(attString) && attString != "")
                            myModel[targetString][attString] = results.featureSet;
                        else {
                            if (results.featureSet.features.length == 1000) {
                                console.log("Possible query limit hit! " + queryString + " :: " + where);
                            }
                            if (addToFeatureSet)
                                myModel[targetString].features = myModel[targetString].features.concat(results.featureSet.features);
                            else
                                myModel[targetString] = results.featureSet;
                        }
                    }
                    else {
                        _this.sequenceErrors += logName + " Complete: Empty object or no results.";
                    }
                    _this._MoveCurrentSequenceProgress();
                });
            }
            var onError = queryTask.on("error", function (results) {
                _this.sequenceErrors += logName + " Error: " + results.error;
                _this._MoveCurrentSequenceProgress();
            });
            this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, [onSuccess, onError], false, returnIDsOnly, isCountQuery));
        };
        OE_OWRTReportsAreaViewModel.prototype._sequenceRelationshipQuery = function (queryURL, objectIDs, relationshipID, outFields, targetFeatureSet, logName, resetTargetFeatureSet, definitionExpressionIn) {
            var _this = this;
            if (resetTargetFeatureSet === void 0) { resetTargetFeatureSet = true; }
            if (definitionExpressionIn === void 0) { definitionExpressionIn = ""; }
            var myModel = this;
            var query = new esri.tasks.RelationshipQuery();
            query.objectIds = objectIDs;
            query.returnGeometry = false;
            query.relationshipId = relationshipID;
            query.outFields = outFields;
            query.definitionExpression = definitionExpressionIn;
            var queryTask = new esri.tasks.QueryTask(queryURL);
            var onSuccess = queryTask.on("execute-relationship-query-complete", function (results) {
                if (results && typeof results.featureSets != "undefined" && results.featureSets != null) {
                    if (resetTargetFeatureSet)
                        myModel[targetFeatureSet] = new esri.tasks.FeatureSet();
                    for (var i = 0; i < query.objectIds.length; i++) {
                        var workingID = query.objectIds[i];
                        if (results.featureSets.hasOwnProperty(workingID))
                            myModel[targetFeatureSet].features = myModel[targetFeatureSet].features.concat(results.featureSets[workingID].features);
                    }
                }
                else {
                    _this.sequenceErrors += logName + " Complete: Empty object or no results.";
                }
                _this._MoveCurrentSequenceProgress();
            });
            var onError = queryTask.on("error", function (results) {
                _this.sequenceErrors += logName + " Error: " + results.error;
                _this._MoveCurrentSequenceProgress();
            });
            this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, [onSuccess, onError], true));
        };
        OE_OWRTReportsAreaViewModel.prototype._GetRequredFeatureSets = function () {
            //clear tasks
            this.sequenceTasks = [];
            //setup a new sequence        
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._RequiredFeatureSetsDone; //when the follow sequence of queries are done build the relationships
            this._sequenceQuery(this.queryUrlBasins, "1=1", ["oweb_name"], "fsBasins", "", "Basins");
            this._sequenceQuery(this.queryUrlHUC8, "1=1", ["name,huc8"], "fsHUC8", "", "HUC8");
            this._sequenceQuery(this.queryUrlCounty, "1=1", ["name10"], "fsCounty", "", "Counties");
            this._sequenceQuery(this.queryUrlWSC, "1=1", ["instname"], "fsWSC", "", "WSC");
            this._sequenceQuery(this.queryUrlSWCD, "1=1", ["SWCD_Name"], "fsSWCD", "", "SWCD");
            //types
            this._sequenceQuery(this.queryUrlActivityTypes, "1=1", ["activity_type"], "fsActivityTypeStrings", "", "Activity Type Strings", false, true, ["activity_type"]);
            this._MoveCurrentSequenceProgress();
        };
        OE_OWRTReportsAreaViewModel.prototype._RequiredFeatureSetsDone = function () {
            this.requiredFeaturesLoaded.set(true);
            if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
                this._LoadReportFromURLParams();
            else
                this.ReportOptionsSubmission();
        };
        OE_OWRTReportsAreaViewModel.prototype._BuildNewReport = function () {
            //this.reportWorkingQuery = whereIn;
            this.fsSelectedAreaGeometry = null;
            //geometry is needed to query the main records set (basin, county, wsc, swcd)
            if (this.geoTypeGeometryLayerDef.get() != "") {
                this._GetReportGeometry();
            }
            else {
                this._GetReportFeatureSets();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._GetReportFeatureSets = function () {
            //clear tasks
            this.sequenceTasks = [];
            //setup a new sequence        
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._GetReportFeatureSetsDone; //when the follow sequence of queries are done build the relationships
            this.selectedAreaGeometry = null;
            var queryGeometry = null;
            if (!this._IsNullOrEmpty(this.customGeometry)) {
                this.selectedAreaGeometry = this.customGeometry;
                queryGeometry = this.customGeometry;
                this.customGeometry = null;
            }
            else if (this.fsSelectedAreaGeometry != null) {
                queryGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
                this.selectedAreaGeometry = this.fsSelectedAreaGeometry.features[0].geometry;
            }
            var whereIn = this.primaryQueryString.get();
            this._sequenceQueryLarge(this.queryUrlOWRT, whereIn, queryGeometry, ["OBJECTID", "project_nbr"], "graphicsArrayPrimaryRecords", "Poly Projects", false);
            this._MoveCurrentSequenceProgress();
        };
        OE_OWRTReportsAreaViewModel.prototype._GetReportGeometry = function () {
            //clear tasks
            this.sequenceTasks = [];
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._GetReportGeometryDone;
            this._sequenceQuery(this.selectedAreaQueryUrl, this.geoTypeGeometryLayerDef.get(), ["OBJECTID"], "fsSelectedAreaGeometry", "", "Geometry Query", true);
            this._MoveCurrentSequenceProgress();
        };
        OE_OWRTReportsAreaViewModel.prototype._GetReportGeometryDone = function () {
            this._GetReportFeatureSets();
        };
        OE_OWRTReportsAreaViewModel.prototype._GetReportFeatureSetsDone = function () {
            this._GetReportJSONSets(this._OWEBOverviewReady, [0]);
            this._GetReportJSONSets(this._OWEBProjectsReady, [1, 2]);
            this._GetReportJSONSets(this._OWEBFundsReady, [3]);
            this._GetReportJSONSets(this._OWEBResultsReady, [4]);
        };
        OE_OWRTReportsAreaViewModel.prototype._GetReportJSONSets = function (onComplete, indexesToLoad) {
            var d = new Date();
            console.log("Start OWEB Request: " + d);
            var proxyUrl = "proxy.ashx?";
            var reportTypes = [
                { "t": "Project_Totals", "r": "owebResults_project_Totals", "v": "getOWRI_Report_Project_Totals" },
                { "t": "Project_Year", "r": "owebResults_project_Year", "v": "getOWRI_Report_Projects_Year" },
                { "t": "Project_Type_Year_Funding", "r": "owebResults_project_Type_Year_Funding", "v": "getOWRI_Report_Project_Type_Year_Funding" },
                { "t": "Funding_Source", "r": "owebResults_funding_Source", "v": "getOWRI_Report_Funding_Source_Type_Year" },
                { "t": "Results", "r": "owebResults_results", "v": "getOWRI_Report_Results_Year" }
            ];
            //{ "t": "Ranking", "r": "ranking", "v":"getOWRI_Report_Ranking" }
            //clear data
            for (var i = 0; i < reportTypes.length; i++) {
                this[reportTypes[i].r] = [];
            }
            //reset request counts
            this.owebRequestsCount = indexesToLoad.length;
            this.owebRequestsDone = 0;
            this.owebRequestsErrors = null;
            var urlBase = "https://apps.wrd.state.or.us/apps/oweb/owrio_api/api/owriproject/GetProjectReports";
            //build years string
            var sYear = Number(this.startYear.get());
            var eYear = Number(this.endYear.get()) + 1;
            var strYears = null;
            for (var i = sYear; i < eYear; i++) {
                if (this._IsNullOrEmpty(strYears))
                    strYears = i.toString();
                else
                    strYears += "," + i.toString();
            }
            console.log("Years to query: " + strYears);
            var strGeoType = this.geoTypeValue.get();
            var strExtent = this.areaNameSelected.get();
            //json request requires an extent of state for geotype of state.
            if (strGeoType == "state")
                strExtent = "state";
            //else if ((strGeoType) == "subbasin")
            //    strExtent = HUC8;
            var reportThis = this;
            var _loop_1 = function (i) {
                var reportToLoad = reportTypes[indexesToLoad[i]];
                var requestURL = proxyUrl + urlBase + "?strYears=" + strYears + "&strGeoType=" + strGeoType + "&strExtent=" + strExtent + "&sReportType=" + reportToLoad.t;
                console.log("Request: " + requestURL);
                jqxhr = $.get(requestURL)
                    .done(function (data) {
                    console.log("Success: " + requestURL);
                    reportThis[reportToLoad.r] = data;
                    reportThis.owebRequestsDone += 1;
                    reportThis._JSONSetsDone(onComplete);
                })
                    .fail(function (error) {
                    console.log("Failed: " + requestURL);
                    if (reportThis._IsNullOrEmpty(reportThis.owebRequestsErrors))
                        reportThis.owebRequestsErrors = "Failed request: " + requestURL + "  \n";
                    else
                        reportThis.owebRequestsErrors += "Failed request: " + requestURL + "  \n";
                    reportThis.owebRequestsDone += 1;
                    reportThis._JSONSetsDone(onComplete);
                });
            };
            var jqxhr;
            for (var i = 0; i < indexesToLoad.length; i++) {
                _loop_1(i);
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBOverviewReady = function (fromThis) {
            fromThis._OWEBOverviewProcess();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBOverviewProcess = function () {
            //Totals
            this.areaTotalInvestment.set("$0");
            this.areaTotalProjects.set("0");
            //total investment in projects        
            this.fundingChartTotalData = [{ "cash": 0, "inkind": 0 }];
            if (!this._IsNullOrEmpty(this.owebResults_project_Totals)) {
                var jTotals = JSON.parse(this.owebResults_project_Totals);
                if (!this._IsNullOrEmpty(jTotals) && !this._IsNullOrEmpty(jTotals.getOWRI_Report_Project_Totals[0])) {
                    jTotals = jTotals.getOWRI_Report_Project_Totals[0];
                    //area totals
                    if (!this._IsNullOrEmpty(jTotals.TotalInvestment))
                        this.areaTotalInvestment.set("$" + jTotals.TotalInvestment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
                    if (!this._IsNullOrEmpty(jTotals.TotalProjects))
                        this.areaTotalProjects.set(jTotals.TotalProjects.toLocaleString('en'));
                    //total investment in projects                        
                    this.fundingChartTotalData = [{
                            "cash": (!this._IsNullOrEmpty(jTotals.TotalCash)) ? jTotals.TotalCash : 0,
                            "inkind": (!this._IsNullOrEmpty(jTotals.TotalInkind)) ? jTotals.TotalInkind : 0
                        }];
                }
            }
            this.ShowFundingTotal("", true);
            this._toCompleteFundsCheck();
            this._BuildOverview();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBProjectsReady = function (fromThis) {
            fromThis._OWEBProjectsProcess();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBProjectsProcess = function () {
            //projects by year
            this.projectChartYearData = [];
            this.fundingChartByYearData = [];
            if (!this._IsNullOrEmpty(this.owebResults_project_Year)) {
                var yearTotals = JSON.parse(this.owebResults_project_Year);
                if (!this._IsNullOrEmpty(yearTotals.getOWRI_Report_Projects_Year)) {
                    //project count by year
                    this.projectChartYearData = yearTotals.getOWRI_Report_Projects_Year;
                    //funding by year
                    this.fundingChartByYearData = yearTotals.getOWRI_Report_Projects_Year;
                }
            }
            //projects by activity, funding by activity, funding by activity by year
            this.projectChartActData = [];
            this.fundingChartByActivityData = [];
            this.fundingChartByActivityYearData = [];
            var fundingByActYearIndex = {};
            var sYearNum = Number(this.startYear.get());
            var eYearNum = Number(this.endYear.get());
            if (!this._IsNullOrEmpty(this.owebResults_project_Type_Year_Funding) && this.owebResults_project_Type_Year_Funding.length > 0) {
                var projectTypeDetails = null;
                try {
                    projectTypeDetails = JSON.parse(this.owebResults_project_Type_Year_Funding);
                }
                catch (e) {
                    console.log("Error: " + e);
                    console.log("Project Type Year Funding: " + this.owebResults_project_Type_Year_Funding);
                }
                if (!this._IsNullOrEmpty(projectTypeDetails)) {
                    for (var stringIndex in projectTypeDetails) {
                        var workingType = projectTypeDetails[stringIndex][0];
                        //project count by activity
                        this.projectChartActData.push(workingType);
                        //funding total by activity
                        this.fundingChartByActivityData.push(workingType);
                        //funding by activity by year
                        for (var year = sYearNum; year <= eYearNum; year++) {
                            if (this._IsNullOrEmpty(fundingByActYearIndex[year])) {
                                fundingByActYearIndex[year] = this.fundingChartByActivityYearData.length;
                                this.fundingChartByActivityYearData.push({ "year": year });
                            }
                            if (this._IsNullOrEmpty(this.fundingChartByActivityYearData[fundingByActYearIndex[year]][workingType.ProjType]))
                                this.fundingChartByActivityYearData[fundingByActYearIndex[year]][workingType.ProjType] = workingType[year];
                        }
                    }
                }
            }
            /*this.ShowProjectChartYear("", true);
            this.ShowProjectsActivity("", true);
            this.ShowFundingYear("", true);
            this.ShowFundingActivity("", true);
            this.ShowFundingActivityYear("", true);*/
            this._toCompleteProjectsCheck();
            this._toCompleteFundsCheck();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBFundsReady = function (fromThis) {
            fromThis._OWEBFundsProcess();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBFundsProcess = function () {
            this.fundingTabProcessed = true;
            //funding source chart data        
            this.fundingChartBySourceData = [];
            if (!this._IsNullOrEmpty(this.owebResults_funding_Source)) {
                var fundingSource = JSON.parse(this.owebResults_funding_Source);
                if (!this._IsNullOrEmpty(fundingSource)) {
                    var fundingSourceObject = {};
                    for (var stringIndex in fundingSource) {
                        var workingObject = fundingSource[stringIndex][0];
                        fundingSourceObject[workingObject.Funding_Source] = workingObject.TotalContribution;
                    }
                    this.fundingChartBySourceData.push(fundingSourceObject);
                }
            }
            this.ShowFundingSource("", true);
            this._toCompleteFundsCheck();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBResultsReady = function (fromThis) {
            fromThis._OWEBResultsProcess();
        };
        OE_OWRTReportsAreaViewModel.prototype._OWEBResultsProcess = function () {
            this.resultsTabProcessed = true;
            var sYearNum = Number(this.startYear.get());
            var eYearNum = Number(this.endYear.get());
            var resultDataSetKeys = {
                "Total number of road/stream crossings improved for fish passage": "resultsCrossingsData",
                "Flow rate of water diverted by screens": "resultsScreensData",
                "Total miles of stream treated (instream activities)": "resultsInstreamMilesData",
                "Total miles of fish habitat made accessible due to road/stream crossing improvements (e.g. improvement or removal of culverts and other structures)": "resultsFishHabitatMilesData",
                "Total linear stream miles treated (riparian activities)": "resultsRiparianMilesData",
                "Total water flow acquired": "resultsWaterflowData",
                "Total acres treated (wetland activities)": "resultsWetlandData",
                "Total acres treated (upland activities)": "resultsUplandData",
                "Total acres treated (riparian activities)": "resultsRiparianData",
                "Total acres treated (estuarine activities)": "resultsEstuarineData"
            };
            this.owebResultChartDataSets = {};
            this.resultsTableData.clear();
            if (!this._IsNullOrEmpty(this.owebResults_results)) {
                //results tab
                var resultsData = JSON.parse(this.owebResults_results);
                if (!this._IsNullOrEmpty(resultsData)) {
                    var fundingSourceObject = {};
                    for (var stringIndex in resultsData) {
                        var workingObject = resultsData[stringIndex][0];
                        this.owebResultChartDataSets[workingObject.Result] = {
                            "unit": workingObject.Unit,
                            "total": workingObject.TotalResult,
                            "chart": workingObject.Result,
                            "name": workingObject.Result,
                            "dataKey": resultDataSetKeys[workingObject.Result]
                        };
                        this._AddOWEBResultsToTable(this.owebResultChartDataSets[workingObject.Result]);
                        this[resultDataSetKeys[workingObject.Result]] = [];
                        //funding by activity by year
                        for (var year = sYearNum; year <= eYearNum; year++) {
                            this[resultDataSetKeys[workingObject.Result]].push({ "year": year, "total": workingObject[year] });
                        }
                    }
                }
            }
            this._toCompleteResultsCheck();
        };
        OE_OWRTReportsAreaViewModel.prototype._toCompleteProjectsCheck = function () {
            this.toCompleteProjectCurrent++;
            if (this.toCompleteProjectCurrent >= this.toCompleteProject) {
                this.loaderProjectsVisible.set(false);
                this.projectsTabProcessed = true;
                this.loadSpinnerProjects.set(false);
                if (this.activeTab == "projects")
                    this.LoadProjectsTab();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._toCompleteFundsCheck = function () {
            this.toCompleteFundsCurrent++;
            if (this.toCompleteFundsCurrent >= this.toCompleteFunds) {
                this.loaderFundsVisible.set(false);
                this.fundingTabProcessed = true;
                this.loadSpinnerFunding.set(false);
                if (this.activeTab == "funding")
                    this.LoadFundingTab();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._toCompleteResultsCheck = function () {
            this.toCompleteResultsCurrent++;
            if (this.toCompleteResultsCurrent >= this.toCompleteResults) {
                this.loaderResultsVisible.set(false);
                this.resultsTabProcessed = true;
                this.loadSpinnerResults.set(false);
                if (this.activeTab == "results")
                    this.LoadResultsTab();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._JSONSetsDone = function (onComplete) {
            if (this.owebRequestsDone >= this.owebRequestsCount) {
                console.log("All data ready.");
                var d = new Date();
                console.log("OWEB Request Done: " + d);
                if (this._IsNullOrEmpty(this.owebRequestsErrors)) {
                    onComplete(this);
                }
                else {
                    this._OwebJsonRequestErrors();
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._OwebJsonRequestErrors = function () {
            this.StopOnErrorMessage(this.owebRequestsErrors);
        };
        OE_OWRTReportsAreaViewModel.prototype._AddOWEBResultsToTable = function (resultTableObject) {
            resultTableObject.total = Math.round(resultTableObject.total);
            resultTableObject.display = Math.round(resultTableObject.total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            this.resultsTableData.addItem(resultTableObject);
        };
        OE_OWRTReportsAreaViewModel.prototype._ShowOWEBResultChart = function (chartDataIn, seriesName, seriesField, activeChartString) {
            if (!this._IsNullOrEmpty(chartDataIn)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var i = 0; i < chartDataIn.length; i++) {
                        catValues.push(chartDataIn[i].year);
                        dataValues.push({ "total": Math.round(parseInt(chartDataIn[i].total)) });
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 8)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "line"
                        },
                        series: [{
                                name: seriesName,
                                type: "line",
                                color: "#4684EE",
                                field: "total",
                                data: dataValues
                            }],
                        valueAxis: [{
                                title: { text: seriesName },
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    name: seriesName,
                                    rotation: "auto",
                                    format: "{0:n0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> ' + seriesName + ': #= kendo.toString(value,"n0") #'
                        }
                    };
                    //$(".oeOWRTAreaResultsChart").kendoChart(opts);
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaResultsChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._BuildOverview = function () {
            //funding data
            this.totalInvestedCash = 0;
            this.totalInvestedInkind = 0;
            var investmentsByYearKey = {};
            this._LoadReport();
        };
        OE_OWRTReportsAreaViewModel.prototype._BuildObjectIDString = function (workingFS) {
            var objectIDQuery = "";
            for (var i = 0; i < workingFS.features.length; i++) {
                if (objectIDQuery != "")
                    objectIDQuery += ",";
                objectIDQuery += workingFS.features[i].attributes["OBJECTID"];
            }
            return objectIDQuery;
        };
        OE_OWRTReportsAreaViewModel.prototype._BuildObjectIDStringFromGraphics = function (graphics, fieldToUse) {
            var objectIDQuery = "";
            for (var i = 0; i < graphics.length; i++) {
                if (objectIDQuery != "")
                    objectIDQuery += ",";
                objectIDQuery += graphics[i].attributes[fieldToUse];
            }
            return objectIDQuery;
        };
        OE_OWRTReportsAreaViewModel.prototype._LoadReport = function () {
            //map and overview data
            this._loadEsirMap(null, null, this);
            this.ranksVisible.set(false);
            //load everything if the selection is smaller
            if (this.geoTypeValue.get() !== "state") {
                this.ranksVisible.set(false);
            }
            //hide the loader overlay
            this.loaderVisible.set(false);
        };
        OE_OWRTReportsAreaViewModel.prototype._YearSliderChanged = function () {
            var val = this.yearRangeSlider.value();
            this.startYear.set(val[0].toString());
            this.endYear.set(val[1].toString());
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        };
        OE_OWRTReportsAreaViewModel.prototype._YearSliderChange = function (minVal, maxVal) {
            this.startYear.set(minVal);
            this.endYear.set(maxVal);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
        };
        OE_OWRTReportsAreaViewModel.prototype._GetGeoTypeNameByValue = function (valueIn) {
            for (var i = 0; i < this.geoTypeList.getLength(); i++) {
                if (this.geoTypeList.getAt(i).value.toLowerCase() == valueIn.toLowerCase())
                    return this.geoTypeList.getAt(i).name;
            }
            return valueIn;
        };
        OE_OWRTReportsAreaViewModel.prototype.OptionsGeoTypeChanged = function (geoTypeValueIn, geoTypeName, forceAreaSelection) {
            if (forceAreaSelection === void 0) { forceAreaSelection = null; }
            //force the geotype name if there is a matching value
            this.geoTypeName.set(this._GetGeoTypeNameByValue(geoTypeValueIn));
            this.geoTypeValue.set(geoTypeValueIn);
            this.reportAreaListVisible.set(true);
            this.areaNameVisisble.set(true);
            switch (geoTypeValueIn) {
                case "basin":
                    this.areaNamePointsQueryString.set("UPPER(report_basin) =");
                    this.areaNamePolyQueryString.set("UPPER(oweb_name) =");
                    this._BuildAreaList(this.fsBasins, "oweb_name", "oweb_name", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlBasins;
                    break;
                case "subbasin":
                    this.areaNamePointsQueryString.set("UPPER(subbasin_actual) =");
                    this.areaNamePolyQueryString.set("UPPER(huc8) =");
                    this._BuildAreaList(this.fsHUC8, "name", "huc8", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlHUC8;
                    break;
                case "county":
                    this.areaNamePointsQueryString.set("UPPER(county) =");
                    this.areaNamePolyQueryString.set("UPPER(name10) =");
                    this._BuildAreaList(this.fsCounty, "name10", "name10", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlCounty;
                    break;
                case "wsc":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(instname) =");
                    this._BuildAreaList(this.fsWSC, "instname", "instname", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlWSC;
                    break;
                case "swcd":
                    this.areaNamePointsQueryString.set("");
                    this.areaNamePolyQueryString.set("UPPER(SWCD_Name) =");
                    this._BuildAreaList(this.fsSWCD, "SWCD_Name", "SWCD_Name", forceAreaSelection);
                    this.selectedAreaQueryUrl = this.queryUrlSWCD;
                    break;
                case "state":
                default:
                    this.areaNameVisisble.set(false);
                    this.areaNamePolyQueryString.set("");
                    this.geoTypeGeometryLayerDef.set("");
                    this.areaNameSelected.set("");
                    this.areaNamePointsQueryString.set("1=1");
                    this.BuildOptionsQuery();
                    this.reportAreaList.clear();
                    this.reportAreaListVisible.set(false);
                    break;
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._BuildAreaList = function (fsIn, nameField, valueField, setValue) {
            if (setValue === void 0) { setValue = null; }
            this.reportAreaList.clear();
            //sort by field
            fsIn.features.sort(function (a, b) {
                if (a.attributes[nameField] < b.attributes[nameField])
                    return -1;
                if (a.attributes[nameField] > b.attributes[nameField])
                    return 1;
                return 0;
            });
            for (var i = 0; i < fsIn.features.length; i++) {
                var workingAttributes = fsIn.features[i].attributes;
                var workingObject = new Object;
                workingObject["name"] = workingAttributes[nameField];
                workingObject["value"] = workingAttributes[valueField];
                //set the first value
                if (this.reportAreaList.length() < 1)
                    this.OptionsAreaChanged(workingObject["value"], workingObject["name"]);
                this.reportAreaList.addItem(workingObject);
            }
            //force a selection
            if (!this._IsNullOrEmpty(setValue, 0))
                this.OptionsAreaChanged(setValue, setValue);
        };
        /*public OptionsYearStartChanged(value:string)
        {
            this.startYear.set(value);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        }
    
        public OptionsYearEndChanged(value:string)
        {
            this.endYear.set(value);
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.BuildOptionsQuery();
        }*/
        OE_OWRTReportsAreaViewModel.prototype.OptionsAreaChanged = function (areaValue, areaNameIn) {
            this.areaName.set(areaNameIn);
            this.areaNameSelected.set(areaValue);
            var searchValue = this.areaNameSelected.get().toUpperCase();
            this.geoTypeGeometryLayerDef.set(this.areaNamePolyQueryString.get() + " '" + searchValue + "'");
            this.BuildOptionsQuery();
        };
        OE_OWRTReportsAreaViewModel.prototype.BuildOptionsQuery = function () {
            //area name will be used to select geometry outline
            var searchValue = this.areaNameSelected.get().toUpperCase();
            //the primary query is used for selecting geometry, the subbasin name is used, not the huc for selecting geometry
            if (this.geoTypeValue.get() == "subbasin")
                searchValue = this.areaName.get().toUpperCase();
            //query for projects (points)
            var queryString = this.areaNamePointsQueryString.get();
            //add area search
            if (typeof searchValue !== "undefined" && searchValue != null && searchValue.length > 0) {
                queryString += " '" + searchValue + "'";
                //This basin name is different between the basin layer and the projects layer.  Projects layer has spaces in it....
                queryString = queryString.replace("Owyhee-Malheur".toUpperCase(), "Owyhee - Malheur".toUpperCase());
            }
            //wsc and swcd are selected by geometry only, set query to 1=1
            if (this.geoTypeValue.get() == "wsc" || this.geoTypeValue.get() == "swcd")
                queryString = "1=1";
            queryString += " AND complete_year BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();
            this.primaryQueryString.set(queryString);
        };
        OE_OWRTReportsAreaViewModel.prototype.CloseChartTableView = function () {
            //this.owrtChartsTableContainerVisible.set(false);
            this.owrtTableLinkText.set("Table View");
            this.owrtTableLinkImg.set("Resources/Images/Icons/paging-control-table-24.png");
            this.HideAllTableViews();
        };
        OE_OWRTReportsAreaViewModel.prototype.HideAllTableViews = function () {
            this.owrtTableProjectsVisible.set(false);
            this.owrtChartsTableSharedVisible.set(false);
            this.owrtTableFundsVisible.set(false);
            this.owrtTableFundInvestByYearVisible.set(false);
            this.owrtTableFundInvestByActByYearVisible.set(false);
        };
        OE_OWRTReportsAreaViewModel.prototype.ToggleOptionsArrow = function (val) {
            if (val)
                this.optionsImageSrc.set("Resources/Images/Icons/arrow-right-small-24.png");
            else
                this.optionsImageSrc.set("Resources/Images/Icons/arrow-down-small-16.png");
        };
        OE_OWRTReportsAreaViewModel.prototype.ToggleChartTableView = function () {
            //hide all views first
            //this.HideAllTableViews();
            //if (!this.owrtChartsTableContainerVisible.get()) {
            this.owrtTableLinkText.set("Chart View");
            this.owrtTableLinkImg.set("Resources/Images/Icons/charting-24.png");
            if (this.activeTabChartName == "projectsyear") {
                if (!this.owrtTableProjectsVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableProjectsHeader.set("Year");
                    this.owrtTableProjectsValue.set("Number of Projects");
                    this.owrtChartProjectsVisible.set(false);
                    this.owrtTableProjectsVisible.set(true);
                    this.owrtTableProjectsData.clear();
                    for (var i = 0; i < this.projectChartYearData.length; i++) {
                        this.owrtTableProjectsData.addItem({
                            "name": this.projectChartYearData[i].Year,
                            "value": this.projectChartYearData[i].TotalProjects,
                            "data-sort-value": isNaN(parseInt(this.projectChartYearData[i].TotalProjects)) ? 0 : parseInt(this.projectChartYearData[i].TotalProjects)
                        });
                    }
                }
                else {
                    this.owrtTableProjectsVisible.set(false);
                    this.owrtChartProjectsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "projectsactivity") {
                if (!this.owrtTableProjectsVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableProjectsHeader.set("Project Types");
                    this.owrtTableProjectsValue.set("Number of Projects");
                    this.owrtChartProjectsVisible.set(false);
                    this.owrtTableProjectsVisible.set(true);
                    this.owrtTableProjectsData.clear();
                    for (var i = 0; i < this.projectChartActData.length; i++) {
                        this.owrtTableProjectsData.addItem({
                            "name": this.projectChartActData[i].ProjType,
                            "value": this.projectChartActData[i].NumProj,
                            "data-sort-value": isNaN(parseInt(this.projectChartActData[i].NumProj)) ? 0 : parseInt(this.projectChartActData[i].NumProj)
                        });
                    }
                }
                else {
                    this.owrtTableProjectsVisible.set(false);
                    this.owrtChartProjectsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "fundingtotal") {
                if (!this.owrtTableFundsVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableFundsHeader.set("Contribution Types");
                    this.owrtTableFundsValue.set("Total Investment");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);
                    this.owrtTableFundsData.clear();
                    this.owrtTableFundsData.addItem({
                        "name": "Cash",
                        "value": "$" + Number(this.fundingChartTotalData[0].cash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt(this.fundingChartTotalData[0].cash)) ? 0 : parseInt(this.fundingChartTotalData[0].cash)
                    });
                    this.owrtTableFundsData.addItem({
                        "name": "Inkind",
                        "value": "$" + Number(this.fundingChartTotalData[0].inkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                        "data-sort-value": isNaN(parseInt(this.fundingChartTotalData[0].inkind)) ? 0 : parseInt(this.fundingChartTotalData[0].inkind)
                    });
                }
                else {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "fundingactivity") {
                if (!this.owrtTableFundsVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableFundsHeader.set("Project Types");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);
                    var totalVal = 0;
                    this.owrtTableFundsData.clear();
                    for (var i = 0; i < this.fundingChartByActivityData.length; i++) {
                        this.owrtTableFundsData.addItem({
                            "name": this.fundingChartByActivityData[i].ProjType,
                            "value": "$" + Number(this.fundingChartByActivityData[i].TotalFunding).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "data-sort-value": isNaN(parseInt(this.fundingChartByActivityData[i].TotalFunding)) ? 0 : parseInt(this.fundingChartByActivityData[i].TotalFunding)
                        });
                        totalVal += Number(this.fundingChartByActivityData[i].total);
                    }
                }
                else {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "fundingsource") {
                if (!this.owrtTableFundsVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    this.owrtTableFundsVisible.set(true);
                    this.owrtTableFundsData.clear();
                    var workingObject = this.fundingChartBySourceData[0];
                    var totalVal = 0;
                    for (var key in workingObject) {
                        this.owrtTableFundsData.addItem({
                            "name": key,
                            "value": "$" + workingObject[key].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "data-sort-value": isNaN(parseInt(workingObject[key])) ? 0 : parseInt(workingObject[key])
                        });
                        totalVal += Number(workingObject[key]);
                    }
                }
                else {
                    this.owrtTableFundsVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "fundingyear") {
                if (!this.owrtTableFundInvestByYearVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    //this.owrtTableFundsVisible.set(true);
                    this.owrtTableFundInvestByYearVisible.set(true);
                    var totalVal = 0;
                    //owrtTableDataFundInvestByYear
                    this.owrtTableFundsData.clear();
                    for (var i = 0; i < this.fundingChartByYearData.length; i++) {
                        this.owrtTableFundsData.addItem({
                            "year": this.fundingChartByYearData[i].Year,
                            "cash": "$" + Number(this.fundingChartByYearData[i].TotalCash).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "inkind": "$" + Number(this.fundingChartByYearData[i].TotalInkind).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            "cashForSort": isNaN(parseInt(this.fundingChartByYearData[i].TotalCash)) ? 0 : parseInt(this.fundingChartByYearData[i].TotalCash),
                            "inkindForSort": isNaN(parseInt(this.fundingChartByYearData[i].TotalInkind)) ? 0 : parseInt(this.fundingChartByYearData[i].TotalInkind)
                        });
                        totalVal += Number(this.fundingChartByYearData[i].inkind) + Number(this.fundingChartByYearData[i].cash);
                    }
                }
                else {
                    //this.owrtTableFundsVisible.set(false);
                    this.owrtTableFundInvestByYearVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else if (this.activeTabChartName == "fundingactivityYear") {
                if (!this.owrtTableFundInvestByActByYearVisible.get()) {
                    this.HideAllTableViews();
                    this.owrtTableFundsHeader.set("Funding Source");
                    this.owrtTableFundsValue.set("Funding");
                    this.owrtChartFundsVisible.set(false);
                    //this.owrtTableFundsVisible.set(true);
                    //this.owrtChartsTableFundInvestByActByYearVisible.set(true);
                    this.owrtTableFundInvestByActByYearVisible.set(true);
                    var totalVal = 0;
                    //owrtTableDataFundInvestByActByYear
                    this.owrtTableFundsData.clear();
                    for (var i = 0; i < this.fundingChartByActivityYearData.length; i++) {
                        var workingObject = this.fundingChartByActivityYearData[i];
                        var newObject = { "year": workingObject["year"] };
                        //add display and sort values to new object
                        for (var aIndex = 0; aIndex < this.fsActivityTypeStrings.features.length; aIndex++) {
                            var workingAtt = this.fsActivityTypeStrings.features[aIndex].attributes.activity_type;
                            var sortAtt = workingAtt + "Sort";
                            newObject[sortAtt] = workingObject[workingAtt]; //copy raw value into new attribute
                            newObject[workingAtt] = "$" + Math.round(workingObject[workingAtt]).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                            totalVal += Number(workingObject[workingAtt]);
                        }
                        this.owrtTableFundsData.addItem(newObject);
                    }
                }
                else {
                    //this.owrtTableFundsVisible.set(false);
                    this.owrtTableFundInvestByActByYearVisible.set(false);
                    this.owrtChartFundsVisible.set(true);
                    this.CloseChartTableView();
                }
            }
            else {
                this.CloseChartTableView();
            }
            //show container
            //this.owrtChartsTableContainerVisible.set(true);
            /*}
            else {
                this.CloseChartTableView();
            }*/
        };
        OE_OWRTReportsAreaViewModel.prototype.ResetAllTabs = function () {
            this.tabOverviewClass.set("");
            this.tabProjectsClass.set("");
            this.tabFundingClass.set("");
            this.tabResultsClass.set("");
            this.loaderProjectsVisible.set(false);
            this.loaderFundsVisible.set(false);
            this.loaderResultsVisible.set(false);
            this.areaPanelOverviewVisisble.set(false);
            this.areaPanelProjectsVisisble.set(false);
            this.areaPanelFundingVisisble.set(false);
            this.areaPanelResultsVisisble.set(false);
        };
        OE_OWRTReportsAreaViewModel.prototype.LoadOverviewTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.owrtChartTableLinkVisible.set(false);
            this.tabOverviewClass.set("oeOWRTAreaTabEnabled");
            this.areaPanelOverviewVisisble.set(true);
            this.activeTab = "overview";
        };
        OE_OWRTReportsAreaViewModel.prototype.LoadProjectsTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.owrtChartTableLinkVisible.set(true);
            this.tabProjectsClass.set("oeOWRTAreaTabEnabled");
            this.areaPanelProjectsVisisble.set(true);
            this.activeTab = "projects";
            if (!this.projectsTabProcessed) {
                this.loaderProjectsVisible.set(true);
                return;
            }
            this.loaderProjectsVisible.set(false);
            this.projectsTabProcessed = true;
            this.loaderVisible.set(false);
            if (!this.projectChart)
                this.ShowChart("projects", "year");
            else if (!this._IsNullOrEmpty(this.lastProjectTabChartName) && this.lastProjectTabChartName != "") {
                this.activeTabChartName = this.lastProjectTabChartName;
            }
            else {
                this.activeTabChartName = this.projectChartActive;
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._ProjectTabDataLoaded = function () {
            this.LoadProjectsTab();
        };
        OE_OWRTReportsAreaViewModel.prototype.LoadFundingTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.owrtChartTableLinkVisible.set(true);
            this.tabFundingClass.set("oeOWRTAreaTabEnabled");
            this.areaPanelFundingVisisble.set(true);
            this.activeTab = "funding";
            if (!this.fundingTabProcessed) {
                this.loaderFundsVisible.set(true);
                return;
            }
            this.fundingTabProcessed = true;
            this.loaderFundsVisible.set(false);
            this.loaderVisible.set(false);
            if (!this.fundingChart)
                this.ShowChart("funding", "total");
            else if (!this._IsNullOrEmpty(this.lastFundingTabChartName) && this.lastFundingTabChartName != "") {
                this.activeTabChartName = this.lastFundingTabChartName;
            }
            else {
                this.activeTabChartName = this.fundingChartActive;
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._FundingTabDataLoaded = function () {
            this.LoadFundingTab();
        };
        OE_OWRTReportsAreaViewModel.prototype.LoadResultsTab = function () {
            this.ResetAllTabs();
            this.CloseChartTableView();
            this.owrtChartTableLinkVisible.set(false);
            this.tabResultsClass.set("oeOWRTAreaTabEnabled");
            this.areaPanelResultsVisisble.set(true);
            this.activeTab = "results";
            if (!this.resultsTabProcessed) {
                this.loaderResultsVisible.set(true);
                return;
            }
            this.loaderResultsVisible.set(false);
            this.resultsTabProcessed = true;
            this.loaderVisible.set(false);
        };
        OE_OWRTReportsAreaViewModel.prototype._ResultsTabDataLoaded = function () {
            this.LoadResultsTab();
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowProjectChartYear = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.projectChartYearData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.projectChartYearData) {
                        catValues.push(this.projectChartYearData[index].Year);
                        dataValues.push(this.projectChartYearData[index].TotalProjects);
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 10)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "column"
                        },
                        series: [{
                                name: "Projects",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                title: { text: "Projects" },
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:n0}"
                                }
                            }],
                        categoryAxis: [{
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #= series.name #: #= kendo.toString(value,"n0") #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowProjectsActivity = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.projectChartActData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.projectChartActData) {
                        catValues.push(this.projectChartActData[index].ProjType);
                        dataValues.push(this.projectChartActData[index].NumProj);
                    }
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        series: [{
                                name: "Activity",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:n0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Activity" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Activity: #= category # <br /> Projects: #= kendo.toString(value,"n0") #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaProjectChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowFundingTotal = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartTotalData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var total = this.fundingChartTotalData[0].cash + this.fundingChartTotalData[0].inkind;
                    var cash = this.fundingChartTotalData[0].cash;
                    var inkind = this.fundingChartTotalData[0].inkind;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        dataSource: {
                            data: [
                                { "name": "Cash", "val": cash, "p": cash / total, color: "#4684EE" },
                                { "name": "Inkind", "val": inkind, "p": inkind / total, color: "#ee6f44" }
                            ]
                        },
                        seriesDefaults: {
                            type: "pie",
                            labels: {
                                visible: true,
                                format: "{0:P}",
                                template: '#= category #: #= kendo.format("{0:P0}",value)#'
                            }
                        },
                        series: [{
                                type: "pie",
                                color: "#4684EE",
                                field: "p",
                                categoryField: "name"
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "" },
                                categories: [],
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            format: "{0:C0}",
                            template: '#= category #: #= kendo.format("{0:P0}",value)# <br /> #= kendo.format("{0:C0}",dataItem.val) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowFundingYear = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByYearData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValuesCash = [];
                    var dataValuesInkind = [];
                    for (var index in this.fundingChartByYearData) {
                        catValues.push(this.fundingChartByYearData[index].Year);
                        dataValuesCash.push(this.fundingChartByYearData[index].TotalCash);
                        dataValuesInkind.push(this.fundingChartByYearData[index].TotalInkind);
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 8)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "column"
                        },
                        series: [{
                                name: "Cash",
                                color: "#4684EE",
                                data: dataValuesCash
                            },
                            {
                                name: "Inkind",
                                color: "#ee6f44",
                                data: dataValuesInkind
                            }
                        ],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Year" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #=series.name#:  #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowFundingActivity = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByActivityData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var dataValues = [];
                    for (var index in this.fundingChartByActivityData) {
                        catValues.push(this.fundingChartByActivityData[index].ProjType);
                        dataValues.push(this.fundingChartByActivityData[index].TotalFunding);
                    }
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        series: [{
                                name: "Activity",
                                color: "#4684EE",
                                data: dataValues
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Activity" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Activity: #= category # <br /> Total Investment: #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowFundingActivityYear = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartByActivityYearData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var catValues = [];
                    var seriesSet = [];
                    var seriesObj = { "name": "", "color": "", "data": [] };
                    var seriesIndexs = {};
                    var workingObj = void 0;
                    for (var index in this.fundingChartByActivityYearData) {
                        workingObj = this.fundingChartByActivityYearData[index];
                        catValues.push(workingObj.year);
                        for (var propIndex in workingObj) {
                            if (propIndex == "year") //skip year property
                                continue;
                            //create index for this activity type
                            if (this._IsNullOrEmpty(seriesIndexs[propIndex])) {
                                seriesIndexs[propIndex] = seriesSet.length;
                                seriesObj = {
                                    "name": propIndex,
                                    "color": this._FindActivitySymbolColor(propIndex, false, true),
                                    "data": [parseInt(workingObj[propIndex])]
                                };
                                seriesSet.push(seriesObj);
                            }
                            else {
                                seriesSet[seriesIndexs[propIndex]].data.push(parseInt(workingObj[propIndex]));
                            }
                        }
                    }
                    var rotationAngle = 0;
                    if (catValues.length > 8)
                        rotationAngle = -45;
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "line"
                        },
                        series: seriesSet,
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto",
                                    format: "{0:C0}"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "Year" },
                                categories: catValues,
                                majorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: { angle: rotationAngle }
                                }
                            }],
                        tooltip: {
                            visible: true,
                            template: 'Year: #= category # <br /> #= series.name #: #= kendo.format("{0:C0}",value) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowFundingSource = function (activeChartString, setupOnly) {
            if (setupOnly === void 0) { setupOnly = false; }
            if (!setupOnly && !this._IsNullOrEmpty(this.fundingChartBySourceData)) {
                //only draw the chart if it is null
                if (!this.projectChart || this.projectChartActive != activeChartString) {
                    this.projectChartActive = activeChartString;
                    this._destoryActiveChart();
                    var dataSets = [];
                    var dataObj = { "name": "", "val": 0, "p": 0, color: "" };
                    var workingColor = void 0;
                    var total = 0;
                    var colorCount = 0;
                    for (var propIndex in this.fundingChartBySourceData[0]) {
                        total += this.fundingChartBySourceData[0][propIndex];
                        colorCount++;
                    }
                    var colorsToUse = this._generateRGBArrayFromCount(colorCount, true);
                    for (var propIndex in this.fundingChartBySourceData[0]) {
                        workingColor = colorsToUse.pop();
                        dataObj = {
                            "name": propIndex,
                            "val": this.fundingChartBySourceData[0][propIndex],
                            "p": this.fundingChartBySourceData[0][propIndex] / total,
                            "color": workingColor
                        };
                        dataSets.push(dataObj);
                    }
                    var opts = {
                        title: {
                            text: ""
                        },
                        legend: {
                            visible: true,
                            position: "bottom"
                        },
                        dataSource: {
                            data: dataSets
                        },
                        seriesDefaults: {
                            type: "pie",
                            labels: {
                                visible: true,
                                format: "{0:P1}",
                                template: '#= category #: #= kendo.format("{0:P1}",value)#'
                            }
                        },
                        series: [{
                                type: "pie",
                                color: "#4684EE",
                                field: "p",
                                categoryField: "name"
                            }],
                        valueAxis: [{
                                line: {
                                    visible: true
                                },
                                minorGridLines: {
                                    visible: false
                                },
                                labels: {
                                    rotation: "auto"
                                }
                            }],
                        categoryAxis: [{
                                title: { text: "" },
                                categories: [],
                                majorGridLines: {
                                    visible: false
                                }
                            }],
                        tooltip: {
                            visible: true,
                            format: "{0:C0}",
                            template: '#= category #: #= kendo.format("{0:P1}",value)# <br /> #= kendo.format("{0:C0}",dataItem.val) #'
                        }
                    };
                    this.kChartActive = new kendo.dataviz.ui.Chart($(".oeOWRTAreaFundingChart")[0], opts);
                }
            }
        };
        OE_OWRTReportsAreaViewModel.prototype.OpenAreaReport = function (pipeParamsIn) {
            //geoType: string, geoValue: string, extent: string, years: string
            //ModalWindowRegion
            this.app.commandRegistry.command("ActivateView").execute("OE_OWRTReportsAreaView");
            var thisView = this;
            //reset variables
            this.primaryQueryString.set("1=1");
            this.geoTypeGeometryLayerDef.set("");
            this.geoTypeValue.set("state");
            this.areaNameVisisble.set(false);
            this.reportAreaListVisible.set(false);
            this.startYear.set(this.startYearDefault.toString());
            this.endYear.set(this.endYearDefault.toString());
            this.OptionsGeoTypeChanged("state", "State");
            this.yearRangeString.set(this.startYear.get() + " - " + this.endYear.get());
            this.resultsFieldSetVisible.set(false);
            this.isCustomReport = false;
            this.customGeometry = null;
            this.loaderProjectsVisible.set(false);
            this.loaderFundsVisible.set(false);
            this.loaderResultsVisible.set(false);
            this.loadSpinnerProjects.set(true);
            this.loadSpinnerFunding.set(true);
            this.loadSpinnerResults.set(true);
            this.loaderWarnIcon.set(false);
            this.inputBlockOnError.set(false);
            //setup sort table on results tab
            $(".owrtResultsTable").tablesort();
            $(".owrtChartTableShared").tablesort();
            $(".owrtChartTableFundInvestByYear").tablesort();
            $(".owrtChartTableFundInvestByActByYear").tablesort();
            if (this._IsNullOrEmpty(this.yearRangeSlider)) {
                this.yearRangeSlider = new kendo.ui.RangeSlider(document.getElementsByClassName("owrtYearSlider")[0], {
                    orientation: "horizontal",
                    min: this.yearMin,
                    max: this.yearMax,
                    smallStep: 1,
                    largeStep: 5,
                    leftDragHandleTitle: "Start Year",
                    rightDragHandleTitle: "End Year",
                    tooltip: { format: "{0:0}" },
                    change: function () {
                        thisView._YearSliderChanged();
                    }
                });
            }
            else {
                //this.yearRangeSlider.value([this.startYear.get(), this.endYear.get()]);
                this._YearSliderChange(this.startYear.get(), this.endYear.get());
            }
            //check for url paramemters, use these later to load this report
            if (!this._IsNullOrEmpty(pipeParamsIn))
                this.pipeParamsFromURL = pipeParamsIn;
            if (this.requiredFeaturesLoaded.get()) {
                //check for pipe params for load
                if (!this._IsNullOrEmpty(this.pipeParamsFromURL))
                    this._LoadReportFromURLParams();
                else {
                    this.ReportOptionsSubmission();
                }
            }
            else
                this._GetRequredFeatureSets();
        };
        OE_OWRTReportsAreaViewModel.prototype._LoadReportFromURLParams = function () {
            this.isCustomReport = false;
            this.customGeometry = null;
            //check for url paramemters
            if (!this._IsNullOrEmpty(this.pipeParamsFromURL)) {
                console.log("Params type: " + (typeof this.pipeParamsFromURL));
                //pipe delimited string
                if (typeof this.pipeParamsFromURL == "string") {
                    //decode
                    this.pipeParamsFromURL = decodeURIComponent(this.pipeParamsFromURL);
                    //geoType | areaType | years
                    var paramStrings = this.pipeParamsFromURL.split("|");
                    this.pipeParamsFromURL = null;
                    //set years first
                    if (!this._IsNullOrEmpty(paramStrings[2], 0)) {
                        var years = paramStrings[2].split(",");
                        if (years.length > 1) {
                            //this.OptionsYearStartChanged(years[0]);
                            //this.OptionsYearEndChanged(years[years.length - 1]);
                            this._YearSliderChange(years[0], years[years.length - 1]);
                        }
                    }
                    else {
                        //this.OptionsYearStartChanged(this.yearMin.toString());
                        //this.OptionsYearEndChanged(this.yearMax.toString());
                        this._YearSliderChange(this.yearMin.toString(), this.yearMax.toString());
                    }
                    //set geotype and areaselection
                    if (!this._IsNullOrEmpty(paramStrings[0], 0) && !this._IsNullOrEmpty(paramStrings[1], 0)) {
                        this.geoTypeValue.set(paramStrings[0]);
                        this.OptionsGeoTypeChanged(paramStrings[0], paramStrings[0], paramStrings[1]);
                    }
                }
                else if (typeof this.pipeParamsFromURL == "object" && this.pipeParamsFromURL.geometry !== 'undefined') {
                    //0 = name
                    //1 = geometry
                    if (typeof this.pipeParamsFromURL[1] == "string")
                        this.pipeParamsFromURL[1] = JSON.parse(this.pipeParamsFromURL[1]);
                    //custom geometry
                    this.customGeometry = new esri.geometry.Polygon(this.pipeParamsFromURL[1]); //<esri.geometry.Polygon>esri.geometry.fromJson(this.pipeParamsFromURL["geometry"]);
                    this.geoTypeName.set("Custom Report");
                    this.yearRangeString.set("");
                    this.areaName.set(this.pipeParamsFromURL[0]);
                    this.areaNameVisisble.set(true);
                    this.isCustomReport = true;
                    this.pipeParamsFromURL = null;
                }
                this.ReportOptionsSubmission();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._IsNullOrEmpty = function (testValue, testLength) {
            if (testLength === void 0) { testLength = -1; }
            if (typeof testValue === "undefined" || testValue == null)
                return true;
            if (testLength > -1)
                return !(testValue.length > testLength);
            return false;
        };
        OE_OWRTReportsAreaViewModel.prototype.ReportOptionsSubmission = function () {
            //clear all active charts
            this._destoryActiveChart();
            this.loaderWarnIcon.set(false);
            this.inputBlockOnError.set(false);
            this.loaderMessage.set("Loading report...");
            this.loaderVisible.set(true);
            this.loaderSpinner.set(true);
            this.reportOptionsPanelVisible.set(false);
            this.loadSpinnerProjects.set(true);
            this.loadSpinnerFunding.set(true);
            this.loadSpinnerResults.set(true);
            this.resultsFieldSetVisible.set(false);
            this.toCompleteProjectCurrent = 0;
            this.toCompleteFundsCurrent = 0;
            this.toCompleteResultsCurrent = 0;
            //clear chart/table strings
            this.lastFundingTabChartName = null;
            this.lastProjectTabChartName = null;
            this.lastResultsChartName = null;
            this.activeTabChartName = "";
            this.projectChartActive = null;
            this.fundingChartActive = null;
            //clear projects tab
            this.projectsTabProcessed = false;
            this.projectChartActDefs = null;
            this.projectChartYearDefs = null;
            //clear funding tab
            this.fundingTabProcessed = false;
            this.fundingChartByActivityDefs = null;
            this.fundingChartByActivityYearDefs = null;
            this.fundingChartByYearDefs = null;
            this.fundingChartBySourceDefs = null;
            //clear results tab
            this.resultsTabProcessed = false;
            //change to overview tab
            this.LoadOverviewTab();
            //custom report 
            if (this.isCustomReport) {
                this.geoTypeValue.set("custom");
            }
            this._BuildNewReport();
        };
        OE_OWRTReportsAreaViewModel.prototype.StopOnErrorMessage = function (message) {
            this.loaderMessage.set(message);
            this.loaderWarnIcon.set(true);
            this.loaderSpinner.set(false);
            this.inputBlockOnError.set(true);
            this.loaderVisible.set(true);
        };
        OE_OWRTReportsAreaViewModel.prototype._GetFieldValue = function (graphic, field) {
            if (typeof graphic.attributes[field] === "undefined")
                return "Undefined Field - " + field;
            if (graphic.attributes[field] === null)
                return "Null Field - " + field;
            return graphic.attributes[field];
        };
        OE_OWRTReportsAreaViewModel.prototype._GetDivider = function (records, targetField) {
            var bigNumber = 0;
            for (var i = 0; i < records.length; i++) {
                if (records[i][targetField] > bigNumber)
                    bigNumber = records[i][targetField];
            }
            if (bigNumber > 1000000)
                return 100000;
            if (bigNumber > 100000)
                return 1000;
            return 0;
        };
        OE_OWRTReportsAreaViewModel.prototype._abbreviateNumber = function (num, fixed) {
            if (num === null) {
                return null;
            } // terminate early
            if (num === 0) {
                return '0';
            } // terminate early
            fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
            var b = (num).toPrecision(2).split("e"), // get power
            k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
            c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
            d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
            e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
            return e;
        };
        OE_OWRTReportsAreaViewModel.prototype._destoryActiveChart = function () {
            //if (!this._IsNullOrEmpty(this.kChartActive) && !this._IsNullOrEmpty(this.kChartActive.destroy) && typeof this.kChartActive.destroy == 'function')
            //    this.kChartActive.destroy();
            try {
                this.kChartActive.destroy();
            }
            catch (e) { }
        };
        OE_OWRTReportsAreaViewModel.prototype._LoadMapLayers = function () {
            //remove old layers
            if (!this._IsNullOrEmpty(this.esirMapPointLayers)) {
                for (var i = 0; i < this.esirMapPointLayers.length; i++) {
                    this.esriMap.removeLayer(this.esirMapPointLayers[i]);
                }
            }
            //remove old graphics
            this.esriMap.graphics.clear();
            this.esirMapPointLayers = [];
            this.esriMapLayerDefs = [];
            var recordsPerBreak = 2500;
            var nextBreak = recordsPerBreak;
            //load all points on a single layer?
            if (this.geoTypeValue.get().toLowerCase() == "state") {
                var stateQuery = "1=1 AND complete_year BETWEEN " + this.startYear.get() + " AND " + this.endYear.get();
                //let stateQuery: string = "1=1";
                this.esriMapLayerDefs.push(stateQuery);
                this.areaMaxLayersToLoad = this.esriMapLayerDefs.length;
                this._LoadMapLayerNext();
                return;
            }
            if (this.isCustomReport) {
                this.isCustomReport = false;
                var passThis_1 = this;
                var gsvc = new esri.tasks.GeometryService(this.geoService);
                var proParams = new esri.tasks.ProjectParameters();
                proParams.geometries = [this.selectedAreaGeometry];
                proParams.outSR = new esri.SpatialReference(102100);
                gsvc.project(proParams, function (geometries) {
                    var customPoly = geometries[0];
                    passThis_1.esriMap.graphics.add(new esri.Graphic(customPoly, passThis_1.esriMapSymbolFill));
                    var gExtent = customPoly.getExtent().expand(2);
                    passThis_1.esriMap.setExtent(gExtent);
                }, function (error) {
                    console.log("Projection failed: " + error);
                });
            }
            var objectids = "";
            for (var i = 0; i < this.graphicsArrayPrimaryRecords.length; i++) {
                if (i == nextBreak) {
                    objectids = "project_nbr IN (" + objectids + ")";
                    this.esriMapLayerDefs.push(objectids);
                    nextBreak += recordsPerBreak;
                    objectids = "";
                }
                if (objectids != "")
                    objectids += ",";
                objectids += this.graphicsArrayPrimaryRecords[i].attributes["project_nbr"];
            }
            //add last set
            if (!this._IsNullOrEmpty(objectids, 2)) {
                objectids = "project_nbr IN (" + objectids + ")";
                this.esriMapLayerDefs.push(objectids);
            }
            this.areaMaxLayersToLoad = this.esriMapLayerDefs.length;
            this._LoadMapLayerNext();
        };
        OE_OWRTReportsAreaViewModel.prototype._LoadMapLayerNext = function () {
            if (this._IsNullOrEmpty(this.esriMapLayerDefs) || this.esriMapLayerDefs.length < 1) {
                this.areaMapLegend.set("Map");
                return;
            }
            var defString = this.esriMapLayerDefs.pop();
            if (this._IsNullOrEmpty(defString)) {
                this.areaMapLegend.set("Map");
                return;
            }
            var defsIn = [];
            defsIn[this.layerIDProjectPoints] = defString;
            if (this._IsNullOrEmpty(this.esriPointsLayer)) {
                var imageParams = new esri.layers.ImageParameters();
                imageParams.layerIds = [this.layerIDProjectPoints];
                imageParams.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
                imageParams.transparent = true;
                imageParams.layerDefinitions = defsIn;
                this.esriPointsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(this.urlMainMapService, { "id": "owrtPoints", "imageParameters": imageParams });
                this.esriPointsLayer.setDisableClientCaching(true);
                this.esriPointsLayer.id = "owrtPoints";
                this.esriMap.reorderLayer(this.esriPointsLayer, 10);
                this.esriMap.addLayer(this.esriPointsLayer);
                var d = new Date();
                console.log("Map layer added: " + d);
            }
            else if (!this._IsNullOrEmpty(this.esriPointsLayer)) {
                this.esriMap.getLayer("owrtPoints").setLayerDefinitions(defsIn);
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._loadEsirMap = function (graphicIn, featuresIn, thisView) {
            var d = new Date();
            console.log("Start map render: " + d);
            if (typeof this.esriMap == "undefined" || this.esriMap == null) {
                this.esriMap = new esri.Map("oeOWRTAreaMap", {
                    //center: [44.17432483, -120.5859375],
                    center: new esri.geometry.Point(-120.58, 44.17),
                    zoom: 6,
                    basemap: "streets",
                    minZoom: 6,
                    slider: true
                });
                var viewThis = this;
                this.esriMap.on("load", function (event) {
                    var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/27");
                    event.map.addLayer(featureLayer);
                    var modelRef = viewThis;
                    //area layer                
                    viewThis._GeoTypeLayerToDisplay(viewThis);
                    //only zoom to map extent if no area layer is present
                    if (viewThis.esriAreaLayer == null) {
                        viewThis.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);
                    }
                    //load all the layers
                    viewThis._LoadMapLayers();
                    var d = new Date();
                    console.log("Map loaded: " + d);
                });
            }
            else {
                //area layer
                this._GeoTypeLayerToDisplay(this);
                if (this.esriAreaLayer == null)
                    this.esriMap.centerAndZoom(new esri.geometry.Point(-120.58, 44.17), 6);
                //load all the layers
                this._LoadMapLayers();
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._GeoTypeLayerToDisplay = function (viewRef) {
            var viewMap = viewRef.esriMap;
            //always remove this layer first
            if (typeof viewRef.esriAreaLayer != "undefined" && viewRef.esriAreaLayer != null)
                viewMap.removeLayer(viewRef.esriAreaLayer);
            switch (this.geoTypeValue.get()) {
                case "basin":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlBasins);
                    break;
                case "subbasin":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlHUC8);
                    break;
                case "county":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlCounty);
                    break;
                case "wsc":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlWSC);
                    viewRef.esriAreaLayer.setOpacity(.50);
                    break;
                case "swcd":
                    viewRef.esriAreaLayer = new esri.layers.FeatureLayer(viewRef.queryUrlSWCD);
                    break;
                case "state":
                default:
                    viewRef.esriAreaLayer = null;
                    break;
            }
            if (viewRef.esriAreaLayer != null) {
                viewRef.esriAreaLayer.setDefinitionExpression(viewRef.geoTypeGeometryLayerDef.get());
                viewMap.addLayer(viewRef.esriAreaLayer);
                this.esriMap.reorderLayer(viewRef.esriAreaLayer, 1);
                viewRef.esriAreaLayer.on("load", function (event) {
                    //use the selected geometry to set extent
                    viewRef.esriMap.setExtent(viewRef.selectedAreaGeometry.getExtent().expand(1.4));
                });
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._ClearFundingClasses = function () {
            this.oeOWRTFundingChartTotalClass.set("");
            this.oeOWRTFundingChartYearClass.set("");
            this.oeOWRTFundingChartActivityClass.set("");
            this.oeOWRTFundingChartActivityYearClass.set("");
            this.oeOWRTFundingChartSourceClass.set("");
        };
        OE_OWRTReportsAreaViewModel.prototype.ShowChart = function (workingTab, workingChart, legendName) {
            if (legendName === void 0) { legendName = ""; }
            this.CloseChartTableView();
            this.activeTabChartName = workingTab + workingChart;
            if (workingTab == "projects") {
                this.owrtChartProjectsVisible.set(true);
                if (workingChart == "year") {
                    this.oeOWRTProjChartYearClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.projectChartLegendText.set("Number of Projects by Year");
                    this.oeOWRTProjChartActivityClass.set("");
                    this.ShowProjectChartYear(workingChart);
                }
                else if (workingChart == "activity") {
                    this.oeOWRTProjChartActivityClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.projectChartLegendText.set("Number of Projects by Activity Type");
                    this.oeOWRTProjChartYearClass.set("");
                    this.ShowProjectsActivity(workingChart);
                }
                this.lastProjectTabChartName = this.activeTabChartName;
            }
            else if (workingTab == "funding") {
                this.owrtChartFundsVisible.set(true);
                if (workingChart == "total") {
                    this._ClearFundingClasses();
                    this.oeOWRTFundingChartTotalClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Total Investment in Projects");
                    this.ShowFundingTotal(workingChart);
                }
                else if (workingChart == "year") {
                    this._ClearFundingClasses();
                    this.oeOWRTFundingChartYearClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Year");
                    this.ShowFundingYear(workingChart);
                }
                else if (workingChart == "activity") {
                    this._ClearFundingClasses();
                    this.oeOWRTFundingChartActivityClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Activity");
                    this.ShowFundingActivity(workingChart);
                }
                else if (workingChart == "activityYear") {
                    this._ClearFundingClasses();
                    this.oeOWRTFundingChartActivityYearClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Activity By Year");
                    this.ShowFundingActivityYear(workingChart);
                }
                else if (workingChart == "source") {
                    this._ClearFundingClasses();
                    this.oeOWRTFundingChartSourceClass.set("oeOWRTAreaChartSelectionBoxSelected");
                    this.fundingChartLegendText.set("Investments By Source");
                    this.ShowFundingSource(workingChart);
                }
                this.lastFundingTabChartName = this.activeTabChartName;
            }
            else if (workingTab == "results") {
                this.resultsFieldSetVisible.set(true);
                this.resultsChartLegendText.set(legendName);
                var workingDataSet = this.owebResultChartDataSets[workingChart];
                this._ShowOWEBResultChart(this[workingDataSet.dataKey], workingDataSet.unit, "total", workingDataSet.name);
                this.lastResultsChartName = this.activeTabChartName;
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._FindActivitySymbolColor = function (activityType, cssType, toHex) {
            if (cssType === void 0) { cssType = true; }
            if (toHex === void 0) { toHex = false; }
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            for (var i = 0; i < this.owrtActivitySymbols.length; i++) {
                var valueString = this.owrtActivitySymbols[i].value;
                if (valueString.toLowerCase() == activityType.toLowerCase()) {
                    if (cssType) {
                        var colorOut = "background-color: rgb(";
                        //drop off the alpha value for IE support                    
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        for (var c = 0; c < colorArray.length; c++) {
                            colorOut += colorArray[c];
                            if (c < colorArray.length - 1)
                                colorOut += ",";
                        }
                        colorOut += ")";
                        return colorOut;
                    }
                    else {
                        //drop off the alpha value for IE support
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        if (toHex)
                            return rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
                        else
                            return colorArray;
                    }
                }
            }
            //default color
            if (cssType)
                return "background-color: rgb(255, 99, 71)";
            else {
                if (toHex)
                    return rgbToHex(255, 99, 71);
                else
                    return "rgb(255, 99, 71)";
            }
        };
        OE_OWRTReportsAreaViewModel.prototype._generateRGBArrayFromCount = function (maxColors, asHex) {
            if (asHex === void 0) { asHex = false; }
            /**
                 * HSV to RGB color conversion
                 *
                 * H runs from 0 to 360 degrees
                 * S and V run from 0 to 100
                 *
                 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
                 * http://www.cs.rit.edu/~ncs/color/t_convert.html
                 */
            function hsvToRgb(h, s, v) {
                var r, g, b;
                var i;
                var f, p, q, t;
                // Make sure our arguments stay in-range
                h = Math.max(0, Math.min(360, h));
                s = Math.max(0, Math.min(100, s));
                v = Math.max(0, Math.min(100, v));
                // We accept saturation and value arguments from 0 to 100 because that's
                // how Photoshop represents those values. Internally, however, the
                // saturation and value are calculated from a range of 0 to 1. We make
                // That conversion here.
                s /= 100;
                v /= 100;
                if (s == 0) {
                    // Achromatic (grey)
                    r = g = b = v;
                    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                }
                h /= 60; // sector 0 to 5
                i = Math.floor(h);
                f = h - i; // factorial part of h
                p = v * (1 - s);
                q = v * (1 - s * f);
                t = v * (1 - s * (1 - f));
                switch (i) {
                    case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;
                    case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;
                    case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;
                    case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;
                    case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;
                    default: // case 5:
                        r = v;
                        g = p;
                        b = q;
                }
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
            ;
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            var colorsOut = [];
            //return a single color
            if (maxColors == 1) {
                if (asHex) {
                    colorsOut.push(rgbToHex(224, 100, 50));
                }
                else {
                    colorsOut.push([224, 100, 50]);
                }
                return colorsOut;
            }
            // distribute the colors evenly on
            // the hue range (the 'H' in HSV)
            var i = 360 / (maxColors - 1);
            // hold the generated colors        
            var sv = 70;
            var workingRGB;
            for (var x = 0; x < maxColors; x++) {
                // alternate the s, v for more
                // contrast between the colors.
                sv = sv > 90 ? 70 : sv + 10;
                if (asHex) {
                    workingRGB = hsvToRgb(i * x, sv, sv);
                    colorsOut.push(rgbToHex(workingRGB[0], workingRGB[1], workingRGB[2]));
                }
                else {
                    colorsOut.push(hsvToRgb(i * x, sv, sv));
                }
            }
            return colorsOut;
        };
        return OE_OWRTReportsAreaViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_OWRTReportsAreaViewModel = OE_OWRTReportsAreaViewModel;
});

},
"geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsModule": function () {
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
    var OE_OWRTReportsModule = /** @class */ (function (_super) {
        __extends(OE_OWRTReportsModule, _super);
        //viewerApp: Observable<ViewerApplication>;
        function OE_OWRTReportsModule(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_OWRTReportsModule.prototype.initialize = function (config) {
            //alert(this.app.getResource(this.libraryId, "language-hello-world-initialized"));                
        };
        return OE_OWRTReportsModule;
    }(ModuleBase_1.ModuleBase));
    exports.OE_OWRTReportsModule = OE_OWRTReportsModule;
});

},
"geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsView": function () {
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
    var OE_OWRTReportsView = /** @class */ (function (_super) {
        __extends(OE_OWRTReportsView, _super);
        function OE_OWRTReportsView(app, lib) {
            return _super.call(this, app, lib) || this;
        }
        OE_OWRTReportsView.prototype.toggleElement = function (event, element, context) {
            context.visible.set(!context.visible.get());
            context.collapseImgVisisble.set(!context.collapseImgVisisble.get());
            context.expandImgVisisble.set(!context.expandImgVisisble.get());
        };
        ;
        OE_OWRTReportsView.prototype.toggleTabMain = function (event, element, context) {
            context.ToggleTabMain();
        };
        OE_OWRTReportsView.prototype.toggleTabCharts = function (event, element, context) {
            context.ToggleTabCharts();
        };
        /*toggleChartActivity(event, element, context) {
            (<OE_OWRTReportsViewModel>context).BuildChartActivity();
        }
    
        toggleChartPart(event, element, context) {
            (<OE_OWRTReportsViewModel>context).BuildChartParticipant();
        }*/
        OE_OWRTReportsView.prototype.loadProjectNbr = function (event, element, context) {
            console.log("Change event");
            context._oeReportQueries(element.value);
        };
        OE_OWRTReportsView.prototype.printReport = function (event, element, context) {
            context.PrintReport();
        };
        return OE_OWRTReportsView;
    }(ViewBase_1.ViewBase));
    exports.OE_OWRTReportsView = OE_OWRTReportsView;
});

},
"geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsViewModel": function () {
/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.AMD.d.ts"/>
/// <reference path="./../../_Definitions/Essentials.AMD.d.ts" />
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
define(["require", "exports", "geocortex/framework/ui/ViewModelBase", "geocortex/framework/observables", "geocortex/framework/observables", "geocortex/charting/ChartViewModelFactory", "geocortex/charting/globalization/KendoFormatProvider", "geocortex/charting/ChartSeriesProvider", "geocortex/charting/infrastructure/ChartPointAdapterRegistry", "geocortex/charting/infrastructure/aggregation/ChartPointCollectionAggregator", "geocortex/charting/infrastructure/configuration/ChartDefinition", "geocortex/charting/infrastructure/Enums", "../OE_OWRTReports/OE_JsonAdapter"], function (require, exports, ViewModelBase_1, observables_1, observables_2, ChartViewModelFactory_1, KendoFormatProvider_1, ChartSeriesProvider_1, ChartPointAdapterRegistry_1, ChartPointCollectionAggregator_1, ChartDefinition_1, Enums_1, OE_JsonAdapter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OE_OWRTReportsViewModelSequenceTask = /** @class */ (function () {
        function OE_OWRTReportsViewModelSequenceTask(qt, queryIn, relationshipQuery) {
            if (relationshipQuery === void 0) { relationshipQuery = false; }
            this.queryTask = qt;
            this.query = queryIn;
            this.isRelationshipsQuery = relationshipQuery;
        }
        return OE_OWRTReportsViewModelSequenceTask;
    }());
    exports.OE_OWRTReportsViewModelSequenceTask = OE_OWRTReportsViewModelSequenceTask;
    var OE_OWRTReportsViewModel = /** @class */ (function (_super) {
        __extends(OE_OWRTReportsViewModel, _super);
        function OE_OWRTReportsViewModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loaderVisible = new observables_1.Observable(true);
            _this.loaderMessage = new observables_1.Observable("Loading Report...");
            _this.loaderSpinner = new observables_1.Observable(true);
            _this.loaderWarnIcon = new observables_1.Observable(false);
            _this.inputBlockOnError = new observables_1.Observable(false);
            _this.printAreaVisible = new observables_1.Observable(true);
            _this.printButtonVisible = new observables_1.Observable(false);
            _this.tabMainClassName = new observables_1.Observable("");
            _this.tabChartsClassName = new observables_1.Observable("");
            _this.mainReportVisible = new observables_1.Observable(true);
            _this.chartReportVisible = new observables_1.Observable(true);
            _this.chartPartVisible = new observables_1.Observable(true);
            _this.chartActVisible = new observables_1.Observable(false);
            _this.activeChartName = new observables_1.Observable("");
            _this.chartFundingActivity = null;
            _this.chartFundingActivityData = {};
            _this.chartFundingPart = null;
            _this.chartFundingPartData = {};
            _this.sequenceTasks = [];
            _this.sequenceErrors = "";
            _this.sequenceOnComplete = null;
            _this.owrtActivitySymbols = [];
            _this.projectInfo = null;
            _this.participants = null;
            _this.partRoles = null;
            _this.partSuperTypes = null;
            _this.partTypes = null;
            _this.activities = null;
            _this.activityTypes = null;
            _this.project_results = null;
            _this.project_metrics = null;
            _this.project_goals = null;
            _this.project_activites = null;
            _this.project_species = null;
            _this.project_landuses = null;
            _this.project_partcipants = new observables_2.ObservableCollection(null);
            _this.project_results_observe = new observables_2.ObservableCollection(null);
            _this.project_goals_observe = new observables_2.ObservableCollection(null);
            _this.project_metrics_observe = new observables_2.ObservableCollection(null);
            _this.project_activites_observe = new observables_2.ObservableCollection(null);
            _this.project_nbr = new observables_1.Observable("");
            _this.project_name = new observables_1.Observable("");
            _this.project_start_year = new observables_1.Observable("");
            _this.project_complete_year = new observables_1.Observable("");
            _this.project_activities_blob = new observables_1.Observable("");
            _this.project_site_selection = new observables_1.Observable("");
            _this.project_speices_observe = new observables_1.Observable("");
            //project location block
            _this.project_watershed = new observables_1.Observable("");
            _this.project_subwatershed = new observables_1.Observable("");
            _this.project_tributary_of = new observables_1.Observable("");
            _this.project_stream_name = new observables_1.Observable("");
            _this.project_townshipRangeSection = new observables_1.Observable("");
            _this.project_dominant_land_use = new observables_1.Observable("");
            return _this;
        }
        OE_OWRTReportsViewModel.prototype.initialize = function (config) {
            var _this = this;
            var site = this.app.site;
            this.reportMapServiceName = config.reportMapServiceName || "OWRT";
            if (site && site.isInitialized) {
                this._onSiteInitialized();
            }
            else {
                this.app.eventRegistry.event("SiteInitializedEvent").subscribe(this, function (args) {
                    _this._onSiteInitialized();
                });
            }
        };
        OE_OWRTReportsViewModel.prototype.deactivated = function () {
            this._destoryMainCharts();
            this._destoryPrintCharts();
        };
        OE_OWRTReportsViewModel.prototype._onSiteInitialized = function () {
            var _this = this;
            //register tagging command
            this.app.commandRegistry.command("oeOWRTprojectReport").register(this, this._oeOWRTprojectReport);
            // Register our custom JSON data adapter with the charting infrastructure.
            var jsonDataAdapter = new OE_JsonAdapter_1.OE_ChartPointJsonAdapter();
            var sourceTypeString = Enums_1.ChartFieldSourceType[Enums_1.ChartFieldSourceType.Json];
            ChartPointAdapterRegistry_1.ChartPointAdapterRegistry.registerAdapter(jsonDataAdapter, sourceTypeString);
            this.initializeChartFactory();
            var mService = this._GetServiceByName(this.reportMapServiceName);
            this.queryUrlOWRT = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "ALL_POLYS_SDE_WM").id;
            this.queryUrlCentroids = mService.serviceUrl + "/" + this._GetLayerIDByName(mService, "CentroidsSimple").id;
            this.queryUrlProjectInfo = mService.serviceUrl + "/";
            this.queryUrlProjectInfo += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PROJECT_INFO"))) ? "28" : this._GetTableIDByName(mService, "PROJECT_INFO").id;
            console.log("PROJECT_INFO: " + this.queryUrlProjectInfo);
            this.queryUrlPartRoles = mService.serviceUrl + "/";
            this.queryUrlPartRoles += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_ROLE_LU"))) ? "25" : this._GetTableIDByName(mService, "PARTICIPANTS_ROLE_LU").id;
            console.log("PARTICIPANTS_ROLE_LU: " + this.queryUrlPartRoles);
            this.queryUrlPartSuperTypes = mService.serviceUrl + "/";
            this.queryUrlPartSuperTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU"))) ? "26" : this._GetTableIDByName(mService, "PARTICIPANTS_SUPERTYPE_LU").id;
            console.log("PARTICIPANTS_SUPERTYPE_LU: " + this.queryUrlPartSuperTypes);
            this.queryUrlPartTypes = mService.serviceUrl + "/";
            this.queryUrlPartTypes += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU"))) ? "27" : this._GetTableIDByName(mService, "PARTICIPANTS_TYPE_LU").id;
            console.log("PARTICIPANTS_TYPE_LU: " + this.queryUrlPartTypes);
            this.queryUrlLandUse = mService.serviceUrl + "/";
            this.queryUrlLandUse += (this._IsNullOrEmpty(this._GetTableIDByName(mService, "LAND_USE"))) ? "22" : this._GetTableIDByName(mService, "LAND_USE").id;
            console.log("LAND_USE: " + this.queryUrlLandUse);
            //create the map symbol
            this.esriMapSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 255, 255]), 2), new esri.Color([0, 255, 255, 0.35]));
            //new esri.Color([0, 255, 255]), 4), new esri.Color([0, 255, 255, 0.25])
            //get the OWRT drawing color data
            var requestHandle = esri.request({
                "url": this.queryUrlOWRT + "?f=json",
                handleAs: "json",
                callbackParamName: "callback"
            });
            requestHandle.then(function (response, io) {
                //console.log(response);
                if (response && response.drawingInfo && response.drawingInfo.renderer && response.drawingInfo.renderer.uniqueValueInfos) {
                    _this.owrtActivitySymbols = response.drawingInfo.renderer.uniqueValueInfos;
                }
            }, function (error, io) {
                console.log("OWRT symbol request error: " + error);
                _this.owrtActivitySymbols = [];
            });
        };
        OE_OWRTReportsViewModel.prototype._GetServiceByName = function (name) {
            var mService = this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName == name; }).length > 0 ?
                this.app.site.essentialsMap.mapServices.filter(function (ms) { return ms.displayName === name; })[0] : null;
            return mService;
        };
        OE_OWRTReportsViewModel.prototype._GetLayerIDByName = function (mService, name) {
            var workLayer = mService.layers.filter(function (ly) { return ly.name == name; }).length > 0 ?
                mService.layers.filter(function (ly) { return ly.name === name; })[0] : null;
            return workLayer;
        };
        OE_OWRTReportsViewModel.prototype._GetTableIDByName = function (mService, name) {
            var workLayer = null;
            try {
                workLayer = mService.tables.filter(function (ly) { return ly.name == name; }).length > 0 ?
                    mService.tables.filter(function (ly) { return ly.name === name; })[0] : null;
            }
            catch (e) { }
            return workLayer;
        };
        OE_OWRTReportsViewModel.prototype._GetTableRelationshipIDByName = function (mService, layerName, relationshipName, searchTables) {
            if (searchTables === void 0) { searchTables = false; }
            //ALL_POLYS
            var workingLayer = null;
            var workingList = (searchTables == true) ? mService.tables : mService.layers;
            try {
                workingLayer = workingList.filter(function (ly) { return ly.name == layerName; }).length > 0 ?
                    workingList.filter(function (ly) { return ly.name === layerName; })[0] : null;
            }
            catch (e) { }
            var workingRelationship = null;
            relationshipName = relationshipName.toLowerCase();
            try {
                workingRelationship = workingLayer.relationships.filter(function (workRelate) { return workRelate.name.toLowerCase() == relationshipName; }).length > 0 ?
                    workingLayer.relationships.filter(function (workRelate) { return workRelate.name.toLowerCase() === relationshipName; })[0] : null;
            }
            catch (e) { }
            if (workingRelationship != null)
                return workingRelationship.id;
            else
                return -1;
        };
        OE_OWRTReportsViewModel.prototype._GetFieldByTypeID = function (featureSet, idFieldName, idTarget, valueFieldName) {
            for (var i = 0; i < featureSet.features.length; i++) {
                if (featureSet.features[i].attributes[idFieldName] &&
                    featureSet.features[i].attributes[valueFieldName] &&
                    featureSet.features[i].attributes[idFieldName] == idTarget)
                    return featureSet.features[i].attributes[valueFieldName];
            }
            return "";
        };
        OE_OWRTReportsViewModel.prototype._IsNullOrEmpty = function (testValue, testLength) {
            if (testLength === void 0) { testLength = -1; }
            if (typeof testValue === "undefined" || testValue == null)
                return true;
            if (testLength > -1)
                return !(testValue.length > testLength);
            return false;
        };
        OE_OWRTReportsViewModel.prototype._NewSequence = function (onComplete) {
            //clear tasks
            this.sequenceTasks = [];
            this.sequenceErrors = "";
            this.sequenceOnComplete = onComplete;
        };
        OE_OWRTReportsViewModel.prototype._MoveCurrentSequenceProgress = function () {
            if (this.sequenceTasks.length > 0) {
                var sTask = this.sequenceTasks.pop();
                if (sTask.isRelationshipsQuery)
                    sTask.queryTask.executeRelationshipQuery(sTask.query);
                else
                    sTask.queryTask.execute(sTask.query);
            }
            else {
                if (this.sequenceOnComplete)
                    this.sequenceOnComplete();
            }
        };
        OE_OWRTReportsViewModel.prototype._sequenceQuery = function (queryString, where, outFields, targetFeatureSet, logName) {
            var _this = this;
            var myModel = this;
            var query = new esri.tasks.Query();
            query.where = where;
            query.outFields = outFields;
            query.returnGeometry = false;
            var queryTask = new esri.tasks.QueryTask(queryString);
            queryTask.on("complete", function (results) {
                if (results && results.featureSet && results.featureSet.features.length > 0) {
                    myModel[targetFeatureSet] = results.featureSet;
                }
                else {
                    _this.sequenceErrors += logName + " Complete: Empty object or no results.";
                }
                _this._MoveCurrentSequenceProgress();
            });
            queryTask.on("error", function (results) {
                _this.sequenceErrors += logName + " Error: " + results.error;
                _this._MoveCurrentSequenceProgress();
            });
            this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query));
        };
        OE_OWRTReportsViewModel.prototype._sequenceRelationshipQuery = function (queryURL, objectID, relationshipID, outFields, targetFeatureSet, logName) {
            var _this = this;
            var myModel = this;
            var query = new esri.tasks.RelationshipQuery();
            query.objectIds = [objectID];
            query.returnGeometry = false;
            query.relationshipId = relationshipID;
            query.outFields = outFields;
            var queryTask = new esri.tasks.QueryTask(queryURL);
            queryTask.on("execute-relationship-query-complete", function (results) {
                if (results && results.featureSets[objectID] && results.featureSets[objectID].features.length > 0) {
                    myModel[targetFeatureSet] = results.featureSets[objectID];
                }
                else {
                    _this.sequenceErrors += logName + " Complete: Empty object or no results.";
                }
                _this._MoveCurrentSequenceProgress();
            });
            queryTask.on("error", function (results) {
                _this.sequenceErrors += logName + " Error: " + results.error;
                _this._MoveCurrentSequenceProgress();
            });
            this.sequenceTasks.push(new OE_OWRTReportsViewModelSequenceTask(queryTask, query, true));
        };
        OE_OWRTReportsViewModel.prototype._BuildTypesAndRelationships = function (objectID) {
            //clear tasks
            this.sequenceTasks = [];
            //setup a new sequence        
            this.sequenceErrors = "";
            this.sequenceOnComplete = this._BuildRelationships; //when the follow sequence of queries are done build the relationships
            //types
            this._sequenceQuery(this.queryUrlPartRoles, "1=1", ["participant_role_lu_id,role,active"], "partRoles", "Participant Role");
            this._sequenceQuery(this.queryUrlPartSuperTypes, "1=1", ["participant_super_type,super_type_lu_id"], "partSuperTypes", "Participant Super Type");
            this._sequenceQuery(this.queryUrlPartTypes, "1=1", ["participant_type,super_type_lu_id,participant_type_lu_id,active,gov_nongov"], "partTypes", "Participant Type");
            //related records to project
            var mService = this._GetServiceByName(this.reportMapServiceName);
            var relationshipID = -1;
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "project_info", false);
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "projectInfo", "Project Info");
            console.log("Relationship: project_info :: " + relationshipID);
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "participants", false);
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "participants", "Participants");
            console.log("Relationship: participants :: " + relationshipID);
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "results");
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "project_results", "Project Activity Results");
            console.log("Relationship: results :: " + relationshipID);
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Goals");
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "project_goals", "Project Goals");
            console.log("Relationship: Goals :: " + relationshipID);
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Metrics");
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "project_metrics", "Project Metrics");
            console.log("Relationship: Metrics :: " + relationshipID);
            relationshipID = this._GetTableRelationshipIDByName(mService, "ALL_POLYS_SDE_WM", "Species");
            this._sequenceRelationshipQuery(this.queryUrlOWRT, objectID, relationshipID, ["*"], "project_species", "Project Species");
            console.log("Relationship: Species :: " + relationshipID);
            this._MoveCurrentSequenceProgress();
        };
        OE_OWRTReportsViewModel.prototype._oeOWRTprojectReport = function (project_nbr) {
            //ModalWindowRegion
            this.app.commandRegistry.command("ActivateView").execute("OE_OWRTReportsView");
            if (typeof project_nbr != "string") {
                if (typeof project_nbr === "number") {
                    project_nbr = project_nbr.toString();
                }
                else if (typeof project_nbr._graphic !== "undefined") {
                    //table context
                    project_nbr = project_nbr._graphic.attributes.project_nbr;
                }
            }
            this._oeReportQueries(project_nbr);
        };
        OE_OWRTReportsViewModel.prototype._oeReportQueries = function (project_nbr) {
            var _this = this;
            this.printButtonVisible.set(false);
            this.loaderMessage.set("Loading Report...");
            this.loaderWarnIcon.set(false);
            this.loaderSpinner.set(true);
            this.loaderVisible.set(true);
            this.inputBlockOnError.set(false);
            this.printAreaVisible.set(true);
            this.mainReportVisible.set(true);
            this.chartReportVisible.set(true);
            //no number, default to one
            if (!project_nbr) {
                this._StopOnErrorMessage("No project number supplied. Example project number: 20090660.");
                return;
            }
            //force string type
            project_nbr = project_nbr.toString();
            //invalid number, default to one
            var matchResult = project_nbr.match(/^[0-9]+$/g);
            if (matchResult == undefined || matchResult === null || matchResult.length < 1) {
                this._StopOnErrorMessage("The project number is not valid: " + project_nbr + ".");
                return;
            }
            //primary record query.  All related information queries are in the function of this call back       
            var query = new esri.tasks.Query();
            query.where = "project_nbr = " + project_nbr;
            query.outFields = ["*"];
            query.returnGeometry = true;
            var thisView = this;
            var queryTask = new esri.tasks.QueryTask(this.queryUrlOWRT);
            queryTask.on("complete", function (results) {
                if (results && results.featureSet && results.featureSet.features.length > 0) {
                    //build primary chart from record
                    _this._BuildProjectInfo(results.featureSet);
                    _this._loadEsirMap(null, results.featureSet, thisView);
                }
                else {
                    if (!results)
                        _this._StopOnErrorMessage("No result with project number " + project_nbr + " returned.");
                    else if (!results.featureSet)
                        _this._StopOnErrorMessage("No feature set with project number " + project_nbr + " returned.");
                    else if (results.featureSet.features.length < 1)
                        _this._StopOnErrorMessage("No records matching project number " + project_nbr + ".");
                }
            });
            queryTask.execute(query);
        };
        OE_OWRTReportsViewModel.prototype._StopOnErrorMessage = function (message) {
            this.loaderMessage.set(message);
            this.loaderWarnIcon.set(true);
            this.loaderSpinner.set(false);
            this.inputBlockOnError.set(true);
            this.loaderVisible.set(true);
        };
        OE_OWRTReportsViewModel.prototype._BuildProjectInfo = function (featureSet) {
            //console.log("Features Found: " + featureSet.features.length);
            var graphicToUse = featureSet.features[0];
            //single field values
            var fieldsToUse = [
                { "field": "project_nbr", "target": this.project_nbr },
                { "field": "project_name", "target": this.project_name },
                { "field": "start_year", "target": this.project_start_year },
                { "field": "complete_year", "target": this.project_complete_year },
                { "field": "drvd_project_description", "target": this.project_activities_blob },
                { "field": "project_site_selection", "target": this.project_site_selection },
                { "field": "basin_actual", "target": this.project_watershed },
                { "field": "subbasin_actual", "target": this.project_subwatershed },
                { "field": "tributary_of", "target": this.project_tributary_of },
                { "field": "stream_name", "target": this.project_stream_name }
            ];
            for (var i = 0; i < fieldsToUse.length; i++) {
                fieldsToUse[i].target.set(this._GetFieldValue(graphicToUse, fieldsToUse[i].field));
            }
            this.projectID = graphicToUse.attributes.ri_project_id;
            /*for (let fieldPointer in fieldsToUse) {
                if (typeof fieldsToUse[fieldPointer] !== "undefined" && fieldsToUse[fieldPointer] !== null)
                    fieldsToUse[fieldPointer].target.set(this._GetFieldValue(graphicToUse, fieldsToUse[fieldPointer].field));
            }*/
            //township range section string
            var townshipRangeSection = "";
            townshipRangeSection += this._GetFieldValue(graphicToUse, "township");
            townshipRangeSection += " " + this._GetFieldValue(graphicToUse, "range");
            townshipRangeSection += " " + this._GetFieldValue(graphicToUse, "section");
            this.project_townshipRangeSection.set(townshipRangeSection);
            //dominant land use
            //this.project_dominant_land_use.set("No Data");
            //build types featuersets
            this._BuildTypesAndRelationships(parseInt(this._GetFieldValue(graphicToUse, "OBJECTID"), 10));
            //gather all relationships
            //this._GetRelationships(parseInt(this._GetFieldValue(graphicToUse, "OBJECTID"),10));        
        };
        OE_OWRTReportsViewModel.prototype._BuildRelationships = function () {
            console.log("Participants feature: " + this.participants.features.length);
            this._BuildParticipants();
            this._BuildActivityResults();
            this._BuildGoals();
            this._BuildMetrics();
            this._BuildSpecies();
            this._RelatedProjectInfo(); // also pulls in activities (for funding)
        };
        OE_OWRTReportsViewModel.prototype._RelatedProjectInfo = function () {
            //set project site selection
            this.project_site_selection.set("No site selection on record.");
            if (this.projectInfo && this.projectInfo.features.length > 0) {
                var workingAttributes = this.projectInfo.features[0].attributes;
                if (workingAttributes.project_site_selection)
                    this.project_site_selection.set(workingAttributes.project_site_selection.toString());
                //get activity type funding and land use
                //clear tasks
                this._NewSequence(this._QuerysThatRequireProjectID);
                //related records to project
                var mService = this._GetServiceByName(this.reportMapServiceName);
                var relationshipID = this._GetTableRelationshipIDByName(mService, "PROJECT_INFO", "Activity_Types", true);
                this._sequenceRelationshipQuery(this.queryUrlProjectInfo, workingAttributes.OBJECTID, relationshipID, ["*"], "project_activites", "Project Activities");
                this._sequenceQuery(this.queryUrlLandUse, "project_id=" + this.projectID, ["land_use"], "project_landuses", "Project Land Uses");
                this._MoveCurrentSequenceProgress();
            }
        };
        OE_OWRTReportsViewModel.prototype._QuerysThatRequireProjectID = function () {
            this._BuildActivities();
            this._BuildLandUse();
            //build main charts
            this.BuildMainCharts();
            //build print charts now
            this.BuildAllChartsForPrint();
            //hide print area
            this.printAreaVisible.set(false);
            this.ToggleTabMain();
            //hide the loader overlay
            this.loaderVisible.set(false);
            this.printButtonVisible.set(true);
        };
        OE_OWRTReportsViewModel.prototype.ToggleTabMain = function () {
            this.chartReportVisible.set(false);
            this.mainReportVisible.set(true);
            this.tabMainClassName.set("oeOWRTReportsTabEnabled");
            this.tabChartsClassName.set("");
        };
        OE_OWRTReportsViewModel.prototype.ToggleTabCharts = function () {
            this.mainReportVisible.set(false);
            this.chartReportVisible.set(true);
            this.tabMainClassName.set("");
            this.tabChartsClassName.set("oeOWRTReportsTabEnabled");
        };
        OE_OWRTReportsViewModel.prototype.PrintReport = function () {
            var PW = window.open('', '_blank', 'Print content');
            var styleTags = document.getElementsByTagName("style");
            var styleHtml = "";
            for (var i = 0; i < styleTags.length; i++) {
                styleHtml = styleHtml + " " + styleTags[i].innerHTML;
            }
            this.printAreaVisible.set(true);
            $("#oe_owrtPR_divMapPrint").html($("#oe_owrtPR_divMap").html());
            PW.document.write("<div class=\"oe_owrtPR- module - view\">" + document.getElementById("oeOWRTDetailReportPrintArea").innerHTML + "</div>");
            PW.document.head.innerHTML = "<style>" + styleHtml + " body, html {overflow:visible; font-family:\"Segoe UI\", \"Helvetica Neue\", \"Droid Sans\", Arial, sans-serif; font-size:.8em} fieldset{margin:10px;}</style>";
            PW.document.close();
            var divLayers = PW.document.getElementById("oe_owrtPR_divMap_layer0");
            var divImages = divLayers.firstChild;
            var imageNodes = divImages.childNodes;
            for (var i = 0; i < imageNodes.length; i++) {
                imageNodes[i].style.width = "128px";
                imageNodes[i].style.height = "128px";
                if (i == 0)
                    imageNodes[i].style.transform = "translate3d(0px, 0px, -1px)";
                else if (i == 1)
                    imageNodes[i].style.transform = "translate3d(-128px, 128px, -1px)";
                else if (i == 2)
                    imageNodes[i].style.transform = "translate3d(128px, -128px, -1px)";
                else if (i == 3)
                    imageNodes[i].style.transform = "translate3d(0px, 0px, -1px)";
                else if (i >= 4)
                    imageNodes[i].style.display = "none";
            }
            //Force the print version to hide any layers that rendered too large.  This forces county borders to the locator div.
            PW.document.getElementById("oe_owrtPR_divMap_container").style.width = "280px";
            PW.document.getElementById("oe_owrtPR_divMap_container").style.height = "250px";
            PW.document.getElementById("oe_owrtPR_divMap_container").style.overflow = "hidden";
            this.printAreaVisible.set(false);
            PW.focus();
            PW.print();
            PW.close();
        };
        OE_OWRTReportsViewModel.prototype._BuildLandUse = function () {
            //Land use
            var landUseString = "";
            for (var i = 0; i < this.project_landuses.features.length; i++) {
                var workingAttributes = this.project_landuses.features[i].attributes;
                landUseString += workingAttributes.land_use;
                if (i < this.project_landuses.features.length - 1)
                    landUseString += ", ";
            }
            if (landUseString == "")
                landUseString = "No land use on record.";
            this.project_dominant_land_use.set(landUseString);
        };
        OE_OWRTReportsViewModel.prototype._BuildSpecies = function () {
            //species
            var speciesString = "";
            if (this.project_species && this.project_species.features) {
                for (var i = 0; i < this.project_species.features.length; i++) {
                    var workingAttributes = this.project_species.features[i].attributes;
                    speciesString += workingAttributes.species;
                    if (i < this.project_species.features.length - 1)
                        speciesString += ", ";
                }
            }
            if (speciesString == "")
                speciesString = "No species on record.";
            this.project_speices_observe.set(speciesString);
        };
        OE_OWRTReportsViewModel.prototype._BuildActivities = function () {
            if (!this.project_activites || this.project_activites.features.length < 1)
                return;
            this.project_activites_observe.clear();
            //get the inkind chart defintion
            this.chartFundingActivity = this._BuildRestChartDefinition("chartFunding", "Activity Funding");
            //let chartFundingActivityData: any = {};
            //let colorsToUse: any = this._generateRGBArrayFromCount(this.project_activites.features.length);
            var colorsToUse = [];
            //get symbol colors for this chart
            for (var i = 0; i < this.project_activites.features.length; i++) {
                colorsToUse.push(this._FindActivitySymbolColor(this.project_activites.features[i].attributes.activity_type, false));
            }
            //sort by treatment name
            this.project_activites.features.sort(function (a, b) {
                if (a.attributes.activity_type < b.attributes.activity_type)
                    return -1;
                if (a.attributes.activity_type > b.attributes.activity_type)
                    return 1;
                return 0;
            });
            for (var i = 0; i < this.project_activites.features.length; i++) {
                var workingAttributes = this.project_activites.features[i].attributes;
                var workingPartID = workingAttributes["OBJECTID"];
                var workingObject = null;
                workingObject = workingAttributes;
                //include activities with funding.  BEFORE the values are changed to string
                if (workingObject.total > 0) {
                    this._BuildRestChartDefinitionSeriesItem(this.chartFundingActivity, workingObject.activity_type, workingPartID, colorsToUse);
                    this.chartFundingActivityData[workingPartID] = workingObject.total;
                }
                workingObject.colorFromLegend = this._FindActivitySymbolColor(workingObject.activity_type);
                workingObject.cash = "$" + workingObject.cash;
                workingObject.inkind = "$" + workingObject.inkind;
                workingObject.total = "$" + workingObject.total;
                this.project_activites_observe.addItem(workingObject);
            }
            //Build funding chart
            //this.chartActivity = this.createPieChart(chartFundingActivity, [chartFundingActivityData], "OE_pieChartFundingActivity");                  
        };
        OE_OWRTReportsViewModel.prototype._FindActivitySymbolColor = function (activityType, cssType) {
            if (cssType === void 0) { cssType = true; }
            for (var i = 0; i < this.owrtActivitySymbols.length; i++) {
                var valueString = this.owrtActivitySymbols[i].value;
                if (valueString.toLowerCase() == activityType.toLowerCase()) {
                    if (cssType) {
                        var colorOut = "background-color: rgb(";
                        //drop off the alpha value for IE support                    
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        //drop off the alpha value for IE support
                        //let maxIndex = this.owrtActivitySymbols[i].symbol.color.length - 1;
                        for (var c = 0; c < colorArray.length; c++) {
                            colorOut += colorArray[c];
                            if (c < colorArray.length - 1)
                                colorOut += ",";
                        }
                        colorOut += ")";
                        return colorOut;
                    }
                    else {
                        //drop off the alpha value for IE support
                        var colorArray = this.owrtActivitySymbols[i].symbol.color.slice();
                        colorArray.pop();
                        return colorArray;
                    }
                    //return "background-color: rgb(" + this.owrtActivitySymbols[i].symbol.color.toString() + ")";
                }
            }
            //default color
            return "background-color: rgb(255, 99, 71)";
        };
        OE_OWRTReportsViewModel.prototype._BuildMetrics = function () {
            this.project_metrics_observe.clear();
            if (this._IsNullOrEmpty(this.project_metrics) || this._IsNullOrEmpty(this.project_metrics.features)) {
                var workingObject = { "treatment": "No treatments & metrics records for this project.", "metrics": {} };
                //workingObject.metrics = new ObservableCollection<object>();
                //workingObject.metrics.addItem({"treatment":"No treatments & metrics for this record.", "metric": "", "displayValue": "" });
                this.project_metrics_observe.addItem(workingObject);
                return;
            }
            //sort by treatment name
            this.project_metrics.features.sort(function (a, b) {
                if (a.attributes.treatment < b.attributes.treatment)
                    return -1;
                if (a.attributes.treatment > b.attributes.treatment)
                    return 1;
                return 0;
            });
            var treatments = {};
            for (var i = 0; i < this.project_metrics.features.length; i++) {
                var workingAttributes = this.project_metrics.features[i].attributes;
                var workingPartID = workingAttributes["OBJECTID"];
                var workingObject = null;
                workingObject = workingAttributes;
                //workingObject.visible = new Observable<boolean>(true);
                if (!treatments[workingObject.treatment]) {
                    workingObject.metrics = new observables_2.ObservableCollection();
                    workingObject.metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
                    treatments[workingObject.treatment] = workingObject;
                    this.project_metrics_observe.addItem(workingObject);
                }
                else {
                    treatments[workingObject.treatment].metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
                }
            }
        };
        OE_OWRTReportsViewModel.prototype._BuildGoals = function () {
            this.project_goals_observe.clear();
            if (this._IsNullOrEmpty(this.project_goals) || this._IsNullOrEmpty(this.project_goals.features)) {
                return;
            }
            //sort by goal 
            this.project_goals.features.sort(function (a, b) {
                if (a.attributes.goal < b.attributes.goal)
                    return -1;
                if (a.attributes.goal > b.attributes.goal)
                    return 1;
                return 0;
            });
            for (var i = 0; i < this.project_goals.features.length; i++) {
                var workingAttributes = this.project_goals.features[i].attributes;
                var workingPartID = workingAttributes["OBJECTID"];
                var workingObject = null;
                workingObject = workingAttributes;
                this.project_goals_observe.addItem(workingObject);
            }
        };
        OE_OWRTReportsViewModel.prototype._BuildActivityResults = function () {
            this.project_results_observe.clear();
            //this.project_treatments_observe.clear();  
            //var treatments: any = {};
            if (this._IsNullOrEmpty(this.project_results) || this._IsNullOrEmpty(this.project_results.features)) {
                return;
            }
            //sort by activity type
            this.project_results.features.sort(function (a, b) {
                if (a.attributes.activity_type < b.attributes.activity_type)
                    return -1;
                if (a.attributes.activity_type > b.attributes.activity_type)
                    return 1;
                return 0;
            });
            for (var i = 0; i < this.project_results.features.length; i++) {
                /****************************************
                     Activity Results
                *****************************************/
                var workingAttributes = this.project_results.features[i].attributes;
                var workingPartID = workingAttributes["OBJECTID"];
                var workingObject = null;
                workingObject = workingAttributes;
                this.project_results_observe.addItem(workingObject);
                /****************************************
                    Treatments & Metrics
                *****************************************/
                /* if (!treatments[workingObject.treatment]) {
     
                     workingObject.metrics = new ObservableCollection<object>();
                     workingObject.metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
     
                     treatments[workingObject.treatment] = workingObject;
     
                     this.project_treatments_observe.addItem(workingObject);
                 }
                 else {
                     treatments[workingObject.treatment].metrics.addItem({ "metric": workingObject.metric, "displayValue": workingObject.quantity + " " + workingObject.unit });
                 }*/
            }
        };
        OE_OWRTReportsViewModel.prototype._generateRGBArrayFromCount = function (maxColors) {
            /**
                 * HSV to RGB color conversion
                 *
                 * H runs from 0 to 360 degrees
                 * S and V run from 0 to 100
                 *
                 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
                 * http://www.cs.rit.edu/~ncs/color/t_convert.html
                 */
            function hsvToRgb(h, s, v) {
                var r, g, b;
                var i;
                var f, p, q, t;
                // Make sure our arguments stay in-range
                h = Math.max(0, Math.min(360, h));
                s = Math.max(0, Math.min(100, s));
                v = Math.max(0, Math.min(100, v));
                // We accept saturation and value arguments from 0 to 100 because that's
                // how Photoshop represents those values. Internally, however, the
                // saturation and value are calculated from a range of 0 to 1. We make
                // That conversion here.
                s /= 100;
                v /= 100;
                if (s == 0) {
                    // Achromatic (grey)
                    r = g = b = v;
                    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                }
                h /= 60; // sector 0 to 5
                i = Math.floor(h);
                f = h - i; // factorial part of h
                p = v * (1 - s);
                q = v * (1 - s * f);
                t = v * (1 - s * (1 - f));
                switch (i) {
                    case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;
                    case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;
                    case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;
                    case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;
                    case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;
                    default: // case 5:
                        r = v;
                        g = p;
                        b = q;
                }
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
            ;
            var colorsOut = [];
            //return a single color
            if (maxColors == 1) {
                colorsOut.push([224, 100, 50]);
                return colorsOut;
            }
            // distribute the colors evenly on
            // the hue range (the 'H' in HSV)
            var i = 360 / (maxColors - 1);
            // hold the generated colors        
            var sv = 70;
            for (var x = 0; x < maxColors; x++) {
                // alternate the s, v for more
                // contrast between the colors.
                sv = sv > 90 ? 70 : sv + 10;
                colorsOut.push(hsvToRgb(i * x, sv, sv));
            }
            return colorsOut;
        };
        OE_OWRTReportsViewModel.prototype._BuildParticipants = function () {
            var colorsToUse = this._generateRGBArrayFromCount(this.participants.features.length);
            //clear list
            this.project_partcipants.clear();
            var participantObjects = {};
            var cashTotal = 0;
            var inkindTotal = 0;
            //sort by cash, high to low
            this.participants.features.sort(function (a, b) {
                return b.attributes.cash - a.attributes.cash;
            });
            //get the cash chart defintion
            //let chartFundingActivity: RestChartDefinition = this._BuildRestChartDefinition("chartActivity", "Activity Funding");
            //get the inkind chart defintion
            this.chartFundingPart = this._BuildRestChartDefinition("chartFunding", "Participant Funding");
            //let chartFundingPartData: any = {};
            for (var i = 0; i < this.participants.features.length; i++) {
                var workingAttributes = this.participants.features[i].attributes;
                var workingPartID = workingAttributes["participant_id"];
                var workingObject = null; // = { "participant": "","contact":"","cash":"0","inkind":"0","roles":[],"types":[]};
                //first participant record add a row
                if (participantObjects && !participantObjects[workingPartID]) {
                    workingObject = workingAttributes;
                    //workingObject.htmlID = "participant" + workingPartID;
                    workingObject.visible = new observables_1.Observable(false);
                    workingObject.showParticipantBlock = new observables_1.Observable(true);
                    workingObject.collapseImgVisisble = new observables_1.Observable(false);
                    workingObject.expandImgVisisble = new observables_1.Observable(true);
                    //build chart defintions and add series item
                    //The series item fieldName needs to match the data property    workingPartID = workingPartID
                    //Only include participants with cash or inkind above 0
                    if (workingObject.cash > 0 || workingObject.inkind > 0) {
                        this._BuildRestChartDefinitionSeriesItem(this.chartFundingPart, workingObject.participant, workingPartID, colorsToUse);
                        this.chartFundingPartData[workingPartID] = workingObject.cash + workingObject.inkind;
                    }
                    cashTotal += workingObject.cash + 0;
                    inkindTotal += workingObject.inkind + 0;
                    workingObject.cash = "$" + workingObject.cash;
                    workingObject.inkind = "$" + workingObject.inkind;
                    //roles
                    workingObject.roles = new observables_2.ObservableCollection();
                    workingObject.roles.addItem({ "name": this._GetFieldByTypeID(this.partRoles, "participant_role_lu_id", workingObject.participant_role_lu_id, "role") });
                    workingObject.roleIDs = {}; //track role ids used, roles should be unique
                    workingObject.roleIDs[workingObject.participant_role_lu_id] = true;
                    //types
                    workingObject.types = new observables_2.ObservableCollection();
                    workingObject.types.addItem({ "name": this._GetFieldByTypeID(this.partTypes, "participant_type_lu_id", workingObject.participant_type_lu_id, "participant_type") });
                    workingObject.typeIDs = {}; //track type ids used, types should be unique
                    workingObject.typeIDs[workingObject.participant_type_lu_id] = true;
                    //add object to collection
                    this.project_partcipants.addItem(workingObject);
                    //save the object based on ID
                    participantObjects[workingPartID] = workingObject;
                }
                else //add more roles and/or types
                 {
                    //get the object already created
                    workingObject = participantObjects[workingPartID];
                    //roles
                    if (!workingObject.roleIDs[workingAttributes.participant_role_lu_id])
                        workingObject.roles.addItem({ "name": this._GetFieldByTypeID(this.partRoles, "participant_role_lu_id", workingAttributes.participant_role_lu_id, "role") });
                    //types
                    if (!workingObject.typeIDs[workingAttributes.participant_type_lu_id])
                        workingObject.types.addItem({ "name": this._GetFieldByTypeID(this.partTypes, "participant_type_lu_id", workingObject.participant_type_lu_id, "participant_type") });
                }
            }
            //build a final row for the total, hide participant elements
            var footerObject = null;
            footerObject = new Object();
            footerObject.visible = new observables_1.Observable(false);
            footerObject.showParticipantBlock = new observables_1.Observable(false);
            footerObject.collapseImgVisisble = new observables_1.Observable(false);
            footerObject.expandImgVisisble = new observables_1.Observable(false);
            footerObject.roles = new observables_2.ObservableCollection();
            footerObject.types = new observables_2.ObservableCollection();
            footerObject.cash = "$" + cashTotal;
            footerObject.inkind = "$" + inkindTotal;
            this.project_partcipants.addItem(footerObject);
            //Build funding chart
            //this.fundingChart = this.createPieChart(chartFundingPart, [chartFundingPartData], "OE_pieChartFunding");     
            //this.BuildChartParticipant();
        };
        OE_OWRTReportsViewModel.prototype._GetFieldValue = function (graphic, field) {
            if (typeof graphic.attributes[field] === "undefined")
                return "Undefined Field - " + field;
            if (graphic.attributes[field] === null)
                return "Null Field - " + field;
            return graphic.attributes[field];
        };
        OE_OWRTReportsViewModel.prototype.BuildMainCharts = function () {
            this._destoryMainCharts();
            //Build funding chart
            this.chartMainActivity = this.createPieChart(this.chartFundingActivity, [this.chartFundingActivityData], "OE_pieChartActivity", 400);
            this.activeChartName.set("Activity Funding");
            this.chartMainFunding = this.createPieChart(this.chartFundingPart, [this.chartFundingPartData], "OE_pieChartFunding", 400);
            this.activeChartName.set("Participant Funding");
        };
        OE_OWRTReportsViewModel.prototype.BuildAllChartsForPrint = function () {
            this._destoryPrintCharts();
            this.chartActivity = this.createPieChart(this.chartFundingActivity, [this.chartFundingActivityData], "OE_ChartActivityForPrint", 380);
            this.chartFunding = this.createPieChart(this.chartFundingPart, [this.chartFundingPartData], "OE_ChartFundingForPrint", 380);
        };
        OE_OWRTReportsViewModel.prototype._destoryPrintCharts = function () {
            if (this.chartFunding) {
                this.app.command("DestroyView").execute(this.chartFunding.id);
            }
            this.chartFunding = null;
            if (this.chartActivity) {
                this.app.command("DestroyView").execute(this.chartActivity.id);
            }
            this.chartActivity = null;
        };
        OE_OWRTReportsViewModel.prototype._destoryMainCharts = function () {
            if (this.chartMainFunding) {
                this.app.command("DestroyView").execute(this.chartMainFunding.id);
            }
            this.chartMainFunding = null;
            if (this.chartMainActivity) {
                this.app.command("DestroyView").execute(this.chartMainActivity.id);
            }
            this.chartMainActivity = null;
        };
        OE_OWRTReportsViewModel.prototype._loadEsirMap = function (graphicIn, featureSetIn, thisView) {
            var point = null;
            if (graphicIn && graphicIn != null && graphicIn.geometry)
                point = graphicIn.geometry;
            else
                point = new esri.geometry.Point(-120.58, 44.17);
            if (typeof this.esriMap == "undefined" || this.esriMap == null) {
                this.esriMap = new esri.Map("oe_owrtPR_divMap", {
                    //center: [44.17432483, -120.5859375],
                    center: new esri.geometry.Point(-120.58, 44.17),
                    zoom: 5,
                    basemap: "streets",
                    minZoom: 5,
                    slider: true
                });
                var viewThis = this;
                this.esriMap.on("load", function (event) {
                    console.log(event.map);
                    //markerSymbol.setColor(new esri.Color("#00FFFF"));
                    //markerSymbol.setOutline(new esri.symbol.SimpleLineSymbol())
                    /*var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                    markerSymbol.setColor(new esri.Color("#00FFFF"));
                    (<esri.Map>event.map).graphics.add(new esri.Graphic(point, markerSymbol));*/
                    for (var i = 0; i < featureSetIn.features.length; i++) {
                        featureSetIn.features[i].setSymbol(thisView.esriMapSymbol);
                        event.map.graphics.add(featureSetIn.features[i]);
                    }
                    //this.esriProjectLayer = new esri.layers.FeatureLayer(this._MakeFeatureCollection(featureSetIn));
                    //(<esri.Map>event.map).addLayer(this.esriProjectLayer);
                    //var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/40");
                    var featureLayer = new esri.layers.FeatureLayer("https://lib-gis1.library.oregonstate.edu/arcgis/rest/services/oreall/oreall_admin/MapServer/27");
                    event.map.addLayer(featureLayer);
                    event.map.setExtent(esri.graphicsExtent(featureSetIn.features).expand(2));
                });
            }
            else {
                this.esriMap.graphics.clear();
                for (var i = 0; i < featureSetIn.features.length; i++) {
                    featureSetIn.features[i].setSymbol(this.esriMapSymbol);
                    this.esriMap.graphics.add(featureSetIn.features[i]);
                }
                this.esriMap.setExtent(esri.graphicsExtent(featureSetIn.features).expand(2));
                /*var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                markerSymbol.setColor(new esri.Color("#00FFFF"));
                this.esriMap.graphics.add(new esri.Graphic(point, markerSymbol));*/
                //if (typeof this.esriProjectLayer != "undefined")
                //this.esriMap.removeLayer(this.esriProjectLayer);
                //this.esriProjectLayer = new esri.layers.FeatureLayer(this._MakeFeatureCollection(featureSetIn));
                //this.esriMap.addLayer(this.esriProjectLayer);            
            }
        };
        OE_OWRTReportsViewModel.prototype.initializeChartFactory = function () {
            var chartingLibraryId = "Charting";
            var numberAndDateFormatter = new KendoFormatProvider_1.KendoFormatProvider();
            var seriesProvider = new ChartSeriesProvider_1.ChartSeriesProvider(this.app, chartingLibraryId);
            var aggregator = new ChartPointCollectionAggregator_1.ChartPointCollectionAggregator();
            aggregator.formatProvider = numberAndDateFormatter;
            this.chartFactory = new ChartViewModelFactory_1.ChartViewModelFactory(this.app, chartingLibraryId);
            this.chartFactory.id = "ChartViewModelFactory";
            this.chartFactory.initialize({
                formatProvider: numberAndDateFormatter,
                seriesProvider: seriesProvider,
                aggregator: aggregator
            });
            this.app.registerFrameworkObject(this.chartFactory);
        };
        OE_OWRTReportsViewModel.prototype.createPieChart = function (chartConfig, data, targetRegion, widthIn) {
            if (widthIn === void 0) { widthIn = 250; }
            var chartDefinition = new ChartDefinition_1.ChartDefinition(chartConfig);
            // Create chart view model from chart config & data.
            var chartViewModel = this.chartFactory.createInstance(chartDefinition, Enums_1.ChartFeatureType.SingleFeature, data);
            chartViewModel.width.set(widthIn);
            //chartViewModel.autoSize.set(false);
            //chartViewModel.interactiveLegend.set(true);
            //chartViewModel.pieStartAngle.set(90);
            // Create the chart.
            var chart = this.app.viewManager.createView({
                markupResource: "geocortex/charting/Chart.html",
                typeName: "geocortex.charting.Chart",
                isVisible: true,
                libraryId: "Charting",
                regionName: targetRegion
            });
            // Attach the view to the view model. This will cause all of its binding expressions to be evaluated.
            chart.attach(chartViewModel);
            return chart;
        };
        OE_OWRTReportsViewModel.prototype._BuildRestChartDefinition = function (idIn, displayName) {
            var json = {
                id: idIn,
                displayName: displayName,
                visible: true,
                chartType: "Pie",
                area: {
                    background: [255, 255, 255, 255],
                    foreground: [0, 0, 0, 255],
                    showLabels: true,
                    colorPalette: Enums_1.ChartColorPalette.Rainbow,
                    showToolTips: true,
                    actionSelect: false,
                    actionPan: false,
                    actionZoom: false,
                    actionFeatureDetails: false,
                    actionRunCommand: false
                },
                legend: {
                    position: "Bottom"
                },
                series: []
            };
            return json;
        };
        OE_OWRTReportsViewModel.prototype._BuildRestChartDefinitionSeriesItem = function (chartDef, title, fieldName, colorsToUse) {
            var obj = {
                id: chartDef.series.length.toString(),
                title: title,
                valueFormat: "C0",
                color: colorsToUse[chartDef.series.length],
                field: {
                    name: fieldName,
                    displayFormat: "",
                    sortingFormat: "000000000000000.###############",
                    sourceType: Enums_1.ChartFieldSourceType.Json
                }
            };
            chartDef.series.push(obj);
        };
        return OE_OWRTReportsViewModel;
    }(ViewModelBase_1.ViewModelBase));
    exports.OE_OWRTReportsViewModel = OE_OWRTReportsViewModel;
});

},
"url:/geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsAreaView.html": markup1,
"url:/geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsView.html": markup2,
"url:/geocortex/oe_amd/OE_OWRTReports/Templates/participantsRow.html": markup3,
"url:/geocortex/oe_amd/OE_OWRTReports/Templates/participantsTotal.html": markup4,

    }
});
require(["geocortex/framework/resourceManager"], function (imports) {imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OWRTReports/CSS/OE_OWRTReportsModule.css", "css", "Lm9lT1dSVFJlcG9ydExvYWRpbmcNCnsNCiAgICBwb3NpdGlvbjphYnNvbHV0ZTsNCiAgICB0b3A6M2VtOw0KICAgIGxlZnQ6MDsNCiAgICB3aWR0aDoxMDAlOw0KICAgIGhlaWdodDoxMDAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6I2ZmZmZmZjsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICBwYWRkaW5nLXRvcDo1MHB4Ow0KICAgIHotaW5kZXg6MTAwMDsNCn0NCg0KLm9lT1dSVHdhcm5pbmdNZXNzYWdlew0KICAgIHBhZGRpbmctdG9wOjEwcHg7DQogICAgZm9udC1zaXplOjEuNGVtOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCi5vZU9XUlRlcnJvcklucHV0IHsNCiAgICBwYWRkaW5nLXRvcDoxMnB4Ow0KfQ0KDQoub2VPV1JUZXJyb3JJbnB1dCBkaXYgew0KICAgIGZvbnQtc2l6ZToxLjJlbTsNCiAgICBwYWRkaW5nLWJvdHRvbToxNnB4Ow0KfQ0KDQoub2VPV1JUTG9hZGVyVGFiIHsNCiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgdG9wOiAxMzVweDsNCiAgICBsZWZ0OiAxMHB4Ow0KICAgIHdpZHRoOiA4OTBweDsNCiAgICBoZWlnaHQ6IDQyMHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIHBhZGRpbmctdG9wOiA1MHB4Ow0KICAgIHotaW5kZXg6IDkwMDsNCn0NCg0KLm9lT1dSVExvYWRlclRhYiBkaXYgew0KICAgIGZvbnQtc2l6ZToxLjZlbTsNCn0NCg0KI29lT1dSVERldGFpbFJlcG9ydFByaW50QXJlYSB7DQogICAgLyoqa2VlcCBtZSBmb3IgaW5qZWN0ZWQgY3NzIGRpc2NvdmVyeSovICAgIA0KfQ0KDQoub2VPV1JURGV0YWlsUmVwb3J0UHJpbnRUYWJsZQ0Kew0KICAgIGJvcmRlci1jb2xsYXBzZTp1bnNldDsgICAgDQp9DQoNCi5vZU9XUlREZXRhaWxSZXBvcnRQcmludFRhYmxlIHRyIHRkDQp7DQogICAgdmVydGljYWwtYWxpZ246dG9wOw0KfQ0KDQoub2VPV1JUUHJpbnRCdXR0b24gew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBsZWZ0OiAxMHB4Ow0KICAgIHRvcDogNXB4Ow0KfQ0KDQoub2VPV1JUUHJpbnRCdXR0b24gYnV0dG9uDQp7DQogICAgcGFkZGluZzogLjVlbSAxZW07DQogICAgYmFja2dyb3VuZDogI0Y1RjVGNTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0NDQ0NDOw0KICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07DQogICAgZm9udC13ZWlnaHQ6IDYwMDsNCiAgICBjb2xvcjogIzFBNzJDNDsNCiAgICBib3gtc2hhZG93OiAwOw0KfQ0KDQoub2VPV1JUUHJpbnRCdXR0b24gYnV0dG9uOmhvdmVyDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzFBNzJDNDsNCiAgICBjb2xvcjogI2ZmZmZmZjsNCiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQoNCi5vZU9XUlRSZXBvcnRUYWJzIGRpdnsNCiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOw0KICAgIGJvcmRlci1ib3R0b206IDA7DQogICAgbWluLWhlaWdodDogMTZweDsNCiAgICBwYWRkaW5nOiA0cHggOHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7DQogICAgbWFyZ2luLXJpZ2h0OiA0cHg7DQogICAgd2lkdGg6IDEwMHB4Ow0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCiAgICBvdmVyZmxvdzpoaWRkZW47DQp9DQoNCi5vZU9XUlRSZXBvcnRUYWJzIGRpdiBhew0KICAgIHRleHQtZGVjb3JhdGlvbjpub25lOw0KICAgIGRpc3BsYXk6YmxvY2s7DQp9DQoNCmRpdi5vZU9XUlRSZXBvcnRzVGFiRW5hYmxlZHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOw0KICAgIGZvbnQtc2l6ZTogMS4xZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgb3ZlcmZsb3c6aGlkZGVuOw0KfQ0KDQoub2VPV1JUUmVwb3J0TWFpbiwgLm9lT1dSVFJlcG9ydENoYXJ0cyB7ICAgICAgICANCiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBtYXJnaW4tdG9wOiAtNHB4Ow0KfQ0KDQoub2Vfb3dydFBSLW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGluaGVyaXQ7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA5MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBtYXJnaW4tdG9wOiAxMnB4Ow0KICAgIG1hcmdpbi1yaWdodDogMnB4Ow0KDQogICAgZm9udDogMTJweCBNeXJpYWQsSGVsdmV0aWNhLFRhaG9tYSxBcmlhbCxjbGVhbixzYW5zLXNlcmlmOw0KICAgIGZvbnQtc2l6ZTogLjllbTsNCn0NCg0KLm9lX293cnRQUi1jb2x1bW4gew0KICBmbG9hdDogbGVmdDsNCiAgd2lkdGg6IDMyLjMlOw0KICBwYWRkaW5nLXJpZ2h0OiAuMiU7DQogIHBhZGRpbmctbGVmdDogLjIlOw0KfQ0KDQovKiBDbGVhciBmbG9hdHMgYWZ0ZXIgdGhlIGNvbHVtbnMgKi8NCi5vZV9vd3J0UFItcm93OmFmdGVyIHsNCiAgY29udGVudDogIiI7DQogIGRpc3BsYXk6IHRhYmxlOw0KICBjbGVhcjogYm90aDsNCn0NCg0KLm9lUGFydGljaXBhbnREaXZUYWJsZQ0Kew0KICAgIGRpc3BsYXk6IHRhYmxlOw0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCi5vZVRhYmxlUm93SGVhZGVyIHsNCiAgICBkaXNwbGF5OiB0YWJsZS1yb3c7DQogICAgd2lkdGg6MTAwJTsgICAgDQogICAgd2hpdGUtc3BhY2U6bm93cmFwOw0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjojRThFOERDOw0KfQ0KDQoub2VUYWJsZVJvd0hlYWRlciBkaXY6Zmlyc3QtY2hpbGQgew0KICAgIHRleHQtYWxpZ246bGVmdDsNCn0NCg0KLm9lVGFibGVSb3dIZWFkZXIgZGl2DQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyANCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIHBhZGRpbmc6IDRweCAwcHg7DQp9DQoNCi5vZVRhYmxlUm93c0NvbnRhaW5lcnsNCiAgICB3aWR0aDoxMDAlOw0KICAgIG1hcmdpbjowOw0KICAgIHBhZGRpbmc6MDsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdy1ncm91cDsNCn0NCg0KLm9lVGFibGVSb3cNCnsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdzsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQoub2VUYWJsZVJvdzpsYXN0LWNoaWxkIC5vZVBhcnRDZWxsDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOyAgICANCiAgICBib3JkZXItcmlnaHQ6MDsNCiAgICBmb250LXdlaWdodDpib2xkOw0KfQ0KDQoub2VUYWJsZVJvdzpsYXN0LWNoaWxkIC5vZVBhcnRDZWxsRnVuZFZhbHVlDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmOw0KICAgIGJvcmRlci10b3A6c29saWQgMXB4ICNhN2E3YTc7DQogICAgYm9yZGVyLXJpZ2h0OjA7DQp9DQoNCi5vZVBhcnRDZWxsDQp7DQogICAgZGlzcGxheTp0YWJsZS1jZWxsOyAgICANCiAgICBwYWRkaW5nOiA2cHggMnB4Ow0KfQ0KDQoub2VQYXJ0Q2VsbFBhcnRpY2lwYW50DQp7DQogICAgd2lkdGg6MTgwcHg7DQogICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggI2E3YTdhNzsNCn0NCg0KLm9lUGFydENlbGxQYXJ0aWNpcGFudCBhew0KICAgIGZvbnQtc2l6ZTogMS4xZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQoub2VQYXJ0Q2VsbEZ1bmRWYWx1ZSB7DQogICAgZm9udC1zaXplOiAuOWVtOw0KICAgIHRleHQtYWxpZ246IHJpZ2h0OyAgICANCiAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDFweCAjYTdhN2E3Ow0KfQ0KDQoub2VUYWJsZVJvd0FsdENvbG9yczpudGgtY2hpbGQob2RkKSB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCn0NCg0KLm9lVGFibGVSb3dBbHRDb2xvcnM6bnRoLWNoaWxkKGV2ZW4pIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1Ow0KfQ0KDQoNCg0KLm9lX293cnRQUi1JbmZvDQp7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgICAgDQogICAgcGFkZGluZzogMCAuNWVtIDFlbSAuNWVtOw0KICAgIG1hcmdpbi1ib3R0b206IDEuNWVtOw0KICAgIGJhY2tncm91bmQtY29sb3I6IFdoaXRlOw0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsQ2VsbCBmaWVsZHNldCB7DQogICAgYm9yZGVyOiBzb2xpZCAxcHggI2E3YTdhNzsNCiAgICBib3JkZXItcmFkaXVzOiA0cHg7DQogICAgbWFyZ2luOiA1cHggMDsNCn0NCg0KLm9lT1dSVEFyZWFQYW5lbENlbGwgbGVnZW5kIHsNCiAgICBmb250LXNpemU6IDEuMmVtOyAgICANCn0NCiAgICANCi5vZV9vd3J0UFItSW5mbyBsZWdlbmQsIC5vZU9XUlRBcmVhUGFuZWxDZWxsIGxlZ2VuZA0Kew0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KICAgIGZvbnQtc2l6ZTogMS4zZW07DQogICAgY29sb3I6ICNhYTRlM2M7DQogICAgcGFkZGluZy1sZWZ0OiAuNWVtOw0KfQ0KDQoub2Vfb3dydFBSLUluZm8gaDENCnsNCiAgICBtYXJnaW46MDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThFOERDOw0KICAgIHBhZGRpbmctdG9wOiAuMmVtOw0KICAgIHBhZGRpbmctYm90dG9tOiAuMmVtOyAgICANCiAgICBwYWRkaW5nLWxlZnQ6IC41ZW07DQogICAgZm9udC1zaXplOiAxZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi5vZV9vd3J0UFItSW5mbyBkaXYNCnsNCiAgICBmb250LXNpemU6IDFlbTsNCiAgICBwYWRkaW5nOiAuMmVtIC4yZW0gLjJlbSAuOGVtOw0KfQ0KDQoub2Vfb3dydFBSLUFjdGl2aXRpZXMNCnsNCiAgICBmb250LXNpemU6IDJlbTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjE2MzVCOw0KICAgIGNvbG9yOiBXaGl0ZTsNCiAgICBwYWRkaW5nOiAuNWVtOw0KfQ0KDQoub2Vfb3dydFBSLUxvYw0Kew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7ICAgIA0KICAgIHBhZGRpbmc6IDAgLjVlbSAxZW0gLjVlbTsNCiAgICBtYXJnaW4tYm90dG9tOiAxLjVlbTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBXaGl0ZTsNCn0NCg0KI29lX293cnRQUl9kaXZNYXANCnsNCiAgICBib3JkZXI6IDAuM2VtIHNvbGlkICM3MzRGM0Q7DQogICAgcGFkZGluZzowcHggMXB4IDBweCAwcHg7IC8qZXNyaSBtYXAgb3ZlcmxhcHMgYm9hcmRlciBvbiB0aGUgcmlnaHQgYnkgMXB4LiAgVGhpcyBtYWtlcyB0aGUgYm9yZGVyIGxvb2sgdW5pZm9ybSovDQogICAgbWFyZ2luOjRweCAwcHggOHB4IDBweDsNCn0NCg0KLm9lX293cnRQUi1Mb2MgbGVnZW5kDQp7DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgZm9udC1zaXplOiAxLjNlbTsNCiAgICBjb2xvcjogI2FhNGUzYzsNCiAgICBwYWRkaW5nLWxlZnQ6IC41ZW07DQp9DQoNCi5vZU9XUlRsb2NhdGlvbkRhdGEgaDENCnsNCiAgICBtYXJnaW46MDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThFOERDOw0KICAgIHBhZGRpbmctdG9wOiAuMmVtOw0KICAgIHBhZGRpbmctYm90dG9tOiAuMmVtOyAgICANCiAgICBwYWRkaW5nLWxlZnQ6IC41ZW07DQogICAgZm9udC1zaXplOiAxZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi5vZU9XUlRsb2NhdGlvbkRhdGEgZGl2DQp7DQogICAgZm9udC1zaXplOiAxZW07DQogICAgcGFkZGluZzogLjJlbSAuMmVtIC4yZW0gLjhlbTsNCn0NCg0KLm9lRGV0YWlsQ2hhcnRUYWJsZQ0Kew0KICAgIGJvcmRlci1jb2xsYXBzZTp1bnNldDsgICAgDQp9DQoNCi5vZURldGFpbENoYXJ0VGFibGUgdHIgdGQNCnsNCiAgICB2ZXJ0aWNhbC1hbGlnbjp0b3A7DQp9DQoNCi5vZUNoYXJ0c0ZpZWxkU2V0IHsNCiAgICB3aWR0aDogNDAwcHg7DQogICAgbWluLWhlaWdodDogNDcwcHg7DQogICAgbWFyZ2luOiA1cHggMTVweCA1cHggMTBweDsNCiAgICBib3JkZXI6IHNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yYWRpdXM6IDRweDsNCn0NCg0KLm9lQ2hhcnRzRmllbGRTZXQgbGVnZW5kDQp7DQogICAgY29sb3I6ICNhYTRlM2M7DQp9DQoNCi5vZUNoYXJ0c0ZpZWxkU2V0IGgxDQp7DQogICAgZm9udC1zaXplOiAxZW07DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgdGV4dC1hbGlnbjpjZW50ZXI7DQogICAgbWFyZ2luLXRvcDoxNnB4Ow0KfQ0KDQoNCi5vZUNoYXJ0c0xpbmtzIHsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCiAgICBtYXJnaW4tdG9wOjRweDsNCn0NCg0KLm9lQ2hhcnRzTGlua3MgYSB7DQogICAgcGFkZGluZzogMCAxZW0gMCAxZW07DQogICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjYTdhN2E3Ow0KICAgIGJvcmRlci1yaWdodDogc29saWQgMXB4ICNhN2E3YTc7DQp9DQoNCi5vZU93cnRQUnBhcnRpY2lwYW50cyBsZWdlbmQgew0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KfQ0KDQouT0VfcGllQ2hhcnRGdW5kaW5nLCAuT0VfcGllQ2hhcnRBY3Rpdml0eSwgLkNoYXJ0RnVuZGluZ0ZvclByaW50LCAuQ2hhcnRBY3Rpdml0eUZvclByaW50DQp7DQogICAgd2lkdGg6MjUwcHg7DQp9DQoNCi5wYXJ0aWNpcGFudERpdg0Kew0KICAgIHBhZGRpbmc6MCAwOw0KfQ0KDQoucGFydGljaXBhbnREaXYgc3Bhbg0Kew0KICAgIGRpc3BsYXk6YmxvY2s7DQogICAgcGFkZGluZzouNWVtIDAgLjVlbSAxZW07DQogICAgbWFyZ2luOjA7DQp9DQoNCi5wYXJ0aWNpcGFudERpdiBoMSwgLnBhcnRpY2lwYW50RGl2IGgyDQp7DQogICAgbWFyZ2luOjA7DQogICAgcGFkZGluZzogMCAwIDAgMWVtOw0KICAgIGZvbnQtc2l6ZTogMWVtOw0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KfQ0KDQoucGFydGljaXBhbnREaXYgdWwgew0KICAgIG1hcmdpbjowIDAgMCAzZW07DQogICAgcGFkZGluZzowOw0KDQogICAgbGlzdC1zdHlsZS1pbWFnZTogdXJsKCJSZXNvdXJjZXMvSW1hZ2VzL0N1c3RvbS9saXN0aWNvbi5naWYiKTsNCn0NCg0KLnBhcnRpY2lwYW50RGl2IHVsIGxpeyAgICANCiAgICBtYXJnaW46MDsNCiAgICBwYWRkaW5nOjA7DQogICAgdGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTsNCn0NCg0KLm9lT3dydEFjdGl2aXR5T3ZlcnZpZXcgbGVnZW5kDQp7DQogICAgY29sb3I6ICNhYTRlM2M7DQp9DQoNCi5vZUFjdGl2aXR5QnlGdW5kaW5nVGFibGUgew0KICAgIGRpc3BsYXk6dGFibGU7DQogICAgd2lkdGg6IDk4JTsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0Ow0KICAgIG1hcmdpbi1sZWZ0OjAuNmVtOw0KfQ0KDQoub2VBY3Rpdml0eUJ5RnVuZGluZ0hlYWRlciB7DQogICAgZGlzcGxheTogdGFibGUtcm93Ow0KICAgIHdpZHRoOjEwMCU7ICAgIA0KICAgIHdoaXRlLXNwYWNlOm5vd3JhcDsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0OyAgICANCn0NCg0KLm9lQWN0aXZpdHlCeUZ1bmRpbmdIZWFkZXIgZGl2IHsNCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7IA0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQogICAgcGFkZGluZzogNHB4IDBweDsNCn0NCg0KLm9lQWN0aXZpdHlCeUZ1bmRpbmdIZWFkZXIgZGl2OmZpcnN0LWNoaWxkIHsNCiAgICB0ZXh0LWFsaWduOmxlZnQ7DQp9DQoNCi5vZUFjdGl2aXR5QnlGdW5kaW5nUm93IHsNCiAgICBkaXNwbGF5OnRhYmxlLXJvdzsNCiAgICB3aWR0aDoxMDAlOw0KICAgIHRleHQtYWxpZ246IHJpZ2h0OyAgICANCn0NCg0KLm9lQWN0aXZpdHlCeUZ1bmRpbmdSb3cgZGl2IHsNCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7DQogICAgcGFkZGluZy1ib3R0b206MnB4Ow0KfQ0KDQoub2VBY3Rpdml0eUJ5RnVuZGluZ1JvdyBkaXY6Zmlyc3QtY2hpbGQgeyAgICANCiAgICB0ZXh0LWFsaWduOiBsZWZ0OyAgICANCn0NCg0KLm9lT3dydEFjdGl2aXR5T3ZlcnZpZXcgaDENCnsNCiAgICBtYXJnaW46MDsNCiAgICBwYWRkaW5nOiAwLjZlbSAwIDAuNmVtIDA7DQogICAgZm9udC1zaXplOiAxLjFlbTsNCiAgICBmb250LXdlaWdodDogYm9sZDsNCn0NCg0KLm9lT1dSVGFjdGl2aXR5Qm94ZXMgew0KICAgIHBhZGRpbmc6MC41ZW0gMDsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQoub2VPV1JUYWN0aXZpdHlCb3hlcyBkaXZ7DQogICAgZGlzcGxheTppbmxpbmU7DQp9DQoNCi5vZUFjdFJlc3VsdHNUYWJsZSB7DQogICAgZGlzcGxheTp0YWJsZTsNCiAgICB3aWR0aDo5OCU7ICAgIA0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBtYXJnaW4tbGVmdDogMC42ZW07DQp9DQoNCi5vZUFjUmVzdWx0c0hlYWRlciB7DQogICAgZGlzcGxheTogdGFibGUtcm93Ow0KICAgIHdpZHRoOjEwMCU7ICAgICAgICANCiAgICB0ZXh0LWFsaWduOmxlZnQ7DQp9DQoNCi5vZUFjUmVzdWx0c0hlYWRlciBkaXYNCnsNCiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7IA0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQogICAgcGFkZGluZy1sZWZ0OjhweDsNCiAgICBwYWRkaW5nLWJvdHRvbTo0cHg7DQp9DQoNCi5vZUFjUmVzdWx0c0hlYWRlciBkaXY6Zmlyc3QtY2hpbGQgeyAgICANCiAgICBwYWRkaW5nLWxlZnQ6MHB4Ow0KfQ0KDQoub2VBY3RSZXN1bHRzUm93DQp7DQogICAgZGlzcGxheTp0YWJsZS1yb3c7DQogICAgd2lkdGg6MTAwJTsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0OyAgICANCn0NCg0KLm9lQWN0UmVzdWx0c1JvdyBkaXYgew0KICAgIGRpc3BsYXk6dGFibGUtY2VsbDsNCiAgICBwYWRkaW5nLWxlZnQ6OHB4Ow0KICAgIHBhZGRpbmctYm90dG9tOjRweDsNCn0NCg0KLm9lQWN0UmVzdWx0c1JvdyBkaXY6Zmlyc3QtY2hpbGQgeyANCiAgICBwYWRkaW5nLWxlZnQ6MHB4Ow0KfQ0KDQoub2VPV1JUYWN0aXZpdHlHb2Fscw0KeyAgICANCiAgICBwYWRkaW5nOjAgMCAwIDA7DQogICAgbWFyZ2luOiAwIDAgMCAwOw0KfQ0KDQoub2VPV1JUYWN0aXZpdHlHb2Fscw0Kew0KICAgIG1hcmdpbjowIDAgMCAxLjdlbTsNCiAgICBwYWRkaW5nOjA7DQogICAgbGlzdC1zdHlsZS1pbWFnZTogdXJsKCJSZXNvdXJjZXMvSW1hZ2VzL0N1c3RvbS9saXN0aWNvbi5naWYiKTsNCn0NCg0KLm9lT1dSVGFjdGl2aXR5R29hbHMgbGkNCnsNCiAgICBwYWRkaW5nOjAgMCAycHggMDsNCiAgICBtYXJnaW46IDAgMCAwIDA7DQogICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7DQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzIGxlZ2VuZA0Kew0KICAgIGNvbG9yOiAjYWE0ZTNjOw0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljcyB1bA0Kew0KICAgIG1hcmdpbjowIDAgMCAyZW07DQogICAgcGFkZGluZzowOw0KICAgIGxpc3Qtc3R5bGUtaW1hZ2U6IHVybCgiUmVzb3VyY2VzL0ltYWdlcy9DdXN0b20vbGlzdGljb24uZ2lmIik7DQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzIHVsIGxpDQp7DQogICAgcGFkZGluZzowIDAgNHB4IDA7DQogICAgbWFyZ2luOiAwIDAgMCAwOyAgICANCn0NCg0KLm9lT3dydFRyZWF0bWVudE1ldHJpY3MgYSB7DQogICAgZm9udC1zdHlsZTppdGFsaWM7DQogICAgZm9udC1zaXplOjAuOWVtOw0KICAgIGNvbG9yOmdyYXk7DQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzIGRpdg0Kew0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQogICAgcGFkZGluZy1ib3R0b206NHB4Ow0KfQ0KDQoub2VNZXRyaWNUb2dnbGUNCnsNCiAgICB0ZXh0LWFsaWduOiByaWdodDsNCiAgICBwYWRkaW5nLWJvdHRvbTo0cHg7DQp9DQoNCi5vZU93cnRUcmVhdG1lbnRNZXRyaWNzIHRhYmxlDQp7DQogICAgbWFyZ2luOjAgMCAwIDAuNGVtOw0KICAgIHdpZHRoOjIyMHB4Ow0KfQ0KDQoub2VPd3J0VHJlYXRtZW50TWV0cmljc0Rlc2NyaXB0aW9uQ29sdW1uDQp7DQogICAgd2lkdGg6IDUwJTsNCiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsNCn0NCg0KLm9lT3dydFRyZWF0bWVudE1ldHJpY3NWYWx1ZUNvbHVtbg0Kew0KICAgIHdpZHRoOiA1MCU7DQogICAgdGV4dC1hbGlnbjpyaWdodDsNCn0NCg0KDQoNCg0KLyogQXJlYSBSZXBvcnQgKi8NCg0KLm9lX293cnRBcmVhUmVwb3J0LW1vZHVsZS12aWV3DQp7DQogICAgcG9zaXRpb246IGluaGVyaXQ7DQogICAgei1pbmRleDogMTAwOw0KICAgIHdpZHRoOiA5MDBweDsNCiAgICByaWdodDogMDsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgcGFkZGluZzogNnB4Ow0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBtYXJnaW4tdG9wOiAxMnB4Ow0KICAgIG1hcmdpbi1yaWdodDogMnB4Ow0KICAgIG1pbi1oZWlnaHQ6NTcwcHg7DQoNCiAgICBmb250OiAxMnB4IE15cmlhZCxIZWx2ZXRpY2EsVGFob21hLEFyaWFsLGNsZWFuLHNhbnMtc2VyaWY7DQogICAgZm9udC1zaXplOiAuOWVtOw0KfQ0KDQoub2VPV1JUT3B0aW9ucw0Kew0KICAgIHdpZHRoOiA5MDJweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjOw0KICAgIHBhZGRpbmc6IDRweCAwcHg7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2JiYjsNCn0NCg0KLm9lT1dSVE9wdGlvbnMgaW1new0KICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrOw0KICAgIHdpZHRoOjEycHg7DQogICAgaGVpZ2h0OjEycHg7DQp9DQoNCi5vZU9XUlRPcHRpb25zIHNwYW57DQogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7DQogICAgcGFkZGluZy1sZWZ0OjVweDsNCn0NCg0KLmstc2xpZGVyLXNlbGVjdGlvbg0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6IzAyQTdFQTsNCn0NCg0KLm9lT1dSVE9wdGlvbnNQYW5lbA0Kew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBtYXJnaW4tbGVmdDogYXV0bzsNCiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87DQogICAgdG9wOiA3OHB4Ow0KICAgIHdpZHRoOiA5MDJweDsNCiAgICB6LWluZGV4OiA1MDAwOw0KICAgIG92ZXJmbG93OiBoaWRkZW47DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJiOw0KICAgIGhlaWdodDoxMjBweDsNCn0NCg0KLm9lT1dSVE9wdGlvbnNUYWJsZQ0Kew0KICAgIG1hcmdpbjoxMHB4Ow0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIGJ1dHRvbiwgLm9lT1dSVGVycm9ySW5wdXQgYnV0dG9uIHsNCiAgICBwYWRkaW5nOiAuNWVtIDFlbTsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0NDQ0M7DQogICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTsNCiAgICBmb250LXdlaWdodDogNjAwOw0KICAgIGNvbG9yOiAjMUE3MkM0Ow0KICAgIGJveC1zaGFkb3c6IDA7DQp9DQoNCi5vZU9XUlRPcHRpb25zVGFibGUgYnV0dG9uOmhvdmVyLCAub2VPV1JUZXJyb3JJbnB1dCBidXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxQTcyQzQ7DQogICAgY29sb3I6ICNmZmZmZmY7DQogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KfQ0KDQoNCi5vZU9XUlRPcHRpb25zVGFibGUgaDF7DQogICAgZm9udC1zaXplOjFlbTsNCiAgICBmb250LXdlaWdodDpib2xkOw0KICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCBibGFjazsNCiAgICB3aWR0aDoxMDAlOw0KICAgIG1hcmdpbi1ib3R0b206MC42ZW07DQogICAgcGFkZGluZzowLjJlbSAwOw0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIHRkDQp7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1sZWZ0OiBkYXNoZWQgMXB4ICNhN2E3YTc7DQogICAgd2lkdGg6MjUlOw0KICAgIHBhZGRpbmc6MCA0cHg7DQogICAgdmVydGljYWwtYWxpZ246dG9wOw0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIHRkOmZpcnN0LWNoaWxkDQp7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1sZWZ0OiBub25lIDFweCAjYTdhN2E3Ow0KfQ0KDQoub2VPV1JUT3B0aW9uc1RhYmxlIGgyew0KICAgIGZvbnQtc2l6ZTowLjllbTsNCiAgICBmb250LXdlaWdodDpub3JtYWw7DQp9DQoNCi5vZU9XUlRPcHRpb25zVGFibGUgaW5wdXR7DQogICAgZGlzcGxheTppbmxpbmU7DQogICAgd2lkdGg6NDBweDsNCn0NCg0KLm9lT1dSVE9wdGlvbnMgYQ0Kew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsNCiAgICBwYWRkaW5nLWxlZnQ6IDhweDsNCn0NCg0KLm9lT1dSVEFyZWFUYWJzDQp7DQogICAgbWFyZ2luLWxlZnQ6NHB4Ow0KICAgIHBhZGRpbmctdG9wOjI0cHg7DQp9DQoNCi5vZU9XUlRBcmVhVGFicyBkaXYNCnsNCiAgICBmbG9hdDpsZWZ0Ow0KICAgIGJvcmRlcjoxcHggc29saWQgI2NjYzsNCiAgICBib3JkZXItYm90dG9tOjA7DQogICAgbWluLWhlaWdodDoxNnB4Ow0KICAgIHBhZGRpbmc6NHB4IDhweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNlMmUyZTI7DQogICAgbWFyZ2luLXJpZ2h0OjRweDsNCiAgICB3aWR0aDoxMDBweDsNCiAgICB0ZXh0LWFsaWduOmNlbnRlcjsNCn0NCg0KLm9lT1dSVEFyZWFUYWJzIGRpdiBpbWcNCnsNCiAgICBmbG9hdDogbGVmdDsNCn0NCg0KLm9lT1dSVEFyZWFUYWJzIGRpdiBhDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICB0ZXh0LWRlY29yYXRpb246bm9uZTsNCiAgICBmb250LXNpemU6MWVtOw0KICAgIHdpZHRoOjEwMCU7DQp9DQoNCmRpdi5vZU9XUlRBcmVhVGFiRW5hYmxlZA0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6I2ZmZjsNCiAgICBmb250LXNpemU6MS4xZW07DQogICAgZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCg0KLm9lT1dSVEFyZWFQYW5lbHsNCiAgICBkaXNwbGF5OnRhYmxlOw0KICAgIGNsZWFyOmJvdGg7DQogICAgd2lkdGg6OTglOw0KICAgIG1pbi1oZWlnaHQ6NDYwcHg7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2NjYzsNCiAgICBwYWRkaW5nOjEwcHg7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWwgbGVnZW5kDQp7DQogICAgY29sb3I6ICNhYTRlM2M7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWwgaDENCnsNCiAgICBmb250LXNpemU6IDEuMmVtOw0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOyAgICAgICAgDQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxPdmVydmlld0xlZnQNCnsNCiAgICB3aWR0aDogMjYwcHg7DQogICAgcGFkZGluZy1sZWZ0OjhweDsNCn0NCg0KLm9lT1dSVEFyZWFQYW5lbE92ZXJ2aWV3TGVmdCBmaWVsZHNldA0Kew0KICAgIG1hcmdpbi1yaWdodDo4cHg7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxPdmVydmlld0xlZnQgZmllbGRzZXQgaDENCnsgICAgDQogICAgZmxvYXQ6bGVmdDsNCn0NCg0KLm9lT1dSVEFyZWFQYW5lbENlbGwNCnsNCiAgICBkaXNwbGF5OnRhYmxlLWNlbGwgIA0KfQ0KDQoub2VPV1JURmxvYXRSaWdodA0Kew0KICAgIGZsb2F0OnJpZ2h0Ow0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsT3ZlcnZpZXdSaWdodA0Kew0KICAgIA0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsT3ZlcnZpZXdSaWdodCBmaWVsZHNldA0Kew0KICAgIHBvc2l0aW9uOnJlbGF0aXZlOw0KfQ0KDQoub2VPV1JUQXJlYVF1ZXJ5SW5mbw0KeyAgICANCiAgICAvKnBvc2l0aW9uOmFic29sdXRlOw0KICAgIHJpZ2h0OjEwcHg7DQogICAgdG9wOiA5MHB4OyovDQogICAgcG9zaXRpb246cmVsYXRpdmU7DQogICAgcmlnaHQ6MTBweDsNCiAgICBoZWlnaHQ6MHB4Ow0KICAgIHBvaW50ZXItZXZlbnRzOm5vbmU7DQp9DQoNCi5vZU9XUlRBcmVhUXVlcnlJbmZvIGRpdg0Kew0KICAgIGZvbnQtc2l6ZTowLjllbTsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQojb2VPV1JUQXJlYU1hcHsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB3aWR0aDogNjAwcHg7DQogICAgaGVpZ2h0OiA0MjBweDsNCiAgICBvdXRsaW5lOiBub25lOw0KfQ0KDQoub2VPV1JUQXJlYUNoYXJ0U2VsZWN0Qm94DQp7DQogICAgcG9zaXRpb246YWJzb2x1dGU7DQogICAgY29sb3I6ICMyOTI5Mjk7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0JBQkFCQTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThFOEU4Ow0KICAgIG1hcmdpbi1sZWZ0OiAxZW07DQogICAgbWFyZ2luLXJpZ2h0OiAxZW07DQogICAgZm9udC1zaXplOiAxZW07ICAgIA0KICAgIHdpZHRoOiAyMDBweDsNCiAgICBtYXJnaW4tdG9wOiAxZW07DQogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KfQ0KDQoub2VPV1JUQXJlYUNoYXJ0U2VsZWN0Qm94IGRpdg0Kew0KICAgIHBhZGRpbmc6IC41ZW07DQogICAgZm9udC1zaXplOiAxZW07DQogICAgd2lkdGg6IDEwMCU7DQogICAgY29sb3I6IEJsdWU7DQp9DQoNCi5vZU9XUlRBcmVhQ2hhcnRTZWxlY3RCb3ggZGl2IGEgDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICB3aWR0aDoxMDAlOw0KICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg0KLm9lT1dSVEFyZWFDaGFydFNlbGVjdEJveCBkaXYgYTpob3Zlcg0Kew0KICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOw0KICAgIGZvbnQtd2VpZ2h0OmJvbGQ7DQp9DQoNCmRpdi5vZU9XUlRBcmVhQ2hhcnRTZWxlY3Rpb25Cb3hTZWxlY3RlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzhDOEM4QzsNCiAgICBjb2xvcjogV2hpdGU7DQp9DQoNCmRpdi5vZU9XUlRBcmVhQ2hhcnRTZWxlY3Rpb25Cb3hTZWxlY3RlZCBheyAgICANCiAgICBjb2xvcjogV2hpdGU7DQp9DQoNCi5vZU9XUlRBcmVhUHJvamVjdENoYXJ0LCAub2VPV1JUQXJlYUZ1bmRpbmdDaGFydCwgLm9lT1dSVEFyZWFSZXN1bHRzQ2hhcnQNCnsNCiAgICBwb3NpdGlvbjpyZWxhdGl2ZTsNCiAgICB3aWR0aDo1NTBweDsNCiAgICBtaW4taGVpZ2h0OjQwMHB4Ow0KICAgIHBhZGRpbmctdG9wOjE2cHg7DQp9DQoNCi5vZU9XUlRBcmVhUGFuZWxSZXN1bHRzDQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICBwYWRkaW5nOjEwcHg7DQogICAgaGVpZ2h0OjQ0M3B4Ow0KICAgIG92ZXJmbG93LXk6c2Nyb2xsOw0KfQ0KDQoub2VPV1JUQXJlYVBhbmVsUmVzdWx0cyBmaWVsZHNldA0Kew0KICAgIHdpZHRoOjYwMHB4Ow0KICAgIG1hcmdpbjoyMHB4IGF1dG8gMTBweCBhdXRvOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZQ0Kew0KICAgIHdpZHRoOiAxMDAlOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ZCwgLm93cnRSZXN1bHRzVGFibGUgdGgNCnsNCiAgICBwYWRkaW5nOiAycHggMXB4Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0aA0Kew0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDIzNCwyMzgsMjQ3LDApLCByZ2JhKDIzNCwyMzgsMjQ3LDEpKTsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHIgdGQsIC5vd3J0UmVzdWx0c1RhYmxlIHRyIHRoDQp7DQogICAgcGFkZGluZzoycHggNHB4Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0ZA0Kew0KICAgIGJvcmRlcjogc29saWQgI2VlZTsNCiAgICBib3JkZXItd2lkdGg6IDAgMXB4IDFweCAwOw0KfQ0KDQp0aC5zb3J0ZWQuYXNjZW5kaW5nOmFmdGVyIHsNCgljb250ZW50OiAiICBcMjE5MSI7DQogICAgZm9udC1zaXplOjE0cHg7DQp9DQoNCnRoLnNvcnRlZC5kZXNjZW5kaW5nOmFmdGVyIHsNCgljb250ZW50OiAiIFwyMTkzIjsNCiAgICBmb250LXNpemU6MTRweDsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHIgdGg6bnRoLWNoaWxkKDIpLCAub3dydFJlc3VsdHNUYWJsZSB0ciB0ZDpudGgtY2hpbGQoMikNCnsNCiAgICB3aWR0aDoxMDBweDsNCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0ciB0aDpudGgtY2hpbGQoMyksLm93cnRSZXN1bHRzVGFibGUgdHIgdGQ6bnRoLWNoaWxkKDMpDQp7DQogICAgd2lkdGg6IDE2MHB4Ow0KICAgIHRleHQtYWxpZ246IGNlbnRlcjsNCn0NCg0KLm93cnRSZXN1bHRzVGFibGUgdHI6bnRoLWNoaWxkKDJuKzEpDQp7DQogICAgYmFja2dyb3VuZC1jb2xvcjojZmFmYWZhOw0KfQ0KDQoub3dydFJlc3VsdHNUYWJsZSB0cjpob3Zlcg0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6I2U3ZTlmOTsNCn0NCg0KLm93cnRDaGFydFRhYmxlVG9nZ2xlTGluaw0Kew0KICAgIHRleHQtYWxpZ246cmlnaHQ7DQogICAgcGFkZGluZy1yaWdodDoxMHB4Ow0KfQ0KDQoub3dydENoYXJ0VGFibGVUb2dnbGVMaW5rIGltZw0Kew0KICAgIHdpZHRoOiAxNnB4Ow0KICAgIGhlaWdodDogMTZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOw0KICAgIHBhZGRpbmctcmlnaHQ6IDhweDsNCn0NCg0KLm93cnRDaGFydHNUYWJsZUNvbnRhaW5lcg0Kew0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB0b3A6IDE4MnB4Ow0KICAgIGxlZnQ6IDI5NXB4Ow0KICAgIGhlaWdodDogNDA1cHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgd2lkdGg6IDYwMHB4Ow0KICAgIG92ZXJmbG93LXg6YXV0bzsgICAgDQogICAgb3ZlcmZsb3cteTpoaWRkZW47DQogICAgei1pbmRleDogMzA7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZVRvZ2dsZUxpbmsNCnsNCiAgICAvKnBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBkaXNwbGF5OiBibG9jazsNCiAgICB0b3A6IDE2MnB4Ow0KICAgIGxlZnQ6IDgwMHB4Ow0KICAgIHotaW5kZXg6IDQwOyovDQp9DQoNCi5vd3J0VGFibGVQcm9qZWN0cw0KeyAgICANCiAgIHBvc2l0aW9uOnJlbGF0aXZlOw0KICAgIHdpZHRoOjU5MHB4Ow0KICAgIG1pbi1oZWlnaHQ6NDAwcHg7DQogICAgcGFkZGluZy10b3A6MTZweDsNCiAgICBvdmVyZmxvdy14OmF1dG87DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMNCnsNCiAgICB3aWR0aDoxMDAlOw0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRib2R5DQp7DQogICAgZGlzcGxheTpibG9jazsNCiAgICBoZWlnaHQ6MzYwcHg7DQogICAgb3ZlcmZsb3cteTpzY3JvbGw7DQp9DQoNCi5vd3J0Q2hhcnRUYWJsZXMgdGhlYWQNCnsNCiAgICBkaXNwbGF5OmJsb2NrOw0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRyIHRoDQp7ICAgIA0KICAgIHRleHQtYWxpZ246bGVmdDsNCiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDIzNCwyMzgsMjQ3LDApLCByZ2JhKDIzNCwyMzgsMjQ3LDEpKTsgICAgDQogICAgcGFkZGluZzoycHggNHB4Ow0KICAgIGJvcmRlcjogc29saWQgI2VlZTsNCiAgICBib3JkZXItd2lkdGg6IDAgMXB4IDFweCAwOyAgICANCn0NCg0KLm93cnRDaGFydFRhYmxlU2hhcmVkIHRyIHRoLCAub3dydENoYXJ0VGFibGVTaGFyZWQgdHIgdGQsIC5vd3J0Q2hhcnRUYWJsZUZ1bmRJbnZlc3RCeVllYXIgdHIgdGgsIC5vd3J0Q2hhcnRUYWJsZUZ1bmRJbnZlc3RCeVllYXIgdHIgdGQNCnsNCiAgICB3aWR0aDozMDBweDsNCn0NCg0KLm93cnRDaGFydFRhYmxlcyB0ciB0ZA0Kew0KICAgIGJvcmRlcjogc29saWQgI2VlZTsNCiAgICBib3JkZXItd2lkdGg6IDAgMXB4IDFweCAwOyAgICANCiAgICBwYWRkaW5nOjJweCA0cHg7ICAgIA0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRyIHRkOm50aC1jaGlsZCgxbisyKQ0KeyAgICANCiAgICB0ZXh0LWFsaWduOnJpZ2h0Ow0KfQ0KDQoub3dydENoYXJ0VGFibGVzIHRyOm50aC1jaGlsZCgybisxKQ0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6I2ZhZmFmYTsNCn0NCg0KLm93cnRDaGFydFRhYmxlcyB0cjpob3Zlcg0Kew0KICAgIGJhY2tncm91bmQtY29sb3I6I2U3ZTlmOTsNCn0NCg0KLm93cnRDaGFydFRhYmxlRnVuZEludmVzdEJ5QWN0QnlZZWFyIHsNCiAgICB3aWR0aDogMTM3MHB4Ow0KICAgIHRhYmxlLWxheW91dDpmaXhlZDsNCn0NCg0KLm93cnRDaGFydFRhYmxlRnVuZEludmVzdEJ5QWN0QnlZZWFyIHRyIHRkLCAub3dydENoYXJ0VGFibGVGdW5kSW52ZXN0QnlBY3RCeVllYXIgdHIgdGggew0KICAgIHdpZHRoOiAxMDBweDsNCiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7DQogICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsNCn0=");

imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsAreaView.html", "html", markup1);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OWRTReports/OE_OWRTReportsView.html", "html", markup2);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OWRTReports/Templates/participantsRow.html", "html", markup3);
imports.resourceManager.register("OE_AMD", "inv", "geocortex/oe_amd/OE_OWRTReports/Templates/participantsTotal.html", "html", markup4);
});

})();
