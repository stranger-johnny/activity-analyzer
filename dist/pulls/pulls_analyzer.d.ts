import type { Pull } from '@/types';
export declare class PullsAnalyzer {
    private pulls;
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filter(start: Date, end: Date): PullsAnalyzer;
    closed(start: Date, end: Date): PullsAnalyzer;
    closedWithinThePeriod(start: Date, end: Date): Pull[];
    closedAverage(start: Date, end: Date): {
        days: number;
        hours: number;
        minutes: number;
    };
}
