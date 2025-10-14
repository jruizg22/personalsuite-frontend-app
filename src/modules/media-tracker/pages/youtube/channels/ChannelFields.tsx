import {type JSX} from "react";
import {Grid} from "@mui/material";
import type {YTChannel} from "@media-tracker/models";
import {useTranslation} from "react-i18next";
import {commonKeys, mediaTrackerKeys} from "@/i18n";
import {Link as LinkIcon, Person as PersonIcon} from "@mui/icons-material";
import {GeneralTextFormField, DateFormField, DescriptionFormField} from "@/shared/forms/fields";

interface Props {
    channel: YTChannel;
    onChange: (field: keyof YTChannel, value: string) => void;
}

export default function ChannelFields({channel, onChange}: Props): JSX.Element {
    const {t} = useTranslation();

    return (
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "stretch" }}>
            {/* First column */}
            <Grid
                size={{ xs: 12, sm: 6 }}
                container
                spacing={2}
                direction="column"
                sx={{ flex: 1, height: "100%" }}
            >
                <Grid size={{ xs: 12 }}>
                    <GeneralTextFormField
                        icon={<PersonIcon/>}
                        label={t(commonKeys.name, { ns: commonKeys.ns, defaultValue: "Name" })}
                        content={channel.name}
                        onChange={(value: string): void => onChange("name", value)}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <GeneralTextFormField
                        icon={<LinkIcon/>}
                        label={t(commonKeys.url, { ns: commonKeys.ns, defaultValue: "URL" })}
                        content={channel.url}
                        onChange={(value: string): void => onChange("url", value)}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <DateFormField
                        label={t(
                            mediaTrackerKeys.youTube.channels.createdAt,
                            {ns: mediaTrackerKeys.ns, defaultValue: "Created at"}
                        )}
                        date={channel.createdAt}
                        onChange={(value: string): void => onChange("createdAt", value)}
                    />
                </Grid>
            </Grid>

            {/* Second column */}
            <Grid
                size={{ xs: 12, sm: 6 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <DescriptionFormField
                    label={t(
                        commonKeys.description,
                        {ns: commonKeys.ns, defaultValue: "Default"}
                    )}
                    content={channel.description ?? ""}
                    onChange={(value: string): void => onChange("description", value)}
                />
            </Grid>
        </Grid>
    );
}