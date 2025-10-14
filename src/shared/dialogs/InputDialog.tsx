import {type JSX, type ReactNode} from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
} from "@mui/material";

interface Props {
    open: boolean;
    title?: string;
    fullscreen?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    children: ReactNode;
}

export default function InputDialog({
    open,
    title = "New/Edit",
    fullscreen = false,
    confirmLabel = "Save",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    children,
}: Props): JSX.Element {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            fullScreen={fullscreen}
            aria-labelledby="edit-dialog-title"
        >
            {title && <DialogTitle id="edit-dialog-title">{title}</DialogTitle>}

            <DialogContent>{children}</DialogContent>

            <DialogActions>
                <Button onClick={onCancel} color="inherit" variant="text">
                    {cancelLabel}
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}