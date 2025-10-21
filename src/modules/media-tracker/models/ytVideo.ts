import type {YTChannel} from "@media-tracker/models";
import {views} from "@media-tracker/constants";

export const YTVideoView = {
    BASIC: views.basic,
    WITH_CHANNEL: views.with_channel
} as const;

export interface YTVideo {
    id: string;
    channelId: string;
    title: string;
    publishedAt?: string | null;
    description?: string | null;
    url?: string | null;
}

export interface YTVideoWithChannel extends YTVideo {
    channel: YTChannel;
}