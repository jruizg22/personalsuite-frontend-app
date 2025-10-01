import type { appRoute } from "../../routes";
import MovieIcon from "@mui/icons-material/Movie";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MediaTrackerLayout from "./MediaTrackerLayout/MediaTrackerLayout";

const rawRoutes: Omit<appRoute, "i18nNs">[] = [
    {
        path: "/media-tracker",
        label: "Media Tracker",
        i18nKey: "mediaTracker",
        icon: <MovieIcon />,
        children: [
            {
                path: "/media-tracker/media",
                element: <MediaTrackerLayout />,
                label: "Media",
                i18nKey: "media",
                icon: <PlayCircleIcon />,
            },
            {
                path: "/media-tracker/youtube",
                element: <MediaTrackerLayout />,
                label: "YouTube",
                i18nKey: "youTube",
                icon: <YouTubeIcon />,
            },
        ],
    },
];

function addNamespace(routes: Omit<appRoute, "i18nNs">[], ns: string): appRoute[] {
    return routes.map((r) => ({
        ...r,
        i18nNs: ns,
        children: r.children ? addNamespace(r.children, ns) : undefined,
    }));
}

export const routes: appRoute[] = addNamespace(rawRoutes, "mediaTracker");