import {type JSX} from "react";
import {Grid} from "@mui/material";
import type {YTChannel} from "@media-tracker/models";
import {useTranslation} from "react-i18next";
import {commonKeys, mediaTrackerKeys} from "@/i18n";
import {Link as LinkIcon, Person as PersonIcon, Numbers as NumbersIcon} from "@mui/icons-material";
import {GeneralTextFormField, DateFormField, DescriptionFormField} from "@/shared/forms/fields";

/**
 * Props for the ChannelFormFields component.
 *
 * @interface Props
 * @property {YTChannel} channel - The YouTube channel object containing the values for each field.
 * @property {(field: keyof YTChannel, value: string) => void} onChange - Callback invoked when a field value changes.
 * Receives the field name as the first argument and the new value as the second argument.
 * @property {boolean} [readOnly=false] - If true, all fields are read-only and cannot be edited.
 */
interface Props {
    channel: YTChannel;
    onChange: (field: keyof YTChannel, value: string) => void;
    readOnly?: boolean;
}

/**
 * ChannelFormFields component.
 *
 * This component renders the form fields for a YouTube channel inside
 * a CRUD dialog. It is intended to be used within `CrudCardLayout` when
 * creating or editing a `YTChannel`.
 *
 * The form layout:
 * - URL field at the top
 * - Two-column layout below:
 *   - Left column: ID, Name, Created At
 *   - Right column: Description
 *
 * Fields use Material UI inputs and support:
 * - Required validation (`id` and `name`)
 * - Read-only mode
 * - Icons for each field for visual context
 *
 * Translation keys are provided via `commonKeys` and `mediaTrackerKeys`.
 *
 * @param {Props} props - Component props
 * @param {YTChannel} props.channel - The channel object containing values for each field
 * @param {(field: keyof YTChannel, value: string) => void} props.onChange - Callback invoked when a field changes
 * @param {boolean} [props.readOnly=false] - If true, all fields are read-only
 *
 * @returns {JSX.Element} A grid layout of form fields for a YouTube channel
 *
 * @example
 * import ChannelFormFields from "@media-tracker/pages/youtube/channels/ChannelFormFields";
 *
 * function MyForm({channel, onChange}: { channel: YTChannel, onChange: (field: keyof YTChannel, value: string) => void }) {
 *   return <ChannelFormFields channel={channel} onChange={onChange} />;
 * }
 */
export default function ChannelFormFields({channel, onChange, readOnly}: Props): JSX.Element {
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
                            required
                            readOnly={readOnly}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <GeneralTextFormField
                            icon={<PersonIcon/>}
                            label={t(commonKeys.name, { ns: commonKeys.ns, defaultValue: "Name" })}
                            content={channel.name}
                            onChange={(value: string): void => onChange("name", value)}
                            required
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