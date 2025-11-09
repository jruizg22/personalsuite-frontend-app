import {cloneElement, isValidElement, type ReactElement} from "react";
import type {SvgIconProps} from "@mui/material";
import type {PaletteColorKey} from "@/types";

/**
 * Utility to clone and consistently style MUI `<SvgIcon>` components.
 *
 * This helper ensures all icons follow the same layout and spacing conventions
 * (e.g. alignment, sizing, and color), while still allowing local overrides via `extraSx`.
 *
 * ---
 * ### Example
 * ```tsx
 * import { styledIcon } from "@/utils/reactUtils";
 * import PersonIcon from "@mui/icons-material/Person";
 *
 * const userIcon = styledIcon(<PersonIcon />, "text.secondary");
 * ```
 *
 * @param icon - The icon React element to clone and style.
 * @param color - Optional color (default: `"text.primary"`).
 * @param size - Optional font size (default: `"small"`).
 * @param extraSx - Additional `sx` overrides merged into the icon.
 * @returns A cloned and styled React element, or `false` if `icon` is invalid.
 */
export default function StyledIcon(
    icon: ReactElement<SvgIconProps> | undefined,
    color: PaletteColorKey | undefined,
    size: SvgIconProps['fontSize'] = "small",
    extraSx: Record<string, any> = {}
): ReactElement<SvgIconProps> | false {
    if (!isValidElement(icon)) return false;

    return cloneElement(icon, {
        fontSize: size,
        sx: {
            mt: "2px", // slight top offset for better vertical alignment with text
            flexShrink: 0,
            color,
            ...(icon.props.sx || {}),
            ...extraSx,
        },
    });
}