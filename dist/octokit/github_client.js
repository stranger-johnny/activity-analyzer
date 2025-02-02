"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGitHubClient = void 0;
const rest_1 = require("@octokit/rest");
const createGitHubClient = (gitHubToken, repo) => {
    return {
        octokit: new rest_1.Octokit({ auth: gitHubToken }),
        owner: repo.split('/')[0] ?? '',
        repo: repo.split('/')[1] ?? '',
    };
};
exports.createGitHubClient = createGitHubClient;
//# sourceMappingURL=github_client.js.map