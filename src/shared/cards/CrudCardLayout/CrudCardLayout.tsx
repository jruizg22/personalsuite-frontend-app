import {type JSX, useState} from "react";
import {Box} from "@mui/material";
import {AddFAB, LoadingScreen, SnackbarShared} from "@/shared";
import {ConfirmDialog, InputDialog} from "@/shared/dialogs";
import {useTranslation} from "react-i18next";
import {commonKeys} from "@/i18n";
import {SearchBarSticky} from "@/shared/SearchField";
import {CrudCardContainer} from "@/shared/cards/CrudCardLayout";
import {useIsDesktop} from "@/hooks";

/**
 * Type for the `snackbar` field of `CrudCardLayout` props.
 * @param new - The message to show after creating a new item.
 * @param edit - The message to show after editing an item.
 * @param delete - The message to show after deleting an item.
 */
interface snackBarProps {
    /**
     * Message to show after creating a new item.
     */
    new: string;

    /**
     * Message to show after editing an item.
     */
    edit: string;

    /**
     * Message to show after deleting an item.
     */
    delete: string;
}

/**
 * Props for the `CrudCardLayout` component.
 *
 * @template T - Generic type for items; must have an `id` string property.
 */
interface Props<T extends { id: string }> {
    /**
     * Flag to show the loading screen if data is being recovered
     */
    loading: boolean;

    /**
     * Title for the "view" dialog.
     */
    titleView: string;

    /**
     * Title for the "new item" dialog.
     */
    titleNew: string;

    /**
     * Title for the "edit item" dialog.
     */
    titleEdit: string;

    /**
     * Title for the "delete item" dialog.
     */
    titleDelete: string;

    /**
     * Function that generates a message for the delete confirmation dialog.
     * Receives the item to be deleted and returns a string message.
     */
    deleteMessage: (item: T) => string;

    /**
     * Optional snackbar messages for create, edit, and delete operations.
     */
    snackbar?: snackBarProps;

    /**
     * Array of items to display.
     */
    items: T[];

    /** Callback invoked to create a new item */
    onCreate: (item: Partial<T>) => Promise<void>;

    /** Callback invoked to update an existing item by ID */
    onUpdate: (id: string, updated: Partial<T>) => Promise<void>;

    /** Callback invoked to delete an item by ID */
    onDelete: (id: string) => Promise<void>;

    /**
     * Function to render each item as a card.
     * @param item - The item to render.
     * @param onView - Callback to view this item in detail.
     * @param onEdit - Callback to edit this item.
     * @param onDelete - Callback to delete this item.
     */
    renderCard: (item: T, onView: () => void, onEdit: () => void, onDelete: () => void) => JSX.Element;

    /**
     * Function to render the form inside the input dialog.
     * @param item - The current item.
     * @param onChange - Callback to update a field of the item.
     */
    renderForm: (
        item: T,
        onChange: (field: keyof T, value: any) => void,
        readOnly?: boolean
    ) => JSX.Element;

    /**
     * Optional array of required fields. Used to validate the form
     * and disable the confirm/save button if any required field is empty.
     */
    requiredFields?: (keyof T)[];

    /** Function to create a new empty item for the "new" dialog */
    createEmptyItem: () => T;

    /**
     * Optional search configuration.
     */
    searchProps?: {
        /**
         * Label for the search input.
         */
        label: string;

        /**
         * Keys of the item to filter when searching.
         * Can be a single key or an array of keys.
         */
        filterKeys: (keyof T)[] | keyof T;
    };
}

/**
 * `CrudCardLayout` is a reusable layout component for managing CRUD items as cards.
 *
 * Features:
 * - Supports creating, editing, deleting items
 * - Built-in loading screen and snackbar feedback
 * - Optional search/filter functionality
 * - Form validation for required fields
 *
 * @template T - Generic type for items; must have an `id` string property
 *
 * @param {Props<T>} props - Props for the component
 * @returns {JSX.Element} Rendered CRUD card layout
 *
 * @example
 * <CrudCardLayout
 *   loading={false}
 *   titleNew="Add User"
 *   titleEdit="Edit User"
 *   titleDelete="Delete User"
 *   deleteMessage={(user) => `Are you sure you want to delete ${user.name}?`}
 *   snackbar={{ new: "User created", edit: "User updated", delete: "User deleted" }}
 *   items={users}
 *   onCreate={async (user) => await createUser(user)}
 *   onUpdate={async (id, updated) => await updateUser(id, updated)}
 *   onDelete={async (id) => await deleteUser(id)}
 *   renderCard={(user, onEdit, onDelete) => <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />}
 *   renderForm={(user, onChange) => <UserForm user={user} onChange={onChange} />}
 *   createEmptyItem={() => ({ id: "", name: "" })}
 *   requiredFields={["id", "name"]}
 *   searchProps={{ label: "Search Users", filterKeys: ["name", "email"] }}
 * />
 */
