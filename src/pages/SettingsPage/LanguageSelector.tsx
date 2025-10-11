import {Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import {type JSX} from "react";
import type {language} from "@/types";
import {languages} from "@/languages";

export default function LanguageSelector(): JSX.Element {
    const { i18n } = useTranslation();
    const { t } = useTranslation("common");

    const handleChange = (event: SelectChangeEvent): void => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <Box sx={{mt: 2}}>
            <FormControl sx={{width: 215}}>
                <InputLabel id="language-select-label">{t("settings.language")}</InputLabel>
                <Select
                    labelId="language-select-label"
                    value={i18n.language}
                    label={t("language")}
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