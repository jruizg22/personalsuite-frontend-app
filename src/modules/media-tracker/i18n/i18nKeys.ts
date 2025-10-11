export const mediaTrackerKeys = {
    ns: "mediaTracker",
    root: "mediaTracker",
    media: "media",
    youTube: {
        root: "youTube.youTube",
        channels: {
            root: "youTube.channels.channels",
            createdAt: "youTube.channels.created_at",
        },
        videos: "youTube.videos",
        playlists: "youTube.playlists",
    }
} as const;