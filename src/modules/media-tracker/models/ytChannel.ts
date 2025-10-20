import type {ViewBasic} from "@media-tracker/types";

export interface YTChannelView {
    basic: ViewBasic
}

export interface YTChannel {
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    createdAt?: string | null;
}