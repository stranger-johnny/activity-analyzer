import { Octokit } from '@octokit/rest'

export type GitHubClient = {
  octokit: Octokit
  owner: string
  repo: string
}

export const createGitHubClient = (
  gitHubToken: string,
  owner: string,
  repo: string
): GitHubClient => {
  return {
    octokit: new Octokit({ auth: gitHubToken }),
    owner,
    repo,
  }
}
