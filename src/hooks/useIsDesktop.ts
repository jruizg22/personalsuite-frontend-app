import {type Theme, useMediaQuery, useTheme} from "@mui/material";

export function useIsDesktop(): boolean {
    const theme: Theme = useTheme();
    return useMediaQuery(theme.breakpoints.up("lg"), {noSsr: true});
}