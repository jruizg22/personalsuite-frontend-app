import {type JSX} from "react";
import {CardShared} from "@/shared/cards";
import {useCrudMenuActions} from "@/hooks";
import type {MenuAction} from "@/types";

/**
 * Props for the `CrudCardItem` component.
 *
 * @template T The type of the entity or data model being displayed in the card.
 */
interface Props<T> {
    /** The data item represented by this card */
    item: T,

    /**
     * Function that returns the title text to display in the card header.
     * Typically derived from a field in the item, such as `item.name` or `item.title`.
     */
    getTitle: (item: T) => string,

    /**
     * Function that renders the main card content.
     * Allows flexible rendering of the item’s details.
     */
    renderContent: (item: T) => JSX.Element,

    /** Optional callback triggered when the "View details" menu action is selected */
    onView?: () => void;

    /** Optional callback triggered when the "Edit" menu action is selected */
    onEdit?: () => void;

    /** Optional callback triggered when the "Delete" menu action is selected */
    onDelete?: () => void;
}

/**
 * **CrudCardItem** — A reusable, generic card component for displaying entities
 * with contextual CRUD (Create, Read, Update, Delete) actions.
 *
 * This component:
 * - Renders a shared card layout with a dynamic title and content.
 * - Automatically generates the action menu based on which callbacks
 *   (`onView`, `onEdit`, `onDelete`) are provided.
 * - Integrates seamlessly with `useCrudMenuActions` and `CardShared`.
 *
 * @template T The type of the entity being represented (e.g., `YTVideo`, `YTChannel`, etc.)
 *
 * @example
 * ```tsx
 * <CrudCardItem
 *   item={video}
 *   getTitle={(v) => v.title}
 *   renderContent={(v) => <VideoCardContent video={v} />}
 *   onView={() => openVideoDetails(video)}
 *   onEdit={() => openEditDialog(video)}
 *   onDelete={() => confirmDelete(video.id)}
 * />
 * ```
 *
 * @param {Props<T>} props Component props.
 *
 * @returns {JSX.Element} A rendered card component with a header, content, and optional menu actions.
 *
 * @remarks
 * - If no CRUD callbacks are provided, the menu will not display those options.
 * - The card’s layout and styles are inherited from `CardShared`.
 * - Typically used inside CRUD layouts like `CrudCardLayout`.
 */
export default function CrudCardItem<T>({
    item,
    getTitle,
    renderContent,
    onView,
    onEdit,
    onDelete
}: Props<T>): JSX.Element {
    const actions: MenuAction[] = useCrudMenuActions({ onView, onEdit, onDelete });

    return (
        <CardShared headerTitle={getTitle(item)} actions={actions}>
            {renderContent(item)}
        </CardShared>
    );
}