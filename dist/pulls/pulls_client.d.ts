import { GitHubClient } from '@/octokit/github_client';
import { Pull } from '@/types';
export declare class PullsClient {
    private gitHubClient;
    constructor(gitHubClient: GitHubClient);
    collect(): Promise<Pull[]>;
}
