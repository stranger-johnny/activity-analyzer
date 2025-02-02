import { Octokit } from '@octokit/rest'
import { collectPulls } from './pulls'
import { Analyzed } from './analyzed/analyzed'

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

const octokit = new Octokit({ auth: token })

async function run(owner: string, repo: string) {
  const pulls = await collectPulls(octokit, owner, repo)

  const analyzed = new Analyzed(octokit, owner, repo, pulls)
  analyzed.convertAnalzedToIssue()
}

run('stranger-johnny', 'activity-analyzer').catch(console.error)
