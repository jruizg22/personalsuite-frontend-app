import type {YTVideo} from "@media-tracker/models";

/**
 * Represents a YouTube channel entity within the application.
 *
 * This interface defines the structure of a YouTube channel object,
 * typically returned from the backend API or used when creating or updating channels.
 *
 * @interface YTChannel
 *
 * @property {string} id - Unique identifier of the YouTube channel.
 *
 * @property {string} name - Human-readable name of the channel.
 *
 * @property {string | null | undefined} [description] - Optional text description of the channel,
 * often provided by the channel owner. May be `null` or omitted if not available.
 *
 * @property {string | null | undefined} [url] - Optional full YouTube URL of the channel
 * (e.g., `"https://www.youtube.com/@channelname"`). May be `null` if not yet registered or fetched.
 *
 * @property {string | null | undefined} [createdAt] - ISO 8601 timestamp of when the channel
 * was created in the database or registered in the system.
 * For example: `"2025-03-04T12:30:00Z"`.
 *
 * @example
 * ```ts
 * const channel: YTChannel = {
 *   id: "UC123456789",
 *   name: "Tech Tutorials",
 *   description: "Educational channel about software development",
 *   url: "https://www.youtube.com/@techtutorials",
 *   createdAt: "2025-01-10T08:45:00Z"
 * };
 * ```
 */
export interface YTChannel {
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    createdAt?: string | null;
}

/**
 * Represents a YouTube channel along with its associated videos.
 *
 * Extends {@link YTChannel} to include a nested collection of related
 * {@link YTVideo} objects. This model is commonly used in “expanded view”
 * API responses or in components that require both channel and video data.
 *
 * @interface YTChannelWithVideos
 * @extends YTChannel
 *
 * @property {YTVideo[]} videos - A list of YouTube videos belonging to this channel.
 * Each video follows the {@link YTVideo} interface.
 *
 * @example
 * ```ts
 * const channelWithVideos: YTChannelWithVideos = {
 *   id: "UC123456789",
 *   name: "Tech Tutorials",
 *   url: "https://www.youtube.com/@techtutorials",
 *   videos: [
 *     { id: "abc123", title: "Intro to React", channelId: "UC123456789" },
 *     { id: "def456", title: "Understanding TypeScript", channelId: "UC123456789" }
 *   ]
 * };
 * ```
 *
 * @remarks
 * - This structure is useful for efficiently rendering nested lists
 *   (e.g., channels and their videos) without redundant API calls.
 * - Typically returned when using the `view=with_videos` parameter in the API.
 */
export interface YTChannelWithVideos extends YTChannel {
    videos: YTVideo[];
}