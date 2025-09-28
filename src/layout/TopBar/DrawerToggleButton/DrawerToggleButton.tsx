import {type JSX} from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    onToggleDrawer: () => void;
}

export default function DrawerToggleButton({onToggleDrawer}: Props): JSX.Element {
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onToggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
    )
}