import {type JSX} from "react";
import type {YTChannel} from "@media-tracker/models";
import CardShared from "@/shared/cards/CardShared";
import ChannelCardContent from "@media-tracker/pages/youtube/channels/ChannelCard/ChannelCardContent";
import type {MenuAction} from "@/types";
import {useMenuActions} from "@/shared/menus/useMenuActions.tsx";

interface Props {
    channel: YTChannel;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ChannelCard({channel, onEdit, onDelete}: Props): JSX.Element {
    const {edit, delete: del} = useMenuActions();

    const channelCardActions: MenuAction[] = [
        edit(onEdit),
        del(onDelete)
    ]

    return (
        <CardShared headerTitle={channel.name} actions={channelCardActions}>
            <ChannelCardContent channel={channel} />
        </CardShared>
    )
}