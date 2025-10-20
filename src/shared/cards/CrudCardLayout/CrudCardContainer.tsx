import { type JSX } from "react";
import { Box, Grid } from "@mui/material";

/**
 * Props for the {@link CrudCardContainer} component.
 *
 * Defines the expected properties for rendering a scrollable grid of cards.
 * It allows any item type `T` that includes an `id` field (used as the React key).
 *
 * @template T - Generic type representing the data model for each card.
 */
interface Props<T extends { id: string }> {
    /**
     * Array of items to render in the grid.
     * Each item must include a unique `id` string used as the React key.
     *
     * @example
     * items={[
     *   { id: "1", name: "Channel 1" },
     *   { id: "2", name: "Channel 2" }
     * ]}
     */
    items: T[];

    /**
     * Function that renders a single card for the given item.
     * This function should return a valid React element representing the card.
     *
     * @param item - The data object to render as a card.
     *
     * @example
     * renderCard={(user) => <UserCard user={user} />}
     */
    renderCard: (item: T) => JSX.Element;
}

/**
 * `CrudCardContainer` component.
 *
 * Provides a scrollable container with a responsive grid layout for rendering
 * cards, such as user profiles, media items, or YouTube channels.
 *
 * It uses Material UI’s `Grid` system to manage spacing and responsive
 * column layouts, automatically adjusting to various screen sizes.
 *
 * @template T - Generic type of the items, must have an `id` string property.
 *
 * @param {T[]} items - Array of items to display as cards.
 * @param {(item: T) => JSX.Element} renderCard - Function that defines how each item is rendered.
 *
 * @returns {JSX.Element} A scrollable, responsive grid layout for displaying cards.
 *
 * @example
 * ```tsx
 * <CrudCardContainer
 *   items={channels}
 *   renderCard={(channel) => (
 *     <ChannelCard channel={channel} />
 *   )}
 * />
 * ```
 */
export default function CrudCardContainer<T extends {id: string}>({items, renderCard}: Props<T>): JSX.Element {
    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                m: 1,
            }}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {items.map((item: T): JSX.Element => (
                    <Grid
                        key={item.id}
                        size={{ xs: 4, sm: 4, md: 4 }}
                        sx={{ display: "flex" }}
                    >
                        {renderCard(item)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}