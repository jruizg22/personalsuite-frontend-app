import {useEffect, useState} from "react";
import axios from "axios";
import type {YTChannelView, YTChannel} from "@media-tracker/models";
import {axiosInstance} from "@/services";
import camelcaseKeys from "camelcase-keys";
import {useSortList} from "@/hooks";
import type {SortOrder} from "@/types";

/**
 * Options for filtering or paginating the YouTube channels request.
 */
interface UseYTChannelsOptions {
    /** Optional pagination offset (number of items to skip). */
    offset?: number;

    /** Optional limit on how many items to retrieve. */
    limit?: number;

    /** Optional view filter (custom enum/type defined in the model). */
    view?: YTChannelView;

    /**
     * Optional sorting configuration.
     * - `sortBy`: The field of `YTChannel` to sort by (e.g., `"name"` or `"createdAt"`).
     * - `sortOrder`: `"asc"` for ascending or `"desc"` for descending order.
     *
     * Example:
     * ```ts
     * sort: { sortBy: "name", sortOrder: "asc" }
     * ```
     */
    sort?: {
        sortBy: keyof YTChannel;
        sortOrder: SortOrder;
    }
}

/**
 * React hook for managing YouTube Channels CRUD operations.
 *
 * This hook provides a fully reactive state for interacting with
 * the YouTube Channels API through a preconfigured Axios instance.
 *
 * Features:
 * - Fetch channels from the API with optional pagination, filtering, and sorting.
 * - Create new channels.
 * - Update existing channels.
 * - Delete channels.
 * - Automatically converts API response keys from `snake_case` to `camelCase`.
 * - Keeps the local React state (`channels`, `loading`, `error`) in sync automatically.
 * - Supports optional sorting of channels locally.
 *
 * @param {UseYTChannelsOptions} [options] - Optional configuration for initial request.
 *
 * @returns {{
 *   channels: YTChannel[]; // The current list of channels, optionally sorted.
 *   loading: boolean; // `true` while fetching data, `false` otherwise.
 *   error: string | null; // Error message if a request fails.
 *   fetchChannels: (overrideOptions?: UseYTChannelsOptions) => Promise<void>; // Refetch channels with optional overrides.
 *   createChannel: (newChannel: Partial<YTChannel>) => Promise<void>; // Create a new channel and update local state.
 *   updateChannel: (id: string, updatedData: Partial<YTChannel>) => Promise<void>; // Update an existing channel and update local state.
 *   deleteChannel: (id: string) => Promise<void>; // Delete a channel and remove it from local state.
 * }}
 *
 * @example
 * ```tsx
 * import useYTChannels from "@media-tracker/hooks/youtube";
 *
 * function ChannelsList() {
 *   const { channels, loading, error, createChannel, deleteChannel } = useYTChannels({
 *     sort: { sortBy: "name", sortOrder: "asc" }
 *   });
 *
 *   if (loading) return <p>Loading...</p>;
 *   if (error) return <p>Error: {error}</p>;
 *
 *   return (
 *     <div>
 *       <button onClick={() => createChannel({ name: "New Channel" })}>Add Channel</button>
 *       <ul>
 *         {channels.map(ch => (
 *           <li key={ch.id}>
 *             {ch.name}
 *             <button onClick={() => deleteChannel(ch.id)}>Delete</button>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Sorting is applied locally after fetching, so newly created or updated channels
 *   will also appear in the correct order if `sort` is provided.
 * - Null, undefined, or empty string values are always placed at the end in ascending
 *   order and at the beginning in descending order.
 */
export default function useYTChannels(options?: UseYTChannelsOptions) {
    const ytChannelsURL: string = "/media_tracker/api/v1/youtube/channels/"

    const [channels, setChannels] = useState<YTChannel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sortedChannels: YTChannel[] = useSortList(channels, {
        sortBy: options?.sort?.sortBy,
        sortOrder: options?.sort?.sortOrder
    });

    /**
     * Fetches YouTube channels from the API, optionally with pagination or filters.
     *
     * Automatically updates the local `channels` state, and manages
     * `loading` and `error` lifecycle flags.
     *
     * @async
     * @param {UseYTChannelsOptions} [overrideOptions] - Optional parameters to override the defaults.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Converts all response keys to camelCase.
     * - Accepts either an array of channels or an object with an `items` field.
     * - Sets a user-friendly error message in case of failure.
     */
    const fetchChannels = async (overrideOptions?: UseYTChannelsOptions): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const params = { ...options, ...overrideOptions };
            const res = await axiosInstance.get(ytChannelsURL, { params });

            const formatted: YTChannel[] = camelcaseKeys(res.data, { deep: true });
            setChannels(formatted);
        } catch (err: any) {
            const message: string = axios.isAxiosError(err) && err.response?.data?.detail
                ? err.response.data.detail
                : "Unknown error";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Creates a new YouTube channel and appends it to the local state.
     *
     * @async
     * @param {Partial<YTChannel>} newChannel - The channel data to create.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Automatically merges the new channel into local state upon success.
     * - Sets an error message in case of failure.
     */
    const createChannel = async (newChannel: Partial<YTChannel>): Promise<void> => {
        try {
            const res = await axiosInstance.post(ytChannelsURL, newChannel);
            const formatted: YTChannel = camelcaseKeys(res.data, { deep: true });
            setChannels(prev => [...prev, formatted]);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Error creating channel");
        }
    };

    /**
     * Updates an existing YouTube channel by ID.
     *
     * Automatically updates the corresponding item in the local state.
     *
     * @async
     * @param {string} id - The channel's unique identifier.
     * @param {Partial<YTChannel>} updatedData - The fields to update.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Automatically replaces the old channel with the updated one in state.
     * - Sets an error message in case of failure.
     */
    const updateChannel = async (id: string, updatedData: Partial<YTChannel>): Promise<void> => {
        try {
            const res = await axiosInstance.put(`${ytChannelsURL}${id}`, updatedData);
            const formatted: YTChannel = camelcaseKeys(res.data, { deep: true });
            setChannels(prev => prev.map(ch => (ch.id === id ? formatted : ch)));
        } catch (err: any) {
            setError(err.response?.data?.detail || "Error updating channel");
        }
    };

    /**
     * Deletes a YouTube channel by ID.
     *
     * Automatically removes the deleted channel from local state.
     *
     * @async
     * @param {string} id - The unique identifier of the channel to delete.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Removes the deleted channel locally to keep the UI responsive.
     * - Sets an error message if the deletion fails.
     */
    const deleteChannel = async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`${ytChannelsURL}${id}`);
            setChannels(prev => prev.filter(ch => ch.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.detail || "Error deleting channel");
        }
    };

    /**
     * Automatically fetch channels on mount or when pagination/view changes.
     */
    useEffect((): void => {
        void fetchChannels();
    }, [options?.offset, options?.limit, options?.view]);

    return {
        channels: sortedChannels,
        loading,
        error,
        fetchChannels,
        createChannel,
        updateChannel,
        deleteChannel,
    };
}