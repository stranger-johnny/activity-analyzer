import { Analyzed } from '@/analyzed/analyzed'
import { createGitHubClient } from '@/octokit/github_client'
import { listPulls } from '@/pulls'
import { getInput } from '@actions/core'

const repo = getInput('repo', { required: true })
if (!repo) {
  console.error('repo is required')
  process.exit(1)
}

const token = getInput('token', { required: true })
if (!token) {
  console.error('token is required')
  process.exit(1)
}

const configPath = getInput('config_path', { required: true })
if (!configPath) {
  console.error('config path is required')
  process.exit(1)
}

async function run() {
  const client = createGitHubClient(token!, repo!)
  const pulls = await listPulls(client)

  const analyzed = new Analyzed(client, pulls)
  analyzed.toIssue(new Date('2025-01-01'), new Date('2025-12-31'))
}

try {
  run()
} catch (error) {
  console.error(error)
}
