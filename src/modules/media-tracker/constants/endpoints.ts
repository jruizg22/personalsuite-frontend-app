const mediaTrackerPath: string = "/media_tracker/" as const;
const V1Path: string = "api/v1/" as const;
const youTubePath: string = "youtube/" as const;

export const mediaTrackerEndpoints = {
    v1: {
        youTube: {
            channels: `${mediaTrackerPath}${V1Path}${youTubePath}channels/`,
            videos: `${mediaTrackerPath}${V1Path}${youTubePath}videos/`
        }
    }
} as const;