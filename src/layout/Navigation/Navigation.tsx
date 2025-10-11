import type {JSX} from "react";
import {SideDrawer} from "./SideDrawer";
import {Box, Drawer} from "@mui/material";
import {useIsDesktop} from "@/hooks/useIsDesktop";

interface Props {
    drawerWidth: number,
    mobileOpen: boolean,
    handleDrawerClose: () => void,
    handleDrawerTransitionEnd: () => void;
}

export default function Navigation({drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd}: Props): JSX.Element {
    const isDesktop: boolean = useIsDesktop();

    const drawerVariant: "permanent" | "temporary" = isDesktop ? "permanent" : "temporary";

    return (
        <Box
            component="nav"
            sx={{ width: isDesktop ? drawerWidth : "auto", flexShrink: { md: 0 } }}
            aria-label="navigation drawer"
        >
            <Drawer
                variant={drawerVariant}
                open={isDesktop || mobileOpen}
                onClose={isDesktop ? undefined : handleDrawerClose}
                onTransitionEnd={isDesktop ? undefined : handleDrawerTransitionEnd}
                ModalProps={isDesktop ? undefined : { keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <SideDrawer handleItemClick={isDesktop ? undefined : handleDrawerClose} />
            </Drawer>
        </Box>
    )
}