import type {ViewBasic} from "@media-tracker/types";

export interface YTVideoView {
    basic: ViewBasic
}

export interface YTVideo {
    id?: string | null;
    channelId: string;
    title: string;
    publishedAt?: string | null;
    description?: string | null;
    url?: string | null;
}