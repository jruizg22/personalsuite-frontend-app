import {createContext, type JSX, type ReactNode, useContext, useMemo} from "react";
import {useYTChannels, useYTVideos} from "@media-tracker/hooks";
import type {YTChannel, YTData, YTVideo} from "@media-tracker/models";

/**
 * Context value structure for YouTube data and CRUD operations.
 * Centralizes access to channels, videos, and combined views.
 */
interface YouTubeContextValue {
    /** Root YouTube data structure */
    data: YTData;

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

    // Unified flags
    const loading: boolean = ytChannels.loading || ytVideos.loading;
    const error: string | null = ytChannels.error || ytVideos.error;

    /**
     * Build a unified YouTube data tree.
     * Efficiently links each channel to its corresponding videos.
     *
     * ⚡ This is O(n + m): builds a lookup map so we don’t do nested loops.
     * ⚡ Does NOT clone videos or channels — only references.
     */
    const data: YTData = useMemo<YTData>(() => {
        if (!ytChannels.channels.length) {
            return { channels: [] };
        }

        const videosByChannel = new Map<string, YTVideo[]>();

        for (const video of ytVideos.videos) {
            const list: YTVideo[] = videosByChannel.get(video.channelId) ?? [];
            list.push(video);
            videosByChannel.set(video.channelId, list);
        }

        return {
            channels: ytChannels.channels.map((ch: YTChannel) => ({
                ...ch,
                videos: videosByChannel.get(ch.id) ?? [],
            })),
        };
    }, [ytChannels.channels, ytVideos.videos]);

    return (
        <YouTubeContext.Provider
            value={{
                data,
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