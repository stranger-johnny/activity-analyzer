import { listPulls } from '@/pulls'
import { Analyzed } from '@/analyzed/analyzed'
import { createGitHubClient } from '@/octokit/github_client'

const owner = process.env.GITHUB_OWNER
if (!owner) {
  console.error('GITHUB_OWNER is required')
  process.exit(1)
}

const repo = process.env.GitHUB_REPO
if (!repo) {
  console.error('GitHUB_REPO is required')
  process.exit(1)
}

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

async function run() {
  const client = createGitHubClient(token!, owner!, repo!)
  const pulls = await listPulls(client)

  const analyzed = new Analyzed(client, pulls)
  analyzed.convertAnalzedToIssue()
}

try {
  run()
} catch (error) {
  console.error(error)
}
