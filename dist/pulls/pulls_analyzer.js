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
    filtedClosed(start, end) {
        const filtered = this.pulls.filter((pull) => {
            if (!pull.closed_at)
                return false;
            const closedAt = new Date(pull.closed_at);
            return closedAt >= start && closedAt <= end;
        });
        return new ClosedPullsAnalyzer(filtered);
    }
}
exports.PullsAnalyzer = PullsAnalyzer;
class ClosedPullsAnalyzer extends PullsAnalyzer {
    constructor(pulls) {
        super(pulls);
    }
    closedTimeAverage() {
        const totalClosedTime = (0, lodash_1.sumBy)(this.pulls, (pull) => {
            console.log(pull.closed_at, pull.created_at);
            return (new Date(pull.closed_at).getTime() -
                new Date(pull.created_at).getTime());
        });
        console.log(`totalClosedTime: ${totalClosedTime}`);
        const avarageAsSeconds = totalClosedTime / this.pulls.length;
        const days = Math.floor(avarageAsSeconds / (24 * 60 * 60));
        const hours = Math.floor((avarageAsSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((avarageAsSeconds % (60 * 60)) / 60);
        return { days, hours, minutes };
    }
}
//# sourceMappingURL=pulls_analyzer.js.map