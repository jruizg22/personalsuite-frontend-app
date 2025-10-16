import type {JSX} from "react";
import type {i18nProps} from "@/types";

export interface appRoute {
    path: string;
    element?: JSX.Element;
    label: string;
    i18nProps: i18nProps;
    icon: JSX.Element;
    children?: appRoute[];
}