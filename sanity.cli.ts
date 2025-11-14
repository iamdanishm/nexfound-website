/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SANITY_DATASET_DEV : process.env.NEXT_PUBLIC_SANITY_DATASET_PROD

export default defineCliConfig({ api: { projectId, dataset } })
