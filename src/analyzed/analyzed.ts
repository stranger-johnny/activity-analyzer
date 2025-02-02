import * as Mustache from 'mustache'
import * as fs from 'fs'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Pull, Time } from '@/types'

type AnalyzedTemplateAttributes = {
  startDate: string
  endDate: string
  pulls: {
    merged: {
      count: number
      averageTime: Time
      chart: { xaxis: `[${string}]`; bars: `[${string}]` }
    }
  }
}

export class Analyzed {
  public constructor(
    private gitHubClient: GitHubClient,
    private pulls: PullsAnalyzer
  ) {}

  public toIssue = async (start: Date, end: Date): Promise<void> => {
    try {
      await this.gitHubClient.octokit.issues.create({
        owner: this.gitHubClient.owner,
        repo: this.gitHubClient.repo,
        title: 'Analyzed by issue template',
        body: this.convertToTemplate(this.templateAttributes(start, end)),
      })
    } catch (error) {
      console.error('failed to create issue', error)
    }
  }

  private convertToTemplate = (
    attributes: AnalyzedTemplateAttributes
  ): string => {
    return Mustache.render(this.template(), attributes)
  }

  private template = (): string => {
    return fs.readFileSync('src/analyzed/templates/ja.mustache', 'utf-8')
  }

  private templateAttributes = (
    start: Date,
    end: Date
  ): AnalyzedTemplateAttributes => {
    const mergedPulls = this.pulls.filtedMerged(start, end)
    const mergedTime = mergedPulls.mergedTimesPerPull()
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      pulls: {
        merged: {
          count: mergedPulls.count(),
          averageTime: mergedPulls.mergedTimeAverage(),
          chart: {
            xaxis: `[${mergedTime.map((pull) => pull.number).join(',')}]`,
            bars: `[${mergedTime.map((pull) => pull.hours).join(',')}]`,
          },
        },
      },
    }
  }
}
