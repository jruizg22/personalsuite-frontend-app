import {type JSX, type ReactElement, cloneElement, isValidElement} from "react";
import {type SvgIconProps} from "@mui/material";
import {Box, Typography, type TypographyProps} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

/**
 * Props for the CardTextField component.
 */
interface Props {
    /** The text content to display */
    text: string;

    /** MUI typography variant (e.g., 'body1', 'caption', etc.) */
    variant?: TypographyProps['variant'];

    /** Color for both icon and text */
    color?: string;

    /** Optional icon displayed before the text */
    icon?: ReactElement<SvgIconProps>;
}

/**
 * **CardTextField — A compact text + icon component**
 *
 * Displays a short piece of text with an optional leading icon.
 * Designed for use inside Material UI Cards or list items.
 *
 * 🧩 Features:
 * - Properly aligns the icon with multi-line text (top-aligned).
 * - Uses MUI's system props for consistency and theming.
 * - Clones and normalizes the icon style.
 */
export default function CardTextField({
    text,
    variant = "body2",
    color = "text.secondary",
    icon = <DescriptionIcon/>
}: Props): JSX.Element {
    // Clone the icon to enforce consistent styling (size, color, layout)
    const styledIcon =
        isValidElement(icon) &&
        cloneElement(icon, {
            fontSize: "small",
            sx: {
                mt: "2px", // nudge down slightly to align better with text top
                flexShrink: 0,
                color,
                ...(icon.props.sx || {}),
            },
        });

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start", // top-align icon with text
                gap: 0.5,
                color,
            }}
        >
            {styledIcon}
            <Typography
                variant={variant}
                sx={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}