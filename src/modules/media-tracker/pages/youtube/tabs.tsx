import type {appTab} from "@/types";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";
import {ChannelsTab} from "@media-tracker/pages/youtube/channels";
import VideosTab from "@media-tracker/pages/youtube/videos/VideosTab.tsx";

export const tabs: appTab[] = [
    {
        label: "Channels",
        Component: ChannelsTab,
        i18nProps: {
            i18nKey: mediaTrackerKeys.youTube.channels.root,
            i18nNs: mediaTrackerKeys.ns
        }
    },
    {
        label: "Videos",
        Component: VideosTab,
        i18nProps: {
            i18nKey: mediaTrackerKeys.youTube.videos.root,
            i18nNs: mediaTrackerKeys.ns
        }
    }
]