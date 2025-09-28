import {type JSX, type ReactNode} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {TopBar} from "../TopBar";
import {Navigation} from "../Navigation"
import {Content} from "../Content";

interface Props {
    drawerWidth: number;
    mobileOpen: boolean;
    topBarLabel: string;
    onToggleDrawer: () => void;
    onDrawerClose: () => void;
    onDrawerTransitionEnd: () => void;
    children: ReactNode;
}

export default function LayoutView({
                                       drawerWidth,
                                       mobileOpen,
                                       topBarLabel,
                                       onToggleDrawer,
                                       onDrawerClose,
                                       onDrawerTransitionEnd,
                                       children
                                   }: Props): JSX.Element {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <TopBar
                drawerWidth={drawerWidth}
                topBarLabel={topBarLabel}
                onToggleDrawer={onToggleDrawer}
            />
            <Navigation
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerClose={onDrawerClose}
                handleDrawerTransitionEnd={onDrawerTransitionEnd}
            />
            <Content drawerWidth={drawerWidth}>
                {children}
            </Content>
        </Box>
    );
}