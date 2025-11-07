import type {GetAllParams} from "@/types";
import {useEffect, useState} from "react";
import {
    type YTVideoVisualization,
    type YTVideoVisualizationAPI,
    YTVideoVisualizationToAPICreate,
    YTVideoVisualizationToAPIUpdate
} from "@media-tracker/models";
import {axiosInstance} from "@/services";
import {mediaTrackerEndpoints} from "@media-tracker/constants";
import camelcaseKeys from "camelcase-keys";
import type {AxiosError} from "axios";

/**
 * Configuration options for {@link useYTVideoVisualizations}.
 */
interface UseYTVideoVisualizationOptions {
    /** Pagination, filtering and sorting options */
    getAllParams?: GetAllParams;
}

/**
 * **useYTVideoVisualizations** – Custom React hook for managing YouTube video visualizations.
 *
 * @description
 * Provides a complete stateful API for handling **YouTube video visualization records**
 * (`YTVideoVisualization`) within the Media Tracker system.
 *
 * This hook manages fetching, creating, updating, and deleting visualizations
 * (i.e., tracked views of YouTube videos), while handling loading and error states.
 *
 * ---
 * ### Features:
 * - Fetch all visualizations, or those belonging to a specific video.
 * - Create, update, and delete visualization records through the REST API.
 * - Automatic re-fetching when pagination, sorting, or view filters change.
 * - Automatically converts snake_case API responses to camelCase.
 * - Returns a unified interface compatible with context providers.
 *
 * ---
 * ### Dependencies:
 * - `axiosInstance` → Configured Axios client with base URL & interceptors.
 * - `mediaTrackerEndpoints` → Centralized endpoint constants.
 * - `camelcase-keys` → Utility for response normalization.
 * - Model converters:
 *   - `YTVideoVisualizationToAPICreate`
 *   - `YTVideoVisualizationToAPIUpdate`
 *
 * ---
 * ### Example:
 * ```tsx
 * import useYTVideoVisualizations from "@media-tracker/hooks/useYTVideoVisualizations";
 *
 * function VideoAnalytics({ videoId }: { videoId: string }) {
 *   const {
 *     videoVisualizations,
 *     loading,
 *     fetchVideoVisualizationsByVideo,
 *     createVideoVisualization,
 *   } = useYTVideoVisualizations();
 *
 *   useEffect(() => {
 *     void fetchVideoVisualizationsByVideo(videoId);
 *   }, [videoId]);
 *
 *   if (loading) return <p>Loading visualizations...</p>;
 *
 *   return (
 *     <ul>
 *       {videoVisualizations.map(v => (
 *         <li key={v.id}>{v.visualizationDate}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * ---
 * ### Behavior:
 * - On mount (and when pagination or sorting options change), the hook automatically
 *   triggers `fetchVideoVisualizations()`.
 * - Errors are caught, normalized, and exposed via `error`.
 * - All state updates are immutable to ensure React reactivity.
 *
 * ---
 * @param {UseYTVideoVisualizationOptions} [options] - Optional configuration for fetching behavior.
 * @param {GetAllParams} [options.getAllParams] - Optional pagination, filtering, and ordering options.
 *
 * @returns {object} Hook API
 * @returns {YTVideoVisualization[]} videoVisualizations - Current list of loaded visualizations.
 * @returns {YTVideoVisualization[]} videoVisualizationsByVideo - List of video visualizations from a specific video.
 * @returns {boolean} loading - Indicates ongoing fetch or mutation operations.
 * @returns {string | null} error - Descriptive message if an operation fails.
 * @returns {Function} fetchVideoVisualizations - Fetch all visualizations with optional filters.
 * @returns {Function} fetchVideoVisualizationsByVideo - Fetch visualizations for a specific video.
 * @returns {Function} createVideoVisualization - Create a new visualization record.
 * @returns {Function} updateVideoVisualization - Update an existing visualization record.
 * @returns {Function} deleteVideoVisualization - Delete a visualization record by ID.
 */
