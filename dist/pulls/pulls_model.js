"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pulls = exports.PullsClient = void 0;
class PullsClient {
    constructor(octokit, owner, repo) {
        this.octokit = octokit;
        this.owner = owner;
        this.repo = repo;
    }
    async collect() {
        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return await this.octokit.paginate(this.octokit.rest.pulls.list, {
            owner: this.owner,
            repo: this.repo,
            state: 'all',
            per_page: 100,
        });
    }
}
exports.PullsClient = PullsClient;
class Pulls {
    constructor(pulls) {
        this.pulls = pulls;
    }
    filter(start, end) {
        const filtered = this.pulls.filter((pull) => {
            const createdAt = new Date(pull.created_at);
            if (createdAt >= start && createdAt <= end) {
                return true;
            }
            if (pull.closed_at) {
                const closedAt = new Date(pull.closed_at);
                return closedAt >= start && closedAt <= end;
            }
            return false;
        });
        return new Pulls(filtered);
    }
}
exports.Pulls = Pulls;
//# sourceMappingURL=pulls_model.js.map