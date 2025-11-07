import {type JSX} from "react";
import {useTranslation} from "react-i18next";
import {type YTVideo, type YTVideoFull} from "@media-tracker/models";
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
    const {videosFull, loading, createVideo, updateVideo, deleteVideo} = useYouTubeContext();

    return (
        <CrudCardLayout<YTVideoFull>
            /** Global loading indicator */
            loading={loading}

            /** List of all videos with channel information */
            items={videosFull}

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
            titleView={t(
                mediaTrackerKeys.youTube.videos.dialogs.viewDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "Channel details"}
            )}
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
            createEmptyItem={(): YTVideoFull => ({
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
                },
                visualizations: []
            })}

            /** Renders each video card */
            renderCard={(video: YTVideoFull, onView: () => void, onEdit: () => void, onDelete: () => void): JSX.Element => (
                <CrudCardItem
                    item={video}
                    getTitle={(vi: YTVideo): string => vi.title}
                    renderContent={(vi: YTVideoFull): JSX.Element => <VideoCardContent video={vi} />}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}

            /** Renders the video creation/edit form */
            renderForm={(video: YTVideo, onChange, readOnly): JSX.Element => (
                <VideoFormFields video={video} onChange={onChange} readOnly={readOnly}/>
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