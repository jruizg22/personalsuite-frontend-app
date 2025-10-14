import type {appRoute} from "@/types";
import {lazy, Suspense} from "react";
import {Movie as MovieIcon, PlayCircle as PlayCircleIcon, YouTube as YouTubeIcon} from "@mui/icons-material";
import MediaTrackerLayout from "./MediaTrackerLayout/MediaTrackerLayout";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";
import {LoadingScreen} from "@/shared";

const YouTubePage = lazy(() => import("@media-tracker/pages/youtube/YouTubeLayout/YouTubeLayout.tsx"))

export const routes: appRoute[] = [
    {
        path: "/media-tracker",
        label: "Media Tracker",
        i18nProps: {
            i18nKey: mediaTrackerKeys.root,
            i18nNs: mediaTrackerKeys.ns
        },
        icon: <MovieIcon />,
        children: [
            {
                path: "/media-tracker/media",
                element: <MediaTrackerLayout />,
                label: "Media",
                i18nProps: {
                    i18nKey: mediaTrackerKeys.media,
                    i18nNs: mediaTrackerKeys.ns
                },
                icon: <PlayCircleIcon />,
            },
            {
                path: "/media-tracker/youtube",
                element: (
                    <Suspense fallback={<LoadingScreen/>}>
                        <YouTubePage/>
                    </Suspense>
                ),
                label: "YouTube",
                i18nProps: {
                    i18nKey: mediaTrackerKeys.youTube.root,
                    i18nNs: mediaTrackerKeys.ns
                },
                icon: <YouTubeIcon />
            },
        ],
    },
];