"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToIssue = void 0;
const image_1 = require("@/export/image");
const dayjs_1 = __importDefault(require("dayjs"));
const fs = __importStar(require("fs"));
const Mustache = __importStar(require("mustache"));
class ExportToIssue {
    constructor(gitHubClient, config, pulls) {
        this.gitHubClient = gitHubClient;
        this.config = config;
        this.pulls = pulls;
        this.do = async (start, end) => {
            await this.gitHubClient.octokit.issues.create({
                owner: this.gitHubClient.owner,
                repo: this.gitHubClient.repo,
                title: 'Analyzed by issue template',
                body: this.convertToTemplate(this.templateAttributes(start, end)),
            });
        };
        this.convertToTemplate = (attributes) => {
            return Mustache.render(this.template(), attributes);
        };
        this.template = () => {
            switch (this.config.lang) {
                case 'en':
                    return fs.readFileSync('src/export/templates/en.mustache', 'utf-8');
                case 'ja':
                    return fs.readFileSync('src/export/templates/ja.mustache', 'utf-8');
                default:
                    return fs.readFileSync('src/export/templates/en.mustache', 'utf-8');
            }
        };
        this.templateAttributes = (start, end) => {
            const mergedPulls = this.pulls.filtedMerged(start, end);
            return {
                startDate: (0, dayjs_1.default)(start).format('YYYY/MM/DD'),
                endDate: (0, dayjs_1.default)(end).format('YYYY/MM/DD'),
                pulls: {
                    merged: {
                        count: mergedPulls.count(),
                        averageTime: mergedPulls.mergedTimeAverage(),
                        chart: new image_1.ImageMergedTime(mergedPulls).asMarmaidContents(),
                    },
                },
            };
        };
    }
}
exports.ExportToIssue = ExportToIssue;
//# sourceMappingURL=to-issue.js.map