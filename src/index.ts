import { Octokit } from '@octokit/rest'
import { collectPulls } from './pulls'

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

const octokit = new Octokit({ auth: token })

async function getPrsAverageTime(owner: string, repo: string) {
  const pulls = await collectPulls(octokit, owner, repo)
  console.log(pulls.values)

  console.log('closed pulls', pulls.closed)
}

getPrsAverageTime('stranger-johnny', 'activity-analyzer').catch(console.error)
