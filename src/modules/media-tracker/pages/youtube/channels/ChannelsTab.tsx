import {type JSX, useState} from "react";
import type {YTChannel} from "@media-tracker/models";
import {useLanguageService} from "@/services/useLanguageService";
import {mediaTrackerKeys} from "@/i18n";
import {CrudCardLayout, CrudCardItem} from "@/shared/cards";
import {ChannelCardContent, ChannelFields} from "@media-tracker/pages/youtube/channels";

{/*Data for testing purposes*/}
const initialChannels: YTChannel[] = [
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
    const { t } = useLanguageService();
    const [channels, setChannels] = useState<YTChannel[]>(initialChannels);

    return (
        <CrudCardLayout<YTChannel>
            items={channels}
            setItems={setChannels}
            titleNew={t(
                mediaTrackerKeys.youTube.channels.dialogs.newDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "New channel"}
            )}
            titleEdit={t(
                mediaTrackerKeys.youTube.channels.dialogs.editDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "Edit channel"}
            )}
            titleDelete={t(
                mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.title,
                {ns: mediaTrackerKeys.ns, defaultValue: "Delete channel"}
            )}
            deleteMessage={(ch: YTChannel): string => t(
                mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.message,
                {
                    ns: mediaTrackerKeys.ns,
                    channel: ch.name,
                })
            }
            createEmptyItem={() => ({
                id: "",
                name: "",
                url: "",
                description: "",
                createdAt: new Date().toISOString(),
            })}
            renderCard={(channel: YTChannel, onEdit: () => void, onDelete: () => void): JSX.Element => (
                <CrudCardItem
                    item={channel}
                    getTitle={(ch: YTChannel): string => ch.name}
                    renderContent={(ch: YTChannel): JSX.Element => <ChannelCardContent channel={ch} />}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
            renderForm={(channel: YTChannel, onChange): JSX.Element => (
                <ChannelFields channel={channel} onChange={onChange} />
            )}
            searchProps={{
                label: t(mediaTrackerKeys.youTube.channels.searchChannels, {ns: mediaTrackerKeys.ns, defaultValue: "Search channels..."}),
                filterKeys: ["name", "url"]
            }}
        />
    );
}