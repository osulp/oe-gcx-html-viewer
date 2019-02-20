/**
 * Represents a parameter in a print template.
 */
export interface PrintParameter {
    name: string;
    containsMultipleValues?: boolean;
    containsSingleValue?: boolean;
    description?: string;
    item?: any;
    itemData?: any;
    purpose?: string;
    value?: any;
    values?: any;
    valueType?: string;
    visible?: boolean;
}
/**
 * The parameters associated with a print template.
 */
export interface PrintMetadata {
    /**
     * The PrintParameters associated with a print template.
     */
    parameters: PrintParameter[];
    /**
     * Metadata about the controls of a print template.
     */
    controls: ControlProperties[];
}
/**
 * Represents control metadata that may be of interest to a client.
 */
export interface ControlProperties {
    /**
     * The type of control this metadata describes.
     */
    controlType: string;
    /**
     * The context of information about a control (eg MainMap.Height).
     * Used by a client application to infer the use/purpose of the parameter.
     */
    purpose: string;
    /**
     * The height of the control in millimeters.
     */
    height: number;
    /**
     * The width of the control in millimeters.
     */
    width: number;
}
/**
 * Marshals control metadata into ControlProperties.
 * @param controls The source of control metadata.
 */
export declare function MarshalControlProperties(controls: any[]): ControlProperties[];
