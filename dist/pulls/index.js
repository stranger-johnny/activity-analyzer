"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPulls = void 0;
const pulls_client_1 = require("@/pulls/pulls_client");
const pulls_analyzer_1 = require("@/pulls/pulls_analyzer");
const listPulls = async (gitHubClient) => {
    const client = await new pulls_client_1.PullsClient(gitHubClient);
    const pulls = await client.collect();
    const analyzer = new pulls_analyzer_1.PullsAnalyzer(pulls);
    return {
        values: pulls,
        closed: analyzer.closedWithinThePeriod(new Date(2025, 1, 1), new Date(2025, 3, 2)),
    };
};
exports.listPulls = listPulls;
//# sourceMappingURL=index.js.map