import {type JSX} from "react";
import {Typography} from "@mui/material";
import type {CardTextFieldProps} from "@/types";

/**
 * `CardTextFieldContent`
 *
 * Renders plain text within a card using consistent typography and visual constraints.
 * It automatically handles text wrapping, truncation, and overflow behavior
 * to ensure uniform appearance across different card layouts.
 *
 * This component is meant to be used internally by `CardField`, but can also
 * be reused anywhere a standardized text field is needed.
 *
 * @example
 * ```tsx
 * <CardTextFieldContent
 *   text="This is a long description that will be truncated after three lines."
 *   variant="body2"
 *   color="text.primary"
 * />
 * ```
 */
export default function CardTextFieldContent({
    text,
    variant = "body2",
    color,
}: CardTextFieldProps): JSX.Element {
    return (
        <Typography
            variant={variant}
            sx={{
                color: color,
                // Allow text to wrap naturally even within long words
                overflowWrap: "anywhere",
                wordBreak: "break-word",

                // Enable multiline truncation with ellipsis (max 3 lines)
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            {text}
        </Typography>
    );
}