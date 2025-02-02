import { Pull } from '@/types'
import { GitHubClient } from '@/octokit/github_client'

export class PullsClient {
  constructor(private gitHubClient: GitHubClient) {}

  public async collect(): Promise<Pull[]> {
    const pulls: Pull[] = []

    let page = 1
    while (true) {
      const curratePagePulls = await this.gitHubClient.octokit.paginate(
        this.gitHubClient.octokit.rest.pulls.list,
        {
          owner: this.gitHubClient.owner,
          repo: this.gitHubClient.repo,
          state: 'all',
          per_page: 2,
          page: page,
        }
      )

      console.log(
        'page',
        page,
        'curratePagePulls:',
        curratePagePulls.map((pull) => pull.title)
      )

      if (curratePagePulls.length === 0) {
        break
      }
      pulls.push(...curratePagePulls)
      page++
    }

    return pulls
  }
}
