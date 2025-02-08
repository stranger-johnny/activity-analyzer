import { loadInput } from '@/config/output_config'
import { ExportToIssue } from '@/export/to_issue'
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
  const config = await loadInput(configPath)

  const client = createGitHubClient(token!, repo!)
  const pulls = await listPulls(client)

  const exportToIssue = new ExportToIssue(client, config, pulls)
  await exportToIssue.do()
}

;(async () => await run())()
