import type { Pull, Time } from '@/types';
export declare class PullsAnalyzer {
    protected pulls: Pull[];
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filtedMerged(start: Date, end: Date): MergedPullsAnalyzer;
}
export declare class MergedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls: Pull[]);
    private pullsWithMergeTime;
    mergedTimeAverage(): Time;
    mergedTimesPerPull(): {
        number: `#${number}`;
        hours: number;
    }[];
    private secondsToTime;
    private secondsToHour;
}
