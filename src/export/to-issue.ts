import { OutputConfig } from '@/config/output-config'
import { ImageMergedTime } from '@/export/image'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Time } from '@/types'
import dayjs from 'dayjs'
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

export class ExportToIssue {
  public constructor(
    private gitHubClient: GitHubClient,
    private config: OutputConfig,
    private pulls: PullsAnalyzer
  ) {}

  public do = async (start: Date, end: Date): Promise<void> => {
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
    switch (this.config.lang) {
      case 'en':
        return fs.readFileSync('src/export/templates/en.mustache', 'utf-8')
      case 'ja':
        return fs.readFileSync('src/export/templates/ja.mustache', 'utf-8')
      default:
        return fs.readFileSync('src/export/templates/en.mustache', 'utf-8')
    }
  }

  private templateAttributes = (
    start: Date,
    end: Date
  ): AnalyzedTemplateAttributes => {
    const mergedPulls = this.pulls.filtedMerged(start, end)
    return {
      startDate: dayjs(start).format('YYYY/MM/DD'),
      endDate: dayjs(end).format('YYYY/MM/DD'),
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
