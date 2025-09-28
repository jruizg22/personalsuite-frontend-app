import type {JSX} from "react";
import {MainPage} from "./pages/MainPage";
import HomeIcon from "@mui/icons-material/Home";

export interface appRoute {
    path: string;
    element: JSX.Element;
    label: string;
    icon: JSX.Element;
}

export const appRoutes: appRoute[] = [
    {path: "/main", element: <MainPage/>, label: "Main Page", icon: <HomeIcon/>}
]