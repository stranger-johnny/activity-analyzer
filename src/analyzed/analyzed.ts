import { CollectPullsResponse } from '@/pulls'
import * as Mustache from 'mustache'
import * as fs from 'fs'
import { GitHubClient } from '@/octokit/github_client'

type AnalyzedTemplateAttributes = {
  startDate: string
  endDate: string
  numberOfClosedIssues: number
}

export class Analyzed {
  public constructor(
    private gitHubClient: GitHubClient,
    private pulls: CollectPullsResponse
  ) {}

  private template = (): string => {
    return fs.readFileSync('src/analyzed/templates/ja.mustache', 'utf-8')
  }

  private templateAttributes = (): AnalyzedTemplateAttributes => {
    return {
      startDate: '2025-01-01',
      endDate: '2025-03-02',
      numberOfClosedIssues: this.pulls.closed.length,
    }
  }

  private convertToTemplate = (): string => {
    return Mustache.render(this.template(), this.templateAttributes())
  }

  public convertAnalzedToIssue = async (): Promise<void> => {
    try {
      await this.gitHubClient.octokit.issues.create({
        owner: this.gitHubClient.owner,
        repo: this.gitHubClient.repo,
        title: 'Analyzed by issue template',
        body: this.convertToTemplate(),
      })
    } catch (error) {
      console.error('failed to create issue', error)
    }
  }
}
