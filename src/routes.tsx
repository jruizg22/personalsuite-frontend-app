import {type appRoute} from "@/types";
import {lazy, Suspense} from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPage from "@/pages/SettingsPage/SettingsPage.tsx";
import {routes as mediaRoutes} from "@media-tracker/routes";
import {commonKeys} from "@i18n/i18nKeys";

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
            i18nKey: commonKeys.start,
            i18nNs: commonKeys.ns
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
            i18nKey: commonKeys.settings,
            i18nNs: commonKeys.ns
        },
        icon: <SettingsIcon/>
    },
    ...mediaRoutes
]