import {type JSX, type MouseEvent, useState} from "react";
import {IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Fade} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {MenuAction} from "@/types";

interface Props {
    actions: MenuAction[];
}

export default function ThreeDotMenu({ actions }: Props): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);
    const handleMenuClose = (): void => setAnchorEl(null);

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                aria-label="options"
                aria-controls={anchorEl ? 'actions-menu' : undefined}
                aria-haspopup="true"
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slots={{ transition: Fade }}
            >
                {actions.map(({ label, icon, onClick, color }: MenuAction, index: number): JSX.Element => (
                    <MenuItem
                        key={index}
                        onClick={(): void => {
                            try {
                                onClick();
                            } finally {
                                handleMenuClose();
                            }
                        }}
                        sx={{
                            color,
                            '& .MuiListItemIcon-root': { color: 'inherit' },
                            '& .MuiListItemText-root': { color: 'inherit' },
                        }}
                    >
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText>{label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}