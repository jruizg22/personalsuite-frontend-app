import type {JSX} from "react";

export interface i18nProps {
    i18nKey: string;
    i18nNs: string;
}

export interface appRoute {
    path: string;
    element?: JSX.Element;
    label: string;
    i18nProps: i18nProps;
    icon: JSX.Element;
    children?: appRoute[];
}