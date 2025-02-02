"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPulls = void 0;
const pulls_client_1 = require("@/pulls/pulls_client");
const pulls_analyzer_1 = require("@/pulls/pulls_analyzer");
const listPulls = async (gitHubClient) => {
    const client = await new pulls_client_1.PullsClient(gitHubClient);
    const pulls = await client.collect();
    return new pulls_analyzer_1.PullsAnalyzer(pulls);
};
exports.listPulls = listPulls;
//# sourceMappingURL=index.js.map