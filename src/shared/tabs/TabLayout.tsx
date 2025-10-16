import {type JSX, type SyntheticEvent, useState} from "react";
import {Box} from "@mui/material";
import type {appTab} from "@/types";
import {LazyTabPanel, TabContainer} from "@/shared/tabs";

interface Props {
    tabs: appTab[]
}

export default function TabLayout({tabs}: Props): JSX.Element {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = (_: SyntheticEvent, newValue: number): void => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflow: "hidden"
            }}
        >
            <TabContainer tabs={tabs} value={selectedTab} handleChange={handleTabChange} />

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {tabs.map((tab: appTab, index: number): JSX.Element => (
                    <LazyTabPanel key={index} value={selectedTab} index={index}>
                        <tab.Component />
                    </LazyTabPanel>
                ))}
            </Box>
        </Box>
    )
}