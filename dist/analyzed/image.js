"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMergedTime = void 0;
const chartjs_to_image_1 = __importDefault(require("chartjs-to-image"));
class ImageMergedTime {
    constructor(pulls) {
        this.pulls = pulls;
    }
    async imageAsBase64() {
        const chart = new chartjs_to_image_1.default();
        const mergedTimesPerPull = this.pulls.mergedTimesPerPull();
        chart.setConfig({
            type: 'bar',
            data: {
                labels: mergedTimesPerPull.map((pull) => pull.number),
                datasets: [{ data: mergedTimesPerPull.map((pull) => pull.hours) }],
            },
        });
        return await chart.toDataUrl();
    }
}
exports.ImageMergedTime = ImageMergedTime;
//# sourceMappingURL=image.js.map