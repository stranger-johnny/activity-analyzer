import { Octokit } from '@octokit/rest'
import { listPulls } from './pulls'
import { Analyzed } from './analyzed/analyzed'
import { createGitHubClient } from './octokit/github_client'

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

const octokit = new Octokit({ auth: token })

async function run(owner: string, repo: string) {
  const client = createGitHubClient(token!, owner, repo)
  const pulls = await listPulls(client)

  const analyzed = new Analyzed(client, pulls)
  analyzed.convertAnalzedToIssue()
}

run('stranger-johnny', 'activity-analyzer').catch(console.error)
