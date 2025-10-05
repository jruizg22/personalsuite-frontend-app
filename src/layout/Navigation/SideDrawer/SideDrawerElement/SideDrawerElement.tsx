import {type appRoute} from "@/types";
import {type JSX} from "react";
import ElementNoChildren from "./ElementNoChildren";
import ElementWithChildren from "./ElementWithChildren";

interface Props {
    route: appRoute;
    handleItemClick?: () => void;
}

export default function SideDrawerElement({ route, handleItemClick }: Props): JSX.Element {
    const { children }: appRoute = route;

    if (children && children.length > 0) {
        return (
            <ElementWithChildren route={route} handleItemClick={handleItemClick}/>
        );
    }

    return (
        <ElementNoChildren route={route} handleItemClick={handleItemClick}/>
    );
}