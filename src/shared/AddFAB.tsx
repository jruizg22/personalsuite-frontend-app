import {type JSX} from "react";
import {Box, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    onClick: () => void;
}

export default function AddFAB({onClick}: Props): JSX.Element {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000
            }}
        >
            <Fab color="primary" aria-label="add" onClick={onClick}>
                <AddIcon />
            </Fab>
        </Box>
    )
}