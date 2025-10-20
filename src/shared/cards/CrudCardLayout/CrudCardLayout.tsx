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

    onCreate: (item: Partial<T>) => Promise<void>;
    onUpdate: (id: string, updated: Partial<T>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;

    /**
     * Function to render each item as a card.
     * @param item - The item to render.
     * @param onEdit - Callback to edit this item.
     * @param onDelete - Callback to delete this item.
     */
    renderCard: (item: T, onEdit: () => void, onDelete: () => void) => JSX.Element;

    /**
     * Function to render the form inside the input dialog.
     * @param item - The current item.
     * @param onChange - Callback to update a field of the item.
     */
    renderForm: (item: T, onChange: (field: keyof T, value: any) => void) => JSX.Element;

    requiredFields?: (keyof T)[];

    /**
     * Function that creates a new empty item.
     */
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
 * `CrudCardLayout` is a reusable layout component for displaying CRUD items as cards.
 * It supports adding, editing, deleting items, searching, and optional snackbar feedback.
 *
 * @template T - Generic type for items; must have an `id` string property.
 *
 * @param {Object} props - Props object.
 * @param {boolean} props.loading - Flag to show loading screen if data is loading
 * @param {string} props.titleNew - Title for the "new item" dialog.
 * @param {string} props.titleEdit - Title for the "edit item" dialog.
 * @param {string} props.titleDelete - Title for the "delete item" dialog.
 * @param {(item: T) => string} props.deleteMessage - Function to generate the message for delete confirmation.
 * @param {snackBarProps} [props.snackbar] - Optional messages for snackbar notifications (`new`, `edit`, `delete`).
 * @param {T[]} props.items - Array of items to display.
 * @param {(item: T, onEdit: () => void, onDelete: () => void) => JSX.Element} props.renderCard - Function to render each item as a card.
 * @param {(item: T, onChange: (field: keyof T, value: any) => void) => JSX.Element} props.renderForm - Function to render the form inside the input dialog.
 * @param {() => T} props.createEmptyItem - Function to create a new empty item.
 * @param {Object} [props.searchProps] - Optional search configuration.
 * @param {string} props.searchProps.label - Label for the search input.
 * @param {(keyof T)[] | keyof T} props.searchProps.filterKeys - Keys of the item to filter when searching.
 *
 * @returns {JSX.Element} The rendered CRUD card layout component.
 *
 * @example
 * <CrudCardLayout
 *   titleNew="Add User"
 *   titleEdit="Edit User"
 *   titleDelete="Delete User"
 *   deleteMessage={(user) => `Are you sure you want to delete ${user.name}?`}
 *   snackbar={{ new: "User created", edit: "User updated", delete: "User deleted" }}
 *   items={users}
 *   setItems={setUsers}
 *   renderCard={(user, onEdit, onDelete) => <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />}
 *   renderForm={(user, onChange) => <UserForm user={user} onChange={onChange} />}
 *   createEmptyItem={() => ({ id: "", name: "" })}
 *   searchProps={{ label: "Search Users", filterKeys: ["name", "email"] }}
 * />
 */
export default function CrudCardLayout<T extends { id: string }>({
    loading,
    titleNew,
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
    const [searchText, setSearchText] = useState<string>("");
    const [selected, setSelected] = useState<T | null>(null);
    const [editing, setEditing] = useState<T | null>(null);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    // Snackbar states
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const {t} = useTranslation();

    const [formValid, setFormValid] = useState<boolean>(false);

    function validateForm(item: T | null): boolean {
        if (!item || !requiredFields) return true;
        return requiredFields.every(f => item[f] && String(item[f]).trim() !== "");
    }

    // Function to show the snackbar with a given message
    const showSnackbar = (message: string): void => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // Open dialog to create a new item
    const handleAdd = (): void => {
        setEditing(createEmptyItem());
        setEditOpen(true);
    };

    // Save edited item
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
        }
    };

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

    const isNew: boolean = !editing?.id;

    const isDesktop: boolean = useIsDesktop();

    // Filter items based on search text
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
                            (): void => {
                                setEditing({ ...item });
                                setEditOpen(true);
                            },
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
                    title={isNew ? titleNew : titleEdit}
                    fullscreen={!isDesktop}
                    confirmLabel={t(commonKeys.save, {ns: commonKeys.ns, defaultValue: "Save"})}
                    cancelLabel={t(commonKeys.cancel, {ns: commonKeys.ns, defaultValue: "Cancel"})}
                    onConfirm={handleSave}
                    onCancel={(): void => setEditOpen(false)}
                    confirmDisabled={!formValid}
                >
                    {renderForm(editing, (field: keyof T, value: any): void => {
                        setEditing(prev => (prev ? { ...prev, [field]: value } : null));
                        setFormValid(validateForm({ ...editing, [field]: value }));
                    })}
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