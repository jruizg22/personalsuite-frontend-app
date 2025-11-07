import type {YTVideoVisualization} from "@media-tracker/models";

/**
 * **YouTube Video Visualization API Model**
 *
 * Represents the structure of a YouTube video visualization record
 * as returned or accepted by the backend API.
 *
 * This model follows the API’s naming conventions (`snake_case`)
 * and serves as the serialized version of the domain model
 * `YTVideoVisualization`.
 */
export interface YTVideoVisualizationAPI {
    /** Unique numeric identifier of the visualization record. */
    id: number;

    /** The associated video’s unique identifier (foreign key). */
    video_id: string;

    /** Date when the visualization occurred, in ISO 8601 format. */
    visualization_date: string;

    /** Optional resume marker (e.g., playback time in seconds). */
    resume: number | null;
}

/**
 * Converts a frontend domain model (`YTVideoVisualization`) into the
 * API-compatible format (`YTVideoVisualizationAPI`) for **creation** requests.
 *
 * ---
 * ### Example:
 * ```ts
 * const visualization: YTVideoVisualization = {
 *   id: 1,
 *   videoId: "abc123",
 *   visualizationDate: "2025-11-07T10:00:00Z",
 *   resume: 120
 * };
 *
 * const payload = YTVideoVisualizationToAPICreate(visualization);
 * // => {
 * //   id: 1,
 * //   video_id: "abc123",
 * //   visualization_date: "2025-11-07T10:00:00Z",
 * //   resume: 120
 * // }
 * ```
 *
 * @param videoVisualization - The visualization entity to transform.
 * @returns The API-compatible representation for POST requests.
 */
export const YTVideoVisualizationToAPICreate = (videoVisualization: Partial<YTVideoVisualization>): YTVideoVisualizationAPI => ({
    id: videoVisualization.id!,
    video_id: videoVisualization.videoId!,
    visualization_date: videoVisualization.visualizationDate!,
    resume: videoVisualization.resume ?? null,
});

/**
 * Converts a partial frontend model (`YTVideoVisualization`) into a
 * partial API format (`YTVideoVisualizationAPI`) for **update** operations.
 *
 * This function only includes the fields that are present in the
 * provided object, ensuring minimal payloads for PATCH-like updates.
 *
 * ---
 * ### Example:
 * ```ts
 * const updated = YTVideoVisualizationToAPIUpdate({
 *   id: 1,
 *   resume: 180
 * });
 *
 * // => { id: 1, resume: 180 }
 * ```
 *
 * @param videoVisualization - Partial visualization data to update.
 * @returns A minimal API payload containing only defined fields.
 */
export const YTVideoVisualizationToAPIUpdate = (videoVisualization: Partial<YTVideoVisualization>): Partial<YTVideoVisualizationAPI> => ({
    ...(videoVisualization.id && { id: videoVisualization.id }),
    ...(videoVisualization.videoId && { visualization_date: videoVisualization.visualizationDate }),
    ...(videoVisualization.visualizationDate && { visualization_date: videoVisualization.visualizationDate }),
    ...(videoVisualization.resume !== undefined && { resume: videoVisualization.resume }),
});