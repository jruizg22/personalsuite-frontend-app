import {Box, Toolbar, Typography} from "@mui/material";
import type {JSX} from "react";

export default function SideDrawerHeader(): JSX.Element {
    return (
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Typography variant="h6" component="div">
                    Personal Suite
                </Typography>
            </Box>
        </Toolbar>
    )
}