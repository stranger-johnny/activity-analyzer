import type { Pull, Time } from '@/types';
export declare class PullsAnalyzer {
    protected pulls: Pull[];
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filtedMerged(start: Date, end: Date): MergedPullsAnalyzer;
}
declare class MergedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls: Pull[]);
    mergedTimeAverage(): Time;
    private secondsToTime;
}
export {};
