"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectPulls = void 0;
const pulls_model_1 = require("./pulls_model");
const collectPulls = async (octokit, owner, repo) => {
    const client = await new pulls_model_1.PullsClient(octokit, owner, repo);
    const pulls = await client.collect();
    return pulls;
};
exports.collectPulls = collectPulls;
//# sourceMappingURL=index.js.map