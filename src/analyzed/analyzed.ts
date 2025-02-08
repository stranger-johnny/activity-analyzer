import { ImageMergedTime } from '@/analyzed/image'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Time } from '@/types'
import * as fs from 'fs'
import * as Mustache from 'mustache'

type AnalyzedTemplateAttributes = {
  startDate: string
  endDate: string
  pulls: {
    merged: {
      count: number
      averageTime: Time
      chart: string
    }
  }
}

export class Analyzed {
  public constructor(
    private gitHubClient: GitHubClient,
    private pulls: PullsAnalyzer
  ) {}

  public toIssue = async (start: Date, end: Date): Promise<void> => {
    await this.gitHubClient.octokit.issues.create({
      owner: this.gitHubClient.owner,
      repo: this.gitHubClient.repo,
      title: 'Analyzed by issue template',
      body: this.convertToTemplate(this.templateAttributes(start, end)),
    })
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
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      pulls: {
        merged: {
          count: mergedPulls.count(),
          averageTime: mergedPulls.mergedTimeAverage(),
          chart: new ImageMergedTime(mergedPulls).asMarmaidContents(),
        },
      },
    }
  }
}
