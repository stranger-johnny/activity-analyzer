import { z } from 'zod';
declare const ConfigSchema: z.ZodObject<{
    lang: z.ZodUnion<[z.ZodLiteral<"ja">, z.ZodLiteral<"en">]>;
    period: z.ZodUnion<[z.ZodLiteral<"last-1week">, z.ZodLiteral<"last-2week">]>;
}, "strip", z.ZodTypeAny, {
    lang: "ja" | "en";
    period: "last-1week" | "last-2week";
}, {
    lang: "ja" | "en";
    period: "last-1week" | "last-2week";
}>;
export type OutputConfig = z.infer<typeof ConfigSchema>;
export declare const loadInput: (path: string) => Promise<OutputConfig>;
export {};
