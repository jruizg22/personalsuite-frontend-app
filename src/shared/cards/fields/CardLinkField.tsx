import {type JSX, isValidElement, cloneElement, type ReactElement} from "react";
import {Box, type SvgIconProps, Typography, type TypographyProps} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

/**
 * Props for the `CardLinkField` component.
 *
 * @interface Props
 * @property {string} url - The destination URL of the link. Opens in a new tab.
 * @property {string} [label] - Optional label text to display instead of the raw URL.
 * @property {string} [color='primary.main'] - The color applied to the link text.
 * @property {ReactElement<SvgIconProps>} [icon=<LinkIcon />] - Optional leading icon displayed before the link text.
 * @property {boolean} [underline=true] - Whether to show an underline for the link text.
 * @property {boolean} [truncate=false] - If true, truncates long text with an ellipsis.
 * @property {TypographyProps['variant']} [variant='body2'] - MUI Typography variant for text size and weight.
 */
interface Props {
    url: string;
    label?: string;
    color?: string;
    icon?: ReactElement<SvgIconProps>
    underline?: boolean;
    truncate?: boolean;
    variant?: TypographyProps['variant'];
}

/**
 * **CardLinkField — Displays a clickable, optionally truncated URL with an icon.**
 *
 * A compact, accessible link field designed for use inside cards, lists, or detail panels.
 * It displays an icon (by default a link icon) next to a text label or URL, opening the
 * link in a new browser tab.
 *
 * @example
 * ```tsx
 * <CardLinkField
 *   url="https://youtube.com/@OpenAI"
 *   label="OpenAI Channel"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CardLinkField
 *   url="https://example.com/very/long/link"
 *   truncate
 *   color="text.secondary"
 *   underline={false}
 * />
 * ```
 *
 * @description
 * - Automatically adds `target="_blank"` and `rel="noopener noreferrer"` for safety.
 * - The link text can be truncated to a single line if desired.
 * - The icon is **not part of the clickable link** for better accessibility and clarity.
 * - Uses MUI system props for consistent styling and theme awareness.
 */
export default function CardLinkField({
    url,
    label,
    color = 'primary.main',
    icon = <LinkIcon/>,
    underline = true,
    truncate = false,
    variant = 'body2',
}: Props): JSX.Element {
    // Clone the icon to enforce consistent styling (size, color, layout)
    const styledIcon =
        isValidElement(icon) &&
        cloneElement(icon, {
            fontSize: "small",
            sx: {
                mt: "2px", // nudge down slightly to align better with text top
                flexShrink: 0,
                ...(icon.props.sx || {}),
            },
        });

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: underline ? "underline" : "none",
                maxWidth: "100%"
            }}
        >
            {/* Icon sits outside the clickable area */}
            {styledIcon}

            {/* Link text (clickable area) */}
            <Typography
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variant={variant}
                sx={{
                    minWidth: 0,
                    overflow: truncate ? "hidden" : "visible",
                    textOverflow: truncate ? "ellipsis" : "unset",
                    whiteSpace: truncate ? "nowrap" : "normal",
                    flexShrink: 1,
                    color,
                    '&:hover': {
                        textDecoration: underline ? "none" : "underline",
                    },
                }}
            >
                {label ?? url}
            </Typography>
        </Box>
    )
}