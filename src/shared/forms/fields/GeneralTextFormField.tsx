import {type JSX} from "react";
import {InputAdornment, TextField} from "@mui/material";

interface Props {
    icon?: JSX.Element;
    label: string;
    content: string;
    onChange: (value: string) => void;
}

export default function GeneralTextFormField({icon, label, content, onChange}: Props): JSX.Element {
    return (
        <TextField
            label={label}
            value={content}
            onChange={(e): void => onChange(e.target.value)}
            fullWidth
            slotProps={{
                input: {
                    ...(icon && {
                        startAdornment: (
                            <InputAdornment position="start">
                                {icon}
                            </InputAdornment>
                        ),
                    }),
                },
            }}
        />
    )
}