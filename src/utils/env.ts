/**
 * Environment variable utilities
 * Reads CDN_URL from environment variables for build-time image URL prefixing
 */

/**
 * Get the CDN base URL from environment variables
 * Astro automatically loads .env.development (dev) or .env.production (build)
 * @returns CDN base URL string (with trailing slash removed if present)
 *          Returns empty string if CDN_URL is not set (for local images in development)
 */
export function getCdnUrl(): string {
  let cdnUrl = import.meta.env.CDN_URL || '';

  // Remove "CDN_URL=" prefix if present (handles incorrect .env file format)
  if (cdnUrl.startsWith('CDN_URL=')) {
    cdnUrl = cdnUrl.replace(/^CDN_URL=/, '');
  }

  // Remove trailing slash if present for consistent URL construction
  return cdnUrl.replace(/\/$/, '');
}

