import {type JSX, type MouseEvent, useState} from "react";
import {IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Fade, useTheme, type Theme} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {MenuAction} from "@/types";

/**
 * Props for the {@link ThreeDotMenu} component.
 *
 * Defines the shape of data required to render a contextual menu
 * (the "three-dot" dropdown). Each menu entry is described via a
 * {@link MenuAction}, which provides a label, icon, handler, and color.
 *
 * @template MenuAction - Represents an individual menu item configuration.
 *
 * @property {MenuAction[]} actions
 * - The list of available actions to display in the dropdown menu.
 * - Each action includes:
 *   - `label`: The visible name of the menu item.
 *   - `icon` *(optional)*: An icon displayed before the label.
 *   - `onClick`: Callback executed when the item is selected.
 *   - `color` *(optional)*: A color from the MUI palette or a custom CSS color string.
 *
 * @example
 * ```tsx
 * const actions: MenuAction[] = [
 *   { label: "Edit", icon: <EditIcon />, onClick: handleEdit },
 *   { label: "Delete", icon: <DeleteIcon />, color: "error", onClick: handleDelete },
 * ];
 *
 * <ThreeDotMenu actions={actions} />
 * ```
 */
interface Props {
    actions: MenuAction[];
}

/**
 * `ThreeDotMenu` — A reusable contextual menu component.
 *
 * Displays a Material UI "three dots" icon button (`⋮`) that, when clicked,
 * opens a dropdown list of actions defined via the `MenuAction` interface.
 *
 * Each menu item can include:
 * - A localized label
 * - An optional icon
 * - A custom or theme-based color
 * - A callback function (`onClick`) executed when selected
 *
 * This component automatically resolves MUI theme colors or accepts raw CSS color strings,
 * ensuring consistent color behavior for all menu entries.
 *
 * @example
 * ```tsx
 * import ThreeDotMenu from "@/shared/menus/ThreeDotMenu";
 * import useMenuActions from "@/hooks/useMenuActions";
 *
 * function ExampleItemMenu() {
 *   const { details, edit, delete: deleteAction } = useMenuActions();
 *
 *   const actions = [
 *     details(() => openDetailsDialog(item.id)),
 *     edit(() => openEditDialog(item.id)),
 *     deleteAction(() => confirmDelete(item.id)),
 *   ];
 *
 *   return <ThreeDotMenu actions={actions} />;
 * }
 * ```
 *
 * @component
 * @param {Object} props - Component props
 * @param {MenuAction[]} props.actions - Array of menu actions to render. Each action defines
 *   its label, icon, click handler, and optional color.
 *
 * @returns {JSX.Element} The rendered three-dot menu button and action list.
 *
 * @remarks
 * - Uses `Fade` for menu transitions.
 * - Supports both Material UI palette colors and raw CSS color strings.
 * - Automatically closes after an action is clicked, even if the callback throws.
 * - Intended for use within cards, lists, or item headers.
 */
export default function ThreeDotMenu({ actions }: Props): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme: Theme = useTheme();

    /** Opens the menu when the icon button is clicked */
    const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

    /** Closes the menu */
    const handleMenuClose = (): void => setAnchorEl(null);

    /**
     * Resolves the appropriate color for a menu action.
     *
     * - If the color matches a valid key in the MUI palette, returns its `.main` variant.
     * - Otherwise, assumes it’s a valid CSS color string and returns it directly.
     *
     * @param color - The menu action color (from MUI palette or custom string).
     * @returns {string | undefined} The resolved color value or `undefined` if not specified.
     */
    const resolveColor = (color?: MenuAction["color"]): string | undefined => {
        if (!color || color === "inherit") return undefined;

        const paletteColor = (theme.palette as Record<string, any>)[color];
        if (paletteColor?.main) {
            return paletteColor.main;
        }

        return color;
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                aria-label="options"
                aria-controls={anchorEl ? 'actions-menu' : undefined}
                aria-haspopup="true"
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slots={{ transition: Fade }}
            >
                {actions.map(({ label, icon, onClick, color }: MenuAction, index: number): JSX.Element => (
                    <MenuItem
                        key={index}
                        onClick={(): void => {
                            try {
                                onClick();
                            } finally {
                                handleMenuClose();
                            }
                        }}
                        sx={{
                            color: resolveColor(color),
                            "& .MuiListItemIcon-root": { color: "inherit" },
                            "& .MuiListItemText-root": { color: "inherit" },
                        }}
                    >
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText>{label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}