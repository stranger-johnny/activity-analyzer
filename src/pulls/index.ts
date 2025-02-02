import { Octokit } from '@octokit/rest'
import { PullsClient } from '@/pulls/pulls_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Pull } from '@/types'

export type CollectPullsResponse = {
  values: Pull[]
  closed: Pull[]
}

export const collectPulls = async (
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<CollectPullsResponse> => {
  const client = await new PullsClient(octokit, owner, repo)
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
