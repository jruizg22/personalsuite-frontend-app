import {type JSX, useEffect, useState} from "react";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import {useTranslation} from "react-i18next";
import {commonKeys} from "@/i18n";

/**
 * Props for the DescriptionFormField component.
 *
 * @interface Props
 * @property {string} label - Label of the description field.
 * @property {string | undefined | null} content - Current value of the field.
 * @property {(value: string) => void} onChange - Callback invoked when the value changes. Receives the new value.
 * @property {boolean} [required=false] - If true, the field is required and will show an error if empty.
 * @property {boolean} [readOnly=false] - If true, the field is read-only and cannot be edited.
 */
interface Props {
    label: string;
    content: string | undefined | null;
    onChange: (value: string) => void;
    required?: boolean;
    readOnly?: boolean;
}

/**
 * DescriptionFormField component.
 *
 * A reusable multiline text field for descriptions with:
 * - Optional required validation
 * - Error helper text
 * - Read-only support
 * - Start icon (DescriptionIcon)
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} A Material UI FormControl containing a multiline OutlinedInput
 *
 * @example
 * <DescriptionFormField
 *   label="Description"
 *   content={description}
 *   onChange={(value) => setDescription(value)}
 *   required
 * />
 */
export default function DescriptionFormField({
    label,
    content,
    onChange,
    required = false,
    readOnly = false,
}: Props): JSX.Element {
    const inputId: string = "description-field";

    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const {t} = useTranslation();

    useEffect((): void => {
        if (required) {
            setError(touched && (!content || content.trim() === ""));
        } else {
            setError(false);
        }
    }, [content, required, touched]);

    return (
        <FormControl sx={{ flex: 1, height: "100%", width: "100%" }} error={error}>
            <InputLabel htmlFor={inputId}>{label}</InputLabel>
            <OutlinedInput
                id={inputId}
                label={label}
                multiline
                fullWidth
                slotProps={{
                    input: {
                        readOnly: readOnly
                    }
                }}
                value={content ?? ""}
                onChange={(e): void => onChange(e.target.value)}
                onBlur={(): void => setTouched(true)}
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
            {error && (
                <FormHelperText>
                    {t(commonKeys.field_required, { ns: commonKeys.ns, field: label })}
                </FormHelperText>
            )}
        </FormControl>
    );
}