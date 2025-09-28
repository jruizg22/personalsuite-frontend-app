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
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            {children}
        </Box>
    )
}