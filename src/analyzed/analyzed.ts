import * as Mustache from 'mustache'
import * as fs from 'fs'
import { GitHubClient } from '@/octokit/github_client'
import { PullsAnalyzer } from '@/pulls/pulls_analyzer'
import { Pull } from '@/types'

type AnalyzedTemplateAttributes = {
  startDate: string
  endDate: string
  numberOfClosedIssues: number
  closedIssueTimeAverage: { days: number; hours: number; minutes: number }
}

export class Analyzed {
  public constructor(
    private gitHubClient: GitHubClient,
    private pulls: PullsAnalyzer
  ) {}

  public convertAnalzedToIssue = async (
    start: Date,
    end: Date
  ): Promise<void> => {
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
    const closedIssues = this.pulls.filtedClosed(start, end)
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      numberOfClosedIssues: closedIssues.values().length,
      closedIssueTimeAverage: closedIssues.closedTimeAverage(),
    }
  }
}
