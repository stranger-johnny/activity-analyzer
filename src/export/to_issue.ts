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
      count: { current: number; previous: number }
      perUser: {
        name: string
        count: { current: number; previous: number }
        links: { index: number; url: string }[]
      }[]
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
      title: this.config.title,
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
        return readFileSync(__dirname + '/templates/en.mustache', 'utf-8')
      case 'ja':
        return readFileSync(__dirname + '/templates/ja.mustache', 'utf-8')
      default:
        return readFileSync(__dirname + '/templates/en.mustache', 'utf-8')
    }
  }

  private templateAttributes = (): AnalyzedTemplateAttributes => {
    const currentPulls = this.pulls.filtedMerged(
      this.config.current.start,
      this.config.current.end
    )
    const previousPulls = this.pulls.filtedMerged(
      this.config.previous.start,
      this.config.previous.end
    )
    const pullsPerUser = (() => {
      return currentPulls.mergedPullPerUser().map((user) => {
        return {
          name: user.userName,
          count: {
            current: user.pulls.length,
            previous: previousPulls.findMergedPullByUser(user.userName).length,
          },
          links: user.pulls.map((pull, i) => {
            return {
              index: i + 1,
              url: `[${pull.title} #${pull.number}](${pull.html_url})<br>`,
            }
          }),
        }
      })
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
          count: {
            current: currentPulls.count(),
            previous: previousPulls.count(),
          },
          perUser: pullsPerUser,
        },
      },
    }
  }
}
