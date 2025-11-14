export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-02'

const datasetEnvVar =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SANITY_DATASET_DEV
    : process.env.NEXT_PUBLIC_SANITY_DATASET_PROD;

export const dataset = assertValue(
  datasetEnvVar,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
