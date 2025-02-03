import { readFile } from 'fs/promises'
import { load } from 'js-yaml'
import { z } from 'zod'

const ConfigSchema = z.object({
  lang: z.union([z.literal('ja'), z.literal('en')]),
})
type Config = z.infer<typeof ConfigSchema>

export async function loadInput(path: string): Promise<Config> {
  try {
    const yamlData = await readFile(path, 'utf8')
    const data = load(yamlData)

    const config = ConfigSchema.parse(data)
    return config
  } catch (error) {
    throw error
  }
}
