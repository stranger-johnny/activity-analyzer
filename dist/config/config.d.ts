import { z } from 'zod';
declare const ConfigSchema: z.ZodObject<{
    lang: z.ZodUnion<[z.ZodLiteral<"ja">, z.ZodLiteral<"en">]>;
}, "strip", z.ZodTypeAny, {
    lang: "ja" | "en";
}, {
    lang: "ja" | "en";
}>;
type Config = z.infer<typeof ConfigSchema>;
export declare function loadInput(path: string): Promise<Config>;
export {};
