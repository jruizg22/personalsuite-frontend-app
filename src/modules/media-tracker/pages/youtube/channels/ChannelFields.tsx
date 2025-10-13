import {type JSX} from "react";
import {TextField, Stack} from "@mui/material";
import type {YTChannel} from "@media-tracker/models";
import {useTranslation} from "react-i18next";
import {commonKeys} from "@/i18n";

interface Props {
    channel: YTChannel;
    onChange: (field: keyof YTChannel, value: string) => void;
}

export default function ChannelFields({channel, onChange}: Props): JSX.Element {
    const {t} = useTranslation();

    return (
        <Stack spacing={2} sx={{mt: 1}}>
            <TextField
                label={t(commonKeys.name, {ns: commonKeys.ns, defaultValue: "Name"})}
                value={channel.name}
                onChange={e => onChange("name", e.target.value)}
                fullWidth
            />
            <TextField
                label={t(commonKeys.url, {ns: commonKeys.ns, defaultValue: "URL"})}
                value={channel.url}
                onChange={e => onChange("url", e.target.value)}
                fullWidth
            />
            <TextField
                label={t(commonKeys.description, {ns: commonKeys.ns, defaultValue: "Description"})}
                value={channel.description ?? ""}
                onChange={e => onChange("description", e.target.value)}
                fullWidth
                multiline
            />
        </Stack>
    );
}