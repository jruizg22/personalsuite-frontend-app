import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton.tsx";
import {type JSX, useEffect, useState} from "react";
import {type Location, useLocation} from "react-router-dom";
import {useLanguageService} from "@/services/useLanguageService.ts";
import {appRoutes} from "@/routes";
import type {appRoute} from "@/types";

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
        const { translateLabel, i18n } = useLanguageService();

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

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <DrawerToggleButton onToggleDrawer={onToggleDrawer}/>
                <Typography variant="h6" noWrap component="div">
                    {topBarLabel}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}