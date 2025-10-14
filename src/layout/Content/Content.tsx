import {Box, Toolbar} from "@mui/material";
import type {JSX, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function Content({children}: Props): JSX.Element {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Toolbar />
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}