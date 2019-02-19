/// <reference path="./../../_Definitions/Framework.AMD.d.ts" />
/// <reference path="./../../_Definitions/Charting.Infrastructure.AMD.d.ts"/>

import { ChartPointAdapterOptions } from "geocortex/charting/infrastructure/ChartPointAdapterInterface";
import { ChartPointAdapterBase } from "geocortex/charting/infrastructure/ChartPointAdapterBase";
import { ChartPoint } from "geocortex/charting/infrastructure/ChartPoint";
import { ChartFieldDefinition } from "geocortex/charting/infrastructure/configuration/ChartFieldDefinition";
import { ChartFeatureType, ChartType, ChartFieldSourceType } from "geocortex/charting/infrastructure/Enums";
import { ChartUtils } from "geocortex/charting/infrastructure/ChartUtils";
import { ChartPointCollection } from "geocortex/charting/infrastructure/ChartPointCollection";

export class OE_ChartPointJsonAdapter extends ChartPointAdapterBase {

    /**
    * Gets the value that corresponds to the supplied field in the data source.
    */
    getFieldValue(fieldDefinition: ChartFieldDefinition, sourceItem: any, userState?: any): any {
        // Ensure we are dealing with the correct source type.
        if (!fieldDefinition || fieldDefinition.sourceType != (<any>ChartFieldSourceType).Json) {
            return null;
        }

        // Lookup the value in the supplied JSON object.  For example, if the field name is "year", return the value of sourceItem.year.
        if (sourceItem && (<Object>sourceItem).hasOwnProperty(fieldDefinition.name)) {
            return sourceItem[fieldDefinition.name];
        }

        // No value found
        return null;
    }

    /**
     * Creates a ChartPoint instance from the provided source data item.
     */
    createChartPoint(sourceItem: any, options?: ChartPointAdapterOptions, userState?: any): ChartPoint {
        if (!options || !options.chartCategory || !options.chartSeries) {
            return null;
        }
        if (options.chartType == null || typeof options.chartType === "undefined") {
            options.chartType = ChartType.Linear;
        }

        let seriesFieldValue = this.getFieldValue(options.chartSeries.field, sourceItem, userState);
        let categoryFieldValue = null;

        // If a category has been set, then try and grab the field value. Pie charts have no category (x-axis).
        if (options.chartType == ChartType.Linear) {
            categoryFieldValue = ChartUtils.tryGetFieldValue(options.chartCategory.field, sourceItem, userState);
        }

        // Call base class helper method to create a chart point. Pass in the values for the series (y-axis) and category (x-axis).
        return this.createChartPointCore(sourceItem, options.chartSeries.title, seriesFieldValue, categoryFieldValue, options, userState);
    }

    /**
     * Adds ChartPoint items to the collection to match those in the data source.
     */
    fill(collection: ChartPointCollection, source: any, options?: ChartPointAdapterOptions): void {
        if (!options || !options.chartCategory || !options.chartSeries) {
            return;
        }
        if (!source || !(source instanceof Array)) {
            return;
        }

        let sourceArray = <any[]>source;

        // Initialize with an empty collection if needed.
        if (!collection) {
            collection = new ChartPointCollection();
        }

        for (let item of sourceArray) {

            // Convert raw source data into ChartPoints that can be plotted on a chart.
            let chartPoint = this.createChartPoint(item, options);
            if (chartPoint) {
                collection.items.push(chartPoint);
            }
        }
    }

}

(<any>geocortex).charting.ChartFieldSourceType[100] = "Json";
(<any>geocortex).charting.ChartFieldSourceType["Json"] = 100;