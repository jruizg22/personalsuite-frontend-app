import {type JSX} from "react";
import TabLayout from "@/shared/tabs/TabLayout";
import {tabs} from "@media-tracker/pages/youtube/tabs";
import {YouTubeProvider} from "@media-tracker/contexts";

export default function YouTubeLayout(): JSX.Element {
    return (
        <YouTubeProvider>
            <TabLayout tabs={tabs} />
        </YouTubeProvider>
    )
}