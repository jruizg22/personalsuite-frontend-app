import type {JSX} from "react";
import type {ButtonOwnProps} from "@mui/material";

/**
 * Represents a single action item in a contextual or dropdown menu.
 *
 * Each `MenuAction` defines the label, icon, and callback behavior
 * for an interactive menu entry — for example, "Edit", "Delete", or "View Details".
 *
 * This interface is typically consumed by UI components such as `ThreeDotMenu`.
 */
export interface MenuAction {
    /**
     * Human-readable label for the menu action.
     * Should be localized via i18n if used in a multilingual app.
     */
    label: string;

    /**
     * Optional icon element displayed before the label.
     * Typically a Material UI icon component (e.g., `<EditIcon />`).
     */
    icon?: JSX.Element;

    /**
     * Function executed when the user selects this action.
     */
    onClick: () => void;

    /**
     * Optional color override for the action.
     *
     * Can be either:
     * - A predefined Material UI color (e.g., `"primary"`, `"error"`, `"success"`)
     * - A custom CSS color string (e.g., `"#ff4081"`, `"rebeccapurple"`)
     *
     * This property is often mapped to `theme.palette[color].main`
     * or used directly as a CSS color value in menu components.
     */
    color?: ButtonOwnProps['color'] | string;
}