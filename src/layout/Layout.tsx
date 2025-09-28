import {type JSX, useState} from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from "./TopBar/TopBar.tsx";
import Navigation from "./Navigation/Navigation.tsx";
import Content from "./Content/Content.tsx";

const drawerWidth = 240;

export default function Layout(): JSX.Element {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [topBarLabel, setTopBarLabel] = useState('Personal Suite');

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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar drawerWidth={drawerWidth} topBarLabel={topBarLabel} handleToggle={handleDrawerToggle}/>
            <Navigation drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} handleDrawerTransitionEnd={handleDrawerTransitionEnd}/>
            <Content drawerWidth={drawerWidth}/>
        </Box>
    );
}