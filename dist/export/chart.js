"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergedPerUserChart = void 0;
class MergedPerUserChart {
    constructor(pulls) {
        this.pulls = pulls;
        this.asMarmaidContents = () => {
            const mergedPullPerUser = this.pulls.mergedPullPerUser();
            const xaxis = mergedPullPerUser.map((pull) => pull.user).join(',');
            const bars = mergedPullPerUser.map((pull) => pull.pulls.length).join(',');
            return `
    xychart-beta
        x-axis "User" [${xaxis}]
        y-axis "Number of Merge PRs"
        bar [${bars}]
    `;
        };
    }
}
exports.MergedPerUserChart = MergedPerUserChart;
//# sourceMappingURL=chart.js.map