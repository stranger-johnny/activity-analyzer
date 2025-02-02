import { Octokit } from '@octokit/rest'

export type GitHubClient = {
  octokit: Octokit
  owner: string
  repo: string
}

export const createGitHubClient = (
  gitHubToken: string,
  repo: string
): GitHubClient => {
  return {
    octokit: new Octokit({ auth: gitHubToken }),
    owner: repo.split('/')[0] ?? '',
    repo: repo.split('/')[1] ?? '',
  }
}
