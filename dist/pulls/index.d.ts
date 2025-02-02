import { Octokit } from '@octokit/rest';
import { Pull } from '@/types';
type CollectPullsResponse = {
    values: Pull[];
    closed: Pull[];
};
export declare const collectPulls: (octokit: Octokit, owner: string, repo: string) => Promise<CollectPullsResponse>;
export {};
