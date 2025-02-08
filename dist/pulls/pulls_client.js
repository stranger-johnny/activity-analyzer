"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullsClient = void 0;
class PullsClient {
    constructor(gitHubClient) {
        this.gitHubClient = gitHubClient;
    }
    async collect() {
        const { data: events } = await this.gitHubClient.octokit.issues.listEvents({
            owner: this.gitHubClient.owner,
            repo: this.gitHubClient.repo,
            issue_number: 1,
        });
        console.log(events);
        return await this.gitHubClient.octokit.paginate(this.gitHubClient.octokit.rest.pulls.list, {
            owner: this.gitHubClient.owner,
            repo: this.gitHubClient.repo,
            state: 'all',
            per_page: 100,
        });
    }
}
exports.PullsClient = PullsClient;
//# sourceMappingURL=pulls_client.js.map