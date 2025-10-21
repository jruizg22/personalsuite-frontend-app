import {views} from "@media-tracker/constants";

export const YTChannelView = {
    BASIC: views.basic
}

export interface YTChannel {
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    createdAt?: string | null;
}