import { z } from 'zod';
declare const ConfigSchema: z.ZodObject<{
    lang: z.ZodUnion<[z.ZodLiteral<"ja">, z.ZodLiteral<"en">]>;
    title: z.ZodString;
    period: z.ZodUnion<[z.ZodLiteral<"last-1week">, z.ZodLiteral<"last-2week">]>;
}, "strip", z.ZodTypeAny, {
    lang: "ja" | "en";
    title: string;
    period: "last-1week" | "last-2week";
}, {
    lang: "ja" | "en";
    title: string;
    period: "last-1week" | "last-2week";
}>;
type Config = z.infer<typeof ConfigSchema>;
export type OutputConfig = Config & {
    current: {
        start: Date;
        end: Date;
    };
    previous: {
        start: Date;
        end: Date;
    };
};
export declare const loadInput: (path: string) => Promise<OutputConfig>;
export {};
