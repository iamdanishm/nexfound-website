import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import testimonial from './testimonial'
import service from './service'
import settings from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    testimonial,
    service,
    settings,
  ],
}
