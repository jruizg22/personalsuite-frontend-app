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
 * CardTextField — A compact text + icon component
 *
 * Displays a short piece of text with an optional leading icon.
 * Designed for use inside Material UI Cards or list items.
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
                flexShrink: 0, // prevent icon from shrinking in flex layouts
                color: "text.secondary",
                ...(icon.props.sx || {}), // preserve custom user styles
            },
        });

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color }}>
            {styledIcon}
            <Typography variant={variant}>{text}</Typography>
        </Box>
    );
}