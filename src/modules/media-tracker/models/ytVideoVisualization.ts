/**
 * **YTVideoVisualization** – Domain model for YouTube video visualizations.
 *
 * Represents a single *visualization record* (or "view instance") of a YouTube video
 * within the application’s internal data model.
 *
 * This model is used in the frontend to track when a video was viewed,
 * optionally including the playback resume point (e.g., if the video was paused).
 *
 * ---
 * ### Key Points:
 * - Mirrors the API model {@link YTVideoVisualizationAPI} but uses **camelCase** naming.
 * - Typically associated with a specific {@link YTVideo}.
 * - Used in both CRUD operations and derived data views (e.g., `YTVideoFull.visualizations`).
 *
 * ---
 * ### Example:
 * ```ts
 * const visualization: YTVideoVisualization = {
 *   id: 42,
 *   videoId: "yt12345",
 *   visualizationDate: "2025-11-07T14:30:00Z",
 *   resume: 120
 * };
 * ```
 */
export interface YTVideoVisualization {
    /** Unique numeric identifier of this visualization record. */
    id: number;

    /** The associated YouTube video’s unique ID (foreign key reference). */
    videoId: string;

    /** The date and time when the video was visualized, in ISO 8601 format. */
    visualizationDate: string;

    /**
     * Optional resume marker (in seconds) indicating where the video playback
     * was left off. Useful for tracking partial views or resumable playback.
     */
    resume?: number | null;
}