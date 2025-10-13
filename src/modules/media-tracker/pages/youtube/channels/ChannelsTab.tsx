import {Box, Grid} from "@mui/material";
import {type JSX, useState} from "react";
import type {YTChannel} from "@media-tracker/models";
import {SearchField} from "@/shared/SearchField";
import ChannelCard from "@media-tracker/pages/youtube/channels/ChannelCard/ChannelCard";
import ConfirmDialog from "@/shared/dialogs/ConfirmDialog";
import {useLanguageService} from "@/services/useLanguageService";
import {commonKeys, mediaTrackerKeys} from "@/i18n";

{/*Data for testing purposes*/}
const channels: YTChannel[] = [
    {
        id: "1",
        name: "Gregoair",
        description: "sgrgegrgegrre",
        url: "hgswegswge",
        createdAt: "2025-03-04",
    },
    {
        id: "2",
        name: "Revenant",
        url: "https://www.youtube.com/@G4G_Revenantrfgeergerge",
        createdAt: "2025-03-04",
    }
]

export default function ChannelsTab(): JSX.Element {
    const [channelData, setChannelData] = useState<YTChannel[]>(channels);
    const [searchText, setSearchText] = useState<string>('');

    // States for the confirm delete dialog
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [selectedChannel, setSelectedChannel] = useState<YTChannel | null>(null);

    const filteredChannels: YTChannel[] = channelData.filter(channel =>
        channel.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleEdit = (channel: YTChannel): void => {
        // Testing edit action
        console.log("Edit channel:", channel.name);
    };

    // When the delete action is pressed, the confirm dialog opens
    const handleDeleteClick = (channel: YTChannel): void => {
        setSelectedChannel(channel);
        setConfirmOpen(true);
    };

    // Confirm delete
    const handleConfirmDelete = (): void => {
        if (selectedChannel) {
            setChannelData(prev => prev.filter(c => c.id !== selectedChannel.id));
        }
        setConfirmOpen(false);
        setSelectedChannel(null);
    };

    const {t} = useLanguageService();

    return (
        <Box sx={{ m: 1 }}>
            <SearchField
                value={searchText}
                onChange={setSearchText}
                label={t(
                    mediaTrackerKeys.youTube.channels.searchChannels,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Search channels..."}
                )} />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {filteredChannels.map((channel): JSX.Element => (
                    <Grid key={channel.id} size={{ xs: 4, sm: 4, md: 4 }} sx={{ display: 'flex' }}>
                        <ChannelCard
                            channel={channel}
                            onEdit={(): void => handleEdit(channel)}
                            onDelete={(): void => handleDeleteClick(channel)}
                        />
                    </Grid>
                ))}
            </Grid>

            <ConfirmDialog
                open={confirmOpen}
                title={t(
                    mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.title,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Delete channel"}
                )}
                message={t(
                    mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.message,
                    {ns: mediaTrackerKeys.ns, defaultValue: `Are you sure you want to delete "${selectedChannel?.name}"?`}
                )}
                confirmLabel={t(commonKeys.delete, {ns: commonKeys.ns, defaultValue: "Delete"})}
                cancelLabel={t(commonKeys.cancel, {ns: commonKeys.ns, defaultValue: "Cancel"})}
                onConfirm={handleConfirmDelete}
                onCancel={(): void => setConfirmOpen(false)}
            />
        </Box>
    )
}