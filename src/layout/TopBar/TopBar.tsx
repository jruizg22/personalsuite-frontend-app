import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton.tsx";
import type {JSX} from "react";

interface Props {
    drawerWidth: number,
    topBarLabel: string,
    onToggleDrawer: () => void;
}

export default function TopBar({drawerWidth, topBarLabel, onToggleDrawer}: Props): JSX.Element {
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