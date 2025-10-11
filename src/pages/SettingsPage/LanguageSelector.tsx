import {Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import {type JSX} from "react";
import type {language} from "@/types";
import {languages} from "@/languages";
import {commonKeys} from "@i18n/i18nKeys.ts";

export default function LanguageSelector(): JSX.Element {
    const { i18n } = useTranslation();
    const { t } = useTranslation(commonKeys.ns);

    const handleChange = (event: SelectChangeEvent): void => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <Box sx={{mt: 2}}>
            <FormControl sx={{width: 215}}>
                <InputLabel id="language-select-label">{t(commonKeys.language)}</InputLabel>
                <Select
                    labelId="language-select-label"
                    value={i18n.language}
                    label={t(commonKeys.language)}
                    onChange={handleChange}
                >
                    {languages.map((language: language): JSX.Element => (
                        <MenuItem value={language.value}>
                            {language.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}