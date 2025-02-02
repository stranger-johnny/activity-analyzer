import { listPulls } from '@/pulls'
import { Analyzed } from '@/analyzed/analyzed'
import { createGitHubClient } from '@/octokit/github_client'

const repo = process.env.GITHUB_REPOSITORY
if (!repo) {
  console.error('GITHUB_REPOSITORY is required')
  process.exit(1)
}

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

async function run() {
  const client = createGitHubClient(token!, repo!)
  const pulls = await listPulls(client)

  const analyzed = new Analyzed(client, pulls)
  analyzed.convertAnalzedToIssue(new Date('2025-01-01'), new Date('2025-12-31'))
}

try {
  run()
} catch (error) {
  console.error(error)
}
