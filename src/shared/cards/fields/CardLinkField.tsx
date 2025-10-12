import {type JSX} from "react";
import {Box, Typography, type TypographyProps} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface Props {
    url: string;
    label?: string;
    color?: string;
    underline?: boolean;
    truncate?: boolean;
    variant?: TypographyProps['variant'];
}

export default function CardLinkField({
    url,
    label,
    color = 'primary.main',
    underline = true,
    truncate = false,
    variant = 'body2',
}: Props): JSX.Element {
    return (
        <Box
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color,
                textDecoration: underline ? "underline" : "none",
                maxWidth: "100%",
                '&:hover': {
                    textDecoration: underline ? "none" : "underline",
                },
            }}
        >
            <LinkIcon
                fontSize="small"
                sx={{ flexShrink: 0, color: "text.secondary" }}
            />
            <Typography
                variant={variant}
                sx={{
                    minWidth: 0,
                    overflow: truncate ? "hidden" : "visible",
                    textOverflow: truncate ? "ellipsis" : "unset",
                    whiteSpace: truncate ? "nowrap" : "normal",
                    flexShrink: 1,
                }}
            >
                {label ?? url}
            </Typography>
        </Box>
    )
}