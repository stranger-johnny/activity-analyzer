"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMergedTime = void 0;
class ImageMergedTime {
    constructor(pulls) {
        this.pulls = pulls;
        this.asMarmaidContents = () => {
            const mergedTimesPerPull = this.pulls.mergedTimesPerPull();
            const xaxis = mergedTimesPerPull.map((pull) => pull.number).join(',');
            const bars = mergedTimesPerPull.map((pull) => pull.hours).join(',');
            return `
    xychart-beta
        x-axis "PR" [${xaxis}]
        y-axis "PR merge time (hour)"
        bar [${bars}]
    `;
        };
    }
}
exports.ImageMergedTime = ImageMergedTime;
//# sourceMappingURL=image.js.map