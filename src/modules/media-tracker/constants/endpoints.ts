/**
 * @module Constants/MediaTrackerEndpoints
 * @description
 * Centralized definition of API endpoint paths for the Media Tracker backend.
 *
 * This module provides a structured, type-safe reference for all REST API
 * endpoints used throughout the application — ensuring consistency,
 * discoverability, and easier maintenance as the API evolves.
 *
 * ---
 * ### Design Notes
 * - Paths are built using composable constants (`mediaTrackerPath`, `V1Path`, `youTubePath`)
 *   to prevent hard-coded duplication.
 * - The object is declared as `const` and exported as `readonly` (`as const`)
 *   to ensure immutability and preserve literal string types.
 * - Each property corresponds to a specific REST resource collection.
 *
 * ---
 * ### Example
 * ```ts
 * import { mediaTrackerEndpoints } from "@media-tracker/constants";
 *
 * // Fetch all YouTube channels
 * const res = await axios.get(mediaTrackerEndpoints.v1.youTube.channels);
 *
 * // Create a new video
 * await axios.post(mediaTrackerEndpoints.v1.youTube.videos, payload);
 *
 * // Fetch video visualizations
 * await axios.get(mediaTrackerEndpoints.v1.youTube.videoVisualizations);
 * ```
 */

/** Base path for the Media Tracker API namespace. */
const mediaTrackerPath: string = "/media_tracker/" as const;

/** Versioned API path (v1). */
const V1Path: string = "api/v1/" as const;

/** Resource namespace for YouTube-related entities. */
const youTubePath: string = "youtube/" as const;

/**
 * Immutable object containing all API endpoint paths for Media Tracker.
 *
 * Organized hierarchically by:
 * - API version (`v1`)
 * - Service domain (`youTube`)
 * - Resource type (`channels`, `videos`, `videoVisualizations`)
 *
 * ---
 * ### Example Structure
 * ```ts
 * mediaTrackerEndpoints.v1.youTube.channels
 * // → "/media_tracker/api/v1/youtube/channels/"
 * ```
 */
export const mediaTrackerEndpoints = {
    v1: {
        youTube: {
            channels: `${mediaTrackerPath}${V1Path}${youTubePath}channels/`,
            videos: `${mediaTrackerPath}${V1Path}${youTubePath}videos/`,
            videoVisualizations: `${mediaTrackerPath}${V1Path}${youTubePath}videos/visualizations/`
        }
    }
} as const;