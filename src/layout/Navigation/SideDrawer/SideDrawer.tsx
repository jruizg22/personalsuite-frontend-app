import type {JSX} from "react";
import {type appRoute, appRoutes} from "../../../routes.tsx";
import List from "@mui/material/List";
import SideDrawerElement from "./SideDrawerElement/SideDrawerElement.tsx";
import {Divider} from "@mui/material";
import SideDrawerHeader from "./SideDrawerHeader.tsx";

interface Props {
    handleItemClick?: () => void;
}

export default function SideDrawer({handleItemClick}: Props): JSX.Element {
    return (
        <>
            <SideDrawerHeader/>
            <Divider/>
            <List>
                {appRoutes.map((route: appRoute): JSX.Element => (
                    <SideDrawerElement key={route.path} route={route} handleItemClick={handleItemClick}/>
                ))}
            </List>
        </>
    )
}