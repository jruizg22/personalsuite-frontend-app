import {type JSX, useState} from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import type {appRoute} from "../../../../routes.tsx";
import ElementNoChildren from "./ElementNoChildren";

interface Props {
    route: appRoute;
    handleItemClick?: () => void;
}

export default function ElementWithChildren({route, handleItemClick}: Props): JSX.Element {
    const {label, icon, children}: appRoute = route;
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={(): void => setCollapsed(!collapsed)}>
                    {icon && (
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            {icon}
                        </ListItemIcon>
                    )}
                    <ListItemText primary={label} />
                    {collapsed ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children?.map((child: appRoute): JSX.Element => (
                        <ElementNoChildren key={child.path} route={child} handleItemClick={handleItemClick} isChild/>
                    ))}
                </List>
            </Collapse>
        </>
    )
}