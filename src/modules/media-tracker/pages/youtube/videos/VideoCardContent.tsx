import {type JSX} from "react";
import {CardItemContent} from "@/shared/cards";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import type {YTVideoFull} from "@media-tracker/models";
import DescriptionIcon from "@mui/icons-material/Description";
import CardField from "@/shared/cards/fields/CardField.tsx";
import LinkIcon from "@mui/icons-material/Link";
import EventIcon from "@mui/icons-material/Event";
import {useTranslation} from "react-i18next";
import {commonKeys, mediaTrackerKeys} from "@/i18n";

interface Props {
    /** The YouTube video (with its associated channel) to display */
    video: YTVideoFull;
}

/**
 * `VideoCardContent` – Presentation component for displaying YouTube video details.
 *
 * @component
 * @description
 * Renders the core content section of a YouTube video card within the CRUD interface.
 * Displays the video’s channel, URL, publication date, and description in a compact,
 * reusable layout that integrates with `CrudCardItem`.
 *
 * ---
 * ### Features:
 * - Displays the channel name with an icon.
 * - Optionally shows the video’s URL (clickable link).
 * - Optionally shows the publication date.
 * - Optionally shows the description if available.
 *
 * ---
 * ### Composition:
 * This component leverages shared card field components for consistent UI:
 * - `CardTextField` → For plain text or descriptive content.
 * - `CardLinkField` → For clickable URLs with truncation.
 * - `CardDateField` → For formatted publication dates.
 * - `CardItemContent` → For unified card content layout.
 *
 * ---
 * ### Example Usage:
 * ```tsx
 * import VideoCardContent from "@/pages/youtube/videos/VideoCardContent";
 *
 * <VideoCardContent
 *   video={{
 *     id: "abc123",
 *     title: "Sample Video",
 *     channelId: "xyz789",
 *     publishedAt: "2025-11-01T00:00:00Z",
 *     url: "https://youtube.com/watch?v=abc123",
 *     description: "A great example of structured metadata!",
 *     channel: {
 *       id: "xyz789",
 *       name: "Tech Explained",
 *       url: "https://youtube.com/@techexplained",
 *       description: "Technology insights and tutorials",
 *       createdAt: "2020-06-15T00:00:00Z"
 *     },
 *     visualizations: []
 *   }}
 * />
 * ```
 *
 * @param {Props} props - The component props.
 * @param {YTVideoWithChannel} props.video - The YouTube video to render.
 * @returns {JSX.Element} The rendered video card content.
 */
export default function VideoCardContent({video}: Props): JSX.Element {
    const {t} = useTranslation();

    return (
        <CardItemContent>
            {/* Channel name with icon */}
            {video.channel.url && (
                <CardField
                    field={{
                        type: "link",
                        url: video.channel.url,
                        label: video.channel.name,
                        truncate: true
                    }}
                    icon={<PersonIcon/>}
                    tooltip={t(
                        mediaTrackerKeys.youTube.channels.channel,
                        {ns: mediaTrackerKeys.ns, defaultValue: "Channel"}
                    )}
                />
            )}

            {/* Optional video URL */}
            {video.url && (
                <CardField
                    field={{
                        type: "link",
                        url: video.url,
                        truncate: true
                    }}
                    icon={<LinkIcon/>}
                    tooltip={t(
                        mediaTrackerKeys.youTube.videos.videoLink,
                        {ns: mediaTrackerKeys.ns, defaultValue: "Video link"}
                    )}
                />
            )}

            {/* Optional publication date */}
            {video.publishedAt && (
                <CardField
                    field={{
                        type: "date",
                        date: video.publishedAt
                    }}
                    icon={<EventIcon/>}
                    tooltip={t(
                        mediaTrackerKeys.youTube.videos.publishedAt,
                        {ns: mediaTrackerKeys.ns, defaultValue: "Published at"}
                    )}
                />
            )}

            {/* Optional last visualization date (shows the most recent record available).
            Since the API endpoint orders results in ascending order (oldest → newest),
            we take the last element in the array to display the latest visualization date. */}
            {video.visualizations.length > 0 && (
                <CardField
                    field={{
                        type: "date",
                        date: video.visualizations[video.visualizations.length - 1].visualizationDate
                    }}
                    icon={<HistoryIcon />}
                    tooltip={t(
                        mediaTrackerKeys.youTube.videos.lastViewed,
                        {ns: mediaTrackerKeys.ns, defaultValue: "Last viewed"}
                    )}
                />
            )}

            {/* Optional description */}
            {video.description && (
                <CardField
                    field={{
                        type: "text",
                        text: video.description
                    }}
                    icon={<DescriptionIcon/>}
                    tooltip={t(
                        commonKeys.description, {defaultValue: "Description"}
                    )}
                />
            )}
        </CardItemContent>
    )
}