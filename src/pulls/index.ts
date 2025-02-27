import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { PullsClient } from '@/pulls/pulls_client'

export const listPulls = async (
  gitHubClient: GitHubClient
): Promise<PullsAnalyzer> => {
  const client = await new PullsClient(gitHubClient)
  const pulls = await client.collect()

  return new PullsAnalyzer(pulls)
}
