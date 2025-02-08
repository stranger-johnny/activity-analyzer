import { OutputConfig } from '@/config/output-config'
import { MergedTimeChart } from '@/export/chart'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Time } from '@/types'
import dayjs from 'dayjs'
import { readFileSync } from 'fs'
import { render } from 'mustache'

type AnalyzedTemplateAttributes = {
  start: string
  end: string
  pulls: {
    merged: {
      current: {
        count: number
        averageTime: Time
        chart: string
      }
      previous: {
        count: number
        averageTime: Time
        chart: string
      }
    }
  }
}

export class ExportToIssue {
  public constructor(
    private gitHubClient: GitHubClient,
    private config: OutputConfig,
    private pulls: PullsAnalyzer
  ) {}

  public do = async (): Promise<void> => {
    await this.gitHubClient.octokit.issues.create({
      owner: this.gitHubClient.owner,
      repo: this.gitHubClient.repo,
      title: 'Analyzed by issue template',
      body: this.convertToTemplate(this.templateAttributes()),
    })
  }

  private convertToTemplate = (
    attributes: AnalyzedTemplateAttributes
  ): string => {
    return render(this.template(), attributes)
  }

  private template = (): string => {
    switch (this.config.lang) {
      case 'en':
        return readFileSync('src/export/templates/en.mustache', 'utf-8')
      case 'ja':
        return readFileSync('src/export/templates/ja.mustache', 'utf-8')
      default:
        return readFileSync('src/export/templates/en.mustache', 'utf-8')
    }
  }

  private templateAttributes = (): AnalyzedTemplateAttributes => {
    const currentPeriodPulls = (() => {
      const mergedPulls = this.pulls.filtedMerged(
        this.config.current.start,
        this.config.current.end
      )
      return {
        count: mergedPulls.count(),
        averageTime: mergedPulls.mergedTimeAverage(),
        chart: new MergedTimeChart(mergedPulls).asMarmaidContents(),
      }
    })()
    const previousPeriodPulls = (() => {
      const mergedPulls = this.pulls.filtedMerged(
        this.config.previous.start,
        this.config.previous.end
      )
      return {
        count: mergedPulls.count(),
        averageTime: mergedPulls.mergedTimeAverage(),
        chart: new MergedTimeChart(mergedPulls).asMarmaidContents(),
      }
    })()
    return {
      start: dayjs(this.config.current.start).format('YYYY/MM/DD'),
      end: dayjs(this.config.current.end).format('YYYY/MM/DD'),
      pulls: {
        merged: {
          current: { ...currentPeriodPulls },
          previous: { ...previousPeriodPulls },
        },
      },
    }
  }
}
