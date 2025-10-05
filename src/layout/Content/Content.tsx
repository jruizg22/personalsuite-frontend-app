import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import type {JSX, ReactNode} from "react";

interface Props {
    drawerWidth: number;
    children: ReactNode;
}

export default function Content({drawerWidth, children}: Props): JSX.Element {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
}