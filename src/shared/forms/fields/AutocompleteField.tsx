import {type JSX, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Autocomplete, Box, TextField} from "@mui/material";
import {commonKeys} from "@/i18n";

/**
 * Represents an option in the `AutocompleteField` component.
 *
 * @template T - The type of the option value (typically `string` or `number`).
 *
 * @property {T} value - Unique identifier or value of the option.
 * @property {string} label - Text displayed in the dropdown and input.
 * @property {JSX.Element} [icon] - Optional icon displayed before the label.
 */
export interface SelectOption<T> {
    value: T;
    label: string;
    icon?: JSX.Element;
}

interface Props<T> {
    /** Label text displayed above the input field. */
    label: string;

    /** List of selectable options. */
    options: SelectOption<T>[];

    /** Currently selected value. */
    value: T | null;

    /**
     * Callback invoked when the user selects a new option.
     *
     * @param {T} value - The selected option’s value.
     */
    onChange: (value: T) => void;

    /** Whether the field is disabled and non-editable. */
    readOnly?: boolean;

    /** Marks the field as required and triggers validation. */
    required?: boolean;

    /** DOM identifier for the input (for accessibility and testing). */
    id?: string;

    /** Placeholder text displayed when no option is selected. */
    placeholder?: string;
}

/**
 * Generic reusable autocomplete field with validation and optional icons.
 *
 * @template T - Type of the value for each option (e.g. `string` or `number`).
 *
 * @component
 * @example
 * ```tsx
 * <AutocompleteField
 *   label="Select Channel"
 *   options={[
 *     { value: "UC123", label: "OpenAI Channel", icon: <YouTubeIcon /> },
 *     { value: "UC456", label: "Tech Explained" }
 *   ]}
 *   value={selectedChannelId}
 *   onChange={(newValue) => setSelectedChannelId(newValue)}
 *   required
 * />
 * ```
 *
 * @description
 * - Displays an MUI `Autocomplete` with optional icon support.
 * - Validates required fields, showing a red error state if left empty after blur.
 * - Localized helper text is automatically displayed when invalid.
 * - Fully controlled component — expects `value` and `onChange` from the parent.
 */
export default function AutocompleteField<T extends string | number>({
    label,
    options,
    value,
    onChange,
    readOnly = false,
    required = false,
    id = "autocomplete-field",
    placeholder
}: Props<T>): JSX.Element {
    const { t } = useTranslation();
    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Handle validation for required fields
    useEffect((): void => {
        if (required) {
            setError(touched && !value);
        } else {
            setError(false);
        }
    }, [value, required, touched]);

    const selectedOption: SelectOption<T> | null =
        options.find((opt: SelectOption<T>): boolean => opt.value === value) ?? null;

    return (
        <Autocomplete
            id={id}
            disabled={readOnly}
            options={options}
            value={selectedOption}
            onChange={(_, newValue: SelectOption<T> | null): void => {
                if (required) {
                    if (newValue) onChange(newValue.value as any);
                } else {
                    onChange((newValue ? newValue.value : null) as any);
                }
            }}
            getOptionLabel={(opt: SelectOption<T>): string => opt.label}
            isOptionEqualToValue={(opt: SelectOption<T>, val: SelectOption<T>): boolean => opt.value === val.value}
            onBlur={(): void => setTouched(true)}
            renderOption={(props, option: SelectOption<T>): JSX.Element => {
                const { key, ...rest } = props;
                return (
                    <Box component="li" key={key} {...rest} sx={{ display: "flex", alignItems: "center" }}>
                        {option.icon && <Box sx={{ mr: 1 }}>{option.icon}</Box>}
                        {option.label}
                    </Box>
                );
            }}
            renderInput={(params): JSX.Element => (
                <TextField
                    {...params}
                    label={label}
                    required={required}
                    placeholder={placeholder}
                    error={error}
                    helperText={error ? t(commonKeys.field_required, { ns: commonKeys.ns, field: label }) : ""}
                />
            )}
        />
    );
}