import {type JSX} from "react";
import {Box, Typography, type TypographyProps} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {useLanguageHook} from "@/hooks";
import {DateFormats} from "@/constants/dateFormats";

/**
 * Props for the `CardDateField` component.
 *
 * @interface Props
 * @property {string | Date} date - The date to be displayed. Accepts either a string (ISO or parsable format) or a Date object.
 * @property {TypographyProps['variant']} [variant='body2'] - MUI Typography variant used for displaying the date text.
 * @property {string} [color='text.primary'] - Color applied to the date text and icon container.
 * @property {Intl.DateTimeFormatOptions} [formatOptions=DateFormats.long] - Intl formatting options to customize how the date is displayed.
 */
interface Props {
    date: string | Date;
    variant?: TypographyProps['variant'];
    color?: string;
    formatOptions?: Intl.DateTimeFormatOptions;
}

/**
 * **CardDateField — Displays a formatted date with a small icon.**
 *
 * This component shows a date formatted according to the current app language
 * (via `useLanguageHook()`) and localized using `Intl.DateTimeFormat`.
 *
 * Commonly used within cards or list items to show creation, publication, or update dates.
 *
 * @example
 * ```tsx
 * <CardDateField date="2025-11-06T00:00:00Z" />
 * ```
 *
 * @example
 * ```tsx
 * <CardDateField
 *   date={new Date()}
 *   variant="caption"
 *   color="text.secondary"
 *   formatOptions={{ year: "numeric", month: "short", day: "numeric" }}
 * />
 * ```
 *
 * @description
 * - Automatically formats the date based on the current i18n language.
 * - Safely handles invalid date inputs (falls back to current date).
 * - Renders a calendar icon next to the formatted date.
 * - Lightweight and ideal for use in card metadata or compact UI elements.
 */
export default function CardDateField({
    date,
    variant = "body2",
    color = "text.primary",
    formatOptions = DateFormats.long
}: Props): JSX.Element {
    const { i18n } = useLanguageHook();
    const locale: string = i18n.language || "en";

    // Safely parse the input date
    let dateObj: Date;
    try {
        dateObj = typeof date === "string" ? new Date(date) : date;
    } catch {
        dateObj = new Date();
    }

    // Format date according to current locale and chosen format
    const formattedDate: string = new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color }}>
            {/* Small calendar icon, neutral color */}
            <DateRangeIcon fontSize="small" sx={{ flexShrink: 0, color: "text.secondary" }} />

            {/* Localized formatted date */}
            <Typography variant={variant}>{formattedDate}</Typography>
        </Box>
    );
}