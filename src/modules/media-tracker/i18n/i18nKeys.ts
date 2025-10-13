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
                editDialog: {
                    title: "youTube.channels.dialogs.edit_dialog.title",
                },
                deleteDialog: {
                    title: "youTube.channels.dialogs.delete_dialog.title",
                    message: "youTube.channels.dialogs.delete_dialog.message",
                }
            }
        },
        videos: "youTube.videos",
        playlists: "youTube.playlists",
    }
} as const;