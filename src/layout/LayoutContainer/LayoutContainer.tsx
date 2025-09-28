import { useState } from "react";
import {LayoutView} from "../LayoutView";

export default function LayoutContainer() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [topBarLabel, setTopBarLabel] = useState("Personal Suite");

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
        />
    );
}