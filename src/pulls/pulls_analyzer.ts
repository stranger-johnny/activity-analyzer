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

  private pullsWithMergeTime(): (Pull & { minutesNeedToMerge: number })[] {
    const pulls = this.pulls.map((pull) => {
      const mergedAt = new Date(pull.merged_at!).getTime()
      const createdAt = new Date(pull.created_at).getTime()
      const diff = mergedAt - createdAt
      return { ...pull, minutesNeedToMerge: Math.floor(diff / 1000) }
    })
    return pulls.sort((a, b) => a.minutesNeedToMerge - b.minutesNeedToMerge)
  }

  public mergedTimeAverage(): Time {
    const sumTime = sumBy(this.pullsWithMergeTime(), (pull) => {
      return pull.minutesNeedToMerge
    })
    return this.secondsToTime(sumTime / this.pulls.length)
  }

  public mergedTimesPerPull(): { number: `#${number}`; hours: number }[] {
    return this.pullsWithMergeTime().map((pull) => {
      return {
        number: `#${pull.number}`,
        hours: this.secondsToHour(pull.minutesNeedToMerge),
      }
    })
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
