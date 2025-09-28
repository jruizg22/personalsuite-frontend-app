import type {JSX} from "react";
import {type appRoute, appRoutes} from "../../../routes.tsx";
import List from "@mui/material/List";
import RouteItem from "./RouteItem.tsx";
import {Divider} from "@mui/material";
import SideDrawerHeader from "./SideDrawerHeader.tsx";

export default function SideDrawer(): JSX.Element {
    return (
        <>
            <SideDrawerHeader/>
            <Divider/>
            <List>
                {appRoutes.map((route: appRoute): JSX.Element => (
                    <RouteItem key={route.path} route={route} />
                ))}
            </List>
        </>
    )
}