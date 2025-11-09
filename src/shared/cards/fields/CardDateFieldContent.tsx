import {type JSX} from "react";
import {Typography} from "@mui/material";
import {useLanguageHook} from "@/hooks";
import {DateFormats} from "@/constants/dateFormats";
import type {CardDateFieldProps} from "@/types";

/**
 * `CardDateFieldContent`
 *
 * Displays a formatted date value according to the active application language.
 * The date is automatically localized using the browser's `Intl.DateTimeFormat`
 * API and the format specified in `DateFormats.long`.
 *
 * This component is typically used inside `CardField` to render date-based
 * metadata (e.g., creation date, last updated, etc.).
 *
 * @example
 * ```tsx
 * <CardDateFieldContent
 *   date="2025-11-09T12:30:00Z"
 *   variant="body2"
 *   color="text.secondary"
 * />
 * ```
 */
export default function CardDateFieldContent({
    date,
    variant = "body2",
    color,
}: CardDateFieldProps): JSX.Element {
    // Access the current app language from the i18n hook
    const { i18n } = useLanguageHook();

    // Fallback to English (US) if no language is defined
    const locale: string = i18n.language || "en-US";

    // Convert string dates into a Date object
    const dateObj: Date = typeof date === "string" ? new Date(date) : date;

    // Format the date according to the current locale and long format preset
    const formatted: string = new Intl.DateTimeFormat(locale, DateFormats.long).format(dateObj);

    return (
        <Typography variant={variant} sx={{ color: color }}>
            {formatted}
        </Typography>
    );
}