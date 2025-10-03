import {Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import type {JSX} from "react";

export default function LanguageSelector(): JSX.Element {
    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent): void => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                    labelId="language-select-label"
                    value={i18n.language}
                    onChange={handleChange}
                >
                    <MenuItem value="en-US">English (US)</MenuItem>
                    <MenuItem value="es-ES">Español (España)</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}