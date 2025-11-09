import {type JSX} from "react";
import type {YTChannel} from "@media-tracker/models";
import {CardField, CardItemContent} from "@/shared/cards";
import LinkIcon from "@mui/icons-material/Link";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";

interface Props {
    /** The YouTube channel data to display inside the card */
    channel: YTChannel;
}

/**
 * `ChannelCardContent`
 *
 * Renders the main content of a channel card using structured `CardField` components.
 * Each piece of information (URL, creation date, description) is displayed with
 * a corresponding icon and optional tooltip.
 *
 * This component ensures consistent layout and spacing for channel metadata
 * inside a card, and leverages truncation, icons, and tooltips for better UX.
 *
 * @example
 * ```tsx
 * <ChannelCardContent channel={channelData} />
 * ```
 */
export default function ChannelCardContent({channel}: Props): JSX.Element {
    return (
        <CardItemContent>
            {/* Display the channel URL as a clickable, truncated link */}
            {channel.url && (
                <CardField
                    field={{
                        type: "link",
                        url: channel.url,
                        truncate: true
                    }}
                    icon={<LinkIcon/>}
                    tooltip={"Prueba de tooltip"}
                />
            )}

            {/* Display the channel creation date with an event icon */}
            {channel.createdAt && (
                <CardField
                    field={{
                        type: "date",
                        date: channel.createdAt
                    }}
                    icon={<EventIcon/>}
                    tooltip={"Prueba de tooltip"}
                />
            )}

            {/* Display the channel description as plain text with an icon */}
            {channel.description && (
                <CardField
                    field={{
                        type: "text",
                        text: channel.description
                    }}
                    icon={<DescriptionIcon/>}
                    tooltip={"Prueba de tooltip"}
                />
            )}
        </CardItemContent>
    )
}