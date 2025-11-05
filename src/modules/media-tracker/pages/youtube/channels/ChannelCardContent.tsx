import {type JSX} from "react";
import type {YTChannel} from "@media-tracker/models";
import {CardDateField, CardItemContent, CardLinkField, CardTextField} from "@/shared/cards";

interface Props {
    channel: YTChannel;
}

export default function ChannelCardContent({channel}: Props): JSX.Element {
    return (
        <CardItemContent>
            {channel.url && (
                <CardLinkField url={channel.url} truncate/>
            )}
            {channel.createdAt && (
                <CardDateField date={channel.createdAt}/>
            )}
            {channel.description && (
                <CardTextField text={channel.description}/>
            )}
        </CardItemContent>
    )
}