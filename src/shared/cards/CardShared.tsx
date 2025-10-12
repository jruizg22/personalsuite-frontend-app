import {type JSX} from "react";
import {Card, CardHeader, IconButton, type CardProps} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
    headerTitle: string;
    variant?: CardProps['variant'];
    children: JSX.Element;
}

export default function CardShared({
    headerTitle,
    variant = 'outlined',
    children,
}: Props): JSX.Element {
    return (
        <Card
            variant={variant}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: '100%'
            }}
        >
            <CardHeader
                title={headerTitle}
                action={
                    <IconButton aria-label="options">
                        <MoreVertIcon/>
                    </IconButton>
                }
            />
            {children}
        </Card>
    )
}