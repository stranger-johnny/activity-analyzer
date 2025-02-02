"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullsAnalyzer = void 0;
class PullsAnalyzer {
    constructor(pulls) {
        this.pulls = pulls;
    }
    values() {
        return this.pulls;
    }
    count() {
        return this.pulls.length;
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
        return new PullsAnalyzer(filtered);
    }
    closedWithinThePeriod(start, end) {
        return this.pulls.filter((pull) => {
            if (!pull.closed_at)
                return false;
            const closedAt = new Date(pull.closed_at);
            return closedAt >= start && closedAt <= end;
        });
    }
}
exports.PullsAnalyzer = PullsAnalyzer;
//# sourceMappingURL=pulls_analyzer.js.map