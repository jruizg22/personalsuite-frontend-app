import type {JSX} from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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