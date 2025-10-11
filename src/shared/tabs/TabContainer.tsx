import {type JSX, type SyntheticEvent} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {useLanguageService} from "@/services/useLanguageService.ts";
import type {appTab} from "@/types.ts";

interface Props {
    tabs: appTab[];
    value: number;
    handleChange: (_: SyntheticEvent, newValue: number) => void;
}

export default function TabContainer({tabs, value, handleChange}: Props): JSX.Element {
    const { translateLabel } = useLanguageService();

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    variant="fullWidth"
                >
                    {tabs.map((tab: appTab, index: number): JSX.Element => (
                        <Tab
                            key={index}
                            label={translateLabel(tab.i18nProps, tab.label)}
                            id={`tab-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}