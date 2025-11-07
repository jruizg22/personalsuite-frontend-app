import type {YTChannel, YTVideoVisualization} from "@media-tracker/models";

/**
 * Represents a YouTube video entity within the application.
 *
 * This interface defines the base structure of a YouTube video object,
 * typically returned from the backend API or used for creation and updates.
 *
 * @interface YTVideo
 *
 * @property {string} id - Unique identifier of the YouTube video (e.g., `"dQw4w9WgXcQ"`).
 *
 * @property {string} channelId - The unique identifier of the YouTube channel
 * that owns or published this video. References a {@link YTChannel.id}.
 *
 * @property {string} title - Human-readable title of the video, as displayed on YouTube.
 *
 * @property {string | null | undefined} [publishedAt] - ISO 8601 timestamp indicating when the
 * video was originally published on YouTube.
 * For example: `"2025-01-10T14:32:00Z"`.
 *
 * @property {string | null | undefined} [description] - Optional text description provided by
 * the uploader. May be `null` or omitted if unavailable.
 *
 * @property {string | null | undefined} [url] - Optional full YouTube URL for direct access to the video
 * (e.g., `"https://www.youtube.com/watch?v=dQw4w9WgXcQ"`).
 *
 * @example
 * ```ts
 * const video: YTVideo = {
 *   id: "dQw4w9WgXcQ",
 *   channelId: "UC123456789",
 *   title: "How to Learn TypeScript Fast",
 *   publishedAt: "2025-02-15T10:00:00Z",
 *   description: "A beginner-friendly guide to mastering TypeScript.",
 *   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * };
 * ```
 */
export interface YTVideo {
    id: string;
    channelId: string;
    title: string;
    publishedAt?: string | null;
    description?: string | null;
    url?: string | null;
}

/**
 * Represents a YouTube video along with its associated channel information.
 *
 * Extends {@link YTVideo} by including the full {@link YTChannel} object
 * corresponding to the video’s `channelId`.
 * This model is useful when you need both video and channel data in a single payload,
 * for example, when using the API parameter `view=with_channel`.
 *
 * @interface YTVideoWithChannel
 * @extends YTVideo
 *
 * @property {YTChannel} channel - The YouTube channel object that this video belongs to.
 *
 * @example
 * ```ts
 * const videoWithChannel: YTVideoWithChannel = {
 *   id: "dQw4w9WgXcQ",
 *   channelId: "UC123456789",
 *   title: "How to Learn TypeScript Fast",
 *   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
 *   channel: {
 *     id: "UC123456789",
 *     name: "Tech Tutorials",
 *     url: "https://www.youtube.com/@techtutorials"
 *   }
 * };
 * ```
 *
 * @remarks
 * - Ideal for views or components that need to display both the video and its
 *   channel metadata (e.g., thumbnails, channel name, link).
 * - Reduces the need for additional API calls to fetch channel data separately.
 */
export interface YTVideoWithChannel extends YTVideo {
    channel: YTChannel;
}

export interface YTVideoWithVisualizations extends YTVideo {
    visualizations: YTVideoVisualization[];
}

export interface YTVideoFull extends YTVideoWithChannel, YTVideoWithVisualizations {}