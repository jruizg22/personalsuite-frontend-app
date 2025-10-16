import {type JSX, type SyntheticEvent} from "react";
import {Snackbar, IconButton, type SnackbarCloseReason, type SnackbarOrigin} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Props for the `SnackbarShared` component.
 */
interface Props {
    /**
     * Controls whether the snackbar is visible.
     * `true` to show it, `false` to hide it.
     */
    open: boolean;

    /**
     * The message text displayed inside the snackbar.
     */
    message: string;

    /**
     * Callback function triggered when the snackbar closes
     * (either automatically or manually).
     */
    onClose: () => void;

    /**
     * Duration in milliseconds before the snackbar automatically closes.
     * Defaults to `4000` (4 seconds).
     */
    autoHideDuration?: number;

    /**
     * Screen position where the snackbar should appear.
     * Defaults to `{ vertical: "bottom", horizontal: "left" }`.
     */
    position?: SnackbarOrigin;

    /**
     * Whether to display a small close (✕) button inside the snackbar.
     * Defaults to `false`.
     */
    closeButton?: boolean;
}

/**
 * A reusable component that displays a brief message to the user.
 * Built on top of MUI's `Snackbar`, with optional close button support.
 *
 * @example
 * ```tsx
 * <SnackbarShared
 *   open={snackbarOpen}
 *   message="Item saved successfully"
 *   onClose={() => setSnackbarOpen(false)}
 *   autoHideDuration={3000}
 *   closeButton
 * />
 * ```
 */
export default function SnackbarShared({
    open,
    message,
    onClose,
    autoHideDuration = 4000,
    position = {vertical: "bottom", horizontal: "left"},
    closeButton = false
}: Props): JSX.Element {
    /**
     * Handles closing the snackbar.
     * Ignores the "clickaway" reason to prevent accidental dismissals.
     */
    const handleClose = (
        _event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ): void => {
        if (reason === "clickaway") return;
        onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={message}
            anchorOrigin={position}
            action={
                closeButton && (
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )
            }
        />
    )
}