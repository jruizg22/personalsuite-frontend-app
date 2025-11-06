import {useEffect, useState} from "react";
import {type AxiosError} from "axios";
import {
    type YTVideo,
    type YTVideoAPI,
    YTVideoToAPICreate,
    YTVideoToAPIUpdate,
    type YTVideoWithChannel
} from "@media-tracker/models";
import {axiosInstance} from "@/services";
import camelcaseKeys from "camelcase-keys";
import type {GetAllParams} from "@/types";
import {mediaTrackerEndpoints, views} from "@media-tracker/constants";

/**
 * Options for filtering or paginating the YouTube videos request.
 */
interface UseYTVideosOptions {
    /** Pagination, filtering and sorting options */
    getAllParams?: GetAllParams;
}

/**
 * React hook for managing YouTube Videos CRUD operations.
 *
 * This hook provides a fully reactive state for interacting with
 * the YouTube Videos API through a preconfigured Axios instance.
 *
 * Features:
 * - Fetch videos from the API with optional pagination, filtering, and sorting.
 * - Create new videos.
 * - Update existing videos.
 * - Delete videos.
 * - Automatically converts API response keys from `snake_case` to `camelCase`.
 * - Keeps the local React state (`videos`, `loading`, `error`) in sync automatically.
 *
 * @param {UseYTVideosOptions} [options] - Optional configuration for initial request.
 *
 * @returns {{
 *   videos: YTVideo[]; // The current list of videos, optionally sorted.
 *   loading: boolean; // `true` while fetching data, `false` otherwise.
 *   error: string | null; // Error message if a request fails.
 *   fetchVideos: (overrideOptions?: UseYTVideosOptions) => Promise<void>; // Refetch videos with optional overrides.
 *   createVideo: (newVideo: Partial<YTVideo>) => Promise<void>; // Create a new video and update local state.
 *   updateVideo: (id: string, updatedData: Partial<YTVideo>) => Promise<void>; // Update an existing video and update local state.
 *   deleteVideo: (id: string) => Promise<void>; // Delete a video and remove it from local state.
 * }}
 *
 * @example
 * ```tsx
 * import useYTVideos from "@media-tracker/hooks/youtube";
 *
 * function VideosList() {
 *   const { videos, loading, error, createVideo, deleteVideo } = useYTVideos({
 *     getAllParams: {offset: 0, limit: 100, view: 'basic', order_by: 'asc'}
 *   });
 *
 *   if (loading) return <p>Loading...</p>;
 *   if (error) return <p>Error: {error}</p>;
 *
 *   return (
 *     <div>
 *       <button onClick={() => createVideo({ name: "New Video" })}>Add Video</button>
 *       <ul>
 *         {videos.map(ch => (
 *           <li key={ch.id}>
 *             {ch.name}
 *             <button onClick={() => deleteVideo(ch.id)}>Delete</button>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 *
 */
