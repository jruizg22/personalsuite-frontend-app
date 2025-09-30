import {type JSX, type ReactNode, useState, useEffect} from "react";
import {LayoutView} from "../LayoutView";
import {useLocation, type Location} from "react-router-dom";
import {type appRoute, appRoutes} from "../../routes.tsx";

interface Props {
    children: ReactNode;
}

export default function LayoutContainer({children}: Props): JSX.Element {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    function findRouteTrail(routes: appRoute[], path: string, trail: appRoute[] = []): appRoute[] | null {
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

        useEffect((): void => {
            const routeTrail: appRoute[] | null = findRouteTrail(appRoutes, location.pathname);
            if (routeTrail) {
                const label: string = routeTrail.map(r => r.label).join(" / ");
                setTopBarLabel(label);
            } else {
                setTopBarLabel("Personal Suite");
            }
        }, [location.pathname]);

        return topBarLabel;
    }

    const topBarLabel: string = useTopBarLabel();

    const handleDrawerClose = (): void => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = (): void => {
        setIsClosing(false);
    };

    const handleDrawerToggle = (): void => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <LayoutView
            drawerWidth={240}
            mobileOpen={mobileOpen}
            topBarLabel={topBarLabel}
            onToggleDrawer={handleDrawerToggle}
            onDrawerClose={handleDrawerClose}
            onDrawerTransitionEnd={handleDrawerTransitionEnd}
        >
            {children}
        </LayoutView>
    );
}