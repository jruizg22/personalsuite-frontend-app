import {type JSX} from "react";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface Props {
    label: string;
    content: string;
    onChange: (value: string) => void;
}

export default function DescriptionFormField({
    label,
    content,
    onChange,
}: Props): JSX.Element {
    const inputId: string = "description-field";

    return (
        <FormControl sx={{ flex: 1, height: "100%" }}>
            <InputLabel htmlFor={inputId}>{label}</InputLabel>
            <OutlinedInput
                id={inputId}
                label={label}
                multiline
                fullWidth
                value={content}
                onChange={(e): void => onChange(e.target.value)}
                startAdornment={
                    <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: "6px" }}
                    >
                        <DescriptionIcon />
                    </InputAdornment>
                }
                sx={{
                    flex: 1,
                    alignItems: "flex-start",
                    "& textarea": {
                        height: "100% !important",
                        overflow: "auto",
                        resize: "none",
                    },
                }}
            />
        </FormControl>
    );
}