export default function useYTVideos(options?: UseYTVideosOptions) {
    const [videos, setVideos] = useState<YTVideo[]>([]);
    const [videosWithChannel, setVideosWithChannel] = useState<YTVideoWithChannel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches all YouTube videos from the API.
     *
     * Automatically updates the local `videos` state and manages
     * `loading` / `error` lifecycle flags.
     *
     * @async
     * @param {UseYTVideosOptions} [overrideOptions] - Optional overrides for the request.
     */
    const fetchVideos = async (overrideOptions?: UseYTVideosOptions): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const combinedOptions = { ...options, ...overrideOptions };
            const params = combinedOptions?.getAllParams;

            const res = await axiosInstance.get(mediaTrackerEndpoints.v1.youTube.videos, {
                params
            });

            const formatted: YTVideo[] = camelcaseKeys(res.data, { deep: true });
            setVideos(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching videos");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches all YouTube videos including their associated channel data.
     *
     * This function retrieves a list of videos from the API, forcing the `view`
     * parameter to be `views.with_channel` to ensure that each video includes
     * its related channel information.
     *
     * The function automatically updates local React state (`videos`, `loading`, `error`)
     * and handles the full request lifecycle.
     *
     * @async
     * @function fetchVideosWithChannel
     * @param {GetAllParams} [params] - Optional query parameters such as pagination or ordering.
     * These parameters will be merged with the forced `view` option (`views.with_channel`).
     *
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @example
     * ```tsx
     * import { views } from "@media-tracker/constants";
     *
     * async function loadVideos() {
     *   await fetchVideosWithChannel({
     *     offset: 0,
     *     limit: 50,
     *     order_by: "desc"
     *   });
     * }
     * ```
     *
     * @remarks
     * - This method should be used when you need both video and channel data in a single response.
     * - The `view` parameter passed in `params` will always be overridden to `"with_channel"`.
     * - Automatically converts all response keys from `snake_case` to `camelCase`.
     * - Updates the `videos` state with the formatted data.
     * - In case of an error, sets a user-friendly message in `error`.
     */
    const fetchVideosWithChannel = async (params?: GetAllParams): Promise<void> => {
        setLoading(true);
        setError(null);

        const finalParams: GetAllParams = {
            ...params,
            view: views.withChannel,
        };

        try {
            const res = await axiosInstance.get(
                mediaTrackerEndpoints.v1.youTube.videos,
                { params: finalParams }
            );

            const formatted: YTVideoWithChannel[] = camelcaseKeys(res.data, { deep: true });
            setVideosWithChannel(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching videos by channel");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches videos belonging to a specific YouTube channel.
     *
     * @async
     * @param {string} channelId - The unique identifier of the channel.
     * @param {GetAllParams} [params] - Optional pagination or sorting parameters.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - This function calls the endpoint `/channel/{channel_id}`.
     * - Automatically updates the local `videos` state.
     */
    const fetchVideosByChannel = async (channelId: string, params?: GetAllParams): Promise<void> => {
        if (!channelId) {
            setError("Channel ID is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.get(
                `${mediaTrackerEndpoints.v1.youTube.videos}channel/${channelId}`,
                { params }
            );

            const formatted: YTVideo[] = camelcaseKeys(res.data, { deep: true });
            setVideos(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching videos by channel");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Creates a new YouTube video and appends it to the local state.
     *
     * @async
     * @param {Partial<YTVideo>} newVideo - The video data to create. Must include required fields: `id`, `channelId`, `title`.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Uses `YTVideoToAPICreate` to transform the payload into the API format (`snake_case`).
     * - Automatically merges the new video into local state upon success.
     * - Sets an error message in case of failure.
     */
    const createVideo = async (newVideo: Partial<YTVideo>): Promise<void> => {
        try {
            const payload: YTVideoAPI = YTVideoToAPICreate(newVideo);
            const res = await axiosInstance.post(mediaTrackerEndpoints.v1.youTube.videos, payload);
            const formatted: YTVideo = camelcaseKeys(res.data, { deep: true });
            setVideos(prev => [...prev, formatted]);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error creating video");
        }
    };

    /**
     * Updates an existing YouTube video by ID.
     *
     * @async
     * @param {string} id - The video's unique identifier.
     * @param {Partial<YTVideo>} updatedData - The fields to update. Only provided fields will be sent to the API.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Uses `YTVideoToAPIUpdate` to transform only the provided fields to API format (`snake_case`).
     * - Automatically replaces the old video with the updated one in local state.
     * - Sets an error message in case of failure.
     */
    const updateVideo = async (id: string, updatedData: Partial<YTVideo>): Promise<void> => {
        try {
            const payload: Partial<YTVideoAPI> = YTVideoToAPIUpdate(updatedData);
            const res = await axiosInstance.put(`${mediaTrackerEndpoints.v1.youTube.videos}${id}`, payload);
            const formatted: YTVideo = camelcaseKeys(res.data, { deep: true });
            setVideos(prev => prev.map(ch => (ch.id === id ? formatted : ch)));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error updating video");
        }
    };

    /**
     * Deletes a YouTube video by ID.
     *
     * Automatically removes the deleted video from local state.
     *
     * @async
     * @param {string} id - The unique identifier of the video to delete.
     * @returns {Promise<void>} Resolves when the request completes.
     *
     * @remarks
     * - Removes the deleted video locally to keep the UI responsive.
     * - Sets an error message if the deletion fails.
     */
    const deleteVideo = async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`${mediaTrackerEndpoints.v1.youTube.videos}${id}`);
            setVideos(prev => prev.filter(ch => ch.id !== id));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error deleting video");
        }
    };

    /**
     * Automatically fetch videos on mount or when pagination/view/sorting changes.
     */
    useEffect((): void => {
        void fetchVideos();
    }, [
        options?.getAllParams?.offset,
        options?.getAllParams?.limit,
        options?.getAllParams?.view,
        options?.getAllParams?.order_by
    ]);

    return {
        videos,
        videosWithChannel,
        loading,
        error,
        fetchVideos,
        fetchVideosWithChannel,
        fetchVideosByChannel,
        createVideo,
        updateVideo,
        deleteVideo,
    };
}