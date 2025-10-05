import type {JSX} from "react";

export interface appRoute {
    path: string;
    element?: JSX.Element;
    label: string;
    i18nKey?: string;
    i18nNs?: string;
    icon: JSX.Element;
    children?: appRoute[];
}