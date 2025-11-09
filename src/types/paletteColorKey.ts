/**
 * **PaletteColorKey**
 *
 * Union type representing the most commonly used color tokens from
 * the Material UI theme palette.
 *
 * This type allows components to accept predefined color identifiers
 * (e.g. `"primary"`, `"error.main"`, `"text.secondary"`) that are
 * automatically resolved by MUI’s `sx` system to the corresponding
 * palette values.
 *
 * ---
 * ### Examples:
 * ```tsx
 * <Typography color="text.secondary">Muted text</Typography>
 * <Box sx={{ color: 'error.main' }}>Error icon</Box>
 * ```
 *
 * These keys align with the standard MUI theme structure:
 * ```ts
 * theme.palette = {
 *   primary: { main: '#1976d2' },
 *   text: { primary: '#000', secondary: '#555', disabled: '#aaa' },
 *   error: { main: '#d32f2f' },
 *   ...
 * }
 * ```
 */
export type PaletteColorKey =
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "text.primary"
    | "text.secondary"
    | "text.disabled"
    | "primary.main"
    | "error.main"
    | "warning.main"
    | "info.main"
    | "success.main";