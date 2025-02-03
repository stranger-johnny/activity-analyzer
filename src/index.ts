import { getInput } from '@actions/core'
import { listPulls } from '@/pulls'
import { Analyzed } from '@/analyzed/analyzed'
import { createGitHubClient } from '@/octokit/github_client'
import { loadInput } from '@/config/config'

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

console.log(process.env.GITHUB_WORKSPACE)

async function run() {
  console.log(await loadInput(configPath))
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
