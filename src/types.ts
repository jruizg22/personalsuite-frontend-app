import type {ComponentType, JSX} from "react";

export interface language {
    value: string;
    label: string;
}

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

export interface appTab {
    label: string;
    i18nProps: i18nProps;
    Component: ComponentType;
}