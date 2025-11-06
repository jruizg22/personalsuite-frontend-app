import {type JSX, type ReactNode} from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Props for the `InputDialog` component.
 *
 * This interface defines all configurable options
 * for the dialog, including visual appearance,
 * action callbacks, and interaction states.
 */
interface Props {
    /** Controls whether the dialog is open or closed. */
    open: boolean;

    /** Optional title displayed at the top of the dialog. Defaults to `"New/Edit"`. */
    title?: string;

    /**
     * If `true`, the dialog is in read-only mode.
     * Hides the action buttons and shows only the close icon.
     */
    readOnly?: boolean;

    /**
     * When `true`, the dialog expands to fullscreen.
     * Useful for mobile views or detailed forms.
     */
    fullscreen?: boolean;

    /** Text label for the confirm (primary) button. Defaults to `"Save"`. */
    confirmLabel?: string;

    /** Text label for the cancel (secondary) button. Defaults to `"Cancel"`. */
    cancelLabel?: string;

    /** Callback triggered when the confirm button is clicked. */
    onConfirm: () => void;

    /** Callback triggered when the dialog is closed or cancel button is clicked. */
    onCancel: () => void;

    /** Content of the dialog, typically a form or any custom JSX. */
    children: ReactNode;

    /** If `true`, disables the confirm button (e.g. invalid form). */
    confirmDisabled?: boolean;
}

/**
 * InputDialog Component
 *
 * A reusable dialog component for creating, editing, or viewing items.
 * It is designed to be flexible and integrate seamlessly in CRUD layouts.
 *
 * Features:
 * - Displays a title and content area for custom form fields or children.
 * - Includes a close button at the top-right corner.
 * - Optionally renders "Cancel" and "Save" (confirm) buttons when not in read-only mode.
 * - Supports fullscreen mode for smaller screens or detailed forms.
 * - Disables the confirm button when validation fails (via `confirmDisabled`).
 *
 * When `readOnly` is true:
 * - The dialog behaves as a “view details” modal.
 * - Only the top-right close icon is shown (no action buttons).
 *
 * @component
 *
 * @param {object} props - Component props
 * @param {boolean} props.open - Controls whether the dialog is visible.
 * @param {string} [props.title="New/Edit"] - Title displayed at the top of the dialog.
 * @param {boolean} [props.readOnly=false] - If true, hides the action buttons and disables editing.
 * @param {boolean} [props.fullscreen=false] - Renders the dialog in fullscreen mode (useful for mobile).
 * @param {string} [props.confirmLabel="Save"] - Label for the confirm (primary) button.
 * @param {string} [props.cancelLabel="Cancel"] - Label for the cancel (secondary) button.
 * @param {() => void} props.onConfirm - Callback invoked when the confirm button is clicked.
 * @param {() => void} props.onCancel - Callback invoked when the dialog is closed or cancel is clicked.
 * @param {ReactNode} props.children - Content of the dialog, typically form fields.
 * @param {boolean} [props.confirmDisabled=false] - If true, disables the confirm button (e.g. form invalid).
 *
 * @returns {JSX.Element} The rendered dialog component.
 *
 * @example
 * ```tsx
 * <InputDialog
 *   open={isOpen}
 *   title="Edit Channel"
 *   readOnly={isViewMode}
 *   onConfirm={handleSave}
 *   onCancel={handleClose}
 *   confirmLabel="Save"
 *   cancelLabel="Cancel"
 *   confirmDisabled={!isFormValid}
 * >
 *   <ChannelFormFields channel={channel} onChange={handleChange} readOnly={isViewMode} />
 * </InputDialog>
 * ```
 */
export default function InputDialog({
    open,
    title = "New/Edit",
    readOnly = false,
    fullscreen = false,
    confirmLabel = "Save",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    children,
    confirmDisabled = false
}: Props): JSX.Element {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            fullScreen={fullscreen}
            aria-labelledby="edit-dialog-title"
        >
            {/* Title Section */}
            {title && <DialogTitle id="edit-dialog-title">{title}</DialogTitle>}

            {/* Close Button (always visible) */}
            <IconButton
                aria-label="close"
                onClick={onCancel}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            {/* Dialog Content (custom form fields or read-only view) */}
            <DialogContent>{children}</DialogContent>

            {/* Action Buttons (hidden in read-only mode) */}
            {!readOnly && (
                <DialogActions>
                    <Button onClick={onCancel} color="inherit" variant="text">
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        color="primary"
                        variant="contained"
                        autoFocus
                        disabled={confirmDisabled}
                    >
                        {confirmLabel}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}