import type { Pull } from '@/types'

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

  public closedWithinThePeriod(start: Date, end: Date): Pull[] {
    return this.pulls.filter((pull) => {
      if (!pull.closed_at) return false
      const closedAt = new Date(pull.closed_at)
      return closedAt >= start && closedAt <= end
    })
  }
}
