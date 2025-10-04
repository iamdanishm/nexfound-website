import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

// Sanity Image Asset Type
export interface SanityImageAsset {
  _id: string
  url: string
}

// Sanity Image with Asset Reference
export interface SanityImage {
  asset: SanityImageAsset | { _ref: string }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Generate URL for any Sanity image source
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to get image dimensions from Sanity asset
export function getImageDimensions(image: SanityImage) {
  if (!image?.asset) {
    return { width: 0, height: 0, aspectRatio: 0 }
  }

  // Check if asset is a reference or full object
  const assetRef = 'url' in image.asset ? image.asset._id : image.asset._ref

  if (!assetRef) {
    return { width: 0, height: 0, aspectRatio: 0 }
  }

  const dimensions = assetRef.split('-')[2]

  if (!dimensions) {
    return { width: 0, height: 0, aspectRatio: 0 }
  }

  const [width, height] = dimensions.split('x').map(Number)
  const aspectRatio = width / height

  return { width, height, aspectRatio }
}
