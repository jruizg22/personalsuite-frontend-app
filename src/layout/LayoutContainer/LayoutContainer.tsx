import {type JSX, type ReactNode, useState} from "react";
import {LayoutView} from "../LayoutView";

interface Props {
    children: ReactNode;
}

export default function LayoutContainer({children}: Props): JSX.Element {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

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
            onToggleDrawer={handleDrawerToggle}
            onDrawerClose={handleDrawerClose}
            onDrawerTransitionEnd={handleDrawerTransitionEnd}
        >
            {children}
        </LayoutView>
    );
}