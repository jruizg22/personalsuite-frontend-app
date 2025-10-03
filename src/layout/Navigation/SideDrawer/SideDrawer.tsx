import type {JSX} from "react";
import {type appRoute, appRoutes} from "../../../routes.tsx";
import List from "@mui/material/List";
import SideDrawerElement from "./SideDrawerElement/SideDrawerElement.tsx";
import {Divider} from "@mui/material";
import SideDrawerHeader from "./SideDrawerHeader.tsx";
import Box from "@mui/material/Box";

interface Props {
    handleItemClick?: () => void;
}

export default function SideDrawer({handleItemClick}: Props): JSX.Element {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <SideDrawerHeader />

            <Divider />

            {/* Scrollable content */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <List>
                    {appRoutes
                        .filter(route => route.path !== "/settings")
                        .map((route: appRoute): JSX.Element => (
                        <SideDrawerElement key={route.path} route={route} handleItemClick={handleItemClick}/>
                    ))}
                </List>
            </Box>

            <Divider />

            {/* Footer fijo */}
            <Box sx={{ p: 2 }}>
                {appRoutes
                    .filter(route => route.path === "/settings")
                    .map((route: appRoute): JSX.Element => (
                        <SideDrawerElement key={route.path} route={route} handleItemClick={handleItemClick}/>
                    ))}
            </Box>
        </Box>
    )
}