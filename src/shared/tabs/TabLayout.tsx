import {type JSX, type SyntheticEvent, useState} from "react";
import TabContainer from "@/shared/tabs/TabContainer.tsx";
import {Box} from "@mui/material";
import type {appTab} from "@/types.ts";
import {LazyTabPanel} from "@/shared/tabs/LazyTabPanel.tsx";

interface Props {
    tabs: appTab[]
}

export default function TabLayout({tabs}: Props): JSX.Element {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = (_: SyntheticEvent, newValue: number): void => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TabContainer tabs={tabs} value={selectedTab} handleChange={handleTabChange} />

            <Box sx={{ overflow: "auto" }}>
                {tabs.map((tab: appTab, index: number): JSX.Element => (
                    <LazyTabPanel key={index} value={selectedTab} index={index}>
                        <tab.Component />
                    </LazyTabPanel>
                ))}
            </Box>
        </Box>
    )
}