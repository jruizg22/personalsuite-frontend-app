import {type JSX} from "react";
import {Box, Typography, type TypographyProps} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {useLanguageService} from "@/services/useLanguageService";
import {DateFormats} from "@/constants/dateFormats.ts";

interface Props {
    date: string | Date;
    variant?: TypographyProps['variant'];
    color?: string;
    formatOptions?: Intl.DateTimeFormatOptions;
}

export default function CardDateField({
    date,
    variant = "body2",
    color = "text.secondary",
    formatOptions = DateFormats.long
}: Props): JSX.Element {
    const { i18n } = useLanguageService();
    const locale: string = i18n.language || "en";

    let dateObj: Date;
    try {
        dateObj = typeof date === "string" ? new Date(date) : date;
    } catch {
        dateObj = new Date();
    }

    const formattedDate: string = new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color }}>
            <DateRangeIcon fontSize="small" sx={{ flexShrink: 0, color: "text.secondary" }} />
            <Typography variant={variant}>{formattedDate}</Typography>
        </Box>
    );
}