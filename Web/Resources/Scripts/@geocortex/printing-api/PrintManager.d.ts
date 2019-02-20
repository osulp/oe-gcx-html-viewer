import { PrintMetadata, PrintParameter } from "./PrintMetadata";
/**
 * The arguments used to run a print report.
 */
export interface RunPrintArgs {
    /**
     * The selected resolution (dpi).
     */
    dpi: number;
    /**
     * The print parameters.
     */
    parameters?: PrintParameter[];
}
/**
 * Handles interaction with Geocortex Printing 5 service endpoints.
 */
export declare namespace PrintManager {
    /**
     * Runs a print report.
     * @param url The URL to the print template.
     * @param args The RunPrintArgs required for printing.
     * @param token An optional token for accessing a secured print template.
     */
    function runPrint(url: string, args: RunPrintArgs, token?: string): Promise<string>;
    /**
     * Retrieves print template metadata.
     * @param url The URL to the print template.
     * @param token A token for accessing the print template.
     */
    function describeTemplate(url: string, token?: string): Promise<PrintMetadata>;
}
