import dayjs from 'dayjs'
import { readFile } from 'fs/promises'
import { load } from 'js-yaml'
import { z } from 'zod'

const ConfigSchema = z.object({
  lang: z.union([z.literal('ja'), z.literal('en')]),
  period: z.union([z.literal('last-1week'), z.literal('last-2week')]),
})
type Config = z.infer<typeof ConfigSchema>
export type OutputConfig = Config & { startDate: Date; endDate: Date }

export const loadInput = async (path: string): Promise<OutputConfig> => {
  try {
    const yamlData = await readFile(path, 'utf8')
    const data = load(yamlData)

    const config = ConfigSchema.parse(data)

    switch (config.period) {
      case 'last-1week':
        return {
          ...config,
          startDate: dayjs().subtract(1, 'week').toDate(),
          endDate: dayjs().toDate(),
        }
      case 'last-2week':
        return {
          ...config,
          startDate: dayjs().subtract(2, 'week').toDate(),
          endDate: dayjs().toDate(),
        }
    }
  } catch (error) {
    throw new Error(`Failed to load config: ${error}`)
  }
}
