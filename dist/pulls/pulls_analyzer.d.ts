import type { Pull } from '@/types';
export declare class PullsAnalyzer {
    protected pulls: Pull[];
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filtedMerged(start: Date, end: Date): MergedPullsAnalyzer;
}
export declare class MergedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls: Pull[]);
    mergedPullPerUser(): {
        user: string;
        pulls: Pull[];
    }[];
    private secondsToTime;
    private secondsToHour;
}
