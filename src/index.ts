import { Octokit } from '@octokit/rest'

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN is required')
  process.exit(1)
}

const octokit = new Octokit({ auth: token })

async function getPrsAverageTime(owner: string, repo: string) {
  const now = new Date()
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(now.getDate() - 7)

  const prs = await octokit.paginate(octokit.rest.pulls.list, {
    owner,
    repo,
    state: 'closed',
    per_page: 100,
  })

  const filteredPrs = prs.filter((pr) => {
    const createdAt = new Date(pr.created_at)
    return createdAt >= oneWeekAgo && pr.closed_at
  })

  if (filteredPrs.length === 0) {
    console.log('No PRs closed in the last week.')
    return
  }

  const totalTime = filteredPrs.reduce((acc, pr) => {
    const createdAt = new Date(pr.created_at).getTime()
    const closedAt = new Date(pr.closed_at!).getTime()
    return acc + (closedAt - createdAt)
  }, 0)

  const averageTimeMs = totalTime / filteredPrs.length
  const averageTimeHours = averageTimeMs / (1000 * 60 * 60)

  console.log(`Average PR open time: ${averageTimeHours.toFixed(2)} hours`)
}

getPrsAverageTime('your-org', 'your-repo').catch(console.error)
