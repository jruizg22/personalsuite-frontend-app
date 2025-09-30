import type {JSX} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MediaTrackerLayout(): JSX.Element {
    return (
        <Box>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                This is the Media Tracker module
            </Typography>
        </Box>
    )
}