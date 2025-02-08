import { MergedPullsAnalyzer } from '@/pulls/pulls_analyzer'

export class MergedPerUserChart {
  public constructor(private pulls: MergedPullsAnalyzer) {}

  public asMarmaidContents = (): string => {
    const mergedPullPerUser = this.pulls.mergedPullPerUser()
    const xaxis = mergedPullPerUser.map((pull) => pull.user).join(',')
    const bars = mergedPullPerUser.map((pull) => pull.pulls.length).join(',')
    return `
    xychart-beta
        x-axis "User" [${xaxis}]
        y-axis "Number of Merge PRs"
        bar [${bars}]
    `
  }
}
