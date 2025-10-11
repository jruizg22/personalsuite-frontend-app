import type {appRoute} from "@/types";
import {lazy, Suspense} from "react";
import MovieIcon from "@mui/icons-material/Movie";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MediaTrackerLayout from "./MediaTrackerLayout/MediaTrackerLayout";

const YouTubePage = lazy(() => import("@media-tracker/pages/youtube/YouTubeLayout/YouTubeLayout.tsx"))

export const ns: string = "mediaTracker";

export const routes: appRoute[] = [
    {
        path: "/media-tracker",
        label: "Media Tracker",
        i18nProps: {
            i18nKey: "mediaTracker",
            i18nNs: ns
        },
        icon: <MovieIcon />,
        children: [
            {
                path: "/media-tracker/media",
                element: <MediaTrackerLayout />,
                label: "Media",
                i18nProps: {
                    i18nKey: "media",
                    i18nNs: ns
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
                    i18nKey: "youTube.youTube",
                    i18nNs: ns
                },
                icon: <YouTubeIcon />
            },
        ],
    },
];