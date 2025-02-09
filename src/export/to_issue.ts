import { OutputConfig } from '@/config/output_config'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import dayjs from 'dayjs'
import { readFileSync } from 'fs'
import { render } from 'mustache'

type AnalyzedTemplateAttributes = {
  current: {
    start: string
    end: string
  }
  previous: {
    start: string
    end: string
  }
  pulls: {
    merged: {
      current: {
        count: number
        perUser: {
          avator: string
          name: string
          count: number
          links: { index: number; url: string }[]
        }[]
      }
      previous: {
        count: number
        perUser: {
          avator: string
          name: string
          count: number
          links: { index: number; url: string }[]
        }[]
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
    console.log(this.templateAttributes())
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
    const currentPulls = (() => {
      const mergedPulls = this.pulls.filtedMerged(
        this.config.current.start,
        this.config.current.end
      )
      const perUser = mergedPulls.mergedPullPerUser()
      return {
        count: mergedPulls.count(),
        perUser: perUser.map((user) => ({
          avator: user.user.avator,
          name: user.user.name,
          count: user.pulls.length,
          links: user.pulls.map((pull, i) => {
            return {
              index: i + 1,
              url: `[${pull.title}](${pull.html_url})<br>`,
            }
          }),
        })),
      }
    })()
    const previousPulls = (() => {
      const mergedPulls = this.pulls.filtedMerged(
        this.config.previous.start,
        this.config.previous.end
      )
      const perUser = mergedPulls.mergedPullPerUser()
      return {
        count: mergedPulls.count(),
        perUser: perUser.map((user) => ({
          avator: user.user.avator,
          name: user.user.name,
          count: user.pulls.length,
          links: user.pulls.map((pull, i) => {
            return {
              index: i + 1,
              url: `[${pull.title}](${pull.html_url})<br>`,
            }
          }),
        })),
      }
    })()
    return {
      current: {
        start: dayjs(this.config.current.start).format('YYYY/MM/DD'),
        end: dayjs(this.config.current.end).format('YYYY/MM/DD'),
      },
      previous: {
        start: dayjs(this.config.previous.start).format('YYYY/MM/DD'),
        end: dayjs(this.config.previous.end).format('YYYY/MM/DD'),
      },
      pulls: {
        merged: {
          current: currentPulls,
          previous: previousPulls,
        },
      },
    }
  }
}
