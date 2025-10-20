import {type JSX} from "react";
import {Box, type Theme} from "@mui/material";
import {SearchField} from "@/shared/SearchField";

/**
 * Props for the {@link SearchBarSticky} component.
 *
 * Defines the expected properties for configuring the sticky search bar.
 * Each prop controls an aspect of the input behavior or visual presentation.
 */
interface Props {
    /**
     * The current value of the search input field.
     *
     * @example
     * value="React hooks"
     */
    value: string;

    /**
     * Callback function triggered whenever the search input changes.
     * Receives the new search text as a parameter.
     *
     * @param value - The updated search text entered by the user.
     *
     * @example
     * onChange={(val) => setSearchText(val)}
     */
    onChange: (value: string) => void;

    /**
     * The label text displayed inside the search field.
     * Commonly used to describe what can be searched.
     *
     * @example
     * label="Search channels"
     */
    label: string;
}

/**
 * `SearchBarSticky` component.
 *
 * Renders a search input field that remains visible (sticky) at the top of a container
 * while the user scrolls. It is designed for layouts displaying searchable content,
 * such as lists, tables, or card grids.
 *
 * The component wraps a `SearchField` inside a styled `Box` with sticky positioning.
 *
 * @param {string} value - Current search text.
 * @param {(value: string) => void} onChange - Callback triggered when the search value changes.
 * @param {string} label - Label for the search input.
 *
 * @returns {JSX.Element} A styled, sticky search bar component.
 *
 * @example
 * ```tsx
 * <SearchBarSticky
 *   value={searchText}
 *   onChange={setSearchText}
 *   label="Search users"
 * />
 * ```
 */
export default function SearchBarSticky({value, onChange, label}: Props): JSX.Element {
    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: (theme: Theme): string =>
                    theme.palette.background.default,
                pt: 1,
                mx: 1,
            }}
        >
            <SearchField value={value} onChange={onChange} label={label} />
        </Box>
    );
}