import { GitHubClient } from '@/octokit/github_client';
import { PullsAnalyzer } from '@/pulls/pulls_analyzer';
export declare const listPulls: (gitHubClient: GitHubClient) => Promise<PullsAnalyzer>;
