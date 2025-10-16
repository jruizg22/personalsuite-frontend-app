import type {JSX} from "react";

export interface MenuAction {
    label: string;
    icon?: JSX.Element;
    onClick: () => void;
    color?: string;
}