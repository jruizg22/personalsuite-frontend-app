import {type JSX} from "react";
import type {YTChannel} from "@media-tracker/models";
import {mediaTrackerKeys} from "@/i18n";
import {CrudCardItem, CrudCardLayout} from "@/shared/cards/CrudCardLayout";
import {ChannelCardContent, ChannelFormFields} from "@media-tracker/pages/youtube/channels";
import {useTranslation} from "react-i18next";
import {useYTChannels} from "@media-tracker/hooks/youtube";

/**
 * ChannelsTab component.
 *
 * This component renders a CRUD interface for managing YouTube channels
 * using the `CrudCardLayout` component. It allows the user to:
 *
 * - Create new channels
 * - Edit existing channels
 * - Delete channels
 * - Search and filter channels by name or URL
 *
 * Translation keys for the UI text are provided via `mediaTrackerKeys`.
 * The component also displays snackbar feedback messages for user actions.
 *
 * Props passed to `CrudCardLayout` include:
 *
 * - `loading`: Flag to show the loading state while fetching channels.
 * - `items`: The array of channels to display (`YTChannel[]`).
 * - `onCreate`: Callback to create a new channel.
 * - `onUpdate`: Callback to update an existing channel by ID.
 * - `onDelete`: Callback to delete a channel by ID.
 * - `titleNew`, `titleEdit`, `titleDelete`: Dialog titles for create/edit/delete operations.
 * - `deleteMessage`: Function that returns a delete confirmation message.
 * - `snackbar`: Messages shown after create/edit/delete actions.
 * - `createEmptyItem`: Function to generate an empty `YTChannel`.
 * - `renderCard`: Function to render each channel card.
 * - `renderForm`: Function to render the channel form fields inside the dialog.
 * - `requiredFields`: Array of required field names (used for form validation).
 * - `searchProps`: Optional configuration for search/filtering.
 *
 * @returns {JSX.Element} A fully functional CRUD interface for YouTube channels.
 *
 * @example
 * import ChannelsTab from "@media-tracker/pages/youtube/channels/ChannelsTab";
 *
 * function App() {
 *   return <ChannelsTab />;
 * }
 */
export default function ChannelsTab(): JSX.Element {
    const {t} = useTranslation();
    const {channels, loading, createChannel, updateChannel, deleteChannel} = useYTChannels({
        sort: {
            sortBy: "name",
            sortOrder: "asc"
        }
    });

    return (
        <CrudCardLayout<YTChannel>
            loading={loading}
            items={channels}
            onCreate={async (newChannel: Partial<YTChannel>): Promise<void> => {
                await createChannel(newChannel);
            }}
            onUpdate={async (id: string, updated: Partial<YTChannel>): Promise<void> => {
                await updateChannel(id, updated);
            }}
            onDelete={async (id: string): Promise<void> => {
                await deleteChannel(id);
            }}
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
            snackbar={{
                new: t(
                    mediaTrackerKeys.youTube.channels.feedback.new,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Channel created successfully"}
                ),
                edit: t(
                    mediaTrackerKeys.youTube.channels.feedback.edit,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Channel modified successfully"}
                ),
                delete: t(
                    mediaTrackerKeys.youTube.channels.feedback.delete,
                    {ns: mediaTrackerKeys.ns, defaultValue: "Channel deleted successfully"}
                ),
            }}
            createEmptyItem={() => ({
                id: "",
                name: "",
                url: "",
                description: "",
                createdAt: "",
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
                <ChannelFormFields channel={channel} onChange={onChange}/>
            )}
            requiredFields={["id", "name"]}
            searchProps={{
                label: t(mediaTrackerKeys.youTube.channels.searchChannels, {ns: mediaTrackerKeys.ns, defaultValue: "Search channels..."}),
                filterKeys: ["name", "url"]
            }}
        />
    );
}