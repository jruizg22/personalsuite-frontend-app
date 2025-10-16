import {type Dispatch, type JSX, type SetStateAction, useState} from "react";
import {Box, Grid, type Theme} from "@mui/material";
import {SearchField} from "@/shared";
import {AddFAB} from "@/shared";
import {InputDialog, ConfirmDialog} from "@/shared/dialogs";

interface CrudTabProps<T extends { id: string }> {
    titleNew: string;
    titleEdit: string;
    titleDelete: string;
    deleteMessage: (item: T) => string;

    items: T[];
    setItems: Dispatch<SetStateAction<T[]>>;

    renderCard: (item: T, onEdit: () => void, onDelete: () => void) => JSX.Element;
    renderForm: (item: T, onChange: (field: keyof T, value: any) => void) => JSX.Element;

    createEmptyItem: () => T;

    searchProps?: {
        label: string;
        filterKeys: (keyof T)[] | keyof T;
    };
}

export default function CrudCardLayout<T extends { id: string }>({
    titleNew,
    titleEdit,
    titleDelete,
    deleteMessage,
    items,
    setItems,
    renderCard,
    renderForm,
    createEmptyItem,
    searchProps
}: CrudTabProps<T>): JSX.Element {
    const [searchText, setSearchText] = useState<string>("");
    const [selected, setSelected] = useState<T | null>(null);
    const [editing, setEditing] = useState<T | null>(null);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const handleAdd = (): void => {
        setEditing(createEmptyItem());
        setEditOpen(true);
    };

    const handleEditSave = (item: T): void => {
        setItems((prev: T[]): T[] => prev.map((i: T): T => (i.id === item.id ? item : i)));
        setEditOpen(false);
    };

    const handleDelete = (item: T): void => {
        setSelected(item);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = (): void => {
        if (selected) setItems((prev: T[]): T[] => prev.filter((i: T): boolean => i.id !== selected.id));
        setConfirmOpen(false);
    };

    const isNew: boolean = !editing?.id;

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
            }}
        >
            {searchProps && (
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        backgroundColor: (theme: Theme): string => theme.palette.background.default,
                        pt: 1,
                        mx: 1
                    }}
                >
                    <SearchField
                        value={searchText}
                        onChange={setSearchText}
                        label={searchProps.label}
                    />
                </Box>
            )}

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    m: 1
                }}
            >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {filteredItems.map((item: T): JSX.Element => (
                        <Grid key={item.id} size={{ xs: 4, sm: 4, md: 4 }} sx={{ display: "flex" }}>
                            {renderCard(
                                item,
                                (): void => {
                                    setEditing({ ...item });
                                    setEditOpen(true);
                                },
                                (): void => handleDelete(item)
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <AddFAB onClick={handleAdd} />

            {editing && (
                <InputDialog
                    open={editOpen}
                    title={isNew ? titleNew : titleEdit}
                    confirmLabel="Save"
                    cancelLabel="Cancel"
                    onConfirm={(): void => {
                        if (editing) {
                            if (isNew) {
                                setItems((prev: T[]): T[] => [
                                    ...prev,
                                    { ...editing, id: Date.now().toString() },
                                ]);
                            } else {
                                handleEditSave(editing);
                            }
                            setEditOpen(false);
                            setEditing(null);
                        }
                    }}
                    onCancel={(): void => setEditOpen(false)}
                >
                    {renderForm(editing, (field: keyof T, value: any): void =>
                        setEditing((prev: T | null) => (prev ? { ...prev, [field]: value } : null))
                    )}
                </InputDialog>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title={titleDelete}
                message={selected ? deleteMessage(selected) : ""}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={(): void => setConfirmOpen(false)}
            />
        </Box>
    );
}