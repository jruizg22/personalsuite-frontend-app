import type {MenuAction} from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {commonKeys} from "@i18n/i18nKeys.ts";
import {useTranslation} from "react-i18next";

/**
 * `useMenuActions` — A custom React hook that provides
 * a set of preconfigured common menu actions for CRUD operations.
 *
 * It leverages `react-i18next` for localization and returns
 * translated and icon-enhanced menu actions ready for UI usage.
 *
 * Each action follows the `MenuAction` interface and is intended
 * for use in components like contextual menus (e.g., `ThreeDotMenu`).
 *
 * @example
 * ```tsx
 * const { details, edit, delete: deleteAction } = useMenuActions();
 *
 * const actions = [
 *   details(() => openDetailsDialog(item.id)),
 *   edit(() => openEditDialog(item.id)),
 *   deleteAction(() => confirmDelete(item.id)),
 * ];
 * ```
 *
 * @returns {object} An object containing factory functions for:
 * - `details`: Opens a read-only or detail view of an item.
 * - `edit`: Opens an edit form for modifying an item.
 * - `delete`: Triggers a deletion confirmation or removal flow.
 */
export default function useMenuActions() {
    const { t } = useTranslation();

    const actions = {
        /** Creates a "Details" menu action */
        details: (onClick: () => void): MenuAction => ({
            label: t(commonKeys.details, { ns: commonKeys.ns, defaultValue: "Details" }),
            icon: <VisibilityIcon fontSize="small" />,
            onClick,
        }),

        /** Creates an "Edit" menu action */
        edit: (onClick: () => void): MenuAction => ({
            label: t(commonKeys.edit, { ns: commonKeys.ns, defaultValue: "Edit" }),
            icon: <EditIcon fontSize="small" />,
            color: "primary",
            onClick,
        }),

        /** Creates a "Delete" menu action */
        delete: (onClick: () => void): MenuAction => ({
            label: t(commonKeys.delete, { ns: commonKeys.ns, defaultValue: "Delete" }),
            icon: <DeleteIcon fontSize="small" />,
            color: "error",
            onClick,
        }),
    };

    return actions;
}