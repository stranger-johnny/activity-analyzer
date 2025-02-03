"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInput = loadInput;
const promises_1 = require("fs/promises");
const js_yaml_1 = require("js-yaml");
const zod_1 = require("zod");
const ConfigSchema = zod_1.z.object({
    lang: zod_1.z.union([zod_1.z.literal('ja'), zod_1.z.literal('en')]),
});
async function loadInput(path) {
    try {
        const yamlData = await (0, promises_1.readFile)(path, 'utf8');
        const data = (0, js_yaml_1.load)(yamlData);
        const config = ConfigSchema.parse(data);
        return config;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=config.js.map