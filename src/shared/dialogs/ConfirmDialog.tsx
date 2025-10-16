import {type JSX} from "react";
import {
    Button,
    type ButtonOwnProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

/**
 * Props for the `ConfirmDialog` component.
 */
interface Props {
    /**
     * Controls whether the dialog is open or closed.
     * Set to `true` to display the dialog.
     */
    open: boolean;

    /**
     * Optional title displayed at the top of the dialog.
     * Defaults to `"Confirm"`.
     */
    title?: string;

    /**
     * Main message displayed inside the dialog body.
     * Typically used to describe the action to confirm.
     */
    message: string;

    /**
     * Whether the dialog should take up the full screen.
     * Useful for mobile layouts and really large texts. Defaults to `false`.
     */
    fullscreen?: boolean;

    /**
     * Label for the confirmation button.
     * Defaults to `"OK"`.
     */
    confirmLabel?: string;

    /**
     * Label for the cancel button.
     * Defaults to `"Cancel"`.
     */
    cancelLabel?: string;

    /**
     * Callback executed when the user confirms the action.
     */
    onConfirm: () => void;

    /**
     * Callback executed when the user cancels or closes the dialog.
     */
    onCancel: () => void;

    /**
     * MUI color of the confirm button.
     * Can be `"primary"`, `"secondary"`, `"error"`, etc.
     * Defaults to `"primary"`.
     */
    confirmButtonColor?: ButtonOwnProps['color']
}

/**
 * A reusable confirmation dialog component built with MUI's `Dialog`.
 * Displays a title, message, and two action buttons: *Cancel* and *Confirm*.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   title="Delete item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmLabel="Delete"
 *   cancelLabel="Cancel"
 *   confirmButtonColor="error"
 *   onConfirm={handleDelete}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 */
export default function ConfirmDialog({
    open,
    title = "Confirm",
    message,
    fullscreen = false,
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    confirmButtonColor = "primary",
}: Props): JSX.Element {
    return (
        <Dialog
            open={open} // Controls visibility of the dialog
            onClose={onCancel} // Callback for closing dialog
            fullScreen={fullscreen} // Makes dialog fullscreen on small devices if true
            aria-labelledby="confirm-dialog-title" // Accessibility: label for title
            aria-describedby="confirm-dialog-description" // Accessibility: label for content
        >
            {/* Optional dialog title */}
            {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}

            {/* Dialog main content */}
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>

            {/* Action buttons */}
            <DialogActions>
                {/* Cancel button */}
                <Button onClick={onCancel} color="inherit" variant="text">
                    {cancelLabel}
                </Button>
                {/* Confirm button */}
                <Button onClick={onConfirm} color={confirmButtonColor} variant="contained" autoFocus>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}