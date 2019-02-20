/**
 * Specifies a length of time to wait (the interval)
 * and the number of cycles to wait for this interval.
 */
export interface IntervalArgs {
    interval: number;
    cycles?: number;
}
/**
 * Provides a number of increasing value according to a prescribed schedule.
 */
export declare class PollSchedule {
    private _cycles;
    private _scheduleSlot;
    private readonly _schedule;
    private readonly _defaultSchedule;
    constructor(args?: IntervalArgs[]);
    /**
     * Returns a number of increasing value according to a schedule.
     */
    interval(): number;
    private _buildSchedule;
}
