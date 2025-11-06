import type {YTChannel} from "@media-tracker/models";

/**
 * API representation of a YouTube channel entity.
 *
 * This interface defines the data structure expected by the backend API.
 * It uses `snake_case` property names to match REST conventions and ensure
 * consistency with backend models (e.g., FastAPI, Django, etc.).
 *
 * @interface YTChannelAPI
 *
 * @property {string} id - Unique identifier of the channel (e.g. YouTube channel ID).
 * @property {string} name - Display name of the channel.
 * @property {string | null} [description] - Optional description of the channel.
 * @property {string | null} [url] - The YouTube channel URL.
 * @property {string | null} [created_at] - ISO 8601 formatted date when the channel was created or first tracked.
 *
 * @remarks
 * This API model differs from the frontend {@link YTChannel} interface,
 * which uses `camelCase` keys and may include additional computed fields or relations.
 */
export interface YTChannelAPI {
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    created_at?: string | null;
}

/**
 * Converts a frontend {@link YTChannel} object to its API-compatible representation
 * for creation (`POST` requests).
 *
 * Ensures required fields are present and formats property names from `camelCase`
 * to `snake_case` for backend compatibility.
 *
 * @function YTChannelToAPICreate
 * @param {Partial<YTChannel>} channel - Partial `YTChannel` object from the frontend.
 * Must include at least `id` and `name`.
 * @returns {YTChannelAPI} The API-ready channel object formatted with `snake_case` keys.
 *
 * @example
 * ```ts
 * const channel: Partial<YTChannel> = {
 *   id: "UCxyz",
 *   name: "Tech World",
 *   url: "https://www.youtube.com/@TechWorld",
 *   createdAt: "2025-01-15"
 * };
 *
 * const payload = YTChannelToAPICreate(channel);
 * // {
 * //   id: "UCxyz",
 * //   name: "Tech World",
 * //   url: "https://www.youtube.com/@TechWorld",
 * //   description: null,
 * //   created_at: "2025-01-15"
 * // }
 * ```
 */
export const YTChannelToAPICreate = (channel: Partial<YTChannel>): YTChannelAPI => ({
    id: channel.id!,
    name: channel.name!,
    description: channel.description ?? null,
    url: channel.url ?? null,
    created_at: channel.createdAt ?? null
});

/**
 * Converts a frontend {@link YTChannel} object to a partial API payload
 * for updating existing channels (`PUT` or `PATCH` requests).
 *
 * Only the defined fields are included in the result, allowing for
 * efficient updates where only changed data is sent to the backend.
 *
 * @function YTChannelToAPIUpdate
 * @param {Partial<YTChannel>} channel - Partial `YTChannel` object with updated fields.
 * @returns {Partial<YTChannelAPI>} A `snake_case` formatted object containing only provided fields.
 *
 * @example
 * ```ts
 * const updates: Partial<YTChannel> = {
 *   name: "Tech World Plus",
 *   description: "Updated channel description."
 * };
 *
 * const payload = YTChannelToAPIUpdate(updates);
 * // {
 * //   name: "Tech World Plus",
 * //   description: "Updated channel description."
 * // }
 * ```
 *
 * @remarks
 * - Fields with `undefined` are omitted from the output.
 * - This function is typically used before sending update requests to the backend.
 */
export const YTChannelToAPIUpdate = (channel: Partial<YTChannel>): Partial<YTChannelAPI> => ({
    ...(channel.id && { id: channel.id }),
    ...(channel.name && { name: channel.name }),
    ...(channel.description !== undefined && { description: channel.description }),
    ...(channel.url !== undefined && { url: channel.url }),
    ...(channel.createdAt !== undefined && { created_at: channel.createdAt })
});
