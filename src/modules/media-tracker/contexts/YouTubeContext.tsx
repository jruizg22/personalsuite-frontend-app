import {createContext, type JSX, type ReactNode, useContext, useMemo} from "react";
import {useYTChannels, useYTVideos, useYTVideoVisualizations} from "@media-tracker/hooks";
import type {YTChannel, YTVideo, YTVideoFull, YTVideoVisualization} from "@media-tracker/models";

/**
 * Context value structure for YouTube data and CRUD operations.
 * Centralizes access to channels, videos, and combined views.
 */
interface YouTubeContextValue {
    /** Normalized & derived data */
    channels: YTChannel[];
    videos: YTVideo[];
    videoVisualizations: YTVideoVisualization[];
    videosFull: YTVideoFull[];

    /** State flags */
    loading: boolean;
    error: string | null;

    // CRUD: Channels
    fetchChannels: ReturnType<typeof useYTChannels>["fetchChannels"];
    createChannel: ReturnType<typeof useYTChannels>["createChannel"];
    updateChannel: ReturnType<typeof useYTChannels>["updateChannel"];
    deleteChannel: ReturnType<typeof useYTChannels>["deleteChannel"];

    // CRUD: Videos
    fetchVideos: ReturnType<typeof useYTVideos>["fetchVideos"];
    fetchVideosByChannel: ReturnType<typeof useYTVideos>["fetchVideosByChannel"];
    createVideo: ReturnType<typeof useYTVideos>["createVideo"];
    updateVideo: ReturnType<typeof useYTVideos>["updateVideo"];
    deleteVideo: ReturnType<typeof useYTVideos>["deleteVideo"];

    // CRUD: Video visualizations
    fetchVideoVisualizations: ReturnType<typeof useYTVideoVisualizations>["fetchVideoVisualizations"];
    fetchVideoVisualizationsByVideo: ReturnType<typeof useYTVideoVisualizations>["fetchVideoVisualizationsByVideo"];
    createVideoVisualization: ReturnType<typeof useYTVideoVisualizations>["createVideoVisualization"];
    updateVideoVisualization: ReturnType<typeof useYTVideoVisualizations>["updateVideoVisualization"];
    deleteVideoVisualization: ReturnType<typeof useYTVideoVisualizations>["deleteVideoVisualization"];
}

/**
 * React context that exposes a unified interface for all YouTube-related data.
 * Combines data from `useYTChannels` and `useYTVideos`, and derives
 * a `channelsWithVideos` view that automatically stays in sync.
 */
const YouTubeContext = createContext<YouTubeContextValue | null>(null);

/**
 * Provider that manages global YouTube state and CRUD operations.
 *
 * It automatically:
 * - Loads initial data for channels and videos.
 * - Merges `channels` and `videos` into a single derived view.
 * - Exposes all CRUD methods for use throughout the app.
 */
