import {type JSX} from "react";
import {Card, CardHeader, type CardProps} from "@mui/material";
import type {MenuAction} from "@/types";
import ThreeDotMenu from "@/shared/menus/three-dot-menu/ThreeDotMenu.tsx";

interface Props {
    headerTitle: string;
    variant?: CardProps['variant'];
    children: JSX.Element;
    actions?: MenuAction[];
}

export default function CardShared({
    headerTitle,
    variant = 'outlined',
    children,
    actions = [],
}: Props): JSX.Element {
    return (
        <Card
            variant={variant}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: '100%'
            }}
        >
            <CardHeader
                title={headerTitle}
                action={actions.length > 0 ? <ThreeDotMenu actions={actions} /> : null}
            />
            {children}
        </Card>
    )
}