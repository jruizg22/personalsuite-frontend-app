import {type JSX} from "react";
import TabLayout from "@/shared/tabs/TabLayout";
import {tabs} from "@media-tracker/pages/youtube/tabs";

export default function YouTubeLayout(): JSX.Element {
    return (
        <TabLayout tabs={tabs} />
    )
}