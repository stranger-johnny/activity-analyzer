import { CollectPullsResponse } from '@/pulls';
import { Octokit } from '@octokit/rest';
export declare class Analyzed {
    private octokit;
    private owner;
    private repo;
    private pulls;
    constructor(octokit: Octokit, owner: string, repo: string, pulls: CollectPullsResponse);
    private template;
    private templateAttributes;
    private convertToTemplate;
    convertAnalzedToIssue: () => Promise<void>;
}
