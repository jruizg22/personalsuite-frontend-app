import type {YTChannel, YTVideo} from "@media-tracker/models/.";

export interface YTData {
    channels: Array<YTChannel & { videos: YTVideo[] }>;
}