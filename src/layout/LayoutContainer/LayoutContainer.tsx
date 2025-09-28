import {type JSX, type ReactNode, useState, useEffect} from "react";
import {LayoutView} from "../LayoutView";
import {useLocation, type Location} from "react-router-dom";
import {type appRoute, appRoutes} from "../../routes.tsx";

interface Props {
    children: ReactNode;
}

export default function LayoutContainer({children}: Props): JSX.Element {
    const location: Location = useLocation();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [topBarLabel, setTopBarLabel] = useState<string>("Personal Suite");

    useEffect((): void => {
        const currentRoute: appRoute | undefined = appRoutes.find(
            (route: appRoute): boolean => route.path === location.pathname
        );
        if (currentRoute) {
            setTopBarLabel(currentRoute.label);
        } else {
            setTopBarLabel("Personal Suite"); // fallback
        }
    }, [location.pathname]);

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