import {useEffect, useState} from "react";
import {type AxiosError} from "axios";
import type {YTChannel, YTChannelWithVideos} from "@media-tracker/models";
import {axiosInstance} from "@/services";
import camelcaseKeys from "camelcase-keys";
import type {GetAllParams} from "@/types";
import {mediaTrackerEndpoints, views} from "@media-tracker/constants";

/**
 * Options for filtering or paginating the YouTube channels request.
 */
interface UseYTChannelsOptions {
    /** Pagination, filtering and sorting options */
    getAllParams?: GetAllParams;
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
 *
 * @param {UseYTChannelsOptions} [options] - Optional configuration for initial request.
 *
 * @returns {{
 *   channels: YTChannel[]; // The current list of channels.
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
 *     getAllParams: {offset: 0, limit: 100, view: 'basic', order_by: 'asc'}
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
 */
export default function useYTChannels(options?: UseYTChannelsOptions) {
    const [channels, setChannels] = useState<YTChannel[]>([]);
    const [channelsWithVideos, setChannelsWithVideos] = useState<YTChannelWithVideos[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            const combinedOptions = { ...options, ...overrideOptions };
            const params = combinedOptions?.getAllParams;

            const res = await axiosInstance.get(mediaTrackerEndpoints.v1.youTube.channels, {
                params
            });

            const formatted: YTChannel[] = camelcaseKeys(res.data, { deep: true });
            setChannels(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching channels");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches all YouTube channels along with their associated videos.
     *
     * This function retrieves channels from the API, where each channel includes
     * a nested list of its corresponding YouTube videos. It’s especially useful
     * for scenarios where you want to display channels grouped with their videos,
     * avoiding redundant or repeated channel data in memory.
     *
     * The function automatically updates the local React state (`channelsWithVideos`, `loading`, `error`)
     * and handles the entire request lifecycle.
     *
     * @async
     * @function fetchChannelsWithVideos
     * @param {UseYTChannelsOptions} [overrideOptions] - Optional parameters to override the defaults,
     * including pagination or sorting options.
     *
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @example
     * ```tsx
     * import useYTChannels from "@media-tracker/hooks/youtube";
     * import { views } from "@media-tracker/constants";
     *
     * function ChannelsWithVideos() {
     *   const { channelsWithVideos, fetchChannelsWithVideos } = useYTChannels();
     *
     *   useEffect(() => {
     *     void fetchChannelsWithVideos({
     *       getAllParams: { offset: 0, limit: 50, view: views.with_videos, order_by: "asc" }
     *     });
     *   }, []);
     *
     *   return (
     *     <div>
     *       {channelsWithVideos.map(ch => (
     *         <div key={ch.id}>
     *           <h3>{ch.name}</h3>
     *           <ul>
     *             {ch.videos.map(v => (
     *               <li key={v.id}>{v.title}</li>
     *             ))}
     *           </ul>
     *         </div>
     *       ))}
     *     </div>
     *   );
     * }
     * ```
     *
     * @remarks
     * - This method assumes the backend supports a `view` (e.g. `"with_videos"`) that expands
     *   each channel with its related video list.
     * - Automatically converts response keys to `camelCase`.
     * - Useful for grouped rendering or data visualization.
     */
    const fetchChannelsWithVideos = async (overrideOptions?: UseYTChannelsOptions): Promise<void> => {
        setLoading(true);
        setError(null);

        const combinedOptions = { ...options, ...overrideOptions };
        const finalParams: GetAllParams = {
            ...combinedOptions?.getAllParams,
            view: views.withVideos
        };

        try {
            const res = await axiosInstance.get(mediaTrackerEndpoints.v1.youTube.channels, {
                params: finalParams
            });

            const formatted: YTChannelWithVideos[] = camelcaseKeys(res.data, { deep: true });
            setChannelsWithVideos(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching channels with videos");
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
            const res = await axiosInstance.post(mediaTrackerEndpoints.v1.youTube.channels, newChannel);
            const formatted: YTChannel = camelcaseKeys(res.data, { deep: true });
            setChannels(prev => [...prev, formatted]);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error creating channel");
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
            const res = await axiosInstance.put(`${mediaTrackerEndpoints.v1.youTube.channels}${id}`, updatedData);
            const formatted: YTChannel = camelcaseKeys(res.data, { deep: true });
            setChannels(prev => prev.map(ch => (ch.id === id ? formatted : ch)));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error updating channel");
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
            await axiosInstance.delete(`${mediaTrackerEndpoints.v1.youTube.channels}${id}`);
            setChannels(prev => prev.filter(ch => ch.id !== id));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error deleting channel");
        }
    };

    /**
     * Automatically fetch channels on mount or when pagination/view/sorting changes.
     */
    useEffect((): void => {
        void fetchChannelsWithVideos();
    }, [
        options?.getAllParams?.offset,
        options?.getAllParams?.limit,
        options?.getAllParams?.view,
        options?.getAllParams?.order_by
    ]);

    return {
        channels,
        channelsWithVideos,
        loading,
        error,
        fetchChannels,
        fetchChannelsWithVideos,
        createChannel,
        updateChannel,
        deleteChannel,
    };
}