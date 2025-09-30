import type {JSX} from "react";
import {MainPage} from "./pages/MainPage";
import HomeIcon from "@mui/icons-material/Home";
import MediaTrackerLayout from "./modules/media-tracker/MediaTrackerLayout/MediaTrackerLayout.tsx";
import MovieIcon from "@mui/icons-material/Movie";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";

export interface appRoute {
    path: string;
    element?: JSX.Element;
    label: string;
    icon: JSX.Element;
    children?: appRoute[];
}

export const appRoutes: appRoute[] = [
    {
        path: "/main",
        element: <MainPage/>,
        label: "Main Page",
        icon: <HomeIcon/>
    },
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