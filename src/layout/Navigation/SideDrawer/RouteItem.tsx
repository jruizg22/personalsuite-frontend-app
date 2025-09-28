import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type {appRoute} from "../../../routes.tsx";
import type {JSX} from "react";

interface Props {
    route: appRoute;
}

export default function RouteItem({ route }: Props): JSX.Element {
    const { path, label, icon } = route;

    return (
        <ListItem disablePadding>
            <ListItemButton
                component={NavLink}
                to={path}
                sx={{
                    "&.active": { backgroundColor: "rgba(0,0,0,0.08)" },
                }}
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    );
}