import {type JSX, useEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {commonKeys} from "@/i18n";

/**
 * Props for the GeneralTextFormField component.
 *
 * @interface Props
 * @property {JSX.Element} [icon] - Optional icon to display at the start of the input field.
 * @property {string} label - Label of the text field.
 * @property {string | undefined | null} content - Current value of the field.
 * @property {(value: string) => void} onChange - Callback invoked when the value changes.
 * Receives the new value as an argument.
 * @property {boolean} [required=false] - If true, the field is required and will show an error if left empty.
 * @property {boolean} [readOnly=false] - If true, the field is read-only and cannot be edited.
 */
interface Props {
    icon?: JSX.Element;
    label: string;
    content: string | undefined | null;
    onChange: (value: string | null) => void;
    required?: boolean;
    readOnly?: boolean;
}

/**
 * GeneralTextFormField component.
 *
 * A reusable text field component with optional icon, required validation, and read-only support.
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} A Material UI TextField with optional validation and icon
 *
 * @example
 * <GeneralTextFormField
 *   icon={<PersonIcon />}
 *   label="Name"
 *   content={name}
 *   onChange={(value) => setName(value)}
 *   required
 * />
 */
export default function GeneralTextFormField({
    icon,
    label,
    content,
    onChange,
    required = false,
    readOnly = false
}: Props): JSX.Element {
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
        <TextField
            label={label}
            value={content ?? ""}
            onChange={(e): void => onChange(e.target.value === "" ? null : e.target.value)}
            onBlur={(): void => setTouched(true)}
            fullWidth
            error={error}
            helperText={error ? t(commonKeys.field_required, {ns: commonKeys.ns, field: label}) : ""}
            slotProps={{
                input: {
                    startAdornment: icon ? (
                        <InputAdornment position="start">{icon}</InputAdornment>
                    ) : undefined,
                    readOnly: readOnly
                },
            }}
        />
    )
}