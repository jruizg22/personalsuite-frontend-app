import type {PaletteColorKey} from "@/types";

/**
 * **CardFieldColors**
 *
 * Defines the color scheme used by card field components,
 * allowing independent control of text and icon colors.
 *
 * ---
 * ### Usage:
 * ```tsx
 * <CardTextField
 *   text="A disabled description"
 *   icon={<DescriptionIcon />}
 *   colors={{ text: "text.disabled", icon: "error.main" }}
 * />
 * ```
 *
 * Each property corresponds to a key from {@link PaletteColorKey},
 * meaning they can use any palette token recognized by MUI’s theme.
 *
 * @property text - The color applied to the text content.
 * @property icon - The color applied to the leading icon.
 */
export interface CardFieldColors {
    text?: PaletteColorKey;
    icon?: PaletteColorKey;
}