import { Octokit } from '@octokit/rest';
import { components } from '@octokit/openapi-types/types';
export type Pull = components['schemas']['pull-request-simple'];
export declare class PullsClient {
    private octokit;
    private owner;
    private repo;
    constructor(octokit: Octokit, owner: string, repo: string);
    collect(): Promise<Pull[]>;
}
export declare class Pulls {
    private pulls;
    constructor(pulls: Pull[]);
    filter(start: Date, end: Date): Pulls;
}
