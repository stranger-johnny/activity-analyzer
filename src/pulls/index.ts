import { Octokit } from '@octokit/rest'
import exp from 'constants'
import { Pull, PullsClient } from './pulls_model'

export const collectPulls = async (
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<Pull[]> => {
  const client = await new PullsClient(octokit, owner, repo)
  const pulls = await client.collect()
  return pulls
}
