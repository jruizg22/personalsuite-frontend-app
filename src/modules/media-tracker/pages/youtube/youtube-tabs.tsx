import type {appTab} from "@/types";
import {ns} from "@media-tracker/routes";
import ChannelsTab from "@media-tracker/pages/youtube/ChannelsTab/ChannelsTab.tsx";
import VideosTab from "@media-tracker/pages/youtube/VideosTab/VideosTab.tsx";

export const tabs: appTab[] = [
    {
        label: "Channels",
        Component: ChannelsTab,
        i18nProps: {
            i18nKey: "youTube.channels",
            i18nNs: ns
        }
    },
    {
        label: "Videos",
        Component: VideosTab,
        i18nProps: {
            i18nKey: "youTube.videos",
            i18nNs: ns
        }
    }
]