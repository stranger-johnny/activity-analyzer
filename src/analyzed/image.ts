import { MergedPullsAnalyzer } from '@/pulls/pulls_analyzer'

export class ImageMergedTime {
  public constructor(private pulls: MergedPullsAnalyzer) {}

  public asMarmaidContents = (): string => {
    const mergedTimesPerPull = this.pulls.mergedTimesPerPull()
    const xaxis = mergedTimesPerPull.map((pull) => pull.number).join(',')
    const bars = mergedTimesPerPull.map((pull) => pull.hours).join(',')
    return `
    xychart-beta
        x-axis "PR" [${{ xaxis }}]
        y-axis "PR Merge Time (hour)"
        bar [${bars}]
    `
  }
}
