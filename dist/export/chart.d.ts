import { MergedPullsAnalyzer } from '@/pulls/pulls_analyzer';
export declare class MergedPerUserChart {
    private pulls;
    constructor(pulls: MergedPullsAnalyzer);
    asMarmaidContents: () => string;
}
