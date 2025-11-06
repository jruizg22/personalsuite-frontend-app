import type {YTVideo} from "@media-tracker/models";

/**
 * API representation of a YouTube video entity.
 *
 * This interface defines the data structure expected by the backend API.
 * It uses `snake_case` naming to match typical REST conventions.
 *
 * @interface YTVideoAPI
 *
 * @property {string} id - Unique identifier of the video (e.g. YouTube video ID).
 * @property {string} channel_id - ID of the channel the video belongs to.
 * @property {string} title - Title of the video.
 * @property {string | null} [published_at] - Date when the video was published (ISO 8601 format).
 * @property {string | null} [description] - Optional description text for the video.
 * @property {string | null} [url] - Full URL of the video.
 *
 * @remarks
 * This structure is distinct from the frontend `YTVideo` model, which uses `camelCase`
 * property names and may include additional computed fields.
 */
export interface YTVideoAPI {
    id: string;
    channel_id: string;
    title: string;
    published_at?: string | null;
    description?: string | null;
    url?: string | null;
}

/**
 * Converts a frontend {@link YTVideo} object to its API-compatible representation
 * for creation (`POST` requests).
 *
 * Ensures all required fields are present and converts property names from `camelCase`
 * to `snake_case` as expected by the backend.
 *
 * @function YTVideoToAPICreate
 * @param {Partial<YTVideo>} video - Partial `YTVideo` object from the frontend.
 * Must include `id`, `channelId`, and `title`.
 * @returns {YTVideoAPI} The API-ready object formatted with `snake_case` keys.
 *
 * @example
 * ```ts
 * const video: Partial<YTVideo> = {
 *   id: "abc123",
 *   channelId: "UCxyz",
 *   title: "My Video",
 *   publishedAt: "2025-11-06",
 * };
 *
 * const payload = YTVideoToAPICreate(video);
 * // {
 * //   id: "abc123",
 * //   channel_id: "UCxyz",
 * //   title: "My Video",
 * //   published_at: "2025-11-06",
 * //   description: null,
 * //   url: null
 * // }
 * ```
 */
export const YTVideoToAPICreate = (video: Partial<YTVideo>): YTVideoAPI => ({
    id: video.id!,
    channel_id: video.channelId!,
    title: video.title!,
    published_at: video.publishedAt ?? null,
    description: video.description ?? null,
    url: video.url ?? null,
});

/**
 * Converts a frontend {@link YTVideo} object to a partial API payload
 * suitable for updating an existing video (`PUT` or `PATCH` requests).
 *
 * Only the defined fields are included in the output, allowing for
 * lightweight updates where only changed values are sent.
 *
 * @function YTVideoToAPIUpdate
 * @param {Partial<YTVideo>} video - Partial `YTVideo` object containing updated fields.
 * @returns {Partial<YTVideoAPI>} An object with only the provided fields,
 * formatted in `snake_case` for API compatibility.
 *
 * @example
 * ```ts
 * const updates: Partial<YTVideo> = {
 *   title: "Updated title",
 *   description: "New description",
 * };
 *
 * const payload = YTVideoToAPIUpdate(updates);
 * // {
 * //   title: "Updated title",
 * //   description: "New description"
 * // }
 * ```
 *
 * @remarks
 * - Fields not included in the `video` object are omitted from the result.
 * - This function is typically used before sending `PUT` or `PATCH` requests to the backend.
 */
export const YTVideoToAPIUpdate = (video: Partial<YTVideo>): Partial<YTVideoAPI> => ({
    ...(video.id && { id: video.id }),
    ...(video.channelId && { channel_id: video.channelId }),
    ...(video.title && { title: video.title }),
    ...(video.publishedAt !== undefined && { published_at: video.publishedAt }),
    ...(video.description !== undefined && { description: video.description }),
    ...(video.url !== undefined && { url: video.url }),
});