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
            user: {
                name: pulls[0]?.user?.login ?? '',
                avator: pulls[0]?.user?.avatar_url ?? '',
            },
            pulls,
        }));
    }
    secondsToTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        return { days, hours, minutes };
    }
    secondsToHour(seconds) {
        return seconds / (60 * 60);
    }
}
exports.MergedPullsAnalyzer = MergedPullsAnalyzer;
//# sourceMappingURL=pulls_analyzer.js.map