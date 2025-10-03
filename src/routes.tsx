import type {JSX} from "react";
import {lazy, Suspense} from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import {routes as mediaRoutes} from "./modules/media-tracker/routes.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";

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
    {
        path: "/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsPage/>
          </Suspense>
        ),
        label: "Settings",
        i18nKey: "settings",
        i18nNs: "common",
        icon: <SettingsIcon/>
    },
    ...mediaRoutes
]