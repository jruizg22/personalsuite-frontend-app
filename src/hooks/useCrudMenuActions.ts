import {useMenuActions} from "@/shared/menus";
import type {MenuAction} from "@/types";

/**
 * Callback definitions for CRUD-related menu actions.
 *
 * Each callback is optional — if omitted, the corresponding menu action
 * will not be included in the returned list.
 */
interface CrudMenuCallbacks {
    /** Triggered when the user selects the "View details" action */
    onView?: () => void;

    /** Triggered when the user selects the "Edit" action */
    onEdit?: () => void;

    /** Triggered when the user selects the "Delete" action */
    onDelete?: () => void;
}

/**
 * **useCrudMenuActions** — A convenience hook for generating contextual
 * CRUD (Create, Read, Update, Delete) menu actions.
 *
 * It automatically builds a list of `MenuAction` objects
 * based on which callbacks are provided.
 *
 * @example
 * ```tsx
 * const actions = useCrudMenuActions({
 *   onView: () => openDetails(item),
 *   onEdit: () => openEditDialog(item),
 *   onDelete: () => confirmDelete(item.id),
 * });
 *
 * return <ThreeDotMenu actions={actions} />;
 * ```
 *
 * @param {CrudMenuCallbacks} callbacks - Object containing optional handlers
 * for each CRUD menu action (`onView`, `onEdit`, `onDelete`).
 *
 * @returns {MenuAction[]} An array of `MenuAction` objects ready to be passed
 * into a contextual menu or action list. Only includes actions whose
 * corresponding callbacks were provided.
 *
 * @remarks
 * - The labels and icons are automatically localized via `useMenuActions()`.
 * - This hook is often used with `CrudCardItem` or `ThreeDotMenu`.
 */
export function useCrudMenuActions({ onView, onEdit, onDelete }: CrudMenuCallbacks): MenuAction[] {
    const { details, edit, delete: del } = useMenuActions();

    return [
        ...(onView ? [details(onView)] : []),
        ...(onEdit ? [edit(onEdit)] : []),
        ...(onDelete ? [del(onDelete)] : []),
    ];
}