import type { Pull } from '@/types';
export declare class PullsAnalyzer {
    private pulls;
    constructor(pulls: Pull[]);
    values(): Pull[];
    count(): number;
    filter(start: Date, end: Date): PullsAnalyzer;
    closedWithinThePeriod(start: Date, end: Date): Pull[];
}
