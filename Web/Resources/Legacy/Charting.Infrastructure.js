/*
	
	Copyright (c) 2016, Latitude Geographics Group Ltd.
	All rights reserved.
	       
	Redistribution is not permitted. 
	
	Use in binary form, without modification, is permitted provided that neither 
	the name of the organization nor the names of its contributors may be used 
	to endorse or promote products derived from this software without specific 
	prior written permission.
	       
	THIS SOFTWARE IS PROVIDED BY COPYRIGHT HOLDER ''AS IS'' AND ANY
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL LATITUDE GEOGRAPHICS GROUP LTD. BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/* Begin Script: Charting.Infrastructure/charting.infrastructure_ts_out.js ------------------------- */ 
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents a point of data in a Geocortex chart.
         */
        var ChartPoint = (function () {
            /**
             * Initializes a new instance of the {@link ChartPoint} class.
             * @param options Optional options block for this point.
             */
            function ChartPoint(options) {
                /** The category definition for this {@link ChartPoint}. */
                this.categoryDefinition = null;
                /** The series definition for this {@link ChartPoint}. */
                this.seriesDefinition = null;
                /** The category object. */
                this.category = null;
                /** The category value formatted for displaying in the user interface. */
                this.displayCategory = null;
                /** The category value formatted for sorting and aggregating. */
                this.sortingCategory = null;
                /** The value that breaks apart the series. */
                this.seriesBreakValue = null;
                /** The series break value formatted for display. */
                this.seriesBreakDisplayValue = null;
                /** The series break value formatted for sorting. */
                this.seriesBreakSortingValue = null;
                /** The series object. */
                this.series = null;
                /** The series value formatted for displaying in the user interface. */
                this.displaySeries = null;
                /** The series value formatted for sorting and aggregating. */
                this.sortingSeries = null;
                /** Whether or not this {@link ChartPoint} is selected. */
                this.isSelected = false;
                /** The raw value for this {@link ChartPoint}. */
                this.value = null;
                /** The value of this {@link ChartPoint} formatted for displaying in the user interface. */
                this.displayValue = null;
                /** An attributes dictionary which can be used to store custom application-specific data. */
                this.attributes = {};
                /** The format provider */
                this.formatProvider = null;
                this.uniqueId = "cp_" + geocortex.framework.utils.alphaNumericToken();
                if (options) {
                    this.formatProvider = options.formatProvider;
                    this.attributes = options.attributes || {};
                    this.isSelected = !!options.isSelected;
                    this.setCategoryDefinition(options.categoryDefinition);
                    this.setSeriesDefinition(options.seriesDefinition);
                    this.setCategory(options.category);
                    this.setSeries(options.series);
                    this.setSeriesBreakValue(options.seriesBreakValue);
                    this.setValue(options.value);
                }
            }
            /**
             * Tries to format an arbitrary value using a specified format string and a format provider.
             * Returns a formatted string representation of the object.
             * @param value The value to format.
             * @param format The format to use when converting the value to string.
             * @param formatProvider The optional format provider to use.
             */
            ChartPoint.tryGetFormattedString = function (value, format, formatProvider, timeZoneId, displayTimeZoneId) {
                if (formatProvider === void 0) { formatProvider = null; }
                if (timeZoneId === void 0) { timeZoneId = null; }
                if (displayTimeZoneId === void 0) { displayTimeZoneId = null; }
                if (value === null || typeof value === "undefined") {
                    return "";
                }
                if (formatProvider !== null) {
                    return formatProvider.toString(value, format, timeZoneId, displayTimeZoneId);
                }
                // Fallback to toString() if no format provider was specified
                return charting.ChartUtils.toString(value);
            };
            /**
             * Sets the category definition for this point.
             * @param value The category definition to set.
             */
            ChartPoint.prototype.setCategoryDefinition = function (value) {
                if (this.categoryDefinition != value) {
                    this.categoryDefinition = value;
                    this._setCategoryStrings();
                }
            };
            /**
             * Sets the series definition for this point.
             * @param value The series definition to set.
             */
            ChartPoint.prototype.setSeriesDefinition = function (value) {
                if (this.seriesDefinition != value) {
                    this.seriesDefinition = value;
                    this._setSeriesStrings();
                    this._setSeriesBreakStrings();
                    this._setDisplayValue();
                }
            };
            /**
             * Sets the arbitrary category that this point falls under.
             * @param value The category value to set.
             */
            ChartPoint.prototype.setCategory = function (value) {
                if (this.category != value) {
                    this.category = value;
                    this._setCategoryStrings();
                }
            };
            /**
             * Sets the arbitrary series value for this point.
             * @param value The series value to set.
             */
            ChartPoint.prototype.setSeries = function (value) {
                if (this.series != value) {
                    this.series = value;
                    this._setSeriesStrings();
                }
            };
            /**
             * Sets the arbitrary series break value for this point.
             * @param value The break value to set.
             */
            ChartPoint.prototype.setSeriesBreakValue = function (value) {
                if (this.seriesBreakValue != value) {
                    this.seriesBreakValue = value;
                    this._setSeriesBreakStrings();
                }
            };
            /**
             * Sets the raw value of this chart point.
             * @param value The value of this chart point.
             */
            ChartPoint.prototype.setValue = function (value) {
                if (this.value != value) {
                    this.value = value;
                    this._setDisplayValue();
                }
            };
            /**
             * Performs a shallow clone of this chart point, returning the cloned value.
             */
            ChartPoint.prototype.clone = function () {
                var attr = {};
                if (this.attributes) {
                    for (var p in this.attributes) {
                        if (this.attributes.hasOwnProperty(p)) {
                            attr[p] = this.attributes[p];
                        }
                    }
                }
                var cloned = new ChartPoint({
                    attributes: attr,
                    value: this.value,
                    category: this.category,
                    categoryDefinition: this.categoryDefinition,
                    formatProvider: this.formatProvider,
                    isSelected: this.isSelected,
                    series: this.series,
                    seriesDefinition: this.seriesDefinition,
                    seriesBreakValue: this.seriesBreakValue
                });
                return cloned;
            };
            /**
             * Performs tasks associated with freeing, releasing, or resetting resources held by this object.
             */
            ChartPoint.prototype.destroy = function () {
                this.formatProvider = null;
                this.attributes = null;
                this.setCategoryDefinition(null);
                this.setSeriesDefinition(null);
                this.setCategory(null);
                this.setSeries(null);
                this.setSeriesBreakValue(null);
                this.setValue(null);
            };
            // Updates the series strings using the current series object and the SeriesDefinition formatting strings
            ChartPoint.prototype._setSeriesStrings = function () {
                if (this.series != null && typeof this.series !== "undefined") {
                    if (this.seriesDefinition != null) {
                        this.displaySeries = ChartPoint.tryGetFormattedString(this.series, this.seriesDefinition.field.displayFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                        // If the series is based on a Date field with a month or weekday format it needs to be handled differently.
                        if (this.series instanceof Date && this.seriesDefinition.field.sortingFormat === "ddd") {
                            this.sortingSeries = this.series.getDay();
                        }
                        else if (this.series instanceof Date && this.seriesDefinition.field.sortingFormat === "mmm") {
                            this.sortingSeries = this.series.getMonth();
                        }
                        else {
                            // Format using the field sortingFormat
                            this.sortingSeries = ChartPoint.tryGetFormattedString(this.series, this.seriesDefinition.field.sortingFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                            // If that resolved to a number, sort it numerically
                            if (charting.ChartUtils.isNumeric(this.sortingSeries)) {
                                this.sortingSeries = Number(this.sortingSeries);
                            }
                            else if (this.series instanceof Date) {
                                this.sortingSeries = this.series;
                            }
                        }
                    }
                    else {
                        this.displaySeries = charting.ChartUtils.toString(this.series);
                        this.sortingSeries = charting.ChartUtils.toString(this.series);
                    }
                }
                else {
                    this.displaySeries = this.sortingSeries = "Empty_Series_Field";
                }
            };
            // Updates the Category strings using the current category object and the CategoryDefinition formatting strings
            ChartPoint.prototype._setCategoryStrings = function () {
                if (this.category != null && typeof this.category !== "undefined") {
                    if (this.categoryDefinition != null) {
                        this.displayCategory = ChartPoint.tryGetFormattedString(this.category, this.categoryDefinition.field.displayFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                        // If the category is a Date field and it is grouped by month or weekday it needs to be handled differently.
                        if (this.category instanceof Date && this.categoryDefinition.field.sortingFormat === "ddd") {
                            this.sortingCategory = this.category.getDay();
                        }
                        else if (this.category instanceof Date && this.categoryDefinition.field.sortingFormat === "mmm") {
                            this.sortingCategory = this.category.getMonth();
                        }
                        else {
                            this.sortingCategory = ChartPoint.tryGetFormattedString(this.category, this.categoryDefinition.field.sortingFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                            // If the above resolved to a number, sort numerically
                            if (charting.ChartUtils.isNumeric(this.sortingCategory)) {
                                this.sortingCategory = Number(this.sortingCategory);
                            }
                            else if (this.category instanceof Date) {
                                this.sortingCategory = this.category;
                            }
                        }
                    }
                    else {
                        this.displayCategory = charting.ChartUtils.toString(this.category);
                        this.sortingCategory = charting.ChartUtils.toString(this.category);
                    }
                }
                else {
                    this.displayCategory = this.sortingCategory = "Empty_Category_Field";
                }
            };
            // Update the series break value with a formatted string
            ChartPoint.prototype._setSeriesBreakStrings = function () {
                if (this.seriesBreakValue !== null && typeof this.seriesBreakValue !== "undefined") {
                    if (this.seriesDefinition != null) {
                        this.seriesBreakDisplayValue = ChartPoint.tryGetFormattedString(this.seriesBreakValue, this.seriesDefinition.seriesBreak.field.displayFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                        this.seriesBreakSortingValue = ChartPoint.tryGetFormattedString(this.seriesBreakValue, this.seriesDefinition.seriesBreak.field.sortingFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                    }
                    else {
                        this.seriesBreakDisplayValue = charting.ChartUtils.toString(this.seriesBreakValue);
                        this.seriesBreakSortingValue = charting.ChartUtils.toString(this.seriesBreakValue);
                    }
                }
                else {
                    this.seriesBreakDisplayValue = this.seriesBreakSortingValue = "Empty_Series_Break_Field";
                }
            };
            // Updates the Value strings using the current Value object and the SeriesDefinition Value Formatting strings
            ChartPoint.prototype._setDisplayValue = function () {
                if (this.value !== null && typeof this.value !== "undefined") {
                    if (this.seriesDefinition != null) {
                        this.displayValue = ChartPoint.tryGetFormattedString(this.value, this.seriesDefinition.valueFormat, this.formatProvider, this.seriesDefinition.timeZoneId, this.seriesDefinition.displayTimeZoneId);
                    }
                    else {
                        this.displayValue = charting.ChartUtils.toString(this.value);
                    }
                }
                else {
                    this.displayValue = "0";
                }
            };
            return ChartPoint;
        }());
        charting.ChartPoint = ChartPoint;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * This class represents a collection of {@link ChartPoint} objects.
         */
        var ChartPointCollection = (function () {
            function ChartPointCollection(collection) {
                this.items = [];
                if (collection) {
                    if (collection instanceof ChartPointCollection) {
                        this.set(collection.items);
                    }
                    else if (collection instanceof Array) {
                        this.set(collection);
                    }
                }
            }
            /**
             * Checks whether this collection contains any items.
             */
            ChartPointCollection.prototype.isEmpty = function () {
                return this.items && this.items.length === 0;
            };
            /**
             * Clears the collection. Optionally, destroys the chart point objects.
             * @param destroyItems (Optional) Whether to destroy the chart points. The default value is false.
             */
            ChartPointCollection.prototype.clear = function (destroyItems) {
                if (destroyItems === void 0) { destroyItems = false; }
                if (this.items && this.items.length > 0) {
                    if (destroyItems) {
                        this.items.forEach(function (x) {
                            x.destroy();
                        });
                    }
                    this.items.length = 0;
                }
            };
            /**
             * Copies an existing raw collection.
             * @param newCollection The raw collection to copy.
             * @param destroyItems (Optional) Whether to destroy the chart points. The default value is false.
             */
            ChartPointCollection.prototype.set = function (newCollection, destroyItems) {
                if (destroyItems === void 0) { destroyItems = false; }
                this.clear(destroyItems);
                if (newCollection) {
                    this.items = this.items.concat(newCollection);
                }
            };
            /**
             * Sorts the chart point collection.
             * @param predicate The predicate function used to determine the order of the elements.
             * @return The sorted collection.
             */
            ChartPointCollection.prototype.sort = function (predicate) {
                // Note: Can't call Array.prototype.sort with null args in IE(9)
                if (predicate === null || typeof predicate === "undefined") {
                    this.items.sort(ChartPointCollection._defaultSortingPredicate);
                }
                else {
                    this.items.sort(predicate);
                }
                return this;
            };
            /** Default alphanumeric sorting predicate. */
            ChartPointCollection._defaultSortingPredicate = function (a, b) {
                var orderByAsc = function (x, y) {
                    if (x === y) {
                        return 0;
                    }
                    return (x > y) ? 1 : -1;
                };
                return orderByAsc(a.category, b.category) || orderByAsc(a.sortingSeries, b.sortingSeries) || orderByAsc(a.value, b.value);
            };
            return ChartPointCollection;
        }());
        charting.ChartPointCollection = ChartPointCollection;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * This class represents a group of {@link ChartPoint} objects which are accumulated through aggregation.
         */
        var ChartPointGroup = (function () {
            function ChartPointGroup() {
                /**
                 * The category definition for this {@link ChartPointGroup}.
                 */
                this.categoryDefinition = null;
                /**
                 * The series definition for this {@link ChartPointGroup}.
                 */
                this.seriesDefinition = null;
                /**
                 * The category value formatted for sorting and aggregating.
                 */
                this.sortingCategory = null;
                /**
                 * The series value formatted for sorting and aggregating.
                 */
                this.sortingSeries = null;
                /**
                 * The collection of {@link ChartPoint} objects that belong to this group.
                 */
                this.items = null;
            }
            return ChartPointGroup;
        }());
        charting.ChartPointGroup = ChartPointGroup;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../_Definitions/Framework.d.ts" />
/// <reference path="ChartPointGroup.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var ChartPointUtils = (function () {
            function ChartPointUtils() {
            }
            /**
             * Gets the min and max bounds of a collection of {@link ChartPoint} objects.
             * @param collection The collection of {@link ChartPoint} objects.
             * @param valueFunction The function to apply to each item in the collection.
             * @return An object (tuple) with the following properties: min, max.
             */
            ChartPointUtils.getBounds = function (items, valueFunction) {
                var min = 0.0;
                var max = 0.0;
                var value;
                if (items && items.length > 0 && typeof valueFunction === "function") {
                    max = min = valueFunction(items[0]);
                    var i = items.length;
                    while (i--) {
                        value = valueFunction(items[i]);
                        min = Math.min(value, min);
                        max = Math.max(value, max);
                    }
                }
                return new geocortex.framework.utils.Tuple(min, max);
            };
            /**
             * Gets the various category sorting values from a {@link ChartPointCollection}.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return An array of category sorting values.
             */
            ChartPointUtils.getCategorySortingValues = function (collection) {
                // Get all the sorting categories for this ChartPoint collection (there might be duplicates)
                if (collection) {
                    var categories = collection.items.map(function (item, index, origArray) { return item.sortingCategory; });
                    // Exclude duplicates
                    var distinctCategories = geocortex.framework.utils.ArrayUtils.distinct(categories);
                    // If the values are all numbers, return an array of numbers. This allows numeric categories to be sorted correctly.
                    if (distinctCategories.every(function (x) { return charting.ChartUtils.isNumeric(x); })) {
                        return distinctCategories.map(Number); // cast values to number using the Number constructor
                    }
                    else {
                        return distinctCategories;
                    }
                }
                return null;
            };
            /**
             * Gets the various category sorting strings from a {@link ChartPointCollection}.
             * @deprecated from 2.6. Use 'getCategorySortingValues' to return values that can always be correctly sorted.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return An array of category sorting values.
             */
            ChartPointUtils.getCategorySortingStrings = function (collection) {
                return this.getCategorySortingValues(collection).map(String);
            };
            /**
             * Gets the various category display values strings from a {@link ChartPointCollection}.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return An array of category display values.
             */
            ChartPointUtils.getCategoryDisplayValues = function (collection) {
                // Get all the sorting categories for this ChartPoint collection (there might be duplicates)
                if (collection) {
                    var categories = collection.items.map(function (item, index, origArray) { return item.displayCategory; });
                    // Exclude duplicates
                    return geocortex.framework.utils.ArrayUtils.distinct(categories);
                }
                return null;
            };
            /**
             * Gets the various display values strings from a {@link ChartPointCollection}.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return An array of display values for the supplied series.
             */
            ChartPointUtils.getSeriesDisplayValues = function (collection) {
                // Get all the display values for this ChartPoint collection (there might be duplicates)
                if (collection) {
                    var displayValues = collection.items.map(function (item, index, origArray) { return item.displayValue; });
                    // Exclude duplicates
                    return geocortex.framework.utils.ArrayUtils.distinct(displayValues);
                }
                return null;
            };
            /**
             * Takes a collection of {@link ChartPoint} objects and creates an array of {@link ChartPointGroup} objects that contain
             * {@link ChartPoint} objects who share the same Series Definition Id, Category value, Series value, and Series Break value (if it exists).
             * This method is useful for aggregation as all of the items in each {@link ChartPointGroup} can be aggregated over to
             * create a single {@link ChartPoint}.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return The array of {@link ChartPointGroup} objects.
             */
            ChartPointUtils.getGroupedChartPoints = function (collection) {
                var result = [];
                var groups = geocortex.framework.utils.ArrayUtils.groupBy(collection.items, function (x) {
                    return {
                        seriesDefinitionId: x.seriesDefinition.id,
                        sortingSeries: x.sortingSeries,
                        sortingCategory: x.sortingCategory,
                        seriesBreakSortingValue: x.seriesBreakSortingValue
                    };
                });
                for (var i = 0; i < groups.length; i++) {
                    var value = groups[i];
                    if (!value || !value.items) {
                        continue;
                    }
                    var firstPoint = value.items[0];
                    var cpGroup = new geocortex.charting.ChartPointGroup();
                    cpGroup.seriesDefinition = firstPoint.seriesDefinition;
                    cpGroup.categoryDefinition = firstPoint.categoryDefinition;
                    cpGroup.sortingSeries = firstPoint.sortingSeries;
                    cpGroup.sortingCategory = firstPoint.sortingCategory;
                    cpGroup.items = value.items;
                    result.push(cpGroup);
                }
                return result;
            };
            /**
             * Returns a collection of {@link ChartPoint} objects that pertain to a particular series definition.
             * @param collection The collection of {@link ChartPoint} objects to filter.
             * @param seriesDefinition The chart series definition.
             * @param sortingSeries The name of the series to get items for
             * @return The resulting collection of {@link ChartPoint} objects.
             */
            ChartPointUtils.getSeriesChartPoints = function (collection, seriesDefinition, sortingSeries) {
                // TODO Implement
                throw new Error("Method not implemented yet.");
            };
            /**
             * Returns an array of {@link ChartPointGroup} objects which represent a group of {@link ChartPoint} objects that
             * all have the same {@link configuration.ChartSeriesDefinition}, and the same sorting value.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return The array of {@link ChartPointGroup} objects.
             */
            ChartPointUtils.getSeriesGroupedChartPoints = function (collection) {
                var result = [];
                var groups = geocortex.framework.utils.ArrayUtils.groupBy(collection.items, function (x) {
                    return {
                        seriesDefinitionId: x.seriesDefinition.id,
                        seriesBreakSortingValue: x.seriesBreakSortingValue,
                        sortingSeries: x.sortingSeries
                    };
                });
                for (var i = 0; i < groups.length; i++) {
                    var value = groups[i];
                    if (!value || !value.items) {
                        continue;
                    }
                    var firstPoint = value.items[0];
                    var cpGroup = new geocortex.charting.ChartPointGroup();
                    cpGroup.seriesDefinition = firstPoint.seriesDefinition;
                    cpGroup.categoryDefinition = firstPoint.categoryDefinition;
                    cpGroup.sortingSeries = firstPoint.sortingSeries;
                    cpGroup.sortingCategory = firstPoint.sortingCategory;
                    cpGroup.items = value.items;
                    result.push(cpGroup);
                }
                return result;
            };
            /**
             * Takes a collection of {@link ChartPoint} objects and returns a dictionary keyed on the {@link configuration.ChartSeriesDefinition}'s ID
             * with the list of strings of the series associated with that {@link configuration.ChartSeriesDefinition}.
             * @param collection The collection of {@link ChartPoint} objects.
             * @return A dictionary (key=SeriesConfigId, value=Array(Series)).
             */
            ChartPointUtils.getSeriesStrings = function (collection) {
                // TODO Implement
                throw new Error("Method not implemented yet.");
            };
            /**
             * Sorts the chart point collection.
             * @param collection The collection of {@link ChartPoint} objects.
             * @param predicate The predicate function used to determine the order of the elements.
             * @return The sorted collection.
             */
            ChartPointUtils.sortChartPointCollection = function (collection, predicate) {
                // Note: Can't call Array.prototype.sort with null args in IE(9)
                if (predicate === null || typeof predicate === "undefined") {
                    collection.items.sort(ChartPointUtils._defaultSortingPredicate);
                }
                else {
                    collection.items.sort(predicate);
                }
                return collection;
            };
            /** Default alphanumeric sorting predicate. */
            ChartPointUtils._defaultSortingPredicate = function (a, b) {
                var orderByAsc = function (x, y) {
                    if (x === y) {
                        return 0;
                    }
                    return (x > y) ? 1 : -1;
                };
                return orderByAsc(a.category, b.category) || orderByAsc(a.sortingSeries, b.sortingSeries) || orderByAsc(a.value, b.value);
            };
            /**
             * Checks whether the {@link ChartPoint}'s series field alias is the same
             * field as the non-alias field string. Because the chart point's DisplayValue is
             * generated from the field alias, it might not match the field in the ChartDefinition;
             * thus, we need to check whether the field alias matches the field in the item's feature attributes.
             * This method returns True if the field alias is equivalent to the series field supplied.
             * @param item The chart point.
             * @param seriesField The string of the series to compare.
             */
            ChartPointUtils.compareFields = function (item, seriesField) {
                if (item) {
                    // First check directly against the given ChartPoint
                    if (item.displaySeries == seriesField || item.displaySeries == item.seriesDefinition.field.displayName) {
                        return true;
                    }
                }
                return false;
            };
            return ChartPointUtils;
        }());
        charting.ChartPointUtils = ChartPointUtils;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../_Definitions/Framework.d.ts" />
/// <reference path="ChartPointUtils.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var ChartUtils = (function () {
            function ChartUtils() {
            }
            /**
             * Returns a string representation of the value specified
             */
            ChartUtils.toString = function (value) {
                if (value === null || typeof value === "undefined") {
                    return "";
                }
                if (typeof value === "object" && typeof value.toString === "function") {
                    return value.toString();
                }
                return value + "";
            };
            /**
             * Converts a 0-1 value into 0-255.
             */
            ChartUtils.decimalToByte = function (value) {
                return Math.round(255 * value);
            };
            /**
             * Converts a 0-255 value into 0-1.
             */
            ChartUtils.byteToDecimal = function (value, scale) {
                if (scale === void 0) { scale = 1; }
                return value / 255.0 * scale;
            };
            /**
             * Checks whether or not an arbitrary object is numeric.
             * @param obj The value to check.
             */
            ChartUtils.isNumeric = function (obj) {
                // parseFloat NaNs numeric-cast false positives (null|true|false|"")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                // adding 1 corrects loss of precision from parseFloat
                // Note: this is identical to the jQuery implementation of isNumeric
                return !(obj instanceof Array) && (obj - parseFloat(obj) + 1) >= 0;
            };
            /**
             * This method tries to return the numeric value of an arbitrary object.
             * Returns null if the object is not numeric.
             * @param obj The object to get the numeric value from.
             */
            ChartUtils.numericValue = function (obj) {
                if (obj === null || typeof obj === "undefined") {
                    return null;
                }
                var numValue = parseFloat(obj);
                return !isNaN(numValue) && isFinite(numValue) ? numValue : null;
            };
            /**
             * Decimal rounding of a number - e.g. round(2.54344, 2) = 2.54
             * @param value The number.
             * @param precision The number of decimal places.
             */
            ChartUtils.round = function (value, precision) {
                var power = Math.pow(10, precision || 0);
                return Math.round(value * power) / power;
            };
            /**
             * Rounds a value up to the next closest multiple of X - e.g. ceil(680, 250) = 750 (closest multiple of 250 greater than 680)
             * @param value The number
             * @param step The increments of X
             */
            ChartUtils.ceil = function (value, step) {
                return ChartUtils.round(Math.ceil(value / step) * step, ChartUtils.DEFAULT_PRECISION);
            };
            /**
             * Rounds a value down to the previous closest multiple of X - e.g. floor(680, 250) = 500 (closest multiple of 250 smaller than 680)
             * @param value The number
             * @param step The increments of X
             */
            ChartUtils.floor = function (value, step) {
                return ChartUtils.round(Math.floor(value / step) * step, ChartUtils.DEFAULT_PRECISION);
            };
            /**
             * Checks whether a number is close to the next multiple of X. Parameter `ratio` defines the threshold of how close.
             * e.g. remainderClose(19, 5, 1/3) = true because 19 is closer to 20 than 5 * 1/3
             * @param value The number to check
             * @param divisor The divisor
             * @param ratio The ratio - e.g. 1/3 of X - where X is the divisor.
             */
            ChartUtils.remainderClose = function (value, divisor, ratio) {
                var remainder = ChartUtils.round(Math.abs(value % divisor), ChartUtils.DEFAULT_PRECISION), threshold = divisor * (1 - ratio);
                return remainder === 0 || remainder > threshold;
            };
            /**
             * Indicates whether the specified value is defined.
             * @param value The value to check.
             */
            ChartUtils.isDefined = function (value) {
                return typeof value !== "undefined" && value !== null;
            };
            /**
             * Retrieves a value if that value is defined; otherwise, it retrieves the default value.
             */
            ChartUtils.valueOrDefault = function (value, defaultValue) {
                return ChartUtils.isDefined(value) ? value : defaultValue;
            };
            /**
             * Returns the value of the specified field, or null if no value could be resolved.
             * Delegates to the proper chart point adapter when resolving the value of the specified field.
             */
            ChartUtils.tryGetFieldValue = function (fieldDefinition, sourceItem, userState) {
                if (userState === void 0) { userState = null; }
                if (fieldDefinition) {
                    // e.g. "Field", "DataLink", etc
                    var sourceTypeString = charting.ChartFieldSourceType[fieldDefinition.sourceType];
                    // Lookup the adapter that handles this type of data
                    var adapter = charting.ChartPointAdapterRegistry.getAdapterBySourceType(sourceTypeString);
                    if (adapter) {
                        return adapter.getFieldValue(fieldDefinition, sourceItem, userState);
                    }
                }
                return null;
            };
            /**
             * Returns a priority for a series type, which determines the order in which series are rendered.
             * @param type The chart series type (e.g. Bar, Area, Line, etc)
             */
            ChartUtils.getSeriesPriority = function (type) {
                // Note that the order matters because some series like Line will connect data points
                // with lines, which if drawn in the wrong order will create ridiculous charts.
                var priority = 0;
                switch (type) {
                    case charting.ChartSeriesType.Area:
                    case charting.ChartSeriesType.SplineArea:
                        priority = 0;
                        break;
                    case charting.ChartSeriesType.Bar:
                        priority = 1;
                        break;
                    case charting.ChartSeriesType.Line:
                    case charting.ChartSeriesType.Spline:
                    case charting.ChartSeriesType.ScatterPoint:
                        priority = 2;
                        break;
                    default:
                        priority = 0;
                }
                return priority;
            };
            /**
             * Determines whether a chart configuration makes use of data links.
             * @param chartDefinition The chart configuration to check.
             */
            ChartUtils.containsDataLinks = function (chartDefinition) {
                if (chartDefinition) {
                    return chartDefinition.category.field.sourceType == charting.ChartFieldSourceType.DataLink ||
                        chartDefinition.series.some(function (s) { return s.field.sourceType == charting.ChartFieldSourceType.DataLink; });
                }
                return false;
            };
            /**
             * Finds the {@link SeriesViewModelInterface} associated with a particular {@link ChartPoint}. Returns null if no series was found.
             * @param chartPoint The chart point.
             * @param seriesViewModels The list of series view models.
             */
            ChartUtils.findSeriesViewModelFromChartPoint = function (chartPoint, seriesViewModels) {
                var i = seriesViewModels !== null ? seriesViewModels.length : 0;
                while (i--) {
                    var series = seriesViewModels[i];
                    var contains = series.items.items.some(function (p) { return p.uniqueId === chartPoint.uniqueId; });
                    if (contains) {
                        return series;
                    }
                }
                return null;
            };
            /**
             * Searches the supplied collection for a series view model with the specified `id` parameter. Returns null if no series was found.
             * @param seriesViewModels The list of series view models.
             * @param id The identifier for the series view model to be found.
             */
            ChartUtils.findSeriesViewModelById = function (seriesViewModels, id) {
                return geocortex.framework.utils.ArrayUtils.firstOrDefault(seriesViewModels, function (x) { return !x.isSeriesInternal && x.seriesDefinition.id === id; });
            };
            /**
             * Searches the supplied collection for a series view model with the specified `title` parameter. Returns null if no series was found.
             * @param seriesViewModels The list of series view models.
             * @param id The title for the series view model to be found.
             */
            ChartUtils.findSeriesViewModelByTitle = function (seriesViewModels, title, ignoreCase) {
                if (ignoreCase === void 0) { ignoreCase = true; }
                // String comparison function
                var equals = function (value1, value2, ignoreCase) {
                    if (ignoreCase === void 0) { ignoreCase = true; }
                    var a = value1 || "";
                    var b = value2 || "";
                    if (ignoreCase) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                    }
                    return a === b;
                };
                return geocortex.framework.utils.ArrayUtils.firstOrDefault(seriesViewModels, function (x) { return !x.isSeriesInternal && equals(x.seriesDefinition.title, title, ignoreCase); });
            };
            ChartUtils.equalsDefinition = function (left, right) {
                if (!left || !right) {
                    return false;
                }
                if (left.sourceType != right.sourceType) {
                    return false;
                }
                if (left.name != right.name) {
                    return false;
                }
                if (left.sourceType == charting.ChartFieldSourceType.DataLink && left.dataLinkId != right.dataLinkId) {
                    return false;
                }
                // Check display and sorting format, otherwise the fields could be different (e.g. day of week vs day of month)
                if (left.sortingFormat != right.sortingFormat || left.displayFormat != right.displayFormat) {
                    return false;
                }
                return true;
            };
            /**
             * Overrides the chart legend position to be on the bottom (for Portrait mode) or to the right (for Landscape mode).
             * @param chart The {@link geocortex.charting.ChartViewModel} instance.
             * @param landscapeMode Whether the shell is in landscape mode or not. The default is false.
             */
            ChartUtils.getResponsiveLegendPosition = function (chart, landscapeMode) {
                if (landscapeMode === void 0) { landscapeMode = false; }
                if (chart && chart.chartDefinition && chart.chartDefinition.legend.position !== charting.ChartLegendPosition.None) {
                    var oldPos = chart.chartDefinition.legend.position;
                    var newPos;
                    switch (oldPos) {
                        case geocortex.charting.ChartLegendPosition.Left:
                        case geocortex.charting.ChartLegendPosition.Right:
                            // Respect left & right positioning when in landscape mode
                            newPos = landscapeMode ? oldPos : geocortex.charting.ChartLegendPosition.Bottom;
                            break;
                        case geocortex.charting.ChartLegendPosition.Top:
                        case geocortex.charting.ChartLegendPosition.Bottom:
                            // Respect top & bottom positioning when in portrait mode
                            newPos = landscapeMode ? geocortex.charting.ChartLegendPosition.Right : oldPos;
                            break;
                        default:
                            newPos = oldPos;
                    }
                    return newPos;
                }
                return charting.ChartLegendPosition.None;
            };
            /**
             * Scatter charts are a type of chart at the telerik API level, though it is configured as a type of series in our config model.
             * This returns true if any the provided series are type ScatterPoint.
             * @param series The array of series definitions to check
             */
            ChartUtils.isScatterChart = function (series) {
                return series.some(function (s) { return s.seriesType == charting.ChartSeriesType.ScatterPoint; });
            };
            ChartUtils.DEFAULT_PRECISION = 6;
            ChartUtils.COORD_PRECISION = 3;
            return ChartUtils;
        }());
        charting.ChartUtils = ChartUtils;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ChartUtils.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * The Color class provides a unified way to store colors, which holds the color in rgba form.
         * This simplifies dealing with the different ways to define colors as everyone can use the format
         * they are most comfortable with.
         */
        var Color = (function () {
            function Color(rgbaArray) {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
                this.alpha = 1;
                // This class stores r,g,b as doubles from 0 - 1.0
                if (rgbaArray !== null && typeof rgbaArray !== "undefined" && rgbaArray instanceof Array) {
                    if (rgbaArray.hasOwnProperty("0")) {
                        this.red = charting.ChartUtils.byteToDecimal(rgbaArray[0]);
                    }
                    if (rgbaArray.hasOwnProperty("1")) {
                        this.green = charting.ChartUtils.byteToDecimal(rgbaArray[1]);
                    }
                    if (rgbaArray.hasOwnProperty("2")) {
                        this.blue = charting.ChartUtils.byteToDecimal(rgbaArray[2]);
                    }
                    if (rgbaArray.hasOwnProperty("3")) {
                        this.alpha = charting.ChartUtils.byteToDecimal(rgbaArray[3]);
                    }
                }
            }
            // STATIC METHODS 
            // For generating colors from various types of inputs    
            Color.fromRgb = function (color) {
                var result = new Color();
                result.red = color.r;
                result.green = color.g;
                result.blue = color.b;
                return result;
            };
            Color.fromRgba = function (color) {
                var result = Color.fromRgb(color);
                result.alpha = color.a;
                return result;
            };
            Color.fromHsv = function (color) {
                var result = new Color();
                result.setWithHSV(color);
                return result;
            };
            Color.fromHsva = function (color) {
                var result = Color.fromHsv(color);
                result.alpha = color.a;
                return result;
            };
            Color.fromString = function (hexString) {
                var result = new Color();
                result.setWithString(hexString);
                return result;
            };
            Color.fromArray = function (a) {
                var instance = new Color(a);
                return instance;
            };
            // Convenience methods for Setting and getting colors in various formats
            // Setters
            Color.prototype.setWithHSV = function (hsvColor) {
                // set rgb values using HSV
                if (hsvColor.h !== null) {
                    hsvColor.h = Math.max(0.0, Color.MIN_H, Math.min(6.0, Color.MAX_H, hsvColor.h));
                }
                if (hsvColor.s !== null) {
                    hsvColor.s = Math.max(0.0, Color.MIN_S, Math.min(1.0, Color.MAX_S, hsvColor.s));
                }
                if (hsvColor.v !== null) {
                    hsvColor.v = Math.max(0.0, Color.MIN_V, Math.min(1.0, Color.MAX_V, hsvColor.v));
                }
                // Do the calculation
                var rgbColor = this.hsvToRgb(hsvColor);
                // Set our values
                this.red = rgbColor.r;
                this.green = rgbColor.g;
                this.blue = rgbColor.b;
            };
            Color.prototype.setWithString = function (hexString) {
                var match = hexString.match(/^#?\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
                if (!match) {
                    return;
                }
                else {
                    var red;
                    var blue;
                    var green;
                    if (match[1].length === 6) {
                        red = parseInt(match[1].substr(0, 2), 16) / 255.0;
                        green = parseInt(match[1].substr(2, 2), 16) / 255.0;
                        blue = parseInt(match[1].substr(4, 2), 16) / 255.0;
                    }
                    else {
                        red = parseInt(match[1].charAt(0) + match[1].charAt(0), 16) / 255.0;
                        green = parseInt(match[1].charAt(1) + match[1].charAt(1), 16) / 255.0;
                        blue = parseInt(match[1].charAt(2) + match[1].charAt(2), 16) / 255.0;
                    }
                    this.red = red;
                    this.green = green;
                    this.blue = blue;
                }
            };
            // Getters
            Color.prototype.getHsv = function () {
                var hsvColor = null;
                // the original library was using r,g,b as doubles from 0 - 1.0
                var r = this.red;
                var g = this.green;
                var b = this.blue;
                var n = Math.min(Math.min(r, g), b);
                var v = Math.max(Math.max(r, g), b);
                var m = v - n;
                if (m === 0) {
                    hsvColor = { h: null, s: 0, v: v };
                }
                else {
                    // not sure what this is doing.. but I think it's placing h into one of the 6 spots 
                    // within the 360 degrees of hue, may want to change this in the future.. not sure.
                    var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
                    hsvColor.h = h === 6 ? 0 : h;
                    hsvColor.s = m / v;
                    hsvColor.v = v;
                }
                return hsvColor;
            };
            /**
             * Returns a CSS color string in hexadecimal representation.
             */
            Color.prototype.toString = function (includeAlpha) {
                if (includeAlpha === void 0) { includeAlpha = false; }
                if (includeAlpha) {
                    return "#" +
                        ((0x100 | charting.ChartUtils.decimalToByte(this.alpha)).toString(16).substr(1) +
                            (0x100 | charting.ChartUtils.decimalToByte(this.red)).toString(16).substr(1) +
                            (0x100 | charting.ChartUtils.decimalToByte(this.green)).toString(16).substr(1) +
                            (0x100 | charting.ChartUtils.decimalToByte(this.blue)).toString(16).substr(1));
                }
                else {
                    return "#" +
                        ((0x100 | charting.ChartUtils.decimalToByte(this.red)).toString(16).substr(1) +
                            (0x100 | charting.ChartUtils.decimalToByte(this.green)).toString(16).substr(1) +
                            (0x100 | charting.ChartUtils.decimalToByte(this.blue)).toString(16).substr(1));
                }
            };
            /**
             * Returns a CSS color string in rgb(a) representation.
             */
            Color.prototype.toCss = function (includeAlpha) {
                if (includeAlpha === void 0) { includeAlpha = false; }
                // Array.length === 4, with:
                //   [0] red, {number 0 - 255 }
                //   [1] green, {number 0 - 255 }
                //   [2] blue, {number 0 - 255 }
                //   [3] alpha, {float 0 - 1 }
                var rgb = [
                    charting.ChartUtils.decimalToByte(this.red),
                    charting.ChartUtils.decimalToByte(this.green),
                    charting.ChartUtils.decimalToByte(this.blue)
                ];
                if (includeAlpha) {
                    rgb.push(this.alpha);
                    return "rgba(" + rgb.join(", ") + ")";
                }
                return "rgb(" + rgb.join(", ") + ")";
            };
            /**
             * Returns a 4 component array of RGBA values.
             */
            Color.prototype.toJson = function () {
                // Default to black
                var jsonColor = [0, 0, 0, 255];
                // If a color is defined, serialize it.
                // Note: geocortex essentials is expecting RGBA format
                jsonColor[0] = charting.ChartUtils.decimalToByte(this.red);
                jsonColor[1] = charting.ChartUtils.decimalToByte(this.green);
                jsonColor[2] = charting.ChartUtils.decimalToByte(this.blue);
                jsonColor[3] = charting.ChartUtils.decimalToByte(this.alpha);
                return jsonColor;
            };
            // Converters
            Color.prototype.hsvToRgb = function (hsvColor) {
                if (hsvColor.h === null) {
                    return { r: hsvColor.v, g: hsvColor.v, b: hsvColor.v };
                }
                // Find which area of the hue space we're in (normally measured in degrees 360)
                // in this case, the library had split it into 60 degree increments and set values
                // accordingly
                var i = Math.floor(hsvColor.h);
                // I think this is normalization based on the angle of the hue
                var f = i % 2 ? hsvColor.h - i : 1 - (hsvColor.h - i);
                var m = hsvColor.v * (1 - hsvColor.s);
                var n = hsvColor.v * (1 - hsvColor.s * f);
                var rgbColor;
                switch (i) {
                    case 6:
                    case 0: rgbColor = [hsvColor.v, n, m];
                    case 1: rgbColor = [n, hsvColor.v, m];
                    case 2: rgbColor = [m, hsvColor.v, n];
                    case 3: rgbColor = [m, n, hsvColor.v];
                    case 4: rgbColor = [n, m, hsvColor.v];
                    case 5: rgbColor = [hsvColor.v, m, n];
                }
                // return the rgb color in the right format.
                return { r: rgbColor[0], g: rgbColor[1], b: rgbColor[2] };
            };
            // CONSTANTS
            Color.MAX_H = 0;
            Color.MIN_H = 6;
            Color.MAX_S = 0;
            Color.MIN_S = 1;
            Color.MAX_V = 0;
            Color.MIN_V = 1;
            Color.Black = Color.fromString("#000000");
            Color.White = Color.fromString("#FFFFFF");
            Color.Red = Color.fromString("#FF0000");
            Color.Green = Color.fromString("#00FF00");
            Color.Blue = Color.fromString("#0000FF");
            Color.Transparent = new Color([0, 0, 0, 0]);
            return Color;
        }());
        charting.Color = Color;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
// IMPORTANT NOTE:  In order for every one these types to serialize / deserialize properly, it is important that the enums
// defined in this file match the enums defined in Geocortex.Essentials, Geocortex.Essentials.Configuration and the viewer API's
// These enums are being serialized into integer values, so if they're not in the same order they will deserialize or serialize into the wrong value.
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents the different types of charts available.
         */
        (function (ChartType) {
            /**
             * Linear charts, used for plotting data in an X-Y coordinate system.
             */
            ChartType[ChartType["Linear"] = 0] = "Linear";
            /**
             * Pie chart type is used for plotting pie charts.
             */
            ChartType[ChartType["Pie"] = 1] = "Pie";
        })(charting.ChartType || (charting.ChartType = {}));
        var ChartType = charting.ChartType;
        /**
         * Represents the feature type of the chart.
         */
        (function (ChartFeatureType) {
            /**
             * A chart for a single feature.
             */
            ChartFeatureType[ChartFeatureType["SingleFeature"] = 0] = "SingleFeature";
            /**
             * A chart for multiple features.
             */
            ChartFeatureType[ChartFeatureType["MultiFeature"] = 1] = "MultiFeature";
        })(charting.ChartFeatureType || (charting.ChartFeatureType = {}));
        var ChartFeatureType = charting.ChartFeatureType;
        /**
         * Represents the various types of Chart Series that can exist.
         */
        (function (ChartSeriesType) {
            /**
             * A bar series, plots data points as bars
             */
            ChartSeriesType[ChartSeriesType["Bar"] = 0] = "Bar";
            /**
             * A line series, plots data points as markers connected by lines
             */
            ChartSeriesType[ChartSeriesType["Line"] = 1] = "Line";
            /**
             * Spline series, plots data as interpolated curves
             */
            ChartSeriesType[ChartSeriesType["Spline"] = 2] = "Spline";
            /**
             * Area series, plots data points as markers connected by lines, and fills it in with color
             */
            ChartSeriesType[ChartSeriesType["Area"] = 3] = "Area";
            /**
             * Area series, plots data points as markers connected by interpolated curves, and fills it in with color
             */
            ChartSeriesType[ChartSeriesType["SplineArea"] = 4] = "SplineArea";
            /**
             * Scatter series, plots data as scatter points
             */
            ChartSeriesType[ChartSeriesType["ScatterPoint"] = 5] = "ScatterPoint";
        })(charting.ChartSeriesType || (charting.ChartSeriesType = {}));
        var ChartSeriesType = charting.ChartSeriesType;
        /**
         * Represents the ChartFieldSourceType of the series data.
         */
        (function (ChartFieldSourceType) {
            /**
             * A chart field.
             */
            ChartFieldSourceType[ChartFieldSourceType["Field"] = 0] = "Field";
            /**
             * A one-to-one {@link essentials.DataLink}.
             */
            ChartFieldSourceType[ChartFieldSourceType["DataLink"] = 1] = "DataLink";
        })(charting.ChartFieldSourceType || (charting.ChartFieldSourceType = {}));
        var ChartFieldSourceType = charting.ChartFieldSourceType;
        /**
         * Represents the
         */
        (function (ChartLegendPosition) {
            /**
             *
             */
            ChartLegendPosition[ChartLegendPosition["None"] = 0] = "None";
            /**
             *
             */
            ChartLegendPosition[ChartLegendPosition["Top"] = 1] = "Top";
            /**
             *
             */
            ChartLegendPosition[ChartLegendPosition["Right"] = 2] = "Right";
            /**
             *
             */
            ChartLegendPosition[ChartLegendPosition["Bottom"] = 3] = "Bottom";
            /**
             *
             */
            ChartLegendPosition[ChartLegendPosition["Left"] = 4] = "Left";
        })(charting.ChartLegendPosition || (charting.ChartLegendPosition = {}));
        var ChartLegendPosition = charting.ChartLegendPosition;
        /**
         * Represents the
         */
        (function (ChartPointLabelType) {
            /**
             *
             */
            ChartPointLabelType[ChartPointLabelType["None"] = 0] = "None";
            /**
             *
             */
            ChartPointLabelType[ChartPointLabelType["Smart"] = 1] = "Smart";
            /**
             *
             */
            ChartPointLabelType[ChartPointLabelType["SmartWithConnectors"] = 2] = "SmartWithConnectors";
        })(charting.ChartPointLabelType || (charting.ChartPointLabelType = {}));
        var ChartPointLabelType = charting.ChartPointLabelType;
        /**
         * Represents the
         */
        (function (ChartAxisLabelMode) {
            /**
             *
             */
            ChartAxisLabelMode[ChartAxisLabelMode["Smart"] = 0] = "Smart";
            /**
             *
             */
            ChartAxisLabelMode[ChartAxisLabelMode["All"] = 1] = "All";
        })(charting.ChartAxisLabelMode || (charting.ChartAxisLabelMode = {}));
        var ChartAxisLabelMode = charting.ChartAxisLabelMode;
        /**
         * Represents the
         */
        (function (ChartAreaDragMode) {
            /**
             *
             */
            ChartAreaDragMode[ChartAreaDragMode["None"] = 0] = "None";
            /**
             *
             */
            ChartAreaDragMode[ChartAreaDragMode["Zoom"] = 1] = "Zoom";
            /**
             *
             */
            ChartAreaDragMode[ChartAreaDragMode["Pan"] = 2] = "Pan";
        })(charting.ChartAreaDragMode || (charting.ChartAreaDragMode = {}));
        var ChartAreaDragMode = charting.ChartAreaDragMode;
        (function (ChartPointMarkerType) {
            /**
             *
             */
            ChartPointMarkerType[ChartPointMarkerType["None"] = 0] = "None";
            /**
             *
             */
            ChartPointMarkerType[ChartPointMarkerType["Circle"] = 1] = "Circle";
            /**
             *
             */
            ChartPointMarkerType[ChartPointMarkerType["Square"] = 2] = "Square";
            /**
             *
             */
            ChartPointMarkerType[ChartPointMarkerType["Triangle"] = 3] = "Triangle";
            /**
             *
             */
            ChartPointMarkerType[ChartPointMarkerType["Diamond"] = 4] = "Diamond";
        })(charting.ChartPointMarkerType || (charting.ChartPointMarkerType = {}));
        var ChartPointMarkerType = charting.ChartPointMarkerType;
        (function (ChartSeriesBreakType) {
            /**
             *
             */
            ChartSeriesBreakType[ChartSeriesBreakType["None"] = 0] = "None";
            /**
             *
             */
            ChartSeriesBreakType[ChartSeriesBreakType["UniqueValue"] = 1] = "UniqueValue";
        })(charting.ChartSeriesBreakType || (charting.ChartSeriesBreakType = {}));
        var ChartSeriesBreakType = charting.ChartSeriesBreakType;
        (function (ChartColorPalette) {
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Arctic"] = 0] = "Arctic";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Autumn"] = 1] = "Autumn";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Cold"] = 2] = "Cold";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Flower"] = 3] = "Flower";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Forest"] = 4] = "Forest";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Grayscale"] = 5] = "Grayscale";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Ground"] = 6] = "Ground";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Lilac"] = 7] = "Lilac";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Natural"] = 8] = "Natural";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Office2013"] = 9] = "Office2013";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Pastel"] = 10] = "Pastel";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Rainbow"] = 11] = "Rainbow";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Spring"] = 12] = "Spring";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Summer"] = 13] = "Summer";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Warm"] = 14] = "Warm";
            /**
             *
             */
            ChartColorPalette[ChartColorPalette["Windows8"] = 15] = "Windows8";
        })(charting.ChartColorPalette || (charting.ChartColorPalette = {}));
        var ChartColorPalette = charting.ChartColorPalette;
        var ValueAggregators;
        (function (ValueAggregators) {
            /**
             *
             */
            ValueAggregators[ValueAggregators["Sum"] = 0] = "Sum";
            /**
             *
             */
            ValueAggregators[ValueAggregators["Count"] = 1] = "Count";
            /**
             *
             */
            ValueAggregators[ValueAggregators["Min"] = 2] = "Min";
            /**
             *
             */
            ValueAggregators[ValueAggregators["Max"] = 3] = "Max";
            /**
             *
             */
            ValueAggregators[ValueAggregators["Average"] = 4] = "Average";
        })(ValueAggregators || (ValueAggregators = {}));
        // Note: for the following enum, see the DateTimeFormatViewModel.ts
        // the enums are being used to define both display and sorting formats
        // see how its done before modifying
        (function (DateTimeFormats) {
            DateTimeFormats[DateTimeFormats["Full"] = 0] = "Full";
            DateTimeFormats[DateTimeFormats["Day"] = 1] = "Day";
            DateTimeFormats[DateTimeFormats["Month"] = 2] = "Month";
            DateTimeFormats[DateTimeFormats["Year"] = 3] = "Year";
            DateTimeFormats[DateTimeFormats["DayOfWeek"] = 4] = "DayOfWeek";
            DateTimeFormats[DateTimeFormats["Hour"] = 5] = "Hour";
            DateTimeFormats[DateTimeFormats["Custom"] = 6] = "Custom";
        })(charting.DateTimeFormats || (charting.DateTimeFormats = {}));
        var DateTimeFormats = charting.DateTimeFormats;
        // Note: for the following enum, see the NumericFormatViewModel.ts
        // the enums are being used to define both display and sorting formats
        // see how its done before modifying
        (function (NumericFormats) {
            NumericFormats[NumericFormats["None"] = 0] = "None";
            NumericFormats[NumericFormats["Currency"] = 1] = "Currency";
            NumericFormats[NumericFormats["FixedPoint"] = 2] = "FixedPoint";
            NumericFormats[NumericFormats["Number"] = 3] = "Number";
            NumericFormats[NumericFormats["Percent"] = 4] = "Percent";
            NumericFormats[NumericFormats["Custom"] = 5] = "Custom";
        })(charting.NumericFormats || (charting.NumericFormats = {}));
        var NumericFormats = charting.NumericFormats;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Color.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for the plot area of a Geocortex chart.
             */
            var ChartAreaDefinition = (function () {
                /**
                 * Creates a new instance of the `ChartAreaDefinition`.
                 * @param json The JSON definition to create this instance from.
                 */
                function ChartAreaDefinition(json) {
                    /** The background color of the chart. */
                    this.background = charting.Color.White;
                    /** The foreground color of the chart. */
                    this.foreground = charting.Color.Black;
                    /** Whether the chart should show tool tips or not. */
                    this.showToolTips = true;
                    /** Whether the pie chart should display labels or not. */
                    this.showLabels = false;
                    /** Whether horizontal gridlines should be shown or not. */
                    this.showHorizontalGridLines = true;
                    /** Whether horizontal strips should be shown or not. */
                    this.showHorizontalStrips = false;
                    /** Whether vertical gridlines should be shown or not. */
                    this.showVerticalGridLines = false;
                    /** Whether vertical strips should be shown or not. */
                    this.showVerticalStrips = false;
                    /** Whether or not clicking on a chart point will select the respective features on the map. */
                    this.actionSelect = true;
                    /** Whether or not clicking on a chart point will pan to the respective features on the map. */
                    this.actionPan = false;
                    /** Whether or not clicking on a chart point will zoom to the respective features on the map. */
                    this.actionZoom = false;
                    /** Whether or not clicking on a chart point will open the feature details dialog for the first feature linked to the chart point. */
                    this.actionFeatureDetails = false;
                    /** Whether or not clicking on a chart point will run a custom command. */
                    this.actionRunCommand = false;
                    /** The command to run if configured to run a command upon clicking upon a chart point. */
                    this.commandName = null;
                    /** The command parameter to use if configured to run a command upon clicking a chart point. */
                    this.commandParameter = null;
                    /** Whether or not the user can zoom and pan the chart */
                    this.enablePanAndZoom = true;
                    /** Whether or not a pre-defined color palette is used for the chart series. */
                    this.enableColorPalette = false;
                    /** The approved Telerik chart color palette. */
                    this.colorPalette = charting.ChartColorPalette.Windows8;
                    /** Whether or not the axis range will be harmonized for all configured chart series (each series axis is set to the same max/min). */
                    this.enableCommonSeriesRange = false;
                    if (json) {
                        this.background = new charting.Color(json.background);
                        this.foreground = new charting.Color(json.foreground);
                        this.showToolTips = !!json.showToolTips;
                        this.showLabels = !!json.showLabels;
                        this.showHorizontalGridLines = !!json.showHorizontalGridLines;
                        this.showHorizontalStrips = !!json.showHorizontalStrips;
                        this.showVerticalGridLines = !!json.showVerticalGridLines;
                        this.showVerticalStrips = !!json.showVerticalStrips;
                        this.actionSelect = !!json.actionSelect;
                        this.actionPan = !!json.actionPan;
                        this.actionZoom = !!json.actionZoom;
                        this.actionFeatureDetails = !!json.actionFeatureDetails;
                        this.actionRunCommand = !!json.actionRunCommand;
                        this.enableColorPalette = !!json.enableColorPalette;
                        this.enableCommonSeriesRange = !!json.enableCommonSeriesRange;
                        this.commandName = json.commandName;
                        this.commandParameter = json.commandParameter;
                        this.enablePanAndZoom = !!json.enableHorizontalZoom;
                        this.colorPalette = typeof json.colorPalette !== "undefined" ? json.colorPalette : this.colorPalette;
                    }
                }
                return ChartAreaDefinition;
            }());
            configuration.ChartAreaDefinition = ChartAreaDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for an axis in a geocortex chart.
             */
            var ChartAxisDefinition = (function () {
                function ChartAxisDefinition(json) {
                    /**
                     * The title of this axis.
                     */
                    this.title = "Axis";
                    /**
                     * Whether this axis should be visible.
                     */
                    this.visible = true;
                    /**
                     * Whether this axis should show labels for the major ticks.
                     */
                    this.showLabels = true;
                    /**
                     * The minimum value for this axis.
                     */
                    this.minimum = null;
                    /**
                     * The maximum value for this axis.
                     */
                    this.maximum = null;
                    /**
                     * Whether this axis should be rendered on the opposite side (i.e. on the right side for normal charts, on the top for flipped charts).
                     */
                    this.positionOpposite = false;
                    /**
                     * Whether ticks are displayed on the axis.
                     */
                    this.showTicks = true;
                    /**
                     * Whether this axis should display values in reverse order (descending).
                     */
                    this.reverseValues = false;
                    if (json) {
                        this.title = json.title;
                        this.visible = !!json.visible;
                        this.showLabels = !!json.showLabels;
                        this.minimum = json.minimum;
                        this.maximum = json.maximum;
                        this.positionOpposite = !!json.positionOpposite;
                        this.showTicks = !!json.showTicks;
                        this.reverseValues = !!json.reverseValues;
                    }
                }
                return ChartAxisDefinition;
            }());
            configuration.ChartAxisDefinition = ChartAxisDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for the category axis of a particular chart.
             */
            var ChartCategoryDefinition = (function () {
                function ChartCategoryDefinition(json) {
                    /**
                     * The field that will be used for generating this category.
                     * This field object also contains all of the formatting information for this category. This should probably be moved
                     * into LayerChart since it has more to do with translating a feature/featureset into a Category, but it will remain
                     * here for now. Right now the field contains the formatting information in conjunction with the field name itself.
                     * This information is used when creating the DataSetItems used by the actual geocortex chart in infrastructure.
                     * The formatting information should likely be kept in this class and move the field configuration into the
                     * FeatureLayerChart since it is more feature / layer specific information that the infrastructural chart shouldn't
                     * have to worry about.
                     */
                    this.field = null;
                    /**
                     * The configuration object for the category axis.
                     */
                    this.axis = null;
                    if (json) {
                        this.field = new configuration.ChartFieldDefinition(json.field);
                        this.axis = new configuration.ChartAxisDefinition(json.axis);
                    }
                    else {
                        // Defaults
                        this.field = new configuration.ChartFieldDefinition();
                        this.axis = new configuration.ChartAxisDefinition();
                    }
                }
                return ChartCategoryDefinition;
            }());
            configuration.ChartCategoryDefinition = ChartCategoryDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../../../_Definitions/Framework.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration objects / options for a geocortex chart.
             * This is a fundamental class that every geocortex chart will consume.
             */
            var ChartDefinition = (function () {
                function ChartDefinition(json) {
                    this.id = null;
                    this.displayName = null;
                    /**
                     * The type of chart (e.g. Linear, Pie).
                     */
                    this.chartType = charting.ChartType.Linear;
                    /**
                     * Whether or not the chart should be flipped.
                     */
                    this.flipChart = false;
                    /**
                     * Whether the chart should be visible or not.
                     */
                    this.visible = true;
                    /**
                     * The chart plot area definition.
                     */
                    this.area = null;
                    /**
                     * The chart legend definition.
                     */
                    this.legend = null;
                    /**
                     * The chart category definition.
                     */
                    this.category = null;
                    /**
                     * The collection of chart series definition objects.
                     */
                    this.series = [];
                    if (json) {
                        // Convert string value to enum
                        this.chartType = json.chartType ? charting.ChartType[json.chartType] : this.chartType;
                        this.id = json.id ? json.id : geocortex.framework.utils.alphaNumericToken();
                        this.displayName = json.displayName ? json.displayName : this.id;
                        this.flipChart = !!json.flipChart;
                        this.visible = !!json.visible;
                        this.area = new configuration.ChartAreaDefinition(json.area);
                        this.legend = new configuration.ChartLegendDefinition(json.legend);
                        this.category = new configuration.ChartCategoryDefinition(json.category);
                        // Configure the chart series
                        var seriesLen = json.series ? json.series.length : 0;
                        for (var i = 0; i < seriesLen; i++) {
                            this.series.push(new configuration.ChartSeriesDefinition(json.series[i]));
                        }
                    }
                    else {
                        // Defaults
                        this.id = this.displayName = geocortex.framework.utils.alphaNumericToken();
                        this.area = new configuration.ChartAreaDefinition();
                        this.legend = new configuration.ChartLegendDefinition();
                        this.category = new configuration.ChartCategoryDefinition();
                    }
                }
                return ChartDefinition;
            }());
            configuration.ChartDefinition = ChartDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for a field used by {@link ChartSeriesDefinition} and {@link ChartCategoryDefinition}.
             * It contains all of the display and sorting information needed to aggregate and display the field.
             */
            var ChartFieldDefinition = (function () {
                function ChartFieldDefinition(json) {
                    /**
                     * The name of the field.
                     */
                    this.name = null;
                    /**
                     * The name to use when displaying this field.
                     */
                    this.displayName = null;
                    /**
                     * The format string used when displaying this field data.
                     */
                    this.displayFormat = null;
                    /**
                     * The format string used when sorting and aggregating this field data.
                     */
                    this.sortingFormat = null;
                    /**
                     * Whether the data should be plotted on a continuous DateTime x-axis.
                     */
                    this.isContinuous = false;
                    /**
                     * Whether the data should be plotted on a numerical x-axis.
                     */
                    this.isNumerical = false;
                    /**
                     * A value indicating what the field source is (e.g Field, DataLink).
                     */
                    this.sourceType = charting.ChartFieldSourceType.Field;
                    /**
                     * The data link id if the source is a data link.
                     */
                    this.dataLinkId = null;
                    if (json) {
                        this.name = json.name;
                        this.displayName = json.displayName || json.name;
                        this.displayFormat = json.displayFormat;
                        this.sortingFormat = json.sortingFormat;
                        this.isContinuous = !!json.isContinuous;
                        this.isNumerical = !!json.isNumerical;
                        this.sourceType = typeof json.sourceType !== "undefined" ? json.sourceType : this.sourceType;
                        this.dataLinkId = json.dataLinkId;
                    }
                }
                return ChartFieldDefinition;
            }());
            configuration.ChartFieldDefinition = ChartFieldDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for a chart's legend.
             */
            var ChartLegendDefinition = (function () {
                function ChartLegendDefinition(json) {
                    /**
                     * The title of the chart legend.
                     */
                    this.title = "Legend";
                    /**
                     * The position of the chart legend (e.g None, Top, Right, Bottom, Left).
                     */
                    this.position = charting.ChartLegendPosition.Right;
                    if (json) {
                        this.title = json.title;
                        // Convert JSON string to enum
                        this.position = json.position ? charting.ChartLegendPosition[json.position] : this.position;
                    }
                }
                return ChartLegendDefinition;
            }());
            configuration.ChartLegendDefinition = ChartLegendDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for a chart's series break.
             */
            var ChartSeriesBreakDefinition = (function () {
                function ChartSeriesBreakDefinition(json) {
                    /**
                     * A value indicating the type of series break to perform (e.g. None, UniqueValue)
                     */
                    this.breakType = charting.ChartSeriesBreakType.None;
                    /**
                     * The field that should be used. Only applies to unique values.
                     */
                    this.field = null;
                    if (json) {
                        this.breakType = typeof json.breakType !== "undefined" ? json.breakType : this.breakType;
                        this.field = new configuration.ChartFieldDefinition(json.field);
                    }
                    else {
                        // Defaults
                        this.field = new configuration.ChartFieldDefinition();
                    }
                }
                return ChartSeriesBreakDefinition;
            }());
            configuration.ChartSeriesBreakDefinition = ChartSeriesBreakDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Chart.Rest.d.ts" />
