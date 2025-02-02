import { Octokit } from '@octokit/rest';
import { Pull } from './pulls_model';
export declare const collectPulls: (octokit: Octokit, owner: string, repo: string) => Promise<Pull[]>;
