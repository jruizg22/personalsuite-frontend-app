import {type JSX} from "react";
import type {YTChannel} from "@media-tracker/models";
import CardShared from "@/shared/cards/CardShared";
import ChannelCardContent from "@media-tracker/pages/youtube/channels/ChannelCard/ChannelCardContent";

interface Props {
    channel: YTChannel;
}

export default function ChannelCard({channel}: Props): JSX.Element {
    return (
        <CardShared headerTitle={channel.name}>
            <ChannelCardContent channel={channel} />
        </CardShared>
    )
}