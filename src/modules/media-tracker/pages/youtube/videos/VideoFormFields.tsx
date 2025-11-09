import {type JSX} from "react";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import LinkIcon from "@mui/icons-material/Link";
import NumbersIcon from "@mui/icons-material/Numbers";
import MovieIcon from "@mui/icons-material/Movie";
import {commonKeys} from "@/i18n";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";
import {AutocompleteField, DateFormField, DescriptionFormField, GeneralTextFormField} from "@/shared/forms/fields";
import type {YTVideoFull} from "@media-tracker/models";
import {useYouTubeContext} from "@media-tracker/contexts";

interface Props {
    video: YTVideoFull;
    onChange: (field: keyof YTVideoFull, value: string | null) => void;
    readOnly?: boolean;
}

/**
 * Form fields for creating or editing YouTube videos.
 *
 * Mirrors the layout of `ChannelFormFields`:
 * - URL field on top
 * - Two-column layout for the rest of the fields
 */
export default function VideoFormFields({ video, onChange, readOnly }: Props): JSX.Element {
    const { t } = useTranslation();
    const {channels} = useYouTubeContext();

    const channelOptions = channels.map((ch) => ({
        value: ch.id,
        label: ch.name
    }));

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* URL field on top */}
            <Grid size={{ xs: 12 }}>
                <GeneralTextFormField
                    icon={<LinkIcon />}
                    label={t(commonKeys.url, { ns: commonKeys.ns, defaultValue: "URL" })}
                    content={video.url}
                    onChange={(value: string | null): void => onChange("url", value)}
                    readOnly={readOnly}
                />
            </Grid>

            {/* Two-column layout below */}
            <Grid container spacing={2} sx={{ width: "100%" }}>
                {/* First column: id, channelId, title, publishedAt */}
                <Grid
                    size={{ xs: 12, sm: 6 }}
                    container
                    spacing={2}
                    direction="column"
                >
                    {/* ID */}
                    <Grid size={{ xs: 12 }}>
                        <GeneralTextFormField
                            icon={<NumbersIcon />}
                            label={t(commonKeys.id, { ns: commonKeys.ns, defaultValue: "ID" })}
                            content={video.id}
                            onChange={(value: string | null): void => onChange("id", value)}
                            required
                            readOnly={readOnly}
                        />
                    </Grid>

                    {/* Channel */}
                    <Grid size={{ xs: 12 }}>
                        <AutocompleteField
                            id="yt-channel"
                            label={t(mediaTrackerKeys.youTube.channels.channel, {
                                ns: mediaTrackerKeys.ns,
                                defaultValue: "Channel",
                            })}
                            options={channelOptions}
                            value={video.channelId ?? ""}
                            onChange={(val: string): void => onChange("channelId", val)}
                            readOnly={readOnly}
                            required
                        />
                    </Grid>

                    {/* Title */}
                    <Grid size={{ xs: 12 }}>
                        <GeneralTextFormField
                            icon={<MovieIcon />}
                            label={t(mediaTrackerKeys.youTube.videos.title, { ns: mediaTrackerKeys.ns, defaultValue: "Title" })}
                            content={video.title}
                            onChange={(value: string | null): void => onChange("title", value)}
                            required
                            readOnly={readOnly}
                        />
                    </Grid>

                    {/* Published at */}
                    <Grid size={{ xs: 12 }}>
                        <DateFormField
                            label={t(
                                mediaTrackerKeys.youTube.videos.publishedAt,
                                { ns: mediaTrackerKeys.ns, defaultValue: "Published at" }
                            )}
                            date={video.publishedAt}
                            onChange={(value: string | null): void => onChange("publishedAt", value)}
                            readOnly={readOnly}
                        />
                    </Grid>
                </Grid>

                {/* Second column: description */}
                <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{ width: "100%" }}
                >
                    <Grid size={{ xs: 12 }} sx={{ width: "100%", height: "100%" }}>
                        <DescriptionFormField
                            label={t(
                                commonKeys.description,
                                { ns: commonKeys.ns, defaultValue: "Description" }
                            )}
                            content={video.description}
                            onChange={(value: string | null): void => onChange("description", value)}
                            readOnly={readOnly}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}