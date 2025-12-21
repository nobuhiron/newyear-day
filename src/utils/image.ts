import type { ImageMetadata } from 'astro';
import { getCdnUrl } from './env';

/**
 * Image type definition for components
 */
export type ImageSource =
  | { src: ImageMetadata; alt: string; width?: number; height?: number }
  | { src: string; alt: string; width?: number; height?: number };

/**
 * Type guard to check if image is ImageMetadata type
 * @param img - Image object to check
 * @returns true if image is ImageMetadata type
 */
export function isImageMetadata(img: ImageSource | undefined): img is {
  src: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
} {
  return (
    img !== undefined &&
    typeof img.src === 'object' &&
    img.src !== null &&
    'src' in img.src
  );
}

/**
 * Apply CDN base URL to a string path
 * @param path - Image path (e.g., '/fuku.svg' or 'images/photo.jpg')
 * @returns Path with CDN base URL prepended if CDN_URL is set
 */
export function applyBaseUrl(path: string): string {
  const baseUrl = getCdnUrl();
  if (!baseUrl) {
    return path;
  }

  // If path already starts with http:// or https://, don't modify it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove leading slash from path if present (we'll add it back)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Combine base URL and path
  // getImage() already outputs paths as /assets/images/... (configured in astro.config.mjs)
  return `${baseUrl}/${cleanPath}`;
}

/**
 * Apply CDN base URL to getImage() result
 * @param imageResult - Result from getImage() function
 * @returns Image result with CDN base URL applied to src
 */
export function applyBaseUrlToImageResult<T extends { src: string }>(
  imageResult: T
): T {
  const baseUrl = getCdnUrl();
  if (!baseUrl) {
    return imageResult;
  }

  return {
    ...imageResult,
    src: applyBaseUrl(imageResult.src),
  };
}

/**
 * Apply CDN base URL to ImageSource
 * Note: ImageMetadata should NOT be modified - it will be used as-is by Image component
 * Only string paths will have base URL applied
 * @param imageSource - ImageSource object
 * @returns ImageSource with CDN base URL applied (only for string paths)
 */
export function applyBaseUrlToImageSource(
  imageSource: ImageSource
): ImageSource {
  const baseUrl = getCdnUrl();
  if (!baseUrl) {
    return imageSource;
  }

  // ImageMetadata should be used as-is - don't modify it
  // The Image component will handle it and generate the optimized URL
  // We only apply base URL to string paths
  if (isImageMetadata(imageSource)) {
    // Return ImageMetadata as-is - don't modify it
    return imageSource;
  } else {
    // Apply base URL to string paths
    return {
      ...imageSource,
      src: applyBaseUrl(imageSource.src),
    };
  }
}