/// <reference path="../../../_Definitions/Framework.d.ts" />
/// <reference path="../Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var configuration;
        (function (configuration) {
            /**
             * This class represents the exposed configuration options for a series in a geocortex chart.
             */
            var ChartSeriesDefinition = (function () {
                function ChartSeriesDefinition(json) {
                    /**
                     * The unique identifier associated with this {@link ChartSeriesDefinition}
                     */
                    this.id = null;
                    /**
                     * The display name of this {@link ChartSeriesDefinition}.
                     */
                    this.displayName = null;
                    /**
                     * The type of series that this should be (e.g. Bar, Line, Spline, Area, SplineArea, ScatterPoint).
                     */
                    this.seriesType = charting.ChartSeriesType.Bar;
                    /**
                     * The field that will be used for generating this series of data.
                     * This field object also contains all of the formatting information for this series. This should probably be moved
                     * into feature chart since it has more to do with translating a feature/featureset into a Series, but it will remain
                     * here for now. Right now the field contains the formatting information in conjunction with the field name itself.
                     * This information is used when creating the DataSetItems used by the actual geocortex chart in infrastructure.
                     * The formatting information should likely be kept in this class and move the field configuration into the
                     * FeatureLayerChart since it is more feature / layer specific information that the infrastructural chart shouldn't
                     * have to worry about.
                     */
                    this.field = null;
                    /**
                     * The configuration object for this series custom axis.
                     */
                    this.axis = null;
                    /**
                     * The series break for the series.
                     */
                    this.seriesBreak = null;
                    /**
                     * The title of this series.
                     */
                    this.title = null;
                    /**
                     * The format string used when formatting the value of this field (i.e. in DataLabels and such)
                     */
                    this.valueFormat = null;
                    /**
                     * The root color of this series.
                     */
                    this.color = charting.Color.Red;
                    /**
                     * The label orientation used when displaying point labels (e.g. None, Smart, SmartWithConnectors)
                     */
                    this.labelType = charting.ChartPointLabelType.None;
                    /**
                     * The marker type to be used for data points in this series (e.g. None, Circle, Square, Triangle, Diamond)
                     */
                    this.markerType = charting.ChartPointMarkerType.Circle;
                    /**
                     * The name of the Value Aggregator to be used by this series.
                     * In infrastructure, there is a notion of an {@link aggregation.ValueAggregatorInterface} which is responsible for aggregating
                     * value fields in collections that are generated by the Series Definition.  The various {@link aggregation.ValueAggregatorInterface} are
                     * imported allowing a developer to create a new one and configure any chart to use it by its name.
                     */
                    this.valueAggregatorName = "Sum";
                    if (json) {
                        this.id = json.id ? json.id : geocortex.framework.utils.alphaNumericToken();
                        this.displayName = json.displayName;
                        // Convert JSON string values to proper enums
                        this.seriesType = json.seriesType ? charting.ChartSeriesType[json.seriesType] : this.seriesType;
                        this.labelType = json.labelType ? charting.ChartPointLabelType[json.labelType] : this.labelType;
                        this.markerType = json.markerType ? charting.ChartPointMarkerType[json.markerType] : this.markerType;
                        this.title = json.title;
                        this.timeZoneId = json.timeZoneId;
                        this.displayTimeZoneId = json.displayTimeZoneId;
                        this.valueFormat = json.valueFormat;
                        this.valueAggregatorName = json.valueAggregatorName || "Sum";
                        this.color = new charting.Color(json.color);
                        this.field = new configuration.ChartFieldDefinition(json.field);
                        this.axis = new configuration.ChartAxisDefinition(json.axis);
                        this.seriesBreak = new configuration.ChartSeriesBreakDefinition(json.seriesBreak);
                    }
                    else {
                        // Defaults
                        this.id = geocortex.framework.utils.alphaNumericToken();
                        this.field = new configuration.ChartFieldDefinition();
                        this.axis = new configuration.ChartAxisDefinition();
                        this.seriesBreak = new configuration.ChartSeriesBreakDefinition();
                    }
                }
                return ChartSeriesDefinition;
            }());
            configuration.ChartSeriesDefinition = ChartSeriesDefinition;
        })(configuration = charting.configuration || (charting.configuration = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents a registry of all available {@link ChartPointAdapterInterface} instances.
         */
        var ChartPointAdapterRegistry = (function () {
            function ChartPointAdapterRegistry() {
            }
            ChartPointAdapterRegistry.registerAdapter = function (adapter, sourceType) {
                if (sourceType) {
                    ChartPointAdapterRegistry._adapters[sourceType] = adapter;
                }
            };
            ChartPointAdapterRegistry.getAdapterBySourceType = function (sourceType) {
                if (this._adapters.hasOwnProperty(sourceType)) {
                    return ChartPointAdapterRegistry._adapters[sourceType];
                }
                return null;
            };
            ChartPointAdapterRegistry.getAdapters = function () {
                var result = [];
                for (var sourceType in ChartPointAdapterRegistry._adapters) {
                    if (!ChartPointAdapterRegistry._adapters.hasOwnProperty(sourceType)) {
                        continue;
                    }
                    var adapter = ChartPointAdapterRegistry._adapters[sourceType];
                    result.push(adapter);
                }
                return result;
            };
            ChartPointAdapterRegistry.clear = function () {
                ChartPointAdapterRegistry._adapters = {};
            };
            ChartPointAdapterRegistry._adapters = {};
            return ChartPointAdapterRegistry;
        }());
        charting.ChartPointAdapterRegistry = ChartPointAdapterRegistry;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * An aggregator that aggregates using a `Sum` function. The produced value is the sum of all of the input values.
             */
            var SumValueAggregator = (function () {
                function SumValueAggregator() {
                    this.name = "Sum";
                    this.displayName = "Sum";
                }
                SumValueAggregator.prototype.aggregate = function (items) {
                    if (items && items.length > 0) {
                        var sum = 0;
                        var value;
                        var i = items.length;
                        while (i--) {
                            value = charting.ChartUtils.numericValue(items[i].value);
                            sum += value !== null ? value : 0;
                        }
                        return sum;
                    }
                    return 0; // Return 0 for empty sequences
                };
                return SumValueAggregator;
            }());
            aggregation.SumValueAggregator = SumValueAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * An aggregator that aggregates via counting the number of inputs. In other words, the aggregate value of a sequence of `10` elements is `10`.
             */
            var CountValueAggregator = (function () {
                function CountValueAggregator() {
                    this.name = "Count";
                    this.displayName = "Count";
                }
                /** @inherited */
                CountValueAggregator.prototype.aggregate = function (items) {
                    // Return 0 for empty sequences
                    return items ? items.length : 0;
                };
                return CountValueAggregator;
            }());
            aggregation.CountValueAggregator = CountValueAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * Aggregates values and produces an average value based on the set of {@link ChartPoint} instances passed in.
             */
            var AverageValueAggregator = (function () {
                function AverageValueAggregator() {
                    this.name = "Average";
                    this.displayName = "Average";
                }
                /** @inherited */
                AverageValueAggregator.prototype.aggregate = function (items) {
                    if (items && items.length > 0) {
                        var sum = 0;
                        var value;
                        var i = items.length;
                        while (i--) {
                            value = charting.ChartUtils.numericValue(items[i].value);
                            sum += value !== null ? value : 0;
                        }
                        return sum / items.length;
                    }
                    return 0; // Return 0 for empty sequences
                };
                return AverageValueAggregator;
            }());
            aggregation.AverageValueAggregator = AverageValueAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * An aggregator that aggregates using a `Min` function. In other words, the produced value is the lowest (minimum) encountered in the input collection.
             */
            var MinValueAggregator = (function () {
                function MinValueAggregator() {
                    this.name = "Min";
                    this.displayName = "Min";
                }
                MinValueAggregator.prototype.aggregate = function (items) {
                    if (items && items.length > 0) {
                        var min = charting.ChartUtils.numericValue(items[0].value);
                        var value;
                        for (var i = 1; i < items.length; i++) {
                            value = charting.ChartUtils.numericValue(items[i].value);
                            min = value !== null && value < min ? value : min;
                        }
                        return min;
                    }
                    return 0; // Return 0 for empty sequences
                };
                return MinValueAggregator;
            }());
            aggregation.MinValueAggregator = MinValueAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * An aggregator that aggregates using a `Max` function. In other words, the produced value is the highest (maximum) encountered in the input collection.
             */
            var MaxValueAggregator = (function () {
                function MaxValueAggregator() {
                    this.name = "Max";
                    this.displayName = "Max";
                }
                /** @inherited */
                MaxValueAggregator.prototype.aggregate = function (items) {
                    if (items && items.length > 0) {
                        var max = charting.ChartUtils.numericValue(items[0].value);
                        var value;
                        for (var i = 1; i < items.length; i++) {
                            value = charting.ChartUtils.numericValue(items[i].value);
                            max = value !== null && value > max ? value : max;
                        }
                        return max;
                    }
                    return 0; // Return 0 for empty sequences
                };
                return MaxValueAggregator;
            }());
            aggregation.MaxValueAggregator = MaxValueAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="aggregation/SumValueAggregator.ts" />
/// <reference path="aggregation/CountValueAggregator.ts" />
/// <reference path="aggregation/AverageValueAggregator.ts" />
/// <reference path="aggregation/MinValueAggregator.ts" />
/// <reference path="aggregation/MaxValueAggregator.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents a registry of all available {@link aggregation.ValueAggregatorInterface} instances.
         */
        var ValueAggregatorRegistry = (function () {
            function ValueAggregatorRegistry() {
            }
            ValueAggregatorRegistry._builtinAggregators = function () {
                var sumAgg = new charting.aggregation.SumValueAggregator();
                var countAgg = new charting.aggregation.CountValueAggregator();
                var avgAgg = new charting.aggregation.AverageValueAggregator();
                var minAgg = new charting.aggregation.MinValueAggregator();
                var maxAgg = new charting.aggregation.MaxValueAggregator();
                var dict = {};
                dict[sumAgg.name] = sumAgg;
                dict[countAgg.name] = countAgg;
                dict[avgAgg.name] = avgAgg;
                dict[minAgg.name] = minAgg;
                dict[maxAgg.name] = maxAgg;
                return dict;
            };
            ValueAggregatorRegistry.registerAggregator = function (aggregator) {
                if (!aggregator || !aggregator.name) {
                    throw new Error("The value aggregator's name cannot be null.");
                }
                ValueAggregatorRegistry._aggregators[aggregator.name] = aggregator;
            };
            ValueAggregatorRegistry.getAggregatorByName = function (name) {
                if (name && this._aggregators.hasOwnProperty(name)) {
                    return ValueAggregatorRegistry._aggregators[name];
                }
                return null;
            };
            ValueAggregatorRegistry.getAggregators = function () {
                var result = [];
                for (var name in ValueAggregatorRegistry._aggregators) {
                    if (!ValueAggregatorRegistry._aggregators.hasOwnProperty(name)) {
                        continue;
                    }
                    var aggregator = ValueAggregatorRegistry._aggregators[name];
                    result.push(aggregator);
                }
                return result;
            };
            ValueAggregatorRegistry.clear = function () {
                // Built-in aggregators should always be available
                ValueAggregatorRegistry._aggregators = ValueAggregatorRegistry._builtinAggregators();
            };
            ValueAggregatorRegistry._aggregators = ValueAggregatorRegistry._builtinAggregators();
            return ValueAggregatorRegistry;
        }());
        charting.ValueAggregatorRegistry = ValueAggregatorRegistry;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../../../_Definitions/Framework.d.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var aggregation;
        (function (aggregation) {
            /**
             * Uses an implementation of {@link ValueAggregatorInterface} to aggregate a collection of {@link ChartPoint} instances.
             */
            var ChartPointCollectionAggregator = (function () {
                function ChartPointCollectionAggregator() {
                    /**
                     * The value formatter (e.g. format "123" as currency, et cetera)
                     */
                    this.formatProvider = null;
                }
                /**
                 * Aggregates a collection of chart points, represented by a {@link ChartPointCollection}.
                 * @param collection The collection to aggregate.
                 */
                ChartPointCollectionAggregator.prototype.aggregate = function (collection) {
                    var _this = this;
                    // Create a new PointCollection for the Aggregated values
                    var _items = [];
                    // Aggregate the grouped data set items
                    var groups = charting.ChartPointUtils.getGroupedChartPoints(collection);
                    var points = groups.map(function (g) {
                        var _aggregator = _this.getAggregator(g.seriesDefinition);
                        return _this.aggregateGroup(g, _aggregator);
                    });
                    // Ensure null elements are discarded
                    points = points.filter(function (x) { return x !== null; });
                    // Perform special sorting for chart points generated on a single field (eg. a string field with multiple values);
                    // This separates the chart points into groups by series, and then sorts them alphabetically if they are defined on the same series
                    var pointsPerSeries = geocortex.framework.utils.ArrayUtils.groupBy(points, function (p) { return p.seriesDefinition.id; });
                    for (var i = 0; i < pointsPerSeries.length; i++) {
                        var currentSeries = pointsPerSeries[i];
                        if (!currentSeries) {
                            continue;
                        }
                        if (currentSeries.items.length > 1) {
                            var temp = new charting.ChartPointCollection(currentSeries.items);
                            temp.sort();
                            _items = _items.concat(temp.items);
                        }
                        else {
                            _items = _items.concat(currentSeries.items);
                        }
                    }
                    var aggregatedCollection = new charting.ChartPointCollection(_items);
                    return aggregatedCollection;
                };
                /**
                 * Aggregates a group of charting points, represented by a {@link ChartPointGroup}.
                 * @param group The group to aggregate.
                 * @param valueAggregator The aggregator to use.
                 */
                ChartPointCollectionAggregator.prototype.aggregateGroup = function (group, valueAggregator) {
                    if (valueAggregator === void 0) { valueAggregator = null; }
                    // Note: We're aggregating a group of items here.  We're setting the Category and Series
                    // of the new item to that of the very first item in the group.
                    if (group && group.items && group.items.length > 0) {
                        var aggregator = valueAggregator || charting.ValueAggregatorRegistry.getAggregatorByName("Sum");
                        var firstItem = group.items[0];
                        var aggregatedChartPoint = new charting.ChartPoint({
                            seriesDefinition: firstItem.seriesDefinition,
                            categoryDefinition: firstItem.categoryDefinition,
                            category: firstItem.category,
                            series: firstItem.series,
                            seriesBreakValue: firstItem.seriesBreakValue,
                            formatProvider: firstItem.formatProvider || this.formatProvider,
                            value: aggregator.aggregate(group.items)
                        });
                        // Provide a hook for implementers to add custom data to the chart point attributes dictionary
                        this.attachAttributes(aggregatedChartPoint, group);
                        return aggregatedChartPoint;
                    }
                    return null;
                };
                /**
                 * Attaches attributes and metadata to a {@link ChartPoint}.
                 * @param item The {@link ChartPoint} to attach data to.
                 * @param group The {@link ChartPointGroup} from which to pull attributes and metadata.
                 */
                ChartPointCollectionAggregator.prototype.attachAttributes = function (item, group) {
                };
                /**
                 * Gets an implementation of {@link ValueAggregatorInterface} based on the given {@link configuration.ChartSeriesDefinition}.
                 * @param seriesDefinition The series definition.
                 */
                ChartPointCollectionAggregator.prototype.getAggregator = function (seriesDefinition) {
                    // Try and get the aggregator defined in config, or else just get the sum aggregator
                    if (seriesDefinition && seriesDefinition.valueAggregatorName) {
                        var _aggregator = charting.ValueAggregatorRegistry.getAggregatorByName(seriesDefinition.valueAggregatorName);
                        if (_aggregator !== null) {
                            return _aggregator;
                        }
                    }
                    return charting.ValueAggregatorRegistry.getAggregatorByName("Sum");
                };
                return ChartPointCollectionAggregator;
            }());
            aggregation.ChartPointCollectionAggregator = ChartPointCollectionAggregator;
        })(aggregation = charting.aggregation || (charting.aggregation = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="Enums.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Defines the palette semantic for the chart's series.
         */
        var ColorPalette = (function () {
            function ColorPalette(name, entries) {
                /**
                 * The user-friendly identifier for the palette.
                 */
                this.name = null;
                /**
                 * The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
                 */
                this.entries = [];
                this.name = name;
                if (entries !== null && (entries instanceof Array) && entries.length > 0) {
                    var first = entries[0];
                    if (first && first instanceof charting.Color) {
                        this.entries = entries.slice();
                    }
                    if (typeof first === "string") {
                        this.entries = entries.map(function (x) { return charting.Color.fromString(x); });
                    }
                }
            }
            /**
             * Returns the CSS color strings for this palette in hexadecimal representation.
             */
            ColorPalette.prototype.toHexColors = function () {
                if (this.entries) {
                    return this.entries.map(function (color) { return color.toString(); });
                }
                return [];
            };
            /**
             * Returns the CSS color strings for this palette in rbg(a) representation.
             */
            ColorPalette.prototype.toCssColors = function (includeAlpha) {
                if (includeAlpha === void 0) { includeAlpha = false; }
                if (this.entries) {
                    return this.entries.map(function (color) { return color.toCss(includeAlpha); });
                }
                return [];
            };
            ColorPalette.Arctic = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Arctic], ["#8FCAEE", "#4CA9D7", "#1E7BA9", "#BDC1C5", "#8C8C8C", "#CF1C1F", "#F0484B", "#FF867F"]);
            ColorPalette.Autumn = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Autumn], ["#97A035", "#BFAD61", "#E2CB70", "#ECB552", "#DD7F33", "#D15B27", "#B54824", "#7D3B25"]);
            ColorPalette.Cold = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Cold], ["#83D4F1", "#4BAEDB", "#288DBA", "#7CCCD6", "#4BADB9", "#97CFE5", "#63B2CF", "#4593AC"]);
            ColorPalette.Flower = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Flower], ["#DD789B", "#AAC271", "#9F8E7C", "#E0D26D", "#E494BB", "#85B379", "#AAA1A1", "#DEB3B7"]);
            ColorPalette.Forest = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Forest], ["#ADB827", "#F1A54C", "#A66940", "#DB6340", "#DCA063", "#8BA041", "#C09366", "#F2BE4B"]);
            ColorPalette.Grayscale = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Grayscale], ["#404040", "#808080", "#B3B3B3", "#595959", "#999999", "#C0C0C0", "#666666", "#A6A6A6"]);
            ColorPalette.Ground = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Ground], ["#FFBE8C", "#F2875A", "#CC4343", "#6C524E", "#8A7161", "#B09176", "#DAB89B", "#B65845"]);
            ColorPalette.Lilac = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Lilac], ["#88C97F", "#80D5CF", "#C3AAEF", "#6E8FD4", "#A4D386", "#A4B5EF", "#61BBD1", "#A0A0D2"]);
            ColorPalette.Natural = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Natural], ["#EF7513", "#F0A13F", "#EFD159", "#C1CA5F", "#97A031", "#ADA17E", "#8B473A", "#CE4226"]);
            ColorPalette.Office2013 = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Office2013], ["#0072C6", "#007133", "#DD5800", "#00178F", "#682079", "#A13B39", "#005646", "#1B9DDE"]);
            ColorPalette.Pastel = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Pastel], ["#C9A2C8", "#98BED9", "#9CD084", "#719BAE", "#80C4B2", "#94A0BC", "#A0CBD3", "#D9CAD1"]);
            ColorPalette.Rainbow = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Rainbow], ["#1171CA", "#3294DA", "#45B5B2", "#8CC221", "#AFDA3D", "#E3DA20", "#F58E13", "#E03D0B"]);
            ColorPalette.Spring = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Spring], ["#BED781", "#F8A6C4", "#84C3BA", "#C0B2B2", "#9DCE67", "#F48EAD", "#E0CCCA", "#A0CBDA"]);
            ColorPalette.Summer = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Summer], ["#3FA7C4", "#9ED552", "#E1DB63", "#C49FD9", "#C5DF5E", "#55C0CD", "#86D8A6", "#ADADD7"]);
            ColorPalette.Warm = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Warm], ["#F3D24F", "#FAC24D", "#F9AC3B", "#F58E13", "#FA6800", "#F04600", "#DE2E05", "#CB0C0C"]);
            ColorPalette.Windows8 = new ColorPalette(charting.ChartColorPalette[charting.ChartColorPalette.Windows8], ["#8EC441", "#1B9DDE", "#F59700", "#D4DF32", "#339933", "#00ABA9", "#DC5B20", "#E8BC34"]);
            return ColorPalette;
        }());
        charting.ColorPalette = ColorPalette;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ColorPalette.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents a registry of all available {@link ColorPalette} instances.
         */
        var ColorPaletteRegistry = (function () {
            function ColorPaletteRegistry() {
            }
            ColorPaletteRegistry._builtinPalettes = function () {
                var dict = {};
                dict[charting.ColorPalette.Arctic.name] = charting.ColorPalette.Arctic;
                dict[charting.ColorPalette.Autumn.name] = charting.ColorPalette.Autumn;
                dict[charting.ColorPalette.Cold.name] = charting.ColorPalette.Cold;
                dict[charting.ColorPalette.Flower.name] = charting.ColorPalette.Flower;
                dict[charting.ColorPalette.Forest.name] = charting.ColorPalette.Forest;
                dict[charting.ColorPalette.Grayscale.name] = charting.ColorPalette.Grayscale;
                dict[charting.ColorPalette.Ground.name] = charting.ColorPalette.Ground;
                dict[charting.ColorPalette.Lilac.name] = charting.ColorPalette.Lilac;
                dict[charting.ColorPalette.Natural.name] = charting.ColorPalette.Natural;
                dict[charting.ColorPalette.Office2013.name] = charting.ColorPalette.Office2013;
                dict[charting.ColorPalette.Pastel.name] = charting.ColorPalette.Pastel;
                dict[charting.ColorPalette.Rainbow.name] = charting.ColorPalette.Rainbow;
                dict[charting.ColorPalette.Spring.name] = charting.ColorPalette.Spring;
                dict[charting.ColorPalette.Summer.name] = charting.ColorPalette.Summer;
                dict[charting.ColorPalette.Warm.name] = charting.ColorPalette.Warm;
                dict[charting.ColorPalette.Windows8.name] = charting.ColorPalette.Windows8;
                return dict;
            };
            ColorPaletteRegistry.registerColorPalette = function (palette) {
                if (!palette || !palette.name) {
                    throw new Error("The chart color palette's name cannot be null.");
                }
                ColorPaletteRegistry._palettes[palette.name] = palette;
            };
            ColorPaletteRegistry.getColorPaletteByName = function (name) {
                if (name && this._palettes.hasOwnProperty(name)) {
                    return ColorPaletteRegistry._palettes[name];
                }
                return null;
            };
            ColorPaletteRegistry.getColorPalettes = function () {
                var result = [];
                for (var name in ColorPaletteRegistry._palettes) {
                    if (!ColorPaletteRegistry._palettes.hasOwnProperty(name)) {
                        continue;
                    }
                    var palette = ColorPaletteRegistry._palettes[name];
                    result.push(palette);
                }
                return result;
            };
            ColorPaletteRegistry.clear = function () {
                // Built-in palettes should always be available
                ColorPaletteRegistry._palettes = ColorPaletteRegistry._builtinPalettes();
            };
            ColorPaletteRegistry._palettes = ColorPaletteRegistry._builtinPalettes();
            return ColorPaletteRegistry;
        }());
        charting.ColorPaletteRegistry = ColorPaletteRegistry;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ChartPointUtils.ts" />
