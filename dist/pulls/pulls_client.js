"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullsClient = void 0;
class PullsClient {
    constructor(gitHubClient) {
        this.gitHubClient = gitHubClient;
    }
    async collect() {
        const pulls = [];
        let page = 1;
        while (true) {
            const curratePagePulls = await this.gitHubClient.octokit.paginate(this.gitHubClient.octokit.rest.pulls.list, {
                owner: this.gitHubClient.owner,
                repo: this.gitHubClient.repo,
                state: 'all',
                per_page: 2,
                page: page,
            });
            console.log('curratePagePulls:', curratePagePulls.map((pull) => pull.title));
            if (curratePagePulls.length === 0) {
                break;
            }
            pulls.push(...curratePagePulls);
            page++;
        }
        return pulls;
    }
}
exports.PullsClient = PullsClient;
//# sourceMappingURL=pulls_client.js.map