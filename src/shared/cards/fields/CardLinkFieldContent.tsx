import {type JSX} from "react";
import {Typography} from "@mui/material";
import type {CardLinkFieldProps} from "@/types";

/**
 * `CardLinkFieldContent`
 *
 * Renders a hyperlink styled consistently with the rest of the card fields.
 *
 * Supports text truncation, optional underline control, and theming via color props.
 * Automatically opens links in a new tab (`target="_blank"`) and ensures security
 * through `rel="noopener noreferrer"`.
 *
 * This component is intended for use within `CardField` when rendering URL-based data.
 *
 * @example
 * ```tsx
 * <CardLinkFieldContent
 *   url="https://example.com"
 *   label="View Details"
 *   color="primary.main"
 *   underline
 *   truncate
 *   variant="body2"
 * />
 * ```
 */
export default function CardLinkFieldContent({
    url,
    label,
    color = "primary.main",
    underline = true,
    truncate = false,
    variant = "body2",
}: CardLinkFieldProps): JSX.Element {
    return (
        <Typography
            // Render Typography as an <a> element for consistent text styling
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant={variant}
            sx={{
                // Prevent overflow issues and allow text truncation when needed
                display: "inline-block",
                maxWidth: "100%",
                color: color,
                textDecoration: underline ? "underline" : "none",
                overflow: truncate ? "hidden" : "visible",
                textOverflow: truncate ? "ellipsis" : "unset",
                whiteSpace: truncate ? "nowrap" : "normal",
                verticalAlign: "middle",

                // Toggle underline behavior on hover for visual feedback
                "&:hover": {
                    textDecoration: underline ? "none" : "underline",
                },
            }}
        >
            {/* Use provided label, fallback to raw URL if no label is given */}
            {label ?? url}
        </Typography>
    );
}