export default function useYTVideoVisualizations(options?: UseYTVideoVisualizationOptions) {
    const [videoVisualizations, setVideoVisualizations] = useState<YTVideoVisualization[]>([]);
    const [videoVisualizationsByVideo, setVideoVisualizationsByVideo] = useState<YTVideoVisualization[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches all YouTube video visualizations.
     *
     * @async
     * @param {UseYTVideoVisualizationOptions} [overrideOptions] - Optional parameters to override the hook’s default options.
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await fetchVideoVisualizations({ getAllParams: { limit: 50 } });
     * ```
     */
    const fetchVideoVisualizations = async (overrideOptions?: UseYTVideoVisualizationOptions): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const combinedOptions = { ...options, ...overrideOptions };
            const params = combinedOptions?.getAllParams;

            const res = await axiosInstance.get(mediaTrackerEndpoints.v1.youTube.videoVisualizations, {
                params
            });

            const formatted: YTVideoVisualization[] = camelcaseKeys(res.data, { deep: true });
            setVideoVisualizations(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching video visualizations");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches all visualizations associated with a specific video.
     *
     * @async
     * @param {string} videoId - The YouTube video ID whose visualizations to fetch.
     * @param {GetAllParams} [params] - Optional query parameters (pagination, sorting).
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await fetchVideoVisualizationsByVideo("abc123", { order_by: "desc" });
     * ```
     */
    const fetchVideoVisualizationsByVideo = async (videoId: string, params?: GetAllParams): Promise<void> => {
        if (!videoId) {
            setError("Video ID is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.get(
                `${mediaTrackerEndpoints.v1.youTube.videoVisualizations}video/${videoId}`,
                { params }
            );

            const formatted: YTVideoVisualization[] = camelcaseKeys(res.data, { deep: true });
            setVideoVisualizationsByVideo(formatted);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error fetching video visualizations by video");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Creates a new visualization record.
     *
     * @async
     * @param {Partial<YTVideoVisualization>} newVisualization - Visualization data to create.
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await createVideoVisualization({
     *   videoId: "abc123",
     *   visualizationDate: "2025-11-07T00:00:00Z"
     * });
     * ```
     */
    const createVideoVisualization = async (newVisualization: Partial<YTVideoVisualization>): Promise<void> => {
        try {
            const payload: YTVideoVisualizationAPI = YTVideoVisualizationToAPICreate(newVisualization);
            const res = await axiosInstance.post(mediaTrackerEndpoints.v1.youTube.videoVisualizations, payload);
            const formatted: YTVideoVisualization = camelcaseKeys(res.data, { deep: true });
            setVideoVisualizations(prev => [...prev, formatted]);
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error creating video visualization");
        }
    };

    /**
     * Updates an existing visualization record.
     *
     * @async
     * @param {number} id - The visualization record ID to update.
     * @param {Partial<YTVideoVisualization>} updatedData - Partial visualization data to update.
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await updateVideoVisualization(12, { resume: 240 });
     * ```
     */
    const updateVideoVisualization = async (id: number, updatedData: Partial<YTVideoVisualization>): Promise<void> => {
        try {
            const payload: Partial<YTVideoVisualizationAPI> = YTVideoVisualizationToAPIUpdate(updatedData);
            const res = await axiosInstance.put(`${mediaTrackerEndpoints.v1.youTube.videoVisualizations}${id}`, payload);
            const formatted: YTVideoVisualization = camelcaseKeys(res.data, { deep: true });
            setVideoVisualizations(prev => prev.map(vi => (vi.id === id ? formatted : vi)));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error updating video visualization");
        }
    };

    /**
     * Deletes a visualization record by its ID.
     *
     * @async
     * @param {number} id - The ID of the visualization to delete.
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await deleteVideoVisualization(15);
     * ```
     */
    const deleteVideoVisualization = async (id: number): Promise<void> => {
        try {
            await axiosInstance.delete(`${mediaTrackerEndpoints.v1.youTube.videoVisualizations}${id}`);
            setVideoVisualizations(prev => prev.filter(vi => vi.id !== id));
        } catch (err: any) {
            const error = err as AxiosError<{ detail?: string }>;
            setError(error.response?.data?.detail || "Error deleting video visualization");
        }
    };

    /**
     * Automatically fetch video visualizations on mount or when pagination/view/sorting changes.
     */
    useEffect((): void => {
        void fetchVideoVisualizations();
    }, [
        options?.getAllParams?.offset,
        options?.getAllParams?.limit,
        options?.getAllParams?.view,
        options?.getAllParams?.order_by
    ]);

    return {
        videoVisualizations,
        videoVisualizationsByVideo,
        loading,
        error,
        fetchVideoVisualizations,
        fetchVideoVisualizationsByVideo,
        createVideoVisualization,
        updateVideoVisualization,
        deleteVideoVisualization,
    };
}