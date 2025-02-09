import { GitHubClient } from '@/octokit/github_client'
import { Pull } from '@/types'

export class PullsClient {
  constructor(private gitHubClient: GitHubClient) {}

  public async collect(): Promise<Pull[]> {
    return await this.gitHubClient.octokit.paginate(
      this.gitHubClient.octokit.rest.pulls.list,
      {
        owner: this.gitHubClient.owner,
        repo: this.gitHubClient.repo,
        state: 'all',
        per_page: 100,
      }
    )
  }
}
