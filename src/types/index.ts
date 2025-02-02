import { components } from '@octokit/openapi-types/types'

export type Pull = components['schemas']['pull-request-simple']

export type Time = { days?: number; hours?: number; minutes: number }
