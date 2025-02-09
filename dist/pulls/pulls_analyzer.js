"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergedPullsAnalyzer = exports.PullsAnalyzer = void 0;
const lodash_1 = require("lodash");
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
    filtedMerged(start, end) {
        const filtered = this.pulls.filter((pull) => {
            if (!pull.merged_at)
                return false;
            const mergedAt = new Date(pull.merged_at);
            return mergedAt >= start && mergedAt <= end;
        });
        return new MergedPullsAnalyzer(filtered);
    }
}
exports.PullsAnalyzer = PullsAnalyzer;
class MergedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls) {
        super(pulls);
    }
    mergedPullPerUser() {
        const grouped = (0, lodash_1.groupBy)(this.pulls, (pull) => pull.user?.id ?? 'unknown');
        return Object.entries(grouped).map(([_, pulls]) => ({
            userName: pulls[0]?.user?.login ?? '',
            pulls,
        }));
    }
    findMergedPullByUser(userName) {
        const grouped = (0, lodash_1.groupBy)(this.pulls, (pull) => pull.user?.id ?? 'unknown');
        const pulls = Object.values(grouped).find((group) => {
            return group[0]?.user?.login === userName;
        });
        return pulls ?? [];
    }
}
exports.MergedPullsAnalyzer = MergedPullsAnalyzer;
//# sourceMappingURL=pulls_analyzer.js.map