import {type JSX, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {type YTVideo, type YTVideoWithChannel} from "@media-tracker/models";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";
import {CrudCardItem, CrudCardLayout} from "@/shared/cards/CrudCardLayout";
import {VideoCardContent, VideoFormFields} from "@media-tracker/pages/youtube/videos";
import {useYouTubeContext} from "@media-tracker/contexts";

/**
 * `VideosTab` – YouTube Video Management Module.
 *
 * @component
 * @description
 * This component represents the **Videos tab** within the YouTube management interface.
 * It provides a full CRUD experience (Create, Read, Update, Delete) for YouTube videos,
 * powered by a generic card-based layout (`CrudCardLayout`).
 *
 * Each video is automatically linked to its corresponding channel through the
 * shared `YouTubeContext`, which centralizes all YouTube-related data and operations.
 *
 * ---
 * ### Features:
 * - Displays all videos grouped by their parent channels.
 * - Provides full CRUD capabilities with integrated form validation.
 * - Includes localized titles, messages, and feedback via `react-i18next`.
 * - Offers built-in search, snackbar notifications, and form rendering hooks.
 *
 * ---
 * ### Dependencies:
 * - `useYouTubeContext` → Provides data and CRUD methods for channels & videos.
 * - `CrudCardLayout` → Generic CRUD UI layout with integrated forms and cards.
 * - `VideoCardContent` and `VideoFormFields` → Entity-specific components for videos.
 *
 * ---
 * ### Example Usage:
 * ```tsx
 * import VideosTab from "@/pages/youtube/tabs/VideosTab";
 * import { YouTubeProvider } from "@media-tracker/contexts";
 *
 * export default function YouTubePage(): JSX.Element {
 *   return (
 *     <YouTubeProvider>
 *       <VideosTab />
 *     </YouTubeProvider>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} A fully interactive CRUD panel for managing YouTube videos.
 */
export default function VideosTab(): JSX.Element {
    const {t} = useTranslation();
    const {data, loading, createVideo, updateVideo, deleteVideo} = useYouTubeContext();

    /**
     * Combines all videos with their corresponding channel metadata.
     *
     * @remarks
     * - Uses `useMemo` to efficiently compute a flattened list of videos.
     * - Ensures re-computation only occurs when the channel list changes.
     */
    const videosWithChannel: YTVideoWithChannel[] = useMemo<YTVideoWithChannel[]>(() => {
        return data.channels.flatMap(channel =>
            channel.videos.map(video => ({
                ...video,
                channel,
            }))
        );
    }, [data.channels]);

    return (
        <CrudCardLayout<YTVideoWithChannel>
            /** Global loading indicator */
            loading={loading}

            /** List of all videos with channel information */
            items={videosWithChannel}

            /** Handles video creation */
            onCreate={async (newVideo: Partial<YTVideo>): Promise<void> => {
                await createVideo(newVideo);
            }}

            /** Handles video updates */
            onUpdate={async (id: string, updated: Partial<YTVideo>): Promise<void> => {
                await updateVideo(id, updated);
            }}

            /** Handles video deletion */
            onDelete={async (id: string): Promise<void> => {
                await deleteVideo(id);
            }}

            /** Dialog titles for CRUD actions */
            titleNew={t(
                mediaTrackerKeys.youTube.videos.dialogs.newDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "New video"}
            )}
            titleEdit={t(
                mediaTrackerKeys.youTube.videos.dialogs.editDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "Edit video"}
            )}
            titleDelete={t(
                mediaTrackerKeys.youTube.videos.dialogs.deleteDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "Delete video"}
            )}

            /** Dynamic delete confirmation message */
            deleteMessage={(vi: YTVideo): string => t(
                mediaTrackerKeys.youTube.videos.dialogs.deleteDialog.message,
                {
                    ns: mediaTrackerKeys.ns,
                    video: vi.title,
                })
            }

            /** Snackbar feedback for CRUD actions */
            snackbar={{
                new: t(
                    mediaTrackerKeys.youTube.videos.feedback.new,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Video created successfully"}
                ),
                edit: t(
                    mediaTrackerKeys.youTube.videos.feedback.edit,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Video modified successfully"}
                ),
                delete: t(
                    mediaTrackerKeys.youTube.videos.feedback.delete,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Video deleted successfully"}
                ),
            }}

            /** Default empty video structure for creation */
            createEmptyItem={(): YTVideoWithChannel => ({
                id: "",
                channelId: "",
                title: "",
                url: "",
                description: "",
                publishedAt: "",
                channel: {
                    id: "",
                    name: "",
                    url: "",
                    description: "",
                    createdAt: ""
                }
            })}

            /** Renders each video card */
            renderCard={(video: YTVideoWithChannel, onEdit: () => void, onDelete: () => void): JSX.Element => (
                <CrudCardItem
                    item={video}
                    getTitle={(vi: YTVideo): string => vi.title}
                    renderContent={(vi: YTVideoWithChannel): JSX.Element => <VideoCardContent video={vi} />}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}

            /** Renders the video creation/edit form */
            renderForm={(video: YTVideo, onChange): JSX.Element => (
                <VideoFormFields video={video} onChange={onChange}/>
            )}

            /** List of required fields before submission */
            requiredFields={["title", "channelId", "id"]}

            /** Search configuration (label + filter keys) */
            searchProps={{
                label: t(mediaTrackerKeys.youTube.videos.searchVideos, {ns: mediaTrackerKeys.ns, defaultValue: "Search videos..."}),
                filterKeys: ["title"]
            }}
        />
    )
}