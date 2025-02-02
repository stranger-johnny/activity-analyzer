import { Pull } from '@/types';
import { GitHubClient } from '@/octokit/github_client';
export declare class PullsClient {
    private gitHubClient;
    constructor(gitHubClient: GitHubClient);
    collect(): Promise<Pull[]>;
}
