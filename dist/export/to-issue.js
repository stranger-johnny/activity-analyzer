"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToIssue = void 0;
const image_1 = require("@/export/image");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = require("fs");
const mustache_1 = require("mustache");
class ExportToIssue {
    constructor(gitHubClient, config, pulls) {
        this.gitHubClient = gitHubClient;
        this.config = config;
        this.pulls = pulls;
        this.do = async () => {
            await this.gitHubClient.octokit.issues.create({
                owner: this.gitHubClient.owner,
                repo: this.gitHubClient.repo,
                title: 'Analyzed by issue template',
                body: this.convertToTemplate(this.templateAttributes()),
            });
        };
        this.convertToTemplate = (attributes) => {
            return (0, mustache_1.render)(this.template(), attributes);
        };
        this.template = () => {
            switch (this.config.lang) {
                case 'en':
                    return (0, fs_1.readFileSync)('src/export/templates/en.mustache', 'utf-8');
                case 'ja':
                    return (0, fs_1.readFileSync)('src/export/templates/ja.mustache', 'utf-8');
                default:
                    return (0, fs_1.readFileSync)('src/export/templates/en.mustache', 'utf-8');
            }
        };
        this.templateAttributes = () => {
            const currentPeriodPulls = (() => {
                const mergedPulls = this.pulls.filtedMerged(this.config.current.start, this.config.current.end);
                return {
                    start: (0, dayjs_1.default)(this.config.current.start).format('YYYY/MM/DD'),
                    end: (0, dayjs_1.default)(this.config.current.end).format('YYYY/MM/DD'),
                    merged: {
                        count: mergedPulls.count(),
                        averageTime: mergedPulls.mergedTimeAverage(),
                        chart: new image_1.ImageMergedTime(mergedPulls).asMarmaidContents(),
                    },
                };
            })();
            const previousPeriodPulls = (() => {
                const mergedPulls = this.pulls.filtedMerged(this.config.previous.start, this.config.previous.end);
                return {
                    start: (0, dayjs_1.default)(this.config.previous.start).format('YYYY/MM/DD'),
                    end: (0, dayjs_1.default)(this.config.previous.end).format('YYYY/MM/DD'),
                    merged: {
                        count: mergedPulls.count(),
                        averageTime: mergedPulls.mergedTimeAverage(),
                        chart: new image_1.ImageMergedTime(mergedPulls).asMarmaidContents(),
                    },
                };
            })();
            return {
                start: (0, dayjs_1.default)(this.config.current.start).format('YYYY/MM/DD'),
                end: (0, dayjs_1.default)(this.config.current.end).format('YYYY/MM/DD'),
                pulls: {
                    current: { ...currentPeriodPulls },
                    previous: { ...previousPeriodPulls },
                },
            };
        };
    }
}
exports.ExportToIssue = ExportToIssue;
//# sourceMappingURL=to-issue.js.map