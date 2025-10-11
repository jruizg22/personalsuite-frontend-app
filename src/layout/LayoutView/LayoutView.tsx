import {type JSX, type ReactNode} from "react";
import {Content, Navigation, TopBar} from "@/layout";
import {Box, CssBaseline} from "@mui/material";

interface Props {
    drawerWidth: number;
    mobileOpen: boolean;
    onToggleDrawer: () => void;
    onDrawerClose: () => void;
    onDrawerTransitionEnd: () => void;
    children: ReactNode;
}

export default function LayoutView({
                                       drawerWidth,
                                       mobileOpen,
                                       onToggleDrawer,
                                       onDrawerClose,
                                       onDrawerTransitionEnd,
                                       children
                                   }: Props): JSX.Element {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <CssBaseline />
            <TopBar
                drawerWidth={drawerWidth}
                onToggleDrawer={onToggleDrawer}
            />
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Navigation
                    drawerWidth={drawerWidth}
                    mobileOpen={mobileOpen}
                    handleDrawerClose={onDrawerClose}
                    handleDrawerTransitionEnd={onDrawerTransitionEnd}
                />
                <Content>
                    {children}
                </Content>
            </Box>
        </Box>
    );
}