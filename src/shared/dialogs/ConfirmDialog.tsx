import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {type JSX} from "react";

interface Props {
    open: boolean;
    title?: string;
    message: string;
    fullscreen?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title = "Confirm",
    message,
    fullscreen = false,
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}: Props): JSX.Element {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            fullScreen={fullscreen}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}

            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>

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