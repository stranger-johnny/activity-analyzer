import { Octokit } from '@octokit/rest'
import { components } from '@octokit/openapi-types/types'

export type Pull = components['schemas']['pull-request-simple']

export class PullsClient {
  constructor(
    private octokit: Octokit,
    private owner: string,
    private repo: string
  ) {}

  public async collect(): Promise<Pull[]> {
    const now = new Date()
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(now.getDate() - 7)

    return await this.octokit.paginate(this.octokit.rest.pulls.list, {
      owner: this.owner,
      repo: this.repo,
      state: 'all',
      per_page: 100,
    })
  }
}

export class Pulls {
  constructor(private pulls: Pull[]) {}

  public filter(start: Date, end: Date): Pulls {
    const filtered = this.pulls.filter((pull) => {
      const createdAt = new Date(pull.created_at)
      if (createdAt >= start && createdAt <= end) {
        return true
      }
      if (pull.closed_at) {
        const closedAt = new Date(pull.closed_at)
        return closedAt >= start && closedAt <= end
      }
      return false
    })
    return new Pulls(filtered)
  }
}
