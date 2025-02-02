import type { Pull, Time } from '@/types'
import { close } from 'fs'
import { sumBy, sortBy } from 'lodash'

export class PullsAnalyzer {
  constructor(protected pulls: Pull[]) {}

  public values(): Pull[] {
    return this.pulls
  }

  public count(): number {
    return this.pulls.length
  }

  public filtedMerged(start: Date, end: Date): MergedPullsAnalyzer {
    const filtered = this.pulls.filter((pull) => {
      if (!pull.merged_at) return false
      const mergedAt = new Date(pull.merged_at)
      return mergedAt >= start && mergedAt <= end
    })
    return new MergedPullsAnalyzer(filtered)
  }
}

class MergedPullsAnalyzer extends PullsAnalyzer {
  public constructor(pulls: Pull[]) {
    super(pulls)
  }

  public mergedTimeAverage(): Time {
    const sumTime = sumBy(this.pulls, (pull) => {
      const mergedAt = new Date(pull.merged_at!).getTime()
      const createdAt = new Date(pull.created_at).getTime()
      const diff = mergedAt - createdAt
      return Math.floor(diff / 1000)
    })
    return this.secondsToTime(sumTime / this.pulls.length)
  }

  private secondsToTime(seconds: number): Time {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((seconds % (60 * 60)) / 60)
    return { days, hours, minutes }
  }
}