export default function CrudCardLayout<T extends { id: string }>({
    loading,
    titleNew,
    titleView,
    titleEdit,
    titleDelete,
    deleteMessage,
    snackbar,
    items,
    onCreate,
    onUpdate,
    onDelete,
    renderCard,
    renderForm,
    requiredFields,
    createEmptyItem,
    searchProps
}: Props<T>): JSX.Element {
    /** Current text in the search input */
    const [searchText, setSearchText] = useState<string>("");

    /** Currently selected item for deletion */
    const [selected, setSelected] = useState<T | null>(null);

    /** Item currently being edited/created */
    const [editing, setEditing] = useState<T | null>(null);

    /** Flag to control creation of a new item */
    const [isNew, setIsNew] = useState<boolean>(false);

    /** Whether the current dialog is read-only (View mode) */
    const [isView, setIsView] = useState<boolean>(false);

    /** Flag to control visibility of edit/create dialog */
    const [editOpen, setEditOpen] = useState<boolean>(false);

    /** Flag to control visibility of delete confirmation dialog */
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    /** Snackbar visibility */
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    /** Snackbar message */
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const {t} = useTranslation();

    /** Tracks whether the current form is valid according to `requiredFields` */
    const [formValid, setFormValid] = useState<boolean>(false);

    /**
     * Validates the current form based on `requiredFields`.
     * @param item - The item to validate
     * @returns true if all required fields are filled, false otherwise
     */
    function validateForm(item: T | null): boolean {
        if (!item || !requiredFields) return true;
        return requiredFields.every(f => item[f] && String(item[f]).trim() !== "");
    }

    /**
     * Shows a snackbar with the given message
     * @param message - Message to show in snackbar
     */
    const showSnackbar = (message: string): void => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    /**
     * Opens the dialog to create a new item
     */
    const handleAdd = (): void => {
        setEditing(createEmptyItem());
        setIsNew(true);
        setEditOpen(true);
    };

    /**
     * Saves the currently editing item
     * - Calls `onCreate` if it's a new item
     * - Calls `onUpdate` if editing an existing item
     * - Shows snackbar feedback messages if `snackbar` is provided
     */
    const handleSave = async (): Promise<void> => {
        if (!editing) return;

        try {
            if (isNew) {
                await onCreate(editing);
                if (snackbar) showSnackbar(snackbar.new);
            } else {
                await onUpdate(editing.id, editing);
                if (snackbar) showSnackbar(snackbar.edit);
            }
        } finally {
            setEditOpen(false);
            setEditing(null);
            setIsNew(false);
        }
    };

    /**
     * Confirms deletion of the selected item
     * - Calls `onDelete` and shows snackbar feedback if `snackbar` is provided
     */
    const handleDeleteConfirm = async (): Promise<void> => {
        if (!selected) return;

        try {
            await onDelete(selected.id);
            if (snackbar) showSnackbar(snackbar.delete);
        } finally {
            setConfirmOpen(false);
            setSelected(null);
        }
    };

    /** Determines if the viewport is desktop size (for dialog fullscreen behavior) */
    const isDesktop: boolean = useIsDesktop();

    /**
     * Filters the items array based on the search input
     */
    const filteredItems: T[] =
        searchProps && searchText
            ? items.filter((item: T): boolean => {
                const { filterKeys } = searchProps;
                const keys: (keyof T)[] = Array.isArray(filterKeys) ? filterKeys : [filterKeys];
                const text: string = searchText.toLowerCase();
                return keys.some((k: keyof T): boolean => String(item[k] ?? "").toLowerCase().includes(text));
            })
            : items;

    return (
        <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
            {/* Search bar (sticky at the top if provided) */}
            {searchProps && (
                <SearchBarSticky
                    value={searchText}
                    onChange={setSearchText}
                    label={searchProps.label}
                />
            )}

            {/* Loading screen / Container for cards with vertical scroll */}
            {loading ? (
                <LoadingScreen />
            ) : (
                <CrudCardContainer
                    items={filteredItems}
                    renderCard={(item: T): JSX.Element =>
                        renderCard(
                            item,
                            // VIEW HANDLER
                            (): void => {
                                setEditing({ ...item });
                                setIsView(true);
                                setEditOpen(true);
                            },
                            // EDIT HANDLER
                            (): void => {
                                setEditing({ ...item });
                                setIsView(false);
                                setEditOpen(true);
                            },
                            // DELETE HANDLER
                            (): void => {
                                setSelected(item);
                                setConfirmOpen(true);
                            }
                        )
                    }
                />
            )}

            {/* Floating action button to add a new item */}
            <AddFAB onClick={handleAdd} />

            {/* Dialog for creating or editing an item */}
            {editing && (
                <InputDialog
                    open={editOpen}
                    title={
                        isView
                            ? titleView ?? t(commonKeys.details, { ns: commonKeys.ns, defaultValue: "Details" })
                            : isNew
                                ? titleNew
                                : titleEdit
                    }
                    readOnly={isView}
                    fullscreen={!isDesktop}
                    confirmLabel={t(commonKeys.save, {ns: commonKeys.ns, defaultValue: "Save"})}
                    cancelLabel={t(commonKeys.cancel, {ns: commonKeys.ns, defaultValue: "Cancel"})}
                    onConfirm={handleSave}
                    onCancel={(): void => {
                        setEditOpen(false);
                        setEditing(null);
                        setIsNew(false);
                        setIsView(false);
                    }}
                    confirmDisabled={!formValid}
                >
                    {renderForm(
                        editing,
                        (field: keyof T, value: any): void => {
                            setEditing(prev => (prev ? { ...prev, [field]: value } : null));
                            setFormValid(validateForm({ ...editing, [field]: value }));
                        },
                        isView
                    )}
                </InputDialog>
            )}

            {/* Dialog to confirm deletion */}
            <ConfirmDialog
                open={confirmOpen}
                title={titleDelete}
                message={selected ? deleteMessage(selected) : ""}
                confirmLabel={t(commonKeys.delete, {ns: commonKeys.ns, defaultValue: "Delete"})}
                cancelLabel={t(commonKeys.cancel, {ns: commonKeys.ns, defaultValue: "Cancel"})}
                onConfirm={handleDeleteConfirm}
                onCancel={(): void => setConfirmOpen(false)}
                confirmButtonColor="error"
            />

            {/* Snackbar for feedback messages */}
            <SnackbarShared
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={(): void => setSnackbarOpen(false)}
                closeButton
            />
        </Box>
    );
}