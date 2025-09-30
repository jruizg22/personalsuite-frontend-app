import type {appRoute} from "../../../../routes.tsx";
import {type JSX} from "react";
import ElementNoChildren from "./ElementNoChildren";
import ElementWithChildren from "./ElementWithChildren";

interface Props {
    route: appRoute;
}

export default function SideDrawerElement({ route }: Props): JSX.Element {
    const { children }: appRoute = route;

    if (children && children.length > 0) {
        return (
            <ElementWithChildren route={route}/>
        );
    }

    return (
        <ElementNoChildren route={route}/>
    );
}