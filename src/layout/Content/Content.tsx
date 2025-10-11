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
                overflowX: "hidden"
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
}