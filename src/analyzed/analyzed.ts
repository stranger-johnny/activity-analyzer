import { CollectPullsResponse } from '@/pulls'
import * as Mustache from 'mustache'
import * as fs from 'fs'
import { Octokit } from '@octokit/rest'

type AnalyzedTemplateAttributes = {
  numberOfClosedIssues: number
}

export class Analyzed {
  public constructor(
    private octokit: Octokit,
    private owner: string,
    private repo: string,
    private pulls: CollectPullsResponse
  ) {}

  private template = (): string => {
    return fs.readFileSync('src/analyzed/templates/ja.mustache', 'utf-8')
  }

  private templateAttributes = (): AnalyzedTemplateAttributes => {
    return {
      numberOfClosedIssues: this.pulls.closed.length,
    }
  }

  private convertToTemplate = (): string => {
    return Mustache.render(this.template(), this.templateAttributes())
  }

  public convertAnalzedToIssue = async (): Promise<void> => {
    try {
      await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title: 'Analyzed by issue template',
        body: this.convertToTemplate(),
      })
    } catch (error) {
      console.error('failed to create issue', error)
    }
  }
}
