import {type JSX} from "react";
import {CardDateField, CardItemContent, CardLinkField, CardTextField} from "@/shared/cards";
import PersonIcon from "@mui/icons-material/Person";
import type {YTVideoWithChannel} from "@media-tracker/models";

interface Props {
    /** The YouTube video (with its associated channel) to display */
    video: YTVideoWithChannel;
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
 *     }
 *   }}
 * />
 * ```
 *
 * @param {Props} props - The component props.
 * @param {YTVideoWithChannel} props.video - The YouTube video to render.
 * @returns {JSX.Element} The rendered video card content.
 */
export default function VideoCardContent({video}: Props): JSX.Element {
    return (
        <CardItemContent>
            {/* Channel name with icon */}
            {video.channel.url && (
                <CardLinkField url={video.channel.url} label={video.channel.name} icon={<PersonIcon/>} underline={false} truncate/>
            )}

            {/* Optional video URL */}
            {video.url && (
                <CardLinkField url={video.url} truncate/>
            )}

            {/* Optional publication date */}
            {video.publishedAt && (
                <CardDateField date={video.publishedAt}/>
            )}

            {/* Optional description */}
            {video.description && (
                <CardTextField text={video.description}/>
            )}
        </CardItemContent>
    )
}