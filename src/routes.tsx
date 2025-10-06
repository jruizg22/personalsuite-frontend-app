import {type appRoute} from "@/types";
import {lazy, Suspense} from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPage from "@/pages/SettingsPage/SettingsPage.tsx";
import {routes as mediaRoutes} from "@media-tracker/routes";

const ns: string = "common";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"))

export const appRoutes: appRoute[] = [
    {
        path: "/main",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <MainPage/>
            </Suspense>
        ),
        label: "Main Page",
        i18nProps: {
            i18nKey: "start",
            i18nNs: ns
        },
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
        i18nProps: {
            i18nKey: "settings.settings",
            i18nNs: ns
        },
        icon: <SettingsIcon/>
    },
    ...mediaRoutes
]