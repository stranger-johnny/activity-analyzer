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
    closed(start, end) {
        const filtered = this.pulls.filter((pull) => {
            if (!pull.closed_at)
                return false;
            const closedAt = new Date(pull.closed_at);
            return closedAt >= start && closedAt <= end;
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
    closedAverage(start, end) {
        const closed = this.closed(start, end);
        const totalClosedTime = (0, lodash_1.sumBy)(closed.values(), (pull) => {
            return (new Date(pull.closed_at).getTime() -
                new Date(pull.created_at).getTime());
        });
        const avarageAsSeconds = totalClosedTime / closed.count();
        const days = Math.floor(avarageAsSeconds / (24 * 60 * 60));
        const hours = Math.floor((avarageAsSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((avarageAsSeconds % (60 * 60)) / 60);
        return { days, hours, minutes };
    }
}
exports.PullsAnalyzer = PullsAnalyzer;
//# sourceMappingURL=pulls_analyzer.js.map