export function YouTubeProvider({ children }: { children: ReactNode }): JSX.Element {
    const ytChannels = useYTChannels();
    const ytVideos = useYTVideos();
    const ytVideoVisualizations = useYTVideoVisualizations();

    // Unified flags
    const loading: boolean = ytChannels.loading || ytVideos.loading;
    const error: string | null = ytChannels.error || ytVideos.error;

    /**
     * Memoized list of YouTube channels.
     *
     * @description
     * Derives a shallow-copied array of channels from the `useYTChannels` hook
     * to ensure referential stability and avoid unintended side effects.
     *
     * ---
     * ### Why memoize?
     * React’s `useMemo` ensures that the array reference only changes when
     * `ytChannels.channels` updates, preventing unnecessary re-renders
     * in components consuming this context.
     *
     * @dependencies `[ytChannels.channels]`
     * @returns {YTChannel[]} Stable, shallow-copied list of YouTube channels.
     */
    const channels: YTChannel[] = useMemo<YTChannel[]>((): YTChannel[] => {
        return ytChannels.channels.map(ch => ({
            ...ch
        }));
    }, [ytChannels.channels]);

    /**
     * Memoized list of YouTube videos.
     *
     * @description
     * Creates a shallow-copied array of videos from the `useYTVideos` hook.
     * This ensures that the `videos` array remains referentially stable,
     * allowing dependent `useMemo` computations (like `videosFull`)
     * to only re-run when the underlying data changes.
     *
     * @dependencies `[ytVideos.videos]`
     * @returns {YTVideo[]} Stable, shallow-copied list of YouTube videos.
     */
    const videos: YTVideo[] = useMemo<YTVideo[]>((): YTVideo[] => {
        return ytVideos.videos.map(vi => ({
            ...vi
        }));
    }, [ytVideos.videos]);

    /**
     * Memoized list of YouTube video visualizations.
     *
     * @description
     * Derives a shallow-copied list of all video visualizations
     * from the `useYTVideoVisualizations` hook.
     * This guarantees consistency and referential stability when
     * combining visualizations into `videosFull`.
     *
     * @dependencies `[ytVideoVisualizations.videoVisualizations]`
     * @returns {YTVideoVisualization[]} Stable list of video visualizations.
     */
    const videoVisualizations: YTVideoVisualization[] = useMemo<YTVideoVisualization[]>((): YTVideoVisualization[] => {
        return ytVideoVisualizations.videoVisualizations.map(vi => ({
            ...vi
        }));
    }, [ytVideoVisualizations.videoVisualizations]);

    /**
     * Derived, memoized list of full YouTube video entities (`YTVideoFull`).
     *
     * @description
     * Combines base video data (`videos`) with its corresponding
     * channel (`channels`) and visualizations (`videoVisualizations`)
     * into a single enriched structure.
     *
     * - Ensures referential stability via `useMemo`.
     * - Automatically provides a fallback “Unknown channel” object
     *   when the linked channel cannot be found.
     * - Filters visualizations per video to populate `video.visualizations`.
     *
     * ---
     * ### Example structure:
     * ```ts
     * {
     *   id: "abc123",
     *   title: "My Video",
     *   channel: { id: "ch01", name: "Tech Explained", ... },
     *   visualizations: [{ id: 1, date: "2025-01-01", ... }]
     * }
     * ```
     *
     * @dependencies `[videos, channels, videoVisualizations]`
     * @returns {YTVideoFull[]} Fully enriched list of videos with related data.
     */
    const videosFull: YTVideoFull[] = useMemo(() => {
        return videos.map(video => {
            const channel: YTChannel | undefined = channels.find(ch => ch.id === video.channelId);

            const visualizations: YTVideoVisualization[] = videoVisualizations.filter(
                vis => vis.videoId === video.id
            );

            return {
                ...video,
                channel: channel ?? {
                    id: video.channelId,
                    name: "Unknown channel",
                    url: "",
                    description: "",
                    createdAt: ""
                },
                visualizations
            };
        });
    }, [videos, channels, videoVisualizations]);

    return (
        <YouTubeContext.Provider
            value={{
                channels,
                videos,
                videoVisualizations,
                videosFull,
                loading,
                error,
                fetchChannels: ytChannels.fetchChannels,
                createChannel: ytChannels.createChannel,
                updateChannel: ytChannels.updateChannel,
                deleteChannel: ytChannels.deleteChannel,
                fetchVideos: ytVideos.fetchVideos,
                fetchVideosByChannel: ytVideos.fetchVideosByChannel,
                createVideo: ytVideos.createVideo,
                updateVideo: ytVideos.updateVideo,
                deleteVideo: ytVideos.deleteVideo,
                fetchVideoVisualizations: ytVideoVisualizations.fetchVideoVisualizations,
                fetchVideoVisualizationsByVideo: ytVideoVisualizations.fetchVideoVisualizationsByVideo,
                createVideoVisualization: ytVideoVisualizations.createVideoVisualization,
                updateVideoVisualization: ytVideoVisualizations.updateVideoVisualization,
                deleteVideoVisualization: ytVideoVisualizations.deleteVideoVisualization
            }}
        >
            {children}
        </YouTubeContext.Provider>
    );
}

/**
 * Hook for consuming the YouTube context safely.
 * Must be used inside a `<YouTubeProvider>`.
 *
 * @throws Error if used outside the provider.
 */
export function useYouTubeContext(): YouTubeContextValue {
    const ctx: YouTubeContextValue | null = useContext(YouTubeContext);
    if (!ctx) {
        throw new Error("useYouTubeContext must be used within a YouTubeProvider");
    }
    return ctx;
}