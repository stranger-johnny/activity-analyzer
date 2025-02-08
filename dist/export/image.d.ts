import { MergedPullsAnalyzer } from '@/pulls/pulls_analyzer';
export declare class ImageMergedTime {
    private pulls;
    constructor(pulls: MergedPullsAnalyzer);
    asMarmaidContents: () => string;
}
