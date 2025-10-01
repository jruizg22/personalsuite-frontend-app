import type {JSX} from "react";
import {lazy, Suspense} from "react";
import HomeIcon from "@mui/icons-material/Home";
import {routes as mediaRoutes} from "./modules/media-tracker/routes.tsx";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"))

export interface appRoute {
    path: string;
    element?: JSX.Element;
    label: string;
    i18nKey?: string;
    i18nNs?: string;
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
        i18nKey: "start",
        i18nNs: "common",
        icon: <HomeIcon/>
    },
    ...mediaRoutes
]