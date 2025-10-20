import {type JSX, useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {commonKeys} from "@/i18n";

/**
 * Props for the DateFormField component.
 *
 * @interface Props
 * @property {string} label - Label of the date field.
 * @property {string | undefined | null} date - Current date value in ISO format (e.g., "2025-10-20T00:00:00Z").
 * @property {(value: string) => void} onChange - Callback invoked when the date changes. Receives the new value as a string.
 * @property {boolean} [required=false] - If true, the field is required and will show an error if empty.
 * @property {boolean} [readOnly=false] - If true, the field is read-only and cannot be edited.
 */
interface Props {
    label: string;
    date: string | undefined | null;
    onChange: (value: string | null) => void;
    required?: boolean;
    readOnly?: boolean;
}

/**
 * DateFormField component.
 *
 * A reusable single-line date picker field using Material UI TextField with:
 * - Optional required validation
 * - Error helper text
 * - Read-only support
 * - ISO date formatting (YYYY-MM-DD)
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} A Material UI TextField of type "date"
 *
 * @example
 * <DateFormField
 *   label="Created At"
 *   date={createdAt}
 *   onChange={(value) => setCreatedAt(value)}
 *   required
 * />
 */
export default function DateFormField({
    label,
    date,
    onChange,
    required = false,
    readOnly = false,
}: Props): JSX.Element {
    // Safe formatter: if no date is provided, return an empty string
    const formatDate = (iso?: string | undefined | null): string => {
        if (!iso) return "";
        const [datePart] = iso.split("T");
        return datePart ?? "";
    };

    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const {t} = useTranslation();

    useEffect((): void => {
        if (required) {
            setError(touched && (!date || date.trim() === ""));
        } else {
            setError(false);
        }
    }, [date, required, touched]);

    return (
        <TextField
            label={label}
            type="date"
            value={formatDate(date)}
            onChange={(e): void => onChange(e.target.value === "" ? null : e.target.value)}
            onBlur={(): void => setTouched(true)}
            fullWidth
            error={error}
            helperText={error ? t(commonKeys.field_required, {ns: commonKeys.ns, field: label}) : ""}
            slotProps={{
                inputLabel: { shrink: true },
                input: {
                    readOnly: readOnly
                }
            }}
        />
    )
}