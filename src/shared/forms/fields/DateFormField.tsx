import {type JSX} from "react";
import {TextField} from "@mui/material";

interface Props {
    label: string;
    date: string;
    onChange: (value: string) => void;
}

export default function DateFormField({label, date, onChange}: Props): JSX.Element {
    const formatDate = (iso: string): string => iso.split("T")[0];

    return (
        <TextField
            label={label}
            type="date"
            value={formatDate(date)}
            onChange={(e): void => onChange(e.target.value)}
            fullWidth
            slotProps={{
                inputLabel: { shrink: true }
            }}
        />
    )
}