import {AppBar, Toolbar, Typography} from "@mui/material";
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton";
import {type JSX, useEffect, useState} from "react";
import {type Location, useLocation} from "react-router-dom";
import {useLanguageHook} from "@/hooks";
import {appRoutes} from "@/routes";
import type {appRoute} from "@/types";
import {useIsDesktop} from "@/hooks/useIsDesktop";

interface Props {
    drawerWidth: number,
    onToggleDrawer: () => void;
}

export default function TopBar({drawerWidth, onToggleDrawer}: Props): JSX.Element {
    function findRouteTrail(
        routes: appRoute[],
        path: string,
        trail: appRoute[] = []
    ): appRoute[] | null {
        for (const route of routes) {
            if (route.path === path) return [...trail, route];
            if (route.children) {
                const childTrail: appRoute[] | null = findRouteTrail(route.children, path, [...trail, route]);
                if (childTrail) return childTrail;
            }
        }
        return null;
    }

    function useTopBarLabel(): string {
        const location: Location = useLocation();
        const [topBarLabel, setTopBarLabel] = useState<string>("Personal Suite");
        const { translateLabel, i18n } = useLanguageHook();

        useEffect((): void => {
            const routeTrail: appRoute[] | null = findRouteTrail(appRoutes, location.pathname);
            if (routeTrail) {
                const translatedLabels: string[] = routeTrail.map(route => translateLabel(route.i18nProps, route.label));
                setTopBarLabel(translatedLabels.join(" / "));
            } else {
                setTopBarLabel("Personal Suite");
            }
        }, [location.pathname, i18n.language]);

        return topBarLabel;
    }

    const topBarLabel: string = useTopBarLabel();

    const isDesktop: boolean = useIsDesktop();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%",
                ml: isDesktop ? `${drawerWidth}px` : 0,
            }}
        >
            <Toolbar>
                {!isDesktop && <DrawerToggleButton onToggleDrawer={onToggleDrawer} />}
                <Typography variant="h6" noWrap component="div">
                    {topBarLabel}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}