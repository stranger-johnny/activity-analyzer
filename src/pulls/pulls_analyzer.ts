import type { Pull, Time } from '@/types'
import { groupBy } from 'lodash'

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

export class MergedPullsAnalyzer extends PullsAnalyzer {
  public constructor(pulls: Pull[]) {
    super(pulls)
  }

  public mergedPullPerUser(): { user: string; pulls: Pull[] }[] {
    const grouped = groupBy(this.pulls, (pull) => pull.user?.name ?? 'unknown')
    return Object.entries(grouped).map(([user, pulls]) => ({
      user,
      pulls,
    }))
  }

  private secondsToTime(seconds: number): Time {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((seconds % (60 * 60)) / 60)
    return { days, hours, minutes }
  }

  private secondsToHour(seconds: number): number {
    return seconds / (60 * 60)
  }
}