/// <reference path="ChartUtils.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var ValueAxisUtils = (function () {
            function ValueAxisUtils() {
            }
            /**
             * Calculates the range for the value axis associated with the a chart series.
             * If a point collection is supplied, it calculates the upper and lower bounds based on the data provided.
             * Returns a range object with properties: `min`, `max`.
             * @param seriesDefinition The chart series configuration.
             * @collection The collection of {@link ChartPoint} objects.
             * @param roundToMajorUnit Whether to round the min and max values to the next major unit. Defaults to `true`.
             */
            ValueAxisUtils.getRange = function (seriesDefinition, collection, roundToMajorUnit) {
                if (roundToMajorUnit === void 0) { roundToMajorUnit = true; }
                var range = { min: 0, max: 1 };
                var autoMin;
                var autoMax;
                var userMin = seriesDefinition.axis.minimum;
                var userMax = seriesDefinition.axis.maximum;
                // Try to get the axis range from configured values (if available)
                var userDefinedLimits = charting.ChartUtils.isDefined(userMin) && charting.ChartUtils.isDefined(userMax);
                if (userDefinedLimits) {
                    range.min = userMin;
                    range.max = userMax;
                }
                else {
                    // Auto-calculate the lower and upper bounds for the axis. Get a flattened list of all the ChartPoints 
                    // that belong to this series, since some series get split into multiple internal series from the original ChartPointCollection.
                    if (collection && collection.items && collection.items.length > 0) {
                        var seriesPoints = collection.items.filter(function (point) { return point.seriesDefinition.id === seriesDefinition.id; });
                        var autoAxisLimits = charting.ChartPointUtils.getBounds(seriesPoints, function (point) { return charting.ChartUtils.numericValue(point.value); });
                        autoMin = autoAxisLimits.item1;
                        autoMax = autoAxisLimits.item2;
                        // Compute "nice" axis scaling parameters.
                        // See https://support.microsoft.com/en-us/kb/214075 and http://peltiertech.com/calculate-nice-axis-scales-in-your-excel-worksheet/
                        var majorUnit = ValueAxisUtils.calculateMajorUnit({ min: autoMin, max: autoMax });
                        // Adjust min and max if they are close enough to the next major unit
                        if (roundToMajorUnit !== false) {
                            if (autoMin < 0 && charting.ChartUtils.remainderClose(autoMin, majorUnit, 1 / 3)) {
                                autoMin -= majorUnit;
                            }
                            if (autoMax > 0 && charting.ChartUtils.remainderClose(autoMax, majorUnit, 1 / 3)) {
                                autoMax += majorUnit;
                            }
                        }
                        // Round off min and max to multiples of the major unit; e.g. (max = 11, major unit = 3) => max = 12
                        autoMin = charting.ChartUtils.floor(autoMin, majorUnit);
                        autoMax = charting.ChartUtils.ceil(autoMax, majorUnit);
                    }
                    else {
                        autoMin = autoMax = 0.0;
                    }
                    // Configured series min and max values take precedence over calculated point values
                    range.min = charting.ChartUtils.valueOrDefault(userMin, autoMin);
                    range.max = charting.ChartUtils.valueOrDefault(userMax, autoMax);
                }
                return range;
            };
            /**
             * Calculates the automatic major unit for a vertical (value) axis.
             * Value axes have major and minor divisions, corresponding to where tick marks, tick labels, and gridlines appear, when present.
             * How frequently these appear is determined by the major/minor units setting, specified as a floating point number of units to
             * skip between divisions.
             * @param range The axis range.
             */
            ValueAxisUtils.calculateMajorUnit = function (range) {
                if (!charting.ChartUtils.isDefined(range)) {
                    throw new Error("Required parameter range cannot be null");
                }
                var diff = charting.ChartUtils.round(range.max - range.min, charting.ChartUtils.DEFAULT_PRECISION - 1);
                if (diff === 0) {
                    if (range.max === 0) {
                        return 0.1;
                    }
                    diff = Math.abs(range.max);
                }
                var scale = Math.pow(10, Math.floor(Math.log(diff) / Math.log(10)));
                var relativeValue = charting.ChartUtils.round((diff / scale), charting.ChartUtils.DEFAULT_PRECISION);
                var scaleMultiplier = 1;
                if (relativeValue < 1.904762) {
                    scaleMultiplier = 0.2;
                }
                else if (relativeValue < 4.761904) {
                    scaleMultiplier = 0.5;
                }
                else if (relativeValue < 9.523809) {
                    scaleMultiplier = 1;
                }
                else {
                    scaleMultiplier = 2;
                }
                return charting.ChartUtils.round(scale * scaleMultiplier, charting.ChartUtils.DEFAULT_PRECISION);
            };
            ValueAxisUtils.calculateMinorUnit = function (rangeOrMajorUnit) {
                if (typeof rangeOrMajorUnit === "number") {
                    return rangeOrMajorUnit / 5;
                }
                else {
                    return ValueAxisUtils.calculateMajorUnit(rangeOrMajorUnit) / 5;
                }
            };
            /**
             * Calculates the number of visible ticks along a value axis.
             * @param range The axis range.
             * @param unitValue The value between each tick mark along the axis. Can be either the major unit or minor unit. Defaults to the major unit.
             */
            ValueAxisUtils.calculateVisibleTickCount = function (range, unitValue) {
                if (!charting.ChartUtils.isDefined(range)) {
                    throw new Error("Required parameter range cannot be null");
                }
                // Auto-calculate the axis major unit if none provided
                unitValue = charting.ChartUtils.valueOrDefault(unitValue, ValueAxisUtils.calculateMajorUnit(range));
                var diff = range.max - range.min;
                return Math.floor(charting.ChartUtils.round(diff / unitValue, charting.ChartUtils.COORD_PRECISION)) + 1;
            };
            return ValueAxisUtils;
        }());
        charting.ValueAxisUtils = ValueAxisUtils;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var eventArgs;
        (function (eventArgs) {
            /**
             * Contains information pertaining to changes in a collection of chart data, included completion of rendering the set of data.
             */
            var ChartDataChangedEventArgs = (function () {
                function ChartDataChangedEventArgs(chartViewModel) {
                    this.chartViewModel = null;
                    if (chartViewModel) {
                        this.chartViewModel = chartViewModel;
                    }
                }
                return ChartDataChangedEventArgs;
            }());
            eventArgs.ChartDataChangedEventArgs = ChartDataChangedEventArgs;
        })(eventArgs = charting.eventArgs || (charting.eventArgs = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../ChartPoint.ts"/>
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var eventArgs;
        (function (eventArgs) {
            var ChartPointEventArgs = (function () {
                function ChartPointEventArgs(chartPoint, chartViewModel) {
                    this.chartPoint = null;
                    this.chartViewModel = null;
                    this.chartPoint = chartPoint;
                    this.chartViewModel = chartViewModel;
                }
                return ChartPointEventArgs;
            }());
            eventArgs.ChartPointEventArgs = ChartPointEventArgs;
        })(eventArgs = charting.eventArgs || (charting.eventArgs = {}));
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="../_Definitions/Framework.d.ts" />
/// <reference path="charting/eventArgs/ChartDataChangedEventArgs.ts" />
/// <reference path="charting/eventArgs/ChartPointEventArgs.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var ColorUtils = (function () {
            function ColorUtils() {
            }
            /**
             * By using the HSL color system, this extension method generates a palette of colors
             * based on a root color by altering the Saturation and Luminosity of the colors.
             * Returns an array of {@link Color} that represent the generated palette.
             * @param color The root color to generate the palette from
             * @param numColors The number or colors to generate in the palette
             * @param luminosityRatio The ratio of the luminosity spectrum to use in the palette
             * @param saturationRatio The ratio of the saturation spectrum to use in the palette
             */
            ColorUtils.generateSatLumPalette = function (color, numColors, luminosityRatio, saturationRatio) {
                if (numColors === void 0) { numColors = 1; }
                if (luminosityRatio === void 0) { luminosityRatio = 0.8; }
                if (saturationRatio === void 0) { saturationRatio = 0.8; }
                var originalHsl = charting.HslColor.fromColor(color);
                var hue = originalHsl.h;
                var lum = originalHsl.l;
                var sat = originalHsl.s;
                var step = 1;
                if (numColors > 1) {
                    step = numColors - 1;
                }
                var colors = [];
                var lumStep = luminosityRatio / step;
                var satStep = saturationRatio / step;
                for (var i = 0; i < numColors; i++) {
                    var lumTemp = lum == 0.0 ? lum : 1.0 - ((numColors - i) * lumStep);
                    var satTemp = sat == 0.0 ? sat : 1.0 - ((numColors - i) * satStep);
                    var hslColor = new charting.HslColor();
                    hslColor.a = color.alpha;
                    hslColor.h = hue;
                    hslColor.l = lumTemp;
                    hslColor.s = satTemp;
                    colors.push(hslColor.toColor());
                }
                return colors;
            };
            /**
             * Generates a "selection" color based on the existing color. For now,
             * this method simply sets the alpha of the new color to half of the original.
             * Returns a new "selection" {@link Color}.
             * @param color The original color
             */
            ColorUtils.generateSelectionColor = function (color) {
                var newColor = charting.Color.fromRgba({
                    r: color.red,
                    g: color.green,
                    b: color.blue,
                    a: color.alpha / 2.0
                });
                return newColor;
            };
            return ColorUtils;
        }());
        charting.ColorUtils = ColorUtils;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ChartUtils.ts"/>
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        /**
         * Represents an adapter class to transform external data into instances of {@link ChartPoint} for use in a Geocortex chart.
         */
        var ChartPointAdapterBase = (function () {
            /**
             * Initializes a new instance of the {@link ChartPointAdapterBase} class.
             */
            function ChartPointAdapterBase() {
            }
            /**
             * Fills a {@link ChartPointCollection} with data from the given `source`, respecting any options passed in.
             * @param collection The collection to fill.
             * @param source The data source to populate the collection from.
             * @param options Options to use while adapting data from the source.
             */
            ChartPointAdapterBase.prototype.fill = function (collection, source, options) {
                throw new Error("This method is abstract");
            };
            /**
             * Returns the raw data value from a given source item and with respect to the given field definition.
             * @param fieldDefinition The field definition to honor.
             * @param sourceItem The raw source item to extract the value from.
             * @param userState
             */
            ChartPointAdapterBase.prototype.getFieldValue = function (fieldDefinition, sourceItem, userState) {
                if (userState === void 0) { userState = null; }
                throw new Error("This method is abstract");
            };
            /**
             * Creates a new {@link ChartPoint} based on a raw source item, optional options, and arbitrary user state.
             * @param sourceItem The raw item to use.
             * @param options Options to use while creating the new chart point.
             * @param userState arbitrary state to consume or pass onwards.
             */
            ChartPointAdapterBase.prototype.createChartPoint = function (sourceItem, options, userState) {
                if (userState === void 0) { userState = null; }
                throw new Error("This method is abstract");
            };
            /**
             * Creates a new {@link ChartPoint} given a raw source item, a series title, series value, category value, options, and arbitrary user state.
             * @param sourceItem The raw item to create the point from.
             * @param seriesTitle The title of the series that the point belongs to.
             * @param seriesFieldValue The value of the field that the series relates to.
             * @param categoryFieldValue The category field value for this point.
             * @param options The options to respect when creating the new chart point.
             */
            ChartPointAdapterBase.prototype.createChartPointCore = function (sourceItem, seriesTitle, seriesFieldValue, categoryFieldValue, options, userState) {
                if (userState === void 0) { userState = null; }
                // We can't create a ChartPoint without a series
                if (seriesFieldValue == null || typeof seriesFieldValue === "undefined" || !options) {
                    return null;
                }
                // Grab the series break value
                var seriesBreakValue = null;
                switch (options.chartSeries.seriesBreak.breakType) {
                    case geocortex.charting.ChartSeriesBreakType.UniqueValue:
                        seriesBreakValue = geocortex.charting.ChartUtils.tryGetFieldValue(options.chartSeries.seriesBreak.field, sourceItem, userState);
                        break;
                    case geocortex.charting.ChartSeriesBreakType.None:
                        break;
                }
                var isSeriesFieldValueNumeric = charting.ChartUtils.isNumeric(seriesFieldValue);
                var chartPoint = new geocortex.charting.ChartPoint({
                    category: categoryFieldValue,
                    series: !isSeriesFieldValueNumeric ? seriesFieldValue : seriesTitle,
                    value: isSeriesFieldValueNumeric ? seriesFieldValue : 1,
                    seriesBreakValue: seriesBreakValue,
                    categoryDefinition: options.chartCategory,
                    seriesDefinition: options.chartSeries,
                    formatProvider: options.formatProvider
                });
                // Add the feature into the extended properties so it can be retrieved later
                this.attachAttributes(chartPoint, sourceItem, options, userState);
                return chartPoint;
            };
            /**
             * Attaches attributes and metadata to a {@link ChartPoint}.
             * @param sourceItem The {@link ChartPoint} to attach data to.
             * @param options The options to respect when attaching attributes to the new chart point.
             * @param userState
             */
            ChartPointAdapterBase.prototype.attachAttributes = function (item, sourceItem, options, userState) {
                if (userState === void 0) { userState = null; }
            };
            return ChartPointAdapterBase;
        }());
        charting.ChartPointAdapterBase = ChartPointAdapterBase;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));
