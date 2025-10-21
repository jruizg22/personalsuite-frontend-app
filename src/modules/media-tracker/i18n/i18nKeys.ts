/**
 * `mediaTrackerKeys` is a readonly object containing translation keys
 * for the Media Tracker module. These keys are structured hierarchically
 * to match the modules and dialogs in the UI.
 *
 * This object is intended for use with i18n translation functions.
 *
 * @example
 * import { mediaTrackerKeys } from "@/i18nKeys";
 * t(mediaTrackerKeys.youTube.channels.snackbar.new);
 */
export const mediaTrackerKeys = {
    ns: "mediaTracker",
    root: "mediaTracker",
    media: "media",
    youTube: {
        root: "youTube.youTube",
        channels: {
            root: "youTube.channels.channels",
            createdAt: "youTube.channels.created_at",
            searchChannels: "youTube.channels.search_channels",
            dialogs: {
                newDialog: {
                    title: "youTube.channels.dialogs.new_dialog.title",
                },
                editDialog: {
                    title: "youTube.channels.dialogs.edit_dialog.title",
                },
                deleteDialog: {
                    title: "youTube.channels.dialogs.delete_dialog.title",
                    message: "youTube.channels.dialogs.delete_dialog.message",
                }
            },
            feedback: {
                new: "youTube.channels.feedback.new",
                edit: "youTube.channels.feedback.edit",
                delete: "youTube.channels.feedback.delete",
            }
        },
        videos: {
            root: "youTube.videos.videos",
            publishedAt: "youTube.videos.published_at",
            searchVideos: "youTube.videos.search_videos",
            dialogs: {
                newDialog: {
                    title: "youTube.videos.dialogs.new_dialog.title",
                },
                editDialog: {
                    title: "youTube.videos.dialogs.edit_dialog.title",
                },
                deleteDialog: {
                    title: "youTube.videos.dialogs.delete_dialog.title",
                    message: "youTube.videos.dialogs.delete_dialog.message",
                }
            },
            feedback: {
                new: "youTube.videos.feedback.new",
                edit: "youTube.videos.feedback.edit",
                delete: "youTube.videos.feedback.delete",
            }
        },
        playlists: "youTube.playlists",
    }
} as const;