"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const pulls_1 = require("@/pulls");
const analyzed_1 = require("@/analyzed/analyzed");
const github_client_1 = require("@/octokit/github_client");
const config_1 = require("@/config/config");
const repo = (0, core_1.getInput)('repo', { required: true });
if (!repo) {
    console.error('repo is required');
    process.exit(1);
}
const token = (0, core_1.getInput)('token', { required: true });
if (!token) {
    console.error('token is required');
    process.exit(1);
}
const configPath = (0, core_1.getInput)('config_path', { required: true });
if (!configPath) {
    console.error('config path is required');
    process.exit(1);
}
console.log(process.env.GITHUB_WORKSPACE);
async function run() {
    console.log((0, config_1.loadInput)(configPath));
    const client = (0, github_client_1.createGitHubClient)(token, repo);
    const pulls = await (0, pulls_1.listPulls)(client);
    const analyzed = new analyzed_1.Analyzed(client, pulls);
    analyzed.toIssue(new Date('2025-01-01'), new Date('2025-12-31'));
}
try {
    run();
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.js.map