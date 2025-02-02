import type { Pull } from '@/types';
export declare class PullsAnalyzer {
    protected pulls: Pull[];
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filtedClosed(start: Date, end: Date): ClosedPullsAnalyzer;
}
declare class ClosedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls: Pull[]);
    closedTimeAverage(): {
        days: number;
        hours: number;
        minutes: number;
    };
}
export {};
