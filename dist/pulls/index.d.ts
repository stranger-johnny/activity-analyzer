import { PullsAnalyzer } from '@/pulls/pulls_analyzer';
import { GitHubClient } from '@/octokit/github_client';
export declare const listPulls: (gitHubClient: GitHubClient) => Promise<PullsAnalyzer>;
