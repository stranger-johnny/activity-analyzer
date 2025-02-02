import { PullsClient } from '@/pulls/pulls_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Pull } from '@/types'
import { GitHubClient } from '@/octokit/github_client'

export type CollectPullsResponse = {
  values: Pull[]
  closed: Pull[]
}

export const listPulls = async (
  gitHubClient: GitHubClient
): Promise<CollectPullsResponse> => {
  const client = await new PullsClient(gitHubClient)
  const pulls = await client.collect()

  const analyzer = new PullsAnalyzer(pulls)

  return {
    values: pulls,
    closed: analyzer.closedWithinThePeriod(
      new Date(2025, 1, 1),
      new Date(2025, 3, 2)
    ),
  }
}