/// <reference path="ChartUtils.ts" />
var geocortex;
(function (geocortex) {
    var charting;
    (function (charting) {
        var HslColor = (function () {
            function HslColor() {
                // Alpha - value from 0 to 1 
                this.a = 0;
                // Hue - value from 0 to 360 
                this.h = 0;
                // Saturation - value from 0 to 1 
                this.s = 0;
                // Luminosity - value from 0 to 1 
                this.l = 0;
            }
            /**
             * Creates a new {@link HslColor} by using the specified {@link Color} channel values.
             * @param c The {@link Color} object.
             */
            HslColor.fromColor = function (c) {
                return HslColor.fromArgb(c.alpha, c.red, c.green, c.blue);
            };
            /**
             * Creates a new {@link HslColor} by using the specified alpha channel and color channel values.
             * @param alpha The alpha channel of the new color. The value must be between 0 and 1.
             * @param red The red channel of the new color. The value must be between 0 and 1.
             * @param green The green channel of the new color. The value must be between 0 and 1.
             * @param blue The blue channel of the new color. The value must be between 0 and 1.
             */
            HslColor.fromArgb = function (alpha, red, green, blue) {
                var c = HslColor.fromRgb(red, green, blue);
                c.a = alpha;
                return c;
            };
            /**
             * Creates a new {@link HslColor} by using the specified color channel values.
             * @param red The red channel of the new color. The value must be between 0 and 1.
             * @param green The green channel of the new color. The value must be between 0 and 1.
             * @param blue The blue channel of the new color. The value must be between 0 and 1.
             */
            HslColor.fromRgb = function (red, green, blue) {
                var c = new HslColor();
                c.a = 1; // ... alpha
                var max = Math.max(blue, Math.max(red, green));
                var min = Math.min(blue, Math.min(red, green));
                // ... hue
                if (max == min) {
                    c.h = 0;
                }
                else if (max == red && green >= blue) {
                    c.h = 60 * ((green - blue) / (max - min));
                }
                else if (max == red && green < blue) {
                    c.h = (60 * ((green - blue) / (max - min))) + 360;
                }
                else if (max == green) {
                    c.h = (60 * ((blue - red) / (max - min))) + 120;
                }
                else if (max == blue) {
                    c.h = (60 * ((red - green) / (max - min))) + 240;
                }
                // ... luminosity
                c.l = 0.5 * (max + min);
                // ... saturation
                if (max == min) {
                    c.s = 0;
                }
                else if (c.l <= 0.5) {
                    c.s = (max - min) / (2 * c.l);
                }
                else if (c.l > 0.5) {
                    c.s = (max - min) / (2 * (1 - c.l));
                }
                return c;
            };
            HslColor.prototype.toColor = function () {
                var q = 0;
                if (this.l < 0.5) {
                    q = this.l * (1 + this.s);
                }
                else {
                    q = this.l + this.s - (this.l * this.s);
                }
                var p = (2 * this.l) - q;
                var hk = this.h / 360;
                var r = this._getComponent(this._norm(hk + (1.0 / 3.0)), p, q);
                var g = this._getComponent(this._norm(hk), p, q);
                var b = this._getComponent(this._norm(hk - (1.0 / 3.0)), p, q);
                return charting.Color.fromRgba({
                    a: this.a,
                    r: r,
                    g: g,
                    b: b
                });
            };
            HslColor.prototype._norm = function (d) {
                if (d < 0) {
                    d += 1;
                }
                if (d > 1) {
                    d -= 1;
                }
                return d;
            };
            HslColor.prototype._getComponent = function (tc, p, q) {
                if (tc < (1.0 / 6.0)) {
                    return p + ((q - p) * 6 * tc);
                }
                if (tc < 0.5) {
                    return q;
                }
                if (tc < (2.0 / 3.0)) {
                    return p + ((q - p) * 6 * ((2.0 / 3.0) - tc));
                }
                return p;
            };
            return HslColor;
        }());
        charting.HslColor = HslColor;
    })(charting = geocortex.charting || (geocortex.charting = {}));
})(geocortex || (geocortex = {}));

/* End Script: Charting.Infrastructure/charting.infrastructure_ts_out.js ------------------------- */ 

