import type {JSX} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import {NavLink} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import type {appRoute} from "@/types";
import {useLanguageService} from "@/services/useLanguageService.ts";

interface Props {
    route: appRoute;
    isChild?: boolean;
    handleItemClick?: () => void;
}

export default function ElementNoChildren({route, isChild, handleItemClick}: Props): JSX.Element {
    const { path, icon }: appRoute = route;
    const { translateLabel } = useLanguageService();

    return (
        <ListItem disablePadding>
            <ListItemButton
                component={NavLink}
                to={path}
                onClick={handleItemClick}
                sx={{
                    pl: isChild ? 6 : 2,
                    "&.active": { backgroundColor: "rgba(0,0,0,0.08)" }
                }}
            >
                {icon && (
                    <ListItemIcon sx={{ minWidth: 32 }}>
                        {icon}
                    </ListItemIcon>
                )}
                <ListItemText primary={translateLabel(route.i18nProps, route.label)} />
            </ListItemButton>
        </ListItem>
    )
}