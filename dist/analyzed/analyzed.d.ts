import { GitHubClient } from '@/octokit/github_client';
import { PullsAnalyzer } from '@/pulls/pulls_analyzer';
export declare class Analyzed {
    private gitHubClient;
    private pulls;
    constructor(gitHubClient: GitHubClient, pulls: PullsAnalyzer);
    private template;
    private templateAttributes;
    private convertToTemplate;
    convertAnalzedToIssue: () => Promise<void>;
}
