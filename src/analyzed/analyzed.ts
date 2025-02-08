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
    try {
      const attributes = await this.templateAttributes(start, end)
      await this.gitHubClient.octokit.issues.create({
        owner: this.gitHubClient.owner,
        repo: this.gitHubClient.repo,
        title: 'Analyzed by issue template',
        body: this.convertToTemplate(attributes),
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

  private templateAttributes = async (
    start: Date,
    end: Date
  ): Promise<AnalyzedTemplateAttributes> => {
    const mergedPulls = this.pulls.filtedMerged(start, end)
    console.log(await new ImageMergedTime(mergedPulls).imageAsBase64())
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      pulls: {
        merged: {
          count: mergedPulls.count(),
          averageTime: mergedPulls.mergedTimeAverage(),
          chart: await new ImageMergedTime(mergedPulls).imageAsBase64(),
        },
      },
    }
  }
}
