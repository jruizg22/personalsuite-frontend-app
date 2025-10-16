import type {ComponentType} from "react";
import type {i18nProps} from "@/types";


export interface appTab {
    label: string;
    i18nProps: i18nProps;
    Component: ComponentType;
}