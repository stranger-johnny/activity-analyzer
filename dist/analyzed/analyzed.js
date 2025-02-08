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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyzed = void 0;
const image_1 = require("@/analyzed/image");
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const Mustache = __importStar(require("mustache"));
class Analyzed {
    constructor(gitHubClient, pulls) {
        this.gitHubClient = gitHubClient;
        this.pulls = pulls;
        this.toIssue = async (start, end) => {
            try {
                const attributes = await this.templateAttributes(start, end);
                await this.gitHubClient.octokit.issues.create({
                    owner: this.gitHubClient.owner,
                    repo: this.gitHubClient.repo,
                    title: 'Analyzed by issue template',
                    body: this.convertToTemplate(attributes),
                });
            }
            catch (error) {
                console.error('failed to create issue', error);
            }
        };
        this.convertToTemplate = (attributes) => {
            return Mustache.render(this.template(), attributes);
        };
        this.template = () => {
            return fs.readFileSync('src/analyzed/templates/ja.mustache', 'utf-8');
        };
        this.templateAttributes = async (start, end) => {
            const mergedPulls = this.pulls.filtedMerged(start, end);
            const mergedTimeImage = new image_1.ImageMergedTime(mergedPulls);
            console.log(await mergedTimeImage.imageAsBase64());
            core.setOutput('chart', await mergedTimeImage.imageAsBase64());
            return {
                startDate: start.toISOString(),
                endDate: end.toISOString(),
                pulls: {
                    merged: {
                        count: mergedPulls.count(),
                        averageTime: mergedPulls.mergedTimeAverage(),
                        chart: await mergedTimeImage.imageAsBase64(),
                    },
                },
            };
        };
    }
}
exports.Analyzed = Analyzed;
//# sourceMappingURL=analyzed.js.map