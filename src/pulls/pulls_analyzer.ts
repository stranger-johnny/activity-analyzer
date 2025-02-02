import type { Pull } from '@/types'
import { sumBy } from 'lodash'

export class PullsAnalyzer {
  constructor(private pulls: Pull[]) {}

  public values(): Pull[] {
    return this.pulls
  }

  public count(): number {
    return this.pulls.length
  }

  public filter(start: Date, end: Date): PullsAnalyzer {
    const filtered = this.pulls.filter((pull) => {
      const createdAt = new Date(pull.created_at)
      if (createdAt >= start && createdAt <= end) {
        return true
      }
      if (pull.closed_at) {
        const closedAt = new Date(pull.closed_at)
        return closedAt >= start && closedAt <= end
      }
      return false
    })
    return new PullsAnalyzer(filtered)
  }

  public closed(start: Date, end: Date): PullsAnalyzer {
    const filtered = this.pulls.filter((pull) => {
      if (!pull.closed_at) return false
      const closedAt = new Date(pull.closed_at)
      return closedAt >= start && closedAt <= end
    })
    return new PullsAnalyzer(filtered)
  }

  public closedWithinThePeriod(start: Date, end: Date): Pull[] {
    return this.pulls.filter((pull) => {
      if (!pull.closed_at) return false
      const closedAt = new Date(pull.closed_at)
      return closedAt >= start && closedAt <= end
    })
  }

  public closedAverage(
    start: Date,
    end: Date
  ): { days: number; hours: number; minutes: number } {
    const closed = this.closed(start, end)
    const totalClosedTime = sumBy(closed.values(), (pull) => {
      return (
        new Date(pull.closed_at!).getTime() -
        new Date(pull.created_at).getTime()
      )
    })
    const avarageAsSeconds = totalClosedTime / closed.count()

    const days = Math.floor(avarageAsSeconds / (24 * 60 * 60))
    const hours = Math.floor((avarageAsSeconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((avarageAsSeconds % (60 * 60)) / 60)
    return { days, hours, minutes }
  }
}
