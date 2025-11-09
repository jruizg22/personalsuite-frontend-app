import type {ReactElement} from "react";
import type {SvgIconProps, TypographyProps} from "@mui/material";
import type {CardFieldColors} from "@/types";

/**
 * Common visual props shared by all field types.
 * Defines the color and typography variant used when rendering text-based content.
 */
interface SharedProps {
    /** The color applied to the text portion of the field. */
    color?: CardFieldColors['text'];

    /** MUI Typography variant (e.g. `'body2'`, `'subtitle2'`, `'caption'`). */
    variant?: TypographyProps['variant'];
}

/**
 * Represents a plain text field inside a card.
 * Typically used for static information such as labels, statuses, or metadata.
 */
export interface CardTextFieldProps extends SharedProps {
    /** Fixed discriminator to identify the field type as text. */
    type: "text";

    /** The text content displayed within the field. */
    text: string;
}

/**
 * Represents a date field inside a card.
 * Handles both `string` and `Date` input types for flexibility.
 */
export interface CardDateFieldProps extends SharedProps {
    /** Fixed discriminator to identify the field type as date. */
    type: "date";

    /** The date value to be rendered (as a `string` or a `Date` instance). */
    date: string | Date;
}

/**
 * Represents a hyperlink field inside a card.
 * Provides optional label, underline, and truncation behavior for long URLs.
 */
export interface CardLinkFieldProps extends SharedProps {
    /** Fixed discriminator to identify the field type as link. */
    type: "link";

    /** The target URL the link points to. */
    url: string;

    /** Optional label text to display instead of the raw URL. */
    label?: string;

    /** Whether the link text should be underlined. Defaults to `true`. */
    underline?: boolean;

    /** Whether the text should be truncated with an ellipsis if overflowing. */
    truncate?: boolean;
}

/**
 * Union of all possible field types supported by the `CardField` component.
 * Enables strict type narrowing based on the `type` property.
 */
type CardFieldType = CardTextFieldProps | CardLinkFieldProps | CardDateFieldProps;

/**
 * Props for the generic `CardField` component.
 * Serves as a wrapper interface that unifies all field types,
 * along with optional icon, color, and tooltip support.
 */
export interface CardFieldProps {
    /** Field data, including its specific type and associated properties. */
    field: CardFieldType;

    /**
     * Optional icon displayed before the field content.
     * Accepts any valid MUI `SvgIcon` component.
     */
    icon?: ReactElement<SvgIconProps>;

    /**
     * Color configuration object controlling both text and icon colors.
     * Typically defined as `{ text: string; icon: string; }`.
     */
    colors?: CardFieldColors;

    /** Optional tooltip text displayed on hover over the entire field. */
    tooltip?: string;
}
