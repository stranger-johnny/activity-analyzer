import { CollectPullsResponse } from '@/pulls';
import { GitHubClient } from '@/octokit/github_client';
export declare class Analyzed {
    private gitHubClient;
    private pulls;
    constructor(gitHubClient: GitHubClient, pulls: CollectPullsResponse);
    private template;
    private templateAttributes;
    private convertToTemplate;
    convertAnalzedToIssue: () => Promise<void>;
}
