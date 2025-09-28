import type {JSX} from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {SideDrawer} from "./SideDrawer";

interface Props {
    drawerWidth: number,
    mobileOpen: boolean,
    handleDrawerClose: () => void,
    handleDrawerTransitionEnd: () => void;
}

export default function Navigation({drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd}: Props): JSX.Element {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                slotProps={{
                    root: {
                        keepMounted: true, // Better open performance on mobile.
                    },
                }}
            >
                <SideDrawer/>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <SideDrawer/>
            </Drawer>
        </Box>
    )
}