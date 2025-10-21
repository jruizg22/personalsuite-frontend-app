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
            {channel.url && (
                <CardLinkField url={channel.url} truncate/>
            )}
            {channel.createdAt && (
                <CardDateField date={channel.createdAt}/>
            )}
            {channel.description && (
                <CardTextField text={channel.description} showIcon/>
            )}
        </CardContent>
    )
}