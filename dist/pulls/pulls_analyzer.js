"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullsAnalyzer = void 0;
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
    mergedTimeAverage() {
        const sumTime = (0, lodash_1.sumBy)(this.pulls, (pull) => {
            const mergedAt = new Date(pull.merged_at).getTime();
            const createdAt = new Date(pull.created_at).getTime();
            const diff = mergedAt - createdAt;
            return Math.floor(diff / 1000);
        });
        return this.secondsToTime(sumTime / this.pulls.length);
    }
    secondsToTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        return { days, hours, minutes };
    }
}
//# sourceMappingURL=pulls_analyzer.js.map