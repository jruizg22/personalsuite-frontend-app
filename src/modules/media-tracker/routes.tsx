import type {appRoute} from "@/types";
import {lazy, Suspense} from "react";
import MovieIcon from "@mui/icons-material/Movie";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MediaTrackerLayout from "./MediaTrackerLayout/MediaTrackerLayout";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";

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
                    <Suspense fallback={<div>Loading...</div>}>
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