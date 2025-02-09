"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToIssue = void 0;
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
                    return (0, fs_1.readFileSync)(__dirname + '/templates/en.mustache', 'utf-8');
                case 'ja':
                    return (0, fs_1.readFileSync)(__dirname + '/templates/ja.mustache', 'utf-8');
                default:
                    return (0, fs_1.readFileSync)(__dirname + '/templates/en.mustache', 'utf-8');
            }
        };
        this.templateAttributes = () => {
            const currentPulls = this.pulls.filtedMerged(this.config.current.start, this.config.current.end);
            const previousPulls = this.pulls.filtedMerged(this.config.previous.start, this.config.previous.end);
            const pullsPerUser = (() => {
                return currentPulls.mergedPullPerUser().map((user) => {
                    return {
                        name: user.userName,
                        count: {
                            current: user.pulls.length,
                            previous: previousPulls.findMergedPullByUser(user.userName).length,
                        },
                        links: user.pulls.map((pull, i) => {
                            return {
                                index: i + 1,
                                url: `[${pull.title} #${pull.number}](${pull.html_url})<br>`,
                            };
                        }),
                    };
                });
            })();
            return {
                current: {
                    start: (0, dayjs_1.default)(this.config.current.start).format('YYYY/MM/DD'),
                    end: (0, dayjs_1.default)(this.config.current.end).format('YYYY/MM/DD'),
                },
                previous: {
                    start: (0, dayjs_1.default)(this.config.previous.start).format('YYYY/MM/DD'),
                    end: (0, dayjs_1.default)(this.config.previous.end).format('YYYY/MM/DD'),
                },
                pulls: {
                    merged: {
                        count: {
                            current: currentPulls.count(),
                            previous: previousPulls.count(),
                        },
                        perUser: pullsPerUser,
                    },
                },
            };
        };
    }
}
exports.ExportToIssue = ExportToIssue;
//# sourceMappingURL=to_issue.js.map