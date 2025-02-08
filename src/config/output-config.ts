import { readFile } from 'fs/promises'
import { load } from 'js-yaml'
import { z } from 'zod'

const ConfigSchema = z.object({
  lang: z.union([z.literal('ja'), z.literal('en')]),
  period: z.union([z.literal('last-1week'), z.literal('last-2week')]),
})
export type OutputConfig = z.infer<typeof ConfigSchema>

export const loadInput = async (path: string): Promise<OutputConfig> => {
  try {
    const yamlData = await readFile(path, 'utf8')
    const data = load(yamlData)

    const config = ConfigSchema.parse(data)
    return config
  } catch (error) {
    throw new Error(`Failed to load config: ${error}`)
  }
}
