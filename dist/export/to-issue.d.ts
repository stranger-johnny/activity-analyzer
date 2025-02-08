import { OutputConfig } from '@/config/output-config';
import { GitHubClient } from '@/octokit/github_client';
import { PullsAnalyzer } from '@/pulls/pulls_analyzer';
export declare class ExportToIssue {
    private gitHubClient;
    private config;
    private pulls;
    constructor(gitHubClient: GitHubClient, config: OutputConfig, pulls: PullsAnalyzer);
    do: () => Promise<void>;
    private convertToTemplate;
    private template;
    private templateAttributes;
}
