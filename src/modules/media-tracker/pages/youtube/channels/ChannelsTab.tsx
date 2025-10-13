import {Box, Grid} from "@mui/material";
import {type JSX, useState} from "react";
import type {YTChannel} from "@media-tracker/models";
import {SearchField} from "@/shared/SearchField";
import ChannelCard from "@media-tracker/pages/youtube/channels/ChannelCard/ChannelCard";

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

    const filteredChannels: YTChannel[] = channelData.filter(channel =>
        channel.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleEdit = (channel: YTChannel): void => {
        // Testing edit action
        console.log("Edit channel:", channel.name);
    };

    const handleDelete = (channel: YTChannel): void => {
        // Testing delete
        setChannelData(prev => prev.filter(c => c.id !== channel.id));
    };


    return (
        <Box sx={{ m: 1 }}>
            <SearchField value={searchText} onChange={setSearchText} label="Search channels..." />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {filteredChannels.map((channel): JSX.Element => (
                    <Grid key={channel.id} size={{ xs: 4, sm: 4, md: 4 }} sx={{ display: 'flex' }}>
                        <ChannelCard
                            channel={channel}
                            onEdit={(): void => handleEdit(channel)}
                            onDelete={(): void => handleDelete(channel)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}