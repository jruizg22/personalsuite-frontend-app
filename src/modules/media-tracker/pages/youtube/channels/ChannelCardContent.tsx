import {type JSX} from "react";
import {CardContent} from "@mui/material";
import type {YTChannel} from "@media-tracker/models";
import {CardDateField, CardLinkField, CardTextField} from "@/shared/cards/fields";

interface Props {
    channel: YTChannel;
}

export default function ChannelCardContent({channel}: Props): JSX.Element {
    return (
        <CardContent>
            <CardLinkField url={channel.url} truncate/>
            <CardDateField date={channel.createdAt}/>
            {channel.description && (
                <CardTextField text={channel.description} showIcon/>
            )}
        </CardContent>
    )
}