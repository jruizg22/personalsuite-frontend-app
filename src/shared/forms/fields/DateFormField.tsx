import {type JSX} from "react";
import {TextField} from "@mui/material";

interface Props {
    label: string;
    date: string | undefined | null;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

export default function DateFormField({label, date, onChange, readOnly}: Props): JSX.Element {
    // Safe formatter: if no date is provided, return an empty string
    const formatDate = (iso?: string | undefined | null): string => {
        if (!iso) return "";
        const [datePart] = iso.split("T");
        return datePart ?? "";
    };

    return (
        <TextField
            label={label}
            type="date"
            value={formatDate(date)}
            onChange={(e): void => onChange(e.target.value)}
            fullWidth
            slotProps={{
                inputLabel: { shrink: true },
                input: {
                    readOnly: readOnly
                }
            }}
        />
    )
}