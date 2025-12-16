import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import projectCategory from './projectCategory'
import testimonial from './testimonial'
import service from './service'
import settings from './settings'
import blog from './blog'
import blogCategory from './blogCategory'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    projectCategory,
    testimonial,
    service,
    settings,
    blog,
    blogCategory,
    author,
  ],
}
