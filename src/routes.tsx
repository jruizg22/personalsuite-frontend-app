import type {JSX} from "react";
import {lazy, Suspense} from "react";
import HomeIcon from "@mui/icons-material/Home";
import {mediaRoutes} from "./modules/media-tracker/media-tracker-routes.tsx";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"))

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
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <MainPage/>
            </Suspense>
        ),
        label: "Main Page",
        icon: <HomeIcon/>
    },
    ...mediaRoutes
]