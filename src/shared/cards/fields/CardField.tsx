import {type JSX, type ReactElement} from "react";
import {Box, type SvgIconProps, Tooltip} from "@mui/material";
import type {CardFieldProps} from "@/types";
import {CardDateFieldContent, CardLinkFieldContent, CardTextFieldContent} from "@/shared/cards";
import {StyledIcon} from "@/utils";

/**
 * `CardField` — A unified controller component for text, link, and date fields.
 *
 * This component acts as a **generic wrapper** that determines the field type
 * (`text`, `link`, or `date`) and delegates rendering to the corresponding
 * specialized content component:
 * - `<CardTextFieldContent />`
 * - `<CardLinkFieldContent />`
 * - `<CardDateFieldContent />`
 *
 * It also provides:
 * - **Optional icon support** with consistent styling.
 * - **Optional tooltip support** for hover descriptions.
 * - **Consistent layout and spacing** between the icon and content.
 *
 * ---
 *
 * ### Props
 * @interface CardFieldProps
 * @property {CardFieldType} field - Object describing the field type (`text`, `link`, or `date`)
 *   and its respective properties.
 * @property {ReactElement<SvgIconProps>} [icon] - Optional icon displayed before the field content.
 *   Automatically cloned and styled for consistent appearance.
 * @property {CardFieldColors} [colors] - Object defining text and icon colors.
 *   Falls back to inherited color context if omitted.
 * @property {string} [tooltip] - Optional tooltip text displayed on hover.
 *
 * ---
 *
 * ### Layout & Behavior
 * - Uses a flexbox layout (`display: flex`, `gap: 0.5`) for clean alignment.
 * - Icons are top-aligned (`alignItems: "flex-start"`) for better multi-line consistency.
 * - Tooltip is positioned at the bottom-left (`placement="bottom-start"`).
 *
 * ---
 *
 * ### Example
 * ```tsx
 * <CardField
 *   field={{ type: "link", url: "https://openai.com", label: "OpenAI" }}
 *   icon={<LinkIcon />}
 *   tooltip="Go to OpenAI"
 *   colors={{ text: "text.primary", icon: "primary.main" }}
 * />
 * ```
 *
 * ---
 *
 * ### Notes
 * - The visual styling of each content type (text/link/date) is handled by
 *   its respective subcomponent (`CardTextFieldContent`, etc.).
 * - If `tooltip` is not provided, hover detection is disabled via
 *   `disableHoverListener`.
 */
export default function CardField({field, icon, colors, tooltip}: CardFieldProps): JSX.Element {

    // Normalize the icon: clone and apply consistent style and size.
    // Ensures that icons align visually across different card field types.
    const styledIcon: ReactElement<SvgIconProps> | false = StyledIcon(icon, colors?.icon);

    // Dynamically render the correct content component
    // based on the field’s declared `type` property.
    let content: JSX.Element | null = null;
    switch (field.type) {
        case "text":
            content = <CardTextFieldContent {...field} color={colors?.text}/>;
            break;
        case "link":
            content = <CardLinkFieldContent {...field} color={colors?.text}/>;
            break;
        case "date":
            content = <CardDateFieldContent {...field} color={colors?.text}/>;
            break;
    }

    // Layout:
    // - Tooltip wraps the entire content (icon + field).
    // - Flexbox ensures consistent spacing and alignment.
    // - Tooltip automatically disables itself if no title is provided.
    return (
        <Tooltip title={tooltip || ""} disableHoverListener={!tooltip} placement="bottom-start">
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5}}>
                {styledIcon}
                <Box sx={{ flex: 1, minWidth: 0 }}>{content}</Box>
            </Box>
        </Tooltip>
    );
}