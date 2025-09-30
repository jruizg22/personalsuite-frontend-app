import type {appRoute} from "../../routes.tsx";
import MovieIcon from "@mui/icons-material/Movie";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MediaTrackerLayout from "./MediaTrackerLayout/MediaTrackerLayout.tsx";

export const mediaRoutes: appRoute[] = [
    {
        path: "/media-tracker",
        label: "Media Tracker",
        icon: <MovieIcon/>,
        children: [
            {
                path: "/media-tracker/media",
                element: <MediaTrackerLayout/>,
                label: "Media",
                icon: <PlayCircleIcon/>
            },
            {
                path: "/media-tracker/youtube",
                element: <MediaTrackerLayout/>,
                label: "YouTube",
                icon: <YouTubeIcon/>
            }
        ]
    }
]

