/**
 * A Camera defines the position, tilt and heading of the point
 * from which a 3-D view's visible extent is observed.
 */
export interface Camera {
    /**
     * The field of view of the camera in degrees.
     */
    fov: number;
    /**
     * The compass heading of the camera in degrees.
     */
    heading: number;
    /**
     * The position of the camera defined by a point.
     */
    position: Point;
    /**
     * The tilt of the camera in degrees with respect to the
     * surface as projected down from the camera position.
     */
    tilt: number;
}
/**
 * The minimum and maximum X and Y coordinates of a bounding box.
 */
export interface Envelope {
    /**
     * The top-left X-coordinate of an extent envelope.
     */
    xmin: number;
    /**
     * The bottom-right X-coordinate of an extent envelope.
     */
    xmax: number;
    /**
     * The bottom-left Y-coordinate of an extent envelope.
     */
    ymin: number;
    /**
     * The top-right Y-coordinate of an extent envelope.
     */
    ymax: number;
    /**
     * The spatial reference.
     */
    spatialReference: SpatialReference;
}
/**
 * Represents a point in 3-D space.
 */
export interface Point {
    /**
     * The x-coordinate.
     */
    x: number;
    /**
     * The y-coordinate.
     */
    y: number;
    /**
     * The z-coordinate.
     */
    z?: number;
    /**
     * The spatial reference.
     */
    spatialReference?: SpatialReference;
}
/**
 * Represents a spatial reference.
 */
export interface SpatialReference {
    /**
     * The well-known ID (WKID) of the coordinate system.
     */
    wkid?: number;
    /**
     * The well-known text (WKT) of the coordinate system.
     */
    wkt?: string;
}
/**
 * Describes a 2-D or 3-D point of view.
 */
export interface Viewpoint {
    /**
     * The target geometry framed by the viewpoint.
     */
    targetGeometry: Point | Envelope;
    /**
     * The viewpoint's Camera (3-D only).
     */
    camera?: Camera;
    /**
     * The rotation in degrees relative to true north.
     */
    rotation?: number;
    /**
     * The scale of the viewpoint.
     */
    scale?: number;
}
