import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const config = defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    title: 'Nexfound Website',
    apiVersion: '2023-05-03',
    basePath: '/admin',
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: {
        types: [], // We'll add schemas later
    },
})

export default config
