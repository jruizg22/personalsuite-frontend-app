import {type FC, type JSX} from 'react';
import {TextField} from '@mui/material';

interface Props {
    value: string;
    onChange: (newValue: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
}

export const SearchField: FC<Props> = ({
    value,
    onChange,
    label,
    placeholder,
    fullWidth = true,
}: Props): JSX.Element => {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            variant="outlined"
            fullWidth={fullWidth}
            value={value}
            onChange={(e): void => onChange(e.target.value)}
            sx={{
                mb: 1
            }}
        />
    );
};