import {type JSX} from "react";
import {Grid} from "@mui/material";
import type {YTChannel} from "@media-tracker/models";
import {useTranslation} from "react-i18next";
import {commonKeys, mediaTrackerKeys} from "@/i18n";
import {Link as LinkIcon, Person as PersonIcon, Numbers as NumbersIcon} from "@mui/icons-material";
import {GeneralTextFormField, DateFormField, DescriptionFormField} from "@/shared/forms/fields";

interface Props {
    channel: YTChannel;
    onChange: (field: keyof YTChannel, value: string) => void;
    readOnly?: boolean;
}

export default function ChannelFields({channel, onChange, readOnly}: Props): JSX.Element {
    const {t} = useTranslation();

    return (
        <Grid container spacing={2} sx={{mt: 1}}>
            {/* URL field on top */}
            <Grid size={{ xs: 12 }}>
                <GeneralTextFormField
                    icon={<LinkIcon />}
                    label={t(commonKeys.url, { ns: commonKeys.ns, defaultValue: "URL" })}
                    content={channel.url}
                    onChange={(value: string): void => onChange("url", value)}
                    readOnly={readOnly}
                />
            </Grid>

            {/* Two-column layout below */}
            <Grid container spacing={2} sx={{width:'100%'}}>
                {/* First column: id, name, createdAt */}
                <Grid
                    size={{ xs: 12, sm: 6 }}
                    container
                    spacing={2}
                    direction="column"
                >
                    <Grid size={{ xs: 12 }}>
                        <GeneralTextFormField
                            icon={<NumbersIcon/>}
                            label={t(commonKeys.id, { ns: commonKeys.ns, defaultValue: "ID" })}
                            content={channel.id}
                            onChange={(value: string): void => onChange("id", value)}
                            readOnly={readOnly}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <GeneralTextFormField
                            icon={<PersonIcon/>}
                            label={t(commonKeys.name, { ns: commonKeys.ns, defaultValue: "Name" })}
                            content={channel.name}
                            onChange={(value: string): void => onChange("name", value)}
                            readOnly={readOnly}
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
                            readOnly={readOnly}
                        />
                    </Grid>
                </Grid>

                {/* Second column: description */}
                <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{width:'100%'}}
                >
                    <Grid size={{ xs: 12 }} sx={{width:'100%', height:'100%'}}>
                        <DescriptionFormField
                            label={t(
                                commonKeys.description,
                                {ns: commonKeys.ns, defaultValue: "Default"}
                            )}
                            content={channel.description}
                            onChange={(value: string): void => onChange("description", value)}
                            readOnly={readOnly}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}