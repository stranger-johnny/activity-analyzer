# Activity Analyzer

## Overview

This repository provides an activity analysis tool that leverages GitHub Actions to evaluate merged pull requests and generate comprehensive reports via GitHub Issues. The tool compares data from the current period with that of the previous period, thus offering insights into repository activities.

## Workflow Definition

To execute this action, you can set up a GitHub Actions workflow as shown below.

```yaml
name: 'My Action'

on:
  pull_request:
    branches:
      - main

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ./
        with:
          repo: ${{ github.repository }}
          token: ${{ secrets.GITHUB_TOKEN }}
          config_path: ${{ github.workspace }}/.github/config.yaml
```

When a pull request is submitted against the `main` branch, this workflow automatically:

- Checks out the repository.
- Executes the custom action with the following inputs:
  - **repo:** The repository in the format `owner/repo`.
  - **token:** A GitHub authentication token (stored as `GITHUB_TOKEN` in Secrets).
  - **config_path:** The path to the configuration file (e.g., `.github/config.yaml`).

## Features

1. **Pull Request Analysis**

   - Aggregates the number of merged pull requests over a specified period.
   - Provides per-user breakdowns with comparisons between the current and previous periods.

2. **Report Generation**

   - Utilizes Mustache templates to render the report.
   - Supports both English and Japanese templates based on the `lang` setting in the configuration file.
     - When `lang` is set to `ja`, it uses the Japanese template (`src/export/templates/ja.mustache`).
     - Otherwise, it defaults to the English template.
   - Automatically posts the generated report as a GitHub Issue.

3. **Flexible Configuration**
   - Configure the report language (`lang`), title (`title`), and period (`period`) in `.github/config.yaml`.
   - Supports period configurations for either the last one or two weeks, providing side-by-side comparisons between current and previous periods.

## Execution Flow

1. **Trigger:** The workflow is triggered by a pull request event.
2. **Checkout:** The repository is checked out using `actions/checkout@v3`.
3. **Input Processing:** The action reads and validates the inputs (repository, token, configuration path).
4. **Data Fetching:** A GitHub API client is created, and pull request data is fetched and aggregated.
5. **Report Rendering:** Mustache templates are used to format the report using the analysis data.
6. **Issue Creation:** The final report is posted as a GitHub Issue automatically.
