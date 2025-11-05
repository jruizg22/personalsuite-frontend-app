import {type JSX, type ReactNode} from "react";
import {CardContent} from "@mui/material";

interface Props {
    /** Inner elements displayed inside the card content area. */
    children: ReactNode;
}

/**
 * `CardItemContent` provides a standardized layout for card content areas.
 *
 * It wraps its children in a vertically stacked `CardContent` block with
 * consistent spacing and padding, ensuring visual harmony between cards.
 */
export default function CardItemContent({children}: Props): JSX.Element {
    return (
        <CardContent
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: 2,
            }}
        >
            {children}
        </CardContent>
    );
}