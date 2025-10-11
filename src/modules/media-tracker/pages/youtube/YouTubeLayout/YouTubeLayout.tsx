import {type JSX} from "react";
import TabLayout from "@/shared/tabs/TabLayout.tsx";
import {tabs} from "@media-tracker/pages/youtube/tabs.tsx";

export default function YouTubeLayout(): JSX.Element {
    return (
        <TabLayout tabs={tabs} />
    )
}