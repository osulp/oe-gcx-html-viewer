// Type definitions for the time slider rest endpoint
// {siteUri}/map/timesliders

/** @docs-hide-from-nav */
interface RestTimeSlider {
    id: string;
    displayName: string;
    description: string;
    mode: string;
    displayFormat: string;
    startTime: string;
    endTime: string;
    initialStartTime: string;
    initialEndTime: string;
    timeInterval: number;
    timeIntervalUnit: string;
    snapToTimeIntervals: boolean;
    extensions: RestExtension[];
    properties: RestProperty[];
}
