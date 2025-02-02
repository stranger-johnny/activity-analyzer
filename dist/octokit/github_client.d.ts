import { Octokit } from '@octokit/rest';
export type GitHubClient = {
    octokit: Octokit;
    owner: string;
    repo: string;
};
export declare const createGitHubClient: (gitHubToken: string, owner: string, repo: string) => GitHubClient;
