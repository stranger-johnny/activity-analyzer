"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGitHubClient = void 0;
const rest_1 = require("@octokit/rest");
const createGitHubClient = (gitHubToken, owner, repo) => {
    return {
        octokit: new rest_1.Octokit({ auth: gitHubToken }),
        owner,
        repo,
    };
};
exports.createGitHubClient = createGitHubClient;
//# sourceMappingURL=github_client.js.map