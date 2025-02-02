import type { Pull } from '@/types'
import { sumBy } from 'lodash'

export class PullsAnalyzer {
  constructor(protected pulls: Pull[]) {}

  public values(): Pull[] {
    return this.pulls
  }

  public count(): number {
    return this.pulls.length
  }

  public filtedClosed(start: Date, end: Date): ClosedPullsAnalyzer {
    const filtered = this.pulls.filter((pull) => {
      if (!pull.closed_at) return false
      const closedAt = new Date(pull.closed_at)
      return closedAt >= start && closedAt <= end
    })
    return new ClosedPullsAnalyzer(filtered)
  }
}

class ClosedPullsAnalyzer extends PullsAnalyzer {
  public constructor(pulls: Pull[]) {
    super(pulls)
  }

  public closedTimeAverage(): { days: number; hours: number; minutes: number } {
    const totalClosedTime = sumBy(this.pulls, (pull) => {
      return (
        new Date(pull.closed_at!).getTime() -
        new Date(pull.created_at).getTime()
      )
    })
    const avarageAsSeconds = totalClosedTime / this.pulls.length

    const days = Math.floor(avarageAsSeconds / (24 * 60 * 60))
    const hours = Math.floor((avarageAsSeconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((avarageAsSeconds % (60 * 60)) / 60)
    return { days, hours, minutes }
  }
}
