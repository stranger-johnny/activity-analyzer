import { Pull } from '@/types';
import { GitHubClient } from '@/octokit/github_client';
export type CollectPullsResponse = {
    values: Pull[];
    closed: Pull[];
};
export declare const listPulls: (gitHubClient: GitHubClient) => Promise<CollectPullsResponse>;
