import {type JSX} from "react";
import {Box, Typography, type TypographyProps} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface Props {
    text: string;
    variant?: TypographyProps['variant'];
    color?: string;
    showIcon?: boolean;
}

export default function CardTextField({
    text,
    variant = "body2",
    color = "text.secondary",
    showIcon = false,
}: Props): JSX.Element {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color }}>
            {showIcon && <DescriptionIcon fontSize="small" sx={{ flexShrink: 0, color: "text.secondary" }} />}
            <Typography variant={variant}>{text}</Typography>
        </Box>
    